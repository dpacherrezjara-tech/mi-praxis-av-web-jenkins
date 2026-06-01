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
import static java.lang.String.format;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankReconciliationLogic;
import net.miatech.praxis.logic.payments.LoadConciliationLogic;
import net.miatech.praxis.logic.payments.ViewADMLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2295Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
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
import org.apache.poi.ss.usermodel.DataFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import org.apache.poi.ss.usermodel.CreationHelper;

/**
 *
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/ViewADM")
public class ViewADMController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ViewADMLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ViewADM/form_index";
    }
    
// maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Conciliation Manual : Search-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getList(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON 
    }

    public List<A2295Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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
            lst = logic.loadPX644SQPMPF100ADM(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // DEVILVE LA LISTA
    }
    
    
  // maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros
  
  @RequestMapping(value = "searchMainDay")
    public @ResponseBody
    String searchMainDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Conciliation Manual : searchMainDay-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListMainDay(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON 
    }

    public List<A2295Filter> getListMainDay(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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
            lst = logic.loadPX290MPS077_MONTH(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // DEVUELVE LA LISTA
    }  
    
    
// maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros
    
    @RequestMapping(value = "searchDetCountryByF")
    public @ResponseBody
    String searchDetCountryByF(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetCountryByF-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetCountryByF(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    
    public List<A2295Filter> getListDetCountryByF(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_COUNTRYBYF(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }
    
    
     @RequestMapping(value = "searchDetCardByF")
    public @ResponseBody
    String searchDetCardByF(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetCountryByF-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetCardByF(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    
    public List<A2295Filter> getListDetCardByF(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_CARDBYF(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }
    // maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros

    @RequestMapping(value = "searchDetDetailByF")
    public @ResponseBody
    String searchDetDetailByF(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetDetailByF-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetDetailByF(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    
    public List<A2295Filter> getListDetDetailByF(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_DETAILBYF(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }
    
    @RequestMapping(value = "searchDetailByEyes")
    public @ResponseBody
    String searchDetailByEyes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetailByEyes-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetDetailByEyes(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    
    public List<A2295Filter> getListDetDetailByEyes(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_DETAILBYEYES(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }
    
    @RequestMapping(value = "searchDetailByEyesCountry")
    public @ResponseBody
    String searchDetailByEyesCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetailByEyesCountry-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetDetailByEyesCountry(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    
    public List<A2295Filter> getListDetDetailByEyesCountry(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_DETAILBYEYESCOUNTRY(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }
    
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : Search-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetail(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

        //recibe dos parámetros: una solicitud URL
    public List<A2295Filter> getListDetail(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX644SQPMPF100ADM_DET(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; //RETORNA LA LISTA
    }
    
    // maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros

    @RequestMapping(value = "searchDetailByF")
    public @ResponseBody
    String searchDetailByF(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetailByF-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetailByF(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }
    //recibe dos parámetros: una solicitud URL
    public List<A2295Filter> getListDetailByF(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString"); 
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX290MPS077_DET_BYF(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; //RETORNA LISTA
    }
    
    // maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros

    @RequestMapping(value = "searchDetailByD")
    public @ResponseBody
    String searchDetailByD(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetailByD-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetailByD(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }
    
    //recibe dos parámetros: una solicitud URL
    public List<A2295Filter> getListDetailByD(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString"); 
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX290MPS077_DET_BYD(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; // RETORNA LA LISTA
    }

    // maneja solicitudes dirigidas a la URL search, obtiene una lista de filtros

    @RequestMapping(value = "searchDetailByS")
    public @ResponseBody
    String searchDetailByS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchDetailByD-------------");

        map.put("success", true);
        List<A2295Filter> lst = this.getListDetailByS(request, false); // LLAMA AL METODO GETLIST PARA OBTENER UNA LISTA DE OBJETOS
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map); // CONVIERTE EL MODELMAP A UNA CADENA JSON
    }

    //recibe dos parámetros: una solicitud URL
    public List<A2295Filter> getListDetailByS(HttpServletRequest request, Boolean bExcel) {

        List<A2295Filter> lst = new ArrayList<>(0); // INICIA UNA LISTA VACIA
        A2295Filter filter = new A2295Filter();
        Gson gson = new Gson();
        String beanString = ""; // INICIA UNA CADENA VACIAS QUE SE UTILIZARA

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString"); 
            filter = gson.fromJson(beanString, A2295Filter.class); // CONVIERTE EL BEANSTRING DEL GSON A OBJETO
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

            lst = logic.loadPX290MPS077_DET_BYS(filter); // LLAMA AL METODO LOGIC CON LOS FILTROS CONFIGURADOS
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst; //RETORNA LA LISTA
    }
    
    @RequestMapping(value = "/obtainMessages")
    public @ResponseBody
    String obtainMessages(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX644SQPMPF100ADM_MSSG(filter);

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
    
      @RequestMapping(value = "searchBeanTkt")
    public @ResponseBody
    String searchBeanTkt(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewADM : searchBeanTkt-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListBeanTkt(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListBeanTkt(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX644SQPMPF100ADM_BEANTKT_V1(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        System.out.println("lst");
        return lst;
    }
    
    
    
    @RequestMapping(value = "executeOptionTkt")
    public @ResponseBody
    String executeOptionTkt(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ViewADM : executeOptionTkt-------------");
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
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX644SQPMPF100ADM_EXECUTION(filterList, user);
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

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX644SQPMPF100ADM_REVERSE(filterList, user);

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
    
    @RequestMapping(value = "cleanTktOption")
    public @ResponseBody
    String cleanTktOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ViewADM : cleanTktOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {


            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            
            
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);


            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX644SQPMPF100CLEAN_TKT(filterList, user);

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
    
    @RequestMapping(value = "generateSecondADM")
    public @ResponseBody
    String generateSecondADM(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ViewADM : generateSecondADM-------------");
        String option;
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {


            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);


            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX644SQPMPF100GENERATE_SECOND_ADM_V1(filterList, user);

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
    
// EXEL DEL DETALLE 1  Año,MES    
    
    @RequestMapping(value = "getXLSXDetailByEyes")
    public @ResponseBody
    void getXLSXDetailByEyes(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailByEyes");
        String fileNameDownload = String.format("Unpaid Tickets Report - Year month - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2295Filter> listaData = this.getListDetDetailByEyes(request, true);
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




            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Tkt Number");
            CH1_2.setCellValue("Sales Date");
            CH1_3.setCellValue("Send Date");
            CH1_4.setCellValue("Day Diff");
            CH1_5.setCellValue("Agent");
            CH1_6.setCellValue("Country");
            CH1_7.setCellValue("CC.Code");
            CH1_8.setCellValue("CC.Number");
            CH1_9.setCellValue("Author.Code");
            CH1_10.setCellValue("Currency");
            CH1_11.setCellValue("Amount");
            CH1_12.setCellValue("PNR");
            CH1_13.setCellValue("Comment");




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
//            CH2_0.setCellValue("Code");
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Type");
//            CH2_4.setCellValue("Code");
//            CH2_5.setCellValue("Nbr.");
//            CH2_6.setCellValue("Name");
//            CH2_10.setCellValue("Date");
//            CH2_11.setCellValue("Type");
//            CH2_12.setCellValue("Nbr.");
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




                rcell0.setCellValue(listaData.get(vi).strDescStatus);
                rcell1.setCellValue(listaData.get(vi).strTicket);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).DSEND);
                rcell4.setCellValue(listaData.get(vi).DIFFD);
                rcell5.setCellValue(listaData.get(vi).SAGENT);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).SCARCOD);
                rcell8.setCellValue(listaData.get(vi).strDescCard);
                rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                rcell10.setCellValue(listaData.get(vi).SCURRENCY);
                rcell11.setCellValue(listaData.get(vi).SVFOPS);
                rcell12.setCellValue(listaData.get(vi).SPNR);
                rcell13.setCellValue(listaData.get(vi).ERROR);



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

    @RequestMapping(value = "getXLSXDetailByEyesCountry")
    public @ResponseBody
    void getXLSXDetailByEyesCountry(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailByEyesCountry");
        String fileNameDownload = String.format("Unpaid Tickets Report - Year month - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2295Filter> listaData = this.getListDetDetailByEyesCountry(request, true);
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




            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Tkt Number");
            CH1_2.setCellValue("Sales Date");
            CH1_3.setCellValue("Send Date");
            CH1_4.setCellValue("Day Diff");
            CH1_5.setCellValue("Agent");
            CH1_6.setCellValue("Country");
            CH1_7.setCellValue("CC.Code");
            CH1_8.setCellValue("CC.Number");
            CH1_9.setCellValue("Author.Code");
            CH1_10.setCellValue("Currency");
            CH1_11.setCellValue("Amount");
            CH1_12.setCellValue("PNR");
            CH1_13.setCellValue("Comment");




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
//            CH2_0.setCellValue("Code");
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Type");
//            CH2_4.setCellValue("Code");
//            CH2_5.setCellValue("Nbr.");
//            CH2_6.setCellValue("Name");
//            CH2_10.setCellValue("Date");
//            CH2_11.setCellValue("Type");
//            CH2_12.setCellValue("Nbr.");
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




                rcell0.setCellValue(listaData.get(vi).strDescStatus);
                rcell1.setCellValue(listaData.get(vi).strTicket);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).DSEND);
                rcell4.setCellValue(listaData.get(vi).DIFFD);
                rcell5.setCellValue(listaData.get(vi).SAGENT);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).SCARCOD);
                rcell8.setCellValue(listaData.get(vi).strDescCard);
                rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                rcell10.setCellValue(listaData.get(vi).SCURRENCY);
                rcell11.setCellValue(listaData.get(vi).SVFOPS);
                rcell12.setCellValue(listaData.get(vi).SPNR);
                rcell13.setCellValue(listaData.get(vi).ERROR);



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
    
    @RequestMapping(value = "getXLSXDetailByF")
    public @ResponseBody
    void getXLSXDetailByF(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDetailByF");
        String fileNameDownload = String.format("Unpaid Tickets Report - Year month - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2295Filter> listaData = this.getListDetDetailByF(request, true);
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




            CH1_0.setCellValue("Status");
            CH1_1.setCellValue("Tkt Number");
            CH1_2.setCellValue("Sales Date");
            CH1_3.setCellValue("Send Date");
            CH1_4.setCellValue("Day Diff");
            CH1_5.setCellValue("Agent");
            CH1_6.setCellValue("Country");
            CH1_7.setCellValue("CC.Code");
            CH1_8.setCellValue("CC.Number");
            CH1_9.setCellValue("Author.Code");
            CH1_10.setCellValue("Currency");
            CH1_11.setCellValue("Amount");
            CH1_12.setCellValue("PNR");
            CH1_13.setCellValue("Comment");




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
//            CH2_0.setCellValue("Code");
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Type");
//            CH2_4.setCellValue("Code");
//            CH2_5.setCellValue("Nbr.");
//            CH2_6.setCellValue("Name");
//            CH2_10.setCellValue("Date");
//            CH2_11.setCellValue("Type");
//            CH2_12.setCellValue("Nbr.");
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




                rcell0.setCellValue(listaData.get(vi).strDescStatus);
                rcell1.setCellValue(listaData.get(vi).strTicket);
                rcell2.setCellValue(listaData.get(vi).SDATE);
                rcell3.setCellValue(listaData.get(vi).DSEND);
                rcell4.setCellValue(listaData.get(vi).DIFFD);
                rcell5.setCellValue(listaData.get(vi).SAGENT);
                rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell7.setCellValue(listaData.get(vi).SCARCOD);
                rcell8.setCellValue(listaData.get(vi).strDescCard);
                rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                rcell10.setCellValue(listaData.get(vi).SCURRENCY);
                rcell11.setCellValue(listaData.get(vi).SVFOPS);
                rcell12.setCellValue(listaData.get(vi).SPNR);
                rcell13.setCellValue(listaData.get(vi).ERROR);



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
// EXEL DEL DETALLE 2 DIAS

@RequestMapping(value = "getXLSXDetailByS")
    public @ResponseBody
    void getXLSXDetailByS(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Conciliation Manual Report - Date - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2295Filter> listaData = this.getListDetailByS(request, true);
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




            CH1_0.setCellValue("Date");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Concep");
            CH1_3.setCellValue("Ticket");
            CH1_4.setCellValue("Sales Date");
            CH1_5.setCellValue("Card Number");
            CH1_6.setCellValue("Currency");
            CH1_7.setCellValue("Amount");
            CH1_8.setCellValue("Seq.");
            CH1_9.setCellValue("User");




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
//            CH2_0.setCellValue("Code");
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Type");
//            CH2_4.setCellValue("Code");
//            CH2_5.setCellValue("Nbr.");
//            CH2_6.setCellValue("Name");
//            CH2_10.setCellValue("Date");
//            CH2_11.setCellValue("Type");
//            CH2_12.setCellValue("Nbr.");
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




                rcell0.setCellValue(listaData.get(vi).PRDA);
                rcell1.setCellValue(listaData.get(vi).STVAL);
                // Obtenemos el valor actual de STVAL
                String stval = listaData.get(vi).STVAL;
                // Inicializamos una variable para el valor que se va a escribir en la celda
                String valorParaExcel = "";
                // Verificamos el valor de STVAL y asignamos el texto correspondiente
                if ("3".equals(stval)) {
                    valorParaExcel = "Pendiente";
                } else if ("5".equals(stval)) {
                    valorParaExcel = "Match Manual";
                } else {
                    valorParaExcel = stval; // En caso de que no sea ni "3" ni "5", se deja el valor original
                }
                // Asignamos el valor a la celda
                rcell1.setCellValue(valorParaExcel);
                rcell2.setCellValue(listaData.get(vi).FCONCEP);
                // Obtén el valor del campo FCONCEP
                String fconcep = listaData.get(vi).FCONCEP;
                // Realiza la conversión del valor
                String convertedValue;
                if ("I".equals(fconcep)) {
                    convertedValue = "Settlement";
                } else if ("V".equals(fconcep)) {
                    convertedValue = "Ticket";
                } else {
                    convertedValue = fconcep; // Si no es 'I' ni 'V', se mantiene el valor original
                }
                // Asigna el valor convertido a la celda
                rcell2.setCellValue(convertedValue);

                rcell3.setCellValue(listaData.get(vi).TKT);
                rcell4.setCellValue(listaData.get(vi).SDATE);
                rcell5.setCellValue(listaData.get(vi).SCARDN);
                rcell6.setCellValue(listaData.get(vi).SCURRENCY);
                rcell7.setCellValue(listaData.get(vi).SVFOP);
                rcell8.setCellValue(listaData.get(vi).SEQ);
                rcell9.setCellValue(listaData.get(vi).USERF);



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

// EXEL DEL DETALLE 3 DETALLES 
    
@RequestMapping(value = "getXLSXDetailByD")
    public @ResponseBody
    void getXLSXDetailByD(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Conciliation Manual Report - Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2295Filter> listaData = this.getListDetailByD(request, true);
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




            CH1_0.setCellValue("Date");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Concep");
            CH1_3.setCellValue("Ticket");
            CH1_4.setCellValue("Sales Date");
            CH1_5.setCellValue("Card Number");
            CH1_6.setCellValue("Currency");
            CH1_7.setCellValue("Amount");
            CH1_8.setCellValue("Seq.");
            CH1_9.setCellValue("User");




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
//            CH2_0.setCellValue("Code");
//            CH2_1.setCellValue("Date");
//            CH2_2.setCellValue("Type");
//            CH2_4.setCellValue("Code");
//            CH2_5.setCellValue("Nbr.");
//            CH2_6.setCellValue("Name");
//            CH2_10.setCellValue("Date");
//            CH2_11.setCellValue("Type");
//            CH2_12.setCellValue("Nbr.");
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




                rcell0.setCellValue(listaData.get(vi).PRDA);
                rcell1.setCellValue(listaData.get(vi).STVAL);
                // Obtenemos el valor actual de STVAL
                String stval = listaData.get(vi).STVAL;
                // Inicializamos una variable para el valor que se va a escribir en la celda
                String valorParaExcel = "";
                // Verificamos el valor de STVAL y asignamos el texto correspondiente
                if ("3".equals(stval)) {
                    valorParaExcel = "Pendiente";
                } else if ("5".equals(stval)) {
                    valorParaExcel = "Match Manual";
                } else {
                    valorParaExcel = stval; // En caso de que no sea ni "3" ni "5", se deja el valor original
                }
                // Asignamos el valor a la celda
                rcell1.setCellValue(valorParaExcel);

                rcell2.setCellValue(listaData.get(vi).FCONCEP);
                // Obtén el valor del campo FCONCEP
                String fconcep = listaData.get(vi).FCONCEP;
                // Realiza la conversión del valor
                String convertedValue;
                if ("I".equals(fconcep)) {
                    convertedValue = "Settlement";
                } else if ("V".equals(fconcep)) {
                    convertedValue = "Ticket";
                } else {
                    convertedValue = fconcep; // Si no es 'I' ni 'V', se mantiene el valor original
                }
                // Asigna el valor convertido a la celda
                rcell2.setCellValue(convertedValue);

                rcell3.setCellValue(listaData.get(vi).TKT);
                rcell4.setCellValue(listaData.get(vi).SDATE);
                rcell5.setCellValue(listaData.get(vi).SCARDN);
                rcell6.setCellValue(listaData.get(vi).SCURRENCY);
                rcell7.setCellValue(listaData.get(vi).SVFOP);
                rcell8.setCellValue(listaData.get(vi).SEQ);
                rcell9.setCellValue(listaData.get(vi).USERF);



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
    
 @RequestMapping(value = "sendEmail")
    public @ResponseBody
    String sendEmail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- DataRequestedByBank : sendEmail-------------");
        Gson gson = new Gson();
        String fecha = "", fecha_des = "";

        MPF100Filter obj = new MPF100Filter();
        boolean iboolean;
        String msj = "";
        String msjError = "";
        String contactos_BPO = "plopez@miatech.net;monica@miatech.net";

        List<MPF100Filter> listaData;
        List<MPF100Filter> listaData_BPO;
        List<MPF106Filter> listaDataCorreos = new ArrayList<MPF106Filter>(0);;

        try {
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            fecha = request.getParameter("v_fecha");
            if (!fecha.equals("")) {

                fecha_des = Functions.getAbreviaturaMes(fecha.substring(4)) + " " + fecha.substring(0, 4);
                obj.IN_FECHA = fecha;
                listaDataCorreos = logic.loadPX263getCorreosAV(obj);

                if (listaDataCorreos.size() > 0) {

                    int contIatas = 0;
                    for (int j = 0; j < listaDataCorreos.size(); j++) {
                        String correos = ((MPF106Filter) listaDataCorreos.get(j)).EMAILS;
                        String agent = ((MPF106Filter) listaDataCorreos.get(j)).CAGENCY;
                        String agent_name = ((MPF106Filter) listaDataCorreos.get(j)).NAMEA;
                        String contactos = ((MPF106Filter) listaDataCorreos.get(j)).CONTAC;
                        contactos_BPO = ((MPF106Filter) listaDataCorreos.get(j)).EMAILS5;

                        obj.IN_AGENT = agent;
                        //Obtiene la lista de aclaraciones de esa fecha
                        listaData = logic.loadPX263SQP00XXXJT(obj);
//                        listaData_ADJUST = logic.loadPX263SQP00XXXJT2(obj);

                        if (listaData.size() > 0) {

                            String ruta_file = obtenerExcel(listaData, agent_name);
                            //                        String ruta_file_adjust ="";
                            //                        if(listaData_ADJUST.size()>0){
                            //                            ruta_file_adjust = obtenerExcel_Adjust(listaData_ADJUST,agent_name);
                            //                        }

                            //CODIGO DE MAIL Y SU ATTACHMENT
                            ProMail proMail = new ProMail();
                            List<String> receptores = new ArrayList<String>();
                            List<String> adjuntos = new ArrayList<String>();

                            if (!ruta_file.equals("")) {
                                adjuntos.add(ruta_file);
                                //                            if(!ruta_file_adjust.equals("")){
                                //                                adjuntos.add(ruta_file_adjust);   
                                //                            }
                            }
                            // Emails CC
                            List<String> CC = new ArrayList<String>();
                            List<String> Ccp = new ArrayList<String>();

//                            String correosCopia = "carlos.miranda@avianca.com;cheryd.quintero@avianca.com;jose.higuera@avianca.com;monica.zuluaga@avianca.com;carlos.jaimes@avianca.com";
                            String correosCopia = contactos;
                            //                        String correosOcultos = "larango@miatech.net;eneves@miatech.net;jtorres@miatech.net;jsolano@miatech.net";
                            String correosOcultos = "";
                            //                        String emisor = "jtorres@miatech.net";

                            //                        receptores.add(correos);

                            /*Correo Destino*/
                            if (!correos.trim().equals("")) {
                                String[] partsTo = correos.split(";");
                                for (int h = 0; h < partsTo.length; h++) {
                                    if (!partsTo[h].trim().equals("")) {
                                        receptores.add(partsTo[h]);
                                    }
                                }
                            }

                            /*Correo Copia*/
                            if (!correosCopia.trim().equals("")) {
                                String[] partsTo = correosCopia.split(";");
                                for (int h = 0; h < partsTo.length; h++) {
                                    CC.add(partsTo[h]);
                                }
                            }

                            /*Correo oculto*/
                            if (!correosOcultos.trim().equals("")) {
                                String[] parts = correosOcultos.split(";");
                                for (int i = 0; i < parts.length; i++) {
                                    Ccp.add(parts[i]);
                                }
                            }
                            String asunto = "Gestión de inconsistencias en conciliación de ventas en Tarjetas de Crédito  " + Functions.getFechaActual();
                            String mensaje = "<p>Estimados miembros de agencia de viajes:</p>\n"
                                    + "<p>Les brindamos inicialmente un cordial saludo</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Continuando con nuestro proceso de conciliaci&oacute;n de pagos de tiquetes con forma de pago tarjeta de cr&eacute;dito, adjuntamos los tiquetes "
                                    + "definitivos pendientes de pago que corresponden a las ventas realizadas con tarjeta de cr&eacute;dito por su Agencia en el mes "
                                    + "de <strong><strong>" + fecha_des + "</strong></strong><strong><strong>&nbsp;</strong></strong>y hemos encontrado diferencias entre el valor facturado por ustedes y "
                                    + "el valor ingresado en nuestras cuentas bancarias (total resaltado en color amarillo),&nbsp;por lo cual de manera muy respetuosa solicitamos a ustedes enviarnos "
                                    + "la informaci&oacute;n correspondiente al n&uacute;mero de autorizaci&oacute;n, as&iacute; como la fecha de expedici&oacute;n de &eacute;ste y el "
                                    + "valor<strong><strong>&nbsp;</strong></strong><strong><strong>EXACTO</strong></strong>&nbsp;del pago, esto con el fin de corroborar esta informaci&oacute;n y "
                                    + "realizar una correcta conciliaci&oacute;n.</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Luego, si da a lugar solicitaremos el soporte de pago.</p>\n"
                                    + "<p><strong><strong>&nbsp;</strong></strong></p>\n"
                                    + "<p><strong><strong>FAVOR DILIGENCIAR LOS DATOS EN EL MISMO FORMATO </strong></strong>y responder al "
                                    + "correo&nbsp;<a href=\"mailto:conciliacionventastc@avianca.com\"><u>conciliacionventastc@avianca.com</u></a>&nbsp;con copia "
                                    + "a: <a href=\"mailto:cheryd.quintero@avianca.com\"><u>cheryd.quintero@avianca.com</u></a>&nbsp;"
                                    + "<a href=\"mailto:jose.higuera@avianca.com\"><u>jose.higuera@avianca.com</u></a>&nbsp;<a href=\"mailto:monica.zuluaga@avianca.com\"><u>monica.zuluaga@avianca.com</u></a>"
                                    + "&nbsp;<a href=\"mailto:carlos.jaimes@avianca.com\"><u>carlos.jaimes@avianca.com</u></a>. D<strong><strong>e encontrar tiquetes los cuales no hayan "
                                    + "sido cancelados, solicitamos su legalizaci&oacute;n de forma inmediata mediante&nbsp;la confirmaci&oacute;n del cobro mediante BSP - nota de cargo respondiendo en este "
                                    + "mismo correo.</strong></strong></p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Muchas gracias y quedamos atentos a su respuesta,&nbsp;la cual agradezco sea <strong><strong>enviada dentro de los pr&oacute;ximos 5 "
                                    + "d&iacute;as h&aacute;biles</strong></strong><strong><strong>,</strong></strong><strong><strong>&nbsp;</strong></strong>esto con el fin de estar al "
                                    + "d&iacute;a con las auditor&iacute;as, caso contrario se entender&aacute; que las transacciones est&aacute;n <strong><strong>pendientes de pago y se "
                                    + "elaborar&aacute; la respectiva nota de cargo.&nbsp;</strong></strong></p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Como informaci&oacute;n general y con el fin de evitar reprocesos de ambas partes,&nbsp;antes de enviar la respuesta definitiva&nbsp;en cuanto a los "
                                    + "soportes&nbsp;de pago de los tiquetes solicitados, agradecemos que la agencia tenga en cuenta las siguientes recomendaciones:</p>\n"
                                    + "<ul>\n"
                                    + "<li>Revisar que los voucher que env&iacute;an como soporte de pago sean direccionados a Avianca y si por error no fue as&iacute;,&nbsp;aprobar el "
                                    + "ADM y solicitar la nota de abono a la aerol&iacute;nea a la cual fue direccionado el pago.</li>\n"
                                    + "<li>No se pueden aceptar pagos diferentes a la fecha de la expedici&oacute;n del tiquete m&aacute;ximo al d&iacute;a siguiente,&nbsp;no se aceptar&aacute;n pagos "
                                    + "del mes posterior o anterior.</li>\n"
                                    + "<li>Que los valores de los voucher coincidan con el valor total de los tiquetes.</li>\n"
                                    + "<li>Los dat&aacute;fonos de Credibanco no pueden recibir Master Card,&nbsp;solo se hacen a trav&eacute;s de Redeban,&nbsp;para estos casos revisar en sus "
                                    + "extractos ya que la franquicia abona estas transacciones a la agencia y por consiguiente tambi&eacute;n se generar&iacute;a la nota de cargo por los tiquetes "
                                    + "que est&eacute;n amparados por estas transacciones.</li>\n"
                                    + "<li>Cuando se comete un error al expedir una MPD o tiquete,&nbsp;no existe otra soluci&oacute;n que generar&nbsp;la ADM&nbsp;a la agencia ya que no se pueden "
                                    + "alterar los valores en Rapid a no ser que sean detectados el mismo d&iacute;a para que sean corregidos por la agencia,&nbsp;de lo contrario se debe cancelar "
                                    + "la ADM y solicitar el reembolso y/o ACM seg&uacute;n corresponda.</li>\n"
                                    + "<li>Verificar que&nbsp;los soportes que env&iacute;an no&nbsp;hayan presentado anulaci&oacute;n no satisfactoria,&nbsp;porque de ser as&iacute; no se pueden "
                                    + "tomar para cancelar tiquetes pendientes y por ende se genera la nota de cargo.</li>\n"
                                    + "</ul>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Cordial saludo,</p>\n"
                                    + "<img src=\"cid:logo\" />";
                            iboolean = proMail.enviaCorreoAV("", asunto, receptores, CC, Ccp, mensaje, adjuntos, this.serverSession.getServerSession());

                            if (iboolean) {
                                //resp.info.add("Email Sent.");
                                contIatas += 1;
                                msj += " Email Sent.";

                                String msj_marca = logic.marcarTicketsEnviados(obj);
                                if (!msj_marca.equals("OK")) {
                                    msjError = msjError + "-" + obj.IN_AGENT;
                                }
                            } else {
                                //resp.info.add("Could not send email!");
                                msj += " Could not send email.Reporter to the systems area";
                                break;
                            }

                            /*Eliminamos archivo temporal*/
                            File file = new File(ruta_file);
                            if (file.exists()) {
                                file.delete();
                            }
                            //                        File file2 = new File(ruta_file_adjust);
                            //                        if (file2.exists()) {
                            //                            file2.delete();
                            //                        }

                        }
                    }

                    msj = contIatas + " Email Sent.";
                    if (!msjError.equals("")) {
                        msj = msj + "Revisar:" + msjError;
                    }

                } else {
                    msj = "No existe información para enviar.";
                }

                System.out.println("Se enviara a bpo");

                listaData_BPO = logic.loadPX263SQP00XXXJT3(obj);
                if (listaData_BPO.size() > 0) {
                    String msjBPO = obtenerExcel_BPO_enviarCorreo(listaData_BPO, fecha, contactos_BPO);
                    if (!msjBPO.equals("OK")) {
                        msj = msj + ".Revisar Correo Bpo.";
                    }
                }
            } else {
                msj = "No se selecciono fecha.";
            }

            map.put("msj", msj);
            map.put("success", true);
        } catch (Exception ex) {
            logError.error("An error ocurred, pleas try again later.");
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    public String obtenerExcel(List<MPF100Filter> listaData, String agent_name) {

        DecimalFormat df = new DecimalFormat("#,###,###.00");
        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');
        df.setDecimalFormatSymbols(otherSymbols);

        String fileNameDownload = String.format("Auditoria Agencias - " + agent_name + " -" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String ruta = "";
        try {
            ruta = "C:\\Dumps\\" + fileNameDownload;
            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
            File file = new File(ruta);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Auditoria");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            CellStyle bodyStyle_amt = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            bodyStyle.setAlignment(CellStyle.ALIGN_CENTER);

            bodyStyle_amt.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle_amt.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle_amt.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle_amt.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle_amt.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setAlignment(CellStyle.ALIGN_RIGHT);
            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00")); // Formato numérico con dos decimales y separador de miles        

            // </editor-fold>
            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Estado");
            Cell CH1_01 = row.createCell(0);
            CH1_01.setCellValue("IATA");
            Cell CH1_02 = row.createCell(1);
            CH1_02.setCellValue("DIG IATA");
            Cell CH1_03 = row.createCell(2);
            CH1_03.setCellValue("AGENCIA");
            Cell CH1_04 = row.createCell(3);
            CH1_04.setCellValue("TIQUETE");
            Cell CH1_05 = row.createCell(4);
            CH1_05.setCellValue("TIPO");
            Cell CH1_06 = row.createCell(5);
            CH1_06.setCellValue("FECHA VENTA");
            Cell CH1_07 = row.createCell(6);
            CH1_07.setCellValue("TARJETA CREDITO");
            Cell CH1_08 = row.createCell(7);
            CH1_08.setCellValue("AUT");
            Cell CH1_09 = row.createCell(8);
            CH1_09.setCellValue("VALOR");
            /**/
            Cell CH1_10 = row.createCell(9);
            CH1_10.setCellValue("FECHA");
            Cell CH1_11 = row.createCell(10);
            CH1_11.setCellValue("AUTORIZACION");
            Cell CH1_12 = row.createCell(11);
            CH1_12.setCellValue("VALOR");
            Cell CH1_13 = row.createCell(12);
            CH1_13.setCellValue("OBSERVACIONES");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

//            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

            /**
             * ********************
             */
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
            ++vj;

//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            CH2_03.setCellValue("Relation");
//            Cell CH2_04 = row2.createCell(4);
//            CH2_04.setCellValue("Description");
//            Cell CH2_05 = row2.createCell(5);
//            CH2_05.setCellValue("Des.English");
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Des.Portuguese");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Des.French");
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(0);
                Cell cell52 = row.createCell(1);
                Cell cell53 = row.createCell(2);
                Cell cell54 = row.createCell(3);
                Cell cell55 = row.createCell(4);
                Cell cell56 = row.createCell(5);
                Cell cell57 = row.createCell(6);
                Cell cell58 = row.createCell(7);
                Cell cell59 = row.createCell(8);
                Cell cell60 = row.createCell(9);
                Cell cell61 = row.createCell(10);
                Cell cell62 = row.createCell(11);
                Cell cell63 = row.createCell(12);

//                cell50.setCellValue(listaData.get(vi).STVAL);
                cell51.setCellValue(listaData.get(vi).SAGENT);
                cell52.setCellValue(listaData.get(vi).DIG_AGENT);
                cell53.setCellValue(listaData.get(vi).strDescripcion);
                cell54.setCellValue(listaData.get(vi).CCIA + listaData.get(vi).FORMA + listaData.get(vi).SERIE);
                cell55.setCellValue("");
                cell56.setCellValue(listaData.get(vi).SDATE);
                cell57.setCellValue(listaData.get(vi).SCARDN);
                cell58.setCellValue(listaData.get(vi).SAUTHOC);
//                cell59.setCellValue(df.format(listaData.get(vi).SVFOP));
                cell59.setCellValue(listaData.get(vi).SVFOP);
                cell60.setCellValue("");
                cell61.setCellValue("");
                cell62.setCellValue("");
                cell63.setCellValue("");

//                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle_amt);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);

                /**
                 * ********************
                 */
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
                // </editor-fold>
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
//            sheet.autoSizeColumn(13, true);

            // Escritura del contenido en el archivo Excel
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();

        } catch (Exception e) {
            ruta = "";
            e.printStackTrace();
            throw new SpringException(e);
        }

        return ruta;
    }
    
    public String obtenerExcel_BPO_enviarCorreo(List<MPF100Filter> listaData, String fecha, String contactos_BPO) {
        String Mensaje = "";
        DecimalFormat df = new DecimalFormat("#,###,###.00");
        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');
        df.setDecimalFormatSymbols(otherSymbols);

        String fileNameDownload = String.format("Correos Faltante Fecha de Venta - " + fecha + "_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String ruta = "";
        try {
            ruta = "C:\\Dumps\\" + fileNameDownload;
            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
            File file = new File(ruta);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Agent");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            CellStyle bodyStyle_amt = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            bodyStyle.setAlignment(CellStyle.ALIGN_CENTER);

            bodyStyle_amt.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle_amt.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle_amt.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle_amt.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle_amt.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setAlignment(CellStyle.ALIGN_RIGHT);

            // </editor-fold>
            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Type Doc");
            Cell CH1_01 = row.createCell(0);
            CH1_01.setCellValue("Agent");
            Cell CH1_02 = row.createCell(1);
            CH1_02.setCellValue("Name");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));

//            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);

            /**
             * ********************
             */
            /*SE AUMENTA 2 PARA COMENZAR A ESCRIBIR  A PARTIR DE LA 3ERA FILA*/
            ++vj;
            ++vj;

            // </editor-fold>
            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);

                cell50.setCellValue(listaData.get(vi).SAGENT);
                cell51.setCellValue(listaData.get(vi).strDescripcion);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);

                /**
                 * ********************
                 */
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(14, true);

            // Escritura del contenido en el archivo Excel
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();

        } catch (Exception e) {
            ruta = "";
            e.printStackTrace();
            throw new SpringException(e);
        }

        if (!ruta.equals("")) {

            boolean iboolean;
            String ruta_file = ruta;
            //CODIGO DE MAIL Y SU ATTACHMENT
            ProMail proMail = new ProMail();
            List<String> receptores = new ArrayList<String>();
            List<String> adjuntos = new ArrayList<String>();

            if (!ruta_file.equals("")) {
                adjuntos.add(ruta_file);
//                            if(!ruta_file_adjust.equals("")){
//                                adjuntos.add(ruta_file_adjust);   
//                            }
            }
            // Emails CC
            List<String> CC = new ArrayList<String>();
            List<String> Ccp = new ArrayList<String>();

            String correos_BPO = contactos_BPO;
//            String correos="jtorres@miatech.net";
            String correosCopia = "jtorres@miatech.net";
//                        String correosOcultos = "larango@miatech.net;eneves@miatech.net;jtorres@miatech.net;jsolano@miatech.net";
            String correosOcultos = "";

            /*Correo Destino*/
            if (!correos_BPO.trim().equals("")) {
                String[] partsTo = correos_BPO.split(";");
                for (int h = 0; h < partsTo.length; h++) {
                    if (!partsTo[h].trim().equals("")) {
                        receptores.add(partsTo[h]);
                    }
                }
            }

            /*Correo Copia*/
            if (!correosCopia.trim().equals("")) {
                String[] partsTo = correosCopia.split(";");
                for (int h = 0; h < partsTo.length; h++) {
                    CC.add(partsTo[h]);
                }
            }

            /*Correo oculto*/
            if (!correosOcultos.trim().equals("")) {
                String[] parts = correosOcultos.split(";");
                for (int i = 0; i < parts.length; i++) {
                    Ccp.add(parts[i]);
                }
            }
            String asunto = "Correos faltantantes " + Functions.getFechaActual();
            String mensaje = "<p>Estimados,</p>\n"
                    + "<p>Se Adjunta relaci&oacute;n de agentes sin correo para la fecha de venta : " + fecha + ".</p>\n"
                    + "<p>Favor completar informaci&oacute;n de correo para el proceso de env&iacute;o&nbsp;a las agencias.</p>"
                    + "<p>Saludos,</p>\n"
                    + "<img src=\"cid:logoM\" />"
                    + "<p>&nbsp;</p>"
                    + "<p>&nbsp; Miami Technology Group inc.</p>\n"
                    + "<div><strong>&nbsp; </strong><strong>Rep&uacute;blica</strong><strong>&nbsp;de&nbsp;</strong><strong>Panam&aacute;</strong><strong>&nbsp;3030 - San Isidro, Lima Per&uacute;</strong></div>\n";
            iboolean = proMail.enviaCorreoMiatech("", asunto, receptores, CC, Ccp, mensaje, adjuntos, this.serverSession.getServerSession());

            if (iboolean) {
                Mensaje = "OK";
            }

            /*Eliminamos archivo temporal*/
            File file = new File(ruta_file);
            if (file.exists()) {
                file.delete();
            }

        }

        return Mensaje;
    }
    
    
    @RequestMapping(value = "getXLSXReportADM")
    public @ResponseBody
    void getXLSXReportADM(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXDetailByEyes");
        A2295Filter filter = new A2295Filter();
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        String typeMovement = "";
        if(filter.SCOUNTRY.equals("CO")){
            typeMovement = "Operaciones Bancarias CO";
        }else{
            typeMovement = "Operaciones Bancarias";
        }
        String fileNameDownload = String.format("Unpaid Tickets Report - " + filter.SDATE.trim() +  " - " + filter.CCUST.trim() + " - " + filter.SCOUNTRY.trim() + " - " + filter.CFUENTE.trim() + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            ViewADMLogic logic = new ViewADMLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            List<A2295Filter> listaData = logic.loadPX644SQPMPF100ADM_REPORT(filter);
            List<A2295Filter> listaData2 = logic.loadPX644SQPMPF100ADM_REPORT_2(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            
            Sheet sheet2 = workbook.createSheet("Header");
            XSSFCellStyle headerStyle2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle21 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle2 = workbook.createCellStyle();
            CellStyle cellStyleDate = workbook.createCellStyle();
            CreationHelper creationHelper = workbook.getCreationHelper();
            cellStyleDate.setDataFormat(creationHelper.createDataFormat().getFormat("dd/MM/yyyy"));
            Font headerFont2 = workbook.createFont();
            Font headerFont21 = workbook.createFont();
            headerFont2.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont2.setColor(IndexedColors.YELLOW.getIndex());
            headerFont21.setColor(IndexedColors.WHITE.getIndex());
            headerStyle2.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle2.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle2.setFillForegroundColor(new XSSFColor(new java.awt.Color(153, 153, 255)));
            headerStyle2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle21.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle21.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle21.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle21.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle21.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle21.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle21.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle21.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle21.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle21.setFillForegroundColor(new XSSFColor(new java.awt.Color(153, 153, 255)));
            headerStyle21.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle21.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle2.setFont(headerFont2);
            headerStyle21.setFont(headerFont21);
            bodyStyle2.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle2.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle2.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle2.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            DataFormat format = workbook.createDataFormat();
            CellStyle decimalStyle = workbook.createCellStyle();
            decimalStyle.setDataFormat(format.getFormat("0.00"));
            Integer vi2 = 0;
            Integer vj2 = 0; //Almacena el numero de fila
            Iterator iter2 = listaData.iterator();
            
            Row row2 = sheet2.createRow(vj2);
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

            
            CH2_0.setCellValue("ID");
            CH2_1.setCellValue("Tipo de Documento");
            CH2_2.setCellValue("Codigo Aerolinea");
            CH2_3.setCellValue("Codigo IATA");
            CH2_4.setCellValue("Tipo de Movimiento");
            CH2_5.setCellValue("Numero de Informe");
            CH2_6.setCellValue("Fecha de vuelo");
            CH2_7.setCellValue("Fecha informe desde");
            CH2_8.setCellValue("Fecha informe hasta");
            CH2_9.setCellValue("Origen de Vuelo");
            CH2_10.setCellValue("Destino de Vuelo");
            CH2_11.setCellValue("Tipo de Ruta");
            CH2_12.setCellValue("Tipo de Viaje");
            CH2_13.setCellValue("No concepto");
            CH2_14.setCellValue("Moneda");
            CH2_15.setCellValue("Monto ACM/ADM");
            CH2_16.setCellValue("Penalidad ACM/ADM");
            CH2_17.setCellValue("Admin Fee");
            CH2_18.setCellValue("Iva del Fare");
            CH2_19.setCellValue("Cesantia");
            CH2_20.setCellValue("requiere soporte?");
            CH2_21.setCellValue("Codigo Empleado Responsable");
            CH2_22.setCellValue("Nombre Empleado Responsable");
            CH2_23.setCellValue("Notas Aclaratorias");


            CH2_0.setCellStyle(headerStyle2);
            CH2_1.setCellStyle(headerStyle2);
            CH2_2.setCellStyle(headerStyle2);
            CH2_3.setCellStyle(headerStyle2);
            CH2_4.setCellStyle(headerStyle2);
            CH2_5.setCellStyle(headerStyle2);
            CH2_6.setCellStyle(headerStyle21);
            CH2_7.setCellStyle(headerStyle2);
            CH2_8.setCellStyle(headerStyle2);
            CH2_9.setCellStyle(headerStyle21);
            CH2_10.setCellStyle(headerStyle21);
            CH2_11.setCellStyle(headerStyle2);
            CH2_12.setCellStyle(headerStyle2);
            CH2_13.setCellStyle(headerStyle2);
            CH2_14.setCellStyle(headerStyle2);
            CH2_15.setCellStyle(headerStyle21);
            CH2_16.setCellStyle(headerStyle21);
            CH2_17.setCellStyle(headerStyle21);
            CH2_18.setCellStyle(headerStyle21);
            CH2_19.setCellStyle(headerStyle21);
            CH2_20.setCellStyle(headerStyle21);
            CH2_21.setCellStyle(headerStyle21);
            CH2_22.setCellStyle(headerStyle21);
            CH2_23.setCellStyle(headerStyle2);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet2.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));




            ++vj2;
            
            //============================================

            while (iter2.hasNext()) {
                row2 = sheet2.createRow(vj2);
                Cell rcell20 = row2.createCell(0);
                Cell rcell21 = row2.createCell(1);
                Cell rcell22 = row2.createCell(2);
                Cell rcell23 = row2.createCell(3);
                Cell rcell24 = row2.createCell(4);
                Cell rcell25 = row2.createCell(5);
                Cell rcell26 = row2.createCell(6);
                Cell rcell27 = row2.createCell(7);
                Cell rcell28 = row2.createCell(8);
                Cell rcell29 = row2.createCell(9);
                Cell rcell210 = row2.createCell(10);
                Cell rcell211 = row2.createCell(11);
                Cell rcell212 = row2.createCell(12);
                Cell rcell213 = row2.createCell(13);
                Cell rcell214 = row2.createCell(14);
                Cell rcell215 = row2.createCell(15);
                Cell rcell216 = row2.createCell(16);
                Cell rcell217 = row2.createCell(17);
                Cell rcell218 = row2.createCell(18);
                Cell rcell219 = row2.createCell(19);
                Cell rcell220 = row2.createCell(20);
                Cell rcell221 = row2.createCell(21);
                Cell rcell222 = row2.createCell(22);
                Cell rcell223 = row2.createCell(23);




                rcell20.setCellValue(listaData.get(vi2).RN);
                rcell21.setCellValue("ADM");
                rcell22.setCellValue(listaData.get(vi2).CCIA);
                rcell23.setCellValue(listaData.get(vi2).SAGENT);
                rcell24.setCellValue(typeMovement);
                rcell25.setCellValue(Integer.parseInt(listaData.get(vi2).IN_DATE_FROM.substring(4,6)));
                rcell26.setCellValue(listaData.get(vi2).A720FVLO1);
                
                Date fechaDate = dateFormat.parse(convertirFecha(listaData.get(vi2).IN_DATE_FROM));  // Convertir String a Date
                rcell27.setCellValue(fechaDate);
                rcell27.setCellStyle(cellStyleDate);
                Date fechaDate2 = dateFormat.parse(convertirFecha(listaData.get(vi2).IN_DATE_TO)); 
                rcell28.setCellValue(fechaDate2);
                rcell28.setCellStyle(cellStyleDate);
                rcell29.setCellValue(listaData.get(vi2).A720RUTA0);
                rcell210.setCellValue(listaData.get(vi2).A720RUTA1);
                rcell211.setCellValue(listaData.get(vi2).ROUTETYPE);
                rcell212.setCellValue(listaData.get(vi2).TYPETRAVEL);
                rcell213.setCellValue("Inconsistencia en pago con tarjetas de credito");
                rcell214.setCellValue(listaData.get(vi2).SCURRENCY);
                rcell215.setCellValue(0.00);
                rcell215.setCellStyle(decimalStyle);
                rcell216.setCellValue(0.00);
                rcell216.setCellStyle(decimalStyle);
                rcell217.setCellValue(0.00);
                rcell217.setCellStyle(decimalStyle);
                rcell218.setCellValue(0.00);
                rcell218.setCellStyle(decimalStyle);
                rcell219.setCellValue(0.00);
                rcell219.setCellStyle(decimalStyle);
                rcell220.setCellValue("N");
                rcell221.setCellValue("");
                rcell222.setCellValue("");
                rcell223.setCellValue(listaData.get(vi2).TYPEADJ);



                iter2.next();
                ++vi2;
                ++vj2;
            }

            sheet2.autoSizeColumn(0, true);
            sheet2.autoSizeColumn(1, true);
            sheet2.autoSizeColumn(2, true);
            sheet2.autoSizeColumn(3, true);
            sheet2.autoSizeColumn(4, true);
            sheet2.autoSizeColumn(5, true);
            sheet2.autoSizeColumn(6, true);
            sheet2.autoSizeColumn(7, true);
            sheet2.autoSizeColumn(8, true);
            sheet2.autoSizeColumn(9, true);
            sheet2.autoSizeColumn(10, true);
            sheet2.autoSizeColumn(11, true);
            sheet2.autoSizeColumn(12, true);
            sheet2.autoSizeColumn(13, true);
            sheet2.autoSizeColumn(14, true);
            sheet2.autoSizeColumn(15, true);
            sheet2.autoSizeColumn(16, true);
            sheet2.autoSizeColumn(17, true);
            sheet2.autoSizeColumn(18, true);
            sheet2.autoSizeColumn(19, true);
            sheet2.autoSizeColumn(20, true);
            sheet2.autoSizeColumn(21, true);
            sheet2.autoSizeColumn(22, true);
            sheet2.autoSizeColumn(23, true);
            
            
            Sheet sheet = workbook.createSheet("Ticket");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle headerStyle11 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            Font headerFont11 = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerFont11.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 215, 247)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle11.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle11.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle11.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle11.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle11.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle11.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle11.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 215, 247)));
            headerStyle11.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle11.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            headerStyle11.setFont(headerFont11);
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


            
            CH1_0.setCellValue("ID");
            CH1_1.setCellValue("Codigo Aerolinea Ticket");
            CH1_2.setCellValue("Numero Ticket");
            CH1_3.setCellValue("Numero Cupon");
            CH1_4.setCellValue("Clase de Tarifa");
            CH1_5.setCellValue("Tarifa");
            CH1_6.setCellValue("Penalidad");
            CH1_7.setCellValue("Comision Ticket");
            CH1_8.setCellValue("Admin Fee");
            CH1_9.setCellValue("Iva del Fare");
            CH1_10.setCellValue("Cesantia");



            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle11);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle11);
            CH1_10.setCellStyle(headerStyle11);




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






                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).CCIA);
                rcell2.setCellValue(listaData.get(vi).FORMA + listaData.get(vi).SERIE);
                rcell3.setCellValue(""+ 1);
                rcell4.setCellValue(listaData.get(vi).A720FBUSO1);
                rcell5.setCellValue(listaData.get(vi).SVFOPS);
                rcell5.setCellStyle(decimalStyle);
                rcell6.setCellValue(0.00);
                rcell6.setCellStyle(decimalStyle);
                rcell7.setCellValue(0.00);
                rcell7.setCellStyle(decimalStyle);
                rcell8.setCellValue(0.00);
                rcell8.setCellStyle(decimalStyle);
                rcell9.setCellValue(0.00);
                rcell9.setCellStyle(decimalStyle);
                rcell10.setCellValue(0.00);
                rcell10.setCellStyle(decimalStyle);



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

            
            Sheet sheet3 = workbook.createSheet("Taxes");
            XSSFCellStyle headerStyle3 = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle3 = workbook.createCellStyle();
            Font headerFont3 = workbook.createFont();
            headerFont3.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont3.setColor(IndexedColors.WHITE.getIndex());
            headerStyle3.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle3.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle3.setFillForegroundColor(new XSSFColor(new java.awt.Color(223, 127, 127)));
            headerStyle3.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle3.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle3.setFont(headerFont3);
            bodyStyle3.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle3.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle3.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle3.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle3.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle3.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle3.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle3.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi3 = 0;
            Integer vj3 = 0; //Almacena el numero de fila
            Iterator iter3 = listaData.iterator();
            
            Row row3 = sheet3.createRow(vj3);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);


            
            CH3_0.setCellValue("ID");
            CH3_1.setCellValue("Codigo Aerolinea Ticket");
            CH3_2.setCellValue("Numero Ticket");
            CH3_3.setCellValue("Codigo TAX");
            CH3_4.setCellValue("Valor TAX");


            CH3_0.setCellStyle(headerStyle3);
            CH3_1.setCellStyle(headerStyle3);
            CH3_2.setCellStyle(headerStyle3);
            CH3_3.setCellStyle(headerStyle3);
            CH3_4.setCellStyle(headerStyle3);


            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet3.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet3.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet3.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet3.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet3.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));


            ++vj3;
            
            //============================================

            while (iter3.hasNext()) {
                row3 = sheet3.createRow(vj3);
                Cell rcell30 = row3.createCell(0);
                Cell rcell31 = row3.createCell(1);
                Cell rcell32 = row3.createCell(2);
                Cell rcell33 = row3.createCell(3);
                Cell rcell34 = row3.createCell(4);


                rcell30.setCellValue("");
                rcell31.setCellValue("");
                rcell32.setCellValue("");
                rcell33.setCellValue("");
                rcell34.setCellValue("");



                iter3.next();
                ++vi3;
                ++vj3;
            }

            sheet3.autoSizeColumn(0, true);
            sheet3.autoSizeColumn(1, true);
            sheet3.autoSizeColumn(2, true);
            sheet3.autoSizeColumn(3, true);
            sheet3.autoSizeColumn(4, true);

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
    public static String convertirMes(String numeroMesStr) {
        try {
            // Convertir la cadena a un número entero
            int numeroMes = Integer.parseInt(numeroMesStr);

            String[] meses = {
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
            };
            if (numeroMes >= 1 && numeroMes <= 12) {
                return meses[numeroMes - 1];
            } else {
                return "Mes inválido";
            }
        } catch (NumberFormatException e) {
            return "Formato inválido";
        }
    }
    public static String convertirFecha(String fechaYYYYMMDD) {
        // Definir el formato de entrada (YYYYMMDD)
        DateTimeFormatter formatoEntrada = DateTimeFormatter.ofPattern("yyyyMMdd");
        
        // Definir el formato de salida (dd/MM/yyyy)
        DateTimeFormatter formatoSalida = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        
        // Convertir la cadena a LocalDate usando el formato de entrada
        LocalDate fecha = LocalDate.parse(fechaYYYYMMDD, formatoEntrada);
        
        // Convertir la fecha al formato de salida
        return fecha.format(formatoSalida);
    }
}