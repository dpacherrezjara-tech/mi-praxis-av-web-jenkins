package net.miatech.praxis.controllers.master;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.A005;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.payment.A2280;
import net.miatech.praxis.payment.A2287;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2357Filter;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.persistence.facadeimpl.UserFacadeImpl;
import net.miatech.praxis.spring.INF020;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//</editor-fold>
/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/MasterController")
public class MasterController extends BaseController {

    private MasterDAO masterDAO;
    private DataObtain data;

    @RequestMapping(value = "/obtainData")
    public @ResponseBody
    String obtainData(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainData");
        try {
            data = new DataObtain();

            String beanString = request.getParameter("beanString");
            data = new Gson().fromJson(beanString, data.getClass());

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            map.put("success", true);
            if (data.AIRLINE != 0) {
                List<A005> lstAIRLINE = masterDAO.loadAIRLINE(data.AIRLINE);
                map.put("lstAIRLINE", lstAIRLINE);
            }
            if (data.SOURCE != 0) {
                List<A1852Filter> lstSOURCE = masterDAO.loadSOURCE(data.SOURCE);
                map.put("lstSOURCE", lstSOURCE);
            }
            if (data.SOURCEA1691 != 0) {
                List<A1691Filter> lstSOURCEA1691 = masterDAO.loadSourceA1691();
                map.put("lstSOURCEA1691", lstSOURCEA1691);
            }
            if (data.USO != 0) {
                if (data.USO == 3 || data.USO == 4) {
                    List<A051> lstUSO2 = masterDAO.loadUSO(serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY1, data.USO);
                    map.put("lstUSO", lstUSO2);
                } else {
                    List<A1852Filter> lstUSO = masterDAO.loadUSO(data.USO);
                    map.put("lstUSO", lstUSO);
                }
            }
            if (data.OPERADOR != 0) {
                List<A1248> lstOperadores = masterDAO.loadFieldsA1248(data.OPERADOR, "2", "", "");
                map.put("lstOPERADOR", lstOperadores);
            }
            if (data.CAMPO != 0) {
                List<A1248> lstCampos = masterDAO.loadFieldsA1248(data.CAMPO, "1", "", "");
                map.put("lstCAMPO", lstCampos);
            }
            if (data.COUNTRY != 0) {
                List<A006> lstCountry = masterDAO.loadPaises2();
                map.put("lstCountry", lstCountry);
            }
            if (data.BANK != 0) {
                List<A2280Filter> lstBank = masterDAO.loadBank();
                map.put("lstBank", lstBank);
            }
            if (data.CARD != 0) {
                List<A2280> lstCard = masterDAO.loadTarjetas();
                map.put("lstCard", lstCard);
            }
            if (data.REJECTIONS != 0) {
                List<A2287> listaRejections = masterDAO.loadRejections();
                map.put("listaRejections", listaRejections);
            }
            if (data.TRANSCODE != 0) {
                List<A2357Filter> lstTransCode = masterDAO.loadPX382SQP03189();
                map.put("lstTransCode", lstTransCode);
            }
            
            if (data.CURRENCY != 0) {
                List<A005> lstCurrencies = masterDAO.loadCurrencies();
                map.put("lstCurrencies", lstCurrencies);
            }
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    private INF020 getCustomerInfo() throws Exception {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
        logic.setSession(serverSession.getServerSession());
        INF020 customerInfo = serverSession.getServerSession().getUserView().getCustomerInfo();

        return customerInfo;
    }

    @RequestMapping(value = "/validateUserProgramAccess")
    public @ResponseBody
    String validateUserProgramAccess(ModelMap map, HttpServletRequest request) {
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);
        PX041S01INF001Filter obj = new PX041S01INF001Filter();
        try {
            obj.VP_PROGRAM = request.getParameter("nprog");
            obj.VP_USR = getCustomerInfo().USR;

            logic.setSession(serverSession.getServerSession());
            PX041S01INF001Filter matrix = logic.accessProgram(obj);

            map.put("success", true);
            map.put("matrix", matrix);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/obtainDataAirline")
    public @ResponseBody
    String obtainDataAirline(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataAirline");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A005> lstAirlines = masterDAO.loadAirlines2();

            map.put("success", true);
            map.put("lstData", lstAirlines);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/obtainDataCurrencies")
    public @ResponseBody
    String obtainDataCurrencies(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataCurrencies");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A005> lstAirlines = masterDAO.loadCurrencies();

            map.put("success", true);
            map.put("lstData", lstAirlines);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/obtainDataAdjs")
    public @ResponseBody
    String obtainDataAdjs(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataAdjs");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A2280> lstAirlines = masterDAO.loadAdjType();

            map.put("success", true);
            map.put("lstData", lstAirlines);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/obtainDataCity")
    public @ResponseBody
    String obtainDataCity(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataCity");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A1007> lstCity = masterDAO.loadCiudades();

            map.put("success", true);
            map.put("lstData", lstCity);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/obtainDataAirline_Source")
    public @ResponseBody
    String obtainDataAirline_Source(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataAirline_Source");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A005> lstAirlines = masterDAO.loadAirlines2();
            List<A1852Filter> lstSource = masterDAO.loadSource2();

            map.put("success", true);
            map.put("lstAirlines", lstAirlines);
            map.put("lstSource", lstSource);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/obtainDataAirline_Country_City")
    public @ResponseBody
    String obtainDataAirline_Country_City(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainDataAirline_Country_City");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A005> lstAirlines = masterDAO.loadAirlines2();
            List<A1007> lstCiudades = masterDAO.loadCiudades();
            List<A006> lstPaises = masterDAO.loadPaises2();

            map.put("success", true);
            map.put("lstAirlines", lstAirlines);
            map.put("lstCiudades", lstCiudades);
            map.put("lstPaises", lstPaises);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }


    @RequestMapping(value = "/obtainCities")
    public @ResponseBody
    String obtainCiudades(ModelMap map, HttpServletRequest request) {
        System.out.println("Master Controller --- obtainCities");
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());

            List<A1007> lstCiudades = masterDAO.loadCiudades();

            map.put("success", true);
            map.put("lstCiudades", lstCiudades);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
}
