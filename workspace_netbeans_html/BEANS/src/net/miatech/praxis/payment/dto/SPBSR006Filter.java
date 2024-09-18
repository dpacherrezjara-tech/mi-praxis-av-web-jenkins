package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import net.miatech.praxis.payment.entities.X3180;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPBSR006Filter {
    private String IN_CCUST,IN_BANDOC,IN_MERCHANT,
            IN_ADATE,IN_SOCIETY,IN_CODEBANK,IN_CUUID,
            IN_DATECI,IN_TRANCI,IN_CODPRO,IN_CCUSTPRO;
    @Builder.Default
    List<X3180> conciliation = new ArrayList<>();
    
    private Integer SQLRES;
    private String SQLMSG;
}
