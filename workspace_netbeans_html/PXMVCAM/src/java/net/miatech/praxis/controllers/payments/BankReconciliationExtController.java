package net.miatech.praxis.controllers.payments;
//<editor-fold defaultstate="collapsed" desc="Imports">
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.praxis.logic.payments.BankReconciliationExtLogic;
import net.miatech.praxis.payment.dto.ConciliacionF1Dto;
import net.miatech.praxis.payment.dto.MPS037Filter;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
import net.miatech.praxis.payment.dto.SPBSR006Filter;
import net.miatech.praxis.payment.dto.SPBSR007Filter;
import net.miatech.praxis.payment.dto.SPBSR008Filter;
import net.miatech.praxis.payment.entities.X3180;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.utils.CustomExcelCell;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.beans.BeanUtils;
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

//</editor-fold>
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
    
    //<editor-fold defaultstate="collapsed" desc="By Bank">
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
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="By Settlement">
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
    
    @RequestMapping(value = "loadTaxes")
    public ResponseEntity<?> loadTaxes(SPBSR007Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadTaxes *****");
        SPBSR007Filter filter = logic.loadSPBSR007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadHeaders")
    public ResponseEntity<?> loadHeaders(SPBSR008Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadHeaders *****");
        SPBSR008Filter filter = logic.loadSPBSR008Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Mantenimiento By Settlement">
    @RequestMapping(value = "loadSettlementScanner")
    public ResponseEntity<?> loadSettlementScanner(SPBSR005Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadSettlementScanner *****");
        SPBSR005Filter filter = logic.loadSPBSR005Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadConciliationF1", method = RequestMethod.POST)
    public ResponseEntity<?> loadConciliationF1(@RequestBody ConciliacionF1Dto params) throws Exception {
        System.out.println("***** BankReconciliationExt - loadConciliationF1 *****");
        System.out.println("Bandoc loaded: " + params.getBankInfo().getBANDOC());
        System.out.println("Settlements loaded: " + params.getSettlements().size());
        System.out.println("Headers loaded: " + params.getHeaders().size());
        System.out.println("Taxes loaded: " + params.getTaxes().size());
        
        String cuuid = UUID.randomUUID().toString().replace("-", "");
        
        List<X3180> lstConcil = new ArrayList<>();
        
        //Insercion Settlements
        if(!params.getSettlements().isEmpty()){
            final int[] index = {1};
            params.getSettlements().forEach(s->{
                X3180 settl = X3180.builder()
                        .CUUID(cuuid)
                        .SEQID(index[0])
                        .TIPO("S")
                        .TTABLA("MPF060")
                        .build();
                BeanUtils.copyProperties(s, settl);
                lstConcil.add(settl);
                index[0]++;
            });
        }
        
        if(!params.getHeaders().isEmpty()){
            final int[] index = {1};
            params.getHeaders().forEach(h->{
                X3180 head = X3180.builder()
                        .CUUID(cuuid)
                        .SEQID(index[0])
                        .TIPO("H")
                        .TTABLA("MPF083")
                        .build();
                BeanUtils.copyProperties(h, head);
                lstConcil.add(head);
                index[0]++;
            });
        }
        
        if(!params.getTaxes().isEmpty()){
            final int[] index = {1};
            params.getTaxes().forEach(t->{
                X3180 tax = X3180.builder()
                        .CUUID(cuuid)
                        .SEQID(index[0])
                        .TIPO("T")
                        .TTABLA("MPF091")
                        .build();
                BeanUtils.copyProperties(t, tax);
                lstConcil.add(tax);
                index[0]++;
            });
        }
        String codpro = lstConcil.get(0).getCODPRO();
        String ccustpro = lstConcil.get(0).getCCUSTPRO();
        
        SPBSR006Filter filter = SPBSR006Filter.builder()
                .IN_CCUST(params.getBankInfo().getCCUST())
                .IN_BANDOC(params.getBankInfo().getBANDOC())
                .IN_ADATE(params.getBankInfo().getADATE())
                .IN_MERCHANT(params.getBankInfo().getMERCHAND())
                .IN_CODEBANK(params.getBankInfo().getCODEBANK())
                .IN_SOCIETY(params.getBankInfo().getSOCIETY())
                .IN_DATECI(params.getBankInfo().getDATECI())
                .IN_TRANCI(params.getBankInfo().getTRANCI())
                .IN_CODPRO(codpro)
                .IN_CCUSTPRO(ccustpro)
                .IN_CUUID(cuuid)
                .build();
        System.out.println("Bandoc Conciliado: " + filter.getIN_BANDOC());
        
        filter.setConciliation(lstConcil);
        filter = logic.loadSPBSR006Filter(filter);
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "reverseConciliationF1",method = RequestMethod.POST)
    public ResponseEntity<?> reverseConciliationF1(@RequestBody MPS037Filter params) throws Exception {
        System.out.println("***** BankReconciliationExt - reverseConciliationF1 *****");
        MPS037Filter filter = logic.loadMPS037Filter(params);
        System.out.println("Message: " + filter.getVMESSAGE());
        return ResponseUtils.ok(filter);
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Descarga de Exceles">
    @RequestMapping(value = "downloadExcelEECC", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelEECC(@RequestBody ConciliacionF1Dto params) throws Exception {
        System.out.println("***** BankReconciliationExt - downloadExcelEECC *****");
        System.out.println("Bandoc loaded: " + params.getBankInfo().getBANDOC());
        System.out.println("Settlements loaded: " + params.getSettlements().size());
        System.out.println("Headers loaded: " + params.getHeaders().size());
        System.out.println("Taxes loaded: " + params.getTaxes().size());
        SXSSFWorkbook workbook = new SXSSFWorkbook();
        //<editor-fold defaultstate="collapsed" desc="Estilos">
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
        //</editor-fold>

        Sheet sheet = workbook.createSheet("EECC");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Client");
        headerRow.createCell(1).setCellValue("Value Date");
        headerRow.createCell(2).setCellValue("Processing\nDate");
        headerRow.createCell(3).setCellValue("Suggested\nProcessor");
        headerRow.createCell(4).setCellValue("Country");
        headerRow.createCell(5).setCellValue("Doc. Type");
        headerRow.createCell(6).setCellValue("Bandoc");
        headerRow.createCell(7).setCellValue("Bank Code");
        headerRow.createCell(8).setCellValue("Bank Name");
        headerRow.createCell(9).setCellValue("Acc. Number");
        headerRow.createCell(10).setCellValue("Profit Center");
        headerRow.createCell(11).setCellValue("Bank Account");
        headerRow.createCell(12).setCellValue("Society");
        headerRow.createCell(13).setCellValue("Reference");
        headerRow.createCell(14).setCellValue("Text");
        headerRow.createCell(15).setCellValue("Large Text");
        headerRow.createCell(16).setCellValue("Currency");
        headerRow.createCell(17).setCellValue("NET");
        for (int h = 0; h < 18; h++) {
            headerRow.getCell(h).setCellStyle(headerStyle);
        }

        Row row = sheet.createRow(1);
        row.createCell(0).setCellValue(params.getBankInfo().getCCUST());
        row.createCell(1).setCellValue(params.getBankInfo().getVALDATE());
        row.createCell(2).setCellValue(params.getBankInfo().getPRDA());
        row.createCell(3).setCellValue(params.getBankInfo().getDESC_SPRO());
        row.createCell(4).setCellValue(params.getBankInfo().getSCOUNTRY());
        row.createCell(5).setCellValue(params.getBankInfo().getTDOC());
        row.createCell(6).setCellValue(params.getBankInfo().getBANDOC());
        row.createCell(7).setCellValue(params.getBankInfo().getCODEBANK());
        row.createCell(8).setCellValue(params.getBankInfo().getDESC_BANK());
        row.createCell(9).setCellValue(params.getBankInfo().getACCCOMP());
        row.createCell(10).setCellValue(params.getBankInfo().getBENCENC());
        row.createCell(11).setCellValue(params.getBankInfo().getACCOUNT());
        row.createCell(12).setCellValue(params.getBankInfo().getSOCIETY());
        row.createCell(13).setCellValue(params.getBankInfo().getREFER());
        row.createCell(14).setCellValue(params.getBankInfo().getTEXTO());
        row.createCell(15).setCellValue(params.getBankInfo().getTEXTOLAR());
        row.createCell(16).setCellValue(params.getBankInfo().getSCURRENCY());
        row.createCell(17).setCellValue(params.getBankInfo().getNETO());

        for (int c = 0; c < 18; c++) {
            sheet.autoSizeColumn(c, false);
            int defaultWidth = 15 * 256;
            if (sheet.getColumnWidth(c) < defaultWidth) {
                sheet.setColumnWidth(c, defaultWidth);
            }
        }

        if (!params.getSettlements().isEmpty()) {
            Sheet sheet1 = workbook.createSheet("Settlements");

            Row headerRow1 = sheet1.createRow(0);
            headerRow1.createCell(0).setCellValue("Client");
            headerRow1.createCell(1).setCellValue("Processing Date");
            headerRow1.createCell(2).setCellValue("Settlement");
            headerRow1.createCell(3).setCellValue("Payment\nCurrency");
            headerRow1.createCell(4).setCellValue("Payment\nAmount");
            headerRow1.createCell(5).setCellValue("Payment\nDate");
            headerRow1.createCell(6).setCellValue("Sale\nDate");
            headerRow1.createCell(7).setCellValue("Doc.\nType");
            headerRow1.createCell(8).setCellValue("Card Number");
            headerRow1.createCell(9).setCellValue("Auth");
            headerRow1.createCell(10).setCellValue("Currency");
            headerRow1.createCell(11).setCellValue("Amount");
            headerRow1.createCell(12).setCellValue("Comm.");
            headerRow1.createCell(13).setCellValue("NET");
            headerRow1.createCell(14).setCellValue("Merchant");
            headerRow1.createCell(15).setCellValue("Bank\nCode");
            headerRow1.createCell(16).setCellValue("Bandoc");
            headerRow1.createCell(17).setCellValue("Processor");
            for (int h = 0; h < 18; h++) {
                headerRow1.getCell(h).setCellStyle(headerStyle);
            }
            final int[] index = {1};

            params.getSettlements().forEach(s -> {
                Row row1 = sheet1.createRow(index[0]);
                row1.createCell(0).setCellValue(s.getCCUST());
                row1.createCell(1).setCellValue(s.getPRDA());
                row1.createCell(2).setCellValue(s.getLIQUIDACIO());
                row1.createCell(3).setCellValue(s.getIMPORTEPAG());
                row1.createCell(4).setCellValue(s.getMONEDAPAGO());
                row1.createCell(5).setCellValue(s.getADATE());
                row1.createCell(6).setCellValue(s.getSDATE());
                row1.createCell(7).setCellValue(s.getTDOC());
                row1.createCell(8).setCellValue(s.getSCARDN());
                row1.createCell(9).setCellValue(s.getSAUTHOC());
                row1.createCell(10).setCellValue(s.getSCURRENCY());
                row1.createCell(11).setCellValue(s.getTOTAL());
                row1.createCell(12).setCellValue(s.getCOMISION());
                row1.createCell(13).setCellValue(s.getNETO());
                row1.createCell(14).setCellValue(s.getMERCHAND());
                row1.createCell(15).setCellValue(s.getCODEBANK());
                row1.createCell(16).setCellValue(s.getBANDOC());
                row1.createCell(17).setCellValue(s.getDESC_PRO());
                index[0]++;
            });
            for (int c = 0; c < 18; c++) {
                sheet1.autoSizeColumn(c, false);
                int defaultWidth = 15 * 256;
                if (sheet1.getColumnWidth(c) < defaultWidth) {
                    sheet1.setColumnWidth(c, defaultWidth);
                }
            }
        }

        if (!params.getTaxes().isEmpty()) {
            Sheet sheet2 = workbook.createSheet("Taxes");

            Row headerRow2 = sheet2.createRow(0);
            headerRow2.createCell(0).setCellValue("Client");
            headerRow2.createCell(1).setCellValue("Processing Date");
            headerRow2.createCell(2).setCellValue("Payment Date");
            headerRow2.createCell(3).setCellValue("Tax Code");
            headerRow2.createCell(4).setCellValue("Payment\nCurr.");
            headerRow2.createCell(5).setCellValue("Payment\nAmount");
            headerRow2.createCell(6).setCellValue("Curr.");
            headerRow2.createCell(7).setCellValue("Amount");
            headerRow2.createCell(8).setCellValue("Merchant");
            headerRow2.createCell(9).setCellValue("Bandoc");
            headerRow2.createCell(10).setCellValue("Settlement");
            headerRow2.createCell(11).setCellValue("Processor");
            for (int h = 0; h < 12; h++) {
                headerRow2.getCell(h).setCellStyle(headerStyle);
            }
            final int[] index = {1};
            params.getTaxes().forEach(t->{
                Row row2 = sheet2.createRow(index[0]);
                row2.createCell(0).setCellValue(t.getCCUST());
                row2.createCell(1).setCellValue(t.getPRDA());
                row2.createCell(2).setCellValue(t.getFLIQUIDACI());
                row2.createCell(3).setCellValue(t.getCODIGO());
                row2.createCell(4).setCellValue(t.getMONEDAPAGO());
                row2.createCell(5).setCellValue(t.getIMPORTEPAG());
                row2.createCell(6).setCellValue(t.getMONEDA());
                row2.createCell(7).setCellValue(t.getIMPORTE());
                row2.createCell(8).setCellValue(t.getMERCHAND());
                row2.createCell(9).setCellValue(t.getBANDOC());
                row2.createCell(10).setCellValue(t.getLIQUIDACIO());
                row2.createCell(11).setCellValue(t.getDESC_PRO());
                index[0]++;
            });
            for (int c = 0; c < 12; c++) {
                sheet2.autoSizeColumn(c, false);
                int defaultWidth = 15 * 256;
                if (sheet2.getColumnWidth(c) < defaultWidth) {
                    sheet2.setColumnWidth(c, defaultWidth);
                }
            }
        }
        
        if (!params.getHeaders().isEmpty()) {
            Sheet sheet3 = workbook.createSheet("Headers");
            Row headerRow3 = sheet3.createRow(0);
            headerRow3.createCell(0).setCellValue("Client");
            headerRow3.createCell(1).setCellValue("Processing\nDate");
            headerRow3.createCell(2).setCellValue("Settlement\nDate");
            headerRow3.createCell(3).setCellValue("Merchant");
            headerRow3.createCell(4).setCellValue("Settlement");
            headerRow3.createCell(5).setCellValue("Bandoc");
            headerRow3.createCell(6).setCellValue("Account");
            headerRow3.createCell(7).setCellValue("Payment\nCurr.");
            headerRow3.createCell(8).setCellValue("Payment\nAmount");
            headerRow3.createCell(9).setCellValue("Curr.");
            headerRow3.createCell(10).setCellValue("Amount");
            headerRow3.createCell(11).setCellValue("Comm.");
            headerRow3.createCell(12).setCellValue("Fee Tax");
            headerRow3.createCell(13).setCellValue("NET");
            headerRow3.createCell(14).setCellValue("Processor");
            for (int h = 0; h < 15; h++) {
                headerRow3.getCell(h).setCellStyle(headerStyle);
            }
            final int[] index = {1};
            params.getHeaders().forEach(h->{
                Row row3 = sheet3.createRow(index[0]);
                row3.createCell(0).setCellValue(h.getCCUST());
                row3.createCell(1).setCellValue(h.getPRDA());
                row3.createCell(2).setCellValue(h.getFLIQUIDACI());
                row3.createCell(3).setCellValue(h.getMERCHAND());
                row3.createCell(4).setCellValue(h.getLIQUIDACIO());
                row3.createCell(5).setCellValue(h.getBANDOC());
                row3.createCell(6).setCellValue(h.getACCOUNT());
                row3.createCell(7).setCellValue(h.getMONEDAPAGO());
                row3.createCell(8).setCellValue(h.getIMPORTEPAG());
                row3.createCell(9).setCellValue(h.getMONEDA());
                row3.createCell(10).setCellValue(h.getTOTAL());
                row3.createCell(11).setCellValue(h.getCOMISION());
                row3.createCell(12).setCellValue(h.getFEESTAXS());
                row3.createCell(13).setCellValue(h.getNETO());
                row3.createCell(14).setCellValue(h.getDESC_PRO());
                index[0]++;
            });
        }
        
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
    
    @RequestMapping(value = "downloadBankStatements",method = RequestMethod.POST)
    public ResponseEntity<?> downloadStatements(@RequestBody SPBSR001Filter params) throws Exception{
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        params.setExcel(true);
        SPBSR001Filter filter = logic.loadSPBSR001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        String title = "BankReconciliation - Bank_" 
                + params.getIN_PRDAF() + "_" + params.getIN_PRDAT()
                + "_" + uuid;
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Doc. Type"));
        header.add(new CustomExcelCell("Bank Doc."));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("Suggested\nProcessor"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Bank Code"));
        header.add(new CustomExcelCell("Bank Name"));
        header.add(new CustomExcelCell("Accounting\nCode"));
        header.add(new CustomExcelCell("Profit\nCenter"));
        header.add(new CustomExcelCell("Bank\nAccount"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Text"));
        header.add(new CustomExcelCell("Large Text"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("NET"));
        header.add(new CustomExcelCell("NET\nReconciled"));
        header.add(new CustomExcelCell("Local\nCurrency 2"));
        header.add(new CustomExcelCell("Local\nAmount 2"));
        header.add(new CustomExcelCell("Reconciled\nProcessor"));
        header.add(new CustomExcelCell("User\nUpdate"));
        header.add(new CustomExcelCell("Date\nUpdate"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(formatTDOC(obj.getTDOC())));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getADATE()));
            row.add(new CustomExcelCell(formatSTVAL(obj.getSTVAL())));
            row.add(new CustomExcelCell(obj.getDESC_SPRO()));
            row.add(new CustomExcelCell(obj.getSCOUNTRY()));
            row.add(new CustomExcelCell(obj.getCODEBANK()));
            row.add(new CustomExcelCell(obj.getDESC_BANK()));
            row.add(new CustomExcelCell(obj.getACCOUNT()));
            row.add(new CustomExcelCell(obj.getBENCENC()));
            row.add(new CustomExcelCell(obj.getACCCOMP()));
            row.add(new CustomExcelCell(obj.getSOCIETY()));
            row.add(new CustomExcelCell(obj.getREFER()));
            row.add(new CustomExcelCell(obj.getTEXTO()));
            row.add(new CustomExcelCell(obj.getTEXTOLAR()));
            row.add(new CustomExcelCell(obj.getSCURRENCY()));
            row.add(new CustomExcelCell(obj.getNETO()));
            row.add(new CustomExcelCell(obj.getNETOC()));
            row.add(new CustomExcelCell(obj.getLOCRENCY2()));
            row.add(new CustomExcelCell(obj.getLOCAMOUNT2()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getFEUP()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data,title);
    }
    
    @RequestMapping(value = "downloadSettlements",method = RequestMethod.POST)
    public ResponseEntity<?> downloadSettlements(@RequestBody SPBSR003Filter params) throws Exception{
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        params.setExcel(true);
        SPBSR003Filter filter = logic.loadSPBSR003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        String title = "BankReconciliation - Settl_"
                + params.getIN_PRDAF() + "_" + params.getIN_PRDAT() 
                + "_" + uuid;
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Doc. Type"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Merchant"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Agent"));
        header.add(new CustomExcelCell("Card\nType"));
        header.add(new CustomExcelCell("Card\nCode"));
        header.add(new CustomExcelCell("Card Number"));
        header.add(new CustomExcelCell("Auth"));
        header.add(new CustomExcelCell("Curr."));
        header.add(new CustomExcelCell("Trans. Amount"));
        header.add(new CustomExcelCell("Sales Amount"));
        header.add(new CustomExcelCell("Comm."));
        header.add(new CustomExcelCell("NET"));
        header.add(new CustomExcelCell("Payment\nCurrency"));
        header.add(new CustomExcelCell("Payment\nAmount"));
        header.add(new CustomExcelCell("Transaction\nNumber"));
        header.add(new CustomExcelCell("Bank\nCode"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Bandoc"));
        header.add(new CustomExcelCell("Statement ID"));
        header.add(new CustomExcelCell("User\nUpdate"));
        header.add(new CustomExcelCell("Date\nUpdate"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getADATE()));
            row.add(new CustomExcelCell(formatTDOC(obj.getTDOC())));
            row.add(new CustomExcelCell(formatSTVAL(obj.getSTVAL())));
            row.add(new CustomExcelCell(obj.getSCOUNTRY()));
            row.add(new CustomExcelCell(obj.getMERCHAND()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getSAGENT()));
            row.add(new CustomExcelCell(obj.getTIPOTAR()));
            row.add(new CustomExcelCell(obj.getSCARCOD()));
            row.add(new CustomExcelCell(obj.getSCARDN()));
            row.add(new CustomExcelCell(obj.getSAUTHOC()));
            row.add(new CustomExcelCell(obj.getSCURRENCY()));
            row.add(new CustomExcelCell(obj.getTOTAL()));
            row.add(new CustomExcelCell(obj.getSVFOP()));
            row.add(new CustomExcelCell(obj.getCOMISION()));
            row.add(new CustomExcelCell(obj.getNETO()));
            row.add(new CustomExcelCell(obj.getMONEDAPAGO()));
            row.add(new CustomExcelCell(obj.getIMPORTEPAG()));
            row.add(new CustomExcelCell(obj.getTRAN()));
            row.add(new CustomExcelCell(obj.getCODEBANK()));
            row.add(new CustomExcelCell(obj.getSOCIETY()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getFEUP()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data,title);
    }
    
    @RequestMapping(value = "downloadTaxes",method = RequestMethod.POST)
    public ResponseEntity<?> downloadTaxes(@RequestBody SPBSR007Filter params) throws Exception{
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        params.setExcel(true);
        SPBSR007Filter filter = logic.loadSPBSR007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        String title = "BankReconciliation - Tax_"
                + params.getIN_PRDAF() + "_" + params.getIN_PRDAT() 
                + "_" + uuid;
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Merchant ID"));
        header.add(new CustomExcelCell("Settlement ID"));
        header.add(new CustomExcelCell("Code"));
        header.add(new CustomExcelCell("Amount"));
        header.add(new CustomExcelCell("Curr."));
        header.add(new CustomExcelCell("Payment\nAmount"));
        header.add(new CustomExcelCell("Payment\nCurr."));
        header.add(new CustomExcelCell("Bandoc"));
        header.add(new CustomExcelCell("User\nUpdate"));
        header.add(new CustomExcelCell("Date\nUpdate"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getADATE()));
            row.add(new CustomExcelCell(formatFSELEC(obj.getFSELEC())));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getMERCHAND()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getCODIGO()));
            row.add(new CustomExcelCell(obj.getMONEDA()));
            row.add(new CustomExcelCell(obj.getIMPORTE()));
            row.add(new CustomExcelCell(obj.getMONEDAPAGO()));
            row.add(new CustomExcelCell(obj.getIMPORTEPAG()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getFEUP()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data,title);
    }
    
    @RequestMapping(value = "downloadHeaders",method = RequestMethod.POST)
    public ResponseEntity<?> downloadHeaders(@RequestBody SPBSR008Filter params) throws Exception{
        System.out.println("***** BankReconciliationExt - loadStatements *****");
        params.setExcel(true);
        SPBSR008Filter filter = logic.loadSPBSR008Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        String title = "BankReconciliation - Headers_"
                + params.getIN_PRDAF() + "_" + params.getIN_PRDAT() 
                + "_" + uuid;
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Merchant ID"));
        header.add(new CustomExcelCell("Settlement ID"));
        header.add(new CustomExcelCell("Curr."));
        header.add(new CustomExcelCell("Amount"));
        header.add(new CustomExcelCell("Comm."));
        header.add(new CustomExcelCell("NET"));
        header.add(new CustomExcelCell("Others"));
        header.add(new CustomExcelCell("Payment\nCurr."));
        header.add(new CustomExcelCell("Payment\nAmount"));
        header.add(new CustomExcelCell("Qty\nSettlements"));
        header.add(new CustomExcelCell("Qty\nTaxes"));
        header.add(new CustomExcelCell("Qty\nRecords"));
        header.add(new CustomExcelCell("Bandoc"));
        header.add(new CustomExcelCell("User\nUpdate"));
        header.add(new CustomExcelCell("Date\nUpdate"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getADATE()));
            row.add(new CustomExcelCell(formatFSELEC(obj.getFSELEC())));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getMERCHAND()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getMONEDA()));
            row.add(new CustomExcelCell(obj.getTOTAL()));
            row.add(new CustomExcelCell(obj.getCOMISION()));
            row.add(new CustomExcelCell(obj.getNETO()));
            row.add(new CustomExcelCell(obj.getOTROS()));
            row.add(new CustomExcelCell(obj.getMONEDAPAGO()));
            row.add(new CustomExcelCell(obj.getIMPORTEPAG()));
            row.add(new CustomExcelCell(obj.getQTY_SETTL()));
            row.add(new CustomExcelCell(obj.getQTY_TAX()));
            row.add(new CustomExcelCell(obj.getQTY_DETAIL()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getFEUP()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data,title);
    }
    //</editor-fold> 
    
    //<editor-fold defaultstate="collapsed" desc="Functions">
    private static String formatSTVAL(String stval){
        String status = "";
        switch (stval) {
            case "1":
                status = "Match";
                break;
            case "2":
                status = "Settlement w/o Statement";
                break;
            case "3":
                status = "Statement w/o Settlement";
                break;
            case "4":
                status = "Match Difference";
                break;
            case "5":
                status = "Match Manual";
                break;
        }
        return status;
    }
    
    private static String formatTDOC(String tdoc){
        String doc = "";
        switch (tdoc) {
            case "S":
                doc = "Sale";
                break;
            case "D":
                doc = "Debit";
                break;
            case "V":
                doc = "Void";
                break;
        }
        return doc;
    
    }
    
    private static String formatFSELEC(String fselec){
        String status = "";
        switch (fselec) {
            case " ":
                status = "Pending";
                break;
            case "L":
                status = "Match";
                break;
        }
        return status;
    
    }
//</editor-fold>
}
