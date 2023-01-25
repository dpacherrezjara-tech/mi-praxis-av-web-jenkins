/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import java.io.Serializable;
import net.miatech.beans.Pagination;
import net.miatech.librfnd.A2750;

/**
 *
 * @author claudia
 */
public class A2750Filter extends A2750 implements Serializable {

    public int RN;
    public String IN_DATE = "";
    public String IN_COUNTRY = "";
    public String IN_TICKET = "";
    public String IN_PNR = "";
    public String IN_NROSOL = "";
    public String IN_TMOTI = "";
    public String strTicket = "";
    public String strMsj = "";
    public String strEstado = "";
    public String strDescripcion = "";
    public String strNomPasajero = "";
    public String strFormatSDATE = "";
    public String strDescPais = "";
    public String strDescCiudad = "";
    public String strDescTipo = "";
    public String strSCANAL = "";
    public String strAttach = "";
    public String strConj = "";
    public String strYearFrom = "";
    public String strMonthFrom = "";
    public String strDayFrom = "";
    public String strYearTo = "";
    public String strMonthTo = "";
    public String strDayTo = "";
    public String strTitulo = "";
    public long lngQTOTAL = 0;
    public String TRUTA = "";
    public String strDescTRUTA = "";
    //Cantidades Voluntario
    public long lngQPENDV = 0;
    public long lngQPROCV = 0;
    public long lngQAPPRV = 0;
    public long lngQDENIV = 0;
    //Cantidades InVoluntario
    public long lngQPENDI = 0;
    public long lngQPROCI = 0;
    public long lngQAPPRI = 0;
    public long lngQDENII = 0;
    public Pagination page = new Pagination();
    /*public double dblTotal = 0;
     public double dblRate = 0;
     public List<A1531> lstPago = new ArrayList<A1531>();
     public List<String> lstAttachments = new ArrayList<String>();
     public List<A720> lstCupones = new ArrayList<A720>();*/

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
}
