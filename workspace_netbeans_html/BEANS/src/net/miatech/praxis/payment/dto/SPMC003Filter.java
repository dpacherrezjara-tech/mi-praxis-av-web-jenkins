package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import net.miatech.praxis.payment.entities.A4451PK;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class SPMC003Filter {
    @Builder.Default
    List<A4451PK> response = new ArrayList<>();
}
