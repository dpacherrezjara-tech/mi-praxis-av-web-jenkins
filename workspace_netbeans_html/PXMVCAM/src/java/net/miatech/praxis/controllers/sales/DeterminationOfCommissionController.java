package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX121S01A1796Filter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.DeterminationOfCommissionLogic;
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
@RequestMapping("/DeterminationOfCommission")
public class DeterminationOfCommissionController extends BaseController {

    private DeterminationOfCommissionLogic logic;
    private SQP01362Filter filter;
    private A2960Filter filter2;
    private SQP00911Filter filter3;
    private A1580Filter filter4;
    private A1673Filter filter5;
    private MasterDAO masterDAO;
    
    @RequestMapping(value = "/getListCountry")
    public @ResponseBody
    String getListCountry(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            listaData = masterDAO.loadCountry();
            
            map.put("success", true);
            map.put("listaPaises", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListTicketTesting")
    public @ResponseBody
    String getListTicketTesting(ModelMap map, HttpServletRequest request) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FORMA = request.getParameter("VP_FORMA").trim();
            filter.VP_SERIE = request.getParameter("VP_SERIE").trim();
            filter.VP_A2959IATAH = request.getParameter("VP_A2959IATAH").trim();
            filter.VP_A2959AGENT = request.getParameter("VP_AGENTE").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListTicketTesting(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "/getListTicket")
    public @ResponseBody
    String getListTicket(ModelMap map, HttpServletRequest request) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FORMA = request.getParameter("VP_FORMA").trim();
            filter.VP_SERIE = request.getParameter("VP_SERIE").trim();
            filter.VP_A2959IATAH = request.getParameter("VP_A2959IATAH").trim();
            filter.VP_AGENTE = request.getParameter("VP_AGENTE").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListTicket(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "/getListSchema")
    public @ResponseBody
    String getListSchema(ModelMap map, HttpServletRequest request) {
        List<A051> listaData;
        filter = new SQP01362Filter();
        try {
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.A2845INDAC = request.getParameter("A2845INDAC");
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListSchema(filter);
            
            map.put("success", true);
            map.put("ListSchema", listaData);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/getListFPROC")
    public @ResponseBody
    String getListFPROC(ModelMap map, HttpServletRequest request) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROC(filter);
            
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
    
    @RequestMapping(value = "/getListFPROCTesting")
    public @ResponseBody
    String getListFPROCTesting(ModelMap map, HttpServletRequest request) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROCTesting(filter);
            
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
    
    @RequestMapping(value = "/getLoadCommiADMACM")
    public @ResponseBody
    String getLoadCommiADMACM(ModelMap map, HttpServletRequest request) {
        filter2 = new A2960Filter();
        try {
            filter2.IN_DATEFROM = request.getParameter("IN_DATEFROM").trim();
            filter2.IN_DATETO = request.getParameter("IN_DATETO").trim();
            filter2.IN_DATEPER1 = request.getParameter("IN_DATEPER1").trim();
            filter2.IN_LOTE = request.getParameter("IN_LOTE").trim();
            filter2.IN_IATA = request.getParameter("IN_IATA").trim();
            filter2.IN_SELET_TYPE = request.getParameter("IN_SELET_TYPE").trim();
            filter2.IN_SELET_BASE = request.getParameter("IN_SELET_BASE").trim();
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            String objRtn = logic.getLoadCommiADMACM(filter2);

            map.put("success", true);
            if (objRtn.toString().equals("RECORD INSERTED")) {
                map.put("sesion", "The record was saved successfully.");
            } else {
                map.put("sesion", "An error ocurred when trying to save the record.");
            }
            logic = null;
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", "An error ocurred when trying to save the record. " + e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", "An error ocurred when trying to save the record. " + e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/SearchReportADMAcounting")
    public @ResponseBody
    String SearchReportADMAcounting(ModelMap map, HttpServletRequest request) {
        filter3 = new SQP00911Filter();
        try {
            filter3.OPCIONTYPE = request.getParameter("OPCIONTYPE").trim();
            filter3.COMBOBY = request.getParameter("COMBOBY").trim();
            filter3.CIA = request.getParameter("CIA").trim();
            filter3.FORMA = request.getParameter("FORMA").trim();
            filter3.SERIE = request.getParameter("SERIE").trim();
            filter3.NUMBERADM = request.getParameter("NUMBERADM").trim();
            filter3.DATEFROM = request.getParameter("DATEFROM").trim();
            filter3.DATETO = request.getParameter("DATETO").trim();
            filter3.COUNTRY = request.getParameter("COUNTRY").trim();
            filter3.CURRENCY = request.getParameter("CURRENCY").trim();
            filter3.CHANNEL = request.getParameter("CHANNEL").trim();
            filter3.AUTMAN = request.getParameter("AUTMAN").trim();
            filter3.STATUS = request.getParameter("STATUS").trim();
            filter3.COMBOCHANNEL = request.getParameter("COMBOCHANNEL").trim();
            filter3.SEQ = request.getParameter("SEQ").trim();
            filter3.CUPON = request.getParameter("CUPON").trim();
            filter3.TRNCU = request.getParameter("TRNCU").trim();
            filter3.VP_PREME = request.getParameter("VP_PREME").trim();
            filter3.VP_CNXPA = request.getParameter("VP_CNXPA").trim();
            filter3.VP_TUORCODE = request.getParameter("VP_TUORCODE").trim();
            filter3.VP_USER = request.getParameter("VP_USER").trim();
            filter3.VP_TYPE = request.getParameter("VP_TYPE").trim();
            filter3.VP_AREA = request.getParameter("VP_AREA").trim();
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP00911Filter> lst_search = logic.SearchReportADM(filter3);
            
            map.put("success", true);
            map.put("lst_search", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", "An error ocurred when trying to save the record.");
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", "An error ocurred when trying to save the record.");
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/SearchReportADM")
    public @ResponseBody
    String SearchReportADM(ModelMap map, HttpServletRequest request) {
        filter3 = new SQP00911Filter();
        try {
            filter3.OPCIONTYPE = request.getParameter("OPCIONTYPE").trim();
            filter3.COMBOBY = request.getParameter("COMBOBY").trim();
            filter3.NUMBERADM = request.getParameter("NUMBERADM").trim();
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<SQP00911Filter> listaData = logic.SearchReportADM(filter3);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "/SearchCalcuArelonia")
    public @ResponseBody
    String SearchCalcuArelonia(ModelMap map, HttpServletRequest request) {
        filter4 = new A1580Filter();
        try {
            filter4.OPCIONTYPE = request.getParameter("OPCIONTYPE");
            filter4.COMBOBY = request.getParameter("COMBOBY");
            filter4.VP_CIA = request.getParameter("VP_CIA");
            filter4.VP_FORMA = request.getParameter("VP_FORMA");
            filter4.VP_SERIE = request.getParameter("VP_SERIE");
            filter4.NUMBERADM = request.getParameter("NUMBERADM");
            filter4.VP_SEQ = request.getParameter("VP_SEQ");
            filter4.TRNCU = request.getParameter("TRNCU");
            filter4.VP_CUPON = request.getParameter("VP_CUPON");
            filter4.VP_PREME = request.getParameter("VP_PREME");
            filter4.VP_CNXPA = request.getParameter("VP_CNXPA");
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1580Filter> listaData = logic.SearchCalcuArelonia(filter4);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "/SearchCalcuImpuestos")
    public @ResponseBody
    String SearchCalcuImpuestos(ModelMap map, HttpServletRequest request) {
        filter5 = new A1673Filter();
        try {
            filter5.OPCIONTYPE = request.getParameter("OPCIONTYPE");
            filter5.COMBOBY = request.getParameter("COMBOBY");
            filter5.VP_CIA = request.getParameter("VP_CIA");
            filter5.VP_FORMA = request.getParameter("VP_FORMA");
            filter5.VP_SERIE = request.getParameter("VP_SERIE");
            filter5.NUMBERADM = request.getParameter("NUMBERADM");
            filter5.VP_SEQ = request.getParameter("VP_SEQ");
            filter5.TRNCU = request.getParameter("TRNCU");
            filter5.VP_CUPON = request.getParameter("VP_CUPON");
            filter5.VP_PREME = request.getParameter("VP_PREME");
            filter5.VP_CNXPA = request.getParameter("VP_CNXPA");
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A1673Filter> listaData = logic.SearchCalcuImpuestos(filter5);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "/getListFPROCHISTORY")
    public @ResponseBody
    String getListFPROCHISTORY(ModelMap map, HttpServletRequest request) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            filter.VP_A2959IATAH = request.getParameter("VP_A2959IATAH").trim();
            filter.VP_A2959AGENT = request.getParameter("VP_A2959AGENT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROCHISTORY(filter);
            
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Determination Of Commission(Consolidado) - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROCTesting(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Determination Of Commission(Consolidado)");
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
            CH1_00.setCellValue("Period");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("IATA");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Name");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("IATA");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Source");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Country");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("TAKEN");
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("GIVEN");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("DIFFERENCE ");
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Total");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Apply");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Apply");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Status");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Assign ADM/ACM");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));

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
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Sale");
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Home");
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Currency");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Fare");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Value Commission");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Value Commission");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Value");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Round");
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("IVA Round");
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));

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
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);

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
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);

                cell50.setCellValue(listaData.get(vi).A2959FPERI);
                cell51.setCellValue(listaData.get(vi).A2845AGENT);
                cell52.setCellValue(listaData.get(vi).A003KEY3);
                cell53.setCellValue(listaData.get(vi).A2845IATAH);
                cell54.setCellValue(listaData.get(vi).A2845FUENT);
                cell55.setCellValue(listaData.get(vi).A2845PAIVT);
                cell56.setCellValue(listaData.get(vi).A2845MDAFA);
                cell57.setCellValue(listaData.get(vi).A2845FARE);
                cell58.setCellValue(listaData.get(vi).A2845TTCOM);
                cell59.setCellValue(listaData.get(vi).A2845VUPFR);
                cell60.setCellValue(listaData.get(vi).DIFERENCIA);
                cell61.setCellValue(listaData.get(vi).ROUND);
                cell62.setCellValue(listaData.get(vi).ROUND_IVA);
                cell63.setCellValue(listaData.get(vi).DIFERENCIA_IVA_TOTAL);
                cell64.setCellValue(listaData.get(vi).APPLY_ADM);
                cell65.setCellValue(listaData.get(vi).A2959TRNCO);
                cell66.setCellValue(listaData.get(vi).STATUS);
                cell67.setCellValue(listaData.get(vi).A2959REPRO);

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
    
    @RequestMapping(value = "getXLSXTesting")
    public @ResponseBody
    void getXLSXTesting(HttpServletRequest request, HttpServletResponse response) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Determination Of Commission Testing(Consolidado) - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROCTesting(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Determination Of Commission Testing(Consolidado)");
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
            CH1_00.setCellValue("Period");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("IATA");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Name");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("IATA");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Source");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Country");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("TAKEN");
            Cell CH1_07 = row.createCell(7);
            Cell CH1_08 = row.createCell(8);
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("GIVEN");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("DIFFERENCE ");
            Cell CH1_11 = row.createCell(11);
            Cell CH1_12 = row.createCell(12);
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("Total");
            Cell CH1_14 = row.createCell(14);
            CH1_14.setCellValue("Apply");
            Cell CH1_15 = row.createCell(15);
            CH1_15.setCellValue("Apply");
            Cell CH1_16 = row.createCell(16);
            CH1_16.setCellValue("Status");
            Cell CH1_17 = row.createCell(17);
            CH1_17.setCellValue("Assign ADM/ACM");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 17, 17));

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
            CH1_16.setCellStyle(headerStyle);
            CH1_17.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Sale");
            Cell CH2_02 = row2.createCell(2);
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Home");
            Cell CH2_04 = row2.createCell(4);
            Cell CH2_05 = row2.createCell(5);
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("Currency");
            Cell CH2_07 = row2.createCell(7);
            CH2_07.setCellValue("Fare");
            Cell CH2_08 = row2.createCell(8);
            CH2_08.setCellValue("Value Commission");
            Cell CH2_09 = row2.createCell(9);
            CH2_09.setCellValue("Value Commission");
            Cell CH2_10 = row2.createCell(10);
            CH2_10.setCellValue("Value");
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("Round");
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("IVA Round");
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));

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
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);

