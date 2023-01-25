/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2651;
/**
 *
 * @author andrea
 */
public class A2651Filter extends A2651 {
    
    public String IN_CCUST ="";
    public String IN_DATE_FROM ="";
    public String IN_DATE_TO ="";
    public String strFecha ="";
    public String strFecha2 ="";
    public String strTicket ="";
    public String strDescription ="";
    public String strDescription1 ="";
    public String IN_TICKET ="";
    public long IN_FREQPAXCODE = 0;
    public String IN_TPRED ="";
    public String IN_TCARR ="";
    public String strIN_TPRED ="";
    public String IN_TIPOTRX ="";
    public String IN_DOCTYPE ="";
    public String strIN_DOCTYPE ="";
    public String strIN_TIPOTRX ="";
    public String IN_DATE ="";
    public String IN_TIPOBOOK ="";
    public String IN_FARECLASS ="";
    public String strIN_TIPOBOOK ="";
    public String strIN_FARECLASS ="";
    public String strIN_TICKET ="";
    public String IN_A2651CAROP = "";
    public int totCUPO   =0;  
    public double totAFUS   =0;  
    public double totAUUS   =0;  
    public double totAMMX   =0;  
    public long totQKMK   =0;
    public double PLMUSD   =0; 
    public double PLMMXN   =0;
    public long PLMKMS   =0;
    public double SAVUSD   =0; 
    public double SAVMXN   =0; 
    public long SAVKMS   =0;
    public double ORIUSD   =0;
    public double ORIMXN   =0;
    public long ORIKMS   =0;
    public double totPLMUSD   =0; 
    public double totPLMMXN   =0;
    public long totPLMKMS   =0;
    public double totSAVUSD   =0; 
    public double totSAVMXN   =0; 
    public long totSAVKMS   =0;
    public double totORIUSD   =0;
    public double totORIMXN   =0;
    public long totORIKMS   =0;
    public long QTY1   =0;
    public long QTY2   =0;
    public long totQTY1   =0;
    public long totQTY2   =0;


    public double PLMAUUS = 0;
    public double PLMAFUS = 0;
    public double SAVAUUS = 0;
    public double SAVAFUS=0;
    public double ORIAUUS=0;
    public double ORIAFUS=0;
    public double totPLMAUUS = 0;
    public double totPLMAFUS = 0;
    public double totSAVAUUS = 0;
    public double totSAVAFUS=0;
    public double totORIAUUS=0;
    public double totORIAFUS=0;
    public Double AMUSD = 0.0;
    public Double FAREMXN = 0.0;
    public Double FAREUSD = 0.0;
    public Double FAREVMXN = 0.0;
    public Double FAREVUSD = 0.0;
    public long KMSPLM = 0;
    public String PREDTYPE = "";
    public String PXMATCH = "";
    public String PXSTATE = "";
    public String PXPROG = "";
    public String PXMESSAGE = "";
    public long QKMSPLM = 0;
    public String QTYPE = "";
    
    //SUMARIO
    public long SA2651KMS = 0;
    public Double SFAREUSD = 0.0;
    public Double SFAREMXN = 0.0;
    public Double SFAREVUSD = 0.0;
    public Double SFAREVMXN = 0.0;
    public long SA2651QKMK = 0;
    
    //FARE
    public Double SAMUSD = 0.0;
    
    //YQ
    public Double SYQUSD = 0.0;
    public Double SYQMXN = 0.0;
    
    public Double SA2651AMMX = 0.0;
    public int TKTQTY = 0;
    
    //REDEMPTION
    public String NOMBRE = "";
    public String PAIS = "";
    public String AGENCY1 = "";
    public String AGENCY2 = "";
    public String DATEEMI1 = "";
    public String DATEEMI2 = "";
    public String A2651FEMI2 = "";
    public String A2651TICK2 = "";
    public String A2651SEQ2 = "";
    public String A2651CDTRX2 = "";
    public String A2651NPNR2 = "";
    public String A2651IATA2 = "";
    public String FLIGHT = "";
    public String IN_A2651CDTRX = "";
    public String IN_FFLIGTH = "";
    public String NBR = "";
    public String AIR_CODE = "";
    public String CARR = "";
    public String DFLIGHT = "";
    public String NFLIGHT = "";
    public String IN_A2651ZONFL = "";
    public String IN_A2651SEQ = "";
    
    //Conjunction
    public String TKT_CONJ = "";
    
    //PAGINACION 
    public long RN   =0; 
    public Pagination page = new Pagination();
}
