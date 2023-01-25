/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
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
import net.miatech.beans.SaleAudit.A3329Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.PendingGroupingFormLogic;
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
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/PendingGroupingForm")
public class PendingGroupingFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PendingGroupingFormLogic logic;

    @RequestMapping(value = "searchgrouping")
    public @ResponseBody
    String searchgrouping(ModelMap map, HttpServletRequest request) {
        List<A3329Filter> lst;
        A3329Filter filter = new A3329Filter();

        try {
            logic = new PendingGroupingFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_CHANNEL = request.getParameter("VP_CHANNEL");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_STATUS = request.getParameter("VP_STATUS");
            filter.VP_USER = request.getParameter("VP_USER");
            filter.VP_IATA = request.getParameter("VP_IATA");
            filter.VP_TKT = request.getParameter("VP_TKT");
            filter.VP_SEQ = request.getParameter("VP_SEQ");
            filter.VP_COXPADRE = request.getParameter("VP_COXPADRE");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.searchgrouping(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3329Filter filter = new A3329Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new PendingGroupingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3329Filter> lst = logic.searchgrouping(filter);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("PendingGrouping");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();

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

            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12;

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

            CH_00.setCellValue("System Date");
            CH_01.setCellValue("Processing Date");
            CH_02.setCellValue("Country");
            CH_03.setCellValue("Ticket");
            CH_04.setCellValue("Iata");
            CH_05.setCellValue("Agency");
            CH_06.setCellValue("Source");
            CH_07.setCellValue("Currency");
            CH_08.setCellValue("Amount");
            CH_09.setCellValue("User");
            CH_10.setCellValue("Grouping");
            CH_11.setCellValue("Processed");
            CH_12.setCellValue("Status");

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

            ++vj;

            while (iter.hasNext()) {
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

                CH_00.setCellValue(lst.get(vi).A3329FREGI);
                CH_01.setCellValue(lst.get(vi).A3329FPROC);
                CH_02.setCellValue(lst.get(vi).A3329PAIS);
                CH_03.setCellValue(lst.get(vi).A3329TIKET);
                CH_04.setCellValue(lst.get(vi).A3329IATA);
                CH_05.setCellValue(lst.get(vi).A3329NAMEAGEN);
                CH_06.setCellValue(lst.get(vi).A3329FUETE);
                CH_07.setCellValue(lst.get(vi).A3329CUR);
                CH_08.setCellValue(lst.get(vi).A3329NETO);
                CH_09.setCellValue(lst.get(vi).A3329REGIS);
                CH_10.setCellValue(lst.get(vi).A3329CNXPA);
                CH_11.setCellValue(lst.get(vi).A3329FLAG);
                CH_12.setCellValue(lst.get(vi).A3329STATU);

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

            String fileNameDownload = String.format("PendingGrouping - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "insertLisTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String marcarRev(ModelMap map, @RequestParam("file") MultipartFile file, HttpServletRequest request) {
        A3329Filter filter = new A3329Filter();
        ArrayList<A3329Filter> lstSelectedTkts = new ArrayList<A3329Filter>();
        String result2 = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new PendingGroupingFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            String vl_A3329ARCHI = file.getOriginalFilename();
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanSelectedTkts")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3329Filter data = new A3329Filter();
                data.A3329CIA = gsonObj.get("A3329CIA").getAsString();
                data.A3329FORMA = gsonObj.get("A3329FORMA").getAsString();
                data.A3329SERIE = gsonObj.get("A3329SERIE").getAsString();
                data.A3329SEQ = gsonObj.get("A3329SEQ").getAsString();
                data.A3329CPN = gsonObj.get("A3329CPN").getAsString();
                data.A3329TRNCU = gsonObj.get("A3329TRNCU").getAsString();
                data.A3329CORRL = gsonObj.get("A3329CORRL").getAsString();

                lstSelectedTkts.add(data);

            }
            String result = logic.insertLisTracingFile(filter, lstSelectedTkts, vl_A3329ARCHI);
            if (result.equals("Operation was successful.")) {
                result = "The record was saved successfully.";
                if (!vl_A3329ARCHI.equals("")) {
                    byte[] bytes = file.getBytes();
                    for (A3329Filter obj : lstSelectedTkts) {
                        result2 = upload(bytes, obj.A3329CIA + "" + obj.A3329FORMA + "" + obj.A3329SERIE + "" + obj.A3329SEQ + "" + obj.A3329CPN+""+obj.A3329TRNCU, vl_A3329ARCHI);
                        result2 = upload_s3(obj.A3329CIA + "" + obj.A3329FORMA + "" + obj.A3329SERIE + "" + obj.A3329SEQ + "" + obj.A3329CPN+""+obj.A3329TRNCU, vl_A3329ARCHI);
                    }
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

    public String upload(byte[] bytes, String TKT, String nomArchivo) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "";
        try {
            String strSesion = UUID.randomUUID().toString();

            //String rutaMemo = "\\\\10.0.0.87\\AMAUDIT\\PRUEBAS\\" + nroMemo;
            //String rutaMemo = "\\\\PX\\AMAUDIT\\TKT\\" + TKT;
            String rutaMemo = "\\\\10.0.0.87\\AMAUDIT\\TKT\\" + TKT;
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
     public String upload_s3(String TKT, String nomArchivo) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();


        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_PATH", "\\\\10.0.0.87\\AMAUDIT\\TKT\\" + TKT + "\\" + Functions.getFechaActual());
        bodyData.put("IN_PREFIX", "ACCEPTED/");
        bodyData.put("IN_DATE", Functions.getFechaActual());

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/upload_s3/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

}
