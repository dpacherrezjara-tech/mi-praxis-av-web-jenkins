package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF137 {
    private String BANDOC,DATECI,TRANCI,CODREC,IDCONT,HEADER,TIPOCON,MODO,USCR;
    private Integer SEQNBR;
    private Timestamp TSCR;
    
    private String DESCR,VALDATE,REFER,CODPRO;
}
