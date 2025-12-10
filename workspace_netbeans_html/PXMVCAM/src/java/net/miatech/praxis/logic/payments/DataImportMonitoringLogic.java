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
    public List<MPFER90> getListMonitoringRPA_DB(MPFER90 filter) throws Exception {
        return Dataimport.getListMonitoringRPA(filter);
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
