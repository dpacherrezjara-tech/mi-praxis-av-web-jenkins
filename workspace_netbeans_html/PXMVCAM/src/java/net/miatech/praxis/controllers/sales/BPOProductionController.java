package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP00234Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.sales.BPOProductionLogic;
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
@RequestMapping("/BPOProduction")
public class BPOProductionController extends BaseController {

    private BPOProductionLogic logic;
    private SQP00234Filter filter;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        filter = new SQP00234Filter();
        try {
            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
            filter.IN_DESDE = request.getParameter("IN_DESDE");
            filter.IN_HASTA = request.getParameter("IN_HASTA");
            
            logic = new BPOProductionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List lstData = logic.loadSQP00234Filter(filter);
            
            map.put("success", true);
            map.put("data", lstData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
