package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class RevenueByOperationDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public RevenueByOperationDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1971Filter> loadPX246SQP00328(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<>(0);
        A1971Filter objRtn;

        strSQL = "{CALL PRAXIS.SQP00328(?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1971Filter();
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                objRtn.NFLIGHT = rst.getString("NFLIGHT");
                objRtn.CARRIER = rst.getString("CARRIER");
                objRtn.CDEPART = rst.getString("CDEPART");
                objRtn.CARRIVA = rst.getString("CARRIVA");
                objRtn.NPLANE = rst.getString("NPLANE");
                objRtn.strDescripcion = rst.getString("DESCRIP");
                objRtn.KMS = rst.getInt("KMS");
                objRtn.KMS_1 = rst.getInt("KMS1");
                objRtn.strDescripcion4 = rst.getString("MDACP");
                objRtn.VCPN_J = rst.getDouble("J_VCPN");
                objRtn.QTYPAX_J = rst.getInt("J_PAX");
                objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                objRtn.VCPN_Y = rst.getDouble("Y_VCPN");
                objRtn.QTYPAX_Y = rst.getInt("Y_PAX");
                objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                //Total
                objRtn.VCPN = rst.getDouble("VCPN");
                objRtn.QTYPAX = rst.getLong("QTYPAX");
                objRtn.QTYVNR = rst.getInt("QTYVNR");
                objRtn.QTYNRE = rst.getInt("QTYNRE");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1971Filter> loadPX246SQP00335(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<>(0);
        A1971Filter objRtn;

        strSQL = "{CALL PRAXIS.SQP00335(?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1971Filter();
                objRtn.NPLANE = filter.NPLANE;
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                objRtn.ZONA = rst.getString("ZONA");
                objRtn.strZona = Functions.getNombreZonas(objRtn.ZONA);
                objRtn.CARRIER = rst.getString("CARRIER");
                objRtn.KMS = rst.getInt("KMS");
                objRtn.KMS_1 = rst.getInt("KMS1");
                objRtn.strDescripcion4 = rst.getString("MDACP");
                objRtn.VCPN_J = rst.getDouble("J_VCPN");
                objRtn.QTYPAX_J = rst.getInt("J_PAX");
                objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                objRtn.VCPN_Y = rst.getDouble("Y_VCPN");
                objRtn.QTYPAX_Y = rst.getInt("Y_PAX");
                objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                //Total
                objRtn.VCPN = rst.getDouble("VCPN");
                objRtn.QTYPAX = rst.getLong("QTYPAX");
                objRtn.QTYVNR = rst.getInt("QTYVNR");
                objRtn.QTYNRE = rst.getInt("QTYNRE");
                // objRtn.AVG = (objRtn.QTYPAX>0)?objRtn.VCPN/objRtn.QTYPAX:0;
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1971Filter> loadPX246SQP00334(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<>(0);
        A1971Filter objRtn;
        
        strSQL = "{CALL PRAXIS.SQP00334(?,?,?,?,?,?,?,?,?,?)}";

        session.getCNXIBMDB2().open();
        try {
            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setString(4, filter.DFLIGHT);
            cs.setString(5, filter.NPLANE);
            cs.setString(6, filter.ZONA);
            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1971Filter();
                objRtn.NPLANE = filter.NPLANE;
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                objRtn.CARRIER = rst.getString("CARRIER");
                objRtn.CDEPART = rst.getString("CDEPART");
                objRtn.CARRIVA = rst.getString("CARRIVA");
                objRtn.strRuta = objRtn.CDEPART + " - " + objRtn.CARRIVA;
                objRtn.KMS = rst.getInt("KMS");
                objRtn.KMS_1 = rst.getInt("KMS1");
                objRtn.strDescripcion4 = rst.getString("MDACP");
                objRtn.VCPN_J = rst.getDouble("J_VCPN");
                objRtn.QTYPAX_J = rst.getInt("J_PAX");
                objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                objRtn.VCPN_Y = rst.getDouble("Y_VCPN");
                objRtn.QTYPAX_Y = rst.getInt("Y_PAX");
                objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                //Total
                objRtn.VCPN = rst.getDouble("VCPN");
                objRtn.QTYPAX = rst.getLong("QTYPAX");
                objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;
                objRtn.QTYVNR = rst.getInt("QTYVNR");
                objRtn.QTYNRE = rst.getInt("QTYNRE");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A1971Filter> loadPX246SQP00333(A1971Filter filter) throws SQLException, Exception {

        List<A1971Filter> lstRtn = new ArrayList<>(0);
        A1971Filter objRtn;
        long totY = 0, totJ = 0, totKMS = 0, totFlight = 0, QTYVNR = 0, QTYNRE = 0;
        double AMT_Y = 0, AMT_J = 0, totAMT = 0;
        int totCabin = 0;

        strSQL = "{CALL PRAXIS.SQP00333(?,?,?,?,?,?,?)}";
        
        session.getCNXIBMDB2().open();
        try {
            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);

            rst = cs.getResultSet();
            while (rst.next()) {
                totY = rst.getLong("QTYPAXY");
                totJ = rst.getLong("QTYPAXJ");
                totCabin = rst.getInt("QTYPAX");
                AMT_Y = rst.getDouble("VCPNY");
                AMT_J = rst.getDouble("VCPNJ");
                totAMT = rst.getDouble("VCPN");
                totKMS = rst.getLong("KMS");
                totFlight = rst.getLong("FLIGHT");

                QTYVNR = rst.getLong("QTYVNR");
                QTYNRE = rst.getLong("QTYNRE");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A1971Filter();
                    objRtn.DFLIGHT = rst.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert6(objRtn.DFLIGHT);
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.NPLANE = rst.getString("NPLANE");
                    objRtn.QTYFlight = rst.getLong("FLIGHT");
                    //objRtn.CABI = rst.getString("CABI");
                    objRtn.KMS = rst.getInt("KMS");
                    //objRtn.KMS_1 = rst.getInt("KMS1");
                    objRtn.strDescripcion4 = rst.getString("MDACP");
                    objRtn.VCPN_J = rst.getDouble("VCPNJ");
                    objRtn.QTYPAX_J = rst.getInt("QTYPAXJ");
                    objRtn.AVG_J = (objRtn.QTYPAX_J > 0) ? objRtn.VCPN_J / objRtn.QTYPAX_J : 0;
                    objRtn.VCPN_Y = rst.getDouble("VCPNY");
                    objRtn.QTYPAX_Y = rst.getInt("QTYPAXY");
                    objRtn.AVG_Y = (objRtn.QTYPAX_Y > 0) ? objRtn.VCPN_Y / objRtn.QTYPAX_Y : 0;
                    //Total
                    objRtn.VCPN = rst.getDouble("VCPN");
                    objRtn.QTYPAX = rst.getLong("QTYPAX");
                    objRtn.AVG = (objRtn.QTYPAX > 0) ? objRtn.VCPN / objRtn.QTYPAX : 0;
                    objRtn.CAPJ = rst.getLong("CAPJ");
                    objRtn.DiffCapJ = (objRtn.CAPJ > 0) ? objRtn.CAPJ - objRtn.QTYPAX_J : 0;
                    objRtn.CAPY = rst.getLong("CAPY");
                    objRtn.DiffCapY = (objRtn.CAPY > 0) ? objRtn.CAPY - objRtn.QTYPAX_Y : 0;
                    objRtn.CAPTOT = rst.getInt("CAPTOT");
                    objRtn.DiffCap = (objRtn.CAPTOT > 0) ? objRtn.CAPTOT - objRtn.QTYPAX : 0;
                    objRtn.QTYVNR = rst.getInt("QTYVNR");
                    objRtn.QTYNRE = rst.getInt("QTYNRE");

                    //Porcentajes
                    objRtn.PerJ = (objRtn.CAPJ > 0) ? (objRtn.QTYPAX_J * 100) / objRtn.CAPJ : 0;
                    objRtn.PerY = (objRtn.CAPY > 0) ? (objRtn.QTYPAX_Y * 100) / objRtn.CAPY : 0;
                    objRtn.PerCAP = (objRtn.CAPTOT > 0) ? (objRtn.QTYPAX * 100) / objRtn.CAPTOT : 0;

                    //TOTALES
                    objRtn.totQTYPAX_J = totJ;
                    objRtn.totQTYPAX_Y = totY;
                    objRtn.totKMS = totKMS;
                    objRtn.totQTYPAX = totCabin;

                    objRtn.totVCPN_J = AMT_J;
                    objRtn.totVCPN_Y = AMT_Y;
                    objRtn.totVCPN = totAMT;

                    objRtn.totQTYFlight = totFlight;

                    objRtn.totQTYVNR = QTYVNR;
                    objRtn.totQTYNRE = QTYNRE;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
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
