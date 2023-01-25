/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04108Filter;
import net.miatech.praxis.eecta.SQP04109Filter;
import net.miatech.praxis.eecta.SQP04110Filter;
import net.miatech.praxis.eecta.SQP04145Filter;
import net.miatech.praxis.eecta.SQP04146Filter;
import net.miatech.praxis.logic.eecta.ControlUATPLogic;
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
@RequestMapping("/ControlUATP")
public class ControlUATPController extends BaseController {
    private ControlUATPLogic logic;
    
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04108Filter> listaData;
        SQP04108Filter filter;
        filter = new SQP04108Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");           
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new ControlUATPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04108Filter(filter);

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
    
    @RequestMapping(value = "/search_det")
    public @ResponseBody
    String search_det(ModelMap map, HttpServletRequest request) {
        List<SQP04109Filter> listaData;
        SQP04109Filter filter;
        filter = new SQP04109Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_TICKET = request.getParameter("VP_TICKET");           
            filter.VP_ESTADO = request.getParameter("VP_ESTADO");           
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new ControlUATPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04109Filter(filter);

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
    
    @RequestMapping(value = "set_procesar")
    public @ResponseBody
    String set_procesar(ModelMap map, HttpServletRequest request) {
        
        SQP04110Filter filter = new SQP04110Filter();
        SQP04110Filter objRtn = new SQP04110Filter();
        SQP03348Filter objRtn01;         
        try {
            logic = new ControlUATPLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                                  
            objRtn = logic.setSQP04110Filter(filter);
            //obtener UUID desde: amfeapprest.miatech.net/ws/rest/ApiGW                               
            if(filter.VP_PROCESO.equals("UATP")){                                
                objRtn01 = this.setSQP03348Filter( filter );
                if(!objRtn01.dbException.SQLCODE.equals('1')){
                    objRtn.dbException.MESSAGE = objRtn01.dbException.MESSAGE;   
                    objRtn.dbException.SQLCODE = objRtn01.dbException.SQLCODE;   
                }                     
            }                     
            map.put("objRtn", objRtn);
            map.put("success", true);            
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            //throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    @RequestMapping(value = "set_procesarUUID")
    public @ResponseBody
    String set_procesarUUID(ModelMap map, HttpServletRequest request) {
        
        SQP04110Filter filter = new SQP04110Filter();
        SQP04110Filter objRtn = new SQP04110Filter();
        SQP03348Filter objRtn01;     
        
        try {
            logic = new ControlUATPLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                                  
            objRtn = logic.setSQP04110Filter(filter);
            //obtener UUID desde: amfeapprest.miatech.net/ws/rest/ApiGW                                                                        
            objRtn01 = this.setSQP03348Filter( filter );
            if(!objRtn01.dbException.SQLCODE.equals('1')){
                objRtn.dbException.MESSAGE = objRtn01.dbException.MESSAGE;   
                objRtn.dbException.SQLCODE = objRtn01.dbException.SQLCODE;   
            }                                                     
            map.put("objRtn", objRtn);
            map.put("success", true);            
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
    SQP03348Filter setSQP03348Filter( SQP04110Filter  param ) throws SQLException, Exception {
                
        List<SQP03347Filter> listaData;        
        SQP03347Filter filter = new SQP03347Filter();
        SQP03348Filter objRtn = null;
        filter.VP_FDESDE = param.VP_FDATE1;
        filter.VP_FHASTA = param.VP_FDATE2;
        
        logic = new ControlUATPLogic();
        logic.setSession(this.serverSession.getServerSession());
        listaData = logic.getSQP03347Filter(filter);        
        String URL = "http://amfeapprest.miatech.net/ws/rest/ApiGW";        
        
        for (int i = 0; i < listaData.size(); i++) {                               
            String p_boleto = listaData.get(i).A4054CIA + listaData.get(i).A4054FORMA + listaData.get(i).A4054SERIE;
            String p_transa = listaData.get(i).A4054TRNCU.trim();
            String p_payload  = "['SP_CONSULTA_CFDI',['"+ p_boleto + "','" + p_transa + "']]";
            
            Unirest.setTimeouts(3600000, 3600000);
            Unirest.setTimeouts(0, 0);
            HttpResponse<String> response = Unirest.post(URL)
              .header("Content-Type", "application/x-www-form-urlencoded")
              .field("service", "AME_FE")
              .field("payload", p_payload )
              .asString();            
            System.out.println("**RESPONSE >>"+ response.getBody());            
            String json = response.getBody();
            //grabar A PRAXIS
            SQP03348Filter filter01 = new SQP03348Filter();
            filter01.VP_CCIA = listaData.get(i).A4054CIA;
            filter01.VP_FORMA = listaData.get(i).A4054FORMA;
            filter01.VP_SERIE = listaData.get(i).A4054SERIE;
            filter01.VP_SEQ = listaData.get(i).A4054SEQ;
            filter01.VP_TRNCU = listaData.get(i).A4054TRNCU;
            filter01.VP_GRUPO = listaData.get(i).A4054GRUPO;            
            filter01.vp_json = json;            
            objRtn = logic.setSQP03348Filter(filter01);                        
            //Si hay error al insertar.. culminar proceso
            if (!objRtn.dbException.SQLCODE.equals("1"))break;
        }        
        return objRtn;
    }
    @RequestMapping(value = "/search_UUID")
    public @ResponseBody
    String search_UUID(ModelMap map, HttpServletRequest request) {
        List<SQP04145Filter> listaData;
        SQP04145Filter filter;
        filter = new SQP04145Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FDATE1");
            filter.VP_FECHA2 = request.getParameter("VP_FDATE2");
            filter.VP_TICKET = request.getParameter("VP_TICKET");           
            filter.VP_STAT= request.getParameter("VP_STAT");           
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new ControlUATPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04145Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
            map.put("err", "");
        } catch (NumberFormatException ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "/search_err")
    public @ResponseBody
    String search_err(ModelMap map, HttpServletRequest request) {
        List<SQP04146Filter> listaData;
        SQP04146Filter filter;
        filter = new SQP04146Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FECHA1 = request.getParameter("VP_FECHA1");
            filter.VP_FECHA2 = request.getParameter("VP_FECHA2");
            filter.VP_TICKET = request.getParameter("VP_TICKET");           
            filter.VP_STAT= request.getParameter("VP_STAT");           
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new ControlUATPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04146Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
            map.put("err", "");
        } catch (NumberFormatException ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", true);
            map.put("sesion", ex.getMessage());
            map.put("err", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
  
}
