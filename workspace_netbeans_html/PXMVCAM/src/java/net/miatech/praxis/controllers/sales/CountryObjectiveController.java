package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX175S01A1841Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CountryObjectiveLogic;
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
@RequestMapping("/CountryObjective")
public class CountryObjectiveController extends BaseController {

    private CountryObjectiveLogic logic;
    private PX175S01A1841Filter filter;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        List<PX175S01A1841Filter> listaData;
        filter = new PX175S01A1841Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            String temp = request.getParameter("IN_TFILTER").trim();
            filter.IN_TFILTER = temp.length()>0?Integer.parseInt(temp):0;
            filter.IN_GSA = request.getParameter("IN_GSA").trim();
            filter.IN_AREA = request.getParameter("IN_AREA").trim();
            filter.IN_PAIS = request.getParameter("IN_PAIS").trim();
            filter.IN_YEAR = request.getParameter("IN_YEAR").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CountryObjectiveLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX175S01A1841(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
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
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<PX175S01A1841Filter> listaData;
        filter = new PX175S01A1841Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("GSA Incentive Conditions - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            String temp = request.getParameter("IN_TFILTER").trim();
            filter.IN_TFILTER = temp.length()>0?Integer.parseInt(temp):0;
            filter.IN_GSA = request.getParameter("IN_GSA").trim();
            filter.IN_AREA = request.getParameter("IN_AREA").trim();
            filter.IN_PAIS = request.getParameter("IN_PAIS").trim();
            filter.IN_YEAR = request.getParameter("IN_YEAR").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CountryObjectiveLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX175S01A1841(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("GSA Incentive Conditions");
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
            CH1_00.setCellValue("GSA");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Country");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Year");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Currency Incentive");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Type");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Annual");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Jan");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Feb");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Mar");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Apr");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("May");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Jun");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Jul");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Aug");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Sep");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Oct");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Nov");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Dec");

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

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(9, true);

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
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);

                cell50.setCellValue(listaData.get(vi).A1841GSA);
                cell51.setCellValue(listaData.get(vi).A1841PAIS);
                cell52.setCellValue(listaData.get(vi).A1841YEAR);
                cell53.setCellValue(listaData.get(vi).A1841MPAG);
                cell54.setCellValue(listaData.get(vi).A1841TIPO);
                cell55.setCellValue(listaData.get(vi).A1841CUOTA);
                cell56.setCellValue(listaData.get(vi).A1841CUO01);
                cell57.setCellValue(listaData.get(vi).A1841CUO02);
                cell58.setCellValue(listaData.get(vi).A1841CUO03);
                cell59.setCellValue(listaData.get(vi).A1841CUO04);
                cell60.setCellValue(listaData.get(vi).A1841CUO05);
                cell61.setCellValue(listaData.get(vi).A1841CUO06);
                cell62.setCellValue(listaData.get(vi).A1841CUO07);
                cell63.setCellValue(listaData.get(vi).A1841CUO08);
                cell64.setCellValue(listaData.get(vi).A1841CUO09);
                cell65.setCellValue(listaData.get(vi).A1841CUO10);
                cell66.setCellValue(listaData.get(vi).A1841CUO11);
                cell67.setCellValue(listaData.get(vi).A1841CUO12);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);
                cell64.setCellStyle(bodyStyle);
                cell65.setCellStyle(bodyStyle);
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
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
}
