package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF060;
import net.miatech.praxis.payment.entities.MPF083;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.praxis.payment.entities.MPF102;

/**
 *
 * @author dvicente
 */
@Data
public class SPBSR002Filter {
    private String IN_CCUST,IN_ADATE,IN_SOCIETY,IN_CODEBANK,IN_BANDOC,
            IN_DATECI,IN_TRANCI,IN_CODPRO,IN_SEQPRO,IN_STVAL;
    MPF102 response = new MPF102();
    List<MPF083> headers = new ArrayList<>();
    List<MPF060> settlements = new ArrayList<>();
    List<MPF091> taxes = new ArrayList<>();
}
