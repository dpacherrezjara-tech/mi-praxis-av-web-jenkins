/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankReconciliationLogic;
import net.miatech.praxis.logic.payments.LoadSalesConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.Region;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.codehaus.jackson.JsonParser;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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

    @RequestMapping(value = "searchMain")
    public @ResponseBody
    String searchMain(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchMain-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListMain(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListMain(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Main(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchGraf")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- StatementReconciliations : SearchGraf-------------");

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
            lst = logic.loadPX287SQP00838(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCountry")
    public @ResponseBody
    String searchCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchCountry-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListCountry(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCountry(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Country(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCore")
    public @ResponseBody
    String searchCore(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchCore -------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListCore(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCore(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Core(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCountryDebits")
    public @ResponseBody
    String searchCountryDebits(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchCountryDebits-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListCountryDebits(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCountryDebits(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698CountryDebits(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDay")
    public @ResponseBody
    String searchDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDay-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDay(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDay(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Day(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetalle-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalle(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetalle(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Detalle(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTicket")
    public @ResponseBody
    String searchTicket(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchTicket-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTicket(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Ticket(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTable_REFND")
    public @ResponseBody
    String searchTable_REFND(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchTable_REFND-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListTable_REFND(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTable_REFND(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Table_REFND(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTable_CHGBAK")
    public @ResponseBody
    String searchTable_CHGBAK(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchTable_CHGBAK-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListTable_CHGBAK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTable_CHGBAK(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Table_CHGBAK(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTable_ACREDIT")
    public @ResponseBody
    String searchTable_ACREDIT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchTable_ACREDIT-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListTable_ACREDIT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTable_ACREDIT(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Table_ACREDIT(filter);
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

    @RequestMapping(value = "validationAdj")
    public @ResponseBody
    String validationAdj(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : validationAdj-------------");
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
            result = logic.loadPX269SQPVALIADJ(filter);
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
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_TktTw")
    public @ResponseBody
    String executeOption_TktTw(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : executeOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_TKTTW(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_REFND")
    public @ResponseBody
    String executeOption_REFND(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : executeOption_REFND-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_REFND(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_CHGBAK")
    public @ResponseBody
    String executeOption_CHGBAK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : executeOption_CHGBAK-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_CHGBAK(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_ACREDIT")
    public @ResponseBody
    String executeOption_ACREDIT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : executeOption_ACREDIT-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_ACREDIT(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "reverseOption")
    public @ResponseBody
    String reverseOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : reverseOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter filters = gson.fromJson(beanString, A2290Filter.class);
//            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
//            msj = logic.loadPX269SQP05117(filterList, user);
            msj = logic.loadPX269MPS287(filters, user);

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

    @RequestMapping(value = "reverseOptionDebits")
    public @ResponseBody
    String reverseOptionDebits(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : reverseOptionDebits-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            filter = gson.fromJson(beanString, A2290Filter.class);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117_REFND(filter, user);

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

    @RequestMapping(value = "reverseOptionOnlyLiq")
    public @ResponseBody
    String reverseOptionOnlyLiq(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BankReconciliation : reverseOptionOnlyLiq-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117OnlyLiq(filterList, user);

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

    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody
    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListMain(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Settlement Reconciliation");
            CH1_9.setCellValue("Sales Reconciliation");
            CH1_13.setCellValue("Settlement");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 16));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Match");
            CH2_5.setCellValue("Settlement");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("Accounted");
            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("Match");
            CH2_12.setCellValue("Sales");
            CH2_13.setCellValue("Cargo");
            CH2_15.setCellValue("Mail");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 16));

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

            CH3_1.setCellValue("Auto");
            CH3_2.setCellValue("%");
            CH3_3.setCellValue("Manual");
            CH3_4.setCellValue("Diff");
            CH3_5.setCellValue("w/o Sales");
            CH3_7.setCellValue("Processed");
            CH3_8.setCellValue("Pending");
            CH3_9.setCellValue("by Ticket");
            CH3_10.setCellValue("Automatic");
            CH3_11.setCellValue("Manual");
            CH3_12.setCellValue("w/o Reconcili");
            CH3_13.setCellValue("Total");
            CH3_14.setCellValue("Contab.");
            CH3_15.setCellValue("Total");
            CH3_16.setCellValue("Contab.");

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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(listaData.get(vi).lngQMATCHPercent);
                rcell3.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell4.setCellValue(listaData.get(vi).lngQDIFF);
                rcell5.setCellValue(listaData.get(vi).lngQPEND);
                rcell6.setCellValue(listaData.get(vi).lngQSALES);
                rcell7.setCellValue(listaData.get(vi).lngQPOLIC);
                rcell8.setCellValue(listaData.get(vi).lngQPOLIPE);
                rcell9.setCellValue(listaData.get(vi).lngQTICKET);
                rcell10.setCellValue(listaData.get(vi).lngQTMATCH);
                rcell11.setCellValue(listaData.get(vi).lngQTMANUAL);
                rcell12.setCellValue(listaData.get(vi).lngQTPEND);
                rcell13.setCellValue(listaData.get(vi).lngQTOTS2);
                rcell14.setCellValue(listaData.get(vi).lngQPOLI2);
                rcell15.setCellValue(listaData.get(vi).lngQTOTS3);
                rcell16.setCellValue(listaData.get(vi).lngQPOLI3);

                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
            CH1_2_T.setCellValue(listaData.get(0).lngTotQMATCHPercent);
            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);
            CH1_9_T.setCellValue(listaData.get(0).lngTotQTICKET);
            CH1_10_T.setCellValue(listaData.get(0).lngTotQTMATCH);
            CH1_11_T.setCellValue(listaData.get(0).lngTotQTMANUAL);
            CH1_12_T.setCellValue(listaData.get(0).lngTotQTPEND);
            CH1_13_T.setCellValue(listaData.get(0).lngTotQTOTS2);
            CH1_14_T.setCellValue(listaData.get(0).lngTotQPOLI2);
            CH1_15_T.setCellValue(listaData.get(0).lngTotQTOTS3);
            CH1_16_T.setCellValue(listaData.get(0).lngTotQPOLI3);

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

    @RequestMapping(value = "getXLSXCountry")
    public @ResponseBody
    void getXLSXCountry(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXCountry");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListCountry(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Country");
            CH1_2.setCellValue("Settlement Reconciliation");
            CH1_9.setCellValue("Sales Reconciliation");
            CH1_13.setCellValue("Settlement");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 16));
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

            CH2_0.setCellValue("Code");
            CH2_1.setCellValue("Name");
            CH2_2.setCellValue("Match");
            CH2_5.setCellValue("Settlement");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("Accounted");

            CH2_9.setCellValue("Total");
            CH2_10.setCellValue("Match");
            CH2_12.setCellValue("Sales");
            CH2_13.setCellValue("Cargo");
            CH2_15.setCellValue("Mail");

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
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 16));
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

            CH3_2.setCellValue("Auto");
            CH3_3.setCellValue("Manual");
            CH3_4.setCellValue("Diff");
            CH3_5.setCellValue("w/o Sales");
            CH3_7.setCellValue("Processed");
            CH3_8.setCellValue("Pending");

            CH3_9.setCellValue("by Ticket");
            CH3_10.setCellValue("Automatic");
            CH3_11.setCellValue("Manual");
            CH3_12.setCellValue("w/o Reconcili");
            CH3_13.setCellValue("Total");
            CH3_14.setCellValue("Contab.");
            CH3_15.setCellValue("Total");
            CH3_16.setCellValue("Contab.");

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

                rcell0.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell1.setCellValue(listaData.get(vi).NAME);
                rcell2.setCellValue(listaData.get(vi).lngQMATCH);
                rcell3.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell4.setCellValue(listaData.get(vi).lngQDIFF);
                rcell5.setCellValue(listaData.get(vi).lngQPEND);
                rcell6.setCellValue(listaData.get(vi).lngQSALES);
                rcell7.setCellValue(listaData.get(vi).lngQPOLIC);
                rcell8.setCellValue(listaData.get(vi).lngQPOLIPE);

                rcell9.setCellValue(listaData.get(vi).lngQTICKET);
                rcell10.setCellValue(listaData.get(vi).lngQTMATCH);
                rcell11.setCellValue(listaData.get(vi).lngQTMANUAL);
                rcell12.setCellValue(listaData.get(vi).lngQTPEND);
                rcell13.setCellValue(listaData.get(vi).lngQTOTS2);
                rcell14.setCellValue(listaData.get(vi).lngQPOLI2);
                rcell15.setCellValue(listaData.get(vi).lngQTOTS3);
                rcell16.setCellValue(listaData.get(vi).lngQPOLI3);

                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue(listaData.get(0).lngTotQMATCH);
            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);
            CH1_9_T.setCellValue(listaData.get(0).lngTotQTICKET);
            CH1_10_T.setCellValue(listaData.get(0).lngTotQTMATCH);
            CH1_11_T.setCellValue(listaData.get(0).lngTotQTMANUAL);
            CH1_12_T.setCellValue(listaData.get(0).lngTotQTPEND);
            CH1_13_T.setCellValue(listaData.get(0).lngTotQTOTS2);
            CH1_14_T.setCellValue(listaData.get(0).lngTotQPOLI2);
            CH1_15_T.setCellValue(listaData.get(0).lngTotQTOTS3);
            CH1_16_T.setCellValue(listaData.get(0).lngTotQPOLI3);

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

    @RequestMapping(value = "getXLSXDay")
    public @ResponseBody
    void getXLSXDay(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDay");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDay(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Settlement Reconciliation");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
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

            CH2_0.setCellValue("Day");
            CH2_1.setCellValue("Match");
            CH2_4.setCellValue("Settlement");
            CH2_5.setCellValue("Total");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
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

            CH3_1.setCellValue("Auto");
            CH3_2.setCellValue("Manual");
            CH3_3.setCellValue("Diff");
            CH3_4.setCellValue("w/o Sales");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);

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

                rcell0.setCellValue(listaData.get(vi).SDATE);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell3.setCellValue(listaData.get(vi).lngQDIFF);
                rcell4.setCellValue(listaData.get(vi).lngQPEND);
                rcell5.setCellValue(listaData.get(vi).lngQSALES);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
            CH1_2_T.setCellValue(listaData.get(0).lngTotQMANUAL);
            CH1_3_T.setCellValue(listaData.get(0).lngTotQDIFF);
            CH1_4_T.setCellValue(listaData.get(0).lngTotQPEND);
            CH1_5_T.setCellValue(listaData.get(0).lngTotQSALES);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

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

    @RequestMapping(value = "getXLSXDetalle")
    public @ResponseBody
    void getXLSXDetalle(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetalle");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetalle(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            if (listaData.size() < 65000) {
                workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Report");
                XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
                DataFormat dataFormat = workbook.createDataFormat();
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
                XSSFCellStyle amountStyleBody = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle amountStyleTotal = (XSSFCellStyle) workbook.createCellStyle();
                amountStyleBody.cloneStyleFrom(bodyStyle);
                amountStyleBody.setDataFormat(dataFormat.getFormat("#,##0.00"));
                amountStyleTotal.cloneStyleFrom(headerStyle);
                amountStyleTotal.setDataFormat(dataFormat.getFormat("#,##0.00"));
                Integer vi = 0;
                Integer vj = 0; //Almacena el numero de fila
                Iterator iter = listaData.iterator();
                // ====== CREANDO TITULOS ======================================

                // ====== Nivel 1: Encabezados principales ======
                Row row1 = sheet.createRow(vj);
                Row row2 = sheet.createRow(vj + 1);

                // Estilo aplicado en ambos niveles
                int col = 0;

                // === ENCABEZADOS NIVEL 1 ===
                String[] headers1 = {
                    "STATUS", "PROCESS", "DOC. TYPE", "AGENT", "BUSINESS", "SALES DATE", "CREDIT CARD",
                    "", "", "", "Merchant", "", "CURR", "AMOUNT",
                    "Bank Information", "", "", "Qty", "", "PEN DAY", "BANDOC", "REFER",
                    "INTERFACE", "DAY SEND INTERFACE", "PEND_DAYS", "BPOCOMMENT"
                };

                // === ENCABEZADOS NIVEL 2 ===
                String[] headers2 = {
                    "", "", "", "", "", "", "Code",
                    "Number", "Author. Code",
                    "Bank", "Number",
                    "Rule Conciliation", "", "",
                    "Pay. Date", "Account", "Termi",
                    "Settl.", "Tkts", "", "", "", "", "", "", ""
                };

                for (int i = 0; i < headers1.length; i++) {
                    Cell cell1 = row1.createCell(i);
                    cell1.setCellStyle(headerStyle);
                    cell1.setCellValue(headers1[i]);

                    Cell cell2 = row2.createCell(i);
                    cell2.setCellStyle(headerStyle);
                    cell2.setCellValue(headers2[i]);
                }

                // === MERGES PARA MULTINIVEL ===
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 0, 0));  // STATUS
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 1, 1));  // PROCESS
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 2, 2));  // DOC TYPE
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 3, 3));  // AGENT
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 4, 4));  // BUSINESS
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 5, 5));  // SALES DATE

                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 6, 9));      // CREDIT CARD
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 10, 11));     // MERCHANT

                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 12, 12)); // CURR
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 13, 13)); // AMOUNT

                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 14, 16));     // BANK INFORMATION
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 17, 18));     // QTY

                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 19, 19)); // PEN DAY
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 20, 20)); // BANDOC
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 21, 21)); // REFER
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 22, 22)); // INTERFACE
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 23, 23)); // DAY SEND INTERFACE
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 24, 24)); // PEND_DAYS
                sheet.addMergedRegion(new CellRangeAddress(vj, vj + 1, 25, 25)); // CERROR

                vj += 2; // avanzamos dos filas después del encabezado
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

                    rcell0.setCellValue(listaData.get(vi).strDescStatus);
                    rcell1.setCellValue(listaData.get(vi).COREP);
                    rcell2.setCellValue(listaData.get(vi).descTDOC);
                    rcell3.setCellValue(listaData.get(vi).SAGENT);
                    rcell4.setCellValue(listaData.get(vi).NEGOC);
                    rcell5.setCellValue(listaData.get(vi).SDATE);
                    rcell6.setCellValue(listaData.get(vi).SCARCOD);
                    rcell7.setCellValue(listaData.get(vi).SCARDN);
                    rcell8.setCellValue(listaData.get(vi).SAUTHOC);
                    rcell9.setCellValue(listaData.get(vi).CODEBANK);
                    rcell10.setCellValue(listaData.get(vi).MERCHN);
                    rcell11.setCellValue(listaData.get(vi).FREGLA);
                    rcell12.setCellValue(listaData.get(vi).SCURRENCY);
                    rcell13.setCellValue(listaData.get(vi).SVFOP);
                    rcell14.setCellValue(listaData.get(vi).PAYDATE);
                    rcell15.setCellValue(listaData.get(vi).ACCNUMBER);
                    rcell16.setCellValue(listaData.get(vi).TERMI);
                    rcell17.setCellValue(listaData.get(vi).lngQTYDOC);
                    rcell18.setCellValue(listaData.get(vi).lngQTYTKT);
                    rcell19.setCellValue(listaData.get(vi).PENDINGDAYS);
                    rcell20.setCellValue(listaData.get(vi).BANDOC);
                    rcell21.setCellValue(listaData.get(vi).REFER);
                    rcell22.setCellValue(listaData.get(vi).HEADEA4545);
                    rcell23.setCellValue(listaData.get(vi).DCONTA4545);
                    rcell24.setCellValue(listaData.get(vi).A4545DOCD);
                    rcell25.setCellValue(listaData.get(vi).CERROR);

                    rcell0.setCellStyle(bodyStyle);
                    rcell1.setCellStyle(bodyStyle);
                    rcell2.setCellStyle(bodyStyle);
                    rcell3.setCellStyle(bodyStyle);
                    rcell4.setCellStyle(bodyStyle);
                    rcell5.setCellStyle(bodyStyle);
                    rcell6.setCellStyle(bodyStyle);
                    rcell7.setCellStyle(bodyStyle);
                    rcell8.setCellStyle(bodyStyle);
                    rcell9.setCellStyle(bodyStyle);
                    rcell10.setCellStyle(bodyStyle);
                    rcell11.setCellStyle(bodyStyle);
                    rcell12.setCellStyle(bodyStyle);
                    rcell13.setCellStyle(bodyStyle);
                    rcell14.setCellStyle(bodyStyle);
                    rcell15.setCellStyle(bodyStyle);
                    rcell16.setCellStyle(bodyStyle);
                    rcell17.setCellStyle(bodyStyle);
                    rcell18.setCellStyle(bodyStyle);
                    rcell19.setCellStyle(bodyStyle);
                    rcell20.setCellStyle(bodyStyle);
                    rcell21.setCellStyle(bodyStyle);
                    rcell22.setCellStyle(bodyStyle);
                    rcell23.setCellStyle(bodyStyle);
                    rcell24.setCellStyle(bodyStyle);
                    rcell25.setCellStyle(bodyStyle);

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

                //============================================
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
                workbook.write(response.getOutputStream());
                fos.close();

            } else {
                int len = listaData.size();

                String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

                Integer vi = 0;
                String fileName = "Control_Liquidaciones_" + Functions.getFechaActual() + ".txt";
                File fileA = new File(rutaFile + "\\" + fileName + ".txt");

                if (fileA.exists()) {
                    fileA.delete();
                }

                PrintWriter writer = new PrintWriter(fileA, "UTF-8");
                String headers = "STATUS|PROCESS|DOC.TYPE|AGENT|BUSINESS|SALES_DATE|CODE|"
                        + "CREDIT_CARD_NUMBER|AUTHOR_CODE|CREDIT BANK|MERCHANT_NUMBER|RULE_CONCILIATION|"
                        + "CURR|AMOUNT|PAY_DATE|ACCOUNT|TERMI|SETTL|TKTS|"
                        + "PEN_DAY|BANDOC|REFER|INTERFACE|DAY_SEND_INTERFACE|PEND_DAYS|BPOCOMMENTS";

                writer.println(headers);

                for (vi = 0; vi < len; vi++) {
                    String cadena = "";
                    cadena += listaData.get(vi).strDescStatus + "|";
                    cadena += listaData.get(vi).COREP + "|";
                    cadena += listaData.get(vi).descTDOC + "|";
                    cadena += listaData.get(vi).SAGENT + "|";
                    cadena += listaData.get(vi).NEGOC + "|";
                    cadena += listaData.get(vi).SDATE + "|";
                    cadena += listaData.get(vi).SCARCOD + "|";
                    cadena += listaData.get(vi).SCARDN + "|";
                    cadena += listaData.get(vi).SAUTHOC + "|";
                    cadena += listaData.get(vi).CODEBANK + "|";
                    cadena += listaData.get(vi).MERCHN + "|";
                    cadena += listaData.get(vi).FREGLA + "|";
                    cadena += listaData.get(vi).SCURRENCY + "|";
                    cadena += listaData.get(vi).SVFOP + "|";
                    cadena += listaData.get(vi).PAYDATE + "|";
                    cadena += listaData.get(vi).ACCNUMBER + "|";
                    cadena += listaData.get(vi).TERMI + "|";
                    cadena += listaData.get(vi).lngQTYDOC + "|";
                    cadena += listaData.get(vi).lngQTYTKT + "|";
                    cadena += listaData.get(vi).PENDINGDAYS + "|";
                    cadena += listaData.get(vi).BANDOC + "|";
                    cadena += listaData.get(vi).REFER + "|";
                    cadena += listaData.get(vi).HEADEA4545 + "|";
                    cadena += listaData.get(vi).DCONTA4545 + "|";
                    cadena += listaData.get(vi).A4545DOCD;
                    cadena += listaData.get(vi).CERROR;

                    cadena = cadena.replaceAll("null", "");
                    writer.println(cadena);
                }

                writer.flush();
                writer.close();

                response.setContentType("application/text");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXTicket")
    public @ResponseBody
    void getXLSXTicket(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXTicket");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListTicket(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Agent");
            CH1_2.setCellValue("Sales");
            CH1_3.setCellValue("Credit Card");
            CH1_7.setCellValue("Curr.");
            CH1_8.setCellValue("Amount");
            CH1_9.setCellValue("PNR");
            CH1_10.setCellValue("Ticket");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
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

            CH2_3.setCellValue("Code");
            CH2_4.setCellValue("Number");
            CH2_5.setCellValue("Author.");
            CH2_6.setCellValue("Bank");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
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

            CH3_5.setCellValue("Code");

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

                rcell0.setCellValue(listaData.get(vi).strDescStatus);
                rcell1.setCellValue(listaData.get(vi).SAGENT);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).SCARCOD);
                rcell4.setCellValue(listaData.get(vi).SCARDN);
                rcell5.setCellValue(listaData.get(vi).SAUTHOC);
                rcell6.setCellValue(listaData.get(vi).CODEBANK);
                rcell7.setCellValue(listaData.get(vi).SCURRENCY);
                rcell8.setCellValue(listaData.get(vi).SVFOP);
                rcell9.setCellValue(listaData.get(vi).SPNR);
                rcell10.setCellValue(listaData.get(vi).A1531TKT);
                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue("");
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue("");
            CH1_8_T.setCellValue(listaData.get(0).totSVFOP);
            CH1_9_T.setCellValue("");
            CH1_10_T.setCellValue("");

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
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetCardCodeByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Country");
            CH1_1.setCellValue("Bank");
            CH1_3.setCellValue("Credit Card");
            CH1_5.setCellValue("Quantity");
            CH1_6.setCellValue("Currency");
            CH1_7.setCellValue("Amount");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
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

            CH2_1.setCellValue("Code");
            CH2_2.setCellValue("Description");
            CH2_3.setCellValue("Code");
            CH2_4.setCellValue("Description");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
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

                rcell0.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell1.setCellValue(listaData.get(vi).CODEBANK);
                rcell2.setCellValue(listaData.get(vi).NAMEBANK);
                rcell3.setCellValue(listaData.get(vi).SCARCOD);
                rcell4.setCellValue(listaData.get(vi).strDescCard);
                rcell5.setCellValue(listaData.get(vi).lngQACCB);
                rcell6.setCellValue(listaData.get(vi).SCURRENCY);
                rcell7.setCellValue(listaData.get(vi).SVFOP);
                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue(listaData.get(0).lngTotQACCB);
            CH1_6_T.setCellValue("");
            CH1_7_T.setCellValue(listaData.get(0).dblTotSVFOP);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);

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
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetDayByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Day");
            CH1_1.setCellValue("Quantity");
            CH1_2.setCellValue("Currency");
            CH1_3.setCellValue("Amount");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue(listaData.get(0).lngTotQACCB);
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue(listaData.get(0).dblTotSVFOP);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);

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
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetCardNbrByStval(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
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

            CH1_0.setCellValue("Bank");
            CH1_1.setCellValue("Cc. Code");
            CH1_2.setCellValue("Card Number");
            CH1_3.setCellValue("Author Code");
            CH1_4.setCellValue("Curr.");
            CH1_5.setCellValue("Amount");
            CH1_6.setCellValue("Merchant");
            CH1_7.setCellValue("PNR");
            CH1_8.setCellValue("Agent");
            CH1_9.setCellValue("Business");
            CH1_10.setCellValue("Sales Date");
            CH1_11.setCellValue("Pay. Date");
            CH1_12.setCellValue("Acc. Number");
            CH1_13.setCellValue("Termi");
            CH1_14.setCellValue("ID Poliza");
            CH1_15.setCellValue("Flag Poliza");
            CH1_16.setCellValue("Date Poliza");
            CH1_17.setCellValue("Tkts");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));

            ++vj;
            //============================================

            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//            Cell CH2_9 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//
