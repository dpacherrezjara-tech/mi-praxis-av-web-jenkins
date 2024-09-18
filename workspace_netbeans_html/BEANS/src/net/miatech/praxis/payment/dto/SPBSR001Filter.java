package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF102;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPBSR001Filter extends CustomPageImpl{
    private String IN_TDATE,IN_CCUST,IN_PRDAF,IN_PRDAT,
            IN_CODEBANK,IN_MERCHANT,IN_BANDOC,IN_STVAL,IN_TDOC,IN_SCOUNTRY,IN_SCURRENCY,
            IN_TEXTOLAR,IN_LOCRENCY2,IN_CODPRO,IN_SEQPRO,IN_COREP,IN_REFER;
    private Double IN_NETO,IN_LOCAMOUNT2;
    List<MPF102> response = new ArrayList<>();
}
