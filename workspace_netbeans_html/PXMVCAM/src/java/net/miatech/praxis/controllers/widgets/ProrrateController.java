/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.widgets;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1526Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PRORATEFilter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.controllers.program.*;
import net.miatech.praxis.logic.widgets.ProrateLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import net.miatech.beans.S0001A713Filter;
import net.miatech.praxis.A720;
import net.miatech.praxis.spring.INF020;

/**
 *
 * @author jjulca
 */

@Controller
@Scope("request")
@RequestMapping("/Prorate")
public class ProrrateController extends BaseController {
    private static final Logger logError = Logger.getLogger("errorLog");
   
    @RequestMapping(value = "/searchDataVenta")
    public @ResponseBody
    String searchDataVenta(ModelMap map, HttpServletRequest request){
       S0001A713Filter filter = new S0001A713Filter();
       S0001A713Filter beanProrate = new S0001A713Filter();
       List<S0001A713Filter> lstA720 = new ArrayList<>();
       try{    
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            ProrateLogic logic = new ProrateLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanProrate = logic.searchA720Data(filter);
            lstA720 = logic.searchA720ListaCupon(filter);
            
            map.put("success", true);
            map.put("beanProrate", beanProrate);          
            map.put("lstA713",lstA720);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
    
        return new Gson().toJson(map);
   }
   @RequestMapping(value = "/searchData")
    public @ResponseBody
    String searchData(ModelMap map, HttpServletRequest request){
       S0001A713Filter filter = new S0001A713Filter();
       S0001A713Filter beanProrate = new S0001A713Filter();
       List<S0001A713Filter> lstA713 = new ArrayList<>();
       try{    
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
                        
            ProrateLogic logic = new ProrateLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanProrate = logic.searchA713Data(filter);
            lstA713 = logic.searchA713ListaCupon(filter);
            
            map.put("success", true);
            map.put("beanProrate", beanProrate);          
            map.put("lstA713",lstA713);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
    
        return new Gson().toJson(map);
   }
   
   @RequestMapping(value = "/searchA1526")
    public @ResponseBody
    String searchA1526(ModelMap map, HttpServletRequest request){
       A1526Filter filter = new A1526Filter();
       A1526Filter bean = new A1526Filter();
       
       try{    
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
                        
            ProrateLogic logic = new ProrateLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            bean = logic.searchA1526(filter);
            
            map.put("success", true);
            map.put("beanA1526", bean);          
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
    
        return new Gson().toJson(map);
   }
   
   @RequestMapping(value = "/searchDelivery")
    public @ResponseBody
    String searchDelivery(ModelMap map, HttpServletRequest request){
       FACSIMILFilter filter = new FACSIMILFilter();
       String strTexto = "";
       
       try{
           Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
           filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
           
           ProrateLogic logic = new ProrateLogic();
           logic.setSession(this.serverSession.getServerSession());
           
           if (filter.FUENTE.trim().startsWith("B")) {
                strTexto = logic.searchDeliveryRFND(filter, "B");
           } else if (filter.FUENTE.trim().equals("ARC") || filter.FUENTE.trim().equals("A")) {
                strTexto = logic.searchDeliveryRFND(filter, "A");
           } else if (filter.FUENTE.trim().equals("ASR") || filter.FUENTE.trim().equals("S")) {
                strTexto = logic.searchDeliveryRFND(filter, "S");
           }
           
           map.put("success", true);
           map.put("strTexto", strTexto);
       } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
       
       return new Gson().toJson(map); 
   }
   
   @RequestMapping(value = "/manRefundCoupon")
    public @ResponseBody
    String manRefundCoupon(ModelMap map, HttpServletRequest request){
       S0001A713Filter filter = new S0001A713Filter();
       String strResult = "";
       List<S0001A713Filter> lstA713 = new ArrayList<>();
       try{
           Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
           filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
           
           ProrateLogic logic = new ProrateLogic();
           logic.setSession(this.serverSession.getServerSession());
           
           lstA713 = logic.SQP03441(filter);

           if(lstA713.size()> 0){
                strResult = logic.SQP03439(filter);
           }else{
                strResult = logic.SQP03440(filter);
           }
                      
           map.put("success", true);
           map.put("strResult", strResult);
       } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
       
       return new Gson().toJson(map); 
   }
   
   @RequestMapping(value = "/prorateTicket")
    public @ResponseBody
    String prorateTicket(ModelMap map, HttpServletRequest request){
       PRORATEFilter filter = new PRORATEFilter();
       List<A720> lstA713 = new ArrayList<>();
       try{
           Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
           filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
           
           ProrateLogic logic = new ProrateLogic();
           logic.setSession(this.serverSession.getServerSession());
           
           lstA713 = logic.prorateoTicket(filter);
                                
           map.put("success", true);
           map.put("strResult", lstA713);
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
