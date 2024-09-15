package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF060;
import net.miatech.praxis.payment.entities.MPF083;

/**
 *
 * @author dvicente
 */
@Data
public class SPBSR005Filter {
    private String IN_CCUST,IN_ADATEF,IN_ADATET,IN_CODPRO,IN_SEQPRO,IN_MERCHANT,IN_LIQUIDACIO,IN_SCARDN,IN_SAUTHOC,IN_SCARCOD;
    private Integer IN_TRAN;
    private Double IN_NETO,IN_IMPORTEPAG;
    
    List<MPF060> response = new ArrayList<>();
    List<MPF083> headers = new ArrayList<>();
}
