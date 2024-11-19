package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import net.miatech.praxis.payment.entities.X3184;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPACR017Filter {
    private String IN_CCUST,IN_TIPOCON,IN_IDCONT,IN_CUUID,IN_FUUID;
    @JsonIgnore
    @Builder.Default
    List<ExcelBandocDto> request = new ArrayList<>();
    @Builder.Default
    List<X3184> response = new ArrayList<>();
}
