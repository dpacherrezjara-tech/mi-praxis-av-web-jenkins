package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF134 {
    private String CCUST,CODPRO,FCONT,HCONT,IDCONT,STCONT,PRDAF,PRDAT,USCR,PGMCR,TIPOCON,DESC_PRO,FILENAM;
    
    private Integer QTYROWS,QTYERRS;
    
    private Timestamp TSCR;
}
