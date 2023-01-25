/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1769Filter;
import net.miatech.beans.A1805Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ProcessingCommissionsLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.miatech.praxis.exceptions.SpringException;
import java.sql.SQLException;
import com.google.gson.Gson;
import java.io.File;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ProcessingCommissions")
public class ProcessingCommissionsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProcessingCommissionsLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ProcessingCommissions/form_index";
    }

    @RequestMapping(value = "proccessComission")
    public @ResponseBody
    String proccessComission(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProcessingCommissions : proccessComission-------------");
        map.put("success", true);
        logic = new ProcessingCommissionsLogic();
        A1805Filter filter = new A1805Filter();
        String result = "";
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A1805CCUST = request.getParameter("IN_A1805CCUST");
            filter.IN_A1805APL = request.getParameter("IN_A1805APL");
            filter.IN_A1805CLIEN = request.getParameter("IN_A1805CLIEN");
            filter.IN_A1805POLIZ = request.getParameter("IN_A1805POLIZ");
            filter.IN_A1805FECHA = request.getParameter("IN_A1805FECHA");
            filter.IN_A1805BATCH = request.getParameter("IN_A1805BATCH");
            filter.IN_A1805PROGA = request.getParameter("IN_A1805PROGA");
            filter.IN_A1805MODO = request.getParameter("IN_A1805MODO");
            filter.IN_A1805FILE = request.getParameter("IN_A1805FILE");
            filter.IN_PARAM = request.getParameter("IN_PARAM");

            result = logic.setPX214S01A1878(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("result", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadZonas")
    public @ResponseBody
    String loadZonas(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProcessingCommissions : loadZonas-------------");
        map.put("success", true);
        logic = new ProcessingCommissionsLogic();
        List<A1769Filter> listaData;
        String result = "";
        try {
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadZonas();
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("listaData", listaData);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Inplant Report : getFile");

        
        List<A1805Filter> listaData = new ArrayList<>(0);
        A1805Filter filter = new A1805Filter();
        
        String strType = request.getParameter("strType").trim();
        String strZona = request.getParameter("strZona").trim();
        String nameLote = request.getParameter("nameLote").trim();
        String nameText = request.getParameter("nameText").trim();

        /*filter.page.TOTROW = -1;
        filter.page.START = -1;
        filter.page.LIMIT = -1;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = -1;*/
        try {
            //int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            //filter.page.PAGROW = -1;
            //filter.page.PAGNUM = -1;
            
            logic = new ProcessingCommissionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.downloadText(nameLote);
            
            
        } catch (NumberFormatException | SQLException ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        
        StringBuilder line = new StringBuilder();
        String fileNameDownload = nameText; //Functions.getFechaActual()+"-Inplant-Commissions" + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        //String delim = "\t";
        //String delim = "\r\n";
        //String delim = ";";
        String delim = "";
        //String texto = "Cia" + delim
        //        + "\r\n";

        //line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            //listaData = this.getListTicket(request, true);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (A1805Filter item : listaData) {
                strTexto += item.OU_TRAMATXT + delim
                        + "\r\n";

            }
            line.append(strTexto.toString());

            InputStream input = new ByteArrayInputStream(line.toString().getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());
        }

    }
    
    
    
//     public JavaToFlexResponse downloadText(String nameFile,String nameLote, String strZona,String strType) {
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//        String rutaFile= serverSession.getProperty("RUTA_FILE_NAME").toString();
//        String rutaFlex= "";//serverSession.getProperty("RUTA_URL_FLEX").toString();
//        String strName = ""; 
//        
//        File dir = new File(rutaFile);
//        String[] ficheros = dir.list();
//        int existe=0;
//        PrintWriter pw = null; 
//        List<A1805Filter> listaData = null;
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "SalesProcessingCommissions : obtainDataText");
//        int intData = 0;
//        try {  
//            if(ficheros != null)
//            {
//                for (int x=0;x<ficheros.length;x++)
//                {
//                    if(ficheros[x].trim().equals(nameFile.trim())) //Si ya esta creado
//                    {
//                        existe=0;
//                        break;
//                    }                
//                }
//
//                if(existe!=1)  //Si no esta creado                
//                {
//                    //llamar store que trae la trama
//                    SalesProcessingCommissionsLogic logic = new SalesProcessingCommissionsLogic();
//                    logic.setSession(serverSession);
//                    listaData = logic.downloadText(nameLote);
//                    intData = listaData.size();
//                    if(listaData.size()>0)
//                    {
//                         pw = new PrintWriter(dir+"\\" + nameFile);
//                            for(A1805Filter obj : listaData)
//                            {
//                               String trama = obj.OU_TRAMATXT;
//                               pw.println(trama);                            
//                           }
//                         pw.flush();
//                         pw.close();
//                         pw = null;
//                    }
//                    else
//                    {
//                        pw = new PrintWriter(dir+"\\" + nameFile);
//                        String trama = "";
//                        pw.println(trama);                            
//                        pw.flush();
//                        pw.close();
//                        pw = null;
//                    }
//                }
//                resp.vars.put("lstFile", rutaFlex +"|"+ nameFile+"|"+ String.valueOf(intData) +"|"+ String.valueOf(Math.random()) + "|" + strName);
//                resp.vars.put("listaData",listaData);
//            }
//            else
//            {
//                resp.vars.put("lstFile", "Crear");
//                resp.vars.put("listaData",null);
//            }
//            
//        } catch (SQLException e) {
//            resp.info.add(e.getMessage());
//        logError.error(e.getMessage());        
//        } catch (IOException e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());                    
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());            
//        }
//        finally
//        {    
//            //if(existe!=1) pw.close();
//        }
//        
//        
//        return resp;
//    }    
    
    

}
