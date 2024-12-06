package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF134 {
    private String CCUST,CODPRO,FCONT,HCONT,IDCONT,STCONT,PRDAF,PRDAT,USCR,PGMCR,TIPOCON,DESC_PRO,FILENAM,FSEND;
    
    private Integer QTYROWS,QTYERRS,TOTRECS,TOTREG,TOTDEB,TOTADJ,QTYFILE;
    
    private Timestamp TSCR;
}
