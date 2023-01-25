package net.miatech.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author claudia
 */
public class RECA020N implements Serializable {

    /** Creates a new instance of RECA020N */
    private String strKey;
    private String strPrememo;
    private String strCIA;
    private String strForma;
    private String strSerie;
    private String strCupon;
    //******** Invoice **********  
    private double dblBilling;
    private double dblA020IMPNAC;
    private double dblA020TOTDEB;
    private double dblA020ANALIZ;
    //************ Miatech ****** 
    private double dblAcepMiatech;
    private double dblIMPINT;
    private double dblA020TOTHAB;
    private double dblA020COMISP;
    //********** Neto ***********    
    private double dblGROSS;
    private double dblISC;
    private double dblTAX;
    private double dblNETO;
    private String strRuta;
    //***************************
    private String strAirlin;
    private String strFrecha;
    private String strSuFech;
    private String strAirli3;
    private String strRUTAP;
    private String strPeriodo;
    private String strFecVuelo;
    private String strFimpre;
    private String strTipo;
    private String strBase;
    private long lngTarifa;
    private String strMoneda;
    private String strTransport;
    private String strClase;
    private String strCODOB1;
    private String strCODOB2;
    private String strCODOB3;
    private String strCODOB4;
    private String strCODOB5;
    private String strCOMME1;
    private String strCOMME2;
    private String strCOMME3;
    private String strCOMME4;
    private String strCOMME5;
    private String strCOMME6;
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    private String strUser;
    private String strClassRM;
    private String strETKT;
    private long lngTtlOver;
    private long lngTtlUnder;
    private long lngTtlMatch;
    private long lngTtlReview;
    private long lngTtlCpnsInv;
    private long lngTtlCpnsProcess;
    //***** Para el Rate (A1200) ***    
    private double dblRate;
    //******************************    
    private String strDoc;
    private String flagRevisado;
    private String strRegDate;
    private String strGrupo;
    private double dblMontoMinTarifa;
    private double dblMontoMinTax;
    private String strA020SUFACT;
    private double dblA020SUDEBI;
    private String strA728CTYVTA;
    private String strA728CTYEMI;
    private String strA728RERUT;
    private String strA728BOOKI1;
    private String strA728REGIST;
    private String strA728CARRA1;
    private String strA728FVLO1;
    private String strA728NVLO1;
    private String strA728NRODOC;
    private String strA728NROPRT;
    private String strA728FECFAR;
    private double dblA728CPLUSS;
    private String strA728CODIT;
    private String strA020NROPRT;
    private String strA020NUMCTA;
    private String strFMETHOD;
    private String StrA020FVENTA;
    private String StrA728RUTORG;
    private String StrA728COUVTA;
    private String strA728CLASE1;
    private String StrHEADER;
    private String StrORDENT;
    private String strA020DCHEQ;
    private String strCampo;
    private String strValorA020;
    private String strValorA020Prueba;
    private String strA020FORMUL;
    private String strA020AIRLI2;
    private String strA020FRECIB;
    private String strA020FUSO;
    private double dblA020NUC;
    private double dblA020ROE;
    private List<RECA729> lstTaxes;
    private List<RECA729> lstTaxesOrig;
    private String strA728XO;
    private String strA728TDESC;
    private String strTaxes;
    private String strRutaImagen;
    private String strRutaImagenOrig;
    private String strLocalCurrTax;
    private int totImagenes;
    private String strA020PSTRF;
    private String strCarrrier;
    private String strA020FVLO;
    private String strMensaje;
    private String strA020RMSN;
    private String strA728ACUEO1;
    private double dblA097IMPO;
    private double dblA097ISC;
    private double dblA097TAX;
    private double dblA097UATP;
    private double dblA097OTROS;
    private double dblA533RVCOBR;
    private double dblA728VALOR1;
    private double dblA533VCOBRA;
    private String strA020TUSO;
    private double dblA728SS1;
    private String strA020GENRM;
    private String strA020TCALC;
    private String strA020TIPORM;
    private String strA020USER;
    private String strA020SDATE;
    private String strA020RMANT;
    private String strA020STIME;
    private double dblA020TARIFA;
    private String strA020CODMOT;
    private double dblA020FAREUS;
    private String strA020TICKE1;
    private String strA020TICKE2;
    private String strA020MNRCD;
    private String strA020DEBHAB;
    private String strA020QSEGUS;
    private String log;
    private String strAplicaSPA;
    private String strCodSPA;
    private boolean booShowCom;
    private String strA020BATCH;
    private String strA020ORDEN;
    private String strClearingDate;
    private String strA199TUSO;
    
    private double dblA020BOTCPR;//Billing Other Comm
    private double dblA020BOTCRM;//Perc Billing Other Comm
    private double dblA020AOTCPM;//Miatech Other Comm
    private double dblA020AOTCRM;//Perc Miatech Other Comm
    private double dblA020DOTCRM;//Difference Other Comm

