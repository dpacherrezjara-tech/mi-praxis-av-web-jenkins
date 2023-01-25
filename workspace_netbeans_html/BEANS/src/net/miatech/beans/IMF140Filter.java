/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.IMF140;

/**
 *
 * @author ggutierrez
 */
public class IMF140Filter extends IMF140{
    
    public long RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_YEAR = "";
    public String IN_TREG = "";
    public String strImagen1 = "";
    public String strImagen2 = "";
    public String LABEL_MXN = "";
    public String LABEL_USD = "";
    public String AVRG_VCPMXN_PORCENTAJE = "" ;
    public double AVRG_VCPNMXN = 0.00;
    
    //Almacenan los porcentajes de las zonas
    public double percentageASI = 0.00;
    public double percentageCAM = 0.00;
    public double percentageCAN = 0.00;
    public double percentageCAR = 0.00;
    public double percentageEUR = 0.00;
    public double percentageFRO = 0.00;
    public double percentageLOC = 0.00;
    public double percentagePLA = 0.00;
    public double percentageSUD = 0.00;
    public double percentageUSA = 0.00;
    public double totalRegistros = 0.00;
    
    //Campos para forecast por zonas
    //ASI
    public double PAXASI = 0.00;
    public double VPROUSDASI = 0.00;
    public double VCPNUSDASI = 0.00;
    public double VCPNMXNASI = 0.00;
    public String strImagen_ASI = "";
    public double AVRG_VCPNMXN_ASI = 0.00;
    //CAM
    public double PAXCAM = 0.00;
    public double VPROUSDCAM = 0.00;
    public double VCPNUSDCAM = 0.00;
    public double VCPNMXNCAM = 0.00;
    public String strImagen_CAM = "";
    public double AVRG_VCPNMXN_CAM = 0.00;
    //CAN
    public double PAXCAN = 0.00;
    public double VPROUSDCAN = 0.00;
    public double VCPNUSDCAN = 0.00;
    public double VCPNMXNCAN = 0.00;
    public String strImagen_CAN = "";
    public double AVRG_VCPNMXN_CAN = 0.00;
    //CAR
    public double PAXCAR = 0.00;
    public double VPROUSDCAR = 0.00;
    public double VCPNUSDCAR = 0.00;
    public double VCPNMXNCAR = 0.00;
    public String strImagen_CAR = "";
    public double AVRG_VCPNMXN_CAR = 0.00;
    //EUR
    public double PAXEUR = 0.00;
    public double VPROUSDEUR = 0.00;
    public double VCPNUSDEUR = 0.00;
    public double VCPNMXNEUR = 0.00;
    public String strImagen_EUR = "";
    public double AVRG_VCPNMXN_EUR = 0.00;
    //FRO
    public double PAXFRO = 0.00;
    public double VPROUSDFRO = 0.00;
    public double VCPNUSDFRO = 0.00;
    public double VCPNMXNFRO = 0.00;
    public String strImagen_FRO = "";
    public double AVRG_VCPNMXN_FRO = 0.00;
    //LOC
    public double PAXLOC = 0.00;
    public double VPROUSDLOC = 0.00;
    public double VCPNUSDLOC = 0.00;
    public double VCPNMXNLOC = 0.00;
    public String strImagen_LOC = "";
    public double AVRG_VCPNMXN_LOC = 0.00;
    //PLA
    public double PAXPLA = 0.00;
    public double VPROUSDPLA = 0.00;
    public double VCPNUSDPLA = 0.00;
    public double VCPNMXNPLA = 0.00;
    public String strImagen_PLA = "";
    public double AVRG_VCPNMXN_PLA = 0.00;
    //SUD
    public double PAXSUD = 0.00;
    public double VPROUSDSUD = 0.00;
    public double VCPNUSDSUD = 0.00;
    public double VCPNMXNSUD = 0.00;
    public String strImagen_SUD = "";
    public double AVRG_VCPNMXN_SUD = 0.00;
    //USA
    public double PAXUSA = 0.00;
    public double VPROUSDUSA = 0.00;
    public double VCPNUSDUSA = 0.00;
    public double VCPNMXNUSA = 0.00;
    public String strImagen_USA = "";
    public double AVRG_VCPNMXN_USA = 0.00;
    
