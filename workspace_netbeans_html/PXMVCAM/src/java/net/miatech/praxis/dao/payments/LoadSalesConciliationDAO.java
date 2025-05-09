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
import static net.miatech.praxis.dao.payments.SalesConciliationManualDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class LoadSalesConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LoadSalesConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadSalesConciliationDAO(IServerSession ss) {
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

    public A2290Filter SQPMPS076_UP(A2290Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".UpdateRecords_V1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_USCR.trim());
            cstmt01.setString(3, filter.IN_PRDA.trim());
            cstmt01.setInt(4, filter.IN_TRANL);
            cstmt01.setString(5, filter.IN_CERROR.trim());
            cstmt01.setString(6, filter.IN_STCON.trim());
            cstmt01.setString(7, Functions.getFechaActual());
            cstmt01.setString(8, Functions.getHoraActual());
            cstmt01.setString(9, user.getUserInfo().USR);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.execute();
            objRtn.QTY =  cstmt01.getInt(10);
            objRtn.QTYPROCUP =  cstmt01.getInt(11);
            objRtn.QTYNPROCUP =  cstmt01.getInt(12);

            
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
        objRtn.MESSAGE = strMsj;
        return objRtn;
    }
    
    public A2290Filter SQPMPS076_UP_OPERATIONAL(A2290Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        CallableStatement cstmt02 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_PLANILLA_OPERATIVA_F2_V1(?,?,?,?,?,?)}";

        Connection cnx = null;
        Connection cnx2 = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PRDA.trim());
            cstmt01.setInt(3, filter.IN_TRANL);
            cstmt01.setString(4, user.getUserInfo().USR);
            cstmt01.setString(5, Functions.getFechaActual());
            cstmt01.setString(6, Functions.getHoraActual());
            cstmt01.execute();
            cstmt01.close();
            
            
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".PLANILLA_OPERATIVA_F2_II(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cstmt01 = cnx.prepareCall(SQLCLL02);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_USCR.trim());
            cstmt01.setString(3, filter.IN_PRDA.trim());
            cstmt01.setInt(4, filter.IN_TRANL);
            cstmt01.setString(5, filter.IN_CERROR.trim());
            cstmt01.setString(6, filter.IN_STCON.trim());
            cstmt01.setString(7, Functions.getFechaActual());
            cstmt01.setString(8, Functions.getHoraActual());
            cstmt01.setString(9, user.getUserInfo().USR);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.execute();
            objRtn.QTY =  cstmt01.getInt(10);
            objRtn.QTYPROCUP =  cstmt01.getInt(11);
            objRtn.QTYNPROCUP =  cstmt01.getInt(12);
            
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
        objRtn.MESSAGE = strMsj;
        return objRtn;
    }
    
     public A2290Filter SQPMPS076(List<A2290Filter> lstdata, UserView user) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        boolean duplicateExists = false;
        String mensaje = "SUCCESSFUL. Information Updated.";
        List<A2290Filter> lst_tkt_error = new ArrayList<A2290Filter>();
        LoadSalesConciliationDAO objDao = new LoadSalesConciliationDAO();
        A2290Filter objRtn = new A2290Filter();
        A2290Filter objRtn2 = new A2290Filter();
        A2290Filter rspt = new A2290Filter();
        int QTY_UPDATE = 0, cont = 0, contDup = 0;
        double NETOC = 0;
        String mensajePost = "";
        CallableStatement cstmt = null;
        Connection cnx = null;
        int tran = 0;
        int tranl = 1;
        int cantReg = 0;
        int loadedCount = 0;
        int notLoadedCount = 0;
        int duplicateCount = 0;
        int coorrelativo = lstdata.size();
        int coorrelativol = 1;
        boolean isAdj = false;
        
        //validacion comentada por requerimiento CSR: 826
//        for(int j = 0; j < lstdata.size(); j++){
//            if( lstdata.get(j).FCONCEP.trim().equals("A")){
//                isAdj = true;
//            }
//        }
        
