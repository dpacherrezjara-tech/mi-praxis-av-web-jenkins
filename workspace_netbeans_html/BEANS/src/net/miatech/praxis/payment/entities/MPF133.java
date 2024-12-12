package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF133 {
    private String  CCUST, VALDATE ,BANDOC  ,DATECI  ,TRANCI  ,REFER   ,CODPRO  ,IDCONT  ,TIPOCON ,REVORI  ,BPOMSG, USRV, PGMRV ;

    private Timestamp TSRV;
    
    //ADICIONALES
    private String DESC_PRO;
}
