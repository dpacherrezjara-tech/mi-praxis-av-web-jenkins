/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.discharges;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A3936;
import net.miatech.beans.DBException;
import net.miatech.beans.SQP03961Filter;
import net.miatech.beans.SQP03962Filter;
import net.miatech.beans.SQP03963Filter;
import net.miatech.beans.SQP03964Filter;
import net.miatech.beans.SQP03965Filter;
import net.miatech.beans.SQP03974Filter;
import net.miatech.beans.SQP04051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.discharges.NoShowLogic;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/NoShow")
public class NoShowController extends BaseController {

    private NoShowLogic logic;
    
    @RequestMapping(value = "/search_control_recep")
    public @ResponseBody
    String search_control_recep(ModelMap map, HttpServletRequest request) {
        List<SQP03961Filter> listaData;
        SQP03961Filter filter;
        filter = new SQP03961Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_A3933FPROC1 = request.getParameter("VP_A3933FPROC1");
            filter.VP_A3933FPROC2 = request.getParameter("VP_A3933FPROC2");
            filter.VP_A3933STAT = request.getParameter("VP_A3933STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03961(filter);
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

    @RequestMapping(value = "/search_detalle_noshow")
    public @ResponseBody
    String search_detalle_noshow(ModelMap map, HttpServletRequest request) {
        List<SQP03962Filter> listaData;
        SQP03962Filter filter;
        filter = new SQP03962Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3932RPDA = request.getParameter("VP_A3932RPDA");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3932SEQ = request.getParameter("VP_SEQ");
            filter.A3932ESTAD = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03962(filter);
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

    @RequestMapping(value = "/search_err_noshow")
    public @ResponseBody
    String search_err_noshow(ModelMap map, HttpServletRequest request) {
        List<SQP03963Filter> listaData;
        SQP03963Filter filter;
        filter = new SQP03963Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3934FPROC = request.getParameter("VP_A3934FPROC");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3934SEQ = request.getParameter("VP_SEQ");
            filter.A3934STSER = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03963(filter);
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

    @RequestMapping(value = "/search_XML_ticket")
    public @ResponseBody
    String search_XML_ticket(ModelMap map, HttpServletRequest request) {
        List<SQP03964Filter> listaData;
        SQP03964Filter filter;
        filter = new SQP03964Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.FPROC = request.getParameter("VP_FPROC");
            filter.TICKET_NUMBER = request.getParameter("VP_TICKET");
            filter.SEQ = request.getParameter("VP_SEQ");
            filter.OPRESULTCODE = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03964(filter);
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

    @RequestMapping(value = "/search_info_boleto_XML")
    public @ResponseBody
    String search_info_boleto_XML(ModelMap map, HttpServletRequest request) {
        List<SQP03965Filter> listaData;
        List<A3936> listaDataDet = new ArrayList<>(0);
        SQP03965Filter filter;
        A3936 objRtn;
        filter = new SQP03965Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3935CCIA = request.getParameter("VP_A3935CCIA");
            filter.A3935FORMA = request.getParameter("VP_A3935FORMA");
            filter.A3935SERIE = request.getParameter("VP_A3935SERIE");
            filter.A3935SEQ = request.getParameter("VP_A3935SEQ");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03965Filter(filter);
            //detalle cupones
            for (int i = 1; i < listaData.size(); i++) {
                objRtn = new A3936();
                objRtn.A3936CCUST = listaData.get(i).det_cpn.A3936CCUST;
                objRtn.A3936CCIA = listaData.get(i).det_cpn.A3936CCIA;
                objRtn.A3936FORMA = listaData.get(i).det_cpn.A3936FORMA;
                objRtn.A3936SERIE = listaData.get(i).det_cpn.A3936SERIE;
                objRtn.A3936SEQ = listaData.get(i).det_cpn.A3936SEQ;
                objRtn.A3936SEQ = listaData.get(i).det_cpn.A3936SEQ;
                objRtn.A3936CUPON = listaData.get(i).det_cpn.A3936CUPON;
                objRtn.A3936SECPN = listaData.get(i).det_cpn.A3936SECPN;
                objRtn.A3936FLAG = listaData.get(i).det_cpn.A3936FLAG;
                objRtn.A3936NSEQ = listaData.get(i).det_cpn.A3936NSEQ;
                objRtn.A3936CIAI = listaData.get(i).det_cpn.A3936CIAI;
                objRtn.A3936FORMI = listaData.get(i).det_cpn.A3936FORMI;
                objRtn.A3936SERII = listaData.get(i).det_cpn.A3936SERII;
                objRtn.A3936ORIG = listaData.get(i).det_cpn.A3936ORIG;
                objRtn.A3936DEST = listaData.get(i).det_cpn.A3936DEST;
                objRtn.A3936CARN = listaData.get(i).det_cpn.A3936CARN;
                objRtn.A3936CARA = listaData.get(i).det_cpn.A3936CARA;
                objRtn.A3936NVLO = listaData.get(i).det_cpn.A3936NVLO;
                objRtn.A3936FVLO = listaData.get(i).det_cpn.A3936FVLO;
                objRtn.A3936HVLO = listaData.get(i).det_cpn.A3936HVLO;
                objRtn.A3936FVLA = listaData.get(i).det_cpn.A3936FVLA;
                objRtn.A3936CLAS = listaData.get(i).det_cpn.A3936CLAS;
                objRtn.A3936FBUS = listaData.get(i).det_cpn.A3936FBUS;
                objRtn.A3936TDSG = listaData.get(i).det_cpn.A3936TDSG;
                objRtn.A3936BSTA = listaData.get(i).det_cpn.A3936BSTA;
                objRtn.A3936CSTA = listaData.get(i).det_cpn.A3936CSTA;
                listaDataDet.add(objRtn);
            }

            map.put("success", true);
            map.put("total", listaData.size());
            map.put("dataCab", listaData.get(0));
            map.put("dataDet", listaDataDet);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search_log_det")
    public @ResponseBody
    String search_log_det(ModelMap map, HttpServletRequest request) {
        List<SQP03974Filter> listaData;
        SQP03974Filter filter;
        filter = new SQP03974Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A3980FFILE = request.getParameter("VP_A3980FFILE");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3980SEQ = request.getParameter("VP_SEQ");
            filter.A3980APLIC = request.getParameter("VP_STAT");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03974Filter(filter);
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
    
    @RequestMapping(value = "downloadTextLog")
    public @ResponseBody        
    void downloadTextLog(HttpServletRequest request, HttpServletResponse response) {
        List<SQP03974Filter> listaData;
        SQP03974Filter filter;
        filter = new SQP03974Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();        
        try{
            //Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.A3980FFILE = request.getParameter("VP_A3980FFILE");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3980SEQ = request.getParameter("VP_SEQ");
            filter.A3980APLIC = request.getParameter("VP_STAT");
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            listaData = logic.loadSQP03974Filter(filter);
            
            int len = listaData.size();
            Integer vi = 0;            
            String fileName = "DetalleLog-"+filter.A3980FFILE+"-"+date.getDay()+date.getMinutes()+date.getSeconds();
            File file = new File(rutaFile + "\\" + fileName + ".txt");
            
            if (file.exists())
                file.delete();
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;
            cadena = "CCUST|RPDA|FFILE|TICKET|SEQ|CUPON|TICKETI|TICKETAE_EMD|APLICA|TEXT";
            writer.println("" + cadena );
            
            for (vi = 0; vi < len; vi++) {                
                cadena = "";                                
                cadena += "" + listaData.get(vi).A3980CCUST + "|";
                cadena += "" + listaData.get(vi).A3980RPDA + "|";
                cadena += "" + listaData.get(vi).A3980FFILE + "|";
                cadena += "" + listaData.get(vi).A3980CCIA +listaData.get(vi).A3980FORMA +listaData.get(vi).A3980SERIE + "|";
                cadena += "" + listaData.get(vi).A3980SEQ + "|";
                cadena += "" + listaData.get(vi).A3980CUPON + "|";               
                cadena += "" + listaData.get(vi).A3980TICKI + "|";
                cadena += "" + listaData.get(vi).A3980TICKA + "|";                
                cadena += "" + listaData.get(vi).A3980APLIC + "|";
                cadena += "" + listaData.get(vi).A3980TEXT.trim();                                
                writer.println("" + cadena );
            }
            writer.flush();
            writer.close();
            
            /**
             * Comprimimos archivo generado para su optima descarga
             */
            //if (!zip(filter.fileName))
            
            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }
        
    } 
    
    @RequestMapping(value = "/downloadExcelLog")
    public @ResponseBody
    void downloadExcelLog(HttpServletRequest request, HttpServletResponse response) {
        
        SQP03974Filter filter;
        filter = new SQP03974Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;        
        try {            
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                        
            String fileName = "DetalleLog";            
            filter.A3980FFILE = request.getParameter("VP_A3980FFILE");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.A3980SEQ = request.getParameter("VP_SEQ");
            filter.A3980APLIC = request.getParameter("VP_STAT");
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            //listaData = logic.loadSQP03974Filter(filter);            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1; 
            
            List<SQP03974Filter> lst = logic.loadSQP03974Filter(filter);
            
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
            int len = lst.size();
            
            Integer vi = 0;
            Integer vj = 0;                        
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59;
            
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
                        
            cell50.setCellValue("CCUST");
            cell51.setCellValue("RPDA");
            cell52.setCellValue("FFILE");
            cell53.setCellValue("TICKET");
            cell54.setCellValue("SEQ");
            cell55.setCellValue("CUPON");
            cell56.setCellValue("TICKETI");
            cell57.setCellValue("TICKETAE_EMD");
            cell58.setCellValue("APLICA");
            cell59.setCellValue("TEXT");
            
            
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
            

            ++vj;
            
            for (vi = 0; vi < len; vi++) {  
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
                                
                //HashMap hm = (HashMap) listaData.get(vi);                  
                cell50.setCellValue((String)lst.get(vi).A3980CCUST );
                cell51.setCellValue((String)lst.get(vi).A3980RPDA);
                cell52.setCellValue((String)lst.get(vi).A3980FFILE);
                cell53.setCellValue((String)lst.get(vi).A3980CCIA + lst.get(vi).A3980FORMA + lst.get(vi).A3980SERIE);
                cell54.setCellValue(lst.get(vi).A3980SEQ ); 
                cell55.setCellValue(lst.get(vi).A3980CUPON );
                cell56.setCellValue(lst.get(vi).A3980TICKI);
                cell57.setCellValue(lst.get(vi).A3980TICKA);                
                cell58.setCellValue(lst.get(vi).A3980APLIC); //Double.parseDouble((String)hm.get("A1720VRFLC"))
                cell59.setCellValue(lst.get(vi).A3980TEXT); //Double.parseDouble((String)hm.get("A1720VNTLC"))
                
                
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
                
                // </editor-fold>
                //iter.next();
                //++vi;                
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
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
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
    @RequestMapping(value = "/DonwloadExcelDetXml")
    public @ResponseBody
    void DonwloadExcelDetXml(HttpServletRequest request, HttpServletResponse response) {        
        SQP04051Filter filter;
        filter = new SQP04051Filter();
        try {            
            //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                        
            String fileName = "DetalleTKT_XML";            
            filter.A3935FPROC = request.getParameter("VP_A3935FPROC");            
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());                        
            List<SQP04051Filter> lst = logic.loadSQP04051Filter(filter);
            
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
            int len = lst.size();
            
            Integer vi = 0;
            Integer vj = 0;                        
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61, cell62, cell63;
            Cell cell64, cell65, cell66, cell67, cell68, cell69, cell70;
            Cell cell71, cell72, cell73, cell74, cell75, cell76, cell77;
            Cell cell78, cell79, cell80, cell81, cell82, cell83, cell84, cell85, cell86;
            
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
            cell62 = row.createCell(12);
            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);
            cell67 = row.createCell(17);
            cell68 = row.createCell(18);
            cell69 = row.createCell(19);
            cell70 = row.createCell(20);
            cell71 = row.createCell(21);
            cell72 = row.createCell(22);
            cell73 = row.createCell(23);
            cell74 = row.createCell(24);
            cell75 = row.createCell(25);
            cell76 = row.createCell(26);
            cell77 = row.createCell(27);
            cell78 = row.createCell(28);
            cell79 = row.createCell(29);
            cell80 = row.createCell(30);
            cell81 = row.createCell(31);
            cell82 = row.createCell(32);
            cell83 = row.createCell(33);
            cell84 = row.createCell(34);
            cell85 = row.createCell(35);
            cell86 = row.createCell(36);
                                    
            cell50.setCellValue("TICKET_NUMBERI");
            cell51.setCellValue("TICKET_NUMBER");
            cell52.setCellValue("TOTAL_CPN");
            cell53.setCellValue("CONJUNCION");
            cell54.setCellValue("FECHA_PROC");
            cell55.setCellValue("TRNCU");
            cell56.setCellValue("TDOC");
            cell57.setCellValue("AGENT");
            cell58.setCellValue("CODIT");
            cell59.setCellValue("FECVTA");
            cell60.setCellValue("PNR");
            cell61.setCellValue("PNRSP");
            cell62.setCellValue("FRESV");
            cell63.setCellValue("PAX");
            cell64.setCellValue("TPAX");
            cell65.setCellValue("Inclusive_Transaction");
            cell66.setCellValue("WorkLocation");
            cell67.setCellValue("CIUVTA");
            cell68.setCellValue("PSVTA");
            cell69.setCellValue("CPUI");
            cell70.setCellValue("Endorsements");
            
            cell71.setCellValue("CUPON");
            cell72.setCellValue("Service_Coupon");
            cell73.setCellValue("StartLocation");
            cell74.setCellValue("EndLocation");
            cell75.setCellValue("MarketingProvider_Number");
            cell76.setCellValue("MarketingProvider");
            cell77.setCellValue("MarketingFlightNumber");
            cell78.setCellValue("StartDate");
            cell79.setCellValue("StartTime");
            cell80.setCellValue("EndDate");
            cell81.setCellValue("EndTime");
            cell82.setCellValue("ClassOfService");
            cell83.setCellValue("FareBasis");
            cell84.setCellValue("ticket_designator");
            cell85.setCellValue("CurrentStatus");
            cell86.setCellValue("PreviousStatus");            
            
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
            cell62.setCellStyle(headerStyle);
            cell63.setCellStyle(headerStyle);
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);
            cell67.setCellStyle(headerStyle);
            cell68.setCellStyle(headerStyle);
            cell69.setCellStyle(headerStyle);
            cell70.setCellStyle(headerStyle);
            
            cell71.setCellStyle(headerStyle);
            cell72.setCellStyle(headerStyle);
            cell73.setCellStyle(headerStyle);
            cell74.setCellStyle(headerStyle);
            cell75.setCellStyle(headerStyle);
            cell76.setCellStyle(headerStyle);
            cell77.setCellStyle(headerStyle);
            cell78.setCellStyle(headerStyle);
            cell79.setCellStyle(headerStyle);
            
            cell80.setCellStyle(headerStyle);
            cell81.setCellStyle(headerStyle);
            cell82.setCellStyle(headerStyle);
            cell83.setCellStyle(headerStyle);
            cell84.setCellStyle(headerStyle);
            cell85.setCellStyle(headerStyle);
            cell86.setCellStyle(headerStyle);
            

            ++vj;
            
            for (vi = 0; vi < len; vi++) {  
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
                cell62 = row.createCell(12);
                cell63 = row.createCell(13);
                cell64 = row.createCell(14);
                cell65 = row.createCell(15);
                cell66 = row.createCell(16);
                cell67 = row.createCell(17);
                cell68 = row.createCell(18);
                cell69 = row.createCell(19);
                cell70 = row.createCell(20);
                cell71 = row.createCell(21);
                cell72 = row.createCell(22);
                cell73 = row.createCell(23);
                cell74 = row.createCell(24);
                cell75 = row.createCell(25);
                cell76 = row.createCell(26);
                cell77 = row.createCell(27);
                cell78 = row.createCell(28);
                cell79 = row.createCell(29);
                cell80 = row.createCell(30);
                cell81 = row.createCell(31);
                cell82 = row.createCell(32);
                cell83 = row.createCell(33);
                cell84 = row.createCell(34);
                cell85 = row.createCell(35);
                cell86 = row.createCell(36);

                cell50.setCellValue((String)lst.get(vi).A3935CCIA + lst.get(vi).A3935FORMA + lst.get(vi).A3935SERIE );
                cell51.setCellValue((String)lst.get(vi).det_cpn.A3936CCIA + lst.get(vi).det_cpn.A3936FORMA + lst.get(vi).det_cpn.A3936SERIE );                  
                cell52.setCellValue((Integer)lst.get(vi).A3935TCPNS);
                cell53.setCellValue((String)lst.get(vi).det_cpn.A3936FLAG);
                cell54.setCellValue(lst.get(vi).A3935FPROC ); 
                cell55.setCellValue(lst.get(vi).A3935TRNCU );
                cell56.setCellValue(lst.get(vi).A3935TDOC);
                cell57.setCellValue(lst.get(vi).A3935AGENT);                
                cell58.setCellValue(lst.get(vi).A3935CODIT);  
                cell59.setCellValue(lst.get(vi).A3935FECVT); //Double.parseDouble((String)hm.get("A1720VNTLC"))                
                cell60.setCellValue(lst.get(vi).A3935PNR);
                cell61.setCellValue(lst.get(vi).A3935PNRSP);   
                cell62.setCellValue(lst.get(vi).A3935FRESV);   
                cell63.setCellValue(lst.get(vi).A3935PAX);
                cell64.setCellValue(lst.get(vi).A3935TPAX);
                cell65.setCellValue(lst.get(vi).A3935INCLT);
                cell66.setCellValue(lst.get(vi).A3935PCITY);
                cell67.setCellValue(lst.get(vi).A3935CIUVT);
                cell68.setCellValue(lst.get(vi).A3935PSVTA);
                cell69.setCellValue(lst.get(vi).A3935CPUI);
                cell70.setCellValue(lst.get(vi).A3935ENDOR);                
                cell71.setCellValue((Integer)lst.get(vi).det_cpn.A3936CUPON);
                cell72.setCellValue((Integer)lst.get(vi).det_cpn.A3936SECPN);
                cell73.setCellValue(lst.get(vi).det_cpn.A3936ORIG);                 
                cell74.setCellValue(lst.get(vi).det_cpn.A3936DEST);
                cell75.setCellValue(lst.get(vi).det_cpn.A3936CARN);
                cell76.setCellValue(lst.get(vi).det_cpn.A3936CARA);
                cell77.setCellValue(lst.get(vi).det_cpn.A3936NVLO);
                cell78.setCellValue(lst.get(vi).det_cpn.A3936FVLO);
                cell79.setCellValue(lst.get(vi).det_cpn.A3936HVLO);
                cell80.setCellValue(lst.get(vi).det_cpn.A3936FVLA);
                cell81.setCellValue(lst.get(vi).det_cpn.A3936HVLA);
                cell82.setCellValue(lst.get(vi).det_cpn.A3936CLAS);
                cell83.setCellValue(lst.get(vi).det_cpn.A3936FBUS);
                cell84.setCellValue(lst.get(vi).det_cpn.A3936TDSG);
                cell85.setCellValue(lst.get(vi).det_cpn.A3936BSTA);
                cell86.setCellValue(lst.get(vi).det_cpn.A3936CSTA);
                                
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
                cell75.setCellStyle(bodyStyle);
                cell76.setCellStyle(bodyStyle);
                cell77.setCellStyle(bodyStyle);
                cell78.setCellStyle(bodyStyle);
                cell79.setCellStyle(bodyStyle);
                cell80.setCellStyle(bodyStyle);
                cell81.setCellStyle(bodyStyle);
                cell82.setCellStyle(bodyStyle);
                cell83.setCellStyle(bodyStyle);
                cell84.setCellStyle(bodyStyle);
                cell85.setCellStyle(bodyStyle);
                cell86.setCellStyle(bodyStyle);
                
                // </editor-fold>
                //iter.next();
                //++vi;                
                ++vj;
            }
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
            
            String fileNameDownload = String.format(fileName + "_" + request.getParameter("VP_A3935FPROC") + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
    
    //METODO FUNCIONAL, PERO NO USADO SE HACE CON EL S3 DE AWS
    @RequestMapping(value = "/setUploadInput", method = RequestMethod.POST)
    public @ResponseBody
    String setUploadInput(ModelMap map, @RequestParam("textfile") MultipartFile file, HttpServletRequest request) throws IOException {        
        DBException objRtn = new DBException();        
        try { 
            logic = new NoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());   
            
            byte[] bytes = file.getBytes();
            String StrfileName = file.getOriginalFilename(); 
            String rutaFile = "\\\\10.0.0.87\\am\\CADUCOS\\temp";
            Path dir = Paths.get(rutaFile);
            if (!Files.exists(dir)) {
                Files.createDirectory(dir);
            }             
            String strArchivo = rutaFile + "\\" + StrfileName;
            
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            fs.write(bytes);
            fs.flush();
            fs.close();            
            //API
            String VP_HOST_DB = serverSession.getServerSession().getPropertySession().get("SERVER_DJANGO").toString();
            String VP_SWITCH= "LOAD_FILE_INPUT";
            String VP_CCUST = "139";            
            String VP_FPROC = request.getParameter("VP_FPROC");
            String url_REST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString(); //"http://127.0.0.1:5557";
            String url_API  = "/api/praxis/discharge_noshow/";  //"http://127.0.0.1:5557/api/praxis/discharge_noshow/"
            Unirest.setTimeouts(3600000, 3600000);
            HashMap bodyData = new HashMap<>();            
            bodyData.put("VP_HOST_DB", VP_HOST_DB);
            bodyData.put("VP_SWITCH", VP_SWITCH);
            bodyData.put("VP_CCUST", VP_CCUST);
            bodyData.put("VP_FPROC", VP_FPROC);            
            HttpResponse<JsonNode> responseAPI = Unirest.post(url_REST + url_API )
                    .header("content-type", "application/json") 
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();
            //respuesta API
            String error_code = responseAPI.getBody().getObject().get("RESPONSE").toString();
            String error_msg = responseAPI.getBody().getObject().get("MESSAGE_TEXT").toString();
            if (error_code.equals("OK")) objRtn.SQLCODE = "1";
            else objRtn.SQLCODE = "0";
            objRtn.MESSAGE = error_msg;
            map.put("objRtn", objRtn);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());                        
            objRtn.SQLCODE = "0";
            objRtn.MESSAGE = ex.getMessage();            
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);
    } 
  
}
