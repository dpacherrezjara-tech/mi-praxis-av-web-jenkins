/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import java.io.Serializable;
import net.miatech.beans.Pagination;
import net.miatech.librfnd.A2751;

/**
 *
 * @author claudia
 */
public class A2751Filter extends A2751 implements Serializable {

    public int RN;
    public String IN_DATE = "";
    public String IN_COUNTRY = "";
    public String IN_TICKET = "";
    public String IN_PNR = "";
    public String IN_NROSOL = "";
    public String strTicket = "";
    public String strMsj = "";
    public String strEstado = "";
    public String strDescripcion = "";
    public String strNomPasajero = "";
    public String strFormatSDATE = "";
    public String strDescPais = "";
    public String strDescCiudad = "";
    public String strDescPaisE = "";
    public String strDescCiudadE = "";
    public String strSCANAL = "";
    public String strAttach = "";
    public String strConj = "";
    public String strTitulo = "";
    public long lngQTOTAL = 0;
    public Pagination page = new Pagination();

    /*public String getEstado(String strEstado, String idioma) {
        String strDescEstado = "";
        if (idioma.trim().equals("ES")) {
            if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Pendiente";
            } else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "En Proceso";
            } else if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Aprobado";
            } else if (this.STVAL.trim().equals("4")) {
                strDescEstado = "Denegado";
            }
        } else {
            //EN
            if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Pending";
            } else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "On Process";
            } else if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Approved";
            } else if (this.STVAL.trim().equals("4")) {
                strDescEstado = "Denied";
            }
        }
        return strDescEstado;
    }*/
    
    public String getEstado(String strEstado, String idioma) {
        String strDescEstado = "";
        if (idioma.trim().equals("ES")) {
            if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Pendiente";
            } else if (this.STVAL.trim().equals("0")) {
                strDescEstado = "En Proceso";
            } else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "En Consulta";
            } else if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Denegado";
            }
        } else {
            //EN
            if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Pending";
            } else if (this.STVAL.trim().equals("0")) {
                strDescEstado = "On Process";
            } else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "Approved";
            } else if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Denied";
            }
        }
        return strDescEstado;
    }

    public String getDescCanal() {
        String strDescCanal = "";
        if (this.SCANAL.trim().equals("B")) {
            strDescCanal = "BSP";
        } else if (this.SCANAL.trim().equals("A")) {
            strDescCanal = "ARC";
        } else if (this.SCANAL.trim().equals("S")) {
            strDescCanal = "ASR";
        }
        return strDescCanal;
    }

    public String getDescTipo() {
        String strDescCanal = "";
        if (this.SCANAL.trim().equals("T")) {
            strDescCanal = "Total";
        } else if (this.SCANAL.trim().equals("P")) {
            strDescCanal = "Parcial";
        }
        return strDescCanal;
    }
}
