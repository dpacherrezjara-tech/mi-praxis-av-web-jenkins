package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1691Filter2;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A3729Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.A2149;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.logic.flown.FlightConciliationLogic;
import net.miatech.praxis.logic.program.QueryFlightLogic;
import net.miatech.utils.Functions;
//import org.apache.commons.codec.binary.Base64;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
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
import org.springframework.web.util.NestedServletException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/FlightConciliation")
public class FlightConciliationController extends BaseController {

    private FlightConciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            QueryFlightLogic logic = new QueryFlightLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1248> lstOperadores = logic.loadFieldsConditions();
            List<A1248> lstCampos = logic.loadFields("A1692");

            map.put("success", true);
            map.put("lstOperadores", lstOperadores);
            map.put("lstCampos", lstCampos);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        A1691Filter filter = new A1691Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            List<A1691Filter> listaData = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S01A1691(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchQuery")
    public @ResponseBody
    String searchQuery(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        A1692Filter filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.strSQL = request.getParameter("strSQL").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();
            HashMap<String, String> hmPaises = new MasterDAO(this.serverSession.getServerSession()).loadPaisesHash();

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.loadPX072S06A1692(filter, hmAeropuertos, hmPaises);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchTKT")
    public @ResponseBody
    String searchTKT(ModelMap map, HttpServletRequest request) {
        A1691Filter filter = new A1691Filter();
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

            HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1692Filter> listaData = logic.loadPX095S09A1692(filter, hmAeropuertos);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        A1691Filter2 filter = new A1691Filter2();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTipo = request.getParameter("strTipo");
            String f_Diff = request.getParameter("cmb_Diff");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).
                    loadCiudadesHash();

            List<A1691Filter2> listaData = new FlightConciliationLogic(this.serverSession.getServerSession()).
                    loadPX095S02A1691(filter, strTipo, hmAeropuertos, f_Diff);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetailFlightManifest")
    public @ResponseBody
    String searchDetailFlightManifest(ModelMap map, HttpServletRequest request) {
        A3729Filter filter = new A3729Filter();
        Gson gson = new Gson();
        String beanString;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3729Filter> listaData = logic.loadPX095SGGA3729(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchFlightManifest")
    public @ResponseBody
    String searchFlightManifest(ModelMap map, HttpServletRequest request) {
        A3729Filter filter = new A3729Filter();
        Gson gson = new Gson();
        String beanString;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3729Filter> listaData = logic.loadPX095SQP04286(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetailNFLIGHT")
    public @ResponseBody
    String searchDetailNFLIGHT(ModelMap map, HttpServletRequest request) {
        A1691Filter filter = new A1691Filter();
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

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1691Filter> listaData = logic.loadPX095S15A1691(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request) {
        A1691Filter2 filter = new A1691Filter2();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTipo = request.getParameter("strTipo");
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            HashMap<String, String> hmPaises = new MasterDAO(this.serverSession.getServerSession())
                    .loadPaisesHash();

            List<A1692Filter> listaData = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S05A1692(filter, strTipo, hmPaises);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    /*PARA EL DATAENTRY DEL CONS_SSIM_ODS_VCR_FORM ****************************/
    @RequestMapping(value = "/searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {
        A1691Filter filter = new A1691Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession())
                    .loadCiudadesHash();

            A1691Filter bean = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S04A1691(filter, hmAeropuertos);

            map.put("success", true);
            map.put("beanCons", bean);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/validFlight")
    public @ResponseBody
    String validFlight(ModelMap map, HttpServletRequest request) {
        //REALIZA la validación de los datos del vuelo (A1691)
        A1691Filter filter = new A1691Filter();
        String msj = "";
        String opt = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            opt = request.getParameter("strOption");

            //Validando que las ciudades de Origen y Destino existan ===========
            A1692Filter bean92 = new A1692Filter();
            bean92.CDEPART = filter.CDEPART.trim();
            bean92.CARRIVA = filter.CARRIVA.trim();
            bean92.NFLIGHT = filter.NFLIGHT.trim();
            bean92.DFLIGHT = filter.DFLIGHT.trim();
            bean92.STVAL = filter.STVAL.trim();
//            bean92.PSVVTA = request.getParameter("PSVVTA").trim();
//            bean92.AGTIA = request.getParameter("AGTIA").trim();
//            bean92.CARR = request.getParameter("CARR").trim();

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            //Se cambió parámetro N por Y a pedido de ENS 20160128
            if (opt.trim().equals("I")) {
                //Si es insercion no debe validar datos del manifiesto de vuelo
                msj = logic.loadPX095S08VALID(bean92, "N");
            } else {
                msj = logic.loadPX095S08VALID(bean92, "Y");
            }
            filter.ZONE = bean92.ZONA.trim();
            filter.TOPER = bean92.TOPER.trim();
            map.put("success", true);
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        map.put("msjOption", msj);
        map.put("beanCons", filter);
        map.put("strOption", opt);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        A1691Filter filter = new A1691Filter();
        String strOption = "";
        String msj = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            strOption = request.getParameter("strOption");

            if (filter.STVAL.trim().equals("3")) {
                filter.FSTAPO = "1";//Pendiente para Contabilizar
            }

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (strOption.trim().equals("D")) {
                //Validación para cuando se quiere eliminar Manifiesto
                A1692Filter bean92 = new A1692Filter();
                bean92.CDEPART = filter.CDEPART.trim();
                bean92.CARRIVA = filter.CARRIVA.trim();
                bean92.NFLIGHT = filter.NFLIGHT.trim();
                bean92.DFLIGHT = filter.DFLIGHT.trim();
                msj = logic.loadPX095S08VALID(bean92, "D");
            }

            if (msj.trim().isEmpty()) {
                msj = logic.loadPX095S03A1691(filter, strOption);
            }
            map.put("success", true);
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        map.put("msjOption", msj);
        map.put("strOption", strOption);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/executeScanTicket")
    public @ResponseBody
    String executeScanTicket(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        A3729Filter filter = new A3729Filter();
        String strOption = "";
        String msj = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX095SQP04753(filter);

            map.put("success", true);
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Flight Manifest were not registered.";
        }

        map.put("msjOption", msj);
        map.put("strOption", strOption);

        return new Gson().toJson(map);
    }

    /*PARA EL DATAENTRY DEL TICKET_FORM ***************************************/
    @RequestMapping(value = "/searchBeanTkt")
    public @ResponseBody
    String searchBeanTkt(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTicket = request.getParameter("strTicket");
            String seq = request.getParameter("SEQ");
            String seqRol = request.getParameter("SEQRO");

            masterDAO = new MasterDAO();
            masterDAO.setSession(this.serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            HashMap<String, String> hmPaises = masterDAO.loadPaisesHash();

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            //A1692Filter bean = logic.loadPX095S06A1692(strTicket, seq, hmAeropuertos, hmPaises);
            A1692Filter bean = logic.loadPX095S06A1692_1(strTicket, seq, seqRol, hmAeropuertos, hmPaises);

            map.put("success", true);
            map.put("beanConsTkt", bean);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/buscarDatosVenta")
    public @ResponseBody
    String buscarDatosVenta(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        String msj = "";
        A1692Filter filter = new A1692Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            //Obteniendo los datos de la Venta (A720 - PRAXIS)
            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = logic.loadPX095SQP0009(filter);

            map.put("success", true);
            map.put("beanConsTkt", filter);
        } catch (NumberFormatException | SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            msj = "Error: " + e.getMessage();
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            msj = "Error: " + e.getMessage();
        }
        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Ticket were not registered.";
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/validTicket")
    public @ResponseBody
    String validTicket(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        A1692Filter filter = new A1692Filter();
        String soloValidar = "";
        String msj = "";
        String strOption = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            soloValidar = request.getParameter("soloValidar");

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            //Validando que las ciudades de Origen y Destino existan ===========
            msj = logic.loadPX095S08VALID(filter, "Y");

            if (msj.trim().equals("")) {
                //Obteniendo los datos del Manifiesto de Vuelo (A1691)
                filter = logic.loadPX083SQP0008(filter);
            }
            map.put("success", true);
            map.put("beanConsTkt", filter);
        } catch (SQLException e) {
            map.put("success", false);
            msj = "Error: " + e.getMessage();
        } catch (Exception e) {
            map.put("success", false);
            msj = "Error: " + e.getMessage();
        }

        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Ticket were not registered.";
        }

        map.put("msjOption", msj);
        map.put("soloValidar", soloValidar);//valores true/false
        map.put("strOption", strOption);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/executeOptionTkt")
    public @ResponseBody
    String executeOptionTkt(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        A1692Filter filter = new A1692Filter();
        String strOption = "";
        String msj = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            strOption = request.getParameter("strOption");
            String recalculo = request.getParameter("recalculo");

            if (filter.TDOC.trim().equals("F")) {
                filter.FLOAD = "4";
            } else {
                filter.FLOAD = "M";
            }
            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX095S07A1692(filter, strOption);

            if (msj.contains("successful")) {
                //Actualiza los campos en el A1691 luego de hacer ciertos cálculos.
                msj = logic.loadPX095S12QCAL(filter, recalculo);
            }
            map.put("success", true);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            msj = "Error: " + e.getMessage();
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            msj = "Error: " + e.getMessage();
        }
        if (msj.toLowerCase().contains("duplicada")) {
            msj = "Error: Duplicated record. Ticket were not registered.";
        }
        map.put("msjOption", msj);
        map.put("strOption", strOption);
        return new Gson().toJson(map);
    }

//    @RequestMapping(value = "/searchExport")
//    public @ResponseBody
//    void searchExport(HttpServletRequest request, HttpServletResponse response) {
//        String fileNameDownload = String.format("Flight Conciliation - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//
//            List<A1691Filter> listaData = Arrays.asList(new Gson().fromJson(
//                    request.getParameter("listaData"), A1691Filter[].class
//            ));
//
//            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
//            Workbook workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Flight Conciliation");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
////            CellStyle headerStyle = workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
////            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            // </editor-fold>
//
//            Integer vi = 0, vj = 0;
//            Iterator iter = listaData.iterator();
//
//            //<editor-fold defaultstate="collapsed" desc="row">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            Cell CH1_10 = row.createCell(10);
//            Cell CH1_11 = row.createCell(11);
//            Cell CH1_12 = row.createCell(12);
//
//            CH1_00.setCellValue("Flight Date");
//            CH1_01.setCellValue("Flight Reception");
//            CH1_04.setCellValue("Flights");
//            CH1_07.setCellValue("Scheduled vs Operated");
//            CH1_09.setCellValue("Scheduled vs Flight Details");
//            CH1_11.setCellValue("Unscheduled");
//            CH1_12.setCellValue("Flight Manifest");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
//            sheet.autoSizeColumn(9, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//
//            ++vj;
//            //</editor-fold>
//            //<editor-fold defaultstate="collapsed" desc="row2">
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//
//            CH2_01.setCellValue("SSIM");
//            CH2_02.setCellValue("ODS");
//            CH2_03.setCellValue("VCR");
//            CH2_04.setCellValue("Pending");
//            CH2_05.setCellValue("Processed");
//            CH2_06.setCellValue("Closed");
//            CH2_07.setCellValue("Processed");
//            CH2_08.setCellValue("Pending");
//            CH2_09.setCellValue("Processed");
//            CH2_10.setCellValue("Pending");
//            CH2_12.setCellValue("Envelope");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//            CH2_08.setCellStyle(headerStyle);
//            CH2_09.setCellStyle(headerStyle);
//            CH2_10.setCellStyle(headerStyle);
//            CH2_11.setCellStyle(headerStyle);
//            CH2_12.setCellStyle(headerStyle);
//
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
//            sheet.autoSizeColumn(12, true);
//
//            ++vj;
//            //</editor-fold>
//            //<editor-fold defaultstate="collapsed" desc="row3">
//            Row row3 = sheet.createRow(vj);
//
//            Cell CH3_00 = row3.createCell(0);
//            Cell CH3_01 = row3.createCell(1);
//            Cell CH3_02 = row3.createCell(2);
//            Cell CH3_03 = row3.createCell(3);
//            Cell CH3_04 = row3.createCell(4);
//            Cell CH3_05 = row3.createCell(5);
//            Cell CH3_06 = row3.createCell(6);
//            Cell CH3_07 = row3.createCell(7);
//            Cell CH3_08 = row3.createCell(8);
//            Cell CH3_09 = row3.createCell(9);
//            Cell CH3_10 = row3.createCell(10);
//            Cell CH3_11 = row3.createCell(11);
//            Cell CH3_12 = row3.createCell(12);
//
//            CH3_01.setCellValue("Scheduled");
//            CH3_02.setCellValue("Operated");
//            CH3_03.setCellValue("Detailed");
//
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//
//            CH3_00.setCellStyle(headerStyle);
//            CH3_01.setCellStyle(headerStyle);
//            CH3_02.setCellStyle(headerStyle);
//            CH3_03.setCellStyle(headerStyle);
//            CH3_04.setCellStyle(headerStyle);
//            CH3_05.setCellStyle(headerStyle);
//            CH3_06.setCellStyle(headerStyle);
//            CH3_07.setCellStyle(headerStyle);
//            CH3_08.setCellStyle(headerStyle);
//            CH3_09.setCellStyle(headerStyle);
//            CH3_10.setCellStyle(headerStyle);
//            CH3_11.setCellStyle(headerStyle);
//            CH3_12.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//
//            ++vj;
//            // </editor-fold>
//
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                // <editor-fold defaultstate="collapsed" desc="data">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//                Cell cell58 = row.createCell(8);
//                Cell cell59 = row.createCell(9);
//                Cell cell60 = row.createCell(10);
//                Cell cell61 = row.createCell(11);
//                Cell cell62 = row.createCell(12);
//
//                cell50.setCellValue(listaData.get(vi).strFormatDate);
//                cell51.setCellValue(listaData.get(vi).lngQSSIM);
//                cell52.setCellValue(listaData.get(vi).lngQODS);
//                cell53.setCellValue(listaData.get(vi).lngQVCR);
//                cell54.setCellValue(listaData.get(vi).lngQPRO);
//                cell55.setCellValue(listaData.get(vi).lngQCLO);
//                cell56.setCellValue(listaData.get(vi).lngQACC);
//                cell57.setCellValue(listaData.get(vi).lngQSVOPRO);
//                cell58.setCellValue(listaData.get(vi).lngQSVOPEND);
//                cell59.setCellValue(listaData.get(vi).lngQSVVPRO);
//                cell60.setCellValue(listaData.get(vi).lngQSVVPEND);
//                cell61.setCellValue(listaData.get(vi).lngQFFLOW);
//                cell62.setCellValue(listaData.get(vi).lngQPHY);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//                cell58.setCellStyle(bodyStyle);
//                cell59.setCellStyle(bodyStyle);
//                cell60.setCellStyle(bodyStyle);
//                cell61.setCellStyle(bodyStyle);
//                cell62.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                // </editor-fold>
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//            FileOutputStream report = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(report);
//
//            response.setContentType("application/vnd.ms-excel;base64");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileInputStream in = new FileInputStream(file);
//            byte[] bytes = new byte[(int) file.length()];
//            in.read(bytes);
//
//            //Hacemos el encode de los bytes leídos
//            String encodedBase64 = new String(Base64.encodeBase64(bytes));
//
//            //Escribimos en el objeto response el contenido del mismo
//            response.getOutputStream().write(encodedBase64.getBytes());
//
//            //Cerramos el InputStream
//            in.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println(e.getMessage());
//            throw new SpringException(e);
//        }
//
//    }
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("Flight Conciliation - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            A1691Filter filter = new A1691Filter();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1691Filter> listaData = logic.loadPX095S01A1691(filter);

            //<editor-fold defaultstate="collapsed" desc="sort">
            String dataIndex = request.getParameter("dataIndex");
            final String sortState = request.getParameter("sortState");
            System.out.println("dataIndex: " + dataIndex);
            System.out.println("sortState: " + sortState);
            if (!dataIndex.equals("") && !sortState.equals("")) {
                switch (dataIndex) {
                    case "lngQSSIM":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQSSIM).compareTo(o2.lngQSSIM);
                                } else {
                                    return new Long(o2.lngQSSIM).compareTo(o1.lngQSSIM); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQODS":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQODS).compareTo(o2.lngQODS);
                                } else {
                                    return new Long(o2.lngQODS).compareTo(o1.lngQODS); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQVCR":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQVCR).compareTo(o2.lngQVCR);
                                } else {
                                    return new Long(o2.lngQVCR).compareTo(o1.lngQVCR); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQPRO":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQPRO).compareTo(o2.lngQPRO);
                                } else {
                                    return new Long(o2.lngQPRO).compareTo(o1.lngQPRO); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQCLO":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQCLO).compareTo(o2.lngQCLO);
                                } else {
                                    return new Long(o2.lngQCLO).compareTo(o1.lngQCLO); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQACC":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQACC).compareTo(o2.lngQACC);
                                } else {
                                    return new Long(o2.lngQACC).compareTo(o1.lngQACC); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQSVOPRO":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQSVOPRO).compareTo(o2.lngQSVOPRO);
                                } else {
                                    return new Long(o2.lngQSVOPRO).compareTo(o1.lngQSVOPRO); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQSVOPEND":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQSVOPEND).compareTo(o2.lngQSVOPEND);
                                } else {
                                    return new Long(o2.lngQSVOPEND).compareTo(o1.lngQSVOPEND); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQSVVPRO":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQSVVPRO).compareTo(o2.lngQSVVPRO);
                                } else {
                                    return new Long(o2.lngQSVVPRO).compareTo(o1.lngQSVVPRO); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQSVVPEND":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQSVVPEND).compareTo(o2.lngQSVVPEND);
                                } else {
                                    return new Long(o2.lngQSVVPEND).compareTo(o1.lngQSVVPEND); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQFFLOW":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQFFLOW).compareTo(o2.lngQFFLOW);
                                } else {
                                    return new Long(o2.lngQFFLOW).compareTo(o1.lngQFFLOW); // DESC
                                }
                            }
                        });
                        break;
                    case "lngQPHY":
                        Collections.sort(listaData, new Comparator<A1691Filter>() {
                            @Override
                            public int compare(A1691Filter o1, A1691Filter o2) {
                                if (sortState.equals("ASC")) {
                                    return new Long(o1.lngQPHY).compareTo(o2.lngQPHY);
                                } else {
                                    return new Long(o2.lngQPHY).compareTo(o1.lngQPHY); // DESC
                                }
                            }
                        });
                        break;
                }
            }
            //</editor-fold>

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Flight Conciliation");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            //<editor-fold defaultstate="collapsed" desc="row">
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

            CH1_00.setCellValue("Flight Date");
            CH1_01.setCellValue("Flight Reception");
            CH1_04.setCellValue("Flights");
            CH1_07.setCellValue("Scheduled vs Operated");
            CH1_09.setCellValue("Scheduled vs Flight Details");
            CH1_11.setCellValue("Unscheduled");
            CH1_12.setCellValue("Flight Manifest");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));

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

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);

            ++vj;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="row2">
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

            CH2_01.setCellValue("SSIM");
            CH2_02.setCellValue("ODS");
            CH2_03.setCellValue("VCR");
            CH2_04.setCellValue("Pending");
            CH2_05.setCellValue("Processed");
            CH2_06.setCellValue("Closed");
            CH2_07.setCellValue("Processed");
            CH2_08.setCellValue("Pending");
            CH2_09.setCellValue("Processed");
            CH2_10.setCellValue("Pending");
            CH2_12.setCellValue("Envelope");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));

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

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(12, true);

            ++vj;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="row3">
            Row row3 = sheet.createRow(vj);

            Cell CH3_00 = row3.createCell(0);
            Cell CH3_01 = row3.createCell(1);
            Cell CH3_02 = row3.createCell(2);
            Cell CH3_03 = row3.createCell(3);
            Cell CH3_04 = row3.createCell(4);
            Cell CH3_05 = row3.createCell(5);
            Cell CH3_06 = row3.createCell(6);
            Cell CH3_07 = row3.createCell(7);
            Cell CH3_08 = row3.createCell(8);
            Cell CH3_09 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);

            CH3_01.setCellValue("Scheduled");
            CH3_02.setCellValue("Operated");
            CH3_03.setCellValue("Detailed");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));

            CH3_00.setCellStyle(headerStyle);
            CH3_01.setCellStyle(headerStyle);
            CH3_02.setCellStyle(headerStyle);
            CH3_03.setCellStyle(headerStyle);
            CH3_04.setCellStyle(headerStyle);
            CH3_05.setCellStyle(headerStyle);
            CH3_06.setCellStyle(headerStyle);
            CH3_07.setCellStyle(headerStyle);
            CH3_08.setCellStyle(headerStyle);
            CH3_09.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);

            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);
                Cell cell52 = row.createCell(2);
                Cell cell53 = row.createCell(3);
                Cell cell54 = row.createCell(4);
                Cell cell55 = row.createCell(5);
                Cell cell56 = row.createCell(6);
                Cell cell57 = row.createCell(7);
                Cell cell58 = row.createCell(8);
                Cell cell59 = row.createCell(9);
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);

                cell50.setCellValue(listaData.get(vi).strFormatDate);
                cell51.setCellValue(listaData.get(vi).lngQSSIM);
                cell52.setCellValue(listaData.get(vi).lngQODS);
                cell53.setCellValue(listaData.get(vi).lngQVCR);
                cell54.setCellValue(listaData.get(vi).lngQPRO);
                cell55.setCellValue(listaData.get(vi).lngQCLO);
                cell56.setCellValue(listaData.get(vi).lngQACC);
                cell57.setCellValue(listaData.get(vi).lngQSVOPRO);
                cell58.setCellValue(listaData.get(vi).lngQSVOPEND);
                cell59.setCellValue(listaData.get(vi).lngQSVVPRO);
                cell60.setCellValue(listaData.get(vi).lngQSVVPEND);
                cell61.setCellValue(listaData.get(vi).lngQFFLOW);
                cell62.setCellValue(listaData.get(vi).lngQPHY);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(9, true);
                sheet.autoSizeColumn(10, true);
                sheet.autoSizeColumn(11, true);
                sheet.autoSizeColumn(12, true);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetail")
    public @ResponseBody
    void getXLSXDetail(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("Flight Conciliation Detail - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            A1691Filter2 filter = new A1691Filter2();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTipo = request.getParameter("strTipo");
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.yearFrom = request.getParameter("yearFrom");
            filter.monthFrom = request.getParameter("monthFrom");
            filter.dayFrom = request.getParameter("dayFrom");
            filter.yearTo = request.getParameter("yearTo");
            filter.monthTo = request.getParameter("monthTo");
            filter.dayTo = request.getParameter("dayTo");
            filter.CARRI = request.getParameter("CARRI");
            filter.FFLOW = request.getParameter("FFLOW");
            filter.DFLIGHT = request.getParameter("DFLIGHT");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.IN_OBS = request.getParameter("IN_OBS");
            String f_Diff = request.getParameter("cmb_Diff");

            HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession())
                    .loadCiudadesHash();

            List<A1691Filter2> listaData = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S02A1691(filter, strTipo, hmAeropuertos, f_Diff);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Flight Conciliation Detail");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell cell50, cell51, cell52, cell53, cell54, cell55, cell56;
            Cell cell57, cell58, cell59, cell60, cell61, cell62, cell63;
            Cell cell64, cell65, cell66, cell67, cell68, cell69, cell70;
            Cell cell71, cell72, cell73, cell74;

            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
            cell59 = row.createCell(9);
            cell60 = row.createCell(10);
            cell61 = row.createCell(11);
            cell62 = row.createCell(12);
            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);
            cell67 = row.createCell(17);
            cell68 = row.createCell(18);
            cell69 = row.createCell(19);
            cell70 = row.createCell(20);
            cell71 = row.createCell(21);
            cell72 = row.createCell(22);
            cell73 = row.createCell(23);
            cell74 = row.createCell(24);

            cell50.setCellValue("SSIM Data");
            cell57.setCellValue("Information PAX ODS");
            cell61.setCellValue("ODS Data");
            //cell63.setCellValue("Leg");
            cell63.setCellValue("Dif");
            cell64.setCellValue("VCR Data");
            cell66.setCellValue("OCR");
            cell67.setCellValue("Manual");
            cell68.setCellValue("Total");
            cell69.setCellValue("Coupons");
            cell70.setCellValue("Flight Manifest");
            cell73.setCellValue("Coupons");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 24));

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            cell59.setCellStyle(headerStyle);
            cell60.setCellStyle(headerStyle);
            cell61.setCellStyle(headerStyle);
            cell62.setCellStyle(headerStyle);
            cell63.setCellStyle(headerStyle);
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);
            cell67.setCellStyle(headerStyle);
            cell68.setCellStyle(headerStyle);
            cell69.setCellStyle(headerStyle);
            cell70.setCellStyle(headerStyle);
            cell71.setCellStyle(headerStyle);
            cell72.setCellStyle(headerStyle);
            cell73.setCellStyle(headerStyle);
            cell74.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
            cell59 = row.createCell(9);
            cell60 = row.createCell(10);
            cell61 = row.createCell(11);
            cell62 = row.createCell(12);
            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);
            cell67 = row.createCell(17);
            cell68 = row.createCell(18);
            cell69 = row.createCell(19);
            cell70 = row.createCell(20);
            cell71 = row.createCell(21);
            cell72 = row.createCell(22);
            cell73 = row.createCell(23);
            cell74 = row.createCell(24);

            cell50.setCellValue("Flight");
            cell52.setCellValue("Carrier");
            cell53.setCellValue("Flown Type");
            cell54.setCellValue("Orig");
            cell55.setCellValue("Dest");
            cell56.setCellValue("Received");
            cell57.setCellValue("Senior");
            cell58.setCellValue("Children");
            cell59.setCellValue("Infant");
            cell60.setCellValue("Transit");
            cell61.setCellValue("Received");
            cell62.setCellValue("Qty");
            cell64.setCellValue("Received");
            cell65.setCellValue("Qty");
            cell66.setCellValue("Qty");
            cell67.setCellValue("Qty");
            cell69.setCellValue("Valued");
            cell70.setCellValue("Received");
            cell73.setCellValue("Diff");
            cell74.setCellValue("Obs.");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 24, 24));

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            cell59.setCellStyle(headerStyle);
            cell60.setCellStyle(headerStyle);
            cell61.setCellStyle(headerStyle);
            cell62.setCellStyle(headerStyle);
            cell63.setCellStyle(headerStyle);
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);
            cell67.setCellStyle(headerStyle);
            cell68.setCellStyle(headerStyle);
            cell69.setCellStyle(headerStyle);
            cell70.setCellStyle(headerStyle);
            cell71.setCellStyle(headerStyle);
            cell72.setCellStyle(headerStyle);
            cell73.setCellStyle(headerStyle);
            cell74.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row3">
            row = sheet.createRow(vj);

            cell50 = row.createCell(0);
            cell51 = row.createCell(1);
            cell52 = row.createCell(2);
            cell53 = row.createCell(3);
            cell54 = row.createCell(4);
            cell55 = row.createCell(5);
            cell56 = row.createCell(6);
            cell57 = row.createCell(7);
            cell58 = row.createCell(8);
            cell59 = row.createCell(9);
            cell60 = row.createCell(10);
            cell61 = row.createCell(11);
            cell62 = row.createCell(12);
            cell63 = row.createCell(13);
            cell64 = row.createCell(14);
            cell65 = row.createCell(15);
            cell66 = row.createCell(16);
            cell67 = row.createCell(17);
            cell68 = row.createCell(18);
            cell69 = row.createCell(19);
            cell70 = row.createCell(20);
            cell71 = row.createCell(21);
            cell72 = row.createCell(22);
            cell73 = row.createCell(23);
            cell74 = row.createCell(24);

            cell50.setCellValue("Date");
            cell51.setCellValue("Number");
            cell56.setCellValue("Date");
            cell61.setCellValue("Date");
            cell64.setCellValue("Date");
            cell70.setCellValue("Date");
            cell71.setCellValue("Qty");
            cell72.setCellValue("Qty NR");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 21, 21));

            cell50.setCellStyle(headerStyle);
            cell51.setCellStyle(headerStyle);
            cell52.setCellStyle(headerStyle);
            cell53.setCellStyle(headerStyle);
            cell54.setCellStyle(headerStyle);
            cell55.setCellStyle(headerStyle);
            cell56.setCellStyle(headerStyle);
            cell57.setCellStyle(headerStyle);
            cell58.setCellStyle(headerStyle);
            cell59.setCellStyle(headerStyle);
            cell60.setCellStyle(headerStyle);
            cell61.setCellStyle(headerStyle);
            cell62.setCellStyle(headerStyle);
            cell63.setCellStyle(headerStyle);
            cell64.setCellStyle(headerStyle);
            cell65.setCellStyle(headerStyle);
            cell66.setCellStyle(headerStyle);
            cell67.setCellStyle(headerStyle);
            cell68.setCellStyle(headerStyle);
            cell69.setCellStyle(headerStyle);
            cell70.setCellStyle(headerStyle);
            cell71.setCellStyle(headerStyle);
            cell72.setCellStyle(headerStyle);
            cell73.setCellStyle(headerStyle);
            cell74.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell50 = row.createCell(0);
                cell51 = row.createCell(1);
                cell52 = row.createCell(2);
                cell53 = row.createCell(3);
                cell54 = row.createCell(4);
                cell55 = row.createCell(5);
                cell56 = row.createCell(6);
                cell57 = row.createCell(7);
                cell58 = row.createCell(8);
                cell59 = row.createCell(9);
                cell60 = row.createCell(10);
                cell61 = row.createCell(11);
                cell62 = row.createCell(12);
                cell63 = row.createCell(13);
                cell64 = row.createCell(14);
                cell65 = row.createCell(15);
                cell66 = row.createCell(16);
                cell67 = row.createCell(17);
                cell68 = row.createCell(18);
                cell69 = row.createCell(19);
                cell70 = row.createCell(20);
                cell71 = row.createCell(21);
                cell72 = row.createCell(22);
                cell73 = row.createCell(23);
                cell74 = row.createCell(24);

                cell50.setCellValue(listaData.get(vi).strFormatDate);
                cell51.setCellValue(listaData.get(vi).NFLIGHT);
                cell52.setCellValue(listaData.get(vi).CARRI);
                cell53.setCellValue(listaData.get(vi).strDescFFLOW);
                cell54.setCellValue(listaData.get(vi).CDEPART);
                cell55.setCellValue(listaData.get(vi).CARRIVA);
                cell56.setCellValue(listaData.get(vi).strFormatFSENDSS);
                cell57.setCellValue(listaData.get(vi).QCPAD);
                cell58.setCellValue(listaData.get(vi).QCPCHD);
                cell59.setCellValue(listaData.get(vi).QCPINF);
                cell60.setCellValue(listaData.get(vi).QCPTRA);
                cell61.setCellValue(listaData.get(vi).strFormatFSENDOD);
                cell62.setCellValue(listaData.get(vi).QCPNOD);
                //cell63.setCellValue(listaData.get(vi).QCPNLEG);
                cell63.setCellValue(listaData.get(vi).DIFFODSVCR);
                cell64.setCellValue(listaData.get(vi).strFormatFSENDVC);
                cell65.setCellValue(listaData.get(vi).QCPNVC);
                cell66.setCellValue(listaData.get(vi).QCPNOCR);
                cell67.setCellValue(listaData.get(vi).QCPNMA);
                cell68.setCellValue(listaData.get(vi).QCPNTOT);
                cell69.setCellValue(listaData.get(vi).QCPNVAL);
                cell70.setCellValue(listaData.get(vi).strFormatDate3);
                cell71.setCellValue(listaData.get(vi).QCPNFI);
                cell72.setCellValue(listaData.get(vi).QCPNFRE);
                cell73.setCellValue(listaData.get(vi).lngQDIFF);
                cell74.setCellValue(listaData.get(vi).DESCRIP);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);
                cell64.setCellStyle(bodyStyle);
                cell65.setCellStyle(bodyStyle);
                cell66.setCellStyle(bodyStyle);
                cell67.setCellStyle(bodyStyle);
                cell68.setCellStyle(bodyStyle);
                cell69.setCellStyle(bodyStyle);
                cell70.setCellStyle(bodyStyle);
                cell71.setCellStyle(bodyStyle);
                cell72.setCellStyle(bodyStyle);
                cell73.setCellStyle(bodyStyle);
                cell74.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetTkt2")
    public @ResponseBody
    void getXLSXDetTkt2(HttpServletRequest request, HttpServletResponse response) {
        String fileNameDownload = String.format("Flight Conciliation Detail Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            A1691Filter2 filter = new A1691Filter2();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTipo = request.getParameter("strTipo");
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());filter.yearFrom = request.getParameter("yearFrom");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.DFLIGHT = request.getParameter("DFLIGHT");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.CARRIVA = request.getParameter("CARRIVA");

            HashMap<String, String> hmPaises = new MasterDAO(this.serverSession.getServerSession())
                    .loadPaisesHash();

            List<A1692Filter> listaData = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S05A1692(filter, strTipo, hmPaises);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Detail Ticket");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell cell00, cell01, cell02, cell03, cell04, cell05, cell06,
                    cell07, cell08, cell09, cell10, cell11, cell12, cell13,
                    cell14, cell15, cell16, cell17, cell18, cell19;

            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell00 = row.createCell(0);
            cell01 = row.createCell(1);
            cell02 = row.createCell(2);
            cell03 = row.createCell(3);
            cell04 = row.createCell(4);
            cell05 = row.createCell(5);
            cell06 = row.createCell(6);
            cell07 = row.createCell(7);
            cell08 = row.createCell(8);
            cell09 = row.createCell(9);
            cell10 = row.createCell(10);
            cell11 = row.createCell(11);
            cell12 = row.createCell(12);
            cell13 = row.createCell(13);
            cell14 = row.createCell(14);
            cell15 = row.createCell(15);
            cell16 = row.createCell(16);
            cell17 = row.createCell(17);
            cell18 = row.createCell(18);
//            cell19 = row.createCell(19);

            cell00.setCellValue("Ticket");
            cell01.setCellValue("Seq");
            cell02.setCellValue("Rolling");
            cell03.setCellValue("Sale");
            cell08.setCellValue("Coupon");
            cell15.setCellValue("Accounting Information");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 18));

            cell00.setCellStyle(headerStyle);
            cell01.setCellStyle(headerStyle);
            cell02.setCellStyle(headerStyle);
            cell03.setCellStyle(headerStyle);
            cell04.setCellStyle(headerStyle);
            cell05.setCellStyle(headerStyle);
            cell06.setCellStyle(headerStyle);
            cell07.setCellStyle(headerStyle);
            cell08.setCellStyle(headerStyle);
            cell09.setCellStyle(headerStyle);
            cell10.setCellStyle(headerStyle);
            cell11.setCellStyle(headerStyle);
            cell12.setCellStyle(headerStyle);
            cell13.setCellStyle(headerStyle);
            cell14.setCellStyle(headerStyle);
            cell15.setCellStyle(headerStyle);
            cell16.setCellStyle(headerStyle);
            cell17.setCellStyle(headerStyle);
            cell18.setCellStyle(headerStyle);
