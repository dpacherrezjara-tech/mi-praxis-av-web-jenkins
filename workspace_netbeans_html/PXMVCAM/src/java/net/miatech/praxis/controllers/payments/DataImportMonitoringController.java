package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import net.miatech.praxis.RobotLiveDTO;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.DataImportMonitoringLogic;

import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.payment.MPFER90;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
@Scope("request")
@RequestMapping("/DataImportMonitoring")
public class DataImportMonitoringController extends BaseController {

    @Autowired
    private DataImportMonitoringLogic logic;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());

        System.out.println("xxxxx");
        return "payments/DataImportMonitoring/form_index";
    }

    @RequestMapping(value = "getMonitoringData")
    public @ResponseBody
    String getMonitoringData(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DATA IMPORT MONITORING :SearchGrid-------------");
        map.put("success", true);
        List<MPFER90> lst = this.getListMPFER90(request, false);
        System.out.println("Total : " + lst.size());

        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPFER90> getListMPFER90(HttpServletRequest request, Boolean bExcel) {

        List<MPFER90> lst = new ArrayList<>(0);
        MPFER90 filter = new MPFER90();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataImportMonitoringLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFER90.class);

            lst = logic.listProcesses(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

//    UPS
    @RequestMapping(value = "getMonitoringRPA")
    @ResponseBody
    public String getMonitoringRPA(ModelMap map, HttpServletRequest request) throws Exception {

        System.out.println("-------------- getMonitoringRPA-------------");

        Gson gson = new Gson();
        String beanString = request.getParameter("beanString");
        MPFER90 filter = gson.fromJson(beanString, MPFER90.class);

        DataImportMonitoringLogic logic = new DataImportMonitoringLogic();
        logic.setSession(this.serverSession.getServerSession());

        // 1. DATOS AS400 (DB2)
        List<MPFER90> listDB = logic.getListMonitoringRPA_DB(filter);

        // 2. DATOS API RPA (SPRING WS)
        RobotLiveDTO[] live = ws.getJson("rpa/list", RobotLiveDTO[].class);

        // 3. MERGE AQUÍ MISMO (como tu compañero)
        mergeRPA(listDB, live);

        map.put("success", true);
        map.put("data", listDB);

        return gson.toJson(map);
    }

    private void mergeRPA(List<MPFER90> listDB, RobotLiveDTO[] liveArray) {

        if (liveArray == null) {
            return;
        }

        for (MPFER90 cfg : listDB) {

            String cfgName = cfg.ROBOTNAME != null ? cfg.ROBOTNAME.trim() : "";

            for (RobotLiveDTO live : liveArray) {

                String liveName = live.name != null ? live.name.trim() : "";

                if (!cfgName.isEmpty() && cfgName.equalsIgnoreCase(liveName)) {

                    cfg.LIVE_RUNNING = live.running;
                    cfg.LIVE_RUNNING_SECONDS = live.runningSeconds;
                    cfg.LIVE_NAME = liveName;
                    cfg.LIVE_PID = live.pid != null ? live.pid : "";
                    cfg.LIVE_ID = live.id != null ? live.id : "";
                    cfg.LIVE_STATUS = live.status != null ? live.status : "";
                    cfg.LIVE_LAST_LOG = live.lastLog != null ? live.lastLog : "";

                    System.out.println("MATCH RPA → " + cfgName + " ↔ " + liveName);
                }
            }
        }
    }

    @RequestMapping(value = "executeRpaAction", method = RequestMethod.POST)
    @ResponseBody
    public String executeRpaAction(ModelMap map, HttpServletRequest request) {

        System.out.println("----- executeRpaAction -----");
        Gson gson = new Gson();
        map.put("success", false);

        try {
            String robotId = request.getParameter("RN");
            String action = request.getParameter("ACTION");

            String endpoint = "rpa/" + robotId + "/" + action;

            String response = ws.postNoBody(endpoint);

            map.put("success", true);
            map.put("message", response);

        } catch (Exception e) {
            map.put("message", e.getMessage());
            e.printStackTrace();
        }

        return gson.toJson(map);
    }

    @RequestMapping(value = "getLogRPA")
    @ResponseBody
    public String getLogRPA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- getLogRPA -------------");
        Gson gson = new Gson();
        map.put("success", false);

        try {
            String id = request.getParameter("LIVE_ID");

            if (id == null || id.trim().isEmpty()) {
                map.put("log", "ID vacío");
                return gson.toJson(map);
            }

            // 2. Llamada directa al API vía SpringWS
            String endpoint = "rpa/" + id + "/log";
            String logText = ws.getText(endpoint);

            map.put("success", true);
            map.put("log", (logText != null ? logText : "Log vacío"));

        } catch (Exception e) {
            map.put("log", "Error obteniendo log: " + e.getMessage());
            e.printStackTrace();
        }

        return gson.toJson(map);
    }

    @RequestMapping(value = "MaintenanceA2280")
    public @ResponseBody
    String MaintenanceA2280(ModelMap map, HttpServletRequest request) {
        String msj = "";
        String beanString;
        Gson gson = new Gson();

        MPFER90 filter = new MPFER90();
        System.out.println("-------------- DataImport : MaintenanceA2280-------------");

        try {
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFER90.class);

            DataImportMonitoringLogic logic = new DataImportMonitoringLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX265SQP00661(filter, filter.option);
            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);

    }

}
