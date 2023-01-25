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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.LoadInterlineLogic;
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
@RequestMapping("/WorkProgressReport")
public class WorkProgressReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadInterlineLogic logic;
    private WRF016Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new WRF016Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "WorkProgressReportController :  search");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S01WRF016(filter);

            map.put("success", true);
            map.put("listaData", hm.get("lst1"));
            map.put("listaData2", hm.get("lst2"));
            map.put("listaRates", hm.get("lstRates"));
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByMonth")
    public @ResponseBody
    String searchByMonth(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new WRF016Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "WorkProgressReportController :  searchByMonth");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S02WRF001(filter);

            map.put("success", true);
            map.put("lstCurrency", hm.get("lstCurrency"));
            map.put("listaData", hm.get("lstRtn"));
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByTDOC")
    public @ResponseBody
    String searchByTDOC(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new WRF016Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "WorkProgressReportController :  searchByTDOC");

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

            logic = new LoadInterlineLogic();
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
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByTkt")
    public @ResponseBody
    String searchByTkt(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new WRF016Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "WorkProgressReportController :  searchByTkt");

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

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());

            //hm = logic.loadPX165S04WRF002(filter);
            if (filter.TDOC.equals("4")) {
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
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchByInvoice")
    public @ResponseBody
    String searchByInvoice(ModelMap map, HttpServletRequest request) {
        WRF016Filter obj;
        filter = new WRF016Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "WorkProgressReportController :  searchByInvoice");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());

            obj = logic.loadPX165S05WRF001(filter);

            map.put("success", true);
            map.put("objWRF016Filter", obj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        filter = new WRF016Filter();
        HashMap hm;
        Boolean bExcel = true;
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S01WRF016(filter);

            List<WRF016Filter> listaData = (ArrayList) hm.get("lst1");
            List<WRF016Filter> listaData2 = (ArrayList) hm.get("lst2");
            List<WRF016Filter> listaData3 = (ArrayList) hm.get("lstRates");

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
            Iterator iter3 = listaData3.iterator();
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

            CH1_0.setCellValue("Total Audited Coupons by Billing Month vs. Rejected Month ( FC )");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 16));
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

            CH2_0.setCellValue("Clearing Date");
            CH2_1.setCellValue(listaData.get(0).strDescripcion4); //strDescripcion4
            CH2_3.setCellValue("2020-Mar");
            CH2_5.setCellValue("2020-Apr");
            CH2_7.setCellValue("2020-May");
            CH2_9.setCellValue("2020-Jun");
            CH2_11.setCellValue("2020-jul");
            CH2_13.setCellValue("Total Documents");
            CH2_14.setCellValue("Total Audited Documents");
            CH2_15.setCellValue("% Reviewed");
            CH2_16.setCellValue("Total Rejected Coupons");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
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

            CH3_0.setCellValue("Invoice Date");
            CH3_1.setCellValue("Audit");
            CH3_2.setCellValue("Rej");
            CH3_3.setCellValue("Audit");
            CH3_4.setCellValue("Rej");
            CH3_5.setCellValue("Audit");
            CH3_6.setCellValue("Rej");
            CH3_7.setCellValue("Audit");
            CH3_8.setCellValue("Rej");
            CH3_9.setCellValue("Audit");
            CH3_10.setCellValue("Rej");
            CH3_11.setCellValue("Audit");
            CH3_12.setCellValue("Rej");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));

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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).Aud1);
                rcell2.setCellValue(listaData.get(vi).Rej1);
                rcell3.setCellValue(listaData.get(vi).Aud2);
                rcell4.setCellValue(listaData.get(vi).Rej2);
                rcell5.setCellValue(listaData.get(vi).Aud3);
                rcell6.setCellValue(listaData.get(vi).Rej3);
                rcell7.setCellValue(listaData.get(vi).Aud4);
                rcell8.setCellValue(listaData.get(vi).Rej4);
                rcell9.setCellValue(listaData.get(vi).Aud5);
                rcell10.setCellValue(listaData.get(vi).Rej5);
                rcell11.setCellValue(listaData.get(vi).Aud6);
                rcell12.setCellValue(listaData.get(vi).Rej6);
                rcell13.setCellValue(listaData.get(vi).QCUPON);
                rcell14.setCellValue(listaData.get(vi).QAUDI);
                rcell15.setCellValue(listaData.get(vi).Porc);
                rcell16.setCellValue(listaData.get(vi).QRM);
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

            /// ********************************************************************** ///
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
            CH1_11 = row1.createCell(11);
            CH1_12 = row1.createCell(12);

            CH1_0.setCellValue("Total Audited Document and Rejected Documents by Type of Doc");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 12));
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

                rcell0.setCellValue(listaData2.get(vi).strDescripcion);
                rcell1.setCellValue(listaData2.get(vi).Aud1);
                rcell2.setCellValue(listaData2.get(vi).Rej1);
                rcell3.setCellValue(listaData2.get(vi).Aud2);
                rcell4.setCellValue(listaData2.get(vi).Rej2);
                rcell5.setCellValue(listaData2.get(vi).Aud3);
                rcell6.setCellValue(listaData2.get(vi).Rej3);
                rcell7.setCellValue(listaData2.get(vi).Aud4);
                rcell8.setCellValue(listaData2.get(vi).Rej4);
                rcell9.setCellValue(listaData2.get(vi).Aud5);
                rcell10.setCellValue(listaData2.get(vi).Rej5);
                rcell11.setCellValue(listaData2.get(vi).Aud6);
                rcell12.setCellValue(listaData2.get(vi).Rej6);
                iter2.next();
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

            vj++;
            vj++;

            // ***************************************************************
            row1 = sheet.createRow(vj);
            CH1_0 = row1.createCell(0);
            CH1_1 = row1.createCell(1);
            CH1_2 = row1.createCell(2);
            CH1_3 = row1.createCell(3);
            CH1_4 = row1.createCell(4);
            CH1_5 = row1.createCell(5);
            CH1_6 = row1.createCell(6);

            CH1_0.setCellValue("Currency");
            CH1_1.setCellValue("2020-Feb");
            CH1_2.setCellValue("2020-Mar");
            CH1_3.setCellValue("2020-Apr");
            CH1_4.setCellValue("2020-May");
            CH1_5.setCellValue("2020-Jun");
            CH1_6.setCellValue("2020-Jul");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 6, 6));

            ++vj;
            //============================================

            vi = 0;
            while (iter3.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);

                rcell0.setCellValue(listaData3.get(vi).strDescripcion);
                rcell1.setCellValue(listaData3.get(vi).totNet1);
                rcell2.setCellValue(listaData3.get(vi).totNet2);
                rcell3.setCellValue(listaData3.get(vi).totNet3);
                rcell4.setCellValue(listaData3.get(vi).totNet4);
                rcell5.setCellValue(listaData3.get(vi).totNet5);
                rcell6.setCellValue(listaData3.get(vi).totNet6);
                iter3.next();
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

    @RequestMapping(value = "getXLSX_Month")
    public @ResponseBody
    void getXLSX_Month(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_Month");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        filter = new WRF016Filter();
        Boolean bExcel = true;
        HashMap hm;
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S02WRF001(filter);

            List<WRF016Filter> listaData = (ArrayList) hm.get("lstRtn");
            List<WRF016Filter> listaData2 = (ArrayList) hm.get("lstCurrency");

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

            CH1_0.setCellValue("Billing");
            CH1_1.setCellValue("Type");
            CH1_2.setCellValue("Total Documents");
            CH1_7.setCellValue("Total Supported Documents");
            CH1_10.setCellValue("Currency");
            CH1_11.setCellValue("Total Amount");
            CH1_14.setCellValue("Tlt");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
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

            CH2_0.setCellValue("Month");
            CH2_1.setCellValue("of Doc");
            CH2_2.setCellValue("Inv");
            CH2_3.setCellValue("Cpns");
            CH2_4.setCellValue("Aud");
            CH2_5.setCellValue("&Aud");
            CH2_6.setCellValue("RMs");
            CH2_7.setCellValue("Cpns");
            CH2_8.setCellValue("Aud");
            CH2_9.setCellValue("RM");
            CH2_11.setCellValue("Invoice");
            CH2_12.setCellValue("Rejected");
            CH2_13.setCellValue("%Rec");
            CH2_14.setCellValue("Corr.");

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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).strDescripcion);
                rcell2.setCellValue(listaData.get(vi).QTYINV);
                rcell3.setCellValue(listaData.get(vi).QCUPON);
                rcell4.setCellValue(listaData.get(vi).QAUDI);
                rcell5.setCellValue(listaData.get(vi).dblPerRev);
                rcell6.setCellValue(listaData.get(vi).QRM);
                rcell7.setCellValue(listaData.get(vi).QSFIM);
                rcell8.setCellValue(listaData.get(vi).QSOPAUD);
                rcell9.setCellValue(listaData.get(vi).QSOPRM);
                rcell10.setCellValue(listaData.get(vi).CURRENP);
                rcell11.setCellValue(listaData.get(vi).NETI);
                rcell12.setCellValue(listaData.get(vi).NETO);
                rcell13.setCellValue(listaData.get(vi).dblPerRec);
                rcell14.setCellValue(listaData.get(vi).QCORR);
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

            vj++;
            vj++;

            // *************************************************************** //
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

            CH1_0.setCellValue("Invoice");
            CH1_1.setCellValue("Total");
            CH1_2.setCellValue("Total");
            CH1_3.setCellValue("Total");
            CH1_4.setCellValue("RMs");
            CH1_5.setCellValue("%");
            CH1_6.setCellValue("Total");
            CH1_7.setCellValue("Total Supp");
            CH1_8.setCellValue("Total Supp");
            CH1_9.setCellValue("Invoice");
            CH1_10.setCellValue("Rejected");
            CH1_11.setCellValue("Ttl");

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
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 11, 11));
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

            CH2_0.setCellValue("Currency");
            CH2_1.setCellValue("Invoices");
            CH2_2.setCellValue("Docs");
            CH2_3.setCellValue("Aud");
            CH2_5.setCellValue("Audited");
            CH2_6.setCellValue("Supported");
            CH2_7.setCellValue("Audited");
            CH2_8.setCellValue("RM");
            CH2_9.setCellValue("Amount");
            CH2_10.setCellValue("Amount");
            CH2_11.setCellValue("Corr.");

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
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_TdocData")
    public @ResponseBody
    void getXLSX_TdocData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_TdocData");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        filter = new WRF016Filter();
        Boolean bExcel = true;
        HashMap hm;
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S03WRF001(filter);

            List<WRF016Filter> listaData = (ArrayList) hm.get("lstRtn");
            List<WRF016Filter> listaData2 = (ArrayList) hm.get("lstCurrency");

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

            CH1_0.setCellValue("Billing");
            CH1_1.setCellValue("Invoice");
            CH1_2.setCellValue("Air");
            CH1_3.setCellValue("Airline");
            CH1_4.setCellValue("Total");
            CH1_5.setCellValue("Total");
            CH1_6.setCellValue("Total");
            CH1_7.setCellValue("RMs");
            CH1_8.setCellValue("Corr");
            CH1_9.setCellValue("Curr");
            CH1_10.setCellValue("Invoice");
            CH1_11.setCellValue("Rejected");
            CH1_12.setCellValue("%Rec");
            CH1_13.setCellValue("Send");
            CH1_14.setCellValue("Date");
            CH1_15.setCellValue("SPMI");
            CH1_16.setCellValue("Group");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
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

            CH2_0.setCellValue("Month");
            CH2_3.setCellValue("Name");
            CH2_4.setCellValue("Docs");
            CH2_5.setCellValue("Supp");
            CH2_6.setCellValue("Audit");
            CH2_10.setCellValue("Amount");
            CH2_11.setCellValue("Amount");
            CH2_13.setCellValue("Date");
            CH2_14.setCellValue("Closed");

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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).INVOICE);
                rcell2.setCellValue(listaData.get(vi).AIRLINE);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).QCUPON);
                rcell5.setCellValue(listaData.get(vi).QSFIM);
                rcell6.setCellValue(listaData.get(vi).QAUDI);
                rcell7.setCellValue(listaData.get(vi).QRM);
                rcell8.setCellValue(listaData.get(vi).QCORR);
                rcell9.setCellValue(listaData.get(vi).CURRENP);
                rcell10.setCellValue(listaData.get(vi).NETI);
                rcell11.setCellValue(listaData.get(vi).NETO);
                rcell12.setCellValue(listaData.get(vi).dblPerRec);
                rcell13.setCellValue(listaData.get(vi).strFormatDate1);
                rcell14.setCellValue(listaData.get(vi).strFormatDate2);
                rcell15.setCellValue(listaData.get(vi).FMETHOD);
                rcell16.setCellValue(listaData.get(vi).GRUPO);
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

            vj++;
            vj++;

            // **************************   2DO  *****************************************************
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

            CH1_0.setCellValue("Invoice");
            CH1_1.setCellValue("Total");
            CH1_2.setCellValue("Total");
            CH1_3.setCellValue("Total");
            CH1_4.setCellValue("RMs");
            CH1_5.setCellValue("%");
            CH1_6.setCellValue("Total");
            CH1_7.setCellValue("Total Supp");
            CH1_8.setCellValue("Total Supp");
            CH1_9.setCellValue("Invoice");
            CH1_10.setCellValue("Rejected");
            CH1_11.setCellValue("Ttl");

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
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 11, 11));
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

            CH2_0.setCellValue("Currency");
            CH2_1.setCellValue("Invoices");
            CH2_2.setCellValue("Docs");
            CH2_3.setCellValue("Aud");
            CH2_5.setCellValue("Audited");
            CH2_6.setCellValue("Supported");
            CH2_7.setCellValue("Audited");
            CH2_8.setCellValue("RM");
            CH2_9.setCellValue("Amount");
            CH2_10.setCellValue("Amount");
            CH2_11.setCellValue("Corr.");

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
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_TktData")
    public @ResponseBody
    void getXLSX_TktData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_TktData");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        filter = new WRF016Filter();
        Boolean bExcel = true;
        HashMap hm;
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new LoadInterlineLogic();
            logic.setSession(this.serverSession.getServerSession());
