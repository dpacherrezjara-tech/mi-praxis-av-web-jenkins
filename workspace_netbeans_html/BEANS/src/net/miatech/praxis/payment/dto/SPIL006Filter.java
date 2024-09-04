package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPIL006Filter extends CustomPageImpl{
    private String IN_CCUST,IN_PRDA,IN_TYPE,IN_REG,IN_NTAB;
    List<?> response = new ArrayList<>();
}
