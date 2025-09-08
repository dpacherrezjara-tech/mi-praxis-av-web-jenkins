package net.miatech.praxis.controllers.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.BankReconciliationLogic;
import net.miatech.praxis.logic.payments.LoadConciliationLogic;
import net.miatech.praxis.logic.payments.StatementReconciliationsLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

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
    
    private StatementReconciliationsLogic logic;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;
    

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

    @RequestMapping(value = "/searchCore")
    public @ResponseBody
    String searchCore(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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
            List<A2290Filter> listaDataSales = logic.loadPX263SQP00652CORE(filter);

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

    @RequestMapping(value = "/searchIBT")
    public @ResponseBody
    String searchIBT(ModelMap map, HttpServletRequest request) {
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
            List<A2290Filter> listaData = logic.loadPX263SQP00658_IBT(filter);

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
            A2290Filter bean = new A2290Filter();
            logic.setSession(this.serverSession.getServerSession());
            if (filter.DATABASE.equals("MPF100")) {
                bean = logic.loadPX263SQP00659(filter);
            } else if (filter.DATABASE.equals("MPF075")) {
                bean = logic.loadPX263SQP00659_REFND(filter);
            } else if (filter.DATABASE.equals("MPF076")) {
                bean = logic.loadPX263SQP00659_CHGBAK(filter);
            } else if (filter.DATABASE.equals("MPF077")) {
                bean = logic.loadPX263SQP00659_ACREDIT(filter);
            }

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

    @RequestMapping(value = "/searchDetail_REFND")
    public @ResponseBody
    String searchDetail_REFND(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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
            hmResultado = logic.loadPX263SQP01828_REFND(filter);

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

    @RequestMapping(value = "/searchDetail_CHGBAK")
    public @ResponseBody
    String searchDetail_CHGBAK(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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
            hmResultado = logic.loadPX263SQP01828_CHGBAK(filter);

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

    @RequestMapping(value = "/searchDetail_ACREDIT")
    public @ResponseBody
    String searchDetail_ACREDIT(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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
            hmResultado = logic.loadPX263SQP01828_ACREDIT(filter);

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

    @RequestMapping(value = "/searchDetail_ALLDEBITS")
    public @ResponseBody
    String searchDetail_ALLDEBITS(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
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
            hmResultado = logic.loadPX263SQP01828_ALLDEBITS(filter);

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

    @RequestMapping(value = "/obtainMessagesDT")
    public @ResponseBody
    String obtainMessagesDT(ModelMap map, HttpServletRequest request) {
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";
        List<A2290Filter> lst = new ArrayList<>(0);
        try {
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP05103_DEBITYPE(filter);

            map.put("success", true);
            System.out.println("Total : " + lst.size());
            map.put("data", lst);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
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
    
    @RequestMapping(value = "MaintenanceMPF100")
    public @ResponseBody
    String MaintenanceMPF060(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- statement reconciliations : MaintenanceMPF100-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String msj = "";
        String beanString = "";

        try {
            option = request.getParameter("option");
            filter.TKT = request.getParameter("TKT");
            filter.TDOC = request.getParameter("TDOC");
            filter.SCARDNCOR = request.getParameter("SCARDNCOR");
            filter.SAUTHOC = request.getParameter("SAUTHOC");
            filter.CERROR = request.getParameter("CERROR");
            
           
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX263SQP01976MPF100_UPDATE(filter, option);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSX");
        A2290Filter filter = new A2290Filter();
        String fileNameDownload = String.format("Report Sales By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = logic.loadPX263SQP00652(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);

            CH1_0.setCellValue("Sales");
            CH1_1.setCellValue("Reconciliation By Ticket");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 8));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Match");
            CH2_5.setCellValue("Ticket");
            CH2_6.setCellValue("Total");
            CH2_7.setCellValue("Accounted");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));

            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);

            CH3_1.setCellValue("Auto");
            CH3_2.setCellValue("%");
            CH3_3.setCellValue("Manual");
            CH3_4.setCellValue("Diff");
            CH3_5.setCellValue("w/o Sett.");
            CH3_6.setCellValue("Tkt");
            CH3_7.setCellValue("Processed");
            CH3_8.setCellValue("Pending");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).lngQMATCH);
                rcell2.setCellValue(Double.parseDouble(String.format("%2.2f", listaData.get(vi).lngQMATCHPercent)));
                rcell3.setCellValue(listaData.get(vi).lngQMANUAL);
                rcell4.setCellValue(listaData.get(vi).lngQDIFF);
                rcell5.setCellValue(listaData.get(vi).lngQPEND);
                rcell6.setCellValue(listaData.get(vi).lngQSALES);
                rcell7.setCellValue(listaData.get(vi).lngQPOLIC);
                rcell8.setCellValue(listaData.get(vi).lngQPOLIPE);
                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
            Row rowTotal = sheet.createRow(vj);
            Cell CH1_0_T = rowTotal.createCell(0);
            Cell CH1_1_T = rowTotal.createCell(1);
            Cell CH1_2_T = rowTotal.createCell(2);
            Cell CH1_3_T = rowTotal.createCell(3);
            Cell CH1_4_T = rowTotal.createCell(4);
            Cell CH1_5_T = rowTotal.createCell(5);
            Cell CH1_6_T = rowTotal.createCell(6);
            Cell CH1_7_T = rowTotal.createCell(7);
            Cell CH1_8_T = rowTotal.createCell(8);

            CH1_0_T.setCellValue("Total");
            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
            CH1_2_T.setCellValue(Double.parseDouble(String.format("%2.2f", listaData.get(0).lngTotQMATCHPercent)));
            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);

            CH1_0_T.setCellStyle(totalStyle);
            CH1_1_T.setCellStyle(totalStyle);
            CH1_2_T.setCellStyle(totalStyle);
            CH1_3_T.setCellStyle(totalStyle);
            CH1_4_T.setCellStyle(totalStyle);
            CH1_5_T.setCellStyle(totalStyle);
            CH1_6_T.setCellStyle(totalStyle);
            CH1_7_T.setCellStyle(totalStyle);
            CH1_8_T.setCellStyle(totalStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);
            sheet.autoSizeColumn(6, true);
            sheet.autoSizeColumn(7, true);
            sheet.autoSizeColumn(8, true);

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSXDetalle")
    public @ResponseBody
    void getXLSXDetalle(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXDetalle");
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        String fileNameDownload = String.format("Report Sales By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            String tabMPF = filter.TabMPF;
            if (tabMPF.equals("MPF100")) {
                hmResultado = logic.loadPX263SQP01828(filter);
            } else if (tabMPF.equals("MPF075")) {
                hmResultado = logic.loadPX263SQP01828_REFND(filter);
            } else if (tabMPF.equals("MPF076")) {
                hmResultado = logic.loadPX263SQP01828_CHGBAK(filter);
            } else if (tabMPF.equals("MPF077")) {
                hmResultado = logic.loadPX263SQP01828_ACREDIT(filter);
            } else if (tabMPF.equals("DEBITS")) {
                hmResultado = logic.loadPX263SQP01828_ALLDEBITS(filter);
            }
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = hmResultado.get("TKT");
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            if (listaData.size() < 65000) {
                workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Report");
                XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
                headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
                headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
                headerStyle.setFont(headerFont);
                totalStyle.setBorderRight(CellStyle.BORDER_THIN);
                totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
                totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
                totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderTop(CellStyle.BORDER_THIN);
                totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
                totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
                totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
                totalStyle.setFont(headerFont);
                bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
                bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
                bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
                bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
                bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                Integer vi = 0;
                Integer vj = 0; //Almacena el numero de fila
                Iterator iter = listaData.iterator();
                // ====== CREANDO TITULOS ======================================

                // ======  Nivel 1 ==========
                Row row1 = sheet.createRow(vj);
                Cell CH1_0 = row1.createCell(0);
                Cell CH1_1 = row1.createCell(1);
                Cell CH1_2 = row1.createCell(2);
                Cell CH1_3 = row1.createCell(3);
                Cell CH1_4 = row1.createCell(4);
                Cell CH1_5 = row1.createCell(5);
                Cell CH1_6 = row1.createCell(6);
                Cell CH1_7 = row1.createCell(7);
                Cell CH1_8 = row1.createCell(8);
                Cell CH1_9 = row1.createCell(9);
                Cell CH1_10 = row1.createCell(10);
                Cell CH1_11 = row1.createCell(11);
                Cell CH1_12 = row1.createCell(12);
                Cell CH1_13 = row1.createCell(13);
                Cell CH1_14 = row1.createCell(14);
                Cell CH1_15 = row1.createCell(15);
                Cell CH1_16 = row1.createCell(16);
                Cell CH1_17 = row1.createCell(17);

                CH1_0.setCellValue("Ticket");
                CH1_1.setCellValue("Type");
                CH1_2.setCellValue("Deb. Type");
                CH1_3.setCellValue("Comment/Adj.Type");
                CH1_4.setCellValue("Src");
                CH1_5.setCellValue("Sales Date");
                CH1_6.setCellValue("Country");
                CH1_7.setCellValue("Cc. Code");
                CH1_8.setCellValue("Card Number");
                CH1_9.setCellValue("Author. Code");
                CH1_10.setCellValue("Curr.");
                CH1_11.setCellValue("Amount");
                CH1_12.setCellValue("PNR");
                CH1_13.setCellValue("Agent");
                CH1_14.setCellValue("ADM Number");
                CH1_15.setCellValue("Tran. Code");
                CH1_16.setCellValue("Days");
                CH1_17.setCellValue("Status");

                CH1_0.setCellStyle(headerStyle);
                CH1_1.setCellStyle(headerStyle);
                CH1_2.setCellStyle(headerStyle);
                CH1_3.setCellStyle(headerStyle);
                CH1_4.setCellStyle(headerStyle);
                CH1_5.setCellStyle(headerStyle);
                CH1_6.setCellStyle(headerStyle);
                CH1_7.setCellStyle(headerStyle);
                CH1_8.setCellStyle(headerStyle);
                CH1_9.setCellStyle(headerStyle);
                CH1_10.setCellStyle(headerStyle);
                CH1_11.setCellStyle(headerStyle);
                CH1_12.setCellStyle(headerStyle);
                CH1_13.setCellStyle(headerStyle);
                CH1_14.setCellStyle(headerStyle);
                CH1_15.setCellStyle(headerStyle);
                CH1_16.setCellStyle(headerStyle);
                CH1_17.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
                ++vj;
                //============================================
                while (iter.hasNext()) {
                    row1 = sheet.createRow(vj);
                    Cell rcell0 = row1.createCell(0);
                    Cell rcell1 = row1.createCell(1);
                    Cell rcell2 = row1.createCell(2);
                    Cell rcell3 = row1.createCell(3);
                    Cell rcell4 = row1.createCell(4);
                    Cell rcell5 = row1.createCell(5);
                    Cell rcell6 = row1.createCell(6);
                    Cell rcell7 = row1.createCell(7);
                    Cell rcell8 = row1.createCell(8);
                    Cell rcell9 = row1.createCell(9);
                    Cell rcell10 = row1.createCell(10);
                    Cell rcell11 = row1.createCell(11);
                    Cell rcell12 = row1.createCell(12);
                    Cell rcell13 = row1.createCell(13);
                    Cell rcell14 = row1.createCell(14);
                    Cell rcell15 = row1.createCell(15);
                    Cell rcell16 = row1.createCell(16);
                    Cell rcell17 = row1.createCell(17);

                    rcell0.setCellValue(listaData.get(vi).strTicket);
                    rcell1.setCellValue(listaData.get(vi).strPEM);
                    rcell2.setCellValue(listaData.get(vi).TYPE);
                    rcell3.setCellValue(listaData.get(vi).DATABASE.equals("MPF100") && listaData.get(vi).TDOC.equals("A") ? listaData.get(vi).CREJEC : listaData.get(vi).CERROR);
                    rcell4.setCellValue(listaData.get(vi).FTE);
                    rcell5.setCellValue(listaData.get(vi).SDATE);
                    rcell6.setCellValue(listaData.get(vi).SCOUNTRY);
                    rcell7.setCellValue(listaData.get(vi).SCARCOD);
                    rcell8.setCellValue(listaData.get(vi).strSCARDN);
                    rcell9.setCellValue(listaData.get(vi).SAUTHOC);
                    rcell10.setCellValue(listaData.get(vi).SCURRENCY);
                    rcell11.setCellValue(listaData.get(vi).SVFOP);
                    rcell12.setCellValue(listaData.get(vi).SPNR);
                    rcell13.setCellValue(listaData.get(vi).SAGENT);
                    rcell14.setCellValue(listaData.get(vi).ADMNUM);
                    rcell15.setCellValue(listaData.get(vi).TRNCU);
                    rcell16.setCellValue(listaData.get(vi).lngDays);
                    rcell17.setCellValue(listaData.get(vi).STVAL);

                    iter.next();
                    ++vi;
                    ++vj;
                }

                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
                workbook.write(response.getOutputStream());
                fos.close();

            } else {
                int len = listaData.size();

                String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

                Integer vi = 0;
                String fileName = "Control_Ventas_" + Functions.getFechaActual() + ".txt";
                File fileA = new File(rutaFile + "\\" + fileName + ".txt");

                if (fileA.exists()) {
                    fileA.delete();
                }

                PrintWriter writer = new PrintWriter(fileA, "UTF-8");
                String cadena;
                cadena = "Ticket|Type|Deb. Type|Comment/Adj.Type|Src|Sales Date|Country|Cc. Code|Card Number|Author. Code|Curr.|Amount|PNR|Agent|ADM Number|Tran. Code|Days|Status";
                writer.println("" + cadena);

                for (vi = 0; vi < len; vi++) {
                    cadena = "";
                    cadena += "" + listaData.get(vi).strTicket + "|";
                    cadena += "" + listaData.get(vi).strPEM + "|";
                    cadena += "" + listaData.get(vi).TYPE + "|";
                    cadena += "" + (listaData.get(vi).DATABASE.equals("MPF100") && listaData.get(vi).TDOC.equals("A") ? listaData.get(vi).CREJEC : listaData.get(vi).CERROR) + "|";
                    cadena += "" + listaData.get(vi).FTE + "|";
                    cadena += "" + listaData.get(vi).SDATE + "|";
                    cadena += "" + listaData.get(vi).SCOUNTRY + "|";
                    cadena += "" + listaData.get(vi).SCARCOD + "|";
                    cadena += "" + listaData.get(vi).strSCARDN + "|";
                    cadena += "" + listaData.get(vi).SAUTHOC + "|";
                    cadena += "" + listaData.get(vi).SCURRENCY + "|";
                    cadena += "" + listaData.get(vi).SVFOP + "|";
                    cadena += "" + listaData.get(vi).SPNR + "|";
                    cadena += "" + listaData.get(vi).SAGENT + "|";
                    cadena += "" + listaData.get(vi).ADMNUM + "|";
                    cadena += "" + listaData.get(vi).TRNCU + "|";
                    cadena += "" + listaData.get(vi).lngDays + "|";
                    cadena += "" + listaData.get(vi).STVAL;
                    cadena = cadena.replaceAll("null", "");
                    writer.println("" + cadena);
                }
                writer.flush();
                writer.close();

                response.setContentType("application/text");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    //getXLSXIBT
    @RequestMapping(value = "getXLSXIBT")
    public @ResponseBody
    void getXLSXIBT(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXIBT");
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        String fileNameDownload = String.format("Report Invoice By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = logic.loadPX263SQP00658_IBT(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Sales Date");
            CH1_2.setCellValue("Country");
            CH1_3.setCellValue("Doc SAP Bank");
            CH1_4.setCellValue("Invoice");
            CH1_5.setCellValue("Agent");
            CH1_6.setCellValue("Agent Cons.");
            CH1_7.setCellValue("Doc. Type");
            CH1_8.setCellValue("CC. Code");
            CH1_9.setCellValue("Card Numb.");
            CH1_10.setCellValue("Author.");
            CH1_11.setCellValue("Currency");
            CH1_12.setCellValue("Amount");
            CH1_13.setCellValue("Account. Date");
            CH1_14.setCellValue("Account. Status");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).SDATE);
                rcell2.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell3.setCellValue(listaData.get(vi).BANDOC);
                rcell4.setCellValue(listaData.get(vi).INVOICE);
                rcell5.setCellValue(listaData.get(vi).SAGENT);
                rcell6.setCellValue(listaData.get(vi).SCONSOL);
                rcell7.setCellValue(listaData.get(vi).TDOC);
                rcell8.setCellValue(listaData.get(vi).SCARCOD);
                rcell9.setCellValue(listaData.get(vi).strSCARDN);
                rcell10.setCellValue(listaData.get(vi).SAUTHOC);
                rcell11.setCellValue(listaData.get(vi).SCURRENCY);
                rcell12.setCellValue(listaData.get(vi).SVFOP);
                rcell13.setCellValue(listaData.get(vi).FCONT);
                rcell14.setCellValue(listaData.get(vi).STCON);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
//            Row rowTotal = sheet.createRow(vj);
//            Cell CH1_0_T = rowTotal.createCell(0);
//            Cell CH1_1_T = rowTotal.createCell(1);
//            Cell CH1_2_T = rowTotal.createCell(2);
//            Cell CH1_3_T = rowTotal.createCell(3);
//            Cell CH1_4_T = rowTotal.createCell(4);
//            Cell CH1_5_T = rowTotal.createCell(5);
//            Cell CH1_6_T = rowTotal.createCell(6);
//            Cell CH1_7_T = rowTotal.createCell(7);
//            Cell CH1_8_T = rowTotal.createCell(8);
//            Cell CH1_9_T = rowTotal.createCell(9);
//            Cell CH1_10_T = rowTotal.createCell(10);
//            Cell CH1_11_T = rowTotal.createCell(11);
//            Cell CH1_12_T = rowTotal.createCell(12);
//            Cell CH1_13_T = rowTotal.createCell(13);
//            Cell CH1_14_T = rowTotal.createCell(14);
//            Cell CH1_15_T = rowTotal.createCell(15);
//
//            CH1_0_T.setCellValue("Total");
//            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
//            CH1_2_T.setCellValue(Double.parseDouble(String.format("%2.2f", listaData.get(0).lngTotQMATCHPercent)));
//            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
//            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
//            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
//            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
//            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
//            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);
//
//            CH1_0_T.setCellStyle(totalStyle);
//            CH1_1_T.setCellStyle(totalStyle);
//            CH1_2_T.setCellStyle(totalStyle);
//            CH1_3_T.setCellStyle(totalStyle);
//            CH1_4_T.setCellStyle(totalStyle);
//            CH1_5_T.setCellStyle(totalStyle);
//            CH1_6_T.setCellStyle(totalStyle);
//            CH1_7_T.setCellStyle(totalStyle);
//            CH1_8_T.setCellStyle(totalStyle);
//            CH1_9_T.setCellStyle(totalStyle);
//            CH1_10_T.setCellStyle(totalStyle);
//            CH1_11_T.setCellStyle(totalStyle);
//            CH1_12_T.setCellStyle(totalStyle);
//            CH1_13_T.setCellStyle(totalStyle);
//            CH1_14_T.setCellStyle(totalStyle);
//            CH1_15_T.setCellStyle(totalStyle);
//
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
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
//    @RequestMapping(value = "getXLSXDetailMain")
//    public @ResponseBody
//    void getXLSXDetailMain(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        System.out.println("Report : getXLSXDetailMain");
//        A2290Filter filter = new A2290Filter();
//        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
//        String fileNameDownload = String.format("Report By Transaction - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//        try {
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            LoadConciliationLogic logic = new LoadConciliationLogic();
//            logic.setSession(this.serverSession.getServerSession());
//            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.page.PAGROW = -1;
//            filter.page.PAGNUM = 1;
//            hmResultado = logic.loadPX263SQP01828(filter);
//            List<A2290Filter> listaData = hmResultado.get("TKT");
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//            Sheet sheet = workbook.createSheet("Report");
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
//            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
//            headerFont.setColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
//            headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
//            headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//            headerStyle.setFont(headerFont);
//            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
//            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
//            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
//            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
//            totalStyle.setFont(headerFont);
//            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
//            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
//            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
//            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
//            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
//            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//            // ====== CREANDO TITULOS ======================================
//
//            // ======  Nivel 1 ==========
//            Row row1 = sheet.createRow(vj);
//            Cell CH1_0 = row1.createCell(0);
//            Cell CH1_1 = row1.createCell(1);
//            Cell CH1_2 = row1.createCell(2);
//            Cell CH1_3 = row1.createCell(3);
//            Cell CH1_4 = row1.createCell(4);
//            Cell CH1_5 = row1.createCell(5);
//            Cell CH1_6 = row1.createCell(6);
//            Cell CH1_7 = row1.createCell(7);
//            Cell CH1_8 = row1.createCell(8);
//            Cell CH1_9 = row1.createCell(9);
//            Cell CH1_10 = row1.createCell(10);
//            Cell CH1_11 = row1.createCell(11);
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);
//            Cell CH1_15 = row1.createCell(15);
//
//            CH1_0.setCellValue("Ticket");
//            CH1_1.setCellValue("Type");
//            CH1_2.setCellValue("Error");
//            CH1_3.setCellValue("Src");
//            CH1_4.setCellValue("Sales Date");
//            CH1_5.setCellValue("Country");
//            CH1_6.setCellValue("Cc. Code");
//            CH1_7.setCellValue("Card Number");
//            CH1_8.setCellValue("Author. Code");
//            CH1_9.setCellValue("Curr.");
//            CH1_10.setCellValue("Amount");
//            CH1_11.setCellValue("PNR");
//            CH1_12.setCellValue("Agent");
//            CH1_13.setCellValue("Tran. Code");
//            CH1_14.setCellValue("Days");
//            CH1_15.setCellValue("Status");
//            
//            CH1_0.setCellStyle(headerStyle);
//            CH1_1.setCellStyle(headerStyle);
//            CH1_2.setCellStyle(headerStyle);
//            CH1_3.setCellStyle(headerStyle);
//            CH1_4.setCellStyle(headerStyle);
//            CH1_5.setCellStyle(headerStyle);
//            CH1_6.setCellStyle(headerStyle);
//            CH1_7.setCellStyle(headerStyle);
//            CH1_8.setCellStyle(headerStyle);
//            CH1_9.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//
////            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            ++vj;
//            //============================================
//
//            
//            //============================================
//
//            while (iter.hasNext()) {
//                row1 = sheet.createRow(vj);
//                Cell rcell0 = row1.createCell(0);
//                Cell rcell1 = row1.createCell(1);
//                Cell rcell2 = row1.createCell(2);
//                Cell rcell3 = row1.createCell(3);
//                Cell rcell4 = row1.createCell(4);
//                Cell rcell5 = row1.createCell(5);
//                Cell rcell6 = row1.createCell(6);
//                Cell rcell7 = row1.createCell(7);
//                Cell rcell8 = row1.createCell(8);
//                Cell rcell9 = row1.createCell(9);
//                Cell rcell10 = row1.createCell(10);
//                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);
//                Cell rcell15 = row1.createCell(15);
//
//                rcell0.setCellValue(listaData.get(vi).strTicket);
//                rcell1.setCellValue(listaData.get(vi).strPEM);
//                rcell2.setCellValue(listaData.get(vi).CERROR);
//                rcell3.setCellValue(listaData.get(vi).FTE);
//                rcell4.setCellValue(listaData.get(vi).SDATE);
//                rcell5.setCellValue(listaData.get(vi).SCOUNTRY);
//                rcell6.setCellValue(listaData.get(vi).SCARCOD);
//                rcell7.setCellValue(listaData.get(vi).strSCARDN);
//                rcell8.setCellValue(listaData.get(vi).SAUTHOC);
//                rcell9.setCellValue(listaData.get(vi).SCURRENCY);
//                rcell10.setCellValue(listaData.get(vi).SVFOP);
//                rcell11.setCellValue(listaData.get(vi).SPNR);
//                rcell12.setCellValue(listaData.get(vi).SAGENT);
//                rcell13.setCellValue(listaData.get(vi).TRNCU);
//                rcell14.setCellValue(listaData.get(vi).lngDays);
//                rcell15.setCellValue(listaData.get(vi).STVAL);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            //============================================
//            response.setContentType("application/vnd.openxml");
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
//
//            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
//            workbook.write(response.getOutputStream());
//            fos.close();
//
//        } catch (IOException e) {
//            throw new SpringException(e);
//        }
//    }

    @RequestMapping(value = "getXLSXDetalleByStval")
    public @ResponseBody
    void getXLSXDetalleByStval(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXDetalleByStval");
        A2290Filter filter = new A2290Filter();
        HashMap<String, List<A2290Filter>> hmResultado = new HashMap<String, List<A2290Filter>>();
        String fileNameDownload = String.format("Report Sales By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            hmResultado = logic.loadPX263SQP00715(filter);
            List<A2290Filter> listaData = hmResultado.get("TKT");
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFont(headerFont);
            totalStyle.setBorderRight(CellStyle.BORDER_THIN);
            totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
            totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
            totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setBorderTop(CellStyle.BORDER_THIN);
            totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
            totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
            totalStyle.setFont(headerFont);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
            // ====== CREANDO TITULOS ======================================

            // ======  Nivel 1 ==========
            Row row1 = sheet.createRow(vj);
            Cell CH1_0 = row1.createCell(0);
            Cell CH1_1 = row1.createCell(1);
            Cell CH1_2 = row1.createCell(2);
            Cell CH1_3 = row1.createCell(3);
            Cell CH1_4 = row1.createCell(4);
            Cell CH1_5 = row1.createCell(5);
            Cell CH1_6 = row1.createCell(6);
            Cell CH1_7 = row1.createCell(7);
            Cell CH1_8 = row1.createCell(8);
            Cell CH1_9 = row1.createCell(9);
            Cell CH1_10 = row1.createCell(10);
            Cell CH1_11 = row1.createCell(11);
            Cell CH1_12 = row1.createCell(12);
            Cell CH1_13 = row1.createCell(13);
            Cell CH1_14 = row1.createCell(14);
            Cell CH1_15 = row1.createCell(15);

            CH1_0.setCellValue("Ticket");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Src");
            CH1_3.setCellValue("Cc. Code");
            CH1_4.setCellValue("Card Number");
            CH1_5.setCellValue("Author");
            CH1_6.setCellValue("Curr.");
            CH1_7.setCellValue("Amount");
            CH1_8.setCellValue("PNR");
            CH1_9.setCellValue("Agent");
            CH1_10.setCellValue("Inv. Number");
            CH1_11.setCellValue("Pay. Date");
            CH1_12.setCellValue("Bank Pay. Status");
            CH1_13.setCellValue("Tran. Code");
            CH1_14.setCellValue("Days");
            CH1_15.setCellValue("Flag Status");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);
            CH1_9.setCellStyle(headerStyle);
            CH1_10.setCellStyle(headerStyle);
            CH1_11.setCellStyle(headerStyle);
            CH1_12.setCellStyle(headerStyle);
            CH1_13.setCellStyle(headerStyle);
            CH1_14.setCellStyle(headerStyle);
            CH1_15.setCellStyle(headerStyle);

//            CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
//            Row row2 = sheet.createRow(vj);
//            Cell CH2_0 = row2.createCell(0);
//            Cell CH2_1 = row2.createCell(1);
//            Cell CH2_2 = row2.createCell(2);
//            Cell CH2_3 = row2.createCell(3);
//            Cell CH2_4 = row2.createCell(4);
//            Cell CH2_5 = row2.createCell(5);
//            Cell CH2_6 = row2.createCell(6);
//            Cell CH2_7 = row2.createCell(7);
//            Cell CH2_8 = row2.createCell(8);
//
//            CH2_0.setCellValue("Date");
//            CH2_1.setCellValue("Match");
//            CH2_5.setCellValue("Ticket");
//            CH2_6.setCellValue("Total");
//            CH2_7.setCellValue("Accounted");
//
//            CH2_0.setCellStyle(headerStyle);
//            CH2_1.setCellStyle(headerStyle);
//            CH2_2.setCellStyle(headerStyle);
//            CH2_3.setCellStyle(headerStyle);
//            CH2_4.setCellStyle(headerStyle);
//            CH2_5.setCellStyle(headerStyle);
//            CH2_6.setCellStyle(headerStyle);
//            CH2_7.setCellStyle(headerStyle);
//            CH2_8.setCellStyle(headerStyle);
            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 4));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 8));
//
//            ++vj;
            //============================================
            // ======  Nivel 3 ==========
//            Row row3 = sheet.createRow(vj);
//            Cell CH3_0 = row3.createCell(0);
//            Cell CH3_1 = row3.createCell(1);
//            Cell CH3_2 = row3.createCell(2);
//            Cell CH3_3 = row3.createCell(3);
//            Cell CH3_4 = row3.createCell(4);
//            Cell CH3_5 = row3.createCell(5);
//            Cell CH3_6 = row3.createCell(6);
//            Cell CH3_7 = row3.createCell(7);
//            Cell CH3_8 = row3.createCell(8);
//
//            CH3_1.setCellValue("Auto");
//            CH3_2.setCellValue("%");
//            CH3_3.setCellValue("Manual");
//            CH3_4.setCellValue("Diff");
//            CH3_5.setCellValue("w/o Sett.");
//            CH3_6.setCellValue("Tkt");
//            CH3_7.setCellValue("Processed");
//            CH3_8.setCellValue("Pending");
//
//            CH3_0.setCellStyle(headerStyle);
//            CH3_1.setCellStyle(headerStyle);
//            CH3_2.setCellStyle(headerStyle);
//            CH3_3.setCellStyle(headerStyle);
//            CH3_4.setCellStyle(headerStyle);
//            CH3_5.setCellStyle(headerStyle);
//            CH3_6.setCellStyle(headerStyle);
//            CH3_7.setCellStyle(headerStyle);
//            CH3_8.setCellStyle(headerStyle);
//
//            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 1, 1));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 2, 2));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 3));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 4, 4));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 5, 5));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 6));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 7, 7));
//            sheet.addMergedRegion(new CellRangeAddress(2, 2, 8, 8));
//            ++vj;
            //============================================
            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);

                rcell0.setCellValue(listaData.get(vi).strTicket);
                rcell1.setCellValue(listaData.get(vi).STVAL);
                rcell2.setCellValue(listaData.get(vi).FTE);
                rcell3.setCellValue(listaData.get(vi).SCARCOD);
                rcell4.setCellValue(listaData.get(vi).strSCARDN);
                rcell5.setCellValue(listaData.get(vi).SAUTHOC);
                rcell6.setCellValue(listaData.get(vi).SCURRENCY);
                rcell7.setCellValue(listaData.get(vi).SVFOP);
                rcell8.setCellValue(listaData.get(vi).SPNR);
                rcell9.setCellValue(listaData.get(vi).SAGENT);
                rcell10.setCellValue(listaData.get(vi).SINVN);
                rcell11.setCellValue(listaData.get(vi).BDATEP);
                rcell12.setCellValue(listaData.get(vi).BSTVAL);
                rcell13.setCellValue(listaData.get(vi).TRNCU);
                rcell14.setCellValue(listaData.get(vi).lngDays);
                rcell15.setCellValue(listaData.get(vi).strFlagStat);

                iter.next();
                ++vi;
                ++vj;
            }

            // ======  Nivel de TOTALES ==========
