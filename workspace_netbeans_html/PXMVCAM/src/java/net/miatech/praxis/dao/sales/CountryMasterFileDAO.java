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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.flown.A1691;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CountryMasterFileDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CountryMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List loadCountryMasterFile(A006 filter) {
        A006 bean;
        List<A006> listaData = new ArrayList();
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }
        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX022S03PXA006(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strCampo);
            cs.setString(3, filter.strValor);
            cs.setString(4, filter.strName);
            cs.setInt(5, totRowsPag);
            cs.setInt(6, PAGINIT);
            cs.setInt(7, filter.intTotalRws);
            cs.execute();
            
            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(6)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(7);
                    /*String temp = String.valueOf(totRows / 15.0);
                     if (temp.contains(".")) {
                     totPAGS = (totRows / totRowsPag) + 1;*/
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
                bean = new A006();

                bean.A006PAIS = rst.getString("A006KEY").trim();
                bean.A006NOMBRE = rst.getString("A006KEY1").trim();

                bean.A006KEY = rst.getString("A006KEY").trim();
                bean.A006KEY1 = rst.getString("A006KEY1").trim();
                bean.CODMONEDANUM = rst.getString("CODMONEDANUM").trim();
                bean.CODMONEDAALPHA = rst.getString("CODMONEDAALPHA").trim();
                bean.NOMMONEDA = rst.getString("NOMMONEDA").trim();

                //Paginación ===================================================
                
                if (filter.intCurrentPg > 0) {
                    bean.intCurrentPg = filter.intCurrentPg;
                    bean.pos = PAGINIT + pos;
                } else {
                    bean.intCurrentPg = 1;
                    bean.pos = pos;
                }
                //bean.pos = (20 * (bean.intCurrentPg - 1) + pos);
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
    
    public String maintanceA006(A006 filter, String strOption, String strCampo) throws SQLException {
        String STR_RESULT = "";
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PX022S04PXA006(?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, strCampo);
            cs.setString(3, filter.A006KEY);
            cs.setString(4, filter.A006KEY1);
            cs.setString(5, filter.CODMONEDANUM);
            cs.setString(6, filter.CODMONEDAALPHA);
            cs.setString(7, filter.NOMMONEDA);
            cs.setString(8, session.getUserView().getUserInfo().USR);
            cs.setString(9, Functions.getFechaActual());
            cs.setString(10, Functions.getHoraActual());
            cs.execute();
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            //result = cs.executeUpdate();

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
