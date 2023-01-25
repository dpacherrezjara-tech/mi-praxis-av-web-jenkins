package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.read.biff.BiffException;
import net.miatech.beans.A1789Filter;
import net.miatech.beans.PX125S01A1802Filter;
import net.miatech.beans.SQP00112Filter;
import net.miatech.beans.SQP00168Filter;
import net.miatech.beans.SQP00169Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.LoadFileLogic;
import net.miatech.utils.Functions;
import net.miatech.utils.Util;
import org.apache.commons.io.FilenameUtils;
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
@RequestMapping("/LoadFile")
public class LoadFileController extends BaseController {

    private LoadFileLogic logic;
    private SQP01170Filter filter;
    private A1789Filter filter2;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/loadSQP01170")
    public @ResponseBody
    String loadSQP01170(ModelMap map, HttpServletRequest request) {
        List<SQP01170Filter> listaData;
        filter = new SQP01170Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CCUST = request.getParameter("VP_CCUST").trim();
            filter.VP_FCARGA1 = request.getParameter("VP_FCARGA1").trim();
            filter.VP_FCARGA2 = request.getParameter("VP_FCARGA2").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new LoadFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01170(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    // VHO 
    @RequestMapping(value = "/setData")
    public @ResponseBody
    String setData(ModelMap map, HttpServletRequest request) {
        byte[] bytes = null;
        filter2 = new A1789Filter();
        A1789Filter lstData;
        
        boolean status = false;
        try {
            filter2.VP_OPCION = request.getParameter("VP_OPCION");
            bytes = (request.getParameter("arrBytes")).getBytes("ISO-8859-1");
            filter2.fileName = request.getParameter("fileName");
            filter2.VP_FPERDES = request.getParameter("VP_FPERDES");
            filter2.VP_FPERHAS = request.getParameter("VP_FPERHAS");
            filter2.A1789FORMA = request.getParameter("A1789FORMA");
            filter2.A1789SERIE = request.getParameter("A1789SERIE");
            filter2.A1789IATA = request.getParameter("A1789IATA");
            filter2.A1789NGPS = request.getParameter("A1789NGPS");
            filter2.A1789SRES = request.getParameter("A1789SRES");
            filter2.A1789PNR = request.getParameter("A1789PNR");
            filter2.A1789TFORM = request.getParameter("A1789TFORM");
            filter2.A1789FECVT = request.getParameter("A1789FECVT");
            String temp = request.getParameter("A1789TCAMB");
            filter2.A1789TCAMB = temp.length()>0?Double.parseDouble(temp):0;
            filter2.A1789MDA = request.getParameter("A1789MDA");
            temp = request.getParameter("A1789TOTAL");
            filter2.A1789TOTAL = temp.length()>0?Double.parseDouble(temp):0;
            filter2.A1789NPAX = request.getParameter("A1789NPAX");
            temp = request.getParameter("A1789STOTA");
            filter2.A1789STOTA = temp.length()>0?Double.parseDouble(temp):0;
            
            lstData = filter2;
            filter2.VP_OPCION = "I";
            logic = new LoadFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.setSQP01117(filter2);            
                        
            if ( "I".equals(filter2.VP_OPCION) ){
                if ( Integer.parseInt(filter2.dbException.SQLCODE) ==  0 )
                 status = upload(bytes, filter2.fileName);
                if ( status )
                status = procesaExcel(filter2);
                
                // Actualiza log 
                filter2.VP_OPCION = "U";                
                logic.setSession((IServerSession) serverSession.getServerSession());
                logic.setSQP01117(filter2);  
                if(!Util.fillZeros(7, filter2.dbException.SQLCODE).equals("0000000")){
                    map.put("MESSAGE", filter2.dbException.MESSAGE);
                }else{
                    lstData.dbException.SQLCODE = "0";
                    lstData.dbException.MESSAGE = "Operation successful!";
                    map.put("SQLCODE", "0");
                    map.put("MESSAGE", "Operation successful!");
                }
            }
            map.put("success", true);
            map.put("lstData", lstData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    public boolean upload(byte[] bytes, String nomArchivo) throws IOException {        
        boolean status = false;
        String rutaFile = serverSession.propertySession.get("RUTA_FILE_NAME").toString();
        Path dir = Paths.get(rutaFile);
        if (!Files.exists(dir)) {
            Files.createDirectory(dir);
        }
        String strArchivo = rutaFile + "\\" + nomArchivo;
        File archivo = new File(strArchivo);
        FileOutputStream fs = new FileOutputStream(archivo);
        fs.write(bytes);
        fs.flush();
        fs.close();        
        status = true;
        return status;
    }
    
    public Boolean procesaExcel(A1789Filter filter) throws IOException, BiffException, SQLException, Exception {
        boolean status = false;
        String ext = FilenameUtils.getExtension(filter.fileName);
        String rutaFile = serverSession.propertySession.get("RUTA_FILE_NAME").toString();
        String strArchivo = rutaFile + "\\" + filter.fileName;
        String strTKT;
       
        if ("xls".equals(ext)) { 
            status = true;
            A1789Filter param;                       
            // Cargar array desde el file xls
            File inputWorkbook = new File(strArchivo);
            jxl.Workbook w;
            w = jxl.Workbook.getWorkbook(inputWorkbook);
            jxl.Sheet sheet = w.getSheet(0);
            
             for (int row = 0; row < sheet.getRows(); row++) {
                  if ( /*row != 0  &&*/ !"".equals(sheet.getCell(0, row).getContents().trim())){
                        param = new A1789Filter();
                        param.VP_FPERDES = filter.VP_FPERDES; 
                        param.VP_FPERHAS = filter.VP_FPERHAS;                          
                        strTKT = getValueString(sheet.getCell(6, row)).replace(".", "");                         
                        strTKT = (strTKT.length() >= 10) ? strTKT.substring(0, 10) : Util.fillZeros(10, strTKT);
                        //<editor-fold defaultstate="collapsed" desc="{...}">
                        param.VP_OPCION     = "G";
                        param.VP_CCUST      = "139";
                        param.A1789CIA      = "139";
                        param.A1789FORMA    = strTKT.substring(0, 4);
                        param.A1789SERIE    = strTKT.substring(4, 10);
                        param.A1789IATA     = getValueString( sheet.getCell(0, row));
                        param.A1789PNR      = getValueString( sheet.getCell(2, row));
                        param.A1789TFORM    = getValueString( sheet.getCell(5, row));
                        param.A1789FECVT    = sheet.getCell(7, row).getContents(); 
                        param.A1789TCAMB    = 0d;                            
                        param.A1789MDA      = getValueString( sheet.getCell(11, row)); 
                        param.A1789STOTA    = getValuedbl(sheet.getCell(9, row));
                        param.A1789TOTAL    = getValuedbl(sheet.getCell(10, row));
                        param.A1789COMR     = 0d;
                        param.A1789COMC     = 0d;
                        param.A1789AJUS     = 0d;
                        param.A1789IVA      = 0d;
                        param.A1789STAT     = "P";
                        param.A1789NGPS     = getValueString( sheet.getCell(1, row));
                        param.A1789SRES     = getValueString( sheet.getCell(3, row));
                        param.A1789NPAX     = getValueString( sheet.getCell(8, row));    
                         //</editor-fold>                                                  
                        logic = new LoadFileLogic();
                        logic.setSession((IServerSession) serverSession.getServerSession());
                        logic.setSQP01117(param);                                                    
                        if(!Util.fillZeros(7, param.dbException.SQLCODE).equals("0000000")){                                      
                           status = false;
                           break;
                        }
                  }
             }                     
        }
        return status;
    }
    
    private String getValueString(jxl.Cell cell){
        String v = "";
        if ( !"".equals(cell.getContents().trim()) )
            v = ((jxl.LabelCell)cell).getString();
        else
            v = "";
        return v;
    } 
    
    private double getValuedbl( jxl.Cell cell ){        
        double v = 0.0;
        if ( !"".equals(cell.getContents().trim()) ){
             v = (double)((jxl.NumberCell)cell).getValue();             
        }
        return v;
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<SQP01170Filter> listaData;
        filter = new SQP01170Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Load File - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_CCUST = request.getParameter("VP_CCUST").trim();
            filter.VP_FCARGA1 = request.getParameter("VP_FCARGA1").trim();
            filter.VP_FCARGA2 = request.getParameter("VP_FCARGA2").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new LoadFileLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP01170(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Load File");
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

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Date Load");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Period From");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Period to");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Records");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Status");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("User");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("Date");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Time");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);

            sheet.autoSizeColumn(3, true);

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);

                cell50.setCellValue(listaData.get(vi).FCARGA);
                cell51.setCellValue(listaData.get(vi).FPERDES);
                cell52.setCellValue(listaData.get(vi).FPERHAS);
                cell53.setCellValue(listaData.get(vi).TOTALRE);
                cell54.setCellValue(listaData.get(vi).ESTADO);
                cell55.setCellValue(listaData.get(vi).USCREA);
                cell56.setCellValue(listaData.get(vi).FECREA);
                cell57.setCellValue(listaData.get(vi).HOCREA);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                // </editor-fold>
                
                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
