package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class MPF054 {
    private String 
            MF054CCUST,
            MF054TYPE,MF054FCOD,
            MF054IDFIL,MF054SQFIL,MF054PRDA,MF054REVN,MF054TPST,MF054FLNM,
            MF054NTAB ,MF054STREC,MF054STCAR,MF054UCARG,MF054FCARG,
            MF054HCARG,MF054REGIS,MF054FREGI,MF054HREGI,MF054REGVI,MF054FREVI,MF054HREVI;
    
    private Integer MF054TTRN,MF054TLIN,MF054QTRN,MF054QLIN;
    private String DESC_PRO;
}
