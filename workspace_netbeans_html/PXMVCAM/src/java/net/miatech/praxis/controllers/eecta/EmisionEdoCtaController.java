/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ReportEdoCta;
import net.miatech.praxis.classes.ReportEdoCtaDet;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.A3953;
import net.miatech.praxis.eecta.A3958;
import net.miatech.praxis.eecta.A3981;
import net.miatech.praxis.eecta.A3982;
import net.miatech.praxis.eecta.A3990;
import net.miatech.praxis.eecta.SQP03976Filter;
import net.miatech.praxis.eecta.SQP03977Filter;
import net.miatech.praxis.eecta.SQP04001Filter;
import net.miatech.praxis.eecta.SQP04043Filter;
import net.miatech.praxis.eecta.SQP04050Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.EmisionEdoCtaLogic;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
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

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/EmisionEdoCta")
public class EmisionEdoCtaController extends BaseController {
    private EmisionEdoCtaLogic logic;
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03977Filter> listaData;
        SQP03977Filter filter;
        filter = new SQP03977Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NREDO = request.getParameter("VP_NREDO");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03977Filter(filter);

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

    @RequestMapping(value = "pdf_EstadoCuenta")
    void pdf_EstadoCuenta(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            logic = new EmisionEdoCtaLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP03976Filter filter;
            List<SQP03976Filter> listaData;
            filter = new SQP03976Filter();
            //Datos cabecera    
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP03976Filter(filter);
            ReportEdoCta reportEdoCta = new ReportEdoCta();
            File archivo = reportEdoCta.createReport(listaData);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;
            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();
        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }

    }
    
    @RequestMapping(value = "pdf_EstadoCuenta_det")
    void pdf_EstadoCuenta_det(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            logic = new EmisionEdoCtaLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP04001Filter filter;
            List<SQP04001Filter> listaData;
            filter = new SQP04001Filter();
            //Datos cabecera    
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP04001(filter);
            ReportEdoCtaDet reportEdoCtaDet = new ReportEdoCtaDet();
            File archivo = reportEdoCtaDet.createReport(listaData);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;
            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();
        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }

    }
    
    
    @RequestMapping(value = "ConsultaEdoCta")
    public @ResponseBody    
    String ConsultaEdoCta(ModelMap map, HttpServletRequest request) {
        List<SQP04043Filter> listaData;
        SQP04043Filter filter;
        filter = new SQP04043Filter();        
        try {            
            filter.VP_A3981FPERI = request.getParameter("VP_A3981FPERI");
            filter.VP_A3981CDCLI = request.getParameter("VP_A3981CDCLI");
            filter.VP_A3981FEJEC = request.getParameter("VP_A3981FEJEC");                        
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04043Filter(filter);
            
            //datos CLIENTE
            List<A3953> lstRtn01 = new  ArrayList<A3953>(0);            
            A3953 objRtn01;
            objRtn01 = new A3953();
            objRtn01.A3953RSOCI = listaData.get(0).tbl_client.A3953RSOCI;
            objRtn01.A3953DIRE1 = listaData.get(0).tbl_client.A3953DIRE1;
            objRtn01.A3953COLON = listaData.get(0).tbl_client.A3953COLON;
            objRtn01.A3953DELEG = listaData.get(0).tbl_client.A3953DELEG;
            objRtn01.A3953CP = listaData.get(0).tbl_client.A3953CP;
            //objRtn01.A3953LOGO = listaData.get(0).tbl_client.A3953LOGO.trim();
            objRtn01.A3953PLZCR = listaData.get(0).tbl_client.A3953PLZCR;
            objRtn01.A3953TORGN = listaData.get(0).tbl_client.A3953TORGN; 
            lstRtn01.add(objRtn01);
            
            List<A3981> lstRtn02 = new  ArrayList<A3981>(0);            
            A3981 objRtn02;            
            objRtn02 = new A3981();            
            objRtn02.A3981CDCLI = listaData.get(0).rpteCab.A3981CDCLI;
            objRtn02.A3981FEDOC = listaData.get(0).rpteCab.A3981FEDOC;
            objRtn02.A3981INIPR = listaData.get(0).rpteCab.A3981INIPR;
            objRtn02.A3981FINPR = listaData.get(0).rpteCab.A3981FINPR;
            objRtn02.A3981MDLOC = listaData.get(0).rpteCab.A3981MDLOC;
            objRtn02.A3981TOT = listaData.get(0).rpteCab.A3981TOT;
            objRtn02.A3981TOTLT = listaData.get(0).rpteCab.A3981TOTLT;
            lstRtn02.add(objRtn02);                        
            
            //VENTAS
            List<A3982> lstRtn03 = new  ArrayList<A3982>(0);            
            A3982 objRtn03;            
            for (int i = 4; i < listaData.size(); i++) {                
               if( listaData.get(i).rpteDet.A3982TREG.equals("02")){                                   
                objRtn03 = new A3982();
                objRtn03.A3982FECPR = listaData.get(i).rpteDet.A3982FECPR;
                objRtn03.A3982IDPRO = listaData.get(i).rpteDet.A3982IDPRO;
                objRtn03.A3982INIPR = listaData.get(i).rpteDet.A3982INIPR;
                objRtn03.A3982FINPR = listaData.get(i).rpteDet.A3982FINPR;
                objRtn03.A3982REFBC = listaData.get(i).rpteDet.A3982REFBC;
                objRtn03.A3982QTYTX = listaData.get(i).rpteDet.A3982QTYTX;
                objRtn03.A3982MDLOC = listaData.get(i).rpteDet.A3982MDLOC;
                objRtn03.A3982TOT = listaData.get(i).rpteDet.A3982TOT;                                
                lstRtn03.add(objRtn03);                
               }
            }
            //PAGOS
            List<A3982> lstRtn04 = new  ArrayList<A3982>(0);            
            A3982 objRtn04;  
            Double VL_SALDO_ANTEIOR = 0.0;
            for (int i = 4; i < listaData.size(); i++) {            
               if( listaData.get(i).rpteDet.A3982TREG.equals("00")){
                    VL_SALDO_ANTEIOR = VL_SALDO_ANTEIOR + listaData.get(i).rpteDet.A3982TOT;   
               } 
               if( listaData.get(i).rpteDet.A3982TREG.equals("01")){                                   
                objRtn04 = new A3982();
                objRtn04.A3982FECPR = listaData.get(i).rpteDet.A3982FECPR;
                objRtn04.NRRPT = listaData.get(i).rpteDet.NRRPT;
                objRtn04.A3982INIPR = listaData.get(i).rpteDet.A3982INIPR;
                objRtn04.A3982FINPR = listaData.get(i).rpteDet.A3982FINPR;
                objRtn04.A3982REFBC = listaData.get(i).rpteDet.A3982REFBC;
                objRtn04.A3982QTYTX = listaData.get(i).rpteDet.A3982QTYTX;
                objRtn04.A3982MDLOC = listaData.get(i).rpteDet.A3982MDLOC;
                objRtn04.A3982TOT = listaData.get(i).rpteDet.A3982TOT;                                 
                lstRtn04.add(objRtn04);                
               }
            }
//            //antiguedad de saldos
//            List<A3990> lstRtn05 = new  ArrayList<A3990>(0);            
//            A3990 objRtn05;            
//            objRtn05 = new A3990();            
//            objRtn05.A3990TOT = listaData.get(3).tbl_saldos.A3990TOT;
//            objRtn05.A3990TTLS0 = listaData.get(3).tbl_saldos.A3990TTLS0;
//            objRtn05.A3990TTLS1 = listaData.get(3).tbl_saldos.A3990TTLS1;
//            objRtn05.A3990TTLS2 = listaData.get(3).tbl_saldos.A3990TTLS2;
//            objRtn05.A3990TTLS3 = listaData.get(3).tbl_saldos.A3990TTLS3;
//            objRtn05.A3990TTLS4 = listaData.get(3).tbl_saldos.A3990TTLS4;
//            objRtn05.A3990TTLS5 = listaData.get(3).tbl_saldos.A3990TTLS5 + listaData.get(3).tbl_saldos.A3990TTLS6;
//            lstRtn05.add(objRtn05); 
            
            map.put("success", true);
            map.put("total", listaData.size());            
            map.put("SALDO_ANTEIOR", VL_SALDO_ANTEIOR);
            
            map.put("lstRtn01", lstRtn01);
            map.put("lstRtn02", lstRtn02);
            map.put("lstRtn03", lstRtn03);
            map.put("lstRtn04", lstRtn04);
            //map.put("lstRtn05", lstRtn05);
                        
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ConsultaEdoCtaDet")
    public @ResponseBody    
    String ConsultaEdoCtaDet(ModelMap map, HttpServletRequest request) {
        List<SQP04050Filter> listaData;
        SQP04050Filter filter;
        filter = new SQP04050Filter();        
        try {            
            filter.VP_A3981FPERI = request.getParameter("VP_A3981FPERI");
            filter.VP_A3981CDCLI = request.getParameter("VP_A3981CDCLI");
            filter.VP_A3981FEJEC = request.getParameter("VP_A3981FEJEC");                        
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04050Filter(filter);
            
            //datos CLIENTE
            List<A3953> lstRtn01 = new  ArrayList<A3953>(0);            
            A3953 objRtn01;
            objRtn01 = new A3953();
            objRtn01.A3953CDCLI = listaData.get(0).tbl_client.A3953CDCLI;
            objRtn01.A3953RSOCI = listaData.get(0).tbl_client.A3953RSOCI;
            objRtn01.A3953DIRE1 = listaData.get(0).tbl_client.A3953DIRE1;
            objRtn01.A3953COLON = listaData.get(0).tbl_client.A3953COLON;
            objRtn01.A3953DELEG = listaData.get(0).tbl_client.A3953DELEG;
            objRtn01.A3953CP = listaData.get(0).tbl_client.A3953CP;
            //objRtn01.A3953LOGO = listaData.get(0).tbl_client.A3953LOGO.trim();
            objRtn01.A3953PLZCR = listaData.get(0).tbl_client.A3953PLZCR;
            objRtn01.A3953TORGN = listaData.get(0).tbl_client.A3953TORGN; 
            lstRtn01.add(objRtn01);
            
            List<A3981> lstRtn02 = new  ArrayList<A3981>(0);            
            A3981 objRtn02;            
            objRtn02 = new A3981();            
            objRtn02.A3981CDCLI = listaData.get(0).rpteCab.A3981CDCLI;
            objRtn02.A3981FEDOC = listaData.get(0).rpteCab.A3981FEDOC;
            objRtn02.A3981INIPR = listaData.get(0).rpteCab.A3981INIPR;
            objRtn02.A3981FINPR = listaData.get(0).rpteCab.A3981FINPR;
            objRtn02.A3981MDLOC = listaData.get(0).rpteCab.A3981MDLOC;
            objRtn02.A3981TOT = listaData.get(0).rpteCab.A3981TOT;
            objRtn02.A3981TOTLT = listaData.get(0).rpteCab.A3981TOTLT;
            lstRtn02.add(objRtn02);                        
            
            //antiguedad de saldos
            List<A3990> lstRtn03 = new  ArrayList<A3990>(0);            
            A3990 objRtn03;            
            objRtn03 = new A3990();            
            objRtn03.A3990TOT = listaData.get(3).tbl_saldos.A3990TOT;
            objRtn03.A3990TTLS0 = listaData.get(3).tbl_saldos.A3990TTLS0;
            objRtn03.A3990TTLS1 = listaData.get(3).tbl_saldos.A3990TTLS1;
            objRtn03.A3990TTLS2 = listaData.get(3).tbl_saldos.A3990TTLS2;
            objRtn03.A3990TTLS3 = listaData.get(3).tbl_saldos.A3990TTLS3;
            objRtn03.A3990TTLS4 = listaData.get(3).tbl_saldos.A3990TTLS4;
            objRtn03.A3990TTLS5 = listaData.get(3).tbl_saldos.A3990TTLS5 + listaData.get(3).tbl_saldos.A3990TTLS6;
            lstRtn03.add(objRtn03); 
            
             //Detalle saldos
            List<A3958> lstRtn04 = new  ArrayList<A3958>(0);            
            A3958 objRtn04;            
            for (int i = 4; i < listaData.size(); i++) {                                                                  
                objRtn04 = new A3958();                
                objRtn04.A3958CCUST = listaData.get(i).rpteDet.A3958CCUST;
                objRtn04.A3958CIA = listaData.get(i).rpteDet.A3958CIA;
                objRtn04.A3958FORMA = listaData.get(i).rpteDet.A3958FORMA;
                objRtn04.A3958SERIE = listaData.get(i).rpteDet.A3958SERIE;
                objRtn04.A3958SEQ = listaData.get(i).rpteDet.A3958SEQ;                    
                objRtn04.A3958FEVTA = listaData.get(i).rpteDet.A3958FEVTA;
                objRtn04.A3958NRRPT = listaData.get(i).rpteDet.A3958NRRPT;
                objRtn04.A3958PAX = listaData.get(i).rpteDet.A3958PAX; 
                objRtn04.A3958SOLER = listaData.get(i).rpteDet.A3958SOLER; 
                objRtn04.A3958TRNCU = listaData.get(i).rpteDet.A3958TRNCU; 
                objRtn04.A3958RUTA = listaData.get(i).rpteDet.A3958RUTA.trim(); 
                objRtn04.A3958CFDI = listaData.get(i).rpteDet.A3958CFDI.trim();                    
                objRtn04.A3958MDLOC = listaData.get(i).rpteDet.A3958MDLOC;                   
                objRtn04.A3958TOT = listaData.get(i).rpteDet.A3958TOT;
                objRtn04.ANT_SALDO = listaData.get(i).rpteDet.ANT_SALDO;
                lstRtn04.add(objRtn04);                               
            }
            
            map.put("success", true);
            map.put("total", listaData.size());            
                       
            map.put("lstRtn01", lstRtn01);
            map.put("lstRtn02", lstRtn02);
            map.put("lstRtn03", lstRtn03);
            map.put("lstRtn04", lstRtn04);
            
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/ConsultaEdoCtaExcel")
    public @ResponseBody
    void ConsultaEdoCtaExcel(HttpServletRequest request, HttpServletResponse response) {
        
        SQP04043Filter filter;
        filter = new SQP04043Filter();
              
        try {                        
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                        
            String fileName = "EDOCTA"+filter.VP_A3981CDCLI;            
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            List<SQP04043Filter> lst = logic.getSQP04043Filter(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            
            CellStyle style_number;
            DataFormat format = workbook.createDataFormat();
            style_number = workbook.createCellStyle();
            style_number.setDataFormat(format.getFormat("#,##.#############")); // custom number format
            
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
            Cell cell01, cell02, cell03, cell04, cell05, cell06, cell07, cell08, cell09, cell10;             
            //Cell VENTAS
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56, cell57, cell58;
            //Cell PAGOS
            Cell cell11, cell12, cell13, cell14, cell15, cell16, cell17;
            //Cell SUBTOTALES / TOTALES
            Cell cell18, cell19, cell20, cell21;
            
            // <editor-fold defaultstate="collapsed" desc="row">             
            row = sheet.createRow(vj);
            cell01 = row.createCell(0);
            cell01.setCellValue( lst.get(0).tbl_client.A3953RSOCI );
            vj++;
            row = sheet.createRow(vj);
            cell02 = row.createCell(0);
            cell02.setCellValue( lst.get(0).tbl_client.A3953DIRE1 );
            vj++;
            row = sheet.createRow(vj);
            cell03 = row.createCell(0);
            cell03.setCellValue( lst.get(0).tbl_client.A3953COLON );
            vj++;
            row = sheet.createRow(vj);
            cell04 = row.createCell(0);
            cell04.setCellValue( lst.get(0).tbl_client.A3953DELEG + " CP " + lst.get(0).tbl_client.A3953CP  );
            
            vj++;
            vj++;
            row = sheet.createRow(vj);
            cell05 = row.createCell(0);
            cell05.setCellValue( "Al Cierre:" );
            cell05 = row.createCell(1);
            cell05.setCellValue( lst.get(0).rpteCab.A3981FPERI );
            
            vj++;
            row = sheet.createRow(vj);
            cell06 = row.createCell(0);
            cell06.setCellValue( "SALDO ANTERIOR:" );
            cell06 = row.createCell(2);
            cell06.setCellValue( lst.get(0).rpteDet.A3982TOT );
            
            vj++;
            vj++;
            row = sheet.createRow(vj);
            cell07 = row.createCell(0);
            cell07.setCellValue( "VENTAS ");
            
            vj++;
            row = sheet.createRow(vj);
            cell50 = row.createCell(0);
            cell50.setCellValue("F. Emisión");
            cell50.setCellStyle(headerStyle);
            
            cell51 = row.createCell(1);
            cell51.setCellValue("Nº Reporte");
            cell51.setCellStyle(headerStyle);
            
            cell52 = row.createCell(2);
            cell52.setCellValue("P. Desde");
            cell52.setCellStyle(headerStyle);
            
            cell53 = row.createCell(3);
            cell53.setCellValue("Hasta");
            cell53.setCellStyle(headerStyle);
            
            cell54 = row.createCell(4);
            cell54.setCellValue("Ref. Bancaria");
            cell54.setCellStyle(headerStyle);
            
            cell55 = row.createCell(5);
            cell55.setCellValue("Cant. Trx.");
            cell55.setCellStyle(headerStyle);
            
            cell56 = row.createCell(6);
            cell56.setCellValue("Curr.");
            cell56.setCellStyle(headerStyle);
            
            cell57 = row.createCell(7);
            cell57.setCellValue("Importe");
            cell57.setCellStyle(headerStyle);
           
            ++vj;
            Double SUBTOTAL_VENTA = 0.0;
            for (vi = 4; vi < len; vi++) {                
                // <editor-fold defaultstate="collapsed" desc="data">                              
                if( lst.get(vi).rpteDet.A3982TREG.equals("02")){   
                    row = sheet.createRow(vj);
                    cell50 = row.createCell(0);
                    cell50.setCellValue((String)lst.get(vi).rpteDet.A3982FECPR);
                    
                    cell51 = row.createCell(1);
                    cell51.setCellValue((String)lst.get(vi).rpteDet.A3982IDPRO);
                                        
                    cell52 = row.createCell(2);
                    cell52.setCellValue((String)lst.get(vi).rpteDet.A3982INIPR);
                                        
                    cell53 = row.createCell(3);
                    cell53.setCellValue((String)lst.get(vi).rpteDet.A3982FINPR);
                                        
                    cell54 = row.createCell(4);
                    cell54.setCellValue((String)lst.get(vi).rpteDet.A3982REFBC);
                                        
                    cell55 = row.createCell(5);
                    cell55.setCellValue((Integer)lst.get(vi).rpteDet.A3982QTYTX);
                                        
                    cell56 = row.createCell(6);
                    cell56.setCellValue((String)lst.get(vi).rpteDet.A3982MDLOC);
                    
                    cell57 = row.createCell(7);
                    cell57.setCellValue((Double)lst.get(vi).rpteDet.A3982TOT);
                    cell57.setCellStyle(style_number);
                    
                    SUBTOTAL_VENTA = SUBTOTAL_VENTA + lst.get(vi).rpteDet.A3982TOT;
                    ++vj;
                }  
                // </editor-fold>                
            }
                        
            vj++;
            row = sheet.createRow(vj);
            cell17 = row.createCell(5);
            cell17.setCellValue("SUBTOTAL:");
            cell17.setCellStyle(bodyStyle);
            cell17 = row.createCell(7);
            cell17.setCellValue(SUBTOTAL_VENTA);
            cell17.setCellStyle(style_number);
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 6));
            
            vj++;
            row = sheet.createRow(vj);
            cell11 = row.createCell(0);
            cell11.setCellValue( "PAGOS APLICADOS ");
            vj++;
            row = sheet.createRow(vj);
            cell11 = row.createCell(1);
            cell11.setCellValue("F. Emisión");
            cell11.setCellStyle(headerStyle);
            
            cell12 = row.createCell(2);
            cell12.setCellValue("Nº Reporte");
            cell12.setCellStyle(headerStyle);
            
            cell13 = row.createCell(3);
            cell13.setCellValue("Ref. Bancaria");
            cell13.setCellStyle(headerStyle);
            
            cell14 = row.createCell(4);
            cell14.setCellValue("Banco");
            cell14.setCellStyle(headerStyle);
            
            cell15 = row.createCell(5);
            cell15.setCellValue("Cant. Trx.");
            cell15.setCellStyle(headerStyle);
            
            cell16 = row.createCell(6);
            cell16.setCellValue("Curr.");
            cell16.setCellStyle(headerStyle);
            
            cell17 = row.createCell(7);
            cell17.setCellValue("Importe");
            cell17.setCellStyle(headerStyle);
            
            Double SUBTOTAL_PAGOS = 0.0;
            vj++;
            for (vi = 4; vi < len; vi++) {                  
                // <editor-fold defaultstate="collapsed" desc="data">                              
                if( lst.get(vi).rpteDet.A3982TREG.equals("01")){   
                    row = sheet.createRow(vj);
                    cell11 = row.createCell(1);
                    cell11.setCellValue((String)lst.get(vi).rpteDet.A3982FECPR);                                        
                    cell12 = row.createCell(2);
                    cell12.setCellValue((String)lst.get(vi).rpteDet.A3982IDPRO);
                    cell13 = row.createCell(3);
                    cell13.setCellValue((String)lst.get(vi).rpteDet.A3982REFBC);
                    cell14 = row.createCell(4);
                    cell14.setCellValue((String)lst.get(vi).rpteDet.A3982BANCO);                    
                    cell15 = row.createCell(5);
                    cell15.setCellValue((Integer)lst.get(vi).rpteDet.A3982QTYTX);
                    cell16 = row.createCell(6);
                    cell16.setCellValue((String)lst.get(vi).rpteDet.A3982MDLOC);
                    cell17 = row.createCell(7);
                    cell17.setCellValue((Double)lst.get(vi).rpteDet.A3982TOT);                    
                    cell17.setCellStyle(style_number);
                    
                    SUBTOTAL_PAGOS = SUBTOTAL_PAGOS + lst.get(vi).rpteDet.A3982TOT;  
                    ++vj;
               }                                               
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
//                
                // </editor-fold>                                              
            }
            vj++;
            row = sheet.createRow(vj);
            cell18 = row.createCell(5);
            cell18.setCellValue("SUBTOTAL:" );
            cell18 = row.createCell(7);
            cell18.setCellValue(SUBTOTAL_PAGOS);
            //cell18.setCellStyle(headerStyle);
            cell18.setCellStyle(style_number);
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 6));
            
            vj++;
            vj++;
            row = sheet.createRow(vj);
            cell19 = row.createCell(5);
            cell19.setCellValue("GRAN TOTAL:" );
            cell19 = row.createCell(7);
            cell19.setCellValue( lst.get(0).rpteCab.A3981TOT );
            //cell19.setCellStyle(headerStyle);  
            cell19.setCellStyle(style_number);
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 5, 6));
            
            vj++;
            row = sheet.createRow(vj);
            cell20 = row.createCell(0);
            cell20.setCellValue(lst.get(0).rpteCab.A3981TOTLT );
            //cell20.setCellStyle(headerStyle);
            //PARA TOTALES EN LETRAS
            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 7));
                        
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
            
            String fileNameDownload = String.format(fileName + "-" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
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
    
    @RequestMapping(value = "/ConsultaEdoCtaDetExcel")
    public @ResponseBody
    void ConsultaEdoCtaDetExcel(HttpServletRequest request, HttpServletResponse response) {
        
        SQP04050Filter filter;
        filter = new SQP04050Filter();
              
        try {                        
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                                            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = -1;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;        
            String fileName = "EECTA-detalleSaldos-"+ filter.VP_A3981CDCLI+"-"+filter.VP_A3981FPERI;
            logic = new EmisionEdoCtaLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            List<SQP04050Filter> lst = logic.getSQP04050Filter(filter);
            
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
            
            
            cell50.setCellValue("BOLETO");
            cell51.setCellValue("FECHA EMISION");
            cell52.setCellValue("PAX");
            cell53.setCellValue("REF1");
            cell54.setCellValue("TRX");
            cell55.setCellValue("RUTA");
            cell56.setCellValue("UUID");
            cell57.setCellValue("MONEDA");
            cell58.setCellValue("SALDO");
            cell59.setCellValue("ANTIGUEDAD SALDO");

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
            
            for (vi = 4; vi < len; vi++) {  
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
                                
                cell50.setCellValue((String)lst.get(vi).rpteDet.A3958CIA + lst.get(vi).rpteDet.A3958FORMA + lst.get(vi).rpteDet.A3958SERIE );
                cell51.setCellValue((String)lst.get(vi).rpteDet.A3958FEVTA);
                cell52.setCellValue((String)lst.get(vi).rpteDet.A3958PAX);
                cell53.setCellValue((String)lst.get(vi).rpteDet.A3958SOLER);
                cell54.setCellValue((String)lst.get(vi).rpteDet.A3958TRNCU);
                cell55.setCellValue(lst.get(vi).rpteDet.A3958RUTA ); 
                cell56.setCellValue(lst.get(vi).rpteDet.A3958CFDI );
                cell57.setCellValue(lst.get(vi).rpteDet.A3958MDLOC); 
                cell58.setCellValue(lst.get(vi).rpteDet.A3958TOT); 
                cell59.setCellValue(lst.get(vi).rpteDet.ANT_SALDO); 
                
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
    
}
