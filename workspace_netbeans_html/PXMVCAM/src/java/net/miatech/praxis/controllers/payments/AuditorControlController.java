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
import java.util.ArrayList;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.librfnd.filter.CPF030Filter;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AuditorControlLogic;
import net.miatech.praxis.logic.master.MasterLogic;
import net.miatech.utils.Functions;
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
import org.springframework.web.servlet.ModelAndView;

@Controller
@Scope("request")
@RequestMapping("/AuditorControl")
public class AuditorControlController extends BaseController {

    private AuditorControlLogic logic;
    private MasterLogic logMaster;
    private String CCUST = "";

    @RequestMapping(value = "/index", method = RequestMethod.POST)
    public ModelAndView getRefundRequest() {
        ModelAndView mvw = new ModelAndView();
        mvw.setViewName("refund/browser/AuditorControl/index");
        try {
            //GUARDANDO LA VISITA ==============================================
            logMaster = new MasterLogic();
            logMaster.setSession(this.serverSession.getServerSession());
//            logic.setSession(this.serverSession.getServerSession());

            CCUST = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileINF020.CCUST;
            String user = this.serverSession.getServerSession().getUserView().getCustomerInfoComplete().fileINF020.USR;
            System.out.println("getRefundRequest");
//            logMaster.monitoreoVisitas(CCUST, user.toUpperCase(), "RF007");
            // =================================================================
        } catch (Exception e) {
        }
        return mvw;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- BankReconciliationController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/BankReconciliation/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(HttpServletRequest request) {
        System.out.println("AuditorControlController : search");
        HashMap m = new HashMap();
        logic = new AuditorControlLogic();
        List<CPF031Filter> lstData;
        CPF031Filter filter = new CPF031Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            lstData = logic.search(filter);
            m.put("success", true);
            m.put("data", lstData);
            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            m.put("success", false);
        }

        return new Gson().toJson(m);
    }

//    @RequestMapping(value = "searchDataDetail")
//    public @ResponseBody
//    String searchDataDetail(HttpServletRequest request) {
//        System.out.println("AuditorControlController : searchDataDetail");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF031Filter> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//
//            lstData = logic.searchDataDetail(filter);
//            m.put("success", true);
//            m.put("data", lstData);
//            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(m);
//    }
//
    @RequestMapping(value = "searchDataDetailDay")
    public @ResponseBody
    String searchDataDetailDay(HttpServletRequest request) {
        System.out.println("AuditorControlController : searchDataDetailDay");
        HashMap m = new HashMap();
        logic = new AuditorControlLogic();
        List<CPF030Filter> lstData;
        CPF031Filter filter = new CPF031Filter();
        String flag = "";
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            flag = request.getParameter("flag");

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lstData = logic.searchDetailDay(filter, flag);
            m.put("success", true);
            m.put("data", lstData);
            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            m.put("success", false);
        }

        return new Gson().toJson(m);
    }
//
    @RequestMapping(value = "searchDataDetailAll")
    public @ResponseBody
    String searchDataDetailAll(HttpServletRequest request) {
        System.out.println("AuditorControlController : searchDataDetailAll");
        HashMap m = new HashMap();
        logic = new AuditorControlLogic();
        List<CPF031Filter> lstData;
        CPF031Filter filter = new CPF031Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            lstData = logic.searchDataDetailAll(filter);
            m.put("success", true);
            m.put("data", lstData);
            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
        } catch (Exception e) {
            m.put("success", false);
        }

        return new Gson().toJson(m);
    }
