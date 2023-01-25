package net.miatech.beans;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.lists.RECA729List;

/**
 *
 * @author claudia
 */
public class RECA1199 implements Serializable {
    
    
    /** Creates a new instance of RECA1199 */
    
    
    private String strAirline;
    private String strCCUST;
    private String strDATE; 
    private String strInvoice;
    private String strAirlineName;
    private String strGroup;
    private String strClearingDate;
    private String strAlfaNumerico;
    private String strIndSPA;
    private String strStatus;
    private List<RECA021> lstComentarios;
    private String strCurrenp;
    private String strUse;
    private String strCCIA;
    private String strA020GRUPO;
    private String strFCLEAR;
    private String strA020FRECHA;
    private String strA020CLASRM;
    private String strA020AIRLI3;
    private String strA005CHS;
    private double dblMontoMinTarifa;
    private double dblMontoMinTax;
    private String strA020KEY;
    private String strA729CODTAX;
    private String strA729TAXRES;
    private RECA729List stRECA729List;
    private String strA020NROPRT;
    private int intRegis;
    private String msgBox;
    private String strCURRENC;
    private long lngQCUPON;
    private long lngICUPON;
    private long lngPCUPON;
    private double dblTCFACT;
    private double dblTCSIST;
    private String strPERMONT;
    
    public RECA1199() {

        strAirline = "";
        strCCUST = "";
        strDATE = "";
        strInvoice = "";
        strAirlineName = "";
        strGroup = "";
        strClearingDate = "";
        strAlfaNumerico = "";
        strIndSPA = "";
        strStatus = "";
        lstComentarios = new ArrayList<RECA021>();
        strCurrenp = "";
        strUse = "";
        strCCIA = "";
        strA020GRUPO = "";
        strFCLEAR = "";
        strA020FRECHA = "";
        strA020CLASRM = "";
        strA020AIRLI3 = "";
        strA005CHS = "";
        dblMontoMinTarifa = 0;
        dblMontoMinTax = 0;
        strA020KEY = "";
        strA729CODTAX = "";
        strA729TAXRES = "";
        stRECA729List = new RECA729List();
        strA020NROPRT = "";
        intRegis = 0;
        msgBox = "";
        strCURRENC = "";
        lngQCUPON = 0;
        lngICUPON = 0;
        lngPCUPON = 0;
        dblTCFACT = 0;
        dblTCSIST = 0;
        strPERMONT = "";

    }
    
    
     
