/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
 *  3) processRowsChunk  -> el cliente manda las filas ya validadas en lotes
 *                        chicos (para no chocar con limites de tamano de
 *                        body de proxies/WAF en produccion); cada llamado
 *                        solo acumula el lote en la sesion HTTP, sin escribir
 *                        nada en la base todavia.
 *  4) processRowsCommit -> cuando termino de mandar todos los lotes, el
 *                        cliente llama a este endpoint: vuelve a chequear las
 *                        llaves contra la base (nunca se confia en lo que el
 *                        cliente valido antes) y, solo si TODAS las filas
 *                        son validas, inserta/actualiza TODAS en una unica
 *                        transaccion (todo o nada) via PRAXISMP.MPS262.
 */
@Controller
@Scope("request")
@RequestMapping("/TAXMerchantCatalogForm")
public class TAXMerchantCatalogSubiArchivoController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private TAXMerchantCatalogSubiArchivoLogic logic;

    // Orden y nombres de columna esperados en el Excel (fila 1 = cabecera).
    // Debe coincidir exactamente con el layout que genera downloadLayout() Y con
    // las columnas que produce el boton "Exportar a Excel" de la grilla (mismo
    // orden/nombres que el SELECT de MPS276) hasta REFKEY3. RN se lee pero no se
    // valida ni se guarda (es solo el numero de fila de un export previo). No se
    // incluyen los campos de auditoria (USCR/FECR/HOCR/USUP/FEUP/HOUP): son de
    // solo lectura y los genera MPS262.
    private static final String[] EXPECTED_HEADERS = {
        "RN", "PROCESO", "MERCHANT", "SALE_AGENT", "SOCIETY",
        "CURRENCY", "SALE_PROFIT", "COUNTRY", "STATEMENT_PROFIT", "COST_CENTER",
        "ACQUIRER", "PROCESSOR", "CHANNEL", "COMPANY", "BANK_CURRENCY",
        "BANK_PROFIT", "NIT_CODE", "NIT_DESCRIPTION", "CODE", "ACCOUNT",
        "TYPE_CB", "TYPE_MEMOLINE", "MEMOLINE", "REFKEY1", "REFKEY3"
    };

    private static final String[] EXAMPLE_ROW = {
        "1", "TC", "0464959", "56990113", "2K01",
        "USD", "12KVVI17", "BO", "12KBO099", "12KLPB1600",
        "LINKSER", "LK", "ATO", "2K01", "USD",
        "12KBO099", "1020557029", "BANCO MERCANTIL SANT", "COMISI", "544109",
        "B", "COM", "ATO-BO-LINKSER", "REFKEY1EX", "REFKEY3 EJEMPLO DESCRIPCION"
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
            result.put("headerError", "Error validating the file: " + e.getMessage());
            result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
            return new Gson().toJson(result);
        }
    }

    // Clave de sesion HTTP donde se van acumulando los lotes de filas hasta
    // que el cliente llama a processRowsCommit. Un buffer por sesion de
    // usuario: alcanza para una carga masiva a la vez, que es el caso de uso.
    private static final String SESSION_BUFFER_KEY = "TAX_MERCHANT_CATALOG_BULK_UPLOAD_BUFFER";

    /**
     * El cliente NO vuelve a subir el archivo Excel ni manda todas las filas
     * juntas: manda en varios llamados chunks de ~25 filas (para no superar
     * limites de tamano de body de proxies/WAF en produccion). Este endpoint
     * solo acumula cada chunk en la sesion HTTP -- todavia no escribe nada en
     * la base. chunkIndex = 0 reinicia el buffer (por si quedo uno viejo de
     * una carga anterior incompleta).
     */
    @RequestMapping(value = "processRowsChunk", method = RequestMethod.POST)
    public @ResponseBody
    String processRowsChunk(@RequestParam("chunkIndex") int chunkIndex, @RequestParam("chunkRowsJson") String chunkRowsJson, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        try {
            HttpSession httpSession = request.getSession();
            List<TAXMerchantCatalogRow> buffer;
            if (chunkIndex == 0) {
                buffer = new ArrayList<TAXMerchantCatalogRow>();
                httpSession.setAttribute(SESSION_BUFFER_KEY, buffer);
            } else {
                buffer = getSessionBuffer(httpSession);
                if (buffer == null) {
                    result.put("error", "The upload session expired or was not started. Start again from the first batch.");
                    return new Gson().toJson(result);
                }
            }
            TAXMerchantCatalogRow[] chunkArr = new Gson().fromJson(chunkRowsJson, TAXMerchantCatalogRow[].class);
            buffer.addAll(Arrays.asList(chunkArr));
            result.put("error", null);
            result.put("received", buffer.size());
            return new Gson().toJson(result);
        } catch (Exception e) {
            logError.error("Message: " + e.getMessage(), e);
            result.put("error", "Error receiving batch: " + e.getMessage());
            return new Gson().toJson(result);
        }
    }

    /**
     * Toma TODAS las filas acumuladas via processRowsChunk, vuelve a chequear
     * las llaves contra la base (defensa en profundidad ante condiciones de
     * carrera) y, solo si el 100% son validas, las inserta/actualiza en una
     * unica transaccion (todo o nada -- ver DAO.processAllRows). El buffer de
     * sesion se limpia siempre al terminar, con o sin exito.
     */
    @RequestMapping(value = "processRowsCommit", method = RequestMethod.POST)
    public @ResponseBody
    String processRowsCommit(@RequestParam("mode") String mode, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        // Ext.form.Basic.submit() exige "success" en el JSON de nivel superior;
        // sin este campo interpreta la respuesta como failure aunque el body sea valido.
        result.put("success", true);
        String currentUser = "";
        HttpSession httpSession = request.getSession();
        try {
            currentUser = this.serverSession.getServerSession().getUserView().getUserInfo().USR;
            Functions.msjConsola("PRAXIS", currentUser, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            List<TAXMerchantCatalogRow> rows = getSessionBuffer(httpSession);
            if (rows == null || rows.isEmpty()) {
                result.put("headerError", "There is nothing to process. Upload the batches again.");
                result.put("processed", false);
                result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
                return new Gson().toJson(result);
            }

            logic = new TAXMerchantCatalogSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            logic.resolveActionAgainstDatabase(rows, mode);

            boolean allValid = true;
            for (TAXMerchantCatalogRow row : rows) {
                if (!row.VALID) {
                    allValid = false;
                    break;
                }
            }

            result.put("headerError", null);
            if (!allValid) {
                // Todo o nada: si una sola fila no es valida, no se escribe nada en la base.
                result.put("processed", false);
                result.put("rows", rows);
                return new Gson().toJson(result);
            }

            logic.commitAll(rows);
            result.put("processed", true);
            result.put("rows", rows);
            return new Gson().toJson(result);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + currentUser + " Message: " + e.getMessage(), e);
            result.put("headerError", "Error processing the rows: " + e.getMessage());
            result.put("processed", false);
            result.put("rows", new ArrayList<TAXMerchantCatalogRow>());
            return new Gson().toJson(result);
        } finally {
            httpSession.removeAttribute(SESSION_BUFFER_KEY);
        }
    }

    @SuppressWarnings("unchecked")
    private List<TAXMerchantCatalogRow> getSessionBuffer(HttpSession httpSession) {
        return (List<TAXMerchantCatalogRow>) httpSession.getAttribute(SESSION_BUFFER_KEY);
    }

    // processRowsCommit hace una llamada a MPS262 por fila, todas dentro de
    // UNA sola peticion HTTP (para que quede en una sola transaccion). Un
    // archivo demasiado grande puede tardar mas de lo que tolera el cliente
    // o algun proxy intermedio antes de recibir respuesta. Este limite es un
    // freno conservador, no un calculo exacto -- ajustar segun lo que se mida
    // en produccion.
    private static final int MAX_ROWS = 300;

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
            result.headerError = "The file is empty.";
            workbook.close();
            return result;
        }

        Row headerRow = iterator.next();
        if (headerRow.getLastCellNum() != EXPECTED_HEADERS.length) {
            result.headerError = "The file has " + Math.max(headerRow.getLastCellNum(), 0)
                    + " column(s) and " + EXPECTED_HEADERS.length + " were expected. Download the example layout.";
            workbook.close();
            return result;
        }
        for (int i = 0; i < EXPECTED_HEADERS.length; i++) {
            String header = getCellValue(headerRow.getCell(i)).trim().toUpperCase();
            if (!header.equals(EXPECTED_HEADERS[i])) {
                result.headerError = "Column " + (i + 1) + " should be '" + EXPECTED_HEADERS[i]
                        + "' but '" + header + "' was found. Download the example layout.";
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

        if (result.rows.size() > MAX_ROWS) {
            result.headerError = "The file has " + result.rows.size() + " row(s) and the maximum allowed is "
                    + MAX_ROWS + ". Split it into smaller files.";
            result.rows = new ArrayList<TAXMerchantCatalogRow>();
            return result;
        }

        checkDuplicateKeysInFile(result.rows);

        return result;
    }

    // RN (0) no cuenta para decidir si una fila esta vacia: es de solo lectura
    // y puede traer el numero de un export previo aunque el usuario haya
    // borrado el resto de la fila.
    private boolean isRowEmpty(Row row) {
        for (int i = 1; i <= 24; i++) {
            if (!getCellValue(row.getCell(i)).trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private TAXMerchantCatalogRow parseRow(Row row, int rowNum) {
        TAXMerchantCatalogRow r = new TAXMerchantCatalogRow();
        r.ROW_NUM = rowNum;

        // Columna 0 (RN) se ignora: es solo el numero de fila de un export previo.
        r.PROCESO = normalizeEnum(cell(row, 1), PROCESO_CODES, PROCESO_NAMES, r, "Process");
        r.MERCHANT = required(cell(row, 2), 19, r, "Merchant");
        r.SALE_AGENT = required(cell(row, 3), 9, r, "Sales Agent");
        r.SOCIETY = required(cell(row, 4), 4, r, "Society");
        r.CURRENCY = required(cell(row, 5), 3, r, "Currency");
        r.SALE_PROFIT = required(cell(row, 6), 8, r, "Sale Profit");
        r.COUNTRY = required(cell(row, 7), 2, r, "Country");
        r.STATEMENT_PROFIT = required(cell(row, 8), 8, r, "Statement Profit");
        r.COST_CENTER = required(cell(row, 9), 10, r, "Cost Center");
        r.ACQUIRER = required(cell(row, 10), 40, r, "Acquirer");
        r.PROCESSOR = required(cell(row, 11), 3, r, "Processor");
        r.CHANNEL = required(cell(row, 12), 40, r, "Channel");
        r.COMPANY = required(cell(row, 13), 4, r, "Company");
        r.BANK_CURRENCY = required(cell(row, 14), 3, r, "Bank Currency");
        r.BANK_PROFIT = required(cell(row, 15), 8, r, "Bank Profit");
        r.NIT_CODE = required(cell(row, 16), 20, r, "NIT Code");
        r.NIT_DESCRIPTION = required(cell(row, 17), 40, r, "NIT Description");
        r.CODE = required(cell(row, 18), 10, r, "Code");
        r.ACCOUNT = required(cell(row, 19), 6, r, "Account");
        r.TYPE_CB = normalizeEnum(cell(row, 20), PROFIT_TYPE_CODES, PROFIT_TYPE_NAMES, r, "Profit Type");
        r.TYPE_MEMOLINE = normalizeEnum(cell(row, 21), MEMOLINE_TYPE_CODES, MEMOLINE_TYPE_NAMES, r, "Type Memoline");
        r.MEMOLINE = required(cell(row, 22), 60, r, "Memoline");
        r.REFKEY1 = optional(cell(row, 23), 20, r, "Ref Key 1");
        r.REFKEY3 = optional(cell(row, 24), 40, r, "Ref Key 3");

        return r;
    }

    private String cell(Row row, int index) {
        return getCellValue(row.getCell(index)).trim().toUpperCase();
    }

    private String required(String value, int maxLen, TAXMerchantCatalogRow row, String label) {
        if (value.isEmpty()) {
            row.addError(label + " is required.");
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
            row.addError(label + " cannot have more than " + maxLen + " characters (has " + value.length() + ").");
            return value.substring(0, maxLen);
        }
        return value;
    }

    private String normalizeEnum(String value, String[] codes, String[] names, TAXMerchantCatalogRow row, String label) {
        if (value.isEmpty()) {
            row.addError(label + " is required.");
            return value;
        }
        for (int i = 0; i < codes.length; i++) {
            if (codes[i].equals(value) || names[i].equals(value)) {
                return codes[i];
            }
        }
        row.addError(label + " '" + value + "' is not a valid value. Use one of: " + String.join("/", codes) + ".");
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
                row.addError("The key (Process+Merchant+Agent+Processor+Code) is repeated in row(s) " + otherRows + " of this same file.");
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
