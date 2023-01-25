/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A3772;

/**
 *
 * @author jtorres
 */
public class A3772Filter extends A3772 {

    public long RN = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_SCOUNTRY = "";
    public String IN_CODEBANK = "";
    public String IN_SCURRENCY = "";
    public String IN_TKT = "";
    public String IN_PNR = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String strTicket = "";
    public String strTicketO = "";
    public String strTicketI = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strFormatDate5 = "";
    public String strDesc = "";
    public String strDesc1 = "";
    public String strDesc2 = "";
    public String strDesc3 = "";
    public String strDesc4 = "";
    public String strDesc5 = "";
    public String strSVFOP = "";
    public String strSVFOPT = "";
    public String strQTYDOC = "";
    public String desSTATKU="";
    public String desFRFND="";

    public long totQTYDOC = 0;
    public double totSVFOP = 0;
    public long totCTKTC = 0;
    public double totTRFPAG = 0;
    public double totTTAX = 0;
    public double totVALOLO = 0;
    public double totVALTAX = 0;
    public double totTOTPEND = 0;
    public double totVALOLOU = 0;
    public double totVALTAXU = 0;
    public double totTOTUSED = 0;
    public double totSVFOPT = 0;

    /**
     * 3775
     */
    public long totQTYTRA = 0;
    public double totAMOUNT = 0;
    public long totQTYTKT = 0;
    public double totAMTTKT = 0;
    public long totQTYEMDA = 0;
    public double totAMTEMDA = 0;
    public long totQTYEMDS = 0;
    public double totAMTEMDS = 0;
    public long totQTYVOU = 0;
    public double totAMTVOU = 0;

    public long totQTYTKTP = 0;
    public long totQTYTKPP = 0;
    public long totQTYTKTU = 0;
    public double totAMTTKTP = 0.0;
    public double totAMTTKPP = 0.0;
    public double totAMTTKTU = 0.0;

    public long totQTYTKTP0 = 0;
    public long totQTYTKTPT = 0;
    public long totQTYTKTPP = 0;
    public long totQTYTKTU1 = 0;
    public long totQTYEXCH1 = 0;
    public long totQTYCADU1 = 0;
    public long totQTYFLOW1 = 0;
    public long totQTYRFND1 = 0;
    public long totQTYTKTU2 = 0;
    public long totQTYTKTPU = 0;
    public long totQTYTOTAL = 0;

    public double totAMTTKTP0 = 0.0;
    public double totAMTTKTPT = 0.0;
    public double totAMTTKTPP = 0.0;
    public double totAMTTKTU1 = 0.0;
    public double totAMTFLOW1 = 0.0;
    public double totAMTEXCH1 = 0.0;
    public double totAMTRFND1 = 0.0;
    public double totAMTCADU1 = 0.0;
    public double totAMTTKTU2 = 0.0;
    public double totAMTTKTPU = 0.0;
    public double totAMTTOTAL = 0.0;

    public double totTRANEXCH = 0.0;
    public double totUSEDEXCH = 0.0;

    public Pagination page = new Pagination();

}
