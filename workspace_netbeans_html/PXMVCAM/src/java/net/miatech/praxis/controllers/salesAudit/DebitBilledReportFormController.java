/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A2966Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.DebitBilledReportFormLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/DebitBilledReportForm")
public class DebitBilledReportFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DebitBilledReportFormLogic logic;

    @RequestMapping(value = "SearchDebitos")
    public @ResponseBody
    String SearchDebitos(ModelMap map, HttpServletRequest request) {
        List<A2966Filter> lst;
        A2966Filter filter = new A2966Filter();

        try {
            logic = new DebitBilledReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.OPCIONTYPE = request.getParameter("OPCIONTYPE");
            filter.NUMBERADM = request.getParameter("NUMBERADM");
            filter.DATEFROM = request.getParameter("DATEFROM");
            filter.DATETO = request.getParameter("DATETO");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CURRENCY = request.getParameter("CURRENCY");
            filter.AUTMAN = request.getParameter("AUTMAN");
            filter.STATUS = request.getParameter("STATUS");
            filter.COMBOCHANNEL = request.getParameter("COMBOCHANNEL");
            filter.TRNCU = request.getParameter("TRNCU");
            filter.VP_CNXPA = request.getParameter("VP_CNXPA");
            filter.VP_AREA = request.getParameter("VP_AREA");
            filter.VP_TYPE = request.getParameter("VP_TYPE");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchDebitos(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }
    //excel

    @RequestMapping(value = "SearchDataGeneral")
    public @ResponseBody
    String SearchDataGeneral(ModelMap map, HttpServletRequest request) {
        SQP00911Filter lst;
        A2966Filter filter = new A2966Filter();

        HashMap map01, map02, map03, map04;

        ArrayList<HashMap<String, String>> lst_dataIni = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RazonEmision = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_lstTKTS = new ArrayList<>();

        ArrayList<HashMap<String, String>> lst_dataIniADMRefe = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_RazonADMRefe = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_lstTKTSADMRefe = new ArrayList<>();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new DebitBilledReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.SearchDataGeneral(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_dataIni">
            for (int vi = 0; vi < lst.lst_Ini.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A2548REGIS", lst.lst_Ini.get(vi).A2548REGIS);
                map01.put("A2548FREGI", lst.lst_Ini.get(vi).A2548FREGI);
                map01.put("A2548NMERF", lst.lst_Ini.get(vi).A2548NMERF);
                map01.put("A2548CNXPA", lst.lst_Ini.get(vi).A2548CNXPA);
                map01.put("A2548NMEMO", lst.lst_Ini.get(vi).A2548NMEMO);

                map01.put("A2548TARID", lst.lst_Ini.get(vi).A2548TARID);
                map01.put("A2548TTAXD", lst.lst_Ini.get(vi).A2548TTAXD);
                map01.put("A2548SERVD", lst.lst_Ini.get(vi).A2548SERVD);
                map01.put("A2548IVACD", lst.lst_Ini.get(vi).A2548IVACD);
                map01.put("A2548COMID", lst.lst_Ini.get(vi).A2548COMID);
                map01.put("A2548SCOMD", lst.lst_Ini.get(vi).A2548SCOMD);
                map01.put("A2548TAXCD", lst.lst_Ini.get(vi).A2548TAXCD);
                map01.put("A2548PENAD", lst.lst_Ini.get(vi).A2548PENAD);
                map01.put("A2548TTACD", lst.lst_Ini.get(vi).A2548TTACD);
                map01.put("A2548TTAMD", lst.lst_Ini.get(vi).A2548TTAMD);
                map01.put("A2548TCARD", lst.lst_Ini.get(vi).A2548TCARD);
                map01.put("A2548NETO", lst.lst_Ini.get(vi).A2548NETO);

                lst_dataIni.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_lstTKTS">
            for (int vi = 0; vi < lst.lst_TKT.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A2548TIKET", lst.lst_TKT.get(vi).A2548TIKET);
                map02.put("A2548TRNCO", lst.lst_TKT.get(vi).A2548TRNCO);
                map02.put("A2548NETO", lst.lst_TKT.get(vi).A2548NETO);
                map02.put("A2548PREME", lst.lst_TKT.get(vi).A2548PREME);
                map02.put("A2548CNXPA", lst.lst_TKT.get(vi).A2548CNXPA);
                map02.put("A2548MDA", lst.lst_TKT.get(vi).A2548MDA);

                lst_lstTKTS.add(map02);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RazonEmision">
            for (int vi = 0; vi < lst.lst_Calcurazones.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A2553TYPO", lst.lst_Calcurazones.get(vi).A2553TYPO);
                map03.put("A2553CODE", lst.lst_Calcurazones.get(vi).A2553CODE);
                map03.put("A2553DESCR", lst.lst_Calcurazones.get(vi).A2553DESCR);

                lst_RazonEmision.add(map03);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_dataIniADMRefe">
            for (int vi = 0; vi < lst.lst_dataIniADMRefe.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A2548REGIS", lst.lst_dataIniADMRefe.get(vi).A2548REGIS);
                map01.put("A2548FREGI", lst.lst_dataIniADMRefe.get(vi).A2548FREGI);
                map01.put("A2548NMERF", lst.lst_dataIniADMRefe.get(vi).A2548NMERF);
                map01.put("A2548CNXPA", lst.lst_dataIniADMRefe.get(vi).A2548CNXPA);
                map01.put("A2548NMEMO", lst.lst_dataIniADMRefe.get(vi).A2548NMEMO);

                map01.put("A2548TARID", lst.lst_dataIniADMRefe.get(vi).A2548TARID);
                map01.put("A2548TTAXD", lst.lst_dataIniADMRefe.get(vi).A2548TTAXD);
                map01.put("A2548SERVD", lst.lst_dataIniADMRefe.get(vi).A2548SERVD);
                map01.put("A2548IVACD", lst.lst_dataIniADMRefe.get(vi).A2548IVACD);
                map01.put("A2548COMID", lst.lst_dataIniADMRefe.get(vi).A2548COMID);
                map01.put("A2548SCOMD", lst.lst_dataIniADMRefe.get(vi).A2548SCOMD);
                map01.put("A2548TAXCD", lst.lst_dataIniADMRefe.get(vi).A2548TAXCD);
                map01.put("A2548PENAD", lst.lst_dataIniADMRefe.get(vi).A2548PENAD);
                map01.put("A2548TTACD", lst.lst_dataIniADMRefe.get(vi).A2548TTACD);
                map01.put("A2548TTAMD", lst.lst_dataIniADMRefe.get(vi).A2548TTAMD);
                map01.put("A2548TCARD", lst.lst_dataIniADMRefe.get(vi).A2548TCARD);
                map01.put("A2548NETO", lst.lst_dataIniADMRefe.get(vi).A2548NETO);

                lst_dataIni.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_lstTKTSADMRefe">
            for (int vi = 0; vi < lst.lst_lstTKTSADMRefe.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A2548TIKET", lst.lst_lstTKTSADMRefe.get(vi).A2548TIKET);
                map02.put("A2548TRNCO", lst.lst_lstTKTSADMRefe.get(vi).A2548TRNCO);
                map02.put("A2548NETO", lst.lst_lstTKTSADMRefe.get(vi).A2548NETO);
                map02.put("A2548PREME", lst.lst_lstTKTSADMRefe.get(vi).A2548PREME);
                map02.put("A2548CNXPA", lst.lst_lstTKTSADMRefe.get(vi).A2548CNXPA);
                map02.put("A2548MDA", lst.lst_lstTKTSADMRefe.get(vi).A2548MDA);

                lst_lstTKTSADMRefe.add(map02);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RazonADMRefe">
            for (int vi = 0; vi < lst.lst_razonesADMRefe.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A2553TYPO", lst.lst_razonesADMRefe.get(vi).A2553TYPO);
                map03.put("A2553CODE", lst.lst_razonesADMRefe.get(vi).A2553CODE);
                map03.put("A2553DESCR", lst.lst_razonesADMRefe.get(vi).A2553DESCR);

                lst_RazonADMRefe.add(map03);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_dataIni", lst_dataIni);
        map.put("lst_RazonEmision", lst_RazonEmision);
        map.put("lst_lstTKTS", lst_lstTKTS);
        map.put("lst_dataIniADMRefe", lst_dataIniADMRefe);
        map.put("lst_RazonADMRefe", lst_RazonADMRefe);
        map.put("lst_lstTKTSADMRefe", lst_lstTKTSADMRefe);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A2966Filter filter = new A2966Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new DebitBilledReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2966Filter> listaData = logic.SearchDebitos(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("DebitCreditBilled");
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
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18;
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

            CH_00.setCellValue("Origin");
            CH_01.setCellValue("Source");
            CH_02.setCellValue("System Date");
            CH_03.setCellValue("Processing Date");
            CH_04.setCellValue("Issue Date");
            CH_05.setCellValue("Country");
            CH_06.setCellValue("Transaction");
            CH_07.setCellValue("Memo Number");
            CH_08.setCellValue("N° Invoice");
            CH_09.setCellValue("Area");
            CH_10.setCellValue("Agency");
            CH_11.setCellValue("Agency Name");
            CH_12.setCellValue("Currency");
            CH_13.setCellValue("Billed Airline");
            CH_14.setCellValue("Billing Agent");
            CH_15.setCellValue("Difference");
            CH_16.setCellValue("Result");
            CH_17.setCellValue("Acm Number");
            CH_18.setCellValue("Acm Total");

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

                CH_00.setCellValue(listaData.get(vi).A2966BASE);
                CH_01.setCellValue(listaData.get(vi).A2966FTE);
                CH_02.setCellValue(listaData.get(vi).A2966FREGI);
                CH_03.setCellValue(listaData.get(vi).A2966FPROC);
                CH_04.setCellValue(listaData.get(vi).A2966FEVTA);
                CH_05.setCellValue(listaData.get(vi).A2966PAIS);
                CH_06.setCellValue(listaData.get(vi).A2966TRNCU);
                CH_07.setCellValue(listaData.get(vi).A2966NMEMO);
                CH_08.setCellValue(listaData.get(vi).A2966NFACT);
                CH_09.setCellValue(listaData.get(vi).A2966AREADES);
                CH_10.setCellValue(listaData.get(vi).A2966IATA);
                CH_11.setCellValue(listaData.get(vi).A2966AGENCY);
                CH_12.setCellValue(listaData.get(vi).A2966MDA);
                CH_13.setCellValue(listaData.get(vi).A2966TOTAL);
                CH_14.setCellValue(listaData.get(vi).A2966TOTAA);
                CH_15.setCellValue(listaData.get(vi).A2966TOTAD);
                String STAT = "";
                if (listaData.get(vi).A2966STAT.equals("MA")) {
                    STAT = "Match";
                } else if (listaData.get(vi).A2966STAT.equals("DF")) {
                    STAT = "OVER";
                } else if (listaData.get(vi).A2966STAT.equals("DE")) {
                    STAT = "UNDER";
                }
                CH_16.setCellValue(STAT);
                CH_17.setCellValue(listaData.get(vi).A2966NMEMOACM);
                CH_18.setCellValue(listaData.get(vi).A2966NETOACM);

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
            String fileNameDownload = String.format("DebitCreditBilled - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
}
