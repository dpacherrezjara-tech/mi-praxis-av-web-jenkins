/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.IMF140Filter;
import net.miatech.beans.IMF141Filter;
import net.miatech.beans.IMF072Filter;
import net.miatech.praxis.classes.ZipFiles;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ForecastLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
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

@Controller
@Scope("request")
@RequestMapping("/Forecast")
public class ForecastController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ForecastLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Forecast/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : Search-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03895(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastCouponDetail")
    public @ResponseBody
    String searchForecastCouponDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecastCouponDetail-------------");

        map.put("success", true);
        List<IMF072Filter> lst = this.getListForecastCouponDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF072Filter> getListForecastCouponDetail(HttpServletRequest request, Boolean bExcel) {

        List<IMF072Filter> lst = new ArrayList<>(0);
        IMF072Filter filter = new IMF072Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF072Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04159(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchItinerary")
    public @ResponseBody
    String searchItinerary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchItinerary-Seats-------------");

        map.put("success", true);
        List<IMF141Filter> lst = this.getListItinerary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF141Filter> getListItinerary(HttpServletRequest request, Boolean bExcel) {

        List<IMF141Filter> lst = new ArrayList<>(0);
        IMF141Filter filter = new IMF141Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF141Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03896(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchPercentage")
    public @ResponseBody
    String searchPercentage(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchPercentage-OccupationFactor-------------");
        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastPercentage(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastPercentage(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03898(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecast")
    public @ResponseBody
    String searchForecast(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecast-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecast(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecast(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03897(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastTotals")
    public @ResponseBody
    String searchForecastTotals(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecastTotals-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastTotals(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastTotals(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04160(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastZones")
    public @ResponseBody
    String searchForecastZones(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecastZones-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastZones(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastZones(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03936(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchAmountByZones")
    public @ResponseBody
    String searchAmountByZones(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchAmountByZones-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListAmountByZones(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListAmountByZones(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP03937(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchAmountByMarket")
    public @ResponseBody
    String searchAmountByMarket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchAmountByMarket-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListAmountByMarket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListAmountByMarket(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04015(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastByMarketFirstLevel")
    public @ResponseBody
    String searchForecastByMarketFirstLevel(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : SearchForecastByMarketFirstLevel-------------");

        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastByMarketFirstLevel(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastByMarketFirstLevel(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04016(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastByMarketSecondLevel")
    public @ResponseBody
    String searchForecastByMarketSecondLevel(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchForecastByMarketSecondLevel-------------");
        HashMap<String, List<IMF140Filter>> hmResultado = new HashMap<String, List<IMF140Filter>>();

        map.put("success", true);
        hmResultado = this.getListDataByMarketSecondLevel(request, false);
        List<IMF140Filter> lst = hmResultado.get("DOMESTIC");
        List<IMF140Filter> lstInternational = hmResultado.get("INTERNATIONAL");
        //List<A2324Filter> lstPnr  = hmResultado.get("PNR");
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstInternational", lstInternational);
        //map.put("lstPnr", lstPnr);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<IMF140Filter>> getListDataByMarketSecondLevel(HttpServletRequest request, Boolean bExcel) {

        HashMap<String, List<IMF140Filter>> lst = new HashMap<String, List<IMF140Filter>>();
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);
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
            lst = logic.loadPX551SQP04017(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastRevenueByYear")
    public @ResponseBody
    String searchForecastRevenueByYear(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliBoomer : searchForecastRevenueByYear-------------");
        HashMap<String, List<IMF140Filter>> hmResultado = new HashMap<String, List<IMF140Filter>>();

        map.put("success", true);
        hmResultado = this.getListDataRevenueByYear(request, false);
        List<IMF140Filter> lst = hmResultado.get("DOMESTIC");
        List<IMF140Filter> lstInternational = hmResultado.get("INTERNATIONAL");
        //List<A2324Filter> lstPnr  = hmResultado.get("PNR");
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstInternational", lstInternational);
        //map.put("lstPnr", lstPnr);
        return new Gson().toJson(map);
    }

    public HashMap<String, List<IMF140Filter>> getListDataRevenueByYear(HttpServletRequest request, Boolean bExcel) {

        HashMap<String, List<IMF140Filter>> lst = new HashMap<String, List<IMF140Filter>>();
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);
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
            lst = logic.loadPX551SQP04096(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastRevenueByYearGraphics")
    public @ResponseBody
    String searchForecastRevenueByYearGraphics(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchForecastRevenueByYearGraphics-------------");
        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastRevenueByYearGraphics(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastRevenueByYearGraphics(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04097(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastRevenueByYearBalance")
    public @ResponseBody
    String searchForecastRevenueByYearBalance(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchForecastRevenueByYearBalance-------------");
        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastRevenueByYearBalance(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastRevenueByYearBalance(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04118(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchForecastRevenueByYearGeneral")
    public @ResponseBody
    String searchForecastRevenueByYearGeneral(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Forecast : searchForecastRevenueByYearGeneral-------------");
        map.put("success", true);
        List<IMF140Filter> lst = this.getListForecastRevenueByYearGeneral(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<IMF140Filter> getListForecastRevenueByYearGeneral(HttpServletRequest request, Boolean bExcel) {

        List<IMF140Filter> lst = new ArrayList<>(0);
        IMF140Filter filter = new IMF140Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ForecastLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, IMF140Filter.class);

            // Paginacion
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

            //--------------------
            lst = logic.loadPX551SQP04119(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    //Reportes Excel
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Flown Real  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Period");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("PAX");
            CH1_3.setCellValue("Amount");
            CH1_4.setCellValue("Average");
            CH1_5.setCellValue("Amount");
            CH1_6.setCellValue("Average");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH2_0.setCellValue("Contab.");
            CH2_1.setCellValue("Flight");
            CH2_2.setCellValue("ML");
            CH2_3.setCellValue("Revenue USD");
            CH2_4.setCellValue("Revenue USD");
            CH2_5.setCellValue("Revenue MXN");
            CH2_6.setCellValue("Revenue MXN");

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

                rcell0.setCellValue(listaData.get(vi).FCONT);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).QTYPAX);
                rcell3.setCellValue(listaData.get(vi).VCPNUSD);
                rcell4.setCellValue(listaData.get(vi).VPROUSD);
                rcell5.setCellValue(listaData.get(vi).VCPNMXN);
                rcell6.setCellValue(listaData.get(vi).VPROMXN);
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

    @RequestMapping(value = "getXLSXItinerary")
    public @ResponseBody
    void getXLSXItinerary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXItinerary-Seats");
        String fileNameDownload = String.format("Seats  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF141Filter> listaData = this.getListItinerary(request, true);
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

            CH1_0.setCellValue("Flight");
            CH1_1.setCellValue("Domestic");
            CH1_2.setCellValue("");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("International");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 10));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("FRO");
            CH2_2.setCellValue("LOC");
            CH2_3.setCellValue("PLA");
            CH2_4.setCellValue("ASI");
            CH2_5.setCellValue("CAM");
            CH2_6.setCellValue("CAN");
            CH2_7.setCellValue("CAR");
            CH2_8.setCellValue("EUR");
            CH2_9.setCellValue("SUD");
            CH2_10.setCellValue("USA");
            CH2_11.setCellValue("TOTAL");

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

                rcell0.setCellValue(listaData.get(vi).DFLIGHT);
                rcell1.setCellValue(listaData.get(vi).FRO);
                rcell2.setCellValue(listaData.get(vi).LOC);
                rcell3.setCellValue(listaData.get(vi).PLA);
                rcell4.setCellValue(listaData.get(vi).ASI);
                rcell5.setCellValue(listaData.get(vi).CAM);
                rcell6.setCellValue(listaData.get(vi).CAN);
                rcell7.setCellValue(listaData.get(vi).CAR);
                rcell8.setCellValue(listaData.get(vi).EUR);
                rcell9.setCellValue(listaData.get(vi).SUD);
                rcell10.setCellValue(listaData.get(vi).USA);
                rcell11.setCellValue(listaData.get(vi).totZonas);
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

    @RequestMapping(value = "getXLSXForecast")
    public @ResponseBody
    void getXLSXForecast(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecast");
        String fileNameDownload = String.format("Forecast  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecast(request, true);
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

            CellStyle style_green = workbook.createCellStyle();
            style_green.setFillForegroundColor(IndexedColors.GREEN.getIndex());
            style_green.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_yellow = workbook.createCellStyle();
            style_yellow.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
            style_yellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_red = workbook.createCellStyle();
            style_red.setFillForegroundColor(IndexedColors.RED.getIndex());
            style_red.setFillPattern(CellStyle.SOLID_FOREGROUND);

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

            CH1_0.setCellValue("");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("PAX");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("Amount Revenue USD");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Average");
            CH1_7.setCellValue("Amount Revenue MXN");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("Average");
            CH1_10.setCellValue("Seq");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("%Var vs");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Flight");
            CH2_2.setCellValue("REAL");
            CH2_3.setCellValue("FUTURE");
            CH2_4.setCellValue("REAL");
            CH2_5.setCellValue("FUTURE");
            CH2_6.setCellValue("Revenue USD");
            CH2_7.setCellValue("REAL");
            CH2_8.setCellValue("FUTURE");
            CH2_9.setCellValue("Revenue MXN");
            CH2_10.setCellValue("week Day");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("Average Fare");

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

                rcell0.setCellValue(" ");
                if (listaData.get(vi).TREG.equals("0")) {
                    rcell0.setCellStyle(style_green);
                } else if (listaData.get(vi).TREG.equals("2")) {
                    rcell0.setCellStyle(style_yellow);
                }

                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).QTYPAX);
                rcell3.setCellValue(listaData.get(vi).QTYPAX_FORECAST);
                rcell4.setCellValue(listaData.get(vi).VCPNUSD);
                rcell5.setCellValue(listaData.get(vi).VCPNUSD_FORECAST);
                rcell6.setCellValue(listaData.get(vi).VPROUSD);
                rcell7.setCellValue(listaData.get(vi).VCPNMXN);
                rcell8.setCellValue(listaData.get(vi).VCPNMXN_FORECAST);
                rcell9.setCellValue(listaData.get(vi).VPROMXN);
                rcell10.setCellValue(listaData.get(vi).DWEEK);
                rcell11.setCellValue(" ");
                if (listaData.get(vi).VCPNMXN > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN >= 20) {
                        rcell11.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN < 20 && listaData.get(vi).AVRG_VCPNMXN >= -25) {
                        rcell11.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN < -25) {
                        rcell11.setCellStyle(style_yellow);
                    }
                }

                rcell12.setCellValue(listaData.get(vi).AVRG_VCPMXN_PORCENTAJE);
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

    @RequestMapping(value = "getXLSXForecastPercentage")
    public @ResponseBody
    void getXLSXForecastPercentage(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecastPercentage-OccupationFactor");
        String fileNameDownload = String.format("Occupation Factor  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecastPercentage(request, true);
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

            CellStyle style_green = workbook.createCellStyle();
            style_green.setFillForegroundColor(IndexedColors.GREEN.getIndex());
            style_green.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_yellow = workbook.createCellStyle();
            style_yellow.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
            style_yellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_red = workbook.createCellStyle();
            style_red.setFillForegroundColor(IndexedColors.RED.getIndex());
            style_red.setFillPattern(CellStyle.SOLID_FOREGROUND);

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

            CH1_0.setCellValue("");
            CH1_1.setCellValue("Day");
            CH1_2.setCellValue("Flight");
            CH1_3.setCellValue("Domestic");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("International");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Week");
            CH2_2.setCellValue("Date");
            CH2_3.setCellValue("FRO");
            CH2_4.setCellValue("LOC");
            CH2_5.setCellValue("PLA");
            CH2_6.setCellValue("ASI");
            CH2_7.setCellValue("CAM");
            CH2_8.setCellValue("CAN");
            CH2_9.setCellValue("CAR");
            CH2_10.setCellValue("EUR");
            CH2_11.setCellValue("SUD");
            CH2_12.setCellValue("USA");
            CH2_13.setCellValue("");

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

                rcell0.setCellValue(" ");
                if (listaData.get(vi).TREG.equals("0")) {
                    rcell0.setCellStyle(style_green);
                } else if (listaData.get(vi).TREG.equals("2")) {
                    rcell0.setCellStyle(style_yellow);
                }
                rcell1.setCellValue(listaData.get(vi).DWEEK);
                rcell2.setCellValue(listaData.get(vi).DFLIGHT);
                rcell3.setCellValue(listaData.get(vi).percentageFRO + "%");
                rcell4.setCellValue(listaData.get(vi).percentageLOC + "%");
                rcell5.setCellValue(listaData.get(vi).percentagePLA + "%");
                rcell6.setCellValue(listaData.get(vi).percentageASI + "%");
                rcell7.setCellValue(listaData.get(vi).percentageCAM + "%");
                rcell8.setCellValue(listaData.get(vi).percentageCAN + "%");
                rcell9.setCellValue(listaData.get(vi).percentageCAR + "%");
                rcell10.setCellValue(listaData.get(vi).percentageEUR + "%");                
                rcell11.setCellValue(listaData.get(vi).percentageSUD + "%");
                rcell12.setCellValue(listaData.get(vi).percentageUSA + "%");
                rcell13.setCellValue(listaData.get(vi).totalRegistros + "%");
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

    @RequestMapping(value = "getXLSXForecastZones")
    public @ResponseBody
    void getXLSXForecastZones(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecastZones");
        String fileNameDownload = String.format("Forecast Zones  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListForecastZones(request, true);
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

            CellStyle style_green = workbook.createCellStyle();
            style_green.setFillForegroundColor(IndexedColors.GREEN.getIndex());
            style_green.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_yellow = workbook.createCellStyle();
            style_yellow.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
            style_yellow.setFillPattern(CellStyle.SOLID_FOREGROUND);

            CellStyle style_red = workbook.createCellStyle();
            style_red.setFillForegroundColor(IndexedColors.RED.getIndex());
            style_red.setFillPattern(CellStyle.SOLID_FOREGROUND);

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
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);
            Cell CH1_31 = row1.createCell(31);
            Cell CH1_32 = row1.createCell(32);
            Cell CH1_33 = row1.createCell(33);
            Cell CH1_34 = row1.createCell(34);
            Cell CH1_35 = row1.createCell(35);
            Cell CH1_36 = row1.createCell(36);
            Cell CH1_37 = row1.createCell(37);
            Cell CH1_38 = row1.createCell(38);
            Cell CH1_39 = row1.createCell(39);
            Cell CH1_40 = row1.createCell(40);
            Cell CH1_41 = row1.createCell(41);
            Cell CH1_42 = row1.createCell(42);
            Cell CH1_43 = row1.createCell(43);
            Cell CH1_44 = row1.createCell(44);
            Cell CH1_45 = row1.createCell(45);
            Cell CH1_46 = row1.createCell(46);
            Cell CH1_47 = row1.createCell(47);
            Cell CH1_48 = row1.createCell(48);
            Cell CH1_49 = row1.createCell(49);
            Cell CH1_50 = row1.createCell(50);
            Cell CH1_51 = row1.createCell(51);
            Cell CH1_52 = row1.createCell(52);
            Cell CH1_53 = row1.createCell(53);
            Cell CH1_54 = row1.createCell(54);
            Cell CH1_55 = row1.createCell(55);
            Cell CH1_56 = row1.createCell(56);
            Cell CH1_57 = row1.createCell(57);
            Cell CH1_58 = row1.createCell(58);
            Cell CH1_59 = row1.createCell(59);
            Cell CH1_60 = row1.createCell(60);
            Cell CH1_61 = row1.createCell(61);
            Cell CH1_62 = row1.createCell(62);

            CH1_0.setCellValue("");
            CH1_1.setCellValue("Seq");
            CH1_2.setCellValue("Flight");
            CH1_3.setCellValue("Domestic");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("International");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("");
            CH1_33.setCellValue("");
            CH1_34.setCellValue("");
            CH1_35.setCellValue("");
            CH1_36.setCellValue("");
            CH1_37.setCellValue("");
            CH1_38.setCellValue("");
            CH1_39.setCellValue("");
            CH1_40.setCellValue("");
            CH1_41.setCellValue("");
            CH1_42.setCellValue("");
            CH1_43.setCellValue("");
            CH1_44.setCellValue("");
            CH1_45.setCellValue("");
            CH1_46.setCellValue("");
            CH1_47.setCellValue("");
            CH1_48.setCellValue("");
            CH1_49.setCellValue("");
            CH1_50.setCellValue("");
            CH1_51.setCellValue("");
            CH1_52.setCellValue("");
            CH1_53.setCellValue("");
            CH1_54.setCellValue("");
            CH1_55.setCellValue("");
            CH1_56.setCellValue("");
            CH1_57.setCellValue("");
            CH1_58.setCellValue("");
            CH1_59.setCellValue("");
            CH1_60.setCellValue("");
            CH1_61.setCellValue("");
            CH1_62.setCellValue("");

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
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);
            CH1_33.setCellStyle(headerStyle);
            CH1_34.setCellStyle(headerStyle);
            CH1_35.setCellStyle(headerStyle);
            CH1_36.setCellStyle(headerStyle);
            CH1_37.setCellStyle(headerStyle);
            CH1_38.setCellStyle(headerStyle);
            CH1_39.setCellStyle(headerStyle);
            CH1_40.setCellStyle(headerStyle);
            CH1_41.setCellStyle(headerStyle);
            CH1_42.setCellStyle(headerStyle);
            CH1_43.setCellStyle(headerStyle);
            CH1_44.setCellStyle(headerStyle);
            CH1_45.setCellStyle(headerStyle);
            CH1_46.setCellStyle(headerStyle);
            CH1_47.setCellStyle(headerStyle);
            CH1_48.setCellStyle(headerStyle);
            CH1_49.setCellStyle(headerStyle);
            CH1_50.setCellStyle(headerStyle);
            CH1_51.setCellStyle(headerStyle);
            CH1_52.setCellStyle(headerStyle);
            CH1_53.setCellStyle(headerStyle);
            CH1_54.setCellStyle(headerStyle);
            CH1_55.setCellStyle(headerStyle);
            CH1_56.setCellStyle(headerStyle);
            CH1_57.setCellStyle(headerStyle);
            CH1_58.setCellStyle(headerStyle);
            CH1_59.setCellStyle(headerStyle);
            CH1_60.setCellStyle(headerStyle);
            CH1_61.setCellStyle(headerStyle);
            CH1_62.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 62));

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
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);
            Cell CH2_26 = row2.createCell(26);
            Cell CH2_27 = row2.createCell(27);
            Cell CH2_28 = row2.createCell(28);
            Cell CH2_29 = row2.createCell(29);
            Cell CH2_30 = row2.createCell(30);
            Cell CH2_31 = row2.createCell(31);
            Cell CH2_32 = row2.createCell(32);
            Cell CH2_33 = row2.createCell(33);
            Cell CH2_34 = row2.createCell(34);
            Cell CH2_35 = row2.createCell(35);
            Cell CH2_36 = row2.createCell(36);
            Cell CH2_37 = row2.createCell(37);
            Cell CH2_38 = row2.createCell(38);
            Cell CH2_39 = row2.createCell(39);
            Cell CH2_40 = row2.createCell(40);
            Cell CH2_41 = row2.createCell(41);
            Cell CH2_42 = row2.createCell(42);
            Cell CH2_43 = row2.createCell(43);
            Cell CH2_44 = row2.createCell(44);
            Cell CH2_45 = row2.createCell(45);
            Cell CH2_46 = row2.createCell(46);
            Cell CH2_47 = row2.createCell(47);
            Cell CH2_48 = row2.createCell(48);
            Cell CH2_49 = row2.createCell(49);
            Cell CH2_50 = row2.createCell(50);
            Cell CH2_51 = row2.createCell(51);
            Cell CH2_52 = row2.createCell(52);
            Cell CH2_53 = row2.createCell(53);
            Cell CH2_54 = row2.createCell(54);
            Cell CH2_55 = row2.createCell(55);
            Cell CH2_56 = row2.createCell(56);
            Cell CH2_57 = row2.createCell(57);
            Cell CH2_58 = row2.createCell(58);
            Cell CH2_59 = row2.createCell(59);
            Cell CH2_60 = row2.createCell(60);
            Cell CH2_61 = row2.createCell(61);
            Cell CH2_62 = row2.createCell(62);

            CH2_0.setCellValue("");
            CH2_1.setCellValue("Week Day");
            CH2_2.setCellValue("Date");
            //FRO
            CH2_3.setCellValue("FRO");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("%Var vs");
            //LOC            
            CH2_9.setCellValue("LOC");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("%Var vs");
            //PLA
            CH2_15.setCellValue("PLA");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("%Var vs");
            //ASI
            CH2_21.setCellValue("ASI");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("%Var vs");
            //CAM
            CH2_27.setCellValue("CAM");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("%Var vs");
            //CAN
            CH2_33.setCellValue("CAN");
            CH2_34.setCellValue("");
            CH2_35.setCellValue("");
            CH2_36.setCellValue("");
            CH2_37.setCellValue("");
            CH2_38.setCellValue("%Var vs");
            //CAR
            CH2_39.setCellValue("CAR");
            CH2_40.setCellValue("");
            CH2_41.setCellValue("");
            CH2_42.setCellValue("");
            CH2_43.setCellValue("");
            CH2_44.setCellValue("%Var vs");
            //EUR
            CH2_45.setCellValue("EUR");
            CH2_46.setCellValue("");
            CH2_47.setCellValue("");
            CH2_48.setCellValue("");
            CH2_49.setCellValue("");
            CH2_50.setCellValue("%Var vs");
            //SUD
            CH2_51.setCellValue("SUD");
            CH2_52.setCellValue("");
            CH2_53.setCellValue("");
            CH2_54.setCellValue("");
            CH2_55.setCellValue("");
            CH2_56.setCellValue("%Var vs");
            //USA
            CH2_57.setCellValue("USA");
            CH2_58.setCellValue("");
            CH2_59.setCellValue("");
            CH2_60.setCellValue("");
            CH2_61.setCellValue("");
            CH2_62.setCellValue("%Var vs");

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
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_32.setCellStyle(headerStyle);
            CH2_33.setCellStyle(headerStyle);
            CH2_34.setCellStyle(headerStyle);
            CH2_35.setCellStyle(headerStyle);
            CH2_36.setCellStyle(headerStyle);
            CH2_37.setCellStyle(headerStyle);
            CH2_38.setCellStyle(headerStyle);
            CH2_39.setCellStyle(headerStyle);
            CH2_40.setCellStyle(headerStyle);
            CH2_41.setCellStyle(headerStyle);
            CH2_42.setCellStyle(headerStyle);
            CH2_43.setCellStyle(headerStyle);
            CH2_44.setCellStyle(headerStyle);
            CH2_45.setCellStyle(headerStyle);
            CH2_46.setCellStyle(headerStyle);
            CH2_47.setCellStyle(headerStyle);
            CH2_48.setCellStyle(headerStyle);
            CH2_49.setCellStyle(headerStyle);
            CH2_50.setCellStyle(headerStyle);
            CH2_51.setCellStyle(headerStyle);
            CH2_52.setCellStyle(headerStyle);
            CH2_53.setCellStyle(headerStyle);
            CH2_54.setCellStyle(headerStyle);
            CH2_55.setCellStyle(headerStyle);
            CH2_56.setCellStyle(headerStyle);
            CH2_57.setCellStyle(headerStyle);
            CH2_58.setCellStyle(headerStyle);
            CH2_59.setCellStyle(headerStyle);
            CH2_60.setCellStyle(headerStyle);
            CH2_61.setCellStyle(headerStyle);
            CH2_62.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 30));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 33, 36));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 39, 42));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 45, 48));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 51, 54));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 57, 60));
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
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);
            Cell CH3_26 = row3.createCell(26);
            Cell CH3_27 = row3.createCell(27);
            Cell CH3_28 = row3.createCell(28);
            Cell CH3_29 = row3.createCell(29);
            Cell CH3_30 = row3.createCell(30);
            Cell CH3_31 = row3.createCell(31);
            Cell CH3_32 = row3.createCell(32);
            Cell CH3_33 = row3.createCell(33);
            Cell CH3_34 = row3.createCell(34);
            Cell CH3_35 = row3.createCell(35);
            Cell CH3_36 = row3.createCell(36);
            Cell CH3_37 = row3.createCell(37);
            Cell CH3_38 = row3.createCell(38);
            Cell CH3_39 = row3.createCell(39);
            Cell CH3_40 = row3.createCell(40);
            Cell CH3_41 = row3.createCell(41);
            Cell CH3_42 = row3.createCell(42);
            Cell CH3_43 = row3.createCell(43);
            Cell CH3_44 = row3.createCell(44);
            Cell CH3_45 = row3.createCell(45);
            Cell CH3_46 = row3.createCell(46);
            Cell CH3_47 = row3.createCell(47);
            Cell CH3_48 = row3.createCell(48);
            Cell CH3_49 = row3.createCell(49);
            Cell CH3_50 = row3.createCell(50);
            Cell CH3_51 = row3.createCell(51);
            Cell CH3_52 = row3.createCell(52);
            Cell CH3_53 = row3.createCell(53);
            Cell CH3_54 = row3.createCell(54);
            Cell CH3_55 = row3.createCell(55);
            Cell CH3_56 = row3.createCell(56);
            Cell CH3_57 = row3.createCell(57);
            Cell CH3_58 = row3.createCell(58);
            Cell CH3_59 = row3.createCell(59);
            Cell CH3_60 = row3.createCell(60);
            Cell CH3_61 = row3.createCell(61);
            Cell CH3_62 = row3.createCell(62);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            //ASI
            CH3_3.setCellValue("PAX");
            CH3_4.setCellValue("AVG USD");
            CH3_5.setCellValue("AMOUNT USD");
            CH3_6.setCellValue("AMOUNT MXN");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Average Fare");
            //CAM            
            CH3_9.setCellValue("PAX");
            CH3_10.setCellValue("AVG USD");
            CH3_11.setCellValue("AMOUNT USD");
            CH3_12.setCellValue("AMOUNT MXN");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("Average Fare");
            //CAN
            CH3_15.setCellValue("PAX");
            CH3_16.setCellValue("AVG USD");
            CH3_17.setCellValue("AMOUNT USD");
            CH3_18.setCellValue("AMOUNT MXN");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("Average Fare");
            //CAR
            CH3_21.setCellValue("PAX");
            CH3_22.setCellValue("AVG USD");
            CH3_23.setCellValue("AMOUNT USD");
            CH3_24.setCellValue("AMOUNT MXN");
            CH3_25.setCellValue("");
            CH3_26.setCellValue("Average Fare");
            //EUR
            CH3_27.setCellValue("PAX");
            CH3_28.setCellValue("AVG USD");
            CH3_29.setCellValue("AMOUNT USD");
            CH3_30.setCellValue("AMOUNT MXN");
            CH3_31.setCellValue("");
            CH3_32.setCellValue("Average Fare");
            //FRO
            CH3_33.setCellValue("PAX");
            CH3_34.setCellValue("AVG USD");
            CH3_35.setCellValue("AMOUNT USD");
            CH3_36.setCellValue("AMOUNT MXN");
            CH3_37.setCellValue("");
            CH3_38.setCellValue("Average Fare");
            //LOC
            CH3_39.setCellValue("PAX");
            CH3_40.setCellValue("AVG USD");
            CH3_41.setCellValue("AMOUNT USD");
            CH3_42.setCellValue("AMOUNT MXN");
            CH3_43.setCellValue("");
            CH3_44.setCellValue("Average Fare");
            //EUR
            CH3_45.setCellValue("PAX");
            CH3_46.setCellValue("AVG USD");
            CH3_47.setCellValue("AMOUNT USD");
            CH3_48.setCellValue("AMOUNT MXN");
            CH3_49.setCellValue("");
            CH3_50.setCellValue("Average Fare");
            //SUD
            CH3_51.setCellValue("PAX");
            CH3_52.setCellValue("AVG USD");
            CH3_53.setCellValue("AMOUNT USD");
            CH3_54.setCellValue("AMOUNT MXN");
            CH3_55.setCellValue("");
            CH3_56.setCellValue("Average Fare");
            //USA
            CH3_57.setCellValue("PAX");
            CH3_58.setCellValue("AVG USD");
            CH3_59.setCellValue("AMOUNT USD");
            CH3_60.setCellValue("AMOUNT MXN");
            CH3_61.setCellValue("");
            CH3_62.setCellValue("Average Fare");

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
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);
            CH3_26.setCellStyle(headerStyle);
            CH3_27.setCellStyle(headerStyle);
            CH3_28.setCellStyle(headerStyle);
            CH3_29.setCellStyle(headerStyle);
            CH3_30.setCellStyle(headerStyle);
            CH3_31.setCellStyle(headerStyle);
            CH3_32.setCellStyle(headerStyle);
            CH3_33.setCellStyle(headerStyle);
            CH3_34.setCellStyle(headerStyle);
            CH3_35.setCellStyle(headerStyle);
            CH3_36.setCellStyle(headerStyle);
            CH3_37.setCellStyle(headerStyle);
            CH3_38.setCellStyle(headerStyle);
            CH3_39.setCellStyle(headerStyle);
            CH3_40.setCellStyle(headerStyle);
            CH3_41.setCellStyle(headerStyle);
            CH3_42.setCellStyle(headerStyle);
            CH3_43.setCellStyle(headerStyle);
            CH3_44.setCellStyle(headerStyle);
            CH3_45.setCellStyle(headerStyle);
            CH3_46.setCellStyle(headerStyle);
            CH3_47.setCellStyle(headerStyle);
            CH3_48.setCellStyle(headerStyle);
            CH3_49.setCellStyle(headerStyle);
            CH3_50.setCellStyle(headerStyle);
            CH3_51.setCellStyle(headerStyle);
            CH3_52.setCellStyle(headerStyle);
            CH3_53.setCellStyle(headerStyle);
            CH3_54.setCellStyle(headerStyle);
            CH3_55.setCellStyle(headerStyle);
            CH3_56.setCellStyle(headerStyle);
            CH3_57.setCellStyle(headerStyle);
            CH3_58.setCellStyle(headerStyle);
            CH3_59.setCellStyle(headerStyle);
            CH3_60.setCellStyle(headerStyle);
            CH3_61.setCellStyle(headerStyle);
            CH3_62.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
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
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);
                Cell rcell31 = row1.createCell(31);
                Cell rcell32 = row1.createCell(32);
                Cell rcell33 = row1.createCell(33);
                Cell rcell34 = row1.createCell(34);
                Cell rcell35 = row1.createCell(35);
                Cell rcell36 = row1.createCell(36);
                Cell rcell37 = row1.createCell(37);
                Cell rcell38 = row1.createCell(38);
                Cell rcell39 = row1.createCell(39);
                Cell rcell40 = row1.createCell(40);
                Cell rcell41 = row1.createCell(41);
                Cell rcell42 = row1.createCell(42);
                Cell rcell43 = row1.createCell(43);
                Cell rcell44 = row1.createCell(44);
                Cell rcell45 = row1.createCell(45);
                Cell rcell46 = row1.createCell(46);
                Cell rcell47 = row1.createCell(47);
                Cell rcell48 = row1.createCell(48);
                Cell rcell49 = row1.createCell(49);
                Cell rcell50 = row1.createCell(50);
                Cell rcell51 = row1.createCell(51);
                Cell rcell52 = row1.createCell(52);
                Cell rcell53 = row1.createCell(53);
                Cell rcell54 = row1.createCell(54);
                Cell rcell55 = row1.createCell(55);
                Cell rcell56 = row1.createCell(56);
                Cell rcell57 = row1.createCell(57);
                Cell rcell58 = row1.createCell(58);
                Cell rcell59 = row1.createCell(59);
                Cell rcell60 = row1.createCell(60);
                Cell rcell61 = row1.createCell(61);
                Cell rcell62 = row1.createCell(62);

                rcell0.setCellValue(" ");
                if (listaData.get(vi).TREG.equals("0")) {
                    rcell0.setCellStyle(style_green);
                } else if (listaData.get(vi).TREG.equals("2")) {
                    rcell0.setCellStyle(style_yellow);
                }

                rcell1.setCellValue(listaData.get(vi).DWEEK);
                rcell2.setCellValue(listaData.get(vi).DFLIGHT);
                //FRO
                rcell3.setCellValue(listaData.get(vi).PAXFRO);
                rcell4.setCellValue(listaData.get(vi).VPROUSDFRO);
                rcell5.setCellValue(listaData.get(vi).VCPNUSDFRO);
                rcell6.setCellValue(listaData.get(vi).VCPNMXNFRO);
                rcell7.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNFRO > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO >= 20) {
                        rcell7.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO < 20 && listaData.get(vi).AVRG_VCPNMXN_FRO >= -25) {
                        rcell7.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_FRO < -25) {
                        rcell7.setCellStyle(style_yellow);
                    }
                }
                rcell8.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_FRO, 2));
                //LOC
                rcell9.setCellValue(listaData.get(vi).PAXLOC);
                rcell10.setCellValue(listaData.get(vi).VPROUSDLOC);
                rcell11.setCellValue(listaData.get(vi).VCPNUSDLOC);
                rcell12.setCellValue(listaData.get(vi).VCPNMXNLOC);
                rcell13.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNLOC > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC >= 20) {
                        rcell13.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC < 20 && listaData.get(vi).AVRG_VCPNMXN_LOC >= -25) {
                        rcell13.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_LOC < -25) {
                        rcell13.setCellStyle(style_yellow);
                    }
                }
                rcell14.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_LOC, 2));
                //PLA
                rcell15.setCellValue(listaData.get(vi).PAXPLA);
                rcell16.setCellValue(listaData.get(vi).VPROUSDPLA);
                rcell17.setCellValue(listaData.get(vi).VCPNUSDPLA);
                rcell18.setCellValue(listaData.get(vi).VCPNMXNPLA);
                rcell19.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNPLA > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA >= 20) {
                        rcell19.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA < 20 && listaData.get(vi).AVRG_VCPNMXN_PLA >= -25) {
                        rcell19.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_PLA < -25) {
                        rcell19.setCellStyle(style_yellow);
                    }
                }
                rcell20.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_PLA, 2));
                //ASI
                rcell21.setCellValue(listaData.get(vi).PAXASI);
                rcell22.setCellValue(listaData.get(vi).VPROUSDASI);
                rcell23.setCellValue(listaData.get(vi).VCPNUSDASI);
                rcell24.setCellValue(listaData.get(vi).VCPNMXNASI);
                rcell25.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNASI > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI >= 20) {
                        rcell25.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI < 20 && listaData.get(vi).AVRG_VCPNMXN_ASI >= -25) {
                        rcell25.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_ASI < -25) {
                        rcell25.setCellStyle(style_yellow);
                    }
                }
                rcell26.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_ASI, 2));
                //CAM
                rcell27.setCellValue(listaData.get(vi).PAXCAM);
                rcell28.setCellValue(listaData.get(vi).VPROUSDCAM);
                rcell29.setCellValue(listaData.get(vi).VCPNUSDCAM);
                rcell30.setCellValue(listaData.get(vi).VCPNMXNCAM);
                rcell31.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAM > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM >= 20) {
                        rcell31.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM < 20 && listaData.get(vi).AVRG_VCPNMXN_CAM >= -25) {
                        rcell31.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAM < -25) {
                        rcell31.setCellStyle(style_yellow);
                    }
                }
                rcell32.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAM, 2));
                //CAN
                rcell33.setCellValue(listaData.get(vi).PAXCAN);
                rcell34.setCellValue(listaData.get(vi).VPROUSDCAN);
                rcell35.setCellValue(listaData.get(vi).VCPNUSDCAN);
                rcell36.setCellValue(listaData.get(vi).VCPNMXNCAN);
                rcell37.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAN > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN >= 20) {
                        rcell37.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN < 20 && listaData.get(vi).AVRG_VCPNMXN_CAN >= -25) {
                        rcell37.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAN < -25) {
                        rcell37.setCellStyle(style_yellow);
                    }
                }
                rcell38.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAN, 2));
                //CAR
                rcell39.setCellValue(listaData.get(vi).PAXCAR);
                rcell40.setCellValue(listaData.get(vi).VPROUSDCAR);
                rcell41.setCellValue(listaData.get(vi).VCPNUSDCAR);
                rcell42.setCellValue(listaData.get(vi).VCPNMXNCAR);
                rcell43.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNCAR > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR >= 20) {
                        rcell43.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR < 20 && listaData.get(vi).AVRG_VCPNMXN_CAR >= -25) {
                        rcell43.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_CAR < -25) {
                        rcell43.setCellStyle(style_yellow);
                    }
                }
                rcell44.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_CAR, 2));
                //EUR
                rcell45.setCellValue(listaData.get(vi).PAXEUR);
                rcell46.setCellValue(listaData.get(vi).VPROUSDEUR);
                rcell47.setCellValue(listaData.get(vi).VCPNUSDEUR);
                rcell48.setCellValue(listaData.get(vi).VCPNMXNEUR);
                rcell49.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNEUR > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR >= 20) {
                        rcell49.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR < 20 && listaData.get(vi).AVRG_VCPNMXN_EUR >= -25) {
                        rcell49.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_EUR < -25) {
                        rcell49.setCellStyle(style_yellow);
                    }
                }
                rcell50.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_EUR, 2));
                //SUD
                rcell51.setCellValue(listaData.get(vi).PAXSUD);
                rcell52.setCellValue(listaData.get(vi).VPROUSDSUD);
                rcell53.setCellValue(listaData.get(vi).VCPNUSDSUD);
                rcell54.setCellValue(listaData.get(vi).VCPNMXNSUD);
                rcell55.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNSUD > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD >= 20) {
                        rcell55.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD < 20 && listaData.get(vi).AVRG_VCPNMXN_SUD >= -25) {
                        rcell55.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_SUD < -25) {
                        rcell55.setCellStyle(style_yellow);
                    }
                }
                rcell56.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_SUD, 2));
                //USA
                rcell57.setCellValue(listaData.get(vi).PAXUSA);
                rcell58.setCellValue(listaData.get(vi).VPROUSDUSA);
                rcell59.setCellValue(listaData.get(vi).VCPNUSDUSA);
                rcell60.setCellValue(listaData.get(vi).VCPNMXNUSA);
                rcell61.setCellValue(" ");
                if (listaData.get(vi).VCPNMXNUSA > 0) {
                    if (listaData.get(vi).AVRG_VCPNMXN_USA >= 20) {
                        rcell61.setCellStyle(style_red);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_USA < 20 && listaData.get(vi).AVRG_VCPNMXN_USA >= -25) {
                        rcell61.setCellStyle(style_green);
                    }
                    if (listaData.get(vi).AVRG_VCPNMXN_USA < -25) {
                        rcell61.setCellStyle(style_yellow);
                    }
                }
                rcell62.setCellValue(Functions.redondear(listaData.get(vi).AVRG_VCPNMXN_USA, 2));
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
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);
            sheet.autoSizeColumn(39, true);
            sheet.autoSizeColumn(40, true);
            sheet.autoSizeColumn(41, true);
            sheet.autoSizeColumn(42, true);
            sheet.autoSizeColumn(43, true);
            sheet.autoSizeColumn(44, true);
            sheet.autoSizeColumn(45, true);
            sheet.autoSizeColumn(46, true);
            sheet.autoSizeColumn(47, true);
            sheet.autoSizeColumn(48, true);
            sheet.autoSizeColumn(49, true);
            sheet.autoSizeColumn(50, true);
            sheet.autoSizeColumn(51, true);
            sheet.autoSizeColumn(52, true);
            sheet.autoSizeColumn(53, true);
            sheet.autoSizeColumn(54, true);
            sheet.autoSizeColumn(55, true);
            sheet.autoSizeColumn(56, true);
            sheet.autoSizeColumn(57, true);
            sheet.autoSizeColumn(58, true);
            sheet.autoSizeColumn(59, true);
            sheet.autoSizeColumn(60, true);
            sheet.autoSizeColumn(61, true);
            sheet.autoSizeColumn(62, true);

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

    @RequestMapping(value = "getXLSXAmountByZones")
    public @ResponseBody
    void getXLSXAmountByZones(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXAmountByZones");
        String fileNameDownload = String.format("Amount By Zones  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF140Filter> listaData = this.getListAmountByZones(request, true);
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

            CH1_0.setCellValue("REGION");
            CH1_1.setCellValue("AMOUNT MXN");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);

            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);

                rcell0.setCellValue(listaData.get(vi).ZONA);
                rcell1.setCellValue(listaData.get(vi).VCPNMXN);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);

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

    @RequestMapping(value = "getXLSXForecastCouponDetail")
    public @ResponseBody
    void getXLSXForecastCouponDetail(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXForecastCouponDetail");
        String fileNameDownload = String.format("Report Forecast Coupon Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<IMF072Filter> listaData = this.getListForecastCouponDetail(request, true);
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

            CH1_0.setCellValue("Date");
            CH1_1.setCellValue("Ticket");
            CH1_2.setCellValue("Coupon");
            CH1_3.setCellValue("Zone");
            CH1_4.setCellValue("Flight");
            CH1_5.setCellValue("Document");
            CH1_6.setCellValue("Value USD");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH2_0.setCellValue("Flight");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("Number");
            CH2_5.setCellValue("Type");
            CH2_6.setCellValue("");

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

                rcell0.setCellValue(listaData.get(vi).DFLIGHT);
                rcell1.setCellValue(listaData.get(vi).TICKET);
                rcell2.setCellValue(listaData.get(vi).CUPON);
                rcell3.setCellValue(listaData.get(vi).ZONA);
                rcell4.setCellValue(listaData.get(vi).NFLIGHT);
                rcell5.setCellValue(listaData.get(vi).TRNCU);
                rcell6.setCellValue(listaData.get(vi).VALOR);
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

    @RequestMapping(value = "/getTXTForecastCouponDetail")
    public @ResponseBody
    void getTXTForecastCouponDetail(HttpServletRequest request, HttpServletResponse response) {
        try {
            String serverPath = request.getSession().getServletContext().getRealPath("/");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHSS");
            String path = sdf.format(new Date());
            ZipFiles zipFiles = new ZipFiles();
            List<File> srcfile = new ArrayList<File>();

            srcfile.add(downloadTXTForecastCouponDetail(request));

            File zipfile = new File(serverPath + path + ".zip");
            zipFiles.zipFiles(srcfile, zipfile);
            zipFiles.downFile(response, serverPath, path + ".zip");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public File downloadTXTForecastCouponDetail(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_ForecastCouponDetail");

        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);

        String fileNameDownload = String.format("Forecast Coupon Detail" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;

        try {

            File file = File.createTempFile(fileNameDownload, ".txt");
            List<IMF072Filter> lst = this.getListForecastCouponDetail(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());

            PrintWriter writer = new PrintWriter(file, "UTF-8");

            cadena = "Date Flight|Ticket|Coupon|Zone|Flight Number|Document Type|Value USD|";

            writer.println("" + cadena);

            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena += lst.get(vi).DFLIGHT + "|";
                cadena += lst.get(vi).TICKET + "|";
                cadena += lst.get(vi).CUPON + "|";
                cadena += lst.get(vi).ZONA + "|";
                cadena += lst.get(vi).NFLIGHT + "|";
                cadena += lst.get(vi).TRNCU + "|";
                cadena += df_2.format(lst.get(vi).VALOR) + "|";

                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
}
