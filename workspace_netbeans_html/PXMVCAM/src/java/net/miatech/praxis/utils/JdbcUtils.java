package net.miatech.praxis.utils;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Consumer;
import javax.sql.DataSource;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.CustomJdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
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
        }
        catch(Exception ex){
            System.out.println("Error: " + ex.getMessage());
            throw ex;
        }
        finally {
            jdbcTemplate.getDataSource().getConnection().close();
        }

    }

    public void executeSQPStream(String library, String pgm,
                                  MapSqlParameterSource params,
                                  Consumer<Map<String, Object>> outValsConsumer,
                                  Consumer<Map<String, Object>> rowConsumer) throws Exception {
        CustomJdbcTemplate jdbcTemplate = this.getJdbcTemplate();
        final Map<String, Object> inParamValues = (params != null) ? params.getValues() : new HashMap<String, Object>();

        // allParams shared between creator and callback via closure
        // Object[]: [0]=name, [1]=sqlType(int), [2]=columnType(int)
        final List<Object[]> allParams = new ArrayList<>();

        jdbcTemplate.execute(
            conn -> {
                // Query metadata FIRST to know all params and their order
                DatabaseMetaData dbMeta = conn.getMetaData();
                Map<Integer, Object[]> byOrdinal = new TreeMap<>();
                ResultSet meta = dbMeta.getProcedureColumns(null, library, pgm, "%");
                try {
                    while (meta.next()) {
                        int colType = meta.getInt("COLUMN_TYPE");
                        // skip result-set columns, only process actual params
                        if (colType == DatabaseMetaData.procedureColumnResult) continue;
                        int ordinal = meta.getInt("ORDINAL_POSITION");
                        byOrdinal.put(ordinal, new Object[]{
                            meta.getString("COLUMN_NAME"),
                            meta.getInt("DATA_TYPE"),
                            colType
                        });
                    }
                } finally {
                    meta.close();
                }
                allParams.addAll(byOrdinal.values());

                // Build {call LIB.PGM(?,?,?)} with correct ? count
                StringBuilder callStr = new StringBuilder("{call ")
                        .append(library).append(".").append(pgm).append("(");
                for (int i = 0; i < allParams.size(); i++) {
                    if (i > 0) callStr.append(",");
                    callStr.append("?");
                }
                callStr.append(")}");
                return conn.prepareCall(callStr.toString());
            },
            (CallableStatementCallback<Void>) cs -> {
                // Set IN/INOUT params and register OUT/INOUT by position
                int idx = 1;
                for (Object[] p : allParams) {
                    String pName  = (String)  p[0];
                    int    pType  = (Integer) p[1];
                    int    colType = (Integer) p[2];

                    if (colType == DatabaseMetaData.procedureColumnIn
                     || colType == DatabaseMetaData.procedureColumnInOut) {
                        Object val = inParamValues.get(pName);
                        if (val != null) {
                            cs.setObject(idx, val);
                        } else {
                            cs.setNull(idx, pType);
                        }
                    }
                    if (colType == DatabaseMetaData.procedureColumnOut
                     || colType == DatabaseMetaData.procedureColumnInOut) {
                        cs.registerOutParameter(idx, pType);
                    }
                    idx++;
                }

                cs.setFetchSize(1000);
                cs.execute();

                // Capture OUT vals by position — call outValsConsumer BEFORE rows
                Map<String, Object> outVals = new HashMap<>();
                idx = 1;
                for (Object[] p : allParams) {
                    int colType = (Integer) p[2];
                    if (colType == DatabaseMetaData.procedureColumnOut
                     || colType == DatabaseMetaData.procedureColumnInOut) {
                        outVals.put((String) p[0], cs.getObject(idx));
                    }
                    idx++;
                }
                outValsConsumer.accept(outVals);

                // Stream result sets row by row — O(1) heap
                ResultSet rs = cs.getResultSet();
                if (rs != null) {
                    streamResultSet(rs, rowConsumer);
                }
                while (cs.getMoreResults()) {
                    rs = cs.getResultSet();
                    if (rs != null) {
                        streamResultSet(rs, rowConsumer);
                    }
                }
                return null;
            }
        );
    }

    private void streamResultSet(ResultSet rs, Consumer<Map<String, Object>> consumer) throws SQLException {
        ResultSetMetaData meta = rs.getMetaData();
        int colCount = meta.getColumnCount();
        String[] colNames = new String[colCount];
        for (int i = 1; i <= colCount; i++) {
            colNames[i - 1] = meta.getColumnLabel(i).toUpperCase();
        }
        while (rs.next()) {
            Map<String, Object> row = new LinkedHashMap<>(colCount * 2);
            for (int i = 1; i <= colCount; i++) {
                row.put(colNames[i - 1], rs.getObject(i));
            }
            consumer.accept(row);
        }
    }

    public void closeConnection(SimpleJdbcCall jdbcCall) throws Exception {
        Connection cnx = jdbcCall.getJdbcTemplate().getDataSource().getConnection();
        if (!cnx.isClosed()) {
            cnx.close();
        }
    }
}
