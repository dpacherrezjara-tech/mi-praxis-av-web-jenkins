/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.async.Callback;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Future;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.ReportTaxA1530Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.TaxDetailLogic;
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
@RequestMapping("/TAXDetail")
public class TaxDetailController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TaxDetailLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/TAXDetail/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TAXDetail : Search-------------");
        map.put("success", true);
        List<ReportTaxA1530Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<ReportTaxA1530Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new TaxDetailLogic();

        List<ReportTaxA1530Filter> lst = new ArrayList<>(0);
        ReportTaxA1530Filter filter = new ReportTaxA1530Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.Opcion = request.getParameter("Opcion");
            filter.SALES = request.getParameter("SALES");
            filter.BANK = request.getParameter("BANK");
            filter.Tax = request.getParameter("Tax");
            filter.CONTABLE = request.getParameter("CONTABLE");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.DateFrom = request.getParameter("DateFrom");
            filter.DateTo = request.getParameter("DateTo");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.IATA = request.getParameter("IATA");
            filter.Currency = request.getParameter("Currency");
            filter.COUNTRYTAX = request.getParameter("COUNTRYTAX");

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

            lst = logic.loadPXReportTax1530(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "sendReport")
    public @ResponseBody
    String sendReport(ModelMap map, HttpServletRequest request) {
        String result = "";
        ReportTaxA1530Filter filter = new ReportTaxA1530Filter();

        try {
             filter.CorreoPri = request.getParameter("CorreoPri");
            filter.CorreoCopi = request.getParameter("CorreoCopi");
            filter.Opcion = request.getParameter("Opcion");
            filter.SALES = request.getParameter("SALES");
            filter.BANK = request.getParameter("BANK");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.Tax = request.getParameter("Tax");
            filter.CONTABLE = request.getParameter("CONTABLE");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.DateFrom = request.getParameter("DateFrom");
            filter.DateTo = request.getParameter("DateTo");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.IATA = request.getParameter("IATA");
            filter.Currency = request.getParameter("Currency");
             filter.COUNTRYTAX = request.getParameter("COUNTRYTAX");
            
            result = upload_s3(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String upload_s3(ReportTaxA1530Filter filter) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
        String context = "";//serverSession.getUserView().getUserInfo().CONTEXT;
        String usr = serverSession.getServerSession().getUserView().getUserInfo().USR;
        String pass = serverSession.getServerSession().getUserView().getUserInfo().TOKEN;


        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("V_CCUST", "139");
        bodyData.put("V_BUSCARPOR", filter.Opcion);
        bodyData.put("V_FECINI", filter.DateFrom);
        bodyData.put("V_FECFIN", filter.DateTo);
        bodyData.put("V_IDCON", filter.CONTABLE);
        bodyData.put("V_TIPOTAX", filter.Tax);
        bodyData.put("V_GRUPO", filter.GRUPO);
        bodyData.put("V_TIPOFUENT", filter.SALES);
        bodyData.put("V_MDA", filter.Currency);
        bodyData.put("V_COUNTRY", filter.COUNTRY);
        bodyData.put("V_BANCO", filter.BANK);
        bodyData.put("V_AGENTE", filter.IATA);
        bodyData.put("V_CHANEL", filter.CHANNEL);
        bodyData.put("V_ATO", filter.ATO);
        bodyData.put("V_COUNTRY_TAX", filter.COUNTRYTAX);
        bodyData.put("to_emails", filter.CorreoPri);
        bodyData.put("cc_emails", filter.CorreoCopi);
        bodyData.put("domain", context);
        bodyData.put("IN_USER", usr);
        bodyData.put("IN_PWD", pass);

        Future<HttpResponse<JsonNode>> future = Unirest.post(urlREST.trim() + "/api/taxdetail/report001/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJsonAsync(new Callback<JsonNode>() {

                    public void failed(UnirestException e) {
                        System.out.println("The request has failed");
                    }

                    public void completed(HttpResponse<JsonNode> response) {
                        int code = response.getStatus();
                        System.out.println("==>" + code);
                    }

                    public void cancelled() {
                        System.out.println("The request has been cancelled");
                    }

                });

        String error_code = "0";//response.getBody().getObject().get("error_code").toString();
        String error_msg = "The report will be sending the mail";//response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

}
