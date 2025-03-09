package net.miatech.praxis.payment.dto;

import java.util.List;
import java.util.Map;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CallStorePaggin {

    private Boolean success = true;
    private String library;
    private String procedure;
    private Map<String,Object> params;
    private List< Map<String, Object>> response;
    
    private int total;

    @JsonProperty("pagnum")
    private int IO_PAGNUM;
    @JsonProperty("pagrow")
    private int IO_PAGROW = 20;
    @JsonProperty("totpag")
    private int IO_TOTPAG = -1;
    @JsonProperty("totrow")
    private int IO_TOTROW = -1;
    
    public void setPage() {
        Integer start = Integer.valueOf(this.params.get("start").toString());
        if(this.params.containsKey("excel")){
            this.IO_PAGROW = -1;
            this.IO_PAGNUM = 1;
        }else{
            this.IO_PAGROW = 20;
            this.IO_PAGNUM = (start / this.IO_PAGROW) + 1;
        }
        
        params.put("IO_PAGNUM", this.IO_PAGNUM);
        params.put("IO_PAGROW", this.IO_PAGROW);
        params.put("IO_TOTPAG", this.IO_TOTPAG);
        params.put("IO_TOTROW", this.IO_TOTROW);
    }
    
    public void setPageOut(Map<String,Object> obj){
        this.IO_PAGNUM = Integer.parseInt(obj.get("IO_PAGNUM").toString());
        this.IO_PAGROW = Integer.parseInt(obj.get("IO_PAGROW").toString());
        this.IO_TOTPAG = Integer.parseInt(obj.get("IO_TOTPAG").toString());
        this.IO_TOTROW = Integer.parseInt(obj.get("IO_TOTROW").toString());
        this.total = this.IO_TOTROW;
    }
}
