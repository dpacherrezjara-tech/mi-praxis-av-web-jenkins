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
public class SPPL001Filter extends CustomPageImpl{
    private String IN_CCUST,IN_PRDAF,IN_PRDAT,IN_CODPRO;
    List<?> response = new ArrayList<>();
}
