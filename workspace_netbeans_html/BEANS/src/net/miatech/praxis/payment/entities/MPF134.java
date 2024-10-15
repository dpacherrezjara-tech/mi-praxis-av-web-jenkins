package net.miatech.praxis.payment.entities;

import java.sql.Date;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF134 {
    private String CCUST,CODPRO,FCONT,HCONT,IDCONT,STCONT,PRDAF,PRDAT,USCR,PGMCR;
    
    private Integer QTYROWS,QTYERRS;
    
    private Date TSCR;
}
