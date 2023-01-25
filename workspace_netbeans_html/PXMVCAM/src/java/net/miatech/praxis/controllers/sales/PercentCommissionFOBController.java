/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX105S01A1742Filter;
import net.miatech.beans.SQP00132Filter;
import net.miatech.beans.SQP00647Filter;
import net.miatech.beans.SQP00651Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.PercentCommissionFOBLogic;
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

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/PercentCommissionFOB")
public class PercentCommissionFOBController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PercentCommissionFOBLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/PercentCommissionFOB/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- PercentCommissionFOB : Search-------------");
        map.put("success", true);
        List<PX105S01A1742Filter> lst = this.getList(request, false);
//        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX105S01A1742Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new PercentCommissionFOBLogic();

        List<PX105S01A1742Filter> lst = new ArrayList<>(0);
        PX105S01A1742Filter filter = new PX105S01A1742Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A1742CCUST = request.getParameter("IN_A1742CCUST");
            filter.IN_A1742CODEA = request.getParameter("IN_A1742CODEA");
            filter.IN_A1742COMM = Double.parseDouble(request.getParameter("IN_A1742COMM"));

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

            lst = logic.loadPX105S01A1742(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "search2")
    public @ResponseBody
    String search2(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- PercentCommissionFOB : Search2-------------");
        map.put("success", true);
        List<SQP00132Filter> lst = this.getList2(request, false);
//        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00132Filter> getList2(HttpServletRequest request, Boolean bExcel) {

        logic = new PercentCommissionFOBLogic();

        List<SQP00132Filter> lst = new ArrayList<>(0);
        SQP00132Filter filter = new SQP00132Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_A1874CCUST = request.getParameter("VP_A1874CCUST");
            filter.VP_A1874CODEA = request.getParameter("VP_A1874CODEA");
            filter.VP_A1874IATA = request.getParameter("VP_A1874IATA");

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

            lst = logic.getSQP00132Filter(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "validarCodigoIATA")
    public @ResponseBody
    String validarCodigoIATA(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- searchByCode : validarCodigoIATA-------------");

        logic = new PercentCommissionFOBLogic();
        map.put("success", true);
        String VP_OPTION;
        String VP_PARAM;
        String result;
        try {
            logic.setSession(this.serverSession.getServerSession());
            VP_OPTION = request.getParameter("VP_OPTION");
            VP_PARAM = request.getParameter("VP_PARAM");
//            System.out.println("VP_OPTION -> " + VP_OPTION);
//            System.out.println("VP_PARAM -> " + VP_PARAM);
            result = logic.get_PX112S03A1757(VP_OPTION, VP_PARAM);
            if (result == null) {
                result = "";
            }

        } catch (Exception e) {
            result = "";
            System.out.println("--> " + e.getMessage());
            throw new SpringException(e);
        }
        map.put("result", result);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {
        //System.out.println("-------------- searchByCode : mantenimiento-------------");
        SQP00647Filter filter = new SQP00647Filter();
        SQP00647Filter objRtn;
        logic = new PercentCommissionFOBLogic();
        map.put("success", true);

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.OPCION = request.getParameter("OPCION");
            filter.A1742CCUST = request.getParameter("A1742CCUST");
            filter.A1742CODEA = request.getParameter("A1742CODEA");
            filter.A1742DESCR = request.getParameter("A1742DESCR");
            filter.A1742FORMA = request.getParameter("A1742FORMA");
            filter.A1742CLASX = request.getParameter("A1742CLASX");
            filter.A1742CODEX = request.getParameter("A1742CODEX");
            filter.A1742SCODX = request.getParameter("A1742SCODX");
            filter.A1742MCARR = request.getParameter("A1742MCARR");
            filter.A1742TPASS = request.getParameter("A1742TPASS");
            filter.A1742ACODE = request.getParameter("A1742ACODE");
            filter.A1742TOUR = request.getParameter("A1742TOUR");
            filter.A1742FBASI = request.getParameter("A1742FBASI");
            filter.A1742CLASS = request.getParameter("A1742CLASS");
            filter.A1742CODE = request.getParameter("A1742CODE");
            filter.A1742SCODE = request.getParameter("A1742SCODE");
            filter.A1742MOPAY = request.getParameter("A1742MOPAY");
            filter.A1742ANCIL = request.getParameter("A1742ANCIL");
            filter.A1742COMM = Double.parseDouble(request.getParameter("A1742COMM"));
            filter.A1742FINIV = request.getParameter("A1742FINIV");
            filter.A1742FFINV = request.getParameter("A1742FFINV");

            objRtn = logic.setSQP00647(filter);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "mantenimiento2")
    public @ResponseBody
    String mantenimiento2(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- searchByCode : mantenimiento-------------");
        SQP00651Filter filter = new SQP00651Filter();
        SQP00651Filter objRtn;
        logic = new PercentCommissionFOBLogic();
        map.put("success", true);

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.OPCION = request.getParameter("OPCION");
            filter.A1874CCUST = request.getParameter("A1874CCUST");
            filter.A1874IATA = request.getParameter("A1874IATA");
            filter.A1874CODEA = request.getParameter("A1874CODEA");
            filter.A1874DESCR = request.getParameter("A1874DESCR");
            filter.A1874FORMA = request.getParameter("A1874FORMA");
            filter.A1874CLASX = request.getParameter("A1874CLASX");
            filter.A1874CODEX = request.getParameter("A1874CODEX");
            filter.A1874SCODX = request.getParameter("A1874SCODX");
            filter.A1874MCARR = request.getParameter("A1874MCARR");
            filter.A1874TPASS = request.getParameter("A1874TPASS");
            filter.A1874ACODE = request.getParameter("A1874ACODE");
            filter.A1874TOUR = request.getParameter("A1874TOUR");
            filter.A1874FBASI = request.getParameter("A1874FBASI");
            filter.A1874CLASS = request.getParameter("A1874CLASS");
            filter.A1874CODE = request.getParameter("A1874CODE");
            filter.A1874SCODE = request.getParameter("A1874SCODE");
            filter.A1874MOPAY = request.getParameter("A1874MOPAY");
            filter.A1874ANCIL = request.getParameter("A1874ANCIL");
            filter.A1874COMM = Double.parseDouble(request.getParameter("A1874COMM"));
            filter.A1874FINIV = request.getParameter("A1874FINIV");
            filter.A1874FFINV = request.getParameter("A1874FFINV");

            objRtn = logic.setSQP00651(filter);

        } catch (Exception e) {
//            System.out.println(e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Percent Commission FOB : getXLSX");
//        String fileNameDownload = String.format("Percent Commission FOB " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format("PX0105-" + Functions.getFechaActual() + "-GeneralRules.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX105S01A1742Filter> listaData = this.getList(request, true);

//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("GeneralRules");

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

            CH1_00.setCellValue("Cod");
            CH1_01.setCellValue("Description");
            CH1_02.setCellValue("% Comm.");
            CH1_03.setCellValue("Applicable");
            CH1_13.setCellValue("Exclude");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 15));

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

            CH2_03.setCellValue("Emmission Form");
            CH2_04.setCellValue("Marketing");
            CH2_05.setCellValue("Type Pax.");
            CH2_06.setCellValue("Tour Code");
            CH2_07.setCellValue("Farebasis");
            CH2_08.setCellValue("Class");
            CH2_09.setCellValue("Code");
            CH2_10.setCellValue("Sub Code");
            CH2_11.setCellValue("Method of Payment");
            CH2_12.setCellValue("Ancilliaries");
            CH2_13.setCellValue("Class");
            CH2_14.setCellValue("Code");
            CH2_15.setCellValue("Sub Code");

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

                rcell0.setCellValue(listaData.get(vi).A1742CODEA);
                rcell1.setCellValue(listaData.get(vi).A1742DESCR);
                rcell2.setCellValue(listaData.get(vi).A1742COMM);
                rcell3.setCellValue(listaData.get(vi).A1742FORMA);
                rcell4.setCellValue(listaData.get(vi).A1742MCARR);
                rcell5.setCellValue(listaData.get(vi).A1742TPASS);
                rcell6.setCellValue(listaData.get(vi).A1742TOUR);
                rcell7.setCellValue(listaData.get(vi).A1742FBASI);
                rcell8.setCellValue(listaData.get(vi).A1742CLASS);
                rcell9.setCellValue(listaData.get(vi).A1742CODE);
                rcell10.setCellValue(listaData.get(vi).A1742SCODE);
                rcell11.setCellValue(listaData.get(vi).A1742MOPAY);
                rcell12.setCellValue(listaData.get(vi).A1742ANCIL);
                rcell13.setCellValue(listaData.get(vi).A1742CLASX);
                rcell14.setCellValue(listaData.get(vi).A1742CODEX);
                rcell15.setCellValue(listaData.get(vi).A1742SCODX);

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

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);

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
//        System.out.println("Percent Commission : getXLSX2");
//        String fileNameDownload = String.format("Percent Commission - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        PX0105-20201111-ExceptRules.xls
          String fileNameDownload = String.format("PX0105-" + Functions.getFechaActual() + "-ExceptRules.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP00132Filter> listaData = this.getList2(request, true);

//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ExceptRules");

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
            //--news
            Cell CH1_21 = row.createCell(21);
            Cell CH1_22 = row.createCell(22);
            Cell CH1_23 = row.createCell(23);
                    

            CH1_00.setCellValue("Cod.");
            CH1_01.setCellValue("IATA Name");
            CH1_02.setCellValue("Cod. Agre");
            CH1_03.setCellValue("Description");
            CH1_04.setCellValue("% Comm.");
            CH1_05.setCellValue("Applicable");
            CH1_19.setCellValue("Exclude");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 18)); 
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 23));

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
            //news
            CH1_21.setCellStyle(headerStyle);            
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);

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
            //news
            Cell CH2_21 = row.createCell(21);
            Cell CH2_22 = row.createCell(22);
            Cell CH2_23 = row.createCell(23);
            
            //--Aplicable
            CH2_05.setCellValue("T.Doc"); //new
            CH2_06.setCellValue("Emmission Form");
            CH2_07.setCellValue("Trx."); //new
            CH2_08.setCellValue("Marketing");
            CH2_09.setCellValue("Type Pax.");
            CH2_10.setCellValue("Tour Code");
            CH2_11.setCellValue("Farebasis");
            CH2_12.setCellValue("Ticket Designator");
            CH2_13.setCellValue("Origen dest."); //new
            CH2_14.setCellValue("Class");            
            CH2_15.setCellValue("Code");                        
            CH2_16.setCellValue("sub.code");
            CH2_17.setCellValue("Method of Payment");
            CH2_18.setCellValue("Ancilliaries");
            //--Exclude
            CH2_19.setCellValue("Class");
            CH2_20.setCellValue("Code");
            CH2_21.setCellValue("Sub. Code");
            CH2_22.setCellValue("Farebasis");
            CH2_23.setCellValue("IATA");

                    
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
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);

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
                Cell rcell21 = row.createCell(21);
                Cell rcell22 = row.createCell(22);
                Cell rcell23 = row.createCell(23);

                rcell0.setCellValue(listaData.get(vi).A1874IATA);
                rcell1.setCellValue(listaData.get(vi).A003KEY3);
                rcell2.setCellValue(listaData.get(vi).A1874CODEA);
                rcell3.setCellValue(listaData.get(vi).A1874DESCR);                
                rcell4.setCellValue(listaData.get(vi).A1874COMM);
