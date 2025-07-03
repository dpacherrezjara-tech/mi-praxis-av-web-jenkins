/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.function.BiConsumer;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ForecastPaymentLogic;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.entity.mime.MultipartEntityBuilder;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
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
//import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.entity.mime.MultipartEntityBuilder;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;

/**
 *
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/ForecastPayment")
public class ForecastPaymentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ForecastPaymentLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ForecastPayment/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ForecastPayment : Search-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2295Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0);
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class);
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

            lst = logic.loadPX290MPS074(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<A2295Filter> getListTC(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0);
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class);

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            lst = logic.loadPX290MPS074TC(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<A2295Filter> getListCash(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0);
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class);
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadPX290MPS074CASH(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "serviceReport")
    public @ResponseBody
    String serviceReport(ModelMap map, HttpServletRequest request) {
        
        A2295Filter filter = new A2295Filter();
        Gson gson1 = new Gson();
        String beanString = "";
        
        beanString = request.getParameter("beanString");
        A2295Filter obj = new A2295Filter();
        try {
            logic = new ForecastPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            //TRAER TOTAL DE REGISTROS EN LA MPF074
            obj = logic.getTotalRecords(); 
            long cant_files = (obj.CANT / 900000) + 1;
            String num_files = String.valueOf(cant_files);
            filter = gson1.fromJson(beanString, A2295Filter.class);
            Unirest.setTimeouts(0, 0);
            HttpResponse<String> response = 
            Unirest.post("http://10.0.0.207:8000/api/forecast_download/")
                .field("ccust", "134")
                .field("periodo", filter.periodo)
                .field("num_files", num_files)
                .field("batch_size", "10000")
                .field("enviroment", "AVIANCA")
                .field("mail_notificacion", filter.mail_notificacion)
                .asString();
            String responseBody = response.getBody();
            map.put("success", true);
            map.put("response", responseBody);

        } catch (Exception e) {
            map.put("success", false);
            e.printStackTrace();
        }
        
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");

        String fileNameDownload = "Forecast Report - " + Functions.getFechaActual() + ".xlsx";
        File file = null;

        try {
            Workbook workbook = new XSSFWorkbook();
            Sheet sheetTC = workbook.createSheet("TC");
            Sheet sheetCASH = workbook.createSheet("CASH");

            List<A2295Filter> listaDataTC = this.getListTC(request, true);
            List<A2295Filter> listaDataCASH = this.getListCash(request, true);

            // === Estilo encabezado ===
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            byte[] rgb = new byte[]{(byte) 104, (byte) 133, (byte) 151};
            XSSFColor headerColor = new XSSFColor(rgb);
            headerStyle.setFillForegroundColor(headerColor);
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            // === Estilo para montos ===
            DataFormat format = workbook.createDataFormat();
            CellStyle moneyStyle = workbook.createCellStyle();
            moneyStyle.setDataFormat(format.getFormat("#,##0.00"));

            // ===== HOJA TC =====
            String[] columnsTC = {
                "INVOICE_CC", "SPAYMENT", "SCOUNTRY", "SCARCOD1", "CCUST", "CFUENTE",
                "SUBFTE", "SCONSOL", "FDESD", "MCLOS", "SCURRENCY", "SCURREVEN",
                "Suma de SVFOPC1", "Suma de SVFOPUSD"
            };

            Row headerRowTC = sheetTC.createRow(0);
            for (int i = 0; i < columnsTC.length; i++) {
                Cell cell = headerRowTC.createCell(i);
                cell.setCellValue(columnsTC[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdxTC = 1;
            for (A2295Filter item : listaDataTC) {
                Row row = sheetTC.createRow(rowIdxTC++);
                row.createCell(0).setCellValue(item.INVOICE1); // INVOICE_CC
                row.createCell(1).setCellValue(item.SPAYMENT);
                row.createCell(2).setCellValue(item.SCOUNTRY);
                row.createCell(3).setCellValue(item.SCARCOD1);
                row.createCell(4).setCellValue(item.CCUST);
                row.createCell(5).setCellValue(item.CFUENTE);
                row.createCell(6).setCellValue(item.SUBFTE);
                row.createCell(7).setCellValue(item.SCONSOL);
                row.createCell(8).setCellValue(item.FDESD);
                row.createCell(9).setCellValue(item.MCLOS);
                row.createCell(10).setCellValue(item.SCURRENCY);
                row.createCell(11).setCellValue(item.SCURREVEN);

                Cell c12 = row.createCell(12);
                c12.setCellValue(item.SVFOPC1);
                c12.setCellStyle(moneyStyle);

                Cell c13 = row.createCell(13);
                c13.setCellValue(item.SVFOPUSD);
                c13.setCellStyle(moneyStyle);
            }

            for (int i = 0; i < columnsTC.length; i++) {
                sheetTC.autoSizeColumn(i);
            }

            // ===== HOJA CASH =====
            String[] columnsCASH = {
                "INVOICE_CA", "SPAYMENT", "SCOUNTRY", "CCUST", "CFUENTE", "SUBFTE",
                "SCONSOL", "SDATE", "MCLOS", "SCURRENCY", "SCURREVEN",
                "Suma de SVFOPNETR", "Suma de SVFOPUSD"
            };

            Row headerRowCASH = sheetCASH.createRow(0);
            for (int i = 0; i < columnsCASH.length; i++) {
                Cell cell = headerRowCASH.createCell(i);
                cell.setCellValue(columnsCASH[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdxCASH = 1;
            for (A2295Filter item : listaDataCASH) {
                Row row = sheetCASH.createRow(rowIdxCASH++);
                row.createCell(0).setCellValue(item.INVOICE0); // INVOICE_CA
                row.createCell(1).setCellValue(item.SPAYMENT);
                row.createCell(2).setCellValue(item.SCOUNTRY);
                row.createCell(3).setCellValue(item.CCUST);
                row.createCell(4).setCellValue(item.CFUENTE);
                row.createCell(5).setCellValue(item.SUBFTE);
                row.createCell(6).setCellValue(item.SCONSOL);
                row.createCell(7).setCellValue(item.SDATE);
                row.createCell(8).setCellValue(item.MCLOS);
                row.createCell(9).setCellValue(item.SCURRENCY);
                row.createCell(10).setCellValue(item.SCURREVEN);

                Cell c11 = row.createCell(11);
                c11.setCellValue(item.SVFOPNETR);
                c11.setCellStyle(moneyStyle);

                Cell c12 = row.createCell(12);
                c12.setCellValue(item.SVFOPUSD);
                c12.setCellStyle(moneyStyle);
            }

            for (int i = 0; i < columnsCASH.length; i++) {
                sheetCASH.autoSizeColumn(i);
            }

            // ===== Exportar Excel =====
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            file = File.createTempFile("forecast_report_", ".xlsx");
            FileOutputStream fos = new FileOutputStream(file);
            workbook.write(fos);
            fos.close();

            FileInputStream fis = new FileInputStream(file);
            IOUtils.copy(fis, response.getOutputStream());
            response.flushBuffer();
            fis.close();
            workbook.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (file != null) file.delete();
        }
    }




}
