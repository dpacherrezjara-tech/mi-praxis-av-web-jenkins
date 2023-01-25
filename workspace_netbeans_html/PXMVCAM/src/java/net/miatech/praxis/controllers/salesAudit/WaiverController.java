/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.A2536Filter;
import net.miatech.beans.SaleAudit.A2537Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;
import net.miatech.beans.SaleAudit.SQP00967Filter;
import net.miatech.beans.SaleAudit.SQP00978Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.WaiverLogic;
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
@RequestMapping("/Waiver")
public class WaiverController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private WaiverLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/Waiver/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Waiver : Search-------------");
        map.put("success", true);
        List<A2537Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2537Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2537Filter> lst = new ArrayList<>(0);
        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new WaiverLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2537Filter.class);
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

            lst = logic.Search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "download")
    public @ResponseBody
    String download(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Contingencies : download-------------");
        map.put("success", true);

        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";

        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2537Filter.class);

        byte[] bytes = null;
        try {
            String A2537RUTAF = filter.A2537RUTAF.trim();
            String nomArchivo = filter.A2537NAMEF.trim();

            String rutaMemo = "\\\\PX\\am_inventariado\\" + A2537RUTAF;
            Path dir = Paths.get(rutaMemo);

            if (!Files.exists(dir)) {
                map.put("mensaje", "The file cannot be found on the server.");
            } else {
                String strArchivo = rutaMemo + "\\" + nomArchivo;
                File archivo = new File(strArchivo);

                FileInputStream fs = new FileInputStream(archivo);

                bytes = new byte[(int) archivo.length()];
                fs.read(bytes);
                fs.close();

                map.put("bytes", bytes);
                map.put("mensaje", "OK");
            }
        } catch (Exception e) {
            map.put("mensaje", "An error ocurred when trying to  upload the file.");
            logError.error(e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "mantenimientoWaiver")
    public @ResponseBody
    String mantenimientoCharge(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Waiver : mantenimientoWaiver-------------");
        A2537Filter objRtn = new A2537Filter();
        A2537Filter filter = new A2537Filter();
        Gson gson = new Gson();
        String beanString = "";
        map.put("success", true);
        try {
            logic = new WaiverLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2537Filter.class);
            objRtn = logic.mantenimientoWaiver(filter);

            map.put("objRtn", objRtn);
            map.put("MESSAGE", objRtn.dbException.MESSAGE);
            map.put("SQLCODE", objRtn.dbException.SQLCODE);
        } catch (Exception e) {
            map.put("success", false);
            System.out.println("--> " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2537Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Country");
            CH1_2.setCellValue("Request Date");
            CH1_3.setCellValue("Action Waiver");
            CH1_4.setCellValue("Rfnd Date");
            CH1_5.setCellValue("Emission Date");
            CH1_6.setCellValue("Flown Date");
            CH1_7.setCellValue("System Date");
            CH1_8.setCellValue("Agency");
            CH1_9.setCellValue("Name Agency");
            CH1_10.setCellValue("Agent");
            CH1_11.setCellValue("Tour Code");
            CH1_12.setCellValue("Route");
            CH1_13.setCellValue("Pax");
            CH1_14.setCellValue("N° Pax");
            CH1_15.setCellValue("Class");
            CH1_16.setCellValue("Pnr");
            CH1_17.setCellValue("Code Waiver");
            CH1_18.setCellValue("Rate Appli");
            CH1_19.setCellValue("Curr Appli");
            CH1_20.setCellValue("Rate Pay");
            CH1_21.setCellValue("Curr Pay");
            CH1_22.setCellValue("Rate Reb");
            CH1_23.setCellValue("Curr Reb");
            CH1_24.setCellValue("Appli Sale");
            CH1_25.setCellValue("Appli Rfnd");
            CH1_26.setCellValue("Appli Exch");
            CH1_27.setCellValue("Descripcion");

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

                rcell0.setCellValue(listaData.get(vi).A2537TIKET);
                rcell1.setCellValue(listaData.get(vi).A2537CNTRY);
                rcell2.setCellValue(listaData.get(vi).A2537DSOLI);
                rcell3.setCellValue(listaData.get(vi).A2537ACTW);
                rcell4.setCellValue(listaData.get(vi).A2537DRFND);
                rcell5.setCellValue(listaData.get(vi).A2537DEMI);
                rcell6.setCellValue(listaData.get(vi).A2537DVOL);
                rcell7.setCellValue(listaData.get(vi).A2537FINGR);
                rcell8.setCellValue(listaData.get(vi).A2537IATA);
                rcell9.setCellValue(listaData.get(vi).A2537NAGEN);
                rcell10.setCellValue(listaData.get(vi).A2537AGENT);
                rcell11.setCellValue(listaData.get(vi).A2537TCODE);
                rcell12.setCellValue(listaData.get(vi).A2537RUTA);
                rcell13.setCellValue(listaData.get(vi).A2537NPAX);
                rcell14.setCellValue(listaData.get(vi).A2537NUPAX);
                rcell15.setCellValue(listaData.get(vi).A2537CLASE);
                rcell16.setCellValue(listaData.get(vi).A2537PNR);
                rcell17.setCellValue(listaData.get(vi).A2537CWAIV);
                rcell18.setCellValue(listaData.get(vi).A2537FAPP);
                rcell19.setCellValue(listaData.get(vi).A2537MAPP);
                rcell20.setCellValue(listaData.get(vi).A2537TPAY);
                rcell21.setCellValue(listaData.get(vi).A2537MPAY);
                rcell22.setCellValue(listaData.get(vi).A2537FREB);
                rcell23.setCellValue(listaData.get(vi).A2537MREB);
                rcell24.setCellValue(listaData.get(vi).A2537APPS);
                rcell25.setCellValue(listaData.get(vi).A2537APPR);
                rcell26.setCellValue(listaData.get(vi).A2537APPE);
                rcell27.setCellValue(listaData.get(vi).A2537DESC);
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
