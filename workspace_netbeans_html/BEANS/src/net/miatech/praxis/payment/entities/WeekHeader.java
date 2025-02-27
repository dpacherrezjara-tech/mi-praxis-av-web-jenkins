package net.miatech.praxis.payment.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class WeekHeader {
    private String CCUST,FSEND,HSEND;
    private Integer QTYPROCS;
}
