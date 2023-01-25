/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import javax.servlet.http.HttpServletRequest;
import org.apache.poi.ss.usermodel.Workbook;
import java.util.Collections;
import java.util.Comparator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.utils.Functions;
import org.apache.catalina.connector.ClientAbortException;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author asifuentes
 */
public final class ExportUtil {
    //private static final XSSFColor COLOR_HEADER = new XSSFColor(new java.awt.Color(127, 152, 168));
    
    /**
     * Rutina para generar un Excel (formato 2007 o posterior) a partir del proveedor de datos especificado.
     * @param response Variable del servidor (HttpServletResponse). Parametro por referencia.
     * @param downloadName Nombre con el que se va a descargar el archivo en el explorador web (cliente)
     * @param _class Clase base del proveedor de datos (Class)
     * @param list Proveedor de datos a exportar (List)
     * @param mapFields Mapeo de las columnas; descripcion de la cabecera del campo a exportar y codigo del campo (Map<String, String>)
     * @throws NullPointerException si alguno de los parametros enviados es nulo o el nombre de alguno de los campos existe como propiedad en la clase base (Java Reflect)
     */
    public static void exportToXLSX(HttpServletResponse response, String downloadName, Class _class, List list, Map<String, String> mapFields) {//String[] _headers, String[] _fields
        //Declaración de variables
        String nombreHoja = "Sheet1";
        Workbook workbook = null;
        Sheet sheet = null;
        
        try {
           
            //Instanciar libro de trabajo
            workbook = new XSSFWorkbook();

            //Instanciar hoja de trabajo
            sheet = workbook.createSheet(nombreHoja);
            
            //Reflection: Obtener valores del array de campos
            
            Set keys = mapFields.keySet();
            
            //Generar cabecera
            Row rowHeader = sheet.createRow(0);
            Integer headerIndex = 0;

            DataFormat df = workbook.createDataFormat();
            CellStyle headerStyle = workbook.createCellStyle();
            
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setFont(headerFont);
            
            for (Iterator i = keys.iterator(); i.hasNext(); ) {
                String header = (String) i.next();
                Cell cell = rowHeader.createCell(headerIndex);
                cell.setCellValue(header);
                cell.setCellStyle(headerStyle);
                headerIndex++;
            }
            
            //Generar filas de datos
            Integer rowIndex = 1;
            
            CellStyle rowStyle = workbook.createCellStyle();
            
            rowStyle.setBorderRight(CellStyle.BORDER_THIN);
            rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
            rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
            rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            rowStyle.setBorderTop(CellStyle.BORDER_THIN);
            rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            
            for (Object obj : list){
                
                Row row = sheet.createRow(rowIndex);
                Integer cellIndex = 0;
                
                for (Iterator i = keys.iterator(); i.hasNext(); ) {
                    String header = (String) i.next();
                    String fieldName = (String) mapFields.get(header);
                    Field field = _class.getField(fieldName);
                    String value = field.get(obj).toString();
                    
                    Cell cell = row.createCell(cellIndex);
                    
                    String type = field.getType().getCanonicalName();
                    
                    switch(type){
                        case "int": cell.setCellValue(Integer.parseInt(value)); break;
                        case "double": cell.setCellValue(Double.parseDouble(value)); break;
                        case "float": cell.setCellValue(Float.parseFloat(value)); break;
                        default: cell.setCellValue(value); break;
                    }
                    
                    
                    cell.setCellStyle(rowStyle);
                    
                    cellIndex++;
                }
                
                rowIndex++;
            }
            
            autoSizeColumns(workbook);
            
            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());
        } catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }
    
    
    /**
     * Rutina para generar un Excel (formato 2007 o posterior) a partir del proveedor de datos especificado.
     * @param response Variable del servidor (HttpServletResponse). Parametro por referencia.
     * @param downloadName Nombre con el que se va a descargar el archivo en el explorador web (cliente)
     * @param _class Clase base del proveedor de datos (Class)
     * @param list Proveedor de datos a exportar (List)
     * @param schema Mapeo de las columnas serializadas desde el esquema de columnas del DataStore (ExtJS)
     * @throws NullPointerException si alguno de los parametros enviados es nulo o el nombre de alguno de los campos existe como propiedad en la clase base (Java Reflect)
     */
    public static void exportToXLSX(HttpServletResponse response, String downloadName, Class _class, List list, ExportSchema schema) {
        ExportSchema footer = new ExportSchema();
        _exportToXLSX(response, downloadName, _class, list, schema);
    }
    
    private static void _exportToXLSX(HttpServletResponse response, String downloadName, Class _class, List list, ExportSchema schema) {
        //Declaración de variables
        String nombreHoja = "Sheet1";
        Workbook workbook = null;
        Sheet sheet = null;
        
        try {
           
            //Instanciar libro de trabajo
            workbook = new XSSFWorkbook();

            //Instanciar hoja de trabajo
            sheet = workbook.createSheet(nombreHoja);
            
            DataFormat df = workbook.createDataFormat();
            CellStyle headerStyle = workbook.createCellStyle();
            
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setFont(headerFont);
            
            List<String> fields = new ArrayList<String>();
            List<ExportSchema> headers = new ArrayList<ExportSchema>();
            
            int i, maxLevel = 0;
            ExportSchema temp = new ExportSchema();
            
            List<Integer> levels = new ArrayList<Integer>();
            
            getMaxLevel(schema, 0, levels);
            maxLevel = levels.get(levels.size() - 1);
            getHeaderRow(schema, headers, fields, temp, maxLevel);
            
            for(ExportSchema childTemp:temp.tempFields){
                childTemp.text = childTemp.text.replaceAll("<br />", " ");
                childTemp.text = childTemp.text.replaceAll("<br/>", " ");
                childTemp.text = childTemp.text.replaceAll("<br>", " ");
                childTemp.text = childTemp.text.replaceAll("<br >", " ");
                
                if(headers.get(maxLevel-1).headerRows.size() < childTemp.index - 1){
                    headers.get(headers.size() - 1).headerRows.add(childTemp);
                }else{
                    headers.get(headers.size() - 1).headerRows.add(childTemp.index - 2, childTemp);
                }
            }
            int headersQty = headers.size();
            Integer headerIndex = 0;
            
            for(ExportSchema _header:headers){
                int f,fieldsCount = _header.headerRows.size();
                
                //Generar cabecera
                Row rowHeader = sheet.createRow(headerIndex);
                
                int cellIndex = 0;
                
                for(f=0;f<fieldsCount;f++){
                    ExportSchema schemaHeader = _header.headerRows.get(f);
                    
                    int[] n = new int[1];
                    getNodesCount(schemaHeader, n, maxLevel);
                    schemaHeader.cells = n[0];
                    String header = schemaHeader.text;
                    
                    Cell cell = rowHeader.createCell(cellIndex);
                    rowHeader.createCell(cellIndex);
                    
                    if(schemaHeader.cells>1){
                        CellRangeAddress cellRangeAddress = new CellRangeAddress(headerIndex, headerIndex, cellIndex, cellIndex + schemaHeader.cells - 1);
                        sheet.addMergedRegion(cellRangeAddress);
                        cellIndex = cellIndex + (schemaHeader.cells - 1);
                        
                        RegionUtil.setBorderTop(CellStyle.BORDER_THIN, cellRangeAddress, sheet, workbook);
                        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, cellRangeAddress, sheet, workbook);
                        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, cellRangeAddress, sheet, workbook);
                        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, cellRangeAddress, sheet, workbook);
                    }
                    
                                            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                    cell.setCellStyle(headerStyle);
                    cell.setCellValue(header);
                    cellIndex++;
                }
                
                headerIndex++;
            }
            
            /*for (Iterator i = keys.iterator(); i.hasNext(); ) {
                String header = (String) i.next();
                Cell cell = rowHeader.createCell(headerIndex);
                cell.setCellValue(header);
                cell.setCellStyle(headerStyle);
                headerIndex++;
            }*/
            
            
            //Reflection: Obtener valores del array de campos
            //Set keys = mapFields.keySet();
            
            
            //Generar filas de datos
            Integer rowIndex = headersQty;
            
            CellStyle rowStyle = getCellStyle(workbook, "default");
            CellStyle intRowStyle = getCellStyle(workbook, "int");
            CellStyle floatRowStyle = getCellStyle(workbook, "float");
            
            for (Object obj : list){
                
                Row row = sheet.createRow(rowIndex);
                Integer cellIndex = 0;
                
                for (String dataIndex: fields) {
                    String fieldName = dataIndex;
                    Field field = _class.getField(fieldName);
                    String value = field.get(obj).toString();
                    
                    Cell cell = row.createCell(cellIndex);
                    
                    String type = field.getType().getCanonicalName();
                    
                    for(ExportSchema head:headers.get(0).headerRows){
                        if(fieldName.equals(head.dataIndex)){
                            type = head.type;
                            break;
                        }
                    }
                    
                    switch(type){
                        case "int": case "long": {
                            long longVal = Math.round(Double.parseDouble(value));
                            cell.setCellValue(longVal);
                            cell.setCellStyle(intRowStyle);
                        } break;
                        case "float":
                        case "double": {
                            cell.setCellValue(Double.parseDouble(value));
                            cell.setCellStyle(floatRowStyle);
                        } break;
//                        case "float": {
//                            cell.setCellValue(Float.parseFloat(value));
//                            cell.setCellStyle(floatRowStyle);
//                        } break;
                        default: {
                            cell.setCellValue(value);
                            cell.setCellStyle(rowStyle);
                        } break;
                    }
                    
                    cellIndex++;
                }
                
                rowIndex++;
            }

            //Footer print
            Row row = sheet.createRow(rowIndex);

            if(schema.footerRows.size()>0){
                CellStyle footerStyle = workbook.createCellStyle();
                
                
                footerStyle.setBorderRight(CellStyle.BORDER_THIN);
                footerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                footerStyle.setBorderBottom(CellStyle.BORDER_THIN);
                footerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                footerStyle.setBorderLeft(CellStyle.BORDER_THIN);
                footerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                footerStyle.setBorderTop(CellStyle.BORDER_THIN);
                footerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                footerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
                footerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                footerStyle.setFont(headerFont);
                
                //Apply background style
                int bf, bn = fields.size();
                for(bf=0;bf<bn;bf++){
                    Cell cell = row.createCell(bf);
                    cell.setCellStyle(headerStyle);
                }
                
                CellStyle footerRowStyle = getFooterCellStyle(workbook, "default");
                CellStyle footerIntRowStyle = getFooterCellStyle(workbook, "int");
                CellStyle footerFloatRowStyle = getFooterCellStyle(workbook, "float");
                
                for (ExportSchema schemaFooter: schema.footerRows) {
                    Object obj = list.get(0);
                    String dataIndex = schemaFooter.dataIndex;
                    String fieldName = dataIndex;
                    Field field = _class.getField(fieldName);
                    String value = field.get(obj).toString();

                    Cell cell = row.createCell(schemaFooter.index);

                    String type = field.getType().getCanonicalName();

                    type = headers.get(1).headerRows.get(schemaFooter.index).type;
                    
                    switch(type){
                        case "int": case "long": {
                            long longVal = Math.round(Double.parseDouble(value));
                            cell.setCellValue(longVal);
                            cell.setCellStyle(footerIntRowStyle);
                        } break;
                        case "double": {
                            cell.setCellValue(Double.parseDouble(value));
                            cell.setCellStyle(footerFloatRowStyle);
                        } break;
                        case "float": {
                            cell.setCellValue(Float.parseFloat(value));
                            cell.setCellStyle(footerFloatRowStyle);
                        } break;
                        default: {
                            cell.setCellValue(value);
                            cell.setCellStyle(footerRowStyle);
                        } break;
                    }
                }
            }
            
            