    //TOTALES POR ZONAS
    public double TOTPAXASI = 0.00;
    public double TOTPAXCAM = 0.00;
    public double TOTPAXCAN = 0.00;
    public double TOTPAXCAR = 0.00;
    public double TOTPAXEUR = 0.00;
    public double TOTPAXFRO = 0.00;
    public double TOTPAXLOC = 0.00;
    public double TOTPAXPLA = 0.00;
    public double TOTPAXSUD = 0.00;
    public double TOTPAXUSA = 0.00;
    
    public double TOTVPROUSDASI = 0.00;
    public double TOTVPROUSDCAM = 0.00;
    public double TOTVPROUSDCAN = 0.00;
    public double TOTVPROUSDCAR = 0.00;
    public double TOTVPROUSDEUR = 0.00;
    public double TOTVPROUSDFRO = 0.00;
    public double TOTVPROUSDLOC = 0.00;
    public double TOTVPROUSDPLA = 0.00;
    public double TOTVPROUSDSUD = 0.00;
    public double TOTVPROUSDUSA = 0.00;
    
    public double TOTVCPNUSDASI = 0.00;
    public double TOTVCPNUSDCAM = 0.00;
    public double TOTVCPNUSDCAN = 0.00;
    public double TOTVCPNUSDCAR = 0.00;
    public double TOTVCPNUSDEUR = 0.00;
    public double TOTVCPNUSDFRO = 0.00;
    public double TOTVCPNUSDLOC = 0.00;
    public double TOTVCPNUSDPLA = 0.00;
    public double TOTVCPNUSDSUD = 0.00;
    public double TOTVCPNUSDUSA = 0.00;
    
    public double TOTVCPNMXNASI = 0.00;
    public double TOTVCPNMXNCAM = 0.00;
    public double TOTVCPNMXNCAN = 0.00;
    public double TOTVCPNMXNCAR = 0.00;
    public double TOTVCPNMXNEUR = 0.00;
    public double TOTVCPNMXNFRO = 0.00;
    public double TOTVCPNMXNLOC = 0.00;
    public double TOTVCPNMXNPLA = 0.00;
    public double TOTVCPNMXNSUD = 0.00;
    public double TOTVCPNMXNUSA = 0.00;
    
    //Comparacion anio a anio
    public String MES = "";
    public double VCPNUSD_CY = 0.00;
    public double VCPNMXN_CY = 0.00;
    public double VCPNUSD_LY = 0.00;
    public double VCPNMXN_LY = 0.00;
    
    //Balances  
    public double DOMESTIC_B_QTYPAX = 0.00;
    public double DOMESTIC_B_VCPNUSD = 0.00;
    public double DOMESTIC_B_VCPNMXN = 0.00;
    public double INTERNATIONAL_B_QTYPAX = 0.00;
    public double INTERNATIONAL_B_VCPNUSD = 0.00;
    public double INTERNATIONAL_B_VCPNMXN = 0.00;
    public double GENERAL_B_QTYPAX = 0.00;
    public double GENERAL_B_VCPNUSD = 0.00;
    public double GENERAL_B_VCPNMXN = 0.00;
    
    //Graficas anio a anio
    public double DOMESTIC_VCPNUSD_CY = 0.00;
    public double DOMESTIC_VCPNMXN_CY = 0.00;
    public double DOMESTIC_VCPNUSD_LY = 0.00;
    public double DOMESTIC_VCPNMXN_LY = 0.00;
    public double INTERNATIONAL_VCPNUSD_CY = 0.00;
    public double INTERNATIONAL_VCPNMXN_CY = 0.00;
    public double INTERNATIONAL_VCPNUSD_LY = 0.00;
    public double INTERNATIONAL_VCPNMXN_LY = 0.00;
    public double GENERAL_VCPNUSD_CY = 0.00;
    public double GENERAL_VCPNMXN_CY = 0.00;
    public double GENERAL_VCPNUSD_LY = 0.00;
    public double GENERAL_VCPNMXN_LY = 0.00;
    
    public Pagination page = new Pagination();
    
}
