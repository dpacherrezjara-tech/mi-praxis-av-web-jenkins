package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.BankReconciliationExtLogic;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.entities.A2281;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.A4451PK;
import net.miatech.praxis.payment.entities.MPF060;
import net.miatech.praxis.payment.entities.MPF083;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.praxis.payment.entities.MPF102;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

/**
 *
 * @author dvicente
 */
@Service
@Scope("request")
public class BankReconciliationExtDAO implements BankReconciliationExtLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";
    
    @Override
    public SPBSR001Filter loadSPBSR001Filter(SPBSR001Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR001",
                params, new BeanPropertyRowMapper(MPF102.class));
        filter.setResponse((List<MPF102>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPBSR002Filter loadSPBSR002Filter(SPBSR002Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        List<BeanPropertyRowMapper> lstMappers = new ArrayList<>();
        lstMappers.add(new BeanPropertyRowMapper(MPF102.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF083.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF060.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF091.class));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR002",
                params, lstMappers);
        List<MPF102> res = (List<MPF102>) obj.get("result0");
        if(!res.isEmpty()){
            filter.setResponse(res.get(0));
            //si no es pendiente obtiene info match
            if(!res.get(0).getSTVAL().equals("3")){
                filter.setHeaders((List<MPF083>) obj.get("result1"));
                filter.setSettlements((List<MPF060>) obj.get("result2"));
                filter.setTaxes((List<MPF091>) obj.get("result3"));
            }
        }
        return filter;
    }

    @Override
    public SPBSR003Filter loadSPBSR003Filter(SPBSR003Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR003",
                params, new BeanPropertyRowMapper(MPF060.class));
        filter.setResponse((List<MPF060>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPBSR004Filter loadSPBSR004Filter(SPBSR004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR004",
                params, new BeanPropertyRowMapper(MPF060.class));
        List<MPF060> res = (List<MPF060>) obj.get("result");
        if(!res.isEmpty()){
            filter.setResponse(res.get(0));
        }
        return filter;
    }

    @Override
    public SPBSR005Filter loadSPBSR005Filter(SPBSR005Filter filter) throws Exception {
        List<BeanPropertyRowMapper> lstMappers = new ArrayList<>();
        lstMappers.add(new BeanPropertyRowMapper(MPF060.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF083.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR005",
                params, lstMappers);
        filter.setResponse((List<MPF060>) obj.get("result0"));
        filter.setHeaders((List<MPF083>) obj.get("result1"));
        return filter;
    }
    
}
