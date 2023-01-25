package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class Summary implements Serializable {
    
    private String strFecha;
    private String strTipo;
    private String strTexto;
    private long lngQtyRec;
    private long lngQtyProc;
    private long lngQtyClos;
    private long lngQtyPend;
    private long lngQtyStandBy;
    private String strYearFrom;
    private String strMonthFrom;
    private long lngTotRec;
    private long lngTotProc;
    private long lngTotPend;
    private long lngTotClos;
    private long lngTotStandBy;
    
    /** Creates a new instance of Summary */
    public Summary() {

        strFecha = "";
        strTipo = "";
        strTexto = "";
        lngQtyRec = 0;
        lngQtyProc = 0;
        lngQtyPend = 0;
        lngQtyClos = 0;
        lngQtyStandBy = 0;
        strYearFrom = "";
        strMonthFrom = "";
        lngTotRec = 0;
        lngTotProc = 0;
        lngTotPend = 0;
        lngTotClos = 0;
        lngTotStandBy= 0;

    }

    public String getStrFecha() {
        return strFecha;
    }

    public void setStrFecha(String strFecha) {
        this.strFecha = strFecha;
    }

    public String getStrTipo() {
        return strTipo;
    }

    public void setStrTipo(String strTipo) {
        this.strTipo = strTipo;
    }

    public String getStrTexto() {
        return strTexto;
    }

    public void setStrTexto(String strTexto) {
        this.strTexto = strTexto;
    }

    public long getLngQtyRec() {
        return lngQtyRec;
    }

    public void setLngQtyRec(long lngQtyRec) {
        this.lngQtyRec = lngQtyRec;
    }

    public long getLngQtyProc() {
        return lngQtyProc;
    }

    public void setLngQtyProc(long lngQtyProc) {
        this.lngQtyProc = lngQtyProc;
    }

    public long getLngQtyPend() {
        return lngQtyPend;
    }

    public void setLngQtyPend(long lngQtyPend) {
        this.lngQtyPend = lngQtyPend;
    }

    public String getStrYearFrom() {
        return strYearFrom;
    }

    public void setStrYearFrom(String strYearFrom) {
        this.strYearFrom = strYearFrom;
    }

    public String getStrMonthFrom() {
        return strMonthFrom;
    }

    public void setStrMonthFrom(String strMonthFrom) {
        this.strMonthFrom = strMonthFrom;
    }

    public long getLngTotRec() {
        return lngTotRec;
    }

    public void setLngTotRec(long lngTotRec) {
        this.lngTotRec = lngTotRec;
    }

    public long getLngTotProc() {
        return lngTotProc;
    }

    public void setLngTotProc(long lngTotProc) {
        this.lngTotProc = lngTotProc;
    }

    public long getLngTotPend() {
        return lngTotPend;
    }

    public void setLngTotPend(long lngTotPend) {
        this.lngTotPend = lngTotPend;
    }

    public long getLngQtyClos() {
        return lngQtyClos;
    }

    public void setLngQtyClos(long lngQtyClos) {
        this.lngQtyClos = lngQtyClos;
    }

    public long getLngTotClos() {
        return lngTotClos;
    }

    public void setLngTotClos(long lngTotClos) {
        this.lngTotClos = lngTotClos;
    }

    public long getLngQtyStandBy() {
        return lngQtyStandBy;
    }

    public void setLngQtyStandBy(long lngQtyStandBy) {
        this.lngQtyStandBy = lngQtyStandBy;
    }

    public long getLngTotStandBy() {
        return lngTotStandBy;
    }

    public void setLngTotStandBy(long lngTotStandBy) {
        this.lngTotStandBy = lngTotStandBy;
    }

   
    
    
}
