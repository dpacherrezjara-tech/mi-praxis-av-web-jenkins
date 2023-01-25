/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.async.Callback;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Future;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import static net.miatech.praxis.controllers.tnu.AtlUsageNoSaleController.zipFile;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.SpainInvoiceFormLogic;
import net.miatech.praxis.payment.filter.SQP02255Filter;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
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
@RequestMapping("/SpainInvoiceForm")
public class SpainInvoiceFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SpainInvoiceFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP02255Filter> lst;
        SQP02255Filter filter = new SQP02255Filter();

        try {
            logic = new SpainInvoiceFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_FROM = request.getParameter("VP_FROM");
            filter.VP_TO = request.getParameter("VP_TO");

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.size() : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "export_Xls")
    public @ResponseBody
    void export_Xls(HttpServletRequest request, HttpServletResponse response) {
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        try {
            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);
            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("CCUST", "139");
            bodyData.put("FPROCINI", request.getParameter("VP_FROM").trim());
            bodyData.put("FPROCFIN", request.getParameter("VP_TO").trim());
            bodyData.put("PATH", rutaFile);

            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            String urlAPI = "/api/spain_invoice/report001/";
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI)
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String error_code = responseAPI.getBody().getObject().get("error_code").toString();
            String error_msg = responseAPI.getBody().getObject().get("error_msg").toString();
            String filename = responseAPI.getBody().getObject().get("filename").toString();
            /*comprimir archivo
             */
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + filename + ".zip" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + filename + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    public Boolean zip(String fileName) {

        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String path = "C:\\Dumps";
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".zip");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".txt"), path + "\\" + fileName + ".zip");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        SQP02255Filter filter = new SQP02255Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.VP_FROM = request.getParameter("VP_FROM");
            filter.VP_TO = request.getParameter("VP_TO");

            logic = new SpainInvoiceFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP02255Filter> lst_search = logic.search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("FACTURA_ES_NEW");
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
            Iterator iter = lst_search.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25, CH_26, CH_27, CH_28, CH_29, CH_30, CH_31, CH_32, CH_33, CH_34, CH_35, CH_36, CH_37;
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
            CH_31 = row.createCell(31);
            CH_32 = row.createCell(32);
            CH_33 = row.createCell(33);
            CH_34 = row.createCell(34);
            CH_35 = row.createCell(35);
            CH_36 = row.createCell(36);
            CH_37 = row.createCell(37);

            CH_00.setCellValue("FECHA_EXPEDICION");
            CH_01.setCellValue("NOMBRE_PASAJERO");
            CH_02.setCellValue("NUMERO_BOLETO");
            CH_03.setCellValue("FUENTE");
            CH_04.setCellValue("TRX");
            CH_05.setCellValue("TDOC");
            CH_06.setCellValue("MONEDA");
            CH_07.setCellValue("PAIS_VENTA");
            CH_08.setCellValue("IATA");
            CH_09.setCellValue("NOMBRE_AGENCIA");
            CH_10.setCellValue("FORMA_PAGO1");
            CH_11.setCellValue("FORMA_PAGO2");
            CH_12.setCellValue("FORMA_PAGO3");
            CH_13.setCellValue("FORMA_PAGO4");
            CH_14.setCellValue("DESCRIPCION");
            CH_15.setCellValue("TARIFA");
            CH_16.setCellValue("FEE");
            CH_17.setCellValue("IMPORTE_TOTAL");
            CH_18.setCellValue("CODIGO_IMPUESTO1");
            CH_19.setCellValue("IMPORTE1");
            CH_20.setCellValue("CODIGO_IMPUESTO2");
            CH_21.setCellValue("IMPORTE2");
            CH_22.setCellValue("CODIGO_IMPUESTO3");
            CH_23.setCellValue("IMPORTE3");
            CH_24.setCellValue("CODIGO_IMPUESTO4");
            CH_25.setCellValue("IMPORTE4");
            CH_26.setCellValue("CODIGO_IMPUESTO5");
            CH_27.setCellValue("IMPORTE5");
            CH_28.setCellValue("CODIGO_IMPUESTO6");
            CH_29.setCellValue("IMPORTE6");
            CH_30.setCellValue("CODIGO_IMPUESTO7");
            CH_31.setCellValue("IMPORTE7");
            CH_32.setCellValue("CODIGO_IMPUESTO8");
            CH_33.setCellValue("IMPORTE8");
            CH_34.setCellValue("CODIGO_IMPUESTO9");
            CH_35.setCellValue("IMPORTE9");
            CH_36.setCellValue("CODIGO_IMPUESTO10");
            CH_37.setCellValue("IMPORTE10");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 37));

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
            CH_31.setCellStyle(headerStyle);
            CH_32.setCellStyle(headerStyle);
            CH_33.setCellStyle(headerStyle);
            CH_34.setCellStyle(headerStyle);
            CH_35.setCellStyle(headerStyle);
            CH_36.setCellStyle(headerStyle);
            CH_37.setCellStyle(headerStyle);

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
                CH_31 = row.createCell(31);
                CH_32 = row.createCell(32);
                CH_33 = row.createCell(33);
                CH_34 = row.createCell(34);
                CH_35 = row.createCell(35);
                CH_36 = row.createCell(36);
                CH_37 = row.createCell(37);

                CH_00.setCellValue(lst_search.get(vi).FECHA_EXPEDICION);
                CH_01.setCellValue(lst_search.get(vi).NOMBRE_PASAJERO);
                CH_02.setCellValue(lst_search.get(vi).NUMERO_BOLETO);
                CH_03.setCellValue(lst_search.get(vi).FUENTE);
                CH_04.setCellValue(lst_search.get(vi).TRX);
                CH_05.setCellValue(lst_search.get(vi).TDOC);
                CH_06.setCellValue(lst_search.get(vi).MONEDA);
                CH_07.setCellValue(lst_search.get(vi).PAIS_VENTA);
                CH_08.setCellValue(lst_search.get(vi).IATA);
                CH_09.setCellValue(lst_search.get(vi).NOMBRE_AGENCIA);
                CH_10.setCellValue(lst_search.get(vi).FORMA_PAGO1);
                CH_11.setCellValue(lst_search.get(vi).FORMA_PAGO2);
                CH_12.setCellValue(lst_search.get(vi).FORMA_PAGO3);
                CH_13.setCellValue(lst_search.get(vi).FORMA_PAGO4);
                CH_14.setCellValue(lst_search.get(vi).DESCRIPCION);
                CH_15.setCellValue(lst_search.get(vi).TARIFA);
                CH_16.setCellValue(lst_search.get(vi).FEE);
                CH_17.setCellValue(lst_search.get(vi).IMPORTE_TOTAL);
                CH_18.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO1);
                CH_19.setCellValue(lst_search.get(vi).IMPORTE1);
                CH_20.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO2);
                CH_21.setCellValue(lst_search.get(vi).IMPORTE2);
                CH_22.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO3);
                CH_23.setCellValue(lst_search.get(vi).IMPORTE3);
                CH_24.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO4);
                CH_25.setCellValue(lst_search.get(vi).IMPORTE4);
                CH_26.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO5);
                CH_27.setCellValue(lst_search.get(vi).IMPORTE5);
                CH_28.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO6);
                CH_29.setCellValue(lst_search.get(vi).IMPORTE6);
                CH_30.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO7);
                CH_31.setCellValue(lst_search.get(vi).IMPORTE7);
                CH_32.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO8);
                CH_33.setCellValue(lst_search.get(vi).IMPORTE8);
                CH_34.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO9);
                CH_35.setCellValue(lst_search.get(vi).IMPORTE9);
                CH_36.setCellValue(lst_search.get(vi).CODIGO_IMPUESTO10);
                CH_37.setCellValue(lst_search.get(vi).IMPORTE10);

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
                CH_31.setCellStyle(bodyStyle);
                CH_32.setCellStyle(bodyStyle);
                CH_33.setCellStyle(bodyStyle);
                CH_34.setCellStyle(bodyStyle);
                CH_35.setCellStyle(bodyStyle);
                CH_36.setCellStyle(bodyStyle);
                CH_37.setCellStyle(bodyStyle);

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
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);

            String fileNameDownload = String.format("FACTURA_ES_NEW - " + Functions.getFechaActual() + ".csv", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".csv");
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
