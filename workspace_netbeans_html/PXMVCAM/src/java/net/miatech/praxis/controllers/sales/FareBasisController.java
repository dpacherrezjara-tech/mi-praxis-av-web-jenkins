/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX019S01A721Filter;
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AgentsMasterFileLogic;
import net.miatech.praxis.logic.sales.FareBasisLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
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
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/FareBasis")
public class FareBasisController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private FareBasisLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/FareBasis/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- FareBasis : Controller-------------");
        map.put("success", true);
        List<PX019S01A721Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<PX019S01A721Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new FareBasisLogic();

        List<PX019S01A721Filter> lst = new ArrayList<>(0);
        PX019S01A721Filter filter = new PX019S01A721Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_FBASIS = request.getParameter("IN_FBASIS");
           
            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));

            System.out.println("-------------------------------------------------- ");

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

            if(this.serverSession.getFareBasis()!=null && filter.IN_OPCION == 1 && "".equals(filter.IN_AIRLIN) && "".equals(filter.IN_FBASIS) && filter.page.PAGNUM == 1)
            {
                if (!bExcel) 
                    lst = serverSession.getFareBasis();
                else
                    lst = logic.loadPX019S01A721(filter);
            }
            else
            {
                lst = logic.loadPX019S01A721(filter);
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

//    @RequestMapping(value = "getXLSX1")
//    public @ResponseBody
//    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("FareBasis : getXLSX");
//
//        //String fileNameDownload = String.format("Fare Basis- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        String fileNameDownload = String.format(
//                "Fare Basis " + Functions.getFechaActual() + 
//                        "_" + Functions.getHoraActualHHMM().replace(":", "") + 
//                        " " + Functions.getAbreviaturaMes(Functions.getFechaActual().substring(4, 6)) + 
//                        " " + Functions.getFechaActual().substring(0, 4)  + ".xlsx", UUID.randomUUID().toString().toLowerCase()
//        );
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<PX019S01A721Filter> listaData = this.getList(request, true);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("FareBasis");
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
//            Cell CH1_010 = row.createCell(10);
//            Cell CH1_011 = row.createCell(11);
//
//            CH1_00.setCellValue("Nbr");
//            CH1_01.setCellValue("Airline");
//            CH1_02.setCellValue("Fare Basis");
//            CH1_03.setCellValue("'T. Type");
//            CH1_04.setCellValue("Class");
//            CH1_05.setCellValue("Season");
//            CH1_06.setCellValue("Week");
//            CH1_07.setCellValue("Day");
//            CH1_08.setCellValue("RBD");
//            CH1_09.setCellValue("GI");
//            CH1_010.setCellValue("User");
//            CH1_011.setCellValue("Last Date");
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
//            CH1_010.setCellStyle(headerStyle);
//            CH1_011.setCellStyle(headerStyle);           
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
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcell10 = row.createCell(10);
//                Cell rcell11 = row.createCell(11);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).A721AIRLIN);
//                rcell2.setCellValue(listaData.get(vi).A721FBASIS);
//                rcell3.setCellValue(listaData.get(vi).A721TIPTRF);
//                rcell4.setCellValue(listaData.get(vi).A721CLASE);
//                rcell5.setCellValue(listaData.get(vi).A721TEMPOR);
//                rcell6.setCellValue(listaData.get(vi).A721SEMANA);
//                rcell7.setCellValue(listaData.get(vi).A721DIA);
//                rcell8.setCellValue(listaData.get(vi).A721RBD);
//                rcell9.setCellValue(listaData.get(vi).A721GI);
//                rcell10.setCellValue(listaData.get(vi).A721REGIST);
//                rcell11.setCellValue(listaData.get(vi).A721VIGEN);
//
//                rcell0.setCellStyle(bodyStyle);
//                rcell1.setCellStyle(bodyStyle);
//                rcell2.setCellStyle(bodyStyle);
//                rcell3.setCellStyle(bodyStyle);
//                rcell4.setCellStyle(bodyStyle);
//                rcell5.setCellStyle(bodyStyle);
//                rcell6.setCellStyle(bodyStyle);
//                rcell7.setCellStyle(bodyStyle);
//                rcell8.setCellStyle(bodyStyle);
//                rcell9.setCellStyle(bodyStyle);
//                rcell10.setCellStyle(bodyStyle);
//                rcell11.setCellStyle(bodyStyle);
//                
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
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
//        
//    }

    @RequestMapping(value = "getXLSX")
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
    
        List<PX019S01A721Filter> listaData = this.getList(request, false);        
        String strALL = "";
        Functions.msjConsola("PRAXIS",  this.serverSession.getServerSession().getUserView().getUserInfo().USR, "ScrProrationFactorsPMP");
        try {
            //LoadDataLogic logic = new LoadDataLogic();
            logic.setSession(this.serverSession.getServerSession());   
            String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
            String RUTA_FILE_NAME_SERVER_40 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_40").toString();
            String RUTA_FILE_NAME_SERVER_41 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_41").toString();
            String RUTA_FILE_NAME_SERVER_33 = serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME_SERVER_33").toString();
            DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            Date date = new Date();
            
            PX019S01A721Filter filter = new PX019S01A721Filter();
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_FBASIS = request.getParameter("IN_FBASIS");
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            
            String strYear = "";
            int intYear = 0;
            String strMonth = "";

            List<PX019S01A721Filter> lstPX0094S01A007 = new ArrayList<PX019S01A721Filter>();
            lstPX0094S01A007 = logic.loadPX019S01A721(filter);

            int len = lstPX0094S01A007.size();
            Integer vi = 0;            
            String fileName = "PX032-FAREBASIS_Report-"+date.getDay()+date.getMinutes()+date.getSeconds();
            File file = new File(rutaFile + "\\" + fileName + ".csv");
            
            if (file.exists())
                file.delete();
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            String cadena = "";
            
            for (vi = 0; vi < len; vi++) {
                //titulos en la primera fila
         
                if ( vi == 0 ){
                    cadena = "Nbr,Airline,Fare Basis,T. Type,Class,Season,Week,Day,RBD,GI,User,Last Date";
                    writer.println("" + cadena );
                }

                cadena = "";                                
                cadena += "" + lstPX0094S01A007.get(vi).RN + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721AIRLIN + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721FBASIS + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721TIPTRF + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721CLASE + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721TEMPOR + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721SEMANA + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721DIA + ",";               
                cadena += "" + lstPX0094S01A007.get(vi).A721RBD + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721GI + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721REGIST + ",";
                cadena += "" + lstPX0094S01A007.get(vi).A721VIGEN;
              
                writer.println("" + cadena );
            }
            writer.flush();
            writer.close();
            
            /**
             * Comprimimos archivo generado para su optima descarga
             */
            if (zip(fileName))
        
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".zip" + "\"");
            //response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "ValidationDownload")
    public @ResponseBody
    String ValidationDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
        

        

        List<PX019S01A721Filter> lst = new ArrayList<>(0);
        PX019S01A721Filter filter = new PX019S01A721Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic = new FareBasisLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_FBASIS = request.getParameter("IN_FBASIS");
           
            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));

            System.out.println("-------------------------------------------------- ");

            int int_result = logic.ValidationDownload(filter);
            HashMap m = new HashMap();
            m.put("success", true);
            m.put("int_result", int_result);
            return new Gson().toJson(m);

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

            zipFile(new File(path + "\\" + fileName + ".csv"), path + "\\" + fileName + ".zip");

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
