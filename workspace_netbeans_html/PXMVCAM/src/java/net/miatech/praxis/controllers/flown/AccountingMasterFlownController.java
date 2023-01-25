package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A1740;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AccountingMasterFlownLogic;
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
@RequestMapping("/AccountingMasterFlown")
public class AccountingMasterFlownController extends BaseController {
    
    AccountingMasterFlownLogic logic;
    A1740Filter objFilter;
    A1740 obj;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1740Filter> listaData;
        
        objFilter = new A1740Filter();
        objFilter.page.TOTROW = -1;
        objFilter.page.START = 0;
        objFilter.page.LIMIT = 0;
        
        try {
            objFilter.IN_A1740TITRA = request.getParameter("documentType");
            objFilter.IN_A1740TIPO = request.getParameter("ctaType");
            objFilter.IN_A1740CATEG = request.getParameter("category");
            
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            objFilter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            objFilter.page.PAGNUM = (start / objFilter.page.PAGROW) + 1;
            
            listaData = logic.setPX122S03A1740(objFilter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("error", e.getMessage());
        } catch (Exception e) {
            map.put("error", e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/Maintance")
    public @ResponseBody
    String Maintance(ModelMap map, HttpServletRequest request) {
        try {
            objFilter = new A1740Filter();
            
            objFilter.A1740TITRA = request.getParameter("A1740TITRA").trim();
            objFilter.A1740TIPO = request.getParameter("A1740TIPO").trim();
            objFilter.A1740INTNU = request.getParameter("A1740INTNU").trim();
            objFilter.A1740SUBTI = request.getParameter("A1740SUBTI").trim();
            objFilter.A1740CATEG = request.getParameter("A1740CATEG").trim();
            objFilter.A1740CIA = request.getParameter("A1740CIA").trim();
            objFilter.A1740UNIDA = request.getParameter("A1740UNIDA").trim();
            objFilter.A1740CECOS = request.getParameter("A1740CECOS").trim();
            objFilter.A1740UBICA = request.getParameter("A1740UBICA").trim();
            objFilter.A1740CTA = request.getParameter("A1740CTA").trim();
            objFilter.A1740SCTA = request.getParameter("A1740SCTA").trim();
            objFilter.A1740EQUI = request.getParameter("A1740EQUI").trim();
            objFilter.A1740ICIA = request.getParameter("A1740ICIA").trim();
            objFilter.A1740CLIE = request.getParameter("A1740CLIE").trim();
            objFilter.A1740FINI = request.getParameter("A1740FINI").trim();
            objFilter.A1740FFIN = request.getParameter("A1740FFIN").trim();
            objFilter.IN_A1740TITRA_OLD = request.getParameter("IN_A1740TITRA_OLD").trim();
            objFilter.IN_A1740TIPO_OLD = request.getParameter("IN_A1740TIPO_OLD").trim();
            objFilter.IN_A1740SUBTI_OLD = request.getParameter("IN_A1740SUBTI_OLD").trim();
            objFilter.IN_A1740CATEG_OLD = request.getParameter("IN_A1740CATEG_OLD");
            
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String result = logic.catalogueAccountMaintance(objFilter, request.getParameter("strOption").trim());
            
            map.put("success", true);
            map.put("intResult", result);

        } catch (SQLException ex) {
            System.out.println("-> " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadDocumentType")
    public @ResponseBody
    String loadDocumentType(ModelMap map, HttpServletRequest request) {
        List<A1740> listaData;
        map.put("success", false);
        try {
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setDocumentType();
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("error", e.getMessage());
        } catch (Exception e) {
            map.put("error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/loadAccountType")
    public @ResponseBody
    String loadAccountType(ModelMap map, HttpServletRequest request) {
        List<A1740Filter> listaData;
        map.put("success", false);
        try {
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setAccountType();//lstAccountType
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("error", e.getMessage());
        } catch (Exception e) {
            map.put("error", e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadCategory")
    public @ResponseBody
    String loadCategory(ModelMap map, HttpServletRequest request) {
        List<A1740> listaData;
        map.put("success", false);
        try {
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setCategory();
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("error", e.getMessage());
        } catch (Exception e) {
            map.put("error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A1740Filter> listaData;
        
        String fileNameDownload = String.format("Accounting Master Flown - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            objFilter = new A1740Filter();
            logic = new AccountingMasterFlownLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            objFilter.IN_A1740TITRA = request.getParameter("documentType");
            objFilter.IN_A1740TIPO = request.getParameter("ctaType");
            objFilter.IN_A1740CATEG = request.getParameter("category");

            listaData = logic.setPX122S03A1740(objFilter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Accounting Master Flown");
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
            CH1_00.setCellValue("Type");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Account Type");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Cta Type");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Sub Type");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Category");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Company");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Unit");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("C Cost");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Ubi");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Account");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Sub Account");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Equipment");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("Inter Company");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Country Location");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Client");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Effective");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 15));

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

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

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
                cell50.setCellValue(listaData.get(vi).A1740TITRA);
                cell51.setCellValue(listaData.get(vi).A1740TIPO);
                cell52.setCellValue(listaData.get(vi).A1740TIPODESC);
                cell53.setCellValue(listaData.get(vi).A1740SUBTI);
                cell54.setCellValue(listaData.get(vi).A1740CATEG);
                cell55.setCellValue(listaData.get(vi).A1740CIA);
                cell56.setCellValue(listaData.get(vi).A1740UNIDA);
                cell57.setCellValue(listaData.get(vi).A1740CECOS);
                cell58.setCellValue(listaData.get(vi).A1740UBICA);
                cell59.setCellValue(listaData.get(vi).A1740CTA);
                cell60.setCellValue(listaData.get(vi).A1740SCTA);
                cell61.setCellValue(listaData.get(vi).A1740EQUI);
                cell62.setCellValue(listaData.get(vi).A1740ICIA);
                cell63.setCellValue(listaData.get(vi).A1740INTNU);
                cell64.setCellValue(listaData.get(vi).A1740CLIE);
                cell65.setCellValue(listaData.get(vi).A1740FINI);

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
                
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(13, true);
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
