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
import net.miatech.beans.PX034S01A1527Filter;
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.PX036S02A1529Filter;
import net.miatech.beans.SQP02284Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CalendarBSPLogic;
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
@RequestMapping("/CalendarBSP")
public class CalendarBSPController extends BaseController {
    
    private CalendarBSPLogic logic;
//    private S0007INF053Filter accessSecurityFilter = new S0007INF053Filter();
    private PX036S01A1529Filter filter;
    private SQP02284Filter filter2;
    private PX036S02A1529Filter filter3;
    
    @RequestMapping(value = "/searchBSP")
    public @ResponseBody
    String searchBSP(ModelMap map, HttpServletRequest request) {
        List<PX036S01A1529Filter> listaData;
        filter = new PX036S01A1529Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        try {
            filter.IN_A1529ISOC = request.getParameter("IN_A1529ISOC").trim();
            filter.IN_A1529ANIO = request.getParameter("IN_A1529ANIO").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CalendarBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX036S01A1529(filter);
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
    
    @RequestMapping(value = "MantCalendarBSP")
    public @ResponseBody
    String MantCalendarBSP(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        filter3 = new PX036S02A1529Filter();
        PX036S02A1529Filter objRtn;
        String strOption;
        try {
            strOption = request.getParameter("strOption");
            filter3.A1529ISOC = request.getParameter("A1529ISOC");
            filter3.A1529BAED = request.getParameter("A1529BAED");
            filter3.A1529PERI = request.getParameter("A1529PERI");
            filter3.A1529RPTO = request.getParameter("A1529RPTO");
            filter3.A1529ANIO = request.getParameter("A1529ANIO");
            filter3.A1529CUART = request.getParameter("A1529CUART");
            filter3.A1529PDAIM = request.getParameter("A1529PDAIM");
            filter3.A1529PDAIS = request.getParameter("A1529PDAIS");
            filter3.A1529PCYC = request.getParameter("A1529PCYC");
            filter3.A1529PRDA = request.getParameter("A1529PRDA");
            filter3.A1529CUTO = request.getParameter("A1529CUTO");
            filter3.A1529LADM = request.getParameter("A1529LADM");
            filter3.A1529CLOS = request.getParameter("A1529CLOS");
            filter3.A1529SUBM = request.getParameter("A1529SUBM");
            filter3.A1529BAIR = request.getParameter("A1529BAIR");
            filter3.A1529BAGT = request.getParameter("A1529BAGT");
            filter3.A1529REMW = request.getParameter("A1529REMW");
            filter3.A1529REMQ = request.getParameter("A1529REMQ");
            filter3.A1529SETW = request.getParameter("A1529SETW");
            filter3.A1529SETF = request.getParameter("A1529SETF");
            filter3.A1529SETM = request.getParameter("A1529SETM");
            filter3.A1529DIST = request.getParameter("A1529DIST");
            filter3.A1529CNULO = request.getParameter("A1529CNULO");
            filter3.A1529OBS = request.getParameter("A1529OBS");
            filter3.A1529MESB = request.getParameter("A1529MESB");
            
            logic = new CalendarBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setPX036S02A1529(filter3, strOption);
            map.put("success", true);
            map.put("intResult", objRtn.dbException.MESSAGE);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new PX036S01A1529Filter();
//        filter.strExcel="TRUE";
        
        List<PX036S01A1529Filter> listaData;
        
        String fileNameDownload = String.format("Calendar BSP - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new CalendarBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.IN_A1529ISOC = request.getParameter("IN_A1529ISOC").trim();
            filter.IN_A1529ANIO = request.getParameter("IN_A1529ANIO").trim();

            listaData = logic.loadPX036S01A1529(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Calendar BSP");
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
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Country");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Reporting From");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Period To");
            Cell CH1_06 = row.createCell(4);
            CH1_06.setCellValue("Month");
            Cell CH1_07 = row.createCell(5);
            CH1_07.setCellValue("Period");
            Cell CH1_08 = row.createCell(6);
            CH1_08.setCellValue("Quarter");
            Cell CH1_09 = row.createCell(7);
            CH1_09.setCellValue("Identifier Calendar");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Processing Date");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);

            ++vj;
            
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Month");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Week");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Cicle");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));

            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);

            sheet.autoSizeColumn(7, true);
            
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
                
                cell50.setCellValue(listaData.get(vi).NO);
                cell51.setCellValue(listaData.get(vi).A1529ISOC);
                cell52.setCellValue(listaData.get(vi).A1529RPTO);
                cell53.setCellValue(listaData.get(vi).A1529BAED);
                cell54.setCellValue(listaData.get(vi).A1529MESB);
                cell55.setCellValue(listaData.get(vi).A1529PERI);
                cell56.setCellValue(listaData.get(vi).QUARTER);
                cell57.setCellValue(listaData.get(vi).A1529PDAIM);
                cell58.setCellValue(listaData.get(vi).A1529PDAIS);
                cell59.setCellValue(listaData.get(vi).PCYC);
                cell60.setCellValue(listaData.get(vi).A1529PRDA);

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
                
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(10, true);
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
    
    @RequestMapping(value = "cloneCalendarBSP")
    public @ResponseBody
    String cloneCalendarBSP(ModelMap map, HttpServletRequest request) {
        filter2 = new SQP02284Filter();
        logic = new CalendarBSPLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        
        try {
            filter2.IN_A1529ISOC = request.getParameter("IN_A1529ISOC");
            filter2.IN_A1529ANIO = request.getParameter("IN_A1529ANIO");
            filter2.IN_ISOCTO = request.getParameter("IN_ISOCTO");
            
            logic.setSQP02284(filter2);
            map.put("success", true);
            if(filter2.dbException.SQLCODE.equals("0")){
                map.put("intResult", filter2.dbException.MESSAGE);
            }else{
                map.put("intResult", filter2.dbException.MESSAGE + " - " + filter2.dbException.MESSAGE);
            }
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
}
