/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.flown;

/**
 *
 * @author Jtorres
 */
public class A1688 extends ExtraFields{
        
        //ODS
        public String CCUST = "";
        public String CCIA = "";
        public String FORMA ="";
        public String SERIE ="";
        public String CUPON ="";
        public String DCHEQ ="";
        public String SEQ ="";
        public String FCONT ="";
		
        //INFORMATION FLIGHT     
        public String CDEPART = "";
        public String CARRIVA = "";
        public String NFLIGHT ="";
        public String DFLIGHT ="";
        public String NPLANE ="";
        public String FFLOW =""; 
                          
        //Datos de Ticket VTA(Detail) 
        public String CDOC = "";
        public String TDOC = "";
        public String PSVVTA ="";
        public String AGTIA ="";
        public String FVTA ="";
        public String TVTA ="";
                            
        //Datos de Cupon(Detail)   
        public String TOPUS = "";
        public String CARR = "";
        public String CABI ="";
        public String CLAS ="";
        public String FBASE ="";
        public String CFF ="";   
        
        public double VCPN=0;
        public String MDACP ="";  
        public double VCPMX=0;
        public double TCMUS=0;
        public double VCPUS=0;                 
                           
        public ExtraFields extrafields = new ExtraFields();
        
        //AUDITORIA
        public String  USCR ="";
        public String  FECR ="";
        public String  HOCR ="";
        public String  USUP ="";
        public String  FEUP ="";
        public String  HOUP ="";
}