//            CH2_1.setCellValue("Code");
//            CH2_2.setCellValue("Number");
//            CH2_3.setCellValue("Author.");
//            CH2_6.setCellValue("Merchant");
//            CH2_7.setCellValue("PNR");
//            CH2_8.setCellValue("Agent");
//            CH2_9.setCellValue("Business");
//            CH2_10.setCellValue("ID");
//            CH2_11.setCellValue("Flag");
//            CH2_12.setCellValue("Date");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
//            CH2_9.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
//            ++vj;
            //============================================
            // ======  Nivel 3 ==========
//            Row row3 = sheet.createRow(vj);
//            Cell CH3_0 = row3.createCell(0);
//            Cell CH3_1 = row3.createCell(1);
//            Cell CH3_2 = row3.createCell(2);
//            Cell CH3_3 = row3.createCell(3);
//            Cell CH3_4 = row3.createCell(4);
//            Cell CH3_5 = row3.createCell(5);
//            Cell CH3_6 = row3.createCell(6);
//            Cell CH3_7 = row3.createCell(7);
//            Cell CH3_8 = row3.createCell(8);
//            Cell CH3_9 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//
//            CH3_3.setCellValue("Code");
//
//            CH3_0.setCellStyle(headerStyle);
//            CH3_1.setCellStyle(headerStyle);
//            CH3_2.setCellStyle(headerStyle);
//            CH3_3.setCellStyle(headerStyle);
//            CH3_4.setCellStyle(headerStyle);
//            CH3_5.setCellStyle(headerStyle);
//            CH3_6.setCellStyle(headerStyle);
//            CH3_7.setCellStyle(headerStyle);
//            CH3_8.setCellStyle(headerStyle);
//            CH3_9.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
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

                rcell0.setCellValue(listaData.get(vi).CODEBANK);
                rcell1.setCellValue(listaData.get(vi).SCARCOD);
                rcell2.setCellValue(listaData.get(vi).SCARDN);
                rcell3.setCellValue(listaData.get(vi).SAUTHOC);
                rcell4.setCellValue(listaData.get(vi).SCURRENCY);
                rcell5.setCellValue(listaData.get(vi).SVFOP);
                rcell6.setCellValue(listaData.get(vi).MERCHN);
                rcell7.setCellValue(listaData.get(vi).SPNR);
                rcell8.setCellValue(listaData.get(vi).SAGENT);
                rcell9.setCellValue(listaData.get(vi).NEGOC);
                rcell10.setCellValue(listaData.get(vi).SDATE);
                rcell11.setCellValue(listaData.get(vi).PAYDATE);
                rcell12.setCellValue(listaData.get(vi).ACCNUMBER);
                rcell13.setCellValue(listaData.get(vi).TERMI);
                rcell14.setCellValue(listaData.get(vi).BANDOC);
                rcell15.setCellValue(listaData.get(vi).STCON);
                rcell16.setCellValue(listaData.get(vi).FCONT);
                rcell17.setCellValue(listaData.get(vi).lngQTYTKT);
                iter.next();
                ++vi;
                ++vj;
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

            CH1_0_T.setCellValue("");
            CH1_1_T.setCellValue("");
            CH1_2_T.setCellValue("");
            CH1_3_T.setCellValue("");
            CH1_4_T.setCellValue("");
            CH1_5_T.setCellValue(listaData.get(0).dblTotSVFOP);
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
            CH1_17_T.setCellValue(listaData.get(0).lngTotQTYTKT);

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

    @RequestMapping(value = "searchBeanAMDP_REVERSED")
    public @ResponseBody
    String searchBeanAMDP_REVERSED(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_REVERSED-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_REVERSED(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_REVERSED(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_REVERSED(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanREFND_DETAIL")
    public @ResponseBody
    String searchBeanREFND_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanREFND_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListREFND_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListREFND_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_REFND_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanCHGBAK_DETAIL")
    public @ResponseBody
    String searchBeanCHGBAK_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanCHGBAK_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListCHGBAK_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCHGBAK_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_CHGBAK_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanACREDIT_DETAIL")
    public @ResponseBody
    String searchBeanACREDIT_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanACREDIT_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListACREDIT_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListACREDIT_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_ACREDIT_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/obtainMessages")
    public @ResponseBody
    String obtainMessages(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP05103(filter);

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

    @RequestMapping(value = "/obtainMessagesDT")
    public @ResponseBody
    String obtainMessagesDT(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            logic = new BankReconciliationLogic();
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

    @RequestMapping(value = "/obtainMessagesF")
    public @ResponseBody
    String obtainMessagesF(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lstC = new ArrayList<>(0);
        List<A2290Filter> lstT = new ArrayList<>(0);
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lstC = logic.loadPX269SQP05103F(filter);
//            lstT = logic.loadPX269SQP05103T(filter);

            map.put("success", true);
            System.out.println("Total : " + lstC.size());
            System.out.println("Total : " + lstT.size());
            map.put("dataC", lstC);
            map.put("dataT", lstT);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN")
    public @ResponseBody String searchBeanAMDP_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_SCAN-------------");

        try {
            List<A2290Filter> lst = this.getListAMDP_SCAN(request, false);
            
            map.put("success", true);
            map.put("excede", false); // <= 500: No excede
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
            
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().startsWith("EXCEDE_LIMITE")) {
                String[] partes = e.getMessage().split("\\|");
                String totalRegistros = partes.length > 1 ? partes[1] : "+500";
                
                map.put("success", true);
                map.put("excede", true); // > 500: Excede
                map.put("count", totalRegistros);
                map.put("data", new ArrayList<>()); 
            } else {
                map.put("success", false);
                map.put("Mensaje", "Ocurrió un error en el servidor al buscar.");
                e.printStackTrace();
            }
        }
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN(HttpServletRequest request, Boolean bExcel) throws Exception {
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
            // Dejamos subir el error de límite
            if (e.getMessage() != null && e.getMessage().startsWith("EXCEDE_LIMITE")) {
                throw e; 
            }
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN_PENDING")
    public @ResponseBody
    String searchBeanAMDP_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_SCAN_PENDING-------------");

        try {
            List<A2290Filter> lst = this.getListAMDP_SCAN_PENDING(request, false);

            map.put("success", true);
            map.put("excede", false);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);

        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().startsWith("EXCEDE_LIMITE")) {
                String[] partes = e.getMessage().split("\\|");
                String totalRegistros = partes.length > 1 ? partes[1] : "+500";

                map.put("success", true);
                map.put("excede", true);
                map.put("count", totalRegistros);
                map.put("data", new ArrayList<>()); 
            } else {
                map.put("success", false);
                map.put("Mensaje", "Ocurrió un error en el servidor al buscar pendientes.");
                e.printStackTrace();
            }
        }
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) throws Exception {
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
            if (e.getMessage() != null && e.getMessage().startsWith("EXCEDE_LIMITE")) {
                throw e;
            }
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanTicketAgent")
    public @ResponseBody
    String searchBeanTicketAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanTicketAgent-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListBeanTicketAgent(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListBeanTicketAgent(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPXBeanTicketAgent(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    ////EXCEL POR TICKETSCAN
    /////
    @RequestMapping(value = "getXLSXScan")
    public @ResponseBody
    void getXLSXScan(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXScan");
        A2290Filter filter = new A2290Filter();
        String fileNameDownload = String.format("Report Tickets Scan - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = logic.loadPXBeanTicketAgent(filter);
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

            CH1_0.setCellValue("STATUS");
            CH1_1.setCellValue("DOC TYPE");
            CH1_2.setCellValue("AGENT");
            CH1_3.setCellValue("CONSOL");
            CH1_4.setCellValue("SALES DATE");
            CH1_5.setCellValue("F. PAYMENT");
            CH1_6.setCellValue("COUNTRY");
            CH1_7.setCellValue("TICKET");
            CH1_8.setCellValue("CURRENCY");
            CH1_9.setCellValue("AMOUNT");
            CH1_10.setCellValue("INVOICE");
            CH1_11.setCellValue("SOURCE");
            CH1_12.setCellValue("PAYMENT TYPE");

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

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
                Cell rcel20 = row1.createCell(10);
                Cell rcel21 = row1.createCell(11);
                Cell rcel22 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).STVAL);
                rcell1.setCellValue(listaData.get(vi).descTDOC);
                rcell2.setCellValue(listaData.get(vi).SAGENT);
                rcell3.setCellValue(listaData.get(vi).SCONSOL);
                rcell4.setCellValue(listaData.get(vi).SDATE);
                rcell5.setCellValue(listaData.get(vi).MCLOS);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).TKT);
                rcell8.setCellValue(listaData.get(vi).SCURRENCY);
                rcell9.setCellValue(listaData.get(vi).SVFOPNETR);
                rcel20.setCellValue(listaData.get(vi).INVOICE);
                rcel21.setCellValue(listaData.get(vi).CFUENTE);
                rcel22.setCellValue(listaData.get(vi).SPAYMENT);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
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
    
     @RequestMapping(value = "getXLSXScanSearch")
    public @ResponseBody
    void getXLSXScanSearch(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXScan");
        MPF100Filter filter = new MPF100Filter();
        String fileNameDownload = String.format("Report Tickets Scan - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<MPF100Filter> listaData = logic.loadMPS306_AMDP_SCANCASH(filter);
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

            CH1_0.setCellValue("STATUS");
            CH1_1.setCellValue("DOC TYPE");
            CH1_2.setCellValue("AGENT");
            CH1_3.setCellValue("CONSOL");
            CH1_4.setCellValue("SALES DATE");
            CH1_5.setCellValue("F. PAYMENT");
            CH1_6.setCellValue("COUNTRY");
            CH1_7.setCellValue("TICKET");
            CH1_8.setCellValue("CURRENCY");
            CH1_9.setCellValue("AMOUNT");
            CH1_10.setCellValue("INVOICE");
            CH1_11.setCellValue("SOURCE");
            CH1_12.setCellValue("PAYMENT TYPE");
            
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

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
                Cell rcel20 = row1.createCell(10);
                Cell rcel21 = row1.createCell(11);
                Cell rcel22 = row1.createCell(12);

                rcell0.setCellValue(listaData.get(vi).STVAL);
                rcell1.setCellValue(listaData.get(vi).descTDOC);
                rcell2.setCellValue(listaData.get(vi).SAGENT);
                rcell3.setCellValue(listaData.get(vi).SCONSOL);
                rcell4.setCellValue(listaData.get(vi).SDATE);
                rcell5.setCellValue(listaData.get(vi).MCLOS);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).TKT);
                rcell8.setCellValue(listaData.get(vi).SCURRENCY);
                rcell9.setCellValue(listaData.get(vi).SVFOPNETR);
                rcel20.setCellValue(listaData.get(vi).INVOICE);
                rcel21.setCellValue(listaData.get(vi).CFUENTE);
                rcel22.setCellValue(listaData.get(vi).SPAYMENT);
                

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
           
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
    
    //////////////
    ////////////////
    @RequestMapping(value = "searchBeanDebits_SCAN_PENDING")
    public @ResponseBody
    String searchBeanDebits_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanDebits_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBean_SCAN_PENDING_CHGBAK")
    public @ResponseBody
    String searchBean_SCAN_PENDING_CHGBAK(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBean_SCAN_PENDING_CHGBAK-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING_CHGBAK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING_CHGBAK(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING_CHGBAK(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBean_SCAN_PENDING_ACREDIT")
    public @ResponseBody
    String searchBean_SCAN_PENDING_ACREDIT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBean_SCAN_PENDING_ACREDIT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING_ACREDIT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING_ACREDIT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING_ACREDIT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeantTktTW_SCAN_PENDING")
    public @ResponseBody
    String searchBeantTktTW_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListTktTW_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTktTW_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_TktTw_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN")
    public @ResponseBody
    String searchBeanDebits_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanDebits_SCAN-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN_CHGBAK")
    public @ResponseBody
    String searchBeanDebits_SCAN_CHGBAK(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanDebits_SCAN_CHGBAK-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_CHGBAK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_CHGBAK(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_CHGBAK(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN_ACREDIT")
    public @ResponseBody
    String searchBeanDebits_SCAN_ACREDIT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanDebits_SCAN_ACREDIT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_ACREDIT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_ACREDIT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_ACREDIT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDebits")
    public @ResponseBody
    String searchDebits(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDebits-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX263SQP00652DEBITS(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchDetCountryByStval_DEBITS")
    public @ResponseBody
    String searchDetCountryByStval_DEBITS(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_DEBITS(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetByStval_DEBITS")
    public @ResponseBody
    String searchDetByStval_DEBITS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_DEBITS(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
//                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
//                map.put("lstError", listaError);
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

    @RequestMapping(value = "obtainFields")
    public @ResponseBody
    String obtainFields(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : obtainFields");

        logic = new BankReconciliationLogic();
        List<A1248> lstData = new ArrayList<A1248>(0);

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            lstData = logic.loadSQP03739(tabla);

            map.put("success", true);
            map.put("lstData", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "listPendingAmounts")
    public @ResponseBody
    String listPendingAmounts(HttpServletRequest request) {
        System.out.println("-------------- bankreconci : listPendingAmounts -------------");
        ModelMap map = new ModelMap();
        Gson gson = new Gson();

        try {
            String adate = request.getParameter("adate");

            System.out.println("Buscando pendientes menores a: " + adate);
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> lst = logic.getPendingAmountsIndia(adate);
            map.put("success", true);
            map.put("data", lst);
            map.put("total", lst.size());

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", e.getMessage());
        }

        return gson.toJson(map);
    }

//    @RequestMapping(value = "searchTeleworking")
//    public @ResponseBody
//    String searchTeleworking(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- BankReconciliation : searchTeleworking-------------");
//
//        map.put("success", true);
//        List<A2290Filter> lst = this.getListTeleworking(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//    }
//
//    public List<A2290Filter> getListTeleworking(HttpServletRequest request, Boolean bExcel) {
    @RequestMapping(value = "/loadExcelFile", method = RequestMethod.POST)
    public @ResponseBody
    String loadExcelFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Gson gson = new Gson();
        Integer cont = 0;
        A2290Filter objResult = new A2290Filter();
        A2290Filter filter = new A2290Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();
            String beanString = request.getParameter("beanString");

            filter = gson.fromJson(beanString, A2290Filter.class);
            byte[] dataFile = excelfile.getBytes();
            objResult = getExcelFile(dataFile, filter);

            map.put("success", true);
            map.put("objResult", objResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private A2290Filter getExcelFile(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new BankReconciliationLogic();
        List<A2290Filter> lstDataIngreso = new ArrayList<>();
        List<A2290Filter> lstDataVenta = new ArrayList<>();
        List<A2290Filter> lstDataNotFound = new ArrayList<>();
        List<A2290Filter> lstData = new ArrayList<>();
        A2290Filter respt = new A2290Filter();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String ruta = "D:";
        double neto = 0;
//        boolean isDiff = false;
        String mensaje = "Hubo un error al actualizar los pagos", strHora = Functions.getHoraActual();
        String mensajePost = "";
        double montoTotal = 0;
        int i = 0;
        int qty = 0;

        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "SalesDocumentLoad.xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            Row row0 = rowIterator.next();

            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();
                    if (row.getRowNum() > 0) {
                        A2290Filter obj = new A2290Filter();

                        obj.TKT = formatter.formatCellValue(row.getCell(2)) == null ? "" : formatter.formatCellValue(row.getCell(2)).trim();
                        obj.SCARDN = formatter.formatCellValue(row.getCell(6)) == null ? "" : formatter.formatCellValue(row.getCell(6)).trim();
                        obj.SAUTHOC = formatter.formatCellValue(row.getCell(7)) == null ? "" : formatter.formatCellValue(row.getCell(7)).trim();

                        if (obj.TKT.equals("") && obj.SCARDN.equals("") && obj.SAUTHOC.equals("")) {
                            break;
                        }
                        if (obj.TKT.contains("IF") || obj.TKT.contains("(") || obj.TKT.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        if (obj.SCARDN.contains("IF") || obj.SCARDN.contains("(") || obj.SCARDN.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        if (obj.SAUTHOC.contains("IF") || obj.SAUTHOC.contains("(") || obj.SAUTHOC.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        qty++;
                        lstData.add(obj);
                    }
                }
                file.close();
            } catch (Exception e) {
                e.getMessage();
                if (e.getMessage().contains("String index out of range")) {
                    mensajePost = "";
                } else {
                    mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                }
            }

            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());

            respt = logic.massiveReverseADM(lstData, user);
//            respt.MESSAGE = mensaje;

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return respt;

    }

    @RequestMapping(value = "/searchTeleworking")
    public @ResponseBody
    String searchTeleworking(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- BankReconciliation : searchTeleworking-------------");

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String Freasign = request.getParameter("Freasign");
            String Freasiga = request.getParameter("Freasiga");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQPMPF100(filter);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, lst);
//                map.put("nameExcel", nameExcel);
            } else {

                map.put("success", true);
                map.put("data", lst);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }

//    @RequestMapping(value = "searchMPF101Teleworking")
//    public @ResponseBody
//    String searchMPF101Teleworking(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- BankReconciliation : searchMPF101Teleworking-------------");
//
//        map.put("success", true);
//        List<A2290Filter> lst = this.getListMPF101Teleworking(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//    }
//
//    public List<A2290Filter> getListMPF101Teleworking(HttpServletRequest request, Boolean bExcel) {
    @RequestMapping(value = "searchMPF101Teleworking")
    public @ResponseBody
    String searchMPF101Teleworking(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- BankReconciliation : searchMPF101Teleworking-------------");
        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String Freasign = request.getParameter("Freasign");
            String Freasiga = request.getParameter("Freasiga");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQP00871JT(filter);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, lst);
//                map.put("nameExcel", nameExcel);
            } else {

                map.put("success", true);
                map.put("data", lst);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "getOperadores")
    public @ResponseBody
    String getOperadores(String ccust) {
        List<A1248> lista = new ArrayList<A1248>();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadOperadores();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "getAuditores")
    public @ResponseBody
    String getAuditores(String ccust) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadAuditores();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "getUserInfo")
    public @ResponseBody
    String getUserInfo(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : getUserInfo");

        logic = new BankReconciliationLogic();
        INF020 objINF020 = new INF020();

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            objINF020 = logic.loadUserInfo();

            map.put("success", true);
            map.put("objINF020", objINF020);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "asginarTW")
    public @ResponseBody
    String asginarTW(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : asginarTW-------------");

        logic = new BankReconciliationLogic();
        String msj = "";
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.asginarTW(filter);

            map.put("success", true);
            map.put("mensaje", msj);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getIatas")
    public @ResponseBody
    String getIatas(HttpServletRequest request) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            String fecha = request.getParameter("sdate");
            lista = logic.loadgetIatas(fecha);
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "searchDetalle2")
    public @ResponseBody
    String searchDetalle2(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetalle-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalle2(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetalle2(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698Detalle2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSXDetalle2")
    public @ResponseBody
    void getXLSXDetalle2(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetalle2");
        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2290Filter> listaData = this.getListDetalle2(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            if (listaData.size() < 65000) {
                workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Report");
                XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
                DataFormat dataFormat = workbook.createDataFormat();
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
                XSSFCellStyle amountStyleBody = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle amountStyleTotal = (XSSFCellStyle) workbook.createCellStyle();
                amountStyleBody.cloneStyleFrom(bodyStyle);
                amountStyleBody.setDataFormat(dataFormat.getFormat("#,##0.00"));
                amountStyleTotal.cloneStyleFrom(headerStyle);
                amountStyleTotal.setDataFormat(dataFormat.getFormat("#,##0.00"));
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

                CH1_0.setCellValue("STATUS");
                CH1_1.setCellValue("PROCESS");
                CH1_2.setCellValue("TDOC");
                CH1_3.setCellValue("SAGENT");
                CH1_4.setCellValue("NEGOC");
                CH1_5.setCellValue("SDATE");
                CH1_6.setCellValue("SCARCOD");
                CH1_7.setCellValue("SCARDN");
                CH1_8.setCellValue("SAUTHOC");
                CH1_9.setCellValue("CODEBANK");
                CH1_10.setCellValue("SMERCH");
                CH1_11.setCellValue("SCURRENCY");
                CH1_12.setCellValue("SVFOP");
                CH1_13.setCellValue("PAYDATE");
                CH1_14.setCellValue("TERMI");
                CH1_15.setCellValue("BANDOC");
                CH1_16.setCellValue("STCON");
                CH1_17.setCellValue("FCONT");
                CH1_18.setCellValue("RCONCILIATION");
                CH1_19.setCellValue("BANDOC");
                CH1_20.setCellValue("REFERENCE");
                CH1_21.setCellValue("INTERFACE");
                CH1_22.setCellValue("DSENDINTERFACE");

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
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
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

                    rcell0.setCellValue(listaData.get(vi).strDescStatus);
                    rcell1.setCellValue(listaData.get(vi).COREP);
                    rcell2.setCellValue(listaData.get(vi).descTDOC);
                    rcell3.setCellValue(listaData.get(vi).SAGENT);
                    rcell4.setCellValue(listaData.get(vi).NEGOC);
                    rcell5.setCellValue(listaData.get(vi).SDATE);
                    rcell6.setCellValue(listaData.get(vi).SCARCOD);
                    rcell7.setCellValue(listaData.get(vi).SCARDN);
                    rcell8.setCellValue(listaData.get(vi).SAUTHOC);
                    rcell9.setCellValue(listaData.get(vi).CODEBANK);
                    rcell10.setCellValue(listaData.get(vi).MERCHN);
                    rcell11.setCellValue(listaData.get(vi).SCURRENCY);
                    rcell12.setCellValue(listaData.get(vi).SVFOP);
                    rcell13.setCellValue(listaData.get(vi).PAYDATE);
                    rcell14.setCellValue(listaData.get(vi).TERMI);
                    rcell15.setCellValue(listaData.get(vi).BANDOC);
                    rcell16.setCellValue(listaData.get(vi).STCON);
                    rcell17.setCellValue(listaData.get(vi).FCONT);
                    rcell18.setCellValue(listaData.get(vi).FREGLA);
                    rcell19.setCellValue(listaData.get(vi).BANDOC);
                    rcell20.setCellValue(listaData.get(vi).REFER);
                    rcell21.setCellValue(listaData.get(vi).USERA4545);
                    rcell22.setCellValue(listaData.get(vi).DCONTA4545);

                    rcell0.setCellStyle(bodyStyle);
                    rcell1.setCellStyle(bodyStyle);
                    rcell2.setCellStyle(bodyStyle);
                    rcell3.setCellStyle(bodyStyle);
                    rcell4.setCellStyle(bodyStyle);
                    rcell5.setCellStyle(bodyStyle);
                    rcell6.setCellStyle(bodyStyle);
                    rcell7.setCellStyle(bodyStyle);
                    rcell8.setCellStyle(bodyStyle);
                    rcell9.setCellStyle(bodyStyle);
                    rcell10.setCellStyle(bodyStyle);
                    rcell11.setCellStyle(bodyStyle);
                    rcell12.setCellStyle(bodyStyle);
                    rcell13.setCellStyle(bodyStyle);
                    rcell14.setCellStyle(bodyStyle);
                    rcell15.setCellStyle(bodyStyle);
                    rcell16.setCellStyle(bodyStyle);
                    rcell17.setCellStyle(bodyStyle);
                    rcell18.setCellStyle(bodyStyle);
                    rcell19.setCellStyle(bodyStyle);
                    rcell20.setCellStyle(bodyStyle);
                    rcell21.setCellStyle(bodyStyle);
                    rcell22.setCellStyle(bodyStyle);

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

                //============================================
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
                workbook.write(response.getOutputStream());
                fos.close();

            } else {
                int len = listaData.size();

                String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

                Integer vi = 0;
                String fileName = "Control_Liquidaciones_" + Functions.getFechaActual() + ".txt";
                File fileA = new File(rutaFile + "\\" + fileName + ".txt");

                if (fileA.exists()) {
                    fileA.delete();
                }

                PrintWriter writer = new PrintWriter(fileA, "UTF-8");
                String cadena;
                cadena = "STATUS|PROCESS|TDOC|SAGENT|NEGOC|SDATE|SCARCOD|SCARDN|SAUTHOC|CODEBANK|SMERCH|SCURRENCY|SVFOP|PAYDATE|TERMI|BANDOC|STCON|FCONT|RCONCILIATION|BANDOC|REFERENCE|INTERFACE|DSENDINTERFACE";
                writer.println("" + cadena);

                for (vi = 0; vi < len; vi++) {
                    cadena = "";
                    cadena += "" + listaData.get(vi).strDescStatus + "|";
                    cadena += "" + listaData.get(vi).COREP + "|";
                    cadena += "" + listaData.get(vi).descTDOC + "|";
                    cadena += "" + listaData.get(vi).SAGENT + "|";
                    cadena += "" + listaData.get(vi).NEGOC + "|";
                    cadena += "" + listaData.get(vi).SDATE + "|";
                    cadena += "" + listaData.get(vi).SCARCOD + "|";
                    cadena += "" + listaData.get(vi).SCARDN + "|";
                    cadena += "" + listaData.get(vi).SAUTHOC + "|";
                    cadena += "" + listaData.get(vi).CODEBANK + "|";
                    cadena += "" + listaData.get(vi).MERCHN + "|";
                    cadena += "" + listaData.get(vi).SCURRENCY + "|";
                    cadena += "" + listaData.get(vi).SVFOP + "|";
                    cadena += "" + listaData.get(vi).PAYDATE + "|";
                    cadena += "" + listaData.get(vi).TERMI + "|";
                    cadena += "" + listaData.get(vi).BANDOC + "|";
                    cadena += "" + listaData.get(vi).STCON + "|";
                    cadena += "" + listaData.get(vi).FCONT + "|";
                    cadena += "" + listaData.get(vi).FREGLA + "|";
                    cadena += "" + listaData.get(vi).BANDOC + "|";
                    cadena += "" + listaData.get(vi).REFER + "|";
                    cadena += "" + listaData.get(vi).USERA4545 + "|";

                    cadena += "" + listaData.get(vi).DCONTA4545;
                    cadena = cadena.replaceAll("null", "");
                    writer.println("" + cadena);
                }

                writer.flush();
                writer.close();

                response.setContentType("application/text");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    /*bpo REVISION*/
    @RequestMapping(value = "updateCERROR_BPO_revision")
    public @ResponseBody
    String updateCERROR_BPO_revision(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : updateCERROR_BPO_revision-------------");
        map.put("success", true);

        A2290Filter objmpf101 = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "", mensaje = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            /*Capturo objeto enviado desde ajax*/
            beanString = request.getParameter("beanString");
            objmpf101 = gson.fromJson(beanString, A2290Filter.class);

            UserView user = this.serverSession.getServerSession().getUserView();
            mensaje = logic.loadPX598update_cerror_conci(objmpf101, user);

            map.put("mensaje", mensaje);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    /* New Locura */
    @RequestMapping(value = "searchMainCash")
    public @ResponseBody
    String searchMainCash(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchMainCash-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListMainCash(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListMainCash(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698MainCash(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchCountryCash")
    public @ResponseBody
    String searchCountryCash(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchCountry-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListCountryCash(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCountryCash(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698CountryCash(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    //////////////////////////////mpf199
    ///////////////////////////////////////////////////
    @RequestMapping(value = "searchListMPF199")
    public @ResponseBody
    String searchListMPF199(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- bankreconci :searchListMPF199-------------");
        map.put("success", true);
        List<A2290Filter> lst = this.getListMPF199(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListMPF199(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadLISTAR_MPF199(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    // LISTA MPF223 (AJUSTES)
    @RequestMapping(value = "searchListMPF223")
    public @ResponseBody
    String searchListMPF223(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- bankreconci :searchListMPF223-------------");
        map.put("success", true);
        List<A2290Filter> lst = this.getListMPF223(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListMPF223(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadLISTAR_MPF223(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    /////////////////////////////////////////////////////////
    //////////     LISTA CARTERA  DETALLE FACTURAS    ///////////////////
    //////////////////////////////////////////////////
    @RequestMapping(value = "searchListCartera")
    public @ResponseBody
    String searchListCartera(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- banckreconci :searchListCartera-------------");
        map.put("success", true);
        List<A2290Filter> lst = this.getListCarteraMPF199(request, false);
        System.out.println("Total : " + lst.size());
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCarteraMPF199(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
//        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_STATUS = request.getParameter("IN_STATUS") != null ? request.getParameter("IN_STATUS") : "";
            filter.IN_ADATE_FROM = request.getParameter("IN_ADATE_FROM") != null ? request.getParameter("IN_ADATE_FROM") : "";
            filter.IN_ADATE_TO = request.getParameter("IN_ADATE_TO") != null ? request.getParameter("IN_ADATE_TO") : "";
            filter.IN_INVOICE = request.getParameter("IN_INVOICE");
            filter.IN_FUENTE = request.getParameter("IN_FUENTE");

            System.out.println("STATUS = " + filter.IN_STATUS);
            System.out.println("FROM   = " + filter.IN_ADATE_FROM);
            System.out.println("TO     = " + filter.IN_ADATE_TO);
            System.out.println("INVOICE     = " + filter.IN_INVOICE);
            System.out.println("INVOICE     = " + filter.IN_FUENTE);

            lst = logic.loadLISTAR_CARTERAMPF199(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    ////UPDATE DATAENTRYMPF199
    @RequestMapping(value = "MaintenanceMPF199")
    public @ResponseBody
    String MaintenanceMPF116(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATIONDATAENTRY : MaintenanceMPF199-------------");
//        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.MPF199Update(filter);

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

    /// INSERT MPF199
    //////////////////
    @RequestMapping(value = "MaintenanceMPF199insert")
    public @ResponseBody
    String MaintenanceMPF199insert(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATIONDATAENTRY : MaintenanceMPF199insert-------------");
//        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.MPF199Insert(filter);

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

    @RequestMapping(value = "MaintenanceMPF199insertArgentina")
    public @ResponseBody
    String MaintenanceMPF199insertArgentina(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATIONDATAENTRY : MaintenanceMPF199insertArgentina-------------");
//        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.MPF199InsertArgentina(filter);

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

    @RequestMapping(value = "MaintenanceMPF199insertIndia")
    public @ResponseBody
    String MaintenanceMPF199insertIndia(HttpServletRequest request) {
        ModelMap map = new ModelMap();
        Gson gson = new Gson();

        try {
            String beanString = request.getParameter("beanString");
            A2290Filter bean = gson.fromJson(beanString, A2290Filter.class);
            if (bean.listaDetalles == null || bean.listaDetalles.isEmpty()) {
                throw new Exception("No hay registros seleccionados en la lista.");
            }
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            String msg = logic.executeIndiaConciliationBatch(bean);

            map.put("success", true);
            map.put("Mensaje", msg);

        } catch (Exception e) {
            map.put("success", false);
            map.put("Mensaje", e.getMessage());
        }
        return gson.toJson(map);
    }

    @RequestMapping(value = "conciliacionFaseDos")
    public @ResponseBody
    String conciliacionFaseDos(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATION : conciliacionFaseDos (FINAL) -------------");

        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            String tipoConciliacion = filter.tipo;

            // 3. TU LÓGICA
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.processFaseDosConciliation(tipoConciliacion);

            map.put("success", true);
            map.put("Mensaje", msj);

        } catch (Exception ex) {
            ex.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return gson.toJson(map);
    }

    ///////////////////////////////////7
    @RequestMapping(value = "ConciliationAdjust")
    public @ResponseBody
    String ConciliationAdjust(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATIONDATAENTRY : MaintenanceMPF199-------------");
//        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.ConciliacionAdjust(filter);

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

    @RequestMapping(value = "ConciliationAddAdjust")
    public @ResponseBody
    String ConciliationAddAdjust(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BANKRECONCILIATIONDATAENTRY : ConciliationAddAdjust-------------");
//        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.ConciliationAddAdjust(filter);

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

    ///    ///
    @RequestMapping(value = "searchDayCash")
    public @ResponseBody
    String searchDayCash(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDay-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDayCash(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDayCash(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698DayCash(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetalleCash")
    public @ResponseBody
    String searchDetalleCash(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchDetalle-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalleCash(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetalleCash(HttpServletRequest request, Boolean bExcel) {

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

            lst = logic.loadPX269SQP00698DetalleCash(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDPCash")
    public @ResponseBody
    String searchBeanAMDPCash(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDPCash-------------");
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
            result = logic.loadPX269SQPXXXCash(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanAMDP_DETAILCASH")
    public @ResponseBody
    String searchBeanAMDP_DETAILCASH(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : searchBeanAMDP_DETAILCASH-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_DETAILCASH(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_DETAILCASH(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_DETAILCASH(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    //FASE 2 
    @RequestMapping(value = "searchBeanAMDP_SCANCASH")
    public @ResponseBody
    String searchBeanAMDP_SCANCASH(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : getListAMDP_SCANCASH-------------");

        map.put("success", true);
        List<MPF100Filter> lst = this.getListAMDP_SCANCASH(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100Filter> getListAMDP_SCANCASH(HttpServletRequest request, Boolean bExcel) {

        List<MPF100Filter> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

            lst = logic.loadMPS306_AMDP_SCANCASH(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/ManualConciliacionCash", method = RequestMethod.POST)
    @ResponseBody
    public String ManualConciliacionCash(@RequestBody MPF100Filter filter) {
        System.out.println("-------------- BankReconciliation : ManualConciliacionCash -------------");

        ModelMap map = new ModelMap();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            logic.ConciliationManualCash(filter);

            map.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "Error al procesar la conciliación: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/CloseTransactionCash", method = RequestMethod.POST)
    @ResponseBody
    public String CloseTransactionCash(@RequestBody MPF100Filter filter) {
        System.out.println("-------------- BankReconciliation : ManualConciliacionCash -------------");
        String msj = "";
        ModelMap map = new ModelMap();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.CloseTransactionCash(filter);

            map.put("success", true);
            map.put("message", msj);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "Error al procesar la conciliación: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/AssignCashComment", method = RequestMethod.POST)
    @ResponseBody
    public String AssignCashComment(@RequestBody MPF100Filter filter) {
        System.out.println("-------------- BankReconciliation : ManualConciliacionCash -------------");

        ModelMap map = new ModelMap();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            logic.AssignCashComment(filter);

            map.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("message", "Error al procesar la conciliación: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

//ELEGIR DESCARGA DE INSUMO SEGUN FUENTE   
    @RequestMapping(value = "getCSV")
    public @ResponseBody
    void getCSV(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getCSV");

        String country = request.getParameter("country");
        String date = request.getParameter("date");
        String fuente = request.getParameter("fuente");
        String dateArc = request.getParameter("dateArc");
        String ccust = request.getParameter("ccust");
        String cycle = request.getParameter("cycle");

        if (country == null || date == null || country.isEmpty() || date.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Parámetros 'country' y 'date' son obligatorios");
            return;
        }

        String ruta = this.serverSession.propertySession.get("DB_SERVER_DEFAULT_TYPE").toString();
        String rutaCarpeta;

        if ("ATT".equals(ruta)) {
            rutaCarpeta = "test";
        } else if ("DEV".equals(ruta)) {
            rutaCarpeta = "dev";
        } else if ("PRO".equals(ruta)) {
            rutaCarpeta = "prod";
        } else {
            rutaCarpeta = "";
        }

        System.out.println("esta es mi ruta " + ruta);

        // Determinar carpeta y extensión según fuente
        String carpetaInsumo = "";
        String extension = "";
        String rutaFolder = "";
        if ("A".equals(fuente)) {
            carpetaInsumo = "ARC-IMG";
            extension = "*.png";
        } else if ("B".equals(fuente)) {
            carpetaInsumo = "BSP";
            extension = "*.csv";
        } else if ("I".equals(fuente)) {
            carpetaInsumo = "ICCS";
            extension = "*.csv";
        }

        if (fuente.equals("I")) {
            rutaFolder = "\\\\10.0.0.87\\av\\Efectivo\\"
                    + rutaCarpeta + "\\process\\"
                    + carpetaInsumo + "\\2025\\"
                    + ccust;

        } else {
            rutaFolder = "\\\\10.0.0.87\\av\\Efectivo\\"
                    + rutaCarpeta + "\\process\\"
                    + carpetaInsumo + "\\"
                    + country + "\\2025";
        }
        Path folderPath = Paths.get(rutaFolder);

        System.out.println("Buscando archivos en: " + folderPath);

        Path matchedFile = null;

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath, extension)) {

            for (Path path : stream) {
                String fileName = path.getFileName().toString();

                if ("B".equals(fuente)) {
                    // BSP: CO*20250731*.csv
                    if (fileName.startsWith(country) && fileName.contains(date)) {
                        matchedFile = path;
                        break;
                    }
                } else if ("A".equals(fuente)) {
                    // ARC: 202_ARC8000227120250803_LOADED.png
                    if (fileName.startsWith(ccust) && fileName.contains(dateArc)) {
                        matchedFile = path;
                        break;
                    }
                } else if ("I".equals(fuente)) {
                    // ARC: 202_ARC8000227120250803_LOADED.png
                    if (fileName.startsWith(cycle)) {
                        matchedFile = path;
                        break;
                    }
                }
            }

        } catch (IOException ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error al acceder a la carpeta de archivos");
            return;
        }

        if (matchedFile == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No se encontró archivo para los parámetros enviados");
            return;
        }

        System.out.println("Archivo encontrado: " + matchedFile);

        // Content type correcto
        if ("A".equals(fuente)) {
            response.setContentType("image/png"); // ARC TXT
        } else {
            response.setContentType("text/csv");   // BSP CSV
        }

        response.setHeader("Content-Disposition",
                "attachment; filename=\"" + matchedFile.getFileName().toString() + "\"");

        try (FileInputStream fis = new FileInputStream(matchedFile.toFile()); OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }

            out.flush();
        }
    }

    //EXCEL DE MPF199
    @RequestMapping(value = "panelGridDataMPF199")
    public @ResponseBody
    void panelGridDataMPF199(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : panelGridDataMPF199");
        A2290Filter filter = new A2290Filter();
        String fileNameDownload = String.format("Report Pending Payment - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            BankReconciliationLogic logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = logic.loadLISTAR_MPF199(filter);
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

            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Value Date");
            CH1_2.setCellValue("Concept");
            CH1_3.setCellValue("Type Adjusment");
            CH1_4.setCellValue("Agent");
            CH1_5.setCellValue("Consol");
            CH1_6.setCellValue("Currency");
            CH1_7.setCellValue("Neto");
            CH1_8.setCellValue("Issue Payment");
            CH1_9.setCellValue("Start Date");
            CH1_10.setCellValue("End Date");
            CH1_11.setCellValue("Reference");

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

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            ++vj;
            //============================================

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
                Cell rcel20 = row1.createCell(10);
                Cell rcel21 = row1.createCell(11);

                String status = listaData.get(vi).O_STVAL;
                switch (status) {
                    case "3":
                        status = "Pending";
                        break;
                    default:
                        status = "Match";
                }
                rcell0.setCellValue(status);
                rcell1.setCellValue(listaData.get(vi).O_ADATE);

                String concept = (listaData.get(vi).O_CONCEPT != null) ? listaData.get(vi).O_CONCEPT.trim() : "";
                switch (concept) {
                    case "P":
                        concept = "Positive";
                        break;
                    case "N":
                        concept = "Negative";
                        break;
                    case "X":
                        concept = "No Billing";
                        break;
                    case "A":
                        concept = "Adjusment";
                        break;
                    case "M":
                        concept = "Automatic";
                        break;
                    case "C":
                        concept = "Compensantion";
                        break;
                    default:
                        concept = "";
                }
                rcell2.setCellValue(concept);

                String tadj = (listaData.get(vi).O_TADJ != null) ? listaData.get(vi).O_TADJ.trim() : "";
                switch (tadj) {
                    case "N":
                        tadj = "NON-REMITTANCE";
                        break;
                    case "R":
                        tadj = "RECOVERY";
                        break;
                    case "U":
                        tadj = "UNCLEARED";
                        break;
                    case "E":
                        tadj = "EXCESS";
                        break;
                    case "S":
                        tadj = "SHORT";
                        break;
                    default:
                        tadj = "OTROS";
                }
                rcell3.setCellValue(tadj);
                rcell4.setCellValue(listaData.get(vi).O_SAGENT);
                rcell5.setCellValue(listaData.get(vi).O_SCONSOL);
                rcell6.setCellValue(listaData.get(vi).O_SCURRENCY);
                rcell7.setCellValue(listaData.get(vi).O_NETO);
                rcell8.setCellValue(listaData.get(vi).O_PAYAMOU);
                rcell9.setCellValue(listaData.get(vi).O_STRDATE);
                rcel20.setCellValue(listaData.get(vi).O_ENDDATE);
                rcel21.setCellValue(listaData.get(vi).O_REFERENCE);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
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

    // Excel de Cash
    // Excel de Cash
    @RequestMapping(value = "getXLSXDetMainCash")
    public @ResponseBody
    void getXLSXMainCash(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetMainCash");
        String fileNameDownload = "Bank_Reconciliation_Report_" + Functions.getFechaActual() + ".xls";

        try {
            HSSFWorkbook workbook = new HSSFWorkbook();
            HSSFSheet sheet = workbook.createSheet("Report");
            List<A2290Filter> listaData = Optional.ofNullable(this.getListMainCash(request, true))
                    .orElse(Collections.emptyList());
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            // ======= ESTILOS Y FORMATOS =======
            HSSFFont headerFont = workbook.createFont();
            headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            headerFont.setColor(HSSFColor.WHITE.index);
            HSSFFont subHeaderFont = workbook.createFont();
            subHeaderFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            HSSFFont totalFont = workbook.createFont();
            totalFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

            HSSFCellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(HSSFColor.BLUE_GREY.index);
            headerStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
            headerStyle.setFont(headerFont);

            HSSFCellStyle subHeaderStyle = workbook.createCellStyle();
            subHeaderStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            subHeaderStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            subHeaderStyle.setFillForegroundColor(HSSFColor.LIGHT_GREEN.index);
            subHeaderStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
            subHeaderStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
            subHeaderStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
            subHeaderStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
            subHeaderStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
            subHeaderStyle.setFont(subHeaderFont);

            HSSFCellStyle bodyStyle = workbook.createCellStyle();
            bodyStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);

            HSSFCellStyle bodyGreen = workbook.createCellStyle();
            bodyGreen.cloneStyleFrom(bodyStyle);
            bodyGreen.setFillForegroundColor(HSSFColor.LIGHT_GREEN.index);
            bodyGreen.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

            HSSFCellStyle bodyBlue = workbook.createCellStyle();
            bodyBlue.cloneStyleFrom(bodyStyle);
            bodyBlue.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
            bodyBlue.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

            HSSFCellStyle totalStyle = workbook.createCellStyle();
            totalStyle.cloneStyleFrom(bodyStyle);
            totalStyle.setFont(totalFont);
            totalStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);

            HSSFDataFormat df = workbook.createDataFormat();
            HSSFCellStyle numStyleGreen = workbook.createCellStyle();
            numStyleGreen.cloneStyleFrom(bodyGreen);
            numStyleGreen.setDataFormat(df.getFormat("#,##0"));
            HSSFCellStyle numStyleBlue = workbook.createCellStyle();
            numStyleBlue.cloneStyleFrom(bodyBlue);
            numStyleBlue.setDataFormat(df.getFormat("#,##0"));
            HSSFCellStyle numStyleWhite = workbook.createCellStyle();
            numStyleWhite.cloneStyleFrom(bodyStyle);
            numStyleWhite.setDataFormat(df.getFormat("#,##0"));

            HSSFCellStyle pctStyle = workbook.createCellStyle();
            pctStyle.cloneStyleFrom(bodyGreen);
            pctStyle.setDataFormat(df.getFormat("0.00%"));
            HSSFCellStyle pctStyleTotal = workbook.createCellStyle();
            pctStyleTotal.cloneStyleFrom(totalStyle);
            pctStyleTotal.setDataFormat(df.getFormat("0.00%"));

            int r = 0;

            // ====== NIVEL 1 ======
            HSSFRow row1 = sheet.createRow(r++);
            createHeaderCell(row1, 0, "Sales", headerStyle);
            createHeaderCell(row1, 1, "Settlement Reconciliation", headerStyle);
            createHeaderCell(row1, 9, "Sales Reconciliation", headerStyle);

//            sheet.addMergedRegion(new CellRangeAddress(0,0,0,0));    // Sales
//            sheet.addMergedRegion(new CellRangeAddress(0,0,1,8));    // Settlement Reconciliation
//            sheet.addMergedRegion(new CellRangeAddress(0,0,9,12));   // Sales Reconciliation
            // ====== NIVEL 2 ======
            HSSFRow row2 = sheet.createRow(r++);
            createHeaderCell(row2, 0, "Date", subHeaderStyle);
            createHeaderCell(row2, 1, "EECC", subHeaderStyle);
            createHeaderCell(row2, 2, "Match", subHeaderStyle);
            createHeaderCell(row2, 5, "Settlement", subHeaderStyle);
            createHeaderCell(row2, 6, "Total", subHeaderStyle);
            createHeaderCell(row2, 7, "Accounted", subHeaderStyle);
            createHeaderCell(row2, 9, "Total", subHeaderStyle);
            createHeaderCell(row2, 10, "Match", subHeaderStyle);
            createHeaderCell(row2, 12, "Sales", subHeaderStyle);

//            sheet.addMergedRegion(new CellRangeAddress(1,2,0,0));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,1,1));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,2,4));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,5,5));
//            sheet.addMergedRegion(new CellRangeAddress(1,2,6,6));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,7,8));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,9,9));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,10,11));
//            sheet.addMergedRegion(new CellRangeAddress(1,1,12,12));
            // ====== NIVEL 3 ======
            HSSFRow row3 = sheet.createRow(r++);
            createHeaderCell(row3, 1, "Match", subHeaderStyle);
            createHeaderCell(row3, 2, "Auto", subHeaderStyle);
            createHeaderCell(row3, 3, "%", subHeaderStyle);
            createHeaderCell(row3, 4, "Manual", subHeaderStyle);
            createHeaderCell(row3, 5, "w/o Sales", subHeaderStyle);
            createHeaderCell(row3, 7, "Processed", subHeaderStyle);
            createHeaderCell(row3, 8, "Pending", subHeaderStyle);
            createHeaderCell(row3, 9, "by Ticket", subHeaderStyle);
            createHeaderCell(row3, 10, "Automatic", subHeaderStyle);
            createHeaderCell(row3, 11, "Manual", subHeaderStyle);
            createHeaderCell(row3, 12, "w/o Reconcili.", subHeaderStyle);

            // ====== ACUMULADORES PARA TOTALES ======
            double tEECC = 0, tAuto = 0, tManual = 0, tWOsales = 0, tTotal = 0, tProc = 0, tPend = 0, tTicket = 0, tMatchAuto = 0, tMatchMan = 0, tSalesWO = 0;

            // ====== DATOS ======
            for (A2290Filter it : listaData) {
                HSSFRow row = sheet.createRow(r++);
                int c = 0;

                createCell(row, c++, it.strFormatDate, bodyStyle);

                createNumericCell(row, c++, it.lngQEECC, numStyleGreen);
                tEECC += n(it.lngQEECC);
                createNumericCell(row, c++, it.lngQMATCH, numStyleGreen);
                tAuto += n(it.lngQMATCH);

                // % por fila = Auto / Total (si total=0 -> 0)
                double rowTotal = n(it.lngQSALES);
                double rowPct = rowTotal == 0 ? 0d : n(it.lngQMATCH) / rowTotal;
                HSSFCell cellPct = row.createCell((short) c++);
                cellPct.setCellValue(rowPct);
                cellPct.setCellStyle(pctStyle);

                createNumericCell(row, c++, it.lngQMANUAL, numStyleGreen);
                tManual += n(it.lngQMANUAL);
                createNumericCell(row, c++, it.lngQPEND, numStyleGreen);
                tWOsales += n(it.lngQPEND);
                createNumericCell(row, c++, it.lngQSALES, numStyleGreen);
                tTotal += rowTotal;

                createNumericCell(row, c++, it.lngQPOLIC, numStyleBlue);
                tProc += n(it.lngQPOLIC);
                createNumericCell(row, c++, it.lngQPOLIPE, numStyleBlue);
                tPend += n(it.lngQPOLIPE);

                createNumericCell(row, c++, it.lngQTICKET, numStyleWhite);
                tTicket += n(it.lngQTICKET);
                createNumericCell(row, c++, it.lngQTMATCH, numStyleWhite);
                tMatchAuto += n(it.lngQTMATCH);
                createNumericCell(row, c++, it.lngQTMANUAL, numStyleWhite);
                tMatchMan += n(it.lngQTMANUAL);
                createNumericCell(row, c++, it.lngQTPEND, numStyleWhite);
                tSalesWO += n(it.lngQTPEND);
            }

            // ====== TOTAL ======
            HSSFRow rowTotal = sheet.createRow(r++);
            int cT = 0;
            HSSFCell totalLabel = rowTotal.createCell((short) cT++);
            totalLabel.setCellValue("Total");
            totalLabel.setCellStyle(totalStyle);

            // verde
            createNumericCell(rowTotal, cT++, tEECC, totalStyle);
            createNumericCell(rowTotal, cT++, tAuto, totalStyle);

            double totalPct = (tTotal == 0) ? 0d : (tAuto / tTotal);
            HSSFCell cellPctTot = rowTotal.createCell((short) cT++);
            cellPctTot.setCellValue(totalPct);
            cellPctTot.setCellStyle(pctStyleTotal);

            createNumericCell(rowTotal, cT++, tManual, totalStyle);
            createNumericCell(rowTotal, cT++, tWOsales, totalStyle);
            createNumericCell(rowTotal, cT++, tTotal, totalStyle);

            // azul
            createNumericCell(rowTotal, cT++, tProc, totalStyle);
            createNumericCell(rowTotal, cT++, tPend, totalStyle);

            // blanco
            createNumericCell(rowTotal, cT++, tTicket, totalStyle);
            createNumericCell(rowTotal, cT++, tMatchAuto, totalStyle);
            createNumericCell(rowTotal, cT++, tMatchMan, totalStyle);
            createNumericCell(rowTotal, cT++, tSalesWO, totalStyle);

            // ====== Ajustes ======
//            for (int i = 0; i <= 12; i++) sheet.autoSizeColumn(i);
//
//            response.setContentType("application/vnd.ms-excel");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//            workbook.write(response.getOutputStream());
//            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    /* ==== Helpers ==== */

    private void createHeaderCell(HSSFRow row, int col, String value, HSSFCellStyle style) {
        HSSFCell cell = row.createCell((short) col);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }

    private static double n(Number x) {
        return (x == null) ? 0d : x.doubleValue();
    }

    private void createCell(HSSFRow row, int col, Object value, HSSFCellStyle style) {
        HSSFCell cell = row.createCell((short) col);
        if (value instanceof Number) {
            cell.setCellValue(((Number) value).doubleValue());
        } else {
            cell.setCellValue(value != null ? value.toString() : "");
        }
        cell.setCellStyle(style);
    }

    private void createNumericCell(HSSFRow row, int col, Number value, HSSFCellStyle style) {
        HSSFCell cell = row.createCell((short) col);
        cell.setCellValue(value != null ? value.doubleValue() : 0d);
        cell.setCellStyle(style);
    }

    // Excel Country
    @RequestMapping(value = "getXLSXCountryCash")
    public @ResponseBody
    void getXLSXCountryCash(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXCountry");

        String fileNameDownload = "Bank_Reconciliation_Report_" + Functions.getFechaActual() + ".xlsx";
        try {
            List<A2290Filter> listaData = (this.getListCountryCash(request, true) != null)
                    ? this.getListCountry(request, true) : new ArrayList<A2290Filter>(0);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            XSSFWorkbook wb = new XSSFWorkbook();
            XSSFSheet sheet = wb.createSheet("Report");

            // ===== Estilos (POI 3.0) =====
            DataFormat df = wb.createDataFormat();

            Font headerFont = wb.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            Font headerBlackBold = wb.createFont();
            headerBlackBold.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerBlackBold.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle headerStyle = wb.createCellStyle();
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex()); // azul grisáceo
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            setBordersLegacy(headerStyle);
            headerStyle.setFont(headerFont);

            XSSFCellStyle subHeaderGreen = wb.createCellStyle();
            subHeaderGreen.cloneStyleFrom(headerStyle);
            subHeaderGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            subHeaderGreen.setFont(headerBlackBold);

            XSSFCellStyle subHeaderBlue = wb.createCellStyle();
            subHeaderBlue.cloneStyleFrom(headerStyle);
            subHeaderBlue.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
            subHeaderBlue.setFont(headerBlackBold);

            XSSFCellStyle body = wb.createCellStyle();
            setBordersLegacy(body);

            XSSFCellStyle bodyGreen = wb.createCellStyle();
            bodyGreen.cloneStyleFrom(body);
            bodyGreen.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            bodyGreen.setFillPattern(CellStyle.SOLID_FOREGROUND);
            bodyGreen.setDataFormat(df.getFormat("#,##0"));

            XSSFCellStyle bodyBlue = wb.createCellStyle();
            bodyBlue.cloneStyleFrom(body);
            bodyBlue.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
            bodyBlue.setFillPattern(CellStyle.SOLID_FOREGROUND);
            bodyBlue.setDataFormat(df.getFormat("#,##0"));

            XSSFCellStyle bodyWhiteNum = wb.createCellStyle();
            bodyWhiteNum.cloneStyleFrom(body);
            bodyWhiteNum.setDataFormat(df.getFormat("#,##0"));

            XSSFCellStyle totalStyle = wb.createCellStyle();
            setBordersLegacy(totalStyle);
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setDataFormat(df.getFormat("#,##0"));
            Font totalFont = wb.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);

            int r = 0;

            // ===== NIVEL 1 =====
            Row row1 = sheet.createRow(r++);
            createTextCell(row1, 0, "Country", headerStyle);
            createTextCell(row1, 2, "Settlement Reconciliation", headerStyle);
            createTextCell(row1, 9, "Sales Reconciliation", headerStyle);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));  // A1:B1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));  // C1:I1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 12)); // J1:M1

            // ===== NIVEL 2 =====
            Row row2 = sheet.createRow(r++);
            createTextCell(row2, 0, "Code", headerStyle);
            createTextCell(row2, 1, "Name", headerStyle);
            createTextCell(row2, 2, "Match", subHeaderGreen);
            createTextCell(row2, 5, "Settlement", subHeaderGreen);
            createTextCell(row2, 6, "Total", subHeaderGreen);
            createTextCell(row2, 7, "Accounted", subHeaderBlue);
            createTextCell(row2, 9, "Total", subHeaderGreen);
            createTextCell(row2, 10, "Match", subHeaderGreen);
            createTextCell(row2, 12, "Sales", subHeaderGreen);

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // Code
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1)); // Name
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 4)); // Match
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5)); // Settlement
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6)); // Total
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8)); // Accounted
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9)); // Total (Sales Rec)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11)); // Match (Sales Rec)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12)); // Sales (Sales Rec)

            // ===== NIVEL 3 =====
            Row row3 = sheet.createRow(r++);
            createTextCell(row3, 2, "Auto", subHeaderGreen);
            createTextCell(row3, 3, "Manual", subHeaderGreen);
            createTextCell(row3, 4, "Diff", subHeaderGreen);
            createTextCell(row3, 5, "w/o Sales", subHeaderGreen);
            createTextCell(row3, 7, "Processed", subHeaderBlue);
            createTextCell(row3, 8, "Pending", subHeaderBlue);
            createTextCell(row3, 9, "by Ticket", subHeaderGreen);
            createTextCell(row3, 10, "Automatic", subHeaderGreen);
            createTextCell(row3, 11, "Manual", subHeaderGreen);
            createTextCell(row3, 12, "w/o Reconcili.", subHeaderGreen);

            // ===== Datos + Totales =====
            double tAuto = 0, tManual = 0, tDiff = 0, tWoSales = 0, tTotal = 0, tProc = 0, tPend = 0, tTicket = 0, tMatchAuto = 0, tMatchManual = 0, tSalesWO = 0;

            for (A2290Filter it : listaData) {
                Row row = sheet.createRow(r++);
                int c = 0;

                // A,B
                createTextCell(row, c++, safeStr(it.SCOUNTRY), body);
                createTextCell(row, c++, safeStr(it.NAME), body);

                // C..G (verde)
                createNumCell(row, c++, it.lngQMATCH, bodyGreen);
                tAuto += num(it.lngQMATCH);
                createNumCell(row, c++, it.lngQMANUAL, bodyGreen);
                tManual += num(it.lngQMANUAL);
                createNumCell(row, c++, it.lngQDIFF, bodyGreen);
                tDiff += num(it.lngQDIFF);
                createNumCell(row, c++, it.lngQPEND, bodyGreen);
                tWoSales += num(it.lngQPEND);
                createNumCell(row, c++, it.lngQSALES, bodyGreen);
                tTotal += num(it.lngQSALES);

                // H..I (azul)
                createNumCell(row, c++, it.lngQPOLIC, bodyBlue);
                tProc += num(it.lngQPOLIC);
                createNumCell(row, c++, it.lngQPOLIPE, bodyBlue);
                tPend += num(it.lngQPOLIPE);

                // J..M (blanco)
                createNumCell(row, c++, it.lngQTICKET, bodyWhiteNum);
                tTicket += num(it.lngQTICKET);
                createNumCell(row, c++, it.lngQTMATCH, bodyWhiteNum);
                tMatchAuto += num(it.lngQTMATCH);
                createNumCell(row, c++, it.lngQTMANUAL, bodyWhiteNum);
                tMatchManual += num(it.lngQTMANUAL);
                createNumCell(row, c++, it.lngQTPEND, bodyWhiteNum);
                tSalesWO += num(it.lngQTPEND);
            }

            // ===== Fila Total =====
            Row rowT = sheet.createRow(r++);
            int ct = 0;
            createTextCell(rowT, ct++, "", totalStyle); // Code
            createTextCell(rowT, ct++, "", totalStyle); // Name
            createNumCell(rowT, ct++, tAuto, totalStyle);
            createNumCell(rowT, ct++, tManual, totalStyle);
            createNumCell(rowT, ct++, tDiff, totalStyle);
            createNumCell(rowT, ct++, tWoSales, totalStyle);
            createNumCell(rowT, ct++, tTotal, totalStyle);
            createNumCell(rowT, ct++, tProc, totalStyle);
            createNumCell(rowT, ct++, tPend, totalStyle);
            createNumCell(rowT, ct++, tTicket, totalStyle);
            createNumCell(rowT, ct++, tMatchAuto, totalStyle);
            createNumCell(rowT, ct++, tMatchManual, totalStyle);
            createNumCell(rowT, ct++, tSalesWO, totalStyle);

            // Autosize
            for (int i = 0; i <= 12; i++) {
                sheet.autoSizeColumn(i);
            }

            // ===== Respuesta =====
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            wb.write(response.getOutputStream());
            wb.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    /* ===== Helpers POI 3.0 ===== */
    private static void setBordersLegacy(CellStyle st) {
        st.setBorderBottom(CellStyle.BORDER_THIN);
        st.setBorderTop(CellStyle.BORDER_THIN);
        st.setBorderLeft(CellStyle.BORDER_THIN);
        st.setBorderRight(CellStyle.BORDER_THIN);
    }

    private static String safeStr(Object o) {
        return (o == null) ? "" : String.valueOf(o);
    }

    private static double num(Number n) {
        return (n == null) ? 0d : n.doubleValue();
    }

    private static void createTextCell(Row row, int col, String val, CellStyle style) {
        Cell cell = row.createCell(col);
        cell.setCellValue(val == null ? "" : val);
        cell.setCellStyle(style);
    }

    private static void createNumCell(Row row, int col, Number val, CellStyle style) {
        Cell cell = row.createCell(col);
        cell.setCellValue(val == null ? 0d : val.doubleValue());
        cell.setCellStyle(style);
    }

    @RequestMapping(value = "getXLSXDayCash")
    public @ResponseBody
    void getXLSXDayCash(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDayCash");
        String fileNameDownload = "Bank_Reconciliation_Report_" + Functions.getFechaActual() + ".xlsx";

        try {
            // Datos
            List<A2290Filter> listaData = (this.getListDayCash(request, true) != null)
                    ? this.getListDayCash(request, true) : new ArrayList<A2290Filter>(0);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            XSSFWorkbook wb = new XSSFWorkbook();
            XSSFSheet sheet = wb.createSheet("Report");
            DataFormat df = wb.createDataFormat();

            // ===== Estilos (POI 3.0) =====
            Font headerFontWhite = wb.createFont();
            headerFontWhite.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFontWhite.setColor(IndexedColors.WHITE.getIndex());

            Font headerFontBlack = wb.createFont();
            headerFontBlack.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFontBlack.setColor(IndexedColors.BLACK.getIndex());

            XSSFCellStyle headerMain = wb.createCellStyle();                 // barra azul-gris
            headerMain.setAlignment(CellStyle.ALIGN_CENTER);
            headerMain.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
            headerMain.setFillPattern(CellStyle.SOLID_FOREGROUND);
            setBordersLegacy(headerMain);
            headerMain.setFont(headerFontWhite);

            XSSFCellStyle subHeader = wb.createCellStyle();                   // headers verdes
            subHeader.cloneStyleFrom(headerMain);
            subHeader.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            subHeader.setFont(headerFontBlack);

            XSSFCellStyle body = wb.createCellStyle();                        // texto general
            setBordersLegacy(body);

            XSSFCellStyle bodyGreenNum = wb.createCellStyle();                // celdas verdes con números
            bodyGreenNum.cloneStyleFrom(body);
            bodyGreenNum.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            bodyGreenNum.setFillPattern(CellStyle.SOLID_FOREGROUND);
            bodyGreenNum.setDataFormat(df.getFormat("#,##0"));

            XSSFCellStyle bodyRight = wb.createCellStyle();                   // números sin color
            bodyRight.cloneStyleFrom(body);
            bodyRight.setAlignment(CellStyle.ALIGN_RIGHT);
            bodyRight.setDataFormat(df.getFormat("#,##0"));

            XSSFCellStyle totalStyle = wb.createCellStyle();                  // fila Total
            setBordersLegacy(totalStyle);
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setDataFormat(df.getFormat("#,##0"));
            Font totalFont = wb.createFont();
            totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            totalStyle.setFont(totalFont);

            int r = 0;

            // ===== NIVEL 1 =====
            Row row1 = sheet.createRow(r++);
            createTextCell(row1, 0, "Sales", headerMain);
            createTextCell(row1, 1, "Settlement Reconciliation", headerMain);
            // merges: A1:A1, B1:F1
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));

            // ===== NIVEL 2 =====
            Row row2 = sheet.createRow(r++);
            createTextCell(row2, 0, "Day", subHeader);
            createTextCell(row2, 1, "Match", subHeader);
            createTextCell(row2, 4, "Settlement", subHeader);
            createTextCell(row2, 5, "Total", subHeader);

            // merges: Day (rowspan), Match (colspan 3), Settlement (colspan 1), Total (rowspan)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0)); // Day
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 3)); // Match
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4)); // Settlement
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5)); // Total

            // ===== NIVEL 3 =====
            Row row3 = sheet.createRow(r++);
            createTextCell(row3, 1, "Auto", subHeader);
            createTextCell(row3, 2, "Manual", subHeader);
            createTextCell(row3, 3, "Diff", subHeader);
            createTextCell(row3, 4, "w/o Sales", subHeader);

            // ===== Datos y acumuladores =====
            double tAuto = 0, tManual = 0, tDiff = 0, tWoSales = 0, tTotal = 0;

            for (A2290Filter it : listaData) {
                Row row = sheet.createRow(r++);
                int c = 0;

                // Day (texto)
                createTextCell(row, c++, safeStr(it.SDATE), body);

                // Match (verde con número)
                createNumCell(row, c++, it.lngQMATCH, bodyGreenNum);
                tAuto += num(it.lngQMATCH);
                createNumCell(row, c++, it.lngQMANUAL, bodyGreenNum);
                tManual += num(it.lngQMANUAL);
                createNumCell(row, c++, it.lngQDIFF, bodyGreenNum);
                tDiff += num(it.lngQDIFF);

                // Settlement -> w/o Sales (verde)
                createNumCell(row, c++, it.lngQPEND, bodyGreenNum);
                tWoSales += num(it.lngQPEND);

                // Total (verde)
                createNumCell(row, c++, it.lngQSALES, bodyGreenNum);
                tTotal += num(it.lngQSALES);
            }

            // ===== Fila de totales =====
            Row rowT = sheet.createRow(r++);
            int cT = 0;
            createTextCell(rowT, cT++, "", totalStyle);                        // Day vacío
            createNumCell(rowT, cT++, tAuto, totalStyle);
            createNumCell(rowT, cT++, tManual, totalStyle);
            createNumCell(rowT, cT++, tDiff, totalStyle);
            createNumCell(rowT, cT++, tWoSales, totalStyle);
            createNumCell(rowT, cT++, tTotal, totalStyle);

            // ===== UX: congelar headers y autofiltro =====
            sheet.createFreezePane(0, 3); // congela títulos (3 primeras filas)
            sheet.setAutoFilter(new CellRangeAddress(2, Math.max(2, r - 1), 0, 5));

            // Autosize
            for (int i = 0; i <= 5; i++) {
                sheet.autoSizeColumn(i, true);
            }

            // ===== Respuesta =====
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            wb.write(response.getOutputStream());
            wb.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getListDetalleCash")
    public @ResponseBody
    void getXLSXDetalleCash(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getListDetalleCash");
        String fileNameDownload = "Bank_Reconciliation_Report_" + Functions.getFechaActual() + ".xlsx";

        try {
            List<A2290Filter> listaData = this.getListDetalleCash(request, true);
            System.out.println("Tamaño de lista devuelta : " + (listaData == null ? 0 : listaData.size()));

            if (listaData != null && listaData.size() < 65000) {
                XSSFWorkbook wb = new XSSFWorkbook();
                XSSFSheet sheet = wb.createSheet("Report");
                DataFormat df = wb.createDataFormat();

                // ===== Estilos (POI 3.0) =====
                Font hWhite = wb.createFont();
                hWhite.setBoldweight(Font.BOLDWEIGHT_BOLD);
                hWhite.setColor(IndexedColors.WHITE.getIndex());
                Font hBlack = wb.createFont();
                hBlack.setBoldweight(Font.BOLDWEIGHT_BOLD);
                hBlack.setColor(IndexedColors.BLACK.getIndex());
                Font bold = wb.createFont();
                bold.setBoldweight(Font.BOLDWEIGHT_BOLD);

                XSSFCellStyle headMain = wb.createCellStyle();
                headMain.setAlignment(CellStyle.ALIGN_CENTER);
                headMain.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
                headMain.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
                headMain.setFillPattern(CellStyle.SOLID_FOREGROUND);
                setBordersLegacy(headMain);
                headMain.setFont(hWhite);

                XSSFCellStyle headSub = wb.createCellStyle();
                headSub.cloneStyleFrom(headMain);
                headSub.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
                headSub.setFont(hBlack);

                XSSFCellStyle body = wb.createCellStyle();
                setBordersLegacy(body);
                XSSFCellStyle bodyRight = wb.createCellStyle();
                bodyRight.cloneStyleFrom(body);
                bodyRight.setAlignment(CellStyle.ALIGN_RIGHT);
                XSSFCellStyle moneyBody = wb.createCellStyle();
                moneyBody.cloneStyleFrom(bodyRight);
                moneyBody.setDataFormat(df.getFormat("#,##0.00"));
                XSSFCellStyle intBody = wb.createCellStyle();
                intBody.cloneStyleFrom(bodyRight);
                intBody.setDataFormat(df.getFormat("#,##0"));

                XSSFCellStyle total = wb.createCellStyle();
                setBordersLegacy(total);
                total.setAlignment(CellStyle.ALIGN_RIGHT);
                total.setFont(bold);
                total.setDataFormat(df.getFormat("#,##0.00"));

                int r = 0;

                // ===== Nivel 1 (encabezados principales) =====
                Row row1 = sheet.createRow(r++);
                createTextCell(row1, 0, "Status", headMain);
                createTextCell(row1, 1, "Consol", headMain);
                createTextCell(row1, 2, "Business", headMain);
                createTextCell(row1, 3, "Abono Date", headMain);
                createTextCell(row1, 4, "Source", headMain);
                createTextCell(row1, 5, "Curr.", headMain);
                createTextCell(row1, 6, "Amount", headMain);
                createTextCell(row1, 7, "Bank Information", headMain);
                createTextCell(row1, 9, "Qty", headMain);
                createTextCell(row1, 11, "BANDOC", headMain);
                createTextCell(row1, 12, "REFER", headMain);
                createTextCell(row1, 13, "View Cash", headMain);

                // Merges de nivel 1
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));  // Status
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));  // Consol
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));  // Business
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));  // Abono Date
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));  // Source
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));  // Curr.
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));  // Amount
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));  // Bank Information
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10)); // Qty
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11)); // BANDOC
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12)); // REFER
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13)); // View Cash

                // ===== Nivel 2 (sub-encabezados) =====
                Row row2 = sheet.createRow(r++);
                createTextCell(row2, 0, "", headSub); // ocupan merges
                createTextCell(row2, 1, "", headSub);
                createTextCell(row2, 2, "", headSub);
                createTextCell(row2, 3, "", headSub);
                createTextCell(row2, 4, "", headSub);
                createTextCell(row2, 5, "", headSub);
                createTextCell(row2, 6, "", headSub);
                createTextCell(row2, 7, "Pay. Date", headSub);
                createTextCell(row2, 8, "Account", headSub);
                createTextCell(row2, 9, "Settl.", headSub);
                createTextCell(row2, 10, "Tkts", headSub);
                createTextCell(row2, 11, "", headSub);
                createTextCell(row2, 12, "", headSub);
                createTextCell(row2, 13, "", headSub);

                // ===== Datos =====
                double sumAmount = 0d;
                double sumTkts = 0d;
                // (si quieres total de Settl. también)
                double sumSettl = 0d;

                if (listaData != null) {
                    for (A2290Filter it : listaData) {
                        Row rd = sheet.createRow(r++);
                        int c = 0;

                        // Mapeo igual a tu grid
                        createTextCell(rd, c++, safeStr(it.strDescStatus), body);       // Status
                        createTextCell(rd, c++, safeStr(it.SCONSOL), body);       // Consol
                        createTextCell(rd, c++, "PASAJES", body);       // Business (texto fijo de la UI)
                        createTextCell(rd, c++, safeStr(it.ADATE), body);       // Abono Date
                        createTextCell(rd, c++, mapSource(it.TINPUT), body);       // Source (B/I/A -> BSP/ICCS/ARC)
                        createTextCell(rd, c++, safeStr(it.SCURRENCY), body);       // Curr. (fallback SCURR o SCURRENCY)
                        createNumCell(rd, c++, it.SVFOP, moneyBody);  // Amount
                        createTextCell(rd, c++, safeStr(it.PAYDATE), body);       // Bank Info - Pay.Date
                        createTextCell(rd, c++, safeStr(it.ACCNUMBER), bodyRight);  // Bank Info - Account
                        createNumCell(rd, c++, it.lngQTYDOC, intBody);    // Qty - Settl.
                        createNumCell(rd, c++, it.lngQTYTKT, intBody);    // Qty - Tkts
                        createTextCell(rd, c++, safeStr(it.BANDOC), body);       // BANDOC
                        createTextCell(rd, c++, safeStr(it.REFER), body);       // REFER
                        createTextCell(rd, c++, "", body);       // View Cash (no icono en Excel)

                        sumAmount += num(it.SVFOP);
                        sumTkts += num(it.lngQTYTKT);
                        sumSettl += num(it.lngQTYDOC);
                    }
                }

                // ===== Totales (muestra Amount y Tkts; Settl opcional) =====
                Row rt = sheet.createRow(r++);
                int ct = 0;
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createNumCell(rt, ct++, sumAmount, total);           // Total Amount
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createNumCell(rt, ct++, sumSettl, intBody);          // (si no quieres, pon "" y quita suma)
                createNumCell(rt, ct++, sumTkts, intBody);          // Total Tkts
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);
                createTextCell(rt, ct++, "", body);

                // UX: congelar encabezados y autofiltro
                sheet.createFreezePane(0, 2);
                sheet.setAutoFilter(new CellRangeAddress(1, Math.max(1, r - 1), 0, 13));

                // tamaños
                int[] widths = {5000, 3000, 4000, 4500, 3500, 3000, 6500, 4500, 6000, 3000, 3000, 5000, 6000, 4000};
                for (int i = 0; i < widths.length; i++) {
                    sheet.setColumnWidth(i, widths[i]);
                }

                // Respuesta
                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
                wb.write(response.getOutputStream());
                wb.close();

            } else {
                // ===== Rama TXT (igual a tu implementación existente) =====
                int len = (listaData == null) ? 0 : listaData.size();
                String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
                String fileName = "Control_Liquidaciones_" + Functions.getFechaActual();
                File fileA = new File(rutaFile + "\\" + fileName + ".txt");
                if (fileA.exists()) {
                    fileA.delete();
                }

                PrintWriter writer = new PrintWriter(fileA, "UTF-8");
                writer.println("STATUS|PROCESS|TDOC|SAGENT|NEGOC|SDATE|SCARCOD|SCARDN|SAUTHOC|CODEBANK|SMERCH|SCURRENCY|SVFOP|PAYDATE|ACCNUMBER|TERMI|BANDOC|STCON|FCONT|QTYDOC|QTYTKT|PEND_DAYS");
                for (int i = 0; i < len; i++) {
                    A2290Filter x = listaData.get(i);
                    String cadena = (safeStr(x.strDescStatus)) + "|" + safeStr(x.COREP) + "|" + safeStr(x.descTDOC) + "|"
                            + safeStr(x.SAGENT) + "|" + safeStr(x.NEGOC) + "|" + safeStr(x.SDATE) + "|" + safeStr(x.SCARCOD) + "|"
                            + safeStr(x.SCARDN) + "|" + safeStr(x.SAUTHOC) + "|" + safeStr(x.CODEBANK) + "|" + safeStr(x.MERCHN) + "|"
                            + safeStr(x.SCURRENCY) + "|" + safeStr(x.SVFOP) + "|" + safeStr(x.PAYDATE) + "|" + safeStr(x.ACCNUMBER) + "|"
                            + safeStr(x.TERMI) + "|" + safeStr(x.BANDOC) + "|" + safeStr(x.STCON) + "|" + safeStr(x.FCONT) + "|"
                            + safeStr(x.lngQTYDOC) + "|" + safeStr(x.lngQTYTKT) + "|" + safeStr(x.PENDINGDAYS);
                    writer.println(cadena.replaceAll("null", ""));
                }
                writer.flush();
                writer.close();

                response.setContentType("application/text");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + ".txt\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    private static String mapSource(String tinput) {
        if ("B".equalsIgnoreCase(tinput)) {
            return "BSP";
        }
        if ("I".equalsIgnoreCase(tinput)) {
            return "ICCS";
        }
        if ("A".equalsIgnoreCase(tinput)) {
            return "ARC";
        }
        return "Not Source";
    }

    @RequestMapping(value = "getXLSXScanTicketCash", method = RequestMethod.POST)
    public void getXLSXScanTicketCash(HttpServletRequest request, HttpServletResponse response) {
        try {
            // 1) Lee el JSON desde el form field "json" o desde el cuerpo
            String json = safeReadJson(request);
            if (json == null || json.trim().isEmpty() || "{".equals(json.trim())) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "JSON vacío o inválido");
                return;
            }

            // 2) Parseo lenient con Gson
            Gson gson = new GsonBuilder().serializeNulls().create();
            TicketPayload payload;
            try {
                payload = gson.fromJson(json, TicketPayload.class);
            } catch (JsonSyntaxException ex) {
                String decoded = tryUrlDecode(json);
                payload = gson.fromJson(decoded, TicketPayload.class);
            }

            if (payload == null || payload.rows == null || payload.rows.isEmpty()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Sin filas para exportar");
                return;
            }

            // 3) Genera el Excel (.xlsx) con POI 3.0
            XSSFWorkbook wb = new XSSFWorkbook();
            Sheet sheet = wb.createSheet("Tickets");

            // ===== Estilos (POI 3.0) =====
            XSSFCellStyle head = (XSSFCellStyle) wb.createCellStyle();
            Font headFont = wb.createFont();
            headFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            head.setFont(headFont);
            head.setAlignment(CellStyle.ALIGN_CENTER);
            head.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            head.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
            head.setFillPattern(CellStyle.SOLID_FOREGROUND);
            setThinBorders_30(head);

            XSSFCellStyle body = (XSSFCellStyle) wb.createCellStyle();
            setThinBorders_30(body);

            XSSFCellStyle money = (XSSFCellStyle) wb.createCellStyle();
            money.cloneStyleFrom(body);
            DataFormat df = wb.createDataFormat();
            money.setDataFormat(df.getFormat("#,##0.00"));

            // 4) Cabecera igual a la grilla
            String[] cols = {
                "N°", "Status", "Doc. Type", "Agent", "Consol.", "Sales Date", "Fpaymen",
                "Country", "Ticket", "Amount", "Curr", "Invoice", "CFUENTE", "Del."
            };
            int r = 0;
            Row h = sheet.createRow(r++);
            for (int c = 0; c < cols.length; c++) {
                Cell cell = h.createCell(c);
                cell.setCellValue(cols[c]);
                cell.setCellStyle(head);
            }

            // 5) Filas + total de Amount
            double totalAmount = 0d;
            int index = 1;
            for (Map<String, Object> rowMap : payload.rows) {
                Row row = sheet.createRow(r++);
                int c = 0;

                setCell(row, c++, index++, body); // N°
                setCell(row, c++, s(rowMap, "STATUS"), body);
                setCell(row, c++, s(rowMap, "DOCTYP"), body);
                setCell(row, c++, s(rowMap, "AGENT"), body);
                setCell(row, c++, s(rowMap, "CONSOL"), body);
                setCell(row, c++, s(rowMap, "SALESDATE"), body);
                setCell(row, c++, s(rowMap, "FPAYMEN"), body);
                setCell(row, c++, s(rowMap, "COUNTRY"), body);
                setCell(row, c++, s(rowMap, "TICKET"), body);

                double amount = d(rowMap, "AMOUNT");
                totalAmount += amount;
                setMoneyCell(row, c++, amount, money);

                setCell(row, c++, s(rowMap, "CURR"), body);
                setCell(row, c++, s(rowMap, "INVOICE"), body);
                setCell(row, c++, s(rowMap, "CFUENTE"), body);
                setCell(row, c++, s(rowMap, "DEL"), body);
            }

            // 6) Fila de TOTAL (en Amount)
            Row totalRow = sheet.createRow(r++);
            Cell ct = totalRow.createCell(8);  // Columna antes del Amount
            ct.setCellValue("Total");
            ct.setCellStyle(head);
            Cell mt = totalRow.createCell(9);
            mt.setCellValue(totalAmount);
            mt.setCellStyle(money);

            // Autosize
            for (int c = 0; c < cols.length; c++) {
                sheet.autoSizeColumn(c, true);
            }

            // 7) Respuesta
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"Tickets_" + Functions.getFechaActual() + ".xlsx\"");
            wb.write(response.getOutputStream());
            wb.close();
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    /* ================= Helpers ================= */
    private static String safeReadJson(HttpServletRequest request) {
        try {
            // 1) Field de form
            String json = request.getParameter("json");
            if (json != null && !json.trim().isEmpty()) {
                return json;
            }

            // 2) Cuerpo (application/json o urlencoded)
            String body = request.getReader().lines().collect(java.util.stream.Collectors.joining());
            if (body != null && !body.trim().isEmpty()) {
                if (body.startsWith("json=")) {
                    return tryUrlDecode(body.substring(5));
                }
                return body;
            }
        } catch (IOException ignored) {
        }
        return null;
    }

    private static String tryUrlDecode(String s) {
        try {
            return java.net.URLDecoder.decode(s, "UTF-8");
        } catch (Exception ex) {
            return s;
        }
    }

// DTO para Gson
    static class TicketPayload {

        List<Map<String, Object>> rows;
        Map<String, Object> meta;
    }

    /* Conversores seguros */
    private static String s(Map<String, Object> m, String k) {
        Object v = m.get(k);
        return v == null ? "" : String.valueOf(v);
    }

    private static double d(Map<String, Object> m, String k) {
        Object v = m.get(k);
        if (v == null) {
            return 0d;
        }
        if (v instanceof Number) {
            return ((Number) v).doubleValue();
        }
        try {
            return Double.parseDouble(String.valueOf(v).replace(",", ""));
        } catch (Exception e) {
            return 0d;
        }
    }

    /* POI 3.0 helpers */
    private static void setCell(Row row, int col, Object val, CellStyle st) {
        Cell c = row.createCell(col);
        if (val instanceof Number) {
            c.setCellValue(((Number) val).doubleValue());
        } else {
            c.setCellValue(val == null ? "" : String.valueOf(val));
        }
        c.setCellStyle(st);
    }

    private static void setMoneyCell(Row row, int col, double val, CellStyle st) {
        Cell c = row.createCell(col);
        c.setCellValue(val);
        c.setCellStyle(st);
    }

    private static void setThinBorders_30(CellStyle s) {
        s.setBorderBottom(CellStyle.BORDER_THIN);
        s.setBorderTop(CellStyle.BORDER_THIN);
        s.setBorderLeft(CellStyle.BORDER_THIN);
        s.setBorderRight(CellStyle.BORDER_THIN);
    }

    @RequestMapping(value = "reversaCashBSP")
    public @ResponseBody
    String reversaCashBSP(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            A2290Filter filter = gson.fromJson(beanString, A2290Filter.class);

            map = logic.reversaFaseDosMap(filter);

        } catch (Exception ex) {
            map.put("success", false);
            map.put("message", "Excepción Controller: " + ex.getMessage());
        }
        return gson.toJson(map);
    }

    



 
    
    @RequestMapping(value = "reversaCashBSP_Parcial")
    public @ResponseBody String reversaCashBSP_Parcial(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            A2290Filter filter = gson.fromJson(beanString, A2290Filter.class);

            map = logic.reversaFaseDosMapParcial(filter); 

        } catch (Exception ex) {
            map.put("success", false);
            map.put("message", "Excepción Controller: " + ex.getMessage());
        }
        return gson.toJson(map);
    }
    
    
    
    
    
    @RequestMapping(value = "convertAmountToUSD_AMDP")
    public @ResponseBody String convertAmountToUSD_AMDP(HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : convertAmountToUSD_AMDP -------------");
        Map<String, Object> map = new HashMap<>();

        try {
            // Recibimos los parámetros enviados por ExtJS
            double amount = Double.parseDouble(request.getParameter("amount"));
            String currency = request.getParameter("currency");
            String date = request.getParameter("date");

            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            // Llamamos a la lógica para que ejecute el SP
            double convertedAmount = logic.convertAmountUSD(amount, currency, date);

            map.put("success", true);
            map.put("convertedAmount", convertedAmount);
            
        } catch (Exception e) {
            map.put("success", false);
            map.put("Mensaje", "Error al convertir la moneda: " + e.getMessage());
            e.printStackTrace();
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "MaintenanceMPF223", method = RequestMethod.POST)
    public @ResponseBody
    String MaintenanceMPF223(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- bankreconci : MaintenanceMPF223 (UPDATE) -------------");
        map.put("success", false);
        
        try {
            logic = new BankReconciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            Gson gson = new Gson();
            
            A2290Filter filter = gson.fromJson(beanString, A2290Filter.class);

            String resultMsg = logic.updateMPF223(filter);

            if ("OK".equals(resultMsg)) {
                map.put("success", true);
                map.put("Mensaje", "Record updated successfully.");
            } else {
                map.put("Mensaje", resultMsg);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("Mensaje", "Internal Server Error: " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

}
