package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
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
import net.miatech.beans.PX036S01A1528Filter;
import net.miatech.beans.PX036S01A1528Filter;
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.PX036S02A1528Filter;
import net.miatech.beans.SQP00347Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CalendarASRLogic;
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
@RequestMapping("/CalendarASR")
public class CalendarASRController extends BaseController {
    
    private CalendarASRLogic logic;
    private PX036S01A1528Filter filter;
    private PX036S02A1528Filter filter2;
    private SQP00347Filter filter3;
    
    @RequestMapping(value = "/searchASR")
    public @ResponseBody
    String searchASR(ModelMap map, HttpServletRequest request) {
        List<PX036S01A1528Filter> listaData;
        filter = new PX036S01A1528Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        try {
            filter.IN_A1528FPRO = request.getParameter("IN_A1528FPRO").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CalendarASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX036S01A1528(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new PX036S01A1528Filter();
//        filter.strExcel="TRUE";
        
        List<PX036S01A1528Filter> listaData;
        
        String fileNameDownload = String.format("Calendar ASR - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new CalendarASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.IN_A1528FPRO = request.getParameter("IN_A1528FPRO").trim();

            listaData = logic.loadPX036S01A1528(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Calendar ASR");
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
            CH1_00.setCellValue("Period Ending Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Quarter");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Identifier");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Processing Date");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);

            ++vj;
            
            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_05 = row2.createCell(5);

            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Month");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Week");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Cicle");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);

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
                
                cell50.setCellValue(listaData.get(vi).A1528FPRO);
                cell51.setCellValue(listaData.get(vi).QUARTER);
                cell52.setCellValue(listaData.get(vi).A1528PDIDM);
                cell53.setCellValue(listaData.get(vi).A1528PDIDS);
                cell54.setCellValue(listaData.get(vi).PDIDC);
                cell55.setCellValue(listaData.get(vi).A1528PRDA);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                
                sheet.autoSizeColumn(1, true);
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
    
    @RequestMapping(value = "MantCalendarASR")
    public @ResponseBody
    String MantCalendarASR(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        PX036S02A1528Filter objRtn;
        filter2 = new PX036S02A1528Filter();
        String strOption;
        try {
            strOption = request.getParameter("strOption");
            filter2.A1528FPRO = request.getParameter("A1528FPRO").trim();
            filter2.A1528ANIO = request.getParameter("A1528ANIO").trim();
            filter2.A1528CUART = request.getParameter("A1528CUART").trim();
            filter2.A1528PDIDM = request.getParameter("A1528PDIDM").trim();
            filter2.A1528PDIDS = request.getParameter("A1528PDIDS").trim();
            filter2.A1528PDIDC = request.getParameter("A1528PDIDC").trim();
            filter2.A1528PRDA = request.getParameter("A1528PRDA").trim();
            filter2.A1528CNULO = request.getParameter("A1528CNULO").trim();
            filter2.A1528OBS = request.getParameter("A1528OBS").trim();
            
            logic = new CalendarASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setPX036S02A1528(filter2, strOption);
            map.put("success", true);
            map.put("intResult", objRtn.dbException.MESSAGE);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ProcCalendarASR")
    public @ResponseBody
    String ProcCalendarASR(ModelMap map, HttpServletRequest request) {
        filter3 = new SQP00347Filter();
        try {
            filter3.IN_YEAR = request.getParameter("IN_YEAR");
            
            logic = new CalendarASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.setSQP00347(filter3);
            if (filter3.OU_STAT > 0) {
                map.put("intResult", "You can not process an existing year.");
            } else {
                map.put("intResult", "Processed correctly");
            }
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
}
