package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPIL005Filter {
    private String IN_CCUST,IN_PRDA,IN_CODPRO,IN_SEQPRO;
    List<?> response = new ArrayList<>();
}
