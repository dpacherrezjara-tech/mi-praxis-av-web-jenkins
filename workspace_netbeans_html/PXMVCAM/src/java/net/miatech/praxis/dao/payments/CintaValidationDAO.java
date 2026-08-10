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
import net.miatech.praxis.payment.filter.A1348Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class CintaValidationDAO {
    
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    
        public CintaValidationDAO() {
    }
        
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CintaValidationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    
    
     public List<A1348Filter> searchCintaValidation(A1348Filter filter)throws SQLException, Exception {
        
        
        
        List<A1348Filter> listaData = new ArrayList<>();
        A1348Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.MPS760(?, ?, ?, ?, ?,?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

     
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);


            cstmt.setString(1, filter.IN_DATEF.trim());
            cstmt.setString(2, filter.IN_DATET.trim());
            cstmt.setInt(3, filter.page.PAGNUM);
            cstmt.setInt(4, filter.page.PAGROW);
            cstmt.setInt(5, filter.page.TOTPAG);
            cstmt.setInt(6, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(3);
            filter.page.PAGROW = cstmt.getInt(4);
            filter.page.TOTPAG = cstmt.getInt(5);
            filter.page.TOTROW = cstmt.getInt(6);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new A1348Filter();

                //bean.ID = rst.getString("ID").trim();
                bean.fechaProceso = rst.getString("FECHA_PROCESO").trim();
                bean.totalCinta = rst.getInt("TOTAL_CINTA");
                bean.ventasEsperadas = rst.getInt("ESPERADO_A720");
                bean.ventasCargadas = rst.getInt("REAL_A720");
                bean.estadoVentas = rst.getString("CHECK_A720");
                bean.reembolsosEsperados = rst.getInt("ESPERADO_A713");
                bean.reembolsosCargados = rst.getInt("REAL_A713");
                bean.estadoReembolsos = rst.getString("CHECK_A713");
                bean.admAcmEsperados = rst.getInt("ESPERADO_A714");
                bean.admAcmCargados = rst.getInt("REAL_A714");
                bean.estadoAdmAcm = rst.getString("CHECK_A714");
                bean.balanceProceso = rst.getString("BALANCE_PROCESO");
                


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
     
     ///SEARCH DETAIL
     
     
     public List<A1348Filter> searchDetail(A1348Filter filter)throws SQLException, Exception {
        
        
        
        List<A1348Filter> listaData = new ArrayList<>();
        A1348Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.MPS761(?, ?, ?, ?, ?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // para la paginacion
            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);


            cstmt.setString(1, filter.IN_DATE.trim());
            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            // se actualiza paginacion
            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new A1348Filter();

               
                bean.fechaProceso = rst.getString("FECHA_PROCESO").trim();
                bean.ticket = rst.getString("TICKET");
                bean.tipoDoc = rst.getString("TIPO_DOC").trim();
                bean.tablaOrigen = rst.getString("TABLA_ORIGEN").trim();
           
    
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
     
     
     
    
    
    
    
    
    
    
}
