/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
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
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.payments.LoadExchangeRateDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.LoadExchangeRateLogic;
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
@RequestMapping("/LoadExchangeRate")
public class LoadExchangeRateController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadExchangeRateLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/LoadExchangeRate/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadExchangeRate : Search-------------");
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
            logic = new LoadExchangeRateLogic();
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

    @RequestMapping(value = "/loadMPF033", method = RequestMethod.POST)
    public @ResponseBody
    String updateA4527(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
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
            objResult = loadExchangeRate(dataFile, filter );

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

    private A2290Filter loadExchangeRate(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new LoadExchangeRateLogic();
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
        int cantVacios = 0;
  
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomTxt = "ExchangeRate_Load.txt";

            String strArchivo = ruta + "\\" + strNomTxt;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String linea = "";
            int Contador = 0;
            
//            dataAgentsA003 = objDao.dataA003KEY();
//            
//            Map<String, CargaFilter> mapaA003 = new HashMap<>();
//            for (CargaFilter registro : dataAgentsA003) {
//                mapaA003.put(registro.getA003KEY(), registro);
//            }
            
//        List<CargaFilter> lstDataDUP = new ArrayList<>();
        try {
            BufferedReader brrr = new BufferedReader(new FileReader(strArchivo));
            
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine();
            linea = brrr.readLine(); 
            while ((linea = brrr.readLine()) != null) {

                if (linea == null) {
                    break;
                }
                if (!linea.replaceAll(" ", "").replaceAll(";", "").equals("")){
                    linea = linea.replaceAll("[^\\p{ASCII}]", "");
                    A2290Filter obj = new A2290Filter();
                    obj.TREG = linea.substring(1, 2).trim();
                    obj.CURRENCY1 = linea.substring(3, 6).trim();
                    obj.CURRENCY2 = linea.substring(7, 10).trim();
                    String date = linea.substring(11, 21).trim();
                    System.out.println("date: " + date);
                    String[] dateFormato = date.split("\\.");
                    obj.DATECH = dateFormato[2].toString()+dateFormato[1].toString()+ dateFormato[0].toString();
//                    String signo = linea.substring(27, 28).trim();
                    String cmpRate = linea.substring(22, 35).trim();
                    if( cmpRate.contains("/")){
                        obj.SIGN = "D";
                    } else {
                        obj.SIGN = "M";
                    }
//                    String line = linea.substring(28).trim();
//                    String[] fields = line.split(" ");
                    obj.RATE = cmpRate.trim().replaceAll("/","").replace("\\.", "").replace(".", "").replace(",", ".");
                    obj.FACTORD = linea.substring(36, 41).trim();
                    obj.FACTORA = linea.substring(42, 47).trim();
                    obj.TCCOTIND = linea.substring(48, 56).trim().replace("\\.", "").replace(".", "").replace(",", ".");
//                    String[] subFields = fields[13].toString().trim().split("\t");
                    obj.TCCOTDIR = linea.substring(57, 68).trim().replace("\\.", "").replace(".", "").replace(",", ".");
                    obj.TCCOTIND2 = formatAmount(linea.substring(69, 84).trim());
                    obj.TCCOTDIR2 = formatAmount(linea.substring(85, 104).trim());
                    System.out.println(" "+ obj.DATECH + " - "+ obj.RATE + " - " + obj.TCCOTIND + " - " + obj.TCCOTDIR + " - " + obj.TCCOTIND2 + " - " + obj.TCCOTDIR2);
//                    String[] fields = linea.split(";");
                    if(obj.DATECH.contains("20240605")){
                        System.out.println("  " +obj.TCCOTDIR2 );
                    }
                    //DECLARANDO CAMPOS
//                    obj.CCUST = "134";
//                    
//                    obj.CURRENCY1 = fields[1].toString();
//                    obj.CURRENCY2 = fields[2].toString();
//                    
//                    obj.SIGN = fields[4].toString();
//
//                    obj.RATE = fields[5].toString();
//                    obj.FACTORD = fields[6].toString();
//                    obj.FACTORA = fields[7].toString();
//                    obj.TCCOTIND = fields[8].toString();
//                    obj.TCCOTDIR = fields[9].toString();
//                    obj.TCCOTIND2 = fields[10].toString();
//                    obj.TCCOTDIR2 = fields[11].toString();

                    Contador++;
                    obj.Contador++;
                    lstData.add(obj);
                    System.out.println("ite: " + Contador);
                    if(Contador == 1289){
                        System.out.println("wadafa");
                    }

                }else {
                    cantVacios++;
                    System.out.println("veces: " + cantVacios);
                    break;
                }
                
            }

        } catch (FileNotFoundException ex) {
            System.err.println(ex.getMessage());
        } catch (IOException ex) {
            System.err.println(ex.getMessage());
        }

            System.out.println("lista generada: " + lstData.size() );
            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());
            mensaje = logic.SQPMPS033(lstData, user);
            respt.MESSAGE = mensaje;
            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return respt;

    }

    public String formatAmount(String amount) {

        //if (amount.substring(amount.length() - 3).contains(","))
        if (true) {
            amount = amount.replace("\\.", "").replace(".", "").replace(",", ".");
        } else if (amount.substring(amount.length() - 3).contains("\\.")) {
            amount = amount.replace(",", "");
        } else {
            amount = amount;
        }

        return amount.substring(0,amount.length() - 5);
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

        logic = new LoadExchangeRateLogic();
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

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("LoadExchangeRate : getXLSX");

        String fileNameDownload = String.format("agentsCatalog - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<MPF106Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("ReasonCodeReport");

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
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);

            CH1_00.setCellValue("Nbr");
            CH1_01.setCellValue("Terminal");
            CH1_02.setCellValue("Agent");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));

            ++vj;
            //*******************

            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).TERMP);
                rcell2.setCellValue(listaData.get(vi).SAGENT);
                iter.next();
                ++vi;
                ++vj;
            }
            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);

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
        }
    }

    @RequestMapping(value = "MaintenanceMPF016")
    public @ResponseBody
    String MaintenanceMPF106(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- LoadExchangeRate : MaintenanceMPF106-------------");
        String option;
        MPF106Filter filter = new MPF106Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {
            option = request.getParameter("option");
            filter.TERMP = request.getParameter("TERMP");
            filter.SAGENT = request.getParameter("SAGENT");

            logic = new LoadExchangeRateLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX620SQP05108(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBandoc")
    public @ResponseBody
    String searchBandoc(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LoadExchangeRate : searchBandoc-------------");

        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new LoadExchangeRateLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX620SQP05107(filter);
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
