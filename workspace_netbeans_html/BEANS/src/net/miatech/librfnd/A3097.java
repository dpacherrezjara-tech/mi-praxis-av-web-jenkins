/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd;

/**
 *
 * @author claudia
 */
public class A3097 {

    public String strDescRutaO = "";
    public String strDescRutaD = "";
    public String strDescUso = "";

    public String A3097CCUST = "";
    public String A3097TKT = "";
    public String A3097CPN = "";
    public String A3097TKTP = "";
    public String A3097TKTID = "";
    public long A3097NSEQ = 0;
    public String A3097FCARG = "";
    public String A3097TENVI = "";
    public String A3097RUTA0 = "";
    public String A3097RUTA1 = "";
    public String A3097CARR1 = "";
    public String A3097FVLO1 = "";
    public String A3097FB1 = "";
    public String A3097STCP1 = "";
    public String A3097RUTA2 = "";
    public String A3097CARR2 = "";
    public String A3097FVLO2 = "";
    public String A3097FB2 = "";
    public String A3097STCP2 = "";
    public String A3097RUTA3 = "";
    public String A3097CARR3 = "";
    public String A3097FVLO3 = "";
    public String A3097FB3 = "";
    public String A3097STCP3 = "";
    public String A3097RUTA4 = "";
    public String A3097CARR4 = "";
    public String A3097FVLO4 = "";
    public String A3097FB4 = "";
    public String A3097STCP4 = "";
    //=======================
    public String A3097USRIN = "";
    public String A3097FECIN = "";
    public String A3097HORIN = "";
    public String A3097USRAC = "";
    public String A3097FECAC = "";
    public String A3097HORAC = "";

    public String getDescUso() {
        String strUso = "";
        if (this.A3097STCP1.trim().equals("R")) {
            strUso = "RFND";
        } else if (this.A3097STCP1.trim().equals("U")) {
            strUso = "USED";
        } else if (this.A3097STCP1.trim().equals("E")) {
            strUso = "EXCH";
        } else if (this.A3097STCP1.trim().equals("L")) {
            strUso = "LIFTED";
        } else if (this.A3097STCP1.trim().equals("V")) {
            strUso = "VOID";
        } else{
            strUso = this.A3097STCP1.trim();
        }
        return strUso;
    }

}
