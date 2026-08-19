/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.payments.TAXMerchantCatalogSubiArchivoLogic;
import net.miatech.praxis.payment.TAXMerchantCatalogRow;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * CSR 1715 - Creacion y actualizacion masiva catalogo TAX.
 *
 * Flujo (ventana TAXMerchantCatalogSubiArchivo.js):
 *  1) downloadLayout  -> el usuario descarga un Excel de ejemplo con las cabeceras.
 *  2) validateExcel   -> sube el Excel + modo (Crear/Actualizar); SOLO valida
 *                        (cabeceras, cantidad de columnas, campos obligatorios,
 *                        formato/longitud, llaves duplicadas en el archivo y
 *                        llaves contra lo que ya existe en MPF154). No escribe
 *                        nada en base de datos. Devuelve fila por fila el
 *                        resultado para pintar el check verde / x roja.
 *  3) processExcel    -> se vuelve a validar todo (nunca se confia en lo que
 *                        el cliente valido antes) y, solo si TODAS las filas
 *                        son validas, se inserta/actualiza cada una via
 *                        PRAXISMP.MPS262.
 */
@Controller
@Scope("request")
@RequestMapping("/TAXMerchantCatalogForm")
public class TAXMerchantCatalogSubiArchivoController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TAXMerchantCatalogSubiArchivoLogic logic;

    // Orden y nombres de columna esperados en el Excel (fila 1 = cabecera).
    // Debe coincidir exactamente con el layout que genera downloadLayout().
    private static final String[] EXPECTED_HEADERS = {
        "PROCESO", "MERCHANT", "SALES_AGENT", "PROCESSOR", "CODE",
        "SOCIETY", "CURRENCY", "SALE_PROFIT", "COUNTRY", "STATEMENT_PROFIT",
        "COST_CENTER", "ACQUIRER", "CHANNEL", "COMPANY", "BANK_CURRENCY",
        "BANK_PROFIT", "NIT_CODE", "NIT_DESCRIPTION", "ACCOUNT", "PROFIT_TYPE",
        "TYPE_MEMOLINE", "MEMOLINE", "REFKEY1", "REFKEY3"
    };

    private static final String[] EXAMPLE_ROW = {
        "TC", "0464959", "56990113", "LK", "COMISI",
        "2K01", "USD", "12KVVI17", "BO", "12KBO099",
        "12KLPB1600", "LINKSER", "ATO", "2K01", "USD",
        "12KBO099", "1020557029", "BANCO MERCANTIL SANT", "544109", "B",
        "COM", "ATO-BO-LINKSER", "REFKEY1EX", "REFKEY3 EJEMPLO DESCRIPCION"
    };

    private static final String[] PROCESO_CODES = {"TC", "CA"};
    private static final String[] PROCESO_NAMES = {"TC - CREDIT CARD", "CA - CASH"};

    private static final String[] PROFIT_TYPE_CODES = {"S", "B", "D"};
    private static final String[] PROFIT_TYPE_NAMES = {"SALE", "BANK", "DEPOSIT"};

    private static final String[] MEMOLINE_TYPE_CODES = {"COM", "FIS", "AFI", "DEP", "NA"};
    private static final String[] MEMOLINE_TYPE_NAMES = {"COMMISSION", "FISCAL", "AFFILIATE", "DEPOSIT", "NOT APPLICABLE"};

    @RequestMapping(value = "downloadLayout", method = RequestMethod.GET)
    public @ResponseBody
    void downloadLayout(HttpServletResponse response) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("TAX_Merchant_Catalog_Layout");

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        headerStyle.setFont(headerFont);

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < EXPECTED_HEADERS.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(EXPECTED_HEADERS[i]);
            cell.setCellStyle(headerStyle);
            sheet.setColumnWidth(i, 18 * 256);
        }

        Row exampleRow = sheet.createRow(1);
        for (int i = 0; i < EXAMPLE_ROW.length; i++) {
            exampleRow.createCell(i).setCellValue(EXAMPLE_ROW[i]);
        }

        response.setContentType("application/vnd.openxml");
        response.setHeader("Content-Disposition", "attachment; filename=\"TAX_Merchant_Catalog_Layout.xlsx\"");
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @RequestMapping(value = "validateExcel", method = RequestMethod.POST)
    public @ResponseBody
    String validateExcel(@RequestParam("excelfile") MultipartFile excelfile, @RequestParam("mode") String mode, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        // Ext.form.Basic.submit() exige "success" en el JSON de nivel superior;
        // sin este campo interpreta la respuesta como failure aunque el body sea valido.
        result.put("success", true);
        String currentUser = "";
        try {
            currentUser = this.serverSession.getServerSession().getUserView().getUserInfo().USR;
            Functions.msjConsola("PRAXIS", currentUser, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            ParseResult parsed = parseExcel(excelfile);
            if (parsed.headerError != null) {
                result.put("headerError", parsed.headerError);
                result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
                return new Gson().toJson(result);
            }
            logic = new TAXMerchantCatalogSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            logic.resolveActionAgainstDatabase(parsed.rows, mode);

            result.put("headerError", null);
            result.put("rows", parsed.rows);
            return new Gson().toJson(result);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + currentUser + " Message: " + e.getMessage(), e);
            result.put("headerError", "Error al validar el archivo: " + e.getMessage());
            result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
            return new Gson().toJson(result);
        }
    }

    @RequestMapping(value = "processExcel", method = RequestMethod.POST)
    public @ResponseBody
    String processExcel(@RequestParam("excelfile") MultipartFile excelfile, @RequestParam("mode") String mode, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        // Ext.form.Basic.submit() exige "success" en el JSON de nivel superior;
        // sin este campo interpreta la respuesta como failure aunque el body sea valido.
        result.put("success", true);
        String currentUser = "";
        try {
            currentUser = this.serverSession.getServerSession().getUserView().getUserInfo().USR;
            Functions.msjConsola("PRAXIS", currentUser, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            ParseResult parsed = parseExcel(excelfile);
            if (parsed.headerError != null) {
                result.put("headerError", parsed.headerError);
                result.put("processed", false);
                result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
                return new Gson().toJson(result);
            }

            logic = new TAXMerchantCatalogSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            logic.resolveActionAgainstDatabase(parsed.rows, mode);

            boolean allValid = true;
            for (TAXMerchantCatalogRow row : parsed.rows) {
                if (!row.VALID) {
                    allValid = false;
                    break;
                }
            }

            result.put("headerError", null);
            if (!allValid || parsed.rows.isEmpty()) {
                // Defensa en profundidad: no se confia en la validacion previa del
                // cliente (pudo haber cambiado el catalogo entre Validar y Procesar).
                result.put("processed", false);
                result.put("rows", parsed.rows);
                return new Gson().toJson(result);
            }

            logic.processRows(parsed.rows);

            allValid = true;
            for (TAXMerchantCatalogRow row : parsed.rows) {
                if (!row.VALID) {
                    allValid = false;
                }
            }
            result.put("processed", allValid);
            result.put("rows", parsed.rows);
            return new Gson().toJson(result);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + currentUser + " Message: " + e.getMessage(), e);
            result.put("headerError", "Error al procesar el archivo: " + e.getMessage());
            result.put("processed", false);
            result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
            return new Gson().toJson(result);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="Parseo y validacion del Excel">
    private static class ParseResult {

        String headerError = null;
        List<TAXMerchantCatalogRow> rows = new ArrayList<TAXMerchantCatalogRow>();
    }

    private ParseResult parseExcel(MultipartFile excelfile) throws IOException {
        ParseResult result = new ParseResult();
        XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = sheet.iterator();

        if (!iterator.hasNext()) {
            result.headerError = "El archivo esta vacio.";
            workbook.close();
            return result;
        }

        Row headerRow = iterator.next();
        if (headerRow.getLastCellNum() != EXPECTED_HEADERS.length) {
            result.headerError = "El archivo tiene " + Math.max(headerRow.getLastCellNum(), 0)
                    + " columna(s) y se esperaban " + EXPECTED_HEADERS.length + ". Descargue el layout de ejemplo.";
            workbook.close();
            return result;
        }
        for (int i = 0; i < EXPECTED_HEADERS.length; i++) {
            String header = getCellValue(headerRow.getCell(i)).trim().toUpperCase();
            if (!header.equals(EXPECTED_HEADERS[i])) {
                result.headerError = "La columna " + (i + 1) + " deberia ser '" + EXPECTED_HEADERS[i]
                        + "' y se encontro '" + header + "'. Descargue el layout de ejemplo.";
                workbook.close();
                return result;
            }
        }

        int rowNum = 1;
        while (iterator.hasNext()) {
            Row currentRow = iterator.next();
            rowNum++;
            if (isRowEmpty(currentRow)) {
                continue;
            }
            result.rows.add(parseRow(currentRow, rowNum));
        }
        workbook.close();

        checkDuplicateKeysInFile(result.rows);

        return result;
    }

    private boolean isRowEmpty(Row row) {
        for (int i = 0; i < EXPECTED_HEADERS.length; i++) {
            if (!getCellValue(row.getCell(i)).trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private TAXMerchantCatalogRow parseRow(Row row, int rowNum) {
        TAXMerchantCatalogRow r = new TAXMerchantCatalogRow();
        r.ROW_NUM = rowNum;

        r.PROCESO = normalizeEnum(cell(row, 0), PROCESO_CODES, PROCESO_NAMES, r, "Proceso");
        r.MERCHANT = required(cell(row, 1), 19, r, "Merchant");
        r.SALE_AGENT = required(cell(row, 2), 9, r, "Sales Agent");
        r.PROCESSOR = required(cell(row, 3), 3, r, "Processor");
        r.CODE = required(cell(row, 4), 10, r, "Code");
        r.SOCIETY = required(cell(row, 5), 4, r, "Society");
        r.CURRENCY = required(cell(row, 6), 3, r, "Currency");
        r.SALE_PROFIT = required(cell(row, 7), 8, r, "Sale Profit");
        r.COUNTRY = required(cell(row, 8), 2, r, "Country");
        r.STATEMENT_PROFIT = required(cell(row, 9), 8, r, "Statement Profit");
        r.COST_CENTER = required(cell(row, 10), 10, r, "Cost Center");
        r.ACQUIRER = required(cell(row, 11), 40, r, "Acquirer");
        r.CHANNEL = required(cell(row, 12), 40, r, "Channel");
        r.COMPANY = required(cell(row, 13), 4, r, "Company");
        r.BANK_CURRENCY = required(cell(row, 14), 3, r, "Bank Currency");
        r.BANK_PROFIT = required(cell(row, 15), 8, r, "Bank Profit");
        r.NIT_CODE = required(cell(row, 16), 20, r, "NIT Code");
        r.NIT_DESCRIPTION = required(cell(row, 17), 40, r, "NIT Description");
        r.ACCOUNT = required(cell(row, 18), 6, r, "Account");
        r.TYPE_CB = normalizeEnum(cell(row, 19), PROFIT_TYPE_CODES, PROFIT_TYPE_NAMES, r, "Profit Type");
        r.TYPE_MEMOLINE = normalizeEnum(cell(row, 20), MEMOLINE_TYPE_CODES, MEMOLINE_TYPE_NAMES, r, "Type Memoline");
        r.MEMOLINE = required(cell(row, 21), 60, r, "Memoline");
        r.REFKEY1 = optional(cell(row, 22), 20, r, "Ref Key 1");
        r.REFKEY3 = optional(cell(row, 23), 40, r, "Ref Key 3");

        return r;
    }

    private String cell(Row row, int index) {
        return getCellValue(row.getCell(index)).trim().toUpperCase();
    }

    private String required(String value, int maxLen, TAXMerchantCatalogRow row, String label) {
        if (value.isEmpty()) {
            row.addError(label + " es obligatorio.");
            return value;
        }
        return enforceLength(value, maxLen, row, label);
    }

    private String optional(String value, int maxLen, TAXMerchantCatalogRow row, String label) {
        if (value.isEmpty()) {
            return value;
        }
        return enforceLength(value, maxLen, row, label);
    }

    private String enforceLength(String value, int maxLen, TAXMerchantCatalogRow row, String label) {
        if (value.length() > maxLen) {
            row.addError(label + " no puede tener mas de " + maxLen + " caracteres (tiene " + value.length() + ").");
            return value.substring(0, maxLen);
        }
        return value;
    }

    private String normalizeEnum(String value, String[] codes, String[] names, TAXMerchantCatalogRow row, String label) {
        if (value.isEmpty()) {
            row.addError(label + " es obligatorio.");
            return value;
        }
        for (int i = 0; i < codes.length; i++) {
            if (codes[i].equals(value) || names[i].equals(value)) {
                return codes[i];
            }
        }
        row.addError(label + " '" + value + "' no es un valor valido. Use uno de: " + String.join("/", codes) + ".");
        return value;
    }

    private void checkDuplicateKeysInFile(List<TAXMerchantCatalogRow> rows) {
        Map<String, List<TAXMerchantCatalogRow>> byKey = new HashMap<String, List<TAXMerchantCatalogRow>>();
        for (TAXMerchantCatalogRow row : rows) {
            String key = row.PROCESO + "|" + row.MERCHANT + "|" + row.SALE_AGENT + "|" + row.PROCESSOR + "|" + row.CODE;
            if (!byKey.containsKey(key)) {
                byKey.put(key, new ArrayList<TAXMerchantCatalogRow>());
            }
            byKey.get(key).add(row);
        }
        for (List<TAXMerchantCatalogRow> sameKeyRows : byKey.values()) {
            if (sameKeyRows.size() <= 1) {
                continue;
            }
            for (TAXMerchantCatalogRow row : sameKeyRows) {
                List<Integer> otherRows = new ArrayList<Integer>();
                for (TAXMerchantCatalogRow other : sameKeyRows) {
                    if (other != row) {
                        otherRows.add(other.ROW_NUM);
                    }
                }
                row.addError("La llave (Proceso+Merchant+Agente+Procesador+Codigo) se repite en la(s) fila(s) " + otherRows + " de este mismo archivo.");
            }
        }
    }

    private String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
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
    // </editor-fold>
}
