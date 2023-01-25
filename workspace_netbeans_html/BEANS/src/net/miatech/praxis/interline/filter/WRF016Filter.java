/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.WRF016;

/**
 *
 * @author jtorres
 */
public class WRF016Filter extends WRF016{
 
    public int RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public int IN_TIPOFECHA = 0;
    public String IN_CURRENCY = "";
    public String IN_AIRLINE = "";
    public String IN_SOURCE = "";
    public int IN_SELECTBY = 0;
    public String IN_TYPE = "";
    public String IN_TYPEDOC="";
    public String IN_PERIOD = "";
    public String IN_FCLAS = "";
    public String IN_TKT = "";
    public String strTitle = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String FECHA = "";
    public String RMANT = "";
    public String IN_REJNUMBER = "";
    
    public long totQTYDOC=0;
    public double totGROSS=0;
    public double totISC=0;
    public double totTAX=0;
    public double totNETO=0;
    public double totUATP =0;
    public double totHFEE =0;
    public double totOTHER=0;
    
    public double Avg=0;
    public double totAvg=0;
    
    //Fechas
    public double Aud1=0;
    public int Rej1=0;
    public int Sup1=0;
    public double Aud2=0;
    public int Rej2=0;
    public int Sup2=0;
    public double Aud3=0;
    public int Rej3=0;
    public int Sup3=0;
    public double Aud4=0;
    public int Rej4=0;
    public int Sup4=0;
    public double Aud5=0;
    public int Rej5=0;
    public int Sup5=0;
    public double Aud6=0;
    public int Rej6=0;
    public int Sup6=0;
    
    public double Rate1=0;
    public double Rate2=0;
    public double Rate3=0;
    public double Rate4=0;
    public double Rate5=0;
    public double Rate6=0;
    
    
    public double Avg1=0;
    public double Var1=0;
    public double Avg2=0;
    public double Var2=0;
    public double Avg3=0;
    public double Var3=0;
    public double Avg4=0;
    public double Var4=0;
    public double Avg5=0;
    public double Var5=0;
    public double Avg6=0;
    public double Var6=0;
    
    public double Diff1=0;
    public double Diff2=0;
    public double Diff3=0;
    public double Diff4=0;
    public double Diff5=0;
    public double Diff6=0;
    //Totales
    public int totAud1=0;
    public int totRej1=0;
    public int totSup1=0;
    public int totAud2=0;
    public int totRej2=0;
    public int totSup2=0;
    public int totAud3=0;
    public int totRej3=0;
    public int totSup3=0;
    public int totAud4=0;
    public int totRej4=0;
    public int totSup4=0;
    public int totAud5=0;
    public int totRej5=0;
    public int totSup5=0;
    public int totAud6=0;
    public int totRej6=0;
    public int totSup6=0;
   	
    public double totNet1=0;
    public double totNet2=0;
    public double totNet3=0;
    public double totNet4=0;
    public double totNet5=0;
    public double totNet6=0;
    
    public double totQCUPON=0;
    public double totQAUDI=0;
    public double totQRM=0;
    public int Dif_CPN_AUDI=0;
    public int totDif_CPN_AUDI=0;
    public double Porc=0;
    public double totPorc=0;
    public int Workable=0;
    public int Pending=0;
                
    //WRF001
    public int totQSFIM=0;
    public int totQSUPAUD=0;
    public int totQSUPRM=0;
    public int QSUPAUD=0;
    public int QSUPRM=0;
    public long QTYINV=0;
    public double dblPerRev=0;
    public double dblPerRec=0;
    public String GRUPO ="";
    public String DATENV="";
    public String FMETHOD="";
    public String FECL="";
    public String PERMONT="";
    public String STVAL="";
    public long QRMSPA=0;
    public double dblPerTax=0;
    
    //WRF002
    public String CCIA="";
    public String FORMA="";
    public String SERIE="";
    public String CUPON="";
    public String NROPRT="";
    public String RMACCEPT="";
    public String RUTAP="";
    public String IPENAL="";
    public String NRORM="";
    
    //A1241
    public String strFlag="";
    public long ICUPON=0;
    public double IFARE=0;
    public double IISC=0;
    public double ITAX=0;
    public double IOTHER=0;
    public double INETO=0;
    public String COMENT1="";
    public String COMENT2="";
    
    public Pagination page = new Pagination();
    
    
    
}


