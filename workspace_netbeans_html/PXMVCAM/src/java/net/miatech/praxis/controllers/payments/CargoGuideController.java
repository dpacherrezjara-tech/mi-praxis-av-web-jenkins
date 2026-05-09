/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.CargoGuideLogic;
import net.miatech.praxis.payment.MPF291;
import net.miatech.praxis.payment.MPF291Filter;
import net.miatech.praxis.payment.MPF291LinkPayload;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
@RequestMapping("/CargoGuide")
public class CargoGuideController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CargoGuideLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/CargoGuide/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : Search-------------");
        map.put("success", true);
        List<MPF295> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF295> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF295> lst = new ArrayList<>(0);
        MPF295Filter filter = new MPF295Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF295Filter.class);
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

            lst = logic.loadMPS587(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        // Le cambiamos el nombre al archivo para que coincida con tu módulo
        String fileNameDownload = "Cargo Guide Report - " + Functions.getFechaActual() + ".xlsx";

        try {
            // bExcel = true desactiva el paginado para traer TODOS los registros
            List<MPF295> listaData = this.getList(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Report");

            // --- ESTILO PARA LA CABECERA ---
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // --- ESTILO PARA NÚMEROS (MONTO) ---
            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            // --- CREACIÓN DE CABECERAS ---
            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Customer", "ADATE", "PAYDAY", "Country", "NCICLO",
                "METPAGO", "NPAGE", "CUSCA", "CODPSE", "Bandoc", "Currency", "Amount"
            };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                // Ancho de columna por defecto
                sheet.setColumnWidth(i, 4500);
            }

            // --- LLENADO DE FILAS ---
            int rowIdx = 1;
            for (MPF295 item : listaData) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.CCUST);
                row.createCell(2).setCellValue(item.ADATE);
                row.createCell(3).setCellValue(item.PAYDAY);
                row.createCell(4).setCellValue(item.SCOUNTRY);
                row.createCell(5).setCellValue(item.NCICLO);
                row.createCell(6).setCellValue(item.METPAGO);
                row.createCell(7).setCellValue(item.NPAGE);
                row.createCell(8).setCellValue(item.CUSCA);
                row.createCell(9).setCellValue(item.CODPSE);
                row.createCell(10).setCellValue(item.BANDOC);
                row.createCell(11).setCellValue(item.SCURRENCY);

                // 12. Amount (Monto formateado como número para que Excel pueda sumar)
                Cell amountCell = row.createCell(12);
                amountCell.setCellValue(item.MONTO);
                amountCell.setCellStyle(amountStyle);
            }

            // --- CONFIGURACIÓN DE RESPUESTA ---
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "searchMPF291")
    public @ResponseBody
    String searchMPF291(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : searchMPF291 (MPS600) -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF291Filter filter = gson.fromJson(beanString, MPF291Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            filter.page.PAGROW = 20;
            filter.page.PAGNUM = (start != 0 ? (start / filter.page.PAGROW) + 1 : 1);

            List<MPF291> lst = logic.loadMPS600(filter);

            map.put("success", true);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("data", new ArrayList<>());
            map.put("total", 0);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getCartera", method = RequestMethod.GET)
    public void getCartera(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoGuide : getCartera (MPS603 conciliacion) -------------");

        String country = request.getParameter("country");
        String sfile = request.getParameter("sfile");

        if (country == null || country.trim().isEmpty() || sfile == null || sfile.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try {
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<Map<String, Object>> lst = logic.loadMPS603(country.trim(), sfile.trim());

            // Deduplicate by BANDOC — keep first occurrence
            java.util.LinkedHashMap<String, Map<String, Object>> byBandoc = new java.util.LinkedHashMap<String, Map<String, Object>>();
            for (Map<String, Object> row : lst) {
                String bandoc = row.containsKey("BANDOC") ? String.valueOf(row.get("BANDOC")).trim() : "";
                if (!byBandoc.containsKey(bandoc)) {
                    byBandoc.put(bandoc, row);
                }
            }

            // ── Column layout ─────────────────────────────────────────
            String[] bancosHdrs = {
                "BANDOC", "DATECI", "TRANCI", "TIPODOC", "CONCEPTO",
                "MONEDA_B", "VALOR", "ABONOS", "CARGOS", "NETO",
                "ESTADO_B", "CANAL", "BANCO", "CUENTA_ORIG", "CUENTA_DEST",
                "REFPAGO", "SEQ_B", "HORA"
            };
            String[] carteraHdrs = {
                "BANDOC_C", "DATECI_C", "NCICLO", "AWBNO", "NPAGE",
                "METPAGO", "NPAGPAGO", "MONEDA_C", "MONTO", "NETOLOC",
                "PAYDAY", "STVAL", "REFERENCE", "PRDA", "CBATCH",
                "CERROR", "DIFERENCIA"
            };
            // Keys used to read CARTERA values from the row map (DIFERENCIA is computed)
            String[] carteraKeys = {
                "BANDOC_C", "DATECI_C", "NCICLO", "AWBNO", "NPAGE",
                "METPAGO", "NPAGPAGO", "MONEDA_C", "MONTO", "NETOLOC",
                "PAYDAY", "STVAL", "REFERENCE", "PRDA", "CBATCH", "CERROR"
            };
            int nBancos = bancosHdrs.length;  // 18
            int nTotal = nBancos + carteraHdrs.length; // 35

            // ── Workbook (XSSFWorkbook for merged cells + autofilter) ──
            XSSFWorkbook wb = new XSSFWorkbook();
            Sheet sheet = wb.createSheet("Conciliacion");

            DataFormat numFmt = wb.createDataFormat();
            short amtFmtIdx = numFmt.getFormat("#,##0.00");

            // Title: #1F3864 bg, white bold 16
            XSSFCellStyle titleStyle = (XSSFCellStyle) wb.createCellStyle();
            titleStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(0x1F, 0x38, 0x64)));
            titleStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            titleStyle.setAlignment(CellStyle.ALIGN_CENTER);
            titleStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            XSSFFont titleFont = (XSSFFont) wb.createFont();
            titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            titleFont.setFontHeightInPoints((short) 16);
            titleFont.setColor(new XSSFColor(new java.awt.Color(0xFF, 0xFF, 0xFF)));
            titleStyle.setFont(titleFont);

            // Subtitle: plain small
            XSSFCellStyle subtitleStyle = (XSSFCellStyle) wb.createCellStyle();
            subtitleStyle.setAlignment(CellStyle.ALIGN_LEFT);
            XSSFFont subtitleFont = (XSSFFont) wb.createFont();
            subtitleFont.setFontHeightInPoints((short) 9);
            subtitleStyle.setFont(subtitleFont);

            // BANCOS section header: #2E75B6 bg, white bold
            XSSFCellStyle bancosSecStyle = buildColorStyle(wb,
                    new java.awt.Color(0x2E, 0x75, 0xB6), new java.awt.Color(0xFF, 0xFF, 0xFF), true, (short) 11, CellStyle.ALIGN_CENTER);

            // CARTERA section header: #C65911 bg, white bold
            XSSFCellStyle carteraSecStyle = buildColorStyle(wb,
                    new java.awt.Color(0xC6, 0x59, 0x11), new java.awt.Color(0xFF, 0xFF, 0xFF), true, (short) 11, CellStyle.ALIGN_CENTER);

            // BANCOS column header: #D6E4F0 bg, #1F3864 text bold
            XSSFCellStyle bancosColStyle = buildColorStyle(wb,
                    new java.awt.Color(0xD6, 0xE4, 0xF0), new java.awt.Color(0x1F, 0x38, 0x64), true, (short) 10, CellStyle.ALIGN_CENTER);

            // CARTERA column header: #FCE4D6 bg, #7B2D00 text bold
            XSSFCellStyle carteraColStyle = buildColorStyle(wb,
                    new java.awt.Color(0xFC, 0xE4, 0xD6), new java.awt.Color(0x7B, 0x2D, 0x00), true, (short) 10, CellStyle.ALIGN_CENTER);

            // Data cell styles: BANCOS white / #EBF3FB, CARTERA white / #FDF0E8
            XSSFCellStyle bDataStyle = (XSSFCellStyle) wb.createCellStyle();
            XSSFCellStyle bDataAltStyle = buildColorStyle(wb,
                    new java.awt.Color(0xEB, 0xF3, 0xFB), null, false, (short) 0, CellStyle.ALIGN_LEFT);
            XSSFCellStyle cDataStyle = (XSSFCellStyle) wb.createCellStyle();
            XSSFCellStyle cDataAltStyle = buildColorStyle(wb,
                    new java.awt.Color(0xFD, 0xF0, 0xE8), null, false, (short) 0, CellStyle.ALIGN_LEFT);

            // Amount styles (cartera alt)
            XSSFCellStyle cAmtStyle = (XSSFCellStyle) wb.createCellStyle();
            cAmtStyle.setDataFormat(amtFmtIdx);
            XSSFCellStyle cAmtAltStyle = (XSSFCellStyle) wb.createCellStyle();
            cAmtAltStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(0xFD, 0xF0, 0xE8)));
            cAmtAltStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            cAmtAltStyle.setDataFormat(amtFmtIdx);

            // DIFERENCIA: green (#E2EFDA / #375623) or red (#FFCCCC / #9C0006)
            XSSFCellStyle difOkStyle = buildColorStyle(wb,
                    new java.awt.Color(0xE2, 0xEF, 0xDA), new java.awt.Color(0x37, 0x56, 0x23), true, (short) 0, CellStyle.ALIGN_RIGHT);
            difOkStyle.setDataFormat(amtFmtIdx);
            XSSFCellStyle difErrStyle = buildColorStyle(wb,
                    new java.awt.Color(0xFF, 0xCC, 0xCC), new java.awt.Color(0x9C, 0x00, 0x06), true, (short) 0, CellStyle.ALIGN_RIGHT);
            difErrStyle.setDataFormat(amtFmtIdx);

            // ── Row 0: empty ──────────────────────────────────────────
            sheet.createRow(0);

            // ── Row 1: title ──────────────────────────────────────────
            Row titleRow = sheet.createRow(1);
            titleRow.setHeightInPoints(28f);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("FORMATO DE CONCILIACIÓN " + country.trim().toUpperCase());
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, nTotal - 1));

            // ── Row 2: subtitle ───────────────────────────────────────
            Row subRow = sheet.createRow(2);
            String ts = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
            Cell subCell = subRow.createCell(0);
            subCell.setCellValue("Generado: " + ts + "  |  Archivo: " + sfile + "  |  BANDOCs: " + byBandoc.size());
            subCell.setCellStyle(subtitleStyle);
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, nTotal - 1));

            // ── Row 3: empty ──────────────────────────────────────────
            sheet.createRow(3);

            // ── Row 4: section headers ────────────────────────────────
            Row secRow = sheet.createRow(4);
            secRow.setHeightInPoints(18f);
            Cell bSec = secRow.createCell(0);
            bSec.setCellValue("BANCOS");
            bSec.setCellStyle(bancosSecStyle);
            sheet.addMergedRegion(new CellRangeAddress(4, 4, 0, nBancos - 1));
            Cell cSec = secRow.createCell(nBancos);
            cSec.setCellValue("CARTERA");
            cSec.setCellStyle(carteraSecStyle);
            sheet.addMergedRegion(new CellRangeAddress(4, 4, nBancos, nTotal - 1));

            // ── Row 5: column headers ─────────────────────────────────
            Row hdrRow = sheet.createRow(5);
            hdrRow.setHeightInPoints(16f);
            for (int i = 0; i < bancosHdrs.length; i++) {
                Cell c = hdrRow.createCell(i);
                c.setCellValue(bancosHdrs[i]);
                c.setCellStyle(bancosColStyle);
                sheet.setColumnWidth(i, 4400);
            }
            for (int i = 0; i < carteraHdrs.length; i++) {
                Cell c = hdrRow.createCell(nBancos + i);
                c.setCellValue(carteraHdrs[i]);
                c.setCellStyle(carteraColStyle);
                sheet.setColumnWidth(nBancos + i, 4400);
            }
            sheet.setAutoFilter(new CellRangeAddress(5, 5, 0, nTotal - 1));
            sheet.createFreezePane(0, 6);

            // ── Data rows (row 6+) ────────────────────────────────────
            int rowIdx = 6;
            int altIdx = 0;
            for (Map<String, Object> row : byBandoc.values()) {
                boolean alt = (altIdx % 2 == 1);
                Row dRow = sheet.createRow(rowIdx);

                // BANCOS columns
                for (int i = 0; i < bancosHdrs.length; i++) {
                    Cell c = dRow.createCell(i);
                    setCellValue(c, row.get(bancosHdrs[i]));
                    c.setCellStyle(alt ? bDataAltStyle : bDataStyle);
                }

                // CARTERA columns (all except DIFERENCIA)
                for (int i = 0; i < carteraKeys.length; i++) {
                    Cell c = dRow.createCell(nBancos + i);
                    Object val = row.get(carteraKeys[i]);
                    if ("MONTO".equals(carteraKeys[i]) || "NETOLOC".equals(carteraKeys[i])) {
                        c.setCellValue(toDouble(val));
                        c.setCellStyle(alt ? cAmtAltStyle : cAmtStyle);
                    } else {
                        setCellValue(c, val);
                        c.setCellStyle(alt ? cDataAltStyle : cDataStyle);
                    }
                }

                // DIFERENCIA = NETO + NETOLOC (same-currency check)
                Cell difCell = dRow.createCell(nBancos + carteraKeys.length);
                String monedaB = String.valueOf(row.containsKey("MONEDA_B") ? row.get("MONEDA_B") : "").trim();
                String monedaC = String.valueOf(row.containsKey("MONEDA_C") ? row.get("MONEDA_C") : "").trim();
                if (!monedaB.isEmpty() && monedaB.equalsIgnoreCase(monedaC)) {
                    double dif = toDouble(row.get("NETO")) + toDouble(row.get("NETOLOC"));
                    difCell.setCellValue(dif);
                    difCell.setCellStyle(Math.abs(dif) < 0.01 ? difOkStyle : difErrStyle);
                } else {
                    difCell.setCellValue("N/A");
                    difCell.setCellStyle(alt ? cDataAltStyle : cDataStyle);
                }

                rowIdx++;
                altIdx++;
            }

            // ── Stream response ───────────────────────────────────────
            String safeSfile = sfile.trim().replaceAll("[^a-zA-Z0-9_\\-\\.]", "_");
            String fileName = "Conciliacion_" + country.trim() + "_" + safeSfile + ".xlsx";
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            wb.write(response.getOutputStream());
            wb.close();

        } catch (Exception e) {
            e.printStackTrace();
            logError.error("getCartera -> " + e.getMessage(), e);
        }
    }

    private XSSFCellStyle buildColorStyle(XSSFWorkbook wb, java.awt.Color bg, java.awt.Color fg, boolean bold, short fontSize, short align) {
        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();
        if (bg != null) {
            style.setFillForegroundColor(new XSSFColor(bg));
            style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        }
        style.setAlignment(align);
        XSSFFont font = (XSSFFont) wb.createFont();
        if (fg != null) {
            font.setColor(new XSSFColor(fg));
        }
        font.setBoldweight(bold ? Font.BOLDWEIGHT_BOLD : Font.BOLDWEIGHT_NORMAL);
        if (fontSize > 0) {
            font.setFontHeightInPoints(fontSize);
        }
        style.setFont(font);
        return style;
    }

    private void setCellValue(Cell cell, Object val) {
        if (val == null) {
            cell.setCellValue("");
        } else if (val instanceof Number) {
            cell.setCellValue(((Number) val).doubleValue());
        } else {
            cell.setCellValue(String.valueOf(val));
        }
    }

    private double toDouble(Object val) {
        if (val == null) {
            return 0.0;
        }
        if (val instanceof Number) {
            return ((Number) val).doubleValue();
        }
        try {
            return Double.parseDouble(String.valueOf(val).trim());
        } catch (Exception e) {
            return 0.0;
        }
    }

    @RequestMapping(value = "downloadPDF", method = RequestMethod.GET)
    public void downloadPDF(HttpServletRequest request, HttpServletResponse response) {
        String sfile = request.getParameter("sfile");
        String disposition = request.getParameter("disposition");
        if (disposition == null || disposition.trim().isEmpty()) {
            disposition = "attachment";
        }

        if (sfile == null || sfile.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String basename = sfile.contains(".") ? sfile.substring(0, sfile.lastIndexOf('.')) : sfile;
        String pdfName = basename + "_LOADED.pdf";
        String pdfPath = "\\\\10.0.0.87\\av\\CARGA\\dev\\process\\CO\\PDF\\" + pdfName;

        java.io.File pdfFile = new java.io.File(pdfPath);
        if (!pdfFile.exists() || !pdfFile.isFile()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            logError.warn("downloadPDF: file not found -> " + pdfPath);
            return;
        }

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", disposition + "; filename=\"" + pdfName + "\"");
        response.setContentLength((int) pdfFile.length());

        try (java.io.FileInputStream fis = new java.io.FileInputStream(pdfFile); java.io.OutputStream os = response.getOutputStream()) {
            byte[] buf = new byte[8192];
            int n;
            while ((n = fis.read(buf)) != -1) {
                os.write(buf, 0, n);
            }
        } catch (java.io.IOException e) {
            logError.error("downloadPDF -> " + e.getMessage(), e);
        }
    }

    @RequestMapping(value = "searchMPF291ByBatch")
    public @ResponseBody
    String searchMPF291ByBatch(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : searchMPF291ByBatch (MPS600B) -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF291Filter filter = gson.fromJson(beanString, MPF291Filter.class);

            List<MPF291> lst = logic.loadMPS602(filter);

            map.put("success", true);
            map.put("total", lst.size());
            map.put("data", lst);

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("data", new ArrayList<>());
            map.put("total", 0);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "linkMPF291", method = RequestMethod.POST)
    public @ResponseBody
    String linkMPF291(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : linkMPF291 (MPS601) -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");

            MPF291LinkPayload payload = gson.fromJson(beanString, MPF291LinkPayload.class);

            int linked = 0;
            int errors = 0;

            for (MPF291LinkPayload.SelectedRecord rec : payload.selected) {
                MPF291Filter filter = new MPF291Filter();
                filter.IN_AWBNO = rec.AWBNO;
                filter.IN_NCICLO = rec.NCICLO;
                filter.IN_SFILE = payload.IN_SFILE;
                filter.IN_NPAGE = payload.IN_NPAGE;
                filter.IN_PAYDAY = payload.IN_PAYDAY;
                filter.IN_TYPE = payload.IN_TYPE;
                filter.IN_SEQ = payload.IN_SEQ;
                filter.IN_CBATCH = payload.IN_CBATCH;
                filter.IN_DATEBAT = payload.IN_DATEBAT;
                filter.option = "U";

                Map<String, Object> result = logic.updateMPS601(filter);
                if (Boolean.TRUE.equals(result.get("success"))) {
                    linked++;
                } else {
                    errors++;
                }
            }

            map.put("success", errors == 0);
            map.put("Mensaje", linked + " record(s) linked" + (errors > 0 ? ", " + errors + " error(s)." : "."));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", "Server error: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "runProcess", method = RequestMethod.POST)
    public @ResponseBody
    String runProcess(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : runProcess -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            java.lang.reflect.Type mapStrType = new com.google.gson.reflect.TypeToken<java.util.Map<String, String>>() {
            }.getType();
            java.util.Map<String, String> bean = gson.fromJson(beanString, mapStrType);

            String country = bean.get("country");
            String process = bean.get("process");

            System.out.println("runProcess -> country=" + country + ", process=" + process);

            Map<String, Object> result;

            if ("CO".equals(country) && "FASE1".equals(process)) {
                result = logic.runMPS556();
            } else if ("CO".equals(country) && "FASE2".equals(process)) {
                result = logic.runMPS557();
            } else {
                result = new HashMap<>();
                result.put("success", false);
                result.put("mensaje", "Process combination not available: " + country + " / " + process);
            }

            map.put("success", result.get("success"));
            map.put("Mensaje", result.get("mensaje"));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", "Server error: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceA2280", method = RequestMethod.POST)
    public @ResponseBody
    String MaintenanceA2280(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : MaintenanceA2280 (Update) -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            if (this.serverSession == null || this.serverSession.getServerSession() == null) {
                map.put("success", false);
                map.put("Mensaje", "Session not available. Please log in again.");
                return new Gson().toJson(map);
            }

            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            if (beanString == null || beanString.trim().isEmpty()) {
                map.put("success", false);
                map.put("Mensaje", "No data received from client.");
                return new Gson().toJson(map);
            }

            MPF295Filter bean = gson.fromJson(beanString, MPF295Filter.class);

            Map<String, Object> result = logic.updateMPS588(bean);

            // El SP debe devolver si fue exitoso y un mensaje
            map.put("success", result.get("success"));
            map.put("Mensaje", result.get("mensaje"));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", "Ocurrió un error en el servidor: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "exportExcelBKP", method = RequestMethod.GET)
    public void exportExcelBKP(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoGuide : Export Excel Conciliacion Multi-Sheet -------------");

        String fileNameDownload = "RV_Conciliacion_" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()) + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            Gson gson = new Gson();
            MPF295Filter filter = gson.fromJson(beanString, MPF295Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<MPF295> lstData = logic.loadMPS603(filter);

            java.util.Map<String, java.util.List<MPF295>> datosAgrupados = new java.util.LinkedHashMap<>();

            for (MPF295 item : lstData) {
                String nombreHoja = "Sin_Archivo"; 

                if (item.NAMEFILE != null && !item.NAMEFILE.trim().isEmpty()) {
                    nombreHoja = item.NAMEFILE.trim();
                    if (nombreHoja.toLowerCase().endsWith(".txt") || nombreHoja.toLowerCase().endsWith(".csv")) {
                        nombreHoja = nombreHoja.substring(0, nombreHoja.length() - 4);
                    }
                    
                    if (nombreHoja.length() > 31) {
                        nombreHoja = nombreHoja.substring(0, 31);
                    }
                }

                if (!datosAgrupados.containsKey(nombreHoja)) {
                    datosAgrupados.put(nombreHoja, new java.util.ArrayList<MPF295>());
                }
                
                datosAgrupados.get(nombreHoja).add(item);
            }

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);

            Font fontTitle = workbook.createFont();
            fontTitle.setColor(IndexedColors.WHITE.getIndex());
            fontTitle.setBoldweight(Font.BOLDWEIGHT_BOLD);
            fontTitle.setFontHeightInPoints((short) 14);

            Font fontSubtitle = workbook.createFont();
            fontSubtitle.setItalic(true);
            fontSubtitle.setFontHeightInPoints((short) 10);

            Font fontHeaderCol = workbook.createFont();
            fontHeaderCol.setBoldweight(Font.BOLDWEIGHT_BOLD);
            fontHeaderCol.setColor(IndexedColors.DARK_BLUE.getIndex());

            CellStyle styleTitle = workbook.createCellStyle();
            styleTitle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            styleTitle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleTitle.setAlignment(CellStyle.ALIGN_CENTER);
            styleTitle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleTitle.setFont(fontTitle);

            CellStyle styleSubtitle = workbook.createCellStyle();
            styleSubtitle.setAlignment(CellStyle.ALIGN_RIGHT);
            styleSubtitle.setFont(fontSubtitle);

            CellStyle styleBancos = workbook.createCellStyle();
            styleBancos.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
            styleBancos.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBancos.setAlignment(CellStyle.ALIGN_CENTER);
            styleBancos.setFont(fontTitle);

            CellStyle styleCartera = workbook.createCellStyle();
            styleCartera.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
            styleCartera.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleCartera.setAlignment(CellStyle.ALIGN_CENTER);
            styleCartera.setFont(fontTitle);

            CellStyle styleColHeader = workbook.createCellStyle();
            styleColHeader.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleColHeader.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleColHeader.setBorderBottom(CellStyle.BORDER_THIN);
            styleColHeader.setBorderTop(CellStyle.BORDER_THIN);
            styleColHeader.setBorderLeft(CellStyle.BORDER_THIN);
            styleColHeader.setBorderRight(CellStyle.BORDER_THIN);
            styleColHeader.setAlignment(CellStyle.ALIGN_CENTER);
            styleColHeader.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleColHeader.setFont(fontHeaderCol);

            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));


            for (java.util.Map.Entry<String, java.util.List<MPF295>> entry : datosAgrupados.entrySet()) {
                
                String nombreSheet = entry.getKey();
                java.util.List<MPF295> listaPorHoja = entry.getValue();

                Sheet sheet = workbook.createSheet(nombreSheet);
                int rowIdx = 0;

                Row rowTitle = sheet.createRow(rowIdx++);
                rowTitle.setHeightInPoints(30);
                Cell cellTitle = rowTitle.createCell(0);
                cellTitle.setCellValue("FORMATO DE CONCILIACIÓN CO");
                cellTitle.setCellStyle(styleTitle);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 34));

                Row rowSubtitle = sheet.createRow(rowIdx++);
                Cell cellSub = rowSubtitle.createCell(0);
                String fechaGen = new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date());
                String nombreOriginal = listaPorHoja.get(0).NAMEFILE.trim().isEmpty() ? "Sin Archivo" : listaPorHoja.get(0).NAMEFILE.trim();
                cellSub.setCellValue("Generado: " + fechaGen + " | Archivo Origen: " + nombreOriginal + " | BANDOCs conciliados: " + listaPorHoja.size());
                cellSub.setCellStyle(styleSubtitle);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 34));

                Row rowGroup = sheet.createRow(rowIdx++);
                rowGroup.setHeightInPoints(25);

                Cell cellBancos = rowGroup.createCell(0);
                cellBancos.setCellValue("BANCOS");
                cellBancos.setCellStyle(styleBancos);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 0, 17));

                Cell cellCartera = rowGroup.createCell(18);
                cellCartera.setCellValue("CARTERA");
                cellCartera.setCellStyle(styleCartera);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 18, 30));

                Row rowHeaders = sheet.createRow(rowIdx++);
                rowHeaders.setHeightInPoints(35);
                String[] columns = {
                    "Sociedad", "Centro de beneficio País","Centro de beneficio", "Cuenta", "Asignación", "Referencia", "Clave referencia 1", 
                    "Texto cab. documento",
                    "Nº documento", "Clave referencia 3", "Clase de\ndocumento", "Fecha de\ndocumento", "Clave contabiliz.",
                    "Importe moneda doc.", "Moneda del\ndocumento", "Importe valorado ML2", "Moneda del\ngrupo", "Texto", 
                    
                    "Sociedad", "Cuenta", "Fecha DOC.", "Referencia de pago", "Nº documento", "Fecha Contabilización",
                    "Importe moneda doc.", "Moneda del documento", "Texto", "Clave referencia 1", "Clave referencia 3", "Centro de beneficio", "País",
                    "Diferencia", "Comentario", "Fecha Envío VB", "Fecha compensación"
                };

                for (int i = 0; i < columns.length; i++) {
                    Cell cell = rowHeaders.createCell(i);
                    cell.setCellValue(columns[i]);
                    cell.setCellStyle(styleColHeader);
                    sheet.setColumnWidth(i, 4800);
                }


                String ultimoBandoc = "";

                for (MPF295 item : listaPorHoja) {
                    Row row = sheet.createRow(rowIdx++);

                    String bandocActual = item.BANDOC_T1 != null ? item.BANDOC_T1 : "";
                    boolean esNuevoGrupo = !bandocActual.equals(ultimoBandoc);

                    if (esNuevoGrupo) {
                        ultimoBandoc = bandocActual;

                        
                        row.createCell(0).setCellValue(item.SOCIETY_T1);
                        row.createCell(1).setCellValue(item.SCOUNTRY_T1);
                        row.createCell(2).setCellValue(item.BENCENC_T1);
                        row.createCell(3).setCellValue(item.ACCOUNT_T1);
                        row.createCell(4).setCellValue(item.ASSIGNMEN_T1);
                        row.createCell(5).setCellValue(item.REFER_T1);
                        row.createCell(6).setCellValue(item.CLAVE1_T1);
                        row.createCell(7).setCellValue(item.TXTCABDOC_T1);
                        row.createCell(8).setCellValue(item.BANDOC_T1);
                        row.createCell(9).setCellValue(item.CLAVE3_T1);
                        row.createCell(10).setCellValue(item.CLASEDOC_T1);
                        row.createCell(11).setCellValue(item.DOCDATE_T1);
                        row.createCell(12).setCellValue(item.CLAVECONT_T1);

                        Cell cellNeto = row.createCell(13);
                        cellNeto.setCellValue(item.NETO_T1);
                        cellNeto.setCellStyle(amountStyle);

                        row.createCell(14).setCellValue(item.SCURRENCY_T1);

                        Cell cellLoc = row.createCell(15);
                        cellLoc.setCellValue(item.LOCAMOUNT2_T1);
                        cellLoc.setCellStyle(amountStyle);

                        row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                        row.createCell(17).setCellValue(item.TEXTO_T1);

                        Cell cellDif = row.createCell(31);
                        cellDif.setCellValue(item.DIFERENCIA);
                        cellDif.setCellStyle(amountStyle);

                        row.createCell(32).setCellValue(item.COMENTARIO);
                        row.createCell(33).setCellValue(item.FECHA_ENVIO_VB);
                        row.createCell(34).setCellValue(item.FECHA_COMPENSACION);
                    }

                    row.createCell(18).setCellValue(item.SOCIETY_T2);
                    row.createCell(19).setCellValue(item.ACCOUNT_T2);
                    row.createCell(20).setCellValue(item.FECBASE_T2);
                    row.createCell(21).setCellValue(item.NUMLEG_T2);
                    row.createCell(22).setCellValue(item.BANDOCCAR_T2);
                    row.createCell(23).setCellValue(item.FCONT_T2);

                    Cell cellImp2 = row.createCell(24);
                    cellImp2.setCellValue(item.IMPORTLOC2_T2);
                    cellImp2.setCellStyle(amountStyle);

                    row.createCell(25).setCellValue(item.MONSUC2_T2);
                    row.createCell(26).setCellValue(item.TEXTO_T2);
                    row.createCell(27).setCellValue(item.CLAVREF1_T2);
                    row.createCell(28).setCellValue(item.CLAVREF3_T2);
                    row.createCell(29).setCellValue(item.CENBEN_T2);
                    row.createCell(30).setCellValue(item.SCOUNTRY_T2);
                }
            }
            
            if (datosAgrupados.isEmpty()) {
                 workbook.createSheet("Sin Datos");
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            OutputStream out = response.getOutputStream();
            workbook.write(out);
            workbook.dispose(); 
            out.flush();
            out.close();

            System.out.println("-------------- Excel exportado correctamente Multi-Sheet -------------");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
    
    @RequestMapping(value = "exportExcel", method = RequestMethod.GET)
    public void exportExcel(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoGuide : Export Excel Conciliacion Multi-Sheet/HN -------------");

        String fileNameDownload = "RV_Conciliacion_" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()) + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            Gson gson = new Gson();
            MPF295Filter filter = gson.fromJson(beanString, MPF295Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<MPF295> lstData = logic.loadMPS603(filter);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);

            // ==============================================
            // DEFINICIÓN DE ESTILOS (Común para ambos países)
            // ==============================================
            Font fontTitle = workbook.createFont();
            fontTitle.setColor(IndexedColors.WHITE.getIndex());
            fontTitle.setBoldweight(Font.BOLDWEIGHT_BOLD);
            fontTitle.setFontHeightInPoints((short) 14);

            Font fontSubtitle = workbook.createFont();
            fontSubtitle.setItalic(true);
            fontSubtitle.setFontHeightInPoints((short) 10);

            Font fontHeaderCol = workbook.createFont();
            fontHeaderCol.setBoldweight(Font.BOLDWEIGHT_BOLD);
            fontHeaderCol.setColor(IndexedColors.DARK_BLUE.getIndex());

            CellStyle styleTitle = workbook.createCellStyle();
            styleTitle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            styleTitle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleTitle.setAlignment(CellStyle.ALIGN_CENTER);
            styleTitle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleTitle.setFont(fontTitle);

            CellStyle styleSubtitle = workbook.createCellStyle();
            styleSubtitle.setAlignment(CellStyle.ALIGN_RIGHT);
            styleSubtitle.setFont(fontSubtitle);

            CellStyle styleBancos = workbook.createCellStyle();
            styleBancos.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
            styleBancos.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleBancos.setAlignment(CellStyle.ALIGN_CENTER);
            styleBancos.setFont(fontTitle);

            CellStyle styleCartera = workbook.createCellStyle();
            styleCartera.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
            styleCartera.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleCartera.setAlignment(CellStyle.ALIGN_CENTER);
            styleCartera.setFont(fontTitle);

            CellStyle styleColHeader = workbook.createCellStyle();
            styleColHeader.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleColHeader.setFillPattern(CellStyle.SOLID_FOREGROUND);
            styleColHeader.setBorderBottom(CellStyle.BORDER_THIN);
            styleColHeader.setBorderTop(CellStyle.BORDER_THIN);
            styleColHeader.setBorderLeft(CellStyle.BORDER_THIN);
            styleColHeader.setBorderRight(CellStyle.BORDER_THIN);
            styleColHeader.setAlignment(CellStyle.ALIGN_CENTER);
            styleColHeader.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            styleColHeader.setFont(fontHeaderCol);

            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            String[] columns = {
                "Sociedad", "Centro de beneficio País","Centro de beneficio", "Cuenta", "Asignación", "Referencia", "Clave referencia 1", 
                "Texto cab. documento",
                "Nº documento", "Clave referencia 3", "Clase de\ndocumento", "Fecha de\ndocumento", "Clave contabiliz.",
                "Importe moneda doc.", "Moneda del\ndocumento", "Importe valorado ML2", "Moneda del\ngrupo", "Texto", 
                
                "Sociedad", "Cuenta", "Fecha DOC.", "Referencia de pago", "Nº documento", "Fecha Contabilización",
                "Importe moneda doc.", "Moneda del documento", "Texto", "Clave referencia 1", "Clave referencia 3", "Centro de beneficio", "País",
                "Diferencia", "Comentario", "Fecha Envío VB", "Fecha compensación"
            };

            // ==============================================
            // DETECTAR EL PAÍS PARA DECIDIR LA LÓGICA
            // ==============================================
            boolean isHonduras = false;
            if (lstData != null && !lstData.isEmpty()) {
                String pais = lstData.get(0).SCOUNTRY_T1;
                if (pais != null && pais.trim().equalsIgnoreCase("HN")) {
                    isHonduras = true;
                }
            }

            if (isHonduras) {
                // ==============================================================
                // LÓGICA HONDURAS: Una sola hoja y ocultar importes repetidos
                // ==============================================================
                Sheet sheet = workbook.createSheet("Conciliacion HN");
                int rowIdx = 0;

                Row rowTitle = sheet.createRow(rowIdx++);
                rowTitle.setHeightInPoints(30);
                Cell cellTitle = rowTitle.createCell(0);
                cellTitle.setCellValue("FORMATO DE CONCILIACIÓN HN");
                cellTitle.setCellStyle(styleTitle);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 34));

                Row rowSubtitle = sheet.createRow(rowIdx++);
                Cell cellSub = rowSubtitle.createCell(0);
                String fechaGen = new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date());
                cellSub.setCellValue("Generado: " + fechaGen + " | Total de BANDOCs conciliados: " + lstData.size());
                cellSub.setCellStyle(styleSubtitle);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 34));

                Row rowGroup = sheet.createRow(rowIdx++);
                rowGroup.setHeightInPoints(25);

                Cell cellBancos = rowGroup.createCell(0);
                cellBancos.setCellValue("BANCOS");
                cellBancos.setCellStyle(styleBancos);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 0, 17));

                Cell cellCartera = rowGroup.createCell(18);
                cellCartera.setCellValue("CARTERA");
                cellCartera.setCellStyle(styleCartera);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 18, 30));

                Row rowHeaders = sheet.createRow(rowIdx++);
                rowHeaders.setHeightInPoints(35);

                for (int i = 0; i < columns.length; i++) {
                    Cell cell = rowHeaders.createCell(i);
                    cell.setCellValue(columns[i]);
                    cell.setCellStyle(styleColHeader);
                    sheet.setColumnWidth(i, 4800);
                }

                // Variable para identificar si es fila repetida de la Cartera
                String ultimaCarteraUnica = "";

                for (MPF295 item : lstData) {
                    Row row = sheet.createRow(rowIdx++);

                    // 1. LLENAMOS EL BANCO (Se imprime siempre igual en Honduras)
                    row.createCell(0).setCellValue(item.SOCIETY_T1);
                    row.createCell(1).setCellValue(item.SCOUNTRY_T1);
                    row.createCell(2).setCellValue(item.BENCENC_T1);
                    row.createCell(3).setCellValue(item.ACCOUNT_T1);
                    row.createCell(4).setCellValue(item.ASSIGNMEN_T1);
                    row.createCell(5).setCellValue(item.REFER_T1);
                    row.createCell(6).setCellValue(item.CLAVE1_T1);
                    row.createCell(7).setCellValue(item.TXTCABDOC_T1);
                    row.createCell(8).setCellValue(item.BANDOC_T1);
                    row.createCell(9).setCellValue(item.CLAVE3_T1);
                    row.createCell(10).setCellValue(item.CLASEDOC_T1);
                    row.createCell(11).setCellValue(item.DOCDATE_T1);
                    row.createCell(12).setCellValue(item.CLAVECONT_T1);

                    Cell cellNeto = row.createCell(13);
                    cellNeto.setCellValue(item.NETO_T1);
                    cellNeto.setCellStyle(amountStyle);

                    row.createCell(14).setCellValue(item.SCURRENCY_T1);

                    Cell cellLoc = row.createCell(15);
                    cellLoc.setCellValue(item.LOCAMOUNT2_T1);
                    cellLoc.setCellStyle(amountStyle);

                    row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                    row.createCell(17).setCellValue(item.TEXTO_T1);

                    // 2. MAGIA DE HONDURAS (CARTERA): Detectar si la cartera es nueva o repetida
                    String carteraActualUnica = (item.NUMLEG_T2 != null ? item.NUMLEG_T2 : "") + "-" + 
                                                (item.BANDOCCAR_T2 != null ? item.BANDOCCAR_T2 : "");
                    
                    boolean esNuevaCartera = !carteraActualUnica.equals(ultimaCarteraUnica);
                    
                    if (esNuevaCartera) {
                        ultimaCarteraUnica = carteraActualUnica;
                    }

                    // 3. LLENAMOS LA CARTERA
                    row.createCell(18).setCellValue(item.SOCIETY_T2);
                    row.createCell(19).setCellValue(item.ACCOUNT_T2);
                    row.createCell(20).setCellValue(item.FECBASE_T2);
                    row.createCell(21).setCellValue(item.NUMLEG_T2);
                    row.createCell(22).setCellValue(item.BANDOCCAR_T2);
                    row.createCell(23).setCellValue(item.FCONT_T2);

                    // AQUI CONTROLAMOS EL MONTO REPETIDO DE LA CARTERA
                    Cell cellImp2 = row.createCell(24);
                    if (esNuevaCartera) {
                        cellImp2.setCellValue(item.IMPORTLOC2_T2);
                    } else {
                        cellImp2.setCellValue(0.0);
                    }
                    cellImp2.setCellStyle(amountStyle);

                    row.createCell(25).setCellValue(item.MONSUC2_T2);
                    row.createCell(26).setCellValue(item.TEXTO_T2);
                    row.createCell(27).setCellValue(item.CLAVREF1_T2);
                    row.createCell(28).setCellValue(item.CLAVREF3_T2);
                    row.createCell(29).setCellValue(item.CENBEN_T2);
                    row.createCell(30).setCellValue(item.SCOUNTRY_T2);

                    // -------------------------------------------------------------
                    // 4. MAGIA DE HONDURAS (DIFERENCIA): Solo en la primera fila
                    // -------------------------------------------------------------
                    // ¡Corrección! Usamos la bandera esNuevaCartera en lugar del BANDOC
                    if (esNuevaCartera) {
                        Cell cellDif = row.createCell(31);
                        cellDif.setCellValue(item.DIFERENCIA);
                        cellDif.setCellStyle(amountStyle);

                        row.createCell(32).setCellValue(item.COMENTARIO);
                        row.createCell(33).setCellValue(item.FECHA_ENVIO_VB);
                        row.createCell(34).setCellValue(item.FECHA_COMPENSACION);
                    }
                }

                if (lstData.isEmpty()) {
                    workbook.createSheet("Sin Datos");
                }

            } else {
                // ==============================================================
                // LÓGICA COLOMBIA: CÓDIGO ORIGINAL INTACTO (No se tocó nada)
                // ==============================================================
                java.util.Map<String, java.util.List<MPF295>> datosAgrupados = new java.util.LinkedHashMap<>();

                for (MPF295 item : lstData) {
                    String nombreHoja = "Sin_Archivo"; 

                    if (item.NAMEFILE != null && !item.NAMEFILE.trim().isEmpty()) {
                        nombreHoja = item.NAMEFILE.trim();
                        if (nombreHoja.toLowerCase().endsWith(".txt") || nombreHoja.toLowerCase().endsWith(".csv")) {
                            nombreHoja = nombreHoja.substring(0, nombreHoja.length() - 4);
                        }
                        
                        if (nombreHoja.length() > 31) {
                            nombreHoja = nombreHoja.substring(0, 31);
                        }
                    }

                    if (!datosAgrupados.containsKey(nombreHoja)) {
                        datosAgrupados.put(nombreHoja, new java.util.ArrayList<MPF295>());
                    }
                    
                    datosAgrupados.get(nombreHoja).add(item);
                }

                for (java.util.Map.Entry<String, java.util.List<MPF295>> entry : datosAgrupados.entrySet()) {
                    
                    String nombreSheet = entry.getKey();
                    java.util.List<MPF295> listaPorHoja = entry.getValue();

                    Sheet sheet = workbook.createSheet(nombreSheet);
                    int rowIdx = 0;

                    Row rowTitle = sheet.createRow(rowIdx++);
                    rowTitle.setHeightInPoints(30);
                    Cell cellTitle = rowTitle.createCell(0);
                    cellTitle.setCellValue("FORMATO DE CONCILIACIÓN CO");
                    cellTitle.setCellStyle(styleTitle);
                    sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 34));

                    Row rowSubtitle = sheet.createRow(rowIdx++);
                    Cell cellSub = rowSubtitle.createCell(0);
                    String fechaGen = new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date());
                    String nombreOriginal = listaPorHoja.get(0).NAMEFILE.trim().isEmpty() ? "Sin Archivo" : listaPorHoja.get(0).NAMEFILE.trim();
                    cellSub.setCellValue("Generado: " + fechaGen + " | Archivo Origen: " + nombreOriginal + " | BANDOCs conciliados: " + listaPorHoja.size());
                    cellSub.setCellStyle(styleSubtitle);
                    sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 34));

                    Row rowGroup = sheet.createRow(rowIdx++);
                    rowGroup.setHeightInPoints(25);

                    Cell cellBancos = rowGroup.createCell(0);
                    cellBancos.setCellValue("BANCOS");
                    cellBancos.setCellStyle(styleBancos);
                    sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 0, 17));

                    Cell cellCartera = rowGroup.createCell(18);
                    cellCartera.setCellValue("CARTERA");
                    cellCartera.setCellStyle(styleCartera);
                    sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(2, 2, 18, 30));

                    Row rowHeaders = sheet.createRow(rowIdx++);
                    rowHeaders.setHeightInPoints(35);

                    for (int i = 0; i < columns.length; i++) {
                        Cell cell = rowHeaders.createCell(i);
                        cell.setCellValue(columns[i]);
                        cell.setCellStyle(styleColHeader);
                        sheet.setColumnWidth(i, 4800);
                    }

                    String ultimoBandoc = "";

                    for (MPF295 item : listaPorHoja) {
                        Row row = sheet.createRow(rowIdx++);

                        String bandocActual = item.BANDOC_T1 != null ? item.BANDOC_T1 : "";
                        boolean esNuevoGrupo = !bandocActual.equals(ultimoBandoc);

                        if (esNuevoGrupo) {
                            ultimoBandoc = bandocActual;
                            
                            row.createCell(0).setCellValue(item.SOCIETY_T1);
                            row.createCell(1).setCellValue(item.SCOUNTRY_T1);
                            row.createCell(2).setCellValue(item.BENCENC_T1);
                            row.createCell(3).setCellValue(item.ACCOUNT_T1);
                            row.createCell(4).setCellValue(item.ASSIGNMEN_T1);
                            row.createCell(5).setCellValue(item.REFER_T1);
                            row.createCell(6).setCellValue(item.CLAVE1_T1);
                            row.createCell(7).setCellValue(item.TXTCABDOC_T1);
                            row.createCell(8).setCellValue(item.BANDOC_T1);
                            row.createCell(9).setCellValue(item.CLAVE3_T1);
                            row.createCell(10).setCellValue(item.CLASEDOC_T1);
                            row.createCell(11).setCellValue(item.DOCDATE_T1);
                            row.createCell(12).setCellValue(item.CLAVECONT_T1);

                            Cell cellNeto = row.createCell(13);
                            cellNeto.setCellValue(item.NETO_T1);
                            cellNeto.setCellStyle(amountStyle);

                            row.createCell(14).setCellValue(item.SCURRENCY_T1);

                            Cell cellLoc = row.createCell(15);
                            cellLoc.setCellValue(item.LOCAMOUNT2_T1);
                            cellLoc.setCellStyle(amountStyle);

                            row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                            row.createCell(17).setCellValue(item.TEXTO_T1);

                            Cell cellDif = row.createCell(31);
                            cellDif.setCellValue(item.DIFERENCIA);
                            cellDif.setCellStyle(amountStyle);

                            row.createCell(32).setCellValue(item.COMENTARIO);
                            row.createCell(33).setCellValue(item.FECHA_ENVIO_VB);
                            row.createCell(34).setCellValue(item.FECHA_COMPENSACION);
                        }

                        row.createCell(18).setCellValue(item.SOCIETY_T2);
                        row.createCell(19).setCellValue(item.ACCOUNT_T2);
                        row.createCell(20).setCellValue(item.FECBASE_T2);
                        row.createCell(21).setCellValue(item.NUMLEG_T2);
                        row.createCell(22).setCellValue(item.BANDOCCAR_T2);
                        row.createCell(23).setCellValue(item.FCONT_T2);

                        Cell cellImp2 = row.createCell(24);
                        cellImp2.setCellValue(item.IMPORTLOC2_T2);
                        cellImp2.setCellStyle(amountStyle);

                        row.createCell(25).setCellValue(item.MONSUC2_T2);
                        row.createCell(26).setCellValue(item.TEXTO_T2);
                        row.createCell(27).setCellValue(item.CLAVREF1_T2);
                        row.createCell(28).setCellValue(item.CLAVREF3_T2);
                        row.createCell(29).setCellValue(item.CENBEN_T2);
                        row.createCell(30).setCellValue(item.SCOUNTRY_T2);
                    }
                }
                
                if (datosAgrupados.isEmpty()) {
                     workbook.createSheet("Sin Datos");
                }
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            OutputStream out = response.getOutputStream();
            workbook.write(out);
            workbook.dispose(); 
            out.flush();
            out.close();

            System.out.println("-------------- Excel exportado correctamente -------------");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "deleteDetailPayment", method = RequestMethod.POST)
    public @ResponseBody String deleteDetailPayment(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        try {
            String beanString = request.getParameter("beanString");
            MPF295Filter filter = new Gson().fromJson(beanString, MPF295Filter.class);

            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            Map<String, Object> result = logic.deleteMPS604(filter);

            int outCode = (int) result.get("OUT_CODE");
            map.put("success", outCode == 1);
            map.put("message", result.get("OUT_MESSAGE"));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "Error interno al intentar limpiar el registro.");
        }
        return new Gson().toJson(map);
    }
    
    
}
