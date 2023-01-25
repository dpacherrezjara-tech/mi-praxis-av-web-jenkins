/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import net.miatech.praxis.controllers.flown.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.PX019S01A004Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00801Filter;
import net.miatech.beans.SQP00802Filter;
import net.miatech.beans.SQP00804Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.libmiatec.A722;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
import net.miatech.praxis.logic.sales.FptfAirlineLogic;
import net.miatech.praxis.logic.sales.FptfBestPracticeLogic;
import net.miatech.praxis.logic.sales.InvoiceCommissionConsortiaLogic;
import net.miatech.praxis.logic.sales.InvoiceCommissionConsortiaLogic;
import net.miatech.praxis.logic.sales.ProvisosTextLogic;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/InvoiceCommissionConsortia")
public class InvoiceCommissionConsortiaController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private InvoiceCommissionConsortiaLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/InvoiceCommissionConsortia/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        //System.out.println("-------------- InvoiceCommissionConsortia : Search-------------");
        map.put("success", true);
        List<SQP00801Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00801Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new InvoiceCommissionConsortiaLogic();

        List<SQP00801Filter> lst = new ArrayList<>(0);
        SQP00801Filter filter = new SQP00801Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_A2447CCUST = request.getParameter("VP_A2447CCUST");
            filter.VP_A2447FFACT = request.getParameter("VP_A2447FFACT");
            filter.VP_A2447IATA = request.getParameter("VP_A2447IATA");
            filter.VP_A2447LOTE = request.getParameter("VP_A2447LOTE");

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
            lst = logic.loadPX112S01A1757(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "validarCodigoIATA")
    public @ResponseBody
    String validarCodigoIATA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- searchByCode : validarCodigoIATA-------------");

        logic = new InvoiceCommissionConsortiaLogic();
        map.put("success", true);
        String VP_OPTION;
        String VP_PARAM;
        String result;
        try {
            logic.setSession(this.serverSession.getServerSession());
            VP_OPTION = request.getParameter("VP_OPTION");
            VP_PARAM = request.getParameter("VP_PARAM");
            System.out.println("VP_OPTION -> " + VP_OPTION);
            System.out.println("VP_PARAM -> " + VP_PARAM);
            result = logic.get_PX112S03A1757(VP_OPTION, VP_PARAM);
            if (result == null) {
                result = "";
            }

        } catch (Exception e) {
            result = "";
            System.out.println("--> " + e.getMessage());
            throw new SpringException(e);
        }
        map.put("result", result);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- searchByCode : mantenimiento-------------");
        SQP00802Filter filter = new SQP00802Filter();
        SQP00802Filter objRtn;
        logic = new InvoiceCommissionConsortiaLogic();
        map.put("success", true);

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.VP_A2447CCUST = request.getParameter("VP_A2447CCUST");
            filter.VP_A2447LOTE = request.getParameter("VP_A2447LOTE");
            filter.VP_A2447IATA = request.getParameter("VP_A2447IATA");
            filter.VP_A2447FPROC = request.getParameter("VP_A2447FPROC");
            filter.VP_A2447MONED = request.getParameter("VP_A2447MONED");
            filter.VP_A2447COMM = Double.parseDouble(request.getParameter("VP_A2447COMM"));
            filter.VP_A2447IVA = Double.parseDouble(request.getParameter("VP_A2447IVA"));
            filter.VP_A2447COMIV = Double.parseDouble(request.getParameter("VP_A2447COMIV"));
            filter.VP_A2447TCASH = Double.parseDouble(request.getParameter("VP_A2447TCASH"));
            filter.VP_A2447CAMCO = Double.parseDouble(request.getParameter("VP_A2447CAMCO"));
            filter.VP_A2447NFACT = request.getParameter("VP_A2447NFACT");
            filter.VP_A2447FFACT = request.getParameter("VP_A2447FFACT");
            filter.VP_A2447STATU = request.getParameter("VP_A2447STATU");
            filter.VP_A2447SEQ = request.getParameter("VP_A2447SEQ");
            filter.VP_A2447INDAP = request.getParameter("VP_A2447INDAP");
            filter.VP_A2447COD = request.getParameter("VP_A2447COD");
            filter.VP_A2447COMBA = Double.parseDouble(request.getParameter("VP_A2447COMBA"));
            filter.VP_A2447IVACB = Double.parseDouble(request.getParameter("VP_A2447IVACB"));
            /*filter.VP_A2447COD2 = request.getParameter("VP_A2447COD2");
            filter.VP_A2447COMB2 = Double.parseDouble(request.getParameter("VP_A2447COMB2"));
            filter.VP_A2447IVAC2 = Double.parseDouble(request.getParameter("VP_A2447IVAC2"));
            filter.VP_A2447NFAC1 = request.getParameter("VP_A2447NFAC1");
            filter.VP_A2447FFAC1 = request.getParameter("VP_A2447FFAC1");
            filter.VP_A2447NFAC2 = request.getParameter("VP_A2447NFAC2");
            filter.VP_A2447FFAC2 = request.getParameter("VP_A2447FFAC2");*/
            objRtn = logic.setPX112S02A1757(filter);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("objRtn", objRtn);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Percent Commission : getXLSX");

        String fileNameDownload = String.format("Percent Commission - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SQP00801Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Percent Commission");

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

            CH1_00.setCellValue("IATA");
            CH1_01.setCellValue("IATA Name");
            CH1_02.setCellValue("Invoice Number");
            CH1_03.setCellValue("Invoice Date");
            CH1_04.setCellValue("Currency");
            CH1_05.setCellValue("Commission");
            CH1_06.setCellValue("IVA");
            CH1_07.setCellValue("Commission+IVA");
            CH1_08.setCellValue("Total Cash");
            CH1_09.setCellValue("Total Cash - Commision");
            CH1_10.setCellValue("App.");
            CH1_11.setCellValue("Acc.");

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

                rcell0.setCellValue(listaData.get(vi).A2447IATA);
                rcell1.setCellValue(listaData.get(vi).A003KEY3);
                rcell2.setCellValue(listaData.get(vi).A2447NFACT);
                rcell3.setCellValue(listaData.get(vi).A2447FFACT);
                rcell4.setCellValue(listaData.get(vi).A2447MONED);
                rcell5.setCellValue(listaData.get(vi).A2447COMM);
                rcell6.setCellValue(listaData.get(vi).A2447IVA);
                rcell7.setCellValue(listaData.get(vi).A2447COMIV);
                rcell8.setCellValue(listaData.get(vi).A2447TCASH);
                rcell9.setCellValue(listaData.get(vi).A2447CAMCO);
                rcell10.setCellValue(listaData.get(vi).A2447INDAP);
                rcell11.setCellValue(listaData.get(vi).A2447INDCO);

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
    //    NEW. VH
    @RequestMapping(value = "getTotalPreFact")
    public @ResponseBody
    String getTotalPreFact(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- Invoice Commission FOB : mantenimiento-------------");
        SQP00804Filter filter = new SQP00804Filter();        
        List<SQP00804Filter> objRtn = new ArrayList<>(0);
        logic = new InvoiceCommissionConsortiaLogic();
        map.put("success", true);
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_A2444CCUST = request.getParameter("VP_A1728CCUST");
            filter.VP_A2444IATA = request.getParameter("VP_A1728IATA");
            filter.VP_A2444LOTE = request.getParameter("VP_A1728LOTE");
            objRtn = logic.loadPX112S01A1728(filter);

        } catch (Exception e) {
            map.put("success", false);
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("objRtn", objRtn);        
        return new Gson().toJson(map);
        
    }
    
    // NEW JDMM
    @RequestMapping(value = "/setData", method = RequestMethod.POST)
    public @ResponseBody
    String setData(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP00802Filter filter = new SQP00802Filter();
        ArrayList<SQP00802Filter> lstData = new ArrayList<SQP00802Filter>(0);
        SQP00802Filter param;
        Integer cont = 0;
        String mensaje;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new InvoiceCommissionConsortiaLogic();
            logic.setSession(this.serverSession.getServerSession());
            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //HSSFCell cell;
            while (iterator.hasNext()) {
                param = new SQP00802Filter();
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {
                    if (sheet.getCell(0) != null) {
                        // Antes----> IATA CODE|INVOICE NUMBER|INVOICE DATE|BATCH NUMBER|INVOICE APLICATION|COMMISSION|IVA|STATUS
                        // Ahora----> CONCEPTO|IATA CODE|INVOICE NUMBER|INVOICE DATE|BATCH NUMBER|INVOICE APLICATION|COMMISSION|IVA|STATUS
                        param.VP_ACTION     = filter.VP_ACTION;
                        param.VP_A2447CCUST = filter.VP_A2447CCUST;
                        param.VP_A2447COD  = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();
                        param.VP_A2447LOTE  = sheet.getCell(4)== null ? "" : sheet.getCell(4).toString();
                        param.VP_A2447IATA  = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();
                        param.VP_A2447COMM  = sheet.getCell(6)== null ? 0 : Double.parseDouble(sheet.getCell(6).toString());//tiene que ser igual a A2444TCOM
                        param.VP_A2447IVA   = sheet.getCell(7)== null ? 0 : Double.parseDouble(sheet.getCell(7).toString());//tiene que ser igual a A2444TIVA
                        param.VP_A2447NFACT = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();
                        param.VP_A2447FFACT = sheet.getCell(3)== null ? "" : sheet.getCell(3).toString();//no menor a la fecha actual
                        param.VP_A2447STATU = sheet.getCell(8)== null ? "" : sheet.getCell(8).toString();
                        param.VP_A2447SEQ   = cont.toString();
                        param.VP_A2447INDAP = sheet.getCell(5)== null ? "" : sheet.getCell(5).toString();
                        lstData.add(param);
                    }
                }
            }
            mensaje = logic.subirExcel(lstData, filename);
            map.put("success", true);
            map.put("SQLCODE", "1");
            if(mensaje.equals("Operation was successful!")){
                map.put("SQLCODE", "0");
            }
            map.put("MESSAGE", mensaje);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
   
}
