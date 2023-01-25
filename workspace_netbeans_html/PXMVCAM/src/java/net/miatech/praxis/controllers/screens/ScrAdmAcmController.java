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
import net.miatech.praxis.A714;
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
@RequestMapping("/ScrAdmAcm")
public class ScrAdmAcmController extends BaseController {

    @RequestMapping(value = "loadTicketAdmAcm")
    public @ResponseBody
    String loadTicketLegs(ModelMap map, HttpServletRequest request) {
        A714 filter = new A714();
        try {
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            //filter = new Gson().fromJson(request.getParameter("A714"), filter.getClass());
            filter.A714AIRLIN = cliente.CCUST;
            filter.A714CIA = request.getParameter("IN_CIA");
            filter.A714FORMA = request.getParameter("IN_FORMA");
            filter.A714SERIE = request.getParameter("IN_SERIE");
            filter.A714SEQ = request.getParameter("IN_SEQ");
            
            ProMasterTicketLogic logic = new ProMasterTicketLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A714> filterTKT = logic.loadS0001A714(filter);
            
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
