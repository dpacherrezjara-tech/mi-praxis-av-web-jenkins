package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF060;
import net.miatech.praxis.payment.entities.MPF083;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.praxis.payment.entities.MPF102;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoadExcelEECC {
    MPF102 bankInfo = new MPF102();
    List<MPF083> headers = new ArrayList<>();
    List<MPF060> settlements = new ArrayList<>();
    List<MPF091> taxes = new ArrayList<>();
}
