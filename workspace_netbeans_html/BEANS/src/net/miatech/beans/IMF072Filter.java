/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libpass.IMF072;


/**
 *
 * @author claudia
 */
public class IMF072Filter  extends IMF072{
    
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    
        
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public double totVALOR = 0;
    public String TICKET = "";
    
    public String strFecFormat = "";
    public String strMes = "";
    public String strFlag = "";
    public String strTop = "";
    public String strTitulo = "";
    public String strComentario = "";
    public int intNum = 0;
    public long lngCUPON = 0;
    public double dblAMOUNT = 0;
    public long lngTotCUPON = 0;
    public double dblTotAMOUNT = 0;
    //IMF080 =====================================================
    public double AMOUNTOF = 0;
    public double AMOUNTON = 0;
    public long QCPNSOF = 0;
    public long QCPNSON = 0;
    public double dblTotAMOUNTOF = 0;
    public double dblTotAMOUNTON = 0;
    public long lngTotQCPNSOF = 0;
    public long lngTotQCPNSON = 0;
    // ============================================================
    public double dblAvgAmtOFF = 0;
    public double dblAvgQcpOFF = 0;
    public double dblAvgPerOFF = 0;
    public double dblAvgAmtON = 0;
    public double dblAvgQcpON = 0;
    public double dblAvgPerON = 0;
    public double dblTarifa = 0;
    
    public double dblTotAvgPerON = 0;
    public double dblTotAvgPerOFF = 0;
    
    public double dblTotPerQcpON = 0;
    public double dblTotPerQcpOFF = 0;
    public double dblTotPerAmtON = 0;
    public double dblTotPerAmtOFF = 0;
    
    //PAGINACION ==================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    public Pagination page = new Pagination();
}
