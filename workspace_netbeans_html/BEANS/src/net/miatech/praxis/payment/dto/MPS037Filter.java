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
public class MPS037Filter {
    private String VP_CCUST,VP_PRDA,VP_CODPRO,VP_CCUSTPRO,VP_BANDOC,VP_DATECI,VP_TRANCI,VP_FASE;
    
    //respuesta
    private Integer VSQLCODE;
    private String VMESSAGE;
}
