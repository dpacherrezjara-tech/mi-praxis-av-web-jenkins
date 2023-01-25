/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.beans.UserView;
import net.miatech.dao.LoadDataDAO;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BalanceAnalysisLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2365Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author ctarazona
 */
@Controller
@Scope("request")
@RequestMapping("/BalanceAnalysis")
public class BalanceAnalysisController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BalanceAnalysisLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- BalanceAnalysisController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/BalanceAnalysis/form_index";
    }

    @RequestMapping(value = "search_1")
    public @ResponseBody
    String search_1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search_1-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch_1(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    public List<A2290Filter> getListSearch_1(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00936_1(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search_2")
    public @ResponseBody
    String search_2(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search_2-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch_2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearch_2(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00936_2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search_3")
    public @ResponseBody
    String search_3(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search_3-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch_3(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearch_3(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00936_3(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    /*
     public JavaToFlexResponse searchSourceChart(IMF101Filter filter) {

     JavaToFlexResponse resp = new JavaToFlexResponse();
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrWorkProgressAudit.class.getCanonicalName() + " :  search");

     HashMap hm;
     List<IMF101Filter> lista = new ArrayList<IMF101Filter>();

     try {

     WorkProgressAuditLogic logic = new WorkProgressAuditLogic();
     logic.setSession(serverSession);
     hm = logic.loadPX382SQP01806(filter);
            
            
     resp.vars.put("listaDataSource", hm.get("lstDataAnual"));

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }
     return resp;
     }*/

    @RequestMapping(value = "searchSourceChart")
    public @ResponseBody
    String searchSourceChart(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchSourceChart-------------");

        map.put("success", true);
        HashMap<String, List<A2290Filter>> lst = this.getListSearchSourceChart(request, false);
        List<A2290Filter> listaDataSource = lst.get("listaDataSource");
        List<A2290Filter> lstDataPIE = lst.get("lstDataPIE");

        System.out.println("Total : " + lst.size());

        map.put("listaDataSource", listaDataSource);
        map.put("lstDataPIE", lstDataPIE);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<A2290Filter>> getListSearchSourceChart(HttpServletRequest request, Boolean bExcel) {

        //List<A2309AFilter> lst = new ArrayList<>(0);
        HashMap<String, List<A2290Filter>> lst = new HashMap<String, List<A2290Filter>>();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01806(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearch(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00936(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTOTAL")
    public @ResponseBody
    String searchTOTAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchTOTAL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListsearchTOTALData(request, false);
        A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListsearchTOTALData(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01002(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public A2290Filter getListSearchTOTALObj(HttpServletRequest request, Boolean bExcel) {

        A2290Filter lst = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01052_1(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search_ACCB")
    public @ResponseBody
    String search_ACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search_ACCB-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch_ACCB(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearch_ACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01051(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchTOTAL_ACCB")
    public @ResponseBody
    String searchTOTAL_ACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchTOTAL_ACCB-------------");
        map.put("success", true);
        List<A2290Filter> lst = this.getListSearchTOTAL_ACCB(request, false);
        A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchTOTAL_ACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01052(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTOTAL_ACCB_Det_COUNTRY")
    public @ResponseBody
    String searchTOTAL_ACCB_Det_COUNTRY(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchTOTAL_ACCB_Det_COUNTRY-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListSearchTOTAL_ACCB_Det_COUNTRY(request, false);
        A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);        
    }

    public List<A2290Filter> getListSearchTOTAL_ACCB_Det_COUNTRY(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01577(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search_SETT")
    public @ResponseBody
    String search_SETT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : search_SETT-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearch_SETT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearch_SETT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01053(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTOTAL_SETT")
    public @ResponseBody
    String searchTOTAL_SETT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchTOTAL_SETT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListSearchTOTAL_SETT(request, false);
        A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchTOTAL_SETT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01054(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    
    /*public JavaToFlexResponse searchTOTAL_excel(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : searchTOTAL_excel");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP01002(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_EXCEL(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_EXCEL");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP00936(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_EXCEL_1(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_EXCEL_1");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP00936_1(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_EXCEL_2(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_EXCEL_2");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP00936_2(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_EXCEL_3(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_EXCEL_3");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP00936_3(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_ACCBexcel(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_ACCBexcel");
     //UserView user = serverSession.getUserView();
     //Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;

     try {
     /*cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);*

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP01051(filter);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse searchTOTAL_ACCBexcel(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : searchTOTAL_ACCBexcel");
     //UserView user = serverSession.getUserView();
     //Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     /*cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);*

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP01052(filter);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse search_SETTexcel(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : search_SETTexcel");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP01053(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }

     public JavaToFlexResponse searchTOTAL_SETTexcel(A2290Filter filter) {
     JavaToFlexResponse resp = new JavaToFlexResponse();

     List<A2290Filter> listaData_EXCEL;
     Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBalance.class.getCanonicalName() + " : searchTOTAL_SETTexcel");
     UserView user = serverSession.getUserView();
     Connection cnx = null;
     filter.page.PAGROW = -1;
     filter.page.PAGNUM = -1;
     try {
     cnx = serverSession.getCNXIBMDB2().getIBMDB2Connection();
     LoadDataDAO dao = new LoadDataDAO(serverSession);
     HashMap<String, String> hmDescBank = dao.loadCardHash(cnx, user);
     serverSession.getCNXIBMDB2().closeIBMDB2Connection(cnx);

     BalanceAnalysisLogic logic = new BalanceAnalysisLogic();
     logic.setSession(serverSession);
     listaData_EXCEL = logic.loadPX307SQP01054(filter, hmDescBank);
     resp.vars.put("listaData_EXCEL", listaData_EXCEL);

     } catch (SQLException e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     } catch (Exception e) {
     resp.info.add(e.getMessage());
     logError.error(e.getMessage());
     }

     return resp;
     }*/
    @RequestMapping(value = "searchDetBank")
    public @ResponseBody
    String searchDetBank(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetBank-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetBank(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetBank(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00943(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetTicket-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstDetTKT", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetTicket(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP00945(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetBankACCB")
    public @ResponseBody
    String searchDetBankACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetBankACCB-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetBankACCB(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetBankACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01055(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTicketACCB")
    public @ResponseBody
    String searchDetTicketACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetTicketACCB-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetTicketACCB(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstDetTKT", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetTicketACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01056(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetBankSETT")
    public @ResponseBody
    String searchDetBankSETT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetBankSETT-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetBankSETT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetBankSETT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01057(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTicketSETT")
    public @ResponseBody
    String searchDetTicketSETT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetTicketSETT-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListSearchDetTicketSETT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstDetTKT", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetTicketSETT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01058(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTOTALBankACCB")
    public @ResponseBody
    String searchDetTOTALBankACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetTOTALBankACCB-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListSearchDetTOTALBankACCB(request, false);
        A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetTOTALBankACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01154(filter); //OJO

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTOTALTicketACCB")
    public @ResponseBody
    String searchDetTOTALTicketACCB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchDetTOTALTicketACCB-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListSearchDetTOTALTicketACCB(request, false);
        //A2290Filter objRtn = this.getListSearchTOTALObj(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstDetTKT", lst);
        //map.put("objRtn", objRtn);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListSearchDetTOTALTicketACCB(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307_COBOL_TKT(filter, ""); //VER QUE TIPO LE ENVIA

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPendingPayment")
    public @ResponseBody
    String searchPendingPayment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysis : searchPendingPayment-------------");

        map.put("success", true);

        List<A2365Filter> lst = this.getListSearchPendingPayment(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstPendPay", lst);
        return new Gson().toJson(map);
    }

    public List<A2365Filter> getListSearchPendingPayment(HttpServletRequest request, Boolean bExcel) {

        List<A2365Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisLogic();
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

            lst = logic.loadPX307SQP01812(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
}
