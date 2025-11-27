/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2290;
import net.miatech.utils.Functions;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


/**
 *
 * @author claudia
 */
public class A2290Filter extends A2290 {

    //Campos clave originales =======
    public String origSDATE = "";
    public String IN_CCUST = "";
    public String origSCOUNTRY = "";
    public String origTDOC = "";
    public String origCODEBANK = "";
    public String origSCARCOD = "";
    public String origSCARDN = "";
    public String origSAUTHOC = "";
    public String origSEQNUM = "";
    public String origSCURRENCY = "";
    public double IMPORTECeba = 0;
    public double origSVFOP = 0;
    public double VFOP = 0;
    public String IMPORTE = "";
    public String IN_CODPRO = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_MERCHANT = "";
    public String IN_LIQUIDATION = "";
    public String IN_SPAYMENT = "";
    public String SDATE_MIN = "";
    public String SDATE_MAX = "";
    //===============================
    public String IN_FECHA_FROM = "";
    public String IN_ADATE = "";
    public String IN_STATUS = "";
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
    public String IN_LIQUIDACIO = "";
    public String IN_TYPER = "";
    public String INTERCOMPANY = "";
    public String IN_CBATCH = "";
    public String IN_FECR = "";

    public String IN_FROMADATE = "";
    public String IN_TOADATE = "";
    public String IN_FROMSDATE = "";
    public String IN_TOSDATE = "";
    public String IN_INVOICE = "";
    public String INVOICE = "";
    public String ACCNUMA = "";
    public String COSTCEN = "";
    public String SCONSOL = "";
    public String SCONSOL_TABLE = "";
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
    public int QTYPROC102 = 0;
    public int QTYPROC060 = 0;
    public int QTYPROC101 = 0;
    public int QTYPROC100 = 0;
    public int QTYPROC075 = 0;
    public int QTYPROC076 = 0;
    public int QTYPROC077 = 0;
    public int QTYP102 = 0;
    public int QTYP060 = 0;
    public int QTYP101 = 0;
    public int QTYP100 = 0;
    public int QTYP075 = 0;
    public int QTYP076 = 0;
    public int QTYP077 = 0;
    public String IN_SEQ = "";
    public String IN_CARDC = "";
    public String IN_STVAL = "";
    public String IN_ADJTYPE = "";
    public String IN_SCAR = "";
    public String IN_EXT = "";
    public String IN_FROMADATEHE = "";
    public String IN_TOADATEHE = "";
    public String IN_LIQUIDACIOHE = "";
    public String IN_MERCHANDHE = "";
    public String IN_NETOHE = "";

    public String IN_FROMADATEAG = "";
    public String IN_TOADATEAG = "";
    public String IN_LIQUIDACIOAG = "";
    public String IN_MERCHANDAG = "";
    public String IN_NETOAG = "";

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
    public String IN_TINPUT = "";
    public String IN_COREP = "";
    public String IN_PGRM = "";
    public String NAME = "";
    public String NAMEP = "";
    public String IN_SDATE = "";
    public String IN_CORE = "";
    public String IN_SDATEE = "";
    public String IN_CBANK = "";
    public String IN_SCURRENCY = "";
    public String IN_TP = "";
    public String IN_STAT = "";
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
    public String IN_DATEC = "";
    public String IN_TRANCI = "";
    public String IN_TRANC = "";
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
    public String UNIKEY = "";
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
    public int QTYDOC = 0;
    public String DESCCREJEC = "";
    public String CBATCH = "";

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
    public double IMPORTEPAG = 0;
    public double FEESTAXS = 0;
    public double CHARGEBK = 0;
    public double COMISTOTA = 0;

