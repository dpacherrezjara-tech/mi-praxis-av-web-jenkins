package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX019S01A1348Filter;
import net.miatech.beans.PX019S01A1536Filter;
import net.miatech.beans.PX019S01A1697Filter;
import net.miatech.beans.PX019S01A1698Filter;
import net.miatech.beans.PX037S06PRO9822Filter;
import net.miatech.beans.PX037S07PRO9876Filter;
import net.miatech.beans.PX037S08A1724Filter;
import net.miatech.beans.PX074S01PPRO9824Filter;
import net.miatech.beans.PX074S02PRO9878Filter;
import net.miatech.beans.SQP03605Filter;
import net.miatech.beans.SQP03606Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.LoadControlLogic;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
@RequestMapping("/LoadControl")
public class LoadControlController extends BaseController {

    private LoadControlLogic logic;
    private PX019S01A1698Filter filter;
    private PX037S08A1724Filter filter2;
    private PX019S01A1536Filter filter3;
    private PX019S01A1697Filter filter4;
    private PX019S01A1348Filter filter5;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<PX019S01A1698Filter> listaData;
        filter = new PX019S01A1698Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_A1698CCUST = request.getParameter("IN_A1698CCUST").trim();
            filter.IN_A1698SOURC = request.getParameter("IN_A1698SOURC").trim();
            filter.IN_A1698PAIS = request.getParameter("IN_A1698PAIS").trim().toUpperCase();
            filter.IN_A1698BANK = request.getParameter("IN_A1698BANK").trim().toUpperCase();
            filter.IN_A1698FPRDA = request.getParameter("IN_A1698FPRDA").trim().toUpperCase();
            filter.IN_A1698FFILE = request.getParameter("IN_A1698FFILE").trim();
            filter.IN_A1698HFILE = request.getParameter("IN_A1698HFILE").trim().toUpperCase();
            filter.IN_A1698FREGI = request.getParameter("IN_A1698FREGI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX019S01A1698(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    // Exportar EXCEL
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        PX019S01A1698Filter filter = new PX019S01A1698Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            String fileName = request.getParameter("fileName");
            String fileName = "PX073_"+Functions.getFechaActual()+"_BSP_Load_Control"+".xlsx";
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
//            List listaData = logic.loadPX019S01A1698(filter);
            List<PX019S01A1698Filter> listaData = logic.loadPX019S01A1698(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);
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
            
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61;
            
            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
            cell59 = row.createCell(9);
            cell60 = row.createCell(10);
            cell61 = row.createCell(11);
            
            cell50.setCellValue("Country");
            cell51.setCellValue("City");
            cell52.setCellValue("Processing Date");
            cell53.setCellValue("Ending Date");
            cell54.setCellValue("Hour");
            cell55.setCellValue("Receipt");
            cell56.setCellValue("Processed");
            cell57.setCellValue("Delivery");
            cell58.setCellValue("Master File");
            cell59.setCellValue("Prorate File");
            cell60.setCellValue("ID File");
            cell61.setCellValue("System Date");
                        
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            cell59.setCellStyle(headerStyle);
            cell60.setCellStyle(headerStyle);
            cell61.setCellStyle(headerStyle);
            
//            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
//            row = sheet.createRow(vj);
//            cell50 = row.createCell(0);
//            cell51 = row.createCell(1);
//            cell52 = row.createCell(2);
//            cell53 = row.createCell(3);
//            cell54 = row.createCell(4);
//            cell55 = row.createCell(5);
//            cell56 = row.createCell(6);
//            cell57 = row.createCell(7);
//            cell58 = row.createCell(8);
//            cell59 = row.createCell(9);
//            cell60 = row.createCell(10);
//            
//            cell53.setCellValue("DESCRIPTION");
//            cell59.setCellValue("SALES");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
//
//            cell50.setCellStyle(headerStyle);
//            cell51.setCellStyle(headerStyle);
//            cell52.setCellStyle(headerStyle);
//            cell53.setCellStyle(headerStyle);
//            cell54.setCellStyle(headerStyle);
//            cell55.setCellStyle(headerStyle);
//            cell56.setCellStyle(headerStyle);
//            cell57.setCellStyle(headerStyle);
//            cell58.setCellStyle(headerStyle);
//            cell59.setCellStyle(headerStyle);
//            cell60.setCellStyle(headerStyle);
            

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);
                cell58 = row.createCell(8);
                cell59 = row.createCell(9);
                cell60 = row.createCell(10);
                cell61 = row.createCell(11);                
                cell50.setCellValue(listaData.get(vi).A1698PAIS ); 
                cell51.setCellValue(listaData.get(vi).A1698BANK);
                cell52.setCellValue(listaData.get(vi).A1698FPRDA_00);
                cell53.setCellValue(listaData.get(vi).A1698FFILE_00);
                cell54.setCellValue(listaData.get(vi).A1698HFILE);
                cell55.setCellValue(listaData.get(vi).A1698SQNR);
                cell56.setCellValue(listaData.get(vi).A1698LINE);
                cell57.setCellValue(listaData.get(vi).A1698STREC_00);
                cell58.setCellValue(listaData.get(vi).A1698STCAR_00);
                cell59.setCellValue(listaData.get(vi).A1698STPRO_00);
                cell60.setCellValue(listaData.get(vi).A1698IDFIL);
                cell61.setCellValue(listaData.get(vi).A1698FREGI);
                
//                HashMap hm = (HashMap) listaData.get(vi);                               
//                cell50.setCellValue((String)hm.get("A1698PAIS"));
//                cell51.setCellValue((String)hm.get("A1698BANK"));
//                cell52.setCellValue((String)hm.get("A1698FPRDA_00"));
//                cell53.setCellValue((String)hm.get("A1698FFILE_00"));
//                cell53.setCellValue((String)hm.get("A1698HFILE"));
//                cell56.setCellValue((int)hm.get("A1698SQNR"));
//                cell56.setCellValue((int)hm.get("A1698LINE"));
//                cell57.setCellValue((String)hm.get("A1698STREC_00"));
//                cell58.setCellValue((String)hm.get("A1698STCAR_00"));
//                cell59.setCellValue((String)hm.get("A1698STPRO_00"));
//                cell60.setCellValue((String)hm.get("A1698IDFIL"));
//                cell61.setCellValue((String)hm.get("A1698FREGI"));
                
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
                
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
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
            
