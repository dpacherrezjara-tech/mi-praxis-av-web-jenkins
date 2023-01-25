/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP04000Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.DetalleSaldoLogic;
import net.miatech.utils.Functions;
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
import org.springframework.web.bind.annotation.ResponseBody;
/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/DetalleSaldo")
public class DetalleSaldoController extends BaseController {
    private DetalleSaldoLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04000Filter> listaData;
        SQP04000Filter filter;
        filter = new SQP04000Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {            
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            filter.VP_REFPG = request.getParameter("VP_REFPG");
            filter.VP_CTABC = request.getParameter("VP_CTABC");
            filter.VP_STSPG = request.getParameter("VP_STSPG");
            filter.VP_BOLETO = request.getParameter("VP_BOLETO");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 18;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new DetalleSaldoLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04000(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/DetSaldoDownloadExcel")
    public @ResponseBody
    void DetSaldoDownloadExcel(HttpServletRequest request, HttpServletResponse response) {
        
        SQP04000Filter filter;
        filter = new SQP04000Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;        
        try {            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());                        
            String fileName = "DetalleSaldos";            
            logic = new DetalleSaldoLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = -1;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1; 
            
            List<SQP04000Filter> lst = logic.getSQP04000(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(fileName);
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
            int len = lst.size();
            
            Integer vi = 0;
            Integer vj = 0;                        
            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61, cell62, cell63, cell64, cell65;
            Cell cell66, cell67, cell68, cell69, cell70;
            
            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);
            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
            cell59 = row.createCell(9);
            cell60 = row.createCell(10);
            cell61 = row.createCell(11);
            cell62 = row.createCell(12);
            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);
            cell67 = row.createCell(17);
            cell68 = row.createCell(18);
            cell69 = row.createCell(19);
            cell70 = row.createCell(20);
            
            cell50.setCellValue("BOLETO");
            cell51.setCellValue("PAX");
            cell52.setCellValue("PNR");
            cell53.setCellValue("FECHA EMISION");
            cell54.setCellValue("GRUPO");
            cell55.setCellValue("FECHA PROCESO");
            cell56.setCellValue("TARIFA");
            cell57.setCellValue("IVA");
            cell58.setCellValue("TUA");
            cell59.setCellValue("YR");
            cell60.setCellValue("OTR");
            cell61.setCellValue("TOTAL");
            cell62.setCellValue("PAGOS");
            cell63.setCellValue("SALDO");
            cell64.setCellValue("ID. CONTABLE VTA");
            cell65.setCellValue("PERIODO CONTABLE VTA");
            cell66.setCellValue("UUID");
            cell67.setCellValue("RFC");
            cell68.setCellValue("FECHA TIMBRADO");
            cell69.setCellValue("ID CLIENTE");
            cell70.setCellValue("CLIENTE");
            
            
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            cell59.setCellStyle(headerStyle);
            cell60.setCellStyle(headerStyle);
            cell61.setCellStyle(headerStyle);
            cell62.setCellStyle(headerStyle);
            cell63.setCellStyle(headerStyle);
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);
            cell67.setCellStyle(headerStyle);
            cell68.setCellStyle(headerStyle);
            cell69.setCellStyle(headerStyle);
            cell70.setCellStyle(headerStyle);

            ++vj;
            
            for (vi = 0; vi < len; vi++) {  
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);
                cell58 = row.createCell(8);
                cell59 = row.createCell(9);
                cell60 = row.createCell(10);
                cell61 = row.createCell(11);
                cell62 = row.createCell(12);
                cell63 = row.createCell(13);
                cell64 = row.createCell(14);
                cell65 = row.createCell(15);
                cell66 = row.createCell(16);
                cell67 = row.createCell(17);
                cell68 = row.createCell(18);
                cell69 = row.createCell(19);
                cell70 = row.createCell(20);
                
                //HashMap hm = (HashMap) listaData.get(vi);                
                cell50.setCellValue((String)lst.get(vi).A3958CIA + lst.get(vi).A3958FORMA + lst.get(vi).A3958SERIE );
                cell51.setCellValue((String)lst.get(vi).A3958PAX);
                cell52.setCellValue((String)lst.get(vi).A3958PNR);
                cell53.setCellValue((String)lst.get(vi).A3958FEVTA);
                cell54.setCellValue(lst.get(vi).A3958GRUPO ); 
                cell55.setCellValue(lst.get(vi).A3958FECPR );
                cell56.setCellValue(lst.get(vi).A3958FARE); //hm.get("A1720QTRRF")
                cell57.setCellValue(lst.get(vi).A3958IVA); //Double.parseDouble((String)hm.get("A1720VRFLC"))
                cell58.setCellValue(lst.get(vi).A3958TUA); //Double.parseDouble((String)hm.get("A1720VNTLC"))
                cell59.setCellValue(lst.get(vi).A3958YR); //Double.parseDouble((String)hm.get("A1720VSARV"))
                cell60.setCellValue(lst.get(vi).A3958OTR); //Double.parseDouble((String)hm.get("A1720VRFRV"))
                cell61.setCellValue(lst.get(vi).A3958TOT); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell62.setCellValue(lst.get(vi).A3958TOTAP); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell63.setCellValue(lst.get(vi).A3958SALDP); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell64.setCellValue(lst.get(vi).A3958IDCON); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell65.setCellValue(lst.get(vi).A3958FCONT); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell66.setCellValue(lst.get(vi).A3958CFDI); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell67.setCellValue(lst.get(vi).A3958RFC); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell68.setCellValue(lst.get(vi).A3958FECTB); //Double.parseDouble((String)hm.get("A1720VNTRV"))
                cell69.setCellValue(lst.get(vi).A3958CDCLI);
                cell70.setCellValue(lst.get(vi).A3953RSOCI);
                
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
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);
                cell68.setCellStyle(bodyStyle);
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                // </editor-fold>
                //iter.next();
                //++vi;                
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
            
            String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");            
            File file = File.createTempFile(fileNameDownload, ".xlsx");            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
    
}
