/*
 * Cadena.java
 *
 * Created on 05 de Febrero de 2010, 18:11 PM
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
public class Cadena implements Serializable {
    
    private String strId;
    
    /** Creates a new instance of Cadena */
    public Cadena() {
        strId = "";
    }

    
    
    public String getStrId() {
        return this.strId;
    }
    public void setStrId(String strId) {
        this.strId = strId;
    }
    
    
    
}
