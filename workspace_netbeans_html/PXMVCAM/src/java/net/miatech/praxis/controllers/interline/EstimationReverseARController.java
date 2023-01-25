package net.miatech.praxis.controllers.interline;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2111Filter;
import net.miatech.beans.A2136Filter;
import net.miatech.beans.PX032S01A1202Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.A1224Filter;
import net.miatech.praxis.logic.interline.EstimationReverseARLogic;
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

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/EstimationReverseAR")
public class EstimationReverseARController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private EstimationReverseARLogic logic;
    private MasterDAO masterDAO;
    private A2111Filter filter;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A2111Filter> listaData;
        filter = new A2111Filter();
        try {
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX257S01A2111(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    //NRO GRUPO
    @RequestMapping(value = "loadGrupo")
    public @ResponseBody
    String loadGrupo(ModelMap map, HttpServletRequest request) {
        try {
            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            List lstCuentas = logic.loadPX257S03A2111();

            map.put("success", true);
            map.put("lstGrupo", lstCuentas);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "listarCuentasA1740")
    public @ResponseBody
    String listarCuentasA1740(ModelMap map, HttpServletRequest request) {
        List<A1740Filter> listaData;
        try {
            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadCuentas();

            map.put("success", true);
            map.put("lstCuentas", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    //Listar Cuentas PRECONTA
    @RequestMapping(value = "loadCuentas")
    public @ResponseBody
    String loadCuentas(ModelMap map, HttpServletRequest request) {
        filter = new A2111Filter();
        try {
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            List lstCuentas = logic.loadPX257S01A2112(filter);

            map.put("success", true);
            map.put("lstCuentas", lstCuentas);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "CRUD")
    public @ResponseBody
    String CRUD(ModelMap map, HttpServletRequest request) {
        filter = new A2111Filter();
        try {
            String strOption = request.getParameter("strOption");
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.CRUDPX257S02A2111(filter, strOption);

            map.put("success", true);
            map.put("intResult", result);
            map.put("strOption", strOption);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "Estimados")
    public @ResponseBody
    String Estimados(ModelMap map, HttpServletRequest request) {
        A2111Filter objA2017 = new A2111Filter();
        try {
            String beanString = request.getParameter("beanString");

            A2111Filter[] filterTemp = new Gson().fromJson(beanString, A2111Filter[].class);
            List<A2111Filter> filters = new ArrayList<>(Arrays.asList(filterTemp));

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.Estimados(filters);

            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "resultadoDownload")
    public @ResponseBody
    String resultadoDownload(ModelMap map, HttpServletRequest request) {
        List<A2136Filter> listaData;
        try {
            String fill = request.getParameter("filter");

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadResultadoDownload(fill);

            map.put("success", true);
            map.put("lstDownload", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "Reversa")
    public @ResponseBody
    String Reversa(ModelMap map, HttpServletRequest request) {
        A2111Filter objA2017 = new A2111Filter();
        try {
            String beanString = request.getParameter("beanString");

            A2111Filter[] filterTemp = new Gson().fromJson(beanString, A2111Filter[].class);
            List<A2111Filter> filters = new ArrayList<>(Arrays.asList(filterTemp));

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());
            String result = logic.Reversa(filters);

            map.put("success", true);
            map.put("intResult", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            String beanString = request.getParameter("beanString");
            filter = new A2111Filter();
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new EstimationReverseARLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<A2111Filter> listaData = logic.loadPX257S01A2111(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);

            CH1_0.setCellValue("Nbr");
            CH1_1.setCellValue("Clearence Period");
            CH1_2.setCellValue("Source");
            CH1_3.setCellValue("Currency");
            CH1_4.setCellValue("Accounting Date");
            CH1_5.setCellValue("Group");
            CH1_6.setCellValue("Accounting ID");
            CH1_7.setCellValue("Status ");
            CH1_8.setCellValue("Rev/Est");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));

            ++vj;
             //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);

            CH2_1.setCellValue("Month");
            CH2_2.setCellValue("Period");
            CH2_3.setCellValue("");
            CH2_4.setCellValue("");
            CH2_5.setCellValue("");
            CH2_6.setCellValue("");
            CH2_7.setCellValue("");
            CH2_8.setCellValue("");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);

            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).A2111CLEAR);
                rcell2.setCellValue(listaData.get(vi).A2111PERIO);
                rcell3.setCellValue(listaData.get(vi).A2111FUENT);
                rcell4.setCellValue(listaData.get(vi).A2111MDA);
                rcell5.setCellValue(listaData.get(vi).A2111FCONT);
                rcell6.setCellValue(listaData.get(vi).A2111GRUPO);
                rcell7.setCellValue(listaData.get(vi).A2111IDFIL);
                rcell8.setCellValue(listaData.get(vi).A2111STATU);

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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(EstimationReverseARController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
