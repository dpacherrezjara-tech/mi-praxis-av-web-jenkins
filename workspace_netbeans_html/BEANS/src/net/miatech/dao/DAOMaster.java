/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import net.miatech.libmiatec.A020;
import net.miatech.provider.Proveedor;
import org.apache.log4j.Logger;



/**
 *
 * @author claudia
 */
public class DAOMaster {

    private static final Logger logError = Logger.getLogger("errorLog");

    public List<A020> loadData(String ticket, String ccust, String calfa) {
        
        Connection con = null;
        Statement stm = null;
        ResultSet rst = null;
        String strSQL = "";
        A020 data = null;
        List<A020> lstData = new ArrayList<A020>();
        
        try {
            
             strSQL = "SELECT * FROM PRAXIS.A020 "
                     .concat(" WHERE A020AIRLIN='").concat(ccust).concat("' ");
            
            if(!ticket.trim().equals("")){
               strSQL = strSQL.concat(" AND A020CIA = '").concat(ticket.substring(0, 3))
                     .concat("' AND A020FORMA='").concat(ticket.substring(3, 7))
                     .concat("' AND A020SERIE='").concat(ticket.substring(7, 13))
                     .concat("' "); 
            }
            
            con = Proveedor.getConnectionIS();
            stm = con.createStatement();
            rst = stm.executeQuery(strSQL);
            
            while(rst.next()) {    
                
                data = new A020();
                data.A020AIRLIN = ccust;
                data.A020CIA = rst.getString("A020CIA").trim();
                data.A020FORMA = rst.getString("A020FORMA").trim();
                data.A020SERIE = rst.getString("A020SERIE").trim();
                data.A020CUPON = rst.getString("A020CUPON").trim();
                data.A020DCHEQ = rst.getString("A020DCHEQ").trim();
                data.A020FRECHA = rst.getString("A020FRECHA").trim();
                data.A020GRUPO = rst.getString("A020GRUPO").trim();
                data.A020MNRCD = rst.getString("A020MNRCD").trim();
                data.A020SUDEBI = rst.getDouble("A020SUDEBI");
                data.A020TOTDEB = rst.getDouble("A020TOTDEB");
                data.A020IMPNAC = rst.getDouble("A020IMPNAC");
                data.A020ANALIZ = rst.getDouble("A020ANALIZ");
                data.A020NETO = rst.getDouble("A020NETO");
                data.A020FVENTA = rst.getString("A020FVENTA").trim();
                data.A020FVLO = rst.getString("A020FVLO").trim();
                data.A020RUTA = rst.getString("A020RUTA").trim();
                data.A020KEY = rst.getString("A020KEY").trim();
                data.A020USER = rst.getString("A020USER").trim();
                data.A020SDATE = rst.getString("A020SDATE").trim();
                data.A020STIME = rst.getString("A020STIME").trim();
                data.A020RMSN = rst.getString("A020RMSN").trim();
                lstData.add(data);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            try { stm.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            try{
                if(rst!=null){ try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); } rst = null;}
                if(stm!=null){ try { stm.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); } stm = null;}
                if(con!=null){
                    con.close();
                    con = null;
                }
            }catch(Exception ex01){
                ex01.printStackTrace();
            }
        }
        
        return lstData;
    }
    
    
    
}
