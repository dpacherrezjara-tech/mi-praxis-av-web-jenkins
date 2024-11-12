package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF101;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPACR011Filter extends CustomPageImpl{
    private String IN_CCUST,IN_TIPOCON,IN_IDCONT,IN_FCONT;
    List<MPF101> response = new ArrayList<>();
}
