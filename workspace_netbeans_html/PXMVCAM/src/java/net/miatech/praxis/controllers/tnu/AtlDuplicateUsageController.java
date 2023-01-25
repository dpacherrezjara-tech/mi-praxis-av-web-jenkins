/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.tnu;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1547Filter;
import net.miatech.beans.SQP01299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ControlFiguresLogic;
import net.miatech.praxis.logic.tnu.AtlDuplicateUsageLogic;
import net.miatech.utils.Functions;
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
@RequestMapping("/AtlDuplicateUsage")
public class AtlDuplicateUsageController extends BaseController {
    AtlDuplicateUsageLogic logic;
    private HashMap RSP = new HashMap<String, String>();        
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map){
        return "tnu/AtlDuplicateUsage/AtlDuplicateUsage";
    }
    @RequestMapping(value = "search")
    public @ResponseBody
    String search(HttpServletRequest request) {
        logic = new AtlDuplicateUsageLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());        
        List<A1547Filter> oList = new ArrayList<A1547Filter>(0);
        A1547Filter filter = new A1547Filter();
        //filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());            
        int limit = Integer.parseInt(request.getParameter("limit").toString());
        int start = Integer.parseInt(request.getParameter("start").toString());                                
        filter.page.LIMIT = limit != 0 ? limit : 20;
        filter.page.START = start != 0 ? start : 0;
        filter.page.PAGE = Integer.parseInt(request.getParameter("page").toString());                
        try {                        
            filter.VP_OPCION = request.getParameter("IN_OPCION").toString().trim();                         
            filter.VP_TICKET = request.getParameter("IN_TICKET").toString().trim();                         
            filter.VP_TUSO = request.getParameter("IN_TUSO").toString().trim();                                     
            filter.VP_FECHA1 = request.getParameter("IN_DFLIGHT").toString().trim();                         
            filter.VP_FECHA2 = request.getParameter("IN_DFLIGHT2").toString().trim();                         
            filter.VP_NFLIGHT = request.getParameter("IN_NFLIGHT").toString().trim(); 
            //filter.VP_TYPEADJ = request.getParameter("IN_TYPEADJ").toString().trim(); 
            
            oList = logic.loadPX225S01A1547(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("total", oList.size() > 0 ? oList.get(0).page.TOTROWS : 0 );
        m.put("data", oList);
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "export_XLS")
    public @ResponseBody
    void DuplicateUsage_XLS(HttpServletRequest request, HttpServletResponse response) {
        
        logic = new AtlDuplicateUsageLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A1547Filter> oList = new  ArrayList<A1547Filter>(0);
        A1547Filter filter = new A1547Filter();       
        String fileName = "tmp";        
        try {                   
            filter.page.LIMIT = Integer.parseInt(request.getParameter("limit").toString());
            filter.page.START = Integer.parseInt(request.getParameter("start").toString());            
            filter.VP_OPCION = request.getParameter("IN_OPCION").toString().trim();                         
            filter.VP_TICKET = request.getParameter("IN_TICKET").toString().trim();                         
            filter.VP_TUSO = request.getParameter("IN_TUSO").toString().trim();                                     
            filter.VP_FECHA1 = request.getParameter("IN_DFLIGHT").toString().trim();                         
            filter.VP_FECHA2 = request.getParameter("IN_DFLIGHT2").toString().trim();                         
            filter.VP_NFLIGHT = request.getParameter("IN_NFLIGHT").toString().trim();
            
            oList = logic.loadPX225S01A1547(filter);            
            Workbook workbook;
            File file = File.createTempFile(fileName, ".xlsx");
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("DuplicateUsage");
            Iterator iter = oList.iterator();
            Integer vi = 0, vj = 0;
            
            Map<String, CellStyle> styles = createStyles(workbook);
            String styleName;
            
            styleName = "header";
            
            Row rowh = sheet.createRow(vj);
            Cell cell0h = rowh.createCell(0);
            cell0h.setCellValue("Nbr");
            cell0h.setCellStyle(styles.get(styleName));
            
            Cell cell15h = rowh.createCell(1);
            cell15h.setCellValue("Agent");
            cell15h.setCellStyle(styles.get(styleName));
            
            Cell cell16h = rowh.createCell(2);
            cell16h.setCellValue("Usage");
            cell16h.setCellStyle(styles.get(styleName));
            
            Cell cell1h = rowh.createCell(3);
            cell1h.setCellValue("Usage Date");    
            cell1h.setCellStyle(styles.get(styleName));
            
            Cell cellXh = rowh.createCell(4);
            cellXh.setCellValue("Ticket Number");   
            cellXh.setCellStyle(styles.get(styleName));
            
            Cell cell2h = rowh.createCell(5);
            cell2h.setCellValue("Coupon");  
            cell2h.setCellStyle(styles.get(styleName));
            
            Cell cell3h = rowh.createCell(6);
            cell3h.setCellValue("From");  
            cell3h.setCellStyle(styles.get(styleName));
            
            Cell cell4h = rowh.createCell(7);
            cell4h.setCellValue("To");   
            cell4h.setCellStyle(styles.get(styleName));
            
            Cell cell5h = rowh.createCell(8);
            cell5h.setCellValue("Flight"); 
            cell5h.setCellStyle(styles.get(styleName));
            
            Cell cell6h = rowh.createCell(9);
            cell6h.setCellValue("Carrier"); 
            cell6h.setCellStyle(styles.get(styleName));
            
            Cell cell7h = rowh.createCell(10);
            cell7h.setCellValue("Amount"); 
            cell7h.setCellStyle(styles.get(styleName));
            
            Cell cell8h = rowh.createCell(11);
            cell8h.setCellValue("Currency");
            cell8h.setCellStyle(styles.get(styleName));
            
            ++vj;
            while (iter.hasNext()) {
                Row row = sheet.createRow(vj);
                
                styleName = "cell_normal";
                Cell cel25 = row.createCell(0);                
                cel25.setCellValue(oList.get(vi).RN);
                cel25.setCellStyle(styles.get(styleName));
                
                Cell cel26 = row.createCell(1);                
                cel26.setCellValue(oList.get(vi).A1547AGTIA);
                cel26.setCellStyle(styles.get(styleName));
                
                Cell cel27 = row.createCell(2);                
                cel27.setCellValue(oList.get(vi).A1547TUSO);
                cel27.setCellStyle(styles.get(styleName));
                
                Cell cell0 = row.createCell(3);                
                cell0.setCellValue(oList.get(vi).A1547FUSO);                
                cell0.setCellStyle(styles.get(styleName));
                
                Cell cell1 = row.createCell(4);                
                cell1.setCellValue(oList.get(vi).A1547TICKT );                
                cell1.setCellStyle(styles.get(styleName));
                
                Cell cell2 = row.createCell(5);                
                cell2.setCellValue(oList.get(vi).A1547CUPON );                                
                cell2.setCellStyle(styles.get(styleName));
                
                Cell cell3 = row.createCell(6);                
                cell3.setCellValue(oList.get(vi).A1547ORIG );                
                cell3.setCellStyle(styles.get(styleName));
                
                Cell cell4 = row.createCell(7);                
                cell4.setCellValue(oList.get(vi).A1547DEST );
                cell4.setCellStyle(styles.get(styleName));
                
                Cell cell5 = row.createCell(8);                  
                cell5.setCellValue(oList.get(vi).A1547NVLO );
                cell5.setCellStyle(styles.get(styleName));
                        
                Cell cell9 = row.createCell(9);                
                cell9.setCellValue(oList.get(vi).A1547CARR );                
                cell9.setCellStyle(styles.get(styleName));
                
                styleName="cell_normal_formato_right";
                Cell cel20 = row.createCell(10);                
                cel20.setCellValue(oList.get(vi).A1547VCPUS );
                cel20.setCellStyle(styles.get(styleName));
                
                styleName = "cell_normal";
                Cell cel21 = row.createCell(11);                
                cel21.setCellValue(oList.get(vi).A1547MDARV );  
                cel21.setCellStyle(styles.get(styleName));
                
                iter.next();
                ++vi;
                ++vj;
            }
            
             //finally set column widths, the width is measured in units of 1/256th of a character width
            sheet.setColumnWidth(0, 7*256); //15 characters wide            
            for (int i = 1; i < 13; i++) {
                sheet.setColumnWidth(i, 15*256);  //18 characters wide
            }
            //sheet.setColumnWidth(17, 22*256); //24 characters wide
            
            /**
            * fileNameDownload = Nombre de descarga
            */
            String fileNameDownload = "DuplicateUsage.xlsx";
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
            
        } catch (Exception e) {
            throw new SpringException(e);
        }        
    }
    
    @RequestMapping(value = "downloadText")
    public @ResponseBody
    void downloadText(HttpServletRequest request, HttpServletResponse response) {
        
        logic = new AtlDuplicateUsageLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        List<A1547Filter> oList = new  ArrayList<A1547Filter>(0);
        A1547Filter filter = new A1547Filter();       
        String fileName;        
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();        
        Date date = new Date();
        
        try {                   
            filter.page.LIMIT = Integer.parseInt(request.getParameter("limit").toString());
            filter.page.START = Integer.parseInt(request.getParameter("start").toString());            
            filter.VP_OPCION = request.getParameter("IN_OPCION").toString().trim();                         
            filter.VP_TICKET = request.getParameter("IN_TICKET").toString().trim();                         
            filter.VP_TUSO = request.getParameter("IN_TUSO").toString().trim();                                     
            filter.VP_FECHA1 = request.getParameter("IN_DFLIGHT").toString().trim();                         
            filter.VP_FECHA2 = request.getParameter("IN_DFLIGHT2").toString().trim();                         
            filter.VP_NFLIGHT = request.getParameter("IN_NFLIGHT").toString().trim();            
            oList = logic.loadPX225S01A1547(filter);            
                       
            fileName = "tnu-usos-duplicados-"+date.getDay()+date.getMinutes()+date.getSeconds();
            String fileNameDownload = String.format(fileName + ".txt", UUID.randomUUID().toString().toLowerCase());
            
            StringBuilder line = new StringBuilder();
            String strTexto;
            String cadena;
            cadena = "Nbr|Agent|Usage|Usage Date|Ticket Number|Coupon||From|To|Flight|Carrier|Amount|Currency"+ "\r\n";            
            line.append(cadena.toString());            
            File file = File.createTempFile(rutaFile + "\\" + fileName, ".txt");
                        
            for (A1547Filter item : oList){            
                strTexto = "";
                strTexto += item.RN + "|";
                strTexto += item.A1547AGTIA + "|"; 
                strTexto += item.A1547TUSO + "|";
                strTexto += item.A1547FUSO + "|";
                strTexto += item.A1547TICKT + "|";
                strTexto += item.A1547CUPON + "|";
                strTexto += item.A1547ORIG + "|";
                strTexto += item.A1547DEST + "|";
                strTexto += item.A1547NVLO + "|";
                strTexto += item.A1547CARR + "|";
                strTexto += item.A1547VCPUS + "|";
                strTexto += item.A1547MDARV;
                strTexto += "\r\n";                
                line.append(strTexto.toString());
            }            
            //line.append(strTexto.toString());
            response.getOutputStream().print(line.toString());
            response.setContentType("text/plain");                        
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            response.getOutputStream().flush();
            response.getOutputStream().close();                      
            
        } catch (Exception e) {
            throw new SpringException(e);
        }        
    }
    

    
    /*
    @RequestMapping(value = "setExecuteADJ", method = RequestMethod.POST)
    public @ResponseBody
    String setExecuteADJ(HttpServletRequest request) {
        logic = new AtlDuplicateUsageLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        SQP01488Filter filter = new SQP01488Filter();
        SQP01488Filter objRtn;
        
        try {
          
            filter.VP_CCUST = request.getParameter("VP_CCUST").toString().trim();
            filter.VP_CIA = request.getParameter("VP_CIA").toString().trim();
            filter.VP_FORMA= request.getParameter("VP_FORMA").toString().trim();
            filter.VP_SERIE= request.getParameter("VP_SERIE").toString().trim();
            filter.VP_CUPON= request.getParameter("VP_CUPON").toString().trim();
            filter.VP_TIPO= request.getParameter("VP_TIPO").toString().trim();                                           
            objRtn = logic.setSQP01488Filter(filter);     
                       
        } catch (Exception e) {
            throw new SpringException(e);
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("sql_code", objRtn.dbException.SQLCODE );
        m.put("response", objRtn.dbException.MESSAGE );
        return new Gson().toJson(m);
    }
    */
    private static Map<String, CellStyle> createStyles(Workbook wb){
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
        font3.setFontHeightInPoints((short)14);
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
        style.setIndention((short)1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);
        
        Font monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short)12);
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
        monthFont1.setFontHeightInPoints((short)12);
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
    private static CellStyle createBorderedStyle(Workbook wb){
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
