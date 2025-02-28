package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.MiscellaneousCatalogLogic;
import net.miatech.praxis.payment.dto.SPMC001Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.dto.SPMC003Filter;
import net.miatech.praxis.payment.dto.SPMC005Filter;
import net.miatech.praxis.payment.dto.SPMC008Filter;
import net.miatech.praxis.payment.dto.SPMC009Filter;
import net.miatech.praxis.payment.dto.SPMC010Filter;
import net.miatech.praxis.payment.entities.A2281;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.A4451PK;
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
public class MiscellaneousCatalogDAO implements MiscellaneousCatalogLogic {

    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";

    @Override
    public SPMC001Filter loadSPMC001Filter() throws Exception {
        List<BeanPropertyRowMapper> lstMappers = new ArrayList<>();
        BeanPropertyRowMapper mapper = new BeanPropertyRowMapper(A4451PK.class);
        BeanPropertyRowMapper mapper2 = new BeanPropertyRowMapper(A4451.class);
        BeanPropertyRowMapper mapper3 = new BeanPropertyRowMapper(A2281.class);
        BeanPropertyRowMapper mapper4 = new BeanPropertyRowMapper(MPF142.class);
        lstMappers.add(mapper);
        lstMappers.add(mapper);
        lstMappers.add(mapper);
        lstMappers.add(mapper);
        lstMappers.add(mapper2);
        lstMappers.add(mapper3);
        lstMappers.add(mapper4);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC001",
                lstMappers);
        SPMC001Filter filter = new SPMC001Filter();
        filter.setPROCESADORES((List<A4451PK>) obj.get("result0"));
        filter.setCIAS((List<A4451PK>) obj.get("result1"));
        filter.setPAISES((List<A4451PK>) obj.get("result2"));
        filter.setMONEDAS((List<A4451PK>) obj.get("result3"));
        filter.setCODPRO((List<A4451>) obj.get("result4"));
        filter.setCODEBANK((List<A2281>) obj.get("result5"));
        filter.setERRORES((List<MPF142>) obj.get("result6"));
        return filter;
    }

    @Override
    public SPMC002Filter loadSPMC002Filter() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC002",
                new BeanPropertyRowMapper(A4451.class));
        return SPMC002Filter.builder()
                .procesadores((List<A4451>) obj.get("result"))
                .build();
    }

    @Override
    public SPMC003Filter loadSPMC003Filter() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC003",
                new BeanPropertyRowMapper(A4451PK.class));
        return SPMC003Filter.builder()
                .response((List<A4451PK>) obj.get("result"))
                .build();
    }

    @Override
    public SPMC005Filter loadSPMC005Filter() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC005",
                new BeanPropertyRowMapper(A4451.class));
        return SPMC005Filter.builder()
                .response((List<A4451>) obj.get("result"))
                .build();
    }

    @Override
    public SPMC008Filter loadSPMC008Filter(SPMC008Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC008",params,
                new BeanPropertyRowMapper(A4451.class));
        filter.setResponse((List<A4451>) obj.get("result"));
        return filter;
    }

    @Override
    public void loadSPMC009Filter(SPMC009Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        jdbcUtils.executeSQP(LIBRARY, "SPMC009",params);
    }

    @Override
    public SPMC010Filter loadSPMC010Filter(SPMC010Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC010",params,
                new BeanPropertyRowMapper(A4451.class));
        List<A4451> lst = (List<A4451>) obj.get("result");
        filter.setResult(lst.get(0));
        return filter;
    }
    
    
}
