/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.panel;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP05902Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
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
 * @author asifuentes
 */
@Controller
@Scope("request")
@RequestMapping("/ReportAccessLog")
public class ReportAccessLogController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/ReportAccessLog";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(ModelMap map, HttpServletRequest request) {
        
        SQP05902Filter filter = new SQP05902Filter();
        filter.VP_CCUST = "139";
        
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.VP_FILTER = request.getParameter("option").toString().trim(); 
            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO").trim();
            filter.IN_FECHA_ACUSE = request.getParameter("IN_FECHA_ACUSE").trim();
            if(!"".equals(request.getParameter("group").toString().trim()))
                filter.VP_TYPEF = Integer.parseInt(request.getParameter("group".toString().trim())); 
        }
        List<SQP05902Filter> lst_prmpanel;
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_prmpanel = logic.loadSQP05902(filter);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("ReportAccessLogController : getXLSX");
        String fileName = "ReportAccessLog_" + Functions.getFechaActual();

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");
            List<SQP05902Filter> lstData = new ArrayList<SQP05902Filter>();
            SQP05902Filter  filter = new SQP05902Filter();
            filter.VP_CCUST = "139";

            if(request.getParameter("option")!=null && request.getParameter("group")!=null)
            {
                filter.VP_FILTER = request.getParameter("option").toString().trim(); 
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
                lstData = logic.loadSQP05902(filter);
            }catch (Exception e) {
                throw new SpringException(e);
            }    
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report Access Log");
            Integer vi = 0;
            Iterator iter = lstData.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vj);
            Cell cell00 = row.createCell(0);
            cell00.setCellValue("USR");
            Cell cell01 = row.createCell(1);
            cell01.setCellValue("NPROG");
            Cell cell02 = row.createCell(2);
            cell02.setCellValue("FECIN");
            Cell cell03 = row.createCell(3);
            cell03.setCellValue("HORIN");

            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell cell0 = row.createCell(0);
                Cell cell1 = row.createCell(1);
                Cell cell2 = row.createCell(2);
                Cell cell3 = row.createCell(3);

                cell0.setCellValue(lstData.get(vi).USR);
                cell1.setCellValue(lstData.get(vi).NPROG);
                cell2.setCellValue(lstData.get(vi).FECIN);
                cell3.setCellValue(lstData.get(vi).HORIN);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "ReportAccessLog_" + Functions.getFechaActual() + ".xlsx";

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
