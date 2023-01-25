/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.panel;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.PX075S01INF001Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.YieldReportLogic;
import net.miatech.praxis.logic.panel.PanelLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author lzambrano
 */
@Controller
@Scope("request")
@RequestMapping("/PerPro")
public class PerProController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/PerPro";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, HttpServletRequest request) {
        
        PX041S01INF001Filter filter = new PX041S01INF001Filter();
        filter.VP_CCUST = "139";
        filter.VP_APLICA = "PX";
        
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.VP_USR = request.getParameter("option").toString().trim(); 
            if(!"".equals(request.getParameter("group").toString().trim()))
                filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
        }
        List<PX041S01INF001Filter> lst_prmpanel;
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_prmpanel = logic.loadPX041S01INF001(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        HashMap m = new HashMap();
        try{
	        m.put("success",true);
	        m.put("total",lst_prmpanel.get(0).page.TOTROWS);
	        m.put("data",lst_prmpanel);
        }catch (Exception e) {
            throw new SpringException(e);
        }        
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "crud")
    public @ResponseBody String crud(HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        PX076S01INF053Filter filter = new PX076S01INF053Filter(); 
        filter.VP_CCUST = "139";
        filter.VP_APLICA = "PX";
        String response = "";
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter.VP_ACTION = request.getParameter("strOption").toString().trim();
            //filter.VP_CCUST = request.getParameter("USR").toString().trim();
            filter.VP_USR = request.getParameter("USR").toString().trim();
            //filter.VP_APLICA = request.getParameter("APLICA").toString().trim();
            filter.VP_NPROG = request.getParameter("NPROG").toString().trim();            
            filter.VP_PERMA = request.getParameter("PERMA").toString().trim();            
            filter.VP_PERML = request.getParameter("PERML").toString().trim();
            filter.VP_PERMC = request.getParameter("PERMC").toString().trim();
            filter.VP_PERMM = request.getParameter("PERMM").toString().trim();
            filter.VP_PERME = request.getParameter("PERME").toString().trim();
            filter.VP_PERMX = request.getParameter("PERMX").toString().trim();
            filter.VP_STAT = request.getParameter("STAT").toString().trim();
            
            filter = logic.setPX076S01INF053(filter);
            response = filter.dbException.MESSAGE;
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        Map m = new LinkedHashMap();
        m.put("success",true);
        m.put("response", response);
        return new Gson().toJson(m);
    }
    
}
