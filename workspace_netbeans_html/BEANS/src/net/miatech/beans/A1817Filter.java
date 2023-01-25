/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1817;

/**
 *
 * @author jtorres
 */
public class A1817Filter extends A1817 {

    public int RN = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String strTicket = "";
    public long QCPNDIFF = 0;
    //totales
    public long totQCPNOAL = 0;
    public long totQCPNON = 0;
    public long totQCPNCON = 0;
    public long totQCPNEMD = 0;
    public long totQCPNSTAS = 0;
    public long totQCPNUSEA = 0;
    public long totQCPNOTHU = 0;
    public long totQCPNVAL = 0;
    public long totQCPNDIFF = 0;
    //cerrado,procesado,standby
    public long lngQSTB = 0;
    public long lngQPROC = 0;
    public long lngQCLO = 0;
    public long lngQREC = 0;
    public Pagination page = new Pagination();
}
