package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPRAC001Filter;
import net.miatech.praxis.payment.dto.SPRAC002Filter;
import net.miatech.praxis.payment.dto.SPRAC003Filter;

/**
 *
 * @author dvicente
 */
public interface ReverseAccountingLogic {
    SPRAC001Filter loadSPRAC001Filter(SPRAC001Filter filter) throws Exception;
    void loadSPRAC002Filter(SPRAC002Filter filter) throws Exception;
    SPRAC003Filter loadSPRAC003Filter(SPRAC003Filter filter) throws Exception;
}
