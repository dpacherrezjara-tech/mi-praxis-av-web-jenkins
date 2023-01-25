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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A018Filter;
import net.miatech.beans.A110Filter;
import net.miatech.beans.A1343Filter;
import net.miatech.beans.A1526Filter;
import net.miatech.beans.A2462Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AverageFareEMDLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
import net.miatech.praxis.logic.sales.RatesExchangeLogic;
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
@RequestMapping("/RatesExchange")
public class RatesExchangeController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RatesExchangeLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/RatesExchange/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RatesExchange : Controller-------------");
        map.put("success", true);
        String tipo = request.getParameter("IN_TIPO_TABLA");
        switch (tipo) {
            case "A018":
                List<A018Filter> lst = this.getListA018(request, false);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
                map.put("data", lst);
                System.out.println("A018 : " + lst.size());
                break;
            case "A110":
                List<A110Filter> lst2 = this.getListA110(request, false);
                map.put("total", lst2.size() > 0 ? lst2.get(0).page.TOTROW : 0);
                map.put("data", lst2);
                System.out.println("A110 : " + lst2.size());
                break;
            case "A1343":
                List<A1343Filter> lst3 = this.getListA1343(request, false);
                map.put("total", lst3.size() > 0 ? lst3.get(0).page.TOTROW : 0);
                map.put("data", lst3);
                System.out.println("A1343 : " + lst3.size());
                break;
            case "A1526":
                List<A1526Filter> lst4 = this.getListA1526(request, false);
                map.put("total", lst4.size() > 0 ? lst4.get(0).page.TOTROW : 0);
                map.put("data", lst4);
                System.out.println("A1526 : " + lst4.size());
                break;
            case "A4061":
                List<A1526Filter> lst5 = this.getListA4061(request, false);
                map.put("total", lst5.size() > 0 ? lst5.get(0).page.TOTROW : 0);
                map.put("data", lst5);
                System.out.println("A1526 : " + lst5.size());
                break;
        }
        return new Gson().toJson(map);

    }

    public List<A018Filter> getListA018(HttpServletRequest request, Boolean bExcel) {

        logic = new RatesExchangeLogic();

        List<A018Filter> lst = new ArrayList<>(0);

        A018Filter filter = new A018Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = Integer.parseInt(request.getParameter("IN_TIPO"));
            filter.IN_CURR = request.getParameter("IN_CURR_FROM");
            filter.IN_DATE = request.getParameter("IN_DATE");
            filter.IN_DATE_2 = request.getParameter("IN_DATE_2");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_TIPO" + filter.IN_TIPO);
            System.out.println(" IN_CURR" + filter.IN_CURR);
            System.out.println(" IN_DATE" + filter.IN_DATE);
            System.out.println(" IN_DATE_2" + filter.IN_DATE_2);

            System.out.println("-------------------------------------------------- ");

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
            lst = logic.loadPX025S03A018(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    public List<A110Filter> getListA110(HttpServletRequest request, Boolean bExcel) {

        logic = new RatesExchangeLogic();

        List<A110Filter> lst = new ArrayList<>(0);

        A110Filter filter = new A110Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = Integer.parseInt(request.getParameter("IN_TIPO"));
            filter.IN_CURR = request.getParameter("IN_CURR_FROM");
            filter.IN_DATE = request.getParameter("IN_DATE");
            filter.IN_DATE_2 = request.getParameter("IN_DATE_2");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_TIPO" + filter.IN_TIPO);
            System.out.println(" IN_CURR" + filter.IN_CURR);
            System.out.println(" IN_DATE" + filter.IN_DATE);
            System.out.println(" IN_DATE_2" + filter.IN_DATE_2);

            System.out.println("-------------------------------------------------- ");

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
            lst = logic.loadPX025S01A110(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    public List<A1343Filter> getListA1343(HttpServletRequest request, Boolean bExcel) {

        logic = new RatesExchangeLogic();

        List<A1343Filter> lst = new ArrayList<>(0);

        A1343Filter filter = new A1343Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = Integer.parseInt(request.getParameter("IN_TIPO"));
            filter.IN_CURR_FROM = request.getParameter("IN_CURR_FROM");
            filter.IN_CURR_TO = request.getParameter("IN_CURR_TO");
            filter.IN_DATE = request.getParameter("IN_DATE");
            filter.IN_DATE_2 = request.getParameter("IN_DATE_2");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_TIPO" + filter.IN_TIPO);
            System.out.println(" IN_CURR_TO" + filter.IN_CURR_TO);
            System.out.println(" IN_CURR_FROM" + filter.IN_CURR_FROM);
            System.out.println(" IN_DATE" + filter.IN_DATE);
            System.out.println(" IN_DATE_2" + filter.IN_DATE_2);

            System.out.println("-------------------------------------------------- ");

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
            lst = logic.loadPX025S03A1343(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    public List<A1526Filter> getListA1526(HttpServletRequest request, Boolean bExcel) {

        logic = new RatesExchangeLogic();

        List<A1526Filter> lst = new ArrayList<>(0);

        A1526Filter filter = new A1526Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = Integer.parseInt(request.getParameter("IN_TIPO"));
            filter.IN_CURR_FROM = request.getParameter("IN_CURR_FROM");
            filter.IN_CURR_TO = request.getParameter("IN_CURR_TO");
            filter.IN_DATE = request.getParameter("IN_DATE");
            filter.IN_DATE_2 = request.getParameter("IN_DATE_2");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_TIPO" + filter.IN_TIPO);
            System.out.println(" IN_CURR_TO" + filter.IN_CURR_TO);
            System.out.println(" IN_CURR_FROM" + filter.IN_CURR_FROM);
            System.out.println(" IN_DATE" + filter.IN_DATE);
            System.out.println(" IN_DATE_2" + filter.IN_DATE_2);

            System.out.println("-------------------------------------------------- ");

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
            lst = logic.loadPX025S01A1526(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }
    
    public List<A1526Filter> getListA4061(HttpServletRequest request, Boolean bExcel) {

        logic = new RatesExchangeLogic();

        List<A1526Filter> lst = new ArrayList<>(0);

        A1526Filter filter = new A1526Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = Integer.parseInt(request.getParameter("IN_TIPO"));
            filter.IN_CURR_FROM = request.getParameter("IN_CURR_FROM");
            filter.IN_CURR_TO = request.getParameter("IN_CURR_TO");
            filter.IN_DATE = request.getParameter("IN_DATE");
            filter.IN_DATE_2 = request.getParameter("IN_DATE_2");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_TIPO" + filter.IN_TIPO);
            System.out.println(" IN_CURR_TO" + filter.IN_CURR_TO);
            System.out.println(" IN_CURR_FROM" + filter.IN_CURR_FROM);
            System.out.println(" IN_DATE" + filter.IN_DATE);
            System.out.println(" IN_DATE_2" + filter.IN_DATE_2);

            System.out.println("-------------------------------------------------- ");

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
            lst = logic.loadPX025S01A4061(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A018Filter> lst = null;
        List<A110Filter> lst2 = null;
        List<A1343Filter> lst3 = null;
        List<A1526Filter> lst4 = null;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String tipo = request.getParameter("IN_TIPO_TABLA");

            logic = new RatesExchangeLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (tipo.equals("A018")) {
                lst = this.getListA018(request, true);
            } else if (tipo.equals("A110")) {
                lst2 = this.getListA110(request, true);
            } else if (tipo.equals("A1343")) {
                lst3 = this.getListA1343(request, true);
            } else if (tipo.equals("A1526")) {
                lst4 = this.getListA1526(request, true);
            } else if (tipo.equals("A4061")) {
                lst4 = this.getListA4061(request, true);
            }

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("RatesExchange");
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
            Iterator iter = null;
            if (tipo.equals("A018")) {
                iter = lst.iterator();
            } else if (tipo.equals("A110")) {
                iter = lst2.iterator();
            } else if (tipo.equals("A1343")) {
                iter = lst3.iterator();
            } else if (tipo.equals("A1526")) {
                iter = lst4.iterator();
            } else if (tipo.equals("A4061")) {
                iter = lst4.iterator();
            }

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);

            if (tipo.equals("A018") || tipo.equals("A110")) {
                CH_00.setCellValue("Nbr");
                CH_01.setCellValue("Currency");
                CH_02.setCellValue("Date");
                CH_03.setCellValue("USD");
                CH_04.setCellValue("GBP");
                CH_05.setCellValue("XEU");
            } else if (tipo.equals("A1343")) {
                CH_00.setCellValue("Nbr");
                CH_01.setCellValue("Currency From");
                CH_02.setCellValue("Currency To");
                CH_03.setCellValue("Date");
                CH_04.setCellValue("Rate - 1 x Currency");
                CH_05.setCellValue("Rate - 1 / Currency");
            } else if (tipo.equals("A1526")) {
                CH_00.setCellValue("Nbr");
                CH_01.setCellValue("Currency From");
                CH_02.setCellValue("Currency To");
                CH_03.setCellValue("Date");
                CH_04.setCellValue("Rate");
                CH_05.setCellValue("");
            }

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            if (tipo.equals("A018")) {
                while (iter.hasNext()) {
                    row = sheet.createRow(vj);
                    // <editor-fold defaultstate="collapsed" desc="data">
                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);
                    CH_05 = row.createCell(5);

                    CH_00.setCellValue(lst.get(vi).RN);
                    CH_01.setCellValue(lst.get(vi).A018ISO);
                    CH_02.setCellValue(lst.get(vi).A018DATE);
                    CH_03.setCellValue(lst.get(vi).A018URATE);
                    CH_04.setCellValue(lst.get(vi).A018GBP);
                    CH_05.setCellValue(lst.get(vi).A018XEU);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);
                    CH_05.setCellStyle(bodyStyle);

                    // </editor-fold>
                    iter.next();
                    ++vi;
                    ++vj;
                }
            } else if (tipo.equals("A110")) {
                while (iter.hasNext()) {
                    row = sheet.createRow(vj);
                    // <editor-fold defaultstate="collapsed" desc="data">
                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);
                    CH_05 = row.createCell(5);

                    CH_00.setCellValue(lst2.get(vi).RN);
                    CH_01.setCellValue(lst2.get(vi).A110ISO);
                    CH_02.setCellValue(lst2.get(vi).A110DATE);
                    CH_03.setCellValue(lst2.get(vi).A110URATE);
                    CH_04.setCellValue(lst2.get(vi).A110GBP);
                    CH_05.setCellValue(lst2.get(vi).A110XEU);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);
                    CH_05.setCellStyle(bodyStyle);

                    // </editor-fold>
                    iter.next();
                    ++vi;
                    ++vj;
                }
            } else if (tipo.equals("A1343")) {
                while (iter.hasNext()) {
                    row = sheet.createRow(vj);
                    // <editor-fold defaultstate="collapsed" desc="data">
                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);
                    CH_05 = row.createCell(5);

                    CH_00.setCellValue(lst3.get(vi).RN);
                    CH_01.setCellValue(lst3.get(vi).A1343CUR);
                    CH_02.setCellValue(lst3.get(vi).A1343CUR2);
                    CH_03.setCellValue(lst3.get(vi).A1343DIS);
                    CH_04.setCellValue(lst3.get(vi).A1343RATE);
                    CH_05.setCellValue(lst3.get(vi).A13431RATE);

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);
                    CH_05.setCellStyle(bodyStyle);

                    // </editor-fold>
                    iter.next();
                    ++vi;
                    ++vj;
                }
            } else if (tipo.equals("A1526")) {
                while (iter.hasNext()) {
                    row = sheet.createRow(vj);
                    // <editor-fold defaultstate="collapsed" desc="data">
                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);
                    CH_05 = row.createCell(5);

                    CH_00.setCellValue(lst4.get(vi).RN);
                    CH_01.setCellValue(lst4.get(vi).A1526CUR);
                    CH_02.setCellValue(lst4.get(vi).A1526CUR2);
                    CH_03.setCellValue(lst4.get(vi).A1526DIS);
                    CH_04.setCellValue(lst4.get(vi).A1526RATE);
                    CH_05.setCellValue("");

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);
                    CH_05.setCellStyle(bodyStyle);

                    // </editor-fold>
                    iter.next();
                    ++vi;
                    ++vj;
                }
            } else if (tipo.equals("A4061")) {
                while (iter.hasNext()) {
                    row = sheet.createRow(vj);
                    // <editor-fold defaultstate="collapsed" desc="data">
                    CH_00 = row.createCell(0);
                    CH_01 = row.createCell(1);
                    CH_02 = row.createCell(2);
                    CH_03 = row.createCell(3);
                    CH_04 = row.createCell(4);
                    CH_05 = row.createCell(5);

                    CH_00.setCellValue(lst4.get(vi).RN);
                    CH_01.setCellValue(lst4.get(vi).A1526CUR);
                    CH_02.setCellValue(lst4.get(vi).A1526CUR2);
                    CH_03.setCellValue(lst4.get(vi).A1526DIS);
                    CH_04.setCellValue(lst4.get(vi).A1526RATE);
                    CH_05.setCellValue("");

                    CH_00.setCellStyle(bodyStyle);
                    CH_01.setCellStyle(bodyStyle);
                    CH_02.setCellStyle(bodyStyle);
                    CH_03.setCellStyle(bodyStyle);
                    CH_04.setCellStyle(bodyStyle);
                    CH_05.setCellStyle(bodyStyle);

                    // </editor-fold>
                    iter.next();
                    ++vi;
                    ++vj;
                }
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

            String fileNameDownload = String.format("RatesExchange - " + Functions.getFechaActual() + ".csv", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".csv");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    /*@RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RatesExchange : getXLSX");

        String fileNameDownload = String.format("RatesExchange- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            List listaData;
            String tipo = request.getParameter("IN_TIPO_TABLA");

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

         

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("RatesExchange");

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
            Iterator iter;
            Row row;
            Cell CH1_00;
            Cell CH1_01;
            Cell CH1_02;
            Cell CH1_03;
            Cell CH1_04;
            Cell CH1_05;
            Cell CH1_06;
            Cell CH1_07;
            Cell CH1_08;

            Cell rcell0;
            Cell rcell1;
            Cell rcell2;
            Cell rcell3;
            Cell rcell4;
            Cell rcell5;
            Cell rcell6;
            Cell rcell7;
            Cell rcell8;

            row = sheet.createRow(vj);

            CH1_00 = row.createCell(0);
            CH1_01 = row.createCell(1);
            CH1_02 = row.createCell(2);
            CH1_03 = row.createCell(3);
            CH1_04 = row.createCell(4);
            CH1_05 = row.createCell(5);
            CH1_06 = row.createCell(6);
            CH1_07 = row.createCell(7);
            CH1_08 = row.createCell(8);

            switch (tipo) {
                case "A018":
                    List<A018Filter> lst = this.getListA018(request, false);
                    //listaData = lst;
                    iter = lst.iterator();
                    // ====== CREANDO TITULOS ======================================

                    CH1_00.setCellValue("Nbr");
                    CH1_01.setCellValue("Currency");
                    CH1_02.setCellValue("Date");
                    CH1_03.setCellValue("USD");
                    CH1_04.setCellValue("GBP");
                    CH1_05.setCellValue("XEU");

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        rcell0 = row.createCell(0);
                        rcell1 = row.createCell(1);
                        rcell2 = row.createCell(2);
                        rcell3 = row.createCell(3);
                        rcell4 = row.createCell(4);
                        rcell5 = row.createCell(5);

                        rcell0.setCellValue(lst.get(vi).RN);
                        rcell1.setCellValue(lst.get(vi).A018ISO);
                        rcell2.setCellValue(lst.get(vi).A018DATE);
                        rcell3.setCellValue(lst.get(vi).A018URATE);
                        rcell4.setCellValue(lst.get(vi).A018GBP);
                        rcell5.setCellValue(lst.get(vi).A018XEU);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);

                        iter.next();
                        ++vi;
                        ++vj;
                    }

                   
                   

                    break;
                case "A110":
                    List<A110Filter> lst2 = this.getListA110(request, false);                           
                    
                     iter = lst2.iterator();
                    // ====== CREANDO TITULOS ======================================

                    CH1_00.setCellValue("Nbr");
                    CH1_01.setCellValue("Currency");
                    CH1_02.setCellValue("Date");
                    CH1_03.setCellValue("USD");
                    CH1_04.setCellValue("GBP");
                    CH1_05.setCellValue("XEU");

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        rcell0 = row.createCell(0);
                        rcell1 = row.createCell(1);
                        rcell2 = row.createCell(2);
                        rcell3 = row.createCell(3);
                        rcell4 = row.createCell(4);
                        rcell5 = row.createCell(5);

                        rcell0.setCellValue(lst2.get(vi).RN);
                        rcell1.setCellValue(lst2.get(vi).A110ISO);
                        rcell2.setCellValue(lst2.get(vi).A110DATE);
                        rcell3.setCellValue(lst2.get(vi).A110URATE);
                        rcell4.setCellValue(lst2.get(vi).A110GBP);
                        rcell5.setCellValue(lst2.get(vi).A110XEU);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);

                        iter.next();
                        ++vi;
                        ++vj;
                    }

                   
                    
                    

                    break;
                case "A1343":
                    List<A1343Filter> lst3 = this.getListA1343(request, false);                    
                    iter = lst3.iterator();
                    
                      iter = lst3.iterator();
                    // ====== CREANDO TITULOS ======================================

                    CH1_00.setCellValue("Nbr");
                    CH1_01.setCellValue("Currency From");
                    CH1_02.setCellValue("Currency To");
                    CH1_03.setCellValue("Date");
                    CH1_04.setCellValue("Rate - 1 x Currency");
                    CH1_05.setCellValue("Rate - 1 / Currency");

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    CH1_05.setCellStyle(headerStyle);

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        rcell0 = row.createCell(0);
                        rcell1 = row.createCell(1);
                        rcell2 = row.createCell(2);
                        rcell3 = row.createCell(3);
                        rcell4 = row.createCell(4);
                        rcell5 = row.createCell(5);

                        rcell0.setCellValue(lst3.get(vi).RN);
                        rcell1.setCellValue(lst3.get(vi).A1343CUR);
                        rcell2.setCellValue(lst3.get(vi).A1343CUR2);
                        rcell3.setCellValue(lst3.get(vi).A1343DIS);
                        rcell4.setCellValue(lst3.get(vi).A1343RATE);
                        rcell5.setCellValue(lst3.get(vi).A13431RATE);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);

                        iter.next();
                        ++vi;
                        ++vj;
                    }


                    break;
                case "A1526":
                    List<A1526Filter> lst4 = this.getListA1526(request, false);                   
                    iter = lst4.iterator();                    
                     
                    // ====== CREANDO TITULOS ======================================

                    CH1_00.setCellValue("Nbr");
                    CH1_01.setCellValue("Currency From");
                    CH1_02.setCellValue("Currency To");
                    CH1_03.setCellValue("Date");
                    CH1_04.setCellValue("Rate ");
                   

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                 

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_03.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                

                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        rcell0 = row.createCell(0);
                        rcell1 = row.createCell(1);
                        rcell2 = row.createCell(2);
                        rcell3 = row.createCell(3);
                        rcell4 = row.createCell(4);
                     

                        rcell0.setCellValue(lst4.get(vi).RN);
                        rcell1.setCellValue(lst4.get(vi).A1526CUR);
                        rcell2.setCellValue(lst4.get(vi).A1526CUR2);
                        rcell3.setCellValue(lst4.get(vi).A1526DIS);
                        rcell4.setCellValue(lst4.get(vi).A1526RATE);                        

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                      

                        iter.next();
                        ++vi;
                        ++vj;
                    }

                    break;
            }

          

            //          ========================================================
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }*/
    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Rates Exchange Controller : Mantenimiento");
        String msj = "";
        A1526Filter filter = new A1526Filter();

        try {
            logic = new RatesExchangeLogic();
            logic.setSession(this.serverSession.getServerSession());

            String strOption = request.getParameter("strOption").toString().trim();
            filter.A1526RATE = Double.parseDouble(request.getParameter("A1526RATE"));
            filter.A1526CUR = request.getParameter("IN_A1526CUR");
            filter.A1526CUR2 = request.getParameter("IN_A1526CUR2");
            filter.A1526DIS = request.getParameter("IN_A1526DIS");
            filter.IN_A1526CUR_OLD = request.getParameter("IN_A1526CUR_OLD");
            filter.IN_A1526CUR2_OLD = request.getParameter("IN_A1526CUR2_OLD");
            filter.IN_A1526DIS_OLD = request.getParameter("IN_A1526DIS_OLD");

            msj = logic.SQP00820(filter, strOption);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }
}
