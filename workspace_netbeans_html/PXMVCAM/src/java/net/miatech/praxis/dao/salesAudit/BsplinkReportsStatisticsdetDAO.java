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
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3389;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class BsplinkReportsStatisticsdetDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public BsplinkReportsStatisticsdetDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BsplinkReportsStatisticsdetDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3389Filter> SearchReportGeneral(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02881(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_SERIE);//TICKET
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_DOCUMET);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_COUNTRY);
            cstmt01.setString(10, filter.IN_SEQ);//cmbPayment
            cstmt01.setString(11, filter.IN_A3389PENDING);//cmbTypeRFND
            cstmt01.setString(12, filter.IN_A3389REGAS);//cmbUser
            cstmt01.setString(13, filter.IN_A3389IATA);//LIBRE
            cstmt01.setString(14, filter.IN_A3389REJECT);//LIBRE            

            cstmt01.setInt(15, filter.page.PAGNUM);
            cstmt01.setInt(16, filter.page.PAGROW);
            cstmt01.setInt(17, filter.page.TOTPAG);
            cstmt01.setInt(18, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(15);
            filter.page.PAGROW = cstmt01.getInt(16);
            filter.page.TOTPAG = cstmt01.getInt(17);
            filter.page.TOTROW = cstmt01.getInt(18);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389CCUST = rs01.getString("A3389CCUST");
                objRtn.A3389PREME = rs01.getString("A3389PREME");
                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389NUMER = rs01.getString("A3389NUMER");
                objRtn.A3389TKT = rs01.getString("A3389TKT");
                objRtn.A3389IATA = rs01.getString("A3389IATA");
                objRtn.A3389FUETE = rs01.getString("A3389FUETE");
                objRtn.A3389FUETE = rs01.getString("A3389FUETE");
                objRtn.A3389FREGI = rs01.getString("A3389FREGI");
                objRtn.A3389NOMAGENCY = rs01.getString("A3389NOMAGENCY");
                objRtn.A3389FAPPI = rs01.getString("A3389FAPPI");
                objRtn.A3389FAUTO = rs01.getString("A3389FAUTO");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389STATO = rs01.getString("A3389STATO");
                objRtn.A3389FLAG = rs01.getString("A3389FLAG");
                objRtn.A3389RAUD = rs01.getString("A3389RAUD");
                objRtn.A3389RAAG = rs01.getString("A3389RAAG");
                objRtn.A3389RAAR = rs01.getString("A3389RAZON");
                objRtn.A3389MDA = rs01.getString("A3389MDA");
                objRtn.A3389DIAS = rs01.getString("DIAS");
                objRtn.A3389SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3389TCODE = rs01.getString("PAYMETRFND");
                objRtn.A3401STATU = rs01.getString("A3401STATU");
                objRtn.A3401RAAG = rs01.getString("A3401RAAG");
                objRtn.A3389CHANEL = rs01.getString("A3389CHANEL");
                //MONTOS
                objRtn.A3389TARIF = rs01.getDouble("A3389TARIF");
                objRtn.A3389COMIS = rs01.getDouble("A3389COMIS");
                objRtn.A3389TTAX = rs01.getDouble("A3389TTAX");
                objRtn.A3389PENAL = rs01.getDouble("A3389PENAL");
                objRtn.A3389PORPE = rs01.getDouble("A3389PORPE");
                objRtn.A3389TOTAL = rs01.getDouble("A3389TOTAL");
                objRtn.A3389FECOR = rs01.getString("A3389FVNTA");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public A3389Filter SearchReportStatis(A3389Filter filter, String option) throws SQLException, Exception {
        A3389Filter lstGeneral = null;
        List<A3389> lst_stadistica = new ArrayList<A3389>(0);
        List<A3389> lst_stadUserTypeRFND = new ArrayList<A3389>(0);
        List<A3389> lst_stadTypeRFND = new ArrayList<A3389>(0);

        List<A3389> lst_stadPais = new ArrayList<A3389>(0);
        List<A3389> lst_stadFauto = new ArrayList<A3389>(0);
        List<A3389> lst_stadRAZONES = new ArrayList<A3389>(0);
        List<A3389> lst_stadTYPEPAGO = new ArrayList<A3389>(0);
        List<A3389> lst_stadDIAS = new ArrayList<A3389>(0);
        List<A3389> lst_stadRAZONES_REJECT = new ArrayList<A3389>(0);

        A3389Filter objRtnGeneral = null;
        A3389 objlst_General = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;
        ResultSet rs07 = null;
        ResultSet rs08 = null;
        ResultSet rs09 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02926(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_SERIE);//TICKET
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_DOCUMET);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_COUNTRY);
            cstmt01.setString(10, filter.IN_SEQ);//cmbPayment
            cstmt01.setString(11, filter.IN_A3389PENDING);//cmbTypeRFND
            cstmt01.setString(12, filter.IN_A3389REGAS);//cmbUser
            cstmt01.setString(13, filter.IN_A3389IATA);//LIBRE
            cstmt01.setString(14, filter.IN_A3389REJECT);//LIBRE 
            cstmt01.setString(15, option);//LIBRE 
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_General = new A3389();
                objlst_General.A3389REGAS = rs01.getString("A3389REGAS");
                objlst_General.A3389FLAG = rs01.getString("AUTORIQTY");
                objlst_General.A3389STATO = rs01.getString("REJETQTY");
                objlst_General.A3389STATU = rs01.getString("PENDQTY");
                lst_stadistica.add(objlst_General);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389REGAS = rs02.getString("A3389REGAS");
                    objlst_General.A3389FLAG = rs02.getString("TOTALQTY");
                    objlst_General.A3389STATO = rs02.getString("PARTIALQTY");
                    objlst_General.A3389STATU = rs02.getString("SNINFORQTY");
                    lst_stadUserTypeRFND.add(objlst_General);
                }
            }
            //Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389RAUD = rs03.getString("A3389RAUD");
                    objlst_General.A3389FLAG = rs03.getString("TOTALQTY");
                    objlst_General.A3389STATO = rs03.getString("PARTIALQTY");
                    objlst_General.A3389STATU = rs03.getString("SNINFORQTY");
                    lst_stadTypeRFND.add(objlst_General);
                }
            }
            //LSITA DE DATOS DE LA AGENCIA
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389PAIS = rs04.getString("A3389PAIS");
                    objlst_General.A3389FLAG = rs04.getString("AUTORIQTY");
                    objlst_General.A3389STATO = rs04.getString("REJETQTY");
                    objlst_General.A3389STATU = rs04.getString("PENDQTY");
                    lst_stadPais.add(objlst_General);
                }
            }
            //5
            if (cstmt01.getMoreResults()) {
                rs05 = cstmt01.getResultSet();
                while (rs05.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389FAUTO = rs05.getString("A3389FAUTO");
                    objlst_General.A3389FLAG = rs05.getString("AUTORIQTY");
                    objlst_General.A3389STATO = rs05.getString("REJETQTY");
                    objlst_General.A3389STATU = rs05.getString("PENDQTY");
                    lst_stadFauto.add(objlst_General);
                }
            }
            //LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389FLAG = rs06.getString("A3403ERROR");
                    objlst_General.A3389RCHASUM = rs06.getDouble("CANTI");
                    lst_stadRAZONES.add(objlst_General);
                }
            }
            //LIST lst_stadTYPEPAGO
            if (cstmt01.getMoreResults()) {
                rs07 = cstmt01.getResultSet();
                while (rs07.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389ARCH1 = rs07.getString("A3392CFOP");
                    objlst_General.A3389STATO = rs07.getString("CAQTY");
                    objlst_General.A3389STATU = rs07.getString("CCQTY");
                    objlst_General.A3389FLAG = rs07.getString("TOTALQTY");
                    objlst_General.A3389CANTPEDI = rs07.getString("SNQTY");
                    lst_stadTYPEPAGO.add(objlst_General);
                }
            }
            //LIST DE RAZONES
            if (cstmt01.getMoreResults()) {
                rs08 = cstmt01.getResultSet();
                while (rs08.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389DIAS = rs08.getString("DIAS");
                    objlst_General.A3389FLAG = rs08.getString("CEROQTY");
                    objlst_General.A3389STATO = rs08.getString("UNOQTY");
                    objlst_General.A3389STATU = rs08.getString("DOSQTY");
                    objlst_General.A3389CANTPEDI = rs08.getString("TRESQTY");
                    objlst_General.A3389CANTPROC = rs08.getString("CUATROQTY");
                    objlst_General.A3389PENSUM = rs08.getDouble("CINCOQTY");
                    objlst_General.A3389PENPJESUM = rs08.getDouble("SEISQTY");
                    objlst_General.A3389APROVSUM = rs08.getDouble("SIEQTY");
                    lst_stadDIAS.add(objlst_General);
                }
            }

            //LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs09 = cstmt01.getResultSet();
                while (rs09.next()) {
                    objlst_General = new A3389();
                    objlst_General.A3389FLAG = rs09.getString("A3403ERROR");
                    objlst_General.A3389RCHASUM = rs09.getDouble("CANTI");
                    lst_stadRAZONES_REJECT.add(objlst_General);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new A3389Filter();
            objRtnGeneral.lst_stadistica = lst_stadistica;
            objRtnGeneral.lst_stadUserTypeRFND = lst_stadUserTypeRFND;
            objRtnGeneral.lst_stadTypeRFND = lst_stadTypeRFND;
            objRtnGeneral.lst_stadPais = lst_stadPais;
            objRtnGeneral.lst_stadFauto = lst_stadFauto;
            objRtnGeneral.lst_stadRAZONES = lst_stadRAZONES;
            objRtnGeneral.lst_stadTYPEPAGO = lst_stadTYPEPAGO;
            objRtnGeneral.lst_stadDIAS = lst_stadDIAS;
            objRtnGeneral.lst_stadRAZONES_REJECT = lst_stadRAZONES_REJECT;

            lstGeneral = objRtnGeneral;
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
        return lstGeneral;

    }
    /*public List<A3389Filter> SearchReportStatis(A3389Filter filter, String option) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02926(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_SERIE);//TICKET
            cstmt01.setString(6, filter.IN_IATA);
            cstmt01.setString(7, filter.IN_DOCUMET);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_COUNTRY);
            cstmt01.setString(10, filter.IN_SEQ);//cmbPayment
            cstmt01.setString(11, filter.IN_A3389PENDING);//cmbTypeRFND
            cstmt01.setString(12, filter.IN_A3389REGAS);//cmbUser
            cstmt01.setString(13, filter.IN_A3389IATA);//LIBRE
            cstmt01.setString(14, filter.IN_A3389REJECT);//LIBRE 
            cstmt01.setString(15, option);//LIBRE 

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                switch (option) {
                    case "1":
                        objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                        objRtn.A3389FLAG = rs01.getString("AUTORIQTY");
                        objRtn.A3389STATO = rs01.getString("REJETQTY");
                        objRtn.A3389STATU = rs01.getString("PENDQTY");
                        break;
                    case "2":
                        objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                        objRtn.A3389FLAG = rs01.getString("TOTALQTY");
                        objRtn.A3389STATO = rs01.getString("PARTIALQTY");
                        objRtn.A3389STATU = rs01.getString("SNINFORQTY");
                        break;
                    case "3":
                        objRtn.A3389RAUD = rs01.getString("A3389RAUD");
                        objRtn.A3389FLAG = rs01.getString("TOTALQTY");
                        objRtn.A3389STATO = rs01.getString("PARTIALQTY");
                        objRtn.A3389STATU = rs01.getString("SNINFORQTY");
                        break;
                    case "4":
                        objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                        objRtn.A3389FLAG = rs01.getString("AUTORIQTY");
                        objRtn.A3389STATO = rs01.getString("REJETQTY");
                        objRtn.A3389STATU = rs01.getString("PENDQTY");
                        break;
                    case "5":
                        objRtn.A3389FAUTO = rs01.getString("A3389FAUTO");
                        objRtn.A3389FLAG = rs01.getString("AUTORIQTY");
                        objRtn.A3389STATO = rs01.getString("REJETQTY");
                        objRtn.A3389STATU = rs01.getString("PENDQTY");
                        break;
                    case "6":
                        
                        objRtn.A3389FLAG = rs01.getString("A3403ERROR");
                        objRtn.A3389RCHASUM = rs01.getDouble("CANTI");
                        break;
                    case "7":
                        objRtn.A3389ARCH1 = rs01.getString("A3392CFOP");
                        objRtn.A3389STATO = rs01.getString("CAQTY");
                        objRtn.A3389STATU = rs01.getString("CCQTY");
                        objRtn.A3389FLAG = rs01.getString("TOTALQTY");
                        objRtn.A3389CANTPEDI = rs01.getString("SNQTY");
                        break;
                    case "8":
                        objRtn.A3389DIAS = rs01.getString("DIAS");
                        objRtn.A3389FLAG = rs01.getString("CEROQTY");
                        objRtn.A3389STATO = rs01.getString("UNOQTY");
                        objRtn.A3389STATU = rs01.getString("DOSQTY");
                        objRtn.A3389CANTPEDI = rs01.getString("TRESQTY");
                        objRtn.A3389CANTPROC = rs01.getString("CUATROQTY");
                        objRtn.A3389PENSUM = rs01.getDouble("CINCOQTY");
                        objRtn.A3389PENPJESUM = rs01.getDouble("SEISQTY");
                        objRtn.A3389APROVSUM = rs01.getDouble("SIEQTY");
                        break;

                }

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    }*/

}
