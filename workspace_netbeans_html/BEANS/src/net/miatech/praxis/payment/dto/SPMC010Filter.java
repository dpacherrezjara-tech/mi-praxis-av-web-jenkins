package net.miatech.praxis.payment.dto;

import lombok.Data;
import net.miatech.praxis.payment.entities.A4451;

/**
 *
 * @author dvicente
 */
@Data
public class SPMC010Filter {
    private String IN_A4451CCUST,IN_A4451KEY1,IN_A4451KEY2,IN_A4451KEY3,IN_A4451SEQ,IN_A4451CORRL;
    A4451 result = new A4451();
}
