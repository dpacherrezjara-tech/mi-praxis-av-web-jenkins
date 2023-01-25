
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class RECA051 implements Serializable {
    
    /** Creates a new instance of RECA051 */
    
    
    private String strTipo;
    private String strCodigo;
    private String strDescripcion1;
    private String strDescripcion2;
    private long lngCantidad1;
    private long lngCantidad2;
    private String strFecha1;
    private String strFecha2;
    private String strComent;
    private String strStatus;
    
    public RECA051() {

        strTipo = "";
        strCodigo = "";
        strDescripcion1 = "";
        strDescripcion2 = "";
        lngCantidad1 = 0;
        lngCantidad2 = 0;
        strFecha1 = "";
        strFecha2 = "";
        strComent = "";
        strStatus = "";

    }   
    

    public String getStrTipo() {
        return this.strTipo;
    }

    public void setStrTipo(String strTipo) {
        this.strTipo = strTipo;
    }
    

    public String getStrCodigo() {
        return this.strCodigo;
    }

    public void setStrCodigo(String strCodigo) {
        this.strCodigo = strCodigo;
    }
    

    public String getStrDescripcion1() {
        return this.strDescripcion1;
    }

    public void setStrDescripcion1(String strDescripcion1) {
        this.strDescripcion1 = strDescripcion1;
    }
    

    public String getStrDescripcion2() {
        return this.strDescripcion2;
    }

    public void setStrDescripcion2(String strDescripcion2) {
        this.strDescripcion2 = strDescripcion2;
    }
    

    public long getLngCantidad1() {
        return this.lngCantidad1;
    }

    public void setLngCantidad1(long lngCantidad1) {
        this.lngCantidad1 = lngCantidad1;
    }
    

    public long getLngCantidad2() {
        return this.lngCantidad2;
    }

    public void setLngCantidad2(long lngCantidad2) {
        this.lngCantidad2 = lngCantidad2;
    }
    

    public String getStrFecha1() {
        return this.strFecha1;
    }

    public void setStrFecha1(String strFecha1) {
        this.strFecha1 = strFecha1;
    }
    

    public String getStrFecha2() {
        return this.strFecha2;
    }

    public void setStrFecha2(String strFecha2) {
        this.strFecha2 = strFecha2;
    }
    

    public String getStrComent() {
        return this.strComent;
    }

    public void setStrComent(String strComent) {
        this.strComent = strComent;
    }
    

    public String getStrStatus() {
        return this.strStatus;
    }

    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }
    
}
