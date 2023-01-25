/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ConciliationASRController                         *
 * Created on : 20-09-2016, 18:43:58                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX031S02PXF050Filter;
import net.miatech.beans.PX031S03A1530Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PX108S03A1530Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.PXF053;
import net.miatech.utils.Functions;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConciliationASRLogic;
import net.miatech.praxis.logic.sales.ControlFiguresLogic;
import net.miatech.utils.Util;
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
 * @author rmayta
 */
@Controller
@Scope("request")
@RequestMapping("/ConciliationASR")
public class ConciliationASRController extends BaseController {
    private static final Logger logError = Logger.getLogger("errorLog");
    ConciliationASRLogic logic;
    @RequestMapping(value = "/loadPXF051")
    public @ResponseBody String LoadPXF051(ModelMap map, HttpServletRequest request){
        map.put("success", false);
        logic = new ConciliationASRLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        PXF051Filter filter = new PXF051Filter();
        List<PXF051Filter> lstPXF051;
        filter.filterType = request.getParameter("filterType").trim();
        //Fechas ======================================================
        filter.yearFrom = request.getParameter("yearFrom").trim();
        filter.monthFrom = request.getParameter("monthFrom").trim();
        filter.dayFrom = request.getParameter("dayFrom").trim();
        filter.yearTo = request.getParameter("yearTo").trim();
        filter.monthTo = request.getParameter("monthTo").trim();
        filter.dayTo = request.getParameter("dayTo").trim();

        filter.WKSTAT = request.getParameter("WKSTAT").trim();
        filter.PSTATE = request.getParameter("PSTATE").trim()==null?0:Integer.parseInt(request.getParameter("PSTATE").trim());
        filter.ST = request.getParameter("ST").trim();
        filter.SAMT = request.getParameter("SAMT").trim();
        try{
            lstPXF051 = logic.loadPXF051(filter);
            map.put("success", true);
        } catch (SQLException e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("data", lstPXF051);
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "/loadPX108S02PXF053")
    public @ResponseBody String LoadPX108S02PXF053(ModelMap map, HttpServletRequest request){
        map.put("success", false);
        logic = new ConciliationASRLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        PX108S02PXF053Filter filter = new PX108S02PXF053Filter();
        List<PX108S02PXF053Filter> lstPXF053;
        filter.IN_WKSTAT = request.getParameter("IN_WKSTAT")==null?"":request.getParameter("IN_WKSTAT");
        filter.IN_FREPOR_FROM = request.getParameter("IN_FREPOR_FROM");
        filter.IN_FREPOR_TO = request.getParameter("IN_FREPOR_TO");
        filter.IN_MDA = "";
        try{
            lstPXF053 = logic.loadPX108S02PXF053(filter);
            map.put("success", true);
        } catch (SQLException e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("data", lstPXF053);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/saveNewRecord")
    public @ResponseBody String saveNewRecord(ModelMap map, HttpServletRequest request){
        PXF051Filter filter = new PXF051Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.insertPXF051(filter);
            
            map.put("success", true);
        } catch(SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    @RequestMapping(value = "/loadPX031S03A1530")
    public @ResponseBody String LoadPX031S03A1530(ModelMap map, HttpServletRequest request){
        map.put("success", false);
        logic = new ConciliationASRLogic();
        logic.setSession((IServerSession) serverSession.getServerSession());
        PX031S03A1530Filter filter = new PX031S03A1530Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        List<PX031S03A1530Filter> listaData;
        filter.IN_TFILTER = request.getParameter("IN_TFILTER").length()>0?Integer.parseInt(request.getParameter("IN_TFILTER")):0;
        filter.IN_WKSTAT = request.getParameter("IN_WKSTAT");
        filter.IN_FPROCE = request.getParameter("IN_FPROCE");
        filter.IN_FREPOR = request.getParameter("IN_FREPOR");
        filter.IN_GROUP = request.getParameter("IN_GROUP");
        filter.IN_NROID = request.getParameter("IN_NROID").length()>0?Integer.parseInt(request.getParameter("IN_NROID")):0;

        int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
        int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
        filter.page.PAGROW = 20;
        start = (start != 0 ? start : 0);
        filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

        try{
            listaData = logic.loadPX031S03A1530(filter);
            map.put("success", true);
        } catch (SQLException e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("msg", e.getMessage());
            logError.error(e.getMessage());
            throw new SpringException(e);
        }
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadPX108S03A1530")
    public @ResponseBody String LoadPX108S03A1530(ModelMap map, HttpServletRequest request){
        PX108S03A1530Filter filter = new PX108S03A1530Filter();
        try{
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX108S03A1530Filter> lstA1530 = logic.loadPX108S03A1530(filter);
            
            map.put("success", true);
            map.put("data", lstA1530);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/setConciliacionASR")
    public @ResponseBody String SetConciliacionASR(ModelMap map, HttpServletRequest request){
        PXF053 filter = new PXF053();
        try{
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String strOption = request.getParameter("strOption");
            
            if (strOption.equals("U")) {
                logic = new ConciliationASRLogic();
                logic.setSession((IServerSession) serverSession.getServerSession());
                logic.loadSQP00275(filter);
                
                map.put("success", true);
                map.put("RTN", true);
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
    @RequestMapping(value = "/updateRecord")
    public @ResponseBody String UpdateRecord(ModelMap map, HttpServletRequest request){
        PXF051Filter filter = new PXF051Filter();
        try{
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.updatePXF051(filter);
            
            map.put("success", true);
            map.put("sql_code", 0);
            map.put("msg", "Record updated");
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "/getXLSX_ip_by_transaction")
    public @ResponseBody
    void getXLSX_ip_by_transaction(HttpServletRequest request, HttpServletResponse response){
        PXF051Filter filter = new PXF051Filter();
        List<PXF051Filter> listaData;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileNameDownload = String.format("Interact_VS_PRAXIS_By_Transaction_" + Functions.getFechaActual() +'_'+ Functions.getHoraActual()+ ".xlsx", UUID.randomUUID().toString().toLowerCase());
            
            
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPXF051(filter);
            String vSheet = "Interact_VS_PRAXIS_By_Transaction";
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(vSheet);
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
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61;
            Cell cell62, cell63, cell64, cell65, cell66;
            
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
//            cell62 = row.createCell(12);
//            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);

            cell50.setCellValue("Open Date");
            cell51.setCellValue("Interact");
            cell60.setCellValue("Total Transactions ");
            
            cell64.setCellValue("State");
            cell65.setCellValue("User");
            cell66.setCellValue("Date");
            
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 13));
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));

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
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
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
            //Interact
            cell51.setCellValue("seq");
            cell52.setCellValue("Station");
            cell53.setCellValue("Code");
            cell54.setCellValue("OP Date");
            cell55.setCellValue("OP Time");
            cell56.setCellValue("ST");
            cell57.setCellValue("CL Date");
            cell58.setCellValue("CL Time");
            cell59.setCellValue("Status Amount");
            //Total Transactions
            cell60.setCellValue("Interact");
            cell61.setCellValue("Voids");
            cell62.setCellValue("Praxis");
            cell63.setCellValue("Differences");

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

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
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
                                
                cell50.setCellValue(listaData.get(vi).FREPOR);                                
                cell51.setCellValue(listaData.get(vi).SEQ );                                
                cell52.setCellValue(listaData.get(vi).STATION );                                
                cell53.setCellValue(listaData.get(vi).CODE);                                
                cell54.setCellValue(listaData.get(vi).OPDT);                                
                cell55.setCellValue(listaData.get(vi).OPTM);                                
                cell56.setCellValue(listaData.get(vi).ST);                                
                cell57.setCellValue(listaData.get(vi).CLDT);
                cell58.setCellValue(listaData.get(vi).CLTM);
                cell59.setCellValue(listaData.get(vi).SAMT);
                cell60.setCellValue(listaData.get(vi).XTST);
                cell61.setCellValue(listaData.get(vi).VOIDS);
                cell62.setCellValue(listaData.get(vi).TTRANSP);
                cell63.setCellValue(listaData.get(vi).diffTransactions);
                cell64.setCellValue(listaData.get(vi).processState);
                cell65.setCellValue(listaData.get(vi).userLastModify);
                cell66.setCellValue(listaData.get(vi).dateLastModify);
                
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
            
            //String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
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
    
    
    @RequestMapping(value = "/getXLSX_ip_by_amount")
    public @ResponseBody
    void getXLSX_ip_by_amount(HttpServletRequest request, HttpServletResponse response){
        PX108S02PXF053Filter filter = new PX108S02PXF053Filter();
        List<PX108S02PXF053Filter> listaData;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileNameDownload = String.format("Interact_VS_PRAXIS_By_Amount_" + Functions.getFechaActual() +'_'+ Functions.getHoraActual()+ ".xlsx", UUID.randomUUID().toString().toLowerCase());
            
            
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX108S02PXF053(filter);
            String vSheet = "Interact_VS_PRAXIS_By_Amount";
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(vSheet);
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
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61;
            Cell cell62, cell63, cell64, cell65, cell66, cell67;
            
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
            
            //texto header
            cell50.setCellValue("Station");     //0
            cell51.setCellValue("Open Date");   //1
            cell52.setCellValue("Currency");    //2            
            cell53.setCellValue("Header");      //3 al 5
            cell56.setCellValue("Sale ");       //6 al 9
            cell60.setCellValue("Refund ");     //10 al 12
            cell63.setCellValue("Praxis ");     //13 al 16                        
            cell67.setCellValue("Status");      //17
            
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            //header
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 5));
            //sale
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 9));
            //refund
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));
            //Praxis
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 16));
            //state
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));

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

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
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
            //cell67 = row.createCell(17);
                        
            //header
            cell53.setCellValue("Date");
            cell54.setCellValue("Name");
            cell55.setCellValue("Status");
            //sale
            cell56.setCellValue("Cash");
            cell57.setCellValue("Credit");
            cell58.setCellValue("Exchange");
            cell59.setCellValue("T.Voucher");
            // REFUND
            cell60.setCellValue("Cash");
            cell61.setCellValue("Credit");            
            cell62.setCellValue("T.Voucher");            
            //praxis
            cell63.setCellValue("Cash");
            cell64.setCellValue("Credit");
            cell65.setCellValue("Exchange");
            cell66.setCellValue("T.Voucher");
            //cell67.setCellValue("Status");

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
            //cell67.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
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
                                               
                cell50.setCellValue(listaData.get(vi).WKSTAT);                                
                cell51.setCellValue(listaData.get(vi).FREPOR );                                
                cell52.setCellValue(listaData.get(vi).MDA );                                
                cell53.setCellValue(listaData.get(vi).HDTE);                                
                cell54.setCellValue(listaData.get(vi).HNAME);                                
                cell55.setCellValue(listaData.get(vi).HSTATUS);                                
                cell56.setCellValue(listaData.get(vi).SCASH);                                
                cell57.setCellValue(listaData.get(vi).SCREDIT);
                cell58.setCellValue(listaData.get(vi).TEXCHA);
                cell59.setCellValue(listaData.get(vi).TTVOUCHER);
                cell60.setCellValue(listaData.get(vi).RCASH);
                cell61.setCellValue(listaData.get(vi).RCREDIT);
                cell62.setCellValue(listaData.get(vi).RTVOUCHER);
                cell63.setCellValue(listaData.get(vi).A1530_A1720_CA_SUM);
                cell64.setCellValue(listaData.get(vi).A1530_A1720_CC_SUM);
                cell65.setCellValue(listaData.get(vi).A1530_A1720_EX_SUM);
                cell66.setCellValue(listaData.get(vi).A1530_A1720_TV_SUM);
                
                double intA1530_A1720_CA_SUM = (listaData.get(vi).SCASH) - (listaData.get(vi).RCASH);
                double intA1530_A1720_CC_SUM = (listaData.get(vi).SCREDIT) - (listaData.get(vi).RCREDIT);
                switch (listaData.get(vi).STATUS) {
                    case "A": listaData.get(vi).STATUS_RECORD = "MATCH";  break; //MATCH AUTOMATIC.
                    case "M": listaData.get(vi).STATUS_RECORD = "MATCH";  break; //MATCH MANUAL.
                    case "D": listaData.get(vi).STATUS_RECORD = "DIFF";   break; //DIFFERENCE.
                    case "": //CALCULATE.
                        if(
                              ( intA1530_A1720_CA_SUM - (listaData.get(vi).A1530_A1720_CA_SUM) == 0 ) && 
                              ( intA1530_A1720_CC_SUM - (listaData.get(vi).A1530_A1720_CC_SUM) == 0 )
                           ){
                            listaData.get(vi).STATUS_RECORD = "MATCH";
                        }else listaData.get(vi).STATUS_RECORD = "DIFF";                        
                        break;
                    default:
                        listaData.get(vi).STATUS_RECORD = listaData.get(vi).STATUS;
                }                
                cell67.setCellValue(listaData.get(vi).STATUS_RECORD );
                
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
            
            //String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
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
    
    
    @RequestMapping(value = "/getXLSX_pi")    
    public @ResponseBody
    void getXLSX_pi(HttpServletRequest request, HttpServletResponse response){
        PX031S03A1530Filter filter = new PX031S03A1530Filter();
        List<PX031S03A1530Filter> listaData;
        try {
                                    
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String fileNameDownload = String.format("BwrConcitiationASR " + Functions.getFechaActual() +'_'+ Functions.getHoraActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
                        
            logic = new ConciliationASRLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX031S03A1530(filter);
            String vSheet = "BwrConcitiationASR";
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(vSheet);
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
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61;
            Cell cell62, cell63, cell64, cell65, cell66, cell67, cell68;
            
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
            
            //texto header
            cell50.setCellValue("Station");     //0
            cell51.setCellValue("Open Date");   //1
            cell52.setCellValue("Currency");    //2            
            cell53.setCellValue("Group");       //3
            cell54.setCellValue("Header");      //4 al 6
            cell57.setCellValue("Sale ");       //7 al 10
            cell61.setCellValue("Refund ");     //11 al 13
            cell64.setCellValue("Praxis ");     //14 al 17                        
            cell68.setCellValue("Status");      //18
            
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            //header
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 6));
            //sale
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
            //refund
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 13));
            //Praxis
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            //state
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 18, 18));

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

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
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
                                    
            //header
            cell54.setCellValue("Date");
            cell55.setCellValue("Name");
            cell56.setCellValue("Status");
            //sale
            cell57.setCellValue("Cash");
            cell58.setCellValue("Credit");
            cell59.setCellValue("Exchange");
            cell60.setCellValue("T.Voucher");
            // REFUND
            cell61.setCellValue("Cash");
            cell62.setCellValue("Credit");            
            cell63.setCellValue("T.Voucher");            
            //praxis
            cell64.setCellValue("Cash");
            cell65.setCellValue("Credit");
            cell66.setCellValue("Exchange");
            cell67.setCellValue("T.Voucher");
            
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

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
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
                                               
                cell50.setCellValue(listaData.get(vi).A1530AGENT);                                
                cell51.setCellValue(listaData.get(vi).A1530FDESD );                                
                cell52.setCellValue(listaData.get(vi).A1530MDA );
                cell53.setCellValue(listaData.get(vi).A1530GRUPO );
                cell54.setCellValue(listaData.get(vi).HDTE);                                
                cell55.setCellValue(listaData.get(vi).HNAME);                                
                cell56.setCellValue(listaData.get(vi).HSTATUS);                                
                cell57.setCellValue(listaData.get(vi).SCASH);                                
                cell58.setCellValue(listaData.get(vi).SCREDIT);
                cell59.setCellValue(listaData.get(vi).TEXCHA);
                cell60.setCellValue(listaData.get(vi).TTVOUCHER);
                cell61.setCellValue(listaData.get(vi).RCASH);
                cell62.setCellValue(listaData.get(vi).RCREDIT);
                cell63.setCellValue(listaData.get(vi).RTVOUCHER);
                cell64.setCellValue(listaData.get(vi).A1530_A1720_CA_SUM);
                cell65.setCellValue(listaData.get(vi).A1530_A1720_CC_SUM);
                cell66.setCellValue(listaData.get(vi).A1530_A1720_EX_SUM);
                cell67.setCellValue(listaData.get(vi).A1530_A1720_TV_SUM);
                
                double intA1530_A1720_CA_SUM = (listaData.get(vi).SCASH) - (listaData.get(vi).RCASH);
                double intA1530_A1720_CC_SUM = (listaData.get(vi).SCREDIT) - (listaData.get(vi).RCREDIT);
                switch (listaData.get(vi).STATUS) {
                    case "A": listaData.get(vi).STATUS_RECORD = "MATCH";  break; //MATCH AUTOMATIC.
                    case "M": listaData.get(vi).STATUS_RECORD = "MATCH";  break; //MATCH MANUAL.
                    case "D": listaData.get(vi).STATUS_RECORD = "DIFF";   break; //DIFFERENCE.
                    case "": //CALCULATE.
                        if(
                              ( intA1530_A1720_CA_SUM - (listaData.get(vi).A1530_A1720_CA_SUM) == 0 ) && 
                              ( intA1530_A1720_CC_SUM - (listaData.get(vi).A1530_A1720_CC_SUM) == 0 )
                           ){
                            listaData.get(vi).STATUS_RECORD = "MATCH";
                        }else listaData.get(vi).STATUS_RECORD = "DIFF";                        
                        break;
                    default:
                        listaData.get(vi).STATUS_RECORD = listaData.get(vi).STATUS;
                }                
                cell68.setCellValue(listaData.get(vi).STATUS_RECORD );
                
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
            
            //String fileNameDownload = String.format(fileName + " - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());            
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