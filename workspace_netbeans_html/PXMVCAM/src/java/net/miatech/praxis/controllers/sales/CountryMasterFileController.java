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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CountryMasterFileLogic;
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
@RequestMapping("/CountryMasterFile")
public class CountryMasterFileController extends BaseController {
    
    private CountryMasterFileLogic logic;
//    private S0007INF053Filter accessSecurityFilter = new S0007INF053Filter();
    private A006 filter;
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        filter = new A006();
        filter.TOTROW = -1;
        filter.START = 0;
        filter.LIMIT = 0;
        try {
            filter.strValor = request.getParameter("strValor").trim();
            filter.strCampo = request.getParameter("strCampo").trim();
            filter.strName = request.getParameter("strName").trim();
//            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.PAGNUM = (start / filter.PAGROW) + 1;
            filter.intCurrentPg = filter.PAGNUM;
            
            logic = new CountryMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A006> lstData = logic.loadCountryMasterFile(filter);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A006();
        filter.strExcel="TRUE";
        
        List<A006> listaData;
        
        String fileNameDownload = String.format("Country Master File - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new CountryMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.strValor = request.getParameter("strValor").trim();
            filter.strCampo = request.getParameter("strCampo").trim();
            filter.strName = request.getParameter("strName").trim();

            listaData = logic.loadCountryMasterFile(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Country Master File");
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

            Cell CH1_00, CH1_01, CH1_02, CH1_03, CH1_04;
            switch (filter.strCampo) {
                case "CURRENCY":
                    CH1_00 = row.createCell(0);
                    CH1_00.setCellValue("Currency Alpha");
                    CH1_01 = row.createCell(1);
                    CH1_01.setCellValue("Country Name");
                    CH1_02 = row.createCell(2);
                    CH1_02.setCellValue("Currency Num");
                    CH1_04 = row.createCell(3);
                    CH1_04.setCellValue("Currency Name");
                    
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));

                    CH1_00.setCellStyle(headerStyle);
                    CH1_01.setCellStyle(headerStyle);
                    CH1_02.setCellStyle(headerStyle);
                    CH1_04.setCellStyle(headerStyle);
                    
                    sheet.autoSizeColumn(0, true);
                    sheet.autoSizeColumn(2, true);
                    break;
                case "OTHERS":
                case "COUNTRYS":
                    CH1_00 = row.createCell(0);
                    CH1_00.setCellValue("Country Code");
                    CH1_01 = row.createCell(1);
                    CH1_01.setCellValue("Country Name");
                    CH1_02 = row.createCell(2);
                    CH1_02.setCellValue("Currency Num");
                    CH1_03 = row.createCell(3);
                    CH1_03.setCellValue("Currency Alpha");
                    CH1_04 = row.createCell(4);
                    CH1_04.setCellValue("Currency Name");
                    
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
                    sheet.autoSizeColumn(2, true);
                    sheet.autoSizeColumn(3, true);
                    break;
            }

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50, cell51, cell52, cell53, cell54;
                switch (filter.strCampo) {
                    case "CURRENCY":
                        cell50 = row.createCell(0);
                        cell51 = row.createCell(1);
                        cell52 = row.createCell(2);
                        cell54 = row.createCell(3);
                        
                        cell50.setCellValue(listaData.get(vi).A006KEY);
                        cell51.setCellValue(listaData.get(vi).A006KEY1);
                        cell52.setCellValue(listaData.get(vi).CODMONEDANUM);
                        cell54.setCellValue(listaData.get(vi).NOMMONEDA);
                        
                        cell50.setCellStyle(bodyStyle);
                        cell51.setCellStyle(bodyStyle);
                        cell52.setCellStyle(bodyStyle);
                        cell54.setCellStyle(bodyStyle);
                        
                        sheet.autoSizeColumn(1, true);
                        sheet.autoSizeColumn(3, true);
                        break;
                    case "OTHERS":
                    case "COUNTRYS":
                        cell50 = row.createCell(0);
                        cell51 = row.createCell(1);
                        cell52 = row.createCell(2);
                        cell53 = row.createCell(3);
                        cell54 = row.createCell(4);
                        
                        cell50.setCellValue(listaData.get(vi).A006KEY);
                        cell51.setCellValue(listaData.get(vi).A006KEY1);
                        cell52.setCellValue(listaData.get(vi).CODMONEDANUM);
                        cell53.setCellValue(listaData.get(vi).CODMONEDAALPHA);
                        cell54.setCellValue(listaData.get(vi).NOMMONEDA);
                        
                        cell50.setCellStyle(bodyStyle);
                        cell51.setCellStyle(bodyStyle);
                        cell52.setCellStyle(bodyStyle);
                        cell53.setCellStyle(bodyStyle);
                        cell54.setCellStyle(bodyStyle);
                        
                        sheet.autoSizeColumn(1, true);
                        sheet.autoSizeColumn(4, true);
                        break;
                }
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
    
    @RequestMapping(value = "maintanceA006")
    public @ResponseBody
    String maintanceA006(ModelMap map, HttpServletRequest request) {  
       filter = new A006();
       String strOption, strCampo;
//        if(strOption.equals("I") ){
//                accessSecurityFilter.IN_TPERM = App.SECURITY_CREATE;
//        }else if(strOption.equals("U")){
//                accessSecurityFilter.IN_TPERM = App.SECURITY_MODIFY;
//        }else if(strOption.equals("D")){
//                accessSecurityFilter.IN_TPERM = App.SECURITY_DELETE;
//        }
        
        try {
//            UserLogic ulogic = new UserLogic();
//            ulogic.setSession(serverSession);
//            ulogic.setApp(app);
//            ulogic.accessSecurityTrigger(accessSecurityFilter);
            
            filter.A006KEY = request.getParameter("A006KEY");
            filter.A006KEY1 = request.getParameter("A006KEY1");
            filter.CODMONEDANUM = request.getParameter("CODMONEDANUM");
            filter.CODMONEDAALPHA = request.getParameter("CODMONEDAALPHA");
            filter.NOMMONEDA = request.getParameter("NOMMONEDA");
            
            strOption = request.getParameter("strOption");
            strCampo = request.getParameter("strCampo");
            
            logic = new CountryMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.maintanceA006(filter,strOption,strCampo);
            logic = null;
            
            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
}
