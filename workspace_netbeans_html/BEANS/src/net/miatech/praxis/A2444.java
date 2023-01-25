/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

/**
 *
 * @author lremicio
 */
public class A2444 {
    public String A2444CCUST = ""; //    3A         COLHDG('CLIENTE')          
    public String A2444IATA = ""; //    8A         COLHDG('IATA_CODE')        
    public String A2444LOTE = ""; //   20A         COLHDG('ID_LOTE_PREFACT')
    public String A2444FUENT = ""; //    3A         COLHDG('Fuente') BSP/ARC/ASR/MAN            
    public String A2444SFUEN = ""; //    3A         COLHDG('Sub Fuente')CTO/ATO/WEB/GSA/RES/AGV    
    public String A2444TFUEN = ""; //    3A         COLHDG('Tipo Sub_Fuente')  CTO/ATO/WEB/GSA/FRA/RES/INP ROB/AMP                        
    public String A2444FINI = ""; //    8A         COLHDG('FECHA_INICIAL')    
    public String A2444FFIN = ""; //    8A         COLHDG('FECHA_FINAL')      
    public String A2444STAT = ""; //    1A         COLHDG('STATUS') 0=PENDIENTE DE ENVIO 1=ENVIADO A IATA           
    public String A2444UENV = ""; //   10A         COLHDG('USR_ENVIO A IATA') 
    public String A2444FENV = ""; //    8A         COLHDG('FECH_ENVIO A IATA')
    public String A2444HENV = ""; //    6A         COLHDG('HOTA_ENVIO A IATA')
    public String A2444STRC = "";
    public String A2444UREC = "";
    public String A2444FREC = "";
    public String A2444HREC = "";
    public String A2444MDALC = "";
    public double A2444TCAMB = 0.00; //   13S 6       COLHDG('TIPO CAMBIO')
    public String A2444MDARV ="";
    public double A2444TCOM = 0.00; //   13S 2       COLHDG('TOTAL COMISION')  
    public double A2444TIVA = 0.00; //   13S 2       COLHDG('TOTAL IVA     ')  
    public double A2444TCOMI = 0.00; //   13S 2       COLHDG('MONTO COMM + IVA')
    public double A2444TTCAS = 0.00; //   13S 2       COLHDG('TOTAL CASH')
    public double A2444TCAMC = 0.00; //   13S 2       COLHDG('MONTO CASH - COM')
    public double A2444FARE = 0.00;
    public double A2444OTHCH = 0.00;
    public double A2444BANKC = 0.00;
    public double A2444OTHBK = 0.00;
    public double A2444IVA16 = 0.00;
    public double A2444OBK16 = 0.00;
    public String A2444OBSER = "";
    public String A2444REGIS = ""; //   10A         COLHDG('Ingresado por')
    public String A2444FREGI = ""; //    8A         COLHDG('Fecha Ingreso')
    public String A2444HREGI = ""; //    6A         COLHDG('Hora  Ingreso')
    public String A2444REVIS = ""; //   10A         COLHDG('Modificado  por')
    public String A2444FREVI = ""; //    8A         COLHDG('Fecha Modificac.')
    public String A2444HREVI = ""; //    6A         COLHDG('Hora  Modific.')
    public String A2444FACUS = ""; //     8         COLHDG('FECHA ACUSE RECIBO') 
    public String A2444HACUS = ""; //     6         COLHDG('HORA ACUSE RECIBO') 
    
}
