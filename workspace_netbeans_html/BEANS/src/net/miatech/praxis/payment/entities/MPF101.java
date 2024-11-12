package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF101 {

    private String CCUST,
            TDOC,
            STVAL,
            SCOUNTRY,
            FTE,
            SDATE,
            SAGENT,
            NEGOC,
            MERCHNC, SUCMERCH, SPNR, CODPRO, CCUSTPRO, PRDA,
            TDOCORG,
            PAYDATE, VALDATE, TIPOTAR, SCARCOD, SCARDN, SCARDNCOR, SAUTHOC,
            SDATEXP, SOCIETY, CODEBANK, COREP, SOCIETYL, BANDOC, SEQ,
            TERMI, GENCON, STCON, FCONT, IDCONT,
            IDCDEB,
            IDCADJ,
            ACCNUMBER, PERCONT, FDEBIT, FAJUST, RED, DATEF, FREGLA, SCURRENCY, FLOAD, LDATE, TDATE, SORIG, REASONREJ, RECORDSTS,
            BSTVAL, BDATEP, BAID, SDATE1, SAUTHOC1, SCARCOD1, FLOADE, LDATEE, EMISOR, STATUSC, SDATEC, DEBTYPE, STVALS,
            SDATES,
            DATECS, TRANCS,
            DATECI,
            TRANCI,
            DATEC,
            TRANC,
            DATCO,
            DATET, CCNCFT, CCNTRN, CERROIN, CERROR, FSELEC, FECSELEC, FUNDSTRGR, FUNDSTRGK, CHARNBR,
            STVALCHG, UAUDIT, ORDERID, CCIA, FORMA, SERIE, LIQUIDACIO, MONEDAPAGO, ACCNUMA,
            STATT,
            USCR,
            FECR,
            HOCR,
            PGMCR,
            USUP,
            FEUP,
            HOUP,
            PGMUP;

    private Integer QTYTKT, TRAN, QTYDOC;

    private Double SVFOP, IVA, PROPINA, COMISION,
            COMISTOTA, BASEFUE, RTEIVA, BASICA,
            RTEICA, NETO, FAREO, SVFOPC, SVFOPD, IVAC, PROPINAC, COMISIOC, BASEFUEC, RTEFUEC, RTEIVAC,
            BASICAC,
            RTEICAC,
            NETOC, FAREC, FAREDIFFC, COMMFAREC, COMMDIFFC, ADMTOTAL, RATECOM, COMISION1, IMPORTEPAG;

    private String DESC_PRO;
    
    //campos externos
    private Integer QTYSALE;
    private Double QTYSUM;
}
