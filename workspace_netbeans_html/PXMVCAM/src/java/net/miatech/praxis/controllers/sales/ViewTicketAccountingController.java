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
import net.miatech.beans.A1819Filter;
import net.miatech.beans.A1830Filter;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.praxis.logic.sales.AccountingMasterBINESLogic;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.ViewTicketAccountingLogic;
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
@RequestMapping("/ViewTicketAccounting")
public class ViewTicketAccountingController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ViewTicketAccountingLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ViewTicketAccounting/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewTicketAccounting : search-------------");
        String FLAG = "";
        FLAG = request.getParameter("FLAG");
        List<PX0241S01A720Filter> lst = this.getList(request, false);

        if (FLAG.equals("1")) {
            map.put("data", lst);
        } else {
            map.put("data", lst);
        }
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size());
        map.put("success", true);
        return new Gson().toJson(map);
    }

    public List<PX0241S01A720Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ViewTicketAccountingLogic();

        List<PX0241S01A720Filter> lst = new ArrayList<>(0);
        PX0241S01A720Filter filter = new PX0241S01A720Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.AIRLINE = request.getParameter("AIRLINE");
            filter.MODE = request.getParameter("MODE");
            filter.TRANSACTION = request.getParameter("TRANSACTION");
            filter.TKT = request.getParameter("TKT");
            filter.SEQ = request.getParameter("SEQ");
            filter.CUPON1 = request.getParameter("CUPON1");
            filter.CUPON2 = request.getParameter("CUPON2");
            filter.CUPON3 = request.getParameter("CUPON3");
            filter.CUPON4 = request.getParameter("CUPON4");
            filter.FROM = request.getParameter("FROM");
            filter.TO = request.getParameter("TO");
            filter.FUENTE = request.getParameter("FUENTE");
            filter.PAIS = request.getParameter("PAIS");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.STERROR = request.getParameter("STERROR");
            filter.FLAG = request.getParameter("FLAG");
            filter.SEQTRAN = Integer.parseInt(request.getParameter("SEQTRAN"));

//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }

            filter.page.PAGNUM = -1;
            filter.page.TOTPAG = 300;
            filter.page.TOTROW = 300;

            lst = logic.load(filter);

        } catch (Exception e) {
            System.out.println("--->"+e.getMessage());
            throw new SpringException(e);
        }

        return lst;
    }
