package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.flown.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.flown.A1707;
import net.miatech.praxis.A005;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.SSIMComplementaryFilesLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import org.springframework.web.bind.annotation.RequestMethod;

// </editor-fold>

/**
 *
 * @author gsanchez
 */

@Controller
@Scope("request")
@RequestMapping("/SSIMComplementaryFiles")
public class SSIMComplementaryFilesController extends BaseController {
    
    private SSIMComplementaryFilesLogic logic;
    private A1707 a;
    private MasterDAO dao;
    
    @RequestMapping(value = "/cargarPX104")
    public @ResponseBody
    String search(ModelMap m, HttpServletRequest request) {
        List<A1707> listaData;

        MasterDAO dao = new MasterDAO();
        dao.setSession((IServerSession) serverSession.getServerSession());
        HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();

        a = new A1707();
        a.page.TOTROW = -1;
        a.page.START = 0;
        a.page.LIMIT = 0;
        
        try {
            a.NFLIGHT = request.getParameter("NFLIGHT").trim();
            
            logic = new SSIMComplementaryFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            a.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            a.page.PAGNUM = (start / a.page.PAGROW) + 1;
            
            listaData = logic.loadPX104S01A1707(a, hmAeropuertos);

        } catch (SQLException e) {
            throw new SpringException(e);
        }
        
        m.put("success", true);
        m.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        m.put("data", listaData);
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "/completeData")
    public @ResponseBody
    String searchCompleteData(ModelMap m, HttpServletRequest request) throws Exception {
//        A1707 A1707bean;
        List<A1007> ciudades;
        List<A005> aerolineas;

        try {
            String opc = request.getParameter("opcion");
            if (opc.equals("ciudades")) {
                dao = new MasterDAO();
                dao.setSession((IServerSession) serverSession.getServerSession());
    //            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
    //            A1707bean = logic.loadPX104S02A1707(a, hmAeropuertos);
                ciudades = dao.loadCiudades();
                m.put("lstA1007", ciudades);
            } else if (opc.equals("aerolineas")) {
                logic = new SSIMComplementaryFilesLogic();
                logic.setSession((IServerSession) serverSession.getServerSession());
                aerolineas = logic.loadPX104S04A005();
                m.put("lstA005", aerolineas);
            }
            m.put("success", true);
//            m.put("A1707bean", A1707bean);
        } catch (SQLException e) {
            m.put("success", false);
            throw new SpringException(e);
        }
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        String fecha = Functions.getFechaActual();
        SimpleDateFormat parseador = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat formateador = new SimpleDateFormat("MMM");
        Date date = null;
        try {
             date = parseador.parse(fecha);
        } catch (ParseException ex) {}
        String fileNameDownload = String.format("Complement SSIM " + fecha + " " + formateador.format(date) + " " + fecha.substring(0, 4) + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1707> oList = new ArrayList<>(0);
            a = new A1707();
            logic = new SSIMComplementaryFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            MasterDAO dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();

            a.NFLIGHT = request.getParameter("NFLIGHT").trim();

            oList = logic.loadPX104S01A1707(a, hmAeropuertos);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SSIM Complementary Files");
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
            // </editor-fold>

            Integer vi = 0;
            Iterator iter = oList.iterator();
            Integer vj = 0;

            // <editor-fold defaultstate="collapsed" desc="Creación de Tìtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Seq.");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Flight");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Airport");
            Cell CH1_04 = row.createCell(5);
            CH1_04.setCellValue("LEG");
            Cell CH1_05 = row.createCell(6);
            CH1_05.setCellValue("Operation");
            Cell CH1_06 = row.createCell(7);
            CH1_06.setCellValue("Flag");
            Cell CH1_07 = row.createCell(8);
            CH1_07.setCellValue("Daily");
            Cell CH1_08 = row.createCell(9);
            CH1_08.setCellValue("Carrier");
            Cell CH1_09 = row.createCell(10);
            CH1_09.setCellValue("Hard-Block");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));//Nbr.
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));//Seq.
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));//Flight
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 4));//Airport
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 5, 5));//LEG
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));//Operation
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));//Flag
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));//Daily
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 9, 9));//Carrier
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 11));//Hard-Block

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
            ++vj;
            
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_09 = row2.createCell(9);

            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Number");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Departure");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Arrival");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Type");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("SSIM");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Rate");
            Cell CH2_10 = row2.createCell(10);
            CH2_06.setCellValue("Flight");
            Cell CH2_11 = row2.createCell(11);
            CH2_07.setCellValue("Carrier");
            
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));//Number
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));//Departure
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));//Arrival
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));//Type
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));//SSIM
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));//Rate
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));//Flight
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));//Carrier

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

            ++vj;
            
            Row row3 = sheet.createRow(vj);

            Cell CH3_00 = row3.createCell(10);
            CH3_00.setCellValue("Number");
            
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));//Number

            CH3_00.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                cell50.setCellValue(oList.get(vi).RN);
                cell51.setCellValue(oList.get(vi).NSEQ);
                cell52.setCellValue(oList.get(vi).NFLIGHT);
                cell53.setCellValue(oList.get(vi).CDEPART);
                cell54.setCellValue(oList.get(vi).CARRIVA);
                cell55.setCellValue(oList.get(vi).LEG);
                cell56.setCellValue(oList.get(vi).TOPER);
                cell57.setCellValue(oList.get(vi).FSSIM);
                cell58.setCellValue(oList.get(vi).FREQ);
                cell59.setCellValue(oList.get(vi).CARRIER);
                cell60.setCellValue(oList.get(vi).NFLIGHTH);
                cell61.setCellValue(oList.get(vi).CARRIERH);
                // </editor-fold>
                
                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "/mantenimiento1707")
    public @ResponseBody
    String MaintenanceA1707(HttpServletRequest request) throws Exception {
        a = new A1707();
        String msj = "";

        try {
            a.NFLIGHT = request.getParameter("NFLIGHT").trim();
            a.CDEPART = request.getParameter("CDEPART").trim();
            a.CARRIVA = request.getParameter("CARRIVA").trim();
            a.NSEQ = Long.parseLong(request.getParameter("NSEQ").trim());
            String t = request.getParameter("LEG").trim();
            if (!t.equals("")) {
                a.LEG = Long.parseLong(t);
            } else a.LEG = 0;
            
            a.FSSIM = request.getParameter("FSSIM").trim();
            a.FREQ = request.getParameter("FREQ").trim();
            a.CARRIER = request.getParameter("CARRIER").trim();
            a.NFLIGHTH = request.getParameter("NFLIGHTH").trim();
            a.CARRIERH = request.getParameter("CARRIERH").trim();
            a.TOPER = request.getParameter("TOPER").trim();
            
            logic = new SSIMComplementaryFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            msj = logic.loadPX104S03A1707(a, request.getParameter("strOption").trim());
            
        } catch (SQLException e) {
            System.out.println("e: " + e.getMessage());
//            throw new SpringException(e);
        }
        Map m = new LinkedHashMap();
        m.put("success", true);
        m.put("mensaje", msj);
        return new Gson().toJson(m);
    }
}
