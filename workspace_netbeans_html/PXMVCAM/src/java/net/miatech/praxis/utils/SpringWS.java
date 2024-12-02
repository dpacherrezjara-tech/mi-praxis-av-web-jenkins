package net.miatech.praxis.utils;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import net.miatech.praxis.classes.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author dvicente
 */
@Component
@Scope("request")
public class SpringWS {
    
    @Autowired
    private CurrentSession cs;
    
    public Boolean postAsync(String body,String endpoint)throws Exception{
        String url = cs.getPropertySession().get("RUTA_REST_SPRING").toString();
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
}
