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
import net.miatech.beans.A1833Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.ZoneMasterFileLogic;
import net.miatech.praxis.logic.sales.AccountingMasterBINESLogic;
import net.miatech.praxis.logic.sales.AccountingMasterCCAMLogic;
import net.miatech.praxis.logic.sales.AccountingMasterTNULogic;
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
@RequestMapping("/AccountingMasterTNU")
public class AccountingMasterTNUController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingMasterTNULogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/AccountingMasterTNU/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingMasterTNU : Controller-------------");
        map.put("success", true);
        List<A1833Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<A1833Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new AccountingMasterTNULogic();

        List<A1833Filter> lst = new ArrayList<>(0);
        A1833Filter filter = new A1833Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_TIPO = request.getParameter("IN_CODIGO");
            filter.IN_A1833TDOC = request.getParameter("IN_A1833TDOC");
            filter.IN_A1833CODIV = request.getParameter("IN_A1833CODIV");                    
          

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" limit : " + request.getParameter("limit"));
            System.out.println(" start : " + request.getParameter("start"));            
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

            lst = logic.loadPX168S01A1833(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }
    
   

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("AccountingMasterBINES : getXLSX");

        String fileNameDownload = String.format("Accounting Master Bines- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1833Filter> listaData = this.getList(request, true);

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
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
         

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Doc Type");
            CH1_02.setCellValue("Concept");
            CH1_03.setCellValue("IVA Code");
            CH1_04.setCellValue("Rate Level");
            CH1_05.setCellValue("Begin Rate");
            CH1_06.setCellValue("End Rate");
            CH1_07.setCellValue("Begin Date");
            CH1_08.setCellValue("Enda Date");
            CH1_09.setCellValue("Description");
         

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
         

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A1833TDOC);
                rcell2.setCellValue(listaData.get(vi).A1833CONC);
                rcell3.setCellValue(listaData.get(vi).A1833CODIV);
                rcell4.setCellValue(listaData.get(vi).A1833SUBTI);
                rcell5.setCellValue(listaData.get(vi).A1833TASIN);
                rcell6.setCellValue(listaData.get(vi).A1833TASFI);
                rcell7.setCellValue(listaData.get(vi).A1833FINI);
                rcell8.setCellValue(listaData.get(vi).A1833FFIN);
                rcell9.setCellValue(listaData.get(vi).A1833DESCR);
          

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
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
         

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
        A1833Filter filter = new A1833Filter();

        try {
            logic = new AccountingMasterTNULogic();
            logic.setSession(this.serverSession.getServerSession());

            String strOption = request.getParameter("strOption").toString().trim();
      
                    
            filter.A1833CCUST = request.getParameter("A1833CCUST");
            filter.A1833CONC = request.getParameter("A1833CONC");
            filter.A1833SUBTI = Integer.parseInt(request.getParameter("A1833SUBTI"));
            filter.A1833TDOC = request.getParameter("A1833TDOC");
            filter.A1833CODIV = request.getParameter("A1833CODIV");
            filter.A1833TASIN = Double.parseDouble(request.getParameter("A1833TASIN"));
            filter.A1833TASFI = Double.parseDouble(request.getParameter("A1833TASFI"));
            filter.A1833DESCR = request.getParameter("A1833DESCR");
            filter.A1833FINI = request.getParameter("A1833FINI");
            filter.A1833FFIN = request.getParameter("A1833FFIN");
            filter.IN_A1833TDOC_OLD = request.getParameter("IN_A1833TDOC_OLD");
            filter.IN_A1833CONC_OLD = request.getParameter("IN_A1833CONC_OLD");
            filter.IN_A1833CODIV_OLD = request.getParameter("IN_A1833CODIV_OLD");
            filter.IN_A1833TASIN_OLD = request.getParameter("IN_A1833TASIN_OLD");
            filter.IN_A1833TASFI_OLD = request.getParameter("IN_A1833TASFI_OLD");
            filter.IN_A1833FINI_OLD = request.getParameter("IN_A1833FINI_OLD");      
            filter.IN_A1833FFIN_OLD = request.getParameter("IN_A1833FFIN_OLD");      

            
            msj = logic.salesAccountMaintanceTNU(filter, strOption);

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
