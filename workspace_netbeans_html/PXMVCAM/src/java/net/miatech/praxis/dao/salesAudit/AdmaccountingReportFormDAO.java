/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2586Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.salesAudit.ADMReportDAO.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class AdmaccountingReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2586Filter> Search(A2586Filter filter) throws SQLException, Exception {
        List<A2586Filter> lstRtn = new ArrayList<A2586Filter>(0);
        A2586Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03407(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.CombOption);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.NADM);
            cstmt01.setString(4, filter.CIA);
            cstmt01.setString(5, filter.FORMA);
            cstmt01.setString(6, filter.SERIE);
            cstmt01.setString(7, filter.DATEFROM);
            cstmt01.setString(8, filter.DATETO);
            cstmt01.setString(9, filter.COUNTRY);
            cstmt01.setString(10, filter.SOURCE);
            cstmt01.setString(11, filter.CHANNEL);
            cstmt01.setString(12, filter.AREA);
             cstmt01.setString(13, filter.IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2586Filter();
                objRtn.A1716CCUST = rs01.getString("A1716CCUST");
                objRtn.A1716CIA = rs01.getString("A1716CIA");
                objRtn.A1716FORMA = rs01.getString("A1716FORMA");
                objRtn.A1716SERIE = rs01.getString("A1716SERIE");
                objRtn.A1716TIKET = rs01.getString("A1716CIA")+""+ rs01.getString("A1716FORMA")+""+ rs01.getString("A1716SERIE");
                objRtn.A1716MODO = rs01.getString("A1716MODO");
                objRtn.A1716FUENT = rs01.getString("A1716FUENT");
                objRtn.A1716ESTAD = rs01.getString("A1716ESTAD");
                objRtn.A1716FFILE = rs01.getString("A1716FFILE");
                objRtn.A1716FPRO = rs01.getString("A1716FPRO");
                objRtn.A1716GRUPO = rs01.getString("A1716GRUPO");
                objRtn.A1716CUR = rs01.getString("A1716CUR");
                objRtn.A1716SUBFU = rs01.getString("A1716SUBFU");
                objRtn.A1716FP = rs01.getString("A1716FP");
                objRtn.A1716CUENT = rs01.getString("A1716CUENT");
                objRtn.A1716SUBCU = rs01.getString("A1716SUBCU");
                objRtn.A1716IDFIL = rs01.getString("A1716IDFIL");
                objRtn.A1716TIDOC = rs01.getString("A1716TIDOC");
                objRtn.A1716ORIG = rs01.getString("A1716ORIG");
                objRtn.A1716FCONT = rs01.getString("A1716FCONT");
                objRtn.A1716TITU = rs01.getString("A1716TITU");
                objRtn.A1716PROV = rs01.getString("A1716PROV");
                objRtn.A1716FILE = rs01.getString("A1716FILE");
                objRtn.A1716CLIEN = rs01.getString("A1716CLIEN");
                objRtn.A1716DIREC = rs01.getString("A1716DIREC");
                objRtn.A1716FOPI = rs01.getString("A1716FOPI");
                objRtn.A1716CUPON = rs01.getString("A1716CUPON");
                objRtn.A1716SEQT = rs01.getString("A1716SEQT");
                objRtn.A1716COPE = rs01.getString("A1716COPE");
                objRtn.A1716PAIS = rs01.getString("A1716PAIS");
                objRtn.A1716REFE = rs01.getString("A1716REFE");
                objRtn.A1716IDCON = rs01.getString("A1716IDCON");
                
                objRtn.A1716ACTIV = rs01.getDouble("A1716ACTIV");
                objRtn.A1716PASIV = rs01.getDouble("A1716PASIV");
                
                //  A171600001            TCOL
                
                objRtn.TCOL = rs01.getString("TCOL");
                if (objRtn.A1716MODO.isEmpty()) {
                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                }

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

}
