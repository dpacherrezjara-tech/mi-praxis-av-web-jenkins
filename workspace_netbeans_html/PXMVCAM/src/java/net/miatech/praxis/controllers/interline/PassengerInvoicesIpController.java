/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.interline;

import com.google.gson.Gson;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.classes.ZipFiles;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.SFI010;
import net.miatech.praxis.interline.SFI021;
import net.miatech.praxis.interline.SFI022;
import net.miatech.praxis.interline.SFI030;
import net.miatech.praxis.interline.SFI031;
import net.miatech.praxis.interline.SFI032;
import net.miatech.praxis.interline.SFI033;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.logic.interline.PassengerInvoicesIpLogic;
import net.miatech.praxis.logic.screens.FacsimilLogic;
import net.miatech.praxis.spring.INF020;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/PassengerInvoicesIp")
public class PassengerInvoicesIpController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private PassengerInvoicesIpLogic logic;
    private MasterDAO masterDAO;
    private HashMap<String, String> hmAeropuertos;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/PassengerInvoicesIp/form_index";
    }

    @RequestMapping(value = "/searchTKT")
    public @ResponseBody
    String searchTKT(ModelMap map, HttpServletRequest request) {
        SFI020Filter filter = new SFI020Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;

            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SFI020Filter> listaData = logic.loadPX190S09SFI020(filter);

            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : Search-------------");
        map.put("success", true);
        List<SFI040Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI040Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<SFI040Filter> lst = new ArrayList<>(0);
        SFI040Filter filter = new SFI040Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI040Filter.class);
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

            lst = logic.loadPX190S01SFI040(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "/exportFile1")
    public @ResponseBody
    String exportFile1(ModelMap map, HttpServletRequest request) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        String[] lista;//Nombres de los archivos en general
        String file = "";
        List<SFI040Filter> listaArray = new ArrayList<SFI040Filter>();
        byte[] bytes = null;
        //OBTENIENDO EL ZIP DESEADO ========================================
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            String strcia = request.getParameter("strcia");
            String strFecha = request.getParameter("strFecha");
            String strPeriodo = request.getParameter("strPeriodo");

            FilenameFilter fnfZIP = new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
//                    return (name.startsWith("PIDECF-139") && name.toLowerCase().endsWith(".zip"));
                    return ((name.startsWith("pidect-139") || name.startsWith("PIDECT-139")) && name.toLowerCase().endsWith(".zip"));
                }
            };
            String cia = serverSession.getServerSession().getUserView().getCustomerInfo().CCUST;
            //OBTENIENDO NOMBRE DE ZIP Incoming,
            // listaArray=null;
//            String pathImgs = "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\AM\\INSUMOS-FLOWN\\IS-IDEC\\";
            String pathImgs = "\\\\miatechnet" + "\\SIS\\AM\\Incoming\\AÑO " + strFecha.substring(0, 4) + "\\" + strFecha + "-P" + strPeriodo + "\\";
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfZIP);//
            if (lista != null && lista.length > 0) {
                for (int i = 0; i < lista.length; i++) {
                    if (lista[i].toString().trim().startsWith("pidect-" + cia + strFecha + strPeriodo) || lista[i].toString().trim().startsWith("PIDECT-" + cia + strFecha + strPeriodo)) {
                        //  file = lista[i].toString().trim();
                        SFI040Filter nombre = new SFI040Filter();
                        nombre.strFormatDate = lista[i].toString().trim();
                        nombre.FILLER1 = pathImgs;
                        listaArray.add(nombre);
                    }
                }
            }

            map.put("success", true);
            map.put("listaArray", listaArray);
