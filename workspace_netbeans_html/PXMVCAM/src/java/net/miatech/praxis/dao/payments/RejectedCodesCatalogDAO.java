package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.RejectedCodesCatalogLogic;
import net.miatech.praxis.payment.dto.SPRCC001Filter;
import net.miatech.praxis.payment.dto.SPRCC002Filter;
import net.miatech.praxis.payment.entities.MPF142;
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
public class RejectedCodesCatalogDAO implements RejectedCodesCatalogLogic{
    
    @Autowired
    private JdbcUtils jdbcUtils;
    
    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SPRCC001Filter loadSPRCC001Filter(SPRCC001Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPRCC001",
                params, new BeanPropertyRowMapper(MPF142.class));
        filter.setResponse((List<MPF142>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSPRCC002Filter(SPRCC002Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPRCC002",params);
    }

}
