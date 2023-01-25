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
import net.miatech.beans.A1834Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterDecisionLogic;
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
@RequestMapping("/AccountingMasterDecision")
public class AccountingMasterDecisionController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingMasterDecisionLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AccountingMasterDecision/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingMasterDecision : Controller-------------");
        map.put("success", true);
        List<A1834Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1834Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountingMasterDecisionLogic();

        List<A1834Filter> lst = new ArrayList<>(0);
        A1834Filter filter = new A1834Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_A1834CCUST = request.getParameter("IN_A1834CCUST");
            filter.IN_A1834FP = request.getParameter("IN_A1834FP");
            filter.IN_A1834FUENT = request.getParameter("IN_A1834FUENT");
            filter.IN_A1834CIAOP = request.getParameter("IN_A1834CIAOP");
            filter.IN_A1834SUBFU = request.getParameter("IN_A1834SUBFU");
          

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

            lst = logic.loadPX171S01A1834(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("AccountingMasterDecision : getXLSX");

        // String fileNameDownload = String.format("Accounting Master Decision Table- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "TKT Desicion " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1834Filter> listaData = this.getList(request, true);

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
            Cell CH1_010 = row.createCell(10);
            Cell CH1_011 = row.createCell(11);
            Cell CH1_012 = row.createCell(12);
            Cell CH1_013 = row.createCell(13);
            Cell CH1_014 = row.createCell(14);
            Cell CH1_015 = row.createCell(15);
            Cell CH1_016 = row.createCell(16);
            Cell CH1_017 = row.createCell(17);
            Cell CH1_018 = row.createCell(18);
            Cell CH1_019 = row.createCell(19);
            Cell CH1_020 = row.createCell(20);
            Cell CH1_021 = row.createCell(21);
            Cell CH1_022 = row.createCell(22);
            Cell CH1_023 = row.createCell(23);
            Cell CH1_024 = row.createCell(24);
            Cell CH1_025 = row.createCell(25);
            Cell CH1_026 = row.createCell(26);
            Cell CH1_027 = row.createCell(27);
            Cell CH1_028 = row.createCell(28);
            Cell CH1_029 = row.createCell(29);
            Cell CH1_030 = row.createCell(30);
            Cell CH1_031 = row.createCell(31);
            Cell CH1_032 = row.createCell(32);
            Cell CH1_033 = row.createCell(33);
            
            

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Payment Form");
            CH1_02.setCellValue("Source");
            CH1_03.setCellValue("Chanel");
            CH1_04.setCellValue("CIA Operator");
            CH1_05.setCellValue("Cod Combination");
            CH1_06.setCellValue("Working Visa");
            CH1_07.setCellValue("Working Mastercard");
            CH1_08.setCellValue("Working Others");
            CH1_09.setCellValue("Policy Type");
            CH1_010.setCellValue("ALF01");
            CH1_011.setCellValue("ALF02");
            CH1_012.setCellValue("ALF03");
            CH1_013.setCellValue("ALF04");
            CH1_014.setCellValue("ALF05");
            CH1_015.setCellValue("ALF06");
            CH1_016.setCellValue("ALF07");
            CH1_017.setCellValue("ALF08");
            CH1_018.setCellValue("ALF09");
            CH1_019.setCellValue("ALF010");
            CH1_020.setCellValue("ALF011");
            CH1_021.setCellValue("ALF012");
            CH1_022.setCellValue("NUM01");
            CH1_023.setCellValue("NUM02");
            CH1_024.setCellValue("NUM03");
            CH1_025.setCellValue("NUM04");
            CH1_026.setCellValue("NUM05");
            CH1_027.setCellValue("NUM06");
            CH1_028.setCellValue("NUM07");
            CH1_029.setCellValue("NUM08");
            CH1_030.setCellValue("NUM09");
            CH1_031.setCellValue("NUM10");
            CH1_032.setCellValue("NUM11");
            CH1_033.setCellValue("NUM12");
            
            

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
            CH1_015.setCellStyle(headerStyle);
            CH1_016.setCellStyle(headerStyle);
            CH1_017.setCellStyle(headerStyle);
            CH1_018.setCellStyle(headerStyle);
            CH1_019.setCellStyle(headerStyle);
            CH1_020.setCellStyle(headerStyle);
            CH1_021.setCellStyle(headerStyle);
            CH1_022.setCellStyle(headerStyle);
            CH1_023.setCellStyle(headerStyle);
            CH1_024.setCellStyle(headerStyle);
            CH1_025.setCellStyle(headerStyle);
            CH1_026.setCellStyle(headerStyle);
            CH1_027.setCellStyle(headerStyle);
            CH1_028.setCellStyle(headerStyle);
            CH1_029.setCellStyle(headerStyle);
            CH1_030.setCellStyle(headerStyle);
            CH1_031.setCellStyle(headerStyle);
            CH1_032.setCellStyle(headerStyle);
            CH1_033.setCellStyle(headerStyle);
            
           
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
                Cell rcell15 = row.createCell(15);
                Cell rcell16 = row.createCell(16);
                Cell rcell17 = row.createCell(17);
                Cell rcell18 = row.createCell(18);
                Cell rcell19 = row.createCell(19);
                Cell rcell20 = row.createCell(20);
                Cell rcell21 = row.createCell(21);
                Cell rcell22 = row.createCell(22);
                Cell rcell23 = row.createCell(23);
                Cell rcell24 = row.createCell(24);
                Cell rcell25 = row.createCell(25);
                Cell rcell26 = row.createCell(26);
                Cell rcell27 = row.createCell(27);
                Cell rcell28 = row.createCell(28);
                Cell rcell29 = row.createCell(29);
                Cell rcell30 = row.createCell(30);
                Cell rcell31 = row.createCell(31);
                Cell rcell32 = row.createCell(32);
                Cell rcell33 = row.createCell(33);
               
               

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A1834FP);
                rcell2.setCellValue(listaData.get(vi).A1834FUENT);
                rcell3.setCellValue(listaData.get(vi).A1834SUBFU);
                rcell4.setCellValue(listaData.get(vi).A1834CIAOP);
                rcell5.setCellValue(listaData.get(vi).A1834COMBI);
                rcell6.setCellValue(listaData.get(vi).A1834TVISA.trim().equals("")?"0":listaData.get(vi).A1834TVISA);
                rcell7.setCellValue(listaData.get(vi).A1834TMCAR.trim().equals("")?"0":listaData.get(vi).A1834TMCAR);
                rcell8.setCellValue(listaData.get(vi).A1834OTROS.trim().equals("")?"0":listaData.get(vi).A1834OTROS);
                rcell9.setCellValue(listaData.get(vi).A1834TPOLI);
                rcell10.setCellValue(listaData.get(vi).A1834ALF01.trim().equals("")?"0":listaData.get(vi).A1834ALF01);
                rcell11.setCellValue(listaData.get(vi).A1834ALF02.trim().equals("")?"0":listaData.get(vi).A1834ALF02);
                rcell12.setCellValue(listaData.get(vi).A1834ALF03.trim().equals("")?"0":listaData.get(vi).A1834ALF03);
                rcell13.setCellValue(listaData.get(vi).A1834ALF04.trim().equals("")?"0":listaData.get(vi).A1834ALF04);
                rcell14.setCellValue(listaData.get(vi).A1834ALF05.trim().equals("")?"0":listaData.get(vi).A1834ALF05);
                rcell15.setCellValue(listaData.get(vi).A1834ALF06.trim().equals("")?"0":listaData.get(vi).A1834ALF06);
                rcell16.setCellValue(listaData.get(vi).A1834ALF07.trim().equals("")?"0":listaData.get(vi).A1834ALF07);
                rcell17.setCellValue(listaData.get(vi).A1834ALF08.trim().equals("")?"0":listaData.get(vi).A1834ALF08);
                rcell18.setCellValue(listaData.get(vi).A1834ALF09.trim().equals("")?"0":listaData.get(vi).A1834ALF09);
                rcell19.setCellValue(listaData.get(vi).A1834ALF10.trim().equals("")?"0":listaData.get(vi).A1834ALF10);
                rcell20.setCellValue(listaData.get(vi).A1834ALF11.trim().equals("")?"0":listaData.get(vi).A1834ALF11);
                rcell21.setCellValue(listaData.get(vi).A1834ALF12.trim().equals("")?"0":listaData.get(vi).A1834ALF12);
                rcell22.setCellValue(listaData.get(vi).A1834NUM01.trim().equals("")?"0":listaData.get(vi).A1834NUM01);
                rcell23.setCellValue(listaData.get(vi).A1834NUM02.trim().equals("")?"0":listaData.get(vi).A1834NUM02);
                rcell24.setCellValue(listaData.get(vi).A1834NUM03.trim().equals("")?"0":listaData.get(vi).A1834NUM03);
                rcell25.setCellValue(listaData.get(vi).A1834NUM04.trim().equals("")?"0":listaData.get(vi).A1834NUM04);
                rcell26.setCellValue(listaData.get(vi).A1834NUM05.trim().equals("")?"0":listaData.get(vi).A1834NUM05);
                rcell27.setCellValue(listaData.get(vi).A1834NUM06.trim().equals("")?"0":listaData.get(vi).A1834NUM06);
                rcell28.setCellValue(listaData.get(vi).A1834NUM07.trim().equals("")?"0":listaData.get(vi).A1834NUM07);
                rcell29.setCellValue(listaData.get(vi).A1834NUM08.trim().equals("")?"0":listaData.get(vi).A1834NUM08);
                rcell30.setCellValue(listaData.get(vi).A1834NUM09.trim().equals("")?"0":listaData.get(vi).A1834NUM09);
                rcell31.setCellValue(listaData.get(vi).A1834NUM10.trim().equals("")?"0":listaData.get(vi).A1834NUM10);
                rcell32.setCellValue(listaData.get(vi).A1834NUM11.trim().equals("")?"0":listaData.get(vi).A1834NUM11);
                rcell33.setCellValue(listaData.get(vi).A1834NUM12.trim().equals("")?"0":listaData.get(vi).A1834NUM12);
               
                

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
                rcell15.setCellStyle(bodyStyle);
                rcell16.setCellStyle(bodyStyle);
                rcell17.setCellStyle(bodyStyle);
                rcell18.setCellStyle(bodyStyle);
                rcell19.setCellStyle(bodyStyle);
                rcell20.setCellStyle(bodyStyle);
                rcell21.setCellStyle(bodyStyle);
                rcell22.setCellStyle(bodyStyle);
                rcell23.setCellStyle(bodyStyle);
                rcell24.setCellStyle(bodyStyle);
                rcell25.setCellStyle(bodyStyle);
                rcell26.setCellStyle(bodyStyle);
                rcell27.setCellStyle(bodyStyle);
                rcell28.setCellStyle(bodyStyle);
                rcell29.setCellStyle(bodyStyle);
                rcell30.setCellStyle(bodyStyle);
                rcell31.setCellStyle(bodyStyle);
                rcell32.setCellStyle(bodyStyle);
                rcell33.setCellStyle(bodyStyle);
                
              
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
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            
          

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
        System.out.println("AccountingMasterDecisionTable : Mantenimiento");
        String msj = "";
        A1834Filter filter = new A1834Filter();
       
        try {
            logic = new AccountingMasterDecisionLogic();
            logic.setSession(this.serverSession.getServerSession());               
            
            
            String strOption = request.getParameter("strOption").toString().trim();
            filter.A1834CCUST = request.getParameter("A1834CCUST");
            filter.A1834FP = request.getParameter("A1834FP");
            filter.A1834FUENT = request.getParameter("A1834FUENT");
            filter.A1834SUBFU = request.getParameter("A1834SUBFU");
            filter.A1834TTARJ = request.getParameter("A1834TTARJ");
            filter.A1834STTAR = request.getParameter("A1834STTAR");
            filter.A1834CIAOP = request.getParameter("A1834CIAOP");
            filter.A1834DESFP = request.getParameter("A1834DESFP");
            filter.A1834COMBI = Integer.parseInt(request.getParameter("A1834COMBI").trim().equals("")?"0":request.getParameter("A1834COMBI"));
            filter.A1834TVISA = request.getParameter("A1834TVISA");
            filter.A1834TMCAR = request.getParameter("A1834TMCAR");
            filter.A1834OTROS = request.getParameter("A1834OTROS");
            filter.A1834TPOLI = request.getParameter("A1834TPOLI");
            filter.A1834FINI = request.getParameter("A1834FINI");
            filter.A1834FFIN = request.getParameter("A1834FFIN");
            filter.A1834ALF01 = request.getParameter("A1834ALF01");
            filter.A1834ALF02 = request.getParameter("A1834ALF02");
            filter.A1834ALF03 = request.getParameter("A1834ALF03");
            filter.A1834ALF04 = request.getParameter("A1834ALF04");
            filter.A1834ALF05 = request.getParameter("A1834ALF05");
            filter.A1834ALF06 = request.getParameter("A1834ALF06");
            filter.A1834ALF07 = request.getParameter("A1834ALF07");
            filter.A1834ALF08 = request.getParameter("A1834ALF08");
            filter.A1834ALF09 = request.getParameter("A1834ALF09");
            filter.A1834ALF10 = request.getParameter("A1834ALF10");
            filter.A1834ALF11 = request.getParameter("A1834ALF11");
            filter.A1834ALF12 = request.getParameter("A1834ALF12");
            filter.A1834NUM01 = request.getParameter("A1834NUM01");
            filter.A1834NUM02 = request.getParameter("A1834NUM02");
            filter.A1834NUM03 = request.getParameter("A1834NUM03");
            filter.A1834NUM04 = request.getParameter("A1834NUM04");
            filter.A1834NUM05 = request.getParameter("A1834NUM05");
            filter.A1834NUM06 = request.getParameter("A1834NUM06");
            filter.A1834NUM07 = request.getParameter("A1834NUM07");
            filter.A1834NUM08 = request.getParameter("A1834NUM08");
            filter.A1834NUM09 = request.getParameter("A1834NUM09");
            filter.A1834NUM10 = request.getParameter("A1834NUM10");
            filter.A1834NUM11 = request.getParameter("A1834NUM11");
            filter.A1834NUM12 = request.getParameter("A1834NUM12");
            
            filter.IN_A1834FP_OLD = request.getParameter("IN_A1834FP_OLD");
            filter.IN_A1834FUENT_OLD = request.getParameter("IN_A1834FUENT_OLD");
            filter.IN_A1834SUBFU_OLD = request.getParameter("IN_A1834SUBFU_OLD");
            filter.IN_A1834TTARJ_OLD = request.getParameter("IN_A1834TTARJ_OLD");
            filter.IN_A1834STTAR_OLD = request.getParameter("IN_A1834STTAR_OLD");
            filter.IN_A1834CIAOP_OLD = request.getParameter("IN_A1834CIAOP_OLD");             
        
             msj = logic.Maintance(filter, strOption);                  
            
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
