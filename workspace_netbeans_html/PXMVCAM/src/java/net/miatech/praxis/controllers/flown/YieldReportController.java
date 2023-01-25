package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.YieldReportLogic;
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
@RequestMapping("/YieldReport")
public class YieldReportController extends BaseController {

    private YieldReportLogic logic;
    private A1692Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            
            List<A1007> ciudades = masterDAO.loadCiudades();
            List<A006> paises = masterDAO.loadPaises();

            map.put("success", true);
            map.put("lstCiudades", ciudades);
            map.put("lstPaises", paises);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        List<A1692Filter> listaData;
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.STVAL = request.getParameter("STVAL").trim();
            filter.PSVVTA = request.getParameter("PSVVTA").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            filter.intCurrentPg = filter.page.PAGNUM;
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadCiudadesHash();
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new YieldReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX084S03A1784(filter, hmPaises, hmAeropuertos,20);
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
    
    @RequestMapping(value = "/showDetail")
    public @ResponseBody
    String showDetail(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaDataDetail;
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.yearTo = request.getParameter("yearTo").trim();
            filter.monthTo = request.getParameter("monthTo").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();
            filter.KMS = request.getParameter("KMS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            filter.intCurrentPg = filter.page.PAGNUM;
            
            logic = new YieldReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaDataDetail = logic.loadPX084S02A1784(filter, 20);
            map.put("success", true);
            map.put("total", listaDataDetail.size() > 0 ? listaDataDetail.get(0).page.TOTROW : 0);
            map.put("data", listaDataDetail);

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
        List<A1692Filter> listaData;
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Yield Report Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.STVAL = request.getParameter("STVAL").trim();
            filter.PSVVTA = request.getParameter("PSVVTA").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            filter.intCurrentPg = filter.page.PAGNUM;
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadCiudadesHash();
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            logic = new YieldReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            listaData = logic.loadPX084S03A1784(filter, hmPaises, hmAeropuertos,20);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Yield Report Summary");
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
            CH1_01.setCellValue("Flight Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Flight");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Departure");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Arrival");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Passengers");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Revenue");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Revenue by Pax");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("KMS");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);

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

                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).strFormatDate);
                cell52.setCellValue(listaData.get(vi).NFLIGHT);
                cell53.setCellValue(listaData.get(vi).CDEPART);
                cell54.setCellValue(listaData.get(vi).CARRIVA);
                cell55.setCellValue(listaData.get(vi).PASSNG);
                cell56.setCellValue(listaData.get(vi).RVNUE);
                cell57.setCellValue(listaData.get(vi).RVNPAX);
                cell58.setCellValue(listaData.get(vi).KMS);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                sheet.autoSizeColumn(8, true);
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
    
    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {
        List<A1692Filter> listaData;
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Yield Report Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.yearTo = request.getParameter("yearTo").trim();
            filter.monthTo = request.getParameter("monthTo").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();
            filter.KMS = request.getParameter("KMS").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            filter.intCurrentPg = filter.page.PAGNUM;
            
            logic = new YieldReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX084S02A1784(filter, 20);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Yield Report Detail");
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
            CH1_01.setCellValue("Flight Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Flight");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Zone");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Departure");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Arrival");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Carrier");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Fare Basis CD");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Fare Class");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Passengers");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Revenue");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Yield");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Revenue by Pax");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("KMS");

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

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);

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

                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).DFLIGHT);
                cell52.setCellValue(listaData.get(vi).NFLIGHT);
                cell53.setCellValue(listaData.get(vi).ZONA);
                cell54.setCellValue(listaData.get(vi).CDEPART);
                cell55.setCellValue(listaData.get(vi).CARRIVA);
                cell56.setCellValue(listaData.get(vi).CARR);
                cell57.setCellValue(listaData.get(vi).FBASE);
                cell58.setCellValue(listaData.get(vi).CLAS);
                cell59.setCellValue(listaData.get(vi).PASSNG);
                cell60.setCellValue(listaData.get(vi).RVNUE);
                cell61.setCellValue(listaData.get(vi).YIELD);
                cell62.setCellValue(listaData.get(vi).RVNPAX);
                cell63.setCellValue(listaData.get(vi).KMS);

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

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(9, true);
                sheet.autoSizeColumn(10, true);
                sheet.autoSizeColumn(11, true);
                sheet.autoSizeColumn(12, true);
                sheet.autoSizeColumn(13, true);
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
