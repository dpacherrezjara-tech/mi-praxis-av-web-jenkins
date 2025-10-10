
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ErrorControlModuleLogic;
import net.miatech.praxis.payment.entities.MPF122Filter;
import net.miatech.praxis.payment.filter.A4451Filter;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author ftorres
 */


@Controller
@Scope("request")
@RequestMapping("/ErrorControlModule")



public class ErrorControlModuleController extends BaseController{
    
    
    private ErrorControlModuleLogic logic;

//    @Autowired
//    private ExportUtils exportUtils;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;

    
    
    
    
       @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        
        
        System.out.println("xxxxx");
        return "payments/ErrorControlModule/form_index";
    }
    
    
    ///////////////LISTA////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    
    @RequestMapping(value = "searchGrid")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ERRORCONTROLMODULE :SearchGrid-------------");
        map.put("success", true);
        List<MPF122Filter> lst = this.getListMPF122Search(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<MPF122Filter> getListMPF122Search(HttpServletRequest request, Boolean bExcel) {

        List<MPF122Filter> lst = new ArrayList<>(0);
        MPF122Filter filter = new MPF122Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ErrorControlModuleLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            System.out.println("beanString recibido: " + beanString);
            
            if (beanString == null || beanString.trim().isEmpty()) {
                filter = new MPF122Filter();
            } else {
                filter = gson.fromJson(beanString, MPF122Filter.class);
            }

            
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

                if (!bExcel) {
                    filter.page.PAGROW = 20;
                    start = (start != 0 ? start : 0);
                    filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
                } else {
                    filter.page.PAGROW = -1;
                    filter.page.PAGNUM = 1;
                }

                lst = logic.listarErrorControlMPF122(filter);
            } catch (Exception e) {
                throw new SpringException(e);
            }
            return lst;
        }
    
    
    
    /// llamamos al store callStoreMPS210
    
    @RequestMapping(value = "callStoreMPS210", method = RequestMethod.POST)
@ResponseBody
public String callStoreMPS210(ModelMap map, HttpServletRequest request) {

    System.out.println("-------------- ERROR CONTROL MODULE : callStoreMPS210 -------------");

    String codpro = request.getParameter("V_CODPRO");
    System.out.println("String recibido :" + codpro);
    String prda = request.getParameter("V_PRDA");
    System.out.println("String recibido :" + prda);

    try {
        ErrorControlModuleLogic logic = new ErrorControlModuleLogic();
        logic.setSession(this.serverSession.getServerSession());
        


        // Ejecuta el procedimiento almacenado
        String mensaje = logic.callStoreMPS210(codpro, prda);

        map.put("success", true);
        map.put("message", mensaje != null ? mensaje : "Proceso ejecutado correctamente.");
    } catch (SQLException ex) {
        map.put("success", false);
        map.put("message", "Error SQL: " + ex.getMessage());
    } catch (Exception ex) {
        map.put("success", false);
        map.put("message", "Error general: " + ex.getMessage());
    }

    return new Gson().toJson(map);
}

    
    
    
    
     
    

    
}
