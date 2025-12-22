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
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BSPFileDownloadLogic;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
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
@RequestMapping("/BSPFileDownload")
public class BSPFileDownloadController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BSPFileDownloadLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/BSPFileDownload/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BSPFileDownload : Search-------------");
        map.put("success", true);
        List<MPF218> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF218> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF218> lst = new ArrayList<>(0);
        MPF218Filter filter = new MPF218Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BSPFileDownloadLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF218Filter.class);
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

            lst = logic.loadMPS415(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchARC")
    public @ResponseBody
    String searchARC(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BSPFileDownload : Search ARC-------------");
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
            logic = new BSPFileDownloadLogic();
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

    @RequestMapping(value = "getXLSXARC")
    public @ResponseBody
    void getXLSXARC(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "ARC File Downloads - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF221> listaData = this.getListARC(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Report");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Report ID", "User ID (N/A)", "REF NBR (B*MM*W*C)",
                "PED (yy/mm/dd)", "Date", "File Name", "Time", "Dist. Name", "Group ID (N/A)",
                "Lines","Pages"
            };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5500);
            }

            int rowIdx = 1;
            for (MPF221 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.REPORTID);
                row.createCell(2).setCellValue(item.USERID);
                row.createCell(3).setCellValue(item.REFNBR);
                row.createCell(4).setCellValue(item.PEDARC);
                row.createCell(5).setCellValue(item.DATEARC);
                row.createCell(6).setCellValue(item.NAMEFILE);
                row.createCell(7).setCellValue(item.TIMEARC);
                row.createCell(8).setCellValue(item.DISTNAME);
                row.createCell(9).setCellValue(item.GROUPID);
                row.createCell(10).setCellValue(item.LINESARC);
                row.createCell(11).setCellValue(item.PAGESARC);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        String fileNameDownload = "Cash File Downloads - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF218> listaData = this.getList(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Report");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Customer", "Country", "Settlement Date",
                "File Name", "File Type", "Upload Date", "Size"
            };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5500);
            }

            int rowIdx = 1;
            for (MPF218 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.CUSTOMER);
                row.createCell(2).setCellValue(item.COUNTRY);
                row.createCell(3).setCellValue(item.DATESETT);
                row.createCell(4).setCellValue(item.NAMEFILE);
                row.createCell(5).setCellValue(item.TYPEFILE);
                row.createCell(6).setCellValue(item.DATEUPLO);
                row.createCell(7).setCellValue(item.SIZEFILE);
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
        String filename = request.getParameter("filename"); // ej: ARC_XXXX.txt

        System.out.println("Parámetros → year=" + year + ", filename=" + filename);

        if (year == null || filename == null
                || year.isEmpty() || filename.isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(
                    "Parámetros obligatorios: year y filename"
            );
            return;
        }

        String folderStr
                = rutaBase
                + "\\workspace\\HISTORY-ARC\\US\\"
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

    @RequestMapping(value = "getBulkCSV", method = RequestMethod.POST)
    public void getBulkCSV(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("Report : getBulkCSV");

        String beanString = request.getParameter("beanString");
        if (beanString == null || beanString.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("beanString es obligatorio");
            return;
        }

        Gson gson = new Gson();
        MPF218Filter filter = gson.fromJson(beanString, MPF218Filter.class);

        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        BSPFileDownloadLogic logic = new BSPFileDownloadLogic();
        logic.setSession(this.serverSession.getServerSession());
        List<MPF218> list = logic.loadMPS415(filter);

        System.out.println("Registros encontrados: " + list.size());

        if (list.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No hay archivos para descargar");
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

        File tempZip = File.createTempFile("Cash_Files_", ".zip");
        int addedFiles = 0;

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempZip))) {

            for (MPF218 item : list) {

                try {
                    String year = item.DATESETT.substring(0, 4);

                    String folderStr
                            = rutaBase
                            + "\\workspace\\HISTORY\\"
                            + item.COUNTRY + "\\"
                            + year;

                    Path filePath = Paths.get(folderStr).resolve(item.NAMEFILE);

                    if (!Files.exists(filePath)) {
                        System.err.println("Archivo NO encontrado: " + filePath);
                        continue;
                    }

                    zos.putNextEntry(new ZipEntry(item.NAMEFILE));
                    Files.copy(filePath, zos);
                    zos.closeEntry();
                    addedFiles++;

                } catch (Exception eFile) {
                    System.err.println("Error agregando archivo al ZIP: "
                            + item.NAMEFILE + " → " + eFile.getMessage());
                }
            }
        }

        System.out.println("Archivos incluidos en el ZIP: " + addedFiles + " de " + list.size());

        if (addedFiles == 0) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No se encontraron archivos físicos para descargar");
            tempZip.delete();
            return;
        }

        response.setContentType("application/zip");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"Cash_Files_BSP.zip\""
        );

        Files.copy(tempZip.toPath(), response.getOutputStream());
        response.flushBuffer();
        tempZip.delete();
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

        BSPFileDownloadLogic logic = new BSPFileDownloadLogic();
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

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempZip))) {

            for (MPF221 item : list) {

                try {
                    // PEDARC = YY/MM/DD → YEAR = 20YY
                    String pedarc = item.PEDARC;
                    if (pedarc == null || pedarc.length() < 2) {
                        System.err.println("PEDARC inválido para: " + item.NAMEFILE);
                        continue;
                    }

                    String year = "20" + pedarc.substring(0, 2);

                    String folderStr
                            = rutaBase
                            + "\\workspace\\HISTORY-ARC\\US\\"
                            + year;

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

}
