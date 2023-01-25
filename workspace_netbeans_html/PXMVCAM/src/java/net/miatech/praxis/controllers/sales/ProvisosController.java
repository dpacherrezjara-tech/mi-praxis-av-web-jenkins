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
import net.miatech.beans.PX019S01A856Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.beans.PX019S01A856Filter;
import net.miatech.praxis.A128;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ProvisosLogic;
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
@RequestMapping("/Provisos")
public class ProvisosController extends BaseController {
    
    private ProvisosLogic logic;
    private PX019S01A856Filter filter;
    private A128 bn;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<PX019S01A856Filter> lstProvisosRep;
        filter = new PX019S01A856Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        try {
            filter.IN_A856LINAER = request.getParameter("IN_A856LINAER").trim();
            filter.IN_A856VIGDES = request.getParameter("IN_A856VIGDES").trim();
            filter.IN_A856TIPTAR = request.getParameter("IN_A856TIPTAR").trim();
            filter.IN_A856CLASE = request.getParameter("IN_A856CLASE").trim();
            filter.IN_A856TRADES = request.getParameter("IN_A856TRADES").trim();
            filter.A856TRAHAS = request.getParameter("A856TRAHAS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new ProvisosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstProvisosRep = logic.loadPX019S01A856(filter);
            map.put("success", true);
            map.put("total", lstProvisosRep.size() > 0 ? lstProvisosRep.get(0).page.TOTROW : 0);
            map.put("data", lstProvisosRep);
            
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
        filter = new PX019S01A856Filter();
        
        List<PX019S01A856Filter> listaData;
        
        String fileNameDownload = String.format("Provisos - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new ProvisosLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.IN_A856LINAER = request.getParameter("IN_A856LINAER").trim();
            filter.IN_A856VIGDES = request.getParameter("IN_A856VIGDES").trim();
            filter.IN_A856TIPTAR = request.getParameter("IN_A856TIPTAR").trim();
            filter.IN_A856CLASE = request.getParameter("IN_A856CLASE").trim();
            filter.IN_A856TRADES = request.getParameter("IN_A856TRADES").trim();
            filter.A856TRAHAS = request.getParameter("A856TRAHAS").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            listaData = logic.loadPX019S01A856(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Provisos");
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
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Airline");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Validity");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("C");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("T");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Sector");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Subtype Rate");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("ATBP");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Trip Departure");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Proviso %");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Prov.Amount");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Currency");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Codeshare");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Subparagraph");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("Discounts");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("U");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("From");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("To");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("U");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("From");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("To");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
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
//            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);

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
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);
                Cell cell68 = row.createCell(18);

                cell50.setCellValue(listaData.get(vi).NO);
                cell51.setCellValue(listaData.get(vi).A856LINAER);
                cell52.setCellValue(listaData.get(vi).A856VIGDES);
                cell53.setCellValue(listaData.get(vi).A856CLASE);
                cell54.setCellValue(listaData.get(vi).A856TIPTAR);
                cell55.setCellValue(listaData.get(vi).A856TRAUNI);
                cell56.setCellValue(listaData.get(vi).A856TRADES);
                cell57.setCellValue(listaData.get(vi).A856TRAHAS);
                cell58.setCellValue(listaData.get(vi).A856SUBTIP);
                cell59.setCellValue(listaData.get(vi).A856ATBPUN);
                cell60.setCellValue(listaData.get(vi).A856ATBPDE);
                cell61.setCellValue(listaData.get(vi).A856ATBPHA);
                cell62.setCellValue(listaData.get(vi).A856ORIGEN);
                cell63.setCellValue(listaData.get(vi).A856PORCEN);
                cell64.setCellValue(listaData.get(vi).A856IMPORT);
                cell65.setCellValue(listaData.get(vi).A856MONEDA);
                cell66.setCellValue(listaData.get(vi).A856CODSHA);
                cell67.setCellValue(listaData.get(vi).A856SUBPAR);
                cell68.setCellValue(listaData.get(vi).A856DESADI);

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
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);
                cell68.setCellStyle(bodyStyle);

//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(5, true);
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

        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
    
}
