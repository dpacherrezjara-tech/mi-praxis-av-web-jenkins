/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;

/**
 *
 * @author lremicio
 */
public class WS02Filter implements Serializable {
    
    public String VP_OPCION = "";
    public String VP_CCUST = "";
    public String VP_DFLIGHT = "";
    
    
    public String DFLIGHTF = "";
    public String NFLIGHTF = "";
    public int QTYPAXYF = 0;
    public int QTYPAXJF = 0;
    public int TOTPAXF = 0;
    public double TOTCABYF = 0d;
    public double TOTCABJF = 0d;
    public double TOTALF = 0d;
    public int SEATS = 0;
    public int NOVALF = 0;
    public int TOTVNR = 0;
    public String ORIGDEST = "";
    public String COUNTRY = "";
    public int KM = 0;
    public double AVG_ECO = 0d;
    public double AVG_BUS = 0d;
    public double AVG_ECO_KM = 0d;
    public double AVG_BUS_KM = 0d;
    public String MODELO = "";
    public String MATRIC = "";
    
    public Pagination page = new Pagination();
    
}
