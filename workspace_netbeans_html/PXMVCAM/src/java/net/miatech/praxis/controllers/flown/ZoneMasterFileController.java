/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A1708;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
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
@RequestMapping("/ZoneMasterFile")
public class ZoneMasterFileController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ZoneMasterFileLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/ZoneMasterFile/form_index";
    }

    @RequestMapping(value = "getCities")
    public @ResponseBody
    String getCities(ModelMap map, HttpServletRequest request) {
        System.out.println("-----> Ingreso a obtener Ciudades");
        map.put("success", false);
        List<A1007> lst = null;
        try {
            logic = new ZoneMasterFileLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.getCities();

            map.put("success", true);
            map.put("data", lst);

        } catch (Exception ex) {
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-----> Ingreso a SEARCH");

        map.put("success", true);
        List<A1708> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1708> getList(HttpServletRequest request, Boolean bExcel) {
        System.out.println("Ingreso a getList");
        logic = new ZoneMasterFileLogic();

        HashMap mapProperties;
        List<HashMap<String, String>> lstData = new ArrayList<HashMap<String, String>>();

        List<A1708> lst = new ArrayList<A1708>(0);
        A1708 filter = new A1708();

        filter.TREG = "";
        filter.ciudaOri = "";
        filter.ciudaDes = "";

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
            filter.TREG = request.getParameter("searchType");

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

            if ("1".equals(filter.TREG)) {
                String atos = "";
                if (request.getParameter("origin") == null || "".equals(request.getParameter("origin")) || request.getParameter("origin").equals("null")) {
                    atos = "";
                } else {
                    atos = request.getParameter("origin");
                }
                filter.ATOS = atos;
                filter.ciudaOri = "";
                filter.ciudaDes = "";
                filter.strValor = request.getParameter("strValor");

                lst = logic.loadFlownZone(filter, this.serverSession.getServerSession().getUserView());
            } else if ("2".equals(filter.TREG)) {
                filter.ATOS = "";
                filter.ciudaOri = request.getParameter("origin");
                filter.ciudaDes = request.getParameter("destination");
                lst = logic.loadFlownZone2(filter, this.serverSession.getServerSession().getUserView());
            } else {
                filter.ZONA = request.getParameter("ZONA");
                lst = logic.loadFlownZone3(filter, this.serverSession.getServerSession().getUserView());
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {

        logic = new ZoneMasterFileLogic();
        logic.setSession(this.serverSession.getServerSession());
        String sql_code = "";
        A1708 filter = new A1708();
        try {

            String strOption = request.getParameter("strOption").toString().trim();
            filter.CCUST = request.getParameter("CCUST").toString().trim();
            filter.TREG = request.getParameter("TREG").toString().trim();
            filter.ZONA = request.getParameter("ZONA").toString().trim();
            filter.ATOS = request.getParameter("ATOS").toString().trim();
            filter.USCR = request.getParameter("USCR").toString().trim();
            filter.FECR = request.getParameter("FECR").toString().trim();
            filter.HOCR = request.getParameter("HOCR").toString().trim();
            filter.USUP = request.getParameter("USUP").toString().trim();
            filter.FEUP = request.getParameter("FEUP").toString().trim();
            filter.HOUP = request.getParameter("HOUP").toString().trim();

            System.out.println("---------------------------------------");
            System.out.println("Option : " + strOption);
            System.out.println("CCUST : " + filter.CCUST);
            System.out.println("TREG : " + filter.TREG);
            System.out.println("ATOS : " + filter.ATOS);
            System.out.println("ZONA : " + filter.ZONA);
            System.out.println("---------------------------------------");

            int res = logic.maintanceFlownZone(filter, strOption);
            System.out.println("Resultado SQL : " + res);
            sql_code = String.valueOf(res);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        Map m = new LinkedHashMap();
        m.put("success", true);
        m.put("sql_code", sql_code);
        return new Gson().toJson(m);

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("FlowMasterFileController : getXLSX");

        String origin = "";
        String destination = "";

        if (request.getParameter("origin") == null || "".equals(request.getParameter("origin"))) {
            origin = "";
        }
        if (request.getParameter("destination") == null || "".equals(request.getParameter("destination"))) {
            destination = "";
        }

        String fecha = Functions.getFechaActual();
        String fileNameDownload = String.format("Zone Master File - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1708> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ZoneMasterFile");
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
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
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

            switch (request.getParameter("searchType")) {
                case "1":

                    // ====== CREANDO TITULOS ======================================
                    Row row = sheet.createRow(vj);
                    Cell CH1_00 = row.createCell(0);
                    CH1_00.setCellValue("Nbr");
                    Cell CH1_01 = row.createCell(1);
                    CH1_01.setCellValue("Treg");
                    Cell CH1_02 = row.createCell(2);
                    CH1_02.setCellValue("Airport");
                    Cell CH1_04 = row.createCell(4);
                    CH1_04.setCellValue("Zone");

                    //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));//Nbr
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));//Treg
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));//Airport
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));//Zone            

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);

                    //*******************
                    ++vj;
                    Row row2 = sheet.createRow(vj);

                    Cell CH2_00 = row2.createCell(0);
                    Cell CH2_01 = row2.createCell(1);
                    Cell CH2_02 = row2.createCell(2);
                    CH2_02.setCellValue("Code");
                    Cell CH2_03 = row2.createCell(3);
                    CH2_03.setCellValue("AirportName");
                    Cell CH2_04 = row2.createCell(4);
                    CH2_04.setCellValue("Code");
                    Cell CH2_05 = row2.createCell(5);
                    CH2_05.setCellValue("Zone Name");

                    CH2_00.setCellStyle(headerStyle);
                    CH2_01.setCellStyle(headerStyle);
                    CH2_02.setCellStyle(headerStyle);
                    CH2_03.setCellStyle(headerStyle);
                    CH2_04.setCellStyle(headerStyle);
                    CH2_05.setCellStyle(headerStyle);

                    // =============================================================
                    ++vj;
                    while (iter.hasNext()) {

                        row = sheet.createRow(vj);
                        Cell rcell0 = row.createCell(0);
                        Cell rcell1 = row.createCell(1);
                        Cell rcell2 = row.createCell(2);
                        Cell rcell3 = row.createCell(3);
                        Cell rcell4 = row.createCell(4);
                        Cell rcell5 = row.createCell(5);

                        rcell0.setCellValue(listaData.get(vi).pos);
                        rcell1.setCellValue(listaData.get(vi).TREG);
                        rcell2.setCellValue(listaData.get(vi).ATOS);
                        rcell3.setCellValue(listaData.get(vi).strAeropuerto);
                        rcell4.setCellValue(listaData.get(vi).ZONA);
                        rcell5.setCellValue(listaData.get(vi).strZONA);

                        rcell0.setCellStyle(bodyStyle);
                        rcell1.setCellStyle(bodyStyle);
                        rcell2.setCellStyle(bodyStyle);
                        rcell3.setCellStyle(bodyStyle);
                        rcell4.setCellStyle(bodyStyle);
                        rcell5.setCellStyle(bodyStyle);

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

                    break;

                case "2":

                    // ====== CREANDO TITULOS ======================================
                    Row rowZ = sheet.createRow(vj);

                    Cell CHZ1_00 = rowZ.createCell(0);
                    CHZ1_00.setCellValue("Origin City");
                    Cell CHZ1_04 = rowZ.createCell(4);
                    CHZ1_04.setCellValue("Destination City");
                    Cell CHZ1_08 = rowZ.createCell(8);
                    CHZ1_08.setCellValue("Result Zone");
                    Cell CHZ1_09 = rowZ.createCell(9);
                    CHZ1_09.setCellValue("Zone");

                    //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));//Origin
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 7));//Destination          
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));//Result Zone
                    sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));//Zone            

                    CHZ1_00.setCellStyle(headerStyle);
                    CHZ1_04.setCellStyle(headerStyle);
                    CHZ1_08.setCellStyle(headerStyle);
                    CHZ1_09.setCellStyle(headerStyle);

                    //*******************
                    ++vj;
                    Row rowZ2 = sheet.createRow(vj);

                    Cell CHZ2_00 = rowZ2.createCell(0);
                    CHZ2_00.setCellValue("Code");
                    Cell CHZ2_01 = rowZ2.createCell(1);
                    CHZ2_01.setCellValue("City Name");
                    Cell CHZ2_02 = rowZ2.createCell(2);
                    CHZ2_02.setCellValue("Zone");
                    Cell CHZ2_03 = rowZ2.createCell(3);
                    CHZ2_03.setCellValue("Zone Name");

                    Cell CHZ2_04 = rowZ2.createCell(4);
                    CHZ2_04.setCellValue("Code");
                    Cell CHZ2_05 = rowZ2.createCell(5);
                    CHZ2_05.setCellValue("City Name");
                    Cell CHZ2_06 = rowZ2.createCell(6);
                    CHZ2_06.setCellValue("Zone");
                    Cell CHZ2_07 = rowZ2.createCell(7);
                    CHZ2_07.setCellValue("Zone Name");

                    CHZ2_00.setCellStyle(headerStyle);
                    CHZ2_01.setCellStyle(headerStyle);
                    CHZ2_02.setCellStyle(headerStyle);
                    CHZ2_03.setCellStyle(headerStyle);
                    CHZ2_04.setCellStyle(headerStyle);
                    CHZ2_05.setCellStyle(headerStyle);
                    CHZ2_06.setCellStyle(headerStyle);
                    CHZ2_07.setCellStyle(headerStyle);

                    // =============================================================
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

                        rcell0.setCellValue(listaData.get(vi).ciudaOri);
                        rcell1.setCellValue(listaData.get(vi).strCiudadOri);
                        rcell2.setCellValue(listaData.get(vi).zonaCiudadOri);
                        rcell3.setCellValue(listaData.get(vi).strzonaCiudadOri);
                        rcell4.setCellValue(listaData.get(vi).ciudaDes);
                        rcell5.setCellValue(listaData.get(vi).strCiudaDes);
                        rcell6.setCellValue(listaData.get(vi).zonaCiudaDes);
                        rcell7.setCellValue(listaData.get(vi).strzonaCiudaDes);
                        rcell8.setCellValue(listaData.get(vi).zonaRe);
                        rcell9.setCellValue(listaData.get(vi).strzonaRe);

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
                    break;

            }

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

    @RequestMapping(value = "getXLSX2")
    public @ResponseBody
    void getXLSX2(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("ZoneMasterFile : getXLSX2");
        String fileNameDownload = String.format("ZoneMasterFile  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1708> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("ORIGIN");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("DESTINATION");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("ZONE RESULT");
            CH1_9.setCellValue("");

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

            // CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
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

            CH2_0.setCellValue("City");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("Zone");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("City");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("Zone");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Pair Zone");
            CH2_9.setCellValue("Zona");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            ++vj;
             //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);

            CH3_0.setCellValue("Code");
            CH3_1.setCellValue("Name");
            CH3_2.setCellValue("Code");
            CH3_3.setCellValue("Name");
            CH3_4.setCellValue("Code");
            CH3_5.setCellValue("Name");
            CH3_6.setCellValue("Code");
            CH3_7.setCellValue("Name");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).ciudaOri);
                rcell1.setCellValue(listaData.get(vi).strCiudadOri);
                rcell2.setCellValue(listaData.get(vi).zonaCiudadOri);
                rcell3.setCellValue(listaData.get(vi).strzonaCiudadOri);
                rcell4.setCellValue(listaData.get(vi).ciudaDes);
                rcell5.setCellValue(listaData.get(vi).strCiudaDes);
                rcell6.setCellValue(listaData.get(vi).zonaCiudaDes);
                rcell7.setCellValue(listaData.get(vi).strzonaCiudaDes);
                rcell8.setCellValue(listaData.get(vi).zonaRe);
                rcell9.setCellValue(listaData.get(vi).strzonaRe);
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

    @RequestMapping(value = "getXLSX3")
    public @ResponseBody
    void getXLSX3(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("ZoneMasterFile : getXLSX3");
        String fileNameDownload = String.format("ZoneMasterFile  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1708> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Zone Pair");
            CH1_1.setCellValue("Zone Result");
            CH1_2.setCellValue("");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            ++vj;
             //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Code");
            CH2_2.setCellValue("Zone Name");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);

                rcell0.setCellValue(listaData.get(vi).ATOS);
                rcell1.setCellValue(listaData.get(vi).ZONA);
                rcell2.setCellValue(listaData.get(vi).strZONA);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);

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

}
