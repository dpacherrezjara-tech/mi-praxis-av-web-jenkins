package net.miatech.praxis.controllers.payments;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.praxis.logic.payments.BankReconciliationExtLogic;
import net.miatech.praxis.payment.dto.LoadExcelEECC;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/BankReconciliationExt")
@Scope("request")
public class BankReconciliationExtController {

    @Autowired
    private BankReconciliationExtLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    @RequestMapping(value = "loadBankStatements")
    public ResponseEntity<?> loadStatements(SPBSR001Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        SPBSR001Filter filter = logic.loadSPBSR001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadStatementInfo")
    public ResponseEntity<?> loadStatementInfo(SPBSR002Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadStatementInfo *****");
        SPBSR002Filter filter = logic.loadSPBSR002Filter(params);
        System.out.println("Item Found");
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSettlements")
    public ResponseEntity<?> loadSettlements(SPBSR003Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlements *****");
        SPBSR003Filter filter = logic.loadSPBSR003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSettlementInfo")
    public ResponseEntity<?> loadSettlementInfo(SPBSR004Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlementInfo *****");
        SPBSR004Filter filter = logic.loadSPBSR004Filter(params);
        System.out.println("Item Found");
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSettlementScanner")
    public ResponseEntity<?> loadSettlementScanner(SPBSR005Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlementScanner *****");
        SPBSR005Filter filter = logic.loadSPBSR005Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "downloadExcelEECC",method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelEECC(@RequestBody LoadExcelEECC params) throws Exception {
        System.out.println("***** BankReconciliationExt - downloadExcelEECC *****");
        System.out.println("Bandoc loaded: " + params.getBankInfo().getBANDOC());
        System.out.println("Settlements loaded: " + params.getSettlements().size());
        System.out.println("Headers loaded: " + params.getHeaders().size());
        System.out.println("Taxes loaded: " + params.getTaxes().size());
        SXSSFWorkbook workbook = new SXSSFWorkbook();
        Sheet sheet = workbook.createSheet("Settlements");
        
        XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
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
        
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Client");
        headerRow.createCell(1).setCellValue("Processing Date");
        headerRow.createCell(2).setCellValue("Settlement");
        headerRow.createCell(3).setCellValue("Payment\nCurrency");
        headerRow.createCell(4).setCellValue("Payment\nAmount");
        headerRow.createCell(5).setCellValue("Payment\nDate");
        headerRow.createCell(6).setCellValue("Sale\nDate");
        headerRow.createCell(7).setCellValue("Doc.\nType");
        headerRow.createCell(8).setCellValue("Card Number");
        headerRow.createCell(9).setCellValue("Auth");
        headerRow.createCell(10).setCellValue("Currency");
        headerRow.createCell(11).setCellValue("Amount");
        headerRow.createCell(12).setCellValue("Comm.");
        headerRow.createCell(13).setCellValue("NET");
        headerRow.createCell(14).setCellValue("Merchant");
        headerRow.createCell(15).setCellValue("Bank\nCode");
        headerRow.createCell(16).setCellValue("Bandoc");
        headerRow.createCell(17).setCellValue("Processor");
        for (int h = 0; h < 18; h++) {
            headerRow.getCell(h).setCellStyle(headerStyle);
        }
        final int[] index = {1};
        params.getSettlements().forEach(s -> {
            Row row = sheet.createRow(index[0]);
            row.createCell(0).setCellValue(s.getCCUST());
            row.createCell(1).setCellValue(s.getPRDA());
            row.createCell(2).setCellValue(s.getLIQUIDACIO());
            row.createCell(3).setCellValue(s.getIMPORTEPAG());
            row.createCell(4).setCellValue(s.getMONEDAPAGO());
            row.createCell(5).setCellValue(s.getADATE());
            row.createCell(6).setCellValue(s.getSDATE());
            row.createCell(7).setCellValue(s.getTDOC());
            row.createCell(8).setCellValue(s.getSCARDN());
            row.createCell(9).setCellValue(s.getSAUTHOC());
            row.createCell(10).setCellValue(s.getSCURRENCY());
            row.createCell(11).setCellValue(s.getTOTAL());
            row.createCell(12).setCellValue(s.getCOMISION());
            row.createCell(13).setCellValue(s.getNETO());
            row.createCell(14).setCellValue(s.getMERCHAND());
            row.createCell(15).setCellValue(s.getCODEBANK());
            row.createCell(16).setCellValue(s.getBANDOC());
            row.createCell(17).setCellValue(s.getDESC_PRO());
            index[0]++;
        });
        for (int c = 0; c < 18; c++) {
            sheet.autoSizeColumn(c, false);
            int defaultWidth = 15 * 256;
            if (sheet.getColumnWidth(c) < defaultWidth) {
                sheet.setColumnWidth(c, defaultWidth);
            }
        }
        
        //Sheet sheet2 = workbook.createSheet("Settlements");

        String prefix = "EECC_Conciliation_" + params.getBankInfo().getBANDOC();
        String suffix = ".xlsx";
        File file = File.createTempFile(prefix + UUID.randomUUID(), suffix);

        try (FileOutputStream fos = new FileOutputStream(file)) {
            workbook.write(fos);
        }

        //descarga en zip
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            ZipEntry entrada1 = new ZipEntry(prefix + suffix);
            zos.putNextEntry(entrada1);
            zos.write(FileUtils.readFileToByteArray(file));
            zos.closeEntry();

            zos.finish();
        }

        if (file != null) {
            file.delete();
        }
        System.out.println("Excel Downloaded...");
        //respuesta http
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", prefix + ".zip");
        return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
    }
}
