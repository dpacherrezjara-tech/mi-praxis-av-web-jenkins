package net.miatech.praxis.logic.payments;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DataImportMonitoringDAO;
import net.miatech.praxis.payment.MPFER90;
import java.lang.reflect.Type;
import net.miatech.praxis.RobotLiveDTO;
import org.springframework.web.client.RestTemplate;

@Service
public class DataImportMonitoringLogic {

    private final DataImportMonitoringDAO Dataimport = new DataImportMonitoringDAO();

    public void setSession(IServerSession ss) {
        Dataimport.setSession(ss);
    }

    public List<MPFER90> listProcesses(MPFER90 filter) throws SQLException, Exception {
        return Dataimport.listProcesses(filter);

    }

//    UPS
    
    public List<MPFER90> getListMonitoringRPA(MPFER90 filter, String rutaSpring) throws SQLException, Exception {

        // 1) Lista desde AS400 (configuración)
        List<MPFER90> configList = Dataimport.getListMonitoringRPA(filter);

        // 2) Intentar obtener datos en vivo desde API RPA
        try {
            RestTemplate rest = new RestTemplate();
            String url = rutaSpring + "rpa/list";
            String json = rest.getForObject(url, String.class);

            // Mapear JSON → lista de RobotLiveDTO
            RobotLiveDTO[] liveArray = new Gson().fromJson(json, RobotLiveDTO[].class);

            // Recorrer robots AS400 y complementar con robots en vivo
            for (MPFER90 cfg : configList) {
                String cfgName = cfg.ROBOTNAME != null ? cfg.ROBOTNAME.trim() : "";

                for (RobotLiveDTO live : liveArray) {
                    String liveName = live.name != null ? live.name.trim() : "";

                    // Match estrictamente por ROBOTNAME
                    if (!cfgName.isEmpty() && cfgName.equalsIgnoreCase(liveName)) {

                        cfg.LIVE_RUNNING = live.running;
                        cfg.LIVE_RUNNING_SECONDS = live.runningSeconds;
                        cfg.LIVE_NAME = liveName;
                        cfg.LIVE_PID = live.pid != null ? live.pid : "";
                        cfg.LIVE_ID = live.id != null ? live.id : "";
                        cfg.LIVE_STATUS = live.status != null ? live.status : "";
                        cfg.LIVE_LAST_LOG = live.lastLog != null ? live.lastLog : "";

                        System.out.println("✔ MATCH RPA → " + cfgName + " ↔ " + liveName);
                    }
                }
            }

        } catch (Exception ex) {
            System.out.println("❌ Error API RPA: " + ex.getMessage());
            System.out.println("→ Valores LIVE permanecerán vacíos");
        }

        return configList;
    }

    public String executeRpaAction(String robotId, String action, String rutaSpring) {
        try {
            RestTemplate rest = new RestTemplate();

            // Asegurar el slash final
            if (!rutaSpring.endsWith("/")) {
                rutaSpring += "/";
            }

            String url = rutaSpring + "rpa/" + robotId + "/" + action;
            System.out.println("🔥 Ejecutando → " + url);

            String response = rest.postForObject(url, null, String.class);
            return (response != null && !response.isEmpty())
                    ? response
                    : "Acción ejecutada correctamente";

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Error ejecutando acción RPA: " + ex.getMessage());
        }
    }

    public String getLogRPA(String id, String rutaSpring) throws Exception {
        try {
            RestTemplate rest = new RestTemplate();

            // Asegurar que siempre termine con "/"
            if (!rutaSpring.endsWith("/")) {
                rutaSpring = rutaSpring + "/";
            }

            // Construcción final endpoint
            String url = rutaSpring + "rpa/" + id + "/log";

            return rest.getForObject(url, String.class);

        } catch (Exception ex) {
            System.out.println("❌ Error obteniendo log RPA: " + ex.getMessage());
            return "⚠ No se pudo obtener el log del robot.\n" + ex.getMessage();
        }
    }

    public String loadPX265SQP00661(MPFER90 filter, String option) throws SQLException, Exception {
        return Dataimport.loadPX265SQP00661(filter, option);
    }
}
