package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A020Filter;
import net.miatech.beans.PX040S01A720Filter;
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
@RequestMapping("/Comments")
public class CommentsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadInterline02Logic logic;
    private PX040S01A720Filter filter;
    
    @RequestMapping(value = "/saveComm")
    public @ResponseBody
    String saveComm(ModelMap map, HttpServletRequest request) {
        String mensaje = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "CommentsController :  saveComm");

            List<A021> listaComentarios = Arrays.asList(new Gson().fromJson(
                request.getParameter("listaComentarios"), A021[].class
            ));
            List<A020Filter> listaSQL = Arrays.asList(new Gson().fromJson(
                request.getParameter("listaSQL"), A020Filter[].class
            ));
            
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            mensaje = logic.savedComments_SQP0106(listaComentarios, listaSQL);
            map.put("success", true);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        map.put("mensaje", mensaje);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchComm")
    public @ResponseBody
    String searchComm(ModelMap map, HttpServletRequest request) {
        A021 comentario;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "CommentsController :  searchComm");
            
            String codigo = request.getParameter("codigo");
            String fechaClearing = request.getParameter("fechaClearing");
            
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            comentario = logic.searchComment_SQP0107(codigo, fechaClearing);
        
            map.put("success", true);
            map.put("comentario", comentario);
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
