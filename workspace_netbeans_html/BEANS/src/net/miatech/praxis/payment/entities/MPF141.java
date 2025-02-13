package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dpandal
 */

@Data
public class MPF141 {
    private String IDCONT, FCONT ,CCUST ,FSEND ,HSEND ,CODPRO ,CORRLAV ,USENV ,FILENAM ,USCR, DESC_PRO , STSAP, MODO;
    
    private Timestamp TSCR;
    
    private Integer  CORRL;
    
    // Otros
    private Integer RN;
}
