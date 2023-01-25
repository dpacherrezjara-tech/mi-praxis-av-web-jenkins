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
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1786Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.MultilegReportLogic;
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
@RequestMapping("/MultilegReport")
public class MultilegReportController extends BaseController {

    private MultilegReportLogic logic;
    private A1786Filter filter;
    private A1691Filter filter2;
    private A1692Filter filter3;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1786Filter> listaData;
        filter = new A1786Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_CARRIER = request.getParameter("IN_CARRIER");
            filter.IN_QTYLEG = request.getParameter("IN_QTYLEG");
            
            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S02A1786(filter);
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
    
    @RequestMapping(value = "/searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        List<A1786Filter> listaData;
        filter = new A1786Filter();
        try {
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CARRIER = request.getParameter("CARRIER").trim();
            filter.ORIG = request.getParameter("ORIG").trim();
            filter.DEST = request.getParameter("DEST").trim();

            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S01A1786(filter);//loadPX087S02A1786
            
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
    
    @RequestMapping(value = "/updateA1897")
    public @ResponseBody
    String updateA1897(ModelMap map, HttpServletRequest request) {
        String msj;
        Gson gson = new Gson();
        filter = new A1786Filter();
        try {
            
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1786Filter.class);
            

            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            msj = logic.loadPX087SQP04261(filter);//loadPX087S02A1786
            
            map.put("success", true);
            map.put("mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
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
        filter2 = new A1691Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        String strTipo;
        
        try {
            strTipo = request.getParameter("strTipo");
            filter2.DFLIGHT = request.getParameter("DFLIGHT");
            filter2.FOPERZUL = request.getParameter("FOPERZUL");
            filter2.NFLIGHT = request.getParameter("NFLIGHT");
            filter2.CDEPART = request.getParameter("CDEPART");
            filter2.CARRIVA = request.getParameter("CARRIVA");
            filter2.CARRI = request.getParameter("CARRI");
            filter2.FLAGLEG = request.getParameter("FLAGLEG");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadCiudadesHash();
            
            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S08A1692(filter2, strTipo, hmPaises);
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
    
    @RequestMapping(value = "/searchA1897")
    public @ResponseBody
    String searchA1897(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter3 = new A1692Filter();
        filter3.page.TOTROW = -1;
        filter3.page.START = 0;
        filter3.page.LIMIT = 0;
        try {
            filter3.DFLIGHT = request.getParameter("DFLIGHT");
            filter3.CCIA = request.getParameter("CCIA");
            filter3.FORMA = request.getParameter("FORMA");
            filter3.SERIE = request.getParameter("SERIE");
            filter3.CUPON = request.getParameter("CUPON");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter3.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter3.page.PAGNUM = (start / filter3.page.PAGROW) + 1;
            
            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S05A1897(filter3);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A1786Filter> listaData;
        filter = new A1786Filter();
        
        String fileNameDownload = String.format("Multileg Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_CARRIER = request.getParameter("IN_CARRIER");
            filter.IN_QTYLEG = request.getParameter("IN_QTYLEG");

            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            listaData = logic.loadPX087S02A1786(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Multileg Report");
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
            CH1_01.setCellValue("Flight");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Segmento");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Number");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("O &amp; D");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("PAX");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("MXN");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("USD");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

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

                cell50.setCellValue(listaData.get(vi).strFormatDate);
                cell51.setCellValue(listaData.get(vi).NFLIGHT);
                cell52.setCellValue(listaData.get(vi).strDescripcion);
                cell53.setCellValue(listaData.get(vi).PAX);
                cell54.setCellValue(listaData.get(vi).AMTMXN);
                cell55.setCellValue(listaData.get(vi).AMTUSD);

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
    
    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {
        List<A1786Filter> listaData;
        filter = new A1786Filter();
        
        String fileNameDownload = String.format("Multileg Report Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CARRIER = request.getParameter("CARRIER").trim();
            filter.ORIG = request.getParameter("ORIG").trim();
            filter.DEST = request.getParameter("DEST").trim();

            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S01A1786(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Multileg Report Detail");
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
            CH1_00.setCellValue("Zulu Date");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Flight");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Segmento");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Leg Analysis");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 11));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(6, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Number");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("O & D");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("PAX");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("MXN");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("USD");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Legs");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Nbr Legs");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Carrier");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("PAX");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("MXN");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("USD");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));

            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);

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

                cell50.setCellValue(listaData.get(vi).strFormatDate);
                cell51.setCellValue(listaData.get(vi).NFLIGHT);
                cell52.setCellValue(listaData.get(vi).strDescripcion);
                cell53.setCellValue(listaData.get(vi).PAX);
                cell54.setCellValue(listaData.get(vi).AMTMXN);
                cell55.setCellValue(listaData.get(vi).AMTUSD);
                cell56.setCellValue(listaData.get(vi).strDescripcion2);
                cell57.setCellValue(listaData.get(vi).FLAGLEG);
                cell58.setCellValue(listaData.get(vi).CARRIER);
                cell59.setCellValue(listaData.get(vi).PAXL);
                cell60.setCellValue(listaData.get(vi).AMTMXNL);
                cell61.setCellValue(listaData.get(vi).AMTUSDL);

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
    
    @RequestMapping(value = "getXLSXDetTicket")
    public @ResponseBody
    void getXLSXDetTicket(HttpServletRequest request, HttpServletResponse response) {
        List<A1692Filter> listaData;
        filter2 = new A1691Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        String strTipo;
        
        String fileNameDownload = String.format("Multileg Report Detail Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            strTipo = request.getParameter("strTipo");
            filter2.DFLIGHT = request.getParameter("DFLIGHT");
            filter2.FOPERZUL = request.getParameter("FOPERZUL");
            filter2.NFLIGHT = request.getParameter("NFLIGHT");
            filter2.CDEPART = request.getParameter("CDEPART");
            filter2.CARRIVA = request.getParameter("CARRIVA");
            filter2.CARRI = request.getParameter("CARRI");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmPaises = masterDAO.loadCiudadesHash();
            
            logic = new MultilegReportLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX087S08A1692(filter2, strTipo, hmPaises);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Multileg Report Detail Ticket");
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
            CH1_00.setCellValue("Ticket");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Accounting");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Sale");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Coupon");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 15));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(7, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Date");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Date");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Country");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Fare");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("RBD");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Pax");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Operation");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Carrier");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Value");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Com.");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Curr.");
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("Status");
            Cell CH2_13 = row2.createCell(13);
            CH2_13.setCellValue("MXN");
            Cell CH2_14 = row2.createCell(14);
            CH2_14.setCellValue("Rate");
            Cell CH2_15 = row2.createCell(15);
            CH2_15.setCellValue("USD");

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));

            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);

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
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);

            ++vj;
            
            Row row3 = sheet.createRow(vj);

            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            Cell CH3_03 = row3.createCell(3);
            Cell CH3_04 = row3.createCell(4);
            CH3_04.setCellValue("Basis");
            Cell CH3_05 = row3.createCell(5);
            Cell CH3_06 = row3.createCell(6);
            Cell CH3_07 = row3.createCell(7);
            Cell CH3_08 = row3.createCell(8);
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            CH3_12.setCellValue("Valoration");
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));

            CH3_01.setCellStyle(headerStyle);
            CH3_02.setCellStyle(headerStyle);
            CH3_03.setCellStyle(headerStyle);
            CH3_04.setCellStyle(headerStyle);
            CH3_05.setCellStyle(headerStyle);
            CH3_06.setCellStyle(headerStyle);
            CH3_07.setCellStyle(headerStyle);
            CH3_08.setCellStyle(headerStyle);
            CH3_09.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);

            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(12, true);

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
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);

                cell50.setCellValue(listaData.get(vi).strTicket);
                cell51.setCellValue(listaData.get(vi).strFormatDate2);
                cell52.setCellValue(listaData.get(vi).strFormatFVTA);
                cell53.setCellValue(listaData.get(vi).PSVVTA);
                cell54.setCellValue(listaData.get(vi).FBASE);
                cell55.setCellValue(listaData.get(vi).CLAS);
                cell56.setCellValue(listaData.get(vi).QTYPAX);
                cell57.setCellValue(listaData.get(vi).TOPUS);
                cell58.setCellValue(listaData.get(vi).CARR);
                cell59.setCellValue(listaData.get(vi).VCPN);
                cell60.setCellValue(listaData.get(vi).COMISI);
                cell61.setCellValue(listaData.get(vi).MDACP);
                cell62.setCellValue(listaData.get(vi).strDescFVAL);
                cell63.setCellValue(listaData.get(vi).VCPMX);
                cell64.setCellValue(listaData.get(vi).TCMUS);
                cell65.setCellValue(listaData.get(vi).VCPUS);

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
                cell64.setCellStyle(bodyStyle);
                cell65.setCellStyle(bodyStyle);

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
                sheet.autoSizeColumn(14, true);
                sheet.autoSizeColumn(15, true);
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
