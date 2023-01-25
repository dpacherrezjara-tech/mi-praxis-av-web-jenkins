/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2331;

/**
 *
 * @author claudia
 */
public class A2331Filter extends A2331 {

    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFecFiltro = "";
    public int pos = 0;
    public long days = 0;
    public String strSemaforo = "";

    public String IN_CARDN = "";
    public String IN_CARDC = "";
    public String IN_STVAL = "";
    public String IN_MERCHN = "";
    public String IN_DATE = "";
    public String IN_AGENT = "";
    public String IN_AUTHNBR = "";
    public String IN_CODEBANK = "";
    public String IN_TCARD = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String IN_RUTA = "";
    public String IN_SELECTI = "";
    public String IN_SELECT = "";
    public String IN_TDOC = "";
    public String IN_COUNTRY = "";

    public String strDescription = "";
    public String strDescription1 = "";
    public String strDescription2 = "";
    public String strDireccion = "";
    public String strCANAL = "";
    public String strSCARDN = "";
    public String strTicket = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strDescripcion = "";
    public String strDescCountry = "";
    public String strDescCard = "";
    public String strDescStatus = "";
    public String strDescCRULE = "";
    public String strDescMerchn = "";
    public String strTitulo = "";
    public String strUsoCpn1 = "";
    public String strUsoCpn2 = "";
    public String strUsoCpn3 = "";
    public String strUsoCpn4 = "";
    public String strDescUsoCpn1 = "";
    public String strDescUsoCpn2 = "";
    public String strDescUsoCpn3 = "";
    public String strDescUsoCpn4 = "";
    public String strImgLink = "";
    public String strUsoCpnF1 = "";
    public String strUsoCpnF2 = "";
    public String strUsoCpnF3 = "";
    public String strUsoCpnF4 = "";
    public String strIndSabCpn1 = "";
    public String strIndSabCpn2 = "";
    public String strIndSabCpn3 = "";
    public String strIndSabCpn4 = "";
    public String strDesIndSabCpn1 = "";
    public String strDesIndSabCpn2 = "";
    public String strDesIndSabCpn3 = "";
    public String strDesIndSabCpn4 = "";

    public String strDescUsoCpnF1 = "";
    public String strDescUsoCpnF2 = "";
    public String strDescUsoCpnF3 = "";
    public String strDescUsoCpnF4 = "";
    public String strDescBank = "";
    public String strFlag = "";
    public String strDescError = "";
    public String NOMTARHAB = "";
    public String COMMENT = "";
    public String DATE = "";
    public String TICKET = "";

    public long lngQLINK = 0;
    public long lngQCARD = 0;
    public long lngQNOT = 0;
    public long lngQNMATCH = 0;
    public double dblANOT = 0;
    public long lngDocs = 0;
    public long lngTotDocs = 0;
    public double dblTotAUTAMOUNT = 0;
    public double dblTotVFOP = 0;
    public long lngTotQLINK = 0;
    public long lngTotQCARD = 0;
    public long lngTotQNOT = 0;
    public long lngTotQNMATCH = 0;
    public long lngTotTOTCUP = 0;
    public double dblTotANOT = 0;
    public double dblPercCharged = 0;

    public long totQTYCHGBK = 0; //QTYCHGBK
    public long totQTYCLARR = 0;//QTYCLARR
    public double totAMTCHGBU = 0;
    public double totAMTREVCU = 0;

    //CAMPOS A2335
    public double dblTotOPEAMOUNT = 0;
    public double dblTotIVA = 0;
    public long lngTotQTYTRNX = 0;
    public double dblTotPercCharged = 0;

    //DASHBOARD
    public double dblAMTSALE = 0;
    public long lngQTYCLAR = 0;
    public long lngQTYCLART = 0;
    public long lngQTYCLARS = 0;
    public long lngQTYCLARP = 0;
    public long lngQTYCLARC = 0;
    public double dblAMTCLAR = 0;
    public double dblAMTCLARU = 0;
    public long lngQTYBANK = 0;
    public long lngQTYBANKT = 0;
    public long lngQTYBANKN = 0;
    public double dblAMTBANK = 0;
    public double dblAMTBANKU = 0;

    public double dblTotAMTSALE = 0;
    public long lngTotQTYCLAR = 0;
    public long lngTotQTYCLART = 0;
    public long lngTotQTYCLARS = 0;
    public long lngTotQTYCLARP = 0;
    public long lngTotQTYCLARC = 0;
    public double dblTotAMTCLAR = 0;
    public double dblTotAMTCLARU = 0;
    public long lngTotQTYBANK = 0;
    public long lngTotQTYBANKT = 0;
    public long lngTotQTYBANKN = 0;
    public double dblTotAMTBANK = 0;
    public double dblTotAMTBANKU = 0;

    public double perAnsw = 0;
    public double perNoAnsw = 0;
    public double perRec = 0;

    public double TotperAnsw = 0;
    public double TotperNoAnsw = 0;
    public double TotperRec = 0;

    public long QTYCHGBK = 0;
    public double AMTCHGBU = 0;
    public long QTYCLARR = 0;
    public double AMTREVCU = 0;

    public double per = 0;
    public double per1 = 0;
    public double per2 = 0;
    public double totper = 0;
    public double totper1 = 0;
    public double totper2 = 0;

    /*A2343*/
    public int QTYGDSB = 0;
    public double AMTGDSB = 0;
    public double AMTGDSBU = 0;
    public long totQTYGDSB = 0;
    public double totAMTGDSB = 0;
    public double totAMTGDSBU = 0;
    
    public Pagination page = new Pagination();

}
