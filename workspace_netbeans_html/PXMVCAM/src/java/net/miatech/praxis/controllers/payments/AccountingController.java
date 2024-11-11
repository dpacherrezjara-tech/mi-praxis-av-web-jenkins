/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AccountingLogic;
import net.miatech.praxis.logic.payments.MiscellaneousPaymentLogic;
import net.miatech.praxis.payment.filter.A4169Filter;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.payment.filter.SQP05252Filter;
import net.miatech.praxis.payment.filter.SQP05253Filter;
import net.miatech.praxis.payment.filter.SQP05352Filter;
import net.miatech.praxis.payment.filter.SQP05343Filter;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/Accounting")
public class AccountingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingLogic logic;

    
//    @RequestMapping(value = "/loadProcessors")
//    public @ResponseBody
//    String searchProcessor(ModelMap map, HttpServletRequest request) {
//        List<A051> listaData;
//        try {
//
//            logic = new AccountingLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            listaData = logic.loadProcessors();
//            map.put("data", listaData);
//            map.put("success", true);
//        } catch (Exception ex) {
//            map.put("success", false);
//            System.out.println(ex.getMessage());
//        }
//        
//        return new Gson().toJson(map);
//    }
    
//    @RequestMapping(value = "procesarArchivos")
//    public @ResponseBody
//    String procesarArchivos(ModelMap map, HttpServletRequest request) {
//
//        SQP05233Filter filter = new SQP05233Filter();
//        SQP05233Filter objRtn = new SQP05233Filter();
//
//        try {
//            logic = new AccountingLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            objRtn = logic.setSQP05233Filter(filter);
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//
//        } catch (Exception ex) {
//            objRtn.dbException.SQLCODE = "0";
//            objRtn.dbException.MESSAGE = ex.getMessage();
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//            map.put("sesion", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
    
//    @RequestMapping(value = "cargarArchivos")
//    public @ResponseBody
//    String cargarArchivos(ModelMap map, HttpServletRequest request) {
//
//        SQP05343Filter filter = new SQP05343Filter();
//        SQP05343Filter objRtn = new SQP05343Filter();
//
//        try {
//            logic = new AccountingLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            objRtn = logic.setSQP05343Filter(filter);
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//
//        } catch (Exception ex) {
//            objRtn.dbException.SQLCODE = "0";
//            objRtn.dbException.MESSAGE = ex.getMessage();
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//            map.put("sesion", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
    
//    @RequestMapping(value = "reversar")
//    public @ResponseBody
//    String reversarContabilidad(ModelMap map, HttpServletRequest request) {
//
//        SQP05343Filter filter = new SQP05343Filter();
//        SQP05343Filter objRtn = new SQP05343Filter();
//
//        try {
//            logic = new AccountingLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            objRtn = logic.setSQP05393Filter(filter);
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//
//        } catch (Exception ex) {
//            objRtn.dbException.SQLCODE = "0";
//            objRtn.dbException.MESSAGE = ex.getMessage();
//            map.put("objRtn", objRtn);
//            map.put("success", true);
//            map.put("sesion", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//
//    }

