/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.CreditCardLogic;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/CreditCard")
public class CreditCardController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CreditCardLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/CreditCard/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CreditCard : Search-------------");
        map.put("success", true);
        List<A2280Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2280Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2280Filter> lst = new ArrayList<>(0);
        A2280Filter filter = new A2280Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CreditCardLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2280Filter.class);
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

            lst = logic.loadPX265SQP00660(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("CreditCard : getXLSX");

        String fileNameDownload = String.format("CreditCard - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2280Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ReasonCodeReport");

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
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Credit Card");
            CH1_03.setCellValue("Bank");
            CH1_06.setCellValue("Currency");
            CH1_07.setCellValue("Commision");
            CH1_10.setCellValue("Rate");
            CH1_11.setCellValue("Cliente");
            CH1_12.setCellValue("Status");
            CH1_13.setCellValue("Equivalent");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);

            CH2_01.setCellValue("Code");
            CH2_02.setCellValue("Name");
            CH2_03.setCellValue("Country");
            CH2_04.setCellValue("Code");
            CH2_05.setCellValue("Name");
            CH2_07.setCellValue("Rate Normal");
            CH2_08.setCellValue("Rate Promotional 1");
            CH2_09.setCellValue("Rate Promotional 2");
            CH2_10.setCellValue("IVA");
            CH2_13.setCellValue("Code");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);

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
                Cell rcel20 = row.createCell(10);
                Cell rcel21 = row.createCell(11);

                Cell rcel22 = row.createCell(12);
                Cell rcel23 = row.createCell(13);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).CODE);
                rcell2.setCellValue(listaData.get(vi).NAME);
                rcell3.setCellValue(listaData.get(vi).COUNTRY);
                rcell4.setCellValue(listaData.get(vi).CODEBANK);
                rcell5.setCellValue(listaData.get(vi).NAMEBANK);
                rcell6.setCellValue(listaData.get(vi).CURRENC);
                rcell7.setCellValue(listaData.get(vi).RATCNAC);
                rcell8.setCellValue(listaData.get(vi).RATDNAC);
                rcell9.setCellValue(listaData.get(vi).RATCEXT);
                rcel20.setCellValue(listaData.get(vi).RATEIVA);
                rcel21.setCellValue(listaData.get(vi).CLIENTE);
                rcel22.setCellValue(listaData.get(vi).FSTAT);
                rcel23.setCellValue(listaData.get(vi).CODEQUIV);

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

    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CreditCard : searchCompleteDetail-------------");

        Gson gson = new Gson();
        A2280Filter filter = new A2280Filter();
        A2280Filter result = new A2280Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2280Filter.class);

        logic = new CreditCardLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX265SQP00662(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchComm")
    public @ResponseBody
    String searchComm(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CreditCard : SearchComm-------------");
        map.put("success", true);
        List<A2280Filter> lst = this.getListComm(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2280Filter> getListComm(HttpServletRequest request, Boolean bExcel) {

        List<A2280Filter> lst = new ArrayList<>(0);
        A2280Filter filter = new A2280Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CreditCardLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2280Filter.class);
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

            lst = logic.loadPX265SQP03398(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCompleteComm")
    public @ResponseBody
    String searchCompleteComm(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CreditCard : searchCompleteComm-------------");

        Gson gson = new Gson();
        A2280Filter filter = new A2280Filter();

        List<A2280Filter> loadlstA2280;
        List<A2280Filter> loadLstTCOMIS;
        A2280Filter beanComplete = new A2280Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2280Filter.class);

        logic = new CreditCardLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {

            loadlstA2280 = logic.loadPX265SQP00663();
            loadLstTCOMIS = logic.loadPX265SQP03423();
            beanComplete = logic.loadPX265SQP03399(filter);

            map.put("beanComplete", beanComplete);
            map.put("loadlstA2280", loadlstA2280);
            map.put("listaTCOMIS", loadLstTCOMIS);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceA2348Comm")
    public @ResponseBody
    String MaintenanceA2348Comm(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- CreditCard : MaintenanceA2348Comm-------------");
        String beanString;
        Gson gson = new Gson();

        A2280Filter filter = new A2280Filter();
        String msj = "";

        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2280Filter.class);

            logic = new CreditCardLogic();
            logic.setSession(this.serverSession.getServerSession());

            //Verifica que el código del banco ingresado exista en la tabla A2281
            msj = logic.loadPX265SQP00941(filter);
            if (msj.trim().isEmpty()) {
                msj = logic.loadPX265SQP03400(filter, filter.option);
            }

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceA2280")
    public @ResponseBody
    String MaintenanceA2280(ModelMap map, HttpServletRequest request){        
        String msj = "";
        String beanString;
        Gson gson = new Gson();

        A2280Filter filter = new A2280Filter();
        System.out.println("-------------- CreditCard : MaintenanceA2280-------------");

        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2280Filter.class);
            
            CreditCardLogic logic = new CreditCardLogic();
            logic.setSession(this.serverSession.getServerSession());
            //Verifica que el código del banco ingresado exista en la tabla A2281
            msj = logic.loadPX265SQP00941(filter);
            if(msj.trim().isEmpty()){
                msj = logic.loadPX265SQP00661(filter, filter.option);
            }
            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
}
