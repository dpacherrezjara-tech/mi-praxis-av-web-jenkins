/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment;

/**
 *
 * @author claudia
 */
public class A2290 {

    public String CCUST = "";
    public String CCUSTCC = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String TKT = "";
    public String CORRL = "";
    
    public String PLACA = "";
    public String AGENT = "";
    public String FUENTE = "";
    public String COUNTRY = "";
    public String DATE = "";
    public String CONSOL = "";
    public String CARDN = "";
    public String AUTHOC = "";
    public String CARCOD = "";
    public String STATE = "";
    public String CURRENCY = "";
    public String USCURR = "";
    
    public String TDOC = "";
    public String descTDOC = "";
    public String DATABASE = "";
    public String CASOCVS = "";
//    public double IDDEB = 0;
    public String CODRULE = "";
    public String GRORULE = "";
    public String RQUERY = "";
    public String TQUERY = "";
    public String TTABLE = "";
    
    public String SEQ = "";
    public String STVAL = "";
    public String FSTVAL = "";
    public String VALDATE = "";
    public String VALDATEL = "";
    public String UNICODE = "";
    public String UNICODEL = "";
    public String FTE = "";
    public String TRNCU = "";
    public String NUMREF = "";
    public String TICKET = "";    
    public String CARD1 = "";    
    public String CARD2 = "";    
    //Datos de la Venta
    public String SDATEL = "";
    public String SCARDNL = "";
    public String MERCHNCL = "";
    public String SCARCODL = "";
    public String SCOUNTRYL = "";
    public String SAUTHOCL = "";
    public String SPNRL = "";
    public String SAGENTL = "";
    public String SEQL = "";
    public String SFLOAD = "";
    public String SCOUNTRY = "";
    public String COREP = "";
    public String desCOREP = "";
    public String CORES = "";
    public String strSCURRENCY = "";
    public String DESC_SCOUNTRY = "";
    public String SAGENT = "";
    public String TERMI = "";
    public String GENCON = "";
    public String descTERMI = "";
    public String RED = "";
    public String DESAGENT = "";
    public String RULE = "";
    public String SDATE = "";
    public String SDATEC = "";
    public String SDATEVTA = "";
    public String DEBTYPE = "";
    public String SPAYMENT = "";
    public String SCARCOD = "";
    public String STCNTR = "";
    public String BANDOC = "";
    public int CONT = 0;
    public String BANDOCL = "";
    public String STCON = "";
    public String FCONT = "";
    public String ERROR = "";
    public String NEGOC = "";
    public String descNEGOC = "";
    public String ACCNUMBER = "";
    public String ACCOUNT = "";
    public String BENCENC = "";
    public String ACCCOMP = "";
    public String CIACOME = "";
    public String REFER = "";
    public String TEXTO = "";
    public String TEXTOLAR = "";
    public String CLAVE1 = "";
    public String CLAVE3 = "";
    public String CECO = "";
    public String MERCHAND = "";
    public String ACCNUMBERL = "";
    public double SVFOP = 0;
    public double SVFOPADJ = 0;
    public double SVFOPC = 0;
    public double SVFOPD = 0;
    public double FAREO = 0;
    public double FAREC = 0;
    public double DIFF_FARE = 0;
    public double DIFF_COMMAMO = 0;
    public double COMMAMOC = 0;
    public double COMMAMO = 0;
    public double AFARE = 0;
    public double AIVA = 0;
    public double ATAX = 0;
    public double TOTAL = 0;
    public double SVFOPCON = 0;
    
    public double TOTAL_LIQ = 0;
    public double TOTAL_COMISION = 0;
    public double TOTAL_COMISTOTA = 0;
    public double TOTAL_NETO = 0;
    public double TOTAL_SVFOP = 0;
    public double TOTAL_IMPORTEPAG = 0;
    public double TOTAL_IMPORTE = 0;
    
