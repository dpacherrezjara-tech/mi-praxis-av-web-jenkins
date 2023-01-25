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
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ReconciliationPaymentLogic;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4114Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.classes.ZipFiles;
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
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ReconciliationPayment")
public class ReconciliationPaymentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ReconciliationPaymentLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ReconciliationPayment/form_index";
    }

    @RequestMapping(value = "searchMainSummary")
    public @ResponseBody
    String searchMainSummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : SearchMainSummary-------------");

        map.put("success", true);
        List<A4113Filter> lst = this.getListMainSummary(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4113Filter> getListMainSummary(HttpServletRequest request, Boolean bExcel) {

        List<A4113Filter> lst = new ArrayList<>(0);
        A4113Filter filter = new A4113Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4113Filter.class);

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

            lst = logic.loadPX606SQP04692(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : Search-------------");

        map.put("success", true);
        List<A4113Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4113Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A4113Filter> lst = new ArrayList<>(0);
        A4113Filter filter = new A4113Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4113Filter.class);

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

            lst = logic.loadPX606SQP04693(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A4113Filter> getListForFile(A4113Filter filter) {

        List<A4113Filter> lst = new ArrayList<>(0);
        Gson gson = new Gson();

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX606SQP04329(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<A4113Filter> getListForFileMultipleDifferences(A4113Filter filter) {

        List<A4113Filter> lst = new ArrayList<>(0);

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX606SQP04330(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetSubmission")
    public @ResponseBody
    String searchDetSubmission(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetSubmission-------------");

        map.put("success", true);
        List<A4115Filter> lst = this.getListSubmission(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4115Filter> getListSubmission(HttpServletRequest request, Boolean bExcel) {

        List<A4115Filter> lst = new ArrayList<>(0);
        A4115Filter filter = new A4115Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4115Filter.class);

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

            lst = logic.loadPX606SQP04269(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTransaction")
    public @ResponseBody
    String searchDetTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetTransaction-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListTransaction(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04270(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDiffTransaction")
    public @ResponseBody
    String searchDiffTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDiffTransaction-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDiffTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDiffTransaction(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04471(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetPricing")
    public @ResponseBody
    String searchDetPricing(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetPricing-------------");

        map.put("success", true);
        List<A4117Filter> lst = this.getListPricing(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4117Filter> getListPricing(HttpServletRequest request, Boolean bExcel) {

        List<A4117Filter> lst = new ArrayList<>(0);
        A4117Filter filter = new A4117Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4117Filter.class);

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

            lst = logic.loadPX606SQP04278(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetChargeback")
    public @ResponseBody
    String searchDetChargeback(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetChargeback-------------");

        map.put("success", true);
        List<A4118Filter> lst = this.getListChargeback(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4118Filter> getListChargeback(HttpServletRequest request, Boolean bExcel) {

        List<A4118Filter> lst = new ArrayList<>(0);
        A4118Filter filter = new A4118Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4118Filter.class);

            lst = logic.loadPX606SQP04279(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchMainSettlement")
    public @ResponseBody
    String searchMainSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchMainSettlement-------------");
        map.put("success", true);
        List<A4116Filter> lst = this.getListMainSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListMainSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04694(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchMainAdjustment")
    public @ResponseBody
    String searchMainAdjustment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchMainAdjustment-------------");
        map.put("success", true);
        List<A4118Filter> lst = this.getListMainAdjustment(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4118Filter> getListMainAdjustment(HttpServletRequest request, Boolean bExcel) {

        List<A4118Filter> lst = new ArrayList<>(0);
        A4118Filter filter = new A4118Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4118Filter.class);

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

            lst = logic.loadPX606SQP04376(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSettlement")
    public @ResponseBody
    String searchSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04695(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTaxes")
    public @ResponseBody
    String searchDetTaxes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetTaxes-------------");

        map.put("success", true);
        List<A4114Filter> lst = this.getListTaxes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4114Filter> getListTaxes(HttpServletRequest request, Boolean bExcel) {

        List<A4114Filter> lst = new ArrayList<>(0);
        A4113Filter filter = new A4113Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4113Filter.class);

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

            lst = logic.loadPX606SQP04571(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetSettlement")
    public @ResponseBody
    String searchDetSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04721(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchMsiTracking")
    public @ResponseBody
    String searchMsiTracking(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchMsiTracking-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListMsiTracking(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListMsiTracking(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04463(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchChangePayment")
    public @ResponseBody
    String searchChangePayment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchChangePayment-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListChangePayment(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListChangePayment(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.loadPX606SQP04420(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetTktSettlement")
    public @ResponseBody
    String searchDetTktSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetTktSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetTktSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetTktSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            /*if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }*/
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.loadPX606SQP04698(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDetTktChargeback")
    public @ResponseBody
    String searchDetTktChargeback(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchDetTktChargeback-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetTktChargeback(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetTktChargeback(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            /*if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }*/
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.loadPX606SQP04619(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchErrorTransaction")
    public @ResponseBody
    String searchErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchErrorTransaction-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListErrorTransaction(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListErrorTransaction(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04697(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSummaryTransactionError")
    public @ResponseBody
    String searchSummaryTransactionError(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : searchSummaryTransactionError-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListSummaryTransactionError(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListSummaryTransactionError(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04696(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchPNR")
    public @ResponseBody
    String searchPNR(ModelMap map, HttpServletRequest request) {

        SQP00697Filter filter = new SQP00697Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ReconciliationPaymentLogic logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchTransactionErrorDetail")
    public @ResponseBody
    String searchTransactionErrorDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : searchTransactionErrorDetail-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new ReconciliationPaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX606SQP04720(filter);
//            lstInfo = logic.loadPX606SQP04722(result);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "gridTransactionError")
    public @ResponseBody
    String gridTransactionError(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : gridTransactionError-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new ReconciliationPaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {

            lstInfo = logic.loadPX606SQP04722(filter);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "gridTransactionErrorByTKT")
    public @ResponseBody
    String gridTransactionErrorByTKT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : gridTransactionErrorByTKT-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new ReconciliationPaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {

            lstInfo = logic.loadPX606SQP04754(filter);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ValidateTransaction")
    public @ResponseBody
    String ValidateTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : ValidateTransaction-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX606SQP04360(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceErrorTransaction")
    public @ResponseBody
    String MaintenanceErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : MaintenanceErrorTransaction-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX606SQP04723(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceMsi")
    public @ResponseBody
    String MaintenanceMsi(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : MaintenanceMsi-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX606SQP04469(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }
    
        @RequestMapping(value = "ReverseTransaction")
    public @ResponseBody
    String ReverseTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : ReverseTransaction-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX606SQP04728(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchAdjustmentErrorDetail")
    public @ResponseBody
    String searchAdjustmentErrorDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by AMEX : searchAdjustmentErrorDetail-------------");

        Gson gson = new Gson();
        A4118Filter filter = new A4118Filter();
        A4118Filter result = new A4118Filter();
        List<A4118Filter> lstInfo = new ArrayList<A4118Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4118Filter.class);

        logic = new ReconciliationPaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX606SQP04466(filter);
//            lstInfo = logic.loadPX606SQP04722(result);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    //Excels
    @RequestMapping(value = "getXLSXMainSummary")
    public @ResponseBody
    void getXLSXMainSummary(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSummary");
        String fileNameDownload = String.format("Report Main Summary - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getListMainSummary(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Zone");
            CH1_2.setCellValue("Country");
            CH1_3.setCellValue("Curr");
            CH1_4.setCellValue("Summary");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("Differences");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 24));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("GROSS");
            CH2_5.setCellValue("Discount");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("NET");
            CH2_11.setCellValue("GROSS");
            CH2_12.setCellValue("Discount");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("NET");
            CH2_18.setCellValue("GROSS");
            CH2_19.setCellValue("Discount");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("NET");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("Commission");
            CH3_6.setCellValue("Serv. Fee");
            CH3_7.setCellValue("Adjustment");
            CH3_8.setCellValue("VAT");
            CH3_9.setCellValue("Op. Debit");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("Commission");
            CH3_13.setCellValue("Serv. Fee");
            CH3_14.setCellValue("Adjustment");
            CH3_15.setCellValue("VAT");
            CH3_16.setCellValue("Op. Debit");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("Commission");
            CH3_20.setCellValue("Serv. Fee");
            CH3_21.setCellValue("Adjustment");
            CH3_22.setCellValue("VAT");
            CH3_23.setCellValue("Op. Debit");
            CH3_24.setCellValue("");

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
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).ZONA);
                rcell2.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell3.setCellValue(listaData.get(vi).PCURRENCY);
                rcell4.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell5.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell6.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell7.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell8.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell9.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell10.setCellValue(listaData.get(vi).PNETAMOU);
                rcell11.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell12.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell13.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell14.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell15.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell16.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell17.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell18.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell19.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell20.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell21.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell22.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell23.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell24.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
                iter.next();
                ++vi;
                ++vj;

                if (rcell18.getNumericCellValue() <= -1) {
                    rcell18.setCellStyle(bodyStyle);
                }
                if (rcell19.getNumericCellValue() <= -1) {
                    rcell19.setCellStyle(bodyStyle);
                }
                if (rcell20.getNumericCellValue() <= -1) {
                    rcell20.setCellStyle(bodyStyle);
                }
                if (rcell21.getNumericCellValue() <= -1) {
                    rcell21.setCellStyle(bodyStyle);
                }
                if (rcell22.getNumericCellValue() <= -1) {
                    rcell22.setCellStyle(bodyStyle);
                }
                if (rcell23.getNumericCellValue() <= -1) {
                    rcell23.setCellStyle(bodyStyle);
                }
                if (rcell24.getNumericCellValue() <= -1) {
                    rcell24.setCellStyle(bodyStyle);
                }
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue(listaData.get(0).totPGROSAMOU);
            CH1_5_T.setCellValue(listaData.get(0).totPDISCAMOU);
            CH1_6_T.setCellValue(listaData.get(0).totPSFEEAMOU);
            CH1_7_T.setCellValue(listaData.get(0).totPADJAMOUN);
            CH1_8_T.setCellValue(listaData.get(0).totPTAXAMOU);
            CH1_9_T.setCellValue(listaData.get(0).totODBALAMOU);
            CH1_10_T.setCellValue(listaData.get(0).totPNETAMOU);
            CH1_11_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_12_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totADJAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totODBALAMOUC);
            CH1_17_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_18_T.setCellValue(listaData.get(0).totDIFF_PGROSAMOU);
            CH1_19_T.setCellValue(listaData.get(0).totDIFF_PDISCAMOU);
            CH1_20_T.setCellValue(listaData.get(0).totDIFF_PSFEEAMOU);
            CH1_21_T.setCellValue(listaData.get(0).totDIFF_PADJAMOUN);
            CH1_22_T.setCellValue(listaData.get(0).totDIFF_PTAXAMOU);
            CH1_23_T.setCellValue(listaData.get(0).totDIFF_ODBALAMOU);
            CH1_24_T.setCellValue(listaData.get(0).totDIFF_PNETAMOU);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);

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
        String fileNameDownload = String.format("Summary Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            String date = "";
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

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

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Zone");
            CH1_5.setCellValue("Country");
            CH1_6.setCellValue("Curr");
            CH1_7.setCellValue("Summary");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("Differences");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("");
            CH1_33.setCellValue("");

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("NET");
            CH2_17.setCellValue("GROSS");
            CH2_18.setCellValue("Discount");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("");
            CH2_25.setCellValue("");
            CH2_26.setCellValue("NET");
            CH2_27.setCellValue("GROSS");
            CH2_28.setCellValue("Discount");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("");
            CH2_33.setCellValue("Net");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Pay Rate");
            CH3_9.setCellValue("Sale Rate");
            CH3_10.setCellValue("Commission");
            CH3_11.setCellValue("Serv. Fee");
            CH3_12.setCellValue("Adjustment");
            CH3_13.setCellValue("VAT Rate");
            CH3_14.setCellValue("VAT");
            CH3_15.setCellValue("Op. Debit");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("Pay Rate");
            CH3_19.setCellValue("Sale Rate");
            CH3_20.setCellValue("Commission");
            CH3_21.setCellValue("Serv. Fee");
            CH3_22.setCellValue("Adjustment");
            CH3_23.setCellValue("VAT Rate");
            CH3_24.setCellValue("VAT");
            CH3_25.setCellValue("Op. Debit");
            CH3_26.setCellValue("");
            CH3_27.setCellValue("");
            CH3_28.setCellValue("Commission");
            CH3_29.setCellValue("Serv. Fee");
            CH3_30.setCellValue("Adjustment");
            CH3_31.setCellValue("VAT");
            CH3_32.setCellValue("Op. Debit");
            CH3_33.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 33, 33));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 33));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 32));

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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).ZONA);
                rcell5.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell6.setCellValue(listaData.get(vi).PCURRENCY);
                rcell7.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell8.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell9.setCellValue(listaData.get(vi).RATECOMSM + "%");
                rcell10.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell11.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell12.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell13.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell14.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell15.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell16.setCellValue(listaData.get(vi).PNETAMOU);
                rcell17.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell18.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell19.setCellValue(listaData.get(vi).RATECOMSMC + "%");
                rcell20.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell21.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell22.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell23.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell24.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell25.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell26.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell27.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell29.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell30.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell31.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell32.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell33.setCellValue(listaData.get(vi).DIFF_PNETAMOU);

                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell3.setCellStyle(bodyStyle);
                }
                if (rcell27.getNumericCellValue() <= -1) {
                    rcell27.setCellStyle(bodyStyle);
                }
                if (rcell28.getNumericCellValue() <= -1) {
                    rcell28.setCellStyle(bodyStyle);
                }
                if (rcell29.getNumericCellValue() <= -1) {
                    rcell29.setCellStyle(bodyStyle);
                }
                if (rcell30.getNumericCellValue() <= -1) {
                    rcell30.setCellStyle(bodyStyle);
                }
                if (rcell31.getNumericCellValue() <= -1) {
                    rcell31.setCellStyle(bodyStyle);
                }
                if (rcell32.getNumericCellValue() <= -1) {
                    rcell32.setCellStyle(bodyStyle);
                }
                if (rcell33.getNumericCellValue() <= -1) {
                    rcell33.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);
            Cell CH1_32_T = rowTotal.createCell(32);
            Cell CH1_33_T = rowTotal.createCell(33);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totPGROSAMOU);
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue(listaData.get(0).totPDISCAMOU);
            CH1_11_T.setCellValue(listaData.get(0).totPSFEEAMOU);
            CH1_12_T.setCellValue(listaData.get(0).totPADJAMOUN);
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).totPTAXAMOU);
            CH1_15_T.setCellValue(listaData.get(0).totODBALAMOU);
            CH1_16_T.setCellValue(listaData.get(0).totPNETAMOU);
            CH1_17_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue("");
            CH1_20_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_21_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_22_T.setCellValue(listaData.get(0).totADJAMOUNC);
            CH1_23_T.setCellValue("");
            CH1_24_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_25_T.setCellValue(listaData.get(0).totODBALAMOUC);
            CH1_26_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_27_T.setCellValue(listaData.get(0).totDIFF_PGROSAMOU);
            CH1_28_T.setCellValue(listaData.get(0).totDIFF_PDISCAMOU);
            CH1_29_T.setCellValue(listaData.get(0).totDIFF_PSFEEAMOU);
            CH1_30_T.setCellValue(listaData.get(0).totDIFF_PADJAMOUN);
            CH1_31_T.setCellValue(listaData.get(0).totDIFF_PTAXAMOU);
            CH1_32_T.setCellValue(listaData.get(0).totDIFF_ODBALAMOU);
            CH1_33_T.setCellValue(listaData.get(0).totDIFF_PNETAMOU);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);
            CH1_32_T.setCellStyle(totalStyle);
            CH1_33_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXChargeback")
    public @ResponseBody
    void getXLSXChargeback(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXChargeback");
        String fileNameDownload = String.format("Adjustment Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4118Filter> listaData = this.getListChargeback(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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

            CH1_0.setCellValue("Source");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Number");
            CH1_3.setCellValue("Invoice Refer.Number PNR");
            CH1_4.setCellValue("Indus.Speci.Ref.Nbr");
            CH1_5.setCellValue("Reason Code");
            CH1_6.setCellValue("Description");
            CH1_7.setCellValue("Chargeback");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Result Reconciliation Chargeback");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));
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

            CH2_0.setCellValue("");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("NET");
            CH2_12.setCellValue("GROSS");
            CH2_13.setCellValue("Discount");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("NET");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Commission");
            CH3_9.setCellValue("Serv.Fee");
            CH3_10.setCellValue("VAT");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("Commission");
            CH3_14.setCellValue("Serv.Fee");
            CH3_15.setCellValue("VAT");
            CH3_16.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));

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

                rcell0.setCellValue(listaData.get(vi).RECTYPE);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).CHADJNBR);
                rcell3.setCellValue(listaData.get(vi).INVORNBR);
                rcell4.setCellValue(listaData.get(vi).ISREFNBR);
                rcell5.setCellValue(listaData.get(vi).CHAADJCOD);
                rcell6.setCellValue(listaData.get(vi).CHAADJDES);
                rcell7.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell8.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell9.setCellValue(listaData.get(vi).SFEEAMOUN);
                rcell10.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell11.setCellValue(listaData.get(vi).NETAMOUN);
                rcell12.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell13.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell14.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell15.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell16.setCellValue(listaData.get(vi).NETAMOUNC);
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_8_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_9_T.setCellValue(listaData.get(0).totSFEEAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_12_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totNETAMOUNC);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXSubmission")
    public @ResponseBody
    void getXLSXSubmission(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSubmission");
        String fileNameDownload = String.format("Submission Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4115Filter> listaData = this.getListSubmission(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("");
            CH1_2.setCellValue("Submission");
            CH1_3.setCellValue("");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("Submission");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Result Reconciliation Submission vs Transaction/Pricing");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 16));
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

            CH2_0.setCellValue("Merchant ID");
            CH2_1.setCellValue("Status");
            CH2_2.setCellValue("Sales Merchant ID");
            CH2_3.setCellValue("ID Sub.");
            CH2_4.setCellValue("Submis Date");
            CH2_5.setCellValue("AMEX Process Date");
            CH2_6.setCellValue("Invoice Number");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("NET");
            CH2_11.setCellValue("Transact. Count");
            CH2_12.setCellValue("GROSS");
            CH2_13.setCellValue("Discount");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("NET");
            CH2_16.setCellValue("Transact. Count");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));

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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Commission");
            CH3_9.setCellValue("VAT Commission");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("Commission");
            CH3_14.setCellValue("VAT Commission");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");

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

                rcell0.setCellValue(listaData.get(vi).PMERCHID);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).SMERCHID);
                rcell3.setCellValue(listaData.get(vi).IDITEMS);
                rcell4.setCellValue(listaData.get(vi).BSUMDATE);
                rcell5.setCellValue(listaData.get(vi).AXPRODAT);
                rcell6.setCellValue(listaData.get(vi).SIREFNBR);
                rcell7.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell8.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell9.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell10.setCellValue(listaData.get(vi).NETAMOUN);
                rcell11.setCellValue(listaData.get(vi).TRANCOUNT);
                rcell12.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell13.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell14.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell15.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell16.setCellValue(listaData.get(vi).TRANCOUNTC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell1.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_8_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_9_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totTRANCOUNT);
            CH1_12_T.setCellValue(listaData.get(0).totGROSAMOUNC);
            CH1_13_T.setCellValue(listaData.get(0).totDISCAMOUNC);
            CH1_14_T.setCellValue(listaData.get(0).totTAXAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_16_T.setCellValue(listaData.get(0).totTRANCOUNTC);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXTransaction")
    public @ResponseBody
    void getXLSXTransaction(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXTransaction");
        String fileNameDownload = String.format("Transaction Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListTransaction(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Type");
            CH1_3.setCellValue("Transaction");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("Transaction Amount");
            CH1_14.setCellValue("MSI");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("Commission Base");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("Result Reconciliation Transaction");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 28));
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

            CH2_0.setCellValue("Merchant ID");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Sales Merchant ID");
            CH2_4.setCellValue("ID Tran.");
            CH2_5.setCellValue("Invoice Refer.Number PNR");
            CH2_6.setCellValue("Seller ID");
            CH2_7.setCellValue("Installment");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("Card Account Number");
            CH2_10.setCellValue("Approval Code");
            CH2_11.setCellValue("Indust.Speci. Ref.Nbr");
            CH2_12.setCellValue("Date");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("Rate Comm.");
            CH2_15.setCellValue("Serv.Fee");
            CH2_16.setCellValue("Accel Amount");
            CH2_17.setCellValue("Total Comm.");
            CH2_18.setCellValue("Discount Rate");
            CH2_19.setCellValue("Discount Amount");
            CH2_20.setCellValue("Discount Rate VAT");
            CH2_21.setCellValue("Discount Amount VAT");
            CH2_22.setCellValue("Transaction Amount");
            CH2_23.setCellValue("MSI");
            CH2_24.setCellValue("");
            CH2_25.setCellValue("Commission Base");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 28));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("Plan");
            CH3_8.setCellValue("Number");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("Rate Comm.");
            CH3_24.setCellValue("Total Comm.");
            CH3_25.setCellValue("Discount Rate Comm.");
            CH3_26.setCellValue("Discount Amount Comm.");
            CH3_27.setCellValue("Discount Rate VAT.");
            CH3_28.setCellValue("Discount Amount VAT.");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 28, 28));
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

                rcell0.setCellValue(listaData.get(vi).PMERCHID);
                rcell1.setCellValue(listaData.get(vi).desCERROR);
                rcell2.setCellValue(listaData.get(vi).TDOC);
                if (listaData.get(vi).TDOC.equals("S")) {
                    rcell2.setCellValue("Sales");
                } else {
                    rcell2.setCellValue("Refund");
                }
                rcell3.setCellValue(listaData.get(vi).SMERCHID);
                rcell4.setCellValue(listaData.get(vi).IDITEMT);
                rcell5.setCellValue(listaData.get(vi).INVORNBR);
                rcell6.setCellValue(listaData.get(vi).SELLERID);
                rcell7.setCellValue(listaData.get(vi).NBRINSTA);
                rcell8.setCellValue(listaData.get(vi).INSTANBR);
                rcell9.setCellValue(listaData.get(vi).SCARDN);
                rcell10.setCellValue(listaData.get(vi).SAUTHOC);
                rcell11.setCellValue(listaData.get(vi).ISREFNBR);
                rcell12.setCellValue(listaData.get(vi).TRANSDATE);
                rcell13.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell14.setCellValue(listaData.get(vi).RATESFEE);
                rcell15.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell16.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell17.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell18.setCellValue(listaData.get(vi).DISCRATE);
                rcell19.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell20.setCellValue(listaData.get(vi).DISCRATEI);
                rcell21.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell22.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell23.setCellValue(listaData.get(vi).RATESFEEC);
                rcell24.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell25.setCellValue(listaData.get(vi).DISCRATEC);
                rcell26.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell27.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell28.setCellValue(listaData.get(vi).DISCAMOUIC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell1.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue(listaData.get(0).TGROSAMOUN_TOTAL);
            CH1_14_T.setCellValue("");
            CH1_15_T.setCellValue(listaData.get(0).SFEEAMOU_TOTAL);
            CH1_16_T.setCellValue(listaData.get(0).ACCEAMOU_TOTAL);
            CH1_17_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue(listaData.get(0).DISCAMOUN_TOTAL);
            CH1_20_T.setCellValue("");
            CH1_21_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_22_T.setCellValue(listaData.get(0).TGROSAMOUNC_TOTAL);
            CH1_23_T.setCellValue("");
            CH1_24_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_25_T.setCellValue("");
            CH1_26_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_27_T.setCellValue("");
            CH1_28_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXPricing")
    public @ResponseBody
    void getXLSXPricing(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXPricing");
        String fileNameDownload = String.format("Pricing Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            String date = "";
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4117Filter> listaData = this.getListPricing(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Pricing");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("Transaction Amount");
            CH1_11.setCellValue("Discount");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("Transaction Amount");
            CH1_16.setCellValue("Result Reconciliation Pricing");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 19));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Sales Merchant ID");
            CH2_4.setCellValue("Invoice Refer. Number PNR");
            CH2_5.setCellValue("Card Account Number");
            CH2_6.setCellValue("Approval Code");
            CH2_7.setCellValue("ID Tran.");
            CH2_8.setCellValue("Fee Code");
            CH2_9.setCellValue("Transaction Date");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("Commission");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("VAT");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("Commission");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("VAT");
            CH2_19.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 19));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("Rate");
            CH3_12.setCellValue("Amount");
            CH3_13.setCellValue("Rate");
            CH3_14.setCellValue("Amount");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("Rate");
            CH3_17.setCellValue("Amount");
            CH3_18.setCellValue("Rate");
            CH3_19.setCellValue("Amount");

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
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).SMERCHID);
                rcell4.setCellValue(listaData.get(vi).INVORNBR);
                rcell5.setCellValue(listaData.get(vi).SCARDN);
                rcell6.setCellValue(listaData.get(vi).SAUTHOC);
                rcell7.setCellValue(listaData.get(vi).IDITEMT);
                rcell8.setCellValue(listaData.get(vi).FEECODE);
                rcell9.setCellValue(listaData.get(vi).TRANSDATE);
                rcell10.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell11.setCellValue(listaData.get(vi).DISCRATE_IMPORT);
                rcell12.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell13.setCellValue(listaData.get(vi).DISCRATE_IVA);
                rcell14.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell15.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell16.setCellValue(listaData.get(vi).DISCRATEBA_IMPORT);
                rcell17.setCellValue(listaData.get(vi).DISCAMOUNC_IMPORT);
                rcell18.setCellValue(listaData.get(vi).DISCRATEBA_IVA);
                rcell19.setCellValue(listaData.get(vi).DISCAMOUNC_IVA);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue(listaData.get(0).totDISCAMOUN_IMPORT);
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).totDISCAMOUN_IVA);
            CH1_15_T.setCellValue(listaData.get(0).totTGROSAMOUC);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue(listaData.get(0).totDISCAMOUNC_IMPORT);
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue(listaData.get(0).totDISCAMOUNC_IVA);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXMainSettlement")
    public @ResponseBody
    void getXLSXMainSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainSettlement");
        String fileNameDownload = String.format("Main Settlement Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListMainSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Zone");
            CH1_2.setCellValue("Country");
            CH1_3.setCellValue("Currency");
            CH1_4.setCellValue("GROSS Amount");
            CH1_5.setCellValue("Commission");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("Serv. Fee");
            CH1_8.setCellValue("Acceleration Amount");
            CH1_9.setCellValue("VAT COM 1+2");
            CH1_10.setCellValue("Chargeback");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("Net amount to receive AM");
            CH1_14.setCellValue("Currency Settlement");
            CH1_15.setCellValue("Reconciled Net Amount");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("Amount");
            CH2_6.setCellValue("VAT");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("Amount");
            CH2_11.setCellValue("Commission");
            CH2_12.setCellValue("VAT");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");

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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).ZONA);
                rcell2.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell3.setCellValue(listaData.get(vi).PCURRENCY);
                rcell4.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell5.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell6.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell7.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell8.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell9.setCellValue(listaData.get(vi).TAXAMOUN_AD);
                rcell10.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell11.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell12.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell13.setCellValue(listaData.get(vi).NETAMOUN);
                rcell14.setCellValue(listaData.get(vi).PCURRENCY);
                rcell15.setCellValue(listaData.get(vi).NETAMOUNC);
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

    @RequestMapping(value = "getXLSXSettlement")
    public @ResponseBody
    void getXLSXSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSettlement");
        String fileNameDownload = String.format("Settlement Report  - " + Functions.getFechaActual() + " " + Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Merchant");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Zone");
            CH1_4.setCellValue("Country");
            CH1_5.setCellValue("Currency");
            CH1_6.setCellValue("GROSS Amount");
            CH1_7.setCellValue("Commission");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("Serv. Fee");
            CH1_13.setCellValue("Acceleration Amount");
            CH1_14.setCellValue("VAT COM 1+2");
            CH1_15.setCellValue("Chargeback");
            CH1_16.setCellValue("");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("Net Amount to Receive AM");
            CH1_19.setCellValue("Currency Settlement");
            CH1_20.setCellValue("Reconciled Net Amount");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 20, 20));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("Pay Rate");
            CH2_8.setCellValue("Sale Rate");
            CH2_9.setCellValue("Amount");
            CH2_10.setCellValue("VAT Rate");
            CH2_11.setCellValue("VAT");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("Amount");
            CH2_16.setCellValue("Commission");
            CH2_17.setCellValue("VAT");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).ZONA);
                rcell4.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell5.setCellValue(listaData.get(vi).PCURRENCY);
                rcell6.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell7.setCellValue(listaData.get(vi).DISCRATE_IMPORT);
                rcell8.setCellValue(listaData.get(vi).RATECOMSM);
                rcell9.setCellValue(listaData.get(vi).DISCAMOUN_IMPORT);
                rcell10.setCellValue(listaData.get(vi).DISCRATE_IVA);
                rcell11.setCellValue(listaData.get(vi).DISCAMOUN_IVA);
                rcell12.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell13.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell14.setCellValue(listaData.get(vi).TAXAMOUN_AD);
                rcell15.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell16.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell17.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell18.setCellValue(listaData.get(vi).NETAMOUN);
                rcell19.setCellValue(listaData.get(vi).PCURRENCY);
                rcell20.setCellValue(listaData.get(vi).NETAMOUNC);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue(listaData.get(0).totDISCAMOUN_IMPORT);
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue(listaData.get(0).totDISCAMOUN_IVA);
            CH1_12_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_13_T.setCellValue(listaData.get(0).totACCEAMOU);
            CH1_14_T.setCellValue(listaData.get(0).totTAXAMOUN_AD);
            CH1_15_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_16_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_17_T.setCellValue(listaData.get(0).totTAXAMOUN_CB);
            CH1_18_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_19_T.setCellValue("");
            CH1_20_T.setCellValue(listaData.get(0).totNETAMOUNC);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXDetSettlement")
    public @ResponseBody
    void getXLSXDetSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetSettlement");
        String fileNameDownload = String.format("Settlement Detail Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListDetSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Sales");
            CH1_2.setCellValue("Diff.");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("Zone");
            CH1_6.setCellValue("Country");
            CH1_7.setCellValue("Transaction");
            CH1_8.setCellValue("Qty Tkts");
            CH1_9.setCellValue("Invoice Refer.Number PNR");
            CH1_10.setCellValue("PNR");
            CH1_11.setCellValue("Document Type");
            CH1_12.setCellValue("Indust.Speci.Ref.Nbr");
            CH1_13.setCellValue("Card Number");
            CH1_14.setCellValue("Auth.");
            CH1_15.setCellValue("Installment Plan");
            CH1_16.setCellValue("Installment Number");
            CH1_17.setCellValue("Sales Amount");
            CH1_18.setCellValue("Transaction Amount");
            CH1_19.setCellValue("MSI");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("Commission Base");
            CH1_25.setCellValue("");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("Result Reconciliation Transaction");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("");
            CH1_33.setCellValue("");
            CH1_34.setCellValue("");
            CH1_35.setCellValue("");
            CH1_36.setCellValue("Chargeback");
            CH1_37.setCellValue("");
            CH1_38.setCellValue("");
            CH1_39.setCellValue("");
            CH1_40.setCellValue("");
            CH1_41.setCellValue("");
            CH1_42.setCellValue("");
            CH1_43.setCellValue("");
            CH1_44.setCellValue("Net Amount to Recive AM");
            CH1_45.setCellValue("Currency Settlement");
            CH1_46.setCellValue("Calculated Commission");
            CH1_47.setCellValue("Rule");
            CH1_48.setCellValue("Flag Complement");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)            
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 43));

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 16, 16));

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 44, 44));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 45, 45));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 46, 46));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 47, 47));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 48, 48));

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Days");
            CH2_3.setCellValue("Reconciliation Settlement");
            CH2_4.setCellValue("Settlement vs Sales");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("Type");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("");
            CH2_17.setCellValue("");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("Rate Comm.");
            CH2_20.setCellValue("Serv.Fee");
            CH2_21.setCellValue("Accel.Amount");
            CH2_22.setCellValue("Total Comm.");
            CH2_23.setCellValue("VAT COMM 1 2");
            CH2_24.setCellValue("Discount Rate");
            CH2_25.setCellValue("Discount Amount");
            CH2_26.setCellValue("Discount Rate VAT");
            CH2_27.setCellValue("Discount Amount VAT");
            CH2_28.setCellValue("Transaction Amount");
            CH2_29.setCellValue("MSI");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("Commission Base");
            CH2_33.setCellValue("");
            CH2_34.setCellValue("");
            CH2_35.setCellValue("");
            CH2_36.setCellValue("Number");
            CH2_37.setCellValue("Reason Code");
            CH2_38.setCellValue("Description");
            CH2_39.setCellValue("Merch. Loc.");
            CH2_40.setCellValue("Seller ID");
            CH2_41.setCellValue("Amount");
            CH2_42.setCellValue("Commission");
            CH2_43.setCellValue("VAT");
            CH2_44.setCellValue("");
            CH2_45.setCellValue("");
            CH2_46.setCellValue("");
            CH2_47.setCellValue("");
            CH2_48.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 28, 28));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 31));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 32, 35));

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 37, 37));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 38, 38));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 39, 39));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 40, 40));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 41, 41));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 42, 42));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 43, 43));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("");
            CH3_26.setCellValue("");
            CH3_27.setCellValue("");
            CH3_28.setCellValue("");
            CH3_29.setCellValue("Rate Comm.");
            CH3_30.setCellValue("Total Comm.");
            CH3_31.setCellValue("VAT COMM 1 2");
            CH3_32.setCellValue("Discount Rate Comm.");
            CH3_33.setCellValue("Discount Amount Comm.");
            CH3_34.setCellValue("Discount Rate VAT");
            CH3_35.setCellValue("Discount Amount VAT");
            CH3_36.setCellValue("");
            CH3_37.setCellValue("");
            CH3_38.setCellValue("");
            CH3_39.setCellValue("");
            CH3_40.setCellValue("");
            CH3_41.setCellValue("");
            CH3_42.setCellValue("");
            CH3_43.setCellValue("");
            CH3_44.setCellValue("");
            CH3_45.setCellValue("");
            CH3_46.setCellValue("");
            CH3_47.setCellValue("");
            CH3_48.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 35, 35));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).TRANSDATE);
                rcell2.setCellValue(listaData.get(vi).PASSED_DAYS);
                rcell3.setCellValue(listaData.get(vi).desCERROIN);
                rcell4.setCellValue(listaData.get(vi).descSTVAL);
                rcell5.setCellValue(listaData.get(vi).ZONA);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).RECTYPE);
                rcell8.setCellValue(listaData.get(vi).QTYTKT);
                rcell9.setCellValue(listaData.get(vi).INVORNBR);
                rcell10.setCellValue(listaData.get(vi).SPNR);
                rcell11.setCellValue(listaData.get(vi).descTDOC);
                rcell12.setCellValue(listaData.get(vi).ISREFNBR);
                rcell13.setCellValue(listaData.get(vi).SCARDN);
                rcell14.setCellValue(listaData.get(vi).SAUTHOC);
                rcell15.setCellValue(listaData.get(vi).NBRINSTA);
                rcell16.setCellValue(listaData.get(vi).INSTANBR);
                rcell17.setCellValue(listaData.get(vi).SVFOPS);
                rcell18.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell19.setCellValue(listaData.get(vi).RATESFEE);
                rcell20.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell21.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell22.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell23.setCellValue(listaData.get(vi).IVACOM12);
                rcell24.setCellValue(listaData.get(vi).DISCRATE);
                rcell25.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell26.setCellValue(listaData.get(vi).DISCRATEI);
                rcell27.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell28.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell29.setCellValue(listaData.get(vi).RATESFEEC);
                rcell30.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell31.setCellValue(listaData.get(vi).VATCOMMSIC);
                rcell32.setCellValue(listaData.get(vi).DISCRATEC);
                rcell33.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell34.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell35.setCellValue(listaData.get(vi).DISCAMOUIC);
                rcell36.setCellValue(listaData.get(vi).CHADJNBR);
                rcell37.setCellValue(listaData.get(vi).CHAADJCOD);
                rcell38.setCellValue(listaData.get(vi).CHAADJDES);
                rcell39.setCellValue(listaData.get(vi).LMERCHID);
                rcell40.setCellValue(listaData.get(vi).SELLERID);
                rcell41.setCellValue(listaData.get(vi).GROSAMOUN_CB);
                rcell42.setCellValue(listaData.get(vi).DISCAMOUN_CB);
                rcell43.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell44.setCellValue(listaData.get(vi).NETAMOUN);
                rcell45.setCellValue(listaData.get(vi).IN_PCURRENCY);
                rcell46.setCellValue(listaData.get(vi).DISCAMOSC);
                rcell47.setCellValue(listaData.get(vi).descFREGLA);
                rcell48.setCellValue(listaData.get(vi).descFCOMPL);

                if (listaData.get(vi).CERROIN.equals("")) {
                    //nadine
                } else {
                    rcell3.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);
            Cell CH1_32_T = rowTotal.createCell(32);
            Cell CH1_33_T = rowTotal.createCell(33);
            Cell CH1_34_T = rowTotal.createCell(34);
            Cell CH1_35_T = rowTotal.createCell(35);
            Cell CH1_36_T = rowTotal.createCell(36);
            Cell CH1_37_T = rowTotal.createCell(37);
            Cell CH1_38_T = rowTotal.createCell(38);
            Cell CH1_39_T = rowTotal.createCell(39);
            Cell CH1_40_T = rowTotal.createCell(40);
            Cell CH1_41_T = rowTotal.createCell(41);
            Cell CH1_42_T = rowTotal.createCell(42);
            Cell CH1_43_T = rowTotal.createCell(43);
            Cell CH1_44_T = rowTotal.createCell(44);
            Cell CH1_45_T = rowTotal.createCell(45);
            Cell CH1_46_T = rowTotal.createCell(46);
            Cell CH1_47_T = rowTotal.createCell(47);
            Cell CH1_48_T = rowTotal.createCell(48);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue("");
            CH1_15_T.setCellValue("");
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue(listaData.get(0).SVFOPS_TOTAL);
            CH1_18_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_19_T.setCellValue("");
            CH1_20_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_21_T.setCellValue(listaData.get(0).totACCEAMOU);
            CH1_22_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_23_T.setCellValue(listaData.get(0).totIVACOM12);
            CH1_24_T.setCellValue("");
            CH1_25_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_26_T.setCellValue("");
            CH1_27_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_28_T.setCellValue(listaData.get(0).TGROSAMOUC_TOTAL);
            CH1_29_T.setCellValue("");
            CH1_30_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_31_T.setCellValue(listaData.get(0).VATCOMMSIC_TOTAL);
            CH1_32_T.setCellValue("");
            CH1_33_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_34_T.setCellValue("");
            CH1_35_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);
            CH1_36_T.setCellValue("");
            CH1_37_T.setCellValue("");
            CH1_38_T.setCellValue("");
            CH1_39_T.setCellValue("");
            CH1_40_T.setCellValue("");
            CH1_41_T.setCellValue(listaData.get(0).totGROSAMOUN_CB);
            CH1_42_T.setCellValue(listaData.get(0).DISCAMOUN_CB_TOTAL);
            CH1_43_T.setCellValue(listaData.get(0).totTAXAMOUN_CB);
            CH1_44_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_45_T.setCellValue("");
            CH1_46_T.setCellValue(listaData.get(0).totDISCAMOSC);
            CH1_47_T.setCellValue("");
            CH1_48_T.setCellValue("");

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);
            CH1_32_T.setCellStyle(totalStyle);
            CH1_33_T.setCellStyle(totalStyle);
            CH1_34_T.setCellStyle(totalStyle);
            CH1_35_T.setCellStyle(totalStyle);
            CH1_36_T.setCellStyle(totalStyle);
            CH1_37_T.setCellStyle(totalStyle);
            CH1_38_T.setCellStyle(totalStyle);
            CH1_39_T.setCellStyle(totalStyle);
            CH1_40_T.setCellStyle(totalStyle);
            CH1_41_T.setCellStyle(totalStyle);
            CH1_42_T.setCellStyle(totalStyle);
            CH1_43_T.setCellStyle(totalStyle);
            CH1_44_T.setCellStyle(totalStyle);
            CH1_45_T.setCellStyle(totalStyle);
            CH1_46_T.setCellStyle(totalStyle);
            CH1_47_T.setCellStyle(totalStyle);
            CH1_48_T.setCellStyle(totalStyle);

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

            //============================================
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetailTktSettlement")
    public @ResponseBody
    void getXLSXDetailTktSettlement(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailTktSettlement");
        String fileNameDownload = String.format("Settlement Detail Tkt Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListDetTktSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Sales");
            CH1_2.setCellValue("Processing");
            CH1_3.setCellValue("Zone");
            CH1_4.setCellValue("Country");
            CH1_5.setCellValue("Status");
            CH1_6.setCellValue("");
            CH1_7.setCellValue("Transaction");
            CH1_8.setCellValue("Invoice Refer.Number PNR");
            CH1_9.setCellValue("PNR");
            CH1_10.setCellValue("Ticket");
            CH1_11.setCellValue("Card Number");
            CH1_12.setCellValue("Auth.");
            CH1_13.setCellValue("Amount Total Transact.");
            CH1_14.setCellValue("Transaction Amount");
            CH1_15.setCellValue("Adjustment");
            CH1_16.setCellValue("MSI");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("Commission Base");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("Result Reconciliation Transaction");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");
            CH1_32.setCellValue("Chargeback");
            CH1_33.setCellValue("");
            CH1_34.setCellValue("");
            CH1_35.setCellValue("Net Amount to Receive AM");
            CH1_36.setCellValue("Currency Settlement");
            CH1_37.setCellValue("Calculated Commission");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)            
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 37, 37));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Date");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("Reconciliation Settlement");
            CH2_6.setCellValue("Settlement vs Sales");
            CH2_7.setCellValue("Type");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("Rate Comm.");
            CH2_17.setCellValue("Serv. Fee");
            CH2_18.setCellValue("Accel. Amount");
            CH2_19.setCellValue("Total Comm.");
            CH2_20.setCellValue("VAT COMM 1 2");
            CH2_21.setCellValue("Discount Rate");
            CH2_22.setCellValue("Discount Amount");
            CH2_23.setCellValue("Discount Rate VAT");
            CH2_24.setCellValue("Discount Amount VAT");
            CH2_25.setCellValue("MSI");
            CH2_26.setCellValue("");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("Commision Base");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("");
            CH2_32.setCellValue("Amount");
            CH2_33.setCellValue("Commision");
            CH2_34.setCellValue("VAT");
            CH2_35.setCellValue("");
            CH2_36.setCellValue("");
            CH2_37.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 27));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 31));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 34, 34));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");
            CH3_23.setCellValue("");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("Rate Comm.");
            CH3_26.setCellValue("Total Comm.");
            CH3_27.setCellValue("VAT COMM 1 2");
            CH3_28.setCellValue("Discount Rate Comm.");
            CH3_29.setCellValue("Discount Amount Comm.");
            CH3_30.setCellValue("Discount Rate VAT.");
            CH3_31.setCellValue("Discount Amount VAT");
            CH3_32.setCellValue("");
            CH3_33.setCellValue("");
            CH3_34.setCellValue("");
            CH3_35.setCellValue("");
            CH3_36.setCellValue("");
            CH3_37.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 31, 31));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).TRANSDATE);
                rcell2.setCellValue(listaData.get(vi).AXPRODAT);
                rcell3.setCellValue(listaData.get(vi).ZONA);
                rcell4.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell5.setCellValue(listaData.get(vi).desCERROR);
                rcell6.setCellValue(listaData.get(vi).descSTVAL);
                rcell7.setCellValue(listaData.get(vi).RECTYPE);
                rcell8.setCellValue(listaData.get(vi).INVORNBR);
                rcell9.setCellValue(listaData.get(vi).SPNR);
                rcell10.setCellValue(listaData.get(vi).ISREFNBR);
                rcell11.setCellValue(listaData.get(vi).SCARDN);
                rcell12.setCellValue(listaData.get(vi).SAUTHOC);
                rcell13.setCellValue(listaData.get(vi).TGROSAMOUC);
                rcell14.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell15.setCellValue(listaData.get(vi).SADJUST);
                rcell16.setCellValue(listaData.get(vi).RATESFEE);
                rcell17.setCellValue(listaData.get(vi).SFEEAMOU);
                rcell18.setCellValue(listaData.get(vi).ACCEAMOU);
                rcell19.setCellValue(listaData.get(vi).ACCEAMOUC);
                rcell20.setCellValue(listaData.get(vi).IVACOM12);
                rcell21.setCellValue(listaData.get(vi).DISCRATE);
                rcell22.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell23.setCellValue(listaData.get(vi).DISCRATEI);
                rcell24.setCellValue(listaData.get(vi).DISCAMOUNI);
                rcell25.setCellValue(listaData.get(vi).RATESFEEC);
                rcell26.setCellValue(listaData.get(vi).SFEEAMOUC);
                rcell27.setCellValue(listaData.get(vi).VATCOMMSIC);
                rcell28.setCellValue(listaData.get(vi).DISCRATEC);
                rcell29.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell30.setCellValue(listaData.get(vi).DISCRATEIC);
                rcell31.setCellValue(listaData.get(vi).DISCAMOUIC);
                rcell32.setCellValue(listaData.get(vi).GROSAMOUN_CB);
                rcell33.setCellValue(listaData.get(vi).DISCAMOUN_CB);
                rcell34.setCellValue(listaData.get(vi).TAXAMOUN_CB);
                rcell35.setCellValue(listaData.get(vi).NETAMOUN);
                rcell36.setCellValue(listaData.get(vi).IN_PCURRENCY);
                rcell37.setCellValue(listaData.get(vi).DISCAMOSC);

                if (listaData.get(vi).CERROIN.equals("")) {
                    //nadine
                } else {
                    rcell5.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);
            Cell CH1_23_T = rowTotal.createCell(23);
            Cell CH1_24_T = rowTotal.createCell(24);
            Cell CH1_25_T = rowTotal.createCell(25);
            Cell CH1_26_T = rowTotal.createCell(26);
            Cell CH1_27_T = rowTotal.createCell(27);
            Cell CH1_28_T = rowTotal.createCell(28);
            Cell CH1_29_T = rowTotal.createCell(29);
            Cell CH1_30_T = rowTotal.createCell(30);
            Cell CH1_31_T = rowTotal.createCell(31);
            Cell CH1_32_T = rowTotal.createCell(32);
            Cell CH1_33_T = rowTotal.createCell(33);
            Cell CH1_34_T = rowTotal.createCell(34);
            Cell CH1_35_T = rowTotal.createCell(35);
            Cell CH1_36_T = rowTotal.createCell(36);
            Cell CH1_37_T = rowTotal.createCell(37);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue(listaData.get(0).totTGROSAMOUN);
            CH1_15_T.setCellValue(listaData.get(0).SADJUST_TOTAL);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue(listaData.get(0).totSFEEAMOU);
            CH1_18_T.setCellValue(listaData.get(0).totACCEAMOU);
            CH1_19_T.setCellValue(listaData.get(0).ACCEAMOUC_TOTAL);
            CH1_20_T.setCellValue(listaData.get(0).totIVACOM12);
            CH1_21_T.setCellValue("");
            CH1_22_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_23_T.setCellValue("");
            CH1_24_T.setCellValue(listaData.get(0).DISCAMOUNI_TOTAL);
            CH1_25_T.setCellValue("");
            CH1_26_T.setCellValue(listaData.get(0).SFEEAMOUC_TOTAL);
            CH1_27_T.setCellValue(listaData.get(0).VATCOMMSIC_TOTAL);
            CH1_28_T.setCellValue("");
            CH1_29_T.setCellValue(listaData.get(0).DISCAMOUNC_TOTAL);
            CH1_30_T.setCellValue("");
            CH1_31_T.setCellValue(listaData.get(0).DISCAMOUIC_TOTAL);
            CH1_32_T.setCellValue(listaData.get(0).totGROSAMOUN_CB);
            CH1_33_T.setCellValue(listaData.get(0).DISCAMOUN_CB_TOTAL);
            CH1_34_T.setCellValue(listaData.get(0).totTAXAMOUN_CB);
            CH1_35_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_36_T.setCellValue("");
            CH1_37_T.setCellValue(listaData.get(0).totDISCAMOSC);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);
            CH1_23_T.setCellStyle(totalStyle);
            CH1_24_T.setCellStyle(totalStyle);
            CH1_25_T.setCellStyle(totalStyle);
            CH1_26_T.setCellStyle(totalStyle);
            CH1_27_T.setCellStyle(totalStyle);
            CH1_28_T.setCellStyle(totalStyle);
            CH1_29_T.setCellStyle(totalStyle);
            CH1_30_T.setCellStyle(totalStyle);
            CH1_31_T.setCellStyle(totalStyle);
            CH1_32_T.setCellStyle(totalStyle);
            CH1_33_T.setCellStyle(totalStyle);
            CH1_34_T.setCellStyle(totalStyle);
            CH1_35_T.setCellStyle(totalStyle);
            CH1_36_T.setCellStyle(totalStyle);
            CH1_37_T.setCellStyle(totalStyle);

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

            //============================================
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXMainErrorTransactiont")
    public @ResponseBody
    void getXLSXMainErrorTransactiont(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainErrorTransactiont");
        String fileNameDownload = String.format("Report ErrorTransactiont - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListErrorTransaction(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Procesing");
            CH1_2.setCellValue("Zone");
            CH1_3.setCellValue("Country");
            CH1_4.setCellValue("Payment");
            CH1_5.setCellValue("Status");
            CH1_6.setCellValue("Document Type");
            CH1_7.setCellValue("Transaction");
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
            CH1_18.setCellValue("Curr.");
            CH1_19.setCellValue("Transaction Amount");
            CH1_20.setCellValue("Qty Tkts");
            CH1_21.setCellValue("Error");
            CH1_22.setCellValue("");

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

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 22));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("Merchant ID");
            CH2_5.setCellValue("Settlement vs Sales");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("Sales Merchant ID");
            CH2_8.setCellValue("Description");
            CH2_9.setCellValue("ID tran.");
            CH2_10.setCellValue("Invoice Refer. Number PNR");
            CH2_11.setCellValue("PNR");
            CH2_12.setCellValue("Indust.Speci.Ref.Nbr TKT");
            CH2_13.setCellValue("Installment");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("Card Account Number");
            CH2_16.setCellValue("Approval Code");
            CH2_17.setCellValue("Sales Date");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("Code");
            CH2_22.setCellValue("Description");

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

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));

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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("Plan");
            CH3_14.setCellValue("Number");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");
            CH3_19.setCellValue("");
            CH3_20.setCellValue("");
            CH3_21.setCellValue("");
            CH3_22.setCellValue("");

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

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).DATE);
                rcell2.setCellValue(listaData.get(vi).ZONA);
                rcell3.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell4.setCellValue(listaData.get(vi).PMERCHID);
                rcell5.setCellValue(listaData.get(vi).descSTVAL);
                rcell6.setCellValue(listaData.get(vi).descTDOC);
                rcell7.setCellValue(listaData.get(vi).SMERCHID);
                rcell8.setCellValue(listaData.get(vi).DES_SMERCHANT);
                rcell9.setCellValue(listaData.get(vi).IDITEMT);
                rcell10.setCellValue(listaData.get(vi).INVORNBR);
                rcell11.setCellValue(listaData.get(vi).SPNR);
                rcell12.setCellValue(listaData.get(vi).ISREFNBR);
                rcell13.setCellValue(listaData.get(vi).NBRINSTA);
                rcell14.setCellValue(listaData.get(vi).INSTANBR);
                rcell15.setCellValue(listaData.get(vi).SCARDN);
                rcell16.setCellValue(listaData.get(vi).SAUTHOC);
                rcell17.setCellValue(listaData.get(vi).BSUMDATE);
                rcell18.setCellValue(listaData.get(vi).SCURRENCY);
                rcell19.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell20.setCellValue(listaData.get(vi).QTYTKT);
                rcell21.setCellValue(listaData.get(vi).CERROR);
                rcell22.setCellValue(listaData.get(vi).DES_CERROR);
