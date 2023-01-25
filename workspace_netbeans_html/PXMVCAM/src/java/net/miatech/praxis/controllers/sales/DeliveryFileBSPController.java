package net.miatech.praxis.controllers.sales;

//<editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
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
import net.miatech.beans.PX019S01A1348Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.DeliveryFileBSPLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import net.miatech.beans.spring.implement.IServerSession;

//</editor-fold>

/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/DeliveryFileBSP")
public class DeliveryFileBSPController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DeliveryFileBSPLogic logic;

//    @RequestMapping(method = RequestMethod.POST)
//    public String index(ModelMap map) {
//        map.put("vp_serverDate", Functions.getFechaActual());
//        map.put("vp_serverTime", Functions.getHoraActual());
//        return "sales/DeliveryFileBSP/form_index";
//    }

    @RequestMapping(value = "loadSearch")
    public @ResponseBody
    String loadSearch(ModelMap map, HttpServletRequest request) {
        //System.out.println("-------------- DeliveryFileBSP : loadSearch-------------");
        map.put("success", true);
        List<PX019S01A1348Filter> listaData = this.getList(request, false);
        System.out.println("Total : " + listaData.size());
        map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        map.put("data", listaData);
        return new Gson().toJson(map);
    }
    
    public List<PX019S01A1348Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new DeliveryFileBSPLogic();

        List<PX019S01A1348Filter> lst = new ArrayList<>(0);
        PX019S01A1348Filter filter = new PX019S01A1348Filter();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_OPCION = request.getParameter("IN_OPCION");
            filter.IN_CCUST = request.getParameter("IN_CCUST");
            filter.IN_SOURC = request.getParameter("IN_SOURC");
            filter.IN_PAIS = request.getParameter("IN_PAIS");
            filter.IN_CITY = request.getParameter("IN_CITY");
            filter.IN_PRDA = request.getParameter("IN_PRDA");
            filter.IN_TIME = request.getParameter("IN_TIME");
            filter.IN_IDFILE = request.getParameter("IN_IDFILE");

//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));            
            if (!bExcel){
                filter.page.PAGROW = 30;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            }else{
               filter.page.PAGROW = -1;
               filter.page.PAGNUM = -1;
            }
            lst = logic.loadPX019S01A1348(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "getFileTxt")
    public @ResponseBody
    void GetFile(HttpServletRequest request, HttpServletResponse response) {
        //System.out.println("Delivery File BSP : getFile");
        List<PX019S01A1348Filter> listaData = new ArrayList<>();
        StringBuilder line = new StringBuilder();
        String fileNameDownload = "Delivery File BSP - " + Functions.getFechaActual() + ".txt";
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

        String delim = "\t";
        String texto = "\r\n";

        line.append(texto.toString());

        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            listaData = this.getList(request, true);
            
            //System.out.println("Tamaño:" + listaData.size());
            
            String strTexto = "";
            for (PX019S01A1348Filter item : listaData) {
                strTexto += item.DELIVERY + delim
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
}
