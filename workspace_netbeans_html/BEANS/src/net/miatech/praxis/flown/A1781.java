/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.flown;

/**
 *
 * @author vhidalgo
 */
public  class A1781 {
   public String A1781ORIG = "";    // --3A COLHDG('CIUDAD Origen')   Para ubicar con Ciudad    
   public String A1781DEST = "";    // --3A COLHDG('CIUDAD Destino')  Para ubicar con Ciudad    
   public String A1781FVLO = "";    // --6A COLHDG('AAAAMM de Vuelo') SPACE=DEFAULT             
   public String A1781RBD  = "";    // --1A COLHDG('RBD') SPACE=DEFAULT             
   public String A1781DESDE = "";   // --6A COLHDG('AAAAMM CONT-Desde'
   public String A1781HASTA = "";   // --6A COLHDG('AAAAMM CONT-Hasta'
   public int A1781QCUPO = 0;       // --7S 0COLHDG('Cantidad Cupones')
   public double A1781TVALO = 0.00; // --13S 2COLHDG('Total Valor Venta')
   public double A1781PROME = 0.00; // --13S 2COLHDG('Valor Promedio')   
   public String A1781MONED = "";   // --3A  COLHDG('Moneda')           
   public double A1781PADUL = 0.00; // --5S 2 COLHDG('% Pago Adulto')    
   public double A1781PINFA = 0.00;   // --5S 2 COLHDG('% Pago Infante')   
   public double A1781PCHIL = 0;    // --5S 2 COLHDG('% Pago children') 
   
   public String A1781REGIS="";     //  10A  COLHDG('Registrado por')  
   public String A1781FREGI="";     //   8A  COLHDG('Fecha Registrado')
   public String A1781HREGI="";     //   6A  COLHDG('Hora  Registrado')
   public String A1781REVIS="";     //  10A  COLHDG('Revisado por') 
   public String A1781FREVI="";
   public String A1781HREVI="";
   
}
