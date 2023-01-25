package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1544Filter;
import net.miatech.beans.SQP01432Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.StatisticalsReportBySourceLogic;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
@RequestMapping("/StatisticalsReportBySource")
public class StatisticalsReportBySourceController extends BaseController {

    private StatisticalsReportBySourceLogic logic;
    private SQP01432Filter filter;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadCountry")
    public @ResponseBody
    String loadCountry(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            listaData = masterDAO.loadCountry();
            
            map.put("success", true);
            map.put("lstCountry", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP01432Filter> listaData;
        filter = new SQP01432Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CUSTOM = request.getParameter("VP_CUSTOM");
            filter.VP_TIPO = request.getParameter("VP_TIPO");
            filter.VP_AGRUPA = request.getParameter("VP_AGRUPA");
            filter.VP_AFETNU = request.getParameter("VP_AFETNU");
            filter.VP_MONEDA = request.getParameter("VP_MONEDA");
            filter.VP_PERIOD = request.getParameter("VP_PERIOD");
            filter.VP_FUENTE = request.getParameter("VP_FUENTE");
            filter.VP_SFUENT = request.getParameter("VP_SFUENT");
            filter.VP_PAISVE = request.getParameter("VP_PAISVE");
            filter.VP_AGENTE = request.getParameter("VP_AGENTE");
            
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new StatisticalsReportBySourceLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01432Filter(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<SQP01432Filter> listaData;
        filter = new SQP01432Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Sales Report By Source - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_CUSTOM = request.getParameter("VP_CUSTOM");
            filter.VP_TIPO = request.getParameter("VP_TIPO");
            filter.VP_AGRUPA = request.getParameter("VP_AGRUPA");
            filter.VP_AFETNU = request.getParameter("VP_AFETNU");
            filter.VP_MONEDA = request.getParameter("VP_MONEDA");
            filter.VP_PERIOD = request.getParameter("VP_PERIOD");
            filter.VP_FUENTE = request.getParameter("VP_FUENTE");
            filter.VP_SFUENT = request.getParameter("VP_SFUENT");
            filter.VP_PAISVE = request.getParameter("VP_PAISVE");
            filter.VP_AGENTE = request.getParameter("VP_AGENTE");
            
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new StatisticalsReportBySourceLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01432Filter(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Sales Report By Source");
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
            CH1_00.setCellValue("Source");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Country");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Channel");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Agency Number");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Agency Name");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Curr");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("JAN");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("FEB");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("MAR");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("APR");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("MAY");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("JUN");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("JUL");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("AUG");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("SEP");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("OCT");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("NOV");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("DEC");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("TOTAL");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));

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
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

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
            sheet.autoSizeColumn(18, true);

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

                cell50.setCellValue(listaData.get(vi).A2775FTE);
                cell51.setCellValue(listaData.get(vi).A2775PAIS);
                cell52.setCellValue(listaData.get(vi).A2775SFTE);
                cell53.setCellValue(listaData.get(vi).A2775IATA);
                cell54.setCellValue(listaData.get(vi).A2775NAME);
                cell55.setCellValue(listaData.get(vi).VL_MONEDA);
                cell56.setCellValue(listaData.get(vi).ENE);
                cell57.setCellValue(listaData.get(vi).FEB);
                cell58.setCellValue(listaData.get(vi).MAR);
                cell59.setCellValue(listaData.get(vi).ABR);
                cell60.setCellValue(listaData.get(vi).MAY);
                cell61.setCellValue(listaData.get(vi).JUN);
                cell62.setCellValue(listaData.get(vi).JUL);
                cell63.setCellValue(listaData.get(vi).AGO);
                cell64.setCellValue(listaData.get(vi).SET);
                cell65.setCellValue(listaData.get(vi).OCT);
                cell66.setCellValue(listaData.get(vi).NOV);
                cell67.setCellValue(listaData.get(vi).DIC);
                cell68.setCellValue(listaData.get(vi).TOTAL);

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
                sheet.autoSizeColumn(18, true);
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
    
    
    @RequestMapping(value = "getXLSXAPI")
    public @ResponseBody
    void getXLSXAPI(HttpServletRequest request, HttpServletResponse response) {
        SQP01432Filter filter = new SQP01432Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD_DJANGO").toString();
        
        try {
            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);
            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();            
            bodyData.put("server_database", serverSession.getServerSession().getPropertySession().get("SERVER_DJANGO").toString());
            bodyData.put("VP_RPTE", "1");
            bodyData.put("VP_CUSTOM", "139");
            bodyData.put("VP_TIPO", filter.VP_TIPO);
            bodyData.put("VP_AGRUPA", filter.VP_AGRUPA);
            bodyData.put("VP_AFETNU", filter.VP_AFETNU);
            bodyData.put("VP_MONEDA", filter.VP_MONEDA);
            bodyData.put("VP_PERIOD", filter.VP_PERIOD);
            bodyData.put("VP_FUENTE", filter.VP_FUENTE);
            bodyData.put("VP_SFUENT", filter.VP_SFUENT);
            bodyData.put("VP_PAISVE", filter.VP_PAISVE);
            bodyData.put("VP_AGENTE", filter.VP_AGENTE);
            bodyData.put("IO_PAGNUM", -1);
            bodyData.put("IO_PAGROW", -1);
            bodyData.put("IO_TOTPAG", -1);
            bodyData.put("IO_TOTROW", -1);
            bodyData.put("PATH", rutaFile);     
            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            String urlAPI  = "/api/ReportesXLS/rptReportesXLS/";
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI )
                    .header("content-type", "application/json") 
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();
            

            String error_code = responseAPI.getBody().getObject().get("error_code").toString();
            String error_msg = responseAPI.getBody().getObject().get("error_msg").toString();
            String filename = responseAPI.getBody().getObject().get("filename").toString();
            
            String fileNameDownload = rutaFile + "\\" + filename;
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename  + "\"");
            InputStream is = new FileInputStream( fileNameDownload );
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();            
// ZIP            
//            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + filename + ".zip" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + filename + ".zip");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();            
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
}
