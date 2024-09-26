/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AccountingLogic;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.payment.filter.SQP05252Filter;
import net.miatech.praxis.payment.filter.SQP05253Filter;
import net.miatech.praxis.payment.filter.SQP05352Filter;
import net.miatech.praxis.payment.filter.SQP05343Filter;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/Accounting")
public class AccountingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingLogic logic;

    
    @RequestMapping(value = "/loadProcessors")
    public @ResponseBody
    String searchProcessor(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        try {

            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadProcessors();
            map.put("data", listaData);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
            System.out.println(ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "procesarArchivos")
    public @ResponseBody
    String procesarArchivos(ModelMap map, HttpServletRequest request) {

        SQP05233Filter filter = new SQP05233Filter();
        SQP05233Filter objRtn = new SQP05233Filter();

        try {
            logic = new AccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP05233Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);

        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "cargarArchivos")
    public @ResponseBody
    String cargarArchivos(ModelMap map, HttpServletRequest request) {

        SQP05343Filter filter = new SQP05343Filter();
        SQP05343Filter objRtn = new SQP05343Filter();

        try {
            logic = new AccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP05343Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);

        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "reversar")
    public @ResponseBody
    String reversarContabilidad(ModelMap map, HttpServletRequest request) {

        SQP05343Filter filter = new SQP05343Filter();
        SQP05343Filter objRtn = new SQP05343Filter();

        try {
            logic = new AccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP05393Filter(filter);
            map.put("objRtn", objRtn);
            map.put("success", true);

        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "0";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", true);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP05253Filter> listaData;
        SQP05253Filter filter;
        filter = new SQP05253Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05253Filter(filter);

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
    
    @RequestMapping(value = "/searchRegistration")
    public @ResponseBody
    String searchRegistration(ModelMap map, HttpServletRequest request) {
        List<SQP05352Filter> listaData;
        SQP05352Filter filter;
        filter = new SQP05352Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP05352Filter(filter);

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
    
    @RequestMapping(value = "getDownloadFileTxt")
    public @ResponseBody
    void getDownloadFileTxt(HttpServletRequest request, HttpServletResponse response) {
        
        SQP05252Filter filter = new SQP05252Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("ddMMyyyy");
        String formattedDate = myDateObj.format(myFormatObj);

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new AccountingLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP05252Filter> lst = logic.getSQP05252Filter(filter);

            String vl_fileName = "CARGUE_TC_" + formattedDate + "_" + filter.FNAME; // + filter.IN_LEXT;
            File file = new File(rutaFile + "\\" + vl_fileName + ".txt");

            if (file.exists()) {
                file.delete();
            }

            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena;

            int len = lst.size();
            for (int vi = 0; vi < len; vi++) {
                cadena = "";
                cadena += "" + lst.get(vi).DETA;
                writer.println("" + cadena);
            }
            writer.flush();

//            Comprimimos archivo generado para su optima descarga
//            if (!zip(vl_fileName))            
//            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + vl_fileName + ".zip" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".zip");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();

            response.setContentType("application/text");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + vl_fileName + ".txt" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + vl_fileName + ".txt");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            e.printStackTrace();
            throw new SpringException(e);
        }

    }

    public Boolean zip(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".zip");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }
    
//    @RequestMapping(value = "/updatePending")
//    public
//    void updatePending(ModelMap map, HttpServletRequest request) {
//        try {
//
//            logic = new AccountingLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            logic.updatePending();
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//        }
//        
//    }
}
