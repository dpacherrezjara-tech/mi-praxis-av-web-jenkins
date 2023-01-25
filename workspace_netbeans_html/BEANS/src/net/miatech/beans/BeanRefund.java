/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.libmiatec.A1498;
import net.miatech.libmiatec.A1500;
import net.miatech.libmiatec.A1501;
import net.miatech.libmiatec.A1503;
import net.miatech.libmiatec.A1504;

/**
 *
 * @author claudia
 */
public class BeanRefund {

    public String TICKET = "";
    public String FECHA = "";
    public String MONEDA = "";
    public String FCALC = "";
    public String DEVORIG = "";
    public List<A1500> lstTaxes = new ArrayList<A1500>(0);
    public List<A1501> lstPenalidad = new ArrayList<A1501>(0);
    public List<A1503> lstMontoUsado = new ArrayList<A1503>(0);
    public List<A1498> lstLog = new ArrayList<A1498>(0);
    public List<A1504> lstFOP = new ArrayList<A1504>(0);
    //Campos Monto Total Devolucion ============================================
    public String TIPOREEMB = "";
    public String PENALTY = "";
    public String FFARE = "";
    public double FARE = 0;
    public String MDAPAGO = "";
    public String FAJUST = "";
    public double AJUSTTV = 0;
    public double FARENET = 0;
    public String FMONTO = "";
    public double MTOUSADO = 0;
    public double SUBTOTAL = 0;
    public String FTAXC = "";
    public double TAXAMT = 0;
    public String FRULE = "";
    public double PENALI = 0;
    public String FDSCT = "";
    public double DSCAMT = 0;
    public double TOTDEV = 0;

}
