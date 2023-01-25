/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A2419Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.FaresatpcoFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import java.util.Iterator;
import java.util.UUID;
import net.miatech.beans.SaleAudit.A2393Filter;
import net.miatech.beans.SaleAudit.A2468Filter;
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
@RequestMapping("/FaresatpcoForm")
public class FaresatpcoFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private FaresatpcoFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A2419Filter> lst;
        A2419Filter filter = new A2419Filter();

        try {
            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_FROM_FILTER = request.getParameter("VP_FROM_FILTER");
            filter.VP_ORIGIN = request.getParameter("VP_ORIGIN");
            filter.VP_DESTIN = request.getParameter("VP_DESTIN");
            filter.VP_CARRIER = request.getParameter("VP_CARRIER");
            filter.VP_FARECLASS = request.getParameter("VP_FARECLASS");
            filter.V_PAX = request.getParameter("V_PAX");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.lstsearch(filter);
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
        A2419Filter filter = new A2419Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2419Filter> listaData = logic.lstsearch(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report_FareATPCO");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12;
            //<editor-fold defaultstate="collapsed" desc="row">
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

            CH_00.setCellValue("Carrier");
            CH_01.setCellValue("Fare Class");
            CH_02.setCellValue("Origin");
            CH_03.setCellValue("Destin");
            CH_04.setCellValue("Tariff");
            CH_05.setCellValue("Rule");
            CH_06.setCellValue("OW/RT");
            CH_07.setCellValue("Date Effective");
            CH_08.setCellValue("Date Discontinue");
            CH_09.setCellValue("Fare Amount");
            CH_10.setCellValue("CUR");
            CH_11.setCellValue("RTG");
            CH_12.setCellValue("Global");

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

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
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

                CH_00.setCellValue(listaData.get(vi).A2419CXRCD);
                CH_01.setCellValue(listaData.get(vi).A2419FCLAS);
                CH_02.setCellValue(listaData.get(vi).A2419OCITY);
                CH_03.setCellValue(listaData.get(vi).A2419DCITY);
                CH_04.setCellValue(listaData.get(vi).A2419TARNO);
                CH_05.setCellValue(listaData.get(vi).A2419RULNO);
                CH_06.setCellValue(listaData.get(vi).A2419OWRT);
                CH_07.setCellValue(listaData.get(vi).A2419TARDT);
                CH_08.setCellValue(listaData.get(vi).A2419DISC);
                CH_09.setCellValue(listaData.get(vi).A2419FAREFINAL);
                CH_10.setCellValue(listaData.get(vi).A2419MONEDA);
                CH_11.setCellValue(listaData.get(vi).A2419RTGNO);
                CH_12.setCellValue(listaData.get(vi).A2419GLBL);

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
                // </editor-fold>
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

            String fileNameDownload = String.format("Report_FareATPCO - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "loadFareRuleSearch")
    public @ResponseBody
    String loadFareRuleSearch(ModelMap map, HttpServletRequest request) {
        List<A2393Filter> lst;
        A2393Filter filter = new A2393Filter();

        try {
            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_TARNO = request.getParameter("VP_TARNO");
            filter.VP_CARRIER = request.getParameter("VP_CARRIER");
            filter.VP_RULNO = request.getParameter("VP_RULNO");
            filter.VP_EFF = request.getParameter("VP_EFF");

            lst = logic.loadFareRuleSearch(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadFareFootSearch")
    public @ResponseBody
    String loadFareFootSearch(ModelMap map, HttpServletRequest request) {
        List<A2468Filter> lst;
        A2468Filter filter = new A2468Filter();

        try {
            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_TARNO = request.getParameter("VP_TARNO");
            filter.VP_CXRCO = request.getParameter("VP_CXRCO");
            filter.VP_FTNT = request.getParameter("VP_FTNT");
            filter.VP_EFF = request.getParameter("VP_EFF");

            lst = logic.loadFareFootSearch(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "loadTableRuleSearch")
    public @ResponseBody
    String loadTableRuleSearch(ModelMap map, HttpServletRequest request) {
        List<A2393Filter> lst;
        A2393Filter filter = new A2393Filter();

        try {
            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_RECTY = request.getParameter("VP_RECTY");
            filter.VP_ACTIO = request.getParameter("VP_ACTIO");
            filter.VP_TARNO = request.getParameter("VP_TARNO");
            filter.VP_CARRIER = request.getParameter("VP_CARRIER");
            filter.VP_RULNO = request.getParameter("VP_RULNO");
            filter.VP_CATNO = request.getParameter("VP_CATNO");
            filter.VP_SEQNO = request.getParameter("VP_SEQNO");
            filter.VP_FCLAS = request.getParameter("VP_FCLAS");
            filter.VP_EFF = request.getParameter("VP_EFF");


            lst = logic.loadTableRuleSearch(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
     @RequestMapping(value = "loadTableFootSearch")
    public @ResponseBody
    String loadTableFootSearch(ModelMap map, HttpServletRequest request) {
        List<A2468Filter> lst;
        A2468Filter filter = new A2468Filter();

        try {
            logic = new FaresatpcoFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_RECTY = request.getParameter("VP_RECTY");
            filter.VP_ACTIO = request.getParameter("VP_ACTIO");
            filter.VP_TARNO = request.getParameter("VP_TARNO");
            filter.VP_CARRIER = request.getParameter("VP_CARRIER");
            filter.VP_FTNT = request.getParameter("VP_FTNT");
            filter.VP_CATNO = request.getParameter("VP_CATNO");
            filter.VP_SEQNO = request.getParameter("VP_SEQNO");
            filter.VP_EFF = request.getParameter("VP_EFF");

            lst = logic.loadTableFootSearch(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

}
