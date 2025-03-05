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
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BalanceAnalysisByAgeLogic;
import net.miatech.praxis.logic.program.ProPaymentsControlLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
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

@Controller
@Scope("request")
@RequestMapping("/BalanceAnalysisByAge")
public class BalanceAnalysisByAgeController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BalanceAnalysisByAgeLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/BalanceAnalysisByAge/form_index";
    }

    @RequestMapping(value = "/obtainMessagesDT")
    public @ResponseBody
    String obtainMessagesDT(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP05103_DEBITYPE(filter);

            map.put("success", true);
            System.out.println("Total : " + lst.size());
            map.put("data", lst);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : Search-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSalesTotal")
    public @ResponseBody
    String searchSalesTotal(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchSalesTotal-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListSalesTotal(request, false);
        List<A2356Filter> lst2 = this.getListSalesTotal_Bard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListSalesTotal(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_ST(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListSalesTotal_Bard(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_ST_BARD(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchCountryTotal")
    public @ResponseBody
    String searchCountryTotal(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchCountryTotal-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListCountryTotal(request, false);
        List<A2356Filter> lst2 = this.getListCountryTotal2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListCountryTotal(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_CT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<A2356Filter> getListCountryTotal2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_CT2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchRD")
    public @ResponseBody
    String searchRD(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchRD-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListRD(request, false);
        List<A2356Filter> lst2 = this.getListRD2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListRD(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RD(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListRD2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RD2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchRM")
    public @ResponseBody
    String searchRM(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchRM-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListRM(request, false);
        List<A2356Filter> lst2 = this.getListRM2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListRM(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RM(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListRM2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RM2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchRC")
    public @ResponseBody
    String searchRC(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchRC-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListRC(request, false);
        List<A2356Filter> lst2 = this.getListRC2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListRC(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RC(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListRC2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RC2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchRP")
    public @ResponseBody
    String searchRP(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchRP-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListRP(request, false);
        List<A2356Filter> lst2 = this.getListRP2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListRP(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RP(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListRP2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RP2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchRS")
    public @ResponseBody
    String searchRS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchRC-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListRS(request, false);
        List<A2356Filter> lst2 = this.getListRS2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListRS(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RS(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A2356Filter> getListRS2(HttpServletRequest request, Boolean bExcel) {

        List<A2356Filter> lst = new ArrayList<>(0);
        A2356Filter filter = new A2356Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
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

            lst = logic.loadSQP05120_RS2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Balance Analysis Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2356Filter> listaData = this.getListRD(request, true);
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

            CH1_0.setCellValue("Sales Date");
            CH1_1.setCellValue("Days Old");
            CH1_2.setCellValue("Country");
            CH1_3.setCellValue("Agent");
            CH1_4.setCellValue("Canal");
            CH1_5.setCellValue("Name");
            CH1_6.setCellValue("Total USD QtyTkt");
            CH1_7.setCellValue("Total USD Amount");
            CH1_8.setCellValue("Paid USD QtyTkt");
            CH1_9.setCellValue("Paid USD Amount");
            CH1_10.setCellValue("Pending USD Amount");
            CH1_11.setCellValue("Percentage % Paid");
            CH1_12.setCellValue("Percentage % Pending");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
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

                rcell0.setCellValue(listaData.get(vi).SDATE);
                rcell1.setCellValue(listaData.get(vi).DIFFDAYS);
                rcell2.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell3.setCellValue(listaData.get(vi).SAGENT);
                rcell4.setCellValue(listaData.get(vi).CANAL);
                rcell5.setCellValue(listaData.get(vi).descSAGENT);
                rcell6.setCellValue(listaData.get(vi).QTYTKT);
                rcell7.setCellValue(listaData.get(vi).SVFOPUSD);
                rcell8.setCellValue(listaData.get(vi).QTYTKTP);
                rcell9.setCellValue(listaData.get(vi).SVFOPUSDP);
                rcell10.setCellValue(listaData.get(vi).SVFOPUSDPENDING);
                rcell11.setCellValue(listaData.get(vi).PERCPAID);
                rcell12.setCellValue(listaData.get(vi).PERCPENDING);
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

    @RequestMapping(value = "searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchBean-------------");

        Gson gson = new Gson();
        A2356Filter filter = new A2356Filter();
        A2356Filter result = new A2356Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2356Filter.class);

        logic = new BalanceAnalysisByAgeLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadSQP02856(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "maintenanceBean")
    public @ResponseBody
    String maintenanceBean(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : maintenanceBean-------------");

        Gson gson = new Gson();
        A2356Filter filter = new A2356Filter();
        String msj = "";
        String option;

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2356Filter.class);
            option = request.getParameter("option");

            msj = logic.loadSQP02857(filter, option);
            map.put("Mensaje", msj);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getDataAudit", method = RequestMethod.POST)
    public @ResponseBody
    String getDataAudit(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : getDataAudit-------------");

        Gson gson = new Gson();
        A2356Filter filter = new A2356Filter();
        A2356Filter result = new A2356Filter();
//        String beanString;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
//        beanString = request.getParameter("beanString");
//        filter = gson.fromJson(beanString, A2356Filter.class);

            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());
            UserView user = this.serverSession.getServerSession().getUserView();

            result = logic.loadSQP05120_AD();
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {

            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchClarificationTOT")
    public @ResponseBody
    String searchClarificationTOT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchClarificationTOT-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarificationTOT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarificationTOT(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP03203(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchClarification")
    public @ResponseBody
    String searchClarification(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchClarification-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarification(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarification(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP02079(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetClarifBank")
    public @ResponseBody
    String searchDetClarifBank(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchDetClarifBank-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListClarifBank(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListClarifBank(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP02104(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchProvisions")
    public @ResponseBody
    String searchProvisions(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProPaymentsControl : searchClarification-------------");
        map.put("success", true);
        List<A2331Filter> lst = this.getListProvisions(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListProvisions(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BalanceAnalysisByAgeLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX419SQP02080(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
}
