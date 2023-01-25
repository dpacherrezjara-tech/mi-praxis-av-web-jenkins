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
import net.miatech.beans.PX132S01A1774Filter;
import net.miatech.beans.PX133S01A1777Filter;
import net.miatech.beans.PX167S01WRF070Filter;
import net.miatech.beans.WRF070Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.GSAIncentiveSummaryLogic;
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
@RequestMapping("/GSAIncentiveSummary")
public class GSAIncentiveSummaryController extends BaseController {

    private GSAIncentiveSummaryLogic logic;
    private PX133S01A1777Filter filter;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        List<PX133S01A1777Filter> listaData;
        filter = new PX133S01A1777Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            String temp = request.getParameter("IN_TFILTER").trim();
            filter.IN_TFILTER = temp.length()>0?Integer.parseInt(temp):0;
            filter.IN_GSA = request.getParameter("IN_GSA").trim();
            filter.IN_AAMM_F = request.getParameter("IN_AAMM_F").trim();
            filter.IN_AAMM_T = request.getParameter("IN_AAMM_T").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GSAIncentiveSummaryLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX133S01A1777(filter);
            
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
        List<PX133S01A1777Filter> listaData;
        filter = new PX133S01A1777Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("GSA Incentive Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            String temp = request.getParameter("IN_TFILTER").trim();
            filter.IN_TFILTER = temp.length()>0?Integer.parseInt(temp):0;
            filter.IN_GSA = request.getParameter("IN_GSA").trim();
            filter.IN_AAMM_F = request.getParameter("IN_AAMM_F").trim();
            filter.IN_AAMM_T = request.getParameter("IN_AAMM_T").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GSAIncentiveSummaryLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX133S01A1777(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("GSA Incentive Summary");
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
            CH1_01.setCellValue("Country");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Period");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Application");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Source");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Exchange Rate");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Equivalent");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 14));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(9, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Annual");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Monthly");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("CURR");
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            CH2_06.setCellValue("Sales Commission");
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            CH2_08.setCellValue("Sales Quote");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("CUR");
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            CH2_11.setCellValue("Sales Commission");
            Cell CH2_14 = row2.createCell(14);
            CH2_14.setCellValue("Sales Quote");

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));

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
            CH2_14.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(9, true);

            ++vj;
            
            Row row3 = sheet.createRow(vj);

            Cell CH3_00 = row3.createCell(0);
            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            Cell CH3_03 = row3.createCell(3);
            Cell CH3_04 = row3.createCell(4);
            Cell CH3_05 = row3.createCell(5);
            Cell CH3_06 = row3.createCell(6);
            CH3_06.setCellValue("BSP");
            Cell CH3_07 = row3.createCell(7);
            CH3_07.setCellValue("ASR");
            Cell CH3_08 = row3.createCell(8);
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            CH3_11.setCellValue("BSP");
            Cell CH3_12 = row3.createCell(12);
            CH3_12.setCellValue("ASR");
            Cell CH3_13 = row3.createCell(13);
            CH3_13.setCellValue("Interline");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));

            CH3_00.setCellStyle(headerStyle);
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

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(9, true);

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

                cell50.setCellValue(listaData.get(vi).A1777GSA);
                cell51.setCellValue(listaData.get(vi).A1777PAIS);
                cell52.setCellValue(listaData.get(vi).A1777AAMM);
                cell53.setCellValue(listaData.get(vi).A1777APLM);
                cell54.setCellValue(listaData.get(vi).A1777APLM);
                cell55.setCellValue(listaData.get(vi).A1777MORIG);
                cell56.setCellValue(listaData.get(vi).A1777VTBSP);
                cell57.setCellValue(listaData.get(vi).A1777VTGSA);
                cell58.setCellValue(listaData.get(vi).A1777CUOTA);
                cell59.setCellValue(listaData.get(vi).A1777TCAMB);
                cell60.setCellValue(listaData.get(vi).A1777MCAMB);
                cell61.setCellValue(listaData.get(vi).A1777BSPMC);
                cell62.setCellValue(listaData.get(vi).A1777GSAMC);
                cell63.setCellValue(listaData.get(vi).A1777INTMC);
                cell64.setCellValue(listaData.get(vi).A1777CUOMC);

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

//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
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
