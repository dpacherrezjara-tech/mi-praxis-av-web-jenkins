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
import net.miatech.beans.A1737Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.MultilegTableLogic;
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
@RequestMapping("/MultilegTable")
public class MultilegTableController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private MultilegTableLogic logic;
    MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/MultilegTable/form_index";
    }

    @RequestMapping("/getCities")
    public @ResponseBody
    String getCities(ModelMap map, HttpServletRequest request) {
        System.out.println("-----> Ingreso a obtener Ciudades");
        map.put("success", false);
        List<A1007> lst = null;
        try {
            logic = new MultilegTableLogic();
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
        System.out.println("-------------- MultilegTable : Controller-------------");
        map.put("success", true);
        List<A1737Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1737Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new MultilegTableLogic();
        masterDAO = new MasterDAO();

        List<A1737Filter> lst = new ArrayList<>(0);
        A1737Filter filter = new A1737Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());

            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            filter.IN_FECHA_FROM = request.getParameter("dateFrom");
            filter.IN_FECHA_TO = request.getParameter("dateTo");
            filter.NFLIGHT = request.getParameter("flightNumber");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" Date From : " + request.getParameter("dateFrom"));
            System.out.println(" Date To : " + request.getParameter("dateTo"));
            System.out.println(" NFLIGHT : " + request.getParameter("flightNumber"));
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

            lst = logic.loadPX103S01A1737(filter, hmAeropuertos);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Multileg Table : getXLSX");

        String dateFrom;
        String dateTo;
        String flightNumber;

        if (request.getParameter("dateFrom") == null || "".equals(request.getParameter("dateFrom"))) {
            dateFrom = "";
        }
        if (request.getParameter("dateTo") == null || "".equals(request.getParameter("dateTo"))) {
            dateTo = "";
        }
        if (request.getParameter("flightNumber") == null || "".equals(request.getParameter("flightNumber"))) {
            flightNumber = "";
        }

        String fecha = Functions.getFechaActual();
        String fileNameDownload = String.format("Multileg Table - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1737Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Multileg Table");

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
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Flight Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("ZULU Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Flight Number");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Sales Data");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Leg 1");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Leg 2");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Leg 3");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Leg 4");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("Leg 5");

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));//Nbr
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));//Flight Date
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));//ZULU date
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));//Flight Number
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));//Sale Date
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));//Leg 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));//Leg 2
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 14));//Leg 3
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 17));//Leg 4
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 20));//Leg 5

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Orig");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Dest");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Orig");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Dest");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Carrier");

            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Orig");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Dest");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Carrier");

            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("Orig");
            Cell CH2_13 = row2.createCell(13);
            CH2_13.setCellValue("Dest");
            Cell CH2_14 = row2.createCell(14);
            CH2_14.setCellValue("Carrier");

            Cell CH2_15 = row2.createCell(15);
            CH2_15.setCellValue("Orig");
            Cell CH2_16 = row2.createCell(16);
            CH2_16.setCellValue("Dest");
            Cell CH2_17 = row2.createCell(17);
            CH2_17.setCellValue("Carrier");

            Cell CH2_18 = row2.createCell(18);
            CH2_18.setCellValue("Orig");
            Cell CH2_19 = row2.createCell(19);
            CH2_19.setCellValue("Dest");
            Cell CH2_20 = row2.createCell(20);
            CH2_20.setCellValue("Carrier");

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

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
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

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).FOPERZUL);
                rcell3.setCellValue(listaData.get(vi).NFLIGHT);
                rcell4.setCellValue(listaData.get(vi).CDEPART);
                rcell5.setCellValue(listaData.get(vi).CARRIVA);
                rcell6.setCellValue(listaData.get(vi).DEPARTLEG1);
                rcell7.setCellValue(listaData.get(vi).ARRIVALEG1);
                rcell8.setCellValue(listaData.get(vi).CARR1);
                rcell9.setCellValue(listaData.get(vi).DEPARTLEG2);
                rcell10.setCellValue(listaData.get(vi).ARRIVALEG2);
                rcell11.setCellValue(listaData.get(vi).CARR2);
                rcell12.setCellValue(listaData.get(vi).DEPARTLEG3);
                rcell13.setCellValue(listaData.get(vi).ARRIVALEG3);
                rcell14.setCellValue(listaData.get(vi).CARR3);
                rcell15.setCellValue(listaData.get(vi).DEPARTLEG4);
                rcell16.setCellValue(listaData.get(vi).ARRIVALEG4);
                rcell17.setCellValue(listaData.get(vi).CARR4);
                rcell18.setCellValue(listaData.get(vi).DEPARTLEG5);
                rcell19.setCellValue(listaData.get(vi).ARRIVALEG5);
                rcell20.setCellValue(listaData.get(vi).CARR5);

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
        System.out.println("MultilegTable : Mantenimiento");
        String msj = "";
        A1737Filter filter = new A1737Filter();
        try {
            logic = new MultilegTableLogic();
            logic.setSession(this.serverSession.getServerSession());
            String strOption = request.getParameter("strOption").toString().trim();

            filter.DFLIGHT = request.getParameter("DFLIGHT");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.CARRIVA = request.getParameter("CARRIVA");
            filter.LEGSEQ = request.getParameter("LEGSEQ");
            filter.BASICML = Integer.parseInt(request.getParameter("BASICML"));
            filter.DEPARTLEG1 = request.getParameter("DEPARTLEG1");
            filter.ARRIVALEG1 = request.getParameter("ARRIVALEG1");
            filter.BASICML1 = Integer.parseInt(request.getParameter("BASICML1"));
            filter.DEPARTLEG2 = request.getParameter("DEPARTLEG2");
            filter.ARRIVALEG2 = request.getParameter("ARRIVALEG2");
            filter.BASICML2 = Integer.parseInt(request.getParameter("BASICML2"));
            filter.DEPARTLEG3 = request.getParameter("DEPARTLEG3");
            filter.ARRIVALEG3 = request.getParameter("ARRIVALEG3");
            filter.BASICML3 = Integer.parseInt(request.getParameter("BASICML3"));
            filter.DEPARTLEG4 = request.getParameter("DEPARTLEG4");
            filter.ARRIVALEG4 = request.getParameter("ARRIVALEG4");
            filter.BASICML4 = Integer.parseInt(request.getParameter("BASICML4"));
            filter.DEPARTLEG5 = request.getParameter("DEPARTLEG5");
            filter.BASICML5 = Integer.parseInt(request.getParameter("BASICML5"));
            filter.DEPARTLEG6 = request.getParameter("DEPARTLEG6");
            filter.ARRIVALEG6 = request.getParameter("ARRIVALEG6");
            filter.BASICML6 = Integer.parseInt(request.getParameter("BASICML6"));
            filter.DEPARTLEG7 = request.getParameter("DEPARTLEG7");
            filter.ARRIVALEG7 = request.getParameter("ARRIVALEG7");
            filter.BASICML7 = Integer.parseInt(request.getParameter("BASICML7"));
            filter.CARR1 = request.getParameter("CARR1");
            filter.CARR2 = request.getParameter("CARR2");
            filter.CARR3 = request.getParameter("CARR3");
            filter.CARR4 = request.getParameter("CARR4");
            filter.CARR5 = request.getParameter("CARR5");
            filter.CARR6 = request.getParameter("CARR6");
            filter.CARR7 = request.getParameter("CARR7");

            msj = logic.loadPX103S03A1737(filter, strOption);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

}
