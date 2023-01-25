/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.itextpdf.text.pdf.codec.Base64;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03875Filter;
import net.miatech.praxis.eecta.SQP03878Filter;
import net.miatech.praxis.eecta.SQP03879Filter;
import net.miatech.praxis.eecta.SQP03887Filter;
import net.miatech.praxis.eecta.SQP03888Filter;
import net.miatech.praxis.eecta.SQP03959Filter;
import net.miatech.praxis.eecta.SQP03960Filter;
import net.miatech.praxis.eecta.SQP04006Filter;
import net.miatech.praxis.eecta.SQP04038Filter;
import net.miatech.praxis.eecta.SQP04039Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.CatalogoClienteLogic;
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
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/CatalogoCliente")
public class CatalogoClienteController extends BaseController {

    private CatalogoClienteLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03878Filter> listaData;
        SQP03878Filter filter;
        filter = new SQP03878Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_PARAM1 = request.getParameter("VP_PARAM1");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoClienteLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03878Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {
        SQP03879Filter filter = new SQP03879Filter();
        SQP03879Filter objRtn;
        SQP03888Filter objRtn01 = null;
        SQP03960Filter objRtn02 = null;
        logic = new CatalogoClienteLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP03879Filter(filter);
            //RESULT: Mant. detalle UATP
            String SQLCODE_uatp = "";
            String MESSAGE_uatp = "";
            //RESULT: Mant. ID identif.
            String SQLCODE_identif = "";
            String MESSAGE_identif = "";
            if (!objRtn.OU_A3953CDCLI.equals("0")) {
                JsonParser parser = new JsonParser();
                JsonArray gson_uatp = parser.parse(request.getParameter("beanuatp")).getAsJsonArray();
                for (JsonElement obj : gson_uatp) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    SQP03888Filter filter01 = new SQP03888Filter();
                    filter01.VP_ACTION = gsonObj.get("crudState").getAsString();//filter.VP_ACTION; //request.getParameter("VP_ACTION");
                    filter01.A3954TCUAT = gsonObj.get("A3954TCUAT").getAsString();
                    filter01.A3954DESCR = gsonObj.get("A3954DESCR").getAsString();
                    filter01.A3954CDCLI = objRtn.OU_A3953CDCLI;//request.getParameter("VP_A3954CDCLI");                
                    //filter01.A3954TCUAM = gsonObj.get("A3954TCUAM").getAsString();
                    filter01.A3954FALTA = gsonObj.get("A3954FALTA").getAsString();
                    filter01.A3954FBAJA = gsonObj.get("A3954FBAJA").getAsString();
                    objRtn01 = logic.setSQP03888(filter01);
                    if (objRtn01.dbException.SQLCODE.equals("1")) {
                        SQLCODE_uatp = "E";
                        MESSAGE_uatp = objRtn01.dbException.MESSAGE;
                    }
                }
                //mant. ID identif.                 
                JsonParser parser01 = new JsonParser();
                JsonArray gson_identif = parser01.parse(request.getParameter("bean_identif")).getAsJsonArray();
                for (JsonElement obj : gson_identif) {
                    JsonObject gsonObj = obj.getAsJsonObject();
                    SQP03960Filter filter02 = new SQP03960Filter();
                    filter02.VP_ACTION = gsonObj.get("crudState").getAsString();//filter.VP_ACTION; //request.getParameter("VP_ACTION");
                    filter02.A3979CDCLI = objRtn.OU_A3953CDCLI;//request.getParameter("VP_A3954CDCLI");                
                    filter02.A3979SEQID = gsonObj.get("A3979SEQID").getAsString();
                    filter02.A3979DESCR = gsonObj.get("A3979DESCR").getAsString();
                    filter02.A3979IDCLI = gsonObj.get("A3979IDCLI").getAsString();
                    filter02.A3979FALTA = gsonObj.get("A3979FALTA").getAsString();
                    filter02.A3979FBAJA = gsonObj.get("A3979FBAJA").getAsString();
                    objRtn02 = logic.setSQP03960(filter02);
                    if (objRtn02.dbException.SQLCODE.equals("1")) {
                        SQLCODE_identif = "E";
                        MESSAGE_identif = objRtn02.dbException.MESSAGE;
                    }
                }
            }
            //Existe MESSAGE al INSERTAR DETALLES
            if (SQLCODE_uatp.equals("E")) {
                objRtn.dbException.SQLCODE = "1";
                objRtn.dbException.MESSAGE = MESSAGE_uatp;
            }
             if (SQLCODE_identif.equals("E")) {
                objRtn.dbException.SQLCODE = "1";
                objRtn.dbException.MESSAGE = MESSAGE_identif;
            }
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/uploadLogo", method = RequestMethod.POST)
    public @ResponseBody
    String uploadLogo(ModelMap map, @RequestParam("logofile") MultipartFile logofile, HttpServletRequest request) throws IOException {
        SQP03875Filter filter = new SQP03875Filter();
        SQP03875Filter objRtn;
        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new CatalogoClienteLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.setSQP03875(filter, logofile);
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            objRtn = filter;
            objRtn.dbException.MESSAGE = ex.getMessage();
            objRtn.dbException.SQLCODE = "1";
            map.put("objRtn", objRtn);
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getImagen")
    public @ResponseBody
    String getImagen(ModelMap map, HttpServletRequest request) throws SQLException, Exception {
        SQP03875Filter filter = new SQP03875Filter();
        SQP03875Filter objRtn;
        map.put("success", true);
        try {
            
            filter.VP_OPCION = "R";
            filter.VP_CDCLI  = request.getParameter("VP_CDCLI");
            filter.VP_NOMBRE = "";
            filter.VP_PATHTMP = "";            
            logic = new CatalogoClienteLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.get_clienteLogo(filter );
            String LNOMBRE = objRtn.OU_NOMBRE;
            
            if(!LNOMBRE.trim().equals("")){
                //String rutaArchivo = "C:\\Dumps\\"+LNOMBRE;                
                String rutaArchivo = serverSession.propertySession.get("RUTA_DOWNLOAD")+"\\"+LNOMBRE;
                
                File archivo;
                byte[] bytes = new byte[240996];
                InputStream input = null;
                int k = 0;
                FileReader fr;
                BufferedReader br;
                archivo = new File(rutaArchivo);
                if (archivo.exists()) {
                    input = new FileInputStream(rutaArchivo);
                } 
                bytes = new byte[input.available()];
                while (true) {
                    k = input.read(bytes);
                    if (k == -1) {
                        break;
                    }
                }
                if (bytes != null) input.close();            
                String base64String = Base64.encodeBytes(bytes);            
                map.put("success", true);
                map.put("lstImagenes", base64String);
            }else{
                map.put("success", true);
                map.put("lstImagenes", "");
            }            
            
        } catch (IOException ex) {
            map.put("success", false);
            //System.out.println("--> " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search_uatp")
    public @ResponseBody
    String search_uatp(ModelMap map, HttpServletRequest request) {
        List<SQP03887Filter> listaData;
        SQP03887Filter filter;
        filter = new SQP03887Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_A3954TCUAT = request.getParameter("VP_A3954TCUAT");
            filter.VP_A3954CDCLI = request.getParameter("VP_A3954CDCLI");
            filter.VP_A3954DESCR = request.getParameter("VP_A3954DESCR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoClienteLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03887Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    //no usado 
    @RequestMapping(value = "mantenimiento_uatp")
    public @ResponseBody
    String mantenimiento_uatp(ModelMap map, HttpServletRequest request) {
        SQP03888Filter objRtn = null;
        logic = new CatalogoClienteLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            JsonParser parser = new JsonParser();
            JsonArray gson_uatp = parser.parse(request.getParameter("beanuatp")).getAsJsonArray();
            for (JsonElement obj : gson_uatp) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP03888Filter filter = new SQP03888Filter();
                filter.VP_ACTION = request.getParameter("VP_ACTION");
                filter.A3954TCUAT = gsonObj.get("A3954TCUAT").getAsString();
                filter.A3954DESCR = gsonObj.get("A3954DESCR").getAsString();
                filter.A3954CDCLI = request.getParameter("VP_A3954CDCLI");
                //filter.A3954TCUAM = gsonObj.get("A3954TCUAM").getAsString();
                filter.A3954FALTA = gsonObj.get("A3954FALTA").getAsString();
                filter.A3954FBAJA = gsonObj.get("A3954FBAJA").getAsString();
                objRtn = logic.setSQP03888(filter);
            }
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "/search_identif")
    public @ResponseBody
    String search_identif(ModelMap map, HttpServletRequest request) {
        List<SQP03959Filter> listaData;
        SQP03959Filter filter;
        filter = new SQP03959Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.A3979CDCLI = request.getParameter("VP_A3979CDCLI");
            filter.A3979IDCLI = request.getParameter("VP_A3979IDCLI");
            filter.A3979DESCR = request.getParameter("VP_A3979DESCR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoClienteLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03959Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    //no usado desde mant. de cliente    
    @RequestMapping(value = "mantenimiento_identif")
    public @ResponseBody
    String mantenimiento_identif(ModelMap map, HttpServletRequest request) {
        SQP03960Filter objRtn = null;
        logic = new CatalogoClienteLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            JsonParser parser = new JsonParser();
            JsonArray gson_uatp = parser.parse(request.getParameter("bean_identif")).getAsJsonArray();
            for (JsonElement obj : gson_uatp) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP03960Filter filter = new SQP03960Filter();
                filter.VP_ACTION = request.getParameter("VP_ACTION");
                filter.A3979CDCLI = gsonObj.get("A3979CDCLI").getAsString();
                filter.A3979SEQID = gsonObj.get("A3979SEQID").getAsString();
                filter.A3979DESCR = request.getParameter("A3979DESCR");
                filter.A3979IDCLI = gsonObj.get("A3979IDCLI").getAsString();
                filter.A3979FALTA = gsonObj.get("A3979FALTA").getAsString();
                filter.A3979FBAJA = gsonObj.get("A3979FBAJA").getAsString();
                objRtn = logic.setSQP03960(filter);
            }
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "/search_calendario")
    public @ResponseBody
    String search_calendario(ModelMap map, HttpServletRequest request) {
        List<SQP04006Filter> listaData;
        SQP04006Filter filter;
        filter = new SQP04006Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_A3965CDCLI = request.getParameter("VP_A3965CDCLI");
            filter.VP_A3965PERIO = request.getParameter("VP_A3965PERIO");
            filter.VP_A3965FEJEC = request.getParameter("VP_A3965FEJEC");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoClienteLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04006Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "/search_contrato")
    public @ResponseBody
    String search_contrato(ModelMap map, HttpServletRequest request) {
        List<SQP04038Filter> listaData;
        SQP04038Filter filter;
        filter = new SQP04038Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_A4007CDCLI = request.getParameter("VP_A4007CDCLI");
            filter.VP_A4007CONTR = request.getParameter("VP_A4007CONTR");            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CatalogoClienteLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04038Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ContratoCrud")
    public @ResponseBody
    String ContratoCrud(ModelMap map, HttpServletRequest request) {
        SQP04039Filter objRtn = null;
        logic = new CatalogoClienteLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            SQP04039Filter filter = new SQP04039Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            objRtn = logic.setSQP04039Filter(filter);            
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }
}
