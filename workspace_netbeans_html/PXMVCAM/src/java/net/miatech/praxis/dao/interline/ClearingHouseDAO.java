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
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import net.miatech.praxis.interline.filter.IMF093Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ClearingHouseDAO {

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
    
    public List<IMF093Filter> loadPX197SQP00144(IMF093Filter filter) throws SQLException, Exception {

        IMF093Filter invoice = null;
        List<IMF093Filter> lista = new ArrayList();
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String strFECHA = "", strCURRENP = "", strPERNUM = "";
        HashMap ht = new HashMap();

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
//        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
//        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
//        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
//        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        //</editor-fold>

        double dblTNETF1IB = 0, dblAJUSF1IB = 0;
        double dblTNETF1OB = 0, dblAJUSF1OB = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00144(?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.yearFrom.trim() + filter.monthFrom.trim());
            cstmt.setString(3, filter.yearTo.trim() + filter.monthTo.trim());
            cstmt.setString(4, filter.CCIA.trim());
            cstmt.setString(5, filter.PERNUM.trim());
            cstmt.setString(6, filter.CURRENP.trim());
            cstmt.execute();

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA1 IB & OB">

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                if (!strFECHA.equals("") && (!strFECHA.equals(rs01.getString("FINVOICE").trim())
                        || !strPERNUM.equals(rs01.getString("PERNUM").trim()))) {

                    invoice = new IMF093Filter();
                    invoice.FINVOICE = strFECHA;
                    invoice.CURRENP = strCURRENP;
                    invoice.PERNUM = strPERNUM;
                    invoice.strPeriodo = filter.PERNUM.trim();
                    invoice.CCIA = filter.CCIA.trim();
                    invoice.dblTNETF1IB = dblTNETF1IB;
                    invoice.dblAJUSF1IB = dblAJUSF1IB;
                    invoice.dblTNETF1OB = dblTNETF1OB;
                    invoice.dblAJUSF1OB = dblAJUSF1OB;
                    ht.put(strFECHA + strPERNUM, invoice);

                    dblTNETF1IB = 0;
                    dblAJUSF1IB = 0;
                    dblTNETF1OB = 0;
                    dblAJUSF1OB = 0;
                }

                strFECHA = rs01.getString("FINVOICE").trim();
                strCURRENP = rs01.getString("CURRENP").trim();
                strPERNUM = rs01.getString("PERNUM").trim();

                if (rs01.getString("TTRAN").trim().equals("IB")) {
                    dblTNETF1IB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    dblAJUSF1IB = rs01.getDouble("AJUSTE");
                } else {
                    dblTNETF1OB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    dblAJUSF1OB = rs01.getDouble("AJUSTE");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (!strFECHA.equals("")) {
                invoice = new IMF093Filter();
                invoice.FINVOICE = strFECHA;
                invoice.PERNUM = strPERNUM;
                invoice.CURRENP = strCURRENP;
                invoice.strPeriodo = filter.PERNUM.trim();
                invoice.CCIA = filter.CCIA.trim();
                invoice.dblTNETF1IB = dblTNETF1IB;
                invoice.dblAJUSF1IB = dblAJUSF1IB;
                invoice.dblTNETF1OB = dblTNETF1OB;
                invoice.dblAJUSF1OB = dblAJUSF1OB;
                ht.put(strFECHA + strPERNUM, invoice);
            }

            //</editor-fold>

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA2 (OB) ">
            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    if (ht.containsKey(rs01.getString("FINVOICE").trim() + rs01.getString("PERNUM").trim())) {
                        invoice = (IMF093Filter) ht.get(rs01.getString("FINVOICE").trim() + rs01.getString("PERNUM").trim());
                    } else {
                        invoice = new IMF093Filter();
                        invoice.strPeriodo = filter.PERNUM.trim();
                        invoice.CCIA = filter.CCIA.trim();
                        invoice.PERNUM = rs01.getString("PERNUM").trim();
                        invoice.FINVOICE = rs01.getString("FINVOICE").trim();
                        invoice.CURRENP = rs01.getString("CURRENP").trim();
                    }
                    invoice.dblTNETF2OB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    invoice.dblAJUSF2OB = rs01.getDouble("AJUSTE");
                    ht.put(invoice.FINVOICE + invoice.PERNUM, invoice);
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA3 (IB) ">
            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    if (ht.containsKey(rs01.getString("FINVOICE").trim() + rs01.getString("PERNUM").trim())) {
                        invoice = (IMF093Filter) ht.get(rs01.getString("FINVOICE").trim() + rs01.getString("PERNUM").trim());
                    } else {
                        invoice = new IMF093Filter();
                        invoice.strPeriodo = filter.PERNUM.trim();
                        invoice.CCIA = filter.CCIA.trim();
                        invoice.PERNUM = rs01.getString("PERNUM").trim();
                        invoice.FINVOICE = rs01.getString("FINVOICE").trim();
                        invoice.CURRENP = rs01.getString("CURRENP").trim();
                    }
                    invoice.dblTNETF3IB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    invoice.dblAJUSF3IB = rs01.getDouble("AJUSTE");
                    ht.put(invoice.FINVOICE + invoice.PERNUM, invoice);
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (!ht.isEmpty()) {
                Vector v = new Vector(ht.keySet());
                Collections.sort(v);
                Iterator it = v.iterator();
                String keyI = "";

                while (it.hasNext()) {
                    keyI = (String) (it.next());
                    invoice = (IMF093Filter) ht.get(keyI);
                    invoice.strFormatDate = Functions.getMonthConvert(invoice.FINVOICE);
                    invoice.strPeriodo = filter.PERNUM.trim();
                    invoice.CCIA = filter.CCIA.trim();
                    invoice.dblBALANCIB = invoice.dblTNETF1IB - invoice.dblTNETF3IB;
                    invoice.dblBALANCOB = invoice.dblTNETF1OB - invoice.dblTNETF2OB;
                    lista.add(invoice);
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
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }
    
    public List<IMF093Filter> loadPX197SQP00145(IMF093Filter filter) throws SQLException, Exception {

        //Drill Down Invoice Conciliation, agrupado por CCIA
        IMF093Filter invoice = null;
        List<IMF093Filter> lista = new ArrayList();
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String strCCIA = "", strCURRENP = "", strPERNUM = "", strNombre = "";
        HashMap ht = new HashMap();

        double dblTNETF1IB = 0, dblAJUSF1IB = 0;
        double dblTNETF1OB = 0, dblAJUSF1OB = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00145(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOICE.trim());
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.PERNUM.trim());
            cstmt.setString(5, filter.CURRENP.trim());
            cstmt.execute();

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA1 IB & OB">

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                if (!strCCIA.equals("") && !strCCIA.equals(rs01.getString("CCIA").trim())) {

                    invoice = new IMF093Filter();
                    invoice.CCIA = strCCIA;
                    invoice.strAirName = strNombre;
                    invoice.CURRENP = strCURRENP;
                    // invoice.strPeriodo = filter.PERNUM.trim();
                    invoice.dblTNETF1IB = dblTNETF1IB;
                    invoice.dblAJUSF1IB = dblAJUSF1IB;
                    invoice.dblTNETF1OB = dblTNETF1OB;
                    invoice.dblAJUSF1OB = dblAJUSF1OB;
                    ht.put(strCCIA, invoice);

                    dblTNETF1IB = 0;
                    dblAJUSF1IB = 0;
                    dblTNETF1OB = 0;
                    dblAJUSF1OB = 0;
                }

                strCCIA = rs01.getString("CCIA").trim();
                strCURRENP = rs01.getString("CURRENP").trim();
                if (rs01.getString("A005KEY2") != null && !rs01.getString("A005KEY2").trim().equals("-")) {
                    strNombre = rs01.getString("A005KEY2").trim();
                }

                if (rs01.getString("TTRAN").trim().equals("IB")) {
                    dblTNETF1IB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    dblAJUSF1IB = rs01.getDouble("AJUSTE");
                } else {
                    dblTNETF1OB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    dblAJUSF1OB = rs01.getDouble("AJUSTE");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (!strCCIA.equals("")) {
                invoice = new IMF093Filter();
                invoice.CCIA = strCCIA;
                invoice.strAirName = strNombre;
                invoice.CURRENP = strCURRENP;
                //   invoice.strPeriodo = filter.PERNUM.trim();
                invoice.dblTNETF1IB = dblTNETF1IB;
                invoice.dblAJUSF1IB = dblAJUSF1IB;
                invoice.dblTNETF1OB = dblTNETF1OB;
                invoice.dblAJUSF1OB = dblAJUSF1OB;
                ht.put(strCCIA, invoice);
            }

            //</editor-fold>

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA2 (OB) ">
            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {

                    if (ht.containsKey(rs01.getString("CCIA").trim())) {
                        invoice = (IMF093Filter) ht.get(rs01.getString("CCIA").trim());
                    } else {
                        invoice = new IMF093Filter();
                        invoice.CCIA = rs01.getString("CCIA").trim();
                        invoice.CURRENP = rs01.getString("CURRENP").trim();
                        //      invoice.strPeriodo = filter.PERNUM.trim();
                        if (rs01.getString("A005KEY2") != null && !rs01.getString("A005KEY2").trim().equals("-")) {
                            invoice.strAirName = rs01.getString("A005KEY2").trim();
                        }
                    }
                    invoice.dblTNETF2OB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    invoice.dblAJUSF2OB = rs01.getDouble("AJUSTE");
                    ht.put(invoice.CCIA, invoice);
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO MONTO FORMA3 (IB) ">
            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    if (ht.containsKey(rs01.getString("CCIA").trim())) {
                        invoice = (IMF093Filter) ht.get(rs01.getString("CCIA").trim());
                    } else {
                        invoice = new IMF093Filter();
                        invoice.CCIA = rs01.getString("CCIA").trim();
                        invoice.CURRENP = rs01.getString("CURRENP").trim();
                        //      invoice.strPeriodo = filter.PERNUM.trim();
                        if (rs01.getString("A005KEY2") != null && !rs01.getString("A005KEY2").trim().equals("-")) {
                            invoice.strAirName = rs01.getString("A005KEY2").trim();
                        }
                    }
                    invoice.dblTNETF3IB = rs01.getDouble("TNETO") + rs01.getDouble("AJUSTE");
                    invoice.dblAJUSF3IB = rs01.getDouble("AJUSTE");
                    ht.put(invoice.CCIA, invoice);
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //</editor-fold>

            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (!ht.isEmpty()) {
                Vector v = new Vector(ht.keySet());
                Collections.sort(v);
                Iterator it = v.iterator();
                String keyI = "";

                while (it.hasNext()) {
                    keyI = (String) (it.next());
                    invoice = (IMF093Filter) ht.get(keyI);
                    invoice.FINVOICE = filter.FINVOICE.trim();
                    invoice.strFormatDate = filter.strFormatDate;
                    invoice.PERNUM = filter.PERNUM.trim();
                    invoice.dblBALANCIB = invoice.dblTNETF1IB - invoice.dblTNETF3IB;
                    invoice.dblBALANCOB = invoice.dblTNETF1OB - invoice.dblTNETF2OB;
                    invoice.dblAJUSF1IB = invoice.dblTNETF2OB - invoice.dblTNETF3IB;//Diff Forma2 - forma 3
                    lista.add(invoice);
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
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
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
