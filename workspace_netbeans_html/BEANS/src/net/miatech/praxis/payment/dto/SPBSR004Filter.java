package net.miatech.praxis.payment.dto;

import lombok.Data;
import net.miatech.praxis.payment.entities.MPF060;

/**
 *
 * @author dvicente
 */
@Data
public class SPBSR004Filter {
    private String IN_CCUST,IN_SDATE,IN_SCOUNTRY,IN_TDOC,IN_CODEBANK,IN_SCARCOD,IN_SCARDN,
            IN_SAUTHOC,IN_SEQ,IN_STVAL;
    private Double IN_SVFOP;
    MPF060 response = new MPF060();
}
