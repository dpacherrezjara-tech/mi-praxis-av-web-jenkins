package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.ExcelBandocDto;
import net.miatech.praxis.payment.entities.A4545;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.dto.SPACR011Filter;
import net.miatech.praxis.payment.dto.SPACR012Filter;
import net.miatech.praxis.payment.dto.SPACR013Filter;
import net.miatech.praxis.payment.dto.SPACR014Filter;
import net.miatech.praxis.payment.dto.SPACR015Filter;
import net.miatech.praxis.payment.dto.SPACR016Filter;
import net.miatech.praxis.payment.dto.SPACR017Filter;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.praxis.payment.entities.MPF101;
import net.miatech.praxis.payment.entities.MPF102;
import net.miatech.praxis.payment.entities.MPF134;
import net.miatech.praxis.payment.entities.MPF135;
import net.miatech.praxis.payment.entities.MPF140;
import net.miatech.praxis.payment.entities.X3183;
import net.miatech.praxis.payment.entities.X3184;
import net.miatech.praxis.payment.filter.SQP05233Filter;
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
public class AccountingReportDAO implements AccountingReportLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    @Autowired
    private MailUtils mailUtils;

    private static final String LIBRARY = "PRAXISMP";

    //<editor-fold defaultstate="collapsed" desc="Master Process">
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

    @Override
    public SQP05233Filter loadSQP05233Filter(SQP05233Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SQP05233", params, new BeanPropertyRowMapper(A4545.class));
        filter.setResponse((List<A4545>) obj.get("result"));
        //filter.setPageOut(obj);
        filter.OU_FILENAM = obj.get("OU_FILENAM").toString();
        filter.dbException.SQLCODE = obj.get("OU_SQLCODE").toString();
        filter.dbException.MESSAGE = obj.get("OU_MESSAGE").toString();
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
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR006",
                params, new BeanPropertyRowMapper(MPF135.class));
        filter.setResponse((List<MPF135>) obj.get("result"));
        return filter;
    }

    @Override
    public SPACR007Filter loadSPACR007Filter(SPACR007Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR007",
                params, new BeanPropertyRowMapper(X3183.class));
        filter.setResponse((List<X3183>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSPACR005Filter(SPACR005Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPACR005", params);
    }

    @Override
    public void loadSPACR008Filter(SPACR008Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPACR008", params);
    }

    @Override
    public void loadSPACR008FilterMasive(List<SPACR008Filter> lst) throws Exception {
        lst.forEach((SPACR008Filter obj) -> {
            SqlParameterSource params = new BeanPropertySqlParameterSource(obj);
            try {
                jdbcUtils.executeSQP(LIBRARY, "SPACR008", params);
            } catch (Exception ex) {
                System.out.println("Error: " + params);
            }
        });
    }

    @Override
    public SPACR011Filter loadSPACR011Filter(SPACR011Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR011",
                params, new BeanPropertyRowMapper(MPF101.class));
        filter.setResponse((List<MPF101>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }

    @Override
    public SPACR012Filter loadSPACR012Filter(SPACR012Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR012",
                params, new BeanPropertyRowMapper(MPF140.class));
        filter.setResponse((List<MPF140>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }

    @Override
    public SPACR013Filter loadSPACR013Filter(SPACR013Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR013",
                params, new BeanPropertyRowMapper(A4545.class));
        filter.setResponse((List<A4545>) obj.get("result"));
        return filter;
    }

    @Override
    public SPACR017Filter loadSPACR017Filter(SPACR017Filter filter) throws Exception {
        if(!filter.getRequest().isEmpty()){
            //<editor-fold defaultstate="collapsed" desc="SQL">
            final String sql = "INSERT INTO PRAXISMP.X3184 (BANDOC,REFER,VALDATE,CUUID,FUUID)"
                    + "VALUES"
                    + "(:BANDOC,:REFER,:VALDATE,:CUUID,:FUUID)";
            BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getRequest().size()];
            for (int i = 0; i < filter.getRequest().size(); i++) {
                insertParams[i] = new BeanPropertySqlParameterSource(filter.getRequest().get(i));
            }
            //</editor-fold>
            jdbcUtils.executeNamedParam(sql, insertParams);
        }
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR017",params,
                new BeanPropertyRowMapper(X3184.class));
        filter.setResponse((List<X3184>) obj.get("result"));
        return filter;
    }
    
    
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Accounting Report">
    @Override
    public SPACR014Filter loadSPACR014Filter(SPACR014Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR014",
                params, new BeanPropertyRowMapper(MPF102.class));
        filter.setResponse((List<MPF102>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }

    @Override
    public SPACR015Filter loadSPACR015Filter(SPACR015Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR015",
                params, new BeanPropertyRowMapper(MPF101.class));
        filter.setResponse((List<MPF101>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }

    @Override
    public SPACR016Filter loadSPACR016Filter(SPACR016Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR016",
                params, new BeanPropertyRowMapper(MPF091.class));
        filter.setResponse((List<MPF091>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }
    //</editor-fold>
}
