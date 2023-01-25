/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.IMF050;

/**
 *
 * @author jtorres
 */
public class IMF050Filter extends IMF050{
    
    public int RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public int IN_TIPOFECHA = 0;
    public String IN_SOURCE = "";
    public String IN_AIRLINE = "";
    public String IN_AVG = "";
    public String IN_REJECT = "";
    public String IN_CURRENCY = "";
    public int IN_GROUPBY = 0;
    public String IN_TYPEDOC="";
    public String IN_PERIOD = "";
    public String strFormatDate="";
    public String strFormatDate1="";
    public String strFormatDate2="";
    public String strFormatDate3="";
    public String strFormatDate4="";
    public String strFormatDate5="";
    public String strDescripcion="";
    public String strDescripcion1="";
    public String strDescripcion2="";
    public String strDescripcion3="";
    public String strDescripcion4="";
    public String strDescripcion5="";
    
    //TOTALES
    public int totQITEMS=0;
    public double totGROSSI=0;
    public double totISCI=0;
    public double totSISCI=0;
    public double totTAXI=0;
    public double totNETI=0;
    public double totTNETO=0;
    
    public double diffTNETO=0;
    public int diffQITEMS =0;
    //LAST YEAR
    public double TNETO_LY=0;
    public int QITEMS_LY =0;
    public double diffTNETO_LY=0;
    public int diffQITEMS_LY =0;
    
    public int totQITEMS_LY=0;
    public double totGROSSI_LY=0;
    public double totISCI_LY=0;
    public double totSISCI_LY=0;
    public double totTAXI_LY=0;
    public double totNETI_LY=0;
    public double totTNETO_LY=0;
    
    //A CARGO
    public double TNETOCAR=0;
    public int QITEMSCAR=0;

    public double TNETOCAR_LY=0;
    public int QITEMSCAR_LY=0;
    
    //Porcentajes
    public double PerPAX=0;
    public double PerAMT=0;
    public double PerPAX2=0;
    public double PerAMT2=0;
            
    //Diferencias de años
    public int DiffPAX=0;
    public double DiffAMT=0;
    public int DiffPAX2=0;
    public double DiffAMT2=0;
    
    //Average
    public double AVGFAVOR=0;
    public double AVGCARGO=0;
    public double AVGFAVOR2=0;
    public double AVGCARGO2=0;
    
    public Pagination page = new Pagination();
}
