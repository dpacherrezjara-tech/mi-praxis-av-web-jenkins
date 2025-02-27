package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.WeekHeader;

/**
 *
 * @author dvicente
 */
@Data
public class SPHRP005Filter {
    private String IN_TIPOCON,IN_PRDAF,IN_PRDAT;
    List<WeekHeader> response = new ArrayList<>();
}
