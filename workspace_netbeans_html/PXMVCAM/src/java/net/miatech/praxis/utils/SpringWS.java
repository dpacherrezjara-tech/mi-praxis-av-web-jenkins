package net.miatech.praxis.utils;

import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.HttpRequestWithBody;
import com.mashape.unirest.request.body.MultipartBody;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import net.miatech.praxis.classes.CurrentSession;
import org.apache.commons.io.IOUtils;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author dvicente
 */
@Component
@Scope("request")
public class SpringWS {

    @Autowired
    private CurrentSession cs;

    public Boolean postAsync(String body, String endpoint) throws Exception {
        String environment = this.cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String configSpring = "RUTA_REST_" + environment + "_SPRING";
        String url = cs.getPropertySession().get(configSpring).toString();
        Unirest.setTimeouts(600000, 300000);
        HttpResponse<JsonNode> response = Unirest.post(url + endpoint)
                .header("Content-Type", "application/json") // Header indicando JSON
                .body(body) // Cuerpo de la solicitud
                .asJson();
        if (response.getStatus() == 200) {
            System.out.println("Respuesta exitosa: " + response.getBody());
            return true;
        } else {
            System.out.println("Error: " + response.getStatus() + " - " + response.getBody());
            return false;
        }
    }

    public String postFileAsync(MultipartFile file, String body, String endpoint) throws Exception {
        String environment = this.cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String configSpring = "RUTA_REST_" + environment + "_SPRING";
        String url = cs.getPropertySession().get(configSpring).toString();
        Unirest.setTimeouts(600000, 300000);
        HttpResponse<String> response = Unirest.post(url + endpoint)
                .field("file", file.getInputStream(), file.getOriginalFilename())
                .field("options", body)
                .asString();
        if (response.getStatus() == 200) {
            System.out.println("Respuesta exitosa: " + response.getBody());
            return response.getBody();
        } else {
            throw new Exception("Error en Request de API Status: " + response.getStatus());
        }
    }

    public Boolean postFilesAsync(String body, List<MultipartFile> files, String endpoint) throws Exception {
        String environment = this.cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String configSpring = "RUTA_REST_" + environment + "_SPRING";
        String url = cs.getPropertySession().get(configSpring).toString();
        Unirest.setTimeouts(600000, 300000);
        HttpRequestWithBody request = Unirest.post(url + endpoint);
        MultipartBody multipart = request
                .field("extraParam", body);
        if (!files.isEmpty()) {
            for (MultipartFile archivo : files) {
                multipart.field(
                        "files", // nombre del campo
                        archivo.getInputStream(), // contenido
                        ContentType.APPLICATION_OCTET_STREAM,
                        archivo.getOriginalFilename() // nombre del archivo
                );
            }
        } else {
            multipart.field("files", Collections.emptyList());
        }

        HttpResponse<String> response = multipart.asString();
        System.out.println("Código: " + response.getStatus());
        System.out.println("Respuesta: " + response.getBody());
        return response.getStatus() == 200;
    }

    public byte[] getFile(String body, String endpoint) throws Exception {
        String environment = this.cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String configSpring = "RUTA_REST_" + environment + "_SPRING";
        String url = cs.getPropertySession().get(configSpring).toString();
        Unirest.setTimeouts(600000, 300000);
        HttpResponse<InputStream> response = Unirest.post(url + endpoint)
                .header("Content-Type", "application/json") // Header indicando JSON
                .header("Accept", "application/zip") // indica que esperás un ZIP
                .body(body) // Cuerpo de la solicitud
                .asBinary();

        if (response.getStatus() == 200) {
            try (InputStream is = response.getBody()) {
                return IOUtils.toByteArray(is);
            }
        } else {
            throw new RuntimeException("Error al obtener el archivo: " + response.getStatus());
        }
    }

    //UPS
    private String buildUrl(String endpoint) {
        String env = cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String key = "RUTA_REST_" + env + "_SPRING";
        String base = cs.getPropertySession().get(key).toString();
        return base + endpoint;
    }

    public <Cbas> Cbas getJson(String endpoint, Class<Cbas> clazz) {
        try {
            String url = buildUrl(endpoint);

            RestTemplate rest = new RestTemplate();
            String json = rest.getForObject(url, String.class);

            return new Gson().fromJson(json, clazz);

        } catch (Exception ex) {
            System.out.println("Error en GET " + endpoint + ": " + ex.getMessage());
            return null;
        }
    }

    public String postNoBody(String endpoint) throws Exception {

        String env = cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        String key = "RUTA_REST_" + env + "_SPRING";

        String base = cs.getPropertySession().get(key).toString();

        if (!base.endsWith("/")) {
            base += "/";
        }

        if (endpoint.startsWith("/")) {
            endpoint = endpoint.substring(1);
        }

        String finalUrl = base + endpoint;

        System.out.println("URL POST → " + finalUrl);

        Unirest.setTimeouts(600000, 300000);

        HttpResponse<String> response = Unirest.post(finalUrl)
                .header("Accept", "*/*")
                .asString();

        if (response.getStatus() >= 200 && response.getStatus() < 300) {
            return response.getBody() != null ? response.getBody() : "OK";
        } else {
            throw new RuntimeException("Error en API RPA: " + response.getStatus()
                    + " Body: " + response.getBody());
        }
    }

    public String getText(String endpoint) {
        try {
            String url = buildUrl(endpoint);

            RestTemplate rest = new RestTemplate();
            return rest.getForObject(url, String.class);

        } catch (Exception ex) {
            System.out.println("Error en GET " + endpoint + ": " + ex.getMessage());
            return null;
        }
    }

}