    public double NETOL = 0;
    public double SVFOPL = 0;
    public double SVFOPT = 0;
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
    public long lngQMATCHL = 0;
    public double lngQMATCHPercent = 0;
    public double lngQTMATCHPercent = 0;
    public double lngQMATCHPercentRF = 0;
    public double lngQMATCHPercentCH = 0;
    public double lngQMATCHPercentAC = 0;
    public double lngTotQMATCHPercent = 0;
    public double lngTotQTMATCHPercent = 0;
    public double lngTotQMATCHPercentRF = 0;
    public double lngTotQMATCHPercentCH = 0;
    public double lngTotQMATCHPercentAC = 0;
    public long lngQWECC = 0;
    public long lngQWECCL = 0;
    public long lngQMANUAL = 0;
    public long lngTOTALE = 0;
    public long lngQPEND = 0;
    public long lngQPEND1 = 0;
    public long lngQPEND3 = 0;
    public long lngQEXT = 0;
    public long lngQPENDL = 0;
    public long lngQTICKET = 0;
    public long lngQTMATCH = 0;
    public long lngQTMANUAL = 0;
    public long lngQTPEND = 0;
    public long lngTOTALL = 0;
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
    public long lngQDIFFL = 0;
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
    public long lngTotQMATCHL = 0;
    public long lngTotQWECC = 0;
    public long lngTotQWECCL = 0;
    public long lngTotTotal = 0;
    public long lngTotTotalL = 0;
    public long lngTotQMANUAL = 0;
    public long lngTotTOTALE = 0;
    public long lngTotQPEND = 0;
    public long lngTotQPEND1 = 0;
    public long lngTotQPEND3 = 0;
    public long lngTotQEXT = 0;
    public long lngTotQPENDL = 0;
    public long lngTotQTICKET = 0;
    public long lngTotQTMATCH = 0;
    public long lngTotQTMANUAL = 0;
    public long lngTotQTPEND = 0;
    public long lngTotTOTALL = 0;
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
    public long lngTotQDIFFL = 0;
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
    public int QTYRECORDS = 0;
    public int IN_CONT = 0;

    public String strIN_FTE = "";
    public String strIN_AFTE = "";
    public String ADJUST = "";
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
//    public int QTYDOC = 0;
    public int totQTYDOC = 0;
    //
    public long QBANKRFND = 0;
    public double AMTRFND = 0;
    public long Total = 0;
    public long TotalL = 0;

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
    public long TOT_QTYTKT = 0;
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
    public String merchandIn = "";
    public String liquidationIn = "";
    public String TRAN = "";
    public String TDOCORG = "";
    public String CODPRO = "";
    public String CCUSTPRO = "";
    public String FLIQUIDACI = "";
    public String LIQUIDACIO = "";
    public String MONEDA = "";
    public String MONEDALIQ = "";
    public String MONEDAPAGO = "";
    public String CODIGO = "";
    public String PAISLIQ = "";
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
    public String SUCMERCH = "";
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
    public String DES_CERROR_COMMENT = "";
    public String CERROIN = "";
    public String DES_CERROIN = "";
    public String CODADJU = "";
    public String DES_CODADJU = "";
    public String FSELEC = "";
    public String STVALS = "";
    public String IN_DEBTYPE = "";
    public String CHARNBR = "";
    public String descDEBTYPE = "";
    public String MESSAGE = "";
    public String V_VALIDATE = "";

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
    public String A720SCOUNTRY = "";
    public String A720AGENTE = "";
    public String SCLOSE = "";
    public String IN_UNICODE = "";
    public String IN_BANDOC = "";
    public String TYPEDATE = "";
    public String IN_VALDATE = "";
    public String IN_SALECOD = "";
    public String IN_TERM = "";
    public String IN_TRAN = "";
    public String IN_strNETO = "";
    public String IN_MERCHAND = "";
    public String IN_SCARCOD = "";
    public String IN_SCARDN = "";
    public String IN_ACCNUMBER = "";
    public String DATECI = "";
    public String TRANCI = "";
    public String TDOC_E = "";

    public String CID = "";
    public String UUID = "";
    public String AFILIADO = "";
    public String LIQUIDAC = "";
    public String FECHA = "";
    public double MONTO = 0;
    public double MONTOUSD = 0;
    public double lngTotMONTO = 0;
    public double lngTotRATE = 0;
    public String FSELECT = "";
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

