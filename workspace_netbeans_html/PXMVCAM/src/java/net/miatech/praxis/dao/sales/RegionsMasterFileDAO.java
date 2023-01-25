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
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A128;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class RegionsMasterFileDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public RegionsMasterFileDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A128> loadRegionMF(PX023S01A128Filter filter) throws SQLException {

        A128 region;
        List<A128> listaData = new ArrayList();
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }

        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX023S01A128(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);

            cs.setString(1, filter.strOption.trim());
            cs.setString(2, filter.strParam1.trim());
            cs.setString(3, filter.strParam2.trim());
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

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                region = new A128();
                region.A128TIPO = rst.getString("A128TIPO").trim();
                region.A128AREGIO = rst.getString("A128AREGIO").trim();
                region.NOMREGION = rst.getString("A051DESCR1").trim();
                region.A128PAIS = rst.getString("A128PAIS").trim();
                region.NOMPAIS = rst.getString("A006KEY1").trim(); //A006KEY1
                region.A128CIUDAD = rst.getString("A128CIUDAD").trim();
                region.NOMCIUDAD = rst.getString("A1007NOMCD").trim();

                region.A128REGIST = rst.getString("A128REGIST").trim().toUpperCase();
                region.A128FREGIS = rst.getString("A128FREGIS").trim();
                region.A128REVISA = rst.getString("A128REVISA").trim().toUpperCase();
                region.A128FREVIS = rst.getString("A128FREVIS").trim();

                //Paginación ===================================================
                if (filter.intCurrentPg > 0) {
                    region.intCurrentPg = filter.intCurrentPg;
                } else {
                    region.intCurrentPg = 1;
                }
                region.pos = (20 * (region.intCurrentPg - 1) + pos);
                region.intPageRws = totRowsPag;
                region.intTotalPgs = totPAGS;
                region.intTotalRws = totRows;
                
                region.PAGNUM = region.intCurrentPg;
                region.PAGROW = region.intPageRws;
                region.TOTPAG = region.intTotalPgs;
                region.TOTROW = region.intTotalRws;

                listaData.add(region);
            }

        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }
        return listaData;
    }
    
    public String maintanceRegionMF(String strOption, A128 bn) throws SQLException {
        int result = -1;
        String STR_RESULT = "";

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX023S02A128(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            //cs.registerOutParameter(10, Types.VARCHAR);
            //cs.registerOutParameter(11, Types.VARCHAR);

            cs.setString(1, strOption);
            cs.setString(2, bn.A128TIPO.trim());
            cs.setString(3, bn.A128AREGIO.trim());
            cs.setString(4, bn.A128PAIS.trim());
            cs.setString(5, bn.A128CIUDAD.trim());
            cs.setString(6, bn.A128TIPO_OLD.trim());
            cs.setString(7, bn.A128AREGIO_OLD.trim());
            cs.setString(8, bn.A128PAIS_OLD.trim());
            cs.setString(9, bn.A128CIUDAD_OLD.trim());
            cs.execute();
            //result = cs.executeUpdate();
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }

        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }

        //return result;
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
