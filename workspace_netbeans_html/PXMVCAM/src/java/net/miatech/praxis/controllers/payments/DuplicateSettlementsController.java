package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.DuplicateSettlementsLogic;
import net.miatech.praxis.payment.A2358;
import net.miatech.praxis.payment.A2359;
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF060;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
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
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@Scope("request")
@RequestMapping("/DuplicateSettlements")
public class DuplicateSettlementsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DuplicateSettlementsLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DuplicateSettlements/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DuplicateSettlements : Search-------------");
        map.put("success", true);
        List<MPF060> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF060> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF060> lst = new ArrayList<>(0);
        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DuplicateSettlementsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);

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

            lst = logic.loadMPS370(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "sendDeleteSettlements")
    public @ResponseBody
    String sendDeleteSettlements(HttpServletRequest request) throws Exception {
        System.out.println("Duplicate Settlements : sendDeleteSettlements");

        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        HashMap m = new HashMap();
        String beanString = "";
        String listSettlements = "";
        String message = "";
        List<MPF060> lstData = new ArrayList<>();
        Type listType = new TypeToken<List<MPF060>>() {
        }.getType();

        try {
            logic = new DuplicateSettlementsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);
            listSettlements = request.getParameter("beanSettlements");
            List<MPF060> settlementsList = gson.fromJson(listSettlements, listType);

            MPF060 obj = new MPF060();

            for (MPF060 settlements : settlementsList) {
                obj = new MPF060();
                obj.CCUST = settlements.CCUST;
                obj.SDATE = settlements.SDATE.trim();
                obj.SCOUNTRY = settlements.SCOUNTRY.trim();
                obj.TDOC = settlements.TDOC.trim();
                obj.CODEBANK = settlements.CODEBANK.trim();
                obj.SCARCOD = settlements.SCARCOD.trim();
                obj.SCARDN = settlements.SCARDN.trim();
                obj.SAUTHOC = settlements.SAUTHOC.trim();
                obj.SEQ = settlements.SEQ.trim();
                obj.SVFOP = settlements.SVFOP;
                lstData.add(obj);
            }

            message = logic.loadMPS371_MPS372(lstData, filter);

        } catch (Exception e) {
            e.printStackTrace();
            message = e.getMessage();
            e.printStackTrace();
            m.put("success", false);
            m.put("result", message);
        }

        if (message != null) {
            m.put("success", true);
            m.put("result", message);
        } else {
            m.put("success", false);
            m.put("result", message);
        }

        return gson.toJson(m);

    }

    @RequestMapping(value = "searchDelete")
    public @ResponseBody
    String searchDelete(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DuplicateSettlements : searchDelete-------------");
        map.put("success", true);
        List<MPF060> lst = this.getListDelete(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF060> getListDelete(HttpServletRequest request, Boolean bExcel) {

        List<MPF060> lst = new ArrayList<>(0);
        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DuplicateSettlementsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);

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

            lst = logic.loadMPS439(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDeleteDetail")
    public @ResponseBody
    String searchDeleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DuplicateSettlements : searchDeleteDetail-------------");
        map.put("success", true);
        List<MPF060> lst = this.getListDeleteDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF060> getListDeleteDetail(HttpServletRequest request, Boolean bExcel) {

        List<MPF060> lst = new ArrayList<>(0);
        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DuplicateSettlementsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);

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

            lst = logic.loadMPS373(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "sendDeleteSettlementsReverse")
    public @ResponseBody
    String sendDeleteSettlementsReverse(HttpServletRequest request) throws Exception {
        System.out.println("Duplicate Settlements : sendDeleteSettlementsReverse");

        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        HashMap m = new HashMap();
        String beanString = "";
        String listSettlements = "";
        Type listType = new TypeToken<List<MPF060>>() {
        }.getType();
        String message = "";

        try {
            logic = new DuplicateSettlementsLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);
            listSettlements = request.getParameter("beanSettlements");
            List<MPF060> settlementsList = gson.fromJson(listSettlements, listType);

            List<MPF060> lstData = new ArrayList<>();
            MPF060 obj = new MPF060();

            for (MPF060 settlements : settlementsList) {
                obj = new MPF060();
                obj.CCUST = settlements.CCUST;
                obj.SDATE = settlements.SDATE.trim();
                obj.SCOUNTRY = settlements.SCOUNTRY.trim();
                obj.TDOC = settlements.TDOC.trim();
                obj.CODEBANK = settlements.CODEBANK.trim();
                obj.SCARCOD = settlements.SCARCOD.trim();
                obj.SCARDN = settlements.SCARDN.trim();
                obj.SAUTHOC = settlements.SAUTHOC.trim();
                obj.SEQ = settlements.SEQ.trim();
                obj.SVFOP = settlements.SVFOP;
                obj.USUP = settlements.USUP;
                obj.FEUP = settlements.FEUP;
                obj.HOUP = settlements.HOUP;
                obj.PGMUP = settlements.PGMUP;
                lstData.add(obj);
            }

            System.out.println(lstData);
            message = logic.loadMPS374_MPS375(lstData, filter);

        } catch (Exception e) {
            e.printStackTrace();
            message = e.getMessage();
            e.printStackTrace();
            m.put("success", false);
            m.put("result", message);
        }

        if (message != null) {
            m.put("success", true);
            m.put("result", message);
        } else {
            m.put("success", false);
            m.put("result", message);
        }

        return gson.toJson(m);

    }

    @RequestMapping(value = "getXLSXDuplicates")
    public void getXLSXDuplicates(HttpServletRequest request, HttpServletResponse response) {

        String fileName = "Duplicate_Report_" + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF060> listaData = this.getList(request, true);

            // ===== WORKBOOK STREAMING (MUCHO MÁS RÁPIDO) =====
            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Duplicate Report");

            // ===== ESTILO SIMPLE DE CABECERA =====
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);

            // ===== CABECERAS =====
            String[] headers = {
                "Customer", "Status", "Sale Date", "Country", "Document",
                "Code Bank", "CC Type", "Card Number",
                "Authorization", "Secuence", "Amount"
            };

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 20 * 256); // ancho fijo (rápido)
            }

            // ===== DATA =====
            int rowIdx = 1;
            for (MPF060 r : listaData) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(r.CCUST);
                row.createCell(1).setCellValue(r.STVAL);
                row.createCell(2).setCellValue(r.SDATE);
                row.createCell(3).setCellValue(r.SCOUNTRY);
                row.createCell(4).setCellValue(r.TDOC);
                row.createCell(5).setCellValue(r.CODEBANK);
                row.createCell(6).setCellValue(r.SCARCOD);
                row.createCell(7).setCellValue(r.SCARDN);
                row.createCell(8).setCellValue(r.SAUTHOC);
                row.createCell(9).setCellValue(r.SEQ);
                row.createCell(10).setCellValue(r.SVFOP);
            }

            // ===== RESPONSE =====
            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileName + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose(); // limpia archivos temporales

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXRemovedGroup")
    public void getXLSXRemovedGroup(HttpServletRequest request, HttpServletResponse response) {

        String fileName = "Removed_Group_Report_" + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF060> listaData = this.getListDelete(request, true);

            // ===== WORKBOOK STREAMING (MUCHO MÁS RÁPIDO) =====
            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Duplicate Report");

            // ===== ESTILO SIMPLE DE CABECERA =====
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);

            // ===== CABECERAS =====
            String[] headers = {
                "Customer", "Document", "Country", "Sale Date", "Code Bank",
                "User Creation", "User Date", "User Hour",
                "Quantity"
            };

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 20 * 256); // ancho fijo (rápido)
            }

            // ===== DATA =====
            int rowIdx = 1;
            for (MPF060 r : listaData) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(r.CCUST);
                row.createCell(1).setCellValue(r.TDOC);
                row.createCell(2).setCellValue(r.SCOUNTRY);
                row.createCell(3).setCellValue(r.SDATE);
                row.createCell(4).setCellValue(r.CODEBANK);
                row.createCell(5).setCellValue(r.USUP);
                row.createCell(6).setCellValue(r.FEUP);
                row.createCell(7).setCellValue(r.HOUP);
                row.createCell(8).setCellValue(r.QTY);
            }

            // ===== RESPONSE =====
            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileName + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose(); // limpia archivos temporales

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDuplicatesRemoved")
    public void getXLSXDuplicatesRemoved(HttpServletRequest request, HttpServletResponse response) {

        String fileName = "Duplicate_Removed_Report_" + Functions.getFechaActual() + ".xlsx";

        try {
            List<MPF060> listaData = this.getListDeleteDetail(request, true);

            // ===== WORKBOOK STREAMING (MUCHO MÁS RÁPIDO) =====
            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Duplicate Report");

            // ===== ESTILO SIMPLE DE CABECERA =====
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);

            // ===== CABECERAS =====
            String[] headers = {
                "Customer", "Status", "Sale Date", "Country", "Document",
                "Code Bank", "CC Type", "Card Number",
                "Authorization", "Secuence", "Amount"
            };

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 20 * 256); // ancho fijo (rápido)
            }

            // ===== DATA =====
            int rowIdx = 1;
            for (MPF060 r : listaData) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(r.CCUST);
                row.createCell(1).setCellValue(r.STVAL);
                row.createCell(2).setCellValue(r.SDATE);
                row.createCell(3).setCellValue(r.SCOUNTRY);
                row.createCell(4).setCellValue(r.TDOC);
                row.createCell(5).setCellValue(r.CODEBANK);
                row.createCell(6).setCellValue(r.SCARCOD);
                row.createCell(7).setCellValue(r.SCARDN);
                row.createCell(8).setCellValue(r.SAUTHOC);
                row.createCell(9).setCellValue(r.SEQ);
                row.createCell(10).setCellValue(r.SVFOP);
            }

            // ===== RESPONSE =====
            response.setContentType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"" + fileName + "\""
            );

            workbook.write(response.getOutputStream());
            workbook.dispose(); // limpia archivos temporales

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "addFileJustification", method = RequestMethod.POST)
    public void addFileJustification(
            @RequestParam("file") MultipartFile file,
            @RequestParam("USUP") String usup,
            @RequestParam("FEUP") String feup,
            @RequestParam("HOUP") String houp,
            HttpServletResponse response) throws Exception {

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString(); // TEST / PROD

        if ("PRO".equals(environment)) {
            environment = "PROD";
        }

        String rutaBaseKey = "RUTA_LIQUIDATION_" + environment + "_JUSTIFICATION";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        if (file == null || file.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "File is required");
            return;
        }

        String folderName = usup + "-" + feup + "-" + houp;

        Path folderPath = Paths.get(rutaBase, folderName);

        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        String originalFilename = Paths.get(file.getOriginalFilename())
                .getFileName().toString();

        Path filePath = folderPath.resolve(originalFilename);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"success\": true, \"message\": \"File uploaded successfully\"}");

    }

    @RequestMapping(value = "getImage", method = RequestMethod.GET)
    public void getImage(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString(); // TEST / PROD

        String rutaBaseKey = "RUTA_LIQUIDATION_" + environment + "_JUSTIFICATION";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        if ("PRO".equals(environment)) {
            environment = "PROD";
        }

        String folder = request.getParameter("folder");
        String filename = request.getParameter("filename");

        if (folder == null || filename == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "folder y filename son obligatorios");
            return;
        }

        Path imagePath = Paths.get(rutaBase, folder, filename);

        if (!Files.exists(imagePath)) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Imagen no encontrada");
            return;
        }

        String contentType = Files.probeContentType(imagePath);
        response.setContentType(
                contentType != null ? contentType : "image/png"
        );
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        try (OutputStream out = response.getOutputStream()) {
            Files.copy(imagePath, out);
            out.flush();
        }
    }

    @RequestMapping(
            value = "getImages",
            method = RequestMethod.GET,
            produces = "application/json"
    )
    @ResponseBody
    public List<String> getImages(
            @RequestParam("USUP") String usup,
            @RequestParam("FEUP") String feup,
            @RequestParam("HOUP") String houp
    ) throws IOException {

        String environment = this.serverSession
                .getPropertySession()
                .get("DB_SERVER_DEFAULT_TYPE")
                .toString();

        if ("PRO".equals(environment)) {
            environment = "PROD";
        }

        String rutaBaseKey = "RUTA_LIQUIDATION_" + environment + "_JUSTIFICATION";
        String rutaBase = this.serverSession
                .getPropertySession()
                .get(rutaBaseKey)
                .toString();

        Path folder = Paths.get(rutaBase, usup + "-" + feup + "-" + houp);

        if (!Files.exists(folder)) {
            return Collections.emptyList();
        }

        try (Stream<Path> files = Files.list(folder)) {
            return files
                    .filter(p -> {
                        String f = p.getFileName().toString().toLowerCase();
                        return f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg");
                    })
                    .map(p -> p.getFileName().toString())
                    .collect(Collectors.toList());
        }
    }

}
