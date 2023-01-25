package net.miatech.praxis.controllers.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.OCRLoadLogic;
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
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/OCRLoad")
public class OCRLoadController extends BaseController {

    private OCRLoadLogic logic;
    private A1692Filter filter;
    private MasterDAO masterDAO;

    @RequestMapping(value = "/obtainDataCombo")
    public @ResponseBody
    String obtainDataCombo(ModelMap map, HttpServletRequest request) {
        try {
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            
            List<A1007> ciudades = masterDAO.loadCiudades();
            List<A006> paises = masterDAO.loadPaises();

            map.put("success", true);
            map.put("lstCiudades", ciudades);
            map.put("lstPaises", paises);
        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }
        
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchTKT")
    public @ResponseBody
    String searchTKT(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaDataTKT;
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        //HashMap<String, String> hmPaises = serverSession.getPaises();
        try {
            filter.IN_TKT = request.getParameter("IN_TKT").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new OCRLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaDataTKT = logic.loadPX083S01A1692TKT(filter, hmAeropuertos);
            map.put("success", true);
            map.put("total", listaDataTKT.size() > 0 ? listaDataTKT.get(0).page.TOTROW : 0);
            map.put("data", listaDataTKT);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A1692Filter> listaData;
        filter = new A1692Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        //HashMap<String, String> hmPaises = serverSession.getPaises();
        try {
            filter.yearFrom = request.getParameter("yearFrom").trim();
            filter.monthFrom = request.getParameter("monthFrom").trim();
            filter.dayFrom = request.getParameter("dayFrom").trim();
            filter.yearTo = request.getParameter("yearTo").trim();
            filter.monthTo = request.getParameter("monthTo").trim();
            filter.dayTo = request.getParameter("dayTo").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
//            filter.STVAL = request.getParameter("STVAL").trim();
//            filter.PSVVTA = request.getParameter("PSVVTA").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new OCRLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadPX083S01A1692(filter, hmAeropuertos);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);

        } catch (NumberFormatException | SQLException ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", "Se produjo un error. " + ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    /*PARA EL DATAENTRY DEL TICKET_FORM ***************************************/
    @RequestMapping(value = "/searchBeanTkt")
    public @ResponseBody
    String searchBeanTkt(ModelMap map, HttpServletRequest request) {
        A1692Filter bean;
        filter = new A1692Filter();
        try {
            filter.strTicket = request.getParameter("strTicket").trim();
            
            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
            
            logic = new OCRLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            bean = logic.loadPX083SQP0068(filter.strTicket, hmAeropuertos);
            
            String[] lista;
            String imagen = "";
            
            FilenameFilter fnfJPG = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return (name.toLowerCase().endsWith(".jpg"));
                }
            };
            
            String ruta = bean.FILENAME, carpeta = "", fileName = "";
            StringTokenizer st = new StringTokenizer(ruta, "\\");
            if (st.hasMoreElements()) carpeta = st.nextElement().toString();
            if (st.hasMoreElements()) fileName = st.nextElement().toString();
            //String pathImgs = "\\\\CORREO\\AM\\IXC\\".concat(strFechaScan);
            String pathImgs = "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\".concat(carpeta);
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfJPG);

            if (lista != null && lista.length > 0) {
                for (String lista1 : lista) {
                    if (lista1.trim().equals(fileName)) {
                        imagen = lista1.trim();
                        break;
                    }
                }
            }
            map.put("success", true);
            map.put("ruta", bean.FILENAME);
            map.put("carpeta", carpeta);
            map.put("imagen", imagen);
            map.put("beanConsTkt", bean);

        } catch (NumberFormatException | SQLException e) {
            System.out.println(e.getMessage());
            map.put("success", false);
            map.put("session", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            map.put("success", false);
            map.put("session", e.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "getImagen")
    public @ResponseBody
    String getImagen(HttpServletRequest request) {
        try {
            return new net.miatech.praxis.classes.GetImageController().getImagen(request, this.serverSession.getServerSession());
        } catch (IOException ex) {
            System.out.println("--> " + ex.getMessage());
        }
        return "";
    }
    
    @RequestMapping(value = "/executeOptionTkt")
    public @ResponseBody
    String executeOptionTkt(ModelMap map, HttpServletRequest request) {
        //REALIZA INSERT, UPDATE O DELETE DE UN REGISTRO DEL A1691
        String strOption = "";
        filter = new A1692Filter();
        String msj = "";
        try {
            strOption = request.getParameter("strOption");
            filter.DFLIGHT = request.getParameter("DFLIGHT").trim();
            filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
            filter.CDEPART = request.getParameter("CDEPART").trim();
            filter.CARRIVA = request.getParameter("CARRIVA").trim();
            
            filter.PSVVTA = request.getParameter("PSVVTA").trim();
            filter.AGTIA = request.getParameter("AGTIA").trim();
//            filter.CARR = request.getParameter("CARR").trim();
            filter.STVAL = request.getParameter("STVAL").trim();
            filter.TKTASO = request.getParameter("TKTASO").trim();
            filter.strTicket = request.getParameter("strTicket").trim();
            
            filter.CCIA = request.getParameter("CCIA").trim();
            filter.FORMA = request.getParameter("FORMA").trim();
            filter.SERIE = request.getParameter("SERIE").trim();
            filter.CUPON = request.getParameter("CUPON").trim();
            filter.DCHEQ = request.getParameter("DCHEQ").trim();
            filter.ZONA = request.getParameter("ZONA").trim();
            filter.VCPN = request.getParameter("VCPN")==null?0:Double.parseDouble(request.getParameter("VCPN"));
            filter.COMISI = request.getParameter("COMISI")==null?0:Double.parseDouble(request.getParameter("COMISI"));
            filter.VTAX = request.getParameter("VTAX")==null?0:Double.parseDouble(request.getParameter("VTAX"));
            filter.MDACP = request.getParameter("MDACP").trim();
            filter.RFIC = request.getParameter("RFIC").trim();
            filter.RECODE = request.getParameter("RECODE");
            filter.FOPERZUL = request.getParameter("FOPERZUL").trim();
//            filter.FVAL = request.getParameter("FVAL").trim();
//            filter.FECVAL = request.getParameter("FECVAL").trim();
//            filter.IN_CARR = request.getParameter("IN_CARR").trim();
            
            filter.TDOC = request.getParameter("TDOC").trim();
            filter.FLOAD = request.getParameter("FLOAD").trim();
            String temp = request.getParameter("QTYPAX");
            if(temp.equals("")) filter.QTYPAX = 0;
            else filter.QTYPAX = Integer.parseInt(temp);
            filter.CABI = request.getParameter("CABI").trim();
            filter.CLAS = request.getParameter("CLAS").trim();
            filter.FBASE = request.getParameter("FBASE").trim();
            filter.NPLANE = request.getParameter("NPLANE").trim();
            
            logic = new OCRLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            //Validando que las ciudades de Origen y Destino existan ===========
            msj = logic.loadPX083SQP01281(filter, "O");//'O' para que valide el vuelo sin itinerario y sin leg

            if (msj.equals("")) {
                //Obteniendo los datos del Manifiesto de Vuelo (A1691)
                filter = logic.loadPX083SQP0008(filter);
                //Una vez pasado las validaciones el OCR (Cupón Errado) queda con Status 'Pendiente'
                if (filter.STVAL.trim().equals("6") || filter.STVAL.trim().equals("7")) {
                    filter.STVAL = "1";
                }

                if (filter.TDOC.trim().equals("M")) {
                    //MCO
                    filter.TDOC = "";
                    filter.FLOAD = "2";
                    msj = logic.loadPX083SQP0069(filter, "I");
                    //Actualiza los campos en el A1817 luego de hacer ciertos cálculos.
                    msj = logic.loadPX083SQP0070(filter);

                } else {
                    //Ticket, Fim
                    if (filter.TDOC.trim().equals("F")) {
                        filter.FLOAD = "4";
                    }else{
                        filter.FLOAD = "2";
                        filter.TDOC = "";
                    }
                    msj = logic.loadPX095SQP0071(filter);
                    //Actualiza los campos en el A1691 luego de hacer ciertos cálculos.
                    msj = logic.loadPX095S12QCAL(filter, "");
                }

                //Una vez ingresado el OCR, se actualiza el registro en A1690
                msj = logic.loadPX083SQP0072(filter, strOption);
            }
            map.put("success", true);
            map.put("msjOption", msj);
            map.put("strOption", strOption);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            map.put("success", false);
            map.put("session", "Se produjo un error. " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            map.put("success", false);
            map.put("session", "Se produjo un error. " + e.getMessage());
        }

        return new Gson().toJson(map);
    }
//    @RequestMapping(value = "/setMantenimientoCARDUATP")
//    public @ResponseBody
//    String setMantenimientoCARDUATP(ModelMap map, HttpServletRequest request) {
//        List<A1692Filter> lstRtn;
//        String VP_ACTION;
//        filter = new A1692Filter();
//        try {
//            VP_ACTION = request.getParameter("strOption");
//            filter.A2860INDAC = request.getParameter("A2860INDAC");
//            filter.A2860VCARX = request.getParameter("A2860VCARX");
//            filter.A2860VCARD = request.getParameter("A2860VCARD");
//            filter.A2860EFFST = request.getParameter("A2860EFFST");
//            filter.A2860EFFEN = request.getParameter("A2860EFFEN");
//            filter.A2860APLYU = request.getParameter("A2860APLYU");
//            filter.A2860APLYB = request.getParameter("A2860APLYB");
//            filter.A2860PRODU = request.getParameter("A2860PRODU");
//            filter.A2860COMNM = request.getParameter("A2860COMNM");
//
//            logic = new OCRLoadLogic();
//            logic.setSession((IServerSession) serverSession.getServerSession());
//            lstRtn = logic.setMantenimientoCARDMCO(filter, VP_ACTION);
//            //resp.info.add(objRtn.OU_MESSAGE);
//            //resp.info.add(objRtn.OU_SQLCODE);
//            map.put("intResult", lstRtn.get(0).OU_MESSAGE);
////            map.put("strOption", strOption);
//        } catch (SQLException e) {
//            map.put("success", false);
//            throw new SpringException(e);
//        }
//
//        return new Gson().toJson(map);
//    }

//    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        List<A1692Filter> listaData;
        filter = new A1692Filter();
        
        String fileNameDownload = String.format("OCR Load - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        
        try {
            Workbook workbook = null;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            masterDAO = new MasterDAO();
            masterDAO.setSession((IServerSession) serverSession.getServerSession());
            HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();

            logic = new OCRLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            
            if (request.getParameter("IN_TKT") == null) {
                filter.yearFrom = request.getParameter("yearFrom").trim();
                filter.monthFrom = request.getParameter("monthFrom").trim();
                filter.dayFrom = request.getParameter("dayFrom").trim();
                filter.yearTo = request.getParameter("yearTo").trim();
                filter.monthTo = request.getParameter("monthTo").trim();
                filter.dayTo = request.getParameter("dayTo").trim();
                filter.NFLIGHT = request.getParameter("NFLIGHT").trim();
    //            filter.STVAL = request.getParameter("STVAL").trim();
    //            filter.PSVVTA = request.getParameter("PSVVTA").trim();
                filter.CDEPART = request.getParameter("CDEPART").trim();
                filter.CARRIVA = request.getParameter("CARRIVA").trim();
                
                listaData = logic.loadPX083S01A1692(filter, hmAeropuertos);
            } else {
                filter.IN_TKT = request.getParameter("IN_TKT").trim();
                
                listaData = logic.loadPX083S01A1692TKT(filter, hmAeropuertos);
            }
            
            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("OCR Load");
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
            CH1_00.setCellValue("Ticket");
            Cell CH1_01 = row.createCell(1);
            CH1_01.setCellValue("Flight");

            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 4));

            CH1_00.setCellStyle(headerStyle);
            CH1_01.setCellStyle(headerStyle);

            sheet.autoSizeColumn(0, true);
            sheet.autoSizeColumn(1, true);

            ++vj;
            
            Row row2 = sheet.createRow(vj);

            Cell CH2_01 = row2.createCell(1);
            CH2_01.setCellValue("Date");
            Cell CH2_02 = row2.createCell(2);
            CH2_02.setCellValue("Processing Date");
            Cell CH2_03 = row2.createCell(3);
            CH2_03.setCellValue("Number");
            Cell CH2_04 = row2.createCell(4);
            CH2_04.setCellValue("Departure");
            Cell CH2_05 = row2.createCell(5);
            CH2_05.setCellValue("Arrival");

            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 5));

            CH2_01.setCellStyle(headerStyle);
            CH2_02.setCellStyle(headerStyle);
            CH2_03.setCellStyle(headerStyle);
            CH2_04.setCellStyle(headerStyle);
            CH2_05.setCellStyle(headerStyle);

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

                cell50.setCellValue(listaData.get(vi).strTicket);
                cell51.setCellValue(listaData.get(vi).strFormatDate);
                cell52.setCellValue(listaData.get(vi).PRDA);
                cell53.setCellValue(listaData.get(vi).NFLIGHT);
                cell54.setCellValue(listaData.get(vi).CDEPART);
                cell55.setCellValue(listaData.get(vi).CARRIVA);

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
