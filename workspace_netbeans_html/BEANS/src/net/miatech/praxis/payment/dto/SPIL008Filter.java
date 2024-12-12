package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF122Filter;

/**
 *
 * @author dvicente
 */
@Data
public class SPIL008Filter {
    private String IN_CCUST,IN_PRDA,IN_CODPRO;
    List<MPF122Filter> response = new ArrayList<>();
}
