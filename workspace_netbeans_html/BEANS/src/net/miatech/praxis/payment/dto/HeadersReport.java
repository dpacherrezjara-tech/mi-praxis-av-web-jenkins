package net.miatech.praxis.payment.dto;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class HeadersReport {
    private String ACC_TYPE,PERIOD,POSTING_DATE,HEADER,GEN_DATE,CODE_PROCESSOR,FILE_NAME;
}
