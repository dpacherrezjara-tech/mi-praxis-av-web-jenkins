package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.ProcessLogLogic;
import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.dto.SPPL001Filter;
import net.miatech.praxis.payment.entities.A4169;
import net.miatech.praxis.payment.entities.MPF121Filter;
import net.miatech.praxis.utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 *
 * @author dvicente
 */
@Service
@Scope("request")
public class ProcessLogDAO implements ProcessLogLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PRAXISMP";

    @Async
    @Override
    public MPS023Filter loadMPS023Filter(MPS023Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "MPS023",
                params);
        filter.setV_SQL_MESSAGE((String) obj.get("V_SQL_MESSAGE"));
        filter.setV_SQL_SQLCODE((String) obj.get("V_SQL_SQLCODE"));
        System.out.println("Response: " + filter.getV_SQL_MESSAGE());
        return filter;
    }

    @Override
    public SPMC001Filter loadSPMC001Filter() throws Exception {
        SPMC001Filter res = new SPMC001Filter();
        List<BeanPropertyRowMapper> mappers = new ArrayList<>();
        mappers.add(new BeanPropertyRowMapper(A4169.class));
        mappers.add(new BeanPropertyRowMapper(A4169.class));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC001",
                mappers);
        res.setProcesadores((List<A4169>) obj.get("result0"));
        res.setCias((List<A4169>) obj.get("result1"));
        return res;
    }

    @Override
    public SPPL001Filter loadSPPL001Filter(SPPL001Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPPL001",
                params,new BeanPropertyRowMapper(MPF121Filter.class));
        filter.setResponse((List<MPF121Filter>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }
    
}
