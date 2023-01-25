package net.miatech.praxis.SaleAudit;

public class A1672 {

    
    public String A1672CCUST = ""; //Customer
    public String A1672CIA = ""; //CIA
    public String A1672FORMA = ""; //Forma	
    public String A1672SERIE = ""; //Serie
    public String A1672SEQ = ""; //Seq
    public String A1672AGENT = "";//Agent
    public String A1672CUPON = "";
    //DATOS GENERALES DEL TICKET
    public String A1672PAIVT = "";
    public String A1672TICKET = ""; //TICKET (CIA FORMA SERIE - SEQ)
    public String A1672CDGT = ""; //
    public String A1672GRUPO = ""; //
    public String A1672FPROC = ""; //
    public String A1672FVENT = ""; //
    public String A1672FUENT = ""; //
    public String A1672CANAL = ""; //
    public String A1672TARTK = ""; //
    public String A1672MONTT = ""; //
    public String A1672EQVTK = ""; //
    public String A1672MONET = ""; //
    public String A1672CODIT = ""; //
    public String A1672ITIN = ""; //
    public String A1672TRUTA = "";
    public String A1672TRNCU = "";
    public String A1672STAT = "";
    public String A1672TFARE = ""; //
    //FAREBASIS UTILIZADOS EN EL TICKET
    public String A1672FBASI = "";
    //FECHAS DE VUELOS UTILIZADOS EN EL TICKET
    public String A1672FVLO = ""; //
    //DATOS DE VALORIZACION Y DIFERENCIAS EN GENERAL (FARE/TAX/COM)
    public String A1672FMORI = ""; //
    public String A1672QMORI = ""; //
    public String A1672FAORI = ""; //
    public String A1672QORIG = ""; //
    public String A1672FADIF = ""; //
    public String A1672QDIF = ""; // 
    public String A1672TXMIA = ""; //
    public String A1672TXAGT = ""; //
    public String A1672TXDIF = ""; //
    public String A1672PCMIA = ""; //
    public String A1672COMIA = ""; //
    public String A1672PCAGT = ""; //
    public String A1672COAGT = ""; //
    public String A1672PODIF = ""; //
    public String A1672CODIF = ""; //    
    public String A1672PSCMI = ""; //
    public String A1672SCMIA = ""; //
    public String A1672PSCAG = ""; //
    public String A1672SCAGT = ""; //
    public String A1672PSCDI = ""; //
    public String A1672SCDIF = ""; //
    public String A1672POMIA = ""; //
    public String A1672OVMIA = ""; //
    public String A1672POAGT = ""; //
    public String A1672OVAGT = ""; //
    public String A1672PVDIF = ""; //
    public String A1672OVDIF = ""; //
    public String A1672NETO = ""; // 
    public String A1672TTMIA = ""; //
    public String A1672TTAGT = ""; //
    public String A1672TTDIF = ""; //
    public String A1672BAGFT = ""; //
    public String A1672CHAMI = ""; //
    public String A1672CHAOR = ""; //
    public String A1672CHADI = ""; //
    public String A1672NAGENCY = "";
    public String A1672ERROR = "";
    public String A1672NREASON = "";
    public String A1672CURRENCY = "";
    public String A1672PNR = "";
    public String A1672IDFIL = "";
    public int A1672CORREO = 0;
    public String A1672MEMO = "";
    public String A1672FLADM = "";
    public String A1672REVIS = "";
    public String A1672TDOC = "";
    public String A2548FLAG = "";
    public String A1672CARR = "";
    public String A1672NVLO = "";
    public String A1672CONEX = "";
    public String A1672CLASE = "";
    public String A1672CABIN = "";
    public String A1672UASIG = "";
    public String A1672FASIG = "";
    public String A1672FREVI = "";
    public String A1672CTYEM = "";
    public String A1672TPAX = "";
    public String A1672ADC = "";
    public String A1672NUC = "";
    public String A1672ROE = "";
    public String A1672PLUS = "";
    public String A1672SOVER = "";
    public String A1672TCAMB = "";
    public String A1672FCMI = "";
    public String A1672TIPOF = "";
    public String A1672PAIEM = "";
    public String A1672CPNS = "";
    public String A1672COMEN = "";
    public String A1672CMBPO = "";
    public String A1672MODI = "";
    public String A1672ARPI = "";
    public String A1672FCPI = "";
    public String A1672SASI = "";
    public String A1672FREGI = "";
    //agregado por zpp
    public String A1672CONXV;
    public String A1672MOTAI;
    public String A1672MOEAI;
    public String A1672DI;
    public String A1672FEMIO;
    public String A1672IATAO;
    public String A1672CEMIO;
    public String A1672CIAOR;
    public String A1672FOROR;
    public String A1672SEROR;
    public String A1672QTYTK;
    public String A1672DIVTA;
    public String A1672FAREM;
    public String A1672EQVM;
    public String A1672MDAAD;
    public String A1672FLAGP;
    public String A1672FRESV;
    public String A1672MOTAU;
    public String A1672MOEAU;
    public String A1672RFIS;
    public String A1672RFICM;
    public String A1672CODWA;
    public String A1672CNX1;
    public String A1672CNX2;
    public String A1672CNX3;
    public String A1672CNX4;
    public double A1672QOVER;
    public double A1672YQORI;
    public double A1672TARAI;
    public double A1672EQVAI;
    public double A1672YQPGM;
    public double A1672YRPGM;
    public double A1672PNTMI;
    public double A1672EQVN;
    public double A1672BSR;
    public double A1672TARAU;
    public double A1672EQVAU;
    public double A1672SOVAI;
    public double A1672CAMBIODIFE;
    public double A1672PNTIV;
    public String A1672RUTAF;
    public String A1672NAMEF;
    public String A1672STO0;
    public String A1672TKCNX;
    //DATOS PARA LA ESTADISTICA
    public double REJETQTY;
    public double REJETPORC;
    public double REAUTQTY;
    public double REAUTPORC;
    public double JUSTIQTY;
    public double JUSTIPORC;
    public double AUTHOQTY;
    public double AUTHOPORC;
    public double SUGGESTQTY;
    public double SUGGESTPORC;
    public double ACCEPTQTY;
    public double ACCEPTPORC;
    public double TOTAL;

