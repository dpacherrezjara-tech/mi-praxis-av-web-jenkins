package net.miatech.praxis.payment.entities;

import lombok.Data;
import net.miatech.beans.Pagination;

/**
 *
 * @author dvicente
 */
@Data
public class MPF122Filter {
    
    public Pagination page = new Pagination();
    
    private String PF122CCUST,PF122FPROC,PF122LIQUI,PF122FLIQU,PF122CMERC,PF122SCMER,PF122CARDN,
            PF122SAUTH,PF122SDATE,PF122STDOC,PF122LINE,PF122DATA,PF122ARCH,PF122CODER,PF122CAMPO,PF122TIPO,DESC_PRO;
    
    public String IN_PF122CCUST = "";
    public String IN_PF122FPROC = "";
    public String IN_PF122CODPR = "";
    public String IN_PF122CUSPR = "";
    public String IN_PF122FLIQU_FROM = "";
    public String IN_PF122FLIQU_TO = "";
    
    
    public String IN_PF122TIPO = "";
    public String IN_PF122LIQUI = "";
    public String IN_PF122FLIQU = "";
    public String IN_PF122CARDN = "";
    public String IN_PF122SDATE = "";
    public String IN_PF122CAMPO = "";
    public String IN_PF122DATA = "";
    public String IN_PF122SAUTH = "";
    public String IN_PF122CMERC = "";
   

    
    
    //DEL SISTEMA
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
}
