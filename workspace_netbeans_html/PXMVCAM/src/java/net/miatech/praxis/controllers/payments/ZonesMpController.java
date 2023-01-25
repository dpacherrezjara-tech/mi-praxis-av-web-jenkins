
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
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ZonesMpLogic;
import net.miatech.praxis.payment.filter.A4170Filter;
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
@RequestMapping("/ZonesMp")
public class ZonesMpController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ZonesMpLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ZonesMp/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZonesMp : Search-------------");
        map.put("success", true);
        List<A4170Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4170Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A4170Filter> lst = new ArrayList<>(0);
        A4170Filter filter = new A4170Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ZonesMpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4170Filter.class);
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

            lst = logic.loadPX600SQP04543(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
       
    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BanksCatalog : searchCompleteDetail-------------");

        Gson gson = new Gson();
        A4170Filter filter = new A4170Filter();
        A4170Filter result = new A4170Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4170Filter.class);

        logic = new ZonesMpLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX600SQP04544(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "MaintenanceA4170")
    public @ResponseBody
    String MaintenanceA4170(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BanksCatalog : MaintenanceA4170-------------");
        String option;
        A4170Filter filter = new A4170Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4170Filter.class);

            logic = new ZonesMpLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX600SQP04545(filter, option);

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
    
    /*@RequestMapping(value = "getCodes")
    public @ResponseBody
    String getCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getCodes-------------");

        map.put("success", true);
        List<A4170Filter> lst = this.getListGetCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4170Filter> getListGetCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4170Filter> lst = new ArrayList<>(0);
        A4170Filter filter = new A4170Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ZonesMpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4170Filter.class);

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

            lst = logic.loadPX600SQP04544(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }*/
}

