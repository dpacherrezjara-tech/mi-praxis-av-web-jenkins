/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.controllers.refund;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.refund.ControlBsplinkProcessLogic;
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
@RequestMapping("/ControlBsplinkProcess")

public class ControlBsplinkProcessController extends BaseController {

    private ControlBsplinkProcessLogic logic;

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

    
    @RequestMapping(value = "searchAvianca")
    public @ResponseBody
    String searchAvianca(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("ControlBsplinkProcessController : searchAvianca");
        HashMap m = new HashMap();
        logic = new ControlBsplinkProcessLogic();
        List<A3096Filter> lstData = new ArrayList<>(0);
        A3096Filter filter = new A3096Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic.setSession(cs.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lstData = logic.loadRFS0034(filter);

            m.put("success", true);

            if (dw_excel) {

                ExportUtil.exportFields(request, response, lstData);
            } else {
                m.put("data", lstData);
                m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }

        } catch (Exception e) {
            m.put("success", false);

        }

        return new Gson().toJson(m);
    }


    ////////////////////////////////////////////////////////////////7
    ////////////////////////    HACEMOS EL EXCEL   /////////////////
    ///////////////////////////////////////////////////////////////////////77

    @RequestMapping(value = "getXLSX")
public void getXLSX(HttpServletRequest request,
                    HttpServletResponse response) throws Exception {

    System.out.println("ControlBsplinkProcessController : getXLSX");

    A3096Filter filter = new A3096Filter();

    String fileNameDownload =
            "BSPLink_Avianca_" + Functions.getFechaActual() + ".xlsx";

    try {

        Workbook workbook;
        File file = File.createTempFile(fileNameDownload, ".xlsx");

        logic = new ControlBsplinkProcessLogic();

        logic.setSession(cs.getServerSession());

        filter = new Gson().fromJson(
                request.getParameter("beanString"),
                filter.getClass()
        );

        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        List<A3096Filter> listaData = logic.loadRFS0034(filter);

        workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("BSPLink Avianca");

        XSSFCellStyle headerStyle =
                (XSSFCellStyle) workbook.createCellStyle();

        XSSFCellStyle bodyStyle =
                (XSSFCellStyle) workbook.createCellStyle();

        Font headerFont = workbook.createFont();

        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

        headerFont.setColor(IndexedColors.BLACK.getIndex());

        // HEADER STYLE
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);

        headerStyle.setAlignment(CellStyle.ALIGN_CENTER);

        headerStyle.setFillForegroundColor(
                new XSSFColor(new java.awt.Color(127, 152, 168))
        );

        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

        headerStyle.setFont(headerFont);

        // BODY STYLE
        bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
        bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
        bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
        bodyStyle.setBorderTop(CellStyle.BORDER_THIN);

        int vi = 0;
        int vj = 0;

        Iterator iter = listaData.iterator();

        // ================= HEADERS =================

        Row row1 = sheet.createRow(vj);

        Cell CH0 = row1.createCell(0);
        Cell CH1 = row1.createCell(1);
        Cell CH2 = row1.createCell(2);
        Cell CH3 = row1.createCell(3);
        Cell CH4 = row1.createCell(4);
        Cell CH5 = row1.createCell(5);
        Cell CH6 = row1.createCell(6);

        CH0.setCellValue("Load Date");
        CH1.setCellValue("File Date");
        CH2.setCellValue("Total");
        CH3.setCellValue("Pending");
        CH4.setCellValue("Approved");
        CH5.setCellValue("Rejected");
        CH6.setCellValue("Processed");

        CH0.setCellStyle(headerStyle);
        CH1.setCellStyle(headerStyle);
        CH2.setCellStyle(headerStyle);
        CH3.setCellStyle(headerStyle);
        CH4.setCellStyle(headerStyle);
        CH5.setCellStyle(headerStyle);
        CH6.setCellStyle(headerStyle);

        ++vj;

        // ================= DATA =================

        while (iter.hasNext()) {

            row1 = sheet.createRow(vj);

            Cell r0 = row1.createCell(0);
            Cell r1 = row1.createCell(1);
            Cell r2 = row1.createCell(2);
            Cell r3 = row1.createCell(3);
            Cell r4 = row1.createCell(4);
            Cell r5 = row1.createCell(5);
            Cell r6 = row1.createCell(6);

            String secuencia =
                    listaData.get(vi).A3096RBT1 == null
                    ? "00"
                    : listaData.get(vi).A3096RBT1;

            r0.setCellValue(
                    listaData.get(vi).A3096DAUTH + " - " + secuencia
            );

            r1.setCellValue(listaData.get(vi).FILEFCAR);

            r2.setCellValue(listaData.get(vi).QTY_TOTAL_TICKETS);

            r3.setCellValue(listaData.get(vi).QTY_PENDIENTE);

            r4.setCellValue(listaData.get(vi).QTY_AUTORIZADO);

            r5.setCellValue(listaData.get(vi).QTY_RECHAZADO);

            r6.setCellValue(
                    "P".equals(listaData.get(vi).A3096PROCESSED)
                    ? "Pending"
                    : "Finished"
            );

            r0.setCellStyle(bodyStyle);
            r1.setCellStyle(bodyStyle);
            r2.setCellStyle(bodyStyle);
            r3.setCellStyle(bodyStyle);
            r4.setCellStyle(bodyStyle);
            r5.setCellStyle(bodyStyle);
            r6.setCellStyle(bodyStyle);

            iter.next();

            ++vi;
            ++vj;
        }

        // ================= AUTOSIZE =================

        for (int i = 0; i <= 6; i++) {
            sheet.autoSizeColumn(i, true);
        }

        // ================= RESPONSE =================

        response.setContentType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"" + fileNameDownload + "\""
        );

