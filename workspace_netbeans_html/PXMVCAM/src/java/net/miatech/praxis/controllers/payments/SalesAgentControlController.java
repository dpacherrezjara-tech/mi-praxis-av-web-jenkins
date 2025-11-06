/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesAgentControlLogic;
import net.miatech.praxis.logic.payments.StatementReconciliationsLogic;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF101;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/SalesAgentControl")
public class SalesAgentControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesAgentControlLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesAgentControl/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : Search-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.loadPX305SQP00933(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPaises")
    public @ResponseBody
    String getPaises(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getPaises-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListGetPaises(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListGetPaises(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

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

            lst = logic.loadPX305SQP04580(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "validateIATA")
    public @ResponseBody
    String validateIATA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : ValidateIATA-------------");
        map.put("success", true);
        List<A003> lst = this.getListValidateIATA(request);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size());
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A003> getListValidateIATA(HttpServletRequest request) {

        List<A003> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String IATA = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            IATA = request.getParameter("IATA");

            lst = logic.loadPX305SQP04435(IATA);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchIATA")
    public @ResponseBody
    String searchIATA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : SearchIATA-------------");
        map.put("success", true);
        List<A4202> lst = this.getListIata(request);
        System.out.println("Total : " + lst.size());
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4202> getListIata(HttpServletRequest request) {

        List<A4202> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String MERCHN = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            MERCHN = request.getParameter("MERCHN");

            lst = logic.loadPX305SQP04415(MERCHN);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2354Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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

            CH1_0.setCellValue("Nbr.");
            CH1_1.setCellValue("Merchant Code.");
            CH1_2.setCellValue("Merchant Branch");
            CH1_3.setCellValue("Credit Card");
            CH1_5.setCellValue("Mode Down Report");
            CH1_6.setCellValue("Franchise 1");
            CH1_7.setCellValue("Franchise 2");
            CH1_8.setCellValue("Franchise 3");
            CH1_9.setCellValue("Franchise 4");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
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

            CH2_3.setCellValue("Code Card");
            CH2_4.setCellValue("Card Name");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));

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

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).CMERCHAN);
                rcell2.setCellValue(listaData.get(vi).SUCMERCH);
                rcell3.setCellValue(listaData.get(vi).CODE);
                rcell4.setCellValue(listaData.get(vi).CORE);
                rcell5.setCellValue(listaData.get(vi).DREPORT);
                rcell6.setCellValue(listaData.get(vi).FRANC1);
                rcell7.setCellValue(listaData.get(vi).FRANC2);
                rcell8.setCellValue(listaData.get(vi).FRANC3);
                rcell9.setCellValue(listaData.get(vi).FRANC4);

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

    @RequestMapping(value = "MaintenanceA2354")
    public @ResponseBody
    String MaintenanceA2354(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SalesAgentControl : MaintenanceA2354-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        A2354Filter filter = new A2354Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
//            filter.MERCHN = request.getParameter("MERCHN").trim();
//            filter.DESCR = request.getParameter("DESCR").trim();
//            filter.RSOCIAL = request.getParameter("RSOCIAL").trim();
//            filter.CIATA = request.getParameter("CIATA").trim();
//            filter.CANAL = request.getParameter("CANAL").trim();
//            filter.SCOUNTRY = request.getParameter("SCOUNTRY").trim();

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX305SQP00934(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceMPF109")
    public @ResponseBody
    String MaintenanceMPF109(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SalesAgentControl : MaintenanceMPF109-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        A2354Filter filter = new A2354Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
//            filter.MERCHN = request.getParameter("MERCHN").trim();
//            filter.DESCR = request.getParameter("DESCR").trim();
//            filter.RSOCIAL = request.getParameter("RSOCIAL").trim();
//            filter.CIATA = request.getParameter("CIATA").trim();
//            filter.CANAL = request.getParameter("CANAL").trim();
//            filter.SCOUNTRY = request.getParameter("SCOUNTRY").trim();

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX305SQP00934_INSERT(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    /**
     *
     * @param map
     * @param request
     * @return
     */
    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : searchCompleteDetail-------------");

        try {
            Gson gson = new Gson();
            A2354Filter filter = new A2354Filter();
            A2354Filter result = new A2354Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            try {
                result = logic.loadPX305SQP00935(filter);
                map.put("result", result);
                map.put("success", true);
            } catch (Exception ex) {
                java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
                map.put("success", false);
            }
        } catch (Exception e) {
            System.out.println("pruebinha");
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchMerchants")
    public @ResponseBody
    String searchMerchants(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : searchMerchants-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListMerchants(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListMerchants(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00938(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBanks")
    public @ResponseBody
    String searchBanks(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : searchBanks-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListBanks(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListBanks(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00939(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchIATAS")
    public @ResponseBody
    String searchIATAS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : searchIATAS-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListIATAS(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListIATAS(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00940(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public String parseDateFlexible(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) {
            return "";
        }

        List<String> patterns = Arrays.asList(
            "M/d/yy", "MM/dd/yy", "M/d/yyyy", "d/M/yyyy",
            "yyyy-MM-dd", "d-MMM-yy", "d-MMM-yyyy"
        );

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        for (String pattern : patterns) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH);
                LocalDate date = LocalDate.parse(dateStr.trim(), formatter);
                return date.format(outputFormatter);
            } catch (DateTimeParseException e) {
                // probar siguiente formato
            }
        }

        return ""; 
    }
    
    private double parseDoubleSafe(String value) {
        if (value == null || value.trim().isEmpty()) return 0.0;
        try {
            // Elimina comas, espacios y símbolos comunes
            value = value.replace(",", "").replace("$", "").trim();
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("⚠️ Valor numérico inválido: " + value);
            return 0.0;
        }
    }


    @RequestMapping(value = "setUploadInvoice", method = RequestMethod.POST)
    public @ResponseBody
    String setUploadInvoice(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request, HttpServletResponse response) throws IOException, Exception {

        byte[] bytes = null;
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String message = "";
        String filename = "", option = "";
        String beanString = "";

        try {

            byte[] dataFile = excelfile.getBytes();
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
            option = filter.OPTION;

            message = uploadFileInvoice(dataFile, option);

            map.put("success", true);
            map.put("msjResult", message);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msjResult", message);
        }
        return new Gson().toJson(map);
    }

    private String uploadFileInvoice(byte[] bytes, String option) throws Exception {

        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new SalesAgentControlLogic();
        List<A2354Filter> lstData = new ArrayList<>();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String message = "";
        String messageA2270 = "";
        int i = 0, cont = 0;
        String horaInicio = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
        
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "InvoiceLoad_." + strSesion + ".xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter dataFormatter = new DataFormatter(Locale.US);
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();

                    if (row.getCell(0) == null && row.getCell(1) == null && row.getCell(2) == null && row.getCell(3) == null && row.getCell(4) == null) {
                        break;
                    }

                    if (i > 1) {
                        cont++;
                        if (row.getCell(0) != null) {
                            A2354Filter obj = new A2354Filter();
                            
                            String valSVFOPL = dataFormatter.formatCellValue(row.getCell(8));
                            String valSVFOPUSD = dataFormatter.formatCellValue(row.getCell(10));
                            String valSDATE = "";
                            
                             if (row.getCell(6) != null  && row.getCell(6).getCellType() == Cell.CELL_TYPE_NUMERIC  && DateUtil.isCellDateFormatted(row.getCell(6))) {

                                Date date = row.getCell(6).getDateCellValue();
                                LocalDate localDate = date.toInstant() .atZone(ZoneId.systemDefault()) .toLocalDate();
                                valSDATE = localDate.format(outputFormatter);

                            } else {
                                valSDATE = parseDateFlexible(dataFormatter.formatCellValue(row.getCell(6)));
                            }
                            
                            obj.SOCIETY = dataFormatter.formatCellValue(row.getCell(0));
                            obj.PAIS = dataFormatter.formatCellValue(row.getCell(1));
                            obj.IATA = dataFormatter.formatCellValue(row.getCell(2));
                            obj.IATANAME = dataFormatter.formatCellValue(row.getCell(3));
                            obj.INVOICE = dataFormatter.formatCellValue(row.getCell(4));
                            obj.CLASEDOC = dataFormatter.formatCellValue(row.getCell(5));
                            obj.SDATE = valSDATE;
                            obj.SCURRENCYL = dataFormatter.formatCellValue(row.getCell(7));
                            obj.SVFOPL = parseDoubleSafe(valSVFOPL);
                            obj.CURUSD = dataFormatter.formatCellValue(row.getCell(9));
                            obj.SVFOPUSD = parseDoubleSafe(valSVFOPUSD);
                            lstData.add(obj);
                        }
                    }
                }
                file.close();
                
            
                logic = new SalesAgentControlLogic();
                logic.setSession(this.serverSession.getServerSession());
                Map<String, Integer> result = logic.loadMPS351(lstData, cont, option);
              
                messageA2270 = logic.loadMPS352(result.get("leidos"), result.get("escritos"), result.get("errores"), result.get("duplicados"), horaInicio);

            } catch (Exception e) {
                message = e.getMessage();
                e.printStackTrace();
            }

            archivo.delete();
        } catch (Exception e) {
            message = e.getMessage();
            e.printStackTrace();
        }
        return messageA2270;
    }
    
    @RequestMapping(value = "MaintenanceMirror")
    public @ResponseBody
    String MaintenanceMirror(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SalesAgentControl : MaintenanceMirror-------------");

        String option;
        String beanString;
        String oldBeanString;
        Gson gson = new Gson();

        A2354Filter filterNew = new A2354Filter();
        A2354Filter filterOld = new A2354Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            oldBeanString = request.getParameter("oldBeanString");
            filterNew = gson.fromJson(beanString, A2354Filter.class);
            filterOld = gson.fromJson(oldBeanString, A2354Filter.class);

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.load_MPS114(filterNew, filterOld, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchSales")
    public @ResponseBody
    String searchSales(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : Search-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getListSales(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListSales(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.load_MPS115(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "MaintenanceHistoric")
    public @ResponseBody
    String MaintenanceHistoric(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SalesAgentControl : MaintenanceHistoric-------------");

        String option;
        String beanString;
        String merchant;
        Gson gson = new Gson();

        A2354Filter filterNew = new A2354Filter();
        A2354Filter filterOld = new A2354Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            merchant = request.getParameter("merchant");
            filterNew = gson.fromJson(beanString, A2354Filter.class);

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.load_MPS116(filterNew, merchant, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "deleteMerchantAndSendHistoric")
    public @ResponseBody
    String deleteMerchantAndSendHistoric(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SalesAgentControl : deleteMerchantAndSendHistoric-------------");

        String option;
        String beanString;
        String merchant;
        Gson gson = new Gson();

        A2354Filter filterNew = new A2354Filter();
        A2354Filter filterOld = new A2354Filter();
        String msj = " ";

        try {

            beanString = request.getParameter("beanString");
            filterNew = gson.fromJson(beanString, A2354Filter.class);

            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.load_MPS265(filterNew);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchSumaryMain")
    public @ResponseBody
    String searchSumaryMain(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<A2354Filter> lst = this.getListSumaryMain(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListSumaryMain(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.load_MPS354(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDataDetail")
    public @ResponseBody
    String searchDataDetail(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<A2354Filter> lst = this.getListDataDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListDataDetail(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.load_MPS355(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSXDashboard")
    public @ResponseBody
    void getXLSXDashboard(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDashboard");
        String fileNameDownload = String.format("Report  Dashboard Invoice - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2354Filter> listaData = this.getListSumaryMain(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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

            CH1_0.setCellValue("Month");
            CH1_1.setCellValue("Society");
            CH1_2.setCellValue("Total Invoice");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            ++vj;
            //============================================

            // ====== Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);

            // Nombres de cabecera nivel 2
            CH2_2.setCellValue("Avianca");
            CH2_5.setCellValue("Praxis");

            // Uniones correctas de columnas
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));

            ++vj;

            
           // ====== Nivel 3 ==========
            Row row3 = sheet.createRow(vj);

            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);

            CH3_2.setCellValue("Currency");
            CH3_3.setCellValue("Qty");
            CH3_4.setCellValue("Amount");

            CH3_5.setCellValue("Qty");
            CH3_6.setCellValue("Rate (%)");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);

            // ==== Merges ====
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6)); 

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

                A2354Filter item = listaData.get(vi);

                // Cálculo del rate
                double rate = 0;
                if ( item.QTY_INVOICES > 0) {
                    rate = ((double) item.QTY_100_ALL / (double) item.QTY_INVOICES);
                }

                rcell0.setCellValue(item.strFormatDate);
                rcell1.setCellValue(item.SOCIETY);
                rcell2.setCellValue(item.CURRENCY);
                rcell3.setCellValue(item.QTY_INVOICES);
                rcell4.setCellValue(item.SVFOPL);
                rcell5.setCellValue(item.QTY_100_ALL);

                // Escribir el porcentaje
                rcell6.setCellValue(rate); // <-- valor decimal (ej. 0.925)
                rcell6.setCellStyle(bodyStylePercent); // aplicaremos estilo %

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
    
   
    
    //////////////////////////////mpf199
    ///////////////////////////////////////////////////
    
    
    
    @RequestMapping(value = "searchListIMF150")
    public @ResponseBody
    String searchListIMF150(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SALES AGENT CONTROL :searchListIMF150-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getListIMF150(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<A2354Filter> getListIMF150(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

                lst = logic.loadLISTAR_IMF150(filter);
            } catch (Exception e) {
                throw new SpringException(e);
            }
            return lst;
        }
    
    
    
    
    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL   /////////////////
    ///////////////////////////////////////////////////////////////////////77
    
    
    @RequestMapping(value = "getXLSXIMF150")
    public @ResponseBody
    void getXLSXIMF150(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXIMF150");
        A2354Filter filter = new A2354Filter();
        String fileNameDownload = String.format("Sales Agent Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            SalesAgentControlLogic logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2354Filter> listaData = logic.loadLISTAR_IMF150(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            

            CH1_0.setCellValue("CLIENT");
            CH1_1.setCellValue(" MONTH");
            CH1_2.setCellValue("AGENT");
            CH1_3.setCellValue("FUENTE");
            CH1_4.setCellValue("COUNTRY");
            CH1_5.setCellValue("PAYMENT TYPE ");
            CH1_6.setCellValue("TOTAL TICKETS");
            CH1_7.setCellValue("Currency");
            CH1_8.setCellValue("AMOUNT");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            ++vj;
            //============================================

            
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

                rcell0.setCellValue(listaData.get(vi).O_CCUST);
                rcell1.setCellValue(listaData.get(vi).O_MES);
                rcell2.setCellValue(listaData.get(vi).O_SAGENT);
                rcell3.setCellValue(listaData.get(vi).O_FUENTE);
                rcell4.setCellValue(listaData.get(vi).O_PAIS_VENTA);
                rcell5.setCellValue(listaData.get(vi).O_FORMAPAGO);
                rcell6.setCellValue(listaData.get(vi).O_QTYTKTS);
                rcell7.setCellValue(listaData.get(vi).CURRENCY);
                rcell8.setCellValue(listaData.get(vi).O_VFOP);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
           
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
    
    
    
    
    
    
    
    
    
    ////////////////////////////////MPFA720
    ///////////////////////////////////////////////////
    
    
    
    @RequestMapping(value = "searchListA720")
    public @ResponseBody
    String searchListA720(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SALES AGENT CONTROL :searchListA720-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getListA720(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<A2354Filter> getListA720(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

                lst = logic.loadLISTAR_A720(filter);
            } catch (Exception e) {
                throw new SpringException(e);
            }
            return lst;
        }
    
    
    
    
    
    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL MPFA720  /////////////////
    ///////////////////////////////////////////////////////////////////////77
    
    
    @RequestMapping(value = "getXLSXA720")
    public @ResponseBody
    void getXLSXA720 (HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXA720");
        A2354Filter filter = new A2354Filter();
        String fileNameDownload = String.format("Sales Agent Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            SalesAgentControlLogic logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2354Filter> listaData = logic.loadLISTAR_A720(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            

            CH1_0.setCellValue("CLIENT");
            CH1_1.setCellValue("TICKET ");
            CH1_2.setCellValue("SALE DATE");     
            CH1_3.setCellValue("CONTRY of SALE");
            CH1_4.setCellValue("Transaction ");
            CH1_5.setCellValue("DOCUMENT TYPE");
            CH1_6.setCellValue("AGENT");
            CH1_7.setCellValue("Sale Origin");
            CH1_8.setCellValue("CURRENCY");
            CH1_9.setCellValue("A_A1531VFOPR");
            
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
            

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            
            ++vj;
            //============================================

            
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
                

                rcell0.setCellValue(listaData.get(vi).A_CCUST);
                rcell1.setCellValue(listaData.get(vi).A_TICKET);
                rcell2.setCellValue(listaData.get(vi).A_A720FECVTA);
                rcell3.setCellValue(listaData.get(vi).A_A720PAIVTA);
                rcell4.setCellValue(listaData.get(vi).A_A720TRNCU);
                rcell5.setCellValue(listaData.get(vi).A_A720TDOC);
                rcell6.setCellValue(listaData.get(vi).A_A720AGENTE);
                rcell7.setCellValue(listaData.get(vi).A_ORIGEN);
                rcell8.setCellValue(listaData.get(vi).A_A1531MFOPR);
                rcell9.setCellValue(listaData.get(vi).A_A1531VFOPR);
                
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
           
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);

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
    
    public List<A2354Filter> getListPendingAgent(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS365(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSXPendingAgent")
    public void getXLSXPendingAgent(HttpServletRequest request, HttpServletResponse response) {
        try {
            String fileNameDownload = "Pending Agent Report - " + Functions.getFechaActual() + ".xlsx";

            List<A2354Filter> listaData = this.getListPendingAgent(request, true);
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            // Crear header
            Row row1 = sheet.createRow(0);
            row1.createCell(0).setCellValue("CCUST");
            row1.createCell(1).setCellValue("DSALES");
            row1.createCell(2).setCellValue("AGENT");
            row1.createCell(3).setCellValue("NAME AGENT");
            row1.createCell(4).setCellValue("CANAL");
            row1.createCell(5).setCellValue("COUNTRY");
            row1.createCell(6).setCellValue("AMOUNT_SALE");

            // Data
            int rowIdx = 1;
            for (A2354Filter data : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(data.CCUST);
                row.createCell(1).setCellValue(data.DSALES);
                row.createCell(2).setCellValue(data.AGENT);
                row.createCell(3).setCellValue(data.NAME_AGENT);
                row.createCell(4).setCellValue(data.CANAL);
                row.createCell(5).setCellValue(data.PSALF);
                row.createCell(6).setCellValue(data.AMOUNT_SALE);
            }

            // Ajustar ancho
            for (int i = 0; i < 7; i++) {
                sheet.autoSizeColumn(i);
            }

            // Configuración de respuesta
            response.setContentType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            // Escribir al response
            ServletOutputStream out = response.getOutputStream();
            workbook.write(out);
            out.flush();
            workbook.close();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "updateSummarySales")
    public @ResponseBody String loadIatas(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            String resultSQP05572 = logic.SQP05572();
            map.put("success", true);
            map.put("msjResult", resultSQP05572);

            String resultMPS363 = logic.MPS363();
            map.put("success", true);
            map.put("msjResult", resultMPS363);

        } catch (Exception e) {
            e.printStackTrace();
            String errorMsg = "Error en updateSummarySales: " + e.getMessage();
            map.put("success", false);
            map.put("msjResult", errorMsg);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchSalesDashboard")
    public @ResponseBody
    String searchSalesDashboard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : searchSalesDashboard-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getListSalesDashboard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListSalesDashboard(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.load_MPS405(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getProcessDate")
    public @ResponseBody String getProcessDate(HttpServletRequest request) {
        System.out.println("-------------- SalesAgentControl : getProcessDate -------------");

        Map<String, Object> map = new HashMap<>();
        map.put("success", false);

        try {
            logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            String processDate = logic.getProcessDate();

            map.put("processDate", processDate);
            map.put("success", true);

        } catch (Exception e) {
            e.printStackTrace();
            map.put("error", e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    
    
    
    
    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL DETAILMAIN  /////////////////
 
    @RequestMapping(value = "getXLSXDetailMain")
    public @ResponseBody
    void getXLSXDetailMain(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXDetailMain");
        A2354Filter filter = new A2354Filter();
        String fileNameDownload = String.format("Sales Agent Control MainDetail-" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            SalesAgentControlLogic logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2354Filter> listaData = logic.load_MPS115(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            // ====== ESTILOS ======
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
            headerStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(180, 198, 214))); // gris azulado
            headerStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
            headerStyle.setFont(headerFont);

            // ====== COLORES DIFERENTES PARA LOS GRUPOS ======
            XSSFCellStyle groupHeaderStyleAccreditation = (XSSFCellStyle) workbook.createCellStyle();
            groupHeaderStyleAccreditation.cloneStyleFrom(headerStyle);
            groupHeaderStyleAccreditation.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 215, 237))); // celeste suave
            groupHeaderStyleAccreditation.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);

            XSSFCellStyle groupHeaderStyleCredit = (XSSFCellStyle) workbook.createCellStyle();
            groupHeaderStyleCredit.cloneStyleFrom(headerStyle);
            groupHeaderStyleCredit.setFillForegroundColor(new XSSFColor(new java.awt.Color(226, 239, 218))); // verde claro
            groupHeaderStyleCredit.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);

            XSSFCellStyle groupHeaderStyleCash = (XSSFCellStyle) workbook.createCellStyle();
            groupHeaderStyleCash.cloneStyleFrom(headerStyle);
            groupHeaderStyleCash.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 229, 204))); // naranja pastel
            groupHeaderStyleCash.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
            
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            bodyStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
            bodyStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
            bodyStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);

            
            
            // ====== CABECERAS ======
            int vj = 0;
            Row row1 = sheet.createRow(vj);

            // Nivel 1 fijo
            String[] headersFixed = {"NBR", "Client", "SRC", "Name", "Type"};
            for (int i = 0; i < headersFixed.length; i++) {
                Cell cell = row1.createCell(i);
                cell.setCellValue(headersFixed[i]);
                cell.setCellStyle(headerStyle);
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, i, i));
            }

            // A partir de aquí empieza la parte variable
            int col = headersFixed.length;

            // ACCREDITATION TYPE (2 columnas)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, col, col + 1));
            Cell accHeader = row1.createCell(col);
            accHeader.setCellValue("ACCREDITATION TYPE");
            accHeader.setCellStyle(groupHeaderStyleAccreditation);

            // CTR y CURRENCY
            String[] nextFixed = {"CTR", "CURRENCY"};
            for (int i = 0; i < nextFixed.length; i++) {
                int colIndex = col + 2 + i;
                Cell cell = row1.createCell(colIndex);
                cell.setCellValue(nextFixed[i]);
                cell.setCellStyle(headerStyle);
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, colIndex, colIndex));
            }

            // CREDIT CARD (6 columnas)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, col + 4, col + 9));
            Cell ccHeader = row1.createCell(col + 4);
            ccHeader.setCellValue("CREDIT CARD");
            ccHeader.setCellStyle(groupHeaderStyleCash);

            // CASH (6 columnas)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, col + 10, col + 15));
            Cell cashHeader = row1.createCell(col + 10);
            cashHeader.setCellValue("CASH");
            cashHeader.setCellStyle(groupHeaderStyleCredit);

            // ====== Fila 2 ======
            Row row2 = sheet.createRow(++vj);

            // Subcolumnas Accreditation Type
            String[] accSub = {"Status", "Risk"};
            for (int i = 0; i < accSub.length; i++) {
                Cell c = row2.createCell(col + i);
                c.setCellValue(accSub[i]);
                c.setCellStyle(headerStyle);
            }

            // Subcolumnas CREDIT CARD
            String[] ccSub = {"Month", "QTY", "Amount", "5 Months", "Desviacion", "Alert"};
            for (int i = 0; i < ccSub.length; i++) {
                Cell c = row2.createCell(col + 4 + i);
                c.setCellValue(ccSub[i]);
                c.setCellStyle(headerStyle);
            }

            // Subcolumnas CASH
            String[] cashSub = {"Month", "QTY", "Amount", "5 Months", "Desviacion", "Alert"};
            for (int i = 0; i < cashSub.length; i++) {
                Cell c = row2.createCell(col + 10 + i);
                c.setCellValue(cashSub[i]);
                c.setCellStyle(headerStyle);
            }

            // ====== LLENADO DE DATOS ======
            vj++;
            for (A2354Filter item : listaData) {
                Row row = sheet.createRow(vj);
                int c = 0;
                row.createCell(c++).setCellValue(item.RN);
                row.createCell(c++).setCellValue(item.CCUST);
                row.createCell(c++).setCellValue(item.CANAV);
                row.createCell(c++).setCellValue(item.NAGENT);
                row.createCell(c++).setCellValue(item.TYPEAG);

                // Accreditation Type
                row.createCell(c++).setCellValue(item.ASTATUS);
                row.createCell(c++).setCellValue(item.RSTATUS);

                // CTR + Currency
                row.createCell(c++).setCellValue(item.SAGECTR);
                row.createCell(c++).setCellValue("USD");

                // Credit Card
                row.createCell(c++).setCellValue(item.MONTHCRE);
                row.createCell(c++).setCellValue(item.QTYTKCRE);
                row.createCell(c++).setCellValue(item.AMOUNCRE);
                row.createCell(c++).setCellValue(item.FMOUNCRE);
                row.createCell(c++).setCellValue(item.DESVICRE);
                row.createCell(c++).setCellValue(item.ALERTCRE);

                // Cash
                row.createCell(c++).setCellValue(item.MONTHCAS);
                row.createCell(c++).setCellValue(item.QTYTKCAS);
                row.createCell(c++).setCellValue(item.AMOUNCAS);
                row.createCell(c++).setCellValue(item.FMOUNCAS);
                row.createCell(c++).setCellValue(item.DESVICAS);
                row.createCell(c++).setCellValue(item.ALERTCAS);

                vj++;
            }
            
            
    
            int totalCols = sheet.getRow(0).getLastCellNum();
            for (int i = 0; i < totalCols; i++) {
                sheet.autoSizeColumn(i);
            }

            // ====== EXPORTAR ======
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            
            
            
            

                        try {

                workbook.write(response.getOutputStream());
                workbook.close();
            } catch (Exception ex) {
                ex.printStackTrace();
                response.setContentType("text/plain");
                response.getWriter().write("Error generando Excel: " + ex.getMessage());
            }

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    
  
     
    
    ///test
    
//    @RequestMapping(value = "getXLSXDetailMain")
//    public @ResponseBody
//    void getXLSXDetailMain (HttpServletRequest request, HttpServletResponse response) throws Exception {
//        System.out.println("Report : getXLSXDetailMain");
//        A2354Filter filter = new A2354Filter();
//        String fileNameDownload = String.format("Sales Agent Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            SalesAgentControlLogic logic = new SalesAgentControlLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.page.PAGROW = -1;
//            filter.page.PAGNUM = 1;
//
//            List<A2354Filter> listaData = logic.load_MPS115(filter);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
//            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
//            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
//            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFont(headerFont);
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
//            Cell CH1_15 = row1.createCell(15);
//            Cell CH1_16 = row1.createCell(16);
//            Cell CH1_17 = row1.createCell(17);
//            Cell CH1_18 = row1.createCell(18);
//            Cell CH1_19 = row1.createCell(19);
//            Cell CH1_20 = row1.createCell(20);
//            
//
//            CH1_0.setCellValue("NBR");
//            CH1_1.setCellValue("Client ");
//            CH1_2.setCellValue("SRC");     
//            CH1_3.setCellValue("Name");
//            CH1_4.setCellValue("Type ");
//            CH1_5.setCellValue("Status");
//            CH1_6.setCellValue("Risk");
//            CH1_7.setCellValue("CTR");
//            CH1_8.setCellValue("CURRENCY");
//            
//            
//            CH1_9.setCellValue("Month");
//            CH1_10.setCellValue("Qty Tickets");
//            CH1_11.setCellValue("Amount");
//            CH1_12.setCellValue("5 months");
//            CH1_13.setCellValue("Desviacion");
//            CH1_14.setCellValue("Alert");
//            
//            CH1_15.setCellValue("Month");
//            CH1_16.setCellValue("Qty Tickets");
//            CH1_17.setCellValue("Amount");
//            CH1_18.setCellValue("5 months");
//            CH1_19.setCellValue("Desviacion");
//            CH1_20.setCellValue("Alert");
//            
//   
//            
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
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            
//
////            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            
//            ++vj;
//            //============================================
//
//            
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
//                Cell rcel20 = row1.createCell(10);
//                Cell rcel21 = row1.createCell(11);
//                Cell rcel22 = row1.createCell(12);
//                Cell rcel23 = row1.createCell(13);
//                Cell rcel24 = row1.createCell(14);
//                Cell rcel25 = row1.createCell(15);
//                Cell rcel26 = row1.createCell(16);
//                Cell rcel27 = row1.createCell(17);
//                Cell rcel28 = row1.createCell(18);
//                Cell rcel29 = row1.createCell(19);
//                Cell rcel30 = row1.createCell(20);
//                
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).CCUST);
//                rcell2.setCellValue(listaData.get(vi).CANAV);
//                rcell3.setCellValue(listaData.get(vi).NAGENT);
//                rcell4.setCellValue(listaData.get(vi).TYPEAG);
//                rcell5.setCellValue(listaData.get(vi).ASTATUS);
//                rcell6.setCellValue(listaData.get(vi).RSTATUS);
//                rcell7.setCellValue(listaData.get(vi).SAGECTR);
//                rcell8.setCellValue("USD");
//                rcell9.setCellValue(listaData.get(vi).MONTHCRE);
//                rcel20.setCellValue(listaData.get(vi).QTYTKCRE);
//                rcel21.setCellValue(listaData.get(vi).AMOUNCRE);
//                rcel22.setCellValue(listaData.get(vi).FMOUNCRE);
//                rcel23.setCellValue(listaData.get(vi).DESVICRE);
//                rcel24.setCellValue(listaData.get(vi).ALERTCRE);
//                
//                
//                rcel25.setCellValue(listaData.get(vi).MONTHCAS);
//                rcel26.setCellValue(listaData.get(vi).QTYTKCAS);
//                rcel27.setCellValue(listaData.get(vi).AMOUNCAS);
//                rcel28.setCellValue(listaData.get(vi).FMOUNCAS);
//                rcel29.setCellValue(listaData.get(vi).DESVICAS);
//                rcel30.setCellValue(listaData.get(vi).ALERTCAS);
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            // ======  Nivel de TOTALES ==========
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
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            
//            try {
//                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//                
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                response.setContentType("text/plain");
//                response.getWriter().write("Error generando Excel: " + ex.getMessage());
//            }
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
    
    ///
    
    
    
    
    //////////// getXLSXIMF150MAIN
    
    
    @RequestMapping(value = "getXLSXIMF150MAIN")
    public @ResponseBody
    void getXLSXIMF150MAIN(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXIMF150MAIN");
        A2354Filter filter = new A2354Filter();
        String fileNameDownload = String.format("Sales Agent Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            SalesAgentControlLogic logic = new SalesAgentControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2354Filter> listaData = logic.loadLISTAR_IMF150MAIN(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            

            CH1_0.setCellValue("CLIENT");
            CH1_1.setCellValue(" MONTH");
            CH1_2.setCellValue("AGENT");
            CH1_3.setCellValue("FUENTE");
            CH1_4.setCellValue("COUNTRY");
            CH1_5.setCellValue("PAYMENT TYPE ");
            CH1_6.setCellValue("TOTAL TICKETS");
            
            
            CH1_7.setCellValue("Currency");
            CH1_8.setCellValue("AMOUNT");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            ++vj;
            //============================================

            
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

                rcell0.setCellValue(listaData.get(vi).O_CCUST);
                rcell1.setCellValue(listaData.get(vi).O_MES);
                rcell2.setCellValue(listaData.get(vi).O_SAGENT);
                rcell3.setCellValue(listaData.get(vi).O_FUENTE);
                rcell4.setCellValue(listaData.get(vi).O_PAIS_VENTA);
                rcell5.setCellValue(listaData.get(vi).O_FORMAPAGO);
//                rcell6.setCellValue((int) Double.parseDouble(listaData.get(vi).O_QTYTKTS));
                rcell6.setCellValue(String.valueOf((int) Double.parseDouble(listaData.get(vi).O_QTYTKTS)));


                rcell7.setCellValue("USD");
                rcell8.setCellValue(listaData.get(vi).O_VFOP);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
           
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
    
    
    
    
}
