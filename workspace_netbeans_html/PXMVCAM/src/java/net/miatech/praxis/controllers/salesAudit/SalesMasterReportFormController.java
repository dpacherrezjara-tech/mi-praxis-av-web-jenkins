/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.mashape.unirest.http.JsonNode;
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
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.SalesAuditAcceptedLogic;
import net.miatech.praxis.logic.salesAudit.SalesMasterReportFormLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.concurrent.Future;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.async.Callback;
import com.mashape.unirest.http.exceptions.UnirestException;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/SalesMasterReportForm")
public class SalesMasterReportFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesMasterReportFormLogic logic;
    private SalesAuditAcceptedLogic logic2;

    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        List<A1248> lst;
        List<A1248> lst3;
        HashMap map01, map03;
        ArrayList<HashMap<String, String>> lstOperadores = new ArrayList<>();
        ArrayList<HashMap<String, String>> lstCampos2 = new ArrayList<>();
        try {

            logic2 = new SalesAuditAcceptedLogic();
            logic2.setSession(this.serverSession.getServerSession());
            lst = logic2.loadFieldsConditions();
            map01 = new HashMap<>();
            map01.put("USERFIELD", "ALL");
            lstOperadores.add(map01);
            for (int vi = 0; vi < lst.size(); ++vi) {
                map01 = new HashMap<>();
                map01.put("USERFIELD", lst.get(vi).USERFIELD);
                lstOperadores.add(map01);
            }
            lst3 = logic2.loadFields2();
            map03 = new HashMap<>();
            map03.put("DESCRIPT", "ALL");
            lstCampos2.add(map03);
            for (int vi = 0; vi < lst3.size(); ++vi) {
                map03 = new HashMap<>();
                map03.put("DESCRIPT", lst3.get(vi).DESCRIPT);
                lstCampos2.add(map03);
            }

            map.put("lstOperadores", lstOperadores);
            map.put("success", true);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FRMSRIE = request.getParameter("VP_FRMSRIE").trim();
            filter.VP_SEQ = request.getParameter("VP_SEQ").trim();
            filter.VP_SOURCE = request.getParameter("VP_SOURCE").trim();
            filter.VP_CANAL = request.getParameter("VP_CANAL").trim();
            filter.VP_IATA = request.getParameter("VP_IATA").trim();
            filter.VP_IT = request.getParameter("VP_IT").trim();
            filter.VP_FBASIS = request.getParameter("VP_FBASIS").trim();
            filter.VP_CODREASON = request.getParameter("VP_CODREASON").trim();
            filter.VP_TYMEMO = request.getParameter("VP_TYMEMO").trim();
            filter.VP_AUDIT = request.getParameter("VP_AUDIT").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM").trim();
            filter.VP_DATETO = request.getParameter("VP_DATETO").trim();
            filter.VP_TRNCU = request.getParameter("VP_TRNCU").trim();
            filter.VP_STREVISION = request.getParameter("VP_STREVISION").trim();
            filter.VP_TDOC = request.getParameter("VP_TDOC").trim();
            filter.VP_PAIS = request.getParameter("VP_PAIS").trim();
            // filter.ROUTE = request.getParameter("ROUTE").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = -1;
            }

            /*filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int pExcel = Integer.parseInt(filter.pexcel);
           // int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }*/
            logic = new SalesMasterReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1672Filter> lst_search = logic.lst_search(filter);

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
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesMasterReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1672Filter> lst_search = logic.lst_search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report_BwrMasterSalesAudit");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = lst_search.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25, CH_26, CH_27, CH_28, CH_29;
            //<editor-fold defaultstate="collapsed" desc="row">
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
            CH_26 = row.createCell(26);
            CH_27 = row.createCell(27);
            CH_28 = row.createCell(28);
            CH_29 = row.createCell(29);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Source");
            CH_02.setCellValue("Channel");
            CH_03.setCellValue("Country");
            CH_04.setCellValue("IATA");
            CH_05.setCellValue("Name Agency");
            CH_06.setCellValue("Trans.");
            CH_07.setCellValue("Doc. Type");
            CH_08.setCellValue("Issue Date");
            CH_09.setCellValue("Processing Date");
            CH_10.setCellValue("System Date");
            CH_11.setCellValue("Suggested Date");
            CH_12.setCellValue("Itinerary");
            CH_13.setCellValue("Farebasis");
            CH_14.setCellValue("Type");
            CH_15.setCellValue("Currency");
            CH_16.setCellValue("Total Amount Airline");
            CH_17.setCellValue("Total Amount Agent");
            CH_18.setCellValue("Difference");
            CH_19.setCellValue("User");
            CH_20.setCellValue("Audited");
            CH_21.setCellValue("Transfer");
            CH_22.setCellValue("ADM/ACM/NC/NA");
            CH_23.setCellValue("Tour Code");
            CH_24.setCellValue("Status Accepted");
            CH_25.setCellValue("EMD Real");
            CH_26.setCellValue("Agent");
            CH_27.setCellValue("Error Code");
            CH_28.setCellValue("Reason Code");
            CH_29.setCellValue("PNR");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));

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
            CH_26.setCellStyle(headerStyle);
            CH_27.setCellStyle(headerStyle);
            CH_28.setCellStyle(headerStyle);
            CH_29.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
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
                CH_26 = row.createCell(26);
                CH_27 = row.createCell(27);
                CH_28 = row.createCell(28);
                CH_29 = row.createCell(29);

                CH_00.setCellValue(lst_search.get(vi).A1672TICKET);
                CH_01.setCellValue(lst_search.get(vi).A1672FUENT);
                CH_02.setCellValue(lst_search.get(vi).A1672CANAL);
                CH_03.setCellValue(lst_search.get(vi).A1672PAIVT);
                CH_04.setCellValue(lst_search.get(vi).A1672AGENT);
                CH_05.setCellValue(lst_search.get(vi).A1672NAGENCY);
                CH_06.setCellValue(lst_search.get(vi).A1672TRNCU);
                CH_07.setCellValue(lst_search.get(vi).A1672TDOC);
                CH_08.setCellValue(lst_search.get(vi).A1672FVENT);
                CH_09.setCellValue(lst_search.get(vi).A1672FPROC);
                CH_10.setCellValue(lst_search.get(vi).A1672FREGI);
                CH_11.setCellValue(lst_search.get(vi).A1672FREVI);
                CH_12.setCellValue(lst_search.get(vi).A1672ITIN);
                CH_13.setCellValue(lst_search.get(vi).A1672FBASI);
                CH_14.setCellValue(lst_search.get(vi).A1672MEMO);
                CH_15.setCellValue(lst_search.get(vi).A1672CURRENCY);
                CH_16.setCellValue(lst_search.get(vi).A1672TTMIA);
                CH_17.setCellValue(lst_search.get(vi).A1672TTAGT);
                CH_18.setCellValue(lst_search.get(vi).A1672TTDIF);
                CH_19.setCellValue(lst_search.get(vi).A1672REVIS);
                CH_20.setCellValue(lst_search.get(vi).A1672STO0);
                CH_21.setCellValue(lst_search.get(vi).A1672FLADM);
                CH_22.setCellValue(lst_search.get(vi).A1672CHADI);
                CH_23.setCellValue(lst_search.get(vi).A1672CODIT);

                String FLAG = "";
                if (lst_search.get(vi).A2548FLAG.equals("A")) {
                    FLAG = "Approved";
                }
                if (lst_search.get(vi).A2548FLAG.equals("U")) {
                    FLAG = "Cleared Up";
                }
                if (lst_search.get(vi).A2548FLAG.equals("C")) {
                    FLAG = "Condoned";
                }
                if (lst_search.get(vi).A2548FLAG.equals("I")) {
                    FLAG = "Billed GDS";
                }
                if (lst_search.get(vi).A2548FLAG.equals("P")) {
                    FLAG = "Billed";
                }
                if (lst_search.get(vi).A2548FLAG.equals("F")) {
                    FLAG = "Accredited";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Z")) {
                    FLAG = "Authorized";
                }
                if (lst_search.get(vi).A2548FLAG.equals("N")) {
                    FLAG = "Rejected";
                }
                if (lst_search.get(vi).A2548FLAG.equals("R")) {
                    FLAG = "Reaudited";
                }
                if (lst_search.get(vi).A2548FLAG.equals("J")) {
                    FLAG = "Justified";
                }
                if (lst_search.get(vi).A2548FLAG.equals("D")) {
                    FLAG = "Disputed";
                }
                if (lst_search.get(vi).A2548FLAG.equals("E")) {
                    FLAG = "Rejecte Disputed";
                }
                if (lst_search.get(vi).A2548FLAG.equals("W")) {
                    FLAG = "Approve Disputed";
                }
                if (lst_search.get(vi).A2548FLAG.equals("B")) {
                    FLAG = "Acm na BSPlink/MM";
                }
                if (lst_search.get(vi).A2548FLAG.equals("O")) {
                    FLAG = "IATA Disabled";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Q")) {
                    FLAG = "Unregistered Client";
                }
                if (lst_search.get(vi).A2548FLAG.equals("L")) {
                    FLAG = "Acm BSPlink/MM";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Y")) {
                    FLAG = "Pending";
                }
                CH_24.setCellValue(FLAG);
                CH_25.setCellValue(lst_search.get(vi).A1672TKCNX);
                CH_26.setCellValue(lst_search.get(vi).A1672BAGFT);
                CH_27.setCellValue(lst_search.get(vi).A1672ERROR);
                CH_28.setCellValue(lst_search.get(vi).A1672NREASON);
                CH_29.setCellValue(lst_search.get(vi).A1672PNR);

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
                CH_26.setCellStyle(bodyStyle);
                CH_27.setCellStyle(bodyStyle);
                CH_28.setCellStyle(bodyStyle);
                CH_29.setCellStyle(bodyStyle);

                // </editor-fold>
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

            String fileNameDownload = String.format("Report_BwrMasterSalesAudit - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "sendReport")
    public @ResponseBody
    String sendReport(ModelMap map, HttpServletRequest request) {
        String result = "Process error, try again";

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

            String context = "";
            String usr = this.serverSession.getServerSession().getUserView().getUserInfo().USR;
            String pass = this.serverSession.getServerSession().getUserView().getUserInfo().TOKEN;
            /*
         Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
         Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("VP_OPCION", Integer.parseInt(request.getParameter("VP_FILTER")));
            bodyData.put("VP_CIA", request.getParameter("VP_CIA").trim());
            bodyData.put("VP_FRMSRIE", request.getParameter("VP_FRMSRIE").trim());
            bodyData.put("VP_SEQ", request.getParameter("VP_SEQ").trim());
            bodyData.put("VP_SOURCE", request.getParameter("VP_SOURCE").trim());
            bodyData.put("VP_CANAL", request.getParameter("VP_CANAL").trim());
            bodyData.put("VP_IATA", request.getParameter("VP_IATA").trim());
            bodyData.put("VP_IT", request.getParameter("VP_IT").trim());
            bodyData.put("VP_FBASIS", request.getParameter("VP_FBASIS").trim());
            bodyData.put("VP_CODREASON", request.getParameter("VP_CODREASON").trim());
            bodyData.put("VP_TYMEMO", request.getParameter("VP_TYMEMO").trim());
            bodyData.put("VP_AUDIT", request.getParameter("VP_AUDIT").trim());
            bodyData.put("VP_STATUS", request.getParameter("VP_STATUS").trim());
            bodyData.put("VP_DATEFROM", request.getParameter("VP_DATEFROM").trim());
            bodyData.put("VP_DATETO", request.getParameter("VP_DATETO").trim());
            bodyData.put("VP_TRNCU", request.getParameter("VP_TRNCU").trim());
            bodyData.put("VP_STREVISION", request.getParameter("VP_STREVISION").trim());
            bodyData.put("VP_TDOC", request.getParameter("VP_TDOC").trim());
            bodyData.put("VP_PAIS", request.getParameter("VP_PAIS").trim());
            bodyData.put("to_emails", request.getParameter("CorreoPri").trim());
            bodyData.put("cc_emails", request.getParameter("CorreoCopi").trim());
            bodyData.put("domain", context);
            bodyData.put("IN_USER", usr);
            bodyData.put("IN_PWD", pass);

            Future<HttpResponse<JsonNode>> future = Unirest.post(urlREST + "/api/salesaudit/export_data_txt/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJsonAsync(new Callback<JsonNode>() {

                        public void failed(UnirestException e) {
                            System.out.println("The request has failed");
                        }

                        public void completed(HttpResponse<JsonNode> response) {
                            int code = response.getStatus();
                            System.out.println("==>" + code);
                        }

                        public void cancelled() {
                            System.out.println("The request has been cancelled");
                        }

                    });

            String error_code = "0";
            result = "The request was sent to the indicated email";

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String upload_s3(HttpServletRequest request) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String context = "";
        String usr = this.serverSession.getServerSession().getUserView().getUserInfo().USR;
        String pass = this.serverSession.getServerSession().getUserView().getUserInfo().TOKEN;
        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);

        /*
         Preparando parámetros para enviar por body
         */
        HashMap bodyData = new HashMap<>();
        bodyData.put("VP_OPCION", Integer.parseInt(request.getParameter("VP_FILTER")));
        bodyData.put("VP_CIA", request.getParameter("VP_CIA").trim());
        bodyData.put("VP_FRMSRIE", request.getParameter("VP_FRMSRIE").trim());
        bodyData.put("VP_SEQ", request.getParameter("VP_SEQ").trim());
        bodyData.put("VP_SOURCE", request.getParameter("VP_SOURCE").trim());
        bodyData.put("VP_CANAL", request.getParameter("VP_CANAL").trim());
        bodyData.put("VP_IATA", request.getParameter("VP_IATA").trim());
        bodyData.put("VP_IT", request.getParameter("VP_IT").trim());
        bodyData.put("VP_FBASIS", request.getParameter("VP_FBASIS").trim());
        bodyData.put("VP_CODREASON", request.getParameter("VP_CODREASON").trim());
        bodyData.put("VP_TYMEMO", request.getParameter("VP_TYMEMO").trim());
        bodyData.put("VP_AUDIT", request.getParameter("VP_AUDIT").trim());
        bodyData.put("VP_STATUS", request.getParameter("VP_STATUS").trim());
        bodyData.put("VP_DATEFROM", request.getParameter("VP_DATEFROM").trim());
        bodyData.put("VP_DATETO", request.getParameter("VP_DATETO").trim());
        bodyData.put("VP_TRNCU", request.getParameter("VP_TRNCU").trim());
        bodyData.put("VP_STREVISION", request.getParameter("VP_STREVISION").trim());
        bodyData.put("VP_TDOC", request.getParameter("VP_TDOC").trim());
        bodyData.put("VP_PAIS", request.getParameter("VP_PAIS").trim());
        bodyData.put("to_emails", request.getParameter("CorreoPri").trim());
        bodyData.put("cc_emails", request.getParameter("CorreoCopi").trim());
        bodyData.put("domain", context);
        bodyData.put("IN_USER", usr);
        bodyData.put("IN_PWD", pass);

        Future<HttpResponse<JsonNode>> future = Unirest.post(urlREST + "/api/salesaudit/export_data_txt/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJsonAsync(new Callback<JsonNode>() {

                    public void failed(UnirestException e) {
                        System.out.println("The request has failed");
                    }

                    public void completed(HttpResponse<JsonNode> response) {
                        int code = response.getStatus();
                        System.out.println("==>" + code);
                    }

                    public void cancelled() {
                        System.out.println("The request has been cancelled");
                    }

                });

        String error_code = "0";
        String error_msg = "Process Successful";

        return error_msg;

    }

}
