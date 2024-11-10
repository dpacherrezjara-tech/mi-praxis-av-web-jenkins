package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.A4545;

/**
 *
 * @author dvicente
 */
@Data
public class SPACR013Filter {
    private String IN_CCUST,IN_IDCONT,IN_FCONT,IN_BANDOC,IN_REFER;
    List<A4545> response = new ArrayList<>();
}
