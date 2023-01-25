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
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
import net.miatech.praxis.logic.program.LoadFacsimilLogic;
import net.miatech.praxis.logic.program.ProrrateoNewLogic;
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
@RequestMapping("/ProFacsimil")
public class ProFacsimilController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(value = "/searchFacsimil")
    public @ResponseBody
    String searchFacsimil(ModelMap map, HttpServletRequest request) {

        FACSIMILFilter beanFaximil = new FACSIMILFilter();

        HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();

        A020Filter dataA020 = new A020Filter();
        A728 dataA728 = new A728();
        List<A728> lstSectores = new ArrayList<A728>();
        HashMap<String, Object> hmResultado;
        BSPF104 filter = new BSPF104();
        
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            String strFuente = request.getParameter("strFuente");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            LoadFacsimilLogic logicF = new LoadFacsimilLogic();
            logicF.setSession(this.serverSession.getServerSession());

            if (filter.TDNR.startsWith("139")) {
                if (strFuente.equals("A")) {
                    beanFaximil = logicF.loadARCFacsimil(filter, hmAeropuertos);
                } else if (strFuente.equals("S")) {
                    beanFaximil = logicF.loadASRFacsimil(filter, hmAeropuertos);
                } else if (strFuente.equals("B")) {
                    beanFaximil = logicF.loadBSPFacsimil(filter, hmAeropuertos);
                }
            } else {
                beanFaximil = logicF.loadFacsimileInterlineal("AM", filter, hmAeropuertos);

                A020Filter ObjA020 = new A020Filter();
                ObjA020.strTicket = filter.TDNR + filter.CPUI;
                ObjA020.A020FVLO = filter.DPROCE;

                LoadInterline02Logic logic = new LoadInterline02Logic();
                logic.setSession(this.serverSession.getServerSession());
                hmResultado = logic.loadPX164SQP0074(ObjA020);
                if (hmResultado != null) {
                    dataA020 = (A020Filter) hmResultado.get("A020");
                    dataA728 = (A728) hmResultado.get("A728");
                    lstSectores = (ArrayList) hmResultado.get("SECTORES");
                }
            }

            map.put("success", true);
            map.put("beanFaximil", beanFaximil);
            
            map.put("dataA020", dataA020);
            map.put("dataA728", dataA728);
            map.put("lstSectores", lstSectores);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchA1897Leg")
    public @ResponseBody
    String searchA1897Leg(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            String ccia = request.getParameter("ccia");
            String forma = request.getParameter("forma");
            String serie = request.getParameter("serie");
            String cupon = request.getParameter("cupon");
            
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1692Filter> lstLegs = logic.loadSQP00293_Leg(ccia, forma, serie, cupon);
            
            map.put("success", true);
            map.put("lstLegs", lstLegs);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            e.printStackTrace();
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            e.printStackTrace();
        }
        return new Gson().toJson(map);
    }
    
//    @RequestMapping(value = "/loadTicket")
//    public @ResponseBody
//    String loadTicket(ModelMap map, HttpServletRequest request) {
//        System.out.println("MasterTicketController : loadTicket");
//        
//        filter = new PX040S01A720Filter();
//        try {
//            filter.IN_SEQ = request.getParameter("IN_SEQ");
//            filter.IN_CIA = request.getParameter("IN_CIA");
//            filter.IN_FORMA = request.getParameter("IN_FORMA");
//            filter.IN_SERIE = request.getParameter("IN_SERIE");
//
//            logic = new MasterTicketLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            PX040S01A720Filter filterTKT = logic.loadPX040S01A720(filter);
//            //PX040S01A720Filter filterTKT = logic.loadPRO11013(filter);
//
//            map.put("success", true);
//            map.put("filterTKT", filterTKT);
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("sesion", "Se produjo un error. " + ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
}