    public double CLIENTEQTY;
    public double CLIENTEPORC;
    public double DESHABIQTY;
    public double DESHABIPORC;
    public double PEDIENTEQTY;
    public double PEDIENTEPORC;

    public int CANTTOT;
    public int CANTADM;
    public double ADMUSD;
    public int CANTADMACEP;
    public double ADMACEPUSD;
    public int CANTADMRECH;
    public double ADMRECHUSD;
    public int CANTADMREV;
    public double ADMREVUSD;
    public int CANTADMENV;
    public double ADMENVUSD;
    public int CANTBILLED;
    public double BILLEDUSD;

    public double CANTADMACEPORC;
    public double CANTADMRECHPORC;
    public double CANTADMREVPORC;
    public double CANTADMENVPORC;
    public double CANTBILLEDPORC;
    public int CANTADMJUSTI;
    public int CANTADMREUDITE;
    public int CANTADMPENGROUP;
    public int CANTADMAUTORI;
    public int CANTADMSINCLIE;
    public int CANTADMIATADISA;
    public int CANTADMGDS;
    public int CANTASR;
    public int CANTBSP;
    public int CANTJUSTIADMREPORT;
    public int CANTARC;
    public int CANTABSP;
    public int CANTOTAL;
    public int TOTALGROUP;

    public int getCANTOTAL() {
        return CANTOTAL;
    }

    public void setCANTOTAL(int CANTOTAL) {
        this.CANTOTAL = CANTOTAL;
    }

    public int getTOTALGROUP() {
        return TOTALGROUP;
    }

    public void setTOTALGROUP(int TOTALGROUP) {
        this.TOTALGROUP = TOTALGROUP;
    }
    
    
    public int getCANTARC() {
        return CANTARC;
    }

    public void setCANTARC(int CANTARC) {
        this.CANTARC = CANTARC;
    }

    public int getCANTABSP() {
        return CANTABSP;
    }

    public void setCANTABSP(int CANTABSP) {
        this.CANTABSP = CANTABSP;
    }
    
    
    public int getCANTADMJUSTI() {
        return CANTADMJUSTI;
    }

    public void setCANTADMJUSTI(int CANTADMJUSTI) {
        this.CANTADMJUSTI = CANTADMJUSTI;
    }

    public int getCANTADMREUDITE() {
        return CANTADMREUDITE;
    }

