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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX245S01A1980Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.flown.CalendarAccountingDAO;
import net.miatech.praxis.exceptions.SpringException;
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
@RequestMapping("/CalendarAccounting")
public class CalendarAccountingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CalendarAccountingDAO logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/CalendarAccounting/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CalendarAccounting : Controller-------------");
        map.put("success", true);
        List<PX245S01A1980Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX245S01A1980Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new CalendarAccountingDAO();
        List<PX245S01A1980Filter> lst = new ArrayList<>(0);
        PX245S01A1980Filter filter = new PX245S01A1980Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FPRDA_FROM = request.getParameter("dateFrom");
            filter.IN_FPRDA_TO = request.getParameter("dateTo");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" inType : " + request.getParameter("inType"));
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
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

            lst = logic.loadPX245S01A1980(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Calendar of Accounting : getXLSX");

        String fileNameDownload = String.format("Calendar Of Accounting - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX245S01A1980Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Calendar of Accounting");

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
            CH1_00.setCellValue("Accounting Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Calendar Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("GL");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("AR");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("AP");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("AR's/AP's Pendings");

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 13));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Mexico");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Praxis Local");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Status");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Time");
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Status");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Time");
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Status");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Time");
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("From");
            Cell CH2_13 = row2.createCell(13);
            CH2_13.setCellValue("To");

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));

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

            //*******************
            ++vj;
            Row row3 = sheet.createRow(vj);
            Cell CH3_00 = row3.createCell(0);
            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            Cell CH3_03 = row3.createCell(3);
            Cell CH3_04 = row3.createCell(4);
            CH3_04.setCellValue("Mexico");
            Cell CH3_05 = row3.createCell(5);
            CH3_05.setCellValue("Praxis Local");
            Cell CH3_06 = row3.createCell(6);
            Cell CH3_07 = row3.createCell(7);
            CH3_07.setCellValue("Mexico");
            Cell CH3_08 = row3.createCell(8);
            CH3_08.setCellValue("Praxis Local");
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            CH3_10.setCellValue("Mexico");
            Cell CH3_11 = row3.createCell(11);
            CH3_11.setCellValue("Praxis Local");
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);

            CH3_00.setCellStyle(headerStyle);
            CH3_01.setCellStyle(headerStyle);
            CH3_02.setCellStyle(headerStyle);
            CH3_03.setCellStyle(headerStyle);
            CH3_04.setCellStyle(headerStyle);
            CH3_05.setCellStyle(headerStyle);
            CH3_06.setCellStyle(headerStyle);
            CH3_07.setCellStyle(headerStyle);
            CH3_08.setCellStyle(headerStyle);
            CH3_09.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);

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

                rcell0.setCellValue(listaData.get(vi).A1980FECCO);
                rcell1.setCellValue(listaData.get(vi).A1980FECMX);
                rcell2.setCellValue(listaData.get(vi).A1980FECPR);
                rcell3.setCellValue(listaData.get(vi).A1980GL);
                rcell4.setCellValue(listaData.get(vi).A1980HMXGL);
                rcell5.setCellValue(listaData.get(vi).A1980HPRGL);
                rcell6.setCellValue(listaData.get(vi).A1980AR);
                rcell7.setCellValue(listaData.get(vi).A1980HMXAR);
                rcell8.setCellValue(listaData.get(vi).A1980HPRAR);
                rcell9.setCellValue(listaData.get(vi).A1980AP);
                rcell10.setCellValue(listaData.get(vi).A1980HMXAP);
                rcell11.setCellValue(listaData.get(vi).A1980HPRAP);
                rcell12.setCellValue(listaData.get(vi).A1980FECIN);
                rcell13.setCellValue(listaData.get(vi).A1980FECFN);

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
        System.out.println("Calendar Accounting : Mantenimiento");
        String msj = "";
        PX245S01A1980Filter filter = new PX245S01A1980Filter();
        PX245S01A1980Filter objRtn= new PX245S01A1980Filter();
        try {
            logic = new CalendarAccountingDAO();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_ACTION = request.getParameter("strOption").toString().trim();
            filter.A1980FECMX = request.getParameter("A1980FECMX");
            filter.A1980FECPR = request.getParameter("A1980FECPR");
            filter.A1980FECCO = request.getParameter("A1980FECCO");
            filter.A1980GL = request.getParameter("A1980GL");
            filter.A1980HMXGL = request.getParameter("A1980HMXGL");
            filter.A1980HPRGL = request.getParameter("A1980HPRGL");
            filter.A1980AR = request.getParameter("A1980AR");
            filter.A1980HMXAR = request.getParameter("A1980HMXAR");
            filter.A1980HPRAR = request.getParameter("A1980HPRAR");
            filter.A1980AP = request.getParameter("A1980AP");
            filter.A1980HMXAP = request.getParameter("A1980HMXAP");
            filter.A1980HPRAP = request.getParameter("A1980HPRAP");
            filter.A1980FECIN = request.getParameter("A1980FECIN");
            filter.A1980FECFN = request.getParameter("A1980FECFN");
            
            objRtn = logic.setPX112S02A1757(filter);           
            System.out.println("El mensaje devuelto es : " + objRtn.dbException.MESSAGE);
           
        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", objRtn.dbException.MESSAGE);

        return new Gson().toJson(m);

    }

}
