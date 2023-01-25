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
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.LoadConciliationTestLogic;
import net.miatech.praxis.payment.filter.A4164Filter;
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
@RequestMapping("/SalesReconciliationTest")
public class SalesReconciliationTestController extends BaseController {

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaDataSales = logic.loadPX584SQP04338(filter);

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

    @RequestMapping(value = "/searchCopy")
    public @ResponseBody
    String searchCopy(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaDataSales = logic.loadPX584SQP04730(filter);

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
    String searchDetCountry(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04340(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchDetCountryCopy")
    public @ResponseBody
    String searchDetCountryCopy(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04731(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchDetCardCode")
    public @ResponseBody
    String searchDetCardCode(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04344(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchDetCardCodeCopy")
    public @ResponseBody
    String searchDetCardCodeCopy(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04732(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchDetDay")
    public @ResponseBody
    String searchDetDay(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04345(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchDetTicket")
    public @ResponseBody
    String searchDetTicket(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04346(filter);

            map.put("success", true);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                map.put("data", listaData);
                map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
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

    @RequestMapping(value = "/searchCashMonth")
    public @ResponseBody
    String searchCashMonth(ModelMap map, HttpServletRequest request) {
        A4164Filter filter = new A4164Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2370Filter> listaDataCash = logic.loadPX584SQP00899(filter);

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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaDataCash = logic.loadPX584SQP00900(filter);

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
        A4164Filter filter = new A4164Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaDataCash = logic.loadPX584SQP00901(filter);

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
        A4164Filter filter = new A4164Filter();
        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX584SQP04347(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A4164Filter> listaData = hmResultado.get("TKT");
                List<A4164Filter> listaError = hmResultado.get("ERROR");

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
        A4164Filter filter = new A4164Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            A4164Filter bean = logic.loadPX584SQP04348(filter);

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
        List<A4164Filter> listaError = new ArrayList<A4164Filter>();
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04339(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX584SQP04349(filter);
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
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04339(filter);

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
        List<A4164Filter> listaError = new ArrayList<A4164Filter>();
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04341(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX584SQP04349(filter);
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
        List<A4164Filter> listaError = new ArrayList<A4164Filter>();
        A4164Filter filter = new A4164Filter();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04342(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, listaData);
//                map.put("nameExcel", nameExcel);
            } else {
                if (filter.IN_STVAL.equals("4") || filter.IN_STVAL.equals("5")) {
                    listaError = logic.loadPX584SQP04349(filter);
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
        List<A4164Filter> listaError = new ArrayList<A4164Filter>();
        A4164Filter filter = new A4164Filter();
        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX584SQP04343(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A4164Filter> listaData = hmResultado.get("TKT");
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
        A4164Filter filter = new A4164Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04350(filter);

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

    @RequestMapping(value = "/searchWarnTkts")
    public @ResponseBody
    String searchWarnTkts(ModelMap map, HttpServletRequest request) {
        A4164Filter filter = new A4164Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4164Filter> listaData = logic.loadPX584SQP04351(filter);

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
        A4164Filter filter = new A4164Filter();
        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();
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

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX584SQP04352(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                map.put("success", true);
                List<A4164Filter> listaData = hmResultado.get("TKT");
                List<A4164Filter> listaError = hmResultado.get("ERROR");
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
        A4164Filter filter = new A4164Filter();
        HashMap<String, List<A4164Filter>> hmResultado = new HashMap<String, List<A4164Filter>>();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());
            hmResultado = logic.loadPX584SQP04353(filter);

            if (dw_excel) {
                ExportUtil.exportFields(request, response, hmResultado.get("TKT"));
//                map.put("nameExcel", nameExcel);
            } else {
                List<A4164Filter> listaData = hmResultado.get("TKT");
                List<A4164Filter> listaError = hmResultado.get("ERROR");

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

    @RequestMapping(value = "getMoneda")
    public @ResponseBody
    String getMoneda(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- SalesReconciliAmex : getMoneda-------------");

        map.put("success", true);
        List<A4164Filter> lst = this.getListGetMoneda(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A4164Filter> getListGetMoneda(HttpServletRequest request, Boolean bExcel) {

        List<A4164Filter> lst = new ArrayList<>(0);
        A4164Filter filter = new A4164Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4164Filter.class);

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

            lst = logic.loadPX584SQP04604(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;

    }

    @RequestMapping(value = "MaintenanceBpoRevA4164")
    public @ResponseBody
    String MaintenanceBpoRevA4164(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- Sales Reconciliation by Ticket : MaintenanceBpoRevA4164-------------");
        String msj = "";
        try {
            Gson gson = new Gson();
            A4164Filter filter = new A4164Filter();
            A4164Filter result = new A4164Filter();

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A4164Filter.class);

            LoadConciliationTestLogic logic = new LoadConciliationTestLogic();
            logic.setSession(this.serverSession.getServerSession());

            msj = logic.loadPX584SQP04752(filter);
            map.put("result", result);

            if (msj.equals("")) {
                map.put("success", true);
            } else {
                map.put("success", false);
            }
        } catch (SQLException e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            msj = e.getMessage();
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + e.getMessage());
        }
        map.put("msjOption", msj);
        return new Gson().toJson(map);
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
