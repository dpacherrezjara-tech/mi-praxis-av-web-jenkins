/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.interline;

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
import net.miatech.beans.A1964Filter;
import net.miatech.beans.A1965Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI100Filter;
import net.miatech.praxis.logic.interline.AccountingPasseInvoicesLogic;
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

/**
 *
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingPasseInvoices")
public class AccountingPasseInvoicesController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingPasseInvoicesLogic logic;
    private MasterDAO masterDAO;
    private HashMap<String, String> hmAeropuertos;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AccountingPasseInvoices/form_index";
    }
    
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingPasseInvoices : Search-------------");
        map.put("success", true);

        List<SFI100Filter> lst = this.getList(request, false);

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI100Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<SFI100Filter> lst = new ArrayList<>(0);
        SFI100Filter filter = new SFI100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI100Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
//            }

            lst = logic.SQP04008(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchA1964")
    public @ResponseBody
    String searchA1964(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingPasseInvoices : searchA1964-------------");
        map.put("success", true);

        List<A1964Filter> lst = this.getListContaIXC(request, false);

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1964Filter> getListContaIXC(HttpServletRequest request, Boolean bExcel) {

        List<A1964Filter> lst = new ArrayList<>(0);
        SFI100Filter filter = new SFI100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI100Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
//            }

            lst = logic.SQP04010(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchA1965")
    public @ResponseBody
    String searchA1965(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingPasseInvoices : searchA1965-------------");
        map.put("success", true);

        List<A1965Filter> lst = this.getListContaIXP(request, false);

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1965Filter> getListContaIXP(HttpServletRequest request, Boolean bExcel) {

        List<A1965Filter> lst = new ArrayList<>(0);
        SFI100Filter filter = new SFI100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI100Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
//            }

            lst = logic.SQP04011(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchBySummary")
    public @ResponseBody
    String searchBySummary(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingPasseInvoices : Search-------------");
        map.put("success", true);

        List<SFI100Filter> lst = this.getListBySummary(request, false);

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI100Filter> getListBySummary(HttpServletRequest request, Boolean bExcel) {

        List<SFI100Filter> lst = new ArrayList<>(0);
        SFI100Filter filter = new SFI100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI100Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
//            }

            lst = logic.SQP03987(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format(" Interline Provision Invoices " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            List<SFI100Filter> listaData = this.getList(request, true);
            
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            
            CH1_0.setCellValue("Date");
            CH1_1.setCellValue("Date");
            CH1_2.setCellValue("Period");
            CH1_3.setCellValue("Source");
            
            CH1_5.setCellValue("Total");
            CH1_6.setCellValue("Total");
            CH1_7.setCellValue("Total");
            CH1_8.setCellValue("Total");
            CH1_9.setCellValue("Total");
            CH1_10.setCellValue("Total");
            CH1_11.setCellValue("Total");
            
            CH1_12.setCellValue("Acounting ID");
            CH1_13.setCellValue("Date");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
        
            ++vj;
            //============================================
            
            
            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            
            String type = listaData.get(0).IN_TFECHA;
            if(type.equals("PD")){
                type = "Provision";
            }else{
                type = "Accounting";
            }
            
            CH2_0.setCellValue(type);
            CH2_1.setCellValue("Bill.");
            CH2_2.setCellValue("Number");
            CH2_3.setCellValue("Cod");
            CH2_4.setCellValue("Description");
            CH2_5.setCellValue("GROSS");
            CH2_6.setCellValue("ISC");
            CH2_7.setCellValue("TAX");
            CH2_8.setCellValue("Other");
            CH2_9.setCellValue("FEE");
            CH2_10.setCellValue("UATP");
            CH2_11.setCellValue("NET");
            CH2_13.setCellValue("Creation");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);

                rcell0.setCellValue(listaData.get(vi).typeDate);
                rcell1.setCellValue(listaData.get(vi).strFormatDate);
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).SOURCOD);
                rcell4.setCellValue(listaData.get(vi).SOURDES);
                
                rcell5.setCellValue(listaData.get(vi).TGROSS);
                rcell6.setCellValue(listaData.get(vi).TISC);
                rcell7.setCellValue(listaData.get(vi).TTAX);
                rcell8.setCellValue(listaData.get(vi).TOHCOM);
                rcell9.setCellValue(listaData.get(vi).HFEEAM);
                rcell10.setCellValue(listaData.get(vi).TUATP);
                rcell11.setCellValue(listaData.get(vi).TNET);
                rcell12.setCellValue(listaData.get(vi).IDCON);
                rcell13.setCellValue(listaData.get(vi).FECR);
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
            
            /// ******************************** 2do EXCEL  ************************************** ///
            vj++;
            vj++;
            vj++;
            
            String tran = listaData.get(0).IN_TTRAN;
            if(tran.equals("OB")){
                List<A1964Filter> listaDataIXC = this.getListContaIXC(request, true);
                
                Iterator iter2 = listaDataIXC.iterator();
                
                // ======  Nivel 1 ==========
                row1 = sheet.createRow(vj);
                CH1_0 = row1.createCell(0);
                CH1_1 = row1.createCell(1);
                CH1_2 = row1.createCell(2);
                CH1_3 = row1.createCell(3);
                CH1_4 = row1.createCell(4);
                
                CH1_0.setCellValue("Concept");
                CH1_1.setCellValue("Account");
                CH1_2.setCellValue("Currency");
                CH1_3.setCellValue("Cargo");
                CH1_4.setCellValue("Abono");

                CH1_0.setCellStyle(headerStyle);
                CH1_1.setCellStyle(headerStyle);
                CH1_2.setCellStyle(headerStyle);
                CH1_3.setCellStyle(headerStyle);
                CH1_4.setCellStyle(headerStyle);

                //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
                ++vj;
                
                //============================================

                vi = 0;
                while (iter2.hasNext()) {
                    row1 = sheet.createRow(vj);
                    Cell rcell0 = row1.createCell(0);
                    Cell rcell1 = row1.createCell(1);
                    Cell rcell2 = row1.createCell(2);
                    Cell rcell3 = row1.createCell(3);
                    Cell rcell4 = row1.createCell(4);

                    rcell0.setCellValue(listaDataIXC.get(vi).A1964TITU);
                    rcell1.setCellValue(listaDataIXC.get(vi).CUENTA);
                    rcell2.setCellValue(listaDataIXC.get(vi).A1964CUR);
                    rcell3.setCellValue(listaDataIXC.get(vi).A1964ACTIV);
                    rcell4.setCellValue(listaDataIXC.get(vi).A1964PASIV);
                    iter2.next();
                    ++vi;
                    ++vj;
                }
                
                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                
            }else{
                List<A1965Filter> listaDataIXP = this.getListContaIXP(request, true);
                
                Iterator iter3 = listaDataIXP.iterator();
                
                // ======  Nivel 1 ==========
                row1 = sheet.createRow(vj);
                CH1_0 = row1.createCell(0);
                CH1_1 = row1.createCell(1);
                CH1_2 = row1.createCell(2);
                CH1_3 = row1.createCell(3);
                CH1_4 = row1.createCell(4);
                
                CH1_0.setCellValue("Concept");
                CH1_1.setCellValue("Account");
                CH1_2.setCellValue("Currency");
                CH1_3.setCellValue("Cargo");
                CH1_4.setCellValue("Abono");

                CH1_0.setCellStyle(headerStyle);
                CH1_1.setCellStyle(headerStyle);
                CH1_2.setCellStyle(headerStyle);
                CH1_3.setCellStyle(headerStyle);
                CH1_4.setCellStyle(headerStyle);

                //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(vj, vj, 4, 4));
                ++vj;
                
                //============================================

                vi = 0;
                while (iter3.hasNext()) {
                    row1 = sheet.createRow(vj);
                    Cell rcell0 = row1.createCell(0);
                    Cell rcell1 = row1.createCell(1);
                    Cell rcell2 = row1.createCell(2);
                    Cell rcell3 = row1.createCell(3);
                    Cell rcell4 = row1.createCell(4);

                    rcell0.setCellValue(listaDataIXP.get(vi).A1965TITU);
                    rcell1.setCellValue(listaDataIXP.get(vi).CUENTA);
                    rcell2.setCellValue(listaDataIXP.get(vi).A1965CUR);
                    rcell3.setCellValue(listaDataIXP.get(vi).A1965ACTIV);
                    rcell4.setCellValue(listaDataIXP.get(vi).A1965PASIV);
                    iter3.next();
                    ++vi;
                    ++vj;
                }
                
                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
            }

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
        
    @RequestMapping(value = "searchX")
    public @ResponseBody
    String searchX(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingPasseInvoices : searchX-------------");
        map.put("success", true);
        
        A1964Filter filter = new A1964Filter();
        Gson gson = new Gson();
        String beanString = "";
        
        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A1964Filter.class);
        
//        if(filter.IN_TTRAN.equals("OB")){
            List<A1964Filter> lst = this.getListX(request, false);
//        }else{
            List<A1965Filter> lstXpagar = this.getListXpagar(request, false);
//        }

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        map.put("lstXpagar", lstXpagar);
        return new Gson().toJson(map);
    }

    public List<A1964Filter> getListX(HttpServletRequest request, Boolean bExcel) {

        List<A1964Filter> lst = new ArrayList<>(0);
        A1964Filter filter = new A1964Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1964Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
//            }

            lst = logic.loadPX538(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    public List<A1965Filter> getListXpagar(HttpServletRequest request, Boolean bExcel) {

        List<A1965Filter> lst = new ArrayList<>(0);
        A1964Filter filter = new A1964Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1964Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
//            }

            lst = logic.loadPX538_Xpagar(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public List<SFI020Filter> getListExcel(HttpServletRequest request, Boolean bExcel) {

        List<SFI020Filter> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AccountingPasseInvoicesLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI020Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

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

            lst = logic.loadPX538_excel(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "downloadExcelXcobrar")
    public @ResponseBody
    void downloadExcelXcobrar(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : downloadExcelXcobrar");
        String fileNameDownload = String.format(" Interline Receivables " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI020Filter> listaData = this.getListExcel(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);
            Cell CH1_16 = row1.createCell(16);
            Cell CH1_17 = row1.createCell(17);
            Cell CH1_18 = row1.createCell(18);
            Cell CH1_19 = row1.createCell(19);
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);
            Cell CH1_26 = row1.createCell(26);
            Cell CH1_27 = row1.createCell(27);
            Cell CH1_28 = row1.createCell(28);
            Cell CH1_29 = row1.createCell(29);
            Cell CH1_30 = row1.createCell(30);

            CH1_0.setCellValue("Clearing Date");
            CH1_1.setCellValue("Periodo");
            CH1_2.setCellValue("Billing Airline");
            CH1_3.setCellValue("Source C.");
            CH1_4.setCellValue("Reason C.");
            CH1_5.setCellValue("Ticket Issuing Airline");
            CH1_6.setCellValue("Ticket/Document Number");
            CH1_7.setCellValue("Coupon");

            CH1_8.setCellValue("Gross Amount Billed");
            CH1_9.setCellValue("ISC Rate");
            CH1_10.setCellValue("ISC Amount");
            CH1_11.setCellValue("Tax Amount Billed");
            CH1_12.setCellValue("Other Commission Allowed");
            CH1_13.setCellValue("Handling Free Allowed");
            CH1_14.setCellValue("UATP Allowed");
            CH1_15.setCellValue("Neto");

            CH1_16.setCellValue("Gross Amount Accepted");
            CH1_17.setCellValue("ISC Amount Accepted");
            CH1_18.setCellValue("Tax Amount Accepted");
            CH1_19.setCellValue("Other Commission Amount Accepted");
            CH1_20.setCellValue("Handling Free Amount Accepted");
            CH1_21.setCellValue("UATP Amount Accepted ");

            CH1_22.setCellValue("Gross Amount Difference");
            CH1_23.setCellValue("ISC Amount Difference");
            CH1_24.setCellValue("Tax Amount Difference");
            CH1_25.setCellValue("Other Commission Amount Difference");
            CH1_26.setCellValue("Handling Free Amount Difference");
            CH1_27.setCellValue("UATP Amount Difference ");
            CH1_28.setCellValue("Net Reject Amount");
            CH1_29.setCellValue("Observation");
            CH1_30.setCellValue("Observation1");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);
            CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);
            CH1_30.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);
                Cell rcell26 = row1.createCell(26);
                Cell rcell27 = row1.createCell(27);
                Cell rcell28 = row1.createCell(28);
                Cell rcell29 = row1.createCell(29);
                Cell rcell30 = row1.createCell(30);

                rcell0.setCellValue(listaData.get(vi).BDATE);
                rcell1.setCellValue(listaData.get(vi).PERNUM);
                rcell2.setCellValue(listaData.get(vi).BAIR);
                rcell3.setCellValue(listaData.get(vi).SOURCOD);
                rcell4.setCellValue(listaData.get(vi).REASCOD);
                rcell5.setCellValue(listaData.get(vi).AIRNUM);
                rcell6.setCellValue(listaData.get(vi).TKTNUM);
                rcell7.setCellValue(listaData.get(vi).CPNNUM);
                rcell8.setCellValue(listaData.get(vi).GROSS);
                rcell9.setCellValue(listaData.get(vi).ISCCH);
                rcell10.setCellValue(listaData.get(vi).ISC_AMOUNT);
                rcell11.setCellValue(listaData.get(vi).TAX);
                rcell12.setCellValue(listaData.get(vi).OTHCOMAM);
                rcell13.setCellValue(listaData.get(vi).HFEEAM);
                rcell14.setCellValue(listaData.get(vi).UATPAMT);
                rcell15.setCellValue(listaData.get(vi).CPNTAM);
                rcell16.setCellValue("");
                rcell17.setCellValue("");
                rcell18.setCellValue("");
                rcell19.setCellValue("");
                rcell20.setCellValue("");
                rcell21.setCellValue("");
                rcell22.setCellValue("");
                rcell23.setCellValue("");
                rcell24.setCellValue("");
                rcell25.setCellValue("");
                rcell26.setCellValue("");
                rcell27.setCellValue("");
                rcell28.setCellValue("");
                rcell29.setCellValue("");
                rcell30.setCellValue("");
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

            //============================================
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
