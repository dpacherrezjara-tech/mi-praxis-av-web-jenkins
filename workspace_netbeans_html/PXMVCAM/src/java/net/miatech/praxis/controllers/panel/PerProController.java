/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.panel;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.PX075S01INF001Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.YieldReportLogic;
import net.miatech.praxis.logic.panel.PanelLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author lzambrano
 */
@Controller
@Scope("request")
@RequestMapping("/PerPro")
public class PerProController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/PerPro";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, HttpServletRequest request) {
        
        PX041S01INF001Filter filter = new PX041S01INF001Filter();
        filter.VP_CCUST = "139";
        filter.VP_APLICA = "PX";
        
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.VP_USR = request.getParameter("option").toString().trim(); 
            if(!"".equals(request.getParameter("group").toString().trim()))
                filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
        }
        List<PX041S01INF001Filter> lst_prmpanel;
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_prmpanel = logic.loadPX041S01INF001(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        HashMap m = new HashMap();
        try{
	        m.put("success",true);
	        m.put("total",lst_prmpanel.get(0).page.TOTROWS);
	        m.put("data",lst_prmpanel);
        }catch (Exception e) {
            throw new SpringException(e);
        }        
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "crud")
    public @ResponseBody String crud(HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE 
        PX076S01INF053Filter filter = new PX076S01INF053Filter(); 
        filter.VP_CCUST = "139";
        filter.VP_APLICA = "PX";
        String response = "";
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter.VP_ACTION = request.getParameter("strOption").toString().trim();
            //filter.VP_CCUST = request.getParameter("USR").toString().trim();
            filter.VP_USR = request.getParameter("USR").toString().trim();
            filter.VP_USRCOPY = request.getParameter("USRCOPY")!= null ? request.getParameter("USRCOPY").toString().trim() : "";
            //filter.VP_APLICA = request.getParameter("APLICA").toString().trim();
            filter.VP_NPROG = request.getParameter("NPROG")!= null ? request.getParameter("NPROG").toString().trim() : "";
            filter.VP_MODULE = request.getParameter("MODULE")!= null ? request.getParameter("MODULE").toString().trim() : "";
            filter.VP_PERMA = request.getParameter("PERMA").toString().trim();            
            filter.VP_PERML = request.getParameter("PERML").toString().trim();
            filter.VP_PERMC = request.getParameter("PERMC").toString().trim();
            filter.VP_PERMM = request.getParameter("PERMM").toString().trim();
            filter.VP_PERME = request.getParameter("PERME").toString().trim();
            filter.VP_PERMX = request.getParameter("PERMX").toString().trim();
            filter.VP_STAT = request.getParameter("STAT")!= null ? request.getParameter("STAT").toString().trim() : "";
            
            if(filter.VP_ACTION.equals("CO")||filter.VP_ACTION.equals("IM")||filter.VP_ACTION.equals("DM")){
                filter = logic.setSQP05412(filter);
            }
            else{
                filter = logic.setPX076S01INF053(filter);   
            }
            response = filter.dbException.MESSAGE;
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        Map m = new LinkedHashMap();
        m.put("success",true);
        m.put("response", response);
        return new Gson().toJson(m);
    }
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("UsersPerController : getXLSX");
        String fileName = "usersPer_" + Functions.getFechaActual();

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");
            List<PX041S01INF001Filter> lstData = new ArrayList<PX041S01INF001Filter>();
            PX041S01INF001Filter  filter = new PX041S01INF001Filter();
            filter.VP_CCUST = "139";
            filter.VP_APLICA = "PX";

            if(request.getParameter("option")!=null && request.getParameter("group")!=null)
            {
                filter.VP_USR = request.getParameter("option").toString().trim(); 
                if(!"".equals(request.getParameter("group").toString().trim()))
                    filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
            }
            filter.page.PAGNUM = 1;
            filter.page.PAGROW = 0;
            filter.page.TOTPAG = 0;
            filter.page.TOTROW = 1;
            filter.page.PAGINIT = 1;
            
            try{
                PanelLogic logic = new PanelLogic();
                logic.setSession(this.serverSession.getServerSession());
                lstData = logic.loadPX041S01INF001(filter);
            }catch (Exception e) {
                throw new SpringException(e);
            }    
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Users Permisions");
            Integer vi = 0;
            Iterator iter = lstData.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vj);
            Cell cell00 = row.createCell(0);
            cell00.setCellValue("USR");
            Cell cell01 = row.createCell(1);
            cell01.setCellValue("NPROG");
            Cell cell02 = row.createCell(2);
            cell02.setCellValue("PROG");
            Cell cell03 = row.createCell(3);
            cell03.setCellValue("PERMA");
            Cell cell04 = row.createCell(4);
            cell04.setCellValue("PERML");
            Cell cell05 = row.createCell(5);
            cell05.setCellValue("PERMC");
            Cell cell06 = row.createCell(6);
            cell06.setCellValue("PERMM");
            Cell cell07 = row.createCell(7);
            cell07.setCellValue("PERME");
            Cell cell08 = row.createCell(8);
            cell08.setCellValue("PERMX");
            Cell cell09 = row.createCell(9);
            cell09.setCellValue("STAT");
            Cell cell10 = row.createCell(10);
            cell10.setCellValue("USCR");
            Cell cell11 = row.createCell(11);
            cell11.setCellValue("DTCR");
            Cell cell12 = row.createCell(12);
            cell12.setCellValue("USUP");
            Cell cell13 = row.createCell(13);
            cell13.setCellValue("DTUP");

            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell cell0 = row.createCell(0);
                Cell cell1 = row.createCell(1);
                Cell cell2 = row.createCell(2);
                Cell cell3 = row.createCell(3);
                Cell cell4 = row.createCell(4);
                Cell cell5 = row.createCell(5);
                Cell cell6 = row.createCell(6);
                Cell cell7 = row.createCell(7);
                Cell cell8 = row.createCell(8);
                Cell cell9 = row.createCell(9);
                Cell cel20 = row.createCell(10);
                Cell cel21 = row.createCell(11);
                Cell cel22 = row.createCell(12);
                Cell cel23 = row.createCell(13);

                cell0.setCellValue(lstData.get(vi).USR);
                cell1.setCellValue(lstData.get(vi).NPROG);
                cell2.setCellValue(lstData.get(vi).PROG);
                cell3.setCellValue(lstData.get(vi).PERMA);
                cell4.setCellValue(lstData.get(vi).PERML);
                cell5.setCellValue(lstData.get(vi).PERMC);
                cell6.setCellValue(lstData.get(vi).PERMM);
                cell7.setCellValue(lstData.get(vi).PERME);
                cell8.setCellValue(lstData.get(vi).PERMX);
                cell9.setCellValue(lstData.get(vi).STAT);
                cel20.setCellValue(lstData.get(vi).USCR);
                cel21.setCellValue(lstData.get(vi).DTCR);
                cel22.setCellValue(lstData.get(vi).USUP);
                cel23.setCellValue(lstData.get(vi).DTUP);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "usersPer_" + Functions.getFechaActual() + ".xlsx";

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }

    }
}
