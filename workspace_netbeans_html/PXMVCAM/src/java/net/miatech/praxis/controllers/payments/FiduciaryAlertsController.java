/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.controllers.payments.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.A005;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.controllers.master.DataObtain;
import net.miatech.praxis.dao.payments.FiduciaryAlertsDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.FiduciaryAlertsLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
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
 * @author singa
 */
@Controller
@Scope("request")
@RequestMapping("/FiduciaryAlerts")
public class FiduciaryAlertsController extends BaseController {
    private FiduciaryAlertsLogic logic;

    @RequestMapping(value = "/searchAccountingInterfaces")
    public @ResponseBody
    String searchAccountingInterfaces(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;
        
        String beanString = "";
        System.out.println("-------------- FiduciaryAlerts : search-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new FiduciaryAlertsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchAccountingInterfaces(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/excelAccountingInterfaces")
    public @ResponseBody
    void excelAccountingInterfaces(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;
        Workbook workbook;
        String fileNameDownload = String.format("Validation Interfaces Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        File file = File.createTempFile(fileNameDownload, ".xlsx");
        
        String beanString = "";
        System.out.println("======");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new FiduciaryAlertsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchAccountingInterfaces(filter);

            
            try {

                workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Report");
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

                Row row1 = sheet.createRow(vj);

                    Cell CH1_0 = row1.createCell(0);
                    Cell CH1_1 = row1.createCell(1);
                    Cell CH1_2 = row1.createCell(2);
                    Cell CH1_3 = row1.createCell(3);
                    Cell CH1_4 = row1.createCell(4);
                    Cell CH1_5 = row1.createCell(5);
                    Cell CH1_6 = row1.createCell(6);
                    Cell CH1_7 = row1.createCell(7);
                    Cell CH1_8 = row1.createCell(8);
                    Cell CH1_9 = row1.createCell(9);
                    Cell CH1_10 = row1.createCell(10);
                    Cell CH1_11 = row1.createCell(11);
                    Cell CH1_12 = row1.createCell(12);
                    Cell CH1_13 = row1.createCell(13);
                    Cell CH1_14 = row1.createCell(14);

                    CH1_0.setCellValue("IDCONT");
                    CH1_1.setCellValue("INTERFACE");
                    CH1_2.setCellValue("BANDOC");
                    CH1_3.setCellValue("PROCESADOR");
                    CH1_4.setCellValue("REFERENCIA");
                    CH1_5.setCellValue("MONEDA_LIQ");
                    CH1_6.setCellValue("VALOR_LIQ");
                    CH1_7.setCellValue("COMISION");
                    CH1_8.setCellValue("RTEFUE");
                    CH1_9.setCellValue("RTEIVA");
                    CH1_10.setCellValue("RTEICA");
                    CH1_11.setCellValue("NETO");
                    CH1_12.setCellValue("MONEDAPAGO");
                    CH1_13.setCellValue("LIQ_IMPORTEPAG");
                    CH1_14.setCellValue("TAX_IMPORTEPAG");

                    CH1_0.setCellStyle(headerStyle);
                    CH1_1.setCellStyle(headerStyle);
                    CH1_2.setCellStyle(headerStyle);
                    CH1_3.setCellStyle(headerStyle);
                    CH1_4.setCellStyle(headerStyle);
                    CH1_5.setCellStyle(headerStyle);
                    CH1_6.setCellStyle(headerStyle);
                    CH1_7.setCellStyle(headerStyle);
                    CH1_8.setCellStyle(headerStyle);
                    CH1_9.setCellStyle(headerStyle);
                    CH1_10.setCellStyle(headerStyle);
                    CH1_11.setCellStyle(headerStyle);
                    CH1_12.setCellStyle(headerStyle);
                    CH1_13.setCellStyle(headerStyle);
                    CH1_14.setCellStyle(headerStyle);

                    ++vj;

                    while (iter.hasNext()) {
                        row1 = sheet.createRow(vj);
                        Cell rcell0 = row1.createCell(0);
                        Cell rcell1 = row1.createCell(1);
                        Cell rcell2 = row1.createCell(2);
                        Cell rcell3 = row1.createCell(3);
                        Cell rcell4 = row1.createCell(4);
                        Cell rcell5 = row1.createCell(5);
                        Cell rcell6 = row1.createCell(6);
                        Cell rcell7 = row1.createCell(7);
                        Cell rcell8 = row1.createCell(8);
                        Cell rcell9 = row1.createCell(9);
                        Cell rcell10 = row1.createCell(10);
                        Cell rcell11 = row1.createCell(11);
                        Cell rcell12 = row1.createCell(12);
                        Cell rcell13 = row1.createCell(13);
                        Cell rcell14 = row1.createCell(14);

                        rcell0.setCellValue(listaData.get(vi).IDCONT);
                        rcell1.setCellValue(listaData.get(vi).INTERFACE);
                        rcell2.setCellValue(listaData.get(vi).BANDOC);
                        rcell3.setCellValue(listaData.get(vi).PROCESADOR);
                        rcell4.setCellValue(listaData.get(vi).REFERENCIA);
                        rcell5.setCellValue(listaData.get(vi).MONEDA_LIQ);
                        rcell6.setCellValue(listaData.get(vi).VALOR_LIQ);
                        rcell7.setCellValue(listaData.get(vi).COMISION);
                        rcell8.setCellValue(listaData.get(vi).RTEFUE);
                        rcell9.setCellValue(listaData.get(vi).RTEIVA);
                        rcell10.setCellValue(listaData.get(vi).RTEICA);
                        rcell11.setCellValue(listaData.get(vi).NETO);
                        rcell12.setCellValue(listaData.get(vi).MONEDA_PAGO);
                        rcell13.setCellValue(listaData.get(vi).LIQ_IMPORTE_PAG);
                        rcell14.setCellValue(listaData.get(vi).TAX_IMPORTE_PAG);
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
                    sheet.autoSizeColumn(13, true);
                    sheet.autoSizeColumn(14, true);
                    
                //============================================
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
                workbook.write(response.getOutputStream());
                fos.close();
            } catch (IOException e) {
                throw new SpringException(e);
            }
            
        } catch (NumberFormatException ex) {
            System.out.println(ex.getMessage());
        } catch (Exception ex) {
             System.out.println(ex.getMessage());
        }
        
        
    }
    
    @RequestMapping(value = "searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- FiduciaryAlerts : searchDetalle-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalle(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<A2290Filter> getListDetalle(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new FiduciaryAlertsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQP00698Detalle(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/obtainData")
    public @ResponseBody
    String obtainData(ModelMap map, HttpServletRequest request) {
        System.out.println("Fiduciary Alert Controller --- obtainData");
        try {
            DataObtain data = new DataObtain();

            String beanString = request.getParameter("beanString");
            data = new Gson().fromJson(beanString, data.getClass());

            FiduciaryAlertsDAO FiduciaryAlertsDAO = new FiduciaryAlertsDAO();
            FiduciaryAlertsDAO.setSession((IServerSession) serverSession.getServerSession());

            map.put("success", true);
            if (data.CODPRO != 0) {
                List<CPF031Filter> lstProcessor = FiduciaryAlertsDAO.lstProcessor();
                map.put("lstProcessor", lstProcessor);
            }
            
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    
    
}
