/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.controllers.payments.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.A005;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.controllers.master.DataObtain;
import net.miatech.praxis.dao.payments.BankStatementExtractDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankStatementExtractLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author singa
 */
@Controller
@Scope("request")
@RequestMapping("/BankStatementExtract")
public class BankStatementExtractController extends BaseController {

    private BankStatementExtractLogic logic;

    @RequestMapping(value = "/searchUsaflowDiary")
    public @ResponseBody
    String searchUsaflowDiary(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchMain-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchUsaflowDiary(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchLog")
    public @ResponseBody
    String searchLog(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData = new ArrayList<>();
        Gson gson = new Gson();
        SQP04091Filter filter;
        String beanString = "";

        System.out.println("-------------- BankStatementExtract : searchLog -------------");

        try {
            beanString = request.getParameter("beanString");
            System.out.println("beanString = " + beanString);

            // Parseo seguro del filtro
            filter = gson.fromJson(beanString, SQP04091Filter.class);

            // Validación por si page es null
            if (filter.page == null) {
    //            filter.page = new Page(); // Usa tu clase Page real aquí
            }

            // Lógica de paginación (se mantiene igual)
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int start = request.getParameter("start") == null
                    ? 0
                    : Integer.parseInt(request.getParameter("start"));

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            // Lógica de negocio
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchLog(filter);

            // Respuesta
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData); 

        } catch (NumberFormatException ex) {
            ex.printStackTrace();
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }

        return gson.toJson(map);
    }

    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody void getXLSXMain(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Fiduciary Alerts Usaflow Diary Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchUsaflowDiary(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);
            
            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);
            
            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);
            
            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);
            
            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);
            
            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);
            
            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);
            
            headerStyle13.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle13.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle13.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle13.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle13.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle13.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle13.setFillForegroundColor(new XSSFColor(new java.awt.Color(144, 158, 173)));
            headerStyle13.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle13.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle13.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Day");
            row1.getCell(0).setCellStyle(headerStyle);
            
            row1.getCell(1).setCellValue("Monthly");
            row1.getCell(1).setCellStyle(headerStyle);
            
            row1.getCell(2).setCellValue("Holidays");
            row1.getCell(2).setCellStyle(headerStyle5);
            
            row1.getCell(6).setCellValue("Reference Dates");
            row1.getCell(6).setCellStyle(headerStyle6);
            
            row1.getCell(9).setCellValue("Amounts");
            row1.getCell(9).setCellStyle(headerStyle7);
            
            row1.getCell(20).setCellValue("Averages");
            row1.getCell(20).setCellStyle(headerStyle10);
            
            row1.getCell(31).setCellValue("Variation (%)");
            row1.getCell(31).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0)); // Day
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5)); // Holidays (combina 4 columnas)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 8)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 19)); // Amounts
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 30)); // Averages
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 41)); // Variation (%)
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row2.createCell(i);
            }

            // Holidays - Columnas específicas
            row2.getCell(2).setCellValue("WP UK");
            row2.getCell(2).setCellStyle(headerStyle5);
            
            row2.getCell(3).setCellValue("WP Bankcard");
            row2.getCell(3).setCellStyle(headerStyle5);
            
            row2.getCell(4).setCellValue("Amex");
            row2.getCell(4).setCellStyle(headerStyle5);
            
            row2.getCell(5).setCellValue("Discover");
            row2.getCell(5).setCellStyle(headerStyle5);

            // Amounts
            row2.getCell(9).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(9).setCellStyle(headerStyle7);
            
            row2.getCell(14).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(14).setCellStyle(headerStyle9);
            
            row2.getCell(19).setCellValue("Grand Total");
            row2.getCell(19).setCellStyle(headerStyle8);
            
            // Averages
            row2.getCell(20).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(20).setCellStyle(headerStyle10);
            
            row2.getCell(25).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(25).setCellStyle(headerStyle11);
            
            row2.getCell(30).setCellValue("Grand Total");
            row2.getCell(30).setCellStyle(headerStyle8);

            // Variation (%)
            row2.getCell(31).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(31).setCellStyle(headerStyle12);
            
            row2.getCell(36).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(36).setCellStyle(headerStyle13);
            
            row2.getCell(41).setCellValue("Grand Total");
            row2.getCell(41).setCellStyle(headerStyle8);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 13)); // AV en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 18)); // TA en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19)); // Grand Total en Amounts

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 24)); // AV en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 29)); // TA en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 30, 30)); // Grand Total en Averages

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 31, 35)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 36, 40)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 41, 41)); // Grand Total en Variation

            // Holidays - Fusionar verticalmente cada columna individual (una columna, dos filas)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // WP UK
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3)); // WP Bankcard
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4)); // Amex
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5)); // Discover

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 40; i++) {
                row3.createCell(i);
            }

            // Reference Dates
            row3.getCell(6).setCellValue("From");
            row3.getCell(6).setCellStyle(headerStyle6);
            
            row3.getCell(7).setCellValue("yearweek");
            row3.getCell(7).setCellStyle(headerStyle6);
            
            row3.getCell(8).setCellValue("weekday");
            row3.getCell(8).setCellStyle(headerStyle6);
            
            // Amounts - AV
            row3.getCell(9).setCellValue("WP UK");
            row3.getCell(10).setCellValue("WP Bankcard");
            row3.getCell(11).setCellValue("Amex");
            row3.getCell(12).setCellValue("Discover");
            row3.getCell(13).setCellValue("Total");
            row3.getCell(13).setCellStyle(headerStyle8);
            
            row3.getCell(9).setCellStyle(headerStyle7);
            row3.getCell(10).setCellStyle(headerStyle7);
            row3.getCell(11).setCellStyle(headerStyle7);
            row3.getCell(12).setCellStyle(headerStyle7);

            // Amounts - TA
            row3.getCell(14).setCellValue("WP UK");
            row3.getCell(15).setCellValue("WP Bankcard");
            row3.getCell(16).setCellValue("Amex");
            row3.getCell(17).setCellValue("Discover");
            
            row3.getCell(14).setCellStyle(headerStyle9);
            row3.getCell(15).setCellStyle(headerStyle9);
            row3.getCell(16).setCellStyle(headerStyle9);
            row3.getCell(17).setCellStyle(headerStyle9);
            
            row3.getCell(18).setCellValue("Total");
            row3.getCell(18).setCellStyle(headerStyle8);

            // Averages - AV
            row3.getCell(20).setCellValue("WP UK");
            row3.getCell(21).setCellValue("WP Bankcard");
            row3.getCell(22).setCellValue("Amex");
            row3.getCell(23).setCellValue("Discover");
            
            row3.getCell(20).setCellStyle(headerStyle10);
            row3.getCell(21).setCellStyle(headerStyle10);
            row3.getCell(22).setCellStyle(headerStyle10);
            row3.getCell(23).setCellStyle(headerStyle10);
            
            row3.getCell(24).setCellValue("Total");
            row3.getCell(24).setCellStyle(headerStyle8);

            // Averages - TA
            row3.getCell(25).setCellValue("WP UK");
            row3.getCell(26).setCellValue("WP Bankcard");
            row3.getCell(27).setCellValue("Amex");
            row3.getCell(28).setCellValue("Discover");
            
            row3.getCell(25).setCellStyle(headerStyle11);
            row3.getCell(26).setCellStyle(headerStyle11);
            row3.getCell(27).setCellStyle(headerStyle11);
            row3.getCell(28).setCellStyle(headerStyle11);
            
            row3.getCell(29).setCellValue("Total");
            row3.getCell(29).setCellStyle(headerStyle8);

            // Variation - AV
            row3.getCell(31).setCellValue("WP UK");
            row3.getCell(32).setCellValue("WP Bankcard");
            row3.getCell(33).setCellValue("Amex");
            row3.getCell(34).setCellValue("Discover");
            
            row3.getCell(31).setCellStyle(headerStyle12);
            row3.getCell(32).setCellStyle(headerStyle12);
            row3.getCell(33).setCellStyle(headerStyle12);
            row3.getCell(34).setCellStyle(headerStyle12);
            
            row3.getCell(35).setCellValue("Total");
            row3.getCell(35).setCellStyle(headerStyle8);

            // Variation - TA
            row3.getCell(36).setCellValue("WP UK");
            row3.getCell(37).setCellValue("WP Bankcard");
            row3.getCell(38).setCellValue("Amex");
            row3.getCell(39).setCellValue("Discover");
            
            row3.getCell(36).setCellStyle(headerStyle13);
            row3.getCell(37).setCellStyle(headerStyle13);
            row3.getCell(38).setCellStyle(headerStyle13);
            row3.getCell(39).setCellStyle(headerStyle13);
            
            row3.getCell(40).setCellValue("Total");
            row3.getCell(40).setCellStyle(headerStyle8);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.DAY_NAME);
                dataRow.createCell(1).setCellValue(data.MONTH_NAME);

                // Holidays
                dataRow.createCell(2).setCellValue(data.HOLIDAY_WP_UK);
                dataRow.createCell(3).setCellValue(data.HOLIDAY_WP_BANCARD);
                dataRow.createCell(4).setCellValue(data.HOLIDAY_AMEX);
                dataRow.createCell(5).setCellValue(data.HOLIDAY_DISCOVER);

                // Reference Dates
                dataRow.createCell(6).setCellValue(data.DATE_FROM);
                dataRow.createCell(7).setCellValue(data.NUMBER_WEAK);
                dataRow.createCell(8).setCellValue(data.DAY_NUMBER_EKED);

                // Amounts - AV
                dataRow.createCell(9).setCellValue(data.AMOUNT_WP_UK_CO);
                dataRow.createCell(10).setCellValue(data.AMOUNT_BANCARD_CO);
                dataRow.createCell(11).setCellValue(data.AMOUNT_AMEX_CO);
                dataRow.createCell(12).setCellValue(data.AMOUNT_DISCOVER_CO);
                dataRow.createCell(13).setCellValue(data.TOTAL_CO);

                // Amounts - TA
                dataRow.createCell(14).setCellValue(data.AMOUNT_WP_UK_SA);
                dataRow.createCell(15).setCellValue(data.AMOUNT_BANCARD_SA);
                dataRow.createCell(16).setCellValue(data.AMOUNT_AMEX_SA);
                dataRow.createCell(17).setCellValue(data.AMOUNT_DISCOVER_SA);
                dataRow.createCell(18).setCellValue(data.TOTAL_SA);
                
                dataRow.createCell(19).setCellValue(data.TOTAL_CO_AND_SA);

                // Averages - AV
                dataRow.createCell(20).setCellValue(data.AVG_WP_UK_CO);
                dataRow.createCell(21).setCellValue(data.AVG_BANCARD_CO);
                dataRow.createCell(22).setCellValue(data.AVG_AMEX_CO);
                dataRow.createCell(23).setCellValue(data.AVG_DISCOVER_CO);
                dataRow.createCell(24).setCellValue(data.AVG_TOTAL_CO);

                // Averages - TA
                dataRow.createCell(25).setCellValue(data.AVG_WP_UK_SA);
                dataRow.createCell(26).setCellValue(data.AVG_BANCARD_SA);
                dataRow.createCell(27).setCellValue(data.AVG_AMEX_SA);
                dataRow.createCell(28).setCellValue(data.AVG_DISCOVER_SA);
                dataRow.createCell(29).setCellValue(data.AVG_TOTAL_SA);
                
                dataRow.createCell(30).setCellValue(data.AVG_TOTAL_CO_SA);

                // Variation - AV
                dataRow.createCell(31).setCellValue(data.VAR_WP_UK_CO);
                dataRow.createCell(32).setCellValue(data.VAR_BANCARD_CO);
                dataRow.createCell(33).setCellValue(data.VAR_AMEX_CO);
                dataRow.createCell(34).setCellValue(data.VAR_DISCOVER_CO);
                dataRow.createCell(35).setCellValue(data.VAR_TOTAL_CO);

                // Variation - TA
                dataRow.createCell(36).setCellValue(data.VAR_WP_UK_SA);
                dataRow.createCell(37).setCellValue(data.VAR_BANCARD_SA);
                dataRow.createCell(38).setCellValue(data.VAR_AMEX_SA);
                dataRow.createCell(39).setCellValue(data.VAR_DISCOVER_SA);
                dataRow.createCell(40).setCellValue(data.VAR_TOTAL_SA);
                
                dataRow.createCell(41).setCellValue(data.VAR_TOTAL_CO_SA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 2; i <= 41; i++) {
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 41; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "/searchUsaflowDiaryHistoric")
    public @ResponseBody
    String searchUsaflowDiaryHistoric(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchUsaflowDiaryHistoric-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchUsaflowDiaryHistoric(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXMainHistoric")
    public @ResponseBody void getXLSXMainHistoric(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Fiduciary Alerts Usaflow Diary Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchUsaflowDiaryHistoric(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);
            
            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);
            
            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);
            
            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);
            
            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);
            
            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);
            
            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);
            
            headerStyle13.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle13.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle13.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle13.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle13.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle13.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle13.setFillForegroundColor(new XSSFColor(new java.awt.Color(144, 158, 173)));
            headerStyle13.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle13.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle13.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Day");
            row1.getCell(0).setCellStyle(headerStyle);
            
            row1.getCell(1).setCellValue("Monthly");
            row1.getCell(1).setCellStyle(headerStyle);
            
            row1.getCell(2).setCellValue("Holidays");
            row1.getCell(2).setCellStyle(headerStyle5);
            
            row1.getCell(6).setCellValue("Reference Dates");
            row1.getCell(6).setCellStyle(headerStyle6);
            
            row1.getCell(9).setCellValue("Amounts");
            row1.getCell(9).setCellStyle(headerStyle7);
            
            row1.getCell(20).setCellValue("Averages");
            row1.getCell(20).setCellStyle(headerStyle10);
            
            row1.getCell(31).setCellValue("Variation (%)");
            row1.getCell(31).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0)); // Day
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5)); // Holidays (combina 4 columnas)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 8)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 19)); // Amounts
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 30)); // Averages
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 41)); // Variation (%)
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row2.createCell(i);
            }

            // Holidays - Columnas específicas
            row2.getCell(2).setCellValue("WP UK");
            row2.getCell(2).setCellStyle(headerStyle5);
            
            row2.getCell(3).setCellValue("WP Bankcard");
            row2.getCell(3).setCellStyle(headerStyle5);
            
            row2.getCell(4).setCellValue("Amex");
            row2.getCell(4).setCellStyle(headerStyle5);
            
            row2.getCell(5).setCellValue("Discover");
            row2.getCell(5).setCellStyle(headerStyle5);

            // Amounts
            row2.getCell(9).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(9).setCellStyle(headerStyle7);
            
            row2.getCell(14).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(14).setCellStyle(headerStyle9);
            
            row2.getCell(19).setCellValue("Grand Total");
            row2.getCell(19).setCellStyle(headerStyle8);
            
            // Averages
            row2.getCell(20).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(20).setCellStyle(headerStyle10);
            
            row2.getCell(25).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(25).setCellStyle(headerStyle11);
            
            row2.getCell(30).setCellValue("Grand Total");
            row2.getCell(30).setCellStyle(headerStyle8);

            // Variation (%)
            row2.getCell(31).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(31).setCellStyle(headerStyle12);
            
            row2.getCell(36).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(36).setCellStyle(headerStyle13);
            
            row2.getCell(41).setCellValue("Grand Total");
            row2.getCell(41).setCellStyle(headerStyle8);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 13)); // AV en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 18)); // TA en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19)); // Grand Total en Amounts

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 24)); // AV en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 29)); // TA en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 30, 30)); // Grand Total en Averages

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 31, 35)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 36, 40)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 41, 41)); // Grand Total en Variation

            // Holidays - Fusionar verticalmente cada columna individual (una columna, dos filas)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // WP UK
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3)); // WP Bankcard
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4)); // Amex
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5)); // Discover

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 40; i++) {
                row3.createCell(i);
            }

            // Reference Dates
            row3.getCell(6).setCellValue("From");
            row3.getCell(6).setCellStyle(headerStyle6);
            
            row3.getCell(7).setCellValue("yearweek");
            row3.getCell(7).setCellStyle(headerStyle6);
            
            row3.getCell(8).setCellValue("weekday");
            row3.getCell(8).setCellStyle(headerStyle6);
            
            // Amounts - AV
            row3.getCell(9).setCellValue("WP UK");
            row3.getCell(10).setCellValue("WP Bankcard");
            row3.getCell(11).setCellValue("Amex");
            row3.getCell(12).setCellValue("Discover");
            row3.getCell(13).setCellValue("Total");
            row3.getCell(13).setCellStyle(headerStyle8);
            
            row3.getCell(9).setCellStyle(headerStyle7);
            row3.getCell(10).setCellStyle(headerStyle7);
            row3.getCell(11).setCellStyle(headerStyle7);
            row3.getCell(12).setCellStyle(headerStyle7);

            // Amounts - TA
            row3.getCell(14).setCellValue("WP UK");
            row3.getCell(15).setCellValue("WP Bankcard");
            row3.getCell(16).setCellValue("Amex");
            row3.getCell(17).setCellValue("Discover");
            
            row3.getCell(14).setCellStyle(headerStyle9);
            row3.getCell(15).setCellStyle(headerStyle9);
            row3.getCell(16).setCellStyle(headerStyle9);
            row3.getCell(17).setCellStyle(headerStyle9);
            
            row3.getCell(18).setCellValue("Total");
            row3.getCell(18).setCellStyle(headerStyle8);

            // Averages - AV
            row3.getCell(20).setCellValue("WP UK");
            row3.getCell(21).setCellValue("WP Bankcard");
            row3.getCell(22).setCellValue("Amex");
            row3.getCell(23).setCellValue("Discover");
            
            row3.getCell(20).setCellStyle(headerStyle10);
            row3.getCell(21).setCellStyle(headerStyle10);
            row3.getCell(22).setCellStyle(headerStyle10);
            row3.getCell(23).setCellStyle(headerStyle10);
            
            row3.getCell(24).setCellValue("Total");
            row3.getCell(24).setCellStyle(headerStyle8);

            // Averages - TA
            row3.getCell(25).setCellValue("WP UK");
            row3.getCell(26).setCellValue("WP Bankcard");
            row3.getCell(27).setCellValue("Amex");
            row3.getCell(28).setCellValue("Discover");
            
            row3.getCell(25).setCellStyle(headerStyle11);
            row3.getCell(26).setCellStyle(headerStyle11);
            row3.getCell(27).setCellStyle(headerStyle11);
            row3.getCell(28).setCellStyle(headerStyle11);
            
            row3.getCell(29).setCellValue("Total");
            row3.getCell(29).setCellStyle(headerStyle8);

            // Variation - AV
            row3.getCell(31).setCellValue("WP UK");
            row3.getCell(32).setCellValue("WP Bankcard");
            row3.getCell(33).setCellValue("Amex");
            row3.getCell(34).setCellValue("Discover");
            
            row3.getCell(31).setCellStyle(headerStyle12);
            row3.getCell(32).setCellStyle(headerStyle12);
            row3.getCell(33).setCellStyle(headerStyle12);
            row3.getCell(34).setCellStyle(headerStyle12);
            
            row3.getCell(35).setCellValue("Total");
            row3.getCell(35).setCellStyle(headerStyle8);

            // Variation - TA
            row3.getCell(36).setCellValue("WP UK");
            row3.getCell(37).setCellValue("WP Bankcard");
            row3.getCell(38).setCellValue("Amex");
            row3.getCell(39).setCellValue("Discover");
            
            row3.getCell(36).setCellStyle(headerStyle13);
            row3.getCell(37).setCellStyle(headerStyle13);
            row3.getCell(38).setCellStyle(headerStyle13);
            row3.getCell(39).setCellStyle(headerStyle13);
            
            row3.getCell(40).setCellValue("Total");
            row3.getCell(40).setCellStyle(headerStyle8);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.DAY_NAME);
                dataRow.createCell(1).setCellValue(data.MONTH_NAME);

                // Holidays
                dataRow.createCell(2).setCellValue(data.HOLIDAY_WP_UK);
                dataRow.createCell(3).setCellValue(data.HOLIDAY_WP_BANCARD);
                dataRow.createCell(4).setCellValue(data.HOLIDAY_AMEX);
                dataRow.createCell(5).setCellValue(data.HOLIDAY_DISCOVER);

                // Reference Dates
                dataRow.createCell(6).setCellValue(data.DATE_FROM);
                dataRow.createCell(7).setCellValue(data.NUMBER_WEAK);
                dataRow.createCell(8).setCellValue(data.DAY_NUMBER_EKED);

                // Amounts - AV
                dataRow.createCell(9).setCellValue(data.AMOUNT_WP_UK_CO);
                dataRow.createCell(10).setCellValue(data.AMOUNT_BANCARD_CO);
                dataRow.createCell(11).setCellValue(data.AMOUNT_AMEX_CO);
                dataRow.createCell(12).setCellValue(data.AMOUNT_DISCOVER_CO);
                dataRow.createCell(13).setCellValue(data.TOTAL_CO);

                // Amounts - TA
                dataRow.createCell(14).setCellValue(data.AMOUNT_WP_UK_SA);
                dataRow.createCell(15).setCellValue(data.AMOUNT_BANCARD_SA);
                dataRow.createCell(16).setCellValue(data.AMOUNT_AMEX_SA);
                dataRow.createCell(17).setCellValue(data.AMOUNT_DISCOVER_SA);
                dataRow.createCell(18).setCellValue(data.TOTAL_SA);
                
                dataRow.createCell(19).setCellValue(data.TOTAL_CO_AND_SA);

                // Averages - AV
                dataRow.createCell(20).setCellValue(data.AVG_WP_UK_CO);
                dataRow.createCell(21).setCellValue(data.AVG_BANCARD_CO);
                dataRow.createCell(22).setCellValue(data.AVG_AMEX_CO);
                dataRow.createCell(23).setCellValue(data.AVG_DISCOVER_CO);
                dataRow.createCell(24).setCellValue(data.AVG_TOTAL_CO);

                // Averages - TA
                dataRow.createCell(25).setCellValue(data.AVG_WP_UK_SA);
                dataRow.createCell(26).setCellValue(data.AVG_BANCARD_SA);
                dataRow.createCell(27).setCellValue(data.AVG_AMEX_SA);
                dataRow.createCell(28).setCellValue(data.AVG_DISCOVER_SA);
                dataRow.createCell(29).setCellValue(data.AVG_TOTAL_SA);
                
                dataRow.createCell(30).setCellValue(data.AVG_TOTAL_CO_SA);

                // Variation - AV
                dataRow.createCell(31).setCellValue(data.VAR_WP_UK_CO);
                dataRow.createCell(32).setCellValue(data.VAR_BANCARD_CO);
                dataRow.createCell(33).setCellValue(data.VAR_AMEX_CO);
                dataRow.createCell(34).setCellValue(data.VAR_DISCOVER_CO);
                dataRow.createCell(35).setCellValue(data.VAR_TOTAL_CO);

                // Variation - TA
                dataRow.createCell(36).setCellValue(data.VAR_WP_UK_SA);
                dataRow.createCell(37).setCellValue(data.VAR_BANCARD_SA);
                dataRow.createCell(38).setCellValue(data.VAR_AMEX_SA);
                dataRow.createCell(39).setCellValue(data.VAR_DISCOVER_SA);
                dataRow.createCell(40).setCellValue(data.VAR_TOTAL_SA);
                
                dataRow.createCell(41).setCellValue(data.VAR_TOTAL_CO_SA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 2; i <= 41; i++) {
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 41; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchUsaflowDiaryDetail")
    public @ResponseBody
    String searchUsaflowDiaryDetail(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchUsaflowDiaryDetail-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchUsaflowDiaryDetail(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchTacaflowDiaryDetail")
    public @ResponseBody
    String searchTacaflowDiaryDetail(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchTacaflowDiaryDetail-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchTacaflowDiaryDetail(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchTotalUsaflowDiaryDetail")
    public @ResponseBody
    String searchTotalConciliation(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Bank Statement : searchTotalUsaflowDiaryDetail-------------");
        map.put("success", true);
        List<A2356Filter> lst2 = this.getListTotalConciliation_Bard(request, false);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }
    
    public List<A2356Filter> getListTotalConciliation_Bard(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankStatementExtractLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.getListTotalConciliation_Bard(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchTotalTacaflowDiaryDetail")
    public @ResponseBody
    String searchTotalTacaConciliation(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Bank Statement : searchTotalTacaConciliation-------------");
        map.put("success", true);
        List<A2356Filter> lst2 = this.getListTotalConciliation_BardTaca(request, false);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }
    
    public List<A2356Filter> getListTotalConciliation_BardTaca(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankStatementExtractLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.getListTotalConciliation_BardTaca(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getXLSXUsaflowDiaryDetail")
    public @ResponseBody void getXLSXUsaflowDiaryDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXUsaflowDiaryDetail");
        String fileNameDownload = String.format("Fiduciary Alerts Usaflow Diary Detail Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchUsaflowDiaryDetail(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(58, 31, 28)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);
            
            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 122, 122)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);
            
            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);
            
            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);
            
            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);
            
            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);
            
            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);
            
            headerStyle13.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle13.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle13.setBottomBorderColor(IndexedColors.BLACK  .getIndex());
            headerStyle13.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle13.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle13.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle13.setFillForegroundColor(new XSSFColor(new java.awt.Color(144, 158, 173)));
            headerStyle13.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle13.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle13.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 49; i++) {
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Reference Dates");
            row1.getCell(0).setCellStyle(headerStyle);
            
            row1.getCell(1).setCellValue("Curr");
            row1.getCell(1).setCellStyle(headerStyle);
            
            row1.getCell(2).setCellValue("Amounts");
            row1.getCell(2).setCellStyle(headerStyle);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 3, 1, 1)); // Curr
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 49)); // Amounts
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 49; i++) {
                row2.createCell(i);
            }

            // Holidays - Columnas específicas
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle);
            
            row2.getCell(2).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(2).setCellStyle(headerStyle2);
            
            row2.getCell(26).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(26).setCellStyle(headerStyle3);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 3, 0, 0)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 25)); // USAVflow II Colombian NY Pass Through (AV)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 49)); // USAVflow II Salvadorian NY Pass Through (TA)

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 49; i++) {
                row3.createCell(i);
            }

            row3.getCell(2).setCellValue("WK UK");
            row3.getCell(2).setCellStyle(headerStyle4);
            
            row3.getCell(8).setCellValue("WP Bancard");
            row3.getCell(8).setCellStyle(headerStyle5);
            
            row3.getCell(14).setCellValue("Amex");
            row3.getCell(14).setCellStyle(headerStyle6);
            
            row3.getCell(20).setCellValue("Discover");
            row3.getCell(20).setCellStyle(headerStyle7);
            
            row3.getCell(26).setCellValue("WK UK");
            row3.getCell(26).setCellStyle(headerStyle4);
            
            row3.getCell(32).setCellValue("WK Bancard");
            row3.getCell(32).setCellStyle(headerStyle5);
            
            row3.getCell(38).setCellValue("Amex");
            row3.getCell(38).setCellStyle(headerStyle6);
            
            row3.getCell(44).setCellValue("Discover");
            row3.getCell(44).setCellStyle(headerStyle7);
            
            // Combinar celdas de nivel 3
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 7)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 13)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 19)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 20, 25)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 31)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 32, 37)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 38, 43)); 
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 44, 49)); 

            // ====== Nivel 4 (Subcolumnas) ==========
            Row row4 = sheet.createRow(++vj);
            for (int i = 0; i <= 49; i++) {
                row4.createCell(i);
            }

            row4.getCell(2).setCellValue("Statement");
            row4.getCell(2).setCellStyle(headerStyle4);
            
            row4.getCell(3).setCellValue("Commission");
            row4.getCell(3).setCellStyle(headerStyle4);
            
            row4.getCell(4).setCellValue("Others");
            row4.getCell(4).setCellStyle(headerStyle4);
            
            row4.getCell(5).setCellValue("Settlement");
            row4.getCell(5).setCellStyle(headerStyle4);
            
            row4.getCell(6).setCellValue("Sales");
            row4.getCell(6).setCellStyle(headerStyle4);
            
            row4.getCell(7).setCellValue("Rate");
            row4.getCell(7).setCellStyle(headerStyle4);
            
            row4.getCell(8).setCellValue("Statement");
            row4.getCell(8).setCellStyle(headerStyle5);
            
            row4.getCell(9).setCellValue("Commission");
            row4.getCell(9).setCellStyle(headerStyle5);
            
            row4.getCell(10).setCellValue("Others");
            row4.getCell(10).setCellStyle(headerStyle5);
            
            row4.getCell(11).setCellValue("Settlement");
            row4.getCell(11).setCellStyle(headerStyle5);
            
            row4.getCell(12).setCellValue("Sales");
            row4.getCell(12).setCellStyle(headerStyle5);
            
            row4.getCell(13).setCellValue("Rate");
            row4.getCell(13).setCellStyle(headerStyle5);
            
            row4.getCell(14).setCellValue("Statement");
            row4.getCell(14).setCellStyle(headerStyle6);
            
            row4.getCell(15).setCellValue("Commission");
            row4.getCell(15).setCellStyle(headerStyle6);
            
            row4.getCell(16).setCellValue("Others");
            row4.getCell(16).setCellStyle(headerStyle6);
            
            row4.getCell(17).setCellValue("Settlement");
            row4.getCell(17).setCellStyle(headerStyle6);
            
            row4.getCell(18).setCellValue("Sales");
            row4.getCell(18).setCellStyle(headerStyle6);
            
            row4.getCell(19).setCellValue("Rate");
            row4.getCell(19).setCellStyle(headerStyle6);
            
            row4.getCell(20).setCellValue("Statement");
            row4.getCell(20).setCellStyle(headerStyle7);
            
            row4.getCell(21).setCellValue("Commission");
            row4.getCell(21).setCellStyle(headerStyle7);
            
            row4.getCell(22).setCellValue("Others");
            row4.getCell(22).setCellStyle(headerStyle7);
            
            row4.getCell(23).setCellValue("Settlement");
            row4.getCell(23).setCellStyle(headerStyle7);
            
            row4.getCell(24).setCellValue("Sales");
            row4.getCell(24).setCellStyle(headerStyle7);
            
            row4.getCell(25).setCellValue("Rate");
            row4.getCell(25).setCellStyle(headerStyle7);
            
            row4.getCell(26).setCellValue("Statement");
            row4.getCell(26).setCellStyle(headerStyle4);
            
            row4.getCell(27).setCellValue("Commission");
            row4.getCell(27).setCellStyle(headerStyle4);
            
            row4.getCell(28).setCellValue("Others");
            row4.getCell(28).setCellStyle(headerStyle4);
            
            row4.getCell(29).setCellValue("Settlement");
            row4.getCell(29).setCellStyle(headerStyle4);
            
            row4.getCell(30).setCellValue("Sales");
            row4.getCell(30).setCellStyle(headerStyle4);
            
            row4.getCell(31).setCellValue("Rate");
            row4.getCell(31).setCellStyle(headerStyle4);
            
            row4.getCell(32).setCellValue("Statement");
            row4.getCell(32).setCellStyle(headerStyle5);
            
            row4.getCell(33).setCellValue("Commission");
            row4.getCell(33).setCellStyle(headerStyle5);
            
            row4.getCell(34).setCellValue("Others");
            row4.getCell(34).setCellStyle(headerStyle5);
            
            row4.getCell(35).setCellValue("Settlement");
            row4.getCell(35).setCellStyle(headerStyle5);
            
            row4.getCell(36).setCellValue("Sales");
            row4.getCell(36).setCellStyle(headerStyle5);
            
            row4.getCell(37).setCellValue("Rate");
            row4.getCell(37).setCellStyle(headerStyle5);
            
            row4.getCell(38).setCellValue("Statement");
            row4.getCell(38).setCellStyle(headerStyle6);
            
            row4.getCell(39).setCellValue("Commission");
            row4.getCell(39).setCellStyle(headerStyle6);
            
            row4.getCell(40).setCellValue("Others");
            row4.getCell(40).setCellStyle(headerStyle6);
            
            row4.getCell(41).setCellValue("Settlement");
            row4.getCell(41).setCellStyle(headerStyle6);
            
            row4.getCell(42).setCellValue("Sales");
            row4.getCell(42).setCellStyle(headerStyle6);
            
            row4.getCell(43).setCellValue("Rate");
            row4.getCell(43).setCellStyle(headerStyle6);
            
            row4.getCell(44).setCellValue("Statement");
            row4.getCell(44).setCellStyle(headerStyle7);
            
            row4.getCell(45).setCellValue("Commission");
            row4.getCell(45).setCellStyle(headerStyle7);
            
            row4.getCell(46).setCellValue("Others");
            row4.getCell(46).setCellStyle(headerStyle7);
            
            row4.getCell(47).setCellValue("Settlement");
            row4.getCell(47).setCellStyle(headerStyle7);
            
            row4.getCell(48).setCellValue("Sales");
            row4.getCell(48).setCellStyle(headerStyle7);
            
            row4.getCell(49).setCellValue("Rate");
            row4.getCell(49).setCellStyle(headerStyle7);
            
            // Combinar celdas de nivel 4
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 2, 2)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 3, 3)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 4, 4)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 5, 5)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 6, 6)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 7, 7)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 8, 8)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 9, 9)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 10, 10)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 11, 11)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 12, 12)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 13, 13)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 14, 14)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 15, 15)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 16, 16)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 17, 17)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 18, 18)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 19, 19)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 20, 20)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 21, 21)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 22, 22)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 23, 23)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 24, 24)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 25, 25)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 26, 26)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 27, 27)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 28, 28)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 29, 29)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 30, 30)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 31, 31)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 32, 32)); 

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                dataRow.createCell(0).setCellValue(data.DATE_FROM);
                dataRow.createCell(1).setCellValue(data.CURRENCY);

                dataRow.createCell(2).setCellValue(data.STATEMENT_WP_UK_CO);
                dataRow.createCell(3).setCellValue(data.COMISION_WP_UK_CO_SUM);
                dataRow.createCell(4).setCellValue(data.OTHERS_WP_UK_CO);
                dataRow.createCell(5).setCellValue(data.SETTLEMENT_WP_UK_CO);
                dataRow.createCell(6).setCellValue(data.SALE_WP_UK_CO);
                dataRow.createCell(7).setCellValue(data.VAR_WP_CO);

                dataRow.createCell(8).setCellValue(data.STATEMENT_BANCARD_CO);
                dataRow.createCell(9).setCellValue(data.COMISION_BANCARD_CO_SUM);
                dataRow.createCell(10).setCellValue(data.OTHERS_BANCARD_CO);
                dataRow.createCell(11).setCellValue(data.SETTLEMENT_BANCARD_CO);
                dataRow.createCell(12).setCellValue(data.SALE_BANCARD_CO);
                dataRow.createCell(13).setCellValue(data.VAR_BANCARD_CO);
                
                dataRow.createCell(14).setCellValue(data.STATEMENT_AMEX_CO);
                dataRow.createCell(15).setCellValue(data.COMISION_AMEX_CO_SUM);
                dataRow.createCell(16).setCellValue(data.OTHERS_AMEX_CO);
                dataRow.createCell(17).setCellValue(data.SETTLEMENT_AMEX_CO);
                dataRow.createCell(18).setCellValue(data.SALE_AMEX_CO);
                dataRow.createCell(19).setCellValue(data.VAR_AMEX_CO);
                
                dataRow.createCell(20).setCellValue(data.STATEMENT_DISCOVER_CO);
                dataRow.createCell(21).setCellValue(data.COMISION_DISCOVER_CO_SUM);
                dataRow.createCell(22).setCellValue(data.OTHERS_DISCOVER_CO);
                dataRow.createCell(23).setCellValue(data.SETTLEMENT_DISCOVER_CO);
                dataRow.createCell(24).setCellValue(data.SALE_DISCOVER_CO);
                dataRow.createCell(25).setCellValue(data.VAR_DISCOVER_CO);
                
                dataRow.createCell(26).setCellValue(data.STATEMENT_WP_UK_SA);
                dataRow.createCell(27).setCellValue(data.COMISION_WP_UK_SA_SUM);
                dataRow.createCell(28).setCellValue(data.OTHERS_WP_UK_SA);
                dataRow.createCell(29).setCellValue(data.SETTLEMENT_WP_UK_SA);
                dataRow.createCell(30).setCellValue(data.SALE_WP_UK_SA);
                dataRow.createCell(31).setCellValue(data.VAR_WP_SA);
                
                dataRow.createCell(32).setCellValue(data.STATEMENT_BANCARD_SA);
                dataRow.createCell(33).setCellValue(data.COMISION_BANCARD_SA_SUM);
                dataRow.createCell(34).setCellValue(data.OTHERS_BANCARD_SA);
                dataRow.createCell(35).setCellValue(data.SETTLEMENT_BANCARD_SA);
                dataRow.createCell(36).setCellValue(data.SALE_BANCARD_SA);
                dataRow.createCell(37).setCellValue(data.VAR_BANCARD_SA);
                
                dataRow.createCell(38).setCellValue(data.STATEMENT_AMEX_SA);
                dataRow.createCell(39).setCellValue(data.COMISION_AMEX_SA_SUM);
                dataRow.createCell(40).setCellValue(data.OTHERS_AMEX_SA);
                dataRow.createCell(41).setCellValue(data.SETTLEMENT_AMEX_SA);
                dataRow.createCell(42).setCellValue(data.SALE_AMEX_SA);
                dataRow.createCell(43).setCellValue(data.VAR_AMEX_SA);
                
                dataRow.createCell(44).setCellValue(data.STATEMENT_DISCOVER_SA);
                dataRow.createCell(45).setCellValue(data.COMISION_DISCOVER_SA_SUM);
                dataRow.createCell(46).setCellValue(data.OTHERS_DISCOVER_SA);
                dataRow.createCell(47).setCellValue(data.SETTLEMENT_DISCOVER_SA);
                dataRow.createCell(48).setCellValue(data.SALE_DISCOVER_SA);
                dataRow.createCell(49).setCellValue(data.VAR_DISCOVER_SA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 2; i <= 49; i++) {
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 49; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "getXLSXTacaflowDiaryDetail")
    public @ResponseBody void getXLSXTacaflowDiaryDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXTacaflowDiaryDetail");
        String fileNameDownload = String.format("Fiduciary Alerts Tacaflow Diary Detail Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchTacaflowDiaryDetail(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(58, 31, 28)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 49; i++) {
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Reference Dates");
            row1.getCell(0).setCellStyle(headerStyle);
            
            row1.getCell(1).setCellValue("Curr");
            row1.getCell(1).setCellStyle(headerStyle);
            
            row1.getCell(2).setCellValue("Amounts");
            row1.getCell(2).setCellStyle(headerStyle);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 3, 1, 1)); // Curr
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 7)); // Amounts
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 49; i++) {
                row2.createCell(i);
            }

            // Holidays - Columnas específicas
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle);
            
            row2.getCell(2).setCellValue("Tacaflow");
            row2.getCell(2).setCellStyle(headerStyle2);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 3, 0, 0)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 7)); // USAVflow II Colombian NY Pass Through (AV)

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 49; i++) {
                row3.createCell(i);
            }

            row3.getCell(2).setCellValue("Tacaflow");
            row3.getCell(2).setCellStyle(headerStyle4);
            
            // Combinar celdas de nivel 3
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 7)); 

            // ====== Nivel 4 (Subcolumnas) ==========
            Row row4 = sheet.createRow(++vj);
            for (int i = 0; i <= 49; i++) {
                row4.createCell(i);
            }

            row4.getCell(2).setCellValue("Statement");
            row4.getCell(2).setCellStyle(headerStyle4);
            
            row4.getCell(3).setCellValue("Commission");
            row4.getCell(3).setCellStyle(headerStyle4);
            
            row4.getCell(4).setCellValue("Others");
            row4.getCell(4).setCellStyle(headerStyle4);
            
            row4.getCell(5).setCellValue("Settlement");
            row4.getCell(5).setCellStyle(headerStyle4);
            
            row4.getCell(6).setCellValue("Sales");
            row4.getCell(6).setCellStyle(headerStyle4);
            
            row4.getCell(7).setCellValue("Rate");
            row4.getCell(7).setCellStyle(headerStyle4);
            
            // Combinar celdas de nivel 4
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 2, 2)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 3, 3)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 4, 4)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 5, 5)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 6, 6)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 7, 7)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 8, 8)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 9, 9)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 10, 10)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 11, 11)); 
            sheet.addMergedRegion(new CellRangeAddress(3, 3, 12, 12)); 

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                dataRow.createCell(0).setCellValue(data.DATE_FROM);
                dataRow.createCell(1).setCellValue(data.CURRENCY);

                dataRow.createCell(2).setCellValue(data.STATEMENT_TACA);
                dataRow.createCell(3).setCellValue(data.COMISION_TACA);
                dataRow.createCell(4).setCellValue(data.OTHERS_TACA);
                dataRow.createCell(5).setCellValue(data.SETTLEMENT_TACA);
                dataRow.createCell(6).setCellValue(data.SALE_TACA);
                dataRow.createCell(7).setCellValue(data.VAR_TACA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 2; i <= 7; i++) {
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 49; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchUsaflowWeekly")
    public @ResponseBody
    String searchUsaflowWeekly(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchUsaflowWeekly-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchUsaflowWeekly(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXMainUsaflowWeekly")
    public @ResponseBody void getXLSXMainUsaflowWeekly(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Fiduciary Alerts Usaflow Weekly Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;
            String beanString = "";
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchUsaflowWeekly(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            headerStyle13.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle13.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle13.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle13.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle13.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle13.setFillForegroundColor(new XSSFColor(new java.awt.Color(144, 158, 173)));
            headerStyle13.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle13.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle13.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row1.createCell(i);
            }

            // Removed DAY, MONTH, HOLIDAYS headers

            row1.getCell(0).setCellValue("Reference Dates");
            row1.getCell(0).setCellStyle(headerStyle6);

            row1.getCell(3).setCellValue("Amounts");
            row1.getCell(3).setCellStyle(headerStyle7);

            row1.getCell(14).setCellValue("Averages");
            row1.getCell(14).setCellStyle(headerStyle10);

            row1.getCell(25).setCellValue("Variation (%)");
            row1.getCell(25).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 13)); // Amounts
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 24)); // Averages
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 35)); // Variation (%)
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row2.createCell(i);
            }

            // Reference Dates - Columnas específicas
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle6);

            row2.getCell(1).setCellValue("To");
            row2.getCell(1).setCellStyle(headerStyle6);

            row2.getCell(2).setCellValue("Week");
            row2.getCell(2).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(3).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(3).setCellStyle(headerStyle7);

            row2.getCell(8).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(8).setCellStyle(headerStyle9);

            row2.getCell(13).setCellValue("Grand Total");
            row2.getCell(13).setCellStyle(headerStyle8);

            // Averages
            row2.getCell(14).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(14).setCellStyle(headerStyle10);

            row2.getCell(19).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(19).setCellStyle(headerStyle11);

            row2.getCell(24).setCellValue("Grand Total");
            row2.getCell(24).setCellStyle(headerStyle8);

            // Variation (%)
            row2.getCell(25).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(25).setCellStyle(headerStyle12);

            row2.getCell(30).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(30).setCellStyle(headerStyle13);

            row2.getCell(35).setCellValue("Grand Total");
            row2.getCell(35).setCellStyle(headerStyle8);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // AV en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1)); // TA en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // Grand Total en Amounts

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 7)); // AV en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 12)); // TA en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13)); // Grand Total en Averages

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 18)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 23)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24)); // Grand Total en Variation
            
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 29)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 30, 34)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 35, 35)); // Grand Total en Variation

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 40; i++) {
                row3.createCell(i);
            }

            // Amounts - AV
            row3.getCell(3).setCellValue("WP UK");
            row3.getCell(4).setCellValue("WP Bankcard");
            row3.getCell(5).setCellValue("Amex");
            row3.getCell(6).setCellValue("Discover");
            row3.getCell(7).setCellValue("Total");
            row3.getCell(7).setCellStyle(headerStyle8);

            row3.getCell(3).setCellStyle(headerStyle7);
            row3.getCell(4).setCellStyle(headerStyle7);
            row3.getCell(5).setCellStyle(headerStyle7);
            row3.getCell(6).setCellStyle(headerStyle7);

            // Amounts - TA
            row3.getCell(8).setCellValue("WP UK");
            row3.getCell(9).setCellValue("WP Bankcard");
            row3.getCell(10).setCellValue("Amex");
            row3.getCell(11).setCellValue("Discover");

            row3.getCell(8).setCellStyle(headerStyle9);
            row3.getCell(9).setCellStyle(headerStyle9);
            row3.getCell(10).setCellStyle(headerStyle9);
            row3.getCell(11).setCellStyle(headerStyle9);

            row3.getCell(12).setCellValue("Total");
            row3.getCell(12).setCellStyle(headerStyle8);

            // Averages - AV
            row3.getCell(14).setCellValue("WP UK");
            row3.getCell(15).setCellValue("WP Bankcard");
            row3.getCell(16).setCellValue("Amex");
            row3.getCell(17).setCellValue("Discover");

            row3.getCell(14).setCellStyle(headerStyle10);
            row3.getCell(15).setCellStyle(headerStyle10);
            row3.getCell(16).setCellStyle(headerStyle10);
            row3.getCell(17).setCellStyle(headerStyle10);

            row3.getCell(18).setCellValue("Total");
            row3.getCell(18).setCellStyle(headerStyle8);

            // Averages - TA
            row3.getCell(19).setCellValue("WP UK");
            row3.getCell(20).setCellValue("WP Bankcard");
            row3.getCell(21).setCellValue("Amex");
            row3.getCell(22).setCellValue("Discover");

            row3.getCell(19).setCellStyle(headerStyle11);
            row3.getCell(20).setCellStyle(headerStyle11);
            row3.getCell(21).setCellStyle(headerStyle11);
            row3.getCell(22).setCellStyle(headerStyle11);

            row3.getCell(23).setCellValue("Total");
            row3.getCell(23).setCellStyle(headerStyle8);

            // Variation - AV
            row3.getCell(25).setCellValue("WP UK");
            row3.getCell(26).setCellValue("WP Bankcard");
            row3.getCell(27).setCellValue("Amex");
            row3.getCell(28).setCellValue("Discover");

            row3.getCell(25).setCellStyle(headerStyle12);
            row3.getCell(26).setCellStyle(headerStyle12);
            row3.getCell(27).setCellStyle(headerStyle12);
            row3.getCell(28).setCellStyle(headerStyle12);

            row3.getCell(29).setCellValue("Total");
            row3.getCell(29).setCellStyle(headerStyle8);

            // Variation - TA
            row3.getCell(30).setCellValue("WP UK");
            row3.getCell(31).setCellValue("WP Bankcard");
            row3.getCell(32).setCellValue("Amex");
            row3.getCell(33).setCellValue("Discover");

            row3.getCell(30).setCellStyle(headerStyle13);
            row3.getCell(31).setCellStyle(headerStyle13);
            row3.getCell(32).setCellStyle(headerStyle13);
            row3.getCell(33).setCellStyle(headerStyle13);

            row3.getCell(34).setCellValue("Total");
            row3.getCell(34).setCellStyle(headerStyle8);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Reference Dates
                dataRow.createCell(0).setCellValue(data.WEEK_START_DATE);
                dataRow.createCell(1).setCellValue(data.WEEK_END_DATE); // This is now labeled "To"
                dataRow.createCell(2).setCellValue(data.NUMBERWEAK); // This is now labeled "Week"

                // Amounts - AV
                dataRow.createCell(3).setCellValue(data.AMOUNT_WP_UK_CO);
                dataRow.createCell(4).setCellValue(data.AMOUNT_BANCARD_CO);
                dataRow.createCell(5).setCellValue(data.AMOUNT_AMEX_CO);
                dataRow.createCell(6).setCellValue(data.AMOUNT_DISCOVER_CO);
                dataRow.createCell(7).setCellValue(data.TOTAL_CO);

                // Amounts - TA
                dataRow.createCell(8).setCellValue(data.AMOUNT_WP_UK_SA);
                dataRow.createCell(9).setCellValue(data.AMOUNT_BANCARD_SA);
                dataRow.createCell(10).setCellValue(data.AMOUNT_AMEX_SA);
                dataRow.createCell(11).setCellValue(data.AMOUNT_DISCOVER_SA);
                dataRow.createCell(12).setCellValue(data.TOTAL_SA);

                dataRow.createCell(13).setCellValue(data.TOTAL_CO_AND_SA);

                // Averages - AV
                dataRow.createCell(14).setCellValue(data.AVG_WP_UK_CO);
                dataRow.createCell(15).setCellValue(data.AVG_BANCARD_CO);
                dataRow.createCell(16).setCellValue(data.AVG_AMEX_CO);
                dataRow.createCell(17).setCellValue(data.AVG_DISCOVER_CO);
                dataRow.createCell(18).setCellValue(data.AVG_TOTAL_CO);

                // Averages - TA
                dataRow.createCell(19).setCellValue(data.AVG_WP_UK_SA);
                dataRow.createCell(20).setCellValue(data.AVG_BANCARD_SA);
                dataRow.createCell(21).setCellValue(data.AVG_AMEX_SA);
                dataRow.createCell(22).setCellValue(data.AVG_DISCOVER_SA);
                dataRow.createCell(23).setCellValue(data.AVG_TOTAL_SA);

                dataRow.createCell(24).setCellValue(data.AVG_TOTAL_CO_SA);

                // Variation - AV
                dataRow.createCell(25).setCellValue(data.VAR_WP_UK_CO);
                dataRow.createCell(26).setCellValue(data.VAR_BANCARD_CO);
                dataRow.createCell(27).setCellValue(data.VAR_AMEX_CO);
                dataRow.createCell(28).setCellValue(data.VAR_DISCOVER_CO);
                dataRow.createCell(29).setCellValue(data.VAR_TOTAL_CO);

                // Variation - TA
                dataRow.createCell(30).setCellValue(data.VAR_WP_UK_SA);
                dataRow.createCell(31).setCellValue(data.VAR_BANCARD_SA);
                dataRow.createCell(32).setCellValue(data.VAR_AMEX_SA);
                dataRow.createCell(33).setCellValue(data.VAR_DISCOVER_SA);
                dataRow.createCell(34).setCellValue(data.VAR_TOTAL_SA);

                dataRow.createCell(35).setCellValue(data.VAR_TOTAL_CO_SA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 35; i++) { // Changed from 2 to 6 since we removed the first columns
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 41; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchUsaflowWeeklyHistoric")
    public @ResponseBody
    String searchUsaflowWeeklyHistoric(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchUsaflowWeeklyHistoric-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchUsaflowWeeklyHistoric(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXMainUsaflowWeeklyHistoric")
    public @ResponseBody void getXLSXMainUsaflowWeeklyHistoric(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Fiduciary Alerts Usaflow Weekly Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;
            String beanString = "";
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchUsaflowWeeklyHistoric(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle13 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle14 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            headerStyle13.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle13.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle13.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle13.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle13.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle13.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle13.setFillForegroundColor(new XSSFColor(new java.awt.Color(144, 158, 173)));
            headerStyle13.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle13.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle13.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row1.createCell(i);
            }

            // Removed DAY, MONTH, HOLIDAYS headers

            row1.getCell(0).setCellValue("Reference Dates");
            row1.getCell(0).setCellStyle(headerStyle6);

            row1.getCell(3).setCellValue("Amounts");
            row1.getCell(3).setCellStyle(headerStyle7);

            row1.getCell(14).setCellValue("Averages");
            row1.getCell(14).setCellStyle(headerStyle10);

            row1.getCell(25).setCellValue("Variation (%)");
            row1.getCell(25).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2)); // Reference Dates
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 13)); // Amounts
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 24)); // Averages
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 35)); // Variation (%)
            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 41; i++) {
                row2.createCell(i);
            }

            // Reference Dates - Columnas específicas
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle6);

            row2.getCell(1).setCellValue("To");
            row2.getCell(1).setCellStyle(headerStyle6);

            row2.getCell(2).setCellValue("Week");
            row2.getCell(2).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(3).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(3).setCellStyle(headerStyle7);

            row2.getCell(8).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(8).setCellStyle(headerStyle9);

            row2.getCell(13).setCellValue("Grand Total");
            row2.getCell(13).setCellStyle(headerStyle8);

            // Averages
            row2.getCell(14).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(14).setCellStyle(headerStyle10);

            row2.getCell(19).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(19).setCellStyle(headerStyle11);

            row2.getCell(24).setCellValue("Grand Total");
            row2.getCell(24).setCellStyle(headerStyle8);

            // Variation (%)
            row2.getCell(25).setCellValue("USAVflow II Colombian NY Pass Through (AV)");
            row2.getCell(25).setCellStyle(headerStyle12);

            row2.getCell(30).setCellValue("USAVflow II Salvadorian NY Pass Through (TA)");
            row2.getCell(30).setCellStyle(headerStyle13);

            row2.getCell(35).setCellValue("Grand Total");
            row2.getCell(35).setCellStyle(headerStyle8);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // AV en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1)); // TA en Amounts
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // Grand Total en Amounts

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 7)); // AV en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 12)); // TA en Averages
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13)); // Grand Total en Averages

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 18)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 23)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24)); // Grand Total en Variation
            
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 29)); // AV en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 30, 34)); // TA en Variation
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 35, 35)); // Grand Total en Variation

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 40; i++) {
                row3.createCell(i);
            }

            // Amounts - AV
            row3.getCell(3).setCellValue("WP UK");
            row3.getCell(4).setCellValue("WP Bankcard");
            row3.getCell(5).setCellValue("Amex");
            row3.getCell(6).setCellValue("Discover");
            row3.getCell(7).setCellValue("Total");
            row3.getCell(7).setCellStyle(headerStyle8);

            row3.getCell(3).setCellStyle(headerStyle7);
            row3.getCell(4).setCellStyle(headerStyle7);
            row3.getCell(5).setCellStyle(headerStyle7);
            row3.getCell(6).setCellStyle(headerStyle7);

            // Amounts - TA
            row3.getCell(8).setCellValue("WP UK");
            row3.getCell(9).setCellValue("WP Bankcard");
            row3.getCell(10).setCellValue("Amex");
            row3.getCell(11).setCellValue("Discover");

            row3.getCell(8).setCellStyle(headerStyle9);
            row3.getCell(9).setCellStyle(headerStyle9);
            row3.getCell(10).setCellStyle(headerStyle9);
            row3.getCell(11).setCellStyle(headerStyle9);

            row3.getCell(12).setCellValue("Total");
            row3.getCell(12).setCellStyle(headerStyle8);

            // Averages - AV
            row3.getCell(14).setCellValue("WP UK");
            row3.getCell(15).setCellValue("WP Bankcard");
            row3.getCell(16).setCellValue("Amex");
            row3.getCell(17).setCellValue("Discover");

            row3.getCell(14).setCellStyle(headerStyle10);
            row3.getCell(15).setCellStyle(headerStyle10);
            row3.getCell(16).setCellStyle(headerStyle10);
            row3.getCell(17).setCellStyle(headerStyle10);

            row3.getCell(18).setCellValue("Total");
            row3.getCell(18).setCellStyle(headerStyle8);

            // Averages - TA
            row3.getCell(19).setCellValue("WP UK");
            row3.getCell(20).setCellValue("WP Bankcard");
            row3.getCell(21).setCellValue("Amex");
            row3.getCell(22).setCellValue("Discover");

            row3.getCell(19).setCellStyle(headerStyle11);
            row3.getCell(20).setCellStyle(headerStyle11);
            row3.getCell(21).setCellStyle(headerStyle11);
            row3.getCell(22).setCellStyle(headerStyle11);

            row3.getCell(23).setCellValue("Total");
            row3.getCell(23).setCellStyle(headerStyle8);

            // Variation - AV
            row3.getCell(25).setCellValue("WP UK");
            row3.getCell(26).setCellValue("WP Bankcard");
            row3.getCell(27).setCellValue("Amex");
            row3.getCell(28).setCellValue("Discover");

            row3.getCell(25).setCellStyle(headerStyle12);
            row3.getCell(26).setCellStyle(headerStyle12);
            row3.getCell(27).setCellStyle(headerStyle12);
            row3.getCell(28).setCellStyle(headerStyle12);

            row3.getCell(29).setCellValue("Total");
            row3.getCell(29).setCellStyle(headerStyle8);

            // Variation - TA
            row3.getCell(30).setCellValue("WP UK");
            row3.getCell(31).setCellValue("WP Bankcard");
            row3.getCell(32).setCellValue("Amex");
            row3.getCell(33).setCellValue("Discover");

            row3.getCell(30).setCellStyle(headerStyle13);
            row3.getCell(31).setCellStyle(headerStyle13);
            row3.getCell(32).setCellStyle(headerStyle13);
            row3.getCell(33).setCellStyle(headerStyle13);

            row3.getCell(34).setCellValue("Total");
            row3.getCell(34).setCellStyle(headerStyle8);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Reference Dates
                dataRow.createCell(0).setCellValue(data.WEEK_START_DATE);
                dataRow.createCell(1).setCellValue(data.WEEK_END_DATE); // This is now labeled "To"
                dataRow.createCell(2).setCellValue(data.NUMBERWEAK); // This is now labeled "Week"

                // Amounts - AV
                dataRow.createCell(3).setCellValue(data.AMOUNT_WP_UK_CO);
                dataRow.createCell(4).setCellValue(data.AMOUNT_BANCARD_CO);
                dataRow.createCell(5).setCellValue(data.AMOUNT_AMEX_CO);
                dataRow.createCell(6).setCellValue(data.AMOUNT_DISCOVER_CO);
                dataRow.createCell(7).setCellValue(data.TOTAL_CO);

                // Amounts - TA
                dataRow.createCell(8).setCellValue(data.AMOUNT_WP_UK_SA);
                dataRow.createCell(9).setCellValue(data.AMOUNT_BANCARD_SA);
                dataRow.createCell(10).setCellValue(data.AMOUNT_AMEX_SA);
                dataRow.createCell(11).setCellValue(data.AMOUNT_DISCOVER_SA);
                dataRow.createCell(12).setCellValue(data.TOTAL_SA);

                dataRow.createCell(13).setCellValue(data.TOTAL_CO_AND_SA);

                // Averages - AV
                dataRow.createCell(14).setCellValue(data.AVG_WP_UK_CO);
                dataRow.createCell(15).setCellValue(data.AVG_BANCARD_CO);
                dataRow.createCell(16).setCellValue(data.AVG_AMEX_CO);
                dataRow.createCell(17).setCellValue(data.AVG_DISCOVER_CO);
                dataRow.createCell(18).setCellValue(data.AVG_TOTAL_CO);

                // Averages - TA
                dataRow.createCell(19).setCellValue(data.AVG_WP_UK_SA);
                dataRow.createCell(20).setCellValue(data.AVG_BANCARD_SA);
                dataRow.createCell(21).setCellValue(data.AVG_AMEX_SA);
                dataRow.createCell(22).setCellValue(data.AVG_DISCOVER_SA);
                dataRow.createCell(23).setCellValue(data.AVG_TOTAL_SA);

                dataRow.createCell(24).setCellValue(data.AVG_TOTAL_CO_SA);

                // Variation - AV
                dataRow.createCell(25).setCellValue(data.VAR_WP_UK_CO);
                dataRow.createCell(26).setCellValue(data.VAR_BANCARD_CO);
                dataRow.createCell(27).setCellValue(data.VAR_AMEX_CO);
                dataRow.createCell(28).setCellValue(data.VAR_DISCOVER_CO);
                dataRow.createCell(29).setCellValue(data.VAR_TOTAL_CO);

                // Variation - TA
                dataRow.createCell(30).setCellValue(data.VAR_WP_UK_SA);
                dataRow.createCell(31).setCellValue(data.VAR_BANCARD_SA);
                dataRow.createCell(32).setCellValue(data.VAR_AMEX_SA);
                dataRow.createCell(33).setCellValue(data.VAR_DISCOVER_SA);
                dataRow.createCell(34).setCellValue(data.VAR_TOTAL_SA);

                dataRow.createCell(35).setCellValue(data.VAR_TOTAL_CO_SA);

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 35; i++) { // Changed from 2 to 6 since we removed the first columns
                    dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 41; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchTacaDiary")
    public @ResponseBody
    String searchTacaDiary(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchTacaDiary-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchTacaDiary(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXTacaDiary")
    public @ResponseBody void getXLSXTacaDiary(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Main Fiduciary Alerts Report Taca Diary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchTacaDiary(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) { // Now up to 19 for 20 columns
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Holidays");
            row1.getCell(0).setCellStyle(headerStyle5);

            row1.getCell(1).setCellValue("Day");
            row1.getCell(1).setCellStyle(headerStyle);

            row1.getCell(2).setCellValue("Monthly");
            row1.getCell(2).setCellStyle(headerStyle);

            row1.getCell(3).setCellValue("References Dates");
            row1.getCell(3).setCellStyle(headerStyle6);

            row1.getCell(6).setCellValue("Amounts");
            row1.getCell(6).setCellStyle(headerStyle7);

            row1.getCell(7).setCellValue("Averages");
            row1.getCell(7).setCellStyle(headerStyle10);

            row1.getCell(8).setCellValue("Variation (%)");
            row1.getCell(8).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0)); // Holidays
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1)); // Day
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5)); // References Dates (now 4 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6)); // Amounts (7 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7)); // Averages (4 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8)); // Variation (%) (2 columns)

            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) {
                row2.createCell(i);
            }

            row2.getCell(0).setCellValue("BAC");
            row2.getCell(0).setCellStyle(headerStyle5);
            
            // References Dates

            row2.getCell(3).setCellValue("From");
            row2.getCell(3).setCellStyle(headerStyle6);

            row2.getCell(4).setCellValue("Year Week");
            row2.getCell(4).setCellStyle(headerStyle6);

            row2.getCell(5).setCellValue("Eked");
            row2.getCell(5).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(6).setCellValue("Tacaflow");
            row2.getCell(6).setCellStyle(headerStyle7);

            // Averages
            row2.getCell(7).setCellValue("Tacaflow");
            row2.getCell(7).setCellStyle(headerStyle10);

            // Variation (%)
            row2.getCell(8).setCellValue("Tacaflow");
            row2.getCell(8).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5)); // Year Week

            // Amounts merges
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6)); // Tacaflow
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7)); // Tacaflow(CRC)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8)); // Grant Total

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 19; i++) {
                row3.createCell(i);
            }

            // Amounts - Tacaflow
            row3.getCell(6).setCellValue("BAC");
            row3.getCell(6).setCellStyle(headerStyle7);

            // Averages - Tacaflow
            row3.getCell(7).setCellValue("BAC");
            row3.getCell(7).setCellStyle(headerStyle10);
            
            // Variation - Tacaflow
            row3.getCell(8).setCellValue("BAC");
            row3.getCell(8).setCellStyle(headerStyle12);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.HOLIDAY_TACA);
                dataRow.createCell(1).setCellValue(data.DAY_NAME);
                dataRow.createCell(2).setCellValue(data.MONTH_NAME);

                // References Dates
                dataRow.createCell(3).setCellValue(data.DATE_FROM);
                dataRow.createCell(4).setCellValue(data.NUMBER_WEAK); 
                dataRow.createCell(5).setCellValue(data.DAY_NUMBER_EKED); 

                // Amounts - Tacaflow
                dataRow.createCell(6).setCellValue(data.AMOUNT_TACA);
                // Amounts - Grant Total
                dataRow.createCell(7).setCellValue(data.AVG_TACA);

                // Variation - Tacaflow
                dataRow.createCell(8).setCellValue(data.VAR_TACA); // BAC

               
                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 7; i++) {
                    if (dataRow.getCell(i) != null) {
                        dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                    }
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 7; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchTacaDiaryHistoric")
    public @ResponseBody
    String searchTacaDiaryHistoric(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchTacaDiaryHistoric-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchTacaDiaryHistoric(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXTacaDiaryHistoric")
    public @ResponseBody void getXLSXTacaDiaryHistoric(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Main Fiduciary Alerts Report Taca Diary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchTacaDiaryHistoric(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) { // Now up to 19 for 20 columns
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("Holidays");
            row1.getCell(0).setCellStyle(headerStyle5);

            row1.getCell(1).setCellValue("Day");
            row1.getCell(1).setCellStyle(headerStyle);

            row1.getCell(2).setCellValue("Monthly");
            row1.getCell(2).setCellStyle(headerStyle);

            row1.getCell(3).setCellValue("References Dates");
            row1.getCell(3).setCellStyle(headerStyle6);

            row1.getCell(6).setCellValue("Amounts");
            row1.getCell(6).setCellStyle(headerStyle7);

            row1.getCell(7).setCellValue("Averages");
            row1.getCell(7).setCellStyle(headerStyle10);

            row1.getCell(8).setCellValue("Variation (%)");
            row1.getCell(8).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0)); // Holidays
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1)); // Day
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5)); // References Dates (now 4 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6)); // Amounts (7 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7)); // Averages (4 columns)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8)); // Variation (%) (2 columns)

            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) {
                row2.createCell(i);
            }

            row2.getCell(0).setCellValue("BAC");
            row2.getCell(0).setCellStyle(headerStyle5);
            
            // References Dates

            row2.getCell(3).setCellValue("From");
            row2.getCell(3).setCellStyle(headerStyle6);

            row2.getCell(4).setCellValue("Year Week");
            row2.getCell(4).setCellStyle(headerStyle6);

            row2.getCell(5).setCellValue("Eked");
            row2.getCell(5).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(6).setCellValue("Tacaflow");
            row2.getCell(6).setCellStyle(headerStyle7);

            // Averages
            row2.getCell(7).setCellValue("Tacaflow");
            row2.getCell(7).setCellStyle(headerStyle10);

            // Variation (%)
            row2.getCell(8).setCellValue("Tacaflow");
            row2.getCell(8).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5)); // Year Week

            // Amounts merges
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6)); // Tacaflow
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7)); // Tacaflow(CRC)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8)); // Grant Total

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 19; i++) {
                row3.createCell(i);
            }

            // Amounts - Tacaflow
            row3.getCell(6).setCellValue("BAC");
            row3.getCell(6).setCellStyle(headerStyle7);

            // Averages - Tacaflow
            row3.getCell(7).setCellValue("BAC");
            row3.getCell(7).setCellStyle(headerStyle10);
            
            // Variation - Tacaflow
            row3.getCell(8).setCellValue("BAC");
            row3.getCell(8).setCellStyle(headerStyle12);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.HOLIDAY_TACA);
                dataRow.createCell(1).setCellValue(data.DAY_NAME);
                dataRow.createCell(2).setCellValue(data.MONTH_NAME);

                // References Dates
                dataRow.createCell(3).setCellValue(data.DATE_FROM);
                dataRow.createCell(4).setCellValue(data.NUMBER_WEAK); 
                dataRow.createCell(5).setCellValue(data.DAY_NUMBER_EKED); 

                // Amounts - Tacaflow
                dataRow.createCell(6).setCellValue(data.AMOUNT_TACA);
                // Amounts - Grant Total
                dataRow.createCell(7).setCellValue(data.AVG_TACA);

                // Variation - Tacaflow
                dataRow.createCell(8).setCellValue(data.VAR_TACA); // BAC

               
                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 7; i++) {
                    if (dataRow.getCell(i) != null) {
                        dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                    }
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 7; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchTacaWeekly")
    public @ResponseBody
    String searchTacaWeekly(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchTacaWeekly-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchTacaWeekly(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXTacaWeekly")
    public @ResponseBody void getXLSXTacaWeekly(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Main Fiduciary Alerts Report Taca Weekly - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchTacaWeekly(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) { // Now up to 19 for 20 columns
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("References Dates");
            row1.getCell(0).setCellStyle(headerStyle6);

            row1.getCell(3).setCellValue("Amounts");
            row1.getCell(3).setCellStyle(headerStyle7);

            row1.getCell(4).setCellValue("Averages");
            row1.getCell(4).setCellStyle(headerStyle10);

            row1.getCell(5).setCellValue("Variation (%)");
            row1.getCell(5).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2)); // Holidays
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3)); // Day
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5)); // References Dates (now 4 columns)

            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) {
                row2.createCell(i);
            }
            
            // References Dates
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle6);

            row2.getCell(1).setCellValue("To");
            row2.getCell(1).setCellStyle(headerStyle6);

            row2.getCell(2).setCellValue("Week");
            row2.getCell(2).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(3).setCellValue("Tacaflow");
            row2.getCell(3).setCellStyle(headerStyle7);

            // Averages
            row2.getCell(4).setCellValue("Tacaflow");
            row2.getCell(4).setCellStyle(headerStyle10);

            // Variation (%)
            row2.getCell(5).setCellValue("Tacaflow");
            row2.getCell(5).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3)); // Year Week

            // Amounts merges
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4)); // Tacaflow
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5)); // Tacaflow(CRC)

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 19; i++) {
                row3.createCell(i);
            }

            // Amounts - Tacaflow
            row3.getCell(3).setCellValue("BAC");
            row3.getCell(3).setCellStyle(headerStyle7);

            // Averages - Tacaflow
            row3.getCell(4).setCellValue("BAC");
            row3.getCell(4).setCellStyle(headerStyle10);
            
            // Variation - Tacaflow
            row3.getCell(5).setCellValue("BAC");
            row3.getCell(5).setCellStyle(headerStyle12);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.WEEK_START_DATE);
                dataRow.createCell(1).setCellValue(data.WEEK_END_DATE);
                dataRow.createCell(2).setCellValue(data.NUMBERWEAK);

                // References Dates
                dataRow.createCell(3).setCellValue(data.AMOUNT_TACA);
                dataRow.createCell(4).setCellValue(data.AVG_TACA); 
                dataRow.createCell(5).setCellValue(data.VAR_TACA); 

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 5; i++) {
                    if (dataRow.getCell(i) != null) {
                        dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                    }
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 5; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/searchTacaWeeklyHistoric")
    public @ResponseBody
    String searchTacaWeeklyHistoric(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : searchTacaWeeklyHistoric-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchTacaWeeklyHistoric(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXTacaWeeklyHistoric")
    public @ResponseBody void getXLSXTacaWeeklyHistoric(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Main Fiduciary Alerts Report Taca Weekly - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.searchTacaWeeklyHistoric(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle4 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle5 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle6 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle7 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle8 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle9 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle10 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle12 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            // Configuración de estilos
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);

            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);

            headerStyle4.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle4.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle4.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle4.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle4.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle4.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle4.setFillForegroundColor(new XSSFColor(new java.awt.Color(129, 149, 163)));
            headerStyle4.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle4.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle4.setFont(headerFont);

            headerStyle5.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle5.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle5.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle5.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle5.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle5.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle5.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            headerStyle5.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle5.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle5.setFont(headerFont);

            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));

            // Style for totals
            Font totalFont = workbook.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);
            totalStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(168, 156, 108)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);

            headerStyle6.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle6.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle6.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle6.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle6.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle6.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle6.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle6.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle6.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle6.setFont(headerFont);

            headerStyle7.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle7.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle7.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle7.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle7.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle7.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle7.setFillForegroundColor(new XSSFColor(new java.awt.Color(122, 136, 162)));
            headerStyle7.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle7.setFont(headerFont);

            headerStyle8.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle8.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle8.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle8.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle8.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle8.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle8.setFillForegroundColor(new XSSFColor(new java.awt.Color(196, 92, 77)));
            headerStyle8.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle8.setFont(headerFont);

            headerStyle9.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle9.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle9.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle9.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle9.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle9.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle9.setFillForegroundColor(new XSSFColor(new java.awt.Color(149, 163, 183)));
            headerStyle9.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle9.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle9.setFont(headerFont);

            headerStyle10.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle10.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle10.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle10.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle10.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle10.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle10.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 122, 111)));
            headerStyle10.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle10.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle10.setFont(headerFont);

            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(146, 172, 158)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setFont(headerFont);

            headerStyle12.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle12.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle12.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle12.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle12.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle12.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle12.setFillForegroundColor(new XSSFColor(new java.awt.Color(95, 106, 122)));
            headerStyle12.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle12.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle12.setFont(headerFont);

            Integer vi = 0;
            Integer vj = 0; // Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================

            // ====== Nivel 1 (Cabeceras principales) ==========
            Row row1 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) { // Now up to 19 for 20 columns
                row1.createCell(i);
            }

            row1.getCell(0).setCellValue("References Dates");
            row1.getCell(0).setCellStyle(headerStyle6);

            row1.getCell(3).setCellValue("Amounts");
            row1.getCell(3).setCellStyle(headerStyle7);

            row1.getCell(4).setCellValue("Averages");
            row1.getCell(4).setCellStyle(headerStyle10);

            row1.getCell(5).setCellValue("Variation (%)");
            row1.getCell(5).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2)); // Holidays
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3)); // Day
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4)); // Monthly
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5)); // References Dates (now 4 columns)

            ++vj;

            // ====== Nivel 2 (Subtítulos) ==========
            Row row2 = sheet.createRow(vj);
            for (int i = 0; i <= 19; i++) {
                row2.createCell(i);
            }
            
            // References Dates
            row2.getCell(0).setCellValue("From");
            row2.getCell(0).setCellStyle(headerStyle6);

            row2.getCell(1).setCellValue("To");
            row2.getCell(1).setCellStyle(headerStyle6);

            row2.getCell(2).setCellValue("Week");
            row2.getCell(2).setCellStyle(headerStyle6);

            // Amounts
            row2.getCell(3).setCellValue("Tacaflow");
            row2.getCell(3).setCellStyle(headerStyle7);

            // Averages
            row2.getCell(4).setCellValue("Tacaflow");
            row2.getCell(4).setCellStyle(headerStyle10);

            // Variation (%)
            row2.getCell(5).setCellValue("Tacaflow");
            row2.getCell(5).setCellStyle(headerStyle12);

            // Combinar celdas de nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1)); // BAC
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2)); // From
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3)); // Year Week

            // Amounts merges
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4)); // Tacaflow
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5)); // Tacaflow(CRC)

            // ====== Nivel 3 (Subcolumnas) ==========
            Row row3 = sheet.createRow(++vj);
            for (int i = 0; i <= 19; i++) {
                row3.createCell(i);
            }

            // Amounts - Tacaflow
            row3.getCell(3).setCellValue("BAC");
            row3.getCell(3).setCellStyle(headerStyle7);

            // Averages - Tacaflow
            row3.getCell(4).setCellValue("BAC");
            row3.getCell(4).setCellStyle(headerStyle10);
            
            // Variation - Tacaflow
            row3.getCell(5).setCellValue("BAC");
            row3.getCell(5).setCellStyle(headerStyle12);

            ++vj;

            // ====== LLENANDO DATOS ======================================
            while (iter.hasNext()) {
                Row dataRow = sheet.createRow(vj);
                SQP04091Filter data = listaData.get(vi);

                // Day y Monthly
                dataRow.createCell(0).setCellValue(data.WEEK_START_DATE);
                dataRow.createCell(1).setCellValue(data.WEEK_END_DATE);
                dataRow.createCell(2).setCellValue(data.NUMBERWEAK);

                // References Dates
                dataRow.createCell(3).setCellValue(data.AMOUNT_TACA);
                dataRow.createCell(4).setCellValue(data.AVG_TACA); 
                dataRow.createCell(5).setCellValue(data.VAR_TACA); 

                // Aplicar estilo de formato numérico a las celdas de datos
                for (int i = 0; i <= 5; i++) {
                    if (dataRow.getCell(i) != null) {
                        dataRow.getCell(i).setCellStyle(bodyStyle_amt);
                    }
                }

                iter.next();
                ++vi;
                ++vj;
            }

            // Autoajustar columnas
            for (int i = 0; i <= 5; i++) {
                sheet.autoSizeColumn(i);
            }

            // Escribir el archivo
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    
    
    
    
