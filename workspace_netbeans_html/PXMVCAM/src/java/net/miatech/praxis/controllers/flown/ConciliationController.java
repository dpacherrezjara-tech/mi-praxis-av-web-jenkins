package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1691;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ConciliationLogic;
import net.miatech.utils.Functions;
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

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/Conciliation")
public class ConciliationController extends BaseController {
    
    ConciliationLogic logic;
    A1691Filter filter;
    A1691 a;
    private MasterDAO dao;
    
    @RequestMapping(value = "/upload")
    public @ResponseBody
    String upload(ModelMap map, HttpServletRequest request) {
        try {
            String fecha = request.getParameter("Fecha");
            
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            HashMap hm = logic.loadPX362SQP01273(fecha,hmAeropuertos);
            
            map.put("success", true);
            map.put("mensaje", hm.get("MSJ"));
            map.put("lstA1691", hm.get("lstA1691"));
            map.put("lstExcel", hm.get("lstExcel"));
            map.put("lstA1691Dif", hm.get("lstA1691Dif"));
        } catch (SQLException | ClassNotFoundException e) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error al intentar subir el archivo.");
            map.put("error", e.getMessage());
        }
        return new Gson().toJson(map);
    }  
    
    @RequestMapping(value = "/loadTicketPaper")
    public @ResponseBody
    String loadTicketPaper(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> lstdataTKT;
        
        dao = new MasterDAO();
        dao.setSession((IServerSession) serverSession.getServerSession());
        HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
        
        try {
            filter = new A1691Filter();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            lstdataTKT = logic.loadPX352_PAPER_TICKET(filter,hmAeropuertos);
            
            map.put("success", true);
            map.put("data", lstdataTKT);
        } catch (SQLException | ClassNotFoundException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadTicket_ACS")
    public @ResponseBody
    String loadTicket_ACS(ModelMap map, HttpServletRequest request) {
        try {
            filter = new A1691Filter();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            List<A1692Filter> lstdataTKT = logic.loadPX_TKTACS(filter);
            
            map.put("success", true);
            map.put("data", lstdataTKT);
        //} catch (SQLException e) {
            //resp.info.add(e.getMessage());
            //logError.error(e.getMessage());
        } catch (ClassNotFoundException | SQLException e) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error.");
            map.put("error", e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error.");
            map.put("error", e.getMessage());
        }
        return new Gson().toJson(map);
    }  
    
    @RequestMapping(value = "/getXLSXDifference")
    public @ResponseBody
    void getXLSXDifference(HttpServletRequest request, HttpServletResponse response) {
        try {
            String fileName = request.getParameter("fileName");
            String fecha = request.getParameter("Fecha");
            String hd_Diff = request.getParameter("hd_Diff");
            
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            HashMap hm = logic.loadPX362SQP01273(fecha,hmAeropuertos);

            List<A1691Filter> listaData = (ArrayList)hm.get("lstA1691Dif");
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Conciliation");
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
            Iterator iter = listaData.iterator();
            
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue(hd_Diff + listaData.get(0).strFormatDate);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));

            CH1_00.setCellStyle(headerStyle);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            
            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Nbr");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Flight");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Origin");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Destination");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Status");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("ODS");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Conciliation");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Paper Tkts");
            
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));

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
//            Cell CH3_00 = row2.createCell(0);
//            Cell CH3_06 = row2.createCell(6);
//            Cell CH3_07 = row2.createCell(7);
//            Cell CH3_11 = row2.createCell(11);
            
            Cell CH3_01 = row3.createCell(1);
            CH3_01.setCellValue("Number");
            Cell CH3_02 = row3.createCell(2);
            CH3_02.setCellValue("Code");
            Cell CH3_03 = row3.createCell(3);
            CH3_03.setCellValue("Description");
            Cell CH3_04 = row3.createCell(4);
            CH3_04.setCellValue("Code");
            Cell CH3_05 = row3.createCell(5);
            CH3_05.setCellValue("Description");
            Cell CH3_06 = row3.createCell(6);
            Cell CH3_07 = row3.createCell(7);
            Cell CH3_08 = row3.createCell(8);
            CH3_08.setCellValue("Flight");
            Cell CH3_09 = row3.createCell(9);
            CH3_09.setCellValue("ACS");
            Cell CH3_10 = row3.createCell(10);
            CH3_10.setCellValue("Difference");
            Cell CH3_11 = row3.createCell(11);
            
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));