//            cell19.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="row2">
            row = sheet.createRow(vj);

            cell00 = row.createCell(0);
            cell01 = row.createCell(1);
            cell02 = row.createCell(2);
            cell03 = row.createCell(3);
            cell04 = row.createCell(4);
            cell05 = row.createCell(5);
            cell06 = row.createCell(6);
            cell07 = row.createCell(7);
            cell08 = row.createCell(8);
            cell09 = row.createCell(9);
            cell10 = row.createCell(10);
            cell11 = row.createCell(11);
            cell12 = row.createCell(12);
            cell13 = row.createCell(13);
            cell14 = row.createCell(14);
            cell15 = row.createCell(15);
            cell16 = row.createCell(16);
            cell17 = row.createCell(17);
            cell18 = row.createCell(18);
//            cell19 = row.createCell(19);

            cell03.setCellValue("Date");
            cell04.setCellValue("Country");
            cell05.setCellValue("Fare");
            cell06.setCellValue("RBD");
            cell07.setCellValue("Pax");
            cell08.setCellValue("Operation");
            cell09.setCellValue("Carrier");
//            cell08.setCellValue("0%");
//            cell10.setCellValue("16%");
            cell10.setCellValue("Total");
            cell12.setCellValue("Com.");
            cell13.setCellValue("Curr.");
            cell14.setCellValue("Status");
            cell15.setCellValue("Date");
            cell16.setCellValue("Id");
            cell17.setCellValue("Status");
            cell18.setCellValue("Service Type");

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 19));

            cell00.setCellStyle(headerStyle);
            cell01.setCellStyle(headerStyle);
            cell02.setCellStyle(headerStyle);
            cell03.setCellStyle(headerStyle);
            cell04.setCellStyle(headerStyle);
            cell05.setCellStyle(headerStyle);
            cell06.setCellStyle(headerStyle);
            cell07.setCellStyle(headerStyle);
            cell08.setCellStyle(headerStyle);
            cell09.setCellStyle(headerStyle);
            cell10.setCellStyle(headerStyle);
            cell11.setCellStyle(headerStyle);
            cell12.setCellStyle(headerStyle);
            cell13.setCellStyle(headerStyle);
            cell14.setCellStyle(headerStyle);
            cell15.setCellStyle(headerStyle);
            cell16.setCellStyle(headerStyle);
            cell17.setCellStyle(headerStyle);
            cell18.setCellStyle(headerStyle);