//
//    //----------------------------------------------------------------------------------
//    @RequestMapping(value = "searchByAsigDateMonth")
//    public @ResponseBody
//    String searchByAsigDateMonth(HttpServletRequest request) {
//        System.out.println("AuditorControlController : searchByAsigDateMonth");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF030Filter> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            lstData = logic.searchByAsigDateMonth(filter);
//            m.put("success", true);
//            m.put("data", lstData);
//            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(m);
//    }
//
//    @RequestMapping(value = "searchByAsigDate")
//    public @ResponseBody
//    String searchByAsigDate(HttpServletRequest request) {
//        System.out.println("AuditorControlController : searchByAsigDate");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF030Filter> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            lstData = logic.searchByAsigDate(filter);
//            m.put("success", true);
//            m.put("data", lstData);
//            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(m);
//    }
//
//    // ----------------------------------------------------------------------------------
//    @RequestMapping(value = "searchProcess")
//    public @ResponseBody
//    String searchProcess(HttpServletRequest request) {
//        System.out.println("AuditorControlController : searchProcess");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<?> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//
//            lstData = logic.searchProcess(filter);
//            m.put("success", true);
//            m.put("data", lstData);
////            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(m);
//    }
//
//    @RequestMapping(value = "searchProcess_1")
//    public @ResponseBody
//    String searchProcess_1(ModelMap map, HttpServletRequest request) {
//        System.out.println("AuditorControlController : searchProcess_1");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF031Filter> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            
//            m = logic.searchProcess_1(filter);
//            lstData = (List<CPF031Filter>) m.get("lst1");
//
//            map.put("success", true);
//            map.put("data", lstData);
//            map.put("data2", m.get("lst2"));
////            map.put("listaRates", m.get("lstRates"));
//            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//
////            lstData = logic.searchProcess_1(filter);
////            m.put("success", true);
////            m.put("data", lstData);
////            m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(map);
//    }
//
//    @RequestMapping(value = "searchProcessDay")
//    public @ResponseBody
//    String searchProcessDay(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("AuditorControlController : searchProcessDay");
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF030Filter> lstData;
//        CPF031Filter filter = new CPF031Filter();
//        String flag = "";
//        
//        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
//        
//        try {
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            flag = request.getParameter("flag");
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//            
//            
//            if (!dw_excel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lstData = logic.searchProcessDay(filter, flag);
//            
//            
//            if(dw_excel){
//                ExportUtil.exportFields(request, response,lstData);
//            }else{
//            
//                m.put("success", true);
//                m.put("data", lstData);
//                m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//            }
//        } catch (Exception e) {
//            m.put("success", false);
//        }
//
//        return new Gson().toJson(m);
//    }
//    
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        CPF031Filter filter = new CPF031Filter();
//        HashMap m = new HashMap();
//        logic = new AuditorControlLogic();
//        List<CPF031Filter> listaData;
//        List<CPF031Filter> listaData2;
//        System.out.println("Report : getXLSX");
//        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//
////            listaData = logic.searchProcess_1(filter);
//            m = logic.searchProcess_1(filter);
//            
//            listaData = (ArrayList) m.get("lst1");
//            listaData2 = (ArrayList) m.get("lst2");
////            List<WRF016Filter> listaData3 = (ArrayList) hm.get("lstRates");
//            
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            Iterator iter2 = listaData2.iterator();
////            Iterator iter2 = listaData3.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);
//            Cell CH1_15 = row1.createCell(15);
//            Cell CH1_16 = row1.createCell(16);
//            Cell CH1_17 = row1.createCell(17);
//            Cell CH1_18 = row1.createCell(18);
//            Cell CH1_19 = row1.createCell(19);
//            Cell CH1_20 = row1.createCell(20);
//            Cell CH1_21 = row1.createCell(21);
//            Cell CH1_22 = row1.createCell(22);
//            Cell CH1_23 = row1.createCell(23);
//            Cell CH1_24 = row1.createCell(24);
//            Cell CH1_25 = row1.createCell(25);
//            Cell CH1_26 = row1.createCell(26);
//            Cell CH1_27 = row1.createCell(27);
//            Cell CH1_28 = row1.createCell(28);
//            Cell CH1_29 = row1.createCell(29);
//            Cell CH1_30 = row1.createCell(30);
//            Cell CH1_31 = row1.createCell(31);
//            Cell CH1_32 = row1.createCell(32);
//            Cell CH1_33 = row1.createCell(33);
////            Cell CH1_34 = row1.createCell(34);
////            Cell CH1_35 = row1.createCell(35);
////            Cell CH1_36 = row1.createCell(36);
////            Cell CH1_37 = row1.createCell(37);
////            Cell CH1_38 = row1.createCell(38);
////            Cell CH1_39 = row1.createCell(39);
////            Cell CH1_40 = row1.createCell(40);
////            Cell CH1_41 = row1.createCell(41);
////            Cell CH1_42 = row1.createCell(42);
////            Cell CH1_43 = row1.createCell(43);
////            Cell CH1_44 = row1.createCell(44);
////            Cell CH1_45 = row1.createCell(45);
////            Cell CH1_46 = row1.createCell(46);
////            Cell CH1_47 = row1.createCell(47);
////            Cell CH1_48 = row1.createCell(48);
////            Cell CH1_49 = row1.createCell(49);
////            Cell CH1_50 = row1.createCell(50);
////            Cell CH1_51 = row1.createCell(51);
////            Cell CH1_52 = row1.createCell(52);
////            Cell CH1_53 = row1.createCell(53);
////            Cell CH1_54 = row1.createCell(54);
////            Cell CH1_55 = row1.createCell(55);
////            Cell CH1_56 = row1.createCell(56);
////            Cell CH1_57 = row1.createCell(57);
////            Cell CH1_58 = row1.createCell(58);
////            Cell CH1_59 = row1.createCell(59);
////            Cell CH1_60 = row1.createCell(60);
////            Cell CH1_61 = row1.createCell(61);
////            Cell CH1_62 = row1.createCell(62);
////            Cell CH1_63 = row1.createCell(63);
////            Cell CH1_64 = row1.createCell(64);
//
//            CH1_0.setCellValue("User");
//            CH1_1.setCellValue("Total");
//            CH1_2.setCellValue("%");
//            CH1_3.setCellValue("Produced");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//            CH1_23.setCellStyle(headerStyle);
//            CH1_24.setCellStyle(headerStyle);
//            CH1_25.setCellStyle(headerStyle);
//            CH1_26.setCellStyle(headerStyle);
//            CH1_27.setCellStyle(headerStyle);
//            CH1_28.setCellStyle(headerStyle);
//            CH1_29.setCellStyle(headerStyle);
//            CH1_30.setCellStyle(headerStyle);
//            CH1_31.setCellStyle(headerStyle);
//            CH1_32.setCellStyle(headerStyle);
//            CH1_33.setCellStyle(headerStyle);
////            CH1_34.setCellStyle(headerStyle);
////            CH1_35.setCellStyle(headerStyle);
////            CH1_36.setCellStyle(headerStyle);
////            CH1_37.setCellStyle(headerStyle);
////            CH1_38.setCellStyle(headerStyle);
////            CH1_39.setCellStyle(headerStyle);
////            CH1_40.setCellStyle(headerStyle);
////            CH1_41.setCellStyle(headerStyle);
////            CH1_42.setCellStyle(headerStyle);
////            CH1_43.setCellStyle(headerStyle);
////            CH1_44.setCellStyle(headerStyle);
////            CH1_45.setCellStyle(headerStyle);
////            CH1_46.setCellStyle(headerStyle);
////            CH1_47.setCellStyle(headerStyle);
////            CH1_48.setCellStyle(headerStyle);
////            CH1_49.setCellStyle(headerStyle);
////            CH1_50.setCellStyle(headerStyle);
////            CH1_51.setCellStyle(headerStyle);
////            CH1_52.setCellStyle(headerStyle);
////            CH1_53.setCellStyle(headerStyle);
////            CH1_54.setCellStyle(headerStyle);
////            CH1_55.setCellStyle(headerStyle);
////            CH1_56.setCellStyle(headerStyle);
////            CH1_57.setCellStyle(headerStyle);
////            CH1_58.setCellStyle(headerStyle);
////            CH1_59.setCellStyle(headerStyle);
////            CH1_60.setCellStyle(headerStyle);
////            CH1_61.setCellStyle(headerStyle);
////            CH1_62.setCellStyle(headerStyle);
////            CH1_63.setCellStyle(headerStyle);
////            CH1_64.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
////            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 64));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 33));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//            Cell CH2_9 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            Cell CH2_16 = row2.createCell(16);
//            Cell CH2_17 = row2.createCell(17);
//            Cell CH2_18 = row2.createCell(18);
//            Cell CH2_19 = row2.createCell(19);
//            Cell CH2_20 = row2.createCell(20);
//            Cell CH2_21 = row2.createCell(21);
//            Cell CH2_22 = row2.createCell(22);
//            Cell CH2_23 = row2.createCell(23);
//            Cell CH2_24 = row2.createCell(24);
//            Cell CH2_25 = row2.createCell(25);
//            Cell CH2_26 = row2.createCell(26);
//            Cell CH2_27 = row2.createCell(27);
//            Cell CH2_28 = row2.createCell(28);
//            Cell CH2_29 = row2.createCell(29);
//            Cell CH2_30 = row2.createCell(30);
//            Cell CH2_31 = row2.createCell(31);
//            Cell CH2_32 = row2.createCell(32);
//            Cell CH2_33 = row2.createCell(33);
////            Cell CH2_34 = row2.createCell(34);
////            Cell CH2_35 = row2.createCell(35);
////            Cell CH2_36 = row2.createCell(36);
////            Cell CH2_37 = row2.createCell(37);
////            Cell CH2_38 = row2.createCell(38);
////            Cell CH2_39 = row2.createCell(39);
////            Cell CH2_40 = row2.createCell(40);
////            Cell CH2_41 = row2.createCell(41);
////            Cell CH2_42 = row2.createCell(42);
////            Cell CH2_43 = row2.createCell(43);
////            Cell CH2_44 = row2.createCell(44);
////            Cell CH2_45 = row2.createCell(45);
////            Cell CH2_46 = row2.createCell(46);
////            Cell CH2_47 = row2.createCell(47);
////            Cell CH2_48 = row2.createCell(48);
////            Cell CH2_49 = row2.createCell(49);
////            Cell CH2_50 = row2.createCell(50);
////            Cell CH2_51 = row2.createCell(51);
////            Cell CH2_52 = row2.createCell(52);
////            Cell CH2_53 = row2.createCell(53);
////            Cell CH2_54 = row2.createCell(54);
////            Cell CH2_55 = row2.createCell(55);
////            Cell CH2_56 = row2.createCell(56);
////            Cell CH2_57 = row2.createCell(57);
////            Cell CH2_58 = row2.createCell(58);
////            Cell CH2_59 = row2.createCell(59);
////            Cell CH2_60 = row2.createCell(60);
////            Cell CH2_61 = row2.createCell(61);
////            Cell CH2_62 = row2.createCell(62);
////            Cell CH2_63 = row2.createCell(63);
////            Cell CH2_64 = row2.createCell(64);
//            
//            CH2_3.setCellValue("Day");
//            CH2_4.setCellValue("Day");
//            CH2_5.setCellValue("Day");
//            CH2_6.setCellValue("Day");
//            CH2_7.setCellValue("Day");
//            CH2_8.setCellValue("Day");
//            CH2_9.setCellValue("Day");
//            CH2_10.setCellValue("Day");
//            CH2_11.setCellValue("Day");
//            CH2_12.setCellValue("Day");
//            CH2_13.setCellValue("Day");
//            CH2_14.setCellValue("Day");
//            CH2_15.setCellValue("Day");
//            CH2_16.setCellValue("Day");
//            CH2_17.setCellValue("Day");
//            CH2_18.setCellValue("Day");
//            CH2_19.setCellValue("Day");
//            CH2_20.setCellValue("Day");
//            CH2_21.setCellValue("Day");
//            CH2_22.setCellValue("Day");
//            CH2_23.setCellValue("Day");
//            CH2_24.setCellValue("Day");
//            CH2_25.setCellValue("Day");
//            CH2_26.setCellValue("Day");
//            CH2_27.setCellValue("Day");
//            CH2_28.setCellValue("Day");
//            CH2_29.setCellValue("Day");
//            CH2_30.setCellValue("Day");
//            CH2_31.setCellValue("Day");
//            CH2_32.setCellValue("Day");
//            CH2_33.setCellValue("Day");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
//            CH2_9.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//            CH2_17.setCellStyle(headerStyle);
//            CH2_18.setCellStyle(headerStyle);
//            CH2_19.setCellStyle(headerStyle);
//            CH2_20.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_22.setCellStyle(headerStyle);
//            CH2_23.setCellStyle(headerStyle);
//            CH2_24.setCellStyle(headerStyle);
//            CH2_25.setCellStyle(headerStyle);
//            CH2_26.setCellStyle(headerStyle);
//            CH2_27.setCellStyle(headerStyle);
//            CH2_28.setCellStyle(headerStyle);
//            CH2_29.setCellStyle(headerStyle);
//            CH2_30.setCellStyle(headerStyle);
//            CH2_31.setCellStyle(headerStyle);
//            CH2_32.setCellStyle(headerStyle);
//            CH2_33.setCellStyle(headerStyle);
////            CH2_34.setCellStyle(headerStyle);
////            CH2_35.setCellStyle(headerStyle);
////            CH2_36.setCellStyle(headerStyle);
////            CH2_37.setCellStyle(headerStyle);
////            CH2_38.setCellStyle(headerStyle);
////            CH2_39.setCellStyle(headerStyle);
////            CH2_40.setCellStyle(headerStyle);
////            CH2_41.setCellStyle(headerStyle);
////            CH2_42.setCellStyle(headerStyle);
////            CH2_43.setCellStyle(headerStyle);
////            CH2_44.setCellStyle(headerStyle);
////            CH2_45.setCellStyle(headerStyle);
////            CH2_46.setCellStyle(headerStyle);
////            CH2_47.setCellStyle(headerStyle);
////            CH2_48.setCellStyle(headerStyle);
////            CH2_49.setCellStyle(headerStyle);
////            CH2_50.setCellStyle(headerStyle);
////            CH2_51.setCellStyle(headerStyle);
////            CH2_52.setCellStyle(headerStyle);
////            CH2_53.setCellStyle(headerStyle);
////            CH2_54.setCellStyle(headerStyle);
////            CH2_55.setCellStyle(headerStyle);
////            CH2_56.setCellStyle(headerStyle);
////            CH2_57.setCellStyle(headerStyle);
////            CH2_58.setCellStyle(headerStyle);
////            CH2_59.setCellStyle(headerStyle);
////            CH2_60.setCellStyle(headerStyle);
////            CH2_61.setCellStyle(headerStyle);
////            CH2_62.setCellStyle(headerStyle);
////            CH2_63.setCellStyle(headerStyle);
////            CH2_64.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 22));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 23, 23));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 24, 24));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 25, 25));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 26, 26));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 27, 27));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 28, 28));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 29, 29));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 30, 30));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 31, 31));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 32, 32));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 33, 33));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 3 ==========
//            Row row3 = sheet.createRow(vj);
//            Cell CH3_0 = row3.createCell(0);
//            Cell CH3_1 = row3.createCell(1);
//            Cell CH3_2 = row3.createCell(2);
//            Cell CH3_3 = row3.createCell(3);
//            Cell CH3_4 = row3.createCell(4);
//            Cell CH3_5 = row3.createCell(5);
//            Cell CH3_6 = row3.createCell(6);
//            Cell CH3_7 = row3.createCell(7);
//            Cell CH3_8 = row3.createCell(8);
//            Cell CH3_9 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//            Cell CH3_17 = row3.createCell(17);
//            Cell CH3_18 = row3.createCell(18);
//            Cell CH3_19 = row3.createCell(19);
//            Cell CH3_20 = row3.createCell(20);
//            Cell CH3_21 = row3.createCell(21);
//            Cell CH3_22 = row3.createCell(22);
//            Cell CH3_23 = row3.createCell(23);
//            Cell CH3_24 = row3.createCell(24);
//            Cell CH3_25 = row3.createCell(25);
//            Cell CH3_26 = row3.createCell(26);
//            Cell CH3_27 = row3.createCell(27);
//            Cell CH3_28 = row3.createCell(28);
//            Cell CH3_29 = row3.createCell(29);
//            Cell CH3_30 = row3.createCell(30);
//            Cell CH3_31 = row3.createCell(31);
//            Cell CH3_32 = row3.createCell(32);
//            Cell CH3_33 = row3.createCell(33);
////            Cell CH3_34 = row3.createCell(34);
////            Cell CH3_35 = row3.createCell(35);
////            Cell CH3_36 = row3.createCell(36);
////            Cell CH3_37 = row3.createCell(37);
////            Cell CH3_38 = row3.createCell(38);
////            Cell CH3_39 = row3.createCell(39);
////            Cell CH3_40 = row3.createCell(40);
////            Cell CH3_41 = row3.createCell(41);
////            Cell CH3_42 = row3.createCell(42);
////            Cell CH3_43 = row3.createCell(43);
////            Cell CH3_44 = row3.createCell(44);
////            Cell CH3_45 = row3.createCell(45);
////            Cell CH3_46 = row3.createCell(46);
////            Cell CH3_47 = row3.createCell(47);
////            Cell CH3_48 = row3.createCell(48);
////            Cell CH3_49 = row3.createCell(49);
////            Cell CH3_50 = row3.createCell(50);
////            Cell CH3_51 = row3.createCell(51);
////            Cell CH3_52 = row3.createCell(52);
////            Cell CH3_53 = row3.createCell(53);
////            Cell CH3_54 = row3.createCell(54);
////            Cell CH3_55 = row3.createCell(55);
////            Cell CH3_56 = row3.createCell(56);
////            Cell CH3_57 = row3.createCell(57);
////            Cell CH3_58 = row3.createCell(58);
////            Cell CH3_59 = row3.createCell(59);
////            Cell CH3_60 = row3.createCell(60);
////            Cell CH3_61 = row3.createCell(61);
////            Cell CH3_62 = row3.createCell(62);
////            Cell CH3_63 = row3.createCell(63);
////            Cell CH3_64 = row3.createCell(64);
//            
//            CH3_3.setCellValue("01");
////            CH3_4.setCellValue("%");
//            CH3_4.setCellValue("02");
////            CH3_6.setCellValue("%");
//            CH3_5.setCellValue("03");
////            CH3_8.setCellValue("%");
//            CH3_6.setCellValue("04");
////            CH3_10.setCellValue("%");
//            CH3_7.setCellValue("05");
////            CH3_12.setCellValue("%");
//            CH3_8.setCellValue("06");
////            CH3_14.setCellValue("%");
//            CH3_9.setCellValue("07");
////            CH3_16.setCellValue("%");
//            CH3_10.setCellValue("08");
////            CH3_18.setCellValue("%");
//            CH3_11.setCellValue("09");
////            CH3_20.setCellValue("%");
//            CH3_12.setCellValue("10");
////            CH3_22.setCellValue("%");
//            CH3_13.setCellValue("11");
////            CH3_24.setCellValue("%");
//            CH3_14.setCellValue("12");
////            CH3_26.setCellValue("%");
//            CH3_15.setCellValue("13");
////            CH3_28.setCellValue("%");
//            CH3_16.setCellValue("14");
////            CH3_30.setCellValue("%");
//            CH3_17.setCellValue("15");
////            CH3_32.setCellValue("%");
//            CH3_18.setCellValue("16");
////            CH3_34.setCellValue("%");
//            CH3_19.setCellValue("17");
////            CH3_36.setCellValue("%");
//            CH3_20.setCellValue("18");
////            CH3_38.setCellValue("%");
//            CH3_21.setCellValue("19");
////            CH3_40.setCellValue("%");
//            CH3_22.setCellValue("20");
////            CH3_42.setCellValue("%");
//            CH3_23.setCellValue("21");
////            CH3_44.setCellValue("%");
//            CH3_24.setCellValue("22");
////            CH3_46.setCellValue("%");
//            CH3_25.setCellValue("23");
////            CH3_48.setCellValue("%");
//            CH3_26.setCellValue("24");
////            CH3_50.setCellValue("%");
//            CH3_27.setCellValue("25");
////            CH3_52.setCellValue("%");
//            CH3_28.setCellValue("26");
////            CH3_54.setCellValue("%");
//            CH3_29.setCellValue("27");
////            CH3_56.setCellValue("%");
//            CH3_30.setCellValue("28");
////            CH3_58.setCellValue("%");
//            CH3_31.setCellValue("29");
////            CH3_60.setCellValue("%");
//            CH3_32.setCellValue("30");
////            CH3_62.setCellValue("%");
//            CH3_33.setCellValue("31");
////            CH3_64.setCellValue("%");
//
//            CH3_0.setCellStyle(headerStyle);
//            CH3_1.setCellStyle(headerStyle);
//            CH3_2.setCellStyle(headerStyle);
//            CH3_3.setCellStyle(headerStyle);
//            CH3_4.setCellStyle(headerStyle);
//            CH3_5.setCellStyle(headerStyle);
//            CH3_6.setCellStyle(headerStyle);
//            CH3_7.setCellStyle(headerStyle);
//            CH3_8.setCellStyle(headerStyle);
//            CH3_9.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//            CH3_17.setCellStyle(headerStyle);
//            CH3_18.setCellStyle(headerStyle);
//            CH3_19.setCellStyle(headerStyle);
//            CH3_20.setCellStyle(headerStyle);
//            CH3_21.setCellStyle(headerStyle);
//            CH3_22.setCellStyle(headerStyle);
//            CH3_23.setCellStyle(headerStyle);
//            CH3_24.setCellStyle(headerStyle);
//            CH3_25.setCellStyle(headerStyle);
//            CH3_26.setCellStyle(headerStyle);
//            CH3_27.setCellStyle(headerStyle);
//            CH3_28.setCellStyle(headerStyle);
//            CH3_29.setCellStyle(headerStyle);
//            CH3_30.setCellStyle(headerStyle);
//            CH3_31.setCellStyle(headerStyle);
//            CH3_32.setCellStyle(headerStyle);
//            CH3_33.setCellStyle(headerStyle);
////            CH3_34.setCellStyle(headerStyle);
////            CH3_35.setCellStyle(headerStyle);
////            CH3_36.setCellStyle(headerStyle);
////            CH3_37.setCellStyle(headerStyle);
////            CH3_38.setCellStyle(headerStyle);
////            CH3_39.setCellStyle(headerStyle);
////            CH3_40.setCellStyle(headerStyle);
////            CH3_41.setCellStyle(headerStyle);
////            CH3_42.setCellStyle(headerStyle);
////            CH3_43.setCellStyle(headerStyle);
////            CH3_44.setCellStyle(headerStyle);
////            CH3_45.setCellStyle(headerStyle);
////            CH3_46.setCellStyle(headerStyle);
////            CH3_47.setCellStyle(headerStyle);
////            CH3_48.setCellStyle(headerStyle);
////            CH3_49.setCellStyle(headerStyle);
////            CH3_50.setCellStyle(headerStyle);
////            CH3_51.setCellStyle(headerStyle);
////            CH3_52.setCellStyle(headerStyle);
////            CH3_53.setCellStyle(headerStyle);
////            CH3_54.setCellStyle(headerStyle);
////            CH3_55.setCellStyle(headerStyle);
////            CH3_56.setCellStyle(headerStyle);
////            CH3_57.setCellStyle(headerStyle);
////            CH3_58.setCellStyle(headerStyle);
////            CH3_59.setCellStyle(headerStyle);
////            CH3_60.setCellStyle(headerStyle);
////            CH3_61.setCellStyle(headerStyle);
////            CH3_62.setCellStyle(headerStyle);
////            CH3_63.setCellStyle(headerStyle);
////            CH3_64.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
////            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);
//                Cell rcell15 = row1.createCell(15);
//                Cell rcell16 = row1.createCell(16);
//                Cell rcell17 = row1.createCell(17);
//                Cell rcell18 = row1.createCell(18);
//                Cell rcell19 = row1.createCell(19);
//                Cell rcell20 = row1.createCell(20);
//                Cell rcell21 = row1.createCell(21);
//                Cell rcell22 = row1.createCell(22);
//                Cell rcell23 = row1.createCell(23);
//                Cell rcell24 = row1.createCell(24);
//                Cell rcell25 = row1.createCell(25);
//                Cell rcell26 = row1.createCell(26);
//                Cell rcell27 = row1.createCell(27);
//                Cell rcell28 = row1.createCell(28);
//                Cell rcell29 = row1.createCell(29);
//                Cell rcell30 = row1.createCell(30);
//                Cell rcell31 = row1.createCell(31);
//                Cell rcell32 = row1.createCell(32);
//                Cell rcell33 = row1.createCell(33);
////                Cell rcell34 = row1.createCell(34);
////                Cell rcell35 = row1.createCell(35);
////                Cell rcell36 = row1.createCell(36);
////                Cell rcell37 = row1.createCell(37);
////                Cell rcell38 = row1.createCell(38);
////                Cell rcell39 = row1.createCell(39);
////                Cell rcell40 = row1.createCell(40);
////                Cell rcell41 = row1.createCell(41);
////                Cell rcell42 = row1.createCell(42);
////                Cell rcell43 = row1.createCell(43);
////                Cell rcell44 = row1.createCell(44);
////                Cell rcell45 = row1.createCell(45);
////                Cell rcell46 = row1.createCell(46);
////                Cell rcell47 = row1.createCell(47);
////                Cell rcell48 = row1.createCell(48);
////                Cell rcell49 = row1.createCell(49);
////                Cell rcell50 = row1.createCell(50);
////                Cell rcell51 = row1.createCell(51);
////                Cell rcell52 = row1.createCell(52);
////                Cell rcell53 = row1.createCell(53);
////                Cell rcell54 = row1.createCell(54);
////                Cell rcell55 = row1.createCell(55);
////                Cell rcell56 = row1.createCell(56);
////                Cell rcell57 = row1.createCell(57);
////                Cell rcell58 = row1.createCell(58);
////                Cell rcell59 = row1.createCell(59);
////                Cell rcell60 = row1.createCell(60);
////                Cell rcell61 = row1.createCell(61);
////                Cell rcell62 = row1.createCell(62);
////                Cell rcell63 = row1.createCell(63);
////                Cell rcell64 = row1.createCell(64);
//
//                rcell0.setCellValue(listaData.get(vi).USEAC);
//                rcell1.setCellValue(listaData.get(vi).totDIA);
//                rcell2.setCellValue(listaData.get(vi).totPorcDIA);
//                rcell3.setCellValue(listaData.get(vi).DIA01);
////                rcell4.setCellValue(listaData.get(vi).porcDIA01);
//                rcell4.setCellValue(listaData.get(vi).DIA02);
////                rcell6.setCellValue(listaData.get(vi).porcDIA02);
//                rcell5.setCellValue(listaData.get(vi).DIA03);
////                rcell8.setCellValue(listaData.get(vi).porcDIA03);
//                rcell6.setCellValue(listaData.get(vi).DIA04);
////                rcell10.setCellValue(listaData.get(vi).porcDIA04);
//                rcell7.setCellValue(listaData.get(vi).DIA05);
////                rcell12.setCellValue(listaData.get(vi).porcDIA05);
//                rcell8.setCellValue(listaData.get(vi).DIA06);
////                rcell14.setCellValue(listaData.get(vi).porcDIA06);
//                rcell9.setCellValue(listaData.get(vi).DIA07);
////                rcell16.setCellValue(listaData.get(vi).porcDIA07);
//                rcell10.setCellValue(listaData.get(vi).DIA08);
////                rcell18.setCellValue(listaData.get(vi).porcDIA08);
//                rcell11.setCellValue(listaData.get(vi).DIA09);
////                rcell20.setCellValue(listaData.get(vi).porcDIA09);
//                rcell12.setCellValue(listaData.get(vi).DIA10);
////                rcell22.setCellValue(listaData.get(vi).porcDIA10);
//                rcell13.setCellValue(listaData.get(vi).DIA11);
////                rcell24.setCellValue(listaData.get(vi).porcDIA11);
//                rcell14.setCellValue(listaData.get(vi).DIA12);
////                rcell26.setCellValue(listaData.get(vi).porcDIA12);
//                rcell15.setCellValue(listaData.get(vi).DIA13);
////                rcell28.setCellValue(listaData.get(vi).porcDIA13);
//                rcell16.setCellValue(listaData.get(vi).DIA14);
////                rcell30.setCellValue(listaData.get(vi).porcDIA14);
//                rcell17.setCellValue(listaData.get(vi).DIA15);
////                rcell32.setCellValue(listaData.get(vi).porcDIA15);
//                rcell18.setCellValue(listaData.get(vi).DIA16);
////                rcell34.setCellValue(listaData.get(vi).porcDIA16);
//                rcell19.setCellValue(listaData.get(vi).DIA17);
////                rcell36.setCellValue(listaData.get(vi).porcDIA17);
//                rcell20.setCellValue(listaData.get(vi).DIA18);
////                rcell38.setCellValue(listaData.get(vi).porcDIA18);
//                rcell21.setCellValue(listaData.get(vi).DIA19);
////                rcell40.setCellValue(listaData.get(vi).porcDIA19);
//                rcell22.setCellValue(listaData.get(vi).DIA20);
////                rcell42.setCellValue(listaData.get(vi).porcDIA20);
//                rcell23.setCellValue(listaData.get(vi).DIA21);
////                rcell44.setCellValue(listaData.get(vi).porcDIA21);
//                rcell24.setCellValue(listaData.get(vi).DIA22);
////                rcell46.setCellValue(listaData.get(vi).porcDIA22);
//                rcell25.setCellValue(listaData.get(vi).DIA23);
////                rcell48.setCellValue(listaData.get(vi).porcDIA23);
//                rcell26.setCellValue(listaData.get(vi).DIA24);
////                rcell50.setCellValue(listaData.get(vi).porcDIA24);
//                rcell27.setCellValue(listaData.get(vi).DIA25);
////                rcell52.setCellValue(listaData.get(vi).porcDIA25);
//                rcell28.setCellValue(listaData.get(vi).DIA26);
////                rcell54.setCellValue(listaData.get(vi).porcDIA26);
//                rcell29.setCellValue(listaData.get(vi).DIA27);
////                rcell56.setCellValue(listaData.get(vi).porcDIA27);
//                rcell30.setCellValue(listaData.get(vi).DIA28);
////                rcell58.setCellValue(listaData.get(vi).porcDIA28);
//                rcell31.setCellValue(listaData.get(vi).DIA29);
////                rcell60.setCellValue(listaData.get(vi).porcDIA29);
//                rcell32.setCellValue(listaData.get(vi).DIA30);
////                rcell62.setCellValue(listaData.get(vi).porcDIA30);
//                rcell33.setCellValue(listaData.get(vi).DIA31);
////                rcell64.setCellValue(listaData.get(vi).porcDIA31);
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//            
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//            sheet.autoSizeColumn(23, true);
//            sheet.autoSizeColumn(24, true);
//            sheet.autoSizeColumn(25, true);
//            sheet.autoSizeColumn(26, true);
//            sheet.autoSizeColumn(27, true);
//            sheet.autoSizeColumn(28, true);
//            sheet.autoSizeColumn(29, true);
//            sheet.autoSizeColumn(30, true);
//            sheet.autoSizeColumn(31, true);
//            sheet.autoSizeColumn(32, true);
//            sheet.autoSizeColumn(33, true);
////            sheet.autoSizeColumn(34, true);
////            sheet.autoSizeColumn(35, true);
////            sheet.autoSizeColumn(36, true);
////            sheet.autoSizeColumn(37, true);
////            sheet.autoSizeColumn(38, true);
////            sheet.autoSizeColumn(39, true);
////            sheet.autoSizeColumn(40, true);
////            sheet.autoSizeColumn(41, true);
////            sheet.autoSizeColumn(42, true);
////            sheet.autoSizeColumn(43, true);
////            sheet.autoSizeColumn(44, true);
////            sheet.autoSizeColumn(45, true);
////            sheet.autoSizeColumn(46, true);
////            sheet.autoSizeColumn(47, true);
////            sheet.autoSizeColumn(48, true);
////            sheet.autoSizeColumn(49, true);
////            sheet.autoSizeColumn(50, true);
////            sheet.autoSizeColumn(51, true);
////            sheet.autoSizeColumn(52, true);
////            sheet.autoSizeColumn(53, true);
////            sheet.autoSizeColumn(54, true);
////            sheet.autoSizeColumn(55, true);
////            sheet.autoSizeColumn(56, true);
////            sheet.autoSizeColumn(57, true);
////            sheet.autoSizeColumn(58, true);
////            sheet.autoSizeColumn(59, true);
////            sheet.autoSizeColumn(60, true);
////            sheet.autoSizeColumn(61, true);
////            sheet.autoSizeColumn(62, true);
////            sheet.autoSizeColumn(63, true);
////            sheet.autoSizeColumn(64, true);
//            
//            /// ********************************************************************** ///
//            vj++;
//            vj++;
//
//            // ====== CREANDO TITULOS ======================================
//            // ======  Nivel 1 ==========
//            row1 = sheet.createRow(vj);
//            CH1_0 = row1.createCell(0);
//            CH1_1 = row1.createCell(1);
//            CH1_2 = row1.createCell(2);
//            
//            CH1_0.setCellValue("ESTADO DE SOLICITUD");
//            CH1_1.setCellValue("CARGA UATP");
//            CH1_2.setCellValue("CARGA FOP ORIGINAL");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(vj, vj, 2, 2));
//
//            ++vj;
//            //============================================
//            
//            vi = 0;
//            while (iter2.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//
//                rcell0.setCellValue(listaData2.get(vi).ESTADO);
//                rcell1.setCellValue(listaData2.get(vi).QTY_TOTAL);
//                rcell2.setCellValue(listaData2.get(vi).QTY_TOTAL_ORIGINAL);
//                iter2.next();
//                ++vi;
//                ++vj;
//            }
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
//    
//    
//    @RequestMapping(value = "executeCPP", method = RequestMethod.POST)
//    public @ResponseBody
//    String executeCPP(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws IOException, Exception {
//        Functions.msjConsola("PRAXISAV", currentSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
//        logic = new AuditorControlLogic();
//        String message = "";
//        CPF030Filter filter = new CPF030Filter();
//        try {
// 
//            logic.setSession(currentSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            message = logic.loadSQP04496(filter);
// 
//            map.put("success", true);
//            map.put("msjResult", message);
//        } catch (Exception e) {
//            map.put("success", false);
//            map.put("msjResult", message);
//        }
//        return new Gson().toJson(map);
// 
//    }

}
