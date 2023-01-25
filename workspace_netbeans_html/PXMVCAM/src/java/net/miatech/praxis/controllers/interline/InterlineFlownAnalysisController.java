/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.interline;

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
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.WRF071Filter;
import net.miatech.praxis.logic.interline.InterlineFlownAnalysisLogic;
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
 * @author andrea
 */
@Controller
@Scope("request")
@RequestMapping("/InterlineFlownAnalysis")
public class InterlineFlownAnalysisController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InterlineFlownAnalysisLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/InterlineFlownAnalysis/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Interline Flown Analysis : Search-------------");
        map.put("success", true);
        List<WRF071Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<WRF071Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<WRF071Filter> lst = new ArrayList<>(0);
        WRF071Filter filter = new WRF071Filter();
        Gson gson = new Gson();
        String beanString = "";

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic = new InterlineFlownAnalysisLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF071Filter.class);

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

            lst = logic.loadSQP00213(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    @RequestMapping(value = "searchByGroup")
    public @ResponseBody
    String searchByGroup(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Interline Flown Analysis : searchByGroup-------------");
        map.put("success", true);
        List<WRF071Filter> lst = this.getListGroup(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<WRF071Filter> getListGroup(HttpServletRequest request, Boolean bExcel) {

        List<WRF071Filter> lst = new ArrayList<>(0);
        WRF071Filter filter = new WRF071Filter();
        Gson gson = new Gson();
        String beanString = "";

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic = new InterlineFlownAnalysisLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF071Filter.class);

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

            lst = logic.loadPX162S08WRF071(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        WRF071Filter filter = new WRF071Filter();
        Boolean bExcel = true;
    
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx"); 
            			
	    String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0  :Integer.parseInt(request.getParameter("start"));
            
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
//            
            InterlineFlownAnalysisLogic logic = new InterlineFlownAnalysisLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<WRF071Filter> listaData = logic.loadSQP00213(filter);
//            
            
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

                CH1_0.setCellValue("Clearing Date");
                CH1_1.setCellValue("Period");
                CH1_2.setCellValue("Qty");
                CH1_3.setCellValue("Qty");
                CH1_4.setCellValue("Invoice");
                CH1_5.setCellValue("Gross");
                CH1_6.setCellValue("Commision");
                CH1_8.setCellValue("Tax");
                CH1_9.setCellValue("Net");

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


                //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));

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


               CH2_0.setCellValue("Date");
               CH2_2.setCellValue("Groups");
               CH2_3.setCellValue("Coupons");
               CH2_4.setCellValue("Currency");
               CH2_6.setCellValue("ISC");
               CH2_7.setCellValue("CSC");


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
                //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
                ++vj;
             //============================================

//
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
//
                    rcell0.setCellValue(listaData.get(vi).strFormatDate);
                    rcell1.setCellValue(listaData.get(vi).IN_PERIOD);
                    rcell2.setCellValue(listaData.get(vi).QGRUPO);
                    rcell3.setCellValue(listaData.get(vi).QTYC);
                    rcell4.setCellValue(listaData.get(vi).MONED);
                    rcell5.setCellValue(listaData.get(vi).GROSS);
                    rcell6.setCellValue(listaData.get(vi).ISC);
                    rcell7.setCellValue(listaData.get(vi).OCOMIS);
                    rcell8.setCellValue(listaData.get(vi).TAX);
                    rcell9.setCellValue(listaData.get(vi).NETO);
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
    
    @RequestMapping(value = "getXLSX_2")
    public @ResponseBody
    void getXLSX_2(HttpServletRequest request, HttpServletResponse response) {
        
        System.out.println("Report : getXLSX_2");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<WRF071Filter> listaData = this.getListGroup(request, true);
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

            CH1_0.setCellValue("Airline");
            CH1_2.setCellValue("Group");
            CH1_3.setCellValue("Qty");
            CH1_4.setCellValue("Invoice");
            CH1_5.setCellValue("Gross");
            CH1_6.setCellValue("Commision");
            CH1_8.setCellValue("Tax");
            CH1_9.setCellValue("Net");

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


             //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
             sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
             sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
             sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
             sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
             sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
             sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
             sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
             sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
             
             
             
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

            CH2_0.setCellValue("Code");
            CH2_1.setCellValue("Description");
            CH2_3.setCellValue("Coupons");
            CH2_4.setCellValue("Currency");
            CH2_6.setCellValue("ISC");
            CH2_7.setCellValue("CSC");

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

                rcell0.setCellValue(listaData.get(vi).CIA);
                rcell1.setCellValue(listaData.get(vi).strDescripcion);
                rcell2.setCellValue(listaData.get(vi).IN_GB);
                rcell3.setCellValue(listaData.get(vi).QTYC);
                rcell4.setCellValue(listaData.get(vi).MONED);
                rcell5.setCellValue(listaData.get(vi).GROSS);
                rcell6.setCellValue(listaData.get(vi).ISC);
                rcell7.setCellValue(listaData.get(vi).OCOMIS);
                rcell8.setCellValue(listaData.get(vi).TAX);
                rcell9.setCellValue(listaData.get(vi).NETO);
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

     
    
    
}
