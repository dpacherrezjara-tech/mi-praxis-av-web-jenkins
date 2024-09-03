package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPIL002Filter {
    private String IN_CCUST,IN_PRDAY,IN_CODPRO,IN_SEQPRO;
    private Integer NUM_FILES;
    private String STS;
    
    List<Map<String, String>> lstFechas = new ArrayList<>();
    
}