//            map.put("str", new String(bytes));
        } catch (Exception e) {
            //e.printStackTrace();
            e.printStackTrace(pw);
            sw.toString();
            map.put("success", false);
            map.put("sesion", " Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getIDECZip")
    public @ResponseBody
    void getIDECZip(HttpServletRequest request, HttpServletResponse response) throws IOException {

        SFI040Filter filter = new SFI040Filter();

        filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
        InputStream is = null;
        try {
            System.out.println("PassengerInvoicesIp : getIDECZip");
            String rutaFile = filter.FILLER1;
            String fileName = filter.strFormatDate;

            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");

            OutputStream out = response.getOutputStream();
            is = new FileInputStream(rutaFile + "\\" + fileName);

            int bytes;
            while ((bytes = is.read()) != -1) {
                out.write(bytes);
            }
            is.close();
            response.flushBuffer();
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();

        } catch (IOException ex) {
            System.out.println("PassengerInvoicesIp : getIDECZip");
        } finally {
            is.close();
        }

    }

    @RequestMapping(value = "searchSource")
    public @ResponseBody
    String searchSource(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchSource-------------");
        map.put("success", true);
        List<SFI030Filter> lst = this.getListSource(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI030Filter> getListSource(HttpServletRequest request, Boolean bExcel) {

        List<SFI030Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190SSQP766(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail30")
    public @ResponseBody
    String searchdDetail30(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail30-------------");
        map.put("success", true);
        List<SFI030Filter> lst = this.getListDetail30(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI030Filter> getListDetail30(HttpServletRequest request, Boolean bExcel) {

        List<SFI030Filter> lst = new ArrayList<>(0);
        SFI040Filter filter = new SFI040Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI040Filter.class);
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

            lst = logic.loadPX190S01SFI030(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail20_1")
    public @ResponseBody
    String searchdDetail20_1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail20_1-------------");
        map.put("success", true);
        List<SFI020Filter> lst = this.getListDetail20_1(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI020Filter> getListDetail20_1(HttpServletRequest request, Boolean bExcel) {

        List<SFI020Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S02SFI020(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail20")
    public @ResponseBody
    String searchdDetail20(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail20-------------");
        map.put("success", true);
        List<SFI020Filter> lst = this.getListDetail20(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI020Filter> getListDetail20(HttpServletRequest request, Boolean bExcel) {

        List<SFI020Filter> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX190S01SFI020(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail211")
    public @ResponseBody
    String searchdDetail211(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail211-------------");
        map.put("success", true);
        List<SFI021Filter> lst = this.getListDetail211(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI021Filter> getListDetail211(HttpServletRequest request, Boolean bExcel) {

        List<SFI021Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S02SFI021(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail21")
    public @ResponseBody
    String searchdDetail21(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail21-------------");
        map.put("success", true);
        List<SFI021Filter> lst = this.getListDetail21(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI021Filter> getListDetail21(HttpServletRequest request, Boolean bExcel) {

        List<SFI021Filter> lst = new ArrayList<>(0);
        SFI021Filter filter = new SFI021Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI021Filter.class);
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

            lst = logic.loadPX190S01SFI021(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail22_1")
    public @ResponseBody
    String searchdDetail22_1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail22_1-------------");
        map.put("success", true);
        List<SFI022Filter> lst = this.getListDetail22_1(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI022Filter> getListDetail22_1(HttpServletRequest request, Boolean bExcel) {

        List<SFI022Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S02SFI022(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail22")
    public @ResponseBody
    String searchdDetail22(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail22-------------");
        map.put("success", true);
        List<SFI022Filter> lst = this.getListDetail22(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI022Filter> getListDetail22(HttpServletRequest request, Boolean bExcel) {

        List<SFI022Filter> lst = new ArrayList<>(0);
        SFI022Filter filter = new SFI022Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI022Filter.class);
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

            lst = logic.loadPX190S01SFI022(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail30byCIA")
    public @ResponseBody
    String searchdDetail30byCIA(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail30byCIA-------------");
        map.put("success", true);
        List<SFI030Filter> lst = this.getListDetail30byCIA(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI030Filter> getListDetail30byCIA(HttpServletRequest request, Boolean bExcel) {

        List<SFI030Filter> lst = new ArrayList<>(0);
        SFI040Filter filter = new SFI040Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI040Filter.class);
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

            lst = logic.loadPX190S02SFI030(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail30bySOURCE")
    public @ResponseBody
    String searchdDetail30bySOURCE(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail30bySOURCE-------------");
        map.put("success", true);
        List<SFI030Filter> lst = this.getListDetail30bySource(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI030Filter> getListDetail30bySource(HttpServletRequest request, Boolean bExcel) {

        List<SFI030Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S03SFI030(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail20bySO")
    public @ResponseBody
    String searchdDetail20bySO(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail20bySO-------------");
        map.put("success", true);
        List<SFI020Filter> lst = this.getListDetail20bySO(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI020Filter> getListDetail20bySO(HttpServletRequest request, Boolean bExcel) {

        List<SFI020Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S03SFI020(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail21bySO")
    public @ResponseBody
    String searchdDetail21bySO(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail21bySO-------------");
        map.put("success", true);
        List<SFI021Filter> lst = this.getListDetail21bySO(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI021Filter> getListDetail21bySO(HttpServletRequest request, Boolean bExcel) {

        List<SFI021Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S03SFI021(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail22bySO")
    public @ResponseBody
    String searchdDetail22bySO(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail22bySO-------------");
        map.put("success", true);
        List<SFI022Filter> lst = this.getListDetail22bySO(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI022Filter> getListDetail22bySO(HttpServletRequest request, Boolean bExcel) {

        List<SFI022Filter> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX190S03SFI022(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchdDetail41")
    public @ResponseBody
    String searchdDetail41(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchdDetail41-------------");
        map.put("success", true);
        List<SFI041> lst = this.getListDetail41(request, false);
        System.out.println("Total : " + lst.size());
        // map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<SFI041> getListDetail41(HttpServletRequest request, Boolean bExcel) {

        List<SFI041> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX190S01SFI041(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchSourceDetail")
    public @ResponseBody
    String searchSourceDetail(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : searchSourceDetail-------------");
        map.put("success", true);
        List<SFI020Filter> listaData20;
        List<SFI021Filter> listaData21;
        List<SFI022Filter> listaData22;
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {

            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI030Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;
            if (filter.SOURCOD.equals("01") || filter.SOURCOD.equals("02") || filter.SOURCOD.equals("03")
                    || filter.SOURCOD.equals("08") || filter.SOURCOD.equals("14") || filter.SOURCOD.equals("21")
                    || filter.SOURCOD.equals("23") || filter.SOURCOD.equals("25") || filter.SOURCOD.equals("26") || filter.SOURCOD.equals("90")) {

                listaData20 = logic.loadPX190SSQP788(filter);
                map.put("total", listaData20.size() > 0 ? listaData20.get(0).page.TOTROW : 0);
                map.put("data", listaData20);

            } else if (filter.SOURCOD.equals("91") || filter.SOURCOD.equals("04") || filter.SOURCOD.equals("05")
                    || filter.SOURCOD.equals("06") || filter.SOURCOD.equals("44") || filter.SOURCOD.equals("45") || filter.SOURCOD.equals("46")) {

                listaData21 = logic.loadPX190SSQP789(filter);
                map.put("total", listaData21.size() > 0 ? listaData21.get(0).page.TOTROW : 0);
                map.put("data", listaData21);

            } else if (filter.SOURCOD.equals("92") || filter.SOURCOD.equals("93") || filter.SOURCOD.equals("09") || filter.SOURCOD.equals("94") || filter.SOURCOD.equals("24")) {

                listaData22 = logic.loadPX190SSQP805(filter);
                map.put("total", listaData22.size() > 0 ? listaData22.get(0).page.TOTROW : 0);
                map.put("data", listaData22);
            }

        } catch (SQLException e) {
            map.put("success", false);
            logError.error(e.getMessage());
        } catch (Exception e) {
            map.put("success", false);
            logError.error(e.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchFacsimil")
    public @ResponseBody
    String searchFacsimil(ModelMap map, HttpServletRequest request) throws Exception {
        System.out.println("-------------- PassengerInvoicesIp : searchFacsimil-------------");
        map.put("success", true);

        FACSIMILFilter beanFaximil = new FACSIMILFilter();
        UserView user = this.serverSession.getServerSession().getUserView();
        INF020 cliente = this.serverSession.getServerSession().getUserView().getCustomerInfo();
        BSPF104 filter = new BSPF104();
        String strFuente = request.getParameter("strFuente");

        filter.FUENTE = request.getParameter("FUENTE");
        filter.TDNR = request.getParameter("TDNR");
        filter.CPUI = request.getParameter("CPUI");
        filter.COUNTRY = request.getParameter("COUNTRY");
        filter.HRED = request.getParameter("HRED");

        try {
            FacsimilLogic logicF = new FacsimilLogic();
            logicF.setSession(this.serverSession.getServerSession());
            if (filter.TDNR.startsWith("139")) {
                if (strFuente.equals("A")) {
                    beanFaximil = logicF.loadARCFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                } else if (strFuente.equals("S")) {
                    beanFaximil = logicF.loadASRFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                } else if (strFuente.equals("B")) {
                    beanFaximil = logicF.loadBSPFacsimil(cliente.CCUST, user, filter, hmAeropuertos);
                }
            } else {
                beanFaximil = logicF.loadFacsimileInterlineal(cliente.CCUST, "AM", user, filter, hmAeropuertos);
            }
        } catch (SQLException e) {
            logError.error(e.getMessage());
        } catch (Exception e) {
            logError.error(e.getMessage());
        }

        map.put("beanFaximil", beanFaximil);
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void getXLSX(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI040Filter> listaData = this.getList(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Billing Date");
            CH1_1.setCellValue("Period");
            CH1_2.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 9));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("VAT");
            CH2_6.setCellValue("Other Commision");
            CH2_7.setCellValue("FEE");
            CH2_8.setCellValue("UATP");
            CH2_9.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).PERNUM);
                rcell2.setCellValue(listaData.get(vi).TGROSS);
                rcell3.setCellValue(listaData.get(vi).TISC);
                rcell4.setCellValue(listaData.get(vi).TTAX);
                rcell5.setCellValue(listaData.get(vi).TNETOCAR);
                rcell6.setCellValue(listaData.get(vi).TOHCOM);
                rcell7.setCellValue(listaData.get(vi).HFEEAM);
                rcell8.setCellValue(listaData.get(vi).TUATP);
                rcell9.setCellValue(listaData.get(vi).TNET);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_2")
    public @ResponseBody
    void getXLSX_2(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_2");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI030Filter> listaData = this.getListSource(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Billing Date");
            CH1_1.setCellValue("Period");
            CH1_2.setCellValue("Total");

            CH1_0.setCellStyle(headerStyle);
            CH1_1.setCellStyle(headerStyle);
            CH1_2.setCellStyle(headerStyle);
            CH1_3.setCellStyle(headerStyle);
            CH1_4.setCellStyle(headerStyle);
            CH1_5.setCellStyle(headerStyle);
            CH1_6.setCellStyle(headerStyle);
            CH1_7.setCellStyle(headerStyle);
            CH1_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 8));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("Other Commision");
            CH2_6.setCellValue("FEE");
            CH2_7.setCellValue("UATP");
            CH2_8.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);

                rcell0.setCellValue(listaData.get(vi).strFormatDate);
                rcell1.setCellValue(listaData.get(vi).PERNUM);
                rcell2.setCellValue(listaData.get(vi).TGROSS);
                rcell3.setCellValue(listaData.get(vi).TISC);
                rcell4.setCellValue(listaData.get(vi).TTAX);
                rcell5.setCellValue(listaData.get(vi).TOHCOM);
                rcell6.setCellValue(listaData.get(vi).HFEEAM);
                rcell7.setCellValue(listaData.get(vi).TUATP);
                rcell8.setCellValue(listaData.get(vi).TNET);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Detail30")
    public @ResponseBody
    void getXLSX_Detail30(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_Detail30");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI030Filter> listaData = this.getListDetail30(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Source Code");
            CH1_1.setCellValue("Source Description");
            CH1_2.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 9));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("VAT");
            CH2_6.setCellValue("Other Commision");
            CH2_7.setCellValue("FEE");
            CH2_8.setCellValue("UATP");
            CH2_9.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);

                rcell0.setCellValue(listaData.get(vi).SOURCOD);
                rcell1.setCellValue(listaData.get(vi).IN_FECHA_FROM);
                rcell2.setCellValue(listaData.get(vi).TGROSS);
                rcell3.setCellValue(listaData.get(vi).TISC);
                rcell4.setCellValue(listaData.get(vi).TTAX);
                rcell5.setCellValue(listaData.get(vi).TNETOCAR);
                rcell6.setCellValue(listaData.get(vi).TOHCOM);
                rcell7.setCellValue(listaData.get(vi).HFEEAM);
                rcell8.setCellValue(listaData.get(vi).TUATP);
                rcell9.setCellValue(listaData.get(vi).TNET);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Detail30_1")
    public @ResponseBody
    void getXLSX_Detail30_1(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_Detail30_1");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI020Filter> listaData = this.getListDetail20_1(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Airline Code");
            CH1_1.setCellValue("Airline Name");
            CH1_2.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 9));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("VAT");
            CH2_6.setCellValue("Other Commision");
            CH2_7.setCellValue("FEE");
            CH2_8.setCellValue("UATP");
            CH2_9.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);

                rcell0.setCellValue(listaData.get(vi).BAIR);
                rcell1.setCellValue(listaData.get(vi).DES_BAIR);
                rcell2.setCellValue(listaData.get(vi).GROSS);
                rcell3.setCellValue(listaData.get(vi).ISCAMT);
                rcell4.setCellValue(listaData.get(vi).TAX);
                rcell5.setCellValue(listaData.get(vi).VATAMT);
                rcell6.setCellValue(listaData.get(vi).OTHCOMAM);
                rcell7.setCellValue(listaData.get(vi).HFEEAM);
                rcell8.setCellValue(listaData.get(vi).UATPAMT);
                rcell9.setCellValue(listaData.get(vi).CPNTAM);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Detail20")
    public @ResponseBody
    void getXLSX_Detail20(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_Detail20");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI020Filter> listaData = this.getListDetail20(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            String strFormatDate = listaData.get(0).strFormatDate;
            String PERNUM = listaData.get(0).PERNUM;
            String BAIR = listaData.get(0).BAIR;
            String title;

            title = "Billing Date. : " + strFormatDate + "   " + " Period : " + PERNUM + "   " + " Airline Code : " + BAIR;

            CH1_0.setCellValue(title);

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 18));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);

            CH2_0.setCellValue("Ticket Number");
            CH2_1.setCellValue("Flight Date");
            CH2_2.setCellValue("Elect Tkt Ind.");
            CH2_3.setCellValue("Currency");
            CH2_4.setCellValue("GROSS");
            CH2_5.setCellValue("ISC");
            CH2_7.setCellValue("TAX");
            CH2_8.setCellValue("Other Commision");
            CH2_10.setCellValue("FEE");
            CH2_11.setCellValue("UAP");
            CH2_13.setCellValue("NET");
            CH2_14.setCellValue("From-To");
            CH2_15.setCellValue("Att. Ind.");
            CH2_16.setCellValue("PMI Validated");
            CH2_17.setCellValue("Accounting");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 18));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);
            Cell CH3_19 = row3.createCell(19);

            CH3_5.setCellValue("Rate");
            CH3_6.setCellValue("Amount");
            CH3_8.setCellValue("Rate");
            CH3_9.setCellValue("Amount");
            CH3_11.setCellValue("Rate");
            CH3_12.setCellValue("Amount");
            CH3_17.setCellValue("Date");
            CH3_18.setCellValue("ID");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);

                rcell0.setCellValue(listaData.get(vi).TKT);
                rcell1.setCellValue(listaData.get(vi).DES_SOURCOD);
                rcell2.setCellValue(listaData.get(vi).ETKTIND);
                rcell3.setCellValue(listaData.get(vi).ACURREN);
                rcell4.setCellValue(listaData.get(vi).GROSS);
                rcell5.setCellValue(listaData.get(vi).ISCCH);
                rcell6.setCellValue(listaData.get(vi).ISCAMT);
                rcell7.setCellValue(listaData.get(vi).TAX);
                rcell8.setCellValue(listaData.get(vi).OTHCOMPER);
                rcell9.setCellValue(listaData.get(vi).OTHCOMAM);
                rcell10.setCellValue(listaData.get(vi).HFEEAM);
                rcell11.setCellValue(listaData.get(vi).UATPPER);
                rcell12.setCellValue(listaData.get(vi).UATPAMT);
                rcell13.setCellValue(listaData.get(vi).CPNTAM);
                rcell14.setCellValue(listaData.get(vi).FROMTO);
                rcell15.setCellValue(listaData.get(vi).ATTINDOR);
                rcell16.setCellValue(listaData.get(vi).VALDPMI);
                rcell17.setCellValue(listaData.get(vi).AccountingDate);
                rcell18.setCellValue(listaData.get(vi).AccountingID);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_DetailbyCIA")
    public @ResponseBody
    void getXLSX_DetailbyCIA(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_DetailbyCIA");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI030Filter> listaData = this.getListDetail30byCIA(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Airline Code");
            CH1_1.setCellValue("Airline Name");
            CH1_2.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 9));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("VAT");
            CH2_6.setCellValue("Other Commision");
            CH2_7.setCellValue("FEE");
            CH2_8.setCellValue("UATP");
            CH2_9.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
//            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);

                rcell0.setCellValue(listaData.get(vi).BAIR);
                rcell1.setCellValue(listaData.get(vi).IN_FECHA_FROM);
                rcell2.setCellValue(listaData.get(vi).TGROSS);
                rcell3.setCellValue(listaData.get(vi).TISC);
                rcell4.setCellValue(listaData.get(vi).TTAX);
                rcell5.setCellValue(listaData.get(vi).TVAT);
                rcell6.setCellValue(listaData.get(vi).TOHCOM);
                rcell7.setCellValue(listaData.get(vi).HFEEAM);
                rcell8.setCellValue(listaData.get(vi).TUATP);
                rcell9.setCellValue(listaData.get(vi).TNET);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_DetailbySOURCE")
    public @ResponseBody
    void getXLSX_DetailbySOURCE(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_DetailbySOURCE");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI030Filter> listaData = this.getListDetail30bySource(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Source Code");
            CH1_1.setCellValue("Source Description");
            CH1_2.setCellValue("Total");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 9));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);

            CH2_2.setCellValue("GROSS");
            CH2_3.setCellValue("ISC");
            CH2_4.setCellValue("TAX");
            CH2_5.setCellValue("VAT");
            CH2_6.setCellValue("Other Commision");
            CH2_7.setCellValue("FEE");
            CH2_8.setCellValue("UATP");
            CH2_9.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);

                rcell0.setCellValue(listaData.get(vi).SOURCOD);
                rcell1.setCellValue(listaData.get(vi).IN_FECHA_FROM);
                rcell2.setCellValue(listaData.get(vi).TGROSS);
                rcell3.setCellValue(listaData.get(vi).TISC);
                rcell4.setCellValue(listaData.get(vi).TTAX);
                rcell5.setCellValue(listaData.get(vi).TVAT);
                rcell6.setCellValue(listaData.get(vi).TOHCOM);
                rcell7.setCellValue(listaData.get(vi).HFEEAM);
                rcell8.setCellValue(listaData.get(vi).TUATP);
                rcell9.setCellValue(listaData.get(vi).TNET);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_DetailbySO")
    public @ResponseBody
    void getXLSX_DetailbySO(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_DetailbySO");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI021Filter> listaData = this.getListDetail21bySO(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            String strFormatDate = listaData.get(0).strFormatDate;
            String PERNUM = listaData.get(0).PERNUM;
            String SOURCOD = listaData.get(0).SOURCOD;
            String BAIR = listaData.get(0).BAIR;
            String title;

            title = "Billing Date. : " + strFormatDate + "   " + " Period : " + PERNUM + "   " + " Source Code : " + SOURCOD + "   " + " Airline Code : " + BAIR;

            CH1_0.setCellValue(title);

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 17));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);

            CH2_0.setCellValue("Rejection Number");
            CH2_1.setCellValue("Reason Code");
            CH2_2.setCellValue("Your Billing");
            CH2_7.setCellValue("We Accept");
            CH2_12.setCellValue("Difference");
            CH2_17.setCellValue("NET");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 2, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 7, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);

            CH3_2.setCellValue("GROSS");
            CH3_3.setCellValue("ISC");
            CH3_4.setCellValue("TAX");
            CH3_5.setCellValue("FEE");
            CH3_6.setCellValue("UATP");
            CH3_7.setCellValue("GROSS");
            CH3_8.setCellValue("ISC");
            CH3_9.setCellValue("TAX");
            CH3_10.setCellValue("FEE");
            CH3_11.setCellValue("UATP");
            CH3_12.setCellValue("GROSS");
            CH3_13.setCellValue("ISC");
            CH3_14.setCellValue("TAX");
            CH3_15.setCellValue("FEE");
            CH3_16.setCellValue("UATP");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).REJNUM);
                rcell1.setCellValue(listaData.get(vi).REASCOD);
                rcell2.setCellValue(listaData.get(vi).TGROSSB);
                rcell3.setCellValue(listaData.get(vi).TISCAL);
                rcell4.setCellValue(listaData.get(vi).TTAXB);
                rcell5.setCellValue(listaData.get(vi).THDFAL);
                rcell6.setCellValue(listaData.get(vi).TUATPAL);
                rcell7.setCellValue(listaData.get(vi).TGROSSA);
                rcell8.setCellValue(listaData.get(vi).TISCA);
                rcell9.setCellValue(listaData.get(vi).TTAXA);
                rcell10.setCellValue(listaData.get(vi).THDFA);
                rcell11.setCellValue(listaData.get(vi).TUATPA);
                rcell12.setCellValue(listaData.get(vi).TGROSSD);
                rcell13.setCellValue(listaData.get(vi).TISCD);
                rcell14.setCellValue(listaData.get(vi).TTAXD);
                rcell15.setCellValue(listaData.get(vi).THDFD);
                rcell16.setCellValue(listaData.get(vi).TUATPD);
                rcell17.setCellValue(listaData.get(vi).TNETR);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    @RequestMapping(value = "getXLSX_Detail20bySO")
    public @ResponseBody
    void getXLSX_Detail20bySO(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSX_Detail20bySO");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI020Filter> listaData = this.getListDetail20bySO(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            String strFormatDate = listaData.get(0).strFormatDate;
            String PERNUM = listaData.get(0).PERNUM;
            String SOURCOD = listaData.get(0).SOURCOD;
            String BAIR = listaData.get(0).BAIR;
            String title;

            title = "Billing Date. : " + strFormatDate + "   " + " Period : " + PERNUM + "   " + " Source Code : " + SOURCOD + "   " + " Airline Code : " + BAIR;

            CH1_0.setCellValue(title);

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 18));
            ++vj;
            //============================================

            // ======  Nivel 2 ==========
            Row row2 = sheet.createRow(vj);
            Cell CH2_0 = row2.createCell(0);
            Cell CH2_1 = row2.createCell(1);
            Cell CH2_2 = row2.createCell(2);
            Cell CH2_3 = row2.createCell(3);
            Cell CH2_4 = row2.createCell(4);
            Cell CH2_5 = row2.createCell(5);
            Cell CH2_6 = row2.createCell(6);
            Cell CH2_7 = row2.createCell(7);
            Cell CH2_8 = row2.createCell(8);
            Cell CH2_9 = row2.createCell(9);
            Cell CH2_10 = row2.createCell(10);
            Cell CH2_11 = row2.createCell(11);
            Cell CH2_12 = row2.createCell(12);
            Cell CH2_13 = row2.createCell(13);
            Cell CH2_14 = row2.createCell(14);
            Cell CH2_15 = row2.createCell(15);
            Cell CH2_16 = row2.createCell(16);
            Cell CH2_17 = row2.createCell(17);
            Cell CH2_18 = row2.createCell(18);

            CH2_0.setCellValue("Ticket Number");
            CH2_1.setCellValue("Flight Date");
            CH2_2.setCellValue("Elect Tkt Ind.");
            CH2_3.setCellValue("Currency");
            CH2_4.setCellValue("GROSS");
            CH2_5.setCellValue("ISC");
            CH2_7.setCellValue("TAX");
            CH2_8.setCellValue("Other Commision");
            CH2_10.setCellValue("FEE");
            CH2_11.setCellValue("UATP");
            CH2_13.setCellValue("NET");
            CH2_14.setCellValue("From-To");
            CH2_15.setCellValue("Att.Ind.");
            CH2_16.setCellValue("PMI Validated");
            CH2_17.setCellValue("Accounting");

            CH2_0.setCellStyle(headerStyle);
            CH2_1.setCellStyle(headerStyle);
            CH2_2.setCellStyle(headerStyle);
            CH2_3.setCellStyle(headerStyle);
            CH2_4.setCellStyle(headerStyle);
            CH2_5.setCellStyle(headerStyle);
            CH2_6.setCellStyle(headerStyle);
            CH2_7.setCellStyle(headerStyle);
            CH2_8.setCellStyle(headerStyle);
            CH2_9.setCellStyle(headerStyle);
            CH2_10.setCellStyle(headerStyle);
            CH2_11.setCellStyle(headerStyle);
            CH2_12.setCellStyle(headerStyle);
            CH2_13.setCellStyle(headerStyle);
            CH2_14.setCellStyle(headerStyle);
            CH2_15.setCellStyle(headerStyle);
            CH2_16.setCellStyle(headerStyle);
            CH2_17.setCellStyle(headerStyle);
            CH2_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 17, 18));
            ++vj;
            //============================================

            // ======  Nivel 3 ==========
            Row row3 = sheet.createRow(vj);
            Cell CH3_0 = row3.createCell(0);
            Cell CH3_1 = row3.createCell(1);
            Cell CH3_2 = row3.createCell(2);
            Cell CH3_3 = row3.createCell(3);
            Cell CH3_4 = row3.createCell(4);
            Cell CH3_5 = row3.createCell(5);
            Cell CH3_6 = row3.createCell(6);
            Cell CH3_7 = row3.createCell(7);
            Cell CH3_8 = row3.createCell(8);
            Cell CH3_9 = row3.createCell(9);
            Cell CH3_10 = row3.createCell(10);
            Cell CH3_11 = row3.createCell(11);
            Cell CH3_12 = row3.createCell(12);
            Cell CH3_13 = row3.createCell(13);
            Cell CH3_14 = row3.createCell(14);
            Cell CH3_15 = row3.createCell(15);
            Cell CH3_16 = row3.createCell(16);
            Cell CH3_17 = row3.createCell(17);
            Cell CH3_18 = row3.createCell(18);

            CH3_5.setCellValue("Rate");
            CH3_6.setCellValue("Amount");
            CH3_8.setCellValue("Rate");
            CH3_9.setCellValue("Amount");
            CH3_11.setCellValue("Rate");
            CH3_12.setCellValue("Amount");
            CH3_17.setCellValue("Date");
            CH3_18.setCellValue("ID");

            CH3_0.setCellStyle(headerStyle);
            CH3_1.setCellStyle(headerStyle);
            CH3_2.setCellStyle(headerStyle);
            CH3_3.setCellStyle(headerStyle);
            CH3_4.setCellStyle(headerStyle);
            CH3_5.setCellStyle(headerStyle);
            CH3_6.setCellStyle(headerStyle);
            CH3_7.setCellStyle(headerStyle);
            CH3_8.setCellStyle(headerStyle);
            CH3_9.setCellStyle(headerStyle);
            CH3_10.setCellStyle(headerStyle);
            CH3_11.setCellStyle(headerStyle);
            CH3_12.setCellStyle(headerStyle);
            CH3_13.setCellStyle(headerStyle);
            CH3_14.setCellStyle(headerStyle);
            CH3_15.setCellStyle(headerStyle);
            CH3_16.setCellStyle(headerStyle);
            CH3_17.setCellStyle(headerStyle);
            CH3_18.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            //sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);

                rcell0.setCellValue(listaData.get(vi).BAIR);
                rcell0.setCellValue(listaData.get(vi).TKT);
                rcell1.setCellValue(listaData.get(vi).DES_SOURCOD);
                rcell2.setCellValue(listaData.get(vi).ETKTIND);
                rcell3.setCellValue(listaData.get(vi).ACURREN);
                rcell4.setCellValue(listaData.get(vi).GROSS);
                rcell5.setCellValue(listaData.get(vi).ISCCH);
                rcell6.setCellValue(listaData.get(vi).ISCAMT);
                rcell7.setCellValue(listaData.get(vi).TAX);
                rcell8.setCellValue(listaData.get(vi).OTHCOMPER);
                rcell9.setCellValue(listaData.get(vi).OTHCOMAM);
                rcell10.setCellValue(listaData.get(vi).HFEEAM);
                rcell11.setCellValue(listaData.get(vi).UATPPER);
                rcell12.setCellValue(listaData.get(vi).UATPAMT);
                rcell13.setCellValue(listaData.get(vi).CPNTAM);
                rcell14.setCellValue(listaData.get(vi).FROMTO);
                rcell15.setCellValue(listaData.get(vi).ATTINDOR);
                rcell16.setCellValue(listaData.get(vi).VALDPMI);
                rcell17.setCellValue(listaData.get(vi).AccountingDate);
                rcell18.setCellValue(listaData.get(vi).AccountingID);
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

            //============================================
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    
    // ------------------------------- EXCEL ---------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    
    // ------------------------------- SFI 10 ------------------------------------------------------
    public List<SFI010> getXLSX_10(HttpServletRequest request, Boolean bExcel) {

        List<SFI010> lst = new ArrayList<>(0);
        SFI010Filter filter = new SFI010Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI010Filter.class);
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

            lst = logic.loadPX538_register_10(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_10(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_10");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 10 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI010> listaData = this.getXLSX_10(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
           

            CH1_0.setCellValue("Billing Airline");      //BAIR
            CH1_1.setCellValue("Billed Airline");       //BDAIR
            CH1_2.setCellValue("Invoice Number");       //BNUMBER
            CH1_3.setCellValue("Bill-Date");            //BDATE
            CH1_4.setCellValue("Currency List");       //LCURREN
            CH1_5.setCellValue("Currency Bill");       //BCURREN
            CH1_6.setCellValue("Period");              //PERNUM
            CH1_7.setCellValue("Inv-Date");            //IDATE
            CH1_8.setCellValue("List. Bill. Rat");     //LBRATE
            CH1_9.setCellValue("Prov. Bill. Mon");     //PBMONTH
            CH1_10.setCellValue("Susp. Inv. Flag");     //SINVFLAG
            CH1_11.setCellValue("Invoice Type");        //BTYPE

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);

                rcell0.setCellValue(listaData.get(vi).BAIR);
                rcell1.setCellValue(listaData.get(vi).BDAIR);
                rcell2.setCellValue(listaData.get(vi).BNUMBER);
                rcell3.setCellValue(listaData.get(vi).BDATE);
                rcell4.setCellValue(listaData.get(vi).LCURREN);
                rcell5.setCellValue(listaData.get(vi).BCURREN);
                rcell6.setCellValue(listaData.get(vi).PERNUM);
                rcell7.setCellValue(listaData.get(vi).IDATE);
                rcell8.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell9.setCellValue(listaData.get(vi).PBMONTH);
                rcell10.setCellValue(listaData.get(vi).SINVFLAG);
                rcell11.setCellValue(listaData.get(vi).BTYPE);
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

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    // ------------------------------- SFI 30 ------------------------------------------------------
    public List<SFI030> getXLSX_30(HttpServletRequest request, Boolean bExcel) {

        List<SFI030> lst = new ArrayList<>(0);
        SFI030Filter filter = new SFI030Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI030Filter.class);
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

            lst = logic.loadPX538_register_30(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_30(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_30");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 30 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI030> listaData = this.getXLSX_30(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_16 = row1.createCell(16);
//            Cell CH1_17 = row1.createCell(17);
//            Cell CH1_18 = row1.createCell(18);
//            Cell CH1_19 = row1.createCell(19);
//            Cell CH1_20 = row1.createCell(20);
//            Cell CH1_21 = row1.createCell(21);
//            Cell CH1_22 = row1.createCell(22);

            CH1_0.setCellValue("Clearing Date");            //BDATE2
            CH1_1.setCellValue("Listing Billing Rate");     //LBRATE
            CH1_2.setCellValue("Period");                   //PERNUM
            CH1_3.setCellValue("Billing Airline");          //BAIR
            CH1_4.setCellValue("Billed Airline");           //BDAIR2
            CH1_5.setCellValue("Invoice Number");           //BNUMBER
            CH1_6.setCellValue("No. Billing Rec.");         //NUMBILL
            CH1_7.setCellValue("Source Code");              //SOURCOD
            
            CH1_8.setCellValue("Total Gross Value");        //TGROSS
            CH1_9.setCellValue("Total ISC Amount");         //TISC
            CH1_10.setCellValue("Total TAX Amount");        //TTAX
            CH1_11.setCellValue("Total VAT Amount");        //TVAT
            CH1_12.setCellValue("Total Other Comm.");       //TOHCOM
            CH1_13.setCellValue("Total Handling Fee");      //HFEEAM
            CH1_14.setCellValue("Total UATP Amount");       //TUATP
            CH1_15.setCellValue("Total NET");               //TNET
            
//            CH1_16.setCellValue("Total Gross Sign'");       //TGROSSG
//            CH1_17.setCellValue("Total ISC Sign");          //TISCSG
//            CH1_18.setCellValue("Total TAX Sign");          //TTAXSG
//            CH1_19.setCellValue("Total Other Sign");        //TOHCOMSG
//            CH1_20.setCellValue("Total Handling Fee Sign"); //HFEEAMSG
//            CH1_21.setCellValue("Total UATP Sign");         //TUATPSG
//            CH1_22.setCellValue("Total NET Sign");          //NETSG

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
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);
//            CH1_18.setCellStyle(headerStyle);
//            CH1_19.setCellStyle(headerStyle);
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
//                Cell rcell16 = row1.createCell(16);
//                Cell rcell17 = row1.createCell(17);
//                Cell rcell18 = row1.createCell(18);
//                Cell rcell19 = row1.createCell(19);
//                Cell rcell20 = row1.createCell(20);
//                Cell rcell21 = row1.createCell(21);
//                Cell rcell22 = row1.createCell(22);

                rcell0.setCellValue(listaData.get(vi).BDATE2);
                rcell1.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).BAIR);
                rcell4.setCellValue(listaData.get(vi).BDAIR2);
                rcell5.setCellValue(listaData.get(vi).BNUMBER);
                rcell6.setCellValue(listaData.get(vi).NUMBILL);
                rcell7.setCellValue(listaData.get(vi).SOURCOD);
                
                rcell8.setCellValue(listaData.get(vi).TGROSS);
                rcell9.setCellValue(listaData.get(vi).TISC);
                rcell10.setCellValue(listaData.get(vi).TTAX);
                rcell11.setCellValue(listaData.get(vi).TVAT);
                rcell12.setCellValue(listaData.get(vi).TOHCOM);
                rcell13.setCellValue(listaData.get(vi).HFEEAM);
                rcell14.setCellValue(listaData.get(vi).TUATP);
                rcell15.setCellValue(listaData.get(vi).TNET);
                
//                rcell16.setCellValue(listaData.get(vi).TGROSSG);
//                rcell17.setCellValue(listaData.get(vi).TISCSG);
//                rcell18.setCellValue(listaData.get(vi).TTAXSG);
//                rcell19.setCellValue(listaData.get(vi).TOHCOMSG);
//                rcell20.setCellValue(listaData.get(vi).HFEEAMSG);
//                rcell21.setCellValue(listaData.get(vi).TUATPSG);
//                rcell22.setCellValue(listaData.get(vi).NETSG);
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
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);
//            sheet.autoSizeColumn(18, true);
//            sheet.autoSizeColumn(19, true);

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    
    // ------------------------------- SFI 20 ------------------------------------------------------
    public List<SFI020Filter> getXLSX_20(HttpServletRequest request, Boolean bExcel) {

        List<SFI020Filter> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register20(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_20(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_20");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 20 - Payable " + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI020Filter> listaData = this.getXLSX_20(request, true);
            List<SFI041> listaData_41 = new ArrayList<>(0);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_22 = row1.createCell(22);
//            Cell CH1_23 = row1.createCell(23);
//            Cell CH1_24 = row1.createCell(24);
//            Cell CH1_25 = row1.createCell(25);
//            Cell CH1_26 = row1.createCell(26);
//            Cell CH1_27 = row1.createCell(27);
//            Cell CH1_28 = row1.createCell(28);
//            Cell CH1_29 = row1.createCell(29);

            CH1_0.setCellValue("Billing Date");                 //BDATE2
            CH1_1.setCellValue("Period Number");                //PERNUM
            
            CH1_2.setCellValue("Billing Airline");              //BAIR
            CH1_3.setCellValue("Invoice Number");               //BNUMBER
            CH1_4.setCellValue("Issuing Airline");              //BDAIR2
            CH1_5.setCellValue("Coupon Number");                //CPNNUM
            CH1_6.setCellValue("Ticket Number");                //TKTNUM
            CH1_7.setCellValue("Listing to Billing Rate");      //LBRATE
            CH1_8.setCellValue("Source Code");                  //SOURCOD
            CH1_9.setCellValue("Coupon Gross Value");           //GROSS
//            CH1_10.setCellValue("Coupon Gross Sign");         //GROSSSG
            CH1_10.setCellValue("Coupon Tax Amount");           //TAX
//            CH1_12.setCellValue("Coupon Tax Sign");           //TAXSG
            CH1_11.setCellValue("Flight Number");               //FLIGHTN
            CH1_12.setCellValue("Flight Date");                 //FLIGHTD
            CH1_13.setCellValue("From Airport");                //FROMCPN
            CH1_14.setCellValue("To Airport");                  //TOCPN
            CH1_15.setCellValue("Handling Fee Type");           //HFEETYPE
            CH1_16.setCellValue("Handling fees");               //HFEEAM
//            CH1_19.setCellValue("Handling fees Sign");          //HFEEAMSG
            CH1_17.setCellValue("VAT Amount");                  //VATAMT
//            CH1_21.setCellValue("VAT Amount Sign");             //VATAMTSG
            CH1_18.setCellValue("UATP Amount");                 //UATPAMT
//            CH1_23.setCellValue("UATP Amount Sign");            //UATPAMTSG
            CH1_19.setCellValue("ISC Amount");                  //ISCAMT
//            CH1_25.setCellValue("ISC Amount Sign");             //ISCAMTSG
            CH1_20.setCellValue("Other Commission Amount");     //OTHCOMAM
//            CH1_27.setCellValue("Other Commission Amount Sign");//OTHCOMASG
            CH1_21.setCellValue("Coupon Total Amount");         //CPNTAM
//            CH1_29.setCellValue("Coupon Total Amount Sign");    //CPNTAMSG
                
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
//            CH1_22.setCellStyle(headerStyle);
//            CH1_23.setCellStyle(headerStyle);
//            CH1_24.setCellStyle(headerStyle);
//            CH1_25.setCellStyle(headerStyle);
//            CH1_26.setCellStyle(headerStyle);
//            CH1_27.setCellStyle(headerStyle);
//            CH1_28.setCellStyle(headerStyle);
//            CH1_29.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 27, 27));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 28, 28));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 29, 29));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
//                Cell rcell22 = row1.createCell(22);
//                Cell rcell23 = row1.createCell(23);
//                Cell rcell24 = row1.createCell(24);
//                Cell rcell25 = row1.createCell(25);
//                Cell rcell26 = row1.createCell(26);
//                Cell rcell27 = row1.createCell(27);
//                Cell rcell28 = row1.createCell(28);
//                Cell rcell29 = row1.createCell(29);

                rcell0.setCellValue(listaData.get(vi).BDATE2);
                rcell1.setCellValue(listaData.get(vi).PERNUM);
                rcell2.setCellValue(listaData.get(vi).BAIR);
                rcell3.setCellValue(listaData.get(vi).BNUMBER);
                rcell4.setCellValue(listaData.get(vi).BDAIR2);
                rcell5.setCellValue(listaData.get(vi).CPNNUM);
                rcell6.setCellValue(listaData.get(vi).TKTNUM);
                rcell7.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell8.setCellValue(listaData.get(vi).SOURCOD);
                rcell9.setCellValue(listaData.get(vi).GROSS);
//                rcell10.setCellValue(listaData.get(vi).GROSSSG);
                rcell10.setCellValue(listaData.get(vi).TAX);
//                rcell12.setCellValue(listaData.get(vi).TAXSG);
                rcell11.setCellValue(listaData.get(vi).FLIGHTN);
                rcell12.setCellValue(listaData.get(vi).FLIGHTD);
                rcell13.setCellValue(listaData.get(vi).FROMCPN);
                rcell14.setCellValue(listaData.get(vi).TOCPN);
                
                rcell15.setCellValue(listaData.get(vi).HFEETYPE);
                rcell16.setCellValue(listaData.get(vi).HFEEAM);
//                rcell19.setCellValue(listaData.get(vi).HFEEAMSG);
                rcell17.setCellValue(listaData.get(vi).VATAMT);
//                rcell21.setCellValue(listaData.get(vi).VATAMTSG);
                
                rcell18.setCellValue(listaData.get(vi).UATPAMT);
//                rcell23.setCellValue(listaData.get(vi).UATPAMTSG);
                rcell19.setCellValue(listaData.get(vi).ISCAMT);
//                rcell25.setCellValue(listaData.get(vi).ISCAMTSG);
                rcell20.setCellValue(listaData.get(vi).OTHCOMAM);
//                rcell27.setCellValue(listaData.get(vi).OTHCOMASG);
                rcell21.setCellValue(listaData.get(vi).CPNTAM);
//                rcell29.setCellValue(listaData.get(vi).CPNTAMSG);
         
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
            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//            sheet.autoSizeColumn(23, true);
//            sheet.autoSizeColumn(24, true);
//            sheet.autoSizeColumn(25, true);
//            sheet.autoSizeColumn(26, true);
//            sheet.autoSizeColumn(27, true);
//            sheet.autoSizeColumn(28, true);
//            sheet.autoSizeColumn(29, true);

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------- SFI 21 y 22 y 23 ------------------------------------------------------
    public List<SFI021> getXLSX_21(HttpServletRequest request, Boolean bExcel) {

        List<SFI021> lst = new ArrayList<>(0);
        SFI021Filter filter = new SFI021Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI021Filter.class);
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

            lst = logic.loadPX538_register_21(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_21(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_21");
        String fileNameDownload = String.format("Passenger invoices 21 & 22 & 23 - - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI021> listaData = this.getXLSX_21(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Clearing Date");             //BDATE2
            CH1_1.setCellValue("Billing Airline");           //BAIR
            CH1_2.setCellValue("Period Number");             //PERNUM
            CH1_3.setCellValue("Source Code");               //SOURCOD
            CH1_4.setCellValue("Billing/Credit");            //REJNUM
            CH1_5.setCellValue("Listing Billing Rate");      //LBRATE

            CH1_6.setCellValue("Total Gross B/C");           //TGROSSD
            CH1_7.setCellValue("ISC B/C");                   //TISCD
            CH1_8.setCellValue("Other Commission");          //TOTHCD
            CH1_9.setCellValue("UATP");                      //TUATPD
            CH1_10.setCellValue("Tax Amount B/C");           //TTAXD
            CH1_11.setCellValue("Total Fee Amount");         //THDFD
            CH1_12.setCellValue("VAT");                      //TVATD
            CH1_13.setCellValue("NET");                      //TNETR

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);

                rcell0.setCellValue(listaData.get(vi).BDATE2);
                rcell1.setCellValue(listaData.get(vi).BAIR);
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).SOURCOD);
                rcell4.setCellValue(listaData.get(vi).REJNUM);
                rcell5.setCellValue(listaData.get(vi).LBRATE);
                
                rcell6.setCellValue(listaData.get(vi).TGROSSD);
                rcell7.setCellValue(listaData.get(vi).TISCD);
                rcell8.setCellValue(listaData.get(vi).TOTHCD);
                rcell9.setCellValue(listaData.get(vi).TUATPD);
                rcell10.setCellValue(listaData.get(vi).TTAXD);
                rcell11.setCellValue(listaData.get(vi).THDFD);
                rcell12.setCellValue(listaData.get(vi).TVATD);
                rcell13.setCellValue(listaData.get(vi).TNETR);
           
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

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------- SFI 31 ------------------------------------------------------
    public List<SFI031> getXLSX_31(HttpServletRequest request, Boolean bExcel) {

        List<SFI031> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register_31(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_31(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_31");
        String fileNameDownload = String.format("Passenger invoices 31 - Payable " + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI031> listaData = this.getXLSX_31(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_12 = row1.createCell(12);
//            Cell CH1_13 = row1.createCell(13);
//            Cell CH1_14 = row1.createCell(14);

//            CH1_0.setCellValue("Standar Mess.PB");      //SMI
//            CH1_1.setCellValue("Rec-Seq.Number");       //RSN
//            CH1_2.setCellValue("Stand-Field-Id");       //SFI
            CH1_0.setCellValue("Billing Airline");      //BAIR
            CH1_1.setCellValue("Billed Airline");       //BDAIR
            CH1_2.setCellValue("Billing Code");         //BCODE
            CH1_3.setCellValue("Invoice Number");       //BNUMBER
            CH1_4.setCellValue("Rej/Bill/Cre Number");  //RBCNUM
            CH1_5.setCellValue("Remarks Serial");       //NUMRMK
            CH1_6.setCellValue("Remarks 1");            //REMARK1
            CH1_7.setCellValue("Remarks 2");           //REMARK2
            CH1_8.setCellValue("Remarks 3");           //REMARK3
            CH1_9.setCellValue("Remarks 4");           //REMARK4
            CH1_10.setCellValue("Remarks 5");           //REMARK5
            CH1_11.setCellValue("PERNUM");              //PERNUM

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
//            CH1_12.setCellStyle(headerStyle);
//            CH1_13.setCellStyle(headerStyle);
//            CH1_14.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 14));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
//                Cell rcell12 = row1.createCell(12);
//                Cell rcell13 = row1.createCell(13);
//                Cell rcell14 = row1.createCell(14);

//                rcell0.setCellValue(listaData.get(vi).SMI);
//                rcell1.setCellValue(listaData.get(vi).RSN);
//                rcell2.setCellValue(listaData.get(vi).SFI);
                rcell0.setCellValue(listaData.get(vi).BAIR);
                rcell1.setCellValue(listaData.get(vi).BDAIR);
                rcell2.setCellValue(listaData.get(vi).BCODE);
                rcell3.setCellValue(listaData.get(vi).BNUMBER);
                rcell4.setCellValue(listaData.get(vi).RBCNUM);
                rcell5.setCellValue(listaData.get(vi).NUMRMK);
                rcell6.setCellValue(listaData.get(vi).REMARK1);
                rcell7.setCellValue(listaData.get(vi).REMARK2);
                rcell8.setCellValue(listaData.get(vi).REMARK3);
                rcell9.setCellValue(listaData.get(vi).REMARK4);
                rcell10.setCellValue(listaData.get(vi).REMARK5);
                rcell11.setCellValue(listaData.get(vi).PERNUM);
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
//            sheet.autoSizeColumn(12, true);
//            sheet.autoSizeColumn(13, true);
//            sheet.autoSizeColumn(14, true);

            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------- SFI 32 ------------------------------------------------------
    public List<SFI032> getXLSX_32(HttpServletRequest request, Boolean bExcel) {

        List<SFI032> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register_32(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_32(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_32");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 32 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI032> listaData = this.getXLSX_32(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_20 = row1.createCell(20);
//            Cell CH1_21 = row1.createCell(21);
//            Cell CH1_22 = row1.createCell(22);
//            Cell CH1_23 = row1.createCell(23);
//            Cell CH1_24 = row1.createCell(24);
//            Cell CH1_25 = row1.createCell(25);
//            Cell CH1_26 = row1.createCell(26);

            CH1_0.setCellValue("Clearing Date");                    //BDATE2
            CH1_1.setCellValue("Listing Billing Rate");             //LBRATE
            CH1_2.setCellValue("Period");                           //PERNUM
            CH1_3.setCellValue("Billing Airline");                  //BAIR2
            CH1_4.setCellValue("Billed Airline");                   //BDAIR2
            CH1_5.setCellValue("Invoice Number");                   //BNUMBER
            CH1_6.setCellValue("Rejection Memo");                   //REJNUM
            CH1_7.setCellValue("Tkt Issuing Air");                  //AIRNUM
            CH1_8.setCellValue("Coupon Number");                    //CPNNUM
            CH1_9.setCellValue("Ticket/Doc Number");                //TKTNUM
            CH1_10.setCellValue("From Airport Cp");                 //FROMCPN
            CH1_11.setCellValue("To Airport Cpn");                  //TOCPN
            CH1_12.setCellValue("Source Code");                     //SOURCOD
            CH1_13.setCellValue("Gross Amount Difference");         //TGROSSD       //GAD
//            CH1_14.setCellValue("Gross Amount Difference Sign");    //TGROSSDSG
            CH1_14.setCellValue("ISC Amount Difference");           //TISCD         //IAD 
//            CH1_16.setCellValue("ISC Amount Difference Sign");      //TISCDSG
            CH1_15.setCellValue("Tax Amount Difference");           //TTAXD         //TAD
//            CH1_18.setCellValue("Tax Amount Difference Sign");      //TTAXDSG
            CH1_16.setCellValue("Other Comission Difference Amount"); //TOTHCD      //OCDA
//            CH1_20.setCellValue("Other Comission Difference Amount Sign");          //TOTHCDSG
            CH1_17.setCellValue("Handling Fee Amount Difference");    //THDFD       //HFAD
//            CH1_22.setCellValue("Handling Fee Amount Difference Sign");             //THDFDSG
            CH1_18.setCellValue("UATP Amount Difference");            //TUATPD      //UAD  
//            CH1_24.setCellValue("UATP Amount Difference Sign");       //TUATPDSG
            CH1_19.setCellValue("Net Reject Amount");                 //TNETR       //NRA 
//            CH1_26.setCellValue("Net Reject Amount Sign");            //TNETRSG

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
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//            CH1_23.setCellStyle(headerStyle);
//            CH1_24.setCellStyle(headerStyle);
//            CH1_25.setCellStyle(headerStyle);
//            CH1_26.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
//                Cell rcell20 = row1.createCell(20);
//                Cell rcell21 = row1.createCell(21);
//                Cell rcell22 = row1.createCell(22);
//                Cell rcell23 = row1.createCell(23);
//                Cell rcell24 = row1.createCell(24);
//                Cell rcell25 = row1.createCell(25);
//                Cell rcell26 = row1.createCell(26);

                rcell0.setCellValue(listaData.get(vi).BDATE2);
                rcell1.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).BAIR2);
                rcell4.setCellValue(listaData.get(vi).BDAIR2);
                rcell5.setCellValue(listaData.get(vi).BNUMBER);
                rcell6.setCellValue(listaData.get(vi).REJNUM);
                rcell7.setCellValue(listaData.get(vi).AIRNUM);
                rcell8.setCellValue(listaData.get(vi).CPNNUM);
                rcell9.setCellValue(listaData.get(vi).TKTNUM);
                rcell10.setCellValue(listaData.get(vi).FROMCPN);
                rcell11.setCellValue(listaData.get(vi).TOCPN);
                rcell12.setCellValue(listaData.get(vi).SOURCOD);
                rcell13.setCellValue(listaData.get(vi).GAD);
//                rcell14.setCellValue(listaData.get(vi).TGROSSDSG);
                rcell14.setCellValue(listaData.get(vi).IAD);
//                rcell16.setCellValue(listaData.get(vi).TISCDSG);
                rcell15.setCellValue(listaData.get(vi).TAD);
//                rcell18.setCellValue(listaData.get(vi).TTAXDSG);
                rcell16.setCellValue(listaData.get(vi).OCDA);
//                rcell20.setCellValue(listaData.get(vi).TOTHCDSG);
                rcell17.setCellValue(listaData.get(vi).HFAD);
//                rcell22.setCellValue(listaData.get(vi).THDFDSG);
                rcell18.setCellValue(listaData.get(vi).UAD);
//                rcell24.setCellValue(listaData.get(vi).TUATPDSG);
                rcell19.setCellValue(listaData.get(vi).NRA);
//                rcell26.setCellValue(listaData.get(vi).TNETRSG);
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
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//            sheet.autoSizeColumn(23, true);
//            sheet.autoSizeColumn(24, true);
//            sheet.autoSizeColumn(25, true);
//            sheet.autoSizeColumn(26, true);
            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------- SFI 33 ------------------------------------------------------
    public List<SFI033> getXLSX_33(HttpServletRequest request, Boolean bExcel) {

        List<SFI033> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register_33(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_33(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_33");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 33 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI033> listaData = this.getXLSX_33(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_20 = row1.createCell(20);
//            Cell CH1_21 = row1.createCell(21);
//            Cell CH1_22 = row1.createCell(22);
//            Cell CH1_23 = row1.createCell(23);
//            Cell CH1_24 = row1.createCell(24);
//            Cell CH1_25 = row1.createCell(25);
//            Cell CH1_26 = row1.createCell(26);

            CH1_0.setCellValue("Clearing Date");                //BDATE2
            CH1_1.setCellValue("Listing Billing Rate");         //LBRATE
            CH1_2.setCellValue("Period");                       //PERNUM
            CH1_3.setCellValue("Billing Airline");              //BAIR2
            CH1_4.setCellValue("Billed Airline");               //BDAIR2
            CH1_5.setCellValue("Invoice Number");               //BNUMBER
            CH1_6.setCellValue("Rejection Memo");               //REJNUM
            CH1_7.setCellValue("Tkt Issuing Air");              //AIRNUM
            CH1_8.setCellValue("Coupon Number");                //CPNNUM
            CH1_9.setCellValue("Ticket/Doc Number");            //TKTNUM
            CH1_10.setCellValue("From Airport Cp");             //FROMCPN
            CH1_11.setCellValue("To Airport Cpn");              //TOCPN
            CH1_12.setCellValue("Source Code");                 //SOURCOD
            CH1_13.setCellValue("Total Gross Billed");          //TGROSSB
//            CH1_14.setCellValue("Total Gross Billed Sign");     //TGROSSBSG
            CH1_14.setCellValue("Total TAX Billed");            //TTAXB
//            CH1_16.setCellValue("Total TAX Billed Sign");       //TTAXBSG
            CH1_15.setCellValue("ISC Credited");                //TISC
//            CH1_18.setCellValue("ISC Credited Sign");           //TISCSG
            CH1_16.setCellValue("Other Commission");            //TOTHC
//            CH1_20.setCellValue("Other Commission Sign");       //TOTHCSG
            CH1_17.setCellValue("Handling Fee");                //HFEEAM
//            CH1_22.setCellValue("Handling Fee Sign");           //HFEEAMSG
            CH1_18.setCellValue("VAT Amount");                  //TVAT
//            CH1_24.setCellValue("VAT Amount Sign");             //TVATSG
            CH1_19.setCellValue("Net Billed");                  //NET
//            CH1_26.setCellValue("Net Billed Sign");             //NETSG

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
//            CH1_20.setCellStyle(headerStyle);
//            CH1_21.setCellStyle(headerStyle);
//            CH1_22.setCellStyle(headerStyle);
//            CH1_23.setCellStyle(headerStyle);
//            CH1_24.setCellStyle(headerStyle);
//            CH1_25.setCellStyle(headerStyle);
//            CH1_26.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 21, 21));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 22, 22));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 23, 23));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 24, 24));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 25));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 26, 26));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
                Cell rcell15 = row1.createCell(15);
                Cell rcell16 = row1.createCell(16);
                Cell rcell17 = row1.createCell(17);
                Cell rcell18 = row1.createCell(18);
                Cell rcell19 = row1.createCell(19);
//                Cell rcell20 = row1.createCell(20);
//                Cell rcell21 = row1.createCell(21);
//                Cell rcell22 = row1.createCell(22);
//                Cell rcell23 = row1.createCell(23);
//                Cell rcell24 = row1.createCell(24);
//                Cell rcell25 = row1.createCell(25);
//                Cell rcell26 = row1.createCell(26);

                rcell0.setCellValue(listaData.get(vi).BDATE2);
                rcell1.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).BAIR2);
                rcell4.setCellValue(listaData.get(vi).BDAIR2);
                rcell5.setCellValue(listaData.get(vi).BNUMBER);
                rcell6.setCellValue(listaData.get(vi).REJNUM);
                rcell7.setCellValue(listaData.get(vi).AIRNUM);
                rcell8.setCellValue(listaData.get(vi).CPNNUM);
                rcell9.setCellValue(listaData.get(vi).TKTNUM);
                rcell10.setCellValue(listaData.get(vi).FROMCPN);
                rcell11.setCellValue(listaData.get(vi).TOCPN);
                rcell12.setCellValue(listaData.get(vi).SOURCOD);
                rcell13.setCellValue(listaData.get(vi).TGROSSB);
//                rcell14.setCellValue(listaData.get(vi).TGROSSBSG);
                rcell14.setCellValue(listaData.get(vi).TTAXB);
//                rcell16.setCellValue(listaData.get(vi).TTAXBSG);
                rcell15.setCellValue(listaData.get(vi).TISC);
//                rcell18.setCellValue(listaData.get(vi).TISCSG);
                rcell16.setCellValue(listaData.get(vi).TOTHC);
//                rcell20.setCellValue(listaData.get(vi).TOTHCSG);
                rcell17.setCellValue(listaData.get(vi).HFEEAM);
//                rcell22.setCellValue(listaData.get(vi).HFEEAMSG);
                rcell18.setCellValue(listaData.get(vi).TVAT);
//                rcell24.setCellValue(listaData.get(vi).TVATSG);
                rcell19.setCellValue(listaData.get(vi).NET);
//                rcell26.setCellValue(listaData.get(vi).NETSG);
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
//            sheet.autoSizeColumn(20, true);
//            sheet.autoSizeColumn(21, true);
//            sheet.autoSizeColumn(22, true);
//            sheet.autoSizeColumn(23, true);
//            sheet.autoSizeColumn(24, true);
//            sheet.autoSizeColumn(25, true);
//            sheet.autoSizeColumn(26, true);
            //============================================
            /*response.setContentType("application/vnd.openxml");
             response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

             FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
             workbook.write(response.getOutputStream());
             fos.close();*/
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------- SFI 41 ------------------------------------------------------
    public List<SFI041> getXLSX_41(HttpServletRequest request, Boolean bExcel) {

        List<SFI041> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";
        String flagMonth = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            flagMonth = request.getParameter("flagByMonth");
            
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register_41(filter, flagMonth);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_41(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_41");
        String fileNameDownload = String.format("Passenger invoices 41 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        try {
            XSSFWorkbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI041> listaData = this.getXLSX_41(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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
//            Cell CH1_15 = row1.createCell(15);
//            Cell CH1_16 = row1.createCell(16);
//            Cell CH1_17 = row1.createCell(17);

            CH1_0.setCellValue("Ticket Issuing Airline");       //BDAIR2
            CH1_1.setCellValue("Ticket/Document Number");       //TKTNUM2
            CH1_2.setCellValue("Listing Billing Rate");         //LBRATE
            
            CH1_3.setCellValue("Tax Code (1)");                 //TAXCODE1
            CH1_4.setCellValue("Tax Amount Billed (1)");        //TAXBILED1
//            CH1_5.setCellValue("Tax Amount Billed (1) Sign");   //SIGN_TAX
            
            CH1_5.setCellValue("Tax Code YQ");                  //CODE_YQ
            CH1_6.setCellValue("Tax Amount Billed YQ");         //AMOUNT_YQ
//            CH1_8.setCellValue("Tax Amount Billed YQ Sign");    //SIGN_YQ
            
            CH1_7.setCellValue("Tax Code YR");                  //CODE_YR
            CH1_8.setCellValue("Tax Amount Billed YR");         //AMOUNT_YR
//            CH1_11.setCellValue("Tax Amount Billed YR Sign");   //SIGN_YR
            
            CH1_9.setCellValue("TKT CPN");                      //CPNNUM2
            CH1_10.setCellValue("Flight Date*");                //FLIGHTD
            CH1_11.setCellValue("From’ Airport of Coupon");     //FROMCPN
            CH1_12.setCellValue("To Airport of Coupon");        //TOCPN
            CH1_13.setCellValue("Mes De Facturación");          //BDATE2
            CH1_14.setCellValue("Period");                      //PERNUM

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
//            CH1_15.setCellStyle(headerStyle);
//            CH1_16.setCellStyle(headerStyle);
//            CH1_17.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 16));
//            sheet.addMergedRegion(new CellRangeAddress(0, 0, 17, 17));
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);
                Cell rcell14 = row1.createCell(14);
//                Cell rcell15 = row1.createCell(15);
//                Cell rcell16 = row1.createCell(16);
//                Cell rcell17 = row1.createCell(17);

                rcell0.setCellValue(listaData.get(vi).BDAIR2);
                rcell1.setCellValue(listaData.get(vi).TKTNUM2);
                rcell2.setCellValue(df_2.format(listaData.get(vi).LBRATE));
                rcell3.setCellValue(listaData.get(vi).TAXCODE1);
                rcell4.setCellValue(listaData.get(vi).TAXBILED1);
//                rcell5.setCellValue(listaData.get(vi).SIGN_TAX);
                rcell5.setCellValue(listaData.get(vi).CODE_YQ);
                rcell6.setCellValue(listaData.get(vi).AMOUNT_YQ);
//                rcell8.setCellValue(listaData.get(vi).SIGN_YQ);
                rcell7.setCellValue(listaData.get(vi).CODE_YR);
                rcell8.setCellValue(listaData.get(vi).AMOUNT_YR);
//                rcell11.setCellValue(listaData.get(vi).SIGN_YR);
                rcell9.setCellValue(listaData.get(vi).CPNNUM2);
                rcell10.setCellValue(listaData.get(vi).FLIGHTD);
                rcell11.setCellValue(listaData.get(vi).FROMCPN);
                rcell12.setCellValue(listaData.get(vi).TOCPN);
                rcell13.setCellValue(listaData.get(vi).BDATE2);
                rcell14.setCellValue(listaData.get(vi).PERNUM);
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
//            sheet.autoSizeColumn(15, true);
//            sheet.autoSizeColumn(16, true);
//            sheet.autoSizeColumn(17, true);

            //============================================
            //response.setContentType("application/vnd.openxml");
            //response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    
    // ------------------------------- SFI 22 ------------------------------------------------------
    public List<SFI022> getXLSX_22(HttpServletRequest request, Boolean bExcel) {

        List<SFI022> lst = new ArrayList<>(0);
        SFI020Filter filter = new SFI020Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI020Filter.class);
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

            lst = logic.loadPX538_register_22(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    public File downloadXLSX_22(HttpServletRequest request) {
        System.out.println("Report : downloadXLSX_22");
        String fileNameDownload = String.format("Passenger invoices 22 " + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        try {
            XSSFWorkbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<SFI022> listaData = this.getXLSX_22(request, true);
            System.out.println("Tamaño de lista devuelta : " + listaData.size());
            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Report");
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
            Integer vi = 0;
            Integer vj = 0; //Almacena el numero de fila
            Iterator iter = listaData.iterator();
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

            CH1_0.setCellValue("Clearing Date");             //BDATE
            CH1_1.setCellValue("Billing Airline");           //BAIR
            CH1_2.setCellValue("Period Number");             //PERNUM
            CH1_3.setCellValue("Source Code");               //SOURCOD
            CH1_4.setCellValue("Billing/Credit");            //BCMNUM
            CH1_5.setCellValue("Listing Billing Rate");      //LBRATE

            CH1_6.setCellValue("Total Gross B/C");           //TGROSS
            CH1_7.setCellValue("ISC B/C");                   //TISC
            CH1_8.setCellValue("Other Commission");          //TOHCOM
            CH1_9.setCellValue("UATP");                      //TUATP
            CH1_10.setCellValue("Tax Amount B/C");           //TTAX
            CH1_11.setCellValue("Total Fee Amount");         //HFEEAM
            CH1_12.setCellValue("VAT");                      //TVAT
            CH1_13.setCellValue("NET");                      //NET

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
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
            ++vj;
            //============================================

            while (iter.hasNext()) {
                row1 = sheet.createRow(vj);
                Cell rcell0 = row1.createCell(0);
                Cell rcell1 = row1.createCell(1);
                Cell rcell2 = row1.createCell(2);
                Cell rcell3 = row1.createCell(3);
                Cell rcell4 = row1.createCell(4);
                Cell rcell5 = row1.createCell(5);
                Cell rcell6 = row1.createCell(6);
                Cell rcell7 = row1.createCell(7);
                Cell rcell8 = row1.createCell(8);
                Cell rcell9 = row1.createCell(9);
                Cell rcell10 = row1.createCell(10);
                Cell rcell11 = row1.createCell(11);
                Cell rcell12 = row1.createCell(12);
                Cell rcell13 = row1.createCell(13);

                rcell0.setCellValue(listaData.get(vi).BDATE);
                rcell1.setCellValue(listaData.get(vi).BAIR);
                rcell2.setCellValue(listaData.get(vi).PERNUM);
                rcell3.setCellValue(listaData.get(vi).SOURCOD);
                rcell4.setCellValue(listaData.get(vi).BCMNUM);
                rcell5.setCellValue(listaData.get(vi).LBRATE);
                
                rcell6.setCellValue(listaData.get(vi).TGROSS);
                rcell7.setCellValue(listaData.get(vi).TISC);
                rcell8.setCellValue(listaData.get(vi).TOHCOM);
                rcell9.setCellValue(listaData.get(vi).TUATP);
                rcell10.setCellValue(listaData.get(vi).TTAX);
                rcell11.setCellValue(listaData.get(vi).HFEEAM);
                rcell12.setCellValue(listaData.get(vi).TVAT);
                rcell13.setCellValue(listaData.get(vi).NET);
           
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

            //============================================
            //response.setContentType("application/vnd.openxml");
            //response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");
            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(fos);
            fos.close();
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    
    //   ----------------- TXT -----------------
    public File downloadTXT_20(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_20");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 20 - Payable " + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI020Filter> lst = this.getXLSX_20(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Billing Date|Period Number|Billing Airline|Invoice Number|Issuing Airline|Coupon Number|Ticket Number|Listing to Billing Rate|Source Code|Coupon Gross Value|"
                    + "Coupon Tax Amount|Flight Number|Flight Date|From Airport|To Airport|Handling Fee Type|Handling fees|VAT Amount|UATP Amount|ISC Amount|"
                    + "Other Commission Amount|Coupon Total Amount|";
            writer.println("" + cadena);
            
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).BAIR + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).BDAIR2 + "|" ;
                cadena +=  lst.get(vi).CPNNUM + "|" ;
                cadena +=  lst.get(vi).TKTNUM + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).SOURCOD + "|" ;
                cadena +=  lst.get(vi).GROSS + "|" ;
                cadena +=  lst.get(vi).TAX + "|" ;
                cadena +=  lst.get(vi).FLIGHTN + "|" ;
                cadena +=  lst.get(vi).FLIGHTD + "|" ;
                cadena +=  lst.get(vi).FROMCPN + "|" ;
                cadena +=  lst.get(vi).TOCPN + "|" ;
                cadena +=  lst.get(vi).HFEETYPE + "|" ;
                cadena +=  lst.get(vi).HFEEAM + "|" ;
                cadena +=  lst.get(vi).VATAMT + "|" ;
                cadena +=  lst.get(vi).UATPAMT + "|" ;
                cadena +=  lst.get(vi).ISCAMT + "|" ;
                cadena +=  lst.get(vi).OTHCOMAM + "|" ;
                cadena +=  lst.get(vi).CPNTAM + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();
            
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_10(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_10");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 10 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI010> lst = this.getXLSX_10(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
           
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Billing Airline|Billed Airline|Invoice Number|Bill-Date|Currency List|Currency Bill|Period|Inv-Date|List. Bill. Rat|Prov. Bill. Mon|"
                    + "Susp. Inv. Flag|Invoice Type|";
            writer.println("" + cadena);
            
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BAIR + "|" ;
                cadena +=  lst.get(vi).BDAIR + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).BDATE + "|" ;
                cadena +=  lst.get(vi).LCURREN + "|" ;
                cadena +=  lst.get(vi).BCURREN + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).IDATE + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).PBMONTH + "|" ;
                cadena +=  lst.get(vi).SINVFLAG + "|" ;
                cadena +=  lst.get(vi).BTYPE + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_30(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_30");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 30 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI030> lst = this.getXLSX_30(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Clearing Date|Listing Billing Rate|Period|Billing Airline|Billed Airline|Invoice Number|No. Billing Rec.|Source Code|Total Gross Value|Total ISC Amount|"
                    + "Total TAX Amount|Total VAT Amount|Total Other Comm.|Total Handling Fee|Total UATP Amount|Total NET|";
            writer.println("" + cadena);
            
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).BAIR + "|" ;
                cadena +=  lst.get(vi).BDAIR2 + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).NUMBILL + "|" ;
                cadena +=  lst.get(vi).SOURCOD + "|" ;
                
                cadena +=  lst.get(vi).TGROSS + "|" ;
                cadena +=  lst.get(vi).TISC + "|" ;
                cadena +=  lst.get(vi).TTAX + "|" ;
                cadena +=  lst.get(vi).TVAT + "|" ;
                cadena +=  lst.get(vi).TOHCOM + "|" ;
                cadena +=  lst.get(vi).HFEEAM + "|" ;
                cadena +=  lst.get(vi).TUATP + "|" ;
                cadena +=  lst.get(vi).TNET + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_21(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_21");
        String fileNameDownload = String.format("Passenger invoices 21 & 22 & 23 - - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI021> lst = this.getXLSX_21(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Clearing Date|Billing Airline|Period Number|Source Code|Billing/Credit|Listing Billing Rate|Total Gross B/C|ISC B/C|Other Commission|UATP|"
                    + "Tax Amount B/C|Total Fee Amount|VAT|NET|";
            writer.println("" + cadena);
         
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  lst.get(vi).BAIR + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).SOURCOD + "|" ;
                cadena +=  lst.get(vi).REJNUM + "|" ;
                cadena +=  lst.get(vi).LBRATE + "|" ;
                
                cadena +=  lst.get(vi).TGROSSD + "|" ;
                cadena +=  lst.get(vi).TISCD + "|" ;
                cadena +=  lst.get(vi).TOTHCD + "|" ;
                cadena +=  lst.get(vi).TUATPD + "|" ;
                
                cadena +=  lst.get(vi).TTAXD + "|" ;
                cadena +=  lst.get(vi).THDFD + "|" ;
                cadena +=  lst.get(vi).TVATD + "|" ;
                cadena +=  lst.get(vi).TNETR + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_31(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_31");
        String fileNameDownload = String.format("Passenger invoices 31 - Payable " + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI031> lst = this.getXLSX_31(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Billing Airline|Billed Airline|Billing Code|Invoice Number|Rej/Bill/Cre Number|Remarks Serial|Remarks 1|Remarks 2|Remarks 3|Remarks 4|"
                    + "Remarks 5|PERNUM";
            writer.println("" + cadena);
         
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BAIR + "|" ;
                cadena +=  lst.get(vi).BDAIR + "|" ;
                cadena +=  lst.get(vi).BCODE + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).RBCNUM + "|" ;
                cadena +=  lst.get(vi).NUMRMK + "|" ;
                cadena +=  lst.get(vi).REMARK1 + "|" ;
                cadena +=  lst.get(vi).REMARK2 + "|" ;
                cadena +=  lst.get(vi).REMARK3 + "|" ;
                cadena +=  lst.get(vi).REMARK4 + "|" ;
                cadena +=  lst.get(vi).REMARK5 + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();
        
          
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_32(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_32");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 32 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI032> lst = this.getXLSX_32(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Clearing Date|Listing Billing Rate|Period|Billing Airline|Billed Airline|Invoice Number|Rejection Memo|Tkt Issuing Air|Coupon Number|Ticket/Doc Number|"
                    + "From Airport Cp|To Airport Cpn|Source Code|Gross Amount Difference|ISC Amount Difference|Tax Amount Difference|Other Comission Difference Amount|Handling Fee Amount Difference|UATP Amount Difference|Net Reject Amount|";
            writer.println("" + cadena);
    
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).BAIR2 + "|" ;
                cadena +=  lst.get(vi).BDAIR2 + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).REJNUM + "|" ;
                cadena +=  lst.get(vi).AIRNUM + "|" ;
                
                cadena +=  lst.get(vi).CPNNUM + "|" ;
                cadena +=  lst.get(vi).TKTNUM + "|" ;
                cadena +=  lst.get(vi).FROMCPN + "|" ;
                cadena +=  lst.get(vi).TOCPN + "|" ;
                cadena +=  lst.get(vi).SOURCOD + "|" ;
                cadena +=  lst.get(vi).GAD + "|" ;
                cadena +=  lst.get(vi).IAD + "|" ;
                cadena +=  lst.get(vi).TAD + "|" ;
                cadena +=  lst.get(vi).OCDA + "|" ;
                cadena +=  lst.get(vi).HFAD + "|" ;
                cadena +=  lst.get(vi).UAD + "|" ;
                cadena +=  lst.get(vi).NRA + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();
            
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_33(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_33");
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        String fileNameDownload = String.format("Passenger invoices 33 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI033> lst = this.getXLSX_33(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Clearing Date|Listing Billing Rate|Period|Billing Airline|Billed Airline|Invoice Number|Rejection Memo|Tkt Issuing Air|Coupon Number|Ticket/Doc Number|"
                    + "From Airport Cp|To Airport Cpn|Source Code|Total Gross Billed|Total TAX Billed|ISC Credited|Other Commission|Handling Fee|VAT Amount|Net Billed|";
            writer.println("" + cadena);
           
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                cadena +=  lst.get(vi).BAIR2 + "|" ;
                cadena +=  lst.get(vi).BDAIR2 + "|" ;
                cadena +=  lst.get(vi).BNUMBER + "|" ;
                cadena +=  lst.get(vi).REJNUM + "|" ;
                cadena +=  lst.get(vi).AIRNUM + "|" ;
                cadena +=  lst.get(vi).CPNNUM + "|" ;
                cadena +=  lst.get(vi).TKTNUM + "|" ;
                
                cadena +=  lst.get(vi).FROMCPN + "|" ;
                cadena +=  lst.get(vi).TOCPN + "|" ;
                cadena +=  lst.get(vi).SOURCOD + "|" ;
                cadena +=  lst.get(vi).TGROSSB + "|" ;
                cadena +=  lst.get(vi).TTAXB + "|" ;
                cadena +=  lst.get(vi).TISC + "|" ;
                cadena +=  lst.get(vi).TOTHC + "|" ;
                cadena +=  lst.get(vi).HFEEAM + "|" ;
                cadena +=  lst.get(vi).TVAT + "|" ;
                cadena +=  lst.get(vi).NET + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();
              
         
            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    public File downloadTXT_41(HttpServletRequest request) {
        System.out.println("Report : downloadTXT_41");
        String fileNameDownload = String.format("Passenger invoices 41 - Payable" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String cadena = "";
        Integer vi = 0;
        
        DecimalFormat df = new DecimalFormat("#,###,##0");
        DecimalFormat df_2 = new DecimalFormat("#,###,##0.00000");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);
        
        try {
            
            File file = File.createTempFile(fileNameDownload, ".txt");
            List<SFI041> lst = this.getXLSX_41(request, true);
            System.out.println("Tamaño de lista devuelta : " + lst.size());
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            
            cadena = "Ticket Issuing Airline|Ticket/Document Number|Listing Billing Rate|Tax Code (1)|Tax Amount Billed (1)|Tax Code YQ|Tax Amount Billed YQ|Tax Code YR|Tax Amount Billed YR|TKT CPN|"
                    + "Flight Date|From Airport of Coupon|To Airport of Coupon|Mes De Facturación|Period|";
            writer.println("" + cadena);
            
            for (vi = 0; vi < lst.size(); vi++) {
                cadena = "";
                cadena +=  lst.get(vi).BDAIR2 + "|" ;
                cadena +=  lst.get(vi).TKTNUM2 + "|" ;
                cadena +=  df_2.format(lst.get(vi).LBRATE) + "|" ;
                cadena +=  lst.get(vi).TAXCODE1 + "|" ;
                cadena +=  lst.get(vi).TAXBILED1 + "|" ;
                cadena +=  lst.get(vi).CODE_YQ + "|" ;
                cadena +=  lst.get(vi).AMOUNT_YQ + "|" ;
                cadena +=  lst.get(vi).CODE_YR + "|" ;
                cadena +=  lst.get(vi).AMOUNT_YR + "|" ;
                
                cadena +=  lst.get(vi).CPNNUM2 + "|" ;
                cadena +=  lst.get(vi).FLIGHTD + "|" ;
                cadena +=  lst.get(vi).FROMCPN + "|" ;
                cadena +=  lst.get(vi).TOCPN + "|" ;
                cadena +=  lst.get(vi).BDATE2 + "|" ;
                cadena +=  lst.get(vi).PERNUM + "|" ;
                
                writer.println("" + cadena);
            }

            writer.flush();
            writer.close();
           

            return file;

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    // ------------------------------------------------------
    
    @RequestMapping(value = "loadlstSFI031")
    public @ResponseBody
    String loadlstSFI031(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : loadlstSFI031-------------");
        map.put("success", true);

        SFI031 result = new SFI031();
        SFI021Filter filter = new SFI021Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI021Filter.class);
            result = logic.loadPX190S01SFI031(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "loadlstSFI031_1")
    public @ResponseBody
    String loadlstSFI031_1(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- PassengerInvoicesIp : loadlstSFI031_1-------------");
        map.put("success", true);

        SFI031 result = new SFI031();
        SFI022Filter filter = new SFI022Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SFI022Filter.class);
            result = logic.loadPX190S02SFI031(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchRejected")
    public @ResponseBody
    String searchRejected(ModelMap map, HttpServletRequest request) {
        SFI021Filter filter = new SFI021Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit"));
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
//            filter.page.PAGROW = 20;
//            start = (start != 0 ? start : 0);
//            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            PassengerInvoicesIpLogic logic = new PassengerInvoicesIpLogic();
            logic.setSession(this.serverSession.getServerSession());
            List<SFI021Filter> listaData_rejected = logic.loadPX185S01SFI021_rejected(filter);

            map.put("success", true);
            map.put("data", listaData_rejected);
            map.put("total", listaData_rejected.size() > 0 ? listaData_rejected.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/downloadXlsxs")
    public @ResponseBody
    void downloadXlsxs(HttpServletRequest request, HttpServletResponse response) {
        try {            
            ZipFiles zipFiles = new ZipFiles();
            String serverPath = request.getSession().getServletContext().getRealPath("/");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHSS");
            String path = sdf.format(new Date());
            List<File> srcfile = new ArrayList<File>();
            srcfile.add(downloadXLSX_10(request));
            srcfile.add(downloadXLSX_30(request));
            srcfile.add(downloadXLSX_20(request));
            srcfile.add(downloadXLSX_21(request));
            srcfile.add(downloadXLSX_31(request));
            srcfile.add(downloadXLSX_32(request));
            srcfile.add(downloadXLSX_33(request));
            srcfile.add(downloadXLSX_41(request));
            File zipfile = new File(serverPath + path + ".zip");
            
            zipFiles.zipFiles(srcfile, zipfile);
            zipFiles.downFile(response, serverPath, path + ".zip");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @RequestMapping(value = "/downloadTxt")
    public @ResponseBody
    void downloadTxt(HttpServletRequest request, HttpServletResponse response) {
        try {            
            ZipFiles zipFiles = new ZipFiles();
            String serverPath = request.getSession().getServletContext().getRealPath("/");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHSS");
            String path = sdf.format(new Date());
            
            List<File> srcfile = new ArrayList<File>();
            srcfile.add(downloadTXT_10(request));
            srcfile.add(downloadTXT_30(request));
            srcfile.add(downloadTXT_20(request));
            srcfile.add(downloadTXT_21(request));
            srcfile.add(downloadTXT_31(request));
            srcfile.add(downloadTXT_32(request));
            srcfile.add(downloadTXT_33(request));
            srcfile.add(downloadTXT_41(request));
            File zipfile = new File(serverPath + path + ".zip");
            
            zipFiles.zipFiles(srcfile, zipfile);
            zipFiles.downFile(response, serverPath, path + ".zip");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
