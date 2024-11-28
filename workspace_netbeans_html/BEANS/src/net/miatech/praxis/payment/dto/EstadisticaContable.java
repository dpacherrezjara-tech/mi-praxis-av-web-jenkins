package net.miatech.praxis.payment.dto;

import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class EstadisticaContable {
    private String CCUST,PROCESSOR,DESC_PRO,VALDATE,LOCRENCY2;
    private BigDecimal TOTAL,V_ACCOUNTED,V_MATCH,V_MATCHF2,V_PENDING,V_NACCOUNTED,V_ACCOUNTED2;
    private Long QTY,T_ACCOUNTED,T_MATCH,T_MATCHF2,T_PENDING,T_NACCOUNTED,T_ACCOUNTED2;
}
