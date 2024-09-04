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
import java.io.InputStream;
import java.io.PrintWriter;
import static java.lang.System.console;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankReconciliationLogic;
import net.miatech.praxis.logic.payments.MerchantNumberLogic;
import net.miatech.praxis.logic.payments.RejectionstLogic;
import net.miatech.praxis.logic.payments.OutputsLogic;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
@RequestMapping("/Outputs")
public class OutputsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private OutputsLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Outputs/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Outputs : Search-------------");
        map.put("success", true);
        List<A2353Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2353Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2353Filter> lst = new ArrayList<>(0);

        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new OutputsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);
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

            lst = logic.loadPX285SQP05104(filter);
            System.out.println("Total : " + lst.size());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2353Filter> getList100(HttpServletRequest request, Boolean bExcel) {

        List<A2353Filter> lst = new ArrayList<>(0);

        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new OutputsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);
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

            lst = logic.loadPX285SQP05105(filter);
            System.out.println("Total : " + lst.size());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/obtainCores")
    public @ResponseBody
    String obtainCores(ModelMap map, HttpServletRequest request) {
        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2353Filter> lst = new ArrayList<>(0);
        try {
            logic = new OutputsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);

            lst = logic.loadPX285SQP05106(filter);

            map.put("success", true);
            System.out.println("Total : " + lst.size());
            map.put("data", lst);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Outputs - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            A2353Filter beanL;
            List<A2353Filter> listaData = new ArrayList<>(0);
            List<A2353Filter> lstAr = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + lstAr.size());

            for (int i = 0; i < lstAr.size(); i++) {
                beanL = new A2353Filter();
                beanL.TRAN = lstAr.get(i).TRAN;

                String[] fields = lstAr.get(i).DDATA.split(";");
                beanL.CAMP00 = fields[0];
                beanL.CAMP01 = fields[1];
                beanL.CAMP02 = fields[2];
                beanL.CAMP03 = fields[3];
                beanL.CAMP04 = fields[4];
                beanL.CAMP05 = fields[5];
                beanL.CAMP06 = fields[6];
                beanL.CAMP07 = fields[7];
                beanL.CAMP08 = fields[8];
                beanL.CAMP09 = fields[9];
                beanL.CAMP10 = fields[10];
                beanL.CAMP11 = fields[11];
                beanL.CAMP12 = fields[12];
                beanL.CAMP13 = fields[13];
                beanL.CAMP14 = fields[14];
                beanL.CAMP15 = fields[15];
                beanL.CAMP16 = fields[16];
                beanL.CAMP17 = fields[17];
                beanL.CAMP18 = fields[18];
                beanL.CAMP19 = fields[19];
                beanL.CAMP20 = fields[20];
                beanL.CAMP21 = fields[21];
                beanL.CAMP22 = fields[22];
                beanL.CAMP23 = fields[23];
                beanL.CAMP24 = fields[24];
                beanL.CAMP25 = fields[25];

                beanL.DATEC = lstAr.get(i).DATEC;
                beanL.TRANC = lstAr.get(i).TRANC;
                beanL.COREP = lstAr.get(i).COREP;
                System.out.println(i);

                listaData.add(beanL);
            }

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);

            CH1_0.setCellValue("Transaction Number");
            CH1_2.setCellValue("Sales Data");
            CH1_27.setCellValue("Date Conciliations");
            CH1_28.setCellValue("Transactions Conc.");
            CH1_29.setCellValue("Core Process");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
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

                rcell0.setCellValue(listaData.get(vi).TRAN);
                rcell1.setCellValue(listaData.get(vi).CAMP00);
                rcell2.setCellValue(listaData.get(vi).CAMP01);
                rcell3.setCellValue(listaData.get(vi).CAMP02);
                rcell4.setCellValue(listaData.get(vi).CAMP03);
                rcell5.setCellValue(listaData.get(vi).CAMP04);
                rcell6.setCellValue(listaData.get(vi).CAMP05);
                rcell7.setCellValue(listaData.get(vi).CAMP06);
                rcell8.setCellValue(listaData.get(vi).CAMP07);
                rcell9.setCellValue(listaData.get(vi).CAMP08);
                rcell10.setCellValue(listaData.get(vi).CAMP09);
                rcell11.setCellValue(listaData.get(vi).CAMP10);
                rcell12.setCellValue(listaData.get(vi).CAMP11);
                rcell13.setCellValue(listaData.get(vi).CAMP12);
                rcell14.setCellValue(listaData.get(vi).CAMP13);
                rcell15.setCellValue(listaData.get(vi).CAMP14);
                rcell16.setCellValue(listaData.get(vi).CAMP15);
                rcell17.setCellValue(listaData.get(vi).CAMP16);
                rcell18.setCellValue(listaData.get(vi).CAMP17);
                rcell19.setCellValue(listaData.get(vi).CAMP18);
                rcell20.setCellValue(listaData.get(vi).CAMP19);
                rcell21.setCellValue(listaData.get(vi).CAMP20);
                rcell22.setCellValue(listaData.get(vi).CAMP21);
                rcell23.setCellValue(listaData.get(vi).CAMP22);
                rcell24.setCellValue(listaData.get(vi).CAMP23);
                rcell25.setCellValue(listaData.get(vi).CAMP24);
                rcell26.setCellValue(listaData.get(vi).CAMP25);
                rcell27.setCellValue(listaData.get(vi).DATEC);
                rcell28.setCellValue(listaData.get(vi).TRANC);
                rcell29.setCellValue(listaData.get(vi).COREP);
                System.out.println(vi);
                iter.next();
                ++vi;
                ++vj;
            }

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

    @RequestMapping(value = "getTXT")
    public @ResponseBody
    void getTXT(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("LIQUIDACION : getTXT");
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";
        String name = "LIQUIDACION - ";

        HashMap<String, String> hmCCUST = new HashMap<String, String>();
        hmCCUST.put("134", "AVIANCA");
        hmCCUST.put("202", "TACA");
        hmCCUST.put("133", "LACSA");
        hmCCUST.put("547", "AEROGAL");

        try {
            List<A2353Filter> listaData = this.getList(request, true);

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);

            name += filter.IN_PRDA;

            if (hmCCUST.containsKey(filter.IN_CCUST)) {
                name += " - " + hmCCUST.get(filter.IN_CCUST);
            } else {
                name += " - AVIANCA";
            }
            if (filter.IN_FUENTE.equals("C")) {
                name += " - COLOMBIA";
            } else {
                name += " - EXTERIOR";
            }
            if (!filter.IN_CORE.equals("")) {
                name += " - " + filter.IN_CORE;
            }

            int len = listaData.size();
            Integer vi = 0;
            String fileName = name;
            File file = new File(rutaFile + "\\" + fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;

            cadena = "Fecha de Abono | Fecha de Transaccion | IATA | Terminal | Codigo de venta | Valor de Venta | Valor IVA | Propina | Valor Total | Comision | Base Rte Fuente | Rte Fuente | Rte IVA | Base Rte ICA | Rte ICA | Neto | Nro Tarjeta de Credito Debito | Autorizacion | Tipo de Tarjeta | Nro de cuenta | Cod Banco | Cod unico | Red | Nro Tiquete | LLAVE | DOC SAP | STVAL | KEYC | CORE PROC";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + listaData.get(vi).DDATA.replaceAll(";", "|") + "|";//
                if (listaData.get(vi).DATEC == null || listaData.get(vi).DATEC.isEmpty()) {
                    cadena += "" + "|" + listaData.get(vi).COREP;
                } else {
                    cadena += listaData.get(vi).DATEC + listaData.get(vi).TRANC + "|" + listaData.get(vi).COREP;
                }
                cadena = cadena.replaceAll("null", "");
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getTXT100")
    public @ResponseBody
    void getTXT100(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("TICKETS : getTXT100");
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";
        String name = "TICKETS - ";

        HashMap<String, String> hmCCUST = new HashMap<String, String>();
        hmCCUST.put("134", "AVIANCA");
        hmCCUST.put("202", "TACA");
        hmCCUST.put("133", "LACSA");
        hmCCUST.put("547", "AEROGAL");

        try {

            List<A2353Filter> listaData = this.getList100(request, true);

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);

            name += filter.IN_PRDA;

            if (hmCCUST.containsKey(filter.IN_CCUST)) {
                name += " - CLIENT " + hmCCUST.get(filter.IN_CCUST);
            } else {
                name += " - CLIENT AVIANCA";
            }
            if (filter.IN_FUENTE.equals("C")) {
                name += " - COLOMBIA";
            } else {
                name += " - EXTERIOR";
            }
            if (!filter.IN_CORE.equals("")) {
                name += " - PROCES " + filter.IN_CORE;
            }

            int len = listaData.size();
            Integer vi = 0;
            String fileName = name;
            File file = new File(rutaFile + "\\" + fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;

            cadena = "DOCNUM | CFUENTE | SAGENT | SDATE | SPNR | SCARDN | SAUTHOC | SCARCOD | SCURRENCY | SVFOP | KEYCRUCE | BANDOC | INVOICE | CORE PROC";
            writer.println("" + cadena);

            for (vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + listaData.get(vi).TRAMA.replaceAll(";", "|") + "|" + listaData.get(vi).COREP.trim();//

                cadena = cadena.replaceAll("null", "");
                writer.println("" + cadena);
            }
            writer.flush();
            writer.close();

            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
}
