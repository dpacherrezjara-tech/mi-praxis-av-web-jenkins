package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF100 {

    private String CCUST,
            CCIA,
            FORMA,
            SERIE,
            TDOC,
            SEQ, CORRL, PRDA,
            PRDALQ,
            TRAN,
            STVAL, FLAGC, CFUENTE, COREP, CODPRO, CCUSTPRO, TDOCM, TRNCU,
            RDATE,
            TKVOID,
            SFLOAD,
            SCOUNTRY,
            SAGENT,
            SCONSOL,
            SDATE,
            SPNR,
            TVENTA, NEGOC, RFIC, RFIS1, MCLOS, SPAYMENT, SCARCOD, STCNTR, SCARDN,
            SCARDNCOR, SAUTHOC,
            SDATEXP,
            DPAYMEN, SCURRENCY, SCURREVEN,
            ADMNUM,
            NUMADM,
            STAADM, FADM, CURRADM, MERCHN, ENTRYMODE,
            DATEC,
            TRANC,
            DATCO, FREGLA, TIPOTAR, TDATE, DATEF, FADYEN, CODEBANK,
            BANDOC,
            BDATEL, BSTVAL, CREJEC, BAID, GENCON, STCON, FCONT, IDCONT,
            PERCONT,
            FAJUST,
            IDCADJ,
            BDATEP, BSTVALP, FNOBANK, INVOICE, FSELEC, FECSELEC, CERROR, DATET, STATT, DATEC2, DATEC3, UAUDIT,
            FASIGN,
            FAUDIT, FSEND, DSEND, FRCV, DRECIV, ACCNUMA,
            COSTCEN,
            USCR,
            FECR,
            HOCR,
            PGMCR,
            USUP,
            FEUP,
            HOUP,
            PGMUP;
    private Integer INSTPLA,
            INSTPAY, NAID;
    private Double SVFOPINST, SVFOP,
            AFARE,
            ATAX,
            AIVA,
            TOTAL, SVFOPUSD, TOTADM;

    private String DESC_PRO;
}
