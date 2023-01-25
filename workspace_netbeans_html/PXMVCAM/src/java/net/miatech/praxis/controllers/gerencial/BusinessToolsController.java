/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.gerencial;

import com.google.gson.Gson;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SQP00768;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.classes.ExportSchema;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.gerencial.BusinessToolsLogic;
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
@RequestMapping("/BusinessTools")
public class BusinessToolsController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private BusinessToolsLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "cargo/BusinessTools/form_index";
    }

    @RequestMapping(value = "loadFiles")
    public @ResponseBody
    String loadFiles(ModelMap map, HttpServletRequest request) {
        System.out.println("BusinessToolsController ---- loadFiles");
        logic = new BusinessToolsLogic();
        List<A1248> lstSourceCode = new ArrayList<>(0);
        List<A1248> lstOperadores = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla").toString().trim();

            lstSourceCode = logic.loadFiles(tabla);
            lstOperadores = logic.loadOperadores();
            //lstOperadores
        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lstSourceCode);
        m.put("lstOperadores", lstOperadores);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "obtainData")
    public @ResponseBody
    String obtainData(HttpServletRequest request) {
        logic = new BusinessToolsLogic();
        List<A1248> lstFiles = null;
        List<A1248> lstCampos = new ArrayList<>(0);
        List<SQP00768> lstFavoritos = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla1 = request.getParameter("tabla").toString().trim();
            String tabla2 = request.getParameter("tabla2").toString().trim();

            lstCampos = logic.loadPX275SQP01033(tabla1, tabla2);
            lstFavoritos = logic.loadPX275SQP01034(tabla1);
            if (tabla2.equals("")) {
                lstFiles = logic.loadFiles(tabla1);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", lstCampos);
        m.put("dataFav", lstFavoritos);
        m.put("dataFiles", lstFiles);

        return new Gson().toJson(m);
    }

    @RequestMapping(value = "searchFields")
    public @ResponseBody
    String searchFields(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : searchFields-------------");
        map.put("success", true);
        List<SQP00768> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("success", true);   
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);

    }

    public List<SQP00768> getList(HttpServletRequest request, Boolean bExcel) {

        logic = new BusinessToolsLogic();

        List<SQP00768> lst = new ArrayList<>(0);
        SQP00768 filter = new SQP00768();

        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;

        try {

            logic.setSession(this.serverSession.getServerSession());
//            filter.strCliente = request.getParameter("strCliente").toString().trim();
//            filter.strFecha = request.getParameter("strFecha").toString().trim();
//            filter.IN_FECHA_FROM = request.getParameter("IN_FECHA_FROM").toString().trim();
//            filter.IN_FECHA_TO = request.getParameter("IN_FECHA_TO").toString().trim();
//            filter.strSQL = request.getParameter("strSQL").toString().trim();
//            filter.strEtiquetas = request.getParameter("strEtiquetas") == null ? "" : request.getParameter("strEtiquetas").toString().trim();
//            filter.strSelect = request.getParameter("strSelect").toString().trim();
//            filter.strSelectA = request.getParameter("strSelectA").toString().trim();
//            filter.strSelectN = request.getParameter("strSelectN").toString().trim();
//            filter.strOrderBy = request.getParameter("strOrderBy").toString().trim();
//            filter.strOrderByEtiquetas = request.getParameter("strOrderByEtiquetas").toString().trim();
//            filter.IN_SOURCEF = request.getParameter("IN_SOURCEF").toString().trim();
//            filter.IN_SOURCEF2 = request.getParameter("IN_SOURCEF2").toString().trim();
//            filter.IN_TABLA = request.getParameter("IN_TABLA").toString().trim();
//            filter.IN_TABLA2 = request.getParameter("IN_TABLA2").toString().trim();
//            filter.RN = Integer.parseInt(request.getParameter("RN"));
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

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

            if (!filter.strSelect.equals("")) {
                lst = logic.loadPXPRUEBA2(filter);
            } else {
                lst = logic.loadPXPRUEBA(filter);
            }
//

        } catch (Exception e) {
            System.out.println("--" + e.getMessage());
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "obtainDataCampos")
    public @ResponseBody
    String obtainDataCampos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : obtainDataCampos-------------");
        logic = new BusinessToolsLogic();
        List<A1248> lstCampos = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla1 = request.getParameter("tabla").toString().trim();
            String tabla2 = request.getParameter("tabla2").toString().trim();

            lstCampos = logic.loadPX275SQP01033(tabla1, tabla2);
        } catch (Exception e) {
            System.out.println("--> " + e.getMessage());
            throw new SpringException(e);
        }

        System.out.println("Total : " + lstCampos.size());
        map.put("success", true);
        map.put("data", lstCampos);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SaveQuery")
    public @ResponseBody
    String SaveQuery(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : SaveQuery-------------");
        logic = new BusinessToolsLogic();
        SQP00768 filter = new SQP00768();
        String msj = "";
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter.strFecha = request.getParameter("strFecha").toString().trim();
            filter.chkGroup = Boolean.parseBoolean(request.getParameter("chkGroup").toString().trim());
            filter.strCodigo = request.getParameter("strCodigo").toString().trim();
            filter.strDescrip = request.getParameter("strDescrip").toString().trim();
            filter.strSaveSelect = request.getParameter("strSaveSelect").toString().trim();
            filter.strSaveQuery = request.getParameter("strSaveQuery").toString().trim();
            filter.IN_TABLA = request.getParameter("IN_TABLA").toString().trim();
            filter.IN_TABLA2 = request.getParameter("IN_TABLA2").toString().trim();
            filter.IN_USU = request.getParameter("IN_USU").toString().trim();

            msj = logic.loadPX282SQP00777(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", msj);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "obtainListFavoritos")
    public @ResponseBody
    String obtainListFavoritos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : obtainListFavoritos-------------");
        logic = new BusinessToolsLogic();
        List<SQP00768> lstFavoritos = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla1 = request.getParameter("tabla").toString().trim();

            lstFavoritos = logic.loadPX275SQP01034(tabla1);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lstFavoritos);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "obtainDataFavoritos")
    public @ResponseBody
    String obtainDataFavoritos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : obtainDataFavoritos-------------");
        logic = new BusinessToolsLogic();
        List<SQP00768> lstFavoritos = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla").toString().trim();
            String codigo = request.getParameter("codigo").toString().trim();

            lstFavoritos = logic.loadPX282SQP00808(tabla, codigo);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lstFavoritos);

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getFieldsXLSX")
    public @ResponseBody
    void exportFields(HttpServletRequest request, HttpServletResponse response) {
        List<SQP00768> lst = this.getList(request, true);
        String downloadName = String.format("BussinessTools_%1$s.xlsx", UUID.randomUUID().toString().toLowerCase());

        try {
            String schema = request.getParameter("schema");
            ExportSchema exportSchema = new Gson().fromJson(schema, ExportSchema.class);
            
            ExportUtil.exportToXLSX(response, downloadName, SQP00768.class, lst, exportSchema);
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    
    
    @RequestMapping(value = "ExportTXT")
    public @ResponseBody
    void ExportTXT(HttpServletRequest request, HttpServletResponse response) {
        List<SQP00768> listaData = this.getList(request, true);
        
        SQP00768 filter = new SQP00768();
        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        
        int objRN = (int) filter.RN;
        String column1 = filter.column1;
        
        String Nombre = String.format("BussinessTools_%1$s", Functions.getFechaActual()+ "_"+Functions.getHoraActual());

        String strRuta = (String)serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD") + "\\";
        try {
            
            PrintWriter pwAtt = null;
            
            pwAtt = new PrintWriter(strRuta + Nombre + ".txt");

            pwAtt.println(column1);

            for (int i = 0; i < listaData.size(); i++) {
                SQP00768 obj = listaData.get(i);
                String cade = "";
                cade = listaData.get(i).column1.toString() + "," + listaData.get(i).column2.toString() + "," + listaData.get(i).column3.toString() + ","
                        + listaData.get(i).column4.toString() + "," + listaData.get(i).column5.toString() + "," + listaData.get(i).column6.toString() + "," + listaData.get(i).column7.toString();

                if (objRN > 7) {

                    cade = cade + "," + listaData.get(i).column8.toString() + "," + listaData.get(i).column9.toString() + "," + listaData.get(i).column10.toString() + ","
                            + listaData.get(i).column11.toString() + "," + listaData.get(i).column12.toString() + "," + listaData.get(i).column13.toString();
                }
                if (objRN >= 14) {

                    cade = cade + "," + listaData.get(i).column14.toString() + "," + listaData.get(i).column15.toString() + "," + listaData.get(i).column16.toString() + ","
                            + listaData.get(i).column17.toString() + "," + listaData.get(i).column18.toString() + "," + listaData.get(i).column19.toString();
                }
                if (objRN >= 20) {

                    cade = cade + "," + listaData.get(i).column20.toString() + "," + listaData.get(i).column21.toString() + "," + listaData.get(i).column22.toString() + ","
                            + listaData.get(i).column23.toString() + "," + listaData.get(i).column24.toString() + "," + listaData.get(i).column25.toString();
                }
                if (objRN >= 26) {

                    cade = cade + "," + listaData.get(i).column26.toString() + "," + listaData.get(i).column27.toString() + "," + listaData.get(i).column28.toString() + ","
                            + listaData.get(i).column29.toString() + "," + listaData.get(i).column30.toString();
                }
                if (objRN >= 31) {

                    cade = cade + "," + listaData.get(i).column31.toString() + "," + listaData.get(i).column32.toString() + "," + listaData.get(i).column33.toString() + ","
                            + listaData.get(i).column34.toString() + "," + listaData.get(i).column35.toString();
                }
                if (objRN >= 36) {

                    cade = cade + "," + listaData.get(i).column36.toString() + "," + listaData.get(i).column37.toString() + "," + listaData.get(i).column38.toString() + ","
                            + listaData.get(i).column39.toString() + "," + listaData.get(i).column40.toString();
                }
                if (objRN >= 41) {

                    cade = cade + "," + listaData.get(i).column41.toString() + "," + listaData.get(i).column42.toString() + "," + listaData.get(i).column43.toString() + ","
                            + listaData.get(i).column44.toString() + "," + listaData.get(i).column45.toString();
                }
                if (objRN >= 46) {

                    cade = cade + "," + listaData.get(i).column46.toString() + "," + listaData.get(i).column47.toString() + "," + listaData.get(i).column48.toString() + ","
                            + listaData.get(i).column49.toString() + "," + listaData.get(i).column50.toString();
                }

                pwAtt.println(cade);

            }

            pwAtt.close();

//            zipFile(strRuta, Nombre);
            
            
            //Create list for file URLs - these are files from all different locations
            List<String> filenames = new ArrayList<String>();
            filenames.add(strRuta + Nombre + ".txt");
            
            //..code to add URLs to the list
            byte[] buf = new byte[2048];

            // Create the ZIP file
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ZipOutputStream out = new ZipOutputStream(baos);

            // Compress the files
            for (int i=0; i<filenames.size(); i++) {

            FileInputStream fis = new FileInputStream(filenames.get(i).toString());
            BufferedInputStream bis = new BufferedInputStream(fis);

            // Add ZIP entry to output stream.
            File filezip = new File(filenames.get(i).toString());
            String entryname = filezip.getName();
            out.putNextEntry(new ZipEntry(entryname));

            int bytesRead;
            while ((bytesRead = bis.read(buf)) != -1) {
            out.write(buf, 0, bytesRead);
            }

            out.closeEntry();
            bis.close();
            fis.close();
            }

            out.flush();
            baos.flush();
            out.close();
            baos.close();

            ServletOutputStream sos = response.getOutputStream();
            response.setContentType("application/zip");
//            response.setHeader("Content-Disposition", "attachment; filename=\"Policy.ZIP\"");
            response.setHeader("Content-Disposition", "attachment; filename=\""+Nombre+".ZIP\"");
            sos.write(baos.toByteArray());
            out.flush();
            out.close();
            sos.flush();
            
        } catch (Exception e) {
            throw new SpringException(e);
        }
    }
    

    @RequestMapping(value = "executeValuation")
    public @ResponseBody
    String executeValuation(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- BusinessTools : executeValuation-------------");
        logic = new BusinessToolsLogic();
        SQP00768 filter = new SQP00768();
        String msj = "";
        try {
            logic.setSession(this.serverSession.getServerSession());

            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic.executeValuation(filter);
            msj = filter.strMSG;
            
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("mensaje", msj);

        return new Gson().toJson(map);
    }

//    @RequestMapping(value = "getXLSX")
//    public @ResponseBody
//    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("BusinessTools : getXLSX");
//
//        String fileNameDownload = String.format("BusinessTools- " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
//
//        try {
//
//            Workbook workbook;
//            File file = File.createTempFile(fileNameDownload, ".xlsx");
//            List<CAF003Filter> listaData = this.getList(request, true);
//            System.out.println("Tamaño de lista devuelta : " + listaData.size());
//
//            workbook = new XSSFWorkbook();
//
//            Sheet sheet = workbook.createSheet("BusinessTools");
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
//            Cell CH1_02 = row.createCell(2);
//            Cell CH1_03 = row.createCell(3);
//            Cell CH1_04 = row.createCell(4);
//            Cell CH1_05 = row.createCell(5);
//            Cell CH1_06 = row.createCell(6);
//            Cell CH1_07 = row.createCell(7);
//            Cell CH1_08 = row.createCell(8);
//            Cell CH1_09 = row.createCell(9);
//            Cell CH1_10 = row.createCell(10);
//            Cell CH1_11 = row.createCell(11);
//            Cell CH1_12 = row.createCell(12);
//            Cell CH1_13 = row.createCell(13);
//            Cell CH1_14 = row.createCell(14);
//            Cell CH1_15 = row.createCell(15);
//            Cell CH1_16 = row.createCell(16);
////            Cell CH1_17 = row.createCell(17);
//
//            CH1_00.setCellValue("RN");
//            CH1_01.setCellValue("Sales Date");
//            CH1_02.setCellValue("Airline");
//            CH1_03.setCellValue("AWB Number");
//            CH1_04.setCellValue("CCA ID");
//            CH1_05.setCellValue("Seq");
//            CH1_06.setCellValue("Departure");
//            CH1_07.setCellValue("Arrival");
//            CH1_08.setCellValue("Farecal");
//            CH1_09.setCellValue("Payment Type");
//            CH1_10.setCellValue("Other Charges");
//            CH1_11.setCellValue("Currency");
//            CH1_12.setCellValue("Weight Charge");
//            CH1_13.setCellValue("Fuel Value");
//            CH1_14.setCellValue("Security Value");
//            CH1_15.setCellValue("Fee Value");
//            CH1_16.setCellValue("Other Value");
//
//            CH1_00.setCellStyle(headerStyle);
//            CH1_01.setCellStyle(headerStyle);
//            CH1_02.setCellStyle(headerStyle);
//            CH1_03.setCellStyle(headerStyle);
//            CH1_04.setCellStyle(headerStyle);
//            CH1_05.setCellStyle(headerStyle);
//            CH1_06.setCellStyle(headerStyle);
//            CH1_07.setCellStyle(headerStyle);
//            CH1_08.setCellStyle(headerStyle);
//            CH1_09.setCellStyle(headerStyle);
//            CH1_10.setCellStyle(headerStyle);
//            CH1_11.setCellStyle(headerStyle);
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
////            CH1_17.setCellStyle(headerStyle);
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
//                Cell rcell4 = row.createCell(4);
//                Cell rcell5 = row.createCell(5);
//                Cell rcell6 = row.createCell(6);
//                Cell rcell7 = row.createCell(7);
//                Cell rcell8 = row.createCell(8);
//                Cell rcell9 = row.createCell(9);
//                Cell rcell10 = row.createCell(10);
//                Cell rcell11 = row.createCell(11);
//                Cell rcell12 = row.createCell(12);
//                Cell rcell13 = row.createCell(13);
//                Cell rcell14 = row.createCell(14);
//                Cell rcell15 = row.createCell(15);
//                Cell rcell16 = row.createCell(16);
//                Cell rcell17 = row.createCell(17);
//
//                rcell0.setCellValue(listaData.get(vi).RN);
//                rcell1.setCellValue(listaData.get(vi).SDATE);
//                rcell2.setCellValue(listaData.get(vi).CCIA);
//                rcell3.setCellValue(listaData.get(vi).AWBNBR);
//                rcell4.setCellValue(listaData.get(vi).CCAID);
//                rcell5.setCellValue(listaData.get(vi).SEQ);
//                rcell6.setCellValue(listaData.get(vi).DEPINI);
//                rcell7.setCellValue(listaData.get(vi).ARRFIN);
//                rcell8.setCellValue(listaData.get(vi).FARECAL);
//                rcell9.setCellValue(listaData.get(vi).COLLECTF);
//                rcell10.setCellValue(listaData.get(vi).COLLECTO);
//                rcell11.setCellValue(listaData.get(vi).SCURRENCY);
//                rcell12.setCellValue(listaData.get(vi).VFLETER);
//                rcell13.setCellValue(listaData.get(vi).VFUELR);
//                rcell14.setCellValue(listaData.get(vi).VSECR);
//                rcell15.setCellValue(listaData.get(vi).VFEER);
//                rcell16.setCellValue(listaData.get(vi).VOTHR);
//
////                rcell0.setCellStyle(bodyStyle);
////                rcell1.setCellStyle(bodyStyle);
////                rcell2.setCellStyle(bodyStyle);
////                rcell3.setCellStyle(bodyStyle);
////                rcell4.setCellStyle(bodyStyle);
////                rcell5.setCellStyle(bodyStyle);
////                rcell6.setCellStyle(bodyStyle);
////                rcell7.setCellStyle(bodyStyle);
////                rcell8.setCellStyle(bodyStyle);
////                rcell9.setCellStyle(bodyStyle);
////                rcell10.setCellStyle(bodyStyle);
////                rcell11.setCellStyle(bodyStyle);
////                rcell12.setCellStyle(bodyStyle);
////                rcell13.setCellStyle(bodyStyle);
////                rcell14.setCellStyle(bodyStyle);
////                rcell15.setCellStyle(bodyStyle);
////                rcell16.setCellStyle(bodyStyle);
////                rcell17.setCellStyle(bodyStyle);
//                iter.next();
//                ++vi;
//                ++vj;
//            }
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
//            sheet.autoSizeColumn(16, true);
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
//            System.out.println(" ---> " + e.getMessage());
//            throw new SpringException(e);
//        }
//
//    }
}
