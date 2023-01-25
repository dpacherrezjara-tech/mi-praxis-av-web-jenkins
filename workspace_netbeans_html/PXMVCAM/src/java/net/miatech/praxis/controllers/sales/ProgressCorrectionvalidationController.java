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
import java.sql.SQLException;
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
import net.miatech.beans.PX151S01A1530Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.libmiatec.A722;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.CatalogueFlightLogic;
import net.miatech.praxis.logic.sales.FptfAirlineLogic;
import net.miatech.praxis.logic.sales.FptfBestPracticeLogic;
import net.miatech.praxis.logic.sales.ProgressCorrectionvalidationLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ProgressCorrectionvalidation")
public class ProgressCorrectionvalidationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ProgressCorrectionvalidationLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ProgressCorrectionvalidation/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- ProgressCorrectionvalidation : Search-------------");
        map.put("success", true);
        List<PX151S01A1530Filter> lst = this.getList(request, false);
//        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX151S01A1530Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ProgressCorrectionvalidationLogic();

        List<PX151S01A1530Filter> lst = new ArrayList<>(0);
        PX151S01A1530Filter filter = new PX151S01A1530Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_TIPO = Integer.parseInt(request.getParameter("VP_TIPO"));
            filter.VP_A1530FUENT = request.getParameter("VP_A1530FUENT");
            filter.VP_A1530STPRO = request.getParameter("VP_A1530STPRO");
            filter.VP_FECHA_00 = request.getParameter("VP_FECHA_00");
            filter.VP_FECHA_01 = request.getParameter("VP_FECHA_01");

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

            lst = logic.loadPX151S01A1530(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Progress Correction Validation : getXLSX");
//         PX151-20201113-ProgressCorrectionValidation___flex
//        String fileNameDownload = String.format("ProgressCorrectionValidation - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
          String fileNameDownload = String.format("PX151-" + Functions.getFechaActual() + "-ProgressCorrectionValidation.xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX151S01A1530Filter> listaData = this.getList(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ProgressCorrectionValidation");
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
            //
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
            

            CH1_00.setCellValue("Source");
            CH1_01.setCellValue("Country");
            CH1_02.setCellValue("Curr");
            CH1_03.setCellValue("Channel");
            CH1_04.setCellValue("IATA");
            CH1_05.setCellValue("Processing Date");
            //
            CH1_06.setCellValue("Ending Date");            
            CH1_08.setCellValue("SALE");
            CH1_16.setCellValue("RFND");
            CH1_24.setCellValue("NET");
            CH1_32.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));   //Ending Date
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 15));  //SALE
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 23)); //RFND
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 31)); //NET
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 32, 32));

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
            

            ++vj;
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
            Cell CH2_30 = row.createCell(30);
            Cell CH2_31 = row.createCell(31);
            Cell CH2_32 = row.createCell(32);
            //SALE
            CH2_06.setCellValue("From");
            CH2_07.setCellValue("To");
            CH2_08.setCellValue("Qty Doc");
            CH2_09.setCellValue("Fare");
            CH2_10.setCellValue("Other");
            CH2_11.setCellValue("TUA Domestic");
            CH2_12.setCellValue("TUA International");
            CH2_13.setCellValue("Others Income");
            CH2_14.setCellValue("Comm.");
            CH2_15.setCellValue("Total");            
            //REFUND
            CH2_16.setCellValue("Qty Doc");
            CH2_17.setCellValue("Fare");
            CH2_18.setCellValue("Other");            
            CH2_19.setCellValue("TUA Domestic");
            CH2_20.setCellValue("TUA International");
            CH2_21.setCellValue("Others Income");
            CH2_22.setCellValue("Comm.");
            CH2_23.setCellValue("Total");            
            //>>NET
            CH2_24.setCellValue("Doc. Qty");
            CH2_25.setCellValue("Fare");            
            CH2_26.setCellValue("Other");            
            CH2_27.setCellValue("TUA Domestic");
            CH2_28.setCellValue("TUA International");
            CH2_29.setCellValue("Others Income");
            CH2_30.setCellValue("Comm.");
            CH2_31.setCellValue("Total"); 
                        
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
            CH2_18.setCellStyle(headerStyle);
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);
            CH2_26.setCellStyle(headerStyle);
            CH2_27.setCellStyle(headerStyle);
            CH2_28.setCellStyle(headerStyle);
            CH2_29.setCellStyle(headerStyle);
            CH2_30.setCellStyle(headerStyle);
            CH2_31.setCellStyle(headerStyle);
            CH2_32.setCellStyle(headerStyle);
            
            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rce00 = row.createCell(0);
                Cell rce01 = row.createCell(1);
                Cell rce02 = row.createCell(2);
                Cell rce03 = row.createCell(3);
                Cell rce04 = row.createCell(4);
                Cell rce05 = row.createCell(5);
                Cell rce06 = row.createCell(6);
                Cell rce07 = row.createCell(7);
                Cell rce08 = row.createCell(8);
                Cell rce09 = row.createCell(9);
                Cell rce10 = row.createCell(10);
                Cell rce11 = row.createCell(11);
                Cell rce12 = row.createCell(12);                
                Cell rce13 = row.createCell(13);
                Cell rce14 = row.createCell(14);
                Cell rce15 = row.createCell(15);
                Cell rce16 = row.createCell(16);
                Cell rce17 = row.createCell(17);
                Cell rce18 = row.createCell(18);
                Cell rce19 = row.createCell(19);
                Cell rce20 = row.createCell(20);
                Cell rce21 = row.createCell(21);
                Cell rce22 = row.createCell(22);
                Cell rce23 = row.createCell(23);
                Cell rce24 = row.createCell(24);
                Cell rce25 = row.createCell(25);
                Cell rce26 = row.createCell(26);
                Cell rce27 = row.createCell(27);
                Cell rce28 = row.createCell(28);
                Cell rce29 = row.createCell(29);
                Cell rce30 = row.createCell(30);
                Cell rce31 = row.createCell(31);
                Cell rce32 = row.createCell(32);
                             

                rce00.setCellValue(listaData.get(vi).A1530FUENT);
                rce01.setCellValue(listaData.get(vi).A1530PSVTA);
                rce02.setCellValue(listaData.get(vi).A1530MDA);
                rce03.setCellValue(listaData.get(vi).A1530SFUEN);
                rce04.setCellValue(listaData.get(vi).A1530AGENT);
                rce05.setCellValue(listaData.get(vi).A1530FPROC);
                rce06.setCellValue(listaData.get(vi).A1530FDESD);
                rce07.setCellValue(listaData.get(vi).A1530FHAST);
                //sale
                rce08.setCellValue(listaData.get(vi).A1720QDOSA);
                rce09.setCellValue(listaData.get(vi).SALE_FARE);
                rce10.setCellValue(listaData.get(vi).SALE_OTHER);
                rce11.setCellValue(listaData.get(vi).SALE_TAXDO);
                rce12.setCellValue(listaData.get(vi).SALE_TAXIN); 
                rce13.setCellValue(listaData.get(vi).SALE_TAXDI);
                rce14.setCellValue(listaData.get(vi).SALE_COMM);
                rce15.setCellValue(listaData.get(vi).SALE); 
                //Refund
                rce16.setCellValue(listaData.get(vi).A1720QDORF);
                rce17.setCellValue(listaData.get(vi).RFND_FARE);
                rce18.setCellValue(listaData.get(vi).RFND_OTHER);
                rce19.setCellValue(listaData.get(vi).RFND_TAXDO);
                rce20.setCellValue(listaData.get(vi).RFND_TAXIN);
                rce21.setCellValue(listaData.get(vi).RFND_TAXDI);
                rce22.setCellValue(listaData.get(vi).RFND_COMM);
                rce23.setCellValue(listaData.get(vi).RFND);
                //NET
                rce24.setCellValue(listaData.get(vi).A1720QDONE);
                rce25.setCellValue(listaData.get(vi).NETO_FARE);
                rce26.setCellValue(listaData.get(vi).NETO_OTHER);
                rce27.setCellValue(listaData.get(vi).NETO_TAXDO);
                rce28.setCellValue(listaData.get(vi).NETO_TAXIN);
                rce29.setCellValue(listaData.get(vi).NETO_TAXDI);
                rce30.setCellValue(listaData.get(vi).NETO_COMM);
                rce31.setCellValue(listaData.get(vi).NETO);
                rce32.setCellValue(listaData.get(vi).A1530STPRO_00);
                
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

}
