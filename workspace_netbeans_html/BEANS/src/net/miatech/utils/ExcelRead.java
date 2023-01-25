/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

/**
 *
 * @author rmayta
 */
public class ExcelRead {

    public ArrayList<ArrayList<String>> readFile(File file){
        return readFile(file.getAbsolutePath());
    }
    
    public ArrayList<ArrayList<String>> readFile(String file){
        try{
            if(file.toUpperCase().endsWith(".XLS")){
                return readFile(new FileInputStream(file));
            }
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
    
    public ArrayList<ArrayList<String>> readFile(FileInputStream file) throws FileNotFoundException, IOException {
        return readFile(new POIFSFileSystem(file));
    }
    
    public ArrayList<ArrayList<String>> readFile(InputStream file) throws FileNotFoundException, IOException {
        return readFile(new POIFSFileSystem(file));
    }
    
    public ArrayList<ArrayList<String>> readFile(POIFSFileSystem poifsFileSystem){
        ArrayList<ArrayList<String>> informacionArchivo = new ArrayList<ArrayList<String>>(0);

        HSSFWorkbook hssfWorkbook = null;

        try {
            hssfWorkbook = new HSSFWorkbook(poifsFileSystem);
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(0);
        Iterator iterator = hssfSheet.rowIterator();

        // Recorro datos de fila en fila
        while(iterator.hasNext()){

            HSSFRow hssfRow = (HSSFRow)iterator.next();
            //Iterator iteratorAuxiliar = hssfRow.cellIterator();
            ArrayList<String> informacionFila = new ArrayList<String>(0);

            //Me barro todos los elementos de una fila
            for(int i = hssfRow.getFirstCellNum(); i < hssfRow.getLastCellNum(); i++){
                HSSFCell hssfCell = hssfRow.getCell(i);
                
                if(hssfCell != null){

                    switch(hssfCell.getCellType()){
                        case HSSFCell.CELL_TYPE_BLANK:      informacionFila.add(""); break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:    informacionFila.add(Boolean.toString(hssfCell.getBooleanCellValue())); break;
                        case HSSFCell.CELL_TYPE_FORMULA:    informacionFila.add(hssfCell.getStringCellValue()); break;
                        case HSSFCell.CELL_TYPE_NUMERIC:    informacionFila.add(Double.toString(hssfCell.getNumericCellValue())); break;
                        case HSSFCell.CELL_TYPE_STRING:     informacionFila.add(hssfCell.getStringCellValue()); break;
                        default:
                    }

                }else{
                    informacionFila.add("");
                }
            }

            informacionArchivo.add(informacionFila);
        }

        return informacionArchivo;
    }
    
    public List<List<Cell>> readFileXLSX(FileInputStream file) throws FileNotFoundException, InvalidFormatException, IOException {
        return readFileXLSX(WorkbookFactory.create(file));
    }
    
    public List<List<Cell>> readFileXLSX(InputStream file) throws FileNotFoundException, InvalidFormatException, IOException {
        return readFileXLSX(WorkbookFactory.create(file));
    }
    
    public List<List<Cell>> readFileXLSX(Workbook wb){
        List<List<Cell>> lstBookInfo = new ArrayList<List<Cell>>(0);
        List<Cell> lstRowInfo;

        Sheet sheet;
        Row row;
        Cell cell;
        Iterator rowIterator, colIterator;
        
        sheet = wb.getSheetAt(0);
        rowIterator = sheet.rowIterator();
        while(rowIterator.hasNext()){
            row = (Row)rowIterator.next();
            colIterator = row.cellIterator();
            lstRowInfo = new ArrayList<Cell>(0);
            while (colIterator.hasNext()) {
                cell = (Cell)colIterator.next();
                if (cell != null) {
                    lstRowInfo.add(cell);
                }
            }
            lstBookInfo.add(lstRowInfo);
        }
        return lstBookInfo;
    }
}
