



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.IMF121;

/**
 *
 * @author 
 */
public class IMF121Filter extends IMF121 {

    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFormatDate = "";   
    
    public long QTTKT = 0;
    public double VALORT = 0;
    public long totQTKTSH = 0;
    public long totQTKTSL = 0;
    public double totVALORH = 0;
    public double totVALORL = 0;
    
    public long totQTTKT = 0;
    public double totVALORT = 0;
    
    public String strTitulo = "";
    
    public Pagination page = new Pagination();

}
