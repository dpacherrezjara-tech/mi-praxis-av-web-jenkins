/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libpass.RMF001;

/**
 *
 * @author claudia
 */
public class RMF001Filter extends RMF001 implements Serializable{

    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String strDate = "";
    public String strFormatDate = "";
    public String strFecha = "";
    public String strGroupBy = "";
    public String strFechaDetail = "";
    public String strDSALES = "";
    public String strCampo = "";
    public String strBuscar = "";
    public String strSQL = "";
    public String strFLANPASS = "";
    public int pos = 0;
    public long QPENS = 0;
    public long QRECB = 0;//RECIBIDO
    public long QPEND = 0;//PENDIENTE SIN USAR
    public long QCONS = 0;//PENDIENTE EN CONSULTA
    public long QREEMB = 0;//PROCESADO
    public long QDENI = 0;//DENEGADO
    public long QDEV = 0;//DEVUELTO LAN
    public long QDAYS = 0;
    public long QOVER = 0;
    public long QPAYMT = 0;//PAYMENTED
    public long QCOUNT = 0;//COUNTED
    public long QTOTPRO = 0;//TOTAL PROCESADO
    public long QDIST = 0;
    public double AVG = 0;
    // Totales =================================================================
    public long totQPENS = 0;//RECIBIDO
    public long totQRECB = 0;//RECIBIDO
    public long totQPEND = 0;//PENDIENTE SIN USAR
    public long totQCONS = 0;//PENDIENTE EN CONSULTA
    public long totQREEMB = 0;//PROCESADO
    public long totQDENI = 0;//DENEGADO
    public long totQDEV = 0;//DEVUELTO LAN
    public long totQDAYS = 0;
    public long totQOVER = 0;
    public long totQPAYMT = 0;//PAYMENTED
    public long totQCOUNT = 0;//COUNTED
    public long totQTOTPRO = 0;//TOTAL PROCESADO
    public long totQDIST = 0;
    public double dblPerQTOTP = 0;
    public double dblPerQREMB = 0;
    public double dblPerQDEN = 0;
    public double dblPerQDEV = 0;
    public double dblPerQCONS = 0;
    public double dblPerQPEND = 0;
    
    public int intCol = 0;
    public String strOrden = "";
    
    //Antigüedad/Semáforo ======================================================
    public int ID = 0;
    public int DP = 0;
    public int IP = 0;
    public int IV = 0;
    public int antCons = 0;
    public int antDist = 0;
    public String SEMAFORO = "";
    
    //Flag LANPASS
    public String strLAN="";
    
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    public int intRowNumber = 0;
    
}
