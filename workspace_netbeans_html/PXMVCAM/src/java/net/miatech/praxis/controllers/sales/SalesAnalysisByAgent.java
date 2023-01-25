/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.GeneralResponse;
import net.miatech.beans.SQP01237Filter;
import net.miatech.beans.SQP01267Filter;
import net.miatech.beans.SQP01500Filter;
import net.miatech.beans.SQP01512Filter;
import net.miatech.beans.SQP01536Filter;
import net.miatech.beans.SQP01548Filter;
import net.miatech.beans.SQP01970Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.sales.SalesAnalysisByAgentLogic;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
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
@RequestMapping("/SalesAnalysisByAgent")
public class SalesAnalysisByAgent extends BaseController {

    private SalesAnalysisByAgentLogic logic;
    private SQP01500Filter filter;
        
    //QRY_VENTAS_AGENTES
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP01500Filter> listaData;
        filter = new SQP01500Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_ANIO = request.getParameter("VP_ANIO");
            filter.VP_SFTE = request.getParameter("VP_SFTE");                        
            filter.VP_TRNC = request.getParameter("VP_TRNC");
            filter.VP_IATA = request.getParameter("VP_IATA");                        
            filter.VP_PSVTA = request.getParameter("VP_PSVTA");
            filter.VP_PARM1 = request.getParameter("VP_PARM1");                                    
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01500Filter(filter);
            
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
    
    //QRY_VENTAS_AGENTES ALL
    @RequestMapping(value = "/searchAll")
    public @ResponseBody
    String searchAll(ModelMap map, HttpServletRequest request) throws Exception {
    serverSession.setServerSession(null);
    App app = new App(serverSession.getPropertySession());
    GeneralResponse resp = new GeneralResponse();
    resp.vars.put("login", false);
    resp.vars.put("customerExists", false);

        if (serverSession.getServerSession() == null) {
            this.InitialSession(request.getSession());
            INF001 user = new INF001();
            INF020 fileINF020 = new INF020();
            fileINF020.CCUST = "139";
            fileINF020.APLICA = "PX";
            user.USR = request.getParameter("txtAuthName");
            user.TOKEN = request.getParameter("txtAuthPass");

            resp.vars.put("login", true);
            resp.vars.put("user", user); //Cargamos toda la info del usuario.
            resp.vars.put("error_message", "");
            app.setServerSession(serverSession.getServerSession());
            app.assignAuthentication(user);
            app.defaultValidation(resp, fileINF020);

            if (app.getServerSession().getACCCNX()) { //Si existe conexión.
                request.setAttribute("user", user.USR);
                request.setAttribute("password", user.TOKEN);
                serverSession.setServerSession(app.getServerSession());
            }
        }
        
        List<SQP01500Filter> listaData;
        filter = new SQP01500Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_ANIO = request.getParameter("VP_ANIO");
            filter.VP_SFTE = request.getParameter("VP_SFTE");                        
            filter.VP_TRNC = request.getParameter("VP_TRNC");
            filter.VP_IATA = request.getParameter("VP_IATA");                        
            filter.VP_PSVTA = request.getParameter("VP_PSVTA");
            filter.VP_PARM1 = request.getParameter("VP_PARM1");                                    
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03944Filter(filter);
            
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
    
    
    //QRY_VENTAS_AGENTES_SUMARY    
    @RequestMapping(value = "/search01")
    public @ResponseBody
    String search01(ModelMap map, HttpServletRequest request) {
        SQP01237Filter filter;
        List<SQP01237Filter> listaData;        
        filter = new SQP01237Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_ANIO = request.getParameter("VP_ANIO");
            filter.VP_TDOC = request.getParameter("VP_TDOC");                        
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01237Filter(filter);
            
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
    
    
    //QRY_VENTAS_AGENTES_LIST    
    @RequestMapping(value = "/search02")
    public @ResponseBody
    String search02(ModelMap map, HttpServletRequest request) {
        SQP01512Filter filter;
        List<SQP01512Filter> listaData;        
        filter = new SQP01512Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IATA = request.getParameter("VP_IATA"); 
            filter.VP_FTE = request.getParameter("VP_FTE"); 
            filter.VP_PSVTA = request.getParameter("VP_PSVTA"); 
            filter.VP_NAME = request.getParameter("VP_NAME"); 
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01512Filter(filter);
            
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
    
    //QRY_net_sales   
    @RequestMapping(value = "/search03")
    public @ResponseBody
    String search03(ModelMap map, HttpServletRequest request) {
        SQP01267Filter filter;
        List<SQP01267Filter> listaData;        
        filter = new SQP01267Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
//            cstmt01.setString(3, filter.VP_ANIO);
//            cstmt01.setString(4, filter.VP_FTE);
//            cstmt01.setString(5, filter.VP_SFTE);
//            cstmt01.setString(6, filter.VP_PSVTA);
//            cstmt01.setString(7, filter.VP_PARM1);
            
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_ANIO = request.getParameter("VP_ANIO"); 
            filter.VP_IATA = request.getParameter("VP_IATA"); 
            filter.VP_FTE = request.getParameter("VP_FTE"); 
            filter.VP_SFTE = request.getParameter("VP_SFTE"); 
            filter.VP_PSVTA = request.getParameter("VP_PSVTA"); 
            filter.VP_PARM1 = request.getParameter("VP_PARM1"); 
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01267Filter(filter);
            
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
    //QRY_NET_SALES_GDS
    @RequestMapping(value = "/search04")
    public @ResponseBody
    String search04(ModelMap map, HttpServletRequest request) {
        SQP01970Filter filter;
        List<SQP01970Filter> listaData;        
        filter = new SQP01970Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {  
            
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_ANIO = request.getParameter("VP_ANIO"); 
            filter.VP_IATA = request.getParameter("VP_IATA"); 
            filter.VP_FTE = request.getParameter("VP_FTE"); 
            filter.VP_SFTE = request.getParameter("VP_SFTE"); 
            filter.VP_PSVTA = request.getParameter("VP_PSVTA"); 
            filter.VP_PARM1 = request.getParameter("VP_PARM1"); 
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getLoadSQP01970Filter(filter);
            
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
    
    //QRY_INTERLINE_ANALYSIS>>RESUMEN
    @RequestMapping(value = "/search05")
    public @ResponseBody
    String search05(ModelMap map, HttpServletRequest request) {
        SQP01548Filter filter;
        List<SQP01548Filter> listaData;        
        filter = new SQP01548Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {              
            filter.VP_PER = request.getParameter("VP_PER");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01548Filter(filter);
            
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
    //QRY_INTERLINE_ANALYSIS>>detalle boletos
    @RequestMapping(value = "/search06")
    public @ResponseBody
    String search06(ModelMap map, HttpServletRequest request) {
        SQP01536Filter filter;
        List<SQP01536Filter> listaData;        
        filter = new SQP01536Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {              
            filter.VP_PER = request.getParameter("VP_PER");
            filter.VP_PARM1 = request.getParameter("VP_PARM1");
            filter.VP_FLAG = request.getParameter("VP_FLAG");
            filter.VP_CARR = request.getParameter("VP_CARR");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SalesAnalysisByAgentLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01536Filter(filter);
            
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
}