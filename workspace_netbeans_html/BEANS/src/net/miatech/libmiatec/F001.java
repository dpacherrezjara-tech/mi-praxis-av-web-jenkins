/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.libmiatec;

/**
 *
 * @author rmayta
 */
public class F001 {
    public Boolean FOUND = false;
    /**
     * <pre>
        F001CSTID      3          COLHDG('CUSTOMER')
     * </pre>
     */
    public String F001CSTID = "";
    /**
     * F001NBRID     10S 0       COLHDG('NUMBER_ID')
     */
    public int F001NBRID = 0;
    /**
     * F001BLACD3     3          COLHDG('Billing_AirISO')
     */
    public String F001BLACD3 = "";
    /**
     * F001BDACD3     3          COLHDG('Billed_AirlISO')
     */
    public String F001BDACD3 = "";
    /**
     * F001INVNBA    10          COLHDG('Invoice Nbr_Air')
     */
    public String F001INVNBA = "";
    /**
     * F001COLCD3     3          COLHDG('Cur List/Eva_Alph')
     */
    public String F001COLCD3 = "";
    /**
     * F001COBCD3     3          COLHDG('Cur Billing_Alph')
     */
    public String F001COBCD3 = "";
    /**
     * F001IDECID    10          COLHDG('IDEC NBR')
     */
    public String F001IDECID = "";

    /*
     * **------------------**
     * **----DATOS SIS  ---**
     * **------------------**
     */

    /**
     * F001BLACD      4          COLHDG('Billing_Air_SIS')
     */
    public String F001BLACD = "";
    /**
     * F001BDACD      4          COLHDG('Billed_Air_SIS')
     */
    public String F001BDACD = "";
    /**
     * <pre>
        F001BILCD      1          COLHDG('Biling_Code')
        0=Non Sample Invoice
        3=Sample Form A/B Invoice
        4=Sample Form C   Invoice
        5=Sample Form D/E Invoice
        6=Sample Form F   Invoice
        7=Sample Form XF  Invoice
     * </pre>
     */
    public String F001BILCD = "";
    /**
     * F001INVNB     10          COLHDG('Invoice Nbr_SIS')<br>
     * <br>
        a)F001BILCD= 4 =>0000000000
     */
    public String F001INVNB = "";
    /**
     * F001BILDTY     4          COLHDG('Billing Date_Year')
     */
    public String F001BILDTY = "";
    /**
     * F001BILDTM     2          COLHDG('Billing Date_Mont')
     */
    public String F001BILDTM = "";
    /**
     * F001BILDTD     2          COLHDG('Billing Date_00')<br>
     * <br>
        a)F001BILCD= 4 =>00000000<br>
        b)F001BILCD<>4 =>YYYYMM00
     */
    public String F001BILDTD = "";
    /**
     * F001COLCD      3          COLHDG('Cur List/Eva_SIS')<br>
     * <br>
     *  a)ISO numeric Cur Code<br>
        b)F001BILCD=3/5/6/7 and<br>
            *F001SMTID=A/M  =>840-USD
     */
    public String F001COLCD = "";
    /**
     * F001COBCD      3          COLHDG('Cur Billing_SIS')<br>
     * <br>
        a)ISO numeric Cur Code<br>
        b)F001BILCD= 4 =>000<br>
            c)F001SMTID= I and<br>
            *BIL-zA&BID-zA  =>826-GBP<br>
            *BIL-zA&BID-zBCD=>840-USD<br>
            *BIL-zB         =>840-USD<br>
            *BIL-zC         =>840-USD<br>
            *BIL-zD&BID-zABC=>840-USD<br>
            *BIL-zD&BID-zD  =>978-EUR<br>
        d)F001SMTID= A/M and<br>
            *BIL-zABD       =>Error<br>
            *BIL-zC&BID-zABD=>840-USD<br>
            *BIL-zC&BID-zC  =>840-USD<br>
            ó*BIL-zC&BID-zC  =>124-CAD
     */
    public String F001COBCD = "";
    /*
     * F001PERNB      2          COLHDG('Period Number')<br>
     * <br>
        a)F001BILCD= 4 =>00
     */
    public String F001PERNB = "";
    /**
     * F001SMTID      1          COLHDG('Settlement Method')<br>
     * <br>
        I=ICH                       <br>
        A=ACH Billings              <br>
        M=ACH Inter-clear Billing   <br>
        or ACH Billlings RAM rule   <br>
        B=Bilateral Settlement      <br>
        N=No Settlement             <br>
        R=Adj. Due to Protest
     */
    public String F001SMTID = "";
    /**
     * F001DGSFL      1          COLHDG('Digital Signature')<br>
     * <br>
        Y=Yes                       <br>
        N=No                        <br>
        D=Defined in Profile SIS    <br>
        a)F001BILCD= 4 =>' '
     */
    public String F001DGSFL = "";
    /**
     * F001INVDTY     4          COLHDG('Invoice Date_Year')
     */
    public String F001INVDTY = "";
    /**
     * F001INVDTM     2          COLHDG('Invoice Date_Mont')
     */
    public String F001INVDTM = "";
    /**
     * F001INVDTD     2          COLHDG('Invoice Date_Day')<br>
     * <br>
        a)F001BILCD =4 =>00000000   <br>
        b)F001BILCD<>4 =>YYYYMMDD   <br>
        No será mayor que cierre de <br>
        periodo del calenario IATA.
     */
    public String F001INVDTD = "";
    /**
     * F001LTBRT     16S 5       COLHDG('Lst To Bill Rate') <br>
     * <br>
        a)F001BILCD= 4       =>zero <br>
        b)F001COLCD=F001COBCD=>1.00
     */
    public Double F001LTBRT = 0d;
    /**
     * F001PRVDTY     4          COLHDG('Prov Bil Dat_YYYY')
     */
    public String F001PRVDTY = "";
    /**
     * F001PRVDTM     2          COLHDG('Prov Bil Dat_MM')
     */
    public String F001PRVDTM = "";
    /**
     * F001PRVDTD     2          COLHDG('Prov Bil Dat_00')  <br>
     * <br>
        a)F001BILCD=0/3  =>00000000<br>
        b)F001BILCD=4/5/6/7 =>YYYYMM00
     */
    public String F001PRVDTD = "";
    /**
     * F001NFCFL      1          COLHDG('NIL Form C Indic') <br>
     * <br>
        a)F001BILCD<>4 =>' '        <br>
        b)F001BILCD =4 =>           <br>
        Y=provided by Sampl.Carrier <br>
        S=created by IS (OUT FILE)  <br>
        N=Has Form C coupons
     */
    public String F001NFCFL = "";
    /**
     * F001SPDFL      1          COLHDG('Suspended Flag')
     */
    public String F001SPDFL = "";
    /**
     * F001BLLID      7          COLHDG('Billing Air locID')
     */
    public String F001BLLID = "";
    /**
     * F001BDLID      7          COLHDG('Billed  Air locID')
     */
    public String F001BDLID = "";
    /**
     * F001INVTP      2          COLHDG('Invoice Type')    <br>
     * <br>
        a)F001BILCD= 4 =>' '        <br>
        b)F001BILCD<>4 =>           <br>
        IV=F002NETAM Inv.Positive   <br>
        CN=F002NETAM Inv.Negative
     */

    /*
     * *--DATOS DE AUDITORIA
     */
    
    public String F001INVTP = "";
    public String F001USIID = "";
    public String F001USIDT = "";
    public String F001USITM = "";
    public String F001USMID = "";
    public String F001USMDT = "";
    public String F001USMTM = "";
}
