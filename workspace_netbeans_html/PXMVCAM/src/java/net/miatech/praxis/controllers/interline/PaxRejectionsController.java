package net.miatech.praxis.controllers.interline;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.PaxRejectionsLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.interline.filter.WRF016Filter;
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

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/PaxRejections")
public class PaxRejectionsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PaxRejectionsLogic logic;
    private WRF016Filter filter;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  search");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX189S01WRF001(filter);

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            map.put("listaData", hm.get("lstRtn"));

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByRank")
    public @ResponseBody
    String searchByRank(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByRank");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX189S02WRF003(filter);

            map.put("success", true);
            map.put("listaDataRk1", hm.get("DETALLE1"));
            map.put("listaDataRk2", hm.get("DETALLE2"));
            map.put("listaDataRk3", hm.get("DETALLE3"));
            map.put("listaDataRk4", hm.get("DETALLE4"));

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByTDOC")
    public @ResponseBody
    String searchByTDOC(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByTDOC");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S03WRF001(filter);

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            ArrayList<WRF016Filter> lstRtn = (ArrayList) hm.get("lstRtn");
            map.put("data", lstRtn);
            map.put("total", lstRtn.size() > 0 ? lstRtn.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByTkt")
    public @ResponseBody
    String searchByTkt(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByTkt");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            if (filter.TDOC.contains("4")) {
                hm = logic.loadPX189S03A020(filter);
            } else {
                hm = logic.loadPX165S04WRF002(filter);
            }

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            ArrayList<WRF016Filter> lstRtn = (ArrayList) hm.get("lstRtn");
            map.put("data", lstRtn);
            map.put("total", lstRtn.size() > 0 ? lstRtn.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByInvoice")
    public @ResponseBody
    String searchByInvoice(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        WRF016Filter obj;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByInvoice");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            obj = logic.loadPX165S05WRF001(filter);

            map.put("success", true);
            map.put("objWRF016Filter", obj);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        HashMap hm;
        try {
            WRF016Filter filter = new WRF016Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            List<WRF016Filter> listaData;
            listaData = new ArrayList<>(0);
            List<WRF016Filter> listaData2 = new ArrayList<>(0);

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX189S01WRF001(filter);

            listaData = (List<WRF016Filter>) hm.get("lstRtn");
            listaData2 = (List<WRF016Filter>) hm.get("lstCurrency");

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

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
            Iterator iter2 = listaData2.iterator();
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
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);

            CH1_0.setCellValue("Billing Month");
            CH1_1.setCellValue("Period");
            CH1_2.setCellValue("Type of Doc");
            CH1_3.setCellValue("Total");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("%Audit");
            CH1_8.setCellValue("Invoiced");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("Rejected");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("UATP");
            CH1_19.setCellValue("FEE");
            CH1_20.setCellValue("%Rec");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 20, 20));
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
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);

            CH2_0.setCellValue("");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Docs");
            CH2_4.setCellValue("Supp");
            CH2_5.setCellValue("Audit Docs");
            CH2_6.setCellValue("RMs");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("Amount");
            CH2_9.setCellValue("Gross");
            CH2_10.setCellValue("Commision");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("Tax");
            CH2_13.setCellValue("Amount");
            CH2_14.setCellValue("Gross");
            CH2_15.setCellValue("ISC");
            CH2_16.setCellValue("Tax");
            CH2_17.setCellValue("%Tax");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));

            ++vj;
             //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);
            Cell CH3_20 = row3.createCell(20);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("ISC");
            CH3_11.setCellValue("CSC");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);

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
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).PERMONT);
                rcell2.setCellValue(listaData.get(vi).strDescripcion);
                rcell3.setCellValue(listaData.get(vi).QCUPON);
                rcell4.setCellValue(listaData.get(vi).QSFIM);
                rcell5.setCellValue(listaData.get(vi).QAUDI);
                rcell6.setCellValue(listaData.get(vi).QRM);
                rcell7.setCellValue(listaData.get(vi).dblPerRev);
                rcell8.setCellValue(listaData.get(vi).NETI);
                rcell9.setCellValue(listaData.get(vi).GROSSI);
                rcell10.setCellValue(listaData.get(vi).ISCI);
                rcell11.setCellValue(listaData.get(vi).ISCUA);
                rcell12.setCellValue(listaData.get(vi).TAXI);
                rcell13.setCellValue(listaData.get(vi).NETO);
                rcell14.setCellValue(listaData.get(vi).GROSSN);
                rcell15.setCellValue(listaData.get(vi).ISCN);
                rcell16.setCellValue(listaData.get(vi).TAXN);
                rcell17.setCellValue(listaData.get(vi).dblPerTax);
                rcell18.setCellValue(listaData.get(vi).ISCMA);
                rcell19.setCellValue(listaData.get(vi).ISCMA);
                rcell20.setCellValue(listaData.get(vi).dblPerRec);
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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);

            ++vj;
            ++vj;
            //============================================
            /* 
            
            
             SEGUNDA GRILLA 
            
            
             */
            // ====== CREANDO TITULOS ======================================
            // ======  Nivel 1 ==========
            row1 = sheet.createRow(vj);
            CH1_0 = row1.createCell(0);
            CH1_1 = row1.createCell(1);
            CH1_2 = row1.createCell(2);
            CH1_3 = row1.createCell(3);
            CH1_4 = row1.createCell(4);
            CH1_5 = row1.createCell(5);
            CH1_6 = row1.createCell(6);
            CH1_7 = row1.createCell(7);
            CH1_8 = row1.createCell(8);
            CH1_9 = row1.createCell(9);
            CH1_10 = row1.createCell(10);
            CH1_11 = row1.createCell(11);
            CH1_12 = row1.createCell(12);
            CH1_13 = row1.createCell(13);
            CH1_14 = row1.createCell(14);
            CH1_15 = row1.createCell(15);
            CH1_16 = row1.createCell(16);
            CH1_17 = row1.createCell(17);
            CH1_18 = row1.createCell(18);

            CH1_0.setCellValue("Invoice Currency");
            CH1_1.setCellValue("Total");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("%Audit");
            CH1_7.setCellValue("Invoiced");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Rejected");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("UATP");
            CH1_18.setCellValue("FEE");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 5));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 12, 16));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 2, 18, 18));

            ++vj;
             //============================================

            // ======  Nivel 2 ==========
            row2 = sheet.createRow(vj);
            CH2_0 = row2.createCell(0);
            CH2_1 = row2.createCell(1);
            CH2_2 = row2.createCell(2);
            CH2_3 = row2.createCell(3);
            CH2_4 = row2.createCell(4);
            CH2_5 = row2.createCell(5);
            CH2_6 = row2.createCell(6);
            CH2_7 = row2.createCell(7);
            CH2_8 = row2.createCell(8);
            CH2_9 = row2.createCell(9);
            CH2_10 = row2.createCell(10);
            CH2_11 = row2.createCell(11);
            CH2_12 = row2.createCell(12);
            CH2_13 = row2.createCell(13);
            CH2_14 = row2.createCell(14);
            CH2_15 = row2.createCell(15);
            CH2_16 = row2.createCell(16);
            CH2_17 = row2.createCell(17);
            CH2_18 = row2.createCell(18);

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Inv");
            CH2_2.setCellValue("Docs");
            CH2_3.setCellValue("Supp");
            CH2_4.setCellValue("Audit Docs");
            CH2_5.setCellValue("RM's");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("Amount");
            CH2_8.setCellValue("Gross");
            CH2_9.setCellValue("Commision");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("Tax");
            CH2_12.setCellValue("Amount");
            CH2_13.setCellValue("Gross");
            CH2_14.setCellValue("ISC");
            CH2_15.setCellValue("Tax");
            CH2_16.setCellValue("%Tax");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 16, 16));
            ++vj;
             //============================================

            // ======  Nivel 3 ==========
            row3 = sheet.createRow(vj);
            CH3_0 = row3.createCell(0);
            CH3_1 = row3.createCell(1);
            CH3_2 = row3.createCell(2);
            CH3_3 = row3.createCell(3);
            CH3_4 = row3.createCell(4);
            CH3_5 = row3.createCell(5);
            CH3_6 = row3.createCell(6);
            CH3_7 = row3.createCell(7);
            CH3_8 = row3.createCell(8);
            CH3_9 = row3.createCell(9);
            CH3_10 = row3.createCell(10);
            CH3_11 = row3.createCell(11);
            CH3_12 = row3.createCell(12);
            CH3_13 = row3.createCell(13);
            CH3_14 = row3.createCell(14);
            CH3_15 = row3.createCell(15);
            CH3_16 = row3.createCell(16);
            CH3_17 = row3.createCell(17);
            CH3_18 = row3.createCell(18);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("ISC");
            CH3_10.setCellValue("CSC");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================
            vi = 0;
            while (iter2.hasNext()) {
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
                Cell rcell18 = row1.createCell(18);

                rcell0.setCellValue(listaData2.get(vi).CURRENP);
                rcell1.setCellValue(listaData2.get(vi).QTYINV);
                rcell2.setCellValue(listaData2.get(vi).QCUPON);
                rcell3.setCellValue(listaData2.get(vi).QSFIM);
                rcell4.setCellValue(listaData2.get(vi).QAUDI);
                rcell5.setCellValue(listaData2.get(vi).QRM);
                rcell6.setCellValue(listaData2.get(vi).dblPerRev);
                rcell7.setCellValue(listaData2.get(vi).NETI);
                rcell8.setCellValue(listaData2.get(vi).GROSSI);
                rcell9.setCellValue(listaData2.get(vi).ISCI);
                rcell10.setCellValue(listaData2.get(vi).ISCUA);
                rcell11.setCellValue(listaData2.get(vi).TAXI);
                rcell12.setCellValue(listaData2.get(vi).NETO);
                rcell13.setCellValue(listaData2.get(vi).GROSSN);
                rcell14.setCellValue(listaData2.get(vi).ISCN);
                rcell15.setCellValue(listaData2.get(vi).TAXN);
                rcell16.setCellValue(listaData2.get(vi).dblPerTax);
                rcell17.setCellValue(listaData2.get(vi).ISCMA);
                rcell18.setCellValue(listaData2.get(vi).ISCMA);
                iter2.next();
                ++vi;
                ++vj;
            }

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PaxRejectionsController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "getXLSX_ByTDOC")
    public @ResponseBody
    void getXLSX_ByTDOC(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_ByTDOC");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        HashMap hm;
        try {

            WRF016Filter filter = new WRF016Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            List<WRF016Filter> listaData;
            listaData = new ArrayList<>(0);
            List<WRF016Filter> listaData2 = new ArrayList<>(0);

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S03WRF001(filter);

            listaData = (List<WRF016Filter>) hm.get("lstRtn");
            listaData2 = (List<WRF016Filter>) hm.get("lstCurrency");
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

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
            Iterator iter2 = listaData2.iterator();
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

            CH1_0.setCellValue("Air");
            CH1_1.setCellValue("Source");
            CH1_2.setCellValue("Invoice");
            CH1_3.setCellValue("Airline Name");
            CH1_4.setCellValue("Total Docs");
            CH1_5.setCellValue("Total Supp");
            CH1_6.setCellValue("Total Audit");
            CH1_7.setCellValue("RMs");
            CH1_8.setCellValue("Curr");
            CH1_9.setCellValue("Invoice Amount");
            CH1_10.setCellValue("Rejected Amount");
            CH1_11.setCellValue("%Rec");
            CH1_12.setCellValue("Send Date");
            CH1_13.setCellValue("Date Closes");
            CH1_14.setCellValue("SPMI");
            CH1_15.setCellValue("Group");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
             //============================================

            //============================================
            vi = 0;
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

                rcell0.setCellValue(listaData.get(vi).AIRLINE);
                rcell1.setCellValue(listaData.get(vi).TUSO);
                rcell2.setCellValue(listaData.get(vi).INVOICE);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).QCUPON);
                rcell5.setCellValue(listaData.get(vi).QSFIM);
                rcell6.setCellValue(listaData.get(vi).QAUDI);
                rcell7.setCellValue(listaData.get(vi).QRM);
                rcell8.setCellValue(listaData.get(vi).CURRENP);
                rcell9.setCellValue(listaData.get(vi).NETI);
                rcell10.setCellValue(listaData.get(vi).NETO);
                rcell11.setCellValue(listaData.get(vi).dblPerRec);
                rcell12.setCellValue(listaData.get(vi).strFormatDate1);
                rcell13.setCellValue(listaData.get(vi).strFormatDate2);
                rcell14.setCellValue(listaData.get(vi).FMETHOD);
                rcell15.setCellValue(listaData.get(vi).GRUPO);
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

            ++vj;
            ++vj;

            //============================================
            // SEGUNDA GRILLA
            //============================================
            // ====== CREANDO TITULOS ===================
            // ======  Nivel 1 ==========
            row1 = sheet.createRow(vj);
            CH1_0 = row1.createCell(0);
            CH1_1 = row1.createCell(1);
            CH1_2 = row1.createCell(2);
            CH1_3 = row1.createCell(3);
            CH1_4 = row1.createCell(4);
            CH1_5 = row1.createCell(5);
            CH1_6 = row1.createCell(6);
            CH1_7 = row1.createCell(7);
            CH1_8 = row1.createCell(8);
            CH1_9 = row1.createCell(9);
            CH1_10 = row1.createCell(10);
            CH1_11 = row1.createCell(11);

            CH1_0.setCellValue("Invoice Currency");
            CH1_1.setCellValue("Total Invoces");
            CH1_2.setCellValue("Total Docs");
            CH1_3.setCellValue("Total Aud");
            CH1_4.setCellValue("RMs");
            CH1_5.setCellValue("% Audited");
            CH1_6.setCellValue("Total Supported");
            CH1_7.setCellValue("Total Supp Audited");
            CH1_8.setCellValue("Total Supp RM");
            CH1_9.setCellValue("Invoice Amount");
            CH1_10.setCellValue("Rejected Amount");
            CH1_11.setCellValue("Ttl Corr.");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);

            ++vj;
            //============================================
            vi = 0;
            while (iter2.hasNext()) {
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

                rcell0.setCellValue(listaData2.get(vi).CURRENP);
                rcell1.setCellValue(listaData2.get(vi).QTYINV);
                rcell2.setCellValue(listaData2.get(vi).QCUPON);
                rcell3.setCellValue(listaData2.get(vi).QAUDI);
                rcell4.setCellValue(listaData2.get(vi).QRM);
                rcell5.setCellValue(listaData2.get(vi).dblPerRev);
                rcell6.setCellValue(listaData2.get(vi).QSFIM);
                rcell7.setCellValue(listaData2.get(vi).QSOPAUD);
                rcell8.setCellValue(listaData2.get(vi).QSOPRM);
                rcell9.setCellValue(listaData2.get(vi).NETI);
                rcell10.setCellValue(listaData2.get(vi).NETO);
                rcell11.setCellValue(listaData2.get(vi).QCORR);
                iter2.next();
                ++vi;
                ++vj;
            }
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PaxRejectionsController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "getXLSX_ByTkt")
    public @ResponseBody
    void getXLSX_ByTkt(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_ByTkt");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        HashMap hm;
        try {

            WRF016Filter filter = new WRF016Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            List<WRF016Filter> listaData;
            List<WRF016Filter> listaData2;

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S03WRF001(filter);

            if (filter.TDOC.contains("4")) {
                hm = logic.loadPX189S03A020(filter);
            } else {
                hm = logic.loadPX165S04WRF002(filter);
            }

            listaData = (List<WRF016Filter>) hm.get("lstRtn");
            listaData2 = (List<WRF016Filter>) hm.get("lstCurrency");

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

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
            Iterator iter2 = listaData2.iterator();
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

            CH1_0.setCellValue("Dayly Summay Report View (FC)");

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
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));
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

            CH2_0.setCellValue("Int. Sequence Number");
            CH2_1.setCellValue("Ticket Number");
            CH2_2.setCellValue("Curr");
            CH2_3.setCellValue("Invoice Amount");
            CH2_4.setCellValue("Accepted Amount");
            CH2_5.setCellValue("Net Amount");
            CH2_6.setCellValue("RM");
            CH2_7.setCellValue("SPMI");
            CH2_8.setCellValue("Sector");
            CH2_9.setCellValue("Penalty");
            CH2_10.setCellValue("Reject Number");
            CH2_11.setCellValue("Group");

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
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);

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
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).NROPRT);
                rcell1.setCellValue(listaData.get(vi).strDescripcion);
                rcell2.setCellValue(listaData.get(vi).CURRENP);
                rcell3.setCellValue(listaData.get(vi).NETI);
                rcell4.setCellValue(listaData.get(vi).NETM);
                rcell5.setCellValue(listaData.get(vi).NETO);
                rcell6.setCellValue(listaData.get(vi).RMACCEPT);
                rcell7.setCellValue(listaData.get(vi).FMETHOD);
                rcell8.setCellValue(listaData.get(vi).RUTAP);
                rcell9.setCellValue(listaData.get(vi).IPENAL);
                rcell10.setCellValue(listaData.get(vi).NRORM);
                rcell11.setCellValue(listaData.get(vi).GRUPO);
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

            //============================================
            // SEGUNDA GRILLA
            //============================================
            vj++;
            vj++;
            // ====== CREANDO TITULOS ======================================
            // ======  Nivel 1 ==========
            row1 = sheet.createRow(vj);
            CH1_0 = row1.createCell(0);
            CH1_1 = row1.createCell(1);
            CH1_2 = row1.createCell(2);
            CH1_3 = row1.createCell(3);
            CH1_4 = row1.createCell(4);
            CH1_5 = row1.createCell(5);
            CH1_6 = row1.createCell(6);
            CH1_7 = row1.createCell(7);
            CH1_8 = row1.createCell(8);
            CH1_9 = row1.createCell(9);
            CH1_10 = row1.createCell(10);

            CH1_0.setCellValue("Totals");

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
            CH1_10.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 10));
            ++vj;
             //============================================

            // ======  Nivel 2 ==========
            row2 = sheet.createRow(vj);
            CH2_0 = row2.createCell(0);
            CH2_1 = row2.createCell(1);
            CH2_2 = row2.createCell(2);
            CH2_3 = row2.createCell(3);
            CH2_4 = row2.createCell(4);
            CH2_5 = row2.createCell(5);
            CH2_6 = row2.createCell(6);
            CH2_7 = row2.createCell(7);
            CH2_8 = row2.createCell(8);
            CH2_9 = row2.createCell(9);
            CH2_10 = row2.createCell(10);

            CH2_0.setCellValue("Clearing Date");
            CH2_1.setCellValue("Total Cpns");
            CH2_2.setCellValue("Total Audited");
            CH2_3.setCellValue("Total RM");
            CH2_4.setCellValue("% Audited");
            CH2_5.setCellValue("Reject Totals - Gross");
            CH2_6.setCellValue("Reject Totals - ISC");
            CH2_7.setCellValue("Reject Totals - TAX");
            CH2_8.setCellValue("Invoice Amount");
            CH2_9.setCellValue("Rejected Amount");
            CH2_10.setCellValue("% Recovery");

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
            CH2_10.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================
            vi = 0;
            while (iter2.hasNext()) {
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

                rcell0.setCellValue(listaData2.get(vi).strFormatDate);
                rcell1.setCellValue(listaData2.get(vi).QCUPON);
                rcell2.setCellValue(listaData2.get(vi).QAUDI);
                rcell3.setCellValue(listaData2.get(vi).QRM);
                rcell4.setCellValue(listaData2.get(vi).dblPerRev);
                rcell5.setCellValue(listaData2.get(vi).GROSSN);
                rcell6.setCellValue(listaData2.get(vi).ISCN);
                rcell7.setCellValue(listaData2.get(vi).TAXN);
                rcell8.setCellValue(listaData2.get(vi).NETI);
                rcell9.setCellValue(listaData2.get(vi).NETO);
                rcell10.setCellValue(listaData2.get(vi).dblPerRec);
                iter2.next();
                ++vi;
                ++vj;
            }
            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PaxRejectionsController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "searchByRejectNumber")
    public @ResponseBody
    String searchByRejectNumber(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByReject");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());

            hm = logic.loadPX189SQP03909(filter);

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            ArrayList<WRF016Filter> lstRtn = (ArrayList) hm.get("lstRtn");
            map.put("data", lstRtn);
            map.put("total", lstRtn.size() > 0 ? lstRtn.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByTktNumber")
    public @ResponseBody
    String searchByTktNumber(ModelMap map, HttpServletRequest request) {
        filter = new WRF016Filter();
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PaxRejectionsController :  searchByTktNumber");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new PaxRejectionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            hm = logic.loadPX189SQP03910(filter);

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            ArrayList<WRF016Filter> lstRtn = (ArrayList) hm.get("lstRtn");
            map.put("data", lstRtn);
            map.put("total", lstRtn.size() > 0 ? lstRtn.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

}
