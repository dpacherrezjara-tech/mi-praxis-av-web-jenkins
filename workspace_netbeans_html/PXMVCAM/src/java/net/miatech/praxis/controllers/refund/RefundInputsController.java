/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.refund;
import java.io.IOException;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.Pagination;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.refund.RefundInputsLogic;
import net.miatech.praxis.refund.A2745;
import net.miatech.praxis.refund.filter.A3096Filter;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author ftorres
 */
@Controller
@Scope("request")
@RequestMapping("/RefundInputs")

public class RefundInputsController extends BaseController {

    private RefundInputsLogic logic;

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
    
    
    @RequestMapping(value = "searchV1")
    public @ResponseBody
    String searchV1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LOG SEARCH : searchV1-------------");
        map.put("success", true);
        List<A2745> lst = this.getListSearchV1(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }
    
    
      public List<A2745> getListSearchV1(HttpServletRequest request, Boolean bExcel) {

        List<A2745> lst = new ArrayList<>(0);
        A2745 filter = new A2745();
        Gson gson = new Gson();
        String beanString = "";
        RefundInputsLogic logic = new RefundInputsLogic();
        try {
            logic = new RefundInputsLogic();
            logic.setSession(cs.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2745.class);
            
            if (filter.page == null) {
    filter.page = new Pagination();
}
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

            lst = logic.obtenerLstControlV1(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
      // DETALLE 
      
      @RequestMapping(value = "searchTktDetail")
    public @ResponseBody
    String searchTktDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Comments Master : searchTktDetail-------------");
        map.put("success", true);
        List<A2745> lst = this.getListTktDetail(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2745> getListTktDetail(HttpServletRequest request, Boolean bExcel) {

        List<A2745> lst = new ArrayList<>(0);
        A2745 filter = new A2745();
        Gson gson = new Gson();
        String beanString = "";
        RefundInputsLogic logic = new RefundInputsLogic();
        try {
            logic = new RefundInputsLogic();
            logic.setSession(cs.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2745.class);
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

            lst = logic.getListTktDetail(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    
    //DETAIL 2
    
    
    @RequestMapping(value = "searchTktDetailAll")
    public @ResponseBody
    String searchTktDetailAll(ModelMap map, HttpServletRequest request, HttpServletResponse response)throws IOException {
        System.out.println("-------------- Comments Master : searchTktDetailAll-------------");
        map.put("success", true);

        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        List<A2745> lst = this.getListTktDetailAll(request, dw_excel);

        map.put("success", true);
        if (dw_excel) {
            for (A2745 item : lst) {
                String value = item.FSELEC; // suponiendo que el campo es público
                if (value != null) {
                    switch (value) {
                        case "A":
                            item.FSELEC = "Aceptado para el procesamiento en BSPLink";
                            break;
                        case "B":
                            item.FSELEC = "El ticket no cumple con los 13 digitos (CUST + FORM + SERIES)";
                            break;
                        case "C":
                            item.FSELEC = "Metodo de pago no identificado";
                            break;
                        case "D":
                            item.FSELEC = "Inconsistencia entre el monto del impuesto y el detalle del impuesto";
                            break;
                        case "E":
                            item.FSELEC = "Fecha de emision no proporcionada";
                            break;
                        case "F":
                            item.FSELEC = "Estado de la solicitud no proporcionado";
                            break;
                        case "G":
                            item.FSELEC = "Inconsistencia en el monto entre impuesto y detalle del impuesto";
                            break;
                        case "H":
                            item.FSELEC = "Estado de reembolso no especificado para el impuesto";
                            break;
                        case "I":
                            item.FSELEC = "El codigo IATA no cumple con 8 digitos";
                            break;
                        case "J":
                            item.FSELEC = "Motivo de reembolso no especificado";
                            break;
                        case "K":
                            item.FSELEC = "El ticket en conjuncion no cumple con los 13 digitos (CUST + FORM + SERIES)";
                            break;
                        case "L":
                            item.FSELEC = "Monto no informado en el ticket";
                            break;
                        case "M":
                            item.FSELEC = "Inconsistencia en el monto total del reembolso";
                            break;
                        case "N":
                            item.FSELEC = "Numero de reembolso no proporcionado";
                            break;
                        case "O":
                            item.FSELEC = "Tipo de tarjeta no informado";
                            break;
                        case "P":
                            item.FSELEC = "Pais no proporcionado";
                            break;
                        case "Q":
                            item.FSELEC = "XF Mal ingresado";
                            break;
                        case "R":
                            item.FSELEC = "Existe un ticket autorizado";
                            break;
                        case "S":
                            item.FSELEC = "Monto de la Comision Invalido";
                            break;
                        case "T":
                            item.FSELEC = "Inconsistencia en el detalle del impuesto respecto a la suma del impuesto";
                            break;
                        case "U":
                            item.FSELEC = "-";
                            break;
                        case "V":
                            item.FSELEC = "-";
                            break;
                        case "W":
                            item.FSELEC = "-";
                            break;
                        case "Z":
                            item.FSELEC = "-";
                            break;
                        default:
                            break; // deja el valor como esta
                        }

                }
            }

            ExportUtil.exportFields(request, response, lst);
        } else {
            map.put("data", lst);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        }

        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
//        return new Gson().toJson(map);
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    
    public List<A2745> getListTktDetailAll(HttpServletRequest request, Boolean bExcel) {

        List<A2745> lst = new ArrayList<>(0);
        A2745 filter = new A2745();
        Gson gson = new Gson();
        String beanString = "";
        RefundInputsLogic logic = new RefundInputsLogic();
        try {
            logic = new RefundInputsLogic();
            logic.setSession(cs.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2745.class);
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

            lst = logic.getListTktDetailAll(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    

//    
//    @RequestMapping(value = "searchAvianca")
//    public @ResponseBody
//    String searchAvianca(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("ControlBsplinkProcessController : searchAvianca");
//        HashMap m = new HashMap();
//        logic = new ControlBsplinkProcessLogic();
//        List<A3096Filter> lstData = new ArrayList<>(0);
//        A3096Filter filter = new A3096Filter();
//        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
//        try {
//            logic.setSession(cs.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (false) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lstData = logic.loadRFS0034(filter);
//
//            m.put("success", true);
//
//            if (dw_excel) {
//
//                ExportUtil.exportFields(request, response, lstData);
//            } else {
//                m.put("data", lstData);
//                m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
//            }
//
//        } catch (Exception e) {
//            m.put("success", false);
//
//        }
//
//        return new Gson().toJson(m);
//    }


    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL   /////////////////
    ///////////////////////////////////////////////////////////////////////77
//
//    
//    @RequestMapping(value = "getXLSX")
//public void getXLSX(HttpServletRequest request,
//                    HttpServletResponse response) throws Exception {
//
//    System.out.println("ControlBsplinkProcessController : getXLSX");
//
//    A3096Filter filter = new A3096Filter();
//
//    String fileNameDownload =
//            "BSPLink_Avianca_" + Functions.getFechaActual() + ".xlsx";
//
//    try {
//
//        Workbook workbook;
//        File file = File.createTempFile(fileNameDownload, ".xlsx");
//
//        logic = new ControlBsplinkProcessLogic();
//
//        logic.setSession(cs.getServerSession());
//
//        filter = new Gson().fromJson(
//                request.getParameter("beanString"),
//                filter.getClass()
//        );
//
//        filter.page.PAGROW = -1;
//        filter.page.PAGNUM = 1;
//
//        List<A3096Filter> listaData = logic.loadRFS0034(filter);
//
//        workbook = new XSSFWorkbook();
//
//        Sheet sheet = workbook.createSheet("BSPLink Avianca");
//
//        XSSFCellStyle headerStyle =
//                (XSSFCellStyle) workbook.createCellStyle();
//
//        XSSFCellStyle bodyStyle =
//                (XSSFCellStyle) workbook.createCellStyle();
//
//        Font headerFont = workbook.createFont();
//
//        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//
//        headerFont.setColor(IndexedColors.BLACK.getIndex());
//
//        // HEADER STYLE
//        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//
//        headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//
//        headerStyle.setFillForegroundColor(
//                new XSSFColor(new java.awt.Color(127, 152, 168))
//        );
//
//        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//
//        headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//
//        headerStyle.setFont(headerFont);
//
//        // BODY STYLE
//        bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//
//        int vi = 0;
//        int vj = 0;
//
//        Iterator iter = listaData.iterator();
//
//        // ================= HEADERS =================
//
//        Row row1 = sheet.createRow(vj);
//
//        Cell CH0 = row1.createCell(0);
//        Cell CH1 = row1.createCell(1);
//        Cell CH2 = row1.createCell(2);
//        Cell CH3 = row1.createCell(3);
//        Cell CH4 = row1.createCell(4);
//        Cell CH5 = row1.createCell(5);
//        Cell CH6 = row1.createCell(6);
//
//        CH0.setCellValue("Load Date");
//        CH1.setCellValue("File Date");
//        CH2.setCellValue("Total");
//        CH3.setCellValue("Pending");
//        CH4.setCellValue("Approved");
//        CH5.setCellValue("Rejected");
//        CH6.setCellValue("Processed");
//
//        CH0.setCellStyle(headerStyle);
//        CH1.setCellStyle(headerStyle);
//        CH2.setCellStyle(headerStyle);
//        CH3.setCellStyle(headerStyle);
//        CH4.setCellStyle(headerStyle);
//        CH5.setCellStyle(headerStyle);
//        CH6.setCellStyle(headerStyle);
//
//        ++vj;
//
//        // ================= DATA =================
//
//        while (iter.hasNext()) {
//
//            row1 = sheet.createRow(vj);
//
//            Cell r0 = row1.createCell(0);
//            Cell r1 = row1.createCell(1);
//            Cell r2 = row1.createCell(2);
//            Cell r3 = row1.createCell(3);
//            Cell r4 = row1.createCell(4);
//            Cell r5 = row1.createCell(5);
//            Cell r6 = row1.createCell(6);
//
//            String secuencia =
//                    listaData.get(vi).A3096RBT1 == null
//                    ? "00"
//                    : listaData.get(vi).A3096RBT1;
//
//            r0.setCellValue(
//                    listaData.get(vi).A3096DAUTH + " - " + secuencia
//            );
//
//            r1.setCellValue(listaData.get(vi).FILEFCAR);
//
//            r2.setCellValue(listaData.get(vi).QTY_TOTAL_TICKETS);
//
//            r3.setCellValue(listaData.get(vi).QTY_PENDIENTE);
//
//            r4.setCellValue(listaData.get(vi).QTY_AUTORIZADO);
//
//            r5.setCellValue(listaData.get(vi).QTY_RECHAZADO);
//
//            r6.setCellValue(
//                    "P".equals(listaData.get(vi).A3096PROCESSED)
//                    ? "Pending"
//                    : "Finished"
//            );
//
//            r0.setCellStyle(bodyStyle);
//            r1.setCellStyle(bodyStyle);
//            r2.setCellStyle(bodyStyle);
//            r3.setCellStyle(bodyStyle);
//            r4.setCellStyle(bodyStyle);
//            r5.setCellStyle(bodyStyle);
//            r6.setCellStyle(bodyStyle);
//
//            iter.next();
//
//            ++vi;
//            ++vj;
//        }
//
//        // ================= AUTOSIZE =================
//
//        for (int i = 0; i <= 6; i++) {
//            sheet.autoSizeColumn(i, true);
//        }
//
//        // ================= RESPONSE =================
//
//        response.setContentType(
//                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//        );
//
//        response.setHeader(
//                "Content-Disposition",
//                "attachment; filename=\"" + fileNameDownload + "\""
//        );
//
//        FileOutputStream fos =
//                new FileOutputStream(file.getAbsolutePath());
//
//        workbook.write(response.getOutputStream());
//
//        fos.close();
//
//    } catch (Exception e) {
//
//        e.printStackTrace();
//
//    }
//}
//    
    
        
    //// EXCEL  DETALLE /////////////////////////
//    
//    @RequestMapping(value = "getXLSXDetail")
//public void getXLSXDetail(HttpServletRequest request,
//                          HttpServletResponse response) throws Exception {
//
//    System.out.println(
//        "ControlBsplinkProcessController : getXLSXDetail"
//    );
//
//    A3096Filter filter = new A3096Filter();
//
//    String fileNameDownload =
//        "BSPLink_Avianca_Detail_" +
//        Functions.getFechaActual() +
//        ".xlsx";
//
//    try {
//
//        Workbook workbook;
//
//        File file =
//            File.createTempFile(fileNameDownload, ".xlsx");
//
//        logic = new ControlBsplinkProcessLogic();
//
//        logic.setSession(cs.getServerSession());
//
//        filter = new Gson().fromJson(
//            request.getParameter("beanString"),
//            filter.getClass()
//        );
//
//        filter.page.PAGROW = -1;
//        filter.page.PAGNUM = 1;
//
//        List<A3096Filter> listaData =
//            logic.RFS0035(filter);
//
//        workbook = new XSSFWorkbook();
//
//        Sheet sheet =
//            workbook.createSheet("BSPLink Avianca Detail");
//
//        XSSFCellStyle headerStyle =
//            (XSSFCellStyle) workbook.createCellStyle();
//
//        XSSFCellStyle bodyStyle =
//            (XSSFCellStyle) workbook.createCellStyle();
//
//        Font headerFont = workbook.createFont();
//
//        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//
//        headerFont.setColor(
//            IndexedColors.BLACK.getIndex()
//        );
//
//        // HEADER STYLE
//        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//
//        headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//
//        headerStyle.setFillForegroundColor(
//            new XSSFColor(new java.awt.Color(127, 152, 168))
//        );
//
//        headerStyle.setFillPattern(
//            CellStyle.SOLID_FOREGROUND
//        );
//
//        headerStyle.setVerticalAlignment(
//            CellStyle.VERTICAL_CENTER
//        );
//
//        headerStyle.setFont(headerFont);
//
//        // BODY STYLE
//        bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//        bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//
//        int vi = 0;
//        int vj = 0;
//
//        Iterator iter = listaData.iterator();
//
//        // ================= HEADERS =================
//
//        Row row1 = sheet.createRow(vj);
//
//        Cell CH0 = row1.createCell(0);
//        Cell CH1 = row1.createCell(1);
//        Cell CH2 = row1.createCell(2);
//        Cell CH3 = row1.createCell(3);
//        Cell CH4 = row1.createCell(4);
//        Cell CH5 = row1.createCell(5);
//        Cell CH6 = row1.createCell(6);
//        Cell CH7 = row1.createCell(7);
//
//        CH0.setCellValue("Load Date");
//        CH1.setCellValue("Ticket");
//        CH2.setCellValue("Refund Number");
//        CH3.setCellValue("Country");
//        CH4.setCellValue("Status");
//        CH5.setCellValue("Status Description");
//        CH6.setCellValue("Qty Send");
//        CH7.setCellValue("Error Description");
//
//        CH0.setCellStyle(headerStyle);
//        CH1.setCellStyle(headerStyle);
//        CH2.setCellStyle(headerStyle);
//        CH3.setCellStyle(headerStyle);
//        CH4.setCellStyle(headerStyle);
//        CH5.setCellStyle(headerStyle);
//        CH6.setCellStyle(headerStyle);
//        CH7.setCellStyle(headerStyle);
//
//        ++vj;
//
//        // ================= DATA =================
//
//        while (iter.hasNext()) {
//
//            row1 = sheet.createRow(vj);
//
//            Cell r0 = row1.createCell(0);
//            Cell r1 = row1.createCell(1);
//            Cell r2 = row1.createCell(2);
//            Cell r3 = row1.createCell(3);
//            Cell r4 = row1.createCell(4);
//            Cell r5 = row1.createCell(5);
//            Cell r6 = row1.createCell(6);
//            Cell r7 = row1.createCell(7);
//
//            r0.setCellValue(listaData.get(vi).A3096FCARG);
//            r1.setCellValue(listaData.get(vi).A3096TKT);
//            r2.setCellValue(listaData.get(vi).A3096IDSOL);
//            r3.setCellValue(listaData.get(vi).A3096PAIS);
//
//            String status = "";
//
//            switch (listaData.get(vi).A4547FLAG) {
//
//                case "R":
//                    status = "Rejected";
//                    break;
//
//                case "F":
//                    status = "Approved";
//                    break;
//
//                case "E":
//                    status = "Error";
//                    break;
//            }
//
//            r4.setCellValue(status);
//
//            r5.setCellValue(listaData.get(vi).A4547STATU);
//
//            r6.setCellValue(listaData.get(vi).A4547COUNT);
//
//            r7.setCellValue(listaData.get(vi).A4547DESCR);
//
//            r0.setCellStyle(bodyStyle);
//            r1.setCellStyle(bodyStyle);
//            r2.setCellStyle(bodyStyle);
//            r3.setCellStyle(bodyStyle);
//            r4.setCellStyle(bodyStyle);
//            r5.setCellStyle(bodyStyle);
//            r6.setCellStyle(bodyStyle);
//            r7.setCellStyle(bodyStyle);
//
//            iter.next();
//
//            ++vi;
//            ++vj;
//        }
//
//        // ================= AUTOSIZE =================
//
//        for (int i = 0; i <= 7; i++) {
//
//            sheet.autoSizeColumn(i, true);
//
//        }
//
//        // ================= RESPONSE =================
//
//        response.setContentType(
//            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//        );
//
//        response.setHeader(
//            "Content-Disposition",
//            "attachment; filename=\"" + fileNameDownload + "\""
//        );
//
//        FileOutputStream fos =
//            new FileOutputStream(file.getAbsolutePath());
//
//        workbook.write(response.getOutputStream());
//
//        fos.close();
//
//    } catch (Exception e) {
//
//        e.printStackTrace();
//
//    }
//}
//    
    
    
    
//    
//     @RequestMapping(value = "loadIatas", method = RequestMethod.POST)
//    public @ResponseBody
//    String loadIatas(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws IOException, Exception {
//
//        String strArchivo = null;
//        File archivo = null;
//        String message = "";
//        String messageInsertInput = "";
//        String messageInsertError = "";
//        String messageInsertA0053 = "";
//        String msg = "";
//        String filename = "";
//        String msjLog = "";
//        String pathLog = "";
//        String fechaFilename = "";
//        A2745 objResult = new A2745();
//        List<A2745> lstData = new ArrayList<>();
//        byte[] bytes = null;
//        int i = 0;
//        int y = 0;
//        int total_leidos = 0;
//        int total_escritos = 0;
//        int total_errores = 0;
//        String fechaActual = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//        String user = "USRWEBAV";
//        String horaActual = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
//
//        try {
//            final Date date = new Date();
//            final DateFormat hourdateFormat = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
//            final String fecha = hourdateFormat.format(date);
//            final String dia = fecha.substring(9, 11);
//            final String mes = fecha.substring(12, 14);
//            final String anio = fecha.substring(15, 19);
//            final String fechaF = anio + mes + dia;
//
//            String dirPath = "\\\\Wsavianca\\files\\Carga Web Avianca\\AMADEUS\\LOG PERMISOS";
//            File dir = new File(dirPath);
//
//            if (!dir.exists()) {
//                msjLog = "Estado Carga : " + "La carpeta de logs no existe: " + dirPath;
//                message = "Error en el Formateo";
//                map.put("success", false);
//                map.put("data", objResult);
//                map.put("msjResult", message + " | " + msjLog);
//                return new Gson().toJson(map);
//            }
//            if (!dir.canRead()) {
//                msjLog = "Estado Carga : " + "No hay permisos de lectura en: " + dirPath;
//                message = "Error en el Formateo";
//                map.put("success", false);
//                map.put("data", objResult);
//                map.put("msjResult", message + " | " + msjLog);
//                return new Gson().toJson(map);
//            }
//            if (!dir.canWrite()) {
//                msjLog = "Estado Carga : " + "No hay permisos de escritura en: " + dirPath;
//                message = "Error en el Formateo";
//                map.put("success", false);
//                map.put("data", objResult);
//                map.put("msjResult", message + " | " + msjLog);
//                return new Gson().toJson(map);
//            }
//
//            pathLog = dirPath + File.separator + fechaF + ".log";
//            File file = new File(pathLog);
//
//            if (!file.exists()) {
//                file.createNewFile();
//            }
//
//            // Escribir en el log
//            try (FileWriter fw = new FileWriter(file, true); BufferedWriter bw = new BufferedWriter(fw)) {
//                String dataToWrite = fecha + " - " + "Permisos Validados";
//                bw.newLine();
//                bw.write(dataToWrite);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//            msjLog = "Estado Carga : " + "Error al validar Log ";
//            message = "Error en el Formateo";
//            map.put("success", false);
//            map.put("data", objResult);
//            map.put("msjResult", message + " | " + msjLog);
//            return new Gson().toJson(map);
//        }
//
//        logic = new RefundInputLogic();
//        logic.setSession(currentSession.getServerSession());
//        filename = request.getParameter("filename").trim();
//        if (filename != null) {
//            filename = filename.substring(filename.lastIndexOf("\\") + 1).trim();
//            fechaFilename = extraerFechaDeArchivo(filename);
//        }
//
//        addLog("Iniciando archivo : " + filename);
//
//        try {
//            InputStream inputStream = request.getInputStream();
//            if (inputStream == null) {
//                msjLog = "Estado Carga : El InputStream es nulo.";
//                message = "Error en el Formateo";
//                addLog(msjLog);
//                map.put("success", false);
//                map.put("data", objResult);
//                map.put("msjResult", message + " | " + msjLog);
//                return new Gson().toJson(map);
//            }
//
//            bytes = IOUtils.toByteArray(inputStream);
//            if (bytes == null || bytes.length == 0) {
//                msjLog = "Estado Carga : No se recibieron bytes en la solicitud.";
//                message = "Error en el Formateo";
//                addLog(msjLog);
//                map.put("success", false);
//                map.put("data", objResult);
//                map.put("msjResult", message + " | " + msjLog);
//                return new Gson().toJson(map);
//            }
//        } catch (IOException e) {
//            msjLog = "Error leyendo el archivo: " + e.getMessage();
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("data", objResult);
//            map.put("msjResult", "Error en la lectura | " + msjLog);
//            return new Gson().toJson(map);
//        }
//
//        if (!filename.toLowerCase().endsWith(".xlsx") && !filename.toLowerCase().endsWith(".xls")) {
//            msjLog = "Estado Carga : " + "Archivo de Formato no Permitido";
//            message = "Error en el Formateo";
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("msjResult", message + " | " + msjLog);
//            return new Gson().toJson(map);
//        }
//
//        msjLog = "Estado Carga : " + "Archivo de Formato Permitido";
//        addLog(msjLog);
//
//        try {
//            logic.setSession(currentSession.getServerSession());
//            messageInsertInput = logic.verificarCrearRegistros();
//            addLog(messageInsertInput);
//        } catch (Exception e) {
//            message = "Error en verificarCrearRegistros: " + e.getMessage();
//            addLog(message);
//            map.put("success", false);
//            map.put("msjResult", message);
//            return new Gson().toJson(map);
//        }
//
//        try {
//
//            String resultadoVerificacion = logic.verificarArchivoYaCargado(fechaActual, filename);
//
//            if (!"OK".equals(resultadoVerificacion)) {
//                addLog(resultadoVerificacion);
//                map.put("success", false);
//                map.put("msjResult", resultadoVerificacion);
//                return new Gson().toJson(map);
//            }
//
//        } catch (Exception e) {
//            message = "Error en verificar registros ya ingresados: " + e.getMessage();
//            addLog(message);
//            map.put("success", false);
//            map.put("msjResult", message);
//            return new Gson().toJson(map);
//        }
//
//        try {
//            String strSesion = UUID.randomUUID().toString();
//            String strNomExcel = "Rapid." + strSesion + ".xlsx";
//            strArchivo = "C:\\Dumps\\" + strNomExcel;
//            archivo = new File(strArchivo);
//
//            try (FileOutputStream fs = new FileOutputStream(archivo)) {
//                fs.write(bytes);
//                fs.flush();
//            }
//        } catch (IOException e) {
//            msjLog = "Error al guardar el archivo: " + e.getMessage();
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("data", objResult);
//            map.put("msjResult", msjLog);
//            return new Gson().toJson(map);
//        }
//
//        if (!archivo.exists() || archivo.length() == 0) {
//            msjLog = "Estado Carga : " + "El archivo generado está vacío o no existe.";
//            message = "Error en el Formateo";
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("msjResult", message + " | " + msjLog);
//            return new Gson().toJson(map);
//        }
//
//        FileInputStream fileExcel = new FileInputStream(archivo);
//        XSSFWorkbook workbook = new XSSFWorkbook(fileExcel);
//
//        if (workbook.getNumberOfSheets() != 1) {
//            msjLog = "Estado Carga : El archivo debe contener exactamente una hoja. Tiene: " + workbook.getNumberOfSheets();
//            message = "Error en el Formateo";
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("data", objResult);
//            map.put("msjResult", message + " | " + msjLog);
//            workbook.close(); // Cerrar recurso
//            return new Gson().toJson(map);
//        }
//
//        XSSFSheet sheet = workbook.getSheetAt(0);
//
//        int filaDatos = 7;
//        Row primeraFila = sheet.getRow(filaDatos);
//        if (primeraFila == null) {
//            msjLog = "Estado Carga : No se encontró la fila de datos esperada (" + (filaDatos) + ")";
//            message = "Error en el Formateo";
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("msjResult", message + " | " + msjLog);
//            workbook.close();
//            return new Gson().toJson(map);
//        }
//
//        // Contar realmente las columnas esperadas
//        int totalColumnas = primeraFila.getLastCellNum(); // <-- cuenta todas, incluidas vacías
//
//        if (totalColumnas != 419) {
//            msjLog = "Estado Carga : El archivo no cumple con el número esperado de columnas. Esperado: 419, Encontrado: " + totalColumnas;
//            message = "Error en el Formateo";
//            addLog(msjLog);
//            map.put("success", false);
//            map.put("msjResult", message + " | " + msjLog);
//            workbook.close();
//            return new Gson().toJson(map);
//        }
//
//        Iterator<Row> rowIterator = sheet.iterator();
//        int emptyRowCount = 0;
//        boolean layoutValidado = false;
//
//        String siguienteSecuencia = logic.obtenerSiguienteSecuencia(fechaActual);
//        System.out.println("Siguiente secuencia para FECR=" + fechaActual + " es: " + siguienteSecuencia);
//
//        try {
//
//            while (rowIterator.hasNext()) {
//                i++;
//                Row row = rowIterator.next();
//
//                if (i > 6) {
//
//                    if (!layoutValidado) {
//                        String primerValor = cleanValue(getCellValue(row.getCell(0)));
//                        if (!primerValor.matches("\\d+")) {
//                            msjLog = "Error: Layout no válido. Se esperaba un ticket numérico en la fila " + i;
//                            addLog(msjLog);
//                            map.put("success", false);
//                            map.put("data", objResult);
//                            map.put("msjResult", msjLog);
//                            return new Gson().toJson(map);
//                        }
//                        layoutValidado = true;
//                    }
//
//                    if (isRowEmpty(row)) {
//                        emptyRowCount++;
//                        if (emptyRowCount > 10) {
//                            break;
//                        }
//                        continue;
//                    } else {
//                        emptyRowCount = 0;
//                    }
//
//                    y++;
//                    msjLog = "Insertando Registro :  " + y;
//                    addLog(msjLog);
//
//                    total_leidos += 1;
//                    String ticket = cleanValue(getCellValue(row.getCell(0)));
//                    String rawDate2 = cleanValue(getCellValue(row.getCell(1)));
//                    String rawDate = cleanValue(getCellValue(row.getCell(6)));
//                    String IN_A5003RDBS = "";
//                    String IN_A5003FEMI = "";
//
//                    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yy");
//                    DateTimeFormatter inputFormatterDMYY = DateTimeFormatter.ofPattern("d/M/yyyy");
//                    DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
//                    DateTimeFormatter inputFormatter2 = DateTimeFormatter.ofPattern("M/d/yy");
//                    DateTimeFormatter inputFormatter2DMYY = DateTimeFormatter.ofPattern("M/d/yyyy");
//                    DateTimeFormatter outputFormatter2 = DateTimeFormatter.ofPattern("yyyyMMdd");
//
//                    A2745 input = new A2745();
//
//                    input.USCR = user;
//                    input.FECR = fechaActual;
//                    input.HOCR = horaActual;
//                    input.PGMCR = "MP67D";
//                    input.FILENAME = filename;
//                    input.IN_A5003CCUST = "134";
//                    input.IN_A5003TKTF = cleanValue(getCellValue(row.getCell(0)));
//
//                    if (row.getCell(1) != null && row.getCell(1).getCellType() == Cell.CELL_TYPE_NUMERIC && DateUtil.isCellDateFormatted(row.getCell(1))) {
//
//                        Date date = row.getCell(1).getDateCellValue();
//                        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//                        IN_A5003RDBS = localDate.format(outputFormatter);
//
//                    } else {
//                        IN_A5003RDBS = parseDateFlexible(rawDate2);
//                    }
//
//                    if (row.getCell(6) != null && row.getCell(6).getCellType() == Cell.CELL_TYPE_NUMERIC && DateUtil.isCellDateFormatted(row.getCell(6))) {
//
//                        Date date = row.getCell(6).getDateCellValue();
//                        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//                        IN_A5003FEMI = localDate.format(outputFormatter);
//
//                    } else {
//                        IN_A5003FEMI = parseDateFlexible(rawDate);
//                    }
//
//                    input.IN_A5003RDBS = IN_A5003RDBS;
//                    input.IN_A5003FEMI = IN_A5003FEMI;
//                    input.IN_A5003PNRI = getCellValueAsString(row.getCell(2));
//                    input.IN_A5003CHNI = cleanValue(getCellValue(row.getCell(3)));
//                    input.IN_A5003RFNI = cleanValue(getCellValue(row.getCell(4)));
//
//                    if (ticket.length() == 13 && ticket.chars().allMatch(Character::isDigit)) {
//                        input.IN_A5003CCIA = ticket.substring(0, 3);
//                        input.IN_A5003FORMA = ticket.substring(3, 7);
//                        input.IN_A5003SERIE = ticket.substring(7);
//                        input.IN_A5003TKT = cleanValue(getCellValue(row.getCell(5)));
//                    } else {
//                        input.IN_A5003CCIA = ticket.length() >= 3 ? ticket.substring(0, 3) : "";
//                        input.IN_A5003FORMA = ticket.length() >= 7 ? ticket.substring(3, 7) : "";
//                        input.IN_A5003SERIE = ticket.length() > 7 ? ticket.substring(7) : "";
//                        input.IN_A5003TKT = cleanValue(getCellValue(row.getCell(5)));
//                        input.IN_A5003STVAL = "2";
//                        lstData.add(input);
//                        total_errores += 1;
//                        messageInsertError = "Ticket con Error en Excel -: " + input.IN_A5003TKTF;
//                        addLog(messageInsertError);
//
//                        try {
//                            messageInsertError = logic.insertA5003(input, siguienteSecuencia, fechaFilename);
//                        } catch (Exception e) {
//                            messageInsertError = "Error al insertar en A5003: " + e.getMessage();
//                            addLog(messageInsertError);
//                            map.put("success", false);
//                            map.put("msjResult", message);
//                            return new Gson().toJson(map);
//                        }
//
//                        total_errores += 1;
//
//                        continue;
//                    }
//
//                    input.IN_A5003STVAL = "1";
//
//                    input.IN_A5003TKTC = cleanValue(getCellValue(row.getCell(7)));
//                    input.IN_A5003TKTP = cleanValue(getCellValue(row.getCell(8)));
//                    input.IN_A5003PNR = getCellValueAsString(row.getCell(9));
//                    input.IN_A5003SAGEN = cleanValue(getCellValue(row.getCell(10)));
//                    input.IN_A5003PAXN = cleanValue(getCellValue(row.getCell(11)));
//                    input.IN_A5003COPER = cleanValue(getCellValue(row.getCell(12))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(12))));
//                    input.IN_A5003COAMO = cleanValue(getCellValue(row.getCell(13))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(13))));
//                    input.IN_A5003RFISC = cleanValue(getCellValue(row.getCell(14)));
//                    input.IN_A5003TKTNU = cleanValue(getCellValue(row.getCell(15)));
//                    input.IN_A5003EMAIL = cleanValue(getCellValue(row.getCell(16)));
//                    input.IN_A5003CHANE = cleanValue(getCellValue(row.getCell(17)));
//                    input.IN_A5003SUBCH = cleanValue(getCellValue(row.getCell(18)));
//                    input.IN_A5003ACRES = cleanValue(getCellValue(row.getCell(19)));
//                    input.IN_A5003FNAME = cleanValue(getCellValue(row.getCell(20)));
//                    input.IN_A5003MNAME = cleanValue(getCellValue(row.getCell(21)));
//                    input.IN_A5003LNAME = cleanValue(getCellValue(row.getCell(22)));
//                    input.IN_A5003SNAME = cleanValue(getCellValue(row.getCell(23)));
//                    input.IN_A5003SPLIT = cleanValue(getCellValue(row.getCell(24)));
//                    input.IN_A5003PNEW = cleanValue(getCellValue(row.getCell(25)));
//                    input.IN_A5003CPNDN = cleanValue(getCellValue(row.getCell(26)));
//                    input.IN_A5003CPNDA = cleanValue(getCellValue(row.getCell(27)));
//                    input.IN_A5003FFNUM = cleanValue(getCellValue(row.getCell(28)));
//                    input.IN_A5003SCOUN = cleanValue(getCellValue(row.getCell(29)));
//                    input.IN_A5003IDX1 = cleanValue(getCellValue(row.getCell(30)));
//                    input.IN_A5003CCD1 = cleanValue(getCellValue(row.getCell(31)));
//                    input.IN_A5003IDX2 = cleanValue(getCellValue(row.getCell(32)));
//                    input.IN_A5003CCD2 = cleanValue(getCellValue(row.getCell(33)));
//                    input.IN_A5003IDX3 = cleanValue(getCellValue(row.getCell(34)));
//                    input.IN_A5003CCD3 = cleanValue(getCellValue(row.getCell(35)));
//                    input.IN_A5003IDX4 = cleanValue(getCellValue(row.getCell(36)));
//                    input.IN_A5003CCD4 = cleanValue(getCellValue(row.getCell(37)));
//                    input.IN_A5003IDX5 = cleanValue(getCellValue(row.getCell(38)));
//                    input.IN_A5003CCD5 = cleanValue(getCellValue(row.getCell(39)));
//                    input.IN_A5003IDX6 = cleanValue(getCellValue(row.getCell(40)));
//                    input.IN_A5003CCD6 = cleanValue(getCellValue(row.getCell(41)));
//                    input.IN_A5003IDX7 = cleanValue(getCellValue(row.getCell(42)));
//                    input.IN_A5003CCD7 = cleanValue(getCellValue(row.getCell(43)));
//                    input.IN_A5003IDX8 = cleanValue(getCellValue(row.getCell(44)));
//                    input.IN_A5003CCD8 = cleanValue(getCellValue(row.getCell(45)));
//                    input.IN_A5003IDX9 = cleanValue(getCellValue(row.getCell(46)));
//                    input.IN_A5003CCD9 = cleanValue(getCellValue(row.getCell(47)));
//                    input.IN_A5003IDX10 = cleanValue(getCellValue(row.getCell(48)));
//                    input.IN_A5003CCD10 = cleanValue(getCellValue(row.getCell(49)));
//                    input.IN_A5003ISORS = cleanValue(getCellValue(row.getCell(50)));
//                    input.IN_A5003FOP = cleanValue(getCellValue(row.getCell(51)));
//                    input.IN_A5003FRANC = cleanValue(getCellValue(row.getCell(52)));
//                    input.IN_A5003CNUMB = cleanValue(getCellValue(row.getCell(53)));
//                    input.IN_A5003EXPDA = cleanValue(getCellValue(row.getCell(54)));
//                    input.IN_A5003APCOD = cleanValue(getCellValue(row.getCell(55)));
//                    input.IN_A5003STATR = cleanValue(getCellValue(row.getCell(56)));
//                    input.IN_A5003REASF = cleanValue(getCellValue(row.getCell(57)));
//                    input.IN_A5003REJEF = cleanValue(getCellValue(row.getCell(58)));
//                    input.IN_A5003AREMA = cleanValue(getCellValue(row.getCell(59)));
//                    input.IN_A5003FEEMD = cleanValue(getCellValue(row.getCell(60)));
//                    input.IN_A5003FEIND = cleanValue(getCellValue(row.getCell(61)));
//                    input.IN_A5003FEAMO = cleanValue(getCellValue(row.getCell(62))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(62))));
//                    input.IN_A5003FECUR = cleanValue(getCellValue(row.getCell(63)));
//                    input.IN_A5003FEPDA = cleanValue(getCellValue(row.getCell(64)));
//                    input.IN_A5003FEFOP = cleanValue(getCellValue(row.getCell(65)));
//                    input.IN_A5003EXTPA = cleanValue(getCellValue(row.getCell(66)));
//                    input.IN_A5003BFAMO = cleanValue(getCellValue(row.getCell(67))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(67))));
//                    input.IN_A5003BFCUR = cleanValue(getCellValue(row.getCell(68)));
//                    input.IN_A5003FRAMO = cleanValue(getCellValue(row.getCell(69))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(69))));
//                    input.IN_A5003FRCUR = cleanValue(getCellValue(row.getCell(70)));
//                    input.IN_A5003TAAMO = cleanValue(getCellValue(row.getCell(71))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(71))));
//                    input.IN_A5003TACUR = cleanValue(getCellValue(row.getCell(72)));
//                    input.IN_A5003TARMO = cleanValue(getCellValue(row.getCell(73))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(73))));
//                    input.IN_A5003TARCU = cleanValue(getCellValue(row.getCell(74)));
//                    input.IN_A5003CAAMO = cleanValue(getCellValue(row.getCell(75))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(75))));
//                    input.IN_A5003CACUR = cleanValue(getCellValue(row.getCell(76)));
//                    input.IN_A5003TOTRE = cleanValue(getCellValue(row.getCell(77))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(77))));
//                    input.IN_A5003TOTCU = cleanValue(getCellValue(row.getCell(78)));
//                    input.IN_A5003ID1 = cleanValue(getCellValue(row.getCell(79)));
//                    input.IN_A5003IX1 = cleanValue(getCellValue(row.getCell(80)));
//                    input.IN_A5003SEG1 = cleanValue(getCellValue(row.getCell(81)));
//                    input.IN_A5003ISO1 = cleanValue(getCellValue(row.getCell(82)));
//                    input.IN_A5003STA1 = cleanValue(getCellValue(row.getCell(83)));
//                    input.IN_A5003CON1 = cleanValue(getCellValue(row.getCell(84)));
//                    input.IN_A5003ORI1 = cleanValue(getCellValue(row.getCell(85)));
//                    input.IN_A5003DES1 = cleanValue(getCellValue(row.getCell(86)));
//                    input.IN_A5003DEP1 = cleanValue(getCellValue(row.getCell(87)));
//                    input.IN_A5003CLA1 = cleanValue(getCellValue(row.getCell(88)));
//                    input.IN_A5003BRC1 = cleanValue(getCellValue(row.getCell(89)));
//                    input.IN_A5003BAS1 = cleanValue(getCellValue(row.getCell(90)));
//                    input.IN_A5003MKT1 = cleanValue(getCellValue(row.getCell(91)));
//                    input.IN_A5003FLI1 = cleanValue(getCellValue(row.getCell(92)));
//                    input.IN_A5003ID2 = cleanValue(getCellValue(row.getCell(93)));
//                    input.IN_A5003IX2 = cleanValue(getCellValue(row.getCell(94)));
//                    input.IN_A5003SEG2 = cleanValue(getCellValue(row.getCell(95)));
//                    input.IN_A5003ISO2 = cleanValue(getCellValue(row.getCell(96)));
//                    input.IN_A5003STA2 = cleanValue(getCellValue(row.getCell(97)));
//                    input.IN_A5003CON2 = cleanValue(getCellValue(row.getCell(98)));
//                    input.IN_A5003ORI2 = cleanValue(getCellValue(row.getCell(99)));
//                    input.IN_A5003DES2 = cleanValue(getCellValue(row.getCell(100)));
//                    input.IN_A5003DEP2 = cleanValue(getCellValue(row.getCell(101)));
//                    input.IN_A5003CLA2 = cleanValue(getCellValue(row.getCell(102)));
//                    input.IN_A5003BRC2 = cleanValue(getCellValue(row.getCell(103)));
//                    input.IN_A5003BAS2 = cleanValue(getCellValue(row.getCell(104)));
//                    input.IN_A5003MKT2 = cleanValue(getCellValue(row.getCell(105)));
//                    input.IN_A5003FLI2 = cleanValue(getCellValue(row.getCell(106)));
//                    input.IN_A5003ID3 = cleanValue(getCellValue(row.getCell(107)));
//                    input.IN_A5003IX3 = cleanValue(getCellValue(row.getCell(108)));
//                    input.IN_A5003SEG3 = cleanValue(getCellValue(row.getCell(109)));
//                    input.IN_A5003ISO3 = cleanValue(getCellValue(row.getCell(110)));
//                    input.IN_A5003STA3 = cleanValue(getCellValue(row.getCell(111)));
//                    input.IN_A5003CON3 = cleanValue(getCellValue(row.getCell(112)));
//                    input.IN_A5003ORI3 = cleanValue(getCellValue(row.getCell(113)));
//                    input.IN_A5003DES3 = cleanValue(getCellValue(row.getCell(114)));
//                    input.IN_A5003DEP3 = cleanValue(getCellValue(row.getCell(115)));
//                    input.IN_A5003CLA3 = cleanValue(getCellValue(row.getCell(116)));
//                    input.IN_A5003BRC3 = cleanValue(getCellValue(row.getCell(117)));
//                    input.IN_A5003BAS3 = cleanValue(getCellValue(row.getCell(118)));
//                    input.IN_A5003MKT3 = cleanValue(getCellValue(row.getCell(119)));
//                    input.IN_A5003FLI3 = cleanValue(getCellValue(row.getCell(120)));
//                    input.IN_A5003ID4 = cleanValue(getCellValue(row.getCell(121)));
//                    input.IN_A5003IX4 = cleanValue(getCellValue(row.getCell(122)));
//                    input.IN_A5003SEG4 = cleanValue(getCellValue(row.getCell(123)));
//                    input.IN_A5003ISO4 = cleanValue(getCellValue(row.getCell(124)));
//                    input.IN_A5003STA4 = cleanValue(getCellValue(row.getCell(125)));
//                    input.IN_A5003CON4 = cleanValue(getCellValue(row.getCell(126)));
//                    input.IN_A5003ORI4 = cleanValue(getCellValue(row.getCell(127)));
//                    input.IN_A5003DES4 = cleanValue(getCellValue(row.getCell(128)));
//                    input.IN_A5003DEP4 = cleanValue(getCellValue(row.getCell(129)));
//                    input.IN_A5003CLA4 = cleanValue(getCellValue(row.getCell(130)));
//                    input.IN_A5003BRC4 = cleanValue(getCellValue(row.getCell(131)));
//                    input.IN_A5003BAS4 = cleanValue(getCellValue(row.getCell(132)));
//                    input.IN_A5003MKT4 = cleanValue(getCellValue(row.getCell(133)));
//                    input.IN_A5003FLI4 = cleanValue(getCellValue(row.getCell(134)));
//                    input.IN_A5003ID5 = cleanValue(getCellValue(row.getCell(135)));
//                    input.IN_A5003IX5 = cleanValue(getCellValue(row.getCell(136)));
//                    input.IN_A5003SEG5 = cleanValue(getCellValue(row.getCell(137)));
//                    input.IN_A5003ISO5 = cleanValue(getCellValue(row.getCell(138)));
//                    input.IN_A5003STA5 = cleanValue(getCellValue(row.getCell(139)));
//                    input.IN_A5003CON5 = cleanValue(getCellValue(row.getCell(140)));
//                    input.IN_A5003ORI5 = cleanValue(getCellValue(row.getCell(141)));
//                    input.IN_A5003DES5 = cleanValue(getCellValue(row.getCell(142)));
//                    input.IN_A5003DEP5 = cleanValue(getCellValue(row.getCell(143)));
//                    input.IN_A5003CLA5 = cleanValue(getCellValue(row.getCell(144)));
//                    input.IN_A5003BRC5 = cleanValue(getCellValue(row.getCell(145)));
//                    input.IN_A5003BAS5 = cleanValue(getCellValue(row.getCell(146)));
//                    input.IN_A5003MKT5 = cleanValue(getCellValue(row.getCell(147)));
//                    input.IN_A5003FLI5 = cleanValue(getCellValue(row.getCell(148)));
//                    input.IN_A5003ID6 = cleanValue(getCellValue(row.getCell(149)));
//                    input.IN_A5003IX6 = cleanValue(getCellValue(row.getCell(150)));
//                    input.IN_A5003SEG6 = cleanValue(getCellValue(row.getCell(151)));
//                    input.IN_A5003ISO6 = cleanValue(getCellValue(row.getCell(152)));
//                    input.IN_A5003STA6 = cleanValue(getCellValue(row.getCell(153)));
//                    input.IN_A5003CON6 = cleanValue(getCellValue(row.getCell(154)));
//                    input.IN_A5003ORI6 = cleanValue(getCellValue(row.getCell(155)));
//                    input.IN_A5003DES6 = cleanValue(getCellValue(row.getCell(156)));
//                    input.IN_A5003DEP6 = cleanValue(getCellValue(row.getCell(157)));
//                    input.IN_A5003CLA6 = cleanValue(getCellValue(row.getCell(158)));
//                    input.IN_A5003BRC6 = cleanValue(getCellValue(row.getCell(159)));
//                    input.IN_A5003BAS6 = cleanValue(getCellValue(row.getCell(160)));
//                    input.IN_A5003MKT6 = cleanValue(getCellValue(row.getCell(161)));
//                    input.IN_A5003FLI6 = cleanValue(getCellValue(row.getCell(162)));
//                    input.IN_A5003ID7 = cleanValue(getCellValue(row.getCell(163)));
//                    input.IN_A5003IX7 = cleanValue(getCellValue(row.getCell(164)));
//                    input.IN_A5003SEG7 = cleanValue(getCellValue(row.getCell(165)));
//                    input.IN_A5003ISO7 = cleanValue(getCellValue(row.getCell(166)));
//                    input.IN_A5003STA7 = cleanValue(getCellValue(row.getCell(167)));
//                    input.IN_A5003CON7 = cleanValue(getCellValue(row.getCell(168)));
//                    input.IN_A5003ORI7 = cleanValue(getCellValue(row.getCell(169)));
//                    input.IN_A5003DES7 = cleanValue(getCellValue(row.getCell(170)));
//                    input.IN_A5003DEP7 = cleanValue(getCellValue(row.getCell(171)));
//                    input.IN_A5003CLA7 = cleanValue(getCellValue(row.getCell(172)));
//                    input.IN_A5003BRC7 = cleanValue(getCellValue(row.getCell(173)));
//                    input.IN_A5003BAS7 = cleanValue(getCellValue(row.getCell(174)));
//                    input.IN_A5003MKT7 = cleanValue(getCellValue(row.getCell(175)));
//                    input.IN_A5003FLI7 = cleanValue(getCellValue(row.getCell(176)));
//                    input.IN_A5003ID8 = cleanValue(getCellValue(row.getCell(177)));
//                    input.IN_A5003IX8 = cleanValue(getCellValue(row.getCell(178)));
//                    input.IN_A5003SEG8 = cleanValue(getCellValue(row.getCell(179)));
//                    input.IN_A5003ISO8 = cleanValue(getCellValue(row.getCell(180)));
//                    input.IN_A5003STA8 = cleanValue(getCellValue(row.getCell(181)));
//                    input.IN_A5003CON8 = cleanValue(getCellValue(row.getCell(182)));
//                    input.IN_A5003ORI8 = cleanValue(getCellValue(row.getCell(183)));
//                    input.IN_A5003DES8 = cleanValue(getCellValue(row.getCell(184)));
//                    input.IN_A5003DEP8 = cleanValue(getCellValue(row.getCell(185)));
//                    input.IN_A5003CLA8 = cleanValue(getCellValue(row.getCell(186)));
//                    input.IN_A5003BRC8 = cleanValue(getCellValue(row.getCell(187)));
//                    input.IN_A5003BAS8 = cleanValue(getCellValue(row.getCell(188)));
//                    input.IN_A5003MKT8 = cleanValue(getCellValue(row.getCell(189)));
//                    input.IN_A5003FLI8 = cleanValue(getCellValue(row.getCell(190)));
//                    input.IN_A5003ID9 = cleanValue(getCellValue(row.getCell(191)));
//                    input.IN_A5003IX9 = cleanValue(getCellValue(row.getCell(192)));
//                    input.IN_A5003SEG9 = cleanValue(getCellValue(row.getCell(193)));
//                    input.IN_A5003ISO9 = cleanValue(getCellValue(row.getCell(194)));
//                    input.IN_A5003STA9 = cleanValue(getCellValue(row.getCell(195)));
//                    input.IN_A5003CON9 = cleanValue(getCellValue(row.getCell(196)));
//                    input.IN_A5003ORI9 = cleanValue(getCellValue(row.getCell(197)));
//                    input.IN_A5003DES9 = cleanValue(getCellValue(row.getCell(198)));
//                    input.IN_A5003DEP9 = cleanValue(getCellValue(row.getCell(199)));
//                    input.IN_A5003CLA9 = cleanValue(getCellValue(row.getCell(200)));
//                    input.IN_A5003BRC9 = cleanValue(getCellValue(row.getCell(201)));
//                    input.IN_A5003BAS9 = cleanValue(getCellValue(row.getCell(202)));
//                    input.IN_A5003MKT9 = cleanValue(getCellValue(row.getCell(203)));
//                    input.IN_A5003FLI9 = cleanValue(getCellValue(row.getCell(204)));
//                    input.IN_A5003ID10 = cleanValue(getCellValue(row.getCell(205)));
//                    input.IN_A5003IX10 = cleanValue(getCellValue(row.getCell(206)));
//                    input.IN_A5003SEG10 = cleanValue(getCellValue(row.getCell(207)));
//                    input.IN_A5003ISO10 = cleanValue(getCellValue(row.getCell(208)));
//                    input.IN_A5003STA10 = cleanValue(getCellValue(row.getCell(209)));
//                    input.IN_A5003CON10 = cleanValue(getCellValue(row.getCell(210)));
//                    input.IN_A5003ORI10 = cleanValue(getCellValue(row.getCell(211)));
//                    input.IN_A5003DES10 = cleanValue(getCellValue(row.getCell(212)));
//                    input.IN_A5003DEP10 = cleanValue(getCellValue(row.getCell(213)));
//                    input.IN_A5003CLA10 = cleanValue(getCellValue(row.getCell(214)));
//                    input.IN_A5003BRC10 = cleanValue(getCellValue(row.getCell(215)));
//                    input.IN_A5003BAS10 = cleanValue(getCellValue(row.getCell(216)));
//                    input.IN_A5003MKT10 = cleanValue(getCellValue(row.getCell(217)));
//                    input.IN_A5003FLI10 = cleanValue(getCellValue(row.getCell(218)));
//                    input.IN_A5003KEY1 = cleanValue(getCellValue(row.getCell(219)));
//                    input.IN_A5003LEF1 = cleanValue(getCellValue(row.getCell(220)));
//                    input.IN_A5003TCO1 = cleanValue(getCellValue(row.getCell(221)));
//                    input.IN_A5003TMO1 = cleanValue(getCellValue(row.getCell(222))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(222))));
//                    input.IN_A5003TCU1 = cleanValue(getCellValue(row.getCell(223)));
//                    input.IN_A5003SFA1 = cleanValue(getCellValue(row.getCell(224))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(224))));
//                    input.IN_A5003SFC1 = cleanValue(getCellValue(row.getCell(225)));
//                    input.IN_A5003ISP1 = cleanValue(getCellValue(row.getCell(226)));
//                    input.IN_A5003KEY2 = cleanValue(getCellValue(row.getCell(227)));
//                    input.IN_A5003LEF2 = cleanValue(getCellValue(row.getCell(228)));
//                    input.IN_A5003TCO2 = cleanValue(getCellValue(row.getCell(229)));
//                    input.IN_A5003TMO2 = cleanValue(getCellValue(row.getCell(230))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(230))));
//                    input.IN_A5003TCU2 = cleanValue(getCellValue(row.getCell(231)));
//                    input.IN_A5003SFA2 = cleanValue(getCellValue(row.getCell(232))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(232))));
//                    input.IN_A5003SFC2 = cleanValue(getCellValue(row.getCell(233)));
//                    input.IN_A5003ISP2 = cleanValue(getCellValue(row.getCell(234)));
//                    input.IN_A5003KEY3 = cleanValue(getCellValue(row.getCell(235)));
//                    input.IN_A5003LEF3 = cleanValue(getCellValue(row.getCell(236)));
//                    input.IN_A5003TCO3 = cleanValue(getCellValue(row.getCell(237)));
//                    input.IN_A5003TMO3 = cleanValue(getCellValue(row.getCell(238))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(238))));
//                    input.IN_A5003TCU3 = cleanValue(getCellValue(row.getCell(239)));
//                    input.IN_A5003SFA3 = cleanValue(getCellValue(row.getCell(240))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(240))));
//                    input.IN_A5003SFC3 = cleanValue(getCellValue(row.getCell(241)));
//                    input.IN_A5003ISP3 = cleanValue(getCellValue(row.getCell(242)));
//                    input.IN_A5003KEY4 = cleanValue(getCellValue(row.getCell(243)));
//                    input.IN_A5003LEF4 = cleanValue(getCellValue(row.getCell(244)));
//                    input.IN_A5003TCO4 = cleanValue(getCellValue(row.getCell(245)));
//                    input.IN_A5003TMO4 = cleanValue(getCellValue(row.getCell(246))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(246))));
//                    input.IN_A5003TCU4 = cleanValue(getCellValue(row.getCell(247)));
//                    input.IN_A5003SFA4 = cleanValue(getCellValue(row.getCell(248))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(248))));
//                    input.IN_A5003SFC4 = cleanValue(getCellValue(row.getCell(249)));
//                    input.IN_A5003ISP4 = cleanValue(getCellValue(row.getCell(250)));
//                    input.IN_A5003KEY5 = cleanValue(getCellValue(row.getCell(251)));
//                    input.IN_A5003LEF5 = cleanValue(getCellValue(row.getCell(252)));
//                    input.IN_A5003TCO5 = cleanValue(getCellValue(row.getCell(253)));
//                    input.IN_A5003TMO5 = cleanValue(getCellValue(row.getCell(254))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(254))));
//                    input.IN_A5003TCU5 = cleanValue(getCellValue(row.getCell(255)));
//                    input.IN_A5003SFA5 = cleanValue(getCellValue(row.getCell(256))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(256))));
//                    input.IN_A5003SFC5 = cleanValue(getCellValue(row.getCell(257)));
//                    input.IN_A5003ISP5 = cleanValue(getCellValue(row.getCell(258)));
//                    input.IN_A5003KEY6 = cleanValue(getCellValue(row.getCell(259)));
//                    input.IN_A5003LEF6 = cleanValue(getCellValue(row.getCell(260)));
//                    input.IN_A5003TCO6 = cleanValue(getCellValue(row.getCell(261)));
//                    input.IN_A5003TMO6 = cleanValue(getCellValue(row.getCell(262))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(262))));
//                    input.IN_A5003TCU6 = cleanValue(getCellValue(row.getCell(263)));
//                    input.IN_A5003SFA6 = cleanValue(getCellValue(row.getCell(264))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(264))));
//                    input.IN_A5003SFC6 = cleanValue(getCellValue(row.getCell(265)));
//                    input.IN_A5003ISP6 = cleanValue(getCellValue(row.getCell(266)));
//                    input.IN_A5003KEY7 = cleanValue(getCellValue(row.getCell(267)));
//                    input.IN_A5003LEF7 = cleanValue(getCellValue(row.getCell(268)));
//                    input.IN_A5003TCO7 = cleanValue(getCellValue(row.getCell(269)));
//                    input.IN_A5003TMO7 = cleanValue(getCellValue(row.getCell(270))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(270))));
//                    input.IN_A5003TCU7 = cleanValue(getCellValue(row.getCell(271)));
//                    input.IN_A5003SFA7 = cleanValue(getCellValue(row.getCell(272))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(272))));
//                    input.IN_A5003SFC7 = cleanValue(getCellValue(row.getCell(273)));
//                    input.IN_A5003ISP7 = cleanValue(getCellValue(row.getCell(274)));
//                    input.IN_A5003KEY8 = cleanValue(getCellValue(row.getCell(275)));
//                    input.IN_A5003LEF8 = cleanValue(getCellValue(row.getCell(276)));
//                    input.IN_A5003TCO8 = cleanValue(getCellValue(row.getCell(277)));
//                    input.IN_A5003TMO8 = cleanValue(getCellValue(row.getCell(278))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(278))));
//                    input.IN_A5003TCU8 = cleanValue(getCellValue(row.getCell(279)));
//                    input.IN_A5003SFA8 = cleanValue(getCellValue(row.getCell(280))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(280))));
//                    input.IN_A5003SFC8 = cleanValue(getCellValue(row.getCell(281)));
//                    input.IN_A5003ISP8 = cleanValue(getCellValue(row.getCell(282)));
//                    input.IN_A5003KEY9 = cleanValue(getCellValue(row.getCell(283)));
//                    input.IN_A5003LEF9 = cleanValue(getCellValue(row.getCell(284)));
//                    input.IN_A5003TCO9 = cleanValue(getCellValue(row.getCell(285)));
//                    input.IN_A5003TMO9 = cleanValue(getCellValue(row.getCell(286))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(286))));
//                    input.IN_A5003TCU9 = cleanValue(getCellValue(row.getCell(287)));
//                    input.IN_A5003SFA9 = cleanValue(getCellValue(row.getCell(288))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(288))));
//                    input.IN_A5003SFC9 = cleanValue(getCellValue(row.getCell(289)));
//                    input.IN_A5003ISP9 = cleanValue(getCellValue(row.getCell(290)));
//                    input.IN_A5003KEY10 = cleanValue(getCellValue(row.getCell(291)));
//                    input.IN_A5003LEF10 = cleanValue(getCellValue(row.getCell(292)));
//                    input.IN_A5003TCO10 = cleanValue(getCellValue(row.getCell(293)));
//                    input.IN_A5003TMO10 = cleanValue(getCellValue(row.getCell(294))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(294))));
//                    input.IN_A5003TCU10 = cleanValue(getCellValue(row.getCell(295)));
//                    input.IN_A5003SFA10 = cleanValue(getCellValue(row.getCell(296))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(296))));
//                    input.IN_A5003SFC10 = cleanValue(getCellValue(row.getCell(297)));
//                    input.IN_A5003ISP10 = cleanValue(getCellValue(row.getCell(298)));
//                    input.IN_A5003KEY11 = cleanValue(getCellValue(row.getCell(299)));
//                    input.IN_A5003LEF11 = cleanValue(getCellValue(row.getCell(300)));
//                    input.IN_A5003TCO11 = cleanValue(getCellValue(row.getCell(301)));
//                    input.IN_A5003TMO11 = cleanValue(getCellValue(row.getCell(302))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(302))));
//                    input.IN_A5003TCU11 = cleanValue(getCellValue(row.getCell(303)));
//                    input.IN_A5003SFA11 = cleanValue(getCellValue(row.getCell(304))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(304))));
//                    input.IN_A5003SFC11 = cleanValue(getCellValue(row.getCell(305)));
//                    input.IN_A5003ISP11 = cleanValue(getCellValue(row.getCell(306)));
//                    input.IN_A5003KEY12 = cleanValue(getCellValue(row.getCell(307)));
//                    input.IN_A5003LEF12 = cleanValue(getCellValue(row.getCell(308)));
//                    input.IN_A5003TCO12 = cleanValue(getCellValue(row.getCell(309)));
//                    input.IN_A5003TMO12 = cleanValue(getCellValue(row.getCell(310))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(310))));
//                    input.IN_A5003TCU12 = cleanValue(getCellValue(row.getCell(311)));
//                    input.IN_A5003SFA12 = cleanValue(getCellValue(row.getCell(312))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(312))));
//                    input.IN_A5003SFC12 = cleanValue(getCellValue(row.getCell(313)));
//                    input.IN_A5003ISP12 = cleanValue(getCellValue(row.getCell(314)));
//                    input.IN_A5003KEY13 = cleanValue(getCellValue(row.getCell(315)));
//                    input.IN_A5003LEF13 = cleanValue(getCellValue(row.getCell(316)));
//                    input.IN_A5003TCO13 = cleanValue(getCellValue(row.getCell(317)));
//                    input.IN_A5003TMO13 = cleanValue(getCellValue(row.getCell(318))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(318))));
//                    input.IN_A5003TCU13 = cleanValue(getCellValue(row.getCell(319)));
//                    input.IN_A5003SFA13 = cleanValue(getCellValue(row.getCell(320))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(320))));
//                    input.IN_A5003SFC13 = cleanValue(getCellValue(row.getCell(321)));
//                    input.IN_A5003ISP13 = cleanValue(getCellValue(row.getCell(322)));
//                    input.IN_A5003KEY14 = cleanValue(getCellValue(row.getCell(323)));
//                    input.IN_A5003LEF14 = cleanValue(getCellValue(row.getCell(324)));
//                    input.IN_A5003TCO14 = cleanValue(getCellValue(row.getCell(325)));
//                    input.IN_A5003TMO14 = cleanValue(getCellValue(row.getCell(326))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(326))));
//                    input.IN_A5003TCU14 = cleanValue(getCellValue(row.getCell(327)));
//                    input.IN_A5003SFA14 = cleanValue(getCellValue(row.getCell(328))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(328))));
//                    input.IN_A5003SFC14 = cleanValue(getCellValue(row.getCell(329)));
//                    input.IN_A5003ISP14 = cleanValue(getCellValue(row.getCell(330)));
//                    input.IN_A5003KEY15 = cleanValue(getCellValue(row.getCell(331)));
//                    input.IN_A5003LEF15 = cleanValue(getCellValue(row.getCell(332)));
//                    input.IN_A5003TCO15 = cleanValue(getCellValue(row.getCell(333)));
//                    input.IN_A5003TMO15 = cleanValue(getCellValue(row.getCell(334))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(334))));
//                    input.IN_A5003TCU15 = cleanValue(getCellValue(row.getCell(335)));
//                    input.IN_A5003SFA15 = cleanValue(getCellValue(row.getCell(336))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(336))));
//                    input.IN_A5003SFC15 = cleanValue(getCellValue(row.getCell(337)));
//                    input.IN_A5003ISP15 = cleanValue(getCellValue(row.getCell(338)));
//                    input.IN_A5003KEY16 = cleanValue(getCellValue(row.getCell(339)));
//                    input.IN_A5003LEF16 = cleanValue(getCellValue(row.getCell(340)));
//                    input.IN_A5003TCO16 = cleanValue(getCellValue(row.getCell(341)));
//                    input.IN_A5003TMO16 = cleanValue(getCellValue(row.getCell(342))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(342))));
//                    input.IN_A5003TCU16 = cleanValue(getCellValue(row.getCell(343)));
//                    input.IN_A5003SFA16 = cleanValue(getCellValue(row.getCell(344))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(344))));
//                    input.IN_A5003SFC16 = cleanValue(getCellValue(row.getCell(345)));
//                    input.IN_A5003ISP16 = cleanValue(getCellValue(row.getCell(346)));
//                    input.IN_A5003KEY17 = cleanValue(getCellValue(row.getCell(347)));
//                    input.IN_A5003LEF17 = cleanValue(getCellValue(row.getCell(348)));
//                    input.IN_A5003TCO17 = cleanValue(getCellValue(row.getCell(349)));
//                    input.IN_A5003TMO17 = cleanValue(getCellValue(row.getCell(350))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(350))));
//                    input.IN_A5003TCU17 = cleanValue(getCellValue(row.getCell(351)));
//                    input.IN_A5003SFA17 = cleanValue(getCellValue(row.getCell(352))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(352))));
//                    input.IN_A5003SFC17 = cleanValue(getCellValue(row.getCell(353)));
//                    input.IN_A5003ISP17 = cleanValue(getCellValue(row.getCell(354)));
//                    input.IN_A5003KEY18 = cleanValue(getCellValue(row.getCell(355)));
//                    input.IN_A5003LEF18 = cleanValue(getCellValue(row.getCell(356)));
//                    input.IN_A5003TCO18 = cleanValue(getCellValue(row.getCell(357)));
//                    input.IN_A5003TMO18 = cleanValue(getCellValue(row.getCell(358))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(358))));
//                    input.IN_A5003TCU18 = cleanValue(getCellValue(row.getCell(359)));
//                    input.IN_A5003SFA18 = cleanValue(getCellValue(row.getCell(360))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(360))));
//                    input.IN_A5003SFC18 = cleanValue(getCellValue(row.getCell(361)));
//                    input.IN_A5003ISP18 = cleanValue(getCellValue(row.getCell(362)));
//                    input.IN_A5003KEY19 = cleanValue(getCellValue(row.getCell(363)));
//                    input.IN_A5003LEF19 = cleanValue(getCellValue(row.getCell(364)));
//                    input.IN_A5003TCO19 = cleanValue(getCellValue(row.getCell(365)));
//                    input.IN_A5003TMO19 = cleanValue(getCellValue(row.getCell(366))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(366))));
//                    input.IN_A5003TCU19 = cleanValue(getCellValue(row.getCell(367)));
//                    input.IN_A5003SFA19 = cleanValue(getCellValue(row.getCell(368))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(368))));
//                    input.IN_A5003SFC19 = cleanValue(getCellValue(row.getCell(369)));
//                    input.IN_A5003ISP19 = cleanValue(getCellValue(row.getCell(370)));
//                    input.IN_A5003KEY20 = cleanValue(getCellValue(row.getCell(371)));
//                    input.IN_A5003LEF20 = cleanValue(getCellValue(row.getCell(372)));
//                    input.IN_A5003TCO20 = cleanValue(getCellValue(row.getCell(373)));
//                    input.IN_A5003TMO20 = cleanValue(getCellValue(row.getCell(374))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(374))));
//                    input.IN_A5003TCU20 = cleanValue(getCellValue(row.getCell(375)));
//                    input.IN_A5003SFA20 = cleanValue(getCellValue(row.getCell(376))).isEmpty() ? 0.0 : Double.parseDouble(cleanValue(getCellValue(row.getCell(376))));
//                    input.IN_A5003SFC20 = cleanValue(getCellValue(row.getCell(377)));
//                    input.IN_A5003ISP20 = cleanValue(getCellValue(row.getCell(378)));
//                    input.IN_A5003COD1 = cleanValue(getCellValue(row.getCell(379)));
//                    input.IN_A5003ISR1 = cleanValue(getCellValue(row.getCell(380)));
//                    input.IN_A5003COD2 = cleanValue(getCellValue(row.getCell(381)));
//                    input.IN_A5003ISR2 = cleanValue(getCellValue(row.getCell(382)));
//                    input.IN_A5003COD3 = cleanValue(getCellValue(row.getCell(383)));
//                    input.IN_A5003ISR3 = cleanValue(getCellValue(row.getCell(384)));
//                    input.IN_A5003COD4 = cleanValue(getCellValue(row.getCell(385)));
//                    input.IN_A5003ISR4 = cleanValue(getCellValue(row.getCell(386)));
//                    input.IN_A5003COD5 = cleanValue(getCellValue(row.getCell(387)));
//                    input.IN_A5003ISR5 = cleanValue(getCellValue(row.getCell(388)));
//                    input.IN_A5003COD6 = cleanValue(getCellValue(row.getCell(389)));
//                    input.IN_A5003ISR6 = cleanValue(getCellValue(row.getCell(390)));
//                    input.IN_A5003COD7 = cleanValue(getCellValue(row.getCell(391)));
//                    input.IN_A5003ISR7 = cleanValue(getCellValue(row.getCell(392)));
//                    input.IN_A5003COD8 = cleanValue(getCellValue(row.getCell(393)));
//                    input.IN_A5003ISR8 = cleanValue(getCellValue(row.getCell(394)));
//                    input.IN_A5003COD9 = cleanValue(getCellValue(row.getCell(395)));
//                    input.IN_A5003ISR9 = cleanValue(getCellValue(row.getCell(396)));
//                    input.IN_A5003COD10 = cleanValue(getCellValue(row.getCell(397)));
//                    input.IN_A5003ISR10 = cleanValue(getCellValue(row.getCell(398)));
//                    input.IN_A5003COD11 = cleanValue(getCellValue(row.getCell(399)));
//                    input.IN_A5003ISR11 = cleanValue(getCellValue(row.getCell(400)));
//                    input.IN_A5003COD12 = cleanValue(getCellValue(row.getCell(401)));
//                    input.IN_A5003ISR12 = cleanValue(getCellValue(row.getCell(402)));
//                    input.IN_A5003COD13 = cleanValue(getCellValue(row.getCell(403)));
//                    input.IN_A5003ISR13 = cleanValue(getCellValue(row.getCell(404)));
//                    input.IN_A5003COD14 = cleanValue(getCellValue(row.getCell(405)));
//                    input.IN_A5003ISR14 = cleanValue(getCellValue(row.getCell(406)));
//                    input.IN_A5003COD15 = cleanValue(getCellValue(row.getCell(407)));
//                    input.IN_A5003ISR15 = cleanValue(getCellValue(row.getCell(408)));
//                    input.IN_A5003COD16 = cleanValue(getCellValue(row.getCell(409)));
//                    input.IN_A5003ISR16 = cleanValue(getCellValue(row.getCell(410)));
//                    input.IN_A5003COD17 = cleanValue(getCellValue(row.getCell(411)));
//                    input.IN_A5003ISR17 = cleanValue(getCellValue(row.getCell(412)));
//                    input.IN_A5003COD18 = cleanValue(getCellValue(row.getCell(413)));
//                    input.IN_A5003ISR18 = cleanValue(getCellValue(row.getCell(414)));
//                    input.IN_A5003COD19 = cleanValue(getCellValue(row.getCell(415)));
//                    input.IN_A5003ISR19 = cleanValue(getCellValue(row.getCell(416)));
//                    input.IN_A5003COD20 = cleanValue(getCellValue(row.getCell(417)));
//                    input.IN_A5003ISR20 = cleanValue(getCellValue(row.getCell(418)));
//
//                    lstData.add(input);
//                    messageInsertError = "Ticket Correcto en Excel -: " + input.IN_A5003TKTF;
//                    addLog(messageInsertError);
//
//                    try {
//                        messageInsertA0053 = logic.insertGoodA5003(input, siguienteSecuencia, fechaFilename);
//
//                        if (messageInsertA0053 != null && messageInsertA0053.toLowerCase().contains("error al insertar en a5003:")) {
//                            try {
//                                input.IN_A5003STVAL = "2";
//                                messageInsertError = logic.insertA5003(input, siguienteSecuencia, fechaFilename);
//                            } catch (Exception e) {
//                                messageInsertError = "Error al insertar en A5003: " + e.getMessage();
//                                addLog(messageInsertError);
//                                map.put("success", false);
//                                map.put("msjResult", message);
//                                return new Gson().toJson(map);
//                            }
//
//                            total_errores += 1;
//
//                            messageInsertError = "Insertando Ticket con Error en A5003: " + i;
//                            addLog(messageInsertError);
//
//                            continue;
//                        } else {
//                            total_escritos += 1;
//                        }
//
//                    } catch (Exception e) {
//                        messageInsertA0053 = "Error al insertar en A5003 en tipo de dato: " + e.getMessage();
//                        addLog(messageInsertA0053);
//                        map.put("success", false);
//                        map.put("msjResult", message);
//                        return new Gson().toJson(map);
//                    }
//
//                    continue;
//
//                }
//            }
//        } catch (Exception e) {
//            message = "Error en línea: " + i + " - " + e.getMessage();
//            e.printStackTrace();
//        } finally {
//            if (archivo != null && archivo.exists()) {
//                archivo.delete();
//            }
//        }
//
//        try {
//            String result = logic.insertAndUpdateA2270_A2359(
//                    total_leidos, total_escritos, total_errores, fechaActual, user, horaActual
//            );
//            map.put("success", true);
//            map.put("msjResult", result);
//        } catch (Exception e) {
//            String errorMsg = "Error en carga de A2270/A2359: " + e.getMessage();
//            addLog(errorMsg);
//            map.put("success", false);
//            map.put("msjResult", errorMsg);
//        }
//
//        try {
//            String resultSQP05572 = logic.SQP05572(fechaActual);
//            map.put("success", true);
//            map.put("msjResult", resultSQP05572);
//        } catch (Exception e) {
//            String errorMsg = "Error al ejecutar SQP05572: " + e.getMessage();
//            addLog(errorMsg);
//            map.put("success", false);
//            map.put("msjResult", errorMsg);
//
//            return new Gson().toJson(map);
//        }
//        return new Gson().toJson(map);
//
//    }
    
    

}
