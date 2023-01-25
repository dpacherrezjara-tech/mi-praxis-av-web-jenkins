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
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1952Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
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
@RequestMapping("/CatalogueFlight")
public class CatalogueFlightController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CatalogueFlightLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/CatalogueFlight/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CatalogueFlight : Controller-------------");
        map.put("success", true);
        List<A1952Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1952Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new CatalogueFlightLogic();

        List<A1952Filter> lst = new ArrayList<>(0);
        A1952Filter filter = new A1952Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TYPE = request.getParameter("inType");
            filter.IN_NFLIGHT = request.getParameter("flightNumber");
            filter.IN_CARRIER = request.getParameter("carrier");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" inType : " + request.getParameter("inType"));
            System.out.println(" flightNumber : " + request.getParameter("flightNumber"));
            System.out.println(" carrier : " + request.getParameter("carrier"));
            System.out.println("-------------------------------------------------- ");

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

            lst = logic.loadPX244SQP00244(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Catalogue Flight : getXLSX");

        String fileNameDownload = String.format("Catalogue of Flight - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1952Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Catalogue of Flight");

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
            CH1_00.setCellValue("Operator");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Marketing");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Hard Block");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Operator Type");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Flight Type");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Frecuency");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Equipment");

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));

            CH1_00.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Flight Number");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Carrier");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Flight Number");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Carrier");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Flight Number");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Carrier");

            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);

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

                rcell0.setCellValue(listaData.get(vi).NFLIGHT);
                rcell1.setCellValue(listaData.get(vi).CARRIER);
                rcell2.setCellValue(listaData.get(vi).NFLIGMKT);
                rcell3.setCellValue(listaData.get(vi).CARRIMKT);
                rcell4.setCellValue(listaData.get(vi).FREQ);
                rcell5.setCellValue(listaData.get(vi).EQUIPO);
                rcell6.setCellValue(listaData.get(vi).TOPER);
                rcell7.setCellValue(listaData.get(vi).TFLIGH);
                rcell8.setCellValue(listaData.get(vi).NFLIGHTH);
                rcell9.setCellValue(listaData.get(vi).CARRIERH);

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
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);

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

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Catalogue Flight : Mantenimiento");
        String msj = "";
        A1952Filter filter = new A1952Filter();
        try {
            logic = new CatalogueFlightLogic();
            logic.setSession(this.serverSession.getServerSession());
            String strOption = request.getParameter("strOption").toString().trim();

            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.CARRIER = request.getParameter("CARRIER");
            filter.NFLIGMKT = request.getParameter("NFLIGMKT");
            filter.CARRIMKT = request.getParameter("CARRIMKT");
            filter.NFLIGHTH = request.getParameter("NFLIGHTH");
            filter.CARRIERH = request.getParameter("CARRIERH");

            filter.FREQ = request.getParameter("FREQ");
            filter.EQUIPO = request.getParameter("EQUIPO");
            filter.TOPER = request.getParameter("TOPER");
            filter.TFLIGH = request.getParameter("TFLIGH");

            // msj = logic.loadPX275SQP00760(filter, strOption);  
            msj = validFlight(filter);
            System.out.println("El mensaje devuelto es : " + msj);
            if (msj.equalsIgnoreCase("")) {
                msj = logic.loadPX244SQP00244ENTRY(filter, strOption);
            }
        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);

        return new Gson().toJson(m);

    }

    public String validFlight(A1952Filter filter) throws Exception {
        //REALIZA la validación de los datos del vuelo (A1691)

        String msj = "";

        try {

            //Validando que las ciudades de Origen y Destino existan ===========
            A1952Filter bean92 = new A1952Filter();
            bean92.NFLIGHT = filter.NFLIGHT.trim();
            bean92.CARRIER = filter.CARRIER.trim();
            bean92.NFLIGMKT = filter.NFLIGMKT.trim();
            bean92.CARRIMKT = filter.CARRIMKT.trim();

            logic = new CatalogueFlightLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX244SQP00244VALID(bean92, "N");

        } catch (SQLException e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        return msj;
    }

}
