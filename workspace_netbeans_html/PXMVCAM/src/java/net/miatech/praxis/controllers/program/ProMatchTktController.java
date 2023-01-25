package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.logic.LoadDataLogic;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
import net.miatech.praxis.logic.payments.LoadPayment02Logic;
import net.miatech.praxis.logic.program.LoadFacsimilLogic;
import net.miatech.praxis.logic.program.ProrrateoNewLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
@RequestMapping("/ProMatchTkt")
public class ProMatchTktController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            LoadDataLogic logic = new LoadDataLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            List<A1248> lstOperadores = logic.loadFieldsConditions();
            List<A1248> lstCampos = logic.loadColumns("A2290");

            map.put("success", true);
            map.put("lstOperTkt", lstOperadores);
            map.put("lstCamposTkt", lstCampos);
        } catch (SQLException e) {
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            LoadPayment02Logic logic = new LoadPayment02Logic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadSQP00903(filter);
            
            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/matchManual")
    public @ResponseBody
    String matchManual(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        String msj = "";

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadPayment02Logic logic = new LoadPayment02Logic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadSQP00906(filter);

        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. ";
        }
        
        map.put("msjOption", msj);

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/execApply")
    public @ResponseBody
    String execApply(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadPayment02Logic logic = new LoadPayment02Logic();
            logic.setSession(this.serverSession.getServerSession());
            String Mensaje = logic.loadSQP01464(filter);
            
            map.put("success", false);
            map.put("Mensaje", Mensaje);
        } catch (SQLException e) {
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
            map.put("success", false);
           map.put("sesion", SESSION_CONTROL);
            logError.error(e.getMessage());
        }
        return new Gson().toJson(map);
    }
}
