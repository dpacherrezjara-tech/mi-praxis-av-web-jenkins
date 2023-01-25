/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.beans.SaleAudit.SQP01600Filter;
import net.miatech.praxis.A051;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.sales.DeterminationCommissionBackLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
@RequestMapping("/DeterminationCommissionBack")
public class DeterminationCommissionBackController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DeterminationCommissionBackLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DeterminationCommissionBack/form_index";
    }

    @RequestMapping(value = "getListCountry")
    public @ResponseBody
    String getListCountry(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DeterminationCommissionBack : getListCountry-------------");

        logic = new DeterminationCommissionBackLogic();
        map.put("success", true);
        List<A051> listaPaises = new ArrayList<>();

        try {
            logic.setSession(this.serverSession.getServerSession());
            listaPaises = logic.getListCountry();
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(DeterminationCommissionBackController.class.getName()).log(Level.SEVERE, null, ex);
        }

        map.put("listaPaises", listaPaises);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getListSchema")
    public @ResponseBody
    String getListSchema(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DeterminationCommissionBack : getListSchema-------------");

        logic = new DeterminationCommissionBackLogic();
        map.put("success", true);
        List<A051> listaEsquema = new ArrayList<>();
        SQP01362Filter filter = new SQP01362Filter();

        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.A2845INDAC = request.getParameter("A2845INDAC");
            listaEsquema = logic.getListSchema(filter);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(DeterminationCommissionBackController.class.getName()).log(Level.SEVERE, null, ex);
        }

        map.put("listaEsquema", listaEsquema);
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getListTypeProccessCMB")
    public @ResponseBody
    String getListTypeProccessCMB(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DeterminationCommissionBack : getListTypeProccessCMB-------------");

        logic = new DeterminationCommissionBackLogic();
        map.put("success", true);
        List<SQP01600Filter> listaProc = new ArrayList<>();
        SQP01600Filter filter = new SQP01600Filter();
        try {
            logic.setSession(this.serverSession.getServerSession());
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_CODAC = request.getParameter("VP_CODAC");
            filter.VP_INDAC = request.getParameter("VP_INDAC");
            filter.VP_VRSAC = request.getParameter("VP_VRSAC");
            filter.VP_NAME = request.getParameter("VP_NAME");
            listaProc = logic.getListTypeProccessCMB(filter);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(DeterminationCommissionBackController.class.getName()).log(Level.SEVERE, null, ex);
        }

        map.put("listaProc", listaProc);
        return new Gson().toJson(map);

    }

//    @RequestMapping(value = "search")
//    public @ResponseBody
//    String search(ModelMap map, HttpServletRequest request) {
//        System.out.println("-------------- DeterminationCommissionBack : Controller-------------");
//        map.put("success", true);
//        List<PX019S01A025Filter> lst = this.getList(request, false);
//        System.out.println("Total : " + lst.size());
//        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
//        map.put("data", lst);
//        return new Gson().toJson(map);
//
//    }
//
//    public List<PX019S01A025Filter> getList(HttpServletRequest request, Boolean bExcel) {
//
//        logic = new DeterminationCommissionBackLogic();
//
//        List<PX019S01A025Filter> lst = new ArrayList<>(0);
//        PX019S01A025Filter filter = new PX019S01A025Filter();
//
//        filter.page.TOTROW = -1;
//        filter.page.START = 0;
//        filter.page.LIMIT = 0;
//
//        try {
//
//            logic.setSession(this.serverSession.getServerSession());
//
//            filter.IN_A025KEY = request.getParameter("dateFrom");
//           
//
//            System.out.println("----------------- Parametros --------------------- ");
//            System.out.println(" limit : " + request.getParameter("limit"));
//            System.out.println(" start : " + request.getParameter("start"));
//            System.out.println(" IN_A025KEY : " + request.getParameter("dateFrom"));
//            System.out.println("-------------------------------------------------- ");
//
//            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
//            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
//
//            if (!bExcel) {
//                filter.page.PAGROW = 20;
//                start = (start != 0 ? start : 0);
//                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
//            } else {
//                filter.page.PAGROW = -1;
//                filter.page.PAGNUM = 1;
//            }
//
//            lst = logic.loadPX019S01A025(filter);
//
//        } catch (Exception e) {
//            throw new SpringException(e);
//        }
//
//        return lst;
//    }
//
//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("Minimun Rule : getXLSX");
//
//        String fileNameDownload = String.format("Minimun Rule- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<PX019S01A025Filter> listaData = this.getList(request, false);
//
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("Minimun RUle");
//
//            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();
//            CellStyle bodyStyle = workbook.createCellStyle();
//            Font headerFont = workbook.createFont();
//
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
//            Integer vi = 0;
//            Integer vj = 0; //Almacena el numero de fila
//            Iterator iter = listaData.iterator();
//
//            // ====== CREANDO TITULOS ======================================
//            Row row = sheet.createRow(vj);
//
//            Cell CH1_00 = row.createCell(0);
//            Cell CH1_01 = row.createCell(1);
//
//            CH1_00.setCellValue("Date");
//            CH1_01.setCellValue("Coefficient");
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//
//            //          ========================================================
//            ++vj;
//            while (iter.hasNext()) {
//
//                row = sheet.createRow(vj);
//                Cell rcell0 = row.createCell(0);
//                Cell rcell1 = row.createCell(1);
//                Cell rcell2 = row.createCell(2);
//                Cell rcell3 = row.createCell(3);
//
//                rcell0.setCellValue(listaData.get(vi).A025KEY);
//                rcell1.setCellValue(listaData.get(vi).A025COEFIC);
//
//                rcell0.setCellStyle(bodyStyle);
//                rcell1.setCellStyle(bodyStyle);
//
//                iter.next();
//                ++vi;
//                ++vj;
//            }
//
//            sheet.autoSizeColumn(0, true);
//            sheet.autoSizeColumn(1, true);
//
//            /**
//             * fileNameDownload = Nombre de descarga
//             */
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
//
//    }
}
