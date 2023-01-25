package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import net.miatech.praxis.dao.payments.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A2665Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EMDCodesPricesDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2665Filter> Search(A2665Filter filter) throws SQLException, Exception {
        List<A2665Filter> lstRtn = new ArrayList<A2665Filter>(0);
        A2665Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00968(?,?,?, ?, ?, ?, ?, ?, ?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_RFIC);
            cstmt01.setString(4, filter.VP_RFIS);
             cstmt01.setString(5, filter.A2665DESCR);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A2665Filter();

                objRtn.A2665CCUST = rs01.getString("A2665CCUST");
                objRtn.A2665RFIC = rs01.getString("A2665RFIC");
                objRtn.A2665RFIS = rs01.getString("A2665RFIS");
                objRtn.A2665EMDTP = rs01.getString("A2665EMDTP");
                objRtn.A2665DESCR = rs01.getString("A2665DESCR");
                objRtn.A2665GROUP = rs01.getString("A2665GROUP");
                objRtn.A2665DMSTC = rs01.getFloat("A2665DMSTC");
                objRtn.A2665MDADO = rs01.getString("A2665MDADO");
                objRtn.A2665INTNC = rs01.getFloat("A2665INTNC");
                objRtn.A2665MDAIN = rs01.getString("A2665MDAIN");
                objRtn.A2665APLIC = rs01.getString("A2665APLIC");
                objRtn.A2665REGIS = rs01.getString("A2665REGIS");
                objRtn.A2665FREGI = rs01.getString("A2665FREGI");
                objRtn.A2665HREGI = rs01.getString("A2665HREGI");
                objRtn.A2665REVIS = rs01.getString("A2665REVIS");
                objRtn.A2665FREVI = rs01.getString("A2665FREVI");
                objRtn.A2665HREVI = rs01.getString("A2665HREVI");

                objRtn.A2665CORRL = rs01.getString("A2665CORRL");
                objRtn.A2665RDMST = rs01.getDouble("A2665RDMST");
                objRtn.A2665RINTN = rs01.getDouble("A2665RINTN");
                objRtn.A2665EFECT = rs01.getString("A2665EFECT");
                objRtn.A2665DESCO = rs01.getString("A2665DESCO");
                objRtn.A2665FLAG = rs01.getString("A2665FLAG");
                objRtn.A2665RANGO = rs01.getString("A2665RANGO");
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
    
    public A2665Filter mantenimientoEMD(A2665Filter filter) throws Exception, SQLException {


        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00969(?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(18, Types.VARCHAR);
            cstmt01.registerOutParameter(19, Types.VARCHAR);
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_RFIC);
            cstmt01.setString(4, filter.VP_RFIS);
            cstmt01.setString(5, filter.A2665EMDTP);

            cstmt01.setString(6, filter.A2665DESCR);
            cstmt01.setString(7, filter.A2665GROUP);
            cstmt01.setDouble(8, filter.A2665DMSTC);
            cstmt01.setString(9, filter.A2665MDADO);
            cstmt01.setDouble(10, filter.A2665INTNC);
            cstmt01.setString(11, filter.A2665MDAIN);
            cstmt01.setString(12, filter.A2665APLIC);

            cstmt01.setDouble(13, filter.A2665RDMST);
            cstmt01.setDouble(14, filter.A2665RINTN);
            cstmt01.setString(15, filter.A2665EFECT);
            cstmt01.setString(16, filter.A2665DESCO);
            cstmt01.setString(17, filter.A2665CORRL);


            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(18);
            filter.dbException.MESSAGE = cstmt01.getString(19);
        } finally {
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
        return filter;
    }
    
    public String subirExcel(String strRutaArchivo, String strSesion, String nameFile) throws SQLException, ClassNotFoundException, Exception {

        String mensaje = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        A2665Filter fileA2665;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01678(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        int c = 0;
        String valida = "Y";
        String hojaExcel;

        hojaExcel = nameFile.substring(0, 14);
        try {
            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            Connection conn = DriverManager.getConnection("jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};Dbq=" + strRutaArchivo + ";");
            PreparedStatement s = conn.prepareStatement("SELECT * FROM [" + hojaExcel + "$]");
            s.execute();
            Integer cont = 0;
            ResultSet rs = s.getResultSet();
            if (rs != null) {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                String tmp;
                while (rs.next()) {
                    fileA2665 = new A2665Filter();
                    cont++;
                    if (cont > 1) {
                        fileA2665.A2665CCUST = session.getUserView().getCustomerInfo().CCUST;
                        tmp = rs.getString(2);
                        fileA2665.A2665DESCR = tmp == null ? "" : tmp;
                        tmp = rs.getString(3);
                        fileA2665.A2665GROUP = tmp == null ? "" : tmp;
                        tmp = rs.getString(4);
                        fileA2665.A2665EMDTP = tmp == null ? "" : tmp;
                        tmp = rs.getString(5);
                        fileA2665.A2665RFIC = tmp == null ? "" : tmp;
                        tmp = rs.getString(6);
                        fileA2665.A2665RFIS = tmp == null ? "" : tmp;
                        tmp = rs.getString(7);
                        fileA2665.A2665EFECT = tmp == null ? "" : tmp;
                        tmp = rs.getString(8);
                        fileA2665.A2665DESCO = tmp == null ? "" : tmp;
                        tmp = rs.getString(9);
                        fileA2665.A2665APLIC = tmp == null ? "" : tmp;

                        fileA2665.A2665DMSTC = rs.getDouble(10);
                        fileA2665.A2665RDMST = rs.getDouble(11);
                        tmp = rs.getString(12);
                        fileA2665.A2665MDAIN = tmp == null ? "" : tmp;
                        fileA2665.A2665INTNC = rs.getDouble(13);
                        fileA2665.A2665RINTN = rs.getDouble(14);

                        //INSERTAR DATOS A LA TABLA
                        if (!fileA2665.A2665RFIC.equals("") && !fileA2665.A2665RFIS.equals("")) {
                            cstmt01 = cnx.prepareCall(SQLCLL01);

                            cstmt01.registerOutParameter(15, Types.VARCHAR);
                            cstmt01.registerOutParameter(16, Types.VARCHAR);

                            cstmt01.setString(1, fileA2665.A2665CCUST.trim());
                            cstmt01.setString(2, fileA2665.A2665DESCR.trim());
                            cstmt01.setString(3, fileA2665.A2665GROUP.trim());
                            cstmt01.setString(4, fileA2665.A2665EMDTP.trim().replaceAll(" ", ""));
                            cstmt01.setString(5, fileA2665.A2665RFIC.trim());
                            cstmt01.setString(6, fileA2665.A2665RFIS.trim());
                            cstmt01.setString(7, fileA2665.A2665EFECT.trim());
                            cstmt01.setString(8, fileA2665.A2665DESCO.trim());
                            cstmt01.setString(9, fileA2665.A2665APLIC.trim());
                            cstmt01.setDouble(10, fileA2665.A2665DMSTC);
                            cstmt01.setDouble(11, fileA2665.A2665RDMST);
                            cstmt01.setString(12, fileA2665.A2665MDAIN.trim());
                            cstmt01.setDouble(13, fileA2665.A2665INTNC);
                            cstmt01.setDouble(14, fileA2665.A2665RINTN);
                            cstmt01.execute();
                            valida = "N";
                            fileA2665.dbException.SQLCODE = cstmt01.getString(15);
                            fileA2665.dbException.MESSAGE = cstmt01.getString(16);

                            if (!fileA2665.dbException.SQLCODE.equals("000000")) {
                                mensaje = fileA2665.dbException.MESSAGE;
                                break;
                            }
                        }

                    }

                }

            }
            s.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            mensaje = "";
            logError.error("ClassNotFoundException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (SQLException e) {
            if (cnx != null) {
                cnx.rollback();
            }
            mensaje = "";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            mensaje = "";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }


        return mensaje;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
