/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import net.miatech.praxis.controllers.flown.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.PX0094S01A007Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
import net.miatech.praxis.logic.sales.ProrationFactorPMPLogic;
import net.miatech.praxis.logic.sales.ProvisosTextLogic;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import static net.miatech.praxis.controllers.tnu.AtlUsageNoSaleController.zipFile;
import net.miatech.praxis.logic.LoadDataLogic;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ProrationFactorsPMP")
public class ProrationFactorPMPController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProrationFactorPMPLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ProrationFactorsPMP/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ProrationFactorsPMP : Controller-------------");
        map.put("success", true);
        List<PX0094S01A007Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX0094S01A007Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ProrationFactorPMPLogic();

        List<PX0094S01A007Filter> lst = new ArrayList<>(0);
        PX0094S01A007Filter filter = new PX0094S01A007Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        String strALL = "";

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_FFILTRO = request.getParameter("IN_FFILTRO");
            filter.IN_CITY_ORIG = request.getParameter("IN_CITY_ORIG");
            filter.IN_CITY_DEST = request.getParameter("IN_CITY_DEST");
            filter.IN_DATE_FROM = request.getParameter("IN_DATE_FROM");
            filter.IN_DATE_TO = request.getParameter("IN_DATE_TO");
            filter.IN_CORDER = request.getParameter("IN_CORDER");
            filter.IN_DORDER = request.getParameter("IN_DORDER");
            filter.IN_DISPLAY = request.getParameter("IN_DISPLAY");
            filter.IN_MODE = request.getParameter("IN_MODE");
            
            strALL = filter.IN_DATE_FROM;

            String strYear = "";
            int intYear = 0;
            String strMonth = "";
            if(filter.IN_DATE_FROM.length() == 6){
                strYear = filter.IN_DATE_FROM.substring(0, 4);
                strMonth = filter.IN_DATE_FROM.substring(4, 6);
                intYear = Integer.parseInt(strYear);
                if(Integer.parseInt(strMonth) == 12 || Integer.parseInt(strMonth) == 1 || Integer.parseInt(strMonth) == 2){
                    filter.IN_DATE_FROM = strYear + "12";
                    if(Integer.parseInt(strMonth) == 1 || Integer.parseInt(strMonth) == 2)
                    {
                        intYear--;
                        strYear = String.valueOf(intYear);
                        filter.IN_DATE_FROM = strYear + "12";
                    }
                    strMonth = "Dec";                
                }
                else if(Integer.parseInt(strMonth) == 3 || Integer.parseInt(strMonth) == 4 || Integer.parseInt(strMonth) == 5){
                    filter.IN_DATE_FROM = strYear + "03";
                    strMonth = "Mar";
                }
                else if(Integer.parseInt(strMonth) == 6 || Integer.parseInt(strMonth) == 7 || Integer.parseInt(strMonth) == 8){
                    filter.IN_DATE_FROM = strYear + "06";
                    strMonth = "Jun";
                }
                else if(Integer.parseInt(strMonth) == 9 || Integer.parseInt(strMonth) == 10 || Integer.parseInt(strMonth) == 11){
                    filter.IN_DATE_FROM = strYear + "09";
                    strMonth = "Sep";
                }            
                filter.IN_DATE_TO = filter.IN_DATE_FROM;
            }
            else if(filter.IN_DATE_FROM.length() == 4)
            {
                strYear = filter.IN_DATE_FROM.substring(0, 4);
                intYear = Integer.parseInt(strYear);
                intYear--;
                filter.IN_DATE_FROM = String.valueOf(intYear)+ "12";                
                filter.IN_DATE_TO = strYear + "09";
            }
            
            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));

            System.out.println("-------------------------------------------------- ");

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

            if(strALL.length() == 6){
                if("FACTOR".equals(filter.IN_MODE))
                    lst = logic.loadPX0094S01A007(filter);
                else 
                    lst = logic.loadSQP03924(filter);
            }
            /*else if(strALL.length() == 4){
                if("FACTOR".equals(filter.IN_MODE))
                    lst = logic.loadSQP03926(filter);
                else 
                    lst = logic.loadSQP03928(filter);
            }   */         

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }    
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
    
        List<PX0094S01A007Filter> listaData = this.getList(request, false);        
        String strALL = "";
        Functions.msjConsola("PRAXIS",  this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ScrProrationFactorsPMP");
        try {
            LoadDataLogic logic = new LoadDataLogic();
            logic.setSession(this.serverSession.getServerSession());   
            String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
            String RUTA_FILE_NAME_SERVER_40 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_40").toString();
            String RUTA_FILE_NAME_SERVER_41 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_41").toString();
            String RUTA_FILE_NAME_SERVER_33 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_33").toString();
            DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            Date date = new Date();
            
            PX0094S01A007Filter filter = new PX0094S01A007Filter();
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            
            filter.IN_FFILTRO = request.getParameter("IN_FFILTRO");
            filter.IN_CITY_ORIG = request.getParameter("IN_CITY_ORIG");
            filter.IN_CITY_DEST = request.getParameter("IN_CITY_DEST");
            filter.IN_DATE_FROM = request.getParameter("IN_DATE_FROM");
            filter.IN_DATE_TO = request.getParameter("IN_DATE_TO");
            filter.IN_CORDER = request.getParameter("IN_CORDER");
            filter.IN_DORDER = request.getParameter("IN_DORDER");
            filter.IN_DISPLAY = request.getParameter("IN_DISPLAY");
            filter.IN_MODE = request.getParameter("IN_MODE");
            
            strALL = filter.IN_DATE_FROM;

            String strYear = "";
            int intYear = 0;
            String strMonth = "";
            if(filter.IN_DATE_FROM.length() == 6){
                strYear = filter.IN_DATE_FROM.substring(0, 4);
                strMonth = filter.IN_DATE_FROM.substring(4, 6);
                intYear = Integer.parseInt(strYear);
                if(Integer.parseInt(strMonth) == 12 || Integer.parseInt(strMonth) == 1 || Integer.parseInt(strMonth) == 2){
                    filter.IN_DATE_FROM = strYear + "12";
                    if(Integer.parseInt(strMonth) == 1 || Integer.parseInt(strMonth) == 2)
                    {
                        intYear--;
                        strYear = String.valueOf(intYear);
                        filter.IN_DATE_FROM = strYear + "12";
                    }
                    strMonth = "Dec";                
                }
                else if(Integer.parseInt(strMonth) == 3 || Integer.parseInt(strMonth) == 4 || Integer.parseInt(strMonth) == 5){
                    filter.IN_DATE_FROM = strYear + "03";
                    strMonth = "Mar";
                }
                else if(Integer.parseInt(strMonth) == 6 || Integer.parseInt(strMonth) == 7 || Integer.parseInt(strMonth) == 8){
                    filter.IN_DATE_FROM = strYear + "06";
                    strMonth = "Jun";
                }
                else if(Integer.parseInt(strMonth) == 9 || Integer.parseInt(strMonth) == 10 || Integer.parseInt(strMonth) == 11){
                    filter.IN_DATE_FROM = strYear + "09";
                    strMonth = "Sep";
                }            
                filter.IN_DATE_TO = filter.IN_DATE_FROM;
            }
            else if(filter.IN_DATE_FROM.length() == 4)
            {
                strYear = filter.IN_DATE_FROM.substring(0, 4);
                intYear = Integer.parseInt(strYear);
                intYear--;
                filter.IN_DATE_FROM = String.valueOf(intYear)+ "12";                
                filter.IN_DATE_TO = strYear + "09";
            }
            List<PX0094S01A007Filter> lstPX0094S01A007 = new ArrayList<PX0094S01A007Filter>();
            
            if(strALL.length() == 6){
                if("FACTOR".equals(filter.IN_MODE))
                    lstPX0094S01A007 = logic.SQP03624(filter);
                else
                    lstPX0094S01A007 = logic.SQP03925(filter);
            } 
            /*else if(strALL.length() == 4){
                if("FACTOR".equals(filter.IN_MODE))
                    lstPX0094S01A007 = logic.SQP03927(filter);
                else
                    lstPX0094S01A007 = logic.SQP03929(filter);
            }*/
            
            //resp.vars.put("lstPX0094S01A007", lstPX0094S01A007);
            int len = lstPX0094S01A007.size();
            Integer vi = 0;            
            String fileName = "PX022-PMP_Report-"+date.getDay()+date.getMinutes()+date.getSeconds();
            File file = new File(rutaFile + "\\" + fileName + ".csv");
            
            if (file.exists())
                file.delete();
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena = "";
            
            for (vi = 0; vi < len; vi++) {
                //titulos en la primera fila
                if ( vi == 0 ){
                    if("ALL_DATA".equals(filter.IN_DISPLAY)) // ALL_DATA
                        cadena = "Code From,Code To,Airline,Class,TPM,Factor,Proviso,Curr,City From,City To,Country From,Country To,Issue Date";
                    else // FACTORS_ONLY
                        cadena = "Code From,Code To,TPM,Factor,City From,City To,Country From,Country To,Issue Date";
                    writer.println("" + cadena );
                }
                if("ALL_DATA".equals(filter.IN_DISPLAY))
                {
                    cadena = "";                                
                    cadena += "" + lstPX0094S01A007.get(vi).A007OACC + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007DACC + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007AIRLIN + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007CLASSC + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007BASICM + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007PRORAF + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).PROVISO + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007OACURC + ",";               
                    cadena += "" + lstPX0094S01A007.get(vi).A1007NOMBR_ORI + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A1007NOMBR_DES + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A006PAIS_ORI + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A006PAIS_DES + ",";
                    //cadena += "" + (strYear + " " + strMonth);
                    cadena += "" + lstPX0094S01A007.get(vi).A007EDATEA ;
                    
                }
                
                if("FACTORS_ONLY".equals(filter.IN_DISPLAY))
                {
                    cadena = "";                                
                    cadena += "" + lstPX0094S01A007.get(vi).A007OACC + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007DACC + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007BASICM + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A007PRORAF + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A1007NOMBR_ORI + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A1007NOMBR_DES + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A006PAIS_ORI + ",";
                    cadena += "" + lstPX0094S01A007.get(vi).A006PAIS_DES + ",";
                    //cadena += "" + (strYear + " " + strMonth); 
                    cadena += "" + lstPX0094S01A007.get(vi).A007EDATEA ;
                }
                                              
                writer.println("" + cadena );
            }
            writer.flush();
            writer.close();
            
            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (zip(fileName)){
                File file1 = new File(RUTA_FILE_NAME_SERVER_40 + "\\" + fileName + ".zip");
                File file2 = new File(RUTA_FILE_NAME_SERVER_41 + "\\" + fileName + ".zip");
                File file3 = new File(RUTA_FILE_NAME_SERVER_33 + "\\" + fileName + ".zip");
                if(!file1.exists())
                    Functions.copyFilesWithName(rutaFile + "\\" + fileName + ".zip", RUTA_FILE_NAME_SERVER_40 + "\\" + fileName + ".zip");
                if(!file2.exists())
                    Functions.copyFilesWithName(rutaFile + "\\" + fileName + ".zip", RUTA_FILE_NAME_SERVER_41 + "\\" + fileName + ".zip");
                if(!file3.exists())
                    Functions.copyFilesWithName(rutaFile + "\\" + fileName + ".zip", RUTA_FILE_NAME_SERVER_33 + "\\" + fileName + ".zip");
            }            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".zip" + "\"");

            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    public Boolean zip(String fileName){
        String path = this.serverSession.getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File( path + "\\" + fileName + ".zip");
            
            if (fileZip.exists())
                fileZip.delete();
            
            zipFile(new File(path + "\\" + fileName + ".csv"), path + "\\" + fileName + ".zip");
            
            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }
    
}
