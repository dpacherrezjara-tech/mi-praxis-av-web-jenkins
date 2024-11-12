package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF133 {
    private String CCUST,  
                VALDATE,
                BANDOC, 
                CODPRO, 
                IDCONT, 
                TIPOCON,
                REVORI,
                BPOMSG,
                USRV,
                PGMRV;
    
    //ADICIONALES
    private String DESC_PRO;
}
