/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.A720;

/**
 *
 * @author JRM
 */
public class SQP01064Filter extends A720 {
   
            public String FUENT = "";
	    public String SUBFU  = "";
	    public String NAGENTE  = "";
	    public String CODAGTE  = "";
	    public String ITIREN  = "";
	    public String CFOP  = "";
	    public String TTARJ  = "";
    	    public String NTARJ  = "";

	    public String MDAUSD  = "";
	    public String MDAMXN  = "";
	    public String MDACOP  = "";
	    public String CIAOLD  = "";
	    public String FORMAOLD  = "";
	    public String SERIEOLD  = "";

	    public Double FAREUSD = 0.0;
	    public Double FARECOP = 0.0;
	    public Double FAREMXN  = 0.0;
	    public Double TTAX = 0.0;
            public Double TOTAL  = 0.0;
            public Double COMMIS = 0.0;
            public Integer TOTREGIS = 0;
            
            // ADD 
            public String FPROC = "";
	    public String FUENTVTA  = "";
	    public String SUBFUVTA  = "";
	    public String AGENTVTA   = "";
            public String NAGENTVTA  = "";
            
            public String CUPON1 = "";
            public String CUPON2 = "";
            public String CUPON3 = "";
            public String CUPON4 = "";
            public String NLOTE = "";
            public String FOPOLD = "";
            
            public double TOCA1 = 0;
            public double TOCA2 = 0;
            public double TOCA3 = 0;
            public double TOCA4 = 0;
            public double CARGO = 0;
            public double IVA = 0;
            public double NETO = 0;
            public String VL_MENSAJE  = "";
            
                    
            	    	    
    public String DATEFROM = "";
    public String DATETO = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
