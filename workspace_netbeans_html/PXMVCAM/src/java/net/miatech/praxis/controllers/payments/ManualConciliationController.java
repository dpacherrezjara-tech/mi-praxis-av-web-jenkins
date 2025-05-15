package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.spring.UserView;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ManualConciliationLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author jsolano
 */
@Controller
@Scope("request")
@RequestMapping("/ManualConciliation")
public class ManualConciliationController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ManualConciliationLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- ManualConciliationController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "payments/ManualConciliation/form_index";
    }

    @RequestMapping(value = "searchMPF101Teleworking")
    public @ResponseBody
    String searchMPF101Teleworking(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-------------- ManualConciliation : searchMPF101Teleworking-------------");
        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            String Freasign = request.getParameter("Freasign");
            String Freasiga = request.getParameter("Freasiga");

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadPX269SQP00871JS(filter);
            if (dw_excel) {
                ExportUtil.exportFields(request, response, lst);
            } else {

                map.put("success", true);
                map.put("data", lst);
                map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        return (dw_excel) ? null : (new Gson().toJson(map));
    }

    @RequestMapping(value = "searchBean")
    public @ResponseBody
    String searchBeanAMDP(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBean-------------");
        map.put("success", true);

        A2290Filter result = new A2290Filter();
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            result = logic.loadPX269SQPXXX(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN")
    public @ResponseBody
    String searchBeanAMDP_SCAN(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_SCAN-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchBeanAMDP_SCAN_PENDING")
    public @ResponseBody
    String searchBeanAMDP_SCAN_PENDING(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchBeanAMDP_SCAN_PENDING-------------");

        map.put("success", true);
        List<A2290Filter> lst = this.getListAMDP_SCAN_PENDING(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2290Filter> getListAMDP_SCAN_PENDING(HttpServletRequest request, Boolean bExcel) {

        List<A2290Filter> lst = new ArrayList<>(0);
        A2290Filter filter = new A2290Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);

            lst = logic.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getOperadores")
    public @ResponseBody
    String getOperadores(String ccust) {
        List<A1248> lista = new ArrayList<A1248>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadOperadores();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeOption-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            option = request.getParameter("option");
            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834(filterList, user);

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

    @RequestMapping(value = "executeGrillUpdate")
    public @ResponseBody
    String executeGrillUpdate(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeGrillUpdate-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            A2290Filter[] filters = gson.fromJson(beanString, A2290Filter[].class);
            List<A2290Filter> filterList = Arrays.asList(filters);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834GRILL(filterList, user);

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

    @RequestMapping(value = "executeAllUpdate")
    public @ResponseBody
    String executeAllUpdate(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : executeAllUpdate-------------");
        String option;
        A2290Filter filter = new A2290Filter();
        String msj = "";
        Gson gson = new Gson();
        String beanString = "";

        try {

            beanString = request.getParameter("beanString");
            System.out.println("JSON recibido en el servidor: " + beanString);
            filter = gson.fromJson(beanString, A2290Filter.class);

            UserView user = this.serverSession.getServerSession().getUserView();
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX269SQP00834ALL(filter, user);

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

    @RequestMapping(value = "obtainFields")
    public @ResponseBody
    String obtainFields(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : obtainFields");

        logic = new ManualConciliationLogic();
        List<A1248> lstData = new ArrayList<A1248>(0);

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            lstData = logic.loadSQP03739(tabla);

            map.put("success", true);
            map.put("lstData", lstData);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getUserInfo")
    public @ResponseBody
    String getUserInfo(ModelMap map, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("RefundAssignmentController : getUserInfo");

        logic = new ManualConciliationLogic();
        INF020 objINF020 = new INF020();

        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla");

            objINF020 = logic.loadUserInfo();

            map.put("success", true);
            map.put("objINF020", objINF020);

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", e.getMessage());
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getRules")
    public @ResponseBody
    String getRules(String ccust) {
        List<A2290Filter> lista = new ArrayList<A2290Filter>();
        try {
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            lista = logic.loadRules();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lista);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "searchRulesDetail")
    public @ResponseBody
    String searchRulesDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ManualConciliation : searchRulesDetail-------------");

        Gson gson = new Gson();
        A2290Filter filter = new A2290Filter();
        A2290Filter result = new A2290Filter();

        String beanString = request.getParameter("beanString");
        filter = gson.fromJson(beanString, A2290Filter.class);

        logic = new ManualConciliationLogic();
        logic.setSession(this.serverSession.getServerSession());
        try {
            result = logic.loadPX285SQP00829Search(filter);
            map.put("result", result);
            map.put("success", true);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(RejectionsController.class.getName()).log(Level.SEVERE, null, ex);
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "MaintenanceRules")
    public @ResponseBody
    String MaintenanceRules(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- ManualConciliation : MaintenanceRules-------------");

        String option;
        String beanString;
        Gson gson = new Gson();

        A2290Filter filter = new A2290Filter();
        String msj = " ";

        try {

            option = request.getParameter("option");
            filter.CODRULE = request.getParameter("CODRULE").trim();
            filter.GRORULE = request.getParameter("GRORULE").trim();
            filter.TTABLE = request.getParameter("TTABLE").trim();
            String grorule = request.getParameter("GRORULE").trim();
            String[] fields = grorule.split("/");

            StringBuilder condition = new StringBuilder();
            for (String field : fields) {
                if (condition.length() > 0) {
                    condition.append(" AND ");
                }
                condition.append("A.").append(field).append(" = B.").append(field);
            }

            String Rquery = condition.toString();
            filter.RQUERY = Rquery;

            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            msj = logic.loadPX285SQP00829Update(filter, option);

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

    @RequestMapping(value = "getXLSXMain")
    public @ResponseBody
    void getXLSXMain(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("Report : getXLSXMain");
        String fileNameDownload = String.format("Manual Conciliation Report - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            logic = new ManualConciliationLogic();
            logic.setSession(this.serverSession.getServerSession());
            String beanString;
            Gson gson = new Gson();
            List<A2290Filter> listaData = new ArrayList<>(0);
            A2290Filter filter = new A2290Filter();

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2290Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            listaData = logic.loadPX269SQP00871JS_LIQ(filter);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());

            // <editor-fold defaultstate="collapsed" desc=" GENERA EXCELS ">
            System.out.println("Report : getXLSX");
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

            DataFormat dataFormat = workbook.createDataFormat();
            CellStyle amountStyle = workbook.createCellStyle();
            CellStyle qtyStyle = workbook.createCellStyle();
            amountStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));
            qtyStyle.setDataFormat(dataFormat.getFormat("#,##0"));

            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
//                Iterator iter = listaData.iterator();
            Iterator<A2290Filter> iter = listaData.iterator();
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
            Cell CH1_20 = row1.createCell(20);
            Cell CH1_21 = row1.createCell(21);

            CH1_0.setCellValue("Key Concil");
            CH1_1.setCellValue("Ticket");
            CH1_2.setCellValue("SRC");
            CH1_3.setCellValue("Qty Tkt");
            CH1_4.setCellValue("Amount");
            CH1_5.setCellValue("Amount Tkt");
            CH1_6.setCellValue("Curr.");
            CH1_7.setCellValue("Doc. Type");
            CH1_8.setCellValue("Proces");
            CH1_9.setCellValue("Country");
            CH1_10.setCellValue("Sales Date");
            CH1_11.setCellValue("Credit Card");
            CH1_12.setCellValue("Auth. Code");
            CH1_13.setCellValue("Agent");
            CH1_14.setCellValue("PNR");
            CH1_15.setCellValue("Code");
            CH1_16.setCellValue("Bank");
            CH1_17.setCellValue("Pay.Date");
            CH1_18.setCellValue("Merchand");
            CH1_19.setCellValue("Acc. Number");
            CH1_20.setCellValue("Terminal");
            CH1_21.setCellValue("Secuence");

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
            CH1_20.setCellStyle(headerStyle);
            CH1_21.setCellStyle(headerStyle);

            ++vj;
            //============================================ 

            // Estilo para cabeceras en negrita
            CellStyle style1 = workbook.createCellStyle();
            style1.setFillForegroundColor(IndexedColors.WHITE.getIndex());
            style1.setFillPattern((short) 1);

            XSSFCellStyle style2 = (XSSFCellStyle) workbook.createCellStyle();
            XSSFColor gray15 = new XSSFColor(new byte[]{(byte) 217, (byte) 217, (byte) 217});
            style2.setFillForegroundColor(gray15);
            style2.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle boldStyle1 = workbook.createCellStyle();
            boldStyle1.cloneStyleFrom(style1);
            Font boldFont1 = workbook.createFont();
            boldFont1.setBold(true);
            boldStyle1.setFont(boldFont1);

            CellStyle boldStyle2 = workbook.createCellStyle();
            boldStyle2.cloneStyleFrom(style2);
            Font boldFont2 = workbook.createFont();
            boldFont2.setBold(true);
            boldStyle2.setFont(boldFont2);

            String lastKey = "";
            boolean useStyle1 = true;

            while (iter.hasNext()) {
                A2290Filter data = iter.next();

                if (!data.UNIKEY.equals(lastKey)) {
                    useStyle1 = !useStyle1;
                    CellStyle currentStyle = useStyle1 ? style1 : style2;
                    CellStyle currentBoldStyle = useStyle1 ? boldStyle1 : boldStyle2;

                    Row headerRow = sheet.createRow(vj++);

                    createStyledCell(headerRow, 0, data.SCARDN_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 1, "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 2, "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 3, String.valueOf(data.QTY_101), currentBoldStyle, workbook);
                    createStyledCell(headerRow, 4, String.valueOf(data.SVFOP_101), currentBoldStyle, workbook);
                    createStyledCell(headerRow, 5, "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 6, data.SCURRENCY_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 7, data.TDOC_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 8, data.COREP, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 9, data.SCOUNTRY_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 10, data.SDATE_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 11, data.SCARDN_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 12, data.SAUTHOC_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 13, data.SAGENT_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 14, "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 15, data.SCARCOD_101, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 16, data.CODEBANK, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 17, data.PAYDATE + "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 18, data.MERCHNC + "", currentBoldStyle, workbook);
                    createStyledCellString(headerRow, 19, data.ACCNUMBER + "", currentBoldStyle, workbook);
                    createStyledCell(headerRow, 20, data.TERMI, currentBoldStyle, workbook);
                    createStyledCell(headerRow, 21, data.SEQNUM, currentBoldStyle, workbook);
           
                    lastKey = data.UNIKEY;
                }

                CellStyle currentStyle = useStyle1 ? style1 : style2;
                Row detailRow = sheet.createRow(vj++);

                createStyledCell(detailRow, 0, "", currentStyle, workbook);
                createStyledCellString(detailRow, 1, data.TKT + " ", currentStyle, workbook);
                createStyledCellString(detailRow, 2, data.CFUENTE_100 + " ", currentStyle, workbook);
                createStyledCell(detailRow, 3, "1", currentStyle, workbook);
                createStyledCell(detailRow, 4, "", currentStyle, workbook);
                createStyledCell(detailRow, 5, String.valueOf(data.SVFOP_100), currentStyle, workbook);
                createStyledCell(detailRow, 6, data.SCURRENCY_100, currentStyle, workbook);
                createStyledCell(detailRow, 7, data.TDOC_100, currentStyle, workbook);
                createStyledCell(detailRow, 8, "", currentStyle, workbook);
                createStyledCell(detailRow, 9, data.SCOUNTRY_100, currentStyle, workbook);
                createStyledCell(detailRow, 10, data.SDATE_100, currentStyle, workbook);
                createStyledCell(detailRow, 11, data.SCARDN_100, currentStyle, workbook);
                createStyledCell(detailRow, 12, data.SAUTHOC_100, currentStyle, workbook);
                createStyledCell(detailRow, 13, data.SAGENT_100, currentStyle, workbook);
                createStyledCell(detailRow, 14, data.SPNR_100, currentStyle, workbook);
                createStyledCell(detailRow, 15, data.SCARCOD_100, currentStyle, workbook);
                createStyledCell(detailRow, 16, "", currentStyle, workbook);
                createStyledCell(detailRow, 17, "", currentStyle, workbook);
                createStyledCell(detailRow, 18, "", currentStyle, workbook);
                createStyledCell(detailRow, 19, "", currentStyle, workbook);
                createStyledCell(detailRow, 20, "", currentStyle, workbook);
                createStyledCell(detailRow, 21, "", currentStyle, workbook);
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
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);
            sheet.autoSizeColumn(21, true);
   
            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();
            // </editor-fold>
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public void createStyledCell(Row row, int column, String value, CellStyle baseStyle, Workbook workbook) {
        Cell cell = row.createCell(column);

        CellStyle newStyle = workbook.createCellStyle();
        newStyle.cloneStyleFrom(baseStyle);

        try {
            double numericValue = Double.parseDouble(value);
            cell.setCellStyle(newStyle);
            cell.setCellValue(numericValue);
        } catch (NumberFormatException e) {
            DataFormat format = workbook.createDataFormat();
            newStyle.setDataFormat(format.getFormat("@"));
            cell.setCellStyle(newStyle);
            cell.setCellValue(value);
        }
    }
    
    public void createStyledCellString(Row row, int column, String value, CellStyle baseStyle, Workbook workbook) {
        Cell cell = row.createCell(column);
 
        CellStyle newStyle = workbook.createCellStyle();
        newStyle.cloneStyleFrom(baseStyle);
  
        cell.setCellStyle(newStyle);
        cell.setCellValue(value); 
         
    }

}
