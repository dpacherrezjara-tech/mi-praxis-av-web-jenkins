
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
import net.miatech.praxis.logic.payments.MiscellaneousPaymentLogic;
import net.miatech.praxis.payment.A4169;
import net.miatech.praxis.payment.filter.A4169Filter;
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
@RequestMapping("/MiscellaneousPayment")
public class MiscellaneousPaymentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private MiscellaneousPaymentLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/MiscellaneousPayment/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MiscellaneousPayment : Search-------------");
        map.put("success", true);
        List<A4169Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4169Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A4169Filter> lst = new ArrayList<>(0);
        A4169Filter filter = new A4169Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MiscellaneousPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4169Filter.class);
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

            lst = logic.loadPX598SQP04518(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getCodes")
    public @ResponseBody
    String getCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getCodes-------------");

        map.put("success", true);
        List<A4169Filter> lst = this.getListGetCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4169Filter> getListGetCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4169Filter> lst = new ArrayList<>(0);
        A4169Filter filter = new A4169Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MiscellaneousPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4169Filter.class);

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

            lst = logic.loadPX598SQP04519(filter);
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
        A4169Filter filter = new A4169Filter();
        A4169 result = new A4169();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4169Filter.class);

        logic = new MiscellaneousPaymentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX598SQP04520(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "MaintenanceA4169")
    public @ResponseBody
    String MaintenanceA4169(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- BanksCatalog : Maintenance4169-------------");
        String option;
        A4169 filter = new A4169();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4169.class);

            logic = new MiscellaneousPaymentLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX598SQP04521(filter, option);

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

