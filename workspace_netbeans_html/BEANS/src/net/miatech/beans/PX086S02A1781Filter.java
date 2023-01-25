/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 */
public class PX086S02A1781Filter {
    // in
   public String VP_ACTION ="";
   public String VP_A1781ORIG =""; //  COLHDG('CIUDAD Origen')   Para ubicar con Ciudad    
   public String VP_A1781DEST =""; //  COLHDG('CIUDAD Destino')  Para ubicar con Ciudad    
   public String VP_A1781FVLO =""; //  COLHDG('AAAAMM de Vuelo') SPACE=DEFAULT             
   public String VP_A1781RBD  =""; //  COLHDG('RBD') SPACE=DEFAULT             
   public String VP_A1781DESDE =""; // COLHDG('AAAAMM CONT-Desde'
   public String VP_A1781HASTA =""; // COLHDG('AAAAMM CONT-Hasta'
   public int VP_A1781QCUPO =0;    //  COLHDG('Cantidad Cupones')
   public double VP_A1781TVALO =0;  // COLHDG('Total Valor Venta')
   public double VP_A1781PROME =0; //  COLHDG('Valor Promedio')   
   public String VP_A1781MONED =""; // COLHDG('Moneda')           
   public double VP_A1781PADUL =0; //  COLHDG('% Pago Adulto')    
   public double VP_A1781PINFA = 0; // COLHDG('% Pago Infante')   
   public double VP_A1781PCHIL =0.0; //COLHDG('% Pago children')   
   // out
   public DBException dbException = new DBException();
}
