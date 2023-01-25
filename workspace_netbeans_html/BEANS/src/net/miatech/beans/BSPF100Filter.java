/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.BSPF100;
import net.miatech.praxis.BSPF110;
import net.miatech.praxis.BSPF93;

/**
 * BKS100 TOTAL Liquidación por PERIDO CURRENT
 * @author claudia
 */
public class BSPF100Filter extends BSPF100 {

    //************************
    public String COUNTRY = "";
    public String AGTN = "";
    public String STREP = "";
    public double TCAMBI = 0;
    //Campos Filtro ==============
    public long QTYDOC = 0;
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String periodo = "";
    public String formatDate = "";
    public String nombre = "";
    public String strNomCity = "";
    public int pos = 0;
    public String formatProcDate = "";
    public String formatMiaDate = "";
    public String formatProcIDate = "";
    public String strTipoFecha = "";
    public double dblTotalPay = 0;
    
    /*03/12/2012 BY JRDC*/
    public String TDNR = "";

    public List<BSPF93> lstReg93 = new ArrayList<BSPF93>(0);
    
    public BSPF110 fileBSPF110 = new BSPF110(); //Filter for Calendar.
    public int NAID;
    
    public String strDescripcionAgnt="";
    
    //totales pxf703
    public String formatDate2="";
    public long totQCANJ=0;
    public long totQISSUE=0;
    public long totQADM=0;
    public long totQREFUND=0;
    public long totQACM=0;
    public long totQCANC=0;
    public long totCOBLT=0;
    public long totCOBLR=0;
    public String strDescripcionFTE="";
    public long totCRFND=0;
    
    public long totFPAMCA=0;
    public long totFPAMCC=0;
    
}
