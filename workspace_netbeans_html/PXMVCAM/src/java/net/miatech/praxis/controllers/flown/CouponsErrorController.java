/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

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
import net.miatech.beans.A1692Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.screens.FacsimilLogic;
import net.miatech.praxis.logic.flown.CouponsErrorLogic;
import net.miatech.praxis.spring.INF020;
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
@Scope("session")
@RequestMapping("/CouponsError")
public class CouponsErrorController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CouponsErrorLogic logic;
    private MasterDAO masterDAO;
    private HashMap<String, String> hmPaises;
    private HashMap<String, String> hmAeropuertos;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/CouponsError/form_index";
    }

    @RequestMapping(value = "loadData")
    public @ResponseBody
    String loadData(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Load Data : Controller-------------");
        map.put("success", true);

        try {

            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            List<A1007> lstCiudades = masterDAO.loadCiudades();
            List<A006> lstPaises = masterDAO.loadPaises2();
            map.put("dataPaises", lstPaises);
            map.put("dataCiudades", lstCiudades);

        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CouponsError : Controller-------------");
        map.put("success", true);
        List<A1692Filter> listaData = this.getList(request, false);
        System.out.println("Total : " + listaData.size());
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);

    }

    public List<A1692Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new CouponsErrorLogic();
        masterDAO = new MasterDAO();

        List<A1692Filter> lst = new ArrayList<>(0);
        A1692Filter filter = new A1692Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            System.out.println(this.serverSession.getServerSession().toString());
            logic.setSession(this.serverSession.getServerSession());
            masterDAO.setSession(this.serverSession.getServerSession());

            hmPaises = masterDAO.loadPaisesHash();
            hmAeropuertos = masterDAO.loadCiudadesHash();

            filter.PSVVTA = request.getParameter("PSVVTA");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.CARRIVA = request.getParameter("CARRIVA");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");

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
            lst = logic.loadPX091SQP0006(filter, hmPaises, hmAeropuertos);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Coupons Error: getXLSX");

        String fileNameDownload = String.format("Coupons Error - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1692Filter> listaData = this.getList(request, false);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Coupons Error");

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
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);

            CH1_00.setCellValue("Ticket");
            CH1_01.setCellValue("Flight");
            CH1_05.setCellValue("Sale");
            CH1_08.setCellValue("Coupon");

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
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 14));

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);

            CH2_01.setCellValue("Date");
            CH2_02.setCellValue("Number");
            CH2_03.setCellValue("Departure");
            CH2_04.setCellValue("Arrival");
            CH2_05.setCellValue("Date");
            CH2_06.setCellValue("Country");
            CH2_07.setCellValue("Agent");
            CH2_08.setCellValue("Carrier");
            CH2_09.setCellValue("Cabin");
            CH2_10.setCellValue("Value");
            CH2_11.setCellValue("Curr.");
            CH2_12.setCellValue("MXN");
            CH2_13.setCellValue("Rate");
            CH2_14.setCellValue("USD");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);

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

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).strFormatDate);
                rcell2.setCellValue(listaData.get(vi).NFLIGHT);
                rcell3.setCellValue(listaData.get(vi).CDEPART);
                rcell4.setCellValue(listaData.get(vi).CARRIVA);
                rcell5.setCellValue(listaData.get(vi).strFormatFVTA);
                rcell6.setCellValue(listaData.get(vi).PSVVTA);
                rcell7.setCellValue(listaData.get(vi).AGTIA);
                rcell8.setCellValue(listaData.get(vi).CARR);
                rcell9.setCellValue(listaData.get(vi).CABI);
                rcell10.setCellValue(listaData.get(vi).VCPN);
                rcell11.setCellValue(listaData.get(vi).MDACP);
                rcell12.setCellValue(listaData.get(vi).VCPMX);
                rcell13.setCellValue(listaData.get(vi).TCMUS);
                rcell14.setCellValue(listaData.get(vi).VCPUS);

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
//              

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

    @RequestMapping(value = "searchBeanTkt")
    public @ResponseBody
    String searchBeanTkt(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- CouponsError : searchBeanTkt-------------");
        A1692Filter bean;
        String msj;
        map.put("success", true);
        UserView user = this.serverSession.getServerSession().getUserView();
        String strTicket = request.getParameter("strTicket");
        bean = logic.loadPX095S06A1692(strTicket, "00", hmAeropuertos, hmPaises);
        msj = logic.loadPX095S08VALID(user, bean, "Y");

        map.put("beanConsTkt", bean);
        map.put("msjVal", msj);

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchFacsimil")
    public @ResponseBody
    String searchFacsimil(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- CouponsError : searchFacsimil-------------");
        map.put("success", true);    
        
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        UserView user = this.serverSession.getServerSession().getUserView();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        BSPF104 filter = new BSPF104();
        String strFuente = request.getParameter("strFuente");
        
        filter.FUENTE = request.getParameter("FUENTE");
        filter.TDNR = request.getParameter("TDNR");
        filter.CPUI = request.getParameter("CPUI");
        filter.COUNTRY = request.getParameter("COUNTRY");
        filter.HRED = request.getParameter("HRED");
        filter.HRED = request.getParameter("HRED");
         
        try {
            FacsimilLogic logicF = new FacsimilLogic();
            logicF.setSession(this.serverSession.getServerSession());
            if (filter.TDNR.startsWith("139")) {
                if (strFuente.equals("A")) {
                    beanFaximil = logicF.loadARCFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                } else if (strFuente.equals("S")) {
                    beanFaximil = logicF.loadASRFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                } else if (strFuente.equals("B")) {
                    beanFaximil = logicF.loadBSPFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                }
            } else {
                beanFaximil = logicF.loadFacsimileInterlineal(cliente.CCUST, "AM", user, filter, hmAeropuertos);
            }
        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        
        map.put("beanFaximil", beanFaximil);
        return new Gson().toJson(map);
    }  

}
