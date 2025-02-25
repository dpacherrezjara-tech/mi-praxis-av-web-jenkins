/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.CellType;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.payments.LoadSalesConciliationDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.LoadSalesConciliationLogic;
import net.miatech.praxis.logic.payments.SalesConciliationManualLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jsolano
 */
@Controller
@Scope("request")
@RequestMapping("/LoadSalesConciliation")
public class LoadSalesConciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadSalesConciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/LoadSalesConciliation/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadSalesConciliation : Search-------------");
        map.put("success", true);
        List<MPF106Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF106Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF106Filter> lst = new ArrayList<>(0);
        MPF106Filter filter = new MPF106Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new LoadSalesConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF106Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

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

            lst = logic.loadPX620SQP05106(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/loadExcelFile", method = RequestMethod.POST)
    public @ResponseBody
    String loadExcelFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Gson gson = new Gson();
        Integer cont = 0;
        A2290Filter objResult = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();
            String beanString = request.getParameter("beanString");
            
            filter = gson.fromJson(beanString, A2290Filter.class);
            byte[] dataFile = excelfile.getBytes();
            objResult = getExcelFile(dataFile, filter );

            map.put("success", true);
            map.put("objResult", objResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private A2290Filter getExcelFile(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new LoadSalesConciliationLogic();
        List<A2290Filter> lstDataIngreso = new ArrayList<>();
        List<A2290Filter> lstDataVenta = new ArrayList<>();
        List<A2290Filter> lstDataNotFound = new ArrayList<>();
        List<A2290Filter> lstData = new ArrayList<>();
        A2290Filter respt = new A2290Filter();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String ruta = "D:";
        double neto = 0;
//        boolean isDiff = false;
        String mensaje = "Hubo un error al actualizar los pagos", strHora = Functions.getHoraActual();
        String mensajePost = "";
        double montoTotal = 0;
        int i = 0;
        int qty = 0;
  
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "SalesDocumentLoad.xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            System.out.println(filter.IN_CONTAB);
            Row row0 = rowIterator.next();

            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();
                    if (row.getRowNum() > 0) {
                        A2290Filter obj = new A2290Filter();
                        
                        obj.SEQ = formatter.formatCellValue(row.getCell(0)) == null ? "" : formatter.formatCellValue(row.getCell(0)).trim();
                        obj.USERF = formatter.formatCellValue(row.getCell(1)) == null ? "" : formatter.formatCellValue(row.getCell(1)).trim();
                        obj.TYPETRAN = formatter.formatCellValue(row.getCell(2)) == null ? "" : formatter.formatCellValue(row.getCell(2)).trim();
                        obj.CCUST = formatter.formatCellValue(row.getCell(3)) == null ? "" : formatter.formatCellValue(row.getCell(3)).trim();
                        obj.TKT = formatter.formatCellValue(row.getCell(4)) == null ? "" : formatter.formatCellValue(row.getCell(4)).trim();
                        obj.CCIA = formatter.formatCellValue(row.getCell(3)) == null ? "" : formatter.formatCellValue(row.getCell(3)).trim();
                        
                        obj.FORMA = !obj.TKT.equals("") ? obj.TKT.substring(0, 4) : "";
                        obj.SERIE = !obj.TKT.equals("") ? obj.TKT.substring(obj.TKT.length() - 6) : "";
                        
                        obj.SDATE = formatter.formatCellValue(row.getCell(5)) == null ? "" : formatter.formatCellValue(row.getCell(5)).trim();
                        obj.SCARDN = formatter.formatCellValue(row.getCell(6)) == null ? "" : formatter.formatCellValue(row.getCell(6)).trim();
                        obj.SAUTHOC = formatter.formatCellValue(row.getCell(7)) == null ? "" : formatter.formatCellValue(row.getCell(7)).trim();
                        
                        obj.AMOUNT = formatter.formatCellValue(row.getCell(8)) == null ? "" : formatter.formatCellValue(row.getCell(8)).trim();
                        obj.SCURRENCY = formatter.formatCellValue(row.getCell(9)) == null ? "" : formatter.formatCellValue(row.getCell(9)).trim();
                        obj.STVAL = formatter.formatCellValue(row.getCell(10)) == null ? "" : formatter.formatCellValue(row.getCell(10)).trim();
                        obj.STVAL = "3";
                        obj.ACCNUMBER = formatter.formatCellValue(row.getCell(11)) == null ? "" : formatter.formatCellValue(row.getCell(11)).trim();
                        obj.CECO = formatter.formatCellValue(row.getCell(12)) == null ? "" : formatter.formatCellValue(row.getCell(12)).trim();
                        obj.CREJEC = formatter.formatCellValue(row.getCell(13)) == null ? "" : formatter.formatCellValue(row.getCell(13)).trim();
                        obj.FCONT = filter.IN_CONTAB.equals("true") ? Functions.getFechaActual() : "";
                        obj.STCON = filter.IN_CONTAB.equals("true") ? "1" : "";
                        System.out.println(i);
                        System.out.println(obj.AMOUNT);
                        if (obj.TYPETRAN.toLowerCase().contains("ingreso") ) {
                           obj.FCONCEP = "I";
                            while (obj.SAUTHOC.length() < 6) {
                                obj.SAUTHOC = "0" + obj.SAUTHOC;
                            }
//                            lstDataIngreso.add(obj);
                        }else if(obj.TYPETRAN.toLowerCase().contains("venta")){
                            obj.FCONCEP = "V";
//                            lstDataVenta.add(obj);
                        }else if (obj.TYPETRAN.toLowerCase().contains("debito")){
                            obj.FCONCEP = "D";
                        }else if (obj.TYPETRAN.toLowerCase().contains("ajuste")){
                            obj.FCONCEP = "A";
                        }else{
                            obj.FCONCEP = "N";
                            lstDataNotFound.add(obj);
                            System.out.println("Registros no reconocidos como ventas o ingresos");
                        }
                        
                        if(obj.SEQ.equals("") && obj.USERF.equals("") && obj.TYPETRAN.equals("") && obj.CCUST.equals("") 
                           && obj.AMOUNT.equals("") && obj.SCURRENCY.equals("") ){       
                            break;
                        }
                        if( obj.SEQ.contains("IF") || obj.SEQ.contains("(") || obj.SEQ.contains("(") ){
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        if( obj.AMOUNT.length() <= 3  ){
                            respt.MESSAGE = "Amount without #,00 format";
                            return respt;
                        }
                        qty++;
                        lstData.add(obj);
                    }
                }
                file.close();
            } catch (Exception e) {
                e.getMessage();
                if (e.getMessage().contains("String index out of range")) {
                    mensajePost = "";
                } else {
                    mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                }
            }

            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());
                
            respt = logic.SQPMPS076(lstData, user);
//            respt.MESSAGE = mensaje;
            
            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return respt;

    }

    @RequestMapping(value = "/loadExcelFilePWP", method = RequestMethod.POST)
    public @ResponseBody
    String loadExcelFilePWP(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Gson gson = new Gson();
        Integer cont = 0;
        A2290Filter objResult = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();
            String beanString = request.getParameter("beanString");
            
            filter = gson.fromJson(beanString, A2290Filter.class);
            byte[] dataFile = excelfile.getBytes();
            objResult = getExcelFilePWP(dataFile, filter );

            map.put("success", true);
            map.put("objResult", objResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private A2290Filter getExcelFilePWP(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new LoadSalesConciliationLogic();
        List<A2290Filter> lstDataIngreso = new ArrayList<>();
        List<A2290Filter> lstDataVenta = new ArrayList<>();
        List<A2290Filter> lstDataNotFound = new ArrayList<>();
        List<A2290Filter> lstData = new ArrayList<>();
        A2290Filter respt = new A2290Filter();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String ruta = "D:";
        double neto = 0;
//        boolean isDiff = false;
        String mensaje = "Hubo un error al actualizar los pagos", strHora = Functions.getHoraActual();
        String mensajePost = "";
        double montoTotal = 0;
        int i = 0;
        int j = 0;
        int qty = 0;
        int qtyPRUEBA = 0;
  
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "SalesDocumentLoad.xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(1);
            XSSFSheet sheet2 = worbook.getSheetAt(2);
            Iterator<Row> rowIterator = sheet.iterator();
            Iterator<Row> rowIterator2 = sheet2.iterator();
            System.out.println(filter.IN_CONTAB);
            Row row0 = rowIterator.next();
            Row row1 = rowIterator2.next();
            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();
                    if (row.getRowNum() > 0) {
                        A2290Filter obj = new A2290Filter();
                        qtyPRUEBA++;
                        if(qtyPRUEBA == 280){
                            System.out.println(qtyPRUEBA + "");
                        }
//                        obj.SEQ = formatter.formatCellValue(row.getCell(0)) == null ? "" : formatter.formatCellValue(row.getCell(0)).trim();
//                        obj.USERF = formatter.formatCellValue(row.getCell(1)) == null ? "" : formatter.formatCellValue(row.getCell(1)).trim();
                        try{
                            if( formatter.formatCellValue(row.getCell(40)).trim().equals("Conciliado") ){
                                System.out.println(""+ formatter.formatCellValue(row.getCell(40)).trim() );
                                continue;
                            }
                            obj.TYPETRAN = "V";
                            obj.CCUST = formatter.formatCellValue(row.getCell(3)) == null ? "" : formatter.formatCellValue(row.getCell(3)).trim().substring(0,3);
                            obj.TKT = formatter.formatCellValue(row.getCell(3)) == null || formatter.formatCellValue(row.getCell(3)).equals("") ? "" : formatter.formatCellValue(row.getCell(3)).trim();
                            obj.CCIA = formatter.formatCellValue(row.getCell(3)) == null || formatter.formatCellValue(row.getCell(3)).equals("") ? "" : formatter.formatCellValue(row.getCell(3)).trim().substring(0,3);
                            obj.FORMA = formatter.formatCellValue(row.getCell(3)) == null || formatter.formatCellValue(row.getCell(3)).equals("") ? "" : formatter.formatCellValue(row.getCell(3)).trim().substring(3,7);
                            obj.SERIE = formatter.formatCellValue(row.getCell(3)) == null || formatter.formatCellValue(row.getCell(3)).equals("") ? "" : formatter.formatCellValue(row.getCell(3)).trim().substring(7);
                            obj.SDATE = formatter.formatCellValue(row.getCell(0)) == null ? "" : formatter.formatCellValue(row.getCell(0)).trim().substring(4) + formatter.formatCellValue(row.getCell(0)).trim().substring(2,4) + formatter.formatCellValue(row.getCell(0)).trim().substring(0,2);
                            obj.SAGENT = formatter.formatCellValue(row.getCell(1)) == null ? "" : formatter.formatCellValue(row.getCell(1)).trim();
                            obj.SPNR= formatter.formatCellValue(row.getCell(2)) == null ? "" : formatter.formatCellValue(row.getCell(2)).trim();
                            obj.SCURRENCY= formatter.formatCellValue(row.getCell(6)) == null ? "" : formatter.formatCellValue(row.getCell(6)).trim();
                            obj.SCARDN= formatter.formatCellValue(row.getCell(12)) == null || formatter.formatCellValue(row.getCell(12)).equals("") ? "" : formatter.formatCellValue(row.getCell(12)).trim().substring(2) ;
                            obj.SAUTHOC= formatter.formatCellValue(row.getCell(13)) == null ? "" : formatter.formatCellValue(row.getCell(13)).trim();
                            while (obj.SAUTHOC.length() < 6) {
                                obj.SAUTHOC = "0" + obj.SAUTHOC;
                            }
                            obj.AMOUNT = formatter.formatCellValue(row.getCell(14)) == null || formatter.formatCellValue(row.getCell(14)).equals("") ? "0.00" : formatter.formatCellValue(row.getCell(14)).trim();
                            obj.AMOUNTV = formatter.formatCellValue(row.getCell(30)) == null || formatter.formatCellValue(row.getCell(30)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row.getCell(30)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.AMOUNTL = formatter.formatCellValue(row.getCell(31)) == null || formatter.formatCellValue(row.getCell(31)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row.getCell(31)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.VARIACIONP = formatter.formatCellValue(row.getCell(39)) == null || formatter.formatCellValue(row.getCell(39)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row.getCell(39)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.STVAL = "3";
                            obj.STVALU = "2";
    //                        obj.ACCNUMBER = formatter.formatCellValue(row.getCell(11)) == null ? "" : formatter.formatCellValue(row.getCell(11)).trim();
                            obj.CECO = formatter.formatCellValue(row.getCell(42)) == null ? "" : formatter.formatCellValue(row.getCell(42)).trim();
                            obj.CECO = obj.CECO.contains("CARGO A CECO") ? obj.CECO.split(" ")[3].substring(0,10) : "";
                            
                            System.out.println(qtyPRUEBA + "");

                            if(obj.CCUST.equals("") && obj.TKT.equals("") && obj.SAGENT.equals("") && obj.SCURRENCY.equals("") 
                               && obj.SCARDN.equals("") && obj.SAUTHOC.equals("") ){   
                                System.out.println(qtyPRUEBA + "SALTADO");
                                break;
                            }
                            if( obj.SEQ.contains("IF") || obj.SEQ.contains("(") || obj.SEQ.contains("(") ){
                                respt.MESSAGE = "The file contains formula";
                                return respt;
                            }
                            if( obj.AMOUNT.length() <= 3  ){
                                respt.MESSAGE = "Amount without #,00 format";
                                return respt;
                            }
                            qty++;
                            lstData.add(obj);
                        } catch (Exception e) {
                            e.getMessage();
                            if (e.getMessage().contains("String index out of range")) {
                                mensajePost = "";
                            } else {
                                mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                            }
                        }
                        
                    }
                }
                while (rowIterator2.hasNext()) {
                    j++;
                    Row row2 = rowIterator2.next();
                    if (row2.getRowNum() > 0) {
                        A2290Filter obj = new A2290Filter();
                        try{
                            if( formatter.formatCellValue(row2.getCell(17)).trim().equals("Conciliado") ){
                                System.out.println(""+ formatter.formatCellValue(row2.getCell(17)).trim() );
                                continue;
                            }
                            if( !formatter.formatCellValue(row2.getCell(18)).trim().equals("Realizar Acreditación") && !formatter.formatCellValue(row2.getCell(18)).trim().equals("Cargar a CECO") ){
                                System.out.println(""+ formatter.formatCellValue(row2.getCell(17)).trim() );
                                continue;
                            }
                            obj.TYPETRAN = "I";
                            obj.CCUST = "134";                            
//                            obj.SDATE = formatter.formatCellValue(row2.getCell(0)) == null ? "" : formatter.formatCellValue(row2.getCell(0)).trim().substring(4) + formatter.formatCellValue(row2.getCell(0)).trim().substring(2,4) + formatter.formatCellValue(row2.getCell(0)).trim().substring(0,2);
//                            obj.SAGENT = formatter.formatCellValue(row2.getCell(1)) == null ? "" : formatter.formatCellValue(row2.getCell(1)).trim();
                            obj.SPNR= formatter.formatCellValue(row2.getCell(6)) == null ? "" : formatter.formatCellValue(row2.getCell(6)).trim();
                            obj.SCURRENCY= formatter.formatCellValue(row2.getCell(3)) == null ? "" : formatter.formatCellValue(row2.getCell(3)).trim();
                            obj.SCARDN= formatter.formatCellValue(row2.getCell(1)) == null || formatter.formatCellValue(row2.getCell(1)).equals("") ? "" : formatter.formatCellValue(row2.getCell(1)).trim();
                            obj.SAUTHOC= formatter.formatCellValue(row2.getCell(4)) == null ? "" : formatter.formatCellValue(row2.getCell(4)).trim();
                            while (obj.SAUTHOC.length() < 6) {
                                obj.SAUTHOC = "0" + obj.SAUTHOC;
                            }
                            obj.AMOUNT = formatter.formatCellValue(row2.getCell(2)) == null || formatter.formatCellValue(row2.getCell(2)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row2.getCell(2)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.AMOUNTV = formatter.formatCellValue(row2.getCell(15)) == null || formatter.formatCellValue(row2.getCell(15)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row2.getCell(15)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.AMOUNTL = formatter.formatCellValue(row2.getCell(2)) == null || formatter.formatCellValue(row2.getCell(2)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row2.getCell(2)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.VARIACIONP = formatter.formatCellValue(row2.getCell(16)) == null || formatter.formatCellValue(row2.getCell(16)).equals("") ? "0.00" : formatAmount(formatter.formatCellValue(row2.getCell(16)).trim().replaceAll("[^\\d.,-]", ""));
                            obj.STVAL = "3";
                            obj.STVALU = "3";
    //                        obj.ACCNUMBER = formatter.formatCellValue(row.getCell(11)) == null ? "" : formatter.formatCellValue(row.getCell(11)).trim();
                            obj.CECO = formatter.formatCellValue(row2.getCell(19)) == null ? "" : formatter.formatCellValue(row2.getCell(19)).trim();
                            obj.CECO = obj.CECO.contains("CARGO A CECO") ? obj.CECO.split(" ")[3].substring(0,10) : "";
                            if( obj.SEQ.contains("IF") || obj.SEQ.contains("(") || obj.SEQ.contains("(") ){
                                respt.MESSAGE = "The file contains formula";
                                return respt;
                            }
                            if( obj.AMOUNT.length() <= 3  ){
                                respt.MESSAGE = "Amount without #,00 format";
                                return respt;
                            }
                            lstData.add(obj);
                        } catch (Exception e) {
                            e.getMessage();
                            if (e.getMessage().contains("String index out of range")) {
                                mensajePost = "";
                            } else {
                                mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                            }
                        }
                    }
                }
                
                file.close();
            } catch (Exception e) {
                e.getMessage();
                if (e.getMessage().contains("String index out of range")) {
                    mensajePost = "";
                } else {
                    mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                }
            }
            
            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());
            System.out.println(lstData +"");
            System.out.println(qty +"");
            System.out.println(qtyPRUEBA +"");
            respt = logic.SQP_INSERT_PO_MPF114(lstData, user);
//            respt.MESSAGE = mensaje;
            
            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return respt;

    }
    
    public String formatAmount(String amount) {

        if (amount.substring(amount.length() - 3).contains(",")) {
            amount = amount.replace(".", "").replace(",", ".");
        } else if (amount.substring(amount.length() - 3).contains(".")) {
            amount = amount.replace(",", "");
        } else {
            amount = amount;
        }

        return amount;
    }

    @RequestMapping(value = "/conciliationDebits", method = RequestMethod.POST)
    public @ResponseBody
    String conciliationDebits(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Integer cont = 0;
        String msjReponse = "";
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();
            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            byte[] dataFile = excelfile.getBytes();
            msjReponse = conciliationDebitsFilters(dataFile, filter);

            map.put("success", true);
            map.put("msjReponse", msjReponse);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private String conciliationDebitsFilters(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new LoadSalesConciliationLogic();
        List<A2290Filter> lstData = new ArrayList<>();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String ruta = "D:";
        double neto = 0;
        String mensaje = "Hubo un error al actualizar la conciliación", strHora = Functions.getHoraActual();
        String mensajePost = "";
        double montoTotal = 0;
        int i = 0;
   
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "DebitosDocument_Update.xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            Row row0 = rowIterator.next();
            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();
                    if (row.getRowNum() > 1) {
                        System.out.println(i);
                        A2290Filter obj = new A2290Filter();
                        if (row.getCell(0) == null) {
                            break;
                        }
                        Date date = row.getCell(0).getDateCellValue();
                        obj.ADATE = FechaInator(dateFormat.format(date).trim());
                        obj.SDATE = formatter.formatCellValue(row.getCell(1)).trim().replace("-", "");
                        obj.ACCNUMBER = formatter.formatCellValue(row.getCell(5)).trim();
                        obj.SAUTHOC = formatter.formatCellValue(row.getCell(9)).trim();
                        obj.SCARDN = formatter.formatCellValue(row.getCell(10)).trim().substring(0, 6) + "XXXXXX" + formatter.formatCellValue(row.getCell(10)).trim().substring(formatter.formatCellValue(row.getCell(10)).trim().length() - 4);
                        obj.SCARDNCOR = formatter.formatCellValue(row.getCell(10)).trim().substring(formatter.formatCellValue(row.getCell(10)).trim().length() - 4);
                        obj.TOTAL = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(11))));
                        obj.COMISION = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(13))));
                        obj.IVA = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(14))));
                        obj.RTEFUE = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(15))));
                        obj.RTEIVA = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(16))));
                        obj.RTEICA = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(17))));
                        obj.NETO = Double.parseDouble(formatAmount(formatter.formatCellValue(row.getCell(18))));
                        obj.SEQ = "";
                        obj.NEGOC = "1";
                        obj.descTDOC = formatter.formatCellValue(row.getCell(19)).trim();
                        obj.IN_BANDOC = filter.IN_BANDOC;
                        obj.IN_TDOC = filter.IN_TDOC;
                        obj.IN_CODEBANK = filter.IN_CODEBANK;
                        obj.IN_SCURRENCY = filter.IN_SCURRENCY;
                        obj.IN_MERCHNC = filter.IN_MERCHNC;
                        obj.IN_SCOUNTRY = filter.IN_SCOUNTRY;
                        obj.IN_COREP = filter.IN_COREP;
                        obj.IN_SOCIETY = filter.IN_SOCIETY;
                        obj.IN_DATECI = filter.IN_DATECI;
                        obj.IN_TRANCI = filter.IN_TRANCI;
                        lstData.add(obj);
                    }
                }
                file.close();
            } catch (Exception e) {
                e.getMessage();
                if (e.getMessage().contains("String index out of range")) {
                    mensajePost = "";
                } else {
                    mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                }
            }

            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());
            mensaje = logic.SQP05099(lstData, user);
            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mensaje;

    }

    @RequestMapping(value = "updateRecords",  method = RequestMethod.POST)
    public @ResponseBody
    String updateRecords(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadSalesConciliation : updateRecords-------------");
        
        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();
        String beanString;
        try {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new LoadSalesConciliationLogic();
        logic.setSession(this.serverSession.getServerSession());
        UserView user = this.serverSession.getServerSession().getUserView();
        
            result = logic.SQPMPS076_UP(filter, user);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "updateRecordsOperational",  method = RequestMethod.POST)
    public @ResponseBody
    String updateRecordsOperational(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadSalesConciliation : updateRecordsOperational-------------");
        
        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();
        String beanString;
        try {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new LoadSalesConciliationLogic();
        logic.setSession(this.serverSession.getServerSession());
        UserView user = this.serverSession.getServerSession().getUserView();
        
            result = logic.SQPMPS076_UP_OPERATIONAL(filter, user);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
            
    @RequestMapping(value = "monthReconciliation",  method = RequestMethod.POST)
    public @ResponseBody
    String monthReconciliation(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadSalesConciliation : monthReconciliation-------------");
        
        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();
        String beanString;
        try {
        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new LoadSalesConciliationLogic();
        logic.setSession(this.serverSession.getServerSession());
        UserView user = this.serverSession.getServerSession().getUserView();
        
            result = logic.SQPMPF114_PREV(filter, user);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    public static String FechaInator(String FechaEntrada) {
        String fechaFormateada = "";
        String day = "", month = "", year = "";
        if (!"".equals(FechaEntrada)) {
            String[] fechaS = FechaEntrada.split("/");
            day = fechaS[0].toString();
            month = fechaS[1].toString();
            year = fechaS[2].toString();

            if (month.equals("Ene")) {
                month = "01";
            }
            if (month.equals("Feb")) {
                month = "02";
            }
            if (month.equals("Mar")) {
                month = "03";
            }
            if (month.equals("Abr")) {
                month = "04";
            }
            if (month.equals("May")) {
                month = "05";
            }
            if (month.equals("Jun")) {
                month = "06";
            }
            if (month.equals("Jul")) {
                month = "07";
            }
            if (month.equals("Ago")) {
                month = "08";
            }
            if (month.equals("Sep")) {
                month = "09";
            }
            if (month.equals("Oct")) {
                month = "10";
            }
            if (month.equals("Nov")) {
                month = "11";
            }
            if (month.equals("Dic")) {
                month = "12";
            }

            fechaFormateada = year + month + day;
        } else {
            fechaFormateada = "";
        }

//        System.out.println(fechaFormateada);
        return fechaFormateada;
    }

}
