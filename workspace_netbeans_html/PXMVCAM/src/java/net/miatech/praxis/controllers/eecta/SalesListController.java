/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.eecta;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.classes.ReportVentaUATP;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.eecta.SQP03873Filter;
import net.miatech.praxis.eecta.SQP03874Filter;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.eecta.SalesListLogic;
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
@RequestMapping("/SalesList")
public class SalesListController extends BaseController {

    private SalesListLogic logic;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP03873Filter> listaData;
        SQP03873Filter filter;
        filter = new SQP03873Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_FDATE1 = request.getParameter("VP_FDATE1");
            filter.VP_FDATE2 = request.getParameter("VP_FDATE2");
            filter.VP_CDCLI = request.getParameter("VP_CDCLI");
            filter.VP_RSOCI = request.getParameter("VP_RSOCI");
            filter.VP_NRRPT = request.getParameter("VP_NRRPT");
            
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;            
            logic = new SalesListLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP03873Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);            
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

    @RequestMapping(value = "pdf_reportVentaUATP")
    void pdf_reportVentaUATP(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            logic = new SalesListLogic();
            logic.setSession(this.serverSession.getServerSession());
            SQP03874Filter filter;
            List<SQP03874Filter> listaData;
            filter = new SQP03874Filter();
            //Datos cabecera    
            String beanString = request.getParameter("beanString");
            filter = new Gson().fromJson(beanString, filter.getClass());
            listaData = logic.getSQP03874Filter(filter);

            ReportVentaUATP reportVentaUATP = new ReportVentaUATP();
            File archivo = reportVentaUATP.createReport(listaData);
            response.setHeader("Expires", "0");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Pragma", "public");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + archivo.getName() + "\"");
            //response.setContentLength(baos.size());
            ServletOutputStream sos = null;
            FileInputStream fis = null;
            fis = new FileInputStream(new File(archivo.getAbsolutePath()));
            byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(fis);
            sos = response.getOutputStream();
            sos.write(bytes);
            sos.flush();
            sos.close();
        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }

    }
}
