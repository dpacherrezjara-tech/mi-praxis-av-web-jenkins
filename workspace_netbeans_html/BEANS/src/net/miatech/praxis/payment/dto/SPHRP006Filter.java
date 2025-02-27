package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF141;

/**
 *
 * @author dvicente
 */
@Data
public class SPHRP006Filter {
    private String IN_CCUST,IN_TIPOCON,IN_FSEND,IN_HSEND;
    List<MPF141> response = new ArrayList<>();
}
