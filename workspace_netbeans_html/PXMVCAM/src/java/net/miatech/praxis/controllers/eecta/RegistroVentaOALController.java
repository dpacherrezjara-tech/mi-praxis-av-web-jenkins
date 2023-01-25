/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04163Filter;
import net.miatech.praxis.eecta.SQP04164Filter;
import net.miatech.praxis.eecta.SQP04173Filter;
import net.miatech.praxis.logic.eecta.RegistroVentaOALLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/RegistroVentaOAL")
public class RegistroVentaOALController extends BaseController {
    private RegistroVentaOALLogic logic;
        
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04163Filter> listaData;
        SQP04163Filter filter;
        filter = new SQP04163Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_FILTRO = request.getParameter("VP_FILTRO");           
            filter.VP_FECHA01 = request.getParameter("VP_FECHA01");           
            filter.VP_FECHA02 = request.getParameter("VP_FECHA02"); 
            filter.VP_TICKET_NUMBER = request.getParameter("VP_TICKET_NUMBER");
            filter.VP_AIRLINE_CODE = request.getParameter("VP_AIRLINE_CODE");          
            filter.VP_SERVICE_TYPE = request.getParameter("VP_SERVICE_TYPE");           
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new RegistroVentaOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04163Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "set_crud")
    public @ResponseBody
    String set_crud(ModelMap map, HttpServletRequest request) {        
        SQP04164Filter filter = new SQP04164Filter();
        SQP04164Filter objRtn = new SQP04164Filter();                
        try {
            logic = new RegistroVentaOALLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonArray gson_detail = parser.parse(request.getParameter("beanRouting")).getAsJsonArray();
            filter.VP_ROUTING = gson_detail.toString(); 
            objRtn = logic.setSQP04164Filter(filter);                                       
            map.put("objRtn", objRtn);
            map.put("success", true);            
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
    @RequestMapping(value = "/search_routing")
    public @ResponseBody
    String search_routing(ModelMap map, HttpServletRequest request) {
        List<SQP04173Filter> listaData;
        SQP04173Filter filter;
        filter = new SQP04173Filter();
        
        try {
            filter.VP_A4069CIA = request.getParameter("VP_A4069CIA");           
            filter.VP_A4069FORMA = request.getParameter("VP_A4069FORMA");           
            filter.VP_A4069SERIE = request.getParameter("VP_A4069SERIE"); 
            filter.VP_A4069SEQ = request.getParameter("VP_A4069SEQ");
            
            logic = new RegistroVentaOALLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04173Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size());            
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
}
