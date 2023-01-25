/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A4137Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.DisputemanagementMyarcFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.json.JSONException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/DisputemanagementMyarcForm")
public class DisputemanagementMyarcFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DisputemanagementMyarcFormLogic logic;

    @RequestMapping(value = "SearchReportMyarc")
    public @ResponseBody
    String SearchReportMyarc(ModelMap map, HttpServletRequest request) {
        List<A4137Filter> lst;
        A4137Filter filter = new A4137Filter();

        try {
            logic = new DisputemanagementMyarcFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION");
            filter.IN_NUMBERADM = request.getParameter("IN_NUMBERADM");
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_BASE = request.getParameter("IN_BASE");
            filter.IN_USER = request.getParameter("IN_USER");
            filter.IN_TYPE = request.getParameter("IN_TYPE");
            filter.IN_AREA = request.getParameter("IN_AREA");
            filter.IN_ORIGEN = request.getParameter("IN_ORIGEN");
            filter.IN_STATUS2 = request.getParameter("IN_FLAG");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.SearchReportMyarc(filter);

            map.put("success", true);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
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

    @RequestMapping(value = "SearchDataDetaill")
    public @ResponseBody
    String SearchDataIni(ModelMap map, HttpServletRequest request) {
        A4137Filter lst;
        A4137Filter filter = new A4137Filter();

        HashMap map01, map02, map03, map04;

        ArrayList<HashMap<String, String>> lst_RazonEmision = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_DispuRazon = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_dataIni = new ArrayList<>();
        try {
            logic = new DisputemanagementMyarcFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME");
            filter.IN_ANIO = request.getParameter("IN_ANIO");
            filter.IN_CNXPA = request.getParameter("IN_CNXPA");

            lst = logic.SearchDataDetaill(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_dataIni">
            for (int vi = 0; vi < lst.lst_dataIni.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A2548TIKET", lst.lst_dataIni.get(vi).A2548TIKET);
                map01.put("A2548MDA", lst.lst_dataIni.get(vi).A2548MDA);
                map01.put("A2548TARID", lst.lst_dataIni.get(vi).A2548TARID);

                map01.put("A2548TTAXD", lst.lst_dataIni.get(vi).A2548TTAXD);
                map01.put("A2548COMID", lst.lst_dataIni.get(vi).A2548COMID);
                map01.put("A2548TAXCD", lst.lst_dataIni.get(vi).A2548TAXCD);
                map01.put("A2548PENAD", lst.lst_dataIni.get(vi).A2548PENAD);
                map01.put("A2548TCARD", lst.lst_dataIni.get(vi).A2548TCARD);
                map01.put("A2548NETO", lst.lst_dataIni.get(vi).A2548NETO);

                lst_dataIni.add(map01);
            }
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="ArrayList -> RAZONES DEBITOS">
            for (int vi = 0; vi < lst.lst_razones.size(); ++vi) {
                map03 = new HashMap<>();

                map03.put("A2553TYPO", lst.lst_razones.get(vi).A2553TYPO);
                map03.put("A2553CODE", lst.lst_razones.get(vi).A2553CODE);
                map03.put("A2553DESCR", lst.lst_razones.get(vi).A2553DESCR);

                lst_RazonEmision.add(map03);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> RAZONES MYARC">
            for (int vi = 0; vi < lst.lst_disputa.size(); ++vi) {
                map04 = new HashMap<>();

                map04.put("A4138CCUST", lst.lst_disputa.get(vi).A4138CCUST);
                map04.put("A4138STAT", lst.lst_disputa.get(vi).A4138STAT);
                map04.put("A4138DESCR", lst.lst_disputa.get(vi).A4138DESCR);
                map04.put("A4138ARCHV", lst.lst_disputa.get(vi).A4138ARCHV);
                map04.put("A4138REGIS", lst.lst_disputa.get(vi).A4138REGIS);
                map04.put("A4138FREGI", lst.lst_disputa.get(vi).A4138FREGI);
                map04.put("A4138HREGI", lst.lst_disputa.get(vi).A4138HREGI);
                map04.put("A4138ORIGE", lst.lst_disputa.get(vi).A4138ORIGE);
                map04.put("A4138TYPE", lst.lst_disputa.get(vi).A4138TYPE);
                map04.put("A4138STAR", lst.lst_disputa.get(vi).A4138STAR);

                lst_DispuRazon.add(map04);
            }
            // </editor-fold>
            map.put("success", true);
            map.put("lst_dataIni", lst_dataIni);
            map.put("lst_DispuRazon", lst_DispuRazon);
            map.put("lst_RazonEmision", lst_RazonEmision);
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

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("fileaudito") MultipartFile file, HttpServletRequest request) {
        A4137Filter filter = new A4137Filter();
        A4137Filter listenvio = new A4137Filter();
        String VL_ARCHI = "";
        String result2 = "";
        String result = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new DisputemanagementMyarcFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            String NAME_ARCHV = file.getOriginalFilename();

            listenvio.IN_PREME = filter.IN_PREME;
            listenvio.IN_ANIO = filter.IN_ANIO;
            listenvio.IN_CNXPA = filter.IN_CNXPA;
            listenvio.IN_DESCR = filter.IN_DESCR;
            listenvio.IN_PAIS = filter.IN_PAIS;
            listenvio.IN_STATUS = filter.IN_STATUS;
            listenvio.IN_STATUS2 = filter.IN_STATUS2;
            listenvio.IN_TRNCU = filter.IN_TRNCU;
            listenvio.IN_NUMBERADM = filter.IN_NUMBERADM;
            listenvio.IN_ARCHV = NAME_ARCHV;
            if (!VL_ARCHI.equals("")) {
                byte[] bytes = file.getBytes();
                //result = upload(bytes, filter.IN_PREME, filter.IN_ANIO);
                result = logic.insertTracing(listenvio);
            } else {
                result = logic.insertTracing(listenvio);
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

    public String upload(byte[] bytes, String nroMemo, String nomArchivo) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "";
        try {
            String strSesion = UUID.randomUUID().toString();

            String rutaMemo = "\\\\10.0.0.87\\amaudit\\DISPUTAS\\WEB\\" + nroMemo;
            Path dir = Paths.get(rutaMemo);
            File directory = new File(String.valueOf(dir));
            if (!Files.exists(dir)) {
                directory.mkdir();
            }
            File dir2 = new File(directory, Functions.getFechaActual());
            dir2.mkdir();
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
    
    @RequestMapping(value = "GetFilesDirectory")
    public @ResponseBody
    String GetFilesDirectory(ModelMap map, HttpServletRequest request) throws UnirestException, JSONException {

        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        String path_config = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String IN_PATH = path_config + "\\IMGTMPDISPUTE\\";
        String IN_DATE = request.getParameter("IN_DATE").trim();
        String IN_ANIO = request.getParameter("IN_ANIO").trim();
        String IN_PREME = request.getParameter("IN_PREME").trim();

        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);

        /*
         Preparando parámetros para enviar por body
         */
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_OPTION", "1");
        bodyData.put("IN_PATH", IN_PATH);
        bodyData.put("IN_DATE", IN_DATE);
        bodyData.put("IN_ANIO", IN_ANIO);
        bodyData.put("IN_PREME", IN_PREME);

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/download/disputearc/all/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String body = response.getBody().getObject().get("data").toString();

        map.put("success", true);
        map.put("data", body);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A4137Filter filter = new A4137Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new DisputemanagementMyarcFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4137Filter> listaData = logic.SearchReportMyarc(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Dispute Management MYARC");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15;
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

            CH_00.setCellValue("Origin");
            CH_01.setCellValue("Memo number");
            CH_02.setCellValue("Country");
            CH_03.setCellValue("IATA");
            CH_04.setCellValue("Agency");
            CH_05.setCellValue("Currency");
            CH_06.setCellValue("Amount");
            CH_07.setCellValue("Processing Date");
            CH_08.setCellValue("Dispute Date");
            CH_09.setCellValue("System Date");
            CH_10.setCellValue("Audit");
            CH_11.setCellValue("Base");
            CH_12.setCellValue("Area");
            CH_13.setCellValue("Status");
            CH_14.setCellValue("Status MYARC");
            CH_15.setCellValue("Days");

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

                CH_00.setCellValue(listaData.get(vi).A4137ORIGE);
                CH_01.setCellValue(listaData.get(vi).A4137NMEMO);
                CH_02.setCellValue(listaData.get(vi).A4137PAIS);
                CH_03.setCellValue(listaData.get(vi).A4137IATA);
                CH_04.setCellValue(listaData.get(vi).A4137AGEN);
                CH_05.setCellValue(listaData.get(vi).A4137MDA);
                CH_06.setCellValue(listaData.get(vi).A4137NETO);
                CH_07.setCellValue(listaData.get(vi).A4137FPROC);
                CH_08.setCellValue(listaData.get(vi).A4137DDATE);
                CH_09.setCellValue(listaData.get(vi).A4137FREGI);
                CH_10.setCellValue(listaData.get(vi).A4137USER);
                CH_11.setCellValue(listaData.get(vi).A4137BASE);
                CH_12.setCellValue(listaData.get(vi).A4137AREA);
                String Status = "";
                if (listaData.get(vi).A4137FLAG.equals("DI")) {
                    Status = "Disputed";
                }
                if (listaData.get(vi).A4137FLAG.equals("DE")) {
                    Status = "Rejected dispute";
                }
                if (listaData.get(vi).A4137FLAG.equals("WA")) {
                    Status = "Approved dispute";
                }
                CH_13.setCellValue(Status);
                CH_14.setCellValue(listaData.get(vi).A4137STATO);
                CH_15.setCellValue(listaData.get(vi).A4137DIAS);

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
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            //sheet.autoSizeColumn(4, true);
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

            String fileNameDownload = String.format("Dispute Management MYARC - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "insertFile")
    public @ResponseBody
    String insertFile(ModelMap map, HttpServletRequest request) {
        A4137Filter filter = new A4137Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new DisputemanagementMyarcFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.insertFile(filter);

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

}
