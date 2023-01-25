package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.DOTLogic;
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
@RequestMapping("/DOT")
public class DOTController extends BaseController {

    private DOTLogic logic;
    private A3084Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A3084Filter> listaData;
        filter = new A3084Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.QUARTER = request.getParameter("QUARTER");
            filter.FTE = request.getParameter("FTE");

            logic = new DOTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01807(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetailFTE")
    public @ResponseBody
    String searchDetailFTE(ModelMap map, HttpServletRequest request) {
        List<A3084Filter> listaData;
        filter = new A3084Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.QUARTER = request.getParameter("QUARTER");
            filter.FTE = request.getParameter("FTE");

            logic = new DOTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01808(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetailTKT")
    public @ResponseBody
    String searchDetailTKT(ModelMap map, HttpServletRequest request) {
        List<A3084Filter> listaData;
        filter = new A3084Filter();
        try {
            filter.strTicket = request.getParameter("strTicket").trim();
            filter.strTipo = request.getParameter("strTipo").trim();
            filter.YEAR = request.getParameter("YEAR").trim();
            filter.QUARTER = request.getParameter("QUARTER").trim();
            filter.FTE = request.getParameter("FTE").trim();
            filter.strFCON = "USD";
            filter.strQuarter = request.getParameter("strQuarter").trim();
            filter.strFte = request.getParameter("strFte").trim();
            filter.PrimerstrTicket = request.getParameter("PrimerstrTicket").trim();
            
            String temp = request.getParameter("PAGNUM").trim();
            if(temp != null) filter.page.PAGNUM = Integer.parseInt(temp);
            temp = request.getParameter("PAGROW").trim();
            if(temp != null) filter.page.PAGROW = Integer.parseInt(temp);
            temp = request.getParameter("RN").trim();
            if(temp != null) filter.RN = Integer.parseInt(temp);
            filter.strPag = request.getParameter("strPag").trim();
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new DOTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            listaData = logic.loadDOT_COBOL(filter, hmAeropuertos);
            // listaData = logic.loadDOT_COBOL(filter);
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/exportFile1")
    public @ResponseBody
    String exportFile1(ModelMap map, HttpServletRequest request) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        String strFecha;
        String strPeriodo;

        String[] lista;//Nombres de los archivos en general
        List<A3084Filter> listaArray = new ArrayList<>();
        byte[] bytes = null;
        //OBTENIENDO EL ZIP DESEADO ========================================
        try {
            strFecha = request.getParameter("strFecha");
            strPeriodo = request.getParameter("strPeriodo");
            
            FilenameFilter fnfZIP = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return (name.startsWith("AM") && name.endsWith(".CSV"));
                }
            };
            //OBTENIENDO NOMBRE DE ZIP REJECTION y BILLING MEMO,
            // listaArray=null;
            String pathImgs = "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\AM\\DOT\\";
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfZIP);//
            //if (lista != null && lista.length > 0) {
            for (int i = 0; i < lista.length; i++) {
                if (lista[i].toString().trim().startsWith("AM" + strFecha + strPeriodo)) {
                    //  file = lista[i].toString().trim();
                    A3084Filter nombre = new A3084Filter();
                    nombre.strFormatDate = lista[i].toString().trim();
                    listaArray.add(nombre);
                }
            }
            //  }
            
            InputStream input;
            try {
                if (listaArray.size() > 0) {
                    File f = new File(pathImgs + listaArray.get(0).strFormatDate);

                    if (f.exists()) {
                        bytes = new byte[(int) f.length()];
                        input = new FileInputStream(f);
                        input.read(bytes);
                        input.close();
                    }
                }
                
            } catch (SocketException e) {
                e.printStackTrace();
            } catch (IOException eg) {
                eg.printStackTrace();
            }
            
            map.put("success", true);
            map.put("listaArray", listaArray);
            map.put("str", new String(bytes));
        } catch (Exception e) {
            //e.printStackTrace();
            e.printStackTrace(pw);
            sw.toString();
            map.put("success", false);
            map.put("sesion", " Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A3084Filter> listaData;
        filter = new A3084Filter();
        
        String fileNameDownload = String.format("DOT - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.QUARTER = request.getParameter("QUARTER");
            filter.FTE = request.getParameter("FTE");
            
            logic = new DOTLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01807(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("DOT");
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
            CH1_00.setCellValue("Year - Quarter");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Currency");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Total Universe");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Total Universe Coupon 0");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Total DOT");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 10));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Quantity");
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Amount");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Quantity");
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Amount");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Quantity");
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Amount");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));

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

//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);

            ++vj;
            
            Row row3 = sheet.createRow(vj);

            Cell CH3_00 = row3.createCell(0);
            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            CH3_02.setCellValue("Tickets");
            Cell CH3_03 = row3.createCell(3);
            CH3_03.setCellValue("Passenger");
            Cell CH3_04 = row3.createCell(4);
            CH3_04.setCellValue("Fare");
            Cell CH3_05 = row3.createCell(5);
            CH3_05.setCellValue("Tickets");
            Cell CH3_06 = row3.createCell(6);
            CH3_06.setCellValue("Passenger");
            Cell CH3_07 = row3.createCell(7);
            CH3_07.setCellValue("Fare");
            Cell CH3_08 = row3.createCell(8);
            CH3_08.setCellValue("Tickets");
            Cell CH3_09 = row3.createCell(9);
            CH3_09.setCellValue("Passenger");
            Cell CH3_10 = row3.createCell(10);
            CH3_10.setCellValue("Fare");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));

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
            
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);

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

                cell50.setCellValue(listaData.get(vi).strDescripcion);
                cell51.setCellValue(listaData.get(vi).strFCON);
                cell52.setCellValue(listaData.get(vi).QTYCOUP);
                cell53.setCellValue(listaData.get(vi).QCPNTOT);
                cell54.setCellValue(listaData.get(vi).FARE);
                cell55.setCellValue(listaData.get(vi).QTYCOUPU);
                cell56.setCellValue(listaData.get(vi).QCPNTOT);
                cell57.setCellValue(listaData.get(vi).FAREU);
                cell58.setCellValue(listaData.get(vi).QTYCOUPD);
                cell59.setCellValue(listaData.get(vi).QCPNTOTD);
                cell60.setCellValue(listaData.get(vi).FARED);

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
