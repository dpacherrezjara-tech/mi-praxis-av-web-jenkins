package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.PX116S01A1738Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.logic.sales.InplantCommissionsLogic;

import net.miatech.praxis.exceptions.SpringException;
import java.sql.SQLException;
import com.google.gson.Gson;
import java.io.File;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import net.miatech.beans.PX116S02A1710Filter;
import net.miatech.beans.PX116S03A1738Filter;


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


import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.SalesReportLogic;
import org.json.JSONArray;


// </editor-fold>
/**
 *
 * @author gsanchez
 * @update jbazan
 */
@Controller
@Scope("request")
@RequestMapping("/InplantCommissions")
public class InplantCommissionsController extends BaseController {

    private InplantCommissionsLogic logic;
    private PX116S01A1738Filter filter;
    private MasterDAO masterDAO;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    @RequestMapping(value = "/loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        List<PX116S01A1738Filter> listaData;
        filter = new PX116S01A1738Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_CUPON = request.getParameter("IN_CUPON").trim();
            filter.IN_NLOTE = request.getParameter("IN_NLOTE").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new InplantCommissionsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX116S01A1738(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Consortia : getXLSX");

        String fileNameDownload = String.format(Functions.getFechaActual()+"-Inplant-Commissions" + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        
        List<PX116S01A1738Filter> listaData = new ArrayList<>(0);
        filter = new PX116S01A1738Filter();
        filter.page.TOTROW = -1;
        filter.page.START = -1;
        filter.page.LIMIT = -1;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = -1;
        try {
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_CUPON = request.getParameter("IN_CUPON").trim();
            filter.IN_NLOTE = request.getParameter("IN_NLOTE").trim();
            
            //int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            //filter.page.PAGROW = -1;
            //filter.page.PAGNUM = -1;
            
            logic = new InplantCommissionsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX116S01A1738(filter);
            
            
        } catch (NumberFormatException | SQLException ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        
        
        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            

            //System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Consortia");

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

            CH1_00.setCellValue("Cia");
            CH1_01.setCellValue("Document");
            CH1_02.setCellValue("Cpn");
            CH1_03.setCellValue("Seq");
            CH1_04.setCellValue("ID Lote");
            CH1_05.setCellValue("Transaction");
            CH1_06.setCellValue("Issue Date");
            CH1_07.setCellValue("Sector");
            CH1_08.setCellValue("Flight Number");
            CH1_09.setCellValue("Carrier");
            CH1_10.setCellValue("Class");
            CH1_11.setCellValue("Fare Basis");
            CH1_12.setCellValue("Ticket Designator");
            CH1_13.setCellValue("Coupon Value");
            CH1_14.setCellValue("Currency");
            CH1_15.setCellValue("ADC Amount");
            CH1_16.setCellValue("Tour Code");
            CH1_17.setCellValue("IATA Code");
            CH1_18.setCellValue("Passenger Name");
            CH1_19.setCellValue("FOP");
            CH1_20.setCellValue("Credit Card");
            CH1_21.setCellValue("Used Type");
            CH1_22.setCellValue("Used Date");
            CH1_23.setCellValue("Group Status");
            CH1_24.setCellValue("Sale Status");
            CH1_25.setCellValue("Error Description");
            

            /*sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));*/

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
            /*CH1_26.setCellStyle(headerStyle);
            CH1_27.setCellStyle(headerStyle);
            CH1_28.setCellStyle(headerStyle);
            CH1_29.setCellStyle(headerStyle);*/

            /*++vj;
            row = sheet.createRow(vj);

            Cell CH2_00 = row.createCell(0);
            Cell CH2_01 = row.createCell(1);
            Cell CH2_02 = row.createCell(2);
            Cell CH2_03 = row.createCell(3);
            Cell CH2_04 = row.createCell(4);
            Cell CH2_05 = row.createCell(5);
            Cell CH2_06 = row.createCell(6);
            Cell CH2_07 = row.createCell(7);
            Cell CH2_08 = row.createCell(8);
            Cell CH2_09 = row.createCell(9);
            Cell CH2_10 = row.createCell(10);
            Cell CH2_11 = row.createCell(11);
            Cell CH2_12 = row.createCell(12);
            Cell CH2_13 = row.createCell(13);
            Cell CH2_14 = row.createCell(14);
            Cell CH2_15 = row.createCell(15);
            Cell CH2_16 = row.createCell(16);
            Cell CH2_17 = row.createCell(17);
            Cell CH2_18 = row.createCell(18);
            Cell CH2_19 = row.createCell(19);
            Cell CH2_20 = row.createCell(20);
            Cell CH2_21 = row.createCell(21);
            Cell CH2_22 = row.createCell(22);
            Cell CH2_23 = row.createCell(23);
            Cell CH2_24 = row.createCell(24);
            Cell CH2_25 = row.createCell(25);
            Cell CH2_26 = row.createCell(26);
            Cell CH2_27 = row.createCell(27);
            Cell CH2_28 = row.createCell(28);
            Cell CH2_29 = row.createCell(29);

            CH2_11.setCellValue("Status");
            CH2_12.setCellValue("Date");
            CH2_14.setCellValue("App.");
            CH2_15.setCellValue("Status");
            CH2_16.setCellValue("Date");
            CH2_17.setCellValue("Accountign");

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
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);*/

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

                rcell0.setCellValue(listaData.get(vi).A1738CIA);
                rcell1.setCellValue(listaData.get(vi).DOCUMENT);
                rcell2.setCellValue(listaData.get(vi).A1738CUPON);
                rcell3.setCellValue(listaData.get(vi).A1738CORRL);
                rcell4.setCellValue(listaData.get(vi).A1738NLOTE);
                rcell5.setCellValue(listaData.get(vi).A1738TRNCU);
                rcell6.setCellValue(listaData.get(vi).A1738FVTA);
                rcell7.setCellValue(listaData.get(vi).A720RUTA);
                rcell8.setCellValue(listaData.get(vi).A1738NVLO);
                rcell9.setCellValue(listaData.get(vi).A1738CARR);
                rcell10.setCellValue(listaData.get(vi).A1738CLAS);
                rcell11.setCellValue(listaData.get(vi).A1738FBAS);
                rcell12.setCellValue(listaData.get(vi).A1738DESIG);
                rcell13.setCellValue(listaData.get(vi).A1738VCPLC);
                rcell14.setCellValue(listaData.get(vi).A1738MDALC);
                rcell15.setCellValue(listaData.get(vi).A1738ADC);
                rcell16.setCellValue(listaData.get(vi).A1738TOUR);
                rcell17.setCellValue(listaData.get(vi).A1738IATA);
                rcell18.setCellValue(listaData.get(vi).A1738PAX);
                rcell19.setCellValue(listaData.get(vi).A1738FOP);
                rcell20.setCellValue(listaData.get(vi).A1738NTARJ);
                rcell21.setCellValue(listaData.get(vi).A1738TCRUC);
                rcell22.setCellValue(listaData.get(vi).A1738FCRUC);
                rcell23.setCellValue(listaData.get(vi).A1738STPRO);
                rcell24.setCellValue(listaData.get(vi).A1738STVTA);
                rcell25.setCellValue(listaData.get(vi).A1738ERROR);

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
    
    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Inplant Report : getFile");

        
        List<PX116S01A1738Filter> listaData = new ArrayList<>(0);
        filter = new PX116S01A1738Filter();
        filter.page.TOTROW = -1;
        filter.page.START = -1;
        filter.page.LIMIT = -1;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = -1;
        try {
            filter.IN_CIA = request.getParameter("IN_CIA").trim();
            filter.IN_FORMA = request.getParameter("IN_FORMA").trim();
            filter.IN_SERIE = request.getParameter("IN_SERIE").trim();
            filter.IN_CUPON = request.getParameter("IN_CUPON").trim();
            filter.IN_NLOTE = request.getParameter("IN_NLOTE").trim();
            
            //int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            //filter.page.PAGROW = -1;
            //filter.page.PAGNUM = -1;
            
            logic = new InplantCommissionsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX116S01A1738(filter);
            
            
        } catch (NumberFormatException | SQLException ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        
        StringBuilder line = new StringBuilder();
        String fileNameDownload = Functions.getFechaActual()+"-Inplant-Commissions" + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        //String delim = "\t";
        String delim = ";";
        String texto = "Cia" + delim
                + "Document" + delim
                + "Cpn" + delim
                + "Seq" + delim
                + "ID Lote" + delim
                + "Transaction" + delim
                + "Issue Date" + delim
                + "Sector" + delim
                + "Flight Number" + delim
                + "Carrier" + delim
                + "Class" + delim
                + "Fare Basis" + delim
                
                + "Ticket Designator" + delim
                + "Coupon Value" + delim
                + "Currency" + delim
                + "ADC Amount" + delim
                + "Tour Code" + delim
                + "IATA Code" + delim
                + "Passenger Name" + delim
                + "FOP" + delim
                + "Credit Card" + delim
                + "Used Type" + delim
                + "Used Date" + delim
                + "Group Status" + delim
                + "Sale Status" + delim
                + "Error Description" + delim
                + "\r\n";

        line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            //listaData = this.getListTicket(request, true);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (PX116S01A1738Filter item : listaData) {
                strTexto += item.A1738CIA + delim
                        + item.DOCUMENT + delim
                        + item.A1738CUPON + delim
                        + item.A1738CORRL + delim
                        + item.A1738NLOTE + delim
                        + item.A1738TRNCU + delim
                        + item.A1738FVTA + delim
                        + item.A720RUTA + delim
                        + item.A1738NVLO + delim
                        + item.A1738CARR + delim
                        + item.A1738CLAS + delim
                        + item.A1738FBAS + delim
                        + item.A1738DESIG + delim
                        
                        + item.A1738VCPLC + delim
                        + item.A1738MDALC + delim
                        + item.A1738ADC + delim
                        + item.A1738TOUR + delim
                        + item.A1738IATA + delim
                        + item.A1738PAX + delim
                        + item.A1738FOP + delim
                        + item.A1738NTARJ + delim
                        + item.A1738TCRUC + delim
                        + item.A1738FCRUC + delim
                        + item.A1738STPRO + delim
                        + item.A1738STVTA + delim
                        + item.A1738ERROR + delim
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
    @RequestMapping(value = "upload_file", method = RequestMethod.POST)
    public @ResponseBody
    String upload_file(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        PX116S02A1710Filter filter = new PX116S02A1710Filter();
        PX116S03A1738Filter filter_tkt = new PX116S03A1738Filter();
        
        String mensaje = "";
        Integer cont = 0;
        
        InplantCommissionsLogic logic = new InplantCommissionsLogic();
        try {
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX116S02A1710();
        } catch(SQLException e) {
             logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            //DecimalFormat formatter = new DecimalFormat(".##");
            //formatter.setRoundingMode(RoundingMode.HALF_UP);
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            //HSSFCell cell;
            long SLOTE = 0;
            String cadena ="";
            while (iterator.hasNext()) {
                filter_tkt = new PX116S03A1738Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                //if (cont > 1) {
                    if (currentRow.getCell(0) != null) {
                        SLOTE++;
                        cadena=currentRow.getCell(0).toString();
                        String[] parts = cadena.split(",");
                        filter_tkt.IN_CIA = parts[0];
                        filter_tkt.IN_FORMA = parts[1];
                        filter_tkt.IN_SERIE = parts[2];
                        filter_tkt.IN_NLOTE = filter.OU_NLOTE;
                        filter_tkt.IN_SLOTE = SLOTE;
                        //obteniendo el TKT
                        filter_tkt = logic.loadPX116S03A1738(filter_tkt);
                    }
                //}
            }
            
            map.put("success", true);
            map.put("result", mensaje);
            map.put("NLOTE", filter.OU_NLOTE);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("NLOTE", "");
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("NLOTE", "");
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "/upload_file2"/*, method = RequestMethod.POST*/)
    public @ResponseBody
    String setData(ModelMap map, @RequestParam("excelfile") MultipartFile file ,HttpServletRequest request) {
        System.out.println("-------------- ClarificationLoad : setData-------------");
        String mensaje = "", strHora = Functions.getHoraActual();
        
        PX116S02A1710Filter filter = new PX116S02A1710Filter();
        PX116S03A1738Filter filter_tkt = new PX116S03A1738Filter();
        
        Integer cont = 0;
        long SLOTE = 0;
        InplantCommissionsLogic logic = new InplantCommissionsLogic();
        try {
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter = logic.loadPX116S02A1710();
        } catch(SQLException e) {
             logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        
        
        
        try {
            String strBanco = request.getParameter("banco");
            byte[] bytes = file.getBytes();
            
            logic = new InplantCommissionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "InplantCsv." + strSesion + ".csv";
            String strSQL="",SEPARATOR="," , QUOTE="\"";
            
            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close(); 
            
            //mensaje = logic.loadPX116S01A1738(strBanco,strArchivo);
            
            //if(mensaje.contains("Successful")){
                //Llamando al PRO10574(ELavon)
                //mensaje = logic.loadPX413PRO10570(strBanco,strHora);
            
                BufferedReader br = null;
                //CallableStatement cs = null;
                br =new BufferedReader(new FileReader(strArchivo));
                String line = br.readLine();

                /*for (int i = 0; i < line.length(); i++) {
                    if(strBanco.equals("EL")){ 
                       cantReg1++; 
                    }else{
                       if (!line.toUpperCase().contains("TOTAL")) {
                        cantReg1++;
                      } 
                    }
                 }*/

                while (null!=line) {

                    SLOTE++;
                    String [] fields = line.split(SEPARATOR);
                    fields = removeTrailingQuotes(fields,QUOTE);
                    // System.out.println(Arrays.toString(fields));
                    //cs.setString(3,Arrays.toString(fields));
                    //cs.setString(4,(cantReg==1)?"Y":"");
                    //cs.setInt(5, cantReg1);
                    //cs.execute();
                   
                    filter_tkt.IN_CIA = fields[0];
                    filter_tkt.IN_FORMA = fields[1];
                    filter_tkt.IN_SERIE = fields[2];
                    filter_tkt.IN_NLOTE = filter.OU_NLOTE;
                    filter_tkt.IN_SLOTE = SLOTE;
                    //obteniendo el TKT
                    filter_tkt = logic.loadPX116S03A1738(filter_tkt);

                   line = br.readLine();
                }
            //}
            
//          //Eliminar temporal           
            archivo.delete();
            
            
            map.put("success", true);
            map.put("status", "OK");
            map.put("result", "Fully charged, you can download.");
            map.put("NLOTE", filter.OU_NLOTE);
            
        } catch (Exception ex) {
            map.put("success", true);
            map.put("status", "ER");
            map.put("result", "An error occurred while uploading the file: " + ex.getMessage());
            map.put("NLOTE", "");
        }
        return new Gson().toJson(map);
    }
    private String[] removeTrailingQuotes(String[] fields, String QUOTE) {
        String result[] = new String[fields.length];

          for (int i=0;i<result.length;i++){
             result[i] = fields[i].replaceAll("^"+QUOTE, "").replaceAll(QUOTE+"$", "");
          }
          return result;
    }
}
