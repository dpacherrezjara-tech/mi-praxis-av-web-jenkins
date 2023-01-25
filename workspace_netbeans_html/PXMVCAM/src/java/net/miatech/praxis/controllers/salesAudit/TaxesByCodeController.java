package net.miatech.praxis.controllers.salesAudit;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP01046Filter;
import net.miatech.beans.SaleAudit.SQP01059Filter;
import net.miatech.beans.SaleAudit.SQP01061Filter;
import net.miatech.beans.SaleAudit.SQP01072Filter;
import net.miatech.beans.SaleAudit.SQP01073Filter;
import net.miatech.beans.SaleAudit.SQP01075Filter;
import net.miatech.beans.SaleAudit.SQP01076Filter;
import net.miatech.beans.SaleAudit.SQP01086Filter;
import net.miatech.praxis.controllers.BaseController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.logic.salesAudit.TaxesByCodeLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//</editor-fold>

/**
 *
 * @author jmeiggs
 */
@Controller
@Scope("request")
@RequestMapping("/TaxesByCode")
public class TaxesByCodeController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TaxesByCodeLogic logic;
    
    @RequestMapping(value = "loadDataByCountry")
    public @ResponseBody
    String loadDataByCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TaxesByCode : loadDataByCountry-------------");
        map.put("success", true);
        List<SQP01061Filter> lst = this.getList(request);
        System.out.println("Total : " + lst.size());
        List<SQP01059Filter> lst2 = this.getList2(request, lst);
        System.out.println("Total 2 : " + lst2.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("total2", lst2.size() > 0 ? lst2.get(0).page.TOTROW : 0);
        map.put("lstData01", lst);
        map.put("lstData02", lst2);
        return new Gson().toJson(map);
    }

    public List<SQP01061Filter> getList(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01061Filter> lst = new ArrayList<>(0);
        SQP01061Filter filter = new SQP01061Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_DATE = request.getParameter("VP_DATE");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_TAXCODE = request.getParameter("VP_TAXCODE");
            filter.VP_TAXID = request.getParameter("VP_TAXID");
            
            lst = logic.getLoadSQP01061(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<SQP01059Filter> getList2(HttpServletRequest request, List<SQP01061Filter> lst) {
        logic = new TaxesByCodeLogic();
        List<SQP01059Filter> lst2 = new ArrayList<>(0);
        SQP01059Filter filter2 = new SQP01059Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter2.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter2.VP_TAXCODE = lst.get(0).TAXCODE;
            
            lst2 = logic.getLoadSQP01059(filter2);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst2;
    }
    
    @RequestMapping(value = "loadRatesExemptions")
    public @ResponseBody
    String loadRatesExemptions(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TaxesByCode : loadRatesExemptions-------------");
        map.put("success", true);
        List<SQP01072Filter> lst = this.getListRates(request);
        System.out.println("Total Rates: " + lst.size());
        List<SQP01073Filter> lst2 = this.getListExemptions(request);
        System.out.println("Total Exemptions: " + lst2.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("total2", lst2.size() > 0 ? lst2.get(0).page.TOTROW : 0);
        map.put("lstData01", lst);
        map.put("lstData02", lst2);
        return new Gson().toJson(map);
    }
    
    public List<SQP01072Filter> getListRates(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01072Filter> lst = new ArrayList<>(0);
        SQP01072Filter filter = new SQP01072Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_DATE = request.getParameter("VP_DATE");
            filter.VP_TAXCODE = request.getParameter("VP_TAXCODE");
            filter.VP_TAXID = request.getParameter("VP_TAXID");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_AIRPORT = request.getParameter("VP_AIRPORT");
            
            lst = logic.getLoadSQP01072(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }
    
    public List<SQP01073Filter> getListExemptions(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01073Filter> lst2 = new ArrayList<>(0);
        SQP01073Filter filter2 = new SQP01073Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter2.VP_DATE = request.getParameter("VP_DATE");
            filter2.VP_AIRPORT = request.getParameter("VP_AIRPORT");
            filter2.VP_TAXCODE = request.getParameter("VP_TAXCODE");
            filter2.VP_TAXID = request.getParameter("VP_TAXID");
            
            lst2 = logic.getLoadSQP01073(filter2);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst2;
    }
    
    @RequestMapping(value = "loadAirport")
    public @ResponseBody
    String loadAirport(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TaxesByCode : loadAirport-------------");
        map.put("success", true);
        List<SQP01075Filter> lst = this.getListAirport(request);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstData", lst);
        return new Gson().toJson(map);
    }
    
    public List<SQP01075Filter> getListAirport(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01075Filter> lst = new ArrayList<>(0);
        SQP01075Filter filter = new SQP01075Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            
            lst = logic.getLoadSQP01075(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "loadSegment")
    public @ResponseBody
    String loadSegment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TaxesByCode : loadSegment-------------");
        map.put("success", true);
        List<SQP01076Filter> lst = this.getListDepartue(request);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstData", lst);
        return new Gson().toJson(map);
    }
    
    public List<SQP01076Filter> getListDepartue(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01076Filter> lst = new ArrayList<>(0);
        SQP01076Filter filter = new SQP01076Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_AIRPORT = request.getParameter("VP_AIRPORT");
            
            lst = logic.getLoadSQP01076(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "loadSegment_a")
    public @ResponseBody
    String loadSegment_a(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TaxesByCode : loadSegment_a-------------");
        map.put("success", true);
        List<SQP01086Filter> lst = this.getListArrival(request);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lstData", lst);
        return new Gson().toJson(map);
    }
    
    public List<SQP01086Filter> getListArrival(HttpServletRequest request) {
        logic = new TaxesByCodeLogic();
        List<SQP01086Filter> lst = new ArrayList<>(0);
        SQP01086Filter filter = new SQP01086Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_AIRPORT = request.getParameter("VP_AIRPORT");
            
            lst = logic.getLoadSQP01086(filter);
        } catch (Exception e) {
            System.err.print("---> " + e.getMessage());
            System.out.println("---> " + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }
    
}
