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
import net.miatech.praxis.logic.screens.AbnormalValueLogic;
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
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF121Filter;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.praxis.payment.filter.A2789Filter;
import net.miatech.praxis.payment.filter.A2790Filter;
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
@RequestMapping("/AbnormalValues")
public class AbnormalValuesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AbnormalValueLogic logic;
    private MasterDAO masterDAO;

//    @RequestMapping(method = RequestMethod.POST)
//    public String index(ModelMap map) {
//        map.put("vp_serverDate", Functions.getFechaActual());
//        map.put("vp_serverTime", Functions.getHoraActual());
//        return "cargo/BusinessTools/form_index";
//    }
    
    // =========================================================================
    // ========================== Refund Analysis ========================================
    // =========================================================================
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2790Filter> lstData;
        A2790Filter filter = new A2790Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02008(filter);

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
    @RequestMapping(value = "searchByWeek")
    public @ResponseBody
    String searchByWeek(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2790Filter> lstData;
        A2790Filter filter = new A2790Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            
            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02015(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, lstData);
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
    @RequestMapping(value = "searchByTkt")
    public @ResponseBody
    String searchByTkt(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2789Filter> lstData;
        A2790Filter filter = new A2790Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02018(filter);

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
    // =========================================================================
    // ========================== SALES ========================================
    // =========================================================================
    @RequestMapping(value = "searchSales")
    public @ResponseBody
    String searchSales(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02393(filter);

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

    @RequestMapping(value = "searchDetSales")
    public @ResponseBody
    String searchDetSales(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02394(filter);

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

    @RequestMapping(value = "searchSalTkt")
    public @ResponseBody
    String searchSalTkt(ModelMap map, HttpServletRequest request) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02395(filter);

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

    // ========================================================================
    // ====================== Sales Agent Control =============================
    // ========================================================================
    @RequestMapping(value = "loadTotalControlTotal_Abnormal_Country_ONE")
    public @ResponseBody
    String loadTotalControlTotal_Abnormal_Country_ONE(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<WRF016Filterwk> lstData;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX109SQP02476_COUNTRY(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData_Abnormal_CS", lstData);
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

    @RequestMapping(value = "loadTotalControlTotal_Abnormal_Country")
    public @ResponseBody
    String loadTotalControlTotal_Abnormal_Country(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        List<WRF016Filterwk> lstData = null;
        List<WRF016Filterwk> lstData2 = null;
        List<WRF016Filterwk> lstData3 = null;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.strTIPO = "SALE";
            lstData = logic.loadPX109SQP01232_COUNTRY(filter);
            filter.strTIPO = "RFND";
            lstData2 = logic.loadPX109SQP01232_COUNTRY(filter);
            filter.strTIPO = "EXCH";
            lstData3 = logic.loadPX109SQP01232_COUNTRY(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = exportFieldsCompleto(request, response, lstData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("lstData_Abnormal_CS", lstData);
                map.put("lstData_Abnormal_CR", lstData2);
                map.put("lstData_Abnormal_CE", lstData3);
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

    @RequestMapping(value = "loadTotalControlTotal_Agent")
    public @ResponseBody
    String loadTotalControlTotal_Agent(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        List<WRF016Filterwk> lstData = null;
        DashboardFilter filter = new DashboardFilter();

        try {
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01231_AGENT(filter);
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

    @RequestMapping(value = "loadTotalControlTotal_Tran")
    public @ResponseBody
    String loadTotalControlTotal_Tran(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        List<WRF016Filterwk> lstData = null;
        DashboardFilter filter = new DashboardFilter();

        try {
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01230_MESES(filter);
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

    // -------------- CHART --------------------------
    @RequestMapping(value = "loadControlAgentChart")
    public @ResponseBody
    String loadControlAgentChart(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        List<DashboardFilter> listaData = null;
        DashboardFilter filter = new DashboardFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            listaData = logic.loadPX414SQP02022(filter);

            map.put("success", true);
            map.put("data", listaData);

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
    
    // ========================================================================
    // ========================== Participation OAL ===========================
    // ========================================================================
    @RequestMapping(value = "searchOAL")
    public @ResponseBody
    String searchOAL(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02545(filter);

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
    
        @RequestMapping(value = "searchOALDetail")
    public @ResponseBody
    String searchOALDetail(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            
            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02546(filter);

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
    
        @RequestMapping(value = "searchOALDetailExcel")
    public @ResponseBody
    String searchOALDetailExcel(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02546_ex(filter);

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
    
        @RequestMapping(value = "searchOALTkt")
    public @ResponseBody
    String searchOALTkt(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02546_1(filter);

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

    // ========================================================================
    // ========================== Difference Fare =============================
    // ========================================================================
    @RequestMapping(value = "searchDifferenceFare")
    public @ResponseBody
    String searchDifferenceFare(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF121Filter> lstData;
        IMF121Filter filter = new IMF121Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQPGG121(filter);

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

    @RequestMapping(value = "searchDifferenceByWeek")
    public @ResponseBody
    String searchDifferenceByWeek(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF121Filter> lstData;
        IMF121Filter filter = new IMF121Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQPGG122(filter);

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
    
    // =========================================================================
    // ========================== CREDIT CARD ANALISIS ========================================
    // =========================================================================
    @RequestMapping(value = "searchCCA")
    public @ResponseBody
    String searchCCA(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        DashboardFilter filter = new DashboardFilter();
        HashMap hm = new HashMap();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            hm = logic.loadPX414SQP02248(filter);

            map.put("success", true);

            map.put("lstData_CCard_S", hm.get("SALE"));
            map.put("lstData_CCard_R", hm.get("REFUND"));

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
    // ========================== EXCHANGE ANALISIS ========================================
    // =========================================================================
    @RequestMapping(value = "searchEA")
    public @ResponseBody
    String searchEA(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02393(filter);

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
    
    // ========================================================================
    // ==========================                 =============================
    // ========================================================================
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

    @RequestMapping(value = "loadTotalControlTotal_Abnormal")
    public @ResponseBody
    String loadTotalControlTotal_Abnormal(ModelMap map, HttpServletRequest request, HttpServletResponse response) {

        DashboardFilter filter = new DashboardFilter();
        HashMap hm = new HashMap();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            hm = logic.loadPX109SQP02217(filter);

            map.put("success", true);

//            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
//                String nameExcel = exportFieldsCompleto(request, response, lstData);
//                map.put("nameExcel", nameExcel);
//            } else {
            map.put("lstData_Abnormal_S", hm.get("SALE"));
            map.put("lstData_Abnormal_R", hm.get("REFUND"));
            map.put("lstData_Abnormal_E", hm.get("EXCHANGE"));
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

    @RequestMapping(value = "loadTotalControlTotal_TKT")
    public @ResponseBody
    String loadTotalControlTotal_TKT(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        List<A720Filter> lstData = null;
        WRF016Filterwk filter = new WRF016Filterwk();

        try {
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX109SQP01269(filter);
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
    
    
    // =========================================================================
    // ========================== EXCHANGE ========================================
    // =========================================================================
    @RequestMapping(value = "searchExchange")
    public @ResponseBody
    String searchExchange(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02212(filter);

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
    @RequestMapping(value = "searchDetExchange")
    public @ResponseBody
    String searchDetExchange(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<IMF111Filter> lstData;
        IMF111Filter filter = new IMF111Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            
            int limit = (request.getParameter("limit") == null || Boolean.parseBoolean(request.getParameter("dw_excel"))) ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = (request.getParameter("start") == null) ? 0 : Integer.parseInt(request.getParameter("start").toString());
            
            filter.page.PAGROW = limit;
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new AbnormalValueLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadPX414SQP02213(filter);

            map.put("success", true);

            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, lstData);
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
}
