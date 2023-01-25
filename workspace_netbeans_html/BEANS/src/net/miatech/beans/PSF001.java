/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.beans.lists.PSF002List;

/**
 *
 * @author claudia
 */
public class PSF001 implements Serializable {

    private String strCCUST;
    private String strSGUIA;
    private String strNGUIA;
    private String strTDOC;
    private String strSTVAL;
    private String strDSEND;
    private String strAGENTE;
    private String strDESCRI;
    private String strREMITE;
    private String strDRECEI;
    private String strCITY;
    private String strDSUPER;
    private String strASUPER;
    private String strFILENAME;
    private String strFECL;
    private String strPROCEID;
    private String strSTATU;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSUP;
    private String strFEUP;
    private String strHOUP;
    private String strFINVOICE;
    private String strINVOICE;
    private String strMsgError;
    private String strCampoErroneo;
    private String strEstiloDSEND;
    private String strEstiloDSUPER;
    private String strBoxId;
    private long lngQBOX;
    private long lngQPAC;
    private long lngQDOC;
    private long lngQBOXR;
    private long lngQPACR;
    private long lngQDOCR;
    private long lngQtyDaysDSEND;
    private long lngQtyDaysDSUPER;
    private long lngTimeDSEND;
    private long lngTimeDRECEI;
    //Campos de Filtro ***************    
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    private String strRutaBack;
    private String[] lstStrOpciones;
    private String strEstadoCampRec;
    private PSF002List lstBoxes;
    //Campos del Agente (PSF009)******
    private String strAgentName;
    private String strContact;
    private String strAddress;
    private String strAgentCity;
    private String strPhone;

