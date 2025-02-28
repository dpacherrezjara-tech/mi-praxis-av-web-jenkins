package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.A4451;

/**
 *
 * @author dvicente
 */
@Data
public class SPMC008Filter {
    private String IN_CCUST,IN_KEY1,IN_KEY2,IN_KEY3,IN_DESC1,IN_DESC2,IN_STS,IN_COMEN;
    List<A4451> response = new ArrayList<>();
}
