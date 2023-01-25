/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A713;

/**
 *
 * @author jmeiggs
 */
public class S0001A713Filter extends A713 {
    public String VP_AIRLINE = "";
    public String VP_CIA ="";
    public String VP_FORMA ="";
    public String VP_SERIE ="";
    public String VP_GRUPO = "";
    public String VP_SEQ = "";
        
    public String TICKET = "";
    public String TICKETAUTH = "";
    public String CUPON1 = "";
    public String CUPON2 = "";
    public String CUPON3 = "";
    public String CUPON4 = "";
    public String CUPON1_T2 = "";
    public String CUPON2_T2 = "";
    public String CUPON3_T2 = "";
    public String CUPON4_T2 = "";
    public String CUPON1_T3 = "";
    public String CUPON2_T3 = "";
    public String CUPON3_T3 = "";
    public String CUPON4_T3 = "";
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
    public double CPNLOC = 0.00;
    public String QCUR = "";
    public double Q = 0.00;
    public String YQCUR = "";
    public double YQ = 0.00;
    public double IVA = 0.00;
    public double COMM_G = 0.00;
    public double SCOMM = 0.00;
    public String USED = "";
    public String CARRIEROPE = "";
    public String FLIGHTOPE = "";
    
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
    
    public String A713CUPON = "";
    public String A713CFARE1 = "";
    public double A713PRSCM1 = 0.00;   
    public double A713VALOL1 = 0.00;
    public String A713MDARVA = "";
    public double A713LRRCM1 = 0.00;
    public double A713LRSCM1 = 0.00;
    public double A713LYQ1 = 0.00;
    public double A713LIV1 = 0.00;
    
    public String BPREV = "";
    public String BPADRE = "";
    
    public String REFERENCE = "";
    public String RELATED = "";
    public DBException dbException = new DBException();
}