//
//    @RequestMapping(value = "searchDetail")
//    public @ResponseBody
//    String searchDetail(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- ViewTicketAccounting : searchDetail-------------");
//        map.put("success", true);
//        List<A1881Filter> lst = this.getListDetail(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//
//    }
//
//    public List<A1881Filter> getListDetail(HttpServletRequest request, Boolean bExcel) {
//
//        logic = new ViewTicketAccountingLogic();
//
//        List<A1881Filter> lst = new ArrayList<>(0);
//        A1881Filter filter = new A1881Filter();
//
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//
//        try {
//
//            logic.setSession(this.serverSession.getServerSession());
//
//            filter.IN_A1881CCUST = request.getParameter("IN_A1881CCUST");
//            filter.IN_A1881NFACT = request.getParameter("IN_A1881NFACT");
//            filter.IN_A1881FECHA = request.getParameter("IN_A1881FECHA");
//
//            System.out.println("----------------- Parametros --------------------- ");
//            System.out.println(" limit : " + request.getParameter("limit"));
//            System.out.println(" start : " + request.getParameter("start"));
//            System.out.println("-------------------------------------------------- ");
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lst = logic.setPX159S01A1881(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//
//        return lst;
//    }
    
    /*METODO DONDE SE MUESTRA LA INFORMACION DEL EXCEL  gridData2*/
    @RequestMapping(value = "getXLSX")
    public @ResponseBody            
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //System.out.println("ViewTicketAccounting : getXLSX");
        PX0241S01A720Filter filter = new PX0241S01A720Filter();
        String fileNameDownload = String.format("ViewTicketAccounting- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            
           // Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ViewTicketAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<PX0241S01A720Filter> listaData = logic.load(filter);
            
            
            
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            //List<PX0241S01A720Filter> listaData = this.getList(request, true);
            

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ViewTicketAccounting");

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

//            CH1_00.setCellValue("Ticket");
//            CH1_01.setCellValue("Cupones");
//            CH1_02.setCellValue("TRNCU");
//            CH1_03.setCellValue("Status");
//            CH1_04.setCellValue("Message");
              
            CH1_00.setCellValue("Ticket");
            CH1_01.setCellValue("Cupones");
            CH1_02.setCellValue("TRNCU");
            CH1_03.setCellValue("Status");
            CH1_04.setCellValue("Message");
            

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);

//                rcell0.setCellValue(listaData.get(vi).TDOC);
//                rcell1.setCellValue(listaData.get(vi).TFOR);
//                rcell2.setCellValue(listaData.get(vi).CONCEPT1);
//                rcell3.setCellValue(listaData.get(vi).CONCEPT2);
//                rcell4.setCellValue(listaData.get(vi).CONCEPT3);

                rcell0.setCellValue(listaData.get(vi).TICKET);
                rcell1.setCellValue(listaData.get(vi).CUPONES);
                rcell2.setCellValue(listaData.get(vi).TRNCU);
                rcell3.setCellValue(listaData.get(vi).ESTADO);
                rcell4.setCellValue(listaData.get(vi).MENSAJETKT);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);           

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
    
     
    /*METODO DONDE SE MUESTRA LA INFORMACION DEL EXCEL  gridData*/
    @RequestMapping(value = "getDetailXLSX")
    public @ResponseBody            
    void getDetailXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //System.out.println("ViewTicketAccounting : getXLSX");
        PX0241S01A720Filter filter = new PX0241S01A720Filter();
        String fileNameDownload = String.format("ViewTicketAccounting- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            
           // Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ViewTicketAccountingLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<PX0241S01A720Filter> listaData = logic.load(filter);
            
            
            
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            //List<PX0241S01A720Filter> listaData = this.getList(request, true);
            

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ViewTicketAccounting");

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
            Cell CH1_15 = row.createCell(15);
            Cell CH1_16 = row.createCell(16);
            Cell CH1_17 = row.createCell(17);
            Cell CH1_18 = row.createCell(18);
            Cell CH1_19 = row.createCell(19);
            Cell CH1_20 = row.createCell(20);
            Cell CH1_21 = row.createCell(21);
            Cell CH1_22 = row.createCell(22);
            Cell CH1_23 = row.createCell(23);
            Cell CH1_24 = row.createCell(24);
            Cell CH1_25 = row.createCell(25);
            Cell CH1_26 = row.createCell(26);
            Cell CH1_27 = row.createCell(27);
            Cell CH1_28 = row.createCell(28);
            Cell CH1_29 = row.createCell(29);
            Cell CH1_30 = row.createCell(30);
            Cell CH1_31 = row.createCell(31);
            Cell CH1_32 = row.createCell(32);
            Cell CH1_33 = row.createCell(33);
            Cell CH1_34 = row.createCell(34);
            Cell CH1_35 = row.createCell(35);
            Cell CH1_36 = row.createCell(36);
            Cell CH1_37 = row.createCell(37);
            Cell CH1_38 = row.createCell(38);
            Cell CH1_39 = row.createCell(39);
            Cell CH1_40 = row.createCell(40);
            Cell CH1_41 = row.createCell(41);
            Cell CH1_42 = row.createCell(42);
            Cell CH1_43 = row.createCell(43);
            Cell CH1_44 = row.createCell(44);


//            CH1_00.setCellValue("Ticket");
//            CH1_01.setCellValue("Cupones");
//            CH1_02.setCellValue("TRNCU");
//            CH1_03.setCellValue("Status");
//            CH1_04.setCellValue("Message");
            CH1_00.setCellValue("TDOC");
            CH1_01.setCellValue("TFOR");
            CH1_02.setCellValue("C1");
            CH1_03.setCellValue("C2");
            CH1_04.setCellValue("C3");
            CH1_05.setCellValue("Card");
            CH1_06.setCellValue("Nbr Card");
            CH1_07.setCellValue("RFIC");
            CH1_08.setCellValue("RFIS");
            CH1_09.setCellValue("Debit Loc");
            CH1_10.setCellValue("Debit Loc");
            CH1_11.setCellValue("Debit Rev");
            CH1_12.setCellValue("Credit Rev");
            CH1_13.setCellValue("IVA");
            CH1_14.setCellValue("FOP IVA");
            CH1_15.setCellValue("F.OPEN");
            CH1_16.setCellValue("VRIC");
            CH1_17.setCellValue("PFC");
            CH1_18.setCellValue("IATAVTA");
            CH1_19.setCellValue("FECUSO");
            CH1_20.setCellValue("CTA");
            CH1_21.setCellValue("LIB1");
            CH1_22.setCellValue("CIA1");
            CH1_23.setCellValue("CLIENTE");
            CH1_24.setCellValue("DIRECCION");
            CH1_25.setCellValue("PROVEEDOR");
            CH1_26.setCellValue("TD_ORACLE");
            CH1_27.setCellValue("COMB");
            CH1_28.setCellValue("TITULO");
            CH1_29.setCellValue("SUCURSAL");
            CH1_30.setCellValue("CTACTRL");
            CH1_31.setCellValue("TITULOCTRL");
            CH1_32.setCellValue("LIBCTRL");
            CH1_33.setCellValue("CTAPROVEE");
            CH1_34.setCellValue("TITULOPROVEE");
            CH1_35.setCellValue("L.PRO");
            CH1_36.setCellValue("LCTACTRLPROVEEPRO");
            CH1_37.setCellValue("TITULOCTRLPROVEE");
            CH1_38.setCellValue("L.P.CTRL");
            CH1_39.setCellValue("CTAARPROVEE");
            CH1_40.setCellValue("TITULOARPROVEE");
            CH1_41.setCellValue("L.AR");
            CH1_42.setCellValue("CLI. AR06");
            CH1_43.setCellValue("DIR. AR06");            
            CH1_44.setCellValue("TD. AR06");
            

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
            CH1_31.setCellStyle(headerStyle);
            CH1_32.setCellStyle(headerStyle);
            CH1_33.setCellStyle(headerStyle);
            CH1_34.setCellStyle(headerStyle);
            CH1_35.setCellStyle(headerStyle);
            CH1_36.setCellStyle(headerStyle);
            CH1_37.setCellStyle(headerStyle);
            CH1_38.setCellStyle(headerStyle);
            CH1_39.setCellStyle(headerStyle);
            CH1_40.setCellStyle(headerStyle);
            CH1_41.setCellStyle(headerStyle);
            CH1_42.setCellStyle(headerStyle);
            CH1_43.setCellStyle(headerStyle);
            CH1_44.setCellStyle(headerStyle);
            
           
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
                Cell rcel20 = row.createCell(10);
                Cell rcel21 = row.createCell(11);
                Cell rcel22 = row.createCell(12);
                Cell rcel23 = row.createCell(13);
                Cell rcel24 = row.createCell(14);
                Cell rcel25 = row.createCell(15);
                Cell rcel26 = row.createCell(16);
                Cell rcel27 = row.createCell(17);
                Cell rcel28 = row.createCell(18);
                Cell rcel29 = row.createCell(19);
                Cell rcel30 = row.createCell(20);
                Cell rcel31 = row.createCell(21);
                Cell rcel32 = row.createCell(22);
                Cell rcel33 = row.createCell(23);
                Cell rcel34 = row.createCell(24);
                Cell rcel35 = row.createCell(25);
                Cell rcel36 = row.createCell(26);
                Cell rcel37 = row.createCell(27);
                Cell rcel38 = row.createCell(28);
                Cell rcel39 = row.createCell(29);
                Cell rcel40 = row.createCell(30);
                Cell rcel41 = row.createCell(31);
                Cell rcel42 = row.createCell(32);
                Cell rcel43 = row.createCell(33);
                Cell rcel44 = row.createCell(34);
                Cell rcel45 = row.createCell(35);
                Cell rcel46 = row.createCell(36);
                Cell rcel47 = row.createCell(37);
                Cell rcel48 = row.createCell(38);
                Cell rcel49 = row.createCell(39);
                Cell rcel50 = row.createCell(40);
                Cell rcel51 = row.createCell(41);
                Cell rcel52 = row.createCell(42);
                Cell rcel53 = row.createCell(43);
                Cell rcel54 = row.createCell(44);
                
                
                
                

                rcell0.setCellValue(listaData.get(vi).TDOC);
                rcell1.setCellValue(listaData.get(vi).TFOR);
                rcell2.setCellValue(listaData.get(vi).CONCEPT1);
                rcell3.setCellValue(listaData.get(vi).CONCEPT2);
                rcell4.setCellValue(listaData.get(vi).CONCEPT3);
                rcell5.setCellValue(listaData.get(vi).TTARJ);
                rcell6.setCellValue(listaData.get(vi).NTARJ);
                rcell7.setCellValue(listaData.get(vi).RFIC);               
                rcell8.setCellValue(listaData.get(vi).RFIS);
                rcell9.setCellValue(listaData.get(vi).DEBITO);
                rcel20.setCellValue(listaData.get(vi).CREDITO);
                rcel21.setCellValue(listaData.get(vi).DEBITORV);
                rcel22.setCellValue(listaData.get(vi).CREDITORV);
                rcel23.setCellValue(listaData.get(vi).TASA);
                rcel24.setCellValue(listaData.get(vi).FOP_IVA);
                
                rcel25.setCellValue(listaData.get(vi).FOPEN);
                rcel26.setCellValue(listaData.get(vi).VRIC);
                rcel27.setCellValue(listaData.get(vi).PFC);
                rcel28.setCellValue(listaData.get(vi).IATAVTA);
                rcel29.setCellValue(listaData.get(vi).FECUSO);
                rcel30.setCellValue(listaData.get(vi).CTA);
                rcel31.setCellValue(listaData.get(vi).LIB1);
                rcel32.setCellValue(listaData.get(vi).CIA1);
                rcel33.setCellValue(listaData.get(vi).CLIENTE);
                rcel34.setCellValue(listaData.get(vi).DIRECCION);
                rcel35.setCellValue(listaData.get(vi).PROVEEDOR);
                rcel36.setCellValue(listaData.get(vi).TD_ORACLE);
                rcel37.setCellValue(listaData.get(vi).COMB);
                rcel38.setCellValue(listaData.get(vi).TITULO);
                rcel39.setCellValue(listaData.get(vi).SUCURSAL);
                rcel40.setCellValue(listaData.get(vi).CTACTRL);
                rcel41.setCellValue(listaData.get(vi).TITULOCTRL);
                rcel42.setCellValue(listaData.get(vi).LIBCTRL);
                rcel43.setCellValue(listaData.get(vi).CTAPROVEE);
                rcel44.setCellValue(listaData.get(vi).TITULOPROVEE);
                rcel45.setCellValue(listaData.get(vi).LIBPROVEE);
                rcel46.setCellValue(listaData.get(vi).CTACTRLPROVEE);
                rcel47.setCellValue(listaData.get(vi).TITULOCTRLPROVEE);
                rcel48.setCellValue(listaData.get(vi).LIBCTRLPROVEE);
                rcel49.setCellValue(listaData.get(vi).CTAARPROVEE);
                rcel50.setCellValue(listaData.get(vi).TITULOARPROVEE);
                rcel51.setCellValue(listaData.get(vi).LIBARPROVEE);
                rcel52.setCellValue(listaData.get(vi).CLIENTEAR06);
                rcel53.setCellValue(listaData.get(vi).DIRECCIONAR06);
                rcel54.setCellValue(listaData.get(vi).TD_ORACLEAR06);
                
                

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
                rcel20.setCellStyle(bodyStyle);
                rcel21.setCellStyle(bodyStyle);
                rcel22.setCellStyle(bodyStyle);
                rcel23.setCellStyle(bodyStyle);
                rcel24.setCellStyle(bodyStyle);
                rcel25.setCellStyle(bodyStyle);
                rcel26.setCellStyle(bodyStyle);
                rcel27.setCellStyle(bodyStyle);
                rcel28.setCellStyle(bodyStyle);
                rcel29.setCellStyle(bodyStyle);
                rcel30.setCellStyle(bodyStyle);
                rcel31.setCellStyle(bodyStyle);
                rcel32.setCellStyle(bodyStyle);
                rcel33.setCellStyle(bodyStyle);
                rcel34.setCellStyle(bodyStyle);
                rcel35.setCellStyle(bodyStyle);
                rcel36.setCellStyle(bodyStyle);
                rcel37.setCellStyle(bodyStyle);
                rcel38.setCellStyle(bodyStyle);
                rcel39.setCellStyle(bodyStyle);
                rcel40.setCellStyle(bodyStyle);
                rcel41.setCellStyle(bodyStyle);
                rcel42.setCellStyle(bodyStyle);
                rcel43.setCellStyle(bodyStyle);
                rcel44.setCellStyle(bodyStyle);
                rcel45.setCellStyle(bodyStyle);
                rcel46.setCellStyle(bodyStyle);
                rcel47.setCellStyle(bodyStyle);
                rcel48.setCellStyle(bodyStyle);
                rcel49.setCellStyle(bodyStyle);
                rcel50.setCellStyle(bodyStyle);
                rcel51.setCellStyle(bodyStyle);
                rcel52.setCellStyle(bodyStyle);
                rcel53.setCellStyle(bodyStyle);
                rcel54.setCellStyle(bodyStyle);
               
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
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);
            sheet.autoSizeColumn(39, true);
            sheet.autoSizeColumn(40, true);
            sheet.autoSizeColumn(41, true);
            sheet.autoSizeColumn(42, true);
            sheet.autoSizeColumn(43, true);
            sheet.autoSizeColumn(44, true);
            

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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    @RequestMapping(value = "getDetailXLSX")
//    public @ResponseBody            
//    void getDetailXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("ViewTicketAccounting : getDetailXLSX");
//
//        String fileNameDownload = String.format("ViewTicketAccounting- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A1881Filter> listaData = this.getListDetail(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("ViewTicketAccounting");
//
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
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
//
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
//
//            // ====== CREANDO TITULOS ======================================
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);           
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Proccess Date");
//            CH1_02.setCellValue("Operative Unit");
//            CH1_03.setCellValue("Type");
//            CH1_04.setCellValue("Suplier N°");
//                      
//            
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//           
//
//            //          ========================================================
//            ++vj;
//            while (iter.hasNext()) {
//
//                row = sheet.createRow(vj);
//                Cell rcell0 = row.createCell(0);
//                Cell rcell1 = row.createCell(1);
//                Cell rcell2 = row.createCell(2);
//                Cell rcell3 = row.createCell(3);
//                Cell rcell4 = row.createCell(4);
//               
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).A1881CUENT);
//                rcell2.setCellValue(listaData.get(vi).A1881DESCR);
//                rcell3.setCellValue(listaData.get(vi).A1881ACTIV);
//                rcell4.setCellValue(listaData.get(vi).A1881PASIV);
//               
//                rcell0.setCellStyle(bodyStyle);
//                rcell1.setCellStyle(bodyStyle);
//                rcell2.setCellStyle(bodyStyle);
//                rcell3.setCellStyle(bodyStyle);
//                rcell4.setCellStyle(bodyStyle);
//               
//
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
//          
//            /**
//             * fileNameDownload = Nombre de descarga
//             */
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
//
//    }

}
