package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF142;

/**
 *
 * @author dvicente
 */
@Data
public class SPRCC001Filter {
    private String IN_TIPO,IN_CODREC,IN_DESCR;
    List<MPF142> response = new ArrayList<>();
}
