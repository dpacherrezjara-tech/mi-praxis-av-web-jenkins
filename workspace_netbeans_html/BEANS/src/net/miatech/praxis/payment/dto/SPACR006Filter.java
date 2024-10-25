package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF135;

/**
 *
 * @author dvicente
 */
@Data
public class SPACR006Filter {
    private String IN_IDCONT,IN_TIPO,IN_STREV,IN_CERROR;
    
    List<MPF135> response = new ArrayList<>();
}
