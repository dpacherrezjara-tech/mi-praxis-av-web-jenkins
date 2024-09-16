package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF090;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPIL003Filter extends CustomPageImpl{
    private String IN_CCUST,IN_PRDA,IN_CODPRO,IN_SEQPRO;
    List<MPF090> response = new ArrayList<>();
}
