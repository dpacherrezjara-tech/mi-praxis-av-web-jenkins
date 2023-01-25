package net.miatech.praxis.controllers.widgets;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A020Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
import net.miatech.praxis.logic.widgets.FacsimilLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/Facsimil")
public class FacsimilController extends BaseController {
    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(value = "/searchFacsimil")
    public @ResponseBody
    String searchFacsimil(ModelMap map, HttpServletRequest request){        
        HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();

        BSPF104 filter = new BSPF104();
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        
        try{    
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
                        
            FacsimilLogic logic = new FacsimilLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if (filter.TDNR.startsWith("139")) {
                switch(filter.FUENTE){
                    case "ARC":
                        beanFaximil = logic.loadARCFacsimilProrate(filter, hmAeropuertos);
                        break;
                    case "ASR":
                        beanFaximil = logic.loadASRFacsimilProrate(filter, hmAeropuertos);
                        break;
                    case "BSP":
                        beanFaximil = logic.loadBSPFacsimilProrate(filter, hmAeropuertos);
                        break;
                }                                
            }
            
            map.put("success", true);
            map.put("lstFaximil", beanFaximil);          
            
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

