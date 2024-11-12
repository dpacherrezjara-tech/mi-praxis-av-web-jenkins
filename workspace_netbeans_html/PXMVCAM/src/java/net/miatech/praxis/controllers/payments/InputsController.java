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
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.InputsLogic;
import net.miatech.praxis.payment.A2359;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
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
@RequestMapping("/Inputs")
public class InputsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InputsLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Inputs/form_index";
    }

    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        A1686Filter filter = new A1686Filter();
        List<A006> lstPaises = null;
        HashMap hm;
        String consulta = null;

        try {
            InputsLogic logic = new InputsLogic();
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            consulta = request.getParameter("consulta");

            hm = logic.loadPX264SQP00664(filter, consulta);
            lstPaises = masterDAO.loadPaises2();
            map.put("success", true);
            map.put("lstFuentes", hm.get("lstFuentes"));
            map.put("lstProgramas", hm.get("lstProgramas"));
            map.put("lstPaises", lstPaises);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Inputs : Search -------------");

        map.put("success", true);
        List<A1686Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1686Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1686Filter> lst = new ArrayList<>(0);
        A1686Filter filter = new A1686Filter();

        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new InputsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1686Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadPX264SQP02957(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Inputs : Search Detail-------------");

        map.put("success", true);
        List<A1686Filter> lst = this.getListDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1686Filter> getListDetail(HttpServletRequest request, Boolean bExcel) {

        List<A1686Filter> lst = new ArrayList<>(0);
        A1686Filter filter = new A1686Filter();

        Gson gson = new Gson();
        String beanString = "";
        String consulta = "1";
        try {
            logic = new InputsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1686Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadPX264SQP00665(filter, consulta);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCalendar")
    public @ResponseBody
    String searchCalendar(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Inputs : searchCalendar-------------");

        logic = new InputsLogic();
        List<A1686Filter> lst = new ArrayList<>(0);
        A1686Filter filter = new A1686Filter();
        Gson gson = new Gson();
        String consulta = "1";

        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            consulta = request.getParameter("consulta");
            filter = gson.fromJson(beanString, A1686Filter.class);

            lst = logic.loadPX264SQP00691(filter, consulta);
        } catch (Exception e) {
            System.out.println("--" + e.getMessage());
        }
        map.put("success", true);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
//
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Report : getXLSX");
//        String fileNameDownload = String.format("Inputs Control  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A1686Filter> listaData = this.getList(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);
//
//            CH1_0.setCellValue("Seq");
//            CH1_1.setCellValue("Processing");
//            CH1_2.setCellValue("Files");
//            CH1_7.setCellValue("Control");
//            CH1_12.setCellValue("BSP");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 14));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//            Cell CH2_9 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Expected");
//            CH2_3.setCellValue("Received");
//            CH2_4.setCellValue("Loaded");
//            CH2_5.setCellValue("Not Found");
//            CH2_6.setCellValue("Error");
//            CH2_7.setCellValue("Expected");
//            CH2_8.setCellValue("Received");
//            CH2_9.setCellValue("Loaded");
//            CH2_10.setCellValue("Not Found");
//            CH2_11.setCellValue("Error");
//            CH2_12.setCellValue("Received");
//            CH2_13.setCellValue("Loaded");
//            CH2_14.setCellValue("Error");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
//            CH2_9.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).strFormatDate);
//                rcell2.setCellValue(listaData.get(vi).QEXPT);
//                rcell3.setCellValue(listaData.get(vi).QRECT);
//                rcell4.setCellValue(listaData.get(vi).QRECL);
//                rcell5.setCellValue(listaData.get(vi).QRECN);
//                rcell6.setCellValue(listaData.get(vi).QRECE);
//                rcell7.setCellValue(listaData.get(vi).QEXPB);
//                rcell8.setCellValue(listaData.get(vi).QCONT);
//                rcell9.setCellValue(listaData.get(vi).QCONL);
//                rcell10.setCellValue(listaData.get(vi).QCONN);
//                rcell11.setCellValue(listaData.get(vi).QCONE);
//                rcell12.setCellValue(listaData.get(vi).QBSPT);
//                rcell13.setCellValue(listaData.get(vi).QBSPL);
//                rcell14.setCellValue(listaData.get(vi).QBSPE);
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
//
//    @RequestMapping(value = "searchCity")
//    public @ResponseBody
//    String searchCity(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- Inputs : searchCity-------------");
//
//        map.put("success", true);
//        List<A1686Filter> lst = new ArrayList<>(0);
//        A1686Filter filter = new A1686Filter();
//        Gson gson = new Gson();
//
//        try {
//
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//
//            String beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, A1686Filter.class);
//
//            lst = logic.loadPX264SQP002464(filter);
//            map.put("data", lst);
//            map.put("success", true);
//        } catch (Exception ex) {
//            java.util.logging.Logger.getLogger(InputsController.class.getName()).log(Level.SEVERE, null, ex);
//            map.put("success", false);
//        }
//        return new Gson().toJson(map);
//    }
//

    @RequestMapping(value = "searchDelivery")
    public @ResponseBody
    String searchDelivery(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Inputs : searchDelivery-------------");

        map.put("success", true);
        A1686Filter filter = new A1686Filter();
        List<A1686Filter> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String consulta = "";

        try {
            String beanString = request.getParameter("beanString");
            consulta = request.getParameter("consulta");
            filter = gson.fromJson(beanString, A1686Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new InputsLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadPX264SQP00667(filter, consulta);

            System.out.println("Total : " + lst.size());
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);

        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(InputsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("data", lst);
        }
        return new Gson().toJson(map);
    }
//
//    @RequestMapping(value = "searchCompleteDetail")
//    public @ResponseBody
//    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- Inputs : searchCompleteDetail-------------");
//
//        Gson gson = new Gson();
//        A1691Filter filter = new A1691Filter();
//        A1691Filter result = new A1691Filter();
//
//        String beanString = request.getParameter("beanString");
//        filter = gson.fromJson(beanString, A1691Filter.class);
//
//        logic = new InputsLogic();
//        logic.setSession(this.serverSession.getServerSession());
//        try {
//            result = logic.loadPX265SQP01449(filter);
//            map.put("result", result);
//            map.put("success", true);
//        } catch (Exception ex) {
//            java.util.logging.Logger.getLogger(InputsController.class.getName()).log(Level.SEVERE, null, ex);
//            map.put("success", false);
//        }
//        return new Gson().toJson(map);
//    }
//
//    @RequestMapping(value = "Maintenance")
//    public @ResponseBody
//    String Maintenance(ModelMap map, HttpServletRequest request) {
//
//        System.out.println("-------------- Inputs : Maintenance-------------");
//        String option;
//        A1691Filter filter = new A1691Filter();
//        String msj = "";
//
//        try {
//
//            option = request.getParameter("option");
//            filter.TOTACU = Integer.parseInt(request.getParameter("TOTACU").trim());
//            filter.COMENT = request.getParameter("COMENT").trim();
//            filter.STAT = request.getParameter("STAT").trim();
//            filter.CCUST = request.getParameter("CCUST").trim();
//            filter.NOMFILE = request.getParameter("NOMFILE").trim();
//            filter.FPROC = request.getParameter("FPROC").trim();
//            filter.HOCR = request.getParameter("HOCR").trim();
//            filter.TOTDIA = Integer.parseInt(request.getParameter("TOTDIA").trim());
//            filter.TOTFIN = Integer.parseInt(request.getParameter("TOTFIN").trim());
//            filter.TOTREG = Integer.parseInt(request.getParameter("TOTREG").trim());
//
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            msj = logic.loadPX265SQP01448(filter, option);
//
//            map.put("success", true);
//            map.put("Mensaje", msj);
//        } catch (NumberFormatException | SQLException ex) {
//            map.put("success", false);
//            map.put("Mensaje", ex.getMessage());
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("Mensaje", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
//
//    @RequestMapping(value = "searchDetAll")
//    public @ResponseBody
//    String searchDetAll(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- Inputs : searchDetAll-------------");
//
//        map.put("success", true);
//        A1686Filter filter = new A1686Filter();
//        List<A2359> lst = new ArrayList<>(0);
//        Gson gson = new Gson();
//
//        try {
//            String beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, A1686Filter.class);
//
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            lst = logic.loadPX264SQP02958(filter);
//
//            System.out.println("Total : " + lst.size());
////            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//            map.put("data", lst);
//
//        } catch (Exception ex) {
//            java.util.logging.Logger.getLogger(InputsController.class.getName()).log(Level.SEVERE, null, ex);
//            map.put("data", lst);
//        }
//        return new Gson().toJson(map);
//    }
//

    @RequestMapping(value = "searchDataDetalle")
    public @ResponseBody
    String searchDataDetalle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Inputs : searchDataDetalle -------------");

        map.put("success", true);
        A1686Filter filter = new A1686Filter();
        List<A1686Filter> lst = new ArrayList<>(0);
        Gson gson = new Gson();

        try {
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1686Filter.class);

            logic = new InputsLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadPX264SQP02958Det(filter);

            System.out.println("Total : " + lst.size());
            map.put("data", lst);

        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(InputsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("data", lst);
        }
        return new Gson().toJson(map);
    }
//

    @RequestMapping(value = "getXLSX_Detalle")
    public @ResponseBody
    void getXLSX_Detalle(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_Detalle");
        String fileNameDownload = String.format("Report Inputs By Bank - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        A1686Filter filter = new A1686Filter();
        List<A1686Filter> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String consulta = "";

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String beanString = request.getParameter("beanString");
            consulta = request.getParameter("consulta");
            filter = gson.fromJson(beanString, A1686Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new InputsLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1686Filter> listaData = logic.loadPX264SQP02958Det(filter);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyleAmount = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            totalStyleAmount.setBorderRight(CellStyle.BORDER_THIN);
            totalStyleAmount.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleAmount.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyleAmount.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleAmount.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyleAmount.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleAmount.setBorderTop(CellStyle.BORDER_THIN);
            totalStyleAmount.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyleAmount.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyleAmount.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyleAmount.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyleAmount.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyleAmount.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

            DataFormat dataFormat = workbook.createDataFormat();
            CellStyle amountStyle = workbook.createCellStyle();
            CellStyle qtyStyle = workbook.createCellStyle();
            amountStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));
            qtyStyle.setDataFormat(dataFormat.getFormat("#,##0"));
            totalStyleAmount.setDataFormat(dataFormat.getFormat("#,##0"));

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

            CH1_0.setCellValue("Seq");
            CH1_1.setCellValue("Processing");
            CH1_2.setCellValue("Bank");
            CH1_5.setCellValue("Qty");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
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

            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Code");
            CH2_3.setCellValue("Name");
            CH2_4.setCellValue("Date");
            CH2_5.setCellValue("Records");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).PROCDATE);
                rcell2.setCellValue(listaData.get(vi).CODE);
                rcell3.setCellValue(listaData.get(vi).NAME);
                rcell4.setCellValue(listaData.get(vi).ADATE);
                rcell5.setCellValue(listaData.get(vi).QTYDOC);

                rcell5.setCellStyle(qtyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);

            CH1_5_T.setCellValue(listaData.get(0).tot_QTYDOC);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyleAmount);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

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

//    @RequestMapping(value = "getXLSX_Delivery")
//    public @ResponseBody
//    void getXLSX_Delivery(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        System.out.println("Report : getXLSX_Delivery");
//        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        A1686Filter filter = new A1686Filter();
//        List<A1686Filter> lst = new ArrayList<>(0);
//        Gson gson = new Gson();
//        String consulta = "";
//
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//
//            String beanString = request.getParameter("beanString");
//            consulta = request.getParameter("consulta");
//            filter = gson.fromJson(beanString, A1686Filter.class);
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = -1;
//            filter.page.PAGNUM = 1;
//
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            List<A1686Filter> listaData = logic.loadPX264SQP00667(filter, consulta);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//
//            String fuente = filter.FUENTE + " Information";
//
//            CH1_0.setCellValue("RN");
//            CH1_1.setCellValue("Flag");
//            CH1_2.setCellValue("Processing");
//            CH1_3.setCellValue("Transaction");
//            CH1_4.setCellValue("Processing");
//            CH1_5.setCellValue(fuente);
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//
//            CH2_1.setCellValue("Error");
//            CH2_2.setCellValue("Date");
//            CH2_3.setCellValue("Number");
//            CH2_4.setCellValue("Time");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).flagError);
//                rcell2.setCellValue(listaData.get(vi).strFormatDate);
//                rcell3.setCellValue(listaData.get(vi).QRECOR);
//                rcell4.setCellValue(listaData.get(vi).TTIME);
//                rcell5.setCellValue(listaData.get(vi).strDescripcion);
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
//
//    @RequestMapping(value = "/obtainDataComboLog")
//    public @ResponseBody
//    String obtainDataComboLog(ModelMap map, HttpServletRequest request) {
//
//        A1686Filter filter = new A1686Filter();
//        String beanString = "";
//        Gson gson = new Gson();
//
//        try {
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//
//            beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, A1686Filter.class);
//
//            List<A1686Filter> listaData = logic.loadPX264SQP04615Log(filter);
//
//            map.put("success", true);
//            map.put("lstProgramas", listaData);
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("sesion", "Se produjo un error. " + ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
//
//    @RequestMapping(value = "searchLOGSA1910")
//    public @ResponseBody
//    String searchLOGSA1910(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- InputsControl : searchLOGSA1910-------------");
//
//        map.put("success", true);
//        List<A1686Filter> lst = this.getListAgent(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//    }
//
//    public List<A1686Filter> getListAgent(HttpServletRequest request, Boolean bExcel) {
//
//        List<A1686Filter> lst = new ArrayList<>(0);
//        A1686Filter filter = new A1686Filter();
//        Gson gson = new Gson();
//        String beanString = "";
//
//        try {
//            logic = new InputsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//
//            beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, A1686Filter.class);
//
//            lst = logic.loadPX264SQP04615(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//        return lst;
//    }
}