//    SE USAN LOS METODOS DE ARRIBA
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Fiduciary Alerts Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Gson gson = new Gson();
            SQP04091Filter filter;

            String beanString = "";

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP04091Filter> listaData = logic.search(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle_amt = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(108, 135, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(125, 159, 125)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont);
            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(209, 143, 119)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont);
            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
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
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);

            CH1_0.setCellValue("Settlement Information");
            CH1_10.setCellValue("Sales Reconciliation");
            CH1_16.setCellValue("Variation");
            CH1_17.setCellValue("% Variation");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle2);
            CH1_10.setCellStyle(headerStyle2);
            CH1_11.setCellStyle(headerStyle2);
            CH1_12.setCellStyle(headerStyle2);
            CH1_13.setCellStyle(headerStyle2);
            CH1_14.setCellStyle(headerStyle2);
            CH1_15.setCellStyle(headerStyle2);
            CH1_16.setCellStyle(headerStyle3);
            CH1_17.setCellStyle(headerStyle3);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
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
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            CH2_0.setCellValue("Processor");
            CH2_1.setCellValue("Doc Type");
            CH2_2.setCellValue("Sale Date");
            CH2_3.setCellValue("Agent");
            CH2_4.setCellValue("Currency");
            CH2_5.setCellValue("Account Number");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("Comision");
            CH2_8.setCellValue("Import");
            CH2_9.setCellValue("Neto");
            CH2_10.setCellValue("Sale Date");
            CH2_11.setCellValue("Agent");
            CH2_12.setCellValue("Currency");
            CH2_13.setCellValue("Match Core");
            CH2_14.setCellValue("Match Other");
            CH2_15.setCellValue("Pending");
            CH2_16.setCellValue("Variation");
            CH2_17.setCellValue("% Variation");

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
            CH2_10.setCellStyle(headerStyle2);
            CH2_11.setCellStyle(headerStyle2);
            CH2_12.setCellStyle(headerStyle2);
            CH2_13.setCellStyle(headerStyle2);
            CH2_14.setCellStyle(headerStyle2);
            CH2_15.setCellStyle(headerStyle2);
            CH2_16.setCellStyle(headerStyle3);
            CH2_17.setCellStyle(headerStyle3);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));

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
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).CODPRO);
                rcell1.setCellValue(listaData.get(vi).TDOC);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).SAGENT);
                rcell4.setCellValue(listaData.get(vi).SCURRENCY);
                rcell5.setCellValue(listaData.get(vi).ACCNUMA);
                rcell6.setCellValue(listaData.get(vi).TOTAL);
                rcell7.setCellValue(listaData.get(vi).COMISION);
                rcell8.setCellValue(listaData.get(vi).IMPORTE);
                rcell9.setCellValue(listaData.get(vi).NETO);
                rcell10.setCellValue(listaData.get(vi).SDATE100);
                rcell11.setCellValue(listaData.get(vi).SAGENT100);
                rcell12.setCellValue(listaData.get(vi).SCURRENCY100);
                rcell13.setCellValue(listaData.get(vi).SVFOP100W);
                rcell14.setCellValue(listaData.get(vi).SVFOP100O);
                rcell15.setCellValue(listaData.get(vi).SVFOP100P);
                rcell16.setCellValue(listaData.get(vi).VARIACION);
                rcell17.setCellValue(listaData.get(vi).PORCENTAJE_VARIACION + " %");

                rcell6.setCellStyle(bodyStyle_amt);
                rcell7.setCellStyle(bodyStyle_amt);
                rcell8.setCellStyle(bodyStyle_amt);
                rcell9.setCellStyle(bodyStyle_amt);
                rcell13.setCellStyle(bodyStyle_amt);
                rcell14.setCellStyle(bodyStyle_amt);
                rcell15.setCellStyle(bodyStyle_amt);
                rcell16.setCellStyle(bodyStyle_amt);

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

    @RequestMapping(value = "searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankStatementExtract : searchDetalle-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalle(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetalle(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankStatementExtractLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00698Detalle(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/obtainData")
    public @ResponseBody
    String obtainData(ModelMap map, HttpServletRequest request) {
        System.out.println("Fiduciary Alert Controller --- obtainData");
        try {
            DataObtain data = new DataObtain();

            String beanString = request.getParameter("beanString");
            data = new Gson().fromJson(beanString, data.getClass());

            BankStatementExtractDAO BankStatementExtractDAO = new BankStatementExtractDAO();
            BankStatementExtractDAO.setSession((IServerSession) serverSession.getServerSession());

            map.put("success", true);
            if (data.CODPRO != 0) {
                List<CPF031Filter> lstProcessor = BankStatementExtractDAO.lstProcessor();
                map.put("lstProcessor", lstProcessor);
            }

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04091Filter> listaData;
        Gson gson = new Gson();
        SQP04091Filter filter;

        String beanString = "";
        System.out.println("-------------- BankStatementExtract : search-------------");
        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP04091Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new BankStatementExtractLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.search(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
