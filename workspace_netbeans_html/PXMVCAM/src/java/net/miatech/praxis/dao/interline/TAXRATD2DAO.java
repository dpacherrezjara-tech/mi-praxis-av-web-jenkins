package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.PX032S01A1202Filter;
import net.miatech.praxis.interline.A1224Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class TAXRATD2DAO {

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

    public List<PX032S01A1202Filter> loadPX145S01A1202(PX032S01A1202Filter filter) throws SQLException, Exception {
        List<PX032S01A1202Filter> lstRtn = new ArrayList<PX032S01A1202Filter>(0);
        PX032S01A1202Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX145S01A1202(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_TFILTER);
            cstmt01.setString(2, filter.IN_A1202PAITA);
            cstmt01.setString(3, filter.IN_A1202CODTA);
            //cstmt01.setString(4, filter.IN_A1202IDTAX);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX032S01A1202Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.strDescPais = rs01.getString("DESC_PAIS");
                objRtn.A1202PAITA = rs01.getString("A1202PAITA");
                objRtn.strDescPais = rs01.getString("A1202PAITA") + " - " + objRtn.strDescPais;
                objRtn.A1202CODTA = rs01.getString("A1202CODTA");
                objRtn.A1202IDTAX = rs01.getString("A1202IDTAX");
                objRtn.A1202TNAME = rs01.getString("A1202TNAME");
                objRtn.A1202TDEFI = rs01.getString("A1202TDEFI");
//                objRtn.A1202PVTA = rs01.getString("A1202PVTA");
                objRtn.A1202PDESC = rs01.getString("A1202PDESC");
//                objRtn.A1202RSEL = rs01.getString("A1202RSEL");
//                objRtn.A1202RLIF = rs01.getString("A1202RLIF");
//                objRtn.A1202ROTH = rs01.getString("A1202ROTH");
                objRtn.A1202INTER = rs01.getString("A1202INTER");
//                objRtn.A1202FENTR = rs01.getString("A1202FENTR");
//                objRtn.A1202FREVI = rs01.getString("A1202FREVI");
//                objRtn.A1202FLAST = rs01.getString("A1202FLAST");
//                objRtn.A1202FLAST = rs01.getString("A1202FLAST");
                objRtn.A1202OARRI = rs01.getString("A1202OARRI");
                objRtn.A1202ODEPA = rs01.getString("A1202ODEPA");
//                objRtn.A1202INDME = rs01.getString("A1202INDME");
//                objRtn.A1202STATU = rs01.getString("A1202STATU");
//                objRtn.A1202PRIOR = rs01.getString("A1202PRIOR");
//                objRtn.A1202ALTER = rs01.getString("A1202ALTER");
                objRtn.A1202UINGR = rs01.getString("A1202UINGR");
                objRtn.A1202FINGR = Functions.getMonthConvert(rs01.getString("A1202FINGR"));
//                objRtn.A1202HINGR = rs01.getString("A1202HINGR");
                objRtn.A1202UMODI = rs01.getString("A1202UMODI");
                objRtn.A1202FMODI = Functions.getMonthConvert(rs01.getString("A1202FMODI"));
//                objRtn.A1202HMODI = rs01.getString("A1202HMODI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<A1224Filter> loadPX145S02A1224(PX032S01A1202Filter filter) throws SQLException, Exception {
        List<A1224Filter> lstRtn = new ArrayList<A1224Filter>(0);
        A1224Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX145S02A1224(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, filter.A1202PAITA);
            cstmt01.setString(2, filter.IN_CODCITY);
            cstmt01.setString(3, filter.IN_DATE);
            cstmt01.setString(4, filter.A1202CODTA);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1224Filter();
                objRtn.A1224TRM = rs01.getString("A1224TRM");
                objRtn.A1224CID = filter.strDescPais;
                //objRtn.A1224TID = rs01.getString("A1224TID");
                //objRtn.A1224NID = rs01.getInt("A1224NID");
                objRtn.A1224ORG = rs01.getString("A1224ORG");
                objRtn.strDescripcion = rs01.getString("A1224ORG") + "-" + rs01.getString("DESC_AIR");
                objRtn.A1224EFD = rs01.getString("A1224EFD");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A1224EFD);
                objRtn.A1224ORD = rs01.getInt("A1224ORD");
                objRtn.A1224EXD = rs01.getString("A1224EXD");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A1224EXD);
                objRtn.A1224LRT = rs01.getDouble("A1224LRT");
                objRtn.A1224LAM = rs01.getDouble("A1224LAM");
                objRtn.A1224LCU = rs01.getString("A1224LCU");
                objRtn.A1224ERT = rs01.getDouble("A1224ERT");
                objRtn.A1224EAM = rs01.getDouble("A1224EAM");
                objRtn.A1224ECU = rs01.getString("A1224ECU");
                objRtn.A1224DAS = rs01.getString("A1224DAS");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.A1224DAS);
                objRtn.A1224DAT = rs01.getString("A1224DAT");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.A1224DAT);
                //objRtn.A1224TYPE= rs01.getString("A1224TYPE");
                objRtn.A1224CODE = rs01.getString("A1224CODE");
                objRtn.A1224APPL = rs01.getString("A1224APPL");
                objRtn.A1224CODI = rs01.getString("A1224CODI");
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.A1224TRM.substring(0, 6));
                objRtn.strDescripcion2 = filter.A1202TNAME;
                objRtn.A1224TID = filter.A1202CODTA;//Almaceno cod de TAX en cualquier campo

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<A1692Filter> loadPX145S03A1141(PX032S01A1202Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        double totLOC = 0, totINT = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX145S03A1141(?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_DATE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totLOC = rs01.getDouble("A1141LAM");
                totINT = rs01.getDouble("A1141EAM");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.FVTA = rs01.getString("A1141FEC");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FVTA.substring(0, 6));
                    objRtn.CDEPART = rs01.getString("A1141ORG");
                    objRtn.strDescCDEPART = rs01.getString("DES_AEROPUERTO");
                    objRtn.MDACP = rs01.getString("A1141LCU");//Moneda Local
                    objRtn.BATCHP = rs01.getString("A1141ECU");//Moneda Inter
                    objRtn.ISC = rs01.getDouble("A1141LAM");
                    objRtn.GROSS = rs01.getDouble("A1141EAM");

                    objRtn.totISC = totLOC;
                    objRtn.totGROSS = totINT;

                    lstRtn.add(objRtn);
                }

            }
        } catch (Exception e) {
            e.getMessage();
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
