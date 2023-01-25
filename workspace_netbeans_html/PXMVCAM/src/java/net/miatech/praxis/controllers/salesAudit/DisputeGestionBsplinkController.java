/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import static com.mashape.unirest.http.HttpClientHelper.request;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.File;
import java.io.FileNotFoundException;
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
import static jxl.biff.BaseCellFeatures.logger;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.ADMReportLogic;
import net.miatech.praxis.logic.salesAudit.DisputeGestionBsplinkLogic;
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
import org.json.JSONException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez DisputeGestionBsplinkLogic
 */
@Controller
@Scope("request")
@RequestMapping("/DisputeGestionBsplink")
public class DisputeGestionBsplinkController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    @RequestMapping(value = "SearchReportADM")
    public @ResponseBody
    String SearchReportADM(ModelMap map, HttpServletRequest request) {
        SQP00911Filter filter = new SQP00911Filter();
        boolean iboolean;
        String vl_flag = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            int pExcel = Integer.parseInt(filter.pexcel);
            Boolean bExcel = pExcel == 1 ? true : false;

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            DisputeGestionBsplinkLogic logic = new DisputeGestionBsplinkLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter);

            List<SQP00911Filter> lst_disputas_sinatender = new ArrayList<SQP00911Filter>(0);
            SQP00911Filter obj;
            for (SQP00911Filter rs01 : lst_search) {
                if (!rs01.A2548SEMAFORO.equals("GREEN")) {
                    if (rs01.A2548EMAIL.equals("O")) {
                        obj = new SQP00911Filter();
                        obj.A2548NMEMO = rs01.A2548NMEMO;
                        obj.A2548PAIS = rs01.A2548PAIS;
                        obj.A2548FTE = rs01.A2548FTE;
                        obj.A2548IATA = rs01.A2548IATA;
                        obj.A2548AREA = rs01.A2548AREA;
                        obj.A2548NETO = rs01.A2548NETO;
                        obj.A2548SEMAFORO = rs01.A2548SEMAFORO;
                        obj.A2548DIAS = rs01.A2548DIAS;
                        obj.A2548CNXPA = rs01.A2548CNXPA;
                        obj.A2548TRNCU = rs01.A2548TRNCU;
                        obj.A2548REGIS = rs01.A2548REGIS;
                        lst_disputas_sinatender.add(obj);
                    }

                }
            }
            if (lst_disputas_sinatender.size() > 0) {
                iboolean = SendMail(lst_disputas_sinatender);
                if (iboolean) {
                    String result = logic.savecorreo(lst_disputas_sinatender);
                    vl_flag = "0";
                } else {
                    //resp.info.add("Could not send email!");
                    vl_flag = "1";
                }

               // if (vl_flag.equals("0")) {
                    map.put("success", true);
                    map.put("data", lst_search);
                    map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
                /*} else {
                    map.put("success", false);
                    map.put("sesion", "Could not send email!");
                }*/
            } else {
                map.put("success", true);
                map.put("data", lst_search);
                map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    // Mail    
    public boolean SendMail(List<SQP00911Filter> ListData) {
        boolean iboolean = false;

        /**
         * obtener los neumeros de debitos
         */
        //mensajes de los debitos
        String VL_DESCRICABE_CR = "<b><p>" + " N° Memo                 " + "Iata                   " + "Country         " + "Source     " + "User          " + "Days" + "</p></b>";//CR
        String VL_DESCRICABE_VI = "<b><p>" + " N° Memo                 " + "Iata                   " + "Country         " + "Source     " + "User          " + "Days" + "</p></b>";//CR
        String VL_DESCRICABE_VD = "<b><p>" + " N° Memo                 " + "Iata                   " + "Country         " + "Source     " + "User          " + "Days" + "</p></b>";//CR
        String VL_DESCRICABE_CM = "<b><p>" + " N° Memo                 " + "Iata                   " + "Country         " + "Source     " + "User          " + "Days" + "</p></b>";//CR
        String VL_AREA = "";
        String VL_TYPE_CR = "";
        String VL_TYPE_VI = "";
        String VL_TYPE_VD = "";
        String VL_TYPE_CM = "";
        String strMails = "";

        for (int i = 0; i < ListData.size(); i++) {
            if (ListData.get(i).A2548AREA.equals("CR")) {
                //VL_ARECR += " N° meno " + ListData.get(i).A2548NMEMO + " Iata " + ListData.get(i).A2548IATA + " Country " + ListData.get(i).A2548PAIS + " Country " + ListData.get(i).A2548FTE + " " + ListData.get(i).A2548DIAS + " dias " + "\n";
                VL_DESCRICABE_CR += ListData.get(i).A2548NMEMO + " - " + ListData.get(i).A2548IATA + " - " + ListData.get(i).A2548PAIS + " - " + ListData.get(i).A2548FTE + " - " + ListData.get(i).A2548REGIS + " - " + ListData.get(i).A2548DIAS + " dias " + "<br>";
                VL_AREA = "Crédito y Cobranzas";
                VL_TYPE_CR = "1";
            }
            if (ListData.get(i).A2548AREA.equals("VI")) {
                VL_DESCRICABE_VI += ListData.get(i).A2548NMEMO + " - " + ListData.get(i).A2548IATA + " - " + ListData.get(i).A2548PAIS + " - " + ListData.get(i).A2548FTE + " - " + ListData.get(i).A2548REGIS + " - " + ListData.get(i).A2548DIAS + " dias " + "<br>";
                VL_AREA = "Venta Indirecta";
                VL_TYPE_VI = "1";
            }
            if (ListData.get(i).A2548AREA.equals("DI")) {
                VL_DESCRICABE_VD += ListData.get(i).A2548NMEMO + " - " + ListData.get(i).A2548IATA + " - " + ListData.get(i).A2548PAIS + " - " + ListData.get(i).A2548FTE + " - " + ListData.get(i).A2548REGIS + " - " + ListData.get(i).A2548DIAS + " dias " + "<br>";
                VL_AREA = "Venta Directa";
                VL_TYPE_VD = "1";
            }
            if (ListData.get(i).A2548AREA.equals("CM")) {
                VL_DESCRICABE_CM += ListData.get(i).A2548NMEMO + " - " + ListData.get(i).A2548IATA + " - " + ListData.get(i).A2548PAIS + " - " + ListData.get(i).A2548FTE + " - " + ListData.get(i).A2548REGIS + " - " + ListData.get(i).A2548DIAS + " dias " + "<br>";
                VL_AREA = "Comisiones";
                VL_TYPE_CM = "1";
            }
        }

        /**
         * fin del proceso de obtener
         */
        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<String>();
        receptores.add("notificaciones@miatech.net");
        List<String> Ccp = new ArrayList<String>();
        String[] parts = null;

        //temporal borrar
        //strMails = "asifuentes@miatech.net;oldman_100_6@hotmail.com";
        if (VL_TYPE_CR.length() > 0) {
            strMails = "pvazquez@aeromexico.com;amsupportservicecc@aeromexico.com;jmendozal@aeromexico.com";
            //strMails = "zperez@miatech.net";
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de debitos con disputas no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas de ADM's." + ""
                    + " los debitos son los siguientes.</b><br><br>"
                    + " <b>" + "Crédito y Cobranzas" + "</b><br><br> " + ""
                    + VL_DESCRICABE_CR + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
        }
        if (VL_TYPE_VI.length() > 0) {
            //strMails = "zperez@miatech.net";
            strMails = "pvazquez@aeromexico.com;avelazquezp@aeromexico.com;fmalagon@aeromexico.com;achavez@aeromexico.com;rcaballero@aeromexico.com;ehernandezh@aeromexico.com;tavalos@aeromexico.com";
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de debitos con disputas no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas de ADM's." + ""
                    + " los debitos son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_DESCRICABE_VI + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
        }
        if (VL_TYPE_VD.length() > 0) {
            //strMails = "zperez@miatech.net";
            strMails = "pvazquez@aeromexico.com;avelazquezp@aeromexico.com;fmalagon@aeromexico.com;achavez@aeromexico.com;rcaballero@aeromexico.com;ehernandezh@aeromexico.com;ebarraza@aeromexico.com;tavalos@aeromexico.com";
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de debitos con disputas no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas de ADM's." + ""
                    + " los debitos son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Directa" + "</b><br><br> " + ""
                    + VL_DESCRICABE_VD + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
        }
        if (VL_TYPE_CM.length() > 0) {
            //strMails = "zperez@miatech.net";
            strMails = "pvazquez@aeromexico.com;acastillob@aeromexico.com;lgonzalez@aeromexico.com";
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de debitos con disputas no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an las disputas no atendidas de ADM's." + ""
                    + " los debitos son los siguientes.</b><br><br>"
                    + " <b>" + "Comisiones" + "</b><br><br> " + ""
                    + VL_DESCRICABE_CM + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de debitos - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", this.serverSession.getServerSession());
        }

        return iboolean;
    }

    @RequestMapping(value = "loadTracing")
    public @ResponseBody
    String loadTracing(ModelMap map, HttpServletRequest request) {
        A2553 filter = new A2553();
        List<SQP00911Filter> lstRazones = null;
        List<SQP00911Filter> lstTKTS = null;
        boolean iboolean;
        String vl_flag = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2553> lstData = logic.loadTracing(filter);
            lstRazones = logic.lstRazones(filter);
            lstTKTS = logic.lstTKTS(filter);

            map.put("success", true);
            map.put("lstData", lstData);
            map.put("lstRazones", lstRazones);
            map.put("lstTKTS", lstTKTS);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("fileaudito") MultipartFile file, @RequestParam("fileaudito2") MultipartFile file2, @RequestParam("fileaudito3") MultipartFile file3, HttpServletRequest request) {
        A2553 filter = new A2553();
        A2553 listenvio = new A2553();
        String VL_ARCHI ="";
        String result2 ="";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            //ADMReportLogic logic = new ADMReportLogic();
            DisputeGestionBsplinkLogic logic = new DisputeGestionBsplinkLogic();
            logic.setSession(this.serverSession.getServerSession());
            String A2553ARCHV = file.getOriginalFilename();
            String A2553ARCHV2 = file2.getOriginalFilename();
            String A2553ARCHV3 = file3.getOriginalFilename();

            listenvio.A2553TRNCU = filter.A2553TRNCU;
            listenvio.A2553STAT = filter.A2553STAT;
            listenvio.A2553NMEMO = filter.A2553NMEMO;
            listenvio.A2553DESCR = filter.A2553DESCR;
            listenvio.A2553STAT2 = filter.A2553STAT2;
            listenvio.A2553ARCHV = A2553ARCHV;
            listenvio.A2553ARCHV2 = A2553ARCHV2;
            listenvio.A2553ARCHV3 = A2553ARCHV3;
            listenvio.A2553PAIS = filter.A2553PAIS;
            listenvio.A2553CNXPA = filter.A2553CNXPA;
            listenvio.A2553FOLIO = "";

            String result = logic.insertTracing(listenvio);
            if (result.equals("RECORD INSERTED")) {
                result = "The record was saved successfully.";
                if (!A2553ARCHV.equals("")) {
                    byte[] bytes = file.getBytes();
                    result = upload(bytes, filter.A2553CNXPA, A2553ARCHV);
                    VL_ARCHI="1";
                }
                if (!A2553ARCHV2.equals("")) {
                    byte[] bytes2 = file2.getBytes();
                    result = upload(bytes2, filter.A2553CNXPA, A2553ARCHV2);
                    VL_ARCHI="1";
                }
                if (!A2553ARCHV3.equals("")) {
                    byte[] bytes3 = file3.getBytes();
                    result = upload(bytes3, filter.A2553CNXPA, A2553ARCHV3);
                    VL_ARCHI="1";
                }
                if(VL_ARCHI.equals("1")){
                    result2 = upload_s3(filter.A2553CNXPA);
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
        bodyData.put("IN_PATH", "\\\\10.0.0.87\\amaudit\\DISPUTAS\\WEB\\" + IN_CNXPA + "\\" + Functions.getFechaActual());
        bodyData.put("IN_PREFIX", "DISPUTAS/WEB/");
        bodyData.put("IN_DATE", Functions.getFechaActual());

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/upload_s3/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

    @RequestMapping(value = "insertTracing")
    public @ResponseBody
    String insertTracing(ModelMap map, HttpServletRequest request) {
        A2553 filter = new A2553();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            //ADMReportLogic logic = new ADMReportLogic();
            DisputeGestionBsplinkLogic logic = new DisputeGestionBsplinkLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.insertTracing(filter);

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

    @RequestMapping(value = "GetFilesDirectory")
    public @ResponseBody
    String GetFilesDirectory(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String IN_PATH = path_config + "\\IMGTMPDISPUTE\\";
        String IN_DATE = request.getParameter("IN_DATE").toString().trim();
        String IN_COUNTRY = request.getParameter("IN_COUNTRY").toString().trim();
        String IN_DOCUMENT = request.getParameter("IN_DOCUMENT").toString().trim();

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

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/dispute/all/")
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

            //String rutaMemo = "\\\\10.0.0.87\\AMAUDIT\\PRUEBAS\\" + nroMemo;
            //String rutaMemo = "\\\\PX\\amaudit\\DISPUTAS\\WEB\\" + nroMemo;
            String rutaMemo = "\\\\10.0.0.87\\amaudit\\DISPUTAS\\WEB\\" + nroMemo;
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

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        SQP00911Filter filter = new SQP00911Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            DisputeGestionBsplinkLogic logic = new DisputeGestionBsplinkLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("GestionBSPLink");
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
            Iterator iter = lst_search.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16;
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

            CH_00.setCellValue("Memo number");
            CH_01.setCellValue("Country");
            CH_02.setCellValue("IATA");
            CH_03.setCellValue("Agency");
            CH_04.setCellValue("Currency");
            CH_05.setCellValue("Amount");
            CH_06.setCellValue("Source");
            CH_07.setCellValue("Dispute date");
            CH_08.setCellValue("Tour code");
            CH_09.setCellValue("System date");
            CH_10.setCellValue("Accounting date / Issue date");
            CH_11.setCellValue("Processing Date");
            CH_12.setCellValue("Auditor");
            CH_13.setCellValue("Origin");
            CH_14.setCellValue("Area");
            CH_15.setCellValue("Status");
            CH_16.setCellValue("Days");

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

                CH_00.setCellValue(lst_search.get(vi).A2548NMEMO);
                CH_01.setCellValue(lst_search.get(vi).A2548PAIS);
                CH_02.setCellValue(lst_search.get(vi).A2548IATA);
                CH_03.setCellValue(lst_search.get(vi).AGENCY);
                CH_04.setCellValue(lst_search.get(vi).A2548MDA);

                CH_05.setCellValue(lst_search.get(vi).A2548NETO);
                CH_06.setCellValue(lst_search.get(vi).A2548FTE);
                CH_07.setCellValue(lst_search.get(vi).A2548FDISP);
                CH_08.setCellValue(lst_search.get(vi).A2548CODIT);
                CH_09.setCellValue(lst_search.get(vi).A2548FREGI);
                CH_10.setCellValue(lst_search.get(vi).A2548FCONT);
                CH_11.setCellValue(lst_search.get(vi).A2548FPROC);
                CH_12.setCellValue(lst_search.get(vi).A2548REGIS);

                CH_13.setCellValue(lst_search.get(vi).A2548BASE);
                CH_14.setCellValue(lst_search.get(vi).A2548AREADES);
                String Status = "";
                if (lst_search.get(vi).A2548FLAG.equals("A")) {
                    Status = "Approved";
                }
                if (lst_search.get(vi).A2548FLAG.equals("U")) {
                    Status = "Cleared Up";
                }
                if (lst_search.get(vi).A2548FLAG.equals("U")) {
                    Status = "Cleared Up";
                }
                if (lst_search.get(vi).A2548FLAG.equals("X")) {
                    Status = "Canceled";
                }
                if (lst_search.get(vi).A2548FLAG.equals("C")) {
                    Status = "Condoned";
                }
                if (lst_search.get(vi).A2548FLAG.equals("P")) {
                    Status = "Billing";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Z")) {
                    Status = "Authorized";
                }
                if (lst_search.get(vi).A2548FLAG.equals("N")) {
                    Status = "Rejected";
                }
                if (lst_search.get(vi).A2548FLAG.equals("R")) {
                    Status = "Reaudited";
                }
                if (lst_search.get(vi).A2548FLAG.equals("J")) {
                    Status = "Justified";
                }
                if (lst_search.get(vi).A2548FLAG.equals("D")) {
                    Status = "Disputed";
                }
                if (lst_search.get(vi).A2548FLAG.equals("E")) {
                    Status = "Dispute Rejected";
                }
                if (lst_search.get(vi).A2548FLAG.equals("W")) {
                    Status = "Dispute Approved";
                }
                if (lst_search.get(vi).A2548FLAG.equals("B")) {
                    Status = "Acm na BSPlink";
                }
                if (lst_search.get(vi).A2548FLAG.equals("O")) {
                    Status = "IATA Disabled";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Q")) {
                    Status = "Unregistered Client";
                }
                if (lst_search.get(vi).A2548FLAG.equals("L")) {
                    Status = "Acm BSPlink";
                }
                if (lst_search.get(vi).A2548FLAG.equals("Y")) {
                    Status = "Pending";
                }
                CH_15.setCellValue(Status);
                CH_16.setCellValue(lst_search.get(vi).A2548DIAS);

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
            sheet.autoSizeColumn(16, true);

            String fileNameDownload = String.format("RefundControl - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "loadDataInit")
    public @ResponseBody
    String loadDataInit(ModelMap map, HttpServletRequest request) {
        List<SQP00911Filter> lst;
        SQP00911Filter Filter = new SQP00911Filter();
        Filter.OPCIONTYPE = "1";
        HashMap mapProperties;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        try {
            DisputeGestionBsplinkLogic logic = new DisputeGestionBsplinkLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadDataInit(Filter);

            mapProperties = new HashMap<>();
            mapProperties.put("A2548DESC1", "ALL");//
            mapProperties.put("A2548CODR1", "");
            lstData.add(mapProperties);

            for (int vi = 0; vi < lst.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A2548DESC1", lst.get(vi).A2548DESC1);
                mapProperties.put("A2548CODR1", lst.get(vi).A2548CODR1);

                lstData.add(mapProperties);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lstData.size());
        map.put("data", lstData);

        return new Gson().toJson(map);
    }

}
