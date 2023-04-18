/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import net.miatech.praxis.controllers.sales.*;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.miatech.beans.PX019S01A025Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ViewTicketLogic;
import net.miatech.praxis.logic.sales.MinimunRuleLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/ViewTicket")
public class ViewTicketController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ViewTicketLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ViewTicket/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ViewTicket : search-------------");
        List<A2290Filter> lst = this.getList(request, false);

        map.put("data", lst);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size());
        map.put("success", true);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new ViewTicketLogic();

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();

        try {

            logic.setSession(this.serverSession.getServerSession());

            filter.option = request.getParameter("option");
            filter.TICKET = request.getParameter("TICKET");
            filter.PNR = request.getParameter("PNR");
            filter.CC1 = request.getParameter("CC1");
            filter.CC2 = request.getParameter("CC2");
            filter.AUTH = request.getParameter("AUTH");

            lst = logic.load(filter);

        } catch (Exception e) {
            System.out.println("--->"+e.getMessage());
            throw new SpringException(e);
        }

        return lst;
    }

}
