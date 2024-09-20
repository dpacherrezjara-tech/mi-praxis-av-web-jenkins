package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.SPPL001Filter;

/**
 *
 * @author dvicente
 */
public interface ProcessLogLogic {
    MPS023Filter loadMPS023Filter(MPS023Filter filter) throws Exception;
    SPPL001Filter loadSPPL001Filter(SPPL001Filter filter) throws Exception;
}
