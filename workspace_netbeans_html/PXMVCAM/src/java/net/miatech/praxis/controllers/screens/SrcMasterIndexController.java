/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.screens;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.program.ProrrateoNewLogic;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/SrcMasterIndex")
public class SrcMasterIndexController extends BaseController{
    
    
    
    @RequestMapping(value = "searchMasterIndex")
    public @ResponseBody
    String searchMasterIndex(ModelMap map, HttpServletRequest request) {
        FACSIMILFilter filter = new FACSIMILFilter();
        List<FACSIMILFilter> listaData;
        try {
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            

            ProrrateoNewLogic logic = new ProrrateoNewLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData  = logic.loadSQP00778(cliente.CCUST, filter);
            
            
            map.put("success", true);
            map.put("listaData", listaData);
            
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