    public PSF001() {

        strCCUST = "";
        strSGUIA = "";
        strNGUIA = "";
        strTDOC = "";
        strSTVAL = "";
        strDSEND = "";
        strAGENTE = "057";
        strDESCRI = "";
        strREMITE = "Air France";
        strDRECEI = "";
        strCITY = "";
        strDSUPER = "";
        strASUPER = "";
        strFILENAME = "";
        strFECL = "";
        strPROCEID = "";
        strSTATU = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSUP = "";
        strFEUP = "";
        strHOUP = "";
        strFINVOICE = "";
        strINVOICE = "";
        strMsgError = "";
        strCampoErroneo = "";
        strEstiloDSEND = "clsTextDarkBlue";
        strEstiloDSUPER = "clsTextDarkBlue";
        lngQBOX = 0;
        lngQPAC = 0;
        lngQDOC = 0;
        lngQBOXR = 0;
        lngQPACR = 0;
        lngQDOCR = 0;
        lngQtyDaysDSEND = 0;
        lngQtyDaysDSUPER = 0;
        lngTimeDSEND = 0;
        lngTimeDRECEI = 0;
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strRutaBack = "/PASSUS/MenuServlet?page=7"; //"/PASSUS/MenuServlet?page=1";
        lstStrOpciones = new String[1];
        lstStrOpciones[0] = "1Save";
        strEstadoCampRec = "disabled";
        lstBoxes = new PSF002List();
        strAgentName = "Compagnie Nationale Air France";
        strContact = "Mr. Bégué Frédéric";
        strAddress = "4 Impasse Paul Mesple, BP 1355";
        strAgentCity = "TLS";
        strPhone = "";
        strBoxId = "";

    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrSGUIA() {
        return strSGUIA;
    }

    public void setStrSGUIA(String strSGUIA) {
        this.strSGUIA = strSGUIA;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }

    public String getStrSTVAL() {
        return strSTVAL;
    }

    public void setStrSTVAL(String strSTVAL) {
        this.strSTVAL = strSTVAL;
    }

    public String getStrDSEND() {
        return strDSEND;
    }

    public void setStrDSEND(String strDSEND) {
        this.strDSEND = strDSEND;
    }

    public String getStrDESCRI() {
        return strDESCRI;
    }

    public void setStrDESCRI(String strDESCRI) {
        this.strDESCRI = strDESCRI;
    }

    public String getStrREMITE() {
        return strREMITE;
    }

    public void setStrREMITE(String strREMITE) {
        this.strREMITE = strREMITE;
    }

    public String getStrDRECEI() {
        return strDRECEI;
    }

    public void setStrDRECEI(String strDRECEI) {
        this.strDRECEI = strDRECEI;
    }

    public String getStrCITY() {
        return strCITY;
    }

    public void setStrCITY(String strCITY) {
        this.strCITY = strCITY;
    }

    public String getStrDSUPER() {
        return strDSUPER;
    }

    public void setStrDSUPER(String strDSUPER) {
        this.strDSUPER = strDSUPER;
    }

    public String getStrASUPER() {
        return strASUPER;
    }

    public void setStrASUPER(String strASUPER) {
        this.strASUPER = strASUPER;
    }

    public String getStrFILENAME() {
        return strFILENAME;
    }

    public void setStrFILENAME(String strFILENAME) {
        this.strFILENAME = strFILENAME;
    }

    public String getStrFECL() {
        return strFECL;
    }

    public void setStrFECL(String strFECL) {
        this.strFECL = strFECL;
    }

    public String getStrUSCR() {
        return strUSCR;
    }

    public void setStrUSCR(String strUSCR) {
        this.strUSCR = strUSCR;
    }

    public String getStrFECR() {
        return strFECR;
    }

    public void setStrFECR(String strFECR) {
        this.strFECR = strFECR;
    }

    public String getStrHOCR() {
        return strHOCR;
    }

    public void setStrHOCR(String strHOCR) {
        this.strHOCR = strHOCR;
    }

    public String getStrUSUP() {
        return strUSUP;
    }

    public void setStrUSUP(String strUSUP) {
        this.strUSUP = strUSUP;
    }

    public String getStrFEUP() {
        return strFEUP;
    }

    public void setStrFEUP(String strFEUP) {
        this.strFEUP = strFEUP;
    }

    public String getStrHOUP() {
        return strHOUP;
    }

    public void setStrHOUP(String strHOUP) {
        this.strHOUP = strHOUP;
    }

    public String getStrMsgError() {
        return strMsgError;
    }

    public void setStrMsgError(String strMsgError) {
        this.strMsgError = strMsgError;
    }

    public String getStrCampoErroneo() {
        return strCampoErroneo;
    }

    public void setStrCampoErroneo(String strCampoErroneo) {
        this.strCampoErroneo = strCampoErroneo;
    }
    
    public String getStrYearFrom() {
        return this.strYearFrom;
    }

    public long getLngQBOX() {
        return lngQBOX;
    }

    public void setLngQBOX(long lngQBOX) {
        this.lngQBOX = lngQBOX;
    }

    public long getLngQPAC() {
        return lngQPAC;
    }

    public void setLngQPAC(long lngQPAC) {
        this.lngQPAC = lngQPAC;
    }

    public long getLngQDOC() {
        return lngQDOC;
    }

    public void setLngQDOC(long lngQDOC) {
        this.lngQDOC = lngQDOC;
    }

    public long getLngQBOXR() {
        return lngQBOXR;
    }

    public void setLngQBOXR(long lngQBOXR) {
        this.lngQBOXR = lngQBOXR;
    }

    public long getLngQPACR() {
        return lngQPACR;
    }

    public void setLngQPACR(long lngQPACR) {
        this.lngQPACR = lngQPACR;
    }

    public long getLngQDOCR() {
        return lngQDOCR;
    }

    public void setLngQDOCR(long lngQDOCR) {
        this.lngQDOCR = lngQDOCR;
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
    

    public String getStrRutaBack() {
        return this.strRutaBack;
    }

    public void setStrRutaBack(String strRutaBack) {
        this.strRutaBack = strRutaBack;
    }
    

    public String[] getLstStrOpciones() {
        return this.lstStrOpciones;
    }

    public void setLstStrOpciones(String[] lstStrOpciones) {
        this.lstStrOpciones = lstStrOpciones;
    }
    

    public String getStrEstadoCampRec() {
        return this.strEstadoCampRec;
    }

    public void setStrEstadoCampRec(String strEstadoCampRec) {
        this.strEstadoCampRec = strEstadoCampRec;
    }
    

    public PSF002List getLstBoxes() {
        return this.lstBoxes;
    }

    public void setLstBoxes(PSF002List lstBoxes) {
        this.lstBoxes = lstBoxes;
    }
    
    public String getStrAgentName() {
        return strAgentName;
    }

    public void setStrAgentName(String strAgentName) {
        this.strAgentName = strAgentName;
    }

    public String getStrContact() {
        return strContact;
    }

    public void setStrContact(String strContact) {
        this.strContact = strContact;
    }

    public String getStrAddress() {
        return strAddress;
    }

    public void setStrAddress(String strAddress) {
        this.strAddress = strAddress;
    }

    public String getStrAgentCity() {
        return strAgentCity;
    }

    public void setStrAgentCity(String strAgentCity) {
        this.strAgentCity = strAgentCity;
    }

    public String getStrPhone() {
        return strPhone;
    }

    public void setStrPhone(String strPhone) {
        this.strPhone = strPhone;
    }

    public String getStrAGENTE() {
        return strAGENTE;
    }

    public void setStrAGENTE(String strAGENTE) {
        this.strAGENTE = strAGENTE;
    }

    public String getStrPROCEID() {
        return strPROCEID;
    }

    public void setStrPROCEID(String strPROCEID) {
        this.strPROCEID = strPROCEID;
    }

    public String getStrSTATU() {
        return strSTATU;
    }

    public void setStrSTATU(String strSTATU) {
        this.strSTATU = strSTATU;
    }

    public long getLngQtyDaysDSEND() {
        return lngQtyDaysDSEND;
    }

    public void setLngQtyDaysDSEND(long lngQtyDaysDSEND) {
        this.lngQtyDaysDSEND = lngQtyDaysDSEND;
    }

    public long getLngQtyDaysDSUPER() {
        return lngQtyDaysDSUPER;
    }

    public void setLngQtyDaysDSUPER(long lngQtyDaysDSUPER) {
        this.lngQtyDaysDSUPER = lngQtyDaysDSUPER;
    }

    public String getStrEstiloDSEND() {
        return strEstiloDSEND;
    }

    public void setStrEstiloDSEND(String strEstiloDSEND) {
        this.strEstiloDSEND = strEstiloDSEND;
    }

    public String getStrEstiloDSUPER() {
        return strEstiloDSUPER;
    }

    public void setStrEstiloDSUPER(String strEstiloDSUPER) {
        this.strEstiloDSUPER = strEstiloDSUPER;
    }

    public long getLngTimeDSEND() {
        return lngTimeDSEND;
    }

    public void setLngTimeDSEND(long lngTimeDSEND) {
        this.lngTimeDSEND = lngTimeDSEND;
    }

    public long getLngTimeDRECEI() {
        return lngTimeDRECEI;
    }

    public void setLngTimeDRECEI(long lngTimeDRECEI) {
        this.lngTimeDRECEI = lngTimeDRECEI;
    }

    public String getStrFINVOICE() {
        return strFINVOICE;
    }

    public void setStrFINVOICE(String strFINVOICE) {
        this.strFINVOICE = strFINVOICE;
    }

    public String getStrINVOICE() {
        return strINVOICE;
    }

    public void setStrINVOICE(String strINVOICE) {
        this.strINVOICE = strINVOICE;
    }

    public String getStrBoxId() {
        return strBoxId;
    }

    public void setStrBoxId(String strBoxId) {
        this.strBoxId = strBoxId;
    }
    
    
    
}
