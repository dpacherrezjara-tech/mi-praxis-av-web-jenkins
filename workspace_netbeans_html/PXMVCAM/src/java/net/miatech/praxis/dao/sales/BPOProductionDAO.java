package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP00234Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class BPOProductionDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00234Filter> loadSQP00234Filter(SQP00234Filter filter) throws SQLException, Exception {
        List<SQP00234Filter> lstRtn = new ArrayList<SQP00234Filter>(0);
        List<SQP00234Filter> lstData = new ArrayList<SQP00234Filter>(0);
        SQP00234Filter objRtn01;
        SQP00234Filter objRtn02;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00234(?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLINE);
            cstmt01.setString(2, filter.IN_DESDE);
            cstmt01.setString(3, filter.IN_HASTA);
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn01 = new SQP00234Filter();                
                objRtn01.FECHA_PROC = rs01.getString("FECHA_PROC");
                objRtn01.FUENTE = rs01.getString("FUENTE");
                
                objRtn01.QTY_GROUP = rs01.getInt("QTY_GROUP");
                objRtn01.QTY_DOCUM = rs01.getInt("QTY_DOCUM");
                objRtn01.QTY_SALE = rs01.getInt("QTY_SALE");
                objRtn01.QTY_EXCH = rs01.getInt("QTY_EXCH");
                objRtn01.QTY_RFND = rs01.getInt("QTY_RFND");
                objRtn01.QTY_MEMO = rs01.getInt("QTY_MEMO");
                objRtn01.QTY_OK_IC = rs01.getInt("QTY_OK_IC");
                objRtn01.QTY_ERR_IC = rs01.getInt("QTY_ERR_IC");
                objRtn01.QTY_TOT_ER_SP = rs01.getInt("QTY_TOT_ER_SP");
                objRtn01.QTY_ERR_SP = rs01.getInt("QTY_ERR_SP");
                objRtn01.QTY_OK_SP = rs01.getInt("QTY_OK_SP");
                objRtn01.QTY_GRUP_CER = rs01.getInt("QTY_GRUP_CER");
                objRtn01.QTY_GRUP_ABI = rs01.getInt("QTY_GRUP_ABI");
                objRtn01.QTY_CONT = rs01.getInt("QTY_CONT");

                lstRtn.add(objRtn01);
            }
            
            int len = lstRtn.size();
            Integer vi = 0, vj = 0, vk = 0;
            String fecha = "";
            
            int QTY_GROUP = 0, QTY_DOCUM = 0, QTY_SALE = 0, QTY_EXCH = 0, QTY_RFND = 0, QTY_MEMO = 0;
            int QTY_OK_IC = 0, QTY_ERR_IC = 0, QTY_TOT_ER_SP = 0, QTY_ERR_SP = 0, QTY_OK_SP = 0;
            int QTY_GRUP_CER = 0, QTY_GRUP_ABI = 0, QTY_CONT = 0;
            for(vi = 0; vi < len; ++vi){
                
                if ( !fecha.equals(lstRtn.get(vi).FECHA_PROC) ){
                    fecha = lstRtn.get(vi).FECHA_PROC;
                    
                    vk = 0;
                    QTY_GROUP = 0; QTY_DOCUM = 0; QTY_SALE = 0; QTY_EXCH = 0; QTY_RFND = 0;
                    QTY_MEMO = 0; QTY_OK_IC = 0; QTY_ERR_IC = 0; QTY_TOT_ER_SP = 0; QTY_ERR_SP = 0;
                    QTY_OK_SP = 0; QTY_GRUP_CER = 0; QTY_GRUP_ABI = 0; QTY_CONT = 0;
                    for(vj = 0; vj < len; ++vj){
                        if ( fecha.equals(lstRtn.get(vj).FECHA_PROC) ){
                            objRtn02 = new SQP00234Filter();
                            
                            objRtn02.FECHA_PROC = vk == 0 ? lstRtn.get(vj).FECHA_PROC : "";
                            objRtn02.FUENTE = lstRtn.get(vj).FUENTE;
                            
                            objRtn02.QTY_GROUP = lstRtn.get(vj).QTY_GROUP;
                            objRtn02.QTY_DOCUM = lstRtn.get(vj).QTY_DOCUM;
                            objRtn02.QTY_SALE = lstRtn.get(vj).QTY_SALE;
                            objRtn02.QTY_EXCH = lstRtn.get(vj).QTY_EXCH;
                            objRtn02.QTY_RFND = lstRtn.get(vj).QTY_RFND;
                            objRtn02.QTY_MEMO = lstRtn.get(vj).QTY_MEMO;
                            objRtn02.QTY_OK_IC = lstRtn.get(vj).QTY_OK_IC;
                            objRtn02.QTY_ERR_IC = lstRtn.get(vj).QTY_ERR_IC;
                            objRtn02.QTY_TOT_ER_SP = lstRtn.get(vj).QTY_TOT_ER_SP;
                            objRtn02.QTY_ERR_SP = lstRtn.get(vj).QTY_ERR_SP;
                            objRtn02.QTY_OK_SP = lstRtn.get(vj).QTY_OK_SP;
                            objRtn02.QTY_GRUP_CER = lstRtn.get(vj).QTY_GRUP_CER;
                            objRtn02.QTY_GRUP_ABI = lstRtn.get(vj).QTY_GRUP_ABI;
                            objRtn02.QTY_CONT = lstRtn.get(vj).QTY_CONT;
                            
                            QTY_GROUP+= objRtn02.QTY_GROUP;
                            QTY_DOCUM+= objRtn02.QTY_DOCUM;
                            QTY_SALE+= objRtn02.QTY_SALE;
                            QTY_EXCH+= objRtn02.QTY_EXCH;
                            QTY_RFND+= objRtn02.QTY_RFND;
                            QTY_MEMO+= objRtn02.QTY_MEMO;
                            QTY_OK_IC+= objRtn02.QTY_OK_IC;
                            QTY_ERR_IC+= objRtn02.QTY_ERR_IC;
                            QTY_TOT_ER_SP+= objRtn02.QTY_TOT_ER_SP;
                            QTY_ERR_SP+= objRtn02.QTY_ERR_SP;
                            QTY_OK_SP+= objRtn02.QTY_OK_SP;
                            QTY_GRUP_CER+= objRtn02.QTY_GRUP_CER;
                            QTY_GRUP_ABI+= objRtn02.QTY_GRUP_ABI;
                            QTY_CONT+= objRtn02.QTY_CONT;
                            
                            lstData.add(objRtn02);
                            ++vk;
                        }
                    }
                    objRtn02 = new SQP00234Filter();
                    objRtn02.FECHA_PROC = "";
                    objRtn02.FUENTE = "TOTAL";
                    
                    objRtn02.QTY_GROUP = QTY_GROUP;
                    objRtn02.QTY_DOCUM = QTY_DOCUM;
                    objRtn02.QTY_SALE = QTY_SALE;
                    objRtn02.QTY_EXCH = QTY_EXCH;
                    objRtn02.QTY_RFND = QTY_RFND;
                    objRtn02.QTY_MEMO = QTY_MEMO;
                    objRtn02.QTY_OK_IC = QTY_OK_IC;
                    objRtn02.QTY_ERR_IC = QTY_ERR_IC;
                    objRtn02.QTY_TOT_ER_SP = QTY_TOT_ER_SP;
                    objRtn02.QTY_ERR_SP = QTY_ERR_SP;
                    objRtn02.QTY_OK_SP = QTY_OK_SP;
                    objRtn02.QTY_GRUP_CER = QTY_GRUP_CER;
                    objRtn02.QTY_GRUP_ABI = QTY_GRUP_ABI;
                    objRtn02.QTY_CONT = QTY_CONT;
                    
                    lstData.add(objRtn02);
                }
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
