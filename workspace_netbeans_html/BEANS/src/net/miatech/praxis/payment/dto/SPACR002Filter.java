package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF134;
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
public class SPACR002Filter extends CustomPageImpl{
    private String IN_CCUST,IN_FCONTF,IN_FCONTT,IN_CODPRO,IN_TIPOCON,IN_STCONT,IN_IDCONT,IN_FILENAM;
    List<MPF134> response = new ArrayList<>();
}
