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
import java.io.OutputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ReconciliationReportLogic;
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
@RequestMapping("/ReconciliationReport")
public class ReconciliationReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ReconciliationReportLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ReconciliationReport/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationReport : Search-------------");
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
            logic = new ReconciliationReportLogic();
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
            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : ValidateIATA-------------");
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
            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : SearchIATA-------------");
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
            logic = new ReconciliationReportLogic();
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

        System.out.println("-------------- ReconciliationReport : MaintenanceA2354-------------");

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

            logic = new ReconciliationReportLogic();
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

        System.out.println("-------------- ReconciliationReport : MaintenanceMPF109-------------");

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

            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : searchCompleteDetail-------------");

        try {
            Gson gson = new Gson();
            A2354Filter filter = new A2354Filter();
            A2354Filter result = new A2354Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : searchMerchants-------------");

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
            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : searchBanks-------------");

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
            logic = new ReconciliationReportLogic();
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
        System.out.println("-------------- ReconciliationReport : searchIATAS-------------");

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
            logic = new ReconciliationReportLogic();
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

        logic = new ReconciliationReportLogic();
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
                
            
                logic = new ReconciliationReportLogic();
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

        System.out.println("-------------- ReconciliationReport : MaintenanceMirror-------------");

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

            logic = new ReconciliationReportLogic();
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
    
    @RequestMapping(value = "searchHistoric")
    public @ResponseBody
    String searchHistoric(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationReport : Search-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getListHistoric(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListHistoric(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationReportLogic();
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

        System.out.println("-------------- ReconciliationReport : MaintenanceHistoric-------------");

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

            logic = new ReconciliationReportLogic();
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

        System.out.println("-------------- ReconciliationReport : deleteMerchantAndSendHistoric-------------");

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

            logic = new ReconciliationReportLogic();
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
            logic = new ReconciliationReportLogic();
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
            logic = new ReconciliationReportLogic();
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
    
    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetail");
        String fileNameDownload = String.format("Report  Debit Reconciliation - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27= row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);
            Cell CH1_32 = row1.createCell(32);
            Cell CH1_33 = row1.createCell(33);
            Cell CH1_34 = row1.createCell(34);
            Cell CH1_35 = row1.createCell(35);
            Cell CH1_36 = row1.createCell(36);
            Cell CH1_37 = row1.createCell(37);
            Cell CH1_38 = row1.createCell(38);
            Cell CH1_39 = row1.createCell(39);

            CH1_0.setCellValue("Nbr");
            CH1_1.setCellValue("Customer");
            CH1_2.setCellValue("Document");
            CH1_3.setCellValue("Bandoc");
            CH1_4.setCellValue("Status");
            CH1_5.setCellValue("Processor");
            CH1_6.setCellValue("Payment Date");
            CH1_7.setCellValue("Account");
            CH1_8.setCellValue("Account Provision");
            CH1_9.setCellValue("Profit Center");
            CH1_10.setCellValue("Society");
            CH1_11.setCellValue("Reference");
            CH1_12.setCellValue("Key 1");
            CH1_13.setCellValue("Key 3");
            CH1_14.setCellValue("Text");
            CH1_15.setCellValue("Local Currency");
            CH1_16.setCellValue("Local Amount");
            CH1_17.setCellValue("USD Currency");
            CH1_18.setCellValue("USD Amount");
            CH1_19.setCellValue("USD Currency DEB");
            CH1_20.setCellValue("USD Amount DEB");
            CH1_21.setCellValue("Phase 1 Total");
            CH1_22.setCellValue("Phase 1 Debits");
            CH1_23.setCellValue("Phase 2 Total");
            CH1_24.setCellValue("Phase 2 Debits");
            CH1_25.setCellValue("Taxes");
            CH1_26.setCellValue("Period Regular");
            CH1_27.setCellValue("ID Regular");
            CH1_28.setCellValue("Correlativo Regular");
            CH1_29.setCellValue("Date SAP Regular");
            CH1_30.setCellValue("Status SAP Regular");
            CH1_31.setCellValue("Period Debit");
            CH1_32.setCellValue("Type Debit");
            CH1_33.setCellValue("Sub Type");
            CH1_34.setCellValue("ID Debit");
            CH1_35.setCellValue("Correlativo Debit");
            CH1_36.setCellValue("Name File");
            CH1_37.setCellValue("Date SAP Debit");
            CH1_38.setCellValue("Status SAP Debit");
            CH1_39.setCellValue("Qty Reject");
            
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
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);
            CH1_33.setCellStyle(headerStyle);
            CH1_34.setCellStyle(headerStyle);
            CH1_35.setCellStyle(headerStyle);
            CH1_36.setCellStyle(headerStyle);
            CH1_37.setCellStyle(headerStyle);
            CH1_38.setCellStyle(headerStyle);
            CH1_39.setCellStyle(headerStyle);

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
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);
                Cell rcell32 = row1.createCell(32);
                Cell rcell33 = row1.createCell(33);
                Cell rcell34 = row1.createCell(34);
                Cell rcell35 = row1.createCell(35);
                Cell rcell36 = row1.createCell(36);
                Cell rcell37 = row1.createCell(37);
                Cell rcell38 = row1.createCell(38);
                Cell rcell39 = row1.createCell(39);

                //  Escribimos las celdas
                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).CUSTOMER);
                rcell2.setCellValue(listaData.get(vi).TDOC);
                rcell3.setCellValue(listaData.get(vi).BANDOC);
                rcell4.setCellValue(listaData.get(vi).STVAL);
                rcell5.setCellValue(listaData.get(vi).CODPRO);
                rcell6.setCellValue(listaData.get(vi).ADATE);
                rcell7.setCellValue(listaData.get(vi).ACCOUNT);
                rcell8.setCellValue(listaData.get(vi).ACCPROV);
                rcell9.setCellValue(listaData.get(vi).BENCENC);
                rcell10.setCellValue(listaData.get(vi).SOCIETY);
                rcell11.setCellValue(listaData.get(vi).REFER);
                rcell12.setCellValue(listaData.get(vi).CLAVE1);
                rcell13.setCellValue(listaData.get(vi).CLAVE3);
                rcell14.setCellValue(listaData.get(vi).TEXTO);
                rcell15.setCellValue(listaData.get(vi).SCURRENCY);
                rcell16.setCellValue(listaData.get(vi).NETO);
                rcell17.setCellValue(listaData.get(vi).LOCRENCY2);
                rcell18.setCellValue(listaData.get(vi).LOCAMOUNT2);
                rcell19.setCellValue(listaData.get(vi).SCURRENCYDEB);
                rcell20.setCellValue(listaData.get(vi).LOCAMOUNTDEB);
                rcell21.setCellValue(listaData.get(vi).FASE1_TOTAL);
                rcell22.setCellValue(listaData.get(vi).FASE1_DEBITOS);
                rcell23.setCellValue(listaData.get(vi).FASE2_TOTAL);
                rcell24.setCellValue(listaData.get(vi).FASE2_DEBITOS);
                rcell25.setCellValue(listaData.get(vi).TAXES);
                rcell26.setCellValue(listaData.get(vi).PERIODO_REG);
                rcell27.setCellValue(listaData.get(vi).HEADER_REG);
                rcell28.setCellValue(listaData.get(vi).CORRELATIVO_REG);
                rcell29.setCellValue(listaData.get(vi).FECSAP_REG);
                rcell30.setCellValue(listaData.get(vi).STATUSSAP_REG);
                rcell31.setCellValue(listaData.get(vi).PERIODO_DEB);
                rcell32.setCellValue(listaData.get(vi).TIPO_DEB);
                rcell33.setCellValue(listaData.get(vi).SUB_TIPO_DEB);
                rcell34.setCellValue(listaData.get(vi).HEADER_DEB);
                rcell35.setCellValue(listaData.get(vi).CORRELATIVO_DEB);
                rcell36.setCellValue(listaData.get(vi).FILENAME_DEB);
                rcell37.setCellValue(listaData.get(vi).FECSAP_DEB);
                rcell38.setCellValue(listaData.get(vi).STATUSSAP_DEB);
                rcell39.setCellValue(listaData.get(vi).QTY_REJECTED);

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

    @RequestMapping(value = "getCSV")
    public @ResponseBody void getCSV(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getCSV");

        String country  = request.getParameter("country");
        String dateSett = request.getParameter("dateSett");   // YYYYMMDD
        String customer = request.getParameter("customer");

        System.out.println("📌 Parámetros recibidos → country=" + country + ", dateSett=" + dateSett + ", customer=" + customer);

        if (country == null || dateSett == null || customer == null ||
            country.isEmpty() || dateSett.isEmpty() || customer.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Parámetros obligatorios: country, customer y dateSett");
            return;
        }

        String ruta = this.serverSession.propertySession.get("DB_SERVER_DEFAULT_TYPE").toString();
        String rutaCarpeta;

        switch (ruta) {
            case "ATT": rutaCarpeta = "test"; break;
            case "DEV": rutaCarpeta = "dev"; break;
            case "PRO": rutaCarpeta = "prod"; break;
            default: rutaCarpeta = "";
        }

        // 🔥 Nueva ruta correcta
        Path folderPath = Paths.get("\\\\Px\\av\\Efectivo\\"
                + rutaCarpeta + "\\workspace\\HISTORY");

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath, "*.csv")) {
            Path matchedFile = null;

            for (Path path : stream) {
                String fileName = path.getFileName().toString();
                if (fileName.contains(country) && fileName.contains(customer) && fileName.contains(dateSett)) {
                    matchedFile = path;
                    break;
                }
            }

            if (matchedFile == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("No se encontró archivo para country=" + country
                        + ", customer=" + customer + ", fecha=" + dateSett);
                return;
            }

            System.out.println("Archivo encontrado: " + matchedFile);

            response.setContentType("text/csv");
            response.setHeader("Content-Disposition",
                    "attachment; filename=\"" + matchedFile.getFileName().toString() + "\"");

            try (FileInputStream fis = new FileInputStream(matchedFile.toFile());
                 OutputStream out = response.getOutputStream()) {

                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = fis.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
                out.flush();
            }

        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error al buscar o descargar el archivo CSV");
        }
    }


   @RequestMapping(value = "getBulkCSV", method = RequestMethod.POST)
    public void getBulkCSV(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("📌 Report : getBulkCSV");

        String beanString = request.getParameter("beanString");

        if (beanString == null || beanString.isEmpty()) {
            response.setStatus(400);
            response.getWriter().write("beanString es obligatorio");
            return;
        }

        Gson gson = new Gson();
        A2354Filter filter = gson.fromJson(beanString, A2354Filter.class);

        // 🟢 Traer TODOS los registros sin paginado
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        ReconciliationReportLogic logic = new ReconciliationReportLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<A2354Filter> list = logic.loadPX305SQP00933(filter);

        System.out.println("🔍 Registros encontrados: " + list.size());

        if (list.isEmpty()) {
            response.setStatus(404);
            response.getWriter().write("No hay archivos para descargar");
            return;
        }

        String ruta = this.serverSession.propertySession.get("DB_SERVER_DEFAULT_TYPE").toString();
        String rutaCarpeta = ruta.equals("ATT") ? "test" :
                             ruta.equals("DEV") ? "dev" :
                             ruta.equals("PRO") ? "prod" : "";

        // Archivo temporal ZIP
        File tempZip = File.createTempFile("BSP_Files_", ".zip");
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempZip));

        int addedFiles = 0;

        for (A2354Filter item : list) {
    try {
        Path folderPath = Paths.get("\\\\Px\\av\\Efectivo\\"
                + rutaCarpeta + "\\workspace\\HISTORY");

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath, "*.csv")) {

            boolean added = false;

            for (Path path : stream) {
                try {
                    String fileName = path.getFileName().toString();

                    if (fileName.contains(item.COUNTRY)
                            && fileName.contains(item.CUSTOMER)
                            && fileName.contains(item.DATESETT)) {

                        zos.putNextEntry(new ZipEntry(fileName));
                        Files.copy(path, zos);
                        zos.closeEntry();
                        addedFiles++;
                        added = true;
                        break;
                    }
                } catch (Exception eFile) {
                    System.err.println("⚠ No se pudo agregar archivo al ZIP: " + path + " → " + eFile.getMessage());
                }
            }

            if (!added) {
                System.err.println("⚠ Archivo NO encontrado para: "
                        + item.COUNTRY + " | " + item.CUSTOMER + " | " + item.DATESETT);
            }

        }
    } catch (Exception eFolder) {
        System.err.println("⚠ Carpeta inaccesible: país=" + item.COUNTRY + ", fecha=" + item.DATESETT);
    }
}


        zos.close();

        System.out.println("📦 Archivos incluidos en el ZIP: " + addedFiles + " de " + list.size());

        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=\"BSP_Files.zip\"");
        Files.copy(tempZip.toPath(), response.getOutputStream());
        response.flushBuffer();
        tempZip.delete();
    }

    
}
