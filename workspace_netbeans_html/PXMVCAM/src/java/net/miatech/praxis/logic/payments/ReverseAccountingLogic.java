package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPRAC001Filter;

/**
 *
 * @author dvicente
 */
public interface ReverseAccountingLogic {
    SPRAC001Filter loadSPRAC001Filter(SPRAC001Filter filter) throws Exception;
}
