/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class AgentsCatalogDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AgentsCatalogDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AgentsCatalogDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF106Filter> loadPX616SQP04941(MPF106Filter filter) throws SQLException, Exception {

        List<MPF106Filter> lstData = new ArrayList<MPF106Filter>(0);
        MPF106Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS427(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CAGENCY.trim());
            cstmt.setString(3, filter.COUNTRY.trim());            
            cstmt.setString(4, filter.CITY.trim());            
            cstmt.setString(5, filter.NEGOC.trim());            

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
                bean = new MPF106Filter();
                bean.RN = rst.getLong("RN");
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.CAGENCY = rst.getString("CAGENCY").trim();
                bean.CANAL = rst.getString("CANAL").trim();
                bean.NAMEA = rst.getString("NAMEA").trim();
                bean.CITY = rst.getString("CITY").trim();
                bean.NEGOC = rst.getString("NEGOC").trim();
                if(rst.getString("NEGOC").trim().equals("1")){
                    bean.descNEGOC = "PASAJES";
                }else if(rst.getString("NEGOC").trim().equals("2")){
                    bean.descNEGOC = "CARGA";
                }else if(rst.getString("NEGOC").trim().equals("3")){
                    bean.descNEGOC = "CORREO";
                }
                bean.TERMI = rst.getString("TERMI").trim();
                bean.SAGENT = rst.getString("CAGENCY").trim();
                bean.DESCSAGENT = rst.getString("NAMEA").trim();
                bean.CONTAC = rst.getString("CONTAC").trim();
                bean.EMAILS = rst.getString("EMAILS").trim();
                bean.NPHONE = rst.getString("NPHONE").trim();
                bean.EMAILS2 = rst.getString("EMAILS2").trim();
                bean.EMAILS3 = rst.getString("EMAILS3").trim();
                bean.EMAILS4 = rst.getString("EMAILS4").trim();
                bean.EMAILS5 = rst.getString("EMAILS5").trim();
                
                bean.SBENCEN = rst.getString("SBENCEN").trim();
                bean.SOCIETY = rst.getString("SOCIETY").trim();
                bean.CIACOME = rst.getString("CIACOME").trim();
                
                // CAMPOS DE CASH
                bean.FORMPAYM = rst.getString("FORMPAYM").trim();
                bean.NACCBANK = rst.getString("NACCBANK").trim();
                bean.FRECPAYM = rst.getString("FRECPAYM").trim();
                bean.DESCRIPTION_PAYMENT = rst.getString("DESCRIPTION_PAYMENT").trim();
                bean.T_DATEF = rst.getString("DATEF").trim();
                bean.T_DATET = rst.getString("DATET").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

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

        return lstData;
    }
    
    
   
    
   public List<MPF106Filter> loadCitiesByCountry(MPF106Filter filter)
        throws SQLException, Exception {
    List<MPF106Filter> lst = new ArrayList<>();
    MPF106Filter bean;

    String sql =
        "SELECT DISTINCT CITY " +
        "FROM PRAXISMP.MPF106 " +
        "WHERE COUNTRY = ? " +
        "ORDER BY CITY";

    Connection cnx = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        ps = cnx.prepareStatement(sql);
        ps.setString(1, filter.COUNTRY.trim());

        rs = ps.executeQuery();

        // Opción All
        bean = new MPF106Filter();
        bean.CITY = "";
        lst.add(bean);

        while (rs.next()) {
            bean = new MPF106Filter();
            bean.CITY = rs.getString("CITY").trim();
            lst.add(bean);
        }

    } finally {
        if (rs != null) rs.close();
        if (ps != null) ps.close();
        session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
    }

    return lst;
}

 
    public String loadPX305SQP00941(List<MPF106Filter> filter, int Contador,String option) throws Exception {

        CallableStatement cs = null;
        String msj = "";
        int cantReg = 0, cantDup = 0, cantUpd = 0;
        Connection cnx = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP04614AGENTS(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cs = cnx.prepareCall(SQLCLL01);
        try {
            for (int i = 0; i < filter.size(); i++) {
                try {
                    
                    cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs.setString(2, filter.get(i).OPTION.trim());
                    cs.setString(3, filter.get(i).SOCIETY.trim());
                    cs.setString(4, filter.get(i).CAGENCY.trim());
                    cs.setString(5, filter.get(i).CIACOME.trim());
                    cs.setString(6, filter.get(i).SBENCEN.trim());
                    cs.setString(7, filter.get(i).COUNTRY.trim());
                    cs.setString(8, filter.get(i).NAMEA.trim());
                    cs.setString(9, filter.get(i).CANAL.trim());
                    cs.setString(10, filter.get(i).NEGOC.trim());
                    cs.registerOutParameter(11, Types.INTEGER);
                    cs.setString(12, session.getUserView().getUserInfo().USR);
                    cs.setString(13, Functions.getFechaActual());
                    cs.setString(14, Functions.getHoraActual());
                    
                    cs.execute();

                    cantReg++;
                    cantUpd = cantUpd + cs.getInt(11);

                } catch (Exception e) {
                    if (e.getMessage().contains("dupl")) {
                        cantDup++;
                    } else {
                        System.out.println("Error" + e);
                        msj = e.getMessage();
                        e.printStackTrace();
                    }
                }
            }

            msj += "<b>Loadeds : " + Contador + "<b><br>";
            if (option.equals("I")) {
                msj += "<b>Inserts : " + cantReg + "<b><br>";

            } else if (option.equals("U")) {
                msj += "<b>Updates : " + cantUpd + "<b><br>";
            }

            if (cantDup > 0) {
                msj += "<b>Duplicates : " + cantDup + "<b>";
            }

        } catch (Exception e2) {
            System.out.println("Error" + e2);
            msj = e2.getMessage();
            e2.printStackTrace();
        }
        return msj;
    }

    
    public String loadPX616SQP04942(MPF106Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04942_V2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.COUNTRY.trim());
            cstmt.setString(4, filter.CAGENCY.trim());
            cstmt.setString(5, filter.NAMEA.trim());
            cstmt.setString(6, filter.CANAL.trim());
            cstmt.setString(7, filter.CITY.trim());
            cstmt.setString(8, filter.NEGOC.trim());
            cstmt.setString(9, filter.TERMI.trim());
            cstmt.setString(10, filter.CONTAC.trim());
            cstmt.setString(11, filter.EMAILS.trim());
            cstmt.setString(12, filter.EMAILS2.trim());
            cstmt.setString(13, filter.EMAILS3.trim());
            cstmt.setString(14, filter.EMAILS4.trim());
            cstmt.setString(15, filter.EMAILS5.trim());
            cstmt.setString(16, filter.NPHONE.trim());
            cstmt.setString(17, filter.NEW_CAGENCY.trim());
            
            cstmt.setString(18, filter.CIACOME.trim());
            cstmt.setString(19, filter.SBENCEN.trim());
            cstmt.setString(20, filter.SOCIETY.trim());

            cstmt.setString(21, session.getUserView().getUserInfo().USR);
            cstmt.setString(22, Functions.getFechaActual());
            cstmt.setString(23, Functions.getHoraActual());
            
            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;

    }

    public MPF106Filter loadPX616SQP04943(MPF106Filter filter) throws SQLException, Exception {

        MPF106Filter objRtn = new MPF106Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04943(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SAGENT.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                objRtn.CAGENCY = rs01.getString("CAGENCY").trim();
                objRtn.SAGENT = rs01.getString("CAGENCY").trim();
                objRtn.DESCSAGENT = rs01.getString("NAMEA").trim();
                objRtn.NAMEA = rs01.getString("NAMEA").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.CITY = rs01.getString("CITY").trim();
                objRtn.NEGOC = rs01.getString("NEGOC").trim();
                objRtn.TERMI = rs01.getString("TERMI").trim();
                objRtn.CONTAC = rs01.getString("CONTAC").trim();
                objRtn.EMAILS = rs01.getString("EMAILS").trim();
                objRtn.NPHONE = rs01.getString("NPHONE").trim();
                objRtn.EMAILS2 = rs01.getString("EMAILS2").trim();
                objRtn.EMAILS3 = rs01.getString("EMAILS3").trim();
                objRtn.EMAILS4 = rs01.getString("EMAILS4").trim();
                objRtn.EMAILS5 = rs01.getString("EMAILS5").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.PGMCR = rs01.getString("PGMCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");
                objRtn.PGMUP = rs01.getString("PGMUP");
                
                objRtn.SBENCEN = rs01.getString("SBENCEN");
                objRtn.SOCIETY = rs01.getString("SOCIETY");
                objRtn.CIACOME = rs01.getString("CIACOME");

                //lstRtn.add(objRtn);
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

        return objRtn;
    }
    
    public List<MPF106Filter>  loadPX616SQP04943Citys(MPF106Filter filter) throws SQLException, Exception {

        MPF106Filter objRtn = new MPF106Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        
        List<MPF106Filter> lstData = new ArrayList<MPF106Filter>(0);
        lstData.add(objRtn);
//        MPF106Filter objRtn0;
//        objRtn0 = new MPF106Filter();
//        objRtn0.CODE = "";
//        objRtn0.NAME = "All";
//        lstData.add(objRtn0);
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04943CITY(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COUNTRY.trim());

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new MPF106Filter();
                objRtn.CODE = rs01.getString("CODE").trim();
                objRtn.NAME = rs01.getString("NAME").trim();
                
                lstData.add(objRtn);
            }
            rs01.close();
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

        return lstData;
    }

}
