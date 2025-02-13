package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author gnovoa
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountingInterface {
    private String cliente;
    private String fechaContable;
    private String proceso;
    private String codigoProcesador;
    private String corrlAV;
    private Integer fileNumber;
    private String fechaEnvio;
    private String horaEnvio;
    private String tipoConta;
    @JsonIgnore
    private String fileName;
    private List<String> interfase = new ArrayList<>();
}
