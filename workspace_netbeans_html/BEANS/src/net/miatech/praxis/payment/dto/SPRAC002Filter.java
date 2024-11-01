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
public class SPRAC002Filter {
    private String IN_CCUST,IN_CODPRO,IN_BANDOC,IN_REFER,IN_VALDATE,IN_REVORI,IN_IDCONT,IN_BPOMSG;
}
