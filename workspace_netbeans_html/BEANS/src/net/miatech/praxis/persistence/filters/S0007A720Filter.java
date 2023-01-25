/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.ticket.A720;

/**
 *
 * @author lremicio
 */
public class S0007A720Filter extends A720 implements Serializable {
    
    public String vp_fuente = "";
    public String vp_ccust = "";
    public String TDNR = "";
    
    public String IN_AIRLIN = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String TICKET = "";
    public String CPUI = "";
    public int CUPON = 0;
    public String CONEX = "";
    public String ORIGEN = "";
    public String DESTINO = "";
    public String CARRIER = "";
    public String CLASE = "";
    public String FLIGHT = "";
    public String DFLIGHT = "";
    public String FAREBASIS = "";
    public String CPNCUR = "";
    public double CPN = 0.00;
    public String QCUR = "";
    public double Q = 0.00;
    public String YQCUR = "";
    public double YQ = 0.00;
    public double COMM_G = 0.00;
    public double SCOMM = 0.00;
    
    //EMD
    public String TKTEMD = "";
    public int CUPONEMD = 0;
    public String RFIC = "";
    public String RFIS = "";
    public double COST = 0.00;
    public String TKTCNX = "";
    public String CUPONCNX = "";
    public String EMD = "";
            
    //Totales
    public double FOP = 0.00;
    public double FOPRV = 0.00;
    public double FOPBAL = 0.00;
    public double TAX = 0.00;
    public double TAXRV = 0.00;
    public double COMM = 0.00;
    public double COMMRV = 0.00;
    public double TAXCOMM = 0.00;
    public double TAXCOMMRV = 0.00;
    public String FOPCUR = "";
    public String TAXCUR = "";
    public String COMMCUR = "";
    public String TAXCOMMCUR = "";
    
    public String ERRORDESC = "";
    
    public DBException dbException = new DBException();
    
}
