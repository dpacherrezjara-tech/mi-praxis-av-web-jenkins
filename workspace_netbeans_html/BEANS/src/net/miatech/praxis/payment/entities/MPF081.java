package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF081 {
    private String CCUST,CTIPO,FINGRESO,FVALOR,DESCRIPC,MONEDA,
            FSELECT,PRDA,CODPRO,CCUSTPRO,USCR,FECR,HOCR,USUP,FEUP,HOUP;
    private Double VCREDITO,VDEBITO,VBALANCE;
    private Integer CID;
}
