package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.SPHRP001Filter;
import net.miatech.praxis.payment.dto.SPHRP002Filter;
import net.miatech.praxis.payment.dto.SPHRP003Filter;
import net.miatech.praxis.payment.dto.SPHRP004Filter;
import net.miatech.praxis.payment.dto.SPHRP005Filter;
import net.miatech.praxis.payment.dto.SPHRP006Filter;

/**
 *
 * @author dvicente
 */
public interface HeadersReportLogic {
    SPHRP001Filter loadSPHRP001Filter(SPHRP001Filter filter) throws Exception;
    SPHRP002Filter loadSPHRP002Filter(SPHRP002Filter filter) throws Exception;
    void loadSPHRP003Filter(SPHRP003Filter filter) throws Exception;
    SPHRP004Filter loadSPHRP004Filter(SPHRP004Filter filter) throws Exception;
    SPHRP005Filter loadSPHRP005Filter(SPHRP005Filter filter) throws Exception;
    SPHRP006Filter loadSPHRP006Filter(SPHRP006Filter filter) throws Exception;
}
