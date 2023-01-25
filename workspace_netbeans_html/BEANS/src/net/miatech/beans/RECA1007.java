package net.miatech.beans;

import java.io.Serializable;
/**
 *
 * @author claudia
 */

public class RECA1007 implements Serializable{
    
    private String strA1007CTATOOrigen;
    private String strA1007CTATODestino;
    private String strA1007PAIS;
    
    public RECA1007() { 
        
        strA1007CTATOOrigen = "";
        strA1007CTATODestino = "";
        strA1007PAIS = "";
        
    }
    

    public String getStrA1007CTATOOrigen() {
        return this.strA1007CTATOOrigen;
    }
    
    public void setStrA1007CTATOOrigen(String strA1007CTATOOrigen) {
        this.strA1007CTATOOrigen = strA1007CTATOOrigen;
    }
    

    public String getStrA1007CTATODestino() {
        return this.strA1007CTATODestino;
    }
    
    public void setStrA1007CTATODestino(String strA1007CTATODestino) {
        this.strA1007CTATODestino = strA1007CTATODestino;
    }
    

    public String getStrA1007PAIS() {
        return this.strA1007PAIS;
    }
    
    public void setStrA1007PAIS(String strA1007PAIS) {
        this.strA1007PAIS = strA1007PAIS;
    }
}