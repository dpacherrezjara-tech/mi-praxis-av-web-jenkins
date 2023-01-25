package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="import">
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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1736Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AccountingMasterClientLogic;
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
@RequestMapping("/AccountingMasterClient")
public class AccountingMasterClientController extends BaseController {

    private AccountingMasterClientLogic logic;
    private A1736Filter filter;

    @RequestMapping(value = "/loadCombo")
    public @ResponseBody
    String loadCombo(ModelMap map, HttpServletRequest request) {
        map.put("success", false);
        try {
            logic = new AccountingMasterClientLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            List<A051> lstCountry = logic.loadCountry();
            List<A006> lstCurrency = logic.loadCurrency();
            List<String> lstSubFu = logic.loadSubFu();
            List<String> lstFP = logic.loadFP();
            List<A051> lstTypeCC = logic.loadTypeCC();

            map.put("success", true);
            map.put("lstCountry", lstCountry);
            map.put("lstCurrency", lstCurrency);
            map.put("lstSubFu", lstSubFu);
            map.put("lstFP", lstFP);
            map.put("lstTypeCC", lstTypeCC);
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        map.put("success", false);
        filter = new A1736Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new AccountingMasterClientLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1736Filter> listaData = logic.loadPX128S01A1736(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        String strOption;
        filter = new A1736Filter();
        try {
            strOption = request.getParameter("strOption");

            filter.A1736PAIS = request.getParameter("A1736PAIS");
            filter.A1736FUENT = request.getParameter("A1736FUENT");
            filter.A1736TIPO = request.getParameter("A1736TIPO");
            filter.A1736CURR = request.getParameter("A1736CURR");
            filter.A1736NOMBR = request.getParameter("A1736NOMBR");
            filter.A1736FORPG = request.getParameter("A1736FORPG");
            filter.A1736TIDOC = request.getParameter("A1736TIDOC");
            filter.A1736CLIEN = request.getParameter("A1736CLIEN");
            filter.A1736DIREC = request.getParameter("A1736DIREC");
            filter.A1736IATA = request.getParameter("A1736IATA");
            filter.A1736UO = request.getParameter("A1736UO");
            filter.A1736TAXI = request.getParameter("A1736TAXI");
            filter.A1736CIA = request.getParameter("A1736CIA");
            filter.A1736UNID = request.getParameter("A1736UNID");
            filter.A1736CECO = request.getParameter("A1736CECO");
            filter.A1736UBI = request.getParameter("A1736UBI");
            filter.A1736CTAC = request.getParameter("A1736CTAC");
            filter.A1736SCTA = request.getParameter("A1736SCTA");
            filter.A1736EQUI = request.getParameter("A1736EQUI");
            filter.A1736ICIA = request.getParameter("A1736ICIA");
            filter.A1736FINI = request.getParameter("A1736FINI");
            filter.A1736FFIN = request.getParameter("A1736FFIN");
            filter.A1736SUBFU = request.getParameter("A1736SUBFU");
            filter.A1736FP = request.getParameter("A1736FP");
            filter.IN_A1736PAIS_OLD = request.getParameter("IN_A1736PAIS_OLD");
            filter.IN_A1736FUENTE_OLD = request.getParameter("IN_A1736FUENTE_OLD");
            filter.IN_A1736TIPO_OLD = request.getParameter("IN_A1736TIPO_OLD");
            filter.IN_A1736MONEDA_OLD = request.getParameter("IN_A1736MONEDA_OLD");
            filter.IN_A1736SUBFU_OLD = request.getParameter("IN_A1736SUBFU_OLD");
            filter.IN_A1736FP_OLD = request.getParameter("IN_A1736FP_OLD");
            filter.IN_A1736IATA_OLD = request.getParameter("IN_A1736IATA_OLD");
            filter.IN_A1736CIA_OLD = request.getParameter("IN_A1736CIA_OLD");

            logic = new AccountingMasterClientLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.salesAccountMaintanceClient(filter, strOption);
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
        filter = new A1736Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            logic = new AccountingMasterClientLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1736Filter> listaData = logic.loadPX128S01A1736EXCEL(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master Client");
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
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22;
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

            CH_00.setCellValue("Nbr");
            CH_01.setCellValue("Source");
            CH_02.setCellValue("Sub Source");
            CH_03.setCellValue("Form of Payment");
            CH_04.setCellValue("Country");
            CH_05.setCellValue("Type");
            CH_06.setCellValue("Currency");
            CH_07.setCellValue("Description");
            CH_08.setCellValue("Payment");
            CH_09.setCellValue("Payment Type");
            CH_10.setCellValue("Client");
            CH_11.setCellValue("Address");
            CH_12.setCellValue("IATA");
            CH_13.setCellValue("Unit B");
            CH_14.setCellValue("Tax Ref.");
            CH_15.setCellValue("Company");
            CH_16.setCellValue("Unit");
            CH_17.setCellValue("C.Cost");
            CH_18.setCellValue("Location");
            CH_19.setCellValue("Account");
            CH_20.setCellValue("Sub Account");
            CH_21.setCellValue("Equipment");
            CH_22.setCellValue("Inter Company");

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

                CH_00.setCellValue(listaData.get(vi).RN);
                CH_01.setCellValue(listaData.get(vi).A1736FUENT);
                CH_02.setCellValue(listaData.get(vi).A1736SUBFU);
                CH_03.setCellValue(listaData.get(vi).A1736FP);
                CH_04.setCellValue(listaData.get(vi).A1736PAIS);
                CH_05.setCellValue(listaData.get(vi).A1736TIPO);
                CH_06.setCellValue(listaData.get(vi).A1736CURR);
                CH_07.setCellValue(listaData.get(vi).A1736NOMBR);
                CH_08.setCellValue(listaData.get(vi).A1736FORPG);
                CH_09.setCellValue(listaData.get(vi).A1736TIDOC);
                CH_10.setCellValue(listaData.get(vi).A1736CLIEN);
                CH_11.setCellValue(listaData.get(vi).A1736DIREC);
                CH_12.setCellValue(listaData.get(vi).A1736IATA);
                CH_13.setCellValue(listaData.get(vi).A1736UO);
                CH_14.setCellValue(listaData.get(vi).A1736TAXI);
                CH_15.setCellValue(listaData.get(vi).A1736CIA);
                CH_16.setCellValue(listaData.get(vi).A1736UNID);
                CH_17.setCellValue(listaData.get(vi).A1736CECO);
                CH_18.setCellValue(listaData.get(vi).A1736UBI);
                CH_19.setCellValue(listaData.get(vi).A1736CTAC);
                CH_20.setCellValue(listaData.get(vi).A1736SCTA);
                CH_21.setCellValue(listaData.get(vi).A1736EQUI);
                CH_22.setCellValue(listaData.get(vi).A1736ICIA);

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

            //String fileNameDownload = String.format("ADM Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            String fileNameDownload = String.format(
                    "Account Master Client " + Functions.getFechaActual()
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
        filter = new A1736Filter();
        
        //String fileNameDownload = String.format("Account Master Client - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String fileNameDownload = String.format(
                "Account Master Client " + Functions.getFechaActual() + 
                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
        );
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            
            
            logic = new AccountingMasterClientLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1736Filter> listaData = logic.loadPX128S01A1736(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Account Master Client");
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
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Source");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Sub Source");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Form of Payment");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Country");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Type");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Currency");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Description");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Payment");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Payment Type");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Client");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Address");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("IATA");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Unit B");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Tax Ref.");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Company");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Unit");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("C.Cost");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("Location");
            Cell CH1_19 = row.createCell(19);
            CH1_19.setCellValue("Account");
            Cell CH1_20 = row.createCell(20);
            CH1_20.setCellValue("Sub Account");
            Cell CH1_21 = row.createCell(21);
            CH1_21.setCellValue("Equipment");
            Cell CH1_22 = row.createCell(22);
            CH1_22.setCellValue("Inter Company");

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
                Cell cell68 = row.createCell(18);
                Cell cell69 = row.createCell(19);
                Cell cell70 = row.createCell(20);
                Cell cell71 = row.createCell(21);
                Cell cell72 = row.createCell(22);

                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).A1736FUENT);
                cell52.setCellValue(listaData.get(vi).A1736SUBFU);
                cell53.setCellValue(listaData.get(vi).A1736FP);
                cell54.setCellValue(listaData.get(vi).A1736PAIS);
                cell55.setCellValue(listaData.get(vi).A1736TIPO);
                cell56.setCellValue(listaData.get(vi).A1736CURR);
                cell57.setCellValue(listaData.get(vi).A1736NOMBR);
                cell58.setCellValue(listaData.get(vi).A1736FORPG);
                cell59.setCellValue(listaData.get(vi).A1736TIDOC);
                cell60.setCellValue(listaData.get(vi).A1736CLIEN);
                cell61.setCellValue(listaData.get(vi).A1736DIREC);
                cell62.setCellValue(listaData.get(vi).A1736IATA);
                cell63.setCellValue(listaData.get(vi).A1736UO);
                cell64.setCellValue(listaData.get(vi).A1736TAXI);
                cell65.setCellValue(listaData.get(vi).A1736CIA);
                cell66.setCellValue(listaData.get(vi).A1736UNID);
                cell67.setCellValue(listaData.get(vi).A1736CECO);
                cell68.setCellValue(listaData.get(vi).A1736UBI);
                cell69.setCellValue(listaData.get(vi).A1736CTAC);
                cell70.setCellValue(listaData.get(vi).A1736SCTA);
                cell71.setCellValue(listaData.get(vi).A1736EQUI);
                cell72.setCellValue(listaData.get(vi).A1736ICIA);

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
                cell68.setCellStyle(bodyStyle);
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                cell71.setCellStyle(bodyStyle);
                cell72.setCellStyle(bodyStyle);

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
