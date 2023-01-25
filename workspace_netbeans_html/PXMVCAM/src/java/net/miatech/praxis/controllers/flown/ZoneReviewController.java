/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A2826Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.flown.A2826;
import net.miatech.praxis.logic.flown.PassengerConciliationLogic;
import net.miatech.praxis.logic.flown.ZoneReviewLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("session")
@RequestMapping("/ZoneReview")
public class ZoneReviewController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ZoneReviewLogic logic;
    private MasterDAO masterDAO;
    private HashMap<String, String> hmPaises;
    private HashMap<String, String> hmAeropuertos;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/ZoneReview/form_index";
    }

    @RequestMapping(value = "loadData")
    public @ResponseBody
    String loadData(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Load Data : ZoneReviewController-------------");
        map.put("success", true);

        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            List<A2826> lstZona = masterDAO.loadZone();
            List<A2826Filter> lstPaises = masterDAO.loadPaisesA2826();
            map.put("lstZona", lstZona);
            map.put("lstPaises", lstPaises);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : Search-------------");
        HashMap resultado = new HashMap();
        A2826Filter filter = new A2826Filter();
        map.put("success", true);

        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            resultado = logic.loadSQP01278(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", (List<A2826Filter>) resultado.get("REPORTE"));
        map.put("listaDataChart", (List<A2826Filter>) resultado.get("GRAFICO"));
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchByDayAmnt")
    public @ResponseBody
    String searchByDayAmnt(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchByDayAmnt-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01317(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchByYield")
    public @ResponseBody
    String searchByYield(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchByYield-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01318(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchHour")
    public @ResponseBody
    String searchHour(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchHour-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01297(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchFLIPAX")
    public @ResponseBody
    String searchFLIPAX(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchFLIPAX-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01302(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPair")
    public @ResponseBody
    String searchCityPair(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPair-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01324(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairDetail")
    public @ResponseBody
    String searchCityPairDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDetail-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.strDescripcion = request.getParameter("strDescripcion");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01325(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairDay")
    public @ResponseBody
    String searchCityPairDay(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDay-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01327(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairDayDetail")
    public @ResponseBody
    String searchCityPairDayDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDayDetail-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.strDescripcion = request.getParameter("strDescripcion");
            // filter.CCIA = request.getParameter("CCIA");          
            listaData = logic.loadSQP01328(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchOAL")
    public @ResponseBody
    String searchOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchOAL-------------");
        HashMap resultado = new HashMap();
        A2826Filter filter = new A2826Filter();
        map.put("success", true);

        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");
            resultado = logic.loadSQP01278OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", (List<A2826Filter>) resultado.get("REPORTE"));
        map.put("listaDataChart", (List<A2826Filter>) resultado.get("GRAFICO"));
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchByDayAmntOAL")
    public @ResponseBody
    String searchByDayAmntOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchByDayAmntOAL-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");
            listaData = logic.loadSQP01317OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchbyYieldOAL")
    public @ResponseBody
    String searchbyYieldOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchbyYieldOAL-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");
            listaData = logic.loadSQP01318OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchHourOAL")
    public @ResponseBody
    String searchHourOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchHourOAL-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");
            listaData = logic.loadSQP01297OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchFLIPAXOAL ")
    public @ResponseBody
    String searchFLIPAXOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchFLIPAXOAL-------------");
        List<A2826Filter> listaDatabyDayFlight;
        List<A2826Filter> listaDatabyDayPax;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");
            listaDatabyDayFlight = logic.loadSQP01302OALFli(filter);
            listaDatabyDayPax = logic.loadSQP01302OALPax(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("listaDatabyDayFlight", listaDatabyDayFlight);
        map.put("listaDatabyDayPax", listaDatabyDayPax);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairOAL ")
    public @ResponseBody
    String searchCityPairOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairOAL-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");

            listaData = logic.loadSQP01324OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairDetailOAL ")
    public @ResponseBody
    String searchCityPairDetailOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDetailOAL-------------");
        List<A2826Filter> listaData;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");

            listaData = logic.loadSQP01325OAL(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("listaData", listaData);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "searchCityPairDayOAL ")
    public @ResponseBody
    String searchCityPairDayOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDayOAL-------------");
        List<A2826Filter> listaDatabyDayFli;
        List<A2826Filter> listaDatabyDayPax;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");

            listaDatabyDayFli = logic.loadSQP01327OALFli(filter);
            listaDatabyDayPax = logic.loadSQP01327OALPax(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("listaDatabyDayFli", listaDatabyDayFli);
        map.put("listaDatabyDayPax", listaDatabyDayPax);
        return new Gson().toJson(map);

    }
     @RequestMapping(value = "searchCityPairDayDetailOAL ")
    public @ResponseBody
    String searchCityPairDayDetailOAL(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ZoneReviewController : searchCityPairDayDetailOAL-------------");
        List<A2826Filter> listaDatabyDayPax;
        List<A2826Filter> listaDatabyDayFli;

        A2826Filter filter = new A2826Filter();
        map.put("success", true);
        try {
            logic = new ZoneReviewLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.IN_ZONA = request.getParameter("IN_ZONA");
            filter.IN_CARRI = request.getParameter("IN_CARRI");
            filter.CCIA = request.getParameter("CCIA");

            listaDatabyDayFli = logic.loadSQP01328OALFli(filter);
            listaDatabyDayPax = logic.loadSQP01328OALPax(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("listaDatabyDayFli", listaDatabyDayFli);
        map.put("listaDatabyDayPax", listaDatabyDayPax);
        return new Gson().toJson(map);

    }
}
