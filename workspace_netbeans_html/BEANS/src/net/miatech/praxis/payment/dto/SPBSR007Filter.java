package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.utils.CustomPageImpl;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SPBSR007Filter extends CustomPageImpl{
    private String IN_CCUST,IN_TDATE,IN_PRDAF,IN_PRDAT,IN_CODPRO,IN_SEQPRO,IN_LIQUIDACIO,IN_MONEDA,IN_MONEDAPAGO,
            IN_MERCHANT,IN_BANDOC,IN_CODIGO,IN_FSELEC;
    private Double IN_IMPORTE,IN_IMPORTEPAG;
    List<MPF091> response = new ArrayList<>();
}
