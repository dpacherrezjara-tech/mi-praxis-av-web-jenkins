/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.interline;

import com.google.gson.Gson;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.A005;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.logic.interline.SISAccountRMLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jtorres
 */

@Controller
@Scope("request")
@RequestMapping("/SISAccountRM")

public class SISAccountRMController extends BaseController{

    private static final Logger logError = Logger.getLogger("errorLog");
    private MasterDAO masterDAO;
    private SISAccountRMLogic logic;
    private SFI021Filter filter;
    
    
    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SISAccountRMLogic();
        masterDAO = new MasterDAO();
        try {
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            List<A005> lstAirlines = masterDAO.loadAirlines();
            //List<A1852Filter> lstUsos = masterDAO.loadSource();
            
                
            map.put("lstAirlines", lstAirlines);
            //map.put("lstUsos", lstUsos);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(ISIDECControlController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new Gson().toJson(map);

    }
    
    
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SFI021Filter> listaData;
        filter = new SFI021Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
            
            filter.yearFrom = request.getParameter("yearFrom");
            filter.yearTo = request.getParameter("yearTo");
            filter.dayFrom = request.getParameter("dayFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.monthTo = request.getParameter("monthTo");
            filter.dayTo = request.getParameter("dayTo");
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new SISAccountRMLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX280SQP00773(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    



}
