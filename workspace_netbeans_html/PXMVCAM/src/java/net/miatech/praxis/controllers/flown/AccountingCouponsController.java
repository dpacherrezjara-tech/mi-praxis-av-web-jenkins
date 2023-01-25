package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.SocketException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.logic.flown.AccountingCouponsLogic;
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
import org.apache.commons.codec.binary.Base64;

// </editor-fold>
/**
 *
 * @author jsolano
 */
@Controller
@Scope("request")
@RequestMapping("/AccountingCoupons")
public class AccountingCouponsController extends BaseController {

    private AccountingCouponsLogic logic;
    private A3084Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A3084Filter> listaData;
        filter = new A3084Filter();
        try {
            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM");
            filter.CARRYER = request.getParameter("CARRYER");
            filter.CIAF = request.getParameter("CIAF");
            filter.FTYPE = request.getParameter("FTYPE");

            logic = new AccountingCouponsLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP04611(filter);

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

    @RequestMapping(value = "/exportFile1")
    public @ResponseBody
    String exportFile1(ModelMap map, HttpServletRequest request) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        String strFecha;
        String bytes = "";

        String[] lista;//Nombres de los archivos en general
        List<A3084Filter> listaArray = new ArrayList<>();

        //OBTENIENDO EL ZIP DESEADO ========================================
        try {
            strFecha = request.getParameter("strFecha");

            FilenameFilter fnfZIP = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return (name.startsWith("ACC_") && name.endsWith(".zip"));
                }
            };

            String pathImgs = "\\\\10.0.0.87\\am\\ACC\\" + strFecha.substring(0, 4) + "\\";
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfZIP);
            for (int i = 0; i < lista.length; i++) {
                if (lista[i].toString().trim().startsWith("ACC_" + strFecha)) {
                    A3084Filter nombre = new A3084Filter();
                    nombre.strFormatDate = lista[i].toString().trim();
                    listaArray.add(nombre);
                }
            }
            InputStream input;
            if (listaArray.size() > 0) {
                File f = new File(pathImgs + listaArray.get(0).strFormatDate);
            }

            map.put("success", true);
            map.put("listaArray", listaArray);
            map.put("str", bytes);
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            map.put("success", false);
            map.put("sesion", " Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getIDECZip")
    public @ResponseBody
    void getIDECZip(HttpServletRequest request, HttpServletResponse response) throws IOException {

        SFI040Filter filter = new SFI040Filter();
        String strFecha = request.getParameter("FECHA");
        String strNOMBRE = request.getParameter("NOMBRE");
        InputStream is = null;
        try {
            System.out.println("PassengerInvoices : getIDECZip");
            String rutaFile = "\\\\10.0.0.87\\am\\ACC\\" + strFecha.substring(0, 4) + "\\";
//            String fileName = "ACC_" + strFecha + ".zip";
            String fileName = strNOMBRE;

            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");

            OutputStream out = response.getOutputStream();
            is = new FileInputStream(rutaFile + "\\" + fileName);

            int bytes;
            while ((bytes = is.read()) != -1) {
                out.write(bytes);
            }
            is.close();
            response.flushBuffer();
        } catch (IOException ex) {
            System.out.println("PassengerInvoices : getIDECZip");
        } finally {
            is.close();
        }

    }

}
