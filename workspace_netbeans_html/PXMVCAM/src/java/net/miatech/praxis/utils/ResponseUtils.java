package net.miatech.praxis.utils;

import com.google.gson.Gson;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Dvicente
 */
public class ResponseUtils<T> {
    public static ResponseEntity<?> ok(Object body){
        Gson gson = new Gson();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/json;charset=UTF-8"));
        return new ResponseEntity(gson.toJson(body),headers,HttpStatus.OK);
    }
    
    public static ResponseEntity<?> create(Object body){
        Gson gson = new Gson();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(gson.toJson(body),headers,HttpStatus.CREATED);
    }
    
    public static ResponseEntity<?> create(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(headers,HttpStatus.CREATED);
    }
}
