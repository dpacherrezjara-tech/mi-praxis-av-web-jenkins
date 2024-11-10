package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF140 {
    private String CCUST,CODPRO,BANDOC,VALDATE,IDCONT,FCONT,TIPOCON,
            STSAP,FECSAP,REFER,USCR,PGMCR,USUP,PGMUP;
    
    private Timestamp TSCR,TSUP;
    
    private String DESC_PRO;
}
