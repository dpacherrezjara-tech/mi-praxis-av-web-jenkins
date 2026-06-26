/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.CargoGuideLogic;
import net.miatech.praxis.logic.payments.CargoSendLogic;
import net.miatech.praxis.logic.payments.CargoStatusLogic;
import net.miatech.praxis.payment.MPF287Filter;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF305;
import net.miatech.praxis.payment.MPF305Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
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
@RequestMapping("/CargoSend")
public class CargoSendController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CargoSendLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/CargoSend/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoSend : Search -------------");
        map.put("success", true);
        List<MPF305> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF305> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF305> lst = new ArrayList<>(0);
        MPF305Filter filter = new MPF305Filter();
        Gson gson = new Gson();

        try {
            logic = new CargoSendLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF305Filter.class);

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS715(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchARC")
    public @ResponseBody
    String searchARC(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoSend : Search ARC-------------");
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
            logic = new CargoSendLogic();
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
                "Lines", "Pages"
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

        String fileNameDownload = "Cargo Send - " + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF305> listaData = this.getList(request, true);

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

            CellStyle amountStyle = workbook.createCellStyle();
            amountStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            amountStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            CellStyle intStyle = workbook.createCellStyle();
            intStyle.setAlignment(CellStyle.ALIGN_RIGHT);

            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "ID Send", "Status", "File Name",
                "Quantity Registers", "Currency", "Amount",
                "Date Create", "Time", "User"
            };
            int[] widths = {2500, 3500, 3000, 15000, 5000, 4000, 5000, 4500, 3500, 4000};

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, widths[i]);
            }

            int rowIdx = 1;
            for (MPF305 item : listaData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.SREPID);
                row.createCell(2).setCellValue(item.STVAL);
                row.createCell(3).setCellValue(item.NAMEFILE);

                Cell qtyCell = row.createCell(4);
                qtyCell.setCellValue(item.QTYREGIS);
                qtyCell.setCellStyle(intStyle);

                row.createCell(5).setCellValue(item.SCURRENCY);

                Cell amtCell = row.createCell(6);
                amtCell.setCellValue(item.FAMOUNT);
                amtCell.setCellStyle(amountStyle);

                row.createCell(7).setCellValue(item.FECR);
                row.createCell(8).setCellValue(item.HOCR);
                row.createCell(9).setCellValue(item.USCR);
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

        CargoSendLogic logic = new CargoSendLogic();
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

        CargoSendLogic logic = new CargoSendLogic();
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
            CargoSendLogic logic = new CargoSendLogic();
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
        System.out.println("-------------- CargoSend : Search ICCS -------------");
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
            logic = new CargoSendLogic();
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

        CargoSendLogic logic = new CargoSendLogic();
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

    @RequestMapping(value = "downloadReportMPS717", method = RequestMethod.GET)
    public void downloadReportMPS717(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoSend : downloadReportMPS717 -------------");

        String srepid = request.getParameter("srepid");
        if (srepid == null || srepid.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String fileNameDownload = "CargoSend_Report_" + srepid.trim() + "_"
                + new java.text.SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date()) + ".xlsx";

        try {
            net.miatech.praxis.logic.payments.CargoGuideLogic guideLogic = new net.miatech.praxis.logic.payments.CargoGuideLogic();
            guideLogic.setSession(this.serverSession.getServerSession());
            java.util.List<net.miatech.praxis.payment.MPF295> lstData = guideLogic.loadMPS717(srepid.trim());

            if (lstData == null || lstData.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return;
            }

            org.apache.poi.xssf.streaming.SXSSFWorkbook workbook = new org.apache.poi.xssf.streaming.SXSSFWorkbook(100);

            org.apache.poi.ss.usermodel.Font fontTitle = workbook.createFont();
            fontTitle.setColor(org.apache.poi.ss.usermodel.IndexedColors.WHITE.getIndex());
            fontTitle.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);
            fontTitle.setFontHeightInPoints((short) 14);

            org.apache.poi.ss.usermodel.Font fontHeaderCol = workbook.createFont();
            fontHeaderCol.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);
            fontHeaderCol.setColor(org.apache.poi.ss.usermodel.IndexedColors.DARK_BLUE.getIndex());

            org.apache.poi.ss.usermodel.CellStyle styleTitle = workbook.createCellStyle();
            styleTitle.setFillForegroundColor(org.apache.poi.ss.usermodel.IndexedColors.DARK_BLUE.getIndex());
            styleTitle.setFillPattern(org.apache.poi.ss.usermodel.CellStyle.SOLID_FOREGROUND);
            styleTitle.setAlignment(org.apache.poi.ss.usermodel.CellStyle.ALIGN_CENTER);
            styleTitle.setVerticalAlignment(org.apache.poi.ss.usermodel.CellStyle.VERTICAL_CENTER);
            styleTitle.setFont(fontTitle);

            org.apache.poi.ss.usermodel.CellStyle styleColHeader = workbook.createCellStyle();
            styleColHeader.setFillForegroundColor(org.apache.poi.ss.usermodel.IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            styleColHeader.setFillPattern(org.apache.poi.ss.usermodel.CellStyle.SOLID_FOREGROUND);
            styleColHeader.setBorderBottom(org.apache.poi.ss.usermodel.CellStyle.BORDER_THIN);
            styleColHeader.setBorderTop(org.apache.poi.ss.usermodel.CellStyle.BORDER_THIN);
            styleColHeader.setBorderLeft(org.apache.poi.ss.usermodel.CellStyle.BORDER_THIN);
            styleColHeader.setBorderRight(org.apache.poi.ss.usermodel.CellStyle.BORDER_THIN);
            styleColHeader.setAlignment(org.apache.poi.ss.usermodel.CellStyle.ALIGN_CENTER);
            styleColHeader.setFont(fontHeaderCol);

            org.apache.poi.ss.usermodel.CellStyle amountStyle = workbook.createCellStyle();
            org.apache.poi.ss.usermodel.DataFormat fmt = workbook.createDataFormat();
            amountStyle.setDataFormat(fmt.getFormat("#,##0.00"));

            // Determinar si es HN o CO para la hoja
            String country = lstData.get(0).SCOUNTRY_T1;
            boolean isHN   = "HN".equalsIgnoreCase(country != null ? country.trim() : "");

            org.apache.poi.ss.usermodel.Sheet sheet = workbook.createSheet("Conciliacion " + (isHN ? "HN" : country));

            String[] columns = {
                "Sociedad", "Centro de beneficio País", "Centro de beneficio", "Cuenta",
                "Asignación", "Referencia", "Clave referencia 1", "Texto cab. documento",
                "Nº documento", "Clave referencia 3", "Clase de\ndocumento",
                "Fecha de\ndocumento", "Clave contabiliz.", "Importe moneda doc.",
                "Moneda del\ndocumento", "Importe valorado ML2", "Moneda del\ngrupo", "Texto",
                "Sociedad", "Cuenta", "Fecha DOC.", "Referencia de pago", "Nº documento",
                "Fecha Contabilización", "Importe moneda doc.", "Moneda del documento",
                "Texto", "Clave referencia 1", "Clave referencia 3", "Centro de beneficio",
                "País", "Diferencia", "Comentario", "Fecha Envío VB", "Fecha compensación"
            };

            int rowIdx = 0;

            // Titulo
            org.apache.poi.ss.usermodel.Row rowTitle = sheet.createRow(rowIdx++);
            rowTitle.setHeightInPoints(30);
            org.apache.poi.ss.usermodel.Cell cellTitle = rowTitle.createCell(0);
            cellTitle.setCellValue("FORMATO DE CONCILIACIÓN " + (country != null ? country.trim().toUpperCase() : "")
                    + " — Report ID: " + srepid.trim());
            cellTitle.setCellStyle(styleTitle);
            sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, columns.length - 1));

            // Cabeceras
            org.apache.poi.ss.usermodel.Row rowHeaders = sheet.createRow(rowIdx++);
            rowHeaders.setHeightInPoints(35);
            for (int i = 0; i < columns.length; i++) {
                org.apache.poi.ss.usermodel.Cell c = rowHeaders.createCell(i);
                c.setCellValue(columns[i]);
                c.setCellStyle(styleColHeader);
                sheet.setColumnWidth(i, 4800);
            }

            // Datos — lógica igual que exportExcel
            String ultimoBandocOrCartera = "";
            for (net.miatech.praxis.payment.MPF295 item : lstData) {
                org.apache.poi.ss.usermodel.Row row = sheet.createRow(rowIdx++);

                if (isHN) {
                    // HN: banco siempre, cartera con control de repetido
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
                    org.apache.poi.ss.usermodel.Cell cNeto = row.createCell(13);
                    cNeto.setCellValue(item.NETO_T1); cNeto.setCellStyle(amountStyle);
                    row.createCell(14).setCellValue(item.SCURRENCY_T1);
                    org.apache.poi.ss.usermodel.Cell cLoc = row.createCell(15);
                    cLoc.setCellValue(item.LOCAMOUNT2_T1); cLoc.setCellStyle(amountStyle);
                    row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                    row.createCell(17).setCellValue(item.TEXTO_T1);

                    String carteraKey = (item.NUMLEG_T2 != null ? item.NUMLEG_T2 : "") + "-"
                            + (item.BANDOCCAR_T2 != null ? item.BANDOCCAR_T2 : "");
                    boolean esNueva = !carteraKey.equals(ultimoBandocOrCartera);
                    if (esNueva) { ultimoBandocOrCartera = carteraKey; }

                    row.createCell(18).setCellValue(item.SOCIETY_T2);
                    row.createCell(19).setCellValue(item.ACCOUNT_T2);
                    row.createCell(20).setCellValue(item.FECBASE_T2);
                    row.createCell(21).setCellValue(item.NUMLEG_T2);
                    row.createCell(22).setCellValue(item.BANDOCCAR_T2);
                    row.createCell(23).setCellValue(item.FCONT_T2);
                    org.apache.poi.ss.usermodel.Cell cImp = row.createCell(24);
                    cImp.setCellValue(esNueva ? item.IMPORTLOC2_T2 : 0.0);
                    cImp.setCellStyle(amountStyle);
                    row.createCell(25).setCellValue(item.MONSUC2_T2);
                    row.createCell(26).setCellValue(item.TEXTO_T2);
                    row.createCell(27).setCellValue(item.CLAVREF1_T2);
                    row.createCell(28).setCellValue(item.CLAVREF3_T2);
                    row.createCell(29).setCellValue(item.CENBEN_T2);
                    row.createCell(30).setCellValue(item.SCOUNTRY_T2);
                    if (esNueva) {
                        org.apache.poi.ss.usermodel.Cell cDif = row.createCell(31);
                        cDif.setCellValue(item.DIFERENCIA); cDif.setCellStyle(amountStyle);
                        row.createCell(32).setCellValue(item.COMENTARIO);
                        row.createCell(33).setCellValue(item.FECHA_ENVIO_VB);
                        row.createCell(34).setCellValue(item.FECHA_COMPENSACION);
                    }
                } else {
                    // CO: banco solo en primer BANDOC del grupo
                    String bandocActual = item.BANDOC_T1 != null ? item.BANDOC_T1 : "";
                    boolean esNuevo = !bandocActual.equals(ultimoBandocOrCartera);
                    if (esNuevo) { ultimoBandocOrCartera = bandocActual; }

                    if (esNuevo) {
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
                        org.apache.poi.ss.usermodel.Cell cNeto = row.createCell(13);
                        cNeto.setCellValue(item.NETO_T1); cNeto.setCellStyle(amountStyle);
                        row.createCell(14).setCellValue(item.SCURRENCY_T1);
                        org.apache.poi.ss.usermodel.Cell cLoc = row.createCell(15);
                        cLoc.setCellValue(item.LOCAMOUNT2_T1); cLoc.setCellStyle(amountStyle);
                        row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                        row.createCell(17).setCellValue(item.TEXTO_T1);
                        org.apache.poi.ss.usermodel.Cell cDif = row.createCell(31);
                        cDif.setCellValue(item.DIFERENCIA); cDif.setCellStyle(amountStyle);
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
                    org.apache.poi.ss.usermodel.Cell cImp = row.createCell(24);
                    cImp.setCellValue(item.IMPORTLOC2_T2); cImp.setCellStyle(amountStyle);
                    row.createCell(25).setCellValue(item.MONSUC2_T2);
                    row.createCell(26).setCellValue(item.TEXTO_T2);
                    row.createCell(27).setCellValue(item.CLAVREF1_T2);
                    row.createCell(28).setCellValue(item.CLAVREF3_T2);
                    row.createCell(29).setCellValue(item.CENBEN_T2);
                    row.createCell(30).setCellValue(item.SCOUNTRY_T2);
                }
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            java.io.OutputStream out = response.getOutputStream();
            workbook.write(out);
            workbook.dispose();
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "exportExcelPSE", method = RequestMethod.GET)
    public void exportExcelPSE(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoSend : exportExcelPSE -------------");
        try {
            String beanString = request.getParameter("beanString");
            MPF287Filter filter = new Gson().fromJson(beanString, MPF287Filter.class);
            filter.IN_CCUST  = "134";
            filter.IN_SEARCH = "P";

            CargoStatusLogic statusLogic = new CargoStatusLogic();
            statusLogic.setSession(this.serverSession.getServerSession());

            long t0 = System.currentTimeMillis();
            java.util.List<java.util.Map<String, String>> listaData = statusLogic.loadMPS660(filter);
            System.out.println("-------------- exportExcelPSE : MPS660 rows=" + listaData.size()
                    + " (" + (System.currentTimeMillis() - t0) + " ms) -------------");

            if (listaData == null || listaData.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return;
            }

            String fname = "Reporte_Cruces_PSE_CO_" + Functions.getFechaActual();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            SXSSFWorkbook wb = buildCarteraWorkbook(listaData);
            wb.write(baos);
            wb.dispose();

            CargoSendLogic logic = new CargoSendLogic();
            logic.setSession(this.serverSession.getServerSession());

            java.util.Map<String, Object> mps719 = logic.executeMPS719(
                    filter.IN_FECHA_FROM.trim(), filter.IN_FECHA_TO.trim());

            boolean ok = Boolean.TRUE.equals(mps719.get("success"));
            String srepid = ok ? (String) mps719.get("OUT_SREPID") : "";
            System.out.println("-------------- exportExcelPSE : MPS719 success=" + ok
                    + " SREPID=" + srepid + " msg=" + mps719.get("OUT_MESSAGE") + " -------------");

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + ".xlsx\"");
            response.getOutputStream().write(baos.toByteArray());
            response.flushBuffer();

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "downloadReportPSE", method = RequestMethod.GET)
    public void downloadReportPSE(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoSend : downloadReportPSE -------------");
        try {
            String srepid = request.getParameter("srepid");
            if (srepid == null || srepid.trim().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            CargoSendLogic logic = new CargoSendLogic();
            logic.setSession(this.serverSession.getServerSession());

            java.util.List<java.util.Map<String, String>> listaData = logic.loadMPS750(srepid.trim());

            if (listaData == null || listaData.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return;
            }

            String fname = "Reporte_Cruces_PSE_CO_" + srepid.trim()
                    + "_" + new java.text.SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            SXSSFWorkbook wb = buildCarteraWorkbook(listaData);
            wb.write(baos);
            wb.dispose();

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + ".xlsx\"");
            response.getOutputStream().write(baos.toByteArray());
            response.flushBuffer();

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private SXSSFWorkbook buildCarteraWorkbook(java.util.List<java.util.Map<String, String>> listaData) {
        SXSSFWorkbook workbook = new SXSSFWorkbook(100);
        org.apache.poi.ss.usermodel.Sheet sheet = workbook.createSheet("Cartera");

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

        java.util.Set<Integer> numericCols = new java.util.HashSet<>(
            java.util.Arrays.asList(19, 26, 31, 33, 35, 37)
        );

        java.util.Map<String, String> hmStatus = new java.util.HashMap<>();
        hmStatus.put("1", "MATCH");
        hmStatus.put("2", "FALTA PAGO");
        hmStatus.put("3", "FALTA FACTURA");
        hmStatus.put("4", "FACTURA PENDIENTE");
        hmStatus.put("5", "PENDIENTE PAGO");
        hmStatus.put("6", "NO ESTA EN LIBERA");
        hmStatus.put("7", "FALTA PAGO/DIFERENCIA EN LIBERA");
        hmStatus.put("8", "MATCH CON OBSERVACIONES");

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
            cell.setCellStyle(styleHeader);
            sheet.setColumnWidth(i, 4000);
        }
        sheet.setColumnWidth(1,  5000);
        sheet.setColumnWidth(4,  5000);
        sheet.setColumnWidth(8,  7000);
        sheet.setColumnWidth(13, 6500);
        sheet.setColumnWidth(21, 6000);
        sheet.setColumnWidth(26, 7000);
        sheet.setColumnWidth(39, 8000);

        int rowIdx = 1;
        for (java.util.Map<String, String> item : listaData) {
            Row row = sheet.createRow(rowIdx++);
            for (int i = 0; i < keys.length; i++) {
                Cell cell = row.createCell(i);
                String val = item.getOrDefault(keys[i], "");
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

        return workbook;
    }

    @RequestMapping(value = "exportExcel", method = RequestMethod.GET)
    public void exportExcel(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- CargoSend : exportExcel (Conciliacion) -------------");

        String fileNameDownload = "RV_Conciliacion_" + new java.text.SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date()) + ".xlsx";

        try {
            String beanString = request.getParameter("beanString");
            MPF295Filter filter = new Gson().fromJson(beanString, MPF295Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START  = 0;
            filter.page.LIMIT  = 0;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            CargoGuideLogic guideLogic = new CargoGuideLogic();
            guideLogic.setSession(this.serverSession.getServerSession());
            List<MPF295> lstData = guideLogic.loadMPS603(filter);

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
            org.apache.poi.ss.usermodel.DataFormat dataFormat = workbook.createDataFormat();
            amountStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));

            String[] columns = {
                "Sociedad", "Centro de beneficio País", "Centro de beneficio", "Cuenta",
                "Asignación", "Referencia", "Clave referencia 1", "Texto cab. documento",
                "Nº documento", "Clave referencia 3", "Clase de\ndocumento",
                "Fecha de\ndocumento", "Clave contabiliz.", "Importe moneda doc.",
                "Moneda del\ndocumento", "Importe valorado ML2", "Moneda del\ngrupo", "Texto",
                "Sociedad", "Cuenta", "Fecha DOC.", "Referencia de pago", "Nº documento",
                "Fecha Contabilización", "Importe moneda doc.", "Moneda del documento",
                "Texto", "Clave referencia 1", "Clave referencia 3", "Centro de beneficio",
                "País", "Diferencia", "Comentario", "Fecha Envío VB", "Fecha compensación"
            };

            boolean isColombia = false;
            String paisDetectado = "";
            if (lstData != null && !lstData.isEmpty()) {
                String pais = lstData.get(0).SCOUNTRY_T1;
                if (pais != null && !pais.trim().isEmpty()) {
                    paisDetectado = pais.trim().toUpperCase();
                }
                isColombia = "CO".equals(paisDetectado);
            }

            if (isColombia) {
                java.util.Map<String, List<MPF295>> datosAgrupados = new java.util.LinkedHashMap<>();

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
                        datosAgrupados.put(nombreHoja, new ArrayList<MPF295>());
                    }
                    datosAgrupados.get(nombreHoja).add(item);
                }

                for (java.util.Map.Entry<String, List<MPF295>> entry : datosAgrupados.entrySet()) {
                    String nombreSheet = entry.getKey();
                    List<MPF295> listaPorHoja = entry.getValue();

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
                    String fechaGen = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(new java.util.Date());
                    String nombreOriginal = listaPorHoja.get(0).NAMEFILE != null && !listaPorHoja.get(0).NAMEFILE.trim().isEmpty()
                            ? listaPorHoja.get(0).NAMEFILE.trim() : "Sin Archivo";
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
                            Cell cNeto = row.createCell(13);
                            cNeto.setCellValue(item.NETO_T1); cNeto.setCellStyle(amountStyle);
                            row.createCell(14).setCellValue(item.SCURRENCY_T1);
                            Cell cLoc = row.createCell(15);
                            cLoc.setCellValue(item.LOCAMOUNT2_T1); cLoc.setCellStyle(amountStyle);
                            row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                            row.createCell(17).setCellValue(item.TEXTO_T1);
                            Cell cDif = row.createCell(31);
                            cDif.setCellValue(item.DIFERENCIA); cDif.setCellStyle(amountStyle);
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
                        Cell cImp2 = row.createCell(24);
                        cImp2.setCellValue(item.IMPORTLOC2_T2); cImp2.setCellStyle(amountStyle);
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

            } else {
                Sheet sheet = workbook.createSheet("Conciliacion " + paisDetectado);
                int rowIdx = 0;

                Row rowTitle = sheet.createRow(rowIdx++);
                rowTitle.setHeightInPoints(30);
                Cell cellTitle = rowTitle.createCell(0);
                cellTitle.setCellValue("FORMATO DE CONCILIACIÓN " + paisDetectado);
                cellTitle.setCellStyle(styleTitle);
                sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 34));

                Row rowSubtitle = sheet.createRow(rowIdx++);
                Cell cellSub = rowSubtitle.createCell(0);
                String fechaGen = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(new java.util.Date());
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

                String ultimaCarteraUnica = "";
                for (MPF295 item : lstData) {
                    Row row = sheet.createRow(rowIdx++);
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
                    Cell cNeto = row.createCell(13);
                    cNeto.setCellValue(item.NETO_T1); cNeto.setCellStyle(amountStyle);
                    row.createCell(14).setCellValue(item.SCURRENCY_T1);
                    Cell cLoc = row.createCell(15);
                    cLoc.setCellValue(item.LOCAMOUNT2_T1); cLoc.setCellStyle(amountStyle);
                    row.createCell(16).setCellValue(item.LOCRENCY2_T1);
                    row.createCell(17).setCellValue(item.TEXTO_T1);

                    String carteraKey = (item.NUMLEG_T2 != null ? item.NUMLEG_T2 : "") + "-"
                            + (item.BANDOCCAR_T2 != null ? item.BANDOCCAR_T2 : "");
                    boolean esNueva = !carteraKey.equals(ultimaCarteraUnica);
                    if (esNueva) { ultimaCarteraUnica = carteraKey; }

                    row.createCell(18).setCellValue(item.SOCIETY_T2);
                    row.createCell(19).setCellValue(item.ACCOUNT_T2);
                    row.createCell(20).setCellValue(item.FECBASE_T2);
                    row.createCell(21).setCellValue(item.NUMLEG_T2);
                    row.createCell(22).setCellValue(item.BANDOCCAR_T2);
                    row.createCell(23).setCellValue(item.FCONT_T2);
                    Cell cImp = row.createCell(24);
                    cImp.setCellValue(esNueva ? item.IMPORTLOC2_T2 : 0.0); cImp.setCellStyle(amountStyle);
                    row.createCell(25).setCellValue(item.MONSUC2_T2);
                    row.createCell(26).setCellValue(item.TEXTO_T2);
                    row.createCell(27).setCellValue(item.CLAVREF1_T2);
                    row.createCell(28).setCellValue(item.CLAVREF3_T2);
                    row.createCell(29).setCellValue(item.CENBEN_T2);
                    row.createCell(30).setCellValue(item.SCOUNTRY_T2);
                    if (esNueva) {
                        Cell cDif = row.createCell(31);
                        cDif.setCellValue(item.DIFERENCIA); cDif.setCellStyle(amountStyle);
                        row.createCell(32).setCellValue(item.COMENTARIO);
                        row.createCell(33).setCellValue(item.FECHA_ENVIO_VB);
                        row.createCell(34).setCellValue(item.FECHA_COMPENSACION);
                    }
                }

                if (lstData.isEmpty()) {
                    workbook.createSheet("Sin Datos");
                }
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            java.io.OutputStream out = response.getOutputStream();
            workbook.write(out);
            workbook.dispose();
            out.flush();
            out.close();

            System.out.println("-------------- exportExcel : Excel generado correctamente -------------");

            java.util.Map<String, Object> mps716Result = guideLogic.executeMPS716(
                    filter.IN_FECHA_FROM, filter.IN_FECHA_TO, filter.IN_COUNTRY);
            System.out.println("MPS716 -> Code: " + mps716Result.get("OUT_CODE")
                    + " | SREPID: " + mps716Result.get("OUT_SREPID")
                    + " | Msg: "    + mps716Result.get("OUT_MESSAGE"));

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "updateStatusMPS718", method = RequestMethod.POST)
    public @ResponseBody
    String updateStatusMPS718(HttpServletRequest request) {
        System.out.println("-------------- CargoSend : updateStatusMPS718 -------------");
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        Gson gson = new Gson();

        try {
            String beanString = request.getParameter("beanString");
            net.miatech.praxis.payment.MPF305Filter filter = gson.fromJson(beanString, net.miatech.praxis.payment.MPF305Filter.class);

            CargoSendLogic logic = new CargoSendLogic();
            logic.setSession(this.serverSession.getServerSession());

            java.util.Map<String, Object> result = logic.executeMPS718(
                filter.IN_SREPID.trim(), filter.IN_STVAL.trim()
            );

            map.put("success", result.get("success"));
            map.put("Mensaje", result.get("Mensaje"));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", "Server error: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }
}
