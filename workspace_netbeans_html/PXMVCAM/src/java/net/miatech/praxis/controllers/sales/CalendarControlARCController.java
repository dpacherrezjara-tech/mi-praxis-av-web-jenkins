package net.miatech.praxis.controllers.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.PX036S01A1527Filter;
import net.miatech.beans.SQP00146Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.CalendarControlARCLogic;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// </editor-fold>
/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/CalendarControlARC")
public class CalendarControlARCController extends BaseController {

    private CalendarControlARCLogic logic;

    private SQP00146Filter filter2;

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {

        List<PX036S01A1527Filter> oList = new ArrayList<>(0);
        PX036S01A1527Filter filter = new PX036S01A1527Filter();
        ArrayList<HashMap> lista = new ArrayList<>();
        ArrayList<HashMap> lstmonth = new ArrayList<>();
        ArrayList<HashMap> lstweek = new ArrayList<>();
        ArrayList<HashMap> lstfechas = new ArrayList<>();
        ArrayList<HashMap> lstfechasDis = new ArrayList<>();

        String fechaActual = "";
        String flagUlt = "";
        Date ahora = new Date();
        SimpleDateFormat formateador = new SimpleDateFormat("yyyyMMdd");
        fechaActual = formateador.format(ahora);
        try {
            logic = new CalendarControlARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            filter.IN_A1527PPED = request.getParameter("IN_A1527PPED");
            oList = logic.loadPX036S01A1527(filter);
            String vl_qtr = "";
            String vl_month = "";
            String vl_month_vl = "";
            String vl_friday = "", vl_friday_commELW = "", vl_friday_commIAP = "", vl_friday_commIAR = "";
            Integer vl_friday_cant = 0, vl_friday_error = 0, vl_friday_cantSale = 0, vl_friday_cantELW = 0, vl_friday_cantIAP = 0, vl_friday_cantIAR = 0;
            String vl_saturday = "", vl_saturday_commELW = "", vl_saturday_commIAP = "", vl_saturday_commIAR = "";
            Integer vl_saturday_cant = 0, vl_saturday_error = 0, vl_saturday_cantSale = 0, vl_saturday_cantELW = 0, vl_saturday_cantIAP = 0, vl_saturday_cantIAR = 0;
            String vl_sunday = "", vl_sunday_commELW = "", vl_sunday_commIAP = "", vl_sunday_commIAR = "";
            Integer vl_sunday_cant = 0, vl_sunday_error = 0, vl_sunday_cantSale = 0, vl_sunday_cantELW = 0, vl_sunday_cantIAP = 0, vl_sunday_cantIAR = 0;
            String vl_monday = "";
            String vl_tuesday = "";
            String vl_wednesday = "", vl_wednesday_commELW = "", vl_wednesday_commIAP = "", vl_wednesday_commIAR = "";
            Integer vl_wednesday_cant = 0, vl_wednesday_error = 0, vl_wednesday_cantSale = 0, vl_wednesday_cantELW = 0, vl_wednesday_cantIAP = 0, vl_wednesday_cantIAR = 0;
            String vl_thursday = "", vl_thursday_commELW = "", vl_thursday_commIAP = "", vl_thursday_commIAR = "";
            Integer vl_thursday_cant = 0, vl_thursday_error = 0, vl_thursday_cantSale = 0, vl_thursday_cantELW = 0, vl_thursday_cantIAP = 0, vl_thursday_cantIAR = 0;
            String vl_friday_St = "#000000";
            String vl_saturday_St = "#000000";
            String vl_sunday_St = "#000000";
            String vl_wednesday_St = "#000000";
            String vl_thursday_St = "#000000";
            int contFechas = 0;
            int contMonth = 0;
            int contGeneral = 0;
            String vl_week = oList.get(0).A1527PDIDS;
            String vl_period = oList.get(0).A1527PPED;
            String vl_thursday2 = "";
            String vl_fechaDisbursment = "";
            for (int i = 0; i < oList.size(); i++) {
                HashMap fechas = new HashMap();
                HashMap fechasDis = new HashMap();
                if (!vl_week.equals(oList.get(i).A1527PDIDS)) {
                    fechas.put("FRIDAY", vl_friday);
                    fechas.put("FRIDAY_COMMELW", vl_friday_commELW);
                    fechas.put("FRIDAY_COMMIAP", vl_friday_commIAP);
                    fechas.put("FRIDAY_COMMIAR", vl_friday_commIAR);
                    fechas.put("FRIDAY_CANT", vl_friday_cant);
                    fechas.put("FRIDAY_ERROR", vl_friday_error);
                    fechas.put("FRIDAY_CANTSALE", vl_friday_cantSale);
                    fechas.put("FRIDAY_CANTELW", vl_friday_cantELW);
                    fechas.put("FRIDAY_CANTIAP", vl_friday_cantIAP);
                    fechas.put("FRIDAY_CANTIAR", vl_friday_cantIAR);
                    fechas.put("FRIDAY_COLOR", vl_friday_St);
                    fechas.put("SATURDAY", vl_saturday);
                    fechas.put("SATURDAY_COMMELW", vl_saturday_commELW);
                    fechas.put("SATURDAY_COMMIAP", vl_saturday_commIAP);
                    fechas.put("SATURDAY_COMMIAR", vl_saturday_commIAR);
                    fechas.put("SATURDAY_CANT", vl_saturday_cant);
                    fechas.put("SATURDAY_ERROR", vl_saturday_error);
                    fechas.put("SATURDAY_CANTSALE", vl_saturday_cantSale);
                    fechas.put("SATURDAY_CANTELW", vl_saturday_cantELW);
                    fechas.put("SATURDAY_CANTIAP", vl_saturday_cantIAP);
                    fechas.put("SATURDAY_CANTIAR", vl_saturday_cantIAR);
                    fechas.put("SATURDAY_COLOR", vl_saturday_St);
                    fechas.put("SUNDAY", vl_sunday);
                    fechas.put("SUNDAY_COMMELW", vl_sunday_commELW);
                    fechas.put("SUNDAY_COMMIAP", vl_sunday_commIAP);
                    fechas.put("SUNDAY_COMMIAR", vl_sunday_commIAR);
                    fechas.put("SUNDAY_CANT", vl_sunday_cant);
                    fechas.put("SUNDAY_ERROR", vl_sunday_error);
                    fechas.put("SUNDAY_CANTSALE", vl_sunday_cantSale);
                    fechas.put("SUNDAY_CANTELW", vl_sunday_cantELW);
                    fechas.put("SUNDAY_CANTIAP", vl_sunday_cantIAP);
                    fechas.put("SUNDAY_CANTIAR", vl_sunday_cantIAR);
                    fechas.put("SUNDAY_COLOR", vl_sunday_St);
                    fechas.put("MONDAY", vl_monday);
                    fechas.put("TUESDAY", vl_tuesday);
                    fechas.put("WEDNESDAY", vl_wednesday);
                    fechas.put("WEDNESDAY_COMMELW", vl_wednesday_commELW);
                    fechas.put("WEDNESDAY_COMMIAP", vl_wednesday_commIAP);
                    fechas.put("WEDNESDAY_COMMIAR", vl_wednesday_commIAR);
                    fechas.put("WEDNESDAY_CANT", vl_wednesday_cant);
                    fechas.put("WEDNESDAY_ERROR", vl_wednesday_error);
                    fechas.put("WEDNESDAY_CANTSALE", vl_wednesday_cantSale);
                    fechas.put("WEDNESDAY_CANTELW", vl_wednesday_cantELW);
                    fechas.put("WEDNESDAY_CANTIAP", vl_wednesday_cantIAP);
                    fechas.put("WEDNESDAY_CANTIAR", vl_wednesday_cantIAR);
                    fechas.put("WEDNESDAY_COLOR", vl_wednesday_St);
                    fechas.put("THURSDAY1", vl_thursday);
                    fechas.put("THURSDAY1_COMMELW", vl_thursday_commELW);
                    fechas.put("THURSDAY1_COMMIAP", vl_thursday_commIAP);
                    fechas.put("THURSDAY1_COMMIAR", vl_thursday_commIAR);
                    fechas.put("THURSDAY1_CANT", vl_thursday_cant);
                    fechas.put("THURSDAY1_ERROR", vl_thursday_error);
                    fechas.put("THURSDAY1_CANTSALE", vl_thursday_cantSale);
                    fechas.put("THURSDAY1_CANTELW", vl_thursday_cantELW);
                    fechas.put("THURSDAY1_CANTIAP", vl_thursday_cantIAP);
                    fechas.put("THURSDAY1_CANTIAR", vl_thursday_cantIAR);
                    fechas.put("THURSDAY1_COLOR", vl_thursday_St);
                    fechas.put("WEEK", vl_week);
                    fechas.put("PED", vl_period);
                    fechas.put("THURSDAY2", vl_thursday2);
                    fechasDis.put("VALOR", vl_fechaDisbursment);
                    lstfechas.add(contFechas, fechas);
                    lstfechasDis.add(contFechas, fechasDis);
                    contFechas++;
                    contMonth = 1;
                    vl_friday = "";
                    vl_friday_commELW = "";
                    vl_friday_commIAP = "";
                    vl_friday_commIAR = "";
                    vl_friday_cant = 0;
                    vl_friday_error = 0;
                    vl_friday_cantSale = 0;
                    vl_friday_cantELW = 0;
                    vl_friday_cantIAP = 0;
                    vl_friday_cantIAR = 0;
                    vl_saturday = "";
                    vl_saturday_commELW = "";
                    vl_saturday_commIAP = "";
                    vl_saturday_commIAR = "";
                    vl_saturday_cant = 0;
                    vl_saturday_error = 0;
                    vl_saturday_cantSale = 0;
                    vl_saturday_cantELW = 0;
                    vl_saturday_cantIAP = 0;
                    vl_saturday_cantIAR = 0;
                    vl_sunday = "";
                    vl_sunday_commELW = "";
                    vl_sunday_commIAP = "";
                    vl_sunday_commIAR = "";
                    vl_sunday_cant = 0;
                    vl_sunday_error = 0;
                    vl_sunday_cantSale = 0;
                    vl_sunday_cantELW = 0;
                    vl_sunday_cantIAP = 0;
                    vl_sunday_cantIAR = 0;
                    vl_monday = "";
                    vl_tuesday = "";
                    vl_wednesday = "";
                    vl_wednesday_commELW = "";
                    vl_wednesday_commIAP = "";
                    vl_wednesday_commIAR = "";
                    vl_wednesday_cant = 0;
                    vl_wednesday_error = 0;
                    vl_wednesday_cantSale = 0;
                    vl_wednesday_cantELW = 0;
                    vl_wednesday_cantIAP = 0;
                    vl_wednesday_cantIAR = 0;
                    vl_thursday = "";
                    vl_thursday_commELW = "";
                    vl_thursday_commIAP = "";
                    vl_thursday_commIAR = "";
                    vl_thursday_cant = 0;
                    vl_thursday_error = 0;
                    vl_thursday_cantSale = 0;
                    vl_thursday_cantELW = 0;
                    vl_thursday_cantIAP = 0;
                    vl_thursday_cantIAR = 0;
                    vl_friday_St = "#000000";
                    vl_saturday_St = "#000000";
                    vl_sunday_St = "#000000";
                    vl_wednesday_St = "#000000";
                    vl_thursday_St = "#000000";
                    vl_week = oList.get(i).A1527PDIDS;
                    vl_period = oList.get(i).A1527PPED;
                    if (i == oList.size() - 1) {
                        flagUlt = "Y";
                    }
                }
                switch (oList.get(i).A1527PDIDC) {
                    case "1":
                        vl_friday = oList.get(i).A1527SODA;
                        vl_friday_commELW = oList.get(i).A1698_COMMEN_ELW;
                        vl_friday_commIAP = oList.get(i).A1698_COMMEN_IAP;
                        vl_friday_commIAR = oList.get(i).A1698_COMMEN_IAR;
                        vl_friday_cant = oList.get(i).A1698_TAPES;
                        vl_friday_error = oList.get(i).A1698_ERRORS;
                        vl_friday_cantSale = oList.get(i).A1698_SALEWO;
                        vl_friday_cantELW = oList.get(i).A1698_COUNT_ELW;
                        vl_friday_cantIAP = oList.get(i).A1698_COUNT_IAP;
                        vl_friday_cantIAR = oList.get(i).A1698_COUNT_IAR;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        if (Integer.parseInt(oList.get(i).A1527SODA) <= Integer.parseInt(fechaActual)) {
                            vl_friday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "2":
                        vl_saturday = oList.get(i).A1527SODA;
                        vl_saturday_commELW = oList.get(i).A1698_COMMEN_ELW;
                        vl_saturday_commIAP = oList.get(i).A1698_COMMEN_IAP;
                        vl_saturday_commIAR = oList.get(i).A1698_COMMEN_IAR;
                        vl_saturday_cant = oList.get(i).A1698_TAPES;
                        vl_saturday_error = oList.get(i).A1698_ERRORS;
                        vl_saturday_cantSale = oList.get(i).A1698_SALEWO;
                        vl_saturday_cantELW = oList.get(i).A1698_COUNT_ELW;
                        vl_saturday_cantIAP = oList.get(i).A1698_COUNT_IAP;
                        vl_saturday_cantIAR = oList.get(i).A1698_COUNT_IAR;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        if (Integer.parseInt(oList.get(i).A1527SODA) <= Integer.parseInt(fechaActual)) {
                            vl_saturday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "3":
                        vl_sunday = oList.get(i).A1527SODA;
                        vl_sunday_commELW = oList.get(i).A1698_COMMEN_ELW;
                        vl_sunday_commIAP = oList.get(i).A1698_COMMEN_IAP;
                        vl_sunday_commIAR = oList.get(i).A1698_COMMEN_IAR;
                        vl_sunday_cant = oList.get(i).A1698_TAPES;
                        vl_sunday_error = oList.get(i).A1698_ERRORS;
                        vl_sunday_cantSale = oList.get(i).A1698_SALEWO;
                        vl_sunday_cantELW = oList.get(i).A1698_COUNT_ELW;
                        vl_sunday_cantIAP = oList.get(i).A1698_COUNT_IAP;
                        vl_sunday_cantIAR = oList.get(i).A1698_COUNT_IAR;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        if (Integer.parseInt(oList.get(i).A1527SODA) <= Integer.parseInt(fechaActual)) {
                            vl_sunday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "4":
                        vl_monday = oList.get(i).A1527SODA;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        break;
                    case "5":
                        vl_tuesday = oList.get(i).A1527SODA;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        break;
                    case "6":
                        vl_wednesday = oList.get(i).A1527SODA;
                        vl_wednesday_commELW = oList.get(i).A1698_COMMEN_ELW;
                        vl_wednesday_commIAP = oList.get(i).A1698_COMMEN_IAP;
                        vl_wednesday_commIAR = oList.get(i).A1698_COMMEN_IAR;
                        vl_wednesday_cant = oList.get(i).A1698_TAPES;
                        vl_wednesday_error = oList.get(i).A1698_ERRORS;
                        vl_wednesday_cantSale = oList.get(i).A1698_SALEWO;
                        vl_wednesday_cantELW = oList.get(i).A1698_COUNT_ELW;
                        vl_wednesday_cantIAP = oList.get(i).A1698_COUNT_IAP;
                        vl_wednesday_cantIAR = oList.get(i).A1698_COUNT_IAR;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        if (Integer.parseInt(oList.get(i).A1527SODA) <= Integer.parseInt(fechaActual)) {
                            vl_wednesday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                    case "7":
                        vl_thursday = oList.get(i).A1527SODA;
                        vl_thursday_commELW = oList.get(i).A1698_COMMEN_ELW;
                        vl_thursday_commIAP = oList.get(i).A1698_COMMEN_IAP;
                        vl_thursday_commIAR = oList.get(i).A1698_COMMEN_IAR;
                        vl_thursday_cant = oList.get(i).A1698_TAPES;
                        vl_thursday_error = oList.get(i).A1698_ERRORS;
                        vl_thursday_cantSale = oList.get(i).A1698_SALEWO;
                        vl_thursday_cantELW = oList.get(i).A1698_COUNT_ELW;
                        vl_thursday_cantIAP = oList.get(i).A1698_COUNT_IAP;
                        vl_thursday_cantIAR = oList.get(i).A1698_COUNT_IAR;
                        vl_thursday2 = oList.get(i).A1527CINTA;
                        vl_fechaDisbursment = oList.get(i).A1527DESEM;
                        if (Integer.parseInt(oList.get(i).A1527SODA) <= Integer.parseInt(fechaActual)) {
                            vl_thursday_St = Style(oList.get(i).A1698_TAPES, oList.get(i).A1698_SALEWO, oList.get(i).A1698_ERRORS);
                        }
                        break;
                }
                
                // Insertar la ultima semana
                if (i == oList.size() - 1 && flagUlt.equals("")) {
                    fechas.put("FRIDAY", vl_friday);
                    fechas.put("FRIDAY_COMMELW", vl_friday_commELW);
                    fechas.put("FRIDAY_COMMIAP", vl_friday_commIAP);
                    fechas.put("FRIDAY_COMMIAR", vl_friday_commIAR);
                    fechas.put("FRIDAY_CANT", vl_friday_cant);
                    fechas.put("FRIDAY_ERROR", vl_friday_error);
                    fechas.put("FRIDAY_CANTSALE", vl_friday_cantSale);
                    fechas.put("FRIDAY_CANTELW", vl_friday_cantELW);
                    fechas.put("FRIDAY_CANTIAP", vl_friday_cantIAP);
                    fechas.put("FRIDAY_CANTIAR", vl_friday_cantIAR);
                    fechas.put("FRIDAY_COLOR", vl_friday_St);
                    fechas.put("SATURDAY", vl_saturday);
                    fechas.put("SATURDAY_COMMELW", vl_saturday_commELW);
                    fechas.put("SATURDAY_COMMIAP", vl_saturday_commIAP);
                    fechas.put("SATURDAY_COMMIAR", vl_saturday_commIAR);
                    fechas.put("SATURDAY_CANT", vl_saturday_cant);
                    fechas.put("SATURDAY_ERROR", vl_saturday_error);
                    fechas.put("SATURDAY_CANTSALE", vl_saturday_cantSale);
                    fechas.put("SATURDAY_CANTELW", vl_saturday_cantELW);
                    fechas.put("SATURDAY_CANTIAP", vl_saturday_cantIAP);
                    fechas.put("SATURDAY_CANTIAR", vl_saturday_cantIAR);
                    fechas.put("SATURDAY_COLOR", vl_saturday_St);
                    fechas.put("SUNDAY", vl_sunday);
                    fechas.put("SUNDAY_COMMELW", vl_sunday_commELW);
                    fechas.put("SUNDAY_COMMIAP", vl_sunday_commIAP);
                    fechas.put("SUNDAY_COMMIAR", vl_sunday_commIAR);
                    fechas.put("SUNDAY_CANT", vl_sunday_cant);
                    fechas.put("SUNDAY_ERROR", vl_sunday_error);
                    fechas.put("SUNDAY_CANTSALE", vl_sunday_cantSale);
                    fechas.put("SUNDAY_CANTELW", vl_sunday_cantELW);
                    fechas.put("SUNDAY_CANTIAP", vl_sunday_cantIAP);
                    fechas.put("SUNDAY_CANTIAR", vl_sunday_cantIAR);
                    fechas.put("SUNDAY_COLOR", vl_sunday_St);
                    fechas.put("MONDAY", vl_monday);
                    fechas.put("TUESDAY", vl_tuesday);
                    fechas.put("WEDNESDAY", vl_wednesday);
                    fechas.put("WEDNESDAY_COMMELW", vl_wednesday_commELW);
                    fechas.put("WEDNESDAY_COMMIAP", vl_wednesday_commIAP);
                    fechas.put("WEDNESDAY_COMMIAR", vl_wednesday_commIAR);
                    fechas.put("WEDNESDAY_CANT", vl_wednesday_cant);
                    fechas.put("WEDNESDAY_ERROR", vl_wednesday_error);
                    fechas.put("WEDNESDAY_CANTSALE", vl_wednesday_cantSale);
                    fechas.put("WEDNESDAY_CANTELW", vl_wednesday_cantELW);
                    fechas.put("WEDNESDAY_CANTIAP", vl_wednesday_cantIAP);
                    fechas.put("WEDNESDAY_CANTIAR", vl_wednesday_cantIAR);
                    fechas.put("WEDNESDAY_COLOR", vl_wednesday_St);
                    fechas.put("THURSDAY1", vl_thursday);
                    fechas.put("THURSDAY1_COMMELW", vl_thursday_commELW);
                    fechas.put("THURSDAY1_COMMIAP", vl_thursday_commIAP);
                    fechas.put("THURSDAY1_COMMIAR", vl_thursday_commIAR);
                    fechas.put("THURSDAY1_CANT", vl_thursday_cant);
                    fechas.put("THURSDAY1_ERROR", vl_thursday_error);
                    fechas.put("THURSDAY1_CANTSALE", vl_thursday_cantSale);
                    fechas.put("THURSDAY1_CANTELW", vl_thursday_cantELW);
                    fechas.put("THURSDAY1_CANTIAP", vl_thursday_cantIAP);
                    fechas.put("THURSDAY1_CANTIAR", vl_thursday_cantIAR);
                    fechas.put("THURSDAY1_COLOR", vl_thursday_St);
                    fechas.put("WEEK", vl_week);
                    fechas.put("PED", vl_period);
                    fechas.put("THURSDAY2", vl_thursday2);
                    fechasDis.put("VALOR", vl_fechaDisbursment);
                    lstfechas.add(contFechas, fechas);
                    lstfechasDis.add(contFechas, fechasDis);
                    contFechas++;
                    contMonth = 1;
                    vl_friday = "";
                    vl_friday_commELW = "";
                    vl_friday_commIAP = "";
                    vl_friday_commIAR = "";
                    vl_friday_cant = 0;
                    vl_friday_error = 0;
                    vl_friday_cantSale = 0;
                    vl_friday_cantELW = 0;
                    vl_friday_cantIAP = 0;
                    vl_friday_cantIAR = 0;
                    vl_saturday = "";
                    vl_saturday_commELW = "";
                    vl_saturday_commIAP = "";
                    vl_saturday_commIAR = "";
                    vl_saturday_cant = 0;
                    vl_saturday_error = 0;
                    vl_saturday_cantSale = 0;
                    vl_saturday_cantELW = 0;
                    vl_saturday_cantIAP = 0;
                    vl_saturday_cantIAR = 0;
                    vl_sunday = "";
                    vl_sunday_commELW = "";
                    vl_sunday_commIAP = "";
                    vl_sunday_commIAR = "";
                    vl_sunday_cant = 0;
                    vl_sunday_error = 0;
                    vl_sunday_cantSale = 0;
                    vl_sunday_cantELW = 0;
                    vl_sunday_cantIAP = 0;
                    vl_sunday_cantIAR = 0;
                    vl_monday = "";
                    vl_tuesday = "";
                    vl_wednesday = "";
                    vl_wednesday_commELW = "";
                    vl_wednesday_commIAP = "";
                    vl_wednesday_commIAR = "";
                    vl_wednesday_cant = 0;
                    vl_wednesday_error = 0;
                    vl_wednesday_cantSale = 0;
                    vl_wednesday_cantELW = 0;
                    vl_wednesday_cantIAP = 0;
                    vl_wednesday_cantIAR = 0;
                    vl_thursday = "";
                    vl_thursday_commELW = "";
                    vl_thursday_commIAP = "";
                    vl_thursday_commIAR = "";
                    vl_thursday_cant = 0;
                    vl_thursday_error = 0;
                    vl_thursday_cantSale = 0;
                    vl_thursday_cantELW = 0;
                    vl_thursday_cantIAP = 0;
                    vl_thursday_cantIAR = 0;
                    vl_friday_St = "#000000";
                    vl_saturday_St = "#000000";
                    vl_sunday_St = "#000000";
                    vl_wednesday_St = "#000000";
                    vl_thursday_St = "#000000";
                }
                
                HashMap month = new HashMap();
                HashMap week = new HashMap();

                if (contMonth == 1 && (!vl_month.equals(oList.get(i).A1527PDIDM) || i == oList.size() - 1)) {
                    week.put("VALOR", vl_month_vl);
                    week.put("WK", lstfechas);
                    week.put("DISB", lstfechasDis);
                    lstweek.add(week);
                    month.put("MONTHS", lstweek);
                    lstmonth.add(month);
                    contMonth = 0;
                    contGeneral = 1;
                    lstfechas = new ArrayList<HashMap>();
                    lstfechasDis = new ArrayList<HashMap>();
                    contFechas = 0;
                    lstweek = new ArrayList<HashMap>();
                }
                if (!vl_month.equals(oList.get(i).A1527PDIDM)) {
                    vl_month = oList.get(i).A1527PDIDM;
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
                if ((contGeneral == 1 && !vl_qtr.equals(oList.get(i).A1527CUART)) || i == oList.size() - 1) {
                    qtr.put("VALOR", vl_qtr + "Q");
                    qtr.put("QTR", lstmonth);
                    lista.add(qtr);
                    contGeneral = 0;
                    lstmonth = new ArrayList<>();
                }
                if (!vl_qtr.equals(oList.get(i).A1527CUART)) {
                    vl_qtr = oList.get(i).A1527CUART;
                }
            }
        } catch (Exception e) {
            map.put("success", false);
            System.out.println("---> Exception : " + e.getMessage());
            //throw new SpringException(e);
        }

        //HashMap m = new HashMap();
        map.put("success", true);
        map.put("total", oList.size());
        map.put("data", lista);

        return new Gson().toJson(map);
    }
    
    String Style(Integer cant,Integer cantSale,Integer error){
        String style = "#FF0000";
        if(cant == 1){
            if(cantSale > 0){
                style = "#FFCC00";
            }else{
                if(error == 0){
                    style = "#339900";
                }else{
                    style = "#CC9900";
                }
            }
        }
        return style;
    }    
    
//    String Style(Integer cant, Integer cantSale, Integer error) {
//        String style = "";
//        if (cant == 0) {
//            style = "#FF0000";
//        } else {
//            switch (cant) {
//                case 1:
//                    if (cantSale == 1) {
//                        style = "#CC6600";                        
//                    } else {
//                        style = "#CC9900";
//                        style = "#CC9900";
//                    }
//                    break;
//                case 2:
//                    if (cantSale == 1) {
//                        style = "#CC6600";
//                    } else if (cantSale == 2) {
//                        style = "#CC9900";
//                    } else {
//                        style = "#CC9900";
//                    }
//                    break;
//                case 3:
//                    if (cantSale == 1) {
//                        style = "#CC6600";
//                    } else if (cantSale == 2) {
//                        style = "#CC9900";
//                        style = "#CC9900";
//                    } else if (cantSale == 3) {
//                        style = "#FFCC00";
//                    } else {
//                        if (error == 0) {
//                            style = "#339900";
//                        } else {
//                            style = "#CC9900";
//                        }
//                    }
//                    break;
//            }
//        }
//        return style;
//    }

    @RequestMapping(value = "/updateObservation")
    public @ResponseBody
    String updateObservation(HttpServletRequest request) {
        SQP00146Filter filter = new SQP00146Filter();
        filter.IN_A1527PPED = request.getParameter("IN_A1527PPED");
        filter.IN_A1527PDIDC = request.getParameter("IN_A1527PDIDC");
        filter.IN_A1527SODA = request.getParameter("IN_A1527SODA");
        filter.IN_A1698BANK = request.getParameter("IN_A1698BANK");
        filter.IN_A1698COMEN = request.getParameter("IN_A1698COMEN");
        try {
            logic = new CalendarControlARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            logic.setSQP00146(filter);
            logic = null;

        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", filter);
        return new Gson().toJson(m);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<PX036S01A1527Filter> listaData;
        PX036S01A1527Filter filter = new PX036S01A1527Filter();

        String fileNameDownload = String.format("ARC Calendar Control - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            filter.IN_A1527PPED = request.getParameter("IN_A1527PPED");

            logic = new CalendarControlARCLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX036S01A1527(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ASR Calendar Control");
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
            Cell CH1_01 = row.createCell(1);
            Cell CH1_02 = row.createCell(2);
            Cell CH1_03 = row.createCell(3);
            Cell CH1_04 = row.createCell(4);
            Cell CH1_05 = row.createCell(5);

            CH1_00.setCellValue("Ending Date");
            CH1_01.setCellValue("Processing Date");
            CH1_02.setCellValue("Bank");
            CH1_03.setCellValue("Week");
            CH1_04.setCellValue("Cicle");
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

                cell50.setCellValue(listaData.get(vi).A1527PPED);
                cell51.setCellValue(listaData.get(vi).A1527SODA);
                String bank = "";
                if (listaData.get(vi).A1527CNULO.equals("Y")) {
                    bank = "";
                } else {
                    if (listaData.get(vi).A1698_COUNT_ELW == 1) {
                        bank = "ELW";
                    }
                    if (listaData.get(vi).A1698_COUNT_IAP == 1) {
                        bank = bank + "|IAP";
                    }
                    if (listaData.get(vi).A1698_COUNT_IAR == 1) {
                        bank = bank + "|IAR";
                    }
                }

                cell52.setCellValue(bank);
                cell53.setCellValue(listaData.get(vi).A1527PDIDS);
                cell54.setCellValue(listaData.get(vi).A1527PDIDC);
                cell55.setCellValue(listaData.get(vi).A1527OBS);

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

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        }
    }
}
