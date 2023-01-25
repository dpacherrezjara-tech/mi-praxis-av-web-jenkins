/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static net.miatech.praxis.classes.CreateStylesExcel.createStyles;
import net.miatech.praxis.classes.ProMail;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.DataRequestedByBankLogic;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.praxis.payment.filter.A2345Filter;
import net.miatech.praxis.classes.ProReportClarification;
import net.miatech.praxis.payment.ExcelChargeBack;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("request")
@RequestMapping("/DataRequestedByBank")
public class DataRequestedByBankController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private DataRequestedByBankLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/DataRequestedByBank/form_index";
    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : search-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01885(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchAvisos")
    public @ResponseBody
    String searchAvisos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchAvisos-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListAvisos(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListAvisos(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01895(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetCard")
    public @ResponseBody
    String searchDetCard(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetCard-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetCard(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetCard(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01884(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }
    
    @RequestMapping(value = "searchDetCardTKT")
    public @ResponseBody
    String searchDetCardTKT(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetCardTKT-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetCardTKT(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetCardTKT(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP02680(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetNoMatch")
    public @ResponseBody
    String searchDetNoMatch(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetNoMatch-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetNoMatch(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetNoMatch(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01947(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetUsos")
    public @ResponseBody
    String searchDetUsos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetUsos-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetUsos(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetUsos(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01916(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetAvisos")
    public @ResponseBody
    String searchDetAvisos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetAvisos-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetAvisos(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetAvisos(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01896(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetAvisos_A2290")
    public @ResponseBody
    String searchDetAvisos_A2290(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetAvisos_A2290-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetAvisos_A2290(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetAvisos_A2290(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP03286(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    @RequestMapping(value = "searchDetAvisosNoMatch")
    public @ResponseBody
    String searchDetAvisosNoMatch(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchDetAvisosNoMatch-------------");

        map.put("success", true);
        List<A2331Filter> lst = this.getListDetAvisosNoMatch(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A2331Filter> getListDetAvisosNoMatch(HttpServletRequest request, Boolean bExcel) {

        List<A2331Filter> lst = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
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

            lst = logic.loadPX404SQP01949(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    
    @RequestMapping(value = "sendEmailtoIATA")
    public @ResponseBody
    String sendEmailtoIATA(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- DataRequestedByBank : sendEmailtoIATA-------------");
        Gson gson = new Gson();
        String listas = "";
        
        A2331Filter aclaracion;
        boolean iboolean;
        String msj = "";
        int contador = 0;
        List<A2331Filter> listaData;
        List<String> lstEmails = new ArrayList<String>();
        HashMap hmResult = new HashMap();
        boolean hayUS = false, hayOtPais = false;

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            listas = request.getParameter("lista");
            A2331Filter[] listaAclaraciones = gson.fromJson(listas, A2331Filter[].class);

            if (listaAclaraciones != null && listaAclaraciones.length > 0) {
                for (int x = 0; x < listaAclaraciones.length; x++) {
                    aclaracion = listaAclaraciones[x];
                    if (aclaracion.STVAL.trim().equals("") || aclaracion.STVAL.trim().equals("1")) {
                        //Obtiene la lista de aclaraciones de esa fecha
                        hmResult = logic.loadPX404SQP01917(aclaracion);
                        listaData = (List<A2331Filter>) hmResult.get("LISTA");
                        lstEmails = (List<String>) hmResult.get("EMAIL");

                        contador = 0;
                        if (listaData != null && listaData.size() > 0) {
                            for (int i = 0; i < listaData.size(); i++) {
                                //Actualiza la informacion
                                if (listaData.get(i).IATADATE.trim().isEmpty()) {
                                    //Si no ha sido enviado antes a la IATA
                                    msj = logic.loadPX404SQP01900(listaData.get(i), "2");
                                    if (msj.contains("SUCCESS")) {
                                        contador++;
                                    }
                                } else {
                                    msj += " Clarification already sent to IATA. Authorization Nbr: " + listaData.get(i).AUTHNBR.trim();
                                }
                                if (listaData.get(i).SCOUNTRY.trim().equals("US")) {
                                    hayUS = true;
                                } else {
                                    hayOtPais = true;
                                }
                            }
                            //if (contador != listaData.size()) {
                            msj += " Clarifications updated : " + contador;
                            //}

                        } else {
                            msj = "Error. Information not found";
                        }

                    } else {

                        if (aclaracion.STVAL.trim().equals("3")) {
                            msj = "Error: Information already sent to IATA.";
                        } else {
                            msj = "Error: Information cant not be sent to IATA. Only Status *Stand By* allowed.";
                        }
                        break;
                    }
                }
            } else {
                msj = "Error. There is not information to send.";
            }

            if (lstEmails.size() == 0) {
                // temporal hasta que habiliten mail de la IATA
                lstEmails.add("amaclaracionescontracargos@aeromexico.com");
            }

            /*lstEmails = new ArrayList<String>();
             lstEmails.add("claudia@miatech.net");*/
            if (!msj.contains("Error") && !msj.contains("ERROR") && lstEmails.size() > 0) {

                for (int e = 0; e < lstEmails.size(); e++) {
                    //CODIGO DE MAIL Y SU ATTACHMENT
                    ProMail proMail = new ProMail();
                    List<String> receptores = new ArrayList<String>();
                    receptores.add(lstEmails.get(e).toString());
                    // Emails CC
                    List<String> Ccp = new ArrayList<String>();
                    String strMails = "jtorres@miatech.net";
                    String emisor = "";

                    if (hayUS && hayOtPais) {
                        strMails += ";amaclaracionescontracargos@aeromexico.com;amcscaclaracioncontracargousaeur@aeromexico.com";
                        emisor = "amaclaracionescontracargos@miatech.net";

                    } else if (hayUS) {
                        strMails += ";amcscaclaracioncontracargousaeur@aeromexico.com";
                        emisor = "amcscaclaracioncontracargousaeur@aeromexico.com";

                    } else {
                        strMails += ";amaclaracionescontracargos@aeromexico.com";
                        emisor = "amaclaracionescontracargos@miatech.net";
                    }
                    receptores.add("jtorres@miatech.net");
                    receptores.add("eneves@miatech.net");
                    receptores.add("jugaz@miatech.net");
                    if (!strMails.trim().equals("")) {
                        String[] parts = strMails.split(";");
                        for (int i = 0; i < parts.length; i++) {
                            Ccp.add(parts[i]);
                        }
                    }
                    String asunto = "Aclaraciones Aeromexico " + Functions.getFechaActual();
                    String mensaje = "<html><body><br/>Buen d&iacute;a. <br/><br/> "
                            + "Esta es una notificaci&oacute;n de requerimiento de voucher por motivo de Aclaraci&oacute;n,"
                            + " para tener mas informaci&oacute;n de esta petici&oacute;n, es necesario seguir estos pasos: <br/><br/>"
                            + " - Ingresar a la p&aacute;gina : <strong style='color: #0000ff;'>http://webpraxis.aeromexico.com/PRAXIS/</strong><br/>"
                            + " - Introduzca su ID de usuario y contraseña.<br/>"
                            + " - Se mostrar&aacute; una lista de las peticiones por Aclaraci&oacute;n.<br/>"
                            + " - Adjunte el voucher solicitado.<br/><br/> "
                            + " Esta petici&oacute;n debera ser atendida a la brevedad posible.<br/>"
                            + "<br/>Por favor no responda este comunicado, si tiene alguna duda por favor envie un correo a: "
                            + "\"AM Aclaraciones Contra Cargos\" <strong style='color: #0000ff;'>amaclaracionescontracargos@aeromexico.com</strong> "
                            + "<br/><br/> Saludos Cordiales. </body></html>";

                    iboolean = proMail.enviaMDP_2(emisor, asunto, receptores, Ccp, mensaje, null, emisor);

                    if (iboolean) {
                        //resp.info.add("Email Sent.");
                        msj += " Email Sent to " + lstEmails.get(e).toString() + " / ";
                    } else {
                        //resp.info.add("Could not send email!");
                        msj += " Could not send email to " + lstEmails.get(e).toString() + " / ";
                    }
                }
            }

            map.put("msjError", msj);
            map.put("success", true);
        } catch (Exception ex) {
            logError.error("An error ocurred, pleas try again later.");
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "sendEmailtoBank")
    public @ResponseBody
    String sendEmailtoBank(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- DataRequestedByBank : sendEmailtoBank-------------");
        String listas = "";
        Gson gson = new Gson();
        A2331Filter aclaracion;
        A2331Filter fecha;
        boolean iboolean;
        String msj = "", strTabla = "";
        List<A2331Filter> listaAclaraciones = new ArrayList<>();
        int contador = 0;
        List<A2331Filter> lstFolioCCAdj = new ArrayList<>();
        List<String> lstImagenesAdj = new ArrayList<String>();
        List<String> lstPdfAdj = new ArrayList<String>();
        List<String> lstPdfAdjName = new ArrayList<String>();
        String strCarpeta = "\\\\" + serverSession.getServerSession().getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-MEDIOS-PAGOS\\BDR\\";
        HashMap nomAutorizacion = new HashMap();
        boolean hayUS = false, hayOtPais = false;
        List<String> info = new ArrayList<>(0);
        

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
                        
            listas = request.getParameter("lista");
            A2331Filter[] listaxFechaRemesa = gson.fromJson(listas, A2331Filter[].class);

            if (listaxFechaRemesa != null && listaxFechaRemesa.length > 0) {
                for (int x = 0; x < listaxFechaRemesa.length; x++) {
                    fecha = listaxFechaRemesa[x];
                    if (fecha.STVAL.trim().equals("3")) {
                        //Obtiene la lista de aclaraciones de esa fecha
                        listaAclaraciones = logic.loadPX404SQP01899(fecha);

                        contador = 0;
                        if (listaAclaraciones != null && listaAclaraciones.size() > 0) {
                            for (int i = 0; i < listaAclaraciones.size(); i++) {
                                aclaracion = listaAclaraciones.get(i);

                                //Actualiza la informacion
                                if (aclaracion.DATES.trim().isEmpty()) {

                                    msj = logic.loadPX404SQP01900(aclaracion, "4");
                                    //msj = "SUCCESS";
                                    if (msj.contains("SUCCESS")) {

                                        contador++;
                                        if (aclaracion.strFlag.trim().equals("CC")) {
                                            //Call Center y Web
                                            A2331Filter beanInfo = logic.loadPX405SQP01958(aclaracion);
                                            lstFolioCCAdj.add(beanInfo);
                                        } else {

                                            lstImagenesAdj.add(strCarpeta + aclaracion.SENTDATE + "\\" + aclaracion.RUTA);
                                            nomAutorizacion.put(strCarpeta + aclaracion.SENTDATE + "\\" + aclaracion.RUTA, aclaracion.AUTHNBR);
                                        }

                                        strTabla += "<tr><td align='center'>" + aclaracion.FOLIO
                                                + "</td><td align='center'>" + aclaracion.SENTDATE + "</td></tr>";
                                    }

                                } else {
                                    msj += " Clarification already sent to BANK. Authorization Nbr: " + aclaracion.AUTHNBR.trim();
                                }
                                if (aclaracion.SCOUNTRY.trim().equals("US")) {
                                    hayUS = true;
                                } else {
                                    hayOtPais = true;
                                }                             
                            }
                            //if (contador != listaData.size()) {
                            msj += " Clarifications updated : " + contador;
                            //}

                        } else {
                            msj = "Error. Information not found";
                        }

                    } else {
                        msj = "Error : Information is not linked yet.";
                        break;
                    }
                }
            } else {
                msj = "Error. There is not information to send.";
            }

            if (!msj.contains("Error") && !msj.contains("ERROR")) {
                //CODIGO DE MAIL Y SU ATTACHMENT
                ProMail proMail = new ProMail();
                List<String> receptores = new ArrayList<String>();
                String emisor = "";

                if (hayUS && hayOtPais) {
                    receptores.add("amaclaracionescontracargos@aeromexico.com");
                    receptores.add("amcscaclaracioncontracargousaeur@aeromexico.com");
                    emisor = "amaclaracionescontracargos@miatech.net";

                } else if (hayUS) {
//                    receptCores.add("amcscaclaracioncontracargousaeur@aeromexico.com");
                    receptores.add("ealcibari@aeromexico.com");
                    receptores.add("eneves@miatech.net");
                    receptores.add("jtorres@miatech.net");
                    emisor = "amcscaclaracioncontracargousaeur@miatech.net";

                } else {
                    receptores.add("amaclaracionescontracargos@aeromexico.com");
                    emisor = "amaclaracionescontracargos@miatech.net";
                }

//                receptores.add("lmendoza@miatech.net");
                // Emails CC
                List<String> Ccp = new ArrayList<String>();
                String strMails = "jtorres@miatech.net;ggutierrez@miatech.net";//
                if (!strMails.trim().equals("")) {
                    String[] parts = strMails.split(";");
                    for (int i = 0; i < parts.length; i++) {
                        Ccp.add(parts[i]);
                    }
                }
                String asunto = "Aclaraciones Aeromexico";
                String mensaje = "<html><body><br/>Buen día:<br/><br/>"
                        + "Anexo encontraran soporte de los siguientes números de folio que corresponden a las remesas:"
                        + "<br/><br/><table border='2' cellspacing='0' cellpadding='3' style='border: 1px solid black;'>"
                        + "<tr style='background-color: #2196f3'; color: #ffffff;><td align='center'>Folio</td><td align='center'>Remesa</td></tr>" + strTabla
                        + "</table>"
                        + "<br/><br/>Saludos.";
                /*iboolean = proMail.enviaMDP(emisor, asunto, receptores, Ccp, mensaje, lstImagenesAdj, emisor);

                 if (iboolean) {
                 resp.info.add("Email Sent.");
                 } else {
                 resp.info.add("Could not send email!");
                 }*/
                // =================================================================

                // Genera PDF
                for (int i = 0; i < lstImagenesAdj.size(); i++) {
                    ProReportClarification proClarReject = new ProReportClarification();
                    boolean success = proClarReject.createReportPDF(nomAutorizacion.get(lstImagenesAdj.get(i).toString()).toString(), lstImagenesAdj.get(i).toString());

                    if (success) {

                        lstPdfAdj.add(proClarReject.getFile().get(0).getAbsolutePath());
                        lstPdfAdjName.add(proClarReject.getFile().get(0).getName() );
                    } else {
                        //resp.info.add("Could not send email!");
                        msj += " Error. Could not send email!";
                        break;
                    }
                }
                for (int i = 0; i < lstFolioCCAdj.size(); i++) {
                    ProReportClarification proClarRejectCC = new ProReportClarification();
                    boolean success = proClarRejectCC.createReportPDF_CCW(lstFolioCCAdj.get(i).FOLIO, lstFolioCCAdj.get(i));

                    if (success) {

                        lstPdfAdj.add(proClarRejectCC.getFile().get(0).getAbsolutePath());
                        lstPdfAdjName.add(proClarRejectCC.getFile().get(0).getName());
                    } else {
                        //resp.info.add("Could not send email!");
                        msj += " Error. Could not send email!";
                        break;
                    }
                }
                if (!msj.contains("Error")) {

                    DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
                    Date date = new Date();
                    String zipName = "/Dumps/Aclaraciones" + dateFormat.format(date) + ".zip";
//                    FileOutputStream fileZip = new FileOutputStream(zipName);
                    ZipOutputStream os = new ZipOutputStream(new FileOutputStream(zipName));
                    for (int i = 0; i < lstPdfAdj.size(); i++) {
                        ZipEntry entrada = new ZipEntry(lstPdfAdjName.get(i));
                        os.putNextEntry(entrada);

                        FileInputStream fis = new FileInputStream(lstPdfAdj.get(i));
                        byte[] buffer = new byte[1024];
                        int leido = 0;
                        while (0 < (leido = fis.read(buffer))) {
                            os.write(buffer, 0, leido);
                        }

                        fis.close();
                        os.closeEntry();
                    }
                    os.close();
                    List<String> lstPdfAdjZip = new ArrayList<String>();
                    lstPdfAdjZip.add(zipName);

//                    iboolean = proMail.enviaMDP(emisor, asunto, receptores, Ccp, mensaje, lstPdfAdj, emisor);
                    iboolean = proMail.sendEmailMDP(emisor, asunto, receptores, Ccp, mensaje, lstPdfAdjZip, emisor);
                    
                    if (iboolean) {
                        info.add("Email Sent.");
                    } else {
                        info.add("Could not send email!");
                        for (int i = 0; i < listaAclaraciones.size(); i++) {
                            aclaracion = listaAclaraciones.get(i);

                            //Hace la reversión
                            msj = logic.loadPX404SQP01900(aclaracion, "3");
                            msj = "Information could not be updated. (Email)";
                        }
                    }

                } else {
                    for (int i = 0; i < listaAclaraciones.size(); i++) {
                        aclaracion = listaAclaraciones.get(i);

                        //Hace la reversión
                        msj = logic.loadPX404SQP01900(aclaracion, "3");
                        msj = "Information could not be updated. (Pdf)";
                    }
                }
            }

            map.put("msjError", msj);
            map.put("info", info);
            map.put("success", true);
        } catch (Exception ex) {
            logError.error("An error ocurred, pleas try again later.");
            map.put("success", false);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "sendEmail")
    public @ResponseBody
    String sendEmail(ModelMap map, HttpServletRequest request) {
        
        System.out.println("-------------- DataRequestedByBank : sendEmail-------------");
        String listas = "";
        Gson gson = new Gson();
        A2331Filter aclaracion;
        A2331Filter fecha;
        boolean iboolean;
        String msj = "", strTabla = "";
        List<A2331Filter> listaAclaraciones = new ArrayList<>();
        int contador = 0;
        List<A2331Filter> lstFolioCCAdj = new ArrayList<>();
        List<String> lstImagenesAdj = new ArrayList<String>();
        List<String> lstPdfAdj = new ArrayList<String>();
        List<String> lstPdfAdjName = new ArrayList<String>();
        String strCarpeta = "\\\\" + serverSession.getServerSession().getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-MEDIOS-PAGOS\\BDR\\";
        HashMap nomAutorizacion = new HashMap();
        boolean hayUS = false, hayOtPais = false;
        List<String> info = new ArrayList<>(0);
        

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
                        
            listas = request.getParameter("listaRow");
            A2331Filter[] listaxFechaRemesa = gson.fromJson(listas, A2331Filter[].class);

            if (listaxFechaRemesa != null && listaxFechaRemesa.length > 0) {
                for (int x = 0; x < listaxFechaRemesa.length; x++) {
                    fecha = listaxFechaRemesa[x];
//                    if (fecha.STVAL.trim().equals("3")) {
                        //Obtiene la lista de aclaraciones de esa fecha
                        listaAclaraciones = logic.loadPX404SQP01899(fecha);

                        contador = 0;
                        if (listaAclaraciones != null && listaAclaraciones.size() > 0) {
                            for (int i = 0; i < listaAclaraciones.size(); i++) {
                                aclaracion = listaAclaraciones.get(i);
                                
                                // <editor-fold defaultstate="collapsed" desc="Actualiza la informacion">
                                //Actualiza la informacion
//                                if (aclaracion.DATES.trim().isEmpty()) {

//                                    msj = logic.loadPX404SQP01900(aclaracion, "4");
                                    //msj = "SUCCESS";
//                                    if (msj.contains("SUCCESS")) {

                                        contador++;
                                        if (aclaracion.strFlag.trim().equals("CC")) {
                                            //Call Center y Web
                                            A2331Filter beanInfo = logic.loadPX405SQP01958(aclaracion);
                                            lstFolioCCAdj.add(beanInfo);
                                        } else {

                                            lstImagenesAdj.add(strCarpeta + aclaracion.SENTDATE + "\\" + aclaracion.RUTA);
                                            nomAutorizacion.put(strCarpeta + aclaracion.SENTDATE + "\\" + aclaracion.RUTA, aclaracion.AUTHNBR);
                                        }

                                        strTabla += "<tr><td align='center'>" + aclaracion.FOLIO
                                                + "</td><td align='center'>" + aclaracion.SENTDATE + "</td></tr>";
//                                    }

//                                } else {
//                                    msj += " Clarification already sent to BANK. Authorization Nbr: " + aclaracion.AUTHNBR.trim();
//                                }
                                if (aclaracion.SCOUNTRY.trim().equals("US")) {
                                    hayUS = true;
                                } else {
                                    hayOtPais = true;
                                }
                                // </editor-fold>
                            }
                            //if (contador != listaData.size()) {
                            msj += " Clarifications Sent: " + contador;
                            //}

                        } else {
                            msj = "Error. Information not found";
                        }

//                    } else {
//                        msj = "Error : Information is not linked yet.";
//                        break;
//                    }
                }
            } else {
                msj = "Error. There is not information to send.";
            }

            if (!msj.contains("Error") && !msj.contains("ERROR")) {
                //CODIGO DE MAIL Y SU ATTACHMENT
                ProMail proMail = new ProMail();
                List<String> receptores = new ArrayList<String>();
                String emisor = "";
                
                
                if (hayUS && hayOtPais) {
                    receptores.add("amaclaracionescontracargos@aeromexico.com");
                    receptores.add("amcscaclaracioncontracargousaeur@aeromexico.com");
                    emisor = "amaclaracionescontracargos@miatech.net";

                } else if (hayUS) {
//                    receptCores.add("amcscaclaracioncontracargousaeur@aeromexico.com");
                    receptores.add("ealcibari@aeromexico.com");
                    receptores.add("eneves@miatech.net");
                    receptores.add("jtorres@miatech.net");
                    emisor = "amcscaclaracioncontracargousaeur@miatech.net";

                } else {
                    receptores.add("amaclaracionescontracargos@aeromexico.com");
                    emisor = "amaclaracionescontracargos@miatech.net";
                }
                
                
//                receptores.add("jugaz@miatech.net");
//                emisor = "amaclaracionescontracargos@miatech.net";
                
                
                // Emails CC
                List<String> Ccp = new ArrayList<String>();
                String strMails = "jtorres@miatech.net;ggutierrez@miatech.net";//
                if (!strMails.trim().equals("")) {
                    String[] parts = strMails.split(";");
                    for (int i = 0; i < parts.length; i++) {
                        Ccp.add(parts[i]);
                    }
                }
                String asunto = "Aclaraciones Aeromexico";
                String mensaje = "<html><body><br/>Buen día:<br/><br/>"
                        + "Anexo encontraran soporte de los siguientes números de folio que corresponden a las remesas:"
                        + "<br/><br/><table border='2' cellspacing='0' cellpadding='3' style='border: 1px solid black;'>"
                        + "<tr style='background-color: #2196f3'; color: #ffffff;><td align='center'>Folio</td><td align='center'>Remesa</td></tr>" + strTabla
                        + "</table>"
                        + "<br/><br/>Saludos.";
                

                // Genera PDF
                for (int i = 0; i < lstImagenesAdj.size(); i++) {
                    ProReportClarification proClarReject = new ProReportClarification();
                    boolean success = proClarReject.createReportPDF(nomAutorizacion.get(lstImagenesAdj.get(i).toString()).toString(), lstImagenesAdj.get(i).toString());

                    if (success) {

                        lstPdfAdj.add(proClarReject.getFile().get(0).getAbsolutePath());
                        lstPdfAdjName.add(proClarReject.getFile().get(0).getName() );
                    } else {
                        msj += " Error.(Pdf) Could not send email! ";
                        break;
                    }
                }
                for (int i = 0; i < lstFolioCCAdj.size(); i++) {
                    ProReportClarification proClarRejectCC = new ProReportClarification();
                    boolean success = proClarRejectCC.createReportPDF_CCW(lstFolioCCAdj.get(i).FOLIO, lstFolioCCAdj.get(i));

                    if (success) {

                        lstPdfAdj.add(proClarRejectCC.getFile().get(0).getAbsolutePath());
                        lstPdfAdjName.add(proClarRejectCC.getFile().get(0).getName());
                    } else {
                        msj += " Error. Could not send email!";
                        break;
                    }
                }
                
                if (!msj.contains("Error")) {

                    DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
                    Date date = new Date();
                    String zipName = "/Dumps/Aclaraciones" + dateFormat.format(date) + ".zip";
//                    FileOutputStream fileZip = new FileOutputStream(zipName);
                    ZipOutputStream os = new ZipOutputStream(new FileOutputStream(zipName));
                    for (int i = 0; i < lstPdfAdj.size(); i++) {
                        ZipEntry entrada = new ZipEntry(lstPdfAdjName.get(i));
                        os.putNextEntry(entrada);

                        FileInputStream fis = new FileInputStream(lstPdfAdj.get(i));
                        byte[] buffer = new byte[1024];
                        int leido = 0;
                        while (0 < (leido = fis.read(buffer))) {
                            os.write(buffer, 0, leido);
                        }

                        fis.close();
                        os.closeEntry();
                    }
                    os.close();
                    List<String> lstPdfAdjZip = new ArrayList<String>();
                    lstPdfAdjZip.add(zipName);

                    iboolean = proMail.sendEmailMDP(emisor, asunto, receptores, Ccp, mensaje, lstPdfAdjZip, emisor);
                    
                    if (iboolean) {
                        info.add("Email Sent.");
                    } else {
                        msj = "Error Sending Email";
                        /*
                        info.add("Could not send email!");
                        for (int i = 0; i < listaAclaraciones.size(); i++) {
                            aclaracion = listaAclaraciones.get(i);

                            //Hace la reversión
                            msj = logic.loadPX404SQP01900(aclaracion, "3");
                            msj = "Information could not be updated. (Email)";
                        }
                        */
                    }

                } else {
                    msj = "Error Sending Email (Pdf)";
                    /*
                    for (int i = 0; i < listaAclaraciones.size(); i++) {
                        aclaracion = listaAclaraciones.get(i);

                        //Hace la reversión
                        msj = logic.loadPX404SQP01900(aclaracion, "3");
                        msj = "Information could not be updated. (Pdf)";
                    }
                    */
                }
            }

            map.put("msjError", msj);
            map.put("info", info);
            map.put("success", true);
        } catch (Exception ex) {
            logError.error("An error ocurred, pleas try again later.");
            map.put("success", false);
            map.put("msjError", msj);
        }
        return new Gson().toJson(map);
    }
    
    
    
    

    @RequestMapping(value = "exportHistorical")
    public @ResponseBody
    void exportHistorical(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("DataRequestedByBank : exportHistorical");
        String fileNameDownload = String.format("RequestedBank_Historical  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());

        List<A2331Filter> listaData = new ArrayList<>(0);
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");

            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            listaData = logic.loadPX404SQP01948(filter);

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

            CH1_0.setCellValue("Reception Date");
            CH1_1.setCellValue("Merchant");
            CH1_2.setCellValue("Sales Date");
            CH1_3.setCellValue("Card Number");
            CH1_4.setCellValue("Reason Code");
            CH1_5.setCellValue("Motive");
            CH1_6.setCellValue("Amount MXN");
            CH1_7.setCellValue("Authorization");
            CH1_8.setCellValue("Folio");
            CH1_9.setCellValue("AM Expiration Date");
            CH1_10.setCellValue("Merchant Name");
            CH1_11.setCellValue("Tickets");
            CH1_12.setCellValue("Sales Agent");
            CH1_13.setCellValue("Status");

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

                rcell0.setCellValue(listaData.get(vi).SENTDATE);
                rcell1.setCellValue(listaData.get(vi).MERCHN);
                rcell2.setCellValue(listaData.get(vi).SALEDATE);
                rcell3.setCellValue(listaData.get(vi).strDescripcion);
                rcell4.setCellValue(listaData.get(vi).CODMOTI);
                rcell5.setCellValue(listaData.get(vi).CLINAME);
                rcell6.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell7.setCellValue(listaData.get(vi).AUTHNBR);
                rcell8.setCellValue(listaData.get(vi).FOLIO);
                rcell9.setCellValue(listaData.get(vi).strFormatDate);
                rcell10.setCellValue(listaData.get(vi).MERCHNAM);
                rcell11.setCellValue(listaData.get(vi).strTicket);
                rcell12.setCellValue(listaData.get(vi).AGENTE);
                rcell13.setCellValue(listaData.get(vi).STUSO);
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
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload + "\"");

            FileOutputStream fos = new FileOutputStream(file.getAbsolutePath());
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "exportHistoricalBN")
    public @ResponseBody
    void exportHistoricalBN(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        System.out.println("-------------- DataRequestedByBank : exportHistoricalBN-------------");

        String rutaFile = this.serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        List<A2331Filter> listaData;
        double dblTotCC = 0, dblTotWEB = 0;
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

//        HashMap hmCANAL = new HashMap();
//        hmCANAL.put("FRA", "FRANQUICIAS");
//        hmCANAL.put("ATO", "AEROPUERTO");
//        hmCANAL.put("CTO", "CTO");
//        hmCANAL.put("WEB", "INTERNET");
//        hmCANAL.put("CCT", "CALL CENTER");
        //strTitulo   Reempolazo de hmCANAL
        try {

            DataRequestedByBankLogic logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            listaData = logic.loadPX404SQP03648(filter);

            String strFileName = "Requested_Historical_BN_" + Functions.getFechaActual() + "_" + Functions.getHoraActual() + ".xls";

            HSSFWorkbook workbook = null;
            File file = new File(rutaFile + "\\" + strFileName);
            if (file.exists()) {
                file.delete();
            }

            if (listaData.size() > 0) {

                workbook = new HSSFWorkbook();

                String quiebreHoja = "", quiebreCanal = "";
                A2331Filter bean = listaData.get(0);

                HSSFSheet sheet = workbook.createSheet(bean.SCARCOD.trim());

                Map<String, HSSFCellStyle> styles = createStyles(workbook);
                String styleName;

                sheet.setColumnWidth(0, 17 * 500);
                sheet.setColumnWidth(1, 7 * 500);
                sheet.setColumnWidth(2, 9 * 500);
                sheet.setColumnWidth(3, 7 * 500);
                sheet.setColumnWidth(4, 20 * 500);
                sheet.setColumnWidth(5, 13 * 500);
                sheet.setColumnWidth(6, 9 * 500);
                sheet.setColumnWidth(7, 30 * 500);
                sheet.setColumnWidth(8, 13 * 500);
                sheet.setColumnWidth(9, 7 * 500);
                sheet.setColumnWidth(10, 7 * 500);
                sheet.setColumnWidth(11, 7 * 500);

                //Título Superior ==============================================
                HSSFRow rowTitS = sheet.createRow(0);
                rowTitS.setHeight((short) 500);
                HSSFCell cabTitS = rowTitS.createCell(0);
//                cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + hmCANAL.get(bean.strCANAL).toString());
                cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo.toString());
                cabTitS.setCellStyle(styles.get("cell_b_centered"));
                HSSFCell cabTitS11 = rowTitS.createCell(12);
                cabTitS11.setCellValue(" ");
                //rowFrom,rowTo,colFrom,colTo
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));

                //Títulos Grilla ===============================================
                HSSFRow rowcab = sheet.createRow(1);
                rowcab.setHeight((short) 500);
                HSSFCell cab1 = rowcab.createCell(0);
                HSSFCell cab2 = rowcab.createCell(1);
                HSSFCell cab3 = rowcab.createCell(2);
                HSSFCell cab4 = rowcab.createCell(3);
                HSSFCell cab5 = rowcab.createCell(4);
                HSSFCell cab6 = rowcab.createCell(5);
                HSSFCell cabAN = rowcab.createCell(6);
                HSSFCell cab7 = rowcab.createCell(7);
                HSSFCell cab8 = rowcab.createCell(8);
                HSSFCell cab9 = rowcab.createCell(9);
                HSSFCell cab10 = rowcab.createCell(10);
                HSSFCell cab11 = rowcab.createCell(11);

                styleName = "header";

                cab1.setCellValue("Merchant Name");
                cab1.setCellStyle(styles.get(styleName));
                cab2.setCellValue("Merchant");
                cab2.setCellStyle(styles.get(styleName));
                cab3.setCellValue("Amount MXN");
                cab3.setCellStyle(styles.get(styleName));
                cab4.setCellValue("Application Date");
                cab4.setCellStyle(styles.get(styleName));
                cab5.setCellValue("Concept");
                cab5.setCellStyle(styles.get(styleName));
                cab6.setCellValue("Card Number");
                cab6.setCellStyle(styles.get(styleName));
                cabAN.setCellValue("Authorization Number");
                cabAN.setCellStyle(styles.get(styleName));
                cab7.setCellValue("Ticket(s)");
                cab7.setCellStyle(styles.get(styleName));
                cab8.setCellValue("Status");
                cab8.setCellStyle(styles.get(styleName));
                cab9.setCellValue("Sales Date");
                cab9.setCellStyle(styles.get(styleName));
                cab10.setCellValue("Sending Date");
                cab10.setCellStyle(styles.get(styleName));
                cab11.setCellValue("Bank");
                cab11.setCellStyle(styles.get(styleName));

                Integer cont = 2;
                for (int a = 0; a < listaData.size(); a++) {
                    bean = listaData.get(a);

                    //QUIEBRE POR CANAL ========================================
                    if (!quiebreCanal.trim().isEmpty() && !quiebreCanal.trim().equals(bean.strCANAL.trim())) {
                        HSSFRow rowTot = sheet.createRow(cont);
                        HSSFCell cellT0 = rowTot.createCell(0);
                        HSSFCell cellT1 = rowTot.createCell(1);
                        HSSFCell cellT2 = rowTot.createCell(2);
                        styleName = "cell_b_centered";
                        cellT0.setCellValue(" ");
                        cellT0.setCellStyle(styles.get(styleName));
                        cellT1.setCellValue("TOTAL");
                        cellT1.setCellStyle(styles.get(styleName));

                        styleName = "cell_totals_right";
                        if (quiebreCanal.equals("CCT")) {
                            cellT2.setCellValue(dblTotCC);
                            dblTotCC = 0;
                        } else {
                            cellT2.setCellValue(dblTotWEB);
                            dblTotWEB = 0;
                        }
                        cellT2.setCellStyle(styles.get(styleName));
                        ++cont;
                        //LINEA EN BLANCO ======================================
                        HSSFRow rowLB1 = sheet.createRow(cont);
                        HSSFCell cellLB10 = rowLB1.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB10.setCellValue(" ");
                        cellLB10.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB2 = sheet.createRow(cont);
                        HSSFCell cellLB20 = rowLB2.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB20.setCellValue(" ");
                        cellLB20.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB3 = sheet.createRow(cont);
                        HSSFCell cellLB30 = rowLB3.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB30.setCellValue(" ");
                        cellLB30.setCellStyle(styles.get(styleName));
                        ++cont;

                        if (quiebreHoja.trim().equals(bean.SCARCOD.trim())) {
                            //Título Superior ======================================
                            HSSFRow rowTitS2 = sheet.createRow(cont);
                            rowTitS2.setHeight((short) 500);
                            HSSFCell cabTitS2 = rowTitS2.createCell(0);
                            cabTitS2.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo.trim());
                            cabTitS2.setCellStyle(styles.get("cell_b_centered"));
                            HSSFCell cabTitS2_11 = rowTitS2.createCell(12);
                            cabTitS2_11.setCellValue(" ");
                            //rowFrom,rowTo,colFrom,colTo
                            sheet.addMergedRegion(new CellRangeAddress(cont, cont, 0, 10));
                            ++cont;

                            //Títulos Grilla =======================================
                            HSSFRow rowcab2 = sheet.createRow(cont);
                            rowcab2.setHeight((short) 500);
                            HSSFCell cab12 = rowcab2.createCell(0);
                            HSSFCell cab22 = rowcab2.createCell(1);
                            HSSFCell cab32 = rowcab2.createCell(2);
                            HSSFCell cab42 = rowcab2.createCell(3);
                            HSSFCell cab52 = rowcab2.createCell(4);
                            HSSFCell cab62 = rowcab2.createCell(5);
                            HSSFCell cab2AN = rowcab.createCell(6);
                            HSSFCell cab72 = rowcab2.createCell(7);
                            HSSFCell cab82 = rowcab2.createCell(8);
                            HSSFCell cab92 = rowcab2.createCell(9);
                            HSSFCell cab102 = rowcab2.createCell(10);
                            HSSFCell cab112 = rowcab2.createCell(11);

                            styleName = "header";

                            cab12.setCellValue("Merchant Name");
                            cab12.setCellStyle(styles.get(styleName));
                            cab22.setCellValue("Merchant");
                            cab22.setCellStyle(styles.get(styleName));
                            cab32.setCellValue("Amount MXN");
                            cab32.setCellStyle(styles.get(styleName));
                            cab42.setCellValue("Application Date");
                            cab42.setCellStyle(styles.get(styleName));
                            cab52.setCellValue("Concept");
                            cab52.setCellStyle(styles.get(styleName));
                            cab62.setCellValue("Card Number");
                            cab62.setCellStyle(styles.get(styleName));
                            cab2AN.setCellValue("Authorization Number");
                            cab2AN.setCellStyle(styles.get(styleName));
                            cab72.setCellValue("Ticket(s)");
                            cab72.setCellStyle(styles.get(styleName));
                            cab82.setCellValue("Status");
                            cab82.setCellStyle(styles.get(styleName));
                            cab92.setCellValue("Sales Date");
                            cab92.setCellStyle(styles.get(styleName));
                            cab102.setCellValue("Sending Date");
                            cab102.setCellStyle(styles.get(styleName));
                            cab112.setCellValue("Bank");
                            cab112.setCellStyle(styles.get(styleName));
                            ++cont;
                        }
                    }

                    if (!quiebreHoja.trim().isEmpty() && !quiebreHoja.trim().equals(bean.SCARCOD.trim())) {

                        //======================================================
                        //======================================================
                        //Creando nueva hoja y sus respectivos títulos.
                        sheet = workbook.createSheet(bean.SCARCOD.trim());

                        sheet.setColumnWidth(0, 17 * 500);
                        sheet.setColumnWidth(1, 7 * 500);
                        sheet.setColumnWidth(2, 9 * 500);
                        sheet.setColumnWidth(3, 7 * 500);
                        sheet.setColumnWidth(4, 20 * 500);
                        sheet.setColumnWidth(5, 13 * 500);
                        sheet.setColumnWidth(6, 9 * 500);
                        sheet.setColumnWidth(7, 30 * 500);
                        sheet.setColumnWidth(8, 13 * 500);
                        sheet.setColumnWidth(9, 7 * 500);
                        sheet.setColumnWidth(10, 7 * 500);
                        sheet.setColumnWidth(11, 7 * 500);

                        //Título Superior ======================================
                        rowTitS = sheet.createRow(0);
                        rowTitS.setHeight((short) 500);
                        cabTitS = rowTitS.createCell(0);
                        cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo);
                        cabTitS.setCellStyle(styles.get("cell_b_centered"));
                        cabTitS11 = rowTitS.createCell(12);
                        cabTitS11.setCellValue(" ");

                        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));
                        //rowFrom,rowTo,colFrom,colTo

                        //Títulos Grilla =======================================
                        rowcab = sheet.createRow(1);
                        rowcab.setHeight((short) 500);
                        cab1 = rowcab.createCell(0);
                        cab2 = rowcab.createCell(1);
                        cab3 = rowcab.createCell(2);
                        cab4 = rowcab.createCell(3);
                        cab5 = rowcab.createCell(4);
                        cab6 = rowcab.createCell(5);
                        cabAN = rowcab.createCell(6);
                        cab7 = rowcab.createCell(7);
                        cab8 = rowcab.createCell(8);
                        cab9 = rowcab.createCell(9);
                        cab10 = rowcab.createCell(10);
                        cab11 = rowcab.createCell(11);

                        styleName = "header";

                        cab1.setCellValue("Merchant Name");
                        cab1.setCellStyle(styles.get(styleName));
                        cab2.setCellValue("Merchant");
                        cab2.setCellStyle(styles.get(styleName));
                        cab3.setCellValue("Amount MXN");
                        cab3.setCellStyle(styles.get(styleName));
                        cab4.setCellValue("Application Date");
                        cab4.setCellStyle(styles.get(styleName));
                        cab5.setCellValue("Concept");
                        cab5.setCellStyle(styles.get(styleName));
                        cab6.setCellValue("Card Number");
                        cab6.setCellStyle(styles.get(styleName));
                        cabAN.setCellValue("Authorization Number");
                        cabAN.setCellStyle(styles.get(styleName));
                        cab7.setCellValue("Ticket(s)");
                        cab7.setCellStyle(styles.get(styleName));
                        cab8.setCellValue("Status");
                        cab8.setCellStyle(styles.get(styleName));
                        cab9.setCellValue("Sales Date");
                        cab9.setCellStyle(styles.get(styleName));
                        cab10.setCellValue("Sending Date");
                        cab10.setCellStyle(styles.get(styleName));
                        cab11.setCellValue("Bank");
                        cab11.setCellStyle(styles.get(styleName));

                        cont = 2;
                        dblTotCC = 0;
                        dblTotWEB = 0;
                    }

                    HSSFRow row = sheet.createRow(cont);
                    HSSFCell cell0 = row.createCell(0);
                    HSSFCell cell1 = row.createCell(1);
                    HSSFCell cell2 = row.createCell(2);
                    HSSFCell cell3 = row.createCell(3);
                    HSSFCell cell4 = row.createCell(4);
                    HSSFCell cell5 = row.createCell(5);
                    HSSFCell call2AN = row.createCell(6);
                    HSSFCell cell6 = row.createCell(7);
                    HSSFCell cell7 = row.createCell(8);
                    HSSFCell cell8 = row.createCell(9);
                    HSSFCell cell9 = row.createCell(10);
                    HSSFCell cell10 = row.createCell(11);

                    styleName = "cell_normal_centered";
                    cell0.setCellValue(bean.MERCHNAM);
                    cell0.setCellStyle(styles.get(styleName));
                    cell1.setCellValue(bean.MERCHN);
                    cell1.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_formato_right";
                    cell2.setCellValue(bean.AUTAMOUNT);
                    cell2.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_centered";
                    cell3.setCellValue(bean.APLIDATE);
                    cell3.setCellStyle(styles.get(styleName));
                    cell4.setCellValue(bean.CONCEPT);
                    cell4.setCellStyle(styles.get(styleName));
                    cell5.setCellValue(bean.strDescripcion);
                    cell5.setCellStyle(styles.get(styleName));
                    cell6.setCellValue(bean.strTicket);
                    cell6.setCellStyle(styles.get(styleName));
                    call2AN.setCellValue(bean.AUTHNBR);
                    call2AN.setCellStyle(styles.get(styleName));
                    cell7.setCellValue(bean.STUSOS);
                    cell7.setCellStyle(styles.get(styleName));
                    cell8.setCellValue(bean.SALEDATE);
                    cell8.setCellStyle(styles.get(styleName));
                    cell9.setCellValue(bean.FECR);
                    cell9.setCellStyle(styles.get(styleName));
                    cell10.setCellValue(bean.strDescBank);
                    cell10.setCellStyle(styles.get(styleName));

                    if (bean.strCANAL.equals("CCT")) {
                        //CALL CENTER
                        dblTotCC += bean.AUTAMOUNT;
                    } else {
                        //WEB
                        dblTotWEB += bean.AUTAMOUNT;
                    }

                    ++cont;
                    quiebreHoja = bean.SCARCOD.trim();
                    quiebreCanal = bean.strCANAL.trim();

                }

                //COLOCANDO TOTAL DE LA HOJA ANTERIOR POR CANAL ========
                HSSFRow rowTot = sheet.createRow(cont);
                HSSFCell cellT0 = rowTot.createCell(0);
                HSSFCell cellT1 = rowTot.createCell(1);
                HSSFCell cellT2 = rowTot.createCell(2);
                styleName = "cell_b_centered";
                cellT0.setCellValue(" ");
                cellT0.setCellStyle(styles.get(styleName));
                cellT1.setCellValue("TOTAL");
                cellT1.setCellStyle(styles.get(styleName));

                styleName = "cell_totals_right";
                if (quiebreCanal.equals("CCT")) {
                    cellT2.setCellValue(dblTotCC);
                    dblTotCC = 0;
                } else {
                    cellT2.setCellValue(dblTotWEB);
                    dblTotWEB = 0;
                }
                cellT2.setCellStyle(styles.get(styleName));

//                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
//                workbook.write(fos);
//                fos.close();
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + strFileName + "\"");

                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
                workbook.write(response.getOutputStream());
                fos.close();
            }
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "exportChargeBack")
    public @ResponseBody
    void exportChargeBack(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        System.out.println("-------------- DataRequestedByBank : exportChargeBack-------------");

        String rutaFile = this.serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        
        List<ExcelChargeBack> listaDataTemp = new ArrayList<ExcelChargeBack>();
        List<ExcelChargeBack> listaDataTotal = new ArrayList<ExcelChargeBack>();
        List<ExcelChargeBack> listaDataParcial = new ArrayList<ExcelChargeBack>();
        
        int lstSize = 0;
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            DataRequestedByBankLogic logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;
            
            listaDataTotal = logic.loadPX404SQP03580(filter, "T");
            listaDataParcial = logic.loadPX404SQP03580(filter, "P");

            String strFileName = Functions.getFechaActual() + Functions.getHoraActual() + ".xls";

            HSSFWorkbook workbook = null;
            File file = new File(rutaFile + "\\" + strFileName);
            if (file.exists()) {
                file.delete();
            }

            String nombreHoja = "";
            workbook = new HSSFWorkbook();

            for (int z = 0; z < 2; z++) {

                listaDataTemp = listaDataTotal;
                nombreHoja = "Total";
                if (z == 1) {
                    listaDataTemp = listaDataParcial;
                    nombreHoja = "Parcial";
                }

                HSSFSheet sheet = workbook.createSheet(nombreHoja);

                Map<String, HSSFCellStyle> styles = createStyles(workbook);
                String styleName;

                //                sheet.setColumnWidth(0, 17 * 500);
                //                sheet.setColumnWidth(1, 7 * 500);
                //                sheet.setColumnWidth(2, 9 * 500);
                //                sheet.setColumnWidth(3, 7 * 500);
                //                sheet.setColumnWidth(4, 20 * 500);
                //                sheet.setColumnWidth(5, 13 * 500);
                //                sheet.setColumnWidth(6, 30 * 500);
                //                sheet.setColumnWidth(7, 13 * 500);
                //                sheet.setColumnWidth(8, 7 * 500);
                //                sheet.setColumnWidth(9, 7 * 500);
                //                sheet.setColumnWidth(10, 7 * 500);
                //Título Superior ==============================================
                HSSFRow rowTit1 = sheet.createRow(0);
                //                rowTit1.setHeight((short) 500);
                HSSFCell cellTit1 = rowTit1.createCell(0);
                cellTit1.setCellValue("TICKET INFORMATION");
                cellTit1.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 0, 7), sheet, workbook);

                HSSFCell cellTit2 = rowTit1.createCell(8);
                cellTit2.setCellValue("FORMA DE PAGO");
                cellTit2.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 15));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 8, 15), sheet, workbook);

                HSSFCell cellTit3 = rowTit1.createCell(16);
                cellTit3.setCellValue("TARIFA");
                cellTit3.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 19));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 16, 19), sheet, workbook);

                HSSFCell cellTit4 = rowTit1.createCell(20);
                cellTit4.setCellValue("TAXES/PENALIDAD");
                cellTit4.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 61));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 20, 61), sheet, workbook);

                HSSFCell cellTit5 = rowTit1.createCell(62);
                cellTit5.setCellValue("TOTAL");
                cellTit5.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 1, 62, 62));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 1, 62, 62), sheet, workbook);
                RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, new CellRangeAddress(0, 1, 62, 62), sheet, workbook);
                RegionUtil.setBorderRight(CellStyle.BORDER_THIN, new CellRangeAddress(0, 1, 62, 62), sheet, workbook);

                HSSFCell cellTit6 = rowTit1.createCell(63);
                cellTit6.setCellValue("COMISION");
                cellTit6.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 63, 64));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 63, 65), sheet, workbook);

                HSSFCell cellTit7 = rowTit1.createCell(65);
                cellTit7.setCellValue("TAX ON");
                cellTit7.setCellStyle(styles.get("cell_b_titulo"));
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 65, 66));
                RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, new CellRangeAddress(0, 0, 66, 67), sheet, workbook);

                //                
                //rowFrom,rowTo,colFrom,colTo
                //                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));
                //Títulos Grilla ===============================================
                HSSFRow rowcab = sheet.createRow(1);
                rowcab.setHeight((short) 500);
                HSSFCell cab1 = rowcab.createCell(0);
                HSSFCell cab2 = rowcab.createCell(1);
                HSSFCell cab3 = rowcab.createCell(2);
                HSSFCell cab4 = rowcab.createCell(3);
                HSSFCell cab5 = rowcab.createCell(4);
                HSSFCell cab6 = rowcab.createCell(5);
                HSSFCell cab7 = rowcab.createCell(6);
                HSSFCell cab8 = rowcab.createCell(7);

                styleName = "cell_b_titulo";

                cab1.setCellValue("TKT");
                cab1.setCellStyle(styles.get(styleName));
                cab2.setCellValue("REFERENCE");
                cab2.setCellStyle(styles.get(styleName));
                cab3.setCellValue("IATA");
                cab3.setCellStyle(styles.get(styleName));
                cab4.setCellValue("MONEDA");
                cab4.setCellStyle(styles.get(styleName));
                cab5.setCellValue("Transc");
                cab5.setCellStyle(styles.get(styleName));
                cab6.setCellValue("TDoc");
                cab6.setCellStyle(styles.get(styleName));
                cab7.setCellValue("F.Venta");
                cab7.setCellStyle(styles.get(styleName));
                cab8.setCellValue("Cpn");
                cab8.setCellStyle(styles.get(styleName));

                HSSFCell cab9 = rowcab.createCell(8);
                cab9.setCellValue("FOP1");
                cab9.setCellStyle(styles.get(styleName));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 11));

                HSSFCell cab10 = rowcab.createCell(12);
                cab10.setCellValue("FOP2");
                cab10.setCellStyle(styles.get(styleName));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 15));

                HSSFCell cab11 = rowcab.createCell(16);
                cab11.setCellValue("FARE");
                cab11.setCellStyle(styles.get(styleName));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 16, 17));

                HSSFCell cab12 = rowcab.createCell(18);
                cab12.setCellValue("EQV.");
                cab12.setCellStyle(styles.get(styleName));
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 18, 19));

                int sig = 20;
                for (int c = 1; c <= 14; c++) {

                    HSSFCell col = rowcab.createCell(sig);
                    col.setCellValue("TAX " + c + "(COD,ATO,VAL)");
                    col.setCellStyle(styles.get(styleName));
                    sheet.addMergedRegion(new CellRangeAddress(1, 1, sig, sig + 2));
                    //                    RegionUtil.setBorderTop(CellStyle.BORDER_THIN, new CellRangeAddress(1, 1, sig, sig + 1), sheet, workbook);
                    sig = sig + 3;
                }

                //rowFrom,rowTo,colFrom,colTo
                HSSFCell cab24 = rowcab.createCell(63);
                cab24.setCellValue("RATE");
                cab24.setCellStyle(styles.get(styleName));
                //                sheet.addMergedRegion(new CellRangeAddress(1, 1, 47, 48));

                HSSFCell cab25 = rowcab.createCell(64);
                cab25.setCellValue("VALOR");
                cab25.setCellStyle(styles.get(styleName));
                //                sheet.addMergedRegion(new CellRangeAddress(1, 1, 49, 50));

                HSSFCell cab26 = rowcab.createCell(65);
                cab26.setCellValue("RATE");
                cab26.setCellStyle(styles.get(styleName));
                //                sheet.addMergedRegion(new CellRangeAddress(1, 1, 47, 48));

                HSSFCell cab27 = rowcab.createCell(66);
                cab27.setCellValue("VALOR");
                cab27.setCellStyle(styles.get(styleName));

                if (listaDataTemp.size() > 0) {
                    lstSize = listaDataTemp.size();
                    ExcelChargeBack bean = listaDataTemp.get(0);

                    Integer cont = 2;
                    for (int a = 0; a < listaDataTemp.size(); a++) {
                        bean = listaDataTemp.get(a);

                        HSSFRow row = sheet.createRow(a + 2);
                        HSSFCell cell0 = row.createCell(0);
                        HSSFCell cell1 = row.createCell(1);
                        HSSFCell cell2 = row.createCell(2);
                        HSSFCell cell3 = row.createCell(3);
                        HSSFCell cell4 = row.createCell(4);
                        HSSFCell cell5 = row.createCell(5);
                        HSSFCell cell6 = row.createCell(6);
                        HSSFCell cell7 = row.createCell(7);
                        HSSFCell cell8 = row.createCell(8);
                        HSSFCell cell9 = row.createCell(9);
                        HSSFCell cell10 = row.createCell(10);
                        HSSFCell cell11 = row.createCell(11);
                        HSSFCell cell12 = row.createCell(12);
                        HSSFCell cell13 = row.createCell(13);
                        HSSFCell cell14 = row.createCell(14);
                        HSSFCell cell15 = row.createCell(15);

                        HSSFCell cell16 = row.createCell(16);
                        HSSFCell cell17 = row.createCell(17);
                        HSSFCell cell18 = row.createCell(18);
                        HSSFCell cell19 = row.createCell(19);
                        HSSFCell cell20 = row.createCell(20);
                        HSSFCell cell21 = row.createCell(21);
                        HSSFCell cell22 = row.createCell(22);
                        HSSFCell cell23 = row.createCell(23);
                        HSSFCell cell24 = row.createCell(24);
                        HSSFCell cell25 = row.createCell(25);
                        HSSFCell cell26 = row.createCell(26);
                        HSSFCell cell27 = row.createCell(27);
                        HSSFCell cell28 = row.createCell(28);
                        HSSFCell cell29 = row.createCell(29);
                        HSSFCell cell30 = row.createCell(30);
                        HSSFCell cell31 = row.createCell(31);
                        HSSFCell cell32 = row.createCell(32);
                        HSSFCell cell33 = row.createCell(33);
                        HSSFCell cell34 = row.createCell(34);
                        HSSFCell cell35 = row.createCell(35);
                        HSSFCell cell36 = row.createCell(36);
                        HSSFCell cell37 = row.createCell(37);
                        HSSFCell cell38 = row.createCell(38);
                        HSSFCell cell39 = row.createCell(39);
                        HSSFCell cell40 = row.createCell(40);
                        HSSFCell cell41 = row.createCell(41);
                        HSSFCell cell42 = row.createCell(42);
                        HSSFCell cell43 = row.createCell(43);
                        HSSFCell cell44 = row.createCell(44);
                        HSSFCell cell45 = row.createCell(45);
                        HSSFCell cell46 = row.createCell(46);
                        HSSFCell cell47 = row.createCell(47);
                        HSSFCell cell48 = row.createCell(48);
                        HSSFCell cell49 = row.createCell(49);
                        HSSFCell cell50 = row.createCell(50);
                        HSSFCell cell51 = row.createCell(51);
                        HSSFCell cell52 = row.createCell(52);

                        HSSFCell cell53 = row.createCell(53);
                        HSSFCell cell54 = row.createCell(54);
                        HSSFCell cell55 = row.createCell(55);
                        HSSFCell cell56 = row.createCell(56);
                        HSSFCell cell57 = row.createCell(57);
                        HSSFCell cell58 = row.createCell(58);
                        HSSFCell cell59 = row.createCell(59);
                        HSSFCell cell60 = row.createCell(60);
                        HSSFCell cell61 = row.createCell(61);
                        HSSFCell cell62 = row.createCell(62);
                        HSSFCell cell63 = row.createCell(63);
                        HSSFCell cell64 = row.createCell(64);
                        HSSFCell cell65 = row.createCell(65);
                        HSSFCell cell66 = row.createCell(66);

                        styleName = "cell_celda";
                        cell0.setCellValue(bean.strTicket);
                        cell0.setCellStyle(styles.get(styleName));

                        styleName = "cell_celda";
                        cell1.setCellValue(bean.NUMREFER);
                        cell1.setCellStyle(styles.get(styleName));

                        styleName = "cell_celda";
                        cell2.setCellValue(bean.AGENTE);
                        cell2.setCellStyle(styles.get(styleName));
                        cell3.setCellValue(bean.MFOP);
                        cell3.setCellStyle(styles.get(styleName));
                        cell4.setCellValue(bean.TDOC);
                        cell4.setCellStyle(styles.get(styleName));
                        cell5.setCellValue(bean.TPDOC);
                        cell5.setCellStyle(styles.get(styleName));
                        cell6.setCellValue(bean.strFormatDate);
                        cell6.setCellStyle(styles.get(styleName));
                        cell7.setCellValue(bean.CUPON);
                        cell7.setCellStyle(styles.get(styleName));

                        cell8.setCellValue(bean.A1531CFOP1);
                        cell8.setCellStyle(styles.get(styleName));
                        cell9.setCellValue(bean.A1531TFOP1);
                        cell9.setCellStyle(styles.get(styleName));
                        cell10.setCellValue(bean.A1531NREF1);
                        cell10.setCellStyle(styles.get(styleName));
                        cell11.setCellValue(bean.A1531VFOP1);
                        cell11.setCellStyle(styles.get(styleName));
                        cell12.setCellValue(bean.A1531CFOP2);
                        cell12.setCellStyle(styles.get(styleName));
                        cell13.setCellValue(bean.A1531TFOP2);
                        cell13.setCellStyle(styles.get(styleName));
                        cell14.setCellValue(bean.A1531NREF2);
                        cell14.setCellStyle(styles.get(styleName));
                        cell15.setCellValue(bean.A1531VFOP2);
                        cell15.setCellStyle(styles.get(styleName));

                        cell16.setCellValue(bean.A720MONEDA);
                        cell16.setCellStyle(styles.get(styleName));
                        cell17.setCellValue(bean.A720TARIFA);
                        cell17.setCellStyle(styles.get(styleName));
                        cell18.setCellValue(bean.A720MDAPAG);
                        cell18.setCellStyle(styles.get(styleName));
                        cell19.setCellValue(bean.A720TRFPAG);
                        cell19.setCellStyle(styles.get(styleName));

                        cell20.setCellValue(bean.CTAX1);
                        cell20.setCellStyle(styles.get(styleName));
                        cell21.setCellValue(bean.ATO1);
                        cell21.setCellStyle(styles.get(styleName));
                        cell22.setCellValue(bean.VTAX1);
                        cell22.setCellStyle(styles.get(styleName));
                        cell23.setCellValue(bean.CTAX2);
                        cell23.setCellStyle(styles.get(styleName));
                        cell24.setCellValue(bean.ATO2);
                        cell24.setCellStyle(styles.get(styleName));
                        cell25.setCellValue(bean.VTAX2);
                        cell25.setCellStyle(styles.get(styleName));
                        cell26.setCellValue(bean.CTAX3);
                        cell26.setCellStyle(styles.get(styleName));
                        cell27.setCellValue(bean.ATO3);
                        cell27.setCellStyle(styles.get(styleName));
                        cell28.setCellValue(bean.VTAX3);
                        cell28.setCellStyle(styles.get(styleName));

                        cell29.setCellValue(bean.CTAX4);
                        cell29.setCellStyle(styles.get(styleName));
                        cell30.setCellValue(bean.ATO4);
                        cell30.setCellStyle(styles.get(styleName));
                        cell31.setCellValue(bean.VTAX4);
                        cell31.setCellStyle(styles.get(styleName));
                        cell32.setCellValue(bean.CTAX5);
                        cell32.setCellStyle(styles.get(styleName));
                        cell33.setCellValue(bean.ATO5);
                        cell33.setCellStyle(styles.get(styleName));
                        cell34.setCellValue(bean.VTAX5);
                        cell34.setCellStyle(styles.get(styleName));
                        cell35.setCellValue(bean.CTAX6);
                        cell35.setCellStyle(styles.get(styleName));
                        cell36.setCellValue(bean.ATO6);
                        cell36.setCellStyle(styles.get(styleName));
                        cell37.setCellValue(bean.VTAX6);
                        cell37.setCellStyle(styles.get(styleName));
                        cell38.setCellValue(bean.CTAX7);
                        cell38.setCellStyle(styles.get(styleName));
                        cell39.setCellValue(bean.ATO7);
                        cell39.setCellStyle(styles.get(styleName));
                        cell40.setCellValue(bean.VTAX7);
                        cell40.setCellStyle(styles.get(styleName));
                        cell41.setCellValue(bean.CTAX8);
                        cell41.setCellStyle(styles.get(styleName));
                        cell42.setCellValue(bean.ATO8);
                        cell42.setCellStyle(styles.get(styleName));
                        cell43.setCellValue(bean.VTAX8);
                        cell43.setCellStyle(styles.get(styleName));
                        cell44.setCellValue(bean.CTAX9);
                        cell44.setCellStyle(styles.get(styleName));
                        cell45.setCellValue(bean.ATO9);
                        cell45.setCellStyle(styles.get(styleName));
                        cell46.setCellValue(bean.VTAX9);
                        cell46.setCellStyle(styles.get(styleName));
                        cell47.setCellValue(bean.CTAX10);
                        cell47.setCellStyle(styles.get(styleName));
                        cell48.setCellValue(bean.ATO10);
                        cell48.setCellStyle(styles.get(styleName));
                        cell49.setCellValue(bean.VTAX10);
                        cell49.setCellStyle(styles.get(styleName));
                        cell50.setCellValue(bean.CTAX11);
                        cell50.setCellStyle(styles.get(styleName));
                        cell51.setCellValue(bean.ATO11);
                        cell51.setCellStyle(styles.get(styleName));
                        cell52.setCellValue(bean.VTAX11);
                        cell52.setCellStyle(styles.get(styleName));
                        cell53.setCellValue(bean.CTAX12);
                        cell53.setCellStyle(styles.get(styleName));
                        cell54.setCellValue(bean.ATO12);
                        cell54.setCellStyle(styles.get(styleName));
                        cell55.setCellValue(bean.VTAX12);
                        cell55.setCellStyle(styles.get(styleName));
                        cell56.setCellValue(bean.CTAX13);
                        cell56.setCellStyle(styles.get(styleName));
                        cell57.setCellValue(bean.ATO13);
                        cell57.setCellStyle(styles.get(styleName));
                        cell58.setCellValue(bean.VTAX13);
                        cell58.setCellStyle(styles.get(styleName));
                        cell59.setCellValue(bean.CTAX14);
                        cell59.setCellStyle(styles.get(styleName));
                        cell60.setCellValue(bean.ATO14);
                        cell60.setCellStyle(styles.get(styleName));
                        cell61.setCellValue(bean.VTAX14);
                        cell61.setCellStyle(styles.get(styleName));
                        //                    
                        //                    
                        cell62.setCellValue(bean.TOTAL);
                        cell62.setCellStyle(styles.get(styleName));
                        cell63.setCellValue(bean.RATE1);
                        cell63.setCellStyle(styles.get(styleName));
                        cell64.setCellValue(bean.VALOR1);
                        cell64.setCellStyle(styles.get(styleName));
                        cell65.setCellValue(bean.RATE2);
                        cell65.setCellStyle(styles.get(styleName));
                        cell66.setCellValue(bean.VALOR2);
                        cell66.setCellStyle(styles.get(styleName));

                    }
                    for (int s = 0; s <= 66; s++) {
                        sheet.autoSizeColumn(s);
                    }
                }
            }