    public String getStrAirline(){
        return this.strAirline;
    }

    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }


    public String getStrCCUST() {
        return this.strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }


    public String getStrDATE() {
        return this.strDATE;
    }

    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
    }

    
    public String getStrInvoice() {
        return this.strInvoice;
    }

    public void setStrInvoice(String strInvoice) {
        this.strInvoice = strInvoice;
    }

    
    public String getStrAirlineName() {
        return this.strAirlineName;
    }

    public void setStrAirlineName(String strAirlineName) {
        this.strAirlineName = strAirlineName;
    }


    public String getStrClearingDate() {
        return this.strClearingDate;
    }

    public void setStrClearingDate(String strClearingDate) {
        this.strClearingDate = strClearingDate;
    }
    

    public String getStrAlfaNumerico() {
        return this.strAlfaNumerico;
    }

    public void setStrAlfaNumerico(String strAlfaNumerico) {
        this.strAlfaNumerico = strAlfaNumerico;
    }
    

    public String getStrIndSPA() {
        return this.strIndSPA;
    }

    public void setStrIndSPA(String strIndSPA) {
        this.strIndSPA = strIndSPA;
    }
    

    public String getStrStatus() {
        return this.strStatus;
    }

    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }
    

    public List<RECA021> getLstComentarios() {
        return this.lstComentarios;
    }

    public void setLstComentarios(List<RECA021> lstComentarios) {
        this.lstComentarios = lstComentarios;
    }
    
    
    public String getStrCurrenp() {
        return this.strCurrenp;
    }
   
    public void setStrCurrenp(String strCurrenp) {
        this.strCurrenp = strCurrenp;
    }
    
    
    public String getStrUse() {
        return this.strUse;
    }
   
    public void setStrUse(String strUse) {
        this.strUse = strUse;
    }
    

    public String getStrCCIA() {
        return this.strCCIA;
    }

    public void setStrCCIA(String CCIA) {
        this.strCCIA = CCIA;
    }
    

    public String getStrA020GRUPO() {
        return this.strA020GRUPO;
    }

    public void setStrA020GRUPO(String strA020GRUPO) {
        this.strA020GRUPO = strA020GRUPO;
    }
    

    public String getStrFCLEAR() {
        return this.strFCLEAR;
    }

    public void setStrFCLEAR(String strFCLEAR) {
        this.strFCLEAR = strFCLEAR;
    }
    

    public String getStrA020FRECHA() {
        return this.strA020FRECHA;
    }

    public void setStrA020FRECHA(String strA020FRECHA) {
        this.strA020FRECHA = strA020FRECHA;
    }
    

    public String getStrA020CLASRM() {
        return this.strA020CLASRM;
    }

    public void setStrA020CLASRM(String strA020CLASRM) {
        this.strA020CLASRM = strA020CLASRM;
    }
    
    
    public String getStrA020AIRLI3() {
        return this.strA020AIRLI3;
    }

    public void setStrA020AIRLI3(String strA020AIRLI3) {
        this.strA020AIRLI3 = strA020AIRLI3;
    }
    
    
    public String getStrA005CHS() {
        return this.strA005CHS;
    }
   
    public void setStrA005CHS(String A005CHS) {
        this.strA005CHS = A005CHS;
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
    

    public String getStrA020KEY() {
        return this.strA020KEY;
    }

    public void setStrA020KEY(String strA020KEY) {
        this.strA020KEY = strA020KEY;
    }
    

    public String getStrA729CODTAX() {
        return this.strA729CODTAX;
    }

    public void setStrA729CODTAX(String strA729CODTAX) {
        this.strA729CODTAX = strA729CODTAX;
    }
    

    public String getStrA729TAXRES() {
        return strA729TAXRES;
    }

    public void setStrA729TAXRES(String strA729TAXRES) {
        this.strA729TAXRES = strA729TAXRES;
    }
    

    public RECA729List getStRECA729List() {
        return this.stRECA729List;
    }

    public void setStRECA729List(RECA729List stRECA729List) {
        this.stRECA729List = stRECA729List;
    }
    

    public String getStrA020NROPRT() {
        return this.strA020NROPRT;
    }

    public void setStrA020NROPRT(String strA020NROPRT) {
        this.strA020NROPRT = strA020NROPRT;
    }
      

    public int getIntRegis() {
        return this.intRegis;
    }

    public void setIntRegis(int intRegis) {
        this.intRegis = intRegis;
    }
 

    public String getMsgBox() {
        return this.msgBox;
    }

    public void setMsgBox(String msgBox) {
        this.msgBox = msgBox;
    }
    

    public String getStrCURRENC() {
        return this.strCURRENC;
    }

    public void setStrCURRENC(String strCURRENC) {
        this.strCURRENC = strCURRENC;
    }
    

    public long getLngQCUPON() {
        return this.lngQCUPON;
    }

    public void setLngQCUPON(long lngQCUPON) {
        this.lngQCUPON = lngQCUPON;
    }
    

    public long getLngICUPON() {
        return this.lngICUPON;
    }

    public void setLngICUPON(long lngICUPON) {
        this.lngICUPON = lngICUPON;
    }
    

    public long getLngPCUPON() {
        return this.lngPCUPON;
    }

    public void setLngPCUPON(long lngPCUPON) {
        this.lngPCUPON = lngPCUPON;
    }

    public String getStrGroup() {
        return strGroup;
    }

    public void setStrGroup(String strGroup) {
        this.strGroup = strGroup;
    }

    public double getDblTCFACT() {
        return dblTCFACT;
    }

    public void setDblTCFACT(double dblTCFACT) {
        this.dblTCFACT = dblTCFACT;
    }

    public double getDblTCSIST() {
        return dblTCSIST;
    }

    public void setDblTCSIST(double dblTCSIST) {
        this.dblTCSIST = dblTCSIST;
    }

    /**
     * @return the strPERMONT
     */
    public String getStrPERMONT() {
        return strPERMONT;
    }

    /**
     * @param strPERMONT the strPERMONT to set
     */
    public void setStrPERMONT(String strPERMONT) {
        this.strPERMONT = strPERMONT;
    }

    
}
