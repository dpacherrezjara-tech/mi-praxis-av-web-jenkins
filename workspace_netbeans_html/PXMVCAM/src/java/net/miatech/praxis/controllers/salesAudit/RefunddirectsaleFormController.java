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
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.SQP00957Filter;
import net.miatech.beans.SaleAudit.SQP00964Filter;
import net.miatech.beans.SaleAudit.SQP00976Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.SaleAudit.SQP01064Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RefunddirectsaleFormLogic;
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

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RefunddirectsaleForm")
public class RefunddirectsaleFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RefunddirectsaleFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        SQP00957Filter filter = new SQP00957Filter();
        try {
            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_PAIS = request.getParameter("VP_PAIS");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_SEQ = request.getParameter("VP_SEQ");
            filter.VP_OPCION = request.getParameter("VP_OPCION");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00957Filter> lst_search = logic.search(filter);

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

    @RequestMapping(value = "ProcesarSale")
    public @ResponseBody
    String ProcesarSale(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00957Filter filter = new SQP00957Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesarSale(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchExch1")
    public @ResponseBody
    String searchExch1(ModelMap map, HttpServletRequest request) {
        SQP00964Filter filter = new SQP00964Filter();
        try {
            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_PAIS = request.getParameter("VP_PAIS");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_SEQ = request.getParameter("VP_SEQ");
            filter.VP_OPCION = request.getParameter("VP_OPCION");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00964Filter> lst_search = logic.searchExch1(filter);

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

    @RequestMapping(value = "ProcesarExch1")
    public @ResponseBody
    String ProcesarExch1(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00964Filter filter = new SQP00964Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesarExch1(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchExch2")
    public @ResponseBody
    String searchExch2(ModelMap map, HttpServletRequest request) {
        SQP00976Filter filter = new SQP00976Filter();
        try {
            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_PAIS = request.getParameter("VP_PAIS");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_SEQ = request.getParameter("VP_SEQ");
            filter.VP_OPCION = request.getParameter("VP_OPCION");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00976Filter> lst_search = logic.searchExch2(filter);

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

    @RequestMapping(value = "ProcesarExch2")
    public @ResponseBody
    String ProcesarExch2(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00976Filter filter = new SQP00976Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesarExch2(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSXSale")
    public @ResponseBody
    void getXLSXSale(HttpServletRequest request, HttpServletResponse response) {
        SQP00957Filter filter = new SQP00957Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00957Filter> listaData = logic.search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ProQueryTcktRfnd_SALE");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23,
                    CH_24, CH_25, CH_26, CH_27, CH_28, CH_29, CH_30, CH_31, CH_32, CH_33, CH_34, CH_35, CH_36,
                    CH_37;
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
            CH_30 = row.createCell(30);
            CH_31 = row.createCell(31);
            CH_32 = row.createCell(32);
            CH_33 = row.createCell(33);
            CH_34 = row.createCell(34);
            CH_35 = row.createCell(35);
            CH_36 = row.createCell(36);
            CH_37 = row.createCell(37);

            CH_00.setCellValue("Cia");
            CH_01.setCellValue("Forma");
            CH_02.setCellValue("Serie");
            CH_03.setCellValue("Sale Date");
            CH_04.setCellValue("Transaction");
            CH_05.setCellValue("Iata");
            CH_06.setCellValue("Agent");
            CH_07.setCellValue("Commision");
            CH_08.setCellValue("Currency Commision");
            CH_09.setCellValue("Over Commision");
            CH_10.setCellValue("Currency over Commision");
            CH_11.setCellValue("Tax On Commision");
            CH_12.setCellValue("Form of Payment");
            CH_13.setCellValue("Card Type");
            CH_14.setCellValue("Card number");
            CH_15.setCellValue("Class 1");
            CH_16.setCellValue("Class 2");
            CH_17.setCellValue("Class 3");
            CH_18.setCellValue("Class 4");
            CH_19.setCellValue("Farebasis 1");
            CH_20.setCellValue("Farebasis 2");
            CH_21.setCellValue("Farebasis 3");
            CH_22.setCellValue("Farebasis 4");
            CH_23.setCellValue("Itinerary");
            CH_24.setCellValue("sale country");
            CH_25.setCellValue("FCMI");
            CH_26.setCellValue("PAX");
            CH_27.setCellValue("PAX Type");
            CH_28.setCellValue("PNR");
            CH_29.setCellValue("ESTPD");
            CH_30.setCellValue("TVTA");
            CH_31.setCellValue("CODIGO IT");
            CH_32.setCellValue("DIGITO DCHEQ");
            CH_33.setCellValue("FLAG");
            CH_34.setCellValue("NLOTE");
            CH_35.setCellValue("Administrative charge");
            CH_36.setCellValue("Iva charge");
            CH_37.setCellValue("Neto");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 37));

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
            CH_30.setCellStyle(headerStyle);
            CH_31.setCellStyle(headerStyle);
            CH_32.setCellStyle(headerStyle);
            CH_33.setCellStyle(headerStyle);
            CH_34.setCellStyle(headerStyle);
            CH_35.setCellStyle(headerStyle);
            CH_36.setCellStyle(headerStyle);
            CH_37.setCellStyle(headerStyle);

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
                CH_30 = row.createCell(30);
                CH_31 = row.createCell(31);
                CH_32 = row.createCell(32);
                CH_33 = row.createCell(33);
                CH_34 = row.createCell(34);
                CH_35 = row.createCell(35);
                CH_36 = row.createCell(36);
                CH_37 = row.createCell(37);

                CH_00.setCellValue(listaData.get(vi).A2554CIAI);
                CH_01.setCellValue(listaData.get(vi).A2554FRMAI);
                CH_02.setCellValue(listaData.get(vi).A2554SRIEI);
                CH_03.setCellValue(listaData.get(vi).A2554FVTA);
                CH_04.setCellValue(listaData.get(vi).A2554TRNCU);
                CH_05.setCellValue(listaData.get(vi).A2554AGTIA);
                CH_06.setCellValue(listaData.get(vi).A2554AGENT);
                CH_07.setCellValue(listaData.get(vi).A2554COMTO);
                CH_08.setCellValue(listaData.get(vi).A2554MCOM);
                CH_09.setCellValue(listaData.get(vi).A2554SCMTO);
                CH_10.setCellValue(listaData.get(vi).A2554SMCOM);
                CH_11.setCellValue(listaData.get(vi).A2554TTXC);
                CH_12.setCellValue(listaData.get(vi).A2554CFOP);
                CH_13.setCellValue(listaData.get(vi).A2554TTARJ);
                CH_14.setCellValue(listaData.get(vi).A2554NREF);
                CH_15.setCellValue(listaData.get(vi).A2554CLAS1);
                CH_16.setCellValue(listaData.get(vi).A2554CLAS2);
                CH_17.setCellValue(listaData.get(vi).A2554CLAS3);
                CH_18.setCellValue(listaData.get(vi).A2554CLAS4);
                CH_19.setCellValue(listaData.get(vi).A2554FBAS1);
                CH_20.setCellValue(listaData.get(vi).A2554FBAS2);
                CH_21.setCellValue(listaData.get(vi).A2554FBAS3);
                CH_22.setCellValue(listaData.get(vi).A2554FBAS4);
                CH_23.setCellValue(listaData.get(vi).ITINERARIO);
                CH_24.setCellValue(listaData.get(vi).A2554PVTA);
                CH_25.setCellValue(listaData.get(vi).A2554ARPI);
                CH_26.setCellValue(listaData.get(vi).A2554PAX);
                CH_27.setCellValue(listaData.get(vi).A2554TPAX);
                CH_28.setCellValue(listaData.get(vi).A2554PNR);
                CH_29.setCellValue(listaData.get(vi).A2554ESTPD);
                CH_30.setCellValue(listaData.get(vi).A2554TVTA);
                CH_31.setCellValue(listaData.get(vi).A2554CDIT);
                CH_32.setCellValue(listaData.get(vi).A2554CHEQ);
                CH_33.setCellValue(listaData.get(vi).A2554FLAG);
                CH_34.setCellValue(listaData.get(vi).A2554NLOTE);
                CH_35.setCellValue(listaData.get(vi).A2554CHARG);
                CH_36.setCellValue(listaData.get(vi).A2554IVACH);
                CH_37.setCellValue(listaData.get(vi).A2554NETO);

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
                CH_30.setCellStyle(bodyStyle);
                CH_31.setCellStyle(bodyStyle);
                CH_32.setCellStyle(bodyStyle);
                CH_33.setCellStyle(bodyStyle);
                CH_34.setCellStyle(bodyStyle);
                CH_35.setCellStyle(bodyStyle);
                CH_36.setCellStyle(bodyStyle);
                CH_37.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);

            String fileNameDownload = String.format(Functions.getFechaActual() + "_SALE" + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSXExch1")
    public @ResponseBody
    void getXLSXExch1(HttpServletRequest request, HttpServletResponse response) {
        SQP00964Filter filter = new SQP00964Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00964Filter> listaData = logic.searchExch1(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ProQueryTcktRfnd_EXCH1");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23,
                    CH_24, CH_25, CH_26, CH_27, CH_28, CH_29, CH_30, CH_31, CH_32, CH_33, CH_34, CH_35, CH_36,
                    CH_37, CH_38, CH_39, CH_40, CH_41, CH_42, CH_43, CH_44, CH_45, CH_46, CH_47, CH_48;
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
            CH_30 = row.createCell(30);
            CH_31 = row.createCell(31);
            CH_32 = row.createCell(32);
            CH_33 = row.createCell(33);
            CH_34 = row.createCell(34);
            CH_35 = row.createCell(35);
            CH_36 = row.createCell(36);
            CH_37 = row.createCell(37);
            CH_38 = row.createCell(38);
            CH_39 = row.createCell(39);
            CH_40 = row.createCell(40);
            CH_41 = row.createCell(41);
            CH_42 = row.createCell(42);
            CH_43 = row.createCell(43);
            CH_44 = row.createCell(44);
            CH_45 = row.createCell(45);
            CH_46 = row.createCell(46);
            CH_47 = row.createCell(47);
            CH_48 = row.createCell(48);

            CH_00.setCellValue("Cia");
            CH_01.setCellValue("Forma");
            CH_02.setCellValue("Serie");
            CH_03.setCellValue("Sale Date");
            CH_04.setCellValue("Transaction");
            CH_05.setCellValue("Iata");
            CH_06.setCellValue("Agent");
            CH_07.setCellValue("Commision");
            CH_08.setCellValue("Currency Commision");
            CH_09.setCellValue("Over Commision");
            CH_10.setCellValue("Currency over Commision");
            CH_11.setCellValue("Tax On Commision");
            CH_12.setCellValue("Form of Payment");
            CH_13.setCellValue("Card Type");
            CH_14.setCellValue("Card number");
            CH_15.setCellValue("Class 1");
            CH_16.setCellValue("Class 2");
            CH_17.setCellValue("Class 3");
            CH_18.setCellValue("Class 4");
            CH_19.setCellValue("Farebasis 1");
            CH_20.setCellValue("Farebasis 2");
            CH_21.setCellValue("Farebasis 3");
            CH_22.setCellValue("Farebasis 4");
            CH_23.setCellValue("Itinerary");
            CH_24.setCellValue("sale country");
            CH_25.setCellValue("FCMI");
            CH_26.setCellValue("PAX");
            CH_27.setCellValue("PAX Type");
            CH_28.setCellValue("ESTPD");
            CH_29.setCellValue("PNR");
            CH_30.setCellValue("Original Cia");
            CH_31.setCellValue("Original Forma");
            CH_32.setCellValue("Original Serie");
            CH_33.setCellValue("Original Sale Date");
            CH_34.setCellValue("Original Itinerary");
            CH_35.setCellValue("Original Commision");
            CH_36.setCellValue("Original Over Commision");
            CH_37.setCellValue("Original over Commision");
            CH_38.setCellValue("Original Currency Commision");
            CH_39.setCellValue("Original Tax On Commision");
            CH_40.setCellValue("ESTPD");
            CH_41.setCellValue("TVTA");
            CH_42.setCellValue("CODIGO IT");
            CH_43.setCellValue("DIGITO DCHEQ");
            CH_44.setCellValue("FLAG");
            CH_45.setCellValue("NLOTE");
            CH_46.setCellValue("Administrative charge");
            CH_47.setCellValue("Iva charge");
            CH_48.setCellValue("Neto");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 37));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 38, 38));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 39, 39));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 40, 40));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 41, 41));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 42, 42));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 43, 43));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 44, 44));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 45, 45));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 46, 46));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 47, 47));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 48, 48));

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
            CH_30.setCellStyle(headerStyle);
            CH_31.setCellStyle(headerStyle);
            CH_32.setCellStyle(headerStyle);
            CH_33.setCellStyle(headerStyle);
            CH_34.setCellStyle(headerStyle);
            CH_35.setCellStyle(headerStyle);
            CH_36.setCellStyle(headerStyle);
            CH_37.setCellStyle(headerStyle);
            CH_38.setCellStyle(headerStyle);
            CH_39.setCellStyle(headerStyle);
            CH_40.setCellStyle(headerStyle);
            CH_41.setCellStyle(headerStyle);
            CH_42.setCellStyle(headerStyle);
            CH_43.setCellStyle(headerStyle);
            CH_44.setCellStyle(headerStyle);
            CH_45.setCellStyle(headerStyle);
            CH_46.setCellStyle(headerStyle);
            CH_47.setCellStyle(headerStyle);
            CH_48.setCellStyle(headerStyle);

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
                CH_30 = row.createCell(30);
                CH_31 = row.createCell(31);
                CH_32 = row.createCell(32);
                CH_33 = row.createCell(33);
                CH_34 = row.createCell(34);
                CH_35 = row.createCell(35);
                CH_36 = row.createCell(36);
                CH_37 = row.createCell(37);
                CH_38 = row.createCell(38);
                CH_39 = row.createCell(39);
                CH_40 = row.createCell(40);
                CH_41 = row.createCell(41);
                CH_42 = row.createCell(42);
                CH_43 = row.createCell(43);
                CH_44 = row.createCell(44);
                CH_45 = row.createCell(45);
                CH_46 = row.createCell(46);
                CH_47 = row.createCell(47);
                CH_48 = row.createCell(48);

                CH_00.setCellValue(listaData.get(vi).A2556CIAI);
                CH_01.setCellValue(listaData.get(vi).A2556FRMAI);
                CH_02.setCellValue(listaData.get(vi).A2556SRIEI);
                CH_03.setCellValue(listaData.get(vi).A2556FVTA);
                CH_04.setCellValue(listaData.get(vi).A2556TRNCU);
                CH_05.setCellValue(listaData.get(vi).A2556AGTIA);
                CH_06.setCellValue(listaData.get(vi).A2556AGENT);
                CH_07.setCellValue(listaData.get(vi).A2556COMIS);
                CH_08.setCellValue(listaData.get(vi).A2556MCOM);
                CH_09.setCellValue(listaData.get(vi).A2556CTSCM);
                CH_10.setCellValue(listaData.get(vi).A2556SMCOM);
                CH_11.setCellValue(listaData.get(vi).A2556TTXC);
                CH_12.setCellValue(listaData.get(vi).A2556CFOP);
                CH_13.setCellValue(listaData.get(vi).A2556TTARJ);
                CH_14.setCellValue(listaData.get(vi).A2556NREF);
                CH_15.setCellValue(listaData.get(vi).A2556CLAS1);
                CH_16.setCellValue(listaData.get(vi).A2556CLAS2);
                CH_17.setCellValue(listaData.get(vi).A2556CLAS3);
                CH_18.setCellValue(listaData.get(vi).A2556CLAS4);
                CH_19.setCellValue(listaData.get(vi).A2556FBAS1);
                CH_20.setCellValue(listaData.get(vi).A2556FBAS2);
                CH_21.setCellValue(listaData.get(vi).A2556FBAS3);
                CH_22.setCellValue(listaData.get(vi).A2556FBAS4);
                CH_23.setCellValue(listaData.get(vi).ITINERARIO);
                CH_24.setCellValue(listaData.get(vi).A2556PVTA);
                CH_25.setCellValue(listaData.get(vi).A2556ARPI);
                CH_26.setCellValue(listaData.get(vi).A2556PAX);
                CH_27.setCellValue(listaData.get(vi).A2556TPAX);
                CH_28.setCellValue(listaData.get(vi).A2556ESTPD);
                CH_29.setCellValue(listaData.get(vi).A2556PNR);
                CH_30.setCellValue(listaData.get(vi).A2556CIA2);
                CH_31.setCellValue(listaData.get(vi).A2556FRMA2);
                CH_32.setCellValue(listaData.get(vi).A2556SRIE2);
                CH_33.setCellValue(listaData.get(vi).A2556FVTA2);
                CH_34.setCellValue(listaData.get(vi).ITINERARIORIG);
                CH_35.setCellValue(listaData.get(vi).A2556COMI2);
                CH_36.setCellValue(listaData.get(vi).A2556SMCO2);
                CH_37.setCellValue(listaData.get(vi).A2556TSCM2);
                CH_38.setCellValue(listaData.get(vi).A2556MCOM);
                CH_39.setCellValue(listaData.get(vi).A2556TTX2);
                CH_40.setCellValue(listaData.get(vi).A2556ESTPD);
                CH_41.setCellValue(listaData.get(vi).A2556TVTA);
                CH_42.setCellValue(listaData.get(vi).A2556CDIT);
                CH_43.setCellValue(listaData.get(vi).A2556CHEQ);
                CH_44.setCellValue(listaData.get(vi).A2556FLAG);
                CH_45.setCellValue(listaData.get(vi).A2556NLOTE);
                CH_46.setCellValue(listaData.get(vi).A2556CHARG);
                CH_47.setCellValue(listaData.get(vi).A2556IVACH);
                CH_48.setCellValue(listaData.get(vi).A2556NETO);

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
                CH_30.setCellStyle(bodyStyle);
                CH_31.setCellStyle(bodyStyle);
                CH_32.setCellStyle(bodyStyle);
                CH_33.setCellStyle(bodyStyle);
                CH_34.setCellStyle(bodyStyle);
                CH_35.setCellStyle(bodyStyle);
                CH_36.setCellStyle(bodyStyle);
                CH_37.setCellStyle(bodyStyle);
                CH_38.setCellStyle(bodyStyle);
                CH_39.setCellStyle(bodyStyle);
                CH_40.setCellStyle(bodyStyle);
                CH_41.setCellStyle(bodyStyle);
                CH_42.setCellStyle(bodyStyle);
                CH_43.setCellStyle(bodyStyle);
                CH_44.setCellStyle(bodyStyle);
                CH_45.setCellStyle(bodyStyle);
                CH_46.setCellStyle(bodyStyle);
                CH_47.setCellStyle(bodyStyle);
                CH_48.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);
            sheet.autoSizeColumn(39, true);
            sheet.autoSizeColumn(40, true);
            sheet.autoSizeColumn(41, true);
            sheet.autoSizeColumn(42, true);
            sheet.autoSizeColumn(43, true);
            sheet.autoSizeColumn(44, true);
            sheet.autoSizeColumn(45, true);
            sheet.autoSizeColumn(46, true);
            sheet.autoSizeColumn(47, true);
            sheet.autoSizeColumn(48, true);

            String fileNameDownload = String.format(Functions.getFechaActual() + "_EXCH1" + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSXExch2")
    public @ResponseBody
    void getXLSXExch2(HttpServletRequest request, HttpServletResponse response) {
        SQP00976Filter filter = new SQP00976Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00976Filter> listaData = logic.searchExch2(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ProQueryTcktRfnd_EXCH2");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23,
                    CH_24, CH_25, CH_26, CH_27, CH_28, CH_29, CH_30, CH_31, CH_32, CH_33, CH_34, CH_35, CH_36,
                    CH_37, CH_38, CH_39, CH_40, CH_41, CH_42, CH_43, CH_44, CH_45, CH_46, CH_47, CH_48;
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
            CH_30 = row.createCell(30);
            CH_31 = row.createCell(31);
            CH_32 = row.createCell(32);
            CH_33 = row.createCell(33);
            CH_34 = row.createCell(34);
            CH_35 = row.createCell(35);
            CH_36 = row.createCell(36);
            CH_37 = row.createCell(37);
            CH_38 = row.createCell(38);
            CH_39 = row.createCell(39);
            CH_40 = row.createCell(40);
            CH_41 = row.createCell(41);
            CH_42 = row.createCell(42);
            CH_43 = row.createCell(43);
            CH_44 = row.createCell(44);
            CH_45 = row.createCell(45);
            CH_46 = row.createCell(46);
            CH_47 = row.createCell(47);
            CH_48 = row.createCell(48);

            CH_00.setCellValue("Cia");
            CH_01.setCellValue("Forma");
            CH_02.setCellValue("Serie");
            CH_03.setCellValue("Sale Date");
            CH_04.setCellValue("Transaction");
            CH_05.setCellValue("Iata");
            CH_06.setCellValue("Agent");
            CH_07.setCellValue("Commision");
            CH_08.setCellValue("Currency Commision");
            CH_09.setCellValue("Over Commision");
            CH_10.setCellValue("Currency over Commision");
            CH_11.setCellValue("Tax On Commision");
            CH_12.setCellValue("Form of Payment");
            CH_13.setCellValue("Card Type");
            CH_14.setCellValue("Card number");
            CH_15.setCellValue("Class 1");
            CH_16.setCellValue("Class 2");
            CH_17.setCellValue("Class 3");
            CH_18.setCellValue("Class 4");
            CH_19.setCellValue("Farebasis 1");
            CH_20.setCellValue("Farebasis 2");
            CH_21.setCellValue("Farebasis 3");
            CH_22.setCellValue("Farebasis 4");
            CH_23.setCellValue("Itinerary");
            CH_24.setCellValue("sale country");
            CH_25.setCellValue("FCMI");
            CH_26.setCellValue("PAX");
            CH_27.setCellValue("PAX Type");
            CH_28.setCellValue("ESTPD");
            CH_29.setCellValue("PNR");
            CH_30.setCellValue("Original Cia");
            CH_31.setCellValue("Original Forma");
            CH_32.setCellValue("Original Serie");
            CH_33.setCellValue("Original Sale Date");
            CH_34.setCellValue("Original Itinerary");
            CH_35.setCellValue("Original Commision");
            CH_36.setCellValue("Original Over Commision");
            CH_37.setCellValue("Original over Commision");
            CH_38.setCellValue("Original Currency Commision");
            CH_39.setCellValue("Original Tax On Commision");
            CH_40.setCellValue("ESTPD");
            CH_41.setCellValue("TVTA");
            CH_42.setCellValue("CODIGO IT");
            CH_43.setCellValue("DIGITO DCHEQ");
            CH_44.setCellValue("FLAG");
            CH_45.setCellValue("NLOTE");
            CH_46.setCellValue("Administrative charge");
            CH_47.setCellValue("Iva charge");
            CH_48.setCellValue("Neto");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 37));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 38, 38));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 39, 39));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 40, 40));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 41, 41));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 42, 42));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 43, 43));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 44, 44));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 45, 45));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 46, 46));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 47, 47));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 48, 48));

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
            CH_30.setCellStyle(headerStyle);
            CH_31.setCellStyle(headerStyle);
            CH_32.setCellStyle(headerStyle);
            CH_33.setCellStyle(headerStyle);
            CH_34.setCellStyle(headerStyle);
            CH_35.setCellStyle(headerStyle);
            CH_36.setCellStyle(headerStyle);
            CH_37.setCellStyle(headerStyle);
            CH_38.setCellStyle(headerStyle);
            CH_39.setCellStyle(headerStyle);
            CH_40.setCellStyle(headerStyle);
            CH_41.setCellStyle(headerStyle);
            CH_42.setCellStyle(headerStyle);
            CH_43.setCellStyle(headerStyle);
            CH_44.setCellStyle(headerStyle);
            CH_45.setCellStyle(headerStyle);
            CH_46.setCellStyle(headerStyle);
            CH_47.setCellStyle(headerStyle);
            CH_48.setCellStyle(headerStyle);

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
                CH_30 = row.createCell(30);
                CH_32 = row.createCell(32);
                CH_33 = row.createCell(33);
                CH_34 = row.createCell(34);
                CH_35 = row.createCell(35);
                CH_36 = row.createCell(36);
                CH_37 = row.createCell(37);
                CH_38 = row.createCell(38);
                CH_39 = row.createCell(39);
                CH_40 = row.createCell(40);
                CH_41 = row.createCell(41);
                CH_42 = row.createCell(42);
                CH_43 = row.createCell(43);
                CH_44 = row.createCell(44);
                CH_45 = row.createCell(45);
                CH_46 = row.createCell(46);
                CH_47 = row.createCell(47);
                CH_48 = row.createCell(48);

                CH_00.setCellValue(listaData.get(vi).A2557CIAI);
                CH_01.setCellValue(listaData.get(vi).A2557FRMAI);
                CH_02.setCellValue(listaData.get(vi).A2557SRIEI);
                CH_03.setCellValue(listaData.get(vi).A2557FVTA);
                CH_04.setCellValue(listaData.get(vi).A2557TRNCU);
                CH_05.setCellValue(listaData.get(vi).A2557AGTIA);
                CH_06.setCellValue(listaData.get(vi).A2557AGENT);
                CH_07.setCellValue(listaData.get(vi).A2557COMIS);
                CH_08.setCellValue(listaData.get(vi).A2557MCOM);
                CH_09.setCellValue(listaData.get(vi).A2557CTSCM);
                CH_10.setCellValue(listaData.get(vi).A2557SMCOM);
                CH_11.setCellValue(listaData.get(vi).A2557TTXC);
                CH_12.setCellValue(listaData.get(vi).A2557CFOP);
                CH_13.setCellValue(listaData.get(vi).A2557TTARJ);
                CH_14.setCellValue(listaData.get(vi).A2557NREF);
                CH_15.setCellValue(listaData.get(vi).A2557CLAS1);
                CH_16.setCellValue(listaData.get(vi).A2557CLAS2);
                CH_17.setCellValue(listaData.get(vi).A2557CLAS3);
                CH_18.setCellValue(listaData.get(vi).A2557CLAS4);
                CH_19.setCellValue(listaData.get(vi).A2557FBAS1);
                CH_20.setCellValue(listaData.get(vi).A2557FBAS2);
                CH_21.setCellValue(listaData.get(vi).A2557FBAS3);
                CH_22.setCellValue(listaData.get(vi).A2557FBAS4);
                CH_23.setCellValue(listaData.get(vi).ITINERARIO);
                CH_24.setCellValue(listaData.get(vi).A2557PVTA);
                CH_25.setCellValue(listaData.get(vi).A2557ARPI);
                CH_26.setCellValue(listaData.get(vi).A2557PAX);
                CH_27.setCellValue(listaData.get(vi).A2557TPAX);
                CH_28.setCellValue(listaData.get(vi).A2557ESTPD);
                CH_29.setCellValue(listaData.get(vi).A2557PNR);
                CH_30.setCellValue(listaData.get(vi).A2557CIA2);
                CH_31.setCellValue(listaData.get(vi).A2557FRMA2);
                CH_32.setCellValue(listaData.get(vi).A2557SRIE2);
                CH_33.setCellValue(listaData.get(vi).A2557FVTA2);
                CH_34.setCellValue(listaData.get(vi).ITINERARIORIG);
                CH_35.setCellValue(listaData.get(vi).A2557COMI2);
                CH_36.setCellValue(listaData.get(vi).A2557SMCO2);
                CH_37.setCellValue(listaData.get(vi).A2557TSCM2);
                CH_38.setCellValue(listaData.get(vi).A2557MCOM);
                CH_39.setCellValue(listaData.get(vi).A2557TTX2);
                CH_40.setCellValue(listaData.get(vi).A2557ESTPD);
                CH_41.setCellValue(listaData.get(vi).A2557TVTA);
                CH_42.setCellValue(listaData.get(vi).A2557CDIT);
                CH_43.setCellValue(listaData.get(vi).A2557CHEQ);
                CH_44.setCellValue(listaData.get(vi).A2557FLAG);
                CH_45.setCellValue(listaData.get(vi).A2557NLOTE);
                CH_46.setCellValue(listaData.get(vi).A2557CHARG);
                CH_47.setCellValue(listaData.get(vi).A2557IVACH);
                CH_48.setCellValue(listaData.get(vi).A2557NETO);

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
                CH_30.setCellStyle(bodyStyle);
                CH_31.setCellStyle(bodyStyle);
                CH_32.setCellStyle(bodyStyle);
                CH_33.setCellStyle(bodyStyle);
                CH_34.setCellStyle(bodyStyle);
                CH_35.setCellStyle(bodyStyle);
                CH_36.setCellStyle(bodyStyle);
                CH_37.setCellStyle(bodyStyle);
                CH_38.setCellStyle(bodyStyle);
                CH_39.setCellStyle(bodyStyle);
                CH_40.setCellStyle(bodyStyle);
                CH_41.setCellStyle(bodyStyle);
                CH_42.setCellStyle(bodyStyle);
                CH_43.setCellStyle(bodyStyle);
                CH_44.setCellStyle(bodyStyle);
                CH_45.setCellStyle(bodyStyle);
                CH_46.setCellStyle(bodyStyle);
                CH_47.setCellStyle(bodyStyle);
                CH_48.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);
            sheet.autoSizeColumn(39, true);
            sheet.autoSizeColumn(40, true);
            sheet.autoSizeColumn(41, true);
            sheet.autoSizeColumn(42, true);
            sheet.autoSizeColumn(43, true);
            sheet.autoSizeColumn(44, true);
            sheet.autoSizeColumn(45, true);
            sheet.autoSizeColumn(46, true);
            sheet.autoSizeColumn(47, true);
            sheet.autoSizeColumn(48, true);

            String fileNameDownload = String.format(Functions.getFechaActual() + "_EXCH2" + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    

}
