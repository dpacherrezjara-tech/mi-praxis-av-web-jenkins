package net.miatech.praxis.utils;

import java.sql.Connection;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.CustomJdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("session")
public class JdbcUtils {

    @Autowired
    private CurrentSession session;

    public CustomJdbcTemplate getJdbcTemplate() throws Exception {
        Connection cnx = session.getServerSession().getCNXIBMDB2().getIBMDB2Connection();
        DataSource ds = new SingleConnectionDataSource(cnx, false);
        return new CustomJdbcTemplate(ds);
    }

    public NamedParameterJdbcTemplate getNamedParameter() throws Exception {
        return new NamedParameterJdbcTemplate(this.getJdbcTemplate());
    }

    public SimpleJdbcCall getJdbcCall() throws Exception {
        return new SimpleJdbcCall(this.getJdbcTemplate());
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM, SqlParameterSource params, BeanPropertyRowMapper mapper) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM)
                .returningResultSet("result", mapper);
        return jdbcTemplate.executeWithParams(spCall, params);
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM, SqlParameterSource params) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM);
        return jdbcTemplate.executeWithParams(spCall, params);
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM, BeanPropertyRowMapper mapper) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM)
                .returningResultSet("result", mapper);
        return jdbcTemplate.executeWithoutParams(spCall);
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM, SqlParameterSource params,
            List<BeanPropertyRowMapper> mappers) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM);
        for (int i = 0; i < mappers.size(); i++) {
            spCall.returningResultSet("result" + i, mappers.get(i));
        }
        return jdbcTemplate.executeWithParams(spCall, params);
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM, List<BeanPropertyRowMapper> mappers) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM);
        for (int i = 0; i < mappers.size(); i++) {
            spCall.returningResultSet("result" + i, mappers.get(i));
        }
        return jdbcTemplate.executeWithoutParams(spCall);
    }

    public Map<String, Object> executeSQPwithoutLog(String LIBRARY, String PGM, SqlParameterSource params) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM);
        return jdbcTemplate.executeWithParamsWLog(spCall, params);
    }

    public Map<String, Object> executeSQP(String LIBRARY, String PGM) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        SimpleJdbcCall spCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName(LIBRARY)
                .withProcedureName(PGM);
        return jdbcTemplate.executeWithoutParams(spCall);
    }

    public int[] executeNamedParam(String sql, BeanPropertySqlParameterSource[] params) throws Exception {
        JdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
        try {
            return namedParameterJdbcTemplate.batchUpdate(sql, params);
        } finally {
            jdbcTemplate.getDataSource().getConnection().close();
        }

    }

    public void closeConnection(SimpleJdbcCall jdbcCall) throws Exception {
        Connection cnx = jdbcCall.getJdbcTemplate().getDataSource().getConnection();
        if (!cnx.isClosed()) {
            cnx.close();
        }
    }
}