//            FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
//            workbook.write(fos);
//            fos.close();

//            resp.vars.put("lstChargeBack", lstSize);
//            //resp.vars.put("strFileName", strFileName);
//            resp.vars.put("strFileName", strFileName);
//            resp.vars.put("rutaFile", rutaFile + "\\" + strFileName);
            
            response.setContentType("application/vnd.openxml");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + strFileName + "\"");

            FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
            workbook.write(response.getOutputStream());
            fos.close();

        } catch (IOException e) {
            throw new SpringException(e);
        }
    }

    private static Map<String, HSSFCellStyle> createStyles(HSSFWorkbook wb) {

        Map<String, HSSFCellStyle> styles = new HashMap<String, HSSFCellStyle>();
        HSSFDataFormat df = wb.createDataFormat();

        HSSFCellStyle style;
        HSSFFont headerFont = wb.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("header_date", style);

        HSSFFont font1 = wb.createFont();
        font1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font1);
        styles.put("cell_b", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font1);
        styles.put("cell_b_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_b_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_g", style);

        HSSFFont font2 = wb.createFont();
        font2.setColor(IndexedColors.BLUE.getIndex());
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font2);
        styles.put("cell_bb", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setFont(font1);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_bg", style);

        HSSFFont font3 = wb.createFont();
        font3.setFontHeightInPoints((short) 14);
        font3.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setFont(font3);
        style.setWrapText(true);
        styles.put("cell_h", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setWrapText(true);
        styles.put("cell_normal", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_normal_centered", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_normal_formato_right", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("d-mmm"));
        styles.put("cell_normal_date", style);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setIndention((short) 1);
        style.setWrapText(true);
        styles.put("cell_indented", style);

        style = createBorderedStyle(wb);
        style.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        styles.put("cell_blue", style);

        HSSFFont monthFont = wb.createFont();
        monthFont.setFontHeightInPoints((short) 12);
        monthFont.setColor(IndexedColors.WHITE.getIndex());
        monthFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_LEFT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont);
        styles.put("cell_totals_left", style);

        HSSFFont monthFont1 = wb.createFont();
        monthFont1.setFontHeightInPoints((short) 12);
        monthFont1.setColor(IndexedColors.WHITE.getIndex());
        monthFont1.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = wb.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.DARK_RED.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(monthFont1);
        //style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
        style.setDataFormat(wb.createDataFormat().getFormat("_($* #,##0.00_);_($* (#,##0.00);_($* \"-\"??_);_(@_)"));
        styles.put("cell_totals_right", style);

        HSSFFont fontT = wb.createFont();
        fontT.setBoldweight(Font.BOLDWEIGHT_BOLD);
        fontT.setFontHeightInPoints((short) 9);
        style = createBorderedStyle(wb);

        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(fontT);
        styles.put("cell_b_titulo", style);

        HSSFFont fontCELDA = wb.createFont();
        fontCELDA.setFontHeightInPoints((short) 8);
        fontCELDA.setColor(IndexedColors.DARK_BLUE.getIndex());
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);

        style = createBorderedStyle(wb);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        styles.put("cell_celda", style);

        return styles;
    }

    private static HSSFCellStyle createBorderedStyle(HSSFWorkbook wb) {
        HSSFCellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
    
    @RequestMapping(value = "exportHistoricalAvisos")
    public @ResponseBody
    void exportHistoricalAvisos(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        System.out.println("-------------- DataRequestedByBank : exportHistoricalAvisos-------------");

        String rutaFile = this.serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        List<A2331Filter> listaData;
        double dblTotCC = 0, dblTotWEB = 0;
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";
        
        HashMap hmCANAL = new HashMap();
        hmCANAL.put("CCT", "CALL CENTER");
        hmCANAL.put("WEB", "INTERNET");
        
        try {

            DataRequestedByBankLogic logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            listaData = logic.loadPX404SQP02000(filter);

            String strFileName = "RequestedBankNotice_Historical_" + Functions.getFechaActual() + "_" + Functions.getHoraActual() + ".xls";

            HSSFWorkbook workbook = null;
            File file = new File(rutaFile + "\\" + strFileName);
            if (file.exists()) {
                file.delete();
            }

            if (listaData.size() > 0) {

                workbook = new HSSFWorkbook();

                String quiebreHoja = "", quiebreCanal = "";
                A2331Filter bean = listaData.get(0);

                HSSFSheet sheet = workbook.createSheet(bean.SCARCOD.trim());

                Map<String, HSSFCellStyle> styles = createStyles(workbook);
                String styleName;

                sheet.setColumnWidth(0, 17 * 500);
                sheet.setColumnWidth(1, 7 * 500);
                sheet.setColumnWidth(2, 9 * 500);
                sheet.setColumnWidth(3, 7 * 500);
                sheet.setColumnWidth(4, 20 * 500);
                sheet.setColumnWidth(5, 13 * 500);
                sheet.setColumnWidth(6, 9 * 500);
                sheet.setColumnWidth(7, 30 * 500);
                sheet.setColumnWidth(8, 13 * 500);
                sheet.setColumnWidth(9, 7 * 500);
                sheet.setColumnWidth(10, 7 * 500);
                sheet.setColumnWidth(11, 7 * 500);

                //Título Superior ==============================================
                HSSFRow rowTitS = sheet.createRow(0);
                rowTitS.setHeight((short) 500);
                HSSFCell cabTitS = rowTitS.createCell(0);
                cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + hmCANAL.get(bean.strCANAL).toString());
                cabTitS.setCellStyle(styles.get("cell_b_centered"));
                HSSFCell cabTitS11 = rowTitS.createCell(11);
                cabTitS11.setCellValue(" ");
                //rowFrom,rowTo,colFrom,colTo
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));

                //Títulos Grilla ===============================================
                HSSFRow rowcab = sheet.createRow(1);
                rowcab.setHeight((short) 500);
                HSSFCell cab1 = rowcab.createCell(0);
                HSSFCell cab2 = rowcab.createCell(1);
                HSSFCell cab3 = rowcab.createCell(2);
                HSSFCell cab4 = rowcab.createCell(3);
                HSSFCell cab5 = rowcab.createCell(4);
                HSSFCell cab6 = rowcab.createCell(5);
                HSSFCell cabAC = rowcab.createCell(6);
                HSSFCell cab7 = rowcab.createCell(7);
                HSSFCell cab8 = rowcab.createCell(8);
                HSSFCell cab9 = rowcab.createCell(9);
                HSSFCell cab10 = rowcab.createCell(10);
                HSSFCell cab11 = rowcab.createCell(11);

                styleName = "header";

                cab1.setCellValue("Merchant Name");
                cab1.setCellStyle(styles.get(styleName));
                cab2.setCellValue("Merchant");
                cab2.setCellStyle(styles.get(styleName));
                cab3.setCellValue("Amount MXN");
                cab3.setCellStyle(styles.get(styleName));
                cab4.setCellValue("Application Date");
                cab4.setCellStyle(styles.get(styleName));
                cab5.setCellValue("Concept");
                cab5.setCellStyle(styles.get(styleName));
                cab6.setCellValue("Card Number");
                cab6.setCellStyle(styles.get(styleName));
                cabAC.setCellValue("Authorization Code");
                cabAC.setCellStyle(styles.get(styleName));
                cab7.setCellValue("Ticket(s)");
                cab7.setCellStyle(styles.get(styleName));
                cab8.setCellValue("Status");
                cab8.setCellStyle(styles.get(styleName));
                cab9.setCellValue("Sales Date");
                cab9.setCellStyle(styles.get(styleName));
                cab10.setCellValue("Sending Date");
                cab10.setCellStyle(styles.get(styleName));
                cab11.setCellValue("Bank");
                cab11.setCellStyle(styles.get(styleName));

                Integer cont = 2;
                for (int a = 0; a < listaData.size(); a++) {
                    bean = listaData.get(a);

                    //QUIEBRE POR CANAL ========================================
                    if (!quiebreCanal.trim().isEmpty() && !quiebreCanal.trim().equals(bean.strCANAL.trim())) {
                        HSSFRow rowTot = sheet.createRow(cont);
                        HSSFCell cellT0 = rowTot.createCell(0);
                        HSSFCell cellT1 = rowTot.createCell(1);
                        HSSFCell cellT2 = rowTot.createCell(2);
                        styleName = "cell_b_centered";
                        cellT0.setCellValue(" ");
                        cellT0.setCellStyle(styles.get(styleName));
                        cellT1.setCellValue("TOTAL");
                        cellT1.setCellStyle(styles.get(styleName));

                        styleName = "cell_totals_right";
                        if (quiebreCanal.equals("CCT")) {
                            cellT2.setCellValue(dblTotCC);
                            dblTotCC = 0;
                        } else {
                            cellT2.setCellValue(dblTotWEB);
                            dblTotWEB = 0;
                        }
                        cellT2.setCellStyle(styles.get(styleName));
                        ++cont;
                        //LINEA EN BLANCO ======================================
                        HSSFRow rowLB1 = sheet.createRow(cont);
                        HSSFCell cellLB10 = rowLB1.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB10.setCellValue(" ");
                        cellLB10.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB2 = sheet.createRow(cont);
                        HSSFCell cellLB20 = rowLB2.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB20.setCellValue(" ");
                        cellLB20.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB3 = sheet.createRow(cont);
                        HSSFCell cellLB30 = rowLB3.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB30.setCellValue(" ");
                        cellLB30.setCellStyle(styles.get(styleName));
                        ++cont;

                        if (quiebreHoja.trim().equals(bean.SCARCOD.trim())) {
                            //Título Superior ======================================
                            HSSFRow rowTitS2 = sheet.createRow(cont);
                            rowTitS2.setHeight((short) 500);
                            HSSFCell cabTitS2 = rowTitS2.createCell(0);
                            cabTitS2.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + hmCANAL.get(bean.strCANAL.trim()));
                            cabTitS2.setCellStyle(styles.get("cell_b_centered"));
                            HSSFCell cabTitS2_11 = rowTitS2.createCell(11);
                            cabTitS2_11.setCellValue(" ");
                            //rowFrom,rowTo,colFrom,colTo
                            sheet.addMergedRegion(new CellRangeAddress(cont, cont, 0, 10));
                            ++cont;

                            //Títulos Grilla =======================================
                            HSSFRow rowcab2 = sheet.createRow(cont);
                            rowcab2.setHeight((short) 500);
                            HSSFCell cab12 = rowcab2.createCell(0);
                            HSSFCell cab22 = rowcab2.createCell(1);
                            HSSFCell cab32 = rowcab2.createCell(2);
                            HSSFCell cab42 = rowcab2.createCell(3);
                            HSSFCell cab52 = rowcab2.createCell(4);
                            HSSFCell cab62 = rowcab2.createCell(5);
                            HSSFCell cabAC_2 = rowcab2.createCell(6);
                            HSSFCell cab72 = rowcab2.createCell(7);
                            HSSFCell cab82 = rowcab2.createCell(8);
                            HSSFCell cab92 = rowcab2.createCell(9);
                            HSSFCell cab102 = rowcab2.createCell(10);
                            HSSFCell cab112 = rowcab2.createCell(11);

                            styleName = "header";

                            cab12.setCellValue("Merchant Name");
                            cab12.setCellStyle(styles.get(styleName));
                            cab22.setCellValue("Merchant");
                            cab22.setCellStyle(styles.get(styleName));
                            cab32.setCellValue("Amount MXN");
                            cab32.setCellStyle(styles.get(styleName));
                            cab42.setCellValue("Application Date");
                            cab42.setCellStyle(styles.get(styleName));
                            cab52.setCellValue("Concept");
                            cab52.setCellStyle(styles.get(styleName));
                            cab62.setCellValue("Card Number");
                            cab62.setCellStyle(styles.get(styleName));
                            cabAC_2.setCellValue("Authorization Code");
                            cabAC_2.setCellStyle(styles.get(styleName));
                            cab72.setCellValue("Ticket(s)");
                            cab72.setCellStyle(styles.get(styleName));
                            cab82.setCellValue("Status");
                            cab82.setCellStyle(styles.get(styleName));
                            cab92.setCellValue("Sales Date");
                            cab92.setCellStyle(styles.get(styleName));
                            cab102.setCellValue("Sending Date");
                            cab102.setCellStyle(styles.get(styleName));
                            cab112.setCellValue("Bank");
                            cab112.setCellStyle(styles.get(styleName));
                            ++cont;
                        }
                    }

                    if (!quiebreHoja.trim().isEmpty() && !quiebreHoja.trim().equals(bean.SCARCOD.trim())) {

                        /*//COLOCANDO TOTAL DE LA HOJA ANTERIOR POR CANAL ========
                         Row rowTot = sheet.createRow(cont);
                         Cell cellT0 = rowTot.createCell(0);
                         Cell cellT1 = rowTot.createCell(1);
                         Cell cellT2 = rowTot.createCell(2);
                         styleName = "cell_b_centered";
                         cellT0.setCellValue(" ");
                         cellT0.setCellStyle(styles.get(styleName));
                         cellT1.setCellValue("TOTAL");
                         cellT1.setCellStyle(styles.get(styleName));

                         styleName = "cell_totals_right";
                         if (quiebreCanal.equals("CCT")) {
                         cellT2.setCellValue(dblTotCC);
                         dblTotCC = 0;
                         } else {
                         cellT2.setCellValue(dblTotWEB);
                         dblTotWEB = 0;
                         }
                         cellT2.setCellStyle(styles.get(styleName));*/
                        //======================================================
                        //======================================================
                        //Creando nueva hoja y sus respectivos títulos.
                        sheet = workbook.createSheet(bean.SCARCOD.trim());

                        sheet.setColumnWidth(0, 17 * 500);
                        sheet.setColumnWidth(1, 7 * 500);
                        sheet.setColumnWidth(2, 9 * 500);
                        sheet.setColumnWidth(3, 7 * 500);
                        sheet.setColumnWidth(4, 20 * 500);
                        sheet.setColumnWidth(5, 13 * 500);
                        sheet.setColumnWidth(6, 9 * 500);
                        sheet.setColumnWidth(7, 30 * 500);
                        sheet.setColumnWidth(8, 13 * 500);
                        sheet.setColumnWidth(9, 7 * 500);
                        sheet.setColumnWidth(10, 7 * 500);
                        sheet.setColumnWidth(11, 7 * 500);

                        //Título Superior ======================================
                        rowTitS = sheet.createRow(0);
                        rowTitS.setHeight((short) 500);
                        cabTitS = rowTitS.createCell(0);
                        cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + hmCANAL.get(bean.strCANAL).toString());
                        cabTitS.setCellStyle(styles.get("cell_b_centered"));
                        cabTitS11 = rowTitS.createCell(11);
                        cabTitS11.setCellValue(" ");

                        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));
                        //rowFrom,rowTo,colFrom,colTo

                        //Títulos Grilla =======================================
                        rowcab = sheet.createRow(1);
                        rowcab.setHeight((short) 500);
                        cab1 = rowcab.createCell(0);
                        cab2 = rowcab.createCell(1);
                        cab3 = rowcab.createCell(2);
                        cab4 = rowcab.createCell(3);
                        cab5 = rowcab.createCell(4);
                        cab6 = rowcab.createCell(5);
                        cabAC = rowcab.createCell(6);
                        cab7 = rowcab.createCell(7);
                        cab8 = rowcab.createCell(8);
                        cab9 = rowcab.createCell(9);
                        cab10 = rowcab.createCell(10);
                        cab11 = rowcab.createCell(11);

                        styleName = "header";

                        cab1.setCellValue("Merchant Name");
                        cab1.setCellStyle(styles.get(styleName));
                        cab2.setCellValue("Merchant");
                        cab2.setCellStyle(styles.get(styleName));
                        cab3.setCellValue("Amount MXN");
                        cab3.setCellStyle(styles.get(styleName));
                        cab4.setCellValue("Application Date");
                        cab4.setCellStyle(styles.get(styleName));
                        cab5.setCellValue("Concept");
                        cab5.setCellStyle(styles.get(styleName));
                        cab6.setCellValue("Card Number");
                        cab6.setCellStyle(styles.get(styleName));
                        cabAC.setCellValue("Authorization Code");
                        cabAC.setCellStyle(styles.get(styleName));
                        cab7.setCellValue("Ticket(s)");
                        cab7.setCellStyle(styles.get(styleName));
                        cab8.setCellValue("Status");
                        cab8.setCellStyle(styles.get(styleName));
                        cab9.setCellValue("Sales Date");
                        cab9.setCellStyle(styles.get(styleName));
                        cab10.setCellValue("Sending Date");
                        cab10.setCellStyle(styles.get(styleName));
                        cab11.setCellValue("Bank");
                        cab11.setCellStyle(styles.get(styleName));

                        cont = 2;
                        dblTotCC = 0;
                        dblTotWEB = 0;
                    }

                    HSSFRow row = sheet.createRow(cont);
                    HSSFCell cell0 = row.createCell(0);
                    HSSFCell cell1 = row.createCell(1);
                    HSSFCell cell2 = row.createCell(2);
                    HSSFCell cell3 = row.createCell(3);
                    HSSFCell cell4 = row.createCell(4);
                    HSSFCell cell5 = row.createCell(5);
                    HSSFCell cell6 = row.createCell(6);
                    HSSFCell cell7 = row.createCell(7);
                    HSSFCell cell8 = row.createCell(8);
                    HSSFCell cell9 = row.createCell(9);
                    HSSFCell cell10 = row.createCell(10);
                    HSSFCell cell11 = row.createCell(11);

                    styleName = "cell_normal_centered";
                    cell0.setCellValue(bean.MERCHNAM);
                    cell0.setCellStyle(styles.get(styleName));
                    cell1.setCellValue(bean.MERCHN);
                    cell1.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_formato_right";
                    cell2.setCellValue(bean.AUTAMOUNT);
                    cell2.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_centered";
                    cell3.setCellValue(bean.APLIDATE);
                    cell3.setCellStyle(styles.get(styleName));
                    cell4.setCellValue(bean.CONCEPT);
                    cell4.setCellStyle(styles.get(styleName));
                    cell5.setCellValue(bean.strDescripcion);
                    cell5.setCellStyle(styles.get(styleName));
                    cell6.setCellValue(bean.AUTHNBR);
                    cell6.setCellStyle(styles.get(styleName));
                    cell7.setCellValue(bean.strTicket);
                    cell7.setCellStyle(styles.get(styleName));
                    cell8.setCellValue(bean.STUSOS);
                    cell8.setCellStyle(styles.get(styleName));
                    cell9.setCellValue(bean.SALEDATE);
                    cell9.setCellStyle(styles.get(styleName));
                    cell10.setCellValue(bean.FECR);
                    cell10.setCellStyle(styles.get(styleName));
                    cell11.setCellValue(bean.strDescBank);
                    cell11.setCellStyle(styles.get(styleName));

                    if (bean.strCANAL.equals("CCT")) {
                        //CALL CENTER
                        dblTotCC += bean.AUTAMOUNT;
                    } else {
                        //WEB
                        dblTotWEB += bean.AUTAMOUNT;
                    }

                    ++cont;
                    quiebreHoja = bean.SCARCOD.trim();
                    quiebreCanal = bean.strCANAL.trim();

                }

                //COLOCANDO TOTAL DE LA HOJA ANTERIOR POR CANAL ========
                HSSFRow rowTot = sheet.createRow(cont);
                HSSFCell cellT0 = rowTot.createCell(0);
                HSSFCell cellT1 = rowTot.createCell(1);
                HSSFCell cellT2 = rowTot.createCell(2);
                styleName = "cell_b_centered";
                cellT0.setCellValue(" ");
                cellT0.setCellStyle(styles.get(styleName));
                cellT1.setCellValue("TOTAL");
                cellT1.setCellStyle(styles.get(styleName));

                styleName = "cell_totals_right";
                if (quiebreCanal.equals("CCT")) {
                    cellT2.setCellValue(dblTotCC);
                    dblTotCC = 0;
                } else {
                    cellT2.setCellValue(dblTotWEB);
                    dblTotWEB = 0;
                }
                cellT2.setCellStyle(styles.get(styleName));

