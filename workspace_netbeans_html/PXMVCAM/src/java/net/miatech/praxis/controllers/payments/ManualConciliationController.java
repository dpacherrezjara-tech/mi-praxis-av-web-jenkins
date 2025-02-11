package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ManualConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jsolano
 */
@Controller
@Scope("request")
@RequestMapping("/ManualConciliation")
public class ManualConciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ManualConciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- ManualConciliationController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/ManualConciliation/form_index";
    }

    @RequestMapping(value = "/searchTeleworking")
    public @ResponseBody
    String searchTeleworking(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- ManualConciliation : searchTeleworking-------------");

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String Freasign = request.getParameter("Freasign");
            String Freasiga = request.getParameter("Freasiga");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQPMPF100(filter);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, lst);
//                map.put("nameExcel", nameExcel);
            } else {

                map.put("success", true);
                map.put("data", lst);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "getRules")
    public @ResponseBody
    String getRules(String ccust) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadRules();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "searchMPF101Teleworking")
    public @ResponseBody
    String searchMPF101Teleworking(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- ManualConciliation : searchMPF101Teleworking-------------");
        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String Freasign = request.getParameter("Freasign");
            String Freasiga = request.getParameter("Freasiga");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQP00871JT(filter);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, lst); 
            } else {

                map.put("success", true);
                map.put("data", lst);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "getOperadores")
    public @ResponseBody
    String getOperadores(String ccust) {
        List<A1248> lista = new ArrayList<A1248>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadOperadores();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "getAuditores")
    public @ResponseBody
    String getAuditores(String ccust) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadAuditores();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "searchBean")
    public @ResponseBody
    String searchBeanAMDP(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBean-------------");
        map.put("success", true);

        A2290Filter result = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQPXXX(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validationAdj")
    public @ResponseBody
    String validationAdj(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : validationAdj-------------");
        map.put("success", true);

        A2290Filter result = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQPVALIADJ(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "executeGrillUpdate")
    public @ResponseBody
    String executeGrillUpdate(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeGrillUpdate-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {
 
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834GRILL(filterList, user);

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
    
    @RequestMapping(value = "executeAllUpdate")
    public @ResponseBody
    String executeAllUpdate(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeAllUpdate-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {
 
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            filter = gson.fromJson(beanString, A2290Filter.class);
            
            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834ALL(filter,user);

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
    
    @RequestMapping(value = "executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834(filterList, user);

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

    @RequestMapping(value = "executeOption_REFND")
    public @ResponseBody
    String executeOption_REFND(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeOption_REFND-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_REFND(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_CHGBAK")
    public @ResponseBody
    String executeOption_CHGBAK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeOption_CHGBAK-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_CHGBAK(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "executeOption_ACREDIT")
    public @ResponseBody
    String executeOption_ACREDIT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeOption_ACREDIT-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            // Parsear directamente a JsonArray
            // Deserializar directamente a una lista de A2290Filter
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834_ACREDIT(filterList, user);
            // ... (código existente)

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

    @RequestMapping(value = "reverseOption")
    public @ResponseBody
    String reverseOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117(filterList, user);

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

    @RequestMapping(value = "reverseOption_REFND")
    public @ResponseBody
    String reverseOption_REFND(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOption_REFND-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117_REFND(filterList, user);

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

    @RequestMapping(value = "reverseOption_CHGBAK")
    public @ResponseBody
    String reverseOption_CHGBAK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOption_CHGBAK-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117_CHGBAK(filterList, user);

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

    @RequestMapping(value = "reverseOption_ACREDIT")
    public @ResponseBody
    String reverseOption_ACREDIT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOption_ACREDIT-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117_ACREDIT(filterList, user);

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

    @RequestMapping(value = "reverseOptionOnlyLiq")
    public @ResponseBody
    String reverseOptionOnlyLiq(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOptionOnlyLiq-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117OnlyLiq(filterList, user);

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

    @RequestMapping(value = "reverseOptionOnlyLiq_REFND")
    public @ResponseBody
    String reverseOptionOnlyLiq_REFND(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOptionOnlyLiq_REFND-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117OnlyLiq_REFND(filterList, user);

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

    @RequestMapping(value = "reverseOptionOnlyLiq_CHGBAK")
    public @ResponseBody
    String reverseOptionOnlyLiq_CHGBAK(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOptionOnlyLiq_CHGBAK-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117OnlyLiq_CHGBAK(filterList, user);

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

    @RequestMapping(value = "reverseOptionOnlyLiq_ACREDIT")
    public @ResponseBody
    String reverseOptionOnlyLiq_ACREDIT(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : reverseOptionOnlyLiq_ACREDIT-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);

            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP05117OnlyLiq_ACREDIT(filterList, user);

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

//    @RequestMapping(value = "getXLSXMain")
//    public @ResponseBody
//    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Report : getXLSXMain");
//        String fileNameDownload = String.format("Bank Reconciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<A2290Filter> listaData = this.getListMain(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
////            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
//            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
//            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);
//            Cell CH1_15 = row1.createCell(15);
//            Cell CH1_16 = row1.createCell(16);
//
//            CH1_0.setCellValue("Sales");
//            CH1_1.setCellValue("Settlement Reconciliation");
//            CH1_9.setCellValue("Sales Reconciliation");
//            CH1_13.setCellValue("Settlement");
//
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 16));
//            ++vj;
//            //============================================
//
//            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//            Cell CH2_9 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);
//            Cell CH2_14 = row2.createCell(14);
//            Cell CH2_15 = row2.createCell(15);
//            Cell CH2_16 = row2.createCell(16);
//
//            CH2_0.setCellValue("Date");
//            CH2_1.setCellValue("Match");
//            CH2_5.setCellValue("Settlement");
//            CH2_6.setCellValue("Total");
//            CH2_7.setCellValue("Accounted");
//            CH2_9.setCellValue("Total");
//            CH2_10.setCellValue("Match");
//            CH2_12.setCellValue("Sales");
//            CH2_13.setCellValue("Cargo");
//            CH2_15.setCellValue("Mail");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
//            CH2_9.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//            CH2_13.setCellStyle(headerStyle);
//            CH2_14.setCellStyle(headerStyle);
//            CH2_15.setCellStyle(headerStyle);
//            CH2_16.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 14));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 15, 16));
//
//            ++vj;
//            //============================================
//
//            // ======  Nivel 3 ==========
//            Row row3 = sheet.createRow(vj);
//            Cell CH3_0 = row3.createCell(0);
//            Cell CH3_1 = row3.createCell(1);
//            Cell CH3_2 = row3.createCell(2);
//            Cell CH3_3 = row3.createCell(3);
//            Cell CH3_4 = row3.createCell(4);
//            Cell CH3_5 = row3.createCell(5);
//            Cell CH3_6 = row3.createCell(6);
//            Cell CH3_7 = row3.createCell(7);
//            Cell CH3_8 = row3.createCell(8);
//            Cell CH3_9 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//            Cell CH3_13 = row3.createCell(13);
//            Cell CH3_14 = row3.createCell(14);
//            Cell CH3_15 = row3.createCell(15);
//            Cell CH3_16 = row3.createCell(16);
//
//            CH3_1.setCellValue("Auto");
//            CH3_2.setCellValue("%");
//            CH3_3.setCellValue("Manual");
//            CH3_4.setCellValue("Diff");
//            CH3_5.setCellValue("w/o Sales");
//            CH3_7.setCellValue("Processed");
//            CH3_8.setCellValue("Pending");
//            CH3_9.setCellValue("by Ticket");
//            CH3_10.setCellValue("Automatic");
//            CH3_11.setCellValue("Manual");
//            CH3_12.setCellValue("w/o Reconcili");
//            CH3_13.setCellValue("Total");
//            CH3_14.setCellValue("Contab.");
//            CH3_15.setCellValue("Total");
//            CH3_16.setCellValue("Contab.");
//
//            CH3_0.setCellStyle(headerStyle);
//            CH3_1.setCellStyle(headerStyle);
//            CH3_2.setCellStyle(headerStyle);
//            CH3_3.setCellStyle(headerStyle);
//            CH3_4.setCellStyle(headerStyle);
//            CH3_5.setCellStyle(headerStyle);
//            CH3_6.setCellStyle(headerStyle);
//            CH3_7.setCellStyle(headerStyle);
//            CH3_8.setCellStyle(headerStyle);
//            CH3_9.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//            CH3_13.setCellStyle(headerStyle);
//            CH3_14.setCellStyle(headerStyle);
//            CH3_15.setCellStyle(headerStyle);
//            CH3_16.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            ++vj;
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);
//                Cell rcell15 = row1.createCell(15);
//                Cell rcell16 = row1.createCell(16);
//
//                rcell0.setCellValue(listaData.get(vi).strFormatDate);
//                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
//                rcell2.setCellValue(listaData.get(vi).lngQMATCHPercent);
//                rcell3.setCellValue(listaData.get(vi).lngQMANUAL);
//                rcell4.setCellValue(listaData.get(vi).lngQDIFF);
//                rcell5.setCellValue(listaData.get(vi).lngQPEND);
//                rcell6.setCellValue(listaData.get(vi).lngQSALES);
//                rcell7.setCellValue(listaData.get(vi).lngQPOLIC);
//                rcell8.setCellValue(listaData.get(vi).lngQPOLIPE);
//                rcell9.setCellValue(listaData.get(vi).lngQTICKET);
//                rcell10.setCellValue(listaData.get(vi).lngQTMATCH);
//                rcell11.setCellValue(listaData.get(vi).lngQTMANUAL);
//                rcell12.setCellValue(listaData.get(vi).lngQTPEND);
//                rcell13.setCellValue(listaData.get(vi).lngQTOTS2);
//                rcell14.setCellValue(listaData.get(vi).lngQPOLI2);
//                rcell15.setCellValue(listaData.get(vi).lngQTOTS3);
//                rcell16.setCellValue(listaData.get(vi).lngQPOLI3);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            // ======  Nivel de TOTALES ==========
//            Row rowTotal = sheet.createRow(vj);
//            Cell CH1_0_T = rowTotal.createCell(0);
//            Cell CH1_1_T = rowTotal.createCell(1);
//            Cell CH1_2_T = rowTotal.createCell(2);
//            Cell CH1_3_T = rowTotal.createCell(3);
//            Cell CH1_4_T = rowTotal.createCell(4);
//            Cell CH1_5_T = rowTotal.createCell(5);
//            Cell CH1_6_T = rowTotal.createCell(6);
//            Cell CH1_7_T = rowTotal.createCell(7);
//            Cell CH1_8_T = rowTotal.createCell(8);
//            Cell CH1_9_T = rowTotal.createCell(9);
//            Cell CH1_10_T = rowTotal.createCell(10);
//            Cell CH1_11_T = rowTotal.createCell(11);
//            Cell CH1_12_T = rowTotal.createCell(12);
//            Cell CH1_13_T = rowTotal.createCell(13);
//            Cell CH1_14_T = rowTotal.createCell(14);
//            Cell CH1_15_T = rowTotal.createCell(15);
//            Cell CH1_16_T = rowTotal.createCell(16);
//
//            CH1_0_T.setCellValue("");
//            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
//            CH1_2_T.setCellValue(listaData.get(0).lngTotQMATCHPercent);
//            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
//            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
//            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
//            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
//            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
//            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);
//            CH1_9_T.setCellValue(listaData.get(0).lngTotQTICKET);
//            CH1_10_T.setCellValue(listaData.get(0).lngTotQTMATCH);
//            CH1_11_T.setCellValue(listaData.get(0).lngTotQTMANUAL);
//            CH1_12_T.setCellValue(listaData.get(0).lngTotQTPEND);
//            CH1_13_T.setCellValue(listaData.get(0).lngTotQTOTS2);
//            CH1_14_T.setCellValue(listaData.get(0).lngTotQPOLI2);
//            CH1_15_T.setCellValue(listaData.get(0).lngTotQTOTS3);
//            CH1_16_T.setCellValue(listaData.get(0).lngTotQPOLI3);
//
//            CH1_0_T.setCellStyle(totalStyle);
//            CH1_1_T.setCellStyle(totalStyle);
//            CH1_2_T.setCellStyle(totalStyle);
//            CH1_3_T.setCellStyle(totalStyle);
//            CH1_4_T.setCellStyle(totalStyle);
//            CH1_5_T.setCellStyle(totalStyle);
//            CH1_6_T.setCellStyle(totalStyle);
//            CH1_7_T.setCellStyle(totalStyle);
//            CH1_8_T.setCellStyle(totalStyle);
//            CH1_9_T.setCellStyle(totalStyle);
//            CH1_10_T.setCellStyle(totalStyle);
//            CH1_11_T.setCellStyle(totalStyle);
//            CH1_12_T.setCellStyle(totalStyle);
//            CH1_13_T.setCellStyle(totalStyle);
//            CH1_14_T.setCellStyle(totalStyle);
//            CH1_15_T.setCellStyle(totalStyle);
//            CH1_16_T.setCellStyle(totalStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }
    @RequestMapping(value = "searchBeanAMDP_DETAIL")
    public @ResponseBody
    String searchBeanAMDP_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_REVERSED")
    public @ResponseBody
    String searchBeanAMDP_REVERSED(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_REVERSED-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_REVERSED(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_REVERSED(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_REVERSED(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanREFND_DETAIL")
    public @ResponseBody
    String searchBeanREFND_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanREFND_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListREFND_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListREFND_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_REFND_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanCHGBAK_DETAIL")
    public @ResponseBody
    String searchBeanCHGBAK_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanCHGBAK_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListCHGBAK_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListCHGBAK_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_CHGBAK_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanACREDIT_DETAIL")
    public @ResponseBody
    String searchBeanACREDIT_DETAIL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanACREDIT_DETAIL-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListACREDIT_DETAIL(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListACREDIT_DETAIL(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_ACREDIT_DETAIL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/obtainMessages")
    public @ResponseBody
    String obtainMessages(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP05103(filter);

            map.put("success", true);
            System.out.println("Total : " + lst.size());
            map.put("data", lst);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN")
    public @ResponseBody
    String searchBeanAMDP_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_SCAN-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN_PENDING")
    public @ResponseBody
    String searchBeanAMDP_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN_PENDING")
    public @ResponseBody
    String searchBeanDebits_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanDebits_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBean_SCAN_PENDING_CHGBAK")
    public @ResponseBody
    String searchBean_SCAN_PENDING_CHGBAK(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBean_SCAN_PENDING_CHGBAK-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING_CHGBAK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING_CHGBAK(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING_CHGBAK(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBean_SCAN_PENDING_ACREDIT")
    public @ResponseBody
    String searchBean_SCAN_PENDING_ACREDIT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBean_SCAN_PENDING_ACREDIT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_PENDING_ACREDIT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_PENDING_ACREDIT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_PENDING_ACREDIT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeantTktTW_SCAN_PENDING")
    public @ResponseBody
    String searchBeantTktTW_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListTktTW_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListTktTW_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_TktTw_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN")
    public @ResponseBody
    String searchBeanDebits_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanDebits_SCAN-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN_CHGBAK")
    public @ResponseBody
    String searchBeanDebits_SCAN_CHGBAK(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanDebits_SCAN_CHGBAK-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_CHGBAK(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_CHGBAK(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_CHGBAK(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanDebits_SCAN_ACREDIT")
    public @ResponseBody
    String searchBeanDebits_SCAN_ACREDIT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanDebits_SCAN_ACREDIT-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits_SCAN_ACREDIT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits_SCAN_ACREDIT(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_DEBITS_SCAN_ACREDIT(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDebits")
    public @ResponseBody
    String searchDebits(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchDebits-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListDebits(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDebits(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX263SQP00652DEBITS(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/searchDetCountryByStval_DEBITS")
    public @ResponseBody
    String searchDetCountryByStval_DEBITS(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_DEBITS(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetByStval_DEBITS")
    public @ResponseBody
    String searchDetByStval_DEBITS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_DEBITS(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
//                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
//                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "obtainFields")
    public @ResponseBody
    String obtainFields(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : obtainFields");

        logic = new ManualConciliationLogic();
        List<A1248> lstData = new ArrayList<A1248>(0);

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            lstData = logic.loadSQP03739(tabla);

            map.put("success", true);
            map.put("lstData", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/loadExcelFile", method = RequestMethod.POST)
    public @ResponseBody
    String loadExcelFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Gson gson = new Gson();
        Integer cont = 0;
        A2290Filter objResult = new A2290Filter();
        A2290Filter filter = new A2290Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile.getOriginalFilename();
            String beanString = request.getParameter("beanString");

            filter = gson.fromJson(beanString, A2290Filter.class);
            byte[] dataFile = excelfile.getBytes();
            objResult = getExcelFile(dataFile, filter);

            map.put("success", true);
            map.put("objResult", objResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private A2290Filter getExcelFile(byte[] bytes, A2290Filter filter) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new ManualConciliationLogic();
        List<A2290Filter> lstDataIngreso = new ArrayList<>();
        List<A2290Filter> lstDataVenta = new ArrayList<>();
        List<A2290Filter> lstDataNotFound = new ArrayList<>();
        List<A2290Filter> lstData = new ArrayList<>();
        A2290Filter respt = new A2290Filter();
        String ruta = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
//        String ruta = "D:";
        double neto = 0;
//        boolean isDiff = false;
        String mensaje = "Hubo un error al actualizar los pagos", strHora = Functions.getHoraActual();
        String mensajePost = "";
        double montoTotal = 0;
        int i = 0;
        int qty = 0;

        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "SalesDocumentLoad.xlsx";

            String strArchivo = ruta + "\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            DataFormatter df = new DataFormatter();

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            Row row0 = rowIterator.next();

            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();
                    if (row.getRowNum() > 0) {
                        A2290Filter obj = new A2290Filter();

                        obj.TKT = formatter.formatCellValue(row.getCell(2)) == null ? "" : formatter.formatCellValue(row.getCell(2)).trim();
                        obj.SCARDN = formatter.formatCellValue(row.getCell(6)) == null ? "" : formatter.formatCellValue(row.getCell(6)).trim();
                        obj.SAUTHOC = formatter.formatCellValue(row.getCell(7)) == null ? "" : formatter.formatCellValue(row.getCell(7)).trim();

                        if (obj.TKT.equals("") && obj.SCARDN.equals("") && obj.SAUTHOC.equals("")) {
                            break;
                        }
                        if (obj.TKT.contains("IF") || obj.TKT.contains("(") || obj.TKT.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        if (obj.SCARDN.contains("IF") || obj.SCARDN.contains("(") || obj.SCARDN.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        if (obj.SAUTHOC.contains("IF") || obj.SAUTHOC.contains("(") || obj.SAUTHOC.contains("(")) {
                            respt.MESSAGE = "The file contains formula";
                            return respt;
                        }
                        qty++;
                        lstData.add(obj);
                    }
                }
                file.close();
            } catch (Exception e) {
                e.getMessage();
                if (e.getMessage().contains("String index out of range")) {
                    mensajePost = "";
                } else {
                    mensajePost = "Error en linea : " + i + " | error: " + e.getMessage();
                }
            }

            UserView user = this.serverSession.getServerSession().getUserView();
            logic.setSession(this.serverSession.getServerSession());

            respt = logic.massiveReverseADM(lstData, user);
//            respt.MESSAGE = mensaje;

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return respt;

    }

    @RequestMapping(value = "getUserInfo")
    public @ResponseBody
    String getUserInfo(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : getUserInfo");

        logic = new ManualConciliationLogic();
        INF020 objINF020 = new INF020();

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            objINF020 = logic.loadUserInfo();

            map.put("success", true);
            map.put("objINF020", objINF020);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "asginarTW")
    public @ResponseBody
    String asginarTW(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : asginarTW-------------");

        logic = new ManualConciliationLogic();
        String msj = "";
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            msj = logic.asginarTW(filter);

            map.put("success", true);
            map.put("mensaje", msj);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getIatas")
    public @ResponseBody
    String getIatas(HttpServletRequest request) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            String fecha = request.getParameter("sdate");
            lista = logic.loadgetIatas(fecha);
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "searchRulesDetail")
    public @ResponseBody
    String searchRulesDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchRulesDetail-------------");

        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new ManualConciliationLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX285SQP00829Search(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "MaintenanceRules")
    public @ResponseBody
    String MaintenanceRules(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- ManualConciliation : MaintenanceRules-------------");
        
        String option;
        String beanString;
        Gson gson = new Gson();

        A2290Filter filter = new A2290Filter();
        String msj = " ";

        try {
            
            option = request.getParameter("option");
            filter.CODRULE = request.getParameter("CODRULE").trim();
            filter.GRORULE = request.getParameter("GRORULE").trim();
            filter.TTABLE = request.getParameter("TTABLE").trim();
            String grorule = request.getParameter("GRORULE").trim(); 
            String[] fields = grorule.split("/");

            StringBuilder condition = new StringBuilder();
            for (String field : fields) {
                if (condition.length() > 0) {
                    condition.append(" AND ");
                }
                condition.append("A.").append(field).append(" = B.").append(field);
            }

            String Rquery = condition.toString();
            filter.RQUERY = Rquery;

            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX285SQP00829Update(filter, option);

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
