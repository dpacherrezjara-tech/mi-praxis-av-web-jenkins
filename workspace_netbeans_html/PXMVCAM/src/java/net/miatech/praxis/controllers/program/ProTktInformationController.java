package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.S0001A1730Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.program.TktInformationLogic;
import net.miatech.utils.Functions;
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
@RequestMapping("/CtrlTktFC")
public class ProTktInformationController extends BaseController {

    @RequestMapping(value = "/loadTicket_FC")
    public @ResponseBody
    String loadTicket_FC(ModelMap map, HttpServletRequest request) {
        PX036S01A1721Filter filter = new PX036S01A1721Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            TktInformationLogic logic = new TktInformationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX036S01A1721Filter> lstTKT_FC = logic.loadPX036S01A1721(filter);
            
            map.put("success", true);
            map.put("lstTKT_FC", lstTKT_FC);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadBalance")
    public @ResponseBody
    String loadBalance(ModelMap map, HttpServletRequest request) {
        S0001A1730Filter filter = new S0001A1730Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            TktInformationLogic logic = new TktInformationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<S0001A1730Filter> lstTKT_Balance = logic.loadBalance(filter);
            
            map.put("success", true);
            map.put("lstTKT_Balance", lstTKT_Balance);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadRubros")
    public @ResponseBody
    String loadRubros(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String cia = request.getParameter("cia");
            String forma = request.getParameter("forma");
            String serie = request.getParameter("serie");
            String seq = request.getParameter("seq");
            
            TktInformationLogic logic = new TktInformationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //FOP
            PX036S01A1531Filter filter = new PX036S01A1531Filter();
            filter.IN_AIRLIN = "139";
            filter.IN_CIA = cia;
            filter.IN_FORMA = forma;
            filter.IN_SERIE = serie;
            filter.A1531SEQ = seq;
            List<PX036S01A1531Filter> lstTKT_FOP = logic.loadPX036S01A1531(filter);
            //TAX
            PX036S01A1532Filter filter2 = new PX036S01A1532Filter();
            filter2.IN_AIRLIN = "139";
            filter2.IN_CIA = cia;
            filter2.IN_FORMA = forma;
            filter2.IN_SERIE = serie;
            filter2.A1532SEQ = seq;
            List<PX036S01A1532Filter> lstTKT_TAX = logic.loadPX036S01A1532(filter2);
            //COMM
            PX036S01A1533Filter filter3 = new PX036S01A1533Filter();
            filter3.IN_AIRLIN = "139";
            filter3.IN_CIA = cia;
            filter3.IN_FORMA = forma;
            filter3.IN_SERIE = serie;
            filter3.A1533SEQ = seq;
            List<PX036S01A1533Filter> lstTKT_COMM = logic.loadPX036S01A1533(filter3);
            //TAXCOMM
            PX036S01A1534Filter filter4 = new PX036S01A1534Filter();
            filter4.IN_AIRLIN = "139";
            filter4.IN_CIA = cia;
            filter4.IN_FORMA = forma;
            filter4.IN_SERIE = serie;
            filter4.A1534SEQ = seq;
            List<PX036S01A1534Filter> lstTKT_TAXCOMM = logic.loadPX036S01A1534(filter4);
            //FC
            PX036S01A1721Filter filter5 = new PX036S01A1721Filter();
            filter5.IN_AIRLIN = "139";
            filter5.IN_CIA = cia;
            filter5.IN_FORMA = forma;
            filter5.IN_SERIE = serie;
            filter5.A1721SEQ = seq;
            //Reference
            filter5.IN_TIPO = "CX";
            List<PX036S01A1721Filter> lstTKT_FC = logic.loadReference(filter5);
            //Related
            filter5.IN_TIPO = "AD";
            List<PX036S01A1721Filter> lstTKT_FCR = logic.loadReference(filter5);
            
            map.put("success", true);
            map.put("lstTKT_FOP", lstTKT_FOP);
            map.put("lstTKT_TAX", lstTKT_TAX);
            map.put("lstTKT_COMM", lstTKT_COMM);
            map.put("lstTKT_TAXCOMM", lstTKT_TAXCOMM);
            map.put("lstTKT_FC", lstTKT_FC);
            map.put("lstTKT_FCR", lstTKT_FCR);
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
