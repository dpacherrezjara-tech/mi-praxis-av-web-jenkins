package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF133;
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
public class SPRAC001Filter extends CustomPageImpl{
    private String IN_CCUST ,IN_V_FROM ,IN_V_TO, IN_BANDOC, IN_IDCONT, IN_REVORI, IN_BPOMSG, IN_USRV;
    List<MPF133> response = new ArrayList<>();
}

