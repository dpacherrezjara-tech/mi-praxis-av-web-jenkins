package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;

/**
 *
 * @author dvicente
 */
public interface BankReconciliationExtLogic {
    SPBSR001Filter loadSPBSR001Filter(SPBSR001Filter filter) throws Exception;
    SPBSR002Filter loadSPBSR002Filter(SPBSR002Filter filter) throws Exception;
}