//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
//            sheet.autoSizeColumn(11, true);
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);

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
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);
                Cell cell64 = row.createCell(14);
                Cell cell65 = row.createCell(15);
                Cell cell66 = row.createCell(16);
                Cell cell67 = row.createCell(17);

                cell50.setCellValue(listaData.get(vi).A2959FPERI);
                cell51.setCellValue(listaData.get(vi).A2845AGENT);
                cell52.setCellValue(listaData.get(vi).A003KEY3);
                cell53.setCellValue(listaData.get(vi).A2845IATAH);
                cell54.setCellValue(listaData.get(vi).A2845FUENT);
                cell55.setCellValue(listaData.get(vi).A2845PAIVT);
                cell56.setCellValue(listaData.get(vi).A2845MDAFA);
                cell57.setCellValue(listaData.get(vi).A2845FARE);
                cell58.setCellValue(listaData.get(vi).A2845TTCOM);
                cell59.setCellValue(listaData.get(vi).A2845VUPFR);
                cell60.setCellValue(listaData.get(vi).DIFERENCIA);
                cell61.setCellValue(listaData.get(vi).ROUND);
                cell62.setCellValue(listaData.get(vi).ROUND_IVA);
                cell63.setCellValue(listaData.get(vi).DIFERENCIA_IVA_TOTAL);
                cell64.setCellValue(listaData.get(vi).APPLY_ADM);
                cell65.setCellValue(listaData.get(vi).A2959TRNCO);
                cell66.setCellValue(listaData.get(vi).STATUS);
                cell67.setCellValue(listaData.get(vi).A2959REPRO);

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

    @RequestMapping(value = "getXLSXDataEntry")
    public @ResponseBody
    void getXLSXDataEntry(HttpServletRequest request, HttpServletResponse response) {
        List<SQP01362Filter> listaData;
        filter = new SQP01362Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        
        String fileNameDownload = String.format("Determination Of Commission(Consolidado) - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            
            filter.VP_CIA = request.getParameter("VP_CIA").trim();
            filter.VP_FPROC_D = request.getParameter("VP_FPROC_D").trim();
            filter.VP_FPROC_H = request.getParameter("VP_FPROC_H").trim();
            filter.VP_FUENT = request.getParameter("VP_FUENT").trim();
            filter.VP_PAIVTA = request.getParameter("VP_PAIVTA").trim();
            filter.A2845INDAC = request.getParameter("A2845INDAC").trim();
            filter.VP_SCHEMA = request.getParameter("VP_SCHEMA").trim();
            filter.VP_STATUS = request.getParameter("VP_STATUS").trim();
            filter.VP_A2959IATAH = request.getParameter("VP_A2959IATAH").trim();
            filter.VP_A2959AGENT = request.getParameter("VP_A2959AGENT").trim();
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            
            logic = new DeterminationOfCommissionLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListFPROCHISTORY(filter);
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Determination Of Commission(Consolidado)");
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
            CH1_00.setCellValue("TAKEN");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("GIVEN");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("DIFFERENCE");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("Total");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("Apply");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("Status");
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("Status Record");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("Record Change ");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 13));

            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
            CH1_07.setCellStyle(headerStyle);
            CH1_08.setCellStyle(headerStyle);
            CH1_09.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);

            sheet.autoSizeColumn(10, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_00 = row2.createCell(0);
            CH2_00.setCellValue("Currency");
            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Fare");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Value Commission");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Value Commission");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Value");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Round");
            Cell CH2_06 = row2.createCell(6);
            CH2_06.setCellValue("IVA Round");
            Cell CH2_07 = row2.createCell(7);
            Cell CH2_08 = row2.createCell(8);
            Cell CH2_09 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            CH2_11.setCellValue("User");
            Cell CH2_12 = row2.createCell(12);
            CH2_12.setCellValue("Date");
            Cell CH2_13 = row2.createCell(13);
            CH2_13.setCellValue("Hour");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 13, 13));

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

            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
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
                Cell cell60 = row.createCell(10);
                Cell cell61 = row.createCell(11);
                Cell cell62 = row.createCell(12);
                Cell cell63 = row.createCell(13);

                cell50.setCellValue(listaData.get(vi).A2845MDAFA);
                cell51.setCellValue(listaData.get(vi).A2845FARE);
                cell52.setCellValue(listaData.get(vi).A2845TTCOM);
                cell53.setCellValue(listaData.get(vi).A2845VUPFR);
                cell54.setCellValue(listaData.get(vi).DIFERENCIA);
                cell55.setCellValue(listaData.get(vi).ROUND);
                cell56.setCellValue(listaData.get(vi).ROUND_IVA);
                cell57.setCellValue(listaData.get(vi).DIFERENCIA_IVA_TOTAL);
                cell58.setCellValue(listaData.get(vi).APPLY_ADM);
                cell59.setCellValue(listaData.get(vi).A2959TRNCO);
                cell60.setCellValue(listaData.get(vi).A2959FLAG);
                cell61.setCellValue(listaData.get(vi).A2959RMODI);
                cell62.setCellValue(listaData.get(vi).A2959FMODI);
                cell63.setCellValue(listaData.get(vi).A2959HMODI);

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

//                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                sheet.autoSizeColumn(6, true);
                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
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
