/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BsplinkReportsStatisticsdetLogic;
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
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/BsplinkReportsStatisticsdet")
public class BsplinkReportsStatisticsdetController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    @RequestMapping(value = "SearchReportGeneral")
    public @ResponseBody
    String SearchReportGeneral(ModelMap map, HttpServletRequest request) {
        A3389Filter filter = new A3389Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            int pExcel = Integer.parseInt(filter.pexcel);
            Boolean bExcel = pExcel == 1 ? true : false;

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            BsplinkReportsStatisticsdetLogic logic = new BsplinkReportsStatisticsdetLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst_search = logic.SearchReportGeneral(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3389Filter filter = new A3389Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            BsplinkReportsStatisticsdetLogic logic = new BsplinkReportsStatisticsdetLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst = logic.SearchReportGeneral(filter);

            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("ReportStatistDetail");
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

            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25;

            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);
            CH_21 = row.createCell(21);
            CH_22 = row.createCell(22);
            CH_23 = row.createCell(23);
            CH_24 = row.createCell(24);
            CH_25 = row.createCell(25);

            CH_00.setCellValue("Country");
            CH_01.setCellValue("IATA");
            CH_02.setCellValue("Agency");
            CH_03.setCellValue("Type RFND");
            CH_04.setCellValue("Document");
            CH_05.setCellValue("Ticket");
            CH_06.setCellValue("Application date");
            CH_07.setCellValue("Authorise Reject date");
            CH_08.setCellValue("Auditor");
            CH_09.setCellValue("Status");
            CH_10.setCellValue("Reason BSP");
            CH_11.setCellValue("Reason AM");
            CH_12.setCellValue("Sales audit");
            CH_13.setCellValue("Currency");
            CH_14.setCellValue("Payment");
            CH_15.setCellValue("Fare");
            CH_16.setCellValue("Commission");
            CH_17.setCellValue("Tax");
            CH_18.setCellValue("Penalty");
            CH_19.setCellValue("TAX on CP");
            CH_20.setCellValue("Total");
            CH_21.setCellValue("Days");
            CH_22.setCellValue("SALE DATE");
            CH_23.setCellValue("Applicable");
            CH_24.setCellValue("Reason");
            CH_25.setCellValue("Channel");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);
            CH_21.setCellStyle(headerStyle);
            CH_22.setCellStyle(headerStyle);
            CH_23.setCellStyle(headerStyle);
            CH_24.setCellStyle(headerStyle);
            CH_25.setCellStyle(headerStyle);

            ++vj;

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);
                CH_21 = row.createCell(21);
                CH_22 = row.createCell(22);
                CH_23 = row.createCell(23);
                CH_24 = row.createCell(24);
                CH_25 = row.createCell(25);

                CH_00.setCellValue(lst.get(vi).A3389PAIS);
                CH_01.setCellValue(lst.get(vi).A3389IATA);
                CH_02.setCellValue(lst.get(vi).A3389NOMAGENCY);
                CH_03.setCellValue(lst.get(vi).A3389RAUD);
                CH_04.setCellValue(lst.get(vi).A3389NUMER);
                CH_05.setCellValue(lst.get(vi).A3389TKT);
                CH_06.setCellValue(lst.get(vi).A3389FAPPI);
                CH_07.setCellValue(lst.get(vi).A3389FAUTO);
                CH_08.setCellValue(lst.get(vi).A3389REGAS);
                CH_09.setCellValue(lst.get(vi).A3389FLAG);
                CH_10.setCellValue(lst.get(vi).A3389RAAG);
                CH_11.setCellValue(lst.get(vi).A3389RAAR);
                CH_12.setCellValue(lst.get(vi).A3389STATO);
                CH_13.setCellValue(lst.get(vi).A3389MDA);
                CH_14.setCellValue(lst.get(vi).A3389TCODE);
                CH_15.setCellValue(lst.get(vi).A3389TARIF);
                CH_16.setCellValue(lst.get(vi).A3389COMIS);
                CH_17.setCellValue(lst.get(vi).A3389TTAX);
                CH_18.setCellValue(lst.get(vi).A3389PENAL);
                CH_19.setCellValue(lst.get(vi).A3389PORPE);
                CH_20.setCellValue(lst.get(vi).A3389TOTAL);
                CH_21.setCellValue(lst.get(vi).A3389DIAS);
                CH_22.setCellValue(lst.get(vi).A3389FECOR);
                CH_23.setCellValue(lst.get(vi).A3401STATU);
                CH_24.setCellValue(lst.get(vi).A3401RAAG);
                CH_25.setCellValue(lst.get(vi).A3389CHANEL);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);
                CH_21.setCellStyle(bodyStyle);
                CH_22.setCellStyle(bodyStyle);
                CH_23.setCellStyle(bodyStyle);
                CH_24.setCellStyle(bodyStyle);
                CH_25.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            //sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            //sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);

            String fileNameDownload = String.format("ReportStatistDetail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "SearchReportStatis")
    public @ResponseBody
    String SearchReportStatis(ModelMap map, HttpServletRequest request) {
        A3389Filter filter = new A3389Filter();
        HashMap map01, map02, map03, map04, map05, map06, map07, map08, map09;
        ArrayList<HashMap<String, String>> lst_stadistica = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadUserTypeRFND = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadTypeRFND = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadPais = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadFauto = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadDIAS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadRAZONES = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadTYPEPAGO = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_stadRAZONES_REJECT = new ArrayList<>();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            BsplinkReportsStatisticsdetLogic logic = new BsplinkReportsStatisticsdetLogic();
            logic.setSession(this.serverSession.getServerSession());
            A3389Filter lst_general = logic.SearchReportStatis(filter, "1");
            /*List<A3389Filter> lst_stadUserTypeRFND = logic.SearchReportStatis(filter,"2");
            List<A3389Filter> lst_stadTypeRFND = logic.SearchReportStatis(filter,"3");
            List<A3389Filter> lst_stadPais = logic.SearchReportStatis(filter,"4");
            List<A3389Filter> lst_stadFauto = logic.SearchReportStatis(filter,"5");
            
            List<A3389Filter> lst_stadRAZONES = logic.SearchReportStatis(filter,"6");
            List<A3389Filter> lst_stadTYPEPAGO = logic.SearchReportStatis(filter,"7");
            List<A3389Filter> lst_stadDIAS = logic.SearchReportStatis(filter,"8");*/

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadistica">
            for (int vi = 0; vi < lst_general.lst_stadistica.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3389REGAS", lst_general.lst_stadistica.get(vi).A3389REGAS);
                map01.put("A3389FLAG", lst_general.lst_stadistica.get(vi).A3389FLAG);
                map01.put("A3389STATO", lst_general.lst_stadistica.get(vi).A3389STATO);
                map01.put("A3389STATU", lst_general.lst_stadistica.get(vi).A3389STATU);

                lst_stadistica.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadUserTypeRFND">
            for (int vi = 0; vi < lst_general.lst_stadUserTypeRFND.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A3389REGAS", lst_general.lst_stadUserTypeRFND.get(vi).A3389REGAS);
                map02.put("A3389FLAG", lst_general.lst_stadUserTypeRFND.get(vi).A3389FLAG);
                map02.put("A3389STATO", lst_general.lst_stadUserTypeRFND.get(vi).A3389STATO);
                map02.put("A3389STATU", lst_general.lst_stadUserTypeRFND.get(vi).A3389STATU);

                lst_stadUserTypeRFND.add(map02);
            }
            // </editor-fold>            
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadTypeRFND">
            for (int vi = 0; vi < lst_general.lst_stadTypeRFND.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A3389RAUD", lst_general.lst_stadTypeRFND.get(vi).A3389RAUD);
                map03.put("A3389FLAG", lst_general.lst_stadTypeRFND.get(vi).A3389FLAG);
                map03.put("A3389STATO", lst_general.lst_stadTypeRFND.get(vi).A3389STATO);
                map03.put("A3389STATU", lst_general.lst_stadTypeRFND.get(vi).A3389STATU);

                lst_stadTypeRFND.add(map03);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadPais">
            for (int vi = 0; vi < lst_general.lst_stadPais.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A3389PAIS", lst_general.lst_stadPais.get(vi).A3389PAIS);
                map04.put("A3389FLAG", lst_general.lst_stadPais.get(vi).A3389FLAG);
                map04.put("A3389STATO", lst_general.lst_stadPais.get(vi).A3389STATO);
                map04.put("A3389STATU", lst_general.lst_stadPais.get(vi).A3389STATU);

                lst_stadPais.add(map04);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadFauto">
            for (int vi = 0; vi < lst_general.lst_stadFauto.size(); ++vi) {
                map05 = new HashMap<>();

                map05.put("A3389FAUTO", lst_general.lst_stadFauto.get(vi).A3389FAUTO);
                map05.put("A3389FLAG", lst_general.lst_stadFauto.get(vi).A3389FLAG);
                map05.put("A3389STATO", lst_general.lst_stadFauto.get(vi).A3389STATO);
                map05.put("A3389STATU", lst_general.lst_stadFauto.get(vi).A3389STATU);

                lst_stadFauto.add(map05);
            }
            // </editor-fold>           
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadRAZONES">
            for (int vi = 0; vi < lst_general.lst_stadRAZONES.size(); ++vi) {
                map07 = new HashMap<>();

                map07.put("A3389FLAG", lst_general.lst_stadRAZONES.get(vi).A3389FLAG);
                map07.put("A3389RCHASUM", lst_general.lst_stadRAZONES.get(vi).A3389RCHASUM);

                lst_stadRAZONES.add(map07);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadTYPEPAGO">
            for (int vi = 0; vi < lst_general.lst_stadTYPEPAGO.size(); ++vi) {
                map08 = new HashMap<>();

                map08.put("A3389ARCH1", lst_general.lst_stadTYPEPAGO.get(vi).A3389ARCH1);
                map08.put("A3389STATO", lst_general.lst_stadTYPEPAGO.get(vi).A3389STATO);
                map08.put("A3389STATU", lst_general.lst_stadTYPEPAGO.get(vi).A3389STATU);
                map08.put("A3389FLAG", lst_general.lst_stadTYPEPAGO.get(vi).A3389FLAG);
                map08.put("A3389CANTPEDI", lst_general.lst_stadTYPEPAGO.get(vi).A3389CANTPEDI);
                lst_stadTYPEPAGO.add(map08);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadDIAS">
            for (int vi = 0; vi < lst_general.lst_stadDIAS.size(); ++vi) {
                map06 = new HashMap<>();

                map06.put("A3389DIAS", lst_general.lst_stadDIAS.get(vi).A3389DIAS);
                map06.put("A3389FLAG", lst_general.lst_stadDIAS.get(vi).A3389FLAG);
                map06.put("A3389STATO", lst_general.lst_stadDIAS.get(vi).A3389STATO);
                map06.put("A3389STATU", lst_general.lst_stadDIAS.get(vi).A3389STATU);
                map06.put("A3389CANTPEDI", lst_general.lst_stadDIAS.get(vi).A3389CANTPEDI);
                map06.put("A3389CANTPROC", lst_general.lst_stadDIAS.get(vi).A3389CANTPROC);
                map06.put("A3389PENSUM", lst_general.lst_stadDIAS.get(vi).A3389PENSUM);
                map06.put("A3389PENPJESUM", lst_general.lst_stadDIAS.get(vi).A3389PENPJESUM);
                map06.put("A3389APROVSUM", lst_general.lst_stadDIAS.get(vi).A3389APROVSUM);

                lst_stadDIAS.add(map06);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_stadRAZONES_REJECT">
            for (int vi = 0; vi < lst_general.lst_stadRAZONES_REJECT.size(); ++vi) {
                map09 = new HashMap<>();

                map09.put("A3389FLAG", lst_general.lst_stadRAZONES_REJECT.get(vi).A3389FLAG);
                map09.put("A3389RCHASUM", lst_general.lst_stadRAZONES_REJECT.get(vi).A3389RCHASUM);

                lst_stadRAZONES_REJECT.add(map09);
            }
            // </editor-fold>

            map.put("success", true);
            map.put("datastadis", lst_stadistica);
            map.put("dataUserTypeRFND", lst_stadUserTypeRFND);
            map.put("dataTypeRFND", lst_stadTypeRFND);
            map.put("datastadPais", lst_stadPais);
            map.put("datastadFauto", lst_stadFauto);
            map.put("dataDIAS", lst_stadDIAS);

            map.put("dataRAZONES", lst_stadRAZONES);
            map.put("dataTYPEPAGO", lst_stadTYPEPAGO);
            map.put("dataRAZONES_REJECT", lst_stadRAZONES_REJECT);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

}
