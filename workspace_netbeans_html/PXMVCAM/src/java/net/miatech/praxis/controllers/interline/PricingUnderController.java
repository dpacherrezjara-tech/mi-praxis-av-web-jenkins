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
import net.miatech.beans.A020Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.InterlineCorrespondenceLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.logic.interline.LoadInterlineLogic;
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
@RequestMapping("/PricingUnder")
public class PricingUnderController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadInterlineLogic logic;
    private A020Filter filter;
    
    @RequestMapping(value = "searchGroupData")
    public @ResponseBody
    String searchGroupData(ModelMap map, HttpServletRequest request) {
        A020Filter invoice;
        List<A020Filter> listaSQL;
        String buscarDatosGrupo;
        filter = new A020Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "PricingUnderController :  searchGroupData");
            
            buscarDatosGrupo = request.getParameter("buscarDatosGrupo");
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

            map.put("success", true);
            if (Boolean.parseBoolean(buscarDatosGrupo)) {
                invoice = logic.loadPX164SQP00113(filter.A020GRUPO);
                map.put("recInvoice", invoice);
            } else {
                invoice = filter;
            }

            if (invoice != null && !invoice.A020GRUPO.trim().equals("")) {
                invoice.page.PAGINIT = filter.page.PAGINIT;
                invoice.page.PAGNUM = filter.page.PAGNUM;
                invoice.page.PAGROW = filter.page.PAGROW;
                invoice.page.TOTPAG = filter.page.TOTPAG;
                invoice.page.TOTROW = filter.page.TOTROW;

                listaSQL = logic.loadPX164SQP00114("", invoice, "");
                map.put("total", listaSQL.size() > 0 ? listaSQL.get(0).page.TOTROW : 0);
                map.put("data", listaSQL);
            }
            map.put("buscarGrupo", buscarDatosGrupo);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
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
//            logic = new InterlineCorrespondenceLogic();
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
