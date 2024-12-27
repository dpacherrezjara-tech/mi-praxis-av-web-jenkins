package net.miatech.praxis.dao.payments;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import net.miatech.praxis.logic.payments.ProcessLogLogic;
import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.SPMC004Filter;
import net.miatech.praxis.payment.dto.SPPL001Filter;
import net.miatech.praxis.payment.dto.SPPL002Filter;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.MPF121Filter;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.praxis.utils.MailUtils;
import net.miatech.utils.Functions;
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
    
    @Autowired
    private MailUtils mailUtils;

    @Deprecated
    @Async
    @Override
    public MPS023Filter loadMPS023Filter(MPS023Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "MPS023",
                params);
        filter.setV_SQL_MESSAGE((String) obj.get("V_SQL_MESSAGE"));
        filter.setV_SQL_SQLCODE((String) obj.get("V_SQL_SQLCODE"));
        
        SPMC004Filter filterMisc = SPMC004Filter.builder()
                .VP_CODPRO(filter.getVP_CODPRO())
                .build();
        Map<String, Object> objCorreos = jdbcUtils.executeSQP(LIBRARY, "SPMC004",
                new BeanPropertySqlParameterSource(filterMisc),
                new BeanPropertyRowMapper(A4451.class));
        
        String codpro = objCorreos.get("OU_CODPRO").toString();
        
        List<A4451> resultCorreos = (List<A4451>) objCorreos.get("result");
        
        String emisor = "notificaciones@miatech.net"; // Data.EmailRe;
        
        List<String> receptores = resultCorreos.stream()
                .filter(c->c.getA4451SEQ().equals("TO"))
                .map(A4451::getA4451DESC1).map(String::trim)
                .collect(Collectors.toList());
        List<String> CC = resultCorreos.stream()
                .filter(c->c.getA4451SEQ().equals("CC"))
                .map(A4451::getA4451DESC1).map(String::trim)
                .collect(Collectors.toList());
        
        String asunto = "Medios de Pago AV - Proceso Fase 2 " + codpro + " " + Functions.getFechaActual();
        StringBuilder msg = new StringBuilder();
        msg.append("<b>Estimados(as):</b><br><br>");
        msg.append("Se termino proceso de Conciliacion Fase 2 del procesador ")
                .append(codpro).append(" ejecutado el dia ")
                .append(Functions.getFechaActual()).append("<br>");
        if(filter.getV_SQL_SQLCODE().equals("1")){
            msg.append("Mensaje: <b style=\"color:green\">").append(filter.getV_SQL_MESSAGE()).append("</b>");
        }else{
            msg.append("Mensaje: <b style=\"color:red\">").append(filter.getV_SQL_MESSAGE()).append("</b>");
        }
        msg.append("<br><br>").append("<b>Payments Control</b><br>")
            .append("<b>Miatech International</b><br><br>");
        try {
            mailUtils.sendMail(emisor, asunto, receptores, CC, msg.toString(), null, emisor);
        } catch (Exception e) {
            System.out.println("Email Error: " + e.getMessage());
        }
        
        System.out.println("Response: " + filter.getV_SQL_MESSAGE());
        return filter;
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

    @Override
    public SPPL002Filter loadSPPL002Filter(SPPL002Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPPL002",params);
        filter.setResponse((int) obj.get("OU_RES"));
        return filter;
    }
    
}
