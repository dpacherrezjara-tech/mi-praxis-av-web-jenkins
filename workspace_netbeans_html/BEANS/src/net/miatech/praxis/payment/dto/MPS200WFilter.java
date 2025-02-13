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
public class MPS200WFilter {
    private String VP_CCUST,VP_CODPRO,VP_SDATE_INI,VP_SDATE_FIN;
}