//            cell19.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="row3">
            row = sheet.createRow(vj);

            cell00 = row.createCell(0);
            cell01 = row.createCell(1);
            cell02 = row.createCell(2);
            cell03 = row.createCell(3);
            cell04 = row.createCell(4);
            cell05 = row.createCell(5);
            cell06 = row.createCell(6);
            cell07 = row.createCell(7);
            cell08 = row.createCell(8);
            cell09 = row.createCell(9);
            cell10 = row.createCell(10);
            cell11 = row.createCell(11);
            cell12 = row.createCell(12);
            cell13 = row.createCell(13);
            cell14 = row.createCell(14);
            cell15 = row.createCell(15);
            cell16 = row.createCell(16);
            cell17 = row.createCell(17);
            cell18 = row.createCell(18);
//            cell19 = row.createCell(19);

            cell05.setCellValue("Basis");
            cell10.setCellValue("Value");
            cell11.setCellValue("YQ");
//            cell10.setCellValue("Value");
//            cell11.setCellValue("YQ");
//            cell12.setCellValue("Value");
//            cell13.setCellValue("YQ");
            cell14.setCellValue("Valoration");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 14, 14));

            cell00.setCellStyle(headerStyle);
            cell01.setCellStyle(headerStyle);
            cell02.setCellStyle(headerStyle);
            cell03.setCellStyle(headerStyle);
            cell04.setCellStyle(headerStyle);
            cell05.setCellStyle(headerStyle);
            cell06.setCellStyle(headerStyle);
            cell07.setCellStyle(headerStyle);
            cell08.setCellStyle(headerStyle);
            cell09.setCellStyle(headerStyle);
            cell10.setCellStyle(headerStyle);
            cell11.setCellStyle(headerStyle);
            cell12.setCellStyle(headerStyle);
            cell13.setCellStyle(headerStyle);
            cell14.setCellStyle(headerStyle);
            cell15.setCellStyle(headerStyle);
            cell16.setCellStyle(headerStyle);
            cell17.setCellStyle(headerStyle);
            cell18.setCellStyle(headerStyle);
