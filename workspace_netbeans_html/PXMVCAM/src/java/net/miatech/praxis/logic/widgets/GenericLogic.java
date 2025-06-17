package net.miatech.praxis.logic.widgets;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.generics.RecordsFilter;
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
    void loadRecordsOnTable(String LIBRARY,String TABLE,List<RecordsFilter> lst) throws Exception;
}
