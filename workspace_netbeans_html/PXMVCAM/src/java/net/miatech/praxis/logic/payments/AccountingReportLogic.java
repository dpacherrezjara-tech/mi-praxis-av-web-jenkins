package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.dto.SPACR011Filter;
import net.miatech.praxis.payment.dto.SPACR012Filter;
import net.miatech.praxis.payment.dto.SPACR013Filter;
import net.miatech.praxis.payment.dto.SPACR014Filter;
import net.miatech.praxis.payment.dto.SPACR015Filter;
import net.miatech.praxis.payment.dto.SPACR016Filter;
import net.miatech.praxis.payment.filter.SQP05233Filter;

/**
 *
 * @author dvicente
 */
public interface AccountingReportLogic {
    //<editor-fold defaultstate="collapsed" desc="Master Process">
    void loadSPACR001Filter(SPACR001Filter filter) throws Exception;
    SPACR002Filter loadSPACR002Filter(SPACR002Filter filter) throws Exception;
    SQP05233Filter loadSQP05233Filter(SQP05233Filter filter) throws Exception;
    void loadSPACR005Filter(SPACR005Filter filter) throws Exception;
    SPACR006Filter loadSPACR006Filter(SPACR006Filter filter) throws Exception;
    SPACR007Filter loadSPACR007Filter(SPACR007Filter filter) throws Exception;
    void loadSPACR008Filter(SPACR008Filter filter) throws Exception;
    void loadSPACR008FilterMasive(List<SPACR008Filter> lst) throws Exception;
    SPACR011Filter loadSPACR011Filter(SPACR011Filter filter) throws Exception;
    SPACR012Filter loadSPACR012Filter(SPACR012Filter filter) throws Exception;
    SPACR013Filter loadSPACR013Filter(SPACR013Filter filter) throws Exception;
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Accounting Report">
    SPACR014Filter loadSPACR014Filter(SPACR014Filter filter) throws Exception;
    SPACR015Filter loadSPACR015Filter(SPACR015Filter filter) throws Exception;
    SPACR016Filter loadSPACR016Filter(SPACR016Filter filter) throws Exception;
//</editor-fold>
}
