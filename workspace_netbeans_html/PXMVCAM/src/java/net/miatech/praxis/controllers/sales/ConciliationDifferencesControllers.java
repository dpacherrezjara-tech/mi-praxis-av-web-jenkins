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
import net.miatech.beans.SQP04369Filter;
import net.miatech.beans.SQP04370ASRBYTRXFilter;
import net.miatech.beans.SQP04370ASRFilter;
import net.miatech.beans.SQP04370Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConciliationDifferencesLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/ConciliationDifferences")
public class ConciliationDifferencesControllers extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ConciliationDifferencesLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370Filter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370Filter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchASR")
    public @ResponseBody
    String searchASR(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370ASRFilter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370ASRFilter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchASRTRX")
    public @ResponseBody
    String searchASRTRX(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04370ASRBYTRXFilter> lst = new ArrayList<>(0);
        SQP04370Filter filter = new SQP04370Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER");
            filter.IN_FPRDA_FROM = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA_TO = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadSQP04370ASRBYTRXFilter(filter);
//            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("total", lst.size());
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {

        map.put("success", true);

        logic = new ConciliationDifferencesLogic();

        List<SQP04369Filter> lst = new ArrayList<>(0);
        SQP04369Filter filter = new SQP04369Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FPRDA1 = request.getParameter("IN_FPRDA1");
            filter.IN_FPRDA2 = request.getParameter("IN_FPRDA2");
            filter.IN_BANK = request.getParameter("IN_BANK");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_MDA = request.getParameter("IN_MDA");
            filter.IN_IDFIL = request.getParameter("IN_IDFIL");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_TIPO = request.getParameter("IN_TIPO");
            

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.loadSQP04369Filter(filter);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
            return new Gson().toJson(map);

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        
        try {
            
            //List<SQP04369Filter> listaData = new ArrayList<>(0);
            SQP04369Filter filter = new SQP04369Filter();
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            
            logic = new ConciliationDifferencesLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileNameDownload = String.format("ConciliacionDiferencias-"+ filter.IN_FUENTE+filter.IN_FPRDA1+filter.IN_FPRDA2+"-"+ Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            List<SQP04369Filter> listaData = logic.loadSQP04369Filter(filter);
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("DetalleBoletosConciliacion");

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
           
            CH1_00.setCellValue("PROCESSING_DATE");
            CH1_01.setCellValue("OPEN_DATE");
            CH1_02.setCellValue("GRUPO");
            CH1_03.setCellValue("MDA_LOCAL");
            CH1_04.setCellValue("PAIS");    
            CH1_05.setCellValue("FUENTE");             
            CH1_06.setCellValue("IATA");
            CH1_07.setCellValue("TICKET");
            CH1_08.setCellValue("TRNC");
            CH1_09.setCellValue("CONCEPTO");
            CH1_10.setCellValue("CODIGO1");
            CH1_11.setCellValue("IMPORTE1_LOC"); 
            CH1_12.setCellValue("CODIGO2");
            CH1_13.setCellValue("IMPORTE2_LOC");
            CH1_14.setCellValue("DESCRIPCION");
            CH1_15.setCellValue("COD_DESC");

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
           

            //========================================================
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
                                    
                rcell0.setCellValue(listaData.get(vi).PROCESSING_DATE);
                rcell1.setCellValue(listaData.get(vi).OPEN_DATE);
                rcell2.setCellValue(listaData.get(vi).GRUPO);
                rcell3.setCellValue(listaData.get(vi).MDA_LOCAL);
                rcell4.setCellValue(listaData.get(vi).PAIS);
                rcell5.setCellValue(listaData.get(vi).FUENTE);
                rcell6.setCellValue(listaData.get(vi).IATA);
                rcell7.setCellValue(listaData.get(vi).TICKET);
                rcell8.setCellValue(listaData.get(vi).TRNC);
                rcell9.setCellValue(listaData.get(vi).CONCEPTO);
                rcell10.setCellValue(listaData.get(vi).CODIGO1);
                rcell11.setCellValue(listaData.get(vi).IMPORTE1_LOC);
                rcell12.setCellValue(listaData.get(vi).CODIGO2);
                rcell13.setCellValue(listaData.get(vi).IMPORTE2_LOC);
                rcell14.setCellValue(listaData.get(vi).DESCRIPCION);
                rcell15.setCellValue(listaData.get(vi).COD_DESC);
                
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
