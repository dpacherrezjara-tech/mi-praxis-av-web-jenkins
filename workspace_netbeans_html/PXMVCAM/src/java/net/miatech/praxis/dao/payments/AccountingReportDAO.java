package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.entities.MPF134;
import net.miatech.praxis.payment.entities.MPF135;
import net.miatech.praxis.payment.entities.X3183;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.praxis.utils.MailUtils;
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
public class AccountingReportDAO implements AccountingReportLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    @Autowired
    private MailUtils mailUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SPACR002Filter loadSPACR002Filter(SPACR002Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR002",
                params, new BeanPropertyRowMapper(MPF134.class));
        filter.setResponse((List<MPF134>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Async
    @Override
    public void loadSPACR001Filter(SPACR001Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPACR001",
                params, new BeanPropertyRowMapper(MPF134.class));
    }

    @Override
    public SPACR006Filter loadSPACR006Filter(SPACR006Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR006",
                params, new BeanPropertyRowMapper(MPF135.class));
        filter.setResponse((List<MPF135>) obj.get("result"));
        return filter;
    }

    @Override
    public SPACR007Filter loadSPACR007Filter(SPACR007Filter filter) throws Exception {
         SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR007",
                params, new BeanPropertyRowMapper(X3183.class));
        filter.setResponse((List<X3183>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSPACR005Filter(SPACR005Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPACR005",params);
    }
    
}
