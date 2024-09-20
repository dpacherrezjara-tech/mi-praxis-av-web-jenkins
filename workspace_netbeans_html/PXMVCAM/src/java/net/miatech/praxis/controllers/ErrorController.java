package net.miatech.praxis.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 *
 * @author Dvicente
 */
@ControllerAdvice
public class ErrorController {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException ex) {
        StringBuilder mensajeError = new StringBuilder("Error de validación: ");
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            mensajeError.append(error.getField()).append(" - ").append(error.getDefaultMessage()).append("; ");
        }
        return new ResponseEntity<>(mensajeError, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
        String mensajeError = "Error: ";
        mensajeError += ex.getMessage();
        System.out.println(mensajeError);
        return new ResponseEntity<>(mensajeError, HttpStatus.BAD_REQUEST);
    }
}