    public void setCANTADMREUDITE(int CANTADMREUDITE) {
        this.CANTADMREUDITE = CANTADMREUDITE;
    }

    public int getCANTADMPENGROUP() {
        return CANTADMPENGROUP;
    }

    public void setCANTADMPENGROUP(int CANTADMPENGROUP) {
        this.CANTADMPENGROUP = CANTADMPENGROUP;
    }

    public int getCANTADMAUTORI() {
        return CANTADMAUTORI;
    }

    public void setCANTADMAUTORI(int CANTADMAUTORI) {
        this.CANTADMAUTORI = CANTADMAUTORI;
    }

    public int getCANTADMSINCLIE() {
        return CANTADMSINCLIE;
    }

    public void setCANTADMSINCLIE(int CANTADMSINCLIE) {
        this.CANTADMSINCLIE = CANTADMSINCLIE;
    }

    public int getCANTADMIATADISA() {
        return CANTADMIATADISA;
    }

    public void setCANTADMIATADISA(int CANTADMIATADISA) {
        this.CANTADMIATADISA = CANTADMIATADISA;
    }

    public int getCANTADMGDS() {
        return CANTADMGDS;
    }

    public void setCANTADMGDS(int CANTADMGDS) {
        this.CANTADMGDS = CANTADMGDS;
    }

    public int getCANTASR() {
        return CANTASR;
    }

    public void setCANTASR(int CANTASR) {
        this.CANTASR = CANTASR;
    }

    public int getCANTBSP() {
        return CANTBSP;
    }

    public void setCANTBSP(int CANTBSP) {
        this.CANTBSP = CANTBSP;
    }
    
    

    public double getCANTADMACEPORC() {
        return CANTADMACEPORC;
    }

    public void setCANTADMACEPORC(int CANTADMACEPORC) {
        this.CANTADMACEPORC = CANTADMACEPORC;
    }

    public double getCANTADMRECHPORC() {
        return CANTADMRECHPORC;
    }

    public void setCANTADMRECHPORC(int CANTADMRECHPORC) {
        this.CANTADMRECHPORC = CANTADMRECHPORC;
    }

    public double getCANTADMREVPORC() {
        return CANTADMREVPORC;
    }

    public void setCANTADMREVPORC(int CANTADMREVPORC) {
        this.CANTADMREVPORC = CANTADMREVPORC;
    }

    public double getCANTADMENVPORC() {
        return CANTADMENVPORC;
    }

    public void setCANTADMENVPORC(int CANTADMENVPORC) {
        this.CANTADMENVPORC = CANTADMENVPORC;
    }

    public double getCANTBILLEDPORC() {
        return CANTBILLEDPORC;
    }

    public void setCANTBILLEDPORC(int CANTBILLEDPORC) {
        this.CANTBILLEDPORC = CANTBILLEDPORC;
    }

    public int getCANTTOT() {
        return CANTTOT;
    }

    public void setCANTTOT(int CANTTOT) {
        this.CANTTOT = CANTTOT;
    }

    public int getCANTADM() {
        return CANTADM;
    }

    public void setCANTADM(int CANTADM) {
        this.CANTADM = CANTADM;
    }

    public double getADMUSD() {
        return ADMUSD;
    }

    public void setADMUSD(double ADMUSD) {
        this.ADMUSD = ADMUSD;
    }

    public int getCANTADMACEP() {
        return CANTADMACEP;
    }

    public void setCANTADMACEP(int CANTADMACEP) {
        this.CANTADMACEP = CANTADMACEP;
    }

    public double getADMACEPUSD() {
        return ADMACEPUSD;
    }

    public void setADMACEPUSD(double ADMACEPUSD) {
        this.ADMACEPUSD = ADMACEPUSD;
    }

    public int getCANTADMRECH() {
        return CANTADMRECH;
    }

    public void setCANTADMRECH(int CANTADMRECH) {
        this.CANTADMRECH = CANTADMRECH;
    }

    public double getADMRECHUSD() {
        return ADMRECHUSD;
    }

    public void setADMRECHUSD(double ADMRECHUSD) {
        this.ADMRECHUSD = ADMRECHUSD;
    }

    public int getCANTADMREV() {
        return CANTADMREV;
    }

    public void setCANTADMREV(int CANTADMREV) {
        this.CANTADMREV = CANTADMREV;
    }

