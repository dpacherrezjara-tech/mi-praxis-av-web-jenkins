/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.panel;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.AbstractList;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.PX075S01INF001Filter;
import net.miatech.beans.PX075S02INF001Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.SQP05856Filter;
import net.miatech.beans.SQP05908Filter;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.classes.ExportUtil;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.flown.AccountingMasterFlownLogic;
import net.miatech.praxis.logic.flown.YieldReportLogic;
import net.miatech.praxis.logic.panel.PanelLogic;
import net.miatech.praxis.logic.program.UserLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 *
 * @author asifuentes
 */
@Controller
@Scope("request")
@RequestMapping("/Users")
public class UsersController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    
    //Vista principal
    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        return "panel/Management/Users";
    }    
    
    @RequestMapping(value = "search")
    public @ResponseBody String search(HttpServletRequest request) {
        SQP05908Filter  filter = new SQP05908Filter();
        List<SQP05908Filter> lstData = new ArrayList<SQP05908Filter>();
        
        int limit = Integer.parseInt(request.getParameter("limit").toString());
        int start = Integer.parseInt(request.getParameter("start").toString());
        int page = Integer.parseInt(request.getParameter("page").toString());
        
        filter.page.LIMIT = limit!=0?limit:20;
        filter.page.START = start!=0?start:0;
        filter.page.PAGE  = page!=0?page:1;
        
        filter.IN_OPCION = Integer.parseInt(request.getParameter("group").toString());//filter.IN_OPCION = 1;// 
        filter.IN_USR = ""; //request.getParameter("strCampo").toString().trim();
        if(request.getParameter("option")!=null && request.getParameter("group")!=null)
        {
            filter.IN_USR = request.getParameter("option").toString().trim();             
        }
        try {
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());
            lstData = logic.loadSQP05908(filter);
        } catch (Exception e) {
            throw new SpringException(e);
        }
        
        HashMap m = new HashMap();
        try{
	        m.put("success",true);
	        m.put("total",lstData.get(0).page.TOTROWS);
	        m.put("data",lstData);
        }catch (Exception e) {
            throw new SpringException(e);
        }        
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "setMantUser")
    public @ResponseBody String setMantUser(HttpServletRequest request) {
        SQP05856Filter filter = new SQP05856Filter();
        SQP05856Filter objRtn = new SQP05856Filter();      
        JavaToFlexResponse resp = new JavaToFlexResponse();
        boolean boValida = false;
        try {
            filter.VP_USR = request.getParameter("USR").trim();
            filter.VP_STAT = request.getParameter("STAT").trim();
            filter.VP_CITY = request.getParameter("CITY").trim();
            filter.VP_ACTION = request.getParameter("strOption").trim();
            filter.VP_CCUST = "139";
            filter.VP_APLICA = "PX";
            filter.chkExpiredDate = ("true".equals(request.getParameter("chkExpiredDate")));
            filter.TOKEN = request.getParameter("txtPass").trim();
            filter.VP_DESC = request.getParameter("DESC").trim();
            filter.VP_CARGO = request.getParameter("CARGO").trim();
            filter.VP_CODEM = request.getParameter("CODEM").trim();
            filter.VP_NOM = request.getParameter("NOM").trim();
            filter.VP_APE = request.getParameter("APE").trim();
            filter.VP_EMAIL = request.getParameter("CREMP").trim();
            filter.DTEXPIRED = request.getParameter("DTEXPIRED").trim();
            filter.chkPass = ("true".equals(request.getParameter("chkPass")));
            UserLogic userLogic = new UserLogic();
            userLogic.setSession(this.serverSession.getServerSession());
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession()); 
            
            //LOG INIT
            SQP05851Filter objLog = new SQP05851Filter();
            objLog.VP_ACTIO = request.getParameter("strOption").trim();
            objLog.VP_ID_OPERATOR = request.getParameter("USR").trim();
            objLog.VP_DESC1 = "USERS MANAGEMENT" + request.getParameter("USR").trim();
            objLog.VP_OPER = "Change in USER " + request.getParameter("DESC").trim();
            logic.setSQP05851(objLog);
            //LOG END
            
            if("I".equals(filter.VP_ACTION))
            {
                boValida = userLogic.SQP03268(filter.VP_USR); // VALIDA SI YA EXISTE USUARIO
                if(!boValida)
                {
                    userLogic.SQP03219(filter.VP_USR,filter.TOKEN,filter.VP_DESC); // REGISTRA AS400
                    objRtn = logic.setSQP05856(filter); // REGISTRO EN TABLAS PRAXIS
                    if("A".equals(filter.VP_STAT))
                    {
                        if(filter.chkExpiredDate) 
                        {
                            if(filter.DTEXPIRED !=null && filter.DTEXPIRED.length()==8) // HABILITAMOS CON FECHA DE EXPIRACION
                                userLogic.SQP03266(filter.VP_USR,filter.DTEXPIRED);
                            else
                            {
                                if(filter.DTEXPIRED !=null && filter.DTEXPIRED.length()==0) // HABILITAMOS SIN FECHA *NONE
                                    userLogic.SQP02491(filter.VP_USR);
                            }
                            resp.info.add("User created successfully");
                        }

                        if(filter.chkPass)
                        {
                            userLogic.SQP03218(filter.VP_USR,filter.TOKEN);
                            resp.info.add("User created successfully");
                        }
                    }
                    resp.info.add("User created successfully"); // objRtn.dbException.MESSAGE
                }
                else
                {
                    resp.info.add("User already exists, please enter another one");
                }
                
            }
            else if("U".equals(filter.VP_ACTION))
            {
                objRtn = logic.setSQP05856(filter); // ACTUALIZACION EN TABLAS PRAXIS
                if("A".equals(filter.VP_STAT))
                {
                   if(filter.chkExpiredDate) 
                    {
                        if(filter.DTEXPIRED !=null && filter.DTEXPIRED.length()==8) // HABILITAMOS CON FECHA DE EXPIRACION
                            userLogic.SQP03266(filter.VP_USR,filter.DTEXPIRED);
                        else
                        {
                            if(filter.DTEXPIRED !=null && filter.DTEXPIRED.length()==0) // HABILITAMOS SIN FECHA *NONE
                                userLogic.SQP02491(filter.VP_USR);
                        }
                        resp.info.add("User updated successfully");
                    }

                    if(filter.chkPass)
                    {
                        userLogic.SQP03218(filter.VP_USR,filter.TOKEN);
                        resp.info.add("User updated successfully");
                    }
                }
                resp.info.add("User updated successfully"); // objRtn.dbException.MESSAGE
            }
            else
            {
                objRtn = logic.setSQP05856(filter); // ELIMINACION EN TABLAS PRAXIS
                resp.info.add("User deleted successfully"); // objRtn.dbException.MESSAGE
            }
            
        }catch (Exception e) {
            throw new SpringException(e);
        }   
        
        HashMap m = new HashMap();
        try{
	        m.put("success",true);
                m.put("sql_code",objRtn.dbException.SQLCODE);
                m.put("response",(objRtn.dbException.MESSAGE));
	        
        }catch (Exception e) {
            throw new SpringException(e);
        }        
        return new Gson().toJson(m);
    }
    
    @RequestMapping(value = "getXLSX")
    public @ResponseBody
    void GetXLSX(HttpServletRequest request, HttpServletResponse response) {

        System.out.println("UsersManController : getXLSX");
        String fileName = "usersMan_" + Functions.getFechaActual();

        try {

            Workbook workbook = null;
            File file = File.createTempFile(fileName, ".xlsx");
            List<SQP05908Filter> lstData = new ArrayList<SQP05908Filter>();
            SQP05908Filter  filter = new SQP05908Filter();
            PanelLogic logic = new PanelLogic();
            logic.setSession(this.serverSession.getServerSession());

            filter.page.PAGNUM = 0;
            filter.page.PAGROW = 0;
            filter.page.TOTPAG = 0;
            filter.page.TOTROW = 0;
            filter.page.PAGINIT = 0;

            
            lstData = logic.loadSQP05908(filter);

            workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Users Management");
            Integer vi = 0;
            Iterator iter = lstData.iterator();
            Integer vj = 0;

            Row row = sheet.createRow(vj);
            Cell cell00 = row.createCell(0);
            cell00.setCellValue("USR");
            Cell cell01 = row.createCell(1);
            cell01.setCellValue("CITY");
            Cell cell02 = row.createCell(2);
            cell02.setCellValue("STAT");
            Cell cell03 = row.createCell(3);
            cell03.setCellValue("NOM");
            Cell cell04 = row.createCell(4);
            cell04.setCellValue("APE");
            Cell cell05 = row.createCell(5);
            cell05.setCellValue("CREMP");
            Cell cell06 = row.createCell(6);
            cell06.setCellValue("CARGO");
            Cell cell07 = row.createCell(7);
            cell07.setCellValue("CODEMP");
            Cell cell08 = row.createCell(8);
            cell08.setCellValue("DESC1");
            Cell cell09 = row.createCell(9);
            cell09.setCellValue("USCR");
            Cell cell10 = row.createCell(10);
            cell10.setCellValue("DTCR");
            Cell cell11 = row.createCell(11);
            cell11.setCellValue("USUP");
            Cell cell12 = row.createCell(12);
            cell12.setCellValue("DTUP");

            ++vj;
            while (iter.hasNext()) {

                row = sheet.createRow(vj);
                Cell cell000 = row.createCell(0);
                Cell cell001 = row.createCell(1);
                Cell cell002 = row.createCell(2);
                Cell cell003 = row.createCell(3);
                Cell cell004 = row.createCell(4);
                Cell cell005 = row.createCell(5);
                Cell cell006 = row.createCell(6);
                Cell cell007 = row.createCell(7);
                Cell cell008 = row.createCell(8);
                Cell cell009 = row.createCell(9);
                Cell cell010 = row.createCell(10);
                Cell cell011 = row.createCell(11);
                Cell cell012 = row.createCell(12);

                cell000.setCellValue(lstData.get(vi).USR);
                cell001.setCellValue(lstData.get(vi).CITY);
                cell002.setCellValue(lstData.get(vi).STAT);
                cell003.setCellValue(lstData.get(vi).NOM);
                cell004.setCellValue(lstData.get(vi).APE);
                cell005.setCellValue(lstData.get(vi).CREMP);
                cell006.setCellValue(lstData.get(vi).CARGO);
                cell007.setCellValue(lstData.get(vi).CODEM);
                cell008.setCellValue(lstData.get(vi).DESC1);
                cell009.setCellValue(lstData.get(vi).USCR);
                cell010.setCellValue(lstData.get(vi).DTCR);
                cell011.setCellValue(lstData.get(vi).USUP);
                cell012.setCellValue(lstData.get(vi).DTUP);

                iter.next();
                ++vi;
                ++vj;
            }

            /**
             * fileNameDownload = Nombre de descarga
             */
            String fileNameDownload = "usersMan_" + Functions.getFechaActual() + ".xlsx";

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
