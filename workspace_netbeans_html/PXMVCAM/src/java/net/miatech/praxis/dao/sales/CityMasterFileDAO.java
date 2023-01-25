package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CityMasterFileDAO {
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CityMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
//    public List<A1007> loadCityReport(A1007 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
//
//        A1007 ciudad;
//        List<A1007> listaData = new ArrayList<>();
//        int rowsPag = 20;
//        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = -1;
//
//        if (filter.strExcel.equals("TRUE")) {
//            totRowsPag = -1;
//        }
//        
//        if (filter.intCurrentPg > 0) {
//            PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
//        }
//        try {
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A1007(?,?,?,?,?,?,?,?)}";
//
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cs = cnx.prepareCall(strSQL);
//
//            cs.registerOutParameter(5, Types.INTEGER);
//            cs.registerOutParameter(6, Types.INTEGER);
//            cs.registerOutParameter(7, Types.INTEGER);
//            cs.registerOutParameter(8, Types.INTEGER);
//
//            cs.setString(1, filter.A1007CTATO);
//            cs.setString(2, filter.A1007CIUD);
//            cs.setString(3, filter.A1007PAIS);
//            cs.setString(4, filter.A1007NOMCD.toUpperCase());
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
//                ciudad.PAGNUM = ciudad.intCurrentPg;
//                ciudad.PAGROW = ciudad.intPageRws;
//                ciudad.TOTPAG = ciudad.intTotalPgs;
//                ciudad.TOTROW = ciudad.intTotalRws;
//
//                listaData.add(ciudad);
//            }
//        } finally {
//            setClose();
//        }
//        
//        return listaData;
//    }
    
    public List<A1007> loadCityReport(A1007 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A1007 ciudad;
        List<A1007> listaData = new ArrayList<A1007>();
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = -1;

        Connection cnx = null;

        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX019S01A1007(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, filter.A1007CTATO.trim());
            cs.setString(2, filter.A1007CIUD.trim());
            cs.setString(3, filter.A1007PAIS.trim());
            cs.setString(4, filter.A1007NOMCD.trim().toUpperCase());
            cs.setInt(5, PAGINIT);
            cs.setInt(6, totRowsPag);
            cs.setInt(7, totRows);
            cs.setInt(8, filter.intTotalRws);
            cs.execute();

            filter.intCurrentPg = cs.getInt(5);
            filter.intPageRws = cs.getInt(6);
            filter.intTotalPgs = cs.getInt(7);
            filter.intTotalRws = cs.getInt(8);

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(7)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(8);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.intTotalPgs = totPAGS;

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                ciudad = new A1007();
                ciudad.A1007CTATO = rst.getString("A1007CTATO").trim();
                ciudad.A1007NOMBR = rst.getString("A1007NOMBR").trim().toUpperCase();
                ciudad.A1007CATEG = rst.getString("A1007CATEG").trim().toUpperCase();
                ciudad.A1007CIUD = rst.getString("A1007CIUD").trim().toUpperCase();
                ciudad.A1007NOMCD = rst.getString("A1007NOMCD").trim().toUpperCase();
                ciudad.A1007STATE = rst.getString("A1007STATE").trim().toUpperCase();
                ciudad.A1007PAIS = rst.getString("A1007PAIS").trim().toUpperCase();
                ciudad.A1007TIMZ = rst.getString("A1007TIMZ").trim().toUpperCase();
                ciudad.A1007STAT = rst.getString("A1007STAT").trim().toUpperCase();
                ciudad.A1007REGIS = rst.getString("A1007REGIS").trim().toUpperCase();
                ciudad.A1007FREGI = rst.getString("A1007FREGI").trim();
                ciudad.A1007HREGI = rst.getString("A1007HREGI").trim();
                ciudad.A1007REVIS = rst.getString("A1007REVIS").trim().toUpperCase();
                ciudad.A1007FREVI = rst.getString("A1007FREVI").trim();
                ciudad.A1007HREVI = rst.getString("A1007HREVI").trim();
                ciudad.A1007LONG = rst.getDouble("A1007LONG");
                ciudad.A1007LATI = rst.getDouble("A1007LATI");
                ciudad.strNomPais = rst.getString("A006PAIS");

                if (hmPaises.containsKey(rst.getString("A1007PAIS").trim().toUpperCase())) {
                    ciudad.strNomPais = hmPaises.get(rst.getString("A1007PAIS").trim()).toString();
                }
                //Paginación ===================================================                
                ciudad.intCurrentPg = filter.intCurrentPg / filter.intPageRws + 1;
                ciudad.intPageRws = filter.intPageRws;
                ciudad.intTotalPgs = filter.intTotalPgs;
                ciudad.intTotalRws = filter.intTotalRws;

                listaData.add(ciudad);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }

        } finally {
            if (rst != null) {
                try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cs != null) {
                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);

        }
        return listaData;
    }
    
    public List<A1007> loadCityReport6EXCEL(A1007 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
         A1007 objRtn;
        List<A1007> lstRtn = new ArrayList<A1007>();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX019S01A1007(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

              cstmt01.setString(1, filter.A1007CTATO.trim());
            cstmt01.setString(2, filter.A1007CIUD.trim());
            cstmt01.setString(3, filter.A1007PAIS.trim());
            cstmt01.setString(4, filter.A1007NOMCD.trim().toUpperCase());

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
             int pos = 0;
            while (rs01.next()) {

                pos++;
                objRtn = new A1007();
                objRtn.A1007CTATO = rs01.getString("A1007CTATO").trim();
                objRtn.A1007NOMBR = rs01.getString("A1007NOMBR").trim().toUpperCase();
                objRtn.A1007CATEG = rs01.getString("A1007CATEG").trim().toUpperCase();
                objRtn.A1007CIUD = rs01.getString("A1007CIUD").trim().toUpperCase();
                objRtn.A1007NOMCD = rs01.getString("A1007NOMCD").trim().toUpperCase();
                objRtn.A1007STATE = rs01.getString("A1007STATE").trim().toUpperCase();
                objRtn.A1007PAIS = rs01.getString("A1007PAIS").trim().toUpperCase();
                objRtn.A1007TIMZ = rs01.getString("A1007TIMZ").trim().toUpperCase();
                objRtn.A1007STAT = rs01.getString("A1007STAT").trim().toUpperCase();
                objRtn.A1007REGIS = rs01.getString("A1007REGIS").trim().toUpperCase();
                objRtn.A1007FREGI = rs01.getString("A1007FREGI").trim();
                objRtn.A1007HREGI = rs01.getString("A1007HREGI").trim();
                objRtn.A1007REVIS = rs01.getString("A1007REVIS").trim().toUpperCase();
                objRtn.A1007FREVI = rs01.getString("A1007FREVI").trim();
                objRtn.A1007HREVI = rs01.getString("A1007HREVI").trim();
                objRtn.A1007LONG = rs01.getDouble("A1007LONG");
                objRtn.A1007LATI = rs01.getDouble("A1007LATI");
                objRtn.strNomPais = rs01.getString("A006PAIS");

                if (hmPaises.containsKey(rs01.getString("A1007PAIS").trim().toUpperCase())) {
                    objRtn.strNomPais = hmPaises.get(rs01.getString("A1007PAIS").trim()).toString();
                }

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
    
    public String cityReportMaintance(A1007 filter, String strOption) throws SQLException, Exception {
        String STR_RESULT = "";
        
        strSQL = "{CALL " + session.getMainLibrary() + ".PX019S02A1007(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cs = cnx.prepareCall(strSQL);
        cs.setString(1, strOption);
        cs.setString(2, filter.A1007CTATO);
        cs.setString(3, filter.A1007NOMBR);
        cs.setString(4, filter.A1007CATEG);
        cs.setString(5, filter.A1007CIUD);
        cs.setString(6, filter.A1007NOMCD);
        cs.setString(7, filter.A1007STATE);
        cs.setString(8, filter.A1007PAIS);
        cs.setString(9, filter.A1007TIMZ);
        cs.setString(10, filter.A1007STAT);
        cs.setString(11, session.getUserView().getUserInfo().USR);
        cs.setString(12, Functions.getFechaActual());
        cs.setString(13, Functions.getHoraActual());
        cs.setDouble(14, filter.A1007LONG);
        cs.setDouble(15, filter.A1007LATI);
        cs.execute();
        //result = cs.executeUpdate();
        rst = cs.getResultSet();
        while (rst.next()) {
            STR_RESULT = rst.getString("VMESSAGE");
        }
        setClose();

        return STR_RESULT;
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
