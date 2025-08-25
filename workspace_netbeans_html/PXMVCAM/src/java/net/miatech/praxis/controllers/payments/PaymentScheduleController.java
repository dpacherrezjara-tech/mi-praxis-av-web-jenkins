
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import org.apache.poi.ss.usermodel.Cell;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.PaymentScheduleLogic;
import net.miatech.praxis.payment.filter.MPF116Filter;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author ftorres
 */


@Controller
@Scope("request")
@RequestMapping("/PaymentSchedule")



public class PaymentScheduleController extends BaseController{
    
    
    private PaymentScheduleLogic logic;

//    @Autowired
//    private ExportUtils exportUtils;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;

    
    
    
    
       @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        
        
        System.out.println("xxxxx");
        return "payments/PaymentSchedule/form_index";
    }
    
    
    ///////////////LISTA////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    
    @RequestMapping(value = "searchGrid")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PAYMENTSCHEDULE :SearchGrid-------------");
        map.put("success", true);
        List<MPF116Filter> lst = this.getListA051Search(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    public List<MPF116Filter> getListA051Search(HttpServletRequest request, Boolean bExcel) {

        List<MPF116Filter> lst = new ArrayList<>(0);
        MPF116Filter filter = new MPF116Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PaymentScheduleLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF116Filter.class);
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

                lst = logic.loadPX692LISTAR_SCHEDULE_MPF116(filter);
            } catch (Exception e) {
                throw new SpringException(e);
            }
            return lst;
        }
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL   /////////////////
    ///////////////////////////////////////////////////////////////////////77
    
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        MPF116Filter filter = new MPF116Filter();
        String fileNameDownload = String.format("Report Payment Schedule - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            PaymentScheduleLogic logic = new PaymentScheduleLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<MPF116Filter> listaData = logic.loadPX692LISTAR_SCHEDULE_MPF116(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
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

            CH1_0.setCellValue("AGENT CODE");
            CH1_1.setCellValue("AGENT NAME");
            CH1_2.setCellValue("SALE TYPE");
            CH1_3.setCellValue("COUNTRY");
            CH1_4.setCellValue("GROUP");
            CH1_5.setCellValue("PAYMENT");
            CH1_6.setCellValue("CANAL");
            
            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            ++vj;
            //============================================

            
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

                rcell0.setCellValue(listaData.get(vi).SAGENT);
                rcell1.setCellValue(listaData.get(vi).NAMEAG);
                rcell2.setCellValue(listaData.get(vi).TVENTA);
                rcell3.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell4.setCellValue(listaData.get(vi).AGROUPD);
                rcell5.setCellValue(listaData.get(vi).SUBFTE);
                rcell5.setCellValue(listaData.get(vi).FPAGO);
                rcell6.setCellValue(listaData.get(vi).SUBFTE);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
           
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);

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
    
    
    ////TEMRINA EL EXCEL /////////////////////////
    
    
    
    
    @RequestMapping(value = "getPaises")
    public @ResponseBody
    String getPaises(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PaymenteSchedule : getPaises-------------");

        map.put("success", true);
        List<MPF116Filter> lst = this.getListGetPaises(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("listaPaises", lst);
        return new Gson().toJson(map);
    }

    public List<MPF116Filter> getListGetPaises(HttpServletRequest request, Boolean bExcel) {

        List<MPF116Filter> lst = new ArrayList<>(0);
        MPF116Filter filter = new MPF116Filter();

        try {
            logic = new PaymentScheduleLogic();
            logic.setSession(this.serverSession.getServerSession());


            lst = logic.loadPRAXISMPLISTAR_PAISES_CBO(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }
    
    
    
    ////LLENAR UPDATE
    
    
    @RequestMapping(value = "MaintenanceMPF116")
    public @ResponseBody
    String MaintenanceMPF116(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- PAYMENTSCHEDULE : MaintenanceMPF116-------------");
//        String option;
        MPF116Filter filter = new MPF116Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {
//            option = request.getParameter("option");
//            filter.CCUST = request.getParameter("CCUST");
//            filter.SAGENT = request.getParameter("SAGENT");
//            filter.NEW_SAGENT = request.getParameter("NEW_SAGENT");

            logic = new PaymentScheduleLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF116Filter.class);
            
            
            msj = logic.MPF116UPDATE_PAYMENT_SCHEDULE(filter);

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
    
    
    /////////////////////////////////////////////////////////////////////////
     ////////////////    DESCARGA EXCEL CON API   ////////////////////
     /////////////////////////////////////////////////////////////////////////
    
    
//    
//     @RequestMapping(value = "downloadPaymentSchedule", method = RequestMethod.POST)
//    public ResponseEntity<?> downloadPaymentSchedule(@RequestBody MPF116Filter filter) throws Exception {
//        System.out.println("***** PaymentSchedule Report - downloadPaymentSchedule *****");
//        String zipName = "PaymentScheduleFile_" + Functions.getFechaActual() + Functions.getHoraActual();
//        Gson gson = new Gson();
//        Map<String, Object> map = new HashMap();
//        map.put("IN_CCUST", cs.getServerSession().getUserView().getCustomerInfo().CCUST.trim());
//        map.put("IN_SAGENT", filter.getIN_SAGENT().trim());
//        map.put("IN_AGROUPD", filter.getIN_AGROUPD().trim());
//        map.put("IN_SCOUNTRY", filter.getSCOUNTRY().trim());
//        map.put("IO_PAGNUM", -1);
//        map.put("IO_PAGROW", -1);
//        map.put("IO_TOTPAG", -1);
//        map.put("IO_TOTROW", -1);
//                                              
//        byte[] file = ws.getFile(gson.toJson(map), "PaymentSchedule/downloadPaymentSchedule");
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//        headers.setContentDispositionFormData("attachment", zipName + ".zip");
//        return new ResponseEntity<>(file, headers, HttpStatus.OK);
//
//    }


    
}
