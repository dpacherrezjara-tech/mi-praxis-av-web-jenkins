/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.discharges;

import com.google.gson.Gson;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP03893Filter;
import net.miatech.beans.SQP03894Filter;
import net.miatech.beans.SQP03901Filter;
import net.miatech.beans.SQP03922Filter;
import net.miatech.beans.SQP03923Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.discharges.ParametersNoShowLogic;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/ParametersNoShow")
public class ParametersNoShowController extends BaseController {

    private ParametersNoShowLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03893Filter> listaData;
        SQP03893Filter filter;
        filter = new SQP03893Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_CPARM = request.getParameter("VP_CPARM");
            filter.VP_DESCR = request.getParameter("VP_DESCR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ParametersNoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03893(filter);
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
        SQP03894Filter filter = new SQP03894Filter();
        SQP03894Filter objRtn;
        try {
            logic = new ParametersNoShowLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            objRtn = logic.setSQP03894(filter);
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
            throw new SpringException(ex);
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "/getCmboCatalogo")
    public @ResponseBody
    String getCmboCatalogo(ModelMap map, HttpServletRequest request) {
        List<SQP03901Filter> listaData;
        SQP03901Filter filter;
        filter = new SQP03901Filter();
        try {
            logic = new ParametersNoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03901(filter);
            map.put("success", true);
            map.put("total", listaData.size());
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

    @RequestMapping(value = "/search_tbl_micelanea")
    public @ResponseBody
    String search_tbl_micelanea(ModelMap map, HttpServletRequest request) {
        List<SQP03922Filter> listaData;
        SQP03922Filter filter;
        filter = new SQP03922Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_A3975KEY1 = request.getParameter("VP_A3975KEY1");
            filter.VP_A3975KEY2 = request.getParameter("VP_A3975KEY2");
            filter.VP_A3975DESC1 = request.getParameter("VP_A3975DESC1");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new ParametersNoShowLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP03922(filter);
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
    
    @RequestMapping(value = "upload_ticket_desig")
    public @ResponseBody
    String upload_ticket_desig(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) {
        byte[] bytes = null;
        SQP03923Filter filter = new SQP03923Filter();
        SQP03923Filter objRtn = null;
        Integer cont = 0;
        try {
            logic = new ParametersNoShowLogic();
            logic.setSession(this.serverSession.getServerSession());            
            
            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //HSSFCell cell;
            while (iterator.hasNext()) {
                filter = new SQP03923Filter();
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {                        
                        filter.VP_ACTION  = request.getParameter("VP_ACTION");
                        filter.A3975KEY1  = request.getParameter("VP_A3975KEY1");                        
                        filter.A3975KEY2  = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();
                        filter.A3975DESC1 = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();
                        filter.A3975DESC2 = "";                        
                        filter.A3975CANT1 = 0;
                        filter.A3975CANT2 = 0;
                        filter.A3975FECH1 = "";
                        filter.A3975FECH2 = "";
                        filter.A3975COME1 = "";
                        filter.A3975COME2 = "";
                        filter.A3975STAT1  = "";
                        filter.A3975STAT2  = "";
                        filter.A3975STATU  = "A";                        
                        objRtn = logic.setSQP03923(filter);                        
                    }
                }
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
    
    @RequestMapping(value = "set_crud_micelanea")
    public @ResponseBody
    String set_crud_micelanea(ModelMap map,  HttpServletRequest request) {        
        SQP03923Filter filter = new SQP03923Filter();
        SQP03923Filter objRtn = null;        
        try {
            logic = new ParametersNoShowLogic();
            logic.setSession(this.serverSession.getServerSession()); 
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                   
            objRtn = logic.setSQP03923(filter);                                        
            map.put("success", true);
            map.put("objRtn", objRtn);
        } catch (Exception ex) {
            objRtn.dbException.SQLCODE = "1";
            objRtn.dbException.MESSAGE = ex.getMessage();
            map.put("objRtn", objRtn);
            map.put("success", false);
            map.put("sesion", ex.getMessage());            
        }
        return new Gson().toJson(map);

    }
}
