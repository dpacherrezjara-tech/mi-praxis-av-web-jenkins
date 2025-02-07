package net.miatech.praxis.logic.payments;


import net.miatech.praxis.payment.dto.SPRCC001Filter;
import net.miatech.praxis.payment.dto.SPRCC002Filter;

/**
 *
 * @author dvicente
 */
public interface RejectedCodesCatalogLogic {
    SPRCC001Filter loadSPRCC001Filter(SPRCC001Filter filter) throws Exception;
    void loadSPRCC002Filter(SPRCC002Filter filter) throws Exception;
}
