package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.sales.*;
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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A005;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AirlineMasterFileLogic;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.persistence.facadeimpl.UserFacadeImpl;
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
@RequestMapping("/AirlineMasterFile")
public class AirlineMasterFileController extends BaseController {
    
    private AirlineMasterFileLogic logic;
    private A005 filter;
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        filter = new A005();
        filter.TOTROW = -1;
        filter.START = 0;
        filter.LIMIT = 0;
        
        try {
            filter.strCampo = request.getParameter("strCampo").trim();
            filter.strValor = request.getParameter("strValor").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.PAGNUM = (start / filter.PAGROW) + 1;
            filter.intCurrentPg = filter.PAGNUM;
            
            logic = new AirlineMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A005> lstData = logic.loadMasterData(filter);
            logic = null;
            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).TOTROW : 0);
            map.put("data", lstData);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getDataAudit_A006")
    public @ResponseBody
    String getDataAudit_A006(ModelMap map, HttpServletRequest request) {
        String keyTable, Table;
        A006 bean;
        try {
            keyTable = request.getParameter("keyTable").trim();
            Table = request.getParameter("Table").trim();
            
            logic = new AirlineMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            bean = logic.get_AuditData_A006 (keyTable, Table);
            logic = null;
            map.put("success", true);
            map.put("data", bean);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "/maintanceA005")
    public @ResponseBody
    String maintanceA005(ModelMap map, HttpServletRequest request) {
        filter = new A005();
        String strOption;
        
        try {
            strOption = request.getParameter("strOption");
            filter.A005KEY = request.getParameter("A005KEY").trim();
            filter.A005KEY1 = request.getParameter("A005KEY1").trim();
            filter.A005KEY2 = request.getParameter("A005KEY2").trim();
            filter.A005ACHS = request.getParameter("A005ACHS").trim();
            filter.A005KEY3 = request.getParameter("A005KEY3").trim();
            String temp = request.getParameter("A005COMISP").trim();
            if (!temp.equals("")) filter.A005COMISP = Double.parseDouble(temp);
            else filter.A005COMISP = 0;
            filter.A005INDCOM = request.getParameter("A005INDCOM").trim();
            filter.A005ZONA = request.getParameter("A005ZONA").trim();
            filter.A005ACHS = request.getParameter("A005ACHS").trim();
            filter.A005ACPL = request.getParameter("A005ACPL").trim();
            filter.A005CIAS = request.getParameter("A005CIAS").trim();
            
            logic = new AirlineMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.maintanceA005(filter,strOption);
            logic = null;
            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A005();
        filter.strExcel="TRUE";
        
        // String fileNameDownload = String.format("Airline Master File - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Airline Master File " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new AirlineMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.strCampo = request.getParameter("strCampo").trim();
            filter.strValor = request.getParameter("strValor").trim();

            List<A005> listaData = logic.loadMasterData(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Airline Master File");
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

            // <editor-fold defaultstate="collapsed" desc="Creación de Tìtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Numeric Code");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Alpha Code");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Legal Name");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("CHS");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Comercial Name");

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

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(3, true);

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

                cell50.setCellValue(listaData.get(vi).A005KEY);
                cell51.setCellValue(listaData.get(vi).A005KEY1);
                cell52.setCellValue(listaData.get(vi).A005KEY2);
                cell53.setCellValue(listaData.get(vi).A005CHS);
                cell54.setCellValue(listaData.get(vi).A005KEY3);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(4, true);
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
