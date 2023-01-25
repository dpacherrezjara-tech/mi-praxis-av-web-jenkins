package net.miatech.praxis.controllers.salesAudit;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3807Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.classes.ReportADMARCPDF;
import net.miatech.praxis.classes.ReportADMASRPDF;
import net.miatech.praxis.classes.ReportADMBwrPDF;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.program.ProrrateoNewDAO;
import net.miatech.praxis.dao.screens.ProrrateoDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.logic.salesAudit.ADMReportLogic;
import net.miatech.praxis.logic.screens.ProrrateoLogic;
import net.miatech.praxis.spring.INF020;
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
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.logic.salesAudit.BwrQueryRefundLogic;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/ADMReport")
public class ADMReportController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    HashMap<String, String> hmCiudades;
    private MasterDAO masterDAO;
    private ProrrateoNewDAO prorrateoNewDAO;
    private ProrrateoDAO prorrateoDAO;

    @RequestMapping(value = "SearchReportADM")
    public @ResponseBody
    String SearchQueryRefund(ModelMap map, HttpServletRequest request) {
        List<SQP00911Filter> lst;
        SQP00911Filter filter = new SQP00911Filter();

        try {
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.OPCIONTYPE = request.getParameter("OPCIONTYPE");
            filter.COMBOBY = request.getParameter("COMBOBY");
            filter.CIA = request.getParameter("CIA");
            filter.FORMA = request.getParameter("FORMA");
            filter.SERIE = request.getParameter("SERIE");
            filter.NUMBERADM = request.getParameter("NUMBERADM");
            filter.DATEFROM = request.getParameter("DATEFROM");
            filter.DATETO = request.getParameter("DATETO");
            filter.COUNTRY = request.getParameter("COUNTRY");
            filter.CURRENCY = request.getParameter("CURRENCY");
            filter.CHANNEL = request.getParameter("CHANNEL");
            filter.AUTMAN = request.getParameter("AUTMAN");
            filter.STATUS = request.getParameter("STATUS");
            filter.COMBOCHANNEL = request.getParameter("COMBOCHANNEL");
            filter.SEQ = request.getParameter("SEQ");
            filter.CUPON = request.getParameter("CUPON");
            filter.TRNCU = request.getParameter("TRNCU");
            filter.VP_PREME = request.getParameter("VP_PREME");
            filter.VP_CNXPA = request.getParameter("VP_CNXPA");
            filter.VP_TUORCODE = request.getParameter("VP_TUORCODE");
            filter.VP_USER = request.getParameter("VP_USER");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_AREA = request.getParameter("VP_AREA");
            filter.VP_EPR = request.getParameter("VP_EPR");
            filter.VP_PNR = request.getParameter("VP_PNR");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportADM(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    /* String SearchReportADM(ModelMap map, HttpServletRequest request) {
        SQP00911Filter filter = new SQP00911Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            int pExcel = Integer.parseInt(filter.pexcel);
            Boolean bExcel = pExcel == 1 ? true : false;

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
            map.put("totalADM", lst_search.size() > 0 ? (lst_search.get(0).A2548CATNMEMO == null ? "" : lst_search.get(0).A2548CATNMEMO) : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }*/
    @RequestMapping(value = "SearchFormUniADM")
    public @ResponseBody
    String SearchFormUniADM(ModelMap map, HttpServletRequest request) {
        SQP00911Filter filter = new SQP00911Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchCalcuArelonia")
    public @ResponseBody
    String SearchCalcuArelonia(ModelMap map, HttpServletRequest request) {
        A1580Filter filter = new A1580Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1580Filter> lst_search = logic.SearchCalcuArelonia(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchCalcuImpuestos")
    public @ResponseBody
    String SearchCalcuImpuestos(ModelMap map, HttpServletRequest request) {
        A1673Filter filter = new A1673Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1673Filter> lst_search = logic.SearchCalcuImpuestos(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            System.out.println("Se produjo un error. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        SQP00911Filter filter = new SQP00911Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00911Filter> listaData = logic.SearchReportADM(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
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
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25, CH_26, CH_27, CH_28, CH_29,CH_30;
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
            CH_28 = row.createCell(28);
            CH_29 = row.createCell(29);
            CH_30 = row.createCell(30);

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
            CH_22.setCellValue("Connexion");
            CH_23.setCellValue("ADM Tracing");
            CH_24.setCellValue("N° Notice");
            CH_25.setCellValue("Notice Date");
            CH_26.setCellValue("Status Notice");
            CH_27.setCellValue("PNR");
            CH_28.setCellValue("EPR");
            CH_29.setCellValue("Issue Date");
            CH_30.setCellValue("Reference");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));

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
            CH_28.setCellStyle(headerStyle);
            CH_29.setCellStyle(headerStyle);
            CH_30.setCellStyle(headerStyle);

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
                CH_28 = row.createCell(28);
                CH_29 = row.createCell(29);
                CH_30 = row.createCell(30);

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
                CH_17.setCellValue(listaData.get(vi).A2548DESC3);
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
                if (listaData.get(vi).A2548FLAG.equals("N")) {
                    FLAG = "Rejected";
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
                CH_22.setCellValue(listaData.get(vi).A2548NMERF);
                CH_23.setCellValue("");
                CH_24.setCellValue(listaData.get(vi).A2548NRCOR);
                CH_25.setCellValue(listaData.get(vi).A2548FECOR);
                String STATO = "";
                if (listaData.get(vi).A2548STCOR.trim().equals("P")) {
                    STATO = "Sent";
                } else {
                    STATO = "Pending";
                }
                CH_26.setCellValue(STATO);
                CH_27.setCellValue(listaData.get(vi).A2548PNR);
                CH_28.setCellValue(listaData.get(vi).A2548EPR);
                CH_29.setCellValue(listaData.get(vi).A2548FVTA);
                CH_30.setCellValue(listaData.get(vi).A2548CNREL);

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
                CH_28.setCellStyle(bodyStyle);
                CH_29.setCellStyle(bodyStyle);
                CH_30.setCellStyle(bodyStyle);
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
            //sheet.autoSizeColumn(5, true);
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
            //sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true); 
            //sheet.autoSizeColumn(19, true);
            //sheet.autoSizeColumn(20, true);
            //sheet.autoSizeColumn(21, true);
            //sheet.autoSizeColumn(22, true);
            //sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);

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

    @RequestMapping(value = "searchLstProvisi")
    public @ResponseBody
    String searchLstProvisi(ModelMap map, HttpServletRequest request) {
        A1673Filter filter = new A1673Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1673Filter> lst_search = logic.searchLstProvisi(filter);

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

    @RequestMapping(value = "loadTracing")
    public @ResponseBody
    String loadTracing(ModelMap map, HttpServletRequest request) {
        A2553 filter = new A2553();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2553> lst_search = logic.loadTracing(filter);

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

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("fileaudito") MultipartFile file, @RequestParam("fileaudito2") MultipartFile file2, @RequestParam("fileaudito3") MultipartFile file3, HttpServletRequest request) {
        A2553 filter = new A2553();
        A2553 listenvio = new A2553();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            String A2553ARCHV = file.getOriginalFilename();
            String A2553ARCHV2 = file2.getOriginalFilename();
            String A2553ARCHV3 = file3.getOriginalFilename();

            listenvio.A2553TRNCU = filter.A2553TRNCU;
            listenvio.A2553STAT = filter.A2553STAT;
            listenvio.A2553NMEMO = filter.A2553NMEMO;
            listenvio.A2553DESCR = filter.A2553DESCR;
            listenvio.A2553ARCHV = A2553ARCHV;
            listenvio.A2553ARCHV2 = A2553ARCHV2;
            listenvio.A2553ARCHV3 = A2553ARCHV3;
            listenvio.A2553PAIS = filter.A2553PAIS;
            listenvio.A2553FOLIO = "";

            String result = logic.insertTracing(listenvio);
            if (result.equals("RECORD INSERTED")) {
                result = "The record was saved successfully.";
                if (!A2553ARCHV.equals("")) {
                    byte[] bytes = file.getBytes();
                    result = upload(bytes, filter.A2553NMEMO, A2553ARCHV);
                }
                if (!A2553ARCHV2.equals("")) {
                    byte[] bytes2 = file2.getBytes();
                    result = upload(bytes2, filter.A2553NMEMO, A2553ARCHV2);
                }
                if (!A2553ARCHV3.equals("")) {
                    byte[] bytes3 = file3.getBytes();
                    result = upload(bytes3, filter.A2553NMEMO, A2553ARCHV3);
                }
            } else {
                result = "An error ocurred when trying to upload the file.";
            }

            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTracing")
    public @ResponseBody
    String insertTracing(ModelMap map, HttpServletRequest request) {
        A2553 filter = new A2553();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.insertTracing(filter);

            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    public String upload(byte[] bytes, String nroMemo, String nomArchivo) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "";
        try {
            String strSesion = UUID.randomUUID().toString();

            //String rutaMemo = "\\\\PX\\amaudit\\ADM\\" + nroMemo;
            String rutaMemo = "\\\\10.0.0.87\\amaudit\\ADM\\" + nroMemo;
            Path dir = Paths.get(rutaMemo);
            File directory = new File(String.valueOf(dir));
            if (!Files.exists(dir)) {
                directory.mkdir();
            }
            File dir2 = new File(directory, Functions.getFechaActual());
            dir2.mkdir();
            /* if (!Files.exists(dir)) {
             Files.createDirectory(dir);
             }*/

            String strArchivo = rutaMemo + "\\" + Functions.getFechaActual() + "\\" + nomArchivo;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            mensaje = "The record was saved successfully.";
        } catch (Exception e) {
            mensaje = "An error ocurred when trying to upload the file.";
            logError.error(e.getMessage());
        }

        return mensaje;
    }

    @RequestMapping(value = "insertTKT")
    public @ResponseBody
    String insertTKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<SQP00911Filter> gridData = new ArrayList<SQP00911Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548TRNCO = gsonObj.get("A2548TRNCO").getAsString();
                data.A2548CNXPA = gsonObj.get("A2548CNXPA").getAsString();
                data.A2548PAIS = gsonObj.get("A2548PAIS").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertLisTracingFile")
    public @ResponseBody
    String insertLisTracingFile(ModelMap map, HttpServletRequest request, @RequestParam("fileaudito") MultipartFile file, @RequestParam("fileaudito2") MultipartFile file2, @RequestParam("fileaudito3") MultipartFile file3) {
        String result = "";
        String result2 = "";
        String estado = "";
        String VL_ARCHI = "";
        A2553 listenvio = new A2553();
        ArrayList<SQP00911Filter> gridData = new ArrayList<SQP00911Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            listenvio.A2553STAT = request.getParameter("ComboStatus").trim();
            listenvio.A2553ARCHV = file.getOriginalFilename();
            listenvio.A2553ARCHV2 = file2.getOriginalFilename();
            listenvio.A2553ARCHV3 = file3.getOriginalFilename();
            listenvio.A2553DESCR = request.getParameter("argument").trim();
            listenvio.A2553FOLIO = request.getParameter("folio").trim();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548REGIS = gsonObj.get("A2548REGIS").getAsString();
                data.A2548TRNCO = gsonObj.get("A2548TRNCO").getAsString();
                data.A2548CNXPA = gsonObj.get("A2548CNXPA").getAsString();
                data.A2548PAIS = gsonObj.get("A2548PAIS").getAsString();
                gridData.add(data);

            }
            //List<A3404Filter> gridDataRazones2 =  fromJsonList(request.getParameter("beanlstRazones"), gridDataRazones.getClass());//new Gson().fromJson(request.getParameter("beanlstRazones"), gridDataRazones.getClass());
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertLisTracingFile(gridData, listenvio);
            if (result.equals("RECORD INSERTED")) {
                if (!listenvio.A2553ARCHV.equals("") || !listenvio.A2553ARCHV2.equals("") || !listenvio.A2553ARCHV3.equals("")) {

                    for (int i = 0; i < gridData.size(); i++) {
                        if (!listenvio.A2553ARCHV.equals("")) {
                            byte[] bytes2 = file2.getBytes();
                            result2 = upload(bytes2, gridData.get(i).A2548CNXPA, listenvio.A2553ARCHV);
                            VL_ARCHI = "1";
                        }
                        if (!listenvio.A2553ARCHV2.equals("")) {
                            byte[] bytes2 = file2.getBytes();
                            result2 = upload(bytes2, gridData.get(i).A2548CNXPA, listenvio.A2553ARCHV2);
                            VL_ARCHI = "1";
                        }
                        if (!listenvio.A2553ARCHV3.equals("")) {
                            byte[] bytes2 = file2.getBytes();
                            result2 = upload(bytes2, gridData.get(i).A2548CNXPA, listenvio.A2553ARCHV3);
                            VL_ARCHI = "1";
                        }
                        if (VL_ARCHI.equals("1")) {
                            result2 = upload_s3(gridData.get(i).A2548CNXPA);
                        }
                    }

                }
            } else {
                result = "An error ocurred when trying to upload the file.";
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String upload_s3(String IN_CNXPA) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();


        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_PATH", "\\\\10.0.0.87\\amaudit\\ADM\\" + IN_CNXPA + "\\" + Functions.getFechaActual());
        bodyData.put("IN_PREFIX", "ADM/");
        bodyData.put("IN_DATE", Functions.getFechaActual());

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/upload_s3/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

    @RequestMapping(value = "getFormUnicoPDF")
    public @ResponseBody
    void getFormUnicoPDF(HttpServletRequest request, HttpServletResponse response) {
        SQP00911Filter filter = new SQP00911Filter();
        SQP00911Filter temrazon;
        ArrayList<SQP00911Filter> GridRazonEmisionTemp = new ArrayList<SQP00911Filter>();
        ArrayList<A1580Filter> BeanCalculosAreolTemp = new ArrayList<A1580Filter>();
        ArrayList<A1673Filter> BeanCalculosImpuestosTemp = new ArrayList<A1673Filter>();
        try {
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("BeanPDFGeneral"), filter.getClass());

            JsonParser parser = new JsonParser();
            JsonArray gsonArr = parser.parse(request.getParameter("BeanRazonEmision")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548EMISION = gsonObj.get("A2548EMISION").getAsString();
                data.A2548CODR1 = gsonObj.get("A2548CODR1").getAsString();
                data.A2548DESC1 = gsonObj.get("A2548DESC1").getAsString();
                GridRazonEmisionTemp.add(data);

            }
            JsonArray gsonArre = parser.parse(request.getParameter("BeanCalculosAreol")).getAsJsonArray();
            for (JsonElement obj : gsonArre) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A1580Filter data = new A1580Filter();
                data.A1580FROM = gsonObj.get("A1580FROM").getAsString();
                data.A1580TO = gsonObj.get("A1580TO").getAsString();
                data.A1580RUTAC = gsonObj.get("A1580RUTAC").getAsString();
                data.A1580CLASE = gsonObj.get("A1580CLASE").getAsString();
                data.A1580FBASI = gsonObj.get("A1580FBASI").getAsString();
                data.A1580FMIOR = gsonObj.get("A1580FMIOR").getAsDouble();
                data.A1580QMIOR = gsonObj.get("A1580QMIOR").getAsDouble();
                data.TotalFare = gsonObj.get("TotalFare").getAsDouble();
                data.A1580CHAMI = gsonObj.get("A1580CHAMI").getAsDouble();
                data.TotalTKT = gsonObj.get("TotalTKT").getAsDouble();
                data.A1580CHAMI = gsonObj.get("A1580CHAMI").getAsDouble();
                BeanCalculosAreolTemp.add(data);

            }
            JsonArray gsonTax = parser.parse(request.getParameter("BeanCalculosImpuestos")).getAsJsonArray();
            for (JsonElement obj : gsonTax) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A1673Filter data = new A1673Filter();
                data.A1673CDTAX = gsonObj.get("A1673CDTAX").getAsString();
                data.A1673TXMIA = gsonObj.get("A1673TXMIA").getAsDouble();
                data.A1673TXORI = gsonObj.get("A1673TXORI").getAsDouble();
                data.A1673TXDIF = gsonObj.get("A1673TXDIF").getAsDouble();
                BeanCalculosImpuestosTemp.add(data);

            }

            /* LISTA DE TKTS***********************************************************/
            SQP00911Filter filter_TKT = new SQP00911Filter();
            filter_TKT.OPCIONTYPE = "9";
            filter_TKT.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> lst_TKT = logic.SearchReportADM(filter_TKT);
            /* SUMA DE LOS MONTOS TOTALES DE TKTS***********************************************************/
            SQP00911Filter filter_TKTSUM = new SQP00911Filter();
            filter_TKTSUM.OPCIONTYPE = "10";
            filter_TKTSUM.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> List_TKTSUM = logic.SearchReportADM(filter_TKTSUM);
            /* genera pdf formato unico***********************************************************/
            ReportADMBwrPDF reportADMBwrPDF = new ReportADMBwrPDF();
            File archivo = reportADMBwrPDF.createReport(filter, GridRazonEmisionTemp, BeanCalculosAreolTemp, BeanCalculosImpuestosTemp, lst_TKT, List_TKTSUM);

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

    @RequestMapping(value = "getFormUnicoASRPDF")
    public @ResponseBody
    void getFormUnicoASRPDF(HttpServletRequest request, HttpServletResponse response) {
        SQP00911Filter filter = new SQP00911Filter();
        ArrayList<SQP00911Filter> GridRazonEmisionTemp = new ArrayList<SQP00911Filter>();
        prorrateoNewDAO = new ProrrateoNewDAO();
        try {
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("BeanPDFGeneral"), filter.getClass());

            JsonParser parser = new JsonParser();
            JsonArray gsonArr = parser.parse(request.getParameter("BeanRazonEmision")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548EMISION = gsonObj.get("A2548EMISION").getAsString();
                data.A2548CODR1 = gsonObj.get("A2548CODR1").getAsString();
                data.A2548DESC1 = gsonObj.get("A2548DESC1").getAsString();
                GridRazonEmisionTemp.add(data);

            }

            prorrateoNewDAO.setSession(this.serverSession.getServerSession());
            List<FACSIMILFilter> searchAgent = prorrateoNewDAO.searchAgent(filter.A2548IATA);

            // ProrrateoNewLogic logic2 = new ProrrateoNewLogic();
            //logic.setSession(this.serverSession.getServerSession());
            //List<FACSIMILFilter> searchAgent = logic2.searchAgent(filter.A2548IATA);
            /* LISTA DE TKTS***********************************************************/
            SQP00911Filter filter_TKT = new SQP00911Filter();
            filter_TKT.OPCIONTYPE = "9";
            filter_TKT.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> lst_TKT = logic.SearchReportADM(filter_TKT);
            /* SUMA DE LOS MONTOS TOTALES DE TKTS***********************************************************/
            SQP00911Filter filter_TKTSUM = new SQP00911Filter();
            filter_TKTSUM.OPCIONTYPE = "10";
            filter_TKTSUM.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> List_TKTSUM = logic.SearchReportADM(filter_TKTSUM);
            /* genera pdf formato unico***********************************************************/
            ReportADMASRPDF ReportADMASRPDF = new ReportADMASRPDF();
            File archivo = ReportADMASRPDF.createReport(filter, GridRazonEmisionTemp, searchAgent, lst_TKT, List_TKTSUM);

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

    @RequestMapping(value = "getFormUnicoARCPDF")
    public @ResponseBody
    void getFormUnicoARCPDF(HttpServletRequest request, HttpServletResponse response) throws Exception {
        SQP00911Filter filter = new SQP00911Filter();
        BSPF104 filter2 = new BSPF104();
        String AGTN = "";
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        ArrayList<SQP00911Filter> GridRazonEmisionTemp = new ArrayList<SQP00911Filter>();
        ArrayList<A1580Filter> BeanCalculosAreolTemp = new ArrayList<A1580Filter>();
        ArrayList<A1673Filter> BeanCalculosImpuestosTemp = new ArrayList<A1673Filter>();
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        masterDAO = new MasterDAO();
        prorrateoNewDAO = new ProrrateoNewDAO();
        prorrateoDAO = new ProrrateoDAO();
        try {
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("BeanPDFGeneral"), filter.getClass());

            JsonParser parser = new JsonParser();
            JsonArray gsonArr = parser.parse(request.getParameter("BeanRazonEmision")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548EMISION = gsonObj.get("A2548EMISION").getAsString();
                data.A2548CODR1 = gsonObj.get("A2548CODR1").getAsString();
                data.A2548DESC1 = gsonObj.get("A2548DESC1").getAsString();
                GridRazonEmisionTemp.add(data);

            }
            JsonArray gsonArre = parser.parse(request.getParameter("BeanCalculosAreol")).getAsJsonArray();
            for (JsonElement obj : gsonArre) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A1580Filter data = new A1580Filter();
                data.A1580FROM = gsonObj.get("A1580FROM").getAsString();
                data.A1580TO = gsonObj.get("A1580TO").getAsString();
                data.A1580RUTAC = gsonObj.get("A1580RUTAC").getAsString();
                data.A1580CLASE = gsonObj.get("A1580CLASE").getAsString();
                data.A1580FBASI = gsonObj.get("A1580FBASI").getAsString();
                data.A1580FMIOR = gsonObj.get("A1580FMIOR").getAsDouble();
                data.A1580QMIOR = gsonObj.get("A1580QMIOR").getAsDouble();
                data.TotalFare = gsonObj.get("TotalFare").getAsDouble();
                data.A1580CHAMI = gsonObj.get("A1580CHAMI").getAsDouble();
                data.TotalTKT = gsonObj.get("TotalTKT").getAsDouble();
                data.A1580CHAMI = gsonObj.get("A1580CHAMI").getAsDouble();
                BeanCalculosAreolTemp.add(data);

            }
            JsonArray gsonTax = parser.parse(request.getParameter("BeanCalculosImpuestos")).getAsJsonArray();
            for (JsonElement obj : gsonTax) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A1673Filter data = new A1673Filter();
                data.A1673CDTAX = gsonObj.get("A1673CDTAX").getAsString();
                data.A1673TXMIA = gsonObj.get("A1673TXMIA").getAsDouble();
                data.A1673TXORI = gsonObj.get("A1673TXORI").getAsDouble();
                data.A1673TXDIF = gsonObj.get("A1673TXDIF").getAsDouble();
                BeanCalculosImpuestosTemp.add(data);

            }

            /* LISTA DE TKTS***********************************************************/
            SQP00911Filter filter_TKT = new SQP00911Filter();
            filter_TKT.OPCIONTYPE = "9";
            filter_TKT.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> lst_TKT = logic.SearchReportADM(filter_TKT);
            /* SUMA DE LOS MONTOS TOTALES DE TKTS***********************************************************/
            SQP00911Filter filter_TKTSUM = new SQP00911Filter();
            filter_TKTSUM.OPCIONTYPE = "10";
            filter_TKTSUM.VP_CNXPA = filter.A2548CNXPA;
            List<SQP00911Filter> List_TKTSUM = logic.SearchReportADM(filter_TKTSUM);
            /*PARA BUSCAR EN EL DELIVERY*/
            masterDAO.setSession(this.serverSession.getServerSession());
            hmCiudades = masterDAO.loadCiudadesHash();

            ProrrateoLogic logic2 = new ProrrateoLogic();
            filter2.TDNR = filter.A2548TIKET;
            filter2.COUNTRY = "US";
            filter2.nombre = "";
            filter2.CPUI = "";
            prorrateoDAO.setSession(this.serverSession.getServerSession());
            beanFaximil = prorrateoDAO.loadARCFacsimilProrate(cliente.CCUST, filter2, hmCiudades);
            AGTN = beanFaximil.AGTN;
            if (AGTN.equals("")) {
                AGTN = filter.A2548IATA;
            }
            prorrateoNewDAO.setSession(this.serverSession.getServerSession());
            List<FACSIMILFilter> searchAgent = prorrateoNewDAO.searchAgent(filter.A2548IATA);

            /* genera pdf formato unico***********************************************************/
            ReportADMARCPDF ReportADMARCPDF = new ReportADMARCPDF();
            File archivo = ReportADMARCPDF.createReport(filter, GridRazonEmisionTemp, BeanCalculosAreolTemp, BeanCalculosImpuestosTemp, beanFaximil, searchAgent, lst_TKT, List_TKTSUM);

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

    @RequestMapping(value = "SearchDataIni")
    public @ResponseBody
    String SearchDataIni(ModelMap map, HttpServletRequest request) {
        SQP00911Filter lst;
        SQP00911Filter filter = new SQP00911Filter();

        HashMap map01, map02, map03, map04;

        ArrayList<HashMap<String, String>> lst_RazonEmision = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_CalculosAreol = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_CalculosImpuestos = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_dataIni = new ArrayList<>();

        try {
            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_PREME = request.getParameter("VP_PREME");

            lst = logic.SearchDataIni(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_dataIni">
            for (int vi = 0; vi < lst.lst_Ini.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A2548CCUST", lst.lst_Ini.get(vi).A2548CCUST);
                map01.put("A2548PREME", lst.lst_Ini.get(vi).A2548PREME);
                map01.put("A2548NMEMO", lst.lst_Ini.get(vi).A2548NMEMO);

                map01.put("A2548FEMI", lst.lst_Ini.get(vi).A2548FEMI);
                map01.put("A2548BASE", lst.lst_Ini.get(vi).A2548BASE);
                map01.put("A2548TO", lst.lst_Ini.get(vi).A2548TO);
                map01.put("A2548IATA", lst.lst_Ini.get(vi).A2548IATA);
                map01.put("A2548EMPLE", lst.lst_Ini.get(vi).A2548EMPLE);
                map01.put("A2548FLAG", lst.lst_Ini.get(vi).A2548FLAG);
                map01.put("A2548STAT", lst.lst_Ini.get(vi).A2548STAT);

                map01.put("A2548TRNCU", lst.lst_Ini.get(vi).A2548TRNCU);
                map01.put("A2548CNXPA", lst.lst_Ini.get(vi).A2548CNXPA);
                map01.put("A2548NFACT", lst.lst_Ini.get(vi).A2548NFACT);
                map01.put("A2548CIA", lst.lst_Ini.get(vi).A2548CIA);
                map01.put("A2548FORMA", lst.lst_Ini.get(vi).A2548FORMA);
                map01.put("A2548SERIE", lst.lst_Ini.get(vi).A2548SERIE);
                map01.put("A2548TIKET", lst.lst_Ini.get(vi).A2548TIKET);
                map01.put("A2548CDGT", lst.lst_Ini.get(vi).A2548CDGT);
                map01.put("A2548TRNCO", lst.lst_Ini.get(vi).A2548TRNCO);
                map01.put("A2548CNJ", lst.lst_Ini.get(vi).A2548CNJ);
                map01.put("A2548PAIS", lst.lst_Ini.get(vi).A2548PAIS);
                map01.put("A2548TVTA", lst.lst_Ini.get(vi).A2548TVTA);
                map01.put("A2548FTE", lst.lst_Ini.get(vi).A2548FTE);
                map01.put("A2548CANAL", lst.lst_Ini.get(vi).A2548CANAL);
                map01.put("A2548FVTA", lst.lst_Ini.get(vi).A2548FVTA);
                map01.put("A2548TPAX", lst.lst_Ini.get(vi).A2548TPAX);
                map01.put("A2548PAX", lst.lst_Ini.get(vi).A2548PAX);
                map01.put("A2548CODIT", lst.lst_Ini.get(vi).A2548CODIT);
                map01.put("A2548CPN", lst.lst_Ini.get(vi).A2548CPN);

                map01.put("A2548USOS", lst.lst_Ini.get(vi).A2548USOS);
                map01.put("A2548MDA", lst.lst_Ini.get(vi).A2548MDA);
                map01.put("A2548TASAC", lst.lst_Ini.get(vi).A2548TASAC);
                map01.put("A2548TASAA", lst.lst_Ini.get(vi).A2548TASAA);
                map01.put("A2548EMITI", lst.lst_Ini.get(vi).A2548EMITI);
                map01.put("A2548FEMIT", lst.lst_Ini.get(vi).A2548FEMIT);
                map01.put("A2548ENVIA", lst.lst_Ini.get(vi).A2548ENVIA);
                map01.put("A2548FENVI", lst.lst_Ini.get(vi).A2548FENVI);
                map01.put("A2548DISPU", lst.lst_Ini.get(vi).A2548DISPU);
                map01.put("A2548FDISP", lst.lst_Ini.get(vi).A2548FDISP);
                map01.put("A2548SEQ", lst.lst_Ini.get(vi).A2548SEQ);
                map01.put("A2548OBSER", lst.lst_Ini.get(vi).A2548OBSER);
                map01.put("A2548CIUD", lst.lst_Ini.get(vi).A2548CIUD);
                map01.put("A2548TASAD", lst.lst_Ini.get(vi).A2548TASAD);

                map01.put("A2548REGIS", lst.lst_Ini.get(vi).A2548REGIS);
                map01.put("A2548FREGI", lst.lst_Ini.get(vi).A2548FREGI);
                map01.put("A2548FCONT", lst.lst_Ini.get(vi).A2548FCONT);
                map01.put("A2548TYPE", lst.lst_Ini.get(vi).A2548TYPE);
                map01.put("A2548AREA", lst.lst_Ini.get(vi).A2548AREA);
                map01.put("A2548FFILE", lst.lst_Ini.get(vi).A2548FFILE);
                map01.put("A2548CTAC", lst.lst_Ini.get(vi).A2548CTAC);
                map01.put("A2548DESC1", lst.lst_Ini.get(vi).A2548DESC1);
                map01.put("A2548NMERF", lst.lst_Ini.get(vi).A2548NMERF);
                map01.put("AGENCY", lst.lst_Ini.get(vi).AGENCY);
                map01.put("A2548FPROC", lst.lst_Ini.get(vi).A2548FPROC);
                map01.put("DIRAGENCY", lst.lst_Ini.get(vi).DIRAGENCY);

                map01.put("A2548CATNDOCUM", lst.lst_Ini.get(vi).A2548CATNDOCUM);
                map01.put("A2548TCAMB", lst.lst_Ini.get(vi).A2548TCAMB);
                //Aero
                map01.put("A2548TARIF", lst.lst_Ini.get(vi).A2548TARIF);
                map01.put("A2548TTAX", lst.lst_Ini.get(vi).A2548TTAX);
                map01.put("A2548SERVI", lst.lst_Ini.get(vi).A2548SERVI);
                map01.put("A2548COMIS", lst.lst_Ini.get(vi).A2548COMIS);
                map01.put("A2548SCOM", lst.lst_Ini.get(vi).A2548SCOM);
                map01.put("A2548TAXCM", lst.lst_Ini.get(vi).A2548TAXCM);
                map01.put("A2548PORCO", lst.lst_Ini.get(vi).A2548PORCO);
                map01.put("A2548PENAL", lst.lst_Ini.get(vi).A2548PENAL);
                map01.put("A2548FEE", lst.lst_Ini.get(vi).A2548FEE);
                map01.put("A2548TOTAL", lst.lst_Ini.get(vi).A2548TOTAL);
                //AGENCIA
                map01.put("A2548TARIA", lst.lst_Ini.get(vi).A2548TARIA);
                map01.put("A2548TTAXA", lst.lst_Ini.get(vi).A2548TTAXA);
                map01.put("A2548SERVA", lst.lst_Ini.get(vi).A2548SERVA);
                map01.put("A2548COMIA", lst.lst_Ini.get(vi).A2548COMIA);
                map01.put("A2548SCOMA", lst.lst_Ini.get(vi).A2548SCOMA);
                map01.put("A2548TAXCA", lst.lst_Ini.get(vi).A2548TAXCA);
                map01.put("A2548PORCA", lst.lst_Ini.get(vi).A2548PORCA);
                map01.put("A2548PENAA", lst.lst_Ini.get(vi).A2548PENAA);
                map01.put("A2548FEEA", lst.lst_Ini.get(vi).A2548FEEA);
                map01.put("A2548TOTAA", lst.lst_Ini.get(vi).A2548TOTAA);
                //DIFEREN
                map01.put("A2548TARID", lst.lst_Ini.get(vi).A2548TARID);
                map01.put("A2548TTAXD", lst.lst_Ini.get(vi).A2548TTAXD);
                map01.put("A2548COMID", lst.lst_Ini.get(vi).A2548COMID);
                map01.put("A2548SCOMD", lst.lst_Ini.get(vi).A2548SCOMD);
                map01.put("A2548TAXCD", lst.lst_Ini.get(vi).A2548TAXCD);
                map01.put("A2548PORCD", lst.lst_Ini.get(vi).A2548PORCD);
                map01.put("A2548PENAD", lst.lst_Ini.get(vi).A2548PENAD);
                map01.put("A2548FEED", lst.lst_Ini.get(vi).A2548FEED);
                map01.put("A2548TTACD", lst.lst_Ini.get(vi).A2548TTACD);
                map01.put("A2548TTAMD", lst.lst_Ini.get(vi).A2548TTAMD);
                map01.put("A2548TCARD", lst.lst_Ini.get(vi).A2548TCARD);
                map01.put("A2548IVACD", lst.lst_Ini.get(vi).A2548IVACD);
                map01.put("A2548IVACS", lst.lst_Ini.get(vi).A2548IVACS);
                map01.put("A2548IVACA", lst.lst_Ini.get(vi).A2548IVACA);
                map01.put("A2548TOTAD", lst.lst_Ini.get(vi).A2548TOTAD);
                map01.put("A2548SERVD", lst.lst_Ini.get(vi).A2548SERVD);
                map01.put("A2548NETO", lst.lst_Ini.get(vi).A2548NETO);
                map01.put("A2548NRCOR", lst.lst_Ini.get(vi).A2548NRCOR);

                lst_dataIni.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_CalcuArelonia">
            for (int vi = 0; vi < lst.lst_CalcuArelonia.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A1580FROM", lst.lst_CalcuArelonia.get(vi).A1580FROM);
                map02.put("A1580TO", lst.lst_CalcuArelonia.get(vi).A1580TO);
                map02.put("A1580CLASE", lst.lst_CalcuArelonia.get(vi).A1580CLASE);
                map02.put("A1580FBASI", lst.lst_CalcuArelonia.get(vi).A1580FBASI);
                map02.put("A1580RUTAC", lst.lst_CalcuArelonia.get(vi).A1580RUTAC);
                map02.put("CODIT", lst.lst_CalcuArelonia.get(vi).CODIT);

                map02.put("A1580FMIOR", lst.lst_CalcuArelonia.get(vi).A1580FMIOR);
                map02.put("A1580QMIOR", lst.lst_CalcuArelonia.get(vi).A1580QMIOR);
                map02.put("TotalFare", lst.lst_CalcuArelonia.get(vi).TotalFare);
                map02.put("A1580FAORI", lst.lst_CalcuArelonia.get(vi).A1580FAORI);
                map02.put("A1580CHAMI", lst.lst_CalcuArelonia.get(vi).A1580CHAMI);
                map02.put("A1580TOTMI", lst.lst_CalcuArelonia.get(vi).A1580TOTMI);
                map02.put("TotalTKT", lst.lst_CalcuArelonia.get(vi).TotalTKT);

                lst_CalculosAreol.add(map02);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_CalcuImpuestos">
            for (int vi = 0; vi < lst.lst_CalcuImpuestos.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A1673CDTAX", lst.lst_CalcuImpuestos.get(vi).A1673CDTAX);
                map03.put("A1673TXORI", lst.lst_CalcuImpuestos.get(vi).A1673TXORI);
                map03.put("A1673TXMIA", lst.lst_CalcuImpuestos.get(vi).A1673TXMIA);
                map03.put("A1673TXDIF", lst.lst_CalcuImpuestos.get(vi).A1673TXDIF);
                map03.put("A1673CDATO", lst.lst_CalcuImpuestos.get(vi).A1673CDATO);

                lst_CalculosImpuestos.add(map03);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_RazonEmision">
            for (int vi = 0; vi < lst.lst_Calcurazones.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A2553CNXPA", lst.lst_Calcurazones.get(vi).A2553CNXPA);
                map04.put("A2553TYPO", lst.lst_Calcurazones.get(vi).A2553TYPO);
                map04.put("A2553CODE", lst.lst_Calcurazones.get(vi).A2553CODE);
                map04.put("A2553DESCR", lst.lst_Calcurazones.get(vi).A2553DESCR);

                lst_RazonEmision.add(map04);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_dataIni", lst_dataIni);
        map.put("lst_CalculosAreol", lst_CalculosAreol);
        map.put("lst_CalculosImpuestos", lst_CalculosImpuestos);
        map.put("lst_RazonEmision", lst_RazonEmision);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchTasaIva")
    public @ResponseBody
    String SearchTasaIva(ModelMap map, HttpServletRequest request) {
        A3807Filter filter = new A3807Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ADMReportLogic logic = new ADMReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3807Filter> lst_search = logic.SearchTasaIva(filter);

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

}
