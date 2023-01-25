/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.utils.Functions;

/**
 *
 * @author rmayta
 */
public class SQP00697Filter {

    public int IN_TFILTER = 0;
    public String IN_TEXT = "";
    @Deprecated
    public String IN_CIA = "";
    @Deprecated
    public String IN_FOR = "";
    @Deprecated
    public String IN_SER = "";
    @Deprecated
    public String IN_PAX = "";
    @Deprecated
    public String IN_PNR = "";
    @Deprecated
    public String IN_NREF_P1 = "";
    @Deprecated
    public String IN_NREF_P2 = "";
    public String ROWKEY = "";
    @Deprecated
    public long RN = 0;
    public String A720PAX = "";
    public String TICKET = "";
    public String A1531NREF = "";
    public String A720CIUVTA = "";
    public String A720FECVTA = "";
    public String A720AGENTE = "";
    public double A720TARIFA = 0d;
    public String A720MONEDA = "";
    public String A720PNR = "";
    public double A1531VFOP = 0d;
    public double totA1531VFOP = 0d;
    public String A720SEQ = "";
    public String A1531CAPL = "";
    public String A1531MFOP = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_IATA = "";
    public String IN_CAPL = "";
    public Pagination page = new Pagination();
    
    public String bufferToString(String ccust, String strTicket, String strPag, String comodin) {

        String strValue = "";
        
        for (int i = 0; i < 20; i++) {
            //05 A720PAX     PIC X(45).   
            strValue += Functions.fillString("", 45);
            //05 A720CIA     PIC X(03).   
            //05 A720FORMA   PIC X(04).   
            //05 A720SERIE   PIC X(06).   
            strValue += Functions.fillString("", 13);
            //05 A720CIUVTA  PIC X(3).    
            //05 A720FECVTA  PIC X(8).    
            strValue += Functions.fillString("", 11);
            //05 A720TARIFA  PIC 9(13)V99.
            strValue += Functions.fillZeros(15, "");
            //05 A720MONEDA  PIC X(3).    
            //05 A720PNR     PIC X(6).    
            //05 A1531NREF   PIC X(19).   
            strValue += Functions.fillString("", 28);
            //05 A1531VFOP   PIC 9(13)V99.
            strValue += Functions.fillZeros(15, "");
        }
        //03 TABLA       PIC X(10).
        strValue += Functions.fillString("A720X", 10);
        //03 PG-DN       PIC X(01).
        strValue += Functions.fillString(strPag, 1);
        //06 K-AIRLIN    PIC X(03).
        strValue += Functions.fillString(ccust, 3);
        //06 K-PAX       PIC X(45).
        strValue += Functions.fillString(this.IN_PAX, 45);
        //06 K-TKT       PIC X(13).
        strValue += Functions.fillString(strTicket, 13);
        //06 K-WIZ       PIC X(01).
        strValue += Functions.fillString(comodin, 1);
        //06 K-IND       PIC 99.
        strValue += Functions.fillZeros(2, String.valueOf(this.IN_PAX.trim().length()));
        //03 MSG         PIC X(35).
        strValue += Functions.fillString("", 32);

        return strValue.toUpperCase();
    }
}
