/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.classes.ProReportReject;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.RejectionReportLogic;
import net.miatech.praxis.payment.filter.A2288Filter;
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
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/RejectionReport")
public class RejectionReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private RejectionReportLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/RejectionReport/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RejectionReport : Search-------------");

        map.put("success", true);
        List<A2288Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2288Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2288Filter> lst = new ArrayList<>(0);
        A2288Filter filter = new A2288Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new RejectionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2288Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
//
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

            lst = logic.loadPX273SQP00737(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "cargarDatosParaMail")
    public @ResponseBody
    String cargarDatosParaMail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RejectionReport : cargarDatosParaMail-------------");

        Gson gson = new Gson();
        A2288Filter filter = new A2288Filter();
        List<A2288Filter> Data = new ArrayList<>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2288Filter.class);

        logic = new RejectionReportLogic();
        logic.setSession(this.serverSession.getServerSession());

        try {
            Data = logic.loadPX273SQP00758(filter);
            map.put("lstData", Data);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "createPDF")
    public @ResponseBody
    String createPDF(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- RejectionReport : createPDF-------------");

        boolean iboolean;
        A2288Filter file;
        Gson gson = new Gson();
        A2288Filter filter = new A2288Filter();
        List<A2288Filter> Data = new ArrayList<>(0);
        List<String> info = new ArrayList<>(0);

        try {
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2288Filter.class);

            logic = new RejectionReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            Data = logic.loadPX273SQP00758(filter);
            
            String mensaje = "";
            
            mensaje = "<html><body><br/>Estimado(s):<br/><br/>Anexo envío del archivo con el detalle de las transacciones rechazadas por filtros.";
            mensaje += "<br/>Agradeciendo su atención, quedo a sus órdenes.<br/>Saludos<br/><br/>";

            for (int p = 0; p < Data.size(); p++) {
                file = Data.get(p);
                mensaje += file.CODREJ + "-" + file.DESREJ + " = " + file.RN + " Transaccion(es) Rechazada(s).<br/>";
            }
            mensaje += "</body></html>";
            filter.strMailText = mensaje;
            // =================================================================
            
            // Genera PDF
            ProReportReject proReportReject = new ProReportReject();
            boolean success = proReportReject.createReportPDF(filter);
            
            if (success) {

                // Genera CSV
                //Obteniendo la informacion para generar el excel
                List<A2288Filter> listaData;
                listaData = logic.loadPX273SQP00737(filter);
                success = proReportReject.createReportCSV(filter, listaData);

                if (success) {
                    // Enviar el Mail            
                    iboolean = sendMail(filter, proReportReject);
                    if (iboolean) {
                        info.add("Email Sent.");
                    } else {
                        info.add("Could not send email!");
                        info.add("-1");
                    }
                } else {
                    info.add("Could not send email!");
                    info.add("-1");
                }
            } else {
                info.add("Could not send email!");
                info.add("-1");
            }
            
            
            map.put("lstData", Data);
            map.put("info", info);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    public boolean sendMail(A2288Filter Data, ProReportReject report) {

        boolean iboolean;
        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<String>();
        receptores.add(Data.strMailTo);
        // Emails CC
        List<String> Ccp = new ArrayList<String>();
        String strMails = Data.strMailCC;
        if (!strMails.trim().equals("")) {
            String[] parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
        }else{
//            Ccp.add("claudia@miatech.net;eneves@miatech.net");
            Ccp.add("agarcia@miatech.net");
        }
//        String emisor = "amaclaracionescontracargos@aeromexico.com";
        String emisor = "amaclaracionescontracargos@miatech.net";
        String asunto = Data.strMailSubject;
        String mensaje = Data.strMailText;
        List<String> archivos = new ArrayList<String>();
        archivos.add(report.getFile().get(0).getAbsolutePath());
        archivos.add(report.getFile().get(1).getAbsolutePath());
        iboolean = proMail.envia(emisor, asunto, receptores, Ccp, mensaje, archivos, emisor);
        return iboolean;
    }

}
