package net.miatech.praxis.dao;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import net.miatech.beans.A1569Filter;
import net.miatech.beans.A1655Filter;
import net.miatech.beans.A1656Filter;
import net.miatech.beans.A1672Filter;
import net.miatech.beans.ARCF24Filter;
import net.miatech.beans.BSPF100Filter;
import net.miatech.beans.BSPF110Filter;
import net.miatech.beans.BSPF99Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PA_GET_COEFICIENTEFilter;
import net.miatech.beans.PX0094S01A007Filter;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.PXF700Filter;
import net.miatech.beans.PXF800Filter;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.A005;
import net.miatech.praxis.A128;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.BSPF109;
import net.miatech.praxis.BSPF110;
import net.miatech.praxis.BSPF30Filter;
import net.miatech.praxis.BSPF39Filter;
import net.miatech.praxis.BSPF93;
import net.miatech.praxis.PXF700;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadDataDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

//    public HashMap loadAeropuertos() throws SQLException {
//
//        Statement stmt = null;
//        ResultSet rst = null;
//        HashMap lista = new HashMap();
//
//        String strSQL = "SELECT * FROM " + session.getMainLibrary() + ".A1007 ORDER BY A1007CTATO ASC ";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  stmt = cnx.prepareCall(strSQL);
//            rst = stmt.executeQuery(strSQL);
//            while (rst.next()) {
//                lista.put(rst.getString("A1007CTATO").trim(), rst.getString("A1007NOMBR").trim().replace("'", ""));
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rst != null) {
//                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                }
//                if (stmt != null) {
//                    stmt.close();
//                }
//                // =================
//                pasarGarbageCollector();
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//
//        }
//
//        return lista;
//    }
//
//    public List<BSPF100Filter> loadBSPReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S03BSPF100(?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.PDAI.trim());
//            cs.setString(5, filter.COUNTRY.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//                beanBsp = new BSPF100Filter();
//
//                beanBsp.CCUST = ccust;
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//                try {
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.QOFIC = rst.getInt("QOFIC");
//                beanBsp.GROS = rst.getDouble("GROS");
//                beanBsp.TTMF = rst.getDouble("TTMF");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TTCA = rst.getDouble("TTCA");
//                beanBsp.TREM = rst.getDouble("TREM");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                beanBsp.FECR = rst.getString("FECR");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountryMes(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S08PXF701(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.COUNTRY.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.FUENTE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//
//                beanBsp = new BSPF100Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.strTipoFecha = filter.strTipoFecha.trim();
//                beanBsp.COUNTRY = filter.COUNTRY.trim();
//                beanBsp.BSPI = filter.BSPI.trim();
//                beanBsp.FUENTE = filter.FUENTE.trim();
//                beanBsp.HRED = rst.getString("DATE");
//                beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6));
//                // =============================================================
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.QOFIC = rst.getInt("QOFIC");
//                beanBsp.COBLT = rst.getDouble("COBLT");
//                beanBsp.COBLR = rst.getDouble("COBLR");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getLong("QCANC");
//                beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountry(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises,
//            HashMap hmCiudades, String option) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//        int pos = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        /*filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//         filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//         filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//         filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//         filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//         filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");*/
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S14PXF702(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.COUNTRY.trim());
//            cs.setString(5, filter.BSPI.trim());//CITYBSP X BSPI
//            cs.setString(6, filter.FUENTE.trim());
//            cs.setString(7, "1");//TIPO REPORTE 1:BY COUNTRY, 2:BY DAY
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//                pos++;
//                beanBsp = new BSPF100Filter();
//                beanBsp.pos = pos;
//                beanBsp.CCUST = ccust;
//                beanBsp.strTipoFecha = filter.strTipoFecha.trim();
//                beanBsp.FUENTE = filter.FUENTE.trim();
//                beanBsp.HRED = rst.getString("DATE");
//                beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6));
//                // PAIS ========================================================
//                beanBsp.COUNTRY = rst.getString("ISOC");
//                if (hmPaises.containsKey(beanBsp.COUNTRY)) {
//                    beanBsp.nombre = hmPaises.get(beanBsp.COUNTRY.trim()).toString();
//                } else {
//                    beanBsp.nombre = "(EMPTY)";
//                }
//                // CIUDAD ======================================================
//                beanBsp.BSPI = rst.getString("CITYS");
//                if (hmCiudades.containsKey(beanBsp.BSPI.trim())) {
//                    beanBsp.strNomCity = hmCiudades.get(beanBsp.BSPI.trim()).toString();
//                } else {
//                    beanBsp.strNomCity = "(EMPTY)";
//                }
//                // =============================================================
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QOFIC = rst.getInt("QOFIC");
//                beanBsp.COBLT = rst.getDouble("COBLT");
//                beanBsp.COBLR = rst.getDouble("COBLR");
//                beanBsp.CRFND = rst.getDouble("CRFND");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getLong("QCANC");
//                beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPReportByFuente(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises,
//            HashMap hmCiudades, String option) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//        int pos = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        /*filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//         filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//         filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//         filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//         filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//         filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");*/
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S15PXF702(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.COUNTRY.trim());
//            cs.setString(5, filter.BSPI.trim());//CITYBSP X BSPI
//            cs.setString(6, filter.FUENTE.trim());
//            cs.setString(7, "1");//TIPO REPORTE 1:BY COUNTRY, 2:BY DAY
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    pos++;
//                    beanBsp = new BSPF100Filter();
//                    beanBsp.pos = pos;
//                    beanBsp.CCUST = ccust;
//                    beanBsp.strTipoFecha = filter.strTipoFecha.trim();
//                    beanBsp.FUENTE = rst.getString("FTE");
//                    if (rst.getString("FTE").equals("B")) {
//                        beanBsp.strDescripcionFTE = "BSP";
//                    } else if (rst.getString("FTE").equals("A")) {
//                        beanBsp.strDescripcionFTE = "ARC";
//                    } else if (rst.getString("FTE").equals("T")) {
//                        beanBsp.strDescripcionFTE = "TCN";
//                    } else if (rst.getString("FTE").equals("S")) {
//                        beanBsp.strDescripcionFTE = "ASR";
//                    }
//                    beanBsp.HRED = rst.getString("DATE");
//                    beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6));
//                    // PAIS ========================================================
//                    beanBsp.COUNTRY = rst.getString("ISOC");
//                    if (hmPaises.containsKey(beanBsp.COUNTRY)) {
//                        beanBsp.nombre = hmPaises.get(beanBsp.COUNTRY.trim()).toString();
//                    } else {
//                        beanBsp.nombre = "(EMPTY)";
//                    }
//                    // CIUDAD ======================================================
//                    beanBsp.BSPI = rst.getString("CITYS");
//                    if (hmCiudades.containsKey(beanBsp.BSPI.trim())) {
//                        beanBsp.strNomCity = hmCiudades.get(beanBsp.BSPI.trim()).toString();
//                    } else {
//                        beanBsp.strNomCity = "(EMPTY)";
//                    }
//                    // =============================================================
//                    beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QOFIC = rst.getInt("QOFIC");
//                    beanBsp.COBLT = rst.getDouble("COBLT");
//                    beanBsp.COBLR = rst.getDouble("COBLR");
//                    beanBsp.CRFND = rst.getDouble("CRFND");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                    beanBsp.QISSUE = rst.getLong("QISSUE");
//                    beanBsp.QADM = rst.getLong("QADM");
//                    beanBsp.QREFUND = rst.getLong("QREFUND");
//                    beanBsp.QACM = rst.getLong("QACM");
//                    beanBsp.QCANC = rst.getLong("QCANC");
//                    beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                    beanBsp.ISSUE = rst.getDouble("ISSUE");
//                    beanBsp.ADM = rst.getDouble("ADM");
//                    beanBsp.REFUND = rst.getDouble("REFUND");
//                    beanBsp.ACM = rst.getDouble("ACM");
//                    listaData.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPReportByDay(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//        int pos = 0;
//        long totQCANJ = 0, totQISSUE = 0, totQADM = 0, totQREFUND = 0, totQACM = 0, totQCANC = 0, totCOBLT = 0, totCOBLR = 0, totCRFND = 0, totFPAMCA = 0, totFPAMCC = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        /*filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//         filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//         filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//         filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//         filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//         filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");*/
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S16PXF703(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.COUNTRY.trim());
//            cs.setString(5, filter.BSPI.trim());//CITYBSP X BSPI
//            cs.setString(6, filter.FUENTE.trim());
//            cs.setString(7, "2");//TIPO REPORTE 1:BY COUNTRY, 2:BY DAY
//            cs.execute();
//
//            rst = cs.getResultSet();
//            if (rst.next()) {
//                totQCANJ = rst.getLong("QCANJ");
//                totQISSUE = rst.getLong("QISSUE");
//                totQADM = rst.getLong("QADM");
//                totQREFUND = rst.getLong("QREFUND");
//                totQACM = rst.getLong("QACM");
//                totQCANC = rst.getLong("QCANC");
//                totCOBLT = rst.getLong("COBLT");
//                totCOBLR = rst.getLong("COBLR");
//                totCRFND = rst.getLong("CRFND");
//                totFPAMCA = rst.getLong("FPAMCA");
//                totFPAMCC = rst.getLong("FPAMCC");
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    pos++;
//                    beanBsp = new BSPF100Filter();
//                    beanBsp.pos = pos;
//                    beanBsp.CCUST = ccust;
//                    beanBsp.strTipoFecha = filter.strTipoFecha;
//                    beanBsp.formatDate2 = filter.formatDate;
//                    beanBsp.FUENTE = filter.FUENTE.trim();
//                    beanBsp.strDescripcionFTE = filter.strDescripcionFTE;
//                    beanBsp.HRED = rst.getString("DATE");
//                    beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " "
//                            + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6)) + " "
//                            + rst.getString("DATE").substring(6, 8);
//                    // PAIS ========================================================
//                    beanBsp.COUNTRY = rst.getString("ISOC");
//                    beanBsp.nombre = filter.nombre;
//                    // CIUDAD ======================================================
//                    beanBsp.BSPI = rst.getString("CITYS");
//                    beanBsp.strNomCity = filter.strNomCity;
//                    // =============================================================
//                    beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QOFIC = rst.getInt("QOFIC");
//                    //beanBsp.GROS = rst.getDouble("GROS");
//                    beanBsp.COBLT = rst.getDouble("COBLT");
//                    beanBsp.COBLR = rst.getDouble("COBLR");
//                    beanBsp.CRFND = rst.getDouble("CRFND");
//                    beanBsp.TTMF = rst.getDouble("TTMF");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.TTCA = rst.getDouble("TTCA");
//                    beanBsp.TREM = rst.getDouble("TREM");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                    beanBsp.QISSUE = rst.getLong("QISSUE");
//                    beanBsp.QADM = rst.getLong("QADM");
//                    beanBsp.QREFUND = rst.getLong("QREFUND");
//                    beanBsp.QACM = rst.getLong("QACM");
//                    beanBsp.QCANC = rst.getLong("QCANC");
//                    beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                    beanBsp.ISSUE = rst.getDouble("ISSUE");
//                    beanBsp.ADM = rst.getDouble("ADM");
//                    beanBsp.REFUND = rst.getDouble("REFUND");
//                    beanBsp.ACM = rst.getDouble("ACM");
//
//                    //Totales
//                    beanBsp.totQCANJ = totQCANJ;
//                    beanBsp.totQISSUE = totQISSUE;
//                    beanBsp.totQADM = totQADM;
//                    beanBsp.totQREFUND = totQREFUND;
//                    beanBsp.totQACM = totQACM;
//                    beanBsp.totQCANC = totQCANC;
//                    beanBsp.totCOBLT = totCOBLT;
//                    beanBsp.totCOBLR = totCOBLR;
//                    beanBsp.totCRFND = totCRFND;
//
//                    beanBsp.totFPAMCA = totFPAMCA;
//                    beanBsp.totFPAMCC = totFPAMCC;
//
//
//                    listaData.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountryTotals(String ccust, UserView user, BSPF100Filter filter, String option) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//
//        if (filter.yearFrom.trim().length() == 4) {
//            // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//            //</editor-fold>
//        }
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S11PXF702(?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.COUNTRY.trim());
//            cs.setString(7, filter.BSPI.trim());//CITYBSP X BSPI
//            cs.setString(8, filter.FUENTE.trim());
//            cs.setString(9, option.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//
//                beanBsp = new BSPF100Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.FUENTE = filter.FUENTE.trim();
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.QOFIC = rst.getInt("QOFIC");
//                beanBsp.GROS = rst.getDouble("GROS");
//                beanBsp.TTMF = rst.getDouble("TTMF");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TTCA = rst.getDouble("TTCA");
//                beanBsp.TREM = rst.getDouble("TREM");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPDetailReport(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S04BSPF100(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.HRED.trim());
//            cs.setString(3, filter.PDAI.trim());
//            cs.setString(4, filter.COUNTRY.trim());
//            //cs.setString(5, filter.CITYBSP.trim());
//            cs.setString(5, filter.BSPI.trim());
//            cs.setString(6, filter.TACN.trim());
//            cs.setString(7, filter.CUTP.trim());
//            cs.setString(8, filter.FUENTE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//                beanBsp = new BSPF100Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.FUENTE = filter.FUENTE.trim();
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.PRDA = rst.getString("PRDA");
//                try {
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.COUNTRY = rst.getString("ISOC");
//                if (hmPaises.containsKey(beanBsp.COUNTRY)) {
//                    beanBsp.nombre = hmPaises.get(beanBsp.COUNTRY.trim()).toString();
//                } else {
//                    beanBsp.nombre = "(EMPTY)";
//                }
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//
//                beanBsp.QOFIC = rst.getInt("QOFIC");
//                beanBsp.GROS = rst.getDouble("GROS");
//                beanBsp.TREM = rst.getDouble("TREM");
//                beanBsp.TCOM = rst.getDouble("TCOM");
//                beanBsp.TTMF = rst.getDouble("TTMF");
//                beanBsp.TLRP = rst.getDouble("TLRP");
//                beanBsp.TTCA = rst.getDouble("TTCA");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getLong("QCANC");
//                beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return listaData;
//    }
//
//    public List<BSPF100Filter> loadBSPDetailAgentReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp;
//        List<BSPF100Filter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S05PXF703(?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.PDAI.trim());
//            cs.setString(5, filter.COUNTRY.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.TACN.trim());
//            cs.setString(8, filter.CUTP.trim());
//            cs.setString(9, filter.FUENTE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new BSPF100Filter();
//                beanBsp.pos = pos;
//                beanBsp.strTipoFecha = filter.strTipoFecha.trim();
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.COBLT = rst.getDouble("COBLT");
//                beanBsp.COBLR = rst.getDouble("COBLR") + rst.getDouble("TMFA1") + rst.getDouble("TMFA2");
//                beanBsp.CRFND = rst.getDouble("CRFND");
//                beanBsp.COUNTRY = rst.getString("ISOC");
//                beanBsp.nombre = filter.nombre.trim();
//                beanBsp.strNomCity = filter.strNomCity;
//                beanBsp.strDescripcionFTE = filter.strDescripcionFTE;
//                beanBsp.FUENTE = rst.getString("FTE");
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.dblTotalPay = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getLong("QCANC");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getLong("QCANC");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                //beanBsp.GROS = rst.getDouble("GROS");
//                beanBsp.TREM = rst.getDouble("TREM");
//                beanBsp.TCOM = rst.getDouble("TCOM");
//                beanBsp.TTMF = rst.getDouble("TTMF");
//                beanBsp.TLRP = rst.getDouble("TLRP");
//                beanBsp.TTCA = rst.getDouble("TTCA");
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.USUP = rst.getString("USUP");
//                beanBsp.FEUP = rst.getString("FEUP");
//                beanBsp.HOUP = rst.getString("HOUP");
//                beanBsp.formatDate = rst.getString("HRED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(4, 6))
//                        + " " + rst.getString("HRED").substring(6, 8);
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return listaData;
//    }
//
//    public List<BSPF110> loadBSPCalendar(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        Statement stmt = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF110 beanBsp;
//        List<BSPF110> listaData = new ArrayList(0);
//
//        strSQL = "SELECT RTRIM(CCUST) AS CCUST, RTRIM(ISOC) AS ISOC, RTRIM(BSPI) AS BSPI, HRED, PRDA, "
//                + "RTRIM(FUENTE) AS FUENTE, RTRIM(TACN) AS TACN, RTRIM(TTIME) AS TTIME, "
//                + "RTRIM(PDAI) AS PDAI, RTRIM(PBAED) AS PBAED, RTRIM(DYRI) AS DYRI, QRECOR,"
//                + "RTRIM(USCR) AS USCR, RTRIM(FECR) AS FECR, RTRIM(HOCR) AS HOCR, RTRIM(USUP) AS USUP, "
//                + "RTRIM(FEUP) AS FEUP, RTRIM(HOUP) AS HOUP FROM " + session.getMainLibrary() + ".BSPF110 WHERE ";
//
//        if (filter.yearFrom.trim().length() == 2) {
//            strSQL += "CCUST = '" + ccust + "' AND SUBSTRING(HRED, 1, 2) = '" + filter.yearFrom + "'";
//        } else {
//            strSQL += "CCUST = '" + ccust + "' AND SUBSTRING(HRED, 1, 2) = '" + filter.yearFrom.substring(2, 4) + "'";
//        }
//
//        if (!filter.COUNTRY.isEmpty()) {
//            strSQL += " AND ISOC = '" + filter.COUNTRY + "'";
//        }
//        if (!filter.fileBSPF110.DYRI.isEmpty()) {
//            strSQL += " AND DYRI = '" + filter.fileBSPF110.DYRI + "'";
//        }
//        if (!filter.FUENTE.isEmpty()) {
//            if (filter.FUENTE.equals("77")) {
//                strSQL += " AND ISOC = '77'";
//            } else if (filter.FUENTE.equals("88")) {
//                strSQL += " AND ISOC = '88'";
//            } else if (filter.FUENTE.equals("99")) {
//                strSQL += " AND ISOC = '99'";
//            } else {
//                strSQL += " AND FUENTE = '" + filter.FUENTE + "'";
//            }
//        } else {
//            strSQL += " AND FUENTE = 'BSP'";
//        }
//
//        session.getCNXIBMDB2().open();
//        try {
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(strSQL);
//
//            while (rst.next()) {
//                beanBsp = new BSPF110();
//                beanBsp.FUENTE = filter.FUENTE.trim();
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getInt("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.FUENTE = rst.getString("FUENTE");
//                beanBsp.TACN = rst.getString("TACN");
//                beanBsp.TTIME = rst.getString("TTIME");
//                beanBsp.PDAI = rst.getString("PDAI");
//                beanBsp.PBAED = rst.getString("PBAED");
//                beanBsp.DYRI = rst.getString("DYRI");
//                beanBsp.QOFIC = rst.getInt("QRECOR");
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.USUP = rst.getString("USUP");
//                beanBsp.FEUP = rst.getString("FEUP");
//                beanBsp.HOUP = rst.getString("HOUP");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (stmt != null) {
//                stmt.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public BSPF100Filter loadAgentData(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF100Filter beanBsp = new BSPF100Filter();
//        List<BSPF93> lstReg93 = new ArrayList<BSPF93>();
//        BSPF93 reg93;
//        String ciudad = filter.BSPI.trim();
//        String hred = filter.HRED.trim();
//        if (filter.HRED.trim().length() > 6) {
//            hred = filter.HRED.substring(2).trim();
//        }
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S06BSPF102(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, hred);
//            cs.setString(3, filter.PDAI.trim());
//            cs.setString(4, filter.COUNTRY.trim());
//            cs.setString(5, ciudad);//CITYBSP x BSPI
//            cs.setString(6, filter.TACN.trim());
//            cs.setString(7, filter.CUTP.trim());
//            cs.setString(8, filter.AGTN.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            if (rst.next()) {
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.COUNTRY = rst.getString("ISOC");
//                beanBsp.nombre = filter.nombre.trim();
//                beanBsp.FUENTE = rst.getString("FUENTE");
//                beanBsp.STREP = rst.getString("STREP");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.TACN = rst.getString("TACN");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getInt("QCANC");
//                beanBsp.QTYDOC = rst.getLong("QISSUE") + rst.getLong("QADM") + rst.getLong("QREFUND") + rst.getLong("QACM") + rst.getInt("QCANC");
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.TCAMBI = rst.getDouble("TCAMBI");
//                beanBsp.CDGT = rst.getInt("CDGT");
//                beanBsp.GROS = rst.getDouble("GROS");
//                beanBsp.TREM = rst.getDouble("TREM");
//                beanBsp.TCOM = rst.getDouble("TCOM");
//                beanBsp.TTMF = rst.getDouble("TTMF");
//                beanBsp.TLRP = rst.getDouble("TLRP");
//                beanBsp.TTCA = rst.getDouble("TTCA");
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.USUP = rst.getString("USUP");
//                beanBsp.FEUP = rst.getString("FEUP");
//                beanBsp.HOUP = rst.getString("HOUP");
//                beanBsp.periodo = Functions.getAbreviaturaMes(Functions.fillString(rst.getString("PDAI").trim(), 3).substring(0, 2))
//                        + " - Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    reg93 = new BSPF93();
//                    reg93.strDescripcion = rst.getString("DESCRPI").replace("-", "");
//                    reg93.TRNC = rst.getString("TRNC");
//                    reg93.GROS = rst.getDouble("GROS");
//                    reg93.TREM = rst.getDouble("TREM");
//                    reg93.TCOM = rst.getDouble("TCOM");
//                    reg93.TTMF = rst.getDouble("TTMF");
//                    reg93.TLRP = rst.getDouble("TLRP");
//                    reg93.TTCA = rst.getDouble("TTCA");
//                    if (reg93.TRNC.trim().equals("ADMA")) {
//                        reg93.QTYDOC = beanBsp.QADM;
//                    } else if (reg93.TRNC.trim().equals("ACMA")) {
//                        reg93.QTYDOC = beanBsp.QACM;
//                    } else if (reg93.TRNC.trim().equals("RFND")) {
//                        reg93.QTYDOC = beanBsp.QREFUND;
//                    } else if (reg93.TRNC.trim().equals("CANX")) {
//                        reg93.QTYDOC = beanBsp.QCANC;
//                    } else {
//                        reg93.QTYDOC = beanBsp.QISSUE;
//                    }
//                    reg93.CUTP = beanBsp.CUTP;
//                    lstReg93.add(reg93);
//                }
//                beanBsp.lstReg93 = lstReg93;
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp.strDescripcionAgnt = rst.getString("A003KEY1");
//                    if (beanBsp.strDescripcionAgnt.trim().equals("")) {
//                        beanBsp.strDescripcionAgnt = "EMPTY";
//                    }
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return beanBsp;
//    }
//
//    public List<BSPF30Filter> loadBSPDetailTaxesReport(String ccust, UserView user, BSPF104 filter) throws SQLException {
//        Statement stmt = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF30Filter beanBsp;
//        List<BSPF30Filter> listaData = new ArrayList();
//
//        strSQL = "CALL " + session.getMainLibrary() + ".BSPF30S002('" + ccust.trim() + "','" + filter.TDNR.trim() + "','" + filter.TRNC + "')";
//
//        session.getCNXIBMDB2().open();
//        try {
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(strSQL);
//            int pos = 0;
//
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new BSPF30Filter();
//                beanBsp.COL0 = rst.getString("COL0");
//                beanBsp.COL1 = rst.getString("COL1");
//                beanBsp.COL2 = rst.getString("COL2");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (stmt != null) {
//                stmt.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF39Filter> loadBSPDetailCommissionReport(String ccust, UserView user, BSPF104 filter) throws SQLException {
//
//        Statement stmt = null;
//        ResultSet rst = null;
//        BSPF39Filter bn;
//        List<BSPF39Filter> listaData = new ArrayList();
//
//        String strSQL = "CALL " + session.getMainLibrary() + ".BSPF39S001('" + filter.CCUST + "','" + filter.TDNR.trim() + "','" + filter.TRNC + "')";
//
//        session.getCNXIBMDB2().open();
//        try {
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(strSQL);
//            int pos = 0;
//
//            while (rst.next()) {
//                pos++;
//
//                bn = new BSPF39Filter();
//                bn.COL0 = rst.getString("COL0");
//                bn.COL1 = rst.getString("COL1");
//                bn.COL2 = rst.getString("COL2");
//                listaData.add(bn);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (stmt != null) {
//                stmt.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF104> loadBSPDetailTktReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        BSPF104 beanBsp = new BSPF104();
//        List<BSPF104> listaData = new ArrayList();
//        String strTKT = "";
//        String strSQL = "";
//        double dblCOBL = 0, dblNTFA = 0, dblTMFA1 = 0;
//        double dblTMFA2 = 0, dblTDAM = 0, dblLREP = 0;
//
//        String ciudad = filter.BSPI.trim(), hred = filter.HRED.trim();
//        if (filter.BSPI.trim().equals("")) {
//            ciudad = filter.BSPI.trim();
//        }
//        if (filter.HRED.trim().length() > 6) {
//            hred = filter.HRED.substring(2).trim();
//        }
//        session.getCNXIBMDB2().open();
//
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S01BSPF24(?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.COUNTRY.trim());
//            cs.setString(3, ciudad);//CITYBSP x BSPI
//            cs.setString(4, hred);
//            cs.setString(5, filter.AGTN.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//
//            while (rst.next()) {
//
//                if (strTKT.equals("")) {
//                    strTKT = rst.getString("TDNR").trim();
//                }
//
//                if (!strTKT.trim().equals(rst.getString("TDNR").trim())) {
//                    pos++;
//                    beanBsp.pos = pos;
//                    //DATOS DEL REGISTRO 30 ========================================
//                    beanBsp.COBL = dblCOBL;
//                    beanBsp.NTFA = dblNTFA;
//                    beanBsp.TMFA1 = dblTMFA1;
//                    beanBsp.TMFA2 = dblTMFA2;
//                    beanBsp.TDAM = dblTDAM;
//                    beanBsp.LREP = dblLREP;
//                    beanBsp.TTMFA = beanBsp.TMFA1 + beanBsp.TMFA2;
//                    listaData.add(beanBsp);
//
//                    strTKT = rst.getString("TDNR").trim();
//
//                    beanBsp = new BSPF104();
//                    beanBsp.CCUST = rst.getString("CCUST");
//                    beanBsp.COUNTRY = filter.COUNTRY.trim();
//                    beanBsp.nombre = filter.nombre.trim();
//                    beanBsp.CITYBSP = rst.getString("BSPI");
//                    beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                    beanBsp.HRED = rst.getString("HRED");
//                    beanBsp.DAIS = rst.getInt("DAIS");
//                    beanBsp.TDNR = rst.getString("TDNR").trim();
//                    beanBsp.CDGT = rst.getInt("CDGT");
//                    beanBsp.TCNR = rst.getString("TCNR");
//                    beanBsp.TCND = rst.getInt("TCND");
//                    beanBsp.CPUI = rst.getString("CPUI");
//                    beanBsp.CJCP = rst.getString("CJCP");
//                    beanBsp.AGTN = rst.getString("AGTN");
//                    beanBsp.TOUR = rst.getString("TOUR");
//                    beanBsp.TRNC = rst.getString("TRNC");
//                    beanBsp.TODC = rst.getString("TODC");
//                    beanBsp.PNRR = rst.getString("PNRR");
//                    //DATOS DEL REGISTRO 30 ========================================
//                    beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                    beanBsp.TMFT1 = rst.getString("TMFT1");
//                    beanBsp.TMFT2 = rst.getString("TMFT2");
//                    //DATOS DEL REGISTRO 66 ========================================
//                    try {
//                        beanBsp.FPAGO = rst.getString("FPIN").trim() + ". ";
//                    } catch (Exception e) {
//                        beanBsp.FPAGO = "";
//                    }
//                    beanBsp.USCR = rst.getString("USCR");
//                    beanBsp.FECR = rst.getString("FECR");
//                    beanBsp.HOCR = rst.getString("HOCR");
//                    beanBsp.USUP = rst.getString("USUP");
//                    beanBsp.FEUP = rst.getString("FEUP");
//                    beanBsp.HOUP = rst.getString("HOUP");
//                    beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                    beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                            + " " + rst.getString("HRED").substring(4, 6);
//                    dblCOBL = rst.getDouble("COBL");
//                    dblNTFA = rst.getDouble("NTFA");
//                    dblTMFA1 = rst.getDouble("TMFA1");
//                    dblTMFA2 = rst.getDouble("TMFA2");
//                    dblTDAM = rst.getDouble("TDAM");
//                    dblLREP = rst.getDouble("LREP");
//
//                } else {
//                    beanBsp = new BSPF104();
//                    beanBsp.CCUST = rst.getString("CCUST");
//                    beanBsp.COUNTRY = filter.COUNTRY.trim();
//                    beanBsp.nombre = filter.nombre.trim();
//                    beanBsp.CITYBSP = rst.getString("BSPI");
//                    beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                    beanBsp.HRED = rst.getString("HRED");
//                    beanBsp.DAIS = rst.getInt("DAIS");
//                    beanBsp.TDNR = rst.getString("TDNR").trim();
//                    beanBsp.CDGT = rst.getInt("CDGT");
//                    beanBsp.TCNR = rst.getString("TCNR");
//                    beanBsp.TCND = rst.getInt("TCND");
//                    beanBsp.CPUI = rst.getString("CPUI");
//                    beanBsp.CJCP = rst.getString("CJCP");
//                    beanBsp.AGTN = rst.getString("AGTN");
//                    beanBsp.TOUR = rst.getString("TOUR");
//                    beanBsp.TRNC = rst.getString("TRNC");
//                    beanBsp.TODC = rst.getString("TODC");
//                    beanBsp.PNRR = rst.getString("PNRR");
//                    //DATOS DEL REGISTRO 30 ========================================
//                    beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                    beanBsp.TMFT1 = rst.getString("TMFT1");
//                    beanBsp.TMFT2 = rst.getString("TMFT2");
//                    //DATOS DEL REGISTRO 66 ========================================
//                    try {
//                        beanBsp.FPAGO = rst.getString("FPIN").trim() + ". ";
//                    } catch (Exception e) {
//                        beanBsp.FPAGO = "";
//                    }
//                    beanBsp.USCR = rst.getString("USCR");
//                    beanBsp.FECR = rst.getString("FECR");
//                    beanBsp.HOCR = rst.getString("HOCR");
//                    beanBsp.USUP = rst.getString("USUP");
//                    beanBsp.FEUP = rst.getString("FEUP");
//                    beanBsp.HOUP = rst.getString("HOUP");
//                    beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                    beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                            + " " + rst.getString("HRED").substring(4, 6);
//
//                    dblCOBL += rst.getDouble("COBL");
//                    dblNTFA += rst.getDouble("NTFA");
//                    dblTMFA1 += rst.getDouble("TMFA1");
//                    dblTMFA2 += rst.getDouble("TMFA2");
//                    dblTDAM += rst.getDouble("TDAM");
//                    dblLREP += rst.getDouble("LREP");
//
//                }
//
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!strTKT.equals("")) {
//                pos++;
//                beanBsp.pos = pos;
//                //DATOS DEL REGISTRO 30 ========================================
//                beanBsp.COBL = dblCOBL;
//                beanBsp.NTFA = dblNTFA;
//                beanBsp.TMFA1 = dblTMFA1;
//                beanBsp.TMFA2 = dblTMFA2;
//                beanBsp.TDAM = dblTDAM;
//                beanBsp.LREP = dblLREP;
//                beanBsp.TTMFA = beanBsp.TMFA1 + beanBsp.TMFA2;
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<PXF700> loadBSPDetailTktReportPXF700(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        PXF700 beanBsp = new PXF700();
//        List<PXF700> listaData = new ArrayList();
//        String strSQL = "";
//
//        String ciudad = filter.BSPI.trim();
//        if (filter.BSPI.trim().equals("")) {
//            ciudad = filter.BSPI.trim();
//        }
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S12PXF700(?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.COUNTRY.trim());
//            cs.setString(3, ciudad);//CITYBSP x BSPI
//            cs.setString(4, filter.HRED.trim());
//            cs.setString(5, filter.AGTN.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//
//            while (rst.next()) {
//                beanBsp = new PXF700();
//
//                pos++;
//                beanBsp.pos = pos;
//                beanBsp.FTE = rst.getString("FTE");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.TTAX = rst.getDouble("TMFA1") + rst.getDouble("TMFA2") - rst.getDouble("TMFACP");
//                beanBsp.TCOMIS = rst.getDouble("COAM") + rst.getDouble("SPAM");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.TNETR = rst.getDouble("FPAMCA") + beanBsp.TCOMIS;
//
//                beanBsp.FPAMCAM = rst.getDouble("FPAMCAM");
//                beanBsp.FPAMCCM = rst.getDouble("FPAMCCM");
//                beanBsp.FPAMOTM = rst.getDouble("FPAMOTM");
//                beanBsp.REMTA = rst.getDouble("REMTA");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.TMFA1 = rst.getDouble("TMFA1");
//                beanBsp.TMFA2 = rst.getDouble("TMFA2");
//
//                beanBsp.TTMFA = beanBsp.TMFA1 + beanBsp.TMFA2;
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.ISOC = filter.COUNTRY.trim();//beanBsp.COUNTRY = filter.COUNTRY.trim();
//                beanBsp.nombre = filter.nombre.trim();
//                beanBsp.BSPI = rst.getString("BSPI");//beanBsp.CITYBSP = rst.getString("BSPI");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.DAIS = rst.getString("DAIS");
//                beanBsp.TDNR = rst.getString("TDNR").trim();
//                beanBsp.CPUI = rst.getString("CPUI");
//                beanBsp.CJCP = rst.getString("CJCP");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.TOUR = rst.getString("TOUR");
//                beanBsp.TRNC = rst.getString("TRNC");
//                //DATOS DEL REGISTRO 30 ========================================
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                //DATOS DEL REGISTRO 66 ========================================
//                try {
//                    beanBsp.FPAGO = rst.getString("FPIN").trim() + ". ";
//                } catch (Exception e) {
//                    beanBsp.FPAGO = "";
//                }
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.USUP = rst.getString("USUP");
//                beanBsp.FEUP = rst.getString("FEUP");
//                beanBsp.HOUP = rst.getString("HOUP");
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = rst.getString("HRED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(4, 6))
//                        + " " + rst.getString("HRED").substring(6, 8);
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<PXF800Filter> loadPXF800Report(String ccust, UserView user, PXF800Filter filter, int rowsPag) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.intCurrentPg > 0) {
//                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
//            }
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX002S01PXF800(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.registerOutParameter(11, Types.INTEGER);
//            cs.registerOutParameter(12, Types.INTEGER);
//            cs.registerOutParameter(13, Types.INTEGER);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.setString(9, filter.TDNR.trim());
//            cs.setString(10, filter.FTE.trim());
//            cs.setInt(11, totRowsPag);
//            cs.setInt(12, PAGINIT);
//            cs.setInt(13, filter.intTotalRws);
//            cs.execute();
//
//            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(12)) {
//                totRows = filter.intTotalRws;
//                totPAGS = filter.intTotalPgs;
//            } else {
//                try {
//                    totRows = cs.getInt(13);
//                    String temp = String.valueOf(totRows / 15.0);
//                    if (temp.contains(".")) {
//                        totPAGS = (totRows / totRowsPag) + 1;
//                    } else {
//                        totPAGS = totRows / totRowsPag;
//                    }
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.TRNC = rst.getString("TRNC");
//                beanBsp.FTE = rst.getString("FTE");
//                if (rst.getString("FTE").trim().equals("B")) {
//                    beanBsp.strFlag = "BSP";
//                } else if (rst.getString("FTE").trim().equals("A")) {
//                    beanBsp.strFlag = "ARC";
//                } else if (rst.getString("FTE").trim().equals("S")) {
//                    beanBsp.strFlag = "ASR";
//                } else {
//                    beanBsp.strFlag = rst.getString("FTE").trim();
//                }
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//                try {
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.TDNR = rst.getString("TDNR");
//                beanBsp.CJCP = rst.getString("CJCP");
//                beanBsp.TOUR = rst.getString("TOUR");
//                beanBsp.CUTPF = Functions.fillString(rst.getString("CUTPF"), 3).substring(0, 3);
//                beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = Functions.fillString(rst.getString("CUTPE"), 3).substring(0, 3);
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.EFRT = rst.getDouble("EFRT");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                //Paginación ===================================================
//                if (filter.intCurrentPg > 0) {
//                    beanBsp.intCurrentPg = filter.intCurrentPg;
//                } else {
//                    beanBsp.intCurrentPg = 1;
//                }
//                beanBsp.pos = (15 * (beanBsp.intCurrentPg - 1) + pos);
//                beanBsp.intPageRws = totRowsPag;
//                beanBsp.intTotalPgs = totPAGS;
//                beanBsp.intTotalRws = totRows;
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<PXF800Filter> loadPXF800Totals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.yearFrom.trim().length() == 4) {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX002S02PXF800(?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.setString(9, filter.TDNR.trim());
//            cs.setString(10, filter.FTE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.CUTPF = rst.getString("CUTPF");
//                beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = rst.getString("CUTPE");
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = rst.getString("CUTP");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return listaData;
//
//    }
//
//    public List<PXF800Filter> loadPXF801Control(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX003S01PXF801(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                if (rst.getString("ORIG").trim().equals("A")) {
//                    beanBsp.ORIG = "ARC";
//                } else if (rst.getString("ORIG").trim().equals("T")) {
//                    beanBsp.ORIG = "TCN";
//                } else if (rst.getString("ORIG").trim().equals("B")) {
//                    beanBsp.ORIG = "BSP";
//                } else if (rst.getString("ORIG").trim().equals("S")) {
//                    beanBsp.ORIG = "ASR";
//                } else {
//                    beanBsp.ORIG = rst.getString("ORIG").trim();
//                }
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.PBAED = rst.getString("PBAED");
//                try {
//                    beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4));
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4));
//                    beanBsp.formatBillDate = rst.getString("PBAED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("PBAED").substring(4, 6));
//                } catch (Exception e) {
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.FARELOC = rst.getDouble("FARELOC");
//                //beanBsp.CUTPF = Functions.fillString(rst.getString("CUTPF"), 3).substring(0, 3);
//                //beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = Functions.fillString(rst.getString("CUTPE"), 3).substring(0, 3);
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.EFRT = rst.getDouble("EFRT");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                beanBsp.pos = pos;
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadPXF801CtrlTotals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstFare = new ArrayList();
//        List<PXF800Filter> lstCutp = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            if (filter.yearFrom.trim().length() == 4) {
//                filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//                filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//                filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//                filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//                filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//                filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//            }
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX003S02PXF801(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.execute();
//
//            //Obteniendo los Totales por Fare/ Equiv ===========================
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.FARELOC = rst.getDouble("FARELOC");
//                //beanBsp.CUTPF = rst.getString("CUTPF");
//                //beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = rst.getString("CUTPE");
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                lstFare.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("FARE", lstFare);
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.NTFA = rst.getDouble("NTFA");
//                    beanBsp.COBL = rst.getDouble("COBL");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("CUTP", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return hmResultado;
//
//    }
//
//    public List<PXF800Filter> loadPXF801DetControl(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.ORIG.trim().length() == 3) {
//                if (filter.ORIG.trim().equals("ASR")) {
//                    filter.ORIG = "S";
//                } else {
//                    filter.ORIG = filter.ORIG.trim().substring(0, 1);
//                }
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX003S03PXF801(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.ORIG.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.PRDA.trim());
//            cs.setString(5, filter.PBAED.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            cs.setString(10, filter.CUTP.trim());
//            cs.setString(11, filter.CUTPF.trim());
//            cs.setString(12, filter.CUTPE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                if (rst.getString("ORIG").trim().equals("A")) {
//                    beanBsp.ORIG = "ARC";
//                } else if (rst.getString("ORIG").trim().equals("T")) {
//                    beanBsp.ORIG = "TCN";
//                } else if (rst.getString("ORIG").trim().equals("B")) {
//                    beanBsp.ORIG = "BSP";
//                } else if (rst.getString("ORIG").trim().equals("S")) {
//                    beanBsp.ORIG = "ASR";
//                } else {
//                    beanBsp.ORIG = rst.getString("ORIG").trim();
//                }
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.PBAED = rst.getString("PBAED");
//                beanBsp.TRNC = rst.getString("TRNC");
//                beanBsp.STVAL = rst.getString("STVAL");
//                try {
//                    beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                            + " " + rst.getString("HRED").substring(4, 6);
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                    beanBsp.formatBillDate = rst.getString("PBAED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("PBAED").substring(4, 6))
//                            + " " + rst.getString("PBAED").substring(6, 8);
//                } catch (Exception e) {
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.FARELOC = rst.getDouble("FARELOC");
//                //beanBsp.CUTPF = Functions.fillString(rst.getString("CUTPF"), 3).substring(0, 3);
//                //beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = Functions.fillString(rst.getString("CUTPE"), 3).substring(0, 3);
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.EFRT = rst.getDouble("EFRT");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadPXF801DetTotals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstFare = new ArrayList();
//        List<PXF800Filter> lstCutp = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.ORIG.trim().length() == 3) {
//                if (filter.ORIG.trim().equals("ASR")) {
//                    filter.ORIG = "S";
//                } else {
//                    filter.ORIG = filter.ORIG.trim().substring(0, 1);
//                }
//            }
//            if (filter.HRED.trim().length() == 6) {
//                filter.HRED = filter.HRED.trim().substring(0, 4);
//            }
//            if (filter.PRDA.trim().length() == 6) {
//                filter.PRDA = filter.PRDA.trim().substring(0, 4);
//            }
//            if (filter.PBAED.trim().length() == 8) {
//                filter.PBAED = filter.PBAED.trim().substring(0, 6);
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX003S04PXF801(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.ORIG.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.PRDA.trim());
//            cs.setString(5, filter.PBAED.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            cs.setString(10, filter.CUTP.trim());
//            cs.setString(11, filter.CUTPF.trim());
//            cs.setString(12, filter.CUTPE.trim());
//            cs.execute();
//
//            //Obteniendo los Totales por Fare/ Equiv ===========================
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.FARELOC = rst.getDouble("FARELOC");
//                //beanBsp.CUTPF = rst.getString("CUTPF");
//                //beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = rst.getString("CUTPE");
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                lstFare.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("FARE", lstFare);
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.NTFA = rst.getDouble("NTFA");
//                    beanBsp.COBL = rst.getDouble("COBL");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("CUTP", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return hmResultado;
//
//    }
//
//    public List<PXF800Filter> loadPXF801DetTkt(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.ORIG.trim().length() == 3) {
//                if (filter.ORIG.trim().equals("ASR")) {
//                    filter.ORIG = "S";
//                } else {
//                    filter.ORIG = filter.ORIG.trim().substring(0, 1);
//                }
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX003S05PXF801(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.ORIG.trim());
//            cs.setString(3, filter.HRED.trim());
//            cs.setString(4, filter.PRDA.trim());
//            cs.setString(5, filter.PBAED.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            cs.setString(10, filter.CUTP.trim());
//            cs.setString(11, filter.CUTPF.trim());
//            cs.setString(12, filter.CUTPE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new PXF800Filter();
//                beanBsp.pos = pos;
//                beanBsp.CCUST = ccust;
//                beanBsp.PBAED = filter.PBAED;
//                beanBsp.formatBillDate = filter.formatBillDate;
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.TRNC = rst.getString("TRNC");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//                try {
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.TDNR = rst.getString("TDNR");
//                beanBsp.CJCP = rst.getString("CJCP");
//                beanBsp.TOUR = rst.getString("TOUR");
//                beanBsp.CUTPF = Functions.fillString(rst.getString("CUTPF"), 3).substring(0, 3);
//                beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = Functions.fillString(rst.getString("CUTPE"), 3).substring(0, 3);
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.EFRT = rst.getDouble("EFRT");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadMainDailyHot(String ccust, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//        List<PXF800Filter> lstCutp = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S01PXF801(?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.setString(9, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte Detalle ====================================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC").trim();
//                try {
//                    if (hmPaises.containsKey(beanBsp.ISOC)) {
//                        beanBsp.strNombrePais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.strNombrePais = beanBsp.ISOC;
//                }
//                try {
//                    if (filter.strTipoFecha.trim().equals("PBAED")) {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6));
//                    } else {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TOTPAY = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                beanBsp.REMT = rst.getDouble("REMT");
//
//                listaData.add(beanBsp);
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("REPORTE", listaData);
//
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TOTPAY = rst.getDouble("FPAMCA") + rst.getDouble("FPAMCC") + rst.getDouble("FPAMOT");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("TOTALES", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return hmResultado;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadMainTranscDailyHot(String ccust, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL, quiebre = "";
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstCutp = new ArrayList();
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//        int QDOC = 0, QEXC = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S02PXF801(?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.setString(9, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                if (!quiebre.trim().equals("")
//                        && !quiebre.trim().equals(rst.getString("DATE").trim() + rst.getString("ISOC").trim())) {
//
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = filter.strTipoFecha;
//                    beanBsp.CCUST = ccust;
//                    beanBsp.TRNC = "TOTAL";
//                    beanBsp.QDOC = QDOC;
//                    beanBsp.QCANJ = QEXC;
//                    lstRepTran.add(beanBsp);
//                    QDOC = rst.getInt("QDOC");
//                    QEXC = rst.getInt("QCANJ");
//                } else {
//                    QDOC += rst.getInt("QDOC");
//                    QEXC += rst.getInt("QCANJ");
//                }
//
//                quiebre = rst.getString("DATE").trim() + rst.getString("ISOC").trim();
//
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC").trim();
//                beanBsp.TRNC = rst.getString("TRNC").trim();
//                try {
//                    if (hmPaises.containsKey(beanBsp.ISOC)) {
//                        beanBsp.strNombrePais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.strNombrePais = beanBsp.ISOC;
//                }
//                try {
//                    if (filter.strTipoFecha.trim().equals("PBAED")) {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6));
//                    } else {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                beanBsp.REMT = rst.getDouble("REMT");
//
//                lstRepTran.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!quiebre.trim().equals("")) {
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.CCUST = ccust;
//                beanBsp.TRNC = "TOTAL";
//                beanBsp.QDOC = QDOC;
//                beanBsp.QCANJ = QEXC;
//                lstRepTran.add(beanBsp);
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("TRANSAC", lstRepTran);
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("TOTALES", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return hmResultado;
//    }
//
//    public List<PXF800Filter> loadMainTNUbyCountryDH(String ccust, String moneda, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S14PXF810(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.ISOC.trim());
//            cs.setString(5, filter.BSPI.trim());
//            cs.setString(6, filter.TRNC.trim());
//            cs.setString(7, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = "HRED";
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC").trim();
//                try {
//                    if (hmPaises.containsKey(beanBsp.ISOC)) {
//                        beanBsp.strNombrePais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.strNombrePais = beanBsp.ISOC;
//                }
//                try {
//                    beanBsp.strDate = rst.getString("DATE");
//                    beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.lngQTNUW = rst.getLong("QTNUW");
//                beanBsp.lngQFRTNU = rst.getLong("QFRTNU");
//                beanBsp.lngQFRTNUW = rst.getLong("QFRTNUW");
//                beanBsp.CUTP = moneda;
//                beanBsp.TOTPAY = rst.getDouble("TOTPAY");
//                beanBsp.dblTNUW = rst.getDouble("TNUW");
//                beanBsp.dblFRTNU = rst.getDouble("FRTNU");
//                beanBsp.dblFRTNUW = rst.getDouble("FRTNUW");
//                lstRepTran.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadMainTNUbyTransaction(String ccust, String moneda, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        String quiebre = "";
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        HashMap hmData = new HashMap();
//        int QDOC = 0;
//        long lngQTNUW = 0, lngQFRTNU = 0, lngQFRTNUW = 0;
//        double TOTPAY = 0, dblTNUW = 0, dblFRTNU = 0, dblFRTNUW = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S15PXF810(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.ISOC.trim());
//            cs.setString(5, filter.BSPI.trim());
//            cs.setString(6, filter.TRNC.trim());
//            cs.setString(7, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                if (!quiebre.equals("") && !quiebre.equals(rst.getString("DATE").substring(0, 4) + Functions.fillString(rst.getString("TRNC").trim(), 4))) {
//
//                    if (hmData.containsKey(quiebre)) {
//                        beanBsp = (PXF800Filter) hmData.get(quiebre);
//                        beanBsp.QDOC = beanBsp.QDOC + QDOC;
//                        beanBsp.lngQTNUW = beanBsp.lngQTNUW + lngQTNUW;
//                        beanBsp.lngQFRTNU = beanBsp.lngQFRTNU + lngQFRTNU;
//                        beanBsp.lngQFRTNUW = beanBsp.lngQFRTNUW + lngQFRTNUW;
//                        beanBsp.TOTPAY = beanBsp.TOTPAY + TOTPAY;
//                        beanBsp.dblTNUW = beanBsp.dblTNUW + dblTNUW;
//                        beanBsp.dblFRTNU = beanBsp.dblFRTNU + dblFRTNU;
//                        beanBsp.dblFRTNUW = beanBsp.dblFRTNUW + dblFRTNUW;
//                        hmData.put(quiebre, beanBsp);
//                    } else {
//                        beanBsp = new PXF800Filter();
//                        beanBsp.strTipoFecha = "HRED";
//                        beanBsp.CCUST = ccust;
//                        beanBsp.TRNC = quiebre.substring(4);
//                        try {
//                            beanBsp.strDate = quiebre.substring(0, 4);
//                            beanBsp.formatDate = "20" + quiebre.substring(0, 2) + " "
//                                    + Functions.getAbreviaturaMes(quiebre.substring(2, 4));
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                        beanBsp.QDOC = QDOC;
//                        beanBsp.lngQTNUW = lngQTNUW;
//                        beanBsp.lngQFRTNU = lngQFRTNU;
//                        beanBsp.lngQFRTNUW = lngQFRTNUW;
//                        beanBsp.CUTP = moneda;
//                        beanBsp.TOTPAY = TOTPAY;
//                        beanBsp.dblTNUW = dblTNUW;
//                        beanBsp.dblFRTNU = dblFRTNU;
//                        beanBsp.dblFRTNUW = dblFRTNUW;
//                        hmData.put(quiebre, beanBsp);
//                    }
//
//                    QDOC = rst.getInt("QDOC");
//                    lngQTNUW = rst.getLong("QTNUW");
//                    lngQFRTNU = rst.getLong("QFRTNU");
//                    lngQFRTNUW = rst.getLong("QFRTNUW");
//                    TOTPAY = rst.getDouble("TOTPAY");
//                    dblTNUW = rst.getDouble("TNUW");
//                    dblFRTNU = rst.getDouble("FRTNU");
//                    dblFRTNUW = rst.getDouble("FRTNUW");
//
//                } else {
//
//                    QDOC += rst.getInt("QDOC");
//                    lngQTNUW += rst.getLong("QTNUW");
//                    lngQFRTNU += rst.getLong("QFRTNU");
//                    lngQFRTNUW += rst.getLong("QFRTNUW");
//                    TOTPAY += rst.getDouble("TOTPAY");
//                    dblTNUW += rst.getDouble("TNUW");
//                    dblFRTNU += rst.getDouble("FRTNU");
//                    dblFRTNUW += rst.getDouble("FRTNUW");
//                }
//
//                quiebre = rst.getString("DATE").substring(0, 4) + Functions.fillString(rst.getString("TRNC").trim(), 4);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!quiebre.equals("")) {
//                if (hmData.containsKey(quiebre)) {
//                    beanBsp = (PXF800Filter) hmData.get(quiebre);
//                    beanBsp.QDOC = beanBsp.QDOC + QDOC;
//                    beanBsp.lngQTNUW = beanBsp.lngQTNUW + lngQTNUW;
//                    beanBsp.lngQFRTNU = beanBsp.lngQFRTNU + lngQFRTNU;
//                    beanBsp.lngQFRTNUW = beanBsp.lngQFRTNUW + lngQFRTNUW;
//                    beanBsp.TOTPAY = beanBsp.TOTPAY + TOTPAY;
//                    beanBsp.dblTNUW = beanBsp.dblTNUW + dblTNUW;
//                    beanBsp.dblFRTNU = beanBsp.dblFRTNU + dblFRTNU;
//                    beanBsp.dblFRTNUW = beanBsp.dblFRTNUW + dblFRTNUW;
//                    hmData.put(quiebre, beanBsp);
//                } else {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = "HRED";
//                    beanBsp.CCUST = ccust;
//                    beanBsp.TRNC = quiebre.substring(4);
//                    try {
//                        beanBsp.strDate = quiebre.substring(0, 4);
//                        beanBsp.formatDate = "20" + quiebre.substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(quiebre.substring(2, 4));
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                    beanBsp.QDOC = QDOC;
//                    beanBsp.lngQTNUW = lngQTNUW;
//                    beanBsp.lngQFRTNU = lngQFRTNU;
//                    beanBsp.lngQFRTNUW = lngQFRTNUW;
//                    beanBsp.CUTP = moneda;
//                    beanBsp.TOTPAY = TOTPAY;
//                    beanBsp.dblTNUW = dblTNUW;
//                    beanBsp.dblFRTNU = dblFRTNU;
//                    beanBsp.dblFRTNUW = dblFRTNUW;
//                    hmData.put(quiebre, beanBsp);
//                }
//            }
//
//            if (!hmData.isEmpty()) {
//                Vector v = new Vector(hmData.keySet());
//                Collections.sort(v);
//                Iterator it = v.iterator();
//
//                while (it.hasNext()) {
//                    String keyI = (String) (it.next());
//                    beanBsp = (PXF800Filter) hmData.get(keyI);
//                    lstRepTran.add(beanBsp);
//                }
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadMainTNUConcDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        String fecha = "";
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        int QDOC = 0;
//        long lngQTNUW = 0, lngQFRTNU = 0, lngQFRTNUW = 0;
//        double TOTPAY = 0, dblTNUW = 0, dblFRTNU = 0, dblFRTNUW = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S10PXF810(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.ISOC.trim());
//            cs.setString(5, filter.BSPI.trim());
//            cs.setString(6, filter.TRNC.trim());
//            cs.setString(7, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                if (!fecha.equals("") && !fecha.equals(rst.getString("DATE").substring(0, 4))) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = "HRED";
//                    beanBsp.CCUST = ccust;
//                    try {
//                        beanBsp.strDate = fecha;
//                        beanBsp.formatDate = "20" + fecha.substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(fecha.substring(2, 4));
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                    beanBsp.QDOC = QDOC;
//                    beanBsp.lngQTNUW = lngQTNUW;
//                    beanBsp.lngQFRTNU = lngQFRTNU;
//                    beanBsp.lngQFRTNUW = lngQFRTNUW;
//                    beanBsp.CUTP = moneda;
//                    beanBsp.TOTPAY = TOTPAY;
//                    beanBsp.dblTNUW = dblTNUW;
//                    beanBsp.dblFRTNU = dblFRTNU;
//                    beanBsp.dblFRTNUW = dblFRTNUW;
//                    lstRepTran.add(beanBsp);
//
//                    QDOC = rst.getInt("QDOC");
//                    lngQTNUW = rst.getLong("QTNUW");
//                    lngQFRTNU = rst.getLong("QFRTNU");
//                    lngQFRTNUW = rst.getLong("QFRTNUW");
//                    TOTPAY = rst.getDouble("TOTPAY");
//                    dblTNUW = rst.getDouble("TNUW");
//                    dblFRTNU = rst.getDouble("FRTNU");
//                    dblFRTNUW = rst.getDouble("FRTNUW");
//
//                } else {
//
//                    QDOC += rst.getInt("QDOC");
//                    lngQTNUW += rst.getLong("QTNUW");
//                    lngQFRTNU += rst.getLong("QFRTNU");
//                    lngQFRTNUW += rst.getLong("QFRTNUW");
//                    TOTPAY += rst.getDouble("TOTPAY");
//                    dblTNUW += rst.getDouble("TNUW");
//                    dblFRTNU += rst.getDouble("FRTNU");
//                    dblFRTNUW += rst.getDouble("FRTNUW");
//                }
//
//                fecha = rst.getString("DATE").substring(0, 4);
//            }
//
//            if (!fecha.equals("")) {
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = "HRED";
//                beanBsp.CCUST = ccust;
//                try {
//                    beanBsp.strDate = fecha;
//                    beanBsp.formatDate = "20" + fecha.substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(fecha.substring(2, 4));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = QDOC;
//                beanBsp.lngQTNUW = lngQTNUW;
//                beanBsp.lngQFRTNU = lngQFRTNU;
//                beanBsp.lngQFRTNUW = lngQFRTNUW;
//                beanBsp.CUTP = moneda;
//                beanBsp.TOTPAY = TOTPAY;
//                beanBsp.dblTNUW = dblTNUW;
//                beanBsp.dblFRTNU = dblFRTNU;
//                beanBsp.dblFRTNUW = dblFRTNUW;
//                lstRepTran.add(beanBsp);
//
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadMainTNUAnalDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S13PXF810(?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.ISOC.trim());
//            cs.setString(5, filter.TRNC.trim());
//            cs.setString(6, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = "HRED";
//                beanBsp.CCUST = ccust;
//                try {
//                    beanBsp.strDate = rst.getString("DATE");
//                    beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCPNC12 = rst.getInt("QCPNC12");
//                beanBsp.QCPNC13 = rst.getInt("QCPNC13");
//                beanBsp.QCPNR12 = rst.getInt("QCPNR12");
//                beanBsp.QCPNR13 = rst.getInt("QCPNR13");
//                beanBsp.QCPNINT = rst.getInt("QCPNINT");
//                beanBsp.QCPNLIF = rst.getInt("QCPNLIF");
//                beanBsp.lngQSALDO = (rst.getLong("QDOC") + rst.getInt("QCPNC12") + rst.getInt("QCPNC13")
//                        + rst.getLong("QCPNINT") + rst.getInt("QCPNLIF"))
//                        - (rst.getInt("QCPNR13"));
//                beanBsp.CUTP = moneda;
//                beanBsp.dblFRTNUW = rst.getDouble("FRTNUW");
//                beanBsp.A730TRFP12 = rst.getDouble("A730TRFP12");
//                beanBsp.A730TRFP13 = rst.getDouble("A730TRFP13");
//                beanBsp.AMOUREFP12 = rst.getDouble("AMOUREFP12");
//                beanBsp.AMOUREFP13 = rst.getDouble("AMOUREFP13");
//                if (beanBsp.AMOUREFP13 > 0) {
//                    beanBsp.AMOUREFP13 = beanBsp.AMOUREFP13 * -1;
//                }
//                beanBsp.AMOUREFS = rst.getDouble("AMOUREFS");
//                beanBsp.AMONINT = rst.getDouble("AMONINT");
//                beanBsp.AMOULIF = rst.getDouble("AMOULIF");
//                beanBsp.dblSALDO = (rst.getDouble("FRTNUW") + rst.getDouble("A730TRFP12") + rst.getDouble("A730TRFP13")
//                        + rst.getDouble("AMONINT") + rst.getDouble("AMOULIF"))
//                        - (rst.getDouble("AMOUREFP12") + rst.getDouble("AMOUREFS"));
//                lstRepTran.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadDetailDailyHot(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//        List<PXF800Filter> lstCutp = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S03PXF801(?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.strDate.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            cs.setString(10, filter.CUTP.trim());
//            cs.setString(11, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte Detalle ====================================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.FTE = filter.FTE;
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC").trim();
//                beanBsp.strNombrePais = filter.strNombrePais;
//                try {
//                    if (filter.strTipoFecha.trim().equals("PBAED")) {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6)) + " "
//                                + rst.getString("DATE").substring(6, 8);
//                    } else {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4)) + " "
//                                + rst.getString("DATE").substring(4, 6);
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                beanBsp.REMT = rst.getDouble("REMT");
//
//                listaData.add(beanBsp);
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("REPORTE", listaData);
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("TOTALES", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return hmResultado;
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadDetailTranscDailyHot(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstCutp = new ArrayList();
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        HashMap<String, List<PXF800Filter>> hmResultado = new HashMap<String, List<PXF800Filter>>();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S04PXF801(?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.strDate.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            cs.setString(10, filter.CUTP.trim());
//            cs.setString(11, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC").trim();
//                beanBsp.TRNC = rst.getString("TRNC").trim();
//                beanBsp.strNombrePais = filter.strNombrePais;
//                try {
//                    if (filter.strTipoFecha.trim().equals("PBAED")) {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = rst.getString("DATE").substring(0, 4) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(4, 6)) + " "
//                                + rst.getString("DATE").substring(6, 8);
//                    } else {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4)) + " "
//                                + rst.getString("DATE").substring(4, 6);
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.QCANJ = rst.getInt("QCANJ");
//                beanBsp.QCJP = rst.getInt("QCJP");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                beanBsp.TMFA = rst.getDouble("TMFA");
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                beanBsp.REMT = rst.getDouble("REMT");
//
//                lstRepTran.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            hmResultado.put("TRANSAC", lstRepTran);
//
//            //Obteniendo los Totales por Moneda CUTP ===========================
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.CCUST = ccust;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.QCANJ = rst.getInt("QCANJ");
//                    beanBsp.QCJP = rst.getInt("QCJP");
//                    beanBsp.CUTP = rst.getString("CUTP");
//                    beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                    beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                    beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                    beanBsp.TMFA = rst.getDouble("TMFA");
//                    beanBsp.COAM = rst.getDouble("COAM");
//                    beanBsp.SPAM = rst.getDouble("SPAM");
//                    beanBsp.EFCO = rst.getDouble("EFCO");
//                    beanBsp.REMT = rst.getDouble("REMT");
//                    beanBsp.TOTTOCA = rst.getDouble("TOCA1") + rst.getDouble("TOCA2") + rst.getDouble("TOCA3") + rst.getDouble("TOCA4");
//                    lstCutp.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            hmResultado.put("TOTALES", lstCutp);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return hmResultado;
//    }
//
//    public List<PXF800Filter> loadDetTNUConcFTEDH(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S16PXF810(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.strDate.trim());
//            cs.setString(5, filter.ISOC.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.TRNC.trim());
//            cs.setString(8, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                beanBsp = new PXF800Filter();
//                beanBsp.strTipoFecha = "HRED";
//                beanBsp.CCUST = ccust;
//                if (rst.getString("FTE").trim().equals("A")) {
//                    beanBsp.FTE = "ARC";
//                } else if (rst.getString("FTE").trim().equals("T")) {
//                    beanBsp.FTE = "TCN";
//                } else if (rst.getString("FTE").trim().equals("B")) {
//                    beanBsp.FTE = "BSP";
//                } else if (rst.getString("FTE").trim().equals("S")) {
//                    beanBsp.FTE = "ASR";
//                } else {
//                    beanBsp.FTE = rst.getString("FTE").trim();
//                }
//                try {
//                    beanBsp.strDate = rst.getString("DATE");
//                    beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                beanBsp.QDOC = rst.getInt("QDOC");
//                beanBsp.lngQTNUW = rst.getLong("QTNUW");
//                beanBsp.lngQFRTNU = rst.getLong("QFRTNU");
//                beanBsp.lngQFRTNUW = rst.getLong("QFRTNUW");
//                beanBsp.CUTP = moneda;
//                beanBsp.TOTPAY = rst.getDouble("TOTPAY");
//                beanBsp.dblTNUW = rst.getDouble("TNUW");
//                beanBsp.dblFRTNU = rst.getDouble("FRTNU");
//                beanBsp.dblFRTNUW = rst.getDouble("FRTNUW");
//                lstRepTran.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadDetTNUbyTRNC(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        int QDOC = 0;
//        long lngQTNUW = 0, lngQFRTNU = 0, lngQFRTNUW = 0;
//        double TOTPAY = 0, dblTNUW = 0, dblFRTNU = 0, dblFRTNUW = 0;
//        HashMap hmData = new HashMap();
//        String fuente = filter.FTE.trim();
//        String quiebre = "";
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            if (filter.FTE.trim().length() == 3) {
//                if (filter.FTE.trim().equals("ASR")) {
//                    fuente = "S";
//                } else {
//                    fuente = filter.FTE.trim().substring(0, 1);
//                }
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S17PXF810(?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.strDate.trim());
//            cs.setString(5, filter.ISOC.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.TRNC.trim());
//            cs.setString(8, fuente);
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            while (rst.next()) {
//
//                if (!quiebre.equals("") && !quiebre.equals(rst.getString("DATE").substring(0, 4) + Functions.fillString(rst.getString("TRNC").trim(), 4))) {
//
//                    if (hmData.containsKey(quiebre)) {
//                        beanBsp = (PXF800Filter) hmData.get(quiebre);
//                        beanBsp.QDOC = beanBsp.QDOC + QDOC;
//                        beanBsp.lngQTNUW = beanBsp.lngQTNUW + lngQTNUW;
//                        beanBsp.lngQFRTNU = beanBsp.lngQFRTNU + lngQFRTNU;
//                        beanBsp.lngQFRTNUW = beanBsp.lngQFRTNUW + lngQFRTNUW;
//                        beanBsp.TOTPAY = beanBsp.TOTPAY + TOTPAY;
//                        beanBsp.dblTNUW = beanBsp.dblTNUW + dblTNUW;
//                        beanBsp.dblFRTNU = beanBsp.dblFRTNU + dblFRTNU;
//                        beanBsp.dblFRTNUW = beanBsp.dblFRTNUW + dblFRTNUW;
//                        hmData.put(quiebre, beanBsp);
//                    } else {
//                        beanBsp = new PXF800Filter();
//                        beanBsp.strTipoFecha = "HRED";
//                        beanBsp.CCUST = ccust;
//                        beanBsp.TRNC = quiebre.substring(4);
//                        beanBsp.FTE = filter.FTE;
//                        try {
//                            beanBsp.strDate = quiebre.substring(0, 4);
//                            beanBsp.formatDate = "20" + quiebre.substring(0, 2) + " "
//                                    + Functions.getAbreviaturaMes(quiebre.substring(2, 4));
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                        beanBsp.QDOC = QDOC;
//                        beanBsp.lngQTNUW = lngQTNUW;
//                        beanBsp.lngQFRTNU = lngQFRTNU;
//                        beanBsp.lngQFRTNUW = lngQFRTNUW;
//                        beanBsp.CUTP = moneda;
//                        beanBsp.TOTPAY = TOTPAY;
//                        beanBsp.dblTNUW = dblTNUW;
//                        beanBsp.dblFRTNU = dblFRTNU;
//                        beanBsp.dblFRTNUW = dblFRTNUW;
//                        hmData.put(quiebre, beanBsp);
//                    }
//
//                    QDOC = rst.getInt("QDOC");
//                    lngQTNUW = rst.getLong("QTNUW");
//                    lngQFRTNU = rst.getLong("QFRTNU");
//                    lngQFRTNUW = rst.getLong("QFRTNUW");
//                    TOTPAY = rst.getDouble("TOTPAY");
//                    dblTNUW = rst.getDouble("TNUW");
//                    dblFRTNU = rst.getDouble("FRTNU");
//                    dblFRTNUW = rst.getDouble("FRTNUW");
//
//                } else {
//
//                    QDOC += rst.getInt("QDOC");
//                    lngQTNUW += rst.getLong("QTNUW");
//                    lngQFRTNU += rst.getLong("QFRTNU");
//                    lngQFRTNUW += rst.getLong("QFRTNUW");
//                    TOTPAY += rst.getDouble("TOTPAY");
//                    dblTNUW += rst.getDouble("TNUW");
//                    dblFRTNU += rst.getDouble("FRTNU");
//                    dblFRTNUW += rst.getDouble("FRTNUW");
//                }
//
//                quiebre = rst.getString("DATE").substring(0, 4) + Functions.fillString(rst.getString("TRNC").trim(), 4);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!quiebre.equals("")) {
//                if (hmData.containsKey(quiebre)) {
//                    beanBsp = (PXF800Filter) hmData.get(quiebre);
//                    beanBsp.QDOC = beanBsp.QDOC + QDOC;
//                    beanBsp.lngQTNUW = beanBsp.lngQTNUW + lngQTNUW;
//                    beanBsp.lngQFRTNU = beanBsp.lngQFRTNU + lngQFRTNU;
//                    beanBsp.lngQFRTNUW = beanBsp.lngQFRTNUW + lngQFRTNUW;
//                    beanBsp.TOTPAY = beanBsp.TOTPAY + TOTPAY;
//                    beanBsp.dblTNUW = beanBsp.dblTNUW + dblTNUW;
//                    beanBsp.dblFRTNU = beanBsp.dblFRTNU + dblFRTNU;
//                    beanBsp.dblFRTNUW = beanBsp.dblFRTNUW + dblFRTNUW;
//                    hmData.put(quiebre, beanBsp);
//                } else {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = "HRED";
//                    beanBsp.CCUST = ccust;
//                    beanBsp.TRNC = quiebre.substring(4);
//                    beanBsp.FTE = filter.FTE;
//                    try {
//                        beanBsp.strDate = quiebre.substring(0, 4);
//                        beanBsp.formatDate = "20" + quiebre.substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(quiebre.substring(2, 4));
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                    beanBsp.QDOC = QDOC;
//                    beanBsp.lngQTNUW = lngQTNUW;
//                    beanBsp.lngQFRTNU = lngQFRTNU;
//                    beanBsp.lngQFRTNUW = lngQFRTNUW;
//                    beanBsp.CUTP = moneda;
//                    beanBsp.TOTPAY = TOTPAY;
//                    beanBsp.dblTNUW = dblTNUW;
//                    beanBsp.dblFRTNU = dblFRTNU;
//                    beanBsp.dblFRTNUW = dblFRTNUW;
//                    hmData.put(quiebre, beanBsp);
//                }
//            }
//
//            if (!hmData.isEmpty()) {
//                Vector v = new Vector(hmData.keySet());
//                Collections.sort(v);
//                Iterator it = v.iterator();
//                String keyI = "";
//
//                while (it.hasNext()) {
//                    keyI = (String) (it.next());
//                    beanBsp = (PXF800Filter) hmData.get(keyI);
//                    lstRepTran.add(beanBsp);
//                }
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadDetTNUConcDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        HashMap hmData = new HashMap();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S11PXF810(?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.strDate.trim());
//            cs.setString(5, filter.ISOC.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.TRNC.trim());
//            cs.setString(8, filter.strFlag);
//            cs.setString(9, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//            double rate = 0;
//            while (rst.next()) {
//
//                if (rst.getDouble("RATE") < -16 || rst.getDouble("RATE") > 16) {
//                    rate = 0;
//                } else {
//                    rate = rst.getDouble("RATE");
//                }
//
//                if (hmData.containsKey(String.valueOf(rate))) {
//                    beanBsp = (PXF800Filter) hmData.get(String.valueOf(rate));
//                    beanBsp.QDOC = beanBsp.QDOC + rst.getInt("QDOC");
//                    beanBsp.TOTPAY = beanBsp.TOTPAY + rst.getDouble("TOTPAY");
//                    hmData.put(String.valueOf(rate), beanBsp);
//                } else {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = "HRED";
//                    beanBsp.strFlag = filter.strFlag;
//                    beanBsp.CCUST = ccust;
//                    beanBsp.FTE = filter.FTE;
//                    try {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                    beanBsp.RATE = rate;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.CUTP = moneda;
//                    beanBsp.TOTPAY = rst.getDouble("TOTPAY");
//                    hmData.put(String.valueOf(rate), beanBsp);
//                }
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!hmData.isEmpty()) {
//                Vector v = new Vector(hmData.keySet());
//                Collections.sort(v);
//                Iterator it = v.iterator();
//                String keyI = "";
//
//                while (it.hasNext()) {
//                    keyI = (String) (it.next());
//                    beanBsp = (PXF800Filter) hmData.get(keyI);
//                    lstRepTran.add(beanBsp);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadDetTNUConcbyTran(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> lstRepTran = new ArrayList();
//        HashMap hmData = new HashMap();
//        String quiebre = "";
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (moneda.trim().equals("")) {
//                moneda = "MXN";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S12PXF810(?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(4, filter.strDate.trim());
//            cs.setString(5, filter.ISOC.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.TRNC.trim());
//            cs.setDouble(8, filter.RATE);
//            cs.setString(9, filter.strFlag);
//            cs.setString(10, filter.FTE.trim());
//            cs.execute();
//
//            //Obteniendo el Reporte por tipo de Transacción ====================
//            rst = cs.getResultSet();
//
//            double rate = 0;
//            while (rst.next()) {
//                if (rst.getDouble("RATE") < -16 || rst.getDouble("RATE") > 16) {
//                    rate = 0;
//                } else {
//                    rate = rst.getDouble("RATE");
//                }
//                quiebre = Functions.fillString(rst.getString("TRNC"), 4) + String.valueOf(rate);
//                if (hmData.containsKey(quiebre)) {
//                    beanBsp = (PXF800Filter) hmData.get(quiebre);
//                    beanBsp.QDOC = beanBsp.QDOC + rst.getInt("QDOC");
//                    beanBsp.TOTPAY = beanBsp.TOTPAY + rst.getDouble("TOTPAY");
//                    hmData.put(quiebre, beanBsp);
//                } else {
//                    beanBsp = new PXF800Filter();
//                    beanBsp.strTipoFecha = "HRED";
//                    beanBsp.strFlag = filter.strFlag;
//                    beanBsp.FTE = filter.FTE;
//                    beanBsp.TRNC = rst.getString("TRNC");
//                    beanBsp.CCUST = ccust;
//                    try {
//                        beanBsp.strDate = rst.getString("DATE");
//                        beanBsp.formatDate = "20" + rst.getString("DATE").substring(0, 2) + " "
//                                + Functions.getAbreviaturaMes(rst.getString("DATE").substring(2, 4));
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                    beanBsp.RATE = rate;
//                    beanBsp.QDOC = rst.getInt("QDOC");
//                    beanBsp.CUTP = moneda;
//                    beanBsp.TOTPAY = rst.getDouble("TOTPAY");
//                    hmData.put(quiebre, beanBsp);
//
//                }
//            }
//
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (!hmData.isEmpty()) {
//                Vector v = new Vector(hmData.keySet());
//                Collections.sort(v);
//                Iterator it = v.iterator();
//                String keyI = "";
//
//                while (it.hasNext()) {
//                    keyI = (String) (it.next());
//                    beanBsp = (PXF800Filter) hmData.get(keyI);
//                    lstRepTran.add(beanBsp);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstRepTran;
//    }
//
//    public List<PXF800Filter> loadDetTktDailyhot(String ccust, UserView user, PXF800Filter filter, String flagRate, int rowsPag) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        PXF800Filter beanBsp;
//        List<PXF800Filter> listaData = new ArrayList();
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;
//        if (filter.QDOC > 0) {
//            filter.intTotalRws = filter.QDOC;
//        }
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//            if (filter.intCurrentPg > 0) {
//                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
//            }
//            if (filter.ORIG.trim().length() == 3) {
//                if (filter.ORIG.trim().equals("ASR")) {
//                    filter.ORIG = "S";
//                } else {
//                    filter.ORIG = filter.ORIG.trim().substring(0, 1);
//                }
//            } else {
//                if (filter.FTE.trim().length() == 3) {
//                    if (filter.FTE.trim().equals("ASR")) {
//                        filter.ORIG = "S";
//                    } else {
//                        filter.ORIG = filter.FTE.trim().substring(0, 1);
//                    }
//                } else {
//                    filter.ORIG = filter.FTE;
//                }
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX004S05PXF800(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.registerOutParameter(14, Types.INTEGER);
//            cs.registerOutParameter(15, Types.INTEGER);
//            cs.registerOutParameter(16, Types.INTEGER);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.strDate.trim());
//            cs.setString(6, filter.PDAI.trim());
//            cs.setString(7, filter.ISOC.trim());
//            cs.setString(8, filter.BSPI.trim());
//            cs.setString(9, filter.TRNC.trim());
//            //cs.setString(10, filter.CUTP.trim());
//            cs.setString(10, "");
//            cs.setString(11, filter.ORIG.trim());
//            cs.setDouble(12, filter.RATE);
//            cs.setString(13, flagRate);
//            cs.setInt(14, totRowsPag);
//            cs.setInt(15, PAGINIT);
//            cs.setInt(16, filter.intTotalRws);
//            cs.execute();
//
//            //if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(13)) {
//            totRows = filter.intTotalRws;
//            //totPAGS = filter.intTotalPgs;
//            //} else {
//            try {
//                //totRows = cs.getInt(14);
//                String temp = String.valueOf(totRows / 15.0);
//                if (temp.contains(".")) {
//                    totPAGS = (totRows / totRowsPag) + 1;
//                } else {
//                    totPAGS = totRows / totRowsPag;
//                }
//            } catch (Exception e) {
//                totPAGS = totRows / totRowsPag;
//            }
//            //}
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new PXF800Filter();
//                beanBsp.pos = pos;
//                beanBsp.CCUST = ccust;
//                beanBsp.strTipoFecha = filter.strTipoFecha;
//                beanBsp.strNombrePais = filter.strNombrePais;
//                beanBsp.FTE = filter.ORIG;
//                beanBsp.strDate = filter.strDate;
//                if (filter.strTipoFecha.trim().equals("PBAED")) {
//                    beanBsp.formatBillDate = filter.formatDate;
//                }
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.TRNC = rst.getString("TRNC");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                        + " " + rst.getString("HRED").substring(4, 6);
//                try {
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.TDNR = rst.getString("TDNR");
//                beanBsp.CJCP = rst.getString("CJCP");
//                beanBsp.TOUR = rst.getString("TOUR");
//                beanBsp.CUTPF = Functions.fillString(rst.getString("CUTPF"), 3).substring(0, 3);
//                beanBsp.FARE = rst.getDouble("FARE");
//                beanBsp.CUTPE = Functions.fillString(rst.getString("CUTPE"), 3).substring(0, 3);
//                beanBsp.EQFR = rst.getDouble("EQFR");
//                beanBsp.CUTP = Functions.fillString(rst.getString("CUTP"), 3).substring(0, 3);
//                beanBsp.COAM = rst.getDouble("COAM");
//                beanBsp.NTFA = rst.getDouble("NTFA");
//                beanBsp.COBL = rst.getDouble("COBL");
//                beanBsp.EFRT = rst.getDouble("EFRT");
//                beanBsp.EFCO = rst.getDouble("EFCO");
//                beanBsp.SPAM = rst.getDouble("SPAM");
//                beanBsp.REMT = rst.getDouble("REMT");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.FPAMCA = rst.getDouble("FPAMCA");
//                beanBsp.FPAMCC = rst.getDouble("FPAMCC");
//                beanBsp.FPAMOT = rst.getDouble("FPAMOT");
//                //Paginación ===================================================
//                if (filter.intCurrentPg > 0) {
//                    beanBsp.intCurrentPg = filter.intCurrentPg;
//                } else {
//                    beanBsp.intCurrentPg = 1;
//                }
//                beanBsp.pos = (15 * (beanBsp.intCurrentPg - 1) + pos);
//                beanBsp.intPageRws = totRowsPag;
//                beanBsp.intTotalPgs = totPAGS;
//                beanBsp.intTotalRws = totRows;
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF109> loadBSPF109(String CCUST, UserView user) throws SQLException {
//
//        Statement stmt = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF109 beanBsp;
//        List<BSPF109> listaData = new ArrayList(0);
//
//        strSQL = "SELECT * FROM " + session.getMainLibrary() + ".BSPF109 WHERE CCUST ='" + CCUST + "' ORDER BY HRED";
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(strSQL);
//
//            while (rst.next()) {
//                beanBsp = new BSPF109();
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getInt("HRED");
//                beanBsp.PRDA = rst.getInt("PRDA");
//                beanBsp.FUENTE = rst.getString("FUENTE");
//                beanBsp.STVAL = rst.getString("STVAL");
//                beanBsp.TACN = rst.getString("TACN");
//                beanBsp.TTIME = rst.getString("TTIME");
//                beanBsp.PDAI = rst.getString("PDAI");
//                beanBsp.PCYC = rst.getInt("PCYC");
//                beanBsp.PBAED = rst.getString("PBAED");
//                beanBsp.DYRI = rst.getString("DYRI");
//                beanBsp.FSQN = rst.getInt("FSQN");
//                beanBsp.QREG = rst.getInt("QREG");
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR").substring(0, 4) + "-" + rst.getString("FECR").substring(4, 6) + "-" + rst.getString("FECR").substring(6, 8);
//                beanBsp.HOCR = rst.getString("HOCR").substring(0, 2) + ":" + rst.getString("HOCR").substring(2, 4) + ":" + rst.getString("HOCR").substring(4, 6);
//                beanBsp.USUP = rst.getString("USUP");
//                beanBsp.FEUP = rst.getString("FEUP").substring(0, 4) + "-" + rst.getString("FEUP").substring(4, 6) + "-" + rst.getString("FEUP").substring(6, 8);
//                beanBsp.HOUP = rst.getString("HOUP").substring(0, 2) + ":" + rst.getString("HOUP").substring(2, 4) + ":" + rst.getString("HOUP").substring(4, 6);
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (stmt != null) {
//                stmt.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<ARCF24Filter> loadARCReport(String ccust, UserView user, ARCF24Filter filter, int rowsPag) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        ARCF24Filter beanBsp;
//        List<ARCF24Filter> listaData = new ArrayList<ARCF24Filter>();
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        if (filter.strTipoFecha.trim().equals("PBAED")) {
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo.substring(0, 4)).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        } else {
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//        }
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (filter.intCurrentPg > 0) {
//                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
//            }
//            if (filter.strTipoFecha.trim().equals("")) {
//                filter.strTipoFecha = "HRED";
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX005S01ARCF24(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.registerOutParameter(10, Types.INTEGER);
//            cs.registerOutParameter(11, Types.INTEGER);
//            cs.registerOutParameter(12, Types.INTEGER);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha.trim());
//            cs.setString(3, filter.yearFrom + filter.monthFrom + filter.dayFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo + filter.dayTo);
//            cs.setString(5, filter.PDAI.trim());
//            cs.setString(6, filter.ISOC.trim());
//            cs.setString(7, filter.BSPI.trim());
//            cs.setString(8, filter.TRNC.trim());
//            cs.setString(9, filter.TDNR.trim());
//            cs.setInt(10, totRowsPag);
//            cs.setInt(11, PAGINIT);
//            cs.setInt(12, filter.intTotalRws);
//            cs.execute();
//
//            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(11)) {
//                totRows = filter.intTotalRws;
//                totPAGS = filter.intTotalPgs;
//            } else {
//                try {
//                    totRows = cs.getInt(12);
//                    String temp = String.valueOf(totRows / 15.0);
//                    if (temp.contains(".")) {
//                        totPAGS = (totRows / totRowsPag) + 1;
//                    } else {
//                        totPAGS = totRows / totRowsPag;
//                    }
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//
//                beanBsp = new ARCF24Filter();
//                beanBsp.CCUST = ccust;
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.BSPI = rst.getString("BSPI");
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.PRDA = rst.getString("PRDA");
//                beanBsp.TRNC = rst.getString("TRNC");
//                beanBsp.AGTN = rst.getString("AGTN");
//                beanBsp.PDAI = Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                beanBsp.periodo = "Week " + Functions.fillString(rst.getString("PDAI"), 3).substring(2, 3);
//                try {
//                    beanBsp.formatDate = "20" + rst.getString("HRED").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(2, 4))
//                            + " " + rst.getString("HRED").substring(4, 6);
//                    beanBsp.formatProcDate = "20" + rst.getString("PRDA").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("PRDA").substring(2, 4))
//                            + " " + rst.getString("PRDA").substring(4, 6);
//                    beanBsp.formatBillDate = rst.getString("PBAED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("PBAED").substring(4, 6))
//                            + " " + rst.getString("PBAED").substring(6, 8);
//                    beanBsp.formatIssue = "20" + rst.getString("DAIS").substring(0, 2) + " " + Functions.getAbreviaturaMes(rst.getString("DAIS").substring(2, 4))
//                            + " " + rst.getString("DAIS").substring(4, 6);
//                } catch (Exception e) {
//                }
//                beanBsp.DAIS = rst.getInt("DAIS");
//                beanBsp.TRNN = rst.getInt("TRNN");
//                beanBsp.TACN1 = rst.getString("TACN1");
//                beanBsp.TDNR = rst.getString("TACN1") + rst.getString("TDNR");
//                beanBsp.CDGT1 = rst.getInt("CDGT1");
//                beanBsp.SASI = rst.getString("SASI");
//                beanBsp.TKMI = rst.getString("TKMI");
//                beanBsp.CPUI = rst.getString("CPUI");
//                beanBsp.CJCP = rst.getString("CJCP");
//                beanBsp.TACN2 = rst.getString("TACN2");
//                beanBsp.CDGT2 = rst.getInt("CDGT2");
//                beanBsp.ETIN = rst.getString("ETIN");
//                beanBsp.INLS = rst.getString("INLS");
//                beanBsp.MODI = rst.getString("MODI");
//                beanBsp.ARPI = rst.getString("ARPI");
//                beanBsp.TOUR = rst.getString("TOUR");
//                beanBsp.TDAM = rst.getDouble("TDAM");
//                beanBsp.ACCD1 = rst.getString("ACCD1");
//                beanBsp.ACCD2 = rst.getString("ACCD2");
//                beanBsp.SUPD = rst.getString("SUPD");
//                beanBsp.MFOP = rst.getString("MFOP");
//                beanBsp.DOCT = rst.getString("DOCT");
//                beanBsp.PNRR = rst.getString("PNRR");
//                beanBsp.ERRC = rst.getString("ERRC");
//                //Paginación ===================================================
//                if (filter.intCurrentPg > 0) {
//                    beanBsp.intCurrentPg = filter.intCurrentPg;
//                } else {
//                    beanBsp.intCurrentPg = 1;
//                }
//                beanBsp.pos = (15 * (beanBsp.intCurrentPg - 1) + pos);
//                beanBsp.intPageRws = totRowsPag;
//                beanBsp.intTotalPgs = totPAGS;
//                beanBsp.intTotalRws = totRows;
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF110Filter> loadBSPF110(String CCUST, UserView user, BSPF110Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF110Filter beanBsp;
//        List<BSPF110Filter> listaData = new ArrayList(0);
//        String whereFec = "", tipo = "";
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PXBSPF110(?,?,?,?)}";
//        if (filter.strTipoFecha.trim().equals("")) {
//            filter.strTipoFecha = "FECR";
//        }
//
//        if (!filter.check.trim().equals("09")) {
//            if (filter.filtro.equals("P")) {
//                tipo = " AND ISOC IN ('77','99','88') ";
//            } else if (filter.filtro.contains("P_")) {
//                tipo = " AND ISOC IN ('77','99','88') AND FUENTE ='" + filter.filtro.substring(2) + "'";
//            } else {
//                if (!"All".equals(filter.filtro) && !"".equals(filter.pais)) {
//                    tipo = " AND FUENTE='" + filter.filtro + "' AND ISOC='" + filter.pais + "' ";
//                } else if (!"All".equals(filter.filtro) && filter.pais.equals("")) {
//                    tipo = " AND FUENTE ='" + filter.filtro + "' ";
//                } else if (!"".equals(filter.pais) && filter.filtro.equals("All")) {
//                    tipo = " AND ISOC ='" + filter.pais + "' ";
//                }
//            }
//
//            if (filter.strTipoFecha.trim().equals("HRED")) {
//                //YYMMDD
//                if (filter.yearFrom.equals("0")) {
//                    whereFec = " AND SUBSTRING(HRED, 1, 2) BETWEEN '05' AND '"
//                            + Functions.getFechaActual().substring(2, 4) + "' " + tipo + " ";
//                } else if (filter.monthFrom.equals("0") && !filter.yearFrom.equals("0")) {//año
//                    whereFec = " AND SUBSTRING(HRED, 1, 2) BETWEEN '"
//                            + filter.yearFrom.substring(2, 4) + "' AND '" + filter.yearTo.substring(2, 4) + "' " + tipo + "";
//                } else if (filter.dayFrom.equals("0") && !filter.yearFrom.equals("0") && !filter.monthFrom.equals("0")) {//año y mes
//                    whereFec = " AND SUBSTRING(HRED, 1, 4) BETWEEN '"
//                            + filter.yearFrom.substring(2, 4) + Functions.fillZeros(2, filter.monthFrom) + "' AND '"
//                            + filter.yearTo.substring(2, 4) + Functions.fillZeros(2, filter.monthTo) + "' " + tipo + " ";
//                } else if (!"0".equals(filter.yearFrom) && !"0".equals(filter.monthFrom) && !"0".equals(filter.dayFrom)) {
//                    String FecFrom = filter.yearFrom.substring(2, 4) + Functions.fillZeros(2, filter.monthFrom) + Functions.fillZeros(2, filter.dayFrom);
//                    String FecTo = filter.yearTo.substring(2, 4) + Functions.fillZeros(2, filter.monthTo) + Functions.fillZeros(2, filter.dayTo);
//                    whereFec = " AND HRED BETWEEN '" + FecFrom + "' AND '" + FecTo + "' " + tipo + "";
//                }
//            } else {
//                if (filter.yearFrom.equals("0")) {
//                    //YYYYMMDD
//                    whereFec = " AND SUBSTRING(FECR, 1, 4) BETWEEN '2005' AND '"
//                            + Functions.getFechaActual().substring(0, 4) + "' " + tipo + " ";
//                } else if (filter.monthFrom.equals("0") && !filter.yearFrom.equals("0")) {//año
//                    whereFec = " AND SUBSTRING(FECR, 1, 4) BETWEEN '"
//                            + filter.yearFrom + "' AND '" + filter.yearTo.substring(0, 4) + "' " + tipo + "";
//                } else if (filter.dayFrom.equals("0") && !filter.yearFrom.equals("0") && !filter.monthFrom.equals("0")) {//año y mes
//                    whereFec = " AND SUBSTRING(FECR, 1, 6) BETWEEN '"
//                            + filter.yearFrom + Functions.fillZeros(2, filter.monthFrom) + "' AND '"
//                            + filter.yearTo.substring(0, 4) + Functions.fillZeros(2, filter.monthTo) + "' " + tipo + " ";
//                } else if (!"0".equals(filter.yearFrom) && !"0".equals(filter.monthFrom) && !"0".equals(filter.dayFrom)) {
//                    String FecFrom = filter.yearFrom.substring(0, 4) + Functions.fillZeros(2, filter.monthFrom) + Functions.fillZeros(2, filter.dayFrom);
//                    String FecTo = filter.yearTo.substring(0, 4) + Functions.fillZeros(2, filter.monthTo) + Functions.fillZeros(2, filter.dayTo);
//                    whereFec = " AND FECR BETWEEN '" + FecFrom + "' AND '" + FecTo + "' " + tipo + "";
//                }
//            }
//        }
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, whereFec);
//            cs.setString(3, filter.check);
//            cs.setString(4, filter.strTipoFecha);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//                beanBsp = new BSPF110Filter();
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.ISOC = rst.getString("ISOC");
//                //Nombre Pais
//                try {
//                    if (hmPaises.containsKey(beanBsp.ISOC)) {
//                        beanBsp.tooltippais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.tooltippais = beanBsp.ISOC;
//                }
//                beanBsp.HREDSring = "20" + String.valueOf(rst.getInt("HRED")).substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(String.valueOf(rst.getInt("HRED")).substring(2, 4)) + " "
//                        + String.valueOf(rst.getInt("HRED")).substring(4, 6);
//                beanBsp.FUENTE = rst.getString("FUENTE");
//                beanBsp.PRDA = "20" + String.valueOf(rst.getInt("PRDA")).substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(String.valueOf(rst.getInt("PRDA")).substring(2, 4)) + " "
//                        + String.valueOf(rst.getInt("PRDA")).substring(4, 6);
//                beanBsp.PBAED = String.valueOf(rst.getInt("PBAED")).substring(0, 4) + " "
//                        + Functions.getAbreviaturaMes(rst.getString("PBAED").substring(4, 6)) + " "
//                        + String.valueOf(rst.getInt("PBAED")).substring(6, 8);
//
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.FECRf = rst.getString("FECR").substring(0, 4) + " "
//                        + Functions.getAbreviaturaMes(rst.getString("FECR").substring(4, 6)) + " "
//                        + rst.getString("FECR").substring(6, 8);
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.HOCRf = rst.getString("HOCR").substring(0, 2) + ":" + rst.getString("HOCR").substring(2, 4) + ":" + rst.getString("HOCR").substring(4, 6);
//                beanBsp.DYRI = rst.getString("DYRI");
//                if (!"".equals(rst.getString("TTIME").trim())) {
//                    beanBsp.TTIME = rst.getString("TTIME").substring(0, 2) + ":" + rst.getString("TTIME").substring(2, 4);
//                }
//
//                beanBsp.FSQN = rst.getInt("FSQN");
//                beanBsp.BSPI = rst.getString("BSPI");
//                //Nombre Ciudad
//                try {
//                    if (hmCiudades.containsKey(beanBsp.BSPI)) {
//                        beanBsp.tooltipciudad = beanBsp.BSPI + " - " + hmCiudades.get(beanBsp.BSPI).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.tooltipciudad = beanBsp.BSPI;
//                }
//                if (filter.check.equals("10")) {
//                    beanBsp.QRECOR = rst.getInt("QRECOR");
//                    beanBsp.MENSA = rst.getString("MENSA");
//                } else {
//                    beanBsp.QRECOR = rst.getInt("QREG");
//                }
//
//                beanBsp.contador = pos;
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF110Filter> loadDrillBSPF110(String CCUST, UserView user, BSPF110Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null, rst2 = null;
//        String strSQL;
//        BSPF110Filter beanBsp;
//        BSPF110Filter beanBsp2;
//        beanBsp2 = new BSPF110Filter();
//        List<BSPF110Filter> listaData = new ArrayList(0);
//        String where = "", isoc = "";
//
//        if (filter.filtro.equals("drill2")) {
//            if (filter.ISOC.equals("77") || filter.ISOC.equals("88") || filter.ISOC.equals("99")) {
//                isoc = " AND ISOC = '" + filter.ISOC + "'";
//            }
//            where = " AND HRED = " + filter.HRED + " AND PBAED = '" + filter.PBAED + "' AND PRDA = " + filter.PRDA + " " + isoc + " ";
//        }
//        /*
//         strSQL = "SELECT SUM(QRECOR) as QRECOR,HRED,PRDA,PBAED,FECR,HOCR,FUENTE,USCR" + select + " "
//         + " FROM " + session.getMainLibrary() + ".BSPF110 WHERE CCUST ='" + CCUST + "' AND FUENTE='" + filter.FUENTE + "' " + where + " "
//         + " AND SUBSTR(FECR,1,6)='" + fec + "' AND  HOCR='" + filter.HOCR + "' GROUP BY HRED,PRDA,PBAED,FECR,HOCR,FUENTE,USCR" + groupby + " "
//         + " ORDER BY HRED " + orderby + " ";*/
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX006S02BSPF110(?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, filter.filtro.trim());
//            cs.setString(3, filter.FECR.trim());
//            cs.setString(4, where);
//            cs.setString(5, filter.FUENTE.trim());
//            cs.setString(6, filter.HOCR.trim());
//            cs.execute();
//
//            rst2 = cs.getResultSet();
//            if (rst2.next()) {
//
//                beanBsp2.HRED = rst2.getInt("HRED");
//                beanBsp2.HREDSring = "20" + String.valueOf(rst2.getInt("HRED")).substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(String.valueOf(rst2.getInt("HRED")).substring(2, 4)) + " "
//                        + String.valueOf(rst2.getInt("HRED")).substring(4, 6);
//                beanBsp2.PRDA = rst2.getString("PRDA");
//                beanBsp2.PRDAf = "20" + String.valueOf(rst2.getInt("PRDA")).substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(String.valueOf(rst2.getInt("PRDA")).substring(2, 4)) + " "
//                        + String.valueOf(rst2.getInt("PRDA")).substring(4, 6);
//                beanBsp2.FUENTE = rst2.getString("FUENTE");
//                beanBsp2.PBAED = rst2.getString("PBAED");
//                beanBsp2.PBAEDf = String.valueOf(rst2.getInt("PBAED")).substring(0, 4) + " "
//                        + Functions.getAbreviaturaMes(rst2.getString("PBAED").substring(4, 6)) + " "
//                        + String.valueOf(rst2.getInt("PBAED")).substring(6, 8);
//                beanBsp2.USCR = rst2.getString("USCR");
//                beanBsp2.FECR = rst2.getString("FECR");
//                if (rst2.getString("FECR").length() == 8) {
//                    beanBsp2.FECRf = rst2.getString("FECR").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst2.getString("FECR").substring(4, 6)) + " " + rst2.getString("FECR").substring(6, 8);
//                } else {
//                    beanBsp2.FECRf = rst2.getString("FECR");
//                }
//                beanBsp2.HOCR = rst2.getString("HOCR");
//                beanBsp2.HOCRf = rst2.getString("HOCR").substring(0, 2) + ":" + rst2.getString("HOCR").substring(2, 4) + ":" + rst2.getString("HOCR").substring(4, 6);
//                beanBsp2.QRECOR = rst2.getInt("QRECOR");
//                beanBsp2.ISOC = rst2.getString("ISOC");
//                if (filter.filtro.equals("drill2")) {
//                    beanBsp2.BSPI = rst2.getString("BSPI");
//                    //Nombre Ciudad
//                    try {
//                        if (hmCiudades.containsKey(beanBsp2.BSPI)) {
//                            beanBsp2.tooltipciudad = beanBsp2.BSPI + " - " + hmCiudades.get(beanBsp2.BSPI).toString();
//                        }
//                    } catch (Exception e) {
//                        beanBsp2.tooltipciudad = beanBsp2.BSPI;
//                    }
//                    //Nombre Pais
//                    beanBsp2.ISOC = rst2.getString("ISOC");
//                    try {
//                        if (hmPaises.containsKey(beanBsp2.ISOC)) {
//                            beanBsp2.tooltippais = beanBsp2.ISOC + " - " + hmPaises.get(beanBsp2.ISOC).toString();
//                        }
//                    } catch (Exception e) {
//                        beanBsp2.tooltippais = beanBsp2.ISOC;
//                    }
//                }
//            }
//            try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            if (cs.getMoreResults()) {
//
//                rst = cs.getResultSet();
//                int pos = 0;
//                while (rst.next()) {
//                    pos++;
//                    beanBsp = new BSPF110Filter();
//                    beanBsp.HRED = rst.getInt("HRED");
//                    beanBsp.HREDSring = "20" + String.valueOf(rst.getInt("HRED")).substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(String.valueOf(rst.getInt("HRED")).substring(2, 4)) + " "
//                            + String.valueOf(rst.getInt("HRED")).substring(4, 6);
//                    beanBsp.PRDA = rst.getString("PRDA");
//                    beanBsp.PRDAf = "20" + String.valueOf(rst.getInt("PRDA")).substring(0, 2) + " "
//                            + Functions.getAbreviaturaMes(String.valueOf(rst.getInt("PRDA")).substring(2, 4)) + " "
//                            + String.valueOf(rst.getInt("PRDA")).substring(4, 6);
//                    beanBsp.FUENTE = rst.getString("FUENTE");
//                    beanBsp.PBAED = rst.getString("PBAED");
//                    beanBsp.PBAEDf = String.valueOf(rst.getInt("PBAED")).substring(0, 4) + " "
//                            + Functions.getAbreviaturaMes(rst.getString("PBAED").substring(4, 6)) + " "
//                            + String.valueOf(rst.getInt("PBAED")).substring(6, 8);
//                    beanBsp.USCR = rst.getString("USCR");
//                    beanBsp.FECR = rst.getString("FECR");
//                    if (rst.getString("FECR").length() == 8) {
//                        beanBsp.FECRf = rst.getString("FECR").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("FECR").substring(4, 6)) + " " + rst.getString("FECR").substring(6, 8);
//                    } else {
//                        beanBsp2.FECRf = rst.getString("FECR");
//                    }
//                    beanBsp.HOCR = rst.getString("HOCR");
//                    beanBsp.HOCRf = rst.getString("HOCR").substring(0, 2) + ":" + rst.getString("HOCR").substring(2, 4) + ":" + rst.getString("HOCR").substring(4, 6);
//                    beanBsp.QRECOR = rst.getInt("QRECOR");
//                    beanBsp.contador = pos;
//                    if (filter.filtro.equals("drill2")) {
//                        beanBsp.BSPI = rst.getString("BSPI");
//                        //Nombre Ciudad
//                        try {
//                            if (hmCiudades.containsKey(beanBsp.BSPI)) {
//                                beanBsp.tooltipciudad = beanBsp.BSPI + " - " + hmCiudades.get(beanBsp.BSPI).toString();
//                            }
//                        } catch (Exception e) {
//                            beanBsp.tooltipciudad = beanBsp.BSPI;
//                        }
//                        //Nombre Pais
//                        beanBsp.ISOC = rst.getString("ISOC");
//                        try {
//                            if (hmPaises.containsKey(beanBsp.ISOC)) {
//                                beanBsp.tooltippais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                            }
//                        } catch (Exception e) {
//                            beanBsp.tooltippais = beanBsp.ISOC;
//                        }
//                    }
//
//                    listaData.add(beanBsp);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//                if (filter.ISOC.equals("77") || filter.ISOC.equals("88") || filter.ISOC.equals("99")) {
//                    beanBsp2.contador = pos + 1;
//                    listaData.add(beanBsp2);
//                }
//
//            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (rst2 != null) {
//                try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException {
//        Statement stmt = null;
//        ResultSet rst = null;
//        PXF051Filter file;
//        List<PXF051Filter> lstData = new ArrayList<PXF051Filter>(0);
//        String SQLWRE = "", SQLWRE_COLUMN = "", SQLWRE_DATE_FROM = "", SQLWRE_DATE_TO = "";
//        boolean bolWhereDate = false, bolWhereDateBewteen = false;
//
//        if (filter.filterType.equals("FREPOR")) {
//            if (!filter.yearFrom.equals("0000") || !filter.monthFrom.equals("00") || !filter.dayFrom.equals("00")
//                    || !filter.yearTo.equals("0000") || !filter.monthTo.equals("00") || !filter.dayTo.equals("00")) {
//                bolWhereDate = true;
//                if (filter.yearFrom.equals(filter.yearTo) && filter.monthFrom.equals(filter.monthTo) && filter.dayFrom.equals(filter.dayTo)) {
//                    if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && !filter.dayFrom.equals("00")) {           //YYYYMMDD
//                        SQLWRE_COLUMN = "FREPOR";
//                        SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
//                    } else if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {     //YYYYMM
//                        SQLWRE_COLUMN = "SUBSTRING(FREPOR, 1, 6)";
//                        SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom;
//                    } else if (!filter.yearFrom.equals("0000") && filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //YYYY
//                        SQLWRE_COLUMN = "SUBSTRING(FREPOR, 1, 4)";
//                        SQLWRE_DATE_FROM = filter.yearFrom;
//                    } else if (filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //YYYYDD
//                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(FREPOR, 1, 4), SUBSTRING(FREPOR, 6, 8))";
//                        SQLWRE_DATE_FROM = filter.yearFrom + filter.dayFrom;
//                    } else if (filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //MMDD
//                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(FREPOR, 4, 6), SUBSTRING(FREPOR, 6, 8))";
//                        SQLWRE_DATE_FROM = filter.monthFrom + filter.dayFrom;
//                    }
//                } else {
//                    bolWhereDateBewteen = true;
//                    SQLWRE_COLUMN = "FREPOR";
//                    SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
//                    SQLWRE_DATE_TO = ((filter.yearTo.equals("0000")) ? "9999" : filter.yearTo) + ((filter.monthTo.equals("00")) ? "12" : filter.monthTo) + ((filter.dayTo.equals("00")) ? "31" : filter.dayTo);
//                }
//            }
//            if (bolWhereDate) {
//                if (bolWhereDateBewteen) {
//                    SQLWRE += " AND " + SQLWRE_COLUMN + " BETWEEN '" + SQLWRE_DATE_FROM + "' AND '" + SQLWRE_DATE_TO + "'";
//                } else {
//                    SQLWRE += " AND " + SQLWRE_COLUMN + " = '" + SQLWRE_DATE_FROM + "'";
//                }
//            }
//            if (!filter.WKSTAT.isEmpty()) {
//                SQLWRE += " AND (WKSTAT = '" + filter.WKSTAT + "' OR STATION = '" + filter.WKSTAT + "' OR CODE = '" + filter.WKSTAT + "')";
//            }
//            if (filter.PSTATE != 0) {
//                SQLWRE += " AND PSTATE = " + filter.PSTATE;
//            }
//            if (!filter.ST.equals("ALL")) {
//                if (filter.ST.equals("EMPTY")) {
//                    SQLWRE += " AND ST = ''";
//                } else {
//                    SQLWRE += " AND ST = '" + filter.ST + "'";
//                }
//            }
//            if (!filter.SAMT.equals("ALL")) {
//                if (filter.SAMT.equals("EMPTY")) {
//                    SQLWRE += " AND SAMT = ''";
//                } else if(filter.SAMT.equals("N")) {
//                    SQLWRE += " AND SAMT IN ('" + filter.SAMT + "','')";
//                } else if(filter.SAMT.equals("Y")) {
//                    SQLWRE += " AND SAMT = '" + filter.SAMT + "'";
//                }
//            }
//        }
//
//        String SQLQRY = "SELECT "
//                + "CCUST, WKSTAT, FREPOR, SEC, BSEC, PSTATE, SEQ,"
//                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
//                + "VOIDS, FTRANS, TTRANS, IVSADIFF,"
//                + "MANUP, FTRANSP,"
//                + "SUM(A1720_FA_SUM) AS TTRANSP,"
//                + "SAMT, COMENT,"
//                + "USRC, DATC, TIMC, CRTC, USRM, DATM, TIMM, CRTM"
//                + " FROM ("
//                + "SELECT CCUST, WKSTAT, RTRIM(FREPOR) AS FREPOR, SEC, BSEC, PSTATE, SEQ,"
//                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
//                + "VOIDS, RTRIM(FTRANS) AS FTRANS, TTRANS, (XTST - TTRANS) AS IVSADIFF,"
//                + "RTRIM(MANUP) AS MANUP, RTRIM(FTRANSP) AS FTRANSP,"
//                + "IFNULL(A1720_FA_SUM,0) AS A1720_FA_SUM,"
//                + "RTRIM(SAMT) AS SAMT, RTRIM(COMENT) AS COMENT,"
//                + "USRC, DATC, TIMC, CRTC, RTRIM(USRM) AS USRM, RTRIM(DATM) AS DATM, RTRIM(TIMM) AS TIMM, RTRIM(CRTM) AS CRTM"
//                + " FROM " + session.getMainLibrary() + ".PXF051"
//                + " LEFT JOIN ("
//                + "                            SELECT A1530CCUST AS A1530CCUST_FA,A1530CSABR AS A1530CSABR_FA,A1530FDESD AS A1530FPROG_FA,A1530AGENT, A1530MDA AS A1530MDA_FA,A1530GRUPO,("
//                + "                                    SELECT (IFNULL(SUM(A1720QTRSA),0) + IFNULL(SUM(A1720QTRRF),0)) FROM " + session.getMainLibrary() + ".A1720 WHERE A1720CCUST=A1530CCUST AND A1720TIPO='FA' AND A1720GRUPO=A1530GRUPO"
//                + "                                ) AS A1720_FA_SUM"
//                + "                            FROM " + session.getMainLibrary() + ".A1530"
//                + "                        ) AS TMPTBL_A1530_A1720_TV"
//                + "                            ON (A1530CCUST_FA=CCUST AND A1530AGENT=STATION AND A1530FPROG_FA=FREPOR)"
//                + " WHERE CCUST = '" + session.getUserView().getCustomerInfo().CCUST + "'" + SQLWRE
//                + ") AS TMPTABLE "
//                + "                GROUP BY "
//                + "CCUST, WKSTAT, FREPOR, SEC, BSEC, PSTATE, SEQ,"
//                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
//                + "VOIDS, FTRANS, TTRANS, IVSADIFF,"
//                + "MANUP, FTRANSP,SAMT,COMENT,"
//                + "USRC, DATC, TIMC, CRTC, USRM, DATM, TIMM, CRTM"
//                + " ORDER BY FREPOR DESC, SEQ ASC, IVSADIFF DESC, PSTATE ASC, CODE ASC, ST ASC";
//
//        session.getCNXIBMDB2().open();
//        try {
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(SQLQRY);
//            while (rst.next()) {
//                file = new PXF051Filter();
//                file.CCUST = rst.getString("CCUST");
//                file.WKSTAT = rst.getString("WKSTAT");
//                file.FREPOR = rst.getString("FREPOR");
//                file.SEC = rst.getInt("SEC");
//                file.BSEC = rst.getInt("BSEC");
//                file.PSTATE = rst.getInt("PSTATE");
//                file.SEQ = rst.getString("SEQ");
//                file.STATION = rst.getString("STATION");
//                file.CODE = rst.getString("CODE");
//                file.OPDT = rst.getString("OPDT");
//                file.OPTM = rst.getString("OPTM");
//                file.ST = rst.getString("ST");
//                file.CLDT = rst.getString("CLDT");
//                file.CLTM = rst.getString("CLTM");
//                file.XTDT = rst.getString("XTDT");
//                file.XTTM = rst.getString("XTTM");
//                file.XTST = rst.getInt("XTST");
//                file.VOIDS = rst.getInt("VOIDS");
//                file.FTRANS = rst.getString("FTRANS");
//                file.TTRANS = rst.getInt("TTRANS");
//                file.MANUP = rst.getString("MANUP");
//                file.FTRANSP = rst.getString("FTRANSP");
//                file.TTRANSP = rst.getInt("TTRANSP"); //--.
//                file.SAMT = rst.getString("SAMT");
//                file.COMENT = rst.getString("COMENT");
//                file.diffTransactions = rst.getInt("IVSADIFF");
//                file.USRC = rst.getString("USRC");
//                file.DATC = rst.getString("DATC");
//                file.TIMC = rst.getString("TIMC");
//                file.CRTC = rst.getString("CRTC");
//                file.USRM = rst.getString("USRM");
//                file.DATM = rst.getString("DATM");
//                file.TIMM = rst.getString("TIMM");
//                file.CRTM = rst.getString("CRTM");
//
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (stmt != null) {
//                stmt.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public void insertPXF051(PXF051Filter filter) throws SQLException {
//        PreparedStatement pstmt02 = null;
//
//        String SQLQRY02 = "INSERT INTO " + session.getMainLibrary() + ".PXF051 (CCUST,WKSTAT,FREPOR,SEC,BSEC,"
//                + "PSTATE,SEQ,STATION,CODE,OPDT,OPTM,ST,CLDT,CLTM,XTDT,XTTM,XTST,VOIDS,FTRANS,TTRANS,COMENT,USRC,DATC,TIMC,CRTC)"
//                + " VALUES (?,?,?,"
//                + "((SELECT IFNULL(MAX(SEC), 0) FROM " + session.getMainLibrary() + ".PXF051 WHERE CCUST = ? AND WKSTAT = ? AND FREPOR = ?) + 1),"
//                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//
//        session.getCNXIBMDB2().open();
//        try {
//            pstmt02 = session.getCNXIBMDB2().getConnection().prepareStatement(SQLQRY02);
//            pstmt02.setString(1, session.getUserView().getCustomerInfo().CCUST);            //sessionVar.getAirClientCode()
//            pstmt02.setString(2, filter.WKSTAT);
//            pstmt02.setString(3, filter.FREPOR);
//
//            pstmt02.setString(4, session.getUserView().getCustomerInfo().CCUST);            //sessionVar.getAirClientCode()
//            pstmt02.setString(5, filter.WKSTAT);
//            pstmt02.setString(6, filter.FREPOR);
//
//            pstmt02.setInt(7, 0);
//            pstmt02.setInt(8, filter.PSTATE);
//            pstmt02.setString(9, filter.SEQ);
//            pstmt02.setString(10, filter.STATION);
//            pstmt02.setString(11, filter.CODE);
//            pstmt02.setString(12, filter.OPDT);
//            pstmt02.setString(13, filter.OPTM);
//            pstmt02.setString(14, filter.ST);
//            pstmt02.setString(15, filter.CLDT);
//            pstmt02.setString(16, filter.CLTM);
//            pstmt02.setString(17, filter.XTDT);
//            pstmt02.setString(18, filter.XTTM);
//            pstmt02.setInt(19, filter.XTST);
//            pstmt02.setInt(20, filter.VOIDS);
//            pstmt02.setString(21, filter.FTRANS);
//            pstmt02.setInt(22, filter.TTRANS);
//            pstmt02.setString(23, filter.COMENT);
//
//            pstmt02.setString(24, session.getUserView().getUserInfo().USR);
//            pstmt02.setString(25, today.getTime(TimeFormatToday.DATE_YYYYMMDD));
//            pstmt02.setString(26, today.getTime(TimeFormatToday.TIME_HHMMSS));
//            pstmt02.setString(27, workStation.getHostAddress());
//
//            pstmt02.addBatch();
//            pstmt02.executeBatch();
//
//        } finally {
//            if (pstmt02 != null) {
//                pstmt02.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//    }
//
//    public void updatePXF051(PXF051Filter filter) throws SQLException {
//        PreparedStatement pstmt01 = null;
//        String SQLQRY01 = "UPDATE " + session.getMainLibrary() + ".PXF051 SET"
//                + " BSEC = ?, PSTATE = ?, SEQ = ?, STATION = ?, CODE = ?, OPDT = ?, OPTM = ?, ST = ?, "
//                + "CLDT = ?, CLTM = ?, XTDT = ?, XTTM = ?, XTST = ?, VOIDS = ?, FTRANS = ?, TTRANS = ?, MANUP='X', COMENT = ?,"
//                + " USRM = ?, DATM = ?, TIMM = ?, CRTM = ?"
//                + " WHERE CCUST = ? AND WKSTAT = ? AND FREPOR = ? AND SEC = ?";
//
//        session.getCNXIBMDB2().open();
//        try {
//            pstmt01 = session.getCNXIBMDB2().getConnection().prepareStatement(SQLQRY01);
//
//            pstmt01.setInt(1, filter.BSEC);
//            pstmt01.setInt(2, filter.PSTATE);
//            pstmt01.setString(3, filter.SEQ);
//            pstmt01.setString(4, filter.STATION);
//            pstmt01.setString(5, filter.CODE);
//            pstmt01.setString(6, filter.OPDT);
//            pstmt01.setString(7, filter.OPTM);
//            pstmt01.setString(8, filter.ST);
//            pstmt01.setString(9, filter.CLDT);
//            pstmt01.setString(10, filter.CLTM);
//            pstmt01.setString(11, filter.XTDT);
//            pstmt01.setString(12, filter.XTTM);
//            pstmt01.setInt(13, filter.XTST);
//            pstmt01.setInt(14, filter.VOIDS);
//            pstmt01.setString(15, filter.FTRANS);
//            pstmt01.setInt(16, filter.TTRANS);
//            pstmt01.setString(17, filter.COMENT);
//
//            pstmt01.setString(18, session.getUserView().getUserInfo().USR);
//            pstmt01.setString(19, today.getTime(TimeFormatToday.DATE_YYYYMMDD));
//            pstmt01.setString(20, today.getTime(TimeFormatToday.TIME_HHMMSS));
//            pstmt01.setString(21, workStation.getHostAddress());
//
//            pstmt01.setString(22, session.getUserView().getCustomerInfo().CCUST);
//            pstmt01.setString(23, filter.WKSTAT);
//            pstmt01.setString(24, filter.FREPOR);
//            pstmt01.setInt(25, filter.SEC);
//
//            pstmt01.executeUpdate();
//        } finally {
//            if (pstmt01 != null) {
//                pstmt01.close();
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//    }
//
//    public List<PXF700Filter> loadPXF704Transactions(String CCUST, UserView user, BSPF100Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL = null;
//        PXF700Filter beanBsp = null;
//        List<PXF700Filter> listaData = new ArrayList();
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        //filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(4, 6)).replace("00", "");//YY
//        if (filter.yearFrom.trim().length() == 2) {
//            filter.yearFrom = "20" + filter.yearFrom;
//        }
//        if (filter.yearTo.trim().length() == 2) {
//            filter.yearTo = "20" + filter.yearTo;
//        }
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("0", "");
//        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("0", "");
//        //filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(4, 6)).replace("00", "");//YY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("0", "");
//        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("0", "");
//        //</editor-fold>
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX001S13PXF704(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, filter.yearFrom + filter.monthFrom.trim());
//            cs.setString(3, filter.yearTo + filter.monthTo.trim());
//            cs.setString(4, filter.PDAI.trim());
//            cs.setString(5, filter.COUNTRY.trim());
//            cs.setString(6, filter.BSPI.trim());
//            cs.setString(7, filter.FUENTE.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//
//                beanBsp = new PXF700Filter();
//                beanBsp.CCUST = CCUST;
//                beanBsp.HRED = rst.getString("HRED");
//                beanBsp.formatDate = rst.getString("HRED").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("HRED").substring(4, 6));
//                beanBsp.QISSUE = rst.getLong("QISSUE");
//                beanBsp.QADM = rst.getLong("QADM");
//                beanBsp.QREFUND = rst.getLong("QREFUND");
//                beanBsp.QACM = rst.getLong("QACM");
//                beanBsp.QCANC = rst.getLong("QCANC");
//                beanBsp.QCANJ = rst.getLong("QCANJ");
//
//                beanBsp.ISSUE = rst.getDouble("ISSUE");
//                beanBsp.ADM = rst.getDouble("ADM");
//                beanBsp.REFUND = rst.getDouble("REFUND");
//                beanBsp.ACM = rst.getDouble("ACM");
//                beanBsp.CUTP = rst.getString("CUTP").substring(0, 3);
//                beanBsp.FTE = rst.getString("FTE");
//
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public String searchDeliveryRFND(String ccust, UserView user, FACSIMILFilter filter, String fuente) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        String strTEXTO = "", strMES = "01";
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
//                //ARC
//                strSQL = "{CALL " + session.getMainLibrary() + ".PX011S03A1347RFND(?,?)}";
//            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
//                //ASR
//                strSQL = "{CALL " + session.getMainLibrary() + ".PX011S04A1536RFND(?,?,?)}";
//                if (filter.A720GRUPO.trim().substring(2, 4).equals("14")) {
//                    strMES = "13";
//                } else {
//                    strMES = filter.A720GRUPO.trim().substring(4, 6);
//                }
//            } else {
//                //BSP
//                strSQL = "{CALL " + session.getMainLibrary() + ".PX011S02A1348RFND(?,?)}";
//            }
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
//                cs.setString(1, ccust);
//                cs.setString(2, strMES);
//                cs.setString(3, filter.TDNR.trim());
//            } else {
//                cs.setString(1, ccust);
//                cs.setString(2, filter.TDNR.trim());
//            }
//            cs.execute();
//
//            if (fuente.trim().equals("A")) {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
//                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
//                            + rst.getString("TRNN") + rst.getString("TKTN")
//                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
//                }
//            } else {
//                rst = cs.getResultSet();
//                while (rst.next()) {
//                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
//                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
//                            + rst.getString("TRNN") + rst.getString("TDNR")
//                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
//                }
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return strTEXTO;
//    }
//
//    public List<A1569Filter> loadA1569List(String CCUST, UserView user, A1569Filter filter, String option, HashMap hmCiudades) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null, rst2 = null;
//        String strSQL;
//        A1569Filter objeto;
//        List<A1569Filter> listaData = new ArrayList(0);
//        long totQVLO = 0, totQCANC = 0, totQDOC = 0, totQDOCR = 0, totQOAL = 0;
//        long totNPXCL1 = 0, totNPXCL2 = 0, totNPXCL3 = 0, totNPXCL4 = 0, totNPXGRS = 0;
//        String fechaini = "", fechafin = "";
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        //</editor-fold>
//
//        if (option.equals("1")) {
//            fechaini = filter.yearFrom + filter.monthFrom;
//            fechafin = filter.yearTo + filter.monthTo;
//        } else {
//            fechaini = filter.FEVLO;
//            fechafin = filter.FEVLO;
//        }
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX012S01A1569(?,?,?,?,?)}";
//        session.getCNXIBMDB2().open();
//
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, fechaini);
//            cs.setString(3, fechafin);
//            cs.setString(4, Functions.getFechaActual().substring(0, 6));
//            cs.setString(5, option);
//            cs.execute();
//
//            rst2 = cs.getResultSet();
//            if (rst2.next()) {
//                totQVLO = rst2.getLong("QVLO");
//                totQDOC = rst2.getLong("QDOC");
//                totQDOCR = rst2.getLong("QDOCR");
//                totQOAL = rst2.getLong("QOAL");
//
//                totQCANC = rst2.getLong("QCANC");
//                totNPXCL1 = rst2.getLong("NPXCL1");
//                totNPXCL2 = rst2.getLong("NPXCL2");
//                totNPXCL3 = rst2.getLong("NPXCL3");
//                totNPXCL4 = rst2.getLong("NPXCL4");
//                totNPXGRS = rst2.getLong("NPXGRS");
//            }
//            try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                int pos = 0;
//                while (rst.next()) {
//                    pos++;
//                    objeto = new A1569Filter();
//
//                    objeto.contador = pos;
//                    objeto.FEVLO = rst.getString("FEVLO");
//                    if (option.equals("2")) {
//                        objeto.NRVLO = rst.getString("NRVLO");
//                        objeto.ORIGM = rst.getString("ORIGM");
//                        objeto.DESTM = rst.getString("DESTM");
//                        // CIUDAD ======================================================
//                        objeto.ORIGM = rst.getString("ORIGM");
//                        if (hmCiudades.containsKey(objeto.ORIGM.trim())) {
//                            objeto.strOrig = hmCiudades.get(objeto.ORIGM.trim()).toString();
//                        } else {
//                            objeto.strOrig = "(EMPTY)";
//                        }
//                        objeto.DESTM = rst.getString("DESTM");
//                        if (hmCiudades.containsKey(objeto.DESTM.trim())) {
//                            objeto.strDest = hmCiudades.get(objeto.DESTM.trim()).toString();
//                        } else {
//                            objeto.strDest = "(EMPTY)";
//                        }
//                        // =============================================================
//                    }
//                    objeto.strFormatDate = objeto.FEVLO.substring(0, 4) + " " + Functions.getAbreviaturaMes(objeto.FEVLO.substring(4));
//                    objeto.QVLO = rst.getInt("QVLO");
//                    objeto.QDOC = rst.getInt("QDOC");
//                    objeto.QDOCR = rst.getInt("QDOCR");
//                    objeto.QOAL = rst.getInt("QOAL");
//
//                    objeto.QCANC = rst.getInt("QCANC");
//                    objeto.NPXCL1 = rst.getInt("NPXCL1");
//                    objeto.NPXCL2 = rst.getInt("NPXCL2");
//                    objeto.NPXCL3 = rst.getInt("NPXCL3");
//                    objeto.NPXCL4 = rst.getInt("NPXCL4");
//                    objeto.NPXGRS = rst.getInt("NPXGRS");
//
//                    objeto.totQVLO = totQVLO;
//                    objeto.totQDOC = totQDOC;
//                    objeto.totQDOCR = totQDOCR;
//                    objeto.totQOAL = totQOAL;
//
//                    objeto.totQCANC = totQCANC;
//                    objeto.totNPXCL1 = totNPXCL1;
//                    objeto.totNPXCL2 = totNPXCL2;
//                    objeto.totNPXCL3 = totNPXCL3;
//                    objeto.totNPXCL4 = totNPXCL4;
//                    objeto.totNPXGRS = totNPXGRS;
//                    listaData.add(objeto);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (rst2 != null) {
//                try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<A1569Filter> loadA1568ListTotales(String CCUST, UserView user, A1569Filter filter) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null, rst2 = null;
//        String strSQL;
//        A1569Filter objeto;
//        List<A1569Filter> listaData = new ArrayList(0);
//        long totQDOC = 0, totQDOCR = 0, totQOAL = 0, totQFIM = 0, totQCUPOW = 0, totQCUPOAL = 0;
//        long totNPXCL1 = 0, totNPXCL2 = 0, totNPXCL3 = 0, totNPXCL4 = 0, totNPXGRS = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        //</editor-fold>
//
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX012S04A1568(?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, filter.FEVLO);
//            cs.setString(3, filter.NRVLO);
//            cs.execute();
//
//            rst2 = cs.getResultSet();
//            if (rst2.next()) {
//                totQDOC = rst2.getLong("QDOC");
//                totQDOCR = rst2.getLong("QDOCR");
//                totQOAL = rst2.getLong("QOAL");
//                totQFIM = rst2.getLong("QFIM");
//                totQCUPOW = rst2.getLong("QCUPOW");
//                totQCUPOAL = rst2.getLong("QCUPOAL");
//
//                totNPXCL1 = rst2.getLong("NPXCL1");
//                totNPXCL2 = rst2.getLong("NPXCL2");
//                totNPXCL3 = rst2.getLong("NPXCL3");
//                totNPXCL4 = rst2.getLong("NPXCL4");
//                totNPXGRS = rst2.getLong("NPXGRS");
//            }
//            try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                int pos = 0;
//                while (rst.next()) {
//                    pos++;
//                    objeto = new A1569Filter();
//                    objeto.contador = pos;
//                    objeto.FEVLO = rst.getString("FEVLO");
//                    objeto.strFormatDate1 = filter.strFormatDate;
//                    objeto.strFormatDate = objeto.FEVLO.substring(0, 4) + " " + Functions.getAbreviaturaMes(objeto.FEVLO.substring(4, 6)) + " " + objeto.FEVLO.substring(6);
//                    objeto.NRVLO = rst.getString("NRVLO");
//                    objeto.QDOC = rst.getInt("QDOC");
//                    objeto.QDOCR = rst.getInt("QDOCR");
//                    objeto.QOAL = rst.getInt("QOAL");
//                    objeto.QFIM = rst.getInt("QFIM");
//                    objeto.QCUPOW = rst.getInt("QCUPOW");
//                    objeto.QCUPOAL = rst.getInt("QCUPOAL");
//
//                    objeto.NPXCL1 = rst.getInt("NPXCL1");
//                    objeto.NPXCL2 = rst.getInt("NPXCL2");
//                    objeto.NPXCL3 = rst.getInt("NPXCL3");
//                    objeto.NPXCL4 = rst.getInt("NPXCL4");
//                    objeto.NPXGRS = rst.getInt("NPXGRS");
//
//                    objeto.totQDOC = totQDOC;
//                    objeto.totQDOCR = totQDOCR;
//                    objeto.totQOAL = totQOAL;
//                    objeto.totQFIM = totQFIM;
//                    objeto.totQCUPOW = totQCUPOW;
//                    objeto.totQCUPOAL = totQCUPOAL;
//
//                    objeto.totNPXCL1 = totNPXCL1;
//                    objeto.totNPXCL2 = totNPXCL2;
//                    objeto.totNPXCL3 = totNPXCL3;
//                    objeto.totNPXCL4 = totNPXCL4;
//                    objeto.totNPXGRS = totNPXGRS;
//
//                    objeto.totCABIN = objeto.NPXGRS + objeto.NPXCL4 + objeto.NPXCL2;
//
//                    listaData.add(objeto);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (rst2 != null) {
//                try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<A1569Filter> loadA1568List(String CCUST, UserView user, A1569Filter filter, HashMap hmCiudades, HashMap hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null, rst2 = null;
//        String strSQL;
//        A1569Filter objeto;
//        List<A1569Filter> listaData = new ArrayList(0);
//        long totQDOC = 0, totQDOCR = 0, totQOAL = 0, totQFIM = 0, totQCUPOW = 0, totQCUPOAL = 0;
//        long totNPXCL1 = 0, totNPXCL2 = 0, totNPXCL3 = 0, totNPXCL4 = 0, totNPXGRS = 0;
//
//        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//        //</editor-fold>
//
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX012S02A1568(?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, CCUST);
//            cs.setString(2, filter.FEVLO);
//            cs.setString(3, filter.NRVLO);
//            cs.execute();
//
//            rst2 = cs.getResultSet();
//            if (rst2.next()) {
//                totQDOC = rst2.getLong("QDOC");
//                totQDOCR = rst2.getLong("QDOCR");
//                totQOAL = rst2.getLong("QOAL");
//                totQFIM = rst2.getLong("QFIM");
//                totQCUPOW = rst2.getLong("QCUPOW");
//                totQCUPOAL = rst2.getLong("QCUPOAL");
//
//                totNPXCL1 = rst2.getLong("NPXCL1");
//                totNPXCL2 = rst2.getLong("NPXCL2");
//                totNPXCL3 = rst2.getLong("NPXCL3");
//                totNPXCL4 = rst2.getLong("NPXCL4");
//                totNPXGRS = rst2.getLong("NPXGRS");
//            }
//            try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            if (cs.getMoreResults()) {
//                rst = cs.getResultSet();
//                int pos = 0;
//                while (rst.next()) {
//                    pos++;
//                    objeto = new A1569Filter();
//
//                    objeto.contador = pos;
//                    objeto.FEVLO = filter.FEVLO;
//                    objeto.strFormatDate1 = filter.strFormatDate;
//                    objeto.strFormatDate = rst.getString("FEVLO").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("FEVLO").substring(4, 6)) + " " + rst.getString("FEVLO").substring(6);
//                    objeto.NRVLO = rst.getString("NRVLO");
//                    objeto.DESTM = rst.getString("DESTM");
//                    objeto.QDOC = rst.getInt("QDOC");
//                    objeto.QDOCR = rst.getInt("QDOCR");
//                    objeto.QOAL = rst.getInt("QOAL");
//                    objeto.QFIM = rst.getInt("QFIM");
//                    objeto.QCUPOW = rst.getInt("QCUPOW");
//                    objeto.QCUPOAL = rst.getInt("QCUPOAL");
//
//                    objeto.NPXCL1 = rst.getInt("NPXCL1");
//                    objeto.NPXCL2 = rst.getInt("NPXCL2");
//                    objeto.NPXCL3 = rst.getInt("NPXCL3");
//                    objeto.NPXCL4 = rst.getInt("NPXCL4");
//                    objeto.NPXGRS = rst.getInt("NPXGRS");
//
//                    // PAIS ========================================================
//                    objeto.PSUSO = rst.getString("PSUSO");
//                    if (hmPaises.containsKey(objeto.PSUSO)) {
//                        objeto.strPais = hmPaises.get(objeto.PSUSO.trim()).toString();
//                    } else {
//                        objeto.PSUSO = "(EMPTY)";
//                    }
//                    // CIUDAD ======================================================
//                    objeto.ORIGM = rst.getString("ORIGM");
//                    if (hmCiudades.containsKey(objeto.ORIGM.trim())) {
//                        objeto.strOrig = hmCiudades.get(objeto.ORIGM.trim()).toString();
//                    } else {
//                        objeto.strOrig = "(EMPTY)";
//                    }
//                    objeto.DESTM = rst.getString("DESTM");
//                    if (hmCiudades.containsKey(objeto.DESTM.trim())) {
//                        objeto.strDest = hmCiudades.get(objeto.DESTM.trim()).toString();
//                    } else {
//                        objeto.strDest = "(EMPTY)";
//                    }
//                    // =============================================================
//
//                    objeto.totQDOC = totQDOC;
//                    objeto.totQDOCR = totQDOCR;
//                    objeto.totQOAL = totQOAL;
//                    objeto.totQFIM = totQFIM;
//                    objeto.totQCUPOW = totQCUPOW;
//                    objeto.totQCUPOAL = totQCUPOAL;
//
//                    objeto.totNPXCL1 = totNPXCL1;
//                    objeto.totNPXCL2 = totNPXCL2;
//                    objeto.totNPXCL3 = totNPXCL3;
//                    objeto.totNPXCL4 = totNPXCL4;
//                    objeto.totNPXGRS = totNPXGRS;
//
//                    listaData.add(objeto);
//                }
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (rst2 != null) {
//                try { rst2.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public int maintance(String strOption, A1569Filter bn, String CCUST, UserView user) throws SQLException {
//
//        int result = -1;
//
//        CallableStatement cs = null;
//        String strSQL;
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX012S03A1568(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, strOption);
//            cs.setString(2, bn.FEVLO);
//            cs.setString(3, bn.NRVLO);
//            cs.setString(4, bn.PSUSO);
//            cs.setString(5, bn.ORIGM);
//            cs.setString(6, bn.DESTM);
//            cs.setInt(7, bn.QDOC);
//            cs.setInt(8, bn.QOAL);
//            cs.setString(9, Functions.getFechaActual());
//            cs.setString(10, Functions.getHoraActual());
//            cs.setString(11, user.getUserInfo().USR);
//            cs.setString(12, CCUST);
//
//            cs.execute();
//
//            result = cs.executeUpdate(strSQL);
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//
//        return result;
//    }
//
//    public List<BSPF110Filter> loadControlSales(String ccust, UserView user, BSPF110Filter filter,
//            HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        BSPF110Filter beanBsp;
//        List<BSPF110Filter> listaData = new ArrayList();
//        String strHRED = "", strPRDA = "", strFECR = "", strPBAED = "";
//        String strHOCR = "", strTTIME = "";
//
//        if (filter.strTipoFecha.trim().equals("HRED")) {
//
//            // <editor-fold defaultstate="collapsed" desc=" 'DATE HRED' ">
//            filter.yearFrom = Functions.fillZeros(2, filter.yearFrom.substring(2, 4)).replace("00", "");//YY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(2, filter.yearTo.substring(2, 4)).replace("00", "");//YY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//            //</editor-fold>
//
//        } else {
//
//            // <editor-fold defaultstate="collapsed" desc=" 'DATE FECR' ">
//            filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
//            filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//            filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
//            filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
//            filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
//            filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
//            //</editor-fold>
//
//        }
//
//        session.getCNXIBMDB2().open();
//
//        try {
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX006S01BSPF110(?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, ccust);
//            cs.setString(2, filter.strTipoFecha);
//            cs.setString(3, filter.yearFrom + filter.monthFrom);
//            cs.setString(4, filter.yearTo + filter.monthTo);
//            cs.setString(5, filter.ISOC.trim());
//            cs.setString(6, filter.filtro.trim());
//            cs.setString(7, filter.check.trim());
//            cs.execute();
//
//            rst = cs.getResultSet();
//            int pos = 0;
//
//            while (rst.next()) {
//                pos++;
//                beanBsp = new BSPF110Filter();
//                beanBsp.CCUST = rst.getString("CCUST");
//                beanBsp.ISOC = rst.getString("ISOC");
//                beanBsp.FUENTE = rst.getString("FUENTE");
//                beanBsp.USCR = rst.getString("USCR");
//                beanBsp.FECR = rst.getString("FECR");
//                beanBsp.HOCR = rst.getString("HOCR");
//                beanBsp.DYRI = rst.getString("DYRI");
//                beanBsp.FSQN = rst.getInt("FSQN");
//                beanBsp.BSPI = rst.getString("BSPI");
//                if (filter.check.equals("BSPF110")) {
//                    beanBsp.QRECOR = rst.getInt("QRECOR");
//                    beanBsp.MENSA = rst.getString("MENSA");
//                } else {
//                    beanBsp.QRECOR = rst.getInt("QREG");
//                }
//                //Nombre Pais ==================================================
//                try {
//                    if (hmPaises.containsKey(beanBsp.ISOC)) {
//                        beanBsp.tooltippais = beanBsp.ISOC + " - " + hmPaises.get(beanBsp.ISOC).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.tooltippais = beanBsp.ISOC;
//                }
//                //Nombre Ciudad ================================================
//                try {
//                    if (hmCiudades.containsKey(beanBsp.BSPI)) {
//                        beanBsp.tooltipciudad = beanBsp.BSPI + " - " + hmCiudades.get(beanBsp.BSPI).toString();
//                    }
//                } catch (Exception e) {
//                    beanBsp.tooltipciudad = beanBsp.BSPI;
//                }
//                //Formato Fecha de Reporte =====================================
//                strHRED = "20" + Functions.fillString(rst.getString("HRED"), 6);
//                beanBsp.HREDSring = "20" + strHRED.substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(strHRED.substring(2, 4)) + " "
//                        + strHRED.substring(4, 6);
//                //Formato Fecha de Proceso =====================================
//                strPRDA = "20" + Functions.fillString(rst.getString("PRDA"), 6);
//                beanBsp.PRDA = "20" + strPRDA.substring(0, 2) + " "
//                        + Functions.getAbreviaturaMes(strPRDA.substring(2, 4)) + " "
//                        + strPRDA.substring(4, 6);
//                //Formato Fecha de Facturación =================================
//                strPBAED = Functions.fillString(rst.getString("PBAED"), 8);
//                beanBsp.PBAED = strPBAED.substring(0, 4) + " "
//                        + Functions.getAbreviaturaMes(strPBAED.substring(4, 6)) + " "
//                        + strPBAED.substring(6, 8);
//                //Formato Fecha de Creación ====================================
//                strFECR = Functions.fillString(rst.getString("FECR"), 8);
//                beanBsp.FECRf = strFECR.substring(0, 4) + " "
//                        + Functions.getAbreviaturaMes(strFECR.substring(4, 6)) + " "
//                        + strFECR.substring(6, 8);
//                //Formato Hora de Creación =====================================
//                strHOCR = Functions.fillString(rst.getString("HOCR"), 6);
//                beanBsp.HOCRf = strHOCR.substring(0, 2) + ":" + strHOCR.substring(2, 4) + ":"
//                        + strHOCR.substring(4, 6);
//                //Formato Hora de Proceso ======================================
//                strTTIME = Functions.fillString(rst.getString("TTIME"), 4);
//                beanBsp.TTIME = strTTIME.substring(0, 2) + ":"
//                        + strTTIME.substring(2, 4);
//
//                beanBsp.contador = pos;
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<BSPF99Filter> loadBSPF99(BSPF99Filter filter) throws SQLException {
//        Statement stmt = null;
//        ResultSet rst = null;
//        BSPF99Filter file;
//        List<BSPF99Filter> lstData = new ArrayList<BSPF99Filter>(0);
//        String SQLWRE = "", SQLWRE_COLUMN = "", SQLWRE_DATE_FROM = "", SQLWRE_DATE_TO = "";
//        boolean bolWhereDate = false, bolWhereDateBewteen = false;
//
//        String SQLQRY = "SELECT CCUST, NAID, ISOC, HRED, PRDA, PDAI, PBAED,"
//                + "SMSG, SQNR, STNQ, BSPI, RESD1, OFCC, GROS, TREM, TCOM, TTMF,"
//                + "TLRP, RESD2, TTCA, CUTP, RESD3, "
//                + "USCR, FECR, HOCR, USUP, FEUP, HOUP FROM " + session.getMainLibrary() + ".BSPF99 "
//                + "WHERE CCUST = '" + session.getUserView().getCustomerInfo().CCUST + "'";
//
//        if (filter.filterType.equals("HRED")) {
//            if (!filter.yearFrom.equals("0000") || !filter.monthFrom.equals("00") || !filter.dayFrom.equals("00")
//                    || !filter.yearTo.equals("0000") || !filter.monthTo.equals("00") || !filter.dayTo.equals("00")) {
//                bolWhereDate = true;
//                if (filter.yearFrom.equals(filter.yearTo) && filter.monthFrom.equals(filter.monthTo) && filter.dayFrom.equals(filter.dayTo)) {
//                    if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && !filter.dayFrom.equals("00")) {           //YYYYMMDD
//                        SQLWRE_COLUMN = "HRED";
//                        SQLWRE_DATE_FROM = filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom;
//                    } else if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {     //YYYYMM
//                        SQLWRE_COLUMN = "SUBSTRING(HRED, 1, 4)";
//                        SQLWRE_DATE_FROM = filter.yearFrom.substring(2, 4) + filter.monthFrom;
//                    } else if (!filter.yearFrom.equals("0000") && filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //YYYY
//                        SQLWRE_COLUMN = "SUBSTRING(HRED, 1, 2)";
//                        SQLWRE_DATE_FROM = filter.yearFrom.substring(2, 4);
//                    } else if (!filter.yearFrom.equals("0000") && filter.monthFrom.equals("00") && !filter.dayFrom.equals("00")) {      //YYYYDD
//                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(HRED, 1, 2), SUBSTRING(HRED, 4, 6))";
//                        SQLWRE_DATE_FROM = filter.yearFrom.substring(2, 4) + filter.dayFrom;
//                    } else if (filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && !filter.dayFrom.equals("00")) {      //MMDD
//                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(HRED, 2, 4), SUBSTRING(HRED, 4, 6))";
//                        SQLWRE_DATE_FROM = filter.monthFrom + filter.dayFrom;
//                    }
//                } else {
//                    bolWhereDateBewteen = true;
//                    SQLWRE_COLUMN = "HRED";
//                    SQLWRE_DATE_FROM = filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom;
//                    SQLWRE_DATE_TO = ((filter.yearTo.equals("0000")) ? "99" : filter.yearTo.substring(2, 4)) + ((filter.monthTo.equals("00")) ? "12" : filter.monthTo) + ((filter.dayTo.equals("00")) ? "31" : filter.dayTo);
//                }
//            }
//            if (bolWhereDate) {
//                if (bolWhereDateBewteen) {
//                    SQLWRE += " AND " + SQLWRE_COLUMN + " BETWEEN '" + SQLWRE_DATE_FROM + "' AND '" + SQLWRE_DATE_TO + "'";
//                } else {
//                    SQLWRE += " AND " + SQLWRE_COLUMN + " = '" + SQLWRE_DATE_FROM + "'";
//                }
//            }
//            if (!filter.ISOC.isEmpty()) {
//                SQLWRE += " AND ISOC = '" + filter.ISOC + "'";
//            }
//            if (!filter.BSPI.isEmpty()) {
//                SQLWRE += " AND BSPI = '" + filter.BSPI + "'";
//            }
//        }
//
//        SQLQRY += SQLWRE;
//        SQLQRY += " ORDER BY HRED DESC, BSPI ASC, STNQ DESC, NAID ASC";
//
//        session.getCNXIBMDB2().open();
//        try {
//            stmt = session.getCNXIBMDB2().getConnection().createStatement();
//            rst = stmt.executeQuery(SQLQRY);
//            while (rst.next()) {
//                file = new BSPF99Filter();
//                file.CCUST = rst.getString("CCUST");
//                file.NAID = rst.getInt("NAID");
//                file.ISOC = rst.getString("ISOC");
//                file.HRED = rst.getInt("HRED");
//                file.PRDA = rst.getInt("PRDA");
//                file.PDAI = rst.getString("PDAI");
//                file.PBAED = rst.getString("PBAED");
//                file.SMSG = rst.getString("SMSG");
//                file.SQNR = rst.getInt("SQNR");
//                file.STNQ = rst.getInt("STNQ");
//                file.BSPI = rst.getString("BSPI");
//                file.RESD1 = rst.getString("RESD1");
//                file.OFCC = rst.getString("OFCC");
//                file.GROS = rst.getDouble("GROS");
//                file.TREM = rst.getDouble("TREM");
//                file.TCOM = rst.getDouble("TCOM");
//                file.TTMF = rst.getDouble("TTMF");
//                file.TLRP = rst.getDouble("TLRP");
//                file.RESD2 = rst.getString("RESD2");
//                file.TTCA = rst.getDouble("TTCA");
//                file.CUTP = rst.getString("CUTP");
//                file.RESD3 = rst.getString("RESD3");
//                //file.DIRY = rst.getString("DIRY");
//                file.USCR = rst.getString("USCR");
//                file.FECR = rst.getString("FECR");
//                file.HOCR = rst.getString("HOCR");
//                file.USUP = rst.getString("USUP");
//                file.FEUP = rst.getString("FEUP");
//                file.HOUP = rst.getString("HOUP");
//
//                file.HRED_FORMATED = Integer.toString(rst.getInt("HRED"));
//                file.HRED_FORMATED = file.HRED_FORMATED.substring(2, 4) + "/" + file.HRED_FORMATED.substring(4, 6) + "/" + "20" + file.HRED_FORMATED.substring(0, 2);
//
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            file = null;
//            SQLWRE = null;
//            SQLWRE_COLUMN = null;
//            SQLWRE_DATE_FROM = null;
//            SQLWRE_DATE_TO = null;
//            SQLQRY = null;
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (stmt != null) {
//                stmt.close();
//                stmt = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1655Filter> loadA1655(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1655Filter file;
//        List<A1655Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S02A1655(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.SELECT_BY);
//            cs.setString(6, filter.CUTP);
//            cs.setString(7, filter.FTE);
//            cs.setInt(8, filter.TOP);
//            cs.setString(9, filter.ISOC);
//            cs.setString(10, filter.TDOC);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1655Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.AUD01 = rst.getString("AUD01");
//                file.ADM01 = rst.getString("ADM01");
//                file.AUD02 = rst.getString("AUD02");
//                file.ADM02 = rst.getString("ADM02");
//                file.AUD03 = rst.getString("AUD03");
//                file.ADM03 = rst.getString("ADM03");
//                file.AUD04 = rst.getString("AUD04");
//                file.ADM04 = rst.getString("ADM04");
//                file.AUD05 = rst.getString("AUD05");
//                file.ADM05 = rst.getString("ADM05");
//                file.TDOCS = rst.getString("TDOCS");
//                file.TAUD = rst.getString("TAUD");
//                file.TPRV = rst.getString("TPRV");
//                file.TADM = rst.getString("TADM");
//                file.TPDT = rst.getString("TPDT");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1655Filter> loadA1655ByMonth(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1655Filter file;
//        List<A1655Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S03A1655(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.CUTP);
//            cs.setString(6, filter.FTE);
//            cs.setInt(7, filter.TOP);
//            cs.setString(8, filter.ISOC);
//            cs.setString(9, filter.TDOC);
//            cs.setString(10, filter.DSALES);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1655Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.TDOC = filter.TDOC;
//                file.TDOC_02 = rst.getString("TDOC");
//                file.CUTP = rst.getString("CUTP");
//                file.TDOCS = Integer.toString(rst.getInt("QTKT"));
//                file.TAUD = Integer.toString(rst.getInt("QAUDI"));
//                file.TPRV = Integer.toString(rst.getInt("PER_AUD"));
//                file.TADM = Integer.toString(rst.getInt("ADM"));
//                file.AMT_TOTAL = rst.getDouble("AMT_TOTAL");
//                file.AMT_AUDITED = rst.getDouble("AMT_AUDITED");
//                file.AMT_DEBITED = rst.getDouble("AMT_DEBITED");
//                file.PER_REC = Double.toString(rst.getDouble("PER_REC"));
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1655Filter> loadA1655ByTypeOfDocument(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1655Filter file;
//        List<A1655Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S04A1655(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.CUTP);
//            cs.setString(6, filter.FTE);
//            cs.setInt(7, filter.TOP);
//            cs.setString(8, filter.ISOC);
//            cs.setString(9, filter.TDOC);
//            cs.setString(10, filter.DSALES);
//            cs.setString(11, filter.TDOC_02);
//            cs.setString(12, filter.CUTP_02);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1655Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.FTE = rst.getString("FTE");
//                file.ISOC = rst.getString("ISOC");
//                file.COUNTRY_NAME = rst.getString("COUNTRY_NAME");
//                file.TDOC = filter.TDOC;
//                file.TDOC_02 = rst.getString("TDOC");
//                file.CUTP = filter.CUTP_02;
//                file.CUTP_02 = rst.getString("CUTP");
//                file.TDOCS = Integer.toString(rst.getInt("QTKT"));
//                file.TAUD = Integer.toString(rst.getInt("QAUDI"));
//                file.TPRV = Integer.toString(rst.getInt("PER_AUD"));
//                file.TADM = Integer.toString(rst.getInt("ADM"));
//                file.AMT_SALES_FARES = rst.getDouble("AMT_SALES_FARES");
//                file.AMT_SALES_COMIS = rst.getDouble("AMT_SALES_COMIS");
//                file.AMT_SALES_TAXS = rst.getDouble("AMT_SALES_TAXS");
//                file.AMT_SALES_NET = rst.getDouble("AMT_SALES_NET");
//                file.AMT_DEBITED_FARED = rst.getDouble("AMT_DEBITED_FARED");
//                file.AMT_DEBITED_COMID = rst.getDouble("AMT_DEBITED_COMID");
//                file.AMT_DEBITED_TAXD = rst.getDouble("AMT_DEBITED_TAXD");
//                file.AMT_DEBITED_NET = rst.getDouble("AMT_DEBITED_NET");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1655Filter> loadA1655BySalesSource(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1655Filter file;
//        List<A1655Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S05A1580(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.CUTP);
//            cs.setString(6, filter.FTE);
//            cs.setInt(7, filter.TOP);
//            cs.setString(8, filter.ISOC);
//            cs.setString(9, filter.TDOC);
//            cs.setString(10, filter.DSALES);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1655Filter();
//                file.CCUST = session.getUserView().getCustomerInfo().CCUST;
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.FTE = rst.getString("FTE");
//                file.ISOC = rst.getString("ISOC");
//                file.TDOC = filter.TDOC;
//                file.CUTP = filter.CUTP;
//                file.AGENT = rst.getString("AGENT");
//                file.CCIA = rst.getString("CIA");
//                file.TKT_FORMSER = rst.getString("TKT_FORMSER");
//                file.ADM_IND = rst.getString("ADM_IND");
//                file.ADM_NR = rst.getString("ADM_NR");
//                file.CAT_VIOLATION = rst.getString("CAT_VIOLATION");
//                file.AMT_SALES_FARES = rst.getDouble("AMT_SALES_FARES");
//                file.AMT_SALES_COMIS = rst.getDouble("AMT_SALES_COMIS");
//                file.AMT_SALES_TAXS = rst.getDouble("AMT_SALES_TAXS");
//                file.AMT_SALES_NET = rst.getDouble("AMT_SALES_NET");
//                file.AMT_DEBITED_FARED = rst.getDouble("AMT_DEBITED_FARED");
//                file.AMT_DEBITED_COMID = rst.getDouble("AMT_DEBITED_COMID");
//                file.AMT_DEBITED_TAXD = rst.getDouble("AMT_DEBITED_TAXD");
//                file.AMT_DEBITED_NET = rst.getDouble("AMT_DEBITED_NET");
//                file.SENT_DATE = rst.getString("SENT_DATE");
//                file.CLOSED_DATE = rst.getString("CLOSED_DATE");
//                file.GROUP_NR = rst.getString("GROUP_NR");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1656Filter> loadA1656BySalesDate(A1656Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1656Filter file;
//        List<A1656Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S06A1656(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.SELECT_BY);
//            cs.setString(6, filter.CUTP);
//            cs.setString(7, filter.FTE);
//            cs.setInt(8, filter.TOP);
//            cs.setString(9, filter.ISOC);
//            cs.setString(10, filter.TDOC);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1656Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.CUTP = rst.getString("CUTP");
//                file.QTKT = rst.getInt("QTKT");
//                file.QAUDI = rst.getInt("QAUDI");
//                file.PER_AUD = Double.toString(rst.getDouble("PER_AUD"));
//                file.QADM = rst.getInt("QADM");
//                file.FAREAD = rst.getDouble("FAREAD");
//                file.TAXAD = rst.getDouble("TAXAD");
//                file.COMISAD = rst.getDouble("COMISAD");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1656Filter> loadA1656ByFareType(A1656Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1656Filter file;
//        List<A1656Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S07A1656(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.SELECT_BY);
//            cs.setString(6, filter.CUTP);
//            cs.setString(7, filter.FTE);
//            cs.setInt(8, filter.TOP);
//            cs.setString(9, filter.ISOC);
//            cs.setString(10, filter.TDOC);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1656Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.CUTP = rst.getString("CUTP");
//                file.QPRIV = rst.getInt("QPRIV");
//                file.QPUB = rst.getInt("QPUB");
//                file.QITS = rst.getInt("QITS");
//                file.FAREPU = rst.getDouble("FAREPU");
//                file.FAREPR = rst.getDouble("FAREPR");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1656Filter> loadA1656BySalesDate02(A1656Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1656Filter file;
//        List<A1656Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S08A1656(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.SELECT_BY);
//            cs.setString(6, filter.CUTP);
//            cs.setString(7, filter.FTE);
//            cs.setInt(8, filter.TOP);
//            cs.setString(9, filter.ISOC);
//            cs.setString(10, filter.TDOC);
//            cs.setString(11, filter.DSALES_02);
//            cs.setString(12, filter.CUTP_02);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1656Filter();
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.CUTP = rst.getString("CUTP");
//                file.ISOC = rst.getString("ISOC");
//                file.COUNTRY_NAME = rst.getString("COUNTRY_NAME");
//                file.QTKT = rst.getInt("QTKT");
//                file.QAUDI = rst.getInt("QAUDI");
//                file.PER_AUD = Double.toString(rst.getDouble("PER_AUD"));
//                file.QADM = rst.getInt("QADM");
//                file.FAREAD = rst.getDouble("FAREAD");
//                file.TAXAD = rst.getDouble("TAXAD");
//                file.COMISAD = rst.getDouble("COMISAD");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1655Filter> loadA1655ByCountry(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1655Filter file;
//        List<A1655Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S05A1580(?,?,?,?,?,?,?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, filter.filterType);
//            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(3, filter.dateFrom);
//            cs.setString(4, filter.dateTo);
//            cs.setString(5, filter.CUTP);
//            cs.setString(6, filter.FTE);
//            cs.setInt(7, filter.TOP);
//            cs.setString(8, filter.ISOC);
//            cs.setString(9, filter.TDOC);
//            cs.setString(10, filter.DSALES);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1655Filter();
//                file.CCUST = session.getUserView().getCustomerInfo().CCUST;
//                file.filterType = filter.filterType;
//                file.dateFrom = filter.dateFrom;
//                file.dateTo = filter.dateTo;
//                file.DSALES = rst.getString("DTE");
//                file.FTE = rst.getString("FTE");
//                file.ISOC = rst.getString("ISOC");
//                file.TDOC = filter.TDOC;
//                file.TDOC_02 = rst.getString("TDOC");
//                file.CUTP = filter.CUTP;
//                file.AGENT = rst.getString("AGENT");
//                file.CCIA = rst.getString("CIA");
//                file.TKT_FORMSER = rst.getString("TKT_FORMSER");
//                file.ADM_IND = rst.getString("ADM_IND");
//                file.ADM_NR = rst.getString("ADM_NR");
//                file.CAT_VIOLATION = rst.getString("CAT_VIOLATION");
//                file.AMT_SALES_FARES = rst.getDouble("AMT_SALES_FARES");
//                file.AMT_SALES_COMIS = rst.getDouble("AMT_SALES_COMIS");
//                file.AMT_SALES_TAXS = rst.getDouble("AMT_SALES_TAXS");
//                file.AMT_SALES_NET = rst.getDouble("AMT_SALES_NET");
//                file.AMT_DEBITED_FARED = rst.getDouble("AMT_DEBITED_FARED");
//                file.AMT_DEBITED_COMID = rst.getDouble("AMT_DEBITED_COMID");
//                file.AMT_DEBITED_TAXD = rst.getDouble("AMT_DEBITED_TAXD");
//                file.AMT_DEBITED_NET = rst.getDouble("AMT_DEBITED_NET");
//                file.SENT_DATE = rst.getString("SENT_DATE");
//                file.CLOSED_DATE = rst.getString("CLOSED_DATE");
//                file.GROUP_NR = rst.getString("GROUP_NR");
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<A1672Filter> loadDetailByTicket(A1655Filter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1672Filter file;
//        List<A1672Filter> lstData = new ArrayList();
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX0092S09A1672(?,?,?,?)}";
//
//        session.getCNXIBMDB2().open();
//        try {
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cs.setString(2, filter.TKT_FORMSER);
//            cs.setString(3, filter.AGENT);
//            cs.setString(4, filter.ADM_NR);
//            cs.execute();
//
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                file = new A1672Filter();
//                file.A1672CCUST = session.getUserView().getCustomerInfo().CCUST;
//                file.A1672AGENT = rst.getString("A1672AGENT").trim();
//                file.A1672PAIVT = rst.getString("A1672PAIVT").trim();
//                file.A1672FVENT = rst.getString("A1672FVENT").trim();
//                if (rst.getString("A1672FVENT").trim().length() == 8) {
//                    file.ULT_DATE = rst.getString("A1672FVENT").trim().substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A1672FVENT").trim().substring(4, 6)) + " " + rst.getString("A1672FVENT").trim().substring(6, 8);
//                }
//                file.strTicket = rst.getString("A1672CIA").trim() + " " + rst.getString("A1672FORMA").trim() + rst.getString("A1672SERIE").trim();
//                file.A1672CIA = rst.getString("A1672CIA").trim();
//                file.A1672FORMA = rst.getString("A1672FORMA").trim();
//                file.A1672SERIE = rst.getString("A1672SERIE").trim();
//                file.A1672MNADM = rst.getString("A1672MNADM").trim();
//                file.A1672TTMIA = rst.getDouble("TTMIA");
//                file.A1672TTAGT = rst.getDouble("TTAGT");
//                file.A1672TTDIF = rst.getDouble("TTDIF");
//                file.A1672CODIT = rst.getString("A1672CODIT").trim();
//                file.A1672FLADM = rst.getString("A1672FLADM").trim();
//                file.A1672NRADM = rst.getString("A1672NRADM").trim();
//                file.A1672FEADM = rst.getString("A1672FEADM").trim();
//                file.A1672ORIG = rst.getString("A1672ORIG").trim();
//                file.A1672ORIG = rst.getString("A1672ORIG").trim();
//                lstData.add(file);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                rst = null;
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                cs = null;
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return lstData;
//    }
//
//    public List<PA_GET_COEFICIENTEFilter> loadPA_GET_COEFICIENTE(PA_GET_COEFICIENTEFilter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL = null;
//        PA_GET_COEFICIENTEFilter beanBsp = null;
//        List<PA_GET_COEFICIENTEFilter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL PRIVATFARE.PA_GET_COEFICIENTE(?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, filter.VP_TIPOCONS);
//            cs.setString(2, filter.VP_ORIGEN);
//            cs.setString(3, filter.VP_DESTINO);
//            cs.setString(4, filter.VP_FECHAVENTADESDE);
//            cs.setString(5, filter.VP_FECHAVENTAHASTA);
//            cs.setString(6, filter.VP_FAREBASIS);
//            cs.setString(7, filter.VP_ORDERBY);
//            cs.setString(8, filter.VP_ORDERDIR);
//            cs.setInt(9, filter.NPAGINA);
//            cs.setInt(10, filter.TPAGINA);
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//                beanBsp = new PA_GET_COEFICIENTEFilter();
//                beanBsp.ROWNUM = rst.getInt("ROWNUM");
//                beanBsp.RUTA = rst.getString("RUTA");
//                beanBsp.FACTOR = rst.getDouble("FACTOR");
//                beanBsp.FAREAMOUNT = rst.getDouble("FAREAMOUNT");
//                beanBsp.MONEDA = rst.getString("MONEDA");
//                beanBsp.FAREBASIS = rst.getString("FAREBASIS");
//                beanBsp.COEF = rst.getDouble("COEF");
//                beanBsp.QTYTKT = rst.getInt("QTYTKT");
//                beanBsp.TOTPAG = rst.getInt("TOTPAG");
//                beanBsp.TOTALPAGINA = rst.getInt("TOTALPAGINA");
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<PA_GET_COEFICIENTEFilter> load2PA_GET_COEFICIENTE(PA_GET_COEFICIENTEFilter filter) throws SQLException {
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL = null;
//        PA_GET_COEFICIENTEFilter beanBsp = null;
//        List<PA_GET_COEFICIENTEFilter> listaData = new ArrayList();
//
//        session.getCNXIBMDB2().open();
//        try {
//
//            strSQL = "{CALL PRIVATFARE.PA_GET_COEFICIENTE(?,?,?,?,?,?,?,?,?,?)}";
//
//            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
//
//            cs.setString(1, filter.VP_TIPOCONS);
//            cs.setString(2, filter.VP_ORIGEN);
//            cs.setString(3, filter.VP_DESTINO);
//            cs.setString(4, filter.VP_FECHAVENTADESDE);
//            cs.setString(5, filter.VP_FECHAVENTAHASTA);
//            cs.setString(6, filter.VP_FAREBASIS);
//            cs.setString(7, filter.VP_ORDERBY);
//            cs.setString(8, filter.VP_ORDERDIR);
//            cs.setInt(9, filter.NPAGINA);
//            cs.setInt(10, filter.TPAGINA);
//            cs.execute();
//
//            rst = cs.getResultSet();
//
//            while (rst.next()) {
//                beanBsp = new PA_GET_COEFICIENTEFilter();
//                beanBsp.ROWNUM = rst.getInt("ROWNUM");
//                beanBsp.ORIGCITY = rst.getString("ORIGCITY");
//                beanBsp.DESTCITY = rst.getString("DESTCITY");
//                beanBsp.FAREAMOUNT = rst.getDouble("FAREAMOUNT");
//                beanBsp.MONEDA = rst.getString("MONEDA");
//                beanBsp.FARECLCD = rst.getString("FARECLCD");
//                beanBsp.DATESEFF = rst.getString("DATESEFF");
//                beanBsp.DATESDIS = rst.getString("DATESDIS");
//                beanBsp.A007EDATEA = rst.getString("A007EDATEA");
//                beanBsp.A007EDATEM = rst.getString("A007EDATEM");
//                beanBsp.A007DDATEA = rst.getString("A007DDATEA");
//                beanBsp.A007DDATEM = rst.getString("A007DDATEM");
//                beanBsp.A007PRORAF = rst.getDouble("A007PRORAF");
//                beanBsp.A007OACURC = rst.getString("A007OACURC");
//                beanBsp.COEF = rst.getDouble("COEF");
//                beanBsp.TOTPAG = rst.getInt("TOTPAG");
//                beanBsp.TOTALPAGINA = rst.getInt("TOTALPAGINA");
//                listaData.add(beanBsp);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            //===============
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().close();
//        }
//        return listaData;
//    }
//
//    public List<A1007> loadCityReport(String ccust, UserView user, A1007 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A1007 ciudad;
//        List<A1007> listaData = new ArrayList<A1007>();
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = -1;
//
//        Connection cnx = null;
//
//        try {
//
//            if (filter.intCurrentPg > 0) {
//                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A1007(?,?,?,?,?,?,?,?)}";
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
//
//            cs.registerOutParameter(5, Types.INTEGER);
//            cs.registerOutParameter(6, Types.INTEGER);
//            cs.registerOutParameter(7, Types.INTEGER);
//            cs.registerOutParameter(8, Types.INTEGER);
//
//            cs.setString(1, filter.A1007CTATO.trim());
//            cs.setString(2, filter.A1007CIUD.trim());
//            cs.setString(3, filter.A1007PAIS.trim());
//            cs.setString(4, filter.A1007NOMCD.trim().toUpperCase());
//            cs.setInt(5, PAGINIT);
//            cs.setInt(6, totRowsPag);
//            cs.setInt(7, totRows);
//            cs.setInt(8, filter.intTotalRws);
//            cs.execute();
//
//            filter.intCurrentPg = cs.getInt(5);
//            filter.intPageRws = cs.getInt(6);
//            filter.intTotalPgs = cs.getInt(7);
//            filter.intTotalRws = cs.getInt(8);
//
//            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(7)) {
//                totRows = filter.intTotalRws;
//                totPAGS = filter.intTotalPgs;
//            } else {
//                try {
//                    totRows = cs.getInt(8);
//                    int total = (int) (totRows / 20);
//                    int resto = (totRows % 20);
//
//                    if (resto > 0) {
//                        totPAGS = total + 1;
//                    } else {
//                        totPAGS = total;
//                    }
//
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            filter.intTotalPgs = totPAGS;
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//                ciudad = new A1007();
//                ciudad.A1007CTATO = rst.getString("A1007CTATO").trim();
//                ciudad.A1007NOMBR = rst.getString("A1007NOMBR").trim().toUpperCase();
//                ciudad.A1007CATEG = rst.getString("A1007CATEG").trim().toUpperCase();
//                ciudad.A1007CIUD = rst.getString("A1007CIUD").trim().toUpperCase();
//                ciudad.A1007NOMCD = rst.getString("A1007NOMCD").trim().toUpperCase();
//                ciudad.A1007STATE = rst.getString("A1007STATE").trim().toUpperCase();
//                ciudad.A1007PAIS = rst.getString("A1007PAIS").trim().toUpperCase();
//                ciudad.A1007TIMZ = rst.getString("A1007TIMZ").trim().toUpperCase();
//                ciudad.A1007STAT = rst.getString("A1007STAT").trim().toUpperCase();
//                ciudad.A1007REGIS = rst.getString("A1007REGIS").trim().toUpperCase();
//                ciudad.A1007FREGI = rst.getString("A1007FREGI").trim();
//                ciudad.A1007HREGI = rst.getString("A1007HREGI").trim();
//                ciudad.A1007REVIS = rst.getString("A1007REVIS").trim().toUpperCase();
//                ciudad.A1007FREVI = rst.getString("A1007FREVI").trim();
//                ciudad.A1007HREVI = rst.getString("A1007HREVI").trim();
//                ciudad.A1007LONG = rst.getDouble("A1007LONG");
//                ciudad.A1007LATI = rst.getDouble("A1007LATI");
//                ciudad.strNomPais = rst.getString("A006PAIS");
//
//                if (hmPaises.containsKey(rst.getString("A1007PAIS").trim().toUpperCase())) {
//                    ciudad.strNomPais = hmPaises.get(rst.getString("A1007PAIS").trim()).toString();
//                }
//                //Paginación ===================================================                
//                ciudad.intCurrentPg = filter.intCurrentPg / filter.intPageRws + 1;
//                ciudad.intPageRws = filter.intPageRws;
//                ciudad.intTotalPgs = filter.intTotalPgs;
//                ciudad.intTotalRws = filter.intTotalRws;
//
//                listaData.add(ciudad);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//
//        }
//        return listaData;
//    }
//
//    public List<A128> loadRegionMF(String ccust, UserView user, PX023S01A128Filter filter, int rowsPag) throws SQLException {
//
//        CallableStatement cs = null;
//        ResultSet rst = null;
//        String strSQL;
//        A128 region;
//        List<A128> listaData = new ArrayList();
//        int PAGINIT = 0, totPAGS, totRowsPag = filter.intTotalPgs, totRows = 0;
//
//        Connection cnx = null;
//
//        try {
//
//            if (filter.intCurrentPg > 0) {
//                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
//            }
//
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX023S01A128(?,?,?,?,?,?)}";
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
//
//            cs.registerOutParameter(4, Types.INTEGER);
//            cs.registerOutParameter(5, Types.INTEGER);
//            cs.registerOutParameter(6, Types.INTEGER);
//
//            cs.setString(1, filter.strOption.trim());
//            cs.setString(2, filter.strParam1.trim());
//            cs.setString(3, filter.strParam2.trim());
//            cs.setInt(4, totRowsPag);
//            cs.setInt(5, PAGINIT);
//            cs.setInt(6, filter.intTotalRws);
//
//            cs.execute();
//
//            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(5)) {
//                totRows = filter.intTotalRws;
//                totPAGS = filter.intTotalPgs;
//            } else {
//                try {
//                    totRows = cs.getInt(6);
//                    int total = (int) (totRows / 20);
//                    int resto = (totRows % 20);
//
//                    if (resto > 0) {
//                        totPAGS = total + 1;
//                    } else {
//                        totPAGS = total;
//                    }
//
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            rst = cs.getResultSet();
//            int pos = 0;
//            while (rst.next()) {
//                pos++;
//                region = new A128();
//                region.A128TIPO = rst.getString("A128TIPO").trim();
//                region.A128AREGIO = rst.getString("A128AREGIO").trim();
//                region.NOMREGION = rst.getString("A051DESCR1").trim();
//                region.A128PAIS = rst.getString("A128PAIS").trim();
//                region.NOMPAIS = rst.getString("A006KEY1").trim(); //A006KEY1
//                region.A128CIUDAD = rst.getString("A128CIUDAD").trim();
//                region.NOMCIUDAD = rst.getString("A1007NOMCD").trim();
//
//                region.A128REGIST = rst.getString("A128REGIST").trim().toUpperCase();
//                region.A128FREGIS = rst.getString("A128FREGIS").trim();
//                region.A128REVISA = rst.getString("A128REVISA").trim().toUpperCase();
//                region.A128FREVIS = rst.getString("A128FREVIS").trim();
//
//                //Paginación ===================================================
//                if (filter.intCurrentPg > 0) {
//                    region.intCurrentPg = filter.intCurrentPg;
//                } else {
//                    region.intCurrentPg = 1;
//                }
//                region.pos = (20 * (region.intCurrentPg - 1) + pos);
//                region.intPageRws = totRowsPag;
//                region.intTotalPgs = totPAGS;
//                region.intTotalRws = totRows;
//
//                listaData.add(region);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//        }
//        return listaData;
//    }
//
//    public String maintanceRegionMF(String strOption, UserView user, A128 bn) throws SQLException {
//        int result = -1;
//        CallableStatement cs = null;
//        String strSQL;
//        ResultSet rst = null;
//        String STR_RESULT = "";
//
//        strSQL = "{CALL " + session.getMainLibrary() + ".PX023S02A128(?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//
//        try {
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
//
//            //cs.registerOutParameter(10, Types.VARCHAR);
//            //cs.registerOutParameter(11, Types.VARCHAR);
//
//            cs.setString(1, strOption);
//            cs.setString(2, bn.A128TIPO.trim());
//            cs.setString(3, bn.A128AREGIO.trim());
//            cs.setString(4, bn.A128PAIS.trim());
//            cs.setString(5, bn.A128CIUDAD.trim());
//            cs.setString(6, bn.A128TIPO_OLD.trim());
//            cs.setString(7, bn.A128AREGIO_OLD.trim());
//            cs.setString(8, bn.A128PAIS_OLD.trim());
//            cs.setString(9, bn.A128CIUDAD_OLD.trim());
//            cs.execute();
//            //result = cs.executeUpdate();
//            rst = cs.getResultSet();
//            while (rst.next()) {
//                STR_RESULT = rst.getString("VMESSAGE");
//            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//
//            //String OU_MESSAGE = cs.getNString(11);
//            //OU_MESSAGE = OU_MESSAGE.trim();
//
//
//        } catch (Exception e) {
//            String cause = e.getCause().getMessage();
//            cause = cause.trim();
//            //e.printStackTrace();
//        } finally {
//            if (cs != null) {
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            // =================
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//        }
//
//        //return result;
//        return STR_RESULT;
//    }
//
//    public List<PX0094S01A007Filter> loadPX0094S01A007(PX0094S01A007Filter filter) throws SQLException {
//        List<PX0094S01A007Filter> lstRtn = new ArrayList<PX0094S01A007Filter>(0);
//        PX0094S01A007Filter objRtn;
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
//
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX0094S01A007(?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//
//        try {
//            if (filter.page.PAGNUM > 0) {
//                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
//            }
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
//            cstmt01.registerOutParameter(12, Types.INTEGER);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.IN_FFILTRO);
//            cstmt01.setString(3, filter.IN_CITY_ORIG);
//            cstmt01.setString(4, filter.IN_CITY_DEST);
//            cstmt01.setString(5, filter.IN_DATE_FROM);
//            cstmt01.setString(6, filter.IN_DATE_TO);
//            cstmt01.setString(7, filter.IN_CORDER);
//            cstmt01.setString(8, filter.IN_DORDER);
//            cstmt01.setInt(9, PAGINIT);
//            cstmt01.setInt(10, totRowsPag);
//            cstmt01.setInt(11, totRows);
//            cstmt01.setInt(12, filter.page.TOTROW);
//            /*cstmt01.setInt(9, filter.page.PAGNUM);
//             cstmt01.setInt(10, filter.page.PAGROW);
//             cstmt01.setInt(11, filter.page.TOTPAG);
//             cstmt01.setInt(12, filter.page.TOTROW);*/
//
//            cstmt01.execute();
//
//            filter.page.PAGNUM = cstmt01.getInt(9);
//            filter.page.PAGROW = cstmt01.getInt(10);
//            filter.page.TOTPAG = cstmt01.getInt(11);
//            filter.page.TOTROW = cstmt01.getInt(12);
//
//            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
//                totRows = filter.page.TOTROW;
//                totPAGS = filter.page.TOTPAG;
//            } else {
//                try {
//                    totRows = cstmt01.getInt(12);
//                    int total = (int) (totRows / 20);
//                    int resto = (totRows % 20);
//
//                    if (resto > 0) {
//                        totPAGS = total + 1;
//                    } else {
//                        totPAGS = total;
//                    }
//
//                } catch (Exception e) {
//                    totPAGS = totRows / totRowsPag;
//                }
//            }
//
//            filter.page.TOTPAG = totPAGS;
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn = new PX0094S01A007Filter();
//                objRtn.ROWNUM = rs01.getLong("RN");
//                objRtn.A007OACC = rs01.getString("A007OACC");
//                objRtn.A007DACC = rs01.getString("A007DACC");
//                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
//                objRtn.A007BASICM = rs01.getInt("A007BASICM");
//                objRtn.PROVISO = rs01.getInt("PROVISO");
//                objRtn.A007OACURC = rs01.getString("A007OACURC");
//                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
//                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
//                objRtn.A007EDATEA = rs01.getString("A007EDATEA");
//                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
//                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
//                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
//                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
//                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
//
//                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
//                lstRtn.add(objRtn);
//            }
//        } catch (Exception e) {
//            String error = e.getMessage();
//        } finally {
//            if (rs01 != null) {
//                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cstmt01 != null) {
//                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            pasarGarbageCollector();
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//        }
//
//        return lstRtn;
//    }
//
    public List<A1248> loadFieldsConditions() {

        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;

       /* String sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME='COMPARADOR' "
                + "ORDER BY USERFIELD ASC ";*/

        Connection cnx = null;
        try {
              sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME='COMPARADOR' "
                + "ORDER BY USERFIELD ASC ";
             
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);
           
             while (rst.next()) {

                record = new A1248();
                record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();
                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
                lista.add(record);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
           // session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lista;

    }
//
//    public List<A1248> loadFields(String tabla , Connection cnx) {
//
//        Statement stmt = null;
//        ResultSet rst = null;
//         String sql = "";
//        List<A1248> lista = new ArrayList<A1248>();
//        A1248 record;
//
//        try {
//            if(tabla.equals("A1691")){
//                sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME = 'A1691' OR TABNAME = 'A1692' ORDER BY TABNAME,ORDERSEL,USERFIELD ASC ";
//            }else{
//                 sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME = '" + tabla + "' ORDER BY ORDERSEL,USERFIELD ASC ";
//            }
//
//            stmt = cnx.createStatement();
//            rst = stmt.executeQuery(sql);
//            
//            while (rst.next()) {
//
//                record = new A1248();
//                record.TABNAME = rst.getString("TABNAME").trim();
//                record.USERFIELD = rst.getString("USERFIELD").trim();
//                record.DESCRIPT = rst.getString("DESCRIPT").trim();
//                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
//                record.DATATYPE = rst.getString("DATATYPE").trim();
//                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
//                record.LENGHTF = rst.getInt("LENGHTF");
//                record.strExample = rst.getString("FHELP").trim();
//                lista.add(record);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rst != null) {
//                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                }
//                if (stmt != null) {
//                    stmt.close();
//                }
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//
//        return lista;
//
//    }
//
    public List<A1248> loadColumns(String tabla) {

        Statement stmt = null;
        ResultSet rst = null;
         String sql = "";
        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;
        Connection cnx = null;
        try {
            
            sql = "SELECT * FROM " + session.getMainLibrary() + ".A2536 WHERE TABNAME = '" + tabla + "' "
                + " AND ORDERSEL <> 0   ORDER BY ORDERSEL ";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);
            
            while (rst.next()) {

                record = new A1248();
                /*record.campo =rst.getString("SYSTFIELD").trim();
                record.label=rst.getString("USERFIELD").trim() +" - " + rst.getString("DESCRIPT").trim(); 
                record.tabla=rst.getString("TABNAME").trim();
                record.ordenCol="100";
                record.size= rst.getInt("LENGHTF");
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.check=false;
                record.DCOLHDG = rst.getString("DCOLHDG").trim();
                if(rst.getString("DCOLHDG").contains("*")){
                    record.strExample ="1";
                    record.DCOLHDG = "\t " + rst.getString("DCOLHDG").trim().replace("*", "\t \n \t");
                    //record.DCOLHDG = rst.getString("DCOLHDG").trim().replace("*","   \n ");
                }
                record.OrderBy="";
                record.habil=false;
                record.DownUp=0;*/
                
                
                record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();
                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
                record.LENGHTF = rst.getInt("LENGHTF");
                //record.FHELP = rst.getString("FHELP").trim();
                record.DCOLHDG = rst.getString("DCOLHDG").trim();
                record.strExample =rst.getString("FHELP").trim();
                if(rst.getString("DCOLHDG").contains("*")){
                    record.FLAG ="1";
                    record.DCOLHDG = "\t " + rst.getString("DCOLHDG").trim().replace("*", "\t \n \t");
                    //record.DCOLHDG = rst.getString("DCOLHDG").trim().replace("*","   \n ");
                }
                
                
                lista.add(record);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return lista;

    }

    public List<A1248> loadFieldsA1248(String ccust, String tipo, String tabname, String num) throws Exception {

        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;

        Connection cnx = null;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00116(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, ccust.trim());
            cstmt.setString(2, tipo.trim());
            cstmt.setString(3, "");//CAMPO
            cstmt.setString(4, tabname);//TABNAME
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                record = new A1248();
                record.TABNAME = rst.getString("TABNAME");
                record.USERFIELD = rst.getString("USERFIELD");
                record.DESCRIPT = rst.getString("DESCRIPT");
                record.SYSTFIELD = rst.getString("SYSTFIELD");
                record.DATATYPE = rst.getString("DATATYPE");
                record.SUBSTRFL = rst.getString("SUBSTRFL");
                record.FlagNum = num;
                lista.add(record);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }

        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
                }
                if (cstmt != null) {
                    try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return lista;

    }
//
//    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException {
//        List<PX108S02PXF053Filter> lstRtn = new ArrayList<PX108S02PXF053Filter>(0);
//        PX108S02PXF053Filter objRtn;
//
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX108S02PXF053(?,?,?,?,?,?,?,?,?)}";
//        Connection cnx = null;
//
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(6, Types.INTEGER);
//            cstmt01.registerOutParameter(7, Types.INTEGER);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//
//            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(2, filter.IN_WKSTAT);
//            cstmt01.setString(3, filter.IN_FREPOR_FROM);
//            cstmt01.setString(4, filter.IN_FREPOR_TO);
//            cstmt01.setString(5, filter.IN_MDA);
//            cstmt01.setInt(6, filter.page.PAGNUM);
//            cstmt01.setInt(7, filter.page.PAGROW);
//            cstmt01.setInt(8, filter.page.TOTPAG);
//            cstmt01.setInt(9, filter.page.TOTROW);
//
//            cstmt01.execute();
//
//            filter.page.PAGNUM = cstmt01.getInt(6);
//            filter.page.PAGROW = cstmt01.getInt(7);
//            filter.page.TOTPAG = cstmt01.getInt(8);
//            filter.page.TOTROW = cstmt01.getInt(9);
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//                objRtn = new PX108S02PXF053Filter();
//                objRtn.RN = rs01.getLong("RN");
//                objRtn.CCUST = rs01.getString("CCUST");
//                objRtn.WKSTAT = rs01.getString("WKSTAT");
//                objRtn.FREPOR = rs01.getString("FREPOR");
//                objRtn.MDA = rs01.getString("MDA");
//                objRtn.HDTE = rs01.getString("HDTE");
//                objRtn.HNAME = rs01.getString("HNAME");
//                objRtn.HSTATUS = rs01.getString("HSTATUS");
//                objRtn.SCASH = rs01.getDouble("SCASH");
//                objRtn.SCREDIT = rs01.getDouble("SCREDIT");
//                objRtn.SEXCHA = rs01.getDouble("SEXCHA");
//                objRtn.STVOUCHER = rs01.getDouble("STVOUCHER");
//                objRtn.RCASH = rs01.getDouble("RCASH");
//                objRtn.RCREDIT = rs01.getDouble("RCREDIT");
//                objRtn.REXCHA = rs01.getDouble("REXCHA");
//                objRtn.RTVOUCHER = rs01.getDouble("RTVOUCHER");
//                objRtn.NCASH = rs01.getDouble("NCASH");
//                objRtn.NCREDIT = rs01.getDouble("NCREDIT");
//                objRtn.NEXCHA = rs01.getDouble("NEXCHA");
//                objRtn.NTVOUCHER = rs01.getDouble("NTVOUCHER");
//                objRtn.TCASH = rs01.getDouble("TCASH");
//                objRtn.TCREDIT = rs01.getDouble("TCREDIT");
//                objRtn.TEXCHA = rs01.getDouble("TEXCHA");
//                objRtn.TTVOUCHER = rs01.getDouble("TTVOUCHER");
//                objRtn.STOTAL = rs01.getDouble("STOTAL");
//                objRtn.RTOTAL = rs01.getDouble("RTOTAL");
//                objRtn.NTOTAL = rs01.getDouble("NTOTAL");
//                objRtn.TTOTAL = rs01.getDouble("TTOTAL");
//
//                objRtn.A1530_A1720_CA_SUM = rs01.getDouble("A1530_A1720_CA_SUM");
//                objRtn.A1530_A1720_CC_SUM = rs01.getDouble("A1530_A1720_CC_SUM");
//                objRtn.A1530_A1720_EX_SUM = rs01.getDouble("A1530_A1720_EX_SUM");
//                objRtn.A1530_A1720_TV_SUM = rs01.getDouble("A1530_A1720_TV_SUM");
//
//                objRtn.STATUS = rs01.getString("STATUS");
//                objRtn.COMENT = rs01.getString("COMENT");
//                
//                objRtn.USRC = rs01.getString("USRC");
//                objRtn.DATC = rs01.getString("DATC");
//                objRtn.TIMC = rs01.getString("TIMC");
//                objRtn.CRTC = rs01.getString("CRTC");
//                objRtn.USRM = rs01.getString("USRM");
//                objRtn.DATM = rs01.getString("DATM");
//                objRtn.TIMM = rs01.getString("TIMM");
//                objRtn.CRTM = rs01.getString("CRTM");
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
//                lstRtn.add(objRtn);
//            }
//        } finally {
//            if (rs01 != null) {
//                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            if (cstmt01 != null) {
//                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//
//            pasarGarbageCollector();
//        }
//
//        return lstRtn;
//    }
//    
//    public List<A005> loadAirlines() {
//
//        PreparedStatement stmt = null;
//        ResultSet rst = null;
//        List<A005> lista = new ArrayList<A005>();
//        A005 record;
//
//        String sql = "SELECT * FROM " + session.getMainLibrary() + ".A005";
//
//        Connection cnx = null;
//        try {
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  stmt = cnx.prepareCall(sql);
//            rst = stmt.executeQuery(sql);
//
//            while (rst.next()) {
//
//                record = new A005();
//                record.A005KEY = rst.getString("A005KEY").trim();
//                if(rst.getString("A005KEY3").trim().isEmpty()){
//                    record.A005KEY2 = rst.getString("A005KEY2").trim();
//                }else{
//                    record.A005KEY2 = rst.getString("A005KEY3").trim();
//                }
//                lista.add(record);
//            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rst != null) {
//                    try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//                }
//                if (stmt != null) {
//                    stmt.close();
//                }
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//        }
//
//        return lista;
//
//    }
    
    public List<PX0094S01A007Filter> SQP03624(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<PX0094S01A007Filter>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03624(?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX0094S01A007Filter();
                //objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = filter.IN_DATE_FROM;
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;   
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> SQP03925(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<PX0094S01A007Filter>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03925(?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX0094S01A007Filter();
                //objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                objRtn.A007EDATEA = filter.IN_DATE_FROM;
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> SQP03927(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<PX0094S01A007Filter>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03927(?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX0094S01A007Filter();
                //objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = filter.IN_DATE_FROM;
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;   
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> SQP03929(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<PX0094S01A007Filter>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03929(?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX0094S01A007Filter();
                //objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = filter.IN_DATE_FROM;
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;   
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}