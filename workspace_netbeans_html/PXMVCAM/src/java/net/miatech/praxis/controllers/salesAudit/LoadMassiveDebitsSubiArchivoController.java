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
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.SaleAudit.A2552Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.LoadMassiveDebitsSubiArchivoLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import org.apache.poi.xssf.usermodel.XSSFCell;
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
@RequestMapping("/LoadMassiveDebitsForm")
public class LoadMassiveDebitsSubiArchivoController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LoadMassiveDebitsSubiArchivoLogic logic;

    @RequestMapping(value = "insertTracingFile", method = RequestMethod.POST)
    public @ResponseBody
    String insertTracingFile(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        A2552Filter filter = new A2552Filter();
        ArrayList<A2552Filter> lstGeneral = new ArrayList<A2552Filter>(0);
        A2552Filter fileA2552;
        String result = "";
        int i = 0;
        Integer cont = 0;
        Integer cont1 = 0;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());

            String filename = excelfile.getOriginalFilename();
            //Creates a workbook object from the uploaded excelfile
            // HSSFWorkbook workbook = new HSSFWorkbook(excelfile.getInputStream());
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            HSSFCell cell;
            while (iterator.hasNext()) {
                fileA2552 = new A2552Filter();
                cont++;
                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                if (cont > 1) {
                    if (currentRow.getCell(0) != null) {
                        cont1++;
                        fileA2552.A2552CCUST = "139";
                        fileA2552.A2552BASE = filter.IN_TYPE;
                        fileA2552.A2552AREA = filter.IN_AREA;
                        if (fileA2552.A2552BASE.equals("GR") || fileA2552.A2552BASE.equals("FR")) {
                            fileA2552.A2552TRNCU = getCellValue(currentRow.getCell(0));
                            if (fileA2552.A2552TRNCU.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA2552.A2552TRNCU.length() != 4) {
                                result = "THE Transaction MUST BE 4 CHARACTERES  " + fileA2552.A2552TRNCU;
                                break;
                            }

                            fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(1));
                            if (fileA2552.A2552TRNCO.equals("")) {
                                result = "Type required";
                                break;
                            }
                            if (fileA2552.A2552TRNCO.length() != 3) {
                                result = "THE Type MUST BE 3 CHARACTERES  " + fileA2552.A2552TRNCO;
                                break;
                            }
                            fileA2552.A2552NMEMO = getCellValue(currentRow.getCell(2));
                            fileA2552.A2552FUENT = getCellValue(currentRow.getCell(3));
                            if (fileA2552.A2552FUENT.equals("")) {
                                result = "Source required";
                                break;
                            }
                            fileA2552.A2552SFUEN = getCellValue(currentRow.getCell(4));
                            fileA2552.A2552IATA = getCellValue(currentRow.getCell(5));
                            if (fileA2552.A2552IATA.equals("")) {
                                result = "IATA required";
                                break;
                            }
                            if (fileA2552.A2552IATA.length() != 8) {
                                result = "THE IATA MUST BE 8 CHARACTERES " + fileA2552.A2552IATA;
                                break;
                            }
                            fileA2552.A2552TKT = getCellValue(currentRow.getCell(6));
                            if (fileA2552.A2552TKT.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA2552.A2552TKT.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES CIA-FORMA-SERIE " + fileA2552.A2552TKT;
                                break;
                            }
                            fileA2552.A2552ITINE = getCellValue(currentRow.getCell(7));
                            fileA2552.A2552FBRI1 = getCellValue(currentRow.getCell(8));
                            fileA2552.A2552CODIT = getCellValue(currentRow.getCell(9));
                            fileA2552.A2552PAX = getCellValue(currentRow.getCell(10));
                            fileA2552.A2552TPAX = getCellValue(currentRow.getCell(11));
                            fileA2552.A2552CTA = getCellValue(currentRow.getCell(12));
                            fileA2552.A2552TITU = getCellValue(currentRow.getCell(13));
                            if (!fileA2552.A2552TITU.equals("")) {
                                if (fileA2552.A2552TITU.length() > 50) {
                                    result = "THE TITULO MUST BE 50 CHARACTERES CIA-FORMA-SERIE " + fileA2552.A2552TKT;
                                    break;
                                }
                            }
                            fileA2552.A2552CODRAZON = getCellValue(currentRow.getCell(14));
                            if (fileA2552.A2552CODRAZON.equals("")) {
                                result = "You must enter a reason code required";
                                break;
                            }
                            fileA2552.A2552PERIODO = getCellValue(currentRow.getCell(15));
                            fileA2552.A2552RAZONLIB = getCellValue(currentRow.getCell(16));
                            if (!fileA2552.A2552RAZONLIB.equals("")) {
                                if (fileA2552.A2552RAZONLIB.length() > 135) {
                                    result = "You must enter a reason 135 CHARACTERES" + fileA2552.A2552TKT;
                                    break;
                                }
                            }
                            fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(17));
                            if (fileA2552.A2552PAVTA.equals("")) {
                                result = "Country required";
                                break;
                            }
                            if (fileA2552.A2552PAVTA.length() != 2) {
                                result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                break;
                            }
                            fileA2552.A2552FCVTA = getCellValue(currentRow.getCell(18));
                            if (!fileA2552.A2552FCVTA.equals("")) {
                                if (fileA2552.A2552FCVTA.length() != 8) {
                                    result = "THE Sale date MUST BE 8 CHARACTERES" + fileA2552.A2552FCVTA;
                                    break;

                                }
                            }
                            fileA2552.A2552TTARJ = getCellValue(currentRow.getCell(19));
                            if (fileA2552.A2552TTARJ.length() > 2) {
                                result = "THE TTARJ MUST BE 2 CHARACTERES";
                                break;
                            }
                            fileA2552.A2552NREF = getCellValue(currentRow.getCell(20));
                            if (fileA2552.A2552NREF.length() > 19) {
                                result = "THE NUMBER CARD MUST BE 19 CHARACTERES";
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(21)).equals("")) {
                                fileA2552.A2552TCAMBIO = Float.parseFloat(getCellValue(currentRow.getCell(21)));
                            } else {
                                fileA2552.A2552TCAMBIO = 0;
                            }
                            fileA2552.A2552CUR = getCellValue(currentRow.getCell(22));
                            if (fileA2552.A2552CUR.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA2552.A2552CUR.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES" + fileA2552.A2552CUR;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(23)).equals("")) {
                                fileA2552.A2552TARIF = Float.parseFloat(getCellValue(currentRow.getCell(23)));
                            } else {
                                fileA2552.A2552TARIF = 0;
                            }
                            if (!getCellValue(currentRow.getCell(24)).equals("")) {
                                fileA2552.A2552TAX = Float.parseFloat(getCellValue(currentRow.getCell(24)));
                            } else {
                                fileA2552.A2552TAX = 0;
                            }
                            if (!getCellValue(currentRow.getCell(25)).equals("")) {
                                fileA2552.A2552COMI = Float.parseFloat(getCellValue(currentRow.getCell(25)));
                            } else {
                                fileA2552.A2552COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(26)).equals("")) {
                                fileA2552.A2552SCMII = Float.parseFloat(getCellValue(currentRow.getCell(26)));
                            } else {
                                fileA2552.A2552SCMII = 0;
                            }
                            if (!getCellValue(currentRow.getCell(27)).equals("")) {
                                fileA2552.A2552TAXCM = Float.parseFloat(getCellValue(currentRow.getCell(27)));
                            } else {
                                fileA2552.A2552TAXCM = 0;
                            }

                            if ((fileA2552.A2552TARIF + fileA2552.A2552TAX + fileA2552.A2552COMI + fileA2552.A2552SCMII + fileA2552.A2552TAXCM) == 0) {
                                result = "Amount must be greater or less than zero";
                                break;
                            }
                            /**
                             * **TAX1 **
                             */
                            fileA2552.A2552CODTAX1 = getCellValue(currentRow.getCell(28));
                            if (!getCellValue(currentRow.getCell(29)).equals("")) {
                                fileA2552.A2552TAX1 = Float.parseFloat(getCellValue(currentRow.getCell(29)));
                            } else {
                                fileA2552.A2552TAX1 = 0;
                            }

                            /**
                             * **TAX2 **
                             */
                            fileA2552.A2552CODTAX2 = getCellValue(currentRow.getCell(30));
                            if (!getCellValue(currentRow.getCell(31)).equals("")) {
                                fileA2552.A2552TAX2 = Float.parseFloat(getCellValue(currentRow.getCell(31)));
                            } else {
                                fileA2552.A2552TAX2 = 0;
                            }
                            /**
                             * **TAX3 **
                             */
                            fileA2552.A2552CODTAX3 = getCellValue(currentRow.getCell(32));
                            if (!getCellValue(currentRow.getCell(33)).equals("")) {
                                fileA2552.A2552TAX3 = Float.parseFloat(getCellValue(currentRow.getCell(33)));
                            } else {
                                fileA2552.A2552TAX3 = 0;
                            }
                            /**
                             * **TAX4 **
                             */
                            fileA2552.A2552CODTAX4 = getCellValue(currentRow.getCell(34));
                            if (!getCellValue(currentRow.getCell(35)).equals("")) {
                                fileA2552.A2552TAX4 = Float.parseFloat(getCellValue(currentRow.getCell(35)));
                            } else {
                                fileA2552.A2552TAX4 = 0;
                            }
                            /**
                             * **TAX5 **
                             */
                            fileA2552.A2552CODTAX5 = getCellValue(currentRow.getCell(36));
                            if (!getCellValue(currentRow.getCell(37)).equals("")) {
                                fileA2552.A2552TAX5 = Float.parseFloat(getCellValue(currentRow.getCell(37)));
                            } else {
                                fileA2552.A2552TAX5 = 0;
                            }
                            /**
                             * **TAX6 **
                             */
                            fileA2552.A2552CODTAX6 = getCellValue(currentRow.getCell(38));
                            if (!getCellValue(currentRow.getCell(39)).equals("")) {
                                fileA2552.A2552TAX6 = Float.parseFloat(getCellValue(currentRow.getCell(39)));
                            } else {
                                fileA2552.A2552TAX6 = 0;
                            }
                            /**
                             * **TAX7 **
                             */
                            fileA2552.A2552CODTAX7 = getCellValue(currentRow.getCell(40));
                            if (!getCellValue(currentRow.getCell(41)).equals("")) {
                                fileA2552.A2552TAX7 = Float.parseFloat(getCellValue(currentRow.getCell(41)));
                            } else {
                                fileA2552.A2552TAX7 = 0;
                            }
                            /**
                             * **TAX8 **
                             */
                            fileA2552.A2552CODTAX8 = getCellValue(currentRow.getCell(42));
                            if (!getCellValue(currentRow.getCell(43)).equals("")) {
                                fileA2552.A2552TAX8 = Float.parseFloat(getCellValue(currentRow.getCell(43)));
                            } else {
                                fileA2552.A2552TAX8 = 0;
                            }
                            /**
                             * **TAX9 **
                             */
                            fileA2552.A2552CODTAX9 = getCellValue(currentRow.getCell(44));
                            if (!getCellValue(currentRow.getCell(45)).equals("")) {
                                fileA2552.A2552TAX9 = Float.parseFloat(getCellValue(currentRow.getCell(45)));
                            } else {
                                fileA2552.A2552TAX9 = 0;
                            }
                            /**
                             * **TAX10 **
                             */
                            fileA2552.A2552CODTAX10 = getCellValue(currentRow.getCell(46));
                            if (!getCellValue(currentRow.getCell(47)).equals("")) {
                                fileA2552.A2552TAX10 = Float.parseFloat(getCellValue(currentRow.getCell(47)));
                            } else {
                                fileA2552.A2552TAX10 = 0;
                            }
                            /**
                             * **TAX11 **
                             */
                            fileA2552.A2552CODTAX11 = getCellValue(currentRow.getCell(48));
                            if (!getCellValue(currentRow.getCell(49)).equals("")) {
                                fileA2552.A2552TAX11 = Float.parseFloat(getCellValue(currentRow.getCell(49)));
                            } else {
                                fileA2552.A2552TAX11 = 0;
                            }
                            /**
                             * **TAX12 **
                             */
                            fileA2552.A2552CODTAX12 = getCellValue(currentRow.getCell(50));
                            if (!getCellValue(currentRow.getCell(51)).equals("")) {
                                fileA2552.A2552TAX12 = Float.parseFloat(getCellValue(currentRow.getCell(51)));
                            } else {
                                fileA2552.A2552TAX12 = 0;
                            }
                            /**
                             * **TAX13 **
                             */
                            fileA2552.A2552CODTAX13 = getCellValue(currentRow.getCell(52));
                            if (!getCellValue(currentRow.getCell(53)).equals("")) {
                                fileA2552.A2552TAX13 = Float.parseFloat(getCellValue(currentRow.getCell(53)));
                            } else {
                                fileA2552.A2552TAX13 = 0;
                            }
                            /**
                             * **TAX14 **
                             */
                            fileA2552.A2552CODTAX14 = getCellValue(currentRow.getCell(54));
                            if (!getCellValue(currentRow.getCell(55)).equals("")) {
                                fileA2552.A2552TAX14 = Float.parseFloat(getCellValue(currentRow.getCell(55)));
                            } else {
                                fileA2552.A2552TAX14 = 0;
                            }
                            /**
                             * **TAX15 **
                             */
                            fileA2552.A2552CODTAX15 = getCellValue(currentRow.getCell(56));
                            if (!getCellValue(currentRow.getCell(57)).equals("")) {
                                fileA2552.A2552TAX15 = Float.parseFloat(getCellValue(currentRow.getCell(57)));
                            } else {
                                fileA2552.A2552TAX15 = 0;
                            }
                            /**
                             * **TAX16 **
                             */
                            fileA2552.A2552CODTAX16 = getCellValue(currentRow.getCell(58));
                            if (!getCellValue(currentRow.getCell(59)).equals("")) {
                                fileA2552.A2552TAX16 = Float.parseFloat(getCellValue(currentRow.getCell(59)));
                            } else {
                                fileA2552.A2552TAX16 = 0;
                            }
                            /**
                             * **TAX17 **
                             */
                            fileA2552.A2552CODTAX17 = getCellValue(currentRow.getCell(60));
                            if (!getCellValue(currentRow.getCell(61)).equals("")) {
                                fileA2552.A2552TAX17 = Float.parseFloat(getCellValue(currentRow.getCell(61)));
                            } else {
                                fileA2552.A2552TAX17 = 0;
                            }
                            /**
                             * **TAX18 **
                             */
                            fileA2552.A2552CODTAX18 = getCellValue(currentRow.getCell(62));
                            if (!getCellValue(currentRow.getCell(63)).equals("")) {
                                fileA2552.A2552TAX18 = Float.parseFloat(getCellValue(currentRow.getCell(63)));
                            } else {
                                fileA2552.A2552TAX18 = 0;
                            }
                            /**
                             * **TAX19 **
                             */
                            fileA2552.A2552CODTAX19 = getCellValue(currentRow.getCell(64));
                            if (!getCellValue(currentRow.getCell(65)).equals("")) {
                                fileA2552.A2552TAX19 = Float.parseFloat(getCellValue(currentRow.getCell(65)));
                            } else {
                                fileA2552.A2552TAX19 = 0;
                            }
                            /**
                             * **TAX20 **
                             */
                            fileA2552.A2552CODTAX20 = getCellValue(currentRow.getCell(66));
                            if (!getCellValue(currentRow.getCell(67)).equals("")) {
                                fileA2552.A2552TAX20 = Float.parseFloat(getCellValue(currentRow.getCell(67)));
                            } else {
                                fileA2552.A2552TAX20 = 0;
                            }

                            fileA2552.A2552PROVI = 0;
                            fileA2552.A2552PROVIDES = "";
                            fileA2552.A2552PROVI2 = 0;
                            fileA2552.A2552PROVIDES2 = "";
                            fileA2552.A2552PROVI3 = 0;
                            fileA2552.A2552PROVIDES3 = "";
                            fileA2552.A2552UBICA = "";
                            
                            DecimalFormat df = new DecimalFormat("#.00");
                            if (df.format(fileA2552.A2552TAX1 + fileA2552.A2552TAX2 + fileA2552.A2552TAX3 + fileA2552.A2552TAX4 + fileA2552.A2552TAX5 + fileA2552.A2552TAX6 + fileA2552.A2552TAX7 + fileA2552.A2552TAX8 + fileA2552.A2552TAX9 + fileA2552.A2552TAX10 + fileA2552.A2552TAX11 + fileA2552.A2552TAX12 + fileA2552.A2552TAX13 + fileA2552.A2552TAX14 + fileA2552.A2552TAX15 + fileA2552.A2552TAX16 + fileA2552.A2552TAX17 + fileA2552.A2552TAX18 + fileA2552.A2552TAX19 + fileA2552.A2552TAX20) == null ? df.format(fileA2552.A2552TAX) != null : !df.format(fileA2552.A2552TAX1 + fileA2552.A2552TAX2 + fileA2552.A2552TAX3 + fileA2552.A2552TAX4 + fileA2552.A2552TAX5 + fileA2552.A2552TAX6 + fileA2552.A2552TAX7 + fileA2552.A2552TAX8 + fileA2552.A2552TAX9 + fileA2552.A2552TAX10 + fileA2552.A2552TAX11 + fileA2552.A2552TAX12 + fileA2552.A2552TAX13 + fileA2552.A2552TAX14 + fileA2552.A2552TAX15 + fileA2552.A2552TAX16 + fileA2552.A2552TAX17 + fileA2552.A2552TAX18 + fileA2552.A2552TAX19 + fileA2552.A2552TAX20).equals(df.format(fileA2552.A2552TAX))) {
                                result = "The amount of the taxes does not fit the detail";
                                break;
                            }

                        } else if (fileA2552.A2552BASE.equals("FA") || fileA2552.A2552BASE.equals("FC") || fileA2552.A2552BASE.equals("MP") || fileA2552.A2552BASE.equals("CA") || fileA2552.A2552BASE.equals("BK")) {
                            if (fileA2552.A2552BASE.equals("CA")) {
                                fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(0));
                                if (fileA2552.A2552TRNCO.equals("")) {
                                    result = "Transaction required TRNCO";
                                    break;
                                }
                                if (fileA2552.A2552TRNCO.length() != 3) {
                                    result = "THE Transaction MUST BE 3 CHARACTERES" + fileA2552.A2552TRNCO;
                                    break;
                                }
                                fileA2552.A2552NMEMO = getCellValue(currentRow.getCell(1));
                                if (fileA2552.A2552NMEMO.equals("")) {
                                    result = "NMEMO required";
                                    break;
                                }
                                if (fileA2552.A2552NMEMO.length() != 10) {
                                    result = "THE DEBITO MUST BE 10 CHARACTERES" + fileA2552.A2552NMEMO;
                                    break;
                                }
                                fileA2552.A2552IATA = getCellValue(currentRow.getCell(2));
                                if (fileA2552.A2552IATA.equals("")) {
                                    result = "Iata required";
                                    break;
                                }
                                if (fileA2552.A2552IATA.length() != 8) {
                                    result = "THE IATA MUST BE 8 CHARACTERES" + fileA2552.A2552IATA;
                                    break;
                                }
                                fileA2552.A2552FUENT = getCellValue(currentRow.getCell(3));
                                if (fileA2552.A2552FUENT.equals("")) {
                                    result = "Fuente required FUENT";
                                    break;
                                }
                                if (fileA2552.A2552FUENT.length() != 3) {
                                    result = "THE SOURCE MUST BE 3 CHARACTERES" + fileA2552.A2552FUENT;
                                    break;
                                }
                                fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(4));
                                if (fileA2552.A2552PAVTA.equals("")) {
                                    result = "Country required PAVTA";
                                    break;
                                }
                                if (fileA2552.A2552PAVTA.length() != 2) {
                                    result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                    break;
                                }
                                fileA2552.A2552CODRAZON = getCellValue(currentRow.getCell(5));
                                if (fileA2552.A2552CODRAZON.equals("")) {
                                    result = "Codigo de Razon required";
                                    break;
                                }
                                if (fileA2552.A2552CODRAZON.length() != 5) {
                                    result = "THE codigo de razon MUST BE 5 CHARACTERES" + fileA2552.A2552CODRAZON;
                                    break;
                                }
                                fileA2552.A2552RAZONLIB = getCellValue(currentRow.getCell(6));
                                fileA2552.A2552TRNCU = getCellValue(currentRow.getCell(7));
                                if (fileA2552.A2552TRNCU.equals("")) {
                                    result = "Transaction required TRNCU";
                                    break;
                                }
                                if (fileA2552.A2552TRNCU.length() != 4) {
                                    result = "THE Transaction MUST BE 4 CHARACTERES" + fileA2552.A2552TRNCU;
                                    break;
                                }
                            } else {
                                fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(1));
                                if (fileA2552.A2552TRNCO.equals("")) {
                                    result = "Transaction required";
                                    break;
                                }
                                if (fileA2552.A2552TRNCO.length() != 3) {
                                    result = "THE Transaction MUST BE 3 CHARACTERES" + fileA2552.A2552TRNCO;
                                    break;
                                }
                                fileA2552.A2552NMEMO = getCellValue(currentRow.getCell(2));
                                fileA2552.A2552PERIODO = getCellValue(currentRow.getCell(3));
                                if (fileA2552.A2552PERIODO.equals("")) {
                                    result = "PERIOD required";
                                    break;
                                }
                                fileA2552.A2552IATA = getCellValue(currentRow.getCell(4));
                                if (fileA2552.A2552IATA.equals("")) {
                                    result = "Iata required";
                                    break;
                                }
                                if (fileA2552.A2552IATA.length() != 8) {
                                    result = "THE IATA MUST BE 8 CHARACTERES" + fileA2552.A2552IATA;
                                    break;
                                }
                                fileA2552.A2552PAX = getCellValue(currentRow.getCell(5));
                                fileA2552.A2552FUENT = getCellValue(currentRow.getCell(6));
                                if (fileA2552.A2552FUENT.equals("")) {
                                    result = "Fuente required";
                                    break;
                                }
                                if (fileA2552.A2552FUENT.length() != 3) {
                                    result = "THE SOURCE MUST BE 3 CHARACTERES" + fileA2552.A2552FUENT;
                                    break;
                                }
                                fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(7));
                                if (fileA2552.A2552PAVTA.equals("")) {
                                    result = "Country required";
                                    break;
                                }
                                if (fileA2552.A2552PAVTA.length() != 2) {
                                    result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                    break;
                                }
                                fileA2552.A2552CUR = getCellValue(currentRow.getCell(8));
                                if (fileA2552.A2552CUR.equals("")) {
                                    result = "Currency required";
                                    break;
                                }
                                if (fileA2552.A2552CUR.length() != 3) {
                                    result = "THE Currency MUST BE 3 CHARACTERES" + fileA2552.A2552CUR;
                                    break;
                                }
                                if (!getCellValue(currentRow.getCell(9)).equals("")) {
                                    fileA2552.A2552TARIF = Float.parseFloat(getCellValue(currentRow.getCell(9)));
                                } else {
                                    fileA2552.A2552TARIF = 0;
                                }
                                if (!getCellValue(currentRow.getCell(10)).equals("")) {
                                    fileA2552.A2552IVA = Float.parseFloat(getCellValue(currentRow.getCell(10)));
                                } else {
                                    fileA2552.A2552IVA = 0;
                                }
                                if (!getCellValue(currentRow.getCell(11)).equals("")) {
                                    fileA2552.A2552COMI = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                                } else {
                                    fileA2552.A2552COMI = 0;
                                }
                                if (!getCellValue(currentRow.getCell(12)).equals("")) {
                                    fileA2552.A2552TAXCM = Float.parseFloat(getCellValue(currentRow.getCell(12)));
                                } else {
                                    fileA2552.A2552TAXCM = 0;
                                }

                                fileA2552.A2552PROVI = 0;
                                fileA2552.A2552PROVIDES = "";
                                fileA2552.A2552PROVI2 = 0;
                                fileA2552.A2552PROVIDES2 = "";
                                fileA2552.A2552PROVI3 = 0;
                                fileA2552.A2552PROVIDES3 = "";
                                fileA2552.A2552PROVI4 = 0;

                                if ((fileA2552.A2552TARIF + fileA2552.A2552IVA + fileA2552.A2552COMI + fileA2552.A2552TAXCM) == 0) {
                                    result = "Amount must be greater or less than zero";
                                    break;
                                }

                                fileA2552.A2552TRNCU = "SALE";

                                fileA2552.A2552TKT = fileA2552.A2552CCUST + "1111111111";

                            }

                            if (fileA2552.A2552BASE.equals("FC")) {
                                fileA2552.A2552CTA = "02000000000000113111519000000";
                                fileA2552.A2552TITU = "REGULARES BSP MEXICO";
                                fileA2552.A2552CODRAZON = "FA078";
                                fileA2552.A2552RAZONLIB = "PARA SU DISPUTA FAVOR DE ANEXAR CFDI EN FORMATO PDF Y XML";
                            } else if (fileA2552.A2552BASE.equals("FA")) {
                                fileA2552.A2552CTA = "02000000000000113111519000000";
                                fileA2552.A2552TITU = "REGULARES BSP MEXICO";
                                fileA2552.A2552CODRAZON = "FA093";
                                fileA2552.A2552RAZONLIB = "PARA SU DISPUTA FAVOR DE ANEXAR CFDI EN FORMATO PDF Y XML POR LOS IMPORTES DEL ADM";
                            } else if (fileA2552.A2552BASE.equals("MP")) {
                                fileA2552.A2552CTA = "02016100011MEX451744001000000";
                                fileA2552.A2552TITU = "CARGO POR POLITICA RESERVA";
                                fileA2552.A2552CODRAZON = "CP006";
                                fileA2552.A2552RAZONLIB = "UN MES PARA ACLARACION CON SU EJECUTIVO DE VENTAS Y/O GERENTE DISTRITAL";
                            } else if (fileA2552.A2552BASE.equals("CA")) {
                                fileA2552.A2552PERIODO = "";
                                fileA2552.A2552CUR = "";
                                fileA2552.A2552TARIF = 0;
                                fileA2552.A2552IVA = 0;
                                fileA2552.A2552COMI = 0;
                                fileA2552.A2552TAXCM = 0;
                                fileA2552.A2552PROVI = 0;
                                fileA2552.A2552PROVIDES = "";
                                fileA2552.A2552PROVI2 = 0;
                                fileA2552.A2552PROVIDES2 = "";
                                fileA2552.A2552PROVI3 = 0;
                                fileA2552.A2552PROVI4 = 0;
                                fileA2552.A2552PROVIDES3 = "";
                                fileA2552.A2552TKT = "";
                                fileA2552.A2552CTA = "";
                                fileA2552.A2552TITU = "";

                            } else if (fileA2552.A2552BASE.equals("BK")) {
                                fileA2552.A2552PERIODO = fileA2552.A2552PERIODO.trim();
                                String[] parts = fileA2552.A2552PERIODO.split(",");
                                fileA2552.A2552CODRAZON = parts[0];
                                fileA2552.A2552PERIODO = parts[1];

                                if (!getCellValue(currentRow.getCell(14)).equals("")) {
                                    fileA2552.A2552PROVI = Float.parseFloat(getCellValue(currentRow.getCell(14)));
                                } else {
                                    fileA2552.A2552PROVI = 0;
                                }
                                fileA2552.A2552PROVIDES = getCellValue(currentRow.getCell(15));
                                if (!getCellValue(currentRow.getCell(16)).equals("")) {
                                    fileA2552.A2552PROVI2 = Float.parseFloat(getCellValue(currentRow.getCell(16)));
                                } else {
                                    fileA2552.A2552PROVI2 = 0;
                                }
                                fileA2552.A2552PROVIDES2 = getCellValue(currentRow.getCell(17));
                                if (!getCellValue(currentRow.getCell(18)).equals("")) {
                                    fileA2552.A2552PROVI3 = Float.parseFloat(getCellValue(currentRow.getCell(18)));
                                } else {
                                    fileA2552.A2552PROVI3 = 0;
                                }
                                fileA2552.A2552PROVIDES3 = getCellValue(currentRow.getCell(19));
                                if (!getCellValue(currentRow.getCell(20)).equals("")) {
                                    fileA2552.A2552PROVI4 = Float.parseFloat(getCellValue(currentRow.getCell(20)));
                                } else {
                                    fileA2552.A2552PROVI4 = 0;
                                }
                                
                                fileA2552.A2552CTA = "";
                                fileA2552.A2552TITU = "";
                                fileA2552.A2552RAZONLIB = "";
                            }

                            fileA2552.A2552SFUEN = "";
                            fileA2552.A2552ITINE = "";
                            fileA2552.A2552FBRI1 = "";
                            fileA2552.A2552CODIT = "";
                            if (!fileA2552.A2552BASE.equals("MP")) {
                                fileA2552.A2552PAX = "";
                            }

                            fileA2552.A2552TPAX = "";
                            fileA2552.A2552UBICA = "";
                            fileA2552.A2552FCVTA = "";
                            fileA2552.A2552TTARJ = "";
                            fileA2552.A2552NREF = "";

                            fileA2552.A2552TAX = 0;
                            fileA2552.A2552CODTAX1 = "";
                            fileA2552.A2552TAX1 = 0;
                            fileA2552.A2552CODTAX2 = "";
                            fileA2552.A2552TAX2 = 0;
                            fileA2552.A2552CODTAX3 = "";
                            fileA2552.A2552TAX3 = 0;
                            fileA2552.A2552CODTAX4 = "";
                            fileA2552.A2552TAX4 = 0;
                            fileA2552.A2552CODTAX5 = "";
                            fileA2552.A2552TAX5 = 0;
                            fileA2552.A2552CODTAX6 = "";
                            fileA2552.A2552TAX6 = 0;
                            fileA2552.A2552CODTAX7 = "";
                            fileA2552.A2552TAX7 = 0;
                            fileA2552.A2552CODTAX8 = "";
                            fileA2552.A2552TAX8 = 0;
                            fileA2552.A2552CODTAX9 = "";
                            fileA2552.A2552TAX9 = 0;
                            fileA2552.A2552CODTAX10 = "";
                            fileA2552.A2552TAX10 = 0;
                            fileA2552.A2552CODTAX11 = "";
                            fileA2552.A2552TAX11 = 0;
                            fileA2552.A2552CODTAX12 = "";
                            fileA2552.A2552TAX12 = 0;
                            fileA2552.A2552CODTAX13 = "";
                            fileA2552.A2552TAX13 = 0;
                            fileA2552.A2552CODTAX14 = "";
                            fileA2552.A2552TAX14 = 0;
                            fileA2552.A2552CODTAX15 = "";
                            fileA2552.A2552TAX15 = 0;
                            fileA2552.A2552CODTAX16 = "";
                            fileA2552.A2552TAX16 = 0;
                            fileA2552.A2552CODTAX17 = "";
                            fileA2552.A2552TAX17 = 0;
                            fileA2552.A2552CODTAX18 = "";
                            fileA2552.A2552TAX18 = 0;
                            fileA2552.A2552CODTAX19 = "";
                            fileA2552.A2552TAX19 = 0;
                            fileA2552.A2552CODTAX20 = "";
                            fileA2552.A2552TAX20 = 0;

                        } else if (fileA2552.A2552BASE.equals("UP")) {
                            fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(1));
                            if (fileA2552.A2552TRNCO.equals("")) {
                                result = "Transaction required";
                                break;
                            }
                            if (fileA2552.A2552TRNCO.length() != 3) {
                                result = "THE Transaction MUST BE 3 CHARACTERES" + fileA2552.A2552TRNCO;
                                break;
                            }
                            fileA2552.A2552NMEMO = getCellValue(currentRow.getCell(2));
                            fileA2552.A2552PERIODO = getCellValue(currentRow.getCell(3));
                            if (fileA2552.A2552PERIODO.equals("")) {
                                result = "PERIOD required";
                                break;
                            }
                            fileA2552.A2552IATA = getCellValue(currentRow.getCell(4));
                            if (fileA2552.A2552IATA.equals("")) {
                                result = "Iata required";
                                break;
                            }
                            if (fileA2552.A2552IATA.length() != 8) {
                                result = "THE IATA MUST BE 8 CHARACTERES" + fileA2552.A2552IATA;
                                break;
                            }
                            fileA2552.A2552PAX = getCellValue(currentRow.getCell(5));
                            fileA2552.A2552FUENT = getCellValue(currentRow.getCell(6));
                            if (fileA2552.A2552FUENT.equals("")) {
                                result = "Fuente required";
                                break;
                            }
                            if (fileA2552.A2552FUENT.length() != 3) {
                                result = "THE SOURCE MUST BE 3 CHARACTERES" + fileA2552.A2552FUENT;
                                break;
                            }
                            fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(7));
                            if (fileA2552.A2552PAVTA.equals("")) {
                                result = "Country required";
                                break;
                            }
                            if (fileA2552.A2552PAVTA.length() != 2) {
                                result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                break;
                            }
                            fileA2552.A2552CUR = getCellValue(currentRow.getCell(8));
                            if (fileA2552.A2552CUR.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA2552.A2552CUR.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES" + fileA2552.A2552CUR;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(9)).equals("")) {
                                fileA2552.A2552COMI = Float.parseFloat(getCellValue(currentRow.getCell(9)));
                            } else {
                                fileA2552.A2552COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(10)).equals("")) {
                                fileA2552.A2552TAXCM = Float.parseFloat(getCellValue(currentRow.getCell(10)));
                            } else {
                                fileA2552.A2552TAXCM = 0;
                            }
                            if (!getCellValue(currentRow.getCell(11)).equals("")) {
                                fileA2552.A2552PROVI = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                            } else {
                                fileA2552.A2552PROVI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(12)).equals("")) {
                                fileA2552.A2552PROVI2 = Float.parseFloat(getCellValue(currentRow.getCell(12)));
                            } else {
                                fileA2552.A2552PROVI2 = 0;
                            }
                            if (!getCellValue(currentRow.getCell(13)).equals("")) {
                                fileA2552.A2552PROVI3 = Float.parseFloat(getCellValue(currentRow.getCell(13)));
                            } else {
                                fileA2552.A2552PROVI3 = 0;
                            }
                            if (!getCellValue(currentRow.getCell(14)).equals("")) {
                                fileA2552.A2552PROVI4 = Float.parseFloat(getCellValue(currentRow.getCell(14)));
                            } else {
                                fileA2552.A2552PROVI4 = 0;
                            }
                            
                            if (!getCellValue(currentRow.getCell(14)).equals("")) {
                                fileA2552.A2552NETO = Float.parseFloat(getCellValue(currentRow.getCell(14)));
                            } else {
                                fileA2552.A2552NETO = 0;
                            }

                            if ((fileA2552.A2552COMI + fileA2552.A2552TAXCM + fileA2552.A2552PROVI + fileA2552.A2552PROVI2 + fileA2552.A2552PROVI3 + fileA2552.A2552PROVI4) == 0) {
                                result = "Amount must be greater or less than zero";
                                break;
                            }
                            fileA2552.A2552PROVIDES = "";
                            fileA2552.A2552PROVIDES2 = "";
                            fileA2552.A2552PROVIDES3 = "";
                            fileA2552.A2552TARIF = 0;
                            fileA2552.A2552IVA = 0;
                            //fileA2552.A2552COMI = 0;
                            fileA2552.A2552TRNCU = "SALE";
                            fileA2552.A2552TKT = fileA2552.A2552CCUST + "1111111111";
                            fileA2552.A2552CTA = "";
                            fileA2552.A2552TITU = "";
                            fileA2552.A2552CODRAZON = "";
                            fileA2552.A2552RAZONLIB = "";
                            fileA2552.A2552PERIODO = fileA2552.A2552PERIODO.trim();
                            String[] parts = fileA2552.A2552PERIODO.split(",");
                            fileA2552.A2552CODRAZON = parts[0];
                            fileA2552.A2552PERIODO = parts[1];
                            /**
                             * final del proceso
                             */
                            fileA2552.A2552SFUEN = "";
                            fileA2552.A2552ITINE = "";
                            fileA2552.A2552FBRI1 = "";
                            fileA2552.A2552CODIT = "";
                            fileA2552.A2552TPAX = "";
                            fileA2552.A2552UBICA = "";
                            fileA2552.A2552FCVTA = "";
                            fileA2552.A2552TTARJ = "";
                            fileA2552.A2552NREF = "";

                            fileA2552.A2552TAX = 0;
                            fileA2552.A2552CODTAX1 = "";
                            fileA2552.A2552TAX1 = 0;
                            fileA2552.A2552CODTAX2 = "";
                            fileA2552.A2552TAX2 = 0;
                            fileA2552.A2552CODTAX3 = "";
                            fileA2552.A2552TAX3 = 0;
                            fileA2552.A2552CODTAX4 = "";
                            fileA2552.A2552TAX4 = 0;
                            fileA2552.A2552CODTAX5 = "";
                            fileA2552.A2552TAX5 = 0;
                            fileA2552.A2552CODTAX6 = "";
                            fileA2552.A2552TAX6 = 0;
                            fileA2552.A2552CODTAX7 = "";
                            fileA2552.A2552TAX7 = 0;
                            fileA2552.A2552CODTAX8 = "";
                            fileA2552.A2552TAX8 = 0;
                            fileA2552.A2552CODTAX9 = "";
                            fileA2552.A2552TAX9 = 0;
                            fileA2552.A2552CODTAX10 = "";
                            fileA2552.A2552TAX10 = 0;
                            fileA2552.A2552CODTAX11 = "";
                            fileA2552.A2552TAX11 = 0;
                            fileA2552.A2552CODTAX12 = "";
                            fileA2552.A2552TAX12 = 0;
                            fileA2552.A2552CODTAX13 = "";
                            fileA2552.A2552TAX13 = 0;
                            fileA2552.A2552CODTAX14 = "";
                            fileA2552.A2552TAX14 = 0;
                            fileA2552.A2552CODTAX15 = "";
                            fileA2552.A2552TAX15 = 0;
                            fileA2552.A2552CODTAX16 = "";
                            fileA2552.A2552TAX16 = 0;
                            fileA2552.A2552CODTAX17 = "";
                            fileA2552.A2552TAX17 = 0;
                            fileA2552.A2552CODTAX18 = "";
                            fileA2552.A2552TAX18 = 0;
                            fileA2552.A2552CODTAX19 = "";
                            fileA2552.A2552TAX19 = 0;
                            fileA2552.A2552CODTAX20 = "";
                            fileA2552.A2552TAX20 = 0;

                        } else if (fileA2552.A2552BASE.equals("AP")) {
                            fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(0));
                            if (fileA2552.A2552PAVTA.equals("")) {
                                result = "Country required";
                                break;
                            }
                            if (fileA2552.A2552PAVTA.length() != 2) {
                                result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                break;
                            }
                            fileA2552.A2552IATA = getCellValue(currentRow.getCell(1));
                            if (fileA2552.A2552IATA.equals("")) {
                                result = "Iata required";
                                break;
                            }
                            if (fileA2552.A2552IATA.length() != 8) {
                                result = "THE IATA MUST BE 8 CHARACTERES" + fileA2552.A2552IATA;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(2)).equals("")) {
                                fileA2552.A2552COMI = Float.parseFloat(getCellValue(currentRow.getCell(2)));
                            } else {
                                fileA2552.A2552COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(3)).equals("")) {
                                fileA2552.A2552TAXCM = Float.parseFloat(getCellValue(currentRow.getCell(3)));
                            } else {
                                fileA2552.A2552TAXCM = 0;
                            }
                            if (!getCellValue(currentRow.getCell(4)).equals("")) {
                                fileA2552.A2552NETO = Float.parseFloat(getCellValue(currentRow.getCell(4)));
                            } else {
                                fileA2552.A2552NETO = 0;
                            }
                            if ((fileA2552.A2552COMI + fileA2552.A2552TAXCM) == 0) {
                                result = "Amount must be greater or less than zero";
                                break;
                            }
                            fileA2552.A2552CUR = getCellValue(currentRow.getCell(5));
                            if (fileA2552.A2552CUR.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA2552.A2552CUR.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES" + fileA2552.A2552CUR;
                                break;
                            }
                            fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(6));
                            if (fileA2552.A2552TRNCO.equals("")) {
                                result = "Transaction required TRNCO";
                                break;
                            }
                            if (fileA2552.A2552TRNCO.length() != 3) {
                                result = "THE Transaction MUST BE 3 CHARACTERES" + fileA2552.A2552TRNCO;
                                break;
                            }
                            fileA2552.A2552TKT = getCellValue(currentRow.getCell(7));
                            if (fileA2552.A2552TKT.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA2552.A2552TKT.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES CIA-FORMA-SERIE " + fileA2552.A2552TKT;
                                break;
                            }
                            fileA2552.A2552RAZONLIB = getCellValue(currentRow.getCell(8));
                            if (!fileA2552.A2552RAZONLIB.equals("")) {
                                if (fileA2552.A2552RAZONLIB.length() > 135) {
                                    result = "You must enter a reason 135 CHARACTERES" + fileA2552.A2552TKT;
                                    break;
                                }
                            }
                            fileA2552.A2552CODRAZON = getCellValue(currentRow.getCell(9));
                            fileA2552.A2552FUENT = getCellValue(currentRow.getCell(10));
                            if (fileA2552.A2552FUENT.equals("")) {
                                result = "Fuente required";
                                break;
                            }
                            if (fileA2552.A2552FUENT.length() != 3) {
                                result = "THE SOURCE MUST BE 3 CHARACTERES" + fileA2552.A2552FUENT;
                                break;
                            }
                            fileA2552.A2552TRNCU = "SALE";
                            /**
                             * final del proceso
                             */
                            fileA2552.A2552PERIODO = "";
                            fileA2552.A2552SFUEN = "";
                            fileA2552.A2552ITINE = "";
                            fileA2552.A2552FBRI1 = "";
                            fileA2552.A2552CODIT = "";
                            fileA2552.A2552TPAX = "";
                            fileA2552.A2552UBICA = "";
                            fileA2552.A2552FCVTA = "";
                            fileA2552.A2552TTARJ = "";
                            fileA2552.A2552NREF = "";

                            fileA2552.A2552TAX = 0;
                            fileA2552.A2552CODTAX1 = "";
                            fileA2552.A2552TAX1 = 0;
                            fileA2552.A2552CODTAX2 = "";
                            fileA2552.A2552TAX2 = 0;
                            fileA2552.A2552CODTAX3 = "";
                            fileA2552.A2552TAX3 = 0;
                            fileA2552.A2552CODTAX4 = "";
                            fileA2552.A2552TAX4 = 0;
                            fileA2552.A2552CODTAX5 = "";
                            fileA2552.A2552TAX5 = 0;
                            fileA2552.A2552CODTAX6 = "";
                            fileA2552.A2552TAX6 = 0;
                            fileA2552.A2552CODTAX7 = "";
                            fileA2552.A2552TAX7 = 0;
                            fileA2552.A2552CODTAX8 = "";
                            fileA2552.A2552TAX8 = 0;
                            fileA2552.A2552CODTAX9 = "";
                            fileA2552.A2552TAX9 = 0;
                            fileA2552.A2552CODTAX10 = "";
                            fileA2552.A2552TAX10 = 0;
                            fileA2552.A2552CODTAX11 = "";
                            fileA2552.A2552TAX11 = 0;
                            fileA2552.A2552CODTAX12 = "";
                            fileA2552.A2552TAX12 = 0;
                            fileA2552.A2552CODTAX13 = "";
                            fileA2552.A2552TAX13 = 0;
                            fileA2552.A2552CODTAX14 = "";
                            fileA2552.A2552TAX14 = 0;
                            fileA2552.A2552CODTAX15 = "";
                            fileA2552.A2552TAX15 = 0;
                            fileA2552.A2552CODTAX16 = "";
                            fileA2552.A2552TAX16 = 0;
                            fileA2552.A2552CODTAX17 = "";
                            fileA2552.A2552TAX17 = 0;
                            fileA2552.A2552CODTAX18 = "";
                            fileA2552.A2552TAX18 = 0;
                            fileA2552.A2552CODTAX19 = "";
                            fileA2552.A2552TAX19 = 0;
                            fileA2552.A2552CODTAX20 = "";
                            fileA2552.A2552TAX20 = 0;

                        } else if (fileA2552.A2552BASE.equals("RT")) {
                            fileA2552.A2552TRNCO = getCellValue(currentRow.getCell(1));
                            if (fileA2552.A2552TRNCO.equals("")) {
                                result = "Transaction required ADM OR ACM";
                                break;
                            }
                            if (fileA2552.A2552TRNCO.length() != 3) {
                                result = "THE Transaction MUST BE 3 CHARACTERES" + fileA2552.A2552TRNCO;
                                break;
                            }
                            fileA2552.A2552NMEMO = getCellValue(currentRow.getCell(2));
                            fileA2552.A2552PERIODO = getCellValue(currentRow.getCell(3));
                            if (fileA2552.A2552PERIODO.equals("")) {
                                result = "PERIOD required";
                                break;
                            }
                            fileA2552.A2552IATA = getCellValue(currentRow.getCell(4));
                            if (fileA2552.A2552IATA.equals("")) {
                                result = "Iata required";
                                break;
                            }
                            if (fileA2552.A2552IATA.length() != 8) {
                                result = "THE IATA MUST BE 8 CHARACTERES" + fileA2552.A2552IATA;
                                break;
                            }
                            fileA2552.A2552PAX = getCellValue(currentRow.getCell(5));
                            fileA2552.A2552FUENT = getCellValue(currentRow.getCell(6));
                            if (fileA2552.A2552FUENT.equals("")) {
                                result = "Fuente required";
                                break;
                            }
                            if (fileA2552.A2552FUENT.length() != 3) {
                                result = "THE SOURCE MUST BE 3 CHARACTERES" + fileA2552.A2552FUENT;
                                break;
                            }
                            fileA2552.A2552PAVTA = getCellValue(currentRow.getCell(7));
                            if (fileA2552.A2552PAVTA.equals("")) {
                                result = "Country required";
                                break;
                            }
                            if (fileA2552.A2552PAVTA.length() != 2) {
                                result = "THE COUNTRY MUST BE 2 CHARACTERES" + fileA2552.A2552PAVTA;
                                break;
                            }
                            fileA2552.A2552CUR = getCellValue(currentRow.getCell(8));
                            if (fileA2552.A2552CUR.equals("")) {
                                result = "Currency required";
                                break;
                            }
                            if (fileA2552.A2552CUR.length() != 3) {
                                result = "THE Currency MUST BE 3 CHARACTERES" + fileA2552.A2552CUR;
                                break;
                            }
                            if (!getCellValue(currentRow.getCell(9)).equals("")) {
                                fileA2552.A2552COMI = Float.parseFloat(getCellValue(currentRow.getCell(9)));
                            } else {
                                fileA2552.A2552COMI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(10)).equals("")) {
                                fileA2552.A2552TAXCM = Float.parseFloat(getCellValue(currentRow.getCell(10)));
                            } else {
                                fileA2552.A2552TAXCM = 0;
                            }
                            if (!getCellValue(currentRow.getCell(11)).equals("")) {
                                fileA2552.A2552PROVI = Float.parseFloat(getCellValue(currentRow.getCell(11)));
                            } else {
                                fileA2552.A2552PROVI = 0;
                            }
                            if (!getCellValue(currentRow.getCell(12)).equals("")) {
                                fileA2552.A2552PROVI2 = Float.parseFloat(getCellValue(currentRow.getCell(12)));
                            } else {
                                fileA2552.A2552PROVI2 = 0;
                            }
                            if (!getCellValue(currentRow.getCell(13)).equals("")) {
                                fileA2552.A2552PROVI3 = Float.parseFloat(getCellValue(currentRow.getCell(13)));
                            } else {
                                fileA2552.A2552PROVI3 = 0;
                            }
                            
                            if (!getCellValue(currentRow.getCell(14)).equals("")) {
                                fileA2552.A2552PROVI4 = Float.parseFloat(getCellValue(currentRow.getCell(14)));
                            } else {
                                fileA2552.A2552PROVI4 = 0;
                            }
                            
                            if (!getCellValue(currentRow.getCell(15)).equals("")) {
                                fileA2552.A2552NETO = Float.parseFloat(getCellValue(currentRow.getCell(15)));
                            } else {
                                fileA2552.A2552NETO = 0;
                            }
                            fileA2552.A2552TKT = getCellValue(currentRow.getCell(16));
                            if (fileA2552.A2552TKT.equals("")) {
                                result = "TICKET required";
                                break;
                            }
                            if (fileA2552.A2552TKT.length() != 13) {
                                result = "THE TICKET MUST BE 13 CHARACTERES CIA-FORMA-SERIE " + fileA2552.A2552TKT;
                                break;
                            }

                            if ((fileA2552.A2552COMI + fileA2552.A2552TAXCM + fileA2552.A2552PROVI + fileA2552.A2552PROVI2 + fileA2552.A2552PROVI3 + fileA2552.A2552PROVI4) == 0) {
                                result = "Amount must be greater or less than zero";
                                break;
                            }
                            fileA2552.A2552PROVIDES = "";
                            fileA2552.A2552PROVIDES2 = "";
                            fileA2552.A2552PROVIDES3 = "";
                            fileA2552.A2552TARIF = 0;
                            fileA2552.A2552IVA = 0;
                            //fileA2552.A2552COMI = 0;
                            fileA2552.A2552TRNCU = "SALE";
                            //fileA2552.A2552TKT = fileA2552.A2552CCUST + "1111111111";
                            fileA2552.A2552CTA = "";
                            fileA2552.A2552TITU = "";
                            fileA2552.A2552CODRAZON = "";
                            fileA2552.A2552RAZONLIB = "";
                            fileA2552.A2552PERIODO = fileA2552.A2552PERIODO.trim();
                            String[] parts = fileA2552.A2552PERIODO.split(",");
                            fileA2552.A2552CODRAZON = parts[0];
                            fileA2552.A2552PERIODO = parts[1];
                            /**
                             * final del proceso
                             */
                            fileA2552.A2552SFUEN = "";
                            fileA2552.A2552ITINE = "";
                            fileA2552.A2552FBRI1 = "";
                            fileA2552.A2552CODIT = "";
                            fileA2552.A2552TPAX = "";
                            fileA2552.A2552UBICA = "";
                            fileA2552.A2552FCVTA = "";
                            fileA2552.A2552TTARJ = "";
                            fileA2552.A2552NREF = "";

                            fileA2552.A2552TAX = 0;
                            fileA2552.A2552CODTAX1 = "";
                            fileA2552.A2552TAX1 = 0;
                            fileA2552.A2552CODTAX2 = "";
                            fileA2552.A2552TAX2 = 0;
                            fileA2552.A2552CODTAX3 = "";
                            fileA2552.A2552TAX3 = 0;
                            fileA2552.A2552CODTAX4 = "";
                            fileA2552.A2552TAX4 = 0;
                            fileA2552.A2552CODTAX5 = "";
                            fileA2552.A2552TAX5 = 0;
                            fileA2552.A2552CODTAX6 = "";
                            fileA2552.A2552TAX6 = 0;
                            fileA2552.A2552CODTAX7 = "";
                            fileA2552.A2552TAX7 = 0;
                            fileA2552.A2552CODTAX8 = "";
                            fileA2552.A2552TAX8 = 0;
                            fileA2552.A2552CODTAX9 = "";
                            fileA2552.A2552TAX9 = 0;
                            fileA2552.A2552CODTAX10 = "";
                            fileA2552.A2552TAX10 = 0;
                            fileA2552.A2552CODTAX11 = "";
                            fileA2552.A2552TAX11 = 0;
                            fileA2552.A2552CODTAX12 = "";
                            fileA2552.A2552TAX12 = 0;
                            fileA2552.A2552CODTAX13 = "";
                            fileA2552.A2552TAX13 = 0;
                            fileA2552.A2552CODTAX14 = "";
                            fileA2552.A2552TAX14 = 0;
                            fileA2552.A2552CODTAX15 = "";
                            fileA2552.A2552TAX15 = 0;
                            fileA2552.A2552CODTAX16 = "";
                            fileA2552.A2552TAX16 = 0;
                            fileA2552.A2552CODTAX17 = "";
                            fileA2552.A2552TAX17 = 0;
                            fileA2552.A2552CODTAX18 = "";
                            fileA2552.A2552TAX18 = 0;
                            fileA2552.A2552CODTAX19 = "";
                            fileA2552.A2552TAX19 = 0;
                            fileA2552.A2552CODTAX20 = "";
                            fileA2552.A2552TAX20 = 0;

                        }
                        lstGeneral.add(fileA2552);

                    }
                }
            }
            if (result.equals("")) {
                result = logic.subirExcel(lstGeneral);
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

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<A2552Filter> lst;
        A2552Filter filter = new A2552Filter();

        try {
            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());

            int limit = Integer.parseInt(request.getParameter("limit"));
            int start = Integer.parseInt(request.getParameter("start"));

            int pExcel = Integer.parseInt(request.getParameter("pexcel"));
            Boolean bExcel = pExcel == 1 ? true : false;

            filter.IN_FCVTA = request.getParameter("IN_FCVTA");
            filter.IN_FHASTA = request.getParameter("IN_FHASTA");
            filter.IN_IATA = request.getParameter("IN_IATA");
            filter.IN_ESTADO = request.getParameter("IN_ESTADO");
            filter.IN_AREA = request.getParameter("IN_AREA");
            filter.IN_TYPE = request.getParameter("IN_TYPE");
            filter.A2552FUENT = request.getParameter("A2552FUENT");
            filter.IN_USER = request.getParameter("IN_USER");
            if (!bExcel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            lst = logic.loadSQP01679(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "grupo")
    public @ResponseBody
    String grupo(ModelMap map, HttpServletRequest request) {
        A2552Filter filter = new A2552Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<A2552Filter> lst_search = logic.loadSQP01962(filter);

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

    @RequestMapping(value = "insertTKT")
    public @ResponseBody
    String insertTKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        String strSesion = UUID.randomUUID().toString();
        ArrayList<A2552Filter> gridData = new ArrayList<A2552Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2552Filter data = new A2552Filter();
                data.A2552CIA = gsonObj.get("A2552CIA").getAsString();
                data.A2552FORMA = gsonObj.get("A2552FORMA").getAsString();
                data.A2552SERIE = gsonObj.get("A2552SERIE").getAsString();

                data.A2552IATA = gsonObj.get("A2552IATA").getAsString();
                data.A2552TRNCU = gsonObj.get("A2552TRNCU").getAsString();
                data.A2552PAVTA = gsonObj.get("A2552PAVTA").getAsString();
                data.A2552ETCU3 = gsonObj.get("A2552ETCU3").getAsString().trim();
                data.A2552ETCU4 = gsonObj.get("A2552ETCU4").getAsString().trim();
                data.A2552FUENT = gsonObj.get("A2552FUENT").getAsString();
                data.A2552SEQDD = gsonObj.get("A2552SEQDD").getAsString();
                data.A2552SEQ = gsonObj.get("A2552SEQ").getAsString();
                data.A2552CPN = gsonObj.get("A2552CPN").getAsString().trim();
                data.GROUPED = gsonObj.get("GROUPED").getAsString();
                gridData.add(data);

            }
            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.insertTKT(gridData, strSesion);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        map.put("success", true);
        map.put("data", result);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "UpdateTKT")
    public @ResponseBody
    String UpdateTKT(ModelMap map, HttpServletRequest request) {
        String result = "";
        ArrayList<A2552Filter> gridData = new ArrayList<A2552Filter>();

        try {

            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            JsonParser parser = new JsonParser();
            // Obtain Array
            JsonArray gsonArr = parser.parse(request.getParameter("beanlst")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                A2552Filter data = new A2552Filter();
                data.A2552CIA = gsonObj.get("A2552CIA").getAsString();
                data.A2552FORMA = gsonObj.get("A2552FORMA").getAsString();
                data.A2552SERIE = gsonObj.get("A2552SERIE").getAsString();

                data.A2552CPN = gsonObj.get("A2552CPN").getAsString().trim();
                data.A2552SEQ = gsonObj.get("A2552SEQ").getAsString();
                data.A2552SEQD = gsonObj.get("A2552SEQD").getAsInt();
                data.A2552TRNCU = gsonObj.get("A2552TRNCU").getAsString();
                data.A2552IATA = gsonObj.get("A2552IATA").getAsString();
                data.A2552FUENT = gsonObj.get("A2552FUENT").getAsString();
                gridData.add(data);

            }
            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            result = logic.UpdateTKT(gridData);

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
        A2552Filter filter = new A2552Filter();
        List<A2552Filter> lst;
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            logic = new LoadMassiveDebitsSubiArchivoLogic();
            logic.setSession(this.serverSession.getServerSession());
            lst = logic.loadSQP01679(filter);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("LoadExcelDebitMassive");
            XSSFCellStyle headerStyle = (XSSFCellStyle) workbook.createCellStyle();

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

            Integer vi = 0, vj = 0;
            Iterator iter = lst.iterator();

            Row row;
            Cell CH_00, CH_01, CH_02, CH_03, CH_04, CH_05, CH_06, CH_07, CH_08, CH_09, CH_10, CH_11, CH_12, CH_13, CH_14, CH_15, CH_16, CH_17, CH_18, CH_19, CH_20;

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
            CH_19 = row.createCell(19);
            CH_20 = row.createCell(20);

            CH_00.setCellValue("Nbr");
            CH_01.setCellValue("System Date");
            CH_02.setCellValue("Area");
            CH_03.setCellValue("Types");
            CH_04.setCellValue("Ticket");
            CH_05.setCellValue("Country");
            CH_06.setCellValue("Currency");
            CH_07.setCellValue("Fare");
            CH_08.setCellValue("Tax");
            CH_09.setCellValue("Commision");
            CH_10.setCellValue("S. Commision");
            CH_11.setCellValue("Toca");
            CH_12.setCellValue("Charge");
            CH_13.setCellValue("Iva Charge");
            CH_14.setCellValue("Provisions");
            CH_15.setCellValue("Neto");
            CH_16.setCellValue("Status");
            CH_17.setCellValue("User");
            CH_18.setCellValue("Source");
            CH_19.setCellValue("Iata");
            CH_20.setCellValue("Agency");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));

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
            CH_19.setCellStyle(headerStyle);
            CH_20.setCellStyle(headerStyle);

            ++vj;

            while (iter.hasNext()) {
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
                CH_19 = row.createCell(19);
                CH_20 = row.createCell(20);

                CH_00.setCellValue(lst.get(vi).RN);
                CH_01.setCellValue(lst.get(vi).A2552FREGI);
                CH_02.setCellValue(lst.get(vi).A2552AREA);
                CH_03.setCellValue(lst.get(vi).A2552BASE);
                CH_04.setCellValue(lst.get(vi).A2552TKT);
                CH_05.setCellValue(lst.get(vi).A2552PAVTA);
                CH_06.setCellValue(lst.get(vi).A2552MDCOI);
                CH_07.setCellValue(lst.get(vi).A2552TARIF);
                CH_08.setCellValue(lst.get(vi).A2552TAX);
                CH_09.setCellValue(lst.get(vi).A2552COMI);
                CH_10.setCellValue(lst.get(vi).A2552SCMII);
                CH_11.setCellValue(lst.get(vi).A2552TAXCM);
                CH_12.setCellValue(lst.get(vi).A2552CARGO);
                CH_13.setCellValue(lst.get(vi).A2552IVA);
                CH_14.setCellValue(lst.get(vi).A2552PROVI);
                CH_15.setCellValue(lst.get(vi).A2552NETO);
                CH_16.setCellValue(lst.get(vi).ESTADO);
                CH_17.setCellValue(lst.get(vi).A2552REGIS);
                CH_18.setCellValue(lst.get(vi).A2552FUENT);
                CH_19.setCellValue(lst.get(vi).A2552IATA);
                CH_20.setCellValue(lst.get(vi).A2552AGEN);

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
                CH_19.setCellStyle(bodyStyle);
                CH_20.setCellStyle(bodyStyle);

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
            sheet.autoSizeColumn(18, true);
            sheet.autoSizeColumn(19, true);
            sheet.autoSizeColumn(20, true);

            String fileNameDownload = String.format("LoadExcelDebitMassive - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
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
