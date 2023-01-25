/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.sun.org.apache.bcel.internal.generic.Type;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3949Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.SendingcontrolReportFormLogic;
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
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/SendingcontrolReportForm")
public class SendingcontrolReportFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SendingcontrolReportFormLogic logic;

    @RequestMapping(value = "searchDowloadFiles")
    public @ResponseBody
    String searchDowloadFiles(ModelMap map, HttpServletRequest request) {
        A3949Filter filter = new A3949Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SendingcontrolReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3949Filter> lst_search = logic.searchDowloadFiles(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3949Filter filter = new A3949Filter();
        String VL_A3949TYPE = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new SendingcontrolReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3949Filter> lst = logic.searchDowloadFiles(filter);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SendingFiles");
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

            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05;

            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);

            CH_00.setCellValue("System date");
            CH_01.setCellValue("Execution date");
            CH_02.setCellValue("Country");
            CH_03.setCellValue("Processed");
            CH_04.setCellValue("Status");
            CH_05.setCellValue("Type");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);

            ++vj;

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);

                CH_00.setCellValue(lst.get(vi).A3949PAIS);
                CH_01.setCellValue(lst.get(vi).A3949FDATE);
                CH_02.setCellValue(lst.get(vi).A3949PAIS);
                CH_03.setCellValue(lst.get(vi).A3949COUNT2);
                CH_04.setCellValue(lst.get(vi).A3949DESC);
                switch (lst.get(vi).A3949TYPE) {
                    case "DF":
                        VL_A3949TYPE = "FILE DOWNLOAD";
                        break;
                    case "DN":
                        VL_A3949TYPE = "NON COMPARATIVES";
                        break;
                    case "DC":
                        VL_A3949TYPE = "COMPARATIVES";
                        break;
                    default:
                        VL_A3949TYPE = lst.get(vi).A3949TYPE;
                        break;
                }
                CH_05.setCellValue(VL_A3949TYPE);
                
                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
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

            String fileNameDownload = String.format("SendingFiles - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "SearchDebitosDetail")
    public @ResponseBody
    String SearchDebitosDetail(ModelMap map, HttpServletRequest request) {
        A3949Filter filter = new A3949Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SendingcontrolReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3949Filter> lst_search = logic.SearchDebitosDetail(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "DownloadFiles_python")
    public @ResponseBody
    void DownloadFiles_python(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A3949Filter filter = new A3949Filter();
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        String vl_PREFIX = "";
        String vl_urlREST = "";
        switch (filter.IN_TYPE) {
            case "DN":
                vl_PREFIX = "NONCOMPARATIVE/";
                vl_urlREST = "/api/bsplink/export_salecomparative/";
                break;
            case "DC":
                vl_PREFIX = "COMPARATIVE/";
                vl_urlREST = "/api/bsplink/export_salecomparative/";
                break;
            default:
                vl_PREFIX = "GSA/";
                vl_urlREST = "/api/bsplink/export_salecomparative/";
                break;
        }
        try {
            Unirest.setTimeouts(3600000, 3600000);
            HashMap bodyData = new HashMap<>();
            bodyData.put("date_from", filter.IN_DATEFROM);
            bodyData.put("date_to", filter.IN_DATETO);
            bodyData.put("pr_type", filter.IN_TYPE);
            bodyData.put("PREFIX", vl_PREFIX);

            HttpResponse<JsonNode> responses = Unirest.post(urlREST + vl_urlREST)//Sending
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String error_code = responses.getBody().getObject().get("error_code").toString();
            String error_msg = responses.getBody().getObject().get("error_msg").toString();
            String filename = responses.getBody().getObject().get("filename").toString();

            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\\\" + filename + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\\\" + filename);
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "downloadFile")
    public @ResponseBody
    void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A3949Filter filter = new A3949Filter();
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

        String vl_PREFIX = "";
        String vl_urlREST = "";
        switch (filter.IN_TYPE) {
            case "DN":
                vl_PREFIX = "NONCOMPARATIVE/";
                vl_urlREST = "/api/bsplink/export_salecomparative_archi/";
                break;
            case "DC":
                vl_PREFIX = "COMPARATIVE/";
                vl_urlREST = "/api/bsplink/export_salecomparative_archi/";
                break;
            default:
                vl_PREFIX = "GSA/";
                vl_urlREST = "/api/bsplink/export_salecomparative_archi/";
                break;
        }
        try {
            Unirest.setTimeouts(3600000, 3600000);
            HashMap bodyData = new HashMap<>();
            bodyData.put("date_from", filter.IN_DATEFROM);
            bodyData.put("country", filter.IN_COUNTRY);
            bodyData.put("pr_type", filter.IN_TYPE);
            bodyData.put("PREFIX", vl_PREFIX);

            HttpResponse<JsonNode> responses = Unirest.post(urlREST + vl_urlREST)//Sending
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String error_code = responses.getBody().getObject().get("error_code").toString();
            String error_msg = responses.getBody().getObject().get("error_msg").toString();
            String filename = responses.getBody().getObject().get("filename").toString();

            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\\\" + filename + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\\\" + filename);
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

}
