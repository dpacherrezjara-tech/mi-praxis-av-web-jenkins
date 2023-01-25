/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.payments;


import com.google.gson.Gson;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankAccountingVoucherLogic;
import net.miatech.praxis.payment.A2364;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.ServletOutputStream;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/BankAccountingVoucher")
public class BankAccountingVoucherController extends BaseController{
    

    private static final Logger logError = Logger.getLogger("errorLog");
    private BankAccountingVoucherLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- BankAccountingVoucherController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/BankAccountingVoucher/form_index";
    }
    
    

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2364> listaData;
        A2364 filter = new A2364();
        Gson gson = new Gson();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankAccountingVoucherController.class.getCanonicalName() + " : search");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2364.class);
            
            BankAccountingVoucherLogic logic = new BankAccountingVoucherLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            listaData = logic.loadPX491SQP02837(filter);


            map.put("success", true);
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, listaData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", listaData);
//                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            }
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    

    @RequestMapping(value = "searchDetPoli")
    public @ResponseBody
    String searchDetPoli(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2364> listaData;
        A2364 filter = new A2364();
        Gson gson = new Gson();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankAccountingVoucherController.class.getCanonicalName() + " : searchDetPoli");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2364.class);
            
            BankAccountingVoucherLogic logic = new BankAccountingVoucherLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            listaData = logic.loadPX491SQP02882(filter);


            map.put("success", true);
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, listaData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", listaData);
//                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            }
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchDet")
    public @ResponseBody
    String searchDet(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2364> listaData;
        A2364 filter = new A2364();
        Gson gson = new Gson();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankAccountingVoucherController.class.getCanonicalName() + " : searchDet");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2364.class);
            
            BankAccountingVoucherLogic logic = new BankAccountingVoucherLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if(filter.IN_FLAG.equals("1")){
                //searchDet
                listaData = logic.loadPX491SQP02880(filter);
            }else{
                //searchDetSin
                listaData = logic.loadPX491SQP03447(filter);
            }


            map.put("success", true);
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, listaData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", listaData);
//                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            }
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    
    

    @RequestMapping(value = "generateTXT")
    public @ResponseBody
    String generateTXT(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2364> listaData;
        A2364 filter = new A2364();
        Gson gson = new Gson();
        HashMap hm = new HashMap();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankAccountingVoucherController.class.getCanonicalName() + " : generateTXT");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2364.class);
            
            BankAccountingVoucherLogic logic = new BankAccountingVoucherLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            if(filter.IN_FLAG.equals("1")){
                //generateTXT
                hm = logic.loadPX491SQP0491XX2(filter);
            }else{
                //generateTXTsin
                hm = logic.loadPX491SQP0491XX1(filter);
            }


            
//            String downloadName = String.format("BussinessTools_%1$s.txt", UUID.randomUUID().toString().toLowerCase());
            String downloadName = "PolicyLINE_" +Functions.getMonthConvert(Functions.getFechaActual())+ "_" + Functions.getHoraActual()+".txt";
            String downloadName2 = "PolicyDETA_" +Functions.getMonthConvert(Functions.getFechaActual())+ "_" + Functions.getHoraActual()+".txt";
            
            PrintWriter pwAtt = null;
            PrintWriter pwAtt2 = null;
            String strArchivo = (String)serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD") + "\\" + downloadName;
            String strArchivo2 = (String)serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD") + "\\" + downloadName2;
            
            File file = new File(strArchivo);
            if (file.exists())
                file.delete();  
            
            File file2 = new File(strArchivo2);
            if (file2.exists())
                file2.delete(); 
            
            pwAtt = new PrintWriter(strArchivo, "UTF-8");
            pwAtt2 = new PrintWriter(strArchivo2, "UTF-8");
            
            List<A2364> lstLINE =  (List<A2364>) hm.get("lstLINE");
            List<A2364> lstDETA =  (List<A2364>) hm.get("lstDETA");
            A2364 obj = new A2364();
            String linea="";
            for (int i = 0; i < lstLINE.size(); i++) {
                obj = lstLINE.get(i) ;
                linea = obj.DESCRT ;
                
                pwAtt.println(linea);
            }
            
            pwAtt.flush();
            pwAtt.close();
            
            
            linea ="";
            for (int d = 0; d < lstDETA.size(); d++) {
                obj = lstDETA.get(d) ;
                linea = obj.DESCRT ;
                
                pwAtt2.println(linea);
            }
            
            pwAtt2.flush();
            pwAtt2.close();
            
            
                                              
