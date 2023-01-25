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
import net.miatech.beans.PX036S02A1527Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CalendarARCLogic;
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
@RequestMapping("/CalendarARC")
public class CalendarARCController extends BaseController {
    
    private CalendarARCLogic logic;
//    private S0007INF053Filter accessSecurityFilter = new S0007INF053Filter();
    private PX034S01A1527Filter filter;
    private PX036S02A1527Filter filter2;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<PX034S01A1527Filter> listaData;
        filter = new PX034S01A1527Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            String temp = request.getParameter("IN_TFILTER").trim();
            if(!temp.equals("")) filter.IN_TFILTER = Integer.parseInt(temp);
            else filter.IN_TFILTER = 0;
            filter.IN_A1527PPED = request.getParameter("IN_A1527PPED").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new CalendarARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX034S01A1527(filter);
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
        filter = new PX034S01A1527Filter();
//        filter.strExcel="TRUE";
        
        List<PX034S01A1527Filter> listaData;
        
        String fileNameDownload = String.format("Calendar ARC - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new CalendarARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            String temp = request.getParameter("IN_TFILTER").trim();
            if(!temp.equals("")) filter.IN_TFILTER = Integer.parseInt(temp);
            else filter.IN_TFILTER = 0;
            filter.IN_A1527PPED = request.getParameter("IN_A1527PPED").trim();

            listaData = logic.loadPX034S01A1527(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Calendar ARC");
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
            CH1_01.setCellValue("Period Ending Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Quarter");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Identifier");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Processing Date");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Weekly");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Disbursement");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Null");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Remark");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
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
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Month");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Week");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Cicle");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

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
                Cell cell56 = row.createCell(6);
                Cell cell57= row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                
                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).PPED);
                cell52.setCellValue(listaData.get(vi).QUARTER);
                cell53.setCellValue(listaData.get(vi).A1527PDIDM);
                cell54.setCellValue(listaData.get(vi).A1527PDIDS);
                cell55.setCellValue(listaData.get(vi).PDIDC);
                cell56.setCellValue(listaData.get(vi).A1527SODA);
                cell57.setCellValue(listaData.get(vi).A1527CINTA);
                cell58.setCellValue(listaData.get(vi).A1527DESEM);
                cell59.setCellValue(listaData.get(vi).A1527CNULO);
                cell60.setCellValue(listaData.get(vi).A1527OBS);

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
    
    @RequestMapping(value = "MantCalendarARC")
    public @ResponseBody
    String MantCalendarARC(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        PX036S02A1527Filter objRtn;
        filter2 = new PX036S02A1527Filter();
        String strOption;
        
        try {
            strOption = request.getParameter("strOption");
            filter2.A1527PPED = request.getParameter("A1527PPED");
            filter2.A1527ANIO = request.getParameter("A1527ANIO");
            filter2.A1527CUART = request.getParameter("A1527CUART");
            filter2.A1527PDIDM = request.getParameter("A1527PDIDM");
            filter2.A1527PDIDS = request.getParameter("A1527PDIDS");
            filter2.A1527PDIDC = request.getParameter("A1527PDIDC");
            filter2.A1527SODA = request.getParameter("A1527SODA");
            filter2.A1527CINTA = request.getParameter("A1527CINTA");
            filter2.A1527DESEM = request.getParameter("A1527DESEM");
            filter2.A1527CNULO = request.getParameter("A1527CNULO");
            filter2.A1527OBS = request.getParameter("A1527OBS");
            
            logic = new CalendarARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setPX034S02A1527(filter2, strOption);
//            resp.info.add(objRtn.dbException.MESSAGE);
            map.put("success", true);
            map.put("intResult", objRtn.dbException.MESSAGE);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
}
