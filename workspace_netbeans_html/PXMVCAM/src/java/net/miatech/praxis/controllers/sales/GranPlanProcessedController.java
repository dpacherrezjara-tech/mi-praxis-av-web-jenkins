/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.BaseController;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
/*import jxl.Cell;
import jxl.CellType;
import jxl.LabelCell;
import jxl.NumberCell;
import jxl.Sheet;
import jxl.Workbook;*/
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;

import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.miatech.praxis.exceptions.SpringException;
import java.sql.SQLException;
import com.google.gson.Gson;
import net.miatech.beans.A1789Filter;

import net.miatech.beans.PX124S01A1789Filter;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.praxis.classes.App;
//import net.miatech.praxis.classes.ServerSession;
import net.miatech.praxis.logic.sales.GranPlanProcessedLogic;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import net.miatech.utils.Util;
import org.apache.log4j.Logger;

/*import jxl.read.biff.BiffException;*/
import net.miatech.beans.SQP01170Filter;
/*import org.apache.commons.io.FilenameUtils;*/

/**
 *
 * @author Jbazan
 */
@Controller
@Scope("request")
@RequestMapping("/GranPlanProcessed")
public class GranPlanProcessedController extends BaseController {

    private GranPlanProcessedLogic logic;
    private App app;
    
