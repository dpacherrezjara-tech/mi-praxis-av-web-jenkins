/*
 * RECA823.java
 *
 * Created on 24 de febrero de 2009, 11:35 AM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class BeanA823 implements Serializable {
    
    /** Creates a new instance of RECA823 */
    
    private String strAerolinea;
    private String strFecha;
    private String strSecuencia;
    private String strParrafo;
    private String strTexto;
    private String strTitulo;
    
    public BeanA823() {

        strAerolinea = "";
        strFecha = "";
        strSecuencia = "";
        strParrafo = "";
        strTexto = "";
        strTitulo = "";

    }
    
    
     public String getStrAerolinea(){
        return this.strAerolinea;
    }

    public void setStrAerolinea(String strAerolinea) {
        this.strAerolinea = strAerolinea;
    }


    public String getStrFecha() {
        return this.strFecha;
    }

    public void setStrFecha(String strFecha) {
        this.strFecha = strFecha;
    }


    public String getStrSecuencia() {
        return this.strSecuencia;
    }

    public void setStrSecuencia(String strSecuencia) {
        this.strSecuencia = strSecuencia;
    }

    
    public String getStrParrafo() {
        return this.strParrafo;
    }

    public void setStrParrafo(String strParrafo) {
        this.strParrafo = strParrafo;
    }

    
    public String getStrTexto() {
        return this.strTexto;
    }

    public void setStrTexto(String strTexto) {
        this.strTexto = strTexto;
    }
    
    
    public String getStrTitulo() {
        return this.strTitulo;
    }

    public void setStrTitulo(String strTitulo) {
        this.strTitulo = strTitulo;
    }
    
}
