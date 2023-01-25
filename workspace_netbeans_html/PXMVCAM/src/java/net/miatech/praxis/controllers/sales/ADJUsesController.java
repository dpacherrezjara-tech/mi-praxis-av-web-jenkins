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
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ADJUsesLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ADJUses")
public class ADJUsesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADJUsesLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ADJUses/form_index";
    }

    @RequestMapping(value = "SearchADJUses")
    public @ResponseBody
    String SearchADJUses(ModelMap map, HttpServletRequest request) {
        List<A2024Filter> lst;
        A2024Filter filter = new A2024Filter();

        try {
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_FROM_FILER = request.getParameter("VP_FROM_FILER");
            filter.VP_TO_FILTER = request.getParameter("VP_TO_FILTER");
            filter.VP_BOLETO = request.getParameter("IN_BOLETO");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            filter.VP_IATA = request.getParameter("IN_IATA");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchADJUses(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ADJUses : Search-------------");
        map.put("success", true);
        List<A2024Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2024Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ADJUsesLogic();

        List<A2024Filter> lst = new ArrayList<>(0);
        A2024Filter filter = new A2024Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_FROM_FILER = request.getParameter("VP_FROM_FILER");
            filter.VP_TO_FILTER = request.getParameter("VP_TO_FILTER");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_GRUPO = request.getParameter("VP_GRUPO");
            filter.VP_TypeVoid = request.getParameter("VP_TypeVoid");
            filter.VP_TypeUse = request.getParameter("VP_TypeUse");
            filter.VP_TPCMBO = Integer.parseInt(request.getParameter("VP_TPCMBO"));
            
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

            lst = logic.lst_search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadTicketEdit")
    public @ResponseBody
    String loadTicketEdit(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<A2024Filter> lst = this.getListLoadTicket(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2024Filter> getListLoadTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new ADJUsesLogic();

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

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();

        List<A720Filter> lst = new ArrayList<>(0);
        A720Filter filter = new A720Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.strOption = request.getParameter("strOption");
            filter.A720CIA = request.getParameter("A720CIA");
            filter.A720FORMA = request.getParameter("A720FORMA");
            filter.A720SERIE = request.getParameter("A720SERIE");
            filter.A720SEQ = request.getParameter("A720SEQ");
            filter.A720CARRIER = request.getParameter("A720CARRIER");

            lst = logic.loadTicket(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadSave_datos")
    public @ResponseBody
    String loadSave_datos(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();

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

            filter.ORI = request.getParameter("ORI");
            filter.DESTI = request.getParameter("DESTI");
            filter.CARR = request.getParameter("CARR");
            filter.NVLO = request.getParameter("NVLO");
            filter.AMOUNT = Double.parseDouble(request.getParameter("AMOUNT"));
            filter.AMOUNTRV = Double.parseDouble(request.getParameter("AMOUNTRV"));
            filter.TKTDATE = request.getParameter("TKTDATE"); 

            lst = logic.lst_save(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcessContabili")
    public @ResponseBody
    String ProcessContabili(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new ADJUsesLogic();
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
    @RequestMapping(value = "insertAprobList")
    public @ResponseBody
    String insertAprobList(ModelMap map, HttpServletRequest request) {
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
                data.VP_FILTER = 3;
                data.A2024CIA = gsonObj.get("A2024CIA").getAsString();
                data.A2024FORMA = gsonObj.get("A2024FORMA").getAsString();
                data.A2024SERIE = gsonObj.get("A2024SERIE").getAsString();
                data.A2024CORRL = Integer.parseInt(gsonObj.get("A2024CORRL").getAsString());
                data.A2024CUPON = gsonObj.get("A2024CUPON").getAsString();
                 data.A2024SEQ = gsonObj.get("A2024SEQ").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAprobList(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "deleteAprobList")
    public @ResponseBody
    String deleteAprobList(ModelMap map, HttpServletRequest request) {
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
                data.VP_FILTER = 2;
                data.A2024CIA = gsonObj.get("A2024CIA").getAsString();
                data.A2024FORMA = gsonObj.get("A2024FORMA").getAsString();
                data.A2024SERIE = gsonObj.get("A2024SERIE").getAsString();
                data.A2024CORRL = Integer.parseInt(gsonObj.get("A2024CORRL").getAsString());
                data.A2024CUPON = gsonObj.get("A2024CUPON").getAsString();
                 data.A2024SEQ = gsonObj.get("A2024SEQ").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            logic = new ADJUsesLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertAprobList(gridData);

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
        System.out.println("-------------- ADJUses : deleteContabili-------------");
        map.put("success", true);
        logic = new ADJUsesLogic();
        A2024Filter filter = new A2024Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FILTER = Integer.parseInt(request.getParameter("VP_FILTER"));
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_FORMA = request.getParameter("VP_FORMA");
            filter.VP_SERIE = request.getParameter("VP_SERIE");
            filter.VP_CORREL = Integer.parseInt(request.getParameter("VP_CORREL"));
            filter.A2024CUPON = request.getParameter("A2024CUPON");

            A2024Filter lst_delete = logic.lst_delete(filter);

            map.put("lst_delete", lst_delete);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

}
