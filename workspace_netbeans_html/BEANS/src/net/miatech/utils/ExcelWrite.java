/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AEROMEXICO                               *
 * Document   : ExcelWrite                                        *
 * Created on : 19-10-2016, 15:34:24                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 19-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author rmayta
 */
public class ExcelWrite {
    private static final int OFFICE_1997_2003_MAX_ROWS = 65536;
    private static final int OFFICE_1997_2003_MAX_COLS = 256;
    private static final int OFFICE_2007_2010_2013_2016_MAX_ROWS = 1048576;
    private static final int OFFICE_2007_2010_2013_2016_MAX_COLS = 16384;
    private File fileXLS;
    private Workbook book;
    public ExcelWrite(){
        
    }
    public void writeFile(OutputStream outputStream) throws FileNotFoundException, IOException {
        book.write(outputStream);
        outputStream.close();
    }
    public void writeFile(String fileAbsPath) throws FileNotFoundException, IOException {
        writeFile(new FileOutputStream(fileAbsPath));
    }
    public void createBook(List<List<String>> arrayData, String filePrefix) throws IOException {
        createBook(arrayData, "", filePrefix);
    }
    public void createBook(List<List<String>> arrayData, String filePath, String filePrefix) throws IOException {
        int cols = (arrayData.size() > 0) ? arrayData.get(0).size(): 0;
        Sheet sheet;
        if(arrayData.size() <= OFFICE_1997_2003_MAX_ROWS && cols <= OFFICE_1997_2003_MAX_COLS){
            book = (Workbook) new HSSFWorkbook();
            if(filePath.length() == 0){
                fileXLS = File.createTempFile(filePrefix, ".xls");
                sheet = book.createSheet(filePrefix);                  // Se crea una sheet dentro del book
            }else{
                fileXLS = new File(filePath + File.separator + filePrefix + ".xls");
                sheet = book.createSheet(fileXLS.getName().substring(0, fileXLS.getName().indexOf(".")));                  // Se crea una sheet dentro del book
            }
            Row row;
            Cell cell;
            RichTextString richText;
            for (short i = 0; i < arrayData.size(); i++) {
                row = sheet.createRow(i);                                           //Se crea una row dentro de la sheet
                for (int j = 0; j < arrayData.get(i).size(); j++) {
                    cell = row.createCell((short) j);                               //Se crea una cell dentro de la row                
                    //HSSFCellStyle estiloCelda = book.createCellStyle();           //Creo el estilo de la cell.
                    //celda.setCellStyle(estiloCelda);
                    richText = (RichTextString) new HSSFRichTextString(arrayData.get(i).get(j));       //Se crea el contenido de la cell y se mete en ella.
                    cell.setCellValue(richText);
                    sheet.autoSizeColumn((short) j);
    //                sheet.setColumnWidth(j, 2000);
                }
            }
        }else if(arrayData.size() <= OFFICE_2007_2010_2013_2016_MAX_ROWS && cols <= OFFICE_2007_2010_2013_2016_MAX_COLS){
            book = new XSSFWorkbook();
            if(filePath.length() == 0){
                fileXLS = File.createTempFile(filePrefix, ".xlsx");
                sheet = book.createSheet(filePrefix);                  // Se crea una sheet dentro del book
            }else{
                fileXLS = new File(filePath + File.separator + filePrefix + ".xlsx");
                sheet = book.createSheet(fileXLS.getName().substring(0, fileXLS.getName().indexOf(".")));                  // Se crea una sheet dentro del book
            }
            Row row;
            Cell cell;
            RichTextString richText;
            for (short i = 0; i < arrayData.size(); i++) {
                row = sheet.createRow(i);                                           //Se crea una row dentro de la sheet
                for (int j = 0; j < arrayData.get(i).size(); j++) {
                    cell = row.createCell((short) j);                               //Se crea una cell dentro de la row                
                    //HSSFCellStyle estiloCelda = book.createCellStyle();           //Creo el estilo de la cell.
                    //celda.setCellStyle(estiloCelda);
                    richText = new XSSFRichTextString(arrayData.get(i).get(j));       //Se crea el contenido de la cell y se mete en ella.
                    cell.setCellValue(richText);
                    sheet.autoSizeColumn((short) j);
    //                sheet.setColumnWidth(j, 2000);
                }
            }
        }
    }
    public void createBookFeature(BookFeature featureBook, List<List<Feature>> featureColumnList, String filePrefix) throws IOException {
        createBookFeature(featureBook, featureColumnList, "", filePrefix);
    }
    public void createBookFeature(BookFeature featureBook, List<List<Feature>> featureColumnList, String filePath, String filePrefix) throws IOException {
        Sheet sheet;
        Map<String, CellStyle> styles;
        book = new XSSFWorkbook();
        if(filePath.length() == 0){
            fileXLS = File.createTempFile(filePrefix, ".xlsx");
        }else{
            fileXLS = new File(filePath + File.separator + filePrefix + ".xlsx");
        }
        sheet = book.createSheet((filePrefix.length() > 31) ? filePrefix.substring(0, 31) : filePrefix);                  // Se crea una sheet dentro del book
        int lcwSize = featureBook.lstColumnWidth.size();
        for (int i = 0; i < lcwSize; i++) {
            sheet.setColumnWidth(i, featureBook.lstColumnWidth.get(i));
        }
        Integer[] aInt;
        for (int i = 0; i < featureBook.lstMergedRegion.size(); i++) {
            aInt = featureBook.lstMergedRegion.get(i);
            sheet.addMergedRegion(new CellRangeAddress(aInt[0], aInt[1], aInt[2], aInt[3]));
        }
        styles = createStyles(book);
        Row row;
        Cell cell;
        List<Feature> lstFeatureColumns;
        Feature featureColumn;
        for (short i = 0; i < featureColumnList.size(); i++) {
            lstFeatureColumns = featureColumnList.get(i);
            row = sheet.createRow(i);                                           //Se crea una row dentro de la sheet
            for (int j = 0; j < lstFeatureColumns.size(); j++) {
                featureColumn = lstFeatureColumns.get(j);
                cell = row.createCell(featureColumn.colIndex);                               //Se crea una cell dentro de la row  
                switch(featureColumn.typeValue){
                    case Feature.STR_VALUE:
                        cell.setCellValue(featureColumn.strValue);
                        break;
                    case Feature.INT_VALUE:
                        if(featureColumn.styleName.equals(Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT_PERCENT)){
                            cell.setCellValue(featureColumn.intValue + "%");
                        }else{
                            cell.setCellValue(featureColumn.intValue);
                        }
                        break;
                    case Feature.LNG_VALUE:
                        if(featureColumn.styleName.equals(Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT_PERCENT)){
                            cell.setCellValue(featureColumn.lngValue + "%");
                        }else{
                            cell.setCellValue(featureColumn.lngValue);
                        }
                        break;
                    case Feature.DBL_VALUE:
                        if(featureColumn.styleName.equals(Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT_PERCENT)){
                            cell.setCellValue(featureColumn.dblValue + "%");
                        }else{
                            cell.setCellValue(featureColumn.dblValue);
                        }
                        break;
                }
                if(!featureColumn.styleName.isEmpty()){
                    if(featureColumn.styleName.equals(Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT_PERCENT)){
                        cell.setCellStyle(styles.get(Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT));
                    }else{
                        cell.setCellStyle(styles.get(featureColumn.styleName));
                    }
                }
                if(j >= lcwSize){
                    sheet.autoSizeColumn(j);
                }
            }
        }
    }
    public File getFile(){
        return fileXLS;
    }
    public Workbook getBook(){
        return book;
    }
    private static Map<String, CellStyle> createStyles(Workbook wb){
        Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
        DataFormat df = wb.createDataFormat();

        CellStyle style;
        Font headerFont = wb.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("header_date", style);

        Font font1 = wb.createFont();
        font1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font1);
        styles.put("cell_b", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font1);
        styles.put("cell_b_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_b_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_g", style);

