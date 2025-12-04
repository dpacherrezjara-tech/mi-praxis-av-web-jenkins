package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
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
    public String getMonitoringRPA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- getMonitoringRPA-------------");
        map.put("success", true);

        List<MPFER90> lst = this.getListMonitoringRPA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    public List<MPFER90> getListMonitoringRPA(HttpServletRequest request, Boolean bExcel) {

        List<MPFER90> lst = new ArrayList<>(0);
        MPFER90 filter = new MPFER90();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataImportMonitoringLogic();
            logic.setSession(this.serverSession.getServerSession());

            // 🔹 Obtener ruta Spring desde properties
            String rutaSpring = (String) this.serverSession
                    .getServerSession()
                    .getPropertySession()
                    .get("RUTA_REST_SPRING");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPFER90.class);

            // 🔹 Pasar la ruta al logic
            lst = logic.getListMonitoringRPA(filter, rutaSpring);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "executeRpaAction", method = RequestMethod.POST)
    @ResponseBody
    public String executeRpaAction(ModelMap map, HttpServletRequest request) {
        System.out.println("----- executeRpaAction -----");

        map.put("success", false);
        try {
            String robotId = request.getParameter("RN");      // LIVE_ID
            String action = request.getParameter("ACTION"); // start | stop | restart

            DataImportMonitoringLogic logic = new DataImportMonitoringLogic();
            logic.setSession(this.serverSession.getServerSession());

            // Obtener ruta API desde property
            String rutaSpring = (String) this.serverSession
                    .getServerSession()
                    .getPropertySession()
                    .get("RUTA_REST_SPRING");

            String message = logic.executeRpaAction(robotId, action, rutaSpring);

            map.put("success", true);
            map.put("message", message);

        } catch (Exception e) {
            map.put("message", e.getMessage());
            e.printStackTrace();
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getLogRPA")
    @ResponseBody
    public String getLogRPA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- getLogRPA -------------");

        map.put("success", false);
        try {
            String id = request.getParameter("LIVE_ID");

            logic = new DataImportMonitoringLogic();
            logic.setSession(this.serverSession.getServerSession());

            // Obtener la ruta desde el property
            String rutaSpring = (String) serverSession.getServerSession()
                    .getPropertySession()
                    .get("RUTA_REST_SPRING");

            // → enviar ruta al logic
            String logText = logic.getLogRPA(id, rutaSpring);

            map.put("success", true);
            map.put("log", logText);
        } catch (Exception e) {
            map.put("log", "⚠ Error obteniendo log: " + e.getMessage());
            e.printStackTrace();
        }

        return new Gson().toJson(map);
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