//            CH3_00.setCellStyle(headerStyle);
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

            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
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
                
                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).NFLIGHT);
                cell52.setCellValue(listaData.get(vi).CDEPART);
                cell53.setCellValue(listaData.get(vi).strDescCDEPART);
                cell54.setCellValue(listaData.get(vi).CARRIVA);
                cell55.setCellValue(listaData.get(vi).strDescCARRIVA);
                cell56.setCellValue(listaData.get(vi).strDescripcion);
                cell57.setCellValue(listaData.get(vi).QCPNOD);
                cell58.setCellValue(listaData.get(vi).QCPNTOT);
                cell59.setCellValue(listaData.get(vi).QCPNCON);
                cell60.setCellValue(listaData.get(vi).QCPINF);
                cell61.setCellValue(listaData.get(vi).QCPNFI);

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
                
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
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
    
    @RequestMapping(value = "/getXLSXMainData")
    public @ResponseBody
    void getXLSXMainData(HttpServletRequest request, HttpServletResponse response) {
        try {
            String fileName = request.getParameter("fileName");
            String fecha = request.getParameter("Fecha");
            String hd_A1691 = request.getParameter("hd_A1691");
            String hd_ACS = request.getParameter("hd_ACS");
            
            dao = new MasterDAO();
            dao.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            HashMap hm = logic.loadPX362SQP01273(fecha,hmAeropuertos);

            List<A1691Filter> listaData = (ArrayList)hm.get("lstA1691");
            List<A1691Filter> listaData2 = (ArrayList)hm.get("lstExcel");
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Conciliation");
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
            
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            // <editor-fold defaultstate="collapsed" desc="Fila 1">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue(hd_A1691 + fecha);
            
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue(hd_ACS + fecha);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
            
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 14));

            CH1_00.setCellStyle(headerStyle);
            
            CH1_09.setCellStyle(headerStyle);

            sheet.autoSizeColumn(9, true);
            
            ++vj;
            // </editor-fold>
            
            // <editor-fold defaultstate="collapsed" desc="Fila 2">
            Row row2 = sheet.createRow(vj);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_06 = row2.createCell(6);
            
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_14 = row2.createCell(14);
            
            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Nbr");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Status");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Flight");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Origin");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Destination");
            
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Nbr");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Flight");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Origin");
            Cell CH2_13 = row2.createCell(13);
            CH2_13.setCellValue("Destination");
            
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            
            ++vj;
            // </editor-fold>
            
            // <editor-fold defaultstate="collapsed" desc="Fila 3">
            Row row3 = sheet.createRow(vj);
            Cell CH3_00 = row3.createCell(0);
            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            CH3_02.setCellValue("Number");
            Cell CH3_03 = row3.createCell(3);
            CH3_03.setCellValue("Code");
            Cell CH3_04 = row3.createCell(4);
            CH3_04.setCellValue("Description");
            Cell CH3_05 = row3.createCell(5);
            CH3_05.setCellValue("Code");
            Cell CH3_06 = row3.createCell(6);
            CH3_06.setCellValue("Description");
            
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            CH3_10.setCellValue("Number");
            Cell CH3_11 = row3.createCell(11);
            CH3_11.setCellValue("Code");
            Cell CH3_12 = row3.createCell(12);
            CH3_12.setCellValue("Description");
            Cell CH3_13 = row3.createCell(13);
            CH3_13.setCellValue("Code");
            Cell CH3_14 = row3.createCell(14);
            CH3_14.setCellValue("Description");
            
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));

            CH3_00.setCellStyle(headerStyle);
            CH3_01.setCellStyle(headerStyle);
            CH3_02.setCellStyle(headerStyle);
            CH3_03.setCellStyle(headerStyle);
            CH3_04.setCellStyle(headerStyle);
            CH3_05.setCellStyle(headerStyle);
            CH3_06.setCellStyle(headerStyle);
            
            CH3_09.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);

            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(6, true);

            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(14, true);
            
            ++vj;
            // </editor-fold>
            // </editor-fold>
            
            Iterator iter1 = listaData.iterator();
            Iterator iter2 = listaData2.iterator();
            
            while (iter1.hasNext() || iter2.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                if (iter1.hasNext()) {
                    Cell cell50 = row.createCell(0);
                    Cell cell51 = row.createCell(1);
                    Cell cell52 = row.createCell(2);
                    Cell cell53 = row.createCell(3);
                    Cell cell54 = row.createCell(4);
                    Cell cell55 = row.createCell(5);
                    Cell cell56 = row.createCell(6);

                    cell50.setCellValue(listaData.get(vi).RN);
                    cell51.setCellValue(listaData.get(vi).strDescripcion);
                    cell52.setCellValue(listaData.get(vi).NFLIGHT);
                    cell53.setCellValue(listaData.get(vi).CDEPART);
                    cell54.setCellValue(listaData.get(vi).strDescCDEPART);
                    cell55.setCellValue(listaData.get(vi).CARRIVA);
                    cell56.setCellValue(listaData.get(vi).strDescCARRIVA);

                    cell50.setCellStyle(bodyStyle);
                    cell51.setCellStyle(bodyStyle);
                    cell52.setCellStyle(bodyStyle);
                    cell53.setCellStyle(bodyStyle);
                    cell54.setCellStyle(bodyStyle);
                    cell55.setCellStyle(bodyStyle);
                    cell56.setCellStyle(bodyStyle);

                    sheet.autoSizeColumn(1, true);
                    sheet.autoSizeColumn(4, true);
                    sheet.autoSizeColumn(6, true);
                    
                    iter1.next();
                }
                
                if (iter2.hasNext()) {
                    Cell cell50 = row.createCell(9);
                    Cell cell51 = row.createCell(10);
                    Cell cell52 = row.createCell(11);
                    Cell cell53 = row.createCell(12);
                    Cell cell54 = row.createCell(13);
                    Cell cell55 = row.createCell(14);

                    cell50.setCellValue(listaData2.get(vi).RN);
                    cell51.setCellValue(listaData2.get(vi).NFLIGHT);
                    cell52.setCellValue(listaData2.get(vi).CDEPART);
                    cell53.setCellValue(listaData2.get(vi).strDescCDEPART);
                    cell54.setCellValue(listaData2.get(vi).CARRIVA);
                    cell55.setCellValue(listaData2.get(vi).strDescCARRIVA);

                    cell50.setCellStyle(bodyStyle);
                    cell51.setCellStyle(bodyStyle);
                    cell52.setCellStyle(bodyStyle);
                    cell53.setCellStyle(bodyStyle);
                    cell54.setCellStyle(bodyStyle);
                    cell55.setCellStyle(bodyStyle);

                    sheet.autoSizeColumn(12, true);
                    sheet.autoSizeColumn(14, true);
                    
                    iter2.next();
                }
                // </editor-fold>
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
    
    @RequestMapping(value = "/getXLSXTicketACS")
    public @ResponseBody
    void getXLSXTicketACS(HttpServletRequest request, HttpServletResponse response) {
        try {
            String fileName = request.getParameter("fileName");
            
            filter = new A1691Filter();
            filter.DFLIGHT = request.getParameter("DFLIGHT");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.CARRIVA = request.getParameter("CARRIVA");
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            List<A1692Filter> listaData = logic.loadPX_TKTACS(filter);
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Ticket Conciliation");
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
            Iterator iter = listaData.iterator();
            
            // <editor-fold defaultstate="collapsed" desc="Creación de Tìtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Ticket Number");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("First Name");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Last Name");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Found");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                
                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).strTicket);
                cell52.setCellValue(listaData.get(vi).strFormatDate);
                cell53.setCellValue(listaData.get(vi).strFormatDate2);
                cell54.setCellValue(listaData.get(vi).FLOAD);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
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
    
    @RequestMapping(value = "/getXLSXTicketPaper")
    public @ResponseBody
    void getXLSXTicketPaper(HttpServletRequest request, HttpServletResponse response) {
        filter = new A1691Filter();
        
        dao = new MasterDAO();
        dao.setSession((IServerSession) serverSession.getServerSession());
        HashMap<String, String> hmAeropuertos = dao.loadCiudadesHash();
        
        try {
            filter = new A1691Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileName = request.getParameter("fileName");
            
            logic = new ConciliationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //mensaje = logic.loadPX362SQP01273(strArchivo,fileName);
            List<A1692Filter> listaData = logic.loadPX352_PAPER_TICKET(filter,hmAeropuertos);
            
            //<editor-fold defaultstate="collapsed" desc="sort">
            String dataIndex = request.getParameter("dataIndex");
            final String sortState = request.getParameter("sortState");
            System.out.println("dataIndex: " + dataIndex);
            System.out.println("sortState: " + sortState);
            if (!dataIndex.equals("") && !sortState.equals("")) {
                switch (dataIndex) {
                    case "strTicket":
                        Collections.sort(listaData, new Comparator<A1692Filter>() {
                            @Override public int compare(A1692Filter o1, A1692Filter o2) {
                                if (sortState.equals("ASC")) return new String(o1.strTicket).compareTo(o2.strTicket);
                                else return new String(o2.strTicket).compareTo(o1.strTicket); // DESC
                            }
                        }); break;
                }
            }
            //</editor-fold>
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Conciliation");
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
            Iterator iter = listaData.iterator();
            
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Flight");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Origin");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Destination");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("PMR Locator ID");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Paper Number Ticket");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("First Name");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Last Name");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);

            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            
            ++vj;
            
            Row row2 = sheet.createRow(vj);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
            
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Number ");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Code");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Description");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Code");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Description");
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

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
            
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(5, true);
            
            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
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
                
                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).NFLIGHT);
                cell52.setCellValue(listaData.get(vi).CDEPART);
                cell53.setCellValue(listaData.get(vi).strDescCDEPART);
                cell54.setCellValue(listaData.get(vi).CARRIVA);
                cell55.setCellValue(listaData.get(vi).strDescCARRIVA);
                cell56.setCellValue(listaData.get(vi).strFCON);
                cell57.setCellValue(listaData.get(vi).strTicket);
                cell58.setCellValue(listaData.get(vi).strFormatDate);
                cell59.setCellValue(listaData.get(vi).strFormatDate2);

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
                
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(6, true);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
