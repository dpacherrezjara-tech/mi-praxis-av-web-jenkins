package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1702Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1702;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AircraftMasterDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1702Filter> loadPX102S01A1702(A1702Filter filter) throws SQLException, Exception {

        List<A1702Filter> lstRtn = new ArrayList<A1702Filter>(0);
        A1702Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX102S01A1702(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TIPOTXT.trim());
            cstmt01.setString(3, filter.IN_VALORTXT.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                //FUENTE,MENSA
                objRtn = new A1702Filter();
                objRtn.RN = pos;
                objRtn.CCUST = rs01.getString("CCUST").trim();
                objRtn.EQUIPO = rs01.getString("EQUIPO").trim();
                objRtn.MODELO = rs01.getString("MODELO").trim();
                objRtn.NUMERO = rs01.getString("NUMERO").trim();
                objRtn.MATRIC = rs01.getString("MATRIC").trim();
                objRtn.HORAVLO = rs01.getDouble("HORAVLO");
                objRtn.TOTMILL = rs01.getDouble("TOTMILL");
                objRtn.TOTGALO = rs01.getDouble("TOTGALO");
                objRtn.TOTCARG = rs01.getDouble("TOTCARG");

                objRtn.PAX = rs01.getInt("PAX");
                objRtn.PAXF = rs01.getInt("PAXF");
                objRtn.PAXJ = rs01.getInt("PAXJ");
                objRtn.PAXY = rs01.getInt("PAXY");
                objRtn.TURBINA = rs01.getInt("TURBINA");
                objRtn.FECHA = rs01.getString("FECHA").trim();
                objRtn.TIPO = rs01.getString("TIPO").trim();
                objRtn.CARRIER = rs01.getString("CARRIER").trim();
                objRtn.PESO = rs01.getDouble("PESO");
                objRtn.PESOMAX = rs01.getDouble("PESOMAX");

                objRtn.ESTADO = rs01.getString("ESTADO").trim();
                if (rs01.getString("ESTADO").trim().equals("1")) {
                    objRtn.IN_FECHA_TO = "ACTIVO";
                } else {
                    objRtn.IN_FECHA_TO = "INACTIVO";
                }

                objRtn.FECHAOP = rs01.getString("FECHAOP").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FECHAOP);
                objRtn.FECINICO = rs01.getString("FECINICO").trim();
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FECINICO);
                objRtn.FECFINCO = rs01.getString("FECFINCO").trim();
                objRtn.IN_FECHA_FROM = Functions.getMonthConvert(objRtn.FECFINCO);

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
    
    public A1702 loadPX102S02A1702(A1702Filter filter) throws SQLException, Exception {
        A1702 objRtn = new A1702();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX102S02A1702(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.EQUIPO.trim());
            cstmt01.setString(3, filter.MODELO.trim());
            cstmt01.setString(4, filter.NUMERO.trim());
            cstmt01.setString(5, filter.MATRIC.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.EQUIPO = rs01.getString("EQUIPO");
                objRtn.MODELO = rs01.getString("MODELO");
                objRtn.NUMERO = rs01.getString("NUMERO");
                objRtn.MATRIC = rs01.getString("MATRIC");
                objRtn.HORAVLO = rs01.getDouble("HORAVLO");
                objRtn.TOTMILL = rs01.getDouble("TOTMILL");
                objRtn.TOTGALO = rs01.getDouble("TOTGALO");
                objRtn.TOTCARG = rs01.getDouble("TOTCARG");

                objRtn.PAX = rs01.getInt("PAX");
                objRtn.PAXF = rs01.getInt("PAXF");
                objRtn.PAXJ = rs01.getInt("PAXJ");
                objRtn.PAXY = rs01.getInt("PAXY");
                objRtn.TURBINA = rs01.getInt("TURBINA");
                objRtn.FECHA = rs01.getString("FECHA");
                objRtn.TIPO = rs01.getString("TIPO");
                objRtn.FECHAOP = rs01.getString("FECHAOP");
                objRtn.FECINICO = rs01.getString("FECINICO");
                objRtn.FECFINCO = rs01.getString("FECFINCO");

                objRtn.CARRIER = rs01.getString("CARRIER");
                objRtn.PESO = rs01.getDouble("PESO");
                objRtn.PESOMAX = rs01.getDouble("PESOMAX");
                //objRtn.ESTADO = rs01.getString("ESTADO");
                if (rs01.getString("ESTADO").equals("1")) {
                    objRtn.ESTADO = "ACTIVO";
                } else {
                    objRtn.ESTADO = "INACTIVO";
                }

                objRtn.COSCOMB = rs01.getDouble("COSCOMB");
                objRtn.COSCARGO = rs01.getDouble("COSCARGO");
                objRtn.COSNAV = rs01.getDouble("COSNAV");
                objRtn.COSATERR = rs01.getDouble("COSATERR");
                objRtn.COSESTAC = rs01.getDouble("COSESTAC");
                objRtn.COSTRIPU = rs01.getDouble("COSTRIPU");
                objRtn.COSOTROS = rs01.getDouble("COSOTROS");

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR"));
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = Functions.ConvertedTime(rs01.getString("HOUP"));
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

        return objRtn;
    }
    
    public String loadPX102S03A1702(A1702 filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX102S03A1702(?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(33, Types.VARCHAR);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.EQUIPO.trim());
            cstmt.setString(4, filter.MODELO.trim());
            cstmt.setString(5, filter.NUMERO.trim());
            cstmt.setString(6, filter.MATRIC.trim());
            cstmt.setDouble(7, filter.HORAVLO);
            cstmt.setDouble(8, filter.TOTMILL);
            cstmt.setDouble(9, filter.TOTGALO);
            cstmt.setDouble(10, filter.TOTCARG);
            cstmt.setString(11, filter.ESTADO.trim());
            cstmt.setInt(12, filter.PAX);
            cstmt.setInt(13, filter.PAXF);
            cstmt.setInt(14, filter.PAXJ);
            cstmt.setInt(15, filter.PAXY);
            cstmt.setInt(16, filter.TURBINA);

            cstmt.setDouble(17, filter.COSCOMB);
            cstmt.setDouble(18, filter.COSCARGO);
            cstmt.setDouble(19, filter.COSNAV);
            cstmt.setDouble(20, filter.COSATERR);
            cstmt.setDouble(21, filter.COSESTAC);
            cstmt.setDouble(22, filter.COSTRIPU);
            cstmt.setDouble(23, filter.COSOTROS);

            cstmt.setString(24, filter.FECHA.trim());
            cstmt.setString(25, filter.TIPO.trim());
            cstmt.setString(26, filter.FECHAOP.trim());
            cstmt.setString(27, filter.FECINICO.trim());
            cstmt.setString(28, filter.FECFINCO.trim());
            cstmt.setString(29, session.getUserView().getUserInfo().USR);
            cstmt.setString(30, filter.CARRIER.trim());
            cstmt.setDouble(31, filter.PESO);
            cstmt.setDouble(32, filter.PESOMAX);
            cstmt.setString(33, "");
            cstmt.execute();

            strMsj = cstmt.getString(33);

        } finally {
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

        return strMsj;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
