/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4116;

/**
 *
 * @author ggutierrez
 */
public class A4116Filter extends A4116 {

    public String RN = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_STVAL_CP = "";
    public String IN_TDOC_CP = "";
    
    public String IN_SCARDN1_CP = "";
    public String IN_SCARDN2_CP = "";
    public String IN_SAUTHOC_CP = "";
    
    public String IN_STCONL = "";
    public String IN_DATE = "";
    public String IN_DATE_VALUE = "";
    public String DATE = "";
    public String strFormatDate = "";
    public String IN_PNR = "";
    public String IN_PNRError = "";
    public String IN_TDOCError  = "";
    public String IN_STVAL = "";
    public String IN_TRANSDATE = "";
    public String IN_AXPRODAT = "";
    public String IN_FREGLA = "";
    public String IN_SCARDN = "";
    public String IN_SCARDN1 = "";
    public String IN_SCARDN2 = "";
    public String IN_SCARDN11 = "";
    public String IN_SCARDN22 = "";
    public String IN_AUTHS = "";
    public String IN_RECTYPE = "";
    public String IN_AUTHE = "";
    public String IN_SAUTHOC = "";
    public String IN_STRFND = "";
    public String IN_WARNING = "";
    public String IN_ZONA = "";
    public String IN_ZONA_SETT = "";
    public String IN_SCOUNTRY_SETT = "";
    public String IN_ZONA_ERR = "";
    public String IN_SCOUNTRY_ERR = "";
    public String IN_CERROR = "";
    public String IN_TDOC = "";
    public String IN_SCOUNTRY = "";
    public String IN_COMPLEMENT = "";

    public double DISCAMOUN_IMPORT = 0;
    public double DISCAMOUN_IVA = 0;
    public double DISCRATE_IMPORT = 0;
    public double DISCRATE_IVA = 0;
    public double TGROSAMOUN_TOTAL = 0;
    public double TGROSAMOUNC_TOTAL = 0;
    public double DISCAMOUN_TOTAL = 0;
    public double DISCAMOUNI_TOTAL = 0;
    public double TGROSAMOUC_TOTAL = 0;
    public double VATCOMMSIC_TOTAL = 0;
    public double DISCAMOUN_CB_TOTAL = 0;
    public double SADJUST_TOTAL = 0;
    public double SVFOPS_TOTAL = 0;
    public double SFEEAMOUC_TOTAL = 0;
    public double SFEEAMOU_TOTAL = 0;
    public double ACCEAMOUC_TOTAL = 0;
    public double ACCEAMOU_TOTAL = 0;
    public double DISCAMOUNC_TOTAL = 0;
    public double DISCAMOUIC_TOTAL = 0;

    public double DISCAMOUN = 0;
    public double DISCAMOUN_CB = 0;
    public double TAXAMOUN_CB = 0;
    public double TAXAMOUN_AD = 0;
    public double NETAMOUN = 0;
    public double NETAMOUNC = 0;
    public double DISCAMOSC = 0;
    public double GROSAMOUN_CB = 0;
    public double SADJUST = 0.0;

    public double totGROSAMOUN = 0;
    public double totTGROSAMOUN = 0;
    public double totTGROSAMOUN_ACCOUNTED = 0;
    public double totTGROSAMOUN_PENDING = 0;
    public double totTGROSAMOUN_TO_DEBUG = 0;
    public double totDISCAMOUN_IMPORT = 0;
    public double totDISCAMOUN_IVA = 0;
    public double totSFEEAMOU = 0;
    public double totACCEAMOU = 0;
    public double totTAXAMOUN_AD = 0;
    public double totIVACOM12 = 0;
    public double totGROSAMOUN_CB = 0;
    public double totDISCAMOUN = 0;
    public double totTAXAMOUN_CB = 0;
    public double totNETAMOUN = 0;
    public double totDISCAMOSC = 0;
    public double totNETAMOUNC = 0;
    public double TGROSAMOUN_ALL = 0;
    public double TGROSAMOUN_DIFF = 0;

    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_descSTVAL = "";
    public double IN_TGROSAMOUN = 0;
    public String IN_ISREFNBR = "";
    public String IN_MERCHID = "";
    public String IN_PAYDATE = "";
    public String IN_IDITEMS = "";
    public String IN_IDITEMT = "";
    public String DES_MERCHANT = "";
    public String DES_SMERCHANT = "";
    public String DES_CERROR = "";
    public String DES_CERROIN = "";
    public String CERROIN = "";
    public String DES_CODADJU = "";
    public String CODADJU = "";
    public String IN_CERROIN = "";
    public String desCERROIN = "";
    public String IN_SPNR = "";
    public String IN_BSUMDATE = "";
    public String STCONL = "";
    public String FCONTL = "";
    public String IDCONL = "";
    public String TKT = "";
    public String IDCON = "";
    public String FCONT = "";
    public String FSELEC = "";
    public Integer FDUPLI = 0;
    public Integer FDUPLIB = 0;
    public String ADJ_TYPE = "";
    public String descSTRFND = "";
    public String SAGENT = "";
    public String FUENTE = "";
    public String ZONE = "";
    