//            Row rowTotal = sheet.createRow(vj);
//            Cell CH1_0_T = rowTotal.createCell(0);
//            Cell CH1_1_T = rowTotal.createCell(1);
//            Cell CH1_2_T = rowTotal.createCell(2);
//            Cell CH1_3_T = rowTotal.createCell(3);
//            Cell CH1_4_T = rowTotal.createCell(4);
//            Cell CH1_5_T = rowTotal.createCell(5);
//            Cell CH1_6_T = rowTotal.createCell(6);
//            Cell CH1_7_T = rowTotal.createCell(7);
//            Cell CH1_8_T = rowTotal.createCell(8);
//            Cell CH1_9_T = rowTotal.createCell(9);
//            Cell CH1_10_T = rowTotal.createCell(10);
//            Cell CH1_11_T = rowTotal.createCell(11);
//            Cell CH1_12_T = rowTotal.createCell(12);
//            Cell CH1_13_T = rowTotal.createCell(13);
//            Cell CH1_14_T = rowTotal.createCell(14);
//            Cell CH1_15_T = rowTotal.createCell(15);
//
//            CH1_0_T.setCellValue("Total");
//            CH1_1_T.setCellValue(listaData.get(0).lngTotQMATCH);
//            CH1_2_T.setCellValue(Double.parseDouble(String.format("%2.2f", listaData.get(0).lngTotQMATCHPercent)));
//            CH1_3_T.setCellValue(listaData.get(0).lngTotQMANUAL);
//            CH1_4_T.setCellValue(listaData.get(0).lngTotQDIFF);
//            CH1_5_T.setCellValue(listaData.get(0).lngTotQPEND);
//            CH1_6_T.setCellValue(listaData.get(0).lngTotQSALES);
//            CH1_7_T.setCellValue(listaData.get(0).lngTotQPOLIC);
//            CH1_8_T.setCellValue(listaData.get(0).lngTotQPOLIPE);
//
//            CH1_0_T.setCellStyle(totalStyle);
//            CH1_1_T.setCellStyle(totalStyle);
//            CH1_2_T.setCellStyle(totalStyle);
//            CH1_3_T.setCellStyle(totalStyle);
//            CH1_4_T.setCellStyle(totalStyle);
//            CH1_5_T.setCellStyle(totalStyle);
//            CH1_6_T.setCellStyle(totalStyle);
//            CH1_7_T.setCellStyle(totalStyle);
//            CH1_8_T.setCellStyle(totalStyle);
//            CH1_9_T.setCellStyle(totalStyle);
//            CH1_10_T.setCellStyle(totalStyle);
//            CH1_11_T.setCellStyle(totalStyle);
//            CH1_12_T.setCellStyle(totalStyle);
//            CH1_13_T.setCellStyle(totalStyle);
//            CH1_14_T.setCellStyle(totalStyle);
//            CH1_15_T.setCellStyle(totalStyle);
//
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
//            sheet.autoSizeColumn(14, true);
//            sheet.autoSizeColumn(15, true);
            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getReport")
    public @ResponseBody
    void getReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getReport");
        A2290Filter filter = new A2290Filter();
        String fileNameDownload = String.format("Report Sales By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            List<A2290Filter> listaData = logic.loadPX263MPS097(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            if (listaData.size() < 65000) {
                workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Report");
                XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
                XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();
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
                headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
                headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
                headerStyle.setFont(headerFont);
                totalStyle.setBorderRight(CellStyle.BORDER_THIN);
                totalStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderBottom(CellStyle.BORDER_THIN);
                totalStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderLeft(CellStyle.BORDER_THIN);
                totalStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setBorderTop(CellStyle.BORDER_THIN);
                totalStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);
                totalStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
                totalStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
                totalStyle.setVerticalAlignment(CellStyle.ALIGN_RIGHT);
                totalStyle.setFont(headerFont);
                bodyStyle.setBorderRight(CellStyle.BORDER_THIN);
                bodyStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
                bodyStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
                bodyStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
                bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
                bodyStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
                Integer vi = 0;
                Integer vj = 0; //Almacena el numero de fila
                Iterator iter = listaData.iterator();
                // ====== CREANDO TITULOS ======================================

                // ======  Nivel 1 ==========
                Row row1 = sheet.createRow(vj);
                Cell CH1_0 = row1.createCell(0);
                Cell CH1_1 = row1.createCell(1);
                Cell CH1_2 = row1.createCell(2);
                Cell CH1_3 = row1.createCell(3);
                Cell CH1_4 = row1.createCell(4);
                Cell CH1_5 = row1.createCell(5);
                Cell CH1_6 = row1.createCell(6);
                Cell CH1_7 = row1.createCell(7);
                Cell CH1_8 = row1.createCell(8);
                Cell CH1_9 = row1.createCell(9);
                Cell CH1_10 = row1.createCell(10);
                Cell CH1_11 = row1.createCell(11);
                Cell CH1_12 = row1.createCell(12);
                Cell CH1_13 = row1.createCell(13);
                Cell CH1_14 = row1.createCell(14);
                Cell CH1_15 = row1.createCell(15);
                Cell CH1_16 = row1.createCell(16);
                Cell CH1_17 = row1.createCell(17);
                Cell CH1_18 = row1.createCell(18);
                Cell CH1_19 = row1.createCell(19);

