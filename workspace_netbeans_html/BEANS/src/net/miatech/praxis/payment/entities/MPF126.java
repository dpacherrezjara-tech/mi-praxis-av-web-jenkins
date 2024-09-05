package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF126 {
    private String CCUST,PRDA,CODPRO,SEQPRO,MARCA,ESTADO,VRESULT,
            NTAB,USCR,FECR,HOCR,PGMCR,USUP,FEUP,HOUP;
    
    private Integer SEQ,TLINEA,QLINEA,TTRANS,TTRNSA,TTRNDB,TTRNEX,TARCHIVO,TARCHPRO,DIFFS;
    
    private String DESC_PRO;
}
