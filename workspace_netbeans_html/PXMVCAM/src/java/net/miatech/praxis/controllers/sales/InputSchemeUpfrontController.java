package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A1155Filter;
import net.miatech.beans.SaleAudit.A1179Filter;
import net.miatech.beans.SaleAudit.BEANSCONSOLE;
import net.miatech.beans.SaleAudit.CONSOLE_PARANT;
import net.miatech.beans.SaleAudit.SQP01597Filter;
import net.miatech.beans.SaleAudit.SQP01723Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.SaleAudit.PSA00004;
import net.miatech.praxis.SaleAudit.SQP01090;
import net.miatech.praxis.SaleAudit.SQP01265;
import net.miatech.praxis.SaleAudit.SQP01723;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.InputSchemeUpfrontLogic;
import net.miatech.utils.Functions;
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
import org.springframework.web.bind.annotation.ResponseBody;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/InputSchemeUpfront")
public class InputSchemeUpfrontController extends BaseController {

    private InputSchemeUpfrontLogic logic;
    private A1155Filter filter;
    private CONSOLE_PARANT filter2;
    private SQP01265 filter3;
    private SQP01090 filter4;
    private PSA00004 filter5;
    private SQP01597Filter filter6;
    private SQP01723Filter filter7;
    private SQP01597Filter filter8;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A1155AIRLI = request.getParameter("A1155AIRLI").trim();
            filter.A1155CODAC = request.getParameter("A1155CODAC").trim();
            filter.A1155INDAC = request.getParameter("A1155INDAC").trim();
            filter.A1155VRSAC = request.getParameter("A1155VRSAC").trim();
            filter.A1155FESTA = request.getParameter("A1155FESTA").trim();
            filter.A1155FINI = request.getParameter("A1155FINI").trim();
            filter.A1155FINGR = request.getParameter("A1155FINGR").trim();
            filter.TITLE = request.getParameter("TITLE").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListAgreement(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getSQP01096")
    public @ResponseBody
    String getSQP01096(ModelMap map, HttpServletRequest request) {
        List<SQP01090> listaData;
        try {
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01096();
            
            map.put("success", true);
            map.put("lstSQP01096", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getFunctions")
    public @ResponseBody
    String getFunctions(ModelMap map, HttpServletRequest request) {
        filter2 = new CONSOLE_PARANT();
        CONSOLE_PARANT filterB = new CONSOLE_PARANT();
        CONSOLE_PARANT filterC = new CONSOLE_PARANT();
        
        filterB.VP_CODIGO="";
        filterB.VP_TYPE="F";
	filterB.VP_POSITION="1";
	filterB.VP_STATUS="1";
	filterB.VP_INDAC=filter2.VP_INDAC;
        
        filterC.VP_CODIGO="";
	filterC.VP_POSITION="";
	filterC.VP_STATUS="1";
	filterC.VP_INDAC=filter2.VP_INDAC;
        
        List<CONSOLE_PARANT> listaDataA;
        List<CONSOLE_PARANT> listaDataB;
        List<CONSOLE_PARANT> listaDataC;
        try {
            filter2.VP_TYPE = request.getParameter("VP_TYPE");
            filter2.VP_POSITION = request.getParameter("VP_POSITION");
            filter2.VP_STATUS = request.getParameter("VP_STATUS");
            filter2.VP_INDAC = request.getParameter("VP_INDAC");
            filter2.VP_CODIGO = request.getParameter("VP_CODIGO");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            listaDataA = logic.getFunctions(filter2);
            listaDataB = logic.getFunctionsParamsA(filter2);
            listaDataC = logic.getFunctionsParamsA2(filter2);
            
            map.put("success", true);
            map.put("lstFUNCTIONA", listaDataA);
            map.put("lstFUNCTIONB", listaDataB);
            map.put("lstFUNCTIONC", listaDataC);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getFunctionsParamsA")
    public @ResponseBody
    String getFunctionsParamsA(ModelMap map, HttpServletRequest request) {
        filter2 = new CONSOLE_PARANT();
        List<CONSOLE_PARANT> listaData;
        try {
            filter2.VP_CODIGO = request.getParameter("VP_CODIGO");
            filter2.VP_TYPE = request.getParameter("VP_TYPE");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getFunctionsParamsA(filter2);
            
            map.put("success", true);
            map.put("lstFUNCTION", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getFunctionsParamsA2")
    public @ResponseBody
    String getFunctionsParamsA2(ModelMap map, HttpServletRequest request) {
        filter2 = new CONSOLE_PARANT();
        List<CONSOLE_PARANT> listaData;
        try {
            filter2.VP_CODIGO = request.getParameter("VP_CODIGO");
            filter2.VP_POSITION = request.getParameter("VP_POSITION");
            filter2.VP_STATUS = request.getParameter("VP_STATUS");
            filter2.VP_INDAC = request.getParameter("VP_INDAC");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getFunctionsParamsA2(filter2);
            
            map.put("success", true);
            map.put("lstFUNCTION", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListLabel")
    public @ResponseBody
    String getListLabel(ModelMap map, HttpServletRequest request) {
        List<SQP01265> listaData;
        filter3 = new SQP01265();
        try {
            filter3.VP_AIRLINE = request.getParameter("VP_AIRLINE");
            filter3.VP_INDAC = request.getParameter("VP_INDAC");
            filter3.VP_CODE = request.getParameter("VP_CODE");
            filter3.VP_IATA = request.getParameter("VP_IATA");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListLabel(filter3);
            
            map.put("success", true);
            map.put("data", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getINIT")
    public @ResponseBody
    String getINIT(ModelMap map, HttpServletRequest request) {
        filter4 = new SQP01090();
        SQP01090 filterB = new SQP01090();
        SQP01265 filterC = new SQP01265();
        A1179Filter filterH = new A1179Filter();
        
        List<SQP01090> listaDataB= null;
        List<SQP01090> listaDataC= null;
        List<SQP01265> listaDataF= null;
        List<A1179Filter> listaDataH= null;
        List<A1179Filter> listaDataG= null;
        
        filter4.A1172AIRLI = request.getParameter("A1172AIRLI");
        filter4.A1172CODAC = request.getParameter("A1172CODAC");
        filter4.A1172INDAC = request.getParameter("A1172INDAC");
        filter4.A1172VRSAC = request.getParameter("A1172VRSAC");

        filterB.A1172AIRLI=filter4.A1172AIRLI;
        filterB.A1172CODAC=filter4.A1172CODAC;
        filterB.A1172INDAC=filter4.A1172INDAC;
        filterB.A1172VRSAC=filter4.A1172VRSAC;
        
        filterC.VP_AIRLINE=filter4.A1172AIRLI;
        filterC.VP_CODE=filter4.A1172CODAC;
        filterC.VP_INDAC=filter4.A1172INDAC;
        
        filterH.A1179AIRLI=filter4.A1172AIRLI;
        filterH.A1179CODAC=filter4.A1172CODAC;
        filterH.A1179INDAC=filter4.A1172INDAC;
        filterH.A1179VRSAC=filter4.A1172VRSAC;
        
        //Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, "getSQP01090 : getINIT");
        try {
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaDataF = logic.getListIATAGROUP(filterC);
            listaDataH = logic.getTableTmp(filterH);
            listaDataG = logic.getTableREF(filterH);
            
            map.put("success", true);
            map.put("response", listaDataF);
            map.put("lstTableTmp", listaDataH);
            map.put("lstTableREF", listaDataG);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/setMantenimientoLabel")
    public @ResponseBody
    String setMantenimientoLabel(ModelMap map, HttpServletRequest request) {
       List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
       filter = new A1155Filter();
        try {
            String VP_ACTION = request.getParameter("VP_ACTION");
            filter.A1155AIRLI = request.getParameter("A1155AIRLI");
            filter.A1155CODAC = request.getParameter("A1155CODAC");
            filter.A1155INDAC = request.getParameter("A1155INDAC");
            filter.A1155VRSAC = request.getParameter("A1155VRSAC");
            filter.A1155FINI= request.getParameter("A1155FINI");
            filter.A1155FFIN = request.getParameter("A1155FFIN");
            filter.A1155FMODI = request.getParameter("A1155FMODI");
            filter.A1155CIAFM = request.getParameter("A1155CIAFM");
            filter.A1155FNAME = request.getParameter("A1155FNAME");
            filter.A1155PORCENT = request.getParameter("A1155PORCENT");
            filter.A1155CORRE = request.getParameter("A1155CORRE");
            filter.A1155FLGFE = request.getParameter("A1155FLGFE");
            filter.A1155FINGR = request.getParameter("A1155FINGR");
            filter.A1155HINGR = request.getParameter("A1155HINGR");
            filter.A1155HINGR = request.getParameter("A1155HINGR");
            filter.A1155HMODI = request.getParameter("A1155HMODI");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstRtn = logic.setMantenimientoLabel(filter,VP_ACTION);
            map.put("success", true);
            map.put("response", lstRtn);
            //resp.info.add(objRtn.OU_MESSAGE);
            //resp.info.add(objRtn.OU_SQLCODE);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListViewCCode")
    public @ResponseBody
    String getListViewCCode(ModelMap map, HttpServletRequest request) {
        List<BEANSCONSOLE> listaData;
        List<BEANSCONSOLE> listaData2;
        filter4 = new SQP01090();
        filter4.A1172AIRLI = request.getParameter("A1172AIRLI");
        filter4.A1172CODAC = request.getParameter("A1172CODAC");
        filter4.A1172INDAC = request.getParameter("A1172INDAC");
        filter4.A1172VRSAC = request.getParameter("A1172VRSAC");
        try {
            /*BEANSCONSOLE B = new BEANSCONSOLE();
            B.AIRLI=F.A1172AIRLI;
            B.CODAC=F.A1172CODAC;
            B.INDAC=F.A1172INDAC;
            B.VRSAC=F.A1172VRSAC;*/
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListViewCCodeGlobal(filter4);
            listaData2 = logic.getListViewCCodeSector(filter4);
            map.put("success", true);
            map.put("response", listaData);
            map.put("response2", listaData2);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListIATAGROUP")
    public @ResponseBody
    String getListIATAGROUP(ModelMap map, HttpServletRequest request) {
        List<SQP01265> listaData;
        filter3 = new SQP01265();
        try {
            filter3.VP_AIRLINE = request.getParameter("VP_AIRLINE");
            filter3.VP_IATA = request.getParameter("VP_IATA");
            filter3.VP_INDAC = request.getParameter("VP_INDAC");
            filter3.VP_CODE = request.getParameter("VP_CODE");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListIATAGROUP(filter3);
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
    
    @RequestMapping(value = "/setGROUPCODE")
    public @ResponseBody
    String setGROUPCODE(ModelMap map, HttpServletRequest request) {
        List<SQP01265> listaData;
        filter3 = new SQP01265();
        try {
            filter3.VP_ACTION = request.getParameter("VP_ACTION");
            filter3.VP_IATA = request.getParameter("VP_IATA");
            filter3.VP_INDAC = request.getParameter("VP_INDAC");
            filter3.VP_CODE = request.getParameter("VP_CODE");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setGROUPCODE(filter3);
            map.put("success", true);
            map.put("response", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getGROUPIATA")
    public @ResponseBody
    String getGROUPIATA(ModelMap map, HttpServletRequest request) {
        List<PSA00004> listaData;
        filter5 = new PSA00004();
        try {
            filter5.A2649IATA = request.getParameter("A2649IATA");
            filter5.A2649INDAC = request.getParameter("A2649INDAC");
            filter5.A003KEY3 = request.getParameter("A003KEY3");
            filter5.A2649KGRUP = request.getParameter("A2649KGRUP");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getGROUPIATA(filter5);
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
    
    @RequestMapping(value = "/getSQP01090")
    public @ResponseBody
    String getSQP01090(ModelMap map, HttpServletRequest request) {
        filter4 = new SQP01090();
        filter4.A1172AIRLI = request.getParameter("A1172AIRLI");
        filter4.A1172CODAC = request.getParameter("A1172CODAC");
        filter4.A1172INDAC = request.getParameter("A1172INDAC");
        filter4.A1172VRSAC = request.getParameter("A1172VRSAC");
        filter4.A1172FAMIL = request.getParameter("A1172FAMIL");
        
        SQP01090 filterB = new SQP01090();
        SQP01090 filterC = new SQP01090();
        
        List<SQP01090> listaData;
        
        List<SQP01090> listaDataB= null;
        List<SQP01090> listaDataC= null;
        List<SQP01090> listaDataD= null;
        try {
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP01090(filter4);
            listaDataB = logic.getSQP01093(filter4);
            listaDataC = logic.getSQP01094(filter4);
            listaDataD = logic.getSQP01095(filter4);
            
            map.put("success", true);
            map.put("lstSQP01090", listaData);
            map.put("lstSQP01093", listaDataB);
            map.put("lstSQP01094", listaDataC);
            map.put("lstSQP01095", listaDataD);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/setSQP01090")
    public @ResponseBody
    String setSQP01090(ModelMap map, HttpServletRequest request) {
        SQP01090 objRtn;
        List<SQP01090> listaData;
        filter4 = new SQP01090();
        try {
            String VP_ACTION = request.getParameter("VP_ACTION");
            filter4.A1172AIRLI = request.getParameter("A1172AIRLI");
            filter4.A1172CODAC = request.getParameter("A1172CODAC");
            filter4.A1172INDAC = request.getParameter("A1172INDAC");
            filter4.A1172VRSAC = request.getParameter("A1172VRSAC");
            filter4.A1172FAMIL = request.getParameter("A1172FAMIL");
            filter4.A1172TDATA = request.getParameter("A1172TDATA");
            filter4.A1172DATA = request.getParameter("A1172DATA");
            filter4.A1172VALOR = request.getParameter("A1172VALOR");
            filter4.A1172INDIC = request.getParameter("A1172INDIC");
            filter4.A1172PORCE = request.getParameter("A1172PORCE");
            filter4.A1172MONED = request.getParameter("A1172MONED");
            filter4.A1172METOD = request.getParameter("A1172METOD");
            filter4.A1172EQUIV = request.getParameter("A1172EQUIV");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.setSQP01090(filter4,VP_ACTION);
            
            map.put("success", true);
            map.put("lstResponse", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListCountry")
    public @ResponseBody
    String getListCountry(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        try {
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListCountry();
            
            map.put("success", true);
            map.put("listaPaises", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getCheckList")
    public @ResponseBody
    String getCheckList(ModelMap map, HttpServletRequest request) {
        List<SQP01597Filter> listaData;
        filter6 = new SQP01597Filter();
        try {
            filter6.VP_AIRLI = request.getParameter("VP_AIRLI");
            filter6.VP_CODAC = request.getParameter("VP_CODAC");
            filter6.VP_INDAC = request.getParameter("VP_INDAC");
            filter6.VP_VRSAC = request.getParameter("VP_VRSAC");
            filter6.VP_YEAR = request.getParameter("VP_YEAR").length()>0?Integer.parseInt(request.getParameter("VP_YEAR")):0;
            filter6.VP_TPERI = request.getParameter("VP_TPERI");
            filter6.VP_PERIO = request.getParameter("VP_PERIO").length()>0?Integer.parseInt(request.getParameter("VP_PERIO")):0;
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getCheckList(filter6);
            
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
    
    @RequestMapping(value = "/getStatusList")
    public @ResponseBody
    String getStatusList(ModelMap map, HttpServletRequest request) {
        List<SQP01723> listaData;
        filter7 = new SQP01723Filter();
        try {
            filter7.VP_AIRLI = request.getParameter("VP_AIRLI");
            filter7.VP_CODAC = request.getParameter("VP_CODAC");
            filter7.VP_INDAC = request.getParameter("VP_INDAC");
            filter7.VP_VRSAC = request.getParameter("VP_VRSAC");
            filter7.VP_ENV = request.getParameter("VP_ENV");
            filter7.VP_TPC = request.getParameter("VP_TPC");
//            filter7.VP_FOR = request.getParameter("VP_FOR");
//            filter7.VP_COD = request.getParameter("VP_COD");
//            filter7.VP_CDESQ = request.getParameter("VP_CDESQ").length()>0?Integer.parseInt(request.getParameter("VP_CDESQ")):0;
            filter7.VP_YEAR = request.getParameter("VP_YEAR").length()>0?Integer.parseInt(request.getParameter("VP_YEAR")):0;
            filter7.VP_TPERI = request.getParameter("VP_TPERI");
            filter7.VP_PERIO = request.getParameter("VP_PERIO").length()>0?Integer.parseInt(request.getParameter("VP_PERIO")):0;
//            filter7.VP_COUNTRY = request.getParameter("VP_COUNTRY");
//            filter7.VP_SOURCE = request.getParameter("VP_SOURCE");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getStatusList(filter7);
            
            map.put("success", true);
            map.put("listaData", listaData);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "setProccess")
    public @ResponseBody
    String setProccess(ModelMap map, HttpServletRequest request) {
       List<SQP01597Filter> lstRtn = new ArrayList<SQP01597Filter>(0);
       filter8 = new SQP01597Filter();
        try {
            filter8.A3012AIRLI = request.getParameter("A3012AIRLI");
            filter8.A3012CODAC = request.getParameter("A3012CODAC");
            filter8.A3012INDAC = request.getParameter("A3012INDAC");
            filter8.A3012VRSAC = request.getParameter("A3012VRSAC");
            filter8.VP_ACTION = request.getParameter("VP_ACTION");
            filter8.A3012APCUR = request.getParameter("A3012APCUR");
            filter8.A3012APCURN = request.getParameter("A3012APCURN");
            
            filter8.A3012COLOR = request.getParameter("A3012COLOR");
            
            filter8.A3012CDESQ = request.getParameter("A3012CDESQ");
            
            filter8.A3012CURCO = request.getParameter("A3012CURCO");
            filter8.A3012CUROR = request.getParameter("A3012CUROR");
            filter8.A3012DESCI = request.getParameter("A3012DESCI");
            filter8.A3012DESCR = request.getParameter("A3012DESCR");
            filter8.A3012ERREX = request.getParameter("A3012ERREX");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstRtn = logic.setProccess(filter8);
            //resp.info.add(objRtn.OU_MESSAGE);
            //resp.info.add(objRtn.OU_SQLCODE);
            map.put("success", true);
            map.put("response", lstRtn);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "setA1155")
    public @ResponseBody
    String setA1155(ModelMap map, HttpServletRequest request) {
       List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
       filter = new A1155Filter();
       String VP_ACTION;
        try {
            VP_ACTION = request.getParameter("VP_ACTION");
            filter.TITLE = request.getParameter("TITLE");
            filter.A1155AIRLI = request.getParameter("A1155AIRLI");
            filter.A1155CIA1 = request.getParameter("A1155CIA1");
            filter.A1155CIA2 = request.getParameter("A1155CIA2");
            filter.A1155VLINI = request.getParameter("A1155VLINI");
            filter.A1155VLFIN = request.getParameter("A1155VLFIN");
            filter.A1155CNUM = request.getParameter("A1155CNUM");
            filter.A1155FNUM = request.getParameter("A1155FNUM");
            
            filter.A1155CODAC = request.getParameter("A1155CODAC");
            filter.A1155INDAC = request.getParameter("A1155INDAC");
            filter.A1155VRSAC = request.getParameter("A1155VRSAC");
            filter.A1155FLGAD = request.getParameter("A1155FLGAD");
            filter.A1155FINI = request.getParameter("A1155FINI");
            filter.A1155FFIN = request.getParameter("A1155FFIN");
            filter.A1155FLGFE = request.getParameter("A1155FLGFE");
            filter.A1155FLGAU = request.getParameter("A1155FLGAU");
            filter.A1155FESTA = request.getParameter("A1155FESTA");
            filter.A1155INDIC = request.getParameter("A1155INDIC");
            filter.A1155MPA = request.getParameter("A1155MPA");
            filter.A1155SRP = request.getParameter("A1155SRP");
            filter.A1155PRO = request.getParameter("A1155PRO");
            filter.A1155TRAMO = request.getParameter("A1155TRAMO");
            filter.A1155DEFAU = request.getParameter("A1155DEFAU");
            filter.A1155PDEFA = request.getParameter("A1155PDEFA");
            filter.A1155IDSCO = request.getParameter("A1155IDSCO");
            filter.A1155PISC = request.getParameter("A1155PISC");
            filter.A1155FRECE = request.getParameter("A1155FRECE");
            filter.A1155CIAFM = request.getParameter("A1155CIAFM");
            filter.A1155FNAME = request.getParameter("A1155FNAME");
            filter.A1155CODSP = request.getParameter("A1155CODSP");
            filter.A1155CORRE = request.getParameter("A1155CORRE");
            filter.A1155ESTAD = request.getParameter("A1155ESTAD");
            
            filter.A1155FINGR = request.getParameter("A1155FINGR");
            filter.A1155HINGR = request.getParameter("A1155HINGR");
            filter.A1155FMODI = request.getParameter("A1155FMODI");
            filter.A1155HMODI = request.getParameter("A1155HMODI");
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstRtn = logic.setA1155(filter,VP_ACTION);
            //resp.info.add(objRtn.OU_MESSAGE);
            //resp.info.add(objRtn.OU_SQLCODE);
            map.put("success", true);
            map.put("response", lstRtn);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A1155Filter> listaData;
        filter = new A1155Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Input Scheme Upfront - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.A1155AIRLI = request.getParameter("A1155AIRLI").trim();
            filter.A1155CODAC = request.getParameter("A1155CODAC").trim();
            filter.A1155INDAC = request.getParameter("A1155INDAC").trim();
            filter.A1155VRSAC = request.getParameter("A1155VRSAC").trim();
            filter.A1155FESTA = request.getParameter("A1155FESTA").trim();
            filter.A1155FINI = request.getParameter("A1155FINI").trim();
            filter.A1155FINGR = request.getParameter("A1155FINGR").trim();
            filter.TITLE = request.getParameter("TITLE").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new InputSchemeUpfrontLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListAgreement(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Input Scheme Upfront");
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

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("CONTRACT");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("NUMBER");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("VERSION");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("EFFEC. DATE");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("TERM. DATE");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("DATE TYPE");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("AUTOMATED");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("STATUS");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("ADDENDUM");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("RECEPTION DATE");

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

            ++vj;
            // </editor-fold>
            
            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                
                // <editor-fold defaultstate="collapsed" desc="Iterativo">
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

                cell50.setCellValue(listaData.get(vi).TITLE);
                cell51.setCellValue(listaData.get(vi).A1155CODAC);
                cell52.setCellValue(listaData.get(vi).A1155VRSAC);
                cell53.setCellValue(listaData.get(vi).A1155FINI);
                cell54.setCellValue(listaData.get(vi).A1155FFIN);
                cell55.setCellValue(listaData.get(vi).A1155FLGFE);
                cell56.setCellValue(listaData.get(vi).A1155FLGAU);
                cell57.setCellValue(listaData.get(vi).A1155FESTA);
                cell58.setCellValue(listaData.get(vi).A1155MPA);//A1530MDA
                cell59.setCellValue(listaData.get(vi).A1155FRECE);

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
            throw new SpringException(e);
        }
    }
}
