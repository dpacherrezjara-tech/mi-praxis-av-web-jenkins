package net.miatech.utils;

import lombok.Data;
import java.util.Map;
import net.miatech.beans.Pagination;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author dvicente
 */
@Data
public class CustomPageImpl {
    @JsonIgnore
    private Pagination pagination = new Pagination();
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
    
    public void setPage() {
        int start = this.start == null ? 0 : Integer.parseInt(this.start);
        int limit = this.limit == null ? -1 : Integer.parseInt(this.limit);
        boolean excel = this.excel==null?false:this.excel;
        if (!excel) {
            this.getPagination().PAGROW = 20;
            this.getPagination().PAGNUM = (start / this.getPagination().PAGROW) + 1;
        } else {
            this.getPagination().PAGROW = -1;
            this.getPagination().PAGNUM = 1;
        }
        this.IO_PAGNUM = this.pagination.PAGNUM;
        this.IO_PAGROW = this.pagination.PAGROW;
        this.IO_TOTPAG = this.pagination.TOTPAG;
        this.IO_TOTROW = this.pagination.TOTROW;
    }
    
    public void setPageOut(Map<String,Object> obj){
        this.IO_PAGNUM = Integer.parseInt(obj.get("IO_PAGNUM").toString());
        this.IO_PAGROW = Integer.parseInt(obj.get("IO_PAGROW").toString());
        this.IO_TOTPAG = Integer.parseInt(obj.get("IO_TOTPAG").toString());
        this.IO_TOTROW = Integer.parseInt(obj.get("IO_TOTROW").toString());
        this.total = this.IO_TOTROW;
    }
}
