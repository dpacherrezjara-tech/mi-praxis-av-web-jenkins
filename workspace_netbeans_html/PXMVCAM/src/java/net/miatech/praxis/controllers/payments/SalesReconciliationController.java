package net.miatech.praxis.controllers.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.payments.LoadConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.utils.Functions;
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
}
