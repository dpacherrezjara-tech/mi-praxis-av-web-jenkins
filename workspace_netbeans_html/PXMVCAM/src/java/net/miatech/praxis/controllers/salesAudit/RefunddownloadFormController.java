/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.SQP00957Filter;
import net.miatech.beans.SaleAudit.SQP01064Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.RefunddirectsaleFormLogic;
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
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/RefunddownloadForm")
public class RefunddownloadFormController extends BaseController{
    private static final Logger logError = Logger.getLogger("errorLog");
    private RefunddirectsaleFormLogic logic;
    
    @RequestMapping(value = "searchRefund")
    public @ResponseBody
    String searchRefund(ModelMap map, HttpServletRequest request) {
        SQP00957Filter filter = new SQP00957Filter();
        try {

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP01064Filter> lst_search = logic.searchRefund(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "/getXLSXRFNDSale")
    public @ResponseBody
    void getXLSXRFNDSale(HttpServletRequest request, HttpServletResponse response) {
        SQP00957Filter filter = new SQP00957Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP01064Filter> listaData = logic.searchRefund(filter);
            String vl_tipo = "";
            if (filter.VP_OPCION.equals("1")) {
                vl_tipo = "SALE";
            } else {
                vl_tipo = "EXCH";
            }

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ProQueryRfnd_" + vl_tipo);
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

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23,
                    CH_24, CH_25, CH_26, CH_27, CH_28, CH_29, CH_30, CH_31, CH_32, CH_33, CH_34, CH_35, CH_36,
                    CH_37, CH_38;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);
            CH_21 = row.createCell(21);
            CH_22 = row.createCell(22);
            CH_23 = row.createCell(23);
            CH_24 = row.createCell(24);
            CH_25 = row.createCell(25);
            CH_26 = row.createCell(26);
            CH_27 = row.createCell(27);
            CH_28 = row.createCell(28);
            CH_29 = row.createCell(29);
            CH_30 = row.createCell(30);
            CH_31 = row.createCell(31);
            CH_32 = row.createCell(32);
            CH_33 = row.createCell(33);
            CH_34 = row.createCell(34);
            CH_35 = row.createCell(35);
            CH_36 = row.createCell(36);
            CH_37 = row.createCell(37);
            CH_38 = row.createCell(38);

            CH_00.setCellValue("CCUST");
            CH_01.setCellValue("TRNC");
            CH_02.setCellValue("SRC");
            CH_03.setCellValue("CHNL");
            CH_04.setCellValue("AGENT");
            CH_05.setCellValue("NAME AGENT");
            CH_06.setCellValue("CITY");
            CH_07.setCellValue("FPROC");
            CH_08.setCellValue("PAX");
            CH_09.setCellValue("DCHEQ");
            CH_10.setCellValue("CIA");
            CH_11.setCellValue("FORM");
            CH_12.setCellValue("SERIAL");
            CH_13.setCellValue("CPN1");
            CH_14.setCellValue("CPN2");
            CH_15.setCellValue("CPN3");
            CH_16.setCellValue("CPN4");
            CH_17.setCellValue("SALE SRC");
            CH_18.setCellValue("SALE CHNL");
            CH_19.setCellValue("SALE AGENT");
            CH_20.setCellValue("SALE NAGENT");
            CH_21.setCellValue("SALE DATE");
            CH_22.setCellValue("SALE TKT");
            CH_23.setCellValue("SALE COUNTRY");
            CH_24.setCellValue("NLOTE");
            CH_25.setCellValue("MDA");
            CH_26.setCellValue("TDOC");
            CH_27.setCellValue("COMMIS");
            CH_28.setCellValue("COM1");
            CH_29.setCellValue("COM2");
            CH_30.setCellValue("COM3");
            CH_31.setCellValue("COM4");
            CH_32.setCellValue("TOCA 1");
            CH_33.setCellValue("TOCA 2");
            CH_34.setCellValue("TOCA 3");
            CH_35.setCellValue("TOCA 4");
            CH_36.setCellValue("CHARGE");
            CH_37.setCellValue("IVA");
            CH_38.setCellValue("NETO");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 30));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 31, 31));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 32, 32));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 33));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 34, 34));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 35, 35));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 36, 36));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 37));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 38, 38));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);
            CH_21.setCellStyle(headerStyle);
            CH_22.setCellStyle(headerStyle);
            CH_23.setCellStyle(headerStyle);
            CH_24.setCellStyle(headerStyle);
            CH_25.setCellStyle(headerStyle);
            CH_26.setCellStyle(headerStyle);
            CH_27.setCellStyle(headerStyle);
            CH_28.setCellStyle(headerStyle);
            CH_29.setCellStyle(headerStyle);
            CH_30.setCellStyle(headerStyle);
            CH_31.setCellStyle(headerStyle);
            CH_32.setCellStyle(headerStyle);
            CH_33.setCellStyle(headerStyle);
            CH_34.setCellStyle(headerStyle);
            CH_35.setCellStyle(headerStyle);
            CH_36.setCellStyle(headerStyle);
            CH_37.setCellStyle(headerStyle);
            CH_38.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);
                CH_21 = row.createCell(21);
                CH_22 = row.createCell(22);
                CH_23 = row.createCell(23);
                CH_24 = row.createCell(24);
                CH_25 = row.createCell(25);
                CH_26 = row.createCell(26);
                CH_27 = row.createCell(27);
                CH_28 = row.createCell(28);
                CH_29 = row.createCell(29);
                CH_30 = row.createCell(30);
                CH_31 = row.createCell(31);
                CH_32 = row.createCell(32);
                CH_33 = row.createCell(33);
                CH_34 = row.createCell(34);
                CH_35 = row.createCell(35);
                CH_36 = row.createCell(36);
                CH_37 = row.createCell(37);
                CH_38 = row.createCell(38);

                CH_00.setCellValue(listaData.get(vi).A720AIRLIN);
                CH_01.setCellValue(listaData.get(vi).A720TRNCU);
                CH_02.setCellValue(listaData.get(vi).FUENT);
                CH_03.setCellValue(listaData.get(vi).SUBFU);
                CH_04.setCellValue(listaData.get(vi).A720AGENTE);
                CH_05.setCellValue(listaData.get(vi).NAGENTE);
                CH_06.setCellValue(listaData.get(vi).A720CIUVTA);
                CH_07.setCellValue(listaData.get(vi).FPROC);
                CH_08.setCellValue(listaData.get(vi).A720PAX);
                CH_09.setCellValue(listaData.get(vi).A720DCHEQ);
                CH_10.setCellValue(listaData.get(vi).A720CIA);
                CH_11.setCellValue(listaData.get(vi).A720FORMA);
                CH_12.setCellValue(listaData.get(vi).A720SERIE);
                CH_13.setCellValue(listaData.get(vi).CUPON1);
                CH_14.setCellValue(listaData.get(vi).CUPON2);
                CH_15.setCellValue(listaData.get(vi).CUPON3);
                CH_16.setCellValue(listaData.get(vi).CUPON4);
                CH_17.setCellValue(listaData.get(vi).FUENTVTA);
                CH_18.setCellValue(listaData.get(vi).SUBFUVTA);
                CH_19.setCellValue(listaData.get(vi).AGENTVTA);
                CH_20.setCellValue(listaData.get(vi).NAGENTVTA);
                CH_21.setCellValue(listaData.get(vi).A720FECVTA);
                CH_22.setCellValue(listaData.get(vi).A720TPTKT);
                CH_23.setCellValue(listaData.get(vi).A720PAIVTA);
                CH_24.setCellValue(listaData.get(vi).NLOTE);
                CH_25.setCellValue(listaData.get(vi).A720MDACM);
                CH_26.setCellValue(listaData.get(vi).A720TDOC);
                CH_27.setCellValue(listaData.get(vi).A720COMMIS);
                CH_28.setCellValue(listaData.get(vi).A720LRRCM1);
                CH_29.setCellValue(listaData.get(vi).A720LRRCM2);
                CH_30.setCellValue(listaData.get(vi).A720LRRCM3);
                CH_31.setCellValue(listaData.get(vi).A720LRRCM4);
                CH_32.setCellValue(listaData.get(vi).TOCA1);
                CH_33.setCellValue(listaData.get(vi).TOCA2);
                CH_34.setCellValue(listaData.get(vi).TOCA3);
                CH_35.setCellValue(listaData.get(vi).TOCA4);
                CH_36.setCellValue(listaData.get(vi).CARGO);
                CH_37.setCellValue(listaData.get(vi).IVA);
                CH_38.setCellValue(listaData.get(vi).NETO);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);
                CH_21.setCellStyle(bodyStyle);
                CH_22.setCellStyle(bodyStyle);
                CH_23.setCellStyle(bodyStyle);
                CH_24.setCellStyle(bodyStyle);
                CH_25.setCellStyle(bodyStyle);
                CH_26.setCellStyle(bodyStyle);
                CH_27.setCellStyle(bodyStyle);
                CH_28.setCellStyle(bodyStyle);
                CH_29.setCellStyle(bodyStyle);
                CH_30.setCellStyle(bodyStyle);
                CH_31.setCellStyle(bodyStyle);
                CH_32.setCellStyle(bodyStyle);
                CH_33.setCellStyle(bodyStyle);
                CH_34.setCellStyle(bodyStyle);
                CH_35.setCellStyle(bodyStyle);
                CH_36.setCellStyle(bodyStyle);
                CH_37.setCellStyle(bodyStyle);
                CH_38.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);
            sheet.autoSizeColumn(28, true);
            sheet.autoSizeColumn(29, true);
            sheet.autoSizeColumn(30, true);
            sheet.autoSizeColumn(31, true);
            sheet.autoSizeColumn(32, true);
            sheet.autoSizeColumn(33, true);
            sheet.autoSizeColumn(34, true);
            sheet.autoSizeColumn(35, true);
            sheet.autoSizeColumn(36, true);
            sheet.autoSizeColumn(37, true);
            sheet.autoSizeColumn(38, true);

            String fileNameDownload = "ProQueryRfnd_" + String.format(Functions.getFechaActual() + vl_tipo + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
    @RequestMapping(value = "ProcesarRefund")
    public @ResponseBody
    String ProcesarRefund(ModelMap map, HttpServletRequest request) {
        SQP00957Filter filter = new SQP00957Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new RefunddirectsaleFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP01064Filter> lst_search = logic.ProcesarRefund(filter);
            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
}
