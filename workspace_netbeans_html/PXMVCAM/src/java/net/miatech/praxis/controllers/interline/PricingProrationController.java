package net.miatech.praxis.controllers.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A050Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.dao.LoadDataDAO;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.logic.LoadDataLogic;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
import net.miatech.praxis.spring.INF020;
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
@RequestMapping("/PricingProration")
public class PricingProrationController extends BaseController {

    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();

            UserView user = this.serverSession.getServerSession().getUserView();

            LoadDataLogic logic = new LoadDataLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1248> lstOperadores = logic.loadFieldsA1248(cliente.CCUST, "2", "", "");

            MasterDAO dao = new MasterDAO();
            dao.setSession(this.serverSession.getServerSession());
            List<A1852Filter> lstSource = dao.loadSource(user);

            map.put("success", true);
            map.put("lstOperTkt", lstOperadores);
            map.put("lstSource", lstSource);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            if (filter.TEST.equals("ISRGR")) {
                List<A050Filter> lstData = logic.loadPX216S02A050_ISR_GRUPO(filter, "1");
                map.put("success", true);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
                map.put("data", lstData);

            } else {
                //NORMAL
//                List<A050Filter> lstData = logic.loadPX216S01WRF071(filter);
                List<A050Filter> lstData = logic.loadPX216S02A050_ISR_GRUPO(filter, "");
                map.put("success", true);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
                map.put("data", lstData);

            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchGroup")
    public @ResponseBody
    String searchGroup(ModelMap map, HttpServletRequest request) {

        A050Filter filter = new A050Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            if (filter.TEST.equals("ISRGR")) {
                List<A050Filter> lstData = logic.loadPX216S03A050_ISR_TKT(filter);
                map.put("success", true);
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            } else {
                List<A050Filter> lstData = logic.loadPX216S02A050(filter);
                map.put("success", true);
                map.put("data", lstData);
                map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchISR")
    public @ResponseBody
    String searchISR(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            List<A050Filter> lstData = logic.loadPX216S02A050_ISR(filter);

            map.put("success", true);
            map.put("data", lstData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchISRUnMatch")
    public @ResponseBody
    String searchISRUnMatch(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            List<A050Filter> lstData = logic.loadPX216S02A050_ISR_UNMATCH(filter);

            map.put("success", true);
            map.put("data", lstData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchISRUM_Tkt")
    public @ResponseBody
    String searchISRUM_Tkt(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            List<A050Filter> lstData = logic.loadPX216S03A050_ISR_TKT_UM(filter);

            map.put("success", true);
            map.put("total", lstData.size() > 0 ? lstData.get(0).page.TOTROW : 0);
            map.put("data", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/validarGrupos")
    public @ResponseBody
    String ValidarGrupos(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            
            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            if (filter.TEST.equals("ISRGR")) {
                List<A050Filter> lstData = logic.loadPX216_ISR_VALIDATE_GROUPS(filter);
                map.put("success", true);
                map.put("data", lstData);
            } else {
                List<A050Filter> lstData = logic.loadPX216SQP01925(filter);
                map.put("success", true);
                map.put("data", lstData);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/CloseGroup")
    public @ResponseBody
    String CloseGroup(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        String msj = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            
            if (filter.TEST.equals("ISRGR")) {
                msj = logic.loadPX216_ISR_CLOSE_GROUP(filter);
                map.put("success", true);
                map.put("MSJ", msj);
            } else {
                msj = logic.loadPX216S03A050(filter);
                map.put("success", true);
                map.put("MSJ", msj);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/CloseRangeGroup")
    public @ResponseBody
    String CloseRangeGroup(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        List<A050Filter> lstData;
        String msj;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            
            if(filter.TEST.equals("ISRGR")){                
                //Se valida rango de grupos
                lstData = logic.loadPX216_ISR_VALIDATE_GROUPS(filter);
                if(!lstData.get(0).strDescripcion5.equals("")){
                    msj = lstData.get(0).strDescripcion5 + " Validate the range of Groups again" ; 
                }else{
                    //Cerramos rango de grupos
                    msj = logic.loadPX216_ISR_CLOSE_RANGE_GROUPS(filter);
                }
            }else{
                //Se valida rango de grupos
                lstData = logic.loadPX216SQP01925(filter);
                if (!lstData.get(0).strDescripcion5.equals("")) {
                    msj = lstData.get(0).strDescripcion5 + " Validate the range of Groups again";
                } else {
                    //Cerramos rango de grupos
                    msj = logic.loadPX216SQP01926(filter);
                }
            }

            map.put("success", true);
            map.put("MSJ", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/ValidarDayISR")
    public @ResponseBody
    String ValidarDayISR(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            String msj = logic.loadPX216_VALID_AFTER_CLOSE_DAY(filter);

            map.put("success", true);
            map.put("MSJ", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/CloseDayISR")
    public @ResponseBody
    String CloseDayISR(ModelMap map, HttpServletRequest request) {
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            String msj = logic.loadPX216_ISR_CLOSE_DAY(filter);

            map.put("success", true);
            map.put("MSJ", msj);
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
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            List<A050Filter> listaData;
            if (filter.TEST.equals("ISRGR")) {
                listaData = logic.loadPX216S02A050_ISR_GRUPO(filter, "1");
            } else {
//                NORMAL
                listaData = logic.loadPX216S02A050_ISR_GRUPO(filter, "");
            }

//            List<A050Filter> listaData = logic.loadPX216S02A050_ISR_GRUPO(filter, "");
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Pricing Proration");
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

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10;
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
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

            if (filter.TEST.equals("ISRGR")) {
                CH_00.setCellValue("Flight");
            } else {
//                NORMAL
                CH_00.setCellValue("Clearing");
            }
            CH_01.setCellValue("Airline");
            CH_02.setCellValue("Group");
            CH_03.setCellValue("Source");
            CH_04.setCellValue("Status");
            CH_05.setCellValue("Qty Cpn");
            CH_06.setCellValue("Gross");
            CH_07.setCellValue("Commision");
            CH_09.setCellValue("TAX");
            CH_10.setCellValue("Neto");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));

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

            ++vj;

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

            CH_00.setCellValue("Date");
            CH_02.setCellValue("Number");
            CH_07.setCellValue("ISC");
            CH_08.setCellValue("CSC");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));

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

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
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

                CH_00.setCellValue(listaData.get(vi).strFormatDate);
                CH_01.setCellValue(listaData.get(vi).A050AIRLI3);
                CH_02.setCellValue(listaData.get(vi).A050GRUPO);
                CH_03.setCellValue(listaData.get(vi).TUSO);
                CH_04.setCellValue(listaData.get(vi).strEstado);
                CH_05.setCellValue(listaData.get(vi).QCUPON);
                CH_06.setCellValue(listaData.get(vi).A050ACEPTA);
                CH_07.setCellValue(listaData.get(vi).A050COMISI);
                CH_08.setCellValue(listaData.get(vi).A050OVRAMT);
                CH_09.setCellValue(listaData.get(vi).A050TUA);
                CH_10.setCellValue(listaData.get(vi).A050NETO);

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

            String fileNameDownload = String.format("Pricing Proration - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "getXLSXGroup")
    public @ResponseBody
    void getXLSXGroup(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("--------------  getXLSXGroup ----------------");
        A050Filter filter = new A050Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadInterline02Logic logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            
            List<A050Filter> listaData;
            if (filter.TEST.equals("ISRGR")) {
                listaData = logic.loadPX216S03A050_ISR_TKT(filter);
            } else {
                listaData = logic.loadPX216S02A050(filter);
            }

//            List<A050Filter> listaData = logic.loadPX216S02A050(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Pricing Proration Group");
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

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10;
            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
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

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Flight");
            CH_02.setCellValue("Fare");
            CH_03.setCellValue("Sector");
            CH_04.setCellValue("Carrier");
            CH_05.setCellValue("Class");
            CH_06.setCellValue("Gross");
            CH_07.setCellValue("Commision");
            CH_09.setCellValue("Tax");
            CH_10.setCellValue("Neto");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));

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

            ++vj;

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

            CH_00.setCellValue("Number");
            CH_01.setCellValue("Date");
            CH_02.setCellValue("Basis");
            CH_07.setCellValue("ISC");
            CH_08.setCellValue("CSC");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));

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

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
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

                CH_00.setCellValue(listaData.get(vi).strTicket);
                CH_01.setCellValue(listaData.get(vi).strFormatDate1);
                CH_02.setCellValue(listaData.get(vi).A050BASE);
                CH_03.setCellValue(listaData.get(vi).strDescripcion);
                CH_04.setCellValue(listaData.get(vi).A050TRANSP);
                CH_05.setCellValue(listaData.get(vi).A050CLASE);
                CH_06.setCellValue(listaData.get(vi).A050ACEPTA);
                CH_07.setCellValue(listaData.get(vi).A050COMISI);
                CH_08.setCellValue(listaData.get(vi).A050OVRAMT);
                CH_09.setCellValue(listaData.get(vi).A050TUA);
                CH_10.setCellValue(listaData.get(vi).A050NETO);

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

            String fileNameDownload = String.format("Pricing Proration Group - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
