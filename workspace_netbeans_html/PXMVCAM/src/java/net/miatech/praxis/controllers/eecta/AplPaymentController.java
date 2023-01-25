/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03942Filter;
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03951Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP03955Filter;
import net.miatech.praxis.eecta.SQP03956Filter;
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.AplPaymentLogic;
import net.miatech.utils.Functions;
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
import org.json.simple.JSONValue;
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
@RequestMapping("/AplPayment")
public class AplPaymentController extends BaseController {
    private AplPaymentLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03942Filter> listaData;
        SQP03942Filter filter;
        filter = new SQP03942Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_REFPG = request.getParameter("VP_REFPG");
            filter.VP_CTABC = request.getParameter("VP_CTABC");
            filter.VP_STSPG = request.getParameter("VP_STSPG");
            filter.VP_BOLET = request.getParameter("VP_BOLET");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03942Filter(filter);

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
    
    @RequestMapping(value = "/search_detalle_boleto"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String search_detalle_boleto(ModelMap map, HttpServletRequest request) {
        List<SQP03951Filter> listaData;
        SQP03951Filter filter;
        filter = new SQP03951Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
                        
            filter.VP_A3958CDCLI = request.getParameter("VP_A3958CDCLI");
            filter.VP_A3958NRRPT = request.getParameter("VP_A3958NRRPT");
            filter.VP_TFILTTRO = request.getParameter("VP_TFILTTRO");
            filter.VP_PARAM1 = request.getParameter("VP_PARAM1");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03951Filter(filter);

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
    @RequestMapping(value = "set_ApplyPayment")
    public @ResponseBody
    String set_ApplyPayment(ModelMap map, HttpServletRequest request) {
        SQP03943Filter filter = new SQP03943Filter();
        SQP03943Filter objRtn = new SQP03943Filter();
        logic = new AplPaymentLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                       
            objRtn = logic.setSQP03943Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString(); 
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "set_ApplyPayment_boleto")
    public @ResponseBody
    String set_ApplyPayment_boleto(ModelMap map, HttpServletRequest request) {
        SQP03952Filter filter = new SQP03952Filter();
        SQP03952Filter objRtn = new SQP03952Filter();
        logic = new AplPaymentLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                      
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("json_detail")).getAsJsonArray();
            filter.VP_json_detail = gson_detail.toString();            
            objRtn = logic.setSQP03952Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = ex.toString(); 
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
        
    @RequestMapping(value = "/get_aplpago")
    public @ResponseBody
    String get_aplpago(ModelMap map, HttpServletRequest request) {
        List<SQP03955Filter> listaData;
        SQP03955Filter filter;
        filter = new SQP03955Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 18;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03955Filter(filter);

            map.put("success", true);
            //map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("total", listaData.size());            
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
    @RequestMapping(value = "/get_aplpago_detalle"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String get_aplpago_detalle(ModelMap map, HttpServletRequest request) {
        List<SQP03956Filter> listaData;
        SQP03956Filter filter;
        filter = new SQP03956Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_IDPG = request.getParameter("VP_IDPG");
            filter.TICKET_NUMBER = request.getParameter("VP_TICKET");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;            
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03956Filter(filter);
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
    
    @RequestMapping(value = "/setAplPaymentBatch", method = RequestMethod.POST)
    public @ResponseBody
    String setAplPaymentBatch(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP04059Filter filter = new SQP04059Filter();                
        SQP04059Filter objRtn = new SQP04059Filter();
        Integer cont = 0;        
        try {        
            
            logic = new AplPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());            
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //data for excel
            String FPAGO;
            String NBOLE;
            String UUID;
            String IMPORTE;
            String MONEDA;
            String REFPAG;
            String TIPO;
            //json object
            String json_texto1;
            String json_texto = "";
            json_texto1 = "[";
            String ERROR_FIELDS = "N";
            Integer VL_INDICE = 0;
            //filter = new SQP04059Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            while (iterator.hasNext()) {                
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();                
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {
                        FPAGO = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();
                        //Si Fecha de pago y moneda es blanco , hay lineas completas en blanco y no debe continuar
                        if( FPAGO == "" && sheet.getCell(4).toString() == "" ){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 0;
                            break;
                        } 
                        if( FPAGO == "" && sheet.getCell(4).toString() != "" ){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 1;
                            break;
                        } 
                        NBOLE = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();
                        if( NBOLE != "" && NBOLE.trim().length() != 13 ){ 
                            ERROR_FIELDS = "S";
                            VL_INDICE = 2;
                            break;
                        }                        
                        UUID  = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();
                        IMPORTE = sheet.getCell(3)== null ? "0": sheet.getCell(3).toString();
                        if( IMPORTE == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 3;
                            break;
                        }                        
                        MONEDA = sheet.getCell(4)== null ? "" : sheet.getCell(4).toString();
                        if( MONEDA == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 4;
                            break;
                        }                        
                        REFPAG=  sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        TIPO=  sheet.getCell(6)== null ? "" : sheet.getCell(6).toString(); 
                        if( TIPO == ""){
                            ERROR_FIELDS = "S";
                            VL_INDICE = 5;
                            break;
                        } 
                        //crear obj json
                        HashMap obj=new HashMap();    
                        obj.put("FPAGO", FPAGO );    
                        obj.put("NBOLE", NBOLE );
                        obj.put("UUID", UUID );
                        obj.put("IMPORTE",new Double(IMPORTE)); 
                        obj.put("MONEDA",MONEDA); 
                        obj.put("REFPAG",REFPAG);
                        obj.put("TIPO", TIPO);
                        String jsonText = JSONValue.toJSONString(obj);                          
                        json_texto += jsonText + ",";                        
                    }
                }
            }                      
            // SI NO HAY ERRORES EN EXCEL ENVIAR A GRABAR            
            if(ERROR_FIELDS == "N"){
                int length = json_texto.length(); 
                json_texto1 +=  json_texto.substring(0,length-1);            
                json_texto1 += "]";
                filter.VP_JSON = json_texto1;             
                objRtn = logic.setSQP04059Filter(filter); 
            }else if( ERROR_FIELDS == "S" ){
                objRtn.OU_A4021LOTE = "";
                objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                objRtn.dbException.MESSAGE = this.get_errorLoadFile(VL_INDICE);
            }
            map.put("success", true);
            map.put("objRtn",  objRtn);
            
        } catch (SQLException err) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = err.toString();           
            map.put("objRtn",  objRtn);
            map.put("success", true);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception err) {
            objRtn.dbException.SQLCODE = "0"; //[Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
            objRtn.dbException.MESSAGE = err.toString();  
            map.put("success", true);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }  
    
    public String get_errorLoadFile ( Integer INDICE  ){
        String[] MESSAGE_ERROR = {
            "EXCEL CONTIENE REGISTROS EN BLANCO",               //0
            "COLUMNA FECHA DE APLICACION DEL PAGO EN BLANCO",   //1
            "FORMATO NO VALIDO PARA COLUMNA BOLETO",            //2
            "COLUMNA IMPORTE INVALIDO O EN BLANCO",             //3
            "COLUMNA MONEDA EN BLANCO",                         //4
            "COLUMNA TIPO EN BLANCO"                            //5
        };        
        return MESSAGE_ERROR[INDICE];
    }
    
    
    @RequestMapping(value = "/search_det_loadbatch"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String search_det_loadbatch(ModelMap map, HttpServletRequest request) {
        List<SQP04053Filter> listaData;
        SQP04053Filter filter;
        filter = new SQP04053Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {                        
            filter.VP_A4021LOTE = request.getParameter("VP_A4021LOTE");
            filter.VP_BOLETO = request.getParameter("VP_BOLETO");
            filter.VP_A4021STAT = request.getParameter("VP_A4021STAT");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04053Filter(filter);

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
    
    @RequestMapping(value = "/det_loadbatchExcel")
    public @ResponseBody
    void det_loadbatchExcel(HttpServletRequest request, HttpServletResponse response) {
        
        SQP04053Filter filter;
        filter = new SQP04053Filter();
              
        try {                        
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                        
            //filter.VP_A4021LOTE = request.getParameter("VP_A4021LOTE");
            //filter.VP_BOLETO = request.getParameter("VP_BOLETO");
            //filter.VP_A4021STAT = request.getParameter("VP_A4021STAT");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;        
            String fileName = "LoadBatchResultado_lote-"+ filter.VP_A4021LOTE;
            logic = new AplPaymentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            List<SQP04053Filter> lst = logic.getSQP04053Filter(filter);
            
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
            Cell cell57, cell58, cell59, cell60, cell61, cell62, cell63, cell64, cell65;
            Cell cell66, cell67, cell68;
            
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
            //cell67 = row.createCell(17);
            //cell68 = row.createCell(18);
            
            cell50.setCellValue("LOTE");
            cell51.setCellValue("BOLETO");
            cell52.setCellValue("UUID");
            cell53.setCellValue("FECHAPAGO");
            cell54.setCellValue("REF");
            cell55.setCellValue("MONEDA");
            cell56.setCellValue("IMPORTE PAGO");
            cell57.setCellValue("ESTADO");
            cell58.setCellValue("COD.ERR");
            cell59.setCellValue("DESC.ERR");
            cell60.setCellValue("NRRPT");
            cell61.setCellValue("CDCLI");
            cell62.setCellValue("IMPORTE VENTA");
            cell63.setCellValue("DIF.");
            cell64.setCellValue("BANCO");
            cell65.setCellValue("CTABANCO");
            cell66.setCellValue("NOMBRE CLIENTE");
                        
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));

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
            //cell67.setCellStyle(headerStyle);
            //cell68.setCellStyle(headerStyle);

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
                //cell67 = row.createCell(17);
                //cell68 = row.createCell(18);
                
                cell50.setCellValue((String)lst.get(vi).A4021LOTE);
                cell51.setCellValue((String)lst.get(vi).A4021CIA + lst.get(vi).A4021FORMA + lst.get(vi).A4021SERIE );
                cell52.setCellValue((String)lst.get(vi).A4021UUID);
                cell53.setCellValue((String)lst.get(vi).A4021FECPG);
                cell54.setCellValue((String)lst.get(vi).A4021REFPG);
                cell55.setCellValue(lst.get(vi).A4021MDAPG ); 
                cell56.setCellValue(lst.get(vi).A4021TOTPG );
                cell57.setCellValue(lst.get(vi).A4021STAT); 
                cell58.setCellValue(lst.get(vi).A4021CODER); 
                cell59.setCellValue(lst.get(vi).A4021DESER); 
                cell60.setCellValue(lst.get(vi).A4021NRRPT); //Double.parseDouble((String)hm.get("A1720VSARV"))
                cell61.setCellValue(lst.get(vi).A4021CDCLI); //Double.parseDouble((String)hm.get("A1720VRFRV"))
                cell62.setCellValue(lst.get(vi).A4021TOVTA); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell63.setCellValue(lst.get(vi).A4021TODIF); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell64.setCellValue(lst.get(vi).A4021BANCO); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell65.setCellValue(lst.get(vi).A4021CTABC); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell66.setCellValue(lst.get(vi).A3953RSOCI); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                
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
//                cell67.setCellStyle(bodyStyle);
//                cell68.setCellStyle(bodyStyle);
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
