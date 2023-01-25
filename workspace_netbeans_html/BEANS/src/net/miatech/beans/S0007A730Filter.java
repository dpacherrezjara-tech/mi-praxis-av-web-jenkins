/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A730;

/**
 *
 * @author jmeiggs
 */
public class S0007A730Filter extends A730 {
    public String IN_AIRLIN = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQ = "";
    public String IN_CIAEXCH = "";
    public String IN_FORMAEXCH = "";
    public String IN_SERIEEXCH = "";
    
    public String TICKET = "";
    public String DOCUMENTO = "";
    public String CUPON = "";
    public String CNJ = "";
    public double VALUE = 0.00;
    
    public String CPUI = "";
    public int CUPONEXCH = 0;
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
    public double COMM = 0.00;
    public double OCOMM = 0.00;
    public double YQ = 0.00;
    public double IVA = 0.00;
    
    public String ERRORDESC = "";
    public String DOCUMENTOFAT = "";
    
    public DBException dbException = new DBException();
}
