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
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.RobotConfigLogic;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2354Filter;
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
import net.miatech.praxis.payment.filter.MPFRBTHFilter;
import net.miatech.praxis.payment.filter.MPFRBTDFilter;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/RobotConfig")
public class RobotConfigController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RobotConfigLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/RobotConfig/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RobotConfig : Search-------------");
        map.put("success", true);
        List<MPFRBTHFilter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPFRBTHFilter> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPFRBTHFilter> lst = new ArrayList<>(0);
        MPFRBTHFilter filter = new MPFRBTHFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTHFilter.class);
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

            lst = logic.loadPX622RBTAV_1(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RobotConfig : SearchDetail-------------");
        map.put("success", true);
        List<MPFRBTDFilter> lst = this.getListDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<MPFRBTDFilter> getListDetail(HttpServletRequest request, Boolean bExcel) {

        List<MPFRBTDFilter> lst = new ArrayList<>(0);
        MPFRBTDFilter filter = new MPFRBTDFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTDFilter.class);
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

            lst = logic.loadPX622RBTAV_2(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchHeaderDetail")
    public @ResponseBody
    String searchHeaderDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RobotConfig : searchHeaderDetail-------------");
        map.put("success", true);
        MPFRBTHFilter lst = this.getHeaderDetail(request, false);
                
        map.put("result", lst);
        map.put("success", true);
        return new Gson().toJson(map);
    }
    
    public MPFRBTHFilter getHeaderDetail(HttpServletRequest request, Boolean bExcel) {

        MPFRBTHFilter lst = new MPFRBTHFilter();
        MPFRBTHFilter filter = new MPFRBTHFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTHFilter.class);

            lst = logic.loadPX622RBTAV_3(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDetailDetail")
    public @ResponseBody
    String searchDetailDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RobotConfig : searchDetailDetail-------------");
        map.put("success", true);
        MPFRBTDFilter lst = this.getDetailDetail(request, false);
                
        map.put("result", lst);
        map.put("success", true);
        return new Gson().toJson(map);
    }
    
    public MPFRBTDFilter getDetailDetail(HttpServletRequest request, Boolean bExcel) {

        MPFRBTDFilter lst = new MPFRBTDFilter();
        MPFRBTDFilter filter = new MPFRBTDFilter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTDFilter.class);

            lst = logic.loadPX622RBTAV_4(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }


    @RequestMapping(value = "MaintenanceHeader")
    public @ResponseBody
    String MaintenanceHeader(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- RobotConfig : MaintenanceHeader-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        MPFRBTHFilter filter = new MPFRBTHFilter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTHFilter.class);

            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX622RBTAV_5(filter, option);

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
    
    @RequestMapping(value = "MaintenanceDetail")
    public @ResponseBody
    String MaintenanceDetail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- RobotConfig : MaintenanceDetail-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        MPFRBTDFilter filter = new MPFRBTDFilter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFRBTDFilter.class);

            logic = new RobotConfigLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX622RBTAV_6(filter, option);

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
    

}
