/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX019S01A1536Filter;
import net.miatech.beans.ReportEmdDetailsA1530Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.DeliveryFileASRLogic;
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
@RequestMapping("/DeliveryFileASR")
public class DeliveryASRController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DeliveryFileASRLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DeliveryFileASR/form_index";
    }

    @RequestMapping(value = "loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DeliveryFileASR : loadSearch-------------");
        map.put("success", true);
        List<PX019S01A1536Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX019S01A1536Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new DeliveryFileASRLogic();

        List<PX019S01A1536Filter> lst = new ArrayList<>(0);
        PX019S01A1536Filter filter = new PX019S01A1536Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CCUST = request.getParameter("IN_CCUST");
            filter.IN_PRDA = request.getParameter("IN_PRDA");

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

            lst = logic.loadPX019S01A1536(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Delivery File ASR : getFile");

        List<PX019S01A1536Filter> listaData = new ArrayList<>();
        StringBuilder line = new StringBuilder();
        String fileNameDownload = "EMD Detail- " + Functions.getFechaActual() + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        String delim = "\t";
        String texto = "\r\n";

        line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            listaData = this.getList(request, false);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (PX019S01A1536Filter item : listaData) {
                strTexto += item.DELIVERY + delim
                        + "\r\n";

            }
            line.append(strTexto.toString());

            InputStream input = new ByteArrayInputStream(line.toString().getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());

        }

    }
