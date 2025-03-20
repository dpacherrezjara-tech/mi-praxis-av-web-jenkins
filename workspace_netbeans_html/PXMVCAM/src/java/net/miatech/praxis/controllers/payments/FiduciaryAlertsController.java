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
import org.apache.poi.ss.util.CellRangeAddress;
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

    @RequestMapping(value = "/searchMain")
    public @ResponseBody
    String searchMain(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- FiduciaryAlerts : searchMain-------------");
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
            listaData = logic.searchMain(filter);

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

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
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
            listaData = logic.search(filter);

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

    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody
    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Main Fiduciary Alerts Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new FiduciaryAlertsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchMain(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);
            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);
            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);
            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
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
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);

            CH1_0.setCellValue("Day");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("Processor");
            CH1_7.setCellValue("Daily Actual");
            CH1_8.setCellValue("Last 2 Months");
            CH1_13.setCellValue("Actual vs Average Variation");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle3);
            CH1_8.setCellStyle(headerStyle2);
            CH1_9.setCellStyle(headerStyle2);
            CH1_10.setCellStyle(headerStyle2);
            CH1_11.setCellStyle(headerStyle2);
            CH1_12.setCellStyle(headerStyle2);
            CH1_13.setCellStyle(headerStyle4);
            CH1_14.setCellStyle(headerStyle4);
            CH1_15.setCellStyle(headerStyle4);
            CH1_16.setCellStyle(headerStyle4);
            CH1_17.setCellStyle(headerStyle4);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 17));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            CH2_2.setCellValue("Amex(AV)");
            CH2_3.setCellValue("Amex(TA)");
            CH2_4.setCellValue("Discover");
            CH2_5.setCellValue("Worlpay IQ");
            CH2_6.setCellValue("Worlpay Pazien");
            CH2_7.setCellValue("Collection");
            CH2_8.setCellValue("Amex(AV)");
            CH2_9.setCellValue("Amex(TA)");
            CH2_10.setCellValue("Discover");
            CH2_11.setCellValue("Worlpay IQ");
            CH2_12.setCellValue("Worlpay Pazien");
            CH2_13.setCellValue("Amex(AV)");
            CH2_14.setCellValue("Amex(TA)");
            CH2_15.setCellValue("Discover");
            CH2_16.setCellValue("Worlpay IQ");
            CH2_17.setCellValue("Worlpay Pazien");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle3);
            CH2_8.setCellStyle(headerStyle2);
            CH2_9.setCellStyle(headerStyle2);
            CH2_10.setCellStyle(headerStyle2);
            CH2_11.setCellStyle(headerStyle2);
            CH2_12.setCellStyle(headerStyle2);
            CH2_13.setCellStyle(headerStyle4);
            CH2_14.setCellStyle(headerStyle4);
            CH2_15.setCellStyle(headerStyle4);
            CH2_16.setCellStyle(headerStyle4);
            CH2_17.setCellStyle(headerStyle4);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));

            ++vj;
            //============================================

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
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).DAY_NAME);
                rcell1.setCellValue(listaData.get(vi).VALDATE);
                rcell2.setCellValue(listaData.get(vi).AXAV);
                rcell3.setCellValue(listaData.get(vi).AXTA);
                rcell4.setCellValue(listaData.get(vi).DS);
                rcell5.setCellValue(listaData.get(vi).WQ);
                rcell6.setCellValue(listaData.get(vi).WP);
                rcell7.setCellValue(listaData.get(vi).RR);
                rcell8.setCellValue(listaData.get(vi).PAXAV);
                rcell9.setCellValue(listaData.get(vi).PAXTA);
                rcell10.setCellValue(listaData.get(vi).PDS);
                rcell11.setCellValue(listaData.get(vi).PWQ);
                rcell12.setCellValue(listaData.get(vi).PWP);
                rcell13.setCellValue(listaData.get(vi).PORAXAV);
                rcell14.setCellValue(listaData.get(vi).PORAXTA);
                rcell15.setCellValue(listaData.get(vi).PORDS);
                rcell16.setCellValue(listaData.get(vi).PORWQ);
                rcell17.setCellValue(listaData.get(vi).PORWP);

                rcell2.setCellStyle(bodyStyle_amt);
                rcell3.setCellStyle(bodyStyle_amt);
                rcell4.setCellStyle(bodyStyle_amt);
                rcell5.setCellStyle(bodyStyle_amt);
                rcell6.setCellStyle(bodyStyle_amt);
                rcell7.setCellStyle(bodyStyle_amt);
                rcell8.setCellStyle(bodyStyle_amt);
                rcell9.setCellStyle(bodyStyle_amt);
                rcell10.setCellStyle(bodyStyle_amt);
                rcell11.setCellStyle(bodyStyle_amt);
                rcell12.setCellStyle(bodyStyle_amt);
                rcell13.setCellStyle(bodyStyle_amt);
                rcell14.setCellStyle(bodyStyle_amt);
                rcell15.setCellStyle(bodyStyle_amt);
                rcell16.setCellStyle(bodyStyle_amt);
                rcell17.setCellStyle(bodyStyle_amt);

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
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Fiduciary Alerts Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new FiduciaryAlertsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.search(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);
            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);
            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
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
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);

            CH1_0.setCellValue("Settlement Information");
            CH1_10.setCellValue("Sales Reconciliation");
            CH1_16.setCellValue("Variation");
            CH1_17.setCellValue("% Variation");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle2);
            CH1_10.setCellStyle(headerStyle2);
            CH1_11.setCellStyle(headerStyle2);
            CH1_12.setCellStyle(headerStyle2);
            CH1_13.setCellStyle(headerStyle2);
            CH1_14.setCellStyle(headerStyle2);
            CH1_15.setCellStyle(headerStyle2);
            CH1_16.setCellStyle(headerStyle3);
            CH1_17.setCellStyle(headerStyle3);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            CH2_0.setCellValue("Processor");
            CH2_1.setCellValue("Doc Type");
            CH2_2.setCellValue("Sale Date");
            CH2_3.setCellValue("Agent");
            CH2_4.setCellValue("Currency");
            CH2_5.setCellValue("Account Number");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("Comision");
            CH2_8.setCellValue("Import");
            CH2_9.setCellValue("Neto");
            CH2_10.setCellValue("Sale Date");
            CH2_11.setCellValue("Agent");
            CH2_12.setCellValue("Currency");
            CH2_13.setCellValue("Match Core");
            CH2_14.setCellValue("Match Other");
            CH2_15.setCellValue("Pending");
            CH2_16.setCellValue("Variation");
            CH2_17.setCellValue("% Variation");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle2);
            CH2_11.setCellStyle(headerStyle2);
            CH2_12.setCellStyle(headerStyle2);
            CH2_13.setCellStyle(headerStyle2);
            CH2_14.setCellStyle(headerStyle2);
            CH2_15.setCellStyle(headerStyle2);
            CH2_16.setCellStyle(headerStyle3);
            CH2_17.setCellStyle(headerStyle3);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));

            ++vj;
            //============================================

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
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).CODPRO);
                rcell1.setCellValue(listaData.get(vi).TDOC);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).SAGENT);
                rcell4.setCellValue(listaData.get(vi).SCURRENCY);
                rcell5.setCellValue(listaData.get(vi).ACCNUMA);
                rcell6.setCellValue(listaData.get(vi).TOTAL);
                rcell7.setCellValue(listaData.get(vi).COMISION);
                rcell8.setCellValue(listaData.get(vi).IMPORTE);
                rcell9.setCellValue(listaData.get(vi).NETO);
                rcell10.setCellValue(listaData.get(vi).SDATE100);
                rcell11.setCellValue(listaData.get(vi).SAGENT100);
                rcell12.setCellValue(listaData.get(vi).SCURRENCY100);
                rcell13.setCellValue(listaData.get(vi).SVFOP100W);
                rcell14.setCellValue(listaData.get(vi).SVFOP100O);
                rcell15.setCellValue(listaData.get(vi).SVFOP100P);
                rcell16.setCellValue(listaData.get(vi).VARIACION);
                rcell17.setCellValue(listaData.get(vi).PORCENTAJE_VARIACION + " %");

                rcell6.setCellStyle(bodyStyle_amt);
                rcell7.setCellStyle(bodyStyle_amt);
                rcell8.setCellStyle(bodyStyle_amt);
                rcell9.setCellStyle(bodyStyle_amt);
                rcell13.setCellStyle(bodyStyle_amt);
                rcell14.setCellStyle(bodyStyle_amt);
                rcell15.setCellStyle(bodyStyle_amt);
                rcell16.setCellStyle(bodyStyle_amt);

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
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
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
