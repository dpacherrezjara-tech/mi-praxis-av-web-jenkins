/*
 * Airline.java
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
public class Airline implements Serializable {
    
    private String strNumericCode;
    private String strAlfaCode;
    private String strName;
    private String strStatus;
    private String strMonedaDflt;
    private String strRutaImg;
    private String strTamanoImg;
    private String strflagHolding;
    private String strCustHolding;
    private String strRutaIcono;
    private String strTamanoIcono;
    private String strUser;
    private String strAplica;
    private String strNameUser;
    private String strNivel;
    private String strCiudadBase;
    private String strMensajeError;
    private String strHolding;
    private String strCodPais;
    private String strCHS;
    private boolean booSelect;
    
    /** Creates a new instance of Airline */
    public Airline() {
        strNumericCode = "";
        strAlfaCode = "";
        strName = "";
        strStatus = "";
        strMonedaDflt = "";
        strRutaImg = "";
        strTamanoImg = "";
        strflagHolding = "";
        strCustHolding = "";
        strRutaIcono = "";
        strTamanoIcono = "";
        strUser = "";
        strAplica = "";
        strNameUser = "";
        strNivel = "";
        strCiudadBase = "";
        strMensajeError = "";
        strHolding = "";
        strCodPais = "";
        strCHS = "";
        booSelect = false;
    }

    
    
    public String getStrNumericCode() {
        return this.strNumericCode;
    }
    public void setStrNumericCode(String strNumericCode) {
        this.strNumericCode = strNumericCode;
    }

    
    
    public String getStrAlfaCode() {
        return this.strAlfaCode;
    }
    public void setStrAlfaCode(String strAlfaCode) {
        this.strAlfaCode = strAlfaCode;
    }

    
    
    public String getStrName() {
        return this.strName;
    }
    public void setStrName(String strName) {
        this.strName = strName;
    }

    
    
    public String getStrStatus() {
        return this.strStatus;
    }
    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }
    
    
    
    public String getStrMonedaDflt() {
        return this.strMonedaDflt;
    }
    public void setStrMonedaDflt(String strMonedaDflt) {
        this.strMonedaDflt = strMonedaDflt;
    }
    
    
    
    public String getStrRutaImg() {
        return this.strRutaImg;
    }
    public void setStrRutaImg(String strRutaImg) {
        this.strRutaImg = strRutaImg;
    }
    
    
    
    public String getStrTamanoImg() {
        return this.strTamanoImg;
    }
    public void setStrTamanoImg(String strTamanoImg) {
        this.strTamanoImg = strTamanoImg;
    }
    
    
    
    public String getStrflagHolding() {
        return this.strflagHolding;
    }
    public void setStrflagHolding(String strflagHolding) {
        this.strflagHolding = strflagHolding;
    }
    
    
    
    public String getStrCustHolding() {
        return this.strCustHolding;
    }
    public void setStrCustHolding(String strCustHolding) {
        this.strCustHolding = strCustHolding;
    }
    
    
    
    public String getStrRutaIcono() {
        return this.strRutaIcono;
    }
    public void setStrRutaIcono(String strRutaIcono) {
        this.strRutaIcono = strRutaIcono;
    }
    
    
    
    public String getStrTamanoIcono() {
        return this.strTamanoIcono;
    }
    public void setStrTamanoIcono(String strTamanoIcono) {
        this.strTamanoIcono = strTamanoIcono;
    }
    
    
    
    public String getStrCHS(){
        return this.strCHS;
    }
    public void setStrCHS(String strCHS) {
        this.strCHS = strCHS;
    }

    public String getStrAplica() {
        return strAplica;
    }

    public void setStrAplica(String strAplica) {
        this.strAplica = strAplica;
    }

    public String getStrCiudadBase() {
        return strCiudadBase;
    }

    public void setStrCiudadBase(String strCiudadBase) {
        this.strCiudadBase = strCiudadBase;
    }

    public String getStrCodPais() {
        return strCodPais;
    }

    public void setStrCodPais(String strCodPais) {
        this.strCodPais = strCodPais;
    }

    public String getStrHolding() {
        return strHolding;
    }

    public void setStrHolding(String strHolding) {
        this.strHolding = strHolding;
    }

    public String getStrMensajeError() {
        return strMensajeError;
    }

    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
    }

    public String getStrNameUser() {
        return strNameUser;
    }

    public void setStrNameUser(String strNameUser) {
        this.strNameUser = strNameUser;
    }

    public String getStrNivel() {
        return strNivel;
    }

    public void setStrNivel(String strNivel) {
        this.strNivel = strNivel;
    }

    public String getStrUser() {
        return strUser;
    }

    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }
    
    public boolean isBooSelect() {
        return this.booSelect;
    }
    public void setBooSelect(boolean booSelect) {
        this.booSelect = booSelect;
    }
}