//
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("EMD Detail : getXLSX");
//
//        String fileNameDownload = String.format("EMD Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<ReportEmdDetailsA1530Filter> listaData = this.getList(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("Percent Commission");
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
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            Cell CH1_10 = row.createCell(10);
//            Cell CH1_11 = row.createCell(11);
//            Cell CH1_12 = row.createCell(12);
//            Cell CH1_13 = row.createCell(13);
//            Cell CH1_14 = row.createCell(14);
//            Cell CH1_15 = row.createCell(15);
//            Cell CH1_16 = row.createCell(16);
//            Cell CH1_17 = row.createCell(17);
//            Cell CH1_18 = row.createCell(18);
//            Cell CH1_19 = row.createCell(19);
//            Cell CH1_20 = row.createCell(20);
//            Cell CH1_21 = row.createCell(21);
//            Cell CH1_22 = row.createCell(22);
//            Cell CH1_23 = row.createCell(23);
//            Cell CH1_24 = row.createCell(24);
//            Cell CH1_25 = row.createCell(25);
//            Cell CH1_26 = row.createCell(26);
//            Cell CH1_27 = row.createCell(27);
//
//            CH1_00.setCellValue("Processing Date");
//            CH1_01.setCellValue("Sales Date");
//            CH1_02.setCellValue("Group");
//            CH1_03.setCellValue("Doc Type");
//            CH1_04.setCellValue("Source");
//            CH1_05.setCellValue("Transaction");
//            CH1_06.setCellValue("Agent");
//            CH1_07.setCellValue("Ticket EMD");
//            CH1_08.setCellValue("Service Code");
//            CH1_09.setCellValue("Concept Code");
//            CH1_10.setCellValue("Currency");
//            CH1_11.setCellValue("Amount");
//            CH1_12.setCellValue("ADC");
//            CH1_13.setCellValue("Revenue");
//            CH1_14.setCellValue("Amount  Revenue");
//            CH1_15.setCellValue("Tax");
//            CH1_16.setCellValue("Tax Revenue");
//            CH1_17.setCellValue("Ticket");
//            CH1_18.setCellValue("PNR");
//            CH1_19.setCellValue("ROUTE");
//            CH1_20.setCellValue("FARE BASIS");
//            CH1_21.setCellValue("Fare");
//            CH1_22.setCellValue("IVA");
//            CH1_23.setCellValue("Others Taxes");
//            CH1_24.setCellValue("Commission");
//            CH1_25.setCellValue("Total");
//            CH1_26.setCellValue("Accounting Date");
//            CH1_27.setCellValue("Accounting ID");
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
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
//                Cell rcell5 = row.createCell(5);
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcell10 = row.createCell(10);
//                Cell rcell11 = row.createCell(11);
//                Cell rcell12 = row.createCell(12);
//                Cell rcell13 = row.createCell(13);
//                Cell rcell14 = row.createCell(14);
//                Cell rcell15 = row.createCell(15);
//                Cell rcell16 = row.createCell(16);
//                Cell rcell17 = row.createCell(17);
//                Cell rcell18 = row.createCell(18);
//                Cell rcell19 = row.createCell(19);
//                Cell rcell20 = row.createCell(20);
//                Cell rcell21 = row.createCell(21);
//                Cell rcell22 = row.createCell(22);
//                Cell rcell23 = row.createCell(23);
//                Cell rcell24 = row.createCell(24);
//                Cell rcell25 = row.createCell(25);
//                Cell rcell26 = row.createCell(26);
//                Cell rcell27 = row.createCell(27);
//
//                rcell0.setCellValue(listaData.get(vi).FECPROC);
//                rcell1.setCellValue(listaData.get(vi).FECVTA);
//                rcell2.setCellValue(listaData.get(vi).GRUPO);
//                rcell3.setCellValue(listaData.get(vi).TIPO_DOC);
//                rcell4.setCellValue(listaData.get(vi).Source);
//                rcell5.setCellValue(listaData.get(vi).Transaction);
//                rcell6.setCellValue(listaData.get(vi).Agent);
//                rcell7.setCellValue(listaData.get(vi).NBR_EMD);
//                rcell8.setCellValue(listaData.get(vi).COD_SER);
//                rcell9.setCellValue(listaData.get(vi).Concept);
//                rcell10.setCellValue(listaData.get(vi).Currency);
//                rcell11.setCellValue(listaData.get(vi).Amount);
//                rcell12.setCellValue(listaData.get(vi).ADC);
//                rcell13.setCellValue(listaData.get(vi).ADC_REV);
//                rcell14.setCellValue(listaData.get(vi).IMPORTE_REV);
//                rcell15.setCellValue(listaData.get(vi).Tax);
//                rcell16.setCellValue(listaData.get(vi).Tax_Revenue);
//                rcell17.setCellValue(listaData.get(vi).Aerial_Ticket);
//                rcell18.setCellValue(listaData.get(vi).PNR);
//                rcell19.setCellValue(listaData.get(vi).ROUTE);
//                rcell20.setCellValue(listaData.get(vi).FARE_BASIS);
//                rcell21.setCellValue(listaData.get(vi).Fare);
//                rcell22.setCellValue(listaData.get(vi).IVA);
//                rcell23.setCellValue(listaData.get(vi).others_taxes);
//                rcell24.setCellValue(listaData.get(vi).Total);
//                rcell25.setCellValue(listaData.get(vi).FECCONT);
//                rcell26.setCellValue(listaData.get(vi).ACOUNTID);
//                rcell27.setCellValue(listaData.get(vi).FARE_BASIS);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
////            sheet.autoSizeColumn(0, true);
////            sheet.autoSizeColumn(1, true);
////            sheet.autoSizeColumn(2, true);
////            sheet.autoSizeColumn(3, true);
////            sheet.autoSizeColumn(4, true);
////            sheet.autoSizeColumn(5, true);
////            sheet.autoSizeColumn(6, true);
////            sheet.autoSizeColumn(7, true);
////            sheet.autoSizeColumn(8, true);
////            sheet.autoSizeColumn(9, true);
////            sheet.autoSizeColumn(10, true);
////            sheet.autoSizeColumn(11, true);
////            sheet.autoSizeColumn(12, true);
////            sheet.autoSizeColumn(13, true);
////            sheet.autoSizeColumn(14, true);
////            sheet.autoSizeColumn(15, true);
////            sheet.autoSizeColumn(16, true);
////            sheet.autoSizeColumn(17, true);
////            sheet.autoSizeColumn(18, true);
////            sheet.autoSizeColumn(19, true);
////            sheet.autoSizeColumn(20, true);
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
