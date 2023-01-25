package net.miatech.praxis.controllers.interline;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A020Filter;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.InterlineAnalysisLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.A005;
import net.miatech.praxis.interline.A1402;
import net.miatech.praxis.interline.WRF014;
import net.miatech.praxis.interline.filter.A1155Filter;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
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
@RequestMapping("/InterlineAnalysis")
public class InterlineAnalysisController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InterlineAnalysisLogic logic;
    private MasterDAO masterDAO;
    private SFI040Filter filter;
    private SFI030Filter filter2;

    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obteinDataCombo(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A005> lstAirlines;
        List<A1852Filter> lstSource;
        logic = new InterlineAnalysisLogic();
        masterDAO = new MasterDAO();
        try {
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            lstAirlines = masterDAO.loadAirlines(true);
            lstSource = masterDAO.loadSource();
            map.put("lstAirlines", lstAirlines);
            map.put("lstSource", lstSource);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(InterlineAnalysisController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SFI040Filter> listaData;
        filter = new SFI040Filter();
        try {
            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.dayFrom = request.getParameter("dayFrom");
            filter.yearTo = request.getParameter("yearTo");
            filter.monthTo = request.getParameter("monthTo");
            filter.dayTo = request.getParameter("dayTo");
            filter.PERNUM = request.getParameter("PERNUM");
            filter.BAIR = request.getParameter("BAIR");

            logic = new InterlineAnalysisLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX237S01SFI040_2(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchSourceCode")
    public @ResponseBody
    String searchSourceCode(ModelMap map, HttpServletRequest request) {
        List<SFI030Filter> listaData;
        filter2 = new SFI030Filter();
        try {
            filter2.yearFrom = request.getParameter("yearFrom");
            filter2.monthFrom = request.getParameter("monthFrom");
            filter2.dayFrom = request.getParameter("dayFrom");
            filter2.yearTo = request.getParameter("yearTo");
            filter2.monthTo = request.getParameter("monthTo");
            filter2.dayTo = request.getParameter("dayTo");
            filter2.PERNUM = request.getParameter("PERNUM");
            filter2.BAIR = request.getParameter("BAIR");
            filter2.SOURCOD = request.getParameter("BAIR");

            logic = new InterlineAnalysisLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX237S02SFI030(filter2);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            String tipo = request.getParameter("tipo");
            String beanString = request.getParameter("beanString");
            List<SFI040Filter> listaData = null;
            List<SFI030Filter> listaData2 = null;
            String anio1 = "";
            String anio2 = "";
            if ("1".equals(tipo)) {
                filter2 = new SFI030Filter();
                filter2 = new Gson().fromJson(beanString, filter2.getClass());
                anio1 = filter2.yearFrom;
                anio2 = "" + (Integer.parseInt(anio1) - 1);

                logic = new InterlineAnalysisLogic();
                logic.setSession(this.serverSession.getServerSession());
                listaData2 = logic.loadPX237S02SFI030(filter2);
            } else {

                filter = new SFI040Filter();
                filter = new Gson().fromJson(beanString, filter.getClass());
                logic = new InterlineAnalysisLogic();
                anio1 = filter.yearFrom;
                anio2 = "" + (Integer.parseInt(anio1) - 1);
                logic.setSession(this.serverSession.getServerSession());
                listaData = logic.loadPX237S01SFI040_2(filter);
            }

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
            Iterator iter;
            if ("1".equals(tipo)) {
                iter = listaData2.iterator();
            } else {
                iter = listaData.iterator();
            }
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

            CH1_0.setCellValue("Billing Date");
            CH1_1.setCellValue(anio2);
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue(anio1);
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 12));
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

            CH2_1.setCellValue("Outgoing Billing");
            CH2_3.setCellValue("Incoming Billing");
            CH2_5.setCellValue("Balance");
            CH2_7.setCellValue("Outgoing Billing");
            CH2_9.setCellValue("Incoming Billing");
            CH2_11.setCellValue("Balance");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
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

            CH3_1.setCellValue("USD");
            CH3_2.setCellValue("PAX");
            CH3_3.setCellValue("USD");
            CH3_4.setCellValue("PAX");
            CH3_5.setCellValue("USD");
            CH3_6.setCellValue("PAX");
            CH3_7.setCellValue("USD");
            CH3_8.setCellValue("PAX");
            CH3_9.setCellValue("USD");
            CH3_10.setCellValue("PAX");
            CH3_11.setCellValue("USD");
            CH3_12.setCellValue("PAX");

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
                if ("1".equals(tipo)) {

                    rcell0.setCellValue(listaData2.get(vi).strFormatDate);
                    rcell1.setCellValue(listaData2.get(vi).TNETOCAR_LY);
                    rcell2.setCellValue(listaData2.get(vi).QITEMSCAR_LY);
                    rcell3.setCellValue(listaData2.get(vi).TNETO_LY);
                    rcell4.setCellValue(listaData2.get(vi).QITEMS_LY);
                    rcell5.setCellValue(listaData2.get(vi).diffTNETO_LY);
                    rcell6.setCellValue(listaData2.get(vi).diffQITEMS_LY);
                    rcell7.setCellValue(listaData2.get(vi).TNETOCAR);
                    rcell8.setCellValue(listaData2.get(vi).QITEMSCAR);
                    rcell9.setCellValue(listaData2.get(vi).TNET);
                    rcell10.setCellValue(listaData2.get(vi).NUMREC);
                    rcell11.setCellValue(listaData2.get(vi).diffTNETO);
                    rcell12.setCellValue(listaData2.get(vi).diffQITEMS);

                } else {
                    rcell0.setCellValue(listaData.get(vi).strFormatDate);
                    rcell1.setCellValue(listaData.get(vi).TNETOCAR_LY);
                    rcell2.setCellValue(listaData.get(vi).QITEMSCAR_LY);
                    rcell3.setCellValue(listaData.get(vi).TNETO_LY);
                    rcell4.setCellValue(listaData.get(vi).QITEMS_LY);
                    rcell5.setCellValue(listaData.get(vi).diffTNETO_LY);
                    rcell6.setCellValue(listaData.get(vi).diffQITEMS_LY);
                    rcell7.setCellValue(listaData.get(vi).TNETOCAR);
                    rcell8.setCellValue(listaData.get(vi).QITEMSCAR);
                    rcell9.setCellValue(listaData.get(vi).TNET);
                    rcell10.setCellValue(listaData.get(vi).NUMREC);
                    rcell11.setCellValue(listaData.get(vi).diffTNETO);
                    rcell12.setCellValue(listaData.get(vi).diffQITEMS);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(InterlineAnalysisController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
