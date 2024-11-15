package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPACR017Filter {
    private String IN_CCUST,IN_IDCONT,IN_CUUID,IN_FUUID;
    @Builder.Default
    List<ExcelBandocDto> response = new ArrayList<>();
}
