package net.miatech.praxis.controllers.payments;


import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.InputStream;
import net.miatech.praxis.classes.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Controlador proxy hacia el monolito mi-avianca-monolith.
 * URL base hardcodeada temporalmente en BASE_URL.
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/Monolith")
@Scope("request")
public class MonolithController {
    
    private CurrentSession session;
    
    private static final Logger log = Logger.getLogger(MonolithController.class);
    private static String BASE_URL;
    
    @Autowired
    public MonolithController(CurrentSession session){
        this.session = session;
        String environment = this.session.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String rutaMonolith = this.session.getPropertySession().get("RUTA_MONOLITH_" + environment).toString();
        MonolithController.BASE_URL = rutaMonolith;
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    private ResponseEntity<String> toResponse(HttpResponse<String> res) {
        HttpStatus status;
        try {
            status = HttpStatus.valueOf(res.getStatus());
        } catch (IllegalArgumentException e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(res.getBody(), headers, status);
    }

    private ResponseEntity<String> handleError(Exception ex, String endpoint) {
        log.error("Error calling " + endpoint + ": " + ex.getMessage(), ex);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"error\":\"" + ex.getMessage().replace("\"", "'") + "\"}";
        return new ResponseEntity<String>(body, headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // =========================================================================
    // Contabilidad
    // =========================================================================

    /**
     * POST /contabilidad/get_pending_records
     * Body: GetPendingRequest { CCUST, PROC_TYPE, ACC_TYPE, CODPRO, FROM_DATE, TO_DATE, NEGOC }
     */
    @RequestMapping(value = "/getPendingRecords", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getPendingRecords(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/get_pending_records";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/generate_accounting
     * Body: GenerateAccountingRequest { CCUST, PROC_TYPE, ACC_TYPE, FCONT, CODPRO,
     *       FROM_DATE, TO_DATE, NEGOC, rows[] }
     */
    @RequestMapping(value = "/generateAccounting", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateAccounting(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/generate_accounting";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/rollback_accounting
     * Body: RollbackAccountingRequest { IDCONT }
     */
    @RequestMapping(value = "/rollbackAccounting", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> rollbackAccounting(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/rollback_accounting";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/rollback_deposit_bulk
     * Body: RollbackDepositBulkRequest { rows[] }
     */
    @RequestMapping(value = "/rollbackDepositBulk", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> rollbackDepositBulk(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/rollback_deposit_bulk";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/validate_interface
     * Body: objeto JSON libre { additionalProperties }
     */
    @RequestMapping(value = "/validateInterface", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> validateInterface(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/validate_interface";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/send_interface_sftp
     * Body: objeto JSON libre { additionalProperties }
     */
    @RequestMapping(value = "/sendInterfaceSftp", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> sendInterfaceSftp(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/send_interface_sftp";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /contabilidad/create_interface_files
     * Body: objeto JSON libre { additionalProperties }
     */
    @RequestMapping(value = "/createInterfaceFiles", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createInterfaceFiles(@RequestBody String body) {
        String endpoint = BASE_URL + "/contabilidad/create_interface_files";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * GET /contabilidad/download_interface
     * Params: IDCONT (string), FILESQ (integer)
     * Devuelve el archivo TXT con Content-Disposition attachment para descarga directa.
     */
    @RequestMapping(value = "/downloadInterface", method = RequestMethod.GET)
    public ResponseEntity<byte[]> downloadInterface(
            @RequestParam("IDCONT") String idcont,
            @RequestParam("FILESQ") Integer filesq) {
        String endpoint = BASE_URL + "/contabilidad/download_interface";
        try {
            HttpResponse<InputStream> res = Unirest.get(endpoint)
                    .queryString("IDCONT", idcont)
                    .queryString("FILESQ", filesq)
                    .asBinary();
            byte[] bytes = StreamUtils.copyToByteArray(res.getBody());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);
            headers.add("Content-Disposition",
                    "attachment; filename=\"" + idcont + "_" + filesq + ".txt\"");
            return new ResponseEntity<>(bytes, headers, HttpStatus.valueOf(res.getStatus()));
        } catch (Exception ex) {
            log.error("Error downloading interface file: " + ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET /contabilidad/download_interface_zip
     * Params: idcont (string), user_send (string)
     * Devuelve el ZIP con Content-Disposition attachment para descarga directa.
     */
    @RequestMapping(value = "/downloadInterfaceZip", method = RequestMethod.GET)
    public ResponseEntity<byte[]> downloadInterfaceZip(
            @RequestParam("idcont") String idcont,
            @RequestParam("user_send") String userSend) {
        String endpoint = BASE_URL + "/contabilidad/download_interface_zip";
        try {
            HttpResponse<InputStream> res = Unirest.get(endpoint)
                    .queryString("idcont", idcont)
                    .queryString("user_send", userSend)
                    .asBinary();
            byte[] bytes = StreamUtils.copyToByteArray(res.getBody());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/zip"));
            headers.add("Content-Disposition",
                    "attachment; filename=\"" + idcont + ".zip\"");
            return new ResponseEntity<>(bytes, headers, HttpStatus.valueOf(res.getStatus()));
        } catch (Exception ex) {
            log.error("Error downloading interface zip: " + ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // =========================================================================
    // Procesadores
    // =========================================================================

    /**
     * POST /procesadores/generate_fase2
     * Body: Fase2Request { CCUST, CODPRO, TIPO, FECR, VALDATEF, VALDATET, USERNAME }
     */
    @RequestMapping(value = "/generateFase2", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateFase2(@RequestBody String body) {
        String endpoint = BASE_URL + "/procesadores/generate_fase2";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /procesadores/generate_debitos
     * Body: DebitosRequest { CCUST, USERNAME }
     */
    @RequestMapping(value = "/generateDebitos", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateDebitos(@RequestBody String body) {
        String endpoint = BASE_URL + "/procesadores/generate_debitos";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }

    /**
     * POST /procesadores/generate_faseope
     * Body: FaseOperativaRequest { CCUST, CODPRO, USERNAME }
     */
    @RequestMapping(value = "/generateFaseope", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateFaseope(@RequestBody String body) {
        String endpoint = BASE_URL + "/procesadores/generate_faseope";
        try {
            HttpResponse<String> res = Unirest.post(endpoint)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asString();
            return toResponse(res);
        } catch (Exception ex) {
            return handleError(ex, endpoint);
        }
    }
}