//                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
//                workbook.write(fos);
//                fos.close();
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + strFileName + "\"");

                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
                workbook.write(response.getOutputStream());
                fos.close();
                
                
            }
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    @RequestMapping(value = "exportHistoricalAvisosFra")
    public @ResponseBody
    void exportHistoricalAvisosFra(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        System.out.println("-------------- DataRequestedByBank : exportHistoricalAvisosFra-------------");
        
        String rutaFile = this.serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();

        List<A2331Filter> listaData;
        double dblTotCC = 0, dblTotWEB = 0;
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";
        
        try {

            DataRequestedByBankLogic logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            filter.page.TOTROW = -1;
            filter.page.START = 0;
            filter.page.LIMIT = 0;

            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());

            filter.page.PAGROW = -1;
            filter.page.PAGNUM = 1;

            listaData = logic.loadPX404SQP03306(filter);

            String strFileName = "RequestedBankNotice_Historical_" + Functions.getFechaActual() + "_" + Functions.getHoraActual() + "_Fra.xls";

            HSSFWorkbook workbook = null;
            File file = new File(rutaFile + "\\" + strFileName);
            if (file.exists()) {
                file.delete();
            }

            if (listaData.size() > 0) {

                workbook = new HSSFWorkbook();

                String quiebreHoja = "", quiebreCanal = "";
                A2331Filter bean = listaData.get(0);

                HSSFSheet sheet = workbook.createSheet(bean.SCARCOD.trim());

                Map<String, HSSFCellStyle> styles = createStyles(workbook);
                String styleName;

                sheet.setColumnWidth(0, 17 * 500);
                sheet.setColumnWidth(1, 7 * 500);
                sheet.setColumnWidth(2, 9 * 500);
                sheet.setColumnWidth(3, 7 * 500);
                sheet.setColumnWidth(4, 20 * 500);
                sheet.setColumnWidth(5, 13 * 500);
                sheet.setColumnWidth(6, 30 * 500);
                sheet.setColumnWidth(7, 13 * 500);
                sheet.setColumnWidth(8, 7 * 500);
                sheet.setColumnWidth(9, 7 * 500);
                sheet.setColumnWidth(10, 7 * 500);

                //Título Superior ==============================================
                HSSFRow rowTitS = sheet.createRow(0);
                rowTitS.setHeight((short) 500);
                HSSFCell cabTitS = rowTitS.createCell(0);
//                cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + hmCANAL.get(bean.strCANAL).toString());
                cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo.toString());
                cabTitS.setCellStyle(styles.get("cell_b_centered"));
                HSSFCell cabTitS11 = rowTitS.createCell(11);
                cabTitS11.setCellValue(" ");
                //rowFrom,rowTo,colFrom,colTo
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));

                //Títulos Grilla ===============================================
                HSSFRow rowcab = sheet.createRow(1);
                rowcab.setHeight((short) 500);
                HSSFCell cab1 = rowcab.createCell(0);
                HSSFCell cab2 = rowcab.createCell(1);
                HSSFCell cab3 = rowcab.createCell(2);
                HSSFCell cab4 = rowcab.createCell(3);
                HSSFCell cab5 = rowcab.createCell(4);
                HSSFCell cab6 = rowcab.createCell(5);
                HSSFCell cab7 = rowcab.createCell(6);
                HSSFCell cab8 = rowcab.createCell(7);
                HSSFCell cab9 = rowcab.createCell(8);
                HSSFCell cab10 = rowcab.createCell(9);
                HSSFCell cab11 = rowcab.createCell(10);

                styleName = "header";

                cab1.setCellValue("Merchant Name");
                cab1.setCellStyle(styles.get(styleName));
                cab2.setCellValue("Merchant");
                cab2.setCellStyle(styles.get(styleName));
                cab3.setCellValue("Amount MXN");
                cab3.setCellStyle(styles.get(styleName));
                cab4.setCellValue("Application Date");
                cab4.setCellStyle(styles.get(styleName));
                cab5.setCellValue("Concept");
                cab5.setCellStyle(styles.get(styleName));
                cab6.setCellValue("Card Number");
                cab6.setCellStyle(styles.get(styleName));
                cab7.setCellValue("Ticket(s)");
                cab7.setCellStyle(styles.get(styleName));
                cab8.setCellValue("Status");
                cab8.setCellStyle(styles.get(styleName));
                cab9.setCellValue("Sales Date");
                cab9.setCellStyle(styles.get(styleName));
                cab10.setCellValue("Sending Date");
                cab10.setCellStyle(styles.get(styleName));
                cab11.setCellValue("Bank");
                cab11.setCellStyle(styles.get(styleName));

                Integer cont = 2;
                for (int a = 0; a < listaData.size(); a++) {
                    bean = listaData.get(a);

                    //QUIEBRE POR CANAL ========================================
                    if (!quiebreCanal.trim().isEmpty() && !quiebreCanal.trim().equals(bean.strCANAL.trim())) {
                        HSSFRow rowTot = sheet.createRow(cont);
                        HSSFCell cellT0 = rowTot.createCell(0);
                        HSSFCell cellT1 = rowTot.createCell(1);
                        HSSFCell cellT2 = rowTot.createCell(2);
                        styleName = "cell_b_centered";
                        cellT0.setCellValue(" ");
                        cellT0.setCellStyle(styles.get(styleName));
                        cellT1.setCellValue("TOTAL");
                        cellT1.setCellStyle(styles.get(styleName));

                        styleName = "cell_totals_right";
                        if (quiebreCanal.equals("CCT")) {
                            cellT2.setCellValue(dblTotCC);
                            dblTotCC = 0;
                        } else {
                            cellT2.setCellValue(dblTotWEB);
                            dblTotWEB = 0;
                        }
                        cellT2.setCellStyle(styles.get(styleName));
                        ++cont;
                        //LINEA EN BLANCO ======================================
                        HSSFRow rowLB1 = sheet.createRow(cont);
                        HSSFCell cellLB10 = rowLB1.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB10.setCellValue(" ");
                        cellLB10.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB2 = sheet.createRow(cont);
                        HSSFCell cellLB20 = rowLB2.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB20.setCellValue(" ");
                        cellLB20.setCellStyle(styles.get(styleName));
                        ++cont;
                        HSSFRow rowLB3 = sheet.createRow(cont);
                        HSSFCell cellLB30 = rowLB3.createCell(0);
                        styleName = "cell_normal_centered";
                        cellLB30.setCellValue(" ");
                        cellLB30.setCellStyle(styles.get(styleName));
                        ++cont;

                        if (quiebreHoja.trim().equals(bean.SCARCOD.trim())) {
                            //Título Superior ======================================
                            HSSFRow rowTitS2 = sheet.createRow(cont);
                            rowTitS2.setHeight((short) 500);
                            HSSFCell cabTitS2 = rowTitS2.createCell(0);
                            cabTitS2.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo.trim());
                            cabTitS2.setCellStyle(styles.get("cell_b_centered"));
                            HSSFCell cabTitS2_11 = rowTitS2.createCell(11);
                            cabTitS2_11.setCellValue(" ");
                            //rowFrom,rowTo,colFrom,colTo
                            sheet.addMergedRegion(new CellRangeAddress(cont, cont, 0, 10));
                            ++cont;

                            //Títulos Grilla =======================================
                            HSSFRow rowcab2 = sheet.createRow(cont);
                            rowcab2.setHeight((short) 500);
                            HSSFCell cab12 = rowcab2.createCell(0);
                            HSSFCell cab22 = rowcab2.createCell(1);
                            HSSFCell cab32 = rowcab2.createCell(2);
                            HSSFCell cab42 = rowcab2.createCell(3);
                            HSSFCell cab52 = rowcab2.createCell(4);
                            HSSFCell cab62 = rowcab2.createCell(5);
                            HSSFCell cab72 = rowcab2.createCell(6);
                            HSSFCell cab82 = rowcab2.createCell(7);
                            HSSFCell cab92 = rowcab2.createCell(8);
                            HSSFCell cab102 = rowcab2.createCell(9);
                            HSSFCell cab112 = rowcab2.createCell(10);

                            styleName = "header";

                            cab12.setCellValue("Merchant Name");
                            cab12.setCellStyle(styles.get(styleName));
                            cab22.setCellValue("Merchant");
                            cab22.setCellStyle(styles.get(styleName));
                            cab32.setCellValue("Amount MXN");
                            cab32.setCellStyle(styles.get(styleName));
                            cab42.setCellValue("Application Date");
                            cab42.setCellStyle(styles.get(styleName));
                            cab52.setCellValue("Concept");
                            cab52.setCellStyle(styles.get(styleName));
                            cab62.setCellValue("Card Number");
                            cab62.setCellStyle(styles.get(styleName));
                            cab72.setCellValue("Ticket(s)");
                            cab72.setCellStyle(styles.get(styleName));
                            cab82.setCellValue("Status");
                            cab82.setCellStyle(styles.get(styleName));
                            cab92.setCellValue("Sales Date");
                            cab92.setCellStyle(styles.get(styleName));
                            cab102.setCellValue("Sending Date");
                            cab102.setCellStyle(styles.get(styleName));
                            cab112.setCellValue("Bank");
                            cab112.setCellStyle(styles.get(styleName));
                            ++cont;
                        }
                    }

                    if (!quiebreHoja.trim().isEmpty() && !quiebreHoja.trim().equals(bean.SCARCOD.trim())) {

                        //======================================================
                        //======================================================
                        //Creando nueva hoja y sus respectivos títulos.
                        sheet = workbook.createSheet(bean.SCARCOD.trim());

                        sheet.setColumnWidth(0, 17 * 500);
                        sheet.setColumnWidth(1, 7 * 500);
                        sheet.setColumnWidth(2, 9 * 500);
                        sheet.setColumnWidth(3, 7 * 500);
                        sheet.setColumnWidth(4, 20 * 500);
                        sheet.setColumnWidth(5, 13 * 500);
                        sheet.setColumnWidth(6, 30 * 500);
                        sheet.setColumnWidth(7, 13 * 500);
                        sheet.setColumnWidth(8, 7 * 500);
                        sheet.setColumnWidth(9, 7 * 500);
                        sheet.setColumnWidth(10, 7 * 500);

                        //Título Superior ======================================
                        rowTitS = sheet.createRow(0);
                        rowTitS.setHeight((short) 500);
                        cabTitS = rowTitS.createCell(0);
                        cabTitS.setCellValue(bean.strDescCard.trim() + " CHARGE BACK DETAIL - " + bean.strTitulo);
                        cabTitS.setCellStyle(styles.get("cell_b_centered"));
                        cabTitS11 = rowTitS.createCell(11);
                        cabTitS11.setCellValue(" ");

                        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));
                        //rowFrom,rowTo,colFrom,colTo

                        //Títulos Grilla =======================================
                        rowcab = sheet.createRow(1);
                        rowcab.setHeight((short) 500);
                        cab1 = rowcab.createCell(0);
                        cab2 = rowcab.createCell(1);
                        cab3 = rowcab.createCell(2);
                        cab4 = rowcab.createCell(3);
                        cab5 = rowcab.createCell(4);
                        cab6 = rowcab.createCell(5);
                        cab7 = rowcab.createCell(6);
                        cab8 = rowcab.createCell(7);
                        cab9 = rowcab.createCell(8);
                        cab10 = rowcab.createCell(9);
                        cab11 = rowcab.createCell(10);

                        styleName = "header";

                        cab1.setCellValue("Merchant Name");
                        cab1.setCellStyle(styles.get(styleName));
                        cab2.setCellValue("Merchant");
                        cab2.setCellStyle(styles.get(styleName));
                        cab3.setCellValue("Amount MXN");
                        cab3.setCellStyle(styles.get(styleName));
                        cab4.setCellValue("Application Date");
                        cab4.setCellStyle(styles.get(styleName));
                        cab5.setCellValue("Concept");
                        cab5.setCellStyle(styles.get(styleName));
                        cab6.setCellValue("Card Number");
                        cab6.setCellStyle(styles.get(styleName));
                        cab7.setCellValue("Ticket(s)");
                        cab7.setCellStyle(styles.get(styleName));
                        cab8.setCellValue("Status");
                        cab8.setCellStyle(styles.get(styleName));
                        cab9.setCellValue("Sales Date");
                        cab9.setCellStyle(styles.get(styleName));
                        cab10.setCellValue("Sending Date");
                        cab10.setCellStyle(styles.get(styleName));
                        cab11.setCellValue("Bank");
                        cab11.setCellStyle(styles.get(styleName));

                        cont = 2;
                        dblTotCC = 0;
                        dblTotWEB = 0;
                    }

                    HSSFRow row = sheet.createRow(cont);
                    HSSFCell cell0 = row.createCell(0);
                    HSSFCell cell1 = row.createCell(1);
                    HSSFCell cell2 = row.createCell(2);
                    HSSFCell cell3 = row.createCell(3);
                    HSSFCell cell4 = row.createCell(4);
                    HSSFCell cell5 = row.createCell(5);
                    HSSFCell cell6 = row.createCell(6);
                    HSSFCell cell7 = row.createCell(7);
                    HSSFCell cell8 = row.createCell(8);
                    HSSFCell cell9 = row.createCell(9);
                    HSSFCell cell10 = row.createCell(10);

                    styleName = "cell_normal_centered";
                    cell0.setCellValue(bean.MERCHNAM);
                    cell0.setCellStyle(styles.get(styleName));
                    cell1.setCellValue(bean.MERCHN);
                    cell1.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_formato_right";
                    cell2.setCellValue(bean.AUTAMOUNT);
                    cell2.setCellStyle(styles.get(styleName));

                    styleName = "cell_normal_centered";
                    cell3.setCellValue(bean.APLIDATE);
                    cell3.setCellStyle(styles.get(styleName));
                    cell4.setCellValue(bean.CONCEPT);
                    cell4.setCellStyle(styles.get(styleName));
                    cell5.setCellValue(bean.strDescripcion);
                    cell5.setCellStyle(styles.get(styleName));
                    cell6.setCellValue(bean.strTicket);
                    cell6.setCellStyle(styles.get(styleName));
                    cell7.setCellValue(bean.STUSOS);
                    cell7.setCellStyle(styles.get(styleName));
                    cell8.setCellValue(bean.SALEDATE);
                    cell8.setCellStyle(styles.get(styleName));
                    cell9.setCellValue(bean.FECR);
                    cell9.setCellStyle(styles.get(styleName));
                    cell10.setCellValue(bean.strDescBank);
                    cell10.setCellStyle(styles.get(styleName));

                    if (bean.strCANAL.equals("CCT")) {
                        //CALL CENTER
                        dblTotCC += bean.AUTAMOUNT;
                    } else {
                        //WEB
                        dblTotWEB += bean.AUTAMOUNT;
                    }

                    ++cont;
                    quiebreHoja = bean.SCARCOD.trim();
                    quiebreCanal = bean.strCANAL.trim();

                }

                //COLOCANDO TOTAL DE LA HOJA ANTERIOR POR CANAL ========
                HSSFRow rowTot = sheet.createRow(cont);
                HSSFCell cellT0 = rowTot.createCell(0);
                HSSFCell cellT1 = rowTot.createCell(1);
                HSSFCell cellT2 = rowTot.createCell(2);
                styleName = "cell_b_centered";
                cellT0.setCellValue(" ");
                cellT0.setCellStyle(styles.get(styleName));
                cellT1.setCellValue("TOTAL");
                cellT1.setCellStyle(styles.get(styleName));

                styleName = "cell_totals_right";
                if (quiebreCanal.equals("CCT")) {
                    cellT2.setCellValue(dblTotCC);
                    dblTotCC = 0;
                } else {
                    cellT2.setCellValue(dblTotWEB);
                    dblTotWEB = 0;
                }
                cellT2.setCellStyle(styles.get(styleName));

