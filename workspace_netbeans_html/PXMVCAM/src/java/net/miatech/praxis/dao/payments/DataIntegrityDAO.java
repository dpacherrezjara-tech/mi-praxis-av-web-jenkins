/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.program.ProMasterTicketDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class DataIntegrityDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public DataIntegrityDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataIntegrityDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF100Filter> loadPX615SQP04378(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        double TOT_TCONAMO = 0, TOT_COMMAMO = 0, TOT_IVAAMOU = 0, TOT_PROPAMO = 0, TOT_RIVAAMO = 0, TOT_RICAAMO = 0;
        double TOT_RFTEAMO = 0, TOT_NETOAMO = 0;

        double TOT_COMPAMO = 0, TOT_COMPAMOC = 0, TOT_DIFF_COMPAMO = 0;
        double TOT_TCONAMOC = 0, TOT_COMMAMOC = 0;
        double TOT_IVAAMOUC = 0, TOT_PROPAMOC = 0;
        double TOT_RIVAAMOC = 0, TOT_RICAAMOC = 0, TOT_RFTEAMOC = 0, TOT_NETOAMOC = 0;

        double TOT_DIFF_TCONAMO = 0, TOT_DIFF_COMMAMO = 0;
        double TOT_DIFF_IVAAMOU = 0, TOT_DIFF_PROPAMO = 0;
        double TOT_DIFF_RIVAAMO = 0, TOT_DIFF_RICAAMO = 0;
        double TOT_DIFF_RFTEAMO = 0, TOT_DIFF_NETOAMO = 0;

        double TOT_DIFF_TCONAMOC = 0, TOT_DIFF_COMMAMOC = 0;
        double TOT_DIFF_IVAAMOUC = 0, TOT_DIFF_PROPAMOC = 0;
        double TOT_DIFF_RIVAAMOC = 0, TOT_DIFF_RICAAMOC = 0;
        double TOT_DIFF_RFTEAMOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04378(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_DATETYPE);
            cstmt.setString(5, filter.IN_CODE.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_CURRENCY.trim());
            cstmt.setString(8, filter.IN_MERCHANT.trim());

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TOT_COMPAMO = rst.getDouble("COMPAMO");
                TOT_TCONAMO = rst.getDouble("TCONAMO");
                TOT_COMMAMO = rst.getDouble("COMMAMO");
                TOT_IVAAMOU = rst.getDouble("IVAAMOU");
                TOT_PROPAMO = rst.getDouble("PROPAMO");
                TOT_RIVAAMO = rst.getDouble("RIVAAMO");
                TOT_RICAAMO = rst.getDouble("RICAAMO");
                TOT_RFTEAMO = rst.getDouble("RFTEAMO");
                TOT_NETOAMO = rst.getDouble("NETOAMO");

                TOT_COMPAMOC = rst.getDouble("COMPAMOC");
                TOT_TCONAMOC = rst.getDouble("TCONAMOC");
                TOT_COMMAMOC = rst.getDouble("COMMAMOC");
                TOT_IVAAMOUC = rst.getDouble("IVAAMOUC");
                TOT_PROPAMOC = rst.getDouble("PROPAMOC");
                TOT_RIVAAMOC = rst.getDouble("RIVAAMOC");
                TOT_RICAAMOC = rst.getDouble("RICAAMOC");
                TOT_RFTEAMOC = rst.getDouble("RFTEAMOC");
                TOT_NETOAMOC = rst.getDouble("NETOAMOC");

                //Diferencias
                TOT_DIFF_COMPAMO = TOT_COMPAMO - TOT_COMPAMOC;
                TOT_DIFF_TCONAMO = TOT_TCONAMO - TOT_TCONAMOC;
                TOT_DIFF_COMMAMO = TOT_COMMAMO - TOT_COMMAMOC;
                TOT_DIFF_IVAAMOU = TOT_IVAAMOU - TOT_IVAAMOUC;
                TOT_DIFF_PROPAMO = TOT_PROPAMO - TOT_PROPAMOC;
                TOT_DIFF_RIVAAMO = TOT_RIVAAMO - TOT_RIVAAMOC;
                TOT_DIFF_RICAAMO = TOT_RICAAMO - TOT_RICAAMOC;
                TOT_DIFF_RFTEAMO = TOT_RFTEAMO - TOT_RFTEAMOC;
                TOT_DIFF_NETOAMO = TOT_NETOAMO - TOT_NETOAMOC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new MPF100Filter();
                    beanTkt.IN_DATETYPE = filter.IN_DATETYPE.trim();

                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.strFecFiltro = rst.getString(filter.IN_DATETYPE.trim());

                    beanTkt.COMPAMO = rst.getDouble("COMPAMO");
                    beanTkt.TCONAMO = rst.getDouble("TCONAMO");
                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.IVAAMOU = rst.getDouble("IVAAMOU");
                    beanTkt.PROPAMO = rst.getDouble("PROPAMO");
                    beanTkt.RIVAAMO = rst.getDouble("RIVAAMO");
                    beanTkt.RICAAMO = rst.getDouble("RICAAMO");
                    beanTkt.RFTEAMO = rst.getDouble("RFTEAMO");
                    beanTkt.NETOAMO = rst.getDouble("NETOAMO");
                    beanTkt.COMPAMOC = rst.getDouble("COMPAMOC");
                    beanTkt.TCONAMOC = rst.getDouble("TCONAMOC");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.IVAAMOUC = rst.getDouble("IVAAMOUC");
                    beanTkt.PROPAMOC = rst.getDouble("PROPAMOC");
                    beanTkt.RIVAAMOC = rst.getDouble("RIVAAMOC");
                    beanTkt.RICAAMOC = rst.getDouble("RICAAMOC");
                    beanTkt.RFTEAMOC = rst.getDouble("RFTEAMOC");
                    beanTkt.NETOAMOC = rst.getDouble("NETOAMOC");

                    //DIFERENCIAS
                    beanTkt.DIFF_COMPAMO = beanTkt.COMPAMO - beanTkt.COMPAMOC;
                    beanTkt.DIFF_TCONAMO = beanTkt.TCONAMO - beanTkt.TCONAMOC;
                    beanTkt.DIFF_COMMAMO = beanTkt.COMMAMO - beanTkt.COMMAMOC;
                    beanTkt.DIFF_IVAAMOU = beanTkt.IVAAMOU - beanTkt.IVAAMOUC;
                    beanTkt.DIFF_PROPAMO = beanTkt.PROPAMO - beanTkt.PROPAMOC;
                    beanTkt.DIFF_RIVAAMO = beanTkt.RIVAAMO - beanTkt.RIVAAMOC;
                    beanTkt.DIFF_RICAAMO = beanTkt.RICAAMO - beanTkt.RICAAMOC;
                    beanTkt.DIFF_RFTEAMO = beanTkt.RFTEAMO - beanTkt.RFTEAMOC;
                    beanTkt.DIFF_NETOAMO = beanTkt.NETOAMO - beanTkt.NETOAMOC;

                    //TOTALES
                    beanTkt.TOT_COMPAMO = TOT_COMPAMO;
                    beanTkt.TOT_TCONAMO = TOT_TCONAMO;
                    beanTkt.TOT_COMMAMO = TOT_COMMAMO;
                    beanTkt.TOT_IVAAMOU = TOT_IVAAMOU;
                    beanTkt.TOT_PROPAMO = TOT_PROPAMO;
                    beanTkt.TOT_RIVAAMO = TOT_RIVAAMO;
                    beanTkt.TOT_RICAAMO = TOT_RICAAMO;
                    beanTkt.TOT_RFTEAMO = TOT_RFTEAMO;
                    beanTkt.TOT_NETOAMO = TOT_NETOAMO;

                    beanTkt.TOT_COMPAMOC = TOT_COMPAMOC;
                    beanTkt.TOT_TCONAMOC = TOT_TCONAMOC;
                    beanTkt.TOT_COMMAMOC = TOT_COMMAMOC;
                    beanTkt.TOT_IVAAMOUC = TOT_IVAAMOUC;
                    beanTkt.TOT_PROPAMOC = TOT_PROPAMOC;
                    beanTkt.TOT_RIVAAMOC = TOT_RIVAAMOC;
                    beanTkt.TOT_RICAAMOC = TOT_RICAAMOC;
                    beanTkt.TOT_RFTEAMOC = TOT_RFTEAMOC;
                    beanTkt.TOT_NETOAMOC = TOT_NETOAMOC;

                    //DIFERENCIA DE TOTALES
                    beanTkt.TOT_DIFF_COMPAMO = TOT_DIFF_COMPAMO;
                    beanTkt.TOT_DIFF_TCONAMO = TOT_DIFF_TCONAMO;
                    beanTkt.TOT_DIFF_COMMAMO = TOT_DIFF_COMMAMO;
                    beanTkt.TOT_DIFF_IVAAMOU = TOT_DIFF_IVAAMOU;
                    beanTkt.TOT_DIFF_PROPAMO = TOT_DIFF_PROPAMO;
                    beanTkt.TOT_DIFF_RIVAAMO = TOT_DIFF_RIVAAMO;
                    beanTkt.TOT_DIFF_RICAAMO = TOT_DIFF_RICAAMO;
                    beanTkt.TOT_DIFF_RFTEAMO = TOT_DIFF_RFTEAMO;
                    beanTkt.TOT_DIFF_NETOAMO = TOT_DIFF_NETOAMO;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lstTkts;
    }

    public List<MPF100Filter> loadPX615SQP04910(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        double TOT_TCONAMO = 0, TOT_COMMAMO = 0, TOT_IVAAMOU = 0, TOT_PROPAMO = 0, TOT_RIVAAMO = 0, TOT_RICAAMO = 0;
        double TOT_RFTEAMO = 0, TOT_NETOAMO = 0;

        double TOT_COMPAMO = 0, TOT_COMPAMOC = 0, TOT_DIFF_COMPAMO = 0;
        double TOT_TCONAMOC = 0, TOT_COMMAMOC = 0;
        double TOT_IVAAMOUC = 0, TOT_PROPAMOC = 0;
        double TOT_RIVAAMOC = 0, TOT_RICAAMOC = 0, TOT_RFTEAMOC = 0, TOT_NETOAMOC = 0;

        double TOT_DIFF_TCONAMO = 0, TOT_DIFF_COMMAMO = 0;
        double TOT_DIFF_IVAAMOU = 0, TOT_DIFF_PROPAMO = 0;
        double TOT_DIFF_RIVAAMO = 0, TOT_DIFF_RICAAMO = 0;
        double TOT_DIFF_RFTEAMO = 0, TOT_DIFF_NETOAMO = 0;

        double TOT_DIFF_TCONAMOC = 0, TOT_DIFF_COMMAMOC = 0;
        double TOT_DIFF_IVAAMOUC = 0, TOT_DIFF_PROPAMOC = 0;
        double TOT_DIFF_RIVAAMOC = 0, TOT_DIFF_RICAAMOC = 0;
        double TOT_DIFF_RFTEAMOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04910(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA);
            cstmt.setString(3, filter.IN_DATETYPE);

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TOT_COMPAMO = rst.getDouble("COMPAMO");
                TOT_TCONAMO = rst.getDouble("TCONAMO");
                TOT_COMMAMO = rst.getDouble("COMMAMO");
                TOT_IVAAMOU = rst.getDouble("IVAAMOU");
                TOT_PROPAMO = rst.getDouble("PROPAMO");
                TOT_RIVAAMO = rst.getDouble("RIVAAMO");
                TOT_RICAAMO = rst.getDouble("RICAAMO");
                TOT_RFTEAMO = rst.getDouble("RFTEAMO");
                TOT_NETOAMO = rst.getDouble("NETOAMO");

                TOT_COMPAMOC = rst.getDouble("COMPAMOC");
                TOT_TCONAMOC = rst.getDouble("TCONAMOC");
                TOT_COMMAMOC = rst.getDouble("COMMAMOC");
                TOT_IVAAMOUC = rst.getDouble("IVAAMOUC");
                TOT_PROPAMOC = rst.getDouble("PROPAMOC");
                TOT_RIVAAMOC = rst.getDouble("RIVAAMOC");
                TOT_RICAAMOC = rst.getDouble("RICAAMOC");
                TOT_RFTEAMOC = rst.getDouble("RFTEAMOC");
                TOT_NETOAMOC = rst.getDouble("NETOAMOC");

                //Diferencias
                TOT_DIFF_COMPAMO = TOT_COMPAMO - TOT_COMPAMOC;
                TOT_DIFF_TCONAMO = TOT_TCONAMO - TOT_TCONAMOC;
                TOT_DIFF_COMMAMO = TOT_COMMAMO - TOT_COMMAMOC;
                TOT_DIFF_IVAAMOU = TOT_IVAAMOU - TOT_IVAAMOUC;
                TOT_DIFF_PROPAMO = TOT_PROPAMO - TOT_PROPAMOC;
                TOT_DIFF_RIVAAMO = TOT_RIVAAMO - TOT_RIVAAMOC;
                TOT_DIFF_RICAAMO = TOT_RICAAMO - TOT_RICAAMOC;
                TOT_DIFF_RFTEAMO = TOT_RFTEAMO - TOT_RFTEAMOC;
                TOT_DIFF_NETOAMO = TOT_NETOAMO - TOT_NETOAMOC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new MPF100Filter();
                    beanTkt.IN_DATETYPE = filter.IN_DATETYPE.trim();

                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY");
                    beanTkt.strFecFiltro = rst.getString(filter.IN_DATETYPE.trim());
                    
                    beanTkt.COMPAMO = rst.getDouble("COMPAMO");
                    beanTkt.TCONAMO = rst.getDouble("TCONAMO");
                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.IVAAMOU = rst.getDouble("IVAAMOU");
                    beanTkt.PROPAMO = rst.getDouble("PROPAMO");
                    beanTkt.RIVAAMO = rst.getDouble("RIVAAMO");
                    beanTkt.RICAAMO = rst.getDouble("RICAAMO");
                    beanTkt.RFTEAMO = rst.getDouble("RFTEAMO");
                    beanTkt.NETOAMO = rst.getDouble("NETOAMO");
                    beanTkt.COMPAMOC = rst.getDouble("COMPAMOC");
                    beanTkt.TCONAMOC = rst.getDouble("TCONAMOC");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.IVAAMOUC = rst.getDouble("IVAAMOUC");
                    beanTkt.PROPAMOC = rst.getDouble("PROPAMOC");
                    beanTkt.RIVAAMOC = rst.getDouble("RIVAAMOC");
                    beanTkt.RICAAMOC = rst.getDouble("RICAAMOC");
                    beanTkt.RFTEAMOC = rst.getDouble("RFTEAMOC");
                    beanTkt.NETOAMOC = rst.getDouble("NETOAMOC");

                    //DIFERENCIAS
                    beanTkt.DIFF_COMPAMO = beanTkt.COMPAMO - beanTkt.COMPAMOC;
                    beanTkt.DIFF_TCONAMO = beanTkt.TCONAMO - beanTkt.TCONAMOC;
                    beanTkt.DIFF_COMMAMO = beanTkt.COMMAMO - beanTkt.COMMAMOC;
                    beanTkt.DIFF_IVAAMOU = beanTkt.IVAAMOU - beanTkt.IVAAMOUC;
                    beanTkt.DIFF_PROPAMO = beanTkt.PROPAMO - beanTkt.PROPAMOC;
                    beanTkt.DIFF_RIVAAMO = beanTkt.RIVAAMO - beanTkt.RIVAAMOC;
                    beanTkt.DIFF_RICAAMO = beanTkt.RICAAMO - beanTkt.RICAAMOC;
                    beanTkt.DIFF_RFTEAMO = beanTkt.RFTEAMO - beanTkt.RFTEAMOC;
                    beanTkt.DIFF_NETOAMO = beanTkt.NETOAMO - beanTkt.NETOAMOC;

                    //TOTALES
                    beanTkt.TOT_COMPAMO = TOT_COMPAMO;
                    beanTkt.TOT_TCONAMO = TOT_TCONAMO;
                    beanTkt.TOT_COMMAMO = TOT_COMMAMO;
                    beanTkt.TOT_IVAAMOU = TOT_IVAAMOU;
                    beanTkt.TOT_PROPAMO = TOT_PROPAMO;
                    beanTkt.TOT_RIVAAMO = TOT_RIVAAMO;
                    beanTkt.TOT_RICAAMO = TOT_RICAAMO;
                    beanTkt.TOT_RFTEAMO = TOT_RFTEAMO;
                    beanTkt.TOT_NETOAMO = TOT_NETOAMO;

                    beanTkt.TOT_COMPAMOC = TOT_COMPAMOC;
                    beanTkt.TOT_TCONAMOC = TOT_TCONAMOC;
                    beanTkt.TOT_COMMAMOC = TOT_COMMAMOC;
                    beanTkt.TOT_IVAAMOUC = TOT_IVAAMOUC;
                    beanTkt.TOT_PROPAMOC = TOT_PROPAMOC;
                    beanTkt.TOT_RIVAAMOC = TOT_RIVAAMOC;
                    beanTkt.TOT_RICAAMOC = TOT_RICAAMOC;
                    beanTkt.TOT_RFTEAMOC = TOT_RFTEAMOC;
                    beanTkt.TOT_NETOAMOC = TOT_NETOAMOC;

                    //DIFERENCIA DE TOTALES
                    beanTkt.TOT_DIFF_COMPAMO = TOT_DIFF_COMPAMO;
                    beanTkt.TOT_DIFF_TCONAMO = TOT_DIFF_TCONAMO;
                    beanTkt.TOT_DIFF_COMMAMO = TOT_DIFF_COMMAMO;
                    beanTkt.TOT_DIFF_IVAAMOU = TOT_DIFF_IVAAMOU;
                    beanTkt.TOT_DIFF_PROPAMO = TOT_DIFF_PROPAMO;
                    beanTkt.TOT_DIFF_RIVAAMO = TOT_DIFF_RIVAAMO;
                    beanTkt.TOT_DIFF_RICAAMO = TOT_DIFF_RICAAMO;
                    beanTkt.TOT_DIFF_RFTEAMO = TOT_DIFF_RFTEAMO;
                    beanTkt.TOT_DIFF_NETOAMO = TOT_DIFF_NETOAMO;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lstTkts;
    }

    public List<MPF100Filter> loadPX615SQP04907(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        double TOT_TCONAMO = 0, TOT_COMMAMO = 0, TOT_IVAAMOU = 0, TOT_PROPAMO = 0, TOT_RIVAAMO = 0, TOT_RICAAMO = 0;
        double TOT_RFTEAMO = 0, TOT_NETOAMO = 0;

        double TOT_COMPAMO = 0, TOT_COMPAMOC = 0, TOT_DIFF_COMPAMO = 0;
        double TOT_TCONAMOC = 0, TOT_COMMAMOC = 0;
        double TOT_IVAAMOUC = 0, TOT_PROPAMOC = 0;
        double TOT_RIVAAMOC = 0, TOT_RICAAMOC = 0, TOT_RFTEAMOC = 0, TOT_NETOAMOC = 0;

        double TOT_DIFF_TCONAMO = 0, TOT_DIFF_COMMAMO = 0;
        double TOT_DIFF_IVAAMOU = 0, TOT_DIFF_PROPAMO = 0;
        double TOT_DIFF_RIVAAMO = 0, TOT_DIFF_RICAAMO = 0;
        double TOT_DIFF_RFTEAMO = 0, TOT_DIFF_NETOAMO = 0;

        double TOT_DIFF_TCONAMOC = 0, TOT_DIFF_COMMAMOC = 0;
        double TOT_DIFF_IVAAMOUC = 0, TOT_DIFF_PROPAMOC = 0;
        double TOT_DIFF_RIVAAMOC = 0, TOT_DIFF_RICAAMOC = 0;
        double TOT_DIFF_RFTEAMOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04907(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA.trim());
            cstmt.setString(3, filter.IN_DATETYPE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SCURRENCY.trim());

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TOT_COMPAMO = rst.getDouble("COMPAMO");
                TOT_TCONAMO = rst.getDouble("TCONAMO");
                TOT_COMMAMO = rst.getDouble("COMMAMO");
                TOT_IVAAMOU = rst.getDouble("IVAAMOU");
                TOT_PROPAMO = rst.getDouble("PROPAMO");
                TOT_RIVAAMO = rst.getDouble("RIVAAMO");
                TOT_RICAAMO = rst.getDouble("RICAAMO");
                TOT_RFTEAMO = rst.getDouble("RFTEAMO");
                TOT_NETOAMO = rst.getDouble("NETOAMO");

                TOT_COMPAMOC = rst.getDouble("COMPAMOC");
                TOT_TCONAMOC = rst.getDouble("TCONAMOC");
                TOT_COMMAMOC = rst.getDouble("COMMAMOC");
                TOT_IVAAMOUC = rst.getDouble("IVAAMOUC");
                TOT_PROPAMOC = rst.getDouble("PROPAMOC");
                TOT_RIVAAMOC = rst.getDouble("RIVAAMOC");
                TOT_RICAAMOC = rst.getDouble("RICAAMOC");
                TOT_RFTEAMOC = rst.getDouble("RFTEAMOC");
                TOT_NETOAMOC = rst.getDouble("NETOAMOC");

                //Diferencias
                TOT_DIFF_COMPAMO = TOT_COMPAMO - TOT_COMPAMOC;
                TOT_DIFF_TCONAMO = TOT_TCONAMO - TOT_TCONAMOC;
                TOT_DIFF_COMMAMO = TOT_COMMAMO - TOT_COMMAMOC;
                TOT_DIFF_IVAAMOU = TOT_IVAAMOU - TOT_IVAAMOUC;
                TOT_DIFF_PROPAMO = TOT_PROPAMO - TOT_PROPAMOC;
                TOT_DIFF_RIVAAMO = TOT_RIVAAMO - TOT_RIVAAMOC;
                TOT_DIFF_RICAAMO = TOT_RICAAMO - TOT_RICAAMOC;
                TOT_DIFF_RFTEAMO = TOT_RFTEAMO - TOT_RFTEAMOC;
                TOT_DIFF_NETOAMO = TOT_NETOAMO - TOT_NETOAMOC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new MPF100Filter();
                    beanTkt.IN_DATETYPE = filter.IN_DATETYPE.trim();

                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.MERCHNC = rst.getString("MERCHNC").trim();
                    beanTkt.strFecFiltro = rst.getString(filter.IN_DATETYPE.trim());

                    beanTkt.COMPAMO = rst.getDouble("COMPAMO");
                    beanTkt.TCONAMO = rst.getDouble("TCONAMO");
                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.IVAAMOU = rst.getDouble("IVAAMOU");
                    beanTkt.PROPAMO = rst.getDouble("PROPAMO");
                    beanTkt.RIVAAMO = rst.getDouble("RIVAAMO");
                    beanTkt.RICAAMO = rst.getDouble("RICAAMO");
                    beanTkt.RFTEAMO = rst.getDouble("RFTEAMO");
                    beanTkt.NETOAMO = rst.getDouble("NETOAMO");
                    beanTkt.COMPAMOC = rst.getDouble("COMPAMOC");
                    beanTkt.TCONAMOC = rst.getDouble("TCONAMOC");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.IVAAMOUC = rst.getDouble("IVAAMOUC");
                    beanTkt.PROPAMOC = rst.getDouble("PROPAMOC");
                    beanTkt.RIVAAMOC = rst.getDouble("RIVAAMOC");
                    beanTkt.RICAAMOC = rst.getDouble("RICAAMOC");
                    beanTkt.RFTEAMOC = rst.getDouble("RFTEAMOC");
                    beanTkt.NETOAMOC = rst.getDouble("NETOAMOC");

                    //DIFERENCIAS
                    beanTkt.DIFF_COMPAMO = beanTkt.COMPAMO - beanTkt.COMPAMOC;
                    beanTkt.DIFF_TCONAMO = beanTkt.TCONAMO - beanTkt.TCONAMOC;
                    beanTkt.DIFF_COMMAMO = beanTkt.COMMAMO - beanTkt.COMMAMOC;
                    beanTkt.DIFF_IVAAMOU = beanTkt.IVAAMOU - beanTkt.IVAAMOUC;
                    beanTkt.DIFF_PROPAMO = beanTkt.PROPAMO - beanTkt.PROPAMOC;
                    beanTkt.DIFF_RIVAAMO = beanTkt.RIVAAMO - beanTkt.RIVAAMOC;
                    beanTkt.DIFF_RICAAMO = beanTkt.RICAAMO - beanTkt.RICAAMOC;
                    beanTkt.DIFF_RFTEAMO = beanTkt.RFTEAMO - beanTkt.RFTEAMOC;
                    beanTkt.DIFF_NETOAMO = beanTkt.NETOAMO - beanTkt.NETOAMOC;

                    //TOTALES
                    beanTkt.TOT_COMPAMO = TOT_COMPAMO;
                    beanTkt.TOT_TCONAMO = TOT_TCONAMO;
                    beanTkt.TOT_COMMAMO = TOT_COMMAMO;
                    beanTkt.TOT_IVAAMOU = TOT_IVAAMOU;
                    beanTkt.TOT_PROPAMO = TOT_PROPAMO;
                    beanTkt.TOT_RIVAAMO = TOT_RIVAAMO;
                    beanTkt.TOT_RICAAMO = TOT_RICAAMO;
                    beanTkt.TOT_RFTEAMO = TOT_RFTEAMO;
                    beanTkt.TOT_NETOAMO = TOT_NETOAMO;

                    beanTkt.TOT_COMPAMOC = TOT_COMPAMOC;
                    beanTkt.TOT_TCONAMOC = TOT_TCONAMOC;
                    beanTkt.TOT_COMMAMOC = TOT_COMMAMOC;
                    beanTkt.TOT_IVAAMOUC = TOT_IVAAMOUC;
                    beanTkt.TOT_PROPAMOC = TOT_PROPAMOC;
                    beanTkt.TOT_RIVAAMOC = TOT_RIVAAMOC;
                    beanTkt.TOT_RICAAMOC = TOT_RICAAMOC;
                    beanTkt.TOT_RFTEAMOC = TOT_RFTEAMOC;
                    beanTkt.TOT_NETOAMOC = TOT_NETOAMOC;

                    //DIFERENCIA DE TOTALES
                    beanTkt.TOT_DIFF_COMPAMO = TOT_DIFF_COMPAMO;
                    beanTkt.TOT_DIFF_TCONAMO = TOT_DIFF_TCONAMO;
                    beanTkt.TOT_DIFF_COMMAMO = TOT_DIFF_COMMAMO;
                    beanTkt.TOT_DIFF_IVAAMOU = TOT_DIFF_IVAAMOU;
                    beanTkt.TOT_DIFF_PROPAMO = TOT_DIFF_PROPAMO;
                    beanTkt.TOT_DIFF_RIVAAMO = TOT_DIFF_RIVAAMO;
                    beanTkt.TOT_DIFF_RICAAMO = TOT_DIFF_RICAAMO;
                    beanTkt.TOT_DIFF_RFTEAMO = TOT_DIFF_RFTEAMO;
                    beanTkt.TOT_DIFF_NETOAMO = TOT_DIFF_NETOAMO;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lstTkts;
    }

    public List<MPF100Filter> loadPX615SQP04908(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100Filter> lstTkts = new ArrayList<MPF100Filter>(0);
        MPF100Filter beanTkt;
        double TOT_TCONAMO = 0, TOT_COMMAMO = 0, TOT_IVAAMOU = 0, TOT_PROPAMO = 0, TOT_RIVAAMO = 0, TOT_RICAAMO = 0;
        double TOT_RFTEAMO = 0, TOT_NETOAMO = 0;
        
        double TOT_COMPAMO = 0, TOT_COMPAMOC = 0, TOT_DIFF_COMPAMO = 0;
        double TOT_TCONAMOC = 0, TOT_COMMAMOC = 0;
        double TOT_IVAAMOUC = 0, TOT_PROPAMOC = 0;
        double TOT_RIVAAMOC = 0, TOT_RICAAMOC = 0, TOT_RFTEAMOC = 0, TOT_NETOAMOC = 0;

        double TOT_DIFF_TCONAMO = 0, TOT_DIFF_COMMAMO = 0;
        double TOT_DIFF_IVAAMOU = 0, TOT_DIFF_PROPAMO = 0;
        double TOT_DIFF_RIVAAMO = 0, TOT_DIFF_RICAAMO = 0;
        double TOT_DIFF_RFTEAMO = 0, TOT_DIFF_NETOAMO = 0;

        double TOT_DIFF_TCONAMOC = 0, TOT_DIFF_COMMAMOC = 0;
        double TOT_DIFF_IVAAMOUC = 0, TOT_DIFF_PROPAMOC = 0;
        double TOT_DIFF_RIVAAMOC = 0, TOT_DIFF_RICAAMOC = 0;
        double TOT_DIFF_RFTEAMOC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04908(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA.trim());
            cstmt.setString(3, filter.IN_DATETYPE.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setString(5, filter.SCURRENCY.trim());
            cstmt.setString(6, filter.MERCHNC.trim());

            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TOT_COMPAMO = rst.getDouble("COMPAMO");
                TOT_TCONAMO = rst.getDouble("TCONAMO");
                TOT_COMMAMO = rst.getDouble("COMMAMO");
                TOT_IVAAMOU = rst.getDouble("IVAAMOU");
                TOT_PROPAMO = rst.getDouble("PROPAMO");
                TOT_RIVAAMO = rst.getDouble("RIVAAMO");
                TOT_RICAAMO = rst.getDouble("RICAAMO");
                TOT_RFTEAMO = rst.getDouble("RFTEAMO");
                TOT_NETOAMO = rst.getDouble("NETOAMO");

                TOT_COMPAMOC = rst.getDouble("COMPAMOC");
                TOT_TCONAMOC = rst.getDouble("TCONAMOC");
                TOT_COMMAMOC = rst.getDouble("COMMAMOC");
                TOT_IVAAMOUC = rst.getDouble("IVAAMOUC");
                TOT_PROPAMOC = rst.getDouble("PROPAMOC");
                TOT_RIVAAMOC = rst.getDouble("RIVAAMOC");
                TOT_RICAAMOC = rst.getDouble("RICAAMOC");
                TOT_RFTEAMOC = rst.getDouble("RFTEAMOC");
                TOT_NETOAMOC = rst.getDouble("NETOAMOC");

                //Diferencias
                TOT_DIFF_COMPAMO = TOT_COMPAMO - TOT_COMPAMOC;
                TOT_DIFF_TCONAMO = TOT_TCONAMO - TOT_TCONAMOC;
                TOT_DIFF_COMMAMO = TOT_COMMAMO - TOT_COMMAMOC;
                TOT_DIFF_IVAAMOU = TOT_IVAAMOU - TOT_IVAAMOUC;
                TOT_DIFF_PROPAMO = TOT_PROPAMO - TOT_PROPAMOC;
                TOT_DIFF_RIVAAMO = TOT_RIVAAMO - TOT_RIVAAMOC;
                TOT_DIFF_RICAAMO = TOT_RICAAMO - TOT_RICAAMOC;
                TOT_DIFF_RFTEAMO = TOT_RFTEAMO - TOT_RFTEAMOC;
                TOT_DIFF_NETOAMO = TOT_NETOAMO - TOT_NETOAMOC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new MPF100Filter();
                    beanTkt.IN_DATETYPE = filter.IN_DATETYPE.trim();
                    beanTkt.strFecFiltro = rst.getString(filter.IN_DATETYPE.trim());

                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.MERCHNC = rst.getString("MERCHNC").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SCARCOD = rst.getString("SCARCOD").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();

                    beanTkt.COMPAMO = rst.getDouble("COMPAMO");
                    beanTkt.TCONAMO = rst.getDouble("TCONAMO");
                    beanTkt.COMMAMO = rst.getDouble("COMMAMO");
                    beanTkt.IVAAMOU = rst.getDouble("IVAAMOU");
                    beanTkt.PROPAMO = rst.getDouble("PROPAMO");
                    beanTkt.RIVAAMO = rst.getDouble("RIVAAMO");
                    beanTkt.RICAAMO = rst.getDouble("RICAAMO");
                    beanTkt.RFTEAMO = rst.getDouble("RFTEAMO");
                    beanTkt.NETOAMO = rst.getDouble("NETOAMO");
                    beanTkt.COMPAMOC = rst.getDouble("COMPAMOC");
                    beanTkt.TCONAMOC = rst.getDouble("TCONAMOC");
                    beanTkt.COMMAMOC = rst.getDouble("COMMAMOC");
                    beanTkt.IVAAMOUC = rst.getDouble("IVAAMOUC");
                    beanTkt.PROPAMOC = rst.getDouble("PROPAMOC");
                    beanTkt.RIVAAMOC = rst.getDouble("RIVAAMOC");
                    beanTkt.RICAAMOC = rst.getDouble("RICAAMOC");
                    beanTkt.RFTEAMOC = rst.getDouble("RFTEAMOC");
                    beanTkt.NETOAMOC = rst.getDouble("NETOAMOC");

                    //DIFERENCIAS
                    beanTkt.DIFF_COMPAMO = beanTkt.COMPAMO - beanTkt.COMPAMOC;
                    beanTkt.DIFF_TCONAMO = beanTkt.TCONAMO - beanTkt.TCONAMOC;
                    beanTkt.DIFF_COMMAMO = beanTkt.COMMAMO - beanTkt.COMMAMOC;
                    beanTkt.DIFF_IVAAMOU = beanTkt.IVAAMOU - beanTkt.IVAAMOUC;
                    beanTkt.DIFF_PROPAMO = beanTkt.PROPAMO - beanTkt.PROPAMOC;
                    beanTkt.DIFF_RIVAAMO = beanTkt.RIVAAMO - beanTkt.RIVAAMOC;
                    beanTkt.DIFF_RICAAMO = beanTkt.RICAAMO - beanTkt.RICAAMOC;
                    beanTkt.DIFF_RFTEAMO = beanTkt.RFTEAMO - beanTkt.RFTEAMOC;
                    beanTkt.DIFF_NETOAMO = beanTkt.NETOAMO - beanTkt.NETOAMOC;

                    //TOTALES
                    beanTkt.TOT_COMPAMO = TOT_COMPAMO;
                    beanTkt.TOT_TCONAMO = TOT_TCONAMO;
                    beanTkt.TOT_COMMAMO = TOT_COMMAMO;
                    beanTkt.TOT_IVAAMOU = TOT_IVAAMOU;
                    beanTkt.TOT_PROPAMO = TOT_PROPAMO;
                    beanTkt.TOT_RIVAAMO = TOT_RIVAAMO;
                    beanTkt.TOT_RICAAMO = TOT_RICAAMO;
                    beanTkt.TOT_RFTEAMO = TOT_RFTEAMO;
                    beanTkt.TOT_NETOAMO = TOT_NETOAMO;

                    beanTkt.TOT_COMPAMOC = TOT_COMPAMOC;
                    beanTkt.TOT_TCONAMOC = TOT_TCONAMOC;
                    beanTkt.TOT_COMMAMOC = TOT_COMMAMOC;
                    beanTkt.TOT_IVAAMOUC = TOT_IVAAMOUC;
                    beanTkt.TOT_PROPAMOC = TOT_PROPAMOC;
                    beanTkt.TOT_RIVAAMOC = TOT_RIVAAMOC;
                    beanTkt.TOT_RICAAMOC = TOT_RICAAMOC;
                    beanTkt.TOT_RFTEAMOC = TOT_RFTEAMOC;
                    beanTkt.TOT_NETOAMOC = TOT_NETOAMOC;

                    //DIFERENCIA DE TOTALES
                    beanTkt.TOT_DIFF_COMPAMO = TOT_DIFF_COMPAMO;
                    beanTkt.TOT_DIFF_TCONAMO = TOT_DIFF_TCONAMO;
                    beanTkt.TOT_DIFF_COMMAMO = TOT_DIFF_COMMAMO;
                    beanTkt.TOT_DIFF_IVAAMOU = TOT_DIFF_IVAAMOU;
                    beanTkt.TOT_DIFF_PROPAMO = TOT_DIFF_PROPAMO;
                    beanTkt.TOT_DIFF_RIVAAMO = TOT_DIFF_RIVAAMO;
                    beanTkt.TOT_DIFF_RICAAMO = TOT_DIFF_RICAAMO;
                    beanTkt.TOT_DIFF_RFTEAMO = TOT_DIFF_RFTEAMO;
                    beanTkt.TOT_DIFF_NETOAMO = TOT_DIFF_NETOAMO;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return lstTkts;
    }
}
