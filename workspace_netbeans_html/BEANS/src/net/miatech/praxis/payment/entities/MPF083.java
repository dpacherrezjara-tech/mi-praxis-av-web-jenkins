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
public class MPF083 {
    private String CCUST,PRDA,CODPRO,CCUSTPRO,FLIQUIDACI,LIQUIDACIO,MERCHAND,MONEDA,
            MONEDALIQ,PAISLIQ,SDATE,
            VALDATE,BANDOC,DATECI,TRANCI,ADATE,ACCCOMP,ACCOUNT,FSELEC,FECSELEC,USCR,FECR,
            HOCR,PGMCR,USUP,FEUP,HOUP,PGMUP,TIPOARCH,MONEDAPAGO,STATUS,CODERR;
    
    private Double TOTAL,COMISION,CHARGEBK,FEESTAXS,MISCELNS,NETO,OTROS,IMPORTEPAG;
    
    //OTROS CAMPOS
    private String DESC_PRO;
}
