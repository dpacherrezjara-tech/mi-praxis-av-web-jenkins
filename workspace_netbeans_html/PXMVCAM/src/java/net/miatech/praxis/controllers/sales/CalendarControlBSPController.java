package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX036S01A1529Filter;
import net.miatech.beans.PX115S01A1529Filter;
import net.miatech.beans.SQP00149Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CalendarControlBSPLogic;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.Functions;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;
// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/CalendarControlBSP")
public class CalendarControlBSPController extends BaseController {

    private CalendarControlBSPLogic logic;
    private PX115S01A1529Filter filter;
    private SQP00149Filter filter2;
    
 

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        filter = new PX115S01A1529Filter();

        List<PX115S01A1529Filter> oList = new ArrayList<PX115S01A1529Filter>(0);
        ArrayList<HashMap> lista = new ArrayList<HashMap>();
        ArrayList<HashMap> lstmonth = new ArrayList<HashMap>();
        ArrayList<HashMap> lstweek = new ArrayList<HashMap>();
        ArrayList<HashMap> lstfechas = new ArrayList<HashMap>();

        String fechaActual = "";
        Date ahora = new Date();
        SimpleDateFormat formateador = new SimpleDateFormat("yyyyMMdd");
        fechaActual = formateador.format(ahora);
        try {
            filter.IN_A1529ISOC = request.getParameter("IN_A1529ISOC").trim();
            filter.IN_A1529BAED = request.getParameter("IN_A1529BAED").trim();
            filter.IN_A1529CUTO = request.getParameter("IN_A1529CUTO").trim();

            logic = new CalendarControlBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            oList = logic.loadPX115S01A1529(filter);

            String vl_qtr = "";
            String vl_month = "";
            String vl_month_vl = "";
            String vl_monday = "", vl_monday_comm = "";
            Integer vl_monday_cant = 0, vl_monday_error = 0, vl_monday_cantSale = 0;
            String vl_tuesday = "", vl_tuesday_comm = "";
            Integer vl_tuesday_cant = 0, vl_tuesday_error = 0, vl_tuesday_cantSale = 0;
            String vl_wednesday = "", vl_wednesday_comm = "";
            Integer vl_wednesday_cant = 0, vl_wednesday_error = 0, vl_wednesday_cantSale = 0;
            String vl_thursday = "", vl_thursday_comm = "";
            Integer vl_thursday_cant = 0, vl_thursday_error = 0, vl_thursday_cantSale = 0;
            String vl_friday = "", vl_friday_comm = "";
            Integer vl_friday_cant = 0, vl_friday_error = 0, vl_friday_cantSale = 0;
            String vl_saturday = "", vl_saturday_comm = "";
            Integer vl_saturday_cant = 0, vl_saturday_error = 0, vl_saturday_cantSale = 0;
            String vl_sunday = "", vl_sunday_comm = "";
            Integer vl_sunday_cant = 0, vl_sunday_error = 0, vl_sunday_cantSale = 0;
            String vl_monday_St = "#000000";
            String vl_tuesday_St = "#000000";
            String vl_wednesday_St = "#000000";
            String vl_thursday_St = "#000000";
            String vl_friday_St = "#000000";
            String vl_saturday_St = "#000000";
            String vl_sunday_St = "#000000";
            int contFechas = 0;
            int contMonth = 0;
            int contGeneral = 0;
            String vl_period = oList.get(0).A1529PERI;
            String vl_from = oList.get(0).A1529RPTO;
            String vl_to = oList.get(0).A1529BAED;
            String A1529BAIR = oList.get(0).A1529BAIR;
            String A1529REMW = oList.get(0).A1529REMW;
            String A1529SETW = oList.get(0).A1529SETW;
            boolean b = false;
            for (int i = 0; i < oList.size(); i++) {
                HashMap fechas = new HashMap();
                if (!vl_period.equals(oList.get(i).A1529PERI) || b) {
                    if (!b) {
                        vl_from = "";
                        vl_to = "";
                        A1529REMW = "";
                        A1529SETW = "";
                    }
                    fechas.put("MONDAY", vl_monday);
                    fechas.put("MONDAY_COMM", vl_monday_comm);
                    fechas.put("MONDAY_CANT", vl_monday_cant);
                    fechas.put("MONDAY_ERROR", vl_monday_error);
                    fechas.put("MONDAY_CANTSALE", vl_monday_cantSale);
                    fechas.put("MONDAY_COLOR", vl_monday_St);
                    fechas.put("TUESDAY", vl_tuesday);
                    fechas.put("TUESDAY_COMM", vl_tuesday_comm);
                    fechas.put("TUESDAY_CANT", vl_tuesday_cant);
                    fechas.put("TUESDAY_ERROR", vl_tuesday_error);
                    fechas.put("TUESDAY_CANTSALE", vl_tuesday_cantSale);
                    fechas.put("TUESDAY_COLOR", vl_tuesday_St);
                    fechas.put("WEDNESDAY", vl_wednesday);
                    fechas.put("WEDNESDAY_COMM", vl_wednesday_comm);
                    fechas.put("WEDNESDAY_CANT", vl_wednesday_cant);
                    fechas.put("WEDNESDAY_ERROR", vl_wednesday_error);
                    fechas.put("WEDNESDAY_CANTSALE", vl_wednesday_cantSale);
                    fechas.put("WEDNESDAY_COLOR", vl_wednesday_St);
                    fechas.put("THURSDAY", vl_thursday);
                    fechas.put("THURSDAY_COMM", vl_thursday_comm);
                    fechas.put("THURSDAY_CANT", vl_thursday_cant);
                    fechas.put("THURSDAY_ERROR", vl_thursday_error);
                    fechas.put("THURSDAY_CANTSALE", vl_thursday_cantSale);
                    fechas.put("THURSDAY_COLOR", vl_thursday_St);
                    fechas.put("FRIDAY", vl_friday);
                    fechas.put("FRIDAY_COMM", vl_friday_comm);
                    fechas.put("FRIDAY_CANT", vl_friday_cant);
                    fechas.put("FRIDAY_ERROR", vl_friday_error);
                    fechas.put("FRIDAY_CANTSALE", vl_friday_cantSale);
                    fechas.put("FRIDAY_COLOR", vl_friday_St);
                    fechas.put("SATURDAY", vl_saturday);
                    fechas.put("SATURDAY_COMM", vl_saturday_comm);
                    fechas.put("SATURDAY_CANT", vl_saturday_cant);
                    fechas.put("SATURDAY_ERROR", vl_saturday_error);
                    fechas.put("SATURDAY_CANTSALE", vl_saturday_cantSale);
                    fechas.put("SATURDAY_COLOR", vl_saturday_St);
                    fechas.put("SUNDAY", vl_sunday);
                    fechas.put("SUNDAY_COMM", vl_sunday_comm);
                    fechas.put("SUNDAY_CANT", vl_sunday_cant);
                    fechas.put("SUNDAY_ERROR", vl_sunday_error);
                    fechas.put("SUNDAY_CANTSALE", vl_sunday_cantSale);
                    fechas.put("SUNDAY_COLOR", vl_sunday_St);
                    fechas.put("PERIOD", vl_period);
                    fechas.put("FROM", vl_from);
                    fechas.put("TO", vl_to);
                    fechas.put("A1529BAIR", A1529BAIR);
                    fechas.put("A1529REMW", A1529REMW);
                    fechas.put("A1529SETW", A1529SETW);
                    lstfechas.add(contFechas, fechas);
                    contFechas++;
                    contMonth = 1;
                    vl_monday = "";
                    vl_monday_comm = "";
                    vl_monday_cant = 0;
                    vl_monday_error = 0;
                    vl_monday_cantSale = 0;
                    vl_tuesday = "";
                    vl_tuesday_comm = "";
                    vl_tuesday_cant = 0;
                    vl_tuesday_error = 0;
                    vl_tuesday_cantSale = 0;
                    vl_wednesday = "";
                    vl_wednesday_comm = "";
                    vl_wednesday_cant = 0;
                    vl_wednesday_error = 0;
                    vl_wednesday_cantSale = 0;
                    vl_thursday = "";
                    vl_thursday_comm = "";
                    vl_thursday_cant = 0;
                    vl_thursday_error = 0;
                    vl_thursday_cantSale = 0;
                    vl_friday = "";
                    vl_friday_comm = "";
                    vl_friday_cant = 0;
                    vl_friday_error = 0;
                    vl_friday_cantSale = 0;
                    vl_saturday = "";
                    vl_saturday_comm = "";
                    vl_saturday_cant = 0;
                    vl_saturday_error = 0;
                    vl_saturday_cantSale = 0;
                    vl_sunday = "";
                    vl_sunday_comm = "";
                    vl_sunday_cant = 0;
                    vl_sunday_error = 0;
                    vl_sunday_cantSale = 0;
                    vl_monday_St = "#000000";
                    vl_tuesday_St = "#000000";
                    vl_wednesday_St = "#000000";
                    vl_thursday_St = "#000000";
                    vl_friday_St = "#000000";
                    vl_saturday_St = "#000000";
                    vl_sunday_St = "#000000";
                    vl_period = oList.get(i).A1529PERI;
                    vl_from = oList.get(i).A1529RPTO;
                    vl_to = oList.get(i).A1529BAED;
                    A1529BAIR = oList.get(i).A1529BAIR;
                    A1529REMW = oList.get(i).A1529REMW;
                    A1529SETW = oList.get(i).A1529SETW;
                    b = false;
                }
                switch (oList.get(i).A1529PCYC) {
                    case "2":
                        vl_monday = oList.get(i).A1529PRDA;
                        vl_monday_comm = oList.get(i).A1698_COMEN;
                        vl_monday_cant = oList.get(i).A1698_TAPES;
                        vl_monday_error = oList.get(i).A1698_ERRORS;
                        vl_monday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_monday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "3":
                        vl_tuesday = oList.get(i).A1529PRDA;
                        vl_tuesday_comm = oList.get(i).A1698_COMEN;
                        vl_tuesday_cant = oList.get(i).A1698_TAPES;
                        vl_tuesday_error = oList.get(i).A1698_ERRORS;
                        vl_tuesday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_tuesday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "4":
                        vl_wednesday = oList.get(i).A1529PRDA;
                        vl_wednesday_comm = oList.get(i).A1698_COMEN;
                        vl_wednesday_cant = oList.get(i).A1698_TAPES;
                        vl_wednesday_error = oList.get(i).A1698_ERRORS;
                        vl_wednesday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_wednesday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "5":
                        vl_thursday = oList.get(i).A1529PRDA;
                        vl_thursday_comm = oList.get(i).A1698_COMEN;
                        vl_thursday_cant = oList.get(i).A1698_TAPES;
                        vl_thursday_error = oList.get(i).A1698_ERRORS;
                        vl_thursday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_thursday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "6":
                        vl_friday = oList.get(i).A1529PRDA;
                        vl_friday_comm = oList.get(i).A1698_COMEN;
                        vl_friday_cant = oList.get(i).A1698_TAPES;
                        vl_friday_error = oList.get(i).A1698_ERRORS;
                        vl_friday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_friday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "7":
                        vl_saturday = oList.get(i).A1529PRDA;
                        vl_saturday_comm = oList.get(i).A1698_COMEN;
                        vl_saturday_cant = oList.get(i).A1698_TAPES;
                        vl_saturday_error = oList.get(i).A1698_ERRORS;
                        vl_saturday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_saturday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "1":
                        vl_sunday = oList.get(i).A1529PRDA;
                        vl_sunday_comm = oList.get(i).A1698_COMEN;
                        vl_sunday_cant = oList.get(i).A1698_TAPES;
                        vl_sunday_error = oList.get(i).A1698_ERRORS;
                        vl_sunday_cantSale = oList.get(i).A1698_SALEWO;
                        if (Integer.parseInt(oList.get(i).A1529PRDA) <= Integer.parseInt(fechaActual)) {
                            vl_sunday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        b = true;
//                        if (vl_from.length()>0 && vl_monday.length()>0) {
//                            if (Integer.parseInt(vl_monday) > Integer.parseInt(vl_from)) {
//                                vl_from = "";
//                                vl_to = "";
//                                A1529REMW = "";
//                                A1529SETW = "";
//                            }
//                        }
                        break;
                }
                HashMap month = new HashMap();
                HashMap week = new HashMap();

                if (i == oList.size() - 1) {
                    fechas = new HashMap();
                    fechas.put("MONDAY", vl_monday);
                    fechas.put("MONDAY_COMM", vl_monday_comm);
                    fechas.put("MONDAY_CANT", vl_monday_cant);
                    fechas.put("MONDAY_ERROR", vl_monday_error);
                    fechas.put("MONDAY_CANTSALE", vl_monday_cantSale);
                    fechas.put("MONDAY_COLOR", vl_monday_St);
                    fechas.put("TUESDAY", vl_tuesday);
                    fechas.put("TUESDAY_COMM", vl_tuesday_comm);
                    fechas.put("TUESDAY_CANT", vl_tuesday_cant);
                    fechas.put("TUESDAY_ERROR", vl_tuesday_error);
                    fechas.put("TUESDAY_CANTSALE", vl_tuesday_cantSale);
                    fechas.put("TUESDAY_COLOR", vl_tuesday_St);
                    fechas.put("WEDNESDAY", vl_wednesday);
                    fechas.put("WEDNESDAY_COMM", vl_wednesday_comm);
                    fechas.put("WEDNESDAY_CANT", vl_wednesday_cant);
                    fechas.put("WEDNESDAY_ERROR", vl_wednesday_error);
                    fechas.put("WEDNESDAY_CANTSALE", vl_wednesday_cantSale);
                    fechas.put("WEDNESDAY_COLOR", vl_wednesday_St);
                    fechas.put("THURSDAY", vl_thursday);
                    fechas.put("THURSDAY_COMM", vl_thursday_comm);
                    fechas.put("THURSDAY_CANT", vl_thursday_cant);
                    fechas.put("THURSDAY_ERROR", vl_thursday_error);
                    fechas.put("THURSDAY_CANTSALE", vl_thursday_cantSale);
                    fechas.put("THURSDAY_COLOR", vl_thursday_St);
                    fechas.put("FRIDAY", vl_friday);
                    fechas.put("FRIDAY_COMM", vl_friday_comm);
                    fechas.put("FRIDAY_CANT", vl_friday_cant);
                    fechas.put("FRIDAY_ERROR", vl_friday_error);
                    fechas.put("FRIDAY_CANTSALE", vl_friday_cantSale);
                    fechas.put("FRIDAY_COLOR", vl_friday_St);
                    fechas.put("SATURDAY", vl_saturday);
                    fechas.put("SATURDAY_COMM", vl_saturday_comm);
                    fechas.put("SATURDAY_CANT", vl_saturday_cant);
                    fechas.put("SATURDAY_ERROR", vl_saturday_error);
                    fechas.put("SATURDAY_CANTSALE", vl_saturday_cantSale);
                    fechas.put("SATURDAY_COLOR", vl_saturday_St);
                    fechas.put("SUNDAY", vl_sunday);
                    fechas.put("SUNDAY_COMM", vl_sunday_comm);
                    fechas.put("SUNDAY_CANT", vl_sunday_cant);
                    fechas.put("SUNDAY_ERROR", vl_sunday_error);
                    fechas.put("SUNDAY_CANTSALE", vl_sunday_cantSale);
                    fechas.put("SUNDAY_COLOR", vl_sunday_St);
                    fechas.put("PERIOD", vl_period);
                    /*fechas.put("FROM", "");
                    fechas.put("TO", "");
                    fechas.put("A1529BAIR", "");
                    fechas.put("A1529REMW", "");
                    fechas.put("A1529SETW", "");*/
                    fechas.put("FROM", vl_from);
                    fechas.put("TO", vl_to);
                    fechas.put("A1529BAIR", A1529BAIR);
                    fechas.put("A1529REMW", A1529REMW);
                    fechas.put("A1529SETW", A1529SETW);
                    lstfechas.add(contFechas, fechas);
                    contFechas++;
                    month = new HashMap();
                    week = new HashMap();
                    week.put("VALOR", vl_month_vl);
                    week.put("PD", lstfechas);
                    lstweek.add(week);
                    month.put("MONTHS", lstweek);
                    lstmonth.add(month);
                    HashMap qtr = new HashMap();
                    qtr.put("VALOR", vl_qtr + "Q");
                    qtr.put("QTR", lstmonth);
                    lista.add(qtr);
                }

                if (contMonth == 1 && (!vl_month.equals(oList.get(i).A1529MESB))) {
                    week.put("VALOR", vl_month_vl);
                    week.put("PD", lstfechas);
                    lstweek.add(week);
                    month.put("MONTHS", lstweek);
                    lstmonth.add(month);
                    contMonth = 0;
                    contGeneral = 1;
                    lstfechas = new ArrayList<HashMap>();
                    contFechas = 0;
                    lstweek = new ArrayList<HashMap>();
                }

                if (!vl_month.equals(oList.get(i).A1529MESB)) {
                    vl_month = oList.get(i).A1529MESB;
                    switch (vl_month) {
                        case "01":
                            vl_month_vl = "JAN";
                            break;
                        case "02":
                            vl_month_vl = "FEB";
                            break;
                        case "03":
                            vl_month_vl = "MAR";
                            break;
                        case "04":
                            vl_month_vl = "APR";
                            break;
                        case "05":
                            vl_month_vl = "MAY";
                            break;
                        case "06":
                            vl_month_vl = "JUN";
                            break;
                        case "07":
                            vl_month_vl = "JUL";
                            break;
                        case "08":
                            vl_month_vl = "AUG";
                            break;
                        case "09":
                            vl_month_vl = "SEP";
                            break;
                        case "10":
                            vl_month_vl = "OCT";
                            break;
                        case "11":
                            vl_month_vl = "NOV";
                            break;
                        case "12":
                            vl_month_vl = "DEC";
                            break;
                    }
                }

                HashMap qtr = new HashMap();
                if ((contGeneral == 1 && !vl_qtr.equals(oList.get(i).A1529CUART))) {
                    qtr.put("VALOR", vl_qtr + "Q");
                    qtr.put("QTR", lstmonth);
                    lista.add(qtr);
                    contGeneral = 0;
                    lstmonth = new ArrayList<HashMap>();
                }
                if (!vl_qtr.equals(oList.get(i).A1529CUART)) {
                    vl_qtr = oList.get(i).A1529CUART;
                }
            }

            map.put("success", true);
            map.put("total", oList.size());
            map.put("oList", oList);
            map.put("data", lista);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    String Style(Integer cant, Integer cantSale, Integer error) {
        String style = "#FF0000";
        if (cant == 1) {
            if (cantSale > 0) {
                style = "#FFCC00";
            } else {
                if (error == 0) {
                    style = "#339900";
                } else {
                    style = "#CC9900";
                }
            }
        }
        return style;
    }

    @RequestMapping(value = "/updateObservation")
    public @ResponseBody
    String updateObservation(ModelMap map, HttpServletRequest request) {
        filter2 = new SQP00149Filter();
        try {
            filter2.IN_A1529ISOC = request.getParameter("IN_A1529ISOC").trim();
            filter2.IN_A1529BAED = request.getParameter("IN_A1529BAED").trim();
            filter2.IN_A1529PRDA = request.getParameter("IN_A1529PRDA").trim();
            filter2.IN_A1698COMEN = request.getParameter("IN_A1698COMEN").trim();

            logic = new CalendarControlBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.setSQP00149(filter2);

            map.put("success", true);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        PX036S01A1529Filter filter = new PX036S01A1529Filter();
        String fileNameDownload = String.format("PX115_" + Functions.getFechaActual() + "_BSP_Calendar_Control.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
//            filter.IN_A1529ISOC = request.getParameter("IN_A1529ISOC").trim();
//            filter.IN_A1529ANIO = request.getParameter("IN_A1529ANIO").trim();
            filter.page.PAGNUM = -1;
            filter.page.PAGROW = -1;
            filter.page.TOTPAG = -1;
            filter.page.TOTROW = -1;
            logic = new CalendarControlBSPLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX036S01A1529Filter> listaData = logic.loadPX036S01A1529(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("BSP Calendar Control");
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
            // </editor-fold>

            Integer vi = 0;
            Integer vj = 0;
            Iterator iter = listaData.iterator();

            // <editor-fold defaultstate="collapsed" desc="Creación de Títulos">
            Row row = sheet.createRow(vj);
            Cell CH1_00 = row.createCell(0);
            CH1_00.setCellValue("Country");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Ending Date");
            Cell CH1_02 = row.createCell(2);
            CH1_02.setCellValue("Processing Date");
            Cell CH1_03 = row.createCell(3);
            CH1_03.setCellValue("Week");
            Cell CH1_04 = row.createCell(4);
            CH1_04.setCellValue("Cicle");
            Cell CH1_05 = row.createCell(5);
            CH1_05.setCellValue("Observation");

            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);
            CH1_02.setCellStyle(headerStyle);
            CH1_03.setCellStyle(headerStyle);
            CH1_04.setCellStyle(headerStyle);
            CH1_05.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);
            sheet.autoSizeColumn(2, true);
            sheet.autoSizeColumn(3, true);
            sheet.autoSizeColumn(4, true);
            sheet.autoSizeColumn(5, true);

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

                cell50.setCellValue(listaData.get(vi).A1529ISOC);
                cell51.setCellValue(listaData.get(vi).A1529BAED);
                cell52.setCellValue(listaData.get(vi).A1529PRDA);
                cell53.setCellValue(listaData.get(vi).A1529PDAIS);
                cell54.setCellValue(listaData.get(vi).A1529PCYC);
                cell55.setCellValue(listaData.get(vi).A1529OBS);

                cell50.setCellStyle(bodyStyle);
                cell51.setCellStyle(bodyStyle);
                cell52.setCellStyle(bodyStyle);
                cell53.setCellStyle(bodyStyle);
                cell54.setCellStyle(bodyStyle);
                cell55.setCellStyle(bodyStyle);

                sheet.autoSizeColumn(0, true);
                sheet.autoSizeColumn(1, true);
                sheet.autoSizeColumn(2, true);
                sheet.autoSizeColumn(3, true);
                sheet.autoSizeColumn(4, true);
                sheet.autoSizeColumn(5, true);
                // </editor-fold>

                iter.next();
                ++vi;
                ++vj;
            }

            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }


}