    public RECA020N() {

        strKey = "";
        strPrememo = "";
        strCIA = "";
        strForma = "";
        strSerie = "";
        strCupon = "";
        //******** Invoice **********  
        dblBilling = 0;
        dblA020IMPNAC = 0;
        dblA020TOTDEB = 0;
        dblA020ANALIZ = 0;
        //************ Miatech ****** 
        dblAcepMiatech = 0;
        dblIMPINT = 0;
        dblA020TOTHAB = 0;
        dblA020COMISP = 0;
        //********** Neto ***********    
        dblGROSS = 0;
        dblISC = 0;
        dblTAX = 0;
        dblNETO = 0;
        strRuta = "";
        //***************************
        strAirlin = "";
        strFrecha = "";
        strSuFech = "";
        strAirli3 = "";
        strRUTAP = "";
        strPeriodo = "";
        strFecVuelo = "";
        strFimpre = "";
        strTipo = "";
        strBase = "";
        lngTarifa = 0;
        strMoneda = "";
        strTransport = "";
        strClase = "";
        strCODOB1 = "";
        strCODOB2 = "";
        strCODOB3 = "";
        strCODOB4 = "";
        strCODOB5 = "";
        strCOMME1 = "";
        strCOMME2 = "";
        strCOMME3 = "";
        strCOMME4 = "";
        strCOMME5 = "";
        strCOMME6 = "";
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strUser = "";
        strClassRM = "";
        strETKT = "";
        lngTtlOver = 0;
        lngTtlUnder = 0;
        lngTtlMatch = 0;
        lngTtlReview = 0;
        lngTtlCpnsInv = 0;
        lngTtlCpnsProcess = 0;
        //***** Para el Rate (A1200) ***    
        dblRate = 0;
        //******************************    
        strDoc = "";
        flagRevisado = "";
        strRegDate = "";
        strGrupo = "";
        dblMontoMinTarifa = 0;
        dblMontoMinTax = 0;
        strA020SUFACT = "";
        dblA020SUDEBI = 0;
        strA728CTYVTA = "";
        strA728CTYEMI = "";
        strA728RERUT = "";
        strA728BOOKI1 = "";
        strA728REGIST = "";
        strA728CARRA1 = "";
        strA728FVLO1 = "";
        strA728NVLO1 = "";
        strA728NRODOC = "";
        strA728NROPRT = "";
        strA728FECFAR = "";
        strA728CODIT = "";
        dblA728CPLUSS = 0;
        strA020NROPRT = "";
        strA020NUMCTA = "";
        strFMETHOD = "";
        StrA020FVENTA = "";
        StrA728RUTORG = "";
        StrA728COUVTA = "";
        StrHEADER = "";
        StrORDENT = "";
        strA020DCHEQ = "";
        strCampo = "";
        strValorA020 = "";
        strValorA020Prueba = "";
        strA020FORMUL = "";
        strA020AIRLI2 = "";
        strA020FRECIB = "";
        strA020FUSO = "";
        dblA020NUC = 0;
        dblA020ROE = 0;
        lstTaxes = new ArrayList<RECA729>();
        lstTaxesOrig = new ArrayList<RECA729>();
        strA728XO = "";
        strA728TDESC = "";
        strTaxes = "";
        strRutaImagen = "";
        strRutaImagenOrig = "";
        strLocalCurrTax = "";
        totImagenes = 0;
        strA020PSTRF = "";
        strCarrrier = "";
        strA728CLASE1 = "";
        strA020FVLO = "";
        strMensaje = "";
        strA020RMSN = "";
        strA728ACUEO1 = "";
        dblA097IMPO = 0;
        dblA097ISC = 0;
        dblA097TAX = 0;
        dblA097UATP = 0;
        dblA097OTROS = 0;
        dblA533RVCOBR = 0;
        dblA728VALOR1 = 0;
        dblA533VCOBRA = 0;
        strA020TUSO = "";
        dblA728SS1 = 0;

        strA020GENRM = "";
        strA020TCALC = "";
        strA020TIPORM = "";
        strA020USER = "";
        strA020SDATE = "";
        strA020RMANT = "";
        strA020STIME = "";
        dblA020TARIFA = 0;
        strA020CODMOT = "";
        dblA020FAREUS = 0;
        strA020TICKE1 = "";
        strA020TICKE2 = "";
        strA020MNRCD = "";
        strA020DEBHAB = "";
        strA020QSEGUS = "";
        log = "";
        strAplicaSPA = "";
        booShowCom = false;
        strCodSPA = "";
        strA020BATCH = "";
        strA020ORDEN = "";
        strClearingDate = "";
        strA199TUSO = "";
        
        dblA020BOTCPR = 0;
        dblA020BOTCRM = 0;
        dblA020AOTCPM = 0;
        dblA020AOTCRM = 0;
        dblA020DOTCRM = 0;

    }

    public String getStrKey() {
        return this.strKey;
    }

    public void setStrKey(String strKey) {
        this.strKey = strKey;
    }

    public String getStrPrememo() {
        return this.strPrememo;
    }

    public void setStrPrememo(String strPrememo) {
        this.strPrememo = strPrememo;
    }

    public String getStrCIA() {
        return this.strCIA;
    }

    public void setStrCIA(String strCIA) {
        this.strCIA = strCIA;
    }

    public String getStrForma() {
        return this.strForma;
    }

    public void setStrForma(String strForma) {
        this.strForma = strForma;
    }

    public String getStrSerie() {
        return this.strSerie;
    }

    public void setStrSerie(String strSerie) {
        this.strSerie = strSerie;
    }

    public String getStrCupon() {
        return this.strCupon;
    }

    public void setStrCupon(String strCupon) {
        this.strCupon = strCupon;
    }

    public double getDblBilling() {
        return this.dblBilling;
    }

    public void setDblBilling(double dblBilling) {
        this.dblBilling = dblBilling;
    }

    public double getDblA020IMPNAC() {
        return this.dblA020IMPNAC;
    }

