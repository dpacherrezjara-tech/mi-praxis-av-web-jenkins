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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.praxis.classes.TraceabilitySuggesPDF;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.SalesAuditAcceptedLogic;
import net.miatech.praxis.logic.salesAudit.TraceabilitySuggestedLogic;
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
@RequestMapping("/TraceabilitySuggested")
public class TraceabilitySuggestedController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TraceabilitySuggestedLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A1672Filter lst;
        A1672Filter filter = new A1672Filter();

        HashMap map01, map02;
        ArrayList<HashMap<String, String>> lst_reporte1 = new ArrayList<>();
        //ArrayList<HashMap<String, String>> lst_RAZON = new ArrayList<>();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            if (filter.checkbox.equals("1")) {
                lst = logic.SearchSumaria(filter);
            } else {
                lst = logic.Search(filter);
            }

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> reporte 1">
            for (int vi = 0; vi < lst.lst_reporte1.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A1672FPROC", lst.lst_reporte1.get(vi).A1672FPROC);
                map01.put("CANTTOT", lst.lst_reporte1.get(vi).CANTTOT);
                map01.put("CANTADM", lst.lst_reporte1.get(vi).CANTADM);
                map01.put("ADMUSD", lst.lst_reporte1.get(vi).ADMUSD);
                map01.put("CANTADMACEP", lst.lst_reporte1.get(vi).CANTADMACEP);
                map01.put("ADMACEPUSD", lst.lst_reporte1.get(vi).ADMACEPUSD);
                map01.put("CANTADMACEPORC", lst.lst_reporte1.get(vi).CANTADMACEPORC);
                map01.put("CANTADMRECH", lst.lst_reporte1.get(vi).CANTADMRECH);
                map01.put("ADMRECHUSD", lst.lst_reporte1.get(vi).ADMRECHUSD);
                map01.put("CANTADMRECHPORC", lst.lst_reporte1.get(vi).CANTADMRECHPORC);
                map01.put("CANTADMREV", lst.lst_reporte1.get(vi).CANTADMREV);
                map01.put("ADMREVUSD", lst.lst_reporte1.get(vi).ADMREVUSD);
                map01.put("CANTADMREVPORC", lst.lst_reporte1.get(vi).CANTADMREVPORC);
                map01.put("CANTADMENV", lst.lst_reporte1.get(vi).CANTADMENV);
                map01.put("ADMENVUSD", lst.lst_reporte1.get(vi).ADMENVUSD);
                map01.put("CANTADMENVPORC", lst.lst_reporte1.get(vi).CANTADMENVPORC);
                map01.put("CANTBILLED", lst.lst_reporte1.get(vi).CANTBILLED);
                map01.put("BILLEDUSD", lst.lst_reporte1.get(vi).BILLEDUSD);
                map01.put("CANTBILLEDPORC", lst.lst_reporte1.get(vi).CANTBILLEDPORC);
                map01.put("A1672PAIVT", lst.lst_reporte1.get(vi).A1672PAIVT);
                map01.put("A1672FUENT", lst.lst_reporte1.get(vi).A1672FUENT);
                map01.put("A1672AGENT", lst.lst_reporte1.get(vi).A1672AGENT);

                map01.put("CANTADMJUSTI", lst.lst_reporte1.get(vi).CANTADMJUSTI);
                map01.put("CANTADMREUDITE", lst.lst_reporte1.get(vi).CANTADMREUDITE);
                map01.put("CANTADMPENGROUP", lst.lst_reporte1.get(vi).CANTADMPENGROUP);
                map01.put("CANTADMAUTORI", lst.lst_reporte1.get(vi).CANTADMAUTORI);
                map01.put("CANTADMSINCLIE", lst.lst_reporte1.get(vi).CANTADMSINCLIE);
                map01.put("CANTADMIATADISA", lst.lst_reporte1.get(vi).CANTADMIATADISA);
                map01.put("CANTADMGDS", lst.lst_reporte1.get(vi).CANTADMGDS);
                map01.put("CANTASR", lst.lst_reporte1.get(vi).CANTASR);
                map01.put("CANTBSP", lst.lst_reporte1.get(vi).CANTBSP);
                map01.put("CANTJUSTIADMREPORT", lst.lst_reporte1.get(vi).CANTJUSTIADMREPORT);
                map01.put("CANTABSP", lst.lst_reporte1.get(vi).CANTABSP);
                map01.put("CANTARC", lst.lst_reporte1.get(vi).CANTARC);
                map01.put("CANTOTAL", lst.lst_reporte1.get(vi).CANTOTAL);
                map01.put("TOTALGROUP", lst.lst_reporte1.get(vi).TOTALGROUP);
                map01.put("A1672AGENT", lst.lst_reporte1.get(vi).A1672AGENT);
                map01.put("A1672IATAO", lst.lst_reporte1.get(vi).A1672IATAO);

                lst_reporte1.add(map01);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_reporte1", lst_reporte1);
        //map.put("lst_RAZON", lst_RAZON);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getpdf")
    public @ResponseBody
    void getpdf(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A1672Filter filter = new A1672Filter();
        A1672Filter lst;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.SearchSumaria(filter);
            String OPTION = filter.VP_OPTION;

            TraceabilitySuggesPDF TraceabilitySugges = new TraceabilitySuggesPDF();
            File archivo = TraceabilitySugges.createReport(lst.lst_reporte1, filter.VP_DATEFROM, filter.VP_DATETO, OPTION);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");

            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;

            fis = new FileInputStream(new File(archivo.getAbsolutePath()));

            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);

            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();

        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }
    }

    @RequestMapping(value = "SearchDetail")
    public @ResponseBody
    String SearchDetail(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchDetail(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchReportADM")
    public @ResponseBody
    String SearchReportADM(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.size() : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("total", 0);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            map.put("total", 0);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> listaData = logic.SearchReportADM(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ADM Report");
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
                if (listaData.get(vi).A2548FLAG.equals("G")) {
                    FLAG = "PBD issued";
                }
                if (listaData.get(vi).A2548FLAG.equals("H")) {
                    FLAG = "Agreement not reached - to agent";
                }
                if (listaData.get(vi).A2548FLAG.equals("T")) {
                    FLAG = "Agree with airline";
                }
                if (listaData.get(vi).A2548FLAG.equals("K")) {
                    FLAG = "Agree with Agent";
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

            String fileNameDownload = String.format("ADM Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "SearchDetailPendiente")
    public @ResponseBody
    String SearchDetailPendiente(ModelMap map, HttpServletRequest request) {
        SQP00989Filter filter = new SQP00989Filter();
        try {

            filter.OPCION = request.getParameter("OPCION").trim();
            filter.DATEFROM = request.getParameter("DATEFROM").trim();
            filter.A1672AGENT = request.getParameter("A1672AGENT").trim();
            filter.DATETO = request.getParameter("DATETO").trim();
            filter.BOOKTO = request.getParameter("BOOKTO").trim();

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> lst_search = logic.SearchDetailPendiente(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.size() : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSXPendie")
    public @ResponseBody
    void getXLSXPendie(HttpServletRequest request, HttpServletResponse response) {
        SQP00989Filter filter = new SQP00989Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.OPCION = request.getParameter("OPCION").trim();
            filter.DATEFROM = request.getParameter("DATEFROM").trim();
            filter.DATETO = request.getParameter("DATETO").trim();
            filter.BOOKTO = request.getParameter("BOOKTO").trim();

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> listaData = logic.SearchDetailPendiente(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SalesAuditAccepted");
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
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25, CH_26, CH_27;
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
            CH_24 = row.createCell(24);
            CH_25 = row.createCell(25);
            CH_26 = row.createCell(26);
            CH_27 = row.createCell(27);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Cupon");
            CH_02.setCellValue("Source");
            CH_03.setCellValue("Channel");
            CH_04.setCellValue("Country");
            CH_05.setCellValue("IATA");
            CH_06.setCellValue("NAME IATA");
            CH_07.setCellValue("TRNCU");
            CH_08.setCellValue("TDOC");
            CH_09.setCellValue("Issue Date");
            CH_10.setCellValue("Processing Date");
            CH_11.setCellValue("System Date");
            CH_12.setCellValue("Suggested Date");
            CH_13.setCellValue("Itinerary");
            CH_14.setCellValue("FCMI");
            CH_15.setCellValue("FBASIS");
            CH_16.setCellValue("Currency");
            CH_17.setCellValue("Airline Amount");
            CH_18.setCellValue("Agent Amount");
            CH_19.setCellValue("Difference");
            CH_20.setCellValue("Tour Code");
            CH_21.setCellValue("Status");
            CH_22.setCellValue("Reason Code");
            CH_23.setCellValue("Reason");
            CH_24.setCellValue("Agent");
            CH_25.setCellValue("Audited by");
            CH_26.setCellValue("PNR");
            CH_27.setCellValue("Email");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));

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
            CH_24.setCellStyle(headerStyle);
            CH_25.setCellStyle(headerStyle);
            CH_26.setCellStyle(headerStyle);
            CH_27.setCellStyle(headerStyle);

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
                CH_24 = row.createCell(24);
                CH_25 = row.createCell(25);
                CH_26 = row.createCell(26);
                CH_27 = row.createCell(27);

                CH_00.setCellValue(listaData.get(vi).strTicket);
                CH_01.setCellValue(listaData.get(vi).A1672CUPON);
                CH_02.setCellValue(listaData.get(vi).A1672FUENT);
                CH_03.setCellValue(listaData.get(vi).A1672CANAL);
                CH_04.setCellValue(listaData.get(vi).A1672PAIVT);
                CH_05.setCellValue(listaData.get(vi).A1672AGENT);
                CH_06.setCellValue(listaData.get(vi).A1672NAMEF);
                CH_07.setCellValue(listaData.get(vi).A1672TRNCU);
                CH_08.setCellValue(listaData.get(vi).A1672TDOC);
                CH_09.setCellValue(listaData.get(vi).A1672FVENT);
                CH_10.setCellValue(listaData.get(vi).A1672FPROC);
                CH_11.setCellValue(listaData.get(vi).A1672FREGI);
                CH_12.setCellValue(listaData.get(vi).A1672FREVI);
                CH_13.setCellValue(listaData.get(vi).A1672ITIN);
                CH_14.setCellValue(listaData.get(vi).A1672FCMI);
                CH_15.setCellValue(listaData.get(vi).A1672FBASI);
                CH_16.setCellValue(listaData.get(vi).A1672MONTT);
                CH_17.setCellValue(listaData.get(vi).A1672TTMIA);
                CH_18.setCellValue(listaData.get(vi).A1672TTAGT);
                CH_19.setCellValue(listaData.get(vi).A1672TTDIF);
                CH_20.setCellValue(listaData.get(vi).A1672CODIT);
                CH_21.setCellValue(listaData.get(vi).A1672FLADM);
                CH_22.setCellValue(listaData.get(vi).A1672ERROR);
                CH_23.setCellValue(listaData.get(vi).A1580DESC2);
                CH_24.setCellValue(listaData.get(vi).A1672BAGFT);
                CH_25.setCellValue(listaData.get(vi).A1672REVIS);
                CH_26.setCellValue(listaData.get(vi).A1672PNR);
                String vl_A1672CORREO = "";
                switch (listaData.get(vi).A1672CORREO) {
                    case 2:
                        vl_A1672CORREO = "unregistered mail";
                        break;
                    case 1:
                        vl_A1672CORREO = "registered mail";
                        break;
                    case 0:
                        vl_A1672CORREO = "";
                        break;
                }
                CH_27.setCellValue(vl_A1672CORREO);

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
                CH_24.setCellStyle(bodyStyle);
                CH_25.setCellStyle(bodyStyle);
                CH_26.setCellStyle(bodyStyle);
                CH_27.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);

            String fileNameDownload = String.format("SalesAuditAccepted - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSXProcessingDate")
    public @ResponseBody
    void getXLSXProcessingDate(HttpServletRequest request, HttpServletResponse response) {
        A1672Filter filter = new A1672Filter();
        int cant=0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new TraceabilitySuggestedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> listaData = logic.SearchDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Traceability Suggested");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14;
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
            String vl_campo = "";
            String vl_campo1 = "";
            String vl_agencia = "";
            if (filter.VP_OPTION.equals("1")) {
                vl_campo = "Status";
                vl_campo1 = "Date";
            } else if (filter.VP_OPTION.equals("2")) {
                vl_campo = "Reason";
                vl_campo1 = "Date";
            } else {
                vl_campo = "IATA";
                vl_agencia = "Agency";
                vl_campo1 = "Date";
            }
            //Reason
            //me.beandetail.VP_OPTION
            CH_00.setCellValue(vl_campo1);
            CH_01.setCellValue(vl_campo);
            CH_02.setCellValue("Ticket Qty ARC");
            CH_03.setCellValue("Ticket Qty ASR");
            CH_04.setCellValue("Ticket Qty BSP");
            CH_05.setCellValue("Total");

            CH_06.setCellValue("Ticket amount USD ARC");
            CH_07.setCellValue("Ticket amount USD ASR");
            CH_08.setCellValue("Ticket amount USD BSP");
            CH_09.setCellValue("Charges");
            CH_10.setCellValue("Iva Charges");
            CH_11.setCellValue("Pending Grouping");
            CH_12.setCellValue("Unregistered Client");

            CH_13.setCellValue("Total");
            CH_14.setCellValue(vl_agencia);

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

                CH_00.setCellValue(listaData.get(vi).A2548FREGI);
                if (!filter.VP_OPTION.equals("3")) {
                    CH_01.setCellValue(listaData.get(vi).A2548FLAG);
                } else {
                    CH_01.setCellValue(listaData.get(vi).A2548IATA);
                }

                CH_02.setCellValue(listaData.get(vi).A2548CATNNTC);
                CH_03.setCellValue(listaData.get(vi).A2548CATNFAC);
                CH_04.setCellValue(listaData.get(vi).A2548CATNNTD);
                CH_05.setCellValue(listaData.get(vi).A2548CATNDOCUM);
                CH_06.setCellValue(listaData.get(vi).A2548IVACA);
                CH_07.setCellValue(listaData.get(vi).A2548IVACS);
                CH_08.setCellValue(listaData.get(vi).A2548IVACD);
                CH_09.setCellValue(listaData.get(vi).TTCARGO);
                CH_10.setCellValue(listaData.get(vi).TTIVACARGO);
                CH_11.setCellValue(listaData.get(vi).PENDIGROUP);
                CH_12.setCellValue(listaData.get(vi).PENDISCLIE);

                CH_13.setCellValue(listaData.get(vi).A2548TOTAA);
                if (filter.VP_OPTION.equals("3")) {
                    CH_14.setCellValue(listaData.get(vi).AGENCY);
                }

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

            String fileNameDownload = String.format("Traceability Suggested - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
