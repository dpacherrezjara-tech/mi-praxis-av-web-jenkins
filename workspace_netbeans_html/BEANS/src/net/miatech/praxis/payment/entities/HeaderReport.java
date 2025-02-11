package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class HeaderReport {
    private String STSAP,IDCONT,TIPOCON,PERIOD,FCONT,HEADER,CODPRO,DESC_PRO;
    private Integer NEGOCIOS,TRNX;
}
