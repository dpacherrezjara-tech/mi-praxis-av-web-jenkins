/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.CargoGuideLogic;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author singa
 */
@Controller
@Scope("request")
@RequestMapping("/CargoGuide")
public class CargoGuideController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private CargoGuideLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/CargoGuide/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : Search-------------");
        map.put("success", true);
        List<MPF295> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<MPF295> getList(HttpServletRequest request, Boolean bExcel) {

        List<MPF295> lst = new ArrayList<>(0);
        MPF295Filter filter = new MPF295Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, MPF295Filter.class);
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

            lst = logic.loadMPS587(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {

        // Le cambiamos el nombre al archivo para que coincida con tu módulo
        String fileNameDownload = "Cargo Guide Report - " + Functions.getFechaActual() + ".xlsx";

        try {
            // bExcel = true desactiva el paginado para traer TODOS los registros
            List<MPF295> listaData = this.getList(request, true);

            SXSSFWorkbook workbook = new SXSSFWorkbook(100);
            Sheet sheet = workbook.createSheet("Report");

            // --- ESTILO PARA LA CABECERA ---
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
            headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

            // --- ESTILO PARA NÚMEROS (MONTO) ---
            CellStyle amountStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            amountStyle.setDataFormat(format.getFormat("#,##0.00"));

            // --- CREACIÓN DE CABECERAS ---
            Row header = sheet.createRow(0);
            String[] columns = {
                "Nbr", "Customer", "ADATE", "PAYDAY", "Country", "NCICLO",
                "METPAGO", "NPAGE", "CUSCA", "CODPSE", "Bandoc", "Currency", "Amount"
            };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                // Ancho de columna por defecto
                sheet.setColumnWidth(i, 4500);
            }

            // --- LLENADO DE FILAS ---
            int rowIdx = 1;
            for (MPF295 item : listaData) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(item.RN);
                row.createCell(1).setCellValue(item.CCUST);
                row.createCell(2).setCellValue(item.ADATE);
                row.createCell(3).setCellValue(item.PAYDAY);
                row.createCell(4).setCellValue(item.SCOUNTRY);
                row.createCell(5).setCellValue(item.NCICLO);
                row.createCell(6).setCellValue(item.METPAGO);
                row.createCell(7).setCellValue(item.NPAGE);
                row.createCell(8).setCellValue(item.CUSCA);
                row.createCell(9).setCellValue(item.CODPSE);
                row.createCell(10).setCellValue(item.BANDOC);
                row.createCell(11).setCellValue(item.SCURRENCY);

                // 12. Amount (Monto formateado como número para que Excel pueda sumar)
                Cell amountCell = row.createCell(12);
                amountCell.setCellValue(item.MONTO);
                amountCell.setCellStyle(amountStyle);
            }

            // --- CONFIGURACIÓN DE RESPUESTA ---
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            workbook.write(response.getOutputStream());
            workbook.dispose();

        } catch (Exception e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "MaintenanceA2280", method = RequestMethod.POST)
    public @ResponseBody
    String MaintenanceA2280(HttpServletRequest request) {
        System.out.println("-------------- CargoGuide : MaintenanceA2280 (Update) -------------");
        Map<String, Object> map = new HashMap<>();
        Gson gson = new Gson();

        try {
            // Instanciamos la lógica y seteamos la sesión
            CargoGuideLogic logic = new CargoGuideLogic();
            logic.setSession(this.serverSession.getServerSession());

            // Capturamos el string enviado por ExtJS y lo parseamos
            String beanString = request.getParameter("beanString");

            // NOTA: Usa la clase Bean que tengas definida para estos campos. 
            // Aquí la llamaré MPF295Filter asumiendo que tiene los campos IN_CCUST, IN_MONTO, etc.
            MPF295Filter bean = gson.fromJson(beanString, MPF295Filter.class);

            // Ejecutamos la actualización
            Map<String, Object> result = logic.updateMPS588(bean);

            // El SP debe devolver si fue exitoso y un mensaje
            map.put("success", result.get("success"));
            map.put("Mensaje", result.get("mensaje"));

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("Mensaje", "Ocurrió un error en el servidor: " + e.getMessage());
        }

        return new Gson().toJson(map);
    }

}
