/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AgentsCatalogLogic;
import net.miatech.praxis.logic.payments.MerchantNumberLogic;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/AgentsCatalog")
public class AgentsCatalogController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AgentsCatalogLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AgentsCatalog/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AgentsCatalog : Search-------------");
        map.put("success", true);
        List<MPF106Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF106Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF106Filter> lst = new ArrayList<>(0);
        MPF106Filter filter = new MPF106Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new AgentsCatalogLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF106Filter.class);
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

            lst = logic.loadPX616SQP04941(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "setUploadAgents", method = RequestMethod.POST)
    public @ResponseBody
    String setUploadAgents(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request, HttpServletResponse response) throws IOException, Exception {

        byte[] bytes = null;
        MPF106Filter filter = new MPF106Filter();
        Gson gson = new Gson();
        String message = "";
        String filename = "", option = "";
        String beanString = "";

        try {

            byte[] dataFile = excelfile.getBytes();
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF106Filter.class);
            option = filter.OPTION;

            message = uploadFileAgents(dataFile, option);

            map.put("success", true);
            map.put("msjResult", message);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msjResult", message);
        }
        return new Gson().toJson(map);
    }
    
    private String uploadFileAgents(byte[] bytes, String option) throws Exception {

        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new AgentsCatalogLogic();
        List<MPF106Filter> lstData = new ArrayList<>();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String message = "";
        int i = 0, cont = 0;
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Agents." + strSesion + ".xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter dataFormatter = new DataFormatter(Locale.US);
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();

                    if (row.getCell(0) == null && row.getCell(1) == null && row.getCell(2) == null && row.getCell(3) == null && row.getCell(4) == null && row.getCell(5) == null) {
                        break;
                    }

                    if (i > 1) {
                        cont++;
                        if (row.getCell(0) != null) {
                            MPF106Filter obj = new MPF106Filter();
                            
//                            SOCIETY	CAGENCY	CIACOME	SBENCEN	COUNTRY	NAMEA	CANAL	NEGOC

                            obj.SOCIETY = dataFormatter.formatCellValue(row.getCell(0));
                            obj.CAGENCY = dataFormatter.formatCellValue(row.getCell(1));
                            obj.CIACOME = dataFormatter.formatCellValue(row.getCell(2));
                            obj.SBENCEN = dataFormatter.formatCellValue(row.getCell(3));
                            obj.COUNTRY = dataFormatter.formatCellValue(row.getCell(4));
                            obj.NAMEA = dataFormatter.formatCellValue(row.getCell(5));
                            obj.CANAL = dataFormatter.formatCellValue(row.getCell(6));
                            obj.NEGOC = dataFormatter.formatCellValue(row.getCell(7));
                            obj.OPTION = dataFormatter.formatCellValue(row.getCell(8));
                            
                            if(obj.OPTION.equals("Adicionar")){
                                obj.OPTION = "I";
                            }else{
                                obj.OPTION = "U";
                            }
                            
                            lstData.add(obj);
                        }
                    }
                }
                file.close();

                if (message.equals("")) {
                    System.out.print("");
                    logic = new AgentsCatalogLogic();
                    logic.setSession(this.serverSession.getServerSession());
                    message = logic.loadPX305SQP00941(lstData, cont, option);
                }

            } catch (Exception e) {
                message = e.getMessage();
                e.printStackTrace();
            }

            archivo.delete();
        } catch (Exception e) {
            message = e.getMessage();
            e.printStackTrace();
        }
        return message;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("AgentsCatalog : getXLSX");

        String fileNameDownload = String.format("agentsCatalog - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF106Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ReasonCodeReport");

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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);
            Cell CH1_15 = row.createCell(15);

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Country");
            CH1_02.setCellValue("Code");
            CH1_03.setCellValue("Name");
            CH1_04.setCellValue("Channel");
            CH1_05.setCellValue("City");
            CH1_06.setCellValue("Society");
            CH1_07.setCellValue("Bussines");
            CH1_08.setCellValue("Terminal");
            CH1_09.setCellValue("Contact");
            CH1_10.setCellValue("Email");
            CH1_11.setCellValue("Email-2");
            CH1_12.setCellValue("Email-3");
            CH1_13.setCellValue("Email-4");
            CH1_14.setCellValue("Email-5");
            CH1_15.setCellValue("Phone");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            ++vj;
            //*******************
            
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);
                Cell rcell5 = row.createCell(5);
                Cell rcell6 = row.createCell(6);
                Cell rcell7 = row.createCell(7);
                Cell rcell8 = row.createCell(8);
                Cell rcell9 = row.createCell(9);
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);
                Cell rcell15 = row.createCell(15);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).COUNTRY);
                rcell2.setCellValue(listaData.get(vi).CAGENCY);
                rcell3.setCellValue(listaData.get(vi).NAMEA);
                rcell4.setCellValue(listaData.get(vi).CANAL);
                rcell5.setCellValue(listaData.get(vi).CITY);
                rcell6.setCellValue(listaData.get(vi).SOCIETY);
                rcell7.setCellValue(listaData.get(vi).descNEGOC);
                rcell8.setCellValue(listaData.get(vi).TERMI);
                rcell9.setCellValue(listaData.get(vi).CONTAC);
                rcell10.setCellValue(listaData.get(vi).EMAILS);
                rcell11.setCellValue(listaData.get(vi).EMAILS2);
                rcell12.setCellValue(listaData.get(vi).EMAILS3);
                rcell13.setCellValue(listaData.get(vi).EMAILS4);
                rcell14.setCellValue(listaData.get(vi).EMAILS5);
                rcell15.setCellValue(listaData.get(vi).NPHONE);
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

            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "MaintenanceMPF106")
    public @ResponseBody
    String MaintenanceMPF106(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- AgentsCatalog : MaintenanceMPF106-------------");
        String option;
        MPF106Filter filter = new MPF106Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF106Filter.class);

            logic = new AgentsCatalogLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX616SQP04942(filter, option);

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

    @RequestMapping(value = "searchCompleteDetail")
    public @ResponseBody
    String searchCompleteDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AgentsCatalog : searchCompleteDetail-------------");

        Gson gson = new Gson();
        MPF106Filter filter = new MPF106Filter();
        MPF106Filter result = new MPF106Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, MPF106Filter.class);

        logic = new AgentsCatalogLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX616SQP04943(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "obtainCitys")
    public @ResponseBody
    String obtainCitys(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AgentsCatalog : obtainCitys-------------");

        Gson gson = new Gson();
        MPF106Filter filter = new MPF106Filter();
        MPF106Filter result = new MPF106Filter();
        List<MPF106Filter> lst = new ArrayList<>(0);
        
        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, MPF106Filter.class);

        logic = new AgentsCatalogLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            lst = logic.loadPX616SQP04943Citys(filter);
            map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            map.put("data", lst);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

}