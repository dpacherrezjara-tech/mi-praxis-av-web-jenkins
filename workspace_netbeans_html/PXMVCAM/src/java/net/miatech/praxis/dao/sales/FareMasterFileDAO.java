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
import net.miatech.beans.PX019S01A856Filter;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.PX030S01A1565Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A128;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class FareMasterFileDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public FareMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX030S01A1565Filter> loadPX030S01A1565(PX030S01A1565Filter filter) throws SQLException, Exception {
        List<PX030S01A1565Filter> lstRtn = new ArrayList<>(0);
        PX030S01A1565Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
       
        
        try {
            String SQLCLL01 = "{CALL PX030S01A1565(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_TFILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_SUBSCRIP);
            cstmt01.setString(4, filter.IN_PRODUCT);
            cstmt01.setString(5, filter.IN_XMTTYPE);
            cstmt01.setString(6, filter.IN_DATEFILE);
            cstmt01.setString(7, filter.IN_CXRCD);
            cstmt01.setString(8, filter.IN_FARECLCD);
            cstmt01.setString(9, filter.IN_ORIGCITY);
            cstmt01.setString(10, filter.IN_DESTCITY);
            cstmt01.setString(11, filter.IN_DI);
            cstmt01.setString(12, filter.IN_TAREFFDATE);
            cstmt01.setString(13, filter.IN_DATESDIS);
            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX030S01A1565Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.SUBSCRIP = rs01.getString("SUBSCRIP");
                objRtn.PRODUCT = rs01.getString("PRODUCT");
                objRtn.XMTTYPE = rs01.getString("XMTTYPE");
                objRtn.DATEFILE = rs01.getString("DATEFILE");
                objRtn.TIMEFILE = rs01.getString("TIMEFILE");
                objRtn.TOTREC = rs01.getInt("TOTREC");
                objRtn.FILENAME = rs01.getString("FILENAME");
                objRtn.DATAFILE = rs01.getString("DATAFILE");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.TARNO = rs01.getString("TARNO");
                objRtn.CXRCD = rs01.getString("CXRCD");
                objRtn.ORIGCITY = rs01.getString("ORIGCITY");
                objRtn.ORIGCTRY = rs01.getString("ORIGCTRY");
                objRtn.DESTCITY = rs01.getString("DESTCITY");
                objRtn.DESTCTRY = rs01.getString("DESTCTRY");
                objRtn.FARECLCD = rs01.getString("FARECLCD");
                objRtn.DATESEFF = rs01.getString("DATESEFF");
                objRtn.DATESDIS = rs01.getString("DATESDIS");
                objRtn.RULENO = rs01.getString("RULENO");
                objRtn.RTGNO = rs01.getString("RTGNO");
                objRtn.OWRT = rs01.getString("OWRT");
                objRtn.SOURCE = rs01.getString("SOURCE");
                objRtn.FAREORIAMT = rs01.getInt("FAREORIAMT");
                objRtn.FAREORICUR = rs01.getString("FAREORICUR");
                objRtn.FAREORIDEC = rs01.getString("FAREORIDEC");
                objRtn.FAREDSTAMT = rs01.getInt("FAREDSTAMT");
                objRtn.FAREDSTCUR = rs01.getString("FAREDSTCUR");
                objRtn.FAREDSTDEC = rs01.getString("FAREDSTDEC");
                objRtn.FAREOTHAMT = rs01.getInt("FAREOTHAMT");
                objRtn.FAREOTHCUR = rs01.getString("FAREOTHCUR");
                objRtn.FAREOTHDEC = rs01.getString("FAREOTHDEC");
                objRtn.AIRPORTORI = rs01.getString("AIRPORTORI");
                objRtn.AIRPORTDST = rs01.getString("AIRPORTDST");
                objRtn.FNT = rs01.getString("FNT");
                objRtn.DI = rs01.getString("DI");
                objRtn.GLOBAL = rs01.getString("GLOBAL");
                objRtn.TAREFFDATE = rs01.getString("TAREFFDATE");
                objRtn.MPM = rs01.getString("MPM");
                objRtn.CAB = rs01.getString("CAB");
                objRtn.ORIADFARCL = rs01.getString("ORIADFARCL");
                objRtn.ORIADRTG = rs01.getString("ORIADRTG");
                objRtn.ORIADFTNT = rs01.getString("ORIADFTNT");
                objRtn.ORIADGATEW = rs01.getString("ORIADGATEW");
                objRtn.ORIADAMT = rs01.getString("ORIADAMT");
                objRtn.ORIADSIGN = rs01.getString("ORIADSIGN");
                objRtn.ORIADCUR = rs01.getString("ORIADCUR");
                objRtn.ORIADDEC = rs01.getString("ORIADDEC");
                objRtn.DSTADFARCL = rs01.getString("DSTADFARCL");
                objRtn.DSTADRTG = rs01.getString("DSTADRTG");
                objRtn.DSTADFTNT = rs01.getString("DSTADFTNT");
                objRtn.DSTADGATEW = rs01.getString("DSTADGATEW");
                objRtn.DSTADAMT = rs01.getInt("DSTADAMT");
                objRtn.DSTADSIGN = rs01.getString("DSTADSIGN");
                objRtn.DSTADCUR = rs01.getString("DSTADCUR");
                objRtn.DSTADDEC = rs01.getString("DSTADDEC");
                objRtn.FAREFTNT = rs01.getString("FAREFTNT");
                objRtn.FAREAMT = rs01.getInt("FAREAMT");
                objRtn.FARECUR = rs01.getString("FARECUR");
                objRtn.FAREDEC = rs01.getString("FAREDEC");
                objRtn.DATESFIRST = rs01.getString("DATESFIRST");
                objRtn.DATESLAST = rs01.getString("DATESLAST");
                objRtn.ACTION = rs01.getString("ACTION");
                objRtn.MCN = rs01.getString("MCN");
                objRtn.OLDMCN = rs01.getString("OLDMCN");
                objRtn.BATCHCI = rs01.getString("BATCHCI");
                objRtn.BATCHNO = rs01.getString("BATCHNO");
                objRtn.PROP = rs01.getString("PROP");
                objRtn.LINK = rs01.getString("LINK");
                objRtn.LINK2 = rs01.getString("LINK2");
                objRtn.TYPE = rs01.getString("TYPE");
                objRtn.CHGTAGS1 = rs01.getString("CHGTAGS1");
                objRtn.CHGTAGS2 = rs01.getString("CHGTAGS2");
                objRtn.CHGTAGS3 = rs01.getString("CHGTAGS3");
                objRtn.CHGTAGS4 = rs01.getString("CHGTAGS4");
                objRtn.CHGTAGS5 = rs01.getString("CHGTAGS5");
                objRtn.CHGTAGS6 = rs01.getString("CHGTAGS6");
                objRtn.CHGTAGS7 = rs01.getString("CHGTAGS7");
                objRtn.CHGTAGS8 = rs01.getString("CHGTAGS8");
                objRtn.CHGTAGS9 = rs01.getString("CHGTAGS9");
                objRtn.CHGTAGS10 = rs01.getString("CHGTAGS10");
                objRtn.CHGTAGS11 = rs01.getString("CHGTAGS11");
                objRtn.CHGTAGS12 = rs01.getString("CHGTAGS12");
                objRtn.CHGTAGS13 = rs01.getString("CHGTAGS13");
                objRtn.CHGTAGS14 = rs01.getString("CHGTAGS14");
                objRtn.CHGTAGS15 = rs01.getString("CHGTAGS15");
                objRtn.CHGTAGS16 = rs01.getString("CHGTAGS16");
                objRtn.CHGTAGS17 = rs01.getString("CHGTAGS17");
                objRtn.CHGTAGS18 = rs01.getString("CHGTAGS18");
                objRtn.GFSDATE = rs01.getString("GFSDATE");
                objRtn.GFSNUMBER = rs01.getString("GFSNUMBER");
                objRtn.TYPEFARE = rs01.getString("TYPEFARE");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USAC = rs01.getString("USAC");
                objRtn.FEAC = rs01.getString("FEAC");
                objRtn.HOAC = rs01.getString("HOAC");

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
                   // logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                   // logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