//            hm = logic.loadPX165S03WRF001(filter);

            if (filter.TDOC.equals("4")) {
                hm = logic.loadPX189S03A020(filter);
            } else {
                hm = logic.loadPX165S04WRF002(filter);
            }

            List<WRF016Filter> listaData = (ArrayList) hm.get("lstRtn");
            List<WRF016Filter> listaData2 = (ArrayList) hm.get("lstCurrency");

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

            CH1_0.setCellValue("Daily Summary Report View ( FC )");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 13));
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

            CH2_0.setCellValue("Airline");
            CH2_1.setCellValue("Invoice");
            CH2_2.setCellValue("Int.Sequence");
            CH2_3.setCellValue("Ticket");
            CH2_4.setCellValue("Curr");
            CH2_5.setCellValue("Invoice");
            CH2_6.setCellValue("Accepted");
            CH2_7.setCellValue("Net");
            CH2_8.setCellValue("RM");
            CH2_9.setCellValue("SPMI");
            CH2_10.setCellValue("Group");
            CH2_11.setCellValue("Sector");
            CH2_12.setCellValue("Penalty");
            CH2_13.setCellValue("Reject");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
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

            CH3_1.setCellValue("Date");
            CH3_2.setCellValue("Number");
            CH3_3.setCellValue("Number");
            CH3_5.setCellValue("Amount");
            CH3_6.setCellValue("Amount");
            CH3_7.setCellValue("Amount");
            CH3_13.setCellValue("Number");

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

                rcell0.setCellValue(listaData.get(vi).AIRLINE);
                rcell1.setCellValue(listaData.get(vi).strFormatDate);
                rcell2.setCellValue(listaData.get(vi).NROPRT);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).CURRENP);
                rcell5.setCellValue(listaData.get(vi).NETI);
                rcell6.setCellValue(listaData.get(vi).NETM);
                rcell7.setCellValue(listaData.get(vi).NETO);
                rcell8.setCellValue(listaData.get(vi).RMACCEPT);
                rcell9.setCellValue(listaData.get(vi).FMETHOD);
                rcell10.setCellValue(listaData.get(vi).GRUPO);
                rcell11.setCellValue(listaData.get(vi).RUTAP);
                rcell12.setCellValue(listaData.get(vi).IPENAL);
                rcell13.setCellValue(listaData.get(vi).NRORM);
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

            vj++;
            vj++;

            // ********************** 2DA ***************************************
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

            CH2_0.setCellValue("Clearing");
            CH2_1.setCellValue("Total");
            CH2_2.setCellValue("Total");
            CH2_3.setCellValue("Total");
            CH2_4.setCellValue("%");
            CH2_5.setCellValue("Rejected Totals");
            CH2_8.setCellValue("Invoice");
            CH2_9.setCellValue("Rejected");
            CH2_10.setCellValue("%");

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
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 7));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 10, 10));
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

            CH3_0.setCellValue("Date");
            CH3_1.setCellValue("Cpns");
            CH3_2.setCellValue("Audited");
            CH3_3.setCellValue("RM");
            CH3_4.setCellValue("Audited");
            CH3_5.setCellValue("Gross");
            CH3_6.setCellValue("ISC");
            CH3_7.setCellValue("TAX");
            CH3_8.setCellValue("Amount");
            CH3_9.setCellValue("Amount");
            CH3_10.setCellValue("Recovery");

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

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        List<A1155Filter> listaData;
//        filter = new A1155Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//        
//        String fileNameDownload = String.format("SPA Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        
//        try {
//            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
//            filter.IN_STATUS = request.getParameter("IN_STATUS");
//            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
//            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
//            
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            
//            logic = new WorkProgressReportLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX154S01A1155(filter);
//
//            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("SPA Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
////            CellStyle headerStyle = workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
////            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            // </editor-fold>
//
//            Integer vi = 0;
//            Integer vj = 0;
//            Iterator iter = listaData.iterator();
//
//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Billing");
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            CH1_07.setCellValue("Invoice");
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            CH1_09.setCellValue("Set");
//            Cell CH1_10 = row.createCell(10);
//            CH1_10.setCellValue("Cpn. St.");
//            Cell CH1_11 = row.createCell(11);
//            CH1_11.setCellValue("Rej. St.");
//            Cell CH1_12 = row.createCell(12);
//            CH1_12.setCellValue("BM. St.");
//            Cell CH1_13 = row.createCell(13);
//            CH1_13.setCellValue("CM. St.");
//            Cell CH1_14 = row.createCell(14);
//            CH1_14.setCellValue("Currency");
//            Cell CH1_15 = row.createCell(15);
//            CH1_15.setCellValue("Total");
//            Cell CH1_16 = row.createCell(16);
//            CH1_16.setCellValue("Total");
//            Cell CH1_17 = row.createCell(17);
//            CH1_17.setCellValue("Total");
//            Cell CH1_18 = row.createCell(18);
//            CH1_18.setCellValue("Total");
//            Cell CH1_19 = row.createCell(19);
//            CH1_19.setCellValue("Total");
//            Cell CH1_20 = row.createCell(20);
//            CH1_20.setCellValue("Total");
//            Cell CH1_21 = row.createCell(21);
//            CH1_21.setCellValue("Total");
//            Cell CH1_22 = row.createCell(22);
//            CH1_22.setCellValue("Total");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//
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
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            CH2_00.setCellValue("Date");
//            Cell CH2_01 = row2.createCell(1);
//            CH2_01.setCellValue("Period");
//            Cell CH2_02 = row2.createCell(2);
//            CH2_02.setCellValue("Airline");
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Code");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Invoice Number");
//            Cell CH2_08 = row2.createCell(8);
//            CH2_08.setCellValue("Date");
//            Cell CH2_09 = row2.createCell(9);
//            CH2_09.setCellValue("Meth.");
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            CH2_15.setCellValue("GROSS");
//            Cell CH2_16 = row2.createCell(16);
//            CH2_16.setCellValue("ISC");
//            Cell CH2_17 = row2.createCell(17);
//            CH2_17.setCellValue("TAX");
//            Cell CH2_18 = row2.createCell(18);
//            CH2_18.setCellValue("VAT");
//            Cell CH2_19 = row2.createCell(19);
//            CH2_19.setCellValue("FEE");
//            Cell CH2_20 = row2.createCell(20);
//            CH2_20.setCellValue("UATP");
//            Cell CH2_21 = row2.createCell(21);
//            CH2_21.setCellValue("Other Commission");
//            Cell CH2_22 = row2.createCell(22);
//            CH2_22.setCellValue("NET");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//            CH2_17.setCellStyle(headerStyle);
//            CH2_18.setCellStyle(headerStyle);
//            CH2_19.setCellStyle(headerStyle);
//            CH2_20.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_22.setCellStyle(headerStyle);
//
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
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row3 = sheet.createRow(vj);
//
//            Cell CH3_00 = row3.createCell(0);
//            Cell CH3_01 = row3.createCell(1);
//            Cell CH3_02 = row3.createCell(2);
//            CH3_02.setCellValue("Code");
//            Cell CH3_03 = row3.createCell(3);
//            CH3_03.setCellValue("Code");
//            Cell CH3_04 = row3.createCell(4);
//            CH3_04.setCellValue("Name");
//            Cell CH3_05 = row3.createCell(5);
//            CH3_05.setCellValue("Name");
//            Cell CH3_06 = row3.createCell(6);
//            Cell CH3_07 = row3.createCell(7);
//            Cell CH3_08 = row3.createCell(8);
//            Cell CH3_09 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//            Cell CH3_17 = row3.createCell(17);
//            Cell CH3_18 = row3.createCell(18);
//            Cell CH3_19 = row3.createCell(19);
//            Cell CH3_20 = row3.createCell(20);
//            Cell CH3_21 = row3.createCell(21);
//            Cell CH3_22 = row3.createCell(22);
//
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
//
//            CH3_00.setCellStyle(headerStyle);
//            CH3_01.setCellStyle(headerStyle);
//            CH3_02.setCellStyle(headerStyle);
//            CH3_03.setCellStyle(headerStyle);
//            CH3_04.setCellStyle(headerStyle);
//            CH3_05.setCellStyle(headerStyle);
//            CH3_06.setCellStyle(headerStyle);
//            CH3_07.setCellStyle(headerStyle);
//            CH3_08.setCellStyle(headerStyle);
//            CH3_09.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//            CH3_17.setCellStyle(headerStyle);
//            CH3_18.setCellStyle(headerStyle);
//            CH3_19.setCellStyle(headerStyle);
//            CH3_20.setCellStyle(headerStyle);
//            CH3_21.setCellStyle(headerStyle);
//            CH3_22.setCellStyle(headerStyle);
//
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
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//                Cell cell58 = row.createCell(8);
//                Cell cell59 = row.createCell(9);
//                Cell cell60 = row.createCell(10);
//                Cell cell61 = row.createCell(11);
//                Cell cell62 = row.createCell(12);
//                Cell cell63 = row.createCell(13);
//                Cell cell64 = row.createCell(14);
//                Cell cell65 = row.createCell(15);
//                Cell cell66 = row.createCell(16);
//                Cell cell67 = row.createCell(17);
//                Cell cell68 = row.createCell(18);
//                Cell cell69 = row.createCell(19);
//                Cell cell70 = row.createCell(20);
//                Cell cell71 = row.createCell(21);
//                Cell cell72 = row.createCell(22);
//
//                cell50.setCellValue(listaData.get(vi).strFormatDate);
//                cell51.setCellValue(listaData.get(vi).PERNUM);
//                cell52.setCellValue(listaData.get(vi).BAIR);
//                cell53.setCellValue(listaData.get(vi).BDAIR);
//                cell54.setCellValue(listaData.get(vi).DES_BAIR);
//                cell55.setCellValue(listaData.get(vi).DES_BDAIR);
//                cell56.setCellValue(listaData.get(vi).BCODE);
//                cell57.setCellValue(listaData.get(vi).BNUMBER);
//                cell58.setCellValue(listaData.get(vi).strFormatDate2);
//                cell59.setCellValue(listaData.get(vi).SETMETH);
//                cell60.setCellValue(listaData.get(vi).STPM);
//                cell61.setCellValue(listaData.get(vi).STRM);
//                cell62.setCellValue(listaData.get(vi).STBM);
//                cell63.setCellValue(listaData.get(vi).STCM);
//                cell64.setCellValue(listaData.get(vi).BCURREN);
//                cell65.setCellValue(listaData.get(vi).TGROSS);
//                cell66.setCellValue(listaData.get(vi).TISC);
//                cell67.setCellValue(listaData.get(vi).TTAX);
//                cell68.setCellValue(listaData.get(vi).TVAT);
//                cell69.setCellValue(listaData.get(vi).HFEEAM);
//                cell70.setCellValue(listaData.get(vi).TUATP);
//                cell71.setCellValue(listaData.get(vi).TOHCOM);
//                cell72.setCellValue(listaData.get(vi).TNET);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//                cell58.setCellStyle(bodyStyle);
//                cell59.setCellStyle(bodyStyle);
//                cell60.setCellStyle(bodyStyle);
//                cell61.setCellStyle(bodyStyle);
//                cell62.setCellStyle(bodyStyle);
//                cell63.setCellStyle(bodyStyle);
//                cell64.setCellStyle(bodyStyle);
//                cell65.setCellStyle(bodyStyle);
//                cell66.setCellStyle(bodyStyle);
//                cell67.setCellStyle(bodyStyle);
//                cell68.setCellStyle(bodyStyle);
//                cell69.setCellStyle(bodyStyle);
//                cell70.setCellStyle(bodyStyle);
//                cell71.setCellStyle(bodyStyle);
//                cell72.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
//                sheet.autoSizeColumn(14, true);
//                sheet.autoSizeColumn(15, true);
//                sheet.autoSizeColumn(16, true);
//                sheet.autoSizeColumn(17, true);
//                sheet.autoSizeColumn(18, true);
//                sheet.autoSizeColumn(19, true);
//                sheet.autoSizeColumn(20, true);
//                sheet.autoSizeColumn(21, true);
//                sheet.autoSizeColumn(22, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new SpringException(e);
//        }
//    }
}
