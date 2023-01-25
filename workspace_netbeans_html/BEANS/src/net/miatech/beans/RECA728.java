package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class RECA728 implements Serializable {
    
    private String strCCUST;
    private String A728AIRLIN;
    private String A728NROPRT;
    private String A728CIA;
    private String A728NRODOC;
    private String A728CUPON;
    private String A728CODIT;
    private String A728MONREG;
    private String A728RUTAO;
    private String A728RUTAD;
    private String A728SECOR;
    private String A728SECDS;
    private String A728CARRA1;
    private String A728MONSYS;
    private String A728FECVTA;
    private String A728NVLO1;
    private String A728FVLO1;
    private String A728REVISA;
    private String A728FORMA;
    private String A728SERIE;
    private String A728SEQ;
    private String A728AIRFAC;
    private String A728FECFAC;
    private String A728MDAATB;
    private String A728REGIST;
    private String A728FREGIS;
    private String A728BOOK;
    private double A728FARE1;
    private double A728FACT1;
    private double A728PROV1;
    private double A728PPRO1;
    private double A728AJUST1;
    private double A728ACUE1;
    private double A728SS1;
    private double A728VALOR1;
    private double A728ACUEO1;
    private double A728VLMPA1;
    private double A728ATBP;
    private double A728TOTVAL;
    private String A728TFARE1;
    private boolean booIsRutaFim;
    private String strYearF;
    private String strYearT;
    private String strMonthF;
    private String strMonthT;
    private String strDayF;
    private String strDayT;
    private double A728VLSRP1;
    private String A728MONEDA;
    private double dblProfitability;
    private String A728INDPR1;
    private String A728BOOKI1;
    //Campos del A1402 (Comentarios)
    private String strTEXT1;
    private String strTEXT2;
    private String strOpcionPr;

    private boolean isRutaFim;
    
    /** Creates a new instance of RECA728 */
    public RECA728() {
        
        A728AIRLIN = "";
        A728NROPRT = "";
        A728CIA = "";
        A728NRODOC = "";
        A728CUPON = "";
        A728CODIT = "";
        A728MONREG = "";        
        A728RUTAO = "";
        A728RUTAD = "";
        A728VALOR1 = 0;
        A728SECOR = "";
        A728SECDS = "";
        A728ACUEO1 = 0;
        A728MONSYS = "";
        A728AIRFAC = "";
        A728FECFAC = "";
        A728MDAATB = "";
        A728REGIST = "";
        A728FREGIS = "";
        A728BOOK = "";
        A728SS1 = 0;
        A728FARE1 = 0;
        A728TFARE1 = "";
        A728FACT1 = 0;
        A728PROV1 = 0;
        A728PPRO1 = 0;
        A728AJUST1 = 0;
        A728ACUE1 = 0;
        booIsRutaFim = false;
        strYearF = "";
        strYearT = "";
        strMonthF = "";
        strMonthT = "";
        strDayF = "";
        strDayT = "";
        A728VLSRP1 = 0;
        A728MONEDA = "";
        dblProfitability = 0;
        A728INDPR1 = "";
        A728BOOKI1 = "";
        strTEXT1 = "";
        strTEXT2 = "";
        strOpcionPr = "";
    }

    /**
     * Holds value of property strCCUST.
     */

    public String getStrCCUST() {
        return this.strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    /**
     * Holds value of property A728AIRLIN.
     */
    
    public String getA728AIRLIN() {
        return this.A728AIRLIN;
    }
    public void setA728AIRLIN(String A728AIRLIN) {
        this.A728AIRLIN = A728AIRLIN;
    }
    
    /**
     * Holds value of property A728NROPRT.
     */

    public String getA728NROPRT() {
        return this.A728NROPRT;
    }

    public void setA728NROPRT(String A728NROPRT) {
        this.A728NROPRT = A728NROPRT;
    }
    
    /**
     * Holds value of property A728CIA.
     */

    public String getA728CIA() {
        return this.A728CIA;
    }

    public void setA728CIA(String A728CIA) {
        this.A728CIA = A728CIA;
    }    
    
    /**
     * Holds value of property A728NRODOC.
     */

    public String getA728NRODOC() {
        return this.A728NRODOC;
    }

    public void setA728NRODOC(String A728NRODOC) {
        this.A728NRODOC = A728NRODOC;
    }    
    
    /**
     * Holds value of property A728CUPON.
     */

    public String getA728CUPON() {
        return this.A728CUPON;
    }

    public void setA728CUPON(String A728CUPON) {
        this.A728CUPON = A728CUPON;
    }
    
    /**
     * Holds value of property A728CODIT.
     */

    public String getA728CODIT() {
        return this.A728CODIT;
    }

    public void setA728CODIT(String A728CODIT) {
        this.A728CODIT = A728CODIT;
    }   
    
    /**
     * Holds value of property A728MONREG.
     */

    public String getA728MONREG() {
        return this.A728MONREG;
    }

    public void setA728MONREG(String A728MONREG) {
        this.A728MONREG = A728MONREG;
    } 
    
    /**
     * Holds value of property A728RUTAO.
     */

    public String getA728RUTAO() {
        return this.A728RUTAO;
    }

    public void setA728RUTAO(String A728RUTAO) {
        this.A728RUTAO = A728RUTAO;
    } 
    
    /**
     * Holds value of property A728RUTAD.
     */

    public String getA728RUTAD() {
        return this.A728RUTAD;
    }

    public void setA728RUTAD(String A728RUTAD) {
        this.A728RUTAD = A728RUTAD;
    } 
    
    /**
     * Holds value of property A728VALOR1.
     */

    public double getA728VALOR1() {
        return this.A728VALOR1;
    }

    public void setA728VALOR1(double A728VALOR1) {
        this.A728VALOR1 = A728VALOR1;
    }
    
    /**
     * Holds value of property A728SECOR.
     */

    public String getA728SECOR() {
        return this.A728SECOR;
    }

    public void setA728SECOR(String A728SECOR) {
        this.A728SECOR = A728SECOR;
    }
    
    /**
     * Holds value of property A728SECDS.
     */

    public String getA728SECDS() {
        return this.A728SECDS;
    }

    public void setA728SECDS(String A728SECDS) {
        this.A728SECDS = A728SECDS;
    }
    
    /**
     * Holds value of property A728ACUEO1.
     */

    public double getA728ACUEO1() {
        return this.A728ACUEO1;
    }

    public void setA728ACUEO1(double A728ACUEO1) {
        this.A728ACUEO1 = A728ACUEO1;
    }
    
    /**
     * Holds value of property A728CARRA1.
     */

    public String getA728CARRA1() {
        return this.A728CARRA1;
    }

    public void setA728CARRA1(String A728CARRA1) {
        this.A728CARRA1 = A728CARRA1;
    }
    
    /**
     * Holds value of property A728VLMPA1.
     */

    public double getA728VLMPA1() {
        return this.A728VLMPA1;
    }

    public void setA728VLMPA1(double A728VLMPA1) {
        this.A728VLMPA1 = A728VLMPA1;
    }
    
    /**
     * Holds value of property A728ATBP.
     */

    public double getA728ATBP() {
        return this.A728ATBP;
    }

    public void setA728ATBP(double A728ATBP) {
        this.A728ATBP = A728ATBP;
    }
    
    /**
     * Holds value of property isRutaFim.
     */

    public boolean getIsRutaFim() {
        return this.isRutaFim;
    }

    public void setIsRutaFim(boolean isRutaFim) {
        this.isRutaFim = isRutaFim;
    }
    
    /**
     * Holds value of property A728MONSYS.
     */

    public String getA728MONSYS() {
        return this.A728MONSYS;
    }

    public void setA728MONSYS(String A728MONSYS) {
        this.A728MONSYS = A728MONSYS;
    }
    
    /**
     * Holds value of property A728TOTVAL.
     */

    public double getA728TOTVAL() {
        return this.A728TOTVAL;
    }

    public void setA728TOTVAL(double A728TOTVAL) {
        this.A728TOTVAL = A728TOTVAL;
    }
    
    /**
     * Holds value of property A728FECVTA.
     */

    public String getA728FECVTA() {
        return this.A728FECVTA;
    }

    public void setA728FECVTA(String A728FECVTA) {
        this.A728FECVTA = A728FECVTA;
    }
    
    /**
     * Holds value of property A728NVLO1.
     */

    public String getA728NVLO1() {
        return this.A728NVLO1;
    }

    public void setA728NVLO1(String A728NVLO1) {
        this.A728NVLO1 = A728NVLO1;
    }
    
    /**
     * Holds value of property A728FVLO1.
     */

    public String getA728FVLO1() {
        return this.A728FVLO1;
    }

    public void setA728FVLO1(String A728FVLO1) {
        this.A728FVLO1 = A728FVLO1;
    }
    
    /**
     * Holds value of property A728REVISA.
     */

    public String getA728REVISA() {
        return this.A728REVISA;
    }

    public void setA728REVISA(String A728REVISA) {
        this.A728REVISA = A728REVISA;
    }
    
    /**
     * Holds value of property A728FORMA.
     */

    public String getA728FORMA() {
        return this.A728FORMA;
    }

    public void setA728FORMA(String A728FORMA) {
        this.A728FORMA = A728FORMA;
    }
    
    /**
     * Holds value of property A728SERIE.
     */

    public String getA728SERIE() {
        return this.A728SERIE;
    }

    public void setA728SERIE(String A728SERIE) {
        this.A728SERIE = A728SERIE;
    }
    
    /**
     * Holds value of property A728SEQ.
     */

    public String getA728SEQ() {
        return this.A728SEQ;
    }

    public void setA728SEQ(String A728SEQ) {
        this.A728SEQ = A728SEQ;
    }

    public String getA728AIRFAC() {
        return A728AIRFAC;
    }

    public void setA728AIRFAC(String A728AIRFAC) {
        this.A728AIRFAC = A728AIRFAC;
    }

    public String getA728FECFAC() {
        return A728FECFAC;
    }

    public void setA728FECFAC(String A728FECFAC) {
        this.A728FECFAC = A728FECFAC;
    }

    public String getA728MDAATB() {
        return A728MDAATB;
    }

    public void setA728MDAATB(String A728MDAATB) {
        this.A728MDAATB = A728MDAATB;
    }

    public String getA728REGIST() {
        return A728REGIST;
    }

    public void setA728REGIST(String A728REGIST) {
        this.A728REGIST = A728REGIST;
    }

    public String getA728FREGIS() {
        return A728FREGIS;
    }

    public void setA728FREGIS(String A728FREGIS) {
        this.A728FREGIS = A728FREGIS;
    }

    public String getA728BOOK() {
        return A728BOOK;
    }

    public void setA728BOOK(String A728BOOK) {
        this.A728BOOK = A728BOOK;
    }

    public double getA728SS1() {
        return A728SS1;
    }

    public void setA728SS1(double A728SS1) {
        this.A728SS1 = A728SS1;
    }

    public double getA728FARE1() {
        return A728FARE1;
    }

    public void setA728FARE1(double A728FARE1) {
        this.A728FARE1 = A728FARE1;
    }

    public String getA728TFARE1() {
        return A728TFARE1;
    }

    public void setA728TFARE1(String A728TFARE1) {
        this.A728TFARE1 = A728TFARE1;
    }

    public double getA728FACT1() {
        return A728FACT1;
    }

    public void setA728FACT1(double A728FACT1) {
        this.A728FACT1 = A728FACT1;
    }

    public double getA728PROV1() {
        return A728PROV1;
    }

    public void setA728PROV1(double A728PROV1) {
        this.A728PROV1 = A728PROV1;
    }

    public double getA728PPRO1() {
        return A728PPRO1;
    }

    public void setA728PPRO1(double A728PPRO1) {
        this.A728PPRO1 = A728PPRO1;
    }

    public double getA728AJUST1() {
        return A728AJUST1;
    }

    public void setA728AJUST1(double A728AJUST1) {
        this.A728AJUST1 = A728AJUST1;
    }

    public double getA728ACUE1() {
        return A728ACUE1;
    }

    public void setA728ACUE1(double A728ACUE1) {
        this.A728ACUE1 = A728ACUE1;
    }

    public boolean isBooIsRutaFim() {
        return booIsRutaFim;
    }

    public void setBooIsRutaFim(boolean booIsRutaFim) {
        this.booIsRutaFim = booIsRutaFim;
    }

    public String getStrYearF() {
        return strYearF;
    }

    public void setStrYearF(String strYearF) {
        this.strYearF = strYearF;
    }

    public String getStrYearT() {
        return strYearT;
    }

    public void setStrYearT(String strYearT) {
        this.strYearT = strYearT;
    }

    public String getStrMonthF() {
        return strMonthF;
    }

    public void setStrMonthF(String strMonthF) {
        this.strMonthF = strMonthF;
    }

    public String getStrMonthT() {
        return strMonthT;
    }

    public void setStrMonthT(String strMonthT) {
        this.strMonthT = strMonthT;
    }

    public String getStrDayF() {
        return strDayF;
    }

    public void setStrDayF(String strDayF) {
        this.strDayF = strDayF;
    }

    public String getStrDayT() {
        return strDayT;
    }

    public void setStrDayT(String strDayT) {
        this.strDayT = strDayT;
    }

    public double getA728VLSRP1() {
        return A728VLSRP1;
    }

    public void setA728VLSRP1(double A728VLSRP1) {
        this.A728VLSRP1 = A728VLSRP1;
    }

    public String getA728MONEDA() {
        return A728MONEDA;
    }

    public void setA728MONEDA(String A728MONEDA) {
        this.A728MONEDA = A728MONEDA;
    }

    public double getDblProfitability() {
        return dblProfitability;
    }

    public void setDblProfitability(double dblProfitability) {
        this.dblProfitability = dblProfitability;
    }

    public String getA728INDPR1() {
        return A728INDPR1;
    }

    public void setA728INDPR1(String A728INDPR1) {
        this.A728INDPR1 = A728INDPR1;
    }

    public String getA728BOOKI1() {
        return A728BOOKI1;
    }

    public void setA728BOOKI1(String A728BOOKI1) {
        this.A728BOOKI1 = A728BOOKI1;
    }

    public String getStrTEXT1() {
        return strTEXT1;
    }

    public void setStrTEXT1(String strTEXT1) {
        this.strTEXT1 = strTEXT1;
    }

    public String getStrTEXT2() {
        return strTEXT2;
    }

    public void setStrTEXT2(String strTEXT2) {
        this.strTEXT2 = strTEXT2;
    }

    public String getStrOpcionPr() {
        return strOpcionPr;
    }

    public void setStrOpcionPr(String strOpcionPr) {
        this.strOpcionPr = strOpcionPr;
    }
    
    
}
