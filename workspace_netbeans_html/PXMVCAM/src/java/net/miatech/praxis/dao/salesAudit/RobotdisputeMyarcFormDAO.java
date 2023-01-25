/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A4139Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RobotdisputeMyarcFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4139Filter> SearchDisputas(A4139Filter filter) throws SQLException, Exception {
        List<A4139Filter> lstRtn = new ArrayList<A4139Filter>(0);
        A4139Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04293(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_ROBOT);
            cstmt01.setString(7, filter.IN_AREA);
            cstmt01.setString(8, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4139Filter();

                if (!filter.IN_OPTION.equals("2") && (filter.IN_ROBOT.equals("1") || filter.IN_ROBOT.equals("2"))) {
                    objRtn.A4139CCUST = rs01.getString("A4139CCUST");
                    objRtn.A4139PAIS = rs01.getString("A4139PAIS");
                    objRtn.A4139CANTI = rs01.getInt("A4139CANTI");
                    objRtn.A4139FLAG = rs01.getString("A4139FLAG");
                    objRtn.A4139FREGI = rs01.getString("A4139FREGI");
                    objRtn.A4139REGIS = rs01.getString("A4139REGIS");
                    objRtn.A4139HREGI = rs01.getString("A4139HREGI");
                    objRtn.A4139ROBOT = rs01.getString("A4139ROBOT");
                    objRtn.A4139FINA = rs01.getString("A4139FINA");                 
                    objRtn.A4139TOTALPAG = rs01.getString("A4139CANTPAGI");
                    //A4139CANTI2                    
                    
                } else {
                    objRtn.A4139CCUST = rs01.getString("A4137CCUST");
                    objRtn.A4139PAIS = rs01.getString("A4137PAIS");
                    //objRtn.A4139CANTI = rs01.getInt("A4139CANTI");
                    objRtn.A4139STATO = rs01.getString("A4137STATO");
                    objRtn.A4139FLAG = rs01.getString("A4137FLAG");
                    objRtn.A4139FREGI = rs01.getString("A4137FREGI");
                    objRtn.A4139USER = rs01.getString("A4137USER");
                    objRtn.A4139ROBOT = rs01.getString("A4137ROBOT");
                    objRtn.A4139NMEMO = rs01.getString("A4137NMEMO");
                    objRtn.A4139CNXPA = rs01.getString("A4137CNXPA");
                    objRtn.A4139TYPE = rs01.getString("A4137TYPE");
                    objRtn.A4139AREA = rs01.getString("A4137AREA");
                    objRtn.A4139BASE = rs01.getString("A4137BASE");
                    objRtn.A4139NETO = rs01.getDouble("A4137NETO");                   
                    objRtn.A4139DDATE = rs01.getString("A4137DDATE");
                    objRtn.A4139FFILE = rs01.getString("A4137FFILE");
                    objRtn.A4139TOTALPAG = rs01.getString("A4137TOTALPAG");
                    objRtn.A4139ORIGEN= rs01.getString("A4137ORIGEN");
                    
                    //objRtn.A4139DIAS = rs01.getString("A4139DIAS");                                        
                }

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

}
