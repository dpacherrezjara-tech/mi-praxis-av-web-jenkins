package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.sales.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1741Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterTAXLogic;
import net.miatech.utils.Functions;
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

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingMasterTAX")
public class AccountingMasterTAXController extends BaseController {

    private AccountingMasterTAXLogic logic;
    private A1741Filter filter;

    @RequestMapping(value = "/loadCombo")
    public @ResponseBody
    String loadCombo(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        List<A006> listaData2;
        List<A051> listaData3;
        try {
            logic = new AccountingMasterTAXLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadCountry();
            listaData2 = logic.loadCurrency();
            listaData3 = logic.loadTax();
            map.put("success", true);
            map.put("lstCountry", listaData);
            map.put("lstCurrency", listaData2);
            map.put("lstTax", listaData3);

        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1741Filter> listaData;
        filter = new A1741Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.IN_A1741PAIS = request.getParameter("IN_A1741PAIS").trim();
            filter.IN_A1741MONED = request.getParameter("IN_A1741MONED").trim();
            filter.IN_A1741CODE = request.getParameter("IN_A1741CODE").trim();
            filter.IN_A1741TIPO = request.getParameter("IN_A1741TIPO").trim();
            filter.A1741CTA = request.getParameter("A1741CTA").trim();
            filter.A1741SCTA = request.getParameter("A1741SCTA").trim();
            filter.A1741CTRL = request.getParameter("A1741CTRL").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new AccountingMasterTAXLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX126S02A1741(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);

        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        String strOption;
        filter = new A1741Filter();
        try {
            strOption = request.getParameter("strOption");
            filter.A1741TIPO = request.getParameter("A1741TIPO");
            filter.A1741INTNU = request.getParameter("A1741INTNU");
            filter.A1741PAIS = request.getParameter("A1741PAIS");
            filter.A1741CODE = request.getParameter("A1741CODE");
            filter.A1741MONED = request.getParameter("A1741MONED");
            filter.A1741CONCE = request.getParameter("A1741CONCE");
            filter.A1741CIA = request.getParameter("A1741CIA");
            filter.A1741UNIDA = request.getParameter("A1741UNIDA");
            filter.A1741CECOS = request.getParameter("A1741CECOS");
            filter.A1741UBICA = request.getParameter("A1741UBICA");
            filter.A1741CTA = request.getParameter("A1741CTA");
            filter.A1741SCTA = request.getParameter("A1741SCTA");
            filter.A1741EQUI = request.getParameter("A1741EQUI");
            filter.A1741ICIA = request.getParameter("A1741ICIA");
            filter.A1741FINI = request.getParameter("A1741FINI");
            filter.A1741FFIN = request.getParameter("A1741FFIN");
            filter.IN_A1741PAIS_OLD = request.getParameter("IN_A1741PAIS_OLD");
            filter.IN_A1741CODE_OLD = request.getParameter("IN_A1741CODE_OLD");
            filter.IN_A1741TIPO_OLD = request.getParameter("IN_A1741TIPO_OLD");
            filter.A1741CTRL = request.getParameter("A1741CTRL");
            filter.A1741TPTAX = request.getParameter("A1741TPTAX");
            filter.IN_A1741FINI_OLD = request.getParameter("IN_A1741FINI_OLD");
            filter.IN_A1741FFIN_OLD = request.getParameter("IN_A1741FFIN_OLD");
            filter.A1741INTNU = request.getParameter("A1741INTNU");

            logic = new AccountingMasterTAXLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.accountMasterTaxMaintance(filter, strOption);
            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A1741Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.IN_A1741PAIS = request.getParameter("IN_A1741PAIS").trim();
            filter.IN_A1741MONED = request.getParameter("IN_A1741MONED").trim();
            filter.IN_A1741CODE = request.getParameter("IN_A1741CODE").trim();
            filter.IN_A1741TIPO = request.getParameter("IN_A1741TIPO").trim();
            filter.A1741CTA = request.getParameter("A1741CTA").trim();
            filter.A1741SCTA = request.getParameter("A1741SCTA").trim();
            filter.A1741CTRL = request.getParameter("A1741CTRL").trim();

            logic = new AccountingMasterTAXLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1741Filter> listaData = logic.loadPX126S02A1741EXCEL(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master TAX");
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

            CH_00.setCellValue("Type");
            CH_01.setCellValue("Type");
            CH_02.setCellValue("Country");
            CH_03.setCellValue("Tax");
            CH_04.setCellValue("Tax Type");
            CH_05.setCellValue("Controlled");
            CH_06.setCellValue("Currency");
            CH_07.setCellValue("Company");
            CH_08.setCellValue("Unit");
            CH_09.setCellValue("C.Cost");
            CH_10.setCellValue("Location");
            CH_11.setCellValue("Account");
            CH_12.setCellValue("Sub account");
            CH_13.setCellValue("Equipment");
            CH_14.setCellValue("Inter company");
            CH_15.setCellValue("Country Location");
            CH_16.setCellValue("Description");
            CH_17.setCellValue("Effectiveness Start Date");
            CH_18.setCellValue("Effectiveness End date");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 18));

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

                CH_00.setCellValue(listaData.get(vi).A1741TIPO);
                CH_01.setCellValue(listaData.get(vi).A1741TIPO_00);
                CH_02.setCellValue(listaData.get(vi).A1741PAIS);
                CH_03.setCellValue(listaData.get(vi).A1741CODE);
                CH_04.setCellValue(listaData.get(vi).A1741TPTAX);
                CH_05.setCellValue(listaData.get(vi).A1741CTRL);
                CH_06.setCellValue(listaData.get(vi).A1741MONED);
                CH_07.setCellValue(listaData.get(vi).A1741CIA);
                CH_08.setCellValue(listaData.get(vi).A1741UNIDA);
                CH_09.setCellValue(listaData.get(vi).A1741CECOS);
                CH_10.setCellValue(listaData.get(vi).A1741UBICA);
                CH_11.setCellValue(listaData.get(vi).A1741CTA);
                CH_12.setCellValue(listaData.get(vi).A1741SCTA);
                CH_13.setCellValue(listaData.get(vi).A1741EQUI);
                CH_14.setCellValue(listaData.get(vi).A1741ICIA);
                CH_15.setCellValue(listaData.get(vi).A1741INTNU);
                CH_16.setCellValue(listaData.get(vi).A1741CONCE);
                CH_17.setCellValue(listaData.get(vi).A1741FINI);
                CH_18.setCellValue(listaData.get(vi).A1741FFIN);

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

            //String fileNameDownload = String.format("ADM Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            String fileNameDownload = String.format(
                    "Account Master TAX " + Functions.getFechaActual()
                    + "_" + Functions.getHoraActualHHMM().replace(":", "")
                    + " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6))
                    + " " + Functions.getFechaActual().substring(0, 4) + ".xlsx", UUID.randomUUID().toString().toLowerCase()
            );
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
    /*@RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new A1741Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;
//        filter.strExcel="TRUE";

        //String fileNameDownload = String.format("Account Master TAX - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Account Master TAX " + Functions.getFechaActual()
                + "_" + Functions.getHoraActualHHMM().replace(":", "")
                + " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6))
                + " " + Functions.getFechaActual().substring(0, 4) + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );

        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_A1741PAIS = request.getParameter("IN_A1741PAIS").trim();
            filter.IN_A1741MONED = request.getParameter("IN_A1741MONED").trim();
            filter.IN_A1741CODE = request.getParameter("IN_A1741CODE").trim();
            filter.IN_A1741TIPO = request.getParameter("IN_A1741TIPO").trim();
            filter.A1741CTA = request.getParameter("A1741CTA").trim();
            filter.A1741SCTA = request.getParameter("A1741SCTA").trim();
            filter.A1741CTRL = request.getParameter("A1741CTRL").trim();

            logic = new AccountingMasterTAXLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1741Filter> listaData = logic.loadPX126S02A1741EXCEL(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master TAX");
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

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Type");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Type");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Country");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Tax");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Tax Type");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Controlled");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Currency");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Company");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Unit");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("C.Cost");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Location");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Account");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Sub account");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Equipment");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Inter company");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Description");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Effectiveness");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 17));

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
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);

            Cell CH2_16 = row2.createCell(16);
            CH2_16.setCellValue("Start Date");
            Cell CH2_17 = row2.createCell(17);
            CH2_17.setCellValue("End date");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));

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

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);

                cell50.setCellValue(listaData.get(vi).A1741TIPO);
                cell51.setCellValue(listaData.get(vi).A1741TIPO_00);
                cell52.setCellValue(listaData.get(vi).A1741PAIS);
                cell53.setCellValue(listaData.get(vi).A1741CODE);
                cell54.setCellValue(listaData.get(vi).A1741TPTAX);
                cell55.setCellValue(listaData.get(vi).A1741CTRL);
                cell56.setCellValue(listaData.get(vi).A1741MONED);
                cell57.setCellValue(listaData.get(vi).A1741CIA);
                cell58.setCellValue(listaData.get(vi).A1741UNIDA);
                cell59.setCellValue(listaData.get(vi).A1741CECOS);
                cell60.setCellValue(listaData.get(vi).A1741UBICA);
                cell61.setCellValue(listaData.get(vi).A1741CTA);
                cell62.setCellValue(listaData.get(vi).A1741SCTA);
                cell63.setCellValue(listaData.get(vi).A1741EQUI);
                cell64.setCellValue(listaData.get(vi).A1741ICIA);
                cell65.setCellValue(listaData.get(vi).A1741CONCE);
                cell66.setCellValue(listaData.get(vi).A1741FINI);
                cell67.setCellValue(listaData.get(vi).A1741FFIN);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);
                cell64.setCellStyle(bodyStyle);
                cell65.setCellStyle(bodyStyle);
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);

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
                // </editor-fold>

                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }*/
}