//            cell19.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell00 = row.createCell(0);
                cell01 = row.createCell(1);
                cell02 = row.createCell(2);
                cell03 = row.createCell(3);
                cell04 = row.createCell(4);
                cell05 = row.createCell(5);
                cell06 = row.createCell(6);
                cell07 = row.createCell(7);
                cell08 = row.createCell(8);
                cell09 = row.createCell(9);
                cell10 = row.createCell(10);
                cell11 = row.createCell(11);
                cell12 = row.createCell(12);
                cell13 = row.createCell(13);
                cell14 = row.createCell(14);
                cell15 = row.createCell(15);
                cell16 = row.createCell(16);
                cell17 = row.createCell(17);
                cell18 = row.createCell(18);
//                cell19 = row.createCell(19);

                cell00.setCellValue(listaData.get(vi).strTicket);
                cell01.setCellValue(listaData.get(vi).SEQ);
                cell02.setCellValue(listaData.get(vi).SEQRO);
                cell03.setCellValue(listaData.get(vi).strFormatFVTA);
                cell04.setCellValue(listaData.get(vi).PSVVTA);
                cell05.setCellValue(listaData.get(vi).FBASE);
                cell06.setCellValue(listaData.get(vi).CLAS);
                cell07.setCellValue(listaData.get(vi).QTYPAX);
                cell08.setCellValue(listaData.get(vi).TOPUS);
                cell09.setCellValue(listaData.get(vi).CARR);
