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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1806Filter;
import net.miatech.beans.A1819Filter;
import net.miatech.beans.A1820Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.AccountingMasterUATPLogic;
import net.miatech.praxis.logic.sales.AccountingSupplierLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
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
@RequestMapping("/AccountingMasterUATP")
public class AccountingMasterUATPController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingMasterUATPLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AccountingMasterUATP/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingMasterUATP : Controller-------------");
        map.put("success", true);
        List<A1820Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1820Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountingMasterUATPLogic();

        List<A1820Filter> lst = new ArrayList<>(0);
        A1820Filter filter = new A1820Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.A1820CCUST = request.getParameter("A1820CCUST");
            filter.IN_FILTRO = request.getParameter("IN_FILTRO");
            filter.A1820CLIEN = request.getParameter("A1820CLIEN");
            filter.A1820TCUAT = request.getParameter("A1820TCUAT");
            filter.A1820CTA = request.getParameter("A1820CTA");
            filter.A1820SCTA = request.getParameter("A1820SCTA");
            filter.A1820MODO = request.getParameter("A1820MODO");
           

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

            lst = logic.loadPX161S01A1820(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("AccountingMasterUATP : getXLSX");

        // String fileNameDownload = String.format("Accounting Master UATP- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Accounting Master UATP - CCAM " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1820Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("AccountingMasterUATP");

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
            Cell CH1_010 = row.createCell(10);
            Cell CH1_011 = row.createCell(11);
            Cell CH1_012 = row.createCell(12);
            Cell CH1_013 = row.createCell(13);
            Cell CH1_014 = row.createCell(14);
            

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("UATP Card");
            CH1_02.setCellValue("Description");
            CH1_03.setCellValue("Client");
            CH1_04.setCellValue("Address");
            CH1_05.setCellValue("Type");
            CH1_06.setCellValue("Type Doc");
            CH1_07.setCellValue("Company");
            CH1_08.setCellValue("Unit");
            CH1_09.setCellValue("C. Cost");
            CH1_010.setCellValue("Location");
            CH1_011.setCellValue("Account");
            CH1_012.setCellValue("Sub Account");
            CH1_013.setCellValue("Equipment");
            CH1_014.setCellValue("Inter Company");
            

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
            CH1_010.setCellStyle(headerStyle);
            CH1_011.setCellStyle(headerStyle);
            CH1_012.setCellStyle(headerStyle);
            CH1_013.setCellStyle(headerStyle);
            CH1_014.setCellStyle(headerStyle);
           

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
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);
               

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A1820TCUAT);
                rcell2.setCellValue(listaData.get(vi).A1820DESCR);
                rcell3.setCellValue(listaData.get(vi).A1820CLIEN);
                rcell4.setCellValue(listaData.get(vi).A1820DIREC);
                rcell5.setCellValue(listaData.get(vi).A1820TIPO);
                rcell6.setCellValue(listaData.get(vi).A1820DOCU);
                rcell7.setCellValue(listaData.get(vi).A1820CIA);
                rcell8.setCellValue(listaData.get(vi).A1820UNID);
                rcell9.setCellValue(listaData.get(vi).A1820CECO);
                rcell10.setCellValue(listaData.get(vi).A1820UBI);
                rcell11.setCellValue(listaData.get(vi).A1820CTA);
                rcell12.setCellValue(listaData.get(vi).A1820SCTA);
                rcell13.setCellValue(listaData.get(vi).A1820EQUI);
                rcell14.setCellValue(listaData.get(vi).A1820ICIA);
                

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
                rcell11.setCellStyle(bodyStyle);
                rcell12.setCellStyle(bodyStyle);
                rcell13.setCellStyle(bodyStyle);
                rcell14.setCellStyle(bodyStyle);
              
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
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
          

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
    
      @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Accounting MasterUATP Controller : Mantenimiento");
        String msj = "";
        A1820Filter filter = new A1820Filter();
       
        try {
            logic = new AccountingMasterUATPLogic();
            logic.setSession(this.serverSession.getServerSession());               
            
            
            String strOption = request.getParameter("strOption").toString().trim();
            filter.A1820CCUST = request.getParameter("A1820CCUST");
            filter.A1820TIPO = request.getParameter("A1820TIPO");
            filter.A1820TCUAT = request.getParameter("A1820TCUAT");
            filter.A1820DOCU = request.getParameter("A1820DOCU");
            filter.A1820DESCR = request.getParameter("A1820DESCR");
            filter.A1820CLIEN = request.getParameter("A1820CLIEN");
            filter.A1820DIREC = request.getParameter("A1820DIREC");
            filter.A1820CIA = request.getParameter("A1820CIA");
            filter.A1820UNID = request.getParameter("A1820UNID");
            filter.A1820CECO = request.getParameter("A1820CECO");
            filter.A1820UBI = request.getParameter("A1820UBI");
            filter.A1820CTA = request.getParameter("A1820CTA");
            filter.A1820SCTA = request.getParameter("A1820SCTA");
            filter.A1820EQUI = request.getParameter("A1820EQUI");
            filter.A1820ICIA = request.getParameter("A1820ICIA");
            filter.A1820MODO = request.getParameter("A1820MODO");
            filter.A1820FINI = request.getParameter("A1820FINI");
            filter.A1820FFIN = request.getParameter("A1820FFIN");
            filter.IN_A1820TCUAT_OLD = request.getParameter("IN_A1820TCUAT_OLD");             
        
             msj = logic.salesAccountMaintanceClient(filter, strOption);      
            

            
        } catch (Exception e) {           
            System.out.println("Excepcion : "+e.getMessage());          
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success",true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

}
