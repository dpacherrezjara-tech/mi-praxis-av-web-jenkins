package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.dto.CalendarPhase2;
import net.miatech.praxis.payment.dto.SPIL001Filter;
import net.miatech.praxis.payment.dto.SPIL002Filter;
import net.miatech.praxis.payment.dto.SPIL003Filter;
import net.miatech.praxis.payment.dto.SPIL004Filter;
import net.miatech.praxis.payment.dto.SPIL005Filter;
import net.miatech.praxis.payment.dto.SPIL006Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;

/**
 *
 * @author dvicente
 */
public interface InputsPhase2Logic {
    
    SPMC002Filter loadSPMC002Filter() throws Exception;
    
    SPIL001Filter loadSPIL001Filter(SPIL001Filter filter) throws Exception;
    List<CalendarPhase2> loadSPIL002Filter(SPIL002Filter filter) throws Exception;
    SPIL003Filter loadSPIL003Filter(SPIL003Filter filter) throws Exception;
    SPIL004Filter loadSPIL004Filter(SPIL004Filter filter) throws Exception;
    SPIL005Filter loadSPIL005Filter(SPIL005Filter filter) throws Exception;
    SPIL006Filter loadSPIL006Filter(SPIL006Filter filter) throws Exception;
}
