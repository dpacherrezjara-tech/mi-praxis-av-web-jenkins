package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.dto.SPMC003Filter;

/**
 *
 * @author dvicente
 */
public interface MiscellaneousCatalogLogic {
    SPMC001Filter loadSPMC001Filter() throws Exception;
    SPMC002Filter loadSPMC002Filter() throws Exception;
    SPMC003Filter loadSPMC003Filter() throws Exception;
}