    /* Comm. Gran Plan:: PENDING (Browse)
     */
    @RequestMapping(value = "/load_Comm_Reported")
    public @ResponseBody
    String load_Comm_Reported(ModelMap map, HttpServletRequest request) {
        
        List<PX124S01A1789Filter> listaData = new ArrayList<PX124S01A1789Filter>(0);
        
        PX124S01A1789Filter filter = new PX124S01A1789Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            
            filter.VP_OPCION = Integer.parseInt(request.getParameter("VP_OPCION"));
            filter.VP_A1789CCUST = request.getParameter("VP_A1789CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1789IATA = request.getParameter("VP_A1789IATA").trim();
            filter.VP_A1789FECVT = request.getParameter("VP_A1789FECVT").trim();
            filter.VP_A1789FECVT2 = request.getParameter("VP_A1789FECVT2").trim();
            filter.VP_A1789STAT = request.getParameter("VP_A1789STAT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.loadPX124S01A1789(filter);
            
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
    
    @RequestMapping(value = "/load_Comm_Reported_xls")
    public @ResponseBody
    String load_Comm_Reported_xlsc(ModelMap map, HttpServletRequest request) {
        
        List<PX124S01A1789Filter> listaData = new ArrayList<PX124S01A1789Filter>(0);
        
        PX124S01A1789Filter filter = new PX124S01A1789Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = Integer.parseInt(request.getParameter("VP_OPCION"));
            filter.VP_A1789CCUST = request.getParameter("VP_A1789CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1789IATA = request.getParameter("VP_A1789IATA").trim();
            filter.VP_A1789FECVT = request.getParameter("VP_A1789FECVT").trim();
            filter.VP_A1789FECVT2 = request.getParameter("VP_A1789FECVT2").trim();
            filter.VP_A1789STAT = request.getParameter("VP_A1789STAT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.loadPX124S01A1789(filter);
            
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
    
    @RequestMapping(value = "/load_Comm_Pending")
    public @ResponseBody
    String load_Comm_Pending(ModelMap map, HttpServletRequest request) {
        List<PX125S01A1802Filter> listaData = new ArrayList<PX125S01A1802Filter>(0);
        
        PX125S01A1802Filter filter = new PX125S01A1802Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = Integer.parseInt(request.getParameter("VP_OPCION"));
            filter.VP_A1802CCUST = request.getParameter("VP_A1802CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1802IATA = request.getParameter("VP_A1802IATA").trim();
            filter.VP_A1802LOTEI = request.getParameter("VP_A1802LOTEI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.loadPX125S01A1802(filter);
            
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
    
    @RequestMapping(value = "/load_Comm_Pending_xls")
    public @ResponseBody
    String load_Comm_Pending_xls(ModelMap map, HttpServletRequest request) {
        List<PX125S01A1802Filter> listaData = new ArrayList<PX125S01A1802Filter>(0);
        
        PX125S01A1802Filter filter = new PX125S01A1802Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = Integer.parseInt(request.getParameter("VP_OPCION"));
            filter.VP_A1802CCUST = request.getParameter("VP_A1802CCUST").trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").trim();
            filter.VP_A1802IATA = request.getParameter("VP_A1802IATA").trim();
            filter.VP_A1802LOTEI = request.getParameter("VP_A1802LOTEI").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.loadPX125S01A1802(filter);
            
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
    
    @RequestMapping(value = "/get_ObtenerIATA")
    public @ResponseBody
    String get_ObtenerIATA(ModelMap map, HttpServletRequest request) {
        
        SQP00112Filter filter = new SQP00112Filter();  
        try {
            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.A1789CCUST = request.getParameter("A1789CCUST");
            filter.A1789CIA = request.getParameter("A1789CIA");
            filter.A1789FORMA = request.getParameter("A1789FORMA");
            filter.A1789SERIE = request.getParameter("A1789SERIE");
            filter.A1789IATA = request.getParameter("A1789IATA");
            filter.A1789PNR = request.getParameter("A1789PNR");
            filter.VP_TICKET_NEW = request.getParameter("VP_TICKET_NEW");
            filter.VP_A1789IATA_NEW = request.getParameter("VP_A1789IATA_NEW");
            filter.VP_A1789TOTAL_NEW = Double.parseDouble(request.getParameter("VP_A1789TOTAL_NEW"));
            filter.A1789TFORM = request.getParameter("A1789TFORM");
            filter.A1789FECVT = request.getParameter("A1789FECVT");
            filter.A1789MDA = request.getParameter("A1789MDA");
            filter.A1789STOTA = Double.parseDouble(request.getParameter("A1789STOTA"));
            filter.A1789TOTAL= Double.parseDouble(request.getParameter("A1789TOTAL"));
            filter.A1789NPAX = request.getParameter("A1789NPAX");
            filter.A1789SRES = request.getParameter("A1789SRES");
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            SQP00112Filter response = logic.setSQP00112(filter);
            
            map.put("success", true);
            map.put("MESSAGE", response.dbException.MESSAGE);
            map.put("SQLCODE", response.dbException.SQLCODE);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "set_SQP00168")
    public @ResponseBody
    String set_SQP00168(ModelMap map, HttpServletRequest request) {
        SQP00168Filter filter = new SQP00168Filter();  
        try {
            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            SQP00168Filter response = logic.set_SQP00168(filter);
            
            map.put("success", true);
            map.put("MESSAGE", response.dbException.MESSAGE);
            map.put("SQLCODE", response.dbException.SQLCODE);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/get_SQP00169")
    public @ResponseBody
    String get_SQP00169(ModelMap map, HttpServletRequest request) {
        List<SQP00169Filter> listaData = new ArrayList<SQP00169Filter>(0);
        
        SQP00169Filter filter = new SQP00169Filter();
        
        try {
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA").trim();
            filter.VP_SERIE = request.getParameter("VP_SERIE").trim();
            
            
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.get_SQP00169(filter);
            
            map.put("success", true);
            map.put("total", listaData.size());
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
    
    @RequestMapping(value = "/uploadGranPlan")
    public @ResponseBody
    String uploadGranPlan(ModelMap map, HttpServletRequest request) {
        List<PX125S01A1802Filter> listaData = new ArrayList<PX125S01A1802Filter>(0);
        ArrayList<Object[]> lstValues = new ArrayList<Object[]>(0);
        
        PX125S01A1802Filter filter = new PX125S01A1802Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        A1789Filter fileA1789;
        Object[] aValues;
        String strTKT;
        A1789Filter response = new A1789Filter();
        try {
            String strOption = request.getParameter("strOption");
            String lstValues_x = request.getParameter("lstValues").trim();
            String strPeriodFrom = request.getParameter("strPeriodFromc").trim();
            String strPeriodTo = request.getParameter("strPeriodTo").trim();
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            
            if(strOption.equals("GRAN_PLAN")){
                for (int row = 0; row < lstValues.size(); row++) {
                    aValues = lstValues.get(row);
                    fileA1789 = new A1789Filter();
                    fileA1789.VP_FPERDES = strPeriodFrom;
                    fileA1789.VP_FPERHAS = strPeriodTo;
                    fileA1789.A1789IATA = getValueStr(aValues, 0);
                    if(!fileA1789.A1789IATA.isEmpty()){
                        strTKT = getValueStr(aValues, 6).replace(".", "");
                        strTKT = (strTKT.length() >= 10) ? strTKT.substring(0, 10) : Util.fillZeros(10, strTKT);
                        //<editor-fold defaultstate="collapsed" desc="{...}">
                        fileA1789.A1789CIA   = "";
                        fileA1789.A1789FORMA = strTKT.substring(0, 4);
                        fileA1789.A1789SERIE = strTKT.substring(4, 10);
                        fileA1789.A1789IATA = getValueStr(aValues, 0);
                        fileA1789.A1789PNR = getValueStr(aValues, 2);
                        fileA1789.A1789TFORM = getValueStr(aValues, 5);
                        fileA1789.A1789FECVT = getValueStr(aValues, 7);
                        fileA1789.A1789TCAMB = 0d;
                        fileA1789.A1789MDA = getValueStr(aValues, 11);
                        fileA1789.A1789STOTA = getValueDbl(aValues, 9);
                        fileA1789.A1789TOTAL = getValueDbl(aValues, 10);
                        fileA1789.A1789COMR = 0d;
                        fileA1789.A1789COMC = 0d;
                        fileA1789.A1789AJUS = 0d;
                        fileA1789.A1789IVA = 0d;
                        fileA1789.A1789STAT = "P";
                        fileA1789.A1789NGPS = getValueStr(aValues, 1);
                        fileA1789.A1789SRES = getValueStr(aValues, 3);
                        fileA1789.A1789NPAX = getValueStr(aValues, 8);
                        //</editor-fold>
                        if(row == 1){
                            fileA1789.VP_OPCION = "I";
                            logic.setSQP01117(fileA1789);
                            if(!Util.fillZeros(7, fileA1789.dbException.SQLCODE).equals("0000000")){
                                //resp.info.add(fileA1789.dbException.MESSAGE);
                                response.dbException.MESSAGE=fileA1789.dbException.MESSAGE;
                                break;
                            }
                        }
                        fileA1789.VP_OPCION = "G";
                        logic.setSQP01117(fileA1789);
                        if(!Util.fillZeros(7, fileA1789.dbException.SQLCODE).equals("0000000")){
                            //resp.info.add(fileA1789.dbException.MESSAGE);
                            response.dbException.MESSAGE=fileA1789.dbException.MESSAGE;
                            break;
                        }
                    }
                    if(row == (lstValues.size() - 1)){
                        fileA1789.VP_OPCION = "U";
                        logic.setSQP01117(fileA1789);
                        if(!Util.fillZeros(7, fileA1789.dbException.SQLCODE).equals("0000000")){
                            //resp.info.add(fileA1789.dbException.MESSAGE);
                            response.dbException.MESSAGE=fileA1789.dbException.MESSAGE;
                            break;
                        }
                    }
                }
            }
            
            map.put("success", true);
            map.put("MESSAGE", response.dbException.MESSAGE);
            //map.put("SQLCODE", response.dbException.SQLCODE);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    private String getValueStr(Object[] aValues, int col){
        return ((HashMap)aValues[col]).get("value").toString();
    }
    
    private int getValueInt(Object[] aValues, int col){
        return (!((HashMap)aValues[col]).get("value").toString().trim().isEmpty()) ? Integer.parseInt(((HashMap)aValues[col]).get("value").toString()) : 0;
    }
    
    private long getValueLng(Object[] aValues, int col){
        return (!((HashMap)aValues[col]).get("value").toString().trim().isEmpty()) ? Long.parseLong(((HashMap)aValues[col]).get("value").toString()) : 0;
    }
    
    private double getValueDbl(Object[] aValues, int col){
        return (!((HashMap)aValues[col]).get("value").toString().trim().isEmpty()) ? Double.parseDouble(((HashMap)aValues[col]).get("value").toString()) : 0d;
    }
    
    @RequestMapping(value = "upload")
    public @ResponseBody
    String upload(ModelMap map, HttpServletRequest request) {
        SQP00168Filter filter = new SQP00168Filter();  
        SQP00168Filter response = new SQP00168Filter();
        try {
            String nomArchivo = request.getParameter("nomArchivo");
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            //SQP00168Filter response = logic.set_SQP00168(filter);
            
            map.put("success", true);
            map.put("MESSAGE", response.dbException.MESSAGE);
            map.put("SQLCODE", response.dbException.SQLCODE);
        /*} catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());*/
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadSQP01170")
    public @ResponseBody
    String loadSQP01170(ModelMap map, HttpServletRequest request) {
        
        List<SQP01170Filter> listaData = new ArrayList<SQP01170Filter>(0);
        
        SQP01170Filter filter = new SQP01170Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            
            filter.VP_CCUST = request.getParameter("VP_CCUST");
            filter.VP_FCARGA1 = request.getParameter("VP_FCARGA1").trim();
            filter.VP_FCARGA2 = request.getParameter("VP_FCARGA2").trim();
            
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new GranPlanProcessedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession()); 
            listaData = logic.loadSQP01170(filter);
            
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
}
