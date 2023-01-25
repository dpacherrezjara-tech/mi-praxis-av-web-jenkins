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
import net.miatech.beans.PX031S01A766Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CodeSharedLogic;
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
@RequestMapping("/CodeShared")
public class CodeSharedController extends BaseController {
    
    private CodeSharedLogic logic;
//    private S0007INF053Filter accessSecurityFilter = new S0007INF053Filter();
    private PX031S01A766Filter filter;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<PX031S01A766Filter> listaData;
        filter = new PX031S01A766Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            String temp = request.getParameter("IN_TFILTER").trim();
            if(!temp.equals("")) filter.IN_TFILTER = Integer.parseInt(temp);
            else filter.IN_TFILTER = 0;
            filter.IN_A766AIRLIN = request.getParameter("IN_A766AIRLIN").trim();
            filter.IN_A766CARRIE = request.getParameter("IN_A766CARRIE").trim();
            filter.IN_A766VLOINI = request.getParameter("IN_A766VLOINI").trim();
            filter.IN_A766VLOFIN = request.getParameter("IN_A766VLOFIN").trim();
            filter.IN_A766EFF = request.getParameter("IN_A766EFF").trim();
            filter.IN_A766DIS = request.getParameter("IN_A766DIS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CodeSharedLogic();    
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX031S01A766(filter);
            
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
    
    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        filter = new PX031S01A766Filter();
        String strOption;
        try {
            strOption = request.getParameter("strOption");
            filter.A766AIRLIN = request.getParameter("A766AIRLIN");
            filter.A766CARRIE = request.getParameter("A766CARRIE");
            filter.A766VLOINI = request.getParameter("A766VLOINI");
            filter.A766VLOFIN = request.getParameter("A766VLOFIN");
            filter.A766EFF = request.getParameter("A766EFF");
            filter.A766DIS = request.getParameter("A766DIS");
            filter.A766CIANUM = request.getParameter("A766CIANUM");
            filter.A766CIALIT = request.getParameter("A766CIALIT");
            filter.A766VLOOP = request.getParameter("A766VLOOP");
            filter.A766ORIG = request.getParameter("A766ORIG");
            filter.A766DEST = request.getParameter("A766DEST");
            filter.IN_A766AIRLIN_OLD = request.getParameter("IN_A766AIRLIN_OLD");
            filter.IN_A766CARRIE_OLD = request.getParameter("IN_A766CARRIE_OLD");
            filter.IN_A766VLOINI_OLD = request.getParameter("IN_A766VLOINI_OLD");
            filter.IN_A766VLOFIN_OLD = request.getParameter("IN_A766VLOFIN_OLD");
            filter.IN_A766EFF_OLD = request.getParameter("IN_A766EFF_OLD");
            filter.IN_A766DIS_OLD = request.getParameter("IN_A766DIS_OLD");
            
            logic = new CodeSharedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.SQP02417(filter,strOption);
            
            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);
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
        filter = new PX031S01A766Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
//        filter.strExcel="TRUE";
        
        List<PX031S01A766Filter> listaData;
        
        String fileNameDownload = String.format("Code Shared - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new CodeSharedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            String temp = request.getParameter("IN_TFILTER").trim();
            if(!temp.equals("")) filter.IN_TFILTER = Integer.parseInt(temp);
            else filter.IN_TFILTER = 0;
            filter.IN_A766AIRLIN = request.getParameter("IN_A766AIRLIN").trim();
            filter.IN_A766CARRIE = request.getParameter("IN_A766CARRIE").trim();
            filter.IN_A766VLOINI = request.getParameter("IN_A766VLOINI").trim();
            filter.IN_A766VLOFIN = request.getParameter("IN_A766VLOFIN").trim();
            filter.IN_A766EFF = request.getParameter("IN_A766EFF").trim();
            filter.IN_A766DIS = request.getParameter("IN_A766DIS").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            listaData = logic.loadPX031S01A766(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Code Shared");
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
            CH1_00.setCellValue("Airline");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Carrier");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Begin Flight");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("End Flight");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Cia Operator Code");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Cia Operator Name");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);

            ++vj;
            
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
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
                
                cell50.setCellValue(listaData.get(vi).A766AIRLIN);
                cell51.setCellValue(listaData.get(vi).A766CARRIE);
                cell52.setCellValue(listaData.get(vi).A766VLOINI);
                cell53.setCellValue(listaData.get(vi).A766VLOFIN);
                cell54.setCellValue(listaData.get(vi).A766CIANUM);
                cell55.setCellValue(listaData.get(vi).A766CIALIT);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
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
//    
//    @RequestMapping(value = "maintancePX031S01A766Filter")
//    public @ResponseBody
//    String maintancePX031S01A766Filter(ModelMap map, HttpServletRequest request) {  
//       filter = new PX031S01A766Filter();
//       String strOption, strCampo;
////        if(strOption.equals("I") ){
////                accessSecurityFilter.IN_TPERM = App.SECURITY_CREATE;
////        }else if(strOption.equals("U")){
////                accessSecurityFilter.IN_TPERM = App.SECURITY_MODIFY;
////        }else if(strOption.equals("D")){
////                accessSecurityFilter.IN_TPERM = App.SECURITY_DELETE;
////        }
//        
//        try {
////            UserLogic ulogic = new UserLogic();
////            ulogic.setSession(serverSession);
////            ulogic.setApp(app);
////            ulogic.accessSecurityTrigger(accessSecurityFilter);
//            
//            filter.PX031S01A766FilterKEY = request.getParameter("PX031S01A766FilterKEY");
//            filter.PX031S01A766FilterKEY1 = request.getParameter("PX031S01A766FilterKEY1");
//            filter.CODMONEDANUM = request.getParameter("CODMONEDANUM");
//            filter.CODMONEDAALPHA = request.getParameter("CODMONEDAALPHA");
//            filter.NOMMONEDA = request.getParameter("NOMMONEDA");
//            
//            strOption = request.getParameter("strOption");
//            strCampo = request.getParameter("strCampo");
//            
//            logic = new CodeSharedLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            String result = logic.maintancePX031S01A766Filter(filter,strOption,strCampo);
//            logic = null;
//            
//            map.put("success", true);
//            map.put("intResult", result);
//        } catch (SQLException e) {
//            map.put("success", false);
//            throw new SpringException(e);
//        }
//        
//        return new Gson().toJson(map);
//    }
}
