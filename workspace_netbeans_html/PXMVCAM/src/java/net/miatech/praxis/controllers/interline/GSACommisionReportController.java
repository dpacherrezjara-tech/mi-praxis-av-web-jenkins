/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.interline;

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
import net.miatech.beans.A1462Filter2;
import net.miatech.beans.WRF070Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.logic.interline.GSACommisionReportLogic;
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
@RequestMapping("/GSACommisionsReport")
public class GSACommisionReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private GSACommisionReportLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/GSACommisionsReport/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : Search-------------");
        map.put("success", true);
        List<WRF070Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<WRF070Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<WRF070Filter> lst = new ArrayList<>(0);
        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF070Filter.class);
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

            lst = logic.loadPX240S01(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCIA")
    public @ResponseBody
    String searchCIA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchCIA-------------");
        map.put("success", true);
        List<WRF070Filter> lst = this.getListCIA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<WRF070Filter> getListCIA(HttpServletRequest request, Boolean bExcel) {

        List<WRF070Filter> lst = new ArrayList<>(0);
        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF070Filter.class);
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

            lst = logic.loadPX240S02(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPAIS")
    public @ResponseBody
    String searchPAIS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchCIA-------------");
        map.put("success", true);
        List<WRF070Filter> lst = this.getListPAIS(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<WRF070Filter> getListPAIS(HttpServletRequest request, Boolean bExcel) {

        List<WRF070Filter> lst = new ArrayList<>(0);
        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF070Filter.class);
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

            lst = logic.loadPX240S03(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchAGENTE")
    public @ResponseBody
    String searchAGENTE(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchAGENTE-------------");
        map.put("success", true);
        List<WRF070Filter> lst = this.getListAGENTE(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        System.out.println("MAP : " + map.toString());
        return new Gson().toJson(map);
    }

    public List<WRF070Filter> getListAGENTE(HttpServletRequest request, Boolean bExcel) {

        List<WRF070Filter> lst = new ArrayList<>(0);
        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF070Filter.class);
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

            lst = logic.loadPX240S04(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTKTDetail")
    public @ResponseBody
    String searchTKTDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchTKTDetail-------------");
        map.put("success", true);
        List<A1462Filter2> lst = this.getListTKTDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        System.out.println("MAP : " + map.toString());
        return new Gson().toJson(map);
    }

    public List<A1462Filter2> getListTKTDetail(HttpServletRequest request, Boolean bExcel) {

        List<A1462Filter2> lst = new ArrayList<>(0);
        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF070Filter.class);
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

            lst = logic.loadPX240S01TKT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPOLIZ_LIQUIagente")
    public @ResponseBody
    String searchPOLIZ_LIQUIagente(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchPOLIZ_LIQUIagente-------------");
        map.put("success", true);
        List<A1462Filter2> lstLIQUI;
        List<A1462Filter2> lstPOLIZ;

        WRF070Filter filter = new WRF070Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            System.out.println("beanString : " + beanString);
            filter = gson.fromJson(beanString, WRF070Filter.class);
            filter.page.TOTROW = -1;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = -1;

            lstLIQUI = logic.loadPX240S02LIQUI(filter);
            lstPOLIZ = logic.loadPX240S01POLIZ(filter);

            map.put("lstLIQUI", lstLIQUI);
            map.put("lstPOLIZ", lstPOLIZ);
        } catch (Exception e) {
            map.put("success", false);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLIQUI")
    public @ResponseBody
    String searchLIQUI(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchLIQUI-------------");
        map.put("success", true);
        List<A1462Filter2> lst;

        A1462Filter2 filter = new A1462Filter2();
        Gson gson = new Gson();
        String beanString = "";
        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            System.out.println("beanString : " + beanString);
            filter = gson.fromJson(beanString, A1462Filter2.class);
            filter.page.TOTROW = -1;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = -1;

            lst = logic.loadPX240S01LIQUI(filter);

            map.put("lst", lst);
        } catch (Exception e) {
            map.put("success", false);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLIQUIdetalle")
    public @ResponseBody
    String searchLIQUIdetalle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- GSACommisionsReport : searchLIQUIdetalle-------------");
        map.put("success", true);
        List<A1462Filter2> lst;

        A1462Filter2 filter = new A1462Filter2();
        Gson gson = new Gson();
        String beanString = "";
        try {
            logic = new GSACommisionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            System.out.println("beanString : " + beanString);
            filter = gson.fromJson(beanString, A1462Filter2.class);
            filter.page.TOTROW = -1;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = -1;

            lst = logic.loadPX240S03LIQUI(filter);

            map.put("lst", lst);
        } catch (Exception e) {
            map.put("success", false);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("GSACommisionsReport : getXLSX");

        String fileNameDownload = String.format("GSACommisionsReport - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<WRF070Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("GSACommisionsReport");

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

            CH1_00.setCellValue("Date");
            CH1_01.setCellValue("Total Coupons");
            CH1_02.setCellValue("Invoice Currency");
            CH1_03.setCellValue("GROSS");
            CH1_04.setCellValue("ISC");
            CH1_05.setCellValue("Neto");
            CH1_06.setCellValue("GSA");
            CH1_07.setCellValue("%Comm");
            CH1_08.setCellValue("AVG");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 9));
//            //*******************
//            ++vj;
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//
//            CH2_02.setCellValue("QTY Docs");
//            CH2_03.setCellValue("Gross");
//            CH2_04.setCellValue("ISC");
//            CH2_05.setCellValue("TAX");
//            CH2_06.setCellValue("Other");
//            CH2_07.setCellValue("FEE");
//            CH2_08.setCellValue("UATP");
//            CH2_09.setCellValue("Neto");
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
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

                rcell0.setCellValue(listaData.get(vi).strDATE);
                rcell1.setCellValue(listaData.get(vi).QTYDOC);
                rcell2.setCellValue(listaData.get(vi).MONED);
                rcell3.setCellValue(listaData.get(vi).GROSS);
                rcell4.setCellValue(listaData.get(vi).ISC);
                rcell5.setCellValue(listaData.get(vi).NETO);
                rcell6.setCellValue(listaData.get(vi).COM);
                rcell7.setCellValue(listaData.get(vi).TAX);
                rcell8.setCellValue(listaData.get(vi).AVG);

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

    @RequestMapping(value = "getXLSXPAIS")
    public @ResponseBody
    void getXLSXPAIS(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("GSACommisionsReport : getXLSXPAIS");

        String fileNameDownload = String.format("GSACommisionsReport - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<WRF070Filter> listaData = this.getListPAIS(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("GSACommisionsReport");

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
            Cell CH1_0 = row.createCell(0);
            Cell CH1_1 = row.createCell(1);
            Cell CH1_2 = row.createCell(2);
            Cell CH1_3 = row.createCell(3);
            Cell CH1_4 = row.createCell(4);
            Cell CH1_5 = row.createCell(5);
            Cell CH1_6 = row.createCell(6);
            Cell CH1_7 = row.createCell(7);
            Cell CH1_8 = row.createCell(8);
            Cell CH1_9 = row.createCell(9);
            CH1_0.setCellValue("Countr Code");
            CH1_1.setCellValue("Countr Name");
            CH1_2.setCellValue("Total Coupons");
            CH1_3.setCellValue("Invoice Currency");
            CH1_4.setCellValue("Gross");
            CH1_5.setCellValue("ISC");
            CH1_6.setCellValue("Neto");
            CH1_7.setCellValue("GSA");
            CH1_8.setCellValue("%Comm");
            CH1_9.setCellValue("AVG");
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

                rcell0.setCellValue(listaData.get(vi).IN_CPISO);
                rcell1.setCellValue(listaData.get(vi).DES_CPISO);
                rcell2.setCellValue(listaData.get(vi).QTYDOC);
                rcell3.setCellValue(listaData.get(vi).IN_MONED);
                rcell4.setCellValue(listaData.get(vi).GROSS);
                rcell5.setCellValue(listaData.get(vi).ISC);
                rcell6.setCellValue(listaData.get(vi).NETO);
                rcell7.setCellValue(listaData.get(vi).COM);
                rcell8.setCellValue(listaData.get(vi).TAX);
                rcell9.setCellValue(listaData.get(vi).AVG);
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

    @RequestMapping(value = "getXLSXCIA")
    public @ResponseBody
    void getXLSXCIA(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("GSACommisionsReport : getXLSXCIA");

        String fileNameDownload = String.format("GSACommisionsReport - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<WRF070Filter> listaData = this.getListPAIS(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("GSACommisionsReport");

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
            Cell CH1_0 = row.createCell(0);
            Cell CH1_1 = row.createCell(1);
            Cell CH1_2 = row.createCell(2);
            Cell CH1_3 = row.createCell(3);
            Cell CH1_4 = row.createCell(4);
            Cell CH1_5 = row.createCell(5);
            Cell CH1_6 = row.createCell(6);
            Cell CH1_7 = row.createCell(7);
            Cell CH1_8 = row.createCell(8);
            Cell CH1_9 = row.createCell(9);
            CH1_0.setCellValue("Airline Code");
            CH1_1.setCellValue("Airline Name");
            CH1_2.setCellValue("Total Coupons");
            CH1_3.setCellValue("Invoice Currency");
            CH1_4.setCellValue("Gross");
            CH1_5.setCellValue("ISC");
            CH1_6.setCellValue("Neto");
            CH1_7.setCellValue("GSA");
            CH1_8.setCellValue("%Comm");
            CH1_9.setCellValue("AVG");
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

                rcell0.setCellValue(listaData.get(vi).CIA);
                rcell1.setCellValue(listaData.get(vi).DES_CIA);
                rcell2.setCellValue(listaData.get(vi).QTYDOC);
                rcell3.setCellValue(listaData.get(vi).IN_MONED);
                rcell4.setCellValue(listaData.get(vi).GROSS);
                rcell5.setCellValue(listaData.get(vi).ISC);
                rcell6.setCellValue(listaData.get(vi).NETO);
                rcell7.setCellValue(listaData.get(vi).COM);
                rcell8.setCellValue(listaData.get(vi).TAX);
                rcell9.setCellValue(listaData.get(vi).AVG);
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

    @RequestMapping(value = "getXLSXAGENTE")
    public @ResponseBody
    void getXLSXAGENTE(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("GSACommisionsReport : getXLSXAGENTE");

        String fileNameDownload = String.format("GSACommisionsReport - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<WRF070Filter> listaData = this.getListAGENTE(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("GSACommisionsReport");

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
            Cell CH1_0 = row.createCell(0);
            Cell CH1_1 = row.createCell(1);
            Cell CH1_2 = row.createCell(2);
            Cell CH1_3 = row.createCell(3);
            Cell CH1_4 = row.createCell(4);
            Cell CH1_5 = row.createCell(5);
            Cell CH1_6 = row.createCell(6);
            Cell CH1_7 = row.createCell(7);
            Cell CH1_8 = row.createCell(8);
            CH1_0.setCellValue("Group Agent");
            CH1_1.setCellValue("Total Coupons");
            CH1_2.setCellValue("Invoice Currency");
            CH1_3.setCellValue("Gross");
            CH1_4.setCellValue("ISC");
            CH1_5.setCellValue("Neto");
            CH1_6.setCellValue("GSA");
            CH1_7.setCellValue("%Comm");
            CH1_8.setCellValue("AVG");
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

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

                rcell0.setCellValue(listaData.get(vi).GROUPA);
                rcell1.setCellValue(listaData.get(vi).QTYDOC);
                rcell2.setCellValue(listaData.get(vi).IN_MONED);
                rcell3.setCellValue(listaData.get(vi).GROSS);
                rcell4.setCellValue(listaData.get(vi).ISC);
                rcell5.setCellValue(listaData.get(vi).NETO);
                rcell6.setCellValue(listaData.get(vi).COM);
                rcell7.setCellValue(listaData.get(vi).TAX);
                rcell8.setCellValue(listaData.get(vi).AVG);

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

   

}
