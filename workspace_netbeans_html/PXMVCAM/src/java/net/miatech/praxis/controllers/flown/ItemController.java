package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.flown.*;
import net.miatech.praxis.controllers.flown.*;
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
import net.miatech.beans.PX019S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ItemLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
@RequestMapping("/Item")
public class ItemController extends BaseController {
    private static final Logger logError = Logger.getLogger("errorLog");
    private ItemLogic logic;
    private PX019S01A051Filter filter;
    
    @RequestMapping(value = "/searchMicelania")
    public @ResponseBody
    String searchMicelania(ModelMap map, HttpServletRequest request) {
        List<PX019S01A051Filter> lstMicelaniaRep;
        filter = new PX019S01A051Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        try {
            filter.IN_A051KEY1 = request.getParameter("IN_A051KEY1").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new ItemLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstMicelaniaRep = logic.loadPX019S01A051(filter);
            map.put("success", true);
            map.put("total", lstMicelaniaRep.size() > 0 ? lstMicelaniaRep.get(0).page.TOTROW : 0);
            map.put("data", lstMicelaniaRep);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        } catch (Exception ex) {
            map.put("error", ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new PX019S01A051Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
//        filter.strExcel="TRUE";
        
        // String fileNameDownload = String.format("Item - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Item " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_A051KEY1 = request.getParameter("IN_A051KEY1").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new ItemLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX019S01A051Filter> listaData = logic.loadPX019S01A051(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Item");
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
            CH1_01.setCellValue("Code");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Audit");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Item");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("From");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("To");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(4, true);

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

                cell50.setCellValue(listaData.get(vi).NO);
                cell51.setCellValue(listaData.get(vi).A051KEY2);
                cell52.setCellValue(listaData.get(vi).A051DESCR1);
                cell53.setCellValue(listaData.get(vi).A051DESCR2);
                cell54.setCellValue(listaData.get(vi).A051FECHA1);
                cell55.setCellValue(listaData.get(vi).A051FECHA2);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
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
    
    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("AccountingMasterBINES : Mantenimiento");
        String msj = "";
        PX019S01A051Filter filter = new PX019S01A051Filter();

        try {
            logic = new ItemLogic();
            logic.setSession(this.serverSession.getServerSession());

            String strOption = request.getParameter("strOption").toString().trim();
            filter.A051KEY1 = request.getParameter("A051KEY1");
            filter.A051KEY2 = request.getParameter("A051KEY2");
            filter.A051DESCR1 = request.getParameter("A051DESCR1");
            filter.A051DESCR2 = request.getParameter("A051DESCR2");
            filter.A051FECHA1 = request.getParameter("A051FECHA1");
            filter.A051FECHA2 = request.getParameter("A051FECHA2");
            filter.A051CANTI1= 0;
            filter.A051CANTI2=0;
            filter.A051COMENT="";
            filter.A051STATUS="A";
            filter.IN_A051KEY2_OLD = request.getParameter("IN_A051KEY2_OLD");            
            msj = logic.ItemMaintance(filter, strOption);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }
}
