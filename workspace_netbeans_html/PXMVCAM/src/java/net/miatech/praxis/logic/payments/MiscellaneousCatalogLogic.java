package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.dto.SPMC003Filter;
import net.miatech.praxis.payment.dto.SPMC005Filter;
import net.miatech.praxis.payment.dto.SPMC008Filter;
import net.miatech.praxis.payment.dto.SPMC009Filter;
import net.miatech.praxis.payment.dto.SPMC010Filter;

/**
 *
 * @author dvicente
 */
public interface MiscellaneousCatalogLogic {
    SPMC001Filter loadSPMC001Filter() throws Exception;
    SPMC002Filter loadSPMC002Filter() throws Exception;
    SPMC003Filter loadSPMC003Filter() throws Exception;
    SPMC005Filter loadSPMC005Filter() throws Exception;
    SPMC008Filter loadSPMC008Filter(SPMC008Filter filter) throws Exception;
    void loadSPMC009Filter(SPMC009Filter filter) throws Exception;
    SPMC010Filter loadSPMC010Filter(SPMC010Filter filter) throws Exception;
}
