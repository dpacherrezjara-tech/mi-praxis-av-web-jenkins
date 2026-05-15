/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.refund;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.MPF116Filter;
import net.miatech.praxis.refund.filter.A3096Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class ControlBsplinkProcessDAO {
        
    private IServerSession session;
    private CallableStatement cs = null;
    private CallableStatement cstmt = null;
    private PreparedStatement pstmt = null;
    private ResultSet rst = null;
    private ResultSet rs01 = null;
    private Connection cnx = null;
    private Statement stmt = null;
    
    private static final Logger logError = Logger.getLogger("errorLog");
    
        public ControlBsplinkProcessDAO() {
    }
          private void setClose() {
        if (rs01 != null) {
            try {
                rs01.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (cstmt != null) {
            try {
                cstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //===============
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        pasarGarbageCollector();
    }

        
        
     public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
     
     
       public ControlBsplinkProcessDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    
    // incia consulta
    
    public List<A3096Filter> loadRFS0034(A3096Filter filter) {
        cstmt = null;
        rs01 = null;
        cnx = null;
        A3096Filter row = null;
        List<A3096Filter> lista = new ArrayList<>();

        int totQTY_TOTAL = 0;
        int totQTY_AUT_AUD = 0;
        int totQTY_DEN_AUD = 0;
        int totQTY_OTR_AUD = 0;
        int totQTY_TOPROCCES = 0;
        int totQTY_WRK_PRE_BSP = 0;
        int totQTY_PEND_LOAD_BSP = 0;
        int totQTY_SENT_LOAD_BSP = 0;
        int totQTY_AUTO_LOAD_BSP = 0;
        int totQTY_PROC_LOAD_BSP = 0;
        int totQTY_CHNG_LOAD_BSP = 0;
        int totQTY_ERRO_LOAD_BSP = 0;
        int totQTY_OTRO_LOAD_BSP = 0;
        int totQTY_PEND_RSPT_BSPL = 0;
        int totQTY_AUTO_RSPT_BSPL = 0;
        int totQTY_REJE_RSPT_BSPL = 0;
        int totQTY_AVIA_RSPT_BSPL = 0;
        int totQTY_OTRO_RSPT_BSP = 0;
        int totQTY_TOLOAD = 0;
        int totQTY_PEND_STAT_BSPL = 0;
        int totQTY_BILL_STAT_BSP = 0;
        int totQTY_REJE_STAT_BSP = 0;
        int totQTY_MODI_STAT_BSP = 0;
        int totQTY_OTRO_STAT_BSP = 0;
        int totQTY_OTRO_STAT_BSP_ERROR = 0;
        
        
        int totAUTORIZADO = 0;
        int totRECHAZADO = 0;
        int totPENDIENTE = 0;
        int totERROR = 0;
        int totTOTAL_TICKETS = 0;

        String SQLCLL01;
        try {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RFS0034(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rs01 = cstmt.getResultSet();
            //Obteniendo los Totales ===========================================
            while (rs01.next()) {
                totAUTORIZADO = rs01.getInt("AUTORIZADO");
                totRECHAZADO = rs01.getInt("RECHAZADO");
                totPENDIENTE = rs01.getInt("PENDIENTE");
                totERROR = rs01.getInt("ERROR");
                totTOTAL_TICKETS = rs01.getInt("TOTAL_TICKETS");
            }

            rs01.close();
            
            String processed = "";

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    row = new A3096Filter();
                    
                    processed = rs01.getString("PROCESSED");
                    row.A3096DAUTH = rs01.getString("A3096FCARG");
                    row.A3096RBT1 = rs01.getString("A3096RBT1");
                    row.FILEFCAR = rs01.getString("A5003FILEFCAR");
                    row.QTY_AUTORIZADO = rs01.getInt("AUTORIZADO");
                    row.QTY_RECHAZADO = rs01.getInt("RECHAZADO");
                    row.QTY_PENDIENTE = rs01.getInt("PENDIENTE");
                    row.QTY_ERROR = rs01.getInt("ERROR");
                    row.QTY_TOTAL_TICKETS = rs01.getInt("TOTAL_TICKETS");
                    
                    if (processed == null || processed.trim().isEmpty() || processed.equalsIgnoreCase("P")) {
                        row.A3096PROCESSED = "P";
                    } else {
                        row.A3096PROCESSED = "F";   
                    }
                    
                    row.totAUTORIZADO = totAUTORIZADO;
                    row.totRECHAZADO = totRECHAZADO;
                    row.totPENDIENTE = totPENDIENTE;
                    row.totERROR = totERROR;
                    row.totTOTAL_TICKETS = totTOTAL_TICKETS;

                    row.page.PAGNUM = filter.page.PAGNUM;
                    row.page.PAGROW = filter.page.PAGROW;
                    row.page.TOTPAG = filter.page.TOTPAG;
                    row.page.TOTROW = filter.page.TOTROW;
                    lista.add(row);
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;
    }
    
    
    
    public List<A3096Filter> RFS0035(A3096Filter filter) {
        cstmt = null;
        rs01 = null;
        cnx = null;
        A3096Filter row = null;
        List<A3096Filter> lista = new ArrayList<>();

        String SQLCLL01;
        try {
                SQLCLL01 = "{CALL " + session.getMainLibrary() + ".RFS0035(?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A3096DAUTH);
            cstmt.setString(3, filter.IN_A4547FLAG);
            cstmt.setString(4, filter.IN_SEQ);

            cstmt.execute();


            rs01 = cstmt.getResultSet();
            //Obteniendo los Totales ===========================================
            while (rs01.next()) {
                row = new A3096Filter();
                row.IN_DATEFROM = filter.IN_DATEFROM;
                row.IN_DATETO = filter.IN_DATETO;
                row.IN_COUNTRY = filter.IN_COUNTRY;
                row.IN_NENV = filter.IN_NENV;
                row.IN_COUNTRY = filter.IN_COUNTRY;
                row.IN_FPROB = filter.IN_FPROB;
                row.IN_FRESB = filter.IN_FRESB;
                row.IN_STATUS = filter.IN_STATUS;
                row.A3096NENV = filter.A3096NENV;
                
                
                row.RN = rs01.getInt("RN");
                row.A3096FGRPO = rs01.getString("A3096FGRPO").trim();
                row.A3096FPROB = rs01.getString("A3096FPROB").trim();
                row.A3096FPBSP = rs01.getString("A3096FPBSP").trim();
                row.A3096FCARG = rs01.getString("A3096FCARG").trim();
                row.A3096TKT = rs01.getString("A3096TKT").trim();
                row.A3096NENV = rs01.getString("A3096NENV").trim();
                row.A3096IDSOL = rs01.getString("A3096IDSOL").trim();
                row.A3096PAIS = rs01.getString("A3096PAIS").trim();
                row.A3096ESTAD = rs01.getString("A3096ESTAD").trim();
                row.A3096FUENT = rs01.getString("A3096FUENT").trim();
                row.A3096TENVI = rs01.getString("A3096TENVI").trim();
                
                row.A4547STATU = rs01.getString("A4547STATU").trim();
                row.A4547FLAG = rs01.getString("A4547FLAG").trim();
                row.A4547DESCR = rs01.getString("A4547DESCR").trim();
                row.A4547COUNT = rs01.getInt("A4547COUNT");
                int iseq = rs01.getInt("A4547ISEQ");
                if (rs01.wasNull()) {
                    iseq = 0; // o déjalo vacío si tu bean lo permite
                }
                row.A4547ISEQ = iseq;
                

                lista.add(row);
            }

            rs01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;
    }

        
        
        
        
        
        
    
    
}
