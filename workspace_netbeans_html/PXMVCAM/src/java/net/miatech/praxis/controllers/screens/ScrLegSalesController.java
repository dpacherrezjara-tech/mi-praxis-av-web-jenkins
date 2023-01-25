package net.miatech.praxis.controllers.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.SQP00250Filter;
import net.miatech.beans.SQP03658Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.program.ProMasterTicketLogic;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//</editor-fold>

/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/ScrLegSales")
public class ScrLegSalesController extends BaseController {    
    
    @RequestMapping(value = "loadTicketLegsSales")
    public @ResponseBody
    String loadTicketLegsSales(ModelMap map, HttpServletRequest request) {
        SQP03658Filter filter = new SQP03658Filter();
        try {
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("SQP03658Filter"), filter.getClass());
            filter.IN_CCUST = cliente.CCUST;
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.IN_CUPON = request.getParameter("IN_CUPON");
            filter.IN_SEQROL = request.getParameter("IN_SEQROL");
            
            ProMasterTicketLogic logic = new ProMasterTicketLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP03658Filter> filterTKT = logic.loadSQP03658(filter);
            
            map.put("success", true);
            map.put("filterTKT", filterTKT);
            map.put("ccust", cliente.CCUST);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
}
