package net.miatech.praxis.payment.entities;

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
public class X3184 {
    private String CCUST,BANDOC,REFER,VALDATE,IDCONT,DATECI,TRANCI,DATEC,TRANC,TEXTD,CUUID,FUUID;
}
