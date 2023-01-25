package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.GranPlanPendingLogic;
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
@RequestMapping("/GranPlanPending")
public class GranPlanPendingController extends BaseController {

    private GranPlanPendingLogic logic;
    private PX125S01A1802Filter filter;
    private SQP00112Filter filter2;
    private SQP00169Filter filter3;
    private SQP00168Filter filter4;
    private MasterDAO masterDAO;
    
    /* Comm. Gran Plan:: PENDING (Browse)
     */
    @RequestMapping(value = "/load_Comm_Pending")
    public @ResponseBody
    String load_Comm_Pending(ModelMap map, HttpServletRequest request) {
        List<PX125S01A1802Filter> listaData;
        filter = new PX125S01A1802Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            String temp = request.getParameter("VP_OPCION").trim();
            filter.VP_OPCION = temp.length()>0?Integer.parseInt(temp):0;
            filter.VP_A1802CCUST = request.getParameter("VP_A1802CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1802IATA = request.getParameter("VP_A1802IATA").trim();
            filter.VP_A1802LOTEI = request.getParameter("VP_A1802LOTEI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX125S01A1802(filter);
            
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
    
    @RequestMapping(value = "/setSQP00112")
    public @ResponseBody
    String setSQP00112(ModelMap map, HttpServletRequest request) {
        filter2 = new SQP00112Filter();    
        SQP00112Filter objRtn;      
        try {
            filter2.VP_ACTION = request.getParameter("VP_ACTION").trim();
            filter2.A1789CCUST = request.getParameter("A1789CCUST").trim();
            filter2.A1789CIA = request.getParameter("A1789CIA").trim();
            filter2.A1789FORMA = request.getParameter("A1789FORMA").trim();
            filter2.A1789SERIE = request.getParameter("A1789SERIE").trim();
            filter2.A1789IATA = request.getParameter("A1789IATA").trim();
            filter2.A1789PNR = request.getParameter("A1789PNR").trim();
            filter2.VP_TICKET_NEW = request.getParameter("VP_TICKET_NEW").trim();
            filter2.VP_A1789IATA_NEW = request.getParameter("VP_A1789IATA_NEW").trim();
            String temp = request.getParameter("VP_A1789TOTAL_NEW").trim();
            filter2.VP_A1789TOTAL_NEW = temp.length()>0?Double.parseDouble(temp):0;
            filter2.A1789NGPS = request.getParameter("A1789NGPS").trim();
            filter2.A1789TFORM = request.getParameter("A1789TFORM").trim();
            filter2.A1789FECVT = request.getParameter("A1789FECVT").trim();
            filter2.A1789MDA = request.getParameter("A1789MDA").trim();
            temp = request.getParameter("A1789STOTA").trim();
            filter2.A1789STOTA = temp.length()>0?Double.parseDouble(temp):0;
            temp = request.getParameter("A1789TOTAL").trim();
            filter2.A1789TOTAL = temp.length()>0?Double.parseDouble(temp):0;
            filter2.A1789NPAX = request.getParameter("A1789NPAX").trim();
            filter2.A1789SRES = request.getParameter("A1789SRES").trim();
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setSQP00112(filter2);         
            
            map.put("success", true);
            map.put("MESSAGE", objRtn.dbException.MESSAGE);
            map.put("SQLCODE", objRtn.dbException.SQLCODE);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/get_ObtenerIATA")
    public @ResponseBody
    String get_ObtenerIATA(ModelMap map, HttpServletRequest request) {
        String VP_OPTION, VP_PARAM;
        try {
            VP_OPTION = request.getParameter("VP_OPTION").trim();
            VP_PARAM = request.getParameter("VP_PARAM").trim();
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String lstDataVar = logic.get_ObtenerIATA(VP_OPTION, VP_PARAM);            
                    
            map.put("success", true);
            map.put("lstDataVar", lstDataVar);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/get_SQP00169")
    public @ResponseBody
    String get_SQP00169(ModelMap map, HttpServletRequest request) {
        filter3 = new SQP00169Filter();  
        try {
            filter3.VP_CIA = request.getParameter("VP_CIA").trim();
            filter3.VP_FORMA = request.getParameter("VP_FORMA").trim();
            filter3.VP_SERIE = request.getParameter("VP_SERIE").trim();
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List lst_tkt = logic.get_SQP00169(filter3);
            
            map.put("success", true);
            map.put("lst_tkt", lst_tkt);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/set_SQP00168")
    public @ResponseBody
    String set_SQP00168(ModelMap map, HttpServletRequest request) {
        filter4 = new SQP00168Filter();
        SQP00168Filter objRtn;      
        try {
            filter4.VP_ACTION = request.getParameter("VP_ACTION");
            filter4.VP_CIA = request.getParameter("VP_CIA");
            filter4.VP_FORMA = request.getParameter("VP_FORMA");
            filter4.VP_SERIE = request.getParameter("VP_SERIE");
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.set_SQP00168(filter4);
            
            map.put("success", true);
            map.put("MESSAGE", objRtn.dbException.MESSAGE);
            map.put("SQLCODE", objRtn.dbException.SQLCODE);
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
        List<PX125S01A1802Filter> listaData;
        filter = new PX125S01A1802Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Great Plan Pending - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            String temp = request.getParameter("VP_OPCION").trim();
            filter.VP_OPCION = temp.length()>0?Integer.parseInt(temp):0;
            filter.VP_A1802CCUST = request.getParameter("VP_A1802CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1802IATA = request.getParameter("VP_A1802IATA").trim();
            filter.VP_A1802LOTEI = request.getParameter("VP_A1802LOTEI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanPendingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX125S01A1802(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Great Plan Pending");
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
            CH1_00.setCellValue("Hot Data");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Gran Plan AM");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Lote");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

            CH1_00.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Ticked Number");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("IATA");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("PNR");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Group");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Curr");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Total Ticked");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Issue Date");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("IATA");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("PNR");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Curr");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Total Doc.");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Issue Date");
            Cell CH2_12 = row2.createCell(12);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
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

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
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

                cell50.setCellValue(listaData.get(vi).VP_TICKET);
                cell51.setCellValue(listaData.get(vi).A1802IATA);
                cell52.setCellValue(listaData.get(vi).A1802PNR);
                cell53.setCellValue(listaData.get(vi).A1802GRUPO);
                cell54.setCellValue(listaData.get(vi).A1802MDA);
                cell55.setCellValue(listaData.get(vi).A1802FARE);
                cell56.setCellValue(listaData.get(vi).A1802FECEM);
                cell57.setCellValue(listaData.get(vi).A1802IATAG);
                cell58.setCellValue(listaData.get(vi).A1802PNRGP);
                cell59.setCellValue(listaData.get(vi).A1802MDAGP);
                cell60.setCellValue(listaData.get(vi).A1802TOTGP);
                cell61.setCellValue(listaData.get(vi).A1802FEMGP);
                cell62.setCellValue(listaData.get(vi).A1802LOTEI);
                cell63.setCellValue(listaData.get(vi).A1802STAT);

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

                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
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
