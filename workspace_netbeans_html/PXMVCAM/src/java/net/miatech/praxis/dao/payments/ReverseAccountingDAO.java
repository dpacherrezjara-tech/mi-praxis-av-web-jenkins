package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.ReverseAccountingLogic;
import net.miatech.praxis.payment.dto.SPRAC001Filter;
import net.miatech.praxis.payment.entities.MPF133;
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
public class ReverseAccountingDAO implements ReverseAccountingLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SPRAC001Filter loadSPRAC001Filter(SPRAC001Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPRAC001",
                params, new BeanPropertyRowMapper(MPF133.class));
        filter.setResponse((List<MPF133>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

}
