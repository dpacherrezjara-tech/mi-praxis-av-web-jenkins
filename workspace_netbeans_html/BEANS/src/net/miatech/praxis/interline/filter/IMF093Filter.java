/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.praxis.interline.IMF093;

/**
 *
 * @author claudia
 */
public class IMF093Filter extends IMF093{
    
    public String yearFrom = "";
    public String yearTo = "";
    public String monthFrom = "";
    public String monthTo = "";
    public String strFormatDate = "";
    public String strAirName = "";
    public String strPeriodo = "";
    
    //Campos Forma 1 IB/OB
    public double dblTNETF1IB = 0;//IXP - Factura a Cargo
    public double dblTNETF1OB = 0;//IXC - Factura a Favor
    public double dblAJUSF1IB = 0;//IXP - Factura a Cargo
    public double dblAJUSF1OB = 0;//IXC - Factura a Favor
    
    //Campos Forma 2 OB
    public double dblTNETF2OB = 0;//IXC - Factura a Favor
    public double dblAJUSF2OB = 0;//IXC - Factura a Favor
    
    //Campos Forma 3 IB
    public double dblTNETF3IB = 0;//IXP - Factura a Cargo
    public double dblAJUSF3IB = 0;//IXP - Factura a Cargo
    
    public double dblBALANCIB = 0;
    public double dblBALANCOB = 0;
    
}
