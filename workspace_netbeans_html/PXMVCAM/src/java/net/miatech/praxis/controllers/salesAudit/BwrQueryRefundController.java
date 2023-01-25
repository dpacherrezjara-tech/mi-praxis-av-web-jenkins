/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.sun.org.apache.bcel.internal.generic.Type;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.print.DocFlavor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3908Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BwrQueryRefundLogic;
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
import org.json.JSONException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lremicio
 */
@Controller
@Scope("request")
@RequestMapping("/BsplinkRefundQueryRFND")
public class BwrQueryRefundController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BwrQueryRefundLogic logic;

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        A3389Filter filter = new A3389Filter();

        try {
            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").toString().trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").toString().trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").toString().trim();
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_USER = request.getParameter("IN_USER").toString().trim();
            filter.IN_IATA = request.getParameter("IN_IATA").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportQueryRFND(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit")
    public @ResponseBody
    String loadDataInit(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();

            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "ALL");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOAM");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOPR");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOPRC11");
            lstData.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit2")
    public @ResponseBody
    String loadDataInit2(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();
            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit3")
    public @ResponseBody
    String loadDataInit3(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();

            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "ALL");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOAM");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOPR");
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "BY AUDITOR");
            lstData.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchQueryRFNDetail")
    public @ResponseBody
    String SearchQueryRFNDetail(ModelMap map, HttpServletRequest request) {
        A3389Filter lst;
        A3389Filter filter = new A3389Filter();

        HashMap map01, map02, map03, map04, map05, map06, map07;

        ArrayList<HashMap<String, String>> lst_TAXES = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_DOCUMENTS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_CardType = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_DOCUMENTSAGNT = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_CardTypeAGNT = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RFNDAGNT = new ArrayList<>();

        try {
            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_PREME = request.getParameter("IN_PREME").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();

            lst = logic.SearchQueryRFNDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXES">
            for (int vi = 0; vi < lst.lst_TAXES.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3402CDTAX", lst.lst_TAXES.get(vi).A3402CDTAX);
                map01.put("A3402CDATO", lst.lst_TAXES.get(vi).A3402CDATO);
                map01.put("A3402CORRL", lst.lst_TAXES.get(vi).A3402CORRL);

                lst_TAXES.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < lst.lst_DOCUMENTS.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A3391CCUST", lst.lst_DOCUMENTS.get(vi).A3391CCUST);
                map02.put("A3391CIA", lst.lst_DOCUMENTS.get(vi).A3391CIA);
                map02.put("A3391FORMA", lst.lst_DOCUMENTS.get(vi).A3391FORMA);
                map02.put("A3391SERIE", lst.lst_DOCUMENTS.get(vi).A3391SERIE);
                map02.put("A3391TKT", lst.lst_DOCUMENTS.get(vi).A3391TKT);
                map02.put("A3391SEQ", lst.lst_DOCUMENTS.get(vi).A3391SEQ);
                map02.put("A3391CUPON", lst.lst_DOCUMENTS.get(vi).A3391CUPON);
                map02.put("A3391TRNCU", lst.lst_DOCUMENTS.get(vi).A3391TRNCU);
                map02.put("A3391CORRL", lst.lst_DOCUMENTS.get(vi).A3391CORRL);
                map02.put("A3391PREME", lst.lst_DOCUMENTS.get(vi).A3391PREME);
                map02.put("A3391FVNTA", lst.lst_DOCUMENTS.get(vi).A3391FVNTA);
                map02.put("A3391WAIVE", lst.lst_DOCUMENTS.get(vi).A3391WAIVE);

                lst_DOCUMENTS.add(map02);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_CardType">
            for (int vi = 0; vi < lst.lst_CardType.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A3392CFOP", lst.lst_CardType.get(vi).A3392CFOP);
                map03.put("A3392TYCAR", lst.lst_CardType.get(vi).A3392TYCAR);
                map03.put("A3392NTARJ", lst.lst_CardType.get(vi).A3392NTARJ);
                map03.put("A3392MONTO", lst.lst_CardType.get(vi).A3392MONTO);
                map03.put("A3392MONTE", lst.lst_CardType.get(vi).A3392MONTE);
                map03.put("A3392TOTAL", lst.lst_CardType.get(vi).A3392TOTAL);
                map03.put("A3392PREME", lst.lst_CardType.get(vi).A3392PREME);
                map03.put("A3392CORRL", lst.lst_CardType.get(vi).A3392CORRL);

                lst_CardType.add(map03);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A3403TYPE", lst.lst_RAZON.get(vi).A3403TYPE);
                map04.put("A3403CODE", lst.lst_RAZON.get(vi).A3403CODE);
                map04.put("A3403ERROR", lst.lst_RAZON.get(vi).A3403ERROR);
                map04.put("A3403SEQ", lst.lst_RAZON.get(vi).A3403SEQ);

                lst_RAZON.add(map04);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTSAGNT">
            for (int vi = 0; vi < lst.lst_DOCUMENTSAGNT.size(); ++vi) {
                map05 = new HashMap<>();

                map05.put("A3407CCUST", lst.lst_DOCUMENTSAGNT.get(vi).A3407CCUST);
                map05.put("A3407CIA", lst.lst_DOCUMENTSAGNT.get(vi).A3407CIA);
                map05.put("A3407TKT", lst.lst_DOCUMENTSAGNT.get(vi).A3407TKT);
                map05.put("A3407FORMA", lst.lst_DOCUMENTSAGNT.get(vi).A3407FORMA);
                map05.put("A3407SERIE", lst.lst_DOCUMENTSAGNT.get(vi).A3407SERIE);
                map05.put("A3407SEQ", lst.lst_DOCUMENTSAGNT.get(vi).A3407SEQ);
                map05.put("A3407CUPON", lst.lst_DOCUMENTSAGNT.get(vi).A3407CUPON);
                map05.put("A3407TRNCU", lst.lst_DOCUMENTSAGNT.get(vi).A3407TRNCU);
                map05.put("A3407CORRL", lst.lst_DOCUMENTSAGNT.get(vi).A3407CORRL);
                map05.put("A3407PREME", lst.lst_DOCUMENTSAGNT.get(vi).A3407PREME);
                map05.put("A3407FVNTA", lst.lst_DOCUMENTSAGNT.get(vi).A3407FVNTA);
                map05.put("A3407WAIVE", lst.lst_DOCUMENTSAGNT.get(vi).A3407WAIVE);

                lst_DOCUMENTSAGNT.add(map05);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_CardTypeAGNT">
            for (int vi = 0; vi < lst.lst_CardTypeAGNT.size(); ++vi) {
                map06 = new HashMap<>();

                map06.put("A3408CCUST", lst.lst_CardTypeAGNT.get(vi).A3408CCUST);
                map06.put("A3408CFOP", lst.lst_CardTypeAGNT.get(vi).A3408CFOP);
                map06.put("A3408TYCAR", lst.lst_CardTypeAGNT.get(vi).A3408TYCAR);
                map06.put("A3408CUR", lst.lst_CardTypeAGNT.get(vi).A3408CUR);
                map06.put("A3408NTARJ", lst.lst_CardTypeAGNT.get(vi).A3408NTARJ);
                map06.put("A3408PREME", lst.lst_CardTypeAGNT.get(vi).A3408PREME);
                map06.put("A3408CORRL", lst.lst_CardTypeAGNT.get(vi).A3408CORRL);
                map06.put("A3408MONTO", lst.lst_CardTypeAGNT.get(vi).A3408MONTO);
                map06.put("A3408MONTE", lst.lst_CardTypeAGNT.get(vi).A3408MONTE);
                map06.put("A3408TOTAL", lst.lst_CardTypeAGNT.get(vi).A3408TOTAL);

                lst_CardTypeAGNT.add(map06);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RFNDAGNT">
            for (int vi = 0; vi < lst.lst_RFNDAGNT.size(); ++vi) {
                map07 = new HashMap<>();

                map07.put("A3401STATU", lst.lst_RFNDAGNT.get(vi).A3401STATU);
                map07.put("A3401TKTXM", lst.lst_RFNDAGNT.get(vi).A3401TKTXM);
                map07.put("A3401TRNCU", lst.lst_RFNDAGNT.get(vi).A3401TRNCU);
                map07.put("A3401CHEKD", lst.lst_RFNDAGNT.get(vi).A3401CHEKD);
                map07.put("A3401CPN", lst.lst_RFNDAGNT.get(vi).A3401CPN);
                map07.put("A3401MDA", lst.lst_RFNDAGNT.get(vi).A3401MDA);
                map07.put("A3401MDAPG", lst.lst_RFNDAGNT.get(vi).A3401MDAPG);
                map07.put("A3401FLAG", lst.lst_RFNDAGNT.get(vi).A3401FLAG);
                map07.put("A3401RAAG", lst.lst_RFNDAGNT.get(vi).A3401RAAG);
                map07.put("A3401ARCH1", lst.lst_RFNDAGNT.get(vi).A3401ARCH1);
                map07.put("A3401TARIF", lst.lst_RFNDAGNT.get(vi).A3401TARIF);
                map07.put("A3401TRFPG", lst.lst_RFNDAGNT.get(vi).A3401TRFPG);
                map07.put("A3401TRFNC", lst.lst_RFNDAGNT.get(vi).A3401TRFNC);
                map07.put("A3401ROE", lst.lst_RFNDAGNT.get(vi).A3401ROE);
                map07.put("A3401COMIS", lst.lst_RFNDAGNT.get(vi).A3401COMIS);
                map07.put("A3401PORCO", lst.lst_RFNDAGNT.get(vi).A3401PORCO);
                map07.put("A3401TTAX", lst.lst_RFNDAGNT.get(vi).A3401TTAX);
                map07.put("A3401PENAL", lst.lst_RFNDAGNT.get(vi).A3401PENAL);
                map07.put("A3401PORPE", lst.lst_RFNDAGNT.get(vi).A3401PORPE);
                map07.put("A3401IVAPE", lst.lst_RFNDAGNT.get(vi).A3401IVAPE);
                map07.put("A3401TOTAL", lst.lst_RFNDAGNT.get(vi).A3401TOTAL);
                map07.put("A3401NETO", lst.lst_RFNDAGNT.get(vi).A3401NETO);

                lst_RFNDAGNT.add(map07);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_TAXES", lst_TAXES);
        map.put("lst_DOCUMENTS", lst_DOCUMENTS);
        map.put("lst_CardType", lst_CardType);
        map.put("lst_RAZON", lst_RAZON);
        map.put("lst_DOCUMENTSAGNT", lst_DOCUMENTSAGNT);
        map.put("lst_CardTypeAGNT", lst_CardTypeAGNT);
        map.put("lst_RFNDAGNT", lst_RFNDAGNT);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3389Filter filter = new A3389Filter();
        String vl_A3389FLAG = "ASSIGNED TO AUDITOR";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst = logic.SearchReportQueryRFND(filter);
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            //Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("QueryRefund");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15,CH_16;

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

            CH_00.setCellValue("Channel");
            CH_01.setCellValue("Document");
            CH_02.setCellValue("Ticket");
            CH_03.setCellValue("IATA");
            CH_04.setCellValue("Agency");
            CH_05.setCellValue("Application date");
            CH_06.setCellValue("Authorise / Reject date");
            CH_07.setCellValue("Time");
            CH_08.setCellValue("Country");
            CH_09.setCellValue("Cur.");
            CH_10.setCellValue("Net");
            CH_11.setCellValue("Passenger");
            CH_12.setCellValue("Auditor");
            CH_13.setCellValue("Reason BSP");
            CH_14.setCellValue("Sales audit");
            CH_15.setCellValue("Status");
            CH_16.setCellValue("Days");

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

                CH_00.setCellValue(lst.get(vi).A3389CHANEL);
                CH_01.setCellValue(lst.get(vi).A3389NUMER);
                CH_02.setCellValue(lst.get(vi).A3389TKT);
                CH_03.setCellValue(lst.get(vi).A3389IATA);
                CH_04.setCellValue(lst.get(vi).A3389NOMAGENCY);
                CH_05.setCellValue(lst.get(vi).A3389FAPPI);
                CH_06.setCellValue(lst.get(vi).A3389FAUTO);
                CH_07.setCellValue(lst.get(vi).A3389HAUTO);
                CH_08.setCellValue(lst.get(vi).A3389PAIS);
                CH_09.setCellValue(lst.get(vi).A3389MDA);
                CH_10.setCellValue(lst.get(vi).A3389TOTAL);
                CH_11.setCellValue(lst.get(vi).A3389PAX);
                CH_12.setCellValue(lst.get(vi).A3389REGAS);
                CH_13.setCellValue(lst.get(vi).A3389RACN);
                CH_14.setCellValue(lst.get(vi).A3389STATO);

                switch ((lst.get(vi).A3389FLAG).trim()) {
                    case "A":
                        vl_A3389FLAG = "ASSIGNED TO AUDITOR";
                        break;
                    case "R":
                        vl_A3389FLAG = "REJECTED";
                        break;
                    case "F":
                        vl_A3389FLAG = "AUTHORISED";
                        break;
                    case "Y":
                        vl_A3389FLAG = "PENDING";
                        break;
                    case "X":
                        vl_A3389FLAG = "VOID";
                        break;
                    case "D":
                        vl_A3389FLAG = "REEMBOLSABLE";
                        break;
                    case "J":
                        vl_A3389FLAG = "EXEC. OF THE ROBOT";
                        break;
                    case "G":
                        vl_A3389FLAG = "NO REEMBOLSABLE";
                        break;
                    case "B":
                        vl_A3389FLAG = "CHANGE FOR ANOTHER";
                        break;
                    case "C":
                        vl_A3389FLAG = "INCONSISTENCY WITH THE ROBOT";
                        break;
                    case "":
                        vl_A3389FLAG = "PENDING DOWNLOAD";
                        break;
                    case "E":
                        vl_A3389FLAG = "ERROR IN THE PROCESS";
                        break;
                    case "Z":
                        vl_A3389FLAG = "UNDER INVESTIGATION";
                        break;
                    case "K":
                        vl_A3389FLAG = "CPN EVALUATION";
                        break;
                }
                CH_15.setCellValue(vl_A3389FLAG);
                CH_16.setCellValue(lst.get(vi).A3389DIAS);

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

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            //sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            //sheet.autoSizeColumn(12, true);
            //sheet.autoSizeColumn(13, true);
            //sheet.autoSizeColumn(14, true);
            //sheet.autoSizeColumn(15, true);

            String fileNameDownload = String.format("QueryRefund - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "GetFilesDirectory")
    public @ResponseBody
    String GetFilesDirectory(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {
        System.out.println("Conexión AWS...");

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
        String IN_PATH = path_config + "\\IMGTMPRFND\\";
        String IN_DATE = request.getParameter("IN_DATE").toString().trim();
        String IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
        String IN_DOCUMENT = request.getParameter("IN_DOCUMENT").toString().trim();

        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);

        /*
         Preparando parámetros para enviar por body
         */
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_OPTION", IN_OPTION);
        bodyData.put("IN_PATH", IN_PATH);
        bodyData.put("IN_DATE", IN_DATE);
        bodyData.put("IN_COUNTRY", IN_COUNTRY);
        bodyData.put("IN_DOCUMENT", IN_DOCUMENT);

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/rfnd/all/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String body = response.getBody().getObject().get("data").toString();

        map.put("success", true);
        map.put("data", body);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstRFND")
    public @ResponseBody
    String searchLstRFND(ModelMap map, HttpServletRequest request) {
        A3389Filter filter = new A3389Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            BwrQueryRefundLogic logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst_search = logic.searchLstRFND(filter);

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

    @RequestMapping(value = "SearchRFNDPDI")
    public @ResponseBody
    String SearchRFNDPDI(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        A3389Filter filter = new A3389Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            String IN_DOCUMENT = filter.IN_DOCUMET;
            //IN_DOCUMENT = "2522497772";

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("document", IN_DOCUMENT);

            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/rfnd/pdi/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String body = response.getBody().getObject().get("filetext").toString();

            map.put("success", true);
            map.put("data", body);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaMantenimiento")
    public @ResponseBody
    String ProcesaMantenimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        A3389Filter filter = new A3389Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            BwrQueryRefundLogic logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaMantenimiento(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchSabreLst")
    public @ResponseBody
    String searchSabreLst(ModelMap map, HttpServletRequest request) {
        A3908Filter filter = new A3908Filter();
        String result="";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            BwrQueryRefundLogic logic = new BwrQueryRefundLogic();
            logic.setSession(this.serverSession.getServerSession());
            if(filter.IN_TIPO.equals("1")){
                result = upload_s3(filter.IN_PREME.trim());
            }
            List<A3908Filter> lst_search = logic.searchSabreLst(filter);
            
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
    
   public String upload_s3(String IN_PREME) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("preme", IN_PREME);

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/refund/usos_sabre/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error").toString();
          // si es error es distinto de cero hay problem 
        return error_msg;

    }

}
