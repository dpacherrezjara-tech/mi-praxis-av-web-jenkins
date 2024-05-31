/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
//import net.miatech.praxis.logic.payments.InsumosMDPLogic;
import net.miatech.praxis.logic.payments.InsumosMDPLogic;
import net.miatech.praxis.logic.payments.TableMessageLogic;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/InsumosMDP")
public class InsumosMDPController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InsumosMDPLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payment/InsumosMDP/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- InsumosMDP : Search-------------");
        map.put("success", true);
        List<A2353Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2353Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2353Filter> lst = new ArrayList<>(0);
        A2353Filter filter = new A2353Filter();
        Gson gson = new Gson();
        String beanString = "";
        try {
        
            logic = new InsumosMDPLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX285SQP00827_InsumosMDPDAO(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TableMessage : searchCompleteDetail-------------");

        Gson gson = new Gson();
        A2353Filter filter = new A2353Filter();
        A2353Filter result = new A2353Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2353Filter.class);

        logic = new InsumosMDPLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX285SQP00829_InsumosMDPDAO(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
@RequestMapping(value = "MaintenanceA2358")
    public @ResponseBody
    String MaintenanceA2358(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- MinimumMaximumAmounts : MaintenanceA2358-------------");
        
        String option;
        String beanString;
        Gson gson = new Gson();

        A2353Filter filter = new A2353Filter();
        String msj = " ";

        try {
            
            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2353Filter.class);
//            filter.CODEM = request.getParameter("CODEM").trim();
//            filter.DESCR = request.getParameter("DESCR").trim();
//            filter.RSOCIAL = request.getParameter("RSOCIAL").trim();
//            filter.CIATA = request.getParameter("CIATA").trim();
//            filter.CANAL = request.getParameter("CANAL").trim();
//            filter.SCOUNTRY = request.getParameter("SCOUNTRY").trim();

            logic = new InsumosMDPLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX285SQP00828_A2358_CRUD(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
