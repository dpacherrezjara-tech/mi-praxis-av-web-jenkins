/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A2462Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A1790;
import net.miatech.praxis.logic.flown.AccountingCalendarLogic;
import net.miatech.praxis.logic.flown.AverageFareEMDLogic;
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

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingCalendar")
public class AccountingCalendarController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private AccountingCalendarLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/AccountingCalendar/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- AccountingCalendar : Controller-------------");
        map.put("success", true);
        List<A1790> lst = new ArrayList<>(0);
        A1790 filter = new A1790();
        A1790 beanActual = new A1790();
        filter.dateFrom = request.getParameter("dateFrom");
        filter.dateTo = request.getParameter("dateTo");

        try {

            logic = new AccountingCalendarLogic();
            logic.setSession(this.serverSession.getServerSession());

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println("-------------------------------------------------- ");

            lst = logic.loadPX090SQP0003(filter);

            for (int i = 0; i < lst.size(); i++) {
                if (((A1790) lst.get(i)).TPOREG.trim().equals("00")) {
                    beanActual = (A1790) lst.get(i);
                    lst.remove(i);
                    System.out.println("---> " + beanActual.DPERIOD);
                    break;
                }
            }
            map.put("perActual", beanActual);
            map.put("data", lst);
            System.out.println("-----------> Datos recuperados : " + lst.size());
        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Accounting Calendar  : getXLSX");

        List<A1790> lst = new ArrayList<>(0);
        A1790 filter = new A1790();
        filter.dateFrom = request.getParameter("dateFrom");
        filter.dateTo = request.getParameter("dateTo");

        String fileNameDownload = String.format("Accounting Calendar - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            logic = new AccountingCalendarLogic();
            logic.setSession(this.serverSession.getServerSession());

            System.out.println("----------------- Parametros --------------------- ");
            System.out.println(" dateFrom : " + request.getParameter("dateFrom"));
            System.out.println(" dateTo : " + request.getParameter("dateTo"));
            System.out.println("-------------------------------------------------- ");

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            lst = logic.loadPX090SQP0003(filter);
            System.out.println("Tamaño de lista devuelta : " + lst.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Accounting Calendar");

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
            Iterator iter = lst.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Accounting");
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Last Update");
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 4));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Period");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Status");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("User");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Date");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Time");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);

                rcell0.setCellValue(lst.get(vi).strFormatDate);
                rcell1.setCellValue(lst.get(vi).STATUS);
                rcell2.setCellValue(lst.get(vi).USUP);
                rcell3.setCellValue(lst.get(vi).FEUP);
                rcell4.setCellValue(lst.get(vi).HOUP);

                rcell0.setCellStyle(bodyStyle);
                rcell1.setCellStyle(bodyStyle);
                rcell2.setCellStyle(bodyStyle);
                rcell3.setCellStyle(bodyStyle);
                rcell4.setCellStyle(bodyStyle);

                iter.next();
                ++vi;
                ++vj;
            }
             sheet.autoSizeColumn(0, true);
             sheet.autoSizeColumn(1, true);
             sheet.autoSizeColumn(2, true);
             sheet.autoSizeColumn(3, true);
             sheet.autoSizeColumn(4, true);
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
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(AccountingCalendarController.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @RequestMapping(value = "cerrarFecha")
    public @ResponseBody
    String cerrarFecha(ModelMap map, HttpServletRequest request) throws Exception {
        //REALIZA EL CIERRE DE LA FECHA CONTABLE

        String msj = "";
        UserView user = this.serverSession.getServerSession().getUserView();
        A1790 filter = new A1790();
        A1790 beanActual = new A1790();

        try {

            logic = new AccountingCalendarLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter.dateFrom = request.getParameter("dateFrom");
            filter.dateTo = request.getParameter("dateTo");
            filter.TPOREG = request.getParameter("TPOREG");
            filter.DPERIOD = request.getParameter("DPERIOD");
            filter.LASTD = request.getParameter("LASTD");
            filter.STATUS = request.getParameter("STATUS");

            msj = logic.loadPX090SQP0004(filter, user);

            if (msj.contains("successful")) {
                List<A1790> lst;
                lst = logic.loadPX090SQP0003(filter);

                for (int i = 0; i < lst.size(); i++) {
                    if (((A1790) lst.get(i)).TPOREG.trim().equals("00")) {
                        beanActual = (A1790) lst.get(i);
                        lst.remove(i);
                        break;
                    }
                }

                map.put("perActual", beanActual);
                map.put("data", lst);

            }

        } catch (SQLException e) {
            msj = e.getMessage();

            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            logError.error(e.getMessage());
        }

        map.put("msj", msj);

        return new Gson().toJson(map);
    }

}
