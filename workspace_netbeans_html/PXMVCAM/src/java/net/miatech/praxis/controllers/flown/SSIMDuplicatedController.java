package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1737Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.flown.SSIMDuplicatedDAO;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.MultilegTableLogic;
import net.miatech.praxis.logic.flown.SSIMDuplicatedLogic;
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
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/SSIMDuplicated")
public class SSIMDuplicatedController extends BaseController {

    private SSIMDuplicatedLogic logic;
    private MasterDAO dao;
    private A1691Filter a = null;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap m, HttpServletRequest request) {

        List<A1691Filter> listaData;
        a = new A1691Filter();
        a.page.TOTROW = -1;
        a.page.START = 0;
        a.page.LIMIT = 0;
        
        a.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").trim();
        a.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").trim();
        a.IN_NFLIGHT = request.getParameter("IN_NFLIGHT").trim();
        
        int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
        int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
        a.page.PAGROW = 20;
        start = (start != 0 ? start : 0);
        a.page.PAGNUM = (start / a.page.PAGROW) + 1;
        
        dao = new MasterDAO();
        dao.setSession((IServerSession) serverSession.getServerSession());
        HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
        logic = new SSIMDuplicatedLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        listaData = logic.loadPX232S01A1691(a, hmAeropuertos);
        m.put("success", true);
        m.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        m.put("data", listaData);

        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "/completeData")
    public @ResponseBody
    String searchBean(ModelMap m, HttpServletRequest request) throws Exception {
        A1691Filter bean;
        dao = new MasterDAO();
        dao.setSession((IServerSession) serverSession.getServerSession());
        HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();

        try {
            a = new A1691Filter();
            a.DFLIGHT = request.getParameter("DFLIGHT").trim();
            a.NFLIGHT = request.getParameter("NFLIGHT").trim();
            a.CDEPART = request.getParameter("CDEPART").trim();
            a.CARRIVA = request.getParameter("CARRIVA").trim();
            
            logic = new SSIMDuplicatedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            bean = logic.loadPX095S04A1691(a, hmAeropuertos);
            m.put("success", true);
            m.put("beanCons", bean);
        } catch (SQLException e) {
            m.put("success", false);
            throw new SpringException(e);
        }
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "/mantenimientoA1691")
    public @ResponseBody
    String executeOption(ModelMap m, HttpServletRequest request) {
        String msj = "";
        try {
            a = new A1691Filter();
            a.STVAL = request.getParameter("STVAL").trim();
            a.CARRI = request.getParameter("CARRI").trim();
            a.FFLOW = request.getParameter("FFLOW").trim();
            a.TOPER = request.getParameter("TOPER").trim();
            a.FSENDSS = request.getParameter("FSENDSS").trim();
            a.CDEPART = request.getParameter("CDEPART").trim();
            a.CARRIVA = request.getParameter("CARRIVA").trim();
            a.ZONE = request.getParameter("ZONE").trim();
//            a.MINICONEC = request.getParameter("MINICONEC").trim();
            a.MINICONEC = "";
            a.LEGSEQ = request.getParameter("LEGSEQ").trim();
            a.NFLIGHT = request.getParameter("NFLIGHT").trim();
            a.DFLIGHT = request.getParameter("DFLIGHT").trim();
            a.NPLANE = request.getParameter("NPLANE").trim();
            a.FSTASS = request.getParameter("FSTASS").trim();
            a.FSENDOD = request.getParameter("FSENDOD").trim();
            a.QCPNOD = Long.parseLong(request.getParameter("QCPNOD").trim());
            a.FSTAOD = request.getParameter("FSTAOD").trim();
            a.FSENDVC = request.getParameter("FSENDVC").trim();
            a.FSTAVC = request.getParameter("FSTAVC").trim();
            a.QCPNVC = Long.parseLong(request.getParameter("QCPNVC").trim());
            a.QCPNMA = Long.parseLong(request.getParameter("QCPNMA").trim());
            a.QCPNTOT = Long.parseLong(request.getParameter("QCPNTOT").trim());
//            a.QCPNOAL = Long.parseLong(request.getParameter("QCPNOAL").trim());
            a.QCPNOAL = 0;
//            a.QCPHARB = Long.parseLong(request.getParameter("QCPHARB").trim());
            a.QCPHARB = 0;
            a.FSENDFI = request.getParameter("FSENDFI").trim();
            a.QCPNFI = Integer.parseInt(request.getParameter("QCPNFI").trim());
            a.FSTAFI = request.getParameter("FSTAFI").trim();
            a.FSTAPO = request.getParameter("FSTAPO").trim();
            a.FOPERZUL = request.getParameter("FOPERZUL").trim();
            a.QCPTRA = Long.parseLong(request.getParameter("QCPTRA").trim());
            a.strDescripcion = request.getParameter("strDescripcion").trim();
            
            if (a.STVAL.trim().equals("3")) {
                a.FSTAPO = "1";//Pendiente para Contabilizar
            }

            logic = new SSIMDuplicatedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            msj = logic.loadPX232S02A1691(a, request.getParameter("strOption").trim());
            m.put("success", true);
        } catch (SQLException e) {
            m.put("success", false);
            throw new SpringException(e);
        } catch (Exception e) {
            m.put("success", false);
            throw new SpringException(e);
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        m.put("mensaje", msj);

        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("SSIM Duplicated - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1691Filter> oList = new ArrayList<>(0);
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
            a = new A1691Filter();
            logic = new SSIMDuplicatedLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            a.IN_FECHA_FROM = request.getParameter("dateFrom").trim();
            a.IN_FECHA_TO = request.getParameter("dateTo").trim();
            a.NFLIGHT = request.getParameter("flightNumber").trim();

            oList = logic.loadPX232S01A1691(a, hmAeropuertos);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SSIM Duplicated");
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

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = oList.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Tìtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("SSIM Data");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Information PAX ODS");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("ODS Data");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("LEG");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("VCR Data");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("OCR");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Manual");
            Cell CH1_18 = row.createCell(18);
            CH1_18.setCellValue("Total");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));//SSIM Data
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));//Information PAX ODS
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));//ODS Data
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));//LEG
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 15));//VCR Data
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));//OCR
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));//Manual
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));//Total

            CH1_00.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);
            CH1_18.setCellStyle(headerStyle);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_18 = row2.createCell(18);

            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Flight");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Orig");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Dest");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Carrier");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Received");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Senior");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Children");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Infant");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Transit");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Received");
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("Qty");
            Cell CH2_14 = row2.createCell(14);
            CH2_14.setCellValue("Received");
            Cell CH2_15 = row2.createCell(15);
            CH2_15.setCellValue("Qty");
            Cell CH2_16 = row2.createCell(16);
            CH2_16.setCellValue("Qty");
            Cell CH2_17 = row2.createCell(17);
            CH2_17.setCellValue("Qty");
            
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 2));//Flight
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));//Orig
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));//Dest
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));//Carrier
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));//Received
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));//Senior
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));//Children
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));//Infant
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));//Transit
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));//Received
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));//Qty
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));//Received
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));//Qty
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));//Qty
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));//Qty
            
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
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            ++vj;
            
            Row row3 = sheet.createRow(vj);
            Cell CH3_03 = row3.createCell(3);
            Cell CH3_04 = row3.createCell(4);
            Cell CH3_05 = row3.createCell(5);
            Cell CH3_07 = row3.createCell(7);
            Cell CH3_08 = row3.createCell(8);
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);

            Cell CH3_00 = row3.createCell(0);
            CH3_00.setCellValue("Date");
            Cell CH3_01 = row3.createCell(1);
            CH3_01.setCellValue("Number");
            Cell CH3_02 = row3.createCell(2);
            CH3_02.setCellValue("Leg Seq");
            Cell CH3_06 = row3.createCell(6);
            CH3_06.setCellValue("Date");
            Cell CH3_11 = row3.createCell(11);
            CH3_11.setCellValue("Date");
            Cell CH3_14 = row3.createCell(14);
            CH3_14.setCellValue("Date");
            
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));//Date
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));//Number
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));//Leg Seq
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));//Date
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));//Date
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));//Date

            CH3_00.setCellStyle(headerStyle);
            CH3_01.setCellStyle(headerStyle);
            CH3_02.setCellStyle(headerStyle);
            CH3_03.setCellStyle(headerStyle);
            CH3_04.setCellStyle(headerStyle);
            CH3_05.setCellStyle(headerStyle);
            CH3_06.setCellStyle(headerStyle);
            CH3_07.setCellStyle(headerStyle);
            CH3_08.setCellStyle(headerStyle);
            CH3_09.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);
            
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
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);
                Cell cell68 = row.createCell(18);
                
                cell50.setCellValue(oList.get(vi).strFormatDate);
                cell51.setCellValue(oList.get(vi).NFLIGHT);
                cell52.setCellValue(oList.get(vi).LEGSEQ);
                cell53.setCellValue(oList.get(vi).CDEPART);
                cell54.setCellValue(oList.get(vi).CARRIVA);
                cell55.setCellValue(oList.get(vi).CARRI);
                cell56.setCellValue(oList.get(vi).strFormatFSENDSS);
                cell57.setCellValue(oList.get(vi).QCPAD);
                cell58.setCellValue(oList.get(vi).QCPCHD);
                cell59.setCellValue(oList.get(vi).QCPINF);
                cell60.setCellValue(oList.get(vi).QCPTRA);
                cell61.setCellValue(oList.get(vi).strFormatFSENDOD);
                cell62.setCellValue(oList.get(vi).QCPNOD);
                cell63.setCellValue(oList.get(vi).QCPNLEG);
                cell64.setCellValue(oList.get(vi).strFormatFSENDVC);
                cell65.setCellValue(oList.get(vi).QCPNVC);
                cell66.setCellValue(oList.get(vi).QCPNOCR);
                cell67.setCellValue(oList.get(vi).QCPNMA);
                cell68.setCellValue(oList.get(vi).QCPNTOT);
                
                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);
                cell64.setCellStyle(bodyStyle);
                cell65.setCellStyle(bodyStyle);
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);
                cell68.setCellStyle(bodyStyle);
                
                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(11, true);
                sheet.autoSizeColumn(14, true);
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
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
