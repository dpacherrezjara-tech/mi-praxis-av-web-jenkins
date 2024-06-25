/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2290;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class A2290Filter extends A2290 {

    //Campos clave originales =======
    public String origSDATE = "";
    public String origSCOUNTRY = "";
    public String origTDOC = "";
    public String origCODEBANK = "";
    public String origSCARCOD = "";
    public String origSCARDN = "";
    public String origSAUTHOC = "";
    public String origSEQNUM = "";
    public String origSCURRENCY = "";
    public double origSVFOP = 0;
    public double VFOP = 0;
    //===============================
    public String IN_FECHA_FROM = "";
    public String IN_ADATE = "";
    public String IN_FECHA_TO = "";
    public String strFecFiltro = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String IN_CARR = "";
    public String IN_CARDN = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String IN_SCARDNCOR = "";
    public String CODE = "";
    public String DESCR = "";
    public String TabMPF = "";
    public String IN_FUNDSTRGK = "";
    
    public String IN_SAUTHOC = "";
    public String IN_FTE = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_USCR = "";
    public String IN_PRDA = "";
    public int IN_TRANL = 0;
    public int QTY = 0;
    public int QTYPROCUP = 0;
    public int QTYNPROCUP = 0;
    public String IN_SEQ = "";
    public String IN_CARDC = "";
    public String IN_STVAL = "";
    public String IN_strSVFOP = "";
    public String IN_RED = "";
    public String IN_NEGOC = "";
    public String IN_COMENT = "";
    public String IN_TERMI = "";
    public String IN_AGENCY = "";
    public String IN_SAGENT = "";
    public String IN_SPNR = "";
    public String IN_BSTVAL = "";
    public String IN_COUNTRY = "";
    public String IN_COREP = "";
    public String IN_PGRM = "";
    public String NAME = "";
    public String NAMEP = "";
    public String IN_SDATE = "";
    public String IN_SDATEE = "";
    public String IN_CBANK = "";
    public String IN_SCURRENCY = "";
    public String descSDATE = "";
    public String NUMAVIS = "";
    public String IN_TICKET = "";
    public String IN_MERCHN = "";
    public String IN_DATE = "";
    public String IN_CERROR = "";
    public String IN_STCON = "";
    public String IN_PHASE = "";
    public String IN_AGENT = "";
    public String AGT_VTA = "";
    public String IN_AGENTA1531 = "";
    public String IN_SDATE1531 = "";
    public String IN_AFTE = "";
    public String IN_AUTHNBR = "";
    public String IN_BANK = "";
    public String IN_ADYEN = "";
    public String IN_TTRAN = "";
    
    public int TRANL = 0;
    public String IN_DATECI = "";
    public String IN_TRANCI = "";
    public String IN_PNR = "";
    public String IN_CONTAB = "";
    public String TTRAN = "";
    public String strDescTTRAN = "";
    public String PS_TICKET = "";
    public String strSCARDN = "";
    public String strTicket = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strDescripcion = "";
    public String strDescripcionSCOUNTRY = "";
    public String strDescripcionCOREP = "";
    public String strSCARF = "";
    public String strDescCountry = "";
    public String NAMEBANK = "";
    public String strDescCard = "";
    public String strSDescCard = "";
    public String strADescCard = "";
    public String strDescStatus = "";
    public String strDescMerchn = "";
    public String strDescMerchnR = "";
    public String strDescFTE = "";
    public String strDescAFTE = "";
    public String strDescFCONC = "";
    public String strComment = "";
    public String strNUMREF = "";
    public String strPEM = "";
    public String strFLOAD = "";
    public String strSORIG = "";
    public String strTRNXCODE = "";
    public String CBANK = "";
    public String MERCHNR = "";
    public String DATEC = "";
    public String FECSELEC = "";
    public String TRANC = "";
    public String DATCO = "";
    public String DATECTRANC = "";
    public String STATUSC = "";
    public String TIPOTAR = "";
    public String FLOADE = "";
    public String LDATEE = "";
    public String CFUENTE = "";
    public String STATT = "";
    public String DATET = "";
    public String TVENTA = "";
    public int NAID = 0;
    public String strTVENTA = "";
    public String strTitulo = "";
    public String strMoneda = "";
    public String strBMoneda = "";
    public String strBCard1 = "";
    public String strBCard2 = "";
    public String strFlagStat = "";
    public String strNomPax = "";
    public String strPag = "";
    public String strPrimerTicket = "";
    public String strBankDeposit = "";
    public String DESCRIP = "";
    public String DESCRIP_VTA = "";
    public double AMOUNT_VTA = 0;
    public int pos = 0;
    public double dblAMOUNT = 0;
    public double dblAMOUNTR = 0;
    public String strSQL = "";
    public String strCREJEC = "";
    public String strDescError = "";
    public double RATECOM = 0;
    public double COMISION = 0;
    public double COMISIOC = 0;
    public double totCOMISION = 0;

    public double IVA = 0;
    public double IVAC = 0;
    public double PROPINA = 0;
    public double PROPINAC = 0;
    public double BASEFUE = 0;
    public double BASEFUEC = 0;
    public double RTEFUE = 0;
    public double RTEFUEC = 0;
    public double RTEIVA = 0;
    public double RTEIVAC = 0;
    public double BASICA = 0;
    public double BASICAC = 0;
    public double RTEICA = 0;
    public double RTEICAC = 0;
    public double NETO = 0;
    public double COMISTOTA = 0;
    
    public double NETOL = 0;
    public double DIFF = 0;
    public double totNETO = 0;
    public double totNETOC = 0;
    public double NETOC = 0;
    public double netoAcum = 0;

    public String EMISOR = "";
    public long lngQTYDOC = 0;
    public long lngQTYTKT = 0;
    public long lngTotQTYDOC = 0;
    public long lngTotQTYTKT = 0;
    public long lngQMATCH = 0;
    public double lngQMATCHPercent = 0;
    public double lngQMATCHPercentRF = 0;
    public double lngQMATCHPercentCH = 0;
    public double lngQMATCHPercentAC = 0;
    public double lngTotQMATCHPercent = 0;
    public double lngTotQMATCHPercentRF = 0;
    public double lngTotQMATCHPercentCH = 0;
    public double lngTotQMATCHPercentAC = 0;
    public long lngQWECC = 0;
    public long lngQMANUAL = 0;
    public long lngQPEND = 0;
    public long lngQTICKET = 0;
    public long lngQTMATCH = 0;
    public long lngQTMANUAL = 0;
    public long lngQTPEND = 0;
    public long lngQTOTS2 = 0;
    public long lngQPOLI2 = 0;
    public long lngQTOTS3 = 0;
    public long lngQPOLI3 = 0;
    public long lngQPOLIC = 0;
    public long lngQPOLIPE = 0;
    
    public long lngQSALESRF = 0;
    public long lngQMATCHRF = 0;
    public long lngQMANUALRF = 0;
    public long lngQPENDRF = 0;
    public long lngQSALESCH = 0;
    public long lngQMATCHCH = 0;
    public long lngQDIFFRF = 0;
    public long lngQDIFFCH = 0;
    public long lngQDIFFAC = 0;
    public long lngQMANUALCH = 0;
    public long lngQPENDCH = 0;
    public long lngQSALESAC = 0;
    public long lngQMATCHAC = 0;
    public long lngQMANUALAC = 0;
    public long lngQPENDAC = 0;
    public long lngTotQSALESRF = 0;
    public long lngTotQMATCHRF = 0;
    public long lngTotQMANUALRF = 0;
    public long lngTotQPENDRF = 0;
    public long lngTotQSALESCH = 0;
    public long lngTotQMATCHCH = 0;
    public long lngTotQMANUALCH = 0;
    public long lngTotQPENDCH = 0;
    public long lngTotQSALESAC = 0;
    public long lngTotQMATCHAC = 0;
    public long lngTotQMANUALAC = 0;
    public long lngTotQPENDAC = 0;
    
    public long lngQSALES = 0;
    public long lngQACCB = 0;
    public long lngQDIFF = 0;
    public long lngQACEP = 0;
    public long lngQRECH = 0;
    public long lngQSOSP = 0;
    public long lngQACEPT = 0;
    public long lngQRECHT = 0;
    public long lngQSOSPT = 0;
    public long lngQPAID = 0;
    public long lngQOBS = 0;
    public long lngQTEF = 0;
    public long lngQPAS48 = 0;
    public long lngQTOTSAL = 0;
    public long lngQTOTBK = 0;
    public long lngQTOTWS = 0;
    public long lngQTOTBKT = 0;
    public long lngQTHTEF = 0;
    public long lngQCHRG = 0;
    public long lngQCLAR = 0;
    public long lngTotQMATCH = 0;
    public long lngTotQWECC = 0;
    public long lngTotTotal = 0;
    public long lngTotQMANUAL = 0;
    public long lngTotQPEND = 0;
    public long lngTotQTICKET = 0;
    public long lngTotQTMATCH = 0;
    public long lngTotQTMANUAL = 0;
    public long lngTotQTPEND = 0;
    public long lngTotQTOTS2 = 0;
    public long lngTotQPOLI2 = 0;
    public long lngTotQTOTS3 = 0;
    public long lngTotQPOLI3 = 0;
    public long lngTotQPOLIC = 0;
    public long lngTotQPOLIPE = 0;
    public long lngTotQSALES = 0;
    public long lngTotQACCB = 0;
    public long lngTotSVFOP = 0;
    public long lngTotQDIFF = 0;
    public long lngTotQACEP = 0;
    public long lngTotQRECH = 0;
    public long lngTotQSOSP = 0;
    public long lngTotQACEPT = 0;
    public long lngTotQRECHT = 0;
    public long lngTotQSOSPT = 0;
    public long lngTotQPAID = 0;
    public long lngTotQTEF = 0;
    public long lngTotQPAS48 = 0;
    public double dblTotAMOUNT = 0;
    public double dblTotAMOUNTR = 0;
    public long lngTotQTOTSAL = 0;
    public long lngTotQTOTBK = 0;
    public long lngTotQTOTBKT = 0;
    public long lngTotQTOTWS = 0;
    public long lngTotQTHTEF = 0;
    public double dblTotSVFOP = 0;
    public double dblTotAVFOP = 0;
    public long lngTotQCHRG = 0;
    public long lngTotQCLAR = 0;
    public String strCampo = "";
    public String strOrden = "";
    public String TYPE = "";
    public String IN_FECHA = "";
    public String TKTS_CONCATENADOS = "";
    //Perc
    public double dblPerc01 = 0;
    public double dblPerc02 = 0;
    public double dblPerc02OUT = 0;
    public double dblPerc02SOS = 0;
    public double dblPerc02SUM = 0;
    public double dblPerc03 = 0;
    public double dblPerc04 = 0;
    public double dblPerc04OUT = 0;
    public double dblPerc04SOS = 0;
    public double dblPerc04SUM = 0;
    public long lngDays = 0;
    public long RN = 0;
    //Amount 
    public String SCURRENCYRF = "";
    public double totSVFOP = 0;
    public double totSVFOP_ERROR = 0;
    public double SVFOPUSD = 0;
    public double totSVFOPUSD = 0;
    public double SVFOPRF = 0;
    public double SVFOPUSDRF = 0;
    public double totSVFOPRF = 0;
    public double totSVFOPUSDRF = 0;
    public double IN_SVFOP = 0;
    public double IN_SVFOP2 = 0;
    public int IN_QTYSVFOP2 = 0;
    public int DIFF_QTYSVFOP2 = 0;
    public double DIFF_SVFOP2 = 0;
    public double OUT_SVFOP = 0;
    public double SOS_SVFOP = 0;
    public double DIFF_SVFOP = 0;
    public int QTYSVFOP = 0;
    public int IN_QTYSVFOP = 0;
    public int OUT_QTYSVFOP = 0;
    public int SOS_QTYSVFOP = 0;
    public int DIFF_QTYSVFOP = 0;
    public double totIN_SVFOP = 0;
    public double totOUT_SVFOP = 0;
    public double totSOS_SVFOP = 0;
    public double totDIFF_SVFOP = 0;
    public int totQTYSVFOP = 0;
    public int totIN_QTYSVFOP = 0;
    public int totOUT_QTYSVFOP = 0;
    public int totSOS_QTYSVFOP = 0;
    public int totDIFF_QTYSVFOP = 0;
    public double SUMA_SVFOP = 0;
    public int SUMA_QTYSVFOP = 0;
    public double totSUMA_SVFOP = 0;
    public int totSUMA_QTYSVFOP = 0;
    public int QTYREC = 0;
    public int QTYUPL = 0;
    public int QTYNOTUPL = 0;
    public int IN_CONT = 0;

    public String strIN_FTE = "";
    public String strIN_AFTE = "";
    public double perSale = 0;
    public double TotperSale = 0;

    //CASH
    public double SVFOP_C = 0;
    public int QTYSVFOP_C = 0;

    public double totSVFOP_C = 0;
    public int totQTYSVFOP_C = 0;

    //DATA LIQUIDACION BOOMERS                           
    public String BCARCOD = "";
    public String BCARDN = "";
    public String BCURRENCY = "";
    public double DAMOUNT = 0;
    //public var BDATEP:String = '';   

    public double totDAMOUNT = 0;
    public double dblPerCash = 0;

    //A2291
    public String CODEBANK = "";
    public String CODEBANKA = "";
    public String IN_CODEBANK = "";
    public int QTYDOC = 0;
    public int totQTYDOC = 0;
    //
    public long QBANKRFND = 0;
    public double AMTRFND = 0;
    public long Total = 0;

    public long totQBANKRFND = 0;
    public double totAMTRFND = 0;
    public long totTotal = 0;

    public double AMOUNTS = 0;
    public long QTYTRAS = 0;
    public long QTYTRAN1 = 0;
    public long totQTYTRAN1 = 0;
    public long QTYTRAN3 = 0;
    public long totQTYTRAN3 = 0;
    public long totQTYTRAS = 0;
    public long QTYDOCS = 0;
    public double AMOUNTR = 0;
    public long QTYTRAR = 0;
    public long QTYDOCR = 0;
    public long lngTotQTYDOCS = 0;
    public long lngTotQTYDOCR = 0;
    public String IN_TKT = "";
    public String IN_TKT_ASIG = "";
    public String PS_TKT = "";

    //A3307
    public String TCOLLECT = "";
    public String TOPER = "";
    public String strTCOLLECT = "";
    public String strTOPER = "";
    public String AWBNBR = "";
    public String CARR = "";
    public String NFLIGHT = "";
    public String CDEPART = "";
    public String CARRIVA = "";
    public String AWBVOID = "";
    public double dblAMATCH = 0;
    public double dblASALES = 0;
    public double dblAACCB = 0;
    public double dblADIFF = 0;
    public double dblATOTSAL = 0;
    public double dblTotAMATCH = 0;
    public double dblTotASALES = 0;
    public double dblTotAACCB = 0;
    public double dblTotADIFF = 0;
    public double dblTotATOTSAL = 0;
    public long lngQORARV = 0;
    public long lngQORAFI = 0;
    public long lngQORA = 0;
    public double dblAORARV = 0;
    public double dblAORAFI = 0;
    public double dblAORA = 0;
    public long lngTotQORARV = 0;
    public long lngTotQORAFI = 0;
    public long lngTotQORA = 0;
    public double dblTotAORARV = 0;
    public double dblTotAORAFI = 0;
    public double dblTotAORA = 0;
    public String STVALP = "";
    public String strDescStatusP = "";

    //A32279
    public String strCHARGEDT = "";
    public String CHARGEDT = "";
    public String SETTLNUMBE = "";
    public String SETTLDATE = "";
    public String strSETTLDATE = "";
    public String SETLLSEQ = "";
    public String SUBMSENO = "";
    public String SOCSEQ = "";
    public String RECTYPE = "";
    public String TAXTYPE = "";
    public String REFERENNUM = "";
    public String CURRENPAY = "";
    public String AUTHCD = "";
    public String CMNO = "";
    public double TOTALCHRG = 0;
    public double FIRSTINSAM = 0;
    public double SUBSQINAM = 0;
    public String INSTLCOUNT = "";
    public String INSTLNUMBR = "";
    public String REJINDCD = "";
    public String REJDESCRIP = "";
    public String INVSEQNO = "";
    public String SEREFNO = "";
    public String ELECREFNO = "";

    public String SAUTHOC1 = "";
    public String SCARCOD1 = "";

    //A2240
    //A2240
    public double TOTALCHRG_1 = 0;
    public double TOTALCHRG_2 = 0;
    public double TOTALCHRG_3 = 0;
    public double TOTALCHRG_5 = 0;
    public double FIRSTINSAM_1 = 0;
    public double FIRSTINSAM_2 = 0;
    public double FIRSTINSAM_3 = 0;
    public double FIRSTINSAM_5 = 0;
    public double TOTALCOM_1 = 0;
    public double TOTALCOM_2 = 0;
    public double TOTALCOM_3 = 0;
    public double TOTALCOM_5 = 0;
    public double TCOMISCA_1 = 0;
    public double TCOMISCA_2 = 0;
    public double TCOMISCA_3 = 0;
    public double TCOMISCA_5 = 0;
    public double T_DIFF_1 = 0;
    public double T_DIFF_2 = 0;
    public double T_DIFF_3 = 0;
    public double T_DIFF_5 = 0;
    public int QTYTKT_1 = 0;
    public int QTYTKT_2 = 0;
    public int QTYTKT_3 = 0;
    public int QTYTKT_5 = 0;
    public int QTYTKT_6 = 0;
    public int QTYTKT_8 = 0;

    public double totTOTALCHRG_1 = 0;
    public double totTOTALCHRG_2 = 0;
    public double totTOTALCHRG_3 = 0;
    public double totTOTALCHRG_5 = 0;
    public double totFIRSTINSAM_1 = 0;
    public double totFIRSTINSAM_2 = 0;
    public double totFIRSTINSAM_3 = 0;
    public double totFIRSTINSAM_5 = 0;
    public double totTOTALCOM_1 = 0;
    public double totTOTALCOM_2 = 0;
    public double totTOTALCOM_3 = 0;
    public double totTOTALCOM_5 = 0;
    public double totTCOMISCA_1 = 0;
    public double totTCOMISCA_2 = 0;
    public double totTCOMISCA_3 = 0;
    public double totTCOMISCA_5 = 0;
    public double totT_DIFF_1 = 0;
    public double totT_DIFF_2 = 0;
    public double totT_DIFF_3 = 0;
    public double totT_DIFF_5 = 0;
    public int totQTYTKT_1 = 0;
    public int totQTYTKT_2 = 0;
    public int totQTYTKT_3 = 0;
    public int totQTYTKT_5 = 0;
    public int totQTYTKT_6 = 0;
    public int totQTYTKT_8 = 0;

    public boolean check = false;
    public boolean isInvalid = false;
    public String color = "";
    public String weight = "";
    public String select = "";
    public String SVFOPINST = "";
    public String INSTPAY = "";
    public String INSTPLA = "";

    public Pagination page = new Pagination();
    public String PRDA = "";
    public String PMERCHID = "";
    public String PCURRENCY = "";
    public String AXPAYNBR = "";
    public String SMERCHID = "";
    public String BSUMDATE = "";
    public String IDITEMS = "";
    public String IDITEMT = "";
    public String ISREFNBR = "";
    public String AREFNBR = "";
    public String STYPECD = "";
    public String ZONA = "";
    public String AXPRODAT = "";
    public String SIREFNBR = "";
    public String descSTVAL = "";
    public String STCONL = "";
    public String descSTCONL = "";
    public String FREGLA = "";
    public String descFREGLA = "";
    public String MERCHNC = "";
    public String PASSED_DAYS = "";
    public String FCONTL = "";
    public String IDCONL = "";
    public String FCOMPL = "";
    public String descFCOMPL = "";
    
    
    public String descVOID = "";
    public String FREVERSA = "";
    public String descFREVERSA = "";
    public String FREVADM = "";
    public String descFREVADM = "";
    public String descFADM = "";
    public String LMERCHID = "";
    public String INVORNBR = "";
    public String SELLERID = "";
    public String DES_MERCHANT = "";
    public String DES_SMERCHANT = "";
    public String OBSERV_BPO = "";
    public double GROSAMOUN = 0;
    public double TGROSAMOUN = 0;
    public double SVFOPS = 0;
    public double DIFF_AMOUNT = 0;
    public String TRANSDATE = "";
    public String TRANSID = "";
    public String INSTANBR = "";
    public int NBRINSTA = 0;
    public double GROSAMOUNC = 0;
    public double TGROSAMOUC = 0;
    public double FINSAMOUC = 0;
    public double SINSAMOUC = 0;
    public String CERRORHST = "";
    public String DES_CERROR = "";
    public String CERROIN = "";
    public String DES_CERROIN = "";
    public String CODADJU = "";
    public String DES_CODADJU = "";
    public String FSELEC = "";
    public String STVALS = "";
    public String IN_DEBTYPE = "";
    public String DEBTYPE = "";
    public String descDEBTYPE = "";
    public String MESSAGE = "";

    //PArametros view ticket
    public String option = "";
    public String PNR = "";
    public String CC1 = "";
    public String CC2 = "";
    public String AUTH = "";

    //Campos de desglose
    public String A1531TKT = "";
    public String FDESGLOSE = "";
    public String A1531TTARJ = "";
    public String A1531NREF = "";
    public String A1531CAPL = "";
    public String A1531MFOP = "";
    public double A1531VFOP = 0;
    public double tot_VFOP = 0;
    public String A720FECVTA = "";
    public String A720PNR = "";
    public String A720AGENTE = "";
    public String SCLOSE = "";
    public String IN_UNICODE = "";
    public String IN_BANDOC = "";
    public String IN_VALDATE = "";
    public String IN_SALECOD = "";
    public String IN_TERM = "";
    public String IN_TRAN = "";
    public String IN_strNETO = "";
    public String IN_SCARCOD = "";
    public String IN_ACCNUMBER = "";
    public String DATECI = "";
    public String TRANCI = "";
    
    public String CCUST = "";
    public String TREG = "";
    public String CURRENCY1 = "";
    public String CURRENCY2 = "";
    public String DATECH = "";
    public String SIGN = "";
    public String RATE = "";
    public String FACTORD = "";
    public String FACTORA = "";
    public String TCCOTIND = "";
    public String TCCOTDIR = "";
    public String TCCOTIND2 = "";
    public String TCCOTDIR2 = "";
    public int Contador = 0;

    public double IN_NETO = 0;

    public String UASIG = "";
    public String IN_ANALISTA = "";
    public String IN_WHERE = "";
    public String IN_SOCIETY = "";

    public String IN_MERCHNC = "";
    public String IN_SCOUNTRY = "";

    public String getVariable() {
       return BANDOC;
    }

    public String bufferToString(String ccust) {

        String strValue = "";
        String strKeyUp = "";
        String strFilter = "";
        String strTabla = "A2290A";

        //03 PROGRAMA    PIC X(10).
        strValue += Functions.fillString("PRO10585", 10);
        //03 TABLA       PIC X(10).
        strValue += Functions.fillString(strTabla, 10);

        //**********************************************************************
        //05 LK-KEYUP         PIC X(100). **************************************
        //**********************************************************************
        //05 CCUST         PIC X(03).
        strKeyUp += Functions.fillString(ccust, 3);
        //05 TDOC          PIC X(01).
        strKeyUp += Functions.fillString(this.IN_TDOC, 1);
        //05 SDATE         PIC X(08).
        strKeyUp += (this.DATEC.trim().length() == 6) ? this.DATEC.trim() + "01" : Functions.fillString(this.DATEC.trim(), 8);
        //05 SCOUNTRY      PIC X(02).
        strKeyUp += Functions.fillString(this.IN_COUNTRY, 2);
        //05 SCARCOD       PIC X(02).
        strKeyUp += Functions.fillString(this.SCARCOD, 2);
        //05 SCURRENCY     PIC X(03).
        strKeyUp += Functions.fillString(this.SCURRENCY, 3);
        //05 FTE           PIC X(01).
        strKeyUp += Functions.fillString(this.IN_FTE, 1);
        //05 SCARDN        PIC X(19).
        strKeyUp += Functions.fillString(this.IN_CARDN, 19);
        //05 TKT.                    
        //*06 CCIA         PIC X(03).
        //*06 FORMA        PIC X(04).
        //*06 SERIE        PIC X(06).
        strKeyUp += Functions.fillString(this.PS_TICKET, 13);
        //Colocando el KEYUP en la cadena principal rellenando a 100
        strKeyUp = Functions.fillString(strKeyUp, 100);
        strValue += strKeyUp;
        //System.out.println("strKeyUp : " + strKeyUp.length());
        //**********************************************************************
        //**********************************************************************

        //**********************************************************************
        //04 LK-FILTER        PIC X(100). **************************************
        //**********************************************************************
        //Colocando el FILTER en la cadena principal rellenando a 100
        //05 FSTVAL        PIC X(01).
        strFilter += Functions.fillString(this.IN_STVAL, 1);
        strFilter = Functions.fillString(strFilter, 100);
        strValue += strFilter;
        //**********************************************************************
        //********************************************************************** 
        //04 PG-DN            PIC X(01). 
        strValue += Functions.fillString(this.strPag.trim(), 1);
        //05 LK-ERR           PIC X(01).
        strValue += Functions.fillString("", 01);
        //05 LK-MSG           PIC X(49).
        strValue += Functions.fillString("", 49);

        //System.out.println(strValue.length());
        return strValue.toUpperCase();
    }

    public String bufferToStringValueOut(String ccust) {

        String strValue = "";
        String strKeyUp = "";
        String strFilter = "";
        String strTabla = "A2290A";

        //03 PROGRAMA    PIC X(10).
        strValue += Functions.fillString("PRO10585", 10);
        //03 TABLA       PIC X(10).
        strValue += Functions.fillString(strTabla, 10);

        //**********************************************************************
        //05 LK-KEYUP         PIC X(100). **************************************
        //**********************************************************************
        //05 CCUST         PIC X(03).
        strKeyUp += Functions.fillString(ccust, 3);
        //05 TDOC          PIC X(01).
        strKeyUp += Functions.fillString(this.IN_TDOC, 1);
        //05 SDATE         PIC X(08).
        strKeyUp += (this.DATEC.trim().length() == 6) ? this.DATEC.trim() + "01" : Functions.fillString(this.DATEC.trim(), 8);
        //05 SCOUNTRY      PIC X(02).
        strKeyUp += Functions.fillString(this.IN_COUNTRY, 2);
        //05 SCARCOD       PIC X(02).
        strKeyUp += Functions.fillString(this.SCARCOD, 2);
        //05 SCURRENCY     PIC X(03).
        strKeyUp += Functions.fillString(this.SCURRENCY, 3);
        //05 FTE           PIC X(01).
        strKeyUp += Functions.fillString(this.IN_FTE, 1);
        //05 SCARDN        PIC X(19).
        strKeyUp += Functions.fillString(this.IN_CARDN, 19);
        //05 TKT.                    
        //*06 CCIA         PIC X(03).
        //*06 FORMA        PIC X(04).
        //*06 SERIE        PIC X(06).
        strKeyUp += Functions.fillString(this.PS_TICKET, 13);
        //Colocando el KEYUP en la cadena principal rellenando a 100
        strKeyUp = Functions.fillString(strKeyUp, 100);
        strValue += strKeyUp;
        //System.out.println("strKeyUp : " + strKeyUp.length());
        //**********************************************************************
        //**********************************************************************

        //**********************************************************************
        //04 LK-FILTER        PIC X(100). **************************************
        //**********************************************************************
        //Colocando el FILTER en la cadena principal rellenando a 100
        //05 FSTVAL        PIC X(01).
        strFilter += Functions.fillString(this.IN_STVAL, 1);
        strFilter = Functions.fillString(strFilter, 100);
        strValue += strFilter;
        //**********************************************************************
        //********************************************************************** 
        //04 PG-DN            PIC X(01). 
        strValue += Functions.fillString(this.strPag.trim(), 1);
        //05 LK-ERR           PIC X(01).
        strValue += Functions.fillString("", 01);
        //05 LK-MSG           PIC X(49).
        strValue += Functions.fillString("", 49);

        //System.out.println(strValue.length());
        return strValue.toUpperCase();
    }
}
