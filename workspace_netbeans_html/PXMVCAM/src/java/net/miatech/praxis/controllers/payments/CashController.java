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
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", 
                    this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            CashLogic logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaDataSales = logic.loadPX263SQP00652(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaDataSales);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaDataSales);
                map.put("total", listaDataSales.size() > 0 ? listaDataSales.get(0).page.TOTROW : 0);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    public List<A2282Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2282Filter> lst = new ArrayList<>(0);
        A2282Filter filter = new A2282Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2282Filter.class);
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

            lst = logic.loadPX268SQP00675(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTKT")
    public @ResponseBody
    String searchTKT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BSPLink : searchTKT-------------");

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            List<A2282Filter> lst = this.getListTKT(request, false);

            map.put("success", true);
            map.put("data", lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    public List<A2282Filter> getListTKT(HttpServletRequest request, Boolean bExcel) {

        List<A2282Filter> lst = new ArrayList<>(0);
        A2282Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2282Filter.class);
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
            lst = logic.loadPX268SQP00907(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "/searchDetMonth")
    public @ResponseBody
    String searchDetMonth(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            CashLogic logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX100NEW(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchDetDay")
    public @ResponseBody
    String searchDetDay(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            CashLogic logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX100DetailDay(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            CashLogic logic = new CashLogic();
            logic.setSession(this.serverSession.getServerSession());
            A2290Filter filter = new A2290Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            List<A2290Filter> listaData = logic.loadPX263SQP00652(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            // ==== Estilos ====
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

            int vj = 0;

            // ==== Nivel 1 (encabezados principales) ====
            Row row1 = sheet.createRow(vj);
            Cell h0 = row1.createCell(0);
            h0.setCellValue("Sales");
            h0.setCellStyle(headerStyle);

            Cell h1 = row1.createCell(1);
            h1.setCellValue("Sales Total");
            h1.setCellStyle(headerStyle);

            Cell h2 = row1.createCell(4);
            h2.setCellValue("Conciliacion Cash");
            h2.setCellStyle(headerStyle);

            // Merges
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0)); // "Sales" (Date)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3)); // "Sales Total"
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 6)); // "Conciliacion Cash"

            ++vj;

            // ==== Nivel 2 (subcolumnas) ====
            Row row2 = sheet.createRow(vj);

            Cell s0 = row2.createCell(0);
            s0.setCellValue("Date");
            s0.setCellStyle(headerStyle);

            Cell s1 = row2.createCell(1);
            s1.setCellValue("ARC");
            s1.setCellStyle(headerStyle);

            Cell s2 = row2.createCell(2);
            s2.setCellValue("BSP");
            s2.setCellStyle(headerStyle);

            Cell s3 = row2.createCell(3);
            s3.setCellValue("Venta directa");
            s3.setCellStyle(headerStyle);

            Cell s4 = row2.createCell(4);
            s4.setCellValue("ARC");
            s4.setCellStyle(headerStyle);

            Cell s5 = row2.createCell(5);
            s5.setCellValue("BSP");
            s5.setCellStyle(headerStyle);

            Cell s6 = row2.createCell(6);
            s6.setCellValue("Venta directa");
            s6.setCellStyle(headerStyle);

            ++vj;

            // ==== Datos ====
            int vi = 0;
            for (A2290Filter data : listaData) {
                Row row = sheet.createRow(vj);

                Cell c0 = row.createCell(0);
                c0.setCellValue(data.strFormatDate);
                c0.setCellStyle(bodyStyle);

                Cell c1 = row.createCell(1);
                c1.setCellValue(data.lngARC);
                c1.setCellStyle(bodyStyle);

                Cell c2 = row.createCell(2);
                c2.setCellValue(data.lngBSP);
                c2.setCellStyle(bodyStyle);

                Cell c3 = row.createCell(3);
                c3.setCellValue(data.lngVentaDirecta);
                c3.setCellStyle(bodyStyle);

                Cell c4 = row.createCell(4);
                c4.setCellValue(data.lngArcConc);
                c4.setCellStyle(bodyStyle);

                Cell c5 = row.createCell(5);
                c5.setCellValue(data.lngBspConc);
                c5.setCellStyle(bodyStyle);

                Cell c6 = row.createCell(6);
                c6.setCellValue(data.lngVentaDirectaConc);
                c6.setCellStyle(bodyStyle);

                vj++;
                vi++;
            }

            // ==== Total al final ====
            Row totalRow = sheet.createRow(vj);
            Cell totalCell = totalRow.createCell(0);
            totalCell.setCellValue("Total");
            totalCell.setCellStyle(headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 6));

            // ==== Autosize ====
            for (int i = 0; i <= 6; i++) {
                sheet.autoSizeColumn(i, true);
            }

            // ==== Descargar ====
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


