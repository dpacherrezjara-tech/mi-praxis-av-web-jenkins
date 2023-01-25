/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI030;
/**
 *
 * @author andrea
 */
public class SFI030Filter extends SFI030{
    public long RN;
    public String strFormatDate="";
        
    public double totTGROSS=0;
    public double totTISC=0;
    public double totTTAX=0;
    public double totTVAT=0;
    public double totHFEEAM=0;
    public double totTUATP=0;
    public double totTNET=0;
    public String strTGROSS = "";
    public String strTISC = "";
    public String strTTAX = "";
    public String strHFEEAM = "";
    public String strTUATP = "";
    public String strTNET = "";
    public String strTVAT = "";
    public String yearFrom = "";
    public String yearTo = "";
    public String monthFrom = "";
    public String monthTo = "";
    public String dayFrom = "";
    public String dayTo = "";
    public String DES_SOURCOD = "";
 
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
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