    public double getADMREVUSD() {
        return ADMREVUSD;
    }

    public void setADMREVUSD(double ADMREVUSD) {
        this.ADMREVUSD = ADMREVUSD;
    }

    public int getCANTADMENV() {
        return CANTADMENV;
    }

    public void setCANTADMENV(int CANTADMENV) {
        this.CANTADMENV = CANTADMENV;
    }

    public double getADMENVUSD() {
        return ADMENVUSD;
    }

    public void setADMENVUSD(double ADMENVUSD) {
        this.ADMENVUSD = ADMENVUSD;
    }

    public int getCANTBILLED() {
        return CANTBILLED;
    }

    public void setCANTBILLED(int CANTBILLED) {
        this.CANTBILLED = CANTBILLED;
    }

    public double getBILLEDUSD() {
        return BILLEDUSD;
    }

    public void setBILLEDUSD(double BILLEDUSD) {
        this.BILLEDUSD = BILLEDUSD;
    }

    public double getPEDIENTEQTY() {
        return PEDIENTEQTY;
    }

    public void setPEDIENTEQTY(double PEDIENTEQTY) {
        this.PEDIENTEQTY = PEDIENTEQTY;
    }

    public double getPEDIENTEPORC() {
        return PEDIENTEPORC;
    }

    public void setPEDIENTEPORC(double PEDIENTEPORC) {
        this.PEDIENTEPORC = PEDIENTEPORC;
    }

    public double getCLIENTEQTY() {
        return CLIENTEQTY;
    }

    public void setCLIENTEQTY(double CLIENTEQTY) {
        this.CLIENTEQTY = CLIENTEQTY;
    }

    public double getCLIENTEPORC() {
        return CLIENTEPORC;
    }

    public void setCLIENTEPORC(double CLIENTEPORC) {
        this.CLIENTEPORC = CLIENTEPORC;
    }

    public double getDESHABIQTY() {
        return DESHABIQTY;
    }

    public void setDESHABIQTY(double DESHABIQTY) {
        this.DESHABIQTY = DESHABIQTY;
    }

    public double getDESHABIPORC() {
        return DESHABIPORC;
    }

    public void setDESHABIPORC(double DESHABIPORC) {
        this.DESHABIPORC = DESHABIPORC;
    }

    public double getREJETQTY() {
        return REJETQTY;
    }

    public void setREJETQTY(double REJETQTY) {
        this.REJETQTY = REJETQTY;
    }

    public double getREJETPORC() {
        return REJETPORC;
    }

    public void setREJETPORC(double REJETPORC) {
        this.REJETPORC = REJETPORC;
    }

    public double getREAUTQTY() {
        return REAUTQTY;
    }

    public void setREAUTQTY(double REAUTQTY) {
        this.REAUTQTY = REAUTQTY;
    }

    public double getREAUTPORC() {
        return REAUTPORC;
    }

    public void setREAUTPORC(double REAUTPORC) {
        this.REAUTPORC = REAUTPORC;
    }

    public double getJUSTIQTY() {
        return JUSTIQTY;
    }

    public void setJUSTIQTY(double JUSTIQTY) {
        this.JUSTIQTY = JUSTIQTY;
    }

    public double getJUSTIPORC() {
        return JUSTIPORC;
    }

    public void setJUSTIPORC(double JUSTIPORC) {
        this.JUSTIPORC = JUSTIPORC;
    }

    public double getAUTHOQTY() {
        return AUTHOQTY;
    }

    public void setAUTHOQTY(double AUTHOQTY) {
        this.AUTHOQTY = AUTHOQTY;
    }

    public double getAUTHOPORC() {
        return AUTHOPORC;
    }

    public void setAUTHOPORC(double AUTHOPORC) {
        this.AUTHOPORC = AUTHOPORC;
    }

    public double getSUGGESTQTY() {
        return SUGGESTQTY;
    }

    public void setSUGGESTQTY(double SUGGESTQTY) {
        this.SUGGESTQTY = SUGGESTQTY;
    }

    public double getSUGGESTPORC() {
        return SUGGESTPORC;
    }

    public void setSUGGESTPORC(double SUGGESTPORC) {
        this.SUGGESTPORC = SUGGESTPORC;
    }

    public double getACCEPTQTY() {
        return ACCEPTQTY;
    }

