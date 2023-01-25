/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.A1531;
import net.miatech.praxis.A720;
import net.miatech.librfnd.RFF001;

/**
 *
 * @author claudia
 */
public class RFF001Filter extends RFF001 implements Serializable {

    public int RN;
    public String IN_TICKET = "";
    public String IN_PNR = "";
    public String IN_NROSOL = "";
    public String IN_DATE = "";
    public String strTicket = "";
    public String strMsj = "";
    public String strEstado = "";
    public String strDescripcion = "";
    public String strNomPasajero = "";
    public String strFormatSDATE = "";
    public String strDescPais = "";
    public String strDescCiudad = "";
    public String strSCANAL = "";
    public String strAttach = "";
    public String strConj = "";
    public double dblTotal = 0;
    public double dblTax = 0;
    public double dblRate = 0;
    public double dblMontoUsadoUSD = 0;
    public double dblMontoUsadoLoc = 0;
    public List<A1531> lstPago = new ArrayList<A1531>();
    public List<String> lstAttachments = new ArrayList<String>();
    public Pagination page = new Pagination();
    public List<A720> lstCupones = new ArrayList<A720>();

    public String getEstado(String strEstado, String idioma) {
        String strDescEstado = "";
        if (idioma.trim().equals("ES")) {
            if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Pendiente";
            }else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "En Proceso";
            }else if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Denegado";
            }else if (this.STVAL.trim().equals("4")) {
                strDescEstado = "Devuelto";
            }
        } else {
            //EN
            if (this.STVAL.trim().equals("1")) {
                strDescEstado = "Pending";
            }else if (this.STVAL.trim().equals("2")) {
                strDescEstado = "On Process";
            }else if (this.STVAL.trim().equals("3")) {
                strDescEstado = "Denied";
            }else if (this.STVAL.trim().equals("4")) {
                strDescEstado = "Refund";
            }
        }
        return strDescEstado;
    }
}
