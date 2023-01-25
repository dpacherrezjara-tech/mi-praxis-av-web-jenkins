/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
//import static java.util.Locale.filter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3402Filter;
import net.miatech.beans.SaleAudit.A3404Filter;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BwrBSPLINKRFNDLogic;
import net.miatech.praxis.logic.salesAudit.BwrQueryRefundLogic;
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
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
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
 * @author lremicio
 */
@Controller
@Scope("request")
@RequestMapping("/BwrBSPLINKRFND")
public class BwrBSPLINKRFNDController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BwrBSPLINKRFNDLogic logic;

    @RequestMapping(value = "searchLstTax")
    public @ResponseBody
    String searchLstTax(ModelMap map, HttpServletRequest request) {
        List<A3402Filter> lst;
        A3402Filter filter = new A3402Filter();

        try {
            logic = new BwrBSPLINKRFNDLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_PREME = request.getParameter("IN_PREME").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();

            lst = logic.searchLstTax(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        A3389Filter filter = new A3389Filter();

        try {
            logic = new BwrBSPLINKRFNDLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportQueryRFND(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchRFNDRazon")
    public @ResponseBody
    String SearchRFNDRazon(ModelMap map, HttpServletRequest request) {
        List<A3404Filter> lst;
        A3404Filter filter = new A3404Filter();

        try {
            logic = new BwrBSPLINKRFNDLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PAIS = request.getParameter("IN_PAIS").trim();

            lst = logic.SearchRFNDRazon(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3389Filter filter = new A3389Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new BwrBSPLINKRFNDLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst = logic.SearchReportQueryRFND(filter);

            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("AssociatedRefund");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14,CH_15;

            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);

            CH_00.setCellValue("Channel");
            CH_01.setCellValue("Document");
            CH_02.setCellValue("Ticket");
            CH_03.setCellValue("IATA");
            CH_04.setCellValue("Agency");
            CH_05.setCellValue("Application date");
            CH_06.setCellValue("Authorise / Reject date");
            CH_07.setCellValue("Country");
            CH_08.setCellValue("Cur.");
            CH_09.setCellValue("Net");
            CH_10.setCellValue("Passenger");
            CH_11.setCellValue("Auditor");
            CH_12.setCellValue("Reason BSP");
            CH_13.setCellValue("Sales audit");
            CH_14.setCellValue("Status");
            CH_15.setCellValue("Days");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);

            ++vj;

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);

                CH_00.setCellValue(lst.get(vi).A3389CHANEL);
                CH_01.setCellValue(lst.get(vi).A3389NUMER);
                CH_02.setCellValue(lst.get(vi).A3389TKT);
                CH_03.setCellValue(lst.get(vi).A3389IATA);
                CH_04.setCellValue(lst.get(vi).A3389NOMAGENCY);
                CH_05.setCellValue(lst.get(vi).A3389FAPPI);
                CH_06.setCellValue(lst.get(vi).A3389FAUTO);
                CH_07.setCellValue(lst.get(vi).A3389PAIS);
                CH_08.setCellValue(lst.get(vi).A3389MDA);
                CH_09.setCellValue(lst.get(vi).A3389TOTAL);
                CH_10.setCellValue(lst.get(vi).A3389PAX);
                CH_11.setCellValue(lst.get(vi).A3389REGAS);
                CH_12.setCellValue(lst.get(vi).A3389RACN);
                CH_13.setCellValue(lst.get(vi).A3389STATO);
                CH_14.setCellValue(lst.get(vi).A3389FLAG);
                CH_15.setCellValue(lst.get(vi).A3389DIAS);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            //sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            //sheet.autoSizeColumn(11, true);
            //sheet.autoSizeColumn(12, true);
            //sheet.autoSizeColumn(13, true);
            //sheet.autoSizeColumn(14, true);

            String fileNameDownload = String.format("AssociatedRefund - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "ProcesaManualRFND")
    public @ResponseBody
    String ProcesaManualRFND(ModelMap map, HttpServletRequest request) {
        String result = "";
        boolean iboolean;
        A3389Filter filter = new A3389Filter();
        ArrayList<A3404Filter> gridDataRazones = new ArrayList<A3404Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3404Filter data = new A3404Filter();
                data.A3404CODRZ = gsonObj.get("A3404CODRZ").getAsString();
                data.A3404ERROR = gsonObj.get("A3404ERROR").getAsString();
                data.A3404FAMIL = gsonObj.get("A3404FAMIL").getAsString();
                gridDataRazones.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new BwrBSPLINKRFNDLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualRFND(filter, gridDataRazones);
            if (result.equals("RECORD INSERTED") && filter.IN_DOCUMET.equals("SI") && filter.IN_STATUS.equals("F")) {
                iboolean = SendMail(filter);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public @ResponseBody
    String getUser() throws Exception {
        HashMap m = new HashMap();
        m.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
        return new Gson().toJson(m);
    }

    public boolean SendMail(A3389Filter filter) {
        boolean iboolean = false;
        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<String>();
        receptores.add("notificaciones@miatech.net");
        List<String> Ccp = new ArrayList<String>();
        String[] parts = null;
        String strMails = "ebarraza@aeromexico.com";
        //strMails = "zperez@miatech.net";
        parts = strMails.split(";");
        for (int i = 0; i < parts.length; i++) {
            Ccp.add(parts[i]);
        }
        String emisor = "notificaciones@miatech.net";//Data.EmailRe;
        String asunto = "El Ticket " + filter.IN_FORMA + " ya asido reembolsado anteriormente";//Data.Asunto;

        String VL_MENSAJE = "<b>Estimado(a):</b><br><br>" + "" + "Por este medio se env&iacute;a el Ticket reembolsado anteriormente.</b><br><br>"
                + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                + filter.IN_FORMA + " pais " + filter.IN_A3389PAIS + "</b><br><br>"
                + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
        String mensaje = VL_MENSAJE;//Data.Mensaje;
        iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
        return iboolean;

    }

}
