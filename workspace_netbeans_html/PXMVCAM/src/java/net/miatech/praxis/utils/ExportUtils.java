package net.miatech.praxis.utils;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.utils.CustomExcelCell;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("request")
public class ExportUtils {

    private final SXSSFWorkbook wb;

    public ExportUtils() {
        this.wb = new SXSSFWorkbook();
    }

    public SXSSFWorkbook getWorkbook() {
        return wb;
    }

    @Transactional
    public ResponseEntity<byte[]> createExcel(List<Object[]> data, String fileName) throws IOException {
        String fileNameDownload = fileName + ".xlsx";
        try (SXSSFWorkbook workbook = this.wb) {
            String[] nameArr = fileNameDownload.split("\\.");
            String prefix = nameArr[0];
            String suffix = "." + nameArr[1];
            File file = File.createTempFile(prefix + UUID.randomUUID(), suffix);
            Sheet sheet = workbook.createSheet();
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
            headerStyle.setWrapText(true);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

            Row rowHeader = sheet.createRow(0);
            int cols = 0;

            for (Object obj : data.get(0)) {
                Cell ch = rowHeader.createCell(cols);
                ch.setCellValue(obj.toString());
                ch.setCellStyle(headerStyle);
                cols++;
            }

            for (int i = 1; i < data.size(); i++) {
                Row row = sheet.createRow(i);
                for (int x = 0; x < data.get(i).length; x++) {
                    Cell cell = row.createCell(x);
                    Object obj = data.get(i)[x];
                    if (obj == null) {
                        cell.setCellValue("");
                        cell.setCellStyle(bodyStyle);
                        continue;
                    }
                    String dataType = obj.getClass().getSimpleName();
                    switch (dataType) {
                        case "Integer":
                        case "int":
                        case "Long":
                        case "long":
                            cell.setCellValue(Integer.parseInt(obj.toString()));
                            break;
                        case "Double":
                        case "double":
                        case "BigDecimal":
                            cell.setCellValue(Double.parseDouble(obj.toString()));
                            break;
                        case "Boolean":
                        case "boolean":
                            cell.setCellValue(Boolean.parseBoolean(obj.toString()));
                            break;
                        default:
                            cell.setCellValue(obj.toString());
                    }
                    cell.setCellStyle(bodyStyle);
                }
            }

            for (int c = 0; c < cols; c++) {
                sheet.autoSizeColumn(c, false);
                int defaultWidth = 15 * 256;
                if (sheet.getColumnWidth(c) < defaultWidth) {
                    sheet.setColumnWidth(c, defaultWidth);
                }
            }

            try (FileOutputStream fos = new FileOutputStream(file)) {
                workbook.write(fos);
            }

            //descarga en zip
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (ZipOutputStream zos = new ZipOutputStream(baos)) {
                ZipEntry entrada1 = new ZipEntry(fileNameDownload);
                zos.putNextEntry(entrada1);
                zos.write(FileUtils.readFileToByteArray(file));
                zos.closeEntry();

                zos.finish();
            }

            if (file != null) {
                file.delete();
            }

            //respuesta http
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", prefix + ".zip");
            return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
        }
    }

    public ResponseEntity<byte[]> createCustomExcel(List<List<CustomExcelCell>> data, String fileName) throws IOException, Exception {
        String fileNameDownload = fileName + ".xlsx";
        try (SXSSFWorkbook workbook = this.wb) {
            String[] nameArr = fileNameDownload.split("\\.");
            String prefix = nameArr[0];
            String suffix = "." + nameArr[1];
            File file = File.createTempFile(prefix + UUID.randomUUID(), suffix);
            Sheet sheet = workbook.createSheet();
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
            headerStyle.setWrapText(true);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

            Row rowHeader = sheet.createRow(0);
            int cols = 0;

            for (CustomExcelCell obj : data.get(0)) {
                Cell ch = rowHeader.createCell(cols);
                ch.setCellValue(obj.getValue().toString());
                ch.setCellStyle(headerStyle);
                cols++;
            }

            for (int i = 1; i < data.size(); i++) {
                Row row = sheet.createRow(i);
                for (int x = 0; x < data.get(i).size(); x++) {
                    Cell cell = row.createCell(x);
                    CustomExcelCell obj = data.get(i).get(x);
                    if (obj.getValue() == null) {
                        cell.setCellValue("");
                        cell.setCellStyle(bodyStyle);
                        continue;
                    }
                    String dataType = obj.getValue().getClass().getSimpleName();
                    switch (dataType) {
                        case "Integer":
                        case "int":
                        case "Long":
                        case "long":
                            cell.setCellValue(Integer.parseInt(obj.getValue().toString()));
                            break;
                        case "Double":
                        case "double":
                        case "BigDecimal":
                            cell.setCellValue(Double.parseDouble(obj.getValue().toString()));
                            break;
                        case "Boolean":
                        case "boolean":
                            cell.setCellValue(Boolean.parseBoolean(obj.getValue().toString()));
                            break;
                        default:
                            cell.setCellValue(obj.getValue().toString());
                    }
                    if (obj.getCustomStyle() == null) {
                        cell.setCellStyle(bodyStyle);
                    } else {
                        XSSFCellStyle customStyle = (XSSFCellStyle) workbook.createCellStyle();
                        customStyle.setBorderRight(CellStyle.BORDER_THIN);
                        customStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                        customStyle.setBorderBottom(CellStyle.BORDER_THIN);
                        customStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                        customStyle.setBorderLeft(CellStyle.BORDER_THIN);
                        customStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                        customStyle.setBorderTop(CellStyle.BORDER_THIN);
                        customStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                        customStyle.setFillForegroundColor(new XSSFColor(obj.getCustomStyle()));
                        customStyle.setFillPattern(CellStyle.BORDER_THIN);
                        cell.setCellStyle(customStyle);
                    }

                }
            }

            for (int c = 0; c < cols; c++) {
                sheet.autoSizeColumn(c, false);
                int defaultWidth = 15 * 256;
                if (sheet.getColumnWidth(c) < defaultWidth) {
                    sheet.setColumnWidth(c, defaultWidth);
                }
            }

            try (FileOutputStream fos = new FileOutputStream(file)) {
                workbook.write(fos);
            }

            //descarga en zip
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (ZipOutputStream zos = new ZipOutputStream(baos)) {
                ZipEntry entrada1 = new ZipEntry(fileNameDownload);
                zos.putNextEntry(entrada1);
                zos.write(FileUtils.readFileToByteArray(file));
                zos.closeEntry();

                zos.finish();
            }

            if (file != null) {
                file.delete();
            }

            //respuesta http
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", prefix + ".zip");
            return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
        }
    }

}
