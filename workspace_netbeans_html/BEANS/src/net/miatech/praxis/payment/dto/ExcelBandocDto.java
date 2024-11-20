package net.miatech.praxis.payment.dto;

import lombok.Builder;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExcelBandocDto {
    private String CCUST,BANDOC,REFER,VALDATE,IDCONT,
            DATECI,TRANCI,
            DATEC,TRANC,
            TEXTD,CUUID,FUUID;
    
    //respuesta reverse
    private String STVAL;
            
}
