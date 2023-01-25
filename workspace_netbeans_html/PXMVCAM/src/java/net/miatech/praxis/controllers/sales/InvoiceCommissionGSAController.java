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
import net.miatech.beans.PX144S01A1775Filter;
import net.miatech.beans.PX144S01A1826Filter;
import net.miatech.beans.PX144S02A1826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.InvoiceCommissionGSALogic;
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
@RequestMapping("/InvoiceCommissionGSA")
public class InvoiceCommissionGSAController extends BaseController {

    private InvoiceCommissionGSALogic logic;
    private PX144S01A1826Filter filter;
    private PX144S02A1826Filter filter2;
    private PX144S01A1775Filter filter3;
    private MasterDAO masterDAO;
    
    /* INVOICE , COMM. GSA
     */
    @RequestMapping(value = "/loadInvoiceCommGSA")
    public @ResponseBody
    String loadInvoiceCommGSA(ModelMap map, HttpServletRequest request) {
        List<PX144S01A1826Filter> listaData;
        filter = new PX144S01A1826Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_A1826CCUST = request.getParameter("VP_A1826CCUST").trim();
            filter.VP_A1826GSA = request.getParameter("VP_A1826GSA").trim();
            filter.VP_A1826LOTE = request.getParameter("VP_A1826LOTE").trim();
            filter.VP_A1826FFACT = request.getParameter("VP_A1826FFACT").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new InvoiceCommissionGSALogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX144S01A1826(filter);
            
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
    
    @RequestMapping(value = "/setPX144S02A1826")
    public @ResponseBody
    String setPX144S02A1826(ModelMap map, HttpServletRequest request) {
        filter2 = new PX144S02A1826Filter();
        PX144S02A1826Filter objRtn;    
        try {
            filter2.VP_ACTION = request.getParameter("VP_ACTION").trim();
            filter2.VP_A1826CCUST = request.getParameter("VP_A1826CCUST").trim();
            filter2.VP_A1826LOTE = request.getParameter("VP_A1826LOTE").trim();
            filter2.VP_A1826GSA = request.getParameter("VP_A1826GSA").trim();
            filter2.VP_A1826FPROC = request.getParameter("VP_A1826FPROC").trim();
            filter2.VP_A1826MONED = request.getParameter("VP_A1826MONED").trim();
            filter2.VP_A1826TCOM = request.getParameter("VP_A1826TCOM").trim().length()>0?Double.parseDouble(request.getParameter("VP_A1826TCOM").trim()):filter2.VP_A1826TCOM;
            filter2.VP_A1826NFACT = request.getParameter("VP_A1826NFACT").trim();
            filter2.VP_A1826FFACT = request.getParameter("VP_A1826FFACT").trim();
            filter2.VP_A1826STATU = request.getParameter("VP_A1826STATU").trim();
            filter2.VP_A1826SEQ = request.getParameter("VP_A1826SEQ").trim();
            filter2.VP_A1826TFAC = request.getParameter("VP_A1826TFAC").trim();
            filter2.VP_A1826TPER = request.getParameter("VP_A1826TPER").trim();
            
            logic = new InvoiceCommissionGSALogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setPX144S02A1826(filter2);         
            
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
    
    @RequestMapping(value = "/getTotalPreFactGSA")
    public @ResponseBody
    String getTotalPreFactGSA(ModelMap map, HttpServletRequest request) {
        List<PX144S01A1826Filter> listaData;
        filter3 = new PX144S01A1775Filter();
        try {
            filter3.VP_CCUST = request.getParameter("VP_CCUST");
            filter3.VP_GSA = request.getParameter("VP_GSA");
            filter3.VP_LOTE = request.getParameter("VP_LOTE");
            filter3.VP_FPROC_LOTE = request.getParameter("VP_FPROC_LOTE");
            filter3.VP_TYPE_COMM = request.getParameter("VP_TYPE_COMM");
            
            logic = new InvoiceCommissionGSALogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List lst_TotalPreFactGSA = logic.loadPX144S01A1775(filter3);
            
            map.put("success", true);
            map.put("lst_TotalPreFactGSA", lst_TotalPreFactGSA);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getPX112S03A1757")
    public @ResponseBody
    String getPX112S03A1757(ModelMap map, HttpServletRequest request) {
        String VP_OPTION, VP_PARAM;
        try {
            VP_OPTION = request.getParameter("VP_OPTION");
            VP_PARAM = request.getParameter("VP_PARAM");
            
            logic = new InvoiceCommissionGSALogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String lstDataVar = logic.get_PX112S03A1757(VP_OPTION, VP_PARAM );
            
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<PX144S01A1826Filter> listaData;
        filter = new PX144S01A1826Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Invoice Commission GSA - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_A1826CCUST = request.getParameter("VP_A1826CCUST").trim();
            filter.VP_A1826GSA = request.getParameter("VP_A1826GSA").trim();
            filter.VP_A1826LOTE = request.getParameter("VP_A1826LOTE").trim();
            filter.VP_A1826FFACT = request.getParameter("VP_A1826FFACT").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new InvoiceCommissionGSALogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX144S01A1826(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Invoice Commission GSA");
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
            CH1_00.setCellValue("GSA");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("GSA NAME");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Invoice Number");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Seq");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Invoice Date");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Invoice Type");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Periodicity");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Currency");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Commission Give");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Received Date");

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
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);

                cell50.setCellValue(listaData.get(vi).A1826GSA);
                cell51.setCellValue(listaData.get(vi).A1839RSOC);
                cell52.setCellValue(listaData.get(vi).A1826NFACT);
                cell53.setCellValue(listaData.get(vi).A1826SEQ);
                cell54.setCellValue(listaData.get(vi).A1826FFACT);
                cell55.setCellValue(listaData.get(vi).A1826TFAC);
                cell56.setCellValue(listaData.get(vi).A1826TPER);
                cell57.setCellValue(listaData.get(vi).A1826MONED);
                cell58.setCellValue(listaData.get(vi).A1826TCOM);
                cell59.setCellValue(listaData.get(vi).A1826FRECE);

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