    public String ST_CCUST = "";
    public String ST_TDOC = "";
    public String ST_STVAL = "";
    public String ST_SCOUNTRY = "";
    public String ST_FTE = "";
    public String ST_SDATE = "";
    public String ST_SAGENT = "";
    public String ST_NEGOC = "";
    public String ST_MERCHNC = "";
    public String ST_SUCMERCH = "";
    public String ST_SPNR = "";
    public String ST_CODPRO = "";
    public String ST_CCUSTPRO = "";
    public String ST_PRDA = "";
    public String ST_TRAN = "";
    public String ST_TDOCORG = "";
    public String ST_PAYDATE = "";
    public String ST_VALDATE = "";
    public String ST_TIPOTAR = "";
    public String ST_SCARCOD = "";
    public String ST_SCARDN = "";
    public String ST_SCARDNCOR = "";
    public String ST_SAUTHOC = "";
    public String ST_SDATEXP = "";
    public String ST_SOCIETY = "";
    public String ST_CODEBANK = "";
    public String ST_COREP = "";
    public String ST_SOCIETYL = "";
    public String ST_BANDOC = "";
    public String ST_SEQ = "";
    public String ST_TERMI = "";
    public String ST_GENCON = "";
    public String ST_STCON = "";
    public String ST_FCONT = "";
    public String ST_IDCONT = "";
    public String ST_IDCDEB = "";
    public String ST_IDCADJ = "";
    public String ST_ACCNUMBER = "";
    public String ST_PERCONT = "";
    public String ST_FDEBIT = "";
    public String ST_FAJUST = "";
    public String ST_RED = "";
    public String ST_DATEF = "";
    public String ST_QTYTKT = "";
    public String ST_FREGLA = "";
    public String ST_SCURRENCY = "";
    public String ST_SVFOP = "";
    public String ST_IVA = "";
    public String ST_PROPINA = "";
    public String ST_COMISION = "";
    public String ST_COMISTOTA = "";
    public String ST_BASEFUE = "";
    public String ST_RTEFUE = "";
    public String ST_RTEIVA = "";
    public String ST_BASICA = "";
    public String ST_RTEICA = "";
    public String ST_NETO = "";
    public String ST_FAREO = "";
    public String ST_SVFOPC = "";
    public String ST_SVFOPD = "";
    public String ST_IVAC = "";
    public String ST_PROPINAC = "";
    public String ST_COMISIOC = "";
    public String ST_BASEFUEC = "";
    public String ST_RTEFUEC = "";
    public String ST_RTEIVAC = "";
    public String ST_BASICAC = "";
    public String ST_RTEICAC = "";
    public String ST_NETOC = "";
    public String ST_FAREC = "";
    public String ST_FAREDIFFC = "";
    public String ST_COMMFAREC = "";
    public String ST_COMMDIFFC = "";
    public String ST_ADMTOTAL = "";
    public String ST_FLOAD = "";
    public String ST_LDATE = "";
    public String ST_TDATE = "";
    public String ST_SORIG = "";
    public String ST_REASONREJ = "";
    public String ST_RECORDSTS = "";
    public String ST_BSTVAL = "";
    public String ST_BDATEP = "";
    public String ST_BAID = "";
    public String ST_QTYDOC = "";
    public String ST_SDATE1 = "";
    public String ST_SAUTHOC1 = "";
    public String ST_SCARCOD1 = "";
    public String ST_FLOADE = "";
    public String ST_LDATEE = "";
    public String ST_RATECOM = "";
    public String ST_COMISION1 = "";
    public String ST_EMISOR = "";
    public String ST_STATUSC = "";
    public String ST_SDATEC = "";
    public String ST_DEBTYPE = "";
    public String ST_STVALS = "";
    public String ST_SDATES = "";
    public String ST_DATECS = "";
    public String ST_TRANCS = "";
    public String ST_DATECI = "";
    public String ST_TRANCI = "";
    public String ST_DATEC = "";
    public String ST_TRANC = "";
    public String ST_DATCO = "";
    public String ST_DATET = "";
    public String ST_STATT = "";
    public String ST_DATEL = "";
    public String ST_HORAL = "";
    public String ST_CCNCFT = "";
    public String ST_CCNTRN = "";
    public String ST_CERROIN = "";
    public String ST_CERROR = "";
    public String ST_FSELEC = "";
    public String ST_FECSELEC = "";
    public String ST_FUNDSTRGR = "";
    public String ST_FUNDSTRGK = "";
    public String ST_CHARNBR = "";
    public String ST_STVALCHG = "";
    public String ST_UAUDIT = "";
    public String ST_ORDERID = "";
    public String ST_CCIA = "";
    public String ST_FORMA = "";
    public String ST_SERIE = "";
    public String ST_LIQUIDACIO = "";
    public String ST_MONEDAPAGO = "";
    public String ST_IMPORTEPAG = "";
    public String ST_ACCNUMA = "";
    public String ST_USCR = "";
    public String ST_FECR = "";
    public String ST_HOCR = "";
    public String ST_PGMCR = "";
    public String ST_USUP = "";
    public String ST_FEUP = "";
    public String ST_HOUP = "";
    public String ST_PGMUP = "";
     
