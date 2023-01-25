package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
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
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1805Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ConsortiumCommissionsLogic;
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
import net.miatech.beans.ServerSession;


import net.miatech.praxis.exceptions.SpringException;
import java.sql.SQLException;
import com.google.gson.Gson;
import java.io.File;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/ConsortiumCommissions")
public class ConsortiumCommissionsController extends BaseController {

    private ConsortiumCommissionsLogic logic;
    private A1805Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/proccessComission")
    public @ResponseBody
    String proccessComission(ModelMap map, HttpServletRequest request) {
        filter = new A1805Filter();
        String data;
        try {
            filter.IN_A1805CCUST = request.getParameter("IN_A1805CCUST");
            filter.IN_A1805APL = request.getParameter("IN_A1805APL");
            filter.IN_A1805CLIEN = request.getParameter("IN_A1805CLIEN");
            filter.IN_A1805POLIZ = request.getParameter("IN_A1805POLIZ");
            filter.IN_A1805FECHA = request.getParameter("IN_A1805FECHA");
            filter.IN_A1805BATCH = request.getParameter("IN_A1805BATCH");
            filter.IN_A1805PROGA = request.getParameter("IN_A1805PROGA");
            filter.IN_A1805MODO = request.getParameter("IN_A1805MODO");
            filter.IN_A1805FILE = request.getParameter("IN_A1805FILE");
            filter.IN_PARAM = request.getParameter("IN_PARAM");
//            filter.OU_A1805STATU = request.getParameter("OU_A1805STATU");
            
            logic = new ConsortiumCommissionsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            data = logic.setSQP01320(filter);
            
            map.put("success", true);
            map.put("lstProccess", data);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("lstProccess", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Inplant Report : getFile");

        
        List<A1805Filter> listaData = new ArrayList<>(0);
        A1805Filter filter = new A1805Filter();
        
        String strType = request.getParameter("strType").trim();
        String strZona = request.getParameter("strZona").trim();
        String nameLote = request.getParameter("nameLote").trim(); 
        String nameText = request.getParameter("nameFile").trim();

        /*filter.page.TOTROW = -1;
        filter.page.START = -1;
        filter.page.LIMIT = -1;
        filter.page.PAGROW = -1;
        filter.page.PAGNUM = -1;*/
        try {
            //int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            
            //filter.page.PAGROW = -1;
            //filter.page.PAGNUM = -1;
            
            logic = new ConsortiumCommissionsLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.downloadText(nameLote);
            
            
        } catch (NumberFormatException | SQLException ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            //map.put("success", false);
            //map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        
        StringBuilder line = new StringBuilder();
        String fileNameDownload = nameText; //Functions.getFechaActual()+"-Inplant-Commissions" + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        //String delim = "\t";
        //String delim = "\r\n";
        //String delim = ";";
        String delim = "";
        //String texto = "Cia" + delim
        //        + "\r\n";

        //line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            //listaData = this.getListTicket(request, true);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (A1805Filter item : listaData) {
                strTexto += item.OU_TRAMATXT + delim
                        + "\r\n";

            }
            line.append(strTexto.toString());

            InputStream input = new ByteArrayInputStream(line.toString().getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());
        }

    }
    
    @RequestMapping(value = "/downloadText")
    public @ResponseBody
    String downloadText(ModelMap map, HttpServletRequest request) {
        String nameFile = "", nameLote = "", strZona = "", strType = "";
        String rutaFile= (String) serverSession.getServerSession().getPropertySession().get("RUTA_FILE_NAME").toString();
        String rutaFlex= (String) serverSession.getServerSession().getPropertySession().get("RUTA_URL_FLEX").toString();
        String strName = ""; 
        
        File dir = new File(rutaFile);
        String[] ficheros = dir.list();
        int existe=0;
        PrintWriter pw = null; 
        List<A1805Filter> listaData = null;
        int intData = 0;
        try {
            nameFile = request.getParameter("nameFile");
            nameLote = request.getParameter("nameLote");
            strZona = request.getParameter("strZona");
            strType = request.getParameter("strType");
            
            if(ficheros != null)
            {
                for (int x=0;x<ficheros.length;x++)
                {
                    if(ficheros[x].trim().equals(nameFile.trim())) //Si ya esta creado
                    {
                        existe=0;
                        break;
                    }                
                }
                if(existe!=1)  //Si no esta creado                
                {
                    //llamar store que trae la trama
                    logic = new ConsortiumCommissionsLogic();
                    logic.setSession((IServerSession) serverSession.getServerSession());
                    listaData = logic.downloadText(nameLote);
                    intData = listaData.size();
                    if(listaData.size()>0)
                    {
                         pw = new PrintWriter(dir+"\\" + nameFile);
                            for(A1805Filter obj : listaData)
                            {
                               String trama = obj.OU_TRAMATXT;
                               pw.println(trama);                            
                           }
                         pw.flush();
                         pw.close();
                         pw = null;
                    }
                    else
                    {
                        pw = new PrintWriter(dir+"\\" + nameFile);
                        String trama = "";
                        pw.println(trama);                            
                        pw.flush();
                        pw.close();
                        pw = null;
                    }
                }
                map.put("success", true);
                map.put("lstFile", rutaFlex +"|"+ nameFile+"|"+ String.valueOf(intData) +"|"+ String.valueOf(Math.random()) + "|" + strName);
                map.put("listaData", listaData);
            }
            else
            {
                map.put("success", true);
                map.put("lstFile", "Crear");
                map.put("listaData", null);
            }
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (IOException ex) {
            map.put("success", false);
            map.put("lstProccess", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("lstProccess", "Se produjo un error. " + ex.getMessage());
        }
        finally
        {    
            //if(existe!=1) pw.close();
        }
        return new Gson().toJson(map);
    } 
    
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        List<A1805Filter> listaData;
//        filter = new A1805Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//        
//        String fileNameDownload = String.format("Accounting Master Process Sales - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        
//        try {
//            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            
//            filter.IN_MODULO = request.getParameter("IN_MODULO").trim();
//            filter.IN_FECHA_PROCESO = request.getParameter("IN_FECHA_PROCESO").trim();
//            filter.IN_FECHA_ACUSE = request.getParameter("IN_FECHA_ACUSE").trim();
//            filter.A1955STATU = request.getParameter("A1955STATU").trim();
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            
//            logic = new ConsortiumCommissionsLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            listaData = logic.search(filter);
//            
//            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Accounting Master Process Sales");
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
//            CH1_00.setCellValue("Nbr");
//            Cell CH1_01 = row.createCell(1);
//            CH1_01.setCellValue("ID Process");
//            Cell CH1_02 = row.createCell(2);
//            CH1_02.setCellValue("Module");
//            Cell CH1_03 = row.createCell(3);
//            CH1_03.setCellValue("Type");
//            Cell CH1_04 = row.createCell(4);
//            CH1_04.setCellValue("Proc. Date");
//            Cell CH1_05 = row.createCell(5);
//            CH1_05.setCellValue("Status");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
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
//
//                cell50.setCellValue(listaData.get(vi).RN);
//                cell51.setCellValue(listaData.get(vi).A1955ENVIO);
//                cell52.setCellValue(listaData.get(vi).MODULE);
//                cell53.setCellValue(listaData.get(vi).ACCION);
//                cell54.setCellValue(listaData.get(vi).A1955FPROC);
//                cell55.setCellValue(listaData.get(vi).ESTADO);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
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
