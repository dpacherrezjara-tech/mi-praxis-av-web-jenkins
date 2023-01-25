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
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InterlineAnalysisDAO {

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
    
    public List<SFI040Filter> loadPX237S01SFI040_2(SFI040Filter filter) throws SQLException, Exception {

        List<SFI040Filter> lstRtn = new ArrayList<SFI040Filter>(0);
        SFI040Filter objRtn;
        int PAXFAV = 0, PAXCAR = 0, PAXFAV_LY = 0, PAXCARL_LY = 0;
        double AMTFAV = 0, AMTCAR = 0, AMTFAV_LY = 0, AMTCAR_LY = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX237S01SFI040_2(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, filter.PERNUM);
            cstmt01.setString(5, filter.BAIR);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getInt("PAXFAV");
                PAXCAR = rs01.getInt("PAXCAR");
                AMTFAV = rs01.getDouble("AMTFAV");
                AMTCAR = rs01.getDouble("AMTCAR");
                PAXFAV_LY = rs01.getInt("PAXFAV_LY");
                PAXCARL_LY = rs01.getInt("PAXCAR_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                AMTCAR_LY = rs01.getDouble("AMTCAR_LY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI040Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.BDATE = rs01.getString("MES");
                    objRtn.strFormatDate = Functions.getAbreviaturaMes(objRtn.BDATE);
                    //---------ANIO DEL FILTRO-------
                    //A FAVOR
                    objRtn.NUMREC = rs01.getInt("PAXFAV");
                    objRtn.TNET = rs01.getDouble("AMTFAV");
                    //A CARGO
                    objRtn.QITEMSCAR = rs01.getInt("PAXCAR");
                    objRtn.TNETOCAR = rs01.getDouble("AMTCAR");

                    //-------ANIO ANTERIOR---------------
                    //A FAVOR
                    objRtn.QITEMS_LY = rs01.getInt("PAXFAV_LY");
                    objRtn.TNETO_LY = rs01.getDouble("AMTFAV_LY");
                    //A CARGO
                    objRtn.QITEMSCAR_LY = rs01.getInt("PAXCAR_LY");
                    objRtn.TNETOCAR_LY = rs01.getDouble("AMTCAR_LY");

                    objRtn.diffQITEMS = objRtn.QITEMSCAR - objRtn.NUMREC;
                    objRtn.diffTNETO = objRtn.TNETOCAR - objRtn.TNET;
                    objRtn.diffQITEMS_LY = objRtn.QITEMSCAR_LY - objRtn.QITEMS_LY;
                    objRtn.diffTNETO_LY = objRtn.TNETOCAR_LY - objRtn.TNETO_LY;
                    if (objRtn.diffQITEMS < 0) {
                        objRtn.strDescripcion = "rojo";
                    }
                    if (objRtn.diffQITEMS_LY < 0) {
                        objRtn.strDescripcion2 = "rojo";
                    }

                    //A FAVOR (LY=LAST YEAR))
                    objRtn.totQITEMS = PAXFAV;
                    objRtn.totTNETO = AMTFAV;
                    objRtn.totQITEMS_LY = PAXFAV_LY;
                    objRtn.totTNETO_LY = AMTFAV_LY;

                    //A CARGOO
                    objRtn.totGROSSI = PAXCAR;//QITEMS
                    objRtn.totISCI = AMTCAR;//USD
                    objRtn.totGROSSI_LY = PAXCARL_LY;
                    objRtn.totISCI_LY = AMTCAR_LY;

                    //Totales de Diferencias favor - a cargo
                    objRtn.totTAXI = PAXCAR - PAXFAV;//QITEMS
                    objRtn.totTAXI_LY = PAXCARL_LY - PAXFAV_LY;//QITEMS 
                    objRtn.totSISCI = AMTCAR - AMTFAV;//USD
                    objRtn.totSISCI_LY = AMTCAR_LY - AMTFAV_LY;//USD

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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
    
    public List<SFI030Filter> loadPX237S02SFI030(SFI030Filter filter) throws SQLException, Exception {

        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        int PAXFAV = 0, PAXCAR = 0, PAXFAV_LY = 0, PAXCARL_LY = 0;
        double AMTFAV = 0, AMTCAR = 0, AMTFAV_LY = 0, AMTCAR_LY = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX237S02SFI030(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, filter.PERNUM);
            cstmt01.setString(5, filter.BAIR);
            cstmt01.setString(6, filter.SOURCOD);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                PAXFAV = rs01.getInt("PAXFAV");
                PAXCAR = rs01.getInt("PAXCAR");
                AMTFAV = rs01.getDouble("AMTFAV");
                AMTCAR = rs01.getDouble("AMTCAR");
                PAXFAV_LY = rs01.getInt("PAXFAV_LY");
                PAXCARL_LY = rs01.getInt("PAXCAR_LY");
                AMTFAV_LY = rs01.getDouble("AMTFAV_LY");
                AMTCAR_LY = rs01.getDouble("AMTCAR_LY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.BDATE = rs01.getString("MES");
                    objRtn.strFormatDate = Functions.getAbreviaturaMes(objRtn.BDATE);
                    //---------AÃ‘O DEL FILTRO-------
                    //A FAVOR
                    objRtn.NUMREC = rs01.getInt("PAXFAV");
                    objRtn.TNET = rs01.getDouble("AMTFAV");
                    //A CARGO
                    objRtn.QITEMSCAR = rs01.getInt("PAXCAR");
                    objRtn.TNETOCAR = rs01.getDouble("AMTCAR");

                    //-------AÃ‘O ANTERIOR---------------
                    //A FAVOR
                    objRtn.QITEMS_LY = rs01.getInt("PAXFAV_LY");
                    objRtn.TNETO_LY = rs01.getDouble("AMTFAV_LY");
                    //A CARGO
                    objRtn.QITEMSCAR_LY = rs01.getInt("PAXCAR_LY");
                    objRtn.TNETOCAR_LY = rs01.getDouble("AMTCAR_LY");

                    objRtn.diffQITEMS = objRtn.QITEMSCAR - objRtn.NUMREC;
                    objRtn.diffTNETO = objRtn.TNETOCAR - objRtn.TNET;
                    objRtn.diffQITEMS_LY = objRtn.QITEMSCAR_LY - objRtn.QITEMS_LY;
                    objRtn.diffTNETO_LY = objRtn.TNETOCAR_LY - objRtn.TNETO_LY;

                    //A FAVOR (LY=LAST YEAR))
                    objRtn.totQITEMS = PAXFAV;
                    objRtn.totTNETO = AMTFAV;
                    objRtn.totQITEMS_LY = PAXFAV_LY;
                    objRtn.totTNETO_LY = AMTFAV_LY;

                    //A CARGOO
                    objRtn.totGROSSI = PAXCAR;//QITEMS
                    objRtn.totISCI = AMTCAR;//USD
                    objRtn.totGROSSI_LY = PAXCARL_LY;
                    objRtn.totISCI_LY = AMTCAR_LY;

                    //Totales de Diferencias favor - a cargo
                    objRtn.totTAXI = PAXCAR - PAXFAV;//QITEMS
                    objRtn.totTAXI_LY = PAXCARL_LY - PAXFAV_LY;//QITEMS 
                    objRtn.totSISCI = AMTCAR - AMTFAV;//USD
                    objRtn.totSISCI_LY = AMTCAR_LY - AMTFAV_LY;//USD

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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
