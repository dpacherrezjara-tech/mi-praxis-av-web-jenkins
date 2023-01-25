/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A005;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.SalesReportFormDemoLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
 * @author remicioluis
 */

@Controller
@Scope("request")
@RequestMapping("/SalesReportFormDemo")
public class SalesReportFormDemoController extends BaseController {
    
    SalesReportFormDemoLogic logic;
    private static final Logger logError = Logger.getLogger("errorLog");
    private HashMap RSP = new HashMap<String, String>();
    
    @RequestMapping(value = "loadSearch")
    public @ResponseBody
    String getListCountries(HttpServletRequest request) {
        logic = new SalesReportFormDemoLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A006> oList = new ArrayList<A006>(0);
        A006 filter = new A006();

        filter.strExcel = "FALSE";
        filter.strCampo = "";
        filter.strValor = "";
        filter.strName = "";

        filter.TOTROWS = -1;
        filter.START = 0;
        filter.LIMIT = 20;

        try {
            filter.strCampo = request.getParameter("strCampo").toString().trim();
            filter.strValor = request.getParameter("strValor").toString().trim();
            filter.strName = request.getParameter("strName").toString().trim();

            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("start").toString());

            filter.LIMIT = limit != 0 ? limit : 20;
            filter.START = start != 0 ? start : 0;

            oList = logic.loadCountryMasterFile(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("total", oList.get(0).intTotalRws);
        m.put("data", oList);

        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "getDataAudit_A006")
    public @ResponseBody
    String getDataAudit_A006(HttpServletRequest request) {
        logic = new SalesReportFormDemoLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A005> lstDataAudit;
        
        String keyTable = "";
        String Table = "";
        
        try {
            keyTable = request.getParameter("keytable").toString();
            Table = request.getParameter("table").toString();
            
            lstDataAudit = logic.get_AuditData_A006(keyTable, Table);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lstDataAudit);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "setmaintancea006", method = RequestMethod.POST)
    public @ResponseBody
    String setMaintanceA006(HttpServletRequest request) {
        A006 filter = new A006();
        filter.A006KEY = request.getParameter("A006KEY").toString().trim();
        filter.A006KEY1 = request.getParameter("A006KEY1").toString().trim();
        filter.CODMONEDANUM = request.getParameter("CODMONEDANUM").toString().trim();
        filter.CODMONEDAALPHA = request.getParameter("CODMONEDAALPHA").toString().trim();
        filter.NOMMONEDA = request.getParameter("NOMMONEDA").toString().trim();

        String strOption = request.getParameter("strOption").toString().trim();
        String strCampo = request.getParameter("strCampo").toString().trim();
        try {
            logic = new SalesReportFormDemoLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            this.RSP = (HashMap) logic.setMaintanceA006(filter, strOption, strCampo);
            logic = null;

        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("sql_code", this.RSP.get("sql_code"));
        m.put("response", this.RSP.get("response"));
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        
        System.out.println("CountryMasterFileController : getXLSX");
        String fileName = "Country_Master_File_" + Functions.getFechaActual();
        
        logic = new SalesReportFormDemoLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A006> oList = new ArrayList<A006>(0);
        A006 filter = new A006();

        filter.strExcel = "TRUE";
        filter.strCampo = "";
        filter.strValor = "";
        filter.strName = "";

        filter.TOTROWS = -1;
        filter.START = -1;
        filter.LIMIT = -1;

        try {
            filter.strCampo = request.getParameter("strCampo").toString().trim();
            filter.strValor = request.getParameter("strValor").toString().trim();
            filter.strName = request.getParameter("strName").toString().trim();

            oList = logic.loadCountryMasterFile(filter);
            
            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Country Master File");

            Integer vi = 0;
            Iterator iter = oList.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vi);
            Cell cell01 = row.createCell(0);
            cell01.setCellValue("Currency Alpha");
            Cell cell02 = row.createCell(1);
            cell02.setCellValue("Country Name");
            Cell cell03 = row.createCell(2);
            cell03.setCellValue("Currency Num");
            Cell cell04 = row.createCell(3);
            cell04.setCellValue("Currency Name");
            
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell cell0 = row.createCell(0);
                Cell cell1 = row.createCell(1);
                Cell cell2 = row.createCell(2);
                Cell cell3 = row.createCell(3);

                cell0.setCellValue(oList.get(vi).A006KEY);
                cell1.setCellValue(oList.get(vi).A006KEY1);
                cell2.setCellValue(oList.get(vi).CODMONEDANUM);
                cell3.setCellValue(oList.get(vi).NOMMONEDA);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "Country_Master_File_" + Functions.getFechaActual() + ".xlsx";

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            throw new SpringException(e);
        }

    }
    
}
