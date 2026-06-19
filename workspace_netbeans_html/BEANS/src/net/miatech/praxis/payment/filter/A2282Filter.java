/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2282;
/**
 *
 * @author andrea
 */
public class A2282Filter extends A2282 {
     public String IN_ENTIY = "";
     public String IN_TKT = "";
     public String strFecha = "";
     public String strFecha2 = "";
     public String strDescrip = "";
     public String strDescrip2 = "";
     public String strDescrip3 = "";
     public String IN_DATE_FROM = "";
     public String IN_DATE_TO = "";
     public String IN_PERIOD = "";
     public double TOTdblAmount =0; 
     public double dblAmount =0; 
     
     public long RN = 0; 
     
     //datos del mpf
     public String SDATE = "";
     public String SAGENT = "";
     public String SAGENT_DESC = "";
     
     public String STVAL = "";
     public String SVFOP = "";
     public double QTYTRAN1 = 0; 
     public double QTYDOC = 0; 
     public double SVFOPS = 0; 
     public double SVFOPV = 0; 
     public double SVFOPT = 0; 
     public double SVFOPA = 0; 
     public double TOTALSVFOP = 0; 
     public String REFER = "";
     public String DATEC = "";
     public String TRANC = "";
     public String DATCO = "";
     public String FREGLA = "";
     
     //DATOS DEL MPF101
     public String TDOC = "";
     public String CERROR = "";
     public String SCOUNTRY = "";
     public String NEGOC = "";
     public String MERCHNC = "";
     public String SUCMERCH = "";
     public String SPNR = "";
     public String CODPRO = "";
     public String PRDA = "";
     public String PAYDATE = "";
     public String VALDATE = "";
     public String SCARCOD = "";
     public String SCARDN = "";
     public String SCARDNCOR = "";
     public String SAUTHOC = "";
     public String BANDOC = "";
     public String TERMI = "";
     public String ACCNUMBER = "";
     public double QTYTKT = 0; 
     public double NETO = 0; 
     public String SCURRENCY = "";
     public String STVALS = "";
     public String SDATES = "";
     public String DATECS = "";
     public String TRANCS = "";
     public String DATECI = "";
     public String TRANCI = "";
     public String DESCERR = "";
     public String DATECT = "";
     public String TRANCT = "";
     public String ADJUST = "";
     public String VMESSAGE = "";
     public int VSQLCODE = 0;
     public double SVFOPC = 0;
     
     
     public Pagination page = new Pagination();

    public String IN_COUNTRYS = "";
    public String IN_RBSP = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String CCIA = "";
    public String CIAAL = "";
    public String COUNTRYS = "";
    public String dscSCOUNTRY = "";
    public String RBSP = "";
    public String LANGU = "";
    public String LANGUC = "";
    public String USERCR = "";
    public String PASSCR = "";
    public String AIDOFIC = "";
    public String USERCRB = "";
    public String PASSCRB = "";
}