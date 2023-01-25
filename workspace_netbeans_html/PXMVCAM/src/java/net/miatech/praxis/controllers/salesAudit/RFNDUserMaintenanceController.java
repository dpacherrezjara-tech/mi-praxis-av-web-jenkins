/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3650Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BwrQueryRefundLogic;
import net.miatech.praxis.logic.salesAudit.RFNDUserMaintenanceLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RFNDUserMaintenance")
public class RFNDUserMaintenanceController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDUserMaintenanceLogic logic;

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3650Filter> lst;
        A3650Filter filter = new A3650Filter();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_AREA = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_USER = request.getParameter("IN_USER").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchRefundUser(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimientoRfndUser")
    public @ResponseBody
    String mantenimientoRfndUser(ModelMap map, HttpServletRequest request) {
        String result = "";
        A3650Filter filter = new A3650Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            RFNDUserMaintenanceLogic logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit2")
    public @ResponseBody
    String loadDataInit2(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();
            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataInit")
    public @ResponseBody
    String loadDataInit(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit();

            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "ALL");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOAM");
            lstData.add(mapProperties);
            mapProperties = new HashMap<>();
            mapProperties.put("A3389REGAS", "AUTOPR");
            lstData.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A3389REGAS", lst.get(vi).A3389REGAS);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3650Filter filter = new A3650Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new RFNDUserMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3650Filter> lst = logic.SearchRefundUser(filter);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Auditor");
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

            CH_00.setCellValue("Auditor");
            CH_01.setCellValue("Area");
            CH_02.setCellValue("System date");
            CH_03.setCellValue("Date efective");
            CH_04.setCellValue("Date discontinuity");
            CH_05.setCellValue("Estatus");

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

                CH_00.setCellValue(lst.get(vi).A3650USER);
                CH_01.setCellValue(lst.get(vi).A3650AREA);
                CH_02.setCellValue(lst.get(vi).A3650FREGI);
                CH_03.setCellValue(lst.get(vi).A3650FALTA);
                CH_04.setCellValue(lst.get(vi).A3650FBAJA);
                CH_05.setCellValue(lst.get(vi).A3650FLAG);

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
            sheet.autoSizeColumn(6, true);

            String fileNameDownload = String.format("Auditor - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

}
