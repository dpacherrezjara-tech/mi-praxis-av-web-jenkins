
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class MensajeError implements Serializable {
    
    /** Creates a new instance of MensajeError */
    
    private String strFormulario;
    private String strMensaje;
    private String strTexto;
    private String strTextoSegundo;
    
    public MensajeError() {
        
      strFormulario = "";
      strMensaje = "";
      strTexto = "txtSaleDate";
      strTextoSegundo = "txtFare";
        
    }


    public String getStrFormulario() {
        return this.strFormulario;
    }

    public void setStrFormulario(String strFormulario) {
        this.strFormulario = strFormulario;
    }


    public String getStrMensaje() {
        return this.strMensaje;
    }

    public void setStrMensaje(String strMensaje) {
        this.strMensaje = strMensaje;
    }


    public String getStrTexto() {
        return this.strTexto;
    }

    public void setStrTexto(String strTexto) {
        this.strTexto = strTexto;
    }


    public String getStrTextoSegundo() {
        return this.strTextoSegundo;
    }

    public void setStrTextoSegundo(String strTextoSegundo) {
        this.strTextoSegundo = strTextoSegundo;
    }
 
    
}
