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
public class MPF102 {
    private String CCUST,BANDOC,MERCHAND,STVAL,TTRAN,TDOC,SCOUNTRY,SDATE,VALDATE,
            ADATE,SCURRENCY,ACCOUNT,BENCENC,ACCCOMP,SOCIETY,CIACOME,REFER,CLAVE1,CLAVE3,TEXTO,TEXTOLAR,
            FUNDSTRGK,SCURRENCS,CODEBANK,COREP,CODPRO,CCUSTPRO,DATECI,TRANCI,FREGLA,
            STATUSC,CCNCFT,PRDA,CCNTRN,LOCRENCY2,CERROIN,CERROR,
            FSELEC,FECSELEC,USCR,FECR,HOCR,PGMCR,USUP,FEUP,HOUP,PGMUP;
    
    private Double NETO,NETOC,SVFOP,SVFOPS,SVFOPR,
            FAREO,COMMAMO,IVAAMOU,PROPAMO,RIVAAMO,RICAAMO,RFTEAMO,NETOAMO,LOCAMOUNT2,
            FAREC,SVFOPC,COMMAMOC,IVAAMOUC,PROPAMOC,RIVAAMOC,RICAAMOC,RFTEAMOC,NETOAMOC;
    
    private Integer QTYTRAN1,QTYTRAN3,QTYTKT,QTYTKTR;
    
    //DATOS ADICIONALES
    private String DESC_PRO,DESC_BANK,DESC_SPRO,FECSAP,STSAP,IDACC,FECACC,TIPOCON,HEADER,FILENAM,STACC;
    
    private Integer QTYLIQ1,QTYLIQ2,QTYGAS;
}
