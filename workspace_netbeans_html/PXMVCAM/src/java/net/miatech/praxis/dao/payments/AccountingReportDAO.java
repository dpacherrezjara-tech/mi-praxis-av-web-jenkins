package net.miatech.praxis.dao.payments;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.ServletContext;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.EstadisticaContable;
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
import net.miatech.praxis.payment.dto.SPACR018Filter;
import net.miatech.praxis.payment.dto.SPACR019Filter;
import net.miatech.praxis.payment.dto.SPACR021Filter;
import net.miatech.praxis.payment.dto.SPACR024Filter;
import net.miatech.praxis.payment.dto.SPMC006Filter;
import net.miatech.praxis.payment.dto.SPMC007Filter;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.praxis.payment.entities.MPF101;
import net.miatech.praxis.payment.entities.MPF102;
import net.miatech.praxis.payment.entities.MPF134;
import net.miatech.praxis.payment.entities.MPF135;
import net.miatech.praxis.payment.entities.MPF140;
import net.miatech.praxis.payment.entities.MPF141;
import net.miatech.praxis.payment.entities.X3183;
import net.miatech.praxis.payment.entities.X3184;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.utils.JdbcUtils;
import net.miatech.praxis.utils.MailUtils;
import net.miatech.utils.MailImagePath;
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
    
    @Autowired
    private ServletContext servletContext;

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
        Map<String,Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR001",params);
        Integer bandocs = (Integer) obj.get("OUT_ROWS");
        SPMC006Filter paramsMisc = SPMC006Filter.builder().IN_CORRL("000").build();
        SqlParameterSource filterMisc = new BeanPropertySqlParameterSource(paramsMisc);
        Map<String, Object> objCorreos = jdbcUtils.executeSQP(LIBRARY, "SPMC006",
                filterMisc,new BeanPropertyRowMapper(A4451.class));
        
        List<A4451> resultCorreos = (List<A4451>) objCorreos.get("result");
        
        List<String> receptores = resultCorreos.stream()
                .filter(c->c.getA4451SEQ().equals("TO"))
                .map(A4451::getA4451DESC1).map(String::trim)
                .collect(Collectors.toList());
        List<String> CC = resultCorreos.stream()
                .filter(c->c.getA4451SEQ().equals("CC"))
                .map(A4451::getA4451DESC1).map(String::trim)
                .collect(Collectors.toList());
        
        String asunto = "Contabilidad " + formatTipocon(filter.getIN_TIPOCON()) + " " 
                + filter.getIN_CCUST() + " - " + filter.getIN_CODPRO();
        StringBuilder msg = new StringBuilder();
        msg.append("<html>");
        msg.append("<body>");
        msg.append("<p>Estimados,</p>");
        msg.append("<p>El proceso de Contabilidad ")
                .append(formatTipocon(filter.getIN_TIPOCON()))
                .append(" termino exitosamente con los siguientes resultados:</p>");
        msg.append("<table border=\"3\" style=\"width: 100%; border-collapse: collapse; border-style: solid; position: relative; height: 60px;\">" +
                "<tbody>" +
                "<tr style=\"height: 30px;\">" +
                "<td style=\"width: 37.678%; height: 30px; text-align: center; background-color: red; "
                + "font-weight: bold;\">Procesador</td>" +
                "<td style=\"width: 33.0081%; height: 30px; text-align: center; background-color: red; "
                + "font-weight: bold;\">Documentos</td>"
                + "</tr><tr style=\"height: 56px;\">");
        msg.append("<td style=\"width: 37.678%; height: 33px; text-align: center;\">")
                .append(filter.getIN_CCUST()).append("-")
                .append(filter.getIN_CODPRO()).append("</td>");
        msg.append("<td style=\"width: 33.0081%; height: 33px; text-align: center;\">")
                .append(bandocs).append("</td>");
        msg.append("</tr></tbody></table></div><div style=\"margin-top: 30px;\">");
        msg.append("<p>Saludos<br><b style=\"color:#295897;\">PAYMENTS CONTROL<br>Miatech International</b></p>")
                .append("<img src=\"cid:miatech1\" width=\"20%\" height=\"20%\" />")
                .append("<img src=\"cid:avianca1\" width=\"20%\" height=\"20%\"/>");
        msg.append("</div>");
        msg.append("</body>");
        msg.append("</html>");
        List<MailImagePath> imgPaths = new ArrayList<>();
        String current = servletContext.getRealPath("/");
        String dir = current + "resources\\img\\menu\\av\\";
        imgPaths.add(new MailImagePath(dir + "avianca_logo.png","avianca1"));
        imgPaths.add(new MailImagePath(dir + "logo_miatech3.png","miatech1"));
        try {
            mailUtils.sendMailWithImg(asunto, receptores, CC, msg.toString(), imgPaths,null);
        } catch (Exception e) {
            System.out.println("Email Error: " + e.getMessage());
        }
        
        System.out.println("Correo Enviado Exitosamente!");
    }
    
    String formatTipocon(String tipocon){
        String res = "";
        switch (tipocon) {
            case "REG":
                res = "Regular";
                break;
            case "DEB":
                res = "Debitos";
                break;
            case "ADJ":
                res = "Ajustes";
                break;
        }
        return res;
    }

    @Override
    public SPMC007Filter loadSPMC007Filter(SPMC007Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String,Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC007",params);
        filter.setSTAT((String) obj.get("OUT_STAT"));
        return filter;
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

    @Override
    public SPACR021Filter loadSPACR021Filter(SPACR021Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR021", params, 
                new BeanPropertyRowMapper(A4545.class));
        filter.setResponse((List<A4545>) obj.get("result"));
        return filter;
    }
    
    @Override
    public SPACR024Filter loadSPACR024Filter(SPACR024Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        System.out.println("before SPACR024...");
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR024", params, 
                new BeanPropertyRowMapper(MPF141.class));
        System.out.println("filtrando SPACR024...");
        filter.setResponse((List<MPF141>) obj.get("result"));
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
    
    @Override
    public SPACR018Filter loadSPACR018Filter(SPACR018Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR018",
                params, new BeanPropertyRowMapper(EstadisticaContable.class));
        filter.setResponse((List<EstadisticaContable>) obj.get("result"));
        return filter;
    }
    
    
    //</editor-fold>

    @Override
    public SPACR019Filter loadSPACR019Filter(SPACR019Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPACR019",
                params, new BeanPropertyRowMapper(MPF102.class));
        filter.setResponse((List<MPF102>) obj.get("result"));
        filter.setPageOut(obj);

        return filter;
    }

}
