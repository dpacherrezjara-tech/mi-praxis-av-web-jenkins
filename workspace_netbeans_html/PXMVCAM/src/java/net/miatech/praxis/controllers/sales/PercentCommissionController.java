/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import net.miatech.praxis.controllers.flown.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.PX019S01A004Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.libmiatec.A722;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
import net.miatech.praxis.logic.sales.FptfAirlineLogic;
import net.miatech.praxis.logic.sales.FptfBestPracticeLogic;
import net.miatech.praxis.logic.sales.PercentCommissionLogic;
import net.miatech.praxis.logic.sales.ProvisosTextLogic;
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
@RequestMapping("/PercentCommission")
public class PercentCommissionController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PercentCommissionLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/PercentCommission/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PercentCommission : Search-------------");
        map.put("success", true);
        List<SQP00796Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00796Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new PercentCommissionLogic();

        List<SQP00796Filter> lst = new ArrayList<>(0);
        SQP00796Filter filter = new SQP00796Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_A2448CCUST = request.getParameter("VP_A2448CCUST");
            filter.VP_A2448CODEA = request.getParameter("VP_A2448CODEA");
            filter.VP_A2448IATA = request.getParameter("VP_A2448IATA");

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
        System.out.println("-------------- searchByCode : validarCodigoIATA-------------");

        logic = new PercentCommissionLogic();
        map.put("success", true);
        String VP_OPTION;
        String VP_PARAM;
        String result;
        try {
            logic.setSession(this.serverSession.getServerSession());
            VP_OPTION = request.getParameter("VP_OPTION");
            VP_PARAM = request.getParameter("VP_PARAM");
            System.out.println("VP_OPTION -> " + VP_OPTION);
            System.out.println("VP_PARAM -> " + VP_PARAM);
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
        System.out.println("-------------- searchByCode : mantenimiento-------------");
        SQP00806Filter filter = new SQP00806Filter();
        SQP00806Filter objRtn;
        logic = new PercentCommissionLogic();
        map.put("success", true);

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.OPCION = request.getParameter("OPCION");
            filter.A2448CCUST = request.getParameter("A2448CCUST");
            filter.A2448IATA = request.getParameter("A2448IATA");
            filter.A2448CODEA = request.getParameter("A2448CODEA");
            filter.A2448DESCR = request.getParameter("A2448DESCR");
            filter.A2448FORMA = request.getParameter("A2448FORMA");
            filter.A2448TRNCU = request.getParameter("A2448TRNCU");
            filter.A2448CLASX = request.getParameter("A2448CLASX");
            filter.A2448TRNCU = request.getParameter("A2448TRNCU");
            filter.A2448CODEX = request.getParameter("A2448CODEX");
            filter.A2448SCODX = request.getParameter("A2448SCODX");
            filter.A2448IATAX = request.getParameter("A2448IATAX");
            filter.A2448MCARR = request.getParameter("A2448MCARR");
            filter.A2448TPASS = request.getParameter("A2448TPASS");
            filter.A2448ACODE = request.getParameter("A2448ACODE");
            filter.A2448TOUR = request.getParameter("A2448TOUR");
            filter.A2448FBASI = request.getParameter("A2448FBASI");
            filter.A2448TDESI = request.getParameter("A2448TDESI");
            filter.A2448CLASS = request.getParameter("A2448CLASS");
            filter.A2448CODE = request.getParameter("A2448CODE");
            filter.A2448SCODE = request.getParameter("A2448SCODE");
            filter.A2448MOPAY = request.getParameter("A2448MOPAY");
            filter.A2448ANCIL = request.getParameter("A2448ANCIL");
            filter.A2448COMM = Double.parseDouble(request.getParameter("A2448COMM"));
            filter.A2448FINIV = request.getParameter("A2448FINIV");
            filter.A2448FFINV = request.getParameter("A2448FFINV");

            objRtn = logic.setSQP00651(filter);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);

    }

