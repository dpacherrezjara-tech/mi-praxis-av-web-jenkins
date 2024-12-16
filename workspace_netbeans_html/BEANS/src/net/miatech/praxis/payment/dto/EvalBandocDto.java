package net.miatech.praxis.payment.dto;

import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class EvalBandocDto {
    private String TABLA,CCUST,CODPRO,BANDOC,VALDATE,DATECI,TRANCI,STVAL,TDOC,TDOCORG,GENCON,CODIGO,REFER;
    private Integer CORRL,QTY,QTYTOT;
    private BigDecimal SVFOP,COMISION,NETO,COMISTOTA,RTEFUE,RTEIVA,RTEICA;
}
