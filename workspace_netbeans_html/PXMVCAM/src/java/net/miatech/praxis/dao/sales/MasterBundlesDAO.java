package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.beans.SQP00824Filter;
import net.miatech.beans.SQP00826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2534;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class MasterBundlesDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public MasterBundlesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SQP00824Filter> loadSQP00824(SQP00824Filter filter) {
        List<SQP00824Filter> lstRtn = new ArrayList<>(0);
        SQP00824Filter objRtn;

        strSQL = "{CALL SQP00824(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TFILTER);
            cs.setString(3, filter.IN_BUNDL);
            cs.setString(4, filter.IN_RFIC);
            cs.setString(5, filter.IN_SUBCD);

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new SQP00824Filter();
                objRtn.RN = rst.getLong("RN");

                objRtn.A2534CCUST = rst.getString("A2534CCUST").trim();
                objRtn.A2534BRFIC = rst.getString("A2534ARFIC").trim();
                objRtn.A2534BRFIS = rst.getString("A2534BRFIS").trim();
                objRtn.A2534DESCR = rst.getString("A2534DESCR").trim();
                objRtn.A2534IMPMB = rst.getDouble("A2534IMPMB");
                objRtn.A2534IMPTB = rst.getDouble("A2534IMPTB");
                objRtn.A2534MDABD = rst.getString("A2534MDABD").trim();
                objRtn.A2534NETOB = rst.getDouble("A2534NETOB");
                objRtn.A2534TEMD = rst.getString("A2534TEMD").trim();
                objRtn.A2534TOTBD = rst.getDouble("A2534TOTBD");
                objRtn.A2534VDESD = rst.getString("A2534VDESD").trim();
                objRtn.A2534VHAST = rst.getString("A2534VHAST").trim();
                objRtn.A2534ARFIC = rst.getString("A2534ARFIC").trim();
                objRtn.A2534ARFIS = rst.getString("A2534ARFIS").trim();
                objRtn.A2534DESCA = rst.getString("A2534DESCA").trim();
                objRtn.A2534IMPMA = rst.getDouble("A2534IMPMA");
                objRtn.A2534IMPTA = rst.getDouble("A2534IMPTA");
                objRtn.A2534NETOA = rst.getDouble("A2534NETOA");
                objRtn.A2534PORCA = rst.getDouble("A2534PORCA");
                objRtn.A2534TOTAN = rst.getDouble("A2534TOTAN");
                objRtn.A2534CUENTA = rst.getString("A2534CUENTA").trim();

                objRtn.A2534REGIS = rst.getString("A2534REGIS").trim();
                objRtn.A2534FREGI = rst.getString("A2534FREGI").trim();
                objRtn.A2534HREGI = rst.getString("A2534HREGI").trim();
                objRtn.A2534REVIS = rst.getString("A2534REVIS").trim();
                objRtn.A2534FREVI = rst.getString("A2534FREVI").trim();
                objRtn.A2534HREVI = rst.getString("A2534HREVI").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public List<SQP00826Filter> loadAncillaries(SQP00826Filter filter) {
        List<SQP00826Filter> lstRtn = new ArrayList<>(0);
        SQP00826Filter objRtn;

        strSQL = "{CALL SQP00824(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TFILTER);
            cs.setString(3, filter.IN_BUNDL);
            cs.setString(4, filter.IN_RFIC);
            cs.setString(5, filter.IN_SUBCD);

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new SQP00826Filter();
                objRtn.RN = rst.getLong("RN");

                objRtn.A2534CCUST = rst.getString("A2534CCUST").trim();
                objRtn.A2534BRFIC = rst.getString("A2534ARFIC").trim();
                objRtn.A2534BRFIS = rst.getString("A2534BRFIS").trim();
                objRtn.A2534SEQBD = rst.getString("A2534SEQBD").trim();
                objRtn.A2534DESCR = rst.getString("A2534DESCR").trim();
                objRtn.A2534IMPMB = rst.getDouble("A2534IMPMB");
                objRtn.A2534IMPTB = rst.getDouble("A2534IMPTB");
                objRtn.A2534MDABD = rst.getString("A2534MDABD").trim();
                objRtn.A2534NETOB = rst.getDouble("A2534NETOB");
                objRtn.A2534TEMD = rst.getString("A2534TEMD").trim();
                objRtn.A2534TOTBD = rst.getDouble("A2534TOTBD");
                objRtn.A2534VDESD = rst.getString("A2534VDESD").trim();
                objRtn.A2534VHAST = rst.getString("A2534VHAST").trim();
                objRtn.A2534ARFIC = rst.getString("A2534ARFIC").trim();
                objRtn.A2534ARFIS = rst.getString("A2534ARFIS").trim();
                // objRtn.A2534DESCA = rst.getString("A2534DESCA").trim();
                objRtn.A2534IMPMA = rst.getDouble("A2534IMPMA");
                objRtn.A2534IMPTA = rst.getDouble("A2534IMPTA");
                objRtn.A2534NETOA = rst.getDouble("A2534NETOA");
                objRtn.A2534PORCA = rst.getDouble("A2534PORCA");
                objRtn.A2534TOTAN = rst.getDouble("A2534TOTAN");
                objRtn.A2534CUENTA = rst.getString("A2534CUENTA").trim();

                objRtn.A2534REGIS = rst.getString("A2534REGIS").trim();
                objRtn.A2534FREGI = rst.getString("A2534FREGI").trim();
                objRtn.A2534HREGI = rst.getString("A2534HREGI").trim();
                objRtn.A2534REVIS = rst.getString("A2534REVIS").trim();
                objRtn.A2534FREVI = rst.getString("A2534FREVI").trim();
                objRtn.A2534HREVI = rst.getString("A2534HREVI").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public SQP00826Filter setSQP00826(SQP00826Filter filter, A2534 filter2, String strOption, Integer i) {
        strSQL = "{CALL SQP00826(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(25, Types.VARCHAR);
            cs.registerOutParameter(26, Types.VARCHAR);
            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter2.A2534BRFIC);
            cs.setString(4, filter2.A2534BRFIS);
            cs.setString(5, filter.A2534SEQBD);
            cs.setString(6, filter2.A2534DESCR);
            cs.setString(7, filter2.A2534TEMD);
            cs.setString(8, filter2.A2534VDESD);
            cs.setString(9, filter2.A2534VHAST);
            cs.setString(10, filter2.A2534MDABD);
            cs.setDouble(11, filter2.A2534TOTBD);
            cs.setDouble(12, filter2.A2534IMPTB);
            cs.setDouble(13, filter2.A2534IMPMB);
            cs.setDouble(14, filter2.A2534NETOB);
            cs.setDouble(15, filter2.A2534DIFBD);

            cs.setString(16, filter.A2534ARFIC);
            cs.setString(17, filter.A2534ARFIS);
            cs.setDouble(18, filter.A2534TOTAN);
            cs.setDouble(19, filter.A2534IMPTA);
            cs.setDouble(20, filter.A2534IMPMA);
            cs.setDouble(21, filter.A2534NETOA);
            cs.setDouble(22, filter.A2534PORCA);
            cs.setString(23, "");
            cs.setString(24, filter.A2534DESCA);
            cs.execute();
            filter.dbException.SQLCODE = cs.getString(25);
            filter.dbException.MESSAGE = cs.getString(26);

        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return filter;
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
