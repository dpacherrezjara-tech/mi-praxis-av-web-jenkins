package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RestController
@Scope("request")
@RequestMapping("/DataImportMonitoring")
public class DataImportMonitoringController extends BaseController {

    @Autowired
    private DataImportMonitoringLogic logic;

    @Autowired
    private Gson gson;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;
    /**
     * Endpoint para obtener todos los procesos de importación
     */
//    
//    @RequestMapping(value = "getMonitoringData")
//    public @ResponseBody
//    String getMonitoringData(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- DataImportMonitoring : Buscar -------------");
//        map.put("success", true);
//
//        
//        
//        List<MPFER90> lst = new ArrayList<>();
//        map.put("data", lst);
//        return new Gson().toJson(map);
//        try {
//            // Inicializamos la lógica y seteamos la sesión
//            logic = new DataImportMonitoringLogic();
//            logic.setSession(this.serverSession.getServerSession());
//
//            // Llamamos al método que retorna todos los registros
//            lst = logic.listProcesses(new MPFER90()); // bean vacío, ya que no usamos filtros
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//
//        map.put("data", lst);
//        System.out.println("Total : " + lst.size());
//        return new Gson().toJson(map);
//    }


    
    @RequestMapping(value = "getMonitoringData")
    public @ResponseBody
    String getMonitoringData(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PAYMENTSCHEDULE SSS:SearchGrid-------------");
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
    
    
    
    
    
    
    


}
