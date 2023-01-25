/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3651Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RFNDPendingLogic;
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
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RFNDPending")
public class RFNDPendingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RFNDPendingLogic logic;

    @RequestMapping(value = "SearchPendiRefund")
    public @ResponseBody
    String SearchPendiRefund(ModelMap map, HttpServletRequest request) {
        List<A3647Filter> lst;
        A3647Filter filter = new A3647Filter();

        try {
            logic = new RFNDPendingLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter.IN_TICKET = request.getParameter("IN_TICKET").trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();
            filter.IN_IATA = request.getParameter("IN_IATA").trim();
            filter.IN_FLAG = request.getParameter("IN_FLAG").trim();
            filter.IN_STATUS = request.getParameter("IN_STATUSBPO").trim();
            filter.IN_USER = request.getParameter("IN_USER").trim();
            filter.IN_FOLIO = request.getParameter("IN_FOLIO").trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchPendiRefund(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchRFNDRazon")
    public @ResponseBody
    String SearchRFNDRazon(ModelMap map, HttpServletRequest request) {
        List<A3651Filter> lst;
        A3651Filter filter = new A3651Filter();

        try {
            logic = new RFNDPendingLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.SearchRFNDRazon(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaManualRFND")
    public @ResponseBody
    String ProcesaManualRFND(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";
        String mensaje = "";
        String correo = "";
        int cont = 0;
        A3647Filter filter = new A3647Filter();
        ArrayList<A3649Filter> gridDataRazones = new ArrayList<A3649Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3649Filter data = new A3649Filter();
                if (gsonObj.get("A3649TYPE").getAsString().equals("AM")) {
                    data.A3649CODE = gsonObj.get("A3649CODE").getAsString();
                    data.A3649ERROR = gsonObj.get("A3649ERROR").getAsString();
                    data.A3649FAMIL = "";//gsonObj.get("A3649FAMIL").getAsString();
                    gridDataRazones.add(data);
                    if (cont == 0) {
                        mensaje = data.A3649ERROR;
                    } else {
                        mensaje = mensaje + " " + data.A3649ERROR;
                    }
                }
            }
            logic = new RFNDPendingLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualRFND(filter, gridDataRazones);
            if (!"".equals(mensaje)) {
                result2 = rfndestatuspagina(filter, mensaje);
            }
            /*if (gridDataRazones.size() > 0) {
            }*/

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public @ResponseBody
    String getUser() throws Exception {
        HashMap m = new HashMap();
        m.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
        return new Gson().toJson(m);
    }

    public String rfndestatuspagina(A3647Filter beanGene, String Razones) {
        String mensaje = "";
        String flag = "";
        String json = "";
        String req_message = "";
        String token = "";
        int cont_auto = 0;
        int cont_recha = 0;
        boolean success = true;
        List<A3647Filter> lst;
        HashMap map01;
        ArrayList<HashMap<String, String>> lsta_tkts = new ArrayList<>();
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO_RFND").toString();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new RFNDPendingLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.SearchTICKETRFND(beanGene);
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TKTS">
            for (int vi = 0; vi < lst.size(); ++vi) {
                map01 = new HashMap<>();
                if (lst.get(vi).A3647FLAG.equals("Reembolsable")) {
                    cont_auto++;
                } else {
                    cont_recha++;
                }
                map01.put("A3647TKT", lst.get(vi).A3647TKTDUPLI);
                map01.put("A3647FLAG", lst.get(vi).A3647FLAG);
                map01.put("A3647ERROR", lst.get(vi).A3647PGNA1);
                map01.put("A3647TOTAD", lst.get(vi).A3647TOTAD);

                lsta_tkts.add(map01);
            }
            // </editor-fold>
            String req_preme = beanGene.IN_PREME;
            String req_statu = beanGene.IN_STATUS;
            String req_SFW = "";

            String drq_descrip = Razones;
            String drq_flag = beanGene.IN_STATUS;
            String drq_base = "PR";
            String req_email = beanGene.A3647EMAIL.trim();
            String req_email2 = beanGene.A3647EMAIC.trim();
            //
            if (!beanGene.A3647SFW.equals("")) {
                switch (beanGene.IN_IDIOMA) {
                    case "FR":
                        req_SFW = "Case SF: " + "<strong>"+beanGene.A3647SFW +"</strong>" +" "+ "<br>" ;
                        break;
                    case "EN":
                         req_SFW = "Case SF: " + "<strong>"+beanGene.A3647SFW +"</strong>" +" "+ "<br>" ;
                        break;
                    case "PO":
                         req_SFW = "Case SF: " + "<strong>"+beanGene.A3647SFW +"</strong>" +" "+ "<br>" ;
                        break;
                    default:
                         req_SFW = "Caso SF: " + "<strong>"+beanGene.A3647SFW +"</strong>" +" "+ "<br>" ;
                        break;
                }
            }
            if (beanGene.IN_STATUS.equalsIgnoreCase("F")) {
                flag = "AUTHORISED";
                json = new Gson().toJson(lsta_tkts);
                if (cont_recha != 0) {
                    switch (beanGene.IN_IDIOMA) {
                        case "FR":
                            req_message = "Votre demande est <strong> AUTORISÉE</strong> <b></b> avec le numéro de folio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>"+ req_SFW + "Votre demande a été autorisée et le remboursement sera pris en compte dans un délai de 10 à 15 jours ouvrables. " + "<br/>" + "Dans votre demande, des billets rejetés ont été trouvés, veuillez vérifier votre numéro de folio";
                            break;
                        case "EN":
                            req_message = "Your request is <strong> AUTHORIZED</strong> <b></b> with folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "Your request has been authorized and the refund will be reflected within 10 to 15 business days. " + "<br/>" + "In your request, rejected tickets were found, please check your folio Number";
                            break;
                        case "PO":
                            req_message = "Sua solicitação é <strong> AUTORIZADA</strong> <b></b> com o número do fólio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "Sua solicitação foi autorizada e o reembolso será refletido em 10 a 15 dias úteis. " + "<br/>" + "Em sua solicitação, tickets rejeitados foram encontrados, verifique seu número de fólio.";
                            break;
                        default:
                            req_message = "La solicitud se <strong> AUTORIZO</strong><b></b> con el folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "la solicitud ha sido autorizada  y el reembolso se vera reflejado de 10 a 15 días habiles. " + "<br/>" + "En la solicitud se encontraron boletos rechazados favor de revisar el número de folio.";
                            break;
                    }
                } else {
                    switch (beanGene.IN_IDIOMA) {
                        case "FR":
                            req_message = "Votre demande est <strong>AUTORISÉE</strong> <b></b> avec le numéro de folio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "Votre demande a été autorisée et le remboursement sera pris en compte dans un délai de 10 à 15 jours ouvrables. ";
                            break;
                        case "EN":
                            req_message = "Your request is <strong>AUTHORIZED</strong> <b></b> with folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "Your request has been authorized and the refund will be reflected within 10 to 15 business days. ";
                            break;
                        case "PO":
                            req_message = "Sua solicitação é <strong>AUTORIZADA</strong> <b></b> com o número do fólio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "Sua solicitação foi autorizada e o reembolso será refletido em 10 a 15 dias úteis. ";
                            break;
                        default:
                            req_message = "La solicitud se <strong>AUTORIZO</strong> <b></b> con el folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + "La solicitud ha sido autorizada  y el reembolso se vera reflejado de 10 a 15 días habiles. ";
                            break;
                    }
                }

            }
            if (beanGene.IN_STATUS.equalsIgnoreCase("R")) {
                flag = "REJECTED";
                switch (beanGene.IN_IDIOMA) {
                    case "FR":
                        req_message = "Votre demande a été <strong>REJETÉE</strong> <b></b> avec le folio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + " Vérifiez avec votre folio le statut de votre rejet. ";
                        break;
                    case "EN":
                        req_message = "Your request was <strong>REJECTED</strong> <b></b> with folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + " Check with your folio the status of your rejection. ";
                        break;
                    case "PO":
                        req_message = "Sua solicitação foi <strong>REJEITADA</strong> <b></b> com o número do fólio <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + " Verifique com seu fólio o status de sua rejeição. ";
                        break;
                    default:
                        req_message = "La solicitud se <strong>RECHAZO</strong> <b></b> con el folio No. <strong>" + Integer.parseInt(beanGene.A3647FOLIO) + "</strong><br/>" + req_SFW + " Revise con el folio el estatus de su rechazo. ";
                        break;
                }

            }

            //IN_DOCUMENT = "2522497772";

            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            //PARA OBTENER EL TOKEN
            HashMap bodyData1 = new HashMap<>();
            bodyData1.put("username", "api_miatech@miatech.net");
            bodyData1.put("password", "BWW^X0vA2Mhy");

            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/login/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData1))
                    .asJson();

            token = response.getBody().getObject().get("token").toString();

            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("req_ccust", "139");
            bodyData.put("req_preme", req_preme);
            bodyData.put("req_anio", beanGene.IN_ANIO);
            bodyData.put("req_statu", req_statu);
            //bodyData.put("drq_codi", drq_codi);
            bodyData.put("drq_descrip", drq_descrip);
            //bodyData.put("drq_flag", drq_flag);
            bodyData.put("drq_base", drq_base);
            bodyData.put("req_email", req_email);
            bodyData.put("req_email2", req_email2);
            bodyData.put("req_listtkt", json);
            bodyData.put("req_message", req_message);

            HttpResponse<JsonNode> response2 = Unirest.post(urlREST + "/api/manual/status/")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response2.getBody().getObject().get("success").toString());
            mensaje = ""; //response.getBody().getObject().get("msg").toString();

        } catch (SQLException e) {
            mensaje = e.getMessage();
            System.out.println("RFND SQLException : " + mensaje);
            throw new SpringException(e);
        } catch (Exception e) {
            mensaje = e.getMessage();
            System.out.println("RFND Exception : " + mensaje);
            throw new SpringException(e);
        }

        return mensaje;
    }

}
