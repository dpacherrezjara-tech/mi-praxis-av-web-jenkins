package net.miatech.praxis.dao.flown;

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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.flown.A1691;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class ConciliationDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private List<A1692Filter> listaData = new ArrayList();
    // </editor-fold>

    public ConciliationDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public HashMap loadPX_ACS(String fecha, HashMap<String, String> hmAeropuertos) {

        HashMap hm = new HashMap();

        A1691Filter objA1691;

        strSQL = "{CALL Acs_AM.dbo.SP_Consulta_Passanger_List_Repeticiones(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getSQLConnection2(session);
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, fecha);
            cs.setString(2, fecha);
            cs.setString(3, "");
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objA1691 = new A1691Filter();
                objA1691.NFLIGHT = rst.getString("FltNbr").trim();
                objA1691.CDEPART = rst.getString("PaxPNROrigin").trim();
                if (hmAeropuertos.containsKey(objA1691.CDEPART.toUpperCase())) {
                    objA1691.strDescCDEPART = hmAeropuertos.get(objA1691.CDEPART).toString();
                }
                objA1691.CARRIVA = rst.getString("PaxPNRDest").trim();
                if (hmAeropuertos.containsKey(objA1691.CARRIVA.toUpperCase())) {
                    objA1691.strDescCARRIVA = hmAeropuertos.get(objA1691.CARRIVA).toString();
                }
                objA1691.QCPNTOT = rst.getInt("Num");

                hm.put(objA1691.NFLIGHT + "," + objA1691.CDEPART + "," + objA1691.CARRIVA, objA1691);
            }
        } catch (Exception e) {
            System.out.println("Mensaje loadPX_ACS: " + e.getMessage());
        } finally {
            setClose();
        }

        return hm;

    }
    
    public HashMap loadPX_ACS_NRO_PAPER(String fecha) {

        HashMap hm = new HashMap();

        String DFLIGHT = "", NFLIGHT = "", CDEPART = "", CARRIVA = "";
        int QTYPAX = 0;

        strSQL = "{CALL Acs_AM.dbo.SP_Consulta_History_Repeticiones(?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getSQLConnection2(session);
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, fecha);
            cs.setString(2, fecha);
            cs.setString(3, "");
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                NFLIGHT = rst.getString("FltNbr").trim();
                CDEPART = rst.getString("AirlineOrigAirport").trim();
                CARRIVA = rst.getString("AirlineDestAirport").trim();
                QTYPAX = rst.getInt("NumPaperTkts");

                hm.put(NFLIGHT + "," + CDEPART + "," + CARRIVA, QTYPAX);
            }
        } catch (Exception e) {
            System.out.println("Mensaje loadPX_ACS_NRO_PAPER: " + e.getMessage());
        } finally {
            setClose();
        }

        return hm;

    }
    
    public List<A1692Filter> loadPX352_PAPER_TICKET(A1691Filter filter, HashMap<String, String> hmAeropuertos) {

        String DFLIGHT = "", NFLIGHT = "", CDEPART = "", CARRIVA = "";
        int pos = 0;
        A1692Filter objA1692;
        listaData = new ArrayList<>(0);

        strSQL = "{CALL Acs_AM.dbo.SP_Consulta_History_Detalle(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getSQLConnection2(session);
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.DFLIGHT);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objA1692 = new A1692Filter();
                pos++;
                objA1692.RN = pos;
                objA1692.NFLIGHT = rst.getString("FltNbr").trim();
                objA1692.CDEPART = rst.getString("AirlineOrigAirport").trim();
                objA1692.CARRIVA = rst.getString("AirlineDestAirport").trim();
                if (hmAeropuertos.containsKey(objA1692.CDEPART.toUpperCase())) {
                    objA1692.strDescCDEPART = hmAeropuertos.get(objA1692.CDEPART).toString();
                }
                if (hmAeropuertos.containsKey(objA1692.CARRIVA.toUpperCase())) {
                    objA1692.strDescCARRIVA = hmAeropuertos.get(objA1692.CARRIVA).toString();
                }
                objA1692.strFCON = rst.getString("PNRLocatorId").trim();
                objA1692.STVAL = rst.getString("NameLast").trim();
                objA1692.STNEW = rst.getString("NameFirst").trim();
                objA1692.strDescripcion = rst.getString("ActionItem").trim();
                objA1692.strTicket = rst.getString("NumPaperTicket").trim();

                listaData.add(objA1692);
            }
        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }

        return listaData;

    }
    
    public HashMap loadPX362SQP01273(String fecha, HashMap<String, String> hmAeropuertos) {

        String MSJ = "An error has occurred";
        File archivoCopia_ACS = null;
        File archivoCopia_Paper = null;

        String DFLIGHT = "", NFLIGHT = "", CDEPART = "", CARRIVA = "";
        String AIRLINE = "", SERVICE = "", ORIG = "", RUTA_ACS = "", NAMEA1691 = "", NAME_ACS = "", RUTA_PAPER = "";
        int RN = 0, QTYPAX = 0;
        HashMap hmResult = new HashMap(), hmA1691 = new HashMap(), hmExcel = new HashMap(), hmTKTpaper = new HashMap();
        A1691Filter objA1691 = null;
        List<A1691Filter> lstA1691 = new ArrayList<>(0);
        List<A1691Filter> lstExcel = new ArrayList<>(0);
        
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP01273(?,?,?,?,?,?,?,?)}";
            
            String user = session.getUserView().getUserInfo().USR;

            FileReader fr = null;
            BufferedReader br = null;
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(4, Types.VARCHAR);
            cs.registerOutParameter(5, Types.VARCHAR);
            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);
            cs.registerOutParameter(8, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, fecha.trim().substring(0, 8));
            cs.setString(3, fecha.replace(".csv", ""));
            cs.setString(4, "");
            cs.setString(5, "");
            cs.setString(6, "");
            cs.setString(7, "");
            cs.setString(8, "");

            cs.execute();

            RUTA_ACS = cs.getString(4).trim();
            RUTA_PAPER = cs.getString(5).trim();
            NAMEA1691 = cs.getString(6).trim();
            NAME_ACS = cs.getString(7).trim();
            MSJ = cs.getString(8).trim();

            rst = cs.getResultSet();
            while (rst.next()) {
                objA1691 = new A1691Filter();
                objA1691.DFLIGHT = fecha;
                objA1691.strFormatDate = Functions.getMonthConvert(fecha.trim().substring(0, 8));
                objA1691.NFLIGHT = rst.getString("NFLIGHT");
                objA1691.CDEPART = rst.getString("CDEPART");
                if (hmAeropuertos.containsKey(objA1691.CDEPART.toUpperCase())) {
                    objA1691.strDescCDEPART = hmAeropuertos.get(objA1691.CDEPART).toString();
                }
                objA1691.CARRIVA = rst.getString("CARRIVA");
                if (hmAeropuertos.containsKey(objA1691.CARRIVA.toUpperCase())) {
                    objA1691.strDescCARRIVA = hmAeropuertos.get(objA1691.CARRIVA).toString();
                }
                objA1691.STVAL = rst.getString("STVAL");
                objA1691.strDescripcion = rst.getString("STVAL_DES");
                objA1691.QCPNOD = rst.getInt("QCPNOD");
                objA1691.QCPNTOT = rst.getInt("QCPNTOT");
                hmA1691.put(rst.getString("NFLIGHT") + "," + rst.getString("CDEPART") + "," + rst.getString("CARRIVA"), objA1691);

                //lstRtn.add(objRtn);
            }

            hmTKTpaper = loadPX_ACS_NRO_PAPER(fecha);

            if (hmTKTpaper.isEmpty()) {
                MSJ = MSJ + "\n" + "Ticket Paper File dont found in route.";
            }

            hmExcel = loadPX_ACS(fecha, hmAeropuertos);

            HashMap hmTempExcel = new HashMap();
            hmTempExcel = (HashMap) hmExcel.clone();

            //Para diferencia de pasajeros
            A1691Filter objA1691_FLI = null;
            A1691Filter objA1691_ACS = null;
            List<A1691Filter> lstA1691_dif = new ArrayList<A1691Filter>(0);

            Iterator it = null;

            Vector v = new Vector(hmA1691.keySet());
            Collections.sort(v);
            it = v.iterator();
            //it = hmA1691.entrySet().iterator();
            while (it.hasNext()) {
                //Map.Entry e = (Map.Entry)it.next();
                String e = (String) (it.next());//KEY
                if (hmExcel.containsKey(e)) {

                    objA1691_FLI = (A1691Filter) hmA1691.get(e);
                    objA1691_ACS = (A1691Filter) hmExcel.get(e);
                    if (!objA1691_FLI.STVAL.equals("4") && objA1691_FLI.QCPNTOT != objA1691_ACS.QCPNTOT) {
                        RN++;
                        objA1691_FLI.RN = RN;
                        objA1691_FLI.QCPNCON = objA1691_ACS.QCPNTOT;
                        objA1691_FLI.QCPINF = objA1691_FLI.QCPNTOT - objA1691_ACS.QCPNTOT;
                        if (objA1691_FLI.QCPINF < 0) {
                            //objA1691_FLI.QCPINF = objA1691_FLI.QCPINF * -1;
                            objA1691_FLI.strDesFCLOFO = "0xff0000";
                        }
                        objA1691_FLI.QCPNFI = (hmTKTpaper.get(e) != null) ? (Integer) hmTKTpaper.get(e) : 0;
                        lstA1691_dif.add(objA1691_FLI);
                    }

                    hmExcel.remove(e);
                }
            }

            //Recorro Excel y veo si existe en A1691
            it = hmTempExcel.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry e2 = (Map.Entry) it.next();
                if (hmA1691.containsKey(e2.getKey())) {
                    hmA1691.remove(e2.getKey());
                }
            }

                //Ordeno y lleno listas de A1691 no encontrados en ACS 
            RN = 0;
            Vector v1 = new Vector(hmA1691.keySet());
            Collections.sort(v1);
            it = v1.iterator();
            while (it.hasNext()) {
                RN++;
                String e = (String) (it.next());//KEY
                objA1691 = (A1691Filter) hmA1691.get(e);
                objA1691.RN = RN;
                lstA1691.add(objA1691);
            }

            //Ordeno y lleno listas de ACS no encontrados en A1691
            RN = 0;

            Vector v2 = new Vector(hmExcel.keySet());
            Collections.sort(v2);
            it = v2.iterator();
            while (it.hasNext()) {
                RN++;
                String e = (String) (it.next());//KEY
                objA1691 = (A1691Filter) hmExcel.get(e);
                objA1691.RN = RN;
                lstExcel.add(objA1691);
            }

            hmResult.put("lstA1691", lstA1691);
            hmResult.put("lstExcel", lstExcel);
            hmResult.put("lstA1691Dif", lstA1691_dif);

        } catch (Exception e) {
            e.printStackTrace();
            MSJ = e.getMessage();
            System.out.println("MSJ: " + MSJ);
        } finally {
//            setClose();

            //Eliminar temporal           
            if (archivoCopia_ACS != null) {
                archivoCopia_ACS.delete();
            }
            if (archivoCopia_Paper != null) {
                archivoCopia_Paper.delete();
            }
        }

        hmResult.put("MSJ", MSJ);

        return hmResult;
    }

    public void loadPX352SQP01294(A1691Filter filter, HashMap hmACS) throws SQLException {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter obj = new A1692Filter();
        String tickeValue = "";

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP01294(?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {

                if (hmACS.containsKey(rst.getString("TKT"))) {
                    obj = (A1692Filter) hmACS.get(rst.getString("TKT"));//CCIA+FORMA+SERIE
                    obj.FLOAD = "Y";
                }
            }

        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }
    }
    
    public List<A1692Filter> loadPX_TKTACS(A1691Filter filter) {

        HashMap hm = new HashMap();

        List<A1692Filter> lst = new ArrayList<>(0);
        A1692Filter objA1692;

        String strSQL = "{CALL Acs_AM.dbo.SP_Consulta_Passanger_List(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getSQLConnection2(session);
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.DFLIGHT);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            cs.setString(4, filter.CDEPART);
            cs.setString(5, filter.CARRIVA);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objA1692 = new A1692Filter();
                objA1692.strFormatDate2 = rst.getString("NameLast").trim();
                objA1692.strFormatDate = rst.getString("NameFirst").trim();
                objA1692.TKTASO = rst.getString("ETkt").trim();
                objA1692.CCIA = rst.getString("AirlineAccountingCode").trim();
                objA1692.SEQ = objA1692.CCIA + objA1692.TKTASO;
                objA1692.strTicket = objA1692.CCIA + " " + objA1692.TKTASO;
                if (objA1692.SEQ.equals("")) {
                    objA1692.SEQ = rst.getString("Registro").trim();
                }

                hm.put(objA1692.SEQ, objA1692);
            }

            loadPX352SQP01294(filter, hm);

            objA1692 = new A1692Filter();
            int RN = 0;
            Iterator it = null;
            Vector v2 = new Vector(hm.keySet());
            Collections.sort(v2);
            it = v2.iterator();
            while (it.hasNext()) {
                RN++;
                String e = (String) (it.next());//KEY
                objA1692 = (A1692Filter) hm.get(e);
                objA1692.RN = RN;
                lst.add(objA1692);
            }

        } catch (Exception e) {
            System.out.println("Mensaje: " + e.getMessage());
        } finally {
            setClose();
        }

        return lst;

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