    public String SCURRENCY_100 = "";
    public String CFUENTE_100 = "";
    public String SCURRENCY_101 = "";
    public String TDOC_100 = "";
    public String SCOUNTRY_100 = "";
    public String TDOC_101 = "";
    public String SCOUNTRY_101 = "";
    public String SDATE_100 = "";
    public String SDATE_101 = "";
    public String SAGENT_100 = "";
    public String SAGENT_101 = "";
    public String SCARCOD_100 = "";
    public String SCARCOD_101 = "";
    public String SCARDN_100 = "";
    public String SCARDN_101 = "";
    public String SAUTHOC_100 = "";
    public String SPNR_100 = "";
    public String SAUTHOC_101 = "";
    
    
    public long lngARC = 0; 
    public long lngBSP = 0; 
    public long lngVentaDirecta = 0; 
    public long lngArcConc = 0; 
    public long lngBspConc = 0; 
    public long lngVentaDirectaConc = 0; 
    public long lngTotQARC = 0; 
    public long lngTotQBSP = 0; 
    public long lngTotQVentaDirecta = 0; 
    public long lngTotQARCConc = 0; 
    public long lngTotQBSPConc = 0; 
    public long lngTotQVentaDirectaConc = 0; 
    public long lngTot0_10 = 0; 
    public long lngTot11_20 = 0; 
    public long lngTot21_30 = 0; 
    public long lngTot31_40 = 0; 
    public long lngTot41_mas = 0; 
    public long lng0_10 = 0; 
    public long lng11_20 = 0; 
    public long lng21_30 = 0; 
    public long lng31_40 = 0; 
    public long lng41_MAS = 0; 
    
    //CASH
    public long lngTotQMATCHBSP  = 0; 
    public long lngTotQMATCHARC = 0; 
    public long lngTotQMATCHISC  = 0; 
    public long lngTotQPENDBSP  = 0; 
    public long lngTotQPENDARC  = 0; 
    public long lngTotQPENDISC  = 0; 
    public long lngTotQMANUALBSP  = 0; 
    public long lngTotQMANUALARC = 0; 
    public long lngTotQMANUALISC  = 0; 
    public long lngTotQ  = 0; 
    public long lngQEECC  = 0; 
    public long lngQTYADJ  = 0; 
    
    // header
    
    public long lngTotHMatch  = 0; 
    public long lngTotHManual  = 0; 
    public long lngTotHDiff  = 0; 
    public long lngTotHSales  = 0; 
    public long lngTotHAll  = 0; 
    public long lngQHMatch  = 0; 
    public long lngQHManual  = 0; 
    public long lngQHDiff  = 0; 
    public long lngQHSales  = 0; 
    public long lngQHAll  = 0; 
    
    
    
