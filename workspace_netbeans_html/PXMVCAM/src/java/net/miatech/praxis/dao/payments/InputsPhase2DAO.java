package net.miatech.praxis.dao.payments;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.logic.payments.InputsPhase2Logic;
import net.miatech.praxis.payment.dto.CalendarDateInfo;
import net.miatech.praxis.payment.dto.CalendarPhase2;
import net.miatech.praxis.payment.dto.DeliveryDto;
import net.miatech.praxis.payment.dto.SPIL001Filter;
import net.miatech.praxis.payment.dto.SPIL002Filter;
import net.miatech.praxis.payment.dto.SPIL003Filter;
import net.miatech.praxis.payment.dto.SPIL004Filter;
import net.miatech.praxis.payment.dto.SPIL005Filter;
import net.miatech.praxis.payment.dto.SPIL006Filter;
import net.miatech.praxis.payment.dto.SPIL007Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.MPF054;
import net.miatech.praxis.payment.entities.MPF089;
import net.miatech.praxis.payment.entities.MPF090;
import net.miatech.praxis.payment.entities.MPF126;
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
public class InputsPhase2DAO implements InputsPhase2Logic {

    @Autowired
    private JdbcUtils jdbcUtils;

    private static final String LIBRARY = "PRAXISMP";
    
    
    @Override
    public SPMC002Filter loadSPMC002Filter() throws Exception {
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPMC002", new BeanPropertyRowMapper(A4451.class));
        return SPMC002Filter.builder()
                .procesadores((List<A4451>) obj.get("result"))
                .build();
    }

    @Override
    public SPIL001Filter loadSPIL001Filter(SPIL001Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL001",
                params, new BeanPropertyRowMapper(MPF126.class));
        filter.setResponse((List<MPF126>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public List<CalendarPhase2> loadSPIL002Filter(SPIL002Filter filter) throws Exception {
        List<CalendarPhase2> result = new ArrayList<>();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL002", params);
        filter.setSTS((String) obj.get("STS"));
        if (filter.getSTS().equals("1")) {
            //obtiene listado de fechas activas
            filter.setLstFechas((List<Map<String, String>>) obj.get("#result-set-1"));
            //numero de archivos por procesador
            filter.setNUM_FILES((int) obj.get("NUM_FILES"));
            //listado de fechas agrupadas
            Map<String, List<Map<String, String>>> fechaPorProcesador = new HashMap<>();
            //agrupamiento de fechas
            for (Map<String, String> f : filter.getLstFechas()) {
                String fechaAgrupada = f.get("prda");
                if (!fechaPorProcesador.containsKey(fechaAgrupada)) {
                    fechaPorProcesador.put(fechaAgrupada, new ArrayList<>());
                }
                fechaPorProcesador.get(fechaAgrupada).add(f);
            }
            //obtiene las fechas del año
            List<LocalDate> fechas = this.obtenerFechasLaborales(Integer.parseInt(filter.getIN_PRDAY()));
            //valida fecha
            for (LocalDate fecha : fechas) {
                String fechaString = new StringBuilder()
                        .append(fecha.getYear())
                        .append(String.format("%02d", fecha.getMonthValue()))
                        .append(String.format("%02d", fecha.getDayOfMonth()))
                        .toString();
                CalendarPhase2 fechaStatus = CalendarPhase2.builder()
                        .fecha(fechaString)
                        .procesador(filter.getIN_CODPRO() + filter.getIN_SEQPRO())
                        .dayName(fecha.getDayOfWeek().name())
                        .build();

                if (!fechaPorProcesador.containsKey(fechaString)) {
                    fechaStatus.setStatus("not found");
                } else {
                    if (fechaPorProcesador.get(fechaString).size() != filter.getNUM_FILES()) {
                        fechaStatus.setStatus("incomplete");
                    } else {
                        fechaStatus.setStatus("ok");
                    }
                }
                result.add(fechaStatus);
            }
        }
        return result;
    }

    private List<LocalDate> obtenerFechasLaborales(int year) {
        LocalDate startDate = LocalDate.ofYearDay(year, 1);
        LocalDate endDate;
        if (year == LocalDate.now().getYear()) {
            endDate = LocalDate.now();
        } else {
            endDate = LocalDate.ofYearDay(year, 365); // O 366 si es bisiesto
        }
        LocalDate date = startDate;
        List<LocalDate> result = new ArrayList<>();
        //update: plopez comento que debe considerarse sabado y domingo
        while (!date.isAfter(endDate)) {
//            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
//                result.add(date);
//            }
            result.add(date);
            date = date.plusDays(1);
        }
        return result;
    }

    @Override
    public SPIL003Filter loadSPIL003Filter(SPIL003Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL003",
                params, new BeanPropertyRowMapper(MPF090.class));
        filter.setResponse((List<MPF090>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPIL004Filter loadSPIL004Filter(SPIL004Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL004",
                params, new BeanPropertyRowMapper(MPF089.class));
        filter.setResponse((List<MPF089>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPIL005Filter loadSPIL005Filter(SPIL005Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL005",
                params, new BeanPropertyRowMapper(MPF054.class));
        filter.setResponse((List<?>) obj.get("result"));
        return filter;
    }

    @Override
    public SPIL006Filter loadSPIL006Filter(SPIL006Filter filter) throws Exception {
        filter.setPage();
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL006",
                params, new BeanPropertyRowMapper(DeliveryDto.class));
        filter.setResponse((List<DeliveryDto>) obj.get("result"));
        filter.setPageOut(obj);
        return filter;
    }

    @Override
    public SPIL007Filter loadSPIL007Filter(SPIL007Filter filter) throws Exception {
        SqlParameterSource params = new BeanPropertySqlParameterSource(filter);
        Map<String, Object> obj = jdbcUtils.executeSQP(LIBRARY, "SPIL007",
                params, new BeanPropertyRowMapper(CalendarDateInfo.class));
        filter.setResponse((List<CalendarDateInfo>) obj.get("result"));
        return filter;
    }


}
