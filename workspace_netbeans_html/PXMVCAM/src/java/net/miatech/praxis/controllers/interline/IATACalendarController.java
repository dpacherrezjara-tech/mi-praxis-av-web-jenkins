package net.miatech.praxis.controllers.interline;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A020Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.A1851;
import net.miatech.praxis.logic.interline.InterlineCorrespondenceLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.logic.interline.LoadInterline02Logic;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/IATACalendar")
public class IATACalendarController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadInterline02Logic logic;
    private A1851 filter;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1851> lstData;
        filter = new A1851();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "IATACalendarController :  search");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());

            lstData = logic.loadPX186S01A1851(filter);
            map.put("success", true);
            map.put("listaData", lstData);

            //SE OBTIENE ÚLTIMA FECHA DE PERIODO ABIERTA =======================
            A1851 recPeriod = logic.loadPX186_SQP00122();
            map.put("recPeriod", recPeriod);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceA1851")
    public @ResponseBody
    String MaintenanceA1851(ModelMap map, HttpServletRequest request) {
        filter = new A1851();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "IATACalendarController :  MaintenanceA1851");

            String option = request.getParameter("option");
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            String msj = logic.loadPX186S02A1851(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "closePeriod")
    public @ResponseBody
    String closePeriod(ModelMap map, HttpServletRequest request) {
        String msj;
        filter = new A1851();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, "IATACalendarController :  closePeriod");

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());

            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX186_SQP00123(filter);
            map.put("success", true);
            map.put("Mensaje", msj);

            //SE OBTIENE ÚLTIMA FECHA DE PERIODO ABIERTA =======================
            A1851 recPeriod = logic.loadPX186_SQP00122();

            map.put("recPeriod", recPeriod);
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
            String beanString = request.getParameter("beanString");
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());        
            filter = new A1851();
            filter = new Gson().fromJson(beanString, filter.getClass());
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A1851> listaData = logic.loadPX186S01A1851(filter);
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

            CH1_0.setCellValue("Date Invoiced");
            CH1_1.setCellValue("Period");
            CH1_2.setCellValue("Information Delivery Settings");
            CH1_6.setCellValue("Sending Parameter Image Support");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
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

            CH2_2.setCellValue("Open");
            CH2_4.setCellValue("Close");
            CH2_6.setCellValue("Date");
            CH2_7.setCellValue("Time");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            ++vj;
             //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);

            CH3_0.setCellValue("");
            CH3_1.setCellValue("");
            CH3_2.setCellValue("Date");
            CH3_3.setCellValue("Time");
            CH3_4.setCellValue("Date");
            CH3_5.setCellValue("Time");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
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

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).PERIOD);
                rcell2.setCellValue(listaData.get(vi).strFormatDate1);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).strFormatDate2);
                rcell5.setCellValue(listaData.get(vi).strDescripcion1);
                rcell6.setCellValue(listaData.get(vi).strFormatDate3);
                rcell7.setCellValue(listaData.get(vi).strDescripcion2);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(IATACalendarController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @RequestMapping(value = "/load_A1851", method = RequestMethod.POST)
    public @ResponseBody
    String load_A1851(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        A1851 objResult = new A1851();
        
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();

            String strFechDuplicat = request.getParameter("strFechDuplicat");
            
            byte[] dataFile = excelfile.getBytes();
            objResult = insert_A1851(dataFile, strFechDuplicat);
            
            if(objResult.isloadOk){
                map.put("success", true);
                map.put("objResult", objResult);
            }else if(!objResult.strDateDuplicat.equals("")) {
                map.put("success", true);
                map.put("duplicat", true );
                map.put("objResult", objResult);
            }else{
                map.put("error", true);
                map.put("objResult", objResult);
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
    
    public A1851 insert_A1851(byte[] bytes, String strFechDuplicat) {
        
        System.out.println("insert_A1851 : insert_A1851");

        List<String> lstCadena = new ArrayList<>();
        boolean oK = false;
        boolean loadDuplicate = false;
        Integer i = 0;
        String fechInit = "";
        String strFechExist = "";
//        Workbook workbook;
        A1851 objRtn;
        List<A1851> lstRtn = new ArrayList<A1851>(0);
        A1851 objExit = new A1851();
        
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Tickets_update." + strSesion + ".xls";
            
            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close();
         
            DataFormatter formatter = new DataFormatter();
            String primeraCelda="";
            boolean escribe = false;
        
            FileInputStream file = new FileInputStream(archivo);
            
            HSSFWorkbook workbook;
            workbook = new HSSFWorkbook(file);
            HSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            
            DataFormatter df = new DataFormatter();
            SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            SimpleDateFormat formatFecha = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat formatHora = new SimpleDateFormat("HH:mm:ss");
            
            logic = new LoadInterline02Logic();
            logic.setSession(this.serverSession.getServerSession());
            
            try {
                while (rowIterator.hasNext() ) {
                    i++;
                    Row row = rowIterator.next();
                    
                    /*
                    if(i == 3 && strFechDuplicat.equals("")){
                        strFechExist = df.formatCellValue(row.getCell(1)).trim();
                        
                        loadDuplicate = logic.searchDate_A1851(strFechExist);
                        if(loadDuplicate){
                            System.out.println("--------------------------------------- FECHA DE CARGA DUPLICADA ----------------------------------------");
                            objExit.isDateDuplicat = true;
                            objExit.strDateDuplicat = strFechExist;
                            break;
                        }
                        
                    }
                    */
                    
                    if(i > 3){
                        
                        System.out.println("ROW: " + i);
                        
                        if(i == 51){
                            System.out.println(" --- PRE ---");
//                            break;
                        }
                        
                        if( (getCellValue(row.getCell(2)).trim().equals("") || getCellValue(row.getCell(2)).trim() == null) &&
                            (getCellValue(row.getCell(3)).trim().equals("") || getCellValue(row.getCell(3)).trim() == null) &&
                            (getCellValue(row.getCell(4)).trim().equals("") || getCellValue(row.getCell(4)).trim() == null) &&
                            (getCellValue(row.getCell(5)).trim().equals("") || getCellValue(row.getCell(5)).trim() == null) &&
                            (getCellValue(row.getCell(6)).trim().equals("") || getCellValue(row.getCell(6)).trim() == null) &&
                            (getCellValue(row.getCell(7)).trim().equals("") || getCellValue(row.getCell(7)).trim() == null  )
                                
                        ){
                            System.out.println(" ---- FIN ----");
                            break;
                        }
                        
                        objRtn = new A1851();
                        
                        objRtn.PERIOD   =  Functions.fillZeros(2,getCellValue(row.getCell(1)).trim());              // Col [B]
                        
                        if(objRtn.PERIOD.equals("01")){
                           String FINVOIC =  getCellValue(row.getCell(0)).trim();                                   // Col [A]
                           objRtn.FINVOIC =  getNumeros(FINVOIC) + getNumberMesEnglish(FINVOIC);                    // Col [A]
                           fechInit = objRtn.FINVOIC;
                        }else{
                           objRtn.FINVOIC = fechInit;
                        }
                        
                        // Detectar fecha duplicada A1851
                        if(i == 4 && strFechDuplicat.equals("")){
                            try {
                                strFechExist = fechInit.substring(0,4);
                            } catch (Exception e) {
                                strFechExist = "";
                            }
                           

                            loadDuplicate = logic.searchDate_A1851(strFechExist);
                            if(loadDuplicate){
                                System.out.println("--------------------------------------- FECHA DE CARGA DUPLICADA ----------------------------------------");
                                objExit.isDateDuplicat = true;
                                objExit.strDateDuplicat = strFechExist;
                                break;
                            }

                        }
                        
                        objRtn.DOENV = formatFecha.format(row.getCell(2).getDateCellValue()).replace("-", "");      // Col [C]
                        objRtn.TIMESI = formatHora.format(row.getCell(2).getDateCellValue()).replace(":", "");      // Col [C]
                        
                        objRtn.DCENV = formatFecha.format(row.getCell(4).getDateCellValue()).replace("-", "");      // Col [D]
                        objRtn.TIMESO = formatHora.format(row.getCell(4).getDateCellValue()).replace(":", "");      // Col [D]
                        
                        objRtn.DENVI = formatFecha.format(row.getCell(7).getDateCellValue()).replace("-", "");      // Col [E]
                        objRtn.TIMESE = formatHora.format(row.getCell(7).getDateCellValue()).replace(":", "");      // Col [E]
                        
                        
                        lstRtn.add(objRtn);

                    }
                }
                
                file.close();
                archivo.delete();
                
//                for (String cadDet : lstRtn) {
//                    System.out.println(cadDet);
//                }
                if(!objExit.isDateDuplicat){
                   objExit.isloadOk = logic.insert_A1851(lstRtn, strFechDuplicat);
                }
                
            } catch (Exception e) {
                e.getMessage();
            }
            
        } catch (Exception e) {
            e.getMessage();
        }
        
        
        return objExit;
    }
    
    public static String getNumeros(String cadena){
        char [] cadena_div = cadena.toCharArray();
        String n = "";
        
        for (int i = 0; i < cadena_div.length; i++) {
            if(Character.isDigit(cadena_div[i])){
                n+=cadena_div[i];
            }
        }
        return n;
        
    }
    
    public static String getNumberMesEnglish(String strDate) {

        if (strDate.trim().contains("January")) {
            return "01";
        } else if (strDate.trim().contains("February")) {
            return "02";
        } else if (strDate.trim().contains("March")) {
            return "03";
        } else if (strDate.trim().contains("April")) {
            return "04";
        } else if (strDate.trim().contains("May")) {
            return "05";
        } else if (strDate.trim().contains("June")) {
            return "06";
        } else if (strDate.trim().contains("July")) {
            return "07";
        } else if (strDate.trim().contains("August")) {
            return "08";
        } else if (strDate.trim().contains("September")) {
            return "09";
        } else if (strDate.trim().contains("October")) {
            return "10";
        } else if (strDate.trim().contains("November")) {
            return "11";
        } else if (strDate.trim().contains("December")) {
            return "12";
        } else {
            return "Error";
        }

    }
    
    
    public static String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
//                        cellValue = formatter.formatCellValue(cell);
                        cellValue = new SimpleDateFormat("yyyyMMdd").format(cell.getDateCellValue()) + "";
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String.valueOf(intValue) : String.valueOf(value);
//                        cellValue = String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    //cellValue = String.valueOf(cell.getCellFormula());
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        List<A1155Filter> listaData;
//        filter = new A1155Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//        
//        String fileNameDownload = String.format("SPA Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        
//        try {
//            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO");
//            filter.IN_STATUS = request.getParameter("IN_STATUS");
//            filter.IN_AIRLINE = request.getParameter("IN_AIRLINE");
//            filter.IN_INDICATOR = request.getParameter("IN_INDICATOR");
//            
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            
//            logic = new InterlineCorrespondenceLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            listaData = logic.loadPX154S01A1155(filter);
//
//            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("SPA Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
////            CellStyle headerStyle = workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
////            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            // </editor-fold>
//
//            Integer vi = 0;
//            Integer vj = 0;
//            Iterator iter = listaData.iterator();
//
//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Billing");
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            CH1_07.setCellValue("Invoice");
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            CH1_09.setCellValue("Set");
//            Cell CH1_10 = row.createCell(10);
//            CH1_10.setCellValue("Cpn. St.");
//            Cell CH1_11 = row.createCell(11);
//            CH1_11.setCellValue("Rej. St.");
//            Cell CH1_12 = row.createCell(12);
//            CH1_12.setCellValue("BM. St.");
//            Cell CH1_13 = row.createCell(13);
//            CH1_13.setCellValue("CM. St.");
//            Cell CH1_14 = row.createCell(14);
//            CH1_14.setCellValue("Currency");
//            Cell CH1_15 = row.createCell(15);
//            CH1_15.setCellValue("Total");
//            Cell CH1_16 = row.createCell(16);
//            CH1_16.setCellValue("Total");
//            Cell CH1_17 = row.createCell(17);
//            CH1_17.setCellValue("Total");
//            Cell CH1_18 = row.createCell(18);
//            CH1_18.setCellValue("Total");
//            Cell CH1_19 = row.createCell(19);
//            CH1_19.setCellValue("Total");
//            Cell CH1_20 = row.createCell(20);
//            CH1_20.setCellValue("Total");
//            Cell CH1_21 = row.createCell(21);
//            CH1_21.setCellValue("Total");
//            Cell CH1_22 = row.createCell(22);
//            CH1_22.setCellValue("Total");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            CH2_00.setCellValue("Date");
//            Cell CH2_01 = row2.createCell(1);
//            CH2_01.setCellValue("Period");
//            Cell CH2_02 = row2.createCell(2);
//            CH2_02.setCellValue("Airline");
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Code");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Invoice Number");
//            Cell CH2_08 = row2.createCell(8);
//            CH2_08.setCellValue("Date");
//            Cell CH2_09 = row2.createCell(9);
//            CH2_09.setCellValue("Meth.");
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            CH2_15.setCellValue("GROSS");
//            Cell CH2_16 = row2.createCell(16);
//            CH2_16.setCellValue("ISC");
//            Cell CH2_17 = row2.createCell(17);
//            CH2_17.setCellValue("TAX");
//            Cell CH2_18 = row2.createCell(18);
//            CH2_18.setCellValue("VAT");
//            Cell CH2_19 = row2.createCell(19);
//            CH2_19.setCellValue("FEE");
//            Cell CH2_20 = row2.createCell(20);
//            CH2_20.setCellValue("UATP");
//            Cell CH2_21 = row2.createCell(21);
//            CH2_21.setCellValue("Other Commission");
//            Cell CH2_22 = row2.createCell(22);
//            CH2_22.setCellValue("NET");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 22, 22));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//            CH2_17.setCellStyle(headerStyle);
//            CH2_18.setCellStyle(headerStyle);
//            CH2_19.setCellStyle(headerStyle);
//            CH2_20.setCellStyle(headerStyle);
//            CH2_21.setCellStyle(headerStyle);
//            CH2_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            
//            Row row3 = sheet.createRow(vj);
//
//            Cell CH3_00 = row3.createCell(0);
//            Cell CH3_01 = row3.createCell(1);
//            Cell CH3_02 = row3.createCell(2);
//            CH3_02.setCellValue("Code");
//            Cell CH3_03 = row3.createCell(3);
//            CH3_03.setCellValue("Code");
//            Cell CH3_04 = row3.createCell(4);
//            CH3_04.setCellValue("Name");
//            Cell CH3_05 = row3.createCell(5);
//            CH3_05.setCellValue("Name");
//            Cell CH3_06 = row3.createCell(6);
//            Cell CH3_07 = row3.createCell(7);
//            Cell CH3_08 = row3.createCell(8);
//            Cell CH3_09 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//            Cell CH3_17 = row3.createCell(17);
//            Cell CH3_18 = row3.createCell(18);
//            Cell CH3_19 = row3.createCell(19);
//            Cell CH3_20 = row3.createCell(20);
//            Cell CH3_21 = row3.createCell(21);
//            Cell CH3_22 = row3.createCell(22);
//
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
//
//            CH3_00.setCellStyle(headerStyle);
//            CH3_01.setCellStyle(headerStyle);
//            CH3_02.setCellStyle(headerStyle);
//            CH3_03.setCellStyle(headerStyle);
//            CH3_04.setCellStyle(headerStyle);
//            CH3_05.setCellStyle(headerStyle);
//            CH3_06.setCellStyle(headerStyle);
//            CH3_07.setCellStyle(headerStyle);
//            CH3_08.setCellStyle(headerStyle);
//            CH3_09.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//            CH3_17.setCellStyle(headerStyle);
//            CH3_18.setCellStyle(headerStyle);
//            CH3_19.setCellStyle(headerStyle);
//            CH3_20.setCellStyle(headerStyle);
//            CH3_21.setCellStyle(headerStyle);
//            CH3_22.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//                Cell cell58 = row.createCell(8);
//                Cell cell59 = row.createCell(9);
//                Cell cell60 = row.createCell(10);
//                Cell cell61 = row.createCell(11);
//                Cell cell62 = row.createCell(12);
//                Cell cell63 = row.createCell(13);
//                Cell cell64 = row.createCell(14);
//                Cell cell65 = row.createCell(15);
//                Cell cell66 = row.createCell(16);
//                Cell cell67 = row.createCell(17);
//                Cell cell68 = row.createCell(18);
//                Cell cell69 = row.createCell(19);
//                Cell cell70 = row.createCell(20);
//                Cell cell71 = row.createCell(21);
//                Cell cell72 = row.createCell(22);
//
//                cell50.setCellValue(listaData.get(vi).strFormatDate);
//                cell51.setCellValue(listaData.get(vi).PERNUM);
//                cell52.setCellValue(listaData.get(vi).BAIR);
//                cell53.setCellValue(listaData.get(vi).BDAIR);
//                cell54.setCellValue(listaData.get(vi).DES_BAIR);
//                cell55.setCellValue(listaData.get(vi).DES_BDAIR);
//                cell56.setCellValue(listaData.get(vi).BCODE);
//                cell57.setCellValue(listaData.get(vi).BNUMBER);
//                cell58.setCellValue(listaData.get(vi).strFormatDate2);
//                cell59.setCellValue(listaData.get(vi).SETMETH);
//                cell60.setCellValue(listaData.get(vi).STPM);
//                cell61.setCellValue(listaData.get(vi).STRM);
//                cell62.setCellValue(listaData.get(vi).STBM);
//                cell63.setCellValue(listaData.get(vi).STCM);
//                cell64.setCellValue(listaData.get(vi).BCURREN);
//                cell65.setCellValue(listaData.get(vi).TGROSS);
//                cell66.setCellValue(listaData.get(vi).TISC);
//                cell67.setCellValue(listaData.get(vi).TTAX);
//                cell68.setCellValue(listaData.get(vi).TVAT);
//                cell69.setCellValue(listaData.get(vi).HFEEAM);
//                cell70.setCellValue(listaData.get(vi).TUATP);
//                cell71.setCellValue(listaData.get(vi).TOHCOM);
//                cell72.setCellValue(listaData.get(vi).TNET);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//                cell58.setCellStyle(bodyStyle);
//                cell59.setCellStyle(bodyStyle);
//                cell60.setCellStyle(bodyStyle);
//                cell61.setCellStyle(bodyStyle);
//                cell62.setCellStyle(bodyStyle);
//                cell63.setCellStyle(bodyStyle);
//                cell64.setCellStyle(bodyStyle);
//                cell65.setCellStyle(bodyStyle);
//                cell66.setCellStyle(bodyStyle);
//                cell67.setCellStyle(bodyStyle);
//                cell68.setCellStyle(bodyStyle);
//                cell69.setCellStyle(bodyStyle);
//                cell70.setCellStyle(bodyStyle);
//                cell71.setCellStyle(bodyStyle);
//                cell72.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
//                sheet.autoSizeColumn(14, true);
//                sheet.autoSizeColumn(15, true);
//                sheet.autoSizeColumn(16, true);
//                sheet.autoSizeColumn(17, true);
//                sheet.autoSizeColumn(18, true);
//                sheet.autoSizeColumn(19, true);
//                sheet.autoSizeColumn(20, true);
//                sheet.autoSizeColumn(21, true);
//                sheet.autoSizeColumn(22, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new SpringException(e);
//        }
//    }
}
