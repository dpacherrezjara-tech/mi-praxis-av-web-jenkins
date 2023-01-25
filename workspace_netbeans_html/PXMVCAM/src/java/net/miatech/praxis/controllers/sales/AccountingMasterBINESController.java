/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1819Filter;
import net.miatech.beans.A1830Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.praxis.logic.sales.AccountingMasterBINESLogic;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
@RequestMapping("/AccountingMasterBINES")
public class AccountingMasterBINESController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingMasterBINESLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AccountingMasterBINES/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingMasterBINES : Controller-------------");
        map.put("success", true);
        List<A1830Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1830Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountingMasterBINESLogic();

        List<A1830Filter> lst = new ArrayList<>(0);
        A1830Filter filter = new A1830Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_CODIGO = request.getParameter("IN_CODIGO");
            filter.IN_BANCO = request.getParameter("IN_BANCO");
            filter.IN_NATURALEZA = request.getParameter("IN_NATURALEZA");
            filter.IN_MARCA = request.getParameter("IN_MARCA");

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));
            System.out.println(" IN_A025KEY : " + request.getParameter("dateFrom"));
            System.out.println("-------------------------------------------------- ");

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

            lst = logic.loadPX163S01A1830(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }
    
    @RequestMapping(value = "getBank")
    public @ResponseBody
    String getBank(ModelMap map, HttpServletRequest request) {       
        map.put("success", false);
        List<A1830Filter> lst ;
        try {
            logic = new AccountingMasterBINESLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadBank();

            map.put("success", true);
            map.put("data", lst);

        } catch (Exception ex) {
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }
     @RequestMapping(value = "getBank2")
    public @ResponseBody
    String getBank2(ModelMap map, HttpServletRequest request) {       
        map.put("success", false);
        List<A1830Filter> lst ;
        try {
            logic = new AccountingMasterBINESLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadBank2();

            map.put("success", true);
            map.put("data", lst);

        } catch (Exception ex) {
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("AccountingMasterBINES : getXLSX");

        String fileNameDownload = String.format("Accounting Master Bines- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1830Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("AccountingMasterBINES");

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
         

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Prefix");
            CH1_02.setCellValue("Bank");
            CH1_03.setCellValue("Product");
            CH1_04.setCellValue("Nature Code");
            CH1_05.setCellValue("Nature");
            CH1_06.setCellValue("Brand Code");
            CH1_07.setCellValue("Brand");
         

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
         

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
         

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A1830PREFI);
                rcell2.setCellValue(listaData.get(vi).A1830BANCO);
                rcell3.setCellValue(listaData.get(vi).A1830PRODU);
                rcell4.setCellValue(listaData.get(vi).A1830CODNA);
                rcell5.setCellValue(listaData.get(vi).A1830NATUR);
                rcell6.setCellValue(listaData.get(vi).A1830CODM);
                rcell7.setCellValue(listaData.get(vi).A1830MARCA);
          

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);
                rcell5.setCellStyle(bodyStyle);
                rcell6.setCellStyle(bodyStyle);
                rcell7.setCellStyle(bodyStyle);
            

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
//
    @RequestMapping(value = "mantenimiento")
    public @ResponseBody
    String mantenimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("AccountingMasterBINES : Mantenimiento");
        String msj = "";
        A1830Filter filter = new A1830Filter();

        try {
            logic = new AccountingMasterBINESLogic();
            logic.setSession(this.serverSession.getServerSession());

            String strOption = request.getParameter("strOption").toString().trim();
            filter.A1830CCUST = request.getParameter("A1830CCUST");
            filter.A1830PREFI = request.getParameter("A1830PREFI");
            filter.A1830PRODU = request.getParameter("A1830PRODU");
            filter.A1830CODMA = request.getParameter("A1830CODMA");
            filter.A1830CODM2 = request.getParameter("A1830CODM2");
            filter.A1830CODM3 = request.getParameter("A1830CODM3");
            filter.A1830CODM4 = request.getParameter("A1830CODM4");
            filter.A1830CODM5 = request.getParameter("A1830CODM5");
            filter.A1830CODM6 = request.getParameter("A1830CODM6");
            filter.A1830CODNA = request.getParameter("A1830CODNA");
            filter.A1830BANCO = request.getParameter("A1830BANCO");
            filter.A1830NATUR = request.getParameter("A1830NATUR");
            filter.A1830MARCA = request.getParameter("A1830MARCA");
            filter.A1830FINI = request.getParameter("A1830FINI");
            filter.A1830FFIN = request.getParameter("A1830FFIN");
            filter.IN_A1830PREFI_OLD = request.getParameter("IN_A1830PREFI_OLD");      

            
            
            msj = logic.salesAccountMaintanceBINES(filter, strOption);

        } catch (Exception e) {
            System.out.println("Excepcion : " + e.getMessage());
            logError.error(e.getMessage());
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("msg", msj);
        return new Gson().toJson(m);

    }

}
