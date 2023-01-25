/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.salesAudit.DocumentsControlLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/DocumentsControl")
public class DocumentsControlController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");

    @RequestMapping(value = "SearchReportGeneral")
    public @ResponseBody
    String SearchReportGeneral(ModelMap map, HttpServletRequest request) {
        SQP00911Filter filter = new SQP00911Filter();
        List<SQP00911Filter> lst_search = null;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            DocumentsControlLogic logic = new DocumentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            switch (filter.OPCIONTYPE) {
                case "1":
                    lst_search = logic.SearchReportGeneral(filter);
                    break;
                case "2":
                    lst_search = logic.SearchReportStatus(filter);
                    break;
                case "3":
                    lst_search = logic.SearchReportrazon(filter);
                    break;
            }

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "SearchReportADM")
    public @ResponseBody
    String SearchReportADM(ModelMap map, HttpServletRequest request) {
        SQP00911Filter filter = new SQP00911Filter();
        List<SQP00911Filter> lst_search = null;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            int pExcel = Integer.parseInt(filter.pexcel);
            Boolean bExcel = pExcel == 1 ? true : false;
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            DocumentsControlLogic logic = new DocumentsControlLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst_search = logic.SearchReportADM(filter);
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

}
