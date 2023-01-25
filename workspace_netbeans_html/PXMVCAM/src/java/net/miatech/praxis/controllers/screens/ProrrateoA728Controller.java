package net.miatech.praxis.controllers.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
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
@RequestMapping("/ProrrateoA728")
public class ProrrateoA728Controller extends BaseController {

    private LoadInterline02Logic logic;
    HashMap<String, String> hmCiudades;
    private A728 filter;
    
    @RequestMapping(value = "searchProrate")
    public @ResponseBody
    String searchProrate(ModelMap map, HttpServletRequest request) {
        A728 dataA728 = new A728();
        List<A728> lstSectores = new ArrayList<A728>();
        HashMap<String, Object> hmResultado;
        filter = new A728();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ProrrateoA728Controller :  searchProrate");
            
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX164SQP0098(filter);
            if (hmResultado != null) {
                dataA728 = (A728) hmResultado.get("A728");
                lstSectores = (ArrayList) hmResultado.get("SECTORES");
            }

            map.put("success", true);
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
}
