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
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.DataIntegrityLogic;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.classes.ZipFiles;
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
@RequestMapping("/DataIntegrity")
public class DataIntegrityController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DataIntegrityLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DataIntegrity/form_index";
    }

    @RequestMapping(value = "searchMainSummary")
    public @ResponseBody
    String searchMainSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataIntegrity : SearchMainSummary-------------");

        map.put("success", true);
        List<MPF100Filter> lst = this.getListMainSummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100Filter> getListMainSummary(HttpServletRequest request, Boolean bExcel) {

        List<MPF100Filter> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataIntegrityLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

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

            lst = logic.loadPX615SQP04378(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDaySummary")
    public @ResponseBody
    String searchDaySummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataIntegrity : searchDaySummary-------------");

        map.put("success", true);
        List<MPF100Filter> lst = this.getListDaySummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100Filter> getListDaySummary(HttpServletRequest request, Boolean bExcel) {

        List<MPF100Filter> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataIntegrityLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

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

            lst = logic.loadPX615SQP04910(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDaySummaryMPF101")
    public @ResponseBody
    String searchDaySummaryMPF101(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataIntegrity : searchDaySummaryMPF101-------------");

        map.put("success", true);
        List<MPF100Filter> lst = this.getListDaySummaryMPF101(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100Filter> getListDaySummaryMPF101(HttpServletRequest request, Boolean bExcel) {

        List<MPF100Filter> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataIntegrityLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

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

            lst = logic.loadPX615SQP04907(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDaySummaryMerchant")
    public @ResponseBody
    String searchDaySummaryMerchant(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataIntegrity : searchDaySummaryMerchant-------------");

        map.put("success", true);
        List<MPF100Filter> lst = this.getListDaySummaryMerchant(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100Filter> getListDaySummaryMerchant(HttpServletRequest request, Boolean bExcel) {

        List<MPF100Filter> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataIntegrityLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

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

            lst = logic.loadPX615SQP04908(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSXMainSummary")
    public @ResponseBody
    void getXLSXMainSummary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF100Filter> listaData = this.getListMainSummary(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            CH1_0.setCellValue("Proccesing");
            CH1_1.setCellValue("Country");
            CH1_2.setCellValue("Curr.");
            CH1_3.setCellValue("Settlement");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Audit Settlement");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("Differences");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");

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
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 29));
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
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);

            CH2_0.setCellValue("Date");
            CH2_3.setCellValue("Valor Compras");
            CH2_4.setCellValue("Valor Tot.Consignac");
            CH2_5.setCellValue("Valor Com.Estaleci");
            CH2_6.setCellValue("Valor IVA");
            CH2_7.setCellValue("Valor Propina");
            CH2_8.setCellValue("Valor Retencion IVA");
            CH2_9.setCellValue("Valor retencion ICA");
            CH2_10.setCellValue("Valor Retencion Fte");
            CH2_11.setCellValue("Valor Neto Consigna");
            CH2_12.setCellValue("Valor Compras");
            CH2_13.setCellValue("Valor Tot.Consignac");
            CH2_14.setCellValue("Valor Com.Estaleci");
            CH2_15.setCellValue("Valor IVA");
            CH2_16.setCellValue("Valor Propina");
            CH2_17.setCellValue("Valor Retencion IVA");
            CH2_18.setCellValue("Valor retencion ICA");
            CH2_19.setCellValue("Valor Retencion Fte");
            CH2_20.setCellValue("Valor Neto Consigna");
            CH2_21.setCellValue("Valor Compras");
            CH2_22.setCellValue("Valor Tot.Consignac");
            CH2_23.setCellValue("Valor Com.Estaleci");
            CH2_24.setCellValue("Valor IVA");
            CH2_25.setCellValue("Valor Propina");
            CH2_26.setCellValue("Valor Retencion IVA");
            CH2_27.setCellValue("Valor retencion ICA");
            CH2_28.setCellValue("Valor Retencion Fte");
            CH2_29.setCellValue("Valor Neto Consigna");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 29));
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
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).strFecFiltro);
                rcell1.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell2.setCellValue(listaData.get(vi).SCURRENCY);
                rcell3.setCellValue(listaData.get(vi).COMPAMO);
                rcell4.setCellValue(listaData.get(vi).TCONAMO);
                rcell5.setCellValue(listaData.get(vi).COMMAMO);
                rcell6.setCellValue(listaData.get(vi).IVAAMOU);
                rcell7.setCellValue(listaData.get(vi).PROPAMO);
                rcell8.setCellValue(listaData.get(vi).RIVAAMO);
                rcell9.setCellValue(listaData.get(vi).RICAAMO);
                rcell10.setCellValue(listaData.get(vi).RFTEAMO);
                rcell11.setCellValue(listaData.get(vi).NETOAMO);
                rcell12.setCellValue(listaData.get(vi).COMPAMOC);
                rcell13.setCellValue(listaData.get(vi).TCONAMOC);
                rcell14.setCellValue(listaData.get(vi).COMMAMOC);
                rcell15.setCellValue(listaData.get(vi).IVAAMOUC);
                rcell16.setCellValue(listaData.get(vi).PROPAMOC);
                rcell17.setCellValue(listaData.get(vi).RIVAAMOC);
                rcell18.setCellValue(listaData.get(vi).RICAAMOC);
                rcell19.setCellValue(listaData.get(vi).RFTEAMOC);
                rcell20.setCellValue(listaData.get(vi).NETOAMOC);
                rcell21.setCellValue(listaData.get(vi).DIFF_COMPAMO);
                rcell22.setCellValue(listaData.get(vi).DIFF_TCONAMO);
                rcell23.setCellValue(listaData.get(vi).DIFF_COMMAMO);
                rcell24.setCellValue(listaData.get(vi).DIFF_IVAAMOU);
                rcell25.setCellValue(listaData.get(vi).DIFF_PROPAMO);
                rcell26.setCellValue(listaData.get(vi).DIFF_RIVAAMO);
                rcell27.setCellValue(listaData.get(vi).DIFF_RICAAMO);
                rcell28.setCellValue(listaData.get(vi).DIFF_RFTEAMO);
                rcell29.setCellValue(listaData.get(vi).DIFF_NETOAMO);
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue(listaData.get(0).TOT_COMPAMO);
            CH1_4_T.setCellValue(listaData.get(0).TOT_TCONAMO);
            CH1_5_T.setCellValue(listaData.get(0).TOT_COMMAMO);
            CH1_6_T.setCellValue(listaData.get(0).TOT_IVAAMOU);
            CH1_7_T.setCellValue(listaData.get(0).TOT_PROPAMO);
            CH1_8_T.setCellValue(listaData.get(0).TOT_RIVAAMO);
            CH1_9_T.setCellValue(listaData.get(0).TOT_RICAAMO);
            CH1_10_T.setCellValue(listaData.get(0).TOT_RFTEAMO);
            CH1_11_T.setCellValue(listaData.get(0).TOT_NETOAMO);
            CH1_12_T.setCellValue(listaData.get(0).TOT_COMPAMOC);
            CH1_13_T.setCellValue(listaData.get(0).TOT_TCONAMOC);
            CH1_14_T.setCellValue(listaData.get(0).TOT_COMMAMOC);
            CH1_15_T.setCellValue(listaData.get(0).TOT_IVAAMOUC);
            CH1_16_T.setCellValue(listaData.get(0).TOT_PROPAMOC);
            CH1_17_T.setCellValue(listaData.get(0).TOT_RIVAAMOC);
            CH1_18_T.setCellValue(listaData.get(0).TOT_RICAAMOC);
            CH1_19_T.setCellValue(listaData.get(0).TOT_RFTEAMOC);
            CH1_20_T.setCellValue(listaData.get(0).TOT_NETOAMOC);
            CH1_21_T.setCellValue(listaData.get(0).TOT_DIFF_COMPAMO);
            CH1_22_T.setCellValue(listaData.get(0).TOT_DIFF_TCONAMO);
            CH1_23_T.setCellValue(listaData.get(0).TOT_DIFF_COMMAMO);
            CH1_24_T.setCellValue(listaData.get(0).TOT_DIFF_IVAAMOU);
            CH1_25_T.setCellValue(listaData.get(0).TOT_DIFF_PROPAMO);
            CH1_26_T.setCellValue(listaData.get(0).TOT_DIFF_RIVAAMO);
            CH1_27_T.setCellValue(listaData.get(0).TOT_DIFF_RICAAMO);
            CH1_28_T.setCellValue(listaData.get(0).TOT_DIFF_RFTEAMO);
            CH1_29_T.setCellValue(listaData.get(0).TOT_DIFF_NETOAMO);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);

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
    
    @RequestMapping(value = "getXLSXDaySummary")
    public @ResponseBody
    void getXLSXDaySummary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF100Filter> listaData = this.getListDaySummary(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            CH1_0.setCellValue("Proccesing");
            CH1_1.setCellValue("Country");
            CH1_2.setCellValue("Curr.");
            CH1_3.setCellValue("Settlement");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Audit Settlement");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("Differences");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");

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
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 29));
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
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);

            CH2_0.setCellValue("Date");
            CH2_3.setCellValue("Valor Compras");
            CH2_4.setCellValue("Valor Tot.Consignac");
            CH2_5.setCellValue("Valor Com.Estaleci");
            CH2_6.setCellValue("Valor IVA");
            CH2_7.setCellValue("Valor Propina");
            CH2_8.setCellValue("Valor Retencion IVA");
            CH2_9.setCellValue("Valor retencion ICA");
            CH2_10.setCellValue("Valor Retencion Fte");
            CH2_11.setCellValue("Valor Neto Consigna");
            CH2_12.setCellValue("Valor Compras");
            CH2_13.setCellValue("Valor Tot.Consignac");
            CH2_14.setCellValue("Valor Com.Estaleci");
            CH2_15.setCellValue("Valor IVA");
            CH2_16.setCellValue("Valor Propina");
            CH2_17.setCellValue("Valor Retencion IVA");
            CH2_18.setCellValue("Valor retencion ICA");
            CH2_19.setCellValue("Valor Retencion Fte");
            CH2_20.setCellValue("Valor Neto Consigna");
            CH2_21.setCellValue("Valor Compras");
            CH2_22.setCellValue("Valor Tot.Consignac");
            CH2_23.setCellValue("Valor Com.Estaleci");
            CH2_24.setCellValue("Valor IVA");
            CH2_25.setCellValue("Valor Propina");
            CH2_26.setCellValue("Valor Retencion IVA");
            CH2_27.setCellValue("Valor retencion ICA");
            CH2_28.setCellValue("Valor Retencion Fte");
            CH2_29.setCellValue("Valor Neto Consigna");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 29));
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
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).strFecFiltro);
                rcell1.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell2.setCellValue(listaData.get(vi).SCURRENCY);
                rcell3.setCellValue(listaData.get(vi).COMPAMO);
                rcell4.setCellValue(listaData.get(vi).TCONAMO);
                rcell5.setCellValue(listaData.get(vi).COMMAMO);
                rcell6.setCellValue(listaData.get(vi).IVAAMOU);
                rcell7.setCellValue(listaData.get(vi).PROPAMO);
                rcell8.setCellValue(listaData.get(vi).RIVAAMO);
                rcell9.setCellValue(listaData.get(vi).RICAAMO);
                rcell10.setCellValue(listaData.get(vi).RFTEAMO);
                rcell11.setCellValue(listaData.get(vi).NETOAMO);
                rcell12.setCellValue(listaData.get(vi).COMPAMOC);
                rcell13.setCellValue(listaData.get(vi).TCONAMOC);
                rcell14.setCellValue(listaData.get(vi).COMMAMOC);
                rcell15.setCellValue(listaData.get(vi).IVAAMOUC);
                rcell16.setCellValue(listaData.get(vi).PROPAMOC);
                rcell17.setCellValue(listaData.get(vi).RIVAAMOC);
                rcell18.setCellValue(listaData.get(vi).RICAAMOC);
                rcell19.setCellValue(listaData.get(vi).RFTEAMOC);
                rcell20.setCellValue(listaData.get(vi).NETOAMOC);
                rcell21.setCellValue(listaData.get(vi).DIFF_COMPAMO);
                rcell22.setCellValue(listaData.get(vi).DIFF_TCONAMO);
                rcell23.setCellValue(listaData.get(vi).DIFF_COMMAMO);
                rcell24.setCellValue(listaData.get(vi).DIFF_IVAAMOU);
                rcell25.setCellValue(listaData.get(vi).DIFF_PROPAMO);
                rcell26.setCellValue(listaData.get(vi).DIFF_RIVAAMO);
                rcell27.setCellValue(listaData.get(vi).DIFF_RICAAMO);
                rcell28.setCellValue(listaData.get(vi).DIFF_RFTEAMO);
                rcell29.setCellValue(listaData.get(vi).DIFF_NETOAMO);
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue(listaData.get(0).TOT_COMPAMO);
            CH1_4_T.setCellValue(listaData.get(0).TOT_TCONAMO);
            CH1_5_T.setCellValue(listaData.get(0).TOT_COMMAMO);
            CH1_6_T.setCellValue(listaData.get(0).TOT_IVAAMOU);
            CH1_7_T.setCellValue(listaData.get(0).TOT_PROPAMO);
            CH1_8_T.setCellValue(listaData.get(0).TOT_RIVAAMO);
            CH1_9_T.setCellValue(listaData.get(0).TOT_RICAAMO);
            CH1_10_T.setCellValue(listaData.get(0).TOT_RFTEAMO);
            CH1_11_T.setCellValue(listaData.get(0).TOT_NETOAMO);
            CH1_12_T.setCellValue(listaData.get(0).TOT_COMPAMOC);
            CH1_13_T.setCellValue(listaData.get(0).TOT_TCONAMOC);
            CH1_14_T.setCellValue(listaData.get(0).TOT_COMMAMOC);
            CH1_15_T.setCellValue(listaData.get(0).TOT_IVAAMOUC);
            CH1_16_T.setCellValue(listaData.get(0).TOT_PROPAMOC);
            CH1_17_T.setCellValue(listaData.get(0).TOT_RIVAAMOC);
            CH1_18_T.setCellValue(listaData.get(0).TOT_RICAAMOC);
            CH1_19_T.setCellValue(listaData.get(0).TOT_RFTEAMOC);
            CH1_20_T.setCellValue(listaData.get(0).TOT_NETOAMOC);
            CH1_21_T.setCellValue(listaData.get(0).TOT_DIFF_COMPAMO);
            CH1_22_T.setCellValue(listaData.get(0).TOT_DIFF_TCONAMO);
            CH1_23_T.setCellValue(listaData.get(0).TOT_DIFF_COMMAMO);
            CH1_24_T.setCellValue(listaData.get(0).TOT_DIFF_IVAAMOU);
            CH1_25_T.setCellValue(listaData.get(0).TOT_DIFF_PROPAMO);
            CH1_26_T.setCellValue(listaData.get(0).TOT_DIFF_RIVAAMO);
            CH1_27_T.setCellValue(listaData.get(0).TOT_DIFF_RICAAMO);
            CH1_28_T.setCellValue(listaData.get(0).TOT_DIFF_RFTEAMO);
            CH1_29_T.setCellValue(listaData.get(0).TOT_DIFF_NETOAMO);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);

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
    
    @RequestMapping(value = "getXLSXDaySummaryMPF101")
    public @ResponseBody
    void getXLSXDaySummaryMPF101(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF100Filter> listaData = this.getListDaySummaryMPF101(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);

            CH1_0.setCellValue("Proccesing");
            CH1_1.setCellValue("Country");
            CH1_2.setCellValue("Curr.");
            CH1_3.setCellValue("Merchant");
            CH1_4.setCellValue("Settlement");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("Audit Settlement");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("Differences");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");

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
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 30));
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
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);

            CH2_0.setCellValue("Date");
            CH2_4.setCellValue("Valor Compras");
            CH2_5.setCellValue("Valor Tot.Consignac");
            CH2_6.setCellValue("Valor Com.Estaleci");
            CH2_7.setCellValue("Valor IVA");
            CH2_8.setCellValue("Valor Propina");
            CH2_9.setCellValue("Valor Retencion IVA");
            CH2_10.setCellValue("Valor retencion ICA");
            CH2_11.setCellValue("Valor Retencion Fte");
            CH2_12.setCellValue("Valor Neto Consigna");
            CH2_13.setCellValue("Valor Compras");
            CH2_14.setCellValue("Valor Tot.Consignac");
            CH2_15.setCellValue("Valor Com.Estaleci");
            CH2_16.setCellValue("Valor IVA");
            CH2_17.setCellValue("Valor Propina");
            CH2_18.setCellValue("Valor Retencion IVA");
            CH2_19.setCellValue("Valor retencion ICA");
            CH2_20.setCellValue("Valor Retencion Fte");
            CH2_21.setCellValue("Valor Neto Consigna");
            CH2_22.setCellValue("Valor Compras");
            CH2_23.setCellValue("Valor Tot.Consignac");
            CH2_24.setCellValue("Valor Com.Estaleci");
            CH2_25.setCellValue("Valor IVA");
            CH2_26.setCellValue("Valor Propina");
            CH2_27.setCellValue("Valor Retencion IVA");
            CH2_28.setCellValue("Valor retencion ICA");
            CH2_29.setCellValue("Valor Retencion Fte");
            CH2_30.setCellValue("Valor Neto Consigna");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 30, 30));
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
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);

                rcell0.setCellValue(listaData.get(vi).strFecFiltro);
                rcell1.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell2.setCellValue(listaData.get(vi).SCURRENCY);
                rcell3.setCellValue(listaData.get(vi).MERCHNC);
                rcell4.setCellValue(listaData.get(vi).COMPAMO);
                rcell5.setCellValue(listaData.get(vi).TCONAMO);
                rcell6.setCellValue(listaData.get(vi).COMMAMO);
                rcell7.setCellValue(listaData.get(vi).IVAAMOU);
                rcell8.setCellValue(listaData.get(vi).PROPAMO);
                rcell9.setCellValue(listaData.get(vi).RIVAAMO);
                rcell10.setCellValue(listaData.get(vi).RICAAMO);
                rcell11.setCellValue(listaData.get(vi).RFTEAMO);
                rcell12.setCellValue(listaData.get(vi).NETOAMO);
                rcell13.setCellValue(listaData.get(vi).COMPAMOC);
                rcell14.setCellValue(listaData.get(vi).TCONAMOC);
                rcell15.setCellValue(listaData.get(vi).COMMAMOC);
                rcell16.setCellValue(listaData.get(vi).IVAAMOUC);
                rcell17.setCellValue(listaData.get(vi).PROPAMOC);
                rcell18.setCellValue(listaData.get(vi).RIVAAMOC);
                rcell19.setCellValue(listaData.get(vi).RICAAMOC);
                rcell20.setCellValue(listaData.get(vi).RFTEAMOC);
                rcell21.setCellValue(listaData.get(vi).NETOAMOC);
                rcell22.setCellValue(listaData.get(vi).DIFF_COMPAMO);
                rcell23.setCellValue(listaData.get(vi).DIFF_TCONAMO);
                rcell24.setCellValue(listaData.get(vi).DIFF_COMMAMO);
                rcell25.setCellValue(listaData.get(vi).DIFF_IVAAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PROPAMO);
                rcell27.setCellValue(listaData.get(vi).DIFF_RIVAAMO);
                rcell28.setCellValue(listaData.get(vi).DIFF_RICAAMO);
                rcell29.setCellValue(listaData.get(vi).DIFF_RFTEAMO);
                rcell30.setCellValue(listaData.get(vi).DIFF_NETOAMO);
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue(listaData.get(0).TOT_COMPAMO);
            CH1_5_T.setCellValue(listaData.get(0).TOT_TCONAMO);
            CH1_6_T.setCellValue(listaData.get(0).TOT_COMMAMO);
            CH1_7_T.setCellValue(listaData.get(0).TOT_IVAAMOU);
            CH1_8_T.setCellValue(listaData.get(0).TOT_PROPAMO);
            CH1_9_T.setCellValue(listaData.get(0).TOT_RIVAAMO);
            CH1_10_T.setCellValue(listaData.get(0).TOT_RICAAMO);
            CH1_11_T.setCellValue(listaData.get(0).TOT_RFTEAMO);
            CH1_12_T.setCellValue(listaData.get(0).TOT_NETOAMO);
            CH1_13_T.setCellValue(listaData.get(0).TOT_COMPAMOC);
            CH1_14_T.setCellValue(listaData.get(0).TOT_TCONAMOC);
            CH1_15_T.setCellValue(listaData.get(0).TOT_COMMAMOC);
            CH1_16_T.setCellValue(listaData.get(0).TOT_IVAAMOUC);
            CH1_17_T.setCellValue(listaData.get(0).TOT_PROPAMOC);
            CH1_18_T.setCellValue(listaData.get(0).TOT_RIVAAMOC);
            CH1_19_T.setCellValue(listaData.get(0).TOT_RICAAMOC);
            CH1_20_T.setCellValue(listaData.get(0).TOT_RFTEAMOC);
            CH1_21_T.setCellValue(listaData.get(0).TOT_NETOAMOC);
            CH1_22_T.setCellValue(listaData.get(0).TOT_DIFF_COMPAMO);
            CH1_23_T.setCellValue(listaData.get(0).TOT_DIFF_TCONAMO);
            CH1_24_T.setCellValue(listaData.get(0).TOT_DIFF_COMMAMO);
            CH1_25_T.setCellValue(listaData.get(0).TOT_DIFF_IVAAMOU);
            CH1_26_T.setCellValue(listaData.get(0).TOT_DIFF_PROPAMO);
            CH1_27_T.setCellValue(listaData.get(0).TOT_DIFF_RIVAAMO);
            CH1_28_T.setCellValue(listaData.get(0).TOT_DIFF_RICAAMO);
            CH1_29_T.setCellValue(listaData.get(0).TOT_DIFF_RFTEAMO);
            CH1_30_T.setCellValue(listaData.get(0).TOT_DIFF_NETOAMO);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);

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
    
    @RequestMapping(value = "getXLSXDaySummaryMerchant")
    public @ResponseBody
    void getXLSXDaySummaryMerchant(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF100Filter> listaData = this.getListDaySummaryMerchant(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);
            Cell CH1_32 = row1.createCell(32);

            CH1_0.setCellValue("Proccesing");
            CH1_1.setCellValue("Country");
            CH1_2.setCellValue("Credit Card");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Curr.");
            CH1_6.setCellValue("Settlement");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("Audit Settlement");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("Differences");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("");

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
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 32));
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
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);
            Cell CH2_32 = row2.createCell(32);

            CH2_0.setCellValue("Date");
            CH2_2.setCellValue("Code");
            CH2_3.setCellValue("Number");
            CH2_4.setCellValue("Auth.");
            CH2_6.setCellValue("Valor Compras");
            CH2_7.setCellValue("Valor Tot.Consignac");
            CH2_8.setCellValue("Valor Com.Estaleci");
            CH2_9.setCellValue("Valor IVA");
            CH2_10.setCellValue("Valor Propina");
            CH2_11.setCellValue("Valor Retencion IVA");
            CH2_12.setCellValue("Valor retencion ICA");
            CH2_13.setCellValue("Valor Retencion Fte");
            CH2_14.setCellValue("Valor Neto Consigna");
            CH2_15.setCellValue("Valor Compras");
            CH2_16.setCellValue("Valor Tot.Consignac");
            CH2_17.setCellValue("Valor Com.Estaleci");
            CH2_18.setCellValue("Valor IVA");
            CH2_19.setCellValue("Valor Propina");
            CH2_20.setCellValue("Valor Retencion IVA");
            CH2_21.setCellValue("Valor retencion ICA");
            CH2_22.setCellValue("Valor Retencion Fte");
            CH2_23.setCellValue("Valor Neto Consigna");
            CH2_24.setCellValue("Valor Compras");
            CH2_25.setCellValue("Valor Tot.Consignac");
            CH2_26.setCellValue("Valor Com.Estaleci");
            CH2_27.setCellValue("Valor IVA");
            CH2_28.setCellValue("Valor Propina");
            CH2_29.setCellValue("Valor Retencion IVA");
            CH2_30.setCellValue("Valor retencion ICA");
            CH2_31.setCellValue("Valor Retencion Fte");
            CH2_32.setCellValue("Valor Neto Consigna");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_32.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 32, 32));
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
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);
                Cell rcell32 = row1.createCell(32);

                rcell0.setCellValue(listaData.get(vi).strFecFiltro);
                rcell1.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell2.setCellValue(listaData.get(vi).SCARCOD);
                rcell3.setCellValue(listaData.get(vi).SCARDN);
                rcell4.setCellValue(listaData.get(vi).SAUTHOC);
                rcell5.setCellValue(listaData.get(vi).SCURRENCY);
                rcell6.setCellValue(listaData.get(vi).COMPAMO);
                rcell7.setCellValue(listaData.get(vi).TCONAMO);
                rcell8.setCellValue(listaData.get(vi).COMMAMO);
                rcell9.setCellValue(listaData.get(vi).IVAAMOU);
                rcell10.setCellValue(listaData.get(vi).PROPAMO);
                rcell11.setCellValue(listaData.get(vi).RIVAAMO);
                rcell12.setCellValue(listaData.get(vi).RICAAMO);
                rcell13.setCellValue(listaData.get(vi).RFTEAMO);
                rcell14.setCellValue(listaData.get(vi).NETOAMO);
                rcell15.setCellValue(listaData.get(vi).COMPAMOC);
                rcell16.setCellValue(listaData.get(vi).TCONAMOC);
                rcell17.setCellValue(listaData.get(vi).COMMAMOC);
                rcell18.setCellValue(listaData.get(vi).IVAAMOUC);
                rcell19.setCellValue(listaData.get(vi).PROPAMOC);
                rcell20.setCellValue(listaData.get(vi).RIVAAMOC);
                rcell21.setCellValue(listaData.get(vi).RICAAMOC);
                rcell22.setCellValue(listaData.get(vi).RFTEAMOC);
                rcell23.setCellValue(listaData.get(vi).NETOAMOC);
                rcell24.setCellValue(listaData.get(vi).DIFF_COMPAMO);
                rcell25.setCellValue(listaData.get(vi).DIFF_TCONAMO);
                rcell26.setCellValue(listaData.get(vi).DIFF_COMMAMO);
                rcell27.setCellValue(listaData.get(vi).DIFF_IVAAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_PROPAMO);
                rcell29.setCellValue(listaData.get(vi).DIFF_RIVAAMO);
                rcell30.setCellValue(listaData.get(vi).DIFF_RICAAMO);
                rcell31.setCellValue(listaData.get(vi).DIFF_RFTEAMO);
                rcell32.setCellValue(listaData.get(vi).DIFF_NETOAMO);
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);
            Cell CH1_32_T = rowTotal.createCell(32);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue(listaData.get(0).TOT_COMPAMO);
            CH1_7_T.setCellValue(listaData.get(0).TOT_TCONAMO);
            CH1_8_T.setCellValue(listaData.get(0).TOT_COMMAMO);
            CH1_9_T.setCellValue(listaData.get(0).TOT_IVAAMOU);
            CH1_10_T.setCellValue(listaData.get(0).TOT_PROPAMO);
            CH1_11_T.setCellValue(listaData.get(0).TOT_RIVAAMO);
            CH1_12_T.setCellValue(listaData.get(0).TOT_RICAAMO);
            CH1_13_T.setCellValue(listaData.get(0).TOT_RFTEAMO);
            CH1_14_T.setCellValue(listaData.get(0).TOT_NETOAMO);
            CH1_15_T.setCellValue(listaData.get(0).TOT_COMPAMOC);
            CH1_16_T.setCellValue(listaData.get(0).TOT_TCONAMOC);
            CH1_17_T.setCellValue(listaData.get(0).TOT_COMMAMOC);
            CH1_18_T.setCellValue(listaData.get(0).TOT_IVAAMOUC);
            CH1_19_T.setCellValue(listaData.get(0).TOT_PROPAMOC);
            CH1_20_T.setCellValue(listaData.get(0).TOT_RIVAAMOC);
            CH1_21_T.setCellValue(listaData.get(0).TOT_RICAAMOC);
            CH1_22_T.setCellValue(listaData.get(0).TOT_RFTEAMOC);
            CH1_23_T.setCellValue(listaData.get(0).TOT_NETOAMOC);
            CH1_24_T.setCellValue(listaData.get(0).TOT_DIFF_COMPAMO);
            CH1_25_T.setCellValue(listaData.get(0).TOT_DIFF_TCONAMO);
            CH1_26_T.setCellValue(listaData.get(0).TOT_DIFF_COMMAMO);
            CH1_27_T.setCellValue(listaData.get(0).TOT_DIFF_IVAAMOU);
            CH1_28_T.setCellValue(listaData.get(0).TOT_DIFF_PROPAMO);
            CH1_29_T.setCellValue(listaData.get(0).TOT_DIFF_RIVAAMO);
            CH1_30_T.setCellValue(listaData.get(0).TOT_DIFF_RICAAMO);
            CH1_31_T.setCellValue(listaData.get(0).TOT_DIFF_RFTEAMO);
            CH1_32_T.setCellValue(listaData.get(0).TOT_DIFF_NETOAMO);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);
            CH1_32_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);

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
}
