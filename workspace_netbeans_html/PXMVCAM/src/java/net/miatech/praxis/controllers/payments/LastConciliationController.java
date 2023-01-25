/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ProReportLastConciliation;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.LastConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A3800Filter;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/LastConciliation")
public class LastConciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LastConciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/LastConciliation/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LastConciliation : Search-------------");

        map.put("success", true);
        List<A3800Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A3800Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A3800Filter> lst = new ArrayList<>(0);
        A3800Filter filter = new A3800Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new LastConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3800Filter.class);
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

            lst = logic.loadPX565SQP04093(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCardA2290")
    public @ResponseBody
    String searchDetCardA2290(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LastConciliation : searchDetCardA2290-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListCardA2290(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCardA2290(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new LastConciliationLogic();
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

            lst = logic.loadPX565SQP04094(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCardA2291")
    public @ResponseBody
    String searchDetCardA2291(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LastConciliation : searchDetCardA2290-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListCardA2291(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCardA2291(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new LastConciliationLogic();
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

            lst = logic.loadPX565SQP04095(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPDF")
    public @ResponseBody
    void getPDF(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getPDF");
        String fileNameDownload = "Last Conciliation - " + Functions.getFechaActual();
        ProReportLastConciliation prfd = new ProReportLastConciliation();
        A2290Filter Data = new A2290Filter();
        try {
            File file = File.createTempFile(fileNameDownload, ".pdf");

            List<A2290Filter> listaDataA2291 = this.getListCardA2291(request, true);
            System.out.println("Tamaño de lista devuelta A2291: " + listaDataA2291.size());

            List<A2290Filter> listaDataA2290 = this.getListCardA2290(request, true);
            System.out.println("Tamaño de lista devuelta A2290: " + listaDataA2290.size());

            List<A3800Filter> listaDataA3800 = this.getListA3800(request, true);

            //Armando el objeto Data
            Data.SAGENT = listaDataA2290.get(0).SAGENT;
            Data.NUMAVIS = listaDataA3800.get(0).NUMAVIS;
            Data.descSDATE = listaDataA3800.get(0).DATAVIS;
            Data.SCURRENCY = listaDataA2290.get(0).SCURRENCY;
            Data.totSVFOP = listaDataA2290.get(0).totSVFOP; //TOTAL EMISION DE LOS BOLETOS
            Data.totSVFOP_ERROR = listaDataA2291.get(0).totSVFOP; //IMPORTE POR ERROR

            for (int i = 0; i < listaDataA2290.size(); i++) {
                Data.TKTS_CONCATENADOS = Data.TKTS_CONCATENADOS + listaDataA2290.get(i).CCIA + " " + listaDataA2290.get(i).FORMA + listaDataA2290.get(i).SERIE + ", ";
            }

            Data.TKTS_CONCATENADOS = Data.TKTS_CONCATENADOS.substring(0, Data.TKTS_CONCATENADOS.length() - 2);

            prfd.createReport(Data, file);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + ".pdf" + "\"");

            /*FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             response.getOutputStream();
             fos.close();*/
            InputStream is = new FileInputStream(file.getAbsolutePath());
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    public List<A3800Filter> getListA3800(HttpServletRequest request, Boolean bExcel) {

        List<A3800Filter> lst = new ArrayList<>(0);
        A3800Filter filter = new A3800Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new LastConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3800Filter.class);
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

            lst = logic.loadPX565SQP04125(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            A3800Filter bean;
            A3800Filter filter;
            Gson gson = new Gson();
            String beanString;

            logic = new LastConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3800Filter.class);

            bean = logic.loadPX559SQP04126(filter);

            map.put("success", true);
            map.put("data", bean);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String msj = "";
            A3800Filter filter;
            Gson gson = new Gson();
            String beanString;

            logic = new LastConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3800Filter.class);

            msj = logic.loadPX565SQP04127(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/massiveEmission")
    public @ResponseBody
    String massiveEmission(ModelMap map, HttpServletRequest request) {

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String msj = "";
            A3800Filter filter;
            Gson gson = new Gson();
            String beanString;

            logic = new LastConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3800Filter.class);

            msj = logic.loadPX565SQP04157(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }
}
