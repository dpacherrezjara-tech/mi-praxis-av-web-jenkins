package net.miatech.praxis.payment.dto;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPPL002Filter {
    private String VP_CCUST;
    int response;
}
