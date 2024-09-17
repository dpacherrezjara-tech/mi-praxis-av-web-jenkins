package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class X3180 {
    private String CCUST,CODPRO,CCUSTPRO,PRDA,ADATE,LIQUIDACIO,MONEDA,MONEDAPAG,
                    TDOC,SDATE,SCOUNTRY,CODEBANK,SCARCOD,SCARDN,SAUTHOC,SEQ,MONEDALIQ,
                    PAISLIQ,CORRL,CUUID,TIPO,TTABLA;
                    
    private Double IMPORTE,IMPORTPAG,SVFOP;
    private Integer SEQID;
}