//    public A722 searchByCode(HttpServletRequest request, Boolean bExcel) {
//
//        logic = new FptfBestPracticeLogic();
//
//        List<A722> lst = new ArrayList<>(0);
//        A722 filter = new A722();
//        A722 bean = new A722();
//
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//
//        try {
//
//            logic.setSession(this.serverSession.getServerSession());
//
//            filter.A722FDESDE = request.getParameter("A722FDESDE");
//            filter.A722FHASTA = request.getParameter("A722FHASTA");
//            filter.A722FORMA = request.getParameter("A722FORMA");
//            filter.A722FTEVTA = request.getParameter("A722FTEVTA");
//            filter.A722TFORM3 = request.getParameter("A722TFORM3");
//            filter.A722UFORMA = request.getParameter("A722UFORMA");
//            filter.A722EMTCUP = request.getParameter("A722EMTCUP");
//
//            System.out.println("----------------- Parametros --------------------- ");
//            System.out.println(" limit : " + request.getParameter("limit"));
//            System.out.println(" start : " + request.getParameter("start"));
//            System.out.println("-------------------------------------------------- ");
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//                filter.intCurrentPg = filter.page.PAGNUM;
//                filter.strExcel = "FALSE";
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//                filter.intCurrentPg = filter.page.PAGNUM;
//                filter.strExcel = "TRUE";
//            }
//
//            bean = logic.loadA722CompleteData(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//
//        return bean;
//    }
//
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Percent Commission : getXLSX");

        String fileNameDownload = String.format("Percent Commission - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP00796Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Percent Commission");

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
            CH1_01.setCellValue("IATA Name");
            CH1_02.setCellValue("Cod. Agre");
            CH1_03.setCellValue("Description");
            CH1_04.setCellValue("% Comm.");
            CH1_05.setCellValue("Applicable");
            CH1_17.setCellValue("Exclude");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 20));

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

            CH2_05.setCellValue("Emmission Form");
            CH2_06.setCellValue("TNR");
            CH2_07.setCellValue("Marketing");
            CH2_08.setCellValue("Type Pax.");
            CH2_09.setCellValue("Tour Code");
            CH2_10.setCellValue("Farebasis");
            CH2_11.setCellValue("Ticket Designator");
            CH2_12.setCellValue("Class");
            CH2_13.setCellValue("Code");
            CH2_14.setCellValue("Sub Code");
            CH2_15.setCellValue("Method of Payment");
            CH2_16.setCellValue("Ancilliaries");
            CH2_17.setCellValue("Class");
            CH2_18.setCellValue("Code");
            CH2_19.setCellValue("Sub Code");
            CH2_20.setCellValue("IATA");

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

                rcell0.setCellValue(listaData.get(vi).A2448IATA);
                rcell1.setCellValue(listaData.get(vi).A003KEY3);
                rcell2.setCellValue(listaData.get(vi).A2448CODEA);
                rcell3.setCellValue(listaData.get(vi).A2448DESCR);
                rcell4.setCellValue(listaData.get(vi).A2448COMM);
                rcell5.setCellValue(listaData.get(vi).A2448FORMA);
                rcell6.setCellValue(listaData.get(vi).A2448TRNCU);
                rcell7.setCellValue(listaData.get(vi).A2448MCARR);
                rcell8.setCellValue(listaData.get(vi).A2448TPASS);
                rcell9.setCellValue(listaData.get(vi).A2448TOUR);
                rcell10.setCellValue(listaData.get(vi).A2448FBASI);
                rcell11.setCellValue(listaData.get(vi).A2448TDESI);
                rcell12.setCellValue(listaData.get(vi).A2448CLASS);
                rcell13.setCellValue(listaData.get(vi).A2448CODE);
                rcell14.setCellValue(listaData.get(vi).A2448SCODE);
                rcell15.setCellValue(listaData.get(vi).A2448MOPAY);
                rcell16.setCellValue(listaData.get(vi).A2448ANCIL);
                rcell17.setCellValue(listaData.get(vi).A2448CLASX);
                rcell18.setCellValue(listaData.get(vi).A2448CODEX);
                rcell19.setCellValue(listaData.get(vi).A2448SCODX);
                rcell20.setCellValue(listaData.get(vi).A2448IATAX);

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
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);

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
