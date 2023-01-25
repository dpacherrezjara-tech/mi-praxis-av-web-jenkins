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
import net.miatech.beans.PX228S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.tnu.AtlSalesUseMonthlyBalanceLogic;
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
@RequestMapping("/AtlSalesUseMonthlyBalance")
public class AtlSalesUseMonthlyBalanceController extends BaseController {

    AtlSalesUseMonthlyBalanceLogic logic;
    private HashMap RSP = new HashMap<String, String>();

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "tnu/AtlSalesUseMonthlyBalance/AtlSalesUseMonthlyBalance";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(HttpServletRequest request) {
        logic = new AtlSalesUseMonthlyBalanceLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<PX228S01Filter> oList = new ArrayList<PX228S01Filter>(0);
        PX228S01Filter filter = new PX228S01Filter();
        //int limit = Integer.parseInt(request.getParameter("limit").toString());
        //int start = Integer.parseInt(request.getParameter("start").toString());                                
        //filter.page.LIMIT = limit != 0 ? limit : 20;
        //filter.page.START = start != 0 ? start : 0;
        //filter.page.PAGE = Integer.parseInt(request.getParameter("page").toString());                
        try {
            filter.IN_PER = request.getParameter("IN_PER").toString().trim();
            oList = logic.loadPX228S01A1890(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        HashMap m = new HashMap();
        m.put("success", true);
        //m.put("total", oList.size() > 0 ? oList.get(0).page.TOTROWS : 0);
        m.put("total", oList.size());
        m.put("data", oList);
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "AtlSalesUseMonthlyBalance_excel")
    public @ResponseBody
    void AtlSalesUseMonthlyBalance_excel(HttpServletRequest request, HttpServletResponse response) {

        logic = new AtlSalesUseMonthlyBalanceLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<PX228S01Filter> oList = new ArrayList<PX228S01Filter>(0);
        PX228S01Filter filter = new PX228S01Filter();
        String fileName = "tmp";
        try {            
            //filter.IN_PER = request.getParameter("IN_PER").toString().trim();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
            oList = logic.loadPX228S01A1890(filter);
            Workbook workbook;
            File file = File.createTempFile(fileName, ".xlsx");
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SalesUseMonthlyPercentajeBalance");
            Iterator iter = oList.iterator();
            Integer vi = 0, vj = 0;

            Map<String, CellStyle> styles = createStyles(workbook);
            String styleName;

            styleName = "header";
            Row rowh = sheet.createRow(vj);
            Cell cell0h = rowh.createCell(0);
            cell0h.setCellValue("Month");
            cell0h.setCellStyle(styles.get(styleName));

            Cell cell15h = rowh.createCell(1);
            cell15h.setCellValue("Sales");
            cell15h.setCellStyle(styles.get(styleName));

            Cell cell16h = rowh.createCell(2);
            cell16h.setCellValue("Last");
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
            cell14h.setCellValue("After");
            cell14h.setCellStyle(styles.get(styleName));

            Cell cell17h = rowh.createCell(16);
            cell17h.setCellValue("Balance");
            cell17h.setCellStyle(styles.get(styleName));
            
            // Para TOTAL
            double t_SALE = 0.00;
            double t_LAST = 0.00;
            double t_ENE  = 0.00;
            double t_FEB  = 0.00;
            double t_MAR  = 0.00;
            double t_ABR  = 0.00;
            double t_MAY  = 0.00;
            double t_JUN  = 0.00;
            double t_JUL = 0.00;
            double t_AGO  = 0.00;
            double t_SET  = 0.00;
            double t_OCT  = 0.00;
            double t_NOV  = 0.00;
            double t_DIC  = 0.00;
            double t_POST = 0.00;
            double t_SALDO = 0.00;
            
            ++vj;
            while (iter.hasNext()) {
                Row row = sheet.createRow(vj);
                
                if( !"%".equals(oList.get(vi).MES2)){
                    t_SALE = t_SALE + oList.get(vi).SALE;
                    t_LAST = t_LAST + oList.get(vi).LAST;
                    t_ENE = t_ENE + oList.get(vi).ENE;
                    t_FEB = t_FEB + oList.get(vi).FEB;
                    t_MAR = t_MAR + oList.get(vi).MAR;
                    t_ABR = t_ABR + oList.get(vi).ABR;
                    t_MAY = t_MAY + oList.get(vi).MAY;
                    t_JUN = t_JUN + oList.get(vi).JUN;
                    t_JUL = t_JUL + oList.get(vi).JUL;
                    t_AGO = t_AGO + oList.get(vi).AGO;
                    t_SET = t_SET + oList.get(vi).SET;
                    t_OCT = t_OCT + oList.get(vi).OCT;
                    t_NOV = t_NOV + oList.get(vi).NOV;
                    t_DIC = t_DIC + oList.get(vi).DIC;
                    t_POST= t_POST + oList.get(vi).POST;
                    t_SALDO= t_SALDO + oList.get(vi).SALDO;
                }
                
                styleName = "cell_normal";
                Cell cel25 = row.createCell(0);
                cel25.setCellValue(oList.get(vi).MES2);
                cel25.setCellStyle(styles.get(styleName));

                styleName = "cell_normal_formato_right";
                Cell cel26 = row.createCell(1);
                cel26.setCellValue(oList.get(vi).SALE);
                cel26.setCellStyle(styles.get(styleName));

                Cell cel27 = row.createCell(2);
                cel27.setCellValue(oList.get(vi).LAST);
                cel27.setCellStyle(styles.get(styleName));

                Cell cell0 = row.createCell(3);
                cell0.setCellValue(oList.get(vi).ENE);
                cell0.setCellStyle(styles.get(styleName));

                Cell cell1 = row.createCell(4);
                cell1.setCellValue(oList.get(vi).FEB);
                cell1.setCellStyle(styles.get(styleName));

                Cell cell2 = row.createCell(5);
                cell2.setCellValue(oList.get(vi).MAR);
                cell2.setCellStyle(styles.get(styleName));

                Cell cell3 = row.createCell(6);
                cell3.setCellValue(oList.get(vi).ABR);
                cell3.setCellStyle(styles.get(styleName));

                Cell cell4 = row.createCell(7);
                cell4.setCellValue(oList.get(vi).MAY);
                cell4.setCellStyle(styles.get(styleName));

                Cell cell5 = row.createCell(8);
                cell5.setCellValue(oList.get(vi).JUN);
                cell5.setCellStyle(styles.get(styleName));

                Cell cell9 = row.createCell(9);
                cell9.setCellValue(oList.get(vi).JUL);
                cell9.setCellStyle(styles.get(styleName));

                Cell cel20 = row.createCell(10);
                cel20.setCellValue(oList.get(vi).AGO);
                cel20.setCellStyle(styles.get(styleName));

                Cell cel21 = row.createCell(11);
                cel21.setCellValue(oList.get(vi).SET);
                cel21.setCellStyle(styles.get(styleName));

                Cell cel22 = row.createCell(12);
                cel22.setCellValue(oList.get(vi).OCT);
                cel22.setCellStyle(styles.get(styleName));

                Cell cel23 = row.createCell(13);
                cel23.setCellValue(oList.get(vi).NOV);
                cel23.setCellStyle(styles.get(styleName));

                Cell cel24 = row.createCell(14);
                cel24.setCellValue(oList.get(vi).DIC);
                cel24.setCellStyle(styles.get(styleName));

                Cell cel29 = row.createCell(15);
                cel29.setCellValue(oList.get(vi).POST);
                cel29.setCellStyle(styles.get(styleName));

                styleName = "cell_totals_right";
                Cell cel28 = row.createCell(16);
                cel28.setCellValue(oList.get(vi).SALDO);
                cel28.setCellStyle(styles.get(styleName));

                iter.next();
                ++vi;
                ++vj;
            }
            //totales                                
                Row rowt = sheet.createRow(vj);
                styleName = "cell_totals_right";                                
                Cell cell15h_t = rowt.createCell(1);
                cell15h_t.setCellValue( t_SALE );
                cell15h_t.setCellStyle(styles.get(styleName));
                
                Cell cell16h_t = rowt.createCell(2);
                cell16h_t.setCellValue( t_LAST );
                cell16h_t.setCellStyle(styles.get(styleName));
                
                Cell cell17h_t = rowt.createCell(3);
                cell17h_t.setCellValue( t_ENE );
                cell17h_t.setCellStyle(styles.get(styleName));
                
                Cell cell18h_t = rowt.createCell(4);
                cell18h_t.setCellValue( t_FEB );
                cell18h_t.setCellStyle(styles.get(styleName));
                
                Cell cell19h_t = rowt.createCell(5);
                cell19h_t.setCellValue( t_MAR );
                cell19h_t.setCellStyle(styles.get(styleName));
                
                Cell cell110h_t = rowt.createCell(6);
                cell110h_t.setCellValue( t_ABR );
                cell110h_t.setCellStyle(styles.get(styleName));
                
                Cell cell111h_t = rowt.createCell(7);
                cell111h_t.setCellValue( t_MAY );
                cell111h_t.setCellStyle(styles.get(styleName));
                
                Cell cell112h_t = rowt.createCell(8);
                cell112h_t.setCellValue( t_JUN );
                cell112h_t.setCellStyle(styles.get(styleName));
                
                Cell cell113h_t = rowt.createCell(9);
                cell113h_t.setCellValue( t_JUL );
                cell113h_t.setCellStyle(styles.get(styleName));
                
                Cell cell114h_t = rowt.createCell(10);
                cell114h_t.setCellValue( t_AGO );
                cell114h_t.setCellStyle(styles.get(styleName));
                
                Cell cell115h_t = rowt.createCell(11);
                cell115h_t.setCellValue( t_SET );
                cell115h_t.setCellStyle(styles.get(styleName));
                
                Cell cell116h_t = rowt.createCell(12);
                cell116h_t.setCellValue( t_OCT );
                cell116h_t.setCellStyle(styles.get(styleName));
                
                Cell cell117h_t = rowt.createCell(13);
                cell117h_t.setCellValue( t_NOV );
                cell117h_t.setCellStyle(styles.get(styleName));
                
                Cell cell118h_t = rowt.createCell(14);
                cell118h_t.setCellValue( t_DIC );
                cell118h_t.setCellStyle(styles.get(styleName));
                
                Cell cell119h_t = rowt.createCell(15);
                cell119h_t.setCellValue( t_POST );
                cell119h_t.setCellStyle(styles.get(styleName));
                
                Cell cell120h_t = rowt.createCell(16);
                cell120h_t.setCellValue( t_SALDO );
                cell120h_t.setCellStyle(styles.get(styleName));
                
            //finally set column widths, the width is measured in units of 1/256th of a character width
            sheet.setColumnWidth(0, 10 * 256); //15 characters wide            
            for (int i = 1; i < 17; i++) {
                sheet.setColumnWidth(i, 15 * 256);  //18 characters wide
            }
            sheet.setColumnWidth(17, 22 * 256); //24 characters wide

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "SalesUseMonthlyPercentajeBalance.xlsx";
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
