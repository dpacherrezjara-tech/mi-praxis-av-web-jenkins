package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF082 {
    private String CCUST,UUID,AFILIADO,LIQUIDAC,FECHA,FSELECT,PRDA,CODPRO,CCUSTPRO,USCR,FECR,HOCR,USUP,FEUP,HOUP;
    private Integer CID;
    private Double MONTO;
}