    //Summary Error
    public String IN_DRILLDOWN = "";
    public String IN_DRILLDOWN_DATE = "";
    public String PDATE = "";
    public int TNCM = 0;
    public int TNCP = 0;
    public int CPLM = 0;
    public int CPLP = 0;
    public int CTAM = 0;
    public int CTAP = 0;
    public int CLIM = 0;
    public int CLIP = 0;
    public int TGP = 0;
    public int TGM = 0;
    
    public int TNCM_TOTAL = 0;
    public int TNCP_TOTAL = 0;
    public int CPLM_TOTAL = 0;
    public int CPLP_TOTAL = 0;
    public int CTAM_TOTAL = 0;
    public int CTAP_TOTAL = 0;
    public int CLIM_TOTAL = 0;
    public int CLIP_TOTAL = 0;
    public int TGP_TOTAL = 0;
    public int TGM_TOTAL = 0;
        
    public double PENDING_PERCENTAGE = 0;
    public double PENDING_PERCENTAGE_TOTAL = 0;       
    
    //Flag contabilizado
    public double TGROSAMOUN_ACCOUNTED = 0;
    public double TGROSAMOUN_PENDING = 0;
    public double TGROSAMOUN_TO_DEBUG = 0;
    public int QTY_ACCOUNTED = 0;
    public int QTY_PENDING = 0;
    public int QTY_TO_DEBUG = 0;
    public int QTY_TOTAL = 0;
    public int totQTY_ACCOUNTED = 0;
    public int totQTY_PENDING = 0;
    public int totQTY_TO_DEBUG = 0;
    public int totQTY_TOTAL = 0;
    public double totSVFOPS = 0;
    public int QTY_ALL = 0;
    public int QTY_DIFF = 0;
    public int totQTY_ALL = 0;
    public double totTGROSAMOUN_ALL= 0;
    public int totQTY_DIFF= 0;
    public double totTGROSAMOUN_DIFF = 0;

    //CAMPOS A720
    public String A720AGENTE = "";
    public String A720FRESV = "";
    public String A720RUTA0 = "";
    public String A720RUTA1 = "";
    public String A720NVLO1 = "";
    public String A720FVLO1 = "";
    public String A720PNR = "";
    public String A720SEQ = "";
    public String A720GRUPO = "";
    public String A720FECVTA = "";    
    public String A720ORIG = "";    

    // A1531
    public String STMANUAL = "";
    public String A1531CIA = "";
    public String A1531FORMA = "";
    public String A1531SERIE = "";
    public String A1531TKT = "";
    public String A1531NREF = "";
    public String A1531CAPL = "";
    public String A1531CFOP = "";
    public String A1531TTARJ = "";
    public String USOS = "";
    public double A1531VFOP = 0.0;    
    public double tot_VFOP = 0.0;
    public double tot_VFOPB = 0.0;

    //Listado de codigos de error
    public String CODE = "";
    public String NAME = "";
    //EMAILS
    public String EMAIL = "";
    //OTROS
    public String SDATES = "";
    public String IDCONFLE = "";
    public String STCON = "";
    public String IN_AGENT = "";
    public String A1721FRCA = "";
    public String RFIC = "";
    public String IN_VOID = "";
    public String FREVERSA = "";
    public String descFREVERSA = "";
    public String FREVADM = "";
    public String descFREVADM = "";
    public String FADM = "";
    public String descFADM = "";
    public String OBSERV = "";
    public double TAXAMOUN = 0;
    public double QTY_TRANSACTIONS = 0;
    public double totQTY_TRANSACTIONS = 0;
    
    //MSI
    public String AREFNBR_1 = "";
    public String AREFNBR_2 = "";
    public String TDOC_1 = "";
    public String TDOC_2 = "";
    public String IN_PROCTYPE = "";
    public String IN_SCURRENCY = "";
    public String IN_TKT = "";
    
    public List<A4116Filter> lstSendManual = new ArrayList<A4116Filter>(0);

    public Pagination page = new Pagination();
    
}
