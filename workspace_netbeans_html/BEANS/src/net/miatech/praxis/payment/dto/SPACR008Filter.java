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
public class SPACR008Filter {
    private String IN_IDCONT,IN_BANDOC,IN_DATECI,IN_TRANCI,IN_REVORI,IN_BPOMSG;
}