    public void setACCEPTQTY(double ACCEPTQTY) {
        this.ACCEPTQTY = ACCEPTQTY;
    }

    public double getACCEPTPORC() {
        return ACCEPTPORC;
    }

    public void setACCEPTPORC(double ACCEPTPORC) {
        this.ACCEPTPORC = ACCEPTPORC;
    }

    public double getTOTAL() {
        return TOTAL;
    }

    public void setTOTAL(double TOTAL) {
        this.TOTAL = TOTAL;
    }

    public String getA1672RUTAF() {
        return A1672RUTAF;
    }

    public void setA1672RUTAF(String A1672RUTAF) {
        this.A1672RUTAF = A1672RUTAF;
    }

    public String getA1672NAMEF() {
        return A1672NAMEF;
    }

    public void setA1672NAMEF(String A1672NAMEF) {
        this.A1672NAMEF = A1672NAMEF;
    }

    public double getA1672PNTIV() {
        return A1672PNTIV;
    }

    public void setA1672PNTIV(double A1672PNTIV) {
        this.A1672PNTIV = A1672PNTIV;
    }

    public String getA1672CONXV() {
        return A1672CONXV;
    }

    public void setA1672CONXV(String A1672CONXV) {
        this.A1672CONXV = A1672CONXV;
    }

    public String getA1672MOTAI() {
        return A1672MOTAI;
    }

    public void setA1672MOTAI(String A1672MOTAI) {
        this.A1672MOTAI = A1672MOTAI;
    }

    public String getA1672MOEAI() {
        return A1672MOEAI;
    }

    public void setA1672MOEAI(String A1672MOEAI) {
        this.A1672MOEAI = A1672MOEAI;
    }

    public String getA1672DI() {
        return A1672DI;
    }

    public void setA1672DI(String A1672DI) {
        this.A1672DI = A1672DI;
    }

    public String getA1672FEMIO() {
        return A1672FEMIO;
    }

    public void setA1672FEMIO(String A1672FEMIO) {
        this.A1672FEMIO = A1672FEMIO;
    }

    public String getA1672IATAO() {
        return A1672IATAO;
    }

    public void setA1672IATAO(String A1672IATAO) {
        this.A1672IATAO = A1672IATAO;
    }

    public String getA1672CEMIO() {
        return A1672CEMIO;
    }

    public void setA1672CEMIO(String A1672CEMIO) {
        this.A1672CEMIO = A1672CEMIO;
    }

    public String getA1672CIAOR() {
        return A1672CIAOR;
    }

    public void setA1672CIAOR(String A1672CIAOR) {
        this.A1672CIAOR = A1672CIAOR;
    }

    public String getA1672FOROR() {
        return A1672FOROR;
    }

    public void setA1672FOROR(String A1672FOROR) {
        this.A1672FOROR = A1672FOROR;
    }

    public String getA1672SEROR() {
        return A1672SEROR;
    }

    public void setA1672SEROR(String A1672SEROR) {
        this.A1672SEROR = A1672SEROR;
    }

    public String getA1672QTYTK() {
        return A1672QTYTK;
    }

    public void setA1672QTYTK(String A1672QTYTK) {
        this.A1672QTYTK = A1672QTYTK;
    }

    public String getA1672DIVTA() {
        return A1672DIVTA;
    }

    public void setA1672DIVTA(String A1672DIVTA) {
        this.A1672DIVTA = A1672DIVTA;
    }

    public String getA1672FAREM() {
        return A1672FAREM;
    }

    public void setA1672FAREM(String A1672FAREM) {
        this.A1672FAREM = A1672FAREM;
    }

    public String getA1672EQVM() {
        return A1672EQVM;
    }

    public void setA1672EQVM(String A1672EQVM) {
        this.A1672EQVM = A1672EQVM;
    }

    public String getA1672MDAAD() {
        return A1672MDAAD;
    }

    public void setA1672MDAAD(String A1672MDAAD) {
        this.A1672MDAAD = A1672MDAAD;
    }

    public String getA1672FLAGP() {
        return A1672FLAGP;
    }

    public void setA1672FLAGP(String A1672FLAGP) {
        this.A1672FLAGP = A1672FLAGP;
    }

    public String getA1672FRESV() {
        return A1672FRESV;
    }

    public void setA1672FRESV(String A1672FRESV) {
        this.A1672FRESV = A1672FRESV;
    }

