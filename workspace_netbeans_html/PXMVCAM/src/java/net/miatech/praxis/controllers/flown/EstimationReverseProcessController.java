/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sun.jna.Native;
import com.sun.jna.platform.win32.WinNT;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.ProcessBuilder.Redirect.Type;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1716Filter;
import net.miatech.beans.A1805Filter;
import net.miatech.beans.A2166Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.flown.EstimationReverseProcessLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import net.miatech.praxis.classes.Win32Process;
import net.miatech.praxis.classes.ZipDirectory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/EstimationReverseProcess")
public class EstimationReverseProcessController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private EstimationReverseProcessLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/EstimationReverseProcess/form_index";
    }

    @RequestMapping(value = "obtainDataText")
    public @ResponseBody
    String obtainDataText(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- EstimationReverseProcess : obtainDataText-------------");
        String data;
        String mensaje = "";
        A1805Filter filter = new A1805Filter();

        filter.IN_A1805CLIEN = request.getParameter("IN_A1805CLIEN");
        filter.IN_A1805POLIZ = request.getParameter("IN_A1805POLIZ");
        filter.IN_A1805MODO = request.getParameter("IN_A1805MODO");
        filter.IN_PARAM = request.getParameter("IN_PARAM");
        filter.IN_A1805CCUST = request.getParameter("IN_A1805CCUST");
        filter.IN_A1805APL = request.getParameter("IN_A1805APL");
        filter.IN_A1805FECHA = request.getParameter("IN_A1805FECHA");

        try {

            if (ValidaEstimado(filter)) {
                //Verificar que exista la propiedad
                String rutaArchivo = this.serverSession.propertySession.get("APP_CONTABILIDAD_FLOWN_EST_PROCESS_PATH") + "";

                if (rutaArchivo.length() > 0) {

                    String ejecutable = this.serverSession.propertySession.get("APP_CONTABILIDAD_FLOWN_EST_PROCESS_EXE") + "";
                    //Verificar que exista el archivo en la ruta especificada
                    File f = new File(rutaArchivo + ejecutable);
                    System.out.println("Ruta Archivo : " + rutaArchivo);
                    System.out.println("Ejecutable : " + ejecutable);
                    if (f.exists()) {
                        String archivo = rutaArchivo + ejecutable;

                        //Verifica si ya esta corriendo el proceso
                        boolean bActivo;
                        bActivo = verificarProcesoActivo(ejecutable);

                        if (bActivo) {
                            mensaje = "I";
                        } else {
                            Process process = new ProcessBuilder(archivo, filter.IN_A1805MODO,
                                    filter.IN_A1805CCUST, filter.IN_A1805APL,
                                    filter.IN_A1805CLIEN, filter.IN_A1805POLIZ, filter.IN_A1805FECHA,
                                    this.serverSession.getServerSession().getUserView().getUserInfo().USR, filter.IN_PARAM).start();

                            System.out.println("El proceso terminó.");
                            mensaje = "C";
                        }
                    } else {
                        mensaje = "R";
                        logError.error("Exception -> User:" + this.serverSession.getServerSession().getUserView().getUserInfo().USR + " Message: " + "Service file not found.");
                    }
                } else {
                    mensaje = "R";
                    logError.error("Exception -> User:" + this.serverSession.getServerSession().getUserView().getUserInfo().USR + " Message: " + "Service folder path not found.");
                }
            } else {
                mensaje = "X"; // TIENE TICKETS SIN CARRIER
            }

            map.put("lstQUERYTxt", mensaje);

        } catch (IOException e) {
            map.put("lstQUERYTxt", "R");
            logError.error(e.getMessage());
        }
        map.put("lstQUERYTxt", mensaje);
        map.put("success", true);
        return new Gson().toJson(map);

    }

    private boolean ValidaEstimado(A1805Filter filter) {
        try {
            A1716Filter filterValida = new A1716Filter();
            filterValida.A1716CCUST = filter.IN_A1805CCUST;
            filterValida.A1716FFILE = filter.IN_A1805FECHA;
            List<A1716Filter> listaValidaData;

            logic = new EstimationReverseProcessLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaValidaData = logic.loadEstimationControl(filterValida);

            if (listaValidaData.get(0).QTY > 0) {
                return false; // ERROR, EXISTEN CUPONES SIN CARRIER, VERIFICAR
            } else {
                return true; // OK
            }

        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        return false;
    }

    private boolean verificarProcesoActivo(String archivoEjecutable) {
        Win32Process w32 = new Win32Process();

        int[] processlist = new int[1024];
        int[] dummylist = new int[1024];

        Win32Process.Psapi.INSTANCE.EnumProcesses(processlist, 1024, dummylist);

        for (int pid : processlist) {
            String proc = "";

            proc += String.valueOf(pid);
            WinNT.HANDLE h;
            h = w32.GetProcessHandle(pid);

            if (h != null && pid > 0) {
                byte[] filename = new byte[512];

                Win32Process.Psapi.INSTANCE.GetModuleFileNameExA(h, null, filename, 1024);
                String nom;
                nom = Native.toString(filename);

                String[] arr = nom.split("\\\\");
                nom = arr[arr.length - 1];

                if (nom.toLowerCase().equals(archivoEjecutable.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }

    @RequestMapping(value = "resultadoDownload")
    public @ResponseBody
    String resultadoDownload(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- EstimationReverseProcess : resultadoDownload-------------");
        List<A2166Filter> listaData;

        A2166Filter filter = new A2166Filter();
        filter.IN_FPROC = request.getParameter("IN_A1805FECHA");
        filter.IN_TIPO = request.getParameter("IN_A1805MODO");
        System.out.println(" filter.IN_FPROC : " + request.getParameter("IN_A1805FECHA"));
        System.out.println(" filter.IN_TIPO : " + request.getParameter("IN_A1805MODO"));
        try {
            logic = new EstimationReverseProcessLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadResultadoDownload(filter);
            map.put("listaData", listaData);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            logError.error(e.getMessage());
        }
        map.put("success", true);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "verificaProceso")
    public @ResponseBody
    String verificaProceso(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- EstimationReverseProcess : verificaProceso-------------");
        String data;

        A1805Filter filter = new A1805Filter();
        filter.IN_A1805CLIEN = request.getParameter("IN_A1805CLIEN");
        filter.IN_A1805POLIZ = request.getParameter("IN_A1805POLIZ");
        filter.IN_A1805MODO = request.getParameter("IN_A1805MODO");
        filter.IN_PARAM = request.getParameter("IN_PARAM");
        filter.IN_A1805CCUST = request.getParameter("IN_A1805CCUST");
        filter.IN_A1805APL = request.getParameter("IN_A1805APL");
        filter.IN_A1805FECHA = request.getParameter("IN_A1805FECHA");

        String ejecutable = this.serverSession.propertySession.get("APP_CONTABILIDAD_FLOWN_EST_PROCESS_EXE") + "";
        try {
            if (!verificarProcesoActivo(ejecutable)) {
                map.put("lstValida", "C");
            } else {
                map.put("lstValida", "I");
            }
        } catch (Exception e) {
            map.put("lstValida", "R");
            logError.error(e.getMessage());
        }

        map.put("success", true);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadFiles")
    public @ResponseBody
    String downloadFiles(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- EstimationReverseProcess : downloadFiles-------------");
        // List<A2166Filter> listaData;
        Gson gson = new Gson();
        A2166Filter filter = new A2166Filter();
        String data;
        String modo;
        try {
            data = request.getParameter("lista");
            modo = request.getParameter("IN_A1805MODO");

            A2166Filter[] listaData = gson.fromJson(data, A2166Filter[].class);

            System.out.println(" data " + request.getParameter("lista"));
            System.out.println(" modo : " + request.getParameter("IN_A1805MODO"));
            String rutaFile = this.serverSession.propertySession.get("RUTA_POLIZA_FLOWN").toString();
            String rutaFlex = this.serverSession.propertySession.get("RUTA_URL_FLEX").toString();
            Date hora = new Date();
            String horaFile = "_" + hora.getHours() + hora.getMinutes() + hora.getSeconds();
            String strDirectory = listaData[0].FPROC + "_FLOWN_" + modo;
            File directory = new File(rutaFile + "\\" + strDirectory);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            for (A2166Filter obj : listaData) {

                if (obj.POLIZA_GL.equals("Y")) {
                    obj.IN_TIPO = modo.equals("EST") ? "E" : "X";
                    crearFile(obj, rutaFile, strDirectory);
                }
            }
            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + horaFile + ".zip");
            map.put("lstFile", rutaFlex + strDirectory + horaFile + ".zip|" + String.valueOf(Math.random()) + "|" + strDirectory + horaFile + ".zip");

        } catch (Exception e) {
            System.out.println(e.getMessage());
            logError.error(e.getMessage());
        }

        map.put("success", true);
        return new Gson().toJson(map);
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

    public void crearFile(A2166Filter obj, String rutaFile, String strDirectory) {
        String strName = strDirectory + "_" + obj.AIRLIN + "_" + obj.CARRIER;
        File dir = new File(rutaFile + "\\" + strDirectory + "\\" + strName);
        PrintWriter pw = null;
        File archivo = null;
        List<A2166Filter> listaData = null;
        File directory = new File(rutaFile + "\\" + strDirectory);

        try {
            logic = new EstimationReverseProcessLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.getTramaFile(obj);

            if (listaData.size() > 0) {
                directory.mkdir();
                dir.mkdir();

                archivo = new File(dir + "\\" + listaData.get(0).NCAMPO.trim() + ".txt");
                pw = new PrintWriter(archivo);

                for (A2166Filter objTrama : listaData) {
                    String trama = objTrama.CADENA.trim();
                    pw.println(trama);
                }

                pw.flush();
                pw.close();
            }

        } catch (IOException e) {
            //resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        } catch (Exception e) {
            //resp.info.add(e.getMessage());
            logError.error(e.getMessage());
        }
    }

}
