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
import net.miatech.beans.PX152S01A1530Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class GainLossRefundDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public GainLossRefundDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public GainLossRefundDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX152S01A1530Filter> loadPX152S01A1530(PX152S01A1530Filter filter) throws SQLException, Exception {
        List<PX152S01A1530Filter> lstRtn = new ArrayList<>(0);
        PX152S01A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX152S01A1530(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_TFILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_FROM);
            cstmt01.setString(4, filter.IN_TO);
            cstmt01.setString(5, filter.IN_FUENTE);
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_PAIS);
            cstmt01.setString(8, filter.IN_GRUPO);
            cstmt01.setString(9, filter.IN_TKT);
            cstmt01.setString(10, filter.IN_GAINLOSS);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX152S01A1530Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1530FUENT = rs01.getString("A1530FUENT");
                objRtn.A1530PSVTA = rs01.getString("A1530PSVTA");
                objRtn.A713CIA = rs01.getString("A713CIA");
                objRtn.A713FORMA = rs01.getString("A713FORMA");
                objRtn.A713SERIE = rs01.getString("A713SERIE");
                objRtn.A713_CUPON = rs01.getString("A713_CUPON");
                objRtn.A713CIAI = rs01.getString("A713CIAI");
                objRtn.A713FORMAI = rs01.getString("A713FORMAI");
                objRtn.A713SERIEI = rs01.getString("A713SERIEI");
                objRtn.A713AGENTE = rs01.getString("A713AGENTE");
                objRtn.A713FECVTA = rs01.getString("A713FECVTA");
                objRtn.A713MDARV = rs01.getString("A713MDARV");
                objRtn.A1731_CFOP = rs01.getString("A1731_CFOP");
                objRtn.A713_VALOR = rs01.getDouble("A713_VALOR");
                objRtn.A720_VALOR = rs01.getDouble("A720_VALOR");
                objRtn.GAIN_LOSS = rs01.getDouble("GAIN_LOSS");
                objRtn.A713STAT = rs01.getString("A713STAT");
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
