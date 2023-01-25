/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.PXF800;

/**
 * BKS100 TOTAL Liquidación por PERIDO CURRENT
 * @author claudia
 */
public class PXF800Filter extends PXF800 {
    //Campos Filtro ==============
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String periodo = "";
    public String formatDate = "";
    public String nombre = "";
    public String formatProcDate = "";
    public String formatBillDate = "";
    public String strTipoFecha = "";
    public String strNombrePais = "";
    public String strDate = "";
    public String strFlag = "";
    //public long QTYDOC = 0;
    public int pos = 0;
    public double TOTTOCA = 0;
    //DATOS DEL PXF810 =========================================================
    public double dblAdditional = 0;
    public double dblTNUW = 0;
    public double dblFRTNU = 0;
    public double dblFRTNUW = 0;
    //public double dblFRTNUW12 = 0;
    //public double dblFRTNUW13 = 0;
    public double TOTPAY = 0;
    public double dblSALDO = 0;
    public long lngQTNUW = 0;
    public long lngQFRTNU = 0;
    public long lngQFRTNUW = 0;
    public long lngQSALDO = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
}
