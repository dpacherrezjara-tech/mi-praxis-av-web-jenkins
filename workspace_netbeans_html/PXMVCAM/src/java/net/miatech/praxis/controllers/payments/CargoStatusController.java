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
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.CargoStatusLogic;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF287;
import net.miatech.praxis.payment.MPF287Filter;
import net.miatech.praxis.payment.MPF304;
import net.miatech.praxis.payment.MPF304Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author singa
 */
@Controller
@Scope("request")
@RequestMapping("/CargoStatus")
public class CargoStatusController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CargoStatusLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/CargoStatus/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : Search-------------");
        map.put("success", true);
        List<MPF287> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF287> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF287> lst = new ArrayList<>(0);
        MPF287Filter filter = new MPF287Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF287Filter.class);
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

            lst = logic.loadMPS657(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchARC")
    public @ResponseBody
    String searchARC(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : Search ARC-------------");
        map.put("success", true);
        List<MPF221> lst = this.getListARC(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF221> getListARC(HttpServletRequest request, Boolean bExcel) {

        List<MPF221> lst = new ArrayList<>(0);
        MPF221Filter filter = new MPF221Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF221Filter.class);
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

            lst = logic.loadMPS446(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCartera")
    public @ResponseBody
    String searchCartera(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : searchCartera (MPS661) -------------");
        map.put("success", true);
        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());
            String beanString = request.getParameter("beanString");
            MPF287Filter filter = new Gson().fromJson(beanString, MPF287Filter.class);
            List<Map<String, String>> lst = logic.loadMPS661(filter);
            map.put("total", lst.size());
            map.put("data", lst);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSXARC")
    public @ResponseBody
    void getXLSXARC(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "ARC Reconciliation - " + Functions.getFechaActual() + ".xlsx";

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());
            String beanString = request.getParameter("beanString");
            MPF287Filter filter = new Gson().fromJson(beanString, MPF287Filter.class);
            List<Map<String, String>> listaData = logic.loadMPS661(filter);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("ARC Reconciliation");

            // ── Fonts ────────────────────────────────────────────────────────────
            Font boldFont = workbook.createFont();
            boldFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            boldFont.setColor(IndexedColors.BLACK.getIndex());

            Font normalFont = workbook.createFont();
            normalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

            // ── Header styles ────────────────────────────────────────────────────
            CellStyle styleBlue = workbook.createCellStyle();
            styleBlue.setFont(boldFont);
            styleBlue.setAlignment(CellStyle.ALIGN_CENTER);
            styleBlue.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleBlue.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleBlue.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBlue.setBorderBottom(CellStyle.BORDER_THIN);
            styleBlue.setBorderTop(CellStyle.BORDER_THIN);
            styleBlue.setBorderLeft(CellStyle.BORDER_THIN);
            styleBlue.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle styleYellow = workbook.createCellStyle();
            styleYellow.setFont(boldFont);
            styleYellow.setAlignment(CellStyle.ALIGN_CENTER);
            styleYellow.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            styleYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleYellow.setBorderBottom(CellStyle.BORDER_THIN);
            styleYellow.setBorderTop(CellStyle.BORDER_THIN);
            styleYellow.setBorderLeft(CellStyle.BORDER_THIN);
            styleYellow.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle styleGreen = workbook.createCellStyle();
            styleGreen.setFont(boldFont);
            styleGreen.setAlignment(CellStyle.ALIGN_CENTER);
            styleGreen.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            styleGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleGreen.setBorderBottom(CellStyle.BORDER_THIN);
            styleGreen.setBorderTop(CellStyle.BORDER_THIN);
            styleGreen.setBorderLeft(CellStyle.BORDER_THIN);
            styleGreen.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle styleRed = workbook.createCellStyle();
            styleRed.setFont(boldFont);
            styleRed.setAlignment(CellStyle.ALIGN_CENTER);
            styleRed.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            styleRed.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleRed.setBorderBottom(CellStyle.BORDER_THIN);
            styleRed.setBorderTop(CellStyle.BORDER_THIN);
            styleRed.setBorderLeft(CellStyle.BORDER_THIN);
            styleRed.setBorderRight(CellStyle.BORDER_THIN);

            // ── Data styles ──────────────────────────────────────────────────────
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setFont(normalFont);
            dataStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            dataStyle.setBorderBottom(CellStyle.BORDER_THIN);
            dataStyle.setBorderTop(CellStyle.BORDER_THIN);
            dataStyle.setBorderLeft(CellStyle.BORDER_THIN);
            dataStyle.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle dataCenter = workbook.createCellStyle();
            dataCenter.setFont(normalFont);
            dataCenter.setAlignment(CellStyle.ALIGN_CENTER);
            dataCenter.setBorderBottom(CellStyle.BORDER_THIN);
            dataCenter.setBorderTop(CellStyle.BORDER_THIN);
            dataCenter.setBorderLeft(CellStyle.BORDER_THIN);
            dataCenter.setBorderRight(CellStyle.BORDER_THIN);

            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            short numFmt = fmt.getFormat("#,##0");
            short pctFmt = fmt.getFormat("0.00\"%\"");
            short amtFmt = fmt.getFormat("#,##0.00");

            CellStyle numStyle = workbook.createCellStyle();
            numStyle.cloneStyleFrom(dataStyle);
            numStyle.setDataFormat(numFmt);

            CellStyle pctStyle = workbook.createCellStyle();
            pctStyle.cloneStyleFrom(dataStyle);
            pctStyle.setDataFormat(pctFmt);

            CellStyle amtStyle = workbook.createCellStyle();
            amtStyle.cloneStyleFrom(dataStyle);
            amtStyle.setDataFormat(amtFmt);

            // Total row styles
            CellStyle totalLabel = workbook.createCellStyle();
            totalLabel.cloneStyleFrom(styleBlue);

            CellStyle totalYellow = workbook.createCellStyle();
            totalYellow.cloneStyleFrom(numStyle);
            totalYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            totalYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalAmtYellow = workbook.createCellStyle();
            totalAmtYellow.cloneStyleFrom(amtStyle);
            totalAmtYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            totalAmtYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalGreen = workbook.createCellStyle();
            totalGreen.cloneStyleFrom(numStyle);
            totalGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalAmtGreen = workbook.createCellStyle();
            totalAmtGreen.cloneStyleFrom(amtStyle);
            totalAmtGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalAmtGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalPct = workbook.createCellStyle();
            totalPct.cloneStyleFrom(pctStyle);
            totalPct.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalPct.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalRed = workbook.createCellStyle();
            totalRed.cloneStyleFrom(numStyle);
            totalRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            totalRed.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalAmtRed = workbook.createCellStyle();
            totalAmtRed.cloneStyleFrom(amtStyle);
            totalAmtRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            totalAmtRed.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // ── Col widths ───────────────────────────────────────────────────────
            // 0=Date, 1=Airline, 2=QTY Total, 3=AMT Total, 4=Auto, 5=%, 6=Manual, 7=AMT Match
            // 8=QTY FP, 9=AMT FP, 10=QTY FF, 11=AMT FF, 12=QTY FactPend, 13=AMT FactPend
            // 14=QTY PendPago, 15=AMT PendPago, 16=QTY NoLib, 17=AMT NoLib
            // 18=QTY FPD, 19=AMT FPD, 20=QTY MatchObs, 21=AMT MatchObs
            int[] colWidths = {
                4000, 5500,                   // Date, Airline
                3500, 5500,                   // Total qty, amt
                3500, 3000, 3500, 5500,       // Auto, %, Manual, AMT Match
                4000, 5500,                   // Falta Pago
                4000, 5500,                   // Falta Factura
                4500, 5500,                   // Factura Pendiente
                4500, 5500,                   // Pendiente Pago
                4500, 5500,                   // No Esta en Libera
                5500, 5500,                   // Falta Pago/Dif Libera
                5500, 5500                    // Match con Obs
            };
            for (int i = 0; i < colWidths.length; i++) {
                sheet.setColumnWidth(i, colWidths[i]);
            }

            // ── Row 0: grupo principal ───────────────────────────────────────────
            Row row0 = sheet.createRow(0);
            row0.createCell(0).setCellStyle(styleBlue); row0.getCell(0).setCellValue("Date");
            row0.createCell(1).setCellStyle(styleBlue); row0.getCell(1).setCellValue("Airline");
            Cell bsr = row0.createCell(2);
            bsr.setCellValue("Bank Statement Reconciliation (ARC/Cartera)");
            bsr.setCellStyle(styleBlue);
            for (int i = 3; i <= 21; i++) { row0.createCell(i).setCellStyle(styleBlue); }

            // ── Row 1: sub-cabeceras ─────────────────────────────────────────────
            Row row1 = sheet.createRow(1);
            Object[][] headers = {
                {0,  "Date",                          styleBlue},
                {1,  "Airline",                       styleBlue},
                {2,  "Total",                         styleYellow},
                {3,  "Monto USD Total",               styleYellow},
                {4,  "Auto",                          styleGreen},
                {5,  "%",                             styleGreen},
                {6,  "Manual",                        styleGreen},
                {7,  "Monto USD Match",               styleGreen},
                {8,  "Falta Pago",                    styleRed},
                {9,  "Monto USD Falta Pago",          styleRed},
                {10, "Falta Factura",                 styleRed},
                {11, "Monto USD Falta Factura",       styleRed},
                {12, "Factura Pendiente",             styleRed},
                {13, "Monto USD Factura Pendiente",   styleRed},
                {14, "Pendiente Pago",                styleRed},
                {15, "Monto USD Pendiente Pago",      styleRed},
                {16, "No Esta en Libera",             styleRed},
                {17, "Monto USD No Esta en Libera",   styleRed},
                {18, "Falta Pago/Dif Libera",         styleRed},
                {19, "Monto USD Falta Pago/Dif",      styleRed},
                {20, "Match con Observaciones",       styleGreen},
                {21, "Monto USD Match con Obs",       styleGreen}
            };
            for (Object[] h : headers) {
                Cell c = row1.createCell((Integer) h[0]);
                c.setCellValue((String) h[1]);
                c.setCellStyle((CellStyle) h[2]);
            }

            // ── Datos ────────────────────────────────────────────────────────────
            int rowIdx = 2;
            int dataRows = listaData.size() > 0 ? listaData.size() - 1 : 0;

            for (int i = 0; i < dataRows; i++) {
                Map<String, String> item = listaData.get(i);
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellStyle(dataCenter);
                row.getCell(0).setCellValue(safeGet(item, "strFormatDate"));

                row.createCell(1).setCellStyle(dataCenter);
                row.getCell(1).setCellValue(safeGet(item, "NOMBRE1"));

                setCellNum(row, 2, numStyle,  item, "VL_QTY_TOTAL");
                setCellDbl(row, 3, amtStyle,  item, "VL_AMT_TOTAL");
                setCellNum(row, 4, numStyle,  item, "VL_QTY_MATCH");
                setCellDbl(row, 5, pctStyle,  item, "PCT_PROCESADO");
                setCellNum(row, 6, numStyle,  item, "VL_QTY_MANUAL");
                setCellDbl(row, 7, amtStyle,  item, "VL_AMT_MATCH");
                setCellNum(row, 8, numStyle,  item, "VL_QTY_FALTA_PAGO");
                setCellDbl(row, 9, amtStyle,  item, "VL_AMT_FALTA_PAGO");
                setCellNum(row, 10, numStyle, item, "VL_QTY_FALTA_FACTURA");
                setCellDbl(row, 11, amtStyle, item, "VL_AMT_FALTA_FACTURA");
                setCellNum(row, 12, numStyle, item, "VL_QTY_FACTURA_PENDIENTE");
                setCellDbl(row, 13, amtStyle, item, "VL_AMT_FACTURA_PENDIENTE");
                setCellNum(row, 14, numStyle, item, "VL_QTY_PENDIENTE_PAGO");
                setCellDbl(row, 15, amtStyle, item, "VL_AMT_PENDIENTE_PAGO");
                setCellNum(row, 16, numStyle, item, "VL_QTY_NO_ESTA_EN_LIBERA");
                setCellDbl(row, 17, amtStyle, item, "VL_AMT_NO_ESTA_EN_LIBERA");
                setCellNum(row, 18, numStyle, item, "VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA");
                setCellDbl(row, 19, amtStyle, item, "VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA");
                setCellNum(row, 20, numStyle, item, "VL_QTY_MATCH_CON_OBSERVACIONES");
                setCellDbl(row, 21, amtStyle, item, "VL_AMT_MATCH_CON_OBSERVACIONES");
            }

            // ── Fila TOTAL ───────────────────────────────────────────────────────
            if (!listaData.isEmpty()) {
                Map<String, String> t = listaData.get(listaData.size() - 1);
                Row rowTotal = sheet.createRow(rowIdx);

                Cell tl = rowTotal.createCell(0);
                tl.setCellValue("TOTAL");
                tl.setCellStyle(totalLabel);
                rowTotal.createCell(1).setCellStyle(totalLabel);

                long   tqTotal  = parseLongSafe(safeGet(t, "TOTAL_QTOTAL"));
                long   tqMatch  = parseLongSafe(safeGet(t, "TOTAL_QMATCH"));
                long   tqManual = parseLongSafe(safeGet(t, "TOTAL_QMANUAL"));
                double tPct     = tqTotal > 0 ? ((tqMatch + tqManual) * 100.0 / tqTotal) : 0;

                setCellNumVal(rowTotal, 2,  totalYellow,    tqTotal);
                setCellDblVal(rowTotal, 3,  totalAmtYellow, parseDblSafe(safeGet(t, "TOTAL_AMT_TOTAL")));
                setCellNumVal(rowTotal, 4,  totalGreen,     tqMatch);
                setCellDblVal(rowTotal, 5,  totalPct,       tPct);
                setCellNumVal(rowTotal, 6,  totalGreen,     tqManual);
                setCellDblVal(rowTotal, 7,  totalAmtGreen,  parseDblSafe(safeGet(t, "TOTAL_AMT_MATCH")));
                rowTotal.createCell(8).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 9,  totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_FALTA_PAGO")));
                rowTotal.createCell(10).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 11, totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_FALTA_FACTURA")));
                rowTotal.createCell(12).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 13, totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_FACTURA_PENDIENTE")));
                rowTotal.createCell(14).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 15, totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_PENDIENTE_PAGO")));
                rowTotal.createCell(16).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 17, totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_NO_ESTA_EN_LIBERA")));
                rowTotal.createCell(18).setCellStyle(totalRed);
                setCellDblVal(rowTotal, 19, totalAmtRed,    parseDblSafe(safeGet(t, "TOTAL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA")));
                rowTotal.createCell(20).setCellStyle(totalGreen);
                setCellDblVal(rowTotal, 21, totalAmtGreen,  parseDblSafe(safeGet(t, "TOTAL_AMT_MATCH_CON_OBSERVACIONES")));
            }

            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileNameDownload + "\""
            );
            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    private String safeGet(Map<String, String> m, String key) {
        String v = m.get(key); return v == null ? "" : v;
    }
    private long parseLongSafe(String s) {
        try { return s == null || s.isEmpty() ? 0L : Long.parseLong(s.trim()); }
        catch (NumberFormatException e) { return 0L; }
    }
    private double parseDblSafe(String s) {
        try { return s == null || s.isEmpty() ? 0.0 : Double.parseDouble(s.trim()); }
        catch (NumberFormatException e) { return 0.0; }
    }
    private void setCellNum(Row row, int col, CellStyle style, Map<String, String> item, String key) {
        Cell c = row.createCell(col);
        c.setCellValue(parseLongSafe(safeGet(item, key)));
        c.setCellStyle(style);
    }
    private void setCellDbl(Row row, int col, CellStyle style, Map<String, String> item, String key) {
        Cell c = row.createCell(col);
        c.setCellValue(parseDblSafe(safeGet(item, key)));
        c.setCellStyle(style);
    }
    private void setCellNumVal(Row row, int col, CellStyle style, long val) {
        Cell c = row.createCell(col); c.setCellValue(val); c.setCellStyle(style);
    }
    private void setCellDblVal(Row row, int col, CellStyle style, double val) {
        Cell c = row.createCell(col); c.setCellValue(val); c.setCellStyle(style);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Dashboard Cargo - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF287> listaData = this.getList(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("BSP Reconciliation");

            // ── Utilidad: crear CellStyle ───────────────────────────────────────
            // Estilo base negrita centrado
            Font boldFont = workbook.createFont();
            boldFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            boldFont.setColor(IndexedColors.BLACK.getIndex());

            // Estilo grupo Payment / Bank Statement (azul claro #C9DAF5 → LIGHT_CORNFLOWER_BLUE)
            CellStyle styleBlue = workbook.createCellStyle();
            styleBlue.setFont(boldFont);
            styleBlue.setAlignment(CellStyle.ALIGN_CENTER);
            styleBlue.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleBlue.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleBlue.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBlue.setBorderBottom(CellStyle.BORDER_THIN);
            styleBlue.setBorderTop(CellStyle.BORDER_THIN);
            styleBlue.setBorderLeft(CellStyle.BORDER_THIN);
            styleBlue.setBorderRight(CellStyle.BORDER_THIN);

            // Estilo columna Total (amarillo #F9D88C → LIGHT_YELLOW)
            CellStyle styleYellow = workbook.createCellStyle();
            styleYellow.setFont(boldFont);
            styleYellow.setAlignment(CellStyle.ALIGN_CENTER);
            styleYellow.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            styleYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleYellow.setBorderBottom(CellStyle.BORDER_THIN);
            styleYellow.setBorderTop(CellStyle.BORDER_THIN);
            styleYellow.setBorderLeft(CellStyle.BORDER_THIN);
            styleYellow.setBorderRight(CellStyle.BORDER_THIN);

            // Estilo grupo Match (verde claro)
            CellStyle styleGreen = workbook.createCellStyle();
            styleGreen.setFont(boldFont);
            styleGreen.setAlignment(CellStyle.ALIGN_CENTER);
            styleGreen.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            styleGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleGreen.setBorderBottom(CellStyle.BORDER_THIN);
            styleGreen.setBorderTop(CellStyle.BORDER_THIN);
            styleGreen.setBorderLeft(CellStyle.BORDER_THIN);
            styleGreen.setBorderRight(CellStyle.BORDER_THIN);

            // Estilo columna W/O Settlement (rojo claro #FFA8A8 → ROSE)
            CellStyle styleRed = workbook.createCellStyle();
            styleRed.setFont(boldFont);
            styleRed.setAlignment(CellStyle.ALIGN_CENTER);
            styleRed.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            styleRed.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleRed.setBorderBottom(CellStyle.BORDER_THIN);
            styleRed.setBorderTop(CellStyle.BORDER_THIN);
            styleRed.setBorderLeft(CellStyle.BORDER_THIN);
            styleRed.setBorderRight(CellStyle.BORDER_THIN);

            // Estilo de datos (normal, right-aligned para números)
            Font normalFont = workbook.createFont();
            normalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setFont(normalFont);
            dataStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            dataStyle.setBorderBottom(CellStyle.BORDER_THIN);
            dataStyle.setBorderTop(CellStyle.BORDER_THIN);
            dataStyle.setBorderLeft(CellStyle.BORDER_THIN);
            dataStyle.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle dataStyleCenter = workbook.createCellStyle();
            dataStyleCenter.setFont(normalFont);
            dataStyleCenter.setAlignment(CellStyle.ALIGN_CENTER);
            dataStyleCenter.setBorderBottom(CellStyle.BORDER_THIN);
            dataStyleCenter.setBorderTop(CellStyle.BORDER_THIN);
            dataStyleCenter.setBorderLeft(CellStyle.BORDER_THIN);
            dataStyleCenter.setBorderRight(CellStyle.BORDER_THIN);

            // Formato numérico con comas
            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            short numFmt = fmt.getFormat("#,##0");
            short pctFmt = fmt.getFormat("0.00\"%\"");
            short amtFmt = fmt.getFormat("#,##0.00");

            CellStyle numStyle = workbook.createCellStyle();
            numStyle.cloneStyleFrom(dataStyle);
            numStyle.setDataFormat(numFmt);

            CellStyle pctStyle = workbook.createCellStyle();
            pctStyle.cloneStyleFrom(dataStyle);
            pctStyle.setDataFormat(pctFmt);

            // Fila de totales (fondo amarillo + negrita)
            CellStyle totalYellow = workbook.createCellStyle();
            totalYellow.cloneStyleFrom(numStyle);
            totalYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            totalYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalGreen = workbook.createCellStyle();
            totalGreen.cloneStyleFrom(numStyle);
            totalGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalRed = workbook.createCellStyle();
            totalRed.cloneStyleFrom(numStyle);
            totalRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            totalRed.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalPct = workbook.createCellStyle();
            totalPct.cloneStyleFrom(pctStyle);
            totalPct.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalPct.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle amtStyle = workbook.createCellStyle();
            amtStyle.cloneStyleFrom(dataStyle);
            amtStyle.setDataFormat(amtFmt);

            CellStyle totalAmtYellow = workbook.createCellStyle();
            totalAmtYellow.cloneStyleFrom(amtStyle);
            totalAmtYellow.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            totalAmtYellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalAmtGreen = workbook.createCellStyle();
            totalAmtGreen.cloneStyleFrom(amtStyle);
            totalAmtGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            totalAmtGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalAmtRed = workbook.createCellStyle();
            totalAmtRed.cloneStyleFrom(amtStyle);
            totalAmtRed.setFillForegroundColor(IndexedColors.ROSE.getIndex());
            totalAmtRed.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle totalLabel = workbook.createCellStyle();
            totalLabel.cloneStyleFrom(styleBlue);

            // ── Fila 0: grupos de cabecera ──────────────────────────────────────
            // Col 0=Date, 1=Total, 2=Auto, 3=%, 4=Manual, 5=W/O Settlement
            Row row0 = sheet.createRow(0);

            Cell c0 = row0.createCell(0);
            c0.setCellValue("Payment");
            c0.setCellStyle(styleBlue);

            Cell c1 = row0.createCell(1);
            c1.setCellValue("Bank Statement Reconciliation");
            c1.setCellStyle(styleBlue);
            // Span visual con celdas vacías del mismo estilo
            for (int i = 2; i <= 8; i++) {
                row0.createCell(i).setCellStyle(styleBlue);
            }

            // ── Fila 1: sub-cabeceras ───────────────────────────────────────────
            Row row1 = sheet.createRow(1);

            Cell h0 = row1.createCell(0);
            h0.setCellValue("Date");
            h0.setCellStyle(styleBlue);

            // Col order: Date(0), Total(1), Monto USD Total(2), Auto(3), %(4), Manual(5), Monto USD Match(6), W/O Settlement(7), Monto USD Statement(8)
            Cell h1 = row1.createCell(1);
            h1.setCellValue("Total");
            h1.setCellStyle(styleYellow);

            Cell h2 = row1.createCell(2);
            h2.setCellValue("Monto USD Total");
            h2.setCellStyle(styleYellow);

            Cell h3 = row1.createCell(3);
            h3.setCellValue("Auto");
            h3.setCellStyle(styleGreen);

            Cell h4 = row1.createCell(4);
            h4.setCellValue("%");
            h4.setCellStyle(styleGreen);

            Cell h5 = row1.createCell(5);
            h5.setCellValue("Manual");
            h5.setCellStyle(styleGreen);

            Cell h6 = row1.createCell(6);
            h6.setCellValue("Monto USD Match");
            h6.setCellStyle(styleGreen);

            Cell h7 = row1.createCell(7);
            h7.setCellValue("W/O Settlement");
            h7.setCellStyle(styleRed);

            Cell h8 = row1.createCell(8);
            h8.setCellValue("Monto USD Statement");
            h8.setCellStyle(styleRed);

            // ── Ancho de columnas ───────────────────────────────────────────────
            sheet.setColumnWidth(0, 4000);  // Date
            sheet.setColumnWidth(1, 3500);  // Total
            sheet.setColumnWidth(2, 5500);  // Monto USD Total
            sheet.setColumnWidth(3, 3500);  // Auto
            sheet.setColumnWidth(4, 3000);  // %
            sheet.setColumnWidth(5, 3500);  // Manual
            sheet.setColumnWidth(6, 5500);  // Monto USD Match
            sheet.setColumnWidth(7, 5000);  // W/O Settlement
            sheet.setColumnWidth(8, 5500);  // Monto USD Statement

            // ── Datos (excluir último registro = fila de totales del SP) ────────
            int rowIdx = 2;
            int dataRows = listaData.size() > 0 ? listaData.size() - 1 : 0;

            for (int i = 0; i < dataRows; i++) {
                MPF287 item = listaData.get(i);
                Row row = sheet.createRow(rowIdx++);

                Cell d0 = row.createCell(0);
                d0.setCellValue(item.strFormatDate);
                d0.setCellStyle(dataStyleCenter);

                Cell d1 = row.createCell(1);
                d1.setCellValue(item.VL_QTY_TOTAL);
                d1.setCellStyle(numStyle);

                Cell d2 = row.createCell(2);
                d2.setCellValue(item.VL_AMT_TOTAL);
                d2.setCellStyle(amtStyle);

                Cell d3 = row.createCell(3);
                d3.setCellValue(item.VL_QTY_MATCH);
                d3.setCellStyle(numStyle);

                Cell d4 = row.createCell(4);
                d4.setCellValue(item.PCT_PROCESADO);
                d4.setCellStyle(pctStyle);

                Cell d5 = row.createCell(5);
                d5.setCellValue(item.VL_QTY_MANUAL);
                d5.setCellStyle(numStyle);

                Cell d6 = row.createCell(6);
                d6.setCellValue(item.VL_AMT_MATCH);
                d6.setCellStyle(amtStyle);

                Cell d7 = row.createCell(7);
                d7.setCellValue(item.VL_QTY_PEND);
                d7.setCellStyle(numStyle);

                Cell d8 = row.createCell(8);
                d8.setCellValue(item.VL_AMT_PEND);
                d8.setCellStyle(amtStyle);
            }

            // ── Fila TOTAL (último registro del SP) ─────────────────────────────
            if (!listaData.isEmpty()) {
                MPF287 totals = listaData.get(listaData.size() - 1);
                Row rowTotal = sheet.createRow(rowIdx);

                Cell t0 = rowTotal.createCell(0);
                t0.setCellValue("TOTAL");
                t0.setCellStyle(totalLabel);

                Cell t1 = rowTotal.createCell(1);
                t1.setCellValue(totals.TOTAL_QTOTAL);
                t1.setCellStyle(totalYellow);

                Cell t2 = rowTotal.createCell(2);
                t2.setCellValue(totals.TOTAL_AMTTOTAL);
                t2.setCellStyle(totalAmtYellow);

                Cell t3 = rowTotal.createCell(3);
                t3.setCellValue(totals.TOTAL_QMATCH);
                t3.setCellStyle(totalGreen);

                Cell t4 = rowTotal.createCell(4);
                t4.setCellValue(totals.TOTAL_PCT);
                t4.setCellStyle(totalPct);

                Cell t5 = rowTotal.createCell(5);
                t5.setCellValue(totals.TOTAL_QMANUAL);
                t5.setCellStyle(totalGreen);

                Cell t6 = rowTotal.createCell(6);
                t6.setCellValue(totals.TOTAL_AMTMATCH);
                t6.setCellStyle(totalAmtGreen);

                Cell t7 = rowTotal.createCell(7);
                t7.setCellValue(totals.TOTAL_QPEND);
                t7.setCellStyle(totalRed);

                Cell t8 = rowTotal.createCell(8);
                t8.setCellValue(totals.TOTAL_AMTPEND);
                t8.setCellStyle(totalAmtRed);
            }

            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileNameDownload + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "searchDetBankChargue")
    public @ResponseBody
    String searchDetBankChargue(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : searchDetBankChargue -------------");
        map.put("success", true);
        try {
            List<MPF287> lst = this.getListDetBankChargue(request, false);
            map.put("data",  lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
            logError.error("Error en searchDetBankChargue", e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDetCarteraChargue")
    public @ResponseBody
    String searchDetCarteraChargue(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : searchDetCarteraChargue -------------");
        map.put("success", true);
        try {
            List<MPF287> lst = this.getListDetCarteraChargue(request, false);
            map.put("data",  lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
            logError.error("Error en searchDetCarteraChargue", e);
        }
        return new Gson().toJson(map);
    }

    public List<MPF287> getListDetCarteraChargue(HttpServletRequest request, Boolean bExcel) {

        List<MPF287> lst = new ArrayList<>(0);
        MPF287Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF287Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START  = 0;
            filter.page.LIMIT  = 0;

            int limit = request.getParameter("limit") == null ? -1  : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0   : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS662(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<MPF287> getListDetBankChargue(HttpServletRequest request, Boolean bExcel) {

        List<MPF287> lst = new ArrayList<>(0);
        MPF287Filter filter;
        Gson gson = new Gson();
        String beanString;

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF287Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START  = 0;
            filter.page.LIMIT  = 0;

            int limit = request.getParameter("limit") == null ? -1  : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0   : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS658(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetBankStatement")
    public @ResponseBody
    String searchDetBankStatement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : searchDetBankStatement -------------");
        map.put("success", true);
        try {
            List<MPF287> lst = this.getListDetBankStatement(request, false);
            map.put("data",  lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
            logError.error("Error en searchDetBankStatement", e);
        }
        return new Gson().toJson(map);
    }

    public List<MPF287> getListDetBankStatement(HttpServletRequest request, Boolean bExcel) {

        List<MPF287> lst = new ArrayList<>(0);
        MPF287Filter filter;
        Gson gson = new Gson();

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF287Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START  = 0;
            filter.page.LIMIT  = 0;

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS659(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXDetBankStatement")
    public @ResponseBody
    void getXLSXDetBankStatement(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Bank Statement Detail - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF287> listaData = this.getListDetBankStatement(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Detail");

            Font boldFont = workbook.createFont();
            boldFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            boldFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle styleBlue = workbook.createCellStyle();
            styleBlue.setFont(boldFont);
            styleBlue.setAlignment(CellStyle.ALIGN_CENTER);
            styleBlue.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleBlue.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleBlue.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBlue.setBorderBottom(CellStyle.BORDER_THIN);
            styleBlue.setBorderTop(CellStyle.BORDER_THIN);
            styleBlue.setBorderLeft(CellStyle.BORDER_THIN);
            styleBlue.setBorderRight(CellStyle.BORDER_THIN);

            Font normalFont = workbook.createFont();
            normalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

            CellStyle dataCenter = workbook.createCellStyle();
            dataCenter.setFont(normalFont);
            dataCenter.setAlignment(CellStyle.ALIGN_CENTER);
            dataCenter.setBorderBottom(CellStyle.BORDER_THIN);
            dataCenter.setBorderTop(CellStyle.BORDER_THIN);
            dataCenter.setBorderLeft(CellStyle.BORDER_THIN);
            dataCenter.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle dataRight = workbook.createCellStyle();
            dataRight.setFont(normalFont);
            dataRight.setAlignment(CellStyle.ALIGN_RIGHT);
            dataRight.setBorderBottom(CellStyle.BORDER_THIN);
            dataRight.setBorderTop(CellStyle.BORDER_THIN);
            dataRight.setBorderLeft(CellStyle.BORDER_THIN);
            dataRight.setBorderRight(CellStyle.BORDER_THIN);

            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            short numFmt = fmt.getFormat("#,##0");
            short decFmt = fmt.getFormat("#,##0.00");

            CellStyle numStyle = workbook.createCellStyle();
            numStyle.cloneStyleFrom(dataRight);
            numStyle.setDataFormat(numFmt);

            CellStyle decStyle = workbook.createCellStyle();
            decStyle.cloneStyleFrom(dataRight);
            decStyle.setDataFormat(decFmt);

            String[] columns = {
                "RN", "Country", "Doctype", "Status", "Merchant", "Bandoc",
                "Abono Date", "Currency", "Neto EECC", "Neto Settlement", "Sett.", "Pen. Days"
            };

            Row header = sheet.createRow(0);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(styleBlue);
                sheet.setColumnWidth(i, 4500);
            }
            sheet.setColumnWidth(3, 6000);
            sheet.setColumnWidth(8, 5000);
            sheet.setColumnWidth(9, 5500);

            int rowIdx = 1;
            for (MPF287 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);          row.getCell(0).setCellStyle(dataCenter);
                row.createCell(1).setCellValue(item.SCOUNTRY);    row.getCell(1).setCellStyle(dataCenter);
                row.createCell(2).setCellValue(item.descTDOC);    row.getCell(2).setCellStyle(dataCenter);
                row.createCell(3).setCellValue(item.descSTVAL);   row.getCell(3).setCellStyle(dataCenter);
                row.createCell(4).setCellValue(item.MERCHAND);    row.getCell(4).setCellStyle(dataCenter);
                row.createCell(5).setCellValue(item.BANDOC);      row.getCell(5).setCellStyle(dataCenter);
                row.createCell(6).setCellValue(item.VALDATE);     row.getCell(6).setCellStyle(dataCenter);
                row.createCell(7).setCellValue(item.SCURRENCY);   row.getCell(7).setCellStyle(dataCenter);
                row.createCell(8).setCellValue(item.NETO);        row.getCell(8).setCellStyle(decStyle);
                row.createCell(9).setCellValue(item.NETOC);       row.getCell(9).setCellStyle(decStyle);
                row.createCell(10).setCellValue(item.QTYTRAN1);   row.getCell(10).setCellStyle(numStyle);
                row.createCell(11).setCellValue(item.PENDINGDAYS);row.getCell(11).setCellStyle(numStyle);
            }

            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileNameDownload + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }


    @RequestMapping(value = "getXLSXDetBank")
    public @ResponseBody
    void getXLSXDetBank(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Bank Statement Detail - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF287> listaData = this.getListDetBankChargue(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Detail");

            Font boldFont = workbook.createFont();
            boldFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            boldFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle styleBlue = workbook.createCellStyle();
            styleBlue.setFont(boldFont);
            styleBlue.setAlignment(CellStyle.ALIGN_CENTER);
            styleBlue.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleBlue.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleBlue.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBlue.setBorderBottom(CellStyle.BORDER_THIN);
            styleBlue.setBorderTop(CellStyle.BORDER_THIN);
            styleBlue.setBorderLeft(CellStyle.BORDER_THIN);
            styleBlue.setBorderRight(CellStyle.BORDER_THIN);

            Font normalFont = workbook.createFont();
            normalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

            CellStyle dataCenter = workbook.createCellStyle();
            dataCenter.setFont(normalFont);
            dataCenter.setAlignment(CellStyle.ALIGN_CENTER);
            dataCenter.setBorderBottom(CellStyle.BORDER_THIN);
            dataCenter.setBorderTop(CellStyle.BORDER_THIN);
            dataCenter.setBorderLeft(CellStyle.BORDER_THIN);
            dataCenter.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle dataRight = workbook.createCellStyle();
            dataRight.setFont(normalFont);
            dataRight.setAlignment(CellStyle.ALIGN_RIGHT);
            dataRight.setBorderBottom(CellStyle.BORDER_THIN);
            dataRight.setBorderTop(CellStyle.BORDER_THIN);
            dataRight.setBorderLeft(CellStyle.BORDER_THIN);
            dataRight.setBorderRight(CellStyle.BORDER_THIN);

            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            short numFmt = fmt.getFormat("#,##0");
            short decFmt = fmt.getFormat("#,##0.00");

            CellStyle numStyle = workbook.createCellStyle();
            numStyle.cloneStyleFrom(dataRight);
            numStyle.setDataFormat(numFmt);

            CellStyle decStyle = workbook.createCellStyle();
            decStyle.cloneStyleFrom(dataRight);
            decStyle.setDataFormat(decFmt);

            String[] columns = {
                "RN", "Country", "Doctype", "Status", "Merchant", "Bandoc",
                "Abono Date", "Currency", "Neto EECC", "Neto Settlement", "Sett.", "Pen. Days"
            };

            Row header = sheet.createRow(0);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(styleBlue);
                sheet.setColumnWidth(i, 4500);
            }
            sheet.setColumnWidth(3, 6000);  // Status
            sheet.setColumnWidth(8, 5000);  // Neto EECC
            sheet.setColumnWidth(9, 5500);  // Neto Settlement

            int rowIdx = 1;
            for (MPF287 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);               row.getCell(0).setCellStyle(dataCenter);
                row.createCell(1).setCellValue(item.SCOUNTRY);          row.getCell(1).setCellStyle(dataCenter);
                row.createCell(2).setCellValue(item.descTDOC);          row.getCell(2).setCellStyle(dataCenter);
                row.createCell(3).setCellValue(item.descSTVAL);         row.getCell(3).setCellStyle(dataCenter);
                row.createCell(4).setCellValue(item.MERCHAND);          row.getCell(4).setCellStyle(dataCenter);
                row.createCell(5).setCellValue(item.BANDOC);            row.getCell(5).setCellStyle(dataCenter);
                row.createCell(6).setCellValue(item.VALDATE);           row.getCell(6).setCellStyle(dataCenter);
                row.createCell(7).setCellValue(item.SCURRENCY);         row.getCell(7).setCellStyle(dataCenter);
                row.createCell(8).setCellValue(item.NETO);              row.getCell(8).setCellStyle(decStyle);
                row.createCell(9).setCellValue(item.NETOC);             row.getCell(9).setCellStyle(decStyle);
                row.createCell(10).setCellValue(item.QTYTRAN1);         row.getCell(10).setCellStyle(numStyle);
                row.createCell(11).setCellValue(item.PENDINGDAYS);      row.getCell(11).setCellStyle(numStyle);
            }

            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileNameDownload + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXCartera")
    public @ResponseBody
    void getXLSXCartera(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Reporte_Cruces - " + Functions.getFechaActual() + ".xlsx";

        try {
            System.out.println("-------------- CargoStatus : getXLSXCartera -------------");

            long t0 = System.currentTimeMillis();
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());
            String beanString = request.getParameter("beanString");
            MPF287Filter filter = new Gson().fromJson(beanString, MPF287Filter.class);
            List<Map<String, String>> listaData = logic.loadMPS660(filter);
            long t1 = System.currentTimeMillis();
            System.out.println("-------------- getXLSXCartera : DB query (MPS660) -> " + (t1 - t0) + " ms | rows=" + listaData.size() + " -------------");

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Cartera");

            Font boldFont = workbook.createFont();
            boldFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            boldFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle styleHeader = workbook.createCellStyle();
            styleHeader.setFont(boldFont);
            styleHeader.setAlignment(CellStyle.ALIGN_CENTER);
            styleHeader.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleHeader.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleHeader.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleHeader.setBorderBottom(CellStyle.BORDER_THIN);
            styleHeader.setBorderTop(CellStyle.BORDER_THIN);
            styleHeader.setBorderLeft(CellStyle.BORDER_THIN);
            styleHeader.setBorderRight(CellStyle.BORDER_THIN);

            Font normalFont = workbook.createFont();
            normalFont.setBoldweight(Font.BOLDWEIGHT_NORMAL);

            CellStyle styleData = workbook.createCellStyle();
            styleData.setFont(normalFont);
            styleData.setAlignment(CellStyle.ALIGN_LEFT);
            styleData.setBorderBottom(CellStyle.BORDER_THIN);
            styleData.setBorderTop(CellStyle.BORDER_THIN);
            styleData.setBorderLeft(CellStyle.BORDER_THIN);
            styleData.setBorderRight(CellStyle.BORDER_THIN);

            CellStyle styleDataRight = workbook.createCellStyle();
            styleDataRight.setFont(normalFont);
            styleDataRight.setAlignment(CellStyle.ALIGN_RIGHT);
            styleDataRight.setBorderBottom(CellStyle.BORDER_THIN);
            styleDataRight.setBorderTop(CellStyle.BORDER_THIN);
            styleDataRight.setBorderLeft(CellStyle.BORDER_THIN);
            styleDataRight.setBorderRight(CellStyle.BORDER_THIN);

            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            short decFmt = fmt.getFormat("#,##0.00");

            CellStyle styleDecimal = workbook.createCellStyle();
            styleDecimal.cloneStyleFrom(styleDataRight);
            styleDecimal.setDataFormat(decFmt);

            CellStyle stylePercent = workbook.createCellStyle();
            stylePercent.cloneStyleFrom(styleDataRight);
            stylePercent.setDataFormat(fmt.getFormat("0.00%"));

            // 39 column headers matching Reporte_Cruces.xlsx
            String[] columns = {
                "Sociedad", "Lugar comercial", "División", "Centro de beneficio",
                "Centro de beneficio País", "Bloqueo de pago", "Clave referencia 1",
                "Clave referencia 3", "Nombre 1", "Número de factura legal",
                "Cuenta", "Referencia de pago", "Referencia de pago_2",
                "Referencia Cliente (Guia)", "PSE", "LLAVE", "STATUS",
                "Nº documento", "Fecha de documento", "Importe en moneda doc.",
                "Moneda del documento", "Texto", "Vía de pago", "Fe.contabilización",
                "Clase de documento", "Base p.plazo pago", "Demora tras vencimiento neto",
                "Vencimiento neto", "Condiciones de pago", "Indicador CME",
                "Clave contabiliz.", "Importe neto local", "Moneda local",
                "Importe en moneda local", "Z_Moneda sucursal", "Importe en ML2",
                "Mon.local 2", "Dif.", "Porcentaje Diferencia", "Comentario"
            };

            // Keys matching DAO map population order
            String[] keys = {
                "SOCIETY", "LCOM", "DIV", "CENBEN", "SCOUNTRY", "BLOCPAG",
                "CLAVREF1", "CLAVREF3", "NOMBRE1", "NUMLEG", "ACCOUNT",
                "REFERENCE", "REF2", "REFCLI", "PSE", "LLAVE", "STVAL",
                "BANDOCCAR", "ADATE", "NETOLOC", "SCURRENCY", "TEXTO",
                "PAYMET", "FCONT", "CLSDOC", "FECBASE", "DELAYDAY",
                "FECVENC", "CONPAY", "CME", "CLAVECONT", "NETOLOC_2",
                "MONLOC", "IMPORTELOC", "MONSUC", "IMPORTLOC2", "MONSUC2",
                "DIFF", "POR_DIF", "COMENTARIO"
            };

            // Columns that hold numeric/decimal values (0-based indices)
            java.util.Set<Integer> numericCols = new java.util.HashSet<>(
                java.util.Arrays.asList(19, 26, 31, 33, 35, 37)
            );
            // 19=NETOLOC, 26=DELAYDAY, 31=NETOLOC_2, 33=IMPORTELOC, 35=IMPORTLOC2, 37=DIFF
            // 38=POR_DIF usa formato porcentaje (ver bloque else-if abajo)

            // Header row
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(styleHeader);
                sheet.setColumnWidth(i, 4000);
            }
            // Wider columns
            sheet.setColumnWidth(1,  5000);  // Lugar comercial
            sheet.setColumnWidth(4,  5000);  // Centro de beneficio País
            sheet.setColumnWidth(8,  7000);  // Nombre 1
            sheet.setColumnWidth(13, 6500);  // Referencia Cliente
            sheet.setColumnWidth(21, 6000);  // Texto
            sheet.setColumnWidth(26, 7000);  // Demora tras vencimiento neto
            sheet.setColumnWidth(39, 8000);  // Comentario

            // Equivalencias STATUS (col index 16 = STVAL)
            Map<String, String> hmStatus = new java.util.HashMap<>();
            hmStatus.put("1", "MATCH");
            hmStatus.put("2", "FALTA PAGO");
            hmStatus.put("3", "FALTA FACTURA");
            hmStatus.put("4", "FACTURA PENDIENTE");
            hmStatus.put("5", "PENDIENTE PAGO");
            hmStatus.put("6", "NO ESTA EN LIBERA");
            hmStatus.put("7", "FALTA PAGO/DIFERENCIA EN LIBERA");
            hmStatus.put("8", "MATCH CON OBSERVACIONES");

            // Data rows
            long t2 = System.currentTimeMillis();
            int rowIdx = 1;
            for (Map<String, String> item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                for (int i = 0; i < keys.length; i++) {
                    Cell cell = row.createCell(i);
                    String val = item.getOrDefault(keys[i], "");
                    // Columna STATUS (índice 16): traducir código → descripción
                    if (i == 16) {
                        val = hmStatus.getOrDefault(val.trim(), val);
                        cell.setCellValue(val);
                        cell.setCellStyle(styleData);
                    } else if (i == 37 && "T".equals(item.getOrDefault("PAYMET", "").trim())) {
                        cell.setCellStyle(styleDecimal);
                    } else if (i == 38 && val != null && !val.isEmpty()) {
                        try {
                            cell.setCellValue(Double.parseDouble(val));
                            cell.setCellStyle(stylePercent);
                        } catch (NumberFormatException nfe) {
                            cell.setCellValue(val);
                            cell.setCellStyle(styleData);
                        }
                    } else if (numericCols.contains(i) && val != null && !val.isEmpty()) {
                        try {
                            cell.setCellValue(Double.parseDouble(val));
                            cell.setCellStyle(styleDecimal);
                        } catch (NumberFormatException nfe) {
                            cell.setCellValue(val);
                            cell.setCellStyle(styleData);
                        }
                    } else {
                        cell.setCellValue(val);
                        cell.setCellStyle(styleData);
                    }
                }
            }

            long t3 = System.currentTimeMillis();
            System.out.println("-------------- getXLSXCartera : Excel render (POI write rows) -> " + (t3 - t2) + " ms -------------");

            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileNameDownload + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose();

            long t4 = System.currentTimeMillis();
            System.out.println("-------------- getXLSXCartera : TOTAL -> " + (t4 - t0) + " ms -------------");

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getCSV")
    public @ResponseBody
    void getCSV(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("Report : getCSV");

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        String country = request.getParameter("country");
        String dateSett = request.getParameter("dateSett"); // YYYYMMDD
        String customer = request.getParameter("customer");
        String filename = request.getParameter("filename");

        System.out.println("Parámetros → country=" + country
                + ", dateSett=" + dateSett
                + ", customer=" + customer
                + ", filename=" + filename);

        if (country == null || dateSett == null || customer == null || filename == null
                || country.isEmpty() || dateSett.isEmpty()
                || customer.isEmpty() || filename.isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(
                    "Parámetros obligatorios: country, customer, dateSett y filename"
            );
            return;
        }

        String year = dateSett.substring(0, 4);

        String folderStr
                = rutaBase
                + "\\workspace\\HISTORY\\"
                + country + "\\"
                + year;

        Path folderPath = Paths.get(folderStr);

        System.out.println("Buscando en: " + folderPath);

        Path filePath = folderPath.resolve(filename);

        if (!Files.exists(filePath)) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Archivo no encontrado: " + filename);
            return;
        }

        System.out.println("Archivo encontrado: " + filePath);

        response.setContentType("text/csv");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"" + filename + "\""
        );

        try (FileInputStream fis = new FileInputStream(filePath.toFile()); OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            out.flush();
        }
    }

    @RequestMapping(value = "getTXTARC")
    public @ResponseBody
    void getTXTARC(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("Report : getTXTARC");

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        String year = request.getParameter("year");       // ej: 2025
        String filename = request.getParameter("filename"); // ej: 134_ARC_XXXX.txt

        System.out.println("Parámetros → year=" + year + ", filename=" + filename);

        if (year == null || filename == null
                || year.isEmpty() || filename.isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(
                    "Parámetros obligatorios: year y filename"
            );
            return;
        }

        String country = "US";
        String[] parts = filename.split("_");

        if (parts.length > 0) {
            String clientCode = parts[0];

            switch (clientCode) {
                case "202":
                    country = "SV";
                    break;
                case "134":
                    country = "US";
                    break;
                default:
                    country = "US"; // Por defecto
                    break;
            }
        }

        System.out.println("Cliente detectado: " + (parts.length > 0 ? parts[0] : "N/A") + " → País: " + country);

        String folderStr
                = rutaBase
                + "\\workspace\\HISTORY-ARC\\"
                + country + "\\"
                + year;

        Path folderPath = Paths.get(folderStr);

        System.out.println("Buscando en: " + folderPath);

        Path filePath = folderPath.resolve(filename);

        if (!Files.exists(filePath)) {
            // Opcional: buscar en carpeta por defecto si no se encuentra
            String defaultFolderStr = rutaBase + "\\workspace\\HISTORY-ARC\\US\\" + year;
            Path defaultFilePath = Paths.get(defaultFolderStr).resolve(filename);

            if (Files.exists(defaultFilePath)) {
                System.out.println("Archivo encontrado en carpeta por defecto (US): " + defaultFilePath);
                filePath = defaultFilePath;
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("Archivo no encontrado: " + filename
                        + " (buscado en: " + folderPath + " y " + defaultFilePath.getParent() + ")");
                return;
            }
        }

        System.out.println("Archivo encontrado: " + filePath);

        response.setContentType("text/plain");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"" + filename + "\""
        );

        try (FileInputStream fis = new FileInputStream(filePath.toFile()); OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            out.flush();
        }
    }

    @RequestMapping(value = "getARCImage", method = RequestMethod.GET)
    public void getARCImage(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("Report : getARCImage");

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        // Base: \\Px\av\Efectivo\<env>
        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        String filename = request.getParameter("filename");

        if (filename == null || filename.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("filename es obligatorio");
            return;
        }

        String realFileName = filename + "_img.png";

        Path imagePath = Paths.get(
                rutaBase,
                "workspace",
                "ARC-IMAGENES",
                realFileName
        );

        System.out.println("Buscando imagen en: " + imagePath);

        if (!Files.exists(imagePath)) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Imagen no encontrada: " + realFileName);
            return;
        }

        response.setContentType("image/png");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        try (OutputStream out = response.getOutputStream()) {
            Files.copy(imagePath, out);
            out.flush();
        }
    }

    @RequestMapping(value = "getBulkTXTARC", method = RequestMethod.POST)
    public void getBulkTXTARC(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("Report : getBulkTXTARC");

        String beanString = request.getParameter("beanString");
        if (beanString == null || beanString.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("beanString es obligatorio");
            return;
        }

        Gson gson = new Gson();
        MPF221Filter filter = gson.fromJson(beanString, MPF221Filter.class);

        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        CargoStatusLogic logic = new CargoStatusLogic();
        logic.setSession(this.serverSession.getServerSession());

        List<MPF221> list = logic.loadMPS446(filter);

        System.out.println("Registros encontrados ARC: " + list.size());

        if (list.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No hay archivos ARC para descargar");
            return;
        }

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        File tempZip = File.createTempFile("ARC_Files_", ".zip");
        int addedFiles = 0;
        int skippedInvalidCcust = 0;

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempZip))) {

            for (MPF221 item : list) {

                try {
                    // Validar CCUST primero
                    String ccust = item.CUSTOMER;
                    if (!isValidCcust(ccust)) {
                        System.err.println("CCUST inválido: " + ccust + " - Saltando archivo: " + item.NAMEFILE);
                        skippedInvalidCcust++;
                        continue;  // Saltar este registro
                    }

                    // PEDARC = YY/MM/DD → YEAR = 20YY
                    String pedarc = item.PEDARC;
                    if (pedarc == null || pedarc.length() < 2) {
                        System.err.println("PEDARC inválido para: " + item.NAMEFILE);
                        continue;
                    }

                    String year = "20" + pedarc.substring(0, 2);

                    String countryCode = getCountryCode(ccust);

                    if ("UN".equals(countryCode)) {
                        System.err.println("Código de país desconocido para CCUST válido: " + ccust);
                        continue;  // Por si acaso
                    }

                    String folderStr
                            = rutaBase
                            + File.separator + "workspace"
                            + File.separator + "HISTORY-ARC"
                            + File.separator + countryCode
                            + File.separator + year;

                    String fileName = item.NAMEFILE;
                    if (!fileName.toLowerCase().endsWith(".txt")) {
                        fileName += ".txt";
                    }

                    Path filePath = Paths.get(folderStr).resolve(fileName);

                    if (!Files.exists(filePath)) {
                        System.err.println("Archivo ARC NO encontrado: " + filePath);
                        continue;
                    }

                    zos.putNextEntry(new ZipEntry(fileName));
                    Files.copy(filePath, zos);
                    zos.closeEntry();

                    addedFiles++;

                } catch (Exception eFile) {
                    System.err.println("Error agregando ARC al ZIP: "
                            + item.NAMEFILE + " → " + eFile.getMessage());
                }
            }
        }

        System.out.println("ARC incluidos en ZIP: " + addedFiles + " de " + list.size());
        System.out.println("Registros saltados por CCUST inválido: " + skippedInvalidCcust);

        if (addedFiles == 0) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No se encontraron archivos ARC físicos");
            tempZip.delete();
            return;
        }

        response.setContentType("application/zip");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"Cash_Files_ARC.zip\""
        );

        Files.copy(tempZip.toPath(), response.getOutputStream());
        response.flushBuffer();
        tempZip.delete();
    }

    private boolean isValidCcust(String ccust) {
        if (ccust == null || ccust.trim().isEmpty()) {
            return false;
        }

        String cleanedCcust = ccust.trim();
        return "134".equals(cleanedCcust) || "202".equals(cleanedCcust);
    }

    private String getCountryCode(String ccust) {
        if (ccust == null) {
            return "UN";
        }

        ccust = ccust.trim();

        if ("134".equals(ccust)) {
            return "US";  // Estados Unidos
        } else if ("202".equals(ccust)) {
            return "SV";  // El Salvador
        }

        return "UN";
    }
    
    private static final String BASE_PATH = "\\\\Px\\av\\Efectivo\\dev\\process\\ICCS";
    
    @RequestMapping(value = "scanICCSFiles", method = RequestMethod.POST)
    public @ResponseBody String scanICCSFiles(ModelMap map) {
        System.out.println("-------------- ICCS File Scanner -------------");
        map.put("success", true);
        int filesProcessed = 0;

        try {
            CargoStatusLogic logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            // 1. Obtener el entorno (DEV, ATT, PRO)
            String environment = this.serverSession
                    .getPropertySession()
                    .get("DB_SERVER_DEFAULT_TYPE")
                    .toString();

            // 2. Obtener la ruta base desde las propiedades
            String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
            String rutaBase = this.serverSession
                    .getPropertySession()
                    .get(rutaBaseKey)
                    .toString();

            // 3. Armar la ruta final concatenando las carpetas de ICCS
            // Usamos File.separator para evitar problemas de diagonales en diferentes SO, 
            // o simplemente agregamos "\\process\\ICCS"
            String finalBasePath = rutaBase + "\\process\\ICCS";
            
            System.out.println("Escaneando ruta: " + finalBasePath);

            File baseDir = new File(finalBasePath);
            if (!baseDir.exists() || !baseDir.isDirectory()) {
                throw new Exception("La ruta base no existe: " + finalBasePath);
            }

            Pattern datePattern = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})");
            File[] yearDirs = baseDir.listFiles(File::isDirectory);

            if (yearDirs != null) {
                for (File yearDir : yearDirs) {
                    // 1. CAPTURAMOS EL AÑO DIRECTO DEL NOMBRE DE LA CARPETA
                    String yearFile = yearDir.getName(); 
                    
                    if (!yearFile.matches("^\\d{4}$")) continue;

                    File[] ccustDirs = yearDir.listFiles(File::isDirectory);
                    if (ccustDirs == null) continue;

                    for (File ccustDir : ccustDirs) {
                        String ccust = ccustDir.getName();
                        File[] csvFiles = ccustDir.listFiles((dir, name) -> name.toLowerCase().endsWith(".csv"));
                        
                        if (csvFiles == null) continue;

                        for (File csvFile : csvFiles) {
                            String fileName = csvFile.getName();
                            String dateSett = "";

                            Matcher matcher = datePattern.matcher(fileName);
                            if (matcher.find()) {
                                dateSett = matcher.group(1).replace("-", ""); 
                            } else {
                                continue; 
                            }

                            Path filePath = csvFile.toPath();
                            BasicFileAttributes attr = Files.readAttributes(filePath, BasicFileAttributes.class);
                            
                            LocalDateTime creationDate = LocalDateTime.ofInstant(attr.creationTime().toInstant(), ZoneId.systemDefault());
                            String fecr = creationDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                            String hocr = creationDate.format(DateTimeFormatter.ofPattern("HHmmss"));

                            String owner = Files.getOwner(filePath).getName();
                            if (owner.contains("\\")) {
                                owner = owner.substring(owner.indexOf("\\") + 1);
                            }
                            owner = owner.length() > 10 ? owner.substring(0, 10) : owner;

                            // 2. ENVIAMOS EL NUEVO PARÁMETRO AL LOGIC
                            logic.processFileRecord(ccust, dateSett, fileName, yearFile, owner, fecr, hocr);
                            filesProcessed++;
                        }
                    }
                }
            }
            
            map.put("message", "Escaneo finalizado exitosamente.");
            map.put("totalProcesados", filesProcessed);

        } catch (Exception e) {
            map.put("success", false);
            map.put("message", "Error: " + e.getMessage());
            e.printStackTrace();
        }
        
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchICCS", method = RequestMethod.POST)
    public @ResponseBody String searchICCS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoStatus : Search ICCS -------------");
        map.put("success", true);
        try {
            List<MPF304> lst = this.getListICCS(request);
            System.out.println("Total ICCS: " + lst.size());
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
            logError.error("Error en searchICCS", e);
        }
        return new Gson().toJson(map);
    }

    private List<MPF304> getListICCS(HttpServletRequest request) {
        List<MPF304> lst = new ArrayList<>();
        MPF304Filter filter = new MPF304Filter();
        Gson gson = new Gson();

        try {
            logic = new CargoStatusLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            if (beanString != null && !beanString.isEmpty()) {
                filter = gson.fromJson(beanString, MPF304Filter.class);
            }

            filter.page.TOTROW = -1;
            int limit = request.getParameter("limit") == null ? 20 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadMPS650(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getCSVIccs", method = RequestMethod.GET)
    public @ResponseBody
    void getCSVIccs(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("-------------- Report : getCSVIccs --------------");

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        String ccust = request.getParameter("ccust");
        String filename = request.getParameter("filename");
        String yearFile = request.getParameter("yearFile"); 

        System.out.println("Parámetros → ccust=" + ccust + ", filename=" + filename + ", yearFile=" + yearFile);

        if (ccust == null || filename == null || yearFile == null || 
            ccust.isEmpty() || filename.isEmpty() || yearFile.isEmpty()) {
            
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Parámetros obligatorios: ccust, filename y yearFile");
            return;
        }

        String folderStr = rutaBase 
                + File.separator + "process" 
                + File.separator + "ICCS" 
                + File.separator + yearFile 
                + File.separator + ccust;

        Path folderPath = Paths.get(folderStr);
        System.out.println("Buscando en: " + folderPath);

        Path filePath = folderPath.resolve(filename);

        if (!Files.exists(filePath)) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Archivo no encontrado en red: " + filename);
            return;
        }

        System.out.println("Archivo encontrado: " + filePath);

        response.setContentType("text/csv");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"" + filename + "\""
        );

        try (FileInputStream fis = new FileInputStream(filePath.toFile()); 
             OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            out.flush();
        } catch (Exception e) {
            System.err.println("Error enviando el archivo al cliente: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
 
    @RequestMapping(value = "getBulkCSVIccs", method = RequestMethod.POST)
    public void getBulkCSVIccs(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("-------------- Report : getBulkCSVIccs --------------");

        String beanString = request.getParameter("beanString");
        if (beanString == null || beanString.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("beanString es obligatorio");
            return;
        }

        Gson gson = new Gson();
        MPF304Filter filter = gson.fromJson(beanString, MPF304Filter.class);

        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        CargoStatusLogic logic = new CargoStatusLogic();
        logic.setSession(this.serverSession.getServerSession());
        
        List<MPF304> list = logic.loadMPS650(filter);

        System.out.println("Registros ICCS encontrados para ZIP: " + list.size());

        if (list.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No hay archivos ICCS para descargar");
            return;
        }

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        String rutaBaseKey = "RUTA_CASH_" + environment + "_FILES";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        File tempZip = File.createTempFile("Cash_Files_ICCS_", ".zip");
        int addedFiles = 0;

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempZip))) {

            for (MPF304 item : list) {
                try {
                    
                    String year = (item.YEARFILE != null && !item.YEARFILE.isEmpty()) 
                                  ? item.YEARFILE 
                                  : item.NAMEFILE.substring(0, 4);

                    // Armamos la ruta exacta para ICCS
                    String folderStr = rutaBase 
                            + File.separator + "process" 
                            + File.separator + "ICCS" 
                            + File.separator + year 
                            + File.separator + item.CCUST;

                    Path filePath = Paths.get(folderStr).resolve(item.NAMEFILE);

                    if (!Files.exists(filePath)) {
                        System.err.println("Archivo ICCS NO encontrado: " + filePath);
                        continue;
                    }

                    zos.putNextEntry(new ZipEntry(item.NAMEFILE));
                    Files.copy(filePath, zos);
                    zos.closeEntry();
                    addedFiles++;

                } catch (Exception eFile) {
                    System.err.println("Error agregando archivo ICCS al ZIP: "
                            + item.NAMEFILE + " → " + eFile.getMessage());
                }
            }
        }

        System.out.println("Archivos ICCS incluidos en el ZIP: " + addedFiles + " de " + list.size());

        if (addedFiles == 0) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No se encontraron archivos físicos de ICCS para descargar");
            tempZip.delete();
            return;
        }

        response.setContentType("application/zip");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"Cash_Files_ICCS.zip\""
        );

        Files.copy(tempZip.toPath(), response.getOutputStream());
        response.flushBuffer();
        tempZip.delete();
    }
}
