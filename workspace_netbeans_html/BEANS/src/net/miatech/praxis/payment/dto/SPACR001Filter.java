package net.miatech.praxis.payment.dto;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SPACR001Filter {
    private String IN_CCUST,IN_PRDAF,IN_PRDAT,IN_FCONT,IN_TIPOCON,IN_CODPRO;
    private Integer OUT_RES;
}
