/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX031S02PXF050Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConciliationASRLogic;
import net.miatech.praxis.logic.sales.LoadReportLogic;
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
 * @author jmeiggs
 */
@Controller
@Scope("request")
@RequestMapping("/LoadReport")
public class LoadReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadReportLogic logic;
    private ConciliationASRLogic logicConciliationASR;
    
    @RequestMapping(value = "loadPXF051")
    public @ResponseBody
    String loadPXF051(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PXF051Filter> lst = this.getList(request, false);
        //map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PXF051Filter> getList(HttpServletRequest request, Boolean bExcel) {
        logic = new LoadReportLogic();
        List<PXF051Filter> lst = new ArrayList<>(0);
        PXF051Filter filter = new PXF051Filter();
        //filter.page.TOTROW = -1;
        //filter.page.START = 0;
        //filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            
            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.dayFrom = request.getParameter("dayFrom");
            filter.yearTo = request.getParameter("yearTo");
            filter.monthTo = request.getParameter("monthTo");
            filter.dayTo = request.getParameter("dayTo");
            filter.WKSTAT = request.getParameter("WKSTAT");
            filter.PSTATE = Integer.parseInt(request.getParameter("PSTATE"));
            filter.ST = request.getParameter("ST");
            filter.SAMT = request.getParameter("SAMT");
            /*
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
            */

            lst = logic.loadPXF051(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }
    
    @RequestMapping(value = "loadPX031S02PXF050")
    public @ResponseBody
    String loadPX031S02PXF050(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX031S02PXF050Filter> lst = this.getInfInteract(request);
        //map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstPXF050", lst);
        return new Gson().toJson(map);
    }
    
    public List<PX031S02PXF050Filter> getInfInteract(HttpServletRequest request) {
        logicConciliationASR = new ConciliationASRLogic();
        List<PX031S02PXF050Filter> lst = new ArrayList<>(0);
        PX031S02PXF050Filter filter = new PX031S02PXF050Filter();
        try {
            logicConciliationASR.setSession(this.serverSession.getServerSession());
            
            filter.IN_WKSTAT = request.getParameter("IN_WKSTAT");
            filter.IN_FREPOR = request.getParameter("IN_FREPOR");

            lst = logicConciliationASR.loadPX031S02PXF050(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "loadPX108S02PXF053")
    public @ResponseBody
    String loadPX108S02PXF053(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX108S02PXF053Filter> lst = this.getListAmount(request, false);
        //map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX108S02PXF053Filter> getListAmount(HttpServletRequest request, Boolean bExcel) {
        logic = new LoadReportLogic();
        List<PX108S02PXF053Filter> lst = new ArrayList<>(0);
        PX108S02PXF053Filter filter = new PX108S02PXF053Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());
            
            filter.IN_FREPOR_FROM = request.getParameter("IN_FREPOR_FROM");
            filter.IN_FREPOR_TO = request.getParameter("IN_FREPOR_TO");
            filter.WKSTAT = request.getParameter("WKSTAT");
            filter.IN_MDA = "";

            lst = logic.loadPX108S02PXF053(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }    
}
