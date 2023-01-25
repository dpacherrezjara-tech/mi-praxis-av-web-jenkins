/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import java.io.Serializable;
import net.miatech.beans.Pagination;
import net.miatech.librfnd.A3218;

/**
 *
 * @author claudia
 */
public class A3218Filter extends A3218 implements Serializable {

    public int RN;
    public String IN_DATE = "";
    public String IN_COUNTRY = "";
    public String IN_AREA = "";
    public String strTicket = "";
    public String strMsj = "";
    public String strEstado = "";
    public String strDescripcion = "";
    public String strYearFrom = "";
    public String strMonthFrom = "";
    public String strDayFrom = "";
    public String strYearTo = "";
    public String strMonthTo = "";
    public String strDayTo = "";
    public String strTitulo = "";
    public String Usuario = "";
    public String Nivel = "";
    public String strFormatDate = "";

    public long lngQRECI = 0;
    public long lngQPEND = 0;
    public long lngQPROC = 0;
    public long lngQAPPR = 0;
    public long lngQCONS = 0;
    public long lngQDENI = 0;
    public long lngSABRE = 0;
    public long lngASIG_TRAB = 0;
    public long lngASIG_SINTRAB = 0;
    
    public long lngTotQRECI = 0;
    public long lngTotQPEND = 0;
    public long lngTotQPROC = 0;
    public long lngTotQAPPR = 0;
    public long lngTotQCONS = 0;
    public long lngTotQDENI = 0;
    public long lngTotSABRE = 0;
    public long lngTotASIG_TRAB = 0;
    public long lngTotASIG_SINTRAB = 0;
    
    public Pagination page = new Pagination();


    /*public String getDescCanal() {
     String strDescCanal = "";
     if (this.SCANAL.trim().equals("B")) {
     strDescCanal = "BSP";
     } else if (this.SCANAL.trim().equals("A")) {
     strDescCanal = "ARC";
     } else if (this.SCANAL.trim().equals("S")) {
     strDescCanal = "ASR";
     }
     return strDescCanal;
     }*/
}
