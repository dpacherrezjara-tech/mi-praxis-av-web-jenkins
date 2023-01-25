/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

/**
 *
 * @author jtorres
 */
public class PXF700 {
    
    public String CCUST = "";
    public String ISOC = "";
    public String BSPI = "";
    public String HRED = "";
    public String PRDA = "";
    public String PDAI = "";
    public String PBAED = "";
    public String STVAL = "";
    public String FTE = "";
    //REG-24                       
    public String TDNR = "";
    public String TOUR = "";
    public String TRNC = "";
    public String CJCP = "";
    public String AGTN = "";
    public String DAIS = "";
    public String DYRI = ""; 
    public String CPUI = "";
    public double TTAX = 0;
    public double TCOMIS = 0;
    public double TNETR = 0;
    //REG-30
    public double NTFA=0;
    public double COBL=0;
    //REG-30 SOLO TAX MX/XO
    public String TMFT1 = "";
    public double TMFA1=0;
    public String TMFT2 = "";
    public double TMFA2=0;
    public double RATE=0;
    // REG-30 SOLO TAX CP/RFND (PENALIDAD) 
    public String TMFTCP = "";
    public double TMFACP=0;
    public double TMFA=0;
    //REG - 39
    public double COAM=0;
    public double EFRT=0;
    public double EFCO=0;
    public double SPAM=0;
    public String CUTP = "";
    //REG-64
    public String CUTPF = "";
    public double FARE=0;
    public String CUTPE = "";
    public double EQFR=0;
    //REG-84 ORIGINIAL
    public double FPAMCA=0;
    public double FPAMCC=0;
    public double FPAMOT=0;
    // REG-84   MXN MONTOS EN MONEDA LOCAL
    public double FPAMCAM=0;
    public double FPAMCCM=0;
    public double FPAMOTM=0;
    public double REMTA=0;
    public double TCAMB=0;
    public long QCANJ=0;
    //DATOS PARA LA TNU  MONTOS MONEDA LOCAL (MXN)
    public double TOTPAY=0;
    public double FARELOC=0;
    public String A1345FEXCH="";
    public String A720STAT="";
    public String CPUIFIN="";
    public double A720TRFPAG=0;
    //DATOS DEL CANJE
    public double A730TRFP12=0;
    public int QCPNC12=0;
    public double A730TRFP13=0;
    public int QCPNC13=0;
    // DATOS DEL REFUND                                
    //DATOS DEL REFUND INCLUYE EL TKT-REAL DE REFUND  
    //SI ES CANJE      INCLUYE EL TKT-REAL DE EXCANGE 
    public String RTDN="";      
    public int QCPNR12=0;   
    public double AMOUREFP12=0;
    public int QCPNR13 =0;
    public double AMOUREFP13=0;
    public double AMOUREFS =0; 
    //DATOS DEL INTERLINE           
    public int QCPNINT12=0;
    public double AMOUINT12=0;
    public int QCPNINT13=0;
    public double AMOUINT13=0;
    //DATOS DEL LIFTED              
    public int QCPNLIF=0;
    public double AMOULIF=0;
    //DATA  AUDIT - CREATE - UPDATE      
    public String USCR="";       
    public String FECR="";     
    public String HOCR="";     
    public String USUP="";    
    public String FEUP="";      
    public String HOUP="";      
    
    
    //Variables adicionales
    public int pos = 0;
    public String nombre = "";
    public String periodo = "";
    public String formatDate = "";
    public String FPAGO = "";
    public double TTMFA=0;
    
}
