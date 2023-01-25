/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A3907Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.LoadticketReportFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/LoadticketReportForm")
public class LoadticketReportFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadticketReportFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A3907Filter> lst;
        A3907Filter filter = new A3907Filter();

        try {
            logic = new LoadticketReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION");
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_TICKET = request.getParameter("IN_TICKET");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3907Filter filter = new A3907Filter();
        List<A3907Filter> lst;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new LoadticketReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.search(filter);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("LoadticketReportForm");
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

            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07;

            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("System Date");
            CH_02.setCellValue("IATA");
            CH_03.setCellValue("Agency");
            CH_04.setCellValue("Country");
            CH_05.setCellValue("Document");
            CH_06.setCellValue("Authorise/Reject date");
            CH_07.setCellValue("Status");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);

            ++vj;

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);

                CH_00.setCellValue(lst.get(vi).A3907TKT);
                CH_01.setCellValue(lst.get(vi).A3907FREGI);
                CH_02.setCellValue(lst.get(vi).A3907IATA);
                CH_03.setCellValue(lst.get(vi).A3907NOMAGENCY);
                CH_04.setCellValue(lst.get(vi).A3907PAIS);
                CH_05.setCellValue(lst.get(vi).A3907NUMER);
                CH_06.setCellValue(lst.get(vi).A3907FAUTO);
                String VL_A3907FLAG = "";
                switch (lst.get(vi).A3907FLAG) {
                    case "A":
                        VL_A3907FLAG = "ASSIGNED TO THE AUDITOR";
                        break;
                    case "Y":
                        VL_A3907FLAG = "PENDING";
                        break;
                    case "F":
                        VL_A3907FLAG = "AUTHORISED";
                        break;
                    case "R":
                        VL_A3907FLAG = "REJECTED";
                        break;
                    case "V":
                        VL_A3907FLAG = "VOID";
                        break;
                    case "B":
                        VL_A3907FLAG = "DOES NOT EXIST IN DB";
                        break;
                    case "C":
                        VL_A3907FLAG = "NO REJECT CODE";
                        break;
                    case "D":
                        VL_A3907FLAG = "OTHER REJECTION CODE";
                        break;
                    case "J":
                        VL_A3907FLAG = "ASSIGNED FOR THE EXECUTION OF THE ROBOT";
                        break;
                    case "G":
                        VL_A3907FLAG = "PREVIOUS AUTHORISED";
                        break;
                }
                CH_07.setCellValue(VL_A3907FLAG);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);

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

            String fileNameDownload = String.format("LoadticketReportForm - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A3907Filter filter = new A3907Filter();
        ArrayList<A3907Filter> lstGeneral = new ArrayList<A3907Filter>(0);
        A3907Filter fileA3907;
        String result = "";
        int i = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            logic = new LoadticketReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            //Creates a workbook object from the uploaded excelfile
            // HSSFWorkbook workbook = new HSSFWorkbook(excelfile.getInputStream());
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA3907 = new A3907Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {
                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA3907.IN_TICKET = getCellValue(currentRow.getCell(0));
                        if (fileA3907.IN_TICKET.equals("")) {
                            result = "Ticket required";
                            break;
                        }
                        if (fileA3907.IN_TICKET.length() != 13) {
                            result = "THE Ticktet MUST BE 13 CHARACTERES  " + fileA3907.A3907TKT;
                            break;
                        }
                        fileA3907.IN_COUNTRY = getCellValue(currentRow.getCell(1));
                        if (fileA3907.IN_COUNTRY.equals("")) {
                            result = "Coutry required";
                            break;
                        }
                        if (fileA3907.IN_COUNTRY.length() != 2) {
                            result = "THE Country MUST BE 2 CHARACTERES  " + fileA3907.A3907TKT;
                            break;
                        }
                        fileA3907.IN_IATA = getCellValue(currentRow.getCell(2));
                        if (fileA3907.IN_IATA.equals("")) {
                            result = "IATA required";
                            break;
                        }
                        if (fileA3907.IN_IATA.length() != 8) {
                            result = "THE IATA MUST BE 8 CHARACTERES  " + fileA3907.A3907TKT;
                            break;
                        }

                        fileA3907.IN_NUMER = getCellValue(currentRow.getCell(3));
                        if (!getCellValue(currentRow.getCell(4)).equals("")) {
                            fileA3907.A3907NETO = Float.parseFloat(getCellValue(currentRow.getCell(4)));
                        } else {
                            fileA3907.A3907NETO = 0.00;
                        }

                        lstGeneral.add(fileA3907);

                    }
                }
            }
            if (result.equals("")) {
                result = logic.subirExcel(lstGeneral);
            }
            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    //cellValue = String.valueOf(cell.getCellFormula());
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }

    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        String strSesion = UUID.randomUUID().toString();
        ArrayList<A3907Filter> gridData = new ArrayList<A3907Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3907Filter data = new A3907Filter();
                data.A3907TKT = gsonObj.get("A3907TKT").getAsString();
                data.A3907CORRL = gsonObj.get("A3907CORRL").getAsString();
                gridData.add(data);

            }
            logic = new LoadticketReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.mantenimiento(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "procedimiento")
    public @ResponseBody
    String procedimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        String strSesion = UUID.randomUUID().toString();
        ArrayList<A3907Filter> gridData = new ArrayList<A3907Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new LoadticketReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.procedimiento();

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
}
