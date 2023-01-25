package net.miatech.praxis.controllers.interline;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.interline.SPAReportLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.A005;
import net.miatech.praxis.interline.A1402;
import net.miatech.praxis.interline.WRF014;
import net.miatech.praxis.interline.filter.A1155Filter;
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

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/SPAReport")
public class SPAReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SPAReportLogic logic;
    private MasterDAO masterDAO;
    private A1155Filter filter;
    private WRF014 filter2;

    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obteinDataCombo(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A005> lstAirlines;
        logic = new SPAReportLogic();
        masterDAO = new MasterDAO();
        try {
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            lstAirlines = masterDAO.loadAirlines(true);
            map.put("lstAirlines", lstAirlines);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(SPAReportController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SPAReportController : search-------------");
        
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
            filter.IN_VIGENTE = request.getParameter("IN_VIGENTE");
            filter.IN_CIA1 = request.getParameter("IN_CIA1");
            filter.IN_CIA2 = request.getParameter("IN_CIA2");
            filter.IN_FFIN = request.getParameter("IN_FFIN");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S01A1155(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchPrincipal")
    public @ResponseBody
    String searchPrincipal(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- SPAReportController : searchPrincipal-------------");
        
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
            filter.IN_VIGENTE = request.getParameter("IN_VIGENTE");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S01A1155_2(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- SPAReportController : searchDetail-------------");
        
        List<A1402> listaData;
        filter = new A1155Filter();
        try {
            filter.A1155CODAC = request.getParameter("A1155CODAC").trim();
            filter.A1155INDAC = request.getParameter("A1155INDAC").trim();
            filter.A1155VRSAC = request.getParameter("A1155VRSAC").trim();

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S02A1402(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchWRF014")
    public @ResponseBody
    String searchWRF014(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- SPAReportController : searchWRF014-------------");
        
        List<WRF014> listaData;
        filter = new A1155Filter();
        try {
            filter.A1155CIAFM = request.getParameter("A1155CIAFM").trim();
            filter.A1155CODAC = request.getParameter("A1155CODAC").trim();
            filter.A1155INDAC = request.getParameter("A1155INDAC").trim();
            filter.A1155VRSAC = request.getParameter("A1155VRSAC").trim();

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S03WRF014(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchNamesFiles")
    public @ResponseBody
    String searchNamesFiles(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SPAReportController : searchNamesFiles-------------");
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        Gson gson = new Gson();
        try {

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1155Filter.class);

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadFileNames(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "download")
    public @ResponseBody
    String download(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SPAReportController : download-------------");

        map.put("success", true);

        byte[] bytes = null;
        String ruta = "";

        try {

            ruta = request.getParameter("ruta") == null ? "" : request.getParameter("ruta").toString().trim();

            Path dir = Paths.get(ruta);

            if (!Files.exists(dir)) {
                map.put("mensaje", "The file cannot be found on the server.");
            } else {
                //strArchivo.substring(strArchivo.length() - 3, strArchivo.length()).equals("txt")

                String strArchivo = ruta;
                //1343883844759
                File archivo = new File(strArchivo);
                System.out.println("ruta ---> " + ruta);
                FileInputStream fs = new FileInputStream(archivo);

                bytes = new byte[(int) archivo.length()];
                fs.read(bytes);
                fs.close();

                map.put("bytes", bytes);
                map.put("mensaje", "OK");

            }
        } catch (Exception e) {
            map.put("mensaje", "An error ocurred when trying to  upload the file.");
            e.printStackTrace();
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SaveAddendum")
    public @ResponseBody
    String SaveAddendum(ModelMap map, HttpServletRequest request) {
        String msj = "";
        filter2 = new WRF014();
        try {
            filter2.AIRLINE = request.getParameter("AIRLINE");
            filter2.CODAC = request.getParameter("CODAC");
            filter2.INDAC = request.getParameter("INDAC");
            filter2.VRSAC = request.getParameter("VRSAC");
            filter2.SEQAC = request.getParameter("SEQAC");
            filter2.REFE = request.getParameter("REFE");
            filter2.FBEGIN = request.getParameter("FBEGIN");
            filter2.FENDIN = request.getParameter("FENDIN");
            filter2.FSEND = request.getParameter("FSEND");
            filter2.FRECE = request.getParameter("FRECE");
            filter2.FENTR = request.getParameter("FENTR");

            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.InsertAddendum(filter2);

            map.put("success", true);
            map.put("msj", msj);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        String fileNameDownload = String.format("SPA Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
            filter.IN_VIGENTE = request.getParameter("IN_VIGENTE");
            filter.IN_CIA1 = request.getParameter("IN_CIA1");
            filter.IN_CIA2 = request.getParameter("IN_CIA2");
            filter.IN_FFIN = request.getParameter("IN_FFIN");

//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S01A1155(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SPA Report");
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
//
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);

            CH1_0.setCellValue("Air");
            CH1_1.setCellValue("Bill");
            CH1_2.setCellValue("Agree.");
            CH1_3.setCellValue("Ind");
            CH1_4.setCellValue("Vers.");
            CH1_5.setCellValue("Start Date");
            CH1_6.setCellValue("End Date");
            CH1_7.setCellValue("Status");

            CH1_8.setCellValue("SRP");
            CH1_9.setCellValue("Base");
            CH1_10.setCellValue("Fixed");
            CH1_11.setCellValue("Loaded By");
            CH1_12.setCellValue("Recep. Date");
            CH1_13.setCellValue("Hold.");
            CH1_14.setCellValue("Certification");
            CH1_15.setCellValue("Updated");

            CH1_16.setCellValue("Remark");
            CH1_17.setCellValue("Adendum");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));

            ++vj;
            //============================================
            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            CH2_1.setCellValue("Air.");
            CH2_9.setCellValue("Amt");
            CH2_10.setCellValue("Amt");
            CH2_14.setCellValue("Date");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).A1155CIAFM);
                rcell1.setCellValue(listaData.get(vi).A1155CIA1);
                rcell2.setCellValue(listaData.get(vi).A1155CODAC);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).A1155VRSAC);
                rcell5.setCellValue(listaData.get(vi).strFormatDate);
                rcell6.setCellValue(listaData.get(vi).strFormatDate1);
                rcell7.setCellValue(listaData.get(vi).strDescripcion1);
                rcell8.setCellValue(listaData.get(vi).A1155SRP);
                rcell9.setCellValue(listaData.get(vi).A1155PRO);
                rcell10.setCellValue(listaData.get(vi).A1155TRAMO);
                rcell11.setCellValue(listaData.get(vi).A1155UINGR);
                rcell12.setCellValue(listaData.get(vi).strFormatDate2);
                rcell13.setCellValue(listaData.get(vi).A1155FNUM);
                rcell14.setCellValue(listaData.get(vi).strFormatDate3);
                rcell15.setCellValue(listaData.get(vi).strFormatDate4);
                rcell16.setCellValue(listaData.get(vi).A1155ESTAD);
                rcell17.setCellValue(listaData.get(vi).A1155IDSCO);

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
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Billing");
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            CH1_07.setCellValue("Invoice");
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            CH1_09.setCellValue("Set");
//            Cell CH1_10 = row.createCell(10);
//            CH1_10.setCellValue("Cpn. St.");
//            Cell CH1_11 = row.createCell(11);
//            CH1_11.setCellValue("Rej. St.");
//            Cell CH1_12 = row.createCell(12);
//            CH1_12.setCellValue("BM. St.");
//            Cell CH1_13 = row.createCell(13);
//            CH1_13.setCellValue("CM. St.");
//            Cell CH1_14 = row.createCell(14);
//            CH1_14.setCellValue("Currency");
//            Cell CH1_15 = row.createCell(15);
//            CH1_15.setCellValue("Total");
//            Cell CH1_16 = row.createCell(16);
//            CH1_16.setCellValue("Total");
//            Cell CH1_17 = row.createCell(17);
//            CH1_17.setCellValue("Total");
//            Cell CH1_18 = row.createCell(18);
//            CH1_18.setCellValue("Total");
//            Cell CH1_19 = row.createCell(19);
//            CH1_19.setCellValue("Total");
//            Cell CH1_20 = row.createCell(20);
//            CH1_20.setCellValue("Total");
//            Cell CH1_21 = row.createCell(21);
//            CH1_21.setCellValue("Total");
//            Cell CH1_22 = row.createCell(22);
//            CH1_22.setCellValue("Total");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            CH2_00.setCellValue("Date");
//            Cell CH2_01 = row2.createCell(1);
//            CH2_01.setCellValue("Period");
//            Cell CH2_02 = row2.createCell(2);
//            CH2_02.setCellValue("Airline");
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Code");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Invoice Number");
//            Cell CH2_08 = row2.createCell(8);
//            CH2_08.setCellValue("Date");
//            Cell CH2_09 = row2.createCell(9);
//            CH2_09.setCellValue("Meth.");
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            CH2_15.setCellValue("GROSS");
//            Cell CH2_16 = row2.createCell(16);
//            CH2_16.setCellValue("ISC");
//            Cell CH2_17 = row2.createCell(17);
//            CH2_17.setCellValue("TAX");
//            Cell CH2_18 = row2.createCell(18);
//            CH2_18.setCellValue("VAT");
//            Cell CH2_19 = row2.createCell(19);
//            CH2_19.setCellValue("FEE");
//            Cell CH2_20 = row2.createCell(20);
//            CH2_20.setCellValue("UATP");
//            Cell CH2_21 = row2.createCell(21);
//            CH2_21.setCellValue("Other Commission");
//            Cell CH2_22 = row2.createCell(22);
//            CH2_22.setCellValue("NET");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//            CH2_17.setCellStyle(headerStyle);
//            CH2_18.setCellStyle(headerStyle);
//            CH2_19.setCellStyle(headerStyle);
//            CH2_20.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row3 = sheet.createRow(vj);
//
//            Cell CH3_00 = row3.createCell(0);
//            Cell CH3_01 = row3.createCell(1);
//            Cell CH3_02 = row3.createCell(2);
//            CH3_02.setCellValue("Code");
//            Cell CH3_03 = row3.createCell(3);
//            CH3_03.setCellValue("Code");
//            Cell CH3_04 = row3.createCell(4);
//            CH3_04.setCellValue("Name");
//            Cell CH3_05 = row3.createCell(5);
//            CH3_05.setCellValue("Name");
//            Cell CH3_06 = row3.createCell(6);
//            Cell CH3_07 = row3.createCell(7);
//            Cell CH3_08 = row3.createCell(8);
//            Cell CH3_09 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//            Cell CH3_17 = row3.createCell(17);
//            Cell CH3_18 = row3.createCell(18);
//            Cell CH3_19 = row3.createCell(19);
//            Cell CH3_20 = row3.createCell(20);
//            Cell CH3_21 = row3.createCell(21);
//            Cell CH3_22 = row3.createCell(22);
//
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
//
//            CH3_00.setCellStyle(headerStyle);
//            CH3_01.setCellStyle(headerStyle);
//            CH3_02.setCellStyle(headerStyle);
//            CH3_03.setCellStyle(headerStyle);
//            CH3_04.setCellStyle(headerStyle);
//            CH3_05.setCellStyle(headerStyle);
//            CH3_06.setCellStyle(headerStyle);
//            CH3_07.setCellStyle(headerStyle);
//            CH3_08.setCellStyle(headerStyle);
//            CH3_09.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//            CH3_17.setCellStyle(headerStyle);
//            CH3_18.setCellStyle(headerStyle);
//            CH3_19.setCellStyle(headerStyle);
//            CH3_20.setCellStyle(headerStyle);
//            CH3_21.setCellStyle(headerStyle);
//            CH3_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//                Cell cell58 = row.createCell(8);
//                Cell cell59 = row.createCell(9);
//                Cell cell60 = row.createCell(10);
//                Cell cell61 = row.createCell(11);
//                Cell cell62 = row.createCell(12);
//                Cell cell63 = row.createCell(13);
//                Cell cell64 = row.createCell(14);
//                Cell cell65 = row.createCell(15);
//                Cell cell66 = row.createCell(16);
//                Cell cell67 = row.createCell(17);
//                Cell cell68 = row.createCell(18);
//                Cell cell69 = row.createCell(19);
//                Cell cell70 = row.createCell(20);
//                Cell cell71 = row.createCell(21);
//                Cell cell72 = row.createCell(22);
//
//                cell50.setCellValue(listaData.get(vi).strFormatDate);
//                cell51.setCellValue(listaData.get(vi).PERNUM);
//                cell52.setCellValue(listaData.get(vi).BAIR);
//                cell53.setCellValue(listaData.get(vi).BDAIR);
//                cell54.setCellValue(listaData.get(vi).DES_BAIR);
//                cell55.setCellValue(listaData.get(vi).DES_BDAIR);
//                cell56.setCellValue(listaData.get(vi).BCODE);
//                cell57.setCellValue(listaData.get(vi).BNUMBER);
//                cell58.setCellValue(listaData.get(vi).strFormatDate2);
//                cell59.setCellValue(listaData.get(vi).SETMETH);
//                cell60.setCellValue(listaData.get(vi).STPM);
//                cell61.setCellValue(listaData.get(vi).STRM);
//                cell62.setCellValue(listaData.get(vi).STBM);
//                cell63.setCellValue(listaData.get(vi).STCM);
//                cell64.setCellValue(listaData.get(vi).BCURREN);
//                cell65.setCellValue(listaData.get(vi).TGROSS);
//                cell66.setCellValue(listaData.get(vi).TISC);
//                cell67.setCellValue(listaData.get(vi).TTAX);
//                cell68.setCellValue(listaData.get(vi).TVAT);
//                cell69.setCellValue(listaData.get(vi).HFEEAM);
//                cell70.setCellValue(listaData.get(vi).TUATP);
//                cell71.setCellValue(listaData.get(vi).TOHCOM);
//                cell72.setCellValue(listaData.get(vi).TNET);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//                cell58.setCellStyle(bodyStyle);
//                cell59.setCellStyle(bodyStyle);
//                cell60.setCellStyle(bodyStyle);
//                cell61.setCellStyle(bodyStyle);
//                cell62.setCellStyle(bodyStyle);
//                cell63.setCellStyle(bodyStyle);
//                cell64.setCellStyle(bodyStyle);
//                cell65.setCellStyle(bodyStyle);
//                cell66.setCellStyle(bodyStyle);
//                cell67.setCellStyle(bodyStyle);
//                cell68.setCellStyle(bodyStyle);
//                cell69.setCellStyle(bodyStyle);
//                cell70.setCellStyle(bodyStyle);
//                cell71.setCellStyle(bodyStyle);
//                cell72.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
//                sheet.autoSizeColumn(14, true);
//                sheet.autoSizeColumn(15, true);
//                sheet.autoSizeColumn(16, true);
//                sheet.autoSizeColumn(17, true);
//                sheet.autoSizeColumn(18, true);
//                sheet.autoSizeColumn(19, true);
//                sheet.autoSizeColumn(20, true);
//                sheet.autoSizeColumn(21, true);
//                sheet.autoSizeColumn(22, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
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
    
     @RequestMapping(value = "getXLSXPrincipal")
    public @ResponseBody
    void getXLSXPrincipal(HttpServletRequest request, HttpServletResponse response) {
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        String fileNameDownload = String.format("SPA Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
            filter.IN_VIGENTE = request.getParameter("IN_VIGENTE");
            filter.IN_CIA1 = request.getParameter("IN_CIA1");
            filter.IN_CIA2 = request.getParameter("IN_CIA2");
            filter.IN_FFIN = request.getParameter("IN_FFIN");

//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new SPAReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX154S01A1155_2(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SPA Report");
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
//
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);


            CH1_0.setCellValue("Airline");
            CH1_1.setCellValue("Agreement");
            CH1_2.setCellValue("Ind.");
            CH1_3.setCellValue("End Date");
            CH1_4.setCellValue("Status");
            CH1_5.setCellValue("Annexes");



            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

 

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));


            ++vj;
            //============================================
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);

                rcell0.setCellValue(listaData.get(vi).A1155CIA1);
                rcell1.setCellValue(listaData.get(vi).AGREEMENT);
                rcell2.setCellValue(listaData.get(vi).strDescripcion);
                rcell3.setCellValue(listaData.get(vi).strFormatDate1);
                rcell4.setCellValue(listaData.get(vi).strDescripcion1);
                rcell5.setCellValue(listaData.get(vi).A1155ANEXO);


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


//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Billing");
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            CH1_07.setCellValue("Invoice");
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            CH1_09.setCellValue("Set");
//            Cell CH1_10 = row.createCell(10);
//            CH1_10.setCellValue("Cpn. St.");
//            Cell CH1_11 = row.createCell(11);
//            CH1_11.setCellValue("Rej. St.");
//            Cell CH1_12 = row.createCell(12);
//            CH1_12.setCellValue("BM. St.");
//            Cell CH1_13 = row.createCell(13);
//            CH1_13.setCellValue("CM. St.");
//            Cell CH1_14 = row.createCell(14);
//            CH1_14.setCellValue("Currency");
//            Cell CH1_15 = row.createCell(15);
//            CH1_15.setCellValue("Total");
//            Cell CH1_16 = row.createCell(16);
//            CH1_16.setCellValue("Total");
//            Cell CH1_17 = row.createCell(17);
//            CH1_17.setCellValue("Total");
//            Cell CH1_18 = row.createCell(18);
//            CH1_18.setCellValue("Total");
//            Cell CH1_19 = row.createCell(19);
//            CH1_19.setCellValue("Total");
//            Cell CH1_20 = row.createCell(20);
//            CH1_20.setCellValue("Total");
//            Cell CH1_21 = row.createCell(21);
//            CH1_21.setCellValue("Total");
//            Cell CH1_22 = row.createCell(22);
//            CH1_22.setCellValue("Total");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            CH2_00.setCellValue("Date");
//            Cell CH2_01 = row2.createCell(1);
//            CH2_01.setCellValue("Period");
//            Cell CH2_02 = row2.createCell(2);
//            CH2_02.setCellValue("Airline");
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Code");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Invoice Number");
//            Cell CH2_08 = row2.createCell(8);
//            CH2_08.setCellValue("Date");
//            Cell CH2_09 = row2.createCell(9);
//            CH2_09.setCellValue("Meth.");
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            CH2_15.setCellValue("GROSS");
//            Cell CH2_16 = row2.createCell(16);
//            CH2_16.setCellValue("ISC");
//            Cell CH2_17 = row2.createCell(17);
//            CH2_17.setCellValue("TAX");
//            Cell CH2_18 = row2.createCell(18);
//            CH2_18.setCellValue("VAT");
//            Cell CH2_19 = row2.createCell(19);
//            CH2_19.setCellValue("FEE");
//            Cell CH2_20 = row2.createCell(20);
//            CH2_20.setCellValue("UATP");
//            Cell CH2_21 = row2.createCell(21);
//            CH2_21.setCellValue("Other Commission");
//            Cell CH2_22 = row2.createCell(22);
//            CH2_22.setCellValue("NET");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//            CH2_17.setCellStyle(headerStyle);
//            CH2_18.setCellStyle(headerStyle);
//            CH2_19.setCellStyle(headerStyle);
//            CH2_20.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row3 = sheet.createRow(vj);
//
//            Cell CH3_00 = row3.createCell(0);
//            Cell CH3_01 = row3.createCell(1);
//            Cell CH3_02 = row3.createCell(2);
//            CH3_02.setCellValue("Code");
//            Cell CH3_03 = row3.createCell(3);
//            CH3_03.setCellValue("Code");
//            Cell CH3_04 = row3.createCell(4);
//            CH3_04.setCellValue("Name");
//            Cell CH3_05 = row3.createCell(5);
//            CH3_05.setCellValue("Name");
//            Cell CH3_06 = row3.createCell(6);
//            Cell CH3_07 = row3.createCell(7);
//            Cell CH3_08 = row3.createCell(8);
//            Cell CH3_09 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//            Cell CH3_17 = row3.createCell(17);
//            Cell CH3_18 = row3.createCell(18);
//            Cell CH3_19 = row3.createCell(19);
//            Cell CH3_20 = row3.createCell(20);
//            Cell CH3_21 = row3.createCell(21);
//            Cell CH3_22 = row3.createCell(22);
//
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
//
//            CH3_00.setCellStyle(headerStyle);
//            CH3_01.setCellStyle(headerStyle);
//            CH3_02.setCellStyle(headerStyle);
//            CH3_03.setCellStyle(headerStyle);
//            CH3_04.setCellStyle(headerStyle);
//            CH3_05.setCellStyle(headerStyle);
//            CH3_06.setCellStyle(headerStyle);
//            CH3_07.setCellStyle(headerStyle);
//            CH3_08.setCellStyle(headerStyle);
//            CH3_09.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//            CH3_17.setCellStyle(headerStyle);
//            CH3_18.setCellStyle(headerStyle);
//            CH3_19.setCellStyle(headerStyle);
//            CH3_20.setCellStyle(headerStyle);
//            CH3_21.setCellStyle(headerStyle);
//            CH3_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//                Cell cell58 = row.createCell(8);
//                Cell cell59 = row.createCell(9);
//                Cell cell60 = row.createCell(10);
//                Cell cell61 = row.createCell(11);
//                Cell cell62 = row.createCell(12);
//                Cell cell63 = row.createCell(13);
//                Cell cell64 = row.createCell(14);
//                Cell cell65 = row.createCell(15);
//                Cell cell66 = row.createCell(16);
//                Cell cell67 = row.createCell(17);
//                Cell cell68 = row.createCell(18);
//                Cell cell69 = row.createCell(19);
//                Cell cell70 = row.createCell(20);
//                Cell cell71 = row.createCell(21);
//                Cell cell72 = row.createCell(22);
//
//                cell50.setCellValue(listaData.get(vi).strFormatDate);
//                cell51.setCellValue(listaData.get(vi).PERNUM);
//                cell52.setCellValue(listaData.get(vi).BAIR);
//                cell53.setCellValue(listaData.get(vi).BDAIR);
//                cell54.setCellValue(listaData.get(vi).DES_BAIR);
//                cell55.setCellValue(listaData.get(vi).DES_BDAIR);
//                cell56.setCellValue(listaData.get(vi).BCODE);
//                cell57.setCellValue(listaData.get(vi).BNUMBER);
//                cell58.setCellValue(listaData.get(vi).strFormatDate2);
//                cell59.setCellValue(listaData.get(vi).SETMETH);
//                cell60.setCellValue(listaData.get(vi).STPM);
//                cell61.setCellValue(listaData.get(vi).STRM);
//                cell62.setCellValue(listaData.get(vi).STBM);
//                cell63.setCellValue(listaData.get(vi).STCM);
//                cell64.setCellValue(listaData.get(vi).BCURREN);
//                cell65.setCellValue(listaData.get(vi).TGROSS);
//                cell66.setCellValue(listaData.get(vi).TISC);
//                cell67.setCellValue(listaData.get(vi).TTAX);
//                cell68.setCellValue(listaData.get(vi).TVAT);
//                cell69.setCellValue(listaData.get(vi).HFEEAM);
//                cell70.setCellValue(listaData.get(vi).TUATP);
//                cell71.setCellValue(listaData.get(vi).TOHCOM);
//                cell72.setCellValue(listaData.get(vi).TNET);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//                cell58.setCellStyle(bodyStyle);
//                cell59.setCellStyle(bodyStyle);
//                cell60.setCellStyle(bodyStyle);
//                cell61.setCellStyle(bodyStyle);
//                cell62.setCellStyle(bodyStyle);
//                cell63.setCellStyle(bodyStyle);
//                cell64.setCellStyle(bodyStyle);
//                cell65.setCellStyle(bodyStyle);
//                cell66.setCellStyle(bodyStyle);
//                cell67.setCellStyle(bodyStyle);
//                cell68.setCellStyle(bodyStyle);
//                cell69.setCellStyle(bodyStyle);
//                cell70.setCellStyle(bodyStyle);
//                cell71.setCellStyle(bodyStyle);
//                cell72.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
//                sheet.autoSizeColumn(14, true);
//                sheet.autoSizeColumn(15, true);
//                sheet.autoSizeColumn(16, true);
//                sheet.autoSizeColumn(17, true);
//                sheet.autoSizeColumn(18, true);
//                sheet.autoSizeColumn(19, true);
//                sheet.autoSizeColumn(20, true);
//                sheet.autoSizeColumn(21, true);
//                sheet.autoSizeColumn(22, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
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
