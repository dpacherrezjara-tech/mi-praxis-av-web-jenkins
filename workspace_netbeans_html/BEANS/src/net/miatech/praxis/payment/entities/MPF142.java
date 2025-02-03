package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF142 {
    private String CCUST,TIPO,CODREC,DESCR,USCR,USUP;
    private Timestamp TSCR,TSUP;
}
