/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

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
import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import net.miatech.praxis.controllers.BaseController;
import static net.miatech.praxis.controllers.tnu.AtlUsageNoSaleController.zipFile;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.AgentsMasterFileLogic;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/AgentsMasterFile")
public class AgentsMasterFileController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AgentsMasterFileLogic logic;
    private Connection cnx = null;
    private IServerSession session;
    private CallableStatement cs = null;
    
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AgentsMasterFile/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AgentsMasterFile : Controller-------------");
        map.put("success", true);
        List<A003> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A003> getList(HttpServletRequest request, Boolean bExcel) {
        logic = new AgentsMasterFileLogic();

        List<A003> lst = new ArrayList<>(0);
        A003 filter = new A003();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.A003KEY1 = request.getParameter("A003KEY1");
            filter.A003KEY2 = request.getParameter("A003KEY2");
            filter.A003KEY3 = request.getParameter("A003KEY3");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
                filter.intCurrentPg = filter.page.PAGNUM;
                filter.strExcel = "FALSE";
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
                filter.intCurrentPg = filter.page.PAGNUM;
                filter.strExcel = "TRUE";
            }

            if(this.serverSession.getFareBasis()!=null && "".equals(filter.VP_ACTION) && "".equals(filter.A003KEY1) && "".equals(filter.A003KEY2) && "".equals(filter.A003KEY3) && filter.page.PAGNUM == 1)
            {
                if (!bExcel) 
                    lst = serverSession.getAgentMaster();
                else
                    lst = logic.loadAgentReport(filter);
            }
            else
            {
                lst = logic.loadAgentReport(filter);
            }

            
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadData")
    public @ResponseBody
    String loadCiudades(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- loadCiudades : Controller-------------");
        map.put("success", true);

        try {
            logic = new AgentsMasterFileLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1007> lstCiudades = logic.loadCiudades3();
            List<A006> lstPaises = logic.loadPaises();
            map.put("dataPaises", lstPaises);
            map.put("dataCity", lstCiudades);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Agents Master File : getXLSX");

        String fileNameDownload = String.format("Agents Master File- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A003> listaData = this.getList(request, true);

            System.out.println("Agents Master File : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Agents Master File");

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

            CH1_00.setCellValue("Nbr.");
            CH1_01.setCellValue("Code");
            CH1_02.setCellValue("Type ");
            CH1_03.setCellValue("Channel");
            CH1_04.setCellValue("Legal Name");
            CH1_05.setCellValue("Country");
            CH1_06.setCellValue("State");
            CH1_07.setCellValue("County");
            CH1_08.setCellValue("City");
            CH1_10.setCellValue("Zip Code");
            CH1_11.setCellValue("Sabre Ctry");
            CH1_12.setCellValue("Emai Catalogo");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));

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

            ++vj;
            row = sheet.createRow(vj);
            Cell CH2_00 = row.createCell(0);
            Cell CH2_01 = row.createCell(1);
            Cell CH2_02 = row.createCell(2);
            Cell CH2_03 = row.createCell(3);
            Cell CH2_04 = row.createCell(4);
            Cell CH2_05 = row.createCell(5);
            Cell CH2_06 = row.createCell(6);
            Cell CH2_07 = row.createCell(7);
            Cell CH2_08 = row.createCell(8);
            Cell CH2_09 = row.createCell(9);
            Cell CH2_10 = row.createCell(10);
            Cell CH2_11 = row.createCell(11);
            Cell CH2_12 = row.createCell(12);

            CH2_08.setCellValue("Name");
            CH2_09.setCellValue("Code");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
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

                rcell0.setCellValue(listaData.get(vi).pos);
                rcell1.setCellValue(listaData.get(vi).A003KEY);
                rcell2.setCellValue(listaData.get(vi).A003TIPO);
                rcell3.setCellValue(listaData.get(vi).A003CANAL);
                rcell4.setCellValue(listaData.get(vi).A003KEY1);
                rcell5.setCellValue(listaData.get(vi).A003PSALF);
                rcell6.setCellValue(listaData.get(vi).A003DEPART);
                rcell7.setCellValue(listaData.get(vi).A003PROVIN);
                rcell8.setCellValue(listaData.get(vi).A003DISTRI);
                rcell9.setCellValue(listaData.get(vi).A003CIUDAD);
                rcell10.setCellValue(listaData.get(vi).A003ZIPCOD);
                rcell11.setCellValue(listaData.get(vi).A003SABCTY);
                rcell12.setCellValue(listaData.get(vi).A003MAIL);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
                rcell8.setCellStyle(bodyStyle);
                rcell9.setCellStyle(bodyStyle);
                rcell10.setCellStyle(bodyStyle);
                rcell11.setCellStyle(bodyStyle);
                rcell12.setCellStyle(bodyStyle);

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
            //sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

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

    @RequestMapping(value = "getFileTxte")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A003 filter = new A003();
        List<A003> listaData = new ArrayList<>(0);

        String fileNameDownload = String.format("Agents Master File- " + Functions.getFechaActual() + ".txt", UUID.randomUUID().toString().toLowerCase());
        StringBuilder line = new StringBuilder();
        String delim = "\t";
        String texto = "Code" + delim + "Type" + delim + "Channel" + delim + "LegalName" + delim + "Country" + delim + "State" + delim + "County" + delim + "CityName" + delim + "CityCode" + delim + "ZipCode" + delim + "SabreCity";
        texto += "Company" + delim + "Unit" + delim + "Cost Center" + delim + "Ubication" + delim + "Account" + delim + "Sub Account"
                + delim + "Equipment" + delim + "Inter Company" + delim + "Area" + delim + "Supplier" + delim + "Client" + delim + "Base" + delim + "User" + "\r\n";

        line.append(texto.toString());

        try {

            logic = new AgentsMasterFileLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_ACTION = request.getParameter("VP_ACTION");
            filter.A003KEY1 = request.getParameter("A003KEY1");
            filter.A003KEY2 = request.getParameter("A003KEY2");
            filter.A003KEY3 = request.getParameter("A003KEY3");

            listaData = logic.loadAgentReport(filter);

            File file = File.createTempFile(fileNameDownload, ".txt");
            String strTexto = "";
            for (A003 item : listaData) {
//                strTexto = ""; 
                strTexto += item.A003KEY + delim
                        + item.A003TIPO + delim
                        + item.A003CANAL + delim
                        + item.A003KEY1 + delim
                        + item.A003PSALF + delim
                        + item.A003DEPART + delim
                        + item.A003PROVIN + delim
                        + item.A003DISTRI + delim
                        + item.A003CIUDAD + delim
                        + item.A003SABCTY + delim
                        + item.A003CTACIA + delim
                        + item.A003CTANEG + delim
                        + item.A003CTACTO + delim
                        + item.A003CTAUBC + delim
                        + item.A003CTACTA + delim
                        + item.A003CTASCT + delim
                        + item.A003CTAEQP + delim
                        + item.A003CTAICI + delim
                        + item.A003AREA + delim
                        + item.A003CPROVE + delim
                        + item.A003CCLIEN + delim
                        + item.A003TRPM + delim
                        + item.A003OPERA + "\r\n";

            }
            line.append(strTexto.toString());
            response.getOutputStream().print(line.toString());
            response.setContentType("text/plain");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            response.getOutputStream().flush();
            response.getOutputStream().close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());

        }

    }

    @RequestMapping(value = "searchCompData")
    public @ResponseBody
    String searchByCode(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- searchCompData : Controller-------------");
        map.put("success", true);
        logic = new AgentsMasterFileLogic();
        logic.setSession(this.serverSession.getServerSession());
        String action = request.getParameter("action");
        if (action.equalsIgnoreCase("U")) {
            A003 bean = this.searchCompData(request, false);
            map.put("data", bean);
        } else {
            //map.put("data", " ");
        }
        List<A1007> lstCiudades;
        List<A006> lstPaises;
        try {
            lstCiudades = this.serverSession.getCiudades(); // logic.loadCiudades3();
            lstPaises = this.serverSession.getPaises(); //logic.loadPaises();
            map.put("dataPaises", lstPaises);
            map.put("dataCity", lstCiudades);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(AgentsMasterFileController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new Gson().toJson(map);

    }

    public A003 searchCompData(HttpServletRequest request, Boolean bExcel) {

        logic = new AgentsMasterFileLogic();

        A003 filter = new A003();
        A003 bean = new A003();

        try {

            logic.setSession(this.serverSession.getServerSession());
            filter.A003KEY = request.getParameter("A003KEY");
            bean = logic.loadAgentCompleteData(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return bean;
    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Agents Master File Controller : Mantenimiento");
        A003 objRtn = new A003();
        A003 filter = new A003();
        try {
            logic = new AgentsMasterFileLogic();
            logic.setSession(this.serverSession.getServerSession());
            String strOption = request.getParameter("strOption").toString().trim();

            filter.VP_ACTION = strOption;
            filter.A003KEY = request.getParameter("A003KEY");
            filter.A003CANAL = request.getParameter("A003CANAL");
            filter.A003TIPO = request.getParameter("A003TIPO");
            filter.A003PAIS = request.getParameter("A003PAIS");
            filter.A003INDICA = request.getParameter("A003INDICA");
            filter.A003SABCTY = request.getParameter("A003SABCTY");
            filter.A003PSALF = request.getParameter("A003PSALF");
            filter.A003CIUDAD = request.getParameter("A003CIUDAD");
            filter.A003KEY2 = request.getParameter("A003KEY2");
            filter.A003KEY3 = request.getParameter("A003KEY3");
            filter.A003KEY1 = request.getParameter("A003KEY1");
            filter.A003DIREC1 = request.getParameter("A003DIREC1");
            filter.A003DIREC2 = request.getParameter("A003DIREC2");
            filter.A003DISTRI = request.getParameter("A003DISTRI");
            filter.A003DEPART = request.getParameter("A003DEPART");
            filter.A003ANEXO = request.getParameter("A003ANEXO");
            filter.A003MAIL = request.getParameter("A003MAIL");
            filter.A003ZIPCOD = request.getParameter("A003ZIPCOD");
            filter.A003TELEF1 = request.getParameter("A003TELEF1");
            filter.A003FAX = request.getParameter("A003FAX");
            filter.A003INDI1 = request.getParameter("A003INDI1");
            filter.A003OFPRC = request.getParameter("A003OFPRC");
            filter.A003OVERPP = request.getParameter("A003OVERPP");
            filter.A003OVERCL = request.getParameter("A003OVERCL");
            filter.A003OVERNA = request.getParameter("A003OVERNA");
            filter.A003OVERFN = request.getParameter("A003OVERFN");
            filter.A003OVERIN = request.getParameter("A003OVERIN");
            filter.A003OVERFI = request.getParameter("A003OVERFI");
            filter.A003OPERA = request.getParameter("A003OPERA");
            filter.A003IATA = request.getParameter("A003IATA");
            if (filter.A003IATA.equalsIgnoreCase("")) {
                filter.A003IATA = filter.A003KEY3;
            }
            filter.A003REPRES = request.getParameter("A003REPRES");
            filter.A003REPCAR = request.getParameter("A003REPCAR");
            filter.A003REPTLF = request.getParameter("A003REPTLF");
            filter.A003CONTA1 = request.getParameter("A003CONTA1");
            filter.A003CONTA2 = request.getParameter("A003CONTA2");
            filter.A003PROCOD = request.getParameter("A003PROCOD");
            filter.A003PROMOT = request.getParameter("A003PROMOT");
            filter.A003CRLIMI = Double.parseDouble(request.getParameter("A003CRLIMI"));
            filter.A003CRDIAS = Integer.parseInt(request.getParameter("A003CRDIAS"));
            filter.A003CNACON = Double.parseDouble(request.getParameter("A003CNACON"));
            filter.A003CNACOF = Double.parseDouble(request.getParameter("A003CNACOF"));
            filter.A003CINTON = Double.parseDouble(request.getParameter("A003CINTON"));
            filter.A003CINTOF = Double.parseDouble(request.getParameter("A003CINTOF"));
            filter.A003REPORT = Integer.parseInt(request.getParameter("A003REPORT"));
            filter.A003PERIDE = Integer.parseInt(request.getParameter("A003PERIDE"));
            filter.A003PERIA = Integer.parseInt(request.getParameter("A003PERIA"));
            filter.A003FREMES = Integer.parseInt(request.getParameter("A003FREMES"));
            filter.A003REMESA = Integer.parseInt(request.getParameter("A003REMESA"));
            filter.A003COMENT = request.getParameter("A003COMENT");
            filter.A003FIANT1 = request.getParameter("A003FIANT1");
            filter.A003FIAND1 = request.getParameter("A003FIAND1");
            filter.A003FIANM1 = request.getParameter("A003FIANM1");
            filter.A003FIANI1 = Double.parseDouble(request.getParameter("A003FIANI1"));
            filter.A003FIANB1 = request.getParameter("A003FIANB1");
            filter.A003FIANT2 = request.getParameter("A003FIANT2");
            filter.A003FIAND2 = request.getParameter("A003FIAND2");
            filter.A003FIANM2 = request.getParameter("A003FIANM2");
            filter.A003FIANI2 = Double.parseDouble(request.getParameter("A003FIANI2"));
            filter.A003FIANB2 = request.getParameter("A003FIANB2");
            filter.A003CTACIA = request.getParameter("A003CTACIA");
            filter.A003CTANEG = request.getParameter("A003CTANEG");
            filter.A003CTACTO = request.getParameter("A003CTACTO");
            filter.A003CTAUBC = request.getParameter("A003CTAUBC");
            filter.A003CTACTA = request.getParameter("A003CTACTA");
            filter.A003CTASCT = request.getParameter("A003CTASCT");
            filter.A003CTAEQP = request.getParameter("A003CTAEQP");
            filter.A003CTAICI = request.getParameter("A003CTAICI");
            filter.A003AREA = request.getParameter("A003AREA");
            filter.A003CPROVE = request.getParameter("A003CPROVE");
            filter.A003CCLIEN = request.getParameter("A003CCLIEN");

            objRtn = logic.setPX018S03A003(filter);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("objRtn", objRtn);

        return new Gson().toJson(m);

    }

    public Boolean delete_fichero(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        String sFichero = path + "\\" + fileName + ".xlsx";
        File f = new File(sFichero);
        f.delete();
        return true;
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


    /*API python descarga de archivos grandes : NO_USADO
     */
    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void getFileTxt(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A003 filter = new A003();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        
            try {
                filter.VP_ACTION = request.getParameter("VP_ACTION");
                filter.A003KEY1 = request.getParameter("A003KEY1");
                filter.A003KEY2 = request.getParameter("A003KEY2");
                filter.A003KEY3 = request.getParameter("A003KEY3");
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
                bodyData.put("VP_ACTION", filter.VP_ACTION);
                bodyData.put("VP_A003KEY1", filter.A003KEY1);
                bodyData.put("VP_A003KEY2", filter.A003KEY2);
                bodyData.put("VP_A003KEY3", filter.A003KEY3);
                bodyData.put("VP_A003TYPE", request.getParameter("A003TYPE"));
                bodyData.put("PATH", rutaFile);

                String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();
                String urlAPI = "/api/AgentsMasterFile/rptAgentsMasterFile/";
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
                /*if (!filename.isEmpty()) {
                    if (!zip(filename)) {
                        response.setContentType("application/zip");
                    }
                }*/
                response.setContentType("application/zip");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + rutaFile + "\\" + filename + ".zip" + "\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + filename + ".zip");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();

            } catch (Exception e) {
                throw new SpringException(e);
            }
    }

    @RequestMapping(value = "ValidationDownload")
    public @ResponseBody
    String ValidationDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
        A003 filter = new A003();
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = 1;
            try {
                logic = new AgentsMasterFileLogic();
                logic.setSession(this.serverSession.getServerSession());
                
                filter.VP_ACTION = request.getParameter("VP_ACTION");
                filter.A003KEY1 = request.getParameter("A003KEY1");
                filter.A003KEY2 = request.getParameter("A003KEY2");
                filter.A003KEY3 = request.getParameter("A003KEY3");
                
                int int_result = logic.ValidationDownload(filter);
                HashMap m = new HashMap();
                m.put("success", true);
                m.put("int_result", int_result);

                return new Gson().toJson(m);
                

            } catch (Exception e) {
                throw new SpringException(e);
            }
    }

}
