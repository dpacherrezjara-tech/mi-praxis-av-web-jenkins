package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConsortiaAdjLogic;
import net.miatech.praxisbi.A1955Filter;
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
@RequestMapping("/AccountingProcessConsortia")
public class AccountingProcessConsortiaController extends BaseController {

    private ConsortiaAdjLogic logic;
    private A1955Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1955Filter> listaData;
        filter = new A1955Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_MODULO = request.getParameter("IN_MODULO").trim();
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO").trim();
            filter.IN_FECHA_ACUSE = request.getParameter("IN_FECHA_ACUSE").trim();
            filter.A1955STATU = request.getParameter("A1955STATU").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new ConsortiaAdjLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.search(filter);
            
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
    
    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        filter = new A1955Filter();
        String strOption;
        A1955Filter reversa = new A1955Filter();
        try {
            filter.A1955MODUL = request.getParameter("A1955MODUL");
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO") == null ? "" : request.getParameter("IN_FECHA_PROCESO");
            filter.A1955KEY2 = request.getParameter("A1955KEY2") == null ? "" : request.getParameter("A1955KEY2");
            filter.A1955KEY4 = request.getParameter("A1955KEY4") == null ? "" : request.getParameter("A1955KEY4");
            strOption = request.getParameter("strOption");
            
            reversa.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO") == null ? "" : request.getParameter("IN_FECHA_PROCESO");
            reversa.IN_FECHA_CONTABLE = request.getParameter("IN_FECHA_CONTABLE") == null ? "" : request.getParameter("IN_FECHA_CONTABLE");
            reversa.IN_ENVIO = request.getParameter("IN_ENVIO") == null ? "" : request.getParameter("IN_ENVIO"); 
            
            logic = new ConsortiaAdjLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            if(strOption.equals("I") && filter.IN_ENVIO.equals("true")){
                String dato = logic.consistenciaFlown(filter);
            }
            if(strOption.equals("D")){                
                switch(filter.A1955MODUL){
                    case "PSALES" :
                        logic.reversaSales(reversa,"ASR","S");
                        logic.reversaSales(reversa,"BSP","S");
                        logic.reversaSales(reversa,"ARC","S");
                        logic.reversaSales(reversa,"MAN","S");

                        if(reversa.IN_ENVIO.equals("true")){
                            logic.reversaSalesReg(reversa.IN_FECHA_PROCESO,reversa.IN_FECHA_CONTABLE, "R");
                        }                
                        logic.reversaSalesReg(reversa.IN_FECHA_PROCESO,"", "F");
                        break;
                    case "PFLOWN" :
                        logic.reversaFlown(filter);
                        break;                        
                    case "PAPINT" :
                        logic.reversaInterlineAP(filter);
                        break;    
                    case "PARINT" :
                        logic.reversaInterlineAR(filter);
                        break;     
                    case "PCADUCOS" :
                        logic.reversaCaducos(filter);
                        break;
                }                
            }    
            String result = "";
            List<A1955Filter> lstGroups = new ArrayList(0);
            /*if("PSALES".equals(filter.A1955MODUL) && !reversa.IN_ENVIO.equals("true"))
            {
                lstGroups = logic.SQP04042(filter);
                if(lstGroups.size()==0)
                    result = logic.accountMaintance(filter,strOption);                
            }
            else*/
                result = logic.accountMaintance(filter,strOption);
            
            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);
            map.put("strModulo", filter.A1955MODUL);
            map.put("lstGroups", lstGroups);

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
        List<A1955Filter> listaData;
        filter = new A1955Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Accounting Master Process Sales - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_MODULO = request.getParameter("IN_MODULO").trim();
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO").trim();
            filter.IN_FECHA_ACUSE = request.getParameter("IN_FECHA_ACUSE").trim();
            filter.A1955STATU = request.getParameter("A1955STATU").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            
            logic = new ConsortiaAdjLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.search(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Accounting Master Process Sales");
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
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("ID Process");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Module");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Type");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Proc. Date");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
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

                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).A1955ENVIO);
                cell52.setCellValue(listaData.get(vi).MODULE);
                cell53.setCellValue(listaData.get(vi).ACCION);
                cell54.setCellValue(listaData.get(vi).A1955FPROC);
                cell55.setCellValue(listaData.get(vi).ESTADO);

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

    @RequestMapping(value = "/searchReversa")
    public @ResponseBody
    String searchReversa(ModelMap map, HttpServletRequest request) {
        A1955Filter listaData;
        filter = new A1955Filter();
        try {
            filter.IN_MODULO = request.getParameter("IN_MODULO").trim();
            filter.A1955FPROC = request.getParameter("IN_FECHA_PROCESO").trim();
            
            logic = new ConsortiaAdjLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.searchReversa(filter);
            
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

    @RequestMapping(value = "/MaintancePending")
    public @ResponseBody
    String MaintancePending(ModelMap map, HttpServletRequest request) {
        filter = new A1955Filter();
        String strOption;
        try {
            filter.A1955MODUL = request.getParameter("A1955MODUL");
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO");
            strOption = request.getParameter("strOption");            
            
            logic = new ConsortiaAdjLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());                       
            
            String result = logic.accountMaintancePending(filter,strOption);
            
            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
}
