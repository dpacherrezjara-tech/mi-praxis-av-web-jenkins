/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A020Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.classes.GetImageController;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.logic.screens.ProrrateoLogic;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

//</editor-fold>

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/Prorrateo")
public class ProrrateoController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProrrateoLogic logic;
    private MasterDAO masterDAO;
    HashMap<String, String> hmCiudades;
    private A020Filter filter;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "screens/Prorrateo/form_index";
    }

    @RequestMapping(value = "searchASR")
    public @ResponseBody
    String searchASR(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchASR-------------");
        map.put("success", true);

        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        UserView user = this.serverSession.getServerSession().getUserView();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        BSPF104 filter = new BSPF104();

        filter.TDNR = request.getParameter("TDNR");

        try {
            logic = new ProrrateoLogic();
            masterDAO = new MasterDAO();
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            hmCiudades = masterDAO.loadCiudadesHash();
            beanFaximil = logic.loadASRFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        map.put("beanFacProrrateo", beanFaximil);
        map.put("ccust", cliente.CCUST);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBSP")
    public @ResponseBody
    String searchBSP(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchBSP-------------");
        map.put("success", true);

        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        UserView user = this.serverSession.getServerSession().getUserView();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        BSPF104 filter = new BSPF104();

        filter.TDNR = request.getParameter("TDNR");
        filter.CPUI = request.getParameter("CPUI");

        try {
            logic = new ProrrateoLogic();
            masterDAO = new MasterDAO();
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            hmCiudades = masterDAO.loadCiudadesHash();
            beanFaximil = logic.loadBSPFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        map.put("beanFacProrrateo", beanFaximil);
        map.put("ccust", cliente.CCUST);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchARC")
    public @ResponseBody
    String searchARC(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchARC-------------");
        map.put("success", true);

        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        UserView user = this.serverSession.getServerSession().getUserView();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        BSPF104 filter = new BSPF104();

        filter.TDNR = request.getParameter("TDNR");
        filter.COUNTRY = request.getParameter("COUNTRY");
        filter.CPUI = request.getParameter("CPUI");

        try {
            logic = new ProrrateoLogic();
            masterDAO = new MasterDAO();
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());
            hmCiudades = masterDAO.loadCiudadesHash();
            beanFaximil = logic.loadARCFacsimilProrate(cliente.CCUST, filter, hmCiudades);
            beanFaximil.strNomAero = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY2;
            beanFaximil.strFlag = "";

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        map.put("beanFacProrrateo", beanFaximil);
        map.put("ccust", cliente.CCUST);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchA720")
    public @ResponseBody
    String searchA720(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchA720-------------");
        map.put("success", true);
        String TDNR = request.getParameter("TDNR");
        String strVTR = request.getParameter("strVTR");
        String tkt = (TDNR.length() > 13) ? TDNR.substring(0, 13) : TDNR;
        S0007A720Filter objRtn;
        List beanRest = null;

        try {
            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());
            if (!strVTR.equals("")) {
                if (strVTR.equals("OLD")) {
                    beanRest = logic.searchA720(tkt, "OLD");
                } else {
                    objRtn = logic.verifyTKT(tkt);
                    if (!objRtn.dbException.SQLCODE.equals("0")) {
                        beanRest = logic.searchA720(tkt, "VTR");
                    } else {
                        beanRest = logic.searchA720(tkt, "");
                    }
                }
            } else {
                beanRest = logic.searchA720(tkt, "");
            }
        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        map.put("beanRest", beanRest);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDelivery")
    public @ResponseBody
    String searchDelivery(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchDelivery-------------");
        map.put("success", true);
        FACSIMILFilter filter = new FACSIMILFilter();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        String strTexto = "";

        filter.FUENTE = request.getParameter("FUENTE");
        filter.TDNR = request.getParameter("TDNR");

        try {
            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());
            if (filter.FUENTE.trim().startsWith("B")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "B");
            } else if (filter.FUENTE.trim().equals("ARC") || filter.FUENTE.trim().equals("A")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "A");
            } else if (filter.FUENTE.trim().equals("ASR") || filter.FUENTE.trim().equals("S")) {
                strTexto = logic.searchDelivery(cliente.CCUST, filter, "S");
            }

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        map.put("strTextoBSP", strTexto);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchAgent")
    public @ResponseBody
    String searchAgent(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- Prorrateo : searchAgent-------------");
        map.put("success", true);
        String AGNT;
        List beanAGTN = null;
        AGNT = request.getParameter("AGNT");
        try {
            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());
            beanAGTN = logic.searchAgent(AGNT);

        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        map.put("beanAGTN", beanAGTN);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchProrate")
    public @ResponseBody
    String searchProrate(ModelMap map, HttpServletRequest request) {
        A020Filter dataA020 = new A020Filter();
        A728 dataA728 = new A728();
        List<A728> lstSectores = new ArrayList<A728>();
        HashMap<String, Object> hmResultado;
        filter = new A020Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoController :  searchProrate");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX164SQP0038(filter);
            
            if (hmResultado != null) {
                dataA020 = (A020Filter) hmResultado.get("A020");
                dataA728 = (A728) hmResultado.get("A728");
                lstSectores = (ArrayList) hmResultado.get("SECTORES");
            }

            map.put("success", true);
            map.put("dataA020", dataA020);
            map.put("dataA728", dataA728);
            map.put("lstSectores", lstSectores);
            //Buscando la imagen correspondiente ===============================
            //Si no hay imagen física ==========================================
            if (dataA020.strFileName.equals("")) {
                masterDAO = new MasterDAO();
                masterDAO.setSession(this.serverSession.getServerSession());
                HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
                
                TCNFilter imgTCN = logic.loadPX164SQP0077(dataA020.strTicket, hmAeropuertos);
                map.put("imgTCN", imgTCN);
                map.put("imagenBytes", "");
                
            }else{                
                String imagenBytes= new GetImageController().getImagenProrrateo( this.serverSession.getServerSession(),dataA020.strFileName);
                map.put("imagenBytes", imagenBytes);
            }
                    
            //==================================================================
            //==================================================================

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("imagenBytes", "");
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("imagenBytes", "");
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchTaxes")
    public @ResponseBody
    String searchTaxes(ModelMap map, HttpServletRequest request) {
        List<A729> lstTaxes;
        filter = new A020Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoController :  searchTaxes");
            
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            
            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstTaxes = logic.loadPX164SQP00476(filter);
            
            map.put("success", true);
            map.put("lstTaxes", lstTaxes);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }
}