        FileOutputStream fos =
                new FileOutputStream(file.getAbsolutePath());

        workbook.write(response.getOutputStream());

        fos.close();

    } catch (Exception e) {

        e.printStackTrace();

    }
}
    
    
    
    ////DETALLE /////////////////////////
    @RequestMapping(value = "searchStatusBSPLinkAvianca")
    public @ResponseBody
    String searchStatusBSPLinkAvianca(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("ControlBsplinkProcessController : searchStatusBSPLinkAvianca");
        HashMap m = new HashMap();
        logic = new ControlBsplinkProcessLogic();
        List<A3096Filter> lstData = new ArrayList<>(0);
        A3096Filter filter = new A3096Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic.setSession(cs.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lstData = logic.RFS0035(filter);

            m.put("success", true);

            if (dw_excel) {
                for (A3096Filter item : lstData) {
                    // FLAG
                    switch (item.A4547FLAG) {
                        case "R":
                            item.A4547FLAG = "Rechazado";
                            break;
                        case "F":
                            item.A4547FLAG = "Autorizado";
                            break;
                        case "E":
                            item.A4547FLAG = "Error";
                            break;
                        default:
                            item.A4547FLAG = "";
                            break;
                    }

                    // STATU
                    switch (item.A4547STATU) {
                        case "A":
                            item.A4547STATU = "Proceso correctamente";
                            break;
                        case "M":
                            item.A4547STATU = "Solicitud eliminada en el BSPLINK";
                            break;
                        case "T":
                            item.A4547STATU = "Solicitud trabajada por AV";
                            break;
                        case "K":
                            item.A4547STATU = "Solicitud trabajada por AV con estado Rechazado";
                            break;
                        case "L":
                            item.A4547STATU = "Solicitud con agencia dada de baja";
                            break;
                        case "Z":
                            item.A4547STATU = "Solicitud con Airline diferente";
                            break;
                        case "P":
                            item.A4547STATU = "La FOP es MSC en el BSPLINK";
                            break;
                        default:
                            item.A4547STATU = "";
                            break;
                    }
                }

                ExportUtil.exportFields(request, response, lstData);
//                map.put("nameExcel", nameExcel);
            } else {
                m.put("data", lstData);
                m.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            m.put("success", false);

        }

        return new Gson().toJson(m);
    }
    
    
    
        
    //// EXCEL  DETALLE /////////////////////////
    
    @RequestMapping(value = "getXLSXDetail")
public void getXLSXDetail(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {

    System.out.println(
        "ControlBsplinkProcessController : getXLSXDetail"
    );

    A3096Filter filter = new A3096Filter();

    String fileNameDownload =
        "BSPLink_Avianca_Detail_" +
        Functions.getFechaActual() +
        ".xlsx";

    try {

        Workbook workbook;

        File file =
            File.createTempFile(fileNameDownload, ".xlsx");

        logic = new ControlBsplinkProcessLogic();

        logic.setSession(cs.getServerSession());

        filter = new Gson().fromJson(
            request.getParameter("beanString"),
            filter.getClass()
        );

        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;

        List<A3096Filter> listaData =
            logic.RFS0035(filter);

        workbook = new XSSFWorkbook();

        Sheet sheet =
            workbook.createSheet("BSPLink Avianca Detail");

        XSSFCellStyle headerStyle =
            (XSSFCellStyle) workbook.createCellStyle();

        XSSFCellStyle bodyStyle =
            (XSSFCellStyle) workbook.createCellStyle();

        Font headerFont = workbook.createFont();

        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

        headerFont.setColor(
            IndexedColors.BLACK.getIndex()
        );

        // HEADER STYLE
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);

        headerStyle.setAlignment(CellStyle.ALIGN_CENTER);

        headerStyle.setFillForegroundColor(
            new XSSFColor(new java.awt.Color(127, 152, 168))
        );

        headerStyle.setFillPattern(
            CellStyle.SOLID_FOREGROUND
        );

        headerStyle.setVerticalAlignment(
            CellStyle.VERTICAL_CENTER
        );

        headerStyle.setFont(headerFont);

        // BODY STYLE
        bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
        bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
        bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
        bodyStyle.setBorderTop(CellStyle.BORDER_THIN);

        int vi = 0;
        int vj = 0;

        Iterator iter = listaData.iterator();

        // ================= HEADERS =================

        Row row1 = sheet.createRow(vj);

        Cell CH0 = row1.createCell(0);
        Cell CH1 = row1.createCell(1);
        Cell CH2 = row1.createCell(2);
        Cell CH3 = row1.createCell(3);
        Cell CH4 = row1.createCell(4);
        Cell CH5 = row1.createCell(5);
        Cell CH6 = row1.createCell(6);
        Cell CH7 = row1.createCell(7);

        CH0.setCellValue("Load Date");
        CH1.setCellValue("Ticket");
        CH2.setCellValue("Refund Number");
        CH3.setCellValue("Country");
        CH4.setCellValue("Status");
        CH5.setCellValue("Status Description");
        CH6.setCellValue("Qty Send");
        CH7.setCellValue("Error Description");

        CH0.setCellStyle(headerStyle);
        CH1.setCellStyle(headerStyle);
        CH2.setCellStyle(headerStyle);
        CH3.setCellStyle(headerStyle);
        CH4.setCellStyle(headerStyle);
        CH5.setCellStyle(headerStyle);
        CH6.setCellStyle(headerStyle);
        CH7.setCellStyle(headerStyle);

        ++vj;

        // ================= DATA =================

        while (iter.hasNext()) {

            row1 = sheet.createRow(vj);

            Cell r0 = row1.createCell(0);
            Cell r1 = row1.createCell(1);
            Cell r2 = row1.createCell(2);
            Cell r3 = row1.createCell(3);
            Cell r4 = row1.createCell(4);
            Cell r5 = row1.createCell(5);
            Cell r6 = row1.createCell(6);
            Cell r7 = row1.createCell(7);

            r0.setCellValue(listaData.get(vi).A3096FCARG);
            r1.setCellValue(listaData.get(vi).A3096TKT);
            r2.setCellValue(listaData.get(vi).A3096IDSOL);
            r3.setCellValue(listaData.get(vi).A3096PAIS);

            String status = "";

            switch (listaData.get(vi).A4547FLAG) {

                case "R":
                    status = "Rejected";
                    break;

                case "F":
                    status = "Approved";
                    break;

                case "E":
                    status = "Error";
                    break;
            }

            r4.setCellValue(status);

            r5.setCellValue(listaData.get(vi).A4547STATU);

            r6.setCellValue(listaData.get(vi).A4547COUNT);

            r7.setCellValue(listaData.get(vi).A4547DESCR);

            r0.setCellStyle(bodyStyle);
            r1.setCellStyle(bodyStyle);
            r2.setCellStyle(bodyStyle);
            r3.setCellStyle(bodyStyle);
            r4.setCellStyle(bodyStyle);
            r5.setCellStyle(bodyStyle);
            r6.setCellStyle(bodyStyle);
            r7.setCellStyle(bodyStyle);

            iter.next();

            ++vi;
            ++vj;
        }

        // ================= AUTOSIZE =================

        for (int i = 0; i <= 7; i++) {

            sheet.autoSizeColumn(i, true);

        }

        // ================= RESPONSE =================

        response.setContentType(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        response.setHeader(
            "Content-Disposition",
            "attachment; filename=\"" + fileNameDownload + "\""
        );

        FileOutputStream fos =
            new FileOutputStream(file.getAbsolutePath());

        workbook.write(response.getOutputStream());

        fos.close();

    } catch (Exception e) {

        e.printStackTrace();

    }
}



    @RequestMapping(value = "excelStatusBSPLinkAviancaToAvianca")
    public @ResponseBody void excelStatusBSPLinkAviancaToAvianca(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("-------------- Reporte : excelStatusBSPLinkAviancaToAvianca -------------");
        Workbook workbook = null;
        String fileNameDownload = String.format("StatusBsplinkAvianca_%s.xlsx", Functions.getFechaActual());
        File file = File.createTempFile("statusBsplink", ".xlsx");

        ControlBsplinkProcessLogic logic = new ControlBsplinkProcessLogic();
        List<A3096Filter> lstData = new ArrayList<>(0);
        A3096Filter filter = new A3096Filter();

        try {
            logic.setSession(cs.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            // Configuración de paginación (todos los registros)
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            lstData = logic.RFS0036(filter);

            // Crear el Excel
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Status Report");

            // Estilo para cabecera
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(180, 198, 231)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setFont(headerFont);

            // Crear cabecera
            Row headerRow = sheet.createRow(0);
            String[] headers = {
                "Load Date","Ticket", "Refund Number", "Country", "Status", 
                "Status Descripcion"
            };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Rellenar filas con data
            int rowIdx = 1;
            for (A3096Filter item : lstData) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.A3096FCARG);
                row.createCell(1).setCellValue(item.A3096TKT);
                row.createCell(2).setCellValue(item.A3096IDSOL);
                row.createCell(3).setCellValue(item.A3096PAIS);
                row.createCell(4).setCellValue(item.A4547FLAG);
                row.createCell(5).setCellValue(item.A4547DESCR);
            }

            // Autoajustar columnas
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Configurar response
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            // Escribir el Excel
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }

    
    
    

}
