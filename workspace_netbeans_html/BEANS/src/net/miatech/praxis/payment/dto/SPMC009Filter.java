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
public class SPMC009Filter {
    private String IN_OPTION,IN_A4451CCUST,IN_A4451KEY1,IN_A4451KEY2,IN_A4451KEY3,IN_A4451DESC1,
            IN_A4451DESC2,IN_A4451STS,IN_A4451COMEN,IN_A4451SEQ,IN_A4451CORRL,IN_A4451TTABL;
}