    public String SCURRENCY = "";
    public String SCURRENCYL = "";
    public String SCURRENCYADJ = "";
    public String COREPL = "";
    public String SCARDNM = "";
    public String SCARDN = "";
    public String SCURREVEN = "";
    public String SDATEXP = "";
    public String SAUTHOC = "";
    public String SAUTHOCM = "";
    public String CARDTYPE = "";
    public String SINVN = "";
    public String SIDATE = "";
    public String SPNR = "";
    public String IDDEB = "";
    public String NOMCONCEP = "";
    public String SCONTROL = "";
    public String STVALU = "";
    public int MPF076TRAN = 0;
    public int MPF077TRAN = 0;
    public String SPNRSP = "";
    public String FCONC = "";
    //Datos del archivo ACCB
    public String AFTE = "";
    public String ADATEL = "";
    public String AFLOAD = "";
    public String ACOUNTRY = "";
    public String AAGENT = "";
    public String ADATE = "";
    public String APAYMENT = "";
    public String PAYDATE = "";
    public String ACARCOD = "";
    public String ATCNTR = "";
    public double AVFOP = 0;
    public double COMMFAREC = 0;
    public double TOTAL_ADM = 0;
    public double IDDEBF = 0;
    public double MAXF2 = 0;
    public double MINF2 = 0;
    public String ACURRENCY = "";
    public String ACARDN = "";
    public String PENDINGDAYS = "";
    public String ADATEXP = "";
    public String AAUTHOC = "";
    public String AINVN = "";
    public String AIDATE = "";
    public String APNR = "";
    public String APNRSP = "";
    public String MERCHN = "";
    public String SEQNUM = "";
    public String SEQCOUNT = "";
    public String BDATEL = "";
    public String BSTVAL = "";
    public String BDATEP = "";
    public String BSTVALP = "";
    public String GRUPO = "";
    public String IDFIL = "";
    public String BAID = "";
    public String CERROR = "";
    public String strCERROR = "";
    public String CREJEC = "";
    public String FLAGC = "";
    public String FNOBANK = "";
    public String SORIG = "";
    public String FADYEN = "";
    public String DATEC2 = "";
    public String DATEC3 = "";
    public String TRNXCODE = "";
    public String FUNDSTRGK = "";
    
    //ADJUSTMENT
    public String ASTVAL = "";
    public String ATDOC = "";
    public String TDOCADJ = "";
    public String ASCARCOD = "";
    public String ASCARDN = "";
    public String ASAUTHOC = "";
    public double AAMOUNT = 0;
    public String ASDATE = "";
    public String ADATEC = "";
    public String ATICKET = "";
    public String ASAGENT = "";
    public String ATRANC = "";
    public String ADJCODE = "";
    public String ACERROR = "";
    public String CERRORADJ = "";
    public String descCERRORADJ = "";
    public String descCERRORADJA = "";
    public String A4545DOCD = "";
    public String CERROR_DESC = "";
    
    //TEF
    public String TDATE = "";
    public String DATEF = "";
    //A2298
    public String REFBOOMER = "";
    
    //a2340
    public int QTYTKT = 0;
    public int QTYSETT = 0;
    public int DIFFDAYS = 0;
    public double TOTALCOM = 0;
    public double TCOMISCA = 0;
    public double diffTCOMIS = 0;
    public String FADM = "";
    public String strFADM = "";
    public double totTOTALCHRG = 0;
    public double totFIRSTINSAM = 0;
    public int totQTYTKT = 0;
    public double totTOTALCOM = 0;
    public double totTCOMISCA = 0;
    public double totDiffTCOMIS = 0;
    public double TOTAMOUNT = 0;
    public double lngTotAMOUNT = 0;
    public String ADMNUM = "";
    public String NUMADM = "";
    public String DATEADM = "";
    public double TOTADM = 0;
    public double SUBTOTAL = 0;
    public String CURRADM = "";
    public String SOCIETY = "";
    public String CODEBANK_EC = "";
    public String SOCIETYL = "";
    public String INTCOMP = "";
    public String AMOUNT = "";
    public String AMOUNTV = "";
    public String AMOUNTL = "";
    public String VARIACIONP = "";
    public String USERAV = "";
    public String TYPETRAN = "";
    public String FCONCEP = "";
    public String USERF = "";
    //Variables del Sistema
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
    public String PGMUP = "";
    
   
    public long QTY_100 = 0;
    public long QTY_101 = 0;
    public double SVFOP_100 = 0;
    public double SVFOP_101 = 0;
    
    public long TotlngQTYTKT = 0;
    public long TotlngQTYLIQ = 0;
    public double TotdblSVFOPTKT = 0;
    public double TotdblSVFOPLIQ = 0;

    public String SCARDNCOR = "";
    
    
    public String DCONTA4545 = "";
    public String USERA4545 = "";
    public String HEADEA4545 = "";
    
    public Boolean checkActive = true;
    public Boolean checkActiveViewADM = false;
    public Boolean blockChange = false;
    
}
