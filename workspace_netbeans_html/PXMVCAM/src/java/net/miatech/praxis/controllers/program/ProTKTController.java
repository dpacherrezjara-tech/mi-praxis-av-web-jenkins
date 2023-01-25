package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.PX040S01A720Filter;
import net.miatech.beans.PX040S02A720Filter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A720;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.program.ProMasterTicketLogic;
import net.miatech.praxis.logic.program.ProTKTLogic;
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
@RequestMapping("/ScrTKT")
public class ProTKTController extends BaseController {

    @RequestMapping(value = "/loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        S0007A720Filter filter = new S0007A720Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            ProTKTLogic logic = new ProTKTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            List lstTKT = logic.loadS0007A720(filter);
            List lstTKTGrilla = logic.loadS0007A720Grilla(filter);
            
            map.put("success", true);
            map.put("lstTKT", lstTKT);
            map.put("lstTKTGrilla", lstTKTGrilla);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadExchange")
    public @ResponseBody
    String loadExchange(ModelMap map, HttpServletRequest request) {
        S0007A720Filter filter = new S0007A720Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.A720CIAI = request.getParameter("A720CIAI");
            filter.A720FORMAI = request.getParameter("A720FORMAI");
            filter.A720SERIEI = request.getParameter("A720SERIEI");
            filter.A720SEQ = request.getParameter("A720SEQ");
            
            ProTKTLogic logic = new ProTKTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<S0007A730Filter> lstEXCH = logic.loadS0007A730(filter);
            
            map.put("success", true);
            map.put("lstEXCH", lstEXCH);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadTotales")
    public @ResponseBody
    String loadTotales(ModelMap map, HttpServletRequest request) {
        S0007A720Filter filter = new S0007A720Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.A720CIAI = request.getParameter("A720CIAI");
            filter.A720FORMAI = request.getParameter("A720FORMAI");
            filter.A720SERIEI = request.getParameter("A720SERIEI");
            filter.A720SEQ = request.getParameter("A720SEQ");
            
            ProTKTLogic logic = new ProTKTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<S0007A720Filter> lstTOT = logic.loadS0007A720Tot(filter);
            
            map.put("success", true);
            map.put("lstTOT", lstTOT);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
//    @RequestMapping(value = "/loadRubros")
//    public @ResponseBody
//    String loadRubros(ModelMap map, HttpServletRequest request) {
//        S0007A720Filter filter = new S0007A720Filter();
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            
//            ProTKTLogic logic = new ProTKTLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            List lstTOT = logic.loadS0007A720Tot(filter);
//            
//            map.put("success", true);
//            map.put("lstTOT", lstTOT);
//        } catch (SQLException e) {
//            map.put("success", false);
//            map.put("sesion", SESSION_CONTROL);
//        } catch (Exception e) {
//            map.put("success", false);
//            map.put("sesion", SESSION_CONTROL);
//        }
//        return new Gson().toJson(map);
//    }
}
