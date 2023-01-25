package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.SQP01356Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.LoadVirtualCardMCOLogic;
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
import org.apache.poi.xssf.usermodel.XSSFSheet;
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
@RequestMapping("/LoadVirtualCardMCO")
public class LoadVirtualCardMCOController extends BaseController {

    private LoadVirtualCardMCOLogic logic;
    private SQP01356Filter filter;

    @RequestMapping(value = "/getListVirtualCard")
    public @ResponseBody
    String getListVirtualCard(ModelMap map, HttpServletRequest request) {
        List<SQP01356Filter> listaData;
        filter = new SQP01356Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.A2860APLYB = request.getParameter("A2860APLYB").trim();
            filter.A2860INDAC = request.getParameter("A2860INDAC").trim();
            filter.A2860VCARD = request.getParameter("A2860VCARD").trim();
            filter.A2860VCARX = request.getParameter("A2860VCARX").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            logic = new LoadVirtualCardMCOLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getListVirtualCard(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);

        } catch (NumberFormatException | SQLException ex) {
            map.put("sesion", "Se produjo un error.");
            map.put("error", ex.getMessage());
            throw new SpringException(ex);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/setMantenimientoCARDMCO")
    public @ResponseBody
    String setMantenimientoCARDMCO(ModelMap map, HttpServletRequest request) {
        List<SQP01356Filter> lstRtn;
        String VP_ACTION;
        filter = new SQP01356Filter();
        
        try {
            VP_ACTION = request.getParameter("strOption");
            filter.A2860INDAC = request.getParameter("A2860INDAC");
            filter.A2860VCARX = request.getParameter("A2860VCARX");
            filter.A2860VCARD = request.getParameter("A2860VCARD");
            filter.A2860EFFST = request.getParameter("A2860EFFST");
            filter.A2860EFFEN = request.getParameter("A2860EFFEN");
            filter.A2860APLYU = request.getParameter("A2860APLYU");
            filter.A2860APLYB = request.getParameter("A2860APLYB");
            filter.A2860PRODU = request.getParameter("A2860PRODU");
            filter.A2860COMNM = request.getParameter("A2860COMNM");
            
            logic = new LoadVirtualCardMCOLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            lstRtn = logic.setMantenimientoCARDMCO(filter, VP_ACTION);
            //resp.info.add(objRtn.OU_MESSAGE);
            //resp.info.add(objRtn.OU_SQLCODE);map.put("success", true);
            map.put("intResult", lstRtn.get(0).OU_MESSAGE);
//            map.put("strOption", strOption);
        } catch (SQLException e) {
            map.put("success", false);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/setLoadExcel")
    public @ResponseBody
    String setLoadExcel(ModelMap map, HttpServletRequest request) {
        byte[] bytes = null;
        String filename = "";
        filter = new SQP01356Filter();
        
        String mensaje = "";
        String C="";
        File archivo = null;
        try {
            bytes = (request.getParameter("arrBytes")).getBytes("ISO-8859-1");
            filename = request.getParameter("filename");
            filter.A2860INDAC = request.getParameter("A2860INDAC");
            filter.A2860VCARX = request.getParameter("A2860VCARX");
            filter.A2860VCARD = request.getParameter("A2860VCARD");
            filter.A2860EFFST = request.getParameter("A2860EFFST");
            filter.A2860EFFEN = request.getParameter("A2860EFFEN");
            filter.A2860APLYU = request.getParameter("A2860APLYU");
            filter.A2860APLYB = request.getParameter("A2860APLYB");
            filter.A2860PRODU = request.getParameter("A2860PRODU");
            filter.A2860COMNM = request.getParameter("A2860COMNM");
            
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "MCO" + strSesion.substring(0, 7) + ".xls";
            
            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            fs.write(bytes);
            fs.flush();
            fs.close();
            
            C = new String(filename);
            String[] SPT = C.split("\\.");
            filename=SPT[0];
            logic = new LoadVirtualCardMCOLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            mensaje = logic.setLoadExcel(filter,strArchivo,filename);
            map.put("success", true);
            map.put("sesion", mensaje);
        } catch (Exception e) {
            System.out.println("sesion: Se produjo un error al intentar subir el archivo. " + e.getMessage());
            map.put("success", false);
            map.put("sesion", "sesion: Se produjo un error al intentar subir el archivo.\n" + e.getMessage());
        } finally {
            //Eliminar temporal           
            archivo.delete();
        }

        return new Gson().toJson(map);
    }
}