//    @RequestMapping(value = "/search")
//    public @ResponseBody
//    String search(ModelMap map, HttpServletRequest request) {
//        List<SQP05253Filter> listaData;
//        SQP05253Filter filter;
//        filter = new SQP05253Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//        try {
//
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            logic = new AccountingLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            listaData = logic.getSQP05253Filter(filter);
//
//            map.put("success", true);
//            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
//            map.put("data", listaData);
//        } catch (NumberFormatException ex) {
//            map.put("success", false);
//            map.put("sesion", ex.getMessage());
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("sesion", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
    
    @RequestMapping(value = "/searchRegistration")
    public @ResponseBody
    String searchRegistration(ModelMap map, HttpServletRequest request) {
        List<SQP05352Filter> listaData;
        SQP05352Filter filter;
        filter = new SQP05352Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05352Filter(filter);

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
    
//    @RequestMapping(value = "getDownloadFileTxt")
//    public @ResponseBody
//    void getDownloadFileTxt(HttpServletRequest request, HttpServletResponse response) {
//        
//        SQP05252Filter filter = new SQP05252Filter();
//        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//
//        try {
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            logic = new AccountingLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            List<SQP05252Filter> lst = logic.getSQP05252Filter(filter);
//
//            String vl_fileName = "CARGUE_TC_" + filter.FNAME; // + filter.IN_LEXT;
//            File file = new File(rutaFile + "\\" + vl_fileName + ".txt");
//
//            if (file.exists()) {
//                file.delete();
//            }
//
//            PrintWriter writer = new PrintWriter(file, "UTF-8");
//            String cadena;
//            
//            int len = lst.size();
//            for (int vi = 0; vi < len; vi++) {
//                cadena = "";
//                cadena += "" + lst.get(vi).DETA;
//                writer.println("" + cadena);
//            }
//            writer.flush();
//
////            Comprimimos archivo generado para su optima descarga
////            if (!zip(vl_fileName))            
////            response.setContentType("application/zip");
////            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + vl_fileName + ".zip" + "\"");
////            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".zip");
////            IOUtils.copy(is, response.getOutputStream());
////            response.flushBuffer();
//
//            response.setContentType("application/text");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + vl_fileName + ".txt" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".txt");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();
//
//        } catch (Exception e) {
//            System.out.println("" + e.getMessage());
//            e.printStackTrace();
//            throw new SpringException(e);
//        }
//
//    }
//
//    public Boolean zip(String fileName) {
//        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        Boolean existe = false;
//        try {
//            File fileZip = new File(path + "\\" + fileName + ".zip");
//
//            if (fileZip.exists()) {
//                fileZip.delete();
//            }
//
//            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");
//
//            existe = true;
//
//        } catch (FileNotFoundException e) {
//        } catch (IOException e) {
//        }
//        return existe;
//    }
//
//    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
//        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
//        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
//        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
//        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
//        zipOutputStream.putNextEntry(zipEntry);
//        FileInputStream fileInputStream = new FileInputStream(inputFile);
//        byte[] buf = new byte[4096];
//        int bytesRead;
//
//        while ((bytesRead = fileInputStream.read(buf)) > 0) {
//            zipOutputStream.write(buf, 0, bytesRead);
//        }
//        fileInputStream.close();
//        zipOutputStream.flush();
//        zipOutputStream.closeEntry();
//        zipOutputStream.close();
//        fileOutputStream.close();
//    }
//    
//    @RequestMapping(value = "getXLSXRegistration")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        System.out.println("Report : getXLSX");
//        SQP05352Filter filter = new SQP05352Filter();
//        String fileNameDownload = String.format("Report Payments - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            AccountingLogic logic = new AccountingLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.page.PAGROW = -1;
//            filter.page.PAGNUM = 1;
//
//            List<SQP05352Filter> listaData = logic.getSQP05352Filter(filter);
//            System.out.println("List Size: " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
//            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
//            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            
//
//            CH1_0.setCellValue("Nbr.");
//            CH1_1.setCellValue("Airline");
//            CH1_2.setCellValue("Id");
//            CH1_3.setCellValue("Bandoc");
//            CH1_4.setCellValue("Processing Date");
//            CH1_5.setCellValue("Generation Date");
//            CH1_6.setCellValue("Mode");
//            CH1_7.setCellValue("Processor");
//            CH1_8.setCellValue("Currency");
//            CH1_9.setCellValue("Amount");
//            CH1_10.setCellValue("Processed");
//            CH1_11.setCellValue("Qty");
//            
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//
////            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
//            ++vj;
//            //============================================
//
//            
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).CCUST_0);
//                rcell2.setCellValue(listaData.get(vi).HEADER);
//                rcell3.setCellValue(listaData.get(vi).BANDOC);
//                rcell4.setCellValue(listaData.get(vi).DCONT);
//                rcell5.setCellValue(listaData.get(vi).PSTGD);
//                rcell6.setCellValue(listaData.get(vi).MODO_0);
//                rcell7.setCellValue(listaData.get(vi).CODPRO);
//                rcell8.setCellValue(listaData.get(vi).SCURRENCY);
//                rcell9.setCellValue(listaData.get(vi).NETO);
//                rcell10.setCellValue(listaData.get(vi).STCON);
//                rcell11.setCellValue(listaData.get(vi).ITEMS);
//                
//                
//                
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            // ======  Nivel de TOTALES ==========
//           
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }

    
    @RequestMapping(value = "/test")
    public
    void updatePending(ModelMap map, HttpServletRequest request) {
        try {

            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.test();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        
    }
}
