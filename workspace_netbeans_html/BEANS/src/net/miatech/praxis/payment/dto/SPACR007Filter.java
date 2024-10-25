package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.X3183;

/**
 *
 * @author dvicente
 */
@Data
public class SPACR007Filter {
    private String IN_IDCONT;
    List<X3183> response = new ArrayList<>();
}
