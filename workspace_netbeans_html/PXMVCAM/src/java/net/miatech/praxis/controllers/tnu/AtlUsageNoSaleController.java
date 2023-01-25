/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.tnu;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1544Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.tnu.AtlUsageNoSaleLogic;
import org.apache.commons.io.IOUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/AtlUsageNoSale")
public class AtlUsageNoSaleController extends BaseController {

    AtlUsageNoSaleLogic logic;
    private HashMap RSP = new HashMap<String, String>();

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "tnu/AtlUsageNoSale/AtlUsageNoSale";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        logic = new AtlUsageNoSaleLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A1544Filter> oList = new ArrayList<A1544Filter>(0);
        A1544Filter filter = new A1544Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            filter.VP_FILTRO = request.getParameter("VP_FILTRO").toString().trim();
            filter.VP_TICKET = request.getParameter("VP_TICKET").toString().trim();
            filter.VP_FECHA1 = request.getParameter("VP_FECHA1").toString().trim();
            filter.VP_FECHA2 = request.getParameter("VP_FECHA2").toString().trim();
            filter.VP_IATA = request.getParameter("VP_IATA").toString().trim();
            filter.VP_TRXN = request.getParameter("VP_TRXN").toString().trim();
            filter.VP_ESTA = request.getParameter("VP_ESTA").toString().trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            oList = logic.loadPX224S01A1544(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", oList.size() > 0 ? oList.get(0).page.TOTROW : 0);
        map.put("data", oList);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadText")
    public @ResponseBody
    void downloadText(HttpServletRequest request, HttpServletResponse response) {

        logic = new AtlUsageNoSaleLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A1544Filter> oList = new ArrayList<A1544Filter>(0);
        A1544Filter filter = new A1544Filter();
        String fileName;
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Date date = new Date();

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.LIMIT = -1;
            filter.page.START = -1;
            oList = logic.loadPX224S01A1544(filter);

            fileName = "atl-venta-no-reportada-" + date.getDay() + date.getMinutes() + date.getSeconds();
            String fileNameDownload = String.format(fileName + ".txt", UUID.randomUUID().toString().toLowerCase());

            StringBuilder line = new StringBuilder();
            String strTexto;
            String cadena;
            cadena = "IATA|AGENT|USAGE|DATE OF USAGE|TICKET|COUPON|FROM|TO|FLIGHT|CARRIER|FARE BASIS|AMOUNT|CURR.|REGULARIZATION" + "\r\n";
//            line.append(cadena.toString());
//            File file = File.createTempFile(rutaFile + "\\" + fileName, ".txt");
            File file = new File(rutaFile + "\\" + fileName + ".txt");
            PrintWriter writer = new PrintWriter(file, "UTF-8");            
            writer.println("" + cadena );
                
            for (A1544Filter item : oList) {
                strTexto = "";
                strTexto += item.A1544IATA + "|";
                strTexto += item.A1544AGENT + "|";
                strTexto += item.A1544TUSO + "|";
                strTexto += item.A1544FUSO + "|";
                strTexto += item.A1544TICKT + "|";
                strTexto += item.A1544CUPON + "|";
                strTexto += item.A1544DESDE + "|";
                strTexto += item.A1544HACIA + "|";
                strTexto += item.A1544NVUSO + "|";
                strTexto += item.A1544TRUSO + "|";
                strTexto += item.A1544FBAS + "|";
                strTexto += item.A1544TARIF + "|";
                strTexto += item.A1544MDATF + "|";
                strTexto += item.A1544FCONT;
                strTexto += "\r\n";
//                line.append(strTexto.toString());
                writer.println("" + strTexto );
            }
            writer.flush();
            writer.close();
            
//            response.getOutputStream().print(line.toString());
//            response.setContentType("text/plain");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            response.getOutputStream().flush();
//            response.getOutputStream().close();
/**
             * Comprimimos archivo generado para su optima descarga
             */
            if (!zip(fileName))                            
                
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + fileName + ".zip" + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
//    Para reportes grandes no FUNCIONA: 
//    HTTP Status 500 - Handler processing failed; nested exception is java.lang.OutOfMemoryError: GC overhead limit exceeded
    
    @RequestMapping(value = "VNRexportXLS")
    public @ResponseBody
    void VNRexportXLS(HttpServletRequest request, HttpServletResponse response) {

        logic = new AtlUsageNoSaleLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A1544Filter> oList = new ArrayList<A1544Filter>(0);
        A1544Filter filter = new A1544Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String fileName = "tmp";
        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.LIMIT = -1; //Integer.parseInt(request.getParameter("limit").toString());
            filter.page.START = -1; //Integer.parseInt(request.getParameter("start").toString());            
            //filter.VP_TICKET = request.getParameter("VP_TICKET").toString().trim();          
            oList = logic.loadPX224S01A1544(filter);
            Workbook workbook;
            File file = File.createTempFile(fileName, ".xlsx");
//            File file = new File(rutaFile + "\\" + fileName + ".xlsx");
            
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("UsageNoSale");
            Iterator iter = oList.iterator();
            Integer vi = 0, vj = 0;

            Map<String, CellStyle> styles = createStyles(workbook);
            String styleName;

            styleName = "header";

            Row rowh = sheet.createRow(vj);
            Cell cell0h = rowh.createCell(0);
            cell0h.setCellValue("IATA");
            cell0h.setCellStyle(styles.get(styleName));

            Cell cell15h = rowh.createCell(1);
            cell15h.setCellValue("AGENT");
            cell15h.setCellStyle(styles.get(styleName));

            Cell cell16h = rowh.createCell(2);
            cell16h.setCellValue("USAGE");
            cell16h.setCellStyle(styles.get(styleName));

            Cell cell1h = rowh.createCell(3);
            cell1h.setCellValue("DATE OF USAGE");
            cell1h.setCellStyle(styles.get(styleName));

            Cell cellXh = rowh.createCell(4);
            cellXh.setCellValue("TICKET");
            cellXh.setCellStyle(styles.get(styleName));

            Cell cell2h = rowh.createCell(5);
            cell2h.setCellValue("COUPON");
            cell2h.setCellStyle(styles.get(styleName));

            Cell cell3h = rowh.createCell(6);
            cell3h.setCellValue("FROM");
            cell3h.setCellStyle(styles.get(styleName));

            Cell cell4h = rowh.createCell(7);
            cell4h.setCellValue("TO");
            cell4h.setCellStyle(styles.get(styleName));

            Cell cell5h = rowh.createCell(8);
            cell5h.setCellValue("FLIGHT");
            cell5h.setCellStyle(styles.get(styleName));

            Cell cell6h = rowh.createCell(9);
            cell6h.setCellValue("CARRIER");
            cell6h.setCellStyle(styles.get(styleName));

            Cell cell7h = rowh.createCell(10);
            cell7h.setCellValue("FARE BASIS");
            cell7h.setCellStyle(styles.get(styleName));

            Cell cell8h = rowh.createCell(11);
            cell8h.setCellValue("AMOUNT");
            cell8h.setCellStyle(styles.get(styleName));

            Cell cell9h = rowh.createCell(12);
            cell8h.setCellValue("CURR.");
            cell8h.setCellStyle(styles.get(styleName));

            Cell cell10h = rowh.createCell(13);
            cell8h.setCellValue("REGULARIZATION");
            cell8h.setCellStyle(styles.get(styleName));

            ++vj;
            while (iter.hasNext()) {
                Row row = sheet.createRow(vj);

                styleName = "cell_normal";
                Cell cel25 = row.createCell(0);
                cel25.setCellValue(oList.get(vi).A1544IATA);
                cel25.setCellStyle(styles.get(styleName));

                Cell cel26 = row.createCell(1);
                cel26.setCellValue(oList.get(vi).A1544AGENT);
                cel26.setCellStyle(styles.get(styleName));

                Cell cel27 = row.createCell(2);
                cel27.setCellValue(oList.get(vi).A1544TUSO);
                cel27.setCellStyle(styles.get(styleName));

                styleName = "cell_normal_date";
                Cell cell0 = row.createCell(3);
                cell0.setCellValue(oList.get(vi).A1544FUSO);
                cell0.setCellStyle(styles.get(styleName));

                styleName = "cell_normal";
                Cell cell1 = row.createCell(4);
                cell1.setCellValue(oList.get(vi).A1544TICKT);
                cell1.setCellStyle(styles.get(styleName));

                Cell cell2 = row.createCell(5);
                cell2.setCellValue(oList.get(vi).A1544CUPON);
                cell2.setCellStyle(styles.get(styleName));

                Cell cell3 = row.createCell(6);
                cell3.setCellValue(oList.get(vi).A1544DESDE);
                cell2.setCellStyle(styles.get(styleName));

                Cell cell4 = row.createCell(7);
                cell4.setCellValue(oList.get(vi).A1544HACIA);
                cell4.setCellStyle(styles.get(styleName));

                Cell cell5 = row.createCell(8);
                cell5.setCellValue(oList.get(vi).A1544NVUSO);
                cell5.setCellStyle(styles.get(styleName));

                Cell cell9 = row.createCell(9);
                cell9.setCellValue(oList.get(vi).A1544TRUSO);
                cell9.setCellStyle(styles.get(styleName));

                Cell cell10 = row.createCell(10);
                cell9.setCellValue(oList.get(vi).A1544FBAS);
                cell9.setCellStyle(styles.get(styleName));

                styleName = "cell_normal_formato_right";
                Cell cel20 = row.createCell(11);
                cel20.setCellValue(oList.get(vi).A1544TARIF);
                cel20.setCellStyle(styles.get(styleName));

                styleName = "cell_normal";
                Cell cel21 = row.createCell(12);
                cel21.setCellValue(oList.get(vi).A1544MDATF);
                cel21.setCellStyle(styles.get(styleName));

                styleName = "cell_normal";
                Cell cel22 = row.createCell(13);
                cel21.setCellValue(oList.get(vi).A1544FCONT);
                cel21.setCellStyle(styles.get(styleName));

                iter.next();
                ++vi;
                ++vj;
            }

            //finally set column widths, the width is measured in units of 1/256th of a character width
            sheet.setColumnWidth(0, 7 * 256); //15 characters wide            
            for (int i = 1; i < 13; i++) {
                sheet.setColumnWidth(i, 15 * 256);  //18 characters wide
            }
            //sheet.setColumnWidth(17, 22*256); //24 characters wide

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "UsageNoSale.xlsx";
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    private static Map<String, CellStyle> createStyles(Workbook wb) {
        Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
        DataFormat df = wb.createDataFormat();

        CellStyle style;
        Font headerFont = wb.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("header_date", style);

        Font font1 = wb.createFont();
        font1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font1);
        styles.put("cell_b", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font1);
        styles.put("cell_b_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_b_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_g", style);

        Font font2 = wb.createFont();
        font2.setColor(IndexedColors.BLUE.getIndex());
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font2);
        styles.put("cell_bb", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_bg", style);

        Font font3 = wb.createFont();
        font3.setFontHeightInPoints((short) 14);
        font3.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font3);
        style.setWrapText(true);
        styles.put("cell_h", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setWrapText(false);
        styles.put("cell_normal", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_normal_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(false);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_formato_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        //style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_normal_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setIndention((short) 1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);

        Font monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short) 12);
        monthFont.setColor(IndexedColors.WHITE.getIndex());
        monthFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont);
        styles.put("cell_totals_left", style);

        Font monthFont1 = wb.createFont();
        monthFont1.setFontHeightInPoints((short) 12);
        monthFont1.setColor(IndexedColors.WHITE.getIndex());
        monthFont1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont1);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_totals_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("0.00%"));
        styles.put("cell_porcentaje_right", style);

        return styles;
    }

    private static CellStyle createBorderedStyle(Workbook wb) {
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
    
    /*API python descarga de archivos grandes 
     */
    @RequestMapping(value = "getATLVNRXLS")
    public @ResponseBody
    void getATLVNRXLS(HttpServletRequest request, HttpServletResponse response) {
//        logic = new AtlUsageNoSaleLogic();
//        logic.setSession((IServerSession) serverSession.getServerSession());
        A1544Filter filter = new A1544Filter();
//        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD_DJANGO").toString();
        
        try {
            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);
            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();            
//            bodyData.put("server_database", "AEROMEXICO_TEST"); //test
//            bodyData.put("server_database", "AEROMEXICO"); //prod
            bodyData.put("server_database", serverSession.getServerSession().getPropertySession().get("SERVER_DJANGO").toString());
            bodyData.put("VP_AIR", "139");
            bodyData.put("VP_FILTRO", filter.VP_FILTRO);
            bodyData.put("VP_TICKET", filter.VP_TICKET);
            bodyData.put("VP_FECHA1", filter.VP_FECHA1);
            bodyData.put("VP_FECHA2", filter.VP_FECHA2);
            bodyData.put("VP_TRXN", filter.VP_TRXN);
            bodyData.put("VP_IATA", filter.VP_IATA);
            bodyData.put("VP_ESTA", filter.VP_ESTA);
            bodyData.put("IO_PAGNUM", -1);
            bodyData.put("IO_PAGROW", -1);
            bodyData.put("IO_TOTPAG", -1);
            bodyData.put("IO_TOTROW", -1);
            bodyData.put("PATH", rutaFile);                
            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            String urlAPI  = "/api/AtlUsageNoSale/rptAtlUsageNoSale/";            
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI )
                    .header("content-type", "application/json") 
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();
            

            String error_code = responseAPI.getBody().getObject().get("error_code").toString();
            String error_msg = responseAPI.getBody().getObject().get("error_msg").toString();
            String filename = responseAPI.getBody().getObject().get("filename").toString();
            
            String fileNameDownload = rutaFile + "\\" + filename;
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename  + "\"");
            InputStream is = new FileInputStream( fileNameDownload );
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            
// ZIP            
//            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + filename + ".zip" + "\"");
//            InputStream is = new FileInputStream(rutaFile + "\\" + filename + ".zip");
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();
            
            delete_fichero(filename);
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
    public Boolean delete_fichero( String fileName ) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String sFichero = path + "\\" + fileName + ".xlsx";
        File f = new File(sFichero);
        f.delete();
        return true;
    }
    

    /*API python descarga de archivos grandes : NO_USADO
     */
    @RequestMapping(value = "getATLVNRTexto")
    public @ResponseBody
    void getATLVNRTexto(HttpServletRequest request, HttpServletResponse response) {
//        logic = new AtlUsageNoSaleLogic();
//        logic.setSession((IServerSession) serverSession.getServerSession());
        A1544Filter filter = new A1544Filter();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);
            /*
             Preparando parámetros para enviar por body
             */
            HashMap bodyData = new HashMap<>();
            bodyData.put("server_database", "AEROMEXICO");
            bodyData.put("VP_AIR", "139");
            bodyData.put("VP_FILTRO", filter.VP_FILTRO);
            bodyData.put("VP_TICKET", filter.VP_TICKET);
            bodyData.put("VP_FECHA1", filter.VP_FECHA1);
            bodyData.put("VP_FECHA2", filter.VP_FECHA2);
            bodyData.put("VP_IATA", filter.VP_IATA);
            bodyData.put("VP_TRXN", filter.VP_TRXN);
            bodyData.put("IO_PAGNUM", -1);
            bodyData.put("IO_PAGROW", -1);
            bodyData.put("IO_TOTPAG", -1);
            bodyData.put("IO_TOTROW", -1);
            bodyData.put("PATH", rutaFile);
            
            String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
            String urlAPI  = "/api/AtlUsageNoSale/rptAtlUsageNoSale/";            
            HttpResponse<JsonNode> responseAPI = Unirest.post(urlREST + urlAPI )
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            String error_code = responseAPI.getBody().getObject().get("error_code").toString();
            String error_msg = responseAPI.getBody().getObject().get("error_msg").toString();
            String filename = responseAPI.getBody().getObject().get("filename").toString();
            /*comprimir archivo
             */
            if(!filename.isEmpty())
                if (!zip(filename)) 
            /*descargar
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

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }

}
