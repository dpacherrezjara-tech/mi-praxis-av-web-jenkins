/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.sql.Array;
import net.miatech.praxis.flown.A1971;

/**
 *
 * @author jtorres
 */
public class A1971Filter extends A1971 {

    public long RN = 0;
    public String FLAG_VNR = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CABI = "";
    public String IN_NFLIGHT = "";
    public String IN_CPAIR = "";
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
    public String strRuta = "";
    public String strZona = "";
    public String strTop = "";
    public String strTipoQTY = "";
    public String strTipoInfo = "";
    public String TPAX = "";
    public String strDescTPAX = "";
    public long QTYFlight = 0;
    public long KMS_1 = 0;
    //CLASE F
    public long CAPF = 0;
    public long QTYPAX_F = 0;
    public double VCPN_F = 0;
    public double AVG_F = 0;
    public long totQTYPAX_F = 0;
    public double totVCPN_F = 0;
    public double totAVG_F = 0;
    //CLASE Y
    public long CAPY = 0;
    public long QTYPAX_Y = 0;
    public double VCPN_Y = 0;
    public double AVG_Y = 0;
    public long totQTYPAX_Y = 0;
    public double totVCPN_Y = 0;
    public double totAVG_Y = 0;
    //CLASE J
    public long CAPJ = 0;
    public long QTYPAX_J = 0;
    public double VCPN_J = 0;
    public double AVG_J = 0;
    public long totQTYPAX_J = 0;
    public double totVCPN_J = 0;
    public double totAVG_J = 0;
    public long totKMS = 0;
    public long totKMS_1 = 0;
    public long totQTYPAX = 0;
    public double totVCPN = 0;
    public double totREVENUE = 0;
    public double totYIELD = 0;
    public long totQTYFlight = 0;
    public long totQTYVNR = 0;
    public long totQTYNRE = 0;
    public double AVG = 0;
    public double totAVG = 0;
    public long QEXCEP = 0;
    public long totQEXCEP = 0;
    //A1972
    public long CAPTOT = 0;
    public long DiffCap = 0;
    public long DiffCapJ = 0;
    public long DiffCapY = 0;
    public long DiffCapF = 0;
    //Porcentajes
    public double PerJ = 0;
    public double PerY = 0;
    public double PerF = 0;
    public double PerCAP = 0;
    public double Per1 = 0;
    public double Per2 = 0;
    public double Per3 = 0;
    public double Per4 = 0;
    public double totPer1 = 0;
    public double totPer2 = 0;
    public double totPer3 = 0;
    public double totPer4 = 0;
    public double VCPNRE = 0;
    public double totVCPNRE = 0;
    //Booking Netos Not Flown
    public long QBNPAX = 0;
    public double AMTBN = 0;
    public long totQBNPAX = 0;
    public double totAMTBN = 0;
    
    //Online , OAL
    public long QCPNON = 0;
    public double VCPNON = 0;
    public long QCPNOAL = 0;
    public double VCPNOAL = 0;

    public long totQCPNON = 0;
    public double totVCPNON = 0;
    public long totQCPNOAL = 0;
    public double totVCPNOAL = 0;
    
    public double totTBASICM = 0;
    public long totBASICM = 0;
    public long totQCPNVAL= 0;
    public String strMonth = "";
    public String strYear = "";
    public String strValue = "";
    public String IN_FECHA_FROMB = "";
    public String IN_FECHA_TOB = "";
    public String strMonthB = "";
    public String strYearB = "";
    public String strValueB = "";
    public double Angle = 0;
    public double AngleB = 0;
    public String DFLIGHTB = "";
    public double VCPN_JB = 0;
    public long QTYPAX_JB = 0;
    public double VCPN_YB = 0;
    public long QTYPAX_YB = 0;
    public double VCPNB = 0;
    public long QTYPAXB = 0;
    public long QFLIGHTB = 0;
    public double VCPNONB = 0;
    public long QCPNONB = 0;
    public double VCPNOALB = 0;
    public long QCPNOALB = 0;
    public double VCPNNFB = 0;
    public long QCPNNFB = 0;
    public double VCPNNF = 0;
    public long QCPNNF = 0;
    public long QFLIGHT = 0;
    public int MESES = 0;
    public String strFormatDateB = "";
    public double TOVCPNONB = 0;
    public double TOVCPNON = 0;
    public double TOVCPNOALB = 0;
    public double TOVCPNOAL = 0;
    
    public String ZONAB = "";
    public double QCFLOW = 0;
    public double QCPAX = 0;
    public double QCFLOWB = 0;
    public double QCPAXB = 0;
    public double AVGB = 0;
    public String strDescripcionB = "";
    
    public Pagination page = new Pagination();
}
