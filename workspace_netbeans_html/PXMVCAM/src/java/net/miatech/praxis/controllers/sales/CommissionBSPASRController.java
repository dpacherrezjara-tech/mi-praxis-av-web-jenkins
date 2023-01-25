package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX119S01A1775Filter;
import net.miatech.beans.PX119S01A1776Filter;
import net.miatech.beans.SQP00105Filter;
import net.miatech.beans.SQP0083Filter;
import net.miatech.beans.SQP0089Filter;
import net.miatech.beans.SQP0099Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.classes.ProReportCommGSA;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CommissionBSPASRLogic;
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
@RequestMapping("/CommissionBSPASR")
public class CommissionBSPASRController extends BaseController {

    private CommissionBSPASRLogic logic;
    private PX119S01A1775Filter filter;
    private PX119S01A1776Filter filter2;
    private SQP0089Filter filter3;
    private SQP0083Filter filter4;
    private SQP0099Filter filter5;
    private SQP00105Filter filter6;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadGSA")
    public @ResponseBody
    String loadGSA(ModelMap map, HttpServletRequest request) {
        List<PX119S01A1775Filter> listaData;
        filter = new PX119S01A1775Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_A1775CCUST = request.getParameter("IN_A1775CCUST").trim();
            filter.IN_A1775GSA = request.getParameter("IN_A1775GSA").trim();
            filter.IN_A1775LOTE = request.getParameter("IN_A1775LOTE").trim();
            filter.IN_A1775FINI = request.getParameter("IN_A1775FINI").trim();
            filter.A1775STAT = request.getParameter("A1775STAT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX119S01A1775(filter);
            
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
    
    @RequestMapping(value = "/loadTicketGSA")
    public @ResponseBody
    String loadTicketGSA(ModelMap map, HttpServletRequest request) {
        List<PX119S01A1776Filter> listaData;
        filter2 = new PX119S01A1776Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        try {
            String temp = request.getParameter("IN_OPCION").trim();
            filter2.IN_OPCION = temp.length()>0?Integer.parseInt(temp):0;
            filter2.IN_A1776CCUST = request.getParameter("IN_A1776CCUST");
            filter2.IN_A1776GSA = request.getParameter("IN_A1776GSA");
            filter2.IN_A1776PAIS = request.getParameter("IN_A1776PAIS");
            filter2.IN_A1776LOTE = request.getParameter("IN_A1776LOTE");
            filter2.IN_TKT = request.getParameter("IN_TKT");
            filter2.IN_A1776MDALC = request.getParameter("IN_A1776MDALC");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX119S01A1776(filter2);
            
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
    
    /*Datos de Envio Mail Previo (Browse)
     */
    @RequestMapping(value = "/getSQP0089Filter")
    public @ResponseBody
    String getSQP0089Filter(ModelMap map, HttpServletRequest request) {
        List<SQP0089Filter> listaData;
        filter3 = new SQP0089Filter();
        try {
            filter3.VP_A1775CCUST = request.getParameter("VP_A1775CCUST").trim();
            filter3.VP_A1775GSA = request.getParameter("VP_A1775GSA").trim();
            filter3.VP_A1775PAIS = request.getParameter("VP_A1775PAIS").trim();
            filter3.VP_A1775LOTE = request.getParameter("VP_A1775LOTE").trim();
            filter3.VP_A1775MDALC = request.getParameter("VP_A1775MDALC").trim();
            
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP0089Filter(filter3);
            
            map.put("success", true);
            map.put("lstData", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    /*Envio del reporte por Mail
     */
    @RequestMapping(value = "/setSQP0083Filter")
    public @ResponseBody
    String setSQP0083Filter(ModelMap map, HttpServletRequest request) {
        filter4 = new SQP0083Filter();
        SQP0083Filter objRtn;    
        boolean iboolean;        
        logic = new CommissionBSPASRLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        try {
            filter4.VP_ACTION = request.getParameter("VP_ACTION").trim();
            filter4.VP_A1775CCUST = request.getParameter("VP_A1775CCUST").trim();
            filter4.VP_A1775GSA = request.getParameter("VP_A1775GSA").trim();
            filter4.VP_A1775PAIS = request.getParameter("VP_A1775PAIS").trim();
            filter4.VP_A1775LOTE = request.getParameter("VP_A1775LOTE").trim();
            filter4.VP_A1775MDALC = request.getParameter("VP_A1775MDALC").trim();
            filter4.VP_TIPO_ENVIO = request.getParameter("VP_TIPO_ENVIO").trim();
            
            // Obtener datos de Envio
            SQP0089Filter param = new SQP0089Filter();
            param.VP_A1775CCUST   = filter4.VP_A1775CCUST;
            param.VP_A1775GSA     = filter4.VP_A1775GSA;
            param.VP_A1775PAIS    = filter4.VP_A1775PAIS;
            param.VP_A1775LOTE    = filter4.VP_A1775LOTE;
            param.VP_A1775MDALC    = filter4.VP_A1775MDALC;
            List<SQP0089Filter> beanData = logic.getSQP0089Filter(param);                       
            filter5 = new SQP0099Filter();
            filter5.VP_A1775CCUST = filter4.VP_A1775CCUST;
            filter5.VP_A1775GSA   = filter4.VP_A1775GSA;
            filter5.VP_A1775PAIS  = filter4.VP_A1775PAIS;
            filter5.VP_A1775LOTE  = filter4.VP_A1775LOTE;
            filter5.VP_A1775MDALC = filter4.VP_A1775MDALC;
            
            //SQP0099Filter beanDataRpt = new SQP0099Filter();
            SQP0099Filter beanDataRpt = logic.getSQP0099Filter(filter5);             
            ProReportCommGSA proReportCommGSA = new ProReportCommGSA(); 
            proReportCommGSA.createReport(beanDataRpt);
            
            
            iboolean = setSendMail( beanData, proReportCommGSA);                        
            map.put("success", true);
            if ( iboolean ){
                // Registra Envio A1775 (Actualiza Estado)
                objRtn = logic.setSQP0083Filter(filter4);                    
                map.put("MESSAGE", objRtn.dbException.MESSAGE);           
                map.put("SQLCODE", objRtn.dbException.SQLCODE);
            }else{           
                map.put("MESSAGE", "Could not send email!");           
                map.put("SQLCODE", "-1");
            } 
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    /* Acuse GSA
     */
    @RequestMapping(value = "/setSQP00105Filter")
    public @ResponseBody
    String setSQP00105Filter(ModelMap map, HttpServletRequest request) {
        filter6 = new SQP00105Filter();      
        SQP00105Filter objRtn;
        try {
            filter6.VP_ACTION = request.getParameter("VP_ACTION").trim();
            filter6.VP_A1775CCUST = request.getParameter("VP_A1775CCUST").trim();
            filter6.VP_A1775GSA = request.getParameter("VP_A1775GSA").trim();
            filter6.VP_A1775PAIS = request.getParameter("VP_A1775PAIS").trim();
            filter6.VP_A1775LOTE = request.getParameter("VP_A1775LOTE").trim();
            filter6.VP_A1775MDALC = request.getParameter("VP_A1775MDALC").trim();
            filter6.A1775FACUS = request.getParameter("A1775FACUS").trim();
            filter6.A1775HACUS = request.getParameter("A1775HACUS").trim();
            
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            objRtn = logic.setSQP00105Filter(filter6);         
            
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
    
    public boolean setSendMail( List<SQP0089Filter> Rw, ProReportCommGSA report) {                
        boolean iboolean;         
        ProMail proMail = new ProMail();                
        List<String> receptores = new ArrayList<>();                
        receptores.add(Rw.get(0).A1839EMAIL);        
        List<String> Ccp = new ArrayList<>();        
        String strMails = Rw.get(0).EmailCcp;
        String[] parts = strMails.split(";");        
        for (int i = 0; i < parts.length ; i++) {
            Ccp.add( parts[i] );      
        }        
        String emisor  = "notificaciones@miatech.net";//Rw.get(0).EmailRe;
        String asunto  = Rw.get(0).Asunto ;
        String mensaje = Rw.get(0).Mensaje;
        List<String> archivos = new ArrayList<>();        
        archivos.add(report.getFile().get(0).getAbsolutePath());
        archivos.add(report.getFile().get(1).getAbsolutePath());
        iboolean = proMail.envia(emisor, asunto, receptores, Ccp, mensaje, archivos, emisor);   //TMP CONFIRMAR QUE CORREO DEBE IR
        
        return iboolean; 
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<PX119S01A1775Filter> listaData;
        filter = new PX119S01A1775Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Commission BSP & ASR - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_A1775CCUST = request.getParameter("IN_A1775CCUST").trim();
            filter.IN_A1775GSA = request.getParameter("IN_A1775GSA").trim();
            filter.IN_A1775LOTE = request.getParameter("IN_A1775LOTE").trim();
            filter.IN_A1775FINI = request.getParameter("IN_A1775FINI").trim();
            filter.A1775STAT = request.getParameter("A1775STAT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            String MODO = request.getParameter("MODO").trim();
            if(MODO.equals("S")){
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }else{
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = -1;
            }
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX119S01A1775(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Commission BSP & ASR");
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
            CH1_02.setCellValue("Open Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Curr. Local");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Net Fare");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Fare BSP");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Fare ASR");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Commission");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("% Comm.");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("FDR");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Currency of Payment");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Total GSA");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Sent to GSA");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Acuse");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("Received From GSA");
            Cell CH1_21 = row.createCell(21);
            CH1_21.setCellValue("ID Lote");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 21, 21));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);

            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("On ");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Off ");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("On ");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Off ");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("On ");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Off ");
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            CH2_15.setCellValue("Status");
            Cell CH2_16 = row2.createCell(16);
            CH2_16.setCellValue("Date");
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);
            CH2_18.setCellValue("Status");
            Cell CH2_19 = row2.createCell(19);
            CH2_19.setCellValue("Date");
            Cell CH2_20 = row2.createCell(20);
            CH2_20.setCellValue("Acc.");
            Cell CH2_21 = row2.createCell(21);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));

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
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);

            sheet.autoSizeColumn(15, true);

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
                Cell cell69 = row.createCell(19);
                Cell cell70 = row.createCell(20);
                Cell cell71 = row.createCell(21);

                cell50.setCellValue(listaData.get(vi).A1775GSA);
                cell51.setCellValue(listaData.get(vi).A1775PAIS_00);
                cell52.setCellValue(listaData.get(vi).A1775FINI);
                cell53.setCellValue(listaData.get(vi).A1775MDALC);
                cell54.setCellValue(listaData.get(vi).A1775TFRNT);
                cell55.setCellValue(listaData.get(vi).A1775TFRON);
                cell56.setCellValue(listaData.get(vi).A1775TFROF);
                cell57.setCellValue(listaData.get(vi).A1775ASRON);
                cell58.setCellValue(listaData.get(vi).A1775ASROF);
                cell59.setCellValue(listaData.get(vi).A1775COMON);
                cell60.setCellValue(listaData.get(vi).A1775COMOF);
                cell61.setCellValue(listaData.get(vi).A1775SCGSA);
                cell62.setCellValue(listaData.get(vi).A1775TCFDR);
                cell63.setCellValue(listaData.get(vi).A1775MPAG);
                cell64.setCellValue(listaData.get(vi).A1775TPAG);
                cell65.setCellValue(listaData.get(vi).A1775STAT);
                cell66.setCellValue(listaData.get(vi).A1775FENV);
                cell67.setCellValue(listaData.get(vi).ACUSE);
                cell68.setCellValue(listaData.get(vi).A1775STRC);
                cell69.setCellValue(listaData.get(vi).A1775FREC);
                cell70.setCellValue(listaData.get(vi).A1826INDCO);
                cell71.setCellValue(listaData.get(vi).A1775LOTE);

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
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                cell71.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(9, true);
                sheet.autoSizeColumn(10, true);
                sheet.autoSizeColumn(12, true);
                sheet.autoSizeColumn(15, true);
                sheet.autoSizeColumn(21, true);
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
    
    @RequestMapping(value = "getXLSXTkt")
    public @ResponseBody
    void getXLSXTkt(HttpServletRequest request, HttpServletResponse response) {
        List<PX119S01A1776Filter> listaData;
        filter2 = new PX119S01A1776Filter();
        filter2.page.TOTROW = -1;
        filter2.page.START = 0;
        filter2.page.LIMIT = 0;
        
        String fileNameDownload = String.format("PX119_GSA_Determination - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            String temp = request.getParameter("IN_OPCION").trim();
            filter2.IN_OPCION = temp.length()>0?Integer.parseInt(temp):0;
            filter2.IN_A1776CCUST = request.getParameter("IN_A1776CCUST");
            filter2.IN_A1776GSA = request.getParameter("IN_A1776GSA");
            filter2.IN_A1776PAIS = request.getParameter("IN_A1776PAIS");
            filter2.IN_A1776LOTE = request.getParameter("IN_A1776LOTE");
            filter2.IN_TKT = request.getParameter("IN_TKT");
            filter2.IN_A1776MDALC = request.getParameter("IN_A1776MDALC");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            /*filter2.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;*/
            
            String MODO = request.getParameter("MODO").trim();
            if(MODO.equals("S")){
                filter2.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter2.page.PAGNUM = (start / filter2.page.PAGROW) + 1;
            }else{
                filter2.page.PAGROW = -1;
                filter2.page.PAGNUM = -1;
            }
            
            
            logic = new CommissionBSPASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX119S01A1776(filter2);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("PX119_GSA_Determination");
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
            CH1_00.setCellValue("Src.");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Iata");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Ticket");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Cpn");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Issue Date");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Trx");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("From");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("To");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Carr");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Flight");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Fare Basis");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Class");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("IT Tour Code");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Curr");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Fare Cpn On");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Fare Cpn Off");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Comm HOT On");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Comm HOT Off");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("%");
            Cell CH1_19 = row.createCell(19);
            CH1_19.setCellValue("Rate Pay");
            Cell CH1_20 = row.createCell(20);
            CH1_20.setCellValue("GSA AM Comm");
            Cell CH1_21 = row.createCell(21);
            CH1_21.setCellValue("Curr GSA");
            Cell CH1_22 = row.createCell(22);
            CH1_22.setCellValue("FOP");
            Cell CH1_23 = row.createCell(23);
            CH1_23.setCellValue("Ap.");
            Cell CH1_24 = row.createCell(24);
            CH1_24.setCellValue("Ind.");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));

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
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);

            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);

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
                Cell cell69 = row.createCell(19);
                Cell cell70 = row.createCell(20);
                Cell cell71 = row.createCell(21);
                Cell cell72 = row.createCell(22);
                Cell cell73 = row.createCell(23);
                Cell cell74 = row.createCell(24);

                cell50.setCellValue(listaData.get(vi).A1776FUENT);
                cell51.setCellValue(listaData.get(vi).A1776IATA);
                cell52.setCellValue(listaData.get(vi).TKT);
                cell53.setCellValue(listaData.get(vi).A1776CUPON);
                cell54.setCellValue(listaData.get(vi).A1776FECVT);
                cell55.setCellValue(listaData.get(vi).A1776TRNCU);
                cell56.setCellValue(listaData.get(vi).A1776ORIG);
                cell57.setCellValue(listaData.get(vi).A1776DEST);
                cell58.setCellValue(listaData.get(vi).A1776CARR);
                cell59.setCellValue(listaData.get(vi).A1776NVLO);
                cell60.setCellValue(listaData.get(vi).A1776FBAS);
                cell61.setCellValue(listaData.get(vi).A1776CLAS);
                cell62.setCellValue(listaData.get(vi).A1776CODIT);
                cell63.setCellValue(listaData.get(vi).A1776MDALC);
                cell64.setCellValue(listaData.get(vi).FARE_ON);
                cell65.setCellValue(listaData.get(vi).FARE_OFF);
                cell66.setCellValue(listaData.get(vi).A1776CHON);
                cell67.setCellValue(listaData.get(vi).A1776CHOFF);
                cell68.setCellValue(listaData.get(vi).A1776PCSC);
                cell69.setCellValue(listaData.get(vi).A1776GTCAM);
                cell70.setCellValue(listaData.get(vi).A1776GPAGC);
                cell71.setCellValue(listaData.get(vi).A1776GMDAP);
                cell72.setCellValue(listaData.get(vi).A1776CFOP);
                cell73.setCellValue(listaData.get(vi).A1776APLIC);
                cell74.setCellValue(listaData.get(vi).A1776INDI);

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
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                cell71.setCellStyle(bodyStyle);
                cell72.setCellStyle(bodyStyle);
                cell73.setCellStyle(bodyStyle);
                cell74.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(19, true);
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
