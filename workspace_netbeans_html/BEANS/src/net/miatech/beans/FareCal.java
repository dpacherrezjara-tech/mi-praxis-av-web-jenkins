
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author crios
 */
public class FareCal implements Serializable{

    private String strConexion;
    private String strCityFrom;
    private String strCityTo;
    private String strOperador;
    private String strSIDETRIP;
    private String strTempQ;
    private String strMillaje;
    private String strTempCorte;
    private String strFB;
    private String strRouting;

    public FareCal() {

        strConexion = "";
        strCityFrom = "";
        strCityTo = "";
        strOperador = "";
        strSIDETRIP = "";
        strTempQ = "";
        strMillaje = "";
        strTempCorte = "";
        strFB = "";
        strRouting = "";

    }


    public String getStrCityFrom() {
        return strCityFrom;
    }

    public void setStrCityFrom(String strCityFrom) {
        this.strCityFrom = strCityFrom;
    }

    public String getStrCityTo() {
        return strCityTo;
    }

    public void setStrCityTo(String strCityTo) {
        this.strCityTo = strCityTo;
    }

    public String getStrConexion() {
        return strConexion;
    }

    public void setStrConexion(String strConexion) {
        this.strConexion = strConexion;
    }

    public String getStrFB() {
        return strFB;
    }

    public void setStrFB(String strFB) {
        this.strFB = strFB;
    }

    public String getStrMillaje() {
        return strMillaje;
    }

    public void setStrMillaje(String strMillaje) {
        this.strMillaje = strMillaje;
    }

    public String getStrOperador() {
        return strOperador;
    }

    public void setStrOperador(String strOperador) {
        this.strOperador = strOperador;
    }

    public String getStrSIDETRIP() {
        return strSIDETRIP;
    }

    public void setStrSIDETRIP(String strSIDETRIP) {
        this.strSIDETRIP = strSIDETRIP;
    }

    public String getStrTempCorte() {
        return strTempCorte;
    }

    public void setStrTempCorte(String strTempCorte) {
        this.strTempCorte = strTempCorte;
    }

    public String getStrTempQ() {
        return strTempQ;
    }

    public void setStrTempQ(String strTempQ) {
        this.strTempQ = strTempQ;
    }

    public String getStrRouting() {
        return strRouting;
    }

    public void setStrRouting(String strRouting) {
        this.strRouting = strRouting;
    }



}
