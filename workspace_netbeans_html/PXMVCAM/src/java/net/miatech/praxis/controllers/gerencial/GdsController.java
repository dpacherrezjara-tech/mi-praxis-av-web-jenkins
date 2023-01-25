/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.gerencial;

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP01558Filter;
import net.miatech.beans.SQP01559Filter;
import net.miatech.beans.SQP01560Filter;
import net.miatech.beans.SQP01561Filter;
import net.miatech.beans.SQP01562Filter;
import net.miatech.beans.SQP01929Filter;
import net.miatech.beans.SQP01930Filter;
import net.miatech.beans.SQP01931Filter;
import net.miatech.beans.SQP01932Filter;
import net.miatech.beans.SQP02020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.gerencial.GdsLogic;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/GdsAnalysis")
public class GdsController extends BaseController {

    private GdsLogic logic;
    private SQP01558Filter filter;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP01558Filter> listaData;
        filter = new SQP01558Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_YEAR = request.getParameter("VP_YEAR");
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01558Filter(filter);

            map.put("success", true);
            //map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("total", listaData.size());
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search01")
    public @ResponseBody
    String search01(ModelMap map, HttpServletRequest request) {
        SQP01562Filter filter;
        List<SQP01562Filter> listaData;
        filter = new SQP01562Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_YEAR = request.getParameter("VP_YEAR");
            filter.VP_AGTNAM = request.getParameter("VP_AGTNAM");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01562Filter(filter);

            Map mapSummaryData = new HashMap();
            mapSummaryData.put("PAX", filter.TOT_PAX);
            mapSummaryData.put("NET", filter.TOT_NET);
            mapSummaryData.put("PAXM", filter.TOT_PAXM);
            mapSummaryData.put("NETM", filter.TOT_NETM);
            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
            mapSummaryData.put("NETNU", filter.TOT_NETNU);
            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
            mapSummaryData.put("NETNM", filter.TOT_NETNM);
            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
            mapSummaryData.put("PNOMATCH", ((filter.TOT_NETNM / filter.TOT_NET) * 100));

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search02")
    public @ResponseBody
    String search02(ModelMap map, HttpServletRequest request) {
        SQP01559Filter filter;
        List<SQP01559Filter> listaData;
        filter = new SQP01559Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            //filter.VP_YEAR = request.getParameter("VP_YEAR");
            filter.VP_MES = request.getParameter("VP_MES");
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01559Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.TOT_PAX);
//            mapSummaryData.put("NET", filter.TOT_NET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
            //map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search03")
    public @ResponseBody
    String search03(ModelMap map, HttpServletRequest request) {
        SQP01560Filter filter;
        List<SQP01560Filter> listaData;
        filter = new SQP01560Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_SEGDATE = request.getParameter("VP_SEGDATE");
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01560Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.TOT_PAX);
//            mapSummaryData.put("NET", filter.TOT_NET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
            //map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search04")
    public @ResponseBody
    String search04(ModelMap map, HttpServletRequest request) {
        SQP01561Filter filter;
        List<SQP01561Filter> listaData;
        filter = new SQP01561Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_SEGDATE = request.getParameter("VP_SEGDATE");
            filter.VP_FNUMBER = request.getParameter("VP_FNUMBER");
            filter.VNR = request.getParameter("VNR");
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01561Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.TOT_PAX);
//            mapSummaryData.put("NET", filter.TOT_NET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
            //map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
//    GDS AUDIT
    @RequestMapping(value = "/search05")
    public @ResponseBody
    String search05(ModelMap map, HttpServletRequest request) {
        SQP02020Filter filter;
        List<SQP02020Filter> listaData;
        filter = new SQP02020Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_YEAR = request.getParameter("VP_YEAR");
            filter.VP_MONTH = request.getParameter("VP_MONTH");
            
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP02020Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.TOT_PAX);
//            mapSummaryData.put("NET", filter.TOT_NET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
            //map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search06")
    public @ResponseBody
    String search06(ModelMap map, HttpServletRequest request) {
        SQP01929Filter filter;
        List<SQP01929Filter> listaData;
        filter = new SQP01929Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            filter.VP_DATE = request.getParameter("VP_DATE");
            filter.VP_UNPRO = request.getParameter("VP_UNPRO");
            filter.VP_IATA = request.getParameter("VP_IATA");
            
            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01929Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
            //map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search061")
    public @ResponseBody
    String search061(ModelMap map, HttpServletRequest request) {
        SQP01932Filter filter;
        List<SQP01932Filter> listaData;
        filter = new SQP01932Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
//            int limit = Integer.parseInt(request.getParameter("limit").toString());
//            int start = Integer.parseInt(request.getParameter("page").toString());                
//            filter.page.PAGROW = limit != 0 ? limit : 20;
//            filter.page.PAGNUM = start != 0 ? start : 0;

            filter.VP_FDATE = request.getParameter("VP_FDATE").toString();
            filter.VP_GDS = request.getParameter("VP_GDS").toString();
            filter.VP_VNR = request.getParameter("VP_VNR").toString();
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY").toString();
            filter.VP_IATA = request.getParameter("VP_IATA").toString();
            filter.VP_PSEUDOC = request.getParameter("VP_PSEUDOC").toString();
            filter.VP_UNPRO = request.getParameter("VP_UNPRO").toString();
            filter.VP_FLAG_IATA = request.getParameter("VP_FLAG_IATA").toString();
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01932Filter(filter);

            Map mapSummaryData = new HashMap();
            mapSummaryData.put("PAX", filter.OU_TOTPAX);
            mapSummaryData.put("NET", filter.OU_TOTNET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
            map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search07")
    public @ResponseBody
    String search07(ModelMap map, HttpServletRequest request) {
        SQP01930Filter filter;
        List<SQP01930Filter> listaData;
        filter = new SQP01930Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("page").toString());                
            filter.page.PAGROW = limit != 0 ? limit : 20;
            filter.page.PAGNUM = start != 0 ? start : 0;
            
            filter.VP_DATE = request.getParameter("VP_DATE").toString();            
            filter.VP_UNPRO = request.getParameter("VP_UNPRO").toString();
            filter.VP_IATA = request.getParameter("VP_IATA").toString();
            

            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01930Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.OU_TOTPAX);
//            mapSummaryData.put("NET", filter.OU_TOTNET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
//            map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search08")
    public @ResponseBody
    String search08(ModelMap map, HttpServletRequest request) {
        SQP01931Filter filter;
        List<SQP01931Filter> listaData;
        filter = new SQP01931Filter();
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
        try {
            int limit = Integer.parseInt(request.getParameter("limit").toString());
            int start = Integer.parseInt(request.getParameter("page").toString());                
            filter.page.PAGROW = limit != 0 ? limit : 20;
            filter.page.PAGNUM = start != 0 ? start : 0;
            
            filter.VP_DATE = request.getParameter("VP_DATE").toString();            
            filter.VP_UNPRO = request.getParameter("VP_UNPRO").toString();
            filter.VP_IATA = request.getParameter("VP_IATA").toString();

            //int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            //filter.page.PAGROW = 20;
            //start = (start != 0 ? start : 0);
            //filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new GdsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01931Filter(filter);

//            Map mapSummaryData = new HashMap();
//            mapSummaryData.put("PAX", filter.OU_TOTPAX);
//            mapSummaryData.put("NET", filter.OU_TOTNET);
//            mapSummaryData.put("PAXM", filter.TOT_PAXM);
//            mapSummaryData.put("NETM", filter.TOT_NETM);
//            mapSummaryData.put("PAXNU", filter.TOT_PAXNU);
//            mapSummaryData.put("NETNU", filter.TOT_NETNU);
//            mapSummaryData.put("PAXNM", filter.TOT_PAXNM);
//            mapSummaryData.put("NETNM", filter.TOT_NETNM);
//            mapSummaryData.put("OVERAGE", filter.TOT_OVERAGE);
//            mapSummaryData.put("CANCEL", filter.TOT_CANCEL);
//            mapSummaryData.put("PNOMATCH", ( ( filter.TOT_NETNM / filter.TOT_NET ) * 100 ) );
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
//            map.put("summaryData", mapSummaryData);

        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

}
