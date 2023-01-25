/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.A1413Filter;
import net.miatech.praxis.logic.flown.OwnerlessCouponLogic;
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
@RequestMapping("/OwnerlessCoupon")
public class OwnerlessCouponController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private OwnerlessCouponLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/OwnerlessCoupon/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- OwnerlessCoupon : Controller-------------");
        map.put("success", true);
        List<A1413Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        System.out.println("---> Total : " + lst.get(0).page.TOTROW);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchBeans")
    public @ResponseBody
    String searchBeans(ModelMap map, HttpServletRequest request) {

        A1413Filter bean;
        A1413Filter filter = new A1413Filter();
        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();
        filter.A1413DATE = request.getParameter("A1413DATE");
        filter.A1413CIA = request.getParameter("A1413CIA");
        filter.A1413FORSE = request.getParameter("A1413FORSE");
        filter.A1413CUPON = request.getParameter("A1413CUPON");

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            bean = logic.loadPX235SQP00257(filter, hmAeropuertos);
            map.put("success", true);
            map.put("beanCons", bean);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanCarr")
    public @ResponseBody
    String searchBeanCarr(ModelMap map, HttpServletRequest request) {

        A1691Filter bean;
        A1691Filter filter = new A1691Filter();
        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();

        filter.DFLIGHT = request.getParameter("DFLIGHT");
        filter.NFLIGHT = request.getParameter("NFLIGHT");
        filter.CDEPART = request.getParameter("CDEPART");
        filter.CARRIVA = request.getParameter("CARRIVA");

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            bean = logic.loadPX095S04A1691(filter, hmAeropuertos);
            map.put("success", true);
            map.put("beanCons", bean);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validFlight")
    public @ResponseBody
    String validFlight(ModelMap map, HttpServletRequest request) {
        String msj = "";
        logic = new OwnerlessCouponLogic();
        try {

            //Validando que las ciudades de Origen y Destino existan ===========
            A1413Filter bean92 = new A1413Filter();
            bean92.A1413FVLOB = request.getParameter("A1413FVLOB");
            bean92.A1413NVLOB = request.getParameter("A1413NVLOB");
            bean92.A1413FROM = request.getParameter("A1413FROM");
            bean92.A1413TO = request.getParameter("A1413TO");
            bean92.A1413TO = request.getParameter("A1413TO");

            System.out.println("A1413FVLOB - " + bean92.A1413FVLOB);
            System.out.println("A1413NVLOB - " + bean92.A1413NVLOB);
            System.out.println("A1413FROM - " + bean92.A1413FROM);
            System.out.println("A1413TO - " + bean92.A1413TO);
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX235SQP00257VALID(bean92);

        } catch (SQLException e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        map.put("success", true);
        map.put("msj", msj);
        System.out.println(" --- Controller msj : " + msj);
        return new Gson().toJson(map);
    }

    public List<A1413Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new OwnerlessCouponLogic();

        List<A1413Filter> lst = new ArrayList<>(0);
        A1413Filter filter = new A1413Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");
            filter.IN_TKT = request.getParameter("ticketNumber");
            filter.IN_STCRU = request.getParameter("cmbStatus");
            filter.IN_NVLOB = request.getParameter("txtNVLO");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println(" IN_TKT : " + request.getParameter("ticketNumber"));
            System.out.println(" IN_STCRU : " + request.getParameter("cmbStatus"));
            System.out.println(" IN_NVLOB : " + request.getParameter("txtNVLO"));
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

            if (filter.IN_TKT.length() < 13) {
                lst = logic.loadPX235SQP00252(filter);
            } else {
                lst = logic.loadPX235SQP00253(filter);
            }
            if (lst.get(0).page.TOTROW < 0) {
                lst.get(0).page.TOTROW = 0;
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "searchCarrier")
    public @ResponseBody
    String searchCarrier(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A1691Filter> lst = this.getListCarrier(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1691Filter> getListCarrier(HttpServletRequest request, Boolean bExcel) {

        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();

        List<A1691Filter> lst = new ArrayList<>(0);
        A1691Filter filter = new A1691Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());

            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
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

            lst = logic.loadPX235SQP00905(filter, hmAeropuertos);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "searchCanceled")
    public @ResponseBody
    String searchCanceled(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A1691Filter> lst = this.getListCanceled(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1691Filter> getListCanceled(HttpServletRequest request, Boolean bExcel) {

        logic = new OwnerlessCouponLogic();
        masterDAO = new MasterDAO();

        List<A1691Filter> lst = new ArrayList<>(0);
        A1691Filter filter = new A1691Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());

            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");
            filter.IN_NFLIGHT = request.getParameter("txtNVLO");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println(" txtNVLO : " + request.getParameter("txtNVLO"));
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

            lst = logic.loadPX235SQP04158(filter, hmAeropuertos);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report Ownerless Coupon : getXLSX");
        String fileNameDownload = String.format("Report Ownerless Coupon  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1413Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report Ownerless Coupon");
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

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Flight");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("Transaction");
            CH1_4.setCellValue("Join");
            CH1_5.setCellValue("Orig");
            CH1_6.setCellValue("Dest");
            CH1_7.setCellValue("Flag Flown");
            CH1_8.setCellValue("Status");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
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

            CH2_0.setCellValue("Number");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Number");
            CH2_3.setCellValue("Date");
            CH2_4.setCellValue("Date");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("Flown");
            CH2_8.setCellValue("");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
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

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).strFormatDate);
                rcell2.setCellValue(listaData.get(vi).A1413NVLOB);
                rcell3.setCellValue(listaData.get(vi).strFormatDate2);
                rcell4.setCellValue(listaData.get(vi).strDescripcion);
                rcell5.setCellValue(listaData.get(vi).A1413FROM);
                rcell6.setCellValue(listaData.get(vi).A1413TO);
                rcell7.setCellValue(listaData.get(vi).FFLOWN);
                rcell8.setCellValue(listaData.get(vi).A1413STCRU);
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

    @RequestMapping(value = "getXLSXCarrier")
    public @ResponseBody
    void getXLSXCarrier(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report Different Carrier : getXLSXCarrier");
        String fileNameDownload = String.format("Report Different Carrier  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1691Filter> listaData = this.getListCarrier(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report Different Carrier");
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

            CH1_0.setCellValue("SSIM Data");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("Information PAX ODS");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("ODS Data");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("LEG");
            CH1_14.setCellValue("VCR Data");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("OCR");
            CH1_17.setCellValue("Manual");
            CH1_18.setCellValue("Total");
            CH1_19.setCellValue("Coupons");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 15));
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

            CH2_0.setCellValue("Flight");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("Carrier");
            CH2_3.setCellValue("Flown Type");
            CH2_4.setCellValue("Orig");
            CH2_5.setCellValue("Dest");
            CH2_6.setCellValue("Received");
            CH2_7.setCellValue("Senior");
            CH2_8.setCellValue("Children");
            CH2_9.setCellValue("Infant");
            CH2_10.setCellValue("Transit");
            CH2_11.setCellValue("Received");
            CH2_12.setCellValue("Qty");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("Received");
            CH2_15.setCellValue("Qty");
            CH2_16.setCellValue("Qty");
            CH2_17.setCellValue("Qty");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("Valued");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 1));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);

            CH3_0.setCellValue("Date");
            CH3_1.setCellValue("Number");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("Date");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("Date");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("Date");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));
            
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).NFLIGHT);
                rcell2.setCellValue(listaData.get(vi).CARRI);
                rcell3.setCellValue(listaData.get(vi).strDescFFLOW);
                rcell4.setCellValue(listaData.get(vi).CDEPART);
                rcell5.setCellValue(listaData.get(vi).CARRIVA);
                rcell6.setCellValue(listaData.get(vi).strFormatFSENDSS);
                rcell7.setCellValue(listaData.get(vi).QCPAD);
                rcell8.setCellValue(listaData.get(vi).QCPCHD);
                rcell9.setCellValue(listaData.get(vi).QCPINF);
                rcell10.setCellValue(listaData.get(vi).QCPTRA);
                rcell11.setCellValue(listaData.get(vi).strFormatFSENDOD);
                rcell12.setCellValue(listaData.get(vi).QCPNOD);
                rcell13.setCellValue(listaData.get(vi).QCPNLEG);
                rcell14.setCellValue(listaData.get(vi).strFormatFSENDVC);
                rcell15.setCellValue(listaData.get(vi).QCPNVC);
                rcell16.setCellValue(listaData.get(vi).QCPNOCR);
                rcell17.setCellValue(listaData.get(vi).QCPNMA);
                rcell18.setCellValue(listaData.get(vi).QCPNTOT);
                rcell19.setCellValue(listaData.get(vi).QCPNVAL);
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

    @RequestMapping(value = "getXLSXCanceled")
    public @ResponseBody
    void getXLSXCanceled(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report Cancelled Flight : getXLSXCanceled");
        String fileNameDownload = String.format("Report Cancelled Flight  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1691Filter> listaData = this.getListCanceled(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report Cancelled Flight");
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

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("Orig");
            CH1_3.setCellValue("Dest");
            CH1_4.setCellValue("Status");
            CH1_5.setCellValue("ODS Cancelled");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("ODS Operated");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Number");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("Creation User");
            CH2_6.setCellValue("Creation Date");
            CH2_7.setCellValue("Creation Hour");
            CH2_8.setCellValue("Pax Total");
            CH2_9.setCellValue("Creation User");
            CH2_10.setCellValue("Creation Date");
            CH2_11.setCellValue("Creation Hour");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
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

                rcell0.setCellValue(listaData.get(vi).DFLIGHT);
                rcell1.setCellValue(listaData.get(vi).NFLIGHT);
                rcell2.setCellValue(listaData.get(vi).CDEPART);
                rcell3.setCellValue(listaData.get(vi).CARRIVA);
                rcell4.setCellValue(listaData.get(vi).STVAL);
                rcell5.setCellValue(listaData.get(vi).A3778USCR);
                rcell6.setCellValue(listaData.get(vi).A3778FECR);
                rcell7.setCellValue(listaData.get(vi).A3778HOCR);
                rcell8.setCellValue(listaData.get(vi).PAXTOTAL);
                rcell9.setCellValue(listaData.get(vi).A1688USCR);
                rcell10.setCellValue(listaData.get(vi).A1688FECR);
                rcell11.setCellValue(listaData.get(vi).A1688HOCR);
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

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Ownerless Coupon : Mantenimiento");
        A1413Filter filter = new A1413Filter();
        String strOption = "";
        String msj = "";
        try {

            logic = new OwnerlessCouponLogic();
            logic.setSession(this.serverSession.getServerSession());
            strOption = request.getParameter("strOption");

            filter.A1413DATE = request.getParameter("A1413DATE");
            filter.A1413SEC = request.getParameter("A1413SEC");
            filter.A1413DATA = request.getParameter("A1413DATA");
            filter.A1413STATU = request.getParameter("A1413STATU");
            filter.A1413CIA = request.getParameter("A1413CIA");
            filter.A1413FORSE = request.getParameter("A1413FORSE");
            filter.A1413CUPON = request.getParameter("A1413CUPON");
            filter.A1413FROM = request.getParameter("A1413FROM");
            filter.A1413TO = request.getParameter("A1413TO");
            filter.A1413STCRU = request.getParameter("A1413STCRU");
            filter.A1413FVLO = request.getParameter("A1413FVLO");
            filter.A1413TYPE = request.getParameter("A1413TYPE");
            filter.A1413SOURC = request.getParameter("A1413SOURC");
            filter.A1413PNROR = request.getParameter("A1413PNROR");
            filter.A1413PNR = request.getParameter("A1413PNR");
            filter.A1413FFCIA = request.getParameter("A1413FFCIA");
            filter.A1413FFCOD = request.getParameter("A1413FFCOD");
            filter.A1413FVTA = request.getParameter("A1413FVTA");
            filter.A1413NPAX = request.getParameter("A1413NPAX");
            filter.A1413FVLOB = request.getParameter("A1413FVLOB");
            filter.A1413NVLOB = request.getParameter("A1413NVLOB");
            filter.A1413CITYB = request.getParameter("A1413CITYB");
            filter.A1413FCONT = request.getParameter("A1413FCONT");

            msj = logic.loadPX235SQP00257ENTRY(filter, strOption);

        } catch (SQLException e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

    @RequestMapping(value = "load_A1413")
    public @ResponseBody
    String load_A1413(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- OwnerlessCouponController : load_A1413-------------");
        
        A1413Filter bean;
        A1413Filter filter = new A1413Filter();
        Gson gson = new Gson();
        String beanString = "";
        String type = "";

        try {
            logic = new OwnerlessCouponLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanString = request.getParameter("beanString");
            type = request.getParameter("type");
            
            filter = gson.fromJson(beanString, A1413Filter.class);
            bean = logic.loadSQP04497(filter, type);
            
            map.put("success", true);
            map.put("bean", bean);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    
//    public JavaToFlexResponse insertFavoriteMenu(A2149 filter) {//camviar A1939Filter
//        A2149 objRtn;
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "BwrAccounting : insertFavoriteMenu");
//        try {
//            LoadFlownLogic logic = new LoadFlownLogic();
//            logic.setSession(serverSession);
//            String result = null;
//            objRtn = logic.insertFavoriteMenu(filter);
//
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//        return resp;
//    }
//
//    public JavaToFlexResponse deleteFavoriteMenu(A2149 filter) {//camviar A1939Filter
//        A2149 objRtn;
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "BwrAccounting : deleteFavoriteMenu");
//        try {
//            LoadFlownLogic logic = new LoadFlownLogic();
//            logic.setSession(serverSession);
//            String result = null;
//            objRtn = logic.deleteFavoriteMenu(filter);
//
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//        return resp;
//    }
}
