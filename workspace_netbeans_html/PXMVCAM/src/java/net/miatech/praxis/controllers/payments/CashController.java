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
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.MPF108;
import net.miatech.praxis.MPF108Filter;
import net.miatech.praxis.MPF300;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BSPLinkLogic;
import net.miatech.praxis.logic.payments.CashLogic;
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/Cash")
public class CashController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CashLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Cash/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Cash Controller : search-------------");
        map.put("success", true);
        List<MPF108> lst = this.getListsearch(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF108> getListsearch(HttpServletRequest request, Boolean bExcel) {

        List<MPF108> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);
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

            lst = logic.loadMPS441(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCredit")
    public @ResponseBody
    String searchCredit(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Cash Controller : searchCredit-------------");
        map.put("success", true);
        List<MPF108> lst = this.getListsearchCredit(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF108> getListsearchCredit(HttpServletRequest request, Boolean bExcel) {

        List<MPF108> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);
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

            lst = logic.loadMPS520(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "updateSummary")
    public @ResponseBody
    String updateSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Cash Controller : updateSummary (MPS440) -------------");

        try {
            String beanString = request.getParameter("beanString");
            Gson gson = new Gson();
            MPF108Filter filter = gson.fromJson(beanString, MPF108Filter.class);

            // Ejecutar el stored procedure MPS440
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            Map<String, Object> result = logic.executeMPS440(filter);

            map.put("success", result.get("success"));
            map.put("message", result.get("message"));
            map.put("sqlCode", result.get("sqlCode"));

        } catch (Exception e) {
            map.put("success", false);
            map.put("message", "Error: " + e.getMessage());
            e.printStackTrace();
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDataDetailSource")
    public @ResponseBody
    String searchDataDetailSource(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<MPF300> lst = this.getListDataDetailSource(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF300> getListDataDetailSource(HttpServletRequest request, Boolean bExcel) {

        List<MPF300> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);

            lst = logic.loadMPS442(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDataDetailPrincipal")
    public @ResponseBody
    String searchDataDetailPrincipal(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<MPF300> lst = this.getListDataDetailPrincipal(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF300> getListDataDetailPrincipal(HttpServletRequest request, Boolean bExcel) {

        List<MPF300> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS443(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDataDetailSecundary")
    public @ResponseBody
    String searchDataDetailSecundary(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<MPF300> lst = this.getListDataDetailSecundary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF300> getListDataDetailSecundary(HttpServletRequest request, Boolean bExcel) {

        List<MPF300> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS444(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDataDetailPrincipalSource")
    public @ResponseBody
    String searchDataDetailPrincipalSource(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<MPF300> lst = this.getListDataDetailPrincipalSource(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF300> getListDataDetailPrincipalSource(HttpServletRequest request, Boolean bExcel) {

        List<MPF300> lst = new ArrayList<>(0);
        MPF108Filter filter = new MPF108Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF108Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS445(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXDetailSecundary")
    public @ResponseBody
    void getXLSXDetailSecundary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailSecundary");
        String fileNameDownload = "Report_" + Functions.getFechaActual() + ".xlsx";
        SXSSFWorkbook workbook = new SXSSFWorkbook(500);
        workbook.setCompressTempFiles(true);

        try {
            List<MPF300> listaData = this.getListDataDetailSecundary(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            Sheet sheet = workbook.createSheet("Report");

            // ======== ESTILOS ===========
            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor((short) 22); // gris / compatible POI 3.7-3.9
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);

            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);

            // ======== CABECERA ===========
            String[] columnas = {
                "Nbr.", "Ticket", "Status", "Source", "Type", "Form Payment", "Sales Date",
                "Country", "Agent", "Transaction", "Days Pending", "Currency", "SVFOP", "SVFOPNETR"
            };

            int rowIndex = 0;
            Row headerRow = sheet.createRow(rowIndex++);

            for (int i = 0; i < columnas.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            // ======== CUERPO (STREAMING REAL) ===========
            for (MPF300 bean : listaData) {
                Row row = sheet.createRow(rowIndex++);
                int c = 0;

                row.createCell(c++).setCellValue(bean.RN);
                row.createCell(c++).setCellValue(bean.strTicket);
                row.createCell(c++).setCellValue(bean.STVAL);
                row.createCell(c++).setCellValue(bean.CFUENTE);
                row.createCell(c++).setCellValue(bean.TDOC);
                row.createCell(c++).setCellValue(bean.SPAYMENT);
                row.createCell(c++).setCellValue(bean.SDATE);
                row.createCell(c++).setCellValue(bean.SCOUNTRY);
                row.createCell(c++).setCellValue(bean.SAGENT);
                row.createCell(c++).setCellValue(bean.TRNCU);
                row.createCell(c++).setCellValue(bean.DIFFDAYS);
                row.createCell(c++).setCellValue(bean.SCURRENCY);
                row.createCell(c++).setCellValue(bean.SVFOP);
                row.createCell(c++).setCellValue(bean.SVFOPNETR);

                // aplicar estilo sin crear objetos nuevos
                for (int i = 0; i < columnas.length; i++) {
                    row.getCell(i).setCellStyle(bodyStyle);
                }
            }

            // No uses autoSizeColumn → revienta SXSSF
            // (AutoSize requiere cargar TODAS las filas → rompre streaming)
            // sheet.autoSizeColumn(x) SOLO funciona con XSSFWorkbook.
            // ======== OUTPUT ===========
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);

        } finally {
            workbook.dispose();
        }
    }

    @RequestMapping(value = "getXLSXDetailPrincipal")
    public @ResponseBody
    void getXLSXDetailPrincipal(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Report : getXLSXDetailPrincipal");
        String fileNameDownload = "Report_" + Functions.getFechaActual() + ".xlsx";

        SXSSFWorkbook workbook = new SXSSFWorkbook(500);
        workbook.setCompressTempFiles(true); // comprime archivos temporales (menos disco)

        try {
            List<MPF300> listaData = this.getListDataDetailPrincipal(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            Sheet sheet = workbook.createSheet("Report");

            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            headerStyle.setFillForegroundColor((short) 22);
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);

            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);

            int rowIndex = 0;

            String[] columnas = {
                "Nbr.", "Ticket", "Status", "Source", "Type", "Form Payment", "Sales Date",
                "Country", "Agent", "Transaction", "Days Pending", "Currency", "Amount"
            };

            Row header = sheet.createRow(rowIndex++);

            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            for (MPF300 bean : listaData) {
                Row row = sheet.createRow(rowIndex++);
                int c = 0;

                row.createCell(c++).setCellValue(bean.RN);
                row.createCell(c++).setCellValue(bean.strTicket);
                row.createCell(c++).setCellValue(bean.STVAL);
                row.createCell(c++).setCellValue(bean.CFUENTE);
                row.createCell(c++).setCellValue(bean.TDOC);
                row.createCell(c++).setCellValue(bean.SPAYMENT);
                row.createCell(c++).setCellValue(bean.SDATE);
                row.createCell(c++).setCellValue(bean.SCOUNTRY);
                row.createCell(c++).setCellValue(bean.SAGENT);
                row.createCell(c++).setCellValue(bean.TRNCU);
                row.createCell(c++).setCellValue(bean.DIFFDAYS);
                row.createCell(c++).setCellValue(bean.SCURRENCY);
                row.createCell(c++).setCellValue(bean.SVFOP);

                for (int i = 0; i < columnas.length; i++) {
                    row.getCell(i).setCellStyle(bodyStyle);
                }
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);

        } finally {
            workbook.dispose();
        }
    }

    @RequestMapping(value = "getXLSXDashboard")
    public @ResponseBody
    void getXLSXDashboard(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDashboard");
        String fileNameDownload = String.format("Report  Dashboard - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF108> listaData = this.getListsearch(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerF1 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle baseHeaderStyle = (XSSFCellStyle) workbook.createCellStyle();
            baseHeaderStyle.setAlignment(CellStyle.ALIGN_CENTER);
            baseHeaderStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            baseHeaderStyle.setBorderRight(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderBottom(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderLeft(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderTop(CellStyle.BORDER_THIN);
            baseHeaderStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setFont(headerFont);

            XSSFCellStyle headerMain = (XSSFCellStyle) workbook.createCellStyle();
            headerMain.cloneStyleFrom(baseHeaderStyle);
            headerMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex()); // azul grisáceo aprox
            headerMain.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerF1.setBorderRight(CellStyle.BORDER_THIN);
            headerF1.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderBottom(CellStyle.BORDER_THIN);
            headerF1.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderLeft(CellStyle.BORDER_THIN);
            headerF1.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderTop(CellStyle.BORDER_THIN);
            headerF1.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setAlignment(CellStyle.ALIGN_CENTER);
            headerF1.setFillForegroundColor(new XSSFColor(new java.awt.Color(244, 204, 204)));
            headerF1.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerF1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            XSSFCellStyle headerF2 = (XSSFCellStyle) workbook.createCellStyle();
            headerF2.cloneStyleFrom(baseHeaderStyle);
            headerF2.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex()); // verde claro
            headerF2.setFillPattern(CellStyle.SOLID_FOREGROUND);

            XSSFCellStyle headerF3 = (XSSFCellStyle) workbook.createCellStyle();
            headerF3.cloneStyleFrom(baseHeaderStyle);
            headerF3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // gris claro
            headerF3.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // ====== NIVEL 1 ======
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);

            CH1_0.setCellValue("Month");
            CH1_1.setCellValue("Society");
            CH1_2.setCellValue("Tickets");

            CH1_0.setCellStyle(headerMain);
            CH1_1.setCellStyle(headerMain);
            CH1_2.setCellStyle(headerF1);

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            ++vj;

            // ====== NIVEL 2 ======
            Row row2 = sheet.createRow(vj);
            String[] headers2 = {"", "", "Total", "Match", "", "", "", "Accounted", ""};
            for (int c = 0; c < headers2.length; c++) {
                Cell ch = row2.createCell(c);
                ch.setCellValue(headers2[c]);

                if (c <= 1) {
                    ch.setCellStyle(headerMain);
                } else if (c >= 2 && c <= 8) {
                    ch.setCellStyle(headerF1);
                } else {
                    ch.setCellStyle(headerF3);
                }
            }

            // Merges nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            ++vj;

            // ====== NIVEL 3 ======
            Row row3 = sheet.createRow(vj);
            String[] headers3 = {"", "", "", "Auto", "%", "Manual", "W/O Settlement", "Pending",
                "Processed"};
            for (int c = 0; c < headers3.length; c++) {
                Cell ch = row3.createCell(c);
                ch.setCellValue(headers3[c]);
                if (c <= 1) {
                    ch.setCellStyle(headerMain);
                } else if (c >= 2 && c <= 8) {
                    ch.setCellStyle(headerF1);
                } else if (c >= 9 && c <= 13) {
                    ch.setCellStyle(headerF2);
                } else {
                    ch.setCellStyle(headerF3);
                }
            }

            // Merges nivel 3
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            ++vj;

            //============================================
            CellStyle bodyStylePercent = workbook.createCellStyle();
            bodyStylePercent.cloneStyleFrom(bodyStyle);
            bodyStylePercent.setDataFormat(workbook.createDataFormat().getFormat("0.00%"));

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

                MPF108 item = listaData.get(vi);

                rcell0.setCellValue(item.SDATE);
                rcell1.setCellValue(item.CCUST);
                rcell2.setCellValue(item.QSALES);
                rcell3.setCellValue(item.QMATCH);
                rcell4.setCellValue(item.PCT_MATCH);
                rcell5.setCellValue(item.QMANUAL);
                rcell6.setCellValue(item.QPEND);
                rcell7.setCellValue(item.QPOLIPE);
                rcell8.setCellValue(item.QPOLIC);

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

    @RequestMapping(value = "getXLSXDashboardSource")
    public @ResponseBody
    void getXLSXDashboardSource(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDashboardSource");
        String fileNameDownload = String.format("Report  Dashboard Source- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF300> listaData = this.getListDataDetailSource(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerF1 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle baseHeaderStyle = (XSSFCellStyle) workbook.createCellStyle();
            baseHeaderStyle.setAlignment(CellStyle.ALIGN_CENTER);
            baseHeaderStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            baseHeaderStyle.setBorderRight(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderBottom(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderLeft(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderTop(CellStyle.BORDER_THIN);
            baseHeaderStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setFont(headerFont);

            XSSFCellStyle headerMain = (XSSFCellStyle) workbook.createCellStyle();
            headerMain.cloneStyleFrom(baseHeaderStyle);
            headerMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex()); // azul grisáceo aprox
            headerMain.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerF1.setBorderRight(CellStyle.BORDER_THIN);
            headerF1.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderBottom(CellStyle.BORDER_THIN);
            headerF1.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderLeft(CellStyle.BORDER_THIN);
            headerF1.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderTop(CellStyle.BORDER_THIN);
            headerF1.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setAlignment(CellStyle.ALIGN_CENTER);
            headerF1.setFillForegroundColor(new XSSFColor(new java.awt.Color(244, 204, 204)));
            headerF1.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerF1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            XSSFCellStyle headerF2 = (XSSFCellStyle) workbook.createCellStyle();
            headerF2.cloneStyleFrom(baseHeaderStyle);
            headerF2.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex()); // verde claro
            headerF2.setFillPattern(CellStyle.SOLID_FOREGROUND);

            XSSFCellStyle headerF3 = (XSSFCellStyle) workbook.createCellStyle();
            headerF3.cloneStyleFrom(baseHeaderStyle);
            headerF3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // gris claro
            headerF3.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // ====== NIVEL 1 ======
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);

            CH1_0.setCellValue("Month");
            CH1_1.setCellValue("Source");
            CH1_2.setCellValue("Tickets");

            CH1_0.setCellStyle(headerMain);
            CH1_1.setCellStyle(headerMain);
            CH1_2.setCellStyle(headerF1);

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            ++vj;

            // ====== NIVEL 2 ======
            Row row2 = sheet.createRow(vj);
            String[] headers2 = {"", "", "Total", "Match", "", "", "", "Accounted", ""};
            for (int c = 0; c < headers2.length; c++) {
                Cell ch = row2.createCell(c);
                ch.setCellValue(headers2[c]);

                if (c <= 1) {
                    ch.setCellStyle(headerMain);
                } else if (c >= 2 && c <= 8) {
                    ch.setCellStyle(headerF1);
                } else {
                    ch.setCellStyle(headerF3);
                }
            }

            // Merges nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            ++vj;

            // ====== NIVEL 3 ======
            Row row3 = sheet.createRow(vj);
            String[] headers3 = {"", "", "", "Auto", "%", "Manual", "W/O Settlement", "Pending",
                "Processed"};
            for (int c = 0; c < headers3.length; c++) {
                Cell ch = row3.createCell(c);
                ch.setCellValue(headers3[c]);
                if (c <= 1) {
                    ch.setCellStyle(headerMain);
                } else if (c >= 2 && c <= 8) {
                    ch.setCellStyle(headerF1);
                } else if (c >= 9 && c <= 13) {
                    ch.setCellStyle(headerF2);
                } else {
                    ch.setCellStyle(headerF3);
                }
            }

            // Merges nivel 3
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            ++vj;

            //============================================
            CellStyle bodyStylePercent = workbook.createCellStyle();
            bodyStylePercent.cloneStyleFrom(bodyStyle);
            bodyStylePercent.setDataFormat(workbook.createDataFormat().getFormat("0.00%"));

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

                MPF300 item = listaData.get(vi);

                rcell0.setCellValue(item.SDATE);
                rcell1.setCellValue(item.CFUENTE);
                rcell2.setCellValue(item.QSALES);
                rcell3.setCellValue(item.QMATCH);
                rcell4.setCellValue(item.PCT_MATCH);
                rcell5.setCellValue(item.QMANUAL);
                rcell6.setCellValue(item.QPEND);
                rcell7.setCellValue(item.QPOLIPE);
                rcell8.setCellValue(item.QPOLIC);

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

    @RequestMapping(value = "getXLSXDetailPrincipalSource")
    public @ResponseBody
    void getXLSXDetailPrincipalSource(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Report : getXLSXDetailPrincipalSource");
        String fileNameDownload = "Report_" + Functions.getFechaActual() + ".xlsx";

        SXSSFWorkbook workbook = new SXSSFWorkbook(500);
        workbook.setCompressTempFiles(true); // comprime archivos temporales (menos disco)

        try {
            List<MPF300> listaData = this.getListDataDetailPrincipalSource(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            Sheet sheet = workbook.createSheet("Report");

            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            headerStyle.setFillForegroundColor((short) 22);
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);

            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);

            int rowIndex = 0;

            String[] columnas = {
                "Nbr.", "Ticket", "Status", "Source", "Type", "Form Payment", "Sales Date",
                "Country", "Agent", "Transaction", "Days Pending", "Currency", "Amount"
            };

            Row header = sheet.createRow(rowIndex++);

            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            for (MPF300 bean : listaData) {
                Row row = sheet.createRow(rowIndex++);
                int c = 0;

                row.createCell(c++).setCellValue(bean.RN);
                row.createCell(c++).setCellValue(bean.strTicket);
                row.createCell(c++).setCellValue(bean.STVAL);
                row.createCell(c++).setCellValue(bean.CFUENTE);
                row.createCell(c++).setCellValue(bean.TDOC);
                row.createCell(c++).setCellValue(bean.SPAYMENT);
                row.createCell(c++).setCellValue(bean.SDATE);
                row.createCell(c++).setCellValue(bean.SCOUNTRY);
                row.createCell(c++).setCellValue(bean.SAGENT);
                row.createCell(c++).setCellValue(bean.TRNCU);
                row.createCell(c++).setCellValue(bean.DIFFDAYS);
                row.createCell(c++).setCellValue(bean.SCURRENCY);
                row.createCell(c++).setCellValue(bean.SVFOP);

                for (int i = 0; i < columnas.length; i++) {
                    row.getCell(i).setCellStyle(bodyStyle);
                }
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);

        } finally {
            workbook.dispose();
        }
    }

}
