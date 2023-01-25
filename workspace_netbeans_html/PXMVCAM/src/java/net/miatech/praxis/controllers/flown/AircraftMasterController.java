package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1702;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AircraftMasterLogic;
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
@RequestMapping("/AircraftMaster")
public class AircraftMasterController extends BaseController {
    
    private AircraftMasterLogic logic;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A1702Filter filter = new A1702Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new AircraftMasterLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1702Filter> listaData = logic.loadPX102S01A1702(filter);
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchCompleteData")
    public @ResponseBody
    String searchCompleteData(ModelMap map, HttpServletRequest request) {
        A1702Filter filter = new A1702Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new AircraftMasterLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            A1702 A1702bean = logic.loadPX102S02A1702(filter);

            map.put("success", true);
            map.put("A1702bean", A1702bean);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/MaintenanceA1702")
    public @ResponseBody
    String MaintenanceA1702(ModelMap map, HttpServletRequest request) {
        A1702 filter = new A1702();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String strOption = request.getParameter("strOption");

            logic = new AircraftMasterLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String msj = logic.loadPX102S03A1702(filter, strOption);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("Aircraft Master - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            A1702Filter filter = new A1702Filter();
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.IN_VALORTXT = request.getParameter("IN_VALORTXT");
            filter.IN_TIPOTXT = request.getParameter("IN_TIPOTXT");

            logic = new AircraftMasterLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1702Filter> listaData = logic.loadPX102S01A1702(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Aircraft Master");
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
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Tìtulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Equipment");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Model");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Number");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Registration");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Carrier");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Type");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Manufacture");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Operation");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Contract");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Time");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Seats Number");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Total");
            Cell CH1_19 = row.createCell(19);
            CH1_19.setCellValue("Weight");
            Cell CH1_20 = row.createCell(20);
            CH1_20.setCellValue("Maximum");
            Cell CH1_21 = row.createCell(21);
            CH1_21.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));//Nbr
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));//Equipment
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));//Model
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));//Number
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));//Registration
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));//Carrier
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));//Type
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));//Manufacture
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));//Operation
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));//Constract
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));//Time
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 15));//Seats Number
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 18));//Total
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 19, 19));//Weight
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));//Maximum
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 21, 21));//Status

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
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_16.setCellStyle(headerStyle);
            CH1_19.setCellStyle(headerStyle);
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);

            ++vj;
            
            Row row2 = sheet.createRow(vj);
            
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);

            CH2_04.setCellValue("Number");
            CH2_07.setCellValue("Date");
            CH2_08.setCellValue("Start Date");
            CH2_09.setCellValue("Start Date");
            CH2_10.setCellValue("End Date");
            CH2_11.setCellValue("of Flight");
            CH2_12.setCellValue("Pax F");
            CH2_13.setCellValue("Pax J");
            CH2_14.setCellValue("Pax Y");
            CH2_15.setCellValue("Total Pax");
            CH2_16.setCellValue("Miles");
            CH2_17.setCellValue("Gallons");
            CH2_18.setCellValue("Charge");
            CH2_20.setCellValue("Weight");
            
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));//Number
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));//Date
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));//Start Date
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));//Start Date
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));//End Date
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));//of Flight
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));//Pax F
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));//Pax J
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));//Pax Y
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 15));//Total Pax
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 16));//Miles
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 17));//Gallons
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 18));//Charge
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));//Weight

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
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);

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
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);
                Cell cell68 = row.createCell(18);
                Cell cell69 = row.createCell(19);
                Cell cell70 = row.createCell(20);
                Cell cell71 = row.createCell(21);
                
                cell50.setCellValue(listaData.get(vi).RN);
                cell51.setCellValue(listaData.get(vi).EQUIPO);
                cell52.setCellValue(listaData.get(vi).MODELO);
                cell53.setCellValue(listaData.get(vi).NUMERO);
                cell54.setCellValue(listaData.get(vi).MATRIC);
                cell55.setCellValue(listaData.get(vi).CARRIER);
                cell56.setCellValue(listaData.get(vi).TIPO);
                cell57.setCellValue(listaData.get(vi).FECHA);
                cell58.setCellValue(listaData.get(vi).FECHAOP);
                cell59.setCellValue(listaData.get(vi).FECINICO);
                cell60.setCellValue(listaData.get(vi).FECFINCO);
                cell61.setCellValue(listaData.get(vi).HORAVLO);
                cell62.setCellValue(listaData.get(vi).PAXF);
                cell63.setCellValue(listaData.get(vi).PAXJ);
                cell64.setCellValue(listaData.get(vi).PAXY);
                cell65.setCellValue(listaData.get(vi).PAX);
                cell66.setCellValue(listaData.get(vi).TOTMILL);
                cell67.setCellValue(listaData.get(vi).TOTGALO);
                cell68.setCellValue(listaData.get(vi).TOTCARG);
                cell69.setCellValue(listaData.get(vi).PESO);
                cell70.setCellValue(listaData.get(vi).PESOMAX);
                if (listaData.get(vi).ESTADO.equals("1")) {
                    cell71.setCellValue("ACTIVO");
                } else {
                    cell71.setCellValue("INACTIVO");
                }

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
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                cell71.setCellStyle(bodyStyle);
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
