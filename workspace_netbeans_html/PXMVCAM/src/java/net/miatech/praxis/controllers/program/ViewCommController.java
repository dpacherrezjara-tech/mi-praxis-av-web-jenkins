package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.libmiatec.A021;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
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
@RequestMapping("/ViewComm")
public class ViewCommController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadInterline02Logic logic;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A021> lista;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ViewCommController :  search");
            
            String codigo = request.getParameter("codigo");
            
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.searchComment_SQP00117(codigo);
        
            map.put("success", true);
            map.put("data", lista);
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
