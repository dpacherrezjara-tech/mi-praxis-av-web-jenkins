/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.DirectSalesLogic;
import net.miatech.praxis.payment.MPF190;
import net.miatech.praxis.payment.MPF190Filter;
import net.miatech.praxis.payment.MPF190ExchangePending;
import net.miatech.praxis.payment.MPF190Update;
import net.miatech.praxis.payment.MPF190Create;
import net.miatech.praxis.MPF300;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
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
@RequestMapping("/DirectSales")
public class DirectSalesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DirectSalesLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DirectSales/form_index";
    }

    @RequestMapping(value = "getXLSXDashboard")
    public @ResponseBody
    void getXLSXDashboard(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Direct Sales Dashboard - " + Functions.getFechaActual() + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);

            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<MPF190> listaData = logic.loadMPS774(filter);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Dashboard");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            Row header = sheet.createRow(0);
            String[] columns = {
                "Month", "Airline", "Qty Total", "Amount Total (USD)",
                "Qty Auto", "% Processed", "Qty Manual", "Amount Match (USD)",
                "Qty W/O Statement", "Amount W/O Statement (USD)"
            };
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 4500);
            }

            int rowIdx = 1;
            int lastIdx = listaData.size() - 1;
            for (int i = 0; i < listaData.size(); i++) {
                MPF190 item = listaData.get(i);
                Row row = sheet.createRow(rowIdx++);

                if (i == lastIdx) {
                    row.createCell(0).setCellValue("TOTAL");
                    row.createCell(1).setCellValue("");
                    row.createCell(2).setCellValue(item.TOTAL_QTOTAL);
                    Cell c3 = row.createCell(3);
                    c3.setCellValue(item.TOTAL_AMTTOTAL);
                    c3.setCellStyle(amountStyle);
                    row.createCell(4).setCellValue(item.TOTAL_QMATCH);
                    row.createCell(5).setCellValue(item.TOTAL_PCT);
                    row.createCell(6).setCellValue(item.TOTAL_QMANUAL);
                    Cell c7 = row.createCell(7);
                    c7.setCellValue(item.TOTAL_AMTMATCH);
                    c7.setCellStyle(amountStyle);
                    row.createCell(8).setCellValue(item.TOTAL_QPEND);
                    Cell c9 = row.createCell(9);
                    c9.setCellValue(item.TOTAL_AMTPEND);
                    c9.setCellStyle(amountStyle);
                    continue;
                }

                row.createCell(0).setCellValue(Functions.getMonthConvert(item.ADATE));

                String airline = item.CCUST != null ? item.CCUST.trim() : "";
                String airlineLabel;
                if (airline.isEmpty()) {
                    airlineLabel = "Avianca Group";
                } else if ("134".equals(airline)) {
                    airlineLabel = "Avianca";
                } else if ("133".equals(airline)) {
                    airlineLabel = "Lacsa";
                } else if ("202".equals(airline)) {
                    airlineLabel = "Taca";
                } else if ("547".equals(airline)) {
                    airlineLabel = "Aerogal";
                } else if ("729".equals(airline)) {
                    airlineLabel = "Tampa";
                } else {
                    airlineLabel = airline;
                }
                row.createCell(1).setCellValue(airlineLabel);

                row.createCell(2).setCellValue(item.VL_QTY_TOTAL);
                Cell c3 = row.createCell(3);
                c3.setCellValue(item.VL_AMT_TOTAL);
                c3.setCellStyle(amountStyle);
                row.createCell(4).setCellValue(item.VL_QTY_MATCH);
                row.createCell(5).setCellValue(item.PCT_PROCESADO);
                row.createCell(6).setCellValue(item.VL_QTY_MANUAL);
                Cell c7 = row.createCell(7);
                c7.setCellValue(item.VL_AMT_MATCH);
                c7.setCellStyle(amountStyle);
                row.createCell(8).setCellValue(item.VL_QTY_PEND);
                Cell c9 = row.createCell(9);
                c9.setCellValue(item.VL_AMT_PEND);
                c9.setCellStyle(amountStyle);
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Direct Sales Detail - " + Functions.getFechaActual() + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);
            filter.page.PAGNUM = 1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = 0;
            filter.page.TOTROW = -1;

            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<MPF190> listaData = logic.loadMPS775(filter);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Detail");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Country", "Agent", "Abono Date", "Sales Date",
                "Reference", "SFile", "Npag", "Currency", "Neto", "Payamou"
            };
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 4500);
            }

            int rowIdx = 1;
            for (MPF190 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.NBR);
                row.createCell(1).setCellValue(item.SCOUNTRY);
                row.createCell(2).setCellValue(item.SAGENT);
                row.createCell(3).setCellValue(item.ADATE);
                row.createCell(4).setCellValue(item.SDATE);
                row.createCell(5).setCellValue(item.REFERENCE);
                row.createCell(6).setCellValue(item.SFILE);
                row.createCell(7).setCellValue(item.NPAG);
                row.createCell(8).setCellValue(item.SCURRENCY);
                Cell netoCell = row.createCell(9);
                netoCell.setCellValue(item.NETO);
                netoCell.setCellStyle(amountStyle);
                Cell payCell = row.createCell(10);
                payCell.setCellValue(item.PAYAMOU);
                payCell.setCellStyle(amountStyle);
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXTicketDetail")
    public @ResponseBody
    void getXLSXTicketDetail(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Direct Sales Ticket Detail - " + Functions.getFechaActual() + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);
            filter.page.PAGNUM = 1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = 0;
            filter.page.TOTROW = -1;

            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<MPF300> listaData = logic.loadMPS783(filter);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Ticket Detail");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Ticket", "Status", "Source", "Type", "Form Payment",
                "Sales Date", "Country", "Agent", "Days Pending", "Currency", "Amount"
            };
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 4500);
            }

            int rowIdx = 1;
            for (MPF300 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.strTicket);

                String statusLabel;
                if ("1".equals(item.STVAL)) {
                    statusLabel = "Match";
                } else if ("5".equals(item.STVAL)) {
                    statusLabel = "Match Manual";
                } else {
                    statusLabel = "Sales Without Liqui.";
                }
                row.createCell(2).setCellValue(statusLabel);

                row.createCell(3).setCellValue(item.CFUENTE);
                row.createCell(4).setCellValue(item.strPEM);
                row.createCell(5).setCellValue(item.SPAYMENT);
                row.createCell(6).setCellValue(item.SDATE);
                row.createCell(7).setCellValue(item.SCOUNTRY);
                row.createCell(8).setCellValue(item.SAGENT);
                row.createCell(9).setCellValue(item.DIFFDAYS);
                row.createCell(10).setCellValue(item.SCURRENCY);
                Cell amountCell = row.createCell(11);
                amountCell.setCellValue(item.SVFOPNETR);
                amountCell.setCellStyle(amountStyle);
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "searchDashboard")
    public @ResponseBody
    String searchDashboard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : searchDashboard (MPS774) -------------");
        map.put("success", true);
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);

            List<MPF190> lst = logic.loadMPS774(filter);
            map.put("total", lst.size());
            map.put("data", lst);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchExchangePending")
    public @ResponseBody
    String searchExchangePending(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : searchExchangePending (MPS776) -------------");
        map.put("success", true);
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);

            List<MPF190ExchangePending> lst = logic.loadMPS776(filter);
            map.put("total", lst.size());
            map.put("data", lst);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "runReconciliation", method = RequestMethod.POST)
    public @ResponseBody
    String runReconciliation(ModelMap map) {
        System.out.println("-------------- DirectSales : runReconciliation (MPS320) -------------");
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            Map<String, Object> result = logic.executeMPS320();
            map.put("success", result.get("success"));
            map.put("message", result.get("message"));
        } catch (Exception e) {
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "runReconciliationPhase2", method = RequestMethod.POST)
    public @ResponseBody
    String runReconciliationPhase2(ModelMap map) {
        System.out.println("-------------- DirectSales : runReconciliationPhase2 (MPS782) -------------");
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            Map<String, Object> result = logic.executeMPS782();
            map.put("success", result.get("success"));
            map.put("message", result.get("message"));
        } catch (Exception e) {
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "createDirectSales", method = RequestMethod.POST)
    public @ResponseBody
    String createDirectSales(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : createDirectSales (MPS781) -------------");
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Create bean = new Gson().fromJson(beanString, MPF190Create.class);

            String msj = logic.createMPS781(bean);
            map.put("success", !msj.startsWith("Error"));
            map.put("msg", msj);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "updateDirectSales", method = RequestMethod.POST)
    public @ResponseBody
    String updateDirectSales(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : updateDirectSales (MPS777) -------------");
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Update bean = new Gson().fromJson(beanString, MPF190Update.class);

            String msj = logic.updateMPS777(bean);
            map.put("success", !msj.startsWith("Error"));
            map.put("msg", msj);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : searchDetail (MPS775) -------------");
        map.put("success", true);
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            List<MPF190> lst = logic.loadMPS775(filter);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchTicketDetail")
    public @ResponseBody
    String searchTicketDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DirectSales : searchTicketDetail (MPS783) -------------");
        map.put("success", true);
        try {
            logic = new DirectSalesLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            MPF190Filter filter = new Gson().fromJson(beanString, MPF190Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            List<MPF300> lst = logic.loadMPS783(filter);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadVoucher", method = RequestMethod.GET)
    public void downloadVoucher(HttpServletRequest request, HttpServletResponse response) {
        String sfile = request.getParameter("sfile");
        String sagent = request.getParameter("sagent");
        String year = request.getParameter("year");
        // Se usa SDATE (Sales Date), no ADATE (Abono Date): el nombre real del
        // archivo en la carpeta se arma con la fecha de venta, y ADATE puede
        // venir mal cargada en el registro (desfasada varios años del archivo real).
        String sdate = request.getParameter("sdate");
        String disposition = request.getParameter("disposition");

        System.out.println("-------------- DirectSales : downloadVoucher -------------");
        System.out.println("downloadVoucher -> sfile=[" + sfile + "] sagent=[" + sagent + "] year=[" + year + "] sdate=[" + sdate + "] disposition=[" + disposition + "]");

        // Por defecto 'inline' para que se previsualice en el iframe y no se descargue directamente
        if (disposition == null || disposition.trim().isEmpty()) {
            disposition = "inline";
        }

        if (sfile == null || sfile.trim().isEmpty()
                || sagent == null || sagent.trim().isEmpty()
                || year == null || year.trim().isEmpty()) {
            System.out.println("downloadVoucher -> 400 BAD_REQUEST: falta sfile, sagent o year.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // Evitar path traversal (no debe contener separadores de ruta ni "..")
        if (sfile.contains("..") || sfile.contains("/") || sfile.contains("\\")
                || sagent.contains("..") || sagent.contains("/") || sagent.contains("\\")
                || year.contains("..") || year.contains("/") || year.contains("\\")
                || (sdate != null && (sdate.contains("..") || sdate.contains("/") || sdate.contains("\\")))) {
            System.out.println("downloadVoucher -> 400 BAD_REQUEST: parámetro con '..' o separador de ruta.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // Lógica dinámica de entorno (Test, Dev, Prod)
        String ruta = this.serverSession.propertySession.get("DB_SERVER_DEFAULT_TYPE").toString();
        String rutaCarpeta;
        if ("ATT".equals(ruta)) {
            rutaCarpeta = "test";
        } else if ("DEV".equals(ruta)) {
            rutaCarpeta = "dev";
        } else if ("PRO".equals(ruta)) {
            rutaCarpeta = "prod";
        } else {
            rutaCarpeta = "";
        }

        String carpetaBase = "\\\\10.0.0.87\\av\\Efectivo\\" + rutaCarpeta + "\\process\\VentaDirecta\\" + sagent + "\\" + year + "\\archivo\\";
        System.out.println("downloadVoucher -> DB_SERVER_DEFAULT_TYPE=[" + ruta + "] carpetaBase=[" + carpetaBase + "]");

        // Debug visible desde el navegador (Network -> Headers), para no depender de
        // la consola del servidor cuando no se tiene acceso a ella. Se manda siempre,
        // no solo en el 404, así también se ve en los casos que sí funcionan.
        response.setHeader("X-Debug-Ambiente", ruta == null ? "" : ruta);
        response.setHeader("X-Debug-CarpetaBase", carpetaBase);

        String nombreBase = sfile;
        int idxPunto = sfile.lastIndexOf('.');
        if (idxPunto > 0) {
            nombreBase = sfile.substring(0, idxPunto);
        }

        String[] candidatos = {
            nombreBase + ".pdf",
            nombreBase + ".png",
            nombreBase + ".jpg",
            nombreBase + ".jpeg",
            nombreBase + ".jfif",
            sfile
        };

        File archivoEncontrado = null;
        String nombreDescarga = sfile;
        StringBuilder debugCandidatos = new StringBuilder();

        for (String candidato : candidatos) {
            File f = new File(carpetaBase + candidato);
            boolean existe = f.exists() && f.isFile();
            System.out.println("downloadVoucher -> probando candidato [" + candidato + "] -> " + (existe ? "ENCONTRADO" : "no existe"));
            debugCandidatos.append(candidato).append("=").append(existe ? "SI" : "NO").append(" | ");
            if (existe) {
                archivoEncontrado = f;
                nombreDescarga = candidato;
                break;
            }
        }
        response.setHeader("X-Debug-Candidatos", debugCandidatos.toString());

        // Segunda búsqueda de respaldo: el nombre real en disco puede no calzar por
        // problemas de codificación de caracteres (tildes/ñ) al guardarse SFILE en la
        // base de datos (el proceso externo que llena MPF190 guarda el valor corrupto,
        // pero el archivo físico sí tiene el nombre correcto). El nombre de archivo
        // siempre inicia con "<sagent>_<sdate>_...", así que si nada calzó por nombre
        // exacto, buscamos el primer archivo de la carpeta que empiece con ese prefijo.
        if (archivoEncontrado == null && sdate != null && !sdate.trim().isEmpty()) {
            String prefijo = sagent + "_" + sdate;
            System.out.println("downloadVoucher -> ningún candidato exacto encontrado, probando fallback por prefijo [" + prefijo + "]");
            File carpeta = new File(carpetaBase);
            File[] archivosCarpeta = carpeta.listFiles();
            System.out.println("downloadVoucher -> carpeta.exists()=" + carpeta.exists() + " listFiles()=" + (archivosCarpeta == null ? "null (no se pudo listar, ¿existe/permiso la carpeta?)" : archivosCarpeta.length + " archivos"));
            response.setHeader("X-Debug-PrefijoFallback", prefijo);
            response.setHeader("X-Debug-CarpetaExists", String.valueOf(carpeta.exists()));
            response.setHeader("X-Debug-ListFiles", archivosCarpeta == null ? "null-sin-acceso" : String.valueOf(archivosCarpeta.length));
            if (archivosCarpeta != null) {
                File candidatoPdf = null;
                File cualquiera = null;
                for (File f : archivosCarpeta) {
                    if (f.isFile() && f.getName().startsWith(prefijo)) {
                        System.out.println("downloadVoucher -> match por prefijo: " + f.getName());
                        if (cualquiera == null) {
                            cualquiera = f;
                        }
                        if (candidatoPdf == null && f.getName().toLowerCase().endsWith(".pdf")) {
                            candidatoPdf = f;
                        }
                    }
                }
                archivoEncontrado = candidatoPdf != null ? candidatoPdf : cualquiera;
                if (archivoEncontrado != null) {
                    nombreDescarga = archivoEncontrado.getName();
                    logError.warn("downloadVoucher: SFILE no calzó por nombre exacto, se usó por prefijo '" + prefijo + "' -> " + archivoEncontrado.getName());
                } else {
                    System.out.println("downloadVoucher -> ningún archivo en la carpeta empieza con el prefijo [" + prefijo + "]");
                }
            }
        }

        if (archivoEncontrado == null) {
            System.out.println("downloadVoucher -> 404 NOT_FOUND: no se encontró el archivo en " + carpetaBase);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            logError.warn("downloadVoucher: archivo no encontrado (ni por nombre ni por prefijo agente+fecha) -> " + carpetaBase + sfile);
            return;
        }

        System.out.println("downloadVoucher -> archivo servido: " + archivoEncontrado.getAbsolutePath());

        // Content-Type según la extensión REAL del archivo que se encontró (no una
        // posición fija), para que las imágenes sueltas también se previsualicen inline.
        String extEncontrada = "";
        int idxExtEncontrada = nombreDescarga.lastIndexOf('.');
        if (idxExtEncontrada > 0) {
            extEncontrada = nombreDescarga.substring(idxExtEncontrada + 1).toLowerCase();
        }

        String contentType;
        switch (extEncontrada) {
            case "pdf":
                contentType = "application/pdf";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "jpg":
            case "jpeg":
            case "jfif":
                contentType = "image/jpeg";
                break;
            default:
                // Formato no previsualizable (ej. .pptx/.docx sin PDF de respaldo): se descarga
                contentType = "application/octet-stream";
                break;
        }

        System.out.println("downloadVoucher -> nombreDescarga=[" + nombreDescarga + "] extension=[" + extEncontrada + "] contentType=[" + contentType + "] disposition=[" + disposition + "] tamaño=" + archivoEncontrado.length() + " bytes");

        response.setContentType(contentType);
        response.setHeader("Content-Disposition", disposition + "; filename=\"" + nombreDescarga + "\"");
        response.setContentLength((int) archivoEncontrado.length());

        try (FileInputStream fis = new FileInputStream(archivoEncontrado); OutputStream os = response.getOutputStream()) {
            byte[] buf = new byte[8192];
            int n;
            while ((n = fis.read(buf)) != -1) {
                os.write(buf, 0, n);
            }
            System.out.println("downloadVoucher -> envío completado OK.");
        } catch (IOException e) {
            System.out.println("downloadVoucher -> ERROR al enviar el archivo: " + e.getMessage());
            logError.error("downloadVoucher -> " + e.getMessage(), e);
        }
    }

}
