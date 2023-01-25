package net.miatech.praxis.controllers.salesAudit;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A1674Filter;
import net.miatech.beans.SaleAudit.A1675Filter;
import net.miatech.beans.SaleAudit.A2537Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.widgets.FacsimilDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import net.miatech.praxis.logic.salesAudit.SalesAuditAcceptedLogic;
import net.miatech.praxis.spring.INF020;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/SalesAuditAccepted")
public class SalesAuditAcceptedController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private SalesAuditAcceptedLogic logic;
    private SQP00989Filter filter;
    private FACSIMILFilter filter2;
    private FacsimilDAO facsimilDAO;
    private MasterDAO masterDAO;
    //private ProrrateoNewLogic prorrateoNewLogic;

    @RequestMapping(value = "obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        List<A1248> lst;
        List<A1248> lst2;
        List<A1248> lst3;
        HashMap map01, map02, map03;
        ArrayList<HashMap<String, String>> lstOperadores = new ArrayList<>();
        ArrayList<HashMap<String, String>> lstCampos = new ArrayList<>();
        ArrayList<HashMap<String, String>> lstCampos2 = new ArrayList<>();
        try {

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadFieldsConditions();
            map01 = new HashMap<>();
            map01.put("USERFIELD", "ALL");
            lstOperadores.add(map01);
            for (int vi = 0; vi < lst.size(); ++vi) {
                map01 = new HashMap<>();
                map01.put("USERFIELD", lst.get(vi).USERFIELD);
                lstOperadores.add(map01);
            }
            lst2 = logic.loadFields();
            for (int vi = 0; vi < lst2.size(); ++vi) {
                map02 = new HashMap<>();
                map02.put("DESCRIPT", lst2.get(vi).DESCRIPT);
                lstCampos.add(map02);
            }
            lst3 = logic.loadFields2();
            map03 = new HashMap<>();
            map03.put("DESCRIPT", "ALL");
            lstCampos2.add(map03);
            for (int vi = 0; vi < lst3.size(); ++vi) {
                map03 = new HashMap<>();
                map03.put("DESCRIPT", lst3.get(vi).DESCRIPT);
                lstCampos2.add(map03);
            }

            map.put("lstOperadores", lstOperadores);
            map.put("lstCampos", lstCampos);
            map.put("lstCampos2", lstCampos2);
            map.put("user", serverSession.getServerSession().getUserView().getCustomerInfo());
            map.put("success", true);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        SQP00989Filter filter = new SQP00989Filter();
        try {
            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.OPCION = request.getParameter("OPCION").trim();
            filter.DATEFROM = request.getParameter("DATEFROM").trim();
            filter.DATETO = request.getParameter("DATETO").trim();
            filter.A1672FUENT = request.getParameter("A1672FUENT").trim();
            filter.A1672CANAL = request.getParameter("A1672CANAL").trim();
            filter.A1672TDOC = request.getParameter("A1672TDOC").trim();
            filter.A1672TRNCU = request.getParameter("A1672TRNCU").trim();
            filter.A1672AGENT = request.getParameter("A1672AGENT").trim();
            filter.A1672ITIN = request.getParameter("A1672ITIN").trim();
            filter.A1672FBASI = request.getParameter("A1672FBASI").trim();
            filter.BOOKFROM = request.getParameter("BOOKFROM").trim();
            filter.BOOKTO = request.getParameter("BOOKTO").trim();
            filter.LIKEFBASIS = request.getParameter("LIKEFBASIS").trim();
            filter.LIKEREASON = request.getParameter("LIKEREASON").trim();
            filter.MONTO = Double.valueOf(request.getParameter("MONTO"));
            filter.Agent = request.getParameter("Agent").trim();
            filter.strTicket = request.getParameter("strTicket").trim();
            filter.REASONS = request.getParameter("REASONS").trim();
            filter.A1672PAIVT = request.getParameter("A1672PAIVT").trim();
            // filter.ROUTE = request.getParameter("ROUTE").toString().trim();

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> lst_search = logic.Search(filter);

            map.put("success", true);
            map.put("data", lst_search);
            map.put("total", lst_search.size() > 0 ? lst_search.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchADMData")
    public @ResponseBody
    String searchADMData(ModelMap map, HttpServletRequest request) {
        //List<SQP00989Filter> listaData;
        SQP00989Filter beanADM = new SQP00989Filter();
        filter2 = new FACSIMILFilter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            List<SQP00989Filter> lstSelectedTkts = Arrays.asList(new Gson().fromJson(
                    request.getParameter("lstSelectedTkts"), SQP00989Filter[].class
            ));

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            beanADM = logic.searchADMData(filter2, lstSelectedTkts);

            if (lstSelectedTkts != null) {
                map.put("hayLista", "true");
                map.put("lstSelected", lstSelectedTkts);
            } else {
                map.put("hayLista", "false");
            }
            map.put("success", true);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        map.put("beanADM", beanADM);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search_Pattern")
    public @ResponseBody
    String search_Pattern(ModelMap map, HttpServletRequest request) {
        filter = new SQP00989Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> listaData = logic.search_Pattern(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    /* COMPONENTE */
    @RequestMapping(value = "loadTicketComponent")
    public @ResponseBody
    String loadTicketComponent(ModelMap map, HttpServletRequest request) throws Exception {
        A1672Filter filter = new A1672Filter();
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        BSPF104 filter2 = new BSPF104();
        HashMap<String, String> hmCiudades;
        //masterDAO = new MasterDAO();
        facsimilDAO = new FacsimilDAO();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            SalesAuditAcceptedLogic logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1580Filter> lstComponent = logic.lstComponent(filter);
            List<A1580Filter> lstComponentUsed = logic.lstComponentUsed(filter);
            List<A1580Filter> lstComponentOld = logic.lstComponentOld(filter);
            List<A1673Filter> lstTax = logic.lstTax(filter);
            SQP00989Filter beanADM = logic.searchADMData(filter);
            List<A1672Filter> lstItinerary = logic.lstItinerary(filter);
            //para el devlivery
            //masterDAO.setSession(this.serverSession.getServerSession());
           // hmCiudades = masterDAO.loadCiudadesHash();
            filter2.TDNR = cliente.CCUST + "" + filter.VP_FRMSRIE;
            filter2.COUNTRY = filter.A1672PAIVT;
            filter2.AGTN = filter.A1672AGENT;
            filter2.FUENTE = filter.A1672FUENT;
            filter2.SEQTKT = filter.VP_SEQ;
            filter2.IDFILE = filter.VP_IDFILE;
            facsimilDAO.setSession(this.serverSession.getServerSession());
            if (filter.A1672FUENT.equals("BSP")) {
                beanFaximil = facsimilDAO.loadBSPFacsimilProrate(filter2, hmAeropuertos);
            }
            if (filter.A1672FUENT.equals("ARC")) {
                beanFaximil = facsimilDAO.loadARCFacsimilProrate(filter2, hmAeropuertos);
            }
            if (filter.A1672FUENT.equals("ASR")) {
                beanFaximil = facsimilDAO.loadASRFacsimilProrate(filter2, hmAeropuertos);
            }

            map.put("success", true);
            map.put("lstComponent", lstComponent);
            map.put("lstComponentUsed", lstComponentUsed);
            map.put("lstComponentOld", lstComponentOld);
            map.put("lstTax", lstTax);
            map.put("beanADM", beanADM);
            map.put("lstItinerary", lstItinerary);
            map.put("lstFaximil", beanFaximil);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "download")
    public @ResponseBody
    String download(ModelMap map, HttpServletRequest request) {
        byte[] bytes = null;
        A2537Filter filter = new A2537Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            String A2537RUTAF = filter.A2537RUTAF.trim();
            String nomArchivo = filter.A2537NAMEF.trim();

            String rutaMemo = "\\\\10.0.0.87\\am_inventariado\\" + A2537RUTAF;

            Path dir = Paths.get(rutaMemo);
            if (!Files.exists(dir)) {
                map.put("mensaje", "The file cannot be found on the server.");
            } else {
                String strArchivo = rutaMemo + "\\" + nomArchivo;
                File archivo = new File(strArchivo);

                FileInputStream fs = new FileInputStream(archivo);

                bytes = new byte[(int) archivo.length()];
                fs.read(bytes);
                fs.close();

                map.put("bytes", bytes);
                map.put("mensaje", "OK");
            }
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", "An error ocurred when trying to  upload the file.");
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstTax")
    public @ResponseBody
    String searchLstTax(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1673Filter> listaData = logic.searchLstTax(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstCommission")
    public @ResponseBody
    String searchLstCommission(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1674Filter> listaData = logic.searchLstCommission(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstTaxOnComi")
    public @ResponseBody
    String searchLstTaxOnComi(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1675Filter> listaData = logic.searchLstTaxOnComi(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstRazones")
    public @ResponseBody
    String searchLstRazones(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> listaData = logic.searchLstRazones(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchLstFOP")
    public @ResponseBody
    String searchLstFOP(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> listaData = logic.searchLstFOP(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadTracing")
    public @ResponseBody
    String loadTracing(ModelMap map, HttpServletRequest request) {
        A1672Filter filter = new A1672Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A1672Filter> listaData = logic.loadTracing(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchPDI")
    public @ResponseBody
    String searchPDI(ModelMap map, HttpServletRequest request) {
        SQP00989Filter filter = new SQP00989Filter();
        String Resul = "";
        DataInputStream DataInput = null;
        byte[] bytes = null;
        try {
            filter.A1672FPROC = request.getParameter("VL_FPROC").trim();
            filter.A1672TICKET = request.getParameter("VL_TKT").trim();
            filter.A1672TRNCU = request.getParameter("VL_TRNCU").trim();
            String rutaPDI = "\\\\10.0.0.87\\am\\PDI\\" + filter.A1672FPROC + "\\" + filter.A1672TRNCU;
            Path dir = Paths.get(rutaPDI);
            if (!Files.exists(dir)) {
                Resul = "The file cannot be found on the server.";
                map.put("success", false);
            } else {
                String strArchivo = rutaPDI + "\\" + filter.A1672TICKET + ".html";
                File archivo = new File(strArchivo);
                FileInputStream fs = new FileInputStream(archivo);
                bytes = new byte[(int) archivo.length()];
                fs.read(bytes);
                fs.close();
                /*FileInputStream fileinput = null;
                BufferedInputStream mybuffer = null;
                Resul = "OK";
                //asignado el archivo a las variables
                fileinput = new FileInputStream(strArchivo);
                mybuffer = new BufferedInputStream(fileinput);
                DataInput = new DataInputStream(mybuffer);
                DataInput.readLine();
                //strArchivo.close ();
                mybuffer.close ();
                DataInput.close ();*/
                map.put("success", true);
            }
            map.put("Resul", Resul);
            map.put("data", bytes);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadASRFacsimilProrate")
    public @ResponseBody
    String loadASRFacsimilProrate(ModelMap map, HttpServletRequest request) throws Exception {
        A1672Filter filter = new A1672Filter();
        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        BSPF104 filter2 = new BSPF104();
        HashMap<String, String> hmCiudades;
        String listaData;
        //masterDAO = new MasterDAO();
        facsimilDAO = new FacsimilDAO();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        HashMap<String, String> hmAeropuertos = new MasterDAO(this.serverSession.getServerSession()).loadCiudadesHash();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            listaData = logic.searchIDFILE(filter);
            //para el devlivery
           // masterDAO.setSession(this.serverSession.getServerSession());
            //hmCiudades = masterDAO.loadCiudadesHash();
            filter2.TDNR = filter.VP_FRMSRIE;
            filter2.COUNTRY = filter.A1672PAIVT;
            filter2.AGTN = filter.A1672AGENT;
            filter2.FUENTE = filter.A1672FUENT;
            filter2.IDFILE = listaData;
            facsimilDAO.setSession(this.serverSession.getServerSession());
            
            if (filter.A1672FUENT.equals("BSP")) {
                beanFaximil = facsimilDAO.loadBSPFacsimilProrate(filter2, hmAeropuertos);
            }
            if (filter.A1672FUENT.equals("ARC")) {
                beanFaximil = facsimilDAO.loadARCFacsimilProrate(filter2, hmAeropuertos);
            }
            if (filter.A1672FUENT.equals("ASR")) {
                beanFaximil = facsimilDAO.loadASRFacsimilProrate(filter2, hmAeropuertos);
            }
            

            map.put("success", true);
            map.put("lstFaximil", beanFaximil);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "marcarRev", method = RequestMethod.POST)
    public @ResponseBody
    String marcarRev(ModelMap map, @RequestParam("file") MultipartFile file, HttpServletRequest request) {
        SQP00989Filter filter = new SQP00989Filter();
        ArrayList<SQP00989Filter> lstSelectedTkts = new ArrayList<SQP00989Filter>();
        String result2 = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());

            String A1672ARCHV = file.getOriginalFilename();
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanSelectedTkts")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00989Filter data = new SQP00989Filter();
                data.A1672CIA = gsonObj.get("A1672CIA").getAsString();
                data.A1672FORMA = gsonObj.get("A1672FORMA").getAsString();
                data.A1672SERIE = gsonObj.get("A1672SERIE").getAsString();
                data.A1672AGENT = gsonObj.get("A1672AGENT").getAsString();
                data.A1672TRNCU = gsonObj.get("A1672TRNCU").getAsString();
                data.A1672PAIVT = gsonObj.get("A1672PAIVT").getAsString();
                data.A1672FUENT = gsonObj.get("A1672FUENT").getAsString();
                data.A1672SEQ = gsonObj.get("A1672SEQ").getAsString();
                data.A1672CUPON = gsonObj.get("A1672CUPON").getAsString();
                data.A1672ITIN = gsonObj.get("A1672ITIN").getAsString();
                data.A1672FPROC = gsonObj.get("A1672FPROC").getAsString();
                data.A1672MONTT = gsonObj.get("A1672MONTT").getAsString();
                data.A1672ERROR = gsonObj.get("A1672ERROR").getAsString();
                data.A1672TTDIF = gsonObj.get("A1672TTDIF").getAsString();

                lstSelectedTkts.add(data);

            }
            String result = logic.insertTracing(filter, lstSelectedTkts, A1672ARCHV);
            if (result.equals("Operation was successful.")) {
                result = "The record was saved successfully.";
                if (!A1672ARCHV.equals("")) {
                    byte[] bytes = file.getBytes();
                    for (SQP00989Filter obj : lstSelectedTkts) {
                        result2 = upload(bytes, obj.A1672CIA + "" + obj.A1672FORMA + "" + obj.A1672SERIE + "" + obj.A1672SEQ + "" + obj.A1672CUPON + "" + obj.A1672TRNCU, A1672ARCHV);
                        result2 = upload_s3(obj.A1672CIA + "" + obj.A1672FORMA + "" + obj.A1672SERIE + "" + obj.A1672SEQ + "" + obj.A1672CUPON + "" + obj.A1672TRNCU, A1672ARCHV);
                    }
                }
                /*if (filter.A1672FUENT.equals("ASR")) {
                    if (filter.A1672CORREO == 2) {
                        result2 = upload_s3_correo();
                    }
                }*/

            } else {
                result = "An error ocurred when trying to upload the file.";
            }

            map.put("success", true);
            map.put("result", result);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "Sendnotifi")
    public @ResponseBody
    String Sendnotifi(ModelMap map, HttpServletRequest request) {
        String result = "";
        String result2 = "";

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = "Notifications were sent successfully";
            result2 = upload_s3_correo();

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public String upload(byte[] bytes, String TKT, String nomArchivo) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "";
        try {
            String strSesion = UUID.randomUUID().toString();

            //String rutaMemo = "\\\\10.0.0.87\\AMAUDIT\\PRUEBAS\\" + nroMemo;
            String rutaMemo = "\\\\10.0.0.87\\AMAUDIT\\TKT\\" + TKT;
            Path dir = Paths.get(rutaMemo);
            File directory = new File(String.valueOf(dir));
            if (!Files.exists(dir)) {
                directory.mkdir();
            }
            File dir2 = new File(directory, Functions.getFechaActual());
            dir2.mkdir();
            /* if (!Files.exists(dir)) {
             Files.createDirectory(dir);
             }*/

            String strArchivo = rutaMemo + "\\" + Functions.getFechaActual() + "\\" + nomArchivo;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            mensaje = "The record was saved successfully.";
        } catch (Exception e) {
            mensaje = "An error ocurred when trying to upload the file.";
            logError.error(e.getMessage());
        }

        return mensaje;
    }

    public String upload_s3_correo() throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();

        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("BASE", "PR");

        //HttpResponse<JsonNode> response = Unirest.post("http://86d90cebc6b9.ngrok.io/api/auditoria/email/pdf")
        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/auditoria/email/pdf")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("msg").toString();

        return error_msg;

    }

    public String upload_s3(String TKT, String nomArchivo) throws SQLException, Exception {
        String urlREST = serverSession.getServerSession().getPropertySession().get("RUTA_REST_DJANGO").toString();


        /*
         Se establece tiempo límite de conexión por 60 min
         */
        Unirest.setTimeouts(3600000, 3600000);
        HashMap bodyData = new HashMap<>();
        bodyData.put("IN_PATH", "\\\\10.0.0.87\\AMAUDIT\\TKT\\" + TKT + "\\" + Functions.getFechaActual());
        bodyData.put("IN_PREFIX", "ACCEPTED/");
        bodyData.put("IN_DATE", Functions.getFechaActual());

        HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/bsplink/upload_s3/")
                .header("content-type", "application/json")
                .header("cache-control", "no-cache")
                .body(new Gson().toJson(bodyData))
                .asJson();

        String error_msg = response.getBody().getObject().get("error_msg").toString();

        return error_msg;

    }

    @RequestMapping(value = "Group")
    public @ResponseBody
    String Group(ModelMap map, HttpServletRequest request) {
        String result = "";

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.Group();

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        SQP00989Filter filter = new SQP00989Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter.OPCION = request.getParameter("OPCION").trim();
            filter.DATEFROM = request.getParameter("DATEFROM").trim();
            filter.DATETO = request.getParameter("DATETO").trim();
            filter.A1672FUENT = request.getParameter("A1672FUENT").trim();
            filter.A1672CANAL = request.getParameter("A1672CANAL").trim();
            filter.A1672TDOC = request.getParameter("A1672TDOC").trim();
            filter.A1672TRNCU = request.getParameter("A1672TRNCU").trim();
            filter.A1672AGENT = request.getParameter("A1672AGENT").trim();
            filter.A1672ITIN = request.getParameter("A1672ITIN").trim();
            filter.A1672FBASI = request.getParameter("A1672FBASI").trim();
            filter.BOOKFROM = request.getParameter("BOOKFROM").trim();
            filter.BOOKTO = request.getParameter("BOOKTO").trim();
            filter.LIKEFBASIS = request.getParameter("LIKEFBASIS").trim();
            filter.LIKEREASON = request.getParameter("LIKEREASON").trim();
            filter.MONTO = Double.valueOf(request.getParameter("MONTO"));
            filter.Agent = request.getParameter("Agent").trim();
            filter.strTicket = request.getParameter("strTicket").trim();
            filter.REASONS = request.getParameter("REASONS").trim();
            filter.A1672PAIVT = request.getParameter("A1672PAIVT").trim();

            logic = new SalesAuditAcceptedLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SQP00989Filter> listaData = logic.Search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("SalesAuditAccepted");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20, CH_21, CH_22, CH_23, CH_24, CH_25, CH_26, CH_27;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);
            CH_18 = row.createCell(18);
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);
            CH_21 = row.createCell(21);
            CH_22 = row.createCell(22);
            CH_23 = row.createCell(23);
            CH_24 = row.createCell(24);
            CH_25 = row.createCell(25);
            CH_26 = row.createCell(26);
            CH_27 = row.createCell(27);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Cupon");
            CH_02.setCellValue("Source");
            CH_03.setCellValue("Channel");
            CH_04.setCellValue("Country");
            CH_05.setCellValue("IATA");
            CH_06.setCellValue("NAME IATA");
            CH_07.setCellValue("TRNCU");
            CH_08.setCellValue("TDOC");
            CH_09.setCellValue("Issue Date");
            CH_10.setCellValue("Processing Date");
            CH_11.setCellValue("System Date");
            CH_12.setCellValue("Suggested Date");
            CH_13.setCellValue("Itinerary");
            CH_14.setCellValue("FCMI");
            CH_15.setCellValue("FBASIS");
            CH_16.setCellValue("Currency");
            CH_17.setCellValue("Airline Amount");
            CH_18.setCellValue("Agent Amount");
            CH_19.setCellValue("Difference");
            CH_20.setCellValue("Tour Code");
            CH_21.setCellValue("Status");
            CH_22.setCellValue("Reason Code");
            CH_23.setCellValue("Reason");
            CH_24.setCellValue("Agent");
            CH_25.setCellValue("Audited by");
            CH_26.setCellValue("PNR");
            CH_27.setCellValue("Email");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);
            CH_18.setCellStyle(headerStyle);
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);
            CH_21.setCellStyle(headerStyle);
            CH_22.setCellStyle(headerStyle);
            CH_23.setCellStyle(headerStyle);
            CH_24.setCellStyle(headerStyle);
            CH_25.setCellStyle(headerStyle);
            CH_26.setCellStyle(headerStyle);
            CH_27.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);
                CH_18 = row.createCell(18);
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);
                CH_21 = row.createCell(21);
                CH_22 = row.createCell(22);
                CH_23 = row.createCell(23);
                CH_24 = row.createCell(24);
                CH_25 = row.createCell(25);
                CH_26 = row.createCell(26);
                CH_27 = row.createCell(27);

                CH_00.setCellValue(listaData.get(vi).strTicket);
                CH_01.setCellValue(listaData.get(vi).A1672CUPON);
                CH_02.setCellValue(listaData.get(vi).A1672FUENT);
                CH_03.setCellValue(listaData.get(vi).A1672CANAL);
                CH_04.setCellValue(listaData.get(vi).A1672PAIVT);
                CH_05.setCellValue(listaData.get(vi).A1672AGENT);
                CH_06.setCellValue(listaData.get(vi).A1672NAMEF);
                CH_07.setCellValue(listaData.get(vi).A1672TRNCU);
                CH_08.setCellValue(listaData.get(vi).A1672TDOC);
                CH_09.setCellValue(listaData.get(vi).A1672FVENT);
                CH_10.setCellValue(listaData.get(vi).A1672FPROC);
                CH_11.setCellValue(listaData.get(vi).A1672FREGI);
                CH_12.setCellValue(listaData.get(vi).A1672FREVI);
                CH_13.setCellValue(listaData.get(vi).A1672ITIN);
                CH_14.setCellValue(listaData.get(vi).A1672FCMI);
                CH_15.setCellValue(listaData.get(vi).A1672FBASI);
                CH_16.setCellValue(listaData.get(vi).A1672MONTT);
                CH_17.setCellValue(listaData.get(vi).A1672TTMIA);
                CH_18.setCellValue(listaData.get(vi).A1672TTAGT);
                CH_19.setCellValue(listaData.get(vi).A1672TTDIF);
                CH_20.setCellValue(listaData.get(vi).A1672CODIT);
                CH_21.setCellValue(listaData.get(vi).A1672FLADM);
                CH_22.setCellValue(listaData.get(vi).A1672ERROR);
                CH_23.setCellValue(listaData.get(vi).A1580DESC2);
                CH_24.setCellValue(listaData.get(vi).A1672BAGFT);
                CH_25.setCellValue(listaData.get(vi).A1672REVIS);
                CH_26.setCellValue(listaData.get(vi).A1672PNR);
                String vl_A1672CORREO = "";
                switch (listaData.get(vi).A1672CORREO) {
                    case 2:
                        vl_A1672CORREO = "unregistered mail";
                        break;
                    case 1:
                        vl_A1672CORREO = "registered mail";
                        break;
                    case 0:
                        vl_A1672CORREO = "";
                        break;
                }
                CH_27.setCellValue(vl_A1672CORREO);

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
                CH_18.setCellStyle(bodyStyle);
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);
                CH_21.setCellStyle(bodyStyle);
                CH_22.setCellStyle(bodyStyle);
                CH_23.setCellStyle(bodyStyle);
                CH_24.setCellStyle(bodyStyle);
                CH_25.setCellStyle(bodyStyle);
                CH_26.setCellStyle(bodyStyle);
                CH_27.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(25, true);
            sheet.autoSizeColumn(26, true);
            sheet.autoSizeColumn(27, true);

            String fileNameDownload = String.format("SalesAuditAccepted - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

}
