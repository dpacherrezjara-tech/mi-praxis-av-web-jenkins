package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP00824Filter;
import net.miatech.beans.SQP00826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2534;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.MasterBundlesLogic;
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
@RequestMapping("/MasterBundles")
public class MasterBundlesController extends BaseController {
    
    private MasterBundlesLogic logic;
    private SQP00824Filter filter;
    private SQP00826Filter filter2;
    private A2534 filter3;
    private List<SQP00826Filter> listaAncillaries;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP00824Filter> lstMasterBundles;
        filter = new SQP00824Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_TFILTER = request.getParameter("IN_TFILTER").trim();
            filter.IN_BUNDL = request.getParameter("IN_BUNDL").trim();
            filter.IN_RFIC = request.getParameter("IN_RFIC").trim();
            filter.IN_SUBCD = request.getParameter("IN_SUBCD").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new MasterBundlesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstMasterBundles = logic.loadSQP00824(filter);
            map.put("success", true);
            map.put("total", lstMasterBundles.size() > 0 ? lstMasterBundles.get(0).page.TOTROW : 0);
            map.put("data", lstMasterBundles);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchAncillaries")
    public @ResponseBody
    String searchAncillaries(ModelMap map, HttpServletRequest request) {
        List<SQP00826Filter> lstAncillaries;
        filter2 = new SQP00826Filter();
        try {
            filter2.IN_TFILTER = request.getParameter("IN_TFILTER").trim();
            filter2.IN_BUNDL = request.getParameter("IN_BUNDL").trim();
            filter2.IN_RFIC = request.getParameter("IN_RFIC").trim();
            filter2.IN_SUBCD = request.getParameter("IN_SUBCD").trim();
            
            logic = new MasterBundlesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstAncillaries = logic.loadAncillaries(filter2);
            map.put("success", true);
            map.put("data", lstAncillaries);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/setSQP00826")
    public @ResponseBody
    String setSQP00826(ModelMap map, HttpServletRequest request) {
        filter2 = new SQP00826Filter();
        filter3 = new A2534();
        String strOption;
        String temp;
        listaAncillaries = new ArrayList<>();
        
        try {
            strOption = request.getParameter("strOption");
            filter3.A2534BRFIC = request.getParameter("A2534BRFIC");
            filter3.A2534BRFIS = request.getParameter("A2534BRFIS");
            filter3.A2534DESCR = request.getParameter("A2534DESCR");
            filter3.A2534TEMD = request.getParameter("A2534TEMD");
            filter3.A2534VDESD = request.getParameter("A2534VDESD");
            filter3.A2534VHAST = request.getParameter("A2534VHAST");
            filter3.A2534MDABD = request.getParameter("A2534MDABD");
            temp = request.getParameter("A2534TOTBD"); if (!temp.equals("")) filter3.A2534TOTBD = Double.parseDouble(temp); else filter3.A2534TOTBD = 0;
            temp = request.getParameter("A2534IMPTB"); if (!temp.equals("")) filter3.A2534IMPTB = Double.parseDouble(temp); else filter3.A2534IMPTB = 0;
            temp = request.getParameter("A2534IMPMB"); if (!temp.equals("")) filter3.A2534IMPMB = Double.parseDouble(temp); else filter3.A2534IMPMB = 0;
            temp = request.getParameter("A2534NETOB"); if (!temp.equals("")) filter3.A2534NETOB = Double.parseDouble(temp); else filter3.A2534NETOB = 0;
            temp = request.getParameter("A2534DIFBD"); if (!temp.equals("")) filter3.A2534DIFBD = Double.parseDouble(temp); else filter3.A2534DIFBD = 0;
            String json = request.getParameter("listaAncillaries");
            SQP00826Filter[] respone = new Gson().fromJson(json, SQP00826Filter[].class);
            listaAncillaries = Arrays.asList(respone);
            
            logic = new MasterBundlesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = null;
            
            for (int i = 0; i < listaAncillaries.size(); i++) {
                filter2 = logic.setSQP00826(listaAncillaries.get(i), filter3, strOption, i);
                map.put("SQLCODE", filter2.dbException.SQLCODE);
                map.put("MESSAGE", filter2.dbException.MESSAGE);
                if (!filter2.dbException.SQLCODE.equals("0")) {
                    return new Gson().toJson(map);
                }
            }            

        }  catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new SQP00824Filter();
//        filter.strExcel="TRUE";
        
        String fileNameDownload = String.format("PX0284-" + Functions.getFechaActual() + "-MasterBUNDLES.xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new MasterBundlesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.IN_TFILTER = request.getParameter("IN_TFILTER").trim();
            filter.IN_BUNDL = request.getParameter("IN_BUNDL").trim();
            filter.IN_RFIC = request.getParameter("IN_RFIC").trim();
            filter.IN_SUBCD = request.getParameter("IN_SUBCD").trim();

            List<SQP00824Filter> listaData = logic.loadSQP00824(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Master Bundles");
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
            CH1_00.setCellValue("EMD");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("BUNDLE");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("TOTAL");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Curr.");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Ancillaries");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Total Ancillarie");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Tax");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Net Amount");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Fare (%)");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);

            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("RFIC");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("RFIS");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Description");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("RFIC");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("RFIS");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Description");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Tax(%)");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Amount");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));

            CH2_00.setCellStyle(headerStyle);
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

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
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
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);

                cell50.setCellValue(listaData.get(vi).A2534TEMD);
                cell51.setCellValue(listaData.get(vi).A2534BRFIC);
                cell52.setCellValue(listaData.get(vi).A2534BRFIS);
                cell53.setCellValue(listaData.get(vi).A2534DESCR);
                cell54.setCellValue(listaData.get(vi).A2534TOTBD);
                cell55.setCellValue(listaData.get(vi).A2534MDABD);
                cell56.setCellValue(listaData.get(vi).A2534ARFIC);
                cell57.setCellValue(listaData.get(vi).A2534ARFIS);
                cell58.setCellValue(listaData.get(vi).A2534DESCA);
                cell59.setCellValue(listaData.get(vi).A2534TOTAN);
                cell60.setCellValue(listaData.get(vi).A2534IMPTA);
                cell61.setCellValue(listaData.get(vi).A2534IMPMA);
                cell62.setCellValue(listaData.get(vi).A2534NETOA);
                cell63.setCellValue(listaData.get(vi).A2534PORCA);


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

                sheet.autoSizeColumn(3, true);
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
}
