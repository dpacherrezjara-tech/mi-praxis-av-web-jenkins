/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.compensation;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.compensation.SQP04067Filter;
import net.miatech.praxis.compensation.SQP04068Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.compensation.CompensationLogic;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONValue;
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
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/Compensation")
public class CompensationController extends BaseController {

    private CompensationLogic logic;
    @RequestMapping(value = "/search_cargalog")
    public @ResponseBody
    String search_cargalog(ModelMap map, HttpServletRequest request) {
        List<SQP04067Filter> listaData;
        SQP04067Filter filter;
        filter = new SQP04067Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {

            filter.VP_A4023FPROC1 = request.getParameter("VP_A4023FPROC1");
            filter.VP_A4023FPROC2 = request.getParameter("VP_A4023FPROC2");
            filter.VP_A4023STERR = request.getParameter("VP_A4023STERR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new CompensationLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.loadSQP04067(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/setLoadFileInput", method = RequestMethod.POST)
    public @ResponseBody
    String setLoadFileInput(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        SQP04068Filter filter = new SQP04068Filter();                
        SQP04068Filter objRtn = null;
        Integer cont = 0;        
        Integer cont1 = 0;        
        try {        
            
            logic = new CompensationLogic();
            logic.setSession(this.serverSession.getServerSession());            
            XSSFWorkbook workbook = new XSSFWorkbook(excelfile.getInputStream());
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
                        
            //data for excel
            String transactionTypeId;	
            String itemTransactionId;	
            String LOCALIZADOR;	
            String PNR;	
            String NOMBREPAX;	
            //String CLASE;	
            //String ORIGEN_DESTINO;	
            //String NUMERO_VUELO;	
            String FECHA;
            String BOLETO;	
            String FECHA_EMISION;
            String PCC_EMITE;	
            String BASE;
            String TUA;	
            String OTROS_CARGOS;
            String IMPUESTOS;
            String TOTAL_SIN_MARGEN;	
            String Margen;	
            String TOTAL_CON_MARGEN;	
            String MONEDA;	
            //String CANAL;	
            String TOTAL_MXN_MARGEN;
            
            //json object
            String json_texto1;
            String json_texto = "";
            json_texto1 = "[";
                        
            //filter = new SQP04059Filter();
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            while (iterator.hasNext()) {                
                cont++;
                Row sheet = iterator.next();
                //Iterator<Cell> cellIterator = currentRow.iterator();                
                if (cont > 1) {  
                    cont1++;
                    if (sheet.getCell(0) != null) {                                                
                        transactionTypeId = sheet.getCell(0)== null ? "" : sheet.getCell(0).toString();
                        itemTransactionId = sheet.getCell(1)== null ? "" : sheet.getCell(1).toString();
                        LOCALIZADOR  = sheet.getCell(2)== null ? "" : sheet.getCell(2).toString();
                        PNR = sheet.getCell(3)== null ? "0": sheet.getCell(3).toString();
                        NOMBREPAX = sheet.getCell(4)== null ? "" : sheet.getCell(4).toString();
                        //CLASE=  sheet.getCell(5)== null ? "" : sheet.getCell(5).toString(); 
                        //ORIGEN_DESTINO= sheet.getCell(6)== null ? "" : sheet.getCell(6).toString();
                        //NUMERO_VUELO= sheet.getCell(7)== null ? "" : sheet.getCell(7).toString();                        
                        FECHA=  sheet.getCell(8)== null ? "" : sheet.getCell(8).toString(); 
                        BOLETO=  sheet.getCell(9)== null ? "" : sheet.getCell(9).toString(); 
                        FECHA_EMISION=  sheet.getCell(10)== null ? "" : sheet.getCell(10).toString(); 
                        PCC_EMITE=  sheet.getCell(11)== null ? "" : sheet.getCell(11).toString(); 
                        BASE=  sheet.getCell(12)== null ? "0" : sheet.getCell(12).toString(); 
                        TUA=  sheet.getCell(13)== null ? "0" : sheet.getCell(13).toString(); 
                        OTROS_CARGOS=  sheet.getCell(14)== null ? "0" : sheet.getCell(14).toString(); 
                        IMPUESTOS=  sheet.getCell(15)== null ? "0" : sheet.getCell(15).toString(); 
                        TOTAL_SIN_MARGEN=  sheet.getCell(16)== null ? "0" : sheet.getCell(16).toString(); 
                        Margen=  sheet.getCell(17)== null ? "0" : sheet.getCell(17).toString(); 
                        TOTAL_CON_MARGEN=  sheet.getCell(18)== null ? "0" : sheet.getCell(18).toString(); 
                        MONEDA=  sheet.getCell(19)== null ? "" : sheet.getCell(19).toString(); 
                        //CANAL=  sheet.getCell(20)== null ? "" : sheet.getCell(20).toString();
                        TOTAL_MXN_MARGEN=  sheet.getCell(21)== null ? "0" : sheet.getCell(21).toString();                        
                        //crear obj json
                        HashMap obj=new HashMap();                         
                        obj.put("item", cont1 );
                        obj.put("transactionTypeId", transactionTypeId );    
                        obj.put("itemTransactionId", itemTransactionId );
                        obj.put("LOCALIZADOR", LOCALIZADOR );
                        obj.put("PNR", PNR );
                        obj.put("NOMBREPAX", NOMBREPAX );                         
                        //obj.put("CLASE",CLASE); //NO SE USA
                        //obj.put("ORIGEN_DESTINO",ORIGEN_DESTINO);//NO SE USA
                        //obj.put("NUMERO_VUELO",NUMERO_VUELO);//NO SE USA
                        obj.put("FECHA",FECHA);
                        obj.put("BOLETO",BOLETO);
                        obj.put("FECHA_EMISION",FECHA_EMISION);
                        obj.put("PCC_EMITE",PCC_EMITE);
                        obj.put("BASE",new Double(BASE));
                        obj.put("TUA",new Double(TUA));
                        obj.put("OTROS_CARGOS",new Double(OTROS_CARGOS));
                        obj.put("IMPUESTOS",new Double(IMPUESTOS));
                        obj.put("TOTAL_SIN_MARGEN",new Double(TOTAL_SIN_MARGEN));
                        obj.put("Margen",new Double(Margen));
                        obj.put("TOTAL_CON_MARGEN",new Double(TOTAL_CON_MARGEN));
                        obj.put("MONEDA",MONEDA);
                        //obj.put("CANAL",CANAL);//NO SE USA
                        obj.put("TOTAL_MXN_MARGEN",new Double(TOTAL_MXN_MARGEN));
                        String jsonText = JSONValue.toJSONString(obj);                                                  
                        json_texto += jsonText + ",";                        
                    }
                }
            }    
            
            int length = json_texto.length(); 
            json_texto1 +=  json_texto.substring(0,length-1);            
            json_texto1 += "]";             
            filter.VP_JSON = json_texto1;             
            objRtn = logic.setSQP04068Filter(filter);
            
            map.put("success", true);
            map.put("objRtn",  objRtn);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
}
