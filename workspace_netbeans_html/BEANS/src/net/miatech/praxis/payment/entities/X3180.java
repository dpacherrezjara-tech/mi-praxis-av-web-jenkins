package net.miatech.praxis.payment.entities;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class X3180 {
    private String CCUST,CODPRO,CCUSTPRO,PRDA,ADATE,FLIQUIDACI,LIQUIDACIO,MONEDA,MONEDAPAGO,
                    TDOC,SDATE,SCOUNTRY,CODEBANK,SCARCOD,SCARDN,SAUTHOC,SEQ,MONEDALIQ,
                    PAISLIQ,CORRL,CUUID,TIPO,TTABLA;
                    
    private Double IMPORTE,IMPORTEPAG,SVFOP,NETO;
    private Integer SEQID;
}
