/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankReconciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/BankReconciliation")
public class BankReconciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BankReconciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- BankReconciliationController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/BankReconciliation/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : search-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00698(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchByPNR")
    public @ResponseBody
    String searchByPNR(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchByPNR-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListByPNR(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListByPNR(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP03988(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public JavaToFlexResponse searchDetCardCode(A2290Filter filter) {
        JavaToFlexResponse resp = new JavaToFlexResponse();

        List<A2290Filter> listaData;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetCardCode");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX269SQP00699(filter);
            resp.vars.put("lstDetCardCode", listaData);

        } catch (SQLException e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        return resp;
    }

    @RequestMapping(value = "searchDetDay")
    public @ResponseBody
    String searchDetDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetDay-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetDay(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetDay(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00700(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDet")
    public @ResponseBody
    String searchDet(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDet-------------");

        map.put("success", true);
        HashMap<String, List<A2309AFilter>> lst = this.getListDet(request, false);
        List<A2309AFilter> listaData = lst.get("BATCH");
        List<A2309AFilter> listaSettlement1 = lst.get("SETTLEMENT_1");

        System.out.println("Total : " + lst.size());

        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        map.put("settl1", listaSettlement1);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<A2309AFilter>> getListDet(HttpServletRequest request, Boolean bExcel) {

        //List<A2309AFilter> lst = new ArrayList<>(0);
        HashMap<String, List<A2309AFilter>> lst = new HashMap<String, List<A2309AFilter>>();
        A2309AFilter filter = new A2309AFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2309AFilter.class);
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

            lst = logic.loadPX269SQP03940(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetByBatch")
    public @ResponseBody
    String searchDetByBatch(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetByBatch-------------");

        map.put("success", true);
        List<A2309AFilter> lst = this.getListDetByBatch(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2309AFilter> getListDetByBatch(HttpServletRequest request, Boolean bExcel) {

        List<A2309AFilter> lst = new ArrayList<>(0);
        A2309AFilter filter = new A2309AFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2309AFilter.class);
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

            lst = logic.loadPX269SQP03940_TV(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCardNumber")
    public @ResponseBody
    String searchDetCardNumber(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCardNumber-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCardNumber(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetCardNumber(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00717(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetTicket-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetTicket(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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
            if (filter.FCONC.equals("X")) {
                lst = logic.loadPX269SQP02492(filter);
            } else {
                lst = logic.loadPX269SQP00744(filter);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBean-------------");
        map.put("success", true);

        A2290Filter result = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQP00833(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanAMDP")
    public @ResponseBody
    String searchBeanAMDP(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP-------------");
        map.put("success", true);

        A2290Filter result = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQPXXX(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : executeOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP01950(filter);
            if (msj.isEmpty()) {
                msj = logic.loadPX269SQP00834(filter, user);
            }
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

    public JavaToFlexResponse executeOption(A2290Filter filter, String option) {

        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A2291
        JavaToFlexResponse resp = new JavaToFlexResponse();
        String msj = "";
        //List<A2290Filter> lstTickets;
        //A2290Filter bean;
        //int contador = 0;

        try {
            UserView user = this.serverSession.getServerSession().getUserView();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : executeOption");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            //msj = logic.loadPX269SQP00834(filter, strOption, user);
            //VALIDACION AX (A2279) Y LISTA A2290
            msj = logic.loadPX269SQP01950(filter);

            if (msj.isEmpty()) {

                msj = logic.loadPX269SQP00834(filter, user);
                /*lstTickets = (List<A2290Filter>) hmResult.get("LISTA");
                
                 if (lstTickets != null && lstTickets.size() > 0) {
                 for (int i = 0; i < lstTickets.size(); i++) {
                 bean = lstTickets.get(i);
                 String strMsj = logic.loadPX269SQP00834(bean, user);
                 if (strMsj.startsWith("SUCCESSFUL")) {
                 contador++;
                 }
                 }
                 if (contador == lstTickets.size()) {
                 msj = "SUCCESSFUL. " + contador + " tickets updated.";
                 } else {
                 msj = "Incomplete Information Updated. " + contador + " tickets updated of " + lstTickets.size() + ".";
                 }
                 } else {
                 msj = "Error. Tickets not found for that Credit Card.";
                 }*/
            }

        } catch (SQLException e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Card was not registered.";
        }

        resp.vars.put("msjOption", msj);

        return resp;
    }

    @RequestMapping(value = "searchBeanAdyen")
    public @ResponseBody
    List<A2290Filter> searchBeanAdyen(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAdyen-------------");
        map.put("success", true);

        List<A2290Filter> result = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQP02193(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

//        return new Gson().toJson(map);
        return result;
    }

//    public JavaToFlexResponse searchBeanAdyen(A2290Filter filter) {
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//
//        try {
//            List<A2290Filter> listaData;
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchBeanAdyen");
//
//            BankReconciliationLogic logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX269SQP02193(filter);
//            resp.vars.put("lstBeanAdyen", listaData);
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }
    public JavaToFlexResponse updateADYEN(A2290Filter bean, String accion) {

        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        JavaToFlexResponse resp = new JavaToFlexResponse();

        String msj = "";
        try {
            UserView user = this.serverSession.getServerSession().getUserView();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : updateADYEN");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (accion.trim().equals("U") && bean != null) {

                msj = logic.loadPX263SQP02194(bean, user, accion);

            } else {
                msj = "An error has occurred. Please contact our IT department.";
            }

        } catch (SQLException e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. ";
        }

        resp.vars.put("msjOption", msj);

        return resp;
    }

    //Drill Down por Estado
    @RequestMapping(value = "searchDetCardCodeByStval")
    public @ResponseBody
    String searchDetCardCodeByStval(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCardCodeByStval-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCardCodeByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetCardCodeByStval(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00869(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCardCodeByStvalWithErrorsList")
    public @ResponseBody
    String searchDetCardCodeByStvalWithErrorsList(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCardCodeByStvalWithErrorsList-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCardCodeByStvalWithErrorsList(request, false);
        List<A2290Filter> lstError = this.getListErrorCountryByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstDetError", lstError);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetCardCodeByStvalWithErrorsList(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP03983(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCountryByStval")
    public @ResponseBody
    String searchDetCountryByStval(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCountryByStval-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCountryByStval(request, false);
        List<A2290Filter> lstError = this.getListErrorCountryByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstDetError", lstError);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDetCountryByStval_1")
    public @ResponseBody
    String searchDetCountryByStval_1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCountryByStval_1-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCountryByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetCountryByStval(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00869_TV(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2290Filter> getListErrorCountryByStval(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00869_TV_ERRORS(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchDetDayByStvalWithErrorsList")
    public @ResponseBody
    String searchDetDayByStvalWithErrorsList(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX269SQP03984(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX269SQP00869_TV_ERRORS(filter);
                }

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstDetError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

//    public JavaToFlexResponse searchDetCardCodeByStval(A2290Filter filter) {
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//
//        List<A2290Filter> listaData;
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetCardCodeByStval");
//
//
//            BankReconciliationLogic logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX269SQP00869(filter);
//            resp.vars.put("lstDetCardCodeByStval", listaData);
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }
    @RequestMapping(value = "searchDetDayByStval")
    public @ResponseBody
    String searchDetDayByStval(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetDayByStval-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetDayByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetDayByStval(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00870(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
//    public JavaToFlexResponse searchDetDayByStval(A2290Filter filter) {
//
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        List<A2290Filter> listaData;
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetDayByStval");
//
//            BankReconciliationLogic logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX269SQP00870(filter);
//            resp.vars.put("lstDetDayByStval", listaData);
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }

    @RequestMapping(value = "/searchDetTktByStval")
    public @ResponseBody
    String searchDetTktByStval(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP03989(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "searchDetCardNbrByStval")
    public @ResponseBody
    String searchDetCardNbrByStval(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetCardNbrByStval-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetCardNbrByStval(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetCardNbrByStval(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP00871(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
//    public JavaToFlexResponse searchDetCardNbrByStval(A2290Filter filter) {
//
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        List<A2290Filter> listaData;
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetCardNbrByStval");
//
//            BankReconciliationLogic logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX269SQP00871(filter);
//            resp.vars.put("lstDetCardNbrByStval", listaData);
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }

    @RequestMapping(value = "searchDetA1531TKT")
    public @ResponseBody
    String searchDetA1531TKT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetA1531TKT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetA1531TKT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetA1531TKT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
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

            lst = logic.loadPX269SQP03808(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetA1531Excel")
    public @ResponseBody
    String searchDetA1531Excel(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetA1531Excel-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDetA1531Excel(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetA1531Excel(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
            lst = logic.loadPX269SQP03808_S_R(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
//    @RequestMapping(value = "/searchDetA1531Excel")
//    public @ResponseBody
//    String searchDetA1531Excel(ModelMap map, HttpServletRequest request) {
//        A2290Filter filter = new A2290Filter();
//        HashMap hm;
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "BankReconciliationController :  searchDetA1531Excel");
//
//            String beanString = request.getParameter("beanString");
//            filter = new Gson().fromJson(beanString, filter.getClass());
//
//            logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            hm = logic.loadPX269SQP02478(filter);
//
//            map.put("success", true);
//            map.put("listaData", hm.get("lista1"));
//            map.put("listaData2", hm.get("lista2"));
//        } catch (SQLException e) {
//            map.put("success", false);
//            map.put("sesion", SESSION_CONTROL);
//        } catch (Exception e) {
//            map.put("success", false);
//            map.put("sesion", SESSION_CONTROL);
//        }
//        return new Gson().toJson(map);
//    }
//    public JavaToFlexResponse searchDetA1531Excel(A2290Filter filter) {
//
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        HashMap hm = new HashMap();
//
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetA1531Excel");
//
//            BankReconciliationLogic logic = new BankReconciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            hm = logic.loadPX269SQP02478(filter);
//
//            resp.vars.put("lstDetA1531TKT", hm.get("lista1"));
//            resp.vars.put("lstDetA1531Excel", hm.get("lista2"));
//
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }

    //Drill Down EPA Status 3
    public JavaToFlexResponse searchDetCC_EPA(A2290Filter filter) {
        JavaToFlexResponse resp = new JavaToFlexResponse();

        List<A2290Filter> listaData;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetCC_EPA");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX269SQP02368(filter);
            resp.vars.put("lstDetCCByStvalEPA", listaData);

        } catch (SQLException e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        return resp;
    }

    public JavaToFlexResponse searchDetCardNbr_EPA(A2290Filter filter) {

        JavaToFlexResponse resp = new JavaToFlexResponse();
        List<A2290Filter> listaData;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : searchDetCardNbr_EPA");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX269SQP02369(filter);
            resp.vars.put("lstDetCardNbr_EPA", listaData);

        } catch (SQLException e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        return resp;
    }

    public JavaToFlexResponse saveConManual(A2290Filter filter) {

        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A2291
        JavaToFlexResponse resp = new JavaToFlexResponse();
        String msj = "";
        //List<A2290Filter> lstTickets;
        //A2290Filter bean;
        //int contador = 0;

        try {
            UserView user = this.serverSession.getServerSession().getUserView();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankReconciliationController.class.getCanonicalName() + " : saveConManual");

            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (msj.isEmpty()) {

                msj = logic.loadPX269SQP02488(filter, user);

            }

        } catch (SQLException e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }

        resp.vars.put("msj", msj);

        return resp;
    }

    @RequestMapping(value = "getXLSXDetDay")
    public @ResponseBody
    void getXLSXDetDay(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetDay");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetDay(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Settlement Reconciliation");
            CH1_5.setCellValue("Bank Reconciliation");
            CH1_11.setCellValue("Paying");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);

            CH2_0.setCellValue("Day");
            CH2_1.setCellValue("Match");
            CH2_3.setCellValue("Settlement");
            CH2_4.setCellValue("Paying without");
            CH2_5.setCellValue("Accepted");
            CH2_7.setCellValue("Rejected");
            CH2_9.setCellValue("Suspect");
            CH2_11.setCellValue("without");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);

            CH3_1.setCellValue("Match");
            CH3_2.setCellValue("Manual");
            CH3_3.setCellValue("without Paying");
            CH3_4.setCellValue("Settlement");
            CH3_5.setCellValue("Transactions");
            CH3_6.setCellValue("Tickets");
            CH3_7.setCellValue("Transactions");
            CH3_8.setCellValue("Tickets");
            CH3_9.setCellValue("Transactions");
            CH3_10.setCellValue("Tickets");
            CH3_11.setCellValue("Sales");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).SDATE);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell3.setCellValue(listaData.get(vi).lngQTEF);
                rcell4.setCellValue(listaData.get(vi).lngQPAS48);
                rcell5.setCellValue(listaData.get(vi).lngQACEP);
                rcell6.setCellValue(listaData.get(vi).lngQACEPT);
                rcell7.setCellValue(listaData.get(vi).lngQRECH);
                rcell8.setCellValue(listaData.get(vi).lngQRECHT);
                rcell9.setCellValue(listaData.get(vi).lngQSOSP);
                rcell10.setCellValue(listaData.get(vi).lngQSOSPT);
                rcell11.setCellValue(listaData.get(vi).lngQTOTWS);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetCardByS")
    public @ResponseBody
    void getXLSXDetCardByS(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetCardByS");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetCardCodeByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);

            CH1_0.setCellValue("Credit Card");
            CH1_3.setCellValue("Country");
            CH1_4.setCellValue("Quantity");
            CH1_5.setCellValue("Currency");
            CH1_6.setCellValue("Amount");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);

            CH2_0.setCellValue("Code");
            CH2_1.setCellValue("Description");
            CH2_2.setCellValue("Bank");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);

                rcell0.setCellValue(listaData.get(vi).SCARCOD);
                rcell1.setCellValue(listaData.get(vi).strDescCard);
                rcell2.setCellValue(listaData.get(vi).strSORIG);
                rcell3.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell4.setCellValue(listaData.get(vi).lngQACCB);
                rcell5.setCellValue(listaData.get(vi).SCURRENCY);
                rcell6.setCellValue(listaData.get(vi).SVFOP);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetCardNbr")
    public @ResponseBody
    void getXLSXDetCardNbr(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetCardNbr");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetCardNumber(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);

            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Agent");
            CH1_2.setCellValue("Credit Card");
            CH1_7.setCellValue("Merchant");
            CH1_8.setCellValue("Author.");
            CH1_9.setCellValue("Curr.");
            CH1_10.setCellValue("Amount");
            CH1_11.setCellValue("Settlement");
            CH1_12.setCellValue("Liquidation");
            CH1_13.setCellValue("Payment");
            CH1_14.setCellValue("Bank");
            CH1_15.setCellValue("Sales");
            CH1_16.setCellValue("Qty");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);

            CH2_2.setCellValue("Src");
            CH2_3.setCellValue("Code");
            CH2_4.setCellValue("Number");
            CH2_5.setCellValue("Seq");
            CH2_6.setCellValue("Bank");
            CH2_7.setCellValue("Number");
            CH2_8.setCellValue("Code");
            CH2_11.setCellValue("Date");
            CH2_12.setCellValue("Date");
            CH2_13.setCellValue("Date");
            CH2_14.setCellValue("Deposit");
            CH2_15.setCellValue("Status");
            CH2_16.setCellValue("Tkts");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);

                rcell0.setCellValue(listaData.get(vi).strDescStatus);
                rcell1.setCellValue(listaData.get(vi).SAGENT);
                rcell2.setCellValue(listaData.get(vi).FTE);
                rcell3.setCellValue(listaData.get(vi).SCARCOD);
                rcell4.setCellValue(listaData.get(vi).SCARDN);
                rcell5.setCellValue(listaData.get(vi).SEQNUM);
                rcell6.setCellValue(listaData.get(vi).strSORIG);
                rcell7.setCellValue(listaData.get(vi).MERCHN);
                rcell8.setCellValue(listaData.get(vi).SAUTHOC);
                rcell9.setCellValue(listaData.get(vi).SCURRENCY);
                rcell10.setCellValue(listaData.get(vi).SVFOP);
                rcell11.setCellValue(listaData.get(vi).TDATE);
                rcell12.setCellValue(listaData.get(vi).DATEF);
                rcell13.setCellValue(listaData.get(vi).BDATEP);
                rcell14.setCellValue(listaData.get(vi).strBankDeposit);
                rcell15.setCellValue(listaData.get(vi).FLAGC);
                rcell16.setCellValue(listaData.get(vi).lngQTYTKT);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetDayByS")
    public @ResponseBody
    void getXLSXDetDayByS(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetDayByS");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetDayByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);

            CH1_0.setCellValue("Day");
            CH1_1.setCellValue("Quantity");
            CH1_2.setCellValue("Currency");
            CH1_3.setCellValue("Amount");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);

            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);

                rcell0.setCellValue(listaData.get(vi).SDATE);
                rcell1.setCellValue(listaData.get(vi).lngQACCB);
                rcell2.setCellValue(listaData.get(vi).SCURRENCY);
                rcell3.setCellValue(listaData.get(vi).SVFOP);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetCardNbrByS")
    public @ResponseBody
    void getXLSXDetCardNbrByS(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetCardNbrByS");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetCardNbrByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);

            CH1_0.setCellValue("Credit Card");
            CH1_5.setCellValue("Merchant");
            CH1_6.setCellValue("Author.");
            CH1_7.setCellValue("Curr.");
            CH1_8.setCellValue("Amount");
            CH1_9.setCellValue("Settlement");
            CH1_10.setCellValue("Liquidation");
            CH1_11.setCellValue("Payment");
            CH1_12.setCellValue("Bank");
            CH1_13.setCellValue("Status");
            CH1_14.setCellValue("Sales");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 16));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);

            CH2_0.setCellValue("Src");
            CH2_1.setCellValue("Code");
            CH2_2.setCellValue("Number");
            CH2_3.setCellValue("Seq");
            CH2_4.setCellValue("Bank");
            CH2_5.setCellValue("Number");
            CH2_6.setCellValue("Code");
            CH2_9.setCellValue("Date");
            CH2_10.setCellValue("Date");
            CH2_11.setCellValue("Date");
            CH2_12.setCellValue("Deposit");
            CH2_14.setCellValue("Status");
            CH2_15.setCellValue("Agent");
            CH2_16.setCellValue("Tkts");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);

                rcell0.setCellValue(listaData.get(vi).FTE);
                rcell1.setCellValue(listaData.get(vi).SCARCOD);
                rcell2.setCellValue(listaData.get(vi).SCARDN);
                rcell3.setCellValue(listaData.get(vi).SEQNUM);
                rcell4.setCellValue(listaData.get(vi).strSORIG);
                rcell5.setCellValue(listaData.get(vi).MERCHN);
                rcell6.setCellValue(listaData.get(vi).SAUTHOC);
                rcell7.setCellValue(listaData.get(vi).SCURRENCY);
                rcell8.setCellValue(listaData.get(vi).SVFOP);
                rcell9.setCellValue(listaData.get(vi).TDATE);
                rcell10.setCellValue(listaData.get(vi).DATEF);
                rcell11.setCellValue(listaData.get(vi).BDATEP);
                rcell12.setCellValue(listaData.get(vi).strBankDeposit);
                rcell13.setCellValue(listaData.get(vi).BSTVAL);
                rcell14.setCellValue(listaData.get(vi).FLAGC);
                rcell15.setCellValue(listaData.get(vi).SAGENT);
                rcell16.setCellValue(listaData.get(vi).lngQTYTKT);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetTicket")
    public @ResponseBody
    void getXLSXDetTicket(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetTicket");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetTicket(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Agent");
            CH1_3.setCellValue("Currency");
            CH1_4.setCellValue("Amount");
            CH1_5.setCellValue("Card Number");
            CH1_6.setCellValue("PNR");
            CH1_7.setCellValue("Authorization");
            CH1_8.setCellValue("Bank Information");
            CH1_10.setCellValue("Payment Information");
            CH1_12.setCellValue("Days");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);

            CH2_0.setCellValue("Number");
            CH2_7.setCellValue("Code");
            CH2_8.setCellValue("Acceptance Date");
            CH2_9.setCellValue("Status");
            CH2_10.setCellValue("Date");
            CH2_11.setCellValue("Status");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).STVAL);
                rcell2.setCellValue(listaData.get(vi).AAGENT);
                rcell3.setCellValue(listaData.get(vi).ACURRENCY);
                rcell4.setCellValue(listaData.get(vi).AVFOP);
                rcell5.setCellValue(listaData.get(vi).ACARDN);
                rcell6.setCellValue(listaData.get(vi).APNR);
                rcell7.setCellValue(listaData.get(vi).AAUTHOC);
                rcell8.setCellValue(listaData.get(vi).BDATEL);
                rcell9.setCellValue(listaData.get(vi).BSTVAL);
                rcell10.setCellValue(listaData.get(vi).BDATEP);
                rcell11.setCellValue(listaData.get(vi).BSTVALP);
                rcell12.setCellValue(listaData.get(vi).lngDays);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);

            String tit_IN_TDOC = "";
            if (listaData.get(0).strFecFiltro.equals("BDATEP")) {
                tit_IN_TDOC = "Reconciliation";
            } else if (listaData.get(0).IN_TDOC.equals("R")) {
                tit_IN_TDOC = "Refund";
            } else {
                tit_IN_TDOC = "Sales";
            }

            CH1_0.setCellValue(tit_IN_TDOC);
            CH1_1.setCellValue("Settlement Reconciliation");
            CH1_6.setCellValue("Bank Reconciliation");
            CH1_10.setCellValue("Paying");
            CH1_11.setCellValue("Bank");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Match");
            CH2_3.setCellValue("Settlement");
            CH2_4.setCellValue("Paying w/o");
            CH2_5.setCellValue("Total");
            CH2_6.setCellValue("Accepted");
            CH2_7.setCellValue("Rejected");
            CH2_8.setCellValue("Suspect");
            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("without");
            CH2_11.setCellValue("Clarifications");
            CH2_12.setCellValue("Chargeback");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);

            CH3_1.setCellValue("Auto");
            CH3_2.setCellValue("Manual");
            CH3_3.setCellValue("w/o Paying");
            CH3_4.setCellValue("Settlement");
            CH3_6.setCellValue("Transactions");
            CH3_7.setCellValue("Transactions");
            CH3_8.setCellValue("Transactions");
            CH3_9.setCellValue("Transactions");
            CH3_10.setCellValue("Sales");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell3.setCellValue(listaData.get(vi).lngQTEF);
                rcell4.setCellValue(listaData.get(vi).lngQPAS48);
                rcell5.setCellValue(listaData.get(vi).lngQTOTSAL);
                rcell6.setCellValue(listaData.get(vi).lngQACEP);
                rcell7.setCellValue(listaData.get(vi).lngQRECH);
                rcell8.setCellValue(listaData.get(vi).lngQSOSP);
                rcell9.setCellValue(listaData.get(vi).lngQTOTBK);
                rcell10.setCellValue(listaData.get(vi).lngQTOTWS);
                rcell11.setCellValue(listaData.get(vi).lngQCLAR);
                rcell12.setCellValue(listaData.get(vi).lngQCHRG);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXSwap")
    public @ResponseBody
    void getXLSXSwap(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSwap");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);

            String tit_IN_TDOC = "";
            if (listaData.get(0).strFecFiltro.equals("BDATEP")) {
                tit_IN_TDOC = "Reconciliation";
            } else if (listaData.get(0).IN_TDOC.equals("R")) {
                tit_IN_TDOC = "Refund";
            } else {
                tit_IN_TDOC = "Sales";
            }

            CH1_0.setCellValue(tit_IN_TDOC);
            CH1_1.setCellValue("Settlement Reconciliation");
            CH1_6.setCellValue("Bank Reconciliation");
            CH1_10.setCellValue("Paying");
            CH1_11.setCellValue("Bank");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Match");
            CH2_3.setCellValue("Settlement");
            CH2_4.setCellValue("Paying w/o");
            CH2_5.setCellValue("Total");
            CH2_6.setCellValue("Accepted");
            CH2_7.setCellValue("Rejected");
            CH2_8.setCellValue("Suspect");
            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("without");
            CH2_11.setCellValue("Clarifications");
            CH2_12.setCellValue("Chargeback");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);

            CH3_1.setCellValue("Auto");
            CH3_2.setCellValue("Manual");
            CH3_3.setCellValue("w/o Paying");
            CH3_4.setCellValue("Settlement");
            CH3_6.setCellValue("Tickets");
            CH3_7.setCellValue("Tickets");
            CH3_8.setCellValue("Tickets");
            CH3_9.setCellValue("Tickets");
            CH3_10.setCellValue("Sales");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell3.setCellValue(listaData.get(vi).lngQTEF);
                rcell4.setCellValue(listaData.get(vi).lngQPAS48);
                rcell5.setCellValue(listaData.get(vi).lngQTOTSAL);
                rcell6.setCellValue(listaData.get(vi).lngQACEPT);
                rcell7.setCellValue(listaData.get(vi).lngQRECHT);
                rcell8.setCellValue(listaData.get(vi).lngQSOSPT);
                rcell9.setCellValue(listaData.get(vi).lngQTOTBKT);
                rcell10.setCellValue(listaData.get(vi).lngQTOTWS);
                rcell11.setCellValue(listaData.get(vi).lngQCLAR);
                rcell12.setCellValue(listaData.get(vi).lngQCHRG);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "searchBeanAMDP_DETAIL")
    public @ResponseBody
    String searchBeanAMDP_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN")
    public @ResponseBody
    String searchBeanAMDP_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_SCAN-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN_PENDING")
    public @ResponseBody
    String searchBeanAMDP_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

}
