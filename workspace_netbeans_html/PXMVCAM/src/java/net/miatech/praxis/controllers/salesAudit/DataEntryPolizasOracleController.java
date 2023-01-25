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
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP01023Filter;
import net.miatech.praxis.classes.ZipDirectory;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.DataEntryPolizasOracleLogic;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/OracleReportForm")
public class DataEntryPolizasOracleController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DataEntryPolizasOracleLogic logic;

    @RequestMapping(value = "searchOracle")
    public @ResponseBody
    String searchOracle(ModelMap map, HttpServletRequest request) {
        List<SQP01023Filter> lst;
        SQP01023Filter filter = new SQP01023Filter();

        try {
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.searchOracle(filter);
        } catch (Exception e) {
            throw new SpringException(e);

        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBspLink")
    public @ResponseBody
    String searchBspLink(ModelMap map, HttpServletRequest request) {
        List<SQP00874Filter> lst;
        SQP00874Filter filter = new SQP00874Filter();

        try {
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_OPCION = request.getParameter("VP_OPCION");

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lst = logic.searchBspLink(filter);
        } catch (Exception e) {
            throw new SpringException(e);

        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "executeNumber")
    public @ResponseBody
    String executeNumber(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00874Filter filter = new SQP00874Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_FTE = request.getParameter("VP_FTE");
            filter.VP_COUTRY = request.getParameter("VP_COUTRY");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_Typemasiv = request.getParameter("VP_Typemasiv");
            filter.VP_Area = request.getParameter("VP_Area");

            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.executeNumber(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcExecuteOracle")
    public @ResponseBody
    String ProcExecuteOracle(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        SQP00874Filter filter = new SQP00874Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String type = request.getParameter("bean");
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcExecuteOracle(gridData, type);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProceOracleARC")
    public @ResponseBody
    String ProceOracleARC(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProceOracleARC(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadPolizasTxt")
    public @ResponseBody
    void downloadPolizasTxt(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        List<SQP00874Filter> lstARCLoadControl;
        File archivo = null;
        File archivo2 = null;
        File archivo3 = null;
        File archivo4 = null;
        File archivo5 = null;
        File dir2 = null;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String retorno = "";
        String rutaFija = "";
        String hora = "";
        String strTexto3 = "";
        String NCAMPO3 = "";
        String strTexto4 = "";
        String NCAMPO4 = "";
        String strTexto5 = "";
        String NCAMPO5 = "";
        Integer corrl = 0;
        try {

            Date myDate = new Date();
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());

            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            String strDirectory = "Polizas";
            File directory = new File(rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            directory.mkdir();
            for (SQP00874Filter obj : gridData) {

                dir2 = new File(directory, obj.AREA);
                if (!dir2.exists()) {
                    dir2.mkdir();
                }
                rutaFija = rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR + File.separator + obj.AREA;
                String strTexto1 = "";
                String NCAMPO1 = "";
                String strTexto2 = "";
                String NCAMPO2 = "";

                List<SQP00874Filter> lst_search_CAB = logic.searchDetaOracleQuery(obj, "1");
                List<SQP00874Filter> lst_search_DET = logic.searchDetaOracleQuery(obj, "2");
                if (corrl == 0) {
                    List<SQP00874Filter> lst_search_IMPUESTOS = logic.searchDetaOracleQuery(obj, "6");
                    List<SQP00874Filter> lst_search_GL = logic.searchDetaOracleQuery(obj, "7");
                    List<SQP00874Filter> lst_search_GL_UP = logic.searchDetaOracleQuery(obj, "8");

                    //polizas para impuestos controlados
                    for (int i = 0; i < lst_search_IMPUESTOS.size(); i++) {
                        strTexto3 += lst_search_IMPUESTOS.get(i).CADENA + "\r\n";
                        if (!lst_search_IMPUESTOS.get(i).NCAMPO.equals("")) {
                            NCAMPO3 = lst_search_IMPUESTOS.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera
                    if (lst_search_IMPUESTOS.size() > 0) {
                        archivo3 = new File(rutaFija + File.separator + NCAMPO3 + ".txt");
                        FileWriter datos3 = new FileWriter(archivo3, true);
                        datos3.write(strTexto3);
                        datos3.close();
                    }

                    //polizas para GL NORMALES
                    for (int i = 0; i < lst_search_GL.size(); i++) {
                        strTexto4 += lst_search_GL.get(i).CADENA + "\r\n";
                        if (!lst_search_GL.get(i).NCAMPO.equals("")) {
                            NCAMPO4 = lst_search_GL.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera GL NORMALES
                    if (lst_search_GL.size() > 0) {
                        archivo4 = new File(rutaFija + File.separator + NCAMPO4 + ".txt");
                        FileWriter datos4 = new FileWriter(archivo4, true);
                        datos4.write(strTexto4);
                        datos4.close();
                    }

                    //polizas para GL UPFRONT
                    for (int i = 0; i < lst_search_GL_UP.size(); i++) {
                        strTexto5 += lst_search_GL_UP.get(i).CADENA + "\r\n";
                        if (!lst_search_GL_UP.get(i).NCAMPO.equals("")) {
                            NCAMPO5 = lst_search_GL_UP.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera GL UPFRONT
                    if (lst_search_GL_UP.size() > 0) {
                        archivo5 = new File(rutaFija + File.separator + NCAMPO5 + ".txt");
                        FileWriter datos5 = new FileWriter(archivo5, true);
                        datos5.write(strTexto5);
                        datos5.close();
                    }

                }
                corrl = 1;
                /*<!--CREACION DE LAS POLIZAS --> */

                for (int i = 0; i < lst_search_CAB.size(); i++) {
                    strTexto1 += lst_search_CAB.get(i).CADENA + "\r\n";
                    if (!lst_search_CAB.get(i).NCAMPO.equals("")) {
                        NCAMPO1 = lst_search_CAB.get(i).NCAMPO;
                    }
                }
                /*detalle*/
                for (int i = 0; i < lst_search_DET.size(); i++) {
                    strTexto2 += lst_search_DET.get(i).CADENA + "\r\n";
                    if (!lst_search_DET.get(i).NCAMPO.equals("")) {
                        NCAMPO2 = lst_search_DET.get(i).NCAMPO;
                    }
                }
                //polizas de la cabecera
                archivo = new File(rutaFija + File.separator + NCAMPO1 + ".txt");
                FileWriter datos1 = new FileWriter(archivo, true);
                datos1.write(strTexto1);
                datos1.close();
                // File dirctorio1 = new File(directorio);

                //polizas del detalle
                archivo2 = new File(rutaFija + File.separator + NCAMPO2 + ".txt");
                FileWriter datos2 = new FileWriter(archivo2, true);
                datos2.write(strTexto2);
                datos2.close();

            }
            hora = Functions.getHoraActual();

            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + hora + ".zip");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + directory.getAbsolutePath() + hora + ".zip" + "\"");
            InputStream is = new FileInputStream(directory.getAbsolutePath() + hora + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
            // System.out.println("" + e.getMessage());

        }

    }

    @RequestMapping(value = "downloadPolizasARCTxt")
    public @ResponseBody
    void downloadPolizasARCTxt(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        List<SQP00874Filter> lstARCLoadControl;
        File archivo = null;
        File archivo2 = null;
        File archivo3 = null;
        File archivo4 = null;
        File dir2 = null;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String rutaFija = "";
        String hora = "";
        String strTexto3 = "";
        String NCAMPO3 = "";
        String strTexto4 = "";
        String NCAMPO4 = "";
        Integer corrl = 0;
        try {

            Date myDate = new Date();
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());

            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            String strDirectory = "Polizas_ARC";
            File directory = new File(rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            directory.mkdir();
            for (SQP00874Filter obj : gridData) {

                dir2 = new File(directory, obj.AREA);
                if (!dir2.exists()) {
                    dir2.mkdir();
                }
                rutaFija = rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR + File.separator + obj.AREA;
                String strTexto1 = "";
                String NCAMPO1 = "";
                String strTexto2 = "";
                String NCAMPO2 = "";

                List<SQP00874Filter> lst_search_CAB = logic.searchDetaOracleARC(obj, "1");
                List<SQP00874Filter> lst_search_DET = logic.searchDetaOracleARC(obj, "2");
                if (corrl == 0) {
                    List<SQP00874Filter> lst_search_IMPUESTOS = logic.searchDetaOracleARC(obj, "3");
                    List<SQP00874Filter> lst_search_GL = logic.searchDetaOracleARC(obj, "4");

                    //polizas para impuestos controlados
                    for (int i = 0; i < lst_search_IMPUESTOS.size(); i++) {
                        strTexto3 += lst_search_IMPUESTOS.get(i).CADENA + "\r\n";
                        if (!lst_search_IMPUESTOS.get(i).NCAMPO.equals("")) {
                            NCAMPO3 = lst_search_IMPUESTOS.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera
                    if (lst_search_IMPUESTOS.size() > 0) {
                        archivo3 = new File(rutaFija + File.separator + NCAMPO3 + ".txt");
                        FileWriter datos3 = new FileWriter(archivo3, true);
                        datos3.write(strTexto3);
                        datos3.close();
                    }

                    //polizas para GL NORMALES
                    for (int i = 0; i < lst_search_GL.size(); i++) {
                        strTexto4 += lst_search_GL.get(i).CADENA + "\r\n";
                        if (!lst_search_GL.get(i).NCAMPO.equals("")) {
                            NCAMPO4 = lst_search_GL.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera GL NORMALES
                    if (lst_search_GL.size() > 0) {
                        archivo4 = new File(rutaFija + File.separator + NCAMPO4 + ".txt");
                        FileWriter datos4 = new FileWriter(archivo4, true);
                        datos4.write(strTexto4);
                        datos4.close();
                    }

                }
                corrl = 1;
                /*<!--CREACION DE LAS POLIZAS --> */

                for (int i = 0; i < lst_search_CAB.size(); i++) {
                    strTexto1 += lst_search_CAB.get(i).CADENA + "\r\n";
                    if (!lst_search_CAB.get(i).NCAMPO.equals("")) {
                        NCAMPO1 = lst_search_CAB.get(i).NCAMPO;
                    }
                }
                /*detalle*/
                for (int i = 0; i < lst_search_DET.size(); i++) {
                    strTexto2 += lst_search_DET.get(i).CADENA + "\r\n";
                    if (!lst_search_DET.get(i).NCAMPO.equals("")) {
                        NCAMPO2 = lst_search_DET.get(i).NCAMPO;
                    }
                }
                //polizas de la cabecera
                if (lst_search_CAB.size() > 0) {
                    archivo = new File(rutaFija + File.separator + NCAMPO1 + ".txt");
                    FileWriter datos1 = new FileWriter(archivo, true);
                    datos1.write(strTexto1);
                    datos1.close();
                }

                // File dirctorio1 = new File(directorio);
                if (lst_search_DET.size() > 0) {
                    archivo2 = new File(rutaFija + File.separator + NCAMPO2 + ".txt");
                    FileWriter datos2 = new FileWriter(archivo2, true);
                    datos2.write(strTexto2);
                    datos2.close();
                }
                //polizas del detalle

            }
            hora = Functions.getHoraActual();

            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + hora + ".zip");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + directory.getAbsolutePath() + hora + ".zip" + "\"");
            InputStream is = new FileInputStream(directory.getAbsolutePath() + hora + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
            // System.out.println("" + e.getMessage());

        }

    }

    @RequestMapping(value = "ProceOracleASR")
    public @ResponseBody
    String ProceOracleASR(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProceOracleASR(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadPolizasASRFRATxt")
    public @ResponseBody
    void searchDetaOracleASR(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ArrayList<SQP00874Filter> gridData = new ArrayList<SQP00874Filter>();
        List<SQP00874Filter> lstARCLoadControl;
        File archivo = null;
        File archivo2 = null;
        File archivo3 = null;
        File archivo4 = null;
        File archivo5 = null;
        File archivo6 = null;
        File dir2 = null;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String retorno = "";
        String rutaFija = "";
        String hora = "";
        String strTexto3 = "";
        String NCAMPO3 = "";
        String strTexto4 = "";
        String NCAMPO4 = "";
        String strTexto5 = "";
        String NCAMPO5 = "";
        Integer corrl = 0;
        String NCAMPO6 = "";
        String strTexto6 = "";
        try {

            Date myDate = new Date();
            logic = new DataEntryPolizasOracleLogic();
            logic.setSession(this.serverSession.getServerSession());

            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00874Filter data = new SQP00874Filter();
                data.FPROC = gsonObj.get("FPROC").getAsString();
                data.FUENT = gsonObj.get("FUENT").getAsString();
                data.PAIS = gsonObj.get("PAIS").getAsString();
                data.BASE = gsonObj.get("BASE").getAsString();
                data.TYPE = gsonObj.get("TYPE").getAsString();
                data.AREA = gsonObj.get("AREA").getAsString();
                gridData.add(data);

            }
            String strDirectory = "Polizas_ASR";
            File directory = new File(rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            directory.mkdir();
            for (SQP00874Filter obj : gridData) {

                dir2 = new File(directory, obj.AREA);
                if (!dir2.exists()) {
                    dir2.mkdir();
                }
                rutaFija = rutaFile + File.separator + strDirectory + "" + this.serverSession.getServerSession().getUserView().getUserInfo().USR + File.separator + obj.AREA;
                String strTexto1 = "";
                String NCAMPO1 = "";
                String strTexto2 = "";
                String NCAMPO2 = "";

                List<SQP00874Filter> lst_search_AP_CAB = logic.searchDetaOracleASR(obj, "1");
                List<SQP00874Filter> lst_search_DET_DET = logic.searchDetaOracleASR(obj, "2");
                if (corrl == 0) {
                    List<SQP00874Filter> lst_search_AR_CAB = logic.searchDetaOracleASR(obj, "3");
                    List<SQP00874Filter> lst_search_AR_DET = logic.searchDetaOracleASR(obj, "4");
                    List<SQP00874Filter> lst_search_GL_AP = logic.searchDetaOracleASR(obj, "5");
                    List<SQP00874Filter> lst_search_GL = logic.searchDetaOracleASR(obj, "6");

                    //polizas para impuestos controlados
                    for (int i = 0; i < lst_search_AR_CAB.size(); i++) {
                        strTexto3 += lst_search_AR_CAB.get(i).CADENA + "\r\n";
                        if (!lst_search_AR_CAB.get(i).NCAMPO.equals("")) {
                            NCAMPO3 = lst_search_AR_CAB.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera
                    if (lst_search_AR_CAB.size() > 0) {
                        archivo3 = new File(rutaFija + File.separator + NCAMPO3 + ".txt");
                        FileWriter datos3 = new FileWriter(archivo3, true);
                        datos3.write(strTexto3);
                        datos3.close();
                    }

                    //polizas para GL NORMALES
                    for (int i = 0; i < lst_search_AR_DET.size(); i++) {
                        strTexto4 += lst_search_AR_DET.get(i).CADENA + "\r\n";
                        if (!lst_search_AR_DET.get(i).NCAMPO.equals("")) {
                            NCAMPO4 = lst_search_AR_DET.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera GL NORMALES
                    if (lst_search_AR_DET.size() > 0) {
                        archivo4 = new File(rutaFija + File.separator + NCAMPO4 + ".txt");
                        FileWriter datos4 = new FileWriter(archivo4, true);
                        datos4.write(strTexto4);
                        datos4.close();
                    }

                    //polizas para GL UPFRONT
                    for (int i = 0; i < lst_search_GL_AP.size(); i++) {
                        strTexto5 += lst_search_GL_AP.get(i).CADENA + "\r\n";
                        if (!lst_search_GL_AP.get(i).NCAMPO.equals("")) {
                            NCAMPO5 = lst_search_GL_AP.get(i).NCAMPO;
                        }
                    }
                    //polizas de la cabecera GL UPFRONT
                    if (lst_search_GL_AP.size() > 0) {
                        archivo5 = new File(rutaFija + File.separator + NCAMPO5 + ".txt");
                        FileWriter datos5 = new FileWriter(archivo5, true);
                        datos5.write(strTexto5);
                        datos5.close();
                    }

                    // POLIZAS 
                    for (int i = 0; i < lst_search_GL.size(); i++) {
                        strTexto6 += lst_search_GL.get(i).CADENA + "\r\n";
                        if (!lst_search_GL.get(i).NCAMPO.equals("")) {
                            NCAMPO6 = lst_search_GL.get(i).NCAMPO;
                        }
                    }
                    if (lst_search_GL.size() > 0) {
                        archivo6 = new File(rutaFija + File.separator + NCAMPO6 + ".txt");
                        FileWriter datos6 = new FileWriter(archivo6, true);
                        datos6.write(strTexto6);
                        datos6.close();
                    }

                }
                corrl = 1;
                /*<!--CREACION DE LAS POLIZAS --> */

                for (int i = 0; i < lst_search_AP_CAB.size(); i++) {
                    strTexto1 += lst_search_AP_CAB.get(i).CADENA + "\r\n";
                    if (!lst_search_AP_CAB.get(i).NCAMPO.equals("")) {
                        NCAMPO1 = lst_search_AP_CAB.get(i).NCAMPO;
                    }
                }
                /*detalle*/
                for (int i = 0; i < lst_search_DET_DET.size(); i++) {
                    strTexto2 += lst_search_DET_DET.get(i).CADENA + "\r\n";
                    if (!lst_search_DET_DET.get(i).NCAMPO.equals("")) {
                        NCAMPO2 = lst_search_DET_DET.get(i).NCAMPO;
                    }
                }
                //polizas de la cabecera
                if (lst_search_AP_CAB.size() > 0) {
                    archivo = new File(rutaFija + File.separator + NCAMPO1 + ".txt");
                    FileWriter datos1 = new FileWriter(archivo, true);
                    datos1.write(strTexto1);
                    datos1.close();
                }

                // File dirctorio1 = new File(directorio);
                //polizas del detalle
                if (lst_search_DET_DET.size() > 0) {
                    archivo2 = new File(rutaFija + File.separator + NCAMPO2 + ".txt");
                    FileWriter datos2 = new FileWriter(archivo2, true);
                    datos2.write(strTexto2);
                    datos2.close();
                }

            }
            hora = Functions.getHoraActual();

            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + hora + ".zip");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + directory.getAbsolutePath() + hora + ".zip" + "\"");
            InputStream is = new FileInputStream(directory.getAbsolutePath() + hora + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            throw new SpringException(e);
            // System.out.println("" + e.getMessage());

        }

    }

    public static void deleteFolder(File folder) {
        File[] files = folder.listFiles();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteFolder(f);
                } else {
                    f.delete();
                }
            }
        }
        folder.delete();
    }

}
