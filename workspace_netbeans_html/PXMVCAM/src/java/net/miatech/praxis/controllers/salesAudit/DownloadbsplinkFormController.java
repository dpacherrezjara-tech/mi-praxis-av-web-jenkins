/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.SQP00846Filter;
import net.miatech.beans.SaleAudit.SQP00982Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.DownloadbsplinkFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/DownloadbsplinkForm")
public class DownloadbsplinkFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DownloadbsplinkFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP00982Filter> lst;
        SQP00982Filter filter = new SQP00982Filter();

        try {
            logic = new DownloadbsplinkFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SearchDetail")
    public @ResponseBody
    String SearchDetail(ModelMap map, HttpServletRequest request) {
        List<SQP00982Filter> lst;
        SQP00982Filter filter = new SQP00982Filter();

        try {
            logic = new DownloadbsplinkFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");

            filter.page.PAGNUM = -1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            filter.page.PAGINIT = 1;

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.size() : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchProcessedBspLink")
    public @ResponseBody
    String searchProcessedBspLink(ModelMap map, HttpServletRequest request) {
        List<SQP00846Filter> lst;
        SQP00846Filter filter = new SQP00846Filter();

        try {
            logic = new DownloadbsplinkFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");
            filter.page.PAGNUM = -1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            filter.page.PAGINIT = 1;

            lst = logic.searchProcessedBspLink(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcessedBspLink")
    public @ResponseBody
    String ProcessedBspLink(ModelMap map, HttpServletRequest request) {
        String result = "";
        SQP00846Filter filter = new SQP00846Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");
            filter.VP_FCONT = request.getParameter("VP_FCONT");
            filter.VP_FTE = request.getParameter("VP_FTE");
            filter.VP_TRANSACTION = request.getParameter("VP_TRANSACTION");
            filter.VP_STATUS = request.getParameter("VP_STATUS");
            filter.page.PAGNUM = -1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            filter.page.PAGINIT = 1;

            logic = new DownloadbsplinkFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcessedBspLink(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "exportTxt")
    public @ResponseBody
    void exportTxt(HttpServletRequest request, HttpServletResponse response) throws Exception {

        try {

            Date myDate = new Date();
            logic = new DownloadbsplinkFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            List<SQP00846Filter> lstARCLoadControl;
            SQP00846Filter filter = new SQP00846Filter();

            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_DATEFROM = request.getParameter("VP_DATEFROM");
            filter.VP_DATETO = request.getParameter("VP_DATETO");
            filter.VP_NUMBERADM = request.getParameter("VP_NUMBERADM");
            filter.VP_COUNTRY = request.getParameter("VP_COUNTRY");
            filter.VP_FTE = request.getParameter("VP_FTE");

            filter.page.PAGNUM = -1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            filter.page.PAGINIT = 1;
            lstARCLoadControl = logic.searchProcessedBspLink(filter);

            String strTexto = "";
            String NCAMPO = "";
            for (int i = 0; i < lstARCLoadControl.size(); i++) {
                strTexto += lstARCLoadControl.get(i).CADENA + "\n";
                if (!lstARCLoadControl.get(i).NCAMPO.equals("")) {
                    NCAMPO = lstARCLoadControl.get(i).NCAMPO;
                }
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            //String fileName = "ARC_Load_Control.txt";0640
            //believe files loaded to PROD should be named “AMMP” rather than “AMMT”. 
            if (filter.VP_FTE.equals("ARC")) {
                NCAMPO = "ATA.SDOA.AMMP139.D" + new SimpleDateFormat("yyMMdd").format(myDate) + ".T" + new SimpleDateFormat("HHmm").format(myDate) + ".bsp";
            }

            response.setContentType("text/plain");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + NCAMPO + "\"");

            InputStream input = new ByteArrayInputStream(strTexto.getBytes());

            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream os = response.getOutputStream();

            while ((read = input.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();

        } catch (IOException e) {
            throw new SpringException(e);
            // System.out.println("" + e.getMessage());

        }

    }

}
