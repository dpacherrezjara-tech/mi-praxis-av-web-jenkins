package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.filter.SQP05233Filter;

/**
 *
 * @author dvicente
 */
public interface AccountingReportLogic {
    void loadSPACR001Filter(SPACR001Filter filter) throws Exception;
    SPACR002Filter loadSPACR002Filter(SPACR002Filter filter) throws Exception;
    SQP05233Filter loadSQP05233Filter(SQP05233Filter filter) throws Exception;
    void loadSPACR005Filter(SPACR005Filter filter) throws Exception;
    SPACR006Filter loadSPACR006Filter(SPACR006Filter filter) throws Exception;
    SPACR007Filter loadSPACR007Filter(SPACR007Filter filter) throws Exception;
    void loadSPACR008Filter(SPACR008Filter filter) throws Exception;
    void loadSPACR008FilterMasive(List<SPACR008Filter> lst) throws Exception;
    
}
