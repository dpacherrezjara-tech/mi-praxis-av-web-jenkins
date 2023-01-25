/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.S0001A713Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.RfndMaintenanceLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jmeiggs
 */
@Controller
@Scope("request")
@RequestMapping("/RfndMaintenance")
public class RfndMaintenanceController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RfndMaintenanceLogic logic;
    
    @RequestMapping(value = "updateItinerary")
    public @ResponseBody
    String updateItinerary(ModelMap map, HttpServletRequest request) {
        S0001A713Filter filter = new S0001A713Filter();
        S0001A713Filter objRtn;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RfndMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.updateItinerary(filter);

            map.put("success", true);
            map.put("data", objRtn);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "deleteTKT")
    public @ResponseBody
    String deleteTKT(ModelMap map, HttpServletRequest request) {
        S0001A713Filter filter = new S0001A713Filter();
        S0001A713Filter objRtn;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RfndMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.updateItinerary(filter);

            map.put("success", true);
            map.put("data", objRtn);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "maintenanceRfnd")
    public @ResponseBody
    String maintenanceRfnd(ModelMap map, HttpServletRequest request) {
        String result = "";
        S0001A713Filter filter = new S0001A713Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonObject jsonArrCpn = parser.parse(request.getParameter("beanlstCupones")).getAsJsonObject();
            JsonObject jsonArrEmd = parser.parse(request.getParameter("beanlstEmd")).getAsJsonObject();
            logic = new RfndMaintenanceLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.maintenanceRfnd(filter, jsonArrCpn.toString(), jsonArrEmd.toString());
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
}