//            autoSizeColumns(workbook);
            
            
//            Sheet sheet = workbook.getSheetAt(0);
            for(int z=0 ; z<= schema.columns.length ; z++){
//                sheet.autoSizeColumn(z,true);
                sheet.setColumnWidth(z, 3000);
            }
            
            
            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());
        } catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }    
    
    private static CellStyle getCellStyle(Workbook workbook, String style){
        CellStyle rowStyle = workbook.createCellStyle();

        rowStyle.setBorderRight(CellStyle.BORDER_THIN);
        rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
        rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
        rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderTop(CellStyle.BORDER_THIN);
        rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        
        if("int".equals(style)){
            rowStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
        }
        
        if("float".equals(style)){
            rowStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
        }
        
        return rowStyle;
    }
    
    private static CellStyle getFooterCellStyle(Workbook workbook, String style){
        CellStyle rowStyle = workbook.createCellStyle();

        rowStyle.setBorderRight(CellStyle.BORDER_THIN);
        rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
        rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
        rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderTop(CellStyle.BORDER_THIN);
        rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        
        if("int".equals(style)){
            rowStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
        }
        
        if("float".equals(style)){
            rowStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
        }
        
        return rowStyle;
    }    
    
    private static void getMaxLevel(ExportSchema schema, int n, List<Integer> levels){
        if(schema.level > n){
            n = schema.level;
            
            boolean exists = false;
            for(Integer x:levels){
                if(x == n){
                    exists = true;
                    break;
                }
            }
            
            if(!exists) levels.add(schema.level);
        }
        
        if(schema.columns != null){
            for(ExportSchema child:schema.columns){
                getMaxLevel(child, n, levels);
            }
        }
    }
    
    private static void getHeaderRow(ExportSchema schema, List<ExportSchema> headers, List<String> fields, ExportSchema temp, int maxLevel){
        if(!"".equals(schema.dataIndex)) fields.add(schema.dataIndex);
        addRowHeader(schema, headers, fields, temp, maxLevel);
        
        if(schema.columns != null){
            for(ExportSchema column: schema.columns){
                getHeaderRow(column, headers, fields,temp, maxLevel);
            }
        }
    }
    
    private static void addRowHeader(ExportSchema schema, List<ExportSchema> headers, List<String> fields, ExportSchema temp, int maxLevel){
        boolean find = false; 
        
        //String title = schema.text;
        //schema.text = "";
        
        if(schema.level>0){
            for(ExportSchema header:headers){
                if(header.level == schema.level){
                    schema.text = schema.text.replaceAll("<br />", " ");
                    schema.text = schema.text.replaceAll("<br/>", " ");
                    schema.text = schema.text.replaceAll("<br>", " ");
                    schema.text = schema.text.replaceAll("<br >", " ");
                    header.headerRows.add(schema);
                    find = true;
                    break;
                }
            }
            
            if(!find){
                ExportSchema newRowSchema = new ExportSchema();
                newRowSchema.level = schema.level;
                
                schema.text = schema.text.replaceAll("<br />", " ");
                schema.text = schema.text.replaceAll("<br/>", " ");
                schema.text = schema.text.replaceAll("<br>", " ");
                schema.text = schema.text.replaceAll("<br >", " ");                
                newRowSchema.headerRows.add(schema);
                headers.add(newRowSchema);
            }
            
            if(schema.columns == null && !"".equals(schema.dataIndex) && schema.level != maxLevel){
                ExportSchema tempField = new ExportSchema();
                
                tempField.index = fields.size() + 1;
                //tempField.text = title;
                tempField.dataIndex = "";
                //tempField.cells = 0;
                temp.tempFields.add(tempField);
            }
        }
    }
    
    private static void getNodesCount(ExportSchema schema, int[] n, int maxLevel){
        if(schema.columns != null){
            for(ExportSchema schemaChild:schema.columns){
                getNodesCount(schemaChild, n, maxLevel);
            }
        }
        
        if(maxLevel == schema.level || !"".equals(schema.dataIndex)){
            n[0]++;
        }
    }    
    
    private static void autoSizeColumns(Workbook workbook) {
        int numberOfSheets = workbook.getNumberOfSheets();
        for (int i = 0; i < numberOfSheets; i++) {
            Sheet sheet = workbook.getSheetAt(i);
            if (sheet.getPhysicalNumberOfRows() > 0) {
                Row row = sheet.getRow(0);
                Iterator<Cell> cellIterator = row.cellIterator();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    int columnIndex = cell.getColumnIndex();
                    sheet.autoSizeColumn(columnIndex);
                }
            }
        }
    }




    
    public static String  exportFields(HttpServletRequest request, HttpServletResponse response,List<?> lstDataObjects) throws IOException {
        
        
        String downloadName = String.format("Reporte_%1$s.xlsx", Functions.getFechaActual()+"_" +Functions.getHoraActual());
        
        ExportSchema filter = new ExportSchema();
        ExportSchema filterTemp = new ExportSchema();
        ArrayList<ExportSchema> listaColRow = new ArrayList<>();
        
        
//        String beanString = "{'columns':[{'text':'Sales','columns':[{'text':'Date','dataIndex':'strFormatDate','width':90,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Totals','columns':[{'text':'Coupons','dataIndex':'QTKTS','width':80,'align':'center','listeners':{'click':'viewDetSales_colHandler','args':['MIN']}}]},"
//                + "           {'text':'Fare','columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]},"
//                + "           {'text':'Percent','dataIndex':'perMim','width':70},"
//                + "           {'text':'AVG','dataIndex':'avgMim','width':70}] }";
        
//        String beanString = "{'columns':[{'text':'Agent','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},"
//                + "{'text':'Ctry','dataIndex':'COUNTRYS','width':50,'align':'center'},"
//                + "{'text':'Scr','dataIndex':'strDescription2','width':50,'align':'center'},"
//                + "{'text':'Type','dataIndex':'TDOC','width':50,'align':'center'},"
//                + "{'text':'Ticket Number','dataIndex':'TKT','width':120,'align':'center'},"
//                + "{'text':'Date of','columns':[{'text':'Sale','dataIndex':'FEAC','width':90,'align':'center'}]},"
//                + "{'text':'Org - Des','dataIndex':'CITYS','width':80,'align':'center'},"
//                + "{'text':'Miles','dataIndex':'PMP','width':80},"
//                + "{'text':'Cl','dataIndex':'CLASEO','width':30,'align':'center'},"
//                + "{'text':'Fare Basis','dataIndex':'FAREBASE','width':90,'align':'center'},"
//                + "{'text':'Rev. by Miles','columns':[{'text':'Sold','dataIndex':'FACRMI','width':90,'align':'center'}]},"
//                + "{'text':'Fare USD','columns':[{'text':'Sold','columns':[{'text':'Code','dataIndex':'VENDOR','width':90,'align':'center'},{'text':'Name','dataIndex':'strDescription','width':200,'align':'left'}]},{'text':'Min. -50%','dataIndex':'VALORMIN','width':80},{'text':'Normal(Est)','dataIndex':'VALORBAS','width':80},{'text':'Diff','dataIndex':'DIFFNORMAL','width':70}]},"
//                + "{'text':'Ultima','dataIndex':'PMP','width':80}"
//                + "]}";
        String columns = "{\"columns\":" + request.getParameter("columns") + "}";
        
//        String columns = "{'text':'2020','text':'2020','level':20,'columns':[{'text':'USD','dataIndex':'AMOUNT','width':90,'align':'center'}]} ";
                
        filter = new Gson().fromJson(columns, filter.getClass());
        
                
        ExportSchema[] column = filter.columns;
        
        
        
        
        
        // Creamos el archivo donde almacenaremos la hoja
        // de calculo, recuerde usar la extension correcta,
        // en este caso .xlsx
//        File archivo = new File("C:\\Dumps\\reporte.xlsx");

        // Creamos el libro de trabajo de Excel formato OOXML
//        Workbook workbook = new XSSFWorkbook();
        XSSFWorkbook workbook = new XSSFWorkbook();
        //Workbook workbook = new HSSFWorkbook();
        
        // La hoja donde pondremos los datos
        Sheet pagina = workbook.createSheet("Report");

        // Creamos el estilo paga las celdas del encabezado
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);

        

        int nivel = 0;//Fila 0
        int qty_filas_cabe = 0;//Fila 0
        
        int q_lvl1= -1;
        int q_lvl2= -1;
        int q_lvl3= -1;
        for (ExportSchema obj1 : filter.columns) {
            nivel = 1 ;
            q_lvl1 = q_lvl1 + 1;
            if (obj1.columns != null) {
                if(qty_filas_cabe < 1){
                    qty_filas_cabe = 1 ;
                }
                q_lvl1 = q_lvl1 + (obj1.columns.length - 1);
                
                for (ExportSchema obj2 : obj1.columns) {
                    nivel = 2 ;
                    q_lvl2 = q_lvl2 + 1;
                    if (obj2.columns != null) {
                        if(qty_filas_cabe < 2){
                            qty_filas_cabe = 2 ;
                        }
                        q_lvl2 = q_lvl2 + (obj2.columns.length -1);
                        
                        for (ExportSchema obj3 : obj2.columns) {
                            nivel = 3 ;
                            q_lvl3 = q_lvl3 + 1;
                            if (obj3.columns != null) {
                                if(qty_filas_cabe < 3){
                                    qty_filas_cabe = 3 ;
                                }
                                q_lvl3 = q_lvl3 + (obj3.columns.length -1);
                            }
                        }
                    }
                }
            }
            
            switch(nivel){
                case 1:
                    obj1.index = q_lvl1;
                    break;
                case 2:
                    obj1.index = q_lvl2;
                    break;
                case 3:
                    obj1.index = q_lvl3;
                    break;
                default:
                    obj1.index = -20;
                    break;
                    
            }
            q_lvl1= -1;
            q_lvl2= -1;
            q_lvl3= -1;
        }
        
        
        System.out.println(nivel);
        Row fila ;
        for (int r = 0; r <= nivel; r++) {
            // Creamos una fila en la hoja en la posicion 0
            fila = pagina.createRow(r);
            
            if(r == 0){
                int ini_col=0; 
                int end_col=0; 
                int ini_row=0; 
                int end_row=0; 
                filterTemp = filter;
                
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {
                    // Creamos una celda en esa fila, en la posicion 
                    // indicada por el contador del ciclo
                    Cell celda = fila.createCell(ini_col);

                    // Indicamos el estilo que deseamos 
                    // usar en la celda, en este caso el unico 
                    // que hemos creado
                    celda.setCellStyle(style);
        //            celda.setCellValue(titulos[i]);
                    celda.setCellValue(filterTemp.columns[i].text);



                    if(filterTemp.columns[i].columns != null ){
                        System.out.println(filterTemp.columns[i].columns.length);
                        end_col = ini_col + filterTemp.columns[i].index ;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, end_row, ini_col, end_col));
                        formatcelRegion(ini_row, end_row, ini_col, end_col,workbook,pagina,listaColRow,filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: "+ini_row + " row_end: "+end_row + " col_init : " +  ini_col + " col_end : " + end_col+ "  text : " + filterTemp.columns[i].text);
                    }else{
                        end_col = ini_col  ;
//                        pagina.addMergedRegion(new CellRangeAddress(ini_row, nivel, ini_col, end_col));
                        formatcelRegion(ini_row, nivel, ini_col, end_col,workbook,pagina,listaColRow,filterTemp.columns[i].dataIndex);
                        System.out.println("row_ini: "+ini_row + " row_end: "+nivel + " col_init : " +  ini_col + " col_end : " + end_col+ "  text : " + filterTemp.columns[i].text);
                    }




                    ini_col = end_col + 1;
                    /*

                            //rowFrom,rowTo,colFrom,colTo
            //                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));*/
                }
            }
            else if(r == 1){
                System.out.println("");
                System.out.println("row"  + r + " : ---*************************************");
                int ini_col=0; 
                int end_col=0; 
                int ini_row=0; 
                int end_row=0; 
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if(filterTemp.columns[i].columns != null ){
                        
                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {
                            
                            // Creamos una celda en esa fila, en la posicion 
                            
                            Cell celda = fila.createCell(ini_col);
                            celda.setCellStyle(style);
                            celda.setCellValue(col_nvl1.text);



                            if(col_nvl1.columns != null ){
                                System.out.println(col_nvl1.columns.length);
                                end_col = ini_col + col_nvl1.columns.length - 1;
                                System.out.println("row_ini: "+r + " row_end: "+nivel + " col_init : " +  ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, r, ini_col, end_col));
                                formatcelRegion(r, r, ini_col, end_col,workbook,pagina,listaColRow,col_nvl1.dataIndex);

                            }else{
                                end_col = ini_col  ;
                                System.out.println("row_ini: "+r + " row_end: "+nivel + " col_init : " +  ini_col + " col_end : " + end_col + "  text : " + col_nvl1.text);
//                                pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                    formatcelRegion(r, nivel, ini_col, end_col,workbook,pagina,listaColRow,col_nvl1.dataIndex);
                            }


                            ini_col = end_col + 1;
                            
                        }
                    }else{
                        ini_col = ini_col +1;
                    }

                }
                
            }
            else if(r == 2){
                System.out.println("");
                System.out.println("row"  + r + " : ---*************************************");
                int ini_col=0; 
                int end_col=0; 
                int ini_row=0; 
                int end_row=0; 
                // Creamos el encabezado
                for (int i = 0; i < filterTemp.columns.length; i++) {

                    if(filterTemp.columns[i].columns != null ){
                        
                        ExportSchema[] columns_nvl1 = filterTemp.columns[i].columns;
                        for (ExportSchema col_nvl1 : columns_nvl1) {

                            if(col_nvl1.columns != null ){
                                ExportSchema[] columns_nvl2 = col_nvl1.columns;
                                for (ExportSchema col_nvl2 : columns_nvl2) {

                                    // Creamos una celda en esa fila, en la posicion 

                                    Cell celda = fila.createCell(ini_col);
                                    celda.setCellStyle(style);
                                    celda.setCellValue(col_nvl2.text);



                                    if(col_nvl2.columns != null ){
                                        System.out.println(col_nvl2.columns.length);
                                        end_col = ini_col + col_nvl2.columns.length - 1;
                                    }else{
                                        end_col = ini_col  ;
                                    }

                                    System.out.println("row_ini: "+r + " row_end: "+nivel + " col_init : " +  ini_col + " col_end : " + end_col + "  text : " + col_nvl2.text);

//                                    pagina.addMergedRegion(new CellRangeAddress(r, nivel, ini_col, end_col));
                                    formatcelRegion(r, nivel, ini_col, end_col,workbook,pagina,listaColRow,col_nvl2.dataIndex);

                                    ini_col = end_col + 1;

                                }
                                
                            }else{
                                 ini_col = ini_col +1;
                            }
                            
                        }
                    }else{
                        ini_col = ini_col +1;
                    }

                }
                
            }
            
            
        }
        
        Collections.sort(listaColRow, new Comparator<ExportSchema>(){
            public int compare(ExportSchema o1, ExportSchema o2){
                if(o1.colFrom == o2.colFrom)
                    return 0;
                return o1.colFrom < o2.colFrom ? -1 : 1;
            }
       });

        System.out.println("***************************");
        for(ExportSchema obj : listaColRow){


            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(obj.rowFrom, obj.rowTo, obj.colFrom, obj.colTo), pagina, workbook);

            if(obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")){
                System.out.println("*************************** " + obj.colFrom + " " + obj.colTo + " == " +  obj.dataIndex);
            }
            
        }
            
        
        
