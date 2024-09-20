package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.dto.MPS037Filter;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
import net.miatech.praxis.payment.dto.SPBSR006Filter;

/**
 *
 * @author dvicente
 */
public interface BankReconciliationExtLogic {
    SPBSR001Filter loadSPBSR001Filter(SPBSR001Filter filter) throws Exception;
    SPBSR002Filter loadSPBSR002Filter(SPBSR002Filter filter) throws Exception;
    SPBSR003Filter loadSPBSR003Filter(SPBSR003Filter filter) throws Exception;
    SPBSR004Filter loadSPBSR004Filter(SPBSR004Filter filter) throws Exception;
    SPBSR005Filter loadSPBSR005Filter(SPBSR005Filter filter) throws Exception;
    SPBSR006Filter loadSPBSR006Filter(SPBSR006Filter filter) throws Exception;
    MPS037Filter loadMPS037Filter(MPS037Filter filter) throws Exception;
}