//                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
//                workbook.write(fos);
//                fos.close();
                response.setContentType("application/vnd.openxml");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + strFileName + "\"");

                FileOutputStream fos = new FileOutputStream(rutaFile + "\\" + strFileName);
                workbook.write(response.getOutputStream());
                fos.close();
            }
        } catch (IOException e) {
            throw new SpringException(e);
        }
    }
    
    
    
   @RequestMapping(value = "executeOption")
    public @ResponseBody
    String executeOption(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- DataRequestedByBank : executeOption-------------");
        A2331Filter filter = new A2331Filter();
        String msj = "";
        String beanString = "";
        Gson gson = new Gson();

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            
            msj = logic.loadPX404SQP01946(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "executeDeleteClarification")
    public @ResponseBody
    String executeDeleteClarification(ModelMap map, HttpServletRequest request) {

        System.out.println("-------------- DataRequestedByBank : executeDeleteClarification-------------");
        A2331Filter filter = new A2331Filter();
        String msj = "";
        String beanString = "";
        Gson gson = new Gson();

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            
            msj = logic.loadPX404SQP02078(filter);

            map.put("success", true);
            map.put("Mensaje", msj);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "searchBean")
    public @ResponseBody
    String searchBean(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchBean-------------");
        map.put("success", true);

        A2331Filter result = new A2331Filter();
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            result = logic.loadPX404SQP01945(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchBeanAvisos")
    public @ResponseBody
    String searchBeanAvisos(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchBeanAvisos-------------");
        map.put("success", true);

        A2331Filter result = new A2331Filter();
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            result = logic.loadPX404SQP01979(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "searchInfCallCenter")
    public @ResponseBody
    String searchInfCallCenter(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- DataRequestedByBank : searchInfCallCenter-------------");
        map.put("success", true);

        A2331Filter result = new A2331Filter();
        A2331Filter filter = new A2331Filter();
        Gson gson = new Gson();
        String beanString = "";

        try {
            logic = new DataRequestedByBankLogic();
            logic.setSession(this.serverSession.getServerSession());

            beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, A2331Filter.class);
            result = logic.loadPX405SQP01958(filter);
            map.put("result", result);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("Mensaje", ex.getMessage());
        }

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
            List<A2331Filter> listaData = this.getList(request, true);
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

            CH1_0.setCellValue("Bank");
            CH1_1.setCellValue("Quantities");
            CH1_6.setCellValue("Merchant");
            CH1_7.setCellValue("Sales");
            CH1_8.setCellValue("Clarification");
            CH1_9.setCellValue("Charged");
            CH1_11.setCellValue("Status");
            CH1_12.setCellValue("Days");
            CH1_13.setCellValue("Sending Date");
            CH1_15.setCellValue("Bank");
            CH1_16.setCellValue("Sending Date");
            CH1_18.setCellValue("Bank");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 14));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 16, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Cards");
            CH2_2.setCellValue("Tkts");
            CH2_3.setCellValue("Link");
            CH2_4.setCellValue("Charged");
            CH2_5.setCellValue("Not Found");
            CH2_6.setCellValue("Number");
            CH2_7.setCellValue("MXN");
            CH2_8.setCellValue("MXN");
            CH2_9.setCellValue("MXN");
            CH2_10.setCellValue("%");
            CH2_13.setCellValue("Select");
            CH2_14.setCellValue("to IATA");
            CH2_15.setCellValue("Code");
            CH2_16.setCellValue("Select");
            CH2_17.setCellValue("to Bank");
            CH2_18.setCellValue("Notice");

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

                rcell0.setCellValue(listaData.get(vi).SENTDATE);
                rcell1.setCellValue(listaData.get(vi).lngQCARD);
                rcell2.setCellValue(listaData.get(vi).lngDocs);
                rcell3.setCellValue(listaData.get(vi).lngQLINK);
                rcell4.setCellValue(listaData.get(vi).lngQNOT);
                rcell5.setCellValue(listaData.get(vi).lngQNMATCH);
                rcell6.setCellValue(listaData.get(vi).MERCHN);
                rcell7.setCellValue(listaData.get(vi).VFOP);
                rcell8.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell9.setCellValue(listaData.get(vi).dblANOT);
                rcell10.setCellValue(listaData.get(vi).dblPercCharged);
                rcell11.setCellValue(listaData.get(vi).strDescStatus);
                rcell12.setCellValue(listaData.get(vi).days);
                rcell13.setCellValue(listaData.get(vi).strFormatDate);
                rcell14.setCellValue(listaData.get(vi).IATADATE);
                rcell15.setCellValue(listaData.get(vi).CODEBANK);
                rcell16.setCellValue(listaData.get(vi).strFormatDate);
                rcell17.setCellValue(listaData.get(vi).DATES);
                rcell18.setCellValue(listaData.get(vi).DATEN);
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

    @RequestMapping(value = "getXLSXDos")
    public @ResponseBody
    void getXLSXDos(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXDos");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListAvisos(request, true);
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

            CH1_0.setCellValue("Application");
            CH1_1.setCellValue("Qty");
            CH1_2.setCellValue("No Match");
            CH1_3.setCellValue("Status");
            CH1_4.setCellValue("Merchant");
            CH1_6.setCellValue("Bank");
            CH1_7.setCellValue("Authorization");
            CH1_8.setCellValue("Operating");
            CH1_9.setCellValue("IVA");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
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

            CH2_0.setCellValue("Date");
            CH2_1.setCellValue("Trans");
            CH2_4.setCellValue("Number");
            CH2_5.setCellValue("Name");
            CH2_6.setCellValue("Code");
            CH2_7.setCellValue("MXN");
            CH2_8.setCellValue("Cost");
            CH2_9.setCellValue("Amount");

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

                rcell0.setCellValue(listaData.get(vi).APLIDATE);
                rcell1.setCellValue(listaData.get(vi).QTYTRNX);
                rcell2.setCellValue(listaData.get(vi).lngQNMATCH);
                rcell3.setCellValue(listaData.get(vi).strDescStatus);
                rcell4.setCellValue(listaData.get(vi).MERCHN);
                rcell5.setCellValue(listaData.get(vi).MERCHNAM);
                rcell6.setCellValue(listaData.get(vi).CODEBANK);
                rcell7.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell8.setCellValue(listaData.get(vi).OPEAMOUNT);
                rcell9.setCellValue(listaData.get(vi).IVA);
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

    @RequestMapping(value = "getXLSXTres")
    public @ResponseBody
    void getXLSXTres(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXTres");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListDetCard(request, true);
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

            CH1_0.setCellValue("Credit Card");
            CH1_1.setCellValue("Reason");
            CH1_2.setCellValue("Motive");
            CH1_3.setCellValue("Qty");
            CH1_4.setCellValue("Ticket");
            CH1_5.setCellValue("Status");
            CH1_6.setCellValue("Folio");
            CH1_7.setCellValue("Country");
            CH1_8.setCellValue("MXN");
            CH1_9.setCellValue("Clar.");
            CH1_10.setCellValue("Authorization");
            CH1_11.setCellValue("Sales");
            CH1_13.setCellValue("Qty");
            CH1_14.setCellValue("Status Cpn");
            CH1_18.setCellValue("Image");
            CH1_19.setCellValue("Sent");
            CH1_20.setCellValue("Bank");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 11, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 20));
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
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);

            CH2_0.setCellValue("Number");
            CH2_1.setCellValue("Code");
            CH2_3.setCellValue("Tkts");
            CH2_4.setCellValue("Number");
            CH2_6.setCellValue("Number");
            CH2_9.setCellValue("Amt");
            CH2_10.setCellValue("Code");
            CH2_11.setCellValue("Date");
            CH2_12.setCellValue("Agent");
            CH2_13.setCellValue("Cpns");
            CH2_14.setCellValue("1");
            CH2_15.setCellValue("2");
            CH2_16.setCellValue("3");
            CH2_17.setCellValue("4");
            CH2_18.setCellValue("Link");
            CH2_19.setCellValue("to Bank");
            CH2_20.setCellValue("Notice");

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
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);

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
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);

                rcell0.setCellValue(listaData.get(vi).strDescripcion);
                rcell1.setCellValue(listaData.get(vi).CODMOTI);
                rcell2.setCellValue(listaData.get(vi).CLINAME);
                rcell3.setCellValue(listaData.get(vi).pos);
                rcell4.setCellValue(listaData.get(vi).strTicket);
                rcell5.setCellValue(listaData.get(vi).strDescStatus);
                rcell6.setCellValue(listaData.get(vi).FOLIO);
                rcell7.setCellValue(listaData.get(vi).SCOUNTRY);
                rcell8.setCellValue(listaData.get(vi).VFOP);
                rcell9.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell10.setCellValue(listaData.get(vi).AUTHNBR);
                rcell11.setCellValue(listaData.get(vi).SALEDATE);
                rcell12.setCellValue(listaData.get(vi).AGENTE);
                rcell13.setCellValue(listaData.get(vi).TOTCUP);
                rcell14.setCellValue(listaData.get(vi).strUsoCpn1);
                rcell15.setCellValue(listaData.get(vi).strUsoCpn2);
                rcell16.setCellValue(listaData.get(vi).strUsoCpn3);
                rcell17.setCellValue(listaData.get(vi).strUsoCpn4);
                rcell18.setCellValue(listaData.get(vi).strImgLink);
                rcell19.setCellValue(listaData.get(vi).DATES);
                rcell20.setCellValue(listaData.get(vi).DATEN);
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

    @RequestMapping(value = "getXLSXCuatro")
    public @ResponseBody
    void getXLSXCuatro(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXCuatro");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListDetNoMatch(request, true);
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

            CH1_0.setCellValue("Credit Card");
            CH1_1.setCellValue("Status");
            CH1_2.setCellValue("Folio");
            CH1_3.setCellValue("MXN");
            CH1_4.setCellValue("Authorization");
            CH1_5.setCellValue("Sales");
            CH1_6.setCellValue("Image");
            CH1_7.setCellValue("Sent");
            CH1_8.setCellValue("Bank");

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
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 8));
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

            CH2_0.setCellValue("Number");
            CH2_2.setCellValue("Number");
            CH2_4.setCellValue("Code");
            CH2_5.setCellValue("Date");
            CH2_6.setCellValue("Link");
            CH2_7.setCellValue("to Bank");
            CH2_8.setCellValue("Notice");

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

                rcell0.setCellValue(listaData.get(vi).strDescripcion);
                rcell1.setCellValue(listaData.get(vi).strDescStatus);
                rcell2.setCellValue(listaData.get(vi).FOLIO);
                rcell3.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell4.setCellValue(listaData.get(vi).AUTHNBR);
                rcell5.setCellValue(listaData.get(vi).SALEDATE);
                rcell6.setCellValue(listaData.get(vi).strImgLink);
                rcell7.setCellValue(listaData.get(vi).DATES);
                rcell8.setCellValue(listaData.get(vi).DATEN);
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

    @RequestMapping(value = "getXLSXCinco")
    public @ResponseBody
    void getXLSXCinco(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXCinco");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListDetUsos(request, true);
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
            Cell CH1_22 = row1.createCell(22);
            Cell CH1_23 = row1.createCell(23);
            Cell CH1_24 = row1.createCell(24);
            Cell CH1_25 = row1.createCell(25);

            CH1_0.setCellValue("Credit Card");
            CH1_1.setCellValue("Qty");
            CH1_2.setCellValue("Ticket");
            CH1_3.setCellValue("MXN");
            CH1_4.setCellValue("Authorization");
            CH1_5.setCellValue("Sales");
            CH1_7.setCellValue("Qty");
            CH1_8.setCellValue("Sales Status Cpn");
            CH1_12.setCellValue("Image");
            CH1_13.setCellValue("Sent");
            CH1_14.setCellValue("Notice Status Cpn");
            CH1_18.setCellValue("Bank");
            CH1_19.setCellValue("TKT");
            CH1_20.setCellValue("GDS information");

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
            CH1_22.setCellStyle(headerStyle);
            CH1_23.setCellStyle(headerStyle);
            CH1_24.setCellStyle(headerStyle);
            CH1_25.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 2, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 5, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 14, 17));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 20, 25));

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
            Cell CH2_19 = row2.createCell(19);
            Cell CH2_20 = row2.createCell(20);
            Cell CH2_21 = row2.createCell(21);
            Cell CH2_22 = row2.createCell(22);
            Cell CH2_23 = row2.createCell(23);
            Cell CH2_24 = row2.createCell(24);
            Cell CH2_25 = row2.createCell(25);

            CH2_0.setCellValue("Number");
            CH2_1.setCellValue("Tkts");
            CH2_2.setCellValue("Number");
            CH2_4.setCellValue("Code");
            CH2_5.setCellValue("Date");
            CH2_6.setCellValue("Agent");
            CH2_7.setCellValue("Cpns");
            CH2_8.setCellValue("1");
            CH2_9.setCellValue("2");
            CH2_10.setCellValue("3");
            CH2_11.setCellValue("4");
            CH2_12.setCellValue("Link");
            CH2_13.setCellValue("to Bank");
            CH2_14.setCellValue("1");
            CH2_15.setCellValue("2");
            CH2_16.setCellValue("3");
            CH2_17.setCellValue("4");
            CH2_18.setCellValue("Notice");
            CH2_19.setCellValue("EXCHANGE");
            CH2_20.setCellValue("Status");
            CH2_21.setCellValue("Date");
            CH2_22.setCellValue("Ind. Sabre Cpn");

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
            CH2_19.setCellStyle(headerStyle);
            CH2_20.setCellStyle(headerStyle);
            CH2_21.setCellStyle(headerStyle);
            CH2_22.setCellStyle(headerStyle);
            CH2_23.setCellStyle(headerStyle);
            CH2_24.setCellStyle(headerStyle);
            CH2_25.setCellStyle(headerStyle);

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 8, 8));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 9, 9));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 10, 10));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 11, 11));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 12, 12));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 13, 13));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 14, 14));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 15, 15));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 16, 16));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 17, 17));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 18, 18));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 19, 19));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 20, 20));
            sheet.addMergedRegion(new CellRangeAddress(1, 2, 21, 21));
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 22, 25));

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
            Cell CH3_20 = row3.createCell(20);
            Cell CH3_21 = row3.createCell(21);
            Cell CH3_22 = row3.createCell(22);
            Cell CH3_23 = row3.createCell(23);
            Cell CH3_24 = row3.createCell(24);
            Cell CH3_25 = row3.createCell(25);

            CH3_22.setCellValue("1");
            CH3_23.setCellValue("2");
            CH3_24.setCellValue("3");
            CH3_25.setCellValue("4");

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
            CH3_19.setCellStyle(headerStyle);
            CH3_20.setCellStyle(headerStyle);
            CH3_21.setCellStyle(headerStyle);
            CH3_22.setCellStyle(headerStyle);
            CH3_23.setCellStyle(headerStyle);
            CH3_24.setCellStyle(headerStyle);
            CH3_25.setCellStyle(headerStyle);

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
                Cell rcell19 = row1.createCell(19);
                Cell rcell20 = row1.createCell(20);
                Cell rcell21 = row1.createCell(21);
                Cell rcell22 = row1.createCell(22);
                Cell rcell23 = row1.createCell(23);
                Cell rcell24 = row1.createCell(24);
                Cell rcell25 = row1.createCell(25);

                rcell0.setCellValue(listaData.get(vi).strDescripcion);
                rcell1.setCellValue(listaData.get(vi).pos);
                rcell2.setCellValue(listaData.get(vi).strTicket);
                rcell3.setCellValue(listaData.get(vi).VFOP);
                rcell4.setCellValue(listaData.get(vi).AUTHNBR);
                rcell5.setCellValue(listaData.get(vi).SALEDATE);
                rcell6.setCellValue(listaData.get(vi).AGENTE);
                rcell7.setCellValue(listaData.get(vi).TOTCUP);
                rcell8.setCellValue(listaData.get(vi).strUsoCpn1);
                rcell9.setCellValue(listaData.get(vi).strUsoCpn2);
                rcell10.setCellValue(listaData.get(vi).strUsoCpn3);
                rcell11.setCellValue(listaData.get(vi).strUsoCpn4);
                rcell12.setCellValue(listaData.get(vi).strImgLink);
                rcell13.setCellValue(listaData.get(vi).DATES);
                rcell14.setCellValue(listaData.get(vi).strUsoCpnF1);
                rcell15.setCellValue(listaData.get(vi).strUsoCpnF2);
                rcell16.setCellValue(listaData.get(vi).strUsoCpnF3);
                rcell17.setCellValue(listaData.get(vi).strUsoCpnF4);
                rcell18.setCellValue(listaData.get(vi).DATEN);
                rcell19.setCellValue(listaData.get(vi).TKTEXCH);
                rcell20.setCellValue(listaData.get(vi).strFlag);
                rcell21.setCellValue(listaData.get(vi).strFormatDate1);
                rcell22.setCellValue(listaData.get(vi).strIndSabCpn1);
                rcell23.setCellValue(listaData.get(vi).strIndSabCpn2);
                rcell24.setCellValue(listaData.get(vi).strIndSabCpn3);
                rcell25.setCellValue(listaData.get(vi).strIndSabCpn4);
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
            sheet.autoSizeColumn(22, true);
            sheet.autoSizeColumn(23, true);
            sheet.autoSizeColumn(24, true);
            sheet.autoSizeColumn(25, true);

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

    @RequestMapping(value = "getXLSXSeis")
    public @ResponseBody
    void getXLSXSeis(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Report : getXLSXSeis");
        String fileNameDownload = String.format("Report  - " + Functions.getFechaActual() + ".xlsx", UUID.randomUUID().toString().toLowerCase());
        try {
            Workbook workbook;
            File file = File.createTempFile(fileNameDownload, ".xlsx");
            List<A2331Filter> listaData = this.getListDetAvisos(request, true);
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

            CH1_0.setCellValue("Credit Card");
            CH1_1.setCellValue("Qty");
            CH1_2.setCellValue("Authorization");
            CH1_3.setCellValue("Sales");
            CH1_4.setCellValue("Charged");
            CH1_5.setCellValue("Concept");
            CH1_6.setCellValue("Status");
            CH1_7.setCellValue("Ticket");
            CH1_8.setCellValue("Status Cpn");
            CH1_12.setCellValue("Sales");

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

            //CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 1));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 2));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 3, 3));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 4, 4));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 5, 5));
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 7));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 8, 11));
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 12, 12));
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

            CH2_0.setCellValue("Number");
            CH2_1.setCellValue("Tkts");
            CH2_2.setCellValue("Code");
            CH2_3.setCellValue("Agent");
            CH2_4.setCellValue("MXN");
            CH2_7.setCellValue("Number");
            CH2_8.setCellValue("1");
            CH2_9.setCellValue("2");
            CH2_10.setCellValue("3");
            CH2_11.setCellValue("4");
            CH2_12.setCellValue("Date");

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

                rcell0.setCellValue(listaData.get(vi).strDescripcion);
                rcell1.setCellValue(listaData.get(vi).QTYTRNX);
                rcell2.setCellValue(listaData.get(vi).AUTHNBR);
                rcell3.setCellValue(listaData.get(vi).AGENTE);
                rcell4.setCellValue(listaData.get(vi).AUTAMOUNT);
                rcell5.setCellValue(listaData.get(vi).CONCEPT);
                rcell6.setCellValue(listaData.get(vi).strDescStatus);
                rcell7.setCellValue(listaData.get(vi).strTicket);
                rcell8.setCellValue(listaData.get(vi).strUsoCpn1);
                rcell9.setCellValue(listaData.get(vi).strUsoCpn2);
                rcell10.setCellValue(listaData.get(vi).strUsoCpn3);
                rcell11.setCellValue(listaData.get(vi).strUsoCpn4);
                rcell12.setCellValue(listaData.get(vi).SALEDATE);
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

}
