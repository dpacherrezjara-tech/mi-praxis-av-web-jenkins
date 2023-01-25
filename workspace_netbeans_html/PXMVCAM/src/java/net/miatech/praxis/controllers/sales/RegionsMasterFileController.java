package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.controllers.sales.*;
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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.praxis.A128;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.RegionsMasterFileLogic;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.persistence.facadeimpl.UserFacadeImpl;
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
@RequestMapping("/RegionsMasterFile")
public class RegionsMasterFileController extends BaseController {
    
    private RegionsMasterFileLogic logic;
    private PX023S01A128Filter filter;
    private A128 bn;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        filter = new PX023S01A128Filter();
        List<A128> listaData;
        filter.TOTROW = -1;
        filter.START = 0;
        filter.LIMIT = 0;
        try {
            filter.strOption = request.getParameter("strOption").trim();
            filter.strParam1 = request.getParameter("strParam1").trim();
            filter.strParam2 = request.getParameter("strParam2").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.PAGNUM = (start / filter.PAGROW) + 1;
            filter.intCurrentPg = filter.PAGNUM;
            
            logic = new RegionsMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadRegionMF(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).TOTROW : 0);
            map.put("data", listaData);
            
        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }   

        return new Gson().toJson(map);
    }
    
     @RequestMapping(value = "/maintanceRegionmf")
    public @ResponseBody
    String maintanceRegionmf(ModelMap map, HttpServletRequest request) {
        bn = new A128();
        String strOption;
        try {
            strOption = request.getParameter("strOption").trim();
            bn.A128TIPO = request.getParameter("A128TIPO").trim();
            bn.A128AREGIO = request.getParameter("A128AREGIO").trim();
            bn.A128PAIS = request.getParameter("A128PAIS").trim();
            bn.A128CIUDAD = request.getParameter("A128CIUDAD").trim();
            bn.A128TIPO_OLD = request.getParameter("A128TIPO_OLD").trim();
            bn.A128AREGIO_OLD = request.getParameter("A128AREGIO_OLD").trim();
            bn.A128PAIS_OLD = request.getParameter("A128PAIS_OLD").trim();
            bn.A128CIUDAD_OLD = request.getParameter("A128CIUDAD_OLD").trim();
            
            logic = new RegionsMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());            
            String result = logic.maintanceRegionMF(strOption, bn);
            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        filter = new PX023S01A128Filter();
        filter.strExcel="TRUE";
        
        List<A128> listaData;
        
        String fileNameDownload = String.format("Region Master File - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new RegionsMasterFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());

            filter.strOption = request.getParameter("strOption").trim();
            filter.strParam1 = request.getParameter("strParam1").trim();
            filter.strParam2 = request.getParameter("strParam2").trim();

            listaData = logic.loadRegionMF(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Region Master File");
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

            Cell CH1_00, CH1_01, CH1_02, CH1_03, CH1_04, CH1_05, CH1_06, CH1_07;
            CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Nbr");
            CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Type");
            CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Code");
            CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Name");
            CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Country Code");
            CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Country Name");
            CH1_06 = row.createCell(6);
            CH1_06.setCellValue("City Code");
            CH1_07 = row.createCell(7);
            CH1_07.setCellValue("City Name");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56, cell57;
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);

                cell50.setCellValue(listaData.get(vi).pos);
                cell51.setCellValue(listaData.get(vi).A128TIPO);
                cell52.setCellValue(listaData.get(vi).A128AREGIO);
                cell53.setCellValue(listaData.get(vi).NOMREGION);
                cell54.setCellValue(listaData.get(vi).A128PAIS);
                cell55.setCellValue(listaData.get(vi).NOMPAIS);
                cell56.setCellValue(listaData.get(vi).A128CIUDAD);
                cell57.setCellValue(listaData.get(vi).NOMCIUDAD);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(5, true);
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
