package net.miatech.praxis.controllers.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A020Filter;
import net.miatech.beans.TCNFilter;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.logic.screens.ProrrateoIxCLogic;
import net.miatech.praxis.logic.screens.ProrrateoLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
@RequestMapping("/ProrrateoIxC")
public class ProrrateoIxCController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProrrateoLogic logic;
    private ProrrateoIxCLogic logic02;
    private MasterDAO masterDAO;
    HashMap<String, String> hmCiudades;
    private A020Filter filter;

    @RequestMapping(value = "searchProrate")
    public @ResponseBody
    String searchProrate(ModelMap map, HttpServletRequest request) {

        A020Filter dataA020 = new A020Filter();
        A728 dataA728 = new A728();
        List<A728> lstSectores = new ArrayList<A728>();
        HashMap<String, Object> hmResultado;
        filter = new A020Filter();
        
        try {
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoIxCController :  searchProrate");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new ProrrateoLogic();
            logic.setSession(this.serverSession.getServerSession());

            logic02 = new ProrrateoIxCLogic();
            logic02.setSession(this.serverSession.getServerSession());
            hmResultado = logic02.loadPX164SQP0074(filter);
            
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

            }
            //==================================================================
            //==================================================================

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchTaxes")
    public @ResponseBody
    String searchTaxes(ModelMap map, HttpServletRequest request) {
        List<A729> lstTaxes;
        filter = new A020Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoIxCController :  searchTaxes");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic02 = new ProrrateoIxCLogic();
            logic02.setSession(this.serverSession.getServerSession());
            lstTaxes = logic02.loadPX164SQP0076(filter);

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

    @RequestMapping(value = "updateUSO")
    public @ResponseBody
    String updateUSO(ModelMap map, HttpServletRequest request) {
        String msj;
        String uso;
        String tkt;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoIxCController :  updateUSO");

            uso = request.getParameter("uso");
            tkt = request.getParameter("tkt");

            logic02 = new ProrrateoIxCLogic();
            logic02.setSession(this.serverSession.getServerSession());
            msj = logic02.CAMBIAR_USO(uso, tkt);

            map.put("success", true);
            map.put("Msj", msj);
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
