package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A005;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.RevenueByOperationLogic;
import net.miatech.utils.Functions;
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

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/RevenueByOperation")
public class RevenueByOperationController extends BaseController {

    private RevenueByOperationLogic logic;
    private A1971Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("RevenueByOperationController : search");

        List<A1971Filter> listaData;
        filter = new A1971Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;

        Gson gson = new Gson();
        try {
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();

            boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX246SQP00328(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
            } else {
                map.put("success", true);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("data", listaData);
            }

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchByZone")
    public @ResponseBody
    String searchByZone(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("RevenueByOperationController : searchByZone");

        List<A1971Filter> listaData;
        filter = new A1971Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;

        Gson gson = new Gson();
        try {
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();

            boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX246SQP00335(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
            } else {

                map.put("success", true);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("data", listaData);
            }

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchByCityPair")
    public @ResponseBody
    String searchByCityPair(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("RevenueByOperationController : searchByCityPair");

        List<A1971Filter> listaData;
        filter = new A1971Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;

        Gson gson = new Gson();
        try {
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
//            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
//            filter.NPLANE = request.getParameter("NPLANE").trim();
//            filter.ZONA = request.getParameter("ZONA").trim();

            boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX246SQP00334(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
            } else {
                map.put("success", true);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("data", listaData);
            }

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchByNPlane")
    public @ResponseBody
    String searchByNPlane(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("RevenueByOperationController : searchByNPlane");

        List<A1971Filter> listaData;
        filter = new A1971Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;

        Gson gson = new Gson();
        try {
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();

            boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX246SQP00333(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
            } else {
                map.put("success", true);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("data", listaData);
            }

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("RevenueByOperationController : getXLSX");

        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        Gson gson = new Gson();
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            List<A1971Filter> listaData = logic.loadPX246SQP00328(filter);
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

            CH1_0.setCellValue("Flight");
//            CH1_1.setCellValue("");
            CH1_2.setCellValue("Carrier");
            CH1_3.setCellValue("Route");
//            CH1_4.setCellValue("");
//            CH1_5.setCellValue("");
            CH1_6.setCellValue("Aircraft");
            CH1_7.setCellValue("Curr");
            CH1_8.setCellValue("Cabin");
//            CH1_9.setCellValue("");
//            CH1_10.setCellValue("");
//            CH1_11.setCellValue("");
//            CH1_12.setCellValue("");
//            CH1_13.setCellValue("");
//            CH1_14.setCellValue("");
//            CH1_15.setCellValue("");
            CH1_16.setCellValue("KMS");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 16, 16));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Number");
//            CH2_2.setCellValue("");
            CH2_3.setCellValue("Orig");
            CH2_4.setCellValue("Dest");
            CH2_5.setCellValue("KMS");
//            CH2_6.setCellValue("");
//            CH2_7.setCellValue("");
            CH2_8.setCellValue("Business");
//            CH2_9.setCellValue("");
//            CH2_10.setCellValue("");
            CH2_11.setCellValue("Economy");
//            CH2_12.setCellValue("");
//            CH2_13.setCellValue("");
            CH2_14.setCellValue("Total");
//            CH2_15.setCellValue("");
//            CH2_16.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 15));
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

//            CH3_0.setCellValue("");
//            CH3_1.setCellValue("");
//            CH3_2.setCellValue("");
//            CH3_3.setCellValue("");
//            CH3_4.setCellValue("");
//            CH3_5.setCellValue("");
//            CH3_6.setCellValue("");
//            CH3_7.setCellValue("");
            CH3_8.setCellValue("Pax");
            CH3_9.setCellValue("Value");
            CH3_10.setCellValue("Average");
            CH3_11.setCellValue("Pax");
            CH3_12.setCellValue("Value");
            CH3_13.setCellValue("Average");
            CH3_14.setCellValue("Pax");
            CH3_15.setCellValue("Value");
//            CH3_16.setCellValue("");

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
                rcell1.setCellValue(listaData.get(vi).NFLIGHT);
                rcell2.setCellValue(listaData.get(vi).CARRIER);
                rcell3.setCellValue(listaData.get(vi).CDEPART);
                rcell4.setCellValue(listaData.get(vi).CARRIVA);
                rcell5.setCellValue(listaData.get(vi).KMS_1);
                rcell6.setCellValue(listaData.get(vi).NPLANE);
                rcell7.setCellValue(listaData.get(vi).strDescripcion4);
                rcell8.setCellValue(listaData.get(vi).QTYPAX_J);
                rcell9.setCellValue(listaData.get(vi).VCPN_J);
                rcell10.setCellValue(listaData.get(vi).AVG_J);
                rcell11.setCellValue(listaData.get(vi).QTYPAX_Y);
                rcell12.setCellValue(listaData.get(vi).VCPN);
                rcell13.setCellValue(listaData.get(vi).AVG_Y);
                rcell14.setCellValue(listaData.get(vi).QTYPAX);
                rcell15.setCellValue(listaData.get(vi).VCPN);
                rcell16.setCellValue(listaData.get(vi).KMS);
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

    @RequestMapping(value = "getXLSX_ByNPlane")
    public @ResponseBody
    void getXLSX_ByNPlane(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        System.out.println("Report : getXLSX_ByNPlane");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        Gson gson = new Gson();
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new RevenueByOperationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            List<A1971Filter> listaData = logic.loadPX246SQP00333(filter);
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

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("Aircraft");
            CH1_2.setCellValue("Carr");
            CH1_3.setCellValue("Flights");
            CH1_4.setCellValue("Curr");
            CH1_5.setCellValue("KMS");
            CH1_6.setCellValue("Cabin");
//            CH1_7.setCellValue("");
//            CH1_8.setCellValue("");
//            CH1_9.setCellValue("");
//            CH1_10.setCellValue("");
//            CH1_11.setCellValue("");
//            CH1_12.setCellValue("");
//            CH1_13.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 13));
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

            CH2_0.setCellValue("Date");
//            CH2_1.setCellValue("");
//            CH2_2.setCellValue("");
//            CH2_3.setCellValue("");
//            CH2_4.setCellValue("");
//            CH2_5.setCellValue("");
            CH2_6.setCellValue("Business");
//            CH2_7.setCellValue("");
//            CH2_8.setCellValue("");
            CH2_9.setCellValue("Economy");
//            CH2_10.setCellValue("");
//            CH2_11.setCellValue("");
            CH2_12.setCellValue("Total");
//            CH2_13.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 13));
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

//            CH3_0.setCellValue("");
//            CH3_1.setCellValue("");
//            CH3_2.setCellValue("");
//            CH3_3.setCellValue("");
//            CH3_4.setCellValue("");
//            CH3_5.setCellValue("");
            CH3_6.setCellValue("Pax");
            CH3_7.setCellValue("Value");
            CH3_8.setCellValue("Average");
            CH3_9.setCellValue("Pax");
            CH3_10.setCellValue("Value");
            CH3_11.setCellValue("Average");
            CH3_12.setCellValue("Pax");
            CH3_13.setCellValue("Value");

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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).NPLANE);
                rcell2.setCellValue(listaData.get(vi).CARRIER);
                rcell3.setCellValue(listaData.get(vi).QTYFlight);
                rcell4.setCellValue(listaData.get(vi).strDescripcion4);
                rcell5.setCellValue(listaData.get(vi).KMS);
                rcell6.setCellValue(listaData.get(vi).QTYPAX_J);
                rcell7.setCellValue(listaData.get(vi).VCPN_J);
                rcell8.setCellValue(listaData.get(vi).AVG_J);
                rcell9.setCellValue(listaData.get(vi).QTYPAX_Y);
                rcell10.setCellValue(listaData.get(vi).VCPN_Y);
                rcell11.setCellValue(listaData.get(vi).AVG_Y);
                rcell12.setCellValue(listaData.get(vi).QTYPAX);
                rcell13.setCellValue(listaData.get(vi).VCPN);
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

//    @RequestMapping(value = "/obtainDataFilter")
//    public @ResponseBody
//    String obtainDataFilter(ModelMap map, HttpServletRequest request) {
//        try {
//            masterDAO = new MasterDAO();
//            masterDAO.setSession((IServerSession) serverSession.getServerSession());
//
//            List<A005> lstAerolineas = masterDAO.loadAirlines();
//
//            map.put("success", true);
//            map.put("lstAerolineas", lstAerolineas);
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("sesion", "Se produjo un error. " + ex.getMessage());
//        }
//        
//        return new Gson().toJson(map);
//    }
}
