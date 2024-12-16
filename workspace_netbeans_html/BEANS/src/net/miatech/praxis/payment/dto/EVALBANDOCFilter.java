package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class EVALBANDOCFilter {
    private String IN_BANDOC,IN_REFER;
    List<EvalBandocDto> response = new ArrayList<>();
}
