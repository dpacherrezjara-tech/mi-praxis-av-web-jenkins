/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.tnu;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX229S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.tnu.AtlByTransactionTypeLogic;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/AtlByTransactionType")
public class AtlByTransactionTypeController extends BaseController {

    AtlByTransactionTypeLogic logic;

    //private HashMap RSP = new HashMap<String, String>();
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "tnu/AtlByTransactionType/AtlByTransactionType";
    }
    
    @RequestMapping(value = "search")        
    public @ResponseBody
    String search(HttpServletRequest request) {
        logic = new AtlByTransactionTypeLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<PX229S01Filter> oList = new ArrayList<PX229S01Filter>(0);
        PX229S01Filter filter = new PX229S01Filter();
        //int limit = Integer.parseInt(request.getParameter("limit").toString());
        //int start = Integer.parseInt(request.getParameter("start").toString());                                
        //filter.page.LIMIT = limit != 0 ? limit : 20;
        //filter.page.START = start != 0 ? start : 0;
        //filter.page.PAGE = Integer.parseInt(request.getParameter("page").toString());                
        try {
            filter.IN_AÑO = Integer.parseInt(request.getParameter("VP_PERIODO").toString().trim());
            filter.IN_TRANSACCION = request.getParameter("VP_TRANSACCION").toString().trim();
            oList = logic.loadPX229S01(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("total", oList.size() > 0 ? oList.get(0).page.TOTROWS : 0);
        m.put("data", oList);
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "AtlByTrxType_excel")
    public @ResponseBody
    void AtlByTrxType_excel(HttpServletRequest request, HttpServletResponse response) {

        logic = new AtlByTransactionTypeLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<PX229S01Filter> oList = new ArrayList<PX229S01Filter>(0);
        PX229S01Filter filter = new PX229S01Filter();
        String fileName = "tmp";

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            //filter.IN_AÑO = Integer.parseInt(request.getParameter("VP_PERIODO").toString().trim());
            //filter.IN_TRANSACCION = "";
            oList = logic.loadPX229S01(filter);
            Workbook workbook;
            File file = File.createTempFile(fileName, ".xlsx");
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("AtlByTrxType_excel");
            Iterator iter = oList.iterator();
            Integer vi = 0, vj = 0;

            Map<String, CellStyle> styles = createStyles(workbook);
            String styleName;

            styleName = "header";
            Row rowh = sheet.createRow(vj);
            Cell cell0h = rowh.createCell(0);
            cell0h.setCellValue("Transaction");
            cell0h.setCellStyle(styles.get(styleName));

            Cell cell15h = rowh.createCell(1);
            cell15h.setCellValue("Type");
            cell15h.setCellStyle(styles.get(styleName));

            Cell cell16h = rowh.createCell(2);
            cell16h.setCellValue("Sub. Type");
            cell16h.setCellStyle(styles.get(styleName));

            Cell cell1h = rowh.createCell(3);
            cell1h.setCellValue("January");
            cell1h.setCellStyle(styles.get(styleName));

            Cell cellXh = rowh.createCell(4);
            cellXh.setCellValue("February");
            cellXh.setCellStyle(styles.get(styleName));

            Cell cell2h = rowh.createCell(5);
            cell2h.setCellValue("March");
            cell2h.setCellStyle(styles.get(styleName));

            Cell cell3h = rowh.createCell(6);
            cell3h.setCellValue("April");
            cell3h.setCellStyle(styles.get(styleName));

            Cell cell4h = rowh.createCell(7);
            cell4h.setCellValue("May");
            cell4h.setCellStyle(styles.get(styleName));

            Cell cell5h = rowh.createCell(8);
            cell5h.setCellValue("June");
            cell5h.setCellStyle(styles.get(styleName));

            Cell cell6h = rowh.createCell(9);
            cell6h.setCellValue("July");
            cell6h.setCellStyle(styles.get(styleName));

            Cell cell7h = rowh.createCell(10);
            cell7h.setCellValue("August");
            cell7h.setCellStyle(styles.get(styleName));

            Cell cell9h = rowh.createCell(11);
            cell9h.setCellValue("September");
            cell9h.setCellStyle(styles.get(styleName));

            Cell cell10h = rowh.createCell(12);
            cell10h.setCellValue("October");
            cell10h.setCellStyle(styles.get(styleName));

            Cell cell11h = rowh.createCell(13);
            cell11h.setCellValue("November");
            cell11h.setCellStyle(styles.get(styleName));

            Cell cell13h = rowh.createCell(14);
            cell13h.setCellValue("December");
            cell13h.setCellStyle(styles.get(styleName));

            Cell cell14h = rowh.createCell(15);
            cell14h.setCellValue("Total");
            cell14h.setCellStyle(styles.get(styleName));

            ++vj;
            while (iter.hasNext()) {
                Row row = sheet.createRow(vj);

                styleName = "cell_normal";
                Cell cel25 = row.createCell(0);
                cel25.setCellValue(oList.get(vi).A1889TRX01);
                cel25.setCellStyle(styles.get(styleName));

                Cell cel26 = row.createCell(1);
                cel26.setCellValue(oList.get(vi).A1889TRX02);
                cel26.setCellStyle(styles.get(styleName));

                Cell cel27 = row.createCell(2);
                cel27.setCellValue(oList.get(vi).A1889TRX03);
                cel26.setCellStyle(styles.get(styleName));

                styleName = "cell_normal_formato_right";
                Cell cell0 = row.createCell(3);
                cell0.setCellValue(oList.get(vi).A1889IMP01);
                cell0.setCellStyle(styles.get(styleName));

                Cell cell1 = row.createCell(4);
                cell1.setCellValue(oList.get(vi).A1889IMP02);
                cell1.setCellStyle(styles.get(styleName));

                Cell cell2 = row.createCell(5);
                cell2.setCellValue(oList.get(vi).A1889IMP03);
                cell2.setCellStyle(styles.get(styleName));

                Cell cell3 = row.createCell(6);
                cell3.setCellValue(oList.get(vi).A1889IMP04);
                cell3.setCellStyle(styles.get(styleName));

                Cell cell4 = row.createCell(7);
                cell4.setCellValue(oList.get(vi).A1889IMP05);
                cell4.setCellStyle(styles.get(styleName));

                Cell cell5 = row.createCell(8);
                cell5.setCellValue(oList.get(vi).A1889IMP06);
                cell5.setCellStyle(styles.get(styleName));

                Cell cell9 = row.createCell(9);
                cell9.setCellValue(oList.get(vi).A1889IMP07);
                cell9.setCellStyle(styles.get(styleName));

                Cell cel20 = row.createCell(10);
                cel20.setCellValue(oList.get(vi).A1889IMP08);
                cel20.setCellStyle(styles.get(styleName));

                Cell cel21 = row.createCell(11);
                cel21.setCellValue(oList.get(vi).A1889IMP09);
                cel21.setCellStyle(styles.get(styleName));

                Cell cel22 = row.createCell(12);
                cel22.setCellValue(oList.get(vi).A1889IMP10);
                cel22.setCellStyle(styles.get(styleName));

                Cell cel23 = row.createCell(13);
                cel23.setCellValue(oList.get(vi).A1889IMP11);
                cel23.setCellStyle(styles.get(styleName));

                Cell cel24 = row.createCell(14);
                cel24.setCellValue(oList.get(vi).A1889IMP12);
                cel24.setCellStyle(styles.get(styleName));

                styleName = "cell_totals_right";
                Cell cel28 = row.createCell(15);
                cel28.setCellValue(oList.get(vi).TOTAL);
                cel28.setCellStyle(styles.get(styleName));

                iter.next();
                ++vi;
                ++vj;
            }

            //finally set column widths, the width is measured in units of 1/256th of a character width
            sheet.setColumnWidth(0, 25 * 256); //30 characters wide
            sheet.setColumnWidth(1, 25 * 256); //30 characters wide
            sheet.setColumnWidth(2, 25 * 256); //30 characters wide
            for (int i = 3; i < 15; i++) {
                sheet.setColumnWidth(i, 22 * 256);  //18 characters wide
            }
            sheet.setColumnWidth(15, 25 * 256); //24 characters wide

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "AtlByTrxType_excel.xlsx";
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    private static Map<String, CellStyle> createStyles(Workbook wb) {
        Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
        DataFormat df = wb.createDataFormat();

        CellStyle style;
        Font headerFont = wb.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("header_date", style);

        Font font1 = wb.createFont();
        font1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font1);
        styles.put("cell_b", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font1);
        styles.put("cell_b_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_b_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_g", style);

        Font font2 = wb.createFont();
        font2.setColor(IndexedColors.BLUE.getIndex());
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font2);
        styles.put("cell_bb", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_bg", style);

        Font font3 = wb.createFont();
        font3.setFontHeightInPoints((short) 14);
        font3.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font3);
        style.setWrapText(true);
        styles.put("cell_h", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setWrapText(false);
        styles.put("cell_normal", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_normal_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(false);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_formato_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        //style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_normal_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setIndention((short) 1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);

        Font monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short) 12);
        monthFont.setColor(IndexedColors.WHITE.getIndex());
        monthFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont);
        styles.put("cell_totals_left", style);

        Font monthFont1 = wb.createFont();
        monthFont1.setFontHeightInPoints((short) 12);
        monthFont1.setColor(IndexedColors.WHITE.getIndex());
        monthFont1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont1);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_totals_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("0.00%"));
        styles.put("cell_porcentaje_right", style);

        return styles;
    }

    private static CellStyle createBorderedStyle(Workbook wb) {
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
}
