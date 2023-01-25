/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.praxis.A1740;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ADJAccountingLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Iterator;
import java.util.UUID;
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

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ADJAccounting")
public class ADJAccountingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADJAccountingLogic logic;

    /*@RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ADJAccounting/form_index";
    }*/
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A2024Filter> lst;
        A2024Filter filter = new A2024Filter();

        try {
            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_FROM_FILER = request.getParameter("VP_FROM_FILER");
            filter.VP_TO_FILTER = request.getParameter("VP_TO_FILTER");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_Seq = request.getParameter("VP_Seq");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            filter.VP_IATA = request.getParameter("VP_IATA");
            filter.VP_USER = request.getParameter("VP_USER");

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lst = logic.lst_search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        A720Filter filter = new A720Filter();
        List<A720Filter> lst = new ArrayList<>(0);
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter.strOption = request.getParameter("strOption");
            filter.A720CIA = request.getParameter("A720CIA");
            filter.A720FORMA = request.getParameter("A720FORMA");
            filter.A720SERIE = request.getParameter("A720SERIE");
            filter.A720SEQ = request.getParameter("A720SEQ");
            filter.A720CUPON1 = request.getParameter("A720CUPON");
            filter.A720DATE = request.getParameter("A720DATE");

            lst = logic.loadTicket(filter);

            map.put("success", true);
            map.put("data", lst);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadAccountig")
    public @ResponseBody
    String loadAccountig(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJAccountingLogic();

        List<PX040S01A1716Filter> lst = new ArrayList<>(0);
        PX040S01A1716Filter filter = new PX040S01A1716Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_A1716CCUST = request.getParameter("A720AIRLIN");
            filter.VP_A1716CIA = request.getParameter("A720CIA");
            filter.VP_A1716FORMA = request.getParameter("A720FORMA");
            filter.VP_A1716SERIE = request.getParameter("A720SERIE");
            filter.VP_A1716SEQ = request.getParameter("A720SEQ");

            lst = logic.loadPX040S01A1716(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("lst_Accounting", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadViewAccounting")
    public @ResponseBody
    String loadViewAccounting(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJAccountingLogic();

        List<PX0241S01A720Filter> lst = new ArrayList<>(0);
        PX0241S01A720Filter filter = new PX0241S01A720Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.AIRLINE = request.getParameter("AIRLINE");
            filter.TRANSACTION = request.getParameter("TRANSACTION");
            filter.TKT = request.getParameter("TKT");
            filter.SEQ = request.getParameter("SEQ");
            filter.CUPON1 = request.getParameter("CUPON1");
            filter.CUPON2 = request.getParameter("CUPON2");
            filter.CUPON3 = request.getParameter("CUPON3");
            filter.CUPON4 = request.getParameter("CUPON4");
            filter.FROM = request.getParameter("FROM");
            filter.TO = request.getParameter("TO");
            filter.FUENTE = request.getParameter("FUENTE");
            filter.PAIS = request.getParameter("PAIS");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.FLAG = request.getParameter("FLAG");
            filter.STERROR = request.getParameter("STERROR");
            filter.SEQTRAN = Integer.parseInt(request.getParameter("SEQTRAN"));
            filter.MODE = request.getParameter("MODE");

            lst = logic.loadViewAccounting(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("lst_ViewAccounting", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadDataCmbo")
    public @ResponseBody
    String loadDataCmbo(ModelMap map, HttpServletRequest request) {
        List<A1740> lst;
        List<A1740> lst2;
        List<A1740Filter> lst3;
        HashMap mapProperties;
        HashMap mapProperties2;
        HashMap mapProperties3;
        ArrayList<HashMap<String, String>> loadDocumentType = new ArrayList<>();
        ArrayList<HashMap<String, String>> loadCategory = new ArrayList<>();
        ArrayList<HashMap<String, String>> loadAccountType = new ArrayList<>();
        try {
            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDocumentType();
            lst2 = logic.loadCategory();
            lst3 = logic.loadAccountType();

            mapProperties = new HashMap<>();
            mapProperties.put("A1740TITRA", "ALL");
            loadDocumentType.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A1740TITRA", lst.get(vi).A1740TITRA);

                loadDocumentType.add(mapProperties);
            }
            //segudno
            mapProperties2 = new HashMap<>();
            mapProperties2.put("A1740CATEG", "ALL");
            loadCategory.add(mapProperties2);

            for (int vi = 0; vi < lst2.size(); ++vi) {
                mapProperties2 = new HashMap<>();
                mapProperties2.put("A1740CATEG", lst2.get(vi).A1740CATEG);

                loadCategory.add(mapProperties2);
            }
            //Tercer
            mapProperties3 = new HashMap<>();
            mapProperties3.put("A1740TIPO", "");
            mapProperties3.put("A1740TIPODESC", "ALL");
            loadAccountType.add(mapProperties3);

            for (int vi = 0; vi < lst3.size(); ++vi) {
                mapProperties3 = new HashMap<>();
                mapProperties3.put("A1740TIPO", lst3.get(vi).A1740TIPO);
                mapProperties3.put("A1740TIPODESC", lst3.get(vi).A1740TIPODESC);

                loadAccountType.add(mapProperties3);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", loadDocumentType.size());
        map.put("loadDocumentType", loadDocumentType);
        map.put("loadCategory", loadCategory);
        map.put("loadAccountType", loadAccountType);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchCta")
    public @ResponseBody
    String SearchCta(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJAccountingLogic();

        List<A1740Filter> lst = new ArrayList<>(0);
        A1740Filter filter = new A1740Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A1740SUBTI_OLD = request.getParameter("IN_A1740SUBTI_OLD");
            filter.IN_A1740TIPO = request.getParameter("IN_A1740TIPO");
            filter.A1740SUBTI = request.getParameter("A1740SUBTI");
            filter.A1740CATEG = request.getParameter("A1740CATEG");
            filter.A1740CTA = request.getParameter("A1740CTA");
            filter.A1740SCTA = request.getParameter("A1740SCTA");
            filter.A1740TIPODESC = request.getParameter("A1740TIPODESC");
            filter.IN_A1740TIPO_OLD = request.getParameter("IN_A1740TIPO_OLD");

            lst = logic.SearchCta(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("lst_ViewAccounting", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicketEdit")
    public @ResponseBody
    String loadTicketEdit(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJAccounting : loadTicketEdit-------------");
        map.put("success", true);
        List<A2024Filter> lst = this.getListLoadTicket(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2024Filter> getListLoadTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new ADJAccountingLogic();

        List<A2024Filter> lst = new ArrayList<>(0);
        A2024Filter filter = new A2024Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.A2024CORRL = Integer.parseInt(request.getParameter("A2024CORRL"));
            filter.A2024SEQ = request.getParameter("A2024SEQ");

            System.out.println("---> " + filter.VP_FILTER);
            System.out.println("---> " + filter.VP_CIA);
            System.out.println("---> " + filter.VP_FORMA);
            System.out.println("---> " + filter.VP_SERIE);
            System.out.println("---> " + filter.VP_GRUPO);
            System.out.println("---> " + filter.A2024CORRL);
            System.out.println("---> " + filter.A2024SEQ);

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

            lst = logic.exportExcel(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadGuardar")
    public @ResponseBody
    String loadGuardar(ModelMap map, HttpServletRequest request) {
        String result = "";
        String lstCorrectData = "";
        Integer o = 0;
        boolean iboolean;
        A2024Filter filter = new A2024Filter();
        ArrayList<PX040S01A1716Filter> gridDataCorrect = new ArrayList<PX040S01A1716Filter>();;
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonCorrectDa = parser.parse(request.getParameter("beanlstCorrectData")).getAsJsonArray();
            for (JsonElement obj : gsonCorrectDa) {
                JsonObject gsonObj = obj.getAsJsonObject();
                if (o.equals(0)) {
                    lstCorrectData = gsonObj.get("A1716SEQT").getAsString()
                            + "$" + gsonObj.get("A1716FUENT").getAsString()
                            + "$" + gsonObj.get("A1716SUBFU").getAsString()
                            + "$" + gsonObj.get("A1716CUR").getAsString()
                            + "$" + gsonObj.get("CONP1").getAsString()
                            + "$" + gsonObj.get("CONP2").getAsString()
                            + "$" + gsonObj.get("CONP3").getAsString()
                            + "$" + gsonObj.get("A1716ACTIV").getAsDouble()
                            + "$" + gsonObj.get("A1716PASIV").getAsDouble()
                            + "$" + gsonObj.get("ACTIV2").getAsDouble()
                            + "$" + gsonObj.get("PASIV2").getAsDouble()
                            + "$" + gsonObj.get("A1716CUENT").getAsString()
                            + "$" + gsonObj.get("LIB1").getAsString()
                            + "$" + gsonObj.get("LIB1CIA").getAsString()
                            + "$" + gsonObj.get("A1716CLIEN").getAsString()
                            + "$" + gsonObj.get("A1716DIREC").getAsString()
                            + "$" + gsonObj.get("A1716PROV").getAsString()
                            + "$" + gsonObj.get("ORAC").getAsString()
                            + "$" + gsonObj.get("COMB").getAsString()
                            + "$" + gsonObj.get("A1716TITU").getAsString()
                            + "$" + gsonObj.get("A1716FUENT").getAsString()
                            + "$" + gsonObj.get("CTAC").getAsString()
                            + "$" + gsonObj.get("TITUC").getAsString()
                            + "$" + gsonObj.get("LIB1C").getAsString()
                            + "$" + gsonObj.get("CTAP").getAsString()
                            + "$" + gsonObj.get("TITUP").getAsString()
                            + "$" + gsonObj.get("LIB1P").getAsString()
                            + "$" + gsonObj.get("CTAPC").getAsString()
                            + "$" + gsonObj.get("TITUPC").getAsString()
                            + "$" + gsonObj.get("LIB1PC").getAsString()
                            + "$" + gsonObj.get("CTAPAR").getAsString()
                            + "$" + gsonObj.get("TITUPAR").getAsString()
                            + "$" + gsonObj.get("LIB1PAR").getAsString()
                            + "$" + gsonObj.get("CLIENTAR").getAsString()
                            + "$" + gsonObj.get("DIRECCAR").getAsString()
                            + "$" + gsonObj.get("ORACAR").getAsString()
                            + "$" + gsonObj.get("A1716MARCA").getAsString()
                            + "$" + gsonObj.get("A1716FILE").getAsString()
                            + "$" + gsonObj.get("A1716FP").getAsString()
                            + "$" + gsonObj.get("A1716ORIG").getAsString()
                            + "$" + gsonObj.get("A1716CUPON").getAsString()
                            + "$" + gsonObj.get("A1716MODO").getAsString();

                    //gsonObj.get("A1716FUENT").getAsDouble()
                } else {
                    lstCorrectData = lstCorrectData + "|" + gsonObj.get("A1716SEQT").getAsString()
                            + "$" + gsonObj.get("A1716FUENT").getAsString()
                            + "$" + gsonObj.get("A1716SUBFU").getAsString()
                            + "$" + gsonObj.get("A1716CUR").getAsString()
                            + "$" + gsonObj.get("CONP1").getAsString()
                            + "$" + gsonObj.get("CONP2").getAsString()
                            + "$" + gsonObj.get("CONP3").getAsString()
                            + "$" + gsonObj.get("A1716ACTIV").getAsDouble()
                            + "$" + gsonObj.get("A1716PASIV").getAsDouble()
                            + "$" + gsonObj.get("ACTIV2").getAsDouble()
                            + "$" + gsonObj.get("PASIV2").getAsDouble()
                            + "$" + gsonObj.get("A1716CUENT").getAsString()
                            + "$" + gsonObj.get("LIB1").getAsString()
                            + "$" + gsonObj.get("LIB1CIA").getAsString()
                            + "$" + gsonObj.get("A1716CLIEN").getAsString()
                            + "$" + gsonObj.get("A1716DIREC").getAsString()
                            + "$" + gsonObj.get("A1716PROV").getAsString()
                            + "$" + gsonObj.get("ORAC").getAsString()
                            + "$" + gsonObj.get("COMB").getAsString()
                            + "$" + gsonObj.get("A1716TITU").getAsString()
                            + "$" + gsonObj.get("A1716FUENT").getAsString()
                            + "$" + gsonObj.get("CTAC").getAsString()
                            + "$" + gsonObj.get("TITUC").getAsString()
                            + "$" + gsonObj.get("LIB1C").getAsString()
                            + "$" + gsonObj.get("CTAP").getAsString()
                            + "$" + gsonObj.get("TITUP").getAsString()
                            + "$" + gsonObj.get("LIB1P").getAsString()
                            + "$" + gsonObj.get("CTAPC").getAsString()
                            + "$" + gsonObj.get("TITUPC").getAsString()
                            + "$" + gsonObj.get("LIB1PC").getAsString()
                            + "$" + gsonObj.get("CTAPAR").getAsString()
                            + "$" + gsonObj.get("TITUPAR").getAsString()
                            + "$" + gsonObj.get("LIB1PAR").getAsString()
                            + "$" + gsonObj.get("CLIENTAR").getAsString()
                            + "$" + gsonObj.get("DIRECCAR").getAsString()
                            + "$" + gsonObj.get("ORACAR").getAsString()
                            + "$" + gsonObj.get("A1716MARCA").getAsString()
                            + "$" + gsonObj.get("A1716FILE").getAsString()
                            + "$" + gsonObj.get("A1716FP").getAsString()
                            + "$" + gsonObj.get("A1716ORIG").getAsString()
                            + "$" + gsonObj.get("A1716CUPON").getAsString()
                            + "$" + gsonObj.get("A1716MODO").getAsString();
                }
                o = (o + 1);
            }

            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.loadGuardar(filter, lstCorrectData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "maintenance")
    public @ResponseBody
    String maintenance(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A2024Filter> gridData = new ArrayList<A2024Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2024Filter data = new A2024Filter();
                data.A2024CODER = gsonObj.get("A2024CODER").getAsString();
                data.A2024CUPON = gsonObj.get("A2024CUPON").getAsString();
                data.A2024SEQ = gsonObj.get("A2024SEQ").getAsString();
                data.A2024CORRL = Integer.parseInt(gsonObj.get("A2024CORRL").getAsString());
                gridData.add(data);

            }
            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.maintenance(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "deleteContabili")
    public @ResponseBody
    String deleteContabili(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJAccountingLogic();
        A2024Filter filter = new A2024Filter();
        String result = "";

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.A2024CODER = request.getParameter("A2024CODER");
            filter.A2024CUPON = request.getParameter("A2024CUPON");
            filter.A2024SEQ = request.getParameter("A2024SEQ");
            filter.A2024CORRL = Integer.parseInt(request.getParameter("A2024CORRL"));

            result = logic.lst_delete(filter);

            map.put("lst_delete", result);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    /*
    @RequestMapping(value = "insertTKT")
    public @ResponseBody
    String insertTKT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJAccounting : insertTKT-------------");
        map.put("success", true);
        logic = new ADJAccountingLogic();
        Gson gson = new Gson();
        A2024Filter objRtn;
        String listas = "";
        try {

            logic.setSession(this.serverSession.getServerSession());

            listas = request.getParameter("lista");
            A2024Filter[] lista = gson.fromJson(listas, A2024Filter[].class);
            System.out.println("---> Elementos a procesar " + lista.length);
            String result = logic.insertTKT(lista);
            if (result.toString().equals("RECORD UPDATED")) {
                map.put("msj", "The record was Update successfully.");
            } else {
                map.put("msj", "An error occurred when trying to processed.");
            }

        } catch (Exception e) {
            System.out.println("-->E : " + e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
     */
    @RequestMapping(value = "loadSave_datos")
    public @ResponseBody
    String loadSave_datos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJAccounting : loadSave_datos-------------");
        map.put("success", true);
        logic = new ADJAccountingLogic();

        A2024Filter lst = new A2024Filter();
        A2024Filter filter = new A2024Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.CIA = request.getParameter("CIA");
            filter.FORMA = request.getParameter("FORMA");
            filter.SERIE = request.getParameter("SERIE");
            filter.A2024GRUPO = request.getParameter("A2024GRUPO");
            filter.A2024TRNC = request.getParameter("A2024TRNC");
            filter.A2024FECIN = request.getParameter("A2024FECIN");
            filter.A2024TTARJ = request.getParameter("A2024TTARJ");
            filter.A2024NTARJ = request.getParameter("A2024NTARJ");
            filter.A2024RFIC = request.getParameter("A2024RFIC");
            filter.A2024RFIS = request.getParameter("A2024RFIS");
            filter.A2024VRICOC = request.getParameter("A2024VRICOC");
            filter.A2024FECVTA = request.getParameter("A2024FECVTA");
            filter.A2024AGENT = request.getParameter("A2024AGENT");
            filter.A2024SFUEN = request.getParameter("A2024SFUEN");
            filter.A1541MDAVE = request.getParameter("A1541MDAVE");
            filter.A1541VCPVE = Double.parseDouble(request.getParameter("A1541VCPVE"));
            filter.A1541LCMVE = Double.parseDouble(request.getParameter("A1541LCMVE"));
            filter.A1541LSCMV = Double.parseDouble(request.getParameter("A1541LSCMV"));
            filter.A1541LYQVE = Double.parseDouble(request.getParameter("A1541LYQVE"));
            filter.A1541LYQVE = Double.parseDouble(request.getParameter("A1541LYQVE"));
            filter.A1541TCRVE = Double.parseDouble(request.getParameter("A1541TCRVE"));
            filter.A1541VCPRV = Double.parseDouble(request.getParameter("A1541VCPRV"));
            filter.A1541MREVE = request.getParameter("A1541MREVE");
            filter.A1541RCMVE = Double.parseDouble(request.getParameter("A1541RCMVE"));
            filter.A1541RSCMV = Double.parseDouble(request.getParameter("A1541RSCMV"));
            filter.A1541RYQVE = Double.parseDouble(request.getParameter("A1541RYQVE"));
            filter.SEQ = request.getParameter("SEQ");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.A2024DESCRIP = request.getParameter("A2024DESCRIP");
            filter.A2024IATAUSU = request.getParameter("A2024IATAUSU");
            filter.A1531TFOP = request.getParameter("A1531TFOP");
            filter.CIANEW = request.getParameter("CIANEW");
            filter.FORMANEW = request.getParameter("FORMANEW");
            filter.SERIENEW = request.getParameter("SERIENEW");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            filter.A2024CUPON = request.getParameter("A2024CUPON");
            filter.ESTA_TNU = request.getParameter("ESTA_TNU");
            filter.FBASIS = request.getParameter("FBASIS");
            filter.REFE = request.getParameter("REFE");
            filter.TKTSEQ = request.getParameter("TKTSEQ");

            lst = logic.lst_Maintance(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcessContabili")
    public @ResponseBody
    String ProcessContabili(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJAccounting : ProcessContabili-------------");
        map.put("success", true);
        logic = new ADJAccountingLogic();
        Gson gson = new Gson();

        A2024Filter objRtn;
        String listas = "";

        try {

            logic.setSession(this.serverSession.getServerSession());

            listas = request.getParameter("lista");
            A2024Filter[] lista = gson.fromJson(listas, A2024Filter[].class);
            for (A2024Filter lista1 : lista) {
                objRtn = logic.lst_Maintance(lista1);
                map.put("SQLCODE", objRtn.dbException.SQLCODE);
                map.put("MESSAGE", objRtn.dbException.MESSAGE);
            }

        } catch (Exception e) {
            System.out.println("-->E : " + e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadCargarDatos")
    public @ResponseBody
    String loadCargarDatos(ModelMap map, HttpServletRequest request) {
        A2024Filter filter = new A2024Filter();
        List<A2024Filter> lst = new ArrayList<>(0);
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter.A2024CODER = request.getParameter("A2024CODER");
            filter.A2024CUPON = request.getParameter("A2024CUPON");
            filter.A2024SEQ = request.getParameter("A2024SEQ");
            filter.A2024CORRL = Integer.parseInt(request.getParameter("A2024CORRL"));

            lst = logic.loadCargarDatos(filter);

            map.put("success", true);
            map.put("data", lst);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A2024Filter filter = new A2024Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

           logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2024Filter> listaData = logic.lst_search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ADJ-accounting");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);
            CH_21 = row.createCell(21);
            CH_22 = row.createCell(22);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Cpn");
            CH_02.setCellValue("ADJ Sec");
            CH_03.setCellValue("Trans.");
            CH_04.setCellValue("Trnc. Date");
            CH_05.setCellValue("Processed");
            CH_06.setCellValue("Local Debit");
            CH_07.setCellValue("Local Credit");
            CH_08.setCellValue("Local Net");
            CH_09.setCellValue("Revenue Debit");
            CH_10.setCellValue("Revenue Credit");
            CH_11.setCellValue("Revenue Net");
            CH_12.setCellValue("Accounting ID");
            CH_13.setCellValue("Accounting Date");
            CH_14.setCellValue("Adj IATA");
            CH_15.setCellValue("Source");
            CH_16.setCellValue("S. Source");
            CH_17.setCellValue("Grup. TRNC");
            CH_18.setCellValue("Sales Date");
            CH_19.setCellValue("Card Type");
            CH_20.setCellValue("Card Number");
            CH_21.setCellValue("Description");
            CH_22.setCellValue("Audit");
            

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);
            CH_21.setCellStyle(headerStyle);
            CH_22.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);
                CH_21 = row.createCell(21);
                CH_22 = row.createCell(22);

                CH_00.setCellValue(listaData.get(vi).A2024CODER);
                CH_01.setCellValue(listaData.get(vi).A2024CUPON);
                CH_02.setCellValue(listaData.get(vi).SEQ);
                 String Vl_TTRAX ="";
                  switch (listaData.get(vi).VP_TTRAX) {
            case 1:
                Vl_TTRAX = "SALE";
                break;
            case 2:
                Vl_TTRAX = "EXCH";
                break;
            case 3:
                Vl_TTRAX = "RFND";
                break;
            case 5:
                Vl_TTRAX = "FLOWN";
                break;
            case 6:
                Vl_TTRAX = "EXCP";
                break;
            case 7:
                Vl_TTRAX = "RFCP";
                break;
            case 8:
                Vl_TTRAX = "IXP";
                break;
            case 9:
                Vl_TTRAX = "DISC";
                break;
            case 10:
                Vl_TTRAX = "IXC OAL";
                break;
            case 13:
                Vl_TTRAX = "EMD-FLOWN";
                break;
        }
                CH_03.setCellValue(Vl_TTRAX);
                CH_04.setCellValue(listaData.get(vi).A2024FECPRO);
                String VL_A2024ESTADO="";
                switch (listaData.get(vi).A2024ESTADO) {
            case "AN":
                VL_A2024ESTADO = "VOID";
                break;
            case "OK":
                VL_A2024ESTADO = "OK";
                break;
            case "IN":
                VL_A2024ESTADO = "INITIAL";
                break;
            case "PP":
                VL_A2024ESTADO = "Processed";
                break;

        }
                CH_05.setCellValue(VL_A2024ESTADO);
                CH_06.setCellValue(listaData.get(vi).DEBLOC);
                CH_07.setCellValue(listaData.get(vi).CRELOC);
                CH_08.setCellValue(listaData.get(vi).SQUARELOC);
                CH_09.setCellValue(listaData.get(vi).DEBREV);
                CH_10.setCellValue(listaData.get(vi).CREREV);
                CH_11.setCellValue(listaData.get(vi).SQUARE);
                CH_12.setCellValue(listaData.get(vi).A1541IDCON);
                CH_13.setCellValue(listaData.get(vi).A1541FCONT);
                CH_14.setCellValue(listaData.get(vi).A2024IATAUSU);
                CH_15.setCellValue(listaData.get(vi).A2024FUENT);
                CH_16.setCellValue(listaData.get(vi).A2024SFUEN);
                CH_17.setCellValue(listaData.get(vi).GRUPO);
                CH_18.setCellValue(listaData.get(vi).A2024FECVTA);
                CH_19.setCellValue(listaData.get(vi).A2024TTARJ);
                CH_20.setCellValue(listaData.get(vi).A2024NTARJ);
                CH_21.setCellValue(listaData.get(vi).A2024DESCRIP);
                CH_22.setCellValue(listaData.get(vi).A2024USRIN);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);
                CH_21.setCellStyle(bodyStyle);
                CH_22.setCellStyle(bodyStyle);
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

            String fileNameDownload = String.format("ADM Report Manual - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }
    @RequestMapping(value = "loadDatosTicktes")
    public @ResponseBody
    String loadDatosTicktes(ModelMap map, HttpServletRequest request) {
        List<A2024Filter> lst;
        A2024Filter filter = new A2024Filter();

        try {
            logic = new ADJAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_BOLETO = request.getParameter("VP_BOLETO");
            
            lst = logic.loadDatosTicktes(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
    

}