    public long lngTotQTKTAUTO  = 0; 
    public long lngTotQTKTPENDING  = 0; 
    public long lngTotQTKTMANUAL  = 0; 
    public long lngQMATCHBSP   = 0; 
    public long lngQMATCHARC   = 0; 
    public long lngQMATCHISC   = 0; 
    public long lngQPENDINGBSP   = 0; 
    public long lngQPENDINGARC   = 0; 
    public long lngQPENDINGISC   = 0; 
    public long lngQPENDING   = 0; 
    public long lngQMANUALBSP   = 0; 
    public long lngQMANUALARC   = 0; 
    public long lngQMANUALICS   = 0; 
    public long lngQSALESDIRECT   = 0; 
    public long lngQTOTAL   = 0; 
    public long lngAUTOTKT    = 0; 
    public long lngPENDINGTKT    = 0; 
    public long lngMANUALTKT    = 0; 
    public long lngTOTALTKT    = 0; 
    public long lngTotQSALESDIRECT    = 0; 
    public long lngTotQTYECC    = 0; 
    public long lngTotQTYADJ    = 0; 
    public long lngPayamou    = 0; 
    public long lngPayamouPending    = 0; 
    public long lngPayamouMatch    = 0; 
    
    
    
    public double totNETOEECC    = 0; 
    public double totNETOSETLEMENT    = 0; 
    public double SVFOPOT    = 0; 
    public double SVFOPNETR    = 0; 
    public double SVFOPNETRU    = 0; 
    public double SUM_NETO    = 0; 
    public double SUM_PAYAMOU    = 0; 
    public double SUM_USDEQUI    = 0; 
    public double SUM_TKT    = 0; 
    
    //CASH
    
    // MAIN_SUMMARY 
    public String IN_SOURCE = "";
    
    
    
    public String TINPUT = "";
    public String STRDATE = "";
    public String ENDDATE = "";
    public double PAYAMOU = 0;
    public double SETADJ = 0;
    public double BILADJ = 0;
    public String CONCEPT = "";
    public String REFERENCE = "";
    public String COMMENTS = "";
    public String SUBFTE = "";
    public String MCLOS = "";
    public String SCURREVEN = "";
    public String FDESD = "";
    public String FHAST = "";
    public String FPROC = "";
    public String BANKNAM = "";
    public String ACCNUMB = "";
    public String BANKCM = "";    public String SCOUNTRY_191 = "";
    public String SCURRENCY_191 = "";
    public String SCONSOL_191 = "";
    public String STARDATE_191 = "";
    public String ENDDATE_191 = "";
    public String QTYTKT_191 = "";
    public String NINPUT = "";
    public double NETO_191 = 0;
    public double PAYAMOU_191 = 0;
    public double COMISION_191 = 0;
    public double USDEQUI = 0;
    public String DCYCLE = "";

    
    
    public String O_STVAL ="";
    public String O_ADATE ="";
    public String O_TINPUT ="";
    public String O_CONCEPT ="";
    public String O_SAGENT ="";
    public String O_NSAGENT ="";
    
    public String O_SCONSOL ="";
    public String O_SCURRENCY ="";
    public double O_NETO =0;
    public double O_PAYAMOU =0;
    public String O_STRDATE ="";
    public String O_ENDDATE ="";
    public double O_SUM_NETO = 0;
    public double O_SUM_PAYAMOU = 0;
    public String O_TADJ = "";
    public String O_REFERENCE = "";
    public String O_COMMENTS = "";
    public String O_PDATE = "";
    public String O_CCUST = "";
    public String O_SCOUNTRY = "";
    public String O_CBATCH = "";
    public String O_SEQ = "";
    public String O_BANDOC = "";
    public String O_DATEA = "";
    public String O_TRANA = "";
    public String O_INVOICE = "";
    
    
    public String O_USCR = "";
    public String O_FECR = "";
    public String O_HOCR = "";
    public String O_USUP = "";
    public String O_FEUP = "";
    public String O_HOUP = "";
    public String DPERIOD = "";
    public String TPERIOD = "";
    
    
    
    
    
    
    //Update
    public String MENSA = "";       
    public String FECRFILE = "";
    public String CODEPROCESS = "";
    public String STATP = "";
    public String HOSEND = "";
    public String FERECV = "";
    public String HORECV = "";
    public String IN_FECFILTRO  = "";

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
//    private XSSFWorkbook excel;
//    public XSSFWorkbook getExcel() { return excel; }
//    public void setExcel(XSSFWorkbook excel) { this.excel = excel; }
    
}
