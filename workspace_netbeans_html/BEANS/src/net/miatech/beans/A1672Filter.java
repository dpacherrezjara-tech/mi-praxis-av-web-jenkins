/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.List;
import net.miatech.libmiatec.A1672;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class A1672Filter extends A1672 {

    //CAMPOS POSICIONAMIENTO =================
    public String PS_IATA = "";
    public String PS_FTE = "";
    public String PS_TRNCU = "";
    public String PS_TKT = "";
    //CAMPOS DE FILTRO =======================
    public String IN_TIPFEC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FTE = "";
    public String IN_CANAV = "";
    public String IN_TRNCU = "";
    public String IN_TIPOFA = "";
    public String IN_FLADM = "";
    public String IN_IATA = "";
    public String IN_CODIT = "";
    public String IN_FBASIS = "";
    public String IN_REACOD = "";
    public String IN_TYPE = "";
    public String IN_AUDITED = "";
    public String IN_TDOC = "";
    public String IN_COUNTRY = "";
    public String IN_TKT = "";
    //========================================
    public String FECHA = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strDescipcion = "";
    public String strDescipcion1 = "";
    public String strDescipcion2 = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strTicket = "";
    public String strPrimerTicket = "";
    public String strRuta = "";
    public String strType = "";
    public String strAccDist = "";
    public String strAccLinea = "";
    public String strBSPLink = "";
    public String strTipodeTasa = "";
    public String strNomPais = "";
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
    public String ULT_DATE = "";
    public String strSQL = "";
    public String strCurr1 = "";
    public String strCurr2 = "";
    public long lngCantADM1 = 0;
    public long lngCantADM2 = 0;
    public double dblAmtADM1 = 0;
    public double dblAmtADM2 = 0;
    public String strDescTaxes = "";
    public double dblTotTTMIA = 0;
    public double dblTotTTAGT = 0;
    public double dblTotTTDIF = 0;
    public String strPag = "";
    public String strREACOD = "";
    public String strFLAG = "";
    public String strAudited = "";
    public String strTransfer = "";
    public String strStatusRev = "";
    
    public int TOTAL = 0;
    public int ASIG = 0;
    public int TRAB = 0;
    public int PEND = 0;
    public int ADM = 0;
    public int NOADM = 0;
    public double AMT = 0;
    public double Perc1 = 0;
    public double Perc2 = 0;
    public double Perc3 = 0;

    public long totTOTAL = 0;
    public long totASIG = 0;
    public long totTRAB = 0;
    public long totPEND = 0;
    public long totADM = 0;
    public long totNOADM = 0;
    public double totAMT = 0;
    public double totPerc1 = 0;
    public double totPerc2 = 0;
    public double totPerc3 = 0;
	    
    
    //A1673 ====================================================================
    public String A1663TYPE = "";
    public String A1580DESC2 = "";
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    public List<A1672Filter> lstTickets = null;
    public Pagination page = new Pagination();

    public String bufferToString(String ccust) {

        String strValue = "";
        String strKeyUp = "";
        String strFilter = "";
        String strTabla = "A1672O";
        
        //Cambio a pedio de ENS 20170503
        if(!this.IN_TKT.trim().isEmpty()){
            strTabla = "A1672";
            this.PS_TKT = this.IN_TKT;
        }

        //03 PROGRAMA    PIC X(10).
        strValue += Functions.fillString("PRO11032", 10);
        //03 TABLA       PIC X(10).
        strValue += Functions.fillString(strTabla, 10);

        //**********************************************************************
        //05 LK-KEYUP         PIC X(100). **************************************
        //**********************************************************************
        //05 CCUST         PIC X(03).
        strKeyUp += Functions.fillString(ccust, 3);
        //05 FPROCI        PIC X(08).
        strKeyUp += Functions.fillString(this.IN_FECHA_FROM, 8);
        //05 FPROCF        PIC X(08).
        strKeyUp += Functions.fillString(this.IN_FECHA_TO, 8);
        //05 FUENT         PIC X(03).
        strKeyUp += Functions.fillString(this.PS_FTE, 3);
        //05 AGENT         PIC X(08).
        strKeyUp += Functions.fillString(this.PS_IATA, 8);
        //05 TRNCU         PIC X(04).
        strKeyUp += Functions.fillString(this.PS_TRNCU, 4);
        //05 TKT.                    
        //*06 CCIA         PIC X(03).
        //*06 FORMA        PIC X(04).
        //*06 SERIE        PIC X(06).
        strKeyUp += Functions.fillString(this.PS_TKT, 13);
        //Colocando el KEYUP en la cadena principal rellenando a 100
        strKeyUp = Functions.fillString(strKeyUp, 100);
        strValue += strKeyUp;
        //System.out.println("strKeyUp : " + strKeyUp.length());
        //**********************************************************************
        //**********************************************************************

        //**********************************************************************
        //04 LK-FILTER        PIC X(100). **************************************
        //**********************************************************************
        //05 AGENTF        PIC X(08). 
        strFilter += Functions.fillString(this.IN_IATA, 8);
        //05 FUENTF        PIC X(03). 
        strFilter += Functions.fillString(this.IN_FTE, 3);
        //05 TRNCUF        PIC X(04).
        strFilter += Functions.fillString(this.IN_TRNCU, 4);
        //05 CODITF        PIC X(20).
        strFilter += Functions.fillString(this.IN_CODIT, 20);
        //05 CODREAF       PIC X(06).
        strFilter += Functions.fillString(this.IN_REACOD, 6);
        //05 STS0F         PIC X(01).
        strFilter += Functions.fillString(this.IN_TYPE, 1);
        //05 FAUDITF       PIC X(01).
        strFilter += Functions.fillString(this.IN_TIPOFA, 1);
        //05 FLADMF        PIC X(01).
        strFilter += Functions.fillString(this.IN_FLADM, 1);
        //05 TDOCF         PIC X(04).
        strFilter += Functions.fillString(this.IN_TDOC, 4);
        //05 PAISF         PIC X(02).
        strFilter += Functions.fillString(this.IN_COUNTRY, 2);
        //05 TKTF.                    
        //*06 CCIAF        PIC X(03).
        //*06 FORMAF       PIC X(04).
        //*06 SERIEF       PIC X(06).
        //strFilter += Functions.fillString(this.IN_TKT, 13);
        strFilter += Functions.fillString("", 13);
        //Colocando el FILTER en la cadena principal rellenando a 100
        strFilter = Functions.fillString(strFilter, 100);
        strValue += strFilter;
        //System.out.println("strFilter : " + strFilter.length());
        //**********************************************************************
        //**********************************************************************
        //04 PG-DN            PIC X(01). 
        strValue += Functions.fillString(this.strPag.trim(), 1);
        //System.out.println("strValue : " + strValue.length());
        //05 LK-ERR           PIC X(01).
        strValue += Functions.fillString("", 01);
        //05 LK-MSG           PIC X(49).
        strValue += Functions.fillString("", 49);

        //System.out.println(strValue.length());

        return strValue.toUpperCase();
    }
}
