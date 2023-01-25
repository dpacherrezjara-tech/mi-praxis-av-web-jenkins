/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX117A1728Filter;
import net.miatech.beans.PX117A1729Filter;
import net.miatech.beans.PX117S01A1728Filter;
import net.miatech.beans.PX117S03A1728Filter;
import net.miatech.beans.PX117S04A1728Filter;
import net.miatech.beans.PX117S2A1728Filter;
import net.miatech.beans.SQP00794Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.FOBLogic;
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
import net.miatech.praxis.classes.ProReportCommFOB;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/FOB")
public class FOBController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private FOBLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/FOB/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- FOB : Search-------------");
        map.put("success", true);
        List<PX117A1728Filter> lst = this.getList(request, false);
//        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX117A1728Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new FOBLogic();

        List<PX117A1728Filter> lst = new ArrayList<>(0);
        PX117A1728Filter filter = new PX117A1728Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A1728CCUST = request.getParameter("IN_A1728CCUST");
            filter.IN_A1728IATA = request.getParameter("IN_A1728IATA");
            filter.IN_A1728LOTE = request.getParameter("IN_A1728LOTE");
            filter.IN_A1728FINI = request.getParameter("IN_A1728FINI");
            filter.IN_A1728FINI2 = request.getParameter("IN_A1728FINI2");
            filter.A1728STAT = request.getParameter("A1728STAT");

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
//        System.out.println("-------------- FOB : loadDataMail-------------");
        map.put("success", true);
        logic = new FOBLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<PX117S04A1728Filter> lst;
        PX117S04A1728Filter filter = new PX117S04A1728Filter();
        filter.VP_A1728CCUST = request.getParameter("VP_A1728CCUST");
        filter.VP_A1728IATA = request.getParameter("VP_A1728IATA");
        filter.VP_A1728LOTE = request.getParameter("VP_A1728LOTE");
        lst = logic.loadPX117S04A1728(filter);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "updateAcuse")
    public @ResponseBody
    String updateAcuse(ModelMap map, HttpServletRequest request) throws Exception {
//        System.out.println("-------------- FOB : loadDataMail-------------");
        map.put("success", true);
        logic = new FOBLogic();
        logic.setSession(this.serverSession.getServerSession());

        PX117S2A1728Filter filter = new PX117S2A1728Filter();
        PX117S2A1728Filter result;
        filter.VP_ACTION = request.getParameter("VP_ACTION");
        filter.VP_A1728CCUST = request.getParameter("VP_A1728CCUST");
        filter.VP_A1728LOTE = request.getParameter("VP_A1728LOTE");
        filter.VP_A1728IATA = request.getParameter("VP_A1728IATA");
        filter.VP_A1728FACUS = request.getParameter("VP_A1728FACUS");
        filter.VP_A1728HACUS = request.getParameter("VP_A1728HACUS");
        result = logic.setPX117S2A1728(filter);
        map.put("result", result);
        map.put("MESSAGE", result.dbException.MESSAGE);
        map.put("SQLCODE", result.dbException.SQLCODE);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "sendMail")
    public @ResponseBody
    String sendMail(ModelMap map, HttpServletRequest request) throws Exception {
//        System.out.println("-------------- FOB : sendMail-------------");
        map.put("success", true);
        logic = new FOBLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<SQP00794Filter> lst;
        boolean iboolean;
        PX117S01A1728Filter objRtn;
        PX117S04A1728Filter beanData = new PX117S04A1728Filter();
        PX117S03A1728Filter beanDataRpt = new PX117S03A1728Filter();
        PX117S01A1728Filter filter = new PX117S01A1728Filter();
        PX117S04A1728Filter filter2 = new PX117S04A1728Filter();
        PX117S03A1728Filter filter3 = new PX117S03A1728Filter();
//        NEW. VH
        filter.VP_ACTION    = request.getParameter("VP_ACTION");
        filter.VP_A1757CCUST = request.getParameter("VP_A1757CCUST");
        filter.VP_A1757IATA = request.getParameter("VP_A1757IATA");
        filter.VP_A1757LOTE = request.getParameter("VP_A1757LOTE");
        filter.VP_TIPO_ENVIO = request.getParameter("VP_TIPO_ENVIO");
                
        filter2.VP_A1728CCUST = request.getParameter("VP_A1757CCUST");
        filter2.VP_A1728IATA = request.getParameter("VP_A1757IATA");
        filter2.VP_A1728LOTE = request.getParameter("VP_A1757LOTE");

        beanData = logic.loadDataEnvioMail(filter2);

        filter3.VP_A1728CCUST = request.getParameter("VP_A1757CCUST");
        filter3.VP_A1728IATA = request.getParameter("VP_A1757IATA");
        filter3.VP_A1728LOTE = request.getParameter("VP_A1757LOTE");

        beanDataRpt = logic.loadPX117S03A1728(filter3);

        ProReportCommFOB proReportCommFOB = new ProReportCommFOB();
        proReportCommFOB.createReport(beanDataRpt);

        // Enviar el Mail            
        iboolean = SendMail(beanData, proReportCommFOB);
        if (iboolean) {
            // Registra Envio A1728 (Actualiza Estado)
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
    public boolean SendMail(PX117S04A1728Filter Data, ProReportCommFOB report) {
        boolean iboolean;

        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<>();

        receptores.add(Data.A003MAIL);
        /*
         //temporal borrar
         if(true){
         receptores.add("sifuentesrojas@gmail.com");
         }else{        
            
         }
         */
        // Emails CC
        List<String> Ccp = new ArrayList<>();
        String strMails = Data.EmailCcp;

        //temporal borrar
        //strMails = "asifuentes@miatech.net;oldman_100_6@hotmail.com";
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
        iboolean = proMail.envia_html(emisor, asunto, receptores, Ccp, mensaje, 
                archivos, 
//                "notificaciones@miatech.net", 
                "amcontrolventasfranquicias@aeromexico.com", 
                this.serverSession.getServerSession());
        return iboolean;
    }

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- FOB : loadTicket-------------");
        map.put("success", true);
        List<PX117A1729Filter> lst = this.getListTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX117A1729Filter> getListTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new FOBLogic();

        List<PX117A1729Filter> lst = new ArrayList<>(0);
        PX117A1729Filter filter = new PX117A1729Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_A1729CCUST = request.getParameter("IN_A1729CCUST");
            filter.IN_A1729IATA = request.getParameter("IN_A1729IATA");
            filter.IN_A1729LOTE = request.getParameter("IN_A1729LOTE");
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

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        //System.out.println("FOB : getXLSX");        
        String fileNameDownload = String.format("PX117_" + Functions.getFechaActual() + "_FOB.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX117A1728Filter> listaData = this.getList(request, true);

            //System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("PX117_" + Functions.getFechaActual() + "_FOB");

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
            Cell CH1_19 = row.createCell(19);
            Cell CH1_20 = row.createCell(20);

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
            CH1_18.setCellValue("Payment");
            CH1_20.setCellValue("ID Lote");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 20, 20));

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
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);

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
            Cell CH2_19 = row.createCell(19);
            Cell CH2_20 = row.createCell(20);

            CH2_11.setCellValue("Status");
            CH2_12.setCellValue("Date");
            CH2_14.setCellValue("App.");
            CH2_15.setCellValue("Status");
            CH2_16.setCellValue("Date");
            CH2_17.setCellValue("Accounting");
            CH2_18.setCellValue("Reference Code");
            CH2_19.setCellValue("Validity");

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
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);

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
                Cell rcell19 = row.createCell(19);
                Cell rcell20 = row.createCell(20);

                rcell0.setCellValue(listaData.get(vi).A1728IATA);
                rcell1.setCellValue(listaData.get(vi).A003KEY3);
                rcell2.setCellValue(listaData.get(vi).A1728FINI);
                rcell3.setCellValue(listaData.get(vi).A1728FFIN);
                rcell4.setCellValue(listaData.get(vi).A1728MDALC);
                rcell5.setCellValue(listaData.get(vi).A1728FARE);
                rcell6.setCellValue(listaData.get(vi).A1728TCOM);
                rcell7.setCellValue(listaData.get(vi).A1728TIVA);
                rcell8.setCellValue(listaData.get(vi).A1728TCOMI);
                rcell9.setCellValue(listaData.get(vi).A1728TTCAS);
                rcell10.setCellValue(listaData.get(vi).A1728TCAMC);
                rcell11.setCellValue(listaData.get(vi).A1728STAT);
                rcell12.setCellValue(listaData.get(vi).A1728FENV);
                rcell13.setCellValue(listaData.get(vi).ACUSE);
                rcell14.setCellValue(listaData.get(vi).A1757INDAP);
                rcell15.setCellValue(listaData.get(vi).A1728STRC);
                rcell16.setCellValue(listaData.get(vi).A1728FREC);
                rcell17.setCellValue(listaData.get(vi).A1757INDCO);
                rcell18.setCellValue(listaData.get(vi).A1728REFER);
                rcell19.setCellValue(listaData.get(vi).A1728FVIGF);
                rcell20.setCellValue(listaData.get(vi).A1728LOTE);

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
//        System.out.println("FOB : getXLSX");

        String fileNameDownload = String.format("PX117_" + Functions.getFechaActual() + "_FOB_Determination.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX117A1729Filter> listaData = this.getListTicket(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("PX117_"+Functions.getFechaActual()+"_FOB_Determination");

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
                rcell1.setCellValue(listaData.get(vi).A1729TRNCU);
                rcell2.setCellValue(listaData.get(vi).A1729CUPON);
                rcell3.setCellValue(listaData.get(vi).A1729FLAG);
                rcell4.setCellValue(listaData.get(vi).A1729FECVT);
                rcell5.setCellValue(listaData.get(vi).A1729CARR);
                rcell6.setCellValue(listaData.get(vi).A1729FBAS);
                rcell7.setCellValue(listaData.get(vi).A1729CLAS);
                rcell8.setCellValue(listaData.get(vi).A1729CODIT);
                rcell9.setCellValue(listaData.get(vi).A1729CFOP);
                rcell10.setCellValue(listaData.get(vi).A1729IATAE);
                rcell11.setCellValue(listaData.get(vi).A1729VCPN);
                rcell12.setCellValue(listaData.get(vi).A1729ACSC);
                rcell13.setCellValue(listaData.get(vi).A1729CCST);
                rcell14.setCellValue(listaData.get(vi).A1729PCSC);
                rcell15.setCellValue(listaData.get(vi).A1729OCANR);
                rcell16.setCellValue(listaData.get(vi).A1729COCAR);
                rcell17.setCellValue(listaData.get(vi).A1729AGRAN);
                rcell18.setCellValue(listaData.get(vi).A1729POCAN);

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
//    NEW. VH

    @RequestMapping(value = "downloadDetailLoteText")
    public @ResponseBody
    void downloadDetailLoteText(HttpServletRequest request, HttpServletResponse response) {
        PX117A1729Filter filter = new PX117A1729Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();        

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            filter.page.PAGNUM = -1;            
            filter.page.PAGROW = -1;                              
            logic = new FOBLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX117A1729Filter> lst = logic.loadSQP02647(filter);

            int len = lst.size();
            Integer vi = 0;
//            PX117-DetailFOB-13928_20200102000283.txt
            String fileNameDownload = String.format("PX117-DetailFOB-" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
            File file = new File(rutaFile + "\\" + fileNameDownload + ".txt");
            if (file.exists()) {
                file.delete();
            }
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "IATA;Ticket;Coupon;Orig;Dest;CJN;Issue Date;Transaction Type;Carrier;Fare Basis;Class;IT Tour Code;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries/Charge Amount;Ancillaries/Charge Comm;Ancillaries/Charge Agr. Code;Ancillaries/Charge %;Lote";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + lst.get(vi).A1729IATA + ";";
                cadena += "" + lst.get(vi).TKT + ";";
                cadena += "" + lst.get(vi).A1729CUPON + ";";
                cadena += "" + lst.get(vi).A1729ORIG + ";";
                cadena += "" + lst.get(vi).A1729DEST + ";";
                cadena += "" + lst.get(vi).A1729FLAG + ";";
                cadena += "" + lst.get(vi).A1729FECVT + ";";
                cadena += "" + lst.get(vi).A1729TRNCU + ";";
                cadena += "" + lst.get(vi).A1729CARR + ";";
                cadena += "" + lst.get(vi).A1729FBAS + ";";
                cadena += "" + lst.get(vi).A1729CLAS + ";";
                cadena += "" + lst.get(vi).A1729CODIT + ";";
                cadena += "" + lst.get(vi).A1729CFOP + ";";
                cadena += "" + lst.get(vi).A1729IATAE + ";";
                //fare
                cadena += "" + lst.get(vi).A1729VCPN + ";"; //fare
                cadena += "" + lst.get(vi).A1729ACSC + ";"; //com
                cadena += "" + lst.get(vi).A1729CCST+ ";"; //cod agre
                cadena += "" + lst.get(vi).A1729PCSC+ ";"; //%
                //anc
                cadena += "" + lst.get(vi).A1729OCANR+ ";"; //anc 
                cadena += "" + lst.get(vi).A1729COCAR+ ";"; //com anc
                cadena += "" + lst.get(vi).A1729AGRAN+ ";"; //cod apli
                cadena += "" + lst.get(vi).A1729POCAN+ ";"; //%
                
//                //CHARGE (NO ESTA EN PRODUCCION)
//                cadena += "" + lst.get(vi).A1729OCCAR+ ";";
//                cadena += "" + lst.get(vi).A1729COCCR+ ";";
//                cadena += "" + lst.get(vi).A1729AGRCA+ ";";
//                cadena += "" + lst.get(vi).A1729POCCA+ ";";
                
                cadena += "" + lst.get(vi).A1729LOTE;
                
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (!zip(fileNameDownload)) {
                response.setContentType("application/zip");
            }
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileNameDownload + ".zip" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileNameDownload + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
//            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    public Boolean zip(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".zip");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }

}
