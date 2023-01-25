/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

/**
 *
 * @author vhidalgo
 */
public class A1728 {
    public String A1728CCUST = ""; //    3A         COLHDG('CLIENTE')          
    public String A1728IATA = ""; //    8A         COLHDG('IATA_CODE')        
    public String A1728LOTE = ""; //   20A         COLHDG('ID_LOTE_PREFACT')
    public String A1728FUENT = ""; //    3A         COLHDG('Fuente') BSP/ARC/ASR/MAN            
    public String A1728SFUEN = ""; //    3A         COLHDG('Sub Fuente')CTO/ATO/WEB/GSA/RES/AGV    
    public String A1728TFUEN = ""; //    3A         COLHDG('Tipo Sub_Fuente')  CTO/ATO/WEB/GSA/FRA/RES/INP ROB/AMP                        
    public String A1728FINI = ""; //    8A         COLHDG('FECHA_INICIAL')    
    public String A1728FFIN = ""; //    8A         COLHDG('FECHA_FINAL')      
    public String A1728STAT = ""; //    1A         COLHDG('STATUS') 0=PENDIENTE DE ENVIO 1=ENVIADO A IATA           
    public String A1728UENV = ""; //   10A         COLHDG('USR_ENVIO A IATA') 
    public String A1728FENV = ""; //    8A         COLHDG('FECH_ENVIO A IATA')
    public String A1728HENV = ""; //    6A         COLHDG('HOTA_ENVIO A IATA')
    public String A1728STRC = "";
    public String A1728UREC = "";
    public String A1728FREC = "";
    public String A1728HREC = "";
    public String A1728MDALC = "";
    public double A1728TCAMB = 0.00; //   13S 6       COLHDG('TIPO CAMBIO')
    public String A1728MDARV ="";
    public double A1728TCOM = 0.00; //   13S 2       COLHDG('TOTAL COMISION')  
    public double A1728TIVA = 0.00; //   13S 2       COLHDG('TOTAL IVA     ')  
    public double A1728TCOMI = 0.00; //   13S 2       COLHDG('MONTO COMM + IVA')
    public double A1728TTCAS = 0.00; //   13S 2       COLHDG('TOTAL CASH')
    public double A1728TCAMC = 0.00; //   13S 2       COLHDG('MONTO CASH - COM')
    public double A1728FARE = 0.00;
    public String A1728OBSER = "";
    public String A1728REGIS = ""; //   10A         COLHDG('Ingresado por')
    public String A1728FREGI = ""; //    8A         COLHDG('Fecha Ingreso')
    public String A1728HREGI = ""; //    6A         COLHDG('Hora  Ingreso')
    public String A1728REVIS = ""; //   10A         COLHDG('Modificado  por')
    public String A1728FREVI = ""; //    8A         COLHDG('Fecha Modificac.')
    public String A1728HREVI = ""; //    6A         COLHDG('Hora  Modific.')
    public String A1728FACUS = ""; //     8         COLHDG('FECHA ACUSE RECIBO') 
    public String A1728HACUS = ""; //     6         COLHDG('HORA ACUSE RECIBO') 
    public String A1728INSTR = "";
    public String A1728REFER = "";
    
    //Fechas de vigencia
    public String A1728FVIGI = "";
    public String A1728HVIGI = "";
    public String A1728FVIGF = "";
    public String A1728HVIGF = "";
}
