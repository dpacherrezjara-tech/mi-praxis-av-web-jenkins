package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;

/**
 *
 * @author dvicente
 */
public interface AccountingReportLogic {
    void loadSPACR001Filter(SPACR001Filter filter) throws Exception;
    SPACR002Filter loadSPACR002Filter(SPACR002Filter filter) throws Exception;
}
