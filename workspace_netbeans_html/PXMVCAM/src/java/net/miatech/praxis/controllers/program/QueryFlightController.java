package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.program.QueryFlightLogic;
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
@RequestMapping("/QueryFlight")
public class QueryFlightController extends BaseController {

    private QueryFlightLogic logic;
    private A1691Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1248> lstOperadores = logic.loadFieldsConditions();
            List<A1248> lstCampos = logic.loadFields("A1691");
            
            map.put("success", true);
            map.put("lstOperadores", lstOperadores);
            map.put("lstCampos", lstCampos);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072S04A1691(filter, hmAeropuertos);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchConsolid")
    public @ResponseBody
    String searchConsolid(ModelMap map, HttpServletRequest request) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strFCLOFO = request.getParameter("strFCLOFO").trim();
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072S11A1691(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchQtySummary")
    public @ResponseBody
    String searchQtySummary(ModelMap map, HttpServletRequest request) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        try {
            filter.strFormatDate2 = request.getParameter("strFormatDate2").trim();
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();
            
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072SQP00313(filter);
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadPaisesHash();

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP00212(filter, hmPaises);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchDetQtySummary")
    public @ResponseBody
    String searchDetQtySummary(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        String flag;
        try {
            flag = request.getParameter("flag");
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strFormatDate2 = request.getParameter("strFormatDate2").trim();
            filter.strFormatDate = request.getParameter("strFormatDate").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadPaisesHash();

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072SQP00317(filter, hmPaises, flag);
            
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
    
    @RequestMapping(value = "/searchDetQtySummaryVal")
    public @ResponseBody
    String searchDetQtySummaryVal(ModelMap map, HttpServletRequest request) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        try {
            filter.strFormatDate = request.getParameter("strFormatDate").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();
            
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072SQP00692(filter);
            
            map.put("success", true);
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
    
    @RequestMapping(value = "/searchDetQtySummValTkt")
    public @ResponseBody
    String searchDetQtySummValTkt(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        String flag;

        try {
            flag = request.getParameter("flag");
            filter.strFormatDate2 = request.getParameter("strFormatDate2").trim();
            filter.strFormatDate = request.getParameter("strFormatDate").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadPaisesHash();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072SQP00693(filter, hmPaises, flag);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchExcelInteract")
    public @ResponseBody
    void searchExcelInteract(HttpServletRequest request, HttpServletResponse response) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Flight Interact - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.dayFrom = request.getParameter("dayFrom");
            filter.dayTo = request.getParameter("dayTo");
            filter.strSQL = request.getParameter("strSQL");
            
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072S08A1691(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Flight Interact");
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
            CH1_00.setCellValue("Flight Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Departure");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);

                cell50.setCellValue(listaData.get(vi).DFLIGHT);
                cell51.setCellValue(listaData.get(vi).CDEPART);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
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
    
    @RequestMapping(value = "/searchConsolidByNFLIGHT")
    public @ResponseBody
    String searchConsolidByNFLIGHT(ModelMap map, HttpServletRequest request) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strFCLOFO = request.getParameter("strFCLOFO").trim();
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072S11A1691(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchTicketContab")
    public @ResponseBody
    String searchTicketContab(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter = new A1691Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.strFCLOFO = request.getParameter("strFCLOFO").trim();
            filter.CARRI = request.getParameter("CARRI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadPaisesHash();

            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072S02A1692(filter, hmPaises);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSXQtySummary")
    public @ResponseBody
    void getXLSXQtySummary(HttpServletRequest request, HttpServletResponse response) {
        List<A1691Filter> listaData;
        filter = new A1691Filter();
        
        String fileNameDownload = String.format("Query Flight - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.strFormatDate2 = request.getParameter("strFormatDate2").trim();
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();
            filter.strTitulo = request.getParameter("strTitulo").trim();
            
            logic = new QueryFlightLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX072SQP00313(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Query Flight");
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
            CH1_00.setCellValue("Flight");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Quantity Coupons");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Accounted");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Not Accounted");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            
            if (filter.strFormatDate2.equals("FCONT")) {
                Cell CH1_08 = row.createCell(8);
                CH1_08.setCellValue("Total");
                Cell CH1_09 = row.createCell(9);
                CH1_09.setCellValue("Amount");
                
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));
                
                CH1_08.setCellStyle(headerStyle);
                CH1_09.setCellStyle(headerStyle);
            }
            
            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Date");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Stock OAL");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Stock AM");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Not Valued");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Valued");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Total");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Coupons");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Coupons");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            
            if (filter.strFormatDate2.equals("FCONT")) {
                Cell CH2_08 = row2.createCell(8);
                CH2_08.setCellValue("Pre-Accounted");
                Cell CH2_09 = row2.createCell(9);
                CH2_09.setCellValue("USD");
                Cell CH2_10 = row2.createCell(10);
                CH2_10.setCellValue("MXN");
                
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
                
                CH2_08.setCellStyle(headerStyle);
                CH2_09.setCellStyle(headerStyle);
                CH2_10.setCellStyle(headerStyle);
                
                sheet.autoSizeColumn(8, true);
            }
            
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

                cell50.setCellValue(listaData.get(vi).strFormatDate);
                cell51.setCellValue(listaData.get(vi).QCPNOAL);
                cell52.setCellValue(listaData.get(vi).QCPNON);
                cell53.setCellValue(listaData.get(vi).lngQDIFF);
                cell54.setCellValue(listaData.get(vi).QCPNVAL);
                cell55.setCellValue(listaData.get(vi).QCPNTOT);
                cell56.setCellValue(listaData.get(vi).QCPCON);
                cell57.setCellValue(listaData.get(vi).QCPNCON);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);

//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
                
                if (filter.strFormatDate2.equals("FCONT")) {
                    Cell cell58 = row.createCell(8);
                    Cell cell59 = row.createCell(9);
                    Cell cell60 = row.createCell(10);
                    
                    cell58.setCellValue(listaData.get(vi).QCPNOCR);
                    cell59.setCellValue(listaData.get(vi).VCPNUSD);
                    cell60.setCellValue(listaData.get(vi).VCPNLOC);
                    
                    cell58.setCellStyle(bodyStyle);
                    cell59.setCellStyle(bodyStyle);
                    cell60.setCellStyle(bodyStyle);
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
}
