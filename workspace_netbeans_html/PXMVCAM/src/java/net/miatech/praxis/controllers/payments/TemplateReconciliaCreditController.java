package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Type;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.TemplateReconciliaCreditLogic;
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF102;
import net.miatech.praxis.payment.MPF102Filter;
import net.miatech.praxis.payment.MPF060;
import net.miatech.praxis.payment.MPF083;
import net.miatech.praxis.payment.MPF083Filter;
import net.miatech.praxis.payment.MPF091;
import net.miatech.praxis.payment.MPF091Filter;
import net.miatech.praxis.payment.MPF100C;
import net.miatech.praxis.payment.MPF100Filter;
import net.miatech.praxis.payment.dto.ConciliationTemplate;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.json.JSONArray;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/TemplateReconciliaCredit")
public class TemplateReconciliaCreditController extends BaseController {

    private TemplateReconciliaCreditLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/TemplateReconciliaCredit/form_index";
    }

    @RequestMapping(value = "getPendingDeposits")
    public @ResponseBody
    String fetchPendingDeposits(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingSettlements -----------");
        map.put("success", true);
        List<MPF102> lst = this.searchPendingDeposits(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF102> searchPendingDeposits(HttpServletRequest request, Boolean bExcel) {

        List<MPF102> lst = new ArrayList<>(0);
        MPF102Filter filter = new MPF102Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF102Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS111(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingHeader")
    public @ResponseBody
    String fetchPendingHeader(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingDiscountsHelp -----------");
        map.put("success", true);
        List<MPF083> lst = this.searchPendingHeader(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF083> searchPendingHeader(HttpServletRequest request, Boolean bExcel) {

        List<MPF083> lst = new ArrayList<>(0);
        MPF083Filter filter = new MPF083Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF083Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS485(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingSettlements")
    public @ResponseBody
    String fetchPendingSettlements(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingSettlements -----------");
        map.put("success", true);
        List<MPF060> lst = this.searchPendingSettlements(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF060> searchPendingSettlements(HttpServletRequest request, Boolean bExcel) {

        List<MPF060> lst = new ArrayList<>(0);
        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS113(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingDiscounts")
    public @ResponseBody
    String fetchPendingDiscounts(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingDiscounts -----------");
        map.put("success", true);
        List<MPF091> lst = this.searchPendingDiscounts(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF091> searchPendingDiscounts(HttpServletRequest request, Boolean bExcel) {

        List<MPF091> lst = new ArrayList<>(0);
        MPF091Filter filter = new MPF091Filter();
        Gson gson = new Gson();
        String beanString = "";
        String beanMerchand = "";
        String beanLiquidation = "";
        String merchandIn = "";
        String liquidationIn = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF091Filter.class);
            beanMerchand = request.getParameter("beanMerchand");
            beanLiquidation = request.getParameter("beanLiquidation");

            JSONArray merchandArray = new JSONArray(beanMerchand);
            JSONArray liquidationArray = new JSONArray(beanLiquidation);

            for (int i = 0; i < merchandArray.length(); i++) {
                String merchand = merchandArray.getString(i);
                merchandIn += merchand + "|";
            }

            if (merchandIn.length() > 0) {
                merchandIn = merchandIn.substring(0, merchandIn.length() - 1);
            }

            for (int i = 0; i < liquidationArray.length(); i++) {
                String liquidation = liquidationArray.getString(i);
                liquidationIn += liquidation + "|";
            }

            if (liquidationIn.length() > 0) {
                liquidationIn = liquidationIn.substring(0, liquidationIn.length() - 1);
            }

            filter.merchandIn = merchandIn;
            filter.liquidationIn = liquidationIn;
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS112(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingSales")
    public @ResponseBody
    String fetchPendingSales(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingSales -----------");
        map.put("success", true);
        List<MPF100C> lst = this.searchPendingSales(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100C> searchPendingSales(HttpServletRequest request, Boolean bExcel) {

        List<MPF100C> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS107(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingDiscountsHelp")
    public @ResponseBody
    String fetchPendingDiscountsHelp(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingDiscountsHelp -----------");
        map.put("success", true);
        List<MPF091> lst = this.searchPendingDiscountsHelp(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF091> searchPendingDiscountsHelp(HttpServletRequest request, Boolean bExcel) {

        List<MPF091> lst = new ArrayList<>(0);
        MPF091Filter filter = new MPF091Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF091Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS484(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "executeConciliationOld")
    public @ResponseBody
    String assignTicketsOld(HttpServletRequest request) throws Exception {
        System.out.println("Template Reconciliation : executeConciliation");

        MPF102Filter filter = new MPF102Filter();
        Gson gson = new Gson();
        HashMap m = new HashMap();
        String beanString = "";
        String listDiscounts = "";
        String listBandoc = "";
        String listHead = "";
        String listSettlements = "";
        String listSales = "";
        String regs = "", regsEC = "", message = "";

        String message060 = "";

        List<MPF060> lstSettlements = new ArrayList<>(0);
        List<MPF102> lstBandoc = new ArrayList<>(0);
        List<MPF091> lstDiscount = new ArrayList<>(0);
        List<MPF083> lstHeader = new ArrayList<>(0);

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF102Filter.class);

            listDiscounts = request.getParameter("beanDiscounts");
            listBandoc = request.getParameter("beanBandoc");
            listHead = request.getParameter("beanHead");
            listSettlements = request.getParameter("beanSettlements");
            listSales = request.getParameter("beanSales");

            Type listTypeBandoc = new TypeToken<List<MPF102>>() {
            }.getType();
            List<MPF102> bandocList = gson.fromJson(listBandoc, listTypeBandoc);

            Type listTypeSettlement = new TypeToken<List<MPF060>>() {
            }.getType();
            List<MPF060> settlementsList = gson.fromJson(listSettlements, listTypeSettlement);

            Type listTypeDiscounts = new TypeToken<List<MPF091>>() {
            }.getType();
            List<MPF091> discountsList = gson.fromJson(listSettlements, listTypeDiscounts);

            Type listTypeSale = new TypeToken<List<MPF100C>>() {
            }.getType();
            List<MPF100C> salesList = gson.fromJson(listSales, listTypeSale);

            Type listTypeHeader = new TypeToken<List<MPF083>>() {
            }.getType();
            List<MPF083> headerList = gson.fromJson(listHead, listTypeHeader);

            String bandocGroup = "";
            String settlementGroup = "";
            String discountsGroup = "";
            String salesGroup = "";

            List<ConciliationTemplate> lstData = new ArrayList<>();
            ConciliationTemplate obj = new ConciliationTemplate();

            if (!filter.IN_CODPRO.equals("VN") && !filter.IN_CODPRO.equals("BM") && !filter.IN_CODPRO.equals("AB")) {

                for (MPF060 settlements : settlementsList) {
                    MPF060 settle = new MPF060();
                    settle.CCUST = settlements.CCUST;
                    settle.SDATE = settlements.SDATE;
                    settle.SCOUNTRY = settlements.SCOUNTRY;
                    settle.TDOC = settlements.TDOC;
                    settle.CODEBANK = settlements.CODEBANK;
                    settle.SCARCOD = settlements.SCARCOD;
                    settle.SCARDN = settlements.SCARDN;
                    settle.SAUTHOC = settlements.SAUTHOC;
                    settle.SEQ = settlements.SEQ;
                    settle.SVFOP = settlements.SVFOP;
                    settle.TFILE = settlements.TFILE;
                    settle.CODUNI = settlements.CODUNI;
                    lstSettlements.add(settle);
                }

                for (MPF102 bandoc : bandocList) {
                    MPF102 ban = new MPF102();
                    ban.CCUST = bandoc.CCUST;
                    ban.ADATE = bandoc.ADATE;
                    ban.SOCIETY = bandoc.SOCIETY;
                    ban.CODEBANK = bandoc.CODEBANK_EC;
                    ban.BANDOC = bandoc.BANDOC;
                    ban.TFILE = bandoc.TFILE;
                    ban.CODUNI = bandoc.CODUNI;
                    lstBandoc.add(ban);
                }

                for (MPF091 discount : discountsList) {
                    MPF091 dis = new MPF091();
                    dis.CCUST = discount.CCUST;
                    dis.PRDA = discount.PRDA;
                    dis.CODPRO = discount.CODPRO;
                    dis.CCUSTPRO = discount.CCUSTPRO;
                    dis.FLIQUIDACI = discount.FLIQUIDACI;
                    dis.LIQUIDACIO = discount.LIQUIDACIO;
                    dis.MERCHAND = discount.MERCHAND;
                    dis.MONEDA = discount.MONEDA;
                    dis.CODIGO = discount.CODIGO;
                    dis.CORRL = discount.CORRL;
                    dis.TFILE = discount.TFILE;
                    dis.CODUNI = discount.CODUNI;
                    lstDiscount.add(dis);
                }

                for (MPF083 header : headerList) {
                    MPF083 head = new MPF083();
                    head.MONEDALIQ = header.MONEDALIQ;
                    head.PAISLIQ = header.PAISLIQ;
                    head.SDATE = header.SDATE;
                    head.TFILE = header.TFILE;
                    head.CODUNI = header.CODUNI;
                    lstHeader.add(head);
                }

//                message060 = logic.loadMPS487(lstSettlements);
            } else {

                List<String> salesParts = new ArrayList<>();
                for (MPF100C sale : salesList) {
                    salesParts.add(
                            sale.CCUST.trim() + ";" + sale.CCIA.trim() + ";" + sale.FORMA.trim() + ";"
                            + sale.SERIE.trim() + ";" + sale.TDOC.trim() + ";" + sale.SCARDNCOR.trim() + ";"
                            + sale.SAUTHOC.trim() + ";" + sale.SEQ.trim() + ";" + sale.CORRL.trim() + ";"
                            + sale.SVFOP + ";" + sale.TOTAL
                    );
                }
                salesGroup = String.join("|", salesParts);

                List<String> bandocParts = new ArrayList<>();
                for (MPF102 bandoc : bandocList) {
                    bandocParts.add(
                            bandoc.CCUST.trim() + ";" + bandoc.ADATE.trim() + ";" + bandoc.SOCIETY.trim() + ";"
                            + bandoc.CODEBANK.trim() + ";" + bandoc.BANDOC.trim()
                    );
                }

                bandocGroup = String.join("|", bandocParts);

                obj.liq = salesGroup;
                obj.ec = bandocGroup;
                obj.processR = filter.IN_CODPRO;
                lstData.add(obj);

                message = logic.loadMPS106(lstData);
            }

        } catch (Exception e) {
            e.printStackTrace();
            message = e.getMessage();
            m.put("success", false);
            m.put("result", message);
        }

        if (message != null) {
            m.put("success", true);
            m.put("result", message);
        } else {
            m.put("success", false);
            m.put("result", message);
        }

        return gson.toJson(m);
    }

    @RequestMapping(value = "executeConciliation")
    public @ResponseBody
    String assignTickets(HttpServletRequest request) throws Exception {
        System.out.println("Template Reconciliation : executeConciliation");

        MPF102Filter filter = new MPF102Filter();
        Gson gson = new Gson();
        HashMap<String, Object> m = new HashMap<>();
        String beanString = "";
        String listDiscounts = "";
        String listBandoc = "";
        String listHead = "";
        String listSettlements = ""; // Este vendrá descomprimido
        String listSales = "";
        String regs = "", regsEC = "", message = "";
        String message060 = "";
        String message102 = "";
        String message091 = "";
        String message083 = "";
        String messageResponse = "";

        List<MPF060> lstSettlements = new ArrayList<>(0);
        List<MPF102> lstBandoc = new ArrayList<>(0);
        List<MPF091> lstDiscount = new ArrayList<>(0);
        List<MPF083> lstHeader = new ArrayList<>(0);

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF102Filter.class);

            listDiscounts = request.getParameter("beanDiscounts");
            listBandoc = request.getParameter("beanBandoc");
            listHead = request.getParameter("beanHead");
            listSales = request.getParameter("beanSales");

            String compressedBase64 = request.getParameter("beanSettlementsCompressed");
            String compressionType = request.getParameter("compression");

            if (compressedBase64 != null && !compressedBase64.isEmpty()) {
                if ("gzip".equals(compressionType)) {
                    // Descomprimir GZIP
                    listSettlements = decompressGzipFromBase64(compressedBase64);
                    System.out.println("Settlements descomprimidos: " + listSettlements.length() + " caracteres");
                } else {
                    // Si no está comprimido o es otro formato
                    listSettlements = compressedBase64;
                }
            } else {
                // Fallback: intentar leer como parámetro normal
                listSettlements = request.getParameter("beanSettlements");
            }

            if (filter == null || filter.IN_CODPRO == null) {
                throw new Exception("Filtro nulo o IN_CODPRO no especificado");
            }

            Type listTypeBandoc = new TypeToken<List<MPF102>>() {
            }.getType();
            List<MPF102> bandocList = gson.fromJson(listBandoc, listTypeBandoc);

            Type listTypeSettlement = new TypeToken<List<MPF060>>() {
            }.getType();
            List<MPF060> settlementsList = gson.fromJson(listSettlements, listTypeSettlement);

            Type listTypeDiscounts = new TypeToken<List<MPF091>>() {
            }.getType();
            List<MPF091> discountsList = gson.fromJson(listDiscounts, listTypeDiscounts); // ¡CORREGIDO! era listSettlements

            Type listTypeSale = new TypeToken<List<MPF100C>>() {
            }.getType();
            List<MPF100C> salesList = gson.fromJson(listSales, listTypeSale);

            Type listTypeHeader = new TypeToken<List<MPF083>>() {
            }.getType();
            List<MPF083> headerList = gson.fromJson(listHead, listTypeHeader);

            String bandocGroup = "";
            String settlementGroup = "";
            String discountsGroup = "";
            String salesGroup = "";

            List<ConciliationTemplate> lstData = new ArrayList<>();
            ConciliationTemplate obj = new ConciliationTemplate();

            if (!filter.IN_CODPRO.equals("VN") && !filter.IN_CODPRO.equals("BM") && !filter.IN_CODPRO.equals("AB")) {
                // Procesar settlements
                for (MPF060 settlements : settlementsList) {
                    MPF060 settle = new MPF060();
                    settle.CCUST = settlements.CCUST;
                    settle.SDATE = settlements.SDATE;
                    settle.SCOUNTRY = settlements.SCOUNTRY;
                    settle.TDOC = settlements.TDOC;
                    settle.CODEBANK = settlements.CODEBANK;
                    settle.SCARCOD = settlements.SCARCOD;
                    settle.SCARDN = settlements.SCARDN;
                    settle.SAUTHOC = settlements.SAUTHOC;
                    settle.SEQ = settlements.SEQ;
                    settle.SVFOP = settlements.SVFOP;
                    settle.TFILE = settlements.TFILE;
                    settle.CODUNI = settlements.CODUNI;
                    lstSettlements.add(settle);
                }

                for (MPF102 bandoc : bandocList) {
                    MPF102 ban = new MPF102();
                    ban.CCUST = bandoc.CCUST;
                    ban.ADATE = bandoc.ADATE;
                    ban.SOCIETY = bandoc.SOCIETY;
                    ban.CODEBANK = bandoc.CODEBANK_EC;
                    ban.BANDOC = bandoc.BANDOC;
                    ban.TFILE = bandoc.TFILE;
                    ban.CODUNI = bandoc.CODUNI;
                    lstBandoc.add(ban);
                }

                for (MPF091 discount : discountsList) {
                    MPF091 dis = new MPF091();
                    dis.CCUST = discount.CCUST;
                    dis.PRDA = discount.PRDA;
                    dis.CODPRO = discount.CODPRO;
                    dis.CCUSTPRO = discount.CCUSTPRO;
                    dis.FLIQUIDACI = discount.FLIQUIDACI;
                    dis.LIQUIDACIO = discount.LIQUIDACIO;
                    dis.MERCHAND = discount.MERCHAND;
                    dis.MONEDA = discount.MONEDA;
                    dis.CODIGO = discount.CODIGO;
                    dis.CORRL = discount.CORRL;
                    dis.TFILE = discount.TFILE;
                    dis.CODUNI = discount.CODUNI;
                    lstDiscount.add(dis);
                }

                for (MPF083 header : headerList) {
                    MPF083 head = new MPF083();
                    head.CCUST = header.CCUST;
                    head.PRDA = header.PRDA;
                    head.CODPRO = header.CODPRO;
                    head.CCUSTPRO = header.CCUSTPRO;
                    head.FLIQUIDACI = header.FLIQUIDACI;
                    head.LIQUIDACIO = header.LIQUIDACIO;
                    head.MERCHAND = header.MERCHAND;
                    head.MONEDA = header.MONEDA;
                    head.MONEDALIQ = header.MONEDALIQ;
                    head.PAISLIQ = header.PAISLIQ;
                    head.SDATE = header.SDATE;
                    head.TFILE = header.TFILE;
                    head.CODUNI = header.CODUNI;
                    lstHeader.add(head);
                }

                message102 = logic.loadMPS486(lstBandoc, filter);
                message060 = logic.loadMPS487(lstSettlements, filter);
                message091 = logic.loadMPS488(lstDiscount, filter);
                message083 = logic.loadMPS489(lstHeader, filter);
                
                message = logic.loadMPS109(filter);

            } else {
                // Procesar ventas
                List<String> salesParts = new ArrayList<>();
                for (MPF100C sale : salesList) {
                    salesParts.add(
                            sale.CCUST.trim() + ";" + sale.CCIA.trim() + ";" + sale.FORMA.trim() + ";"
                            + sale.SERIE.trim() + ";" + sale.TDOC.trim() + ";" + sale.SCARDNCOR.trim() + ";"
                            + sale.SAUTHOC.trim() + ";" + sale.SEQ.trim() + ";" + sale.CORRL.trim() + ";"
                            + sale.SVFOP + ";" + sale.TOTAL
                    );
                }
                salesGroup = String.join("|", salesParts);

                List<String> bandocParts = new ArrayList<>();
                for (MPF102 bandoc : bandocList) {
                    bandocParts.add(
                            bandoc.CCUST.trim() + ";" + bandoc.ADATE.trim() + ";" + bandoc.SOCIETY.trim() + ";"
                            + bandoc.CODEBANK.trim() + ";" + bandoc.BANDOC.trim()
                    );
                }

                bandocGroup = String.join("|", bandocParts);

                obj.liq = salesGroup;
                obj.ec = bandocGroup;
                obj.processR = filter.IN_CODPRO;
                lstData.add(obj);

                message = logic.loadMPS106(lstData);
            }

        } catch (Exception e) {
            e.printStackTrace();
            message = e.getMessage();
            m.put("success", false);
            m.put("result", "Error: " + message);
            return gson.toJson(m);
        }

        // Determinar mensaje final
        String finalMessage = message;

        if (finalMessage != null && (finalMessage.contains("Succefull") || finalMessage.contains("Succ"))) {
            m.put("success", true);
            m.put("result", finalMessage);
        } else {
            m.put("success", false);
            m.put("result", finalMessage != null ? finalMessage : "Unknown error");
        }

        return gson.toJson(m);
    }

    private String decompressGzipFromBase64(String base64Data) throws IOException {
        // Decodificar Base64
        byte[] compressedBytes = Base64.getDecoder().decode(base64Data);

        // Descomprimir GZIP
        try (ByteArrayInputStream bis = new ByteArrayInputStream(compressedBytes); GZIPInputStream gis = new GZIPInputStream(bis); ByteArrayOutputStream bos = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[1024];
            int len;
            while ((len = gis.read(buffer)) > 0) {
                bos.write(buffer, 0, len);
            }

            return bos.toString("UTF-8");
        }
    }

//    REVIEW BANDOC
    @RequestMapping(value = "getPendingDepositsReview")
    public @ResponseBody
    String fetchPendingDepositsReview(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingDepositsReview -----------");
        map.put("success", true);
        List<MPF102> lst = this.searchPendingDepositsReview(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF102> searchPendingDepositsReview(HttpServletRequest request, Boolean bExcel) {

        List<MPF102> lst = new ArrayList<>(0);
        MPF102Filter filter = new MPF102Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF102Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS419(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingSettlementsReview")
    public @ResponseBody
    String fetchPendingSettlementsReview(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingSettlementsReview -----------");
        map.put("success", true);
        List<MPF060> lst = this.fetchPendingSettlementsReview(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF060> fetchPendingSettlementsReview(HttpServletRequest request, Boolean bExcel) {

        List<MPF060> lst = new ArrayList<>(0);
        MPF060Filter filter = new MPF060Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF060Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS480(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingDiscountsReview")
    public @ResponseBody
    String fetchPendingDiscountsReview(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingDiscounts -----------");
        map.put("success", true);
        List<MPF091> lst = this.searchPendingDiscountsReview(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF091> searchPendingDiscountsReview(HttpServletRequest request, Boolean bExcel) {

        List<MPF091> lst = new ArrayList<>(0);
        MPF091Filter filter = new MPF091Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF091Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS481(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getHeaderDiscountsReview")
    public @ResponseBody
    String fetchPendingHeaderReview(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : searchHeaderDiscountsReview -----------");
        map.put("success", true);
        List<MPF083> lst = this.searchHeaderDiscountsReview(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF083> searchHeaderDiscountsReview(HttpServletRequest request, Boolean bExcel) {

        List<MPF083> lst = new ArrayList<>(0);
        MPF083Filter filter = new MPF083Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF083Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS482(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getPendingSalesReview")
    public @ResponseBody
    String fetchPendingSalesReview(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : fetchPendingSalesReview -----------");
        map.put("success", true);
        List<MPF100C> lst = this.searchPendingSalesReview(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF100C> searchPendingSalesReview(HttpServletRequest request, Boolean bExcel) {

        List<MPF100C> lst = new ArrayList<>(0);
        MPF100Filter filter = new MPF100Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF100Filter.class);

            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (false) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadMPS483(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "updateDiscount")
    public @ResponseBody
    String updateDiscount(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : updateDiscount -----------");

        map.put("success", true);
        String beanString = request.getParameter("beanString");
        Gson gson = new Gson();
        MPF091Filter bean = gson.fromJson(beanString, MPF091Filter.class);

        try {
            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());
            String mensaje = logic.loadMPS420(bean);
            map.put("Mensaje", mensaje);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "addDiscountInternacional")
    public @ResponseBody
    String addDiscountInternacional(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- TemplateReconciliaCredit : addDiscountInternacional -----------");
        map.put("success", true);

        try {
            String beanString = request.getParameter("beanString");
            Gson gson = new Gson();
            MPF091Filter bean = gson.fromJson(beanString, MPF091Filter.class);

            logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());

            String mensaje = logic.loadMPS426(bean);
            map.put("Mensaje", mensaje);

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", e.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "exportConciliationExcel", method = RequestMethod.POST)
    public void exportConciliationExcel(HttpServletRequest request, HttpServletResponse response) {
        processExcelExport(request, response, false);
    }

    @RequestMapping(value = "exportConciliationExcelCompressed", method = RequestMethod.POST)
    public void exportConciliationExcelCompressed(HttpServletRequest request, HttpServletResponse response) {
        processExcelExport(request, response, true);
    }

    private void processExcelExport(HttpServletRequest request, HttpServletResponse response, boolean compressed) {
        String fileName = "Conciliation_Report_" + new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".xlsx";
        SXSSFWorkbook workbook = null;

        try {
            // ===== OBTENER Y DESCOMPRIMIR DATOS =====
            Gson gson = new Gson();

            // Leer beanString
            String beanString = request.getParameter("beanString");
            MPF102Filter filter = gson.fromJson(beanString, MPF102Filter.class);

            // Tipos para deserialización
            Type listTypeBandoc = new TypeToken<List<MPF102>>() {
            }.getType();
            Type listTypeSettlement = new TypeToken<List<MPF060>>() {
            }.getType();
            Type listTypeDiscounts = new TypeToken<List<MPF091>>() {
            }.getType();
            Type listTypeSales = new TypeToken<List<MPF100C>>() {
            }.getType();
            Type listTypeHeader = new TypeToken<List<MPF083>>() {
            }.getType();

            // Leer datos (con descompresión si es necesario)
            List<MPF102> bandocList = gson.fromJson(request.getParameter("beanBandoc"), listTypeBandoc);
            List<MPF091> discountList = gson.fromJson(request.getParameter("beanDiscounts"), listTypeDiscounts);
            List<MPF100C> salesList = gson.fromJson(request.getParameter("beanSales"), listTypeSales);
            List<MPF083> headerList = gson.fromJson(request.getParameter("beanHeader"), listTypeHeader);

            List<MPF060> settlementList;
            if (compressed) {
                // Descomprimir settlements
                String compressedBase64 = request.getParameter("beanSettlementsCompressed");
                String settlementsJson = decompressGzipFromBase64(compressedBase64);
                settlementList = gson.fromJson(settlementsJson, listTypeSettlement);

                System.out.println("Excel export - Settlements descomprimidos: "
                        + settlementList.size() + " registros");
            } else {
                // Leer normal
                settlementList = gson.fromJson(request.getParameter("beanSettlements"), listTypeSettlement);
            }

            // ===== CREAR EXCEL =====
            workbook = new SXSSFWorkbook(100); // 100 rows in memory

            // Crear estilos una sola vez
            Map<String, CellStyle> styles = createStyles(workbook);

            // ===== CREAR HOJAS =====
            int sheetCount = 0;

            // Hoja 1: Bandoc
            if (bandocList != null && !bandocList.isEmpty()) {
                createBandocSheet(workbook, bandocList, styles);
                sheetCount++;
            }

            // Hoja 2: Settlements (puede ser muy grande)
            if (settlementList != null && !settlementList.isEmpty()) {
                createSettlementSheet(workbook, settlementList, styles);
                sheetCount++;
            }

            // Hoja 3: Discounts
            if (discountList != null && !discountList.isEmpty()) {
                createDiscountSheet(workbook, discountList, styles);
                sheetCount++;
            }

            // Hoja 4: Sales
            if (salesList != null && !salesList.isEmpty()) {
                createSalesSheet(workbook, salesList, styles);
                sheetCount++;
            }

            // Hoja 5: Header
            if (headerList != null && !headerList.isEmpty()) {
                createHeaderSheet(workbook, headerList, styles);
                sheetCount++;
            }

            // ===== CONFIGURAR RESPUESTA =====
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Expires", "0");

            // ===== ESCRIBIR EXCEL =====
            workbook.write(response.getOutputStream());

            System.out.println("Excel generado: " + fileName
                    + " - Total hojas: " + sheetCount
                    + " - Settlements: " + (settlementList != null ? settlementList.size() : 0));

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                response.getWriter().write("Error generating Excel: " + e.getMessage());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        } finally {
            if (workbook != null) {
                workbook.dispose(); // IMPORTANTE: Liberar recursos temporales
            }
        }
    }

    private Map<String, CellStyle> createStyles(SXSSFWorkbook workbook) {
        Map<String, CellStyle> styles = new HashMap<>();

        // Estilo para cabeceras
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        styles.put("header", headerStyle);

        // Estilo para fechas
        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.setDataFormat(workbook.createDataFormat().getFormat("dd/MM/yyyy"));
        styles.put("date", dateStyle);

        // Estilo para números
        CellStyle numberStyle = workbook.createCellStyle();
        numberStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00"));
        styles.put("number", numberStyle);

        // Estilo para texto normal
        CellStyle normalStyle = workbook.createCellStyle();
        styles.put("normal", normalStyle);

        return styles;
    }

    private void createBandocSheet(SXSSFWorkbook workbook, List<MPF102> data, Map<String, CellStyle> styles) {
        Sheet sheet = workbook.createSheet("Bandoc");

        String[] headers = {"Bandoc", "Status", "Country", "Valdate",
            "Date", "Account", "Society", "Currency", "Neto"};

        // Cabecera
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        // Datos
        int rowIdx = 1;

        for (MPF102 item : data) {
            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(item.BANDOC != null ? item.BANDOC : "");
            row.createCell(1).setCellValue(item.STVAL != null ? item.STVAL : "");
            row.createCell(2).setCellValue(item.SCOUNTRY != null ? item.SCOUNTRY : "");
            row.createCell(3).setCellValue(item.VALDATE != null ? item.VALDATE : "");
            row.createCell(4).setCellValue(item.ADATE != null ? item.ADATE : "");
            row.createCell(5).setCellValue(item.ACCOUNT != null ? item.ACCOUNT : "");
            row.createCell(6).setCellValue(item.SOCIETY != null ? item.SOCIETY : "");
            row.createCell(7).setCellValue(item.SCURRENCY != null ? item.SCURRENCY : "");

            Cell amountCell = row.createCell(8);
            amountCell.setCellValue(item.NETO);
            amountCell.setCellStyle(styles.get("number"));

        }

        // Autoajustar columnas
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void createHeaderSheet(SXSSFWorkbook workbook, List<MPF083> data, Map<String, CellStyle> styles) {
        Sheet sheet = workbook.createSheet("Header");

        String[] headers = {"Fliquidacio", "Merchand", "Liquidacio", "Moneda", "Total", "Comision", "Neto", "Moneda Pago", "Importe Pago"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        int rowIdx = 1;

        for (MPF083 item : data) {
            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(item.FLIQUIDACI != null ? item.FLIQUIDACI : "");
            row.createCell(1).setCellValue(item.MERCHAND != null ? item.MERCHAND : "");
            row.createCell(2).setCellValue(item.LIQUIDACIO != null ? item.LIQUIDACIO : "");
            row.createCell(3).setCellValue(item.MONEDA != null ? item.MONEDA : "");

            Cell amountCell = row.createCell(4);
            amountCell.setCellValue(item.TOTAL);
            amountCell.setCellStyle(styles.get("number"));

            Cell amountCell1 = row.createCell(5);
            amountCell1.setCellValue(item.COMISION);
            amountCell1.setCellStyle(styles.get("number"));

            Cell amountCell2 = row.createCell(6);
            amountCell2.setCellValue(item.NETO);
            amountCell2.setCellStyle(styles.get("number"));

            row.createCell(7).setCellValue(item.MONEDAPAGO != null ? item.MONEDAPAGO : "");

            Cell amountCell3 = row.createCell(8);
            amountCell3.setCellValue(item.IMPORTEPAG);
            amountCell3.setCellStyle(styles.get("number"));

        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void createSettlementSheet(SXSSFWorkbook workbook, List<MPF060> data, Map<String, CellStyle> styles) {
        Sheet sheet = workbook.createSheet("Settlements");

        String[] headers = {"Curr", "Total", "Comision", "Comistota", "Neto", "Curr", "Im. Pag", "Status", "Liquidation Date", "Liquidation", "Merchand", "Cod"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        int totalRows = data.size();
        int chunkSize = 10000;
        System.out.println("Procesando " + totalRows + " settlements en chunks de " + chunkSize);

        for (int chunkStart = 0; chunkStart < totalRows; chunkStart += chunkSize) {
            int chunkEnd = Math.min(chunkStart + chunkSize, totalRows);

            for (int i = chunkStart; i < chunkEnd; i++) {
                MPF060 item = data.get(i);
                Row row = sheet.createRow(i + 1);

                row.createCell(0).setCellValue(item.SCURRENCY != null ? item.SCURRENCY : "");

                Cell amountCell = row.createCell(1);
                amountCell.setCellValue(item.TOTAL);
                amountCell.setCellStyle(styles.get("number"));

                Cell amountCell2 = row.createCell(2);
                amountCell2.setCellValue(item.COMISION);
                amountCell2.setCellStyle(styles.get("number"));

                Cell amountCell3 = row.createCell(3);
                amountCell3.setCellValue(item.COMISTOTA);
                amountCell3.setCellStyle(styles.get("number"));

                Cell amountCell4 = row.createCell(4);
                amountCell4.setCellValue(item.NETO);
                amountCell4.setCellStyle(styles.get("number"));

                row.createCell(5).setCellValue(item.MONEDAPAGO != null ? item.MONEDAPAGO : "");

                Cell amountCell5 = row.createCell(6);
                amountCell5.setCellValue(item.IMPORTEPAG);
                amountCell5.setCellStyle(styles.get("number"));

                row.createCell(7).setCellValue(item.STVAL != null ? item.STVAL : "");
                row.createCell(8).setCellValue(item.ADATE != null ? item.ADATE : "");
                row.createCell(9).setCellValue(item.LIQUIDACIO != null ? item.LIQUIDACIO : "");
                row.createCell(10).setCellValue(item.MERCHAND != null ? item.MERCHAND : "");
                row.createCell(11).setCellValue(item.CODPRO != null ? item.CODPRO : "");

            }

            if (chunkStart % 50000 == 0) {
                System.out.println("  Procesados " + chunkEnd + " de " + totalRows + " settlements");
            }
        }

        for (int i = 0; i < Math.min(headers.length, 8); i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void createDiscountSheet(SXSSFWorkbook workbook, List<MPF091> data, Map<String, CellStyle> styles) {
        Sheet sheet = workbook.createSheet("Discounts");

        String[] headers = {"Curr", "Import", "Curr", "Im. Pag", "Liquidation Date", "Liquidation", "Merchant", "Cod"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        int rowIdx = 1;

        for (MPF091 item : data) {
            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(item.MONEDA != null ? item.MONEDA : "");

            Cell amountCell = row.createCell(1);
            amountCell.setCellValue(item.IMPORTECeba);
            amountCell.setCellStyle(styles.get("number"));

            row.createCell(2).setCellValue(item.MONEDAPAGO != null ? item.MONEDAPAGO : "");

            Cell amountCell1 = row.createCell(3);
            amountCell1.setCellValue(item.IMPORTEPAG);
            amountCell1.setCellStyle(styles.get("number"));

            row.createCell(4).setCellValue(item.FLIQUIDACI != null ? item.FLIQUIDACI : "");
            row.createCell(5).setCellValue(item.LIQUIDACIO != null ? item.LIQUIDACIO : "");
            row.createCell(6).setCellValue(item.MERCHAND != null ? item.MERCHAND : "");
            row.createCell(7).setCellValue(item.CODPRO != null ? item.CODPRO : "");

        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void createSalesSheet(SXSSFWorkbook workbook, List<MPF100C> data, Map<String, CellStyle> styles) {
        Sheet sheet = workbook.createSheet("Sales");

        String[] headers = {"Ticket", "Agent", "Country", "Authorization", "Card Number", "Sale Date", "Currency", "Amount", "Currency", "Amount"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        int rowIdx = 1;
        for (MPF100C item : data) {
            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(item.TKT != null ? item.TKT : "");
            row.createCell(1).setCellValue(item.SAGENT != null ? item.SAGENT : "");
            row.createCell(2).setCellValue(item.SCOUNTRY != null ? item.SCOUNTRY : "");
            row.createCell(3).setCellValue(item.SAUTHOC != null ? item.SAUTHOC : "");
            row.createCell(4).setCellValue(item.SCARDN != null ? item.SCARDN : "");
            row.createCell(5).setCellValue(item.SDATE != null ? item.SDATE : "");
            row.createCell(6).setCellValue(item.SCURREVEN != null ? item.SCURREVEN : "");

            Cell amountCell = row.createCell(7);
            amountCell.setCellValue(item.SVFOP);
            amountCell.setCellStyle(styles.get("number"));

            row.createCell(8).setCellValue(item.SCURREVENCONVERT != null ? item.SCURREVENCONVERT : "");

            Cell amountCell1 = row.createCell(9);
            amountCell1.setCellValue(item.SVFOPCON);
            amountCell1.setCellStyle(styles.get("number"));

        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    @RequestMapping(value = "exportConciliationExcelReview", method = RequestMethod.POST)
    public void exportConciliationExcelReview(HttpServletRequest request, HttpServletResponse response) {
        processExcelExportReview(request, response, false);
    }

    @RequestMapping(value = "exportConciliationExcelReviewCompressed", method = RequestMethod.POST)
    public void exportConciliationExcelReviewCompressed(HttpServletRequest request, HttpServletResponse response) {
        processExcelExportReview(request, response, true);
    }

    private void processExcelExportReview(HttpServletRequest request, HttpServletResponse response, boolean compressed) {
        String fileName = "Conciliation_Review_Report_" + new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".xlsx";
        SXSSFWorkbook workbook = null;

        try {
            Gson gson = new Gson();

            String beanString = request.getParameter("beanString");
            MPF102Filter filter = gson.fromJson(beanString, MPF102Filter.class);

            Type listTypeBandoc = new TypeToken<List<MPF102>>() {}.getType();
            Type listTypeSettlement = new TypeToken<List<MPF060>>() {}.getType();
            Type listTypeDiscounts = new TypeToken<List<MPF091>>() {}.getType();
            Type listTypeSales = new TypeToken<List<MPF100C>>() {}.getType();
            Type listTypeHeader = new TypeToken<List<MPF083>>() {}.getType();

            List<MPF102> bandocList = gson.fromJson(request.getParameter("beanBandoc"), listTypeBandoc);
            List<MPF091> discountList = gson.fromJson(request.getParameter("beanDiscounts"), listTypeDiscounts);
            List<MPF100C> salesList = gson.fromJson(request.getParameter("beanSales"), listTypeSales);
            List<MPF083> headerList = gson.fromJson(request.getParameter("beanHeader"), listTypeHeader);

            List<MPF060> settlementList;
            if (compressed) {
                String compressedBase64 = request.getParameter("beanSettlementsCompressed");
                String settlementsJson = decompressGzipFromBase64(compressedBase64);
                settlementList = gson.fromJson(settlementsJson, listTypeSettlement);

                System.out.println("Excel Review export - Settlements descomprimidos: " + settlementList.size() + " registros");
            } else {
                settlementList = gson.fromJson(request.getParameter("beanSettlements"), listTypeSettlement);
            }

            workbook = new SXSSFWorkbook(100);

            Map<String, CellStyle> styles = createStyles(workbook);

            int sheetCount = 0;

            if (bandocList != null && !bandocList.isEmpty()) {
                createBandocSheet(workbook, bandocList, styles);
                sheetCount++;
            }

            if (settlementList != null && !settlementList.isEmpty()) {
                createSettlementSheet(workbook, settlementList, styles);
                sheetCount++;
            }

            if (discountList != null && !discountList.isEmpty()) {
                createDiscountSheet(workbook, discountList, styles);
                sheetCount++;
            }

            if (salesList != null && !salesList.isEmpty()) {
                createSalesSheet(workbook, salesList, styles);
                sheetCount++;
            }

            if (headerList != null && !headerList.isEmpty()) {
                createHeaderSheet(workbook, headerList, styles);
                sheetCount++;
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Expires", "0");

            workbook.write(response.getOutputStream());

            System.out.println("Excel Review generado: " + fileName
                    + " - Total hojas: " + sheetCount
                    + " - Settlements: " + (settlementList != null ? settlementList.size() : 0));

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                response.getWriter().write("Error generating Excel Review: " + e.getMessage());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        } finally {
            if (workbook != null) {
                workbook.dispose();
            }
        }
    }

   @RequestMapping(value = "searchCodeComision")
    public @ResponseBody String searchCodeComision(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- fetchCodeComision -----------");
        map.put("success", true);
        try {
            TemplateReconciliaCreditLogic logic = new TemplateReconciliaCreditLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            // Recibe el Map con las 3 listas
            Map<String, List<Map<String, String>>> result = logic.loadMPS610(); 
            map.put("result", result);
            
        } catch (Exception e) {
            map.put("success", false);
            map.put("message", e.getMessage());
        }
        return new Gson().toJson(map);
    }
    
}
