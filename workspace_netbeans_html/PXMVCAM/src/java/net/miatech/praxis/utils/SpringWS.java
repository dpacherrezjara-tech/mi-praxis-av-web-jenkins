package net.miatech.praxis.utils;

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
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author dvicente
 */
@Component
@Scope("request")
public class SpringWS {

    //@Autowired
    private CurrentSession cs;
    
    private String configSpring;

    public SpringWS(CurrentSession cs) {
        this.cs = cs;
        String environment = this.cs.getPropertySession().get("DB_SERVER_DEFAULT_TYPE").toString();
        configSpring = "RUTA_REST_"+ environment + "_SPRING";
    }

    public Boolean postAsync(String body, String endpoint) throws Exception {
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
        }else{
            multipart.field("files", Collections.emptyList());
        }

        HttpResponse<String> response = multipart.asString();
        System.out.println("Código: " + response.getStatus());
        System.out.println("Respuesta: " + response.getBody());
        return response.getStatus() == 200;
    }

    public byte[] getFile(String body, String endpoint) throws Exception {
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
}
