package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CouponsWithoutValueDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CouponsWithoutValueDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX123SQP0015(A1692Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;
        String tkt = Functions.fillString(filter.IN_TKT, 13);

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP0015(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        /*System.out.println("ccia:" + tkt.substring(0, 3).trim());
         System.out.println("forma:" + tkt.substring(3, 7).trim());
         System.out.println("serie:" + tkt.substring(7, 13).trim());*/
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);
            cs.registerOutParameter(14, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setString(4, Functions.getFechaActual());
            cs.setString(5, tkt.substring(0, 3).trim());//CIA
            cs.setString(6, tkt.substring(3, 7).trim());//FORMA
            cs.setString(7, tkt.substring(7, 13).trim());//SERIE
            cs.setString(8, filter.IN_STVAL);
            cs.setString(9, filter.IN_FVAL);
            cs.setString(10, filter.IN_CARR);
            cs.setInt(11, filter.page.PAGNUM);
            cs.setInt(12, filter.page.PAGROW);
            cs.setInt(13, filter.page.TOTPAG);
            cs.setInt(14, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(11);
            filter.page.PAGROW = cs.getInt(12);
            filter.page.TOTPAG = cs.getInt(13);
            filter.page.TOTROW = cs.getInt(14);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1692Filter();
                objRtn.FVAL = rst.getString("FVAL");
                objRtn.CCIA = rst.getString("CCIA");
                objRtn.FORMA = rst.getString("FORMA");
                objRtn.SERIE = rst.getString("SERIE");
                objRtn.CUPON = rst.getString("CUPON");
                objRtn.strTicket = rst.getString("CCIA") + " " + rst.getString("FORMA") + rst.getString("SERIE") + " " + rst.getString("CUPON");
                /*objRtn.FCONT = rst.getString("FCONT");
                 objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);*/
                objRtn.CDEPART = rst.getString("CDEPART");
                objRtn.CARRIVA = rst.getString("CARRIVA");
                objRtn.DFLIGHT = rst.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.NFLIGHT = rst.getString("NFLIGHT");
                //objRtn.ITINERA = rst.getString("ITINERA");
                //objRtn.LEGSEQ = rst.getString("LEGSEQ");
                //objRtn.TDOC = rst.getString("TDOC");
                //objRtn.AGTIA = rst.getString("AGTIA");
                //objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                //objRtn.TOPUS = rst.getString("TOPUS");
                //objRtn.CARR = rst.getString("CARR");
                objRtn.CABI = rst.getString("CABI");
                objRtn.VCPN = rst.getDouble("VCPN");
                objRtn.MDACP = rst.getString("MDACP");
                objRtn.VCPMX = rst.getDouble("VCPMX");
                objRtn.TCMUS = rst.getDouble("TCMUS");
                objRtn.VCPUS = rst.getDouble("VCPUS");
                objRtn.COMISI = rst.getDouble("COMISI");

                objRtn.FTE = rst.getString("FTE");
                objRtn.FVTA = rst.getString("FVTA");
                objRtn.PSVVTA = rst.getString("PSVVTA");

                objRtn.difVakues = objRtn.VCPN - objRtn.VCPMX;

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
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
