package net.miatech.praxis.logic.widgets;

import java.util.Map;
import net.miatech.praxis.payment.dto.CallStoreFilter;
import net.miatech.praxis.payment.dto.CallStorePaggin;

/**
 *
 * @author dvicente
 */
public interface GenericLogic {
    Map<String,Object> callStoreProcedure(CallStoreFilter filter) throws Exception;
    Map<String,Object> callStoreProcedureAsync(CallStoreFilter filter) throws Exception;
    CallStorePaggin callStoreProcedurePaggin(CallStorePaggin filter) throws Exception;
}
