package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF133;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPRAC001Filter extends CustomPageImpl{
    private String IN_CCUST,IN_TDATE,IN_PRDAF,IN_PRDAT,IN_IDCONT,IN_BANDOC,
            IN_CODPRO,IN_TIPOCON,IN_REVORI,IN_USRV,IN_BPOMSG;
    List<MPF133> response = new ArrayList<>();
}
