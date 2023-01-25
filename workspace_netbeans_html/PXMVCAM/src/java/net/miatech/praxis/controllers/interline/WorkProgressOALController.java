package net.miatech.praxis.controllers.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.WorkProgressOALLogic;
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
@RequestMapping("/WorkProgressOAL")
public class WorkProgressOALController extends BaseController {
    
    private WorkProgressOALLogic logic;
    private A020Filter filter;
    private A1692Filter filter2;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new A020Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692(filter);
            
            map.put("success", true);
            map.put("listaData", hm.get("DETALLE"));
            map.put("lstTotal", hm.get("TOTALES"));
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search_2")
    public @ResponseBody
    String search_2(ModelMap map, HttpServletRequest request) {
        HashMap hm;
        filter = new A020Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692_2(filter);
            
            map.put("success", true);
            map.put("listaData", hm.get("DETALLE"));
            map.put("lstTotal", hm.get("TOTALES"));
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchVCR")
    public @ResponseBody
    String searchVCR(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> lstData;
        filter2 = new A1692Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        try {
            filter2.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter2.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstData = logic.loadSQP01513(filter2);
            
            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            map.put("data", lstData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXVCR")
    public @ResponseBody
    void getXLSXVCR(HttpServletRequest request, HttpServletResponse response) {
        List<A1692Filter> listaData;
        filter2 = new A1692Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Work Progress OAL VCR - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter2.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter2.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            filter2.page.PAGROW = -1;
            filter2.page.PAGNUM = 1;
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01513(filter2);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Work Progress OAL VCR");
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

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("VCR Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Accounting Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Flight Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Quantity");
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Total");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("OWN");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("OAL");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("OCR");
            Cell CH2_06 = row2.createCell(6);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);

                cell50.setCellValue(listaData.get(vi).strFormatFECVAL);
                cell51.setCellValue(listaData.get(vi).strFCON);
                cell52.setCellValue(listaData.get(vi).strFormatDate);
                cell53.setCellValue(listaData.get(vi).CPN_Proc);
                cell54.setCellValue(listaData.get(vi).CPN_Bill);
                cell55.setCellValue(listaData.get(vi).CPN_Aud);
                cell56.setCellValue(listaData.get(vi).NETO);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                // </editor-fold>
                
                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

@RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        HashMap hm;
        Object hData;
        filter = new A020Filter();
//        List listaData = new ArrayList();
        String fileNameDownload = String.format("Work Progress OAL - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            logic = new WorkProgressOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            hm = logic.loadPX234S01A1692(filter);
            List listaData = (List) hm.get("DETALLE");
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Work Progress OAL");
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

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Armando Excel">
            
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
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("VCR");
            CH1_2.setCellValue("VCR");
            CH1_3.setCellValue("VCR");
            CH1_4.setCellValue("VCR");
            CH1_5.setCellValue("VCR");
            CH1_6.setCellValue("VCR");
            CH1_7.setCellValue("VCR");
            CH1_8.setCellValue("VCR");
            CH1_9.setCellValue("VCR");
            CH1_10.setCellValue("VCR");
            CH1_11.setCellValue("VCR");
            CH1_12.setCellValue("VCR");
            CH1_13.setCellValue("VCR");
            CH1_14.setCellValue("VCR");
            CH1_15.setCellValue("VCR");
            CH1_16.setCellValue("VCR");
            CH1_17.setCellValue("VCR");
            CH1_18.setCellValue("VCR");
            CH1_19.setCellValue("VCR");
            CH1_20.setCellValue("VCR");
            CH1_21.setCellValue("VCR");
            CH1_22.setCellValue("VCR");
            CH1_23.setCellValue("VCR");
            CH1_24.setCellValue("VCR");
            CH1_25.setCellValue("VCR");
            CH1_26.setCellValue("VCR");
            CH1_27.setCellValue("VCR");
            CH1_28.setCellValue("VCR");
            CH1_29.setCellValue("VCR");
            CH1_30.setCellValue("VCR");
            CH1_31.setCellValue("VCR");

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
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            ++vj;
//
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
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);
            
            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("01");
            CH2_2.setCellValue("02");
            CH2_3.setCellValue("03");
            CH2_4.setCellValue("04");
            CH2_5.setCellValue("05");
            CH2_6.setCellValue("06");
            CH2_7.setCellValue("07");
            CH2_8.setCellValue("08");
            CH2_9.setCellValue("09");
            CH2_10.setCellValue("10");
            CH2_11.setCellValue("11");
            CH2_12.setCellValue("12");
            CH2_13.setCellValue("13");
            CH2_14.setCellValue("14");
            CH2_15.setCellValue("15");
            CH2_16.setCellValue("16");
            CH2_17.setCellValue("17");
            CH2_18.setCellValue("18");
            CH2_19.setCellValue("19");
            CH2_20.setCellValue("20");
            CH2_21.setCellValue("21");
            CH2_22.setCellValue("22");
            CH2_23.setCellValue("23");
            CH2_24.setCellValue("24");
            CH2_25.setCellValue("25");
            CH2_26.setCellValue("26");
            CH2_27.setCellValue("27");
            CH2_28.setCellValue("28");
            CH2_29.setCellValue("29");
            CH2_30.setCellValue("30");
            CH2_31.setCellValue("31");
            
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
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            // </editor-fold>
            
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
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);         
                
                HashMap hmObj = (HashMap) listaData.get(vi);
                
                try {
                    rcell0.setCellValue( hmObj.get("DFLIGHT").toString() );
                } catch (Exception e) {
                    rcell0.setCellValue( "" );
                }
                
                try {
                    rcell1.setCellValue( (hmObj.get("dia01").toString() == null ) ? "" : hmObj.get("dia01").toString() );
                } catch (Exception e) {
                    rcell1.setCellValue( "" );
                }
                
                try {
                    rcell2.setCellValue( (hmObj.get("dia02").toString() == null ) ? "" : hmObj.get("dia02").toString() );
                } catch (Exception e) {
                    rcell2.setCellValue( "" );
                }
                
                try {
                    rcell3.setCellValue( (hmObj.get("dia03").toString() == null ) ? "" : hmObj.get("dia03").toString() );
                } catch (Exception e) {
                    rcell3.setCellValue( "" );
                }
                
                try {
                    rcell4.setCellValue( (hmObj.get("dia04").toString() == null ) ? "" : hmObj.get("dia04").toString() );
                } catch (Exception e) {
                    rcell4.setCellValue( "" );
                }
                
                try {
                    rcell5.setCellValue( (hmObj.get("dia05").toString() == null ) ? "" : hmObj.get("dia05").toString() );
                } catch (Exception e) {
                    rcell5.setCellValue( "" );
                }
                
                try {
                    rcell6.setCellValue( (hmObj.get("dia06").toString() == null ) ? "" : hmObj.get("dia06").toString() );
                } catch (Exception e) {
                    rcell6.setCellValue( "" );
                }
                
                try {
                    rcell7.setCellValue( (hmObj.get("dia07").toString() == null ) ? "" : hmObj.get("dia07").toString() );
                } catch (Exception e) {
                    rcell7.setCellValue( "" );
                }
                
                try {
                    rcell8.setCellValue( (hmObj.get("dia08").toString() == null ) ? "" : hmObj.get("dia08").toString() );
                } catch (Exception e) {
                    rcell8.setCellValue( "" );
                }
                
                try {
                    rcell9.setCellValue( (hmObj.get("dia09").toString() == null ) ? "" : hmObj.get("dia09").toString() );
                } catch (Exception e) {
                    rcell9.setCellValue( "" );
                }
                
                try {
                    rcell10.setCellValue( (hmObj.get("dia10").toString() == null ) ? "" : hmObj.get("dia10").toString() );
                } catch (Exception e) {
                    rcell10.setCellValue( "" );
                }
                
                try {
                    rcell11.setCellValue( (hmObj.get("dia11").toString() == null ) ? "" : hmObj.get("dia11").toString() );
                } catch (Exception e) {
                    rcell11.setCellValue( "" );
                }
                
                try {
                    rcell12.setCellValue( (hmObj.get("dia12").toString() == null ) ? "" : hmObj.get("dia12").toString() );
                } catch (Exception e) {
                    rcell12.setCellValue( "" );
                }
                
                try {
                    rcell13.setCellValue( (hmObj.get("dia13").toString() == null ) ? "" : hmObj.get("dia13").toString() );
                } catch (Exception e) {
                    rcell13.setCellValue( "" );
                }
                
                try {
                    rcell14.setCellValue( (hmObj.get("dia14").toString() == null ) ? "" : hmObj.get("dia14").toString() );
                } catch (Exception e) {
                    rcell14.setCellValue( "" );
                }
                
                try {
                    rcell15.setCellValue( (hmObj.get("dia15").toString() == null ) ? "" : hmObj.get("dia15").toString() );
                } catch (Exception e) {
                    rcell15.setCellValue( "" );
                }
                
                try {
                    rcell16.setCellValue( (hmObj.get("dia16").toString() == null ) ? "" : hmObj.get("dia16").toString() );
                } catch (Exception e) {
                    rcell16.setCellValue( "" );
                }
                
                try {
                    rcell17.setCellValue( (hmObj.get("dia17").toString() == null ) ? "" : hmObj.get("dia17").toString() );
                } catch (Exception e) {
                    rcell17.setCellValue( "" );
                }
                
                try {
                    rcell18.setCellValue( (hmObj.get("dia18").toString() == null ) ? "" : hmObj.get("dia18").toString() );
                } catch (Exception e) {
                    rcell18.setCellValue( "" );
                }
                
                try {
                    rcell19.setCellValue( (hmObj.get("dia19").toString() == null ) ? "" : hmObj.get("dia19").toString() );
                } catch (Exception e) {
                    rcell19.setCellValue( "" );
                }
                
                try {
                    rcell20.setCellValue( (hmObj.get("dia20").toString() == null ) ? "" : hmObj.get("dia20").toString() );
                } catch (Exception e) {
                    rcell20.setCellValue( "" );
                }
                
                try {
                    rcell21.setCellValue( (hmObj.get("dia21").toString() == null ) ? "" : hmObj.get("dia21").toString() );
                } catch (Exception e) {
                    rcell21.setCellValue( "" );
                }
                
                try {
                    rcell22.setCellValue( (hmObj.get("dia22").toString() == null ) ? "" : hmObj.get("dia22").toString() );
                } catch (Exception e) {
                    rcell22.setCellValue( "" );
                }
                
                try {
                    rcell23.setCellValue( (hmObj.get("dia23").toString() == null ) ? "" : hmObj.get("dia23").toString() );
                } catch (Exception e) {
                    rcell23.setCellValue( "" );
                }
                
                try {
                    rcell24.setCellValue( (hmObj.get("dia24").toString() == null ) ? "" : hmObj.get("dia24").toString() );
                } catch (Exception e) {
                    rcell24.setCellValue( "" );
                }
                
                try {
                    rcell25.setCellValue( (hmObj.get("dia25").toString() == null ) ? "" : hmObj.get("dia25").toString() );
                } catch (Exception e) {
                    rcell25.setCellValue( "" );
                }
                
                try {
                    rcell26.setCellValue( (hmObj.get("dia26").toString() == null ) ? "" : hmObj.get("dia26").toString() );
                } catch (Exception e) {
                    rcell26.setCellValue( "" );
                }
                
                try {
                    rcell27.setCellValue( (hmObj.get("dia27").toString() == null ) ? "" : hmObj.get("dia27").toString() );
                } catch (Exception e) {
                    rcell27.setCellValue( "" );
                }
                
                try {
                    rcell28.setCellValue( (hmObj.get("dia28").toString() == null ) ? "" : hmObj.get("dia28").toString() );
                } catch (Exception e) {
                    rcell28.setCellValue( "" );
                }
                
                try {
                    rcell29.setCellValue( (hmObj.get("dia29").toString() == null ) ? "" : hmObj.get("dia29").toString() );
                } catch (Exception e) {
                    rcell29.setCellValue( "" );
                }
                
                try {
                    rcell30.setCellValue( (hmObj.get("dia30").toString() == null ) ? "" : hmObj.get("dia30").toString() );
                } catch (Exception e) {
                    rcell30.setCellValue( "" );
                }
                
                try {
                    rcell31.setCellValue( (hmObj.get("dia31").toString() == null ) ? "" : hmObj.get("dia31").toString() );
                } catch (Exception e) {
                    rcell31.setCellValue( "" );
                }

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
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            
//            /// ********************************************************************** ///
//            vj++;
//            vj++;
            
            

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