            String fileNameDownload = String.format(fileName, UUID.randomUUID().toString().toLowerCase());            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");            
            File file = File.createTempFile(fileNameDownload, ".xlsx");            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }   
    
    @RequestMapping(value = "/searchIdFile")
    public @ResponseBody
    String searchIdFile(ModelMap map, HttpServletRequest request) {
        filter2 = new PX037S08A1724Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        try {
            filter2.IN_IDFIL = request.getParameter("IN_IDFIL").trim();
            filter2.IN_FUENT = request.getParameter("IN_FUENT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX037S08A1724Filter> listaData = logic.loadPX037S08A1724(filter2);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    // Exportar EXCEL err FORMAT
    @RequestMapping(value = "/getXLSX_err_format")
    public @ResponseBody
    void getXLSX_err_format(HttpServletRequest request, HttpServletResponse response) {
        PX037S08A1724Filter filter = new PX037S08A1724Filter();
        try {
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileName = "PX073_"+Functions.getFechaActual()+"_BSP_Load_Control_Error_Format"+".xlsx";
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX037S08A1724Filter> listaData = logic.loadPX037S08A1724(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);
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
            
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56, cell57, cell58;
            
            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
                        
            cell50.setCellValue("ID File");
            cell51.setCellValue("Group");
            cell52.setCellValue("Transaction");
            cell53.setCellValue("Cia");
            cell54.setCellValue("Forma");            
            cell55.setCellValue("Serie");
            cell56.setCellValue("Code");
            cell57.setCellValue("Description");
            cell58.setCellValue("Data");

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            
            ++vj;
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);
                cell58 = row.createCell(8);
                              
                cell50.setCellValue(listaData.get(vi).A1724IDFIL ); 
                cell51.setCellValue(listaData.get(vi).A1724GRUPO);
                cell52.setCellValue(listaData.get(vi).A1724TRANS);
                cell53.setCellValue(listaData.get(vi).A1724CIA);
                cell54.setCellValue(listaData.get(vi).A1724FORMA);
                cell55.setCellValue(listaData.get(vi).A1724SERIE);
                cell56.setCellValue(listaData.get(vi).A1724CODER);
                cell57.setCellValue(listaData.get(vi).A1272DES);
                cell58.setCellValue(listaData.get(vi).A1724DATA);
                
                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
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
            
            String fileNameDownload = String.format(fileName, UUID.randomUUID().toString().toLowerCase());            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");            
            File file = File.createTempFile(fileNameDownload, ".xlsx");            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/loadASR")
    public @ResponseBody
    String loadASR(ModelMap map, HttpServletRequest request) {
        List<PX019S01A1536Filter> listaData;
        filter3 = new PX019S01A1536Filter();
        filter3.page.TOTROW = -1;
        filter3.page.START = 0;
        filter3.page.LIMIT = 0;
        try {
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            start = 2*start - start/2;
            filter3.page.PAGROW = 30;
            start = (start != 0 ? start : 0);
            filter3.page.PAGNUM = (start / filter3.page.PAGROW) + 1;
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX019S01A1536(filter3);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadError")
    public @ResponseBody
    String loadError(ModelMap map, HttpServletRequest request) {
        List<PX019S01A1697Filter> listaData;
        filter4 = new PX019S01A1697Filter();
        filter4.page.TOTROW = -1;
        filter4.page.START = 0;
        filter4.page.LIMIT = 0;
        try {
            filter4.IN_A1697CCUST = request.getParameter("IN_A1697CCUST").trim();
            filter4.IN_A1697SOURC = request.getParameter("IN_A1697SOURC").trim();
            filter4.IN_A1697PAIS = request.getParameter("IN_A1697PAIS").trim();
            filter4.IN_A1697BANK = request.getParameter("IN_A1697BANK").trim();
            filter4.IN_A1697FPRDA = request.getParameter("IN_A1697FPRDA").trim().toUpperCase();
            filter4.IN_A1697FFILE = request.getParameter("IN_A1697FFILE").trim();
            filter4.IN_A1697HFILE = request.getParameter("IN_A1697HFILE").trim();
            filter4.IN_A1697FREGI = request.getParameter("IN_A1697FREGI").trim().toUpperCase();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter4.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter4.page.PAGNUM = (start / filter4.page.PAGROW) + 1;
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX019S01A1697(filter4);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    // Exportar EXCEL err
    @RequestMapping(value = "/getXLSX_err")
    public @ResponseBody
    void getXLSX_err(HttpServletRequest request, HttpServletResponse response) {
        PX019S01A1697Filter filter = new PX019S01A1697Filter();
        try {
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileName = "PX073_"+Functions.getFechaActual()+"_BSP_Load_Control_Error"+".xlsx";
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX019S01A1697Filter> listaData = logic.loadPX019S01A1697(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);
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
            
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56, cell57;
            
            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
                        
            cell50.setCellValue("Country");
            cell51.setCellValue("City");
            cell52.setCellValue("Processing Date");
            cell53.setCellValue("Ending Date");
            cell54.setCellValue("Hour");            
            cell55.setCellValue("ID File");
            cell56.setCellValue("Error");
            cell57.setCellValue("System Date");

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            
            ++vj;
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);
                              
                cell50.setCellValue(listaData.get(vi).A1697PAIS ); 
                cell51.setCellValue(listaData.get(vi).A1697BANK);
                cell52.setCellValue(listaData.get(vi).A1697FPRDA);
                cell53.setCellValue(listaData.get(vi).A1697FFILE);
                cell54.setCellValue(listaData.get(vi).A1697HFILE);
                cell55.setCellValue(listaData.get(vi).A1697IDFIL);
                cell56.setCellValue(listaData.get(vi).A1697CDERR);
                cell57.setCellValue(listaData.get(vi).A1697FREGI);
                
                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
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
            
            String fileNameDownload = String.format(fileName, UUID.randomUUID().toString().toLowerCase());            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");            
            File file = File.createTempFile(fileNameDownload, ".xlsx");            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
    
    
    @RequestMapping(value = "/loadHOT")
    public @ResponseBody
    String loadHOT(ModelMap map, HttpServletRequest request) {
        List<PX019S01A1348Filter> listaData;
        filter5 = new PX019S01A1348Filter();
        filter5.page.TOTROW = -1;
        filter5.page.START = 0;
        filter5.page.LIMIT = 0;
        try {
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            start = 2*start - start/2;
            filter5.page.PAGROW = 30;
            start = (start != 0 ? start : 0);
            filter5.page.PAGNUM = (start / filter5.page.PAGROW) + 1;
            
            logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX019S01A1348(filter5);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/processFormatASRHOT")
    public @ResponseBody
    String processFormatASRHOT(ModelMap map, HttpServletRequest request) {
        PX074S02PRO9878Filter filter = new PX074S02PRO9878Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX074S02PRO9878(filter);
            
            map.put("success", true);
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/processLoadASRHOT")
    public @ResponseBody
    String processLoadASRHOT(ModelMap map, HttpServletRequest request) {
        PX074S01PPRO9824Filter filter = new PX074S01PPRO9824Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX074S01PPRO9824(filter);
            
            map.put("success", true);
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/processLoadBSPHOT")
    public @ResponseBody
    String processLoadBSPHOT(ModelMap map, HttpServletRequest request) {
        SQP03605Filter filter = new SQP03605Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            filter.VP_CCUST = request.getParameter("VP_CCUST");
            filter.dbException.SQLCODE = request.getParameter("VP_SQLCODE");
            filter.dbException.MESSAGE = request.getParameter("VP_MESSAGE");            
            filter = logic.loadSQP03605Filter(filter);            
            map.put("success", true);            
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);        
    }
    
    @RequestMapping(value = "/processFormatBSPHOT")
    public @ResponseBody
    String processFormatBSPHOT(ModelMap map, HttpServletRequest request) {
        SQP03606Filter filter = new SQP03606Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            filter.VP_CCUST = request.getParameter("VP_CCUST");
            filter.VP_NROID = request.getParameter("VP_NROID");
            filter.dbException.SQLCODE = request.getParameter("VP_SQLCODE");
            filter.dbException.MESSAGE = request.getParameter("VP_MESSAGE");            
            filter = logic.loadSQP03606Filter(filter);            
            map.put("success", true);            
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);        
    }
    
    @RequestMapping(value = "/processFormatARCHOT")
    public @ResponseBody
    String processFormatARCHOT(ModelMap map, HttpServletRequest request) {
        PX037S07PRO9876Filter filter = new PX037S07PRO9876Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX037S07PRO9876(filter);
            
            map.put("success", true);
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/processLoadARCHOT")
    public @ResponseBody
    String processLoadARCHOT(ModelMap map, HttpServletRequest request) {
        PX037S06PRO9822Filter filter = new PX037S06PRO9822Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            LoadControlLogic logic = new LoadControlLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX037S06PRO9822(filter);
            
            map.put("success", true);
            map.put("filter", filter);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
