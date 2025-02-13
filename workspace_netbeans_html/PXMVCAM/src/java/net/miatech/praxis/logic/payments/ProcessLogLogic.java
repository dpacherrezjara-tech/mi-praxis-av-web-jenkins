package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.MPS200WFilter;
import net.miatech.praxis.payment.dto.SPPL001Filter;
import net.miatech.praxis.payment.dto.SPPL002Filter;

/**
 *
 * @author dvicente
 */
public interface ProcessLogLogic {
    MPS023Filter loadMPS023Filter(MPS023Filter filter) throws Exception;
    SPPL001Filter loadSPPL001Filter(SPPL001Filter filter) throws Exception;
    SPPL002Filter loadSPPL002Filter(SPPL002Filter filter) throws Exception;
    void loadMPS200WFilter(MPS200WFilter filter) throws Exception;
}
