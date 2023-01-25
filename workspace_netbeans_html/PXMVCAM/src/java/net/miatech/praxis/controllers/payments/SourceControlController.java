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
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BanksCatalogLogic;
import net.miatech.praxis.logic.payments.RejectionstLogic;
import net.miatech.praxis.logic.payments.SourceControlLogic;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
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
@RequestMapping("/SourceControl")
public class SourceControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SourceControlLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SourceControl/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SourceControl : Search-------------");

        map.put("success", true);
        List<A1691Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1691Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1691Filter> lst = new ArrayList<>(0);
        A1691Filter filter = new A1691Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SourceControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1691Filter.class);
            lst = logic.loadPX330SQP01039(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("SourceControl : getXLSX");

        String fileNameDownload = String.format("SourceControl - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1691Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ReasonCodeReport");

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
            
            DecimalFormatSymbols simbolo = new DecimalFormatSymbols();
            simbolo.setDecimalSeparator('.');
            simbolo.setGroupingSeparator(',');
            
            DecimalFormat formatea = new DecimalFormat("#,###.##", simbolo);
            double a = listaData.get(0).totORACLE; 
            
            String total = formatea.format(a); 
            String strFormatDate2 = listaData.get(1).strFormatDate2;
            
            Row row = sheet.createRow(vj);
            Cell CH0_00 = row.createCell(0);
            Cell CH0_01 = row.createCell(1);
            Cell CH0_02 = row.createCell(2);
            Cell CH0_03 = row.createCell(3);
            Cell CH0_04 = row.createCell(4);
            Cell CH0_05 = row.createCell(5);
            Cell CH0_06 = row.createCell(6);
            Cell CH0_07 = row.createCell(7);   

            CH0_00.setCellValue("Total Control: " +total+ " Create Date: " +strFormatDate2);     
            
            CH0_00.setCellStyle(headerStyle);
            CH0_01.setCellStyle(headerStyle);
            CH0_02.setCellStyle(headerStyle);
            CH0_03.setCellStyle(headerStyle);
            CH0_04.setCellStyle(headerStyle);
            CH0_05.setCellStyle(headerStyle);
            CH0_06.setCellStyle(headerStyle);
            CH0_07.setCellStyle(headerStyle);
            
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));
            
            ++vj;  
            row = sheet.createRow(vj);
            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);

            CH1_00.setCellValue("Process");
            CH1_02.setCellValue("Total");
            CH1_03.setCellValue("Total");
            CH1_04.setCellValue("Total");
            CH1_05.setCellValue("Total");
            CH1_06.setCellValue("Difference");
            CH1_07.setCellValue("Message");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));

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

            CH2_00.setCellValue("Date");
            CH2_01.setCellValue("Hour");
            CH2_02.setCellValue("Movements");
            CH2_03.setCellValue("Day");
            CH2_04.setCellValue("Final");
            CH2_05.setCellValue("Registered");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).strFecha);
                rcell2.setCellValue(listaData.get(vi).QCPNOD);
                rcell3.setCellValue(listaData.get(vi).QCPNVC);
                rcell4.setCellValue(listaData.get(vi).QCPNOCR);
                rcell5.setCellValue(listaData.get(vi).QCPNMA);
                rcell6.setCellValue(listaData.get(vi).QCPNTOT);
                rcell7.setCellValue(listaData.get(vi).strDescripcion);

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

    @RequestMapping(value = "searchCant")
    public @ResponseBody
    String searchCant(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SourceControl : searchCant-------------");
        int lst = 0;
        map.put("success", true);
        A1691Filter filter = new A1691Filter();
        Gson gson = new Gson();
        String beanString;
        try {
            logic = new SourceControlLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A1691Filter.class);
            lst = logic.loadPXSQPCLP(filter);
            map.put("listaCompleteDetail", lst);

        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());            
        }

        return new Gson().toJson(map);
    }
    
        @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SourceControl : searchCompleteDetail-------------");

        Gson gson = new Gson();
        A1691Filter filter = new A1691Filter();
        A1691Filter result = new A1691Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A1691Filter.class);

        logic = new SourceControlLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX265SQP01449(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(SourceControlController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "Maintenance")
    public @ResponseBody
    String Maintenance(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- SourceControl : Maintenance-------------");
        String option;
        A1691Filter filter = new A1691Filter();
        String msj = "";

        try {

            option = request.getParameter("option");
            filter.TOTACU = Integer.parseInt(request.getParameter("TOTACU").trim());
            filter.COMENT = request.getParameter("COMENT").trim();
            filter.STAT = request.getParameter("STAT").trim();
            filter.CCUST = request.getParameter("CCUST").trim();
            filter.NOMFILE = request.getParameter("NOMFILE").trim();
            filter.FPROC = request.getParameter("FPROC").trim();
            filter.HOCR = request.getParameter("HOCR").trim();
            filter.TOTDIA = Integer.parseInt(request.getParameter("TOTDIA").trim());
            filter.TOTFIN = Integer.parseInt(request.getParameter("TOTFIN").trim());
            filter.TOTREG = Integer.parseInt(request.getParameter("TOTREG").trim());

            logic = new SourceControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX265SQP01448(filter, option);

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

}
