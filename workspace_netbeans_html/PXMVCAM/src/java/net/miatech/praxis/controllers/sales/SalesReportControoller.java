/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import jdk.nashorn.internal.parser.JSONParser;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.PX036S01A1731Filter;
import net.miatech.beans.PX036S01A1732Filter;
import net.miatech.beans.PX036S01A1733Filter;
import net.miatech.beans.PX036S01A1734Filter;
import net.miatech.beans.PX036S01A1735Filter;
import net.miatech.beans.PX038S01A1724Filter;
import net.miatech.beans.PX038S02A713Filter;
import net.miatech.beans.PX038S02A714Filter;
import net.miatech.beans.PX038S02A720Filter;
import net.miatech.beans.S0001A1530Filter;
import net.miatech.beans.S0001A1730Filter;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.S0001A714Filter;
import net.miatech.beans.S0002A1530Filter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import net.miatech.praxis.A005;
import net.miatech.praxis.A1772;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.SalesReportLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
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
@Scope("request")
@RequestMapping("/SalesReport")
public class SalesReportControoller extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesReportLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/SalesReport/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<S0001A1530Filter> lst = this.getList(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<S0001A1530Filter> getList(HttpServletRequest request, Boolean bExcel) {
        logic = new SalesReportLogic();
        List<S0001A1530Filter> lst = new ArrayList<>(0);
        S0001A1530Filter filter = new S0001A1530Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.AIRLINE = request.getParameter("AIRLINE");
            filter.CIUVT = request.getParameter("CIUVT");
            filter.FECHARPT = request.getParameter("FECHARPT");
            filter.FUENTE = request.getParameter("FUENTE");
            filter.PAIS = request.getParameter("PAIS");
            filter.BANCO = request.getParameter("BANCO");
            filter.STPRO = request.getParameter("STPRO");
            filter.MONEDA = request.getParameter("MONEDA");
            filter.FLAG = request.getParameter("FLAG");
            filter.GRUPO = request.getParameter("GRUPO");
            filter.IATA = request.getParameter("IATA");
            filter.TKT = request.getParameter("TKT");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadS0001A1530(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadRefund")
    public @ResponseBody
    String loadRefund(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX038S02A713Filter> lst = this.getListRefund(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX038S02A713Filter> getListRefund(HttpServletRequest request, Boolean bExcel) {
        logic = new SalesReportLogic();

        List<PX038S02A713Filter> lst = new ArrayList<>(0);
        PX038S02A713Filter filter = new PX038S02A713Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_GRUPO = request.getParameter("IN_GRUPO");
            filter.IN_TKT = request.getParameter("IN_TKT");
            filter.IN_IATA = request.getParameter("IN_IATA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX038S02A713(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX038S02A720Filter> lst = this.getListTicket(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX038S02A720Filter> getListTicket(HttpServletRequest request, Boolean bExcel) {

        logic = new SalesReportLogic();

        List<PX038S02A720Filter> lst = new ArrayList<>(0);
        PX038S02A720Filter filter = new PX038S02A720Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_GRUPO = request.getParameter("IN_GRUPO");
            filter.IN_TKT = request.getParameter("IN_TKT");
            filter.IN_TRANSACTION = request.getParameter("IN_TRANSACTION");
            filter.IN_IATA = request.getParameter("IN_IATA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX038S02A720(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadADM")
    public @ResponseBody
    String loadADM(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX038S02A714Filter> lst = this.getListADM(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX038S02A714Filter> getListADM(HttpServletRequest request, Boolean bExcel) {

        logic = new SalesReportLogic();

        List<PX038S02A714Filter> lst = new ArrayList<>(0);
        PX038S02A714Filter filter = new PX038S02A714Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_GRUPO = request.getParameter("IN_GRUPO");
            filter.IN_TKT = request.getParameter("IN_TKT");
            filter.IN_TRANSACTION = request.getParameter("IN_TRANSACTION");
            filter.IN_IATA = request.getParameter("IN_IATA");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX038S02A714(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadError")
    public @ResponseBody
    String loadError(ModelMap map, HttpServletRequest request) {
        List<PX038S01A1724Filter> lst;
        PX038S01A1724Filter filter = new PX038S01A1724Filter();

        try {
            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_A1724CCUST = request.getParameter("IN_A1724CCUST");
            filter.IN_A1724GRUPO = request.getParameter("IN_A1724GRUPO");
            filter.IN_A1724FUENT = request.getParameter("IN_A1724FUENT");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX038S01A1724(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    /*@RequestMapping(value = "loadError")
    public @ResponseBody
    String loadError(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX038S01A1724Filter> lst = this.getListError(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX038S01A1724Filter> getListError(HttpServletRequest request, Boolean bExcel) {
        logic = new SalesReportLogic();

        List<PX038S01A1724Filter> lst = new ArrayList<>(0);
        PX038S01A1724Filter filter = new PX038S01A1724Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_A1724CCUST = request.getParameter("IN_A1724CCUST");
            filter.IN_A1724GRUPO = request.getParameter("IN_A1724GRUPO");
            filter.IN_A1724FUENT = request.getParameter("IN_A1724FUENT");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX038S01A1724(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }*/
    @RequestMapping(value = "searchDet")
    public @ResponseBody
    String searchDet(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX036S01A1720Filter> lst = this.getListDet(request, false);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX036S01A1720Filter> getListDet(HttpServletRequest request, Boolean bExcel) {
        logic = new SalesReportLogic();

        List<PX036S01A1720Filter> lst = new ArrayList<>(0);
        PX036S01A1720Filter filter = new PX036S01A1720Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_A1720CCUST = request.getParameter("IN_AIRLIN");
            filter.IN_A1720GRUPO = request.getParameter("IN_GRUPO");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            lst = logic.loadPX036S01A1720(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }

    @RequestMapping(value = "loadA006")
    public @ResponseBody
    String loadA006(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        A006 objA006 = new A006();
        A006 filter = new A006();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A006KEY = request.getParameter("A006KEY");
            objA006 = logic.loadPX038S01A006(filter);
            map.put("objA006", objA006);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadA003")
    public @ResponseBody
    String loadA003(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List<A003> lst = new ArrayList<>(0);
        A003 filter = new A003();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A003KEY = request.getParameter("A003KEY");
            filter.A003PSALF = request.getParameter("A003PSALF");
            lst = logic.loadPX038S01A003(filter);
            map.put("lst", lst);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadA1007")
    public @ResponseBody
    String loadA1007(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        A1007 objA1007 = new A1007();
        A1007 filter = new A1007();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A1007CTATO = request.getParameter("A1007CTATO");
            objA1007 = logic.loadPX038S01A1007(filter);
            map.put("objA1007", objA1007);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadA1772")
    public @ResponseBody
    String loadA1772(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        A1772 objA1772 = new A1772();
        A1772 filter = new A1772();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A1772RFIC = request.getParameter("A1772RFIC");
            filter.A1772SUBCD = request.getParameter("A1772SUBCD");
            objA1772 = logic.loadA1772(filter);
            map.put("objA1772", objA1772);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "loadA005")
    public @ResponseBody
    String loadA005(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        A005 objA005 = new A005();
        A005 filter = new A005();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A005KEY1 = request.getParameter("A005KEY1");
            objA005 = logic.loadA005(filter);
            map.put("objA005", objA005);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicketDataEntry")
    public @ResponseBody
    String loadTicketDataEntry(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT;
        List lstTKTGrilla;
        S0007A720Filter filter = new S0007A720Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A720SEQ = request.getParameter("A720SEQ");

            lstTKT = logic.loadS0007A720(filter);
            lstTKTGrilla = logic.loadS0007A720Grilla(filter);
            map.put("lstTKT", lstTKT);
            map.put("lstTKTGrilla", lstTKTGrilla);
            return new Gson().toJson(map);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            return new Gson().toJson(map);
        }
    }

    @RequestMapping(value = "loadTicketDataEntryRfnd")
    public @ResponseBody
    String loadTicketDataEntryRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstRFND;
        //List lstRFNDGrilla;
        S0001A713Filter filter = new S0001A713Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_AIRLINE = request.getParameter("IN_AIRLIN");
            filter.VP_CIA = request.getParameter("IN_CIA");
            filter.VP_FORMA = request.getParameter("IN_FORMA");
            filter.VP_SERIE = request.getParameter("IN_SERIE");
            filter.A713SEQ = request.getParameter("A713SEQ");
            /*
            lstRFND = logic.loadS0001A713(filter);
            lstRFNDGrilla = logic.loadS0001A713Grilla(filter);
             */
            lstRFND = logic.loadS0001A713(filter);
            map.put("lstRFND", lstRFND);
            //map.put("lstRFNDGrilla", lstRFNDGrilla);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTotales")
    public @ResponseBody
    String loadTotales(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTot;
        S0007A720Filter filter = new S0007A720Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.A720CIAI = request.getParameter("A720CIAI");
            filter.A720FORMAI = request.getParameter("A720FORMAI");
            filter.A720SERIEI = request.getParameter("A720SERIEI");
            filter.A720SEQ = request.getParameter("A720SEQ");

            lstTot = logic.loadS0007A720Tot(filter);
            map.put("lstTot", lstTot);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTotalesRfnd")
    public @ResponseBody
    String loadTotalesRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTotRfnd;
        S0001A713Filter filter = new S0001A713Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_CIA = request.getParameter("A713CIAI");
            filter.VP_FORMA = request.getParameter("A713FORMAI");
            filter.VP_SERIE = request.getParameter("A713SERIEI");
            filter.A713SEQ = request.getParameter("A713SEQ");

            lstTotRfnd = logic.S0001A713TOT(filter);
            map.put("lstTotRfnd", lstTotRfnd);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadExchange")
    public @ResponseBody
    String loadExchange(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstEXCH;
        S0007A720Filter filter = new S0007A720Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A720CIAI = request.getParameter("A720CIAI");
            filter.A720FORMAI = request.getParameter("A720FORMAI");
            filter.A720SERIEI = request.getParameter("A720SERIEI");
            filter.A720SEQ = request.getParameter("A720SEQ");

            lstEXCH = logic.loadExchange(filter);
            map.put("lstEXCH", lstEXCH);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadEMD")
    public @ResponseBody
    String loadEMD(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstEMD;
        S0007A720Filter filter = new S0007A720Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.A720CIAI = request.getParameter("A720CIAI");
            filter.A720FORMAI = request.getParameter("A720FORMAI");
            filter.A720SERIEI = request.getParameter("A720SERIEI");
            filter.A720SEQ = request.getParameter("A720SEQ");

            lstEMD = logic.loadEMD(filter);
            map.put("lstEMD", lstEMD);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadEMDRfnd")
    public @ResponseBody
    String loadEMDRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstEMDRfnd;
        S0001A713Filter filter = new S0001A713Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_CIA = request.getParameter("A713CIAI");
            filter.VP_FORMA = request.getParameter("A713FORMAI");
            filter.VP_SERIE = request.getParameter("A713SERIEI");
            filter.A713SEQ = request.getParameter("A713SEQ");

            lstEMDRfnd = logic.loadEMDRfnd(filter);
            map.put("lstEMDRfnd", lstEMDRfnd);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadRubros")
    public @ResponseBody
    String loadRubros(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReport : loadRubros-------------");
        map.put("success", true);

        logic = new SalesReportLogic();

        try {
            logic.setSession(this.serverSession.getServerSession());

            //FOP
            PX036S01A1531Filter filter = new PX036S01A1531Filter();

            filter.IN_AIRLIN = "139";
            filter.IN_CIA = request.getParameter("A720CIAI");
            filter.IN_FORMA = request.getParameter("A720FORMAI");
            filter.IN_SERIE = request.getParameter("A720SERIEI");
            filter.A1531SEQ = request.getParameter("A720SEQ");
            List lstTKT_FOP = logic.loadPX036S01A1531(filter);
            //TAX
            PX036S01A1532Filter filter2 = new PX036S01A1532Filter();
            filter2.IN_AIRLIN = "139";
            filter2.IN_CIA = request.getParameter("A720CIAI");
            filter2.IN_FORMA = request.getParameter("A720FORMAI");
            filter2.IN_SERIE = request.getParameter("A720SERIEI");
            filter2.A1532SEQ = request.getParameter("A720SEQ");
            List lstTKT_TAX = logic.loadPX036S01A1532(filter2);
            //COMM
            PX036S01A1533Filter filter3 = new PX036S01A1533Filter();
            filter3.IN_AIRLIN = "139";
            filter3.IN_CIA = request.getParameter("A720CIAI");
            filter3.IN_FORMA = request.getParameter("A720FORMAI");
            filter3.IN_SERIE = request.getParameter("A720SERIEI");
            filter3.A1533SEQ = request.getParameter("A720SEQ");
            List lstTKT_COMM = logic.loadPX036S01A1533(filter3);
            //TAXCOMM
            PX036S01A1534Filter filter4 = new PX036S01A1534Filter();
            filter4.IN_AIRLIN = "139";
            filter4.IN_CIA = request.getParameter("A720CIAI");
            filter4.IN_FORMA = request.getParameter("A720FORMAI");
            filter4.IN_SERIE = request.getParameter("A720SERIEI");
            filter4.A1534SEQ = request.getParameter("A720SEQ");
            List lstTKT_TAXCOMM = logic.loadPX036S01A1534(filter4);
            //FC
            PX036S01A1721Filter filter5 = new PX036S01A1721Filter();
            filter5.IN_AIRLIN = "139";
            filter5.IN_CIA = request.getParameter("A720CIAI");
            filter5.IN_FORMA = request.getParameter("A720FORMAI");
            filter5.IN_SERIE = request.getParameter("A720SERIEI");
            filter5.A1721SEQ = request.getParameter("A720SEQ");

            //Reference
            filter5.IN_TIPO = "CX";
            List lstTKT_FC = logic.loadReference(filter5);
            //Related
            filter5.IN_TIPO = "AU";
            List lstTKT_FCR = logic.loadReference(filter5);

            map.put("lstTKT_FOP", lstTKT_FOP);
            map.put("lstTKT_TAX", lstTKT_TAX);
            map.put("lstTKT_COMM", lstTKT_COMM);
            map.put("lstTKT_TAXCOMM", lstTKT_TAXCOMM);
            map.put("lstTKT_FC", lstTKT_FC);
            map.put("lstTKT_FCR", lstTKT_FCR);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadRubrosRfnd")
    public @ResponseBody
    String loadRubrosRfnd(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReport : loadRubrosRfnd -------------");
        map.put("success", true);

        logic = new SalesReportLogic();

        try {
            logic.setSession(this.serverSession.getServerSession());

            //FOP
            PX036S01A1731Filter filter = new PX036S01A1731Filter();
            filter.IN_AIRLIN = "139";
            filter.IN_CIA = request.getParameter("A713CIAI");
            filter.IN_FORMA = request.getParameter("A713FORMAI");
            filter.IN_SERIE = request.getParameter("A713SERIEI");
            filter.A1731SEQ = request.getParameter("A713SEQ");
            List lstTKT_FOP = logic.loadPX036S01A1731(filter);
            //TAX
            PX036S01A1732Filter filter2 = new PX036S01A1732Filter();
            filter2.IN_AIRLIN = "139";
            filter2.IN_CIA = request.getParameter("A713CIAI");
            filter2.IN_FORMA = request.getParameter("A713FORMAI");
            filter2.IN_SERIE = request.getParameter("A713SERIEI");
            filter2.A1732SEQ = request.getParameter("A713SEQ");
            List lstTKT_TAX = logic.loadPX036S01A1732(filter2);
            //COMM
            PX036S01A1733Filter filter3 = new PX036S01A1733Filter();
            filter3.IN_AIRLIN = "139";
            filter3.IN_CIA = request.getParameter("A713CIAI");
            filter3.IN_FORMA = request.getParameter("A713FORMAI");
            filter3.IN_SERIE = request.getParameter("A713SERIEI");
            filter3.A1733SEQ = request.getParameter("A713SEQ");
            List lstTKT_COMM = logic.loadPX036S01A1733(filter3);
            //TAXCOMM
            PX036S01A1734Filter filter4 = new PX036S01A1734Filter();
            filter4.IN_AIRLIN = "139";
            filter4.IN_CIA = request.getParameter("A713CIAI");
            filter4.IN_FORMA = request.getParameter("A713FORMAI");
            filter4.IN_SERIE = request.getParameter("A713SERIEI");
            filter4.A1734SEQ = request.getParameter("A713SEQ");
            List lstTKT_TAXCOMM = logic.loadPX036S01A1734(filter4);
            //FC
            PX036S01A1735Filter filter5 = new PX036S01A1735Filter();
            filter5.IN_AIRLIN = "139";
            filter5.IN_CIA = request.getParameter("A713CIAI");
            filter5.IN_FORMA = request.getParameter("A713FORMAI");
            filter5.IN_SERIE = request.getParameter("A713SERIEI");
            filter5.A1735SEQ = request.getParameter("A713SEQ");
            //Reference
            filter5.IN_TIPO = "CX";
            List lstTKT_FC = logic.loadReferenceRfnd(filter5);
            //Related
            filter5.IN_TIPO = "AU";
            List lstTKT_FCR = logic.loadReferenceRfnd(filter5);

            map.put("lstTKT_FOP", lstTKT_FOP);
            map.put("lstTKT_TAX", lstTKT_TAX);
            map.put("lstTKT_COMM", lstTKT_COMM);
            map.put("lstTKT_TAXCOMM", lstTKT_TAXCOMM);
            map.put("lstTKT_FC", lstTKT_FC);
            map.put("lstTKT_FCR", lstTKT_FCR);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_FOP")
    public @ResponseBody
    String loadTicket_FOP(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        List lstTKT_FOP;

        try {
            logic.setSession(this.serverSession.getServerSession());

            PX036S01A1531Filter filter = new PX036S01A1531Filter();

            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1531SEQ = request.getParameter("A1531SEQ");

            lstTKT_FOP = logic.loadPX036S01A1531(filter);
            map.put("lstTKT_FOP", lstTKT_FOP);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_TAX")
    public @ResponseBody
    String loadTicket_TAX(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_TAX;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1532Filter filter = new PX036S01A1532Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1532SEQ = request.getParameter("A1532SEQ");
            lstTKT_TAX = logic.loadPX036S01A1532(filter);
            map.put("lstTKT_TAX", lstTKT_TAX);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_COMM")
    public @ResponseBody
    String loadTicket_COMM(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_COMM;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1533Filter filter = new PX036S01A1533Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1533SEQ = request.getParameter("A1533SEQ");
            lstTKT_COMM = logic.loadPX036S01A1533(filter);
            map.put("lstTKT_COMM", lstTKT_COMM);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_TAXCOMM")
    public @ResponseBody
    String loadTicket_TAXCOMM(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_TAXCOMM;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1534Filter filter = new PX036S01A1534Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1534SEQ = request.getParameter("A1534SEQ");
            lstTKT_TAXCOMM = logic.loadPX036S01A1534(filter);
            map.put("lstTKT_TAXCOMM", lstTKT_TAXCOMM);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_FareCalc")
    public @ResponseBody
    String loadTicket_FareCalc(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1721Filter filter = new PX036S01A1721Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1721SEQ = request.getParameter("A1721SEQ");
            List lstTKT_FC = logic.loadPX036S01A1721(filter);
            map.put("lstTKT_FC", lstTKT_FC);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_Balance")
    public @ResponseBody
    String loadTicket_Balance(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        List lstTKT_Balance;

        try {
            logic.setSession(this.serverSession.getServerSession());

            S0001A1730Filter filter = new S0001A1730Filter();

            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1730SQ720 = request.getParameter("A1730SQ720");

            lstTKT_Balance = logic.loadBalance(filter);
            map.put("lstTKT_Balance", lstTKT_Balance);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_FOPRfnd")
    public @ResponseBody
    String loadTicket_FOPRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();

        List lstTKT_FOP;

        try {
            logic.setSession(this.serverSession.getServerSession());

            PX036S01A1731Filter filter = new PX036S01A1731Filter();

            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1731SEQ = request.getParameter("A1731SEQ");

            lstTKT_FOP = logic.loadPX036S01A1731(filter);
            map.put("lstTKT_FOP", lstTKT_FOP);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_TAXRfnd")
    public @ResponseBody
    String loadTicket_TAXRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_TAX;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1732Filter filter = new PX036S01A1732Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1732SEQ = request.getParameter("A1732SEQ");
            lstTKT_TAX = logic.loadPX036S01A1732(filter);
            map.put("lstTKT_TAX", lstTKT_TAX);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_COMMRfnd")
    public @ResponseBody
    String loadTicket_COMMRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_COMM;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1733Filter filter = new PX036S01A1733Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1733SEQ = request.getParameter("A1733SEQ");
            lstTKT_COMM = logic.loadPX036S01A1733(filter);
            map.put("lstTKT_COMM", lstTKT_COMM);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_TAXCOMMRfnd")
    public @ResponseBody
    String loadTicket_TAXCOMMRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstTKT_TAXCOMM;
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1734Filter filter = new PX036S01A1734Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1734SEQ = request.getParameter("A1734SEQ");
            lstTKT_TAXCOMM = logic.loadPX036S01A1734(filter);
            map.put("lstTKT_TAXCOMM", lstTKT_TAXCOMM);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicket_FareCalcRfnd")
    public @ResponseBody
    String loadTicket_FareCalcRfnd(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        try {
            logic.setSession(this.serverSession.getServerSession());
            PX036S01A1735Filter filter = new PX036S01A1735Filter();
            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.A1735SEQ = request.getParameter("A1735SEQ");
            List lstTKT_FC = logic.loadPX036S01A1735(filter);
            map.put("lstTKT_FC", lstTKT_FC);
        } catch (Exception e) {
            map.put("Error", e.getMessage());
            //throw new SpringException(e);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadExchDataEntry")
    public @ResponseBody
    String loadExchDataEntry(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstExch;
        List lstExchGrilla;
        S0007A730Filter filter = new S0007A730Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_AIRLIN = request.getParameter("IN_AIRLIN");
            filter.IN_CIA = request.getParameter("IN_CIA");
            filter.IN_FORMA = request.getParameter("IN_FORMA");
            filter.IN_SERIE = request.getParameter("IN_SERIE");
            filter.IN_SEQ = request.getParameter("IN_SEQ");
            filter.IN_CIAEXCH = request.getParameter("IN_CIAEXCH");
            filter.IN_FORMAEXCH = request.getParameter("IN_FORMAEXCH");
            filter.IN_SERIEEXCH = request.getParameter("IN_SERIEEXCH");

            lstExch = logic.loadS0007A730EXCH(filter);
            lstExchGrilla = logic.loadS0007A730EXCHGrilla(filter);
            map.put("lstExch", lstExch);
            map.put("lstExchGrilla", lstExchGrilla);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTicketDataEntryAdm")
    public @ResponseBody
    String loadTicketDataEntryAdm(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        logic = new SalesReportLogic();
        List lstMEMO;
        S0001A714Filter filter = new S0001A714Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_AIRLINE = request.getParameter("IN_AIRLIN");
            filter.VP_CIA = request.getParameter("IN_CIA");
            filter.VP_FORMA = request.getParameter("IN_FORMA");
            filter.VP_SERIE = request.getParameter("IN_SERIE");
            filter.A714SEQ = request.getParameter("A714SEQ");

            lstMEMO = logic.loadS0001A714(filter);
            map.put("lstMEMO", lstMEMO);

        } catch (Exception e) {
            map.put("Error", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "setGroup")
    public @ResponseBody
    String setGroup(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReport : setGroup-------------");
        map.put("success", true);

        logic = new SalesReportLogic();

        S0002A1530Filter objRtn = new S0002A1530Filter();
        S0002A1530Filter filter = new S0002A1530Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.IN_ACTION = request.getParameter("IN_ACTION");
            filter.A1530CCUST = request.getParameter("A1530CCUST");
            filter.A1530PSVTA = request.getParameter("A1530PSVTA");
            filter.A1530GRUPO = request.getParameter("A1530GRUPO");
            filter.A1530CIUVT = request.getParameter("A1530CIUVT");
            filter.A1530BANCO = request.getParameter("A1530BANCO");
            filter.A1530CSABR = request.getParameter("A1530CSABR");
            filter.A1530AGENT = request.getParameter("A1530AGENT");
            filter.A1530TVENT = request.getParameter("A1530TVENT");
            filter.A1530FUENT = request.getParameter("A1530FUENT");
            filter.A1530SFUEN = request.getParameter("A1530SFUEN");
            filter.A1530TICAP = request.getParameter("A1530TICAP");
            filter.A1530STVOI = request.getParameter("A1530STVOI");
            filter.A1530FCONT = request.getParameter("A1530FCONT");
            filter.A1530IDCON = request.getParameter("A1530IDCON");
            filter.A1530POLGL = request.getParameter("A1530POLGL");
            filter.A1530POLAR = request.getParameter("A1530POLAR");
            filter.A1530POLAP = request.getParameter("A1530POLAP");
            filter.A1530FCADE = request.getParameter("A1530FCADE");
            filter.A1530FCAHA = request.getParameter("A1530FCAHA");
            filter.A1530FDESD = request.getParameter("A1530FDESD");

            filter.A1530FHAST = request.getParameter("A1530FHAST");
            filter.A1530DYRI = request.getParameter("A1530DYRI");
            filter.A1530FSQN = request.getParameter("A1530FSQN");
            filter.A1530FPROG = request.getParameter("A1530FPROG");
            filter.A1530FPROC = request.getParameter("A1530FPROC");
            filter.A1530MPROC = request.getParameter("A1530MPROC");
            filter.A1530SPROC = request.getParameter("A1530SPROC");
            filter.A1530CPROC = request.getParameter("A1530CPROC");
            filter.A1530MDA = request.getParameter("A1530MDA");
            filter.A1530IDFIL = request.getParameter("A1530IDFIL");
            filter.A1530STPRO = request.getParameter("A1530STPRO");
            filter.A1530STERR = request.getParameter("A1530STERR");
            filter.A1530STS0 = request.getParameter("A1530STS0");
            filter.A1530STS1 = request.getParameter("A1530STS1");
            filter.A1530STS2 = request.getParameter("A1530STS2");
            filter.A1530STS3 = request.getParameter("A1530STS3");

            objRtn = logic.setS0002A1530(filter);

            map.put("objRtn", objRtn);

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Sales Report : getFile");

        List<PX038S02A720Filter> listaData = new ArrayList<>();
        StringBuilder line = new StringBuilder();
        String fileNameDownload = "Sales Report -TKT- " + Functions.getFechaActual() + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        String delim = "\t";
        String texto = "Air" + delim
                + "Document" + delim
                + "Issue date" + delim
                + "CNJ" + delim
                + "Iata" + delim
                + "Transaction" + delim
                + "Document Type" + delim
                + "Type" + delim
                + "Fare Currency" + delim
                + "Fare Amount" + delim
                + "Equivalent Fare Curr" + delim
                + "Equivalent Fare Aount" + delim
                + "Add Curr" + delim
                + "Add Amount" + delim
                + "\r\n";

        line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            listaData = this.getListTicket(request, true);
            System.out.println("Tamaño:" + listaData.size());
            String strTexto = "";
            for (PX038S02A720Filter item : listaData) {
                strTexto += item.A720CIA + delim
                        + item.DOCUMENTO + delim
                        + item.A720FECVTA + delim
                        + item.CNJ + delim
                        + item.A720AGENTE + delim
                        + item.A720TRNCU + delim
                        + item.A720TDOC + delim
                        + item.A720UFORMA + delim
                        + item.A720MONEDA + delim
                        + item.A720TARIFA + delim
                        + item.A720MDAPAG + delim
                        + item.A720TRFPAG + delim
                        + item.A720MDAAD + delim
                        + item.A720ADC + delim
                        + item.A720MIAERR + delim
                        + "\r\n";

            }
            line.append(strTexto.toString());

            InputStream input = new ByteArrayInputStream(line.toString().getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());
        }

    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Sales Report : getXLSX");

        String fileNameDownload = String.format("Sales Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<S0001A1530Filter> listaData = this.getList(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Sales Report");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);
            Cell CH1_15 = row.createCell(15);

            CH1_00.setCellValue("Group");
            CH1_01.setCellValue("Country");
            CH1_02.setCellValue("City/Bank");
            CH1_03.setCellValue("Source");
            CH1_04.setCellValue("Channel");
            CH1_05.setCellValue("Processing Date");
            CH1_06.setCellValue("Ending Date");
            //CH1_07.setCellValue("Fare Currency");
            CH1_08.setCellValue("IATA Code");
            CH1_09.setCellValue("Accountign");
            CH1_14.setCellValue("Currency");
            CH1_15.setCellValue("Status");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));

            //*******************
            ++vj;
            Row row2 = sheet.createRow(vj);
            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);

            CH2_06.setCellValue("From");
            CH2_07.setCellValue("To");
            CH2_09.setCellValue("ID");
            CH2_10.setCellValue("Date");
            CH2_11.setCellValue("GL");
            CH2_12.setCellValue("AP");
            CH2_13.setCellValue("AR");

            CH2_00.setCellStyle(headerStyle);
            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);
            CH2_06.setCellStyle(headerStyle);
            CH2_07.setCellStyle(headerStyle);
            CH2_08.setCellStyle(headerStyle);
            CH2_09.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);
                Cell rcell5 = row.createCell(5);
                Cell rcell6 = row.createCell(6);
                Cell rcell7 = row.createCell(7);
                Cell rcell8 = row.createCell(8);
                Cell rcell9 = row.createCell(9);
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);
                Cell rcell15 = row.createCell(15);

                rcell0.setCellValue(listaData.get(vi).A1530GRUPO);
                rcell1.setCellValue(listaData.get(vi).A1530PSVTA);
                rcell2.setCellValue(listaData.get(vi).A1530CIUVT);
                rcell3.setCellValue(listaData.get(vi).A1530FUENT);
                rcell4.setCellValue(listaData.get(vi).A1530SFUEN);
                rcell5.setCellValue(listaData.get(vi).A1530FPROC);
                rcell6.setCellValue(listaData.get(vi).A1530FDESD);
                rcell7.setCellValue(listaData.get(vi).A1530FHAST);
                rcell8.setCellValue(listaData.get(vi).A1530AGENT);
                rcell9.setCellValue(listaData.get(vi).A1530IDCON);
                rcell10.setCellValue(listaData.get(vi).A1530FCONT);
                rcell11.setCellValue(listaData.get(vi).A1530POLGL);
                rcell12.setCellValue(listaData.get(vi).A1530POLAP);
                rcell13.setCellValue(listaData.get(vi).A1530POLAR);
                rcell14.setCellValue(listaData.get(vi).A1530MDA);
                rcell15.setCellValue(listaData.get(vi).A1530STPRO);

                iter.next();
                ++vi;
                ++vj;
            }

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
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "getGroupXLSX")
    public @ResponseBody
    void getGroupXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Sales Report : getGroupXLSX");

        String fileNameDownload = String.format("Sales Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {

            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<PX038S02A720Filter> listaData = this.getListTicket(request, true);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("TKT");

            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();

            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);

            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();

            // ====== CREANDO TITULOS ======================================
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);
            Cell CH1_06 = row.createCell(6);
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            Cell CH1_10 = row.createCell(10);
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            Cell CH1_14 = row.createCell(14);

            CH1_00.setCellValue("Air");
            CH1_01.setCellValue("Document");
            CH1_02.setCellValue("Issue date");
            CH1_03.setCellValue("CNJ");
            CH1_04.setCellValue("Iata");
            CH1_05.setCellValue("Transaction");
            CH1_06.setCellValue("Document Type");
            CH1_07.setCellValue("Type");
            CH1_08.setCellValue("Fare Currency");
            CH1_09.setCellValue("Fare Amount");
            CH1_10.setCellValue("Equivalent Fare Curr");
            CH1_11.setCellValue("Equivalent Fare Aount");
            CH1_12.setCellValue("Add Curr");
            CH1_13.setCellValue("Add Aount");
            CH1_14.setCellValue("Error");

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);
            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);

            //          ========================================================
            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell rcell0 = row.createCell(0);
                Cell rcell1 = row.createCell(1);
                Cell rcell2 = row.createCell(2);
                Cell rcell3 = row.createCell(3);
                Cell rcell4 = row.createCell(4);
                Cell rcell5 = row.createCell(5);
                Cell rcell6 = row.createCell(6);
                Cell rcell7 = row.createCell(7);
                Cell rcell8 = row.createCell(8);
                Cell rcell9 = row.createCell(9);
                Cell rcell10 = row.createCell(10);
                Cell rcell11 = row.createCell(11);
                Cell rcell12 = row.createCell(12);
                Cell rcell13 = row.createCell(13);
                Cell rcell14 = row.createCell(14);

                rcell0.setCellValue(listaData.get(vi).A720CIA);
                rcell1.setCellValue(listaData.get(vi).DOCUMENTO);
                rcell2.setCellValue(listaData.get(vi).A720FECVTA);
                rcell3.setCellValue(listaData.get(vi).CNJ);
                rcell4.setCellValue(listaData.get(vi).A720AGENTE);
                rcell5.setCellValue(listaData.get(vi).A720TRNCU);
                rcell6.setCellValue(listaData.get(vi).A720TDOC);
                rcell7.setCellValue(listaData.get(vi).A720UFORMA);
                rcell8.setCellValue(listaData.get(vi).A720MONEDA);
                rcell9.setCellValue(listaData.get(vi).A720TARIFA);
                rcell10.setCellValue(listaData.get(vi).A720MDAPAG);
                rcell11.setCellValue(listaData.get(vi).A720TRFPAG);
                rcell12.setCellValue(listaData.get(vi).A720MDAAD);
                rcell13.setCellValue(listaData.get(vi).A720ADC);
                rcell14.setCellValue(listaData.get(vi).A720MIAERR);

                iter.next();
                ++vi;
                ++vj;
            }

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
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);
//            sheet.autoSizeColumn(20, true);
            /**
             * fileNameDownload = Nombre de descarga
             */
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }

    }

    @RequestMapping(value = "closeGroup")
    public @ResponseBody
    String closeGroup(ModelMap map, HttpServletRequest request) {
        S0001A1530Filter filter = new S0001A1530Filter();
        S0001A1530Filter objRtn;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.setS0003A1530(filter);

            map.put("success", true);
            map.put("data", objRtn);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "detailloadError")
    public @ResponseBody
    String detailloadError(ModelMap map, HttpServletRequest request) {
        List<PX038S02A720Filter> lst = null;
        PX038S02A720Filter filter = new PX038S02A720Filter();

        try {
            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.DOCUMENTO = request.getParameter("Document");
            filter.IN_GRUPO = request.getParameter("Grupo");
            filter.IN_TRANSACTION = request.getParameter("Transaction");
            filter.IN_ERROR = request.getParameter("TError");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            switch (filter.IN_TRANSACTION) {
                case "SALE":
                case "EXCH":
                    lst = logic.getdetailloadErrorTKT(filter);
                    break;
                case "RFND":
                    lst = logic.getdetailloadErrorRFND(filter);
                    break;
                default:
                    lst = logic.getdetailloadErrorADMACM(filter);
                    break;
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "refreshGroup")
    public @ResponseBody
    String refreshGroup(ModelMap map, HttpServletRequest request) {
        S0001A1530Filter filter = new S0001A1530Filter();
        S0001A1530Filter objRtn;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            objRtn = logic.refreshGroup(filter);

            map.put("success", true);
            map.put("data", objRtn);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaInsertFopManual")
    public @ResponseBody
    String ProcesaInsertFopManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        String ListFop = "";
        PX036S01A1731Filter filter = new PX036S01A1731Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            JsonObject gsonArr = parser.parse(request.getParameter("beanlstFop")).getAsJsonObject();
            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaInsertFopManual(filter, gsonArr.toString());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaDeleteEntryRfndCompleManual")
    public @ResponseBody
    String ProcesaDeleteEntryRfndCompleManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        String ListFop = "";
        PX036S01A1731Filter filter = new PX036S01A1731Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaDeleteEntryRfndCompleManual(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaInsertTAXManual")
    public @ResponseBody
    String ProcesaInsertTAXManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        String ListTax = "";
        PX036S01A1732Filter filter = new PX036S01A1732Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonObject gsonArr = parser.parse(request.getParameter("beanlstTAX")).getAsJsonObject();

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaInsertTAXManual(filter, gsonArr.toString());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaInsertCommiManual")
    public @ResponseBody
    String ProcesaInsertCommiManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        PX036S01A1733Filter filter = new PX036S01A1733Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonObject gsonArr = parser.parse(request.getParameter("beanlstCommi")).getAsJsonObject();

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaInsertCommiManual(filter, gsonArr.toString());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaInsertTAXCOMMManual")
    public @ResponseBody
    String ProcesaInsertTAXCOMMManual(ModelMap map, HttpServletRequest request) {
        String result = "";
        PX036S01A1731Filter filter = new PX036S01A1731Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonObject gsonArr = parser.parse(request.getParameter("beanlstTaxComm")).getAsJsonObject();

            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaInsertTAXCOMMManual(filter, gsonArr.toString());

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ProcesaInsertFareCalcRfnd")
    public @ResponseBody
    String ProcesaInsertFareCalcRfnd(ModelMap map, HttpServletRequest request) {
        String result = "";
        PX036S01A1735Filter filter = new PX036S01A1735Filter();
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new SalesReportLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaInsertFareCalcRfnd(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    /*@RequestMapping(value = "detailloadError") PX036S01A1733Filter
    public @ResponseBody
    String detailloadError(ModelMap map, HttpServletRequest request) {
        map.put("success", true);
        List<PX038S02A720Filter> lst = this.getdetailloadError(request, false);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<PX038S02A720Filter> getdetailloadError(HttpServletRequest request, Boolean bExcel) {
        logic = new SalesReportLogic();

        List<PX038S02A720Filter> lst = new ArrayList<>(0);
        PX038S02A720Filter filter = new PX038S02A720Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.IN_OPCION = Integer.parseInt(request.getParameter("IN_OPCION"));
            filter.DOCUMENTO = request.getParameter("Document");
            filter.IN_GRUPO = request.getParameter("Grupo");
            filter.IN_TRANSACTION = request.getParameter("Transaction");
            filter.IN_ERROR = request.getParameter("TError");

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }
            switch (filter.IN_TRANSACTION) {
                case "TKT":
                    lst = logic.getdetailloadErrorTKT(filter);
                    break;
                case "RFND":
                    lst = logic.getdetailloadErrorRFND(filter);
                    break;
                case "ADMACM":
                    lst = logic.getdetailloadErrorADMACM(filter);
                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            throw new SpringException(e);
        }

        return lst;
    }*/
}
