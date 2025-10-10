/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.entities.MPF122Filter;
import net.miatech.praxis.payment.filter.A4451Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class ErrorControlModuleDAO {
    
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    
        public ErrorControlModuleDAO() {
    }
        
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ErrorControlModuleDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

//    
//    //Creamos la primera lista para llenar la grilla principal
//    
    public List<MPF122Filter> listarErrorControlMPF122(MPF122Filter filter)throws SQLException, Exception {
        
        
        
        List<MPF122Filter> listaData = new ArrayList<>();
        MPF122Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.MPS211(?, ?, ?, ?, ?, ?,?,?,?,?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // para la paginacion
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            // los de entrada
    
            cstmt.setString(1, filter.IN_PF122CCUST.trim());
            cstmt.setString(2, filter.IN_PF122FPROC.trim());
            cstmt.setString(3, filter.IN_PF122CODPR.trim());
            cstmt.setString(4, filter.IN_PF122CUSPR.trim());
            cstmt.setString(5, filter.IN_PF122FLIQU_FROM.trim());
            cstmt.setString(6, filter.IN_PF122FLIQU_TO.trim());
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            // se actualiza paginacion
            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPF122Filter();

                bean.IN_PF122CCUST = rst.getString("PF122CCUST");
                bean.IN_PF122TIPO = rst.getString("PF122TIPO");
                bean.IN_PF122CODPR = rst.getString("PF122CODPR");
                bean.IN_PF122FPROC = rst.getString("PF122FPROC");
                
                bean.IN_PF122LIQUI = rst.getString("PF122LIQUI");
                bean.IN_PF122FLIQU = rst.getString("PF122FLIQU");

                bean.IN_PF122CARDN = rst.getString("PF122CARDN");
                bean.IN_PF122SDATE = rst.getString("PF122SDATE");
                bean.IN_PF122CAMPO = rst.getString("PF122CAMPO");
                bean.IN_PF122DATA = rst.getString("PF122DATA");
                bean.IN_PF122SAUTH = rst.getString("PF122SAUTH");
                bean.IN_PF122CMERC = rst.getString("PF122CMERC");
                


               //// del sistema
                bean.USCR = rst.getString("PF122USRIN");
                bean.FECR = rst.getString("PF122FECIN");
                bean.HOCR = rst.getString("PF122HORIN");
                bean.USUP = rst.getString("PF122USRAC");
                bean.FEUP = rst.getString("PF122FECAC");
                bean.HOUP = rst.getString("PF122HORAC");



                // Copiar paginación en cada bean si es necesario
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                listaData.add(bean);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;
        
        
        
        
    }
    
    
    
       
    
    // LLAMAMOS  callMPS210
        public String callStoreMPS210(String codpro, String prda) throws SQLException, Exception {
        String message = "";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQL = "{CALL PRAXISMP.MPS210(?, ?, ?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.registerOutParameter(4, Types.VARCHAR);

            // Parámetros de entrada
            cstmt.setString(1, codpro != null ? codpro.trim() : "");
            cstmt.setString(2, prda != null ? prda.trim() : "");

            // Parámetro de salida
            cstmt.setString(3, "");
            cstmt.setString(4, "");

            // Ejecutamos el SP
            cstmt.execute();

            // Obtenemos el mensaje de salida (si lo hay)
             String sqlCode = cstmt.getString(3);
        String sqlMessage = cstmt.getString(4);

        message = "Message #: " + sqlCode + " | MESSAGE: " + sqlMessage;

            if (message == null || message.trim().isEmpty()) {
                message = "Proceso MPS210 ejecutado correctamente.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            message = "Error al ejecutar MPS210: " + e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return message;
    }

    

}
