/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.SaleAudit.A2548Filter;
import net.miatech.beans.SaleAudit.A3537Filter;
import net.miatech.beans.SaleAudit.A3540Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.PostbillingLogic;
import net.miatech.praxis.logic.salesAudit.SpdrspcrQueryLogic;
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
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/Postbilling")
public class PostbillingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PostbillingLogic logic;

    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public @ResponseBody
    String getUser() throws Exception {
        HashMap m = new HashMap();
        m.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "SearchQueryRefund")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<A3537Filter> lst;
        A3537Filter filter = new A3537Filter();
        boolean iboolean;

        try {
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_USER = request.getParameter("IN_USER").toString().trim();
            filter.IN_IATA = request.getParameter("IN_IATA").toString().trim();
            filter.IN_TRNCU = request.getParameter("IN_TRNCU").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportPostbilling(filter);
            /* if (lst.size() > 0) {
                iboolean = SendMail(lst);
            }*/

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public boolean SendMail(List<A3537Filter> ListData) throws Exception {
        boolean iboolean = true;
        logic = new PostbillingLogic();

        List<A3537Filter> lst_disputas_sinatender = new ArrayList<A3537Filter>(0);
        A3537Filter obj;
        for (A3537Filter rs01 : ListData) {
            if (!rs01.A3537SEMAF.equals("GREEN")) {
                if (rs01.A3537EMAIL.equals("O")) {
                    obj = new A3537Filter();
                    obj.A3537NMEMO = rs01.A3537NMEMO;
                    obj.A3537PAIS = rs01.A3537PAIS;
                    obj.A3537FTE = rs01.A3537FTE;
                    obj.A3537IATA = rs01.A3537IATA;
                    obj.A3537AREA = rs01.A3537AREA;
                    obj.A3537PBDNE = rs01.A3537PBDNE;
                    obj.A3537SEMAF = rs01.A3537SEMAF;
                    obj.A3537DIAS = rs01.A3537DIAS;
                    obj.A3537PREME = rs01.A3537PREME;
                    obj.A3537TRNCU = rs01.A3537TRNCU;
                    obj.A3537RAUDI = rs01.A3537RAUDI;
                    lst_disputas_sinatender.add(obj);
                }

            }
        }

        if (lst_disputas_sinatender.size() > 0) {

            String VL_DESCRICABE_VI = "<b><p>" + " Document                 " + "Iata                   " + "Country         " + "Source     " + "User          " + "Days" + "</p></b>";//PEDRO VASQUEZ
            String VL_DESCRICABE_VR = "<b><p>" + " Document                 " + "Iata                   " + "Country         " + "Source     " + "TRNC          " + "Days" + "</p></b>";//ROCIO ANAYA
            String VL_TYPE_VI = "";
            String VL_TYPE_VR = "";
            String strMails = "";
            for (int i = 0; i < lst_disputas_sinatender.size(); i++) {
                if (ListData.get(i).A3537TRNCU.equals("ADMA")) {
                    VL_DESCRICABE_VI += ListData.get(i).A3537NMEMO + " - " + ListData.get(i).A3537IATA + " - " + ListData.get(i).A3537PAIS + " - " + ListData.get(i).A3537FTE + " - " + ListData.get(i).A3537RAUDI + " - " + ListData.get(i).A3537DIAS + " dias " + "<br>";
                    VL_TYPE_VI = "1";
                }
                if (ListData.get(i).A3537TRNCU.equals("TKTT")) {
                    VL_DESCRICABE_VR += ListData.get(i).A3537NMEMO + " - " + ListData.get(i).A3537IATA + " - " + ListData.get(i).A3537PAIS + " - " + ListData.get(i).A3537FTE + " - " + ListData.get(i).A3537TRNCU + " - " + ListData.get(i).A3537DIAS + " dias " + "<br>";
                    VL_TYPE_VR = "1";

                }
            }

            ProMail proMail = new ProMail();
            List<String> receptores = new ArrayList<String>();
            receptores.add("notificaciones@miatech.net");
            List<String> Ccp = new ArrayList<String>();
            String[] parts = null;

            if (VL_TYPE_VI.length() > 0) {
                //strMails = "pvazquez@aeromexico.com;avelazquezp@aeromexico.com;fmalagon@aeromexico.com;achavez@aeromexico.com;rcaballero@aeromexico.com;ehernandezh@aeromexico.com;tavalos@aeromexico.com";
                strMails = "zperez@miatech.net";
                parts = strMails.split(";");
                for (int i = 0; i < parts.length; i++) {
                    Ccp.add(parts[i]);
                }
                String emisor = "notificaciones@miatech.net";//Data.EmailRe;
                String asunto = "Relationship of pending post billing disputes not attended";//Data.Asunto;

                String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas del  post billing." + ""
                        + " los debitos son los siguientes.</b><br><br>"
                        + VL_DESCRICABE_VI + "</b><br><br>"
                        + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
                String mensaje = VL_MENSAJE;//Data.Mensaje;
                iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
            }
            if (VL_TYPE_VR.length() > 0) {
                //strMails = "rcaballero@aeromexico.com";
                strMails = "zperez@miatech.net";
                parts = strMails.split(";");
                for (int i = 0; i < parts.length; i++) {
                    Ccp.add(parts[i]);
                }
                String emisor = "notificaciones@miatech.net";//Data.EmailRe;
                String asunto = "Relationship of pending post billing disputes not attended";//Data.Asunto;

                String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas del  post billing." + ""
                        + " los debitos son los siguientes.</b><br><br>"
                        + VL_DESCRICABE_VR + "</b><br><br>"
                        + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
                String mensaje = VL_MENSAJE;//Data.Mensaje;
                iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
            }

            if (iboolean) {
                String result = logic.savecorreo(lst_disputas_sinatender);
            }
        }

        return iboolean;
    }

    @RequestMapping(value = "SearchPostbillingDetail")
    public @ResponseBody
    String SearchPostbillingDetail(ModelMap map, HttpServletRequest request) {
        A3537Filter list;
        A3537Filter filter = new A3537Filter();

        HashMap map01, map02, map03;
        ArrayList<HashMap<String, String>> lst_DispuPostbi = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_Tkts = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_DispuHisto = new ArrayList<>();

        try {
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_CNXPA = request.getParameter("IN_CNXPA").trim();
            filter.IN_OPTION = request.getParameter("IN_OPTION").trim();
            filter.IN_SEQ = request.getParameter("IN_SEQ").trim();

            list = logic.SearchPostbillingDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DispuPostbi">
            for (int vi = 0; vi < list.lst_DispuRazon.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A3537NCONX", list.lst_DispuRazon.get(vi).A3537NCONX);
                map01.put("A3537FFILE", list.lst_DispuRazon.get(vi).A3537FFILE);
                map01.put("A3537TYPE", list.lst_DispuRazon.get(vi).A3537TYPE);
                map01.put("A3537FLAG", list.lst_DispuRazon.get(vi).A3537FLAG);
                map01.put("A3537FREGI", list.lst_DispuRazon.get(vi).A3537FREGI);

                lst_DispuPostbi.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DOCUMENTS">
            for (int vi = 0; vi < list.lst_DOCUMENTS.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A2548TIKET", list.lst_DOCUMENTS.get(vi).A2548TIKET);
                map02.put("A2548TRNCO", list.lst_DOCUMENTS.get(vi).A2548TRNCO);
                map02.put("A2548NETO", list.lst_DOCUMENTS.get(vi).A2548NETO);
                map02.put("A2548PREME", list.lst_DOCUMENTS.get(vi).A2548PREME);
                map02.put("A2548CNXPA", list.lst_DOCUMENTS.get(vi).A2548CNXPA);
                map02.put("A2548MDA", list.lst_DOCUMENTS.get(vi).A2548MDA);
                map02.put("A2548NMEMO", list.lst_DOCUMENTS.get(vi).A2548NMEMO);
                map02.put("A2548TARID", list.lst_DOCUMENTS.get(vi).A2548TARID);
                map02.put("A2548TTAXD", list.lst_DOCUMENTS.get(vi).A2548TTAXD);
                map02.put("A2548SERVD", list.lst_DOCUMENTS.get(vi).A2548SERVD);
                map02.put("A2548IVACD", list.lst_DOCUMENTS.get(vi).A2548IVACD);
                map02.put("A2548COMID", list.lst_DOCUMENTS.get(vi).A2548COMID);
                map02.put("A2548SCOMD", list.lst_DOCUMENTS.get(vi).A2548SCOMD);
                map02.put("A2548TAXCD", list.lst_DOCUMENTS.get(vi).A2548TAXCD);
                map02.put("A2548PORCD", list.lst_DOCUMENTS.get(vi).A2548PORCD);
                map02.put("A2548PENAD", list.lst_DOCUMENTS.get(vi).A2548PENAD);
                map02.put("A2548FEED", list.lst_DOCUMENTS.get(vi).A2548FEED);
                map02.put("A2548TTACD", list.lst_DOCUMENTS.get(vi).A2548TTACD);
                map02.put("A2548TTAMD", list.lst_DOCUMENTS.get(vi).A2548TTAMD);
                map02.put("A2548TCARD", list.lst_DOCUMENTS.get(vi).A2548TCARD);
                map02.put("A2548TOTAD", list.lst_DOCUMENTS.get(vi).A2548TOTAD);

                lst_Tkts.add(map02);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_DispuHisto">
            for (int vi = 0; vi < list.lst_RAZON.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A2553REGIS", list.lst_RAZON.get(vi).A2553REGIS);
                map03.put("A2553FREGI", list.lst_RAZON.get(vi).A2553FREGI);
                map03.put("A2553HREGI", list.lst_RAZON.get(vi).A2553HREGI);
                map03.put("A2553TYPO", list.lst_RAZON.get(vi).A2553TYPO);
                map03.put("A2553DESCR", list.lst_RAZON.get(vi).A2553DESCR);
                map03.put("A2553ARCHV", list.lst_RAZON.get(vi).A2553ARCHV);
                map03.put("A2553ARCHV2", list.lst_RAZON.get(vi).A2553ARCHV2);
                map03.put("A2553ARCHV3", list.lst_RAZON.get(vi).A2553ARCHV3);
                map03.put("A2553STAT", list.lst_RAZON.get(vi).A2553STAT);
                map03.put("ESTADO", list.lst_RAZON.get(vi).ESTADO);
                map03.put("A2553FOLIO", list.lst_RAZON.get(vi).A2553FOLIO);
                map03.put("A2553PAIS", list.lst_RAZON.get(vi).A2553PAIS);

                lst_DispuHisto.add(map03);
            }
            // </editor-fold>

            /*if (!filter.IN_CNXPA.equals("")) {
                lst_RAZON = logic.loadTracing(filter);
                lst_DOCUMENTS = logic.lstTKTS(filter);
            }*/
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_DispuPostbi", lst_DispuPostbi);
        map.put("lst_Tkts", lst_Tkts);
        map.put("lst_DispuHisto", lst_DispuHisto);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("fileaudito") MultipartFile file, @RequestParam("fileaudito2") MultipartFile file2, @RequestParam("fileaudito3") MultipartFile file3, HttpServletRequest request) {
        A3537Filter filter = new A3537Filter();
        A3537Filter listenvio = new A3537Filter();
        String CAMPO = "";
        String result = "";
        String archivo = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());
            String A3537ARCHV = file.getOriginalFilename();
            String A3537ARCHV2 = file2.getOriginalFilename();
            String A3537ARCHV3 = file3.getOriginalFilename();

            listenvio.IN_CNXPA = filter.IN_CNXPA;
            listenvio.IN_PREME = filter.IN_PREME;
            listenvio.IN_DESCRI = filter.IN_DESCRI;
            listenvio.IN_COUNTRY = filter.IN_COUNTRY;
            listenvio.IN_STATUS = filter.IN_STATUS;
            listenvio.IN_TRNCU = filter.IN_TRNCU;
            listenvio.A3537ARCHV = A3537ARCHV;
            listenvio.A3537ARCHV2 = A3537ARCHV2;
            listenvio.A3537ARCHV3 = A3537ARCHV3;
            ///poner tu proceso

            if (!listenvio.IN_CNXPA.equals("")) {
                CAMPO = listenvio.IN_CNXPA;
            } else {
                CAMPO = listenvio.IN_PREME;
            }
            //final del prcoeso
            result = logic.insertTracing(listenvio);
            if (result.equals("RECORD INSERTED")) {
                result = "The record was saved successfully.";
                if (!A3537ARCHV.equals("")) {
                    byte[] bytes = file.getBytes();
                    result = upload(bytes, CAMPO, A3537ARCHV);
                    archivo = "1";
                }
                if (!A3537ARCHV2.equals("")) {
                    byte[] bytes2 = file2.getBytes();
                    result = upload(bytes2, CAMPO, A3537ARCHV2);
                    archivo = "1";
                }
                if (!A3537ARCHV3.equals("")) {
                    byte[] bytes3 = file3.getBytes();
                    result = upload(bytes3, CAMPO, A3537ARCHV3);
                    archivo = "1";
                }
                if (archivo.equals("1")) {
                    result = upload_s3(CAMPO);
                }
            } else {
                result = "An error ocurred when trying to upload the file.";
            }

            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    public String upload_s3(String IN_CNXPA) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();


        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_PATH", "\\\\10.0.0.87\\amaudit\\POSTBILLING\\WEB\\" + IN_CNXPA + "\\" + Functions.getFechaActual());
        bodyData.put("IN_PREFIX", "POSTBILLING/WEB/");
        bodyData.put("IN_DATE", Functions.getFechaActual());

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/upload_s3/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

    @RequestMapping(value = "GetFilesDirectory")
    public @ResponseBody
    String GetFilesDirectory(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String IN_PATH = path_config + "\\IMGTMPDISPUTE\\";
        String IN_DATE = request.getParameter("IN_DATE").trim();
        String IN_COUNTRY = request.getParameter("IN_COUNTRY").trim();
        String IN_DOCUMENT = request.getParameter("IN_DOCUMENT").trim();
        String IN_MODULO = request.getParameter("IN_MODULO").trim();
        String IN_TYPE = request.getParameter("IN_TYPE").trim();
        String IN_RUTA = "";
        if (IN_TYPE.equals("ROBOT")) {
            IN_RUTA = IN_MODULO + "/" + IN_TYPE + "/" + IN_DATE + "/" + IN_COUNTRY + "/" + IN_DOCUMENT + "/";
        } else {
            IN_RUTA = IN_MODULO + "/" + IN_TYPE + "/" + IN_DOCUMENT + "/" + IN_DATE + "/";
        }
        if (IN_MODULO.equals("ADM")) {
            IN_RUTA = IN_MODULO + "/" + IN_DOCUMENT + "/";
        }
        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);

        /*
         Preparando parámetros para enviar por body
         */
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_OPTION", "1");
        bodyData.put("IN_PATH", IN_PATH);
        bodyData.put("IN_DATE", IN_DATE);
        bodyData.put("IN_COUNTRY", IN_COUNTRY);
        bodyData.put("IN_DOCUMENT", IN_DOCUMENT);
        bodyData.put("IN_PREFIX", IN_RUTA);
        bodyData.put("IN_TYPETMP", "IMGTMPDISPUTE");

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/archivos/all/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String body = response.getBody().getObject().get("data").toString();

        map.put("success", true);
        map.put("data", body);

        return new Gson().toJson(map);
    }

    public String upload(byte[] bytes, String nroMemo, String nomArchivo) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "";
        try {
            String strSesion = UUID.randomUUID().toString();

            //String rutaMemo = "\\\\PX\\amaudit\\POSTBILLING\\WEB\\" + nroMemo;
            String rutaMemo = "\\\\10.0.0.87\\amaudit\\POSTBILLING\\WEB\\" + nroMemo;
            Path dir = Paths.get(rutaMemo);
            File directory = new File(String.valueOf(dir));
            if (!Files.exists(dir)) {
                directory.mkdir();
            }
            File dir2 = new File(directory, Functions.getFechaActual());
            dir2.mkdir();
            /* if (!Files.exists(dir)) {
             Files.createDirectory(dir);
             }*/

            String strArchivo = rutaMemo + "\\" + Functions.getFechaActual() + "\\" + nomArchivo;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            mensaje = "The record was saved successfully.";
        } catch (Exception e) {
            mensaje = "An error ocurred when trying to upload the file.";
            logError.error(e.getMessage());
        }

        return mensaje;
    }

    @RequestMapping(value = "SearchQueryPostbilling")
    public @ResponseBody
    String SearchQueryPostbilling(ModelMap map, HttpServletRequest request) {
        List<A3537Filter> lst;
        A3537Filter filter = new A3537Filter();
        boolean iboolean;

        try {
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            int pExcel = Integer.parseInt(request.getParameter("pexcel").toString());
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION").toString().trim();
            filter.IN_CIA = request.getParameter("IN_CIA").toString().trim();
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET").toString().trim();
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM").toString().trim();
            filter.IN_DATETO = request.getParameter("IN_DATETO").toString().trim();
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
            filter.IN_STATUS = request.getParameter("IN_STATUS").toString().trim();
            filter.IN_USER = request.getParameter("IN_USER").toString().trim();
            filter.IN_IATA = request.getParameter("IN_IATA").toString().trim();
            filter.IN_TRNCU = request.getParameter("IN_TRNCU").toString().trim();
            filter.IN_STATO = request.getParameter("IN_STATO").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchQueryPostbilling(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchListDocument")
    public @ResponseBody
    String SearchListDocument(ModelMap map, HttpServletRequest request) {
        List<SQP00911Filter> lst;
        A3537Filter filter = new A3537Filter();

        try {
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            lst = logic.SearchListDocument(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3537Filter filter = new A3537Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            /*filter.IN_OPTION = request.getParameter("IN_OPTION");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET");
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_USER = request.getParameter("IN_USER");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_TRNCU = request.getParameter("IN_TRNCU");*/

            List<A3537Filter> listaData = logic.SearchReportPostbilling(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
             int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("SpdrspcrQuery");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18,
                    CH_19, CH_20, CH_21, CH_22, CH_23;
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
            CH_23 = row.createCell(23);

            CH_00.setCellValue("Origin");
            CH_01.setCellValue("IATA");
            CH_02.setCellValue("Agency");
            CH_03.setCellValue("TRNC");
            CH_04.setCellValue("Document");
            CH_05.setCellValue("Connexion");
            CH_06.setCellValue("SPDR");
            CH_07.setCellValue("SPCR");
            CH_08.setCellValue("PBD date");
            CH_09.setCellValue("Resolution Date");

            CH_10.setCellValue("Country");
            CH_11.setCellValue("Currency");
            CH_12.setCellValue("Amount ADM/ACM");

            CH_13.setCellValue("Disputable amount");
            CH_14.setCellValue("PBD Amount");
            CH_15.setCellValue("Amount DIF.");

            CH_16.setCellValue("Auditor");
            CH_17.setCellValue("Status");
            CH_18.setCellValue("Days");

            CH_19.setCellValue("System /date");
            CH_20.setCellValue("QTY AM");
            CH_21.setCellValue("QTY BSP");
            CH_22.setCellValue("Issue date");
            CH_23.setCellValue("Process");

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
            CH_23.setCellStyle(headerStyle);

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
                CH_23 = row.createCell(23);

                CH_00.setCellValue(listaData.get(vi).A3537MODO);
                CH_01.setCellValue(listaData.get(vi).A3537IATA);
                CH_02.setCellValue(listaData.get(vi).A3537NOMAGENCY);
                CH_03.setCellValue(listaData.get(vi).A3537TRNCU);
                CH_04.setCellValue(listaData.get(vi).A3537NMEMO);

                CH_05.setCellValue(listaData.get(vi).A3537NUMCONX);
                CH_06.setCellValue(listaData.get(vi).A3537PREDR);
                CH_07.setCellValue(listaData.get(vi).A3537PRECR);
                CH_08.setCellValue(listaData.get(vi).A3537FPBD);
                CH_09.setCellValue(listaData.get(vi).A3537RDSTE);

                CH_10.setCellValue(listaData.get(vi).A3537PAIS);
                CH_11.setCellValue(listaData.get(vi).A3537MDA);
                CH_12.setCellValue((listaData.get(vi).A3537NETO));

                CH_13.setCellValue(listaData.get(vi).A3537NMAX);
                CH_14.setCellValue(listaData.get(vi).A3537PBDNE);
                CH_15.setCellValue((listaData.get(vi).A3537NETD));

                CH_16.setCellValue(listaData.get(vi).A3537RAUDI);
                CH_17.setCellValue(listaData.get(vi).A3537FLAG);
                CH_18.setCellValue((listaData.get(vi).A3537DIAS));

                CH_19.setCellValue(listaData.get(vi).A3537FREGI);
                CH_20.setCellValue(listaData.get(vi).A3537CANTAERO);
                CH_21.setCellValue((listaData.get(vi).A3537CANTANGE));
                CH_22.setCellValue((listaData.get(vi).A3537FVTA));
                CH_23.setCellValue((listaData.get(vi).A3537STAT4));

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
                CH_23.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            //sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
           // sheet.autoSizeColumn(5, true);
            //sheet.autoSizeColumn(6, true);
            //sheet.autoSizeColumn(7, true);
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

            String fileNameDownload = String.format("SpdrspcrQuery - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSX2")
    public @ResponseBody
    void getXLSX2(HttpServletRequest request, HttpServletResponse response) {
        A3537Filter filter = new A3537Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            logic = new PostbillingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
           /* filter.IN_OPTION = request.getParameter("IN_OPTION");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_DOCUMET = request.getParameter("IN_DOCUMET");
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_USER = request.getParameter("IN_USER");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_TRNCU = request.getParameter("IN_TRNCU");*/

            List<A3537Filter> listaData = logic.SearchQueryPostbilling(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
             SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("SpdrspcrQuery");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18,
                    CH_19, CH_20, CH_21, CH_22, CH_23,CH_24;
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
            CH_23 = row.createCell(23);
            CH_24 = row.createCell(24);

            CH_00.setCellValue("Origin");
            CH_01.setCellValue("IATA");
            CH_02.setCellValue("Agency");
            CH_03.setCellValue("TRNC");
            CH_04.setCellValue("Document");
            CH_05.setCellValue("Connexion");
            CH_06.setCellValue("SPDR");
            CH_07.setCellValue("SPCR");
            CH_08.setCellValue("PBD date");
            CH_09.setCellValue("Resolution Date");

            CH_10.setCellValue("Country");
            CH_11.setCellValue("Currency");
            CH_12.setCellValue("Amount ADM/ACM");

            CH_13.setCellValue("Disputable amount");
            CH_14.setCellValue("PBD Amount");
            CH_15.setCellValue("Amount DIF.");

            CH_16.setCellValue("Auditor");
            CH_17.setCellValue("Status");
            CH_18.setCellValue("Days");

            CH_19.setCellValue("System /date");
            CH_20.setCellValue("QTY AM");
            CH_21.setCellValue("QTY BSP");
            CH_22.setCellValue("Issue date");
            CH_23.setCellValue("Process");
            CH_24.setCellValue("Reference");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));

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
            CH_23.setCellStyle(headerStyle);
            CH_24.setCellStyle(headerStyle);

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
                CH_23 = row.createCell(23);
                CH_24 = row.createCell(24);

                CH_00.setCellValue(listaData.get(vi).A3537MODO);
                CH_01.setCellValue(listaData.get(vi).A3537IATA);
                CH_02.setCellValue(listaData.get(vi).A3537NOMAGENCY);
                CH_03.setCellValue(listaData.get(vi).A3537TRNCU);
                CH_04.setCellValue(listaData.get(vi).A3537NMEMO);

                CH_05.setCellValue(listaData.get(vi).A3537NUMCONX);
                CH_06.setCellValue(listaData.get(vi).A3537PREDR);
                CH_07.setCellValue(listaData.get(vi).A3537PRECR);
                CH_08.setCellValue(listaData.get(vi).A3537FPBD);
                CH_09.setCellValue(listaData.get(vi).A3537RDSTE);

                CH_10.setCellValue(listaData.get(vi).A3537PAIS);
                CH_11.setCellValue(listaData.get(vi).A3537MDA);
                CH_12.setCellValue((listaData.get(vi).A3537NETO));

                CH_13.setCellValue(listaData.get(vi).A3537NMAX);
                CH_14.setCellValue(listaData.get(vi).A3537PBDNE);
                CH_15.setCellValue((listaData.get(vi).A3537NETD));

                CH_16.setCellValue(listaData.get(vi).A3537RAUDI);
                CH_17.setCellValue(listaData.get(vi).A3537FLAG);
                CH_18.setCellValue((listaData.get(vi).A3537DIAS));

                CH_19.setCellValue(listaData.get(vi).A3537FREGI);
                CH_20.setCellValue(listaData.get(vi).A3537CANTAERO);
                CH_21.setCellValue((listaData.get(vi).A3537CANTANGE));
                CH_22.setCellValue((listaData.get(vi).A3537FVTA));
                CH_23.setCellValue((listaData.get(vi).A3537STAT4));
                CH_24.setCellValue((listaData.get(vi).A3537CNREL));

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
                CH_23.setCellStyle(bodyStyle);
                CH_24.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            //sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            //sheet.autoSizeColumn(5, true);
            //sheet.autoSizeColumn(6, true);
            //sheet.autoSizeColumn(7, true);
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

            String fileNameDownload = String.format("SpdrspcrQuery - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

}