    public String getA1672MOTAU() {
        return A1672MOTAU;
    }

    public void setA1672MOTAU(String A1672MOTAU) {
        this.A1672MOTAU = A1672MOTAU;
    }

    public String getA1672MOEAU() {
        return A1672MOEAU;
    }

    public void setA1672MOEAU(String A1672MOEAU) {
        this.A1672MOEAU = A1672MOEAU;
    }

    public String getA1672RFIS() {
        return A1672RFIS;
    }

    public void setA1672RFIS(String A1672RFIS) {
        this.A1672RFIS = A1672RFIS;
    }

    public String getA1672RFICM() {
        return A1672RFICM;
    }

    public void setA1672RFICM(String A1672RFICM) {
        this.A1672RFICM = A1672RFICM;
    }

    public String getA1672CODWA() {
        return A1672CODWA;
    }

    public void setA1672CODWA(String A1672CODWA) {
        this.A1672CODWA = A1672CODWA;
    }

    public String getA1672CNX1() {
        return A1672CNX1;
    }

    public void setA1672CNX1(String A1672CNX1) {
        this.A1672CNX1 = A1672CNX1;
    }

    public String getA1672CNX2() {
        return A1672CNX2;
    }

    public void setA1672CNX2(String A1672CNX2) {
        this.A1672CNX2 = A1672CNX2;
    }

    public String getA1672CNX3() {
        return A1672CNX3;
    }

    public void setA1672CNX3(String A1672CNX3) {
        this.A1672CNX3 = A1672CNX3;
    }

    public String getA1672CNX4() {
        return A1672CNX4;
    }

    public void setA1672CNX4(String A1672CNX4) {
        this.A1672CNX4 = A1672CNX4;
    }

    public double getA1672QOVER() {
        return A1672QOVER;
    }

    public void setA1672QOVER(double A1672QOVER) {
        this.A1672QOVER = A1672QOVER;
    }

    public double getA1672YQORI() {
        return A1672YQORI;
    }

    public void setA1672YQORI(double A1672YQORI) {
        this.A1672YQORI = A1672YQORI;
    }

    public double getA1672TARAI() {
        return A1672TARAI;
    }

    public void setA1672TARAI(double A1672TARAI) {
        this.A1672TARAI = A1672TARAI;
    }

    public double getA1672EQVAI() {
        return A1672EQVAI;
    }

    public void setA1672EQVAI(double A1672EQVAI) {
        this.A1672EQVAI = A1672EQVAI;
    }

    public double getA1672YQPGM() {
        return A1672YQPGM;
    }

    public void setA1672YQPGM(double A1672YQPGM) {
        this.A1672YQPGM = A1672YQPGM;
    }

    public double getA1672YRPGM() {
        return A1672YRPGM;
    }

    public void setA1672YRPGM(double A1672YRPGM) {
        this.A1672YRPGM = A1672YRPGM;
    }

    public double getA1672PNTMI() {
        return A1672PNTMI;
    }

    public void setA1672PNTMI(double A1672PNTMI) {
        this.A1672PNTMI = A1672PNTMI;
    }

    public double getA1672EQVN() {
        return A1672EQVN;
    }

    public void setA1672EQVN(double A1672EQVN) {
        this.A1672EQVN = A1672EQVN;
    }

    public double getA1672BSR() {
        return A1672BSR;
    }

    public void setA1672BSR(double A1672BSR) {
        this.A1672BSR = A1672BSR;
    }

    public double getA1672TARAU() {
        return A1672TARAU;
    }

    public void setA1672TARAU(double A1672TARAU) {
        this.A1672TARAU = A1672TARAU;
    }

    public double getA1672EQVAU() {
        return A1672EQVAU;
    }

    public void setA1672EQVAU(double A1672EQVAU) {
        this.A1672EQVAU = A1672EQVAU;
    }

    public double getA1672SOVAI() {
        return A1672SOVAI;
    }

    public void setA1672SOVAI(double A1672SOVAI) {
        this.A1672SOVAI = A1672SOVAI;
    }

    public double getA1672CAMBIODIFE() {
        return A1672CAMBIODIFE;
    }

    public void setA1672CAMBIODIFE(double A1672CAMBIODIFE) {
        this.A1672CAMBIODIFE = A1672CAMBIODIFE;
    }

}
