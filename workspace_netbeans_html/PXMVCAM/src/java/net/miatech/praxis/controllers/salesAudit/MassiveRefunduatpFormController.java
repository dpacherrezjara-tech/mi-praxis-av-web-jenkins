/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.MassiveRefunduatpFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/MassiveRefunduatpForm")
public class MassiveRefunduatpFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private MassiveRefunduatpFormLogic logic;

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A4076Filter> lst;
        A4076Filter filter = new A4076Filter();

        try {
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_OPTION = request.getParameter("IN_OPTION");
            filter.IN_DATEFROM = request.getParameter("IN_DATEFROM");
            filter.IN_DATETO = request.getParameter("IN_DATETO");
            filter.IN_TICKET = request.getParameter("IN_TICKET");
            filter.IN_COUNTRY = request.getParameter("IN_COUNTRY");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_STATUSBPO = request.getParameter("IN_STATUSBPO");
            filter.IN_STATUS = request.getParameter("IN_STATUS");
            filter.IN_USER = request.getParameter("IN_USER");

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

    @RequestMapping(value = "SearchUATPRFNDetail")
    public @ResponseBody
    String SearchUATPRFNDetail(ModelMap map, HttpServletRequest request) {
        A4076Filter lst;
        A4076Filter filter = new A4076Filter();

        HashMap map01, map02;

        ArrayList<HashMap<String, String>> lst_TAXES = new ArrayList<>();
        ArrayList<HashMap<String, String>> lst_FOP = new ArrayList<>();
        try {
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CORR = request.getParameter("IN_CORR");

            lst = logic.SearchUATPRFNDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_TAXES">
            for (int vi = 0; vi < lst.lst_TAXES.size(); ++vi) {
                map01 = new HashMap<>();

                map01.put("A4078CCUST", lst.lst_TAXES.get(vi).A4078CCUST);
                map01.put("A4078PREME", lst.lst_TAXES.get(vi).A4078PREME);
                map01.put("A4078ANIO", lst.lst_TAXES.get(vi).A4078ANIO);
                map01.put("A4078CORRL", lst.lst_TAXES.get(vi).A4078CORRL);
                map01.put("A4078SEQ", lst.lst_TAXES.get(vi).A4078SEQ);
                map01.put("A4078CDTAX", lst.lst_TAXES.get(vi).A4078CDTAX);
                map01.put("A4078CDATO", lst.lst_TAXES.get(vi).A4078CDATO);
                map01.put("A4078MONED", lst.lst_TAXES.get(vi).A4078MONED);
                map01.put("A4078TXMIA", lst.lst_TAXES.get(vi).A4078TXMIA);
                map01.put("A4078MORIG", lst.lst_TAXES.get(vi).A4078MORIG);
                map01.put("A4078TXORI", lst.lst_TAXES.get(vi).A4078TXORI);
                map01.put("A4078TXDIF", lst.lst_TAXES.get(vi).A4078TXDIF);
                map01.put("A4078TXDAF", lst.lst_TAXES.get(vi).A4078TXDAF);
                map01.put("A4078STAT", lst.lst_TAXES.get(vi).A4078STAT);
                map01.put("A4078SBSTA", lst.lst_TAXES.get(vi).A4078SBSTA);

                lst_TAXES.add(map01);
            }
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="ArrayList -> lst_FOP">
            for (int vi = 0; vi < lst.lst_CardType.size(); ++vi) {
                map02 = new HashMap<>();

                map02.put("A4077CCUST", lst.lst_CardType.get(vi).A4077CCUST);
                map02.put("A4077PREME", lst.lst_CardType.get(vi).A4077PREME);
                map02.put("A4077ANIO", lst.lst_CardType.get(vi).A4077ANIO);
                map02.put("A4077CORRL", lst.lst_CardType.get(vi).A4077CORRL);
                map02.put("A4077SEQ", lst.lst_CardType.get(vi).A4077SEQ);
                map02.put("A4077CFOP", lst.lst_CardType.get(vi).A4077CFOP);
                map02.put("A4077TYCAR", lst.lst_CardType.get(vi).A4077TYCAR);
                map02.put("A4077CUR", lst.lst_CardType.get(vi).A4077CUR);
                map02.put("A4077NTARJ", lst.lst_CardType.get(vi).A4077NTARJ);
                map02.put("A4077FEXP", lst.lst_CardType.get(vi).A4077FEXP);
                map02.put("A4077CAPL", lst.lst_CardType.get(vi).A4077CAPL);
                map02.put("A4077MONTO", lst.lst_CardType.get(vi).A4077MONTO);
                map02.put("A4077MONTE", lst.lst_CardType.get(vi).A4077MONTE);
                map02.put("A4077TOTAL", lst.lst_CardType.get(vi).A4077TOTAL);
                map02.put("A4077FLAG", lst.lst_CardType.get(vi).A4077FLAG);

                lst_FOP.add(map02);
            }
            // </editor-fold>

        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("lst_TAXES", lst_TAXES);
        map.put("lst_FOP", lst_FOP);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A4076Filter filter = new A4076Filter();
        DecimalFormat df = new DecimalFormat("#.00");
        ArrayList<A4076Filter> lstGeneral = new ArrayList<A4076Filter>(0);
        A4076Filter fileA4076;
        String result = "";
        int i = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            //Creates a workbook object from the uploaded excelfile
            // HSSFWorkbook workbook = new HSSFWorkbook(excelfile.getInputStream());
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA4076 = new A4076Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                fileA4076.A4076CCUST = "139";
                fileA4076.A4076TYPE = filter.IN_TYPE;
                if (fileA4076.A4076TYPE.equals("MA")) {
                    if (cont > 2) {
                        if (currentRow.getCell(0) != null) {
                            cont1++;

                            fileA4076.A4076TICKET = getCellValue(currentRow.getCell(0));
                            if (fileA4076.A4076TICKET.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA4076.A4076TICKET.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES  " + fileA4076.A4076TICKET;
                                break;
                            }
                            fileA4076.A4076REFE = getCellValue(currentRow.getCell(1));
                            if (fileA4076.A4076REFE.equals("")) {
                                result = "REFERENCE required";
                                break;
                            }
                            fileA4076.A4076AGEN = getCellValue(currentRow.getCell(2));
                            if (fileA4076.A4076AGEN.equals("")) {
                                result = "IATA required";
                                break;
                            }
                            if (fileA4076.A4076AGEN.length() != 8) {
                                result = "THE TICKET MUST BE 8 CHARACTERES  " + fileA4076.A4076AGEN;
                                break;
                            }
                            fileA4076.A4076MDA = getCellValue(currentRow.getCell(3));
                            if (fileA4076.A4076MDA.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA4076.A4076MDA.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES  " + fileA4076.A4076MDA;
                                break;
                            }
                            fileA4076.A4076TRNCO = getCellValue(currentRow.getCell(4));
                            if (fileA4076.A4076TRNCO.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TRNCO.length() != 4) {
                                result = "THE Transaction MUST BE 4 CHARACTERES  " + fileA4076.A4076TRNCO;
                                break;
                            }

                            fileA4076.A4076TDOC = getCellValue(currentRow.getCell(5));
                            if (fileA4076.A4076TDOC.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TDOC.length() != 4) {
                                result = "THE TDOC MUST BE 4 CHARACTERES  " + fileA4076.A4076TDOC;
                                break;
                            }

                            fileA4076.A4076FVTA = getCellValue(currentRow.getCell(6));
                            if (fileA4076.A4076FVTA.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076FVTA.length() != 10) {
                                result = "THE SALE DATE MUST BE 10 CHARACTERES  " + fileA4076.A4076FVTA;
                                break;
                            }

                            fileA4076.A4076CPN = getCellValue(currentRow.getCell(7));
                            fileA4076.A4076FP1 = getCellValue(currentRow.getCell(8));
                            if (!fileA4076.A4076FP1.equals("")) {
                                if (fileA4076.A4076FP1.length() != 2) {
                                    result = "THE FOP1 MUST BE 3 CHARACTERES  " + fileA4076.A4076FP1;
                                    break;
                                }
                            }
                            fileA4076.A4076TCARD1 = getCellValue(currentRow.getCell(9));
                            if (fileA4076.A4076FP1.equals("CC")) {
                                if (fileA4076.A4076TCARD1.equals("")) {
                                    result = "Type Card 1 required";
                                    break;
                                }
                                if (!fileA4076.A4076TCARD1.equals("CA") && !fileA4076.A4076TCARD1.equals("VI") && !fileA4076.A4076TCARD1.equals("AX") && !fileA4076.A4076TCARD1.equals("TP") && !fileA4076.A4076TCARD1.equals("DC") && !fileA4076.A4076TCARD1.equals("DC") && !fileA4076.A4076TCARD1.equals("JC") && !fileA4076.A4076TCARD1.equals("DS") && !fileA4076.A4076TCARD1.equals("PP") && !fileA4076.A4076TCARD1.equals("IK") && !fileA4076.A4076TCARD1.equals("BA")) {
                                    result = "Card type does not exist " + fileA4076.A4076TCARD1;
                                    break;
                                }
                            }
                            fileA4076.A4076CARD1 = getCellValue(currentRow.getCell(10));
                            if (!fileA4076.A4076CARD1.equals("")) {

                                if (fileA4076.A4076TCARD1.equals("DC")) {
                                    if (fileA4076.A4076CARD1.length() != 14) {
                                        result = "THE CARD NUMBER1 MUST BE 14 CHARACTERES  " + fileA4076.A4076CARD1;
                                        break;
                                    }
                                }

                                if (fileA4076.A4076TCARD1.equals("AX") || fileA4076.A4076TCARD1.equals("TP") || fileA4076.A4076TCARD1.equals("PP")) {
                                    if (fileA4076.A4076CARD1.length() != 15) {
                                        result = "THE CARD NUMBER1 MUST BE 15 CHARACTERES  " + fileA4076.A4076CARD1;
                                        break;
                                    }
                                }
                                if (fileA4076.A4076TCARD1.equals("BA") || fileA4076.A4076TCARD1.equals("IK") || fileA4076.A4076TCARD1.equals("DS") || fileA4076.A4076TCARD1.equals("CA") || fileA4076.A4076TCARD1.equals("VI") || fileA4076.A4076TCARD1.equals("JC")) {
                                    if (fileA4076.A4076CARD1.length() != 16) {
                                        result = "THE CARD NUMBER1 MUST BE 16 CHARACTERES  " + fileA4076.A4076CARD1;
                                        break;
                                    }
                                }
                            }
                            if (!getCellValue(currentRow.getCell(11)).equals("")) {
                                if (fileA4076.A4076FP1.equals("")) {
                                    result = "FOP 1 required";
                                    break;
                                }
                                switch (currentRow.getCell(11).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTCARD1 = fijarNumero(currentRow.getCell(11).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTCARD1 = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                                        fileA4076.A4076MONTCARD1 = fijarNumero(fileA4076.A4076MONTCARD1);
                                        break;
                                    default:
                                        fileA4076.A4076MONTCARD1 = Integer.valueOf(getCellValue(currentRow.getCell(11)));
                                        break;
                                }
                                //fileA4076.A4076MONTCARD1 = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                                //fileA4076.A4076MONTCARD1 = fijarNumero(fileA4076.A4076MONTCARD1);
                            } else {
                                fileA4076.A4076MONTCARD1 = 0;
                            }
                            fileA4076.A4076FP2 = getCellValue(currentRow.getCell(12));
                            if (!fileA4076.A4076FP2.equals("")) {
                                if (fileA4076.A4076FP2.length() != 2) {
                                    result = "THE FOP2 MUST BE 2 CHARACTERES  " + fileA4076.A4076FP2;
                                    break;
                                }
                            }
                            fileA4076.A4076TCARD2 = getCellValue(currentRow.getCell(13));
                            if (fileA4076.A4076FP2.equals("CC")) {
                                if (fileA4076.A4076TCARD2.equals("")) {
                                    result = "Type Card 2 required";
                                    break;
                                }
                                if (!fileA4076.A4076TCARD2.equals("CA") && !fileA4076.A4076TCARD2.equals("VI") && !fileA4076.A4076TCARD2.equals("AX") && !fileA4076.A4076TCARD2.equals("TP") && !fileA4076.A4076TCARD2.equals("DC") && !fileA4076.A4076TCARD2.equals("DC") && !fileA4076.A4076TCARD2.equals("JC") && !fileA4076.A4076TCARD2.equals("DS") && !fileA4076.A4076TCARD2.equals("PP") && !fileA4076.A4076TCARD2.equals("IK") && !fileA4076.A4076TCARD2.equals("BA")) {
                                    result = "Card type does not exist " + fileA4076.A4076TCARD2;
                                    break;
                                }
                            }
                            fileA4076.A4076CARD2 = getCellValue(currentRow.getCell(14));
                            if (!fileA4076.A4076CARD2.equals("")) {
                                if (fileA4076.A4076TCARD2.equals("DC")) {
                                    if (fileA4076.A4076CARD2.length() != 14) {
                                        result = "THE CARD NUMBER1 MUST BE 14 CHARACTERES  " + fileA4076.A4076CARD2;
                                        break;
                                    }
                                }
                                if (fileA4076.A4076TCARD2.equals("AX") || fileA4076.A4076TCARD2.equals("TP") || fileA4076.A4076TCARD2.equals("PP")) {
                                    if (fileA4076.A4076CARD2.length() != 15) {
                                        result = "THE CARD NUMBER1 MUST BE 15 CHARACTERES  " + fileA4076.A4076CARD2;
                                        break;
                                    }
                                }
                                if (fileA4076.A4076TCARD2.equals("BA") || fileA4076.A4076TCARD2.equals("IK") || fileA4076.A4076TCARD2.equals("DS") || fileA4076.A4076TCARD2.equals("CA") || fileA4076.A4076TCARD2.equals("VI") || fileA4076.A4076TCARD2.equals("JC")) {
                                    if (fileA4076.A4076CARD2.length() != 16) {
                                        result = "THE CARD NUMBER1 MUST BE 16 CHARACTERES  " + fileA4076.A4076CARD2;
                                        break;
                                    }
                                }
                            }
                            if (!getCellValue(currentRow.getCell(15)).equals("")) {
                                if (fileA4076.A4076FP1.equals("")) {
                                    result = "FOP 2 required";
                                    break;
                                }
                                switch (currentRow.getCell(15).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTCARD2 = fijarNumero(currentRow.getCell(15).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTCARD2 = Float.parseFloat(getCellValue(currentRow.getCell(15)));
                                        fileA4076.A4076MONTCARD2 = fijarNumero(fileA4076.A4076MONTCARD2);
                                        break;
                                    default:
                                        fileA4076.A4076MONTCARD2 = Integer.valueOf(getCellValue(currentRow.getCell(15)));
                                        break;
                                }
                                //fileA4076.A4076MONTCARD2 = Float.parseFloat(getCellValue(currentRow.getCell(15)));
                                //fileA4076.A4076MONTCARD2 = fijarNumero(fileA4076.A4076MONTCARD2);
                            } else {
                                fileA4076.A4076MONTCARD2 = 0;
                            }

                            fileA4076.A4076MONTT = getCellValue(currentRow.getCell(16));
                            if (!fileA4076.A4076MONTT.equals("")) {
                                if (fileA4076.A4076MONTT.length() != 3) {
                                    result = "THE CURRENCY FARE MUST BE 3 CHARACTERES  " + fileA4076.A4076MONTT;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(17)).equals("")) {
                                switch (currentRow.getCell(17).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076TARTK = fijarNumero(currentRow.getCell(17).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076TARTK = Float.parseFloat(getCellValue(currentRow.getCell(17)));
                                        fileA4076.A4076TARTK = fijarNumero(fileA4076.A4076TARTK);
                                        break;
                                    default:
                                        fileA4076.A4076TARTK = Double.parseDouble(getCellValue(currentRow.getCell(17)));
                                        break;
                                }
                                //fileA4076.A4076TARTK = Float.parseFloat(getCellValue(currentRow.getCell(17)));
                                //fileA4076.A4076TARTK = fijarNumero(fileA4076.A4076TARTK);
                            } else {
                                fileA4076.A4076TARTK = 0;
                            }
                            if (fileA4076.A4076TARTK != 0) {
                                if (fileA4076.A4076MONTT.equals("")) {
                                    result = "YOU MUST ENTER THE CURRENCY OF THE FARE " + fileA4076.A4076TICKET;
                                    break;
                                }
                            }

                            fileA4076.A4076MONET = getCellValue(currentRow.getCell(18));
                            if (!fileA4076.A4076MONET.equals("")) {
                                if (fileA4076.A4076MONET.length() != 3) {
                                    result = "THE CURRENCY EQV. MUST BE 3 CHARACTERES  " + fileA4076.A4076MONET;
                                    break;
                                }
                                if (!fileA4076.A4076MONET.equals(fileA4076.A4076MDA)) {
                                    result = "THE CURRENCY OF THE EQUIVALENT RATE MUST BE THE SAME AS THE CURRENCY REPORTED IN COLUMN D  " + fileA4076.A4076TICKET;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(19)).equals("")) {
                                switch (currentRow.getCell(19).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076EQVTK = fijarNumero(currentRow.getCell(19).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076EQVTK = Float.parseFloat(getCellValue(currentRow.getCell(19)));
                                        fileA4076.A4076EQVTK = fijarNumero(fileA4076.A4076EQVTK);
                                        break;
                                    default:
                                        fileA4076.A4076EQVTK = Double.parseDouble(getCellValue(currentRow.getCell(19)));
                                        break;
                                }
                                //fileA4076.A4076EQVTK = Float.parseFloat(getCellValue(currentRow.getCell(19)));
                                //fileA4076.A4076EQVTK = fijarNumero(fileA4076.A4076EQVTK);
                            } else {
                                fileA4076.A4076EQVTK = 0;
                            }
                            if (fileA4076.A4076EQVTK != 0) {
                                if (fileA4076.A4076TARTK == 0) {
                                    result = "YOU MUST ENTER THE RATE AS YOU ARE REPORTING THE EQUIVALENT RATE " + fileA4076.A4076TICKET;
                                    break;
                                }
                                if (fileA4076.A4076EQVTK != 0) {
                                    if (!fileA4076.A4076MONET.equals(fileA4076.A4076MDA)) {
                                        result = "YOU MUST ENTER THE EQUIVALENT CURRENCY  " + fileA4076.A4076TICKET;
                                        break;
                                    }
                                }
                            } else {
                                if (!fileA4076.A4076MONTT.equals(fileA4076.A4076MDA)) {
                                    result = "THE RATE CURRENCY MUST BE THE SAME AS REPORTED IN COLUMN D " + fileA4076.A4076TICKET;
                                    break;
                                }
                            }
                            /**
                             * **TAX1 **
                             */
                            fileA4076.A4076TAX1 = getCellValue(currentRow.getCell(20));
                            if (!fileA4076.A4076TAX1.equals("")) {
                                if (fileA4076.A4076TAX1.length() > 3 || fileA4076.A4076TAX1.length() < 2) {
                                    result = "THE TAX1 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX1;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO1 = getCellValue(currentRow.getCell(21));
                            if (!fileA4076.A4076ATO1.equals("")) {
                                if (fileA4076.A4076ATO1.length() != 3) {
                                    result = "THE ATO MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO1;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(22)).equals("")) {
                                switch (currentRow.getCell(22).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX1 = fijarNumero(currentRow.getCell(22).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX1 = Float.parseFloat(getCellValue(currentRow.getCell(22)));
                                        fileA4076.A4076MONTAX1 = fijarNumero(fileA4076.A4076MONTAX1);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX1 = Double.parseDouble(getCellValue(currentRow.getCell(22)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX1 = Float.parseFloat(getCellValue(currentRow.getCell(22)));
                                //fileA4076.A4076MONTAX1 = fijarNumero(fileA4076.A4076MONTAX1);
                            } else {
                                fileA4076.A4076MONTAX1 = 0;
                            }
                            if (!fileA4076.A4076TAX1.equals("") && fileA4076.A4076MONTAX1 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX1 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX1.equals("") && fileA4076.A4076MONTAX1 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX1 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX2 **
                             */
                            fileA4076.A4076TAX2 = getCellValue(currentRow.getCell(23));
                            if (!fileA4076.A4076TAX2.equals("")) {
                                if (fileA4076.A4076TAX2.length() > 3 || fileA4076.A4076TAX2.length() < 2) {
                                    result = "THE TAX2 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX2;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO2 = getCellValue(currentRow.getCell(24));
                            if (!fileA4076.A4076ATO2.equals("")) {
                                if (fileA4076.A4076ATO2.length() != 3) {
                                    result = "THE ATO2 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO2;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(25)).equals("")) {
                                switch (currentRow.getCell(25).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX2 = fijarNumero(currentRow.getCell(25).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX2 = Float.parseFloat(getCellValue(currentRow.getCell(25)));
                                        fileA4076.A4076MONTAX2 = fijarNumero(fileA4076.A4076MONTAX2);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX2 = Double.parseDouble(getCellValue(currentRow.getCell(25)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX2 = Float.parseFloat(getCellValue(currentRow.getCell(25)));
                                //fileA4076.A4076MONTAX2 = fijarNumero(fileA4076.A4076MONTAX2);
                            } else {
                                fileA4076.A4076MONTAX2 = 0;
                            }

                            if (!fileA4076.A4076TAX2.equals("") && fileA4076.A4076MONTAX2 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX2 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX2.equals("") && fileA4076.A4076MONTAX2 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX2 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX3 **
                             */
                            fileA4076.A4076TAX3 = getCellValue(currentRow.getCell(26));
                            if (!fileA4076.A4076TAX3.equals("")) {
                                if (fileA4076.A4076TAX3.length() > 3 || fileA4076.A4076TAX3.length() < 2) {
                                    result = "THE TAX3 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX3;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO3 = getCellValue(currentRow.getCell(27));
                            if (!fileA4076.A4076ATO3.equals("")) {
                                if (fileA4076.A4076ATO3.length() != 3) {
                                    result = "THE ATO3 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO3;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(28)).equals("")) {
                                switch (currentRow.getCell(28).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX3 = fijarNumero(currentRow.getCell(28).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX3 = Float.parseFloat(getCellValue(currentRow.getCell(28)));
                                        fileA4076.A4076MONTAX3 = fijarNumero(fileA4076.A4076MONTAX3);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX3 = Double.parseDouble(getCellValue(currentRow.getCell(28)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX3 = Float.parseFloat(getCellValue(currentRow.getCell(28)));
                                //fileA4076.A4076MONTAX3 = fijarNumero(fileA4076.A4076MONTAX3);
                            } else {
                                fileA4076.A4076MONTAX3 = 0;
                            }

                            if (!fileA4076.A4076TAX3.equals("") && fileA4076.A4076MONTAX3 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX3 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX3.equals("") && fileA4076.A4076MONTAX3 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX3 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX4 **
                             */
                            fileA4076.A4076TAX4 = getCellValue(currentRow.getCell(29));
                            if (!fileA4076.A4076TAX4.equals("")) {
                                if (fileA4076.A4076TAX4.length() > 3 || fileA4076.A4076TAX4.length() < 2) {
                                    result = "THE TAX4 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX4;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO4 = getCellValue(currentRow.getCell(30));
                            if (!fileA4076.A4076ATO4.equals("")) {
                                if (fileA4076.A4076ATO4.length() > 3) {
                                    result = "THE ATO4 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO4;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(31)).equals("")) {
                                switch (currentRow.getCell(31).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX4 = fijarNumero(currentRow.getCell(31).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX4 = Float.parseFloat(getCellValue(currentRow.getCell(31)));
                                        fileA4076.A4076MONTAX4 = fijarNumero(fileA4076.A4076MONTAX4);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX4 = Double.parseDouble(getCellValue(currentRow.getCell(31)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX4 = Float.parseFloat(getCellValue(currentRow.getCell(31)));
                                //fileA4076.A4076MONTAX4 = fijarNumero(fileA4076.A4076MONTAX4);
                            } else {
                                fileA4076.A4076MONTAX4 = 0;
                            }

                            if (!fileA4076.A4076TAX4.equals("") && fileA4076.A4076MONTAX4 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX4 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX4.equals("") && fileA4076.A4076MONTAX4 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX4 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX5 **
                             */
                            fileA4076.A4076TAX5 = getCellValue(currentRow.getCell(32));
                            if (!fileA4076.A4076TAX5.equals("")) {
                                if (fileA4076.A4076TAX5.length() > 3 || fileA4076.A4076TAX5.length() < 2) {
                                    result = "THE TAX5 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX5;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO5 = getCellValue(currentRow.getCell(33));
                            if (!fileA4076.A4076ATO5.equals("")) {
                                if (fileA4076.A4076ATO5.length() != 3) {
                                    result = "THE ATO5 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO5;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(34)).equals("")) {
                                switch (currentRow.getCell(34).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX5 = fijarNumero(currentRow.getCell(34).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX5 = Float.parseFloat(getCellValue(currentRow.getCell(34)));
                                        fileA4076.A4076MONTAX5 = fijarNumero(fileA4076.A4076MONTAX5);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX5 = Double.parseDouble(getCellValue(currentRow.getCell(34)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX5 = Float.parseFloat(getCellValue(currentRow.getCell(34)));
                                //fileA4076.A4076MONTAX5 = fijarNumero(fileA4076.A4076MONTAX5);
                            } else {
                                fileA4076.A4076MONTAX5 = 0;
                            }

                            if (!fileA4076.A4076TAX5.equals("") && fileA4076.A4076MONTAX5 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX5 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX5.equals("") && fileA4076.A4076MONTAX5 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX5 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX6 **
                             */
                            fileA4076.A4076TAX6 = getCellValue(currentRow.getCell(35));
                            if (!fileA4076.A4076TAX6.equals("")) {
                                if (fileA4076.A4076TAX6.length() > 3 || fileA4076.A4076TAX6.length() < 2) {
                                    result = "THE TAX6 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX6;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO6 = getCellValue(currentRow.getCell(36));
                            if (!fileA4076.A4076ATO6.equals("")) {
                                if (fileA4076.A4076ATO6.length() > 3) {
                                    result = "THE ATO6 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO6;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(37)).equals("")) {
                                switch (currentRow.getCell(37).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX6 = fijarNumero(currentRow.getCell(37).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX6 = Float.parseFloat(getCellValue(currentRow.getCell(37)));
                                        fileA4076.A4076MONTAX6 = fijarNumero(fileA4076.A4076MONTAX6);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX6 = Double.parseDouble(getCellValue(currentRow.getCell(37)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX6 = Float.parseFloat(getCellValue(currentRow.getCell(37)));
                                //fileA4076.A4076MONTAX6 = fijarNumero(fileA4076.A4076MONTAX6);
                            } else {
                                fileA4076.A4076MONTAX6 = 0;
                            }

                            if (!fileA4076.A4076TAX6.equals("") && fileA4076.A4076MONTAX6 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX6 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX6.equals("") && fileA4076.A4076MONTAX6 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX6 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX7 **
                             */
                            fileA4076.A4076TAX7 = getCellValue(currentRow.getCell(38));
                            if (!fileA4076.A4076TAX7.equals("")) {
                                if (fileA4076.A4076TAX7.length() > 3 || fileA4076.A4076TAX7.length() < 2) {
                                    result = "THE TAX7 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX7;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO7 = getCellValue(currentRow.getCell(39));
                            if (!fileA4076.A4076ATO7.equals("")) {
                                if (fileA4076.A4076ATO7.length() > 3) {
                                    result = "THE ATO7 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO7;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(40)).equals("")) {
                                switch (currentRow.getCell(40).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX7 = fijarNumero(currentRow.getCell(40).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX7 = Float.parseFloat(getCellValue(currentRow.getCell(40)));
                                        fileA4076.A4076MONTAX7 = fijarNumero(fileA4076.A4076MONTAX7);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX7 = Double.parseDouble(getCellValue(currentRow.getCell(40)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX7 = Float.parseFloat(getCellValue(currentRow.getCell(40)));
                                //fileA4076.A4076MONTAX7 = fijarNumero(fileA4076.A4076MONTAX7);
                            } else {
                                fileA4076.A4076MONTAX7 = 0;
                            }

                            if (!fileA4076.A4076TAX7.equals("") && fileA4076.A4076MONTAX7 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX7 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX7.equals("") && fileA4076.A4076MONTAX7 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX7 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX8 **
                             */
                            fileA4076.A4076TAX8 = getCellValue(currentRow.getCell(41));
                            if (!fileA4076.A4076TAX8.equals("")) {
                                if (fileA4076.A4076TAX8.length() > 3 || fileA4076.A4076TAX8.length() < 2) {
                                    result = "THE TAX8 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX8;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO8 = getCellValue(currentRow.getCell(42));
                            if (!fileA4076.A4076ATO8.equals("")) {
                                if (fileA4076.A4076ATO8.length() > 3) {
                                    result = "THE ATO8 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO8;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(43)).equals("")) {
                                switch (currentRow.getCell(43).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX8 = fijarNumero(currentRow.getCell(43).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX8 = Float.parseFloat(getCellValue(currentRow.getCell(43)));
                                        fileA4076.A4076MONTAX8 = fijarNumero(fileA4076.A4076MONTAX8);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX8 = Double.parseDouble(getCellValue(currentRow.getCell(43)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX8 = Float.parseFloat(getCellValue(currentRow.getCell(43)));
                                //fileA4076.A4076MONTAX8 = fijarNumero(fileA4076.A4076MONTAX8);
                            } else {
                                fileA4076.A4076MONTAX8 = 0;
                            }

                            if (!fileA4076.A4076TAX8.equals("") && fileA4076.A4076MONTAX8 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX8 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX8.equals("") && fileA4076.A4076MONTAX8 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX8 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX9 **
                             */
                            fileA4076.A4076TAX9 = getCellValue(currentRow.getCell(44));
                            if (!fileA4076.A4076TAX9.equals("")) {
                                if (fileA4076.A4076TAX9.length() > 3 || fileA4076.A4076TAX9.length() < 2) {
                                    result = "THE TAX9 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX9;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO9 = getCellValue(currentRow.getCell(45));
                            if (!fileA4076.A4076ATO9.equals("")) {
                                if (fileA4076.A4076ATO9.length() != 3) {
                                    result = "THE ATO9 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO9;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(46)).equals("")) {
                                switch (currentRow.getCell(46).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX9 = fijarNumero(currentRow.getCell(46).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX9 = Float.parseFloat(getCellValue(currentRow.getCell(46)));
                                        fileA4076.A4076MONTAX9 = fijarNumero(fileA4076.A4076MONTAX9);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX9 = Double.parseDouble(getCellValue(currentRow.getCell(46)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX9 = Float.parseFloat(getCellValue(currentRow.getCell(46)));
                                //fileA4076.A4076MONTAX9 = fijarNumero(fileA4076.A4076MONTAX9);
                            } else {
                                fileA4076.A4076MONTAX9 = 0;
                            }

                            if (!fileA4076.A4076TAX9.equals("") && fileA4076.A4076MONTAX9 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX9 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX9.equals("") && fileA4076.A4076MONTAX9 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX9 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX10 **
                             */
                            fileA4076.A4076TAX10 = getCellValue(currentRow.getCell(47));
                            if (!fileA4076.A4076TAX10.equals("")) {
                                if (fileA4076.A4076TAX10.length() > 3 || fileA4076.A4076TAX10.length() < 2) {
                                    result = "THE TAX10 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX10;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO10 = getCellValue(currentRow.getCell(48));
                            if (!fileA4076.A4076ATO10.equals("")) {
                                if (fileA4076.A4076ATO10.length() != 3) {
                                    result = "THE ATO10 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO10;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(49)).equals("")) {
                                switch (currentRow.getCell(49).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX10 = fijarNumero(currentRow.getCell(49).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX10 = Float.parseFloat(getCellValue(currentRow.getCell(49)));
                                        fileA4076.A4076MONTAX10 = fijarNumero(fileA4076.A4076MONTAX10);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX10 = Double.parseDouble(getCellValue(currentRow.getCell(49)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX10 = Float.parseFloat(getCellValue(currentRow.getCell(49)));
                                //fileA4076.A4076MONTAX10 = fijarNumero(fileA4076.A4076MONTAX10);
                            } else {
                                fileA4076.A4076MONTAX10 = 0;
                            }
                            if (!fileA4076.A4076TAX10.equals("") && fileA4076.A4076MONTAX10 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX10 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX10.equals("") && fileA4076.A4076MONTAX10 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX10 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX11 **
                             */
                            fileA4076.A4076TAX11 = getCellValue(currentRow.getCell(50));
                            if (!fileA4076.A4076TAX11.equals("")) {
                                if (fileA4076.A4076TAX11.length() > 3 || fileA4076.A4076TAX11.length() < 2) {
                                    result = "THE TAX11 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX11;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO11 = getCellValue(currentRow.getCell(51));
                            if (!fileA4076.A4076ATO11.equals("")) {
                                if (fileA4076.A4076ATO11.length() != 3) {
                                    result = "THE ATO11 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO11;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(52)).equals("")) {
                                switch (currentRow.getCell(52).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX11 = fijarNumero(currentRow.getCell(52).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX11 = Float.parseFloat(getCellValue(currentRow.getCell(52)));
                                        fileA4076.A4076MONTAX11 = fijarNumero(fileA4076.A4076MONTAX11);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX11 = Double.parseDouble(getCellValue(currentRow.getCell(52)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX11 = Float.parseFloat(getCellValue(currentRow.getCell(52)));
                                //fileA4076.A4076MONTAX11 = fijarNumero(fileA4076.A4076MONTAX11);
                            } else {
                                fileA4076.A4076MONTAX11 = 0;
                            }

                            if (!fileA4076.A4076TAX11.equals("") && fileA4076.A4076MONTAX11 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX11 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX11.equals("") && fileA4076.A4076MONTAX11 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX11 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX13 **
                             */
                            fileA4076.A4076TAX12 = getCellValue(currentRow.getCell(53));
                            if (!fileA4076.A4076TAX12.equals("")) {
                                if (fileA4076.A4076TAX12.length() > 3 || fileA4076.A4076TAX12.length() < 2) {
                                    result = "THE TAX12 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX12;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO12 = getCellValue(currentRow.getCell(54));
                            if (!fileA4076.A4076ATO12.equals("")) {
                                if (fileA4076.A4076ATO12.length() != 3) {
                                    result = "THE ATO12 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO12;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(55)).equals("")) {
                                switch (currentRow.getCell(55).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX12 = fijarNumero(currentRow.getCell(55).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX12 = Float.parseFloat(getCellValue(currentRow.getCell(55)));
                                        fileA4076.A4076MONTAX12 = fijarNumero(fileA4076.A4076MONTAX12);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX12 = Double.parseDouble(getCellValue(currentRow.getCell(55)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX12 = Float.parseFloat(getCellValue(currentRow.getCell(55)));
                                //fileA4076.A4076MONTAX12 = fijarNumero(fileA4076.A4076MONTAX12);
                            } else {
                                fileA4076.A4076MONTAX12 = 0;
                            }

                            if (!fileA4076.A4076TAX12.equals("") && fileA4076.A4076MONTAX12 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX12 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX12.equals("") && fileA4076.A4076MONTAX12 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX12 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX13 **
                             */
                            fileA4076.A4076TAX13 = getCellValue(currentRow.getCell(56));
                            if (!fileA4076.A4076TAX13.equals("")) {
                                if (fileA4076.A4076TAX13.length() > 3 || fileA4076.A4076TAX13.length() < 2) {
                                    result = "THE TAX13 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX13;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO13 = getCellValue(currentRow.getCell(57));
                            if (!fileA4076.A4076ATO13.equals("")) {
                                if (fileA4076.A4076ATO13.length() != 3) {
                                    result = "THE ATO13 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO13;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(58)).equals("")) {
                                switch (currentRow.getCell(58).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX13 = fijarNumero(currentRow.getCell(58).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX13 = Float.parseFloat(getCellValue(currentRow.getCell(58)));
                                        fileA4076.A4076MONTAX13 = fijarNumero(fileA4076.A4076MONTAX13);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX13 = Double.parseDouble(getCellValue(currentRow.getCell(58)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX13 = Float.parseFloat(getCellValue(currentRow.getCell(58)));
                                //fileA4076.A4076MONTAX13 = fijarNumero(fileA4076.A4076MONTAX13);
                            } else {
                                fileA4076.A4076MONTAX13 = 0;
                            }
                            if (!fileA4076.A4076TAX13.equals("") && fileA4076.A4076MONTAX13 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX13 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX13.equals("") && fileA4076.A4076MONTAX13 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX13 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX14 **
                             */
                            fileA4076.A4076TAX14 = getCellValue(currentRow.getCell(59));
                            if (!fileA4076.A4076TAX14.equals("")) {
                                if (fileA4076.A4076TAX14.length() > 3 || fileA4076.A4076TAX14.length() < 2) {
                                    result = "THE TAX14 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX14;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO14 = getCellValue(currentRow.getCell(60));
                            if (!fileA4076.A4076ATO14.equals("")) {
                                if (fileA4076.A4076ATO14.length() != 3) {
                                    result = "THE ATO14 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO14;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(61)).equals("")) {
                                switch (currentRow.getCell(61).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX14 = fijarNumero(currentRow.getCell(61).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX14 = Float.parseFloat(getCellValue(currentRow.getCell(61)));
                                        fileA4076.A4076MONTAX14 = fijarNumero(fileA4076.A4076MONTAX14);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX14 = Double.parseDouble(getCellValue(currentRow.getCell(61)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX14 = Float.parseFloat(getCellValue(currentRow.getCell(61)));
                                //fileA4076.A4076MONTAX14 = fijarNumero(fileA4076.A4076MONTAX14);
                            } else {
                                fileA4076.A4076MONTAX14 = 0;
                            }

                            if (!fileA4076.A4076TAX14.equals("") && fileA4076.A4076MONTAX14 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX10 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX14.equals("") && fileA4076.A4076MONTAX14 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX10 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX15 **
                             */
                            fileA4076.A4076TAX15 = getCellValue(currentRow.getCell(62));
                            if (!fileA4076.A4076TAX15.equals("")) {
                                if (fileA4076.A4076TAX15.length() > 3 || fileA4076.A4076TAX15.length() < 2) {
                                    result = "THE TAX15 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX15;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO15 = getCellValue(currentRow.getCell(63));
                            if (!fileA4076.A4076ATO15.equals("")) {
                                if (fileA4076.A4076ATO15.length() != 3) {
                                    result = "THE ATO15 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO15;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(64)).equals("")) {
                                switch (currentRow.getCell(64).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX15 = fijarNumero(currentRow.getCell(64).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX15 = Float.parseFloat(getCellValue(currentRow.getCell(64)));
                                        fileA4076.A4076MONTAX15 = fijarNumero(fileA4076.A4076MONTAX15);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX15 = Double.parseDouble(getCellValue(currentRow.getCell(64)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX15 = Float.parseFloat(getCellValue(currentRow.getCell(64)));
                                //fileA4076.A4076MONTAX15 = fijarNumero(fileA4076.A4076MONTAX15);
                            } else {
                                fileA4076.A4076MONTAX15 = 0;
                            }
                            if (!fileA4076.A4076TAX15.equals("") && fileA4076.A4076MONTAX15 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX15 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX15.equals("") && fileA4076.A4076MONTAX15 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX15 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX16 **
                             */
                            fileA4076.A4076TAX16 = getCellValue(currentRow.getCell(65));
                            if (!fileA4076.A4076TAX16.equals("")) {
                                if (fileA4076.A4076TAX16.length() > 3 || fileA4076.A4076TAX16.length() < 2) {
                                    result = "THE TAX16 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX16;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO16 = getCellValue(currentRow.getCell(66));
                            if (!fileA4076.A4076ATO16.equals("")) {
                                if (fileA4076.A4076ATO16.length() != 3) {
                                    result = "THE ATO16 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO16;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(67)).equals("")) {
                                switch (currentRow.getCell(67).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX16 = fijarNumero(currentRow.getCell(67).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX16 = Float.parseFloat(getCellValue(currentRow.getCell(67)));
                                        fileA4076.A4076MONTAX16 = fijarNumero(fileA4076.A4076MONTAX16);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX16 = Double.parseDouble(getCellValue(currentRow.getCell(67)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX16 = Float.parseFloat(getCellValue(currentRow.getCell(67)));
                                // fileA4076.A4076MONTAX16 = fijarNumero(fileA4076.A4076MONTAX16);
                            } else {
                                fileA4076.A4076MONTAX16 = 0;
                            }

                            if (!fileA4076.A4076TAX16.equals("") && fileA4076.A4076MONTAX16 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX16 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX16.equals("") && fileA4076.A4076MONTAX16 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX16 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }

                            /**
                             * **TAX17 **
                             */
                            fileA4076.A4076TAX17 = getCellValue(currentRow.getCell(68));
                            if (!fileA4076.A4076TAX17.equals("")) {
                                if (fileA4076.A4076TAX17.length() > 3 || fileA4076.A4076TAX17.length() < 2) {
                                    result = "THE TAX17 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX17;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO17 = getCellValue(currentRow.getCell(69));
                            if (!fileA4076.A4076ATO17.equals("")) {
                                if (fileA4076.A4076ATO17.length() != 3) {
                                    result = "THE ATO17 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO17;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(70)).equals("")) {
                                switch (currentRow.getCell(70).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX17 = fijarNumero(currentRow.getCell(70).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX17 = Float.parseFloat(getCellValue(currentRow.getCell(70)));
                                        fileA4076.A4076MONTAX17 = fijarNumero(fileA4076.A4076MONTAX17);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX17 = Double.parseDouble(getCellValue(currentRow.getCell(70)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX17 = Float.parseFloat(getCellValue(currentRow.getCell(70)));
                                //fileA4076.A4076MONTAX17 = fijarNumero(fileA4076.A4076MONTAX17);
                            } else {
                                fileA4076.A4076MONTAX17 = 0;
                            }
                            if (!fileA4076.A4076TAX17.equals("") && fileA4076.A4076MONTAX17 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX17 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX17.equals("") && fileA4076.A4076MONTAX17 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX10 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }
                            /**
                             * **TAX18 **
                             */
                            fileA4076.A4076TAX18 = getCellValue(currentRow.getCell(71));
                            if (!fileA4076.A4076TAX18.equals("")) {
                                if (fileA4076.A4076TAX18.length() > 3 || fileA4076.A4076TAX18.length() < 2) {
                                    result = "THE TAX18 MUST BE 2 CHARACTERES  " + fileA4076.A4076TAX18;
                                    break;
                                }
                            }
                            fileA4076.A4076ATO18 = getCellValue(currentRow.getCell(72));
                            if (!fileA4076.A4076ATO18.equals("")) {
                                if (fileA4076.A4076ATO18.length() != 3) {
                                    result = "THE ATO18 MUST BE 3 CHARACTERES  " + fileA4076.A4076ATO18;
                                    break;
                                }
                            }
                            if (!getCellValue(currentRow.getCell(73)).equals("")) {
                                switch (currentRow.getCell(73).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076MONTAX18 = fijarNumero(currentRow.getCell(73).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076MONTAX18 = Float.parseFloat(getCellValue(currentRow.getCell(73)));
                                        fileA4076.A4076MONTAX18 = fijarNumero(fileA4076.A4076MONTAX18);
                                        break;
                                    default:
                                        fileA4076.A4076MONTAX18 = Double.parseDouble(getCellValue(currentRow.getCell(73)));
                                        break;
                                }
                                //fileA4076.A4076MONTAX18 = Float.parseFloat(getCellValue(currentRow.getCell(73)));
                                //fileA4076.A4076MONTAX18 = fijarNumero(fileA4076.A4076MONTAX18);
                            } else {
                                fileA4076.A4076MONTAX18 = 0;
                            }
                            if (!fileA4076.A4076TAX18.equals("") && fileA4076.A4076MONTAX18 == 0) {
                                result = "IT IS REPORTING CURRENCY IN TAX18 AND IT IS NOT REPORTING THE AMOUNT " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (fileA4076.A4076TAX18.equals("") && fileA4076.A4076MONTAX18 != 0) {
                                result = "IT IS REPORTING AMOUNT IN TAX18 AND IT IS NOT REPORTING THE CURRENCY " + fileA4076.A4076TICKET;
                                break;
                            }

                            if (!getCellValue(currentRow.getCell(74)).equals("")) {
                                if (currentRow.getCell(74).getCellType() == Cell.CELL_TYPE_FORMULA) {
                                    switch (currentRow.getCell(74).getCachedFormulaResultType()) {
                                        case Cell.CELL_TYPE_NUMERIC:
                                            fileA4076.A4076NETO = fijarNumero(currentRow.getCell(74).getNumericCellValue());
                                            break;
                                        case Cell.CELL_TYPE_STRING:
                                            fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(74)));
                                            fileA4076.A4076NETO = fijarNumero(fileA4076.A4076NETO);
                                            break;
                                        default:
                                            fileA4076.A4076NETO = Double.parseDouble(getCellValue(currentRow.getCell(74)));
                                            break;
                                    }

                                } else {
                                    fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(74)));
                                    fileA4076.A4076NETO = fijarNumero(fileA4076.A4076NETO);
                                }
                                //fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(74)));
                                //fileA4076.A4076NETO = fijarNumero(fileA4076.A4076NETO);
                            } else {
                                fileA4076.A4076NETO = 0;
                            }
                            if (!getCellValue(currentRow.getCell(75)).equals("")) {
                                fileA4076.A4076TCMBC = Float.parseFloat(getCellValue(currentRow.getCell(75)));
                            } else {
                                fileA4076.A4076TCMBC = 0;
                            }
                            if (!getCellValue(currentRow.getCell(76)).equals("")) {
                                switch (currentRow.getCell(76).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076COMI = fijarNumero(currentRow.getCell(76).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076COMI = Float.parseFloat(getCellValue(currentRow.getCell(76)));
                                        fileA4076.A4076COMI = fijarNumero(fileA4076.A4076COMI);
                                        break;
                                    default:
                                        fileA4076.A4076COMI = Double.parseDouble(getCellValue(currentRow.getCell(76)));
                                        break;
                                }
                                //fileA4076.A4076COMI = Float.parseFloat(getCellValue(currentRow.getCell(76)));
                                //fileA4076.A4076COMI = fijarNumero(fileA4076.A4076COMI);
                            } else {
                                fileA4076.A4076COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(77)).equals("")) {
                                fileA4076.A4076TCMBT = Float.parseFloat(getCellValue(currentRow.getCell(77)));
                            } else {
                                fileA4076.A4076TCMBT = 0;
                            }
                            if (!getCellValue(currentRow.getCell(78)).equals("")) {
                                switch (currentRow.getCell(78).getCellType()) {
                                    case Cell.CELL_TYPE_NUMERIC:
                                        fileA4076.A4076TAXCO = fijarNumero(currentRow.getCell(78).getNumericCellValue());
                                        break;
                                    case Cell.CELL_TYPE_STRING:
                                        fileA4076.A4076TAXCO = Float.parseFloat(getCellValue(currentRow.getCell(78)));
                                        fileA4076.A4076TAXCO = fijarNumero(fileA4076.A4076TAXCO);
                                        break;
                                    default:
                                        fileA4076.A4076TAXCO = Double.parseDouble(getCellValue(currentRow.getCell(78)));
                                        break;
                                }
                                //fileA4076.A4076TAXCO = Float.parseFloat(getCellValue(currentRow.getCell(78)));
                                //fileA4076.A4076TAXCO = fijarNumero(fileA4076.A4076TAXCO);
                            } else {
                                fileA4076.A4076TAXCO = 0;
                            }
                            fileA4076.A4076BASE = getCellValue(currentRow.getCell(79));
                            if (fileA4076.A4076BASE.equals("")) {
                                result = "TYPE required";
                                break;
                            }
                            if (fileA4076.A4076BASE.length() != 3) {
                                result = "THE TYPE MUST BE 4 CHARACTERES  " + fileA4076.A4076BASE;
                                break;
                            }

                            if (!df.format(fileA4076.A4076NETO).equals(df.format(fileA4076.A4076MONTCARD1 + fileA4076.A4076MONTCARD2))) {
                                result = "There is a difference between the FP and the Net" + fileA4076.A4076NETO + "-" + (fileA4076.A4076MONTCARD1 + fileA4076.A4076MONTCARD2);
                                break;
                            }

                            lstGeneral.add(fileA4076);
                        }
                    }
                } else {
                    if (cont > 1) {

                        if (currentRow.getCell(0) != null) {
                            cont1++;
                            fileA4076.A4076TICKET = getCellValue(currentRow.getCell(0));
                            if (fileA4076.A4076TICKET.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA4076.A4076TICKET.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES  " + fileA4076.A4076TICKET;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(1)).equals("")) {
                                fileA4076.A4076NETO = Float.parseFloat(getCellValue(currentRow.getCell(1)));
                                fileA4076.A4076NETO = fijarNumero(fileA4076.A4076NETO);
                            } else {
                                fileA4076.A4076NETO = 0;
                            }
                            fileA4076.A4076REFE = getCellValue(currentRow.getCell(2));
                            if (fileA4076.A4076REFE.equals("")) {
                                result = "REFERENCE required";
                                break;
                            }
                            fileA4076.A4076MDA = getCellValue(currentRow.getCell(3));
                            if (fileA4076.A4076MDA.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA4076.A4076MDA.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES  " + fileA4076.A4076MDA;
                                break;
                            }
                            fileA4076.A4076TDOC = getCellValue(currentRow.getCell(4));
                            if (fileA4076.A4076TDOC.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076TDOC.length() != 4) {
                                result = "THE TDOC MUST BE 4 CHARACTERES  " + fileA4076.A4076TDOC;
                                break;
                            }

                            fileA4076.A4076FVTA = getCellValue(currentRow.getCell(5));
                            if (fileA4076.A4076FVTA.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA4076.A4076FVTA.length() != 10) {
                                result = "THE SALE DATE MUST BE 10 CHARACTERES  " + fileA4076.A4076FVTA;
                                break;
                            }
                            fileA4076.A4076BASE = getCellValue(currentRow.getCell(6));
                            if (fileA4076.A4076BASE.equals("")) {
                                result = "TYPE required";
                                break;
                            }
                            if (fileA4076.A4076BASE.length() != 3) {
                                result = "THE TYPE MUST BE 3 CHARACTERES  " + fileA4076.A4076BASE;
                                break;
                            }
                            fileA4076.A4076AGEN = getCellValue(currentRow.getCell(7));
                            if (fileA4076.A4076AGEN.equals("")) {
                                result = "IATA required";
                                break;
                            }
                            if (fileA4076.A4076AGEN.length() != 8) {
                                result = "THE TICKET MUST BE 8 CHARACTERES  " + fileA4076.A4076AGEN;
                                break;
                            }

                            fileA4076.A4076IATA = "";
                            fileA4076.A4076TRNCO = "";
                            fileA4076.A4076CPN = "";
                            fileA4076.A4076FP1 = "";
                            fileA4076.A4076CARD1 = "";
                            fileA4076.A4076MONTCARD1 = 0.00;
                            fileA4076.A4076FP2 = "";
                            fileA4076.A4076CARD2 = "";
                            fileA4076.A4076MONTCARD2 = 0.00;
                            fileA4076.A4076MONTT = "";
                            fileA4076.A4076TARTK = 0.00;
                            fileA4076.A4076MONET = "";
                            fileA4076.A4076EQVTK = 0.00;
                            fileA4076.A4076TAX1 = "";
                            fileA4076.A4076ATO1 = "";
                            fileA4076.A4076MONTAX1 = 0.00;
                            fileA4076.A4076TAX2 = "";
                            fileA4076.A4076ATO2 = "";
                            fileA4076.A4076MONTAX2 = 0.00;
                            fileA4076.A4076TAX3 = "";
                            fileA4076.A4076ATO3 = "";
                            fileA4076.A4076MONTAX3 = 0.00;
                            fileA4076.A4076TAX4 = "";
                            fileA4076.A4076ATO4 = "";
                            fileA4076.A4076MONTAX4 = 0.00;
                            fileA4076.A4076TAX5 = "";
                            fileA4076.A4076ATO5 = "";
                            fileA4076.A4076MONTAX5 = 0.00;
                            fileA4076.A4076TAX6 = "";
                            fileA4076.A4076ATO6 = "";
                            fileA4076.A4076MONTAX6 = 0.00;
                            fileA4076.A4076TAX7 = "";
                            fileA4076.A4076ATO7 = "";
                            fileA4076.A4076MONTAX7 = 0.00;
                            fileA4076.A4076TAX8 = "";
                            fileA4076.A4076ATO8 = "";
                            fileA4076.A4076MONTAX8 = 0.00;
                            fileA4076.A4076TAX9 = "";
                            fileA4076.A4076ATO9 = "";
                            fileA4076.A4076MONTAX9 = 0.00;
                            fileA4076.A4076TAX10 = "";
                            fileA4076.A4076ATO10 = "";
                            fileA4076.A4076MONTAX10 = 0.00;
                            fileA4076.A4076TAX11 = "";
                            fileA4076.A4076ATO11 = "";
                            fileA4076.A4076MONTAX11 = 0.00;
                            fileA4076.A4076TAX12 = "";
                            fileA4076.A4076ATO12 = "";
                            fileA4076.A4076MONTAX12 = 0.00;
                            fileA4076.A4076TAX13 = "";
                            fileA4076.A4076ATO13 = "";
                            fileA4076.A4076MONTAX13 = 0.00;
                            fileA4076.A4076TAX14 = "";
                            fileA4076.A4076ATO14 = "";
                            fileA4076.A4076MONTAX14 = 0.00;
                            fileA4076.A4076TAX15 = "";
                            fileA4076.A4076ATO15 = "";
                            fileA4076.A4076MONTAX15 = 0.00;
                            fileA4076.A4076TAX16 = "";
                            fileA4076.A4076ATO16 = "";
                            fileA4076.A4076MONTAX16 = 0.00;
                            fileA4076.A4076TAX17 = "";
                            fileA4076.A4076ATO17 = "";
                            fileA4076.A4076MONTAX17 = 0.00;
                            fileA4076.A4076TAX18 = "";
                            fileA4076.A4076ATO18 = "";
                            fileA4076.A4076MONTAX18 = 0.00;
                            fileA4076.A4076TCMBC = 0.00;
                            fileA4076.A4076COMI = 0.00;
                            fileA4076.A4076TCMBT = 0.00;
                            fileA4076.A4076TAXCO = 0.00;
                            fileA4076.A4076TCARD1 = "";
                            fileA4076.A4076TCARD2 = "";
                            lstGeneral.add(fileA4076);
                        }

                    }
                }

            }
            if (result.equals("")) {
                if (!lstGeneral.isEmpty()) {
                    result = logic.subirExcel(lstGeneral);
                } else {
                    result = "The layout is incorrect  " + filename;
                }

            }

            // byte[] bytes = file.getBytes();
            // result = validar_excel(bytes, filename, filter);
            map.put("success", true);
            map.put("result", result);
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

    @RequestMapping(value = "ProcesaMantenimiento")
    public @ResponseBody
    String ProcesaMantenimiento(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A4076Filter> gridData = new ArrayList<A4076Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A4076Filter data = new A4076Filter();
                data.IN_OPTION = "1";
                data.A4076PREME = gsonObj.get("A4076PREME").getAsString();
                data.A4076ANIO = gsonObj.get("A4076ANIO").getAsString();
                data.A4076CORR = gsonObj.get("A4076CORR").getAsString();
                data.A4076BASE = gsonObj.get("A4076BASE").getAsString();;
                gridData.add(data);

            }
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaMantenimiento(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaMantenimientoStatus")
    public @ResponseBody
    String ProcesaMantenimientoStatus(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A4076Filter> gridData = new ArrayList<A4076Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A4076Filter data = new A4076Filter();
                data.IN_OPTION = "2";
                data.A4076PREME = gsonObj.get("A4076PREME").getAsString();
                data.A4076ANIO = "";
                data.A4076CORR = "0";
                data.A4076BASE = gsonObj.get("A4076BASE").getAsString();
                gridData.add(data);

            }
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaMantenimiento(gridData);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        A4076Filter filter = new A4076Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4076Filter> listaData = logic.search(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Masivos RFND");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13;
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

            CH_00.setCellValue("Folio");
            CH_01.setCellValue("System date");
            CH_02.setCellValue("Auditor");
            CH_03.setCellValue("Base");
            CH_04.setCellValue("Type");
            CH_05.setCellValue("Ticket Qty OK");
            CH_06.setCellValue("Ticket Qty Error");
            CH_07.setCellValue("total");
            CH_08.setCellValue("Ticket Amount OK");
            CH_09.setCellValue("Ticket Amount Error");
            CH_10.setCellValue("total");
            CH_11.setCellValue("Ticket BPO Qty OK");
            CH_12.setCellValue("Ticket BPO Qty Error");
            CH_13.setCellValue("total BPO");

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

                CH_00.setCellValue(listaData.get(vi).A4076PREME);
                CH_01.setCellValue(listaData.get(vi).A4076FREGI);
                CH_02.setCellValue(listaData.get(vi).A4076REGIS);
                CH_03.setCellValue(listaData.get(vi).A4076BASE);
                CH_04.setCellValue(listaData.get(vi).A4076TYPE);
                CH_05.setCellValue(listaData.get(vi).CANTOK);
                CH_06.setCellValue(listaData.get(vi).CANTKO);
                CH_07.setCellValue(listaData.get(vi).TOTALCANT);

                CH_08.setCellValue(listaData.get(vi).SUMAOK);
                CH_09.setCellValue(listaData.get(vi).SUMAKO);
                CH_10.setCellValue(listaData.get(vi).TOTALSUMA);

                CH_11.setCellValue(listaData.get(vi).BPOOK);
                CH_12.setCellValue(listaData.get(vi).BPOKO);
                CH_13.setCellValue(listaData.get(vi).TOTALBPO);

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

            String fileNameDownload = String.format("Masivos RFND - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "/getXLSX2")
    public @ResponseBody
    void getXLSX2(HttpServletRequest request, HttpServletResponse response) {
        A4076Filter filter = new A4076Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4076Filter> listaData = logic.searchDetail(filter);

            // <editor-fold defaultstate="collapsed" desc="Estilo del Excel">
            //Workbook workbook = new XSSFWorkbook();
            int limite = 300;
            SXSSFWorkbook workbook = new SXSSFWorkbook(limite);
            Sheet sheet = workbook.createSheet("Masivos RFND");
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
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18;
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
            CH_18 = row.createCell(18);

            CH_00.setCellValue("Base");
            CH_01.setCellValue("Type");
            CH_02.setCellValue("Ticket");
            CH_03.setCellValue("CPN");
            CH_04.setCellValue("System Date");
            CH_05.setCellValue("Issue Date");
            CH_06.setCellValue("Country");
            CH_07.setCellValue("IATA");
            CH_08.setCellValue("Agency");
            CH_09.setCellValue("Currency");
            CH_10.setCellValue("Transaction");
            CH_11.setCellValue("Tdoc");
            CH_12.setCellValue("Fare");
            CH_13.setCellValue("Tax");
            CH_14.setCellValue("Neto");
            CH_15.setCellValue("Status");
            CH_16.setCellValue("BPO");
            CH_17.setCellValue("Group");
            CH_18.setCellValue("IATA RFND");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));

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
            CH_18.setCellStyle(headerStyle);

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
                CH_18 = row.createCell(18);

                CH_00.setCellValue(listaData.get(vi).A4076BASE);
                CH_01.setCellValue(listaData.get(vi).A4076TYPE);
                CH_02.setCellValue(listaData.get(vi).A4076TICKET);
                CH_03.setCellValue(listaData.get(vi).A4076CPN);
                CH_04.setCellValue(listaData.get(vi).A4076FREVI);
                CH_05.setCellValue(listaData.get(vi).A4076FVTA);
                CH_06.setCellValue(listaData.get(vi).A4076PAIS);
                CH_07.setCellValue(listaData.get(vi).A4076IATA);
                CH_08.setCellValue(listaData.get(vi).A4076AGENCY);
                CH_09.setCellValue(listaData.get(vi).A4076MDA);
                CH_10.setCellValue(listaData.get(vi).A4076TRNCO);
                CH_11.setCellValue(listaData.get(vi).A4076TDOC);
                CH_12.setCellValue(listaData.get(vi).A4076TARIFA);
                CH_13.setCellValue(listaData.get(vi).A4076TTAX);
                CH_14.setCellValue(listaData.get(vi).A4076NETO);
                String vl_A4076FLAG = "";
                switch (listaData.get(vi).A4076FLAG) {
                    case "Y":
                        vl_A4076FLAG = "PENDING";
                        break;
                    case "A":
                        vl_A4076FLAG = "APPROVED";
                        break;
                    case "E":
                        vl_A4076FLAG = "SALES DATE ERROR";
                        break;
                    case "U":
                        vl_A4076FLAG = "WITH USES";
                        break;
                    case "D":
                        vl_A4076FLAG = "DUPLICATE TICKET";
                        break;
                    case "T":
                        vl_A4076FLAG = "ATO ERROR";
                        break;
                    case "B":
                        vl_A4076FLAG = "TAX ERROR";
                        break;
                    case "H":
                        vl_A4076FLAG = "HIGHER AMOUNT FOR SALE";
                        break;
                    case "M":
                        vl_A4076FLAG = "MODIFIED";
                        break;
                    case "R":
                        vl_A4076FLAG = "REJECT";
                        break;
                    case "C":
                        vl_A4076FLAG = "TICKET DOES NOT EXIST";
                        break;
                }
                CH_15.setCellValue(vl_A4076FLAG);
                String vl_A4076STAT = "";
                switch (listaData.get(vi).A4076STAT) {
                    case "Y":
                        vl_A4076STAT = "PENDING";
                        break;
                    case "E":
                        vl_A4076STAT = "ERROR BPO";
                        break;
                    case "F":
                        vl_A4076STAT = "CAPTURED BPO";
                        break;
                    case "C":
                        vl_A4076STAT = "CANC";
                        break;
                }
                CH_16.setCellValue(vl_A4076STAT);
                CH_17.setCellValue(listaData.get(vi).A4076GRUPO);
                CH_18.setCellValue(listaData.get(vi).A4076AGEN);

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
                CH_18.setCellStyle(bodyStyle);

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
            //sheet.autoSizeColumn(8, true);
            sheet.autoSizeColumn(9, true);
            sheet.autoSizeColumn(10, true);
            sheet.autoSizeColumn(11, true);
            sheet.autoSizeColumn(12, true);
            sheet.autoSizeColumn(13, true);
            sheet.autoSizeColumn(14, true);
            sheet.autoSizeColumn(15, true);
            sheet.autoSizeColumn(16, true);
            sheet.autoSizeColumn(18, true);

            String fileNameDownload = String.format("Masivos RFND - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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

    @RequestMapping(value = "searchDetail")
    public @ResponseBody
    String searchDetail(ModelMap map, HttpServletRequest request) {
        A4076Filter filter = new A4076Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A4076Filter> lst_search = logic.searchDetail(filter);

            map.put("success", true);
            map.put("data", lst_search);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaManualUATP")
    public @ResponseBody
    String ProcesaManualUATP(ModelMap map, HttpServletRequest request) {
        String result = "";
        String taxes = "";
        String fop = "";
        A4076Filter filter = new A4076Filter();
        DecimalFormat df = new DecimalFormat("#.00");
        // A4078 objlst_TAXES = null;
        //A4077 objlst_CardType = null;
        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonTaxes = parser.parse(request.getParameter("beanlstTaxes")).getAsJsonArray();
            JsonArray gsonFop = parser.parse(request.getParameter("beanlstlstFop")).getAsJsonArray();
            for (JsonElement obj : gsonTaxes) {
                JsonObject gsonObj = obj.getAsJsonObject();
                taxes = taxes + "|" + gsonObj.get("A4078CORRL").getAsString() + "$" + gsonObj.get("A4078SEQ").getAsString() + "$" + gsonObj.get("A4078CDTAX").getAsString() + "$" + gsonObj.get("A4078CDATO").getAsString() + "$" + gsonObj.get("A4078TXDIF").getAsDouble() + "$" + gsonObj.get("A4078STAT").getAsString();
            }
            //LISTA DE FOP 
            for (JsonElement obj : gsonFop) {
                JsonObject gsonObj = obj.getAsJsonObject();
                fop += fop + "|" + gsonObj.get("A4077CORRL").getAsString() + "$" + gsonObj.get("A4077SEQ").getAsString() + "$" + gsonObj.get("A4077CFOP").getAsString() + "$" + gsonObj.get("A4077TYCAR").getAsString() + "$" + gsonObj.get("A4077NTARJ").getAsString() + "$" + gsonObj.get("A4077TOTAL").getAsDouble() + "$" + gsonObj.get("A4077FLAG").getAsString();
            }

            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaManualUATP(filter, taxes, fop);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "ProcesaDelete")
    public @ResponseBody
    String ProcesaDelete(ModelMap map, HttpServletRequest request) {
        String result = "";
        A4076Filter filter = new A4076Filter();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.ProcesaDelete(filter);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    public static double fijarNumero(double numero) {
        double resultado;
        resultado = numero * Math.pow(10, 2);
        resultado = Math.round(resultado);
        resultado = resultado / Math.pow(10, 2);
        return resultado;
    }

    @RequestMapping(value = "SearchDetailError")
    public @ResponseBody
    String SearchDetailError(ModelMap map, HttpServletRequest request) {
        List<A4076Filter> lst;
        A4076Filter filter = new A4076Filter();

        try {
            logic = new MassiveRefunduatpFormLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.IN_PREME = request.getParameter("IN_PREME").trim();
            filter.IN_ANIO = request.getParameter("IN_ANIO").trim();
            filter.IN_CORR = request.getParameter("IN_CORR").trim();

            lst = logic.SearchDetailError(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("lst_Error", lst);

        return new Gson().toJson(map);
    }

}
