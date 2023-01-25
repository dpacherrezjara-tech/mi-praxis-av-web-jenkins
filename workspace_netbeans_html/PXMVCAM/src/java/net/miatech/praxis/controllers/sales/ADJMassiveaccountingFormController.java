/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.sales;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.sales.ADJMassiveaccountingFormLogic;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import net.miatech.beans.A3344Filter;
import net.miatech.utils.Functions;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/ADJMassiveaccountingForm")
public class ADJMassiveaccountingFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ADJMassiveaccountingFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A3344Filter> lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.VL_DATEFROM = request.getParameter("VL_DATEFROM");
            filter.VL_DATETO = request.getParameter("VL_DATETO");
            filter.VP_TKT = request.getParameter("VP_TKT");
            filter.VP_CIA = request.getParameter("VP_CIA");
            filter.VP_USER = request.getParameter("VP_USER");
            filter.VP_FUENT = request.getParameter("VP_FUENT");
            filter.VP_STAS = request.getParameter("VP_STAS");
            filter.VP_TYPE = request.getParameter("VP_TYPE");
            filter.VP_SEQ = request.getParameter("VP_SEQ");

            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.search(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ListAdjmassive")
    public @ResponseBody
    String ListAdjmassive(ModelMap map, HttpServletRequest request) {
        List<A3344Filter> lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.ListAdjmassive(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTKT")
    public @ResponseBody
    String insertTKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A3344Filter> gridData = new ArrayList<A3344Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A3344Filter data = new A3344Filter();
                data.A3344CIA = gsonObj.get("A3344CIA").getAsString();
                data.A3344FORMA = gsonObj.get("A3344FORMA").getAsString();
                data.A3344SERIE = gsonObj.get("A3344SERIE").getAsString();
                data.A3344SEQ = gsonObj.get("A3344SEQ").getAsString();
                data.A3344CPN = gsonObj.get("A3344CPN").getAsString();
                data.A3344TNC = gsonObj.get("A3344TNC").getAsString();
                data.A3344CRRL = gsonObj.get("A3344CRRL").getAsString();
                gridData.add(data);

            }
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "DeleteContabili")
    public @ResponseBody
    String DeleteContabili(ModelMap map, HttpServletRequest request) {
        A3344Filter lst;
        A3344Filter filter = new A3344Filter();

        try {
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            lst = logic.lst_delete(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validar_excel_adjmassive_sale", method = RequestMethod.POST)
    public @ResponseBody
    String validar_excel_adjmassive_sale(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A3344Filter filter = new A3344Filter();
        ArrayList<A3344Filter> lstGeneral = new ArrayList<A3344Filter>(0);
        A3344Filter fileA3344;
        String mensaje = "";
        int i = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        String vl_A3344TKT = "";
        String VP_A3344TKT;
        double vl_A3344DBLOC = 0;
        double vl_A3344CRLOC = 0;
        double vl_A3344DBREV = 0;
        double vl_A3344CRREV = 0;

        double vl_A3344DBLOC_GL = 0;
        double vl_A3344CRLOC_GL = 0;
        double vl_A3344DBREV_GL = 0;
        double vl_A3344CRREV_GL = 0;
        double vl_A3344DBLOC_AR = 0;
        double vl_A3344CRLOC_AR = 0;
        double vl_A3344DBREV_AR = 0;
        double vl_A3344CRREV_AR = 0;
        double vl_A3344DBLOC_AP = 0;
        double vl_A3344CRLOC_AP = 0;
        double vl_A3344DBREV_AP = 0;
        double vl_A3344CRREV_AP = 0;
        String vl_fuente = "";
        String vl_sufuente = "";
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA3344 = new A3344Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {

                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA3344.A3344CCUST = "139";
                        fileA3344.VP_TYPE = filter.VP_OPTION;
                        //obteniendo el TKT
                        fileA3344.A3344TKT = currentRow.getCell(0).toString();
                        if (fileA3344.A3344TKT.equals("")) {
                            mensaje = "Ticket Number Required";
                            break;
                        }
                        if (fileA3344.A3344TKT.length() != 13) {
                            mensaje = "THE Ticket MUST BE 13 CHARACTERES  " + fileA3344.A3344TKT;
                            break;
                        }
                        //seq
                        if (currentRow.getCell(1) == null) {
                            mensaje = "Seq Number Required";
                            break;
                        } else {
                            fileA3344.A3344SEQ = currentRow.getCell(1).toString();
                            if (fileA3344.A3344SEQ.equals("")) {
                                mensaje = "Sale Date  OR USE Required";
                                break;
                            }
                            if (fileA3344.A3344SEQ.length() != 8) {
                                mensaje = "SALE DATE OR USE  MUST BE 8 CHARACTERES  " + fileA3344.A3344SEQ;
                                break;
                            }
                        }
                        //cpn
                        if (currentRow.getCell(2) == null) {
                            mensaje = "Cupón Number Required";
                            break;
                        } else {
                            fileA3344.A3344CPN = currentRow.getCell(2).toString();
                            if (fileA3344.A3344CPN.equals("")) {
                                mensaje = "Cupón Number Required";
                                break;
                            }
                            if (fileA3344.A3344CPN.length() != 1) {
                                mensaje = "THE Cupón MUST BE 1 CHARACTERES  " + fileA3344.A3344CPN;
                                break;
                            }
                        }
                        //Transaction_type_code
                        if (currentRow.getCell(3) == null) {
                            mensaje = "Transaction type Required";
                            break;
                        } else {
                            fileA3344.A3344TRNCU = currentRow.getCell(3).toString();
                            if (fileA3344.A3344TRNCU.equals("")) {
                                mensaje = "Transaction type Required";
                                break;
                            }
                            if (filter.VP_OPTION.equals("IXP")) {
                                if (fileA3344.A3344TRNCU.length() != 3) {
                                    mensaje = "THE Transaction type MUST BE 4 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            } else {
                                if (fileA3344.A3344TRNCU.length() != 4) {
                                    mensaje = "THE Transaction type MUST BE 4 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            }
                        }
                        //pais solo para ventas y caducos
                        if (currentRow.getCell(4) == null) {
                            fileA3344.A3344PAIS = "";
                        } else {
                            fileA3344.A3344PAIS = currentRow.getCell(4).toString();
                        }
                        if (fileA3344.A3344PAIS.equals("")) {
                            mensaje = "Country Required";
                            break;
                        }
                        if (fileA3344.A3344PAIS.length() != 2) {
                            mensaje = "THE Country MUST BE 2 CHARACTERES  " + fileA3344.A3344PAIS;
                            break;
                        }
                        //fuente solo para ventas y caducos
                        if (currentRow.getCell(5) == null) {
                            fileA3344.A3344FUENT = "";
                        } else {
                            fileA3344.A3344FUENT = currentRow.getCell(5).toString();
                        }
                        if (fileA3344.A3344FUENT.equals("")) {
                            mensaje = "Source Required";
                            break;
                        }
                        if (fileA3344.A3344FUENT.length() != 3) {
                            mensaje = "THE Source MUST BE 3 CHARACTERES  " + fileA3344.A3344FUENT;
                            break;
                        }
                        if (!fileA3344.A3344FUENT.equals("BSP") && !fileA3344.A3344FUENT.equals("ASR") && !fileA3344.A3344FUENT.equals("ARC") && !fileA3344.A3344FUENT.equals("MAN")) {
                            mensaje = "The source of sale must be ASR OR BSP OR MAN OR ARC  " + fileA3344.A3344FUENT;
                            break;
                        }
                        //sub_fuente solo para ventas y caducos
                        if (currentRow.getCell(6) == null) {
                            fileA3344.A3344SUBFU = "";
                        } else {
                            fileA3344.A3344SUBFU = currentRow.getCell(6).toString();
                        }
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344SUBFU.equals("")) {
                                mensaje = "Channel Required";
                                break;
                            }
                            if (fileA3344.A3344SUBFU.length() != 3) {
                                mensaje = "THE Channel MUST BE 3 CHARACTERES  " + fileA3344.A3344SUBFU;
                                break;
                            }

                        }
                        //CARRIER solo para ventas y caducos
                        if (currentRow.getCell(7) == null) {
                            fileA3344.A3344CARRIR = "";
                        } else {
                            fileA3344.A3344CARRIR = currentRow.getCell(7).toString();
                        }
                        if (filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344CARRIR.equals("")) {
                                mensaje = "Carrier Required";
                                break;
                            }
                            if (fileA3344.A3344CARRIR.length() != 2) {
                                mensaje = "THE Carrier MUST BE 2 CHARACTERES  " + fileA3344.A3344CARRIR;
                                break;
                            }
                            if (!fileA3344.A3344CARRIR.equals("5D") && !fileA3344.A3344CARRIR.equals("AM")) {
                                mensaje = "THE Carrier 5D OR AM  " + fileA3344.A3344CARRIR;
                                break;
                            }
                        }

                        //Concepto 1 solo para ventas y caducos
                        if (currentRow.getCell(8) == null) {
                            fileA3344.A3344CONP1 = "";
                        } else {
                            fileA3344.A3344CONP1 = currentRow.getCell(8).toString();
                        }
                        if (fileA3344.A3344CONP1.equals("")) {
                            mensaje = "Concepto 1 Required";
                            break;
                        }
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (!fileA3344.A3344CONP1.trim().equals("FP") && !fileA3344.A3344CONP1.trim().equals("TX") && !fileA3344.A3344CONP1.trim().equals("FA") && !fileA3344.A3344CONP1.trim().equals("CM")) {
                                mensaje = "The Concept 1 has to be FP or FA  or TX or CM";
                                break;
                            }
                        }
                        /// concepto 2
                        if (currentRow.getCell(9) == null) {
                            fileA3344.A3344CONP2 = "";
                        } else {
                            fileA3344.A3344CONP2 = currentRow.getCell(9).toString().trim();
                        }
                        if (!filter.VP_OPTION.equals("DISC")) {
                            if (fileA3344.A3344CONP2.equals("")) {
                                mensaje = "Concepto 2 Required";
                                break;
                            }
                            /* if (!fileA3344.A3344CONP2.equals("TQ") && !fileA3344.A3344CONP2.equals("QO") && !fileA3344.A3344CONP2.equals("AR") && !fileA3344.A3344CONP2.equals("ZK")
                                    && !fileA3344.A3344CONP2.equals("BR") && !fileA3344.A3344CONP2.equals("CA") && !fileA3344.A3344CONP2.equals("SQ") && !fileA3344.A3344CONP2.equals("XG")
                                    && !fileA3344.A3344CONP2.equals("XQ") && !fileA3344.A3344CONP2.equals("ZQ") && !fileA3344.A3344CONP2.equals("JS") && !fileA3344.A3344CONP2.equals("CO")
                                    && !fileA3344.A3344CONP2.equals("DG") && !fileA3344.A3344CONP2.equals("YS") && !fileA3344.A3344CONP2.equals("CR") && !fileA3344.A3344CONP2.equals("OU")
                                    && !fileA3344.A3344CONP2.equals("NW") && !fileA3344.A3344CONP2.equals("IK") && !fileA3344.A3344CONP2.equals("FS") && !fileA3344.A3344CONP2.equals("EC")
                                    && !fileA3344.A3344CONP2.equals("WT") && !fileA3344.A3344CONP2.equals("ED") && !fileA3344.A3344CONP2.equals("QB") && !fileA3344.A3344CONP2.equals("QI")
                                    && !fileA3344.A3344CONP2.equals("IG") && !fileA3344.A3344CONP2.equals("IM") && !fileA3344.A3344CONP2.equals("IF") && !fileA3344.A3344CONP2.equals("SV")
                                    && !fileA3344.A3344CONP2.equals("JD") && !fileA3344.A3344CONP2.equals("QV") && !fileA3344.A3344CONP2.equals("FR") && !fileA3344.A3344CONP2.equals("QX")
                                    && !fileA3344.A3344CONP2.equals("QW") && !fileA3344.A3344CONP2.equals("IZ") && !fileA3344.A3344CONP2.equals("XC") && !fileA3344.A3344CONP2.equals("XB")
                                    && !fileA3344.A3344CONP2.equals("QQ") && !fileA3344.A3344CONP2.equals("HN") && !fileA3344.A3344CONP2.equals("GB") && !fileA3344.A3344CONP2.equals("QE")
                                    && !fileA3344.A3344CONP2.equals("NI") && !fileA3344.A3344CONP2.equals("FD") && !fileA3344.A3344CONP2.equals("FC") && !fileA3344.A3344CONP2.equals("PE")
                                    && !fileA3344.A3344CONP2.equals("HW") && !fileA3344.A3344CONP2.equals("DY") && !fileA3344.A3344CONP2.equals("US") && !fileA3344.A3344CONP2.equals("AY")
                                    && !fileA3344.A3344CONP2.equals("XA") && !fileA3344.A3344CONP2.equals("XY") && !fileA3344.A3344CONP2.equals("XF") && !fileA3344.A3344CONP2.equals("YC")
                                    && !fileA3344.A3344CONP2.equals("ZP") && !fileA3344.A3344CONP2.equals("YN") && !fileA3344.A3344CONP2.equals("AJ") && !fileA3344.A3344CONP2.equals("VE")
                                    && !fileA3344.A3344CONP2.equals("AK") && !fileA3344.A3344CONP2.equals("EU") && !fileA3344.A3344CONP2.equals("MX") && !fileA3344.A3344CONP2.equals("XO")
                                    && !fileA3344.A3344CONP2.equals("YQ") && !fileA3344.A3344CONP2.equals("AA") && !fileA3344.A3344CONP2.equals("AH") && !fileA3344.A3344CONP2.equals("A1")
                                    && !fileA3344.A3344CONP2.equals("BP") && !fileA3344.A3344CONP2.equals("CJ") && !fileA3344.A3344CONP2.equals("CN") && !fileA3344.A3344CONP2.equals("CP")
                                    && !fileA3344.A3344CONP2.equals("DO") && !fileA3344.A3344CONP2.equals("FZ") && !fileA3344.A3344CONP2.equals("OI") && !fileA3344.A3344CONP2.equals("PA")
                                    && !fileA3344.A3344CONP2.equals("PI") && !fileA3344.A3344CONP2.equals("PJ") && !fileA3344.A3344CONP2.equals("PX") && !fileA3344.A3344CONP2.equals("RC")
                                    && !fileA3344.A3344CONP2.equals("RN") && !fileA3344.A3344CONP2.equals("SW") && !fileA3344.A3344CONP2.equals("UB") && !fileA3344.A3344CONP2.equals("UX")
                                    && !fileA3344.A3344CONP2.equals("UY") && !fileA3344.A3344CONP2.equals("VB") && !fileA3344.A3344CONP2.equals("XR") && !fileA3344.A3344CONP2.equals("F3")
                                    && !fileA3344.A3344CONP2.equals("B1") && !fileA3344.A3344CONP2.equals("D1") && !fileA3344.A3344CONP2.equals("D2") && !fileA3344.A3344CONP2.equals("F4")
                                    && !fileA3344.A3344CONP2.equals("F5") && !fileA3344.A3344CONP2.equals("F6") && !fileA3344.A3344CONP2.equals("E2") && !fileA3344.A3344CONP2.equals("CU")
                                    && !fileA3344.A3344CONP2.equals("MF") && !fileA3344.A3344CONP2.equals("XD") && !fileA3344.A3344CONP2.equals("XV") && !fileA3344.A3344CONP2.equals("UK")
                                    && !fileA3344.A3344CONP2.equals("YR") && !fileA3344.A3344CONP2.equals("F7") && !fileA3344.A3344CONP2.equals("F8") && !fileA3344.A3344CONP2.equals("G2")
                                    && !fileA3344.A3344CONP2.equals("G1") && !fileA3344.A3344CONP2.equals("G3") && !fileA3344.A3344CONP2.equals("G8") && !fileA3344.A3344CONP2.equals("G5")
                                    && !fileA3344.A3344CONP2.equals("F9") && !fileA3344.A3344CONP2.equals("H3") && !fileA3344.A3344CONP2.equals("Z2") && !fileA3344.A3344CONP2.equals("Z3")
                                    && !fileA3344.A3344CONP2.equals("J9") && !fileA3344.A3344CONP2.equals("B7") && !fileA3344.A3344CONP2.equals("J8") && !fileA3344.A3344CONP2.equals("AE")
                                    && !fileA3344.A3344CONP2.equals("CC") && !fileA3344.A3344CONP2.equals("CA") && !fileA3344.A3344CONP2.equals("TT") && !fileA3344.A3344CONP2.equals("CM")
                                    && !fileA3344.A3344CONP2.equals("TV") && !fileA3344.A3344CONP2.equals("L8") && !fileA3344.A3344CONP2.equals("CC") && !fileA3344.A3344CONP2.equals("IVA")
                                    ) {

                                mensaje = "The Concept 2  incorrect " + fileA3344.A3344CONP2;
                                break;
                            }*/
                        }
                        /// concepto 3
                        if (currentRow.getCell(10) == null) {
                            fileA3344.A3344CONP3 = "";
                        } else {
                            fileA3344.A3344CONP3 = currentRow.getCell(10).toString().trim();
                        }
                        //Document type  TKT  
                        if (currentRow.getCell(11) == null) {
                            fileA3344.A3344TDOC = "";
                        } else {
                            fileA3344.A3344TDOC = currentRow.getCell(11).toString();
                        }
                        if (fileA3344.A3344TDOC.equals("")) {
                            mensaje = "Document type  Required";
                            break;
                        }
                        //CUENTA 
                        if (currentRow.getCell(12) == null) {
                            fileA3344.A3344CTAC = "";
                        } else {
                            fileA3344.A3344CTAC = currentRow.getCell(12).toString();
                        }
                        if (fileA3344.A3344CTAC.equals("")) {
                            mensaje = "Cuenta  Required";
                            break;
                        }
                        if (fileA3344.A3344CTAC.length() != 36) {
                            mensaje = "THE Cuenta MUST BE 36 CHARACTERES  " + fileA3344.A3344CTAC;
                            break;
                        }
                        //TITULO 
                        if (currentRow.getCell(13) == null) {
                            fileA3344.A3344TITUC = "";
                        } else {
                            fileA3344.A3344TITUC = currentRow.getCell(13).toString();
                        }
                        if (fileA3344.A3344TITUC.equals("")) {
                            mensaje = "Titulo  Required";
                            break;
                        }
                        if (fileA3344.A3344TITUC.length() > 30) {
                            mensaje = "THE Titulo MUST BE 30 CHARACTERES  " + fileA3344.A3344TITUC;
                            break;
                        }
                        //tipo de poliza
                        if (currentRow.getCell(14) == null) {
                            fileA3344.A3344FILE = "";
                        } else {
                            fileA3344.A3344FILE = currentRow.getCell(14).toString();
                        }
                        if (fileA3344.A3344FILE.equals("")) {
                            mensaje = "File  Required";
                            break;
                        }
                        if (fileA3344.A3344FILE.length() != 2) {
                            mensaje = "THE FILE MUST BE 2 CHARACTERES  " + fileA3344.A3344FILE;
                            break;
                        }
                        if (!fileA3344.A3344FILE.equals("AP") && !fileA3344.A3344FILE.equals("AR") && !fileA3344.A3344FILE.equals("GL")) {
                            mensaje = "THE FILE AR or AP or GL  " + fileA3344.A3344FILE;
                            break;
                        }
                        //marca de la poliza
                        if (currentRow.getCell(15) == null) {
                            fileA3344.A3344MARCA = "";
                        } else {
                            fileA3344.A3344MARCA = currentRow.getCell(15).toString();
                        }
                        if (!fileA3344.A3344MARCA.equals("")) {
                            if (filter.VP_OPTION.equals("FLWN")) {
                                fileA3344.A3344MARCA = "X";
                            } else {
                                fileA3344.A3344MARCA = "P";
                            }
                        }
                        if (filter.VP_OPTION.equals("SALE")) {
                            if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1131-11519-0000-00") || fileA3344.A3344CTAC.equals("02-00-000000-0000-1131-11520-0000-00")
                                    || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-03") || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-06")
                                    || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-07") || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-08")
                                    || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-09") || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-13")
                                    || fileA3344.A3344CTAC.equals("02-00 000000-0000-1141-13821-0000-37") || fileA3344.A3344CTAC.equals("03-00-000000-0000-2131-24702-0000-02")
                                    || fileA3344.A3344CTAC.equals("06-00-000000-0000-2131-24702-0000-02") || fileA3344.A3344CTAC.equals("07-00-000000-0000-2131-24702-0000-02")
                                    || fileA3344.A3344CTAC.equals("08-00-000000-0000-2131-24702-0000-02") || fileA3344.A3344CTAC.equals("09-00-000000-0000-2131-24702-0000-02")
                                    || fileA3344.A3344CTAC.equals("13-00-000000-0000-2131-24702-0000-02") || fileA3344.A3344CTAC.equals("37-00-000000-0000-2131-24702-0000-02")) {
                                fileA3344.A3344MARCA = "P";
                            } else {
                                fileA3344.A3344MARCA = "";
                            }
                        }

                        //cliente
                        if (currentRow.getCell(16) == null) {
                            fileA3344.A3344CLIEN = "";
                        } else {
                            fileA3344.A3344CLIEN = currentRow.getCell(16).toString();
                        }
                        if (fileA3344.A3344FILE.equals("AR")) {
                            if (fileA3344.A3344CLIEN.equals("")) {
                                mensaje = "MUST ENTER THE Client OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (!fileA3344.A3344CLIEN.equals("")) {
                                if (fileA3344.A3344CLIEN.length() > 5) {
                                    mensaje = " THE CLIENT MUST BE 5 CHARACTERES" + fileA3344.A3344TKT;
                                    break;
                                }
                            }
                        }
                        //provedor
                        if (currentRow.getCell(17) == null) {
                            fileA3344.A3344PROVE = "";
                        } else {
                            fileA3344.A3344PROVE = currentRow.getCell(17).toString();
                        }
                        if (fileA3344.A3344PROVE.equals("AP")) {
                            if (fileA3344.A3344PROVE.equals("")) {
                                mensaje = "MUST ENTER THE PROVIDER OF AP  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (!fileA3344.A3344PROVE.equals("")) {
                                if (fileA3344.A3344PROVE.length() != 4) {
                                    mensaje = " THE PROVIDER MUST BE 4 CHARACTERES" + fileA3344.A3344TKT;
                                    break;
                                }
                            }
                        }
                        //direccion
                        if (currentRow.getCell(18) == null) {
                            fileA3344.A3344DIREC = "";
                        } else {
                            fileA3344.A3344DIREC = currentRow.getCell(18).toString();
                        }
                        //direccion
                        if (currentRow.getCell(19) == null) {
                            fileA3344.A3344ORAC = "";
                        } else {
                            fileA3344.A3344ORAC = currentRow.getCell(19).toString();
                        }
                        if (fileA3344.A3344FILE.equals("AR")) {
                            if (fileA3344.A3344DIREC.equals("")) {
                                mensaje = "MUST ENTER THE ADRESS OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344ORAC.equals("")) {
                                mensaje = "MUST ENTER THE DOC. ORACLE OF AR  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //mda
                        if (currentRow.getCell(20) == null) {
                            fileA3344.A3344MDA = "";
                        } else {
                            fileA3344.A3344MDA = currentRow.getCell(20).toString();
                        }
                        if (fileA3344.A3344MDA.equals("")) {
                            mensaje = "MUST ENTER THE Currency  " + fileA3344.A3344TKT;
                            break;
                        }
                        //MONTO_ACTIVO_LOCAL
                        if (currentRow.getCell(21) == null) {
                            fileA3344.A3344DBLOC = 0;
                        } else {
                            fileA3344.A3344DBLOC = Double.parseDouble(currentRow.getCell(21).toString());
                        }
                        //MONTO_PASIVO_LOCAL
                        if (currentRow.getCell(22) == null) {
                            fileA3344.A3344CRLOC = 0;
                        } else {
                            fileA3344.A3344CRLOC = Double.parseDouble(currentRow.getCell(22).toString());
                        }
                        //MONTO_ACTIVO_REVENUE
                        if (currentRow.getCell(23) == null) {
                            fileA3344.A3344DBREV = 0;
                        } else {
                            fileA3344.A3344DBREV = Double.parseDouble(currentRow.getCell(23).toString());
                        }
                        //MONTO_PASIVO_REVUE
                        if (currentRow.getCell(24) == null) {
                            fileA3344.A3344CRREV = 0;
                        } else {
                            fileA3344.A3344CRREV = Double.parseDouble(currentRow.getCell(24).toString());
                        }
                        //TKT REFERECIA
                        if (currentRow.getCell(25) == null) {
                            fileA3344.A3344TKTAS = "";
                        } else {
                            fileA3344.A3344TKTAS = currentRow.getCell(25).toString();
                        }
                        //TKT_SEQ_REFEREC
                        if (currentRow.getCell(26) == null) {
                            fileA3344.A3344ASSEQ = "";
                        } else {
                            fileA3344.A3344ASSEQ = currentRow.getCell(26).toString();
                        }
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //TYPE_TRANSACA
                        if (currentRow.getCell(27) == null) {
                            fileA3344.A3344ESTTR = "";
                        } else {
                            fileA3344.A3344ESTTR = currentRow.getCell(27).toString();
                        }
                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //ANAULAR
                        if (currentRow.getCell(28) == null) {
                            fileA3344.A3344TKTVO = "";
                        } else {
                            fileA3344.A3344TKTVO = currentRow.getCell(28).toString();
                        }
                        //IMPORTE_LOCAL
                        if (currentRow.getCell(29) == null) {
                            fileA3344.A3344VLTAX = 0;
                        } else {
                            fileA3344.A3344VLTAX = Double.parseDouble(currentRow.getCell(29).toString());
                        }
                        //IMPORTE_REVENUE
                        if (currentRow.getCell(30) == null) {
                            fileA3344.A3344VLTAR = 0;
                        } else {
                            fileA3344.A3344VLTAR = Double.parseDouble(currentRow.getCell(30).toString());
                        }
                        //AFFECTATION IATA
                        if (currentRow.getCell(31) == null) {
                            fileA3344.A3344IATAU = "";
                        } else {
                            fileA3344.A3344IATAU = currentRow.getCell(31).toString();
                        }
                        //TIPO_TARJ
                        if (currentRow.getCell(32) == null) {
                            fileA3344.A3344TTARJ = "";
                        } else {
                            fileA3344.A3344TTARJ = currentRow.getCell(32).toString();
                        }
                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }
                        //NUMERO_ATRJETA
                        if (currentRow.getCell(33) == null) {
                            fileA3344.A3344NTARJ = "";
                        } else {
                            fileA3344.A3344NTARJ = currentRow.getCell(33).toString();
                        }
                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }
                        //JUSTICACION
                        if (currentRow.getCell(34) == null) {
                            fileA3344.A3344DESCR = "";
                        } else {
                            fileA3344.A3344DESCR = currentRow.getCell(34).toString();
                        }
                        //IATA_VENTA
                        if (currentRow.getCell(35) == null) {
                            fileA3344.A3344AGENT = "";
                        } else {
                            fileA3344.A3344AGENT = currentRow.getCell(35).toString();
                        }
                        //TIPO DE CAMBIO
                        if (currentRow.getCell(36) == null) {
                            fileA3344.A3344TCAMB = 0;
                        } else {
                            fileA3344.A3344TCAMB = Double.parseDouble(currentRow.getCell(36).toString());
                        }
                        ///FECHA DE PROCESO
                        if (currentRow.getCell(37) == null) {
                            fileA3344.A3344FPROC = "";
                        } else {
                            fileA3344.A3344FPROC = currentRow.getCell(37).toString();
                        }

                        /*if(!fileA3344.A3344FPROC.equals("")){
                         String vl_A3344FPROC =fileA3344.A3344FPROC;
                         java.util.Date date1=new Date(vl_A3344FPROC); 
                         java.util.Date date2 = new Date();
                         Integer fecha = date2.compareTo(date1);                             
                         if(fecha > 0){
                         mensaje = "La fecha debe de ser menor al del sistema";
                         break;
                         }
                           
                         }*/
                        //f2=new Date(fecha2);
                        //
                        //VALIDACION DEL PROCESO
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKTAS;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344ASSEQ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344ESTTR;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKTVO;
                                break;
                            }
                        }

                        if (fileA3344.A3344IATAU.equals("")) {
                            mensaje = "AFFECTATION IATA  Required";
                            break;
                        }
                        if (fileA3344.A3344IATAU.length() != 8) {
                            mensaje = "THE AFFECTATION IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344IATAU;
                            break;
                        }

                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }

                        if (fileA3344.A3344DESCR.equals("")) {
                            mensaje = "JUSTICACION  Required";
                            break;
                        }
                        if (fileA3344.A3344DESCR.length() > 200) {
                            mensaje = "THE JUSTICACION MUST BE 200 CHARACTERES  " + fileA3344.A3344DESCR;
                            break;
                        }

                        if (!fileA3344.A3344AGENT.equals("")) {
                            if (fileA3344.A3344AGENT.length() != 8) {
                                mensaje = "THE IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344TKT;
                                break;
                            }
                        }
                        //validacion para volados
                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ;//+ "" + fileA3344.A3344CPN;
                            vl_fuente = fileA3344.A3344FUENT;
                            vl_sufuente = fileA3344.A3344SUBFU;
                        }
                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ; //+ "" + fileA3344.A3344CPN;
                            vl_fuente = fileA3344.A3344FUENT;
                            vl_sufuente = fileA3344.A3344SUBFU;
                        }

                        if (!vl_A3344TKT.equals(fileA3344.A3344TKT + "" + fileA3344.A3344SEQ/* + "" + fileA3344.A3344CPN*/)) {

                            if (!formatter.format(vl_A3344DBLOC).equals(formatter.format(vl_A3344CRLOC))) {
                                mensaje = "The Pasivo Local Amount must be equal to the credito Local Amount " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV).equals(formatter.format(vl_A3344CRREV))) {
                                mensaje = "The Pasivo Revenue Amount must be equal to the credito Revenue Amount " + vl_A3344DBREV + " - " + vl_A3344CRREV + " - " + vl_A3344TKT;
                                break;
                            }

                            if (!formatter.format(vl_A3344DBLOC_GL).equals(formatter.format(vl_A3344CRLOC_GL))) {
                                mensaje = "The Pasivo Local Amount GL must be equal to the credito Local GL Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344CRLOC_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_GL).equals(formatter.format(vl_A3344CRREV_GL))) {
                                mensaje = "The Pasivo Revenue Amount GL must be equal to the credito Revenue GL Amount " + vl_A3344DBREV_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBLOC_AR).equals(formatter.format(vl_A3344CRLOC_AR))) {
                                mensaje = "The Pasivo Local Amount AR must be equal to the credito Local AR Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344DBREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_AR).equals(formatter.format(vl_A3344CRREV_AR))) {
                                mensaje = "The Pasivo Revenue Amount AR must be equal to the credito Revenue AR Amount  " + vl_A3344CRLOC_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBLOC_AP).equals(formatter.format(vl_A3344CRLOC_AP))) {
                                mensaje = "The Pasivo Local Amount AP must be equal to the credito Local AP Amount " + vl_A3344DBLOC_GL + " - " + vl_A3344DBREV_GL + " - " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV_AP).equals(formatter.format(vl_A3344CRREV_AP))) {
                                mensaje = "The Pasivo Revenue Amount AP must be equal to the credito Revenue AP Amount " + vl_A3344CRLOC_GL + " - " + vl_A3344CRREV_GL + " - " + vl_A3344TKT;
                                break;
                            }

                            vl_A3344DBLOC = 0;
                            vl_A3344CRLOC = 0;
                            vl_A3344DBREV = 0;
                            vl_A3344CRREV = 0;

                            vl_A3344DBLOC_GL = 0;
                            vl_A3344CRLOC_GL = 0;
                            vl_A3344DBREV_GL = 0;
                            vl_A3344CRREV_GL = 0;
                            vl_A3344DBLOC_AR = 0;
                            vl_A3344CRLOC_AR = 0;
                            vl_A3344DBREV_AR = 0;
                            vl_A3344CRREV_AR = 0;
                            vl_A3344DBLOC_AP = 0;
                            vl_A3344CRLOC_AP = 0;
                            vl_A3344DBREV_AP = 0;
                            vl_A3344CRREV_AP = 0;

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            /**
                             * nuew procedimiento
                             */
                            vl_fuente = fileA3344.A3344FUENT.trim();
                            vl_sufuente = fileA3344.A3344SUBFU.trim();

                            if (fileA3344.A3344FILE.equals("GL")) {
                                vl_A3344DBLOC_GL = vl_A3344DBLOC_GL + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_GL = vl_A3344CRLOC_GL + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_GL = vl_A3344DBREV_GL + fileA3344.A3344DBREV;
                                vl_A3344CRREV_GL = vl_A3344CRREV_GL + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AR")) {
                                vl_A3344DBLOC_AR = vl_A3344DBLOC_AR + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AR = vl_A3344CRLOC_AR + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AR = vl_A3344DBREV_AR + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AR = vl_A3344CRREV_AR + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AP")) {
                                vl_A3344DBLOC_AP = vl_A3344DBLOC_AP + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AP = vl_A3344CRLOC_AP + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AP = vl_A3344DBREV_AP + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AP = vl_A3344CRREV_AP + fileA3344.A3344CRREV;
                            }
                            /*fin del procedimiento*/

                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ; //+ "" + fileA3344.A3344CPN;
                        } else {

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            if (fileA3344.A3344FUENT.equals("vl_fuente")) {
                                mensaje = " two different sources for the same ticket  " + fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                                break;
                            }
                            if (fileA3344.A3344SUBFU.equals("vl_sufuente")) {
                                mensaje = " two different channel for the same ticket  " + fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                                break;
                            }

                            if (fileA3344.A3344FILE.equals("GL")) {
                                vl_A3344DBLOC_GL = vl_A3344DBLOC_GL + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_GL = vl_A3344CRLOC_GL + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_GL = vl_A3344DBREV_GL + fileA3344.A3344DBREV;
                                vl_A3344CRREV_GL = vl_A3344CRREV_GL + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AR")) {
                                vl_A3344DBLOC_AR = vl_A3344DBLOC_AR + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AR = vl_A3344CRLOC_AR + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AR = vl_A3344DBREV_AR + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AR = vl_A3344CRREV_AR + fileA3344.A3344CRREV;
                            }
                            if (fileA3344.A3344FILE.equals("AP")) {
                                vl_A3344DBLOC_AP = vl_A3344DBLOC_AP + fileA3344.A3344DBLOC;
                                vl_A3344CRLOC_AP = vl_A3344CRLOC_AP + fileA3344.A3344CRLOC;
                                vl_A3344DBREV_AP = vl_A3344DBREV_AP + fileA3344.A3344DBREV;
                                vl_A3344CRREV_AP = vl_A3344CRREV_AP + fileA3344.A3344CRREV;
                            }

                        }

                        lstGeneral.add(fileA3344);

                    }

                }
            }
            if (mensaje.equals("")) {
                mensaje = logic.subirExcel(lstGeneral, filter.VP_OPTION, filename);
            }
            map.put("success", true);
            map.put("result", mensaje);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "validar_excel_adjmassive", method = RequestMethod.POST)
    public @ResponseBody
    String validar_excel_adjmassive(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A3344Filter filter = new A3344Filter();
        ArrayList<A3344Filter> lstGeneral = new ArrayList<A3344Filter>(0);
        A3344Filter fileA3344;
        String mensaje = "";
        int i = 0;
        String vl_A3344TKT = "";
        String VP_A3344TKT;
        double vl_A3344DBLOC = 0;
        double vl_A3344CRLOC = 0;
        double vl_A3344DBREV = 0;
        double vl_A3344CRREV = 0;
        double vl_A3344TCAMB = 0;
        double vl_A3344CTAC_AR114113833 = 0;
        double vl_A3344CTAC_GL114113833 = 0;
        double vl_A3344CTAC_GL213124704 = 0;
        double vl_A3344CTAC_AP213124704 = 0;
        double vl_CTACAP_A3344DBREV = 0;
        double vl_CTACAP_A3344CRREV = 0;
        double vl_CTACAR_A3344DBREV = 0;
        double vl_CTACAR_A3344CRREV = 0;

        double vl_CTACAR_114113833CRREV = 0;
        double vl_CTACAR_114113833DBREV = 0;
        double vl_CTACAR_213124704DBREV = 0;
        double vl_CTACAP_213124704DBREV = 0;
        double vl_CTA02_DBREV = 0;
        double vl_CTA02_CRREV = 0;
        double vl_CTA03_DBREV = 0;
        double vl_CTA03_CRREV = 0;

        double vl_A3344DBLOC5D = 0;
        double vl_A3344CRLOC5D = 0;
        double vl_A3344DBREV5D = 0;
        double vl_A3344CRREV5D = 0;

        double vl_A3344DBLOCAM = 0;
        double vl_A3344CRLOCAM = 0;
        double vl_A3344DBREVAM = 0;
        double vl_A3344CRREVAM = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            DecimalFormat formatter = new DecimalFormat(".##");
            formatter.setRoundingMode(RoundingMode.HALF_UP);
            String filename = excelfile.getOriginalFilename();
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA3344 = new A3344Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {

                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA3344.A3344CCUST = "139";
                        fileA3344.VP_TYPE = filter.VP_OPTION;
                        //obteniendo el TKT
                        fileA3344.A3344TKT = currentRow.getCell(0).toString();
                        if (fileA3344.A3344TKT.equals("")) {
                            mensaje = "Ticket Number Required";
                            break;
                        }
                        if (fileA3344.A3344TKT.length() != 13) {
                            mensaje = "THE Ticket MUST BE 13 CHARACTERES  " + fileA3344.A3344TKT;
                            break;
                        }
                        //seq
                        if (currentRow.getCell(1) == null) {
                            mensaje = "required field flown or IXP sale date and Retention Date for IXC";
                            break;
                        } else {
                            fileA3344.A3344SEQ = currentRow.getCell(1).toString();
                            if (fileA3344.A3344SEQ.equals("")) {
                                mensaje = "required field flown or IXP sale date and Retention Date for IXC";
                                break;
                            }
                            if (fileA3344.A3344SEQ.length() != 8) {
                                mensaje = "THE sale date or retention date MUST BE 8 CHARACTERES  " + fileA3344.A3344SEQ;
                                break;
                            }
                        }
                        //cpn
                        if (currentRow.getCell(2) == null) {
                            mensaje = "Cupón Number Required";
                            break;
                        } else {
                            fileA3344.A3344CPN = currentRow.getCell(2).toString();
                            if (fileA3344.A3344CPN.equals("")) {
                                mensaje = "Cupón Number Required";
                                break;
                            }
                            if (fileA3344.A3344CPN.length() != 1) {
                                mensaje = "THE Cupón MUST BE 1 CHARACTERES  " + fileA3344.A3344CPN;
                                break;
                            }
                        }
                        //Transaction_type_code
                        if (currentRow.getCell(3) == null) {
                            mensaje = "Transaction type Required";
                            break;
                        } else {
                            fileA3344.A3344TRNCU = currentRow.getCell(3).toString();
                            if (fileA3344.A3344TRNCU.equals("")) {
                                mensaje = "Transaction type Required";
                                break;
                            }
                            if (filter.VP_OPTION.equals("IXP") || filter.VP_OPTION.equals("IXC")) {
                                if (fileA3344.A3344TRNCU.length() != 3) {
                                    mensaje = "THE Transaction type MUST BE 3 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            } else {
                                if (fileA3344.A3344TRNCU.length() != 4) {
                                    mensaje = "THE Transaction type MUST BE 4 CHARACTERES  " + fileA3344.A3344TRNCU;
                                    break;
                                }
                            }
                        }
                        //pais solo para ventas y caducos
                        if (currentRow.getCell(4) == null) {
                            fileA3344.A3344PAIS = "";
                        } else {
                            fileA3344.A3344PAIS = currentRow.getCell(4).toString();
                        }
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344PAIS.equals("")) {
                                mensaje = "Country Required";
                                break;
                            }
                            if (fileA3344.A3344PAIS.length() != 2) {
                                mensaje = "THE Country MUST BE 2 CHARACTERES  " + fileA3344.A3344PAIS;
                                break;
                            }

                        }
                        //fuente solo para ventas y caducos
                        if (currentRow.getCell(5) == null) {
                            fileA3344.A3344FUENT = "";
                        } else {
                            fileA3344.A3344FUENT = currentRow.getCell(5).toString();
                        }
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344FUENT.equals("")) {
                                mensaje = "Source Required";
                                break;
                            }
                            if (fileA3344.A3344FUENT.length() != 3) {
                                mensaje = "THE Source MUST BE 3 CHARACTERES  " + fileA3344.A3344FUENT;
                                break;
                            }

                        }
                        //sub_fuente solo para ventas y caducos
                        if (currentRow.getCell(6) == null) {
                            fileA3344.A3344SUBFU = "";
                        } else {
                            fileA3344.A3344SUBFU = currentRow.getCell(6).toString();
                        }
                        if (!filter.VP_OPTION.equals("FLWN") && !filter.VP_OPTION.equals("IXP") && !filter.VP_OPTION.equals("DISC") && !filter.VP_OPTION.equals("IXC")) {
                            if (fileA3344.A3344SUBFU.equals("")) {
                                mensaje = "Channel Required";
                                break;
                            }
                            if (fileA3344.A3344SUBFU.length() != 3) {
                                mensaje = "THE Channel MUST BE 3 CHARACTERES  " + fileA3344.A3344SUBFU;
                                break;
                            }

                        }

                        //CARRIER solo para ventas y caducos
                        if (currentRow.getCell(7) == null) {
                            fileA3344.A3344CARRIR = "";
                        } else {
                            fileA3344.A3344CARRIR = currentRow.getCell(7).toString();
                        }
                        if (filter.VP_OPTION.equals("FLWN")) {
                            if (fileA3344.A3344CARRIR.equals("")) {
                                mensaje = "Carrier Required";
                                break;
                            }
                            if (fileA3344.A3344CARRIR.length() != 2) {
                                mensaje = "THE Carrier MUST BE 2 CHARACTERES  " + fileA3344.A3344CARRIR;
                                break;
                            }
                            if (!fileA3344.A3344CARRIR.equals("5D") && !fileA3344.A3344CARRIR.equals("AM")) {
                                mensaje = "THE Carrier 5D OR AM  " + fileA3344.A3344CARRIR;
                                break;
                            }
                        }

                        //Concepto 1 solo para ventas y caducos
                        if (currentRow.getCell(8) == null) {
                            fileA3344.A3344CONP1 = "";
                        } else {
                            fileA3344.A3344CONP1 = currentRow.getCell(8).toString();
                        }
                        if (fileA3344.A3344CONP1.equals("")) {
                            mensaje = "Concepto 1 Required";
                            break;
                        }
                        /// concepto 2
                        if (currentRow.getCell(9) == null) {
                            fileA3344.A3344CONP2 = "";
                        } else {
                            fileA3344.A3344CONP2 = currentRow.getCell(9).toString();
                        }
                        /// concepto 3
                        if (currentRow.getCell(10) == null) {
                            fileA3344.A3344CONP3 = "";
                        } else {
                            fileA3344.A3344CONP3 = currentRow.getCell(10).toString();
                        }
                        //Document type  TKT  
                        if (currentRow.getCell(11) == null) {
                            fileA3344.A3344TDOC = "";
                        } else {
                            fileA3344.A3344TDOC = currentRow.getCell(11).toString();
                        }
                        if (fileA3344.A3344TDOC.equals("")) {
                            mensaje = "Document type  Required";
                            break;
                        }
                        //CUENTA 
                        if (currentRow.getCell(12) == null) {
                            fileA3344.A3344CTAC = "";
                        } else {
                            fileA3344.A3344CTAC = currentRow.getCell(12).toString();
                        }
                        if (fileA3344.A3344CTAC.equals("")) {
                            mensaje = "Cuenta  Required";
                            break;
                        }
                        if (fileA3344.A3344CTAC.length() != 36) {
                            mensaje = "THE Cuenta MUST BE 36 CHARACTERES  " + fileA3344.A3344CTAC;
                            break;
                        }
                        //TITULO 
                        if (currentRow.getCell(13) == null) {
                            fileA3344.A3344TITUC = "";
                        } else {
                            fileA3344.A3344TITUC = currentRow.getCell(13).toString();
                        }
                        if (fileA3344.A3344TITUC.equals("")) {
                            mensaje = "Titulo  Required";
                            break;
                        }
                        if (fileA3344.A3344TITUC.length() > 30) {
                            mensaje = "THE Titulo MUST BE 30 CHARACTERES  " + fileA3344.A3344TITUC;
                            break;
                        }
                        //tipo de poliza
                        if (currentRow.getCell(14) == null) {
                            fileA3344.A3344FILE = "";
                        } else {
                            fileA3344.A3344FILE = currentRow.getCell(14).toString();
                        }
                        if (fileA3344.A3344FILE.equals("")) {
                            mensaje = "File  Required";
                            break;
                        }
                        if (fileA3344.A3344FILE.length() != 2) {
                            mensaje = "THE FILE MUST BE 2 CHARACTERES  " + fileA3344.A3344FILE;
                            break;
                        }
                        if (!fileA3344.A3344FILE.equals("AP") && !fileA3344.A3344FILE.equals("AR") && !fileA3344.A3344FILE.equals("GL")) {
                            mensaje = "THE FILE AR or AP or GL  " + fileA3344.A3344FILE;
                            break;
                        }
                        //marca de la poliza
                        if (currentRow.getCell(15) == null) {
                            fileA3344.A3344MARCA = "";
                        } else {
                            fileA3344.A3344MARCA = currentRow.getCell(15).toString();
                        }
                        if (!fileA3344.A3344MARCA.equals("")) {
                            if (filter.VP_OPTION.equals("FLWN")) {
                                fileA3344.A3344MARCA = "X";
                            } else {
                                fileA3344.A3344MARCA = "P";
                            }
                        }

                        //cliente
                        if (currentRow.getCell(16) == null) {
                            fileA3344.A3344CLIEN = "";
                        } else {
                            fileA3344.A3344CLIEN = currentRow.getCell(16).toString();
                        }
                        //provedor
                        if (currentRow.getCell(17) == null) {
                            fileA3344.A3344PROVE = "";
                        } else {
                            fileA3344.A3344PROVE = currentRow.getCell(17).toString();
                        }
                        //direccion
                        if (currentRow.getCell(18) == null) {
                            fileA3344.A3344DIREC = "";
                        } else {
                            fileA3344.A3344DIREC = currentRow.getCell(18).toString();
                        }
                        //direccion
                        if (currentRow.getCell(19) == null) {
                            fileA3344.A3344ORAC = "";
                        } else {
                            fileA3344.A3344ORAC = currentRow.getCell(19).toString();
                        }
                        //mda
                        if (currentRow.getCell(20) == null) {
                            fileA3344.A3344MDA = "";
                        } else {
                            fileA3344.A3344MDA = currentRow.getCell(20).toString();
                        }
                        //MONTO_ACTIVO_LOCAL
                        if (currentRow.getCell(21) == null) {
                            fileA3344.A3344DBLOC = 0;
                        } else {
                            if (currentRow.getCell(21).equals("")) {
                                fileA3344.A3344DBLOC = 0;
                            } else {
                                fileA3344.A3344DBLOC = Double.parseDouble(currentRow.getCell(21).toString());
                            }

                        }
                        //MONTO_PASIVO_LOCAL
                        if (currentRow.getCell(22) == null) {
                            fileA3344.A3344CRLOC = 0;
                        } else {
                            if (currentRow.getCell(22).equals("")) {
                                fileA3344.A3344CRLOC = 0;
                            } else {
                                fileA3344.A3344CRLOC = Double.parseDouble(currentRow.getCell(22).toString());
                            }

                        }
                        //MONTO_ACTIVO_REVENUE
                        if (currentRow.getCell(23) == null) {
                            fileA3344.A3344DBREV = 0;
                        } else {
                            if (currentRow.getCell(23).equals("")) {
                                fileA3344.A3344DBREV = 0;
                            } else {
                                fileA3344.A3344DBREV = Double.parseDouble(currentRow.getCell(23).toString());
                            }

                        }
                        //MONTO_PASIVO_REVUE
                        if (currentRow.getCell(24) == null) {
                            fileA3344.A3344CRREV = 0;
                        } else {
                            if (currentRow.getCell(24).equals("")) {
                                fileA3344.A3344CRREV = 0;
                            } else {
                                fileA3344.A3344CRREV = Double.parseDouble(currentRow.getCell(24).toString());
                            }
                        }
                        //TKT REFERECIA
                        if (currentRow.getCell(25) == null) {
                            fileA3344.A3344TKTAS = "";
                        } else {
                            fileA3344.A3344TKTAS = currentRow.getCell(25).toString();
                        }
                        //TKT_SEQ_REFEREC
                        if (currentRow.getCell(26) == null) {
                            fileA3344.A3344ASSEQ = "";
                        } else {
                            fileA3344.A3344ASSEQ = currentRow.getCell(26).toString();
                        }
                        //TYPE_TRANSACA
                        if (currentRow.getCell(27) == null) {
                            fileA3344.A3344ESTTR = "";
                        } else {
                            fileA3344.A3344ESTTR = currentRow.getCell(27).toString();
                        }
                        //ANAULAR
                        if (currentRow.getCell(28) == null) {
                            fileA3344.A3344TKTVO = "";
                        } else {
                            fileA3344.A3344TKTVO = currentRow.getCell(28).toString();
                        }
                        //IMPORTE_LOCAL
                        if (currentRow.getCell(29) == null) {
                            fileA3344.A3344VLTAX = 0;
                        } else {
                            if (currentRow.getCell(29).equals("")) {
                                fileA3344.A3344VLTAX = 0;
                            } else {
                                fileA3344.A3344VLTAX = Double.parseDouble(currentRow.getCell(29).toString());
                            }
                        }
                        //IMPORTE_REVENUE
                        if (currentRow.getCell(30) == null) {
                            fileA3344.A3344VLTAR = 0;
                        } else {
                            if (currentRow.getCell(30).equals("")) {
                                fileA3344.A3344VLTAR = 0;
                            } else {
                                fileA3344.A3344VLTAR = Double.parseDouble(currentRow.getCell(30).toString());
                            }
                        }
                        //AFFECTATION IATA
                        if (currentRow.getCell(31) == null) {
                            fileA3344.A3344IATAU = "";
                        } else {
                            fileA3344.A3344IATAU = currentRow.getCell(31).toString();
                        }
                        //TIPO_TARJ
                        if (currentRow.getCell(32) == null) {
                            fileA3344.A3344TTARJ = "";
                        } else {
                            fileA3344.A3344TTARJ = currentRow.getCell(32).toString();
                        }
                        //NUMERO_ATRJETA
                        if (currentRow.getCell(33) == null) {
                            fileA3344.A3344NTARJ = "";
                        } else {
                            fileA3344.A3344NTARJ = currentRow.getCell(33).toString();
                        }
                        //JUSTICACION
                        if (currentRow.getCell(34) == null) {
                            fileA3344.A3344DESCR = "";
                        } else {
                            fileA3344.A3344DESCR = currentRow.getCell(34).toString();
                        }
                        //IATA_VENTA
                        if (currentRow.getCell(35) == null) {
                            fileA3344.A3344AGENT = "";
                        } else {
                            fileA3344.A3344AGENT = currentRow.getCell(35).toString();
                        }
                        //TIPO DE CAMBIO
                        if (currentRow.getCell(36) == null) {
                            fileA3344.A3344TCAMB = 0;
                        } else {
                            fileA3344.A3344TCAMB = Double.parseDouble(currentRow.getCell(36).toString());
                        }
                        ///FECHA DE PROCESO
                        if (currentRow.getCell(37) == null) {
                            fileA3344.A3344FPROC = "";
                        } else {
                            fileA3344.A3344FPROC = currentRow.getCell(37).toString();
                        }

                        /* if(!fileA3344.A3344FPROC.equals("")){
                         String vl_A3344FPROC =fileA3344.A3344FPROC.replaceAll("/", "");
                         java.util.Date date1=new Date(vl_A3344FPROC); 
                         java.util.Date date2 = new Date();
                         Integer fecha = date2.compareTo(date1);                             
                         if(fecha > 0){
                         mensaje = "La fecha debe de ser menor al del sistema";
                         break;
                         }
                           
                         } */
                        //VALIDACION DEL PROCESO
                        if (fileA3344.A3344TRNCU.equals("EXCP")) {
                            if (fileA3344.A3344TKTAS.equals("")) {
                                mensaje = "TKT REFERENCIA  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTAS.length() != 10) {
                                mensaje = "THE TKT REFERENCIA MUST BE 10 CHARACTERES  " + fileA3344.A3344TKTAS;
                                break;
                            }

                            if (fileA3344.A3344ASSEQ.equals("")) {
                                mensaje = "TKT SEQ REFEREC  Required";
                                break;
                            }
                            if (fileA3344.A3344ASSEQ.length() != 2) {
                                mensaje = "THE TKT SEQ REFEREC MUST BE 10 CHARACTERES  " + fileA3344.A3344ASSEQ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344ESTTR.equals("")) {
                            if (fileA3344.A3344ESTTR.equals("")) {
                                mensaje = "TYPE TRANSACTION Required";
                                break;
                            }
                            if (fileA3344.A3344ESTTR.length() != 1) {
                                mensaje = "THE TYPE TRANSACTION MUST BE 1 CHARACTERES  " + fileA3344.A3344ESTTR;
                                break;
                            }
                            if (fileA3344.A3344TKTVO.equals("")) {
                                mensaje = "ANAULAR  Required";
                                break;
                            }
                            if (fileA3344.A3344TKTVO.length() != 1) {
                                mensaje = "THE ANAULAR BE 1 CHARACTERES  " + fileA3344.A3344TKTVO;
                                break;
                            }
                        }

                        if (fileA3344.A3344IATAU.equals("")) {
                            mensaje = "AFFECTATION IATA  Required";
                            break;
                        }
                        if (fileA3344.A3344IATAU.length() != 8) {
                            mensaje = "THE AFFECTATION IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344IATAU;
                            break;
                        }

                        if (!fileA3344.A3344TTARJ.equals("")) {
                            if (fileA3344.A3344TTARJ.length() > 2) {
                                mensaje = "THE TYPE CARD MUST BE 2 CHARACTERES  " + fileA3344.A3344TTARJ;
                                break;
                            }
                        }

                        if (!fileA3344.A3344NTARJ.equals("")) {
                            if (fileA3344.A3344NTARJ.length() > 19) {
                                mensaje = "THE CARD NUMBER MUST BE 19 CHARACTERES  " + fileA3344.A3344NTARJ;
                                break;
                            }
                        }

                        if (fileA3344.A3344DESCR.equals("")) {
                            mensaje = "JUSTICACION  Required";
                            break;
                        }
                        if (fileA3344.A3344DESCR.length() > 200) {
                            mensaje = "THE JUSTICACION MUST BE 200 CHARACTERES  " + fileA3344.A3344DESCR;
                            break;
                        }

                        if (fileA3344.A3344AGENT.equals("")) {
                            mensaje = "IATA  Required" + fileA3344.A3344TKT;
                            break;
                        }
                        if (fileA3344.A3344AGENT.length() != 8) {
                            mensaje = "THE IATA MUST BE 8 CHARACTERES  " + fileA3344.A3344TKT;
                            break;
                        }

                        //validacion para volados
                        if (filter.VP_OPTION.equals("FLWN")) {

                            if (fileA3344.A3344FILE.equals("AP") && fileA3344.A3344PROVE.equals("")) {
                                mensaje = "Provedor Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344CLIEN.equals("")) {
                                mensaje = "Cliente Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344DIREC.equals("")) {
                                mensaje = "Direccion Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344FILE.equals("AR") && fileA3344.A3344ORAC.equals("")) {
                                mensaje = "ORAC Required " + fileA3344.A3344CTAC;
                                break;
                            }
                            if (fileA3344.A3344CARRIR.equals("5D")) {
                                if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                    fileA3344.A3344MARCA = "X";
                                }

                                if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                    fileA3344.A3344CLIEN = "13939";
                                    fileA3344.A3344PROVE = "";
                                    fileA3344.A3344DIREC = "16251";
                                    fileA3344.A3344ORAC = "F_INTERCO";
                                }
                                if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";
                                }
                                if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24701-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";
                                }
                                if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13801-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                    fileA3344.A3344CLIEN = "13939";
                                    fileA3344.A3344PROVE = "";
                                    fileA3344.A3344DIREC = "16251";
                                    fileA3344.A3344ORAC = "F_INTERCO";
                                }
                                if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13830-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                    fileA3344.A3344PROVE = "7181";
                                }
                                /* if (fileA3344.A3344FILE.equals("AP")) {
                                 if (!fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24701-0000-03") && !fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && !fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13830-0000-03")) {
                                 mensaje = "The account must is incorrect AP " + fileA3344.A3344CTAC + " - " + vl_A3344TKT;// +" amount "+vl_CTACAP_A3344DBREV+" amount "+vl_CTACAP_A3344CRREV;
                                 break;
                                 }
                                 }
                                 if (fileA3344.A3344FILE.equals("AR")) {
                                 if (!fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13801-0000-02") && !fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02")) {
                                 mensaje = "The account must is incorrect AR " + fileA3344.A3344CTAC + " - " + vl_A3344TKT;// +" amount "+vl_CTACAP_A3344DBREV+" amount "+vl_CTACAP_A3344CRREV;
                                 break;
                                 }
                                 }*/

                            }
                            //03-00-000000-0000-1141-13833-0000-02
                            //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                            if (fileA3344.A3344CTAC.substring(18, 22).equals("6111") || fileA3344.A3344CTAC.substring(18, 22).equals("6112")) {
                                fileA3344.A3344CONP1 = "CM";
                            }
                            if (fileA3344.A3344CTAC.substring(18, 22).equals("1161") && fileA3344.A3344CTAC.substring(22, 28).equals("14104")) {
                                fileA3344.A3344CONP1 = "CM";
                            }
                        }
                        //VALIDACION PARA INTERLIEAL POR PAGAR
                        if (filter.VP_OPTION.equals("IXP")) {
                            //La cuenta 2171 TNU siempre debe de llenar el apartado de Proveedor.
                            if (fileA3344.A3344CTAC.substring(18, 22).equals("2171")) {
                                if (fileA3344.A3344CONP1.equals("")) {
                                    mensaje = "Concepto 1 Required";
                                    break;
                                }

                            }
                        }
                        //VALIDACION PARA INTERLIEAL POR COBRAR
                        if (filter.VP_OPTION.equals("IXC")) {
                            //La cuenta 2171 TNU siempre debe de llenar el apartado de Proveedor.
                            if (fileA3344.A3344CONP1.equals("")) {
                                mensaje = "Concepto 1 Required";
                                break;
                            }
                            if (fileA3344.A3344CONP2.equals("")) {
                                mensaje = "Concepto 2 Required";
                                break;
                            }
                        }

                        if (cont1 == 1) {
                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                        }

                        if (!vl_A3344TKT.equals(fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN)) {
                            if (!formatter.format(vl_A3344DBLOC).equals(formatter.format(vl_A3344CRLOC))) {
                                mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                break;
                            }
                            if (!formatter.format(vl_A3344DBREV).equals(formatter.format(vl_A3344CRREV))) {
                                mensaje = "The Pasivo Revenue Amount must be equal to the Activo Revenue Amount " + vl_A3344CRREV + " - " + vl_A3344DBREV + " - " + vl_A3344TKT;
                                break;
                            }

                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {

                                    if (!formatter.format(vl_A3344DBLOC5D).equals(formatter.format(vl_A3344CRLOC5D))) {
                                        mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_A3344DBREV5D).equals(formatter.format(vl_A3344CRREV5D))) {
                                        mensaje = "The Pasivo Revenue Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (vl_A3344CTAC_AR114113833 != vl_A3344CTAC_GL114113833) {
                                        mensaje = "The account must is incorrect AR AND GL 03-00-000000-0000-1141-13833-0000-02 " + vl_A3344CTAC_GL114113833 + " - " + vl_A3344CTAC_AR114113833 + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (vl_A3344CTAC_AP213124704 != vl_A3344CTAC_GL213124704) {
                                        mensaje = "The account must is incorrect AP AND GL 02-00-000000-0000-2131-24704-0000-03 " + vl_A3344CTAC_AP213124704 + " - " + vl_A3344CTAC_GL213124704 + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAP_A3344DBREV).equals(formatter.format(vl_CTACAP_A3344CRREV))) {
                                        mensaje = "The amounts do not match  02-00-000000-0000-2131-24704-0000-03 AND 02-00-000000-0000-1141-13830-0000-03 " + vl_CTACAP_A3344DBREV + " - " + vl_CTACAP_A3344CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAR_A3344DBREV).equals(formatter.format(vl_CTACAR_A3344CRREV))) {
                                        mensaje = "The amounts do not match  03-00-000000-0000-1141-13801-0000-02 AND 03-00-000000-0000-1141-13833-0000-02 " + vl_CTACAR_A3344CRREV + " - " + vl_CTACAR_A3344DBREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAP_213124704DBREV).equals(formatter.format(vl_CTACAR_213124704DBREV))) {
                                        mensaje = "The amounts do not match AR AND AP  02-00-000000-0000-2131-24704-0000-03 AND 03-00-000000-0000-1141-13833-0000-02 " + vl_CTACAP_213124704DBREV + " - " + vl_CTACAR_213124704DBREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTACAR_114113833DBREV).equals(formatter.format(vl_CTACAR_114113833CRREV))) {
                                        mensaje = "The amounts do not match GL  03-00-000000-0000-1141-13833-0000-02 AND 02-00-000000-0000-2131-24704-0000-03 " + vl_CTACAR_114113833DBREV + " - " + vl_CTACAR_114113833CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    //.equals("03-00-000000-0000-1141-13833-0000-02") 
                                    if (!formatter.format(vl_CTA02_DBREV).equals(formatter.format(vl_CTA02_CRREV))) {
                                        mensaje = "The amounts do not match CIA  02 " + vl_CTA02_DBREV + " - " + vl_CTA02_CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_CTA03_DBREV).equals(formatter.format(vl_CTA03_CRREV))) {
                                        mensaje = "The amounts do not match CIA  03 " + vl_CTA03_DBREV + " - " + vl_CTA03_CRREV + " - " + vl_A3344TKT;
                                        break;
                                    }

                                    //.equals("03-00-000000-0000-1141-13833-0000-02") 
                                }

                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    if (!formatter.format(vl_A3344DBLOCAM).equals(formatter.format(vl_A3344CRLOCAM))) {
                                        mensaje = "The Pasivo Local Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                    if (!formatter.format(vl_A3344DBREVAM).equals(formatter.format(vl_A3344CRREVAM))) {
                                        mensaje = "The Pasivo Revenue Amount must be equal to the Activo Local Amount " + vl_A3344TKT;
                                        break;
                                    }
                                }

                                /*if (!formatter.format(vl_CTAC_2171).equals(formatter.format(vl_CTAC_4101_4102))) {
                                 mensaje = "The amounts do not match TNU  2171 - account 4101 o 4102 " + vl_CTAC_2171 + " - " + vl_CTAC_4101_4102 + " - " + vl_A3344TKT;
                                 break;
                                 }*/
 /*if (!formatter.format(vl_CTAC_6111_6112).equals(formatter.format(vl_CTAC_116114104))) {
                                 mensaje = "The amounts do not match account 6111 o 6112 - account 116114104 " + vl_CTAC_6111_6112 + " - " + vl_CTAC_116114104 + " - " + vl_A3344TKT;
                                 break;
                                 }*/
                                //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                            }

                            vl_A3344DBLOC = 0;
                            vl_A3344CRLOC = 0;
                            vl_A3344DBREV = 0;
                            vl_A3344CRREV = 0;

                            vl_A3344DBLOC5D = 0;
                            vl_A3344CRLOC5D = 0;
                            vl_A3344DBREV5D = 0;
                            vl_A3344CRREV5D = 0;

                            vl_A3344DBLOCAM = 0;
                            vl_A3344CRLOCAM = 0;
                            vl_A3344DBREVAM = 0;
                            vl_A3344CRREVAM = 0;

                            vl_A3344CTAC_AR114113833 = 0;
                            vl_A3344CTAC_GL114113833 = 0;
                            vl_A3344CTAC_GL213124704 = 0;
                            vl_A3344CTAC_AP213124704 = 0;
                            vl_CTACAP_A3344DBREV = 0;
                            vl_CTACAP_A3344CRREV = 0;
                            vl_CTACAR_A3344DBREV = 0;
                            vl_CTACAR_A3344CRREV = 0;

                            vl_CTACAR_114113833CRREV = 0;
                            vl_CTACAR_114113833DBREV = 0;
                            vl_CTACAR_213124704DBREV = 0;
                            vl_CTACAP_213124704DBREV = 0;
                            vl_CTA02_DBREV = 0;
                            vl_CTA02_CRREV = 0;
                            vl_CTA03_DBREV = 0;
                            vl_CTA03_CRREV = 0;
                            // vl_CTAC_2171 = 0;
                            //vl_CTAC_4101_4102 = 0;
                            //vl_CTAC_6111_6112 = 0;
                            //vl_CTAC_116114104 = 0;

                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + fileA3344.A3344DBREV;
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            /**
                             * nuew procedimiento
                             */
                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    /*if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                     fileA3344.A3344MARCA = "X";
                                     }
                                     */
                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("03-00-000000-0000-2131-24705-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13835-0000-03")) {
                                        fileA3344.A3344MARCA = "X";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        vl_A3344CTAC_AR114113833 = vl_A3344CTAC_AR114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13801-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    //new ewn ar
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13835-0000-03") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "12383";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "5408";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13830-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }
                                    //new
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }
                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-2131-24705-0000-02") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "4614";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL114113833 = vl_A3344CTAC_GL114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL213124704 = vl_A3344CTAC_GL213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        vl_A3344CTAC_AP213124704 = vl_A3344CTAC_AP213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AP")) {
                                        vl_CTACAP_A3344DBREV = vl_CTACAP_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAP_A3344CRREV = vl_CTACAP_A3344CRREV + fileA3344.A3344CRREV;

                                    }
                                    if (fileA3344.A3344FILE.equals("AR")) {
                                        vl_CTACAR_A3344DBREV = vl_CTACAR_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAR_A3344CRREV = vl_CTACAR_A3344CRREV + fileA3344.A3344CRREV;

                                    }

                                    if (fileA3344.A3344FILE.equals("AR") || fileA3344.A3344FILE.equals("AP")) {
                                        if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                            vl_CTACAP_213124704DBREV = vl_CTACAP_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }
                                        if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                            vl_CTACAR_213124704DBREV = vl_CTACAR_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }

                                    }
                                    if (fileA3344.A3344FILE.equals("GL")) {
                                        if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                            vl_CTACAR_114113833DBREV = vl_CTACAR_114113833DBREV + fileA3344.A3344DBREV;
                                            vl_CTACAR_114113833CRREV = vl_CTACAR_114113833CRREV + fileA3344.A3344CRREV;
                                        }

                                    }

                                }

                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    vl_A3344DBLOC5D = vl_A3344DBLOC5D + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOC5D = vl_A3344CRLOC5D + fileA3344.A3344CRLOC;
                                    vl_A3344DBREV5D = vl_A3344DBREV5D + fileA3344.A3344DBREV;
                                    vl_A3344CRREV5D = vl_A3344CRREV5D + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    vl_A3344DBLOCAM = vl_A3344DBLOCAM + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOCAM = vl_A3344CRLOCAM + fileA3344.A3344CRLOC;
                                    vl_A3344DBREVAM = vl_A3344DBREVAM + fileA3344.A3344DBREV;
                                    vl_A3344CRREVAM = vl_A3344CRREVAM + fileA3344.A3344CRREV;

                                }
                                //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                                if (fileA3344.A3344CTAC.substring(18, 22).equals("6111") || fileA3344.A3344CTAC.substring(18, 22).equals("6112")) {
                                    //vl_CTAC_6111_6112 = vl_CTAC_6111_6112 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                //02-00-000000-0000-1161-14104-0000-00 03-00-000000-0000-1141-13833-0000-02
                                if (fileA3344.A3344CTAC.substring(18, 28).equals("1161-14104")) {
                                    //vl_CTAC_116114104 = vl_CTAC_116114104 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                // La cuenta 2171 TNU siempre debe de cuadrar con la cuenta de ingreso 4101 o 4102.
                                /*
                                 if (fileA3344.A3344CTAC.substring(18, 22).equals("2171")) {
                                 vl_CTAC_2171 = vl_CTAC_2171 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 if (fileA3344.A3344CTAC.substring(18, 28).equals("2275-29403")) {
                                 vl_CTAC_2171 = vl_CTAC_2171 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 if (fileA3344.A3344CTAC.substring(18, 22).equals("4101") || fileA3344.A3344CTAC.substring(18, 22).equals("4102")) {
                                 vl_CTAC_4101_4102 = vl_CTAC_4101_4102 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 */
                                ///nuevo
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("02")) {
                                    vl_CTA02_DBREV = vl_CTA02_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA02_CRREV = vl_CTA02_CRREV + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("03")) {
                                    vl_CTA03_DBREV = vl_CTA03_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA03_CRREV = vl_CTA03_CRREV + fileA3344.A3344CRREV;
                                }
                            }
                            /*fin del procedimiento*/

                            vl_A3344TKT = fileA3344.A3344TKT + "" + fileA3344.A3344SEQ + "" + fileA3344.A3344CPN;
                        } else {
                            vl_A3344DBLOC = vl_A3344DBLOC + fileA3344.A3344DBLOC;
                            vl_A3344CRLOC = vl_A3344CRLOC + fileA3344.A3344CRLOC;
                            vl_A3344DBREV = vl_A3344DBREV + Double.valueOf(fileA3344.A3344DBREV);
                            vl_A3344CRREV = vl_A3344CRREV + fileA3344.A3344CRREV;

                            if (filter.VP_OPTION.equals("FLWN")) {
                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    /*if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                     fileA3344.A3344MARCA = "X";
                                     }*/
                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("03-00-000000-0000-2131-24705-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") || fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13835-0000-03")) {
                                        fileA3344.A3344MARCA = "X";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        vl_A3344CTAC_AR114113833 = vl_A3344CTAC_AR114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13801-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "13939";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "16251";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }
                                    //new ewn ar
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13835-0000-03") && fileA3344.A3344FILE.equals("AR")) {
                                        fileA3344.A3344CLIEN = "12383";
                                        fileA3344.A3344PROVE = "";
                                        fileA3344.A3344DIREC = "5408";
                                        fileA3344.A3344ORAC = "F_INTERCO";
                                    }

                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }

                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-1141-13830-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "7181";
                                    }

                                    //new
                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-2131-24705-0000-02") && fileA3344.A3344FILE.equals("AP")) {
                                        fileA3344.A3344PROVE = "4614";
                                    }

                                    if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL114113833 = vl_A3344CTAC_GL114113833 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("GL")) {
                                        vl_A3344CTAC_GL213124704 = vl_A3344CTAC_GL213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                        vl_A3344CTAC_AP213124704 = vl_A3344CTAC_AP213124704 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AP")) {
                                        vl_CTACAP_A3344DBREV = vl_CTACAP_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAP_A3344CRREV = vl_CTACAP_A3344CRREV + fileA3344.A3344CRREV;
                                    }
                                    if (fileA3344.A3344FILE.equals("AR")) {
                                        vl_CTACAR_A3344DBREV = vl_CTACAR_A3344DBREV + fileA3344.A3344DBREV;
                                        vl_CTACAR_A3344CRREV = vl_CTACAR_A3344CRREV + fileA3344.A3344CRREV;
                                    }

                                    if (fileA3344.A3344FILE.equals("AR") || fileA3344.A3344FILE.equals("AP")) {
                                        if (fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03") && fileA3344.A3344FILE.equals("AP")) {
                                            vl_CTACAP_213124704DBREV = vl_CTACAP_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }
                                        if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") && fileA3344.A3344FILE.equals("AR")) {
                                            vl_CTACAR_213124704DBREV = vl_CTACAR_213124704DBREV + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                        }

                                    }
                                    if (fileA3344.A3344FILE.equals("GL")) {
                                        if (fileA3344.A3344CTAC.equals("03-00-000000-0000-1141-13833-0000-02") || fileA3344.A3344CTAC.equals("02-00-000000-0000-2131-24704-0000-03")) {
                                            vl_CTACAR_114113833DBREV = vl_CTACAR_114113833DBREV + fileA3344.A3344DBREV;
                                            vl_CTACAR_114113833CRREV = vl_CTACAR_114113833CRREV + fileA3344.A3344CRREV;
                                        }

                                    }

                                }
                                if (fileA3344.A3344CARRIR.equals("5D")) {
                                    vl_A3344DBLOC5D = vl_A3344DBLOC5D + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOC5D = vl_A3344CRLOC5D + fileA3344.A3344CRLOC;
                                    vl_A3344DBREV5D = vl_A3344DBREV5D + fileA3344.A3344DBREV;
                                    vl_A3344CRREV5D = vl_A3344CRREV5D + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CARRIR.equals("AM")) {
                                    vl_A3344DBLOCAM = vl_A3344DBLOCAM + fileA3344.A3344DBLOC;
                                    vl_A3344CRLOCAM = vl_A3344CRLOCAM + fileA3344.A3344CRLOC;
                                    vl_A3344DBREVAM = vl_A3344DBREVAM + fileA3344.A3344DBREV;
                                    vl_A3344CRREVAM = vl_A3344CRREVAM + fileA3344.A3344CRREV;

                                }
                                //Las cuentas 6111 o 6112 deben estar cuadradas con la cuenta 1161 subcuta 14104.
                                if (fileA3344.A3344CTAC.substring(18, 22).equals("6111") || fileA3344.A3344CTAC.substring(18, 22).equals("6112")) {
                                    //  vl_CTAC_6111_6112 = vl_CTAC_6111_6112 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                //02-00-000000-0000-1161-14104-0000-00 03-00-000000-0000-1141-13833-0000-02
                                if (fileA3344.A3344CTAC.substring(18, 28).equals("1161-14104")) {
                                    //vl_CTAC_116114104 = vl_CTAC_116114104 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                    fileA3344.A3344CONP1 = "CM";
                                }
                                // La cuenta 2171 TNU siempre debe de cuadrar con la cuenta de ingreso 4101 o 4102.
                                /*
                                 if (fileA3344.A3344CTAC.substring(18, 22).equals("2171")) {
                                 vl_CTAC_2171 = vl_CTAC_2171 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 if (fileA3344.A3344CTAC.substring(18, 28).equals("2275-29403")) {
                                 vl_CTAC_2171 = vl_CTAC_2171 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 if (fileA3344.A3344CTAC.substring(18, 22).equals("4101") || fileA3344.A3344CTAC.substring(18, 22).equals("4102")) {
                                 vl_CTAC_4101_4102 = vl_CTAC_4101_4102 + fileA3344.A3344DBREV + fileA3344.A3344CRREV;
                                 }
                                 */
                                ///nuevo
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("02")) {
                                    vl_CTA02_DBREV = vl_CTA02_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA02_CRREV = vl_CTA02_CRREV + fileA3344.A3344CRREV;
                                }
                                if (fileA3344.A3344CTAC.substring(0, 2).equals("03")) {
                                    vl_CTA03_DBREV = vl_CTA03_DBREV + fileA3344.A3344DBREV;
                                    vl_CTA03_CRREV = vl_CTA03_CRREV + fileA3344.A3344CRREV;
                                }
                            }
                        }

                        lstGeneral.add(fileA3344);

                    }

                }
            }
            if (mensaje.equals("")) {
                mensaje = logic.subirExcel(lstGeneral, filter.VP_OPTION, filename);
            }
            map.put("success", true);
            map.put("result", mensaje);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    //cellValue = String.valueOf(cell.getCellFormula());
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String
                                .valueOf(intValue) : String.valueOf(value);
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }
    
    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A3344Filter filter = new A3344Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new ADJMassiveaccountingFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A3344Filter> listaData = logic.search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Load_Excel_Debit_Memo_Type");
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

            Integer vi = 0, vj = 0;
            Iterator iter = listaData.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11,
                    CH_12, CH_13, CH_14, CH_15, CH_16, CH_17;
            //<editor-fold defaultstate="collapsed" desc="row">
            row = sheet.createRow(vj);

            CH_00 = row.createCell(0);
            CH_01 = row.createCell(1);
            CH_02 = row.createCell(2);
            CH_03 = row.createCell(3);
            CH_04 = row.createCell(4);
            CH_05 = row.createCell(5);
            CH_06 = row.createCell(6);
            CH_07 = row.createCell(7);
            CH_08 = row.createCell(8);
            CH_09 = row.createCell(9);
            CH_10 = row.createCell(10);
            CH_11 = row.createCell(11);
            CH_12 = row.createCell(12);
            CH_13 = row.createCell(13);
            CH_14 = row.createCell(14);
            CH_15 = row.createCell(15);
            CH_16 = row.createCell(16);
            CH_17 = row.createCell(17);

            CH_00.setCellValue("Ticket");
            CH_01.setCellValue("Cpn");
            CH_02.setCellValue("ADJ Sec.");
            CH_03.setCellValue("Transaction");
            CH_04.setCellValue("System Date");
            CH_05.setCellValue("DEBIT LOCAL");
            CH_06.setCellValue("CREDIT LOCAL");
            CH_07.setCellValue("NET");
            CH_08.setCellValue("DEBIT REVENUE");
            CH_09.setCellValue("CREDIT REVENUE");
            CH_10.setCellValue("NET");
            CH_11.setCellValue("Adj IATA");
            CH_12.setCellValue("Country");
            CH_13.setCellValue("Source");
            CH_14.setCellValue("Description");
            CH_15.setCellValue("User");
            CH_16.setCellValue("Processed");
            CH_17.setCellValue("CTA");

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

            CH_00.setCellStyle(headerStyle);
            CH_01.setCellStyle(headerStyle);
            CH_02.setCellStyle(headerStyle);
            CH_03.setCellStyle(headerStyle);
            CH_04.setCellStyle(headerStyle);
            CH_05.setCellStyle(headerStyle);
            CH_06.setCellStyle(headerStyle);
            CH_07.setCellStyle(headerStyle);
            CH_08.setCellStyle(headerStyle);
            CH_09.setCellStyle(headerStyle);
            CH_10.setCellStyle(headerStyle);
            CH_11.setCellStyle(headerStyle);
            CH_12.setCellStyle(headerStyle);
            CH_13.setCellStyle(headerStyle);
            CH_14.setCellStyle(headerStyle);
            CH_15.setCellStyle(headerStyle);
            CH_16.setCellStyle(headerStyle);
            CH_17.setCellStyle(headerStyle);

            ++vj;
            //</editor-fold>

            while (iter.hasNext()) {
                row = sheet.createRow(vj);
                // <editor-fold defaultstate="collapsed" desc="data">
                CH_00 = row.createCell(0);
                CH_01 = row.createCell(1);
                CH_02 = row.createCell(2);
                CH_03 = row.createCell(3);
                CH_04 = row.createCell(4);
                CH_05 = row.createCell(5);
                CH_06 = row.createCell(6);
                CH_07 = row.createCell(7);
                CH_08 = row.createCell(8);
                CH_09 = row.createCell(9);
                CH_10 = row.createCell(10);
                CH_11 = row.createCell(11);
                CH_12 = row.createCell(12);
                CH_13 = row.createCell(13);
                CH_14 = row.createCell(14);
                CH_15 = row.createCell(15);
                CH_16 = row.createCell(16);
                CH_17 = row.createCell(17);

                CH_00.setCellValue(listaData.get(vi).A3344TKT);
                CH_01.setCellValue(listaData.get(vi).A3344CPN);
                CH_02.setCellValue(listaData.get(vi).A3344CCUST);
                CH_03.setCellValue(listaData.get(vi).A3344TRNCU);
                CH_04.setCellValue(listaData.get(vi).A3344FECIN);
                CH_05.setCellValue(listaData.get(vi).A3344DBLOC);
                CH_06.setCellValue(listaData.get(vi).A3344CRLOC);
                CH_07.setCellValue(listaData.get(vi).SQUARELOC);
                CH_08.setCellValue(listaData.get(vi).A3344DBREV);
                CH_09.setCellValue(listaData.get(vi).A3344CRREV);
                CH_10.setCellValue(listaData.get(vi).SQUAREREV);
                CH_11.setCellValue(listaData.get(vi).A3344IATAU);
                CH_12.setCellValue(listaData.get(vi).A3344PAIS);
                CH_13.setCellValue(listaData.get(vi).A3344FUENT);
                CH_14.setCellValue(listaData.get(vi).A3344DESCR);
                CH_15.setCellValue(listaData.get(vi).A3344USRIN);
                CH_16.setCellValue(listaData.get(vi).A3344FLAG);
                CH_17.setCellValue(listaData.get(vi).A3344CTAC);
                

                CH_00.setCellStyle(bodyStyle);
                CH_01.setCellStyle(bodyStyle);
                CH_02.setCellStyle(bodyStyle);
                CH_03.setCellStyle(bodyStyle);
                CH_04.setCellStyle(bodyStyle);
                CH_05.setCellStyle(bodyStyle);
                CH_06.setCellStyle(bodyStyle);
                CH_07.setCellStyle(bodyStyle);
                CH_08.setCellStyle(bodyStyle);
                CH_09.setCellStyle(bodyStyle);
                CH_10.setCellStyle(bodyStyle);
                CH_11.setCellStyle(bodyStyle);
                CH_12.setCellStyle(bodyStyle);
                CH_13.setCellStyle(bodyStyle);
                CH_14.setCellStyle(bodyStyle);
                CH_15.setCellStyle(bodyStyle);
                CH_16.setCellStyle(bodyStyle);
                CH_17.setCellStyle(bodyStyle);
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
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(17, true);

            String fileNameDownload = String.format("Load_Excel_Debit_Memo_Type_" + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            File file = File.createTempFile(fileNameDownload, ".xlsx");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SpringException(e);
        }
    }

}
