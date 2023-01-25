/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.List;
import net.miatech.libmiatec.A1580;

/**
 *
 * @author rmayta
 */
public class A1580Filter extends A1580 {

    public int COUNT_DATES_TOTAL = 0;
    public String ULT_DATE = "";
    public int COUNT_QTY_TOTAL = 0;
    public int COUNT_QTY_REVIEWED = 0;
    public int COUNT_QTY_PENDING = 0;
    public int COUNT_DATES_REVIEWED = 0;
    public int COUNT_DATES_COMPLETED = 0;
    public int COUNT_DATES_PENDING = 0;
    public String strTicket = "";
    public String strRuta = "";
    public String strType = "";
    public String strAccDist = "";
    public String strAccLinea = "";
    public String strBSPLink = "";
    public String strTipodeTasa = "";
    public int pos = 0;
    //Datos del Agente
    public String strNombre = "";
    public String codAgente = "";
    public String strUbicacion = "";
    public String strDirecAgte = "";
    public String strCodPostal = "";
    public String strCiudad = "";
    public String strPais = "";
    public String strTelefono = "";
    public String strFax = "";
    public String strEmail = "";
    public List lstTickets = null;
}
