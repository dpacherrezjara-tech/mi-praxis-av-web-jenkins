/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.EmailControlLogic;
import net.miatech.praxis.payment.filter.MPF248Filter;
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
@RequestMapping("/EmailControl")

public class EmailControlController extends BaseController {

    private EmailControlLogic logic;


    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());

        System.out.println("xxxxx");
        return "payments/EmailControl/form_index";
    }

    ///////////////LISTA////////////////////////////////
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMAILCONTROL :Search-------------");
        map.put("success", true);
        List<MPF248Filter> lst = this.getListMPF248Search(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF248Filter> getListMPF248Search(HttpServletRequest request, Boolean bExcel) {

        List<MPF248Filter> lst = new ArrayList<>(0);
        MPF248Filter filter = new MPF248Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EmailControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF248Filter.class);
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

            lst = logic.searchEmailControl(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    //searchEmailDetail
    @RequestMapping(value = "searchEmailDetail")
    public @ResponseBody
    String searchEmailDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- EMAILCONTROL DETAIL :Search DETAIL-------------");
        map.put("success", true);
        List<MPF248Filter> lst = this.getListMPF248SearchDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF248Filter> getListMPF248SearchDetail(HttpServletRequest request, Boolean bExcel) {

        List<MPF248Filter> lst = new ArrayList<>(0);
        MPF248Filter filter = new MPF248Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new EmailControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF248Filter.class);
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

            lst = logic.searchEmailControlDetail(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    ////TEMRINA EL EXCEL /////////////////////////
    ////LLENAR UPDATE
    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- EmailControl : MANTENIMIENTO EMAIL CONTROL-------------");
        // String option;
        MPF248Filter filter = new MPF248Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new EmailControlLogic();   // <-- FALTA ESTA LÍNEA
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF248Filter.class);

            msj = logic.mantenimientoMPF248(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getPROCESS")
    public @ResponseBody
    String getPROCESS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Email Control : getPROCESS-------------");

        map.put("success", true);
        List<MPF248Filter> lst = this.getListProcess(request, false);
        System.out.println("Total : " + lst.size());
        map.put("listaProcess", lst);
        return new Gson().toJson(map);
    }

    public List<MPF248Filter> getListProcess(HttpServletRequest request, Boolean bExcel) {

        List<MPF248Filter> lst = new ArrayList<>(0);
        MPF248Filter filter = new MPF248Filter();

        try {
            logic = new EmailControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.searchProcessList(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

}