//                cell08.setCellValue(listaData.get(vi).VCPN0);
//                cell09.setCellValue(listaData.get(vi).VYQ0);
//                cell10.setCellValue(listaData.get(vi).VCPN16);
//                cell11.setCellValue(listaData.get(vi).VYQ16);
                cell10.setCellValue(listaData.get(vi).VCPN);
                cell11.setCellValue(listaData.get(vi).VYQ);
                cell12.setCellValue(listaData.get(vi).COMISI);
                cell13.setCellValue(listaData.get(vi).MDACP);
                cell14.setCellValue(listaData.get(vi).strDescFVAL);
                cell15.setCellValue(listaData.get(vi).strFCON);
                cell16.setCellValue(listaData.get(vi).IDCON);
                cell17.setCellValue(listaData.get(vi).strDescSTCON);
                cell18.setCellValue(listaData.get(vi).strFFLOW);

                cell00.setCellStyle(bodyStyle);
                cell01.setCellStyle(bodyStyle);
                cell02.setCellStyle(bodyStyle);
                cell03.setCellStyle(bodyStyle);
                cell04.setCellStyle(bodyStyle);
                cell05.setCellStyle(bodyStyle);
                cell06.setCellStyle(bodyStyle);
                cell07.setCellStyle(bodyStyle);
                cell08.setCellStyle(bodyStyle);
                cell09.setCellStyle(bodyStyle);
                cell10.setCellStyle(bodyStyle);
                cell11.setCellStyle(bodyStyle);
                cell12.setCellStyle(bodyStyle);
                cell13.setCellStyle(bodyStyle);
                cell14.setCellStyle(bodyStyle);
                cell15.setCellStyle(bodyStyle);
                cell16.setCellStyle(bodyStyle);
                cell17.setCellStyle(bodyStyle);
                cell18.setCellStyle(bodyStyle);
