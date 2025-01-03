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
import java.util.Map;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class LoadExchangeRateDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LoadExchangeRateDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadExchangeRateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF106Filter> loadPX620SQP05106(MPF106Filter filter) throws SQLException, Exception {

        List<MPF106Filter> lstData = new ArrayList<MPF106Filter>(0);
        MPF106Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05106(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TERMP.trim()); 
            cstmt.setString(3, filter.IN_SAGENT.trim());
                       
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
                bean = new MPF106Filter();
                bean.RN = rst.getLong("RN");
                bean.TERMP = rst.getString("TERMP").trim();
                bean.SAGENT = rst.getString("SAGENT").trim();            
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
    
    public String SQP05099(List<A2290Filter> lstPayments, UserView user) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        String mensaje = "SUCCESSFUL. Information Updated.";
        List<A2290Filter> lst_tkt_error = new ArrayList<A2290Filter>();
        int QTY_UPDATE = 0, cont = 0, contDup = 0;
        double NETOC = 0;
        String mensajePost = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        
        Map<String, Integer> contadorClaves = new HashMap<>();
        for (A2290Filter registro : lstPayments) {
            String clave = registro.SDATE  + registro.IN_SCOUNTRY + registro.IN_TDOC + registro.IN_CODEBANK + registro.SCARDN + registro.SAUTHOC ;
            NETOC = NETOC + registro.NETO;
            if (contadorClaves.containsKey(clave)) {
                int contador = contadorClaves.get(clave);
                contador++;
                contadorClaves.put(clave, contador);
            } else {
                contadorClaves.put(clave, 0);
            }

        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF102_CONCI_DEBITS(?,?,?,?,?,?,?,?,?)}";
        

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            A2290Filter filter102 = lstPayments.get(0);
            int QTYTRAN1 = lstPayments.size();
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter102.IN_BANDOC.trim());
            cstmt.setString(3, filter102.IN_TDOC.trim());
            cstmt.setString(4, filter102.IN_SOCIETY.trim());
            cstmt.setInt(5, QTYTRAN1);
            cstmt.setDouble(6, NETOC);
            cstmt.setString(7, user.getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            

            cstmt.execute();
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución
            
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQPMPF060_CONCI_DEBITS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx2 = session.getCNXIBMDB2().getIBMDB2Connection();
            for (int i = 0; i < lstPayments.size(); ++i) {
                cstmt2 = cnx.prepareCall(SQLCLL02);
                A2290Filter item = lstPayments.get(i);
                String keysRegister = item.SDATE  + item.IN_SCOUNTRY + item.IN_TDOC + item.IN_CODEBANK + item.SCARDN + item.SAUTHOC ;
                if( contadorClaves.containsKey(keysRegister) && contadorClaves.get(keysRegister) > 0  ){
                   item.SEQ =  String.format("%02d", contadorClaves.get(keysRegister));
                   contadorClaves.put(keysRegister, contadorClaves.get(keysRegister) - 1);
                }else{
                    item.SEQ = "";
                }
                try {
                    cstmt2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cstmt2.setString(2, item.IN_BANDOC.trim());
                    cstmt2.setString(3, item.IN_TDOC.trim());
                    cstmt2.setString(4, item.IN_DATECI.trim());
                    cstmt2.setString(5, item.IN_TRANCI.trim());
                    cstmt2.setString(6, item.IN_CODEBANK.trim());
                    cstmt2.setString(7, item.IN_SCURRENCY.trim());
                    cstmt2.setString(8, item.IN_MERCHNC.trim());
                    cstmt2.setString(9, item.IN_SCOUNTRY.trim());
                    cstmt2.setString(10, item.IN_COREP.trim());
                    cstmt2.setString(11, item.ADATE.trim());
                    cstmt2.setString(12, item.SDATE.trim());
                    cstmt2.setString(13, item.ACCNUMBER.trim());
                    cstmt2.setString(14, item.SAUTHOC.trim());
                    cstmt2.setString(15, item.SCARDN.trim());
                    cstmt2.setString(16, item.SCARDNCOR.trim());
                    cstmt2.setDouble(17, item.TOTAL);
                    cstmt2.setDouble(18, item.COMISION);
                    cstmt2.setDouble(19, item.IVA);
                    cstmt2.setDouble(20, item.RTEFUE);
                    cstmt2.setDouble(21, item.RTEIVA);
                    cstmt2.setDouble(22, item.RTEICA);
                    cstmt2.setDouble(23, item.NETO);
                    cstmt2.setString(24, item.SEQ);
                    cstmt2.setString(25, user.getUserInfo().USR);
                    cstmt2.setString(26, Functions.getFechaActual());
                    cstmt2.setString(27, Functions.getHoraActual());
                  
                    cont++;
                    cstmt2.execute();
                    cstmt2.close();
                    System.out.println(i);
                    QTY_UPDATE++;
                } catch (Exception e) {
                    if (e.getMessage().contains("clave duplicada")) {
                        contDup++;
                        System.out.println( e + "");
                        
                        
                    } else {
                        e.printStackTrace();
                    }
                }
            }

        } catch (Exception e) {
            System.out.println("Error en registro" + cont);
            mensaje = "Error" + e.getMessage();

        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {

                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {

                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return mensaje;
    }
    
    public String SQPMPS033(List<A2290Filter> lstdata, UserView user) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        String mensaje = "SUCCESSFUL. Information Updated.";
        List<A2290Filter> lst_tkt_error = new ArrayList<A2290Filter>();
        int QTY_UPDATE = 0, cont = 0, contDup = 0;
        double NETOC = 0;
        String mensajePost = "";
        CallableStatement cstmt = null;
        Connection cnx = null;
        int cantReg = 0;
        int updatedCount = 0;
        int insertedCount = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS033(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            int QTYTRAN1 = lstdata.size();
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            try {
                for (int i = 0; i < lstdata.size(); i++) {
                    try {
                        cstmt.setString(1, "134");
                        cstmt.setString(2, lstdata.get(i).TREG.trim());
                        cstmt.setString(3, lstdata.get(i).CURRENCY1.trim());
                        cstmt.setString(4, lstdata.get(i).CURRENCY2.trim());
                        cstmt.setString(5, lstdata.get(i).DATECH.trim());
                        cstmt.setString(6, lstdata.get(i).SIGN.trim());
                        cstmt.setString(7, lstdata.get(i).RATE.trim());
                        cstmt.setString(8, lstdata.get(i).FACTORD.trim());
                        cstmt.setString(9, lstdata.get(i).FACTORA.trim());
                        cstmt.setString(10, lstdata.get(i).TCCOTIND.trim());
                        cstmt.setString(11, lstdata.get(i).TCCOTDIR.trim());
                        cstmt.setString(12, lstdata.get(i).TCCOTIND2.trim());
                        cstmt.setString(13, lstdata.get(i).TCCOTDIR2.trim());
                        cstmt.setString(14, user.getUserInfo().USR);
                        cstmt.setString(15, Functions.getFechaActual());
                        cstmt.setString(16, Functions.getHoraActual());
                        cstmt.setString(17, "MPPWEB");
                        
                        cstmt.registerOutParameter(18, Types.INTEGER);
                        cstmt.registerOutParameter(19, Types.INTEGER);
                        cantReg++;
                        System.out.println(i);
                        if(i == 1289){
                            System.out.println(i);
                        }
                        cstmt.execute();
                        updatedCount =  updatedCount + cstmt.getInt(18);
                        insertedCount = insertedCount + cstmt.getInt(19);
                        System.out.println("Updated Count: " + updatedCount);
                        System.out.println("Inserted Count: " + insertedCount);
                    } catch (Exception e) {
                        System.out.println("errorSQL");
                        System.out.println(e);
                    }
                }
                System.out.println("Updated final: " + updatedCount);
                System.out.println("Inserted final: " + insertedCount);
                mensaje = "" + mensaje + "<br><b>Read records: " + cantReg + "<br><b>Updated records: " + updatedCount+ "<br><b>Created records: " + insertedCount;
            } catch (Exception e2) {
                System.out.println("error" + e2);
                System.out.println("error" + cantReg);

            }

        } catch (Exception e) {
            System.out.println("Error en registro" + cont);
            mensaje = "Error" + e.getMessage();

        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {

                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {

                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        A2290Filter objRTN = new A2290Filter();
        objRTN = this.validateFullDays();
        if(objRTN.V_VALIDATE.equals("NOT")){
            return objRTN.MESSAGE;
        }
        System.out.println("mensaje: " + mensaje);
        return mensaje;
    }
    
    public A2290Filter validateFullDays() throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String mensaje = "SUCCESSFUL. Information Updated.";
        String dateFound = "Pending Dates";
       
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS033_VALIDATEDAYS(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, Functions.getFechaActual());
            cstmt01.registerOutParameter(2, Types.VARCHAR);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.execute();
            objRtn.V_VALIDATE = cstmt01.getString(3);
            String[] dateList = cstmt01.getString(2).split("\\|");
            if( dateList.length > 0 ){
                for (int i = 0; i < dateList.length ; i++){
                    dateFound =  dateFound + "<br><b>" + dateList[i]  ;
                }
            }
            
            objRtn.MESSAGE = dateFound;
            

        } catch (Exception e) {
            e.getMessage();
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

        return objRtn;
    } 
    
    public List<A2290Filter> dataCODEUNI() throws SQLException, Exception {

        List<A2290Filter> listBeanTkt = new ArrayList<A2290Filter>(0);
        A2290Filter beanTkt = new A2290Filter();
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQPMPF102_BANDOC()}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A2290Filter();
                beanTkt.BANDOC = rst.getString("BANDOC").trim();
                beanTkt.BANDOC = rst.getString("NETO").trim();
                listBeanTkt.add(beanTkt);
            }
            rst.close();

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }

        return listBeanTkt;
    }
    
    public String loadPX620SQP05108(MPF106Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05108(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.TERMP.trim());
            cstmt.setString(4, filter.SAGENT.trim());
            

            cstmt.setString(5, session.getUserView().getUserInfo().USR);
            cstmt.setString(6, Functions.getFechaActual());
            cstmt.setString(7, Functions.getHoraActual());
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

    public A2290Filter loadPX620SQP05107(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        HashMap<String, String> hmDescDocType = new HashMap<String, String>();
        hmDescDocType.put("S", "Sales");
        hmDescDocType.put("D", "Debits");
        HashMap<String, String> hmDescEstadosSTVAL = new HashMap<String, String>();
        hmDescEstadosSTVAL.put("1", "Match");
        hmDescEstadosSTVAL.put("2", "Settlement w/o Paying");
        hmDescEstadosSTVAL.put("3", "Bank w/o Settlement");
        hmDescEstadosSTVAL.put("4", "Match with Difference");
        hmDescEstadosSTVAL.put("5", "Match Manual");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMPF102_DEBITS_BANDOC(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_BANDOC.trim());
            cstmt01.setString(3, filter.IN_TDOC.trim());
            cstmt01.setString(4, filter.IN_SOCIETY.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.BANDOC = rs01.getString("BANDOC").trim();
                objRtn.CODEBANK = rs01.getString("CODEBANK").trim();
                objRtn.ADATE = rs01.getString("ADATE").trim();
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.MERCHNC = rs01.getString("MERCHAND").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.COREP = rs01.getString("COREP").trim();
                objRtn.SOCIETY = rs01.getString("SOCIETY").trim();
                objRtn.DATECI = rs01.getString("DATECI").trim();
                objRtn.TRANCI = rs01.getString("TRANCI").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.ACCNUMBER = rs01.getString("ACCCOMP").trim();
                objRtn.QTYTRAN1 = rs01.getInt("QTYTRAN1");
                if(hmDescDocType.containsKey(objRtn.TDOC)){
                   objRtn.descTDOC = hmDescDocType.get(objRtn.TDOC);
                }else {
                    objRtn.descTDOC = "Empty";
                }
                
                if (hmDescEstadosSTVAL.containsKey(objRtn.STVAL)) {
                        objRtn.strDescStatus = hmDescEstadosSTVAL.get(objRtn.STVAL).toString();
                }else {
                    objRtn.strDescStatus = "Empty";
                }
                
                
               

                //lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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

        return objRtn;
    }
    
}
