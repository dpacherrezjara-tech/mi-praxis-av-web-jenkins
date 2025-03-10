package net.miatech.utils;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author dvicente
 */
@Data
public class GenericPageImpl {
    private String start;
    private String limit;
    private Boolean excel;
    private int total;
    
    @JsonProperty("pagnum")
    private int IO_PAGNUM;
    @JsonProperty("pagrow")
    private int IO_PAGROW;
    @JsonProperty("totpag")
    private int IO_TOTPAG;
    @JsonProperty("totrow")
    private int IO_TOTROW;
}
