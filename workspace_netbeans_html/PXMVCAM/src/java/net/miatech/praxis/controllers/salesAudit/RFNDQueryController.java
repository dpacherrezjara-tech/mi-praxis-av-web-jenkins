/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
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
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3652Filter;
import net.miatech.beans.SaleAudit.A3653Filter;
import net.miatech.beans.SaleAudit.A3656Filter;
import net.miatech.beans.SaleAudit.A3669Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RFNDQueryLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.json.JSONException;
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
@RequestMapping("/RFNDQuery")
public class RFNDQueryController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDQueryLogic logic;

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3647Filter> lst;
        A3647Filter filter = new A3647Filter();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_TICKET = request.getParameter("IN_TICKET").trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();
            filter.IN_FLAG = request.getParameter("IN_FLAG").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUSBPO").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_FOLIO = request.getParameter("IN_FOLIO").trim();

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

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3647Filter filter = new A3647Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3647Filter> listaData = logic.SearchReportQueryRFND(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Resumen RFND");
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
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16;
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

            CH_00.setCellValue("Folio");
            CH_01.setCellValue("System date");
            CH_02.setCellValue("Auditor");
            CH_03.setCellValue("Zone");
            CH_04.setCellValue("Ticket Qty Pend");
            CH_05.setCellValue("Ticket Qty Auto Yes");
            CH_06.setCellValue("Ticket Qty Auto Not");
            CH_07.setCellValue("Ticket Qty Reje");
            CH_08.setCellValue("Total");
            CH_09.setCellValue("Change of status Send");
            CH_10.setCellValue("Change of status Retu.");
            CH_11.setCellValue("Total");
            CH_12.setCellValue("Ticket BPO Qty OK");
            CH_13.setCellValue("Ticket BPO Qty Error");
            CH_14.setCellValue("total BPO");
            CH_15.setCellValue("Ticket Amount");
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

                CH_00.setCellValue(listaData.get(vi).A3647FOLIO);
                CH_01.setCellValue(listaData.get(vi).A3647FREGI);
                CH_02.setCellValue(listaData.get(vi).A3647REGAS);
                CH_03.setCellValue(listaData.get(vi).A3647COCD);
                CH_04.setCellValue(listaData.get(vi).CANTPE);
                CH_05.setCellValue(listaData.get(vi).CANTOK);
                CH_06.setCellValue(listaData.get(vi).CANTNK);
                CH_07.setCellValue(listaData.get(vi).CANTKO);
                CH_08.setCellValue(listaData.get(vi).TOTALCANT);

                CH_09.setCellValue(listaData.get(vi).STOEN);
                CH_10.setCellValue(listaData.get(vi).STORET);
                CH_11.setCellValue(listaData.get(vi).TOTALSTO);

                CH_12.setCellValue(listaData.get(vi).BPOOK);
                CH_13.setCellValue(listaData.get(vi).BPOKO);
                CH_14.setCellValue(listaData.get(vi).TOTALBPO);
                CH_15.setCellValue(listaData.get(vi).SUMAOK);
                CH_16.setCellValue(listaData.get(vi).A3647DIAS);

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

            String fileNameDownload = String.format("Resumen RFND - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSX2")
    public @ResponseBody
    void getXLSX2(HttpServletRequest request, HttpServletResponse response) {
        A3648Filter filter = new A3648Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3648Filter> listaData = logic.searchDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Detalle RFND");
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
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22;
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

            CH_00.setCellValue("System Date");
            CH_01.setCellValue("Issue Date");
            CH_02.setCellValue("Zone");
            CH_03.setCellValue("Area");
            CH_04.setCellValue("Ticket");
            CH_05.setCellValue("CPN");
            CH_06.setCellValue("Country");
            CH_07.setCellValue("IATA");
            CH_08.setCellValue("Agency");
            CH_09.setCellValue("Transction");
            CH_10.setCellValue("Tdoc");
            CH_11.setCellValue("Currency");
            CH_12.setCellValue("Fare");
            CH_13.setCellValue("Tax");
            CH_14.setCellValue("Commi.");
            CH_15.setCellValue("Neto RFND");
            CH_16.setCellValue("Neto Praxis");
            CH_17.setCellValue("Neto XML");
            CH_18.setCellValue("Status");
            CH_19.setCellValue("BPO");
            CH_20.setCellValue("Group");
            CH_21.setCellValue("Req. Reason");
            CH_22.setCellValue("Remarks");

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

                CH_00.setCellValue(listaData.get(vi).A3648FREGI);
                CH_01.setCellValue(listaData.get(vi).A3648XFSAL);
                CH_02.setCellValue(listaData.get(vi).A3648COCD);
                CH_03.setCellValue(listaData.get(vi).A3648ARCD);
                CH_04.setCellValue(listaData.get(vi).A3648TICKET);
                CH_05.setCellValue(listaData.get(vi).A3648CPN);
                CH_06.setCellValue(listaData.get(vi).A3648SPVTA);
                CH_07.setCellValue(listaData.get(vi).A3648SIATA);
                CH_08.setCellValue(listaData.get(vi).A3648AGENCY);
                CH_09.setCellValue(listaData.get(vi).A3648STRCU);
                CH_10.setCellValue(listaData.get(vi).A3648STDOC);
                CH_11.setCellValue(listaData.get(vi).A3648MDA);
                CH_12.setCellValue(listaData.get(vi).A3648TARID);
                CH_13.setCellValue(listaData.get(vi).A3648TTAXD);
                CH_14.setCellValue(listaData.get(vi).A3648COMID);
                CH_15.setCellValue(listaData.get(vi).A3648TOTAD);
                CH_16.setCellValue(listaData.get(vi).A3648STOTL);
                CH_17.setCellValue(listaData.get(vi).A3648XTOTL);

                String vl_A4076FLAG = "";
                switch (listaData.get(vi).A3648FLAG) {
                    case "E":
                        vl_A4076FLAG = "ERROR PROCESS";
                        break;
                    case "A":
                        vl_A4076FLAG = "IN PROCESS";
                        break;
                    case "R":
                        vl_A4076FLAG = "REJECTED";
                        break;
                    case "F":
                        vl_A4076FLAG = "AUTHORISED";
                        break;
                    case "Y":
                        vl_A4076FLAG = "PENDING";
                        break;
                }
                CH_18.setCellValue(vl_A4076FLAG);
                CH_19.setCellValue(listaData.get(vi).A3648STATO);
                CH_20.setCellValue(listaData.get(vi).A3648GRUPO);
                CH_21.setCellValue(listaData.get(vi).A3648ERROR);
                CH_22.setCellValue(listaData.get(vi).A3648RAAG);

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
            //sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);

            String fileNameDownload = String.format("Detalle RFND - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        A3648Filter filter = new A3648Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3648Filter> lst_search = logic.searchDetail(filter);

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

    @RequestMapping(value = "SearchQueryRFNDetail")
    public @ResponseBody
    String SearchQueryRFNDetail(ModelMap map, HttpServletRequest request) {
        A3647Filter lst;
        A3647Filter filter = new A3647Filter();

        HashMap map01, map02;
        ArrayList<HashMap<String, String>> lst_DOCUMENTS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        ArrayList<HashMap<String, String>> lsta_TAXESAGEN = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_TAXESAM = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_Card = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_COUPNS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_HISTORY = new ArrayList<>();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();

            lst = logic.SearchQueryRFNDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3649CCUST", lst.lst_RAZON.get(vi).A3649CCUST);
                map01.put("A3649PREME", lst.lst_RAZON.get(vi).A3649PREME);
                map01.put("A3649CORRL", lst.lst_RAZON.get(vi).A3649CORRL);
                map01.put("A3649FLAG", lst.lst_RAZON.get(vi).A3649FLAG);
                map01.put("A3649TYPE", lst.lst_RAZON.get(vi).A3649TYPE);
                map01.put("A3649BASE", lst.lst_RAZON.get(vi).A3649BASE);
                map01.put("A3649CODE", lst.lst_RAZON.get(vi).A3649CODE);

                map01.put("A3649ERROR", lst.lst_RAZON.get(vi).A3649ERROR);
                map01.put("A3649ARCHI", lst.lst_RAZON.get(vi).A3649ARCHI);
                map01.put("A3649REGRQ", lst.lst_RAZON.get(vi).A3649REGRQ);
                map01.put("A3649FRERQ", lst.lst_RAZON.get(vi).A3649FRERQ);
                map01.put("A3649REGIS", lst.lst_RAZON.get(vi).A3649REGIS);
                map01.put("A3649FREGI", lst.lst_RAZON.get(vi).A3649FREGI);
                map01.put("A3649HREGI", lst.lst_RAZON.get(vi).A3649HREGI);

                lst_RAZON.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < lst.lst_DOCUMENTS.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A3648CCUST", lst.lst_DOCUMENTS.get(vi).A3648CCUST);
                lst_DOCUMENTS.add(map02);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_DOCUMENTS", lst_DOCUMENTS);
        map.put("lst_RAZON", lst_RAZON);

        map.put("lsta_TAXESAGEN", lsta_TAXESAGEN);
        map.put("lsta_TAXESAM", lsta_TAXESAM);
        map.put("lsta_Card", lsta_Card);
        map.put("lsta_COUPNS", lsta_COUPNS);
        map.put("lsta_HISTORY", lsta_HISTORY);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaMantenimiento")
    public @ResponseBody
    String ProcesaMantenimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";
        String mensaje = "Error de Emisión";
        A3647Filter filter = new A3647Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            if (!"".equals(mensaje)) {
                result2 = rfndestatuspagina(filter, mensaje);
            }
            RFNDQueryLogic logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaMantenimiento(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaUpdateUsosCPN")
    public @ResponseBody
    String ProcesaUpdateUsosCPN(ModelMap map, HttpServletRequest request) {
        A3647Filter lst;
        A3647Filter filter = new A3647Filter();
        boolean success = true;
        HashMap map03;
        ArrayList<HashMap<String, String>> lsta_usos = new ArrayList<>();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_CORRL = request.getParameter("IN_CORRL").trim();

            success = this.rfndnotifiUpdateCPN(filter);
            if (success) {
                lst = logic.ProcesaUpdateUsosCPN(filter);
                // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_COUPNS">
                for (int vi = 0; vi < lst.lst_USOS.size(); ++vi) {
                    map03 = new HashMap<>();

                    map03.put("A3660CCUST", lst.lst_USOS.get(vi).A3660CCUST);
                    map03.put("A3660PREME", lst.lst_USOS.get(vi).A3660PREME);
                    map03.put("A3660ANIO", lst.lst_USOS.get(vi).A3660ANIO);
                    map03.put("A3660CIA", lst.lst_USOS.get(vi).A3660CIA);
                    map03.put("A3660FORMA", lst.lst_USOS.get(vi).A3660FORMA);
                    map03.put("A3660SERIE", lst.lst_USOS.get(vi).A3660SERIE);
                    map03.put("A3660SEQ", lst.lst_USOS.get(vi).A3660SEQ);
                    map03.put("A3660CORRL", lst.lst_USOS.get(vi).A3660CORRL);
                    map03.put("A3660TICKT", lst.lst_USOS.get(vi).A3660TICKT);
                    map03.put("A3660CPN", lst.lst_USOS.get(vi).A3660CPN);
                    map03.put("A3660FCAMB", lst.lst_USOS.get(vi).A3660FCAMB);
                    map03.put("A3660HCAMB", lst.lst_USOS.get(vi).A3660HCAMB);
                    map03.put("A3660CODE", lst.lst_USOS.get(vi).A3660CODE);
                    map03.put("A3660STINI", lst.lst_USOS.get(vi).A3660STINI);
                    map03.put("A3660STFIN", lst.lst_USOS.get(vi).A3660STFIN);
                    map03.put("A3660FLAG", lst.lst_USOS.get(vi).A3660FLAG);
                    map03.put("A3660REGIS", lst.lst_USOS.get(vi).A3660REGIS);
                    map03.put("A3660FREGI", lst.lst_USOS.get(vi).A3660FREGI);
                    map03.put("A3660HREGI", lst.lst_USOS.get(vi).A3660HREGI);

                    lsta_usos.add(map03);
                }
                // </editor-fold>
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lsta_USOS", lsta_usos);

        return new Gson().toJson(map);
    }

    public String rfndestatuspagina(A3647Filter beanGene, String Razones) {
        String mensaje = "";
        String flag = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFND").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String req_preme = beanGene.IN_PREME;
            String req_statu = "A";
            String drq_descrip = Razones;
            String drq_flag = "A";
            String drq_base = "PR";
            String req_email = beanGene.A3647EMAIL;
            String req_message = "La solicitud esta volviendo a revizar y se enceuntra en el estado de <b>PENDING</b> con el folio" + beanGene.A3647FOLIO + "<br/>"
                    + "Con tu folio y tu correo podras verificar en que stautus se encuentra tu reembolso. ";
            //IN_DOCUMENT = "2522497772";

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData1 = new HashMap<>();
            bodyData1.put("username", "api_miatech@miatech.net");
            bodyData1.put("password", "BWW^X0vA2Mhy");

            HttpResponse<JsonNode> response1 = Unirest.post(urlREST + "/api/login/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData1))
                    .asJson();

            token = response1.getBody().getObject().get("token").toString();

            HashMap bodyData = new HashMap<>();
            bodyData.put("req_ccust", "139");
            bodyData.put("req_preme", req_preme);
            bodyData.put("req_statu", req_statu);
            //bodyData.put("drq_codi", drq_codi);
            bodyData.put("drq_descrip", drq_descrip);
            bodyData.put("drq_flag", drq_flag);
            bodyData.put("drq_base", drq_base);
            bodyData.put("req_email", req_email);
            bodyData.put("req_message", req_message);

            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/refund/direct/status/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());
            mensaje = response.getBody().getObject().get("msg").toString();

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return mensaje;
    }

    public boolean rfndnotifiUpdateCPN(A3647Filter beanGene) {
        String mensaje = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFND").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("ticket", beanGene.IN_CIA + "" + beanGene.IN_FORMA + "" + beanGene.IN_SERIE);
            bodyData.put("correlativo", beanGene.IN_CORRL);
            bodyData.put("prememo", beanGene.IN_PREME);
            bodyData.put("anio", beanGene.IN_ANIO);
            bodyData.put("secuencia", beanGene.IN_SEQ);
            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/praxis/usos-sabre")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return success;
    }

    public String rfndnotifipagina(A3648Filter beanGene) {
        String mensaje = "";
        String flag = "";
        String token = "";
        boolean success = true;
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFND").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("preme", beanGene.IN_PREME);
            bodyData.put("anio", beanGene.IN_ANIO);
            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/praxis/manual-response")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());

        } catch (SQLException e) {
            mensaje = e.getMessage();
        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return mensaje;
    }

    @RequestMapping(value = "ProcesaManualRFNDTCKT")
    public @ResponseBody
    String ProcesaManualRFNDTCKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";
        String razones = "";
        String taxes = "";
        String fop = "";
        boolean iboolean;
        A3648Filter filter = new A3648Filter();
        ArrayList<A3656Filter> gridDataRazones = new ArrayList<A3656Filter>();
        ArrayList<A3652Filter> gridDataTaxes = new ArrayList<A3652Filter>();
        ArrayList<A3653Filter> gridDataFop = new ArrayList<A3653Filter>();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            if (filter.IN_STATUS.equals("F")) {
                // Obtain Array
                JsonArray gsonTaxes = parser.parse(request.getParameter("beanlstTaxes")).getAsJsonArray();
                JsonArray gsonFop = parser.parse(request.getParameter("beanlstlstFop")).getAsJsonArray();
                //LISTA DE TAXES
                for (JsonElement obj : gsonTaxes) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    taxes = taxes + "|" + gsonObj.get("A3652PREME").getAsString() + "$" + gsonObj.get("A3652ANIO").getAsString() + "$" + gsonObj.get("A3652CDTAX").getAsString() + "$" + gsonObj.get("A3652CORRL").getAsString() + "$" + gsonObj.get("A3652APFC").getAsString() + "$" + gsonObj.get("A3652MONED").getAsString() + "$" + gsonObj.get("A3652TXDIF").getAsDouble();
                }

                //LISTA DE FOP 
                for (JsonElement obj : gsonFop) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    fop += fop + "|" + gsonObj.get("A3653PREME").getAsString() + "$" + gsonObj.get("A3653ANIO").getAsString() + "$" + gsonObj.get("A3653CORRL").getAsString() + "$" + gsonObj.get("A3653CFOP").getAsString() + "$" + gsonObj.get("A3653TYCAR").getAsString() + "$" + gsonObj.get("A3653NTARJ").getAsString() + "$" + gsonObj.get("A3653FEXP").getAsString() + "$" + gsonObj.get("A3653CAPL").getAsString() + "$" + gsonObj.get("A3653TYPE").getAsString() + "$" + gsonObj.get("A3653TOTAL").getAsDouble();
                }
            }
            // Obtain Array
            JsonArray gsonRazo = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();

            //LISTA DE TKT
            for (JsonElement obj : gsonRazo) {
                JsonObject gsonObj = obj.getAsJsonObject();
                razones += razones + "|" + gsonObj.get("A3649CODE").getAsString() + "$" + gsonObj.get("A3649ERROR").getAsString() + "$" + gsonObj.get("A3649TYPE").getAsString() + "$" + gsonObj.get("A3649CORRL").getAsString() + "$" + gsonObj.get("A3649PREME").getAsString() + "$" + gsonObj.get("A3649ANIO").getAsString() + "$" + gsonObj.get("A3649FAMIL").getAsString();
            }

            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualRFNDTCKT(filter, taxes, razones, fop);
            if (result.equals("Proceso Culminado")) {
                result2 = this.rfndnotifipagina(filter);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchQueryRFNDetailTCKT")
    public @ResponseBody
    String SearchQueryRFNDetailTCKT(ModelMap map, HttpServletRequest request) {
        A3647Filter lst;
        A3647Filter filter = new A3647Filter();

        HashMap map01, map02, map03, map04, map05, map06, map07;
        ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        ArrayList<HashMap<String, String>> lsta_TAXESAM = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_Card = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_COUPNS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_HISTORY = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_USOS = new ArrayList<>();
        ArrayList<HashMap<String, String>> lsta_DOCUMENTS = new ArrayList<>();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_CORRL = request.getParameter("IN_CORRL").trim();

            lst = logic.SearchQueryRFNDetailTCKT(filter);
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXES">
            for (int vi = 0; vi < lst.lst_TAXESAGEN.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3652CCUST", lst.lst_TAXESAGEN.get(vi).A3652CCUST);
                map01.put("A3652CIA", lst.lst_TAXESAGEN.get(vi).A3652CIA);
                map01.put("A3652FORMA", lst.lst_TAXESAGEN.get(vi).A3652FORMA);
                map01.put("A3652SERIE", lst.lst_TAXESAGEN.get(vi).A3652SERIE);
                map01.put("A3652SEQ", lst.lst_TAXESAGEN.get(vi).A3652SEQ);
                map01.put("A3652CORRL", lst.lst_TAXESAGEN.get(vi).A3652CORRL);
                map01.put("A3652CDTAX", lst.lst_TAXESAGEN.get(vi).A3652CDTAX);
                map01.put("A3652MONED", lst.lst_TAXESAGEN.get(vi).A3652MONED);
                map01.put("A3652PAIS", lst.lst_TAXESAGEN.get(vi).A3652PAIS);
                map01.put("A3652TPTAX", lst.lst_TAXESAGEN.get(vi).A3652TPTAX);
                map01.put("A3652CTRL", lst.lst_TAXESAGEN.get(vi).A3652CTRL);
                map01.put("A3652APFC", lst.lst_TAXESAGEN.get(vi).A3652APFC);
                map01.put("A3652STAT", lst.lst_TAXESAGEN.get(vi).A3652STAT);
                map01.put("A3652ERROR", lst.lst_TAXESAGEN.get(vi).A3652ERROR);
                map01.put("A3652PREME", lst.lst_TAXESAGEN.get(vi).A3652PREME);
                map01.put("A3652ANIO", lst.lst_TAXESAGEN.get(vi).A3652ANIO);
                map01.put("A3652TYPE", lst.lst_TAXESAGEN.get(vi).A3652TYPE);
                map01.put("A3652TXMIA", lst.lst_TAXESAGEN.get(vi).A3652TXMIA);
                map01.put("A3652TXDIF", lst.lst_TAXESAGEN.get(vi).A3652TXDIF);
                lsta_TAXESAM.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_Card">
            for (int vi = 0; vi < lst.lst_Card.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A3653CCUST", lst.lst_Card.get(vi).A3653CCUST);
                map02.put("A3653CIA", lst.lst_Card.get(vi).A3653CIA);
                map02.put("A3653FORMA", lst.lst_Card.get(vi).A3653FORMA);
                map02.put("A3653SERIE", lst.lst_Card.get(vi).A3653SERIE);
                map02.put("A3653SEQ", lst.lst_Card.get(vi).A3653SEQ);
                map02.put("A3653CFOP", lst.lst_Card.get(vi).A3653CFOP);
                map02.put("A3653TYCAR", lst.lst_Card.get(vi).A3653TYCAR);
                map02.put("A3653CUR", lst.lst_Card.get(vi).A3653CUR);
                map02.put("A3653NTARJ", lst.lst_Card.get(vi).A3653NTARJ);
                map02.put("A3653FEXP", lst.lst_Card.get(vi).A3653FEXP);
                map02.put("A3653CAPL", lst.lst_Card.get(vi).A3653CAPL);
                map02.put("A3653PREME", lst.lst_Card.get(vi).A3653PREME);
                map02.put("A3653ANIO", lst.lst_Card.get(vi).A3653ANIO);
                map02.put("A3653CORRL", lst.lst_Card.get(vi).A3653CORRL);
                map02.put("A3653TYPE", lst.lst_Card.get(vi).A3653TYPE);
                map02.put("A3653MONTO", lst.lst_Card.get(vi).A3653MONTO);
                map02.put("A3653MONTE", lst.lst_Card.get(vi).A3653MONTE);
                map02.put("A3653TOTAL", lst.lst_Card.get(vi).A3653TOTAL);

                lsta_Card.add(map02);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_COUPNS">
            for (int vi = 0; vi < lst.LIS_COUPNS.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A3654CCUST", lst.LIS_COUPNS.get(vi).A3654CCUST);
                map03.put("A3648CIA", lst.LIS_COUPNS.get(vi).A3648CIA);
                map03.put("A3648FORMA", lst.LIS_COUPNS.get(vi).A3648FORMA);
                map03.put("A3648SERIE", lst.LIS_COUPNS.get(vi).A3648SERIE);
                map03.put("A3648SEQ", lst.LIS_COUPNS.get(vi).A3648SEQ);
                map03.put("A3654CPN", lst.LIS_COUPNS.get(vi).A3654CPN);
                map03.put("A3654MARKE", lst.LIS_COUPNS.get(vi).A3654MARKE);
                map03.put("A3654NFLGH", lst.LIS_COUPNS.get(vi).A3654NFLGH);
                map03.put("A3654CLAS", lst.LIS_COUPNS.get(vi).A3654CLAS);
                map03.put("A3654FBASI", lst.LIS_COUPNS.get(vi).A3654FBASI);
                map03.put("A3654ORIGE", lst.LIS_COUPNS.get(vi).A3654ORIGE);
                map03.put("A3654FORIG", lst.LIS_COUPNS.get(vi).A3654FORIG);
                map03.put("A3654HORIG", lst.LIS_COUPNS.get(vi).A3654HORIG);
                map03.put("A3654DESTI", lst.LIS_COUPNS.get(vi).A3654DESTI);
                map03.put("A3654FDEST", lst.LIS_COUPNS.get(vi).A3654FDEST);
                map03.put("A3654HDEST", lst.LIS_COUPNS.get(vi).A3654HDEST);
                map03.put("A3654BOOKI", lst.LIS_COUPNS.get(vi).A3654BOOKI);
                map03.put("A3654CURS1", lst.LIS_COUPNS.get(vi).A3654CURS1);
                map03.put("A3654CURS2", lst.LIS_COUPNS.get(vi).A3654CURS2);
                map03.put("A3654CURS3", lst.LIS_COUPNS.get(vi).A3654CURS3);
                map03.put("A3654CURS4", lst.LIS_COUPNS.get(vi).A3654CURS4);
                map03.put("A3654PROVI", lst.LIS_COUPNS.get(vi).A3654PROVI);
                map03.put("A3654BAGAL", lst.LIS_COUPNS.get(vi).A3654BAGAL);
                map03.put("A3654STOP", lst.LIS_COUPNS.get(vi).A3654STOP);
                map03.put("A3654USE1", lst.LIS_COUPNS.get(vi).A3654USE1);
                map03.put("A3654USE2", lst.LIS_COUPNS.get(vi).A3654USE2);
                map03.put("A3654USE3", lst.LIS_COUPNS.get(vi).A3654USE3);
                map03.put("A3654MONTO", lst.LIS_COUPNS.get(vi).A3654MONTO);
                map03.put("A3654FAREC", lst.LIS_COUPNS.get(vi).A3654FAREC);
                map03.put("A3654DESIG", lst.LIS_COUPNS.get(vi).A3654DESIG);
                map03.put("A3654PREME", lst.LIS_COUPNS.get(vi).A3654PREME);
                map03.put("A3654ANIO", lst.LIS_COUPNS.get(vi).A3654ANIO);
                map03.put("A3654CORRL", lst.LIS_COUPNS.get(vi).A3654CORRL);
                map03.put("A3654TYPE", lst.LIS_COUPNS.get(vi).A3654TYPE);
                map03.put("A3654FLAG", lst.LIS_COUPNS.get(vi).A3654FLAG);

                lsta_COUPNS.add(map03);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> LIS_HISTORY">
            for (int vi = 0; vi < lst.LIS_HISTORY.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A3655CCUST", lst.LIS_HISTORY.get(vi).A3655CCUST);
                map04.put("A3655CIA", lst.LIS_HISTORY.get(vi).A3655CIA);
                map04.put("A3655FORMA", lst.LIS_HISTORY.get(vi).A3655FORMA);
                map04.put("A3655SERIE", lst.LIS_HISTORY.get(vi).A3655SERIE);
                map04.put("A3655SEQ", lst.LIS_HISTORY.get(vi).A3655SEQ);
                map04.put("A3655CPN", lst.LIS_HISTORY.get(vi).A3655CPN);
                map04.put("A3655PROVI", lst.LIS_HISTORY.get(vi).A3655PROVI);
                map04.put("A3655WORKL", lst.LIS_HISTORY.get(vi).A3655WORKL);
                map04.put("A3655HOMEL", lst.LIS_HISTORY.get(vi).A3655HOMEL);
                map04.put("A3655DATE", lst.LIS_HISTORY.get(vi).A3655DATE);

                map04.put("A3655HDAT1", lst.LIS_HISTORY.get(vi).A3655HDAT1);
                map04.put("A3655INPUT", lst.LIS_HISTORY.get(vi).A3655INPUT);
                map04.put("A3655SUPPO", lst.LIS_HISTORY.get(vi).A3655SUPPO);
                map04.put("A3655OLDRE", lst.LIS_HISTORY.get(vi).A3655OLDRE);
                map04.put("A3655PURGE", lst.LIS_HISTORY.get(vi).A3655PURGE);
                map04.put("A3655STATU", lst.LIS_HISTORY.get(vi).A3655STATU);
                map04.put("A3655CHIST", lst.LIS_HISTORY.get(vi).A3655CHIST);
                map04.put("A3655PREME", lst.LIS_HISTORY.get(vi).A3655PREME);
                map04.put("A3655CORRL", lst.LIS_HISTORY.get(vi).A3655CORRL);
                map04.put("A3655TYPE", lst.LIS_HISTORY.get(vi).A3655TYPE);
                map04.put("A3655REGIS", lst.LIS_HISTORY.get(vi).A3655REGIS);
                map04.put("A3655FREGI", lst.LIS_HISTORY.get(vi).A3655FREGI);
                map04.put("A3655HREGI", lst.LIS_HISTORY.get(vi).A3655HREGI);

                lsta_HISTORY.add(map04);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RAZON">
            for (int vi = 0; vi < lst.lst_RAZON.size(); ++vi) {
                map05 = new HashMap<>();

                map05.put("A3649CCUST", lst.lst_RAZON.get(vi).A3649CCUST);
                map05.put("A3649PREME", lst.lst_RAZON.get(vi).A3649PREME);
                map05.put("A3649CORRL", lst.lst_RAZON.get(vi).A3649CORRL);
                map05.put("A3649TYPE", lst.lst_RAZON.get(vi).A3649TYPE);
                map05.put("A3649BASE", lst.lst_RAZON.get(vi).A3649BASE);
                map05.put("A3649FAMIL", lst.lst_RAZON.get(vi).A3649FAMIL);
                map05.put("A3649CODE", lst.lst_RAZON.get(vi).A3649CODE);
                map05.put("A3649ANIO", lst.lst_RAZON.get(vi).A3649ANIO);
                map05.put("A3649ERROR", lst.lst_RAZON.get(vi).A3649ERROR);
                map05.put("A3649REGIS", lst.lst_RAZON.get(vi).A3649REGIS);
                map05.put("A3649FREGI", lst.lst_RAZON.get(vi).A3649FREGI);
                map05.put("A3649HREGI", lst.lst_RAZON.get(vi).A3649HREGI);
                map05.put("A3659CIA", lst.lst_RAZON.get(vi).A3659CIA);
                map05.put("A3659FORMA", lst.lst_RAZON.get(vi).A3659FORMA);
                map05.put("A3659SERIE", lst.lst_RAZON.get(vi).A3659SERIE);
                map05.put("A3659SEQ", lst.lst_RAZON.get(vi).A3659SEQ);

                lst_RAZON.add(map05);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lsta_USOS">
            for (int vi = 0; vi < lst.lst_USOS.size(); ++vi) {
                map06 = new HashMap<>();

                map06.put("A3660CCUST", lst.lst_USOS.get(vi).A3660CCUST);
                map06.put("A3660PREME", lst.lst_USOS.get(vi).A3660PREME);
                map06.put("A3660ANIO", lst.lst_USOS.get(vi).A3660ANIO);
                map06.put("A3660CIA", lst.lst_USOS.get(vi).A3660CIA);
                map06.put("A3660FORMA", lst.lst_USOS.get(vi).A3660FORMA);
                map06.put("A3660SERIE", lst.lst_USOS.get(vi).A3660SERIE);
                map06.put("A3660SEQ", lst.lst_USOS.get(vi).A3660SEQ);
                map06.put("A3660CORRL", lst.lst_USOS.get(vi).A3660CORRL);
                map06.put("A3660TICKT", lst.lst_USOS.get(vi).A3660TICKT);
                map06.put("A3660CPN", lst.lst_USOS.get(vi).A3660CPN);
                map06.put("A3660FCAMB", lst.lst_USOS.get(vi).A3660FCAMB);
                map06.put("A3660HCAMB", lst.lst_USOS.get(vi).A3660HCAMB);
                map06.put("A3660CODE", lst.lst_USOS.get(vi).A3660CODE);
                map06.put("A3660STINI", lst.lst_USOS.get(vi).A3660STINI);
                map06.put("A3660STFIN", lst.lst_USOS.get(vi).A3660STFIN);
                map06.put("A3660FLAG", lst.lst_USOS.get(vi).A3660FLAG);
                map06.put("A3660REGIS", lst.lst_USOS.get(vi).A3660REGIS);
                map06.put("A3660FREGI", lst.lst_USOS.get(vi).A3660FREGI);
                map06.put("A3660HREGI", lst.lst_USOS.get(vi).A3660HREGI);
                lsta_USOS.add(map06);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < lst.lst_DOCUMENTS.size(); ++vi) {
                map07 = new HashMap<>();

                map07.put("A3648CCUST", lst.lst_DOCUMENTS.get(vi).A3648CCUST);
                lsta_DOCUMENTS.add(map07);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_RAZON", lst_RAZON);
        map.put("lsta_TAXESAM", lsta_TAXESAM);
        map.put("lsta_USOS", lsta_USOS);
        map.put("lsta_Card", lsta_Card);
        map.put("lsta_COUPNS", lsta_COUPNS);
        map.put("lsta_HISTORY", lsta_HISTORY);
        map.put("lsta_DOCUMENTS", lsta_DOCUMENTS);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaDeleteTAXManual")
    public @ResponseBody
    String ProcesaDeleteTAXManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        A3652Filter filter = new A3652Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaDeleteTAXManual(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchDetailError")
    public @ResponseBody
    String SearchDetailError(ModelMap map, HttpServletRequest request) {
        List<A3669Filter> lst;
        A3669Filter filter = new A3669Filter();

        try {
            logic = new RFNDQueryLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_CORRL = request.getParameter("IN_CORRL").trim();

            lst = logic.SearchDetailError(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lst_Error", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "GetFilesDirectory")
    public @ResponseBody
    String GetFilesDirectory(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {
        System.out.println("Conexión AWS...");

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String IN_OPTION = request.getParameter("IN_OPTION").trim();
        String IN_PATH = path_config + "\\IMGTMPRFND\\";
        String IN_ANIO = request.getParameter("IN_ANIO").trim();
        String IN_PREME = request.getParameter("IN_PREME").trim();

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
        bodyData.put("IN_ANIO", IN_ANIO);
        bodyData.put("IN_PREME", IN_PREME);
//bsplink/download/rfnd/rfndirect/
        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/rfnd/rfndirect/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String body = response.getBody().getObject().get("data").toString();

        map.put("success", true);
        map.put("data", body);

        return new Gson().toJson(map);
    }

}
