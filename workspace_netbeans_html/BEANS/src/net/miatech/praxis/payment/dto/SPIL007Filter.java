package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPIL007Filter {
    private String IN_CCUST,IN_CODPRO,IN_SEQPRO,IN_PRDA;
    private Integer NUM_FILES;
    private String STS;
    List<?> response = new ArrayList<>();
}
