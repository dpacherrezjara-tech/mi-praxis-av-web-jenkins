package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A4717Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 *
 * @author zperez
 */
public class UserMaintenanceDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    // Clave secreta de 16 bytes para AES-128 (¡en un sistema real, almacena esto de forma segura!)

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4717Filter> SearchUserMant(A4717Filter filter) throws SQLException, Exception {
        List<A4717Filter> lstRtn = new ArrayList<A4717Filter>(0);
        A4717Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISAV.SQP05567(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_TYPEPROCES);
            cstmt01.setString(4, filter.IN_USER);
            cstmt01.setString(5, filter.IN_DATETO);
            cstmt01.setString(6, filter.IN_DATEFROM);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4717Filter();
                objRtn.A4717CCUST = rs01.getString("A4717CCUST");
                objRtn.A4717TYPE = rs01.getString("A4717TYPE");
                objRtn.A4717TYPEDES = rs01.getString("A4717TYPEDES");
                objRtn.A4717USER = rs01.getString("A4717USER");
                objRtn.A4717PASS = rs01.getString("A4717PASS");
                objRtn.A4717ESTAT = rs01.getString("A4717ESTAT");
                objRtn.A4717LIK = rs01.getString("A4717LIK");
                objRtn.A4717DECRI = rs01.getString("A4717DECRI");
                objRtn.A4717PROCE = rs01.getString("A4717PROCE");
                objRtn.A4717VERIF = rs01.getString("A4717VERIF");
                objRtn.A4717CORR = rs01.getString("A4717CORR");
                objRtn.A4717USRIN = rs01.getString("A4717USRIN");
                objRtn.A4717FECIN = rs01.getString("A4717FECIN");
                objRtn.A4717HORIN = rs01.getString("A4717HORIN");
                objRtn.A4717USRAC = rs01.getString("A4717USRAC");
                objRtn.A4717FECAC = rs01.getString("A4717FECAC");
                objRtn.A4717HORAC = rs01.getString("A4717HORAC");
                objRtn.A4717PSCO = rs01.getString("A4717PSCO");

                // 
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public String mantenimientoUser(A4717Filter filter) throws SQLException, Exception {
        String strRtn = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXISAV.SQP05568(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        String strUsuario, strFecha, strHora;
        try {
            strUsuario = session.getUserView().getUserInfo().USR;
            strFecha = Functions.getFechaActual();
            strHora = Functions.getHoraActual();

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.A4717TYPE);
            cstmt01.setString(4, filter.A4717USER);
            cstmt01.setString(5, filter.A4717PASS);
            cstmt01.setString(6, filter.A4717PASSECRIP);
            cstmt01.setString(7, filter.A4717ESTAT);
            cstmt01.setString(8, filter.A4717LIK);
            cstmt01.setString(9, filter.A4717DECRI);
            cstmt01.setString(10, filter.A4717PROCE);
            cstmt01.setString(11, filter.A4717VERIF);
            cstmt01.setString(12, filter.A4717CORR);

            cstmt01.setString(13, strUsuario);
            cstmt01.setString(14, strFecha);
            cstmt01.setString(15, strHora);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                strRtn = rs01.getString("VMESSAGE");
            }

        } catch (Exception e) {
            //strRtn = "";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    if (cnx != null) //cnx.rollback();
                    {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return strRtn;
    }

}
