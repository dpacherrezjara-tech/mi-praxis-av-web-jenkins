package net.miatech.praxis.controllers.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.LoadConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
@RequestMapping("/SalesReconciliation")
public class SalesReconciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaDataSales = logic.loadPX263SQP00652(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaDataSales);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaDataSales);
                map.put("total", listaDataSales.size() > 0 ? listaDataSales.get(0).page.TOTROW : 0);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "/searchDebits")
    public @ResponseBody
    String searchDebits(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaDataSales = logic.loadPX263SQP00652DEBITS(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaDataSales);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaDataSales);
                map.put("total", listaDataSales.size() > 0 ? listaDataSales.get(0).page.TOTROW : 0);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "/searchDetCountry")
    public @ResponseBody
    String searchDetCountry(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00655(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetCardCode")
    public @ResponseBody
    String searchDetCardCode(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00656(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetDay")
    public @ResponseBody
    String searchDetDay(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00657(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00658(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchCashMonth")
    public @ResponseBody
    String searchCashMonth(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2370Filter> listaDataCash = logic.loadPX263SQP00899(filter);

            map.put("success", true);
            map.put("data", listaDataCash);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchCashCountry")
    public @ResponseBody
    String searchCashCountry(ModelMap map, HttpServletRequest request) {
        A2370Filter filter = new A2370Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaDataCash = logic.loadPX263SQP00900(filter);

            map.put("success", true);
            map.put("data", listaDataCash);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchCashDay")
    public @ResponseBody
    String searchCashDay(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaDataCash = logic.loadPX263SQP00901(filter);

            map.put("success", true);
            map.put("data", listaDataCash);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetTICKET")
    public @ResponseBody
    String searchDetTICKET(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP01960(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                List<A2290Filter> listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("lstDetTkyByStval", listaData);
                map.put("lstError", listaError);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "/searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            A2290Filter bean = logic.loadPX263SQP00659(filter);

            map.put("success", true);
            map.put("beanCons", bean);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    //Drill Down por Estado ****************************************************
    @RequestMapping(value = "/searchDetCountryByStval")
    public @ResponseBody
    String searchDetCountryByStval(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX263SQP00894(filter);
                }
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstDetError", listaError);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    //Drill Down por Estado ****************************************************
    @RequestMapping(value = "/searchDetCountryByStval_1")
    public @ResponseBody
    String searchDetCountryByStval_1(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchDetCountryByStval_REFND")
    public @ResponseBody
    String searchDetCountryByStval_REFND(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_REFND(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetCountryByStval_CHGBAK")
    public @ResponseBody
    String searchDetCountryByStval_CHGBAK(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_CHGBAK(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchDetCountryByStval_ACREDIT")
    public @ResponseBody
    String searchDetCountryByStval_ACREDIT(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_ACREDIT(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "/searchDetCountryByStval_DEBITS")
    public @ResponseBody
    String searchDetCountryByStval_DEBITS(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00676_DEBITS(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    //Drill Down por Estado ****************************************************
    @RequestMapping(value = "/searchDetCardCodeByStval")
    public @ResponseBody
    String searchDetCardCodeByStval(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00677(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX263SQP00894(filter);
                }

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstDetError", listaError);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    //searchDetCardCodeByStval_Pay
    //Drill Down por Estado ****************************************************
    @RequestMapping(value = "/searchDetDayByStval")
    public @ResponseBody
    String searchDetDayByStval(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00678(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX263SQP00894(filter);
                }

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstDetError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    //searchDetDayByStval_Pay
    @RequestMapping(value = "/searchDetTktByStval")
    public @ResponseBody
    String searchDetTktByStval(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "/searchDetTktByStval_REFND")
    public @ResponseBody
    String searchDetTktByStval_REFND(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_REFND(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "/searchDetTktByStval_CHGBAK")
    public @ResponseBody
    String searchDetTktByStval_CHGBAK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_CHGBAK(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "/searchDetTktByStval_ACREDIT")
    public @ResponseBody
    String searchDetTktByStval_ACREDIT(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_ACREDIT(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "/searchDetByStval_DEBITS")
    public @ResponseBody
    String searchDetByStval_DEBITS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        List<A2290Filter> listaError = new ArrayList<A2290Filter>();
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP00715_DEBITS(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
//                listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
//                map.put("lstError", listaError);
            }

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }
    
    @RequestMapping(value = "/searchByPNR")
    public @ResponseBody
    String searchByPNR(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP03986(filter);

            map.put("success", true);
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
    @RequestMapping(value = "/searchBySAGENT")
    public @ResponseBody
    String searchBySAGENT(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP05116(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            }

//            map.put("success", true);
//            map.put("lstDetTkyByStval", listaData);
//            map.put("lstError", listaError);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "/searchWarnTkts")
    public @ResponseBody
    String searchWarnTkts(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2290Filter> listaData = logic.loadPX263SQP00817(filter);

            map.put("success", true);
            map.put("lstWarnTkt", listaData);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetTARJETA")
    public @ResponseBody
    String searchDetTARJETA(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP01828(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                List<A2290Filter> listaData = hmResultado.get("TKT");
                List<A2290Filter> listaError = hmResultado.get("ERROR");
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
                map.put("lstError", listaError);
            }

//            map.put("success", true);
//            map.put("lstDetTkyByStval", listaData);
//            map.put("lstError", listaError);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "/searchDetMERCHAT")
    public @ResponseBody
    String searchDetMERCHAT(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX263SQP01976(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A2290Filter> listaData = hmResultado.get("TKT");
                List<A2290Filter> listaError = hmResultado.get("ERROR");

                map.put("success", true);
                map.put("lstDetTkyByStval", listaData);
                map.put("lstError", listaError);
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return (dw_excel) ? null : (new Gson().toJson(map));
    }

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        filter = new A2560Filter();
//        
//        String fileNameDownload = String.format("ADM Reasons - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        
//        try {
//            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            
//            String beanString = request.getParameter("beanString");
//            filter = new Gson().fromJson(beanString, filter.getClass());
//            filter.page.TOTROW = -1;
//            filter.page.START = 0;
//            filter.page.LIMIT = 0;
//            
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            
//            logic = new ADMReasonsLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            List<A2560Filter> listaData = logic.SearchADMReasons(filter);
//
//            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("ADM Reasons");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
////            CellStyle headerStyle = workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
////            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            // </editor-fold>
//
//            Integer vi = 0;
//            Integer vj = 0;
//            Iterator iter = listaData.iterator();
//
//            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Cust");
//            Cell CH1_01 = row.createCell(1);
//            CH1_01.setCellValue("Cod.Razon");
//            Cell CH1_02 = row.createCell(2);
//            CH1_02.setCellValue("Family");
//            Cell CH1_03 = row.createCell(3);
//            CH1_03.setCellValue("Comment");
//
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 7));
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//
//            ++vj;
//            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            CH2_03.setCellValue("Relation");
//            Cell CH2_04 = row2.createCell(4);
//            CH2_04.setCellValue("Description");
//            Cell CH2_05 = row2.createCell(5);
//            CH2_05.setCellValue("Des.English");
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Des.Portuguese");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Des.French");
//
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));
//
//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);
//
//            ++vj;
//            // </editor-fold>
//            
//            while (iter.hasNext()) {
//                row = sheet.createRow(vj);
//                
//                // <editor-fold defaultstate="collapsed" desc="Iterativo">
//                Cell cell50 = row.createCell(0);
//                Cell cell51 = row.createCell(1);
//                Cell cell52 = row.createCell(2);
//                Cell cell53 = row.createCell(3);
//                Cell cell54 = row.createCell(4);
//                Cell cell55 = row.createCell(5);
//                Cell cell56 = row.createCell(6);
//                Cell cell57 = row.createCell(7);
//
//                cell50.setCellValue(listaData.get(vi).A2560CCUST);
//                cell51.setCellValue(listaData.get(vi).A2560CODRZ);
//                cell52.setCellValue(listaData.get(vi).A2560FAMIL);
//                cell53.setCellValue(listaData.get(vi).A2560COMRE);
//                cell54.setCellValue(listaData.get(vi).A2560COMES);
//                cell55.setCellValue(listaData.get(vi).A2560COMEN);
//                cell56.setCellValue(listaData.get(vi).A2560COMPO);
//                cell57.setCellValue(listaData.get(vi).A2560COMFR);
//
//                cell50.setCellStyle(bodyStyle);
//                cell51.setCellStyle(bodyStyle);
//                cell52.setCellStyle(bodyStyle);
//                cell53.setCellStyle(bodyStyle);
//                cell54.setCellStyle(bodyStyle);
//                cell55.setCellStyle(bodyStyle);
//                cell56.setCellStyle(bodyStyle);
//                cell57.setCellStyle(bodyStyle);
//
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                // </editor-fold>
//                
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new SpringException(e);
//        }
//    }
    
    
    
    @RequestMapping(value = "sendEmail")
    public @ResponseBody
    String sendEmail(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- DataRequestedByBank : sendEmail-------------");
        Gson gson = new Gson();
        String fecha = "",fecha_des="";
        
        MPF100Filter obj = new MPF100Filter();
        boolean iboolean;
        String msj = "";
        
        List<MPF100Filter> listaData;
        List<MPF106Filter> listaDataCorreos = new ArrayList<MPF106Filter>(0);;
        
        try {
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            fecha = request.getParameter("v_fecha");
            if(!fecha.equals("")){
            
                fecha_des =  Functions.getAbreviaturaMes(fecha.substring(4))+ " " + fecha.substring(0, 4);
                obj.IN_FECHA = fecha;
                listaDataCorreos = logic.loadPX263getCorreosAV(obj);

                if(listaDataCorreos.size()>0){

                    int contIatas = 0;
                    for (int j = 0; j < listaDataCorreos.size(); j++) {
                        String correos = ((MPF106Filter)listaDataCorreos.get(j)).EMAILS;
                        String agent = ((MPF106Filter)listaDataCorreos.get(j)).CAGENCY;
                        String agent_name = ((MPF106Filter)listaDataCorreos.get(j)).NAMEA;

                        obj.IN_AGENT = agent;
                        //Obtiene la lista de aclaraciones de esa fecha
                        listaData = logic.loadPX263SQP00XXXJT(obj);

                        String ruta_file = obtenerExcel(listaData,agent_name);


                        //CODIGO DE MAIL Y SU ATTACHMENT
                        ProMail proMail = new ProMail();
                        List<String> receptores = new ArrayList<String>();
                        List<String> adjuntos = new ArrayList<String>();

                        if(!ruta_file.equals("")){
                            adjuntos.add(ruta_file);
                        }
                        // Emails CC
                        List<String> CC = new ArrayList<String>();
                        List<String> Ccp = new ArrayList<String>();
//                        String correosCopia = "luis.miranda@avianca.com;carlos.miranda@avianca.com;jacquelinne.diaz@avianca.com";
                        String correosCopia = "jtorres@miatech.net";
                        String correosOcultos = "larango@miatech.net;eneves@miatech.net;jtorres@miatech.net;jsolano@miatech.net";
//                        String emisor = "jtorres@miatech.net";


//                        receptores.add(correos);
                        
                        /*Correo Destino*/
                        if (!correos.trim().equals("")) {
                            String[] partsTo = correos.split(";");
                            for (int h = 0; h < partsTo.length; h++) {
                                receptores.add(partsTo[h]);
                            }
                        }
                        
                        /*Correo Copia*/
                        if (!correosCopia.trim().equals("")) {
                            String[] partsTo = correosCopia.split(";");
                            for (int h = 0; h < partsTo.length; h++) {
                                CC.add(partsTo[h]);
                            }
                        }
                        
                        /*Correo oculto*/
                        if (!correosOcultos.trim().equals("")) {
                            String[] parts = correosOcultos.split(";");
                            for (int i = 0; i < parts.length; i++) {
                                Ccp.add(parts[i]);
                            }
                        }
                        String asunto = "Gestión de inconsistencias en conciliación de ventas en Tarjetas de Crédito  " + Functions.getFechaActual();
                        String mensaje = "<p>Estimados miembros de agencia de viajes:</p>\n" +
                        "<p>Les brindamos inicialmente un cordial saludo</p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Continuando con nuestro proceso de conciliaci&oacute;n de pagos de tiquetes con forma de pago tarjeta de cr&eacute;dito, adjuntamos los tiquetes "+
                        "definitivos pendientes de pago que corresponden a las ventas realizadas con tarjeta de cr&eacute;dito por su Agencia en el mes "+
                        "de <strong><strong>"+fecha_des+"</strong></strong><strong><strong>&nbsp;</strong></strong>y hemos encontrado diferencias entre el valor facturado por ustedes y "+
                        "el valor ingresado en nuestras cuentas bancarias (total resaltado en color amarillo),&nbsp;por lo cual de manera muy respetuosa solicitamos a ustedes enviarnos "+
                        "la informaci&oacute;n correspondiente al n&uacute;mero de autorizaci&oacute;n, as&iacute; como la fecha de expedici&oacute;n de &eacute;ste y el "+
                        "valor<strong><strong>&nbsp;</strong></strong><strong><strong>EXACTO</strong></strong>&nbsp;del pago, esto con el fin de corroborar esta informaci&oacute;n y "+
                        "realizar una correcta conciliaci&oacute;n.</p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Luego, si da a lugar solicitaremos el soporte de pago.</p>\n" +
                        "<p><strong><strong>&nbsp;</strong></strong></p>\n" +
                        "<p><strong><strong>FAVOR DILIGENCIAR LOS DATOS EN EL MISMO FORMATO </strong></strong>y responder al "+
                        "correo&nbsp;<a href=\"mailto:conciliacionventastc@avianca.com\"><u>conciliacionventastc@avianca.com</u></a>&nbsp;con copia "+
                        "a: <a href=\"mailto:cheryd.quintero@avianca.com\"><u>cheryd.quintero@avianca.com</u></a>&nbsp;"+
                        "<a href=\"mailto:jose.higuera@avianca.com\"><u>jose.higuera@avianca.com</u></a>&nbsp;<a href=\"mailto:monica.zuluaga@avianca.com\"><u>monica.zuluaga@avianca.com</u></a>"+
                        "&nbsp;<a href=\"mailto:carlos.jaimes@avianca.com\"><u>carlos.jaimes@avianca.com</u></a>. D<strong><strong>e encontrar tiquetes los cuales no hayan "+
                        "sido cancelados, solicitamos su legalizaci&oacute;n de forma inmediata mediante&nbsp;la confirmaci&oacute;n del cobro mediante BSP - nota de cargo respondiendo en este "+
                        "mismo correo.</strong></strong></p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Muchas gracias y quedamos atentos a su respuesta,&nbsp;la cual agradezco sea <strong><strong>enviada dentro de los pr&oacute;ximos 3 "+
                        "d&iacute;as h&aacute;biles</strong></strong><strong><strong>,</strong></strong><strong><strong>&nbsp;</strong></strong>esto con el fin de estar al "+
                        "d&iacute;a con las auditor&iacute;as, caso contrario se entender&aacute; que las transacciones est&aacute;n <strong><strong>pendientes de pago y se "+
                        "elaborar&aacute; la respectiva nota de cargo.&nbsp;</strong></strong></p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Como informaci&oacute;n general y con el fin de evitar reprocesos de ambas partes,&nbsp;antes de enviar la respuesta definitiva&nbsp;en cuanto a los "+
                        "soportes&nbsp;de pago de los tiquetes solicitados, agradecemos que la agencia tenga en cuenta las siguientes recomendaciones:</p>\n" +
                        "<ul>\n" +
                        "<li>Revisar que los voucher que env&iacute;an como soporte de pago sean direccionados a Avianca y si por error no fue as&iacute;,&nbsp;aprobar el "+
                        "ADM y solicitar la nota de abono a la aerol&iacute;nea a la cual fue direccionado el pago.</li>\n" +
                        "<li>No se pueden aceptar pagos diferentes a la fecha de la expedici&oacute;n del tiquete m&aacute;ximo al d&iacute;a siguiente,&nbsp;no se aceptar&aacute;n pagos "+
                        "del mes posterior o anterior.</li>\n" +
                        "<li>Que los valores de los voucher coincidan con el valor total de los tiquetes.</li>\n" +
                        "<li>Los dat&aacute;fonos de Credibanco no pueden recibir Master Card,&nbsp;solo se hacen a trav&eacute;s de Redeban,&nbsp;para estos casos revisar en sus "+
                        "extractos ya que la franquicia abona estas transacciones a la agencia y por consiguiente tambi&eacute;n se generar&iacute;a la nota de cargo por los tiquetes "+
                        "que est&eacute;n amparados por estas transacciones.</li>\n" +
                        "<li>Cuando se comente un error al expedir una MPD o tiquete,&nbsp;no existe otra soluci&oacute;n que generar&nbsp;la ADM&nbsp;a la agencia ya que no se pueden "+
                        "alterar los valores en Rapid a no ser que sean detectados el mismo d&iacute;a para que sean corregidos por la agencia,&nbsp;de lo contrario se debe cancelar "+
                        "la ADM y solicitar el reembolso y/o ACM seg&uacute;n corresponda.</li>\n" +
                        "<li>Verificar que&nbsp;los soportes que env&iacute;an no&nbsp;hayan presentado anulaci&oacute;n no satisfactoria,&nbsp;porque de ser as&iacute; no se pueden "+
                        "tomar para cancelar tiquetes pendientes y por ende se genera la nota de cargo.</li>\n" +
                        "</ul>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Cordial saludo,</p>\n"+
                        "<img src=\"cid:logo\" />";
                        iboolean = proMail.enviaCorreoAV("", asunto, receptores, CC ,Ccp, mensaje, adjuntos,this.serverSession.getServerSession());

                        if (iboolean) {
                            //resp.info.add("Email Sent.");
                            contIatas +=1;
                            msj += " Email Sent" ;
                        } else {
                            //resp.info.add("Could not send email!");
                            msj += " Could not send email " ;
                        }

                        /*Eliminamos archivo temporal*/
                        File file = new File(ruta_file);
                        if (file.exists()) {
                            file.delete();
                        }

                    }

                    msj  = contIatas + " Email Sent." ;

                }else{
                    msj = "No existe información para enviar.";
                }
                
            }else{
                msj = "No se selecciono fecha.";
            }

            map.put("msj", msj);
            map.put("success", true);
        } catch (Exception ex) {
            logError.error("An error ocurred, pleas try again later.");
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    
    
    public String obtenerExcel(List<MPF100Filter> listaData, String agent_name) {
        
        DecimalFormat df = new DecimalFormat("#,###,###.00");
        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');
        df.setDecimalFormatSymbols(otherSymbols);
        
        
        String fileNameDownload = String.format("ADMs - "+agent_name+" -"+ Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String ruta ="";
        try {
            ruta = "C:\\Dumps\\"+fileNameDownload;
            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
            File file = new File(ruta);
            
            

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ADMs");
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
            bodyStyle.setAlignment(CellStyle.ALIGN_CENTER);
            // </editor-fold>

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Estado");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("IATA");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("DIG IATA");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("AGENCIA");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("TIQUETE");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("TIPO");
            Cell CH1_06 = row.createCell(6);
            CH1_06.setCellValue("FECHA VENTA");
            Cell CH1_07 = row.createCell(7);
            CH1_07.setCellValue("TARJETA CREDITO");
            Cell CH1_08 = row.createCell(8);
            CH1_08.setCellValue("AUT");
            Cell CH1_09 = row.createCell(9);
            CH1_09.setCellValue("VALOR");
            /**/
            Cell CH1_10 = row.createCell(10);
            CH1_10.setCellValue("FECHA");
            Cell CH1_11 = row.createCell(11);
            CH1_11.setCellValue("AUTORIZACION");
            Cell CH1_12 = row.createCell(12);
            CH1_12.setCellValue("VALOR");
            Cell CH1_13 = row.createCell(13);
            CH1_13.setCellValue("OBSERVACIONES");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));
            
            
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
        
            /***********************/
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
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
            
//            Row row2 = sheet.createRow(vj);
//
//            Cell CH2_00 = row2.createCell(0);
//            Cell CH2_01 = row2.createCell(1);
//            Cell CH2_02 = row2.createCell(2);
//            Cell CH2_03 = row2.createCell(3);
//            Cell CH2_04 = row2.createCell(4);
//            Cell CH2_05 = row2.createCell(5);
//            Cell CH2_06 = row2.createCell(6);
//            Cell CH2_07 = row2.createCell(7);
//            Cell CH2_08 = row2.createCell(8);
//            Cell CH2_09 = row2.createCell(9);
//            Cell CH2_10 = row2.createCell(10);
//            Cell CH2_11 = row2.createCell(11);
//            Cell CH2_12 = row2.createCell(12);
//            Cell CH2_13 = row2.createCell(13);

//            CH2_03.setCellValue("Relation");
//            Cell CH2_04 = row2.createCell(4);
//            CH2_04.setCellValue("Description");
//            Cell CH2_05 = row2.createCell(5);
//            CH2_05.setCellValue("Des.English");
//            Cell CH2_06 = row2.createCell(6);
//            CH2_06.setCellValue("Des.Portuguese");
//            Cell CH2_07 = row2.createCell(7);
//            CH2_07.setCellValue("Des.French");

//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 7));

//            CH2_00.setCellStyle(headerStyle);
//            CH2_01.setCellStyle(headerStyle);
//            CH2_02.setCellStyle(headerStyle);
//            CH2_03.setCellStyle(headerStyle);
//            CH2_04.setCellStyle(headerStyle);
//            CH2_05.setCellStyle(headerStyle);
//            CH2_06.setCellStyle(headerStyle);
//            CH2_07.setCellStyle(headerStyle);
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(2, true);
//            sheet.autoSizeColumn(3, true);
//            sheet.autoSizeColumn(4, true);
//            sheet.autoSizeColumn(5, true);
//            sheet.autoSizeColumn(6, true);
//            sheet.autoSizeColumn(7, true);

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

                cell50.setCellValue(listaData.get(vi).STVAL);
                cell51.setCellValue(listaData.get(vi).SAGENT);
                cell52.setCellValue(listaData.get(vi).DIG_AGENT);
                cell53.setCellValue(listaData.get(vi).strDescripcion);
                cell54.setCellValue(listaData.get(vi).CCIA+listaData.get(vi).FORMA + listaData.get(vi).SERIE);
                cell55.setCellValue("");
                cell56.setCellValue(listaData.get(vi).SDATE);
                cell57.setCellValue(listaData.get(vi).SCARDN);
                cell58.setCellValue(listaData.get(vi).SAUTHOC);
                cell59.setCellValue(df.format(listaData.get(vi).SVFOP));
                cell60.setCellValue("");
                cell61.setCellValue("");
                cell62.setCellValue("");
                cell63.setCellValue("");

                
                
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

                /***********************/
//                sheet.autoSizeColumn(0, true);
//                sheet.autoSizeColumn(1, true);
//                sheet.autoSizeColumn(2, true);
//                sheet.autoSizeColumn(3, true);
//                sheet.autoSizeColumn(4, true);
//                sheet.autoSizeColumn(5, true);
//                sheet.autoSizeColumn(6, true);
//                sheet.autoSizeColumn(7, true);
//                sheet.autoSizeColumn(8, true);
//                sheet.autoSizeColumn(9, true);
//                sheet.autoSizeColumn(10, true);
//                sheet.autoSizeColumn(11, true);
//                sheet.autoSizeColumn(12, true);
//                sheet.autoSizeColumn(13, true);
                // </editor-fold>
                
                iter.next();
                ++vi;
                ++vj;
            }
                
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
                
            // Escritura del contenido en el archivo Excel
       
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();

        } catch (Exception e) {
            ruta="";
            e.printStackTrace();
            throw new SpringException(e);
        }
        
        return ruta;
    }

}
