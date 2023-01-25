/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.screens;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.IMF111Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.screens.Dashboard01Logic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF053Filter;
import net.miatech.libcust.A005wr;
import net.miatech.libcust.A051wr;
import net.miatech.praxis.A005;
import net.miatech.praxis.A051;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.IMF117Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.utils.ExportSchema;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/Dashboard01")
public class Dashboard01Controller extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private Dashboard01Logic logic;
    private MasterDAO masterDAO;

    // =========================================================================
    // ========================== SALES ANALYSIS ========================================
    // =========================================================================
    @RequestMapping(value = "searchTest")
    public @ResponseBody
    String searchTest(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        Map<Byte, List<DashboardFilter>> mapData = new HashMap<Byte, List<DashboardFilter>>(0);
        Gson gson = new Gson();
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            mapData = logic.obtaingData(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", mapData);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDDTpMCountryofSale")
    public @ResponseBody
    String loadDDTpMCountryofSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadDDTpMCountryofSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAvisos(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAvisos(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00641(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadDDTpMAgent")
    public @ResponseBody
    String loadDDTpMAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadDDTpMAgent-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAgent(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAgent(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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
            if (!filter.ALLIC.trim().isEmpty()) {
                lst = logic.loadPX109SQP00642(filter);
            } else {
                lst = logic.loadPX109SQP01540(filter);
            }

//            lst = logic.loadPX109SQP00641(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Country of Sale *************************************
    @RequestMapping(value = "loadCountryOfSale")
    public @ResponseBody
    String loadCountryOfSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCountryofSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListCountryofSale(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListCountryofSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00644(filter, "COUNTRY");

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Flown Analysis *************************************
    @RequestMapping(value = "loadFAMonth")
    public @ResponseBody
    String loadFAMonth(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadFAMonth-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListFAMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1971Filter> getListFAMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchWK")
    public @ResponseBody
    String searchWK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchWK-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchWK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListSearchWK(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP01927(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchWKperMonth")
    public @ResponseBody
    String searchWKperMonth(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchWK-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchWKperMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }
    
    public List<A1971Filter> getListSearchWKperMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP01927M(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchFlownByMonth")
    public @ResponseBody
    String searchFlownByMonth(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownByMonth-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownByMonth(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }
    
    public List<A1971Filter> getListSearchFlownByMonth(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556MT(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchFlownOnOff")
    public @ResponseBody
    String searchFlownOnOff(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownOnOff-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownOnOff(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }
    
    public List<A1971Filter> getListSearchFlownOnOff(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556NF(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchFlownByZone")
    public @ResponseBody
    String searchFlownByZone(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownByZone-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListSearchFlownByZone(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }
    
    public List<A1971Filter> getListSearchFlownByZone(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX109SQP00556ZN(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchFlownFlight")
    public @ResponseBody
    String searchFlownFlight(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchFlownFlight-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListFlownFlight(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListFlownFlight(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP01130(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* City of Sale ****************************************
    @RequestMapping(value = "loadCityOfSale")
    public @ResponseBody
    String loadCityOfSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCityOfSale-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListCityOfSale(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListCityOfSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00644(filter, "CITY");

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* Alliances *******************************************
    @RequestMapping(value = "loadAlliances")
    public @ResponseBody
    String loadAlliances(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadAlliances-------------");

        map.put("success", true);
        List<DashboardFilter> lst = this.getListAlliances(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<DashboardFilter> getListAlliances(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            lst = logic.loadPX109SQP00988(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "loadDetAlliances")
    public @ResponseBody
    String loadDetAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01518(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetPaisAlliances")
    public @ResponseBody
    String loadDetPaisAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00641(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetAgenteAlliances")
    public @ResponseBody
    String loadDetAgenteAlliances(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01540(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    //******************** Routing Type *******************************************
    @RequestMapping(value = "loadTypeRoute")
    public @ResponseBody
    String loadTypeRoute(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01516(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeRoute")
    public @ResponseBody
    String loadDetTypeRoute(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01519(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

// ===================================== FARE TYPE ========================================================================
    @RequestMapping(value = "loadTypeFare")
    public @ResponseBody
    String loadTypeFare(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01523(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTypeFareCabin")
    public @ResponseBody
    String loadTypeFareCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01533(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTypeFareZone")
    public @ResponseBody
    String loadTypeFareZone(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01982(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeFare")
    public @ResponseBody
    String loadDetTypeFare(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01526(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetTypeFareZona")
    public @ResponseBody
    String loadDetTypeFareZona(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01983(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    /**
     * **********************Charts*****************************************
     */
    @RequestMapping(value = "loadTotalControlTotalChart")
    public @ResponseBody
    String loadTotalControlTotalChart(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadTotalControlTotalChart-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListTotalControlTotalChart(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", hm.get("lstDetalle"));
        map.put("lstTotales", hm.get("lstTotales"));
        return new Gson().toJson(map);
    }

    public HashMap getListTotalControlTotalChart(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP00994(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }
    
    @RequestMapping(value = "loadChannelsChart")
    public @ResponseBody
    String loadChannelsChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        List<DashboardFilter> lstData2;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00538(filter);
            lstData2 = logic.loadPX109SQP00540(filter);

            map.put("success", true);
            map.put("data", lstData); //lstDataChannelsTotal
            map.put("lstDataChannelsByDate", lstData2);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadCityPair")
    public @ResponseBody
    String loadCityPair(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
           
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            lstData = logic.loadPX109SQP00645(filter);

            map.put("success", true);
            map.put("data", lstData);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadSalesAgent")
    public @ResponseBody
    String loadSalesAgent(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
            
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            lstData = logic.loadVentasA1426Agente(filter);

            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            map.put("data", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadCabinChart")
    public @ResponseBody
    String loadCabinChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        Gson gson = new Gson();
        DashboardFilter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00541(filter);

            map.put("success", true);
            map.put("data", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    //******************** Chart Agent *******************************************
    @RequestMapping(value = "loadAgentChart_3")
    public @ResponseBody
    String loadAgentChart_3(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadVentasA1426Agente_3(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    //******************** GDS *******************************************
    @RequestMapping(value = "loadGDS")
    public @ResponseBody
    String loadGDS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01504(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDS")
    public @ResponseBody
    String loadDetGDS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01505(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDSAgte")
    public @ResponseBody
    String loadDetGDSAgte(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01538(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetGDSTkt")
    public @ResponseBody
    String loadDetGDSTkt(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A720Filter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP01539(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // ******************* Compare *******************************************
    @RequestMapping(value = "loadCompareSale")
    public @ResponseBody
    String loadCompareSale(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCompareSale-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListCompareSale(request, false);

        map.put("data", hm.get("lst1"));
        map.put("lst2", hm.get("lst2"));
        map.put("lst3", hm.get("lst3"));

        return new Gson().toJson(map);
    }

    public HashMap getListCompareSale(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP01571(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }

    // ******************* Totals by Cabin *******************************************
    @RequestMapping(value = "loadCabin")
    public @ResponseBody
    String loadCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            if (filter.IN_ONOFF.trim().isEmpty()) {
                lstData = logic.loadPX109SQP00932(filter);
            } else {
                lstData = logic.loadPX109SQP01542(filter);
            }

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDetailCabin")
    public @ResponseBody
    String loadDetailCabin(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<DashboardFilter> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            /*paginacion*/
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            } else {
                filter.page.PAGROW = limit;
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }
            /*paginacion*/

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP00550(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // ******************* Compare day *******************************************
    @RequestMapping(value = "loadCompareSaleDay")
    public @ResponseBody
    String loadCompareSaleDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Dashboard01 : loadCompareSaleDay-------------");
        HashMap hm = null;

        map.put("success", true);
        hm = this.getListCompareSaleDay(request, false);

        map.put("data", hm.get("lst1"));
        map.put("lst2", hm.get("lst2"));
        map.put("lst3", hm.get("lst3"));
        map.put("lst4", hm.get("lst4"));

        return new Gson().toJson(map);
    }

    public HashMap getListCompareSaleDay(HttpServletRequest request, Boolean bExcel) {

        List<DashboardFilter> lst = new ArrayList<>(0);
        DashboardFilter filter = new DashboardFilter();
        Gson gson = new Gson();
        String beanString = "";
        HashMap hm = null;

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, DashboardFilter.class);
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

            hm = logic.loadPX109SQP03478(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return hm;
    }

    /**
     * INTERLINEA
     *
     */
    @RequestMapping(value = "searchAnalysis")
    public @ResponseBody
    String searchAnalysis(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<SFI040Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX237S01SFI040_2(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchInterline")
    public @ResponseBody
    String searchInterline(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00881(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchInterlineByAir")
    public @ResponseBody
    String searchInterlineByAir(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP00882(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "obtainDataFilter_WK")
    public @ResponseBody
    String obtainDataFilter_WK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        
//        List<A005wr> lstAerolineas;
        List<A051wr> lstUsos;
        Gson gson = new Gson();
        A050Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A050Filter.class);
            
            
            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            List<A005> lstAerolineas = masterDAO.loadAirlines2();
            
            byte USO = 2;
            List<A051> lstUSO2 = masterDAO.loadUSO(this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileA005.A005KEY1, USO);            
            
//            logic = new Dashboard01Logic();
//            logic.setSession(this.serverSession.getServerSession());
//            lstUsos = logic.loadUsoswr("");

            
            map.put("success", true);
            map.put("lstAerolineas", lstAerolineas);
            map.put("data", lstUSO2);
//            map.put("data", lstUsos);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstUsos", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "search_WK")
    public @ResponseBody
    String search_WK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A050Filter> lstData;
        Gson gson = new Gson();
        WRF016Filterwk filter;
        
        HashMap hm;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, WRF016Filterwk.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            hm = logic.loadPX165S01WRF016(filter);

            map.put("success", true);
            map.put("data",  hm.get("lst1"));
            map.put("listaData2",  hm.get("lst2"));
            map.put("listaRates",  hm.get("lstRates"));

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    public String exportFieldsCompleto(HttpServletRequest request, HttpServletResponse response, List<?> lstDataObjects) throws IOException {

        String downloadName = String.format("Reporte_%1$s.xlsx", UUID.randomUUID().toString().toLowerCase());

        ExportSchema filter = new ExportSchema();
        ExportSchema filterTemp = new ExportSchema();
        ArrayList<ExportSchema> listaColRow = new ArrayList<>();

//        String beanString = "{'columns':[{'text':'Sales','columns':[{'text':'Date','dataIndex':'strFormatDate','width':90,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Totals','columns':[{'text':'Coupons','dataIndex':'QTKTS','width':80,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Fare','columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]},"
//                + "           {'text':'Percent','dataIndex':'perMim','width':70},"
//                + "           {'text':'AVG','dataIndex':'avgMim','width':70}] }";
//        String beanString = "{'columns':[{'text':'Agent','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},"
//                + "{'text':'Ctry','dataIndex':'COUNTRYS','width':50,'align':'center'},"
//                + "{'text':'Scr','dataIndex':'strDescription2','width':50,'align':'center'},"
//                + "{'text':'Type','dataIndex':'TDOC','width':50,'align':'center'},"
//                + "{'text':'Ticket Number','dataIndex':'TKT','width':120,'align':'center'},"
//                + "{'text':'Date of','columns':[{'text':'Sale','dataIndex':'FEAC','width':90,'align':'center'}]},"
//                + "{'text':'Org - Des','dataIndex':'CITYS','width':80,'align':'center'},"
//                + "{'text':'Miles','dataIndex':'PMP','width':80},"
//                + "{'text':'Cl','dataIndex':'CLASEO','width':30,'align':'center'},"
//                + "{'text':'Fare Basis','dataIndex':'FAREBASE','width':90,'align':'center'},"
//                + "{'text':'Rev. by Miles','columns':[{'text':'Sold','dataIndex':'FACRMI','width':90,'align':'center'}]},"
//                + "{'text':'Fare USD','columns':[{'text':'Sold','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},{'text':'Min. -50%','dataIndex':'VALORMIN','width':80},{'text':'Normal(Est)','dataIndex':'VALORBAS','width':80},{'text':'Diff','dataIndex':'DIFFNORMAL','width':70}]},"
//                + "{'text':'Ultima','dataIndex':'PMP','width':80}"
//                + "]}";
        String columns = "{\"columns\":" + request.getParameter("columns") + "}";

//        String columns = "{'text':'2020','text':'2020','level':20,'columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]} ";
        filter = new Gson().fromJson(columns, filter.getClass());

        ExportSchema[] column = filter.columns;

        // Creamos el archivo donde almacenaremos la hoja
        // de calculo, recuerde usar la extension correcta,
        // en este caso .xlsx
        File archivo = new File("C:\\Dumps\\reporte.xlsx");

        // Creamos el libro de trabajo de Excel formato OOXML
        Workbook workbook = new XSSFWorkbook();
        //Workbook workbook = new HSSFWorkbook();

        // La hoja donde pondremos los datos
        Sheet pagina = workbook.createSheet("Reporte de productos");

        // Creamos el estilo paga las celdas del encabezado
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);

        int nivel = 0;//Fila 0

        int q_lvl1 = -1;
        int q_lvl2 = -1;
        int q_lvl3 = -1;
        for (ExportSchema obj1 : filter.columns) {
            q_lvl1 = q_lvl1 + 1;
            if (obj1.columns != null) {
                nivel = 1;
                q_lvl1 = q_lvl1 + obj1.columns.length;

                for (ExportSchema obj2 : obj1.columns) {
                    q_lvl2 = q_lvl2 + 1;
                    if (obj2.columns != null) {
                        nivel = 2;
                        q_lvl2 = q_lvl2 + obj2.columns.length;

                        for (ExportSchema obj3 : obj2.columns) {
                            q_lvl3 = q_lvl3 + 1;
                            if (obj3.columns != null) {
                                nivel = 3;
                                q_lvl3 = q_lvl3 + obj3.columns.length;
                            }
                        }
                    }
                }
            }

            switch (nivel) {
                case 1:
                    obj1.index = q_lvl1;
                    break;
                case 2:
                    obj1.index = q_lvl2;
                    break;
                case 3:
                    obj1.index = q_lvl3;
                    break;
                default:
                    obj1.index = -20;
                    break;

            }
            q_lvl1 = -1;
            q_lvl2 = -1;
            q_lvl3 = -1;
        }

        System.out.println(nivel);
        Row fila;
        for (int r = 0; r <= nivel; r++) {
            // Creamos una fila en la hoja en la posicion 0
            fila = pagina.createRow(r);

            if (r == 0) {
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                filterTemp = filter;

                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {
                    // Creamos una celda en esa fila, en la posicion 
                    // indicada por el contador del ciclo
                    Cell celda = fila.createCell(ini_col);

                    // Indicamos el estilo que deseamos 
                    // usar en la celda, en este caso el unico 
                    // que hemos creado
                    celda.setCellStyle(style);
                    //            celda.setCellValue(titulos[i]);
                    celda.setCellValue(filterTemp.columns[i].text);

                    if (filterTemp.columns[i].columns != null) {
                        System.out.println(filterTemp.columns[i].columns.length);
                        end_col = ini_col + filterTemp.columns[i].index - 1;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, end_row, ini_col, end_col));
                        formatcelRegion(ini_row, end_row, ini_col, end_col, workbook, pagina, listaColRow, filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: " + ini_row + " row_end: " + end_row + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + filterTemp.columns[i].text);
                    } else {
                        end_col = ini_col;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, nivel, ini_col, end_col));
                        formatcelRegion(ini_row, nivel, ini_col, end_col, workbook, pagina, listaColRow, filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: " + ini_row + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + filterTemp.columns[i].text);
                    }

                    ini_col = end_col + 1;
                    /*

                     //rowFrom,rowTo,colFrom,colTo
                     //                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));*/
                }
            } else if (r == 1) {
                System.out.println("");
                System.out.println("row" + r + " : ---*************************************");
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if (filterTemp.columns[i].columns != null) {

                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {

                            // Creamos una celda en esa fila, en la posicion 
                            Cell celda = fila.createCell(ini_col);
                            celda.setCellStyle(style);
                            celda.setCellValue(col_nvl1.text);

                            if (col_nvl1.columns != null) {
                                System.out.println(col_nvl1.columns.length);
                                end_col = ini_col + col_nvl1.columns.length - 1;
                                System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, r, ini_col, end_col));
                                formatcelRegion(r, r, ini_col, end_col, workbook, pagina, listaColRow, col_nvl1.dataIndex);

                            } else {
                                end_col = ini_col;
                                System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                formatcelRegion(r, nivel, ini_col, end_col, workbook, pagina, listaColRow, col_nvl1.dataIndex);
                            }

                            ini_col = end_col + 1;

                        }
                    } else {
                        ini_col = ini_col + 1;
                    }

                }

            } else if (r == 2) {
                System.out.println("");
                System.out.println("row" + r + " : ---*************************************");
                int ini_col = 0;
                int end_col = 0;
                int ini_row = 0;
                int end_row = 0;
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if (filterTemp.columns[i].columns != null) {

                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {

                            if (col_nvl1.columns != null) {
                                ExportSchema[] columns_nvl2 = col_nvl1.columns;
                                for (ExportSchema col_nvl2 : columns_nvl2) {

                                    // Creamos una celda en esa fila, en la posicion 
                                    Cell celda = fila.createCell(ini_col);
                                    celda.setCellStyle(style);
                                    celda.setCellValue(col_nvl2.text);

                                    if (col_nvl2.columns != null) {
                                        System.out.println(col_nvl2.columns.length);
                                        end_col = ini_col + col_nvl2.columns.length - 1;
                                    } else {
                                        end_col = ini_col;
                                    }

                                    System.out.println("row_ini: " + r + " row_end: " + nivel + " col_init : " + ini_col + " col_end : " + end_col + "  text : " + col_nvl2.text);

//                                    pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                    formatcelRegion(r, nivel, ini_col, end_col, workbook, pagina, listaColRow, col_nvl2.dataIndex);

                                    ini_col = end_col + 1;

                                }

                            } else {
                                ini_col = ini_col + 1;
                            }

                        }
                    } else {
                        ini_col = ini_col + 1;
                    }

                }

            }

        }

        Collections.sort(listaColRow, new Comparator<ExportSchema>() {
            public int compare(ExportSchema o1, ExportSchema o2) {
                if (o1.colFrom == o2.colFrom) {
                    return 0;
                }
                return o1.colFrom < o2.colFrom ? -1 : 1;
            }
        });

        System.out.println("***************************");
        for (ExportSchema obj : listaColRow) {

            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);

            if (obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")) {
                System.out.println("*************************** " + obj.colFrom + " " + obj.colTo + " == " + obj.dataIndex);
            }

        }

//        Class clasePrincipal;
//        Set<Class<?>> classes = getAllExtendedOrImplementedTypesRecursively(IMF111Filter.class);
//
//        for (Class<?> clazz : classes) {
//            System.out.println(clazz.getName());
//            clasePrincipal = clazz;
//        }
        CellStyle rowStyle = workbook.createCellStyle();

        rowStyle.setBorderRight(CellStyle.BORDER_THIN);
        rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
        rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
        rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderTop(CellStyle.BORDER_THIN);
        rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

        // Y colocamos los datos en esa fila
        for (int i = 0; i < lstDataObjects.size(); i++) {

            // Ahora creamos una fila en la posicion 1
            fila = pagina.createRow((nivel + 1) + i);

            int j = 0;
            for (ExportSchema obj : listaColRow) {
                if (obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")) {
                    // Creamos una celda en esa fila, en la
                    // posicion indicada por el contador del ciclo
                    Cell celda = fila.createCell(j);

                    Object ob = lstDataObjects.get(i);
                    //Obtengo Clase
                    Class cls = ob.getClass();

                    Field f;
                    try {

//                        System.out.println(obj.dataIndex);
                        //Obtengo la Clase a la que pertenece (Clase Normal o extendida)
                        Class<?> x = cls.getField(obj.dataIndex).getDeclaringClass();

                        f = x.getDeclaredField(obj.dataIndex);
                        Class tipo = f.getType();

                        String type = tipo.getSimpleName();

//                        if(tipo.getCanonicalName()){
//                            System.out.println("----" + obj.dataIndex);
//                        }
                        f.setAccessible(true);

                        rowStyle.setAlignment(CellStyle.ALIGN_RIGHT);
                        switch (type) {
                            case "int":
                                celda.setCellValue(Integer.parseInt(String.valueOf(f.get(ob))));
                                break;
                            case "long":
                                celda.setCellValue(Long.parseLong(String.valueOf(f.get(ob))));
                                break;
                            case "double":
                                celda.setCellValue(Double.parseDouble(String.valueOf(f.get(ob))));
                                break;
                            case "float":
                                celda.setCellValue(Float.parseFloat(String.valueOf(f.get(ob))));
                                break;
                            case "String":
                                celda.setCellValue(String.valueOf(f.get(ob)));
                                rowStyle.setAlignment(CellStyle.ALIGN_CENTER);
                                break;
                            default:
                                celda.setCellValue(String.valueOf(f.get(ob)));
                                break;
                        }
                        celda.setCellStyle(rowStyle);
//                        String valor = String.valueOf(f.get(ob));
//                        celda.setCellValue(valor);

                    } catch (Exception ex) {
//                        java.util.logging.Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);

                    }

                    j++;
                }
            }
        }

        // Ahora guardaremos el archivo
        try {
//            // Creamos el flujo de salida de datos,
//            // apuntando al archivo donde queremos 
//            // almacenar el libro de Excel
//            FileOutputStream salida = new FileOutputStream(archivo);
//
//            // Almacenamos el libro de 
//            // Excel via ese 
//            // flujo de datos
//            workbook.write(salida);
//
//            // Cerramos el libro para concluir operaciones
//            salida.close();

            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());

        } catch (FileNotFoundException ex) {
//            LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de archivos");
            System.out.print(ex.getMessage());
        } catch (IOException ex) {
//            LOGGER.log(Level.SEVERE, "Error de entrada/salida");
            System.out.print(ex.getMessage());
        }

        return downloadName;
    }

    public String exportFields(HttpServletRequest request, HttpServletResponse response, List<?> lstDataObjects) {

        String downloadName = String.format("Reporte_%1$s.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            // Creamos el archivo donde almacenaremos la hoja
            // de calculo, recuerde usar la extension correcta,
            // en este caso .xlsx
//        File archivo = new File("C:\\Dumps\\" + downloadName);
            // Creamos el libro de trabajo de Excel formato OOXML
            Workbook workbook = new XSSFWorkbook();
            //Workbook workbook = new HSSFWorkbook();

            // La hoja donde pondremos los datos
            Sheet pagina = workbook.createSheet("Reporte de productos");

            // Creamos el estilo paga las celdas del encabezado
            CellStyle style = workbook.createCellStyle();
            // Indicamos que tendra un fondo azul aqua
            // con patron solido del color indicado
            style.setFillForegroundColor(IndexedColors.AQUA.getIndex());
            style.setFillPattern(style.SOLID_FOREGROUND);

            String[] titulos = {"Identificador", "Consumos",
                "Precio Venta", "Precio Compra"};
            Double[] datos = {1.0, 10.0, 45.5, 25.50};

            // Creamos una fila en la hoja en la posicion 0
            Row fila = pagina.createRow(0);

            // Creamos el encabezado
            for (int i = 0; i < titulos.length; i++) {
                // Creamos una celda en esa fila, en la posicion 
                // indicada por el contador del ciclo
                Cell celda = fila.createCell(i);

                // Indicamos el estilo que deseamos 
                // usar en la celda, en este caso el unico 
                // que hemos creado
                celda.setCellStyle(style);
                celda.setCellValue(titulos[i]);
            }

            // Ahora creamos una fila en la posicion 1
            fila = pagina.createRow(1);

            // Y colocamos los datos en esa fila
            for (int i = 0; i < datos.length; i++) {
                // Creamos una celda en esa fila, en la
                // posicion indicada por el contador del ciclo
                Cell celda = fila.createCell(i);

                celda.setCellValue(datos[i]);
            }

//            // Creamos el flujo de salida de datos,
//            // apuntando al archivo donde queremos 
//            // almacenar el libro de Excel
//            FileOutputStream salida = new FileOutputStream(archivo);
//
//            // Almacenamos el libro de 
//            // Excel via ese 
//            // flujo de datos
//            workbook.write(salida);
//
//            // Cerramos el libro para concluir operaciones
//            salida.close();
//            LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}", archivo.getAbsolutePath());
            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return downloadName;
    }

    public void formatcelRegion(int rowFrom, int rowTo, int colFrom, int colTo, Workbook workbook, Sheet pagina, ArrayList<ExportSchema> listaColRow, String dataIndex) throws IOException {

        pagina.addMergedRegion(new CellRangeAddress(rowFrom, rowTo, colFrom, colTo));
        //        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
        //        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);

        ExportSchema obj = new ExportSchema();
        obj.rowFrom = rowFrom;
        obj.rowTo = rowTo;
        obj.colFrom = colFrom;
        obj.colTo = colTo;
        obj.dataIndex = dataIndex;
        listaColRow.add(obj);

    }

    /**
     * EMD
     *
     */
    @RequestMapping(value = "searchEMD")
    public @ResponseBody
    String searchEMD(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF053Filter> lstData;
        Gson gson = new Gson();
        IMF053Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF053Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.PX109SQP03554(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDayEMD")
    public @ResponseBody
    String searchDayEMD(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF053Filter> lstData;
        Gson gson = new Gson();
        IMF053Filter filter;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF053Filter.class);

            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.PX109SQP03560(filter);

            map.put("success", true);
            map.put("data", lstData);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, (List<?>) mapData);
//                map.put("nameExcel", nameExcel);
//            } else {
//                map.put("lstData", mapData);
//            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    // =========================================================================
    // ========================== FLOWN ========================================
    // =========================================================================
    // ******************* By Zone ****************************************
    @RequestMapping(value = "searchByZone")
    public @ResponseBody
    String searchByZone(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByZone-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByZone(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByZone(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00335(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* By City Pair ****************************************
    @RequestMapping(value = "searchByCityPair")
    public @ResponseBody
    String searchByCityPair(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCityPair-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCityPair(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCityPair(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00334(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    // ******************* By Flight Profitability ****************************************
    @RequestMapping(value = "searchByFlightProfitability")
    public @ResponseBody
    String searchByFlightProfitability(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByFlightProfitability-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByFlightProfitability(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByFlightProfitability(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP04618(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchByCP_NPlane")
    public @ResponseBody
    String searchByCP_NPlane(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCP_NPlane-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCP_NPlane(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCP_NPlane(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00342(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // ******************* By Aircraft *****************************************
    @RequestMapping(value = "searchByNPlane")
    public @ResponseBody
    String searchByNPlane(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByNPlane-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByNPlane(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByNPlane(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00333(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    // ***********************************************************************
    // ************************ DRILLDOWN ALL*********************************
    // ***********************************************************************
    
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetail-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListDetai(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListDetai(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00329(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    @RequestMapping(value = "searchDetByCoupon")
    public @ResponseBody
    String searchDetByCoupon(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchDetByCoupon-------------");

        map.put("success", true);
        List<A1692Filter> lst = this.getListDetByCoupon(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getListDetByCoupon(HttpServletRequest request, Boolean bExcel) {

        List<A1692Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00330(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchByCabin")
    public @ResponseBody
    String searchByCabin(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchByCabin-------------");

        map.put("success", true);
        List<A1971Filter> lst = this.getListByCabin(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1971Filter> getListByCabin(HttpServletRequest request, Boolean bExcel) {

        List<A1971Filter> lst = new ArrayList<>(0);
        A1971Filter filter = new A1971Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1971Filter.class);
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

            lst = logic.loadPX246SQP00331(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    

    // =========================================================================
    // ========================== EXPIRED ======================================
    // =========================================================================
    @RequestMapping(value = "searchExpired")
    public @ResponseBody
    String searchExpired(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchExpired-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListExpired(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListExpired(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX109SQP02666(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchExpiredDetail")
    public @ResponseBody
    String searchExpiredDetail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- Dashboard01 : searchExpiredDetail-------------");

        map.put("success", true);
        List<IMF117Filter> lst = this.getListExpiredDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<IMF117Filter> getListExpiredDetail(HttpServletRequest request, Boolean bExcel) {

        List<IMF117Filter> lst = new ArrayList<>(0);
        IMF117Filter filter = new IMF117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new Dashboard01Logic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF117Filter.class);
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

            lst = logic.loadPX109SQP02667(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
}
