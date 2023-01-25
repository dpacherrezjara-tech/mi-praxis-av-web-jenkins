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
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.salesAudit.DownloadADMACMReportFormLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import net.miatech.praxis.classes.ReportMasivoADMARCPDF;
import net.miatech.praxis.classes.ReportMasivoADMASRPDF;
import net.miatech.praxis.classes.ZipDirectory;
import net.miatech.utils.spring.Application;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author zperez
 */
@Controller
@Scope("request")
@RequestMapping("/DownloadADMACMReportForm")
public class DownloadADMACMReportFormController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DownloadADMACMReportFormLogic logic;

    @RequestMapping(value = "Search")
    public @ResponseBody
    String Search(ModelMap map, HttpServletRequest request) {
        List<SQP00911Filter> lst;
        SQP00911Filter filter = new SQP00911Filter();

        try {
            logic = new DownloadADMACMReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            if (filter.COMBOCHANNEL.equals("ARC")) {
                lst = logic.Search(filter);
            } else {
                lst = logic.SearchDownloadASRPDF(filter);
            }
        } catch (Exception e) {
            throw new SpringException(e);
        }

        map.put("success", true);
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "downloadFilesASR")
    public @ResponseBody
    void downloadFilesASR(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<SQP00911Filter> lst;
        ArrayList<SQP00911Filter> ListDataPdf = new ArrayList<SQP00911Filter>();
        try {
            logic = new DownloadADMACMReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            JsonParser parser = new JsonParser();
            JsonArray gsonArr = parser.parse(request.getParameter("BeanPDFList")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548CNXPA = gsonObj.get("A2548CNXPA").getAsString();
                data.A2548FTE = gsonObj.get("A2548FTE").getAsString();
                data.A2548MDA = gsonObj.get("A2548MDA").getAsString();
                data.A2548TRNCU = gsonObj.get("A2548TRNCU").getAsString();
                data.A2548BASE = gsonObj.get("A2548BASE").getAsString();
                data.A2548NMEMO = gsonObj.get("A2548NMEMO").getAsString();
                data.A2548CATNNTD = gsonObj.get("A2548CATNNTD").getAsInt();
                data.A2548FCONT = gsonObj.get("A2548FCONT").getAsString();
                data.A2548FLAG = gsonObj.get("A2548FLAG").getAsString();
                data.A2548IATA = gsonObj.get("A2548IATA").getAsString();
                data.A2548FREGI = gsonObj.get("A2548FREGI").getAsString();
                data.AGENCY = gsonObj.get("AGENCY").getAsString();
                data.strNombreAgente = gsonObj.get("strNombreAgente").getAsString();
                data.strDirecAgente = gsonObj.get("strDirecAgente").getAsString();
                data.strZIPCOD = gsonObj.get("strZIPCOD").getAsString();
                data.strDISTRI = gsonObj.get("strDISTRI").getAsString();
                data.strDEPART = gsonObj.get("strDEPART").getAsString();
                data.strCOUNTRY = gsonObj.get("strCOUNTRY").getAsString();

                //AEROLINEA
                data.A2548TARIF = gsonObj.get("A2548TARIF").getAsDouble();
                data.A2548TTAX = gsonObj.get("A2548TTAX").getAsDouble();
                data.A2548SERVI = gsonObj.get("A2548SERVI").getAsDouble();
                data.A2548IVACS = gsonObj.get("A2548IVACS").getAsDouble();
                data.A2548COMIS = gsonObj.get("A2548COMIS").getAsDouble();
                data.A2548SCOM = gsonObj.get("A2548SCOM").getAsDouble();
                data.A2548TAXCM = gsonObj.get("A2548TAXCM").getAsDouble();
                data.A2548PORCO = gsonObj.get("A2548PORCO").getAsDouble();
                data.A2548PENAL = gsonObj.get("A2548PENAL").getAsDouble();
                data.A2548FEE = gsonObj.get("A2548FEE").getAsDouble();
                data.A2548TOTAL = gsonObj.get("A2548TOTAL").getAsDouble();
                //AGENCIA
                data.A2548TARIA = gsonObj.get("A2548TARIA").getAsDouble();
                data.A2548TTAXA = gsonObj.get("A2548TTAXA").getAsDouble();
                data.A2548SERVA = gsonObj.get("A2548SERVA").getAsDouble();
                data.A2548IVACA = gsonObj.get("A2548IVACA").getAsDouble();
                data.A2548COMIA = gsonObj.get("A2548COMIA").getAsDouble();
                data.A2548SCOMA = gsonObj.get("A2548SCOMA").getAsDouble();
                data.A2548TAXCA = gsonObj.get("A2548TAXCA").getAsDouble();
                data.A2548PORCA = gsonObj.get("A2548PORCA").getAsDouble();
                data.A2548PENAA = gsonObj.get("A2548PENAA").getAsDouble();
                data.A2548FEEA = gsonObj.get("A2548FEEA").getAsDouble();
                data.A2548TOTAA = gsonObj.get("A2548TOTAA").getAsDouble();
                //DIFENRENCIAS
                data.A2548TARID = gsonObj.get("A2548TARID").getAsDouble();
                data.A2548TTAXD = gsonObj.get("A2548TTAXD").getAsDouble();
                data.A2548SERVD = gsonObj.get("A2548SERVD").getAsDouble();
                data.A2548IVACD = gsonObj.get("A2548IVACD").getAsDouble();
                data.A2548COMID = gsonObj.get("A2548COMID").getAsDouble();
                data.A2548SCOMD = gsonObj.get("A2548SCOMD").getAsDouble();
                data.A2548TAXCD = gsonObj.get("A2548TAXCD").getAsDouble();
                data.A2548PORCD = gsonObj.get("A2548PORCD").getAsDouble();
                data.A2548PENAD = gsonObj.get("A2548PENAD").getAsDouble();
                data.A2548FEED = gsonObj.get("A2548FEED").getAsDouble();
                data.A2548TTACD = gsonObj.get("A2548TTACD").getAsDouble();
                data.A2548TTAMD = gsonObj.get("A2548TTAMD").getAsDouble();
                data.A2548TCARD = gsonObj.get("A2548TCARD").getAsDouble();
                data.A2548TOTAD = gsonObj.get("A2548TOTAD").getAsDouble();
                data.A2548NETO = gsonObj.get("A2548NETO").getAsDouble();
                ListDataPdf.add(data);

            }
            lst = logic.LisDownloadADMPDF(ListDataPdf);
            ///agrgado para el pdf
            Date hora = new Date();
            String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
            String horaFile = "_" + hora.getHours() + hora.getMinutes() + hora.getSeconds();
            String strDirectory = "ADM";
            File directory = new File(rutaFile + "\\" + strDirectory);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            int count2 = 0;
            int count_gnrl = 0;
            for (SQP00911Filter obj : lst) {

                if (count_gnrl == 0) {
                    directory.mkdir();
                }
                count_gnrl++;

                if (obj.A2548FTE.equals("ASR")) {
                    File dir2 = new File(directory, "ASR");
                    if (count2 == 0) {
                        dir2.mkdir();
                    }
                    count2++;
                    GeneraASRPDF(obj, dir2);
                }
            }
            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + horaFile + ".zip");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + directory.getAbsolutePath() + horaFile + ".zip" + "\"");
            InputStream is = new FileInputStream(directory.getAbsolutePath() + horaFile + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }
    }

    @RequestMapping(value = "downloadFilesARC")
    public @ResponseBody
    void downloadFilesARC(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<SQP00911Filter> lst;
        ArrayList<SQP00911Filter> ListDataPdf = new ArrayList<SQP00911Filter>();
        File archivo = null;
        try {
            logic = new DownloadADMACMReportFormLogic();
            logic.setSession(this.serverSession.getServerSession());
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            JsonParser parser = new JsonParser();
            JsonArray gsonArr = parser.parse(request.getParameter("BeanPDFList")).getAsJsonArray();
            for (JsonElement obj : gsonArr) {
                JsonObject gsonObj = obj.getAsJsonObject();
                SQP00911Filter data = new SQP00911Filter();
                data.A2548CNXPA = gsonObj.get("A2548CNXPA").getAsString();
                data.A2548FTE = gsonObj.get("A2548FTE").getAsString();
                data.A2548MDA = gsonObj.get("A2548MDA").getAsString();
                data.A2548TRNCU = gsonObj.get("A2548TRNCU").getAsString();
                data.A2548BASE = gsonObj.get("A2548BASE").getAsString();
                data.A2548NMEMO = gsonObj.get("A2548NMEMO").getAsString();
                data.A2548CATNNTD = gsonObj.get("A2548CATNNTD").getAsInt();
                data.A2548FCONT = gsonObj.get("A2548FCONT").getAsString();
                data.A2548FLAG = gsonObj.get("A2548FLAG").getAsString();
                data.A2548IATA = gsonObj.get("A2548IATA").getAsString();
                data.A2548FREGI = gsonObj.get("A2548FREGI").getAsString();
                data.AGENCY = gsonObj.get("AGENCY").getAsString();
                data.strNombreAgente = gsonObj.get("strNombreAgente").getAsString();
                data.strDirecAgente = gsonObj.get("strDirecAgente").getAsString();
                data.strZIPCOD = gsonObj.get("strZIPCOD").getAsString();
                data.strDISTRI = gsonObj.get("strDISTRI").getAsString();
                data.strDEPART = gsonObj.get("strDEPART").getAsString();
                data.strCOUNTRY = gsonObj.get("strCOUNTRY").getAsString();
                data.STRNOMAEREO = gsonObj.get("STRNOMAEREO").getAsString();

                //AEROLINEA
                data.A2548TARIF = gsonObj.get("A2548TARIF").getAsDouble();
                data.A2548TTAX = gsonObj.get("A2548TTAX").getAsDouble();
                data.A2548SERVI = gsonObj.get("A2548SERVI").getAsDouble();
                data.A2548IVACS = gsonObj.get("A2548IVACS").getAsDouble();
                data.A2548COMIS = gsonObj.get("A2548COMIS").getAsDouble();
                data.A2548SCOM = gsonObj.get("A2548SCOM").getAsDouble();
                data.A2548TAXCM = gsonObj.get("A2548TAXCM").getAsDouble();
                data.A2548PORCO = gsonObj.get("A2548PORCO").getAsDouble();
                data.A2548PENAL = gsonObj.get("A2548PENAL").getAsDouble();
                data.A2548FEE = gsonObj.get("A2548FEE").getAsDouble();
                data.A2548TOTAL = gsonObj.get("A2548TOTAL").getAsDouble();
                //AGENCIA
                data.A2548TARIA = gsonObj.get("A2548TARIA").getAsDouble();
                data.A2548TTAXA = gsonObj.get("A2548TTAXA").getAsDouble();
                data.A2548SERVA = gsonObj.get("A2548SERVA").getAsDouble();
                data.A2548IVACA = gsonObj.get("A2548IVACA").getAsDouble();
                data.A2548COMIA = gsonObj.get("A2548COMIA").getAsDouble();
                data.A2548SCOMA = gsonObj.get("A2548SCOMA").getAsDouble();
                data.A2548TAXCA = gsonObj.get("A2548TAXCA").getAsDouble();
                data.A2548PORCA = gsonObj.get("A2548PORCA").getAsDouble();
                data.A2548PENAA = gsonObj.get("A2548PENAA").getAsDouble();
                data.A2548FEEA = gsonObj.get("A2548FEEA").getAsDouble();
                data.A2548TOTAA = gsonObj.get("A2548TOTAA").getAsDouble();
                //DIFENRENCIAS
                data.A2548TARID = gsonObj.get("A2548TARID").getAsDouble();
                data.A2548TTAXD = gsonObj.get("A2548TTAXD").getAsDouble();
                data.A2548SERVD = gsonObj.get("A2548SERVD").getAsDouble();
                data.A2548IVACD = gsonObj.get("A2548IVACD").getAsDouble();
                data.A2548COMID = gsonObj.get("A2548COMID").getAsDouble();
                data.A2548SCOMD = gsonObj.get("A2548SCOMD").getAsDouble();
                data.A2548TAXCD = gsonObj.get("A2548TAXCD").getAsDouble();
                data.A2548PORCD = gsonObj.get("A2548PORCD").getAsDouble();
                data.A2548PENAD = gsonObj.get("A2548PENAD").getAsDouble();
                data.A2548FEED = gsonObj.get("A2548FEED").getAsDouble();
                data.A2548TTACD = gsonObj.get("A2548TTACD").getAsDouble();
                data.A2548TTAMD = gsonObj.get("A2548TTAMD").getAsDouble();
                data.A2548TCARD = gsonObj.get("A2548TCARD").getAsDouble();
                data.A2548TOTAD = gsonObj.get("A2548TOTAD").getAsDouble();
                data.A2548NETO = gsonObj.get("A2548NETO").getAsDouble();
                ListDataPdf.add(data);

            }
            lst = logic.LisDownloadARCADMPDF(ListDataPdf);
            ///agrgado para el pdf
            Date hora = new Date();
            String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
            String horaFile = "_" + hora.getHours() + hora.getMinutes() + hora.getSeconds();
            String strDirectory = "ADM";
            File directory = new File(rutaFile + "\\" + strDirectory);
            if (directory.exists()) {
                deleteFolder(directory);
            }
            int count1 = 0;
            int count3 = 1;
            int count4 = 15;
            int count_gnrl = 0;
            int count_int = 0;
            int count5 = 15;
            for (SQP00911Filter obj : lst) {

                if (count_gnrl == 0) {
                    directory.mkdir();
                }
                count_gnrl++;
                if (obj.A2548FTE.equals("ARC")) {
                    File dir = new File(directory, "ARC");
                    if (count1 == 0) {
                        dir.mkdir();
                    }
                    count1++;

                    if (count_int <= 14) {
                        File DirCount = new File(dir, count3 + " - " + count4);
                        if (count_int == 0) {
                            DirCount.mkdir();
                        }
                        //GeneraASRPDF(obj,DirCount);
                        GeneraARCPDF(obj, DirCount);
                    }
                    count_int++;

                    if (count_int == 15) {
                        count_int = 0;
                        count5 = count5 + 1;
                        count3 = count5;
                        count5 = count5 + 15;
                        count4 = count5;
                    }

                }
            }
            ZipDirectory.zipFolder(directory.getAbsolutePath(), directory.getAbsolutePath() + horaFile + ".zip");
            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + directory.getAbsolutePath() + horaFile + ".zip" + "\"");
             InputStream is = new FileInputStream(directory.getAbsolutePath() + horaFile + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (Exception e) {
            throw new SpringException(e);
            //response.("mensaje", "ERROR AL GENERAR EL PDF");
        }
    }

    public File GeneraASRPDF(SQP00911Filter obj, File directorio) {

        ReportMasivoADMASRPDF ReportMasivoADMASRPDF = new ReportMasivoADMASRPDF();
        File archivo = ReportMasivoADMASRPDF.createReport(obj, directorio);
        return archivo;
    }

    public File GeneraARCPDF(SQP00911Filter obj, File directorio) {

        ReportMasivoADMARCPDF ReportMasivoADMARCPDF = new ReportMasivoADMARCPDF();
        File archivo = ReportMasivoADMARCPDF.createReport(obj, directorio);
        return archivo;
    }

    public static void deleteFolder(File folder) {
        File[] files = folder.listFiles();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteFolder(f);
                } else {
                    f.delete();
                }
            }
        }
        folder.delete();
    }

}
