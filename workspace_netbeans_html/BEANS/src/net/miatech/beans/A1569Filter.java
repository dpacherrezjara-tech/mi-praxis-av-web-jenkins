/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1569;

/**
 *
 * @author jtorres
 */
public class A1569Filter extends A1569 {

    //Campos Filtro ==============
    public int contador = 0;
    public String fechaini = "";
    public String fechafin = "";
    public String yearFrom = "";
    public String dayFrom = "";
    public String monthFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strPais = "";
    public String strOrig = "";
    public String strDest = "";
    //Totales
    public long totQVLO = 0;
    public long totQDOC = 0;
    public long totQDOCR = 0;
    public long totQOAL = 0;
    public long totQCUPR = 0;
    public long totQFIM = 0;
    public long totQCUPOW = 0;
    public long totQCUPOAL = 0;
    public long totQCANC = 0;
    public long totNPXCL1 = 0;
    public long totNPXCL2 = 0;
    public long totNPXCL3 = 0;
    public long totNPXCL4 = 0;
    public long totNPXGRS = 0;
    //A1568
    public String NRVLO = "";
    public String ORIGM = "";
    public String DESTM = "";
    public String PSUSO = "";
    //Totales Cabina
    public long totCABIN = 0;
}