//                if (listaData.get(vi).CERROR.equals("01")) {
//                    rcell3.setCellStyle(bodyStyle);
//                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);
            Cell CH1_19_T = rowTotal.createCell(19);
            Cell CH1_20_T = rowTotal.createCell(20);
            Cell CH1_21_T = rowTotal.createCell(21);
            Cell CH1_22_T = rowTotal.createCell(22);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");
            CH1_11_T.setCellValue("");
            CH1_12_T.setCellValue("");
            CH1_13_T.setCellValue("");
            CH1_14_T.setCellValue("");
            CH1_15_T.setCellValue("");
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue("");
            CH1_19_T.setCellValue(listaData.get(0).TGROSAMOUN_TOTAL);
            CH1_20_T.setCellValue("");
            CH1_21_T.setCellValue("");
            CH1_22_T.setCellValue("");

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);
            CH1_19_T.setCellStyle(totalStyle);
            CH1_20_T.setCellStyle(totalStyle);
            CH1_21_T.setCellStyle(totalStyle);
            CH1_22_T.setCellStyle(totalStyle);

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
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);

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

    @RequestMapping(value = "getXLSXMainAdjustment")
    public @ResponseBody
    void getXLSXMainAdjustment(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainAdjustment");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4118Filter> listaData = this.getListMainAdjustment(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(255, 111, 111)));
            bodyStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
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

            CH1_0.setCellValue("Payment");
            CH1_1.setCellValue("Merchant ID");
            CH1_2.setCellValue("Status");
            CH1_3.setCellValue("Sales");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("");
            CH1_6.setCellValue("Reason Code");
            CH1_7.setCellValue("Description");
            CH1_8.setCellValue("Curr.");
            CH1_9.setCellValue("GROSS");
            CH1_10.setCellValue("Discount");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("NET");
            CH1_14.setCellValue("Result Reconciliation Summary");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Accounting");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 18));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Merchant");
            CH2_4.setCellValue("Date");
            CH2_5.setCellValue("Number");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("Commission");
            CH2_11.setCellValue("Serv.fee");
            CH2_12.setCellValue("VAT");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("");
            CH2_16.setCellValue("ID");
            CH2_17.setCellValue("Status");
            CH2_18.setCellValue("Date");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("");
            CH3_9.setCellValue("");
            CH3_10.setCellValue("");
            CH3_11.setCellValue("");
            CH3_12.setCellValue("");
            CH3_13.setCellValue("");
            CH3_14.setCellValue("Net");
            CH3_15.setCellValue("Serv.Fee");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("");
            CH3_18.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 15, 15));
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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).desCERROR);
                rcell3.setCellValue(listaData.get(vi).SMERCHID);
                rcell4.setCellValue(listaData.get(vi).BSUMDATE);
                rcell5.setCellValue(listaData.get(vi).CHADJNBR);
                rcell6.setCellValue(listaData.get(vi).CHAADJCOD);
                rcell7.setCellValue(listaData.get(vi).CHAADJDES);
                rcell8.setCellValue(listaData.get(vi).PCURRENCY);
                rcell9.setCellValue(listaData.get(vi).GROSAMOUN);
                rcell10.setCellValue(listaData.get(vi).DISCAMOUN);
                rcell11.setCellValue(listaData.get(vi).SFEEAMOUN);
                rcell12.setCellValue(listaData.get(vi).TAXAMOUN);
                rcell13.setCellValue(listaData.get(vi).NETAMOUN);
                rcell14.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell15.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell16.setCellValue(listaData.get(vi).IDCON);
                rcell17.setCellValue(listaData.get(vi).STCON);
                rcell18.setCellValue(listaData.get(vi).FCONT);
                if (listaData.get(vi).CERROR.equals("01")) {
                    rcell2.setCellStyle(bodyStyle);
                }
                iter.next();
                ++vi;
                ++vj;
            }

            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);
            Cell CH1_9_T = rowTotal.createCell(9);
            Cell CH1_10_T = rowTotal.createCell(10);
            Cell CH1_11_T = rowTotal.createCell(11);
            Cell CH1_12_T = rowTotal.createCell(12);
            Cell CH1_13_T = rowTotal.createCell(13);
            Cell CH1_14_T = rowTotal.createCell(14);
            Cell CH1_15_T = rowTotal.createCell(15);
            Cell CH1_16_T = rowTotal.createCell(16);
            Cell CH1_17_T = rowTotal.createCell(17);
            Cell CH1_18_T = rowTotal.createCell(18);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue("");
            CH1_9_T.setCellValue(listaData.get(0).totGROSAMOUN);
            CH1_10_T.setCellValue(listaData.get(0).totDISCAMOUN);
            CH1_11_T.setCellValue(listaData.get(0).totSFEEAMOUN);
            CH1_12_T.setCellValue(listaData.get(0).totTAXAMOUN);
            CH1_13_T.setCellValue(listaData.get(0).totNETAMOUN);
            CH1_14_T.setCellValue(listaData.get(0).totNETAMOUNC);
            CH1_15_T.setCellValue(listaData.get(0).totSFEEAMOUNC);
            CH1_16_T.setCellValue("");
            CH1_17_T.setCellValue("");
            CH1_18_T.setCellValue("");

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);
            CH1_9_T.setCellStyle(totalStyle);
            CH1_10_T.setCellStyle(totalStyle);
            CH1_11_T.setCellStyle(totalStyle);
            CH1_12_T.setCellStyle(totalStyle);
            CH1_13_T.setCellStyle(totalStyle);
            CH1_14_T.setCellStyle(totalStyle);
            CH1_15_T.setCellStyle(totalStyle);
            CH1_16_T.setCellStyle(totalStyle);
            CH1_17_T.setCellStyle(totalStyle);
            CH1_18_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "getXLSXMainChangePayment")
    public @ResponseBody
    void getXLSXMainChangePayment(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMainChangePayment");
        String fileNameDownload = String.format("Report ChangePayment - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4116Filter> listaData = this.getListChangePayment(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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

            CH1_0.setCellValue("Procesing Date");
            CH1_1.setCellValue("Payment Date");
            CH1_2.setCellValue("Business Date");
            CH1_3.setCellValue("Installment");
            CH1_4.setCellValue("");
            CH1_5.setCellValue("PNR");
            CH1_6.setCellValue("Document Type");
            CH1_7.setCellValue("Status Settlement vs Sales");
            CH1_8.setCellValue("Credit Card");
            CH1_9.setCellValue("Aprroval Code");
            CH1_10.setCellValue("Curr.");
            CH1_11.setCellValue("Transact Amount");
            CH1_12.setCellValue("Sales Amount");
            CH1_13.setCellValue("Submision Merchant ID");

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

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
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
            CH2_1.setCellValue("");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("Plan");
            CH2_4.setCellValue("Number");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
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

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
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

                rcell0.setCellValue(listaData.get(vi).PRDA);
                rcell1.setCellValue(listaData.get(vi).PAYDATE);
                rcell2.setCellValue(listaData.get(vi).BSUMDATE);
                rcell3.setCellValue(listaData.get(vi).NBRINSTA);
                rcell4.setCellValue(listaData.get(vi).INSTANBR);
                rcell5.setCellValue(listaData.get(vi).SPNR);
                rcell6.setCellValue(listaData.get(vi).descTDOC);
                rcell7.setCellValue(listaData.get(vi).descSTVAL);
                rcell8.setCellValue(listaData.get(vi).SCARDN);
                rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                rcell10.setCellValue(listaData.get(vi).PCURRENCY);
                rcell11.setCellValue(listaData.get(vi).TGROSAMOUN);
                rcell12.setCellValue(listaData.get(vi).SVFOPS);
                rcell13.setCellValue(listaData.get(vi).SMERCHID);
                iter.next();
                ++vi;
                ++vj;
            }
//
//            Row rowTotal = sheet.createRow(vj);
//            Cell CH1_0_T = rowTotal.createCell(0);
//            Cell CH1_1_T = rowTotal.createCell(1);
//            Cell CH1_2_T = rowTotal.createCell(2);
//            Cell CH1_3_T = rowTotal.createCell(3);
//            Cell CH1_4_T = rowTotal.createCell(4);
//            Cell CH1_5_T = rowTotal.createCell(5);
//            Cell CH1_6_T = rowTotal.createCell(6);
//            Cell CH1_7_T = rowTotal.createCell(7);
//            Cell CH1_8_T = rowTotal.createCell(8);
//            Cell CH1_9_T = rowTotal.createCell(9);
//            Cell CH1_10_T = rowTotal.createCell(10);
//            Cell CH1_11_T = rowTotal.createCell(11);
//            Cell CH1_12_T = rowTotal.createCell(12);
//            Cell CH1_13_T = rowTotal.createCell(13);
//
//            CH1_0_T.setCellValue(listaData.get(0).TGROSAMOUN_TOTAL);
//            CH1_1_T.setCellValue("");
//            CH1_2_T.setCellValue("");
//            CH1_3_T.setCellValue("");
//            CH1_4_T.setCellValue("");
//            CH1_5_T.setCellValue("");
//            CH1_6_T.setCellValue("");
//            CH1_7_T.setCellValue("");
//            CH1_8_T.setCellValue("");
//            CH1_9_T.setCellValue("");
//            CH1_10_T.setCellValue("");
//            CH1_11_T.setCellValue("");
//            CH1_12_T.setCellValue("");
//            CH1_13_T.setCellValue("");
//            
//            CH1_0_T.setCellStyle(totalStyle);
//            CH1_1_T.setCellStyle(totalStyle);
//            CH1_2_T.setCellStyle(totalStyle);
//            CH1_3_T.setCellStyle(totalStyle);
//            CH1_4_T.setCellStyle(totalStyle);
//            CH1_5_T.setCellStyle(totalStyle);
//            CH1_6_T.setCellStyle(totalStyle);
//            CH1_7_T.setCellStyle(totalStyle);
//            CH1_8_T.setCellStyle(totalStyle);
//            CH1_9_T.setCellStyle(totalStyle);
//            CH1_10_T.setCellStyle(totalStyle);
//            CH1_11_T.setCellStyle(totalStyle);
//            CH1_12_T.setCellStyle(totalStyle);
//            CH1_13_T.setCellStyle(totalStyle);

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

    @RequestMapping(value = "/getTXTSettlementDetail")
    public @ResponseBody
    void getTXTSettlementDetail(HttpServletRequest request, HttpServletResponse response) {
        try {
            String serverPath = request.getSession().getServletContext().getRealPath("/");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHSS");
            String path = sdf.format(new Date());
            ZipFiles zipFiles = new ZipFiles();
            List<File> srcfile = new ArrayList<File>();

            srcfile.add(downloadTXTSettlementDetail(request));

            File zipfile = new File(serverPath + path + ".zip");
            zipFiles.zipFiles(srcfile, zipfile);
            zipFiles.downFile(response, serverPath, path + ".zip");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public File downloadTXTSettlementDetail(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_SettlementDetail");

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
            List<A4116Filter> lst = this.getListDetSettlement(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());

            PrintWriter writer = new PrintWriter(file, "UTF-8");

            cadena = "Payment Date|Sales Date|Diff. Days|Status Reconciliation Settlement|Status Settlement vs Sales|Transaction Type|Qty Tkts|Invoice Refer. Number(PNR)|PNR|Document Type|Indust.Speci.Ref.Nbr|Card Number|Auth|Installment Plan|Installment Number|Sales Amount|Transaction Amount|";

            writer.println("" + cadena);

            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena += lst.get(vi).DATE + "|";
                cadena += lst.get(vi).TRANSDATE + "|";
                cadena += lst.get(vi).PASSED_DAYS + "|";
                cadena += lst.get(vi).desCERROIN + "|";
                cadena += lst.get(vi).descSTVAL + "|";
                cadena += lst.get(vi).RECTYPE + "|";
                cadena += lst.get(vi).QTYTKT + "|";
                cadena += lst.get(vi).INVORNBR + "|";
                cadena += lst.get(vi).SPNR + "|";
                cadena += lst.get(vi).descTDOC + "|";
                cadena += lst.get(vi).ISREFNBR + "|";
                cadena += lst.get(vi).SCARDN + "|";
                cadena += lst.get(vi).SAUTHOC + "|";
                cadena += lst.get(vi).NBRINSTA + "|";
                cadena += lst.get(vi).INSTANBR + "|";
                cadena += lst.get(vi).SVFOPS + "|";
                cadena += lst.get(vi).TGROSAMOUN + "|";
                //cadena += df_2.format(lst.get(vi).VALOR) + "|";

                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    //MAIL
    @RequestMapping(value = "sendMail")
    public @ResponseBody
    String sendMail(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- ReconciliationPayment : sendMail-------------");
        map.put("success", true);
        boolean iboolean;
        A4113Filter objRtn = new A4113Filter();

        objRtn.DATE = request.getParameter("DATE");
        objRtn.AXPAYNBR = request.getParameter("AXPAYNBR");
        objRtn.PMERCHID = request.getParameter("PMERCHID");
        objRtn.PCURRENCY = request.getParameter("PCURRENCY");
        objRtn.DIFF_PNETAMOU_STRING = request.getParameter("DIFF_PNETAMOU_STRING");
        objRtn.ZONA = request.getParameter("ZONA");
        objRtn.SCOUNTRY = request.getParameter("SCOUNTRY");

        // Enviar el Mail            
        iboolean = SendMail(objRtn);
        if (iboolean) {
            map.put("MESSAGE", "Email sent!");
        } else {
            map.put("MESSAGE", "Could not send email!");
        }

        return new Gson().toJson(map);
    }

    public boolean SendMail(A4113Filter Data) throws IOException, Exception {
        boolean iboolean;
        //Data.DATE, Data.AXPAYNBR, Data.PMERCHID, Data.PCURRENCY, Data.DIFF_PNETAMOU_STRING
        ProMail proMail = new ProMail();

        List<A4116Filter> lstEmails = this.getListEmails();

        List<String> receptores = new ArrayList<>();

        for (int i = 0; i < lstEmails.size(); i++){
            receptores.add(lstEmails.get(i).EMAIL);
        }
        
        //receptores.add("rtoledo@aeromexico.com");
        //receptores.add("rpichardor@aeromexico.com");

        List<String> Ccpy = new ArrayList<>();
        //Ccpy.add("ctarazona@miatech.net");

        String asunto = "Debit Memo";
        /*
        String mensaje = "<p>Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Se efectuó la conciliación de la liquidación aplicando los acuerdos vigentes encontrando diferencias en los cobros retenidos por comisiones.<br><br>";
        mensaje = mensaje + "\n" + "Adjunto detalle de liquidación:<br>";
        mensaje = mensaje + "\n" + "<ul>";
        mensaje = mensaje + "\n" + "<li>Fecha de liquidación : " + Data.DATE + "</li>";
        mensaje = mensaje + "\n" + "<li>AX Number : " + Data.AXPAYNBR + "</li>";
        mensaje = mensaje + "\n" + "<li>Merchant Number : " + Data.PMERCHID + "</li>";
        mensaje = mensaje + "\n" + "<li>Valor : " + Data.PCURRENCY + " " + Data.DIFF_PNETAMOU_STRING + "</li>";
        mensaje = mensaje + "\n" + "</ul>";
        mensaje = mensaje + "\n" + "Solicitamos nos puedan aclarar este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
         */
        String mensaje = "Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Derivado de los procesos internos de conciliación,<br>";
        mensaje = mensaje + "\n" + "Hemos detectado  diferencias en el cobro de:<br>";
        mensaje = mensaje + "\n" + "<ul>";
        mensaje = mensaje + "\n" + "<li>Payment Date : " + Data.DATE + "</li>";
        mensaje = mensaje + "\n" + "<li>AX Number : " + Data.AXPAYNBR + "</li>";
        mensaje = mensaje + "\n" + "<li>Merchant Number : " + Data.PMERCHID + "</li>";
        mensaje = mensaje + "\n" + "<li>Zone : " + Data.ZONA + "</li>";
        mensaje = mensaje + "\n" + "<li>Country : " + Data.SCOUNTRY + "</li>";
        mensaje = mensaje + "\n" + "<li>Amount : " + Data.PCURRENCY + " " + Data.DIFF_PNETAMOU_STRING + "</li>";
        mensaje = mensaje + "\n" + "</ul>";
        mensaje = mensaje + "\n" + "Según el detalle anexo.<br>";
        mensaje = mensaje + "\n" + "Agradecemos su atención y quedamos atentos a la aclaración de este hallazgo.<br><br></p>";
        mensaje = mensaje + "\n" + "Atentamente.<br><br>";
        //mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#0C343D;font-size:11.5pt;font-family:Open Sans,sans-serif;\">Medios de pago</span><br>";
        //mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        //mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
        
        String correoMask = "amaclaracionescontracargos@miatech.net";

        List<String> archivos = new ArrayList<>();
        String archivo = this.createFileForEmail(Data);
        archivos.add(archivo);

        iboolean = proMail.sendEmailAMEX(asunto, receptores, Ccpy, mensaje, correoMask, archivos);
        return iboolean;
    }

    public String createFileForEmail(A4113Filter filter) throws Exception {
        System.out.println("Report : createFileForEmail");
        String fileNameDownload = "Settlement Diferences Report " + Functions.getFechaActual() + " " + Functions.getHoraActual() + " ";
        try {
            String date = "";
            Workbook workbook;

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = this.getListForFile(filter);
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

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Zone");
            CH1_5.setCellValue("Country");
            CH1_6.setCellValue("Curr");
            CH1_7.setCellValue("Summary");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("Differences");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("NET");
            CH2_16.setCellValue("GROSS");
            CH2_17.setCellValue("Discount");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("NET");
            CH2_25.setCellValue("GROSS");
            CH2_26.setCellValue("Discount");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("Net");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Rate");
            CH3_9.setCellValue("Commission");
            CH3_10.setCellValue("Serv. Fee");
            CH3_11.setCellValue("Adjustment");
            CH3_12.setCellValue("VAT Rate");
            CH3_13.setCellValue("VAT");
            CH3_14.setCellValue("Op. Debit");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("Rate");
            CH3_18.setCellValue("Commission");
            CH3_19.setCellValue("Serv. Fee");
            CH3_20.setCellValue("Adjustment");
            CH3_21.setCellValue("VAT Rate");
            CH3_22.setCellValue("VAT");
            CH3_23.setCellValue("Op. Debit");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("");
            CH3_26.setCellValue("Commission");
            CH3_27.setCellValue("Serv. Fee");
            CH3_28.setCellValue("Adjustment");
            CH3_29.setCellValue("VAT");
            CH3_30.setCellValue("Op. Debit");
            CH3_31.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 31, 31));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 31));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 30));

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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).ZONA);
                rcell5.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell6.setCellValue(listaData.get(vi).PCURRENCY);
                rcell7.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell8.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell9.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell10.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell11.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell12.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell13.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell14.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell15.setCellValue(listaData.get(vi).PNETAMOU);
                rcell16.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell17.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell18.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell19.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell20.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell21.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell22.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell23.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell24.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell25.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell27.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell29.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell30.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell31.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
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

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
             */
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            //workbook.write(response.getOutputStream());
            workbook.write(fos);
            fos.close();
            return file.getAbsolutePath();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "sendMailMultipleDifferences")
    public @ResponseBody
    String sendMailMultipleDifferences(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- ReconciliationPayment : sendMailMultipleDifferences-------------");
        map.put("success", true);
        boolean iboolean;
        A4113Filter objRtn = new A4113Filter();

        objRtn.IN_DATEFROM = request.getParameter("IN_DATEFROM");
        objRtn.IN_DATETO = request.getParameter("IN_DATETO");
        objRtn.IN_DATE = request.getParameter("IN_DATE");

        // Enviar el Mail            
        iboolean = SendMailMultipleDifferences(objRtn);
        if (iboolean) {
            map.put("MESSAGE", "Email sent!");
        } else {
            map.put("MESSAGE", "Could not send email!");
        }

        return new Gson().toJson(map);
    }

    public boolean SendMailMultipleDifferences(A4113Filter Data) throws IOException, Exception {
        boolean iboolean;
        //Data.DATE, Data.AXPAYNBR, Data.PMERCHID, Data.PCURRENCY, Data.DIFF_PNETAMOU_STRING
        ProMail proMail = new ProMail();
        
        int sizeList = 0;

        DecimalFormatSymbols simbolo = new DecimalFormatSymbols();
        simbolo.setDecimalSeparator('.');
        simbolo.setGroupingSeparator(',');
        DecimalFormat formatea = new DecimalFormat("#,###.##", simbolo);
        double a = 0;

        List<A4116Filter> lstEmails = this.getListEmails();

        List<String> receptores = new ArrayList<>();

        for (int i = 0; i < lstEmails.size(); i++){
            receptores.add(lstEmails.get(i).EMAIL);
        }
        
        //receptores.add("rtoledo@aeromexico.com");
        //receptores.add("rpichardor@aeromexico.com");

        List<String> Ccpy = new ArrayList<>();
        //Ccpy.add("ctarazona@miatech.net");
        String asunto = "Debit Memo";

        List<A4113Filter> listaData = this.getListForFileMultipleDifferences(Data);

        /*String mensaje = "<html>";
        mensaje = mensaje + "\n" + "<style> table, th, td {  border:1px solid black; } td { text-align: center;} </style>";
        mensaje = mensaje + "\n" + "<body>";
        mensaje = mensaje + "\n" + "<p>Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Se efectuó la conciliación de la liquidación aplicando los acuerdos vigentes encontrando diferencias en los cobros retenidos por comisiones.<br><br>";
        mensaje = mensaje + "\n" + "Adjunto detalle de liquidación:<br>";
        mensaje = mensaje + "\n" + "<table style=\"width:100%\">";
        mensaje = mensaje + "\n" + "<tr>    <th>Fecha de liquidación</th>    <th>AX Number</th>    <th>Merchant Number</th>    <th>Moneda</th>    <th>Valor</th>    </tr>";

        for (int i = 0; i < listaData.size(); i++) {
            a = Functions.redondear(listaData.get(i).DIFF_PNETAMOU, 2);
            String diferencia = formatea.format(a);
            diferencia = diferencia.replace("-", "");
            mensaje = mensaje + "\n" + "<tr>    <td>" + listaData.get(i).DATE + "</td>    <td>" + listaData.get(i).AXPAYNBR + "</td>    <td>" + listaData.get(i).PMERCHID + "</td>    <td>" + listaData.get(i).PCURRENCY + "</td>    <td>" + diferencia + "</td>    </tr>";
        }

        mensaje = mensaje + "\n" + "</table>";

        mensaje = mensaje + "\n" + "Solicitamos nos puedan aclarar este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Saludos cordiales.<br><br>";
        mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#616161;font-size:10.5pt;font-family:Open Sans,sans-serif;\">Gerente de Orden al Cobro</span><br>";
        mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
        mensaje = mensaje + "\n" + "</body>";
        mensaje = mensaje + "\n" + "</html>";*/
        String mensaje = "<html>";
        mensaje = mensaje + "\n" + "<style> table, th, td {  border:1px solid black; } td { text-align: center;} </style>";
        mensaje = mensaje + "\n" + "<body>";
        mensaje = mensaje + "\n" + "Estimados señores de American Express<br><br>";
        mensaje = mensaje + "\n" + "Derivado de los procesos internos de conciliación,<br><br>";
        mensaje = mensaje + "\n" + "Hemos detectado  diferencias en el cobro de:<br>";
        mensaje = mensaje + "\n" + "<table style=\"width:100%\">";
        mensaje = mensaje + "\n" + "<tr>    <th>Payment Date</th>    <th>AX Number</th>    <th>Merchant Number</th>    <th>Zone</th>    <th>Country</th>    <th>Currency</th>    <th>Amount</th>    </tr>";
                
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");
        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');
        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        if (listaData.size() > 20) {
            sizeList = 20;
        } else {
            sizeList = listaData.size();
        }

        for (int i = 0; i < sizeList; i++) {
            a = Functions.redondear(listaData.get(i).DIFF_PNETAMOU, 2);
            String diferencia = formatea.format(a);
            //diferencia = diferencia.replace("-", "");
            mensaje = mensaje + "\n" + "<tr>    <td>" + listaData.get(i).DATE + "</td>    <td>" + listaData.get(i).AXPAYNBR + "</td>    <td>" + listaData.get(i).PMERCHID + "</td>    <td>" + listaData.get(i).ZONA + "</td>    <td>" + listaData.get(i).SCOUNTRY + "</td>    <td>" + listaData.get(i).PCURRENCY + "</td>    <td style=\"text-align:right\">" + diferencia + "</td>    </tr>";
        }

        mensaje = mensaje + "\n" + "</table>";

        mensaje = mensaje + "\n" + "Según el detalle anexo.<br>";
        mensaje = mensaje + "\n" + "Agradecemos su atención y quedamos atentos a la aclaración de este hallazgo.<br><br>";
        mensaje = mensaje + "\n" + "Atentamente.<br><br>";
        //mensaje = mensaje + "\n" + "<b style=\"color:#0C343D;font-size:11.5pt;font-family:Verdana,sans-serif;\">Román Pichardo</b><br><br>";
        mensaje = mensaje + "\n" + "<span style=\"color:#0C343D;font-size:11.5pt;font-family:Open Sans,sans-serif;\">Medios de pago</span><br>";
        //mensaje = mensaje + "\n" + "<img src=\"cid:logo\" /><br>";
        //mensaje = mensaje + "\n" + "<span style=\"color:#212121;font-size:9pt;font-family:Segoe UI,sans-serif;\">Email: <a href=\"mailto:rpichardor@aeromexico.com\" target=\"_blank\" >rpichardor@aeromexico.com</a></span>";
        mensaje = mensaje + "\n" + "</body>";
        mensaje = mensaje + "\n" + "</html>";

        String correoMask = "amaclaracionescontracargos@miatech.net";

        List<String> archivos = new ArrayList<>();
        String archivo = this.createFileForEmailMultipleDifferences(Data, listaData);
        archivos.add(archivo);

        iboolean = proMail.sendEmailAMEX(asunto, receptores, Ccpy, mensaje, correoMask, archivos);
        return iboolean;
    }

    public String createFileForEmailMultipleDifferences(A4113Filter filter, List<A4113Filter> Lista) throws Exception {
        System.out.println("Report : createFileForEmail");
        String fileNameDownload = "Settlement Diferences Report " + Functions.getFechaActual() + " " + Functions.getHoraActual() + " ";
        try {
            String date = "";
            Workbook workbook;

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A4113Filter> listaData = Lista;
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

            date = listaData.get(0).IN_DATE.equals("PAYDATE") ? "Payment" : "Processing";

            CH1_0.setCellValue(date);
            CH1_1.setCellValue("Payment");
            CH1_2.setCellValue("AX Number");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Zone");
            CH1_5.setCellValue("Country");
            CH1_6.setCellValue("Curr");
            CH1_7.setCellValue("Summary");
            CH1_8.setCellValue("");
            CH1_9.setCellValue("");
            CH1_10.setCellValue("");
            CH1_11.setCellValue("");
            CH1_12.setCellValue("");
            CH1_13.setCellValue("");
            CH1_14.setCellValue("");
            CH1_15.setCellValue("");
            CH1_16.setCellValue("Result Reconciliation Summary vs Submission");
            CH1_17.setCellValue("");
            CH1_18.setCellValue("");
            CH1_19.setCellValue("");
            CH1_20.setCellValue("");
            CH1_21.setCellValue("");
            CH1_22.setCellValue("");
            CH1_23.setCellValue("");
            CH1_24.setCellValue("");
            CH1_25.setCellValue("Differences");
            CH1_26.setCellValue("");
            CH1_27.setCellValue("");
            CH1_28.setCellValue("");
            CH1_29.setCellValue("");
            CH1_30.setCellValue("");
            CH1_31.setCellValue("");

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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Merchant ID");
            CH2_2.setCellValue("");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("GROSS");
            CH2_8.setCellValue("Discount");
            CH2_9.setCellValue("");
            CH2_10.setCellValue("");
            CH2_11.setCellValue("");
            CH2_12.setCellValue("");
            CH2_13.setCellValue("");
            CH2_14.setCellValue("");
            CH2_15.setCellValue("NET");
            CH2_16.setCellValue("GROSS");
            CH2_17.setCellValue("Discount");
            CH2_18.setCellValue("");
            CH2_19.setCellValue("");
            CH2_20.setCellValue("");
            CH2_21.setCellValue("");
            CH2_22.setCellValue("");
            CH2_23.setCellValue("");
            CH2_24.setCellValue("NET");
            CH2_25.setCellValue("GROSS");
            CH2_26.setCellValue("Discount");
            CH2_27.setCellValue("");
            CH2_28.setCellValue("");
            CH2_29.setCellValue("");
            CH2_30.setCellValue("");
            CH2_31.setCellValue("Net");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("");
            CH3_3.setCellValue("");
            CH3_4.setCellValue("");
            CH3_5.setCellValue("");
            CH3_6.setCellValue("");
            CH3_7.setCellValue("");
            CH3_8.setCellValue("Rate");
            CH3_9.setCellValue("Commission");
            CH3_10.setCellValue("Serv. Fee");
            CH3_11.setCellValue("Adjustment");
            CH3_12.setCellValue("VAT Rate");
            CH3_13.setCellValue("VAT");
            CH3_14.setCellValue("Op. Debit");
            CH3_15.setCellValue("");
            CH3_16.setCellValue("");
            CH3_17.setCellValue("Rate");
            CH3_18.setCellValue("Commission");
            CH3_19.setCellValue("Serv. Fee");
            CH3_20.setCellValue("Adjustment");
            CH3_21.setCellValue("VAT Rate");
            CH3_22.setCellValue("VAT");
            CH3_23.setCellValue("Op. Debit");
            CH3_24.setCellValue("");
            CH3_25.setCellValue("");
            CH3_26.setCellValue("Commission");
            CH3_27.setCellValue("Serv. Fee");
            CH3_28.setCellValue("Adjustment");
            CH3_29.setCellValue("VAT");
            CH3_30.setCellValue("Op. Debit");
            CH3_31.setCellValue("");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)         
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 31, 31));

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 31));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 30));

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

                rcell0.setCellValue(listaData.get(vi).DATE);
                rcell1.setCellValue(listaData.get(vi).PMERCHID);
                rcell2.setCellValue(listaData.get(vi).AXPAYNBR);
                rcell3.setCellValue(listaData.get(vi).desCERROR);
                rcell4.setCellValue(listaData.get(vi).ZONA);
                rcell5.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell6.setCellValue(listaData.get(vi).PCURRENCY);
                rcell7.setCellValue(listaData.get(vi).PGROSAMOU);
                rcell8.setCellValue(listaData.get(vi).RATECOMBA + "%");
                rcell9.setCellValue(listaData.get(vi).PDISCAMOU);
                rcell10.setCellValue(listaData.get(vi).PSFEEAMOU);
                rcell11.setCellValue(listaData.get(vi).PADJAMOUN);
                rcell12.setCellValue(listaData.get(vi).RATEIVABA + "%");
                rcell13.setCellValue(listaData.get(vi).PTAXAMOU);
                rcell14.setCellValue(listaData.get(vi).ODBALAMOU);
                rcell15.setCellValue(listaData.get(vi).PNETAMOU);
                rcell16.setCellValue(listaData.get(vi).GROSAMOUNC);
                rcell17.setCellValue(listaData.get(vi).RATECOMBAC + "%");
                rcell18.setCellValue(listaData.get(vi).DISCAMOUNC);
                rcell19.setCellValue(listaData.get(vi).SFEEAMOUNC);
                rcell20.setCellValue(listaData.get(vi).ADJAMOUNC);
                rcell21.setCellValue(listaData.get(vi).RATEIVABAC + "%");
                rcell22.setCellValue(listaData.get(vi).TAXAMOUNC);
                rcell23.setCellValue(listaData.get(vi).ODBALAMOUC);
                rcell24.setCellValue(listaData.get(vi).NETAMOUNC);
                rcell25.setCellValue(listaData.get(vi).DIFF_PGROSAMOU);
                rcell26.setCellValue(listaData.get(vi).DIFF_PDISCAMOU);
                rcell27.setCellValue(listaData.get(vi).DIFF_PSFEEAMOU);
                rcell28.setCellValue(listaData.get(vi).DIFF_PADJAMOUN);
                rcell29.setCellValue(listaData.get(vi).DIFF_PTAXAMOU);
                rcell30.setCellValue(listaData.get(vi).DIFF_ODBALAMOU);
                rcell31.setCellValue(listaData.get(vi).DIFF_PNETAMOU);
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

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
             */
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            //workbook.write(response.getOutputStream());
            workbook.write(fos);
            fos.close();
            return file.getAbsolutePath();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    //Listado de Codigos de error
    @RequestMapping(value = "getErrorCodes")
    public @ResponseBody
    String getErrorCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getErrorCodes-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetErrorCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetErrorCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04414(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    //Listado de Codigos de error Reconciliation Settlement
    @RequestMapping(value = "getErrorCodesRecSett")
    public @ResponseBody
    String getErrorCodesRecSett(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getErrorCodesRecSett-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetErrorCodesRecSett(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetErrorCodesRecSett(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04465(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "getZonas")
    public @ResponseBody
    String getZonas(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getZonas-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetZonas(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetZonas(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04569(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "getPaises")
    public @ResponseBody
    String getPaises(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getPaises-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetPaises(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetPaises(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04570(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "getAdjustmentCodes")
    public @ResponseBody
    String getCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ReconciliationPayment : getAdjustmentCodes-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetAdjustmentCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetAdjustmentCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX606SQP04470(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    public List<A4116Filter> getListEmails() {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();

        try {
            logic = new ReconciliationPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX606SQP04617(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }
}
