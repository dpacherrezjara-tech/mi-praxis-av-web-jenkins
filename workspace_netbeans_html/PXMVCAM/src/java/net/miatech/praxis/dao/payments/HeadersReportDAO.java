package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import net.miatech.praxis.logic.payments.HeadersReportLogic;
import net.miatech.praxis.payment.dto.HeadersReport;
import net.miatech.praxis.payment.dto.SPHRP001Filter;
import net.miatech.praxis.payment.dto.SPHRP002Filter;
import net.miatech.praxis.payment.dto.SPHRP003Filter;
import net.miatech.praxis.payment.dto.SPHRP004Filter;
import net.miatech.praxis.payment.entities.HeaderReport;
import net.miatech.praxis.payment.entities.MPF134;
import net.miatech.praxis.payment.entities.MPF137;
import net.miatech.praxis.payment.entities.MPF140;
import net.miatech.praxis.payment.entities.MPF141;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.utils.Functions;
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
public class HeadersReportDAO implements HeadersReportLogic {

    @Autowired
    private JdbcUtils jdbcUtils;
    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SPHRP001Filter loadSPHRP001Filter(SPHRP001Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPHRP001",
                params, new BeanPropertyRowMapper(HeaderReport.class));
        filter.setResponse((List<HeaderReport>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPHRP002Filter loadSPHRP002Filter(SPHRP002Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        List<BeanPropertyRowMapper> lstMappers = new ArrayList<>();
        lstMappers.add(new BeanPropertyRowMapper(MPF134.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF141.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF140.class));
        lstMappers.add(new BeanPropertyRowMapper(MPF137.class));
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPHRP002",
                params, lstMappers);
        filter.setHeader((List<MPF134>) obj.get("result0"));
        filter.setFiles((List<MPF141>) obj.get("result1"));
        filter.setBandocs((List<MPF140>) obj.get("result2"));
        filter.setRejections((List<MPF137>) obj.get("result3"));
        return filter;
    }

    @Override
    public void loadSPHRP003Filter(SPHRP003Filter filter) throws Exception {
        String cuuid = UUID.randomUUID().toString().replace("-", "");
        String fuuid = Functions.getFechaActual();
        System.out.println("Process: " + cuuid);
        filter.getDocuments().forEach(x->{
            x.setCUUID(cuuid);
            x.setFUUID(fuuid);
        });
        //<editor-fold defaultstate="collapsed" desc="SQL">
        final String sql = "INSERT INTO PRAXISMP.X3184"
                + "(CCUST,BANDOC,REFER,VALDATE,IDCONT,DATECI,TRANCI,DATEC,TRANC,TEXTD,CUUID,FUUID)"
                + "VALUES"
                + "(:CCUST,:BANDOC,:REFER,:VALDATE,:IDCONT,:DATECI,:TRANCI,:DATEC,:TRANC,"
                + ":TEXTD,:CUUID,:FUUID)";
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getDocuments().size()];
        for (int i = 0; i < filter.getDocuments().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getDocuments().get(i));
        }
        //</editor-fold>
        jdbcUtils.executeNamedParam(sql, insertParams);
        filter.setIN_CUUID(cuuid);
        filter.setIN_FUUID(fuuid);
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPHRP003",params);
    }

    @Override
    public SPHRP004Filter loadSPHRP004Filter(SPHRP004Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPHRP004",
                params, new BeanPropertyRowMapper(HeadersReport.class));
        filter.setResponse((List<HeadersReport>) obj.get("result"));
        return filter;
    }
}
