package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF135 {
    private String IDCONT, 
            TIPOCON,
            TIPOERR,
            CCUST,  
            CODPRO, 
            BANDOC, 
            VALDATE,
            CERROR,
            DESCERR,
            STREV,  
            USUP,PGMUP;
    private Timestamp TSUP;
    private Integer QTYERR;
    
    private String DESC_PRO;
}
