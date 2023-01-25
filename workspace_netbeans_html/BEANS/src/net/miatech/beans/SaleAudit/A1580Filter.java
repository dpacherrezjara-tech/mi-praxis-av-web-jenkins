/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A1580;

public class A1580Filter extends A1580 {

    public Integer VP_FILTER = 0;
    public String VP_CCUST = "";
    public String VP_CIA = "";
    public String VP_FRMSRIE = "";
    public String VP_SEQ = "";

    /*AGREGADO POR ZPP*/
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    public String OPCIONTYPE = "";
    public String COMBOBY = "";
    public String NUMBERADM = "";
    public String DATEFROM = "";
    public String DATETO = "";
    public String COUNTRY = "";
    public String CURRENCY = "";
    public String CHANNEL = "";
    public String AUTMAN = "";
    public String STATUS = "";
    public String COMBOCHANNEL = "";
    public String VP_CUPON = "";
    public String TRNCU = "";
    public String VP_TRNCU = "";
    public String VP_PREME = "";
    public String VP_CNXPA = "";
    public String VP_TUORCODE = "";
    public String VP_USER = "";
    public String VP_TYPE = "";
    public String VP_AREA = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    // Farecomponent OLD a2837    
    public String A2837CIANW = "";
    public String A2837FORNW = "";
    public String A2837SERNW = "";
    public String A2837CIAPA = "";
    public String A2837FORPA = "";
    public String A2837SERPA = "";
    public String A2837CCORR = "";
    public String A2837CONEX = "";
    public String A2837FEEMI = "";
    public String A2837FLAGO = "";
    public String A2837TRNCO = "";
    public String A2837FEMIO = "";
    public String A2837IATAO = "";
    public double A2837BSR = 0.0;

}
