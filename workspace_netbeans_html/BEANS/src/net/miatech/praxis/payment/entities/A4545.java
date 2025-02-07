package net.miatech.praxis.payment.entities;

import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class A4545 {
    private String A4545CCUST, 
                A4545IDCON, 
                A4545BANCO, 
                A4545DOCBA, 
                A4545USER,  
                A4545COMPC,
                A4545DOCD, 
                A4545PSTGD,
                A4545TRASD,
                A4545DOCT, 
                A4545MODO,   
                A4545HEADE, 
                A4545REFD,  
                A4545PKEY, 
                A4545CUENT, 
                A4545TEXTD, 
                A4545REFK,  
                A4545REFK2, 
                A4545REFB,  
                A4545CCOST, 
                A4545PROFI,
                A4545CUSTO, 
                A4545CUR, 
                A4545MPAGO, 
                A4545REPAG, 
                A4545ANUMB, 
                A4545PLACE, 
                A4545AGENT, 
                A4545PAIS,  
                A4545FVTA, 
                A4545TCAR, 
                A4545DCONT,
                A4545COREP,
                A4545PRDA, 
                A4545CPRO, 
                A4545REGIS, 
                A4545FREGI, 
                A4545HREGI,
                A4545DATCI,
                A4545TRACI,
                A4545DATEC,
                A4545TRANC,
                A4545CCDIG,
                A4545CCAUTH,
                A4545CCDAT,
                A4545MERCH,
                A4545TSCR,
                A4545ADATE; 
                        
    private Integer A4545SEQ,A4545ITEM;
    private BigDecimal A4545ACTIV ,
                A4545PASIV; 
    
    //OTROS CAMPOS
    private String DESC_PRO;
    private Integer RN;
}
