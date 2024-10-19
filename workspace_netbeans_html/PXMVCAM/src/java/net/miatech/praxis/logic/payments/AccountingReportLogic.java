package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;

/**
 *
 * @author dvicente
 */
public interface AccountingReportLogic {
    void loadSPACR001Filter(SPACR001Filter filter) throws Exception;
    SPACR002Filter loadSPACR002Filter(SPACR002Filter filter) throws Exception;
    void loadSPACR005Filter(SPACR005Filter filter) throws Exception;
    SPACR006Filter loadSPACR006Filter(SPACR006Filter filter) throws Exception;
    SPACR007Filter loadSPACR007Filter(SPACR007Filter filter) throws Exception;
}
