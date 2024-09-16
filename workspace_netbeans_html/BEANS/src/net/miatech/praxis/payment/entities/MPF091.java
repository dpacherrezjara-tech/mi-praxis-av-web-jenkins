package net.miatech.praxis.payment.entities;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MPF091 {
    private String CCUST,PRDA,CODPRO,CCUSTPRO,FLIQUIDACI,LIQUIDACIO,MERCHAND,
            MONEDA,MONEDALIQ,PAISLIQ,VALDATE,BANDOC,DATECI,TRANCI,ADATE,ACCCOMP,
            FSELEC,FECSELEC,USCR,FECR,HOCR,PGMCR,USUP,FEUP,HOUP,PGMUP,CODE,CORRL,
            CODIGO,TIPOARCH,MONEDAPAGO;
    private Double IMPORTE,IMPORTEPAG;
    
    //OTROS CAMPOS
    private String DESC_PRO;
}
