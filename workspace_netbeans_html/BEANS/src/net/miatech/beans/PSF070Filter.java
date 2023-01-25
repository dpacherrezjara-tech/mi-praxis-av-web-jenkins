/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rmayta
 */
public class PSF070Filter extends net.miatech.libpass.PSF070 {

    public String DATE_YYYYMM = "";
    //(ALL)
    public int QTY_RECEIVE_FIMS = 0;
    public int QTY_RECEIVE_FIMS_YELLOW = 0;
    public int QTY_RECEIVE_FIMS_WHITE = 0;
    public int QTY_RECEIVE_FIMS_MISSING = 0;
    //STATUS = 'L' (LINK)
    public int QTY_PENDING_FIMS = 0;
    //STATUS = '1' (PROCESS)
    public int QTY_PROCESS_FIMS = 0;
    public int QTY_PROCESS_CPNS = 0;
    public int QTY_PROCESS_CPNS_ON = 0;
    public int QTY_PROCESS_CPNS_OFF = 0;
    //STATUS = '1', W = '', Y = 1
    public int QTY_PENDING_FIMS_YELLOW = 0;
    public int QTY_PENDING_FIMS_YELLOW_ON = 0;
    public int QTY_PENDING_FIMS_YELLOW_OFF = 0;
    //STATUS = '1', W = 1, Y = ''
    public int QTY_PENDING_FIMS_WHITE = 0;
    public int QTY_PENDING_FIMS_WHITE_ON = 0;
    public int QTY_PENDING_FIMS_WHITE_OFF = 0;
    //STATUS = '1', (W = '', Y = 1) ó (W = 1, Y = '') ó (W = '1', Y = 1)
    public int QTY_PROCESS_SIRAX_PENDING_FIMS = 0;
    public int QTY_PROCESS_SIRAX_PENDING_CPNS = 0;
    //STATUS = '2', (W = '1', Y = '') ó (W = '', Y = '1') (SIRAX CONTROL)
    public int QTY_SIRAX_CONTROL_FIMS = 0;
    //STATUS = '2', W = '', Y = '1'
    public int QTY_SIRAX_CONTROL_FIMS_YELLOW = 0;
    //STATUS = '2', W = '1', Y = ''
    public int QTY_SIRAX_CONTROL_FIMS_WHITE = 0;
    //STATUS = '2' (W = '1', Y = '1') (SIRAX)
    public int QTY_SIRAX_FIMS = 0;
    public int QTY_SIRAX_CPNS = 0;
    //STATUS = 'C' (CLOSED)
    public int QTY_CLOSED_FIMS = 0;
    public int QTY_CLOSED_FIMS_YELLOW = 0;
    public int QTY_CLOSED_FIMS_WHITE = 0;
    public int QTY_CLOSED_CPNS = 0;
    public Double PERCENT = 0d;
    public long PENDIENTE = 0;
    public long PROCESADO = 0;
    public long ONLYYELLOW = 0;
    public long ONLYWHITE = 0;
    public long MATCH = 0;
    public long SIRAX = 0;
    public String RUTAIMG = "";
    public String RUTAIMGALT = "";
    public String yearFrom = "";
    public String yearTo = "";
    public String monthFrom = "";
    public String monthTo = "";
    public String dayFrom = "";
    public String dayTo = "";
    public String FECHAFORMAT = "";
    public String DESCRIPCION = "";
    public String TICKET = "";
    public long QTYDIAS30 = 0;
    public long QTYDIAS60 = 0;
    public long QTYDIAS90 = 0;
    public long QTYDIAS120 = 0;
    public long QTYDIASOTHERS = 0;
    public long QTYBASES = 0;
    public double PERCDIAS30 = 0;
    public double PERCDIAS60 = 0;
    public double PERCDIAS90 = 0;
    public double PERCDIAS120 = 0;
    public double PERCDIASOTHERS = 0;
    public String QUERY = "";
    public List lstTickets = new ArrayList(0);
    public int orden = 0;
    public String TIPO = "";
    public String strTICKET71 = "";
    public String strSTVAL = "";
   
    public String BACK = "";
    public long QTYCPN = 0;
    public long QTYOPEN = 0;
    public long QTYSIRAX = 0;
    
}
