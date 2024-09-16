package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF060;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPBSR003Filter extends CustomPageImpl{
    private String IN_CCUST,IN_TDATE,IN_PRDAF,IN_PRDAT,IN_TDOC,IN_BANDOC,IN_CODPRO,IN_SEQPRO,IN_SCARDN,IN_SAUTHOC,
            IN_SCARCOD,IN_STVAL,IN_SCOUNTRY,IN_SCURRENCY,IN_MERCHANT;
    private Double IN_NETO;
    List<MPF060> response = new ArrayList<>();
}