    public void setDblA020IMPNAC(double dblA020IMPNAC) {
        this.dblA020IMPNAC = dblA020IMPNAC;
    }

    public double getDblA020TOTDEB() {
        return this.dblA020TOTDEB;
    }

    public void setDblA020TOTDEB(double dblA020TOTDEB) {
        this.dblA020TOTDEB = dblA020TOTDEB;
    }

    public double getDblA020ANALIZ() {
        return this.dblA020ANALIZ;
    }

    public void setDblA020ANALIZ(double dblA020ANALIZ) {
        this.dblA020ANALIZ = dblA020ANALIZ;
    }

    public double getDblAcepMiatech() {
        return this.dblAcepMiatech;
    }

    public void setDblAcepMiatech(double dblAcepMiatech) {
        this.dblAcepMiatech = dblAcepMiatech;
    }

    public double getDblIMPINT() {
        return this.dblIMPINT;
    }

    public void setDblIMPINT(double dblIMPINT) {
        this.dblIMPINT = dblIMPINT;
    }

    public double getDblA020TOTHAB() {
        return this.dblA020TOTHAB;
    }

    public void setDblA020TOTHAB(double dblA020TOTHAB) {
        this.dblA020TOTHAB = dblA020TOTHAB;
    }

    public double getDblA020COMISP() {
        return this.dblA020COMISP;
    }

    public void setDblA020COMISP(double dblA020COMISP) {
        this.dblA020COMISP = dblA020COMISP;
    }

    public double getDblGROSS() {
        return this.dblGROSS;
    }

    public void setDblGROSS(double dblGROSS) {
        this.dblGROSS = dblGROSS;
    }

    public double getDblISC() {
        return this.dblISC;
    }

    public void setDblISC(double dblISC) {
        this.dblISC = dblISC;
    }

    public double getDblTAX() {
        return this.dblTAX;
    }

    public void setDblTAX(double dblTAX) {
        this.dblTAX = dblTAX;
    }

    public double getDblNETO() {
        return this.dblNETO;
    }

    public void setDblNETO(double dblNETO) {
        this.dblNETO = dblNETO;
    }

    public String getStrRuta() {
        return this.strRuta;
    }

    public void setStrRuta(String strRuta) {
        this.strRuta = strRuta;
    }

    public String getStrAirlin() {
        return this.strAirlin;
    }

    public void setStrAirlin(String strAirlin) {
        this.strAirlin = strAirlin;
    }

    public String getStrFrecha() {
        return this.strFrecha;
    }

    public void setStrFrecha(String strFrecha) {
        this.strFrecha = strFrecha;
    }

    public String getStrSuFech() {
        return this.strSuFech;
    }

    public void setStrSuFech(String strSuFech) {
        this.strSuFech = strSuFech;
    }

    public String getStrAirli3() {
        return this.strAirli3;
    }

    public void setStrAirli3(String strAirli3) {
        this.strAirli3 = strAirli3;
    }

    public String getStrRUTAP() {
        return this.strRUTAP;
    }

    public void setStrRUTAP(String strRUTAP) {
        this.strRUTAP = strRUTAP;
    }

    public String getStrPeriodo() {
        return this.strPeriodo;
    }

    public void setStrPeriodo(String strPeriodo) {
        this.strPeriodo = strPeriodo;
    }

    public String getStrFecVuelo() {
        return this.strFecVuelo;
    }

    public void setStrFecVuelo(String strFecVuelo) {
        this.strFecVuelo = strFecVuelo;
    }

    public String getStrFimpre() {
        return this.strFimpre;
    }

    public void setStrFimpre(String strFimpre) {
        this.strFimpre = strFimpre;
    }

    public String getStrTipo() {
        return this.strTipo;
    }

    public void setStrTipo(String strTipo) {
        this.strTipo = strTipo;
    }

    public String getStrBase() {
        return this.strBase;
    }

    public void setStrBase(String strBase) {
        this.strBase = strBase;
    }

    public long getLngTarifa() {
        return this.lngTarifa;
    }

    public void setLngTarifa(long lngTarifa) {
        this.lngTarifa = lngTarifa;
    }

    public String getStrMoneda() {
        return this.strMoneda;
    }

    public void setStrMoneda(String strMoneda) {
        this.strMoneda = strMoneda;
    }

    public String getStrTransport() {
        return this.strTransport;
    }

    public void setStrTransport(String strTransport) {
        this.strTransport = strTransport;
    }

    public String getStrClase() {
        return this.strClase;
    }

    public void setStrClase(String strClase) {
        this.strClase = strClase;
    }

    public String getStrCODOB1() {
        return this.strCODOB1;
    }

    public void setStrCODOB1(String strCODOB1) {
        this.strCODOB1 = strCODOB1;
    }

    public String getStrCODOB2() {
        return this.strCODOB2;
    }

    public void setStrCODOB2(String strCODOB2) {
        this.strCODOB2 = strCODOB2;
    }

    public String getStrCODOB3() {
        return this.strCODOB3;
    }

    public void setStrCODOB3(String strCODOB3) {
        this.strCODOB3 = strCODOB3;
    }

    public String getStrCODOB4() {
        return this.strCODOB4;
    }

    public void setStrCODOB4(String strCODOB4) {
        this.strCODOB4 = strCODOB4;
    }

    public String getStrCODOB5() {
        return this.strCODOB5;
    }

