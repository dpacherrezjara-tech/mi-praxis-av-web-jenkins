
package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.dao.flown.*;
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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A005;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AirlineMasterFileDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public AirlineMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List loadMasterData(A005 filter) {

        String str1;
        A005 bean;
        List<A005> listaData = new ArrayList();
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }
        try {
            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
            }
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04172(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strCampo);
            cs.setString(3, filter.strValor);
            cs.setInt(4, totRowsPag);
            cs.setInt(5, PAGINIT);
            cs.setInt(6, filter.intTotalRws);
            cs.execute();

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(5)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(6);
                    int t = totRows % rowsPag;
                    if (t > 0) {
                        totPAGS = (totRows / totRowsPag) + 1;
                    } else {
                        totPAGS = totRows / totRowsPag;
                    }
                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                bean = new A005();
                bean.A005KEY = rst.getString("A005KEY").trim();
                bean.A005KEY1 = rst.getString("A005KEY1").trim();
                bean.A005KEY2 = rst.getString("A005KEY2").trim();
                bean.A005CHS = rst.getString("A005CHS").trim();
                bean.A005KEY3 = rst.getString("A005KEY3").trim();
                bean.A005COMISP = rst.getDouble("A005COMISP");
                bean.A005INDCOM = rst.getString("A005INDCOM").trim();
                bean.A005ZONA = rst.getString("A005ZONA").trim();
                bean.A005ACHS = rst.getString("A005ACHS").trim();
                bean.A005ACPL = rst.getString("A005ACPL").trim();
                bean.A005CIAS = rst.getString("A005CIAS").trim();
                if (filter.intCurrentPg > 0) {
                    bean.intCurrentPg = filter.intCurrentPg;
                    bean.pos = PAGINIT + pos;
                } else {
                    bean.intCurrentPg = 1;
                    bean.pos = pos;
                }
                bean.intPageRws = totRowsPag;
                bean.intTotalPgs = totPAGS;
                bean.intTotalRws = totRows;

                bean.PAGNUM = bean.intCurrentPg;
                bean.PAGROW = bean.intPageRws;
                bean.TOTPAG = bean.intTotalPgs;
                bean.TOTROW = bean.intTotalRws;
                listaData.add(bean);
            }

        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }
        return listaData;

    }
    
    public A006 get_AuditData_A006(String keyTable, String Table) {
        A006 bean = new A006();
        String texto = "";
        //List listado = new ArrayList();
        List<A006> listado = new ArrayList();
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX020S04PXA005(?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.setString(1, Table);
            cs.setString(2, keyTable);
            cs.setString(3, "");
            cs.execute();
            texto = cs.getString(3);
            bean.A006USRCR = texto.substring(43, 52);
            bean.A006FECCR = texto.substring(53, 62);
            bean.A006HORCR = texto.substring(63, 72);
            bean.A006USRAC = texto.substring(73, 82);
            bean.A006FECAC = texto.substring(83, 92);
            bean.A006HORAC = texto.substring(93, 102);
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }
        return bean;
    }
    
    public String maintanceA005(A005 filter, String strOption) {
        String STR_RESULT = "";
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX020S03PXA005(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption);
            cs.setString(2, filter.A005KEY);
            cs.setString(3, filter.A005KEY1);
            cs.setString(4, filter.A005KEY2);
            cs.setString(5, filter.A005ACHS);
            cs.setString(6, filter.A005KEY3);
            cs.setDouble(7, filter.A005COMISP);
            cs.setString(8, filter.A005INDCOM);
            cs.setString(9, filter.A005ZONA);
            cs.setString(10, filter.A005ACHS);
            cs.setString(11, filter.A005ACPL);
            cs.setString(12, filter.A005CIAS);
            cs.setString(13, session.getUserView().getUserInfo().USR);
            cs.setString(14, Functions.getFechaActual());
            cs.setString(15, Functions.getHoraActual());
            cs.execute();
            //result = cs.executeUpdate();
            //rst = cs.getResultSet();
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }

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
