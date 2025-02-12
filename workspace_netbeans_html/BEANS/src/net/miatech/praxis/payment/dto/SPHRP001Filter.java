package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.HeaderReport;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPHRP001Filter extends CustomPageImpl{
    private String IN_CCUST,IN_TIPOCON,IN_DATEF,IN_DATET,IN_CODPRO,IN_HEADER,IN_STSAP;
    List<HeaderReport> response = new ArrayList<>();
}
