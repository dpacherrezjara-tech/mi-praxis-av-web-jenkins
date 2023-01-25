/*
 * RECWRF020.java
 *
 * Created on 21 de mayo de 2008, 15:39 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;


public class RECWRF020 implements Serializable {
        
    private String strCCUST;
    private String strCCUSA;
    private String strAirName;
    private String strUser;
    private String strAplica;
    private String strNameUser;
    private String strBoss;
    private String strNivel;
    private String strCity;
    private String strMensajeError;
    private String strHolding;
    private String strTxtFocus;
    
    /** Creates a new instance of RECWRF020 */
    public RECWRF020() {

        strCCUST = "";
        strCCUSA = "";
        strAirName = "";
        strUser = "";
        strAplica = "";
        strNameUser = "";
        strBoss = "";
        strNivel = "";
        strCity = "";
        strMensajeError = "";
        strHolding = "";
        strTxtFocus = "txtUser";

    }

    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }
    
    
    
    public String getStrCCUSA() {
        return this.strCCUSA;
    }
    public void setStrCCUSA(String strCCUSA) {
        this.strCCUSA = strCCUSA;
    }
    
    
    
    public String getStrAirName() {
        return this.strAirName;
    }
    public void setStrAirName(String strAirName) {
        this.strAirName = strAirName;
    }
    
    
    
    public String getStrUser() {
        return this.strUser;
    }
    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }    

    
    
    public String getStrAplica() {
        return this.strAplica;
    }
    public void setStrAplica(String strAplica) {
        this.strAplica = strAplica;
    }
    
    
    
    public String getStrNameUser() {
        return this.strNameUser;
    }
    public void setStrNameUser(String strNameUser) {
        this.strNameUser = strNameUser;
    }
    
    
    
    public String getStrBoss() {
        return this.strBoss;
    }
    public void setStrBoss(String strBoss) {
        this.strBoss = strBoss;
    }
    
    
    
    public String getStrNivel() {
        return this.strNivel;
    }
    public void setStrNivel(String strNivel) {
        this.strNivel = strNivel;
    }
    
    
    
    public String getStrCity(){
        return this.strCity;
    }
    public void setStrCity(String strCity) {
        this.strCity = strCity;
    }
    
    
    
    public String getStrMensajeError(){
        return this.strMensajeError;
    }
    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
    }
    
    
    
    public String getStrHolding(){
        return this.strHolding;
    }
    public void setStrHolding(String strHolding) {
        this.strHolding = strHolding;
    }
    
    
    
    public String getStrTxtFocus(){
        return this.strTxtFocus;
    }
    public void setStrTxtFocus(String strTxtFocus) {
        this.strTxtFocus = strTxtFocus;
    }
    
    
    
}
