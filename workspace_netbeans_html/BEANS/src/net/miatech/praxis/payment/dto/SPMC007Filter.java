package net.miatech.praxis.payment.dto;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPMC007Filter {
    private String IN_KEY3,IN_CORRL;
    
    private String STAT;
    
}
