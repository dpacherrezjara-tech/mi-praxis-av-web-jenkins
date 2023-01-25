/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1691;

/**
 *
 * @author claudia
 */
public class A1691Filter extends A1691 {
    
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strTitulo = "";
    public String strDescripcion = "";
    public String strFCLOFO = "";
     public String strDesFCLOFO = "";
    public String strFormatFSENDSS = "";
    public String strFormatFSENDOD = "";
    public String strFormatFSENDVC = "";
    public String strDescripcionCDEPART = "";
    public String strDescripcionCARRIVA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FUENTE = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String IN_CARRIER = "";
    public String IN_CURRENCY = "";
    public String IN_NFLIGHT = "";
    public int IN_TIPOFECHA = 0;
    public String strDescCDEPART = "";
    public String strDescCARRIVA = "";
    public String strDescFFLOW = "";
    public String strSQL = "";
    public long RN  = 0;
    
    public String FPROC   = "";
    public String TDOC   = ""; 
    public String STAT  = "";  
    public int TOTACU  = 0;
    public int TOTDIA  = 0;
    public int TOTFIN  = 0;
    public int TOTREG  = 0;
    public int TOTFAL  = 0;
    public String COMENT="";
    public String strCliente = "";
    public String strFecha = "";
    public long lngQDIFF = 0;
    public long lngQPRO = 0;
    public long lngQCLO = 0;
    public long lngQACC = 0;
    public long lngQSSIM = 0;
    public long lngQODS = 0;
    public long lngQtyCANCEL = 0;
    public long lngQVCR = 0;
    public long lngQSVOPRO = 0; //Cantidad de SSIM vs ODS Procesados
    public long lngQSVOPEND = 0; //Cantidad de SSIM vs ODS Pendientes
    public long lngQSVVPRO = 0; // Cantidad de SSIM vs VCR Procesados
    public long lngQSVVPEND = 0; // Cantidad de SSIM vs VCR Pendientes
    public long lngQPHY = 0; // Cantidad de Vuelos Físicos
    public long lngQCPNVC_C = 0;//Suma de Cupones VCR con Estado Contabilizado Cerrado
    public long lngQCPNVAL_C = 0;//Suma de Cupones Valorizados con Estado Contabilizado Cerrado
    public long lngQCPNVC_P = 0;//Suma de Cupones VCR con Estado Contabilizado Pendiente
    public long lngQCPNVAL_P = 0;//Suma de Cupones Valorizados con Estado Contabilizado Pendiente
    public long lngQFFLOW = 0;//Suma de Vuelos Operados No Programados
   
    public long totQCPNOD = 0;
    public long totQCPNVC = 0;
    public long totQCPNOCR = 0;
    public long totQCPNMA = 0;
    public long totQCPNTOT = 0;
    public long totQCPAD = 0;
    public long totQCPCHD = 0;
    public long totQCPINF = 0;
    public long totQCPTRA = 0;
    public int totQCPNFI = 0;
    public long totQCPNVAL = 0;
    public long totQCPCON = 0;
    public long totQCPNCON = 0;
    public double totVCPNUSD = 0;
    public double totVCPNLOC = 0;
    
    public long totQCPNOAL = 0;
    public long totQCPNON = 0;
    public long totlngQDIFF = 0;
 
    public double A1791VALOR = 0;
    public double A1791ORAV = 0;
    public double totDiff = 0;
    public double totPRAXIS = 0;
    public double totORACLE = 0;
    public String strNOMFILE = "";
    public String NOMFILE = "";
    
    public String A3778STVAL = "";
    public String A3778USCR = "";
    public String A3778FECR = "";
    public String A3778HOCR = "";
    public String A1688USCR = "";
    public String A1688FECR = "";
    public String A1688HOCR = "";
    public long PAXTOTAL = 0;
    public long totPAXTOTAL = 0;
    
    public long totLngQPHY=0;
    public long totLngQCLO=0;
    public long totLngQPRO=0;
    public double totA1791ORAV=0;
    public long totLngQDIFF=0;
    public long totLngQACC=0;   
    
    public String strTipo = "";
    public String FLAGLEG = "";
    
 
  
    public Pagination page = new Pagination();
    
}
