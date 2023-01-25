/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2789;

/**
 *
 * @author jtorres
 */
public class A2789Filter  extends A2789{
    

        public String IN_TIPOFECHA="";
        public String IN_FECHA_FROM="";
        public String IN_FECHA_TO="";

        public String FECHA="";
        public String strTicket = "";
        public String strDescription="";
        public String strDescription1="";
        public String strDescription2="";
        public String strDescription3="";
        public String strDescription4="";
        public String strFormatDate="";
        public String strFormatDate1="";
        public String strFormatDate2="";
        public String strFormatDate3="";
        public String strFormatDate4="";

        public double TOTAL= 0 ;

        //Totales 

        public double totTOTAL= 0 ;  
        public double totSVFOP= 0 ;    
        public double totFAREREV= 0 ;     
        public double totRVFOP= 0 ;      
        public double totTOTDAY= 0 ;       
        
        public double diffAmount = 0;      
	public int diffDate = 0;    
	public String strDescriTar = "";
	public String strDescriTarCod = "";
        public double totdiffAmount = 0;      	
        public long RN= 0 ;

        public Pagination page = new Pagination();
    
}
