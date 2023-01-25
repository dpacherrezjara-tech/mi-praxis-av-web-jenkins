
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP02299Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterInvoiceLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingMasterInvoiceForm")
public class AccountingMasterInvoiceController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    AccountingMasterInvoiceLogic logic = new AccountingMasterInvoiceLogic();

    @RequestMapping(value = "searchMaster")
    public @ResponseBody
    String searchMaster(ModelMap map, HttpServletRequest request) {
        SQP02299Filter filter = new SQP02299Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic.setSession(this.serverSession.getServerSession());
            List<SQP02299Filter> lst_search = logic.searchMaster(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String msj = "";
        SQP02299Filter filter = new SQP02299Filter();

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.setMasterInvoice(filter);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

    @RequestMapping(value = "searchMasterFG")
    public @ResponseBody
    String searchMasterFG(ModelMap map, HttpServletRequest request) {
        SQP02299Filter filter = new SQP02299Filter();
        try {
            Functions.msjConsola("PRAXISEX", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic.setSession(this.serverSession.getServerSession());
            List<SQP02299Filter> lst_search = logic.searchMasterFG(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String fileNameDownload = String.format("CATALOGO_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        SQP02299Filter filter = new SQP02299Filter();
        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic.setSession(this.serverSession.getServerSession());
            List<SQP02299Filter> listaData = logic.searchMaster(filter);

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet( "CATALOGO_" + Functions.getFechaActual() );

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_010 = row.createCell(10);
            Cell CH1_011 = row.createCell(11);

            CH1_00.setCellValue("ACCOUNT");
            CH1_01.setCellValue("CUENT");
            CH1_02.setCellValue("SUBCU");
            CH1_03.setCellValue("DESC. ACCOUNT");
            CH1_04.setCellValue("RECORD");
            CH1_05.setCellValue("IVA");
            CH1_06.setCellValue("T.ACCOUNT");
            CH1_07.setCellValue("OAL");
            CH1_08.setCellValue("FACTURABLE");
            CH1_09.setCellValue("NO SALE");
            CH1_010.setCellValue("IND. AGRUP.");
            CH1_011.setCellValue("AGRUP FG");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_010.setCellStyle(headerStyle);
            CH1_011.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);
                Cell rcell5 = row.createCell(5);
                Cell rcell6 = row.createCell(6);
                Cell rcell7 = row.createCell(7);
                Cell rcell8 = row.createCell(8);
                Cell rcell9 = row.createCell(9);
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);

                rcell0.setCellValue(listaData.get(vi).CUENTA);
                rcell1.setCellValue(listaData.get(vi).CUENT);
                rcell2.setCellValue(listaData.get(vi).SUBCU);
                rcell3.setCellValue(listaData.get(vi).DESCU);
                rcell4.setCellValue(listaData.get(vi).RECORD);
                rcell5.setCellValue(listaData.get(vi).IVA);
                rcell6.setCellValue(listaData.get(vi).TCTA);
                rcell7.setCellValue(listaData.get(vi).OAL);
                rcell8.setCellValue(listaData.get(vi).FACT);
                rcell9.setCellValue(listaData.get(vi).NVTA);
                rcell10.setCellValue(listaData.get(vi).INDAGRUP);
                rcell11.setCellValue(listaData.get(vi).DESCAGRUP);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
                rcell8.setCellStyle(bodyStyle);
                rcell9.setCellStyle(bodyStyle);
                rcell10.setCellStyle(bodyStyle);
                rcell11.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "setMasterInvoiceFG")
    public @ResponseBody
    String setMasterInvoiceFG(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String msj = "";
        SQP02299Filter filter = new SQP02299Filter();

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.setMasterInvoiceFG(filter);

        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

    @RequestMapping(value = "getXLSXMasterInvoiceFG")
    public @ResponseBody
    void getXLSXMasterInvoiceFG(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String fileNameDownload = String.format("AGRUPACIONES_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        SQP02299Filter filter = new SQP02299Filter();
        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic.setSession(this.serverSession.getServerSession());
            List<SQP02299Filter> listaData = logic.searchMasterFG(filter);

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("AGRUPACIONES_" + Functions.getFechaActual());

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);

            CH1_00.setCellValue("AGRUP FG");

            CH1_00.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);

                rcell0.setCellValue(listaData.get(vi).DESCAGRUP);

                rcell0.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);

            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }

}