    public void setStrCODOB5(String strCODOB5) {
        this.strCODOB5 = strCODOB5;
    }

    public String getStrCOMME1() {
        return this.strCOMME1;
    }

    public void setStrCOMME1(String strCOMME1) {
        this.strCOMME1 = strCOMME1;
    }

    public String getStrCOMME2() {
        return this.strCOMME2;
    }

    public void setStrCOMME2(String strCOMME2) {
        this.strCOMME2 = strCOMME2;
    }

    public String getStrCOMME3() {
        return this.strCOMME3;
    }

    public void setStrCOMME3(String strCOMME3) {
        this.strCOMME3 = strCOMME3;
    }

    public String getStrCOMME4() {
        return this.strCOMME4;
    }

    public void setStrCOMME4(String strCOMME4) {
        this.strCOMME4 = strCOMME4;
    }

    public String getStrCOMME5() {
        return this.strCOMME5;
    }

    public void setStrCOMME5(String strCOMME5) {
        this.strCOMME5 = strCOMME5;
    }

    public String getStrCOMME6() {
        return this.strCOMME6;
    }

    public void setStrCOMME6(String strCOMME6) {
        this.strCOMME6 = strCOMME6;
    }

    public String getStrYearFrom() {
        return this.strYearFrom;
    }

    public void setStrYearFrom(String strYearFrom) {
        this.strYearFrom = strYearFrom;
    }

    public String getStrMonthFrom() {
        return this.strMonthFrom;
    }

    public void setStrMonthFrom(String strMonthFrom) {
        this.strMonthFrom = strMonthFrom;
    }

    public String getStrDayFrom() {
        return this.strDayFrom;
    }

    public void setStrDayFrom(String strDayFrom) {
        this.strDayFrom = strDayFrom;
    }

    public String getStrYearTo() {
        return this.strYearTo;
    }

    public void setStrYearTo(String strYearTo) {
        this.strYearTo = strYearTo;
    }

    public String getStrMonthTo() {
        return this.strMonthTo;
    }

    public void setStrMonthTo(String strMonthTo) {
        this.strMonthTo = strMonthTo;
    }

    public String getStrDayTo() {
        return this.strDayTo;
    }

    public void setStrDayTo(String strDayTo) {
        this.strDayTo = strDayTo;
    }

