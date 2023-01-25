package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.read.biff.BiffException;
import net.miatech.beans.A1789Filter;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.LoadCommissionADMACMLogic;
import net.miatech.utils.Functions;
import net.miatech.utils.Util;
import org.apache.commons.io.FilenameUtils;
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
@RequestMapping("/LoadCommissionADMACM")
public class LoadCommissionADMACMController extends BaseController {

    private LoadCommissionADMACMLogic logic;
    private A2960Filter filter;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A2960Filter> listaData;
        filter = new A2960Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_SELET_TYPE = request.getParameter("IN_SELET_TYPE").trim();
            filter.IN_DATEPER1 = request.getParameter("IN_DATEPER1").trim();
            filter.IN_DATEPER2 = request.getParameter("IN_DATEPER2").trim();
            
            if (!filter.IN_OPTION.equals("5")) {
                int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
                int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }else{
                filter.page.PAGROW =-1;
            }
            
            
            logic = new LoadCommissionADMACMLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.lst_search(filter);
            
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
    
    @RequestMapping(value = "/getLoadCommiADMACM")
    public @ResponseBody
    String getLoadCommiADMACM(ModelMap map, HttpServletRequest request) {
        filter = new A2960Filter();
        try {
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_DATEPER1 = request.getParameter("IN_DATEPER1");
            filter.IN_LOTE = request.getParameter("IN_LOTE");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_SELET_TYPE = request.getParameter("IN_SELET_TYPE");
            filter.IN_SELET_BASE = request.getParameter("IN_SELET_BASE");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_CODAC = request.getParameter("IN_CODAC");
            
            logic = new LoadCommissionADMACMLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String objRtn = logic.getLoadCommiADMACM(filter);
            
            if (objRtn.equals("RECORD INSERTED")) {
                map.put("sesion", "The record was saved successfully.");
                 map.put("success", true);
            } else {
                map.put("sesion", "An error ocurred when trying to save the record.");
            }
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("session", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("session", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A2960Filter> listaData;
        filter = new A2960Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Load Commission ADM ACM - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_SELET_TYPE = request.getParameter("IN_SELET_TYPE").trim();
            filter.IN_DATEPER1 = request.getParameter("IN_DATEPER1").trim();
            filter.IN_DATEPER2 = request.getParameter("IN_DATEPER2").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new LoadCommissionADMACMLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.lst_search(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Load Commission ADM ACM");
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
            CH1_00.setCellValue("System Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Period");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("EJECUTADA");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("PROYECTADA");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Type");
//            Cell CH1_07 = row.createCell(7);
//            CH1_07.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Processed");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("TOTAL");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Processed");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("TOTAL");
            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(2, true);
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
                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);

                cell50.setCellValue(listaData.get(vi).A2960FINGR);
                cell51.setCellValue(listaData.get(vi).A2960FPERI);
                cell52.setCellValue(listaData.get(vi).A2960CTRAL);
                cell53.setCellValue(listaData.get(vi).A2960NETOR);
                cell54.setCellValue(listaData.get(vi).A2960CTPYT);
                cell55.setCellValue(listaData.get(vi).A2960NETOP);
                cell56.setCellValue(listaData.get(vi).A2960TYPE);
//                cell57.setCellValue(listaData.get(vi).A2672STATS);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);

//                sheet.autoSizeColumn(5, true);
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