//                cell19.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetTkt1")
    public @ResponseBody
    void getXLSXDetTkt1(HttpServletRequest request, HttpServletResponse response) {
        try {
            A1691Filter2 filter = new A1691Filter2();
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strTipo = request.getParameter("strTipo");
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());filter.yearFrom = request.getParameter("yearFrom");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.DFLIGHT = request.getParameter("DFLIGHT");
            filter.NFLIGHT = request.getParameter("NFLIGHT");
            filter.CDEPART = request.getParameter("CDEPART");
            filter.CARRIVA = request.getParameter("CARRIVA");

            HashMap<String, String> hmPaises = new MasterDAO(this.serverSession.getServerSession())
                    .loadPaisesHash();

            List<A1692Filter> listaData = new FlightConciliationLogic(this.serverSession.getServerSession())
                    .loadPX095S05A1692(filter, strTipo, hmPaises);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Detail Ticket");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
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
//            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
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
            // </editor-fold>

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell cell_00, cell_01, cell_02, cell_03, cell_04, cell_05, cell_06, cell_07,
                    cell_08, cell_09, cell_10, cell_11, cell_12, cell_13, cell_14, cell_15;

            // <editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            cell_00 = row.createCell(0);
            cell_01 = row.createCell(1);
            cell_02 = row.createCell(2);
            cell_03 = row.createCell(3);
            cell_04 = row.createCell(4);
            cell_05 = row.createCell(5);
            cell_06 = row.createCell(6);
            cell_07 = row.createCell(7);
            cell_08 = row.createCell(8);
            cell_09 = row.createCell(9);
            cell_10 = row.createCell(10);
            cell_11 = row.createCell(11);
            cell_12 = row.createCell(12);
            cell_13 = row.createCell(13);
            cell_14 = row.createCell(14);
            cell_15 = row.createCell(15);

            cell_00.setCellValue("Ticket");
            cell_01.setCellValue("Accounting");
            cell_02.setCellValue("Sale");
            cell_07.setCellValue("Coupon");

            sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 15));

            cell_00.setCellStyle(headerStyle);
            cell_01.setCellStyle(headerStyle);
            cell_02.setCellStyle(headerStyle);
            cell_03.setCellStyle(headerStyle);
            cell_04.setCellStyle(headerStyle);
            cell_05.setCellStyle(headerStyle);
            cell_06.setCellStyle(headerStyle);
            cell_07.setCellStyle(headerStyle);
            cell_08.setCellStyle(headerStyle);
            cell_09.setCellStyle(headerStyle);
            cell_10.setCellStyle(headerStyle);
            cell_11.setCellStyle(headerStyle);
            cell_12.setCellStyle(headerStyle);
            cell_13.setCellStyle(headerStyle);
            cell_14.setCellStyle(headerStyle);
            cell_15.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row2">
            row = sheet.createRow(vj);

            cell_00 = row.createCell(0);
            cell_01 = row.createCell(1);
            cell_02 = row.createCell(2);
            cell_03 = row.createCell(3);
            cell_04 = row.createCell(4);
            cell_05 = row.createCell(5);
            cell_06 = row.createCell(6);
            cell_07 = row.createCell(7);
            cell_08 = row.createCell(8);
            cell_09 = row.createCell(9);
            cell_10 = row.createCell(10);
            cell_11 = row.createCell(11);
            cell_12 = row.createCell(12);
            cell_13 = row.createCell(13);
            cell_14 = row.createCell(14);
            cell_15 = row.createCell(15);

            cell_01.setCellValue("Date");
            cell_02.setCellValue("Date");
            cell_03.setCellValue("Country");
            cell_04.setCellValue("Fare");
            cell_05.setCellValue("RBD");
            cell_06.setCellValue("Pax");
            cell_07.setCellValue("Operation");
            cell_08.setCellValue("Carrier");
            cell_09.setCellValue("Value");
            cell_10.setCellValue("Com.");
            cell_11.setCellValue("Curr.");
            cell_12.setCellValue("Status");
            cell_13.setCellValue("MXN");
            cell_14.setCellValue("Rate");
            cell_15.setCellValue("USD");

            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));

            cell_00.setCellStyle(headerStyle);
            cell_01.setCellStyle(headerStyle);
            cell_02.setCellStyle(headerStyle);
            cell_03.setCellStyle(headerStyle);
            cell_04.setCellStyle(headerStyle);
            cell_05.setCellStyle(headerStyle);
            cell_06.setCellStyle(headerStyle);
            cell_07.setCellStyle(headerStyle);
            cell_08.setCellStyle(headerStyle);
            cell_09.setCellStyle(headerStyle);
            cell_10.setCellStyle(headerStyle);
            cell_11.setCellStyle(headerStyle);
            cell_12.setCellStyle(headerStyle);
            cell_13.setCellStyle(headerStyle);
            cell_14.setCellStyle(headerStyle);
            cell_15.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>
            // <editor-fold defaultstate="collapsed" desc="row3">
            row = sheet.createRow(vj);

            cell_00 = row.createCell(0);
            cell_01 = row.createCell(1);
            cell_02 = row.createCell(2);
            cell_03 = row.createCell(3);
            cell_04 = row.createCell(4);
            cell_05 = row.createCell(5);
            cell_06 = row.createCell(6);
            cell_07 = row.createCell(7);
            cell_08 = row.createCell(8);
            cell_09 = row.createCell(9);
            cell_10 = row.createCell(10);
            cell_11 = row.createCell(11);
            cell_12 = row.createCell(12);
            cell_13 = row.createCell(13);
            cell_14 = row.createCell(14);
            cell_15 = row.createCell(15);

            cell_04.setCellValue("Basis");
            cell_12.setCellValue("Valoration");

            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 12, 12));

            cell_00.setCellStyle(headerStyle);
            cell_01.setCellStyle(headerStyle);
            cell_02.setCellStyle(headerStyle);
            cell_03.setCellStyle(headerStyle);
            cell_04.setCellStyle(headerStyle);
            cell_05.setCellStyle(headerStyle);
            cell_06.setCellStyle(headerStyle);
            cell_07.setCellStyle(headerStyle);
            cell_08.setCellStyle(headerStyle);
            cell_09.setCellStyle(headerStyle);
            cell_10.setCellStyle(headerStyle);
            cell_11.setCellStyle(headerStyle);
            cell_12.setCellStyle(headerStyle);
            cell_13.setCellStyle(headerStyle);
            cell_14.setCellStyle(headerStyle);
            cell_15.setCellStyle(headerStyle);

            ++vj;
            // </editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                cell_00 = row.createCell(0);
                cell_01 = row.createCell(1);
                cell_02 = row.createCell(2);
                cell_03 = row.createCell(3);
                cell_04 = row.createCell(4);
                cell_05 = row.createCell(5);
                cell_06 = row.createCell(6);
                cell_07 = row.createCell(7);
                cell_08 = row.createCell(8);
                cell_09 = row.createCell(9);
                cell_10 = row.createCell(10);
                cell_11 = row.createCell(11);
                cell_12 = row.createCell(12);
                cell_13 = row.createCell(13);
                cell_14 = row.createCell(14);
                cell_15 = row.createCell(15);

                cell_00.setCellValue(listaData.get(vi).strTicket);
                cell_01.setCellValue(listaData.get(vi).strFormatDate2);
                cell_02.setCellValue(listaData.get(vi).strFormatFVTA);
                cell_03.setCellValue(listaData.get(vi).PSVVTA);
                cell_04.setCellValue(listaData.get(vi).FBASE);
                cell_05.setCellValue(listaData.get(vi).CLAS);
                cell_06.setCellValue(listaData.get(vi).QTYPAX);
                cell_07.setCellValue(listaData.get(vi).TOPUS);
                cell_08.setCellValue(listaData.get(vi).CARR);
                cell_09.setCellValue(listaData.get(vi).VCPN);
                cell_10.setCellValue(listaData.get(vi).COMISI);
                cell_11.setCellValue(listaData.get(vi).MDACP);
                cell_12.setCellValue(listaData.get(vi).strDescFVAL);
                cell_13.setCellValue(listaData.get(vi).VCPMX);
                cell_14.setCellValue(listaData.get(vi).TCMUS);
                cell_15.setCellValue(listaData.get(vi).VCPUS);

                cell_00.setCellStyle(bodyStyle);
                cell_01.setCellStyle(bodyStyle);
                cell_02.setCellStyle(bodyStyle);
                cell_03.setCellStyle(bodyStyle);
                cell_04.setCellStyle(bodyStyle);
                cell_05.setCellStyle(bodyStyle);
                cell_06.setCellStyle(bodyStyle);
                cell_07.setCellStyle(bodyStyle);
                cell_08.setCellStyle(bodyStyle);
                cell_09.setCellStyle(bodyStyle);
                cell_10.setCellStyle(bodyStyle);
                cell_11.setCellStyle(bodyStyle);
                cell_12.setCellStyle(bodyStyle);
                cell_13.setCellStyle(bodyStyle);
                cell_14.setCellStyle(bodyStyle);
                cell_15.setCellStyle(bodyStyle);
                // </editor-fold>
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);

            String fileNameDownload = String.format("Flight Conciliation Detail Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Flight_Manifest")
    public @ResponseBody
    void getXLSX_Flight_Manifest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_Flight_Manifest");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        A3729Filter filter = new A3729Filter();
        Gson gson = new Gson();
        String beanString;

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3729Filter> listaData = logic.loadPX095SGGA3729(filter);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

            DataFormat fmt = workbook.createDataFormat();
            bodyStyle.setDataFormat(fmt.getFormat("@"));

            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);

            CH1_0.setCellValue("Nbr");
            CH1_1.setCellValue("Flight");
            CH1_3.setCellValue("Last Name");
            CH1_4.setCellValue("First Name");
            CH1_5.setCellValue("Type Pax");
            CH1_6.setCellValue("Seat");
            CH1_7.setCellValue("PNR");
            CH1_8.setCellValue("Ticket");
            CH1_9.setCellValue("Status");
            CH1_10.setCellValue("Orig");
            CH1_11.setCellValue("Dest");
            CH1_12.setCellValue("VCR vs");
            CH1_13.setCellValue("Process Sabre");
            CH1_15.setCellValue("Flag");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);

            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Number");
            CH2_12.setCellValue("Manifest");
            CH2_13.setCellValue("Scan");
            CH2_14.setCellValue("Status");
            CH2_15.setCellValue("Sales-PRAXIS");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);

                rcell8.setCellStyle(bodyStyle);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).NFLIGHT);
                rcell3.setCellValue(listaData.get(vi).LNAME);
                rcell4.setCellValue(listaData.get(vi).FNAME);
                rcell5.setCellValue(listaData.get(vi).desPAX);
                rcell6.setCellValue(listaData.get(vi).CHAIR);
                rcell7.setCellValue(listaData.get(vi).SPNR);
                rcell8.setCellValue(listaData.get(vi).strTicket);
                rcell9.setCellValue(listaData.get(vi).desSTVAL);
                rcell10.setCellValue(listaData.get(vi).CDEPART);
                rcell11.setCellValue(listaData.get(vi).CARRIVA);
                rcell12.setCellValue(listaData.get(vi).desSTVCR);
                rcell13.setCellValue(listaData.get(vi).descFSABRE);
                rcell14.setCellValue(listaData.get(vi).STASABR);
                rcell15.setCellValue(listaData.get(vi).descFSALES);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(7, true);
            sheet.setColumnWidth(8, 25 * 256);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Flight_Manifest_Main")
    public @ResponseBody
    void getXLSX_Flight_Manifest_Main(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX_Flight_Manifest_Main");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        A3729Filter filter = new A3729Filter();
        Gson gson = new Gson();
        String beanString;

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3729Filter> listaData = logic.loadPX095SQP04286(filter);

            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

            DataFormat fmt = workbook.createDataFormat();
            bodyStyle.setDataFormat(fmt.getFormat("@"));

            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);

            CH1_0.setCellValue("Nbr");
            CH1_1.setCellValue("Flight");
            CH1_3.setCellValue("Last Name");
            CH1_4.setCellValue("First Name");
            CH1_5.setCellValue("Type Pax");
            CH1_6.setCellValue("Seat");
            CH1_7.setCellValue("Ticket");
            CH1_8.setCellValue("Status");
            CH1_9.setCellValue("Orig");
            CH1_10.setCellValue("Dest");
            CH1_11.setCellValue("VCR vs");
            CH1_12.setCellValue("Process Sabre");
            CH1_14.setCellValue("Flag");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);

            CH2_1.setCellValue("Date");
            CH2_2.setCellValue("Number");
            CH2_11.setCellValue("Manifest");
            CH2_12.setCellValue("Scan");
            CH2_13.setCellValue("Status");
            CH2_14.setCellValue("Sales-PRAXIS");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);

                rcell7.setCellStyle(bodyStyle);

                rcell0.setCellValue(listaData.get(vi).RN);
                rcell1.setCellValue(listaData.get(vi).DFLIGHT);
                rcell2.setCellValue(listaData.get(vi).NFLIGHT);
                rcell3.setCellValue(listaData.get(vi).LNAME);
                rcell4.setCellValue(listaData.get(vi).FNAME);
                rcell5.setCellValue(listaData.get(vi).desPAX);
                rcell6.setCellValue(listaData.get(vi).CHAIR);
                rcell7.setCellValue(listaData.get(vi).strTicket);
                rcell8.setCellValue(listaData.get(vi).desSTVAL);
                rcell9.setCellValue(listaData.get(vi).CDEPART);
                rcell10.setCellValue(listaData.get(vi).CARRIVA);
                rcell11.setCellValue(listaData.get(vi).desSTVCR);
                rcell12.setCellValue(listaData.get(vi).descFSABRE);
                rcell13.setCellValue(listaData.get(vi).STASABR);
                rcell14.setCellValue(listaData.get(vi).descFSALES);
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.setColumnWidth(7, 25 * 256);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    /**
     * Añadir y eliminar de favoritos
     */
    @RequestMapping(value = "/insertFavoriteMenu")
    public @ResponseBody
    String insertFavoriteMenu(ModelMap map, HttpServletRequest request) {
        Gson gson = new Gson();
        try {
            String beanString = request.getParameter("beanString");
            A2149 filter = gson.fromJson(beanString, A2149.class);
            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            A2149 bean = logic.insertFavoriteMenu(filter);
            map.put("success", true);
            map.put("beanResylt", bean);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/deleteFavoriteMenu")
    public @ResponseBody
    String deleteFavoriteMenu(ModelMap map, HttpServletRequest request) {
        Gson gson = new Gson();
        try {
            String beanString = request.getParameter("beanString");
            A2149 filter = gson.fromJson(beanString, A2149.class);
            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            A2149 bean = logic.deleteFavoriteMenu(filter);
            map.put("success", true);
            map.put("beanResult", bean);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/exportFile1")
    public @ResponseBody
    String exportFile1(ModelMap map, HttpServletRequest request) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        String[] lista;//Nombres de los archivos en general
        String file = "";
        List<A3729Filter> listaArray = new ArrayList<A3729Filter>();
        byte[] bytes = null;
        //OBTENIENDO EL FILE ========================================
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strcia = request.getParameter("ruta");
            String strFecha = request.getParameter("fecha");

            String strPeriodo = request.getParameter("nFlight");

            String nameTxt = strcia.substring(50, 67);
            String nameTxt2 = strcia.substring(48, 65);

            String anio = strFecha.substring(0, 4);
            String mes = strFecha.substring(4, 6);
            String dia = strFecha.substring(6, 8);
            String fDate = anio + "/" + mes + "/" + dia;
            String dateTest = "2020/01/08";

            FilenameFilter fnfZIP = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return (/*name.startsWith(nameTxt) &&*/name.toLowerCase().endsWith(".txt"));
                }
            };

            Date fechaactual = new Date(System.currentTimeMillis());
            String fechaInicio = fDate; //fecha de ejemplo
            SimpleDateFormat date = new SimpleDateFormat("yyyy/MM/dd");
            Date fechaInicioDate = date.parse(fechaInicio);  //String a date
            Date fechaInicioDateTest = date.parse(dateTest);  //String a date

            //comprueba si es que inicio esta después que fecha actual       
            if (fechaInicioDate.after(fechaInicioDateTest)) {
                System.out.println("Editar la ruta");
                fDate = strFecha;
                nameTxt = nameTxt2;
            }

            //OBTENIENDO NOMBRE DEL ARCHIVO
            // listaArray=null;
            String pathImgs = "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\AM\\INSUMOS-FLOWN\\FLIGHT-MANIFIEST\\" + fDate;
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfZIP);//
            if (lista != null && lista.length > 0) {
                for (int i = 0; i < lista.length; i++) {
                    if (lista[i].toString().trim().startsWith(nameTxt)) {
                        //  file = lista[i].toString().trim();
                        A3729Filter nombre = new A3729Filter();
                        nombre.strFormatDate = lista[i].toString().trim();
                        listaArray.add(nombre);
                    }
                }
            }

            InputStream input;
            try {
                if (listaArray.size() > 0) {
                    File f = new File(pathImgs + "\\" + listaArray.get(0).strFormatDate);

                    if (f.exists()) {
                        bytes = new byte[(int) f.length()];
                        input = new FileInputStream(f);
                        input.read(bytes);
                        input.close();
                    }
                }

            } catch (SocketException e) {
                e.printStackTrace();
            } catch (IOException eg) {
                eg.printStackTrace();
            }

            map.put("success", true);
            map.put("listaArray", listaArray);
            map.put("str", new String(bytes));
        } catch (Exception e) {
            //e.printStackTrace();
            e.printStackTrace(pw);
            sw.toString();
            map.put("success", false);
            map.put("sesion", " Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchControlODS")
    public @ResponseBody
    String searchControlODS(ModelMap map, HttpServletRequest request) {
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            HashMap hm = logic.loadSQP03651();

            map.put("success", true);
            map.put("objODS", hm.get("ODS"));
            map.put("objVCRJ", hm.get("VCRJ"));
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    //-------------------------------------------------------------------------------------------------------------
    @RequestMapping(value = "/updateCouponA3729", method = RequestMethod.POST)
    public @ResponseBody
    String updateCouponA3729(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Integer cont = 0;
        String mensaje = "";
        String msjResult = "";
        String msjUpload = "";
        A3729Filter objResult = new A3729Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

//            String banco = request.getParameter("banco");
//            String input = request.getParameter("input");
            String filename = excelfile.getOriginalFilename();

            byte[] dataFile = excelfile.getBytes();
            objResult = updateCoupon(dataFile);

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

    private A3729Filter updateCoupon(byte[] bytes) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new FlightConciliationLogic();
        List<A3729Filter> lstData = new ArrayList<>();
        A3729Filter res = new A3729Filter();

        String mensaje = "Hubo un error al actualizar los tickets", strHora = Functions.getHoraActual();
        int i = 0;
        boolean isOk = false;

        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Tickets_update." + strSesion + ".xlsx";

            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            String primeraCelda = "";
            boolean escribe = false;

            FileInputStream file = new FileInputStream(new File(strArchivo));
            // leer archivo excel
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            //obtener la hoja que se va leer
            XSSFSheet sheet = worbook.getSheetAt(0);
            //obtener todas las filas de la hoja excel
            Iterator<Row> rowIterator = sheet.iterator();

//            Row row;
            // se recorre cada fila hasta el final
            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();

                    if (i > 2) {
                        A3729Filter obj = new A3729Filter();

                        obj.DFLIGHT = getCellValue(row.getCell(1)).trim();
                        obj.NFLIGHT = getCellValue(row.getCell(2)).trim();
                        obj.LNAME = getCellValue(row.getCell(3)).trim();
                        obj.FNAME = getCellValue(row.getCell(4)).trim();
                        obj.desPAX = getCellValue(row.getCell(5)).trim();

                        if (obj.desPAX.equals("Adult")) {
                            obj.TPAX = "AD";
                        } else if (obj.desPAX.equals("Children")) {
                            obj.TPAX = "CH";
                        } else if (obj.desPAX.equals("Infant")) {
                            obj.TPAX = "INF";
                        }

                        obj.CHAIR = getCellValue(row.getCell(6)).trim();

                        try {
                            obj.strTicket = getCellValue(row.getCell(7)).trim().substring(0, 13);
                            obj.CUPON = getCellValue(row.getCell(7)).trim().substring(13, 14);
                        } catch (Exception e) {
                            obj.strTicket = "";
                        }

                        if (obj.strTicket.equals("")) {
                            System.out.println("------------- NEXT -------------");
                            continue;
                        }

                        obj.desSTVAL = getCellValue(row.getCell(8)).trim();

                        if (obj.desSTVAL.trim().equals("No conciliado")) {
                            obj.STVAL = "1";
                        } else if (obj.desSTVAL.trim().equals("Conciliado")) {
                            obj.STVAL = "0";
                        }

                        obj.CDEPART = getCellValue(row.getCell(9)).trim();
                        obj.CARRIVA = getCellValue(row.getCell(10)).trim();
                        obj.desSTVCR = getCellValue(row.getCell(11)).trim();

                        if (obj.desSTVCR.trim().equals("Yes")) {
                            obj.STVCR = "Y";
                        } else if (obj.desSTVCR.trim().equals("")) {
                            obj.STVCR = "";
                        }

                        obj.descFSABRE = getCellValue(row.getCell(12)).trim();

                        if (obj.descFSABRE.trim().equals("Not Found")) {
                            obj.FSABRE = "0";
                        } else if (obj.descFSABRE.trim().equals("Found")) {
                            obj.FSABRE = "1";
                        } else if (obj.descFSABRE.trim().equals("Found but not matching coupon")) {
                            obj.FSABRE = "2";
                        } else if (obj.descFSABRE.trim().equals("No Revenue(Employes/Oth)")) {
                            obj.FSABRE = "4";
                        } else if (obj.descFSABRE.trim().equals("Manual")) {
                            obj.FSABRE = "5";
                        } else if (obj.descFSABRE.trim().equals("BPO Found")) {
                            obj.FSABRE = "6";
                        }

                        obj.STASABR = getCellValue(row.getCell(13)).trim();
                        obj.descFSALES = getCellValue(row.getCell(14)).trim();

//                        obj.CUPON = getCellValue(row.getCell(15)).trim();
//                        if (obj.descFSALES.trim().equals("")) {
//                            obj.FA720 = "";
//                        } else {
//                            obj.FA720 = "Yes";
//                        }
                        lstData.add(obj);

                    }
                }

                file.close();

//                for (A3729Filter cadDet : lstData) {
                System.out.println("Cantidad de registros a actualizar: " + lstData.size());
//                }

                logic.setSession(this.serverSession.getServerSession());
                res = logic.SQP04282(lstData);

            } catch (Exception e) {
                e.getMessage();
            }

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;

    }

    //-------------------------------------------------------------------------------------------------------------
    @RequestMapping(value = "/updateCouponA3729_INF", method = RequestMethod.POST)
    public @ResponseBody
    String updateCouponA3729_INF(ModelMap map, @RequestParam("excelfile_INF") MultipartFile excelfile_INF, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Integer cont = 0;
        String mensaje = "";
        String msjResult = "";
        String msjUpload = "";
        A3729Filter objResult = new A3729Filter();

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String filename = excelfile_INF.getOriginalFilename();

            byte[] dataFile = excelfile_INF.getBytes();
            objResult = updateCoupon_INF(dataFile);

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

    private A3729Filter updateCoupon_INF(byte[] bytes) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        logic = new FlightConciliationLogic();
        List<A3729Filter> lstData = new ArrayList<>();
        A3729Filter res = new A3729Filter();

        String mensaje = "Hubo un error al actualizar los infantes", strHora = Functions.getHoraActual();
        int i = 0;
        boolean isOk = false;

        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Tickets_update_INF." + strSesion + ".xlsx";

            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter formatter = new DataFormatter();
            String primeraCelda = "";
            boolean escribe = false;

            FileInputStream file = new FileInputStream(new File(strArchivo));
            // leer archivo excel
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            //obtener la hoja que se va leer
            XSSFSheet sheet = worbook.getSheetAt(0);
            //obtener todas las filas de la hoja excel
            Iterator<Row> rowIterator = sheet.iterator();

//            Row row;
            // se recorre cada fila hasta el final
            try {
                while (rowIterator.hasNext()) {
                    i++;
                    Row row = rowIterator.next();

                    if (i > 2) {
                        A3729Filter obj = new A3729Filter();

                        obj.DFLIGHT = getCellValue(row.getCell(1)).trim();
                        obj.NFLIGHT = getCellValue(row.getCell(2)).trim();
                        obj.LNAME = getCellValue(row.getCell(3)).trim();
                        obj.FNAME = getCellValue(row.getCell(4)).trim();
                        obj.desPAX = getCellValue(row.getCell(5)).trim();

                        if (obj.LNAME.equals("") && obj.FNAME.equals("")) {
                            System.out.println("------------- NEXT -------------");
                            continue;
                        }

                        if (obj.desPAX.equals("Adult")) {
                            obj.TPAX = "AD";
                        } else if (obj.desPAX.equals("Children")) {
                            obj.TPAX = "CH";
                        } else if (obj.desPAX.equals("Infant")) {
                            obj.TPAX = "INF";
                        }

                        obj.CHAIR = getCellValue(row.getCell(6)).trim();

                        try {
                            obj.strTicket = getCellValue(row.getCell(7)).trim().substring(0, 13);
                            obj.CUPON = getCellValue(row.getCell(7)).trim().substring(13, 14);
                        } catch (Exception e) {
                            obj.strTicket = "";
                            obj.CUPON = "";
                        }

                        obj.desSTVAL = getCellValue(row.getCell(8)).trim();

                        if (obj.desSTVAL.trim().equals("No conciliado")) {
                            obj.STVAL = "1";
                        } else if (obj.desSTVAL.trim().equals("Conciliado")) {
                            obj.STVAL = "0";
                        }

                        obj.CDEPART = getCellValue(row.getCell(9)).trim();
                        obj.CARRIVA = getCellValue(row.getCell(10)).trim();
                        obj.desSTVCR = getCellValue(row.getCell(11)).trim();

                        if (obj.desSTVCR.trim().equals("Yes")) {
                            obj.STVCR = "Y";
                        } else if (obj.desSTVCR.trim().equals("")) {
                            obj.STVCR = "";
                        }

                        obj.descFSABRE = getCellValue(row.getCell(12)).trim();

                        if (obj.descFSABRE.trim().equals("Not Found")) {
                            obj.FSABRE = "0";
                        } else if (obj.descFSABRE.trim().equals("Found")) {
                            obj.FSABRE = "1";
                        } else if (obj.descFSABRE.trim().equals("Found but not matching coupon")) {
                            obj.FSABRE = "2";
                        } else if (obj.descFSABRE.trim().equals("No Revenue(Employes/Oth)")) {
                            obj.FSABRE = "4";
                        } else if (obj.descFSABRE.trim().equals("Manual")) {
                            obj.FSABRE = "5";
                        } else if (obj.descFSABRE.trim().equals("BP Found")) {
                            obj.FSABRE = "6";
                        }

                        obj.STASABR = getCellValue(row.getCell(13)).trim();     // USED - OK - LFTD - CKIN 
//                        obj.descFSALES = getCellValue(row.getCell(14)).trim();

                        lstData.add(obj);

                    }
                }

                file.close();
                System.out.println("Cantidad de registros a actualizar: " + lstData.size());

                logic.setSession(this.serverSession.getServerSession());
                res = logic.SQP04400(lstData);

            } catch (Exception e) {
                e.getMessage();
            }

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;

    }

    //-------------------------------------------------------------------------------------------------------------
    public static String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
