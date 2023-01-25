/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX151S01A1530Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ProgressCorrectionvalidationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProgressCorrectionvalidationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProgressCorrectionvalidationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX151S01A1530Filter> loadPX151S01A1530(PX151S01A1530Filter filter) throws SQLException, Exception {
        List<PX151S01A1530Filter> lstRtn = new ArrayList<>(0);
        PX151S01A1530Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String SQLCLL01 = "{CALL PX151S01A1530(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL SQP00124(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.setInt(1, filter.VP_TIPO);
            cstmt01.setString(2, filter.VP_FECHA_00);
            cstmt01.setString(3, filter.VP_FECHA_01);
            cstmt01.setString(4, filter.VP_A1530FUENT);
            /*cstmt01.setString(5, filter.VP_A1530PSVTA); 
             cstmt01.setString(6, filter.VP_A1530CIUVT); */
            cstmt01.setString(5, filter.VP_A1530STPRO);
            /*cstmt01.setString(8, filter.VP_A1530MDA); 
             cstmt01.setString(9, filter.VP_A1530GRUPO);
             cstmt01.setString(10, filter.VP_A1530SFUEN);
             cstmt01.setString(11, filter.VP_A1530AGENT);*/

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX151S01A1530Filter();
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530FUENT = rs01.getString("A1530FUENT");
                objRtn.A1530SFUEN = rs01.getString("A1530SFUEN");
                //objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1530PSVTA = rs01.getString("A1530PSVTA");
                //objRtn.A1530CIUVT = rs01.getString("A1530CIUVT");
                //objRtn.A1530BANCO = rs01.getString("A1530BANCO");
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");

                //objRtn.A1530FCONT = rs01.getString("A1530FCONT");
                objRtn.A1530FDESD = rs01.getString("A1530FDESD");
                objRtn.A1530FHAST = rs01.getString("A1530FHAST");
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.A1530STPRO = rs01.getString("A1530STPRO");
                objRtn.A1530STPRO_00 = rs01.getString("A1530STPRO_00");
                // Amount Values 
                objRtn.A1720QDOSA = rs01.getInt("A1720QDOSA");
                objRtn.A1720QDORF = rs01.getInt("A1720QDORF");
                objRtn.A1720QDONE = objRtn.A1720QDOSA + objRtn.A1720QDORF;
                objRtn.A1720VSALC = rs01.getDouble("A1720VSALC");
                objRtn.A1720VRFLC = rs01.getDouble("A1720VRFLC");
                objRtn.A1720VNTLC = rs01.getDouble("A1720VNTLC");

                objRtn.SALE_FARE = rs01.getDouble("SALE_FARE");
                objRtn.SALE_OTHER = rs01.getDouble("SALE_OTHER");
                objRtn.SALE_TAX = rs01.getDouble("SALE_TAX");
                objRtn.SALE_TAXDO = rs01.getDouble("SALE_TAXDO");
                objRtn.SALE_TAXIN = rs01.getDouble("SALE_TAXIN");
                objRtn.SALE_TAXDI = rs01.getDouble("SALE_TAXDI");
                objRtn.SALE_COMM = rs01.getDouble("SALE_COMM");
                objRtn.SALE = objRtn.SALE_FARE + objRtn.SALE_OTHER + objRtn.SALE_TAX + objRtn.SALE_COMM;

                objRtn.RFND_FARE = rs01.getDouble("RFND_FARE");
                objRtn.RFND_OTHER = rs01.getDouble("RFND_OTHER");
                objRtn.RFND_TAX = rs01.getDouble("RFND_TAX");
                objRtn.RFND_TAXDO = rs01.getDouble("RFND_TAXDO");
                objRtn.RFND_TAXIN = rs01.getDouble("RFND_TAXIN");
                objRtn.RFND_TAXDI = rs01.getDouble("RFND_TAXDI");
                objRtn.RFND_COMM = rs01.getDouble("RFND_COMM");
                objRtn.RFND = objRtn.RFND_FARE + objRtn.RFND_OTHER + objRtn.RFND_TAX + objRtn.RFND_COMM;

                objRtn.NETO_FARE = rs01.getDouble("NETO_FARE");
                objRtn.NETO_OTHER = rs01.getDouble("NETO_OTHER");
                objRtn.NETO_TAX = rs01.getDouble("NETO_TAX");
                objRtn.NETO_TAXDO = rs01.getDouble("NETO_TAXDO");
                objRtn.NETO_TAXIN = rs01.getDouble("NETO_TAXIN");
                objRtn.NETO_TAXDI = rs01.getDouble("NETO_TAXDI");
                objRtn.NETO_COMM = rs01.getDouble("NETO_COMM");
                objRtn.NETO = objRtn.NETO_FARE + objRtn.NETO_OTHER + objRtn.NETO_TAX + objRtn.NETO_COMM;
                //objRtn.REF_FARE = rs01.getDouble("REF_FARE");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
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
