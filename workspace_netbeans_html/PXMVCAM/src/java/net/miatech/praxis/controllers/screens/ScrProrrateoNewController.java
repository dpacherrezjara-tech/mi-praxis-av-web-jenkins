package net.miatech.praxis.controllers.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.program.ProrrateoNewLogic;
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
@RequestMapping("/ScrProrrateoNew")
public class ScrProrrateoNewController extends BaseController {

    @RequestMapping(value = "searchBSP")
    public @ResponseBody
    String searchBSP(ModelMap map, HttpServletRequest request) {
        BSPF104 filter = new BSPF104();
        try {
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            HashMap<String, String> hmCiudades = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();

            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            FACSIMILFilter beanFaximil = logic.loadBSPFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";
            
            map.put("success", true);
            map.put("beanFacProrrateo", beanFaximil);
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
    
    @RequestMapping(value = "searchISR")
    public @ResponseBody
    String searchISR(ModelMap map, HttpServletRequest request) {
        BSPF104 filter = new BSPF104();
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        try {
            UserView user = this.serverSession.getServerSession().getUserView();
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            Functions.msjConsola("PRAXIS", user.getUserInfo().USR, "ScrProrrateoNew - searchISR");
            this.serverSession.getServerSession().getCNXIBMDB2().open();
            
            HashMap<String, String> hmCiudades = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();


            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            beanFaximil = logic.loadISRFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";
            map.put("success", true);
            map.put("beanFacProrrateo", beanFaximil);
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
    
    @RequestMapping(value = "searchA720")
    public @ResponseBody
    String searchA720(ModelMap map, HttpServletRequest request) {
        String TDNR = request.getParameter("TDNR");
        String strVTR = request.getParameter("strVTR");
        
        String tkt = (TDNR.length() > 13) ? TDNR.substring(0, 13) : TDNR;
        S0007A720Filter objRtn;
        ProrrateoNewLogic logic = new ProrrateoNewLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            List beanRest = null;
            if (!strVTR.equals("")) {
                if (strVTR.equals("OLD")) {
                    beanRest = logic.searchA720(tkt, "OLD");
                } else {
                    objRtn = logic.verifyTKT(tkt);
                    //resp.info.add(objRtn.dbException.SQLCODE);
                    //resp.info.add(objRtn.dbException.MESSAGE);
                    if (!objRtn.dbException.SQLCODE.equals("0")) {
                        beanRest = logic.searchA720(tkt, "VTR");
                    } else {
                        beanRest = logic.searchA720(tkt, "");
                    }
                }

            } else {
                beanRest = logic.searchA720(tkt, "");
            }
            map.put("success", true);
            map.put("beanRest", beanRest);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchA730")
    public @ResponseBody
    String searchA730(ModelMap map, HttpServletRequest request) {
        String TDNR = request.getParameter("TDNR");
        String TCNR = request.getParameter("TCNR");
        String tkt = (TDNR.length() > 13) ? TDNR.substring(0, 13) : TDNR;
        String tktnew = (TCNR.length() > 13) ? TCNR.substring(0, 13) : TCNR;
        
        S0007A720Filter objRtn;
        ProrrateoNewLogic logic = new ProrrateoNewLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            List beanRest = null;
            beanRest = logic.searchA730(tkt, tktnew);
            map.put("success", true);
            map.put("beanRest", beanRest);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchAgent")
    public @ResponseBody
    String searchAgent(ModelMap map, HttpServletRequest request) {
        String AGTN = request.getParameter("AGTN");
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            List beanAGTN = logic.searchAgent(AGTN);
            
            map.put("success", true);
            map.put("beanAGTN", beanAGTN);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchARC")
    public @ResponseBody
    String searchARC(ModelMap map, HttpServletRequest request) {
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        BSPF104 filter = new BSPF104();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            HashMap<String, String> hmCiudades = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();

            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            beanFaximil = logic.loadARCFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";
            
            map.put("success", true);
            map.put("beanFacProrrateo", beanFaximil);
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
    
    @RequestMapping(value = "searchA713")
    public @ResponseBody
    String searchA713(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String TDNR = request.getParameter("TDNR");
            String Seq = request.getParameter("Seq");
            
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            List beanRest = logic.searchA713(TDNR, Seq);
            
            map.put("success", true);
            map.put("beanRest", beanRest);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchASR")
    public @ResponseBody
    String searchASR(ModelMap map, HttpServletRequest request) {
        BSPF104 filter = new BSPF104();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            HashMap<String, String> hmCiudades = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            FACSIMILFilter beanFaximil = logic.loadASRFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";
            
            map.put("success", true);
            map.put("beanFacProrrateo", beanFaximil);
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
    
    @RequestMapping(value = "searchDeliveryRFND")
    public @ResponseBody
    String searchDeliveryRFND(ModelMap map, HttpServletRequest request) {
        FACSIMILFilter filter = new FACSIMILFilter();
        String strTexto = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if (filter.FUENTE.trim().startsWith("B")) {
                strTexto = logic.searchDeliveryRFND(cliente.CCUST, filter, "B");
            } else if (filter.FUENTE.trim().equals("ARC") || filter.FUENTE.trim().equals("A")) {
                strTexto = logic.searchDeliveryRFND(cliente.CCUST, filter, "A");
            } else if (filter.FUENTE.trim().equals("ASR") || filter.FUENTE.trim().equals("S")) {
                strTexto = logic.searchDeliveryRFND(cliente.CCUST, filter, "S");
            }
            
            map.put("success", true);
            map.put("strTextoBSP", strTexto);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchDeliveryMEMO")
    public @ResponseBody
    String searchDeliveryMEMO(ModelMap map, HttpServletRequest request) {
        FACSIMILFilter filter = new FACSIMILFilter();
        String strTexto = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if (filter.FUENTE.trim().startsWith("B")) {
                strTexto = logic.searchDeliveryMEMO(cliente.CCUST, filter, "B");
            } else if (filter.FUENTE.trim().equals("ARC") || filter.FUENTE.trim().equals("A")) {
                strTexto = logic.searchDeliveryMEMO(cliente.CCUST, filter, "A");
            } else if (filter.FUENTE.trim().equals("AMA") || filter.FUENTE.trim().equals("S")) {
                strTexto = logic.searchDeliveryMEMO(cliente.CCUST, filter, "S");
            }
            
            map.put("success", true);
            map.put("strTextoBSP", strTexto);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchDelivery")
    public @ResponseBody
    String searchDelivery(ModelMap map, HttpServletRequest request) {
        FACSIMILFilter filter = new FACSIMILFilter();
        String strTexto = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            if (filter.FUENTE.trim().startsWith("B")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "B");
            } else if (filter.FUENTE.trim().equals("ARC") || filter.FUENTE.trim().equals("A")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "A");
            } else if (filter.FUENTE.trim().equals("AMA") || filter.FUENTE.trim().equals("S")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "S");
            } else if (filter.FUENTE.trim().equals("ISR")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "I");
            }
            
            map.put("success", true);
            map.put("strTextoBSP", strTexto);
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