//                        cellValue = formatter.formatCellValue(cell);
                        cellValue = new SimpleDateFormat("yyyyMMdd").format(cell.getDateCellValue()) + "";
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String.valueOf(intValue) : String.valueOf(value);
//                        cellValue = String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    //cellValue = String.valueOf(cell.getCellFormula());
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }

    @RequestMapping(value = "MaintenanceA3729")
    public @ResponseBody
    String MaintenanceA3729(ModelMap map, HttpServletRequest request) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String option;
        String beanString;
        Gson gson = new Gson();

        A3729Filter filter = new A3729Filter();
        String msj = "";

        try {

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (!filter.TICKET.equals("") && filter.TICKET_2.equals("")) {

                //Update normal, sin ticket 2
                msj = logic.SQP04320(filter);
            } else {

                //update con ticket 2
                msj = logic.SQP04323(filter);
            }

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

    @RequestMapping(value = "validTktExists")
    public @ResponseBody
    String validTktExists(ModelMap map, HttpServletRequest request) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String option;
        String beanString;
        Gson gson = new Gson();

        A3729Filter filter = new A3729Filter();
//        String msj = "";
        boolean existeTKT = false;

        try {

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (!filter.TICKET_2.equals("")) {
                existeTKT = logic.SQP04321(filter);
            }

            map.put("success", true);
            map.put("existeTKT", existeTKT);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "deleteDuplicateA3729")
    public @ResponseBody
    String deleteDuplicateA3729(ModelMap map, HttpServletRequest request) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String option;
        String beanString;
        Gson gson = new Gson();

        A3729Filter filter = new A3729Filter();
        String msj = "";

        try {

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A3729Filter.class);

            logic = new FlightConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.SQP04550(filter);

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