//        if( !user.getUserInfo().USR.substring(0,2).equals("AV") && isAdj && !user.getUserInfo().USR.equals("SAV58D") && !user.getUserInfo().USR.equals("USRWEBAV") ){
//            rspt.MESSAGE = "You are not allowed to make an adjustment";
//            return rspt;
//        }
        
        //COORRELATIVO TRAN
        A2290Filter filter = new A2290Filter();
        filter.IN_DATE = Functions.getFechaActual(); 
        filter.IN_PGRM = "MPF114CO1";
        objRtn = this.getCORRELATIVO( filter );
        if( objRtn.CONT != 0){
            tran = objRtn.CONT;
            coorrelativo = objRtn.CONT + lstdata.size();
            
        }
        //COORRELATIVO TRANL
        A2290Filter filter2 = new A2290Filter();
        filter2.IN_DATE = Functions.getFechaActual(); 
        filter2.IN_PGRM = "MPF114CO2";
        objRtn2 = this.getCORRELATIVO( filter2 );
        if( objRtn2.CONT != 0){
            tranl = objRtn2.CONT + 1;
            coorrelativol = objRtn2.CONT + 1;
        }
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS076(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            int QTYTRAN1 = lstdata.size();
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            try {
                for (int i = 0; i < lstdata.size(); i++) {
                    try {
                        tran++;
                        cstmt.setString(1, lstdata.get(i).CCUST.trim());
                        cstmt.setString(2, lstdata.get(i).SEQ.trim());
                        cstmt.setString(3, lstdata.get(i).USERF.trim());
                        cstmt.setString(4, lstdata.get(i).FCONCEP.trim());
                        cstmt.setString(5, lstdata.get(i).CCIA.trim());
                        cstmt.setString(6, lstdata.get(i).FORMA.trim());
                        cstmt.setString(7, lstdata.get(i).SERIE.trim());
                        cstmt.setString(8, lstdata.get(i).SDATE.trim());
                        cstmt.setString(9, lstdata.get(i).SCARDN.trim());
                        cstmt.setString(10, lstdata.get(i).SAUTHOC.trim());
                        cstmt.setDouble(11, Double.parseDouble(formatAmount(lstdata.get(i).AMOUNT.trim())));
                        cstmt.setString(12, lstdata.get(i).SCURRENCY.trim());
                        cstmt.setString(13, lstdata.get(i).STVAL.trim());
                        cstmt.setString(14, lstdata.get(i).ACCNUMBER.trim());
                        cstmt.setString(15, lstdata.get(i).CECO.trim());
                        cstmt.setString(16, lstdata.get(i).CREJEC.trim());
                        cstmt.setString(17, Functions.getFechaActual());
                        cstmt.setInt(18,  tran);
                        cstmt.setInt(19,  tranl);
                        cstmt.setString(20, lstdata.get(i).STCON.trim());
                        cstmt.setString(21, lstdata.get(i).FCONT.trim());
                        cstmt.setString(22, user.getUserInfo().USR);
                        cstmt.setString(23, Functions.getFechaActual());
                        cstmt.setString(24, Functions.getHoraActual());
                        cstmt.setString(25, "MPPWEB");
                        cstmt.setInt(26, coorrelativo);
                        cstmt.setInt(27, coorrelativol);
                        
                        
                        
                        System.out.println(i);
                        if(i == 6113){
                            System.out.println(i);
                        }
                        cstmt.execute();
                        cantReg++;
                    } catch (Exception e) {
                        loadedCount++;
                        System.out.println("errorSQL");
                        System.out.println(e);
                        if(e.getMessage().contains("clave duplicada")){
                            duplicateExists = true;
                            duplicateCount++;
                            
                        }
                    }
                }

            rspt.QTYREC = lstdata.size();    
            rspt.QTYUPL = cantReg;    
            rspt.QTYNOTUPL = loadedCount;      
            rspt.USCR = user.getUserInfo().USR;    
            rspt.FECR = Functions.getFechaActual();    
            rspt.TRANL = tranl;    
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

        filter.IN_CONT = coorrelativo;
        this.insertCORRELATIVO(filter);
        filter2.IN_CONT = coorrelativol;
        this.insertCORRELATIVO(filter2);
        System.out.println("mensaje: " + mensaje);
        if(duplicateExists){
            mensaje  = "The are " + duplicateCount + " duplicates";
        }
        rspt.MESSAGE = mensaje;
        return rspt;
    }
     
    public A2290Filter SQPMPF114_PREV(A2290Filter filter, UserView user) throws SQLException, Exception {

        String strMsj = "Operation was successful.";
        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPMANUAL_PREV_V1(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_SDATE.trim());
            cstmt01.setString(3, filter.IN_SCOUNTRY.trim());
            cstmt01.setString(4, user.getUserInfo().USR);
            cstmt01.setString(5, Functions.getFechaActual());
            cstmt01.setString(6, Functions.getHoraActual());
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.execute();
            objRtn.QTYRECORDS =  cstmt01.getInt(7);
            objRtn.TRANL =  cstmt01.getInt(8);
            objRtn.USCR =  user.getUserInfo().USR;  
            objRtn.FECR =  Functions.getFechaActual();  
            objRtn.HOCR =  Functions.getHoraActual();
            
            

            
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            strMsj = e.getMessage();
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
    
    public A2290Filter SQP_INSERT_PO_MPF114(List<A2290Filter> lstdata, UserView user) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        boolean duplicateExists = false;
        String mensaje = "SUCCESSFUL. Information Updated.";
        List<A2290Filter> lst_tkt_error = new ArrayList<A2290Filter>();
        LoadSalesConciliationDAO objDao = new LoadSalesConciliationDAO();
        A2290Filter objRtn = new A2290Filter();
        A2290Filter objRtn2 = new A2290Filter();
        A2290Filter rspt = new A2290Filter();
        int QTY_UPDATE = 0, cont = 0, contDup = 0;
        double NETOC = 0;
        String mensajePost = "";
        CallableStatement cstmt = null;
        Connection cnx = null;
        int tran = 0;
        int tranl = 1;
        int cantReg = 0;
        int loadedCount = 0;
        int notLoadedCount = 0;
        int duplicateCount = 0;
        int coorrelativo = lstdata.size();
        int coorrelativol = 1;
        boolean isAdj = false;

        
        //COORRELATIVO TRAN
        A2290Filter filter = new A2290Filter();
        filter.IN_DATE = Functions.getFechaActual(); 
        filter.IN_PGRM = "MPF114CO1";
        objRtn = this.getCORRELATIVO( filter );
        if( objRtn.CONT != 0){
            tran = objRtn.CONT;
            coorrelativo = objRtn.CONT + lstdata.size();
            
        }
        //COORRELATIVO TRANL
        A2290Filter filter2 = new A2290Filter();
        filter2.IN_DATE = Functions.getFechaActual(); 
        filter2.IN_PGRM = "MPF114CO2";
        objRtn2 = this.getCORRELATIVO( filter2 );
        if( objRtn2.CONT != 0){
            tranl = objRtn2.CONT + 1;
            coorrelativol = objRtn2.CONT + 1;
        }
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_INSERT_PO_MPF114(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            int QTYTRAN1 = lstdata.size();
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            try {
                for (int i = 0; i < lstdata.size(); i++) {
                    try {
                        tran++;
                        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                        cstmt.setString(2, lstdata.get(i).TYPETRAN.trim());
                        cstmt.setString(3, lstdata.get(i).CCIA.trim());
                        cstmt.setString(4, lstdata.get(i).FORMA.trim());
                        cstmt.setString(5, lstdata.get(i).SERIE.trim());
                        cstmt.setString(6, lstdata.get(i).SDATE.trim());
                        cstmt.setString(7, lstdata.get(i).SAGENT.trim());
                        cstmt.setString(8, lstdata.get(i).SPNR.trim());
                        cstmt.setString(9, lstdata.get(i).SCARDN.trim());
                        cstmt.setString(10, lstdata.get(i).SAUTHOC.trim());
                        cstmt.setDouble(11, Double.parseDouble(formatAmount(lstdata.get(i).AMOUNT.trim())));
                        cstmt.setDouble(12, Double.parseDouble(formatAmount(lstdata.get(i).AMOUNTV.trim())));
                        cstmt.setDouble(13, Double.parseDouble(formatAmount(lstdata.get(i).AMOUNTL.trim())));
                        cstmt.setDouble(14, Double.parseDouble(formatAmount(lstdata.get(i).VARIACIONP.trim())));
                        cstmt.setString(15, lstdata.get(i).SCURRENCY.trim());
                        cstmt.setString(16, lstdata.get(i).ACCNUMBER.trim());
                        cstmt.setString(17, lstdata.get(i).CECO.trim());
                        cstmt.setInt(18,  tran);
                        cstmt.setInt(19,  tranl);
                        cstmt.setString(20, lstdata.get(i).STVALU.trim());
                        cstmt.setString(21, user.getUserInfo().USR);
                        cstmt.setString(22, Functions.getFechaActual());
                        cstmt.setString(23, Functions.getHoraActual());
                            
                            
                        
                        
                        System.out.println(i);
                        if(i == 66){
                            System.out.println(i);
                        }
                        cstmt.execute();
                        cantReg++;
                    } catch (Exception e) {
                        e.printStackTrace();
                        loadedCount++;
                        System.out.println("errorSQL");
                        System.out.println(e);
                        if(e.getMessage().contains("clave duplicada")){
                            duplicateExists = true;
                            duplicateCount++;
                            
                        }
                    }
                }

            rspt.QTYREC = lstdata.size();    
            rspt.QTYUPL = cantReg;    
            rspt.QTYNOTUPL = loadedCount;      
            rspt.USCR = user.getUserInfo().USR;    
            rspt.FECR = Functions.getFechaActual();    
            rspt.TRANL = tranl;    
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

        filter.IN_CONT = coorrelativo;
        this.insertCORRELATIVO(filter);
        filter2.IN_CONT = coorrelativol;
        this.insertCORRELATIVO(filter2);
        System.out.println("mensaje: " + mensaje);
        if(duplicateExists){
            mensaje  = "The are " + duplicateCount + " duplicates";
        }
        rspt.MESSAGE = mensaje;
        return rspt;
    }
     
    public String formatAmount(String amount) {

        if (amount.substring(amount.length() - 3).contains(",")) {
            amount = amount.replace(".", "").replace(",", ".");
        } else if (amount.substring(amount.length() - 3).contains(".")) {
            amount = amount.replace(",", "");
        } else {
            amount = amount;
        }

        return amount;
    } 
     public A2290Filter getCORRELATIVO(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
       
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPCONTADOR(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_DATE.trim());
            cstmt01.setString(2, filter.IN_PGRM.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CONT = rs01.getInt("CONT");
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
     
    public A2290Filter insertCORRELATIVO(A2290Filter filter) throws SQLException, Exception {

        A2290Filter objRtn = new A2290Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String mensaje = "SUCCESSFUL. Information Updated.";
       
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_INSERT_CONTADOR(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_PGRM.trim());
            cstmt01.setString(2, filter.IN_DATE.trim());
            cstmt01.setInt(3, filter.IN_CONT);
            cstmt01.execute();
            objRtn.MESSAGE = mensaje;

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
