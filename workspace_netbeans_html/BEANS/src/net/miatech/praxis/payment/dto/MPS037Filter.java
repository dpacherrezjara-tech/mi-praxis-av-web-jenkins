package net.miatech.praxis.payment.dto;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPS037Filter {
    private String VP_CODPRO,VP_CCUSTPRO,VP_BANDOC,VP_DATECI,VP_TRANCI;
    
    //respuesta
    private Integer VSQLCODE;
    private String VMESSAGE;
}
