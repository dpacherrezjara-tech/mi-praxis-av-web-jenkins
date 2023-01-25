/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.BsplinkReportsStatisticsdetLogic;
import net.miatech.praxis.logic.salesAudit.BwrRefundTicketControlLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lremicio
 */
@Controller
@Scope("request")
@RequestMapping("/BwrRefundTicketControl")
public class BwrRefundTicketControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BwrRefundTicketControlLogic logic;

    @RequestMapping(value = "searchRefundTicketControl")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3389Filter> lst;
        A3389Filter filter = new A3389Filter();
        try {
            logic = new BwrRefundTicketControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();

            if (!bExcel) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.searchRefundTicketControl(filter);
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

            logic = new BwrRefundTicketControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3389Filter> lst = logic.searchRefundTicketControl(filter);

            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("RefundTicketControl");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08;

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

            CH_00.setCellValue("System date");
            CH_01.setCellValue("Ticket");
            CH_02.setCellValue("Channel");
            CH_02.setCellValue("Country");
            CH_04.setCellValue("Send to audit");
            CH_05.setCellValue("Return to audit");
            CH_06.setCellValue("Send to sabre");
            CH_07.setCellValue("Currency");
            CH_08.setCellValue("Amount");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);

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

                CH_00.setCellValue(lst.get(vi).A3389FREGI);
                CH_01.setCellValue(lst.get(vi).A3389TKT);
                CH_02.setCellValue(lst.get(vi).A3389CHANEL);
                CH_03.setCellValue(lst.get(vi).A3389PAIS);
                CH_04.setCellValue(lst.get(vi).A3389FLAG);
                CH_05.setCellValue(lst.get(vi).A3389STATO);
                CH_06.setCellValue(lst.get(vi).A3389STATU);
                CH_07.setCellValue(lst.get(vi).A3389MDA);
                CH_08.setCellValue(lst.get(vi).A3389TOTAL);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            //sheet.autoSizeColumn(2, true);
            //sheet.autoSizeColumn(3, true);
            //sheet.autoSizeColumn(4, true);
            // sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            //sheet.autoSizeColumn(7, true);

            String fileNameDownload = String.format("RefundTicketControl - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    /*
    public JavaToFlexResponse searchRefundTicketControl(A3389Filter filter) {
        JavaToFlexResponse resp = new JavaToFlexResponse();

        List<A3389Filter> listaData;

        serverSession.getCNXIBMDB2().open();
        BwrRefundTicketControlLogic logic = new BwrRefundTicketControlLogic();
        logic.setSession(serverSession);
        try {

            listaData = logic.searchRefundTicketControl(filter);
            resp.vars.put("lst_search", listaData);

        } catch (SQLException e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        return resp;
    }
     */
}