//            PLACA,TKT,FUENTE,AGENT,COUNTRY,DATE,CONSOL,PNR,CARDN,AUTHOC,CARCOD,STATE,INVOICE,CURRENCY,AMOUNT
                CH1_0.setCellValue("Placa");
                CH1_1.setCellValue("Tkt");
                CH1_2.setCellValue("Fuente");
                CH1_3.setCellValue("Agent");
                CH1_4.setCellValue("Country");
                CH1_5.setCellValue("Date");
                CH1_6.setCellValue("Consol");
                CH1_7.setCellValue("PNR");
                CH1_8.setCellValue("Card Number");
                CH1_9.setCellValue("Auth.");
                CH1_10.setCellValue("Card Code");
                CH1_11.setCellValue("State");
                CH1_12.setCellValue("Invoice");
                CH1_13.setCellValue("Currency Local");
                CH1_14.setCellValue("Amount Local");
                CH1_15.setCellValue("Currency USD");
                CH1_16.setCellValue("Amount USD");
                CH1_17.setCellValue("Date Conciliation");
                CH1_18.setCellValue("Transaction Conciliation");
                CH1_19.setCellValue("Rule");

                CH1_0.setCellStyle(headerStyle);
                CH1_1.setCellStyle(headerStyle);
                CH1_2.setCellStyle(headerStyle);
                CH1_3.setCellStyle(headerStyle);
                CH1_4.setCellStyle(headerStyle);
                CH1_5.setCellStyle(headerStyle);
                CH1_6.setCellStyle(headerStyle);
                CH1_7.setCellStyle(headerStyle);
                CH1_8.setCellStyle(headerStyle);
                CH1_9.setCellStyle(headerStyle);
                CH1_10.setCellStyle(headerStyle);
                CH1_11.setCellStyle(headerStyle);
                CH1_12.setCellStyle(headerStyle);
                CH1_13.setCellStyle(headerStyle);
                CH1_14.setCellStyle(headerStyle);
                CH1_15.setCellStyle(headerStyle);
                CH1_16.setCellStyle(headerStyle);
                CH1_17.setCellStyle(headerStyle);
                CH1_18.setCellStyle(headerStyle);
                CH1_19.setCellStyle(headerStyle);

                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 11));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
                ++vj;
                //============================================

                while (iter.hasNext()) {
                    row1 = sheet.createRow(vj);
                    Cell rcell0 = row1.createCell(0);
                    Cell rcell1 = row1.createCell(1);
                    Cell rcell2 = row1.createCell(2);
                    Cell rcell3 = row1.createCell(3);
                    Cell rcell4 = row1.createCell(4);
                    Cell rcell5 = row1.createCell(5);
                    Cell rcell6 = row1.createCell(6);
                    Cell rcell7 = row1.createCell(7);
                    Cell rcell8 = row1.createCell(8);
                    Cell rcell9 = row1.createCell(9);
                    Cell rcell10 = row1.createCell(10);
                    Cell rcell11 = row1.createCell(11);
                    Cell rcell12 = row1.createCell(12);
                    Cell rcell13 = row1.createCell(13);
                    Cell rcell14 = row1.createCell(14);
                    Cell rcell15 = row1.createCell(15);
                    Cell rcell16 = row1.createCell(16);
                    Cell rcell17 = row1.createCell(17);
                    Cell rcell18 = row1.createCell(18);
                    Cell rcell19 = row1.createCell(19);

                    rcell0.setCellValue(listaData.get(vi).PLACA);
                    rcell1.setCellValue(listaData.get(vi).TKT);
                    rcell2.setCellValue(listaData.get(vi).FUENTE);
                    rcell3.setCellValue(listaData.get(vi).AGENT);
                    rcell4.setCellValue(listaData.get(vi).COUNTRY);
                    rcell5.setCellValue(listaData.get(vi).DATE);
                    rcell6.setCellValue(listaData.get(vi).CONSOL);
                    rcell7.setCellValue(listaData.get(vi).PNR);
                    rcell8.setCellValue(listaData.get(vi).CARDN);
                    rcell9.setCellValue(listaData.get(vi).AUTHOC);
                    rcell10.setCellValue(listaData.get(vi).CARCOD);
                    rcell11.setCellValue(listaData.get(vi).STATE);
                    rcell12.setCellValue(listaData.get(vi).INVOICE);
                    rcell13.setCellValue(listaData.get(vi).CURRENCY);
                    rcell14.setCellValue(listaData.get(vi).MONTO);
                    rcell15.setCellValue(listaData.get(vi).USCURR);
                    rcell16.setCellValue(listaData.get(vi).MONTOUSD);
                    
                    rcell17.setCellValue(listaData.get(vi).DATEC);
                    rcell18.setCellValue(listaData.get(vi).TRANC);
                    rcell19.setCellValue(listaData.get(vi).FREGLA);
                    iter.next();
                    ++vi;
                    ++vj;
                }

                // ======  Nivel de TOTALES ==========
                Row rowTotal = sheet.createRow(vj);
                Cell CH1_0_T = rowTotal.createCell(0);
                Cell CH1_1_T = rowTotal.createCell(1);
                Cell CH1_2_T = rowTotal.createCell(2);
                Cell CH1_3_T = rowTotal.createCell(3);
                Cell CH1_4_T = rowTotal.createCell(4);
                Cell CH1_5_T = rowTotal.createCell(5);
                Cell CH1_6_T = rowTotal.createCell(6);
                Cell CH1_7_T = rowTotal.createCell(7);
                Cell CH1_8_T = rowTotal.createCell(8);
                Cell CH1_9_T = rowTotal.createCell(9);
                Cell CH1_10_T = rowTotal.createCell(10);
                Cell CH1_11_T = rowTotal.createCell(11);
                Cell CH1_12_T = rowTotal.createCell(12);
                Cell CH1_13_T = rowTotal.createCell(13);
                Cell CH1_14_T = rowTotal.createCell(14);
                Cell CH1_15_T = rowTotal.createCell(15);
                Cell CH1_16_T = rowTotal.createCell(16);

                if (listaData.size() > 0) {
                    CH1_16_T.setCellValue(listaData.get(0).lngTotRATE);
                }

                CH1_0_T.setCellStyle(totalStyle);
                CH1_1_T.setCellStyle(totalStyle);
                CH1_2_T.setCellStyle(totalStyle);
                CH1_3_T.setCellStyle(totalStyle);
                CH1_4_T.setCellStyle(totalStyle);
                CH1_5_T.setCellStyle(totalStyle);
                CH1_6_T.setCellStyle(totalStyle);
                CH1_7_T.setCellStyle(totalStyle);
                CH1_8_T.setCellStyle(totalStyle);
                CH1_9_T.setCellStyle(totalStyle);
                CH1_10_T.setCellStyle(totalStyle);
                CH1_11_T.setCellStyle(totalStyle);
                CH1_12_T.setCellStyle(totalStyle);
                CH1_13_T.setCellStyle(totalStyle);
                CH1_14_T.setCellStyle(totalStyle);
                CH1_15_T.setCellStyle(totalStyle);
                CH1_16_T.setCellStyle(totalStyle);

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
                sheet.autoSizeColumn(14, true);
                sheet.autoSizeColumn(15, true);
                sheet.autoSizeColumn(16, true);
                sheet.autoSizeColumn(17, true);
                sheet.autoSizeColumn(18, true);
                sheet.autoSizeColumn(19, true);

                //============================================
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

                FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
                workbook.write(response.getOutputStream());
                fos.close();
            } else {

                int len = listaData.size();

                String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

                Integer vi = 0;
                String fileName = "Report Sales By Ticket - " + Functions.getFechaActual() + ".txt";
                File fileA = new File(rutaFile + "\\" + fileName + ".txt");

                if (fileA.exists()) {
                    fileA.delete();
                }

                PrintWriter writer = new PrintWriter(fileA, "UTF-8");
                String cadena;
                cadena = "Placa|Tkt|Fuente|Agent|Country|Date|Consol|PNR|Card Number|Auth.|Card Code|State|Invoice|Currency Local|Amount Local|Currency USD|Amount USD";
                writer.println("" + cadena);

                for (vi = 0; vi < len; vi++) {
                    cadena = "";
                    cadena += "" + listaData.get(vi).PLACA + "|";
                    cadena += "" + listaData.get(vi).TKT + "|";
                    cadena += "" + listaData.get(vi).FUENTE + "|";
                    cadena += "" + listaData.get(vi).AGENT + "|";
                    cadena += "" + listaData.get(vi).COUNTRY + "|";
                    cadena += "" + listaData.get(vi).DATE + "|";
                    cadena += "" + listaData.get(vi).CONSOL + "|";
                    cadena += "" + listaData.get(vi).PNR + "|";
                    cadena += "" + listaData.get(vi).CARDN + "|";
                    cadena += "" + listaData.get(vi).AUTHOC + "|";
                    cadena += "" + listaData.get(vi).CARCOD + "|";
                    cadena += "" + listaData.get(vi).STATE + "|";
                    cadena += "" + listaData.get(vi).INVOICE + "|";
                    cadena += "" + listaData.get(vi).CURRENCY + "|";
                    cadena += "" + listaData.get(vi).MONTO + "|";
                    cadena += "" + listaData.get(vi).USCURR + "|";
                    cadena += "" + listaData.get(vi).MONTOUSD;
                    cadena = cadena.replaceAll("null", "");
                    writer.println("" + cadena);
                }
                writer.flush();
                writer.close();

                response.setContentType("application/text");
                response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
                InputStream is = new FileInputStream(rutaFile + "\\" + fileName + ".txt");
                IOUtils.copy(is, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "getReportSumary")
    public @ResponseBody
    void getReportSumary(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getReportSumary");
        A2290Filter filter = new A2290Filter();
        String fileNameDownload = String.format("Report Sales By Ticket - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            Map<String, List<A2290Filter>> listas = logic.loadPX263MPS097SUMARY(filter);
            List<A2290Filter> listaData1 = listas.get("LISTA1");
            List<A2290Filter> listaData2 = listas.get("LISTA2");
            List<A2290Filter> listaData3 = listas.get("LISTA3");
            List<A2290Filter> listaData4 = listas.get("LISTA4");

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");

            // ====== Estilos =======
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle totalStyle = (XSSFCellStyle) workbook.createCellStyle();
            XSSFCellStyle bodyStyle = (XSSFCellStyle) workbook.createCellStyle();

            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            headerStyle.setFont(headerFont);
            totalStyle.setFont(headerFont);

            headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
            headerStyle.setBorderTop(CellStyle.BORDER_THIN);
            headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
            headerStyle.setBorderRight(CellStyle.BORDER_THIN);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(127, 152, 168)));
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            totalStyle.cloneStyleFrom(headerStyle);
            totalStyle.setAlignment(CellStyle.ALIGN_RIGHT);

            bodyStyle.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle.setBorderRight(CellStyle.BORDER_THIN);

            // ====== Escribir cada bloque uno al lado del otro =======
            int startCol = 0;

            startCol = generarBloqueListaHorizontal(sheet, "134", listaData1, startCol, headerStyle, bodyStyle, totalStyle);
            startCol = generarBloqueListaHorizontal(sheet, "202", listaData2, startCol, headerStyle, bodyStyle, totalStyle);
            startCol = generarBloqueListaHorizontal(sheet, "133", listaData3, startCol, headerStyle, bodyStyle, totalStyle);
            startCol = generarBloqueListaHorizontal(sheet, "547", listaData4, startCol, headerStyle, bodyStyle, totalStyle);

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    private int generarBloqueListaHorizontal(Sheet sheet, String placa, List<A2290Filter> lista, int startCol,
                                             CellStyle headerStyle, CellStyle bodyStyle, CellStyle totalStyle) {
        int row = 0;
        int col = startCol;

        // Fila de PLACA
        Row rowPlaca = sheet.getRow(row);
        if (rowPlaca == null) rowPlaca = sheet.createRow(row);
        Cell placaCell = rowPlaca.createCell(col);
        placaCell.setCellValue(placa);
        placaCell.setCellStyle(headerStyle);

        // Fila de encabezados
        row++;
        Row headerRow = sheet.getRow(row);
        if (headerRow == null) headerRow = sheet.createRow(row);

        String[] headers = {"PLACA", "PAIS", "SUMA DE AMOUNT USD"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(col + i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Datos
        double totalMonto = 0;
        for (A2290Filter bean : lista) {
            row++;
            Row dataRow = sheet.getRow(row);
            if (dataRow == null) dataRow = sheet.createRow(row);

            Cell c1 = dataRow.createCell(col);
            c1.setCellValue(bean.CCUST);
            c1.setCellStyle(bodyStyle);

            Cell c2 = dataRow.createCell(col + 1);
            c2.setCellValue(bean.COUNTRY);
            c2.setCellStyle(bodyStyle);

            Cell c3 = dataRow.createCell(col + 2);
            c3.setCellValue(bean.MONTOUSD);
            c3.setCellStyle(bodyStyle);

            totalMonto += bean.MONTOUSD;
        }

        // Total
        row++;
        Row totalRow = sheet.getRow(row);
        if (totalRow == null) totalRow = sheet.createRow(row);

        Cell totalLabel = totalRow.createCell(col);
        totalLabel.setCellValue("TOTAL " + placa);
        totalLabel.setCellStyle(totalStyle);

        Cell totalValue = totalRow.createCell(col + 2);
        totalValue.setCellValue(totalMonto);
        totalValue.setCellStyle(totalStyle);

        // Autosize
        sheet.autoSizeColumn(col);
        sheet.autoSizeColumn(col + 1);
        sheet.autoSizeColumn(col + 2);

        return startCol + 4; // Deja espacio de 1 columna entre bloques
    }

    @RequestMapping(value = "sendEmail")
    public @ResponseBody
    String sendEmail(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- DataRequestedByBank : sendEmail-------------");
        Gson gson = new Gson();
        String fecha = "", fecha_des = "";

        MPF100Filter obj = new MPF100Filter();
        boolean iboolean;
        String msj = "";
        String msjError = "";
        String contactos_BPO = "plopez@miatech.net;monica@miatech.net";

        List<MPF100Filter> listaData;
        List<MPF100Filter> listaData_BPO;
        List<MPF106Filter> listaDataCorreos = new ArrayList<MPF106Filter>(0);;

        try {
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            fecha = request.getParameter("v_fecha");
            if (!fecha.equals("")) {

                fecha_des = Functions.getAbreviaturaMes(fecha.substring(4)) + " " + fecha.substring(0, 4);
                obj.IN_FECHA = fecha;
                listaDataCorreos = logic.loadPX263getCorreosAV(obj);

                if (listaDataCorreos.size() > 0) {

                    int contIatas = 0;
                    for (int j = 0; j < listaDataCorreos.size(); j++) {
                        String correos = ((MPF106Filter) listaDataCorreos.get(j)).EMAILS;
                        String agent = ((MPF106Filter) listaDataCorreos.get(j)).CAGENCY;
                        String agent_name = ((MPF106Filter) listaDataCorreos.get(j)).NAMEA;
                        String contactos = ((MPF106Filter) listaDataCorreos.get(j)).CONTAC;
                        contactos_BPO = ((MPF106Filter) listaDataCorreos.get(j)).EMAILS5;

                        obj.IN_AGENT = agent;
                        //Obtiene la lista de aclaraciones de esa fecha
                        listaData = logic.loadPX263SQP00XXXJT(obj);
//                        listaData_ADJUST = logic.loadPX263SQP00XXXJT2(obj);

                        if (listaData.size() > 0) {

                            String ruta_file = obtenerExcel(listaData, agent_name);
                            //                        String ruta_file_adjust ="";
                            //                        if(listaData_ADJUST.size()>0){
                            //                            ruta_file_adjust = obtenerExcel_Adjust(listaData_ADJUST,agent_name);
                            //                        }

                            //CODIGO DE MAIL Y SU ATTACHMENT
                            ProMail proMail = new ProMail();
                            List<String> receptores = new ArrayList<String>();
                            List<String> adjuntos = new ArrayList<String>();

                            if (!ruta_file.equals("")) {
                                adjuntos.add(ruta_file);
                                //                            if(!ruta_file_adjust.equals("")){
                                //                                adjuntos.add(ruta_file_adjust);   
                                //                            }
                            }
                            // Emails CC
                            List<String> CC = new ArrayList<String>();
                            List<String> Ccp = new ArrayList<String>();

//                            String correosCopia = "carlos.miranda@avianca.com;cheryd.quintero@avianca.com;jose.higuera@avianca.com;monica.zuluaga@avianca.com;carlos.jaimes@avianca.com";
                            String correosCopia = contactos;
                            //                        String correosOcultos = "larango@miatech.net;eneves@miatech.net;jtorres@miatech.net;jsolano@miatech.net";
                            String correosOcultos = "";
                            //                        String emisor = "jtorres@miatech.net";

                            //                        receptores.add(correos);

                            /*Correo Destino*/
                            if (!correos.trim().equals("")) {
                                String[] partsTo = correos.split(";");
                                for (int h = 0; h < partsTo.length; h++) {
                                    if (!partsTo[h].trim().equals("")) {
                                        receptores.add(partsTo[h]);
                                    }
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
                            String mensaje = "<p>Estimados miembros de agencia de viajes:</p>\n"
                                    + "<p>Les brindamos inicialmente un cordial saludo</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Continuando con nuestro proceso de conciliaci&oacute;n de pagos de tiquetes con forma de pago tarjeta de cr&eacute;dito, adjuntamos los tiquetes "
                                    + "definitivos pendientes de pago que corresponden a las ventas realizadas con tarjeta de cr&eacute;dito por su Agencia en el mes "
                                    + "de <strong><strong>" + fecha_des + "</strong></strong><strong><strong>&nbsp;</strong></strong>y hemos encontrado diferencias entre el valor facturado por ustedes y "
                                    + "el valor ingresado en nuestras cuentas bancarias (total resaltado en color amarillo),&nbsp;por lo cual de manera muy respetuosa solicitamos a ustedes enviarnos "
                                    + "la informaci&oacute;n correspondiente al n&uacute;mero de autorizaci&oacute;n, as&iacute; como la fecha de expedici&oacute;n de &eacute;ste y el "
                                    + "valor<strong><strong>&nbsp;</strong></strong><strong><strong>EXACTO</strong></strong>&nbsp;del pago, esto con el fin de corroborar esta informaci&oacute;n y "
                                    + "realizar una correcta conciliaci&oacute;n.</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Luego, si da a lugar solicitaremos el soporte de pago.</p>\n"
                                    + "<p><strong><strong>&nbsp;</strong></strong></p>\n"
                                    + "<p><strong><strong>FAVOR DILIGENCIAR LOS DATOS EN EL MISMO FORMATO </strong></strong>y responder al "
                                    + "correo&nbsp;<a href=\"mailto:conciliacionventastc@avianca.com\"><u>conciliacionventastc@avianca.com</u></a>&nbsp;con copia "
                                    + "a: <a href=\"mailto:cheryd.quintero@avianca.com\"><u>cheryd.quintero@avianca.com</u></a>&nbsp;"
                                    + "<a href=\"mailto:jose.higuera@avianca.com\"><u>jose.higuera@avianca.com</u></a>&nbsp;<a href=\"mailto:monica.zuluaga@avianca.com\"><u>monica.zuluaga@avianca.com</u></a>"
                                    + "&nbsp;<a href=\"mailto:carlos.jaimes@avianca.com\"><u>carlos.jaimes@avianca.com</u></a>. D<strong><strong>e encontrar tiquetes los cuales no hayan "
                                    + "sido cancelados, solicitamos su legalizaci&oacute;n de forma inmediata mediante&nbsp;la confirmaci&oacute;n del cobro mediante BSP - nota de cargo respondiendo en este "
                                    + "mismo correo.</strong></strong></p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Muchas gracias y quedamos atentos a su respuesta,&nbsp;la cual agradezco sea <strong><strong>enviada dentro de los pr&oacute;ximos 5 "
                                    + "d&iacute;as h&aacute;biles</strong></strong><strong><strong>,</strong></strong><strong><strong>&nbsp;</strong></strong>esto con el fin de estar al "
                                    + "d&iacute;a con las auditor&iacute;as, caso contrario se entender&aacute; que las transacciones est&aacute;n <strong><strong>pendientes de pago y se "
                                    + "elaborar&aacute; la respectiva nota de cargo.&nbsp;</strong></strong></p>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Como informaci&oacute;n general y con el fin de evitar reprocesos de ambas partes,&nbsp;antes de enviar la respuesta definitiva&nbsp;en cuanto a los "
                                    + "soportes&nbsp;de pago de los tiquetes solicitados, agradecemos que la agencia tenga en cuenta las siguientes recomendaciones:</p>\n"
                                    + "<ul>\n"
                                    + "<li>Revisar que los voucher que env&iacute;an como soporte de pago sean direccionados a Avianca y si por error no fue as&iacute;,&nbsp;aprobar el "
                                    + "ADM y solicitar la nota de abono a la aerol&iacute;nea a la cual fue direccionado el pago.</li>\n"
                                    + "<li>No se pueden aceptar pagos diferentes a la fecha de la expedici&oacute;n del tiquete m&aacute;ximo al d&iacute;a siguiente,&nbsp;no se aceptar&aacute;n pagos "
                                    + "del mes posterior o anterior.</li>\n"
                                    + "<li>Que los valores de los voucher coincidan con el valor total de los tiquetes.</li>\n"
                                    + "<li>Los dat&aacute;fonos de Credibanco no pueden recibir Master Card,&nbsp;solo se hacen a trav&eacute;s de Redeban,&nbsp;para estos casos revisar en sus "
                                    + "extractos ya que la franquicia abona estas transacciones a la agencia y por consiguiente tambi&eacute;n se generar&iacute;a la nota de cargo por los tiquetes "
                                    + "que est&eacute;n amparados por estas transacciones.</li>\n"
                                    + "<li>Cuando se comete un error al expedir una MPD o tiquete,&nbsp;no existe otra soluci&oacute;n que generar&nbsp;la ADM&nbsp;a la agencia ya que no se pueden "
                                    + "alterar los valores en Rapid a no ser que sean detectados el mismo d&iacute;a para que sean corregidos por la agencia,&nbsp;de lo contrario se debe cancelar "
                                    + "la ADM y solicitar el reembolso y/o ACM seg&uacute;n corresponda.</li>\n"
                                    + "<li>Verificar que&nbsp;los soportes que env&iacute;an no&nbsp;hayan presentado anulaci&oacute;n no satisfactoria,&nbsp;porque de ser as&iacute; no se pueden "
                                    + "tomar para cancelar tiquetes pendientes y por ende se genera la nota de cargo.</li>\n"
                                    + "</ul>\n"
                                    + "<p>&nbsp;</p>\n"
                                    + "<p>Cordial saludo,</p>\n"
                                    + "<img src=\"cid:logo\" />";
                            iboolean = proMail.enviaCorreoAV("", asunto, receptores, CC, Ccp, mensaje, adjuntos, this.serverSession.getServerSession());

                            if (iboolean) {
                                //resp.info.add("Email Sent.");
                                contIatas += 1;
                                msj += " Email Sent.";

                                String msj_marca = logic.marcarTicketsEnviados(obj);
                                if (!msj_marca.equals("OK")) {
                                    msjError = msjError + "-" + obj.IN_AGENT;
                                }
                            } else {
                                //resp.info.add("Could not send email!");
                                msj += " Could not send email.Reporter to the systems area";
                                break;
                            }

                            /*Eliminamos archivo temporal*/
                            File file = new File(ruta_file);
                            if (file.exists()) {
                                file.delete();
                            }
                            //                        File file2 = new File(ruta_file_adjust);
                            //                        if (file2.exists()) {
                            //                            file2.delete();
                            //                        }

                        }
                    }

                    msj = contIatas + " Email Sent.";
                    if (!msjError.equals("")) {
                        msj = msj + "Revisar:" + msjError;
                    }

                } else {
                    msj = "No existe información para enviar.";
                }

                System.out.println("Se enviara a bpo");

                listaData_BPO = logic.loadPX263SQP00XXXJT3(obj);
                if (listaData_BPO.size() > 0) {
                    String msjBPO = obtenerExcel_BPO_enviarCorreo(listaData_BPO, fecha, contactos_BPO);
                    if (!msjBPO.equals("OK")) {
                        msj = msj + ".Revisar Correo Bpo.";
                    }
                }
            } else {
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

        String fileNameDownload = String.format("Auditoria Agencias - " + agent_name + " -" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String ruta = "";
        try {
            ruta = "C:\\Dumps\\" + fileNameDownload;
            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
            File file = new File(ruta);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Auditoria");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            CellStyle bodyStyle_amt = workbook.createCellStyle();
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

            bodyStyle_amt.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle_amt.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle_amt.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle_amt.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle_amt.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setAlignment(CellStyle.ALIGN_RIGHT);
            bodyStyle_amt.setDataFormat(workbook.createDataFormat().getFormat("#,##0.00")); // Formato numérico con dos decimales y separador de miles        

            // </editor-fold>
            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Estado");
            Cell CH1_01 = row.createCell(0);
            CH1_01.setCellValue("IATA");
            Cell CH1_02 = row.createCell(1);
            CH1_02.setCellValue("DIG IATA");
            Cell CH1_03 = row.createCell(2);
            CH1_03.setCellValue("AGENCIA");
            Cell CH1_04 = row.createCell(3);
            CH1_04.setCellValue("TIQUETE");
            Cell CH1_05 = row.createCell(4);
            CH1_05.setCellValue("TIPO");
            Cell CH1_06 = row.createCell(5);
            CH1_06.setCellValue("FECHA VENTA");
            Cell CH1_07 = row.createCell(6);
            CH1_07.setCellValue("TARJETA CREDITO");
            Cell CH1_08 = row.createCell(7);
            CH1_08.setCellValue("AUT");
            Cell CH1_09 = row.createCell(8);
            CH1_09.setCellValue("VALOR");
            /**/
            Cell CH1_10 = row.createCell(9);
            CH1_10.setCellValue("FECHA");
            Cell CH1_11 = row.createCell(10);
            CH1_11.setCellValue("AUTORIZACION");
            Cell CH1_12 = row.createCell(11);
            CH1_12.setCellValue("VALOR");
            Cell CH1_13 = row.createCell(12);
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 13, 13));

//            CH1_00.setCellStyle(headerStyle);
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

            /**
             * ********************
             */
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
//                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(0);
                Cell cell52 = row.createCell(1);
                Cell cell53 = row.createCell(2);
                Cell cell54 = row.createCell(3);
                Cell cell55 = row.createCell(4);
                Cell cell56 = row.createCell(5);
                Cell cell57 = row.createCell(6);
                Cell cell58 = row.createCell(7);
                Cell cell59 = row.createCell(8);
                Cell cell60 = row.createCell(9);
                Cell cell61 = row.createCell(10);
                Cell cell62 = row.createCell(11);
                Cell cell63 = row.createCell(12);

//                cell50.setCellValue(listaData.get(vi).STVAL);
                cell51.setCellValue(listaData.get(vi).SAGENT);
                cell52.setCellValue(listaData.get(vi).DIG_AGENT);
                cell53.setCellValue(listaData.get(vi).strDescripcion);
                cell54.setCellValue(listaData.get(vi).CCIA + listaData.get(vi).FORMA + listaData.get(vi).SERIE);
                cell55.setCellValue("");
                cell56.setCellValue(listaData.get(vi).SDATE);
                cell57.setCellValue(listaData.get(vi).SCARDN);
                cell58.setCellValue(listaData.get(vi).SAUTHOC);
//                cell59.setCellValue(df.format(listaData.get(vi).SVFOP));
                cell59.setCellValue(listaData.get(vi).SVFOP);
                cell60.setCellValue("");
                cell61.setCellValue("");
                cell62.setCellValue("");
                cell63.setCellValue("");

//                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);
                cell56.setCellStyle(bodyStyle);
                cell57.setCellStyle(bodyStyle);
                cell58.setCellStyle(bodyStyle);
                cell59.setCellStyle(bodyStyle_amt);
                cell60.setCellStyle(bodyStyle);
                cell61.setCellStyle(bodyStyle);
                cell62.setCellStyle(bodyStyle);
                cell63.setCellStyle(bodyStyle);

                /**
                 * ********************
                 */
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
//            sheet.autoSizeColumn(13, true);

            // Escritura del contenido en el archivo Excel
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();

        } catch (Exception e) {
            ruta = "";
            e.printStackTrace();
            throw new SpringException(e);
        }

        return ruta;
    }

    public String obtenerExcel_BPO_enviarCorreo(List<MPF100Filter> listaData, String fecha, String contactos_BPO) {
        String Mensaje = "";
        DecimalFormat df = new DecimalFormat("#,###,###.00");
        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');
        df.setDecimalFormatSymbols(otherSymbols);

        String fileNameDownload = String.format("Correos Faltante Fecha de Venta - " + fecha + "_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        String ruta = "";
        try {
            ruta = "C:\\Dumps\\" + fileNameDownload;
            Workbook workbook = null;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
            File file = new File(ruta);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Agent");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle headerStyle = workbook.createCellStyle();
            CellStyle bodyStyle = workbook.createCellStyle();
            CellStyle bodyStyle_amt = workbook.createCellStyle();
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

            bodyStyle_amt.setBorderRight(CellStyle.BORDER_THIN);
            bodyStyle_amt.setRightBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStyle_amt.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStyle_amt.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setBorderTop(CellStyle.BORDER_THIN);
            bodyStyle_amt.setTopBorderColor(IndexedColors.BLACK.getIndex());
            bodyStyle_amt.setAlignment(CellStyle.ALIGN_RIGHT);

            // </editor-fold>
            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);

//            Cell CH1_00 = row.createCell(0);
//            CH1_00.setCellValue("Type Doc");
            Cell CH1_01 = row.createCell(0);
            CH1_01.setCellValue("Agent");
            Cell CH1_02 = row.createCell(1);
            CH1_02.setCellValue("Name");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));

//            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);

            /**
             * ********************
             */
            /*SE AUMENTA 2 PARA COMENZAR A ESCRIBIR  A PARTIR DE LA 3ERA FILA*/
            ++vj;
            ++vj;

            // </editor-fold>
            while (iter.hasNext()) {
                row = sheet.createRow(vj);

                // <editor-fold defaultstate="collapsed" desc="Iterativo">
                Cell cell50 = row.createCell(0);
                Cell cell51 = row.createCell(1);

                cell50.setCellValue(listaData.get(vi).SAGENT);
                cell51.setCellValue(listaData.get(vi).strDescripcion);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);

                /**
                 * ********************
                 */
                iter.next();
                ++vi;
                ++vj;
            }

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
//            sheet.autoSizeColumn(14, true);

            // Escritura del contenido en el archivo Excel
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();

        } catch (Exception e) {
            ruta = "";
            e.printStackTrace();
            throw new SpringException(e);
        }

        if (!ruta.equals("")) {

            boolean iboolean;
            String ruta_file = ruta;
            //CODIGO DE MAIL Y SU ATTACHMENT
            ProMail proMail = new ProMail();
            List<String> receptores = new ArrayList<String>();
            List<String> adjuntos = new ArrayList<String>();

            if (!ruta_file.equals("")) {
                adjuntos.add(ruta_file);
//                            if(!ruta_file_adjust.equals("")){
//                                adjuntos.add(ruta_file_adjust);   
//                            }
            }
            // Emails CC
            List<String> CC = new ArrayList<String>();
            List<String> Ccp = new ArrayList<String>();

            String correos_BPO = contactos_BPO;
//            String correos="jtorres@miatech.net";
            String correosCopia = "jtorres@miatech.net";
//                        String correosOcultos = "larango@miatech.net;eneves@miatech.net;jtorres@miatech.net;jsolano@miatech.net";
            String correosOcultos = "";

            /*Correo Destino*/
            if (!correos_BPO.trim().equals("")) {
                String[] partsTo = correos_BPO.split(";");
                for (int h = 0; h < partsTo.length; h++) {
                    if (!partsTo[h].trim().equals("")) {
                        receptores.add(partsTo[h]);
                    }
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
            String asunto = "Correos faltantantes " + Functions.getFechaActual();
            String mensaje = "<p>Estimados,</p>\n"
                    + "<p>Se Adjunta relaci&oacute;n de agentes sin correo para la fecha de venta : " + fecha + ".</p>\n"
                    + "<p>Favor completar informaci&oacute;n de correo para el proceso de env&iacute;o&nbsp;a las agencias.</p>"
                    + "<p>Saludos,</p>\n"
                    + "<img src=\"cid:logoM\" />"
                    + "<p>&nbsp;</p>"
                    + "<p>&nbsp; Miami Technology Group inc.</p>\n"
                    + "<div><strong>&nbsp; </strong><strong>Rep&uacute;blica</strong><strong>&nbsp;de&nbsp;</strong><strong>Panam&aacute;</strong><strong>&nbsp;3030 - San Isidro, Lima Per&uacute;</strong></div>\n";
            iboolean = proMail.enviaCorreoMiatech("", asunto, receptores, CC, Ccp, mensaje, adjuntos, this.serverSession.getServerSession());

            if (iboolean) {
                Mensaje = "OK";
            }

            /*Eliminamos archivo temporal*/
            File file = new File(ruta_file);
            if (file.exists()) {
                file.delete();
            }

        }

        return Mensaje;
    }

    @RequestMapping(value = "setUploadADM", method = RequestMethod.POST)
    public @ResponseBody
    String setUploadADM(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request, HttpServletResponse response) throws IOException, Exception {

        byte[] bytes = null;
        String message = "";
        String message2 = "";
        String filename = "";

        try {

            byte[] dataFile = excelfile.getBytes();
            filename = request.getParameter("filename");

            message = uploadFileADM(dataFile);
            message2 = uploadFileWithoutADM(dataFile);

            map.put("success", true);
            map.put("msjResult", message);
            map.put("msjResult2", message2);
        } catch (Exception e) {
            map.put("success", false);
            map.put("msjResult", message);
            map.put("msjResult2", message2);
        }
        return new Gson().toJson(map);
    }

    private String uploadFileADM(byte[] bytes) throws Exception {

        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String message = "";
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Revision." + strSesion + ".xlsx";

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter dataFormatter = new DataFormatter(Locale.US);
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            List<MPF100Filter> listData = new ArrayList<>(0);

            try {

                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();

                    if (row.getRowNum() >= 1) {
                        MPF100Filter obj = new MPF100Filter();

                        obj.ID = dataFormatter.formatCellValue(row.getCell(0));
                        obj.CCIA = dataFormatter.formatCellValue(row.getCell(1));
                        obj.FORMASERIE = dataFormatter.formatCellValue(row.getCell(2));
                        obj.COUPON = dataFormatter.formatCellValue(row.getCell(3));
                        obj.FARECLAS = dataFormatter.formatCellValue(row.getCell(4));
                        obj.EMISSION = dataFormatter.formatCellValue(row.getCell(5));
                        obj.IATA = dataFormatter.formatCellValue(row.getCell(6));
                        obj.ORIGIN = dataFormatter.formatCellValue(row.getCell(7));
                        obj.DESTINATION = dataFormatter.formatCellValue(row.getCell(8));
                        obj.FAREAMOUNT = dataFormatter.formatCellValue(row.getCell(9));
                        obj.PENALTY = dataFormatter.formatCellValue(row.getCell(10));
                        obj.COMMISSION = dataFormatter.formatCellValue(row.getCell(11));
                        obj.ADM = dataFormatter.formatCellValue(row.getCell(12));
                        if( obj.FORMASERIE.equals("") ){
                            continue;
                        }
                        listData.add(obj);
                    }
                }

                message = logic.loadPX263loadADM(listData);

            } catch (Exception e) {
                message = e.getMessage();
                e.printStackTrace();
            }
            //Eliminar temporal           
            archivo.delete();
        } catch (Exception e) {
            message = e.getMessage();
            e.printStackTrace();
        }
        return message;
    }
    
    private String uploadFileWithoutADM(byte[] bytes) throws Exception {

        Functions.msjConsola("PRAXISMP", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String message = "";
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "Revision." + strSesion + ".xlsx";

            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            DataFormatter dataFormatter = new DataFormatter(Locale.US);
            FileInputStream file = new FileInputStream(new File(strArchivo));
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            XSSFSheet sheet = worbook.getSheetAt(2);
            Iterator<Row> rowIterator = sheet.iterator();
            List<MPF100Filter> listData = new ArrayList<>(0);

            try {

                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();

                    if (row.getRowNum() >= 1) {
                        MPF100Filter obj = new MPF100Filter();

                        obj.ID = dataFormatter.formatCellValue(row.getCell(0));
                        obj.CCIA = dataFormatter.formatCellValue(row.getCell(1));
                        obj.FORMASERIE = dataFormatter.formatCellValue(row.getCell(2));
                        obj.COUPON = dataFormatter.formatCellValue(row.getCell(3));
                        obj.CERROR = dataFormatter.formatCellValue(row.getCell(13));
                        if( obj.FORMASERIE.equals("") ){
                            continue;
                        }
                        
                        listData.add(obj);
                    }
                }

                message = logic.loadPX263loadWithoutADM(listData);

            } catch (Exception e) {
                message = e.getMessage();
                e.printStackTrace();
            }
            //Eliminar temporal           
            archivo.delete();
        } catch (Exception e) {
            message = e.getMessage();
            e.printStackTrace();
        }
        return message;
    }

    @RequestMapping(value = "searchDetalleSettl")
    public @ResponseBody
    String searchDetalleSettl(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BankReconciliation : getListDetalleSettl-------------");

        map.put("success", true);

        List<A2290Filter> lst = this.getListDetalleSettl(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListDetalleSettl(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQP00698DetalleSettl(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    
    
     ///////////////////////////////////////////////////////////////////////
    ////////////EXCEL DESCARGA API///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    

    @RequestMapping(value = "downloadTicketsDetail", method = RequestMethod.POST)
    public ResponseEntity<?> downloadTicketsDetail(@RequestBody A2290Filter filter) throws Exception {
        System.out.println("***** DowloadTicketsDetail  - Detail Tickets *****");
        String zipName = "TicketDetailFile_" + Functions.getFechaActual() + Functions.getHoraActual();
        Gson gson = new Gson();
        Map<String, Object> map = new HashMap();
        map.put("IN_CCUST", cs.getServerSession().getUserView().getCustomerInfo().CCUST.trim());
        map.put("IN_DATEF", filter.IN_FECHA_FROM.trim());
        map.put("IN_DATET", filter.IN_FECHA_TO.trim());
        map.put("IN_TDOC", filter.IN_TDOC.trim());
        map.put("IN_SCURRENCY", filter.IN_SCURRENCY.trim());
        map.put("IN_SCOUNTRY", filter.IN_SCOUNTRY.trim());
        map.put("IN_TP", filter.IN_TP.trim());
        map.put("IN_STAT", filter.IN_STAT.trim());
    

        byte[] file = ws.getFile(gson.toJson(map), "SalesTicketDetail/downloadDetailExcel");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", zipName + ".zip");
        return new ResponseEntity<>(file, headers, HttpStatus.OK);

    }

 ////////////CONTADOR///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    
    @RequestMapping(value = "getContador")
    @ResponseBody
    public String getContador(ModelMap map,HttpServletRequest request) {
        
        System.out.println("-------------- Sales Conci : getContador -------------");
        try {
            // Crear instancia de la lógica
            LoadConciliationLogic logic = new LoadConciliationLogic();
            logic.setSession(this.serverSession.getServerSession()); // si necesitas pasar sesión

            A2290Filter filter = new A2290Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            // Llamar método para obtener cont  ador
            String contador = logic.loadContador(filter);

            map.put("success", true);
            map.put("cantidad", contador);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("mensaje", "Error al obtener el contador");
        }
        return new Gson().toJson(map);
    }
    
    

    
}
