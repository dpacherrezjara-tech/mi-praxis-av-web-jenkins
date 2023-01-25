/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2560Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterClientLogic;
import net.miatech.praxis.logic.salesAudit.ADMManualFormLogic;
import net.miatech.praxis.logic.salesAudit.ADMReportLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/ADMManualForm")
public class ADMManualFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADMManualFormLogic logic;
    private AccountingMasterClientLogic logic2;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP00911Filter> lst;
        SQP00911Filter filter = new SQP00911Filter();

        try {
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.OPCIONTYPE = request.getParameter("OPCIONTYPE");
            filter.COMBOBY = request.getParameter("COMBOBY");
            filter.CIA = request.getParameter("CIA");
            filter.FORMA = request.getParameter("FORMA");
            filter.SERIE = request.getParameter("SERIE");
            filter.NUMBERADM = request.getParameter("NUMBERADM");
            filter.DATEFROM = request.getParameter("DATEFROM");
            filter.DATETO = request.getParameter("DATETO");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CURRENCY = request.getParameter("CURRENCY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.AUTMAN = request.getParameter("AUTMAN");
            filter.STATUS = request.getParameter("STATUS");
            filter.COMBOCHANNEL = request.getParameter("COMBOCHANNEL");
            filter.SEQ = request.getParameter("SEQ");
            filter.CUPON = request.getParameter("CUPON");
            filter.TRNCU = request.getParameter("TRNCU");
            filter.VP_PREME = request.getParameter("VP_PREME");
            filter.VP_CNXPA = request.getParameter("VP_CNXPA");
            filter.VP_TUORCODE = request.getParameter("VP_TUORCODE");
            filter.VP_USER = request.getParameter("VP_USER");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_AREA = request.getParameter("VP_AREA");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchDataACMADM")
    public @ResponseBody
    String SearchDataACMADM(ModelMap map, HttpServletRequest request) {
        SQP00911Filter lst;
        SQP00911Filter filter = new SQP00911Filter();

        HashMap map01, map02;

        ArrayList<HashMap<String, String>> lst_CalculosImpuestos = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_dataIni = new ArrayList<>();

        try {
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.SearchDataACMADM(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_dataIni">
            for (int vi = 0; vi < lst.lst_Ini.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A2548PAIS", lst.lst_Ini.get(vi).A2548PAIS);
                map01.put("A2548IATA", lst.lst_Ini.get(vi).A2548IATA);

                map01.put("A2548TRNCU", lst.lst_Ini.get(vi).A2548TRNCU);
                map01.put("A2548NMEMO", lst.lst_Ini.get(vi).A2548NMEMO);
                map01.put("AGENCY", lst.lst_Ini.get(vi).AGENCY);
                map01.put("DIRAGENCY", lst.lst_Ini.get(vi).DIRAGENCY);
                map01.put("A2548MDA", lst.lst_Ini.get(vi).A2548MDA);
                map01.put("A2548FTE", lst.lst_Ini.get(vi).A2548FTE);
                map01.put("A2548CANAL", lst.lst_Ini.get(vi).A2548CANAL);
                map01.put("A2548CPN", lst.lst_Ini.get(vi).A2548CPN);
                map01.put("A2548CDGT", lst.lst_Ini.get(vi).A2548CDGT);
                map01.put("A2548CNJ", lst.lst_Ini.get(vi).A2548CNJ);
                map01.put("A2548TRNCO", lst.lst_Ini.get(vi).A2548TRNCO);
                map01.put("A2548CNXPA", lst.lst_Ini.get(vi).A2548CNXPA);
                map01.put("A2548TARIF", lst.lst_Ini.get(vi).A2548TARIF);
                map01.put("A2548TTAX", lst.lst_Ini.get(vi).A2548TTAX);
                map01.put("A2548SERVI", lst.lst_Ini.get(vi).A2548SERVI);
                map01.put("A2548IVACS", lst.lst_Ini.get(vi).A2548IVACS);
                map01.put("A2548COMIS", lst.lst_Ini.get(vi).A2548COMIS);
                map01.put("A2548SCOM", lst.lst_Ini.get(vi).A2548SCOM);
                map01.put("A2548TAXCM", lst.lst_Ini.get(vi).A2548TAXCM);
                map01.put("A2548TARIA", lst.lst_Ini.get(vi).A2548TARIA);
                map01.put("A2548TTAXA", lst.lst_Ini.get(vi).A2548TTAXA);
                map01.put("A2548SERVA", lst.lst_Ini.get(vi).A2548SERVA);
                map01.put("A2548IVACA", lst.lst_Ini.get(vi).A2548IVACA);
                map01.put("A2548COMIA", lst.lst_Ini.get(vi).A2548COMIA);
                map01.put("A2548SCOMA", lst.lst_Ini.get(vi).A2548SCOMA);
                map01.put("A2548TAXCA", lst.lst_Ini.get(vi).A2548TAXCA);
                map01.put("A2548TARID", lst.lst_Ini.get(vi).A2548TARID);
                map01.put("A2548TTAXD", lst.lst_Ini.get(vi).A2548TTAXD);
                map01.put("A2548SERVD", lst.lst_Ini.get(vi).A2548SERVD);
                map01.put("A2548IVACD", lst.lst_Ini.get(vi).A2548IVACD);
                map01.put("A2548COMID", lst.lst_Ini.get(vi).A2548COMID);
                map01.put("A2548SCOMD", lst.lst_Ini.get(vi).A2548SCOMD);
                map01.put("A2548TAXCD", lst.lst_Ini.get(vi).A2548TAXCD);
                map01.put("A2548TCARD", lst.lst_Ini.get(vi).A2548TCARD);
                map01.put("A2548TTAMD", lst.lst_Ini.get(vi).A2548TTAMD);
                map01.put("A2548TOTAD", lst.lst_Ini.get(vi).A2548TOTAD);
                map01.put("A2548NETO", lst.lst_Ini.get(vi).A2548NETO);
                map01.put("A2548DECMO", lst.lst_Ini.get(vi).A2548DECMO);
                map01.put("A2548AREA", lst.lst_Ini.get(vi).A2548AREA);
                map01.put("A2548CTAC", lst.lst_Ini.get(vi).A2548CTAC);

                map01.put("A2548PENAA", lst.lst_Ini.get(vi).A2548PENAA);
                map01.put("A2548PENAL", lst.lst_Ini.get(vi).A2548PENAL);
                map01.put("A2548PENAD", lst.lst_Ini.get(vi).A2548PENAD);
                lst_dataIni.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_CalcuImpuestos">
            for (int vi = 0; vi < lst.lst_CalcuImpuestos.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A1673CDTAX", lst.lst_CalcuImpuestos.get(vi).A1673CDTAX);
                map02.put("A1673CDATO", lst.lst_CalcuImpuestos.get(vi).A1673CDATO);
                map02.put("A1673TXORI", lst.lst_CalcuImpuestos.get(vi).A1673TXORI);
                map02.put("A1673TXMIA", lst.lst_CalcuImpuestos.get(vi).A1673TXMIA);
                map02.put("A1673TXDIF", lst.lst_CalcuImpuestos.get(vi).A1673TXDIF);
                map02.put("A1673MONED", lst.lst_CalcuImpuestos.get(vi).A1673MONED);
                map02.put("A1673MORIG", lst.lst_CalcuImpuestos.get(vi).A1673MORIG);

                lst_CalculosImpuestos.add(map02);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_dataIni", lst_dataIni);
        map.put("lst_CalculosImpuestos", lst_CalculosImpuestos);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchDataCalcuImpuestos")
    public @ResponseBody
    String SearchDataCalcuImpuestos(ModelMap map, HttpServletRequest request) {
        List<A1673Filter> lst;
        A1673Filter filter = new A1673Filter();

        try {
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.SearchDataCalcuImpuestos(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchADManualRazon")
    public @ResponseBody
    String SearchADManualRazon(ModelMap map, HttpServletRequest request) {
        List<A2560Filter> lst;
        A2560Filter filter = new A2560Filter();

        try {
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.SearchADManualRazon(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/loadCombo")
    public @ResponseBody
    String loadCombo(ModelMap map, HttpServletRequest request) {
        map.put("success", false);
        HashMap mapProperties;
        HashMap mapProperties2;
        ArrayList<HashMap<String, String>> lstData = new ArrayList<>();
        ArrayList<HashMap<String, String>> lstData2 = new ArrayList<>();
        try {
            logic2 = new AccountingMasterClientLogic();
            logic2.setSession((IServerSession) serverSession.getServerSession());

            List<A051> lstCountry = logic2.loadCountry();

            mapProperties = new HashMap<>();
            mapProperties.put("A051KEY2", "");
            mapProperties.put("A051DESCR1", "SELECT");
            lstData.add(mapProperties);
            for (int vi = 0; vi < lstCountry.size(); ++vi) {
                mapProperties = new HashMap<>();
                mapProperties.put("A051KEY2", lstCountry.get(vi).A051KEY2);
                mapProperties.put("A051DESCR1", lstCountry.get(vi).A051DESCR1);
                lstData.add(mapProperties);
            }

            List<A006> lstCurrency = logic2.loadCurrency();
            mapProperties2 = new HashMap<>();
            mapProperties2.put("A006MONEDA", "SELECT");
            lstData2.add(mapProperties2);
            for (int vi = 0; vi < lstCurrency.size(); ++vi) {
                mapProperties2 = new HashMap<>();
                mapProperties2.put("A006MONEDA", lstCurrency.get(vi).A006MONEDA);
                lstData2.add(mapProperties2);
            }

            map.put("success", true);
            map.put("lstCountry", lstData);
            map.put("lstCurrency", lstData2);
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaManualADM")
    public @ResponseBody
    String ProcesaManualADM(ModelMap map, HttpServletRequest request) {
        String result = "";
        String razones = "";
        String taxes = "";
        boolean iboolean;
        SQP00911Filter filter = new SQP00911Filter();
        ArrayList<A2560Filter> gridDataRazones = new ArrayList<A2560Filter>();
        ArrayList<A1673Filter> gridDataTaxes = new ArrayList<A1673Filter>();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonRazo = parser.parse(request.getParameter("beanlstRazones")).getAsJsonArray();
            JsonArray gsonTaxes = parser.parse(request.getParameter("beanlstTaxes")).getAsJsonArray();
            for (JsonElement obj : gsonTaxes) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A1673Filter data = new A1673Filter();
                taxes = taxes + "|" + gsonObj.get("A1673CDTAX").getAsString() + "$" + gsonObj.get("A1673TXMIA").getAsString() + "$" + gsonObj.get("A1673CDATO").getAsString(); //

                //gridDataTaxes.add(data);
            }
            //LISTA DE TKT
            for (JsonElement obj : gsonRazo) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2560Filter data = new A2560Filter();
                razones += razones + "|" + gsonObj.get("A2560CODRZ").getAsString() + "$" + gsonObj.get("A2560FAMIL").getAsString() + "$" + gsonObj.get("A2560ERROR").getAsString();
            }

            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualADM(filter, taxes, razones);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTKTManual")
    public @ResponseBody
    String insertTKTManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<SQP00911Filter> gridData = new ArrayList<SQP00911Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548TRNCO = gsonObj.get("A2548TRNCO").getAsString();
                data.A2548CNXPA = gsonObj.get("A2548CNXPA").getAsString();
                data.A2548PAIS = gsonObj.get("A2548PAIS").getAsString();
                gridData.add(data);

            }
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKTManual(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        SQP00911Filter filter = new SQP00911Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic2 = new ADMReportLogic();
            logic2.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> listaData = logic2.SearchReportADM(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("ADM Report Manual");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);
            CH_21 = row.createCell(21);
            CH_22 = row.createCell(22);
            CH_23 = row.createCell(23);

            CH_00.setCellValue("");
            CH_01.setCellValue("Ticket");
            CH_02.setCellValue("Memo Number");
            CH_03.setCellValue("Amount");
            CH_04.setCellValue("IATA");
            CH_05.setCellValue("Agency");
            CH_06.setCellValue("Cur.");
            CH_07.setCellValue("Country");
            CH_08.setCellValue("Source");
            CH_09.setCellValue("Transaction");
            CH_10.setCellValue("Tour Code");
            CH_11.setCellValue("Types");
            CH_12.setCellValue("System Date");
            CH_13.setCellValue("Accounting Date / Issue Date");
            CH_14.setCellValue("Bcplink Date");
            CH_15.setCellValue("Invoice");
            CH_16.setCellValue("User");
            CH_17.setCellValue("Reason 1");
            CH_18.setCellValue("Origin");
            CH_19.setCellValue("Area");
            CH_20.setCellValue("Type");
            CH_21.setCellValue("Status");
            CH_22.setCellValue("&nbsp;");
            CH_23.setCellValue("ADM Tracing");

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

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);
            CH_21.setCellStyle(headerStyle);
            CH_22.setCellStyle(headerStyle);
            CH_23.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);
                CH_21 = row.createCell(21);
                CH_22 = row.createCell(22);
                CH_23 = row.createCell(23);

                CH_00.setCellValue("");
                CH_01.setCellValue(listaData.get(vi).A2548TIKET);
                CH_02.setCellValue(listaData.get(vi).A2548NMEMO);
                CH_03.setCellValue(listaData.get(vi).A2548NETO);
                CH_04.setCellValue(listaData.get(vi).A2548IATA);
                CH_05.setCellValue(listaData.get(vi).AGENCY);
                CH_06.setCellValue(listaData.get(vi).A2548MDA);
                CH_07.setCellValue(listaData.get(vi).A2548PAIS);
                CH_08.setCellValue(listaData.get(vi).A2548FTE);
                CH_09.setCellValue(listaData.get(vi).A2548TRNCO);
                CH_10.setCellValue(listaData.get(vi).A2548CODIT);
                CH_11.setCellValue(listaData.get(vi).A2548TRNCU);
                CH_12.setCellValue(listaData.get(vi).A2548FREGI);
                CH_13.setCellValue(listaData.get(vi).A2548FCONT);
                CH_14.setCellValue(listaData.get(vi).A2548FFILE);
                CH_15.setCellValue(listaData.get(vi).A2548NFACT);
                CH_16.setCellValue(listaData.get(vi).A2548REGIS);
                CH_17.setCellValue(listaData.get(vi).A2548DESC1);
                String base = "";
                if (listaData.get(vi).A2548BASE.equals("PR")) {
                    base = "PROCESO REGULAR";
                } else if (listaData.get(vi).A2548BASE.equals("UP")) {
                    base = "UPFRONT";
                } else if (listaData.get(vi).A2548BASE.equals("BK")) {
                    base = "BACKEND";
                } else if (listaData.get(vi).A2548BASE.equals("MS")) {
                    base = "MASSIVE";
                } else if (listaData.get(vi).A2548BASE.equals("QR")) {
                    base = "QUERYS";
                } else if (listaData.get(vi).A2548BASE.equals("PR")) {
                    base = "AUTOMATIC";
                } else if (listaData.get(vi).A2548BASE.equals("MA")) {
                    base = "MANUAL";
                }
                CH_18.setCellValue(base);
                CH_19.setCellValue(listaData.get(vi).A2548AREA);
                CH_20.setCellValue(listaData.get(vi).A2548TYPE);

                String FLAG = "";
                if (listaData.get(vi).A2548FLAG.equals("A")) {
                    FLAG = "Approved";
                }
                if (listaData.get(vi).A2548FLAG.equals("U")) {
                    FLAG = "Cleared Up";
                }
                if (listaData.get(vi).A2548FLAG.equals("X")) {
                    FLAG = "Canceled";
                }
                if (listaData.get(vi).A2548FLAG.equals("C")) {
                    FLAG = "Condoned";
                }
                if (listaData.get(vi).A2548FLAG.equals("I")) {
                    FLAG = "Billed GDS";
                }
                if (listaData.get(vi).A2548FLAG.equals("P")) {
                    FLAG = "Billed";
                }
                if (listaData.get(vi).A2548FLAG.equals("F")) {
                    FLAG = "Accredited";
                }
                if (listaData.get(vi).A2548FLAG.equals("Z")) {
                    FLAG = "Authorized";
                }
                if (listaData.get(vi).A2548FLAG.equals("N")) {
                    FLAG = "Rejected";
                }
                if (listaData.get(vi).A2548FLAG.equals("R")) {
                    FLAG = "Reaudited";
                }
                if (listaData.get(vi).A2548FLAG.equals("J")) {
                    FLAG = "Justified";
                }
                if (listaData.get(vi).A2548FLAG.equals("D")) {
                    FLAG = "Disputed";
                }
                if (listaData.get(vi).A2548FLAG.equals("E")) {
                    FLAG = "Rejecte Disputed";
                }
                if (listaData.get(vi).A2548FLAG.equals("W")) {
                    FLAG = "Approve Disputed";
                }
                if (listaData.get(vi).A2548FLAG.equals("B") && listaData.get(vi).A2548TRNCU.equals("ADMA")) {
                    FLAG = "Adm na BSPlink/MM";
                }
                if (listaData.get(vi).A2548FLAG.equals("B") && !listaData.get(vi).A2548TRNCU.equals("ADMA")) {
                    FLAG = "Acm na BSPlink/MM";
                }
                if (listaData.get(vi).A2548FLAG.equals("O")) {
                    FLAG = "IATA Disabled";
                }
                if (listaData.get(vi).A2548FLAG.equals("Q")) {
                    FLAG = "Unregistered Client";
                }
                if (listaData.get(vi).A2548FLAG.equals("L") && listaData.get(vi).A2548TRNCU.equals("ADMB")) {
                    FLAG = "Adm BSPlink/MM";
                }
                if (listaData.get(vi).A2548FLAG.equals("L") && !listaData.get(vi).A2548TRNCU.equals("ADMB")) {
                    FLAG = "Acm BSPlink/MM";
                }
                if (listaData.get(vi).A2548FLAG.equals("Y")) {
                    FLAG = "Pending";
                }

                CH_21.setCellValue(FLAG);
                CH_22.setCellValue("");
                CH_23.setCellValue("");

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);
                CH_21.setCellStyle(bodyStyle);
                CH_22.setCellStyle(bodyStyle);
                CH_23.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
           // sheet.autoSizeColumn(5, true);
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
           // sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);

            String fileNameDownload = String.format("ADM Report Manual - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "DeleteADMMANUAL")
    public @ResponseBody
    String DeleteADMMANUAL(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00911Filter filter = new SQP00911Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            // Obtain Array
            
            logic = new ADMManualFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.DeleteADMMANUAL(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

}