        Font font2 = wb.createFont();
        font2.setColor(IndexedColors.BLUE.getIndex());
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font2);
        styles.put("cell_bb", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_bg", style);

        Font font3 = wb.createFont();
        font3.setFontHeightInPoints((short)14);
        font3.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font3);
        style.setWrapText(true);
        styles.put("cell_h", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setWrapText(true);
        styles.put("cell_normal", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_normal_centered", style);
        
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_formato_right", style);
        
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("0.00%"));
        styles.put("cell_normal_formato_right_percent", style);
        
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        //style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_normal_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setIndention((short)1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);
        
        Font monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short)12);
        monthFont.setColor(IndexedColors.WHITE.getIndex());
        monthFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont);
        styles.put("cell_totals_left", style);
        
        Font monthFont1 = wb.createFont();
        monthFont1.setFontHeightInPoints((short)12);
        monthFont1.setColor(IndexedColors.WHITE.getIndex());
        monthFont1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont1);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_totals_right", style);
        
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(wb.createDataFormat().getFormat("0.00%"));
        styles.put("cell_porcentaje_right", style);

        return styles;
    }
    private static CellStyle createBorderedStyle(Workbook wb){
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
    public class BookFeature {
        public List<Integer> lstColumnWidth;
        public List<Integer[]> lstMergedRegion;
        public BookFeature(List<Integer> columnWidth, List<Integer[]> mergedRegion){
            lstColumnWidth = columnWidth;
            lstMergedRegion = mergedRegion;
        }
    }
    public class Feature {
        public int rowIndex;
        public int colIndex;
        public String styleName;
        
        public String strValue;
        public int intValue;
        public long lngValue;
        public double dblValue;
        
        protected static final int STR_VALUE = 0;
        protected static final int INT_VALUE = 1;
        protected static final int LNG_VALUE = 2;
        protected static final int DBL_VALUE = 3;
        
        public static final String STYLE_CELL_EMPTY = "";
        public static final String STYLE_CELL_HEADER = "header";
        public static final String STYLE_CELL_HEADER_DATE = "header_date";
        public static final String STYLE_CELL_B = "cell_b";
        public static final String STYLE_CELL_B_CENTERED = "cell_b_centered";
        public static final String STYLE_CELL_B_DATE = "cell_b_date";
        public static final String STYLE_CELL_G = "cell_g";
        public static final String STYLE_CELL_BB = "cell_bb";
        public static final String STYLE_CELL_BG = "cell_bg";
        public static final String STYLE_CELL_H = "cell_h";
        public static final String STYLE_CELL_NORMAL = "cell_normal";
        public static final String STYLE_CELL_NORMAL_CENTERED = "cell_normal_centered";
        public static final String STYLE_CELL_NORMAL_FORMAT_RIGHT = "cell_normal_formato_right";
        public static final String STYLE_CELL_NORMAL_FORMAT_RIGHT_PERCENT = "cell_normal_formato_right_percent";
        public static final String STYLE_CELL_NORMAL_RIGHT = "cell_normal_right";
        public static final String STYLE_CELL_NORMAL_DATE = "cell_normal_date";
        public static final String STYLE_CELL_INDENTED = "cell_indented";
        public static final String STYLE_CELL_BLUE = "cell_blue";
        public static final String STYLE_CELL_TOTALS_LEFT = "cell_totals_left";
        public static final String STYLE_CELL_TOTALS_RIGHT = "cell_totals_right";
        public static final String STYLE_CELL_PERCENT_RIGHT = "cell_porcentaje_right";
        
        protected int typeValue;
        
        public Feature(int row, int col, String style, String value){
            rowIndex = row;
            colIndex = col;
            styleName = style;
            strValue = value;
            typeValue = STR_VALUE;
        }
        
        public Feature(int row, int col, String style, int value){
            rowIndex = row;
            colIndex = col;
            styleName = style;
            intValue = value;
            typeValue = INT_VALUE;
        }
        
        public Feature(int row, int col, String style, long value){
            rowIndex = row;
            colIndex = col;
            styleName = style;
            lngValue = value;
            typeValue = LNG_VALUE;
        }
        
        public Feature(int row, int col, String style, double value){
            rowIndex = row;
            colIndex = col;
            styleName = style;
            dblValue = value;
            typeValue = DBL_VALUE;
        }
        
    }
    public static void main(String args[]) throws IOException {
//        List<List<String>> lst = new ArrayList<>();
//        List<String> lstRow;
//        lstRow = new ArrayList<String>();
//        lstRow.add("CIA");
//        lstRow.add("FORMA");
//        lstRow.add("SERIE");
//        lstRow.add("CUPON");
//        lst.add(lstRow);
//        lstRow = new ArrayList<String>();
//        lstRow.add("123");
//        lstRow.add("4567");
//        lstRow.add("890123");
//        lstRow.add("4");
//        lst.add(lstRow);
//        
//        File f = new File(System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "ejemploExcelJava.xls");
//        ExcelWrite.writeFile(lst, f.getAbsolutePath());
//        Desktop.getDesktop().open(f);

//Ejemplo 2:
//        ExcelWrite ew;
//        List<List<ExcelWrite.Feature>> lstXLS = new ArrayList<>();
//        List<ExcelWrite.Feature> lstItem;
//        List<Integer> columnWidth;
//        List<Integer[]> mergedRegion;
//        
//        ew = new ExcelWrite();
//        columnWidth = new ArrayList<>();
//        mergedRegion = new ArrayList<>();
//        
//        columnWidth.add(4*500);
//        columnWidth.add(13*500);
//        columnWidth.add(13*500);
//        columnWidth.add(13*500);
//        
//        lstItem = new ArrayList<>();
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_HEADER, "Carrier"));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_HEADER, "Ticket"));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_HEADER, "Coupon Number"));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_HEADER, "Amount"));
//        lstXLS.add(lstItem);
//        for (int i = 0; i < 10; i++) {
//            lstItem = new ArrayList<>();
//            lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_NORMAL_CENTERED, "808"));
//            lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT, "1254986532"));
//            lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_NORMAL_FORMAT_RIGHT, "1"));
//            lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_NORMAL_CENTERED, i * 658));
//            lstXLS.add(lstItem);
//        }
//        lstItem = new ArrayList<>();
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_EMPTY, ""));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_TOTALS_LEFT, "TOTALS:"));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_TOTALS_RIGHT, 2456));
//        lstItem.add(ew.new Feature(lstXLS.size(), lstItem.size(), ExcelWrite.Feature.STYLE_CELL_TOTALS_RIGHT, 2165));
//        lstXLS.add(lstItem);
//        
//        ew.createBookFeature(
//                ew.new BookFeature(columnWidth, mergedRegion), lstXLS,
//                "D:\\UserFiles\\rmayta\\Escritorio",
//                "ejemploExcelJava"
//        );
//        ew.getBook().write(new BufferedOutputStream(new FileOutputStream(ew.getFile())));
    }
}

