/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1819Filter;
import net.miatech.beans.A1830Filter;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.SalesOracleSOAControlLogic;
import net.miatech.praxis.logic.sales.SalesOracleAcknowledgementLogic;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.praxis.logic.sales.AccountingMasterBINESLogic;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.CommissionsFOBLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.praxisbi.A1956;
import net.miatech.praxisbi.A2160;
import net.miatech.praxisbi.filter.A3701Filter;
import net.miatech.praxisbi.filter.A3702Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/OracleSoaControlDashboard")
public class OracleSoaControlDashboardController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/OracleSoaControlDashboard/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- OracleSoaControlDashboard : search-------------");
        try {
            map.put("success", true);
            A3701Filter filter = new A3701Filter();
            List<A3701Filter> lstData;
            SalesOracleSOAControlLogic logic = new SalesOracleSOAControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.SQP03245(filter);
            map.put("data", lstData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- OracleSoaControlDashboard : searchDetail-------------");
        map.put("success", true);
        List<A3702Filter> lstData;
        try {
            A3701Filter filter = new A3701Filter();
            filter.A3701MODUL = request.getParameter("IN_MODUL");           

            SalesOracleSOAControlLogic logic = new SalesOracleSOAControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.SQP03247(filter);            
            map.put("data", lstData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "updateFlag")
    public @ResponseBody
    String updateFlag(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- OracleSoaControlDashboard : updateFlag-------------");
        map.put("success", true);
        try {
            A3701Filter filter = new A3701Filter();
            SalesOracleSOAControlLogic logic = new SalesOracleSOAControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result;
            filter.IN_MODUL = request.getParameter("IN_MODUL");     
            filter.IN_FLAG = Integer.parseInt(request.getParameter("IN_FLAG"));     
            filter.SCHEDULE = Integer.parseInt(request.getParameter("SCHEDULE"));     
            filter.IN_OBSER = request.getParameter("IN_OBSER");
            
            filter.IN_FECHA_INI = request.getParameter("IN_FECHA_INI");     
            filter.IN_HORA_INI = request.getParameter("IN_HORA_INI");     
            filter.IN_FECHA_FIN = request.getParameter("IN_FECHA_FIN");     
            filter.IN_HORA_FIN = request.getParameter("IN_HORA_FIN");    
            
            if(filter.SCHEDULE == 0){
                result = logic.SQP03246(filter);
            }else{
                result = logic.SQP03248(filter);
            }
            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);

    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("OracleControlDashboard : getXLSX");

        String fileNameDownload = String.format(
                "OracleControlDashboard " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            A3701Filter filter = new A3701Filter();
            List<A3701Filter> listaData;
            SalesOracleSOAControlLogic logic = new SalesOracleSOAControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.SQP03245(filter);           
            
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("AccountingMasterDecisionTable");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            

            CH1_00.setCellValue("Module");
            CH1_01.setCellValue("Status");
            CH1_02.setCellValue("SCHEDULE");
            CH1_03.setCellValue("Date");
            CH1_04.setCellValue("Time");
            CH1_05.setCellValue("User");
            CH1_06.setCellValue("Start Date");
            CH1_07.setCellValue("Start Time");
            CH1_08.setCellValue("End Date");
            CH1_09.setCellValue("End Time");
            CH1_10.setCellValue("User");
            
            

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            
           
            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);
                Cell rcell5 = row.createCell(5);
                Cell rcell6 = row.createCell(6);
                Cell rcell7 = row.createCell(7);
                Cell rcell8 = row.createCell(8);
                Cell rcell9 = row.createCell(9);
                Cell rcell10 = row.createCell(10);
               
               

                rcell0.setCellValue(listaData.get(vi).A3701MODUL);
                rcell1.setCellValue(listaData.get(vi).FLAG);
                rcell2.setCellValue(listaData.get(vi).SCHEDULE);
                rcell3.setCellValue(listaData.get(vi).FECAC);
                rcell4.setCellValue(listaData.get(vi).HORAC);
                rcell5.setCellValue(listaData.get(vi).A3701USRAC);
                rcell6.setCellValue(listaData.get(vi).FPROGINI);
                rcell7.setCellValue(listaData.get(vi).HPROGINI);
                rcell8.setCellValue(listaData.get(vi).FPROGFIN);
                rcell9.setCellValue(listaData.get(vi).HPROGFIN);
                rcell10.setCellValue(listaData.get(vi).A3701USRPR);
               
                

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
                rcell8.setCellStyle(bodyStyle);
                rcell9.setCellStyle(bodyStyle);
                rcell10.setCellStyle(bodyStyle);
              
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
          

            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }
}
