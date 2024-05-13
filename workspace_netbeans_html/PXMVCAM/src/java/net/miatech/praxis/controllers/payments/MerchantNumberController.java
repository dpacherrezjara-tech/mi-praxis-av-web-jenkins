/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.MerchantNumberLogic;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2354Filter;
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
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/MerchantNumber")
public class MerchantNumberController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private MerchantNumberLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/MerchantNumber/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : Search-------------");
        map.put("success", true);
        List<A2354Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
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

            lst = logic.loadPX305SQP00933(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPaises")
    public @ResponseBody
    String getPaises(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getPaises-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListGetPaises(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListGetPaises(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

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

            lst = logic.loadPX305SQP04580(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "validateIATA")
    public @ResponseBody
    String validateIATA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : ValidateIATA-------------");
        map.put("success", true);
        List<A003> lst = this.getListValidateIATA(request);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size());
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A003> getListValidateIATA(HttpServletRequest request) {

        List<A003> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String IATA = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            IATA = request.getParameter("IATA");

            lst = logic.loadPX305SQP04435(IATA);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchIATA")
    public @ResponseBody
    String searchIATA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : SearchIATA-------------");
        map.put("success", true);
        List<A4202> lst = this.getListIata(request);
        System.out.println("Total : " + lst.size());
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4202> getListIata(HttpServletRequest request) {

        List<A4202> lst = new ArrayList<>(0);
        Gson gson = new Gson();
        String MERCHN = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            MERCHN = request.getParameter("MERCHN");

            lst = logic.loadPX305SQP04415(MERCHN);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2354Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Nbr.");
            CH1_1.setCellValue("Merchant Code.");
            CH1_2.setCellValue("Merchant Branch");
            CH1_3.setCellValue("Credit Card");
            CH1_5.setCellValue("Mode Down Report");
            CH1_6.setCellValue("Franchise 1");
            CH1_7.setCellValue("Franchise 2");
            CH1_8.setCellValue("Franchise 3");
            CH1_9.setCellValue("Franchise 4");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));
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

            CH2_3.setCellValue("Code Card");
            CH2_4.setCellValue("Card Name");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));

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

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).CMERCHAN);
                rcell2.setCellValue(listaData.get(vi).SUCMERCH);
                rcell3.setCellValue(listaData.get(vi).CODE);
                rcell4.setCellValue(listaData.get(vi).CORE);
                rcell5.setCellValue(listaData.get(vi).DREPORT);
                rcell6.setCellValue(listaData.get(vi).FRANC1);
                rcell7.setCellValue(listaData.get(vi).FRANC2);
                rcell8.setCellValue(listaData.get(vi).FRANC3);
                rcell9.setCellValue(listaData.get(vi).FRANC4);

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

    @RequestMapping(value = "MaintenanceA2354")
    public @ResponseBody
    String MaintenanceA2354(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- MerchantNumber : MaintenanceA2354-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        A2354Filter filter = new A2354Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);
//            filter.MERCHN = request.getParameter("MERCHN").trim();
//            filter.DESCR = request.getParameter("DESCR").trim();
//            filter.RSOCIAL = request.getParameter("RSOCIAL").trim();
//            filter.CIATA = request.getParameter("CIATA").trim();
//            filter.CANAL = request.getParameter("CANAL").trim();
//            filter.SCOUNTRY = request.getParameter("SCOUNTRY").trim();

            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX305SQP00934(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    /**
     *
     * @param map
     * @param request
     * @return
     */
    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : searchCompleteDetail-------------");

        try {
            Gson gson = new Gson();
            A2354Filter filter = new A2354Filter();
            A2354Filter result = new A2354Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());
            try {
                result = logic.loadPX305SQP00935(filter);
                map.put("result", result);
                map.put("success", true);
            } catch (Exception ex) {
                java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
                map.put("success", false);
            }
        } catch (Exception e) {
            System.out.println("pruebinha");
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchMerchants")
    public @ResponseBody
    String searchMerchants(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : searchMerchants-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListMerchants(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListMerchants(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00938(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBanks")
    public @ResponseBody
    String searchBanks(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : searchBanks-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListBanks(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListBanks(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00939(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchIATAS")
    public @ResponseBody
    String searchIATAS(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- MerchantNumber : searchIATAS-------------");

        map.put("success", true);
        List<A2354Filter> lst = this.getListIATAS(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2354Filter> getListIATAS(HttpServletRequest request, Boolean bExcel) {

        List<A2354Filter> lst = new ArrayList<>(0);
        A2354Filter filter = new A2354Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new MerchantNumberLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2354Filter.class);

            lst = logic.loadPX305SQP00940(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

}
