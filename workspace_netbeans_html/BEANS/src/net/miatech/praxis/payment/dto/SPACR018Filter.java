package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPACR018Filter {
    private String IN_CCUST,IN_VALDATEF,IN_VALDATET,IN_CODPRO,IN_TIPO;
    List<EstadisticaContable> response = new ArrayList<>();
}
