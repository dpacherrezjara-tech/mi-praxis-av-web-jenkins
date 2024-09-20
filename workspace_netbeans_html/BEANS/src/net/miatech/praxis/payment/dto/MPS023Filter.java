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
public class MPS023Filter {
    private String VP_CCUST, VP_PRDA, VP_CODPRO, VP_CCUSTPRO, VP_REPROCESAR;
    private String V_SQL_SQLCODE, V_SQL_MESSAGE;
}
