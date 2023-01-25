package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SalesAdjustmentLogic;
import net.miatech.praxis.logic.payments.SalesReconciliAmexLogic;
import net.miatech.praxis.payment.filter.A4116Filter;
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

@Controller
@Scope("request")
@RequestMapping("/SalesAdjustment")
public class SalesAdjustmentController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesAdjustmentLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesAdjustment/form_index";
    }

    @RequestMapping(value = "searchAdjustment")
    public @ResponseBody
    String searchAdjustment(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchAdjustment-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListAdjustment(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListAdjustment(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAdjustmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX599SQP04472(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getAdjustmentCodes")
    public @ResponseBody
    String getCodes(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getAdjustmentCodes-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListGetAdjustmentCodes(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListGetAdjustmentCodes(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAdjustmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04470(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "searchDetTktSettlement")
    public @ResponseBody
    String searchDetTktSettlement(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : searchDetTktSettlement-------------");

        map.put("success", true);
        List<A4116Filter> lst = this.getListDetTktSettlement(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4116Filter> getListDetTktSettlement(HttpServletRequest request, Boolean bExcel) {

        List<A4116Filter> lst = new ArrayList<>(0);
        A4116Filter filter = new A4116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new SalesAdjustmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

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

            lst = logic.loadPX570SQP04540(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchTransactionErrorDetail")
    public @ResponseBody
    String searchTransactionErrorDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Adjustment - Double Payment : searchTransactionErrorDetail-------------");

        Gson gson = new Gson();
        A4116Filter filter = new A4116Filter();
        A4116Filter result = new A4116Filter();
        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A4116Filter.class);

        logic = new SalesAdjustmentLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX570SQP04359(filter);
//            lstInfo = logic.loadPX570SQP04395(result);
            map.put("result", result);
            map.put("lstInfo", lstInfo);
            map.put("success", true);
        } catch (Exception ex) {
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceDoublePayment")
    public @ResponseBody
    String MaintenanceErrorTransaction(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Adjustment - Double Payment : MaintenanceDoublePayment-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4116Filter filter = new A4116Filter();
            A4116Filter result = new A4116Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4116Filter.class);

            logic = new SalesAdjustmentLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX599SQP04542(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("banksCatalog : getXLSX");
//
//        String fileNameDownload = String.format("banksCatalog - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A2281> listaData = this.getList(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("ReasonCodeReport");
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
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Bank");
//            CH1_04.setCellValue("Curr.");
//            CH1_05.setCellValue("Commision Rate");
//            CH1_08.setCellValue("Rate");
//            CH1_09.setCellValue("Cliente");
//            CH1_10.setCellValue("Status");
//            CH1_11.setCellValue("Bank");
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
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
//
//            //*******************
//            ++vj;
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//
//            CH2_01.setCellValue("Ctry");
//            CH2_02.setCellValue("Code");
//            CH2_03.setCellValue("Name");
//            CH2_05.setCellValue("Normal");
//            CH2_06.setCellValue("Promotional 1");
//            CH2_07.setCellValue("Promotional 2");
//            CH2_08.setCellValue("IVA");
//            CH2_11.setCellValue("Status");
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
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
//
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcel20 = row.createCell(10);
//                Cell rcel21 = row.createCell(11);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).COUNTRY);
//                rcell2.setCellValue(listaData.get(vi).CODEBANK);
//                rcell3.setCellValue(listaData.get(vi).NAMEBANK);
//                rcell4.setCellValue(listaData.get(vi).CURRENC);
//                rcell5.setCellValue(listaData.get(vi).RATECON);
//                rcell6.setCellValue(listaData.get(vi).RATECOP1);
//                rcell7.setCellValue(listaData.get(vi).RATECOP2);
//                rcell8.setCellValue(listaData.get(vi).RATEIVA);
//                rcell9.setCellValue(listaData.get(vi).CLIENTE);
//                rcel20.setCellValue(listaData.get(vi).FSTAT);
//                rcel21.setCellValue(listaData.get(vi).FINSUMO);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//
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
//    }
//
//    @RequestMapping(value = "MaintenanceA2280")
//    public @ResponseBody
//    String MaintenanceA2280(ModelMap map, HttpServletRequest request) {
//
//        System.out.println("-------------- SalesAdjustment : MaintenanceA2280-------------");
//        String option;
//        A2281 filter = new A2281();
//        Gson gson = new Gson();
//        String msj = "";
//        String beanString = "";
//
//        try {
//
//            option = request.getParameter("option");
//            beanString = request.getParameter("beanString");
//            filter = gson.fromJson(beanString, A2281.class);
//
//            logic = new SalesAdjustmentLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            msj = logic.loadPX267SQP00672(filter, option);
//
//            map.put("success", true);
//            map.put("Mensaje", msj);
//        } catch (NumberFormatException | SQLException ex) {
//            map.put("success", false);
//            map.put("Mensaje", ex.getMessage());
//        } catch (Exception ex) {
//            map.put("success", false);
//            map.put("Mensaje", ex.getMessage());
//        }
//        return new Gson().toJson(map);
//    }
//
//    @RequestMapping(value = "searchCompleteDetail")
//    public @ResponseBody
//    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- SalesAdjustment : searchCompleteDetail-------------");
//
//        Gson gson = new Gson();
//        A2280Filter filter = new A2280Filter();
//        A2281 result = new A2281();
//
//        String beanString = request.getParameter("beanString");
//        filter = gson.fromJson(beanString, A2280Filter.class);
//
//        logic = new SalesAdjustmentLogic();
//        logic.setSession(this.serverSession.getServerSession());
//        try {
//            result = logic.loadPX267SQP00673(filter);
//            map.put("result", result);
//            map.put("success", true);
//        } catch (Exception ex) {
//            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
//            map.put("success", false);
//        }
//        return new Gson().toJson(map);
//    }
}

//        @RequestMapping(value = "search")
//    public @ResponseBody
//    String search(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- SalesAdjustment : search-------------");
//        
//        Gson gson = new Gson();
//        A2280Filter filter = new A2280Filter();
//        A2280Filter result = new A2280Filter();
//        
//        String beanString = request.getParameter("beanString");
//        filter = gson.fromJson(beanString, A2280Filter.class);
//        
//        logic = new SalesAdjustmentLogic();
//        logic.setSession(this.serverSession.getServerSession());
//        try {
//            result = logic.loadPX267SQP00671(filter);
//            map.put("result", result);
//            map.put("success", true);
//        } catch (Exception ex) {
//            java.util.logging.Logger.getLogger(SalesAdjustmentController.class.getName()).log(Level.SEVERE, null, ex);
//            map.put("success", false);
//        }
//
//        return new Gson().toJson(map);
//    }