//            response.setContentType("text/plain"); 
//            response.setContentLength((int)file.length()); 
//            response.setHeader("Content-Disposition", "attachment; filename=\"" +  downloadName  + "\"");    
//
//            response.setContentType("text/plain"); 
//            response.setContentLength((int)file2.length()); 
//            response.setHeader("Content-Disposition", "attachment; filename=\"" +  downloadName2  + "\"");  
            
            
            
            
            //Create list for file URLs - these are files from all different locations
            List<String> filenames = new ArrayList<String>();
            filenames.add(strArchivo);
            filenames.add(strArchivo2);
            
            //..code to add URLs to the list
            byte[] buf = new byte[2048];

            // Create the ZIP file
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream out = new ZipOutputStream(baos);

            // Compress the files
            for (int i=0; i<filenames.size(); i++) {

            FileInputStream fis = new FileInputStream(filenames.get(i).toString());
            BufferedInputStream bis = new BufferedInputStream(fis);

            // Add ZIP entry to output stream.
            File filezip = new File(filenames.get(i).toString());
            String entryname = filezip.getName();
            out.putNextEntry(new ZipEntry(entryname));

            int bytesRead;
            while ((bytesRead = bis.read(buf)) != -1) {
            out.write(buf, 0, bytesRead);
            }

            out.closeEntry();
            bis.close();
            fis.close();
            }

            out.flush();
            baos.flush();
            out.close();
            baos.close();

            ServletOutputStream sos = response.getOutputStream();
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=\"Policy.ZIP\"");
            sos.write(baos.toByteArray());
            out.flush();
            out.close();
            sos.flush();


            
            
            
//            BufferedInputStream inputs = null;
//            BufferedOutputStream output = null;
//            
//            try 
//            {
//              inputs = new BufferedInputStream(new FileInputStream(file), (int)file.length());
//              output = new BufferedOutputStream(response.getOutputStream(), (int)file.length());
//
//              byte[] buffer = new byte[(int)file.length()];
//              int length;
//              while ((length = inputs.read(buffer)) > 0) 
//              {
//                output.write(buffer, 0, length);
//              }
//            } 
//            finally 
//            {
//              output.close();
//              inputs.close();
//            }        
            
            map.put("success", true);
//            map.put("lstLINE", hm.get("lstLINE"));
//            map.put("lstDETA", hm.get("lstDETA"));
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    

    @RequestMapping(value = "searchDetCtas")
    public @ResponseBody
    String searchDetCtas(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2364> listaData;
        A2364 filter = new A2364();
        Gson gson = new Gson();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, BankAccountingVoucherController.class.getCanonicalName() + " : searchDetCtas");

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2364.class);
            
            BankAccountingVoucherLogic logic = new BankAccountingVoucherLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            listaData = logic.loadPX491SQP03448(filter);


            map.put("success", true);
            if (Boolean.parseBoolean(request.getParameter("dw_excel"))) {
                String nameExcel = ExportUtil.exportFields(request, response, listaData);
                map.put("nameExcel", nameExcel);
            } else {
                map.put("data", listaData);
//                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            }
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
//    
//    
//     public JavaToFlexResponse searchPoli(A2364 filter) {
//        JavaToFlexResponse resp = new JavaToFlexResponse();
//
//        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrBankAccVoucher.class.getCanonicalName() + " : searchPoli");
//        List<A2364> listaData;
//
//        try {
//
//            LoadBankAccVoucherLogic logic = new LoadBankAccVoucherLogic();
//            logic.setSession(serverSession);
//
//            listaData = logic.loadPX491SQP02882POLI(filter);
//            resp.vars.put("lstPoli", listaData);
//
//        } catch (Exception e) {
//            resp.info.add(e.getMessage());
//            logError.error(e.getMessage());
//        }
//
//        return resp;
//    }
//    
//    
    
}
