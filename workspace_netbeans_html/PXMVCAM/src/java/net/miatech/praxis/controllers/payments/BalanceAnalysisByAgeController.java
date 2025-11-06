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
import net.miatech.praxis.classes.ExportUtil;
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
        System.out.println("-------------- ProPaymentsControl : searchProvisions-------------");
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
    
    @RequestMapping(value = "searchTotalConciliation")
    public @ResponseBody
    String searchTotalConciliation(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchTotalConciliation-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListTotalConciliation(request, false);
        List<A2356Filter> lst2 = this.getListTotalConciliation_Bard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListTotalConciliation(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.getListTotalConciliation(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<A2356Filter> getListTotalConciliation_Bard(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.getListTotalConciliation_Bard(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTotalConciliationMDP")
    public @ResponseBody
    String searchTotalConciliationMDP(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchTotalConciliationMDP-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListTotalConciliationMDP(request, false);
        List<A2356Filter> lst2 = this.getListTotalConciliation_BardMDP(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("data2", lst2);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListTotalConciliationMDP(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.getListTotalConciliationMDP(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<A2356Filter> getListTotalConciliation_BardMDP(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.getListTotalConciliation_BardMDP(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSumaryMain")
    public @ResponseBody
    String searchSumaryMain(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BalanceAnalysisByAge : searchSumaryMain-------------");
        map.put("success", true);
        List<A2356Filter> lst = this.getListsearchDashboardMDP(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListsearchDashboardMDP(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.getListsearchDashboardMDP(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSumaryMainDetail")
    public @ResponseBody
    String searchSumaryMainDetail(ModelMap map, HttpServletRequest request) throws Exception {
        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        map.put("success", true);
        List<A2356Filter> lst = this.getListDataDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2356Filter> getListDataDetail(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.load_MPS400(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXDashboard")
    public @ResponseBody
    void getXLSXDashboard(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDashboard");
        String fileNameDownload = String.format("Report  Dashboard Pending - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2356Filter> listaData = this.getListsearchDashboardMDP(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerF1 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            
            Integer vi = 0;
            Integer vj = 0; 
            Iterator iter = listaData.iterator();
            
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle baseHeaderStyle = (XSSFCellStyle) workbook.createCellStyle();
            baseHeaderStyle.setAlignment(CellStyle.ALIGN_CENTER);
            baseHeaderStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            baseHeaderStyle.setBorderRight(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderBottom(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderLeft(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderTop(CellStyle.BORDER_THIN);
            baseHeaderStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setFont(headerFont);

            XSSFCellStyle headerMain = (XSSFCellStyle) workbook.createCellStyle();
            headerMain.cloneStyleFrom(baseHeaderStyle);
            headerMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex()); // azul grisáceo aprox
            headerMain.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerF1.setBorderRight(CellStyle.BORDER_THIN);
            headerF1.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderBottom(CellStyle.BORDER_THIN);
            headerF1.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderLeft(CellStyle.BORDER_THIN);
            headerF1.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderTop(CellStyle.BORDER_THIN);
            headerF1.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setAlignment(CellStyle.ALIGN_CENTER);
            headerF1.setFillForegroundColor(new XSSFColor(new java.awt.Color(244,204,204)));
            headerF1.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerF1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            XSSFCellStyle headerF2 = (XSSFCellStyle) workbook.createCellStyle();
            headerF2.cloneStyleFrom(baseHeaderStyle);
            headerF2.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex()); // verde claro
            headerF2.setFillPattern(CellStyle.SOLID_FOREGROUND);

            XSSFCellStyle headerF3 = (XSSFCellStyle) workbook.createCellStyle();
            headerF3.cloneStyleFrom(baseHeaderStyle);
            headerF3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // gris claro
            headerF3.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // ====== NIVEL 1 ======
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_14 = row1.createCell(14);

            CH1_0.setCellValue("Valdate");
            CH1_1.setCellValue("Av Group");
            CH1_2.setCellValue("F1 - Settlement");
            CH1_9.setCellValue("F2 - Sales");
            CH1_14.setCellValue("Accounted");

            CH1_0.setCellStyle(headerMain);
            CH1_1.setCellStyle(headerMain);
            CH1_2.setCellStyle(headerF1);
            CH1_9.setCellStyle(headerF2);
            CH1_14.setCellStyle(headerF3);

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 19));
            ++vj;

            // ====== NIVEL 2 ======
            Row row2 = sheet.createRow(vj);
            String[] headers2 = {"", "", "Received", "Total", "", "", "", "%", "Pending To F2", 
                                 "F1 Completed", "Total", "", "%", "Pending To Acc", "F2 Completed", 
                                 "Total", "", "SAP", "%","Return Error"};
            for (int c = 0; c < headers2.length; c++) {
                Cell ch = row2.createCell(c);
                ch.setCellValue(headers2[c]);
               
                if (c <= 1) ch.setCellStyle(headerMain);
                else if (c >= 2 && c <= 8) ch.setCellStyle(headerF1);
                else if (c >= 9 && c <= 13) ch.setCellStyle(headerF2);
                else ch.setCellStyle(headerF3);
            }

            // Merges nivel 2
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            ++vj;

            // ====== NIVEL 3 ======
            Row row3 = sheet.createRow(vj);
            String[] headers3 = {"", "", "", "W/O Settl", "Completed", "Taxes", "Error", "Progress",
                                 "", "", "W/O Sales", "F2 Completed", "Progress", "", "", 
                                 "Pending To Sent", "SENT", "", "Progress",""};
            for (int c = 0; c < headers3.length; c++) {
                Cell ch = row3.createCell(c);
                ch.setCellValue(headers3[c]);
                if (c <= 1) ch.setCellStyle(headerMain);
                else if (c >= 2 && c <= 8) ch.setCellStyle(headerF1);
                else if (c >= 9 && c <= 13) ch.setCellStyle(headerF2);
                else ch.setCellStyle(headerF3);
            }

            // Merges nivel 3
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 18, 18));
            ++vj;

            //============================================

            CellStyle bodyStylePercent = workbook.createCellStyle();
            bodyStylePercent.cloneStyleFrom(bodyStyle);
            bodyStylePercent.setDataFormat(workbook.createDataFormat().getFormat("0.00%"));
            
           while (iter.hasNext()) {
                row1 = sheet.createRow(vj);

                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);   // % F1
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12); // % F2
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18); // % F3
                Cell rcell19 = row1.createCell(19); // % F3

                A2356Filter item = listaData.get(vi);

                rcell0.setCellValue(item.strFormatDate);
                rcell1.setCellValue(item.CCUST);
                rcell2.setCellValue(item.F1_TOTAL);
                rcell3.setCellValue(item.F1_TOTAL_STVAL3);
                rcell4.setCellValue(item.F1_TOTAL_STVAL1);
                rcell5.setCellValue(item.F1_TOTAL_TAXES);
                rcell6.setCellValue(item.F1_TOTAL_ERROR);

                double percentF1 = 0.0;
                double percentF2 = 0.0;
                double percentF3 = 0.0;

                if (item.F1_TOTAL != 0) {
                    percentF1 = (item.F1_TOTAL_STVAL1 * 1.0) / item.F1_TOTAL;
                }
                if (item.F2_F1_TOTAL_COMPLETED != 0) {
                    percentF2 = (item.F2_TOTAL_MATCH_OVER50 * 1.0) / item.F2_F1_TOTAL_COMPLETED;
                }
                if (item.F3_F2_TOTAL_COMPLETED != 0) {
                    percentF3 = (item.F3_TOTAL_COMPLETED * 1.0) / item.F3_F2_TOTAL_COMPLETED;
                }

                percentF1 = Math.round(percentF1 * 10000.0) / 10000.0;
                percentF2 = Math.round(percentF2 * 10000.0) / 10000.0;
                percentF3 = Math.round(percentF3 * 10000.0) / 10000.0;

                rcell7.setCellValue(percentF1);
                rcell7.setCellStyle(bodyStylePercent);

                rcell8.setCellValue(item.F1_TOTAL_PENDING_TO_F2);
                rcell9.setCellValue(item.F2_F1_TOTAL_COMPLETED);
                rcell10.setCellValue(item.F2_TOTAL_PENDING_OVER50);
                rcell11.setCellValue(item.F2_TOTAL_MATCH_OVER50);

                rcell12.setCellValue(percentF2);
                rcell12.setCellStyle(bodyStylePercent);

                rcell13.setCellValue(item.F3_TOTAL_WO_ACC);
                rcell14.setCellValue(item.F3_F2_TOTAL_COMPLETED);
                rcell15.setCellValue(item.F3_TOTAL_PENDING_SENT);
                rcell16.setCellValue(item.F3_TOTAL_COMPLETED);
                rcell17.setCellValue(item.F3_TOTAL_COMPLETED_SAP);

                rcell18.setCellValue(percentF3);
                rcell18.setCellStyle(bodyStylePercent);
                
                rcell19.setCellValue(item.F3_TOTAL_ERROR);

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
    
    @RequestMapping(value = "getXLSXDashboardDetail")
    public @ResponseBody
    void getXLSXDashboardDetail(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDashboardDetail");
        String fileNameDownload = String.format("Report  Dashboard Pending Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2356Filter> listaData = this.getListDataDetail(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerF1 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            
            Integer vi = 0;
            Integer vj = 0; 
            Iterator iter = listaData.iterator();
            
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle baseHeaderStyle = (XSSFCellStyle) workbook.createCellStyle();
            baseHeaderStyle.setAlignment(CellStyle.ALIGN_CENTER);
            baseHeaderStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            baseHeaderStyle.setBorderRight(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderBottom(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderLeft(CellStyle.BORDER_THIN);
            baseHeaderStyle.setBorderTop(CellStyle.BORDER_THIN);
            baseHeaderStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            baseHeaderStyle.setFont(headerFont);

            XSSFCellStyle headerMain = (XSSFCellStyle) workbook.createCellStyle();
            headerMain.cloneStyleFrom(baseHeaderStyle);
            headerMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex()); // azul grisáceo aprox
            headerMain.setFillPattern(CellStyle.SOLID_FOREGROUND);

            headerF1.setBorderRight(CellStyle.BORDER_THIN);
            headerF1.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderBottom(CellStyle.BORDER_THIN);
            headerF1.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderLeft(CellStyle.BORDER_THIN);
            headerF1.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setBorderTop(CellStyle.BORDER_THIN);
            headerF1.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerF1.setAlignment(CellStyle.ALIGN_CENTER);
            headerF1.setFillForegroundColor(new XSSFColor(new java.awt.Color(244,204,204)));
            headerF1.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerF1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            XSSFCellStyle headerF2 = (XSSFCellStyle) workbook.createCellStyle();
            headerF2.cloneStyleFrom(baseHeaderStyle);
            headerF2.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex()); // verde claro
            headerF2.setFillPattern(CellStyle.SOLID_FOREGROUND);

            XSSFCellStyle headerF3 = (XSSFCellStyle) workbook.createCellStyle();
            headerF3.cloneStyleFrom(baseHeaderStyle);
            headerF3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // gris claro
            headerF3.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // ====== NIVEL 1 ======
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

            CH1_0.setCellValue("Nbr");
            CH1_1.setCellValue("Client");
            CH1_2.setCellValue("Bandoc");
            CH1_3.setCellValue("Tranci");
            CH1_4.setCellValue("Dateci");
            CH1_5.setCellValue("Refer");
            CH1_6.setCellValue("Texto Largo");
            CH1_7.setCellValue("Corep");
            CH1_8.setCellValue("Codpro");
            CH1_9.setCellValue("IDCDEB");
            CH1_10.setCellValue("Header");
            CH1_11.setCellValue("Scurrency");
            CH1_12.setCellValue("Net");

            CH1_0.setCellStyle(headerMain);
            CH1_1.setCellStyle(headerMain);
            CH1_2.setCellStyle(headerMain);
            CH1_3.setCellStyle(headerMain);
            CH1_4.setCellStyle(headerMain);
            CH1_5.setCellStyle(headerMain);
            CH1_6.setCellStyle(headerMain);
            CH1_7.setCellStyle(headerMain);
            CH1_8.setCellStyle(headerMain);
            CH1_9.setCellStyle(headerMain);
            CH1_10.setCellStyle(headerMain);
            CH1_11.setCellStyle(headerMain);
            CH1_12.setCellStyle(headerMain);
            
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

                A2356Filter item = listaData.get(vi);
                rcell0.setCellValue(item.RN);
                rcell1.setCellValue(item.CCUST);
                rcell2.setCellValue(item.BANDOC);
                rcell3.setCellValue(item.TRANCI);
                rcell4.setCellValue(item.DATECI);
                rcell5.setCellValue(item.REFER);
                rcell6.setCellValue(item.TEXTOLAR);
                rcell7.setCellValue(item.COREP);
                rcell8.setCellValue(item.CODPRO);
                rcell9.setCellValue(item.IDCDEB);
                rcell10.setCellValue(item.A4545HEADE);
                rcell11.setCellValue(item.SCURRENCY);
                rcell12.setCellValue(item.NETO);

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
}
