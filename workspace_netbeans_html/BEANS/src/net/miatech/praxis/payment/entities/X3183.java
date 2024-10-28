package net.miatech.praxis.payment.entities;

import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class X3183 {
    private String IDCONT,  
                    TIPO,    
                    MENSAJE, 
                    CERROR,  
                    USUP,
                    PGMUP;
    private Timestamp TSUP;
}
