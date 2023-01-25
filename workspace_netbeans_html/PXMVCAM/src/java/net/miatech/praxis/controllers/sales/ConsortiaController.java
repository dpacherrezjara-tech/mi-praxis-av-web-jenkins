/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP00790Filter;
import net.miatech.beans.SQP00791Filter;
import net.miatech.beans.SQP00792Filter;
import net.miatech.beans.SQP00793Filter;
import net.miatech.beans.SQP00794Filter;
import net.miatech.beans.SQP00795Filter;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConsortiaLogic;
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
import net.miatech.praxis.classes.ProReportCommCTIA;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/Consortia")
public class ConsortiaController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ConsortiaLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Consortia/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Consortia : Search-------------");
        map.put("success", true);
        List<SQP00790Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00790Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ConsortiaLogic();

        List<SQP00790Filter> lst = new ArrayList<>(0);
        SQP00790Filter filter = new SQP00790Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A2444CCUST = request.getParameter("IN_A2444CCUST");
            filter.IN_A2444IATA = request.getParameter("IN_A2444IATA");
            filter.IN_A2444LOTE = request.getParameter("IN_A2444LOTE");
            filter.IN_A2444FINI = request.getParameter("IN_A2444FINI");
            filter.IN_A2444FINI2 = request.getParameter("IN_A2444FINI2");
            filter.A2444STAT = request.getParameter("A2444STAT");

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

            lst = logic.loadPX117A1728(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadDataMail")
    public @ResponseBody
    String loadDataMail(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Consortia : loadDataMail-------------");
        map.put("success", true);
        logic = new ConsortiaLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<SQP00794Filter> lst;
        SQP00794Filter filter = new SQP00794Filter();
        filter.VP_A2444CCUST = request.getParameter("VP_A2444CCUST");
        filter.VP_A2444IATA = request.getParameter("VP_A2444IATA");
        filter.VP_A2444LOTE = request.getParameter("VP_A2444LOTE");
        lst = logic.loadPX117S04A1728(filter);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "updateAcuse")
    public @ResponseBody
    String updateAcuse(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Consortia : loadDataMail-------------");
        map.put("success", true);
        logic = new ConsortiaLogic();
        logic.setSession(this.serverSession.getServerSession());

        SQP00793Filter filter = new SQP00793Filter();
        SQP00793Filter result;
        filter.VP_ACTION = request.getParameter("VP_ACTION");
        filter.VP_A2444CCUST = request.getParameter("VP_A2444CCUST");
        filter.VP_A2444LOTE = request.getParameter("VP_A2444LOTE");
        filter.VP_A2444IATA = request.getParameter("VP_A2444IATA");
        filter.VP_A2444FACUS = request.getParameter("VP_A2444FACUS");
        filter.VP_A2444HACUS = request.getParameter("VP_A2444HACUS");
        result = logic.setPX117S2A1728(filter);
        map.put("result", result);
        map.put("MESSAGE", result.dbException.MESSAGE);
        map.put("SQLCODE", result.dbException.SQLCODE);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "sendMail")
    public @ResponseBody
    String sendMail(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Consortia : sendMail-------------");
        map.put("success", true);
        logic = new ConsortiaLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<SQP00794Filter> lst;
        boolean iboolean;
        SQP00791Filter objRtn;
        SQP00794Filter beanData = new SQP00794Filter();
        SQP00795Filter beanDataRpt = new SQP00795Filter();
        SQP00791Filter filter = new SQP00791Filter();
        SQP00794Filter filter2 = new SQP00794Filter();
        SQP00795Filter filter3 = new SQP00795Filter();

        filter2.VP_A2444CCUST = request.getParameter("VP_A2447CCUST");
        filter2.VP_A2444IATA = request.getParameter("VP_A2447IATA");
        filter2.VP_A2444LOTE = request.getParameter("VP_A2447LOTE");

        beanData = logic.loadDataEnvioMail(filter2);

        filter3.VP_A2444CCUST = request.getParameter("VP_A2447CCUST");
        filter3.VP_A2444IATA = request.getParameter("VP_A2447IATA");
        filter3.VP_A2444LOTE = request.getParameter("VP_A2447LOTE");

        beanDataRpt = logic.loadPX117S03A1728(filter3);

        ProReportCommCTIA proReportCommFOB = new ProReportCommCTIA();
        proReportCommFOB.createReport(beanDataRpt);

        // Enviar el Mail            
        iboolean = SendMail(beanData, proReportCommFOB);
        if (iboolean) {
            // Registra Envio A1728 (Actualiza Estado)
            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.VP_A2447CCUST = request.getParameter("VP_A2447CCUST");
            filter.VP_A2447IATA = request.getParameter("VP_A2447IATA");
            filter.VP_A2447LOTE = request.getParameter("VP_A2447LOTE");
            filter.VP_TIPO_ENVIO = request.getParameter("VP_TIPO_ENVIO");

            objRtn = logic.setPX117S01A1728(filter);
            map.put("MESSAGE", objRtn.dbException.MESSAGE);
            map.put("SQLCODE", objRtn.dbException.SQLCODE);

        } else {
            map.put("MESSAGE", "Could not send email!");
            map.put("SQLCODE", "-1");

        }

        return new Gson().toJson(map);
    }

    // Mail    
    public boolean SendMail(SQP00794Filter Data, ProReportCommCTIA report) {
        boolean iboolean;

        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<>();
        String strMailsRe = Data.A003MAIL;
        String[] partsRe = strMailsRe.split(";");
        for (int i = 0; i < partsRe.length; i++) {
            receptores.add(partsRe[i]);
        }
        //receptores.add(Data.A003MAIL);
        // Emails CC
        List<String> Ccp = new ArrayList<>();
        String strMails = Data.EmailCcp;
        String[] parts = strMails.split(";");
        for (int i = 0; i < parts.length; i++) {
            Ccp.add(parts[i]);
        }
        String emisor = Data.EmailRe;
        String asunto = Data.Asunto;
        String mensaje = Data.Mensaje;
        List<String> archivos = new ArrayList<>();
        archivos.add(report.getFile().get(0).getAbsolutePath());
        archivos.add(report.getFile().get(1).getAbsolutePath());
        iboolean = proMail.enviaCONS_HTML(emisor, asunto, receptores, Ccp, mensaje, archivos, this.serverSession.getServerSession());
        return iboolean;
    }

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Consortia : loadTicket-------------");
        map.put("success", true);
        List<SQP00792Filter> lst = this.getListTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00792Filter> getListTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new ConsortiaLogic();

        List<SQP00792Filter> lst = new ArrayList<>(0);
        SQP00792Filter filter = new SQP00792Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_A2445CCUST = request.getParameter("IN_A2445CCUST");
            filter.IN_A2445IATA = request.getParameter("IN_A2445IATA");
            filter.IN_A2445LOTE = request.getParameter("IN_A2445LOTE");
            filter.IN_TKT = request.getParameter("IN_TKT");

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

            lst = logic.loadPX117A1729(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }
//
//    @RequestMapping(value = "validarCodigoIATA")
//    public @ResponseBody
//    String validarCodigoIATA(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- searchByCode : validarCodigoIATA-------------");
//
//        logic = new ConsortiaLogic();
//        map.put("success", true);
//        String VP_OPTION;
//        String VP_PARAM;
//        String result;
//        try {
//            logic.setSession(this.serverSession.getServerSession());
//            VP_OPTION = request.getParameter("VP_OPTION");
//            VP_PARAM = request.getParameter("VP_PARAM");
//            System.out.println("VP_OPTION -> " + VP_OPTION);
//            System.out.println("VP_PARAM -> " + VP_PARAM);
//            result = logic.get_PX112S03A1757(VP_OPTION, VP_PARAM);
//            if (result == null) {
//                result = "";
//            }
//
//        } catch (Exception e) {
//            result = "";
//            System.out.println("--> " + e.getMessage());
//            throw new SpringException(e);
//        }
//        map.put("result", result);
//        return new Gson().toJson(map);
//
//    }
//
//    @RequestMapping(value = "mantenimiento")
//    public @ResponseBody
//    String mantenimiento(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- searchByCode : mantenimiento-------------");
//        SQP00806Filter filter = new SQP00806Filter();
//        SQP00806Filter objRtn;
//        logic = new ConsortiaLogic();
//        map.put("success", true);
//
//        try {
//            logic.setSession(this.serverSession.getServerSession());
//
//            filter.OPCION = request.getParameter("OPCION");
//            filter.A2448CCUST = request.getParameter("A2448CCUST");
//            filter.A2448IATA = request.getParameter("A2448IATA");
//            filter.A2448CODEA = request.getParameter("A2448CODEA");
//            filter.A2448DESCR = request.getParameter("A2448DESCR");
//            filter.A2448FORMA = request.getParameter("A2448FORMA");
//            filter.A2448TRNCU = request.getParameter("A2448TRNCU");
//            filter.A2448CLASX = request.getParameter("A2448CLASX");
//            filter.A2448TRNCU = request.getParameter("A2448TRNCU");
//            filter.A2448CODEX = request.getParameter("A2448CODEX");
//            filter.A2448SCODX = request.getParameter("A2448SCODX");
//            filter.A2448IATAX = request.getParameter("A2448IATAX");
//            filter.A2448MCARR = request.getParameter("A2448MCARR");
//            filter.A2448TPASS = request.getParameter("A2448TPASS");
//            filter.A2448ACODE = request.getParameter("A2448ACODE");
//            filter.A2448TOUR = request.getParameter("A2448TOUR");
//            filter.A2448FBASI = request.getParameter("A2448FBASI");
//            filter.A2448TDESI = request.getParameter("A2448TDESI");
//            filter.A2448CLASS = request.getParameter("A2448CLASS");
//            filter.A2448CODE = request.getParameter("A2448CODE");
//            filter.A2448SCODE = request.getParameter("A2448SCODE");
//            filter.A2448MOPAY = request.getParameter("A2448MOPAY");
//            filter.A2448ANCIL = request.getParameter("A2448ANCIL");
//            filter.A2448COMM = Double.parseDouble(request.getParameter("A2448COMM"));
//            filter.A2448FINIV = request.getParameter("A2448FINIV");
//            filter.A2448FFINV = request.getParameter("A2448FFINV");
//
//            objRtn = logic.setSQP00651(filter);
//
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//            logError.error(e.getMessage());
//            throw new SpringException(e);
//        }
//        map.put("objRtn", objRtn);
//        return new Gson().toJson(map);
//
//    }
//

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Consortia : getXLSX");

        String fileNameDownload = String.format("Consortia - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP00790Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Consortia");

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
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);
            Cell CH1_15 = row.createCell(15);
            Cell CH1_16 = row.createCell(16);
            Cell CH1_17 = row.createCell(17);
            Cell CH1_18 = row.createCell(18);

            CH1_00.setCellValue("IATA");
            CH1_01.setCellValue("FOB Name");
            CH1_02.setCellValue("Open Date");
            CH1_03.setCellValue("Close Date");
            CH1_04.setCellValue("Curr.");
            CH1_05.setCellValue("Fare/Ancillaries");
            CH1_06.setCellValue("Comm.");
            CH1_07.setCellValue("IVA");
            CH1_08.setCellValue("Comm. +  IVA");
            CH1_09.setCellValue("Total Cash");
            CH1_10.setCellValue("Total Cash - Commission");
            CH1_11.setCellValue("Send to FOB");
            CH1_13.setCellValue("Acuse");
            CH1_14.setCellValue("Received From FOB");
            CH1_18.setCellValue("Id Lote");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            ++vj;
            row = sheet.createRow(vj);

            Cell CH2_00 = row.createCell(0);
            Cell CH2_01 = row.createCell(1);
            Cell CH2_02 = row.createCell(2);
            Cell CH2_03 = row.createCell(3);
            Cell CH2_04 = row.createCell(4);
            Cell CH2_05 = row.createCell(5);
            Cell CH2_06 = row.createCell(6);
            Cell CH2_07 = row.createCell(7);
            Cell CH2_08 = row.createCell(8);
            Cell CH2_09 = row.createCell(9);
            Cell CH2_10 = row.createCell(10);
            Cell CH2_11 = row.createCell(11);
            Cell CH2_12 = row.createCell(12);
            Cell CH2_13 = row.createCell(13);
            Cell CH2_14 = row.createCell(14);
            Cell CH2_15 = row.createCell(15);
            Cell CH2_16 = row.createCell(16);
            Cell CH2_17 = row.createCell(17);
            Cell CH2_18 = row.createCell(18);

            CH2_11.setCellValue("Status");
            CH2_12.setCellValue("Date");
            CH2_14.setCellValue("App.");
            CH2_15.setCellValue("Status");
            CH2_16.setCellValue("Date");
            CH2_17.setCellValue("Accountign");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

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
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);
                Cell rcell15 = row.createCell(15);
                Cell rcell16 = row.createCell(16);
                Cell rcell17 = row.createCell(17);
                Cell rcell18 = row.createCell(18);

                rcell0.setCellValue(listaData.get(vi).A2444IATA);
                rcell1.setCellValue(listaData.get(vi).A003KEY3);
                rcell2.setCellValue(listaData.get(vi).A2444FINI);
                rcell3.setCellValue(listaData.get(vi).A2444FFIN);
                rcell4.setCellValue(listaData.get(vi).A2444MDARV);
                rcell5.setCellValue(listaData.get(vi).A2444FARE);
                rcell6.setCellValue(listaData.get(vi).A2444TCOM);
                rcell7.setCellValue(listaData.get(vi).A2444TIVA);
                rcell8.setCellValue(listaData.get(vi).A2444TCOMI);
                rcell9.setCellValue(listaData.get(vi).A2444TTCAS);
                rcell10.setCellValue(listaData.get(vi).A2444TCAMC);
                rcell11.setCellValue(listaData.get(vi).A2444STAT);
                rcell12.setCellValue(listaData.get(vi).A2444FENV);
                rcell13.setCellValue(listaData.get(vi).ACUSE);
                rcell14.setCellValue(listaData.get(vi).A2447INDAP);
                rcell15.setCellValue(listaData.get(vi).A2444STRC);
                rcell16.setCellValue(listaData.get(vi).A2444FREC);
                rcell17.setCellValue(listaData.get(vi).A2447INDCO);
                rcell18.setCellValue(listaData.get(vi).A2444LOTE);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
                rcell8.setCellStyle(bodyStyle);
                rcell9.setCellStyle(bodyStyle);
                rcell10.setCellStyle(bodyStyle);
                rcell11.setCellStyle(bodyStyle);
                rcell12.setCellStyle(bodyStyle);
                rcell13.setCellStyle(bodyStyle);
                rcell14.setCellStyle(bodyStyle);
                rcell15.setCellStyle(bodyStyle);
                rcell16.setCellStyle(bodyStyle);
                rcell17.setCellStyle(bodyStyle);
                rcell18.setCellStyle(bodyStyle);

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

    @RequestMapping(value = "getDetailXLSX")
    public @ResponseBody
    void getDetailXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Consortia : getXLSX");

        String fileNameDownload = String.format("Consortia - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP00792Filter> listaData = this.getListTicket(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Consortia");

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
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);
            Cell CH1_15 = row.createCell(15);
            Cell CH1_16 = row.createCell(16);
            Cell CH1_17 = row.createCell(17);
            Cell CH1_18 = row.createCell(18);

            CH1_00.setCellValue("Ticket");
            CH1_01.setCellValue("Trans. Type");
            CH1_02.setCellValue("CPN");
            CH1_03.setCellValue("CNJ");
            CH1_04.setCellValue("Issue Date");
            CH1_05.setCellValue("Carr");
            CH1_06.setCellValue("Fare Basis");
            CH1_07.setCellValue("Class");
            CH1_08.setCellValue("IT Tour Code");
            CH1_09.setCellValue("FOP");
            CH1_10.setCellValue("Station IATA");
            CH1_11.setCellValue("Coupon");
            CH1_15.setCellValue("Ancillaries/Charge");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 18));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            ++vj;
            row = sheet.createRow(vj);

            Cell CH2_00 = row.createCell(0);
            Cell CH2_01 = row.createCell(1);
            Cell CH2_02 = row.createCell(2);
            Cell CH2_03 = row.createCell(3);
            Cell CH2_04 = row.createCell(4);
            Cell CH2_05 = row.createCell(5);
            Cell CH2_06 = row.createCell(6);
            Cell CH2_07 = row.createCell(7);
            Cell CH2_08 = row.createCell(8);
            Cell CH2_09 = row.createCell(9);
            Cell CH2_10 = row.createCell(10);
            Cell CH2_11 = row.createCell(11);
            Cell CH2_12 = row.createCell(12);
            Cell CH2_13 = row.createCell(13);
            Cell CH2_14 = row.createCell(14);
            Cell CH2_15 = row.createCell(15);
            Cell CH2_16 = row.createCell(16);
            Cell CH2_17 = row.createCell(17);
            Cell CH2_18 = row.createCell(18);

            CH2_11.setCellValue("CPN Fare");
            CH2_12.setCellValue("Comm.");
            CH2_13.setCellValue("Agr. Code");
            CH2_14.setCellValue("%");
            CH2_15.setCellValue("Amount");
            CH2_16.setCellValue("Comm.");
            CH2_17.setCellValue("Agr. Code");
            CH2_18.setCellValue("%");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

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
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);
                Cell rcell15 = row.createCell(15);
                Cell rcell16 = row.createCell(16);
                Cell rcell17 = row.createCell(17);
                Cell rcell18 = row.createCell(18);

                rcell0.setCellValue(listaData.get(vi).TKT);
                rcell1.setCellValue(listaData.get(vi).A2445TRNCU);
                rcell2.setCellValue(listaData.get(vi).A2445CUPON);
                rcell3.setCellValue(listaData.get(vi).A2445FLAG);
                rcell4.setCellValue(listaData.get(vi).A2445FECVT);
                rcell5.setCellValue(listaData.get(vi).A2445CARR);
                rcell6.setCellValue(listaData.get(vi).A2445FBAS);
                rcell7.setCellValue(listaData.get(vi).A2445CLAS);
                rcell8.setCellValue(listaData.get(vi).A2445CODIT);
                rcell9.setCellValue(listaData.get(vi).A2445CFOP);
                rcell10.setCellValue(listaData.get(vi).A2445IATAE);
                rcell11.setCellValue(listaData.get(vi).A2445VCPN);
                rcell12.setCellValue(listaData.get(vi).A2445ACSC);
                rcell13.setCellValue(listaData.get(vi).A2445CCST);
                rcell14.setCellValue(listaData.get(vi).A2445PCSC);
                rcell15.setCellValue(listaData.get(vi).A2445OCANR);
                rcell16.setCellValue(listaData.get(vi).A2445COCAR);
                rcell17.setCellValue(listaData.get(vi).A2445AGRAN);
                rcell18.setCellValue(listaData.get(vi).A2445POCAN);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
                rcell8.setCellStyle(bodyStyle);
                rcell9.setCellStyle(bodyStyle);
                rcell10.setCellStyle(bodyStyle);
                rcell11.setCellStyle(bodyStyle);
                rcell12.setCellStyle(bodyStyle);
                rcell13.setCellStyle(bodyStyle);
                rcell14.setCellStyle(bodyStyle);
                rcell15.setCellStyle(bodyStyle);
                rcell16.setCellStyle(bodyStyle);
                rcell17.setCellStyle(bodyStyle);
                rcell18.setCellStyle(bodyStyle);

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

    @RequestMapping(value = "downloadText")
    public @ResponseBody
    void downloadText(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Inplant Report : getFile");

        
        List<SQP00792Filter> listaData = new ArrayList<SQP00792Filter>(0);
        SQP00792Filter filter = new SQP00792Filter();
        
        

        filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
        filter.IN_A2445CCUST = request.getParameter("IN_A2445CCUST");
        filter.IN_A2445LOTE = request.getParameter("IN_A2445LOTE");
        filter.page.PAGNUM = Integer.parseInt(request.getParameter("PAGNUM"));
        filter.page.PAGROW = Integer.parseInt(request.getParameter("TOTROW"));
        filter.page.TOTPAG = Integer.parseInt(request.getParameter("TOTPAG"));
        filter.page.TOTROW = Integer.parseInt(request.getParameter("PAGROW"));
        
        String NLOTE= filter.IN_A2445LOTE;
        String nameText = String.format("PX277-DetailCTIA-" + NLOTE+  "-" + Functions.getFechaActual() + "-"+String.valueOf(Math.random()).toLowerCase()+".txt", UUID.randomUUID().toString().toLowerCase());

        /*filter.page.TOTROW = -1;
        filter.page.START = -1;
        filter.page.LIMIT = -1;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = -1;*/
        try {
            //int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            //filter.page.PAGROW = -1;
            //filter.page.PAGNUM = -1;
            
            logic = new ConsortiaLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.downLoadDetalleCTIA(filter);
            
            
        } catch (NumberFormatException | SQLException ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        
        StringBuilder line = new StringBuilder();
        String fileNameDownload = nameText; //Functions.getFechaActual()+"-Inplant-Commissions" + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        //String delim = "\t";
        //String delim = "\r\n";
        //String delim = ";";
        String delim = ";";
        String cadena = "";
        //String texto = "Cia" + delim
        //        + "\r\n";

        //line.append(texto.toString());
        cadena = "IATA;Ticket;Coupon;Orig;Dest;CJN;Issue Date;Transaction Type;Carrier;Fare Basis;Class;IT Tour Code;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries/Charge Amount;Ancillaries/Charge Comm;Ancillaries/Charge Agr. Code;Ancillaries/Charge %;Lote;"+ "\r\n";
        line.append(cadena.toString());
        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            //listaData = this.getListTicket(request, true);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (SQP00792Filter obj : listaData) {
                //strTexto += item.OU_TRAMATXT + delim
                //       + "\r\n";
                
                cadena = "";                                
                cadena += "" + obj.A2445IATA + delim;
                cadena += "" + obj.TKT + delim;
                cadena += "" + obj.A2445CUPON + delim;
                cadena += "" + obj.A2445ORIG + delim;
                cadena += "" + obj.A2445DEST + delim;
                cadena += "" + obj.A2445FLAG + delim;
                cadena += "" + obj.A2445FECVT + delim;
                cadena += "" + obj.A2445TRNCU + delim;               
                cadena += "" + obj.A2445CARR + delim;
                cadena += "" + obj.A2445FBAS + delim;
                cadena += "" + obj.A2445CLAS + delim;
                cadena += "" + obj.A2445CODIT + delim;
                cadena += "" + obj.A2445CFOP + delim;
                cadena += "" + obj.A2445IATAE + delim;                
                cadena += "" + obj.A2445VCPN + delim;
                cadena += "" + obj.A2445ACSC+ delim;
                cadena += "" + obj.A2445CCST+ delim;
                cadena += "" + obj.A2445PCSC+ delim;
                cadena += "" + obj.A2445OCANR+ delim;
                cadena += "" + obj.A2445COCAR+ delim;
                cadena += "" + obj.A2445AGRAN+ delim;
                cadena += "" + obj.A2445POCAN+ delim;
                cadena += "" + obj.A2445LOTE+ delim;
                cadena += "\r\n";
                
                line.append(cadena.toString());
            }
            

            InputStream input = new ByteArrayInputStream(line.toString().getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());
        }

    }
    @RequestMapping(value = "/downloadText2")
    public @ResponseBody
    String downloadText2(ModelMap map, HttpServletRequest request) {
         
        String nameFile = "", nameLote = "", strZona = "", strType = "";
        String rutaFile= (String) serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME").toString();
        String rutaFlex= (String) serverSession.getServerSession().getPropertySession().get("RUTA_URL_FLEX").toString();
        String strName = ".txt";  
        
        
        nameFile = "PX277-DetailCTIA";
        
        File dir = new File(rutaFile);
        String[] ficheros = dir.list();
        int existe=0;
        PrintWriter pw = null; 
        List<SQP00792Filter> listaData = new ArrayList<SQP00792Filter>(0);
        int intData = 0;
        String cadena = "";
        Integer vi = 0;
        try {
            SQP00792Filter filter = new SQP00792Filter();
            
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_A2445CCUST = request.getParameter("IN_A2445CCUST");
            filter.IN_A2445LOTE = request.getParameter("IN_A2445LOTE");
            filter.page.PAGNUM = Integer.parseInt(request.getParameter("PAGNUM"));
            filter.page.PAGROW = Integer.parseInt(request.getParameter("TOTROW"));
            filter.page.TOTPAG = Integer.parseInt(request.getParameter("TOTPAG"));
            filter.page.TOTROW = Integer.parseInt(request.getParameter("PAGROW"));
            
            if(ficheros != null)
            {
                for (int x=0;x<ficheros.length;x++)
                {
                    if(ficheros[x].trim().equals(nameFile.trim())) //Si ya esta creado
                    {
                        existe=0;
                        break;
                    }                
                }
                if(existe!=1)  //Si no esta creado                
                {
                    //llamar store que trae la trama
                    logic = new ConsortiaLogic();
                    logic.setSession(this.serverSession.getServerSession());
                    listaData = logic.downLoadDetalleCTIA(filter);
                    intData = listaData.size();
                    if(listaData.size()>0)
                    {
                         pw = new PrintWriter(dir+"\\" + nameFile);
                            for(SQP00792Filter obj : listaData) 
                            {
                                cadena = "";
                                if ( vi == 0 ){
                                    cadena = "IATA;Ticket;Coupon;Orig;Dest;CJN;Issue Date;Transaction Type;Carrier;Fare Basis;Class;IT Tour Code;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries/Charge Amount;Ancillaries/Charge Comm;Ancillaries/Charge Agr. Code;Ancillaries/Charge %;Lote";
                                    pw.println(cadena);
                                }
                                //String trama = obj.OU_TRAMATXT;
                                cadena = "";                                
                                cadena += "" + obj.A2445IATA + ";";
                                cadena += "" + obj.TKT + ";";
                                cadena += "" + obj.A2445CUPON + ";";
                                cadena += "" + obj.A2445ORIG + ";";
                                cadena += "" + obj.A2445DEST + ";";
                                cadena += "" + obj.A2445FLAG + ";";
                                cadena += "" + obj.A2445FECVT + ";";
                                cadena += "" + obj.A2445TRNCU + ";";               
                                cadena += "" + obj.A2445CARR + ";";
                                cadena += "" + obj.A2445FBAS + ";";
                                cadena += "" + obj.A2445CLAS + ";";
                                cadena += "" + obj.A2445CODIT + ";";
                                cadena += "" + obj.A2445CFOP + ";";
                                cadena += "" + obj.A2445IATAE + ";";                
                                cadena += "" + obj.A2445VCPN + ";";
                                cadena += "" + obj.A2445ACSC+ ";";
                                cadena += "" + obj.A2445CCST+ ";";
                                cadena += "" + obj.A2445PCSC+ ";";
                                cadena += "" + obj.A2445OCANR+ ";";
                                cadena += "" + obj.A2445COCAR+ ";";
                                cadena += "" + obj.A2445AGRAN+ ";";
                                cadena += "" + obj.A2445POCAN+ ";";
                                cadena += "" + obj.A2445LOTE;  
                                pw.println(cadena);   
                                vi++;
                           }
                         pw.flush();
                         pw.close();
                         pw = null;
                    }
                    else
                    {
                        pw = new PrintWriter(dir+"\\" + nameFile);
                        String trama = "";
                        pw.println(trama);                            
                        pw.flush();
                        pw.close();
                        pw = null;
                    }
                }
                map.put("success", true);
                map.put("lstFile", rutaFlex +"-"+ nameFile+"-"+ String.valueOf(intData) +"-"+ String.valueOf(Math.random()) + "" + strName);
                map.put("listaData", listaData);
            }
            else
            {
                map.put("success", true);
                map.put("lstFile", "Crear");
                map.put("listaData", null);
            }
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (IOException ex) {
            map.put("success", false);
            map.put("lstProccess", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("lstProccess", "Se produjo un error. " + ex.getMessage());
        }
        finally
        {    
            //if(existe!=1) pw.close();
        }
        return new Gson().toJson(map);
    }
}
