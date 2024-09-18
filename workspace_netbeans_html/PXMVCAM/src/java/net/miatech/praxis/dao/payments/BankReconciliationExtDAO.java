package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.BankReconciliationExtLogic;
import net.miatech.praxis.payment.dto.MPS037Filter;
import net.miatech.praxis.payment.dto.SPBSR001Filter;
import net.miatech.praxis.payment.dto.SPBSR002Filter;
import net.miatech.praxis.payment.dto.SPBSR003Filter;
import net.miatech.praxis.payment.dto.SPBSR004Filter;
import net.miatech.praxis.payment.dto.SPBSR005Filter;
import net.miatech.praxis.payment.dto.SPBSR006Filter;
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
        lstMappers.add(new BeanPropertyRowMapper(MPF091.class));
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR005",
                params, lstMappers);
        filter.setResponse((List<MPF060>) obj.get("result0"));
        filter.setHeaders((List<MPF083>) obj.get("result1"));
        filter.setTaxes((List<MPF091>) obj.get("result2"));
        return filter;
    }

    @Override
    public SPBSR006Filter loadSPBSR006Filter(SPBSR006Filter filter) throws Exception {
        //<editor-fold defaultstate="collapsed" desc="SQL">
        final String sql = "INSERT INTO PRAXISMP.X3180 "
                + "VALUES"
                + "(:CCUST,:CODPRO,:CCUSTPRO,:PRDA,:ADATE,:FLIQUIDACI,:LIQUIDACIO,:MONEDA,:MONEDAPAGO,"
                + ":IMPORTE,:IMPORTEPAG,:TDOC,:SDATE,:SCOUNTRY,:CODEBANK,:SCARCOD,:SCARDN,:SAUTHOC,:SEQ,:SVFOP,:NETO,"
                + ":MONEDALIQ,:PAISLIQ,:CORRL,:CUUID,:TIPO,:SEQID,:TTABLA)";
        BeanPropertySqlParameterSource[] insertParams = new BeanPropertySqlParameterSource[filter.getConciliation().size()];
        for (int i = 0; i < filter.getConciliation().size(); i++) {
            insertParams[i] = new BeanPropertySqlParameterSource(filter.getConciliation().get(i));
        }
        //</editor-fold>
        jdbcUtils.executeNamedParam(sql, insertParams);
        System.out.println("Liquidaciones Cargadas");
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPBSR006",
                new BeanPropertySqlParameterSource(filter));
        
        filter.setSQLRES((Integer) obj.get("SQLRES"));
        filter.setSQLMSG((String) obj.get("SQLMSG"));
        
        return filter;
    }

    @Override
    public MPS037Filter loadMPS037Filter(MPS037Filter filter) throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "MPS037",
                new BeanPropertySqlParameterSource(filter));
        filter.setVSQLCODE((Integer) obj.get("VSQLCODE"));
        filter.setVMESSAGE((String) obj.get("VMESSAGE"));
        return filter;
    }
    
}
