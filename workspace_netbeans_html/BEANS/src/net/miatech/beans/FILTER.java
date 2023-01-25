/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author jtorres
 */
public class FILTER implements Serializable {

    //Campos de Filtro ***************
    public String DSALES= "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_SOURCE = "";
    public String IN_FLAG = "";
    public String strYearFrom = "";
    public String COUNTRY = "";
    public String CLASS = "";
    public String strMonthFrom = "";
    public String strDayFrom = "";
    public String strYearTo = "";
    public String strMonthTo = "";
    public String strDayTo = "";
    public String cmbTop = "";
    public String IN_DATE_FROM= "";
    public String IN_DATE_TO= "";
    public String IN_COUNTRY= "";
    public String strFlag= "";
    public String rbtTypeRoute = "";
    public String rbtTypeParam = "";
    public String cmbCountry = "";
    public String strCityO = "";
    public String strCityD = "";
    public String strCountryS = "";
    public String strCityS = "";
    public String strVentor = "";
    public String strDSALES = "";
    public String strTSALES = "";
    public String strCANAV = "";
    public String strCLASE = "";
    public String strBOOKI = "";
    public int currentPage = 0;
    public int totalPage = 0;
    public int displayResult = 0;
    public int typePage = 0;
    public int amountDisplay = 0;
    public String strSearchParam = "";
    public String strSearchParamDos = "";
    public boolean flag_noProrateado = false;
    public String strALLIC = "";
    public boolean flag_alliance = false;
    public String strCountryO = "";
    public String strCountryD = "";
    public long lngCoupons = 0;
    public double dblAvgCpns = 0;
    public double dblAmount = 0;
    public double dblAvgAmt = 0;
    public double dblAvgRate = 0;
    //GUARDAR LOS DATOS DE CANTCERO, CANTDIEZ, AMOUNT, MINVAL, MAXVAL
    public long lngCant0 = 0;
    public long lngCant10 = 0;
    public double dblMontoMin = 0;
    public double dblMontoMax = 0;
    public double dblAmtTotal = 0;
    public long lngUnivCpns = 0;
    public double dblUnivAmt = 0;
    public String strSelectedBy = "";
    public String strStatus = "";
    public String strDate = "";
    public String strAnalista = "";
    public String strCiudadBase = "";
    public String strFechaDetail = "";
    public String strTICKET = "";
    public String strLAST_PROCEDED = "";
    public String strSQL = "";
    public int intCol = 0;
    public String strOrden = "";
    public String strONOFF = "";
    public String strCITY = "";
    public String strTIPO = "";
    public String COUNTRY_FROM_CITY = "";
    
    public String strFecFormat = "";
    public String strMes = "";
  
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
    
    //FLAG EXCEL
    public String f_excel="";
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    public Pagination page = new Pagination();
    
}