//        Class clasePrincipal;
//        Set<Class<?>> classes = getAllExtendedOrImplementedTypesRecursively(IMF111Filter.class);
//
//        for (Class<?> clazz : classes) {
//            System.out.println(clazz.getName());
//            clasePrincipal = clazz;
//        }
        
        CellStyle rowStyle = workbook.createCellStyle();

        rowStyle.setBorderRight(CellStyle.BORDER_THIN);
        rowStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
        rowStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
        rowStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        rowStyle.setBorderTop(CellStyle.BORDER_THIN);
        rowStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        
        // Y colocamos los datos en esa fila
        for (int i = 0; i < lstDataObjects.size(); i++) {
            
            // Ahora creamos una fila en la posicion 1
            fila = pagina.createRow((nivel+1) + i);
            
            int j = 0;
            for(ExportSchema obj : listaColRow){
                if(obj.colFrom == obj.colTo && !obj.dataIndex.trim().equals("")){
                    // Creamos una celda en esa fila, en la
                    // posicion indicada por el contador del ciclo
                    Cell celda = fila.createCell(j);
                    
                     
                    Object ob = lstDataObjects.get(i);
                    //Obtengo Clase
                    Class cls = ob.getClass(); 
                    
                    
                    Field f;
                    try {
                        
//                        System.out.println(obj.dataIndex);
                        
                        //Obtengo la Clase a la que pertenece (Clase Normal o extendida)
                        Class<?> x = cls.getField(obj.dataIndex).getDeclaringClass();
                        
                        
                        f = x.getDeclaredField(obj.dataIndex);
                        Class tipo = f.getType();
                        
                        
                        String type= tipo.getSimpleName();
                        
                        
//                        if(tipo.getCanonicalName()){
//                            System.out.println("----" + obj.dataIndex);
//                        }
                        f.setAccessible(true);
                        
                        rowStyle.setAlignment(CellStyle.ALIGN_RIGHT); 
                        switch(type){
                            case "int": celda.setCellValue(Integer.parseInt(String.valueOf(f.get(ob)))); break;
                            case "long": celda.setCellValue(Long.parseLong(String.valueOf(f.get(ob)))); break;
                            case "double": celda.setCellValue(Double.parseDouble(String.valueOf(f.get(ob)))); break;
                            case "float": celda.setCellValue(Float.parseFloat(String.valueOf(f.get(ob)))); break;
                            case "String": celda.setCellValue(String.valueOf(f.get(ob)));
                                           rowStyle.setAlignment(CellStyle.ALIGN_CENTER); break;
                            default: celda.setCellValue(String.valueOf(f.get(ob))); break;
                        }
                        celda.setCellStyle(rowStyle);
//                        String valor = String.valueOf(f.get(ob));
//                        celda.setCellValue(valor);
                        
                    } catch (Exception ex) {
//                        java.util.logging.Logger.getLogger(Test.class.getName()).log(Level.SEVERE, null, ex);
                        
                    }
                    
                    j++;
                }
            }
        }

        // Ahora guardaremos el archivo
        try {
//            // Creamos el flujo de salida de datos,
//            // apuntando al archivo donde queremos 
//            // almacenar el libro de Excel
//            FileOutputStream salida = new FileOutputStream(archivo);
//
//            // Almacenamos el libro de 
//            // Excel via ese 
//            // flujo de datos
//            workbook.write(salida);
//
//            // Cerramos el libro para concluir operaciones
//            salida.close();

            //Especificando cabeceras para exportar en formato Excel
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadName + "\"");

            //Redireccionando el stream hacia el response
            workbook.write(response.getOutputStream());

        } catch (FileNotFoundException ex) {
//            LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de archivos");
            System.out.print(ex.getMessage());
        } catch (IOException ex) {
//            LOGGER.log(Level.SEVERE, "Error de entrada/salida");
            System.out.print(ex.getMessage());
        }
        
        return downloadName;
    }
    
        
    public static void formatcelRegion(int rowFrom,int rowTo,int colFrom,int colTo,Workbook workbook,Sheet pagina,ArrayList<ExportSchema> listaColRow,String dataIndex) throws IOException{
        
            pagina.addMergedRegion(new CellRangeAddress(rowFrom, rowTo, colFrom, colTo));
    //        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
    //        RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
    //        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);
    //        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(rowFrom, rowTo, colFrom, colTo), pagina, workbook);


            ExportSchema obj = new ExportSchema();
            obj.rowFrom = rowFrom;
            obj.rowTo = rowTo;
            obj.colFrom = colFrom;
            obj.colTo = colTo;
            obj.dataIndex = dataIndex;
            listaColRow.add(obj);
        
    }


}