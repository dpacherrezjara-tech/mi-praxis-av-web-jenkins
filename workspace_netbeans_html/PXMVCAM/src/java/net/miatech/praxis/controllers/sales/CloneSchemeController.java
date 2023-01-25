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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CloneSchemeLogic;
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
@RequestMapping("/CloneScheme")
public class CloneSchemeController extends BaseController {

    private CloneSchemeLogic logic;
    private A1155Filter filter;
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
            filter.A1155FESTA = request.getParameter("A1155FESTA").trim();
            filter.A1155FINI = request.getParameter("A1155FINI").trim();
            filter.A1155FINGR = request.getParameter("A1155FINGR").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new CloneSchemeLogic();
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
    
    @RequestMapping(value = "/setSaveClone")
    public @ResponseBody
    String setSaveClone(ModelMap map, HttpServletRequest request) {
       List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        filter = new A1155Filter();
        try {
            filter.IN_SELET_CODE = request.getParameter("IN_SELET_CODE").trim();
            filter.IN_SELET_TYPE = request.getParameter("IN_SELET_TYPE").trim();
            filter.IN_SELET_SERIE = request.getParameter("IN_SELET_SERIE").trim();
            filter.IN_COPY_CODE = request.getParameter("IN_COPY_CODE").trim();
            filter.IN_COPY_TYPE = request.getParameter("IN_COPY_TYPE").trim();
            filter.IN_COPY_SERIE = request.getParameter("IN_COPY_SERIE").trim();
            
            String temp = request.getParameter("IN_COPY_INFO").trim();
            if (temp.length()>0) filter.IN_COPY_INFO = Integer.parseInt(temp);
            temp = request.getParameter("IN_COPY_GLOBAL").trim();
            if (temp.length()>0) filter.IN_COPY_GLOBAL = Integer.parseInt(temp);
            temp = request.getParameter("IN_COPY_SECTOR").trim();
            if (temp.length()>0) filter.IN_COPY_SECTOR = Integer.parseInt(temp);
            temp = request.getParameter("IN_COPY_AX_TABLE").trim();
            if (temp.length()>0) filter.IN_COPY_AX_TABLE = Integer.parseInt(temp);
            
            logic = new CloneSchemeLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstRtn = logic.setSaveClone(filter);
            
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
}
