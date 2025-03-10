package net.miatech.praxis.dao.widgets;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.widgets.GenericLogic;
import net.miatech.praxis.payment.dto.CallStoreFilter;
import net.miatech.praxis.payment.dto.CallStorePaggin;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 *
 * @author dvicente
 */
@Service
@Scope("request")
public class GenericDAO implements GenericLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    @Override
    public Map<String, Object> callStoreProcedure(CallStoreFilter filter) throws Exception {
        Map<String, Object> res = new HashMap<>();
        Map<String, Object> obj = new HashMap<>();
        if (filter.getParams().isEmpty()) {
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure());
        } else {
            MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
            //SqlParameterSource params = 
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        }
        List<List<Map<String, Object>>> listaDeResultados = new ArrayList<>();
        for (Object value : obj.values()) {
            if (value instanceof List) {
                listaDeResultados.add((List<Map<String, Object>>) value);
            }
        }
        res.put("lstRs", listaDeResultados);
        return res;
    }

    @Override
    public CallStorePaggin callStoreProcedurePaggin(CallStorePaggin filter) throws Exception {
        filter.setPage();
        MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
        Map<String, Object> obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        for (Object value : obj.values()) {
            if (value instanceof List) {
                filter.setResponse((List<Map<String, Object>>) value);
            }
        }
        filter.setPageOut(obj);
        return filter;
    }

    @Async
    @Override
    public Map<String, Object> callStoreProcedureAsync(CallStoreFilter filter) throws Exception {
        Map<String, Object> res = new HashMap<>();
        Map<String, Object> obj = new HashMap<>();
        if (filter.getParams().isEmpty()) {
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure());
        } else {
            MapSqlParameterSource params = new MapSqlParameterSource(filter.getParams());
            //SqlParameterSource params = 
            obj = jdbcUtils.executeSQP(filter.getLibrary(), filter.getProcedure(), params);
        }
        List<List<Map<String, Object>>> listaDeResultados = new ArrayList<>();
        for (Object value : obj.values()) {
            if (value instanceof List) {
                listaDeResultados.add((List<Map<String, Object>>) value);
            }
        }
        res.put("lstRs", listaDeResultados);
        return res;
    }

}