//              APLICABLE
                rcell5.setCellValue(listaData.get(vi).A1874TDOC);                
                rcell6.setCellValue(listaData.get(vi).A1874FORMA);
                rcell7.setCellValue(listaData.get(vi).A1874TRNCU);                
                rcell8.setCellValue(listaData.get(vi).A1874MCARR);
                rcell9.setCellValue(listaData.get(vi).A1874TPASS);
                rcell10.setCellValue(listaData.get(vi).A1874TOUR);
                rcell11.setCellValue(listaData.get(vi).A1874FBASI);
                rcell12.setCellValue(listaData.get(vi).A1874TDESI);
                rcell13.setCellValue(listaData.get(vi).A1874ODPCP);
                rcell14.setCellValue(listaData.get(vi).A1874CLASS);                 
                rcell15.setCellValue(listaData.get(vi).A1874CODE);
                rcell16.setCellValue(listaData.get(vi).A1874SCODE);
                rcell17.setCellValue(listaData.get(vi).A1874MOPAY);
                rcell18.setCellValue(listaData.get(vi).A1874ANCIL);                
//              EXCLUDE
                rcell19.setCellValue(listaData.get(vi).A1874CLASX);
                rcell20.setCellValue(listaData.get(vi).A1874CODEX);
                rcell21.setCellValue(listaData.get(vi).A1874SCODX);
                rcell22.setCellValue(listaData.get(vi).A1874FBASX);
                rcell23.setCellValue(listaData.get(vi).A1874IATAX);

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
                rcell19.setCellStyle(bodyStyle);
                rcell20.setCellStyle(bodyStyle);
                rcell21.setCellStyle(bodyStyle);
                rcell22.setCellStyle(bodyStyle);
                rcell23.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//            sheet.autoSizeColumn(23, true);
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
}