    public String getStrUser() {
        return this.strUser;
    }

    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }

    public String getStrClassRM() {
        return this.strClassRM;
    }

    public void setStrClassRM(String strClassRM) {
        this.strClassRM = strClassRM;
    }

    public String getStrETKT() {
        return this.strETKT;
    }

    public void setStrETKT(String strETKT) {
        this.strETKT = strETKT;
    }

    public long getLngTtlOver() {
        return this.lngTtlOver;
    }

    public void setLngTtlOver(long lngTtlOver) {
        this.lngTtlOver = lngTtlOver;
    }

    public long getLngTtlUnder() {
        return this.lngTtlUnder;
    }

    public void setLngTtlUnder(long lngTtlUnder) {
        this.lngTtlUnder = lngTtlUnder;
    }

    public long getLngTtlMatch() {
        return this.lngTtlMatch;
    }

    public void setLngTtlMatch(long lngTtlMatch) {
        this.lngTtlMatch = lngTtlMatch;
    }

    public long getLngTtlReview() {
        return this.lngTtlReview;
    }

    public void setLngTtlReview(long lngTtlReview) {
        this.lngTtlReview = lngTtlReview;
    }

    public long getLngTtlCpnsInv() {
        return this.lngTtlCpnsInv;
    }

    public void setLngTtlCpnsInv(long lngTtlCpnsInv) {
        this.lngTtlCpnsInv = lngTtlCpnsInv;
    }

    public long getLngTtlCpnsProcess() {
        return this.lngTtlCpnsProcess;
    }

    public void setLngTtlCpnsProcess(long lngTtlCpnsProcess) {
        this.lngTtlCpnsProcess = lngTtlCpnsProcess;
    }

    public double getDblRate() {
        return this.dblRate;
    }

    public void setDblRate(double dblRate) {
        this.dblRate = dblRate;
    }

    public String getStrDoc() {
        return this.strDoc;
    }

    public void setStrDoc(String strDoc) {
        this.strDoc = strDoc;
    }

    public String getFlagRevisado() {
        return this.flagRevisado;
    }

    public void setFlagRevisado(String flagRevisado) {
        this.flagRevisado = flagRevisado;
    }

    public String getStrRegDate() {
        return this.strRegDate;
    }

    public void setStrRegDate(String strRegDate) {
        this.strRegDate = strRegDate;
    }

    public String getStrGrupo() {
        return this.strGrupo;
    }

    public void setStrGrupo(String strGrupo) {
        this.strGrupo = strGrupo;
    }

    public double getDblMontoMinTarifa() {
        return this.dblMontoMinTarifa;
    }

    public void setDblMontoMinTarifa(double dblMontoMinTarifa) {
        this.dblMontoMinTarifa = dblMontoMinTarifa;
    }

    public double getDblMontoMinTax() {
        return this.dblMontoMinTax;
    }

    public void setDblMontoMinTax(double dblMontoMinTax) {
        this.dblMontoMinTax = dblMontoMinTax;
    }

    public String getStrA020SUFACT() {
        return this.strA020SUFACT;
    }

    public void setStrA020SUFACT(String strA020SUFACT) {
        this.strA020SUFACT = strA020SUFACT;
    }

    public double getDblA020SUDEBI() {
        return this.dblA020SUDEBI;
    }

    public void setDblA020SUDEBI(double dblA020SUDEBI) {
        this.dblA020SUDEBI = dblA020SUDEBI;
    }

    public String getStrA728CTYVTA() {
        return this.strA728CTYVTA;
    }

    public void setStrA728CTYVTA(String strA728CTYVTA) {
        this.strA728CTYVTA = strA728CTYVTA;
    }

    public String getStrA728CTYEMI() {
        return this.strA728CTYEMI;
    }

    public void setStrA728CTYEMI(String strA728CTYEMI) {
        this.strA728CTYEMI = strA728CTYEMI;
    }

    public String getStrA728RERUT() {
        return this.strA728RERUT;
    }

    public void setStrA728RERUT(String strA728RERUT) {
        this.strA728RERUT = strA728RERUT;
    }

    public String getStrA728BOOKI1() {
        return this.strA728BOOKI1;
    }

    public void setStrA728BOOKI1(String strA728BOOKI1) {
        this.strA728BOOKI1 = strA728BOOKI1;
    }

    public String getStrA728REGIST() {
        return this.strA728REGIST;
    }

    public void setStrA728REGIST(String strA728REGIST) {
        this.strA728REGIST = strA728REGIST;
    }

    public String getStrA728CARRA1() {
        return this.strA728CARRA1;
    }

    public void setStrA728CARRA1(String strA728CARRA1) {
        this.strA728CARRA1 = strA728CARRA1;
    }

    public String getStrA728FVLO1() {
        return this.strA728FVLO1;
    }

    public void setStrA728FVLO1(String strA728FVLO1) {
        this.strA728FVLO1 = strA728FVLO1;
    }

    public String getStrA728NVLO1() {
        return this.strA728NVLO1;
    }

    public void setStrA728NVLO1(String strA728NVLO1) {
        this.strA728NVLO1 = strA728NVLO1;
    }

    public String getStrA728NRODOC() {
        return this.strA728NRODOC;
    }

    public void setStrA728NRODOC(String strA728NRODOC) {
        this.strA728NRODOC = strA728NRODOC;
    }

    public String getStrA728NROPRT() {
        return this.strA728NROPRT;
    }

    public void setStrA728NROPRT(String strA728NROPRT) {
        this.strA728NROPRT = strA728NROPRT;
    }

    public String getStrA728FECFAR() {
        return this.strA728FECFAR;
    }

    public void setStrA728FECFAR(String strA728FECFAR) {
        this.strA728FECFAR = strA728FECFAR;
    }

    public String getStrA728CODIT() {
        return this.strA728CODIT;
    }

    public void setStrA728CODIT(String strA728CODIT) {
        this.strA728CODIT = strA728CODIT;
    }

    public double getDblA728CPLUSS() {
        return this.dblA728CPLUSS;
    }

    public void setDblA728CPLUSS(double dblA728CPLUSS) {
        this.dblA728CPLUSS = dblA728CPLUSS;
    }

    public String getStrA020NROPRT() {
        return this.strA020NROPRT;
    }

    public void setStrA020NROPRT(String strA020NROPRT) {
        this.strA020NROPRT = strA020NROPRT;
    }

    public String getStrA020NUMCTA() {
        return this.strA020NUMCTA;
    }

    public void setStrA020NUMCTA(String strA020NUMCTA) {
        this.strA020NUMCTA = strA020NUMCTA;
    }

    public String getStrFMETHOD() {
        return this.strFMETHOD;
    }

    public void setStrFMETHOD(String strFMETHOD) {
        this.strFMETHOD = strFMETHOD;
    }

    public String getStrA020FVENTA() {
        return this.StrA020FVENTA;
    }

    public void setStrA020FVENTA(String StrA020FVENTA) {
        this.StrA020FVENTA = StrA020FVENTA;
    }

    public String getStrA728RUTORG() {
        return this.StrA728RUTORG;
    }

    public void setStrA728RUTORG(String StrA728RUTORG) {
        this.StrA728RUTORG = StrA728RUTORG;
    }

    public String getStrA728COUVTA() {
        return this.StrA728COUVTA;
    }

    public void setStrA728COUVTA(String StrA728COUVTA) {
        this.StrA728COUVTA = StrA728COUVTA;
    }

    public String getStrHEADER() {
        return this.StrHEADER;
    }

    public void setStrHEADER(String StrHEADER) {
        this.StrHEADER = StrHEADER;
    }

    public String getStrORDENT() {
        return this.StrORDENT;
    }

    public void setStrORDENT(String StrORDENT) {
        this.StrORDENT = StrORDENT;
    }

    public String getStrA020DCHEQ() {
        return this.strA020DCHEQ;
    }

    public void setStrA020DCHEQ(String strA020DCHEQ) {
        this.strA020DCHEQ = strA020DCHEQ;
    }

    public String getStrCampo() {
        return this.strCampo;
    }

    public void setStrCampo(String strCampo) {
        this.strCampo = strCampo;
    }

    public String getStrValorA020() {
        return this.strValorA020;
    }

    public void setStrValorA020(String strValorA020) {
        this.strValorA020 = strValorA020;
    }

    public String getStrValorA020Prueba() {
        return this.strValorA020Prueba;
    }

    public void setStrValorA020Prueba(String strValorA020Prueba) {
        this.strValorA020Prueba = strValorA020Prueba;
    }

    public String getStrA020FORMUL() {
        return this.strA020FORMUL;
    }

    public void setStrA020FORMUL(String strA020FORMUL) {
        this.strA020FORMUL = strA020FORMUL;
    }

    public String getStrA020AIRLI2() {
        return this.strA020AIRLI2;
    }

    public void setStrA020AIRLI2(String strA020AIRLI2) {
        this.strA020AIRLI2 = strA020AIRLI2;
    }

    public String getStrA020FRECIB() {
        return this.strA020FRECIB;
    }

    public void setStrA020FRECIB(String strA020FRECIB) {
        this.strA020FRECIB = strA020FRECIB;
    }

    public String getStrA020FUSO() {
        return this.strA020FUSO;
    }

    public void setStrA020FUSO(String strA020FUSO) {
        this.strA020FUSO = strA020FUSO;
    }

    public double getDblA020NUC() {
        return this.dblA020NUC;
    }

    public void setDblA020NUC(double dblA020NUC) {
        this.dblA020NUC = dblA020NUC;
    }

    public double getDblA020ROE() {
        return this.dblA020ROE;
    }

    public void setDblA020ROE(double dblA020ROE) {
        this.dblA020ROE = dblA020ROE;
    }

    public List<RECA729> getLstTaxes() {
        return this.lstTaxes;
    }

    public void setLstTaxes(List<RECA729> lstTaxes) {
        this.lstTaxes = lstTaxes;
    }

    public String getStrA728XO() {
        return this.strA728XO;
    }

    public void setStrA728XO(String strA728XO) {
        this.strA728XO = strA728XO;
    }

    public String getStrA728TDESC() {
        return this.strA728TDESC;
    }

    public void setStrA728TDESC(String strA728TDESC) {
        this.strA728TDESC = strA728TDESC;
    }

    public String getStrTaxes() {
        return this.strTaxes;
    }

    public void setStrTaxes(String strTaxes) {
        this.strTaxes = strTaxes;
    }

    public String getStrRutaImagen() {
        return this.strRutaImagen;
    }

    public void setStrRutaImagen(String strRutaImagen) {
        this.strRutaImagen = strRutaImagen;
    }

    public String getStrRutaImagenOrig() {
        return this.strRutaImagenOrig;
    }

    public void setStrRutaImagenOrig(String strRutaImagenOrig) {
        this.strRutaImagenOrig = strRutaImagenOrig;
    }

    public String getStrLocalCurrTax() {
        return this.strLocalCurrTax;
    }

    public void setStrLocalCurrTax(String strLocalCurrTax) {
        this.strLocalCurrTax = strLocalCurrTax;
    }

    public int getIntTotImagenes() {
        return this.getTotImagenes();
    }

    public void setIntTotImagenes(int totImagenes) {
        this.setTotImagenes(totImagenes);
    }

    public String getStrA020PSTRF() {
        return this.strA020PSTRF;
    }

    public void setStrA020PSTRF(String strA020PSTRF) {
        this.strA020PSTRF = strA020PSTRF;
    }

    public String getStrCarrrier() {
        return this.strCarrrier;
    }

    public void setStrCarrrier(String strCarrrier) {
        this.strCarrrier = strCarrrier;
    }

    public String getStrA728CLASE1() {
        return this.strA728CLASE1;
    }

    public void setStrA728CLASE1(String strA728CLASE1) {
        this.strA728CLASE1 = strA728CLASE1;
    }

    public List<RECA729> getLstTaxesOrig() {
        return lstTaxesOrig;
    }

    public void setLstTaxesOrig(List<RECA729> lstTaxesOrig) {
        this.lstTaxesOrig = lstTaxesOrig;
    }

    public String getStrA020FVLO() {
        return strA020FVLO;
    }

    public void setStrA020FVLO(String strA020FVLO) {
        this.strA020FVLO = strA020FVLO;
    }

    public String getStrMensaje() {
        return strMensaje;
    }

    public void setStrMensaje(String strMensaje) {
        this.strMensaje = strMensaje;
    }

    public String getStrA020RMSN() {
        return strA020RMSN;
    }

    public void setStrA020RMSN(String strA020RMSN) {
        this.strA020RMSN = strA020RMSN;
    }

    public String getStrA728ACUEO1() {
        return strA728ACUEO1;
    }

    public void setStrA728ACUEO1(String strA728ACUEO1) {
        this.strA728ACUEO1 = strA728ACUEO1;
    }

    public double getDblA097IMPO() {
        return dblA097IMPO;
    }

    public void setDblA097IMPO(double dblA097IMPO) {
        this.dblA097IMPO = dblA097IMPO;
    }

    public double getDblA097ISC() {
        return dblA097ISC;
    }

    public void setDblA097ISC(double dblA097ISC) {
        this.dblA097ISC = dblA097ISC;
    }

    public double getDblA097TAX() {
        return dblA097TAX;
    }

    public void setDblA097TAX(double dblA097TAX) {
        this.dblA097TAX = dblA097TAX;
    }

    public double getDblA097UATP() {
        return dblA097UATP;
    }

    public void setDblA097UATP(double dblA097UATP) {
        this.dblA097UATP = dblA097UATP;
    }

    public double getDblA097OTROS() {
        return dblA097OTROS;
    }

    public void setDblA097OTROS(double dblA097OTROS) {
        this.dblA097OTROS = dblA097OTROS;
    }

    public double getDblA533RVCOBR() {
        return dblA533RVCOBR;
    }

    public void setDblA533RVCOBR(double dblA533RVCOBR) {
        this.dblA533RVCOBR = dblA533RVCOBR;
    }

    /**
     * @return the dblA728VALOR1
     */
    public double getDblA728VALOR1() {
        return dblA728VALOR1;
    }

    /**
     * @param dblA728VALOR1 the dblA728VALOR1 to set
     */
    public void setDblA728VALOR1(double dblA728VALOR1) {
        this.dblA728VALOR1 = dblA728VALOR1;
    }

    /**
     * @return the dblA533VCOBRA
     */
    public double getDblA533VCOBRA() {
        return dblA533VCOBRA;
    }

    /**
     * @param dblA533VCOBRA the dblA533VCOBRA to set
     */
    public void setDblA533VCOBRA(double dblA533VCOBRA) {
        this.dblA533VCOBRA = dblA533VCOBRA;
    }

    /**
     * @return the strA020TUSO
     */
    public String getStrA020TUSO() {
        return strA020TUSO;
    }

    /**
     * @param strA020TUSO the strA020TUSO to set
     */
    public void setStrA020TUSO(String strA020TUSO) {
        this.strA020TUSO = strA020TUSO;
    }

    /**
     * @return the totImagenes
     */
    public int getTotImagenes() {
        return totImagenes;
    }

    /**
     * @param totImagenes the totImagenes to set
     */
    public void setTotImagenes(int totImagenes) {
        this.totImagenes = totImagenes;
    }

    /**
     * @return the dblA728SS1
     */
    public double getDblA728SS1() {
        return dblA728SS1;
    }

    /**
     * @param dblA728SS1 the dblA728SS1 to set
     */
    public void setDblA728SS1(double dblA728SS1) {
        this.dblA728SS1 = dblA728SS1;
    }

    public String getStrA020GENRM() {
        return strA020GENRM;
    }

    public void setStrA020GENRM(String strA020GENRM) {
        this.strA020GENRM = strA020GENRM;
    }

    /**
     * @return the strA020TCALC
     */
    public String getStrA020TCALC() {
        return strA020TCALC;
    }

    /**
     * @param strA020TCALC the strA020TCALC to set
     */
    public void setStrA020TCALC(String strA020TCALC) {
        this.strA020TCALC = strA020TCALC;
    }

    /**
     * @return the strA020TIPORM
     */
    public String getStrA020TIPORM() {
        return strA020TIPORM;
    }

    /**
     * @param strA020TIPORM the strA020TIPORM to set
     */
    public void setStrA020TIPORM(String strA020TIPORM) {
        this.strA020TIPORM = strA020TIPORM;
    }

    /**
     * @return the strA020USER
     */
    public String getStrA020USER() {
        return strA020USER;
    }

    /**
     * @param strA020USER the strA020USER to set
     */
    public void setStrA020USER(String strA020USER) {
        this.strA020USER = strA020USER;
    }

    /**
     * @return the strA020SDATE
     */
    public String getStrA020SDATE() {
        return strA020SDATE;
    }

    /**
     * @param strA020SDATE the strA020SDATE to set
     */
    public void setStrA020SDATE(String strA020SDATE) {
        this.strA020SDATE = strA020SDATE;
    }

    /**
     * @return the strA020RMANT
     */
    public String getStrA020RMANT() {
        return strA020RMANT;
    }

    /**
     * @param strA020RMANT the strA020RMANT to set
     */
    public void setStrA020RMANT(String strA020RMANT) {
        this.strA020RMANT = strA020RMANT;
    }

    /**
     * @return the strA020STIME
     */
    public String getStrA020STIME() {
        return strA020STIME;
    }

    /**
     * @param strA020STIME the strA020STIME to set
     */
    public void setStrA020STIME(String strA020STIME) {
        this.strA020STIME = strA020STIME;
    }

    /**
     * @return the strA020CODMOT
     */
    public String getStrA020CODMOT() {
        return strA020CODMOT;
    }

    /**
     * @param strA020CODMOT the strA020CODMOT to set
     */
    public void setStrA020CODMOT(String strA020CODMOT) {
        this.strA020CODMOT = strA020CODMOT;
    }

    /**
     * @return the strA020TICKE1
     */
    public String getStrA020TICKE1() {
        return strA020TICKE1;
    }

    /**
     * @param strA020TICKE1 the strA020TICKE1 to set
     */
    public void setStrA020TICKE1(String strA020TICKE1) {
        this.strA020TICKE1 = strA020TICKE1;
    }

    /**
     * @return the strA020TICKE2
     */
    public String getStrA020TICKE2() {
        return strA020TICKE2;
    }

    /**
     * @param strA020TICKE2 the strA020TICKE2 to set
     */
    public void setStrA020TICKE2(String strA020TICKE2) {
        this.strA020TICKE2 = strA020TICKE2;
    }

    /**
     * @return the strA020MNRCD
     */
    public String getStrA020MNRCD() {
        return strA020MNRCD;
    }

    /**
     * @param strA020MNRCD the strA020MNRCD to set
     */
    public void setStrA020MNRCD(String strA020MNRCD) {
        this.strA020MNRCD = strA020MNRCD;
    }

    /**
     * @return the strA020DEBHAB
     */
    public String getStrA020DEBHAB() {
        return strA020DEBHAB;
    }

    /**
     * @param strA020DEBHAB the strA020DEBHAB to set
     */
    public void setStrA020DEBHAB(String strA020DEBHAB) {
        this.strA020DEBHAB = strA020DEBHAB;
    }

    /**
     * @return the strA020QSEGUS
     */
    public String getStrA020QSEGUS() {
        return strA020QSEGUS;
    }

    /**
     * @param strA020QSEGUS the strA020QSEGUS to set
     */
    public void setStrA020QSEGUS(String strA020QSEGUS) {
        this.strA020QSEGUS = strA020QSEGUS;
    }

    /**
     * @return the dblA020TARIFA
     */
    public double getDblA020TARIFA() {
        return dblA020TARIFA;
    }

    /**
     * @param dblA020TARIFA the dblA020TARIFA to set
     */
    public void setDblA020TARIFA(double dblA020TARIFA) {
        this.dblA020TARIFA = dblA020TARIFA;
    }

    /**
     * @return the dblA020FAREUS
     */
    public double getDblA020FAREUS() {
        return dblA020FAREUS;
    }

    /**
     * @param dblA020FAREUS the dblA020FAREUS to set
     */
    public void setDblA020FAREUS(double dblA020FAREUS) {
        this.dblA020FAREUS = dblA020FAREUS;
    }

    /**
     * @return the log
     */
    public String getLog() {
        return log;
    }

    /**
     * @param log the log to set
     */
    public void setLog(String log) {
        this.log = log;
    }

    /**
     * @return the strAplicaSPA
     */
    public String getStrAplicaSPA() {
        return strAplicaSPA;
    }

    /**
     * @param strAplicaSPA the strAplicaSPA to set
     */
    public void setStrAplicaSPA(String strAplicaSPA) {
        this.strAplicaSPA = strAplicaSPA;
    }

    /**
     * @return the booShowCom
     */
    public boolean isBooShowCom() {
        return booShowCom;
    }

    /**
     * @param booShowCom the booShowCom to set
     */
    public void setBooShowCom(boolean booShowCom) {
        this.booShowCom = booShowCom;
    }

    /**
     * @return the strCodSPA
     */
    public String getStrCodSPA() {
        return strCodSPA;
    }

    /**
     * @param strCodSPA the strCodSPA to set
     */
    public void setStrCodSPA(String strCodSPA) {
        this.strCodSPA = strCodSPA;
    }

    /**
     * @return the strA020BATCH
     */
    public String getStrA020BATCH() {
        return strA020BATCH;
    }

    /**
     * @param strA020BATCH the strA020BATCH to set
     */
    public void setStrA020BATCH(String strA020BATCH) {
        this.strA020BATCH = strA020BATCH;
    }

    /**
     * @return the strA020ORDEN
     */
    public String getStrA020ORDEN() {
        return strA020ORDEN;
    }

    /**
     * @param strA020ORDEN the strA020ORDEN to set
     */
    public void setStrA020ORDEN(String strA020ORDEN) {
        this.strA020ORDEN = strA020ORDEN;
    }

    /**
     * @return the srClearingDate
     */
    public String getStrClearingDate() {
        return strClearingDate;
    }

    /**
     * @param srClearingDate the srClearingDate to set
     */
    public void setStrClearingDate(String strClearingDate) {
        this.strClearingDate = strClearingDate;
    }

    /**
     * @return the strA199TUSO
     */
    public String getStrA199TUSO() {
        return strA199TUSO;
    }

    /**
     * @param strA199TUSO the strA199TUSO to set
     */
    public void setStrA199TUSO(String strA199TUSO) {
        this.strA199TUSO = strA199TUSO;
    }

    /**
     * @return the dblA020BOTCPR
     */
    public double getDblA020BOTCPR() {
        return dblA020BOTCPR;
    }

    /**
     * @param dblA020BOTCPR the dblA020BOTCPR to set
     */
    public void setDblA020BOTCPR(double dblA020BOTCPR) {
        this.dblA020BOTCPR = dblA020BOTCPR;
    }

    /**
     * @return the dblA020BOTCRM
     */
    public double getDblA020BOTCRM() {
        return dblA020BOTCRM;
    }

    /**
     * @param dblA020BOTCRM the dblA020BOTCRM to set
     */
    public void setDblA020BOTCRM(double dblA020BOTCRM) {
        this.dblA020BOTCRM = dblA020BOTCRM;
    }

    /**
     * @return the dblA020AOTCPM
     */
    public double getDblA020AOTCPM() {
        return dblA020AOTCPM;
    }

    /**
     * @param dblA020AOTCPM the dblA020AOTCPM to set
     */
    public void setDblA020AOTCPM(double dblA020AOTCPM) {
        this.dblA020AOTCPM = dblA020AOTCPM;
    }

    /**
     * @return the dblA020AOTCRM
     */
    public double getDblA020AOTCRM() {
        return dblA020AOTCRM;
    }

    /**
     * @param dblA020AOTCRM the dblA020AOTCRM to set
     */
    public void setDblA020AOTCRM(double dblA020AOTCRM) {
        this.dblA020AOTCRM = dblA020AOTCRM;
    }

    /**
     * @return the dblA020DOTCRM
     */
    public double getDblA020DOTCRM() {
        return dblA020DOTCRM;
    }

    /**
     * @param dblA020DOTCRM the dblA020DOTCRM to set
     */
    public void setDblA020DOTCRM(double dblA020DOTCRM) {
        this.dblA020DOTCRM = dblA020DOTCRM;
    }
}
